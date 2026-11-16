#!/usr/bin/env node
// 使用探针报告（评审 §7.1）：读 $DSH_HOME/dsh-pocket/probe.jsonl，回答「手机上 80%
// 的时间在做什么」，并给出 Phase 2 的路线判定（轻量视图 / 保留宿主 UI / 数据还不够）。
//
// 用法：
//   node scripts/probe-report.mjs                 # 最近 7 天，人读报告
//   node scripts/probe-report.mjs --days 3        # 最近 3 天
//   node scripts/probe-report.mjs --json          # 机器可读
//   node scripts/probe-report.mjs --file D:\\x.jsonl
//
// 采集侧在 client/mobile/mobile-apply.tsx、落盘侧在 lib/probe.mjs；本脚本只读文件，
// 不做任何网络请求。判定阈值集中在 JUDGE 里，换了口径可以直接改。
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { probePath } from '../lib/probe.mjs'

/** 判定阈值：一屏一句话能讲清「为什么是这个结论」。 */
export const JUDGE = Object.freeze({
  /** 看 + 批 + 发 占到这么多时间，说明手机上主要是「轻交互」，独立轻量视图够用。 */
  lightweightShare: 0.8,
  /** 文件 + 设置占到这么多时间，说明宿主 UI 里那些复杂面板不可替代。 */
  panelsShare: 0.25,
  /** 文件 + 设置入口日均点击达到这么多次，同样说明面板在用。 */
  panelsClicksPerDay: 5,
  /** 断线恢复 p95 超过这个值，网络体验比界面更值得先修。 */
  slowRecoveryMs: 5000,
})

const DAY_MS = 24 * 60 * 60 * 1000

/** 解析 JSONL：坏行直接跳过（探针文件是追加写的，最后一行可能被截断）。 */
export function parsePackets(text) {
  const packets = []
  for (const line of String(text ?? '').split(/\r?\n/)) {
    const raw = line.trim()
    if (raw === '') continue
    try {
      const parsed = JSON.parse(raw)
      if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) packets.push(parsed)
    } catch { /* 截断行/坏行：跳过 */ }
  }
  return packets
}

/** 只保留窗口内的包（按包里的 now，而不是文件时间）。 */
export function withinDays(packets, days, now = Date.now()) {
  const span = Math.max(1, Number(days) || 7) * DAY_MS
  const since = now - span
  return packets.filter((packet) => Number(packet?.now) >= since)
}

export function percentile(values, p) {
  const list = Array.isArray(values) ? values.filter((v) => Number.isFinite(v) && v >= 0) : []
  if (list.length === 0) return 0
  const sorted = list.slice().sort((a, b) => a - b)
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1))
  return sorted[idx]
}

const num = (value) => (Number.isFinite(Number(value)) ? Number(value) : 0)

