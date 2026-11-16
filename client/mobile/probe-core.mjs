// 「小探针」的纯逻辑层（无 DOM、无 localStorage、无 fs）：浏览器采集层、宿主落盘层、
// 报告脚本三方共用同一套字段定义与边界。
//
// 为什么是探针而不是功能：评审 §7.1 要用真实数据回答「手机上 80% 的时间在做什么」，
// 再决定 Phase 2 走路线 A（轻量视图）还是 B（中继 + 客户端）。所以这里只负责计数、
// 采样、打包与校验，不写任何判定——判定在 scripts/probe-report.mjs 里，采样规则改了
// 也能用旧数据重算。
//
// 两条硬约束：
//   1. 长期占用有界：每个字段都有上限（clamp），宿主不可达时继续累加而不是排队——
//      弱网隧道里排队会变成内存黑洞，而且探针丢了也不影响用户。
//   2. 上报包必须能被宿主重建：normalizePacket 是白名单重建而非过滤，未知字段一律
//      丢弃；老客户端或被改过的包都写不进 JSONL。

export const PROBE_VERSION = 1

/** 采集状态的 localStorage 键（iOS PWA 被系统杀掉后从这里续上）。 */
export const PROBE_STATE_KEY = 'dsh-pocket:probe:state:v1'

/** 上报节拍：5 分钟一包。页面隐藏/卸载时额外抢发一次，最多丢一个节拍。 */
export const PROBE_FLUSH_MS = 5 * 60 * 1000

/** 表面采样节拍：1 秒记一次「现在在干什么」。 */
export const PROBE_SAMPLE_MS = 1000

/** 本地持久化节拍：独立于上报成功与否，避免被杀前丢掉整段。 */
export const PROBE_PERSIST_MS = 60 * 1000

/** 锚点体检节拍：遍历 DOM 找缺失的宿主片段，5 分钟一次足够。 */
export const PROBE_ANCHOR_INTERVAL_MS = 5 * 60 * 1000

/** 链路看门狗的判定转移事件名（mobile-apply 内部两个 arm 之间的接口）。 */
export const PROBE_LINK_EVENT = 'dsh-pocket:link-verdict'

/** 单包上限：宿主按这个值拒收，避免一次请求把 JSONL 撑爆。 */
export const PROBE_MAX_PACKET_BYTES = 16 * 1024

/** 错误样本：只留最近几条短文本，够定位问题即可。 */
export const PROBE_MAX_ERROR_SAMPLES = 5
export const PROBE_MAX_TEXT = 160

/** 断线恢复耗时样本上限（超出丢最旧的）。 */
export const PROBE_MAX_RECOVER_SAMPLES = 64

/** 锚点缺失表上限：宿主每换代都会新增缺失片段，表要有界。 */
const PROBE_MAX_MISSING = 32

/** 计数上限：10 亿次相当于「永远不会到」，但能挡住被污染的输入。 */
const MAX_COUNT = 1_000_000_000

/** 时长上限：7 天。超过说明包坏了（或时钟跳变），按 7 天算。 */
const MAX_SPAN_MS = 7 * 24 * 60 * 60 * 1000

/** 用户在手机上做的事，按秒归到这几类。「看/批/发」的分母就是它们的和。 */
export const PROBE_SURFACES = Object.freeze(['read', 'type', 'approve', 'files', 'settings', 'other'])

/** 点击落点分类。用于回答「设置页/文件面板到底有人用吗」。 */
export const PROBE_CLICK_AREAS = Object.freeze([
  'conversation',
  'composer',
  'approve',
  'files',
  'settings',
  'panel',
  'nav',
  'header',
  'other',
])

/** 单次操作计数。 */
const COUNT_KEYS = Object.freeze([
  'loads',
  'sessions',
  'sends',
  'chars',
  'approvals',
  'scrollPx',
  'errors',
  'rejections',
  'freezes',
  'bfcache',
  'longtasks',
])

const ENV_STRINGS = Object.freeze(['displayMode', 'ios', 'host', 'platform'])
const ENV_NUMBERS = Object.freeze([
  'dpr',
  'screenW',
  'screenH',
  'viewportW',
  'viewportH',
  'safeTop',
  'safeBottom',
  'safeLeft',
  'safeRight',
])

/** 数字归一：非有限/负数一律 0，再按上限截断。 */
function toCount(value, max = MAX_COUNT) {
  const n = Math.round(Number(value))
  if (!Number.isFinite(n) || n <= 0) return 0
  return Math.min(max, n)
}

