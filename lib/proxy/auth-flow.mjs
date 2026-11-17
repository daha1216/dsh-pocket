// 访问控制门（v4.0：一步扫码配对 + 持久设备凭据 + 备用 PIN 登录 + 统一防爆破限速）。
//
// 认证通道优先级：
//   1. GET /?pair=<ticket> 一次性扫码配对：校验通道绑定与有效期 → 注册设备 → 种 1 年期
//      dsh_pocket_device Cookie → 302 跳转 /?dsh-pocket-auth=1（彻底剥离 ?pair=）；
//      无效/过期票据同样纳入 limiter 计数，并返回现代化的 pairExpiredPageHtml 引导重新扫码。
//   2. POST /pocket-login 表单备用 PIN 登录：常量时间比对 → 种 dsh_pocket_token（及存在
//      auth.devices 时同步注册设备并种 dsh_pocket_device，使手动登录设备也支持持久会话与单台撤销）。
//   3. 已携带有效 dsh_pocket_device Cookie：严格通道校验通过后标记 req.__pocketDeviceId 放行；
//      若该设备已被显式撤销（revoked=true）且无新的有效 ?token= 参数，拒绝旧会话并清理失效 Cookie。
//   4. 传统 dsh_pocket_token Cookie / ?token=<PIN> 分享链接：100% 向后兼容；?token= 首次命中时
//      同步补发设备 Cookie 并剥离 URL 明文 PIN。
//
// 返回 true 表示已接管并写回响应（调用方须立即 return），false 表示允许继续转发。

import {
  COOKIE_MAX_AGE, TOKEN_COOKIE, appendSetCookieHeader, authCheck, clientIp, cookieFor,
  extractQueryPairTicket, hasQueryToken, isSecureRequest, maybeSeedAuthCookie,
  safeEqual, stripPairParam, stripPocketToken,
} from './auth.mjs';
import { formatClearDeviceSetCookie, formatDeviceSetCookie } from '../auth/device-store.mjs';
import { isHtmlRequest, isProtectedHost } from './hosts.mjs';
import { loginPageHtml, pairExpiredPageHtml, resolvePageLang } from './pages.mjs';

/**
 * @param {{req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse,
 *   host: string, isPublic: boolean, auth: object, limiter: object|null, log: Function|null}} ctx
 * @returns {boolean} 已回过包
 */
