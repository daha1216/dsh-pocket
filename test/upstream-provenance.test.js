// upstream/ 的可追溯性契约（终局评审 §2.3 / Phase 1 ②）。
//
// 背景：client/mobile/upstream/ 里 1.8 万行上游代码曾被手改过十几处，而 PORTING.md
// 声称「零手改」——上游一升级，改过的地方既查不出也重放不了，只能人肉比对。
// 现在它由 vendor 快照 + 两条变换 + patches 重建，本测试守住这条链：
// 快照没被动过、补丁集能重放、派生树与重建结果逐字节一致。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const vendorDir = join(root, 'vendor', 'dsh-web-mobile', 'src', 'client');
const vendorManifestPath = join(root, 'vendor', 'dsh-web-mobile', 'UPSTREAM.json');
const patchDir = join(root, 'patches');
const patchManifestPath = join(patchDir, 'MANIFEST.json');
const targetDir = join(root, 'client', 'mobile', 'upstream');
const cli = join(root, 'scripts', 'upstream.mjs');

const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');

function listFiles(dir, base = dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === '.git') continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) { listFiles(path, base, out); continue; }
    out.push(relative(base, path).split(sep).join('/'));
  }
  return out.sort();
}

function runCheck(dir) {
  try {
    const stdout = execFileSync(process.execPath, [cli, 'check', ...(dir ? ['--dir', dir] : [])], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return { code: 0, output: stdout };
  } catch (error) {
    return { code: error.status ?? 1, output: String(error.stdout ?? '') + String(error.stderr ?? '') };
  }
}

test('vendor 快照与 UPSTREAM.json 登记一致，且带得上游身份', () => {
  assert.ok(existsSync(vendorManifestPath), '缺少 vendor/dsh-web-mobile/UPSTREAM.json');
  const manifest = JSON.parse(readFileSync(vendorManifestPath, 'utf8'));
  assert.match(manifest.repo, /dsh-web-mobile/);
  assert.match(manifest.tag, /^v\d+\.\d+\.\d+$/);
  assert.match(manifest.commit, /^[0-9a-f]{40}$/);
  assert.equal(manifest.sourcePath, 'src/client');
  const files = listFiles(vendorDir);
  assert.ok(files.length >= 60, '上游快照文件数异常：' + files.length);
  assert.deepEqual(files, Object.keys(manifest.files).sort(), '快照文件清单必须与登记完全一致');
  for (const rel of files) assert.equal(sha256(join(vendorDir, rel)), manifest.files[rel], '上游快照被改动：' + rel);
});

test('patches/MANIFEST.json 与补丁文件一一对应', () => {
  assert.ok(existsSync(patchManifestPath), '缺少 patches/MANIFEST.json');
  const manifest = JSON.parse(readFileSync(patchManifestPath, 'utf8'));
  assert.equal(manifest.target, 'client/mobile/upstream');
  assert.match(manifest.upstream.commit, /^[0-9a-f]{40}$/);
  const onDisk = listFiles(patchDir).filter((name) => name.endsWith('.patch'));
  const listed = manifest.patches.map((row) => row.patch).sort();
  assert.deepEqual(onDisk, listed, '补丁文件与清单必须一一对应（改完 upstream/ 记得 regen）');
  for (const row of manifest.patches) {
    assert.equal(sha256(join(patchDir, row.patch)), row.sha256, '补丁文件被手改：' + row.patch);
    assert.ok(row.file.length > 0);
  }
});

test('派生树与 vendor + 变换 + patches 重建结果逐字节一致', () => {
  const result = runCheck(null);
  assert.equal(result.code, 0, 'upstream check 失败：\n' + result.output);
  assert.match(result.output, /upstream check OK/);
});

test('负例：派生树被手改一个字节，check 就必须报失败并点名文件', () => {
  const copy = mkdtempSync(join(tmpdir(), 'upstream-negative-'));
  try {
    cpSync(targetDir, copy, { recursive: true });
    const victim = join(copy, 'debug.ts');
    writeFileSync(victim, readFileSync(victim, 'utf8') + '\n// 手改一行\n');
    const result = runCheck(copy);
    assert.equal(result.code, 1, '手改上游文件必须被 check 拦住');
    assert.match(result.output, /upstream check FAILED/);
    assert.match(result.output, /debug\.ts/);
  } finally {
    rmSync(copy, { recursive: true, force: true });
  }
});

test('.gitattributes 钉住三棵树的换行符，避免换机器后 check 全红', () => {
  const text = readFileSync(join(root, '.gitattributes'), 'utf8');
  for (const pattern of ['vendor/**', 'patches/**', 'client/mobile/upstream/**']) {
    assert.ok(text.includes(pattern + ' text eol=lf'), '缺少 ' + pattern + ' 的 eol 约定');
  }
});
