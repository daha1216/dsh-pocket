// 访问认证与来源识别原语（PIN / 一次性配对参数清理 / 速率限制 / Loopback 权威改写）。
//
// 登录页与过期提示页在 pages.mjs；把设备 Cookie、扫码配对与备用 PIN 串成完整门禁流程的逻辑在 auth-flow.mjs。

import { createHash, timingSafeEqual } from 'node:crypto';
import { classifySource, POCKET_ORIGIN_HEADER } from './hosts.mjs';

// ---------- 传统访问令牌 Cookie（备用 PIN 登录通道） ----------
export const TOKEN_COOKIE = 'dsh_pocket_token';
export const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 天（秒）

/** cookie 校验值：有 sessionKey 时派生，无则退化为 PIN 本身（向后兼容）。 */
export function cookieFor(token, sessionKey) {
  if (!sessionKey) return token;
  return createHash('sha256').update(`${token}:${sessionKey}`).digest('hex');
}

// ---------- 登录与配对速率限制（issue #40，单 IP + 全局滑动/固定窗口双栅栏） ----------
export const DEFAULT_RATE_LIMIT = {
  windowMs: 60_000,      // 失败计数窗口
  maxFailures: 5,        // 窗口内单 IP 失败阈值 → 触发单 IP 锁
  lockMs: 60_000,        // 单 IP 锁定时长
  globalMaxFailures: 50, // 全局失败阈值 → 触发全局锁
  globalLockMs: 30_000,  // 全局锁定时长
};

export function createRateLimiter(cfg = {}) {
  const c = { ...DEFAULT_RATE_LIMIT, ...cfg };
  const failCounts = new Map(); // ip -> { count, windowStart }
  const ipLocks = new Map();    // ip -> lockedUntil
  const trustedIps = new Map(); // ip -> 最近一次成功登录时间（全局锁豁免名单）
  const TRUST_TTL_MS = 24 * 60 * 60 * 1000;
  const isTrusted = (ip, now) => {
    const at = trustedIps.get(ip) ?? 0;
    if (at === 0) return false;
    if (now - at > TRUST_TTL_MS) { trustedIps.delete(ip); return false; }
    return true;
  };
  const global = { count: 0, windowStart: 0, lockedUntil: 0 };
  const COMPARE_BURST = 10;
  const COMPARE_REFILL_MS = 100;
  let compareTokens = COMPARE_BURST;
  let compareRefillAt = Date.now();
  return {
    status(ip) {
      const now = Date.now();
      const until = ipLocks.get(ip) ?? 0;
      if (until > now) return { locked: true, retryAfter: Math.ceil((until - now) / 1000), scope: 'ip' };
      if (global.lockedUntil > now && !isTrusted(ip, now)) {
        return { locked: true, retryAfter: Math.ceil((global.lockedUntil - now) / 1000), scope: 'global' };
      }
      return { locked: false, retryAfter: 0, scope: null };
    },
    allowCompare(ip) {
      const now = Date.now();
      const locked = global.lockedUntil > now && !isTrusted(ip, now);
      if (!locked) return true;
      if (now - compareRefillAt >= COMPARE_REFILL_MS) {
        const periods = Math.floor((now - compareRefillAt) / COMPARE_REFILL_MS);
        compareTokens = Math.min(COMPARE_BURST, compareTokens + periods);
        compareRefillAt += periods * COMPARE_REFILL_MS;
      }
      if (compareTokens <= 0) return false;
      compareTokens--;
      return true;
    },
    record(ip) {
      const now = Date.now();
      let rec = failCounts.get(ip);
      if (!rec || now - rec.windowStart > c.windowMs) rec = { count: 0, windowStart: now };
      rec.count++;
      failCounts.set(ip, rec);
      if (now - global.windowStart > c.windowMs) { global.count = 0; global.windowStart = now; }
      global.count++;
      if (rec.count >= c.maxFailures) ipLocks.set(ip, now + c.lockMs);
      if (global.count >= c.globalMaxFailures) global.lockedUntil = now + c.globalLockMs;
      if (failCounts.size > 2000) {
        for (const [k, v] of failCounts) {
          if (now - v.windowStart > c.windowMs) failCounts.delete(k);
        }
      }
      if (ipLocks.size > 2000) {
        for (const [k, v] of ipLocks) {
          if (v <= now) ipLocks.delete(k);
        }
      }
    },
    clear(ip) {
      failCounts.delete(ip);
      ipLocks.delete(ip);
      trustedIps.set(ip, Date.now());
      if (trustedIps.size > 500) {
        const now = Date.now();
        for (const [k, v] of trustedIps) if (now - v > TRUST_TTL_MS) trustedIps.delete(k);
        while (trustedIps.size > 500) trustedIps.delete(trustedIps.keys().next().value);
      }
    },
  };
}

