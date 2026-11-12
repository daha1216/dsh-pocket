// session/list 瘦身（issue：公网加载慢 / 对话加载不出来）+ 并发闸门（2026-11-12 评审 §3.1 拆包）。
//
// 缓冲整个响应体，剥掉胖投影（contextHeaders / retrace/forkmap / retrace/versions /
// turnOutline）后重压缩回写。只认 POST + /api/session/list + 200 JSON；解压/改写失败一律
// 原样透传（宁可胖也不能错）。缓存键必须带请求体摘要：不同 payload（切工作区、不同 cwd /
// cursor）各走各的缓存，否则短 TTL 内第二次请求会把 A 工作区的会话树渲染进 B 工作区，
// 且客户端认为加载完成、不会自我纠正。摘要已剔掉 rpcId（每次调用都变，含它永远不命中），
// 命中时再把当前请求的 rpcId 填回——客户端对不上号会丢弃整包响应（点会话一直转圈）。
//
// 并发闸门是内存保护：每个瘦身单请求峰值 ~40MB，首屏会并发 7+ 个列表请求；超出预算的
// 请求回落到流式压缩分支原样转发（这次不瘦身），避免把宿主内存打爆或卡死事件循环。
import { gunzipSync, brotliDecompressSync, inflateSync, brotliCompressSync, gzipSync, constants as zlibConstants } from 'node:zlib';
import {
  SESSION_LIST_CACHE_TTL_MS, SESSION_LIST_SLIM_INFLIGHT_MAX, SESSION_LIST_SLIM_MAX, SESSION_LIST_SLIM_RE,
  sessionListCacheGet, sessionListCacheSet, slimSessionListValue,
} from './cache.mjs';

/** 进行中的瘦身数上限（全局，不是每 IP）：超出即不再瘦身，直接落到流式压缩分支。 */
export function createSlimInflightGate(max = SESSION_LIST_SLIM_INFLIGHT_MAX) {
  let inflight = 0;
  return {
    get inflight() { return inflight; },
    /** @returns {null | (() => void)} 释放函数；null 表示预算已满 */
    tryAcquire() {
      if (inflight >= max) return null;
      inflight += 1;
      let released = false;
      return () => {
        if (released) return;
        released = true;
        inflight -= 1;
      };
    },
  };
}

/**
 * @param {{req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse,
 *   proxyRes: import('node:http').IncomingMessage, contentType: string,
 *   codings: {gzip: boolean, br: boolean}, slimBodyDigest: string|null, slimRpcId: string|null,
 *   gate: ReturnType<typeof createSlimInflightGate>, log: Function|null}} ctx
 * @returns {boolean} 已接管响应（调用方必须立刻 return）
 */
