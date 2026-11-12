// 代理侧缓存：统一预算、两个池子、一个总开关（评审 §3.4）。
//
// 池一 = 不可变资源的 brotli 转码结果（内容哈希 URL，永不失效）；
// 池二 = /api/session/list 的瘦身结果（2s TTL，按请求体摘要命中）。
// 两个池子共用 CACHE_BUDGET，设置页通过 proxyCacheStats / clearProxyCaches 观测和清空。
// 本模块不认识 HTTP：只处理键、字节数与缓存条目。

/**
 * 内容哈希资产（/assets/<name>-<hash>.<ext>）：文件名带内容哈希，内容变则文件名变，
 * 可安全长缓存。上游只发 max-age=14400（4h），手机端每过几小时就重新协商/重下。
 */
export const HASHED_ASSET_RE = /^\/assets\/[^/]*-[A-Za-z0-9_-]{8,}\.[A-Za-z0-9]+$/;

/**
 * 不可变资源 URL（与 SW_SCRIPT 的 isImmutable 同一白名单）：内容哈希资产
 * /assets/<name>-<hash>.<ext>，以及带 rev=<hash> 的插件组合包 /plugins/??…。
 * 内容变则 URL 变，所以这类响应可以放心长期缓存。
 */
export function isImmutableUrl(rawUrl) {
  try {
    const x = new URL(String(rawUrl), 'http://dsh-pocket.invalid');
    if (x.pathname.startsWith('/assets/') && /-[A-Za-z0-9_-]{8,}\.[A-Za-z0-9]+$/.test(x.pathname)) return true;
    return x.pathname.startsWith('/plugins/') && /[?&]rev=[0-9a-f]{6,}/i.test(x.search);
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
 * 总预算 36MB（24 + 12），低于此前两处硬编码上限之和（32MB + 24MB = 56MB）：56MB 是
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

/**
 * 不可变资源的 brotli 转码结果缓存：每次冷加载都要重新 gunzip + brotli
 * （940KB 资产约 157ms 宿主 CPU，3.6MB 组合包约 0.5s），而内容变则 URL 变，
 * 缓存永不失效。缓存的是最终发给浏览器的字节（含 content-encoding）。
 * 上限见 CACHE_BUDGET，按最近使用淘汰（Map 插入序，命中后重插到队尾）。
 */
const immutableCache = new Map();
let immutableCacheBytes = 0;

export function immutableCacheGet(url) {
  const hit = immutableCache.get(url);
  if (hit === undefined) return null;
  immutableCache.delete(url);
  immutableCache.set(url, hit);
  return hit;
}

export function immutableCachePut(url, headers, body) {
  // 单条上限是池子份额的四分之一，避免一个超大组合包把其余资源挤出去。
  if (body.length === 0 || body.length > CACHE_BUDGET.immutableEntryBytes) return;
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
  while (immutableCache.size > CACHE_BUDGET.immutableEntries || immutableCacheBytes > CACHE_BUDGET.immutableBytes) {
    const oldestKey = immutableCache.keys().next().value;
    if (oldestKey === undefined) break;
    const evicted = immutableCache.get(oldestKey);
    immutableCache.delete(oldestKey);
    immutableCacheBytes -= evicted.body.length;
  }
}

/**
 * 默认注入到经代理的 HTML 文档里：crypto.randomUUID / AbortSignal.any polyfill
 * （非安全上下文必需）+ issue #96 的 transport.createApiClient 兜底
 * + 静态资源 SW 注册（issue 慢加载，重复打开免重下 combo）。
 */
// session/list 瘦身（issue：公网加载慢 / 对话加载不出来）：
// 会话列表一次返回全部会话的全部投影值——1826 个会话实测 40.5MB JSON（压缩后
// 7MB），手机隧道单次要 2 分钟，页面加载期还被反复调用，会话树全程为空。
// 体积集中在少数胖投影（实测占比）：contextHeaders 12MB、retrace/forkmap 8.7MB、
// turnOutline 6.6MB、retrace/versions 3.5MB、watcherInsights 2MB，合计 ≈33MB。
// 这些字段的读取方都在面板类 UI（上下文面板 / retrace 面板 / watcher 面板），
// 主会话树只读 title/goal/tokenUsage 等小字段；turnOutline 的轨道导航有空值
// 降级（stable empty array），已开会话可经 session/projections 取精确值。
// 所以在代理层剥掉它们（只影响 pocket 公网通道，桌面 Electron 直连不动）。
//
// 例外：watcherInsights 不能剥。dsh-watcher 的统计面板不是读「已开会话」的投影，
// 而是 scanSessions() 直接扫 session/list 里每个会话的
// projections.values.watcherInsights（src/insights/presentation.mjs）。剥掉后手机端
// 每个会话都显示「尚无 Watcher 统计缓存」，而真实原因是代理删了数据。它只占 2MB/40.5MB
// （≈5%），保留它是这里唯一正确的取舍；真要省这 2MB，应由 watcher 改用
// session/projections 逐会话取，而不是让代理静默删掉别的插件的数据。
// 短 TTL 缓存：页面加载期同一列表被连打 7+ 次，缓存把 7 次 40MB 解析坍缩成 1 次。
export const SESSION_LIST_SLIM_RE = /\/api\/session\/list$/;
export const SESSION_LIST_SLIM_KEYS = ['contextHeaders', 'retrace/forkmap', 'retrace/versions', 'turnOutline'];
export const SESSION_LIST_CACHE_TTL_MS = 2_000;
// 缓存键带请求体摘要（见 handleClientRequest 里的 wantsSlimBody）：不同 payload 的
// 列表请求必须各走各的缓存。超过这个体积（正常几百字节）只透传不缓存，避免为了
// 算摘要把异常大的请求体整块攒在内存里。
export const SESSION_LIST_BODY_MAX = 1 << 20;
// 会话列表响应同样有上限：瘦身要先把整包读进内存、解压、JSON.parse，再重新压缩。
// 没有上限时一个异常胖的列表（或恶意放大的响应）能把代理内存顶到几百 MB，
// 且 parse 是同步的、会卡住所有 WS 心跳。超过上限就放弃瘦身，交给下面的
// 流式压缩分支原样转发——宁可慢一点，也不能让一个请求拖垮整个宿主。
export const SESSION_LIST_SLIM_MAX = 16 * 1024 * 1024;
// 瘦身是「整包读进内存 + 同步 parse/stringify/压缩」的操作，单请求瞬时放大 2.7–3.7×
// （审计实测 35MB 响应 → +131MB RSS / 92ms 事件循环阻塞）。上限收到 16MB 后单请求
// 仍需 ~40MB，所以再加一层全局并发闸门：同时最多 3 个瘦身，第 4 个起直接走下面的
// 流式压缩分支原样转发——宁可这一次不瘦身，也不能让几个并发列表把 2GB 小主机打爆。
export const SESSION_LIST_SLIM_INFLIGHT_MAX = 3;

/**
 * 瘦身并返回可缓存的响应对象。命中缓存时会把 `rpcId` 就地改成当前请求的，
 * 所以键序与原响应一致，客户端按对象解析不受影响。
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

// 缓存（只服务 session/list）：键是「路径 + 请求体去 rpcId 后的摘要 + 编码族」。
// 条目里存的是剥离 rpcId 的对象，命中时按当前请求的 rpcId 重新出包。
// 有预算上限：列表瘦身后仍有数 MB，无限堆会把宿主内存吃掉。
const sessionListCache = new Map();

function sessionListCacheBytes() {
  let total = 0;
  for (const entry of sessionListCache.values()) total += entry.bytes ?? 0;
  return total;
}

export function sessionListCacheGet(key) {
  const hit = sessionListCache.get(key);
  if (!hit) return null;
  if (Date.now() > hit.expiresAt) { sessionListCache.delete(key); return null; }
  return hit;
}

/** 写入前先淘汰：过期条目 → 超出条数/字节预算的最旧条目。 */
export function sessionListCacheSet(key, entry) {
  sessionListCache.delete(key);
  sessionListCache.set(key, entry);
  for (const [k, v] of sessionListCache) {
    if (Date.now() > v.expiresAt) sessionListCache.delete(k);
  }
  while (sessionListCache.size > CACHE_BUDGET.sessionListEntries) {
    sessionListCache.delete(sessionListCache.keys().next().value);
  }
  while (sessionListCacheBytes() > CACHE_BUDGET.sessionListBytes && sessionListCache.size > 1) {
    sessionListCache.delete(sessionListCache.keys().next().value);
  }
}

// 过期条目不靠「下一次写入」才清：一次大列表之后如果没人再请求，条目会常驻到进程
// 结束（审计实测空闲 3s 后 heap 仍不回落）。60s 兜底 sweep，unref 不阻止进程退出。
const sessionListSweepTimer = setInterval(() => {
  const now = Date.now();
  for (const [k, v] of sessionListCache) {
    if (now > v.expiresAt) sessionListCache.delete(k);
  }
}, 60_000);
sessionListSweepTimer.unref?.();

/**
 * 两个缓存池的当前用量（设置页数据源，也供测试断言预算不变量）。
 * 数字不脱敏、不含 URL/内容——只有字节数与条目数，公网访客看到也无害。
 */
export function proxyCacheStats() {
  const sessionListBytes = sessionListCacheBytes();
  return {
    bytes: immutableCacheBytes + sessionListBytes,
    entries: immutableCache.size + sessionListCache.size,
    budgetBytes: CACHE_BUDGET.totalBytes,
    immutable: {
      bytes: immutableCacheBytes,
      entries: immutableCache.size,
      budgetBytes: CACHE_BUDGET.immutableBytes,
    },
    sessionList: {
      bytes: sessionListBytes,
      entries: sessionListCache.size,
      budgetBytes: CACHE_BUDGET.sessionListBytes,
    },
  };
}

/**
 * 关闭代理时释放模块级缓存（同进程重建代理/热重启时不再常驻几十 MB）；
 * 设置页的「清空缓存」也走这里（评审 §3.4：缓存要有总开关）。
 * 返回释放量，让调用方能告诉用户清掉了多少；未命中任何条目时 freedBytes 为 0。
 */
export function clearProxyCaches() {
  const before = proxyCacheStats();
  immutableCache.clear();
  immutableCacheBytes = 0;
  sessionListCache.clear();
  return { freedBytes: before.bytes, bytes: 0, entries: 0 };
}
