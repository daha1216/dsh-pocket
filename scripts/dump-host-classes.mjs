#!/usr/bin/env node
/**
 * 从运行中的 DSH 宿主里抽出「客户端 UI 真正挂到 DOM 上的类名」，落成
 * test/fixtures/host-classes.json，供 test/anchors-contract.test.js 校验手机层
 * 那批 [class*=...] 锚点是否还落在宿主的真实类名上。
 *
 * 取样口径（三次反复的结论，改动前先读）：
 *
 *   hashed    宿主包 lib|dist 下的 js/css 产物里，**选择器位**出现的
 *             <buildHash>_<localName> 类名（形如 an3WzG_composerSeat）。
 *             「选择器位」= 该 token 前面紧邻一个点，即 .token 形态。
 *             · 只取整包正文里的裸 token 不行：bundler 常量 PROTOCOL_VERSION、
 *               tool_call 这类也能凑成「带下划线的名字」，实测 14477 个里近半是噪声，
 *               会让已经失效的锚点被判成活的。选择器位过滤后是 7132 个。
 *             · 只从字符串字面量里的 CSS 抠也不行：宿主 bundle 里 CSS 是 80KB 级的
 *               巨型字面量，正则扫引号配对会错位（实测 an3WzG_composerSeat 明明在
 *               字符串里，却报找不到所属字面量），结果是真类名被判死。
 *   authoring  宿主包 src 目录下手写的 module.css 类名 —— 只作参考字典，
 *             编译后会加哈希前缀，只能用来确认「这个名字还叫这个名字」。
 *
 * 排除 dsh-web-frontend：那是宿主 Web 外壳自己的 webpack 产物（_copyable_l6gf9_20
 * 这类 local_hash_line 名字由它来），不是插件 UI 的 class 源，收进来会把外壳里的
 * 同名类算进来。
 *
 * 宿主把界面打包在 app.asar 里，node 打不开里面的路径，所以这里自己解析容器头
 * （无三方依赖）：
 *   uint32 @0  = 4
 *   uint32 @4  = header pickle 大小
 *   uint32 @12 = 目录 JSON 的字节数（JSON 紧随其后，@16 开始）
 *   文件数据基址 = 8 + header pickle 大小
 *
 * 用法：node scripts/dump-host-classes.mjs [--asar <app.asar>] [--out <json>]
 * 默认 asar：$DSH_POCKET_HOST_ASAR，否则按平台猜 DSH Desktop 的安装位置。
 */

