// 使用探针的宿主侧落盘（评审 §7.1）：把手机上报的计数包追加到本机 JSONL。
//
// 定位：这是一次性的「用数据决定 Phase 2 路线」的工具，不是产品功能。所以：
//   - 只写本机文件，不联网、不发给任何第三方；
//   - 字段白名单由 client/mobile/probe-core.mjs 的 normalizePacket 重建，宿主这里
//     不做「相信客户端」的判断；
//   - 有配额（8 MB 轮转 .1）与节流（每分钟最多 60 包），探针把宿主磁盘写满属于
//     探针自己的 bug，不能变成用户的事故。
//
// 数据文件：$DSH_HOME/dsh-pocket/probe.jsonl（每行一个 normalizePacket 之后的包）。
// 读法：node scripts/probe-report.mjs（人读报告）或 --json（给脚本用）。

import { appendFileSync, readFileSync, rmSync, renameSync, statSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';

import { normalizePacket } from '../client/mobile/probe-core.mjs';
import { probeEnabled, settingsPath } from './settings.mjs';

/** JSONL 文件名（与 settings.json 同目录）。 */
export const PROBE_FILE = 'probe.jsonl';

/** 单文件上限：超过就轮转到 <file>.1（只保留一代）。 */
export const PROBE_MAX_BYTES = 8 * 1024 * 1024;

/** 节流：同一来源每分钟最多 60 包、两包之间至少 500ms。 */
const PROBE_MAX_PER_WINDOW = 60;
const PROBE_WINDOW_MS = 60 * 1000;
const PROBE_MIN_INTERVAL_MS = 500;

/** 数据文件绝对路径。 */
export function probePath() {
  return join(dirname(settingsPath()), PROBE_FILE);
}

/** 给界面看路径：归约到 ~ 或 $DSH_HOME，避免把本机目录结构回给公网访客。 */
export function probeDisplayPath() {
  const path = probePath();
  const home = homedir();
  if (home && path.toLowerCase().startsWith(home.toLowerCase())) return '~' + path.slice(home.length);
  return join('$DSH_HOME', 'dsh-pocket', PROBE_FILE);
}

function fileSize(path) {
  try {
    return statSync(path).size;
  } catch {
    return 0;
  }
}

// 包数/最后时间的内存缓存：设置页每 10s 拉一次 status，不能每次都整文件扫一遍。
// 用「文件大小 + 路径」当身份：自己 append 之后同步更新；大小对不上（外部写入、
// 进程重启、轮转）才重扫。
let counter = { path: null, size: -1, packets: 0, lastAt: 0 };

function recount(path, size) {
  let packets = 0;
  let lastAt = 0;
  try {
    const text = readFileSync(path, 'utf8');
    const lines = text.split('\n');
    for (const line of lines) {
      if (line === '') continue;
      packets += 1;
      lastAt = lastPacketTime(line) || lastAt;
    }
  } catch {
    packets = 0;
    lastAt = 0;
  }
  counter = { path, size, packets, lastAt };
  return counter;
}

function lastPacketTime(line) {
  try {
    const packet = JSON.parse(line);
    const at = Number(packet?.now);
    return Number.isFinite(at) && at > 0 ? at : 0;
  } catch {
    return 0;
  }
}

function syncCounter(path) {
  const size = fileSize(path);
  if (counter.path === path && counter.size === size) return counter;
  return recount(path, size);
}

/** 设置页/status 用的用量快照；缺文件时全是 0。 */
export function probeStats() {
  const path = probePath();
  const current = syncCounter(path);
  return {
    enabled: probeEnabled(),
    path: probeDisplayPath(),
    bytes: fileSize(path),
    maxBytes: PROBE_MAX_BYTES,
    packets: current.packets,
    lastAt: current.lastAt,
  };
}

// 节流窗口：只留最近一分钟内的接受时刻。
let recent = [];

function rotateIfNeeded(path, incomingBytes) {
  const size = fileSize(path);
  if (size === 0) return;
  if (size + incomingBytes <= PROBE_MAX_BYTES) return;
  const rolled = path + '.1';
  try { rmSync(rolled, { force: true }); } catch { /* 删不掉旧轮转文件就继续，下面 rename 会覆盖 */ }
  try { renameSync(path, rolled); } catch { /* 轮转失败：接着往原文件追加，总比丢数据好 */ }
  counter = { path: null, size: -1, packets: 0, lastAt: 0 };
}

/**
 * 追加一包。返回 { accepted, reason?, packets, lastAt }：
 *   reason = 'disabled' | 'invalid' | 'throttled' | 'io'
 * 客户端只把 accepted 当成功（成功才清空本地计数），其余一律继续累加。
 */
export function appendProbePacket(raw) {
  if (!probeEnabled()) return { accepted: false, reason: 'disabled', packets: 0, lastAt: 0 };
  const packet = normalizePacket(raw);
  if (packet === null) return { accepted: false, reason: 'invalid', packets: 0, lastAt: 0 };

  const now = Date.now();
  recent = recent.filter((at) => now - at < PROBE_WINDOW_MS);
  if (recent.length >= PROBE_MAX_PER_WINDOW) {
    return { accepted: false, reason: 'throttled', packets: counter.packets, lastAt: counter.lastAt };
  }
  const last = recent.length > 0 ? recent[recent.length - 1] : 0;
  if (last !== 0 && now - last < PROBE_MIN_INTERVAL_MS) {
    return { accepted: false, reason: 'throttled', packets: counter.packets, lastAt: counter.lastAt };
  }

  const path = probePath();
  const line = JSON.stringify(packet) + '\n';
  try {
    mkdirSync(dirname(path), { recursive: true });
    rotateIfNeeded(path, Buffer.byteLength(line));
    appendFileSync(path, line, 'utf8');
  } catch (error) {
    return { accepted: false, reason: 'io', error: error?.message ?? String(error), packets: counter.packets, lastAt: counter.lastAt };
  }

  recent.push(now);
  const size = fileSize(path);
  counter = {
    path,
    size,
    packets: (counter.path === path ? counter.packets : 0) + 1,
    lastAt: packet.now,
  };
  return { accepted: true, packets: counter.packets, lastAt: counter.lastAt };
}

/** 清空探针数据（含轮转文件），返回释放的字节数。 */
export function clearProbe() {
  const path = probePath();
  const freedBytes = fileSize(path) + fileSize(path + '.1');
  for (const target of [path, path + '.1']) {
    try { rmSync(target, { force: true }); } catch { /* 被占用/已不存在都算清空失败的下限，不抛 */ }
  }
  counter = { path: null, size: -1, packets: 0, lastAt: 0 };
  recent = [];
  return { freedBytes, packets: 0, lastAt: 0 };
}