/** 时间戳归一：0 表示「无」。 */
function toTime(value) {
  const n = Math.round(Number(value))
  if (!Number.isFinite(n) || n <= 0) return 0
  return Math.min(n, 8.64e15)
}

/** 单行文本归一：去控制字符、压空白、截断。错误信息进 JSONL 前必须过这里。 */
export function probeText(value, max = PROBE_MAX_TEXT) {
  if (typeof value !== 'string' && typeof value !== 'number') return ''
  const flat = String(value)
    .replace(/[\u0000-\u001f\u007f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return flat.slice(0, max)
}

/** 环境快照：白名单重建。空字符串字段直接丢掉，别让包里全是空键。 */
export function normalizeEnv(raw) {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return null
  const env = { standalone: raw.standalone === true }
  for (const key of ENV_STRINGS) {
    const value = probeText(raw[key], 40)
    if (value !== '') env[key] = value
  }
  for (const key of ENV_NUMBERS) {
    const value = Math.round(Number(raw[key]))
    if (Number.isFinite(value) && value > 0) env[key] = Math.min(value, 100_000)
  }
  return env
}

/** 全新采集状态。 */
export function createProbeState(now = Date.now()) {
  const at = toTime(now) || Date.now()
  const surfaces = {}
  for (const key of PROBE_SURFACES) surfaces[key] = 0
  const clicks = {}
  for (const key of PROBE_CLICK_AREAS) clicks[key] = 0
  const counts = {}
  for (const key of COUNT_KEYS) counts[key] = 0
  return {
    v: PROBE_VERSION,
    since: at,
    updated: at,
    env: null,
    surfaces,
    clicks,
    counts,
    link: { downs: 0, recovers: 0, probes: 0, offline: 0, recoverMs: [], lastDownAt: 0 },
    perf: { frames: 0, slowFrames: 0 },
    anchors: { checked: 0, missing: {} },
    freezeMaxMs: 0,
    samples: [],
  }
}

/** 环境只记一次（首次加载），后续调用是 no-op——方向变化由视角字段单独记。 */
export function noteEnv(state, env) {
  if (state.env !== null) return state
  const next = normalizeEnv(env)
  if (next !== null) state.env = next
  return state
}

/** 累加某个表面的停留时长（毫秒）。未知表面归 other，单次采样最多 60s。 */
export function noteSurface(state, surface, ms) {
  const key = PROBE_SURFACES.includes(surface) ? surface : 'other'
  const add = Math.min(toCount(ms, 60_000), 60_000)
  if (add === 0) return state
  state.surfaces[key] = Math.min(MAX_SPAN_MS, state.surfaces[key] + add)
  return state
}

/** 记一次点击落点。 */
export function noteClick(state, area) {
  const key = PROBE_CLICK_AREAS.includes(area) ? area : 'other'
  state.clicks[key] = Math.min(MAX_COUNT, state.clicks[key] + 1)
  return state
}

/** 记一次操作计数（sends / approvals / chars / scrollPx …）。 */
export function noteCount(state, key, n = 1) {
  if (!COUNT_KEYS.includes(key)) return state
  const add = toCount(n, MAX_COUNT)
  if (add === 0) return state
  state.counts[key] = Math.min(MAX_COUNT, state.counts[key] + add)
  return state
}

export function noteLinkDown(state, at = Date.now()) {
  state.link.downs = Math.min(MAX_COUNT, state.link.downs + 1)
  state.link.lastDownAt = toTime(at)
  return state
}

export function noteLinkRecover(state, ms) {
  const value = toCount(ms, 600_000)
  state.link.recovers = Math.min(MAX_COUNT, state.link.recovers + 1)
  state.link.recoverMs.push(value)
  if (state.link.recoverMs.length > PROBE_MAX_RECOVER_SAMPLES) {
    state.link.recoverMs.splice(0, state.link.recoverMs.length - PROBE_MAX_RECOVER_SAMPLES)
  }
  return state
}

export function noteLinkProbe(state) {
  state.link.probes = Math.min(MAX_COUNT, state.link.probes + 1)
  return state
}

export function noteLinkOffline(state) {
  state.link.offline = Math.min(MAX_COUNT, state.link.offline + 1)
  return state
}

/** 滚动期帧采样：只统计「滚动时」的帧，避免把静态待机的 rAF 也算进性能。 */
export function noteFrames(state, frames, slowFrames) {
  const total = toCount(frames, MAX_COUNT)
  if (total === 0) return state
  const slow = Math.min(total, toCount(slowFrames, MAX_COUNT))
  state.perf.frames = Math.min(MAX_COUNT, state.perf.frames + total)
  state.perf.slowFrames = Math.min(state.perf.frames, state.perf.slowFrames + slow)
  return state
}

/** 一次锚点体检：检查了 checked 个片段，其中 missing 这些没命中。 */
export function noteAnchorAudit(state, missing) {
  state.anchors.checked = Math.min(1_000_000, state.anchors.checked + 1)
  const list = Array.isArray(missing) ? missing : []
  for (const frag of list.slice(0, PROBE_MAX_MISSING)) {
    const key = probeText(frag, 64)
    if (key === '' || !/^[\w-]+$/.test(key)) continue
    state.anchors.missing[key] = Math.min(1_000_000, (state.anchors.missing[key] ?? 0) + 1)
  }
  const entries = Object.entries(state.anchors.missing)
  if (entries.length > PROBE_MAX_MISSING) {
    entries.sort((a, b) => b[1] - a[1])
    state.anchors.missing = Object.fromEntries(entries.slice(0, PROBE_MAX_MISSING))
  }
  return state
}

/** 记一次错误：计数 + 少量短样本（不记堆栈，探针不是崩溃上报）。 */
export function noteError(state, kind, detail) {
  // 计数键与样本里的 kind 不同名（counts.rejections vs samples[].kind='rejection'）：
  // 计数表是长期累加的，样本表只留几条方便定位。
  const rejection = kind === 'rejection'
  const key = rejection ? 'rejections' : 'errors'
  state.counts[key] = Math.min(MAX_COUNT, state.counts[key] + 1)
  if (state.samples.length < PROBE_MAX_ERROR_SAMPLES) {
    const text = probeText(detail, PROBE_MAX_TEXT)
    if (text !== '') state.samples.push({ kind: rejection ? 'rejection' : 'error', text })
  }
  return state
}

/** 记一次主线程冻结：ms 是「本应 1s 一次的节拍实际晚了多少」。 */
export function noteFreeze(state, ms) {
  const gap = toCount(ms, 600_000)
  if (gap <= 0) return state
  state.counts.freezes = Math.min(MAX_COUNT, state.counts.freezes + 1)
  state.freezeMaxMs = Math.max(state.freezeMaxMs, gap)
  return state
}

/** 打包：深拷贝一份，调用方随后可以安全 reset。 */
export function snapshotPacket(state, now = Date.now()) {
  const at = Math.max(toTime(state.since) || 0, toTime(now) || 0)
  return {
    v: PROBE_VERSION,
    since: state.since,
    now: at,
    env: state.env === null ? null : { ...state.env },
    surfaces: { ...state.surfaces },
    clicks: { ...state.clicks },
    counts: { ...state.counts },
    link: {
      downs: state.link.downs,
      recovers: state.link.recovers,
      probes: state.link.probes,
      offline: state.link.offline,
      recoverMs: [...state.link.recoverMs],
      lastDownAt: state.link.lastDownAt,
    },
    perf: { ...state.perf },
    anchors: { checked: state.anchors.checked, missing: { ...state.anchors.missing } },
    freezeMaxMs: state.freezeMaxMs,
    samples: state.samples.map((sample) => ({ kind: sample.kind, text: sample.text })),
  }
}

/** 上报成功后清零：环境快照保留（它描述的是这台设备），since 重新起算。 */
export function resetProbeState(state, now = Date.now()) {
  const fresh = createProbeState(now)
  fresh.env = state.env
  return fresh
}

export function serializeProbeState(state) {
  try {
    return JSON.stringify(state)
  } catch {
    return ''
  }
}

/** 从 localStorage 恢复：只认已知字段，坏数据当没有。 */
export function parseProbeState(raw) {
  if (typeof raw !== 'string' || raw === '') return null
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) return null
  const state = createProbeState()
  const since = toTime(parsed.since)
  if (since !== 0) state.since = since
  state.env = normalizeEnv(parsed.env)
  for (const key of PROBE_SURFACES) state.surfaces[key] = toCount(parsed.surfaces?.[key], MAX_SPAN_MS)
  for (const key of PROBE_CLICK_AREAS) state.clicks[key] = toCount(parsed.clicks?.[key])
  for (const key of COUNT_KEYS) state.counts[key] = toCount(parsed.counts?.[key])
  state.link.downs = toCount(parsed.link?.downs)
  state.link.recovers = toCount(parsed.link?.recovers)
  state.link.probes = toCount(parsed.link?.probes)
  state.link.offline = toCount(parsed.link?.offline)
  state.link.lastDownAt = toTime(parsed.link?.lastDownAt)
  const recoverMs = Array.isArray(parsed.link?.recoverMs) ? parsed.link.recoverMs : []
  state.link.recoverMs = recoverMs
    .slice(-PROBE_MAX_RECOVER_SAMPLES)
    .map((value) => toCount(value, 600_000))
  state.perf.frames = toCount(parsed.perf?.frames)
  state.perf.slowFrames = Math.min(state.perf.frames, toCount(parsed.perf?.slowFrames))
  state.anchors.checked = toCount(parsed.anchors?.checked, 1_000_000)
  const missing = parsed.anchors?.missing
  if (missing !== null && typeof missing === 'object' && !Array.isArray(missing)) {
    for (const [frag, n] of Object.entries(missing).slice(0, PROBE_MAX_MISSING)) {
      const key = probeText(frag, 64)
      const count = toCount(n, 1_000_000)
      if (key !== '' && /^[\w-]+$/.test(key) && count > 0) state.anchors.missing[key] = count
    }
  }
  state.freezeMaxMs = toCount(parsed.freezeMaxMs, 600_000)
  const samples = Array.isArray(parsed.samples) ? parsed.samples : []
  for (const sample of samples.slice(0, PROBE_MAX_ERROR_SAMPLES)) {
    const text = probeText(sample?.text, PROBE_MAX_TEXT)
    if (text === '') continue
    state.samples.push({ kind: sample?.kind === 'rejection' ? 'rejection' : 'error', text })
  }
  return state
}

/** 宿主侧校验：白名单重建。非法包返回 null（端点回 accepted:false，不写盘）。 */
export function normalizePacket(raw) {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return null
  if (Number(raw.v) !== PROBE_VERSION) return null
  const since = toTime(raw.since)
  const now = toTime(raw.now)
  if (since === 0 || now === 0 || now < since) return null
  if (now - since > MAX_SPAN_MS) return null

  const surfaces = {}
  for (const key of PROBE_SURFACES) surfaces[key] = toCount(raw.surfaces?.[key], MAX_SPAN_MS)
  const clicks = {}
  for (const key of PROBE_CLICK_AREAS) clicks[key] = toCount(raw.clicks?.[key])
  const counts = {}
  for (const key of COUNT_KEYS) counts[key] = toCount(raw.counts?.[key])

  const rawRecover = Array.isArray(raw.link?.recoverMs) ? raw.link.recoverMs : []
  const recoverMs = rawRecover.slice(-PROBE_MAX_RECOVER_SAMPLES).map((value) => toCount(value, 600_000))

  const missing = {}
  const rawMissing = raw.anchors?.missing
  if (rawMissing !== null && typeof rawMissing === 'object' && !Array.isArray(rawMissing)) {
    for (const [frag, n] of Object.entries(rawMissing).slice(0, PROBE_MAX_MISSING)) {
      const key = probeText(frag, 64)
      const count = toCount(n, 1_000_000)
      if (key !== '' && /^[\w-]+$/.test(key) && count > 0) missing[key] = count
    }
  }

  const frames = toCount(raw.perf?.frames)
  const samples = []
  const rawSamples = Array.isArray(raw.samples) ? raw.samples : []
  for (const sample of rawSamples.slice(0, PROBE_MAX_ERROR_SAMPLES)) {
    const text = probeText(sample?.text, PROBE_MAX_TEXT)
    if (text === '') continue
    samples.push({ kind: sample?.kind === 'rejection' ? 'rejection' : 'error', text })
  }

  const packet = {
    v: PROBE_VERSION,
    since,
    now,
    env: normalizeEnv(raw.env),
    surfaces,
    clicks,
    counts,
    link: {
      downs: toCount(raw.link?.downs),
      recovers: toCount(raw.link?.recovers),
      probes: toCount(raw.link?.probes),
      offline: toCount(raw.link?.offline),
      recoverMs,
      lastDownAt: toTime(raw.link?.lastDownAt),
    },
    perf: { frames, slowFrames: Math.min(frames, toCount(raw.perf?.slowFrames)) },
    anchors: { checked: toCount(raw.anchors?.checked, 1_000_000), missing },
    freezeMaxMs: toCount(raw.freezeMaxMs, 600_000),
    samples,
  }
  if (packetBytes(packet) > PROBE_MAX_PACKET_BYTES) return null
  return packet
}

export function packetBytes(packet) {
  try {
    return JSON.stringify(packet).length
  } catch {
    return Number.POSITIVE_INFINITY
  }
}
