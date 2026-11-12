// dsh web 浏览器会话 token 的握手重试计数（issue #91）。
//
// 代理每次 `GET /` 都可能补一次 `?token=<启动 token>`；Safari 在 http:// 纯 IP 源上
// 不保存 3xx 下发的 cookie，握手可能永远收敛不了。这里只提供按 IP 的窗口计数与
// 参数常量，过渡页/失败页在 pages.mjs，改写逻辑在 hosts.mjs。

// ---------- 会话握手重试计数（issue #91） ----------
// Safari（iOS/macOS）不持久化「http:// + 纯 IP 源」上由 3xx 响应下发的 cookie，
// 于是 dsh web 的 launch-token→cookie 握手永远收敛不了：代理每次 `GET /`
// 都补 `?token=`，上游每次 303 回 `/`，浏览器每次都不带 cookie → 无限重定向
// （Safari 报「发生了太多重定位」）。
//
// 两道防线：
//   1) 代理把这次 303 改写成 200 过渡页（Set-Cookie 照发 + meta refresh 跳回 `/`），
//      200 响应上的 cookie 不会被 Safari 的重定向 cookie 策略丢掉；
//   2) 万一 1) 也不管用，用下面的计数器在若干次尝试后停止注入 token 并给出
//      可操作提示页——宁可给用户一句人话，也不要无限转圈。
//
// 只按客户端 IP 计数（无需 cookie 支持，正适合「cookie 用不了」的这个场景）。
export const DEFAULT_HANDSHAKE_LIMIT = 3;
export const HANDSHAKE_WINDOW_MS = 60_000;
// 条目上限：公网隧道后真实客户端 IP 天然多样，而 launch token 注入对每个「无 cookie
// 的 GET /」都记一次；没有上限时 hits 只增不减（prune 只在注入请求到来时才跑），
// 且单次 prune 会变成 O(10 万) 的同步遍历。超过上限时先清过期、再按插入序淘汰最旧。
const HANDSHAKE_HITS_MAX = 4096;
/** 提示页「重试」按钮用的查询参数：命中即清空该 IP 的失败计数，且不往上游透传。 */
export const HANDSHAKE_RETRY_PARAM = 'dsh-pocket-retry';

/** 摘掉某个查询参数后重新拼路径；解析失败或本来就没有则原样返回。 */
export function stripQueryParam(reqUrl, name) {
  let u;
  try { u = new URL(reqUrl ?? '/', 'http://dsh.invalid'); } catch { return reqUrl; }
  if (!u.searchParams.has(name)) return reqUrl;
  u.searchParams.delete(name);
  return `${u.pathname}${u.search}`;
}

export function createHandshakeTracker({ max = DEFAULT_HANDSHAKE_LIMIT, windowMs = HANDSHAKE_WINDOW_MS } = {}) {
  /** ip -> { count, start } */
  const hits = new Map();
  return {
    /** 记一次握手注入，返回窗口内的累计次数。 */
    record(ip, now = Date.now()) {
      const rec = hits.get(ip);
      let count;
      if (!rec || now - rec.start > windowMs) {
        hits.set(ip, { count: 1, start: now });
        count = 1;
      } else {
        rec.count += 1;
        count = rec.count;
      }
      if (hits.size > HANDSHAKE_HITS_MAX) {
        for (const [key, value] of hits) {
          if (now - value.start > windowMs) hits.delete(key);
        }
        while (hits.size > HANDSHAKE_HITS_MAX) hits.delete(hits.keys().next().value);
      }
      return count;
    },
    /** 握手成功（拿到会话 cookie 的请求）→ 清零。 */
    clear(ip) {
      hits.delete(ip);
    },
    /** 该 IP 是否已达重试上限。 */
    exhausted(ip) {
      const rec = hits.get(ip);
      return !!rec && rec.count >= max;
    },
    /** 清理过期条目，防长期运行内存膨胀。 */
    prune(now = Date.now()) {
      for (const [ip, rec] of hits) {
        if (now - rec.start > windowMs) hits.delete(ip);
      }
    },
  };
}
