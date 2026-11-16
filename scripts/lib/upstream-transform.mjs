import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
// dsh-web-mobile 镜像期变换。
//
// vendor/ 里的上游代码要变成 client/mobile/upstream/ 里的可用代码，需要三条确定性
// 变换。它们和 vendored 快照一起构成「派生基线」，所以必须进仓库：
//   T0 换行归一化：全部文本文件统一成 LF（见 transformSource）。
//   T1 locale NS 去撞车：上游 v3.1.0 起注册 dshWebMobileNav 家族；vendored 副本改名
//      pocketMobileNav，否则与独立安装的 dsh-web-mobile 重复注册，locale.register
//      抛错 → 手机端整页起不来（上游 #162 / d917a77 同款防护）。legacy 'mobileNav'
//      只替换带引号形态：裸串会误伤 dataset.mobileNav 这类 kebab 钩子。
//   T2 stats 让位：含 [data-mobile-nav="stats"] 的选择器项前缀
//      body:not([data-pocket-stats="off"])，让设置页的「隐藏统计条」生效。前缀必须落在
//      选择器项首——复合链中段插入 body 永不匹配（2026-10-14 审查实测三处静默失效）。

export const TRANSFORM_VERSION = 2

const NS_FROM = 'dshWebMobileNav'
const NS_TO = 'pocketMobileNav'
const BACKTICK = String.fromCharCode(96)
const STATS = '[data-mobile-nav="stats"]'
const GUARD = 'body:not([data-pocket-stats="off"]) '

const isScript = (relPath) => /\.(ts|tsx)$/.test(relPath)
const isCssModule = (relPath) => /\.css\.ts$/.test(relPath)
const isText = (relPath) => /\.(ts|tsx|css|md|json|html)$/.test(relPath)

// 单个文件的三条变换；非文本文件原样返回。
// T0 换行归一化：上游 blob 里混着 CRLF，Windows 检出也会带回 CRLF。补丁按行比对，
//    两端换行不一致会把整文件写成「全删全加」，上游一升级就再也打不上。
export function transformSource(relPath, source) {
  if (!isText(relPath)) return source
  const normalized = source.replaceAll('\r\n', '\n').replaceAll('\r', '\n')
  if (!isScript(relPath)) return normalized
  const renamed = normalized
    .replaceAll(NS_FROM, NS_TO)
    .replaceAll("'mobileNav'", "'pocketMobileNav'")
    .replaceAll(BACKTICK + 'mobileNav' + BACKTICK, BACKTICK + 'pocketMobileNav' + BACKTICK)
  return isCssModule(relPath) ? prefixStatsGuard(renamed) : renamed
}

// 逐行处理：只碰选择器行（以 { 或 , 收尾），注释行与声明行不动。
function prefixStatsGuard(source) {
  return source.split('\n').map((line) => {
    if (!line.includes(STATS)) return line
    if (/^\s*(\*|\/\*)/.test(line)) return line
    const match = /^(\s*)([^{}]*?)([,{])[ \t]*$/.exec(line)
    if (match === null) return line
    const items = match[2].split(',').map((item) => {
      const trimmed = item.trim()
      if (!trimmed.includes(STATS)) return item
      if (trimmed.startsWith(GUARD.trim())) return item
      return item.replace(trimmed, GUARD + trimmed)
    })
    return match[1] + items.join(',') + match[3]
  }).join('\n')
}

// 就地变换整棵树；返回被改写的文件数。
export function transformTree(dir) {
  let changed = 0
  const walk = (current) => {
    for (const entry of readdirSync(current)) {
      const path = join(current, entry)
      if (statSync(path).isDirectory()) { walk(path); continue }
      if (!isText(entry)) continue
      const before = readFileSync(path, 'utf8')
      const after = transformSource(entry, before)
      if (after !== before) { writeFileSync(path, after); changed++ }
    }
  }
  walk(dir)
  return changed
}

// 变换后的两条不变量：不允许残留上游 NS 前缀；stats 让位 guard 不允许落在复合链中段。
export function assertTransformedTree(dir) {
  const problems = []
  walkFiles(dir, (path, rel) => {
    if (!isText(rel)) return
    const text = readFileSync(path, 'utf8')
    if (text.includes('\r')) problems.push(rel + ': 残留 CRLF（补丁按行比对，换行必须统一）')
    if (isScript(rel) && text.includes(NS_FROM)) problems.push(rel + ': 残留 ' + NS_FROM)
    if (isCssModule(rel) && /\][ \t]*body:not\(\[data-pocket-stats="off"\]\)/.test(text)) {
      problems.push(rel + ': stats 让位 guard 落在选择器链中段（永不匹配）')
    }
  })
  if (problems.length > 0) throw new Error('镜像期变换不变量被破坏：\n  ' + problems.join('\n  '))
  return true
}

function walkFiles(dir, visit, base = dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) { walkFiles(path, visit, base); continue }
    visit(path, relative(base, path).split(sep).join('/'))
  }
}
