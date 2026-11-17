/**
 * 锚点台账的生成器：把「手机层源码里实际用到的 [class*=...] 片段」与
 * 「宿主真实类名 fixture」对表，算出每个锚点的现状，渲染成 client/mobile/anchors.ts。
 *
 * 为什么是「生成」而不是手写清单：清单一旦可以手写就会与源码漂移，而漂移过的清单比
 * 没有清单更糟（它给人已经核过的错觉）。test/anchors-contract.test.js 断言
 * 「磁盘上的 anchors.ts == 现算的渲染结果」，于是：
 *   · 源码里新加锚点 → 测试红，提示重新生成并复核存活性；
 *   · 宿主 fixture 更新 → 测试红，diff 里直接看出哪些锚点从 host 掉进了 legacy；
 *   · 手改 anchors.ts → 测试红（生成的产物不接受手改）。
 *
 * 台账同时记每个锚点的落点（usedIn），并按源码文件分组导出 ANCHOR_AREAS：
 * 宿主换版后先看哪个模块整片掉进 legacy，再决定是补选择器还是删规则。
 */

import { readdirSync, readFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const SOURCE_FILE = /\.(?:css|ts|tsx|js|jsx|mjs)$/
// 构建产物不是源码：client/client.js 与 client/client.mobile.js 由 client/build.mjs 产出，
// 里面的锚点全都来自源文件，重复统计只会让台账虚涨。
const BUILD_ARTIFACTS = new Set(['client.js', 'client.mobile.js'])

// 注释掉的选择器不生效，算进台账只会让账虚涨（core/css-rules.ts 里的 '…' 占位符就是这么混进来的）。
export function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\n)[ \t]*\/\/[^\n]*/g, '$1')
}

// [class*="frag"]（也接受 ^= / $= / |= / ~= 与去引号写法）。
const ANCHOR = /\[class\s*[*^$|~]?=\s*["']?([^"'\]]+?)["']?\s*\]/g

// 台账里的路径一律相对 client/，跨平台统一用 /，这样 Windows 与 CI 渲染出同一份字节。
function toClientPath(root, path) {
  return relative(join(root, 'client'), path).split(sep).join('/')
}

// 遍历 client/ 下的源码文件（跳过 node_modules 与构建产物）。
function walkSources(root, visit) {
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'node_modules') continue
      const path = join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(path)
        continue
      }
      if (!SOURCE_FILE.test(entry.name) || BUILD_ARTIFACTS.has(entry.name)) continue
      visit(path)
    }
  }
  walk(join(root, 'client'))
}

/** client/ 下的全部源码文件绝对路径（字典序）——改名脚本与台账共用同一份口径。 */
export function listSourceFiles(root) {
  const files = []
  walkSources(root, (path) => files.push(path))
  return files.sort()
}

/**
 * 每个锚点在源码里的落点：fragment -> Map<相对 client/ 的路径, 命中次数>。
 * 注释里的锚点不算——它们不产生选择器。
 */
export function collectSourceSites(root) {
  const sites = new Map()
  walkSources(root, (path) => {
    const text = stripComments(readFileSync(path, 'utf8'))
    for (const m of text.matchAll(ANCHOR)) {
      let files = sites.get(m[1])
      if (!files) sites.set(m[1], (files = new Map()))
      const rel = toClientPath(root, path)
      files.set(rel, (files.get(rel) ?? 0) + 1)
    }
  })
  return sites
}

/** 收集 client/ 下所有源码文件里的 [class*=...] 片段（去重，字典序）。 */
export function collectSourceAnchors(root) {
  return [...collectSourceSites(root).keys()].sort()
}

// 第三方插件的类名：这套锚点坐在别人的 DOM 上，本机没装该插件就无法实证，只能登记来源。
// 依据是 compat.css.ts / misc.css.ts 的分节横幅（每节都写明了服务哪个插件）。
const EXTERNAL_FAMILIES = [
  [/^dsfv[-_]/, 'dsh-file-viewer'],
  [/^(?:irow|irowActions|irowTrailing)$/, 'dsh-web-ui 已安装列表'],
  [
    /^_?(?:treeRow|treeArrow|treeArrowEmpty|panelCollapse|searchBox|searchInline|panelToggle|panelBadge|panelChevron|sprite|byline|float|viewport_|columns|textDocument|timeEnd|headerHidden|triggerIcon|customInput|customTextarea|tabScroll|tabBar|tabBarRight|tabBtn|tabBtnActive|boardHeader|opPanel|statsRow|tabSearch|tabSearchRow|cardShot|cardShots)$/,
    'dsh-web-ui explorer/preview',
  ],
]

const HASH_PREFIXED = /^_?([A-Za-z0-9-]{3,12})_(.+)$/

