// dsh-pocket 核心：Host/Origin 改写反向代理
//
// 为什么需要它：DSH 的 /api 浏览器信任栅栏只认 loopback（127.0.0.1）或
// `--trusted-host` 白名单（且官方禁了 0.0.0.0 绑定，防止把远程执行代码暴露给网络）。
// 本代理把入站请求的 Host / Origin 统一改写成 loopback 权威（127.0.0.1:3080），
// 转发给本机 dsh web——栅栏永远看到 loopback，于是：
//   - 局域网：手机直接访问 http://<电脑IP>:端口
//   - 公网：cloudflared 隧道指到本代理，任意域名都能进
// 都不需要改 dsh 的任何配置。
//
// 同步保证：普通请求与 WebSocket upgrade（/api/events.host 流式推送）都原样透传，
// 手机看到的界面与电脑完全一致、实时。

// 模块分工（2026-11-12 评审 §3.1）：
//   proxy/inject.mjs          HTML 注入内容（polyfill / transport shim / SW 注册）
//   proxy/cache.mjs           代理缓存（immutable 资源 + 会话列表瘦身结果，统一预算）
//   proxy/hosts.mjs           Host 分级与来源判定（loopback / lan / public）
//   proxy/auth.mjs            密码与限速原语
//   proxy/auth-flow.mjs       三条认证通道（表单 / ?token= / cookie）与限速
//   proxy/handshake.mjs       dsh 会话 token 握手重试计数
//   proxy/pages.mjs           各类提示页（登录 / 局域网关闭 / 桌面门禁 / 握手）
//   proxy/ws.mjs              WebSocket 帧边界心跳
//   proxy/response-gate.mjs   303 过渡页与桌面门禁改写
//   proxy/html-inject.mjs     HTML 注入（解压后再注入）
//   proxy/slim-response.mjs   会话列表瘦身与并发闸门
//   proxy/response-encode.mjs 流式压缩 / 转码 / 透传
//   proxy/upgrade.mjs         WS upgrade 转发与 per-IP 名额
// 本文件只剩编排：Host 门 → 认证 → 握手 → 建上游连接 → 分支调用 → 兜底与生命周期。

import { DEFAULT_INJECT, SW_SCRIPT, SW_SCRIPT_PATH } from './proxy/inject.mjs';
import {
  SESSION_LIST_BODY_MAX, SESSION_LIST_SLIM_RE, acceptedCodings, immutableCacheGet, isImmutableUrl,
} from './proxy/cache.mjs';
import {
  DSH_AUTH_COOKIE, POCKET_ORIGIN_HEADER, TUNNEL_POLICY_HOST, classifyHost, isCloudflareTunnelRequest,
  isHtmlRequest, isLoopbackHost, policyHost, stripDesktopMarkers, upstreamPathWithLaunchToken,
} from './proxy/hosts.mjs';
import { clientIp, createRateLimiter, loopbackAuthority, maskTokenForLog } from './proxy/auth.mjs';
import { HANDSHAKE_RETRY_PARAM, createHandshakeTracker, stripQueryParam } from './proxy/handshake.mjs';
import { handshakeBlockedPageHtml, lanDisabledPageHtml } from './proxy/pages.mjs';
import { enforceAccessControl } from './proxy/auth-flow.mjs';
import { serveEarlyResponseGate } from './proxy/response-gate.mjs';
import { injectHtmlDocument } from './proxy/html-inject.mjs';
import { createSlimInflightGate, serveSlimSessionList } from './proxy/slim-response.mjs';
import { pipeUpstreamBody } from './proxy/response-encode.mjs';
import { createUpgradeHandler, createWsSlotLimiter } from './proxy/upgrade.mjs';

import { Agent as HttpAgent, createServer, request as httpRequest } from 'node:http';
import { createHash } from 'node:crypto';

