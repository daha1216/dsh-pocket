// 代理侧缓存：统一预算、两个池子、一个总开关（评审 §3.4）+ 实例级隔离（v4.0）。
//
// 池一 = 不可变资源的 brotli 转码结果（内容哈希 URL，永不失效）；
// 池二 = /api/session/list 的瘦身结果（2s TTL，按请求体摘要命中，前缀/后缀切分免重复序列化）。
// 两个池子共用 CACHE_BUDGET，设置页通过 proxyCacheStats / clearProxyCaches 观测和清空。
// 本模块不认识 HTTP：只处理键、字节数与缓存条目。

import { AsyncLocalStorage } from 'node:async_hooks';
import { randomBytes } from 'node:crypto';

/**
 * 内容哈希资产（/assets/<name>-<hash>.<ext>）：文件名带内容哈希，内容变则文件名变，
 * 可安全长缓存。上游只发 max-age=14400（4h），手机端每过几小时就重新协商/重下。
 */
export const HASHED_ASSET_RE = /^\/assets\/[^/]*-[A-Za-z0-9_-]{8,}\.[A-Za-z0-9]+$/;

/**
 * 不可变资源 URL（与 SW_SCRIPT 的 isImmutable 同一白名单）：内容哈希资产
 * /assets/<name>-<hash>.<ext>，以及带 rev=<hash> 的插件资源 / 组合包 / 分包 chunk
 * （如 /plugins/??…&rev=… 或 /plugins/dsh-pocket/client.mobile.js?rev=…）。
 * 内容变则 URL 变，所以这类响应可以放心长期缓存。
 */
export function isImmutableUrl(rawUrl) {
  try {
    const x = new URL(String(rawUrl), 'http://dsh-pocket.invalid');
    if (x.pathname.startsWith('/assets/') && /-[A-Za-z0-9_-]{8,}\.[A-Za-z0-9]+$/.test(x.pathname)) return true;
    return x.pathname.startsWith('/plugins/') && /[?&]rev=[A-Za-z0-9_-]{6,}/.test(x.search);
  } catch {
    return false;
  }
}

/** RFC 7231 accept-encoding 的 q 值解析：缺省 q=1，q>0 才算支持（`br;q=0` 是明确排除）。 */
export function acceptedCodings(header) {
  const q = new Map();
  for (const part of String(header ?? '').split(',')) {
    const seg = part.trim();
    if (!seg) continue;
    const [coding, ...params] = seg.split(';');
    let quality = 1;
    for (const p of params) {
      const m = /^\s*q\s*=\s*(\d+(?:\.\d+)?)/i.exec(p);
      if (m) quality = Number(m[1]);
    }
    q.set(coding.trim().toLowerCase(), quality);
  }
  return { gzip: (q.get('gzip') ?? 0) > 0, br: (q.get('br') ?? 0) > 0 };
}

/**
 * 代理侧缓存的统一预算（评审 §3.4：三层缓存 → 一个预算、一个开关）。
 * 两个池子各有份额，份额之和就是总预算；设置页只显示「已用 / 总预算」并给一个
 * 清空按钮（RPC：pocket.cache.stats / pocket.cache.clear）。
 *
 * 总预算 36MB（24 + 12），低于历史两层上限之和（32MB + 24MB = 56MB）：56MB 是
 * 手机上一笔实打实的常驻内存，而两个池子几乎不会同时打满。单条不可变资源的上限取份额
 * 的四分之一，避免一个超大组合包把其余资源全部挤出去。
 */
export const CACHE_BUDGET = Object.freeze({
  totalBytes: 36 * 1024 * 1024,
  immutableBytes: 24 * 1024 * 1024,
  sessionListBytes: 12 * 1024 * 1024,
  immutableEntries: 16,
  sessionListEntries: 8,
  immutableEntryBytes: 6 * 1024 * 1024,
});

// session/list 瘦身（issue：公网加载慢 / 对话加载不出来）：
// 会话列表一次返回全部会话的全部投影值——2,000~3,500 个会话可达 40MB+ JSON，
// 手机隧道单次要数分钟，页面加载期还被反复调用。
// 体积集中在少数胖投影：contextHeaders、retrace/forkmap、turnOutline、retrace/versions。
// 例外：watcherInsights 不能剥（dsh-watcher 的统计面板直接扫 session/list 里的该字段）。
export const SESSION_LIST_SLIM_RE = /\/api\/session\/list$/;
export const SESSION_LIST_SLIM_KEYS = ['contextHeaders', 'retrace/forkmap', 'retrace/versions', 'turnOutline'];
export const SESSION_LIST_CACHE_TTL_MS = 2_000;
export const SESSION_LIST_BODY_MAX = 1 << 20;
// 上限提升至 64 MiB：重度 DSH 用户（2,000–3,500 会话）未压缩 JSON 约 35–48MB，
// 旧 16MB 上限会直接放弃瘦身落入原始大包透传。解压/解析/重压缩已移入独立 Worker 线程，
// 不再阻塞宿主主事件循环。
export const SESSION_LIST_SLIM_MAX = 64 * 1024 * 1024;
export const SESSION_LIST_SLIM_INFLIGHT_MAX = 3;

