// 锚点台账契约（2026-11-12 终局评审 Phase 0）。
//
// 手机层的 6900 行 CSS 里有 170 个 [class*="..."] 片段（以台账快照为准），指向宿主 CSS Modules 的哈希
// 类名（形如 an3WzG_composerSeat）。宿主换代时这些片段会**静默**失效：样式整块消失，
// 而构建、类型检查、真机冒烟都不会报——这正是本项目最贵的一类故障。台账把「源码里的
// 锚点 × 宿主真实类名快照 × 各自的落点」算成一份可读的现状表（client/mobile/anchors.ts），
// 这组断言把「台账 == 重算结果」钉住：
//   · 源码新增/删除锚点却没重新生成台账 → 红；
//   · 宿主快照（test/fixtures/host-classes.json）更新后没刷新台账 → 红；
//   · 有人手改台账 → 红；
//   · ANCHOR_AREAS 与「锚点实际落在哪些文件」对不上 → 红。
// 重新生成走 npm run anchors:gen；宿主升级后先 npm run anchors:dump 再 gen，
// 然后用 npm run anchors:report 看 legacy / external 明细。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import {
  buildRegistry,
  collectSourceAnchors,
  collectSourceSites,
  formatAnchorReport,
  readFixture,
  renderRegistry,
  replaceAnchorLiterals,
} from '../scripts/anchors.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const ledger = () => readFileSync(join(root, 'client', 'mobile', 'anchors.ts'), 'utf8')
const rows = () => buildRegistry(root, readFixture(root))

test('anchors.ts 与「源码锚点 × 宿主快照」的重算结果逐字节一致', () => {
  assert.equal(ledger(), renderRegistry(rows()), '台账已过期：运行 npm run anchors:gen，然后复核 diff 里掉进 legacy 的锚点')
})

test('台账里的锚点集合就是源码里的锚点集合（不多不少）', () => {
  const fromDisk = new Set(
    [...ledger().matchAll(/^  \{ fragment: '([^']+)', status: '/gm)].map((m) => m[1]),
  )
  const fromSource = new Set(collectSourceAnchors(root))
  assert.deepEqual([...fromDisk].sort(), [...fromSource].sort())
})

test('每个锚点只登记一次，片段非空且不含空白', () => {
  const list = rows()
  assert.equal(new Set(list.map((r) => r.fragment)).size, list.length)
  for (const row of list) {
    assert.ok(row.fragment.length > 0, '空片段会匹配任何类名')
    assert.doesNotMatch(row.fragment, /\s/, '片段里的空白说明正则抓错了东西: ' + row.fragment)
  }
})

test('状态取值限 host / legacy / external，且每类都有', () => {
  const allowed = new Set(['host', 'legacy', 'external'])
  const counts = { host: 0, legacy: 0, external: 0 }
  for (const row of rows()) {
    assert.ok(allowed.has(row.status), '未知状态: ' + row.status)
    counts[row.status] += 1
  }
  // 三类同时在册是健康信号：全成 legacy 说明快照坏了或宿主真的大换代，
  // 全成 host 说明外部插件族被误判成了宿主锚点。
  for (const status of allowed) assert.ok(counts[status] > 0, status + ' 类锚点为空')
})

test('judged-live 的锚点确实能在快照里命中（不是靠状态字段自证）', () => {
  const hashed = readFixture(root).hashed
  for (const row of rows()) {
    if (row.status !== 'host') continue
    assert.ok(
      hashed.some((name) => name.includes(row.fragment)),
      'host 锚点在快照里找不到: ' + row.fragment,
    )
  }
})

test('legacy 与 external 锚点都写明理由，过泛的短锚点加标注', () => {
  for (const row of rows()) {
    if (row.status !== 'host') assert.ok(row.note, row.fragment + ' 缺少状态说明')
    if (row.status === 'host' && row.fragment.replace(/^_/, '').length <= 3) {
      assert.match(row.note ?? '', /过泛/, row.fragment + ' 太短，没被标成过泛锚点')
    }
  }
})

