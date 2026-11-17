// dsh-pocket 设置持久化（$DSH_HOME/dsh-pocket/settings.json）
//
// 设计要点（v4.0）：
//   1. 内存快照缓存：所有同步 getter（lanEnabled / mobileFilePreviewEnabled 等）走 O(1) 内存读取，
//      按 settingsPath() 隔离（测试切换 DSH_HOME 立即切换快照），并在 TTL 到期后先比对文件 mtime/size，
//      未变化不重跑 readFileSync + JSON.parse。
//   2. 零主线程忙等：绝不阻塞 dsh web 事件循环。无锁竞争时快速原子落盘（tmp + rename + .bak 兜底）；
//      遇到跨进程锁竞争时乐观更新内存快照并投递到异步串行写队列（flushSettings 可等待落盘）。
//   3. 跨进程读-改-写合并：落盘前始终基于磁盘最新 JSON 合并，避免覆盖另一进程刚改过的其他字段。

import {
  readFileSync, writeFileSync, mkdirSync, rmSync, renameSync,
  openSync, closeSync, readdirSync, statSync,
} from 'node:fs';
import {
  readFile, writeFile, mkdir, rm, rename, open as openAsync, readdir, stat as statAsync,
} from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { randomBytes } from 'node:crypto';
import { isValidIpv4 } from './ip.mjs';

const settingsRel = join('dsh-pocket', 'settings.json');
export function settingsPath() {
  return join(process.env.DSH_HOME ?? join(homedir(), '.dsh'), settingsRel);
}

const CACHE_TTL_MS = 2_000;
const LOCK_WAIT_MS = 650;
const LOCK_STALE_MS = 10_000;
const ASYNC_POLL_MS = 15;

/**
 * @type {{
 *   path: string,
 *   checkedAt: number,
 *   mtimeMs: number,
 *   size: number,
 *   bakMtimeMs: number,
 *   data: Record<string, any>,
 *   dirty: boolean,
 * } | null}
 */
let settingsCache = null;

/** @type {Map<string, Array<(data: Record<string, any>) => void>>} */
const pendingMutatorsByPath = new Map();
/** @type {Map<string, Promise<void>>} */
const activeFlushesByPath = new Map();

function statFingerprintSync(file) {
  let mtimeMs = -1;
  let size = -1;
  let bakMtimeMs = -1;
  try {
    const st = statSync(file);
    mtimeMs = st.mtimeMs;
    size = st.size;
  } catch { /* 文件不存在 */ }
  try {
    bakMtimeMs = statSync(`${file}.bak`).mtimeMs;
  } catch { /* 无备份 */ }
  return { mtimeMs, size, bakMtimeMs };
}

async function statFingerprintAsync(file) {
  let mtimeMs = -1;
  let size = -1;
  let bakMtimeMs = -1;
  try {
    const st = await statAsync(file);
    mtimeMs = st.mtimeMs;
    size = st.size;
  } catch { /* 文件不存在 */ }
  try {
    bakMtimeMs = (await statAsync(`${file}.bak`)).mtimeMs;
  } catch { /* 无备份 */ }
  return { mtimeMs, size, bakMtimeMs };
}

function setCacheSnapshot(file, data, fp, dirty = false) {
  settingsCache = {
    path: file,
    checkedAt: Date.now(),
    mtimeMs: fp.mtimeMs,
    size: fp.size,
    bakMtimeMs: fp.bakMtimeMs,
    data: { ...data },
    dirty,
  };
}

function readSettings() {
  const file = settingsPath();
  const now = Date.now();
  if (settingsCache && settingsCache.path === file) {
    if (settingsCache.dirty || now - settingsCache.checkedAt < CACHE_TTL_MS) {
      return settingsCache.data;
    }
    const fp = statFingerprintSync(file);
    if (
      fp.mtimeMs === settingsCache.mtimeMs
      && fp.size === settingsCache.size
      && fp.bakMtimeMs === settingsCache.bakMtimeMs
    ) {
      settingsCache.checkedAt = now;
      return settingsCache.data;
    }
    const data = readSettingsFromDiskSync(file);
    setCacheSnapshot(file, data, fp, false);
    return settingsCache.data;
  }
  const fp = statFingerprintSync(file);
  const data = readSettingsFromDiskSync(file);
  setCacheSnapshot(file, data, fp, false);
  return settingsCache.data;
}