/**
 * 瘦身并返回可缓存的响应对象。
 */
export function slimSessionListValue(text) {
  let obj;
  try { obj = JSON.parse(text); } catch { return null; }
  const items = obj?.result?.value?.items;
  if (!Array.isArray(items)) return null;
  for (const item of items) {
    const values = item?.projections?.values;
    if (values && typeof values === 'object') {
      for (const key of SESSION_LIST_SLIM_KEYS) delete values[key];
    }
  }
  return obj;
}

/**
 * 将已瘦身的 session/list 对象序列化一次，并围绕顶层 `"rpcId":` 切分为
 * `prefixBuf` + `suffixBuf`。命中缓存时只需拼接 `[prefixBuf, rpcIdJsonBuf, suffixBuf]`
 * 再走异步压缩，避免在主线程反复执行多 MB 的 `JSON.stringify`。
 *
 * @param {object} obj 已剥离胖投影的对象（由 slimSessionListValue 产出）
 */
export function splitSlimmedJsonForRpcId(obj) {
  const hasRpcIdField = Object.prototype.hasOwnProperty.call(obj, 'rpcId');
  if (hasRpcIdField) {
    const initialRpcId = obj.rpcId;
    const sentinel = `__dshp_rpc_${randomBytes(12).toString('hex')}__`;
    obj.rpcId = sentinel;
    const jsonWithSentinel = JSON.stringify(obj);
    obj.rpcId = initialRpcId;
    const quotedSentinel = `"${sentinel}"`;
    const idx = jsonWithSentinel.indexOf(quotedSentinel);
    if (idx >= 0) {
      const prefixBuf = Buffer.from(jsonWithSentinel.slice(0, idx), 'utf8');
      const suffixBuf = Buffer.from(jsonWithSentinel.slice(idx + quotedSentinel.length), 'utf8');
      const initialRpcBuf = Buffer.from(JSON.stringify(initialRpcId ?? null), 'utf8');
      const slimmedBuf = Buffer.concat([prefixBuf, initialRpcBuf, suffixBuf]);
      return {
        slimmedBuf,
        prefixBuf,
        suffixBuf,
        hasRpcIdField: true,
        initialRpcId: typeof initialRpcId === 'string' ? initialRpcId : null,
      };
    }
  }
  const slimmedBuf = Buffer.from(JSON.stringify(obj), 'utf8');
  const prefixBuf = Buffer.from('{"rpcId":', 'utf8');
  const suffixBuf = Buffer.concat([Buffer.from(',', 'utf8'), slimmedBuf.subarray(1)]);
  return {
    slimmedBuf,
    prefixBuf,
    suffixBuf,
    hasRpcIdField: false,
    initialRpcId: null,
  };
}

/**
 * 创建实例级代理缓存（每个 createPocketProxy 拥有独立预算与生命周期）。
 * @param {typeof CACHE_BUDGET} [customBudget]
 */