// 对外导出面：拆包后保持 lib/proxy.mjs 的既有契约（lib/index.js、lib/service.mjs 与测试都从这里取）。
export {
  DEFAULT_INJECT, RANDOM_UUID_POLYFILL, SW_REGISTER_SCRIPT, SW_SCRIPT, SW_SCRIPT_PATH,
  TRANSPORT_API_CLIENT_SHIM, advancedNoticeScript, desktopEnvPatchScript,
} from './proxy/inject.mjs';
export { CACHE_BUDGET, HASHED_ASSET_RE, clearProxyCaches, proxyCacheStats } from './proxy/cache.mjs';
export {
  classifyHost, classifySource, policyHost, stripDesktopMarkers, upstreamPathWithLaunchToken,
} from './proxy/hosts.mjs';
export { DEFAULT_RATE_LIMIT, clientIp } from './proxy/auth.mjs';
export {
  DEFAULT_HANDSHAKE_LIMIT, HANDSHAKE_RETRY_PARAM, HANDSHAKE_WINDOW_MS, createHandshakeTracker,
  stripQueryParam,
} from './proxy/handshake.mjs';
export { handshakeBlockedPageHtml, handshakePageHtml } from './proxy/pages.mjs';

const DEFAULT_UPSTREAM = { host: '127.0.0.1', port: 3080 };

/**
 * 启动 dsh-pocket 代理。
 * @param {object} opts
 * @param {number} [opts.port]      监听端口（默认 3081；dsh web 保持 3080）
 * @param {string} [opts.host]      监听地址（默认 0.0.0.0：LAN 与隧道都能到）
 * @param {{host:string,port:number}} [opts.upstream] 上游 dsh web（默认 127.0.0.1:3080）
 * @param {string} [opts.injectHtml] 注入 HTML 的内容（默认 polyfill + 移动端适配；传 '' 关闭）
 * @param {object} [opts.auth]       可选访问令牌认证（issue #13）：{ getToken, getAltTokens?, isProtected, sessionKey }
 *   - getToken(host) → 主 PIN（公网/局域网各一个，按 host 分类）
 *   - getAltTokens?(host) → 替代令牌列表（可选），校验时与主 PIN 任一命中即放行
 * @param {object|false} [opts.rateLimit] 登录速率限制参数覆盖（issue #40；测试用短窗口）
 * @param {object|false} [opts.heartbeat] WebSocket 心跳注入（PR #41）：{ intervalMs, missLimit }；false 关闭（默认开：30s/容忍 2 个静默周期）
 * @param {() => boolean} [opts.lanAccessEnabled] 局域网访问是否开启（默认开启）。关闭时拦截经局域网 Host 的请求（公网/loopback 不受影响）。
 * @returns {Promise<{server:import('node:http').Server, close:()=>Promise<void>}>}
 */
