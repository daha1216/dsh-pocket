// dsh-pocket 核心：Host/Origin 改写反向代理（v4.0）
//
// 为什么需要它：DSH 的 /api 浏览器信任栅栏只认 loopback（127.0.0.1）或
// `--trusted-host` 白名单（且官方禁了 0.0.0.0 绑定，防止把远程执行代码暴露给网络）。
// 本代理把入站请求的 Host / Origin 统一改写成 loopback 权威（127.0.0.1:3080），
// 转发给本机 dsh web——栅栏永远看到 loopback，于是：
//   - 局域网：手机直接访问 http://<电脑IP>:端口
//   - 公网：cloudflared 隧道指到本代理，固定域名安全接入
// 都不需要改 dsh 的任何配置。
//
// 同步保证：普通请求与 WebSocket upgrade（/api/events.host + events.mux 流式推送）都原样透传，
// 手机看到的界面与电脑完全一致、实时。

// 模块分工：
//   proxy/inject.mjs          HTML 注入内容（polyfill / transport shim / SW 注册）
//   proxy/cache.mjs           代理缓存（immutable 资源 + 会话列表瘦身结果，实例隔离 + 统一预算）
//   proxy/slim-worker.mjs     后台 Worker 线程解压/JSON 瘦身/重压缩引擎
//   proxy/hosts.mjs           Host 分级与来源判定（loopback / lan / public）
//   proxy/auth.mjs            密码与限速原语
//   proxy/auth-flow.mjs       认证通道（扫码配对 / 设备凭证 / 表单 / ?token= / cookie）与限速
//   proxy/handshake.mjs       dsh 会话 token 握手重试计数
//   proxy/pages.mjs           各类提示页（登录 / 配对过期 / 局域网关闭 / 桌面门禁 / 握手）
//   proxy/ws.mjs              WebSocket 帧边界心跳
//   proxy/response-gate.mjs   303 过渡页与桌面门禁改写
//   proxy/html-inject.mjs     HTML 注入（解压后再注入）
//   proxy/slim-response.mjs   会话列表瘦身与并发闸门
//   proxy/response-encode.mjs 流式压缩 / 转码 / 透传
//   proxy/upgrade.mjs         WS upgrade 转发、per-IP 名额与设备活跃连接追踪

