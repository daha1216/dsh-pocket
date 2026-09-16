// dsh-pocket Web Push —— 自包含实现（RFC 8291 载荷加密 + RFC 8292 VAPID 签名），零新增依赖。
//
// 为什么自实现：本插件 node_modules 里只有 qrcode 两个运行时依赖，而 pnpm patch 对
// 依赖增删不可靠（补丁只固化文件内容，不改 lockfile）——所以 web-push / jose 这类库
// 一个都不能加。所需原语 node:crypto 全有（HKDF / ECDH / ECDSA / AES-128-GCM）。
//
// 组成：
//   1) VAPID（RFC 8292）：ES256（prime256v1）密钥对，首次用到时生成并持久化
//      $DSH_HOME/dsh-pocket/vapid.json（{publicKey, privateKey} 均 base64url，0600）。
//      Authorization 头：`vapid t=<JWT>, k=<publicKey base64url>`；
//      JWT claims：aud=推送端点 origin、exp=now+12h、sub=mailto:。
//   2) 载荷加密（RFC 8291，aes128gcm）：订阅的 p256dh（UA 公钥）+ auth 盐导出
//      IKM/CEK/NONCE，随机 14 字节 salt，body = RFC 8188 头（salt|rs|idlen|keyid）
//      + AES-128-GCM 密文；明文以 0x02 结尾（最后一条记录的分隔符）。
//   3) 发送：fetch POST subscription.endpoint。410/404 视为失效订阅（调用方据此清理）；
//      其它非 2xx 与网络错误只记日志，绝不抛给业务流。
//   4) 事件通知器（createPushNotifier）：把 DSH 的 session/event 映射成推送，
//      含 5 秒防抖、同设备活 WS 抑制（页面开着 = 人在看，不打扰）、子代理会话跳过。
//
// 安全：本模块不打印任何密钥/订阅秘密（只打 endpoint 主机名与状态码）。

import {
  createCipheriv, createPrivateKey, createPublicKey, diffieHellman,
  generateKeyPairSync, hkdfSync, randomBytes, sign as cryptoSign,
} from 'node:crypto';
import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';

/** VAPID 密钥文件相对 DSH_HOME 的路径。 */
export const VAPID_REL = join('dsh-pocket', 'vapid.json');
/** VAPID JWT 有效期（RFC 8292 要求 ≤24h；12h 足够且留足时钟偏差余量）。 */
export const VAPID_TTL_MS = 12 * 60 * 60 * 1000;
/**
 * VAPID sub claim 兜底值（RFC 8292 要求 mailto: 或 https: URL）。
 *
 * **绝不能再出现 localhost**：Apple 推送服务（web.push.apple.com）对 sub 含 localhost 的
 * VAPID JWT 一律 403 {"reason":"BadJwtToken"}（实测 mailto: pocket@localhost → 403、
 * https://localhost → 403；mailto:pocket@daha.dpdns.org → 201、https://example.org → 201）。
 * FCM 等其他推送服务不挑这个，所以本地假接收端 e2e 全绿也没暴露它。
 *
 * 真实 sub 由 createPushNotifier 的 subject provider 在**发送时**解析（隧道域名优先，见
 * lib/index.js），本常量只是 provider 缺失/返回空/含 localhost 时的兜底——`.invalid` 是
 * RFC 2606 保留 TLD，形状合法、不含 localhost、不指向任何真实域名。
 */
export const VAPID_SUBJECT = 'mailto:dsh-pocket@invalid';
/** 推送默认 TTL：一天（手机离线超过一天就没必要再补投了）。 */
export const PUSH_TTL_SECONDS = 86400;
/** 同会话同类型事件的防抖窗口（毫秒）。 */
export const PUSH_DEBOUNCE_MS = 5000;
/** 会话名在通知里的最大长度（码点）。 */
export const PUSH_TITLE_MAX = 30;
/** 单条推送载荷上限（aes128gcm rs=4096 减去 86 字节头与 16 字节 tag；留足余量取 3000）。 */
export const PUSH_PAYLOAD_MAX = 3000;
/** P-256 未压缩点长度（0x04 || X || Y）。 */
const P256_POINT_LEN = 65;
/** RFC 8188 记录大小（单记录足够承载通知载荷）。 */
const RECORD_SIZE = 4096;
/** 通知里出现的推送事件类型（也是设备注册表里 events 的键）。 */
export const PUSH_EVENT_KINDS = ['turn', 'approval'];

