// WebSocket 通道：per-IP 名额 + upgrade 转发（2026-11-12 评审 §3.1 拆包）。
//
// DSH 的 /api/events.mux + events.host 是长连接流式通道，必须原样透传；upgrade 与 HTTP 侧
// 共用同一套 Host / 隧道 / 局域网 / 密码判定（issue #66/#90——伪造 Host 的 WS 握手不能绕过
// 局域网开关，?token= 穷举也不能换条通道就免限速）。
//
// 101 之后的清理语义都在各自注释里：半关闭必须 RST（resetAndDestroy，FIN 会让上游
// 悬挂），心跳只在帧边界插 Ping 帧，握手前断线要把取消传回上游。
import { request as httpRequest } from 'node:http';
import {
  POCKET_ORIGIN_HEADER, TUNNEL_POLICY_HOST, classifyHost, isCloudflareTunnelRequest, isLoopbackHost,
  isProtectedHost, policyHost, stripDesktopMarkers,
} from './hosts.mjs';
import {
  authCheck, clientIp, hasQueryToken, loopbackAuthority, maskTokenForLog, stripPocketToken,
} from './auth.mjs';
import { attachWebSocketHeartbeat, createWebSocketFrameTracker } from './ws.mjs';

const WS_PER_IP_MAX = 32;

// 每 IP 的 WS 并发上限：比 maxConnections 更细，避免单台设备把 256 个名额占满后
// 其他设备连不上（每设备正常只需要 1–2 条 mux/host 流）。
export function createWsSlotLimiter({ max = WS_PER_IP_MAX } = {}) {
  const perIp = new Map();
  return {
    /** @returns {string|null} 名额键（关闭时归还）；null 表示超限 */
    open(ip) {
      const key = ip || 'unknown';
      const n = perIp.get(key) ?? 0;
      if (n >= max) return null;
      perIp.set(key, n + 1);
      return key;
    },
    close(key) {
      if (key === null) return;
      const n = perIp.get(key) ?? 0;
      if (n <= 1) perIp.delete(key);
      else perIp.set(key, n - 1);
    },
    get size() { return perIp.size; },
  };
}

/**
 * @param {{upstream: {host: string, port: number}, auth: object|null, limiter: object|null,
 *   lanAccessEnabled: () => boolean, log: Function|null, heartbeat: object|false}} ctx
 * @returns {(req: import('node:http').IncomingMessage, socket: import('node:net').Socket, head: Buffer) => void}
 */