/**
 * 一个锚点的现状。
 *
 * 判活用 includes —— 与 CSS 里 [class*="frag"] 的语义严格一致。任何更严格的判断（相等、
 * 正则边界）都会把真实命中的锚点判成死，那是比漏判更坏的假死：它会把 6900 行 CSS 里仍
 * 有效的老规则一起删掉。
 */
export function classifyAnchor(fragment, hashed) {
  if (hashed.some((name) => name.includes(fragment))) {
    // 三个字符以内的片段（_add / _dot / _row / nm）任何宿主类名都可能命中：算活着，
    // 但「命中」证明不了语义，标出来免得后人把它当可靠锚点用。
    return fragment.replace(/^_/, '').length <= 3
      ? { status: 'host', note: '≤3 字符：本体过泛，命中不代表语义有效' }
      : { status: 'host' }
  }
  for (const [pattern, plugin] of EXTERNAL_FAMILIES) {
    if (pattern.test(fragment)) return { status: 'external', note: plugin + '（本机未安装，无法实证）' }
  }
  const m = HASH_PREFIXED.exec(fragment)
  if (!m) return { status: 'legacy', note: '旧宿主片段：现行宿主已无' }
  const local = m[2]
  const suffix = '_' + local
  // 前缀要像构建哈希（含大写/数字/连字符，且不短于 4）。纯小写三字母的前缀
  // 多半是从别的标识符里蹭出来的（实测 '_table' 会配到 'get'），写进台账只会误导。
  const prefixes = [
    ...new Set(
      hashed
        .filter((name) => name.endsWith(suffix))
        .map((name) => name.slice(0, -suffix.length))
        .filter((prefix) => prefix.length >= 4 && /[A-Z0-9-]/.test(prefix)),
    ),
  ]
  return {
    status: 'legacy',
    note: prefixes.length
      ? '旧宿主哈希族；现行同类名前缀：' + prefixes.slice(0, 2).join(' / ')
      : '旧宿主哈希族；现行宿主已无同名片段',
  }
}

/** 把源码锚点 + 宿主 fixture 算成台账行（按片段字典序）。 */
export function buildRegistry(root, fixture) {
  const sites = collectSourceSites(root)
  return [...sites.keys()]
    .sort()
    .map((fragment) => ({
      fragment,
      ...classifyAnchor(fragment, fixture.hashed),
      usedIn: [...sites.get(fragment).keys()].sort(),
    }))
}

/**
 * 把一个锚点片段改名：只动 [class*=...] 选择器里的那个片段，普通文本不受影响。
 * 返回 { text, count }；count 是命中的选择器个数（注释里的选择器也算——它们要和
 * 真实选择器一起改，否则后来的读者会照着注释写回旧名字）。
 */
export function replaceAnchorLiterals(source, from, to) {
  let count = 0
  const text = source.replace(new RegExp(ANCHOR.source, 'g'), (whole, fragment) => {
    if (fragment !== from) return whole
    count += 1
    return whole.replace(fragment, to)
  })
  return { text, count }
}

function literal(text) {
  return "'" + text.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"
}

/** 锚点现状的控制台报告（测试与 scripts/anchor-report.mjs 共用）。 */
export function formatAnchorReport(rows) {
  const counts = { host: 0, legacy: 0, external: 0 }
  for (const row of rows) counts[row.status] += 1
  const lines = [
    '锚点台账：' + rows.length + ' 个（' + counts.host + ' host / ' + counts.legacy + ' legacy / ' + counts.external + ' external）',
  ]
  for (const status of ['legacy', 'external']) {
    const list = rows.filter((row) => row.status === status)
    if (!list.length) continue
    lines.push('', status + '（' + list.length + '）：')
    for (const row of list) {
      lines.push('  ' + row.fragment + (row.note ? ' — ' + row.note : '') + (row.usedIn?.length ? '  [' + row.usedIn.join(', ') + ']' : ''))
    }
  }
  const vague = rows.filter((row) => row.status === 'host' && row.note)
  if (vague.length) {
    lines.push('', 'host 但过泛（命中不代表语义有效）：')
    for (const row of vague) lines.push('  ' + row.fragment + ' — ' + row.note)
  }
  return lines.join('\n')
}