// ---------- base64url ----------

/** Buffer → base64url 字符串。 */
export function toB64u(input) {
  return Buffer.from(input).toString('base64url');
}

/** base64url 字符串 → Buffer（非法输入返回空 Buffer，由调用方校验长度）。 */
export function fromB64u(input) {
  try {
    return Buffer.from(String(input ?? ''), 'base64url');
  } catch {
    return Buffer.alloc(0);
  }
}

/** VAPID 密钥文件路径（DSH_HOME 优先，与 lib/devices.mjs 同一约定）。 */
export function vapidPath(home) {
  const root = home ?? process.env.DSH_HOME ?? join(homedir(), '.dsh');
  return join(root, VAPID_REL);
}

// ---------- VAPID 密钥对 ----------

/** 公钥 KeyObject → 65 字节未压缩点的 base64url。 */
function pointB64u(publicKeyObject) {
  const jwk = publicKeyObject.export({ format: 'jwk' });
  const x = fromB64u(jwk.x);
  const y = fromB64u(jwk.y);
  return toB64u(Buffer.concat([Buffer.from([4]), x, y]));
}

/** 生成一枚新的 VAPID 密钥对（两个字段均 base64url）。 */
export function generateVapidKeys() {
  const { privateKey, publicKey } = generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
  const jwk = privateKey.export({ format: 'jwk' });
  return { publicKey: pointB64u(publicKey), privateKey: String(jwk.d ?? '') };
}

/** 宽松校验一份 VAPID 密钥（形状不对返回 null）。 */
export function normalizeVapidKeys(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const publicKey = typeof raw.publicKey === 'string' ? raw.publicKey.trim() : '';
  const privateKey = typeof raw.privateKey === 'string' ? raw.privateKey.trim() : '';
  const pub = fromB64u(publicKey);
  const priv = fromB64u(privateKey);
  if (pub.length !== P256_POINT_LEN || pub[0] !== 4) return null;
  if (priv.length !== 32) return null;
  return { publicKey, privateKey };
}

/** VAPID 私钥 KeyObject（由 base64url 的 d + 65 字节公钥重建 JWK）。 */
export function vapidPrivateKey(keys) {
  const pub = fromB64u(keys.publicKey);
  if (pub.length !== P256_POINT_LEN || pub[0] !== 4) throw new Error('invalid VAPID public key');
  return createPrivateKey({
    key: {
      kty: 'EC',
      crv: 'P-256',
      x: toB64u(pub.subarray(1, 33)),
      y: toB64u(pub.subarray(33, 65)),
      d: String(keys.privateKey),
    },
    format: 'jwk',
  });
}

/**
 * 读 VAPID 密钥；文件不存在/坏掉则生成一份并原子落盘（0600）。
 * 写盘失败也让本次运行可用（内存态），只是下次重启会再生成（旧订阅随 VAPID 变化失效）。
 */
