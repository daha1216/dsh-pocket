// 访问密码（PIN）认证与来源识别（评审 §3.2：认证从代理主流程里独立出来）。
//
// 这里只做「无状态判定 + 内存态限速」：cookie 派生、限速器、令牌比较、请求目标上的
// PIN 摘除、以及把浏览器权威改写成 loopback（详情见各处注释）。登录页与错误页在
// pages.mjs；把这几段串成登录流程的代码在代理主流程里。

import { createHash, timingSafeEqual } from 'node:crypto';
import { classifySource, POCKET_ORIGIN_HEADER } from './hosts.mjs';

// ---------- 可选访问令牌认证（issue #13 + #33） ----------
// 只对受保护 Host（公网隧道 + 局域网按开关）强制。
// 登录成功后种 HttpOnly 持久 cookie（Max-Age 30 天）→ SPA 内部 API/WS 自动携带。
// 会话保持（issue #33）：cookie 值 = sha256(PIN:sessionKey)——sessionKey 是 dsh web
// 进程级随机密钥（lib/index.js 每次启动生成）。于是：
//   - 电脑 dsh web 一直开着 → 手机输一次密码后长期免输（持久 cookie）
//   - dsh web 重启/更新 → sessionKey 变化 → 旧 cookie 失效 → 手机重新输入
export const TOKEN_COOKIE = 'dsh_pocket_token';
export const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 天（秒）

/** cookie 校验值：有 sessionKey 时派生，无则退化为 PIN 本身（向后兼容）。 */
export function cookieFor(token, sessionKey) {
  if (!sessionKey) return token;
  return createHash('sha256').update(`${token}:${sessionKey}`).digest('hex');
}

