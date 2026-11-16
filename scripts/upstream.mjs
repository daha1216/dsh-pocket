#!/usr/bin/env node
// upstream.mjs — 维护 client/mobile/upstream/ 的派生工具。
//
// client/mobile/upstream/ 不是手写代码，而是三层的确定性组合：
//   vendor/dsh-web-mobile/src/client   上游快照（dsh-web-mobile 原样，禁止手改）
//   scripts/lib/upstream-transform.mjs 镜像期变换（NS 改名 + stats 让位）
//   patches/*.patch                    本地补丁（唯一允许的改动入口）
//
// 用法：
//   node scripts/upstream.mjs check [--dir <目录>]   校验派生结果与提交树逐字节一致
//   node scripts/upstream.mjs apply                  按 vendor + patches 重写 client/mobile/upstream
//   node scripts/upstream.mjs regen                  改完 upstream/ 后重算补丁集
//   node scripts/upstream.mjs bump --from <src/client> [--tag <tag>] [--commit <sha>]   换基线并试打补丁

import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { TRANSFORM_VERSION, assertTransformedTree, transformTree } from './lib/upstream-transform.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const VENDOR = join(ROOT, 'vendor', 'dsh-web-mobile')
const VENDOR_SRC = join(VENDOR, 'src', 'client')
const VENDOR_MANIFEST = join(VENDOR, 'UPSTREAM.json')
const PATCH_DIR = join(ROOT, 'patches')
const PATCH_MANIFEST = join(PATCH_DIR, 'MANIFEST.json')
const TARGET = join(ROOT, 'client', 'mobile', 'upstream')

const log = (message) => console.log(message)
const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex')
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'))

// 临时目录都可能落在别的仓库的工作树里（例如 Windows 的用户目录本身是个 git 仓），
// 所以每个 git 子命令都关掉 stdin、关掉自动换行，并只在自己 init 过的目录里跑。
const git = (args, options = {}) => execFileSync('git', [
  '--no-pager',
  '-c', 'core.autocrlf=false',
  '-c', 'core.safecrlf=false',
  '-c', 'commit.gpgsign=false',
  ...args,
], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...options })

// 目录清单永不包含 .git：临时仓里的 .git 一被当成普通文件，就会把仓库本身删掉。
function listFiles(dir, base = dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === '.git') continue
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) { listFiles(path, base, out); continue }
    out.push(relative(base, path).split(sep).join('/'))
  }
  return out.sort()
}

function makeScratchRepo(dir) {
  git(['init', '--quiet', dir], { cwd: dir })
  if (!existsSync(join(dir, '.git'))) throw new Error('临时仓初始化失败（' + dir + ' 下没有 .git）')
  return dir
}

// 上游快照只读：登记过的文件内容一变、多一个少一个，都当作事故。
function verifyVendor() {
  if (!existsSync(VENDOR_MANIFEST)) throw new Error('缺少 vendor/dsh-web-mobile/UPSTREAM.json')
  const manifest = readJson(VENDOR_MANIFEST)
  const expected = manifest.files
  const actual = listFiles(VENDOR_SRC)
  const problems = []
  for (const rel of actual) {
    if (!(rel in expected)) { problems.push('未登记的新文件：' + rel); continue }
    if (sha256(join(VENDOR_SRC, rel)) !== expected[rel]) problems.push('内容与快照记录不符：' + rel)
  }
  for (const rel of Object.keys(expected)) if (!actual.includes(rel)) problems.push('快照文件缺失：' + rel)
  if (problems.length > 0) throw new Error('vendor 快照被改动（上游代码必须保持原样）：\n  ' + problems.join('\n  '))
  return manifest
}

function patchFiles() {
  if (!existsSync(PATCH_DIR)) return []
  return readdirSync(PATCH_DIR).filter((name) => name.endsWith('.patch')).sort().map((name) => join(PATCH_DIR, name))
}

// vendor → 变换，得到「派生基线」（不含本地补丁）。
function buildBaseline(dest) {
  rmSync(dest, { recursive: true, force: true })
  mkdirSync(dest, { recursive: true })
  cpSync(VENDOR_SRC, dest, { recursive: true })
  return transformTree(dest)
}