/** 把 N 个包合成一份统计；不做判定（判定在 judge 里，方便同一份数据换口径重算）。 */
export function aggregate(packets) {
  const acc = {
    packets: 0,
    firstAt: 0,
    lastAt: 0,
    days: new Set(),
    standalone: 0,
    browser: 0,
    fullscreen: 0,
    ios: {},
    hosts: {},
    displayModes: {},
    surfaces: { read: 0, type: 0, approve: 0, files: 0, settings: 0, other: 0 },
    clicks: {},
    counts: {},
    recoverMs: [],
    freezeMaxMs: 0,
    frames: 0,
    slowFrames: 0,
    anchorsChecked: 0,
    missing: {},
    samples: [],
    envSeen: 0,
  }
  for (const packet of Array.isArray(packets) ? packets : []) {
    if (packet === null || typeof packet !== 'object') continue
    acc.packets += 1
    const at = num(packet.now)
    if (at > 0) {
      acc.firstAt = acc.firstAt === 0 ? at : Math.min(acc.firstAt, at)
      acc.lastAt = Math.max(acc.lastAt, at)
      acc.days.add(new Date(at).toISOString().slice(0, 10))
    }
    const env = packet.env
    if (env !== null && typeof env === 'object') {
      acc.envSeen += 1
      if (env.standalone === true) acc.standalone += 1
      const mode = typeof env.displayMode === 'string' && env.displayMode !== '' ? env.displayMode : 'browser'
      acc.displayModes[mode] = (acc.displayModes[mode] ?? 0) + 1
      // standalone 与浏览器标签互斥：iOS 加到主屏幕后 display-mode 可能仍是 fullscreen，
      // 以显式的 env.standalone 为准，否则同一台机器会被同时计成两种形态。
      if (env.standalone !== true) acc.browser += 1
      if (mode === 'fullscreen') acc.fullscreen += 1
      if (typeof env.ios === 'string' && env.ios !== '') acc.ios[env.ios] = (acc.ios[env.ios] ?? 0) + 1
      if (typeof env.host === 'string' && env.host !== '') acc.hosts[env.host] = (acc.hosts[env.host] ?? 0) + 1
    }
    for (const key of Object.keys(acc.surfaces)) acc.surfaces[key] += num(packet.surfaces?.[key])
    for (const [area, n] of Object.entries(packet.clicks ?? {})) acc.clicks[area] = (acc.clicks[area] ?? 0) + num(n)
    for (const [key, n] of Object.entries(packet.counts ?? {})) acc.counts[key] = (acc.counts[key] ?? 0) + num(n)
    const link = packet.link ?? {}
    acc.counts.downs = (acc.counts.downs ?? 0) + num(link.downs)
    acc.counts.recovers = (acc.counts.recovers ?? 0) + num(link.recovers)
    acc.counts.probes = (acc.counts.probes ?? 0) + num(link.probes)
    acc.counts.offline = (acc.counts.offline ?? 0) + num(link.offline)
    for (const ms of Array.isArray(link.recoverMs) ? link.recoverMs : []) acc.recoverMs.push(num(ms))
    acc.freezeMaxMs = Math.max(acc.freezeMaxMs, num(packet.freezeMaxMs))
    acc.frames += num(packet.perf?.frames)
    acc.slowFrames += Math.min(num(packet.perf?.frames), num(packet.perf?.slowFrames))
    acc.anchorsChecked += num(packet.anchors?.checked)
    for (const [frag, n] of Object.entries(packet.anchors?.missing ?? {})) acc.missing[frag] = (acc.missing[frag] ?? 0) + num(n)
    for (const sample of Array.isArray(packet.samples) ? packet.samples : []) {
      if (acc.samples.length >= 20) break
      if (sample !== null && typeof sample === 'object' && typeof sample.text === 'string') {
        acc.samples.push({ kind: sample.kind === 'rejection' ? 'rejection' : 'error', text: sample.text })
      }
    }
  }
  return acc
}

const clamp01 = (value) => Math.min(1, Math.max(0, value))

/** 汇总 + 判定：报告与测试都从这里取结论。 */
export function summarize(packets, { days = 7, now = Date.now() } = {}) {
  const acc = aggregate(packets)
  const surfaceTotal = Object.values(acc.surfaces).reduce((sum, ms) => sum + ms, 0)
  const share = {}
  for (const [key, ms] of Object.entries(acc.surfaces)) share[key] = surfaceTotal === 0 ? 0 : clamp01(ms / surfaceTotal)
  const effectiveDays = Math.max(1, acc.days.size)
  const clicksPerDay = {}
  for (const [area, n] of Object.entries(acc.clicks)) clicksPerDay[area] = n / effectiveDays
  const panelsMs = acc.surfaces.files + acc.surfaces.settings
  const panelsShare = surfaceTotal === 0 ? 0 : panelsMs / surfaceTotal
  const lightweightShare = surfaceTotal === 0 ? 0 : (acc.surfaces.read + acc.surfaces.approve + acc.surfaces.type) / surfaceTotal
  const panelsClicksPerDay = (clicksPerDay.files ?? 0) + (clicksPerDay.settings ?? 0)
  const sends = acc.counts.sends ?? 0
  const chars = acc.counts.chars ?? 0
  const report = {
    window: { days, packets: acc.packets, spanDays: acc.days.size, firstAt: acc.firstAt, lastAt: acc.lastAt },
    env: {
      seen: acc.envSeen,
      standalone: acc.standalone,
      browser: acc.browser,
      fullscreen: acc.fullscreen,
      displayModes: acc.displayModes,
      ios: acc.ios,
      hosts: acc.hosts,
    },
    surfaces: { ms: acc.surfaces, totalMs: surfaceTotal, share },
    clicks: acc.clicks,
    clicksPerDay,
    counts: {
      ...acc.counts,
      sends,
      chars,
      charsPerSend: sends === 0 ? 0 : Math.round(chars / sends),
      sessionsPerDay: (acc.counts.sessions ?? 0) / effectiveDays,
    },
    link: {
      downs: acc.counts.downs ?? 0,
      recovers: acc.counts.recovers ?? 0,
      offline: acc.counts.offline ?? 0,
      probes: acc.counts.probes ?? 0,
      p50: percentile(acc.recoverMs, 50),
      p95: percentile(acc.recoverMs, 95),
      max: acc.recoverMs.length === 0 ? 0 : Math.max(...acc.recoverMs),
    },
    perf: {
      frames: acc.frames,
      slowFrames: acc.slowFrames,
      slowPct: acc.frames === 0 ? 0 : clamp01(acc.slowFrames / acc.frames),
    },
    anchors: {
      checked: acc.anchorsChecked,
      missing: Object.entries(acc.missing)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12)
        .map(([fragment, count]) => ({ fragment, count })),
    },
    freezeMaxMs: acc.freezeMaxMs,
    samples: acc.samples,
    lightweightShare,
    panelsShare,
    panelsClicksPerDay,
  }
  report.verdict = judge(report)
  return report
}