import { closeSync, existsSync, mkdirSync, openSync, readSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
// 只看客户端 UI 包不够：explorer/preview 这类面板的类名可能来自别的宿主包，
// 漏扫会把「宿主内部换了包」误判成「锚点失效」。所以扫宿主 @deepseek-ai 下全量 dsh-*。
const HOST_SCOPE = /^dsh-/
// Web 外壳的编译产物不是插件 UI 的 class 源（见文件头）。
const EXCLUDED_PACKAGES = new Set(['dsh-web-frontend'])
// 扫哪些产物文件：lib 与 dist 下的 js/mjs/css。
const BUNDLE_FILE = /^(?:lib|dist)\/.*\.(?:js|mjs|css)$/
const AUTHORING_FILE = /^src\/.*\.module\.css$/
// CSS module 作用域化的形状：<buildHash>_<localName>。
const SCOPED = /^[A-Za-z0-9][A-Za-z0-9-]{2,11}_[A-Za-z][A-Za-z0-9_-]*$/
// 选择器位：点号紧跟标识符。
const SELECTOR_CLASS = /\.(-?[A-Za-z_][A-Za-z0-9_-]*)/g

function argOf(name) {
  const i = process.argv.indexOf('--' + name)
  return i === -1 ? null : (process.argv[i + 1] ?? null)
}

/** 找本机装着的 DSH Desktop 的 app.asar（--asar 与 $DSH_POCKET_HOST_ASAR 优先）。 */
export function resolveHostAsar() {
  if (process.env.DSH_POCKET_HOST_ASAR) return process.env.DSH_POCKET_HOST_ASAR
  const candidates = [
    'D:/deepseek harness/resources/app.asar',
    'C:/deepseek harness/resources/app.asar',
    join(process.env.LOCALAPPDATA ?? '', 'Programs/deepseek-harness/resources/app.asar'),
    '/Applications/DeepSeek Harness.app/Contents/Resources/app.asar',
  ]
  return candidates.find((p) => p && existsSync(p)) ?? null
}

class Asar {
  constructor(file) {
    this.fd = openSync(file, 'r')
    const head = Buffer.alloc(16)
    readSync(this.fd, head, 0, 16, 0)
    this.dataBase = 8 + head.readUInt32LE(4)
    const jsonSize = head.readUInt32LE(12)
    const json = Buffer.alloc(jsonSize)
    readSync(this.fd, json, 0, jsonSize, 16)
    this.index = JSON.parse(json.toString('utf8'))
  }

  read(entry) {
    const buf = Buffer.alloc(entry.size)
    readSync(this.fd, buf, 0, entry.size, this.dataBase + Number(entry.offset))
    return buf.toString('utf8')
  }

  close() {
    closeSync(this.fd)
  }
}

// 目录树里收集所有相对路径 -> 目录项
function collect(node, prefix, out) {
  if (node.files) {
    for (const [name, child] of Object.entries(node.files)) collect(child, prefix ? prefix + '/' + name : name, out)
    return out
  }
  out.set(prefix, node)
  return out
}

export function classesFromBundle(text, out) {
  for (const m of text.matchAll(SELECTOR_CLASS)) if (SCOPED.test(m[1])) out.add(m[1])
  return out
}

export function extractHostClasses(asarPath) {
  const asar = new Asar(asarPath)
  try {
    const dsh = asar.index.files?.dsh?.files ?? {}
    const scope = dsh['node_modules']?.files?.['@deepseek-ai']?.files ?? {}
    const packages = []
    const hashed = new Set()
    const authoring = new Set()

    for (const [pkgName, pkgNode] of Object.entries(scope)) {
      if (!HOST_SCOPE.test(pkgName) || EXCLUDED_PACKAGES.has(pkgName)) continue
      const files = collect(pkgNode, '', new Map())
      let version = null
      const manifest = files.get('package.json')
      if (manifest) {
        try {
          version = JSON.parse(asar.read(manifest)).version ?? null
        } catch {
          version = null
        }
      }
      let css = 0
      let bundles = 0
      let contributed = 0
      for (const [path, entry] of files) {
        if (AUTHORING_FILE.test(path)) {
          css++
          for (const m of asar.read(entry).matchAll(SELECTOR_CLASS)) authoring.add(m[1])
          continue
        }
        if (!BUNDLE_FILE.test(path)) continue
        bundles++
        const before = hashed.size
        classesFromBundle(asar.read(entry), hashed)
        if (hashed.size > before) contributed++
      }
      packages.push({ name: pkgName, version, css, bundles, contributed })
    }

    return {
      meta: {
        generatedBy: 'scripts/dump-host-classes.mjs',
        // 取样口径变更时改这个版本号，提醒 review 的人 fixture 换了意义
        sampling: 'selector-position/v1',
        packageCount: packages.filter((p) => p.contributed > 0).length,
        scannedPackages: packages.length,
        hashedCount: hashed.size,
        authoringCount: authoring.size,
      },
      packages: packages.filter((p) => p.contributed > 0).sort((a, b) => a.name.localeCompare(b.name)),
      hashed: [...hashed].sort(),
      authoring: [...authoring].sort(),
    }
  } finally {
    asar.close()
  }
}

function main() {
  const asarPath = argOf('asar') ?? resolveHostAsar()
  if (!asarPath) {
    console.error('找不到宿主 app.asar，请用 --asar <path> 或设置 DSH_POCKET_HOST_ASAR')
    process.exit(1)
  }
  const out = argOf('out') ?? join(REPO_ROOT, 'test/fixtures/host-classes.json')
  const data = extractHostClasses(asarPath)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, JSON.stringify(data, null, 0) + '\n')
  console.log(
    '已写入 ' + out + '：' + data.meta.packageCount + ' 个贡献了 UI 类名的宿主包，' +
      data.meta.hashedCount + ' 个运行时类名，' + data.meta.authoringCount + ' 个手写类名',
  )
}

if (process.argv[1] && /dump-host-classes\.mjs$/.test(process.argv[1])) main()