// ---------- 登录速率限制（issue #40，改进版方案 A） ----------
// 8 位数字密码（10^8 组合）本身可接受，真正风险是「无限制重试」让穷举可行。
// 这里做三层防护（内存态，随进程生命周期，与 sessionKey 一致）：
//   1) 单 IP 滑动窗口：60 秒内失败 ≥5 次 → 锁 60 秒（429）
//   2) 全局滑动窗口：1 分钟全局失败 > 50 次 → 全局锁 30 秒（防分布式扫描换 IP 绕过）
//   3) 成功登录清空该 IP 计数
// IP 识别：优先 cf-connecting-ip（Cloudflare 在隧道入口设置的**真实**客户端 IP，
// 可信）；无则回退 socket remoteAddress。**不信任客户端 x-forwarded-for**（可伪造）。
export const DEFAULT_RATE_LIMIT = {
  windowMs: 60_000,      // 失败计数滑动窗口
  maxFailures: 5,        // 窗口内失败阈值 → 触发单 IP 锁
  lockMs: 60_000,        // 单 IP 锁定时长
  globalMaxFailures: 50, // 全局失败阈值（同窗口）→ 触发全局锁
  globalLockMs: 30_000,  // 全局锁定时长
};
export function createRateLimiter(cfg = {}) {
  const c = { ...DEFAULT_RATE_LIMIT, ...cfg };
  const failCounts = new Map(); // ip -> { count, windowStart }
  const ipLocks = new Map();    // ip -> lockedUntil
  const trustedIps = new Map(); // ip -> 最近一次成功登录时间（全局锁的豁免名单）
  const TRUST_TTL_MS = 24 * 60 * 60 * 1000;
  const isTrusted = (ip, now) => {
    const at = trustedIps.get(ip) ?? 0;
    if (at === 0) return false;
    if (now - at > TRUST_TTL_MS) { trustedIps.delete(ip); return false; }
    return true;
  };
  const global = { count: 0, windowStart: 0, lockedUntil: 0 };
  // 全局锁期间的比对预算（见 allowCompare）；与锁无关地放在闭包里，跨调用复用。
  const COMPARE_BURST = 10;
  const COMPARE_REFILL_MS = 100;
  let compareTokens = COMPARE_BURST;
  let compareRefillAt = Date.now();
  return {
    /** 该 IP 当前是否被锁；返回 { locked, retryAfter, scope }。
     *  scope='ip'：本 IP 自己失败太多次，严格拒绝（连正确密码也不收，否则单 IP 可无限猜）；
     *  scope='global'：全局阈值被分布式流量打满。**只拦「继续猜」**——调用方仍应校验密码，
     *  正确凭据必须放行。否则任何人 22ms 刷 50 次坏 PIN 就能把所有没 cookie 的设备
     *  （新手机、清过缓存的浏览器、机主自己）永久锁在 429 外面，防穷举变成拒绝服务。 */
    status(ip) {
      const now = Date.now();
      const until = ipLocks.get(ip) ?? 0;
      if (until > now) return { locked: true, retryAfter: Math.ceil((until - now) / 1000), scope: 'ip' };
      if (global.lockedUntil > now && !isTrusted(ip, now)) {
        // 全局锁豁免「成功登录过的来源」：已登录设备不再被连坐。
        return { locked: true, retryAfter: Math.ceil((global.lockedUntil - now) / 1000), scope: 'global' };
      }
      return { locked: false, retryAfter: 0, scope: null };
    },
    /** 全局锁期间的密码比对预算（全局限速桶）。
     * 只返回 429 不阻止比对的话，攻击者一旦触发全局锁就能以网络速度无限猜——
     * 每次猜测仍被 safeEqual 比较，猜中即 200。给比对加一个全局限速（突发 10 次、
     * 每 100ms 回 1 个）既保留「正确的密码仍能登录」（机主重试几次即可），又把
     * 猜测吞吐压到 ~10 次/秒（8 位 PIN 的期望穷举时间从小时级拉到百天级）。
     * 非全局锁（正常使用）时永远放行，不引入任何额外延迟或失败。 */
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
    /** 记一次失败：固定窗口计数（窗口起点不随请求滑动，窗口内累计达阈值才触发），达阈值触发单 IP / 全局锁。 */
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
      // 防内存膨胀：超过 2000 条记录时清掉已过窗口期的条目
      if (failCounts.size > 2000) {
        for (const [k, v] of failCounts) {
          if (now - v.windowStart > c.windowMs) failCounts.delete(k);
        }
      }
      // 同上：锁表也要防膨胀，超过 2000 条时清掉已过期的锁
      if (ipLocks.size > 2000) {
        for (const [k, v] of ipLocks) {
          if (v <= now) ipLocks.delete(k);
        }
      }
    },
    /** 成功登录：清空该 IP 计数与锁，并记为可信来源（全局锁豁免）。 */
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
 * 客户端真实 IP（限速与握手计数的身份键）：
 *   - 来自本机（cloudflared 隧道回连，源地址 loopback）→ 认 cf-connecting-ip（Cloudflare 边缘写的真实客户端 IP）；
 *   - 其余一律用 socket 源地址。
 *
 * 为什么不能无条件信任 cf-connecting-ip：那是**请求头**，能直连代理端口的人可以随手
 * 伪造。隧道流量必经本机 cloudflared（源地址必为 loopback），所以把它限定在 loopback
 * 来源既不影响隧道场景，又让「换头即换身份」的限速绕过失效。XFF 同理，始终不认。
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

/**
 * 常量时间的密码比较（issue #90）：普通 `===` 会在首个不同字节处提前返回，
 * 理论上可被计时侧信道逐字节还原 PIN。长度不同直接判否（PIN 长度固定，
 * 长度本身不是秘密），等长则走 timingSafeEqual。
 */
export function safeEqual(a, b) {
  const ba = Buffer.from(String(a ?? ''), 'utf8');
  const bb = Buffer.from(String(b ?? ''), 'utf8');
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/**
 * 参数名是否是访问密码参数。HTTP 查询参数名按规范大小写敏感，但 `?TOKEN=` 这种
 * 写法会绕过「只认小写 token」的清理逻辑（上游请求行/Referer 仍带明文 PIN），
 * 所以访问密码相关的判定统一按小写比较。
 */
export function isTokenParamName(name) {
  return String(name ?? '').toLowerCase() === 'token';
}

/**
 * 值是否命中某个访问密码。除精确相等外，还容忍 `;` 后缀：`?token=<PIN>;foo=1`
 * 这类写法在部分客户端/中间件里会被当成一个带 `;` 的值，不认就等于明文 PIN 继续转发。
 * PIN 只含字母数字（PIN_RE），所以 `;` 之后不可能是 PIN 本身的一部分。
 */
export function tokenValueMatches(value, acceptedTokens) {
  const v = String(value ?? '');
  return acceptedTokens.some((token) => {
    if (!token) return false;
    if (safeEqual(v, token)) return true;
    return v.length > token.length && v.startsWith(token) && v[token.length] === ';';
  });
}

/** 删掉 URLSearchParams 里所有大小写形式的 `token` 参数（用于 Referer 清理）。 */
export function deleteTokenParams(params) {
  for (const key of [...params.keys()]) {
    if (isTokenParamName(key)) params.delete(key);
  }
}

/**
 * 请求是否携带 `?token=` —— 用于区分「一次密码尝试」与「普通未认证访问」（issue #90）。
 * 只有前者计入限速失败：普通未认证访问（无 cookie 无 token）本来就该看到登录页，
 * 若也计数，正常用户第一次打开页面就会把自己锁死（子资源还会放大）。
 * cookie 不匹配同样不计数——cookie 值是 sha256(PIN:sessionKey)，攻击者不知道
 * 进程级 sessionKey，这条通道本身不可穷举；而 dsh web 重启后旧 cookie 必然失配，
 * 计数只会误锁老用户。
 */
export function hasQueryToken(req) {
  try {
    const u = new URL(req.url ?? '/', 'http://x');
    for (const [key, value] of u.searchParams) {
      // 空值（`?token` / `?token=`）不算一次密码尝试：扫描器、被截断的分享链接、
      // 浏览器预取都可能产生它，按失败计数会把共享出口 IP 白白锁 60s（审计实测）。
      if (isTokenParamName(key) && value.length > 0) return true;
    }
    return false;
  } catch {
    return false;
  }
}

/** 校验请求是否已认证。返回 { ok, rawQueryToken }：
 *  - ok=true：已认证；rawQueryToken 是 URL `?token=<PIN>` 命中的那条原始密码（用于种 cookie）；
 *  - 已有 cookie 命中 → rawQueryToken=null（不要重复种）。 */
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
  // 畸形请求目标（端口越界、非法绝对形式）会让 URL 解析直接抛错——按无 query
  // token 处理：cookie / 未认证路径照常走，不为畸形输入改变行为面。
  try {
    const u = new URL(req.url ?? '/', 'http://x');
    for (const [key, value] of u.searchParams) {
      if (!isTokenParamName(key)) continue;
      for (const token of list) {
        if (safeEqual(value, token) || (value.length > token.length && value.startsWith(token) && value[token.length] === ';')) {
          // URL `?token=<原始 PIN>` 用于分享/扫码直达：用户拿到 URL 就能直输明文 PIN，
          // 不需要把 sha256 哈希也告诉他们。匹配上后由调用方通过 maybeSeedAuthCookie
          // 种 HttpOnly 哈希 cookie，让浏览器后续子资源（assets/*.js 等）也走 cookie
          // 路径——避免「主页 200 但子资源 401」白屏（issue #35）。
          // rawQueryToken 固定回报 PIN 本身（而非 `PIN;...`），cookie 要对得上。
          return { ok: true, rawQueryToken: token };
        }
      }
    }
  } catch { /* 视为无 token */ }
  return { ok: false, rawQueryToken: null };
}

/** 当请求通过 `?token=<原始 PIN>` 进入时，在响应里种 HttpOnly cookie。
 *  monkey-patch res.writeHead 把 set-cookie 头注入到第一个响应里——同 POST /pocket-login
 *  路径（lib/proxy.mjs 显式 res.writeHead 加 set-cookie）效果一致。 */
export function maybeSeedAuthCookie(req, res, rawToken, sessionKey) {
  if (!rawToken || !sessionKey) return;
  const expected = cookieFor(rawToken, sessionKey);
  if (!expected) return;
  // 只在「现有 cookie 与本次应得的值一致」时跳过。老实现看到有 cookie 就返回：
  // dsh web 重启后 sessionKey 变了，浏览器留着上一进程的失效 cookie，于是每次
  // 带 ?token= 进来都不换发 → 页面壳能过、子资源全 401，用户只能手清 cookie。
  const existing = parseCookies(req.headers.cookie)[TOKEN_COOKIE];
  if (existing !== undefined && safeEqual(existing, expected)) return;
  const origWriteHead = res.writeHead.bind(res);
  res.writeHead = function (statusCode, statusMessage, headers) {
    // writeHead 有两种签名：(code, headers) 与 (code, statusMessage, headers)。
    // 只按两参处理会把状态文本当 headers 展开，弄丢状态行并注入一串单字符键。
    const hasMessage = typeof statusMessage === 'string';
    const h = { ...((hasMessage ? headers : statusMessage) ?? {}) };
    const cookie = `${TOKEN_COOKIE}=${expected}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${COOKIE_MAX_AGE}`;
    // 已有 set-cookie 头（数组/字符串都支持）则追加
    const prev = h['set-cookie'];
    if (Array.isArray(prev)) h['set-cookie'] = [...prev, cookie];
    else if (typeof prev === 'string') h['set-cookie'] = [prev, cookie];
    else h['set-cookie'] = cookie;
    return hasMessage ? origWriteHead(statusCode, statusMessage, h) : origWriteHead(statusCode, h);
  };
}

/**
 * 把浏览器可见的权威改写成 loopback 权威。
 * 除 Host/Origin 外，还必须规范化 Referer 与 Sec-Fetch-Site：DSH 宿主的特权方法
 * 栅栏（settings.describe/credentials.* 等 PRIVILEGED_METHODS）会拒绝
 * sec-fetch-site === 'cross-site'，并校验 Origin 与 Host 匹配；远程访问的这两个头
 * 若不改写，设置/凭据平面会在宿主侧被 403（issue #58 的另一半）。
 * 统一小写化键名，避免 Node 原样转发时大小写键并存导致重复头。
 */
export function loopbackAuthority(headers, upstream) {
  const authority = `${upstream.host}:${upstream.port}`;
  const out = {};
  for (const [k, v] of Object.entries(headers)) {
    const lk = k.toLowerCase();
    // x-dsh-pocket-origin 由本代理按不可伪造的源地址重新写入（见 handleClientRequest），
    // 客户端自带的同名头一律丢弃，否则 LAN 客户端可以自称 loopback 拿到公网 PIN。
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
      // 分享链接首屏地址是 `/?token=<PIN>`，浏览器给每个子资源都带这个 Referer。
      // 原样转发等于把明文 PIN 交给上游（dsh 日志/错误上报都会带上 Referer）。
      // 上游只校验 Origin/Host/sec-fetch-site，不读 Referer 里的 token，删掉无副作用。
      // 参数名大小写不敏感（`?TOKEN=` 同样要删）。
      deleteTokenParams(ref.searchParams);
      out.referer = ref.toString();
    } catch {
      out.referer = `http://${authority}/`;
    }
  }
  out['sec-fetch-site'] = 'same-origin';
  return out;
}