export function createProxyCache(customBudget = CACHE_BUDGET) {
  const budget = customBudget ?? CACHE_BUDGET;
  const immutableCache = new Map();
  let immutableCacheBytes = 0;
  const sessionListCache = new Map();

  function sessionListCacheBytes() {
    let total = 0;
    for (const entry of sessionListCache.values()) total += entry.bytes ?? 0;
    return total;
  }

  function immutableGet(url) {
    const hit = immutableCache.get(url);
    if (hit === undefined) return null;
    immutableCache.delete(url);
    immutableCache.set(url, hit);
    return hit;
  }

  function immutablePut(url, headers, body) {
    const maxEntry = budget === CACHE_BUDGET ? CACHE_BUDGET.immutableEntryBytes : budget.immutableEntryBytes;
    if (body.length === 0 || body.length > maxEntry) return;
    const keep = { 'content-length': String(body.length) };
    for (const name of ['content-type', 'content-encoding', 'cache-control', 'vary', 'last-modified']) {
      const value = headers[name];
      if (value !== undefined) keep[name] = value;
    }
    const previous = immutableCache.get(url);
    if (previous !== undefined) {
      immutableCacheBytes -= previous.body.length;
      immutableCache.delete(url);
    }
    immutableCache.set(url, { headers: keep, body });
    immutableCacheBytes += body.length;
    const maxEntries = budget === CACHE_BUDGET ? CACHE_BUDGET.immutableEntries : budget.immutableEntries;
    while (
      immutableCache.size > maxEntries
      || (budget === CACHE_BUDGET ? immutableCacheBytes > CACHE_BUDGET.immutableBytes : immutableCacheBytes > budget.immutableBytes)
    ) {
      const oldestKey = immutableCache.keys().next().value;
      if (oldestKey === undefined) break;
      const evicted = immutableCache.get(oldestKey);
      immutableCache.delete(oldestKey);
      immutableCacheBytes -= evicted.body.length;
    }
  }

  function sessionListGet(key) {
    const hit = sessionListCache.get(key);
    if (!hit) return null;
    if (Date.now() > hit.expiresAt) {
      sessionListCache.delete(key);
      return null;
    }
    return hit;
  }

  /** 写入前先淘汰：过期条目 → 超出条数/字节预算的最旧条目。 */
  function sessionListSet(key, entry) {
    sessionListCache.delete(key);
    sessionListCache.set(key, entry);
    const now = Date.now();
    for (const [k, v] of sessionListCache) {
      if (now > v.expiresAt) sessionListCache.delete(k);
    }
    const maxEntries = budget === CACHE_BUDGET ? CACHE_BUDGET.sessionListEntries : budget.sessionListEntries;
    while (sessionListCache.size > maxEntries) {
      sessionListCache.delete(sessionListCache.keys().next().value);
    }
    while (
      (budget === CACHE_BUDGET ? sessionListCacheBytes() > CACHE_BUDGET.sessionListBytes : sessionListCacheBytes() > budget.sessionListBytes)
      && sessionListCache.size > 1
    ) {
      sessionListCache.delete(sessionListCache.keys().next().value);
    }
  }

  // 60s 兜底清理过期条目，unref 不阻止进程退出。
  const sweepTimer = setInterval(() => {
    const now = Date.now();
    for (const [k, v] of sessionListCache) {
      if (now > v.expiresAt) sessionListCache.delete(k);
    }
  }, 60_000);
  sweepTimer.unref?.();

  function stats() {
    const slBytes = sessionListCacheBytes();
    return {
      bytes: immutableCacheBytes + slBytes,
      entries: immutableCache.size + sessionListCache.size,
      budgetBytes: budget.totalBytes,
      immutable: {
        bytes: immutableCacheBytes,
        entries: immutableCache.size,
        budgetBytes: budget.immutableBytes,
      },
      sessionList: {
        bytes: slBytes,
        entries: sessionListCache.size,
        budgetBytes: budget.sessionListBytes,
      },
    };
  }

  function clear() {
    const before = stats();
    immutableCache.clear();
    immutableCacheBytes = 0;
    sessionListCache.clear();
    return { freedBytes: before.bytes, bytes: 0, entries: 0 };
  }

  function dispose() {
    clearInterval(sweepTimer);
    return clear();
  }

  return {
    budget,
    immutableGet,
    immutablePut,
    sessionListGet,
    sessionListSet,
    stats,
    clear,
    dispose,
  };
}

const defaultCache = createProxyCache(CACHE_BUDGET);
const activeCacheStack = [];
const proxyCacheStorage = new AsyncLocalStorage();

function currentCache() {
  return proxyCacheStorage.getStore()
    ?? (activeCacheStack.length > 0 ? activeCacheStack[activeCacheStack.length - 1] : defaultCache);
}

/** 在某个代理实例的上下文中运行请求处理（使下游模块自动命中该实例缓存）。 */
export function runWithProxyCache(cache, fn) {
  return proxyCacheStorage.run(cache, fn);
}

/** 注册活动代理实例缓存（供模块级 proxyCacheStats / clearProxyCaches 观测与清空）。 */
export function activateProxyCache(cache) {
  if (!cache || cache === defaultCache) return;
  const idx = activeCacheStack.indexOf(cache);
  if (idx >= 0) activeCacheStack.splice(idx, 1);
  activeCacheStack.push(cache);
}

/** 注销活动代理实例缓存。 */
export function deactivateProxyCache(cache) {
  const idx = activeCacheStack.indexOf(cache);
  if (idx >= 0) activeCacheStack.splice(idx, 1);
}

export function immutableCacheGet(url) {
  return currentCache().immutableGet(url);
}

export function immutableCachePut(url, headers, body) {
  return currentCache().immutablePut(url, headers, body);
}

export function sessionListCacheGet(key) {
  return currentCache().sessionListGet(key);
}

export function sessionListCacheSet(key, entry) {
  return currentCache().sessionListSet(key, entry);
}

/**
 * 两个缓存池的当前用量（设置页数据源，也供测试断言预算不变量）。
 */
export function proxyCacheStats() {
  return currentCache().stats();
}

/**
 * 关闭代理或点击设置页「清空缓存」时释放缓存并返回释放量。
 */
export function clearProxyCaches() {
  let freedBytes = 0;
  const seen = new Set([defaultCache, ...activeCacheStack]);
  const contextual = proxyCacheStorage.getStore();
  if (contextual) seen.add(contextual);
  for (const c of seen) {
    freedBytes += c.clear().freedBytes;
  }
  return { freedBytes, bytes: 0, entries: 0 };
}