/** 绕过进程内缓存，直接读取磁盘最新 JSON（主文件异常或为数组时回退 .bak）。 */
function readSettingsFromDiskSync(file = settingsPath()) {
  try {
    const raw = JSON.parse(readFileSync(file, 'utf8'));
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) return raw;
  } catch { /* 无文件/损坏 → 尝试 .bak */ }
  try {
    const raw = JSON.parse(readFileSync(`${file}.bak`, 'utf8'));
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) return raw;
  } catch { /* 没有备份 */ }
  return {};
}

async function readSettingsFromDiskAsync(file = settingsPath()) {
  try {
    const raw = JSON.parse(await readFile(file, 'utf8'));
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) return raw;
  } catch { /* 无文件/损坏 → 尝试 .bak */ }
  try {
    const raw = JSON.parse(await readFile(`${file}.bak`, 'utf8'));
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) return raw;
  } catch { /* 没有备份 */ }
  return {};
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * 尝试非阻塞获取跨进程文件锁（绝不在常规写路径里阻塞主线程）。
 * 返回：
 *   - { state: 'acquired', fd, lock }：成功拿到锁
 *   - { state: 'contended', lock }：另一个进程正持有未过期锁
 *   - { state: 'unwritable', error }：目录不可建等底层文件系统错误
 */
function tryAcquireLockNonBlocking(dest) {
  const lock = `${dest}.lock`;
  try {
    mkdirSync(dirname(dest), { recursive: true });
  } catch (error) {
    return { state: 'unwritable', error };
  }
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const fd = openSync(lock, 'wx');
      return { state: 'acquired', fd, lock };
    } catch (err) {
      if (err?.code !== 'EEXIST') {
        return { state: 'unwritable', error: err };
      }
      let stale = false;
      try {
        stale = Date.now() - statSync(lock).mtimeMs > LOCK_STALE_MS;
      } catch {
        continue; // 锁刚释放，立即再试一次
      }
      if (stale && attempt === 0) {
        try { rmSync(lock, { force: true }); } catch { /* 删不掉视为仍被占用 */ }
        continue;
      }
      return { state: 'contended', lock };
    }
  }
  return { state: 'contended', lock };
}

function releaseLockSync(fd, lock) {
  if (fd === null || fd === undefined) return;
  try { closeSync(fd); } catch { /* 忽略 */ }
  try { rmSync(lock, { force: true }); } catch { /* 忽略 */ }
}

async function acquireLockAsync(dest, { mustLock = false } = {}) {
  const lock = `${dest}.lock`;
  try {
    await mkdir(dirname(dest), { recursive: true });
  } catch (err) {
    if (mustLock) throw err;
    return { handle: null, lock, timedOut: false };
  }
  const deadline = Date.now() + LOCK_WAIT_MS;
  for (;;) {
    try {
      const handle = await openAsync(lock, 'wx');
      return { handle, lock, timedOut: false };
    } catch (err) {
      if (err?.code !== 'EEXIST') {
        if (mustLock) throw err;
        return { handle: null, lock, timedOut: false };
      }
      let stale = false;
      try {
        const st = await statAsync(lock);
        stale = Date.now() - st.mtimeMs > LOCK_STALE_MS;
      } catch {
        continue;
      }
      if (stale) {
        try { await rm(lock, { force: true }); } catch { /* 忽略 */ }
        let gone = false;
        try { await statAsync(lock); } catch { gone = true; }
        if (gone) {
          if (Date.now() >= deadline) break;
          continue;
        }
      }
      if (Date.now() >= deadline) break;
      await delay(ASYNC_POLL_MS);
    }
  }
  if (mustLock) {
    throw new Error('设置文件正被另一个进程写入，请稍后重试 | settings file is locked by another process');
  }
  console.warn('dsh-pocket: settings lock timeout, writing without lock | 设置锁等待超时');
  return { handle: null, lock, timedOut: true };
}

async function releaseLockAsync(handle, lock) {
  if (!handle) return;
  try { await handle.close(); } catch { /* 忽略 */ }
  try { await rm(lock, { force: true }); } catch { /* 忽略 */ }
}