export function loadVapidKeys(file) {
  try {
    const keys = normalizeVapidKeys(JSON.parse(readFileSync(file, 'utf8')));
    if (keys) return keys;
  } catch { /* 无文件 / 坏文件 → 往下重新生成 */ }
  const fresh = generateVapidKeys();
  try {
    mkdirSync(dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    writeFileSync(tmp, JSON.stringify(fresh, null, 2), { mode: 0o600 });
    renameSync(tmp, file);
  } catch { /* 忽略：仅影响持久性，不影响本次签名 */ }
  return fresh;
}

// ---------- VAPID JWT（ES256） ----------

/**
 * 规范化 sub：空/非字符串/含 localhost → 兜底（VAPID_SUBJECT）。
 * 纯函数（不引 IO），发送前最后一道保险：即使 provider 传回坏值，也绝不把含 localhost 的
 * sub 发出去（Apple 会 403 BadJwtToken，见 VAPID_SUBJECT 注释）。
 */
export function normalizeVapidSubject(subject) {
  const s = typeof subject === 'string' ? subject.trim() : '';
  if (!s) return VAPID_SUBJECT;
  if (/localhost/i.test(s)) return VAPID_SUBJECT;
  return s;
}

/**
 * 从「已知公网地址」推导 VAPID sub（纯函数）。优先级：
 *   ① 命名隧道固定域名（settings.json tunnelHostname）→ https://<域名>
 *   ② 快速隧道当前地址（cloudflared 报的 trycloudflare 域名）→ https://<域名>
 *   ③ 兜底 VAPID_SUBJECT（不含 localhost）
 * 只取 origin（域名里的路径/查询串丢弃）；结果再过一遍 normalizeVapidSubject。
 * @param {{hostname?:string, tunnelUrl?:string}} [opts]
 */
export function vapidSubjectFrom({ hostname = '', tunnelUrl = '' } = {}) {
  const fromHostname = (v) => {
    const s = String(v ?? '').trim();
    if (!s) return '';
    try {
      return new URL(s.includes('://') ? s : `https://${s}`).origin;
    } catch { return ''; }
  };
  return normalizeVapidSubject(fromHostname(hostname) || fromHostname(tunnelUrl) || VAPID_SUBJECT);
}

/**
 * 构造 VAPID JWT（RFC 8292 §2）。
 * 签名用 IEEE P1363（r||s 64 字节）——JWS 的 ES256 要求原始 r||s，node 默认是 DER。
 * subject 由调用方动态给出（vapidSubjectFrom / createPushNotifier 的 provider）。
 */
export function vapidJwt(keys, endpoint, { now = Date.now(), ttlMs = VAPID_TTL_MS, subject = VAPID_SUBJECT } = {}) {
  const aud = new URL(String(endpoint)).origin;
  const header = toB64u(Buffer.from(JSON.stringify({ typ: 'JWT', alg: 'ES256' }), 'utf8'));
  const claims = toB64u(Buffer.from(JSON.stringify({
    aud,
    exp: Math.floor((now + ttlMs) / 1000),
    sub: normalizeVapidSubject(subject),
  }), 'utf8'));
  const signingInput = `${header}.${claims}`;
  const sig = cryptoSign('sha256', Buffer.from(signingInput, 'utf8'), {
    key: vapidPrivateKey(keys),
    dsaEncoding: 'ieee-p1363',
  });
  return `${signingInput}.${toB64u(sig)}`;
}

/** RFC 8292 Authorization 头值。 */
export function vapidAuthHeader(keys, endpoint, opts) {
  return `vapid t=${vapidJwt(keys, endpoint, opts)}, k=${keys.publicKey}`;
}

// ---------- RFC 8291 载荷加密（aes128gcm） ----------

/** HKDF-SHA256（salt, ikm, info → len 字节）。 */
function hkdf(salt, ikm, info, len) {
  return Buffer.from(hkdfSync('sha256', ikm, salt, info, len));
}

/**
 * 加密一条推送载荷（RFC 8291 §3，aes128gcm 内容编码）。
 * 订阅对象两种形态都收：浏览器原生 PushSubscription.toJSON()（`{endpoint, keys:{p256dh, auth}}`）
 * 与设备注册表里的扁平形态（`{endpoint, p256dh, auth, ...}`）。
 * @param {{endpoint:string, keys?:{p256dh:string, auth:string}, p256dh?:string, auth?:string}} subscription
 * @param {Buffer|string|Uint8Array} payload 明文（通常是 JSON 文本）
 * @param {{recordSize?:number}} [opts]
 * @returns {Buffer} 完整的 aes128gcm 请求体（头 + 密文）
 */
export function encryptPushPayload(subscription, payload, { recordSize = RECORD_SIZE } = {}) {
  const uaPublic = fromB64u(subscription?.keys?.p256dh ?? subscription?.p256dh);
  const authSecret = fromB64u(subscription?.keys?.auth ?? subscription?.auth);
  if (uaPublic.length !== P256_POINT_LEN || uaPublic[0] !== 4) {
    throw new Error('invalid subscription p256dh | 订阅 p256dh 非法');
  }
  if (authSecret.length !== 16) {
    throw new Error('invalid subscription auth secret | 订阅 auth 密钥非法');
  }
  // UA 公钥 → KeyObject（JWK 无 0x04 前缀：直接拆 X/Y）
  const uaKey = createPublicKey({
    key: {
      kty: 'EC',
      crv: 'P-256',
      x: toB64u(uaPublic.subarray(1, 33)),
      y: toB64u(uaPublic.subarray(33, P256_POINT_LEN)),
    },
    format: 'jwk',
  });
  // 应用服务器临时密钥对（每条消息一把，不重用）
  const eph = generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
  const asPublic = fromB64u(pointB64u(eph.publicKey));
  const ecdhSecret = diffieHellman({ privateKey: eph.privateKey, publicKey: uaKey });
  // IKM = HKDF(auth_secret, ecdh_secret, "WebPush: info" || 0x00 || ua_public || as_public, 32)
  const ikm = hkdf(
    authSecret,
    ecdhSecret,
    Buffer.concat([Buffer.from('WebPush: info\0', 'utf8'), uaPublic, asPublic]),
    32,
  );
  const salt = randomBytes(16);
  const cek = hkdf(salt, ikm, Buffer.from('Content-Encoding: aes128gcm\0', 'utf8'), 16);
  const nonce = hkdf(salt, ikm, Buffer.from('Content-Encoding: nonce\0', 'utf8'), 12);
  const plaintext = Buffer.concat([
    Buffer.isBuffer(payload) ? payload : Buffer.from(String(payload ?? ''), 'utf8'),
    Buffer.from([2]), // RFC 8188：最后一条记录的分隔符
  ]);
  const cipher = createCipheriv('aes-128-gcm', cek, nonce);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final(), cipher.getAuthTag()]);
  const rs = Buffer.alloc(4);
  rs.writeUInt32BE(recordSize, 0);
  return Buffer.concat([salt, rs, Buffer.from([asPublic.length]), asPublic, ciphertext]);
}

