#!/usr/bin/env node
/**
 * 重新生成 client/mobile/anchors.ts（锚点台账）。
 *
 * 触点：client/ 下任何新增/删除 [class*=...] 锚点、或 test/fixtures/host-classes.json
 * 更新（宿主升级）之后都要跑一次，然后复核 diff 里从 host 掉进 legacy 的条目。
 * 用法：node scripts/gen-anchors.mjs [--check]
 *   --check 只比对不写盘（测试里走的就是这条，用来在 CI 上抓「忘了重新生成」）。
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { buildRegistry, readFixture, renderRegistry } from './anchors.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const target = join(root, 'client/mobile/anchors.ts')
const rendered = renderRegistry(buildRegistry(root, readFixture(root)))

if (process.argv.includes('--check')) {
  const current = readFileSync(target, 'utf8')
  if (current !== rendered) {
    console.error('client/mobile/anchors.ts 已过期：请运行 npm run anchors:gen 后复核 diff。')
    process.exit(1)
  }
  console.log('anchors.ts 与源码一致。')
} else {
  writeFileSync(target, rendered)
  const counts = { host: 0, legacy: 0, external: 0 }
  for (const row of buildRegistry(root, readFixture(root))) counts[row.status] += 1
  console.log('已写入 client/mobile/anchors.ts：' + counts.host + ' host / ' + counts.legacy + ' legacy / ' + counts.external + ' external')
}