export function enforceAccessControl({ req, res, host, isPublic, auth, limiter, log }) {
  const lang = resolvePageLang(req.headers?.['accept-language']);
  const channel = isPublic ? 'public' : 'lan';
  const secure = isSecureRequest(req, isPublic);
  const protectedHost = isProtectedHost(host, auth.isProtected);
  const token = protectedHost ? (auth.getToken?.(host) ?? null) : null;
  const altTokens = protectedHost && token && typeof auth.getAltTokens === 'function' ? (auth.getAltTokens(host) ?? []) : [];
  const sessionKey = auth.sessionKey
    ?? (typeof auth.devices?.getCookieSecret === 'function' ? auth.devices.getCookieSecret() : null);
  const acceptedTokens = token ? [token, ...altTokens] : [];
  const credentialKind = protectedHost && typeof auth.getCredentialKind === 'function'
    ? (auth.getCredentialKind(host) ?? 'ephemeral')
    : 'ephemeral';

  // ---------- 通道 0：一步扫码配对（GET /?pair=<ticket>） ----------
  if (auth.pairing && typeof auth.pairing.redeem === 'function') {
    const pairInfo = extractQueryPairTicket(req.url);
    if (pairInfo.present) {
      // 相机/IM 链接预览可能先发 HEAD 探测：绝不能在 HEAD 里烧掉单次票据
      if (req.method === 'HEAD') {
        res.writeHead(200, { 'cache-control': 'no-store' });
        res.end();
        return true;
      }
      const ip = clientIp(req);
      const htmlWanted = isHtmlRequest(req);
      const rl = limiter?.status(ip) ?? { locked: false, retryAfter: 0, scope: null };
      if (rl.locked && rl.scope === 'ip') {
        res.writeHead(429, {
          'content-type': htmlWanted ? 'text/html; charset=utf-8' : 'application/json',
          'cache-control': 'no-store',
          'retry-after': String(rl.retryAfter),
        });
        res.end(htmlWanted
          ? loginPageHtml('locked', isPublic, rl.retryAfter, credentialKind, lang)
          : '{"error":"too-many-attempts"}');
        return true;
      }
      if (pairInfo.ticket.length === 0) {
        res.writeHead(401, {
          'content-type': htmlWanted ? 'text/html; charset=utf-8' : 'application/json',
          'cache-control': 'no-store',
        });
        res.end(htmlWanted
          ? pairExpiredPageHtml('invalid', isPublic, lang)
          : '{"error":"invalid-pairing-ticket","reason":"invalid"}');
        return true;
      }
      if (limiter && !limiter.allowCompare(ip)) {
        res.writeHead(429, {
          'content-type': htmlWanted ? 'text/html; charset=utf-8' : 'application/json',
          'cache-control': 'no-store',
          'retry-after': String(rl.retryAfter || 1),
        });
        res.end(htmlWanted
          ? loginPageHtml('locked', isPublic, rl.retryAfter || 1, credentialKind, lang)
          : '{"error":"too-many-attempts"}');
        return true;
      }

      const verdict = req.method === 'GET'
        ? auth.pairing.redeem(pairInfo.ticket, channel)
        : { ok: false, reason: 'invalid' };

      if (!verdict.ok) {
        limiter?.record(ip);
        log?.(`dsh-pocket: pairing rejected (${verdict.reason}) from ${ip} | 配对码无效(${verdict.reason}) IP: ${ip}`);
        if (rl.locked) {
          res.writeHead(429, {
            'content-type': htmlWanted ? 'text/html; charset=utf-8' : 'application/json',
            'cache-control': 'no-store',
            'retry-after': String(rl.retryAfter || 1),
          });
          res.end(htmlWanted
            ? pairExpiredPageHtml(verdict.reason, isPublic, lang)
            : `{"error":"too-many-attempts","reason":${JSON.stringify(verdict.reason)}}`);
          return true;
        }
        res.writeHead(401, {
          'content-type': htmlWanted ? 'text/html; charset=utf-8' : 'application/json',
          'cache-control': 'no-store',
        });
        res.end(htmlWanted
          ? pairExpiredPageHtml(verdict.reason, isPublic, lang)
          : `{"error":"invalid-pairing-ticket","reason":${JSON.stringify(verdict.reason)}}`);
        return true;
      }

      limiter?.clear(ip);
      const setCookies = [];
      if (typeof auth.devices?.issueDevice === 'function') {
        const issued = auth.devices.issueDevice({
          ua: String(req.headers['user-agent'] ?? ''),
          ip,
          channel,
          authMethod: 'pair',
        });
        if (issued?.device?.id) req.__pocketDeviceId = issued.device.id;
        if (issued?.cookieValue) {
          setCookies.push(formatDeviceSetCookie(issued.cookieValue, { secure }));
        }
      }
      req.url = stripPairParam(req.url);
      const redirectHeaders = {
        location: '/?dsh-pocket-auth=1',
        'cache-control': 'no-store',
      };
      appendSetCookieHeader(redirectHeaders, setCookies);
      res.writeHead(302, redirectHeaders);
      res.end();
      return true;
    }
  }

  if (protectedHost && token) {
    const ip = clientIp(req);
    let loginPath = null;
    try { loginPath = new URL(req.url, 'http://x').pathname; } catch { loginPath = null; }

    // ---------- 通道 1：POST /pocket-login 表单提交备用 PIN ----------
    if (req.method === 'POST' && loginPath === '/pocket-login') {
      const rl = limiter?.status(ip) ?? { locked: false, retryAfter: 0, scope: null };
      if (rl.locked && rl.scope === 'ip') {
        res.writeHead(429, {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-store',
          'retry-after': String(rl.retryAfter),
        });
        res.end(loginPageHtml('locked', isPublic, rl.retryAfter, credentialKind, lang));
        return true;
      }
      let body = '';
      let tooLarge = false;
      req.on('data', (c) => {
        if (tooLarge) return;
        body += c;
        if (body.length > 1024) {
          tooLarge = true;
          body = '';
          res.writeHead(413, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' });
          res.end('请求体过大 | payload too large');
          res.once('finish', () => req.destroy());
        }
      });
      req.on('end', () => {
        if (tooLarge) return;
        const finalRl = limiter?.status(ip) ?? { locked: false, retryAfter: 0, scope: null };
        if (finalRl.locked && finalRl.scope === 'ip') {
          res.writeHead(429, {
            'content-type': 'text/html; charset=utf-8',
            'cache-control': 'no-store',
            'retry-after': String(finalRl.retryAfter),
          });
          res.end(loginPageHtml('locked', isPublic, finalRl.retryAfter, credentialKind, lang));
          return;
        }
        const submitted = String(new URLSearchParams(body).get('token') ?? '');
        if (limiter && !limiter.allowCompare(ip)) {
          res.writeHead(429, {
            'content-type': 'text/html; charset=utf-8',
            'cache-control': 'no-store',
            'retry-after': String(finalRl.retryAfter || 1),
          });
          res.end(loginPageHtml('locked', isPublic, finalRl.retryAfter || 1, credentialKind, lang));
          return;
        }
        const matched = acceptedTokens.find((candidate) => safeEqual(submitted, candidate));
        if (matched !== undefined) {
          limiter?.clear(ip);
          const cookies = [
            `${TOKEN_COOKIE}=${cookieFor(matched, sessionKey)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${COOKIE_MAX_AGE}`,
          ];
          if (typeof auth.devices?.issueDevice === 'function') {
            const issued = auth.devices.issueDevice({
              ua: String(req.headers['user-agent'] ?? ''),
              ip,
              channel,
              authMethod: 'pin',
            });
            if (issued?.device?.id) req.__pocketDeviceId = issued.device.id;
            if (issued?.cookieValue) {
              cookies.push(formatDeviceSetCookie(issued.cookieValue, { secure }));
            }
          }
          const redirectHeaders = {
            location: '/?dsh-pocket-auth=1',
            'cache-control': 'no-store',
          };
          appendSetCookieHeader(redirectHeaders, cookies);
          res.writeHead(302, redirectHeaders);
          res.end();
        } else {
          limiter?.record(ip);
          log?.(`dsh-pocket: login failed from ${ip} | 登录失败 IP: ${ip}`);
          if (finalRl.locked) {
            res.writeHead(429, {
              'content-type': 'text/html; charset=utf-8',
              'cache-control': 'no-store',
              'retry-after': String(finalRl.retryAfter),
            });
            res.end(loginPageHtml('locked', isPublic, finalRl.retryAfter, credentialKind, lang));
            return;
          }
          res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
          res.end(loginPageHtml(true, isPublic, 0, credentialKind, lang));
        }
      });
      return true;
    }

    // ---------- 通道 2：持久设备 Cookie 校验（dsh_pocket_device） ----------
    const isGuess = hasQueryToken(req);
    const devCheck = typeof auth.devices?.verifyDeviceCookie === 'function'
      ? auth.devices.verifyDeviceCookie(req.headers.cookie, channel, { ip })
      : null;

    if (devCheck?.ok && !isGuess) {
      req.__pocketDeviceId = devCheck.device.id;
      const scrubbedUrl = stripPairParam(stripPocketToken(req.url, acceptedTokens));
      if (scrubbedUrl !== req.url) req.__pocketTokenScrubbed = true;
      req.url = scrubbedUrl;
      return false;
    }

    if (devCheck && !devCheck.ok && devCheck.reason === 'channel-mismatch' && !isGuess) {
      if (isHtmlRequest(req)) {
        const rl = limiter?.status(ip) ?? { locked: false, retryAfter: 0 };
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
        res.end(loginPageHtml(rl.locked ? 'locked' : false, isPublic, rl.retryAfter, credentialKind, lang));
      } else {
        res.writeHead(401, { 'content-type': 'application/json', 'cache-control': 'no-store' });
        res.end('{"error":"unauthorized","reason":"channel-mismatch"}');
      }
      return true;
    }

    // 若设备曾签发 dsh_pocket_device 但已在设置页被撤销（revoked=true），且当前请求未携带
    // 新的 ?token= 明文重登，必须立即拒绝并清掉失效 Cookie，禁止旧的 dsh_pocket_token 绕过单设备撤销！
    if (devCheck && !devCheck.ok && devCheck.revoked && !isGuess) {
      const clearCookies = [
        formatClearDeviceSetCookie({ secure }),
        `${TOKEN_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`,
      ];
      if (isHtmlRequest(req)) {
        const rl = limiter?.status(ip) ?? { locked: false, retryAfter: 0 };
        const h = { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' };
        appendSetCookieHeader(h, clearCookies);
        res.writeHead(200, h);
        res.end(loginPageHtml(rl.locked ? 'locked' : false, isPublic, rl.retryAfter, credentialKind, lang));
      } else {
        const h = { 'content-type': 'application/json', 'cache-control': 'no-store' };
        appendSetCookieHeader(h, clearCookies);
        res.writeHead(401, h);
        res.end('{"error":"unauthorized","revoked":true}');
      }
      return true;
    }

    // ---------- 通道 3：备用 ?token=<PIN> 分享链接与传统 TOKEN_COOKIE ----------
    let guessLock = { locked: false, retryAfter: 0, scope: null };
    if (isGuess) {
      guessLock = limiter?.status(ip) ?? guessLock;
      if (guessLock.locked && guessLock.scope === 'ip') {
        if (isHtmlRequest(req)) {
          res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
          res.end(loginPageHtml('locked', isPublic, guessLock.retryAfter, credentialKind, lang));
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
    if (isGuess && limiter && !limiter.allowCompare(ip)) {
      if (isHtmlRequest(req)) {
        res.writeHead(429, {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-store',
          'retry-after': String(guessLock.retryAfter || 1),
        });
        res.end(loginPageHtml('locked', isPublic, guessLock.retryAfter || 1, credentialKind, lang));
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
        if (isHtmlRequest(req)) {
          res.writeHead(429, {
            'content-type': 'text/html; charset=utf-8',
            'cache-control': 'no-store',
            'retry-after': String(guessLock.retryAfter),
          });
          res.end(loginPageHtml('locked', isPublic, guessLock.retryAfter, credentialKind, lang));
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
        const rl = limiter?.status(ip) ?? { locked: false, retryAfter: 0 };
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
        res.end(loginPageHtml(rl.locked ? 'locked' : false, isPublic, rl.retryAfter, credentialKind, lang));
      } else {
        res.writeHead(401, { 'content-type': 'application/json', 'cache-control': 'no-store' });
        res.end('{"error":"unauthorized"}');
      }
      return true;
    }

    if (devCheck?.ok) {
      req.__pocketDeviceId = devCheck.device.id;
    }
    if (authResult.rawQueryToken) {
      limiter?.clear(ip);
      const extraCookies = [];
      if (!devCheck?.ok && typeof auth.devices?.issueDevice === 'function') {
        const issued = auth.devices.issueDevice({
          ua: String(req.headers['user-agent'] ?? ''),
          ip,
          channel,
          authMethod: 'pin',
        });
        if (issued?.device?.id) req.__pocketDeviceId = issued.device.id;
        if (issued?.cookieValue) {
          extraCookies.push(formatDeviceSetCookie(issued.cookieValue, { secure }));
        }
      }
      maybeSeedAuthCookie(req, res, authResult.rawQueryToken, sessionKey, extraCookies);
    }

    const scrubbedUrl = stripPairParam(stripPocketToken(req.url, acceptedTokens));
    if (scrubbedUrl !== req.url) req.__pocketTokenScrubbed = true;
    req.url = scrubbedUrl;
  } else if (protectedHost) {
    if (typeof auth.devices?.verifyDeviceCookie === 'function') {
      const devCheck = auth.devices.verifyDeviceCookie(req.headers.cookie, channel, { ip: clientIp(req) });
      if (devCheck?.ok && devCheck.device?.id) {
        req.__pocketDeviceId = devCheck.device.id;
        req.url = stripPairParam(req.url);
        return false;
      }
    }
    // fail closed（issue #66）：protectedHost 为真但取不到访问密码且无已授权设备凭证时严禁裸奔透传
    log?.('dsh-pocket: access PIN unavailable — refusing protected request | 访问密码读取失败，已拒绝受保护请求');
    res.writeHead(503, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' });
    res.end('dsh-pocket: access PIN unavailable | 访问密码不可用，请重启 dsh');
    return true;
  } else {
    // 不受保护的入口（loopback / 已关闭局域网密码）：若带有效设备 Cookie 仍记录设备活跃状态，
    // 同时剥离任何残留的 ?pair= 或明文 ?token= 参数，避免落入上游日志或浏览器地址栏。
    if (typeof auth.devices?.verifyDeviceCookie === 'function') {
      const devCheck = auth.devices.verifyDeviceCookie(req.headers.cookie, channel, { ip: clientIp(req) });
      if (devCheck?.ok) req.__pocketDeviceId = devCheck.device.id;
    }
    const loose = [];
    try {
      const t = auth.getToken?.(host) ?? null;
      if (t) loose.push(t);
      const alt = typeof auth.getAltTokens === 'function' ? auth.getAltTokens(host) : null;
      if (Array.isArray(alt)) loose.push(...alt);
    } catch { /* 取不到 PIN 则仅清理 pair */ }
    let scrubbed = stripPairParam(req.url);
    if (loose.length > 0) scrubbed = stripPocketToken(scrubbed, loose);
    if (scrubbed !== req.url) req.__pocketTokenScrubbed = true;
    req.url = scrubbed;
  }
  return false;
}