function writeSettingsUnlockedSync(dest, s) {
  const tmp = `${dest}.${process.pid}.${randomBytes(4).toString('hex')}.tmp`;
  const backup = `${dest}.bak`;
  try {
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(tmp, JSON.stringify(s, null, 2), { mode: 0o600 });
    try {
      renameSync(tmp, dest);
    } catch (err) {
      if (err?.code !== 'EEXIST' && err?.code !== 'EPERM') throw err;
      let stashed = false;
      try {
        renameSync(dest, backup);
        stashed = true;
      } catch { /* 目标本不存在 */ }
      try {
        renameSync(tmp, dest);
      } catch (err2) {
        if (stashed) {
          try { renameSync(backup, dest); } catch { /* 旧文件仍在 .bak */ }
        }
        throw err2;
      }
      if (stashed) {
        try { rmSync(backup, { force: true }); } catch { /* 忽略 */ }
      }
    }
    const fp = statFingerprintSync(dest);
    setCacheSnapshot(dest, s, fp, false);
    return true;
  } catch (err) {
    console.warn(`dsh-pocket: settings write failed | 设置写入失败: ${err?.message ?? err}`);
    if (settingsCache?.path === dest) settingsCache = null;
    try { rmSync(tmp, { force: true }); } catch { /* 忽略 */ }
    throw err;
  }
}

async function writeSettingsUnlockedAsync(dest, s) {
  const tmp = `${dest}.${process.pid}.${randomBytes(4).toString('hex')}.tmp`;
  const backup = `${dest}.bak`;
  try {
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(tmp, JSON.stringify(s, null, 2), { mode: 0o600 });
    try {
      await rename(tmp, dest);
    } catch (err) {
      if (err?.code !== 'EEXIST' && err?.code !== 'EPERM') throw err;
      let stashed = false;
      try {
        await rename(dest, backup);
        stashed = true;
      } catch { /* 目标不存在 */ }
      try {
        await rename(tmp, dest);
      } catch (err2) {
        if (stashed) {
          try { await rename(backup, dest); } catch { /* 保留 .bak */ }
        }
        throw err2;
      }
      if (stashed) {
        try { await rm(backup, { force: true }); } catch { /* 忽略 */ }
      }
    }
    const fp = await statFingerprintAsync(dest);
    if (!pendingMutatorsByPath.get(dest)?.length) {
      setCacheSnapshot(dest, s, fp, false);
    }
    return true;
  } catch (err) {
    console.warn(`dsh-pocket: async settings write failed | 异步设置写入失败: ${err?.message ?? err}`);
    if (settingsCache?.path === dest) settingsCache = null;
    try { await rm(tmp, { force: true }); } catch { /* 忽略 */ }
    throw err;
  }
}

function scheduleAsyncFlush(dest) {
  const existing = activeFlushesByPath.get(dest);
  if (existing) return existing;
  const run = (async () => {
    try {
      while ((pendingMutatorsByPath.get(dest)?.length ?? 0) > 0) {
        const batch = pendingMutatorsByPath.get(dest)?.splice(0) ?? [];
        if (batch.length === 0) break;
        const { handle, lock } = await acquireLockAsync(dest, { mustLock: false });
        try {
          let current = await readSettingsFromDiskAsync(dest);
          for (const mutator of batch) {
            current = mutator(current) ?? current;
          }
          await writeSettingsUnlockedAsync(dest, current);
        } finally {
          await releaseLockAsync(handle, lock);
        }
      }
    } catch {
      // 后台刷新失败已在 writeSettingsUnlockedAsync 中记录告警并清理脏缓存
    } finally {
      activeFlushesByPath.delete(dest);
    }
  })();
  activeFlushesByPath.set(dest, run);
  return run;
}

/** 等待所有后台排队中的异步设置落盘完成（无队列时立即返回）。 */
export async function flushSettings() {
  while (activeFlushesByPath.size > 0) {
    await Promise.allSettled([...activeFlushesByPath.values()]);
  }
}