export function createPocketProxy({ port = 3081, host = '0.0.0.0', upstream = DEFAULT_UPSTREAM, log = null, injectHtml = DEFAULT_INJECT, auth = null, rateLimit = null, heartbeat = {}, lanAccessEnabled = () => true, launchToken = () => '', handshakeLimit } = {}) {
  const limiter = auth ? createRateLimiter(rateLimit ?? {}) : null;
  // 到上游（本机 dsh web）的 keep-alive 连接池：手机首屏几十个静态资源若每个都新建
  // TCP，loopback 三次握手 + TIME_WAIT 会实打实叠进首屏时间。
  // WebSocket upgrade 不走这个池（见 handleClientUpgrade 的 agent:false）：WS 本身就是
  // 一条长连接，没有复用价值，反而会长期占用池内 socket 槽。
  const upstreamAgent = new HttpAgent({ keepAlive: true, maxSockets: 32, maxFreeSockets: 8 });
  // 会话握手重试计数（issue #91）：Safari 在 http://IP 源上丢 3xx 的 cookie → 死循环
  const handshake = createHandshakeTracker(
    typeof handshakeLimit === 'number' ? { max: handshakeLimit } : {},
  );
  // session/list 瘦身的并发闸门（全局，不是每 IP）：超出预算的请求回落成普通转发。
  const slimGate = createSlimInflightGate();
  function handleClientRequest(req, res) {
    // 策略判定一律用 policyHost（issue #90）：Host 头可伪造，用不可伪造的 TCP 源地址
    // 给它设下限。转发给上游的 Host 由 loopbackAuthority 单独改写，不受这里影响。
    let host = policyHost(req, String(req.headers.host ?? ''));
    // 隧道流量强制按公网判定：cloudflared 从 loopback 回连，ingress 若配了
    // httpHostHeader（或前面还有反代改写 Host），Host 会把请求伪装成本机/局域网。
    if (isCloudflareTunnelRequest(req) && classifyHost(host) !== 'public') host = TUNNEL_POLICY_HOST;
    const isPublic = classifyHost(host) === 'public';
    // 来源分级：只由不可伪造的源地址 + 规范化 Host 决定，随请求头传给上游 RPC。
    // 上游用它把「公网 PIN」「恢复出厂」等只在本机可见的能力挡在门外。
    const originClass = isPublic ? 'public' : isLoopbackHost(host) ? 'loopback' : 'lan';
    // 局域网访问关闭（issue #54）：拦截经局域网 IP/主机名访问的请求；
    // 公网（含任意非内网 Host——issue #66 fail closed）与 loopback（本机/cloudflared 回连）放行，
    // 公网流量随后照常走访问密码认证。
    if (!isPublic && !isLoopbackHost(host) && !lanAccessEnabled()) {
      if (isHtmlRequest(req)) {
        res.writeHead(403, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
        res.end(lanDisabledPageHtml());
      } else {
        res.writeHead(403, { 'content-type': 'application/json', 'cache-control': 'no-store' });
        res.end('{"error":"lan-disabled"}');
      }
      return;
    }
    // 访问令牌认证（issue #13 + #18 + #33 + #40 + #69）：局域网与公网按开关/来源要求密码
    // 三条通道（表单 / ?token= / cookie）与限速全在 auth-flow.mjs，返回 true = 已回包。
    if (auth && enforceAccessControl({ req, res, host, isPublic, auth, limiter, log })) return;
    // 静态资源 SW 脚本直出（issue 慢加载）：放在鉴权之后——注册只发生在已登录 HTML 页，
    // 浏览器取脚本自带同源凭证，走这里不会再被 401 拦下；no-cache 让每次注册都重新
    // 校验（浏览器对 SW 主脚本本来也绕过 HTTP 缓存），脚本更新能及时生效。
    let swPath = null;
    try { swPath = new URL(req.url, 'http://x').pathname; } catch { /* 畸形请求目标 */ }
    if (swPath === null) {
      // 解析必抛错的请求目标（非法端口等）直接 400 拒绝，别让异常穿出 request 回调
      res.writeHead(400, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' });
      res.end('dsh-pocket: malformed request target');
      return;
    }
    if (req.method === 'GET' && swPath === SW_SCRIPT_PATH) {
      res.writeHead(200, {
        'content-type': 'application/javascript; charset=utf-8',
        'cache-control': 'no-cache',
      });
      res.end(SW_SCRIPT);
      return;
    }
    const headers = loopbackAuthority({ ...req.headers }, upstream);
    headers[POCKET_ORIGIN_HEADER] = originClass;
    // dsh web 浏览器会话 token（issue #77）：首屏根路径补一次，换回绑定 authority 的 cookie
    const launchTok = (typeof launchToken === 'function' ? launchToken() : '') || '';
    // 先清掉历史遗留的 dsh-desktop-* 参数（issue #75），再补 launch token
    // 握手重试上限（issue #91）：Safari 不保存 http://IP 源上 3xx 下发的 cookie →
    // 补 token → 上游 303 → 浏览器仍无 cookie → 无限循环。达到上限就别再补了，
    // 让请求落到提示页，而不是继续转圈。
    const handshakeIp = clientIp(req);
    // `/?dsh-pocket-retry=1`：提示页上的「重试」入口——清掉这一轮的失败计数，让握手
    // 重新走一遍（否则用户得干等窗口过期）。这参数是我们自己加的，不往上游透传。
    let cleanPath = stripDesktopMarkers(req.url);
    if (cleanPath.includes(HANDSHAKE_RETRY_PARAM)) {
      handshake.clear(handshakeIp);
      cleanPath = stripQueryParam(cleanPath, HANDSHAKE_RETRY_PARAM);
    }
    const handshakeOver = launchTok !== '' && handshake.exhausted(handshakeIp);
    const upstreamPath = handshakeOver
      ? cleanPath
      : upstreamPathWithLaunchToken(cleanPath, req.method, req.headers.cookie, launchTok);
    const didInjectToken = upstreamPath !== cleanPath;
    if (didInjectToken) {
      handshake.record(handshakeIp);
      handshake.prune();
    }
    // 请求带上了会话 cookie → 这一轮的握手计数可以清掉了（说明 cookie 通路是好的）
    if (!didInjectToken && String(req.headers.cookie ?? '').includes(DSH_AUTH_COOKIE)) {
      handshake.clear(handshakeIp);
    }
    if (handshakeOver && isHtmlRequest(req)) {
      // 已判定握不上手 → 停在这里给人话，别再转圈。API/WS 不走这里（上游会 401）。
      res.writeHead(503, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'x-dsh-pocket-handshake': 'blocked',
      });
      res.end(handshakeBlockedPageHtml());
      return;
    }
    // 不可变资源命中缓存：连上游都不用打（本地回环往返与重压都省掉）。
    // 必须在认证之后：缓存里是完整资源，未认证的请求不能拿到。
    if (req.method === 'GET' && isImmutableUrl(upstreamPath) && acceptedCodings(req.headers['accept-encoding']).br) {
      const cached = immutableCacheGet(upstreamPath);
      if (cached !== null) {
        res.writeHead(200, cached.headers);
        res.end(cached.body);
        return;
      }
    }
    // session/list 瘦身缓存的请求体摘要。缓存键必须区分不同 payload（切工作区、
    // 不同 cwd / cursor 的列表请求），否则短 TTL 内第二次请求会拿到第一次的响应——
    // 不是「稍旧」，而是把 A 工作区的会话树渲染进 B 工作区，且客户端认为加载完成、
    // 不会自我纠正。摘要为 null 时该请求只透传、不读也不写缓存。
    const slimReqPath = String(req.url ?? '').split('?')[0] ?? '';
    const wantsSlimBody = req.method === 'POST' && SESSION_LIST_SLIM_RE.test(slimReqPath);
    let slimBodyDigest = null;
    let slimRpcId = null;
    const proxyReq = httpRequest(
      { host: upstream.host, port: upstream.port, method: req.method, path: upstreamPath, headers, agent: upstreamAgent },
      (proxyRes) => {
        log?.(`${req.method} ${maskTokenForLog(req.url)} -> ${proxyRes.statusCode}`);
        const contentType = String(proxyRes.headers['content-type'] ?? '');
        const codings = acceptedCodings(req.headers['accept-encoding']);
        // 不可变资源（内容哈希资产 / 带 rev 的插件组合包）：转码结果可无限期复用，
        // 内容变则 URL 变。命中缓存在建上游请求前就已返回，这里只负责回填。
        const immutableUrl = req.method === 'GET' && proxyRes.statusCode === 200 && isImmutableUrl(upstreamPath)
          ? upstreamPath
          : null;
        // 响应改写四段（2026-11-12 评审 §3.1 拆包）：顺序是行为——握手过渡/桌面门禁 →
        // HTML 注入 → 会话列表瘦身 → 编码与透传。前三个返回 true 表示已经接管这个响应。
        if (serveEarlyResponseGate({ req, res, proxyRes, contentType, didInjectToken })) return;
        if (injectHtmlDocument({ req, res, proxyRes, contentType, injectHtml })) return;
        if (serveSlimSessionList({ req, res, proxyRes, contentType, codings, slimBodyDigest, slimRpcId, gate: slimGate, log })) return;
        pipeUpstreamBody({ req, res, proxyRes, contentType, codings, immutableUrl, log });
      },
    );
    // 上游空闲超时：ClientRequest.setTimeout 是 socket 空闲语义（任一方向有数据
    // 就重置），流式/SSE 响应不会误伤；60s 无进展按错误销毁，走下面的 502 分支。
    proxyReq.setTimeout(60_000, () => {
      log?.(`dsh-pocket: upstream idle timeout | 上游空闲超时: ${req.method} ${maskTokenForLog(req.url)}`);
      proxyReq.destroy(new Error('upstream idle timeout'));
    });
    // 取消要一路传上游（issue：下游取消不传播）。用户关页/切网/切后台时浏览器直接
    // 断开，而下面几个分支都是「先把上游响应收集完再决定怎么写」：403 门禁、HTML
    // 注入、session/list 瘦身、不可变资源缓存回填。这些分支此前都不听 res 的 close，
    // 于是上游继续生成整段响应、cloudflared 出站通道和 dsh 连接槽被白占到写完为止。
    // 统一在这里绑一次，不再依赖每个分支自己记得加。
    let clientGone = false;
    res.on('close', () => {
      if (res.writableEnded || clientGone) return;
      clientGone = true;
      proxyReq.destroy(new Error('client closed connection | 客户端已断开'));
    });
    proxyReq.on('error', (err) => {
      // 客户端已经走了：连接本身没了，别再把 502 文本写进死 socket
      if (clientGone) return;
      log?.(`dsh-pocket: upstream error | 上游错误: ${req.method} ${maskTokenForLog(req.url)} | ${err?.message ?? err}`);
      // 已发头（流式响应中途断开）：再 end 错误文本会把说明拼进 HTML/JSON 正文，
      // 客户端拿到「半截内容 + 一段错误文字」；只能断开，让传输中断本身暴露失败。
      if (res.headersSent) { res.destroy(); return; }
      res.writeHead(502, { 'content-type': 'text/plain; charset=utf-8' });
      res.end(`dsh-pocket: 无法连接上游 dsh web（${upstream.host}:${upstream.port}）——先启动 dsh web | ${err.message}`);
    });
    if (wantsSlimBody) {
      // 只给 session/list 缓冲请求体（几百字节）：缓存键要它的摘要，边读边转会让
      // 摘要晚于响应到达。其余请求维持直通，不引入任何缓冲延迟。
      // 上限外的请求体不能再攒：之前只看 `bodyBytes <= MAX` 决定是否算摘要，
      // 但 data 回调照样把每个 chunk push 进数组——声明长度 1GB 的请求仍会
      // 整块吃进内存（审计实测 +150MB/请求）。超限即切流式直通。
      const bodyChunks = [];
      let bodyBytes = 0;
      let bodyOverflow = Number(req.headers['content-length'] || 0) > SESSION_LIST_BODY_MAX;
      if (bodyOverflow) req.pipe(proxyReq);
      req.on('data', (c) => {
        if (bodyOverflow) return;
        bodyChunks.push(c);
        bodyBytes += c.length;
        if (bodyBytes > SESSION_LIST_BODY_MAX) {
          bodyOverflow = true;
          for (const chunk of bodyChunks) proxyReq.write(chunk);
          bodyChunks.length = 0;
          req.pipe(proxyReq); // 剩余字节直接流过去，pipe 会在 end 时收尾
        }
      });
      req.on('end', () => {
        if (bodyOverflow) return;
        const body = Buffer.concat(bodyChunks);
        if (bodyBytes <= SESSION_LIST_BODY_MAX) {
          // 摘要必须剔除 rpcId：客户端每次调用用新的 rpcId，含它的摘要永远不同，
          // 缓存就永远命不中。回包时再把这个 id 原样填回当前响应。
          let parsed = null;
          try { parsed = JSON.parse(body.toString('utf8')); } catch { parsed = null; }
          if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
            if (typeof parsed.rpcId === 'string') slimRpcId = parsed.rpcId;
            const stripped = { ...parsed };
            delete stripped.rpcId;
            slimBodyDigest = createHash('sha256').update(JSON.stringify(stripped)).digest('hex').slice(0, 16);
          } else {
            slimBodyDigest = createHash('sha256').update(body).digest('hex').slice(0, 16);
          }
        }
        proxyReq.end(body);
      });
      req.on('error', () => proxyReq.destroy());
    } else {
      req.pipe(proxyReq);
    }
  }

  // 兜底：请求处理内的同步异常（如畸形请求目标的 URL 解析）不能穿出 request
  // 回调——那会变成 uncaughtException 崩掉宿主。已发头的连接只能断开。
  const server = createServer((req, res) => {
    try {
      handleClientRequest(req, res);
    } catch (err) {
      log?.(`dsh-pocket: request handler error | 请求处理异常: ${err?.message ?? err}`);
      try {
        if (!res.headersSent) {
          res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' });
          res.end('dsh-pocket: internal error');
        } else {
          res.destroy();
        }
      } catch { /* 连接已断 */ }
    }
  });

  // 连接与超时上限（审计 F3）：默认 Node 不限制并发连接，WS 长连接也不受 keep-alive
  // 池约束——一个出口 IP 开几百条就能把 fd/内存吃光（~500 WS 即 1000 fd，逼近
  // ulimit 1024；每条 19–21KB heap）。HTTP 侧再配请求头/请求超时，防慢速攻击占槽。
  server.maxConnections = 256;
  server.headersTimeout = 30_000;
  server.requestTimeout = 120_000;

  // 每 IP 的 WS 并发上限（审计 F3）与 upgrade 转发：判定与清理都在 proxy/upgrade.mjs。
  const wsSlots = createWsSlotLimiter();
  const handleClientUpgrade = createUpgradeHandler({ upstream, auth, limiter, lanAccessEnabled, log, heartbeat });


  // 兜底同 HTTP 侧：upgrade 回调内的同步异常以 500 握手拒绝，别崩宿主
  server.on('upgrade', (req, socket, head) => {
    // 每 IP 的 WS 名额：超限直接 503，别让单台设备把 fd/连接池占满（审计 F3）
    const slot = wsSlots.open(clientIp(req));
    if (slot === null) {
      try { socket.write('HTTP/1.1 503 Service Unavailable\r\nConnection: close\r\n\r\n'); } catch { /* 已断开 */ }
      socket.destroy();
      return;
    }
    socket.once('close', () => wsSlots.close(slot));
    try {
      handleClientUpgrade(req, socket, head);
    } catch (err) {
      log?.(`dsh-pocket: upgrade handler error | upgrade 处理异常: ${err?.message ?? err}`);
      try { socket.write('HTTP/1.1 500 Internal Server Error\r\nConnection: close\r\n\r\n'); } catch { /* 已断开 */ }
      socket.destroy();
    }
  });

  // 跟踪所有 TCP 连接（含 WebSocket upgrade 后的 socket——Node 的
  // closeAllConnections 不包含它们，不手动销毁 close() 会永远等）
  const clientSockets = new Set();
  server.on('connection', (sock) => {
    clientSockets.add(sock);
    sock.on('close', () => clientSockets.delete(sock));
    sock.on('error', () => {}); // 防未处理 error 崩进程
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => {
      const actualPort = server.address().port;
      resolve({
        server,
        port: actualPort,
        close: () => new Promise((r) => {
          for (const s of clientSockets) { try { s.destroy(); } catch { /* 忽略 */ } }
          try { upstreamAgent.destroy(); } catch { /* 忽略 */ }
          // 缓存里可能压着几十 MB 的响应体（审计 F6）：停止服务后不能让它常驻到进程退出
          try { clearProxyCaches(); } catch { /* 忽略 */ }
          server.close(() => r());
        }),
      });
    });
  });
}
