// session/list 后台瘦身 Worker 池（v4.0 性能引擎）。
//
// 将最高可达 64MB 的响应解压（gunzip / brotliDecompress / inflate）、JSON.parse、
// 胖投影字段剥离、rpcId 前后缀切分与重压缩（brotli q6 / gzip）全部移出宿主主事件循环：
//   - 主线程导入时：管理最多 2 个惰性创建的复用 Worker，空闲时立即 `.unref()`，绝不阻塞
//     `node --test` 或宿主进程退出；在途任务期间 `.ref()` 保证单测无 HTTP server 时也能结算；
//   - Worker 不可用/启动异常时：自动降级到全异步 `node:zlib` 回调链（零 `*Sync` 调用）；
//   - 缓存命中时：主线程仅做 `[prefixBuf, rpcIdBuf, suffixBuf]` 拼接（< 0.3ms），随后走
//     libuv 线程池异步压缩，彻底消除“假缓存命中”同步阻塞。

import { Worker, isMainThread, parentPort } from 'node:worker_threads';
import {
  brotliCompress,
  brotliDecompress,
  constants as zlibConstants,
  gunzip,
  gzip,
  inflate,
} from 'node:zlib';
import { promisify } from 'node:util';
import { slimSessionListValue, splitSlimmedJsonForRpcId } from './cache.mjs';

const gunzipAsync = promisify(gunzip);
const brotliDecompressAsync = promisify(brotliDecompress);
const inflateAsync = promisify(inflate);
const brotliCompressAsync = promisify(brotliCompress);
const gzipAsync = promisify(gzip);

const BROTLI_Q6_OPTS = { params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 6 } };

/** 异步解压上游响应体；解压失败返回 null（由上层原样透传）。 */
async function decompressAsync(rawBuf, upstreamEncoding, maxOutputLength) {
  const enc = String(upstreamEncoding ?? '').trim().toLowerCase();
  const opts = maxOutputLength > 0 ? { maxOutputLength } : {};
  if (enc === '' || enc === 'identity') return Buffer.isBuffer(rawBuf) ? rawBuf : Buffer.from(rawBuf);
  try {
    if (enc === 'gzip' || enc === 'x-gzip') return await gunzipAsync(rawBuf, opts);
    if (enc === 'br') return await brotliDecompressAsync(rawBuf, opts);
    if (enc === 'deflate') return await inflateAsync(rawBuf, opts);
  } catch {
    return null;
  }
  return null;
}

/** 按目标编码异步压缩字节（绝不调用 *Sync）。 */
export async function compressAsync(plainBuf, targetEncoding) {
  if (targetEncoding === 'br') return brotliCompressAsync(plainBuf, BROTLI_Q6_OPTS);
  if (targetEncoding === 'gzip') return gzipAsync(plainBuf);
  return Buffer.isBuffer(plainBuf) ? plainBuf : Buffer.from(plainBuf);
}

/** 执行完整瘦身流水线（可在 Worker 线程内执行，也可作为无 Worker 环境的异步降级路径）。 */
async function executeSlimPipeline({ raw, upstreamEncoding, targetEncoding, maxOutputLength }) {
  const rawBuf = Buffer.isBuffer(raw)
    ? raw
    : Buffer.from(raw.buffer, raw.byteOffset, raw.byteLength);
  const plain = await decompressAsync(rawBuf, upstreamEncoding, maxOutputLength);
  if (plain === null) return { ok: false };

  const slimObj = slimSessionListValue(plain.toString('utf8'));
  if (slimObj === null) return { ok: false };

  const split = splitSlimmedJsonForRpcId(slimObj);
  const sendBuf = await compressAsync(split.slimmedBuf, targetEncoding);
  return {
    ok: true,
    slimmedBytes: split.slimmedBuf.length,
    sendBuf,
    prefixBuf: split.prefixBuf,
    suffixBuf: split.suffixBuf,
    hasRpcIdField: split.hasRpcIdField,
    initialRpcId: split.initialRpcId,
  };
}

/** 复制成独立 ArrayBuffer 供 postMessage 零拷贝 transfer（避免拆断 Node 8KB Buffer 共享池）。 */
function toStandaloneUint8(buf) {
  const copy = new Uint8Array(buf.byteLength);
  copy.set(buf);
  return copy;
}

// ==================== Worker 线程入口 ====================
if (!isMainThread && parentPort) {
  parentPort.on('message', async (msg) => {
    const { id, raw, upstreamEncoding, targetEncoding, maxOutputLength } = msg;
    try {
      const res = await executeSlimPipeline({ raw, upstreamEncoding, targetEncoding, maxOutputLength });
      if (!res.ok) {
        parentPort.postMessage({ id, ok: false });
        return;
      }
      const sendU8 = toStandaloneUint8(res.sendBuf);
      const prefixU8 = toStandaloneUint8(res.prefixBuf);
      const suffixU8 = toStandaloneUint8(res.suffixBuf);
      parentPort.postMessage(
        {
          id,
          ok: true,
          slimmedBytes: res.slimmedBytes,
          sendU8,
          prefixU8,
          suffixU8,
          hasRpcIdField: res.hasRpcIdField,
          initialRpcId: res.initialRpcId,
        },
        [sendU8.buffer, prefixU8.buffer, suffixU8.buffer],
      );
    } catch {
      parentPort.postMessage({ id, ok: false });
    }
  });
}