/** 判定：轻量视图 / 保留宿主 UI / 数据不足。 */
export function judge(report) {
  if (!report || report.window.packets === 0) {
    return {
      kind: 'no-data',
      headline: '还没有数据',
      text: '手机上打开一次 DSH（设置页「使用探针」开着）后，等 5 分钟再来跑这个脚本。',
    }
  }
  const notes = []
  if (report.link.p95 > JUDGE.slowRecoveryMs) {
    notes.push(`断线恢复 p95 = ${(report.link.p95 / 1000).toFixed(1)}s：链路体验比界面更值得先修。`)
  }
  if (report.perf.slowPct > 0.1) {
    notes.push(`滚动期慢帧 ${(report.perf.slowPct * 100).toFixed(1)}%：卡顿本身也是使用分布的一部分。`)
  }
  if (notes.length === 0) notes.push('链路与滚动质量没有明显异常。')

  if (report.panelsShare >= JUDGE.panelsShare || report.panelsClicksPerDay >= JUDGE.panelsClicksPerDay) {
    return {
      kind: 'host-ui',
      headline: '宿主 UI 仍不可替代',
      text: `文件/设置占 ${(report.panelsShare * 100).toFixed(1)}% 时间、日均点击 ${report.panelsClicksPerDay.toFixed(1)} 次：`
        + '手机端不只是「看+批+发」，独立轻量视图会把这些面板挡在外面。建议保留反代路线（B 的完整重写收益不足）。',
      notes,
    }
  }
  if (report.lightweightShare >= JUDGE.lightweightShare) {
    return {
      kind: 'lightweight',
      headline: '轻量视图够用',
      text: `看+批+发占 ${(report.lightweightShare * 100).toFixed(1)}% 时间，文件/设置日均点击 ${report.panelsClicksPerDay.toFixed(1)} 次：`
        + '手机端主要就是「看+批+发」。建议按评审 §7.1 做独立轻量视图探针（1–2 周、可丢弃），宿主 UI 保留为 fallback。',
      notes,
    }
  }
  return {
    kind: 'mixed',
    headline: '数据还不够，继续采',
    text: `看+批+发 ${(report.lightweightShare * 100).toFixed(1)}%、文件/设置 ${(report.panelsShare * 100).toFixed(1)}%：`
      + '两边都没到判定线。再采 2–3 天（尤其一个完整的工作日）后再看。',
    notes,
  }
}

const pct = (value) => `${(value * 100).toFixed(1)}%`