export function createUpgradeHandler({ upstream, auth, limiter, lanAccessEnabled, log, heartbeat }) {
  // WebSocket upgrade（DSH 的 /api/events.mux + events.host 流式通道）原样透传
  return function handleClientUpgrade(req, socket, head) {
    // 与 HTTP 侧同一套判定（issue #90）：否则伪造 Host 的 WS 握手仍可绕过局域网开关
    let host = policyHost(req, String(req.headers.host ?? ''));
    // 与 HTTP 侧一致：隧道流量（loopback 源 + Cloudflare 边缘头）一律按公网处理，
    // 防止 Host 被 ingress/前置反代改写成 127.0.0.1 后 WS 也拿到免密入口。
    if (isCloudflareTunnelRequest(req) && classifyHost(host) !== 'public') host = TUNNEL_POLICY_HOST;
    const isPublic = classifyHost(host) === 'public';
    // WS 上游握手也带来源分级头（与 HTTP 侧一致）；当前只有 HTTP 挂载的 RPC 消费它，
    // 但保持两条通道一致，避免将来 WS 侧加能力时拿到缺失/默认值（审计 F5）。
    const originClass = isPublic ? 'public' : isLoopbackHost(host) ? 'loopback' : 'lan';
    // 局域网访问关闭：拦截经局域网 Host 的 WS 握手（公网/loopback 放行——issue #66 fail closed）
    if (!isPublic && !isLoopbackHost(host) && !lanAccessEnabled()) {
      socket.write('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');
      socket.destroy();
      return;
    }
    // WebSocket 同样校验（防止绕过 HTTP 认证从 WS 进入；含临时 PIN，issue #69）
    if (auth) {
      const protectedHost = isProtectedHost(host, auth.isProtected);
      const token = protectedHost ? (auth.getToken?.(host) ?? null) : null;
      // 与 HTTP 侧对齐的 fail-closed（issue #66 的 WS 版）：取不到 PIN 时不能因为
      // 「token 为 null」把整段认证短路掉直接 101——HTTP 侧同场景是 503。
      if (protectedHost && !token) {
        log?.('dsh-pocket: access PIN unavailable — refusing protected ws | 访问密码读取失败，已拒绝受保护 WS');
        socket.write('HTTP/1.1 503 Service Unavailable\r\nConnection: close\r\n\r\n');
        socket.destroy();
        return;
      }
      const altTokens = token && typeof auth.getAltTokens === 'function' ? (auth.getAltTokens(host) ?? []) : [];
      const acceptedTokens = token ? [token, ...altTokens] : [];
      // WS 握手上的 ?token= 与 HTTP 侧同权（issue #90）：不并入限速的话，攻击者
      // 只要把穷举换到 upgrade 请求上就照样不受限。
      const wsIp = clientIp(req);
      const wsGuess = hasQueryToken(req);
      let wsLock = { locked: false, retryAfter: 0, scope: null };
      if (token && wsGuess) {
        wsLock = limiter?.status(wsIp) ?? wsLock;
        // 单 IP 锁严格拒绝；全局锁只拦错误尝试，正确 PIN 仍放行（与 HTTP 侧一致）。
        if (wsLock.locked && wsLock.scope === 'ip') {
          socket.write(`HTTP/1.1 429 Too Many Requests\r\nRetry-After: ${wsLock.retryAfter}\r\nConnection: close\r\n\r\n`);
          socket.destroy();
          return;
        }
      }
      // 全局锁期间比对照样限速（与 HTTP 侧一致，见 allowCompare）。
      if (token && wsGuess && limiter && !limiter.allowCompare(wsIp)) {
        socket.write(`HTTP/1.1 429 Too Many Requests\r\nRetry-After: ${wsLock.retryAfter || 1}\r\nConnection: close\r\n\r\n`);
        socket.destroy();
        return;
      }
      const wsAuth = authCheck(req, acceptedTokens, auth.sessionKey ?? null);
      if (protectedHost && !wsAuth.ok) {
        if (wsGuess) {
          limiter?.record(wsIp);
          log?.(`dsh-pocket: bad ws ?token= from ${wsIp} | WS 密码错误 IP: ${wsIp}`);
        }
        // 全局锁期间错误尝试回 429（提示退避），其余 401。
        const statusLine = wsLock.locked ? '429 Too Many Requests' : '401 Unauthorized';
        if (wsLock.locked) socket.write(`HTTP/1.1 ${statusLine}\r\nRetry-After: ${wsLock.retryAfter}\r\nConnection: close\r\n\r\n`);
        else socket.write(`HTTP/1.1 ${statusLine}\r\nConnection: close\r\n\r\n`);
        socket.destroy();
        return;
      }
      if (token && wsAuth.ok && wsGuess) limiter?.clear(wsIp);
      // 与 HTTP 侧一致：WS 握手 URL 上命中口袋密码的明文 PIN 不再转发给上游
      if (wsAuth.ok) req.url = stripPocketToken(req.url, acceptedTokens);
      if (!protectedHost) {
        // 不受保护的 Host（本机 / 关闭局域网密码）：不认证，但仍然摘掉分享链接里的 PIN。
        const loose = [];
        try {
          const t = auth.getToken?.(host) ?? null;
          if (t) loose.push(t);
          const alt = typeof auth.getAltTokens === 'function' ? auth.getAltTokens(host) : null;
          if (Array.isArray(alt)) loose.push(...alt);
        } catch { /* 取不到 PIN 就没有可摘的值 */ }
        if (loose.length > 0) req.url = stripPocketToken(req.url, loose);
      }
    }
    const headers = loopbackAuthority({ ...req.headers }, upstream);
    headers[POCKET_ORIGIN_HEADER] = originClass;
    const proxyReq = httpRequest({
      // 同样清掉历史遗留的 dsh-desktop-* 参数（issue #75）
      // upgrade 用独立连接（agent:false）：WS 是长连接，进 keep-alive 池只会白占 socket 槽。
      host: upstream.host, port: upstream.port, method: req.method, path: stripDesktopMarkers(req.url), headers, agent: false,
    });
    proxyReq.on('upgrade', (proxyRes, proxySocket, proxyHead) => {
      upgraded = true;
      socket.write('HTTP/1.1 101 Switching Protocols\r\n');
      // 原样回传上游的 upgrade 头（Sec-WebSocket-Accept 等）
      const raw = [];
      for (const [k, v] of Object.entries(proxyRes.headers)) {
        raw.push(`${k}: ${Array.isArray(v) ? v.join(', ') : v}`);
      }
      socket.write(`${raw.join('\r\n')}\r\n\r\n`);
      if (proxyHead?.length) socket.write(proxyHead);
      // pipe 必须 end:false：默认 end:true 会在对端 FIN 时抢先 end() 对端 socket
      // （优雅 FIN），此时 teardown 的 destroy() 已无法强制关闭对方——上游只收
      // 到 FIN 进入 half-open 永不关闭（PR #56）。半关闭统一交给下面的 'end'
      // 监听 → teardown destroy（RST 强制关闭双方）。
      socket.pipe(proxySocket, { end: false });
      proxySocket.pipe(socket, { end: false });
      // 心跳注入（PR #41）：保活 + 静默断链检测（见 attachWebSocketHeartbeat）。
      // 上游→浏览器这一向经过 tracker，只有在帧边界上才允许插入 Ping 帧，
      // 否则 2 字节控制帧会落进某条消息的 payload，浏览器按协议错误直接断开。
      const frames = createWebSocketFrameTracker();
      proxySocket.on('data', (chunk) => frames.feed(chunk));
      if (heartbeat !== false) attachWebSocketHeartbeat(socket, { ...(heartbeat ?? {}), atFrameBoundary: () => frames.atFrameBoundary() });
      // 任一端断开都要清理另一端（避免上游残留僵尸连接占用 dsh 连接槽）。
      // 上游侧必须 resetAndDestroy（发 RST）：destroy() 只发干净 FIN，而上游
      // http server 默认 allowHalfOpen=true，收到 FIN 不自动关闭 → 上游仍悬挂
      // （PR #56 实测）。RST 强制对端立即关闭。
      const teardown = () => {
        try { proxySocket.resetAndDestroy?.() ?? proxySocket.destroy(); } catch { try { proxySocket.destroy(); } catch {} }
        try { socket.destroy(); } catch {}
      };
      // 上游侧透传 socket 的读错误（如 dsh web 重启/断开时的 ECONNRESET）必须
      // 吞掉并清理对端，否则未处理的 'error' 事件会让整个 dsh web 进程崩溃退出。
      proxySocket.on('error', () => { try { socket.destroy(); } catch {} });
      proxySocket.on('close', teardown);
      socket.on('close', teardown);
      // 半关闭（收到对端 FIN 的 'end'）对双向转发同样意味着这一端要走了：http server
      // 默认 allowHalfOpen=true，收到 FIN 只触发 'end' 不自动关——若不在 'end' 时销毁，
      // 浏览器/App 直接关页（不发 WS close 帧就 FIN）留下的连接会永久挂在 half-open
      // 状态，上游连接槽被占（且 server.close() 永远等不完）。双向流里半关闭无意义。
      socket.on('end', teardown);
      proxySocket.on('end', teardown);
      // 握手已成功：摘掉“升级前断开”的监听，并释放请求头缓冲（内含 cookie）。
      // 每个 WS 连接都会带着这几 KB 存活到进程退出，长跑会按连接数累积（审计 F7）。
      socket.off('end', dropBeforeUpgrade);
      socket.off('close', dropBeforeUpgrade);
      proxyReq._header = null;
    });
    // 上游返回普通 HTTP 响应（非 101）：把状态码/头回写后断开，别让客户端永久挂起
    proxyReq.on('response', (proxyRes) => {
      if (proxyRes.statusCode === 101) return; // 理论上 101 走 upgrade 事件
      try {
        const raw = [`HTTP/1.1 ${proxyRes.statusCode} ${proxyRes.statusMessage ?? ''}`.trim()];
        for (const [k, v] of Object.entries(proxyRes.headers)) {
          raw.push(`${k}: ${Array.isArray(v) ? v.join(', ') : v}`);
        }
        // end 会 flush 响应头再 FIN——不要紧跟 destroy()，否则排队的头会被丢弃
        socket.end(raw.join('\r\n') + '\r\n\r\n');
        proxyRes.resume(); // 消费掉上游响应体，释放连接
      } catch { socket.destroy(); }
    });
    // 同 HTTP 侧：upgrade 请求 60s 空闲超时，destroy 后由下面的 'error' 收尾断开
    proxyReq.setTimeout(60_000, () => {
      log?.(`dsh-pocket: upstream idle timeout (ws) | 上游空闲超时(ws): ${req.method} ${maskTokenForLog(req.url)}`);
      proxyReq.destroy(new Error('upstream idle timeout'));
    });
    // 握手阶段（101 之前）客户端断开：此时还没绑定 teardown，proxyReq 会一直等到
    // 上游回完 101 或 60s 超时才结束，期间握着一条上游连接。取消要传到上游。
    // 注意这里必须同时听 'end' 和 'close'：客户端 destroy() 发送的是 FIN，服务端
    // socket 默认 allowHalfOpen=true，此时只触发 'end'，'close' 要等写方向也结束
    // ——只挂 'close' 等于什么都没做（实测上游连接一直挂着）。
    // 一旦升级成功，管道与 teardown 接管清理，这里就不再插手。
    let upgraded = false;
    const dropBeforeUpgrade = () => {
      if (upgraded) return;
      try { proxyReq.destroy(); } catch { /* 已销毁 */ }
    };
    socket.on('end', dropBeforeUpgrade);
    socket.on('close', dropBeforeUpgrade);
    proxyReq.on('error', () => socket.destroy());
    // 关键：浏览器在握手请求后可能立即发出首帧（如 mux 流的初始 RPC），
    // node 把它放在 upgrade 事件的 head 里。必须先于 end() 写入 proxyReq，
    // 让上游在 upgrade 事件里就拿到它（与直连行为一致）；等 101 之后再写
    // 会变成迟到的 socket 数据，DSH 的 mux 协议可能错过这个窗口。
    if (head?.length) proxyReq.write(head);
    proxyReq.end();
    socket.on('error', () => socket.destroy());
  }
}
