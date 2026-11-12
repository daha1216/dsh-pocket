#!/usr/bin/env node
/**
 * 打印锚点台账现状：总数、legacy / external 明细与各自的落点。
 *
 * 宿主升级后先跑 anchors:dump + anchors:gen，再跑这个把「谁掉了」摊开看：
 * legacy 的条目要么补一条更稳的选择器（优先 data-* / 结构选择器），要么确认样式
 * 已无用后删规则；external 的条目只在本机装了对应第三方插件时才有意义。
 *
 * 用法：node scripts/anchor-report.mjs
 */

import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { buildRegistry, formatAnchorReport, readFixture } from './anchors.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
console.log(formatAnchorReport(buildRegistry(root, readFixture(root))))