/**
 * 从请求目标上摘掉「值等于某个已接受密码」的 `token` 参数。
 *
 * `?token=<PIN>` 是分享链接/扫码直达通道：匹配成功后 PIN 的唯一用途就是换 cookie，
 * 不该再出现在任何下游位置——转发给上游的请求行、代理访问日志、session/list 缓存
 * 键，乃至 dsh 自己的访问日志。旧实现种完 cookie 就原样转发，于是明文 PIN 会以
 * `GET /?token=1234abcd -> 200` 的形式落进日志（日志又常被贴进 issue/工单）。
 *
 * 只摘「值与 acceptedTokens 之一相同」的那一个，绝不盲删：`token` 同时也是 dsh web
 * 自己的浏览器会话启动参数名（issue #77），盲删会把上游握手打坏。
 */
export function stripPocketToken(reqUrl, acceptedTokens) {
  if (!Array.isArray(acceptedTokens) || acceptedTokens.length === 0) return reqUrl;
  let u;
  try { u = new URL(reqUrl ?? '/', 'http://dsh.invalid'); } catch { return reqUrl; }
  const entries = [...u.searchParams.entries()];
  if (!entries.some(([key]) => isTokenParamName(key))) return reqUrl;
  // 同名参数可能出现多次（`?token=<PIN>&token=<dsh 启动 token>`）。只摘掉「值命中访问
  // 密码」的那几个，其余原样保留：旧实现只看第一个值，若 PIN 在前会把启动 token 一起
  // 删掉（把上游握手打坏），若 PIN 在后则明文 PIN 继续原样转发（泄漏仍在）。
  // 参数名用大小写不敏感匹配：`?TOKEN=<PIN>` 同样要摘（审计实测大写形式会漏）。
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

/** 日志用：抹掉 `?token=` 的值（保险绳——上游错误日志里仍可能带原始请求目标）。 */
export function maskTokenForLog(reqUrl) {
  return String(reqUrl ?? '').replace(/([?&]token=)[^&#\s]*/gi, '$1***');
}
