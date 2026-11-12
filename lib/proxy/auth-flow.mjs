// 访问控制门：把「谁能进来」从请求处理里拆出来（2026-11-12 评审 §3.1）。
//
// 三条通道等价（issue #13/#18/#33/#40/#69/#90）：
//   ① POST /pocket-login 表单提交 PIN → 种 30 天 HttpOnly cookie；
//   ② ?token=<PIN> 直达 → 种同样的 cookie 并立刻把明文 PIN 从请求目标上摘掉；
//   ③ 已有的 cookie / ?token= 直接校验通过。
// 三条都要走同一套限速：单 IP 锁 + 全局锁，比对本身也受 allowCompare 预算约束
// （只回 429 不做节流等于给攻击者「解锁即无限猜」）。
//
// 返回 true 表示已经回过包（调用方必须立刻 return），false 表示放行继续转发。
import {
  COOKIE_MAX_AGE, TOKEN_COOKIE, authCheck, clientIp, cookieFor, hasQueryToken, maybeSeedAuthCookie,
  safeEqual, stripPocketToken,
} from './auth.mjs';
import { isHtmlRequest, isProtectedHost } from './hosts.mjs';
import { loginPageHtml } from './pages.mjs';

/**
 * @param {{req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse,
 *   host: string, isPublic: boolean, auth: object, limiter: object|null, log: Function|null}} ctx
 * @returns {boolean} 已回过包
 */
