// dsh-pocket v4.0 持久设备凭据与连接级撤销仓库（$DSH_HOME/dsh-pocket/devices.json）
//
// 安全不变量：
//   1. 设备密钥（rawSecret，256-bit CSPRNG）只通过 HttpOnly Cookie 下发一次，磁盘与内存只存 sha256(rawSecret)；
//   2. Cookie 校验采用 timingSafeEqual 常量时间比对；
//   3. 严格通道隔离：lan 授权设备严禁通过 public 通道校验；public 授权设备可访问 public 与 lan；
//   4. 撤销设备时立即 destroy 该设备名下所有活跃 WebSocket 连接，无需等待下次 HTTP 轮询；
//   5. 所有磁盘路径实时跟随 DSH_HOME（除非显式传入固定 home），保证多用例测试完全隔离。

import {
  readFileSync, writeFileSync, mkdirSync, renameSync, rmSync, statSync,
} from 'node:fs';
import {
  writeFile, mkdir, rename, rm, stat as statAsync,
} from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

export const DEVICE_COOKIE = 'dsh_pocket_device';
export const DEVICE_COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 31536000 秒（1 年）

const LAST_SEEN_THROTTLE_MS = 60_000;
const CACHE_TTL_MS = 2_000;
const MAX_DEVICES = 128;
const DEVICE_ID_RE = /^[0-9a-f]{16}$/;
const DEVICE_SECRET_RE = /^[0-9a-f]{64}$/;
const COOKIE_SECRET_RE = /^[0-9a-f]{64}$/i;

function resolveHomeDir(explicitHome) {
  if (typeof explicitHome === 'function') return explicitHome();
  if (typeof explicitHome === 'string' && explicitHome.length > 0) return explicitHome;
  return process.env.DSH_HOME ?? join(homedir(), '.dsh');
}

export function devicesPath(home) {
  return join(resolveHomeDir(home), 'dsh-pocket', 'devices.json');
}

export function cookieSecretPath(home) {
  return join(resolveHomeDir(home), 'dsh-pocket', 'cookie-secret');
}

function sha256Hex(input) {
  return createHash('sha256').update(String(input), 'utf8').digest('hex');
}

function sha256Buf(input) {
  return createHash('sha256').update(String(input), 'utf8').digest();
}

function parseCookieValue(cookieHeader, targetName) {
  if (!cookieHeader) return null;
  for (const part of String(cookieHeader).split(';')) {
    const eq = part.indexOf('=');
    if (eq <= 0) continue;
    if (part.slice(0, eq).trim() === targetName) {
      return part.slice(eq + 1).trim();
    }
  }
  return null;
}