/** 渲染 client/mobile/anchors.ts 全文。改这里的排版等于改契约测试的期望值。 */
export function renderRegistry(rows) {
  const counts = { host: 0, legacy: 0, external: 0 }
  for (const row of rows) counts[row.status] += 1
  const entries = rows
    .map((row) => {
      const usedIn =
        row.usedIn && row.usedIn.length > 1 ? ', usedIn: [' + row.usedIn.map(literal).join(', ') + ']' : ''
      return (
        '  { fragment: ' +
        literal(row.fragment) +
        ', status: ' +
        literal(row.status) +
        (row.note ? ', note: ' + literal(row.note) : '') +
        usedIn +
        ' },'
      )
    })
    .join('\n')

  const areas = new Map()
  for (const row of rows) {
    for (const file of row.usedIn ?? []) {
      let fragments = areas.get(file)
      if (!fragments) areas.set(file, (fragments = []))
      fragments.push(row.fragment)
    }
  }
  const areaEntries = [...areas.keys()]
    .sort()
    .map((file) =>
      [
        '  ' + literal(file) + ': [',
        ...[...areas.get(file)].sort().map((fragment) => '    ' + literal(fragment) + ','),
        '  ],',
      ].join('\n'),
    )
    .join('\n')

  return [
    '/**',
    ' * 手机层 [class*=...] 锚点的单一台账，由 scripts/gen-anchors.mjs 生成 —— 不要手改。',
    ' *',
    ' * 为什么要有台账：宿主的类名是 CSS Modules 产物 <buildHash>_<localName>，哈希每次',
    ' * 发版都可能换代（3.0.x 期间 an3WzG_ / mP3x-q_ / wSkVaW_ 几族同时在场）。手机层靠',
    ' * [class*="frag"] 子串去抓它们，于是「宿主换版 → 锚点静默失效 → 整块样式消失」是本插件',
    ' * 最贵、也最难在真机上定位的一类故障 —— 而 6900 行 CSS 里原本没有任何机器可读的探测。',
    ' *',
    ' * 台账把每个锚点的现状钉下来（口径见 AnchorStatus），并记下它落在哪些源码文件（usedIn /',
    ' * ANCHOR_AREAS）。新增锚点必须重新生成，否则 test/anchors-contract.test.js 红；',
    ' * 宿主升级后按这个顺序走：',
    ' *   npm run anchors:dump    # 重抽宿主真实类名 -> test/fixtures/host-classes.json',
    ' *   npm run anchors:gen     # 重算台账 -> client/mobile/anchors.ts（diff 里看谁掉进 legacy）',
    ' *   npm run anchors:report  # 控制台列出 legacy / external 及其落点，triage 用',
    ' *   npm run test:anchors    # 用装在本机的 DSH Desktop（app.asar）现抽一遍并逐条核活',
    ' * 宿主把某个 localName 改了名（片段整体换词）时，用 npm run anchors:rename -- <旧> <新>',
    ' * 一次改全仓（默认只打印，加 --apply 才写盘并重算台账）。',
    ' */',
    '',
    '/** 锚点现状。 */',
    'export type AnchorStatus =',
    '  /** 现行宿主里能找到（fixture.hashed 中存在包含该片段的类名）。 */',
    "  | 'host'",
    '  /** 旧宿主世代的哈希族：现行宿主已无该片段，保留只为兜还在跑旧宿主的用户。 */',
    "  | 'legacy'",
    '  /** 第三方插件的类名（dsh-web-ui / dsh-file-viewer 等）：本机没装就不算失效。 */',
    "  | 'external'",
    '',
    'export interface AnchorRecord {',
    '  /** [class*=...] 里的片段。 */',
    '  readonly fragment: string',
    '  readonly status: AnchorStatus',
    '  /** 为什么是这个状态；host 一般不写。 */',
    '  readonly note?: string',
    '  /** 用到该锚点的源码文件（相对 client/）；只在跨多个文件时写进台账，全量见 ANCHOR_AREAS。 */',
    '  readonly usedIn?: readonly string[]',
    '}',
    '',
    '/**',
    ' * 全部锚点，按片段字典序。现状快照：' + counts.host + ' host / ' + counts.legacy + ' legacy / ' + counts.external + ' external。',
    ' */',
    'export const ANCHORS: readonly AnchorRecord[] = [',
    entries,
    ']',
    '',
    '/** 按状态取锚点片段。 */',
    'export function anchorsWithStatus(status: AnchorStatus): string[] {',
    '  return ANCHORS.filter((a) => a.status === status).map((a) => a.fragment)',
    '}',
    '',
    '/**',
    ' * 锚点按「用到它的源码文件」分组（同一个锚点可能出现在多个文件里）。',
    ' * 宿主换版后先看这里：某个模块的锚点整片掉进 legacy，通常意味着那块 DOM 被重构了。',
    ' */',
    'export const ANCHOR_AREAS: Readonly<Record<string, readonly string[]>> = {',
    areaEntries,
    '}',
    '',
  ].join('\n')
}

/** 读 test/fixtures/host-classes.json。 */
export function readFixture(root) {
  return JSON.parse(readFileSync(join(root, 'test/fixtures/host-classes.json'), 'utf8'))
}

/** 台账行 + 渲染结果，测试与 CLI 共用。 */
export function renderFromDisk(root) {
  return renderRegistry(buildRegistry(root, readFixture(root)))
}
