// 上游响应体的编码侧处理：流式压缩 / gzip→brotli 转码 / 原样透传（2026-11-12 评审 §3.1 拆包）。
//
// 顺序是行为：先看能不能整段流式压缩（大 JSON/text 一次 17MB+，压到 ~1MB；SSE、Range、
// 已压缩、HTML 全部跳过），再决定「gzip 源转 brotli」还是纯透传。不可变资源（内容哈希
// 资产 / 带 rev 的插件包）在这两条路上都会顺手把结果收进 immutable 缓存，下次本地直接回。
import { createBrotliCompress, createGzip, createGunzip, constants as zlibConstants } from 'node:zlib';
import { HASHED_ASSET_RE, immutableCachePut } from './cache.mjs';
import { isCompressed } from './inject.mjs';
import { maskTokenForLog } from './auth.mjs';

/**
 * @param {{req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse,
 *   proxyRes: import('node:http').IncomingMessage, contentType: string,
 *   codings: {gzip: boolean, br: boolean}, immutableUrl: string|null, log: Function|null}} ctx
 */
export function pipeUpstreamBody({ req, res, proxyRes, contentType, codings, immutableUrl, log }) {
  // 大 JSON/text 响应**流式压缩**（issue #12）：长会话历史一次返回 17MB+，
  // 局域网直连与隧道段都吃满带宽；压缩到 ~1MB。跳过已压缩、SSE 流
  // （/api/events.* 原样透传）、HTML（走上面的注入分支）。
  // brotli 质量选 6（issue #25）：zlib 默认 q11 压 17MB 要 40s+，手机直接超时；
  // q6 实测 128ms（比 gzip 的 88ms 略慢但同档）且输出更小（1.00MB vs 1.20MB）。
  // accept-encoding 要按 q 值解析（RFC 7231）：`br;q=0` 是明确排除，
  // 词边界正则会把它误判成支持。编码 → q 映射，缺省 q=1，q>0 才算支持。
  const canGzip = codings.gzip;
  const canBr = codings.br;
  const isEventStream = contentType.includes('text/event-stream');
  const knownLen = Number(proxyRes.headers['content-length'] || 0);
  // 范围请求（音频/视频拖动进度、断点续传、大文件分段下载）绝对不能碰：
  // 上游回 206 时 body 只是整文件的一段，套上 Content-Encoding 后浏览器
  // 会拿这一段当独立压缩流去解，直接 ERR_CONTENT_DECODING_FAILED；
  // 而且 Content-Range 描述的是未压缩字节，编码一改就自相矛盾。
  // 同理 304（无 body）也不该被打上编码头。
  const isRangeResponse = proxyRes.statusCode === 206
    || proxyRes.headers['content-range'] !== undefined
    || req.headers.range !== undefined;
  const shouldCompress = (canGzip || canBr)
    && proxyRes.statusCode === 200
    && !isRangeResponse
    && !isCompressed(proxyRes.headers)
    && !isEventStream
    && (contentType.includes('application/json') || contentType.startsWith('text/'))
    && (knownLen === 0 || knownLen >= 1024);
  if (shouldCompress) {
    const enc = canBr ? 'br' : 'gzip';
    const outHeaders = { ...proxyRes.headers };
    delete outHeaders['content-length'];
    delete outHeaders['transfer-encoding'];
    outHeaders['content-encoding'] = enc;
    // 内容因请求的 accept-encoding 而异，必须声明 Vary（同转码分支的写法）
    if (!/accept-encoding/i.test(String(outHeaders['vary'] ?? ''))) {
      outHeaders['vary'] = outHeaders['vary'] ? `${outHeaders['vary']}, Accept-Encoding` : 'Accept-Encoding';
    }
    res.writeHead(proxyRes.statusCode ?? 200, outHeaders);
    const z = enc === 'br'
      ? createBrotliCompress({ params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 6 } })
      : createGzip();
    // 不可变资源：边发边收，结束（未中断）时把转码结果存进缓存。
    const cacheChunks = immutableUrl !== null && enc === 'br' ? [] : null;
    if (cacheChunks !== null) z.on('data', (chunk) => cacheChunks.push(chunk));
    proxyRes.pipe(z).pipe(res);
    if (cacheChunks !== null) {
      z.on('end', () => immutableCachePut(immutableUrl, outHeaders, Buffer.concat(cacheChunks)));
    }
    // 任一端断开都要清理（含压缩流）。注意：不能用 proxyRes 的 'close'
    // 来掐 res——正常结束后 close 也会触发，此时压缩流可能还没写完，
    // 会误杀连接；异常中止用 'aborted'。
    res.on('close', () => { proxyRes.destroy(); z.destroy(); });
    proxyRes.on('error', (err) => { log?.(`dsh-pocket: upstream stream error | 上游流错误: ${req.method} ${maskTokenForLog(req.url)} | ${err?.message ?? err}`); z.destroy(); res.destroy(); });
    proxyRes.on('aborted', () => { log?.(`dsh-pocket: upstream aborted | 上游中断: ${req.method} ${maskTokenForLog(req.url)}`); z.destroy(); res.destroy(); });
    z.on('error', (err) => { log?.(`dsh-pocket: compress stream error | 压缩流错误: ${req.method} ${maskTokenForLog(req.url)} | ${err?.message ?? err}`); res.destroy(); });
    return;
  }
  // 慢加载优化（issue 慢加载）：
  // (1) 内容哈希资产改写缓存头为一年 immutable——文件名带内容哈希，内容变即新 URL，
  //     原来的 max-age=14400 让手机每隔几小时就把 0.5MB JS 重下一遍；
  // (2) 上游已 gzip 的 JS/CSS/JSON 在客户端支持 brotli 时转码——公网链路瓶颈在隧道段
  //     （实测 0.24-0.94MB/s，CF 边缘能跑 1.9MB/s），combo 5.32MB→4.83MB（q5 转码 91ms），
  //     combo2 更省 ~30%。只碰「200 + GET + 纯 gzip 源」，br 源/多编码/非文本一律原样。
  const passthroughPath = String(req.url ?? '').split('?')[0] ?? '';
  const outHeaders = { ...proxyRes.headers };
  if (HASHED_ASSET_RE.test(passthroughPath) && proxyRes.statusCode === 200) {
    outHeaders['cache-control'] = 'public, max-age=31536000, immutable';
  }
  const srcEnc = String(proxyRes.headers['content-encoding'] ?? '');
  const transcodable = req.method === 'GET'
    && proxyRes.statusCode === 200
    && canBr
    && /^gzip$/i.test(srcEnc)
    && (contentType.includes('javascript') || contentType.includes('text/css') || contentType.includes('application/json'))
    && (knownLen === 0 || knownLen >= 4096);
  if (transcodable) {
    // 转码后字节变了：etag/accept-ranges/content-length 都失真，必须摘掉
    delete outHeaders['content-length'];
    delete outHeaders['transfer-encoding'];
    delete outHeaders['etag'];
    delete outHeaders['accept-ranges'];
    outHeaders['content-encoding'] = 'br';
    if (!/accept-encoding/i.test(String(outHeaders['vary'] ?? ''))) {
      outHeaders['vary'] = outHeaders['vary'] ? `${outHeaders['vary']}, Accept-Encoding` : 'Accept-Encoding';
    }
    res.writeHead(200, outHeaders);
    const gunzip = createGunzip();
    const brStream = createBrotliCompress({ params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 5 } });
    // 不可变资源：边转码边收，结束（未中断）时把结果存进缓存。
    const cacheChunks = immutableUrl !== null ? [] : null;
    if (cacheChunks !== null) brStream.on('data', (chunk) => cacheChunks.push(chunk));
    proxyRes.pipe(gunzip).pipe(brStream).pipe(res);
    if (cacheChunks !== null) {
      brStream.on('end', () => immutableCachePut(immutableUrl, outHeaders, Buffer.concat(cacheChunks)));
    }
    // 清理同上：异常中止用 'aborted'，正常结束不能掐压缩链
    res.on('close', () => { proxyRes.destroy(); gunzip.destroy(); brStream.destroy(); });
    proxyRes.on('error', (err) => { log?.(`dsh-pocket: upstream stream error | 上游流错误: ${req.method} ${maskTokenForLog(req.url)} | ${err?.message ?? err}`); gunzip.destroy(); brStream.destroy(); res.destroy(); });
    proxyRes.on('aborted', () => { log?.(`dsh-pocket: upstream aborted | 上游中断: ${req.method} ${maskTokenForLog(req.url)}`); gunzip.destroy(); brStream.destroy(); res.destroy(); });
    gunzip.on('error', (err) => { log?.(`dsh-pocket: gunzip stream error | 解压流错误: ${req.method} ${maskTokenForLog(req.url)} | ${err?.message ?? err}`); res.destroy(); });
    brStream.on('error', (err) => { log?.(`dsh-pocket: brotli stream error | 转码流错误: ${req.method} ${maskTokenForLog(req.url)} | ${err?.message ?? err}`); res.destroy(); });
    return;
  }
  res.writeHead(proxyRes.statusCode ?? 502, outHeaders);
  // 不可变资源且上游已回 br：原样透传的同时把 body 收进缓存，下次直接本地回。
  // 生产里 JS/CSS 多走这条（上游按 accept-encoding 已压好），不缓存的话命中率接近 0。
  const passthroughCache = immutableUrl !== null && /^br$/i.test(srcEnc) ? [] : null;
  if (passthroughCache !== null) proxyRes.on('data', (chunk) => passthroughCache.push(chunk));
  proxyRes.pipe(res);
  if (passthroughCache !== null) {
    proxyRes.on('end', () => immutableCachePut(immutableUrl, outHeaders, Buffer.concat(passthroughCache)));
  }
  // 任一端断开都要清理另一端：客户端断连销毁上游流（不留僵尸），
  // 上游流中途断开也要掐断客户端（否则响应头已发、体没发完 → 悬挂）
  res.on('close', () => proxyRes.destroy());
  proxyRes.on('error', () => res.destroy());
  proxyRes.on('close', () => { if (!res.writableEnded) res.destroy(); });
}