// ---------- 发送 ----------

/** endpoint 的主机名（日志用；绝不打印完整 endpoint——那是可用来推送的能力 URL）。 */
export function endpointHost(endpoint) {
  try {
    return new URL(String(endpoint)).host;
  } catch {
    return '(invalid)';
  }
}

/**
 * POST 一条推送。**永不抛错**（返回结构里的 ok/dead 让调用方决策）。
 * @returns {{ok:boolean, status:number, dead:boolean, error?:string}}
 *   dead=true 表示订阅已失效（404/410）——调用方应从注册表里清掉它。
 */
export async function sendWebPush(subscription, payload, {
  keys, log = null, fetchImpl = null, ttl = PUSH_TTL_SECONDS, urgency = 'normal', timeoutMs = 10_000, now = Date.now(),
  subject = VAPID_SUBJECT,
} = {}) {
  const endpoint = String(subscription?.endpoint ?? '');
  const host = endpointHost(endpoint);
  if (host === '(invalid)') return { ok: false, status: 0, dead: true, error: 'invalid endpoint' };
  let body;
  let authorization;
  try {
    body = encryptPushPayload(subscription, Buffer.from(JSON.stringify(payload ?? {}), 'utf8'));
    authorization = vapidAuthHeader(keys, endpoint, { now, subject });
  } catch (err) {
    log?.(`dsh-pocket: push encrypt failed (${host}) | 推送加密失败: ${err?.message ?? err}`);
    return { ok: false, status: 0, dead: false, error: err?.message ?? String(err) };
  }
  const doFetch = fetchImpl ?? globalThis.fetch;
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  timer.unref?.();
  try {
    const res = await doFetch(endpoint, {
      method: 'POST',
      headers: {
        ttl: String(ttl),
        urgency,
        'content-encoding': 'aes128gcm',
        'content-type': 'application/octet-stream',
        authorization,
      },
      body,
      signal: ac.signal,
    });
    const status = Number(res?.status ?? 0);
    if (status === 404 || status === 410) {
      log?.(`dsh-pocket: push subscription gone (${status} ${host}) | 推送订阅已失效，将清理`);
      return { ok: false, status, dead: true };
    }
    if (status < 200 || status >= 300) {
      // 读响应体里的原因（Apple: {"reason":"BadJwtToken"}，一句话就能定位；FCM 等也多为 JSON）。
      // 只取前 300 字符；读取失败/无 body 时照旧只报状态码，绝不影响主流程与返回值形状。
      let reason = '';
      try {
        const text = String(await res.text()).slice(0, 300).trim();
        if (text) {
          try { reason = String(JSON.parse(text)?.reason ?? text); } catch { reason = text; }
        }
      } catch { /* 忽略：body 不可读时只报状态码 */ }
      log?.(`dsh-pocket: push rejected (${status} ${host})${reason ? ` reason=${reason}` : ''} | 推送被拒: ${status}${reason ? ` (${reason})` : ''}`);
      return { ok: false, status, dead: false, ...(reason ? { error: reason } : {}) };
    }
    return { ok: true, status };
  } catch (err) {
    log?.(`dsh-pocket: push failed (${host}) | 推送失败: ${err?.message ?? err}`);
    return { ok: false, status: 0, dead: false, error: err?.message ?? String(err) };
  } finally {
    clearTimeout(timer);
  }
}