test('宿主类名快照是本口径的产物，且规模合理', () => {
  const fixture = readFixture(root)
  assert.equal(fixture.meta.sampling, 'selector-position/v1', '快照口径变了，台账要整体复核')
  assert.equal(fixture.meta.hashedCount, fixture.hashed.length)
  assert.equal(new Set(fixture.hashed).size, fixture.hashed.length)
  // 下限是防呆：空快照会让所有锚点判死，而 182 个死锚点看起来和「宿主大换代」一样。
  assert.ok(fixture.hashed.length > 1000, '快照里的宿主类名太少: ' + fixture.hashed.length)
  for (const name of fixture.hashed) assert.match(name, /^[A-Za-z0-9][A-Za-z0-9-]*_[A-Za-z][\w-]*$/)
})

// 解析台账里的 ANCHOR_AREAS（生成的排版固定：两空格键、四空格片段、两空格 "]")。
function parseAreas(text) {
  const start = text.indexOf('export const ANCHOR_AREAS')
  assert.ok(start !== -1, '台账里应有 ANCHOR_AREAS 分组')
  const block = text.slice(start, text.indexOf('\n}', start))
  const areas = new Map()
  let current = null
  for (const line of block.split('\n')) {
    const key = /^  '([^']+)': \[$/.exec(line)
    if (key) {
      current = key[1]
      areas.set(current, [])
      continue
    }
    const item = /^    '([^']+)',$/.exec(line)
    if (item) {
      assert.ok(current, '片段行出现在分组之外: ' + line)
      areas.get(current).push(item[1])
      continue
    }
    if (/^  \],$/.test(line)) current = null
  }
  return areas
}

test('ANCHOR_AREAS 与「锚点实际落在哪些文件」一致（分组可用于宿主升级后的 triage）', () => {
  const expected = new Map()
  for (const [fragment, files] of collectSourceSites(root)) {
    for (const file of files.keys()) {
      if (!expected.has(file)) expected.set(file, [])
      expected.get(file).push(fragment)
    }
  }
  const actual = parseAreas(ledger())
  assert.deepEqual([...actual.keys()].sort(), [...expected.keys()].sort(), '分组文件集合与源码不一致')
  for (const file of expected.keys()) {
    assert.deepEqual([...actual.get(file)].sort(), expected.get(file).sort(), '分组内容与源码不一致: ' + file)
  }
})

test('ANCHOR_AREAS 里的文件都存在，且每个锚点至少出现在一个分组里', () => {
  const areas = parseAreas(ledger())
  const seen = new Set()
  for (const [file, fragments] of areas) {
    assert.ok(existsSync(join(root, 'client', file)), '分组里的文件不存在（台账过期？）: ' + file)
    assert.ok(fragments.length > 0, '空分组: ' + file)
    for (const fragment of fragments) seen.add(fragment)
  }
  assert.deepEqual([...seen].sort(), collectSourceAnchors(root))
})

test('replaceAnchorLiterals 只改指定片段（含去引号写法），且统计命中数', () => {
  const source = '[class*="_seat"] [class*="_seatInner"] [class*=_seat] [class*="an3WzG_seat"]'
  const { text, count } = replaceAnchorLiterals(source, '_seat', '_composerSeat')
  assert.equal(count, 2, '带前缀的 an3WzG_seat 不是同一个片段，不该被算进来')
  assert.ok(text.includes('[class*="_composerSeat"]'))
  assert.ok(text.includes('[class*=_composerSeat]'))
  assert.ok(text.includes('[class*="_seatInner"]'), '更长的片段不能被短片段改名连带改掉')
  assert.ok(text.includes('[class*="an3WzG_seat"]'))
  // 普通文案不受影响
  const prose = 'seat 这个词在说明里出现时不该变'
  assert.equal(replaceAnchorLiterals(prose, '_seat', '_x').count, 0)
})

test('formatAnchorReport 列出 legacy / external 明细与落点', () => {
  const report = formatAnchorReport([
    { fragment: '_seat', status: 'host', usedIn: ['mobile/a.ts'] },
    { fragment: 'old_row', status: 'legacy', note: '旧宿主片段', usedIn: ['mobile/b.ts', 'mobile/c.ts'] },
    { fragment: 'dsfv-panel', status: 'external', note: 'dsh-file-viewer（本机未安装，无法实证）' },
  ])
  assert.match(report, /3 个（1 host \/ 1 legacy \/ 1 external）/)
  assert.match(report, /old_row — 旧宿主片段/)
  assert.match(report, /mobile\/b\.ts, mobile\/c\.ts/)
  assert.match(report, /dsfv-panel/)
})