export function enforceAccessControl({ req, res, host, isPublic, auth, limiter, log }) {
  const protectedHost = isProtectedHost(host, auth.isProtected);
  const token = protectedHost ? (auth.getToken?.(host) ?? null) : null;
  // 临时 PIN（issue #69）：按 host 同源分发（公网临时 PIN 只在公网入口放行，局域网同理）
  const altTokens = protectedHost && token && typeof auth.getAltTokens === 'function' ? (auth.getAltTokens(host) ?? []) : [];
  const sessionKey = auth.sessionKey ?? null;
  const acceptedTokens = token ? [token, ...altTokens] : [];
  // 长期 PIN 允许密码管理器保存；调用方未声明时保守地按临时凭据处理。
  const credentialKind = protectedHost && typeof auth.getCredentialKind === 'function'
    ? (auth.getCredentialKind(host) ?? 'ephemeral')
    : 'ephemeral';
  if (protectedHost && token) {
    const ip = clientIp(req);
    // 登录提交：速率限制（issue #40）→ 校验密码 → 种持久 HttpOnly cookie（30 天，绑定进程会话密钥）→ 回首页
    // 路径精确匹配：startsWith 会把 /pocket-loginXYZ 也吃进登录分支。
    let loginPath = null;
    try { loginPath = new URL(req.url, 'http://x').pathname; } catch { loginPath = null; }
    if (req.method === 'POST' && loginPath === '/pocket-login') {
      const rl = limiter?.status(ip) ?? { locked: false, retryAfter: 0, scope: null };
      // 单 IP 锁直接拒绝（否则这个 IP 可以无限猜）；全局锁只拦「继续猜」，
      // 正确密码必须能进来 —— 详见 createRateLimiter status() 的注释。
      if (rl.locked && rl.scope === 'ip') {
          res.writeHead(429, {
            'content-type': 'text/html; charset=utf-8',
            'cache-control': 'no-store',
            'retry-after': String(rl.retryAfter),
          });
          res.end(loginPageHtml('locked', isPublic, rl.retryAfter, credentialKind));
        return true;
      }
      let body = '';
      let tooLarge = false;
      req.on('data', (c) => {
        if (tooLarge) return;
        body += c;
        if (body.length > 1024) {
          // 超长请求体不再静默 req.destroy()（浏览器只看到连接被重置、错误不可读）：
          // 明确回 413，刷出响应后再断开，避免继续接收。
          tooLarge = true;
          body = '';
          res.writeHead(413, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' });
          res.end('请求体过大 | payload too large');
          res.once('finish', () => req.destroy());
        }
      });
      req.on('end', () => {
        if (tooLarge) return;
        // 请求体读取期间其他并发请求可能已触发锁定，比较密码前必须再次检查。
        // 否则攻击者可预先挂起大量 POST，再同时结束请求体，批量穿透限速。
        const finalRl = limiter?.status(ip) ?? { locked: false, retryAfter: 0, scope: null };
        if (finalRl.locked && finalRl.scope === 'ip') {
          res.writeHead(429, {
            'content-type': 'text/html; charset=utf-8',
            'cache-control': 'no-store',
            'retry-after': String(finalRl.retryAfter),
          });
          res.end(loginPageHtml('locked', isPublic, finalRl.retryAfter, credentialKind));
          return;
        }
        const submitted = String(new URLSearchParams(body).get('token') ?? '');
        // 全局锁期间比对也限速（见 allowCompare）：否则触发一次全局锁后攻击者
        // 可以以网络速度持续猜，锁只改变了错误响应的形状，不改变猜测吞吐。
        // 正确的密码在预算内仍能登录；超出预算的短时间内会拿到锁定页。
        if (limiter && !limiter.allowCompare(ip)) {
          res.writeHead(429, {
            'content-type': 'text/html; charset=utf-8',
            'cache-control': 'no-store',
            'retry-after': String(finalRl.retryAfter || 1),
          });
          res.end(loginPageHtml('locked', isPublic, finalRl.retryAfter || 1, credentialKind));
          return;
        }
        // 与 cookie / ?token= 两条通道保持一致：常量时间比较 + 主 PIN 与替代令牌
        // （临时 PIN，issue #69 钩子）任一命中即放行。原先这里是 `submitted === token`
        // ——既会提前返回（计时侧信道可逐字节还原 PIN），又把替代令牌挡在门外。
        const matched = acceptedTokens.find((candidate) => safeEqual(submitted, candidate));
        if (matched !== undefined) {
          limiter?.clear(ip);
          res.writeHead(302, {
            // 带上 dsh-pocket-auth=1：登录成功后强制重做一次浏览器会话握手，
            // 换掉可能已过期/被撤销的 dsh web 会话 cookie（issue #77）
            location: '/?dsh-pocket-auth=1',
            'set-cookie': `${TOKEN_COOKIE}=${cookieFor(matched, sessionKey)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${COOKIE_MAX_AGE}`,
            'cache-control': 'no-store',
          });
          res.end();
        } else {
          limiter?.record(ip);
          log?.(`dsh-pocket: login failed from ${ip} | 登录失败 IP: ${ip}`);
          // 全局锁期间密码错误：429 + 锁定页，别回 200 让人以为只是密码错。
          if (finalRl.locked) {
            res.writeHead(429, {
              'content-type': 'text/html; charset=utf-8',
              'cache-control': 'no-store',
              'retry-after': String(finalRl.retryAfter),
            });
            res.end(loginPageHtml('locked', isPublic, finalRl.retryAfter, credentialKind));
            return;
          }
          res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
          res.end(loginPageHtml(true, isPublic, 0, credentialKind));
        }
      });
      return true;
    }
    // `?token=<PIN>` 是与 POST 登录等价的一次密码尝试（issue #90）：此前只有 POST
    // 分支调用 limiter.record()，这条通道既不计数也不受锁定约束，等于给攻击者留了
    // 一个可全速穷举 8 位 PIN 的旁路。下面把它并入同一套限速。
    const isGuess = hasQueryToken(req);
    let guessLock = { locked: false, retryAfter: 0, scope: null };
    if (isGuess) {
      guessLock = limiter?.status(ip) ?? guessLock;
      // 单 IP 锁：直接拒绝、不做比对（否则锁定窗口就是免费穷举窗口）。
      // 全局锁：仍然比对——正确密码放行，错误密码等下走 429/锁定页。
      if (guessLock.locked && guessLock.scope === 'ip') {
        if (isHtmlRequest(req)) {
          res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
          res.end(loginPageHtml('locked', isPublic, guessLock.retryAfter, credentialKind));
        } else {
          res.writeHead(429, {
            'content-type': 'application/json',
            'cache-control': 'no-store',
            'retry-after': String(guessLock.retryAfter),
          });
          res.end('{"error":"too-many-attempts"}');
        }
        return true;
      }
    }
    // 全局锁期间比对也要限速（见 allowCompare）：只回 429 不做节流等于给攻击者
    // 一次「解锁即无限猜」的机会。超预算直接拒绝，不做 safeEqual。
    if (isGuess && limiter && !limiter.allowCompare(ip)) {
      if (isHtmlRequest(req)) {
        res.writeHead(429, {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-store',
          'retry-after': String(guessLock.retryAfter || 1),
        });
        res.end(loginPageHtml('locked', isPublic, guessLock.retryAfter || 1, credentialKind));
      } else {
        res.writeHead(429, {
          'content-type': 'application/json',
          'cache-control': 'no-store',
          'retry-after': String(guessLock.retryAfter || 1),
        });
        res.end('{"error":"too-many-attempts"}');
      }
      return true;
    }
    const authResult = authCheck(req, acceptedTokens, sessionKey);
    if (!authResult.ok) {
      if (isGuess) {
        limiter?.record(ip);
        log?.(`dsh-pocket: bad ?token= from ${ip} | URL 密码错误 IP: ${ip}`);
      }
      if (isGuess && guessLock.locked) {
        // 全局锁期间错误尝试：明确 429，不再进入普通登录页（避免被当成可继续猜）。
        if (isHtmlRequest(req)) {
          res.writeHead(429, {
            'content-type': 'text/html; charset=utf-8',
            'cache-control': 'no-store',
            'retry-after': String(guessLock.retryAfter),
          });
          res.end(loginPageHtml('locked', isPublic, guessLock.retryAfter, credentialKind));
        } else {
          res.writeHead(429, {
            'content-type': 'application/json',
            'cache-control': 'no-store',
            'retry-after': String(guessLock.retryAfter),
          });
          res.end('{"error":"too-many-attempts"}');
        }
        return true;
      }
      if (isHtmlRequest(req)) {
        // 锁定期间打开登录页也给提示（HTTP 200 + 锁定文案；429 语义留给 POST 拒绝）
        const rl = limiter?.status(ip) ?? { locked: false, retryAfter: 0 };
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
        res.end(loginPageHtml(rl.locked ? 'locked' : false, isPublic, rl.retryAfter, credentialKind));
      } else {
        res.writeHead(401, { 'content-type': 'application/json', 'cache-control': 'no-store' });
        res.end('{"error":"unauthorized"}');
      }
      return true;
    }
    // ?token=<原始 PIN> 直达时种 HttpOnly cookie，让浏览器后续子资源也走 cookie 路径（issue #35）
    if (authResult.rawQueryToken) {
      limiter?.clear(ip); // 与 POST 登录成功一致：正确的分享链接不该逐步累积到锁定
      maybeSeedAuthCookie(req, res, authResult.rawQueryToken, sessionKey);
    }
    // 认证已通过：把明文 PIN 从请求目标上摘掉再往下走（隐私审计）。
    // 不论这次是靠 cookie 还是靠 `?token=` 通过都要摘——用户收藏了带 PIN 的
    // 分享链接后每次打开都还带它，只摘「首次种 cookie」那一次等于没修。
    // 记录「确实摘过」：HTML 页面据此注入 history.replaceState 清掉地址栏里的 PIN。
    const scrubbedUrl = stripPocketToken(req.url, acceptedTokens);
    if (scrubbedUrl !== req.url) req.__pocketTokenScrubbed = true;
    req.url = scrubbedUrl;
  } else if (protectedHost) {
    // fail closed（issue #66 的边界）：protectedHost 为真但取不到 PIN 时，
    // 旧逻辑 `if (protectedHost && token)` 会整段跳过认证、请求直接透传到上游——
    // token 文件权限异常/磁盘错误就会变成静默的公网裸奔。宁可 503。
    log?.('dsh-pocket: access PIN unavailable — refusing protected request | 访问密码读取失败，已拒绝受保护请求');
    res.writeHead(503, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' });
    res.end('dsh-pocket: access PIN unavailable | 访问密码不可用，请重启 dsh');
    return true;
  } else {
    // auth 已配置但这台 Host 不受保护（本机入口 / 关掉了局域网密码）：不需要认证，
    // 但分享链接里的 PIN 仍然不能进上游请求行、日志或地址栏——不认证不等于可以
    // 把密码当普通参数转发（审计 F1：旧实现只在受保护 Host 上剥离）。
    const loose = [];
    try {
      const t = auth.getToken?.(host) ?? null;
      if (t) loose.push(t);
      const alt = typeof auth.getAltTokens === 'function' ? auth.getAltTokens(host) : null;
      if (Array.isArray(alt)) loose.push(...alt);
    } catch { /* 取不到 PIN 就没有可摘的值 */ }
    if (loose.length > 0) {
      const scrubbed = stripPocketToken(req.url, loose);
      if (scrubbed !== req.url) req.__pocketTokenScrubbed = true;
      req.url = scrubbed;
    }
  }
  return false;
}