/**
 * 更新设置：
 *   - 无锁竞争（常态）：直接读取磁盘最新内容、合并队列与本次变更、原子替换并更新内存快照；
 *   - 存在跨进程锁竞争：乐观更新内存快照（getter 立即一致），并将变更放入异步后台队列落盘，绝不卡主线程。
 */
function updateSettings(mutator) {
  const dest = settingsPath();
  const lockAttempt = tryAcquireLockNonBlocking(dest);

  if (lockAttempt.state === 'acquired') {
    try {
      let data = readSettingsFromDiskSync(dest);
      const queued = pendingMutatorsByPath.get(dest);
      if (queued?.length) {
        for (const fn of queued.splice(0)) {
          data = fn(data) ?? data;
        }
      }
      const next = mutator(data) ?? data;
      writeSettingsUnlockedSync(dest, next);
      return next;
    } finally {
      releaseLockSync(lockAttempt.fd, lockAttempt.lock);
    }
  }

  if (lockAttempt.state === 'unwritable') {
    // 目录不可建等硬错误：直接走写文件让真实异常同步抛出（保证 RPC 返回 ok:false）
    const data = readSettingsFromDiskSync(dest);
    const next = mutator(data) ?? data;
    writeSettingsUnlockedSync(dest, next);
    return next;
  }

  // 锁竞争分支（另一个进程正持有 .lock）：不阻塞事件循环，乐观更新内存快照 + 异步串行落盘
  const base = settingsCache?.path === dest
    ? { ...settingsCache.data }
    : readSettingsFromDiskSync(dest);
  const optimistic = mutator(base) ?? base;
  setCacheSnapshot(dest, optimistic, statFingerprintSync(dest), true);
  let queue = pendingMutatorsByPath.get(dest);
  if (!queue) {
    queue = [];
    pendingMutatorsByPath.set(dest, queue);
  }
  queue.push(mutator);
  void scheduleAsyncFlush(dest);
  return optimistic;
}

/** 局域网访问总开关：默认开启（文件缺失/损坏都视为开启）。 */
export function lanEnabled() {
  return readSettings().lanEnabled !== false;
}

/** 设置局域网访问总开关，返回新状态（持久化）。 */
export function setLanEnabled(on) {
  const s = updateSettings((d) => { d.lanEnabled = !!on; });
  return s.lanEnabled;
}

/** 局域网访问密码开关：默认开启（文件缺失/损坏都视为开启）。 */
export function lanAuthEnabled() {
  return readSettings().lanAuthEnabled !== false;
}

/** 设置局域网访问密码开关，返回新状态（持久化）。 */
export function setLanAuthEnabled(on) {
  const s = updateSettings((d) => { d.lanAuthEnabled = !!on; });
  return s.lanAuthEnabled;
}

/** 手机端右边栏入口：默认开启，可按需关闭以保持更紧凑的标题栏。 */
export function mobileRightbarEnabled() {
  return readSettings().mobileRightbarEnabled !== false;
}

/** 设置手机端右边栏入口，返回新状态（持久化）。 */
export function setMobileRightbarEnabled(on) {
  const s = updateSettings((d) => { d.mobileRightbarEnabled = !!on; });
  return s.mobileRightbarEnabled;
}

/** 手机端捏合缩放：默认关闭（页面锁 1x），开启恢复捏合。 */
export function mobilePinchZoomEnabled() {
  return readSettings().mobilePinchZoomEnabled === true;
}

/** 设置手机端捏合缩放，返回新状态（持久化）。 */
export function setMobilePinchZoomEnabled(on) {
  const s = updateSettings((d) => { d.mobilePinchZoomEnabled = !!on; });
  return s.mobilePinchZoomEnabled;
}

/** 手机端点击聊天内工作区文件链接时打开底部代码预览抽屉：默认开启。 */
export function mobileFilePreviewEnabled() {
  return readSettings().mobileFilePreviewEnabled !== false;
}

/** 设置手机端文件链接点击预览开关，返回新状态（持久化）。 */
export function setMobileFilePreviewEnabled(on) {
  const s = updateSettings((d) => { d.mobileFilePreviewEnabled = !!on; });
  return s.mobileFilePreviewEnabled;
}

/** 旧版使用探针开关兼容导出（v4.0 已下线探针，保留符号兼容）。 */
export function probeEnabled() {
  return readSettings().probeEnabled === true;
}