/**
 * 客户端真实 IP（仅 loopback 来源的 cloudflared 回连才信任 cf-connecting-ip）。
 */
export function clientIp(req) {
  const addr = String(req.socket?.remoteAddress ?? '');
  if (classifySource(addr) === 'loopback') {
    const cf = String(req.headers['cf-connecting-ip'] ?? '').trim();
    if (cf) return cf;
  }
  return addr || 'unknown';
}

export function parseCookies(header) {
  const out = {};
  for (const part of String(header ?? '').split(';')) {
    const eq = part.indexOf('=');
    if (eq > 0) out[part.slice(0, eq).trim()] = part.slice(eq + 1).trim();
  }
  return out;
}

/** 常量时间字符串比较（issue #90）。 */
export function safeEqual(a, b) {
  const ba = Buffer.from(String(a ?? ''), 'utf8');
  const bb = Buffer.from(String(b ?? ''), 'utf8');
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/** 参数名是否为访问密码参数（大小写不敏感）。 */
export function isTokenParamName(name) {
  return String(name ?? '').toLowerCase() === 'token';
}

/** 参数名是否为一步扫码配对票据参数（大小写不敏感）。 */
export function isPairParamName(name) {
  return String(name ?? '').toLowerCase() === 'pair';
}

/** 请求是否处于 HTTPS 语义上下文（公网隧道或显式反代 https）。 */
export function isSecureRequest(req, isPublic) {
  if (isPublic) return true;
  const xfp = String(req?.headers?.['x-forwarded-proto'] ?? '').split(',')[0].trim().toLowerCase();
  return xfp === 'https';
}

/** 提取 URL 查询参数中的 ?pair=<ticket>（供一步扫码兑换使用）。 */
export function extractQueryPairTicket(reqUrl) {
  try {
    const u = new URL(reqUrl ?? '/', 'http://x');
    for (const [key, value] of u.searchParams) {
      if (isPairParamName(key)) {
        return { present: true, ticket: value.trim() };
      }
    }
    return { present: false, ticket: '' };
  } catch {
    return { present: false, ticket: '' };
  }
}

/** 从请求路径中彻底剥离所有大小写形式的 `pair` 参数，保留其余查询参数。 */
export function stripPairParam(reqUrl) {
  let u;
  try { u = new URL(reqUrl ?? '/', 'http://dsh.invalid'); } catch { return reqUrl; }
  const entries = [...u.searchParams.entries()];
  if (!entries.some(([key]) => isPairParamName(key))) return reqUrl;
  const params = new URLSearchParams();
  for (const [key, value] of entries) {
    if (!isPairParamName(key)) params.append(key, value);
  }
  u.search = params.toString();
  return `${u.pathname}${u.search}`;
}

export function tokenValueMatches(value, acceptedTokens) {
  const v = String(value ?? '');
  return acceptedTokens.some((token) => {
    if (!token) return false;
    if (safeEqual(v, token)) return true;
    return v.length > token.length && v.startsWith(token) && v[token.length] === ';';
  });
}

/** 删掉 URLSearchParams 里所有大小写形式的 `token` 与 `pair` 参数（用于 Referer 脱敏）。 */
export function deleteTokenParams(params) {
  for (const key of [...params.keys()]) {
    if (isTokenParamName(key) || isPairParamName(key)) params.delete(key);
  }
}

export function hasQueryToken(req) {
  try {
    const u = new URL(req.url ?? '/', 'http://x');
    for (const [key, value] of u.searchParams) {
      if (isTokenParamName(key) && value.length > 0) return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function authCheck(req, tokens, sessionKey) {
  const list = (Array.isArray(tokens) ? tokens : tokens ? [tokens] : []).filter(Boolean);
  if (list.length === 0) return { ok: true, rawQueryToken: null };
  const cookies = parseCookies(req.headers.cookie);
  const cookieTok = cookies[TOKEN_COOKIE];
  if (cookieTok) {
    for (const token of list) {
      if (safeEqual(cookieTok, cookieFor(token, sessionKey))) return { ok: true, rawQueryToken: null };
    }
  }
  try {
    const u = new URL(req.url ?? '/', 'http://x');
    for (const [key, value] of u.searchParams) {
      if (!isTokenParamName(key)) continue;
      for (const token of list) {
        if (safeEqual(value, token) || (value.length > token.length && value.startsWith(token) && value[token.length] === ';')) {
          return { ok: true, rawQueryToken: token };
        }
      }
    }
  } catch { /* 视为无 token */ }
  return { ok: false, rawQueryToken: null };
}

/** 向响应头对象追加一条或多条 Set-Cookie。 */
export function appendSetCookieHeader(headers, cookiesToAdd) {
  const additions = (Array.isArray(cookiesToAdd) ? cookiesToAdd : [cookiesToAdd]).filter(Boolean);
  if (additions.length === 0) return headers;
  const prev = headers['set-cookie'];
  if (Array.isArray(prev)) {
    headers['set-cookie'] = [...prev, ...additions];
  } else if (typeof prev === 'string') {
    headers['set-cookie'] = [prev, ...additions];
  } else {
    headers['set-cookie'] = additions.length === 1 ? additions[0] : additions;
  }
  return headers;
}

/**
 * 当请求通过 `?token=<原始 PIN>` 进入时，在首个响应里注入 HttpOnly 认证 Cookie（及可选设备 Cookie）。
 */
export function maybeSeedAuthCookie(req, res, rawToken, sessionKey, extraCookies = []) {
  const cookiesToInject = [];
  if (rawToken && sessionKey) {
    const expected = cookieFor(rawToken, sessionKey);
    const existing = parseCookies(req.headers.cookie)[TOKEN_COOKIE];
    if (expected && (existing === undefined || !safeEqual(existing, expected))) {
      cookiesToInject.push(`${TOKEN_COOKIE}=${expected}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${COOKIE_MAX_AGE}`);
    }
  }
  for (const extra of extraCookies) {
    if (extra) cookiesToInject.push(extra);
  }
  if (cookiesToInject.length === 0) return;

  const origWriteHead = res.writeHead.bind(res);
  res.writeHead = function (statusCode, statusMessage, headers) {
    const hasMessage = typeof statusMessage === 'string';
    const h = { ...((hasMessage ? headers : statusMessage) ?? {}) };
    appendSetCookieHeader(h, cookiesToInject);
    return hasMessage ? origWriteHead(statusCode, statusMessage, h) : origWriteHead(statusCode, h);
  };
}

/**
 * 把浏览器可见的权威改写成 loopback 权威，并清洗 Referer 中的明文 token 与 pair 参数。
 */
export function loopbackAuthority(headers, upstream) {
  const authority = `${upstream.host}:${upstream.port}`;
  const out = {};
  for (const [k, v] of Object.entries(headers)) {
    const lk = k.toLowerCase();
    if (lk === 'host' || lk === 'origin' || lk === 'referer' || lk === 'sec-fetch-site' || lk === POCKET_ORIGIN_HEADER) continue;
    out[lk] = v;
  }
  out.host = authority;
  out.origin = `http://${authority}`;
  const referer = headers.referer ?? headers.Referer;
  if (referer) {
    try {
      const ref = new URL(referer);
      ref.protocol = 'http:';
      ref.host = authority;
      deleteTokenParams(ref.searchParams);
      out.referer = ref.toString();
    } catch {
      out.referer = `http://${authority}/`;
    }
  }
  out['sec-fetch-site'] = 'same-origin';
  return out;
}

/** 从请求目标上摘掉「值命中已接受访问密码」的 `token` 参数，保留 dsh 自身的启动 token。 */
export function stripPocketToken(reqUrl, acceptedTokens) {
  if (!Array.isArray(acceptedTokens) || acceptedTokens.length === 0) return reqUrl;
  let u;
  try { u = new URL(reqUrl ?? '/', 'http://dsh.invalid'); } catch { return reqUrl; }
  const entries = [...u.searchParams.entries()];
  if (!entries.some(([key]) => isTokenParamName(key))) return reqUrl;
  let changed = false;
  const kept = [];
  for (const [key, value] of entries) {
    if (isTokenParamName(key) && tokenValueMatches(value, acceptedTokens)) {
      changed = true;
      continue;
    }
    kept.push([key, value]);
  }
  if (!changed) return reqUrl;
  const params = new URLSearchParams();
  for (const [key, value] of kept) params.append(key, value);
  u.search = params.toString();
  return `${u.pathname}${u.search}`;
}

/** 日志脱敏：同时抹掉 `?token=` 与 `?pair=` 的敏感参数值。 */
export function maskTokenForLog(reqUrl) {
  return String(reqUrl ?? '').replace(/([?&](?:token|pair)=)[^&#\s]*/gi, '$1***');
}