// ==================== 主线程 Worker 池调度 ====================
const MAX_POOL_WORKERS = 2;
const pool = [];
let nextJobId = 1;
let workerDisabled = false;

function spawnPoolWorker() {
  const worker = new Worker(new URL('./slim-worker.mjs', import.meta.url));
  worker.unref();
  const slot = {
    worker,
    pending: new Map(),
    dead: false,
  };

  const syncRefState = () => {
    if (slot.dead) return;
    if (slot.pending.size > 0) worker.ref();
    else worker.unref();
  };

  slot.syncRefState = syncRefState;

  worker.on('message', (msg) => {
    const entry = slot.pending.get(msg?.id);
    if (!entry) return;
    slot.pending.delete(msg.id);
    syncRefState();
    if (!msg.ok) {
      entry.resolve({ ok: false });
      return;
    }
    entry.resolve({
      ok: true,
      slimmedBytes: msg.slimmedBytes,
      sendBuf: Buffer.from(msg.sendU8.buffer, msg.sendU8.byteOffset, msg.sendU8.byteLength),
      prefixBuf: Buffer.from(msg.prefixU8.buffer, msg.prefixU8.byteOffset, msg.prefixU8.byteLength),
      suffixBuf: Buffer.from(msg.suffixU8.buffer, msg.suffixU8.byteOffset, msg.suffixU8.byteLength),
      hasRpcIdField: msg.hasRpcIdField,
      initialRpcId: msg.initialRpcId,
    });
  });

  const handleFailure = (err) => {
    if (slot.dead) return;
    slot.dead = true;
    const idx = pool.indexOf(slot);
    if (idx >= 0) pool.splice(idx, 1);
    try { worker.unref(); } catch { /* ignore */ }
    for (const [, entry] of slot.pending) {
      entry.reject(err ?? new Error('slim worker exited unexpectedly'));
    }
    slot.pending.clear();
  };

  worker.on('error', handleFailure);
  worker.on('exit', (code) => {
    handleFailure(new Error(`slim worker exited with code ${code}`));
  });

  pool.push(slot);
  return slot;
}

function pickWorkerSlot() {
  // 优先选空闲 worker，其次选负载最轻的 worker；未满上限则扩容。
  let best = null;
  for (const slot of pool) {
    if (slot.dead) continue;
    if (slot.pending.size === 0) return slot;
    if (best === null || slot.pending.size < best.pending.size) best = slot;
  }
  if (pool.length < MAX_POOL_WORKERS) {
    return spawnPoolWorker();
  }
  return best;
}

/**
 * 在后台 Worker 线程完成解压 + JSON 瘦身 + 重压缩；若 Worker 不可用则优雅回退异步流水线。
 * @param {{raw: Buffer, upstreamEncoding: string, targetEncoding: 'br'|'gzip'|'raw', maxOutputLength: number}} job
 */
export async function slimSessionListOffThread(job) {
  if (!workerDisabled) {
    try {
      const slot = pickWorkerSlot();
      if (slot) {
        return await new Promise((resolve, reject) => {
          const id = nextJobId++;
          slot.pending.set(id, { resolve, reject });
          slot.syncRefState();
          try {
            slot.worker.postMessage({
              id,
              raw: new Uint8Array(job.raw.buffer, job.raw.byteOffset, job.raw.byteLength),
              upstreamEncoding: job.upstreamEncoding,
              targetEncoding: job.targetEncoding,
              maxOutputLength: job.maxOutputLength,
            });
          } catch (err) {
            slot.pending.delete(id);
            slot.syncRefState();
            reject(err);
          }
        });
      }
    } catch {
      // Worker 无法创建或中途崩溃：本次及后续异常平滑走异步 zlib 兜底，不丢响应。
      if (pool.length === 0) workerDisabled = true;
      return executeSlimPipeline(job);
    }
  }
  return executeSlimPipeline(job);
}

/**
 * 缓存命中快速出包：
 *   - 若无新 rpcId（或与缓存初始 rpcId 一致），直接复用已压缩字节（0ms）；
 *   - 否则用 `Buffer.concat([prefixBuf, rpcIdJsonBuf, suffixBuf])` 极速替换 rpcId，
 *     并调用异步 zlib 压缩（主线程耗时 < 1ms，零 JSON.stringify / 零 *Sync）。
 */
export async function assembleAndCompressCacheHit({ cached, rpcId }) {
  if (rpcId === null || (cached.hasRpcIdField && rpcId === cached.initialRpcId)) {
    return cached.sendBuf;
  }
  const rpcBuf = Buffer.from(JSON.stringify(rpcId), 'utf8');
  const plainHit = Buffer.concat([cached.prefixBuf, rpcBuf, cached.suffixBuf]);
  return compressAsync(plainHit, cached.encoding);
}

/** 主动销毁空闲 Worker 池（测试或热卸载辅助；空闲 Worker 已默认 unref）。 */
export async function shutdownSlimWorkers() {
  const current = pool.splice(0, pool.length);
  await Promise.allSettled(current.map((slot) => {
    slot.dead = true;
    return slot.worker.terminate();
  }));
}
