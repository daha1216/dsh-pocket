#!/usr/bin/env node
/**
 * 把一个 [class*="..."] 锚点片段在 client/ 源码里一次改全仓。
 *
 * 什么时候用：宿主把 CSS Modules 的 localName 改了名（信号是台账里整族锚点一起掉进
 * legacy，且新类名与旧类名只差词形），或者新锚点一开始就拼错。哈希换代不用跑这个——
 * 那是 [class*="frag"] 子串匹配天然扛住的，台账会自己把状态从 legacy 翻回 host。
 *
 * 改完自动重算 client/mobile/anchors.ts，契约测试保持绿；改完仍要跑全量测试，
 * 因为可能有 CSS 注释或 i18n 文案里也提到这个片段（本脚本会一并改）。
 *
 * 用法：node scripts/anchor-rename.mjs <旧片段> <新片段> [--apply]
 *   默认只打印将要改动的文件与命中数；--apply 才写盘。
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative } from 'node:path'
import {
  buildRegistry,
  listSourceFiles,
  readFixture,
  renderRegistry,
  replaceAnchorLiterals,
} from './anchors.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const apply = process.argv.includes('--apply')
const [from, to] = process.argv.slice(2).filter((arg) => !arg.startsWith('--'))

if (!from || !to || from === to) {
  console.error('用法：node scripts/anchor-rename.mjs <旧片段> <新片段> [--apply]')
  process.exit(2)
}
if (/[\s"'\[\]]/.test(from) || /[\s"'\[\]]/.test(to)) {
  console.error('片段里不能有空白、引号或方括号：' + JSON.stringify({ from, to }))
  process.exit(2)
}

let total = 0
const changed = []
for (const file of listSourceFiles(root)) {
  const { text, count } = replaceAnchorLiterals(readFileSync(file, 'utf8'), from, to)
  if (!count) continue
  changed.push([file, count])
  total += count
  if (apply) writeFileSync(file, text)
}

if (!total) {
  console.error('源码里没有 [class*="' + from + '"] 这个锚点。')
  process.exit(1)
}

for (const [file, count] of changed) console.log(relative(root, file) + '  ' + count + ' 处')
console.log((apply ? '已改写 ' : '将改写 ') + changed.length + ' 个文件的 ' + total + ' 处锚点')

if (apply) {
  writeFileSync(join(root, 'client/mobile/anchors.ts'), renderRegistry(buildRegistry(root, readFixture(root))))
  console.log('已重算 client/mobile/anchors.ts')
} else {
  console.log('未写盘：加 --apply 生效。')
}
