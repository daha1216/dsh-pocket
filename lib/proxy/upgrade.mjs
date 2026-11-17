// WebSocket 通道：per-IP 名额 + 设备凭证追踪 + upgrade 转发（2026-11-12 评审 §3.1 拆包 + v4.0 设备吊销）。
//
// DSH 的 /api/events.mux + events.host 是长连接流式通道，必须原样透传；upgrade 与 HTTP 侧
// 共用同一套 Host / 隧道 / 局域网 / 设备凭证 / 密码判定（issue #66/#90——伪造 Host 的 WS 握手
// 不能绕过局域网开关，?token= 穷举也不能换条通道就免限速；设备被移除时立即销毁其实时 WS）。
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
    const channel = isPublic ? 'public' : 'lan';
    // WS 上游握手也带来源分级头（与 HTTP 侧一致）；当前只有 HTTP 挂载的 RPC 消费它，
    // 但保持两条通道一致，避免将来 WS 侧加能力时拿到缺失/默认值（审计 F5）。
    const originClass = isPublic ? 'public' : isLoopbackHost(host) ? 'loopback' : 'lan';
    // 局域网访问关闭：拦截经局域网 Host 的 WS 握手（公网/loopback 放行——issue #66 fail closed）
    if (!isPublic && !isLoopbackHost(host) && !lanAccessEnabled()) {
      socket.write('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');
      socket.destroy();
      return;
    }

    let deviceId = null;
    // WebSocket 同样校验（支持 v4.0 持久设备 cookie + 备用 PIN/cookie，含临时 PIN，issue #69）
    if (auth) {
      const protectedHost = isProtectedHost(host, auth.isProtected);
      let deviceCheck = null;
      if (typeof auth.devices?.verifyDeviceCookie === 'function') {
        try {
          deviceCheck = auth.devices.verifyDeviceCookie(req.headers.cookie, channel);
        } catch {
          deviceCheck = null;
        }
        if (deviceCheck?.ok && deviceCheck.device?.id) {
          deviceId = deviceCheck.device.id;
          req.__pocketDeviceId = deviceId;
        }
      }

      const token = protectedHost ? (auth.getToken?.(host) ?? null) : null;
      // 与 HTTP 侧对齐的 fail-closed（issue #66 的 WS 版）：取不到 PIN 且无已授权设备凭证时
      // 拒绝受保护 WS（503），绝不因 token 为 null 短路放行。
      if (protectedHost && !token && !deviceId) {
        log?.('dsh-pocket: access PIN unavailable — refusing protected ws | 访问密码读取失败，已拒绝受保护 WS');
        socket.write('HTTP/1.1 503 Service Unavailable\r\nConnection: close\r\n\r\n');
        socket.destroy();
        return;
      }

      const altTokens = token && typeof auth.getAltTokens === 'function' ? (auth.getAltTokens(host) ?? []) : [];
      const acceptedTokens = token ? [token, ...altTokens] : [];

      if (deviceId) {
        // 已授权设备凭证校验通过：仍摘除 URL 上可能残留的明文 PIN，防泄漏到上游日志
        if (acceptedTokens.length > 0) req.url = stripPocketToken(req.url, acceptedTokens);
      } else if (deviceCheck?.revoked && protectedHost && !hasQueryToken(req)) {
        // 设备已被显式移除且未提供新 ?token=：直接 401，防止残留旧 dsh_pocket_token cookie 借尸还魂
        socket.write('HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n');
        socket.destroy();
        return;
      } else {
        // WS 握手上的 ?token= 与 HTTP 侧同权（issue #90）：并入同一套限速器
        const wsIp = clientIp(req);
        const wsGuess = hasQueryToken(req);
        let wsLock = { locked: false, retryAfter: 0, scope: null };
        if (token && wsGuess) {
          wsLock = limiter?.status(wsIp) ?? wsLock;
          if (wsLock.locked && wsLock.scope === 'ip') {
            socket.write(`HTTP/1.1 429 Too Many Requests\r\nRetry-After: ${wsLock.retryAfter}\r\nConnection: close\r\n\r\n`);
            socket.destroy();
            return;
          }
        }
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
          const statusLine = wsLock.locked ? '429 Too Many Requests' : '401 Unauthorized';
          if (wsLock.locked) socket.write(`HTTP/1.1 ${statusLine}\r\nRetry-After: ${wsLock.retryAfter}\r\nConnection: close\r\n\r\n`);
          else socket.write(`HTTP/1.1 ${statusLine}\r\nConnection: close\r\n\r\n`);
          socket.destroy();
          return;
        }
        if (token && wsAuth.ok && wsGuess) limiter?.clear(wsIp);
        if (wsAuth.ok) req.url = stripPocketToken(req.url, acceptedTokens);
      }

      if (!protectedHost) {
        // 不受保护的 Host（本机 / 关闭局域网密码）：不强制认证，但仍然摘掉分享链接里的 PIN。
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

    const cookieSnapshot = req.headers.cookie;
    const headers = loopbackAuthority({ ...req.headers }, upstream);
    headers[POCKET_ORIGIN_HEADER] = originClass;
    const proxyReq = httpRequest({
      // 同样清掉历史遗留的 dsh-desktop-* 参数（issue #75）
      // upgrade 用独立连接（agent:false）：WS 是长连接，进 keep-alive 池只会白占 socket 槽。
      host: upstream.host, port: upstream.port, method: req.method, path: stripDesktopMarkers(req.url), headers, agent: false,
    });
    proxyReq.on('upgrade', (proxyRes, proxySocket, proxyHead) => {
      upgraded = true;
      const teardown = () => {
        try { proxySocket.resetAndDestroy?.() ?? proxySocket.destroy(); } catch { try { proxySocket.destroy(); } catch {} }
        try { socket.destroy(); } catch {}
      };
      // 握手期间若设备在设置页刚被吊销，立即断开，避免竞态放行。
      if (deviceId && typeof auth?.devices?.verifyDeviceCookie === 'function') {
        try {
          const stillValid = auth.devices.verifyDeviceCookie(cookieSnapshot, channel);
          if (!stillValid?.ok) {
            socket.off('end', dropBeforeUpgrade);
            socket.off('close', dropBeforeUpgrade);
            teardown();
            return;
          }
        } catch { /* ignore */ }
      }

      socket.write('HTTP/1.1 101 Switching Protocols\r\n');
      // 原样回传上游的 upgrade 头（Sec-WebSocket-Accept 等）
      const raw = [];
      for (const [k, v] of Object.entries(proxyRes.headers)) {
        raw.push(`${k}: ${Array.isArray(v) ? v.join(', ') : v}`);
      }
      socket.write(`${raw.join('\r\n')}\r\n\r\n`);
      if (proxyHead?.length) socket.write(proxyHead);
      socket.pipe(proxySocket, { end: false });
      proxySocket.pipe(socket, { end: false });
      const frames = createWebSocketFrameTracker();
      proxySocket.on('data', (chunk) => frames.feed(chunk));
      if (heartbeat !== false) attachWebSocketHeartbeat(socket, { ...(heartbeat ?? {}), atFrameBoundary: () => frames.atFrameBoundary() });
      proxySocket.on('error', () => { try { socket.destroy(); } catch {} });
      proxySocket.on('close', teardown);
      socket.on('close', teardown);
      socket.on('end', teardown);
      proxySocket.on('end', teardown);
      socket.off('end', dropBeforeUpgrade);
      socket.off('close', dropBeforeUpgrade);
      proxyReq._header = null;

      // 登记设备活跃 WebSocket：在设置页移除该设备时可立即 destroy 断流
      if (deviceId) {
        try { auth?.devices?.trackSocket?.(deviceId, socket); } catch { /* ignore */ }
      }
    });
    // 上游返回普通 HTTP 响应（非 101）：把状态码/头回写后断开，别让客户端永久挂起
    proxyReq.on('response', (proxyRes) => {
      if (proxyRes.statusCode === 101) return;
      try {
        const raw = [`HTTP/1.1 ${proxyRes.statusCode} ${proxyRes.statusMessage ?? ''}`.trim()];
        for (const [k, v] of Object.entries(proxyRes.headers)) {
          raw.push(`${k}: ${Array.isArray(v) ? v.join(', ') : v}`);
        }
        socket.end(raw.join('\r\n') + '\r\n\r\n');
        proxyRes.resume();
      } catch { socket.destroy(); }
    });
    proxyReq.setTimeout(60_000, () => {
      log?.(`dsh-pocket: upstream idle timeout (ws) | 上游空闲超时(ws): ${req.method} ${maskTokenForLog(req.url)}`);
      proxyReq.destroy(new Error('upstream idle timeout'));
    });
    let upgraded = false;
    const dropBeforeUpgrade = () => {
      if (upgraded) return;
      try { proxyReq.destroy(); } catch { /* 已销毁 */ }
    };
    socket.on('end', dropBeforeUpgrade);
    socket.on('close', dropBeforeUpgrade);
    proxyReq.on('error', () => socket.destroy());
    if (head?.length) proxyReq.write(head);
    proxyReq.end();
    socket.on('error', () => socket.destroy());
  };
}