// ---------- 事件通知器（DSH session/event → 推送） ----------

/** 会话 id（dsh-pet host 同款取法：header.id 优先）。 */
function sessionIdOf(session) {
  try {
    const id = session?.header?.id ?? session?.id;
    return typeof id === 'string' && id ? id : '';
  } catch {
    return '';
  }
}

/** 子代理会话（origin='subagent'）不推送：父会话回合完成时会覆盖，避免刷屏。 */
function isSubagentSession(session) {
  try {
    return session?.header?.origin === 'subagent';
  } catch {
    return false;
  }
}

/** 从 user/message 的 content 块里取第一段文本（标题未生成前的临时会话名）。 */
function firstTextOf(content) {
  if (!Array.isArray(content)) return '';
  for (const block of content) {
    if (block && block.type === 'text' && typeof block.text === 'string' && block.text.trim()) return block.text.trim();
  }
  return '';
}

/** 截断到 n 个码点（不切坏代理对）。 */
export function truncateTitle(text, max = PUSH_TITLE_MAX) {
  const s = String(text ?? '').replace(/\s+/g, ' ').trim();
  const points = [...s];
  if (points.length <= max) return s;
  return `${points.slice(0, max - 1).join('')}…`;
}

/** 事件 → 通知文案。 */
export function pushBody(kind, title, extra = {}) {
  if (kind === 'approval') {
    const tool = truncateTitle(extra.toolName ?? '', 24);
    const base = '等待审批';
    const tail = tool ? `${base} · ${tool}` : base;
    return title ? `${tail} · ${truncateTitle(title)}` : tail;
  }
  const base = '回合完成';
  return title ? `${base} · ${truncateTitle(title)}` : base;
}

/**
 * 创建事件通知器。
 * @param {object} opts
 * @param {object} opts.devices 设备注册表（lib/devices.mjs）
 * @param {string} [opts.file] VAPID 密钥文件（默认 vapidPath()）
 * @param {(msg:string)=>void} [opts.log]
 * @param {typeof fetch} [opts.fetchImpl]
 * @param {() => number} [opts.now]
 * @param {number} [opts.debounceMs] 同会话同类型事件去重窗口
 * @param {string|(() => string)} [opts.subject] VAPID sub；函数形式在**每次发送时**解析
 *   （公网地址是运行时才有的：命名隧道域名 / 快速隧道随机域名，见 vapidSubjectFrom）。
 *   传给纯函数前一律过 normalizeVapidSubject（绝不含 localhost）。
 */
