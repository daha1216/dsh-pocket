// session/list 瘦身（issue：公网加载慢 / 对话加载不出来）+ Worker 异步引擎 + 并发闸门（v4.0）。
//
// 缓冲整个响应体后移交后台 Worker 完成解压、剥掉胖投影（contextHeaders / retrace/forkmap /
// retrace/versions / turnOutline）、rpcId 前后缀切分与重压缩回写，宿主主事件循环零阻塞。
// 只认 POST + /api/session/list + 200 JSON；解压/改写失败一律原样透传（宁可胖也不能错）。
// 缓存键带请求体去 rpcId 摘要：不同 payload（切工作区、不同 cwd / cursor）各走各的缓存；
// 缓存命中时仅用 `[prefixBuf, rpcIdJsonBuf, suffixBuf]` 替换当前 rpcId 并异步重压（< 1ms 主线程耗时）。

import {
  SESSION_LIST_CACHE_TTL_MS,
  SESSION_LIST_SLIM_INFLIGHT_MAX,
  SESSION_LIST_SLIM_MAX,
  SESSION_LIST_SLIM_RE,
  sessionListCacheGet,
  sessionListCacheSet,
} from './cache.mjs';
import { assembleAndCompressCacheHit, slimSessionListOffThread } from './slim-worker.mjs';

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
 *   gate: ReturnType<typeof createSlimInflightGate>, cache?: object|null, log: Function|null}} ctx
 * @returns {boolean} 已接管响应（调用方必须立刻 return）
 */
export function serveSlimSessionList({ req, res, proxyRes, contentType, codings, slimBodyDigest, slimRpcId, gate, cache = null, log }) {
  const slimPath = String(req.url ?? '').split('?')[0] ?? '';
  const slimDeclared = Number(proxyRes.headers['content-length'] || 0);
  if (
    req.method === 'POST'
    && SESSION_LIST_SLIM_RE.test(slimPath)
    && proxyRes.statusCode === 200
    && contentType.includes('application/json')
    && slimDeclared <= SESSION_LIST_SLIM_MAX
  ) {
    const targetEncoding = codings.br ? 'br' : codings.gzip ? 'gzip' : 'raw';
    const cacheGet = cache ? cache.sessionListGet : sessionListCacheGet;
    const cacheSet = cache ? cache.sessionListSet : sessionListCacheSet;
    const cacheKey = slimBodyDigest === null
      ? null
      : `${slimPath}|${targetEncoding}|${slimBodyDigest}`;

    // 先查缓存再占瘦身并发槽：首屏常并发 7+ 个相同列表请求，已命中的请求直接丢弃上游流
    // 并走轻量级前后缀拼接 + 异步重压，无需占用 64MB 原始大包缓冲配额（否则第 4 个起会
    // 被闸门拒绝而退化成 40MB 未瘦身透传）。
    const cached = cacheKey === null ? null : cacheGet(cacheKey);
    if (cached !== null) {
      proxyRes.resume(); // 消费掉上游响应体，释放 keep-alive 连接
      assembleAndCompressCacheHit({ cached, rpcId: slimRpcId })
        .then((hitBody) => {
          if (res.destroyed || res.writableEnded || res.headersSent) return;
          const hitHeaders = {
            ...cached.headers,
            'content-length': String(hitBody.length),
            'x-dsh-pocket-slim-cache': 'hit',
          };
          res.writeHead(proxyRes.statusCode ?? 200, hitHeaders);
          res.end(hitBody);
        })
        .catch(() => {
          if (!res.destroyed && !res.writableEnded) res.destroy();
        });
      return true;
    }

    const releaseSlim = gate.tryAcquire();
    if (releaseSlim === null) return false;

    const chunks = [];
    let rawBytes = 0;
    let slimOverflow = false;
    let upstreamEnded = false;

    res.on('close', () => {
      if (!upstreamEnded && !res.writableEnded) {
        slimOverflow = true;
        chunks.length = 0;
        releaseSlim();
      }
    });

    proxyRes.on('data', (c) => {
      if (slimOverflow) return;
      chunks.push(c);
      rawBytes += c.length;
      if (rawBytes > SESSION_LIST_SLIM_MAX) {
        // 声明长度不可信（chunked）或上游实际超限：放弃瘦身，已收字节 + 后续流式回传。
        slimOverflow = true;
        const buffered = Buffer.concat(chunks);
        chunks.length = 0;
        if (!res.headersSent && !res.destroyed) {
          res.writeHead(proxyRes.statusCode ?? 200, { ...proxyRes.headers });
          res.write(buffered);
          proxyRes.pipe(res);
        }
        releaseSlim();
      }
    });

    proxyRes.on('end', () => {
      upstreamEnded = true;
      if (slimOverflow) return;
      const raw = Buffer.concat(chunks);
      chunks.length = 0;
      const upstreamEncoding = String(proxyRes.headers['content-encoding'] ?? '').trim().toLowerCase();

      slimSessionListOffThread({
        raw,
        upstreamEncoding,
        targetEncoding,
        maxOutputLength: SESSION_LIST_SLIM_MAX,
      })
        .then((result) => {
          if (!result.ok) {
            if (!res.headersSent && !res.destroyed && !res.writableEnded) {
              res.writeHead(proxyRes.statusCode ?? 200, { ...proxyRes.headers });
              res.end(raw);
            }
            return;
          }
          log?.(`dsh-pocket: session/list slimmed | 会话列表瘦身 ${rawBytes}B -> ${result.slimmedBytes}B`);
          const outHeaders = { ...proxyRes.headers };
          delete outHeaders['content-length'];
          delete outHeaders['transfer-encoding'];
          delete outHeaders['etag'];
          delete outHeaders['content-encoding'];
          if (targetEncoding === 'br') outHeaders['content-encoding'] = 'br';
          else if (targetEncoding === 'gzip') outHeaders['content-encoding'] = 'gzip';
          if (!/accept-encoding/i.test(String(outHeaders['vary'] ?? ''))) {
            outHeaders['vary'] = outHeaders['vary'] ? `${outHeaders['vary']}, Accept-Encoding` : 'Accept-Encoding';
          }
          outHeaders['content-length'] = String(result.sendBuf.length);
          outHeaders['cache-control'] = 'no-store';

          if (cacheKey !== null) {
            cacheSet(cacheKey, {
              sendBuf: result.sendBuf,
              prefixBuf: result.prefixBuf,
              suffixBuf: result.suffixBuf,
              hasRpcIdField: result.hasRpcIdField,
              initialRpcId: result.initialRpcId,
              encoding: targetEncoding,
              headers: outHeaders,
              bytes: result.prefixBuf.length + result.suffixBuf.length + result.sendBuf.length,
              expiresAt: Date.now() + SESSION_LIST_CACHE_TTL_MS,
            });
          }

          if (!res.headersSent && !res.destroyed && !res.writableEnded) {
            res.writeHead(proxyRes.statusCode ?? 200, outHeaders);
            res.end(result.sendBuf);
          }
        })
        .catch(() => {
          if (!res.headersSent && !res.destroyed && !res.writableEnded) {
            res.writeHead(proxyRes.statusCode ?? 200, { ...proxyRes.headers });
            res.end(raw);
          }
        })
        .finally(releaseSlim);
    });

    proxyRes.on('aborted', () => {
      slimOverflow = true;
      chunks.length = 0;
      releaseSlim();
      res.destroy();
    });
    proxyRes.on('error', () => {
      slimOverflow = true;
      chunks.length = 0;
      releaseSlim();
      res.destroy();
    });
    return true;
  }
  return false;
}