export function serveSlimSessionList({ req, res, proxyRes, contentType, codings, slimBodyDigest, slimRpcId, gate, log }) {
  // session/list 瘦身（issue：公网加载慢 / 对话加载不出来）：缓冲整个响应体，
  // 剥掉胖投影后重压缩回写。只认 POST + /api/session/list + 200 JSON；
  // 解压/改写失败一律原样透传（宁可胖也不能错）。
  const slimPath = String(req.url ?? '').split('?')[0] ?? '';
  const slimDeclared = Number(proxyRes.headers['content-length'] || 0);
  if (req.method === 'POST' && SESSION_LIST_SLIM_RE.test(slimPath)
    && proxyRes.statusCode === 200 && contentType.includes('application/json')
    && slimDeclared <= SESSION_LIST_SLIM_MAX) {
    // 并发闸门：每个瘦身要整包缓冲、同步解析与重压（单请求峰值 ~40MB），首屏会并发 7+
    // 个列表请求。超出预算的请求直接落到下面的流式压缩分支原样转发——这次不瘦身，
    // 但不会把宿主内存打爆或把事件循环卡死（闸门实现见本文件末尾）。
    const releaseSlim = gate.tryAcquire();
    if (releaseSlim === null) return false;
    proxyRes.on('close', releaseSlim); // 客户端 abort / 上游中断时也归还预算
    // 请求体摘要进键（见上方 wantsSlimBody）：不同 payload 各走各的缓存；
    // 摘要拿不到（体积超限/非预期请求）就不缓存，宁可慢也不能串台。
    // 摘要已经剔掉 rpcId：同一个列表请求每次调用的 rpcId 都不同，拿它算摘要
    // 会让缓存永远不命中；而回包里的 rpcId 必须换成当前这次请求的，
    // 否则客户端对不上号，会把整包响应丢掉（点会话一直转圈）。
    const cacheKey = slimBodyDigest === null
      ? null
      : `${slimPath}|${codings.br ? 'br' : codings.gzip ? 'gzip' : 'raw'}|${slimBodyDigest}`;
    const cached = cacheKey === null ? null : sessionListCacheGet(cacheKey);
    if (cached !== null) {
      proxyRes.resume(); // 消费掉上游响应体，释放连接
      const outValue = cached.value;
      if (slimRpcId !== null) outValue.rpcId = slimRpcId;
      let hitBody = Buffer.from(JSON.stringify(outValue), 'utf8');
      const hitHeaders = { ...cached.headers };
      if (hitHeaders['content-encoding'] === 'br') hitBody = brotliCompressSync(hitBody, { params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 6 } });
      else if (hitHeaders['content-encoding'] === 'gzip') hitBody = gzipSync(hitBody);
      hitHeaders['content-length'] = String(hitBody.length);
      res.writeHead(proxyRes.statusCode ?? 200, { ...hitHeaders, 'x-dsh-pocket-slim-cache': 'hit' });
      res.end(hitBody);
      releaseSlim();
      return true;
    }
    const chunks = [];
    let rawBytes = 0;
    let slimOverflow = false;
    proxyRes.on('data', (c) => {
      if (slimOverflow) return;
      chunks.push(c);
      rawBytes += c.length;
      if (rawBytes > SESSION_LIST_SLIM_MAX) {
        // 声明长度不可信（chunked）或上游实际超限：放弃瘦身，已收字节 + 后续
        // 数据按原始编码流式回传。此时还没发头，可以直接切。
        slimOverflow = true;
        const buffered = Buffer.concat(chunks);
        chunks.length = 0;
        if (!res.headersSent) res.writeHead(proxyRes.statusCode ?? 200, { ...proxyRes.headers });
        res.write(buffered);
        proxyRes.pipe(res);
        releaseSlim();
      }
    });
    proxyRes.on('end', () => {
      if (slimOverflow) return;
      releaseSlim();
      const raw = Buffer.concat(chunks);
      const enc = String(proxyRes.headers['content-encoding'] ?? '').trim().toLowerCase();
      let plain = null;
      // maxOutputLength 与原始上限一致：压缩比异常时让 zlib 抛错走原样透传，
      // 而不是先分配出 GB 级缓冲再把进程打死。
      const maxOut = { maxOutputLength: SESSION_LIST_SLIM_MAX };
      if (enc === '') plain = raw;
      else if (enc === 'gzip' || enc === 'x-gzip') { try { plain = gunzipSync(raw, maxOut); } catch { plain = null; } }
      else if (enc === 'br') { try { plain = brotliDecompressSync(raw, maxOut); } catch { plain = null; } }
      else if (enc === 'deflate') { try { plain = inflateSync(raw, maxOut); } catch { plain = null; } }
      let slimmed = null;
      let slimValue = null;
      if (plain !== null) {
        slimValue = slimSessionListValue(plain.toString('utf8'));
        if (slimValue !== null) slimmed = Buffer.from(JSON.stringify(slimValue), 'utf8');
      }
      if (slimmed === null) {
        // 解压或改写失败：原始头 + 原始体纯透传（保留原 content-encoding）
        if (!res.headersSent) {
          res.writeHead(proxyRes.statusCode ?? 200, { ...proxyRes.headers });
          res.end(raw);
        }
        return;
      }
      log?.(`dsh-pocket: session/list slimmed | 会话列表瘦身 ${rawBytes}B -> ${slimmed.length}B`);
      const outHeaders = { ...proxyRes.headers };
      delete outHeaders['content-length'];
      delete outHeaders['transfer-encoding'];
      delete outHeaders['etag'];
      delete outHeaders['content-encoding'];
      let send = slimmed;
      if (codings.br) {
        send = brotliCompressSync(slimmed, { params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 6 } });
        outHeaders['content-encoding'] = 'br';
      } else if (codings.gzip) {
        send = gzipSync(slimmed);
        outHeaders['content-encoding'] = 'gzip';
      }
      if (!/accept-encoding/i.test(String(outHeaders['vary'] ?? ''))) {
        outHeaders['vary'] = outHeaders['vary'] ? `${outHeaders['vary']}, Accept-Encoding` : 'Accept-Encoding';
      }
      outHeaders['content-length'] = String(send.length);
      outHeaders['cache-control'] = 'no-store';
      if (cacheKey !== null && slimValue !== null) {
        // 存对象而不是压缩后的字节：命中时必须把 rpcId 换成当前请求的，
        // 存字节就只能原样吐出上一次的 rpcId（客户端丢弃 → 一直加载中）。
        sessionListCacheSet(cacheKey, {
          value: slimValue,
          headers: outHeaders,
          bytes: slimmed.length,
          expiresAt: Date.now() + SESSION_LIST_CACHE_TTL_MS,
        });
      }
      if (!res.headersSent) {
        res.writeHead(proxyRes.statusCode ?? 200, outHeaders);
        res.end(send);
      }
    });
    proxyRes.on('error', () => { releaseSlim(); res.destroy(); });
    return true;
  }
  return false;
}