export function setProbeEnabled(on) {
  const s = updateSettings((d) => { d.probeEnabled = !!on; });
  return s.probeEnabled;
}

/** 手机端独立字号（px）：0 = 跟随桌面「字号大小」，12–22 = 手机布局下的覆盖值。 */
export const MOBILE_FONT_MIN = 12;
export const MOBILE_FONT_MAX = 22;

function normalizeMobileFontSize(size) {
  const n = Number(size);
  if (n === 0) return 0;
  if (!Number.isInteger(n) || n < MOBILE_FONT_MIN || n > MOBILE_FONT_MAX) return NaN;
  return n;
}

export function mobileFontSize() {
  return normalizeMobileFontSize(readSettings().mobileFontSize) || 0;
}

/** 设置手机端独立字号（0 恢复跟随桌面），返回生效值（持久化）。 */
export function setMobileFontSize(size) {
  const next = normalizeMobileFontSize(size);
  if (Number.isNaN(next)) {
    throw new Error(`手机端字号必须是 0 或 ${MOBILE_FONT_MIN}–${MOBILE_FONT_MAX} 的整数 | mobile font size must be 0 or an integer in ${MOBILE_FONT_MIN}–${MOBILE_FONT_MAX}`);
  }
  updateSettings((d) => {
    if (next === 0) delete d.mobileFontSize;
    else d.mobileFontSize = next;
  });
  return next;
}

/** 局域网地址手动覆盖：默认空字符串 = 自动选择。 */
export function lanIpOverride() {
  return readSettings().lanIpOverride ?? '';
}

/** 设置局域网地址覆盖；空字符串清除覆盖，恢复自动选择。非法 IPv4 抛错。 */
export function setLanIpOverride(value) {
  const ip = String(value ?? '').trim();
  if (ip && !isValidIpv4(ip)) {
    throw new Error('局域网地址必须是 IPv4 地址 | LAN address must be an IPv4 address');
  }
  updateSettings((d) => {
    if (ip) d.lanIpOverride = ip;
    else delete d.lanIpOverride;
  });
  return ip;
}

// ---------- 访问密码「自定义」标记（issue #33） ----------
const PIN_CUSTOM_KEYS = { public: 'publicPinCustom', lan: 'lanPinCustom' };

/** 该 PIN（public | lan）是否用户自定义过。 */
export function pinCustom(which) {
  const key = PIN_CUSTOM_KEYS[which];
  if (!key) return false;
  return readSettings()[key] === true;
}

/** 设置自定义标记，返回新状态。 */
export function setPinCustom(which, on) {
  const key = PIN_CUSTOM_KEYS[which];
  if (!key) return false;
  updateSettings((d) => { d[key] = !!on; });
  return !!on;
}

// ---------- 恢复出厂设置 ----------