export function createPushNotifier({
  devices, file = vapidPath(), log = null, fetchImpl = null, now = () => Date.now(), debounceMs = PUSH_DEBOUNCE_MS,
  subject = null,
} = {}) {
  /** sid → 会话名（session/title 全量，user/message 只作临时兜底）。 */
  const titles = new Map();
  /** `${sid}:${kind}` → 上次推送时间（防抖）。 */
  const lastAt = new Map();
  let keys = null;
  const stats = { sent: 0, failed: 0, dead: 0, skippedOnline: 0, debounced: 0, suppressed: 0 };

  /** 惰性加载 VAPID 密钥（首次真正要发时才生成/读盘）。 */
  function vapidKeys() {
    if (!keys) keys = loadVapidKeys(file);
    return keys;
  }

  /** 当前 VAPID sub（发送时解析；provider 抛错/返回坏值 → 兜底，绝不发 localhost）。 */
  function vapidSubject() {
    try {
      return normalizeVapidSubject(typeof subject === 'function' ? subject() : subject);
    } catch {
      return VAPID_SUBJECT;
    }
  }

  /** 记会话名（session/title 覆盖临时标题；临时标题不覆盖已有正式标题）。 */
  function remember(sid, title, { provisional = false } = {}) {
    const clean = truncateTitle(title, 80);
    if (!sid || !clean) return;
    const prev = titles.get(sid);
    if (prev?.title && provisional) return;
    titles.set(sid, { title: clean, provisional });
    if (titles.size > 200) {
      const oldest = titles.keys().next().value;
      if (oldest !== undefined) titles.delete(oldest);
    }
  }

  function titleOf(sid) {
    return titles.get(sid)?.title ?? '';
  }

  /** 单条推送（fire-and-forget；失败只记日志，dead 订阅顺手清理）。 */
  async function deliver(deviceId, payload) {
    const device = devices?.get?.(deviceId) ?? null;
    const sub = device?.push;
    if (!sub) return { ok: false, status: 0, dead: false, error: 'no subscription' };
    const result = await sendWebPush(sub, payload, { keys: vapidKeys(), log, fetchImpl, now: now(), subject: vapidSubject() });
    if (result.dead) {
      stats.dead += 1;
      try { devices?.clearPush?.(deviceId); } catch { /* 忽略 */ }
    } else if (result.ok) {
      stats.sent += 1;
    } else {
      stats.failed += 1;
    }
    return result;
  }

  /**
   * 给所有订阅了该类型事件、且当前没有活 WS 的设备发推送。
   * WS 在连 = 页面开着 = 人在看，不打扰（isOnline 含「60s 内活跃」语义，这里用更严的 hasLiveWs）。
   */
  function fanout(kind, payload) {
    const targets = devices?.pushTargets?.() ?? [];
    for (const t of targets) {
      if (t?.push?.events?.[kind] === false) { stats.suppressed += 1; continue; }
      if (devices?.hasLiveWs?.(t.id)) { stats.skippedOnline += 1; continue; }
      void deliver(t.id, payload);
    }
  }

  /** 防抖 + 分发：同会话同类型 debounceMs 内只发一次。 */
  function dispatch(kind, sid, extra = {}) {
    const key = `${sid}:${kind}`;
    const at = now();
    const prev = lastAt.get(key);
    if (prev !== undefined && at - prev < debounceMs) { stats.debounced += 1; return false; }
    lastAt.set(key, at);
    if (lastAt.size > 500) {
      for (const [k, ts] of lastAt) if (at - ts > debounceMs) lastAt.delete(k);
    }
    const title = titleOf(sid);
    for (const kindKey of [kind]) {
      if (!PUSH_EVENT_KINDS.includes(kindKey)) continue;
      fanout(kindKey, {
        title: 'DSH',
        body: pushBody(kindKey, title, extra),
        tag: `dsh-pocket-${kindKey}-${sid}`,
        url: '/',
        ts: at,
      });
    }
    return true;
  }

  /**
   * DSH 会话事件入口（在 lib/index.js 里由 ctx.on('session/event') 接线）。
   *
   * 事件选取依据：dsh-pet host 侧（node_modules/dsh-pet/src/host/index.ts:856）
   * 用的就是同一条 `ctx.on('session/event', (session, event) => ...)` 通路，
   * 消费 turn/start、user/message、tool/call、approval/asked、turn/end、todo/write。
   * 推送只关心两种「需要人回来」的时刻：
   *   - turn/end（reason.kind === 'completed'）：本轮结束、等用户下一步；
   *   - approval/asked：工具调用在等审批（harness 的 session 事件，带 toolName）。
   * aborted / interrupted / blocked / error 不推（dsh-pet client 侧同样过滤 aborted/interrupted）。
   */
  function handleSessionEvent(session, event) {
    const type = event?.type;
    if (typeof type !== 'string') return;
    const sid = sessionIdOf(session);
    if (!sid) return;
    if (type === 'session/title') {
      remember(sid, event?.data?.title, { provisional: false });
      return;
    }
    if (isSubagentSession(session)) return;
    if (type === 'user/message') {
      if (event?.data?.source?.kind === 'user') remember(sid, firstTextOf(event.data.content), { provisional: true });
      return;
    }
    if (type === 'approval/asked') {
      dispatch('approval', sid, { toolName: event?.data?.toolName });
      return;
    }
    if (type === 'turn/end') {
      if (event?.data?.reason?.kind === 'completed') dispatch('turn', sid);
    }
  }

  /** 给指定设备发一条测试推送（RPC notify.test；真实发送并等结果，供 UI 反馈）。 */
  async function sendTest(deviceId) {
    const payload = {
      title: 'DSH',
      body: '测试通知 · 通知已就绪',
      tag: 'dsh-pocket-test',
      url: '/',
      ts: now(),
    };
    const result = await deliver(deviceId, payload);
    return { ok: result.ok === true, status: result.status, dead: result.dead === true, error: result.error ?? null };
  }

  return {
    handleSessionEvent,
    sendTest,
    dispatch,
    titleOf,
    vapidKeys,
    vapidSubject,
    stats: () => ({ ...stats }),
    flushTitles: () => titles.clear(),
  };
}