/** 构造 Set-Cookie 响应头字符串（公网或 HTTPS 反代自动附加 Secure）。 */
export function formatDeviceSetCookie(cookieValue, { secure = false, maxAge = DEVICE_COOKIE_MAX_AGE } = {}) {
  return `${DEVICE_COOKIE}=${cookieValue}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
}

/** 构造清除失效/已撤销设备 Cookie 的 Set-Cookie 头字符串。 */
export function formatClearDeviceSetCookie({ secure = false } = {}) {
  return `${DEVICE_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure ? '; Secure' : ''}`;
}

function detectBrowserName(ua) {
  if (/MicroMessenger\//i.test(ua)) return 'WeChat';
  if (/EdgiOS\/|EdgA\/|Edg\//i.test(ua)) return 'Edge';
  if (/OPR\/|OPiOS\//i.test(ua)) return 'Opera';
  if (/FxiOS\/|Firefox\//i.test(ua)) return 'Firefox';
  if (/SamsungBrowser\//i.test(ua)) return 'Samsung Internet';
  if (/CriOS\/|Chrome\/|Chromium\//i.test(ua)) return 'Chrome';
  if (/Safari\//i.test(ua)) return 'Safari';
  return 'Browser';
}

/**
 * 识别设备形态分类（供设置页渲染手机 / 平板 / 电脑图标）。
 * @param {string} [ua]
 * @returns {'phone' | 'tablet' | 'desktop'}
 */
export function detectDeviceKind(ua) {
  const s = String(ua ?? '');
  if (/iPad|Tablet|PlayBook|Silk/i.test(s) || (/Android/i.test(s) && !/Mobile/i.test(s))) {
    return 'tablet';
  }
  if (/iPhone|iPod|Android|HarmonyOS|OpenHarmony|Mobile/i.test(s)) {
    return 'phone';
  }
  return 'desktop';
}

/**
 * 将原始 User-Agent 解析为简洁可读的设备名称。
 * 示例：
 *   - "iPhone · Safari (iOS 18)"
 *   - "Android · Chrome"
 *   - "iPad · Safari"
 *   - "macOS · Chrome"
 * @param {string} [ua]
 * @returns {string}
 */
export function parseDeviceUserAgent(ua) {
  const raw = String(ua ?? '').trim();
  if (!raw) return 'Mobile Browser';
  const browser = detectBrowserName(raw);

  if (/iPad/i.test(raw)) {
    return `iPad · ${browser}`;
  }
  if (/iPhone|iPod/i.test(raw)) {
    const iosMatch = /CPU (?:iPhone )?OS (\d+)/i.exec(raw);
    const suffix = iosMatch ? ` (iOS ${iosMatch[1]})` : '';
    return `iPhone · ${browser}${suffix}`;
  }
  if (/HarmonyOS|OpenHarmony/i.test(raw)) {
    return `HarmonyOS · ${browser}`;
  }
  if (/Android/i.test(raw)) {
    return `Android · ${browser}`;
  }
  if (/Windows NT/i.test(raw)) {
    return `Windows · ${browser}`;
  }
  if (/Macintosh|Mac OS X/i.test(raw)) {
    return `macOS · ${browser}`;
  }
  if (/CrOS/i.test(raw)) {
    return `ChromeOS · ${browser}`;
  }
  if (/Linux/i.test(raw)) {
    return `Linux · ${browser}`;
  }
  return browser;
}

function sanitizeUaSummary(ua) {
  const clean = String(ua ?? '').replace(/[\r\n\t\x00-\x1f]+/g, ' ').trim();
  if (!clean) return '';
  return clean.length > 160 ? `${clean.slice(0, 157)}...` : clean;
}

function sanitizeCustomName(name, fallback) {
  const clean = String(name ?? '').replace(/[\r\n\t\x00-\x1f]+/g, ' ').trim().slice(0, 64);
  return clean || fallback;
}

function atomicWriteSync(dest, content) {
  const tmp = `${dest}.${process.pid}.${randomBytes(4).toString('hex')}.tmp`;
  const backup = `${dest}.bak`;
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(tmp, content, { mode: 0o600 });
  try {
    renameSync(tmp, dest);
  } catch (err) {
    if (err?.code !== 'EEXIST' && err?.code !== 'EPERM') {
      try { rmSync(tmp, { force: true }); } catch { /* 忽略 */ }
      throw err;
    }
    let stashed = false;
    try {
      renameSync(dest, backup);
      stashed = true;
    } catch { /* 原目标不存在 */ }
    try {
      renameSync(tmp, dest);
    } catch (err2) {
      if (stashed) {
        try { renameSync(backup, dest); } catch { /* 保留 .bak */ }
      }
      try { rmSync(tmp, { force: true }); } catch { /* 忽略 */ }
      throw err2;
    }
    if (stashed) {
      try { rmSync(backup, { force: true }); } catch { /* 忽略 */ }
    }
  }
}

async function atomicWriteAsync(dest, content) {
  const tmp = `${dest}.${process.pid}.${randomBytes(4).toString('hex')}.tmp`;
  const backup = `${dest}.bak`;
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(tmp, content, { mode: 0o600 });
  try {
    await rename(tmp, dest);
  } catch (err) {
    if (err?.code !== 'EEXIST' && err?.code !== 'EPERM') {
      try { await rm(tmp, { force: true }); } catch { /* 忽略 */ }
      throw err;
    }
    let stashed = false;
    try {
      await rename(dest, backup);
      stashed = true;
    } catch { /* 原目标不存在 */ }
    try {
      await rename(tmp, dest);
    } catch (err2) {
      if (stashed) {
        try { await rename(backup, dest); } catch { /* 保留 .bak */ }
      }
      try { await rm(tmp, { force: true }); } catch { /* 忽略 */ }
      throw err2;
    }
    if (stashed) {
      try { await rm(backup, { force: true }); } catch { /* 忽略 */ }
    }
  }
}

// ---------- 持久化 cookieSecret（供传统 TOKEN_COOKIE 跨 dsh web 重启保持会话） ----------

/** @type {Map<string, { secret: string, mtimeMs: number }>} */
const cookieSecretCache = new Map();

/**
 * 读取或初始化持久 cookieSecret（32 字节 = 64 位 hex，权限 0o600）。
 * 磁盘不可写时退化为进程内内存密钥（不阻断主流程）。
 */
export function getCookieSecret(home) {
  const file = cookieSecretPath(home);
  const cached = cookieSecretCache.get(file);
  if (cached) {
    try {
      const st = statSync(file);
      if (Math.abs(st.mtimeMs - cached.mtimeMs) < 1) return cached.secret;
    } catch (err) {
      if (err?.code !== 'ENOENT') return cached.secret;
      cookieSecretCache.delete(file);
    }
  }
  try {
    const raw = readFileSync(file, 'utf8').trim();
    if (COOKIE_SECRET_RE.test(raw)) {
      let mtimeMs = 0;
      try { mtimeMs = statSync(file).mtimeMs; } catch { /* 忽略 */ }
      cookieSecretCache.set(file, { secret: raw.toLowerCase(), mtimeMs });
      return raw.toLowerCase();
    }
  } catch { /* 文件不存在或不可读，下方初始化 */ }

  return rotateCookieSecret(home);
}

/** 轮换持久 cookieSecret（用于恢复出厂设置或强制使旧 TOKEN_COOKIE 失效）。 */
export function rotateCookieSecret(home) {
  const file = cookieSecretPath(home);
  const fresh = randomBytes(32).toString('hex');
  let mtimeMs = 0;
  try {
    atomicWriteSync(file, fresh);
    try { mtimeMs = statSync(file).mtimeMs; } catch { /* 忽略 */ }
  } catch {
    // 磁盘不可写时仍保证本进程内稳定返回同一个内存值
  }
  cookieSecretCache.set(file, { secret: fresh, mtimeMs });
  return fresh;
}

/** 删除磁盘上的 cookie-secret 文件并清空对应缓存。 */
export function clearCookieSecret(home) {
  const file = cookieSecretPath(home);
  cookieSecretCache.delete(file);
  try {
    rmSync(file, { force: true });
    return true;
  } catch {
    return false;
  }
}

// ---------- 设备注册与连接级撤销仓库 ----------

function normalizeStoredRecord(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const id = String(raw.id ?? '');
  const secretHash = String(raw.secretHash ?? '').toLowerCase();
  if (!DEVICE_ID_RE.test(id) || !DEVICE_SECRET_RE.test(secretHash)) return null;
  const channel = raw.channel === 'public' ? 'public' : 'lan';
  const authMethod = raw.authMethod === 'pin' ? 'pin' : 'pair';
  const autoName = String(raw.autoName ?? '').trim() || 'Mobile Browser';
  const name = sanitizeCustomName(raw.name, autoName);
  const uaSummary = sanitizeUaSummary(raw.uaSummary ?? autoName);
  const createdAt = Number.isFinite(raw.createdAt) ? Number(raw.createdAt) : Date.now();
  const lastSeenAt = Number.isFinite(raw.lastSeenAt) ? Number(raw.lastSeenAt) : createdAt;
  const lastIp = String(raw.lastIp ?? '');
  return {
    id,
    secretHash,
    name,
    autoName,
    uaSummary,
    channel,
    authMethod,
    createdAt,
    lastSeenAt,
    lastIp,
  };
}

function readDevicesFileSync(file) {
  const parseList = (text) => {
    const parsed = JSON.parse(text);
    const list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.devices) ? parsed.devices : null);
    if (!list) return null;
    const map = new Map();
    for (const item of list) {
      const rec = normalizeStoredRecord(item);
      if (rec) map.set(rec.id, rec);
    }
    return map;
  };
  try {
    const map = parseList(readFileSync(file, 'utf8'));
    if (map) return map;
  } catch { /* 主文件不存在或损坏，尝试 .bak */ }
  try {
    const map = parseList(readFileSync(`${file}.bak`, 'utf8'));
    if (map) return map;
  } catch { /* 无备份 */ }
  return new Map();
}

function serializeDevices(map) {
  const devices = [...map.values()].sort((a, b) => b.lastSeenAt - a.lastSeenAt);
  return JSON.stringify({ version: 1, devices }, null, 2);
}

/**
 * 同进程内按设备文件路径共享的内存态快照与活跃连接池：
 * 既保证同一 DSH_HOME 下多个 createDeviceStore() 实例零延迟同步（如代理层与 RPC 层），
 * 又保证测试切换 process.env.DSH_HOME 时按路径完全隔离。
 * @type {Map<string, { checkedAt: number, mtimeMs: number, size: number, dirty: boolean, records: Map<string, any> }>}
 */
const sharedCacheByFile = new Map();
/** @type {Map<string, Map<string, Set<import('node:net').Socket>>>} */
const sharedSocketsByFile = new Map();

function socketsMapForFile(file) {
  let map = sharedSocketsByFile.get(file);
  if (!map) {
    map = new Map();
    sharedSocketsByFile.set(file, map);
  }
  return map;
}

/**
 * 创建设备凭据与连接跟踪仓库。
 * 既支持 `createDeviceStore('/custom/home')`，也支持 `createDeviceStore({ home, now })`。
 * @param {string | (() => string) | { home?: string | (() => string), now?: () => number }} [options]
 */
export function createDeviceStore(options = {}) {
  const isDirectHome = typeof options === 'string' || typeof options === 'function';
  const home = isDirectHome ? options : options?.home;
  const now = !isDirectHome && typeof options?.now === 'function' ? options.now : Date.now;
  let flushTimer = null;
  let flushPromise = null;

  function currentFile() {
    return devicesPath(home);
  }

  function activeSockets() {
    return socketsMapForFile(currentFile());
  }

  function fileStatSync(file) {
    try {
      const st = statSync(file);
      return { mtimeMs: st.mtimeMs, size: st.size };
    } catch {
      return { mtimeMs: -1, size: -1 };
    }
  }

  function ensureLoaded({ forceCheck = false } = {}) {
    const file = currentFile();
    const ts = now();
    const entry = sharedCacheByFile.get(file);
    if (entry) {
      if (entry.dirty) {
        return entry.records;
      }
      if (!forceCheck && ts - entry.checkedAt < CACHE_TTL_MS) {
        return entry.records;
      }
      const st = fileStatSync(file);
      if (!forceCheck && st.mtimeMs === entry.mtimeMs && st.size === entry.size) {
        entry.checkedAt = ts;
        return entry.records;
      }
      const records = readDevicesFileSync(file);
      sharedCacheByFile.set(file, { checkedAt: ts, mtimeMs: st.mtimeMs, size: st.size, dirty: false, records });
      return records;
    }
    const st = fileStatSync(file);
    const records = readDevicesFileSync(file);
    sharedCacheByFile.set(file, { checkedAt: ts, mtimeMs: st.mtimeMs, size: st.size, dirty: false, records });
    return records;
  }

  function persistSync(records) {
    const file = currentFile();
    const payload = serializeDevices(records);
    try {
      atomicWriteSync(file, payload);
      const st = fileStatSync(file);
      sharedCacheByFile.set(file, { checkedAt: now(), mtimeMs: st.mtimeMs, size: st.size, dirty: false, records });
    } catch (err) {
      sharedCacheByFile.set(file, { checkedAt: now(), mtimeMs: -1, size: -1, dirty: true, records });
      console.warn(`dsh-pocket: devices.json write failed | 设备列表写入失败: ${err?.message ?? err}`);
    }
  }

  function scheduleAsyncFlush() {
    const targetFile = currentFile();
    const entry = sharedCacheByFile.get(targetFile);
    if (flushTimer || !entry) return;
    const snapshotRecords = entry.records;
    entry.dirty = true;
    flushTimer = setTimeout(() => {
      flushTimer = null;
      const payload = serializeDevices(snapshotRecords);
      flushPromise = (async () => {
        try {
          await atomicWriteAsync(targetFile, payload);
          const st = await statAsync(targetFile).catch(() => ({ mtimeMs: -1, size: -1 }));
          const latest = sharedCacheByFile.get(targetFile);
          if (latest && latest.records === snapshotRecords) {
            latest.mtimeMs = st.mtimeMs;
            latest.size = st.size;
            latest.checkedAt = now();
            latest.dirty = false;
          }
        } catch {
          // 忽略节流异步刷新失败，下次状态变更会重试
        } finally {
          flushPromise = null;
        }
      })();
    }, 50);
    flushTimer.unref?.();
  }

  function sanitizeDevice(rec) {
    const sockets = activeSockets().get(rec.id);
    return {
      id: rec.id,
      name: rec.name,
      autoName: rec.autoName,
      uaSummary: rec.uaSummary,
      kind: detectDeviceKind(rec.uaSummary || rec.autoName),
      channel: rec.channel,
      authMethod: rec.authMethod,
      createdAt: rec.createdAt,
      lastSeenAt: rec.lastSeenAt,
      lastIp: rec.lastIp,
      online: Boolean(sockets && sockets.size > 0),
    };
  }

  function destroySocketsForId(id) {
    const socks = activeSockets();
    const set = socks.get(id);
    if (!set || set.size === 0) {
      socks.delete(id);
      return 0;
    }
    socks.delete(id);
    let destroyed = 0;
    for (const sock of set) {
      destroyed += 1;
      try { sock.destroy(); } catch { /* 忽略已关闭连接 */ }
    }
    return destroyed;
  }

  function enforceCap(records) {
    if (records.size <= MAX_DEVICES) return;
    const sorted = [...records.values()].sort((a, b) => a.lastSeenAt - b.lastSeenAt);
    while (records.size > MAX_DEVICES && sorted.length > 0) {
      const victim = sorted.shift();
      if (victim) {
        records.delete(victim.id);
        destroySocketsForId(victim.id);
      }
    }
  }

  return {
    /**
     * 签发一台新授权设备并持久化。
     * @param {{ ua?: string, ip?: string, channel?: 'lan' | 'public', authMethod?: 'pair' | 'pin', name?: string }} [opts]
     */
    issueDevice({ ua = '', ip = '', channel = 'lan', authMethod = 'pair', name = '' } = {}) {
      const records = ensureLoaded({ forceCheck: true });
      const id = randomBytes(8).toString('hex');
      const rawSecret = randomBytes(32).toString('hex');
      const secretHash = sha256Hex(rawSecret);
      const autoName = parseDeviceUserAgent(ua);
      const ts = now();
      const record = {
        id,
        secretHash,
        name: sanitizeCustomName(name, autoName),
        autoName,
        uaSummary: sanitizeUaSummary(ua) || autoName,
        channel: channel === 'public' ? 'public' : 'lan',
        authMethod: authMethod === 'pin' ? 'pin' : 'pair',
        createdAt: ts,
        lastSeenAt: ts,
        lastIp: String(ip ?? ''),
      };
      records.set(id, record);
      enforceCap(records);
      persistSync(records);
      return {
        device: sanitizeDevice(record),
        cookieName: DEVICE_COOKIE,
        cookieValue: `${id}.${rawSecret}`,
      };
    },

    /**
     * 校验请求携带的 dsh_pocket_device Cookie。
     * 严格通道隔离：lan 设备绝不可通过 public 校验；public 设备可访问 public 与 lan。
     * @param {string | undefined} cookieHeader
     * @param {'lan' | 'public' | 'loopback'} [expectedChannel='public']
     * @param {{ ip?: string }} [meta]
     */
    verifyDeviceCookie(cookieHeader, expectedChannel = 'public', meta = {}) {
      const rawCookie = parseCookieValue(cookieHeader, DEVICE_COOKIE);
      if (!rawCookie) return { ok: false, revoked: false };

      const dot = rawCookie.indexOf('.');
      if (dot <= 0) return { ok: false, revoked: false };
      const id = rawCookie.slice(0, dot);
      const rawSecret = rawCookie.slice(dot + 1);
      if (!DEVICE_ID_RE.test(id) || !DEVICE_SECRET_RE.test(rawSecret)) {
        return { ok: false, revoked: false };
      }

      let records = ensureLoaded();
      let record = records.get(id);
      if (!record && !sharedCacheByFile.get(currentFile())?.dirty) {
        records = ensureLoaded({ forceCheck: true });
        record = records.get(id);
      }
      if (!record) {
        return { ok: false, revoked: true };
      }

      const candidateHashBuf = sha256Buf(rawSecret);
      const storedHashBuf = Buffer.from(record.secretHash, 'hex');
      if (candidateHashBuf.length !== storedHashBuf.length || !timingSafeEqual(candidateHashBuf, storedHashBuf)) {
        return { ok: false, revoked: false };
      }

      // 严格通道隔离：默认按最严格的 public 判定，仅显式传 lan/loopback 时允许 lan 设备通过
      const targetChannel = expectedChannel === 'lan' || expectedChannel === 'loopback' ? 'lan' : 'public';
      if (targetChannel === 'public' && record.channel !== 'public') {
        return { ok: false, revoked: false, reason: 'channel-mismatch' };
      }

      const ts = now();
      const nextIp = meta?.ip ? String(meta.ip) : '';
      if (ts - record.lastSeenAt >= LAST_SEEN_THROTTLE_MS || (nextIp && nextIp !== record.lastIp && ts - record.lastSeenAt >= 5_000)) {
        record.lastSeenAt = ts;
        if (nextIp) record.lastIp = nextIp;
        scheduleAsyncFlush();
      } else if (nextIp && !record.lastIp) {
        record.lastIp = nextIp;
      }

      return { ok: true, device: sanitizeDevice(record), revoked: false };
    },

    /**
     * 跟踪该设备打开的活跃 WebSocket 底层 Socket；关闭时自动解绑，撤销时立即 destroy。
     * @param {string} deviceId
     * @param {import('node:net').Socket} socket
     */
    trackSocket(deviceId, socket) {
      if (!deviceId || !socket) return () => {};
      if (socket.destroyed) return () => {};
      const file = currentFile();
      const socks = socketsMapForFile(file);
      let set = socks.get(deviceId);
      if (!set) {
        set = new Set();
        socks.set(deviceId, set);
      }
      set.add(socket);
      let cleaned = false;
      const cleanup = () => {
        if (cleaned) return;
        cleaned = true;
        const current = socks.get(deviceId);
        if (current) {
          current.delete(socket);
          if (current.size === 0) socks.delete(deviceId);
        }
      };
      socket.once?.('close', cleanup);
      return cleanup;
    },

    /** 重命名已授权设备（传空字符串恢复为自动识别名称）。 */
    renameDevice(id, newName) {
      const targetId = String(id ?? '').trim();
      if (!targetId) return null;
      const records = ensureLoaded({ forceCheck: true });
      const record = records.get(targetId);
      if (!record) return null;
      record.name = sanitizeCustomName(newName, record.autoName);
      persistSync(records);
      return sanitizeDevice(record);
    },

    /** 撤销单台设备并立即断开其所有活跃 WebSocket 连接。 */
    revokeDevice(id) {
      const targetId = String(id ?? '').trim();
      if (!targetId) return false;
      const records = ensureLoaded({ forceCheck: true });
      const existed = records.delete(targetId);
      if (existed) persistSync(records);
      const killed = destroySocketsForId(targetId);
      return existed || killed > 0;
    },

    /** 撤销全部（或指定通道 / 认证方式）设备并立即断开对应活跃连接。 */
    revokeAllDevices({ channel, authMethod } = {}) {
      const file = currentFile();
      const socks = socketsMapForFile(file);
      const records = ensureLoaded({ forceCheck: true });
      const filterChannel = channel === 'lan' || channel === 'public' ? channel : null;
      const filterMethod = authMethod === 'pin' || authMethod === 'pair' ? authMethod : null;
      let removed = 0;
      if (filterChannel === null && filterMethod === null) {
        removed = records.size;
        const allIds = new Set([...records.keys(), ...socks.keys()]);
        records.clear();
        for (const id of allIds) destroySocketsForId(id);
        if (removed > 0) persistSync(records);
        else {
          try { rmSync(file, { force: true }); } catch { /* 忽略 */ }
          try { rmSync(`${file}.bak`, { force: true }); } catch { /* 忽略 */ }
          sharedCacheByFile.delete(file);
        }
      } else {
        for (const [id, rec] of [...records.entries()]) {
          const matchChannel = filterChannel === null || rec.channel === filterChannel;
          const matchMethod = filterMethod === null || rec.authMethod === filterMethod;
          if (matchChannel && matchMethod) {
            records.delete(id);
            destroySocketsForId(id);
            removed += 1;
          }
        }
        if (removed > 0) persistSync(records);
      }
      return { removed };
    },

    /** 返回脱敏后的设备列表（不含 secretHash），附带实时 online 状态。 */
    listDevices() {
      const records = ensureLoaded({ forceCheck: true });
      return [...records.values()]
        .sort((a, b) => b.lastSeenAt - a.lastSeenAt)
        .map((rec) => sanitizeDevice(rec));
    },

    getCookieSecret: () => getCookieSecret(home),
    rotateCookieSecret: () => rotateCookieSecret(home),
    clearCookieSecret: () => clearCookieSecret(home),

    async flush() {
      const file = currentFile();
      const entry = sharedCacheByFile.get(file);
      if (flushTimer) {
        clearTimeout(flushTimer);
        flushTimer = null;
        if (entry?.dirty) {
          await atomicWriteAsync(file, serializeDevices(entry.records)).catch(() => {});
          entry.dirty = false;
        }
      }
      if (flushPromise) await flushPromise;
    },
  };
}