function derivedFilesRegex(base) {
  const suffix = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^${suffix}(?:\\.bak|\\.tmp|\\.\\d+\\.[0-9a-f]+\\.tmp|\\.reset-[0-9a-zA-Z-]+\\.tmp)$`);
}

/** 异步恢复出厂设置（主推入口：零事件循环阻塞，等待锁并原子清理主文件与派生文件）。 */
export async function resetSettingsAsync() {
  await flushSettings();
  const dest = settingsPath();
  pendingMutatorsByPath.delete(dest);
  if (settingsCache?.path === dest) settingsCache = null;

  const dir = dirname(dest);
  const base = dest.slice(dir.length + 1);
  const derived = derivedFilesRegex(base);
  const tomb = `${dest}.reset-${process.pid}-${Date.now().toString(36)}-${randomBytes(4).toString('hex')}.tmp`;
  const tombName = tomb.slice(dir.length + 1);

  let lockInfo;
  try {
    lockInfo = await acquireLockAsync(dest, { mustLock: true });
  } catch {
    return false;
  }
  try {
    let moved = false;
    try {
      await rename(dest, tomb);
      moved = true;
    } catch (err) {
      if (err?.code !== 'ENOENT') return false;
    }
    const failures = [];
    let names = [];
    try { names = await readdir(dir); } catch { names = []; }
    for (const name of names) {
      if (!derived.test(name) || name === tombName) continue;
      try { await rm(join(dir, name), { force: true }); } catch { failures.push(name); }
    }
    if (failures.length > 0) {
      console.warn(`dsh-pocket: reset failed to remove ${failures.join(', ')}; rolling back | 恢复出厂未能删除派生文件，已回滚`);
      if (moved) {
        try { await rename(tomb, dest); } catch { /* 保留墓碑 */ }
      }
      return false;
    }
    if (moved) {
      try {
        await rm(tomb, { force: true });
      } catch {
        try { await rename(tomb, dest); } catch { /* 尽力回滚 */ }
        return false;
      }
    }
    if (settingsCache?.path === dest) settingsCache = null;
    return true;
  } finally {
    await releaseLockAsync(lockInfo.handle, lockInfo.lock);
  }
}

/**
 * 同步兼容版恢复出厂设置：无锁竞争时亚毫秒完成；
 * 仅在遇到其它活跃进程持有 .lock 时走子进程内核级挂起等待预算（0% CPU 自旋）。
 */
export function resetSettings() {
  const dest = settingsPath();
  pendingMutatorsByPath.delete(dest);
  if (settingsCache?.path === dest) settingsCache = null;

  const dir = dirname(dest);
  const base = dest.slice(dir.length + 1);
  const derived = derivedFilesRegex(base);
  const tomb = `${dest}.reset-${process.pid}-${Date.now().toString(36)}-${randomBytes(4).toString('hex')}.tmp`;
  const tombName = tomb.slice(dir.length + 1);
  const lock = `${dest}.lock`;

  try {
    mkdirSync(dir, { recursive: true });
  } catch {
    return false;
  }

  const deadline = Date.now() + LOCK_WAIT_MS;
  let fd = null;
  while (fd === null) {
    try {
      fd = openSync(lock, 'wx');
      break;
    } catch (err) {
      if (err?.code !== 'EEXIST') return false;
      let stale = false;
      try {
        stale = Date.now() - statSync(lock).mtimeMs > LOCK_STALE_MS;
      } catch {
        continue;
      }
      if (stale) {
        try { rmSync(lock, { force: true }); } catch { /* 忽略 */ }
        let gone = false;
        try { statSync(lock); } catch { gone = true; }
        if (gone) {
          if (Date.now() >= deadline) return false;
          continue;
        }
      }
      if (Date.now() >= deadline) return false;
      const sliceMs = Math.min(120, Math.max(20, deadline - Date.now()));
      spawnSync(process.execPath, ['-e', `setTimeout(()=>{},${sliceMs})`], {
        stdio: 'ignore',
        windowsHide: true,
      });
    }
  }

  try {
    let moved = false;
    try {
      renameSync(dest, tomb);
      moved = true;
    } catch (err) {
      if (err?.code !== 'ENOENT') return false;
    }
    const failures = [];
    let names = [];
    try { names = readdirSync(dir); } catch { names = []; }
    for (const name of names) {
      if (!derived.test(name) || name === tombName) continue;
      try { rmSync(join(dir, name), { force: true }); } catch { failures.push(name); }
    }
    if (failures.length > 0) {
      console.warn(`dsh-pocket: reset failed to remove ${failures.join(', ')}; rolling back | 恢复出厂未能删除派生文件，已回滚`);
      if (moved) {
        try { renameSync(tomb, dest); } catch { /* 保留墓碑 */ }
      }
      return false;
    }
    if (moved) {
      try {
        rmSync(tomb, { force: true });
      } catch {
        try { renameSync(tomb, dest); } catch { /* 尽力回滚 */ }
        return false;
      }
    }
    settingsCache = null;
    return true;
  } finally {
    releaseLockSync(fd, lock);
  }
}

// ---------- 命名隧道配置（issue #66：固定公网域名） ----------

/** 旧配置中的 quick 不再启用随机隧道，公网统一使用用户自配的固定域名。 */
export function tunnelMode() {
  return 'named';
}

/** 只有曾显式保存命名隧道配置的用户，才能沿用自动恢复标记。 */
export function tunnelAutoRestoreEnabled() {
  return readSettings().tunnelMode === 'named';
}

function validateTunnelMode(mode) {
  if (mode !== 'named') {
    throw new Error('仅支持自行配置固定域名，随机隧道已移除 | only user-configured named tunnels are supported');
  }
}

export function setTunnelMode(mode) {
  validateTunnelMode(mode);
  updateSettings((d) => { d.tunnelMode = 'named'; });
  return 'named';
}

/** 命名隧道 Token（未配置返回空字符串）。 */
export function tunnelToken() {
  const v = readSettings().tunnelToken;
  return typeof v === 'string' ? v : '';
}

function normalizeTunnelToken(value) {
  const v = String(value ?? '').trim();
  if (v) {
    if (v.length < 20 || !/^[A-Za-z0-9+/_=-]+$/.test(v)) {
      throw new Error('Tunnel Token 格式不对（应为 Cloudflare 后台复制的完整 Token） | invalid tunnel token');
    }
  }
  return v;
}

export function setTunnelToken(value) {
  const v = normalizeTunnelToken(value);
  updateSettings((d) => {
    if (v) d.tunnelToken = v;
    else delete d.tunnelToken;
  });
  return v;
}

/** 命名隧道绑定的固定域名（未配置返回空字符串）。 */
export function tunnelHostname() {
  const v = readSettings().tunnelHostname;
  return typeof v === 'string' ? v : '';
}

function normalizeTunnelHostname(value) {
  let v = String(value ?? '').trim().toLowerCase();
  v = v.replace(/^[a-z][a-z0-9+.-]*:\/\//, '').split(/[/?#\s]/)[0].replace(/:\d+$/, '').replace(/\.$/, '');
  if (v) {
    const HOSTNAME_RE = /^(?=.{1,253}$)[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/;
    const IS_IPV4 = /^\d{1,3}(\.\d{1,3}){3}$/;
    if (IS_IPV4.test(v) || !v.includes('.') || !HOSTNAME_RE.test(v)) {
      throw new Error('固定域名格式不对（如 pocket.example.com） | invalid tunnel hostname');
    }
  }
  return v;
}

export function setTunnelHostname(value) {
  const v = normalizeTunnelHostname(value);
  updateSettings((d) => {
    if (v) d.tunnelHostname = v;
    else delete d.tunnelHostname;
  });
  return v;
}

/** 先校验完整配置再一次写入，失败时保留原来的域名和 Token。 */
export function setNamedTunnelConfig({ mode = 'named', hostname, token } = {}) {
  validateTunnelMode(mode);
  const written = updateSettings((d) => {
    const nextHostname = normalizeTunnelHostname(hostname === undefined ? d.tunnelHostname : hostname);
    const nextToken = normalizeTunnelToken(token === undefined ? d.tunnelToken : token);
    if (!nextHostname || !nextToken) {
      throw new Error('请先配置自己的固定域名与 Tunnel Token | configure your own fixed hostname and Tunnel Token first');
    }
    d.tunnelMode = 'named';
    d.tunnelHostname = nextHostname;
    d.tunnelToken = nextToken;
  });
  return { mode: 'named', hostname: written.tunnelHostname, tokenSet: true };
}

// ---------- 代理端口（issue #70） ----------

/** 当前代理端口（0 = 用默认 3081）。 */
export function proxyPort() {
  const v = Number(readSettings().proxyPort);
  return Number.isInteger(v) && v >= 1 && v <= 65535 ? v : 0;
}

/** 设置代理端口（持久化）。空/0/非法值清除，回退默认 3081。 */
export function setProxyPort(value) {
  const n = Number(value);
  updateSettings((d) => {
    if (Number.isInteger(n) && n >= 1 && n <= 65535) d.proxyPort = n;
    else delete d.proxyPort;
  });
  return proxyPort();
}

// ---------- cloudflared 路径（issue #45） ----------

/** 当前 cloudflared 自定义路径（空 = 用默认）。 */
export function cloudflaredPath() {
  return readSettings().cloudflaredPath ?? '';
}

/** 设置 cloudflared 自定义路径。空字符串清除（回退到 PATH 探测 + 下载）。 */
export function setCloudflaredPath(value) {
  const v = String(value ?? '').trim();
  updateSettings((d) => {
    if (v) d.cloudflaredPath = v;
    else delete d.cloudflaredPath;
  });
  return v;
}