// 派生基线 → 补丁，产出一棵可用的 upstream 树。
function buildDerived(dest) {
  const transformed = buildBaseline(dest)
  const patches = patchFiles()
  if (patches.length > 0) {
    makeScratchRepo(dest)
    try {
      git(['apply', '--whitespace=nowarn', '-p1', ...patches], { cwd: dest })
    } catch (error) {
      const detail = String(error.stderr || error.message).trim()
      throw new Error('补丁无法应用（基线或补丁集已偏移）：\n' + detail)
    } finally {
      rmSync(join(dest, '.git'), { recursive: true, force: true })
    }
  }
  assertTransformedTree(dest)
  return { transformed, applied: patches.length }
}

function compareTrees(expectedDir, actualDir) {
  const expected = listFiles(expectedDir)
  const actual = listFiles(actualDir)
  const actualSet = new Set(actual)
  const expectedSet = new Set(expected)
  const modified = expected.filter((rel) => actualSet.has(rel) && sha256(join(expectedDir, rel)) !== sha256(join(actualDir, rel)))
  return {
    modified,
    onlyActual: actual.filter((rel) => !expectedSet.has(rel)),
    onlyExpected: expected.filter((rel) => !actualSet.has(rel)),
  }
}

function check(dir) {
  const manifest = verifyVendor()
  const work = mkdtempSync(join(tmpdir(), 'dsh-pocket-upstream-'))
  try {
    const { applied } = buildDerived(work)
    const diff = compareTrees(work, dir)
    const total = diff.modified.length + diff.onlyActual.length + diff.onlyExpected.length
    if (total > 0) {
      log('upstream check FAILED — ' + total + ' 处与派生基线不一致：')
      for (const rel of diff.modified) log('  M ' + rel + '  （手改了上游文件？改动应写进 patches/）')
      for (const rel of diff.onlyActual) log('  + ' + rel + '  （目标里多出来的文件）')
      for (const rel of diff.onlyExpected) log('  - ' + rel + '  （派生基线有、目标里被删了）')
      log('修法：node scripts/upstream.mjs apply（丢弃手改）或 node scripts/upstream.mjs regen（把手改收进补丁集）')
      return 1
    }
    log('upstream check OK — ' + manifest.tag + ' ' + manifest.commit.slice(0, 7) + '，' + listFiles(work).length + ' 文件，' + applied + ' 个补丁')
    return 0
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
}

function apply() {
  verifyVendor()
  const work = mkdtempSync(join(tmpdir(), 'dsh-pocket-upstream-'))
  try {
    const { applied, transformed } = buildDerived(work)
    rmSync(TARGET, { recursive: true, force: true })
    cpSync(work, TARGET, { recursive: true })
    log('已按 vendor + patches 重写 client/mobile/upstream（' + listFiles(TARGET).length + ' 文件，' + applied + ' 个补丁，变换 ' + transformed + ' 个文件）')
    return 0
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
}

function regen() {
  const manifest = verifyVendor()
  const work = mkdtempSync(join(tmpdir(), 'dsh-pocket-upstream-'))
  const scratch = mkdtempSync(join(tmpdir(), 'dsh-pocket-patchgen-'))
  try {
    log('· 重建派生基线…')
    buildBaseline(work)
    cpSync(work, scratch, { recursive: true })
    makeScratchRepo(scratch)
    git(['add', '-A'], { cwd: scratch })
    log('· 提交基线快照…')
    git(['-c', 'user.email=upstream@dsh-pocket.local', '-c', 'user.name=dsh-pocket', 'commit', '--quiet', '--message=baseline'], { cwd: scratch })
    log('· 覆盖成当前树并求差…')
    const baseline = listFiles(scratch)
    const current = new Set(listFiles(TARGET))
    for (const rel of baseline) if (!current.has(rel)) rmSync(join(scratch, rel))
    cpSync(TARGET, scratch, { recursive: true, force: true })
    git(['add', '-A'], { cwd: scratch })
    const changed = git(['diff', '--cached', '--name-only', 'HEAD'], { cwd: scratch }).split('\n').map((line) => line.trim()).filter(Boolean).sort()
    mkdirSync(PATCH_DIR, { recursive: true })
    for (const name of readdirSync(PATCH_DIR)) if (name.endsWith('.patch')) rmSync(join(PATCH_DIR, name))
    const rows = []
    for (const [index, rel] of changed.entries()) {
      const seq = String(index + 1).padStart(4, '0')
      const patchName = seq + '-' + rel.split('/').join('__') + '.patch'
      writeFileSync(join(PATCH_DIR, patchName), git(['diff', '--cached', 'HEAD', '--', rel], { cwd: scratch }))
      const stat = git(['diff', '--cached', '--numstat', 'HEAD', '--', rel], { cwd: scratch }).trim().split('\t')
      rows.push({
        seq: index + 1,
        file: rel,
        patch: patchName,
        added: Number(stat[0]) || 0,
        removed: Number(stat[1]) || 0,
        sha256: sha256(join(PATCH_DIR, patchName)),
      })
    }
    const added = rows.reduce((sum, row) => sum + row.added, 0)
    const removed = rows.reduce((sum, row) => sum + row.removed, 0)
    writeFileSync(PATCH_MANIFEST, JSON.stringify({
      upstream: { repo: manifest.repo, tag: manifest.tag, commit: manifest.commit, transformVersion: TRANSFORM_VERSION },
      target: 'client/mobile/upstream',
      patches: rows,
    }, null, 2) + '\n')
    log('已重算补丁集：' + rows.length + ' 个补丁（+' + added + ' / -' + removed + '），清单写进 patches/MANIFEST.json')
    log('· 自检：用新补丁集重建一遍…')
    if (check(TARGET) !== 0) throw new Error('regen 结果不可重放：新补丁集重建后与 client/mobile/upstream 不一致')
    return 0
  } finally {
    rmSync(work, { recursive: true, force: true })
    rmSync(scratch, { recursive: true, force: true })
  }
}

function bump(options) {
  if (!options.from) throw new Error('bump 需要 --from <dsh-web-mobile 的 src/client 目录>')
  const source = resolve(options.from)
  const srcClient = existsSync(join(source, 'src', 'client')) ? join(source, 'src', 'client') : source
  if (!existsSync(join(srcClient, 'index.tsx'))) throw new Error('--from 指向的目录不像 dsh-web-mobile 的 src/client：' + srcClient)
  let commit = options.commit
  if (!commit) {
    try { commit = git(['-C', source, 'rev-parse', 'HEAD']).trim() } catch { commit = 'unknown' }
  }
  rmSync(VENDOR_SRC, { recursive: true, force: true })
  mkdirSync(VENDOR_SRC, { recursive: true })
  cpSync(srcClient, VENDOR_SRC, { recursive: true })
  const files = {}
  for (const rel of listFiles(VENDOR_SRC)) files[rel] = sha256(join(VENDOR_SRC, rel))
  const previous = existsSync(VENDOR_MANIFEST) ? readJson(VENDOR_MANIFEST) : {}
  writeFileSync(VENDOR_MANIFEST, JSON.stringify({
    repo: previous.repo || 'https://github.com/mexiaosqwq/dsh-web-mobile',
    tag: options.tag || 'unknown',
    commit,
    sourcePath: 'src/client',
    mirroredAt: new Date().toISOString().slice(0, 10),
    note: '上游原样快照，禁止手改；本地改动一律写进 patches/',
    files,
  }, null, 2) + '\n')
  log('已换上游快照：' + (options.tag || 'unknown') + ' ' + commit.slice(0, 7) + '，' + Object.keys(files).length + ' 文件')
  const work = mkdtempSync(join(tmpdir(), 'dsh-pocket-upstream-'))
  try {
    buildDerived(work)
    log('现有补丁全部可应用。落地：node scripts/upstream.mjs apply')
    return 0
  } catch (error) {
    log('现有补丁打不上，需要逐个对账：')
    log(String(error.message))
    log('做法：先 apply 会失败；修好 upstream/ 的手工落点后跑 regen，再 apply 校验。')
    return 1
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
}

const [command = 'check', ...rest] = process.argv.slice(2)
const flag = (name) => {
  const index = rest.indexOf('--' + name)
  return index >= 0 ? rest[index + 1] : undefined
}
try {
  if (command === 'check') process.exitCode = check(flag('dir') ? resolve(flag('dir')) : TARGET)
  else if (command === 'apply') process.exitCode = apply()
  else if (command === 'regen') process.exitCode = regen()
  else if (command === 'bump') process.exitCode = bump({ from: flag('from'), tag: flag('tag'), commit: flag('commit') })
  else { log('未知子命令：' + command + '（可用：check / apply / regen / bump）'); process.exitCode = 2 }
} catch (error) {
  console.error('✗ ' + String(error.message))
  process.exitCode = 1
}