import { DEFAULT_INJECT, SW_SCRIPT, SW_SCRIPT_PATH } from './proxy/inject.mjs';
import {
  SESSION_LIST_BODY_MAX,
  SESSION_LIST_SLIM_RE,
  acceptedCodings,
  activateProxyCache,
  createProxyCache,
  deactivateProxyCache,
  isImmutableUrl,
  runWithProxyCache,
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

/** 零 I/O 存活与吊销探针路径（鉴权后直回 204，手机端断线看门狗专用）。 */
export const POCKET_PING_PATH = '/__dsh-pocket/ping';

// 对外导出面：拆包后保持 lib/proxy.mjs 的既有契约（lib/index.js、lib/service.mjs 与测试都从这里取）。
export {
  DEFAULT_INJECT, RANDOM_UUID_POLYFILL, SW_REGISTER_SCRIPT, SW_SCRIPT, SW_SCRIPT_PATH,
  TRANSPORT_API_CLIENT_SHIM, advancedNoticeScript, desktopEnvPatchScript,
} from './proxy/inject.mjs';
export {
  CACHE_BUDGET, HASHED_ASSET_RE, clearProxyCaches, createProxyCache, isImmutableUrl, proxyCacheStats,
} from './proxy/cache.mjs';
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
 * @param {object} [opts.auth]       可选访问认证：{ getToken, getAltTokens?, isProtected, sessionKey, devices?, pairing? }
 * @param {object|false} [opts.rateLimit] 登录速率限制参数覆盖（测试用短窗口）
 * @param {object|false} [opts.heartbeat] WebSocket 心跳注入：{ intervalMs, missLimit }；false 关闭
 * @param {() => boolean} [opts.lanAccessEnabled] 局域网访问是否开启（默认开启）
 * @param {object} [opts.cache]      可选自定义代理缓存实例（createProxyCache 返回值）
 * @param {object} [opts.cacheBudget] 可选自定义代理缓存预算
 * @returns {Promise<{server:import('node:http').Server, port:number, cache:ReturnType<typeof createProxyCache>, close:()=>Promise<void>}>}
 */
export function createPocketProxy({
  port = 3081,
  host = '0.0.0.0',
  upstream = DEFAULT_UPSTREAM,
  log = null,
  injectHtml = DEFAULT_INJECT,
  auth = null,
  rateLimit = null,
  heartbeat = {},
  lanAccessEnabled = () => true,
  launchToken = () => '',
  handshakeLimit,
  cache = null,
  cacheBudget,
} = {}) {
  const limiter = auth ? createRateLimiter(rateLimit ?? {}) : null;
  const proxyCache = cache ?? createProxyCache(cacheBudget);
  const ownsCache = cache === null;
  activateProxyCache(proxyCache);

  const upstreamAgent = new HttpAgent({ keepAlive: true, maxSockets: 32, maxFreeSockets: 8 });
  const handshake = createHandshakeTracker(
    typeof handshakeLimit === 'number' ? { max: handshakeLimit } : {},
  );
  const slimGate = createSlimInflightGate();

  function handleClientRequest(req, res) {
    // 策略判定一律用 policyHost（issue #90）：Host 头可伪造，用不可伪造的 TCP 源地址设下限。
    let host = policyHost(req, String(req.headers.host ?? ''));
    // 隧道流量强制按公网判定：cloudflared 从 loopback 回连，带 Cloudflare 边缘注入头。
    if (isCloudflareTunnelRequest(req) && classifyHost(host) !== 'public') host = TUNNEL_POLICY_HOST;
    const isPublic = classifyHost(host) === 'public';
    const originClass = isPublic ? 'public' : isLoopbackHost(host) ? 'loopback' : 'lan';

    // 局域网访问关闭（issue #54）：拦截经局域网 IP/主机名访问的请求；公网与 loopback 放行。
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

    // 访问控制门：配对票据 / 设备 cookie / 表单 / ?token= / cookie 与限速全在 auth-flow.mjs。
    if (auth && enforceAccessControl({ req, res, host, isPublic, auth, limiter, log })) return;

    let swPath = null;
    try { swPath = new URL(req.url, 'http://x').pathname; } catch { /* 畸形请求目标 */ }
    if (swPath === null) {
      res.writeHead(400, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' });
      res.end('dsh-pocket: malformed request target');
      return;
    }

    // 零 I/O 存活探针：位于 enforceAccessControl 之后，已吊销设备请求会先在上方返回 401，
    // 正常在线设备在 < 0.2ms 内收到 204（零上游往返、零磁盘 I/O）。
    if ((req.method === 'GET' || req.method === 'HEAD') && swPath === POCKET_PING_PATH) {
      res.writeHead(204, { 'cache-control': 'no-store' });
      res.end();
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
    const launchTok = (typeof launchToken === 'function' ? launchToken() : '') || '';
    const handshakeIp = clientIp(req);
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
    if (!didInjectToken && String(req.headers.cookie ?? '').includes(DSH_AUTH_COOKIE)) {
      handshake.clear(handshakeIp);
    }
    if (handshakeOver && isHtmlRequest(req)) {
      res.writeHead(503, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'x-dsh-pocket-handshake': 'blocked',
      });
      res.end(handshakeBlockedPageHtml());
      return;
    }

    // 不可变资源命中缓存：连上游都不用打（本地回环往返与重压都省掉）。
    if (req.method === 'GET' && isImmutableUrl(upstreamPath) && acceptedCodings(req.headers['accept-encoding']).br) {
      const cached = proxyCache.immutableGet(upstreamPath);
      if (cached !== null) {
        res.writeHead(200, cached.headers);
        res.end(cached.body);
        return;
      }
    }

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
        const immutableUrl = req.method === 'GET' && proxyRes.statusCode === 200 && isImmutableUrl(upstreamPath)
          ? upstreamPath
          : null;
        if (serveEarlyResponseGate({ req, res, proxyRes, contentType, didInjectToken })) return;
        if (injectHtmlDocument({ req, res, proxyRes, contentType, injectHtml })) return;
        if (serveSlimSessionList({ req, res, proxyRes, contentType, codings, slimBodyDigest, slimRpcId, gate: slimGate, cache: proxyCache, log })) return;
        pipeUpstreamBody({ req, res, proxyRes, contentType, codings, immutableUrl, log });
      },
    );

    proxyReq.setTimeout(60_000, () => {
      log?.(`dsh-pocket: upstream idle timeout | 上游空闲超时: ${req.method} ${maskTokenForLog(req.url)}`);
      proxyReq.destroy(new Error('upstream idle timeout'));
    });

    let clientGone = false;
    res.on('close', () => {
      if (res.writableEnded || clientGone) return;
      clientGone = true;
      proxyReq.destroy(new Error('client closed connection | 客户端已断开'));
    });

    proxyReq.on('error', (err) => {
      if (clientGone) return;
      log?.(`dsh-pocket: upstream error | 上游错误: ${req.method} ${maskTokenForLog(req.url)} | ${err?.message ?? err}`);
      if (res.headersSent) { res.destroy(); return; }
      res.writeHead(502, { 'content-type': 'text/plain; charset=utf-8' });
      res.end(`dsh-pocket: 无法连接上游 dsh web（${upstream.host}:${upstream.port}）——先启动 dsh web | ${err.message}`);
    });

    if (wantsSlimBody) {
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
          req.pipe(proxyReq);
        }
      });
      req.on('end', () => {
        if (bodyOverflow) return;
        const body = Buffer.concat(bodyChunks);
        if (bodyBytes <= SESSION_LIST_BODY_MAX) {
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

  const server = createServer((req, res) => {
    const crash = (err) => {
      log?.(`dsh-pocket: request handler error | 请求处理异常: ${err?.message ?? err}`);
      try {
        if (!res.headersSent) {
          res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' });
          res.end('dsh-pocket: internal error');
        } else {
          res.destroy();
        }
      } catch { /* 连接已断 */ }
    };
    try {
      const pending = runWithProxyCache(proxyCache, () => handleClientRequest(req, res));
      if (pending && typeof pending.then === 'function') pending.catch(crash);
    } catch (err) {
      crash(err);
    }
  });

  server.maxConnections = 256;
  server.headersTimeout = 30_000;
  server.requestTimeout = 120_000;

  const wsSlots = createWsSlotLimiter();
  const handleClientUpgrade = createUpgradeHandler({ upstream, auth, limiter, lanAccessEnabled, log, heartbeat });

  server.on('upgrade', (req, socket, head) => {
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

  const clientSockets = new Set();
  server.on('connection', (sock) => {
    clientSockets.add(sock);
    sock.on('close', () => clientSockets.delete(sock));
    sock.on('error', () => {});
  });

  return new Promise((resolve, reject) => {
    server.once('error', (err) => {
      deactivateProxyCache(proxyCache);
      if (ownsCache) proxyCache.dispose();
      reject(err);
    });
    server.listen(port, host, () => {
      const actualPort = server.address().port;
      resolve({
        server,
        port: actualPort,
        cache: proxyCache,
        close: () => new Promise((r) => {
          for (const s of clientSockets) { try { s.destroy(); } catch { /* 忽略 */ } }
          try { upstreamAgent.destroy(); } catch { /* 忽略 */ }
          try {
            deactivateProxyCache(proxyCache);
            if (ownsCache) proxyCache.dispose();
            else proxyCache.clear();
          } catch { /* 忽略 */ }
          server.close(() => r());
        }),
      });
    });
  });
}