/** 时长人读：毫秒 → 1h 02m / 3m 12s / 12s。 */
export function fmtDuration(ms) {
  const total = Math.max(0, Math.round(Number(ms) / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`
  if (m > 0) return `${m}m ${String(s).padStart(2, '0')}s`
  return `${s}s`
}

const topEntries = (obj, limit = 5) => Object.entries(obj ?? {})
  .sort((a, b) => b[1] - a[1])
  .slice(0, limit)
  .map(([key, value]) => `${key} ×${value}`)

const SURFACE_LABELS = Object.freeze({
  read: '读消息',
  type: '打字/输入',
  approve: '审批',
  files: '文件面板',
  settings: '设置页',
  other: '其它',
})

/** 人读报告：先给结论，再给支撑数字。 */
export function renderReport(report) {
  const lines = []
  const { window: win } = report
  const from = win.firstAt === 0 ? '—' : new Date(win.firstAt).toLocaleString()
  const to = win.lastAt === 0 ? '—' : new Date(win.lastAt).toLocaleString()
  lines.push('dsh-pocket 使用探针报告')
  lines.push(`窗口：最近 ${report.window.days} 天 · ${win.packets} 个包 · 覆盖 ${win.spanDays} 天 · ${from} → ${to}`)
  lines.push('')
  lines.push(`判定：${report.verdict.headline}`)
  lines.push(`  ${report.verdict.text}`)
  for (const note of report.verdict.notes ?? []) lines.push(`  · ${note}`)
  lines.push('')
  const envTotal = report.env.seen || 1
  lines.push('环境')
  lines.push(`  PWA 独立窗口 ${pct(report.env.standalone / envTotal)} · 浏览器标签 ${pct(report.env.browser / envTotal)}`)
  if (Object.keys(report.env.displayModes).length > 0) lines.push(`  显示模式：${topEntries(report.env.displayModes).join(' · ')}`)
  if (Object.keys(report.env.ios).length > 0) lines.push(`  iOS：${topEntries(report.env.ios).join(' · ')}`)
  if (Object.keys(report.env.hosts).length > 0) lines.push(`  宿主版本：${topEntries(report.env.hosts).join(' · ')}`)
  lines.push('')
  lines.push(`时间去哪了（共 ${fmtDuration(report.surfaces.totalMs)}）`)
  for (const key of ['read', 'type', 'approve', 'files', 'settings', 'other']) {
    const ms = report.surfaces.ms[key] ?? 0
    lines.push(`  ${SURFACE_LABELS[key].padEnd(6, '　')} ${pct(report.surfaces.share[key] ?? 0).padStart(6)}  ${fmtDuration(ms)}`)
  }
  lines.push('')
  lines.push('点击落点（日均）')
  const areas = Object.entries(report.clicksPerDay).sort((a, b) => b[1] - a[1]).slice(0, 8)
  lines.push(areas.length === 0 ? '  还没有点击' : `  ${areas.map(([area, n]) => `${area} ${n.toFixed(1)}`).join(' · ')}`)
  lines.push('')
  lines.push('操作计数')
  lines.push(`  发送 ${report.counts.sends ?? 0} 条 · 键入 ${report.counts.chars ?? 0} 字（每条约 ${report.counts.charsPerSend} 字）· 会话切换日均 ${report.counts.sessionsPerDay.toFixed(1)} 次`)
  lines.push(`  审批面板出现 ${report.counts.approvals ?? 0} 次 · 滚动 ${Math.round((report.counts.scrollPx ?? 0) / 1000)}k px`)
  lines.push('')
  lines.push('链路')
  lines.push(`  断线 ${report.link.downs} 次 · 恢复 p50 ${fmtDuration(report.link.p50)} / p95 ${fmtDuration(report.link.p95)} / 最坏 ${fmtDuration(report.link.max)}`)
  lines.push(`  探活 ${report.link.probes} 次 · 离线事件 ${report.link.offline} 次`)
  lines.push('')
  lines.push('稳定性')
  lines.push(`  冻结 ${report.counts.freezes ?? 0} 次（最长 ${fmtDuration(report.freezeMaxMs)}）· bfcache 恢复 ${report.counts.bfcache ?? 0} 次 · 长任务 ${report.counts.longtasks ?? 0} 次`)
  lines.push(`  滚动期慢帧 ${pct(report.perf.slowPct)}（${report.perf.slowFrames}/${report.perf.frames} 帧）· 脚本错误 ${report.counts.errors ?? 0} 次 / Promise 拒绝 ${report.counts.rejections ?? 0} 次`)
  if (report.samples.length > 0) {
    lines.push('  最近错误：')
    for (const sample of report.samples.slice(0, 5)) lines.push(`    [${sample.kind}] ${sample.text}`)
  }
  lines.push('')
  lines.push(`锚点体检（宿主类名有没有失效）：${report.anchors.checked} 轮`)
  if (report.anchors.missing.length === 0) lines.push('  没有缺失片段')
  else for (const item of report.anchors.missing.slice(0, 8)) lines.push(`  ${item.fragment} ×${item.count}`)
  return lines.join('\n')
}

/** CLI 入口（被测试 import 时不执行）。 */
export function main(argv = process.argv.slice(2), io = { out: console.log, err: console.error }) {
  const args = { json: false, days: 7, file: null }
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--json') args.json = true
    else if (arg === '--days') { args.days = Number(argv[++i]) || 7 }
    else if (arg === '--file') { args.file = argv[++i] ?? null }
    else if (arg === '--help' || arg === '-h') {
      io.out('用法：node scripts/probe-report.mjs [--days 7] [--json] [--file <probe.jsonl>]')
      return 0
    } else {
      io.err(`未知参数：${arg}`)
      return 2
    }
  }
  const file = args.file ?? probePath()
  let text = ''
  try {
    text = readFileSync(file, 'utf8')
  } catch {
    io.err(`读不到探针文件：${file}（手机端还没上报过，或路径不对）`)
    return 1
  }
  const report = summarize(withinDays(parsePackets(text), args.days), { days: args.days })
  io.out(args.json ? JSON.stringify(report, null, 2) : renderReport(report))
  return 0
}

const invoked = process.argv[1] !== undefined && pathToFileURL(process.argv[1]).href === import.meta.url
if (invoked) process.exitCode = main()
