// v3.3.5 吸收批次（#283、#279）+ v4.0 DSH 官方插件展示规范（SVG 图标与纯矢量详情画作）不变量校验。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const upstream = (p) => read(join('client', 'mobile', 'upstream', p));

test('#283: the touch shim swallows the pointer channel, not just the mouse family', () => {
  const src = upstream('effects/subagent-chip-touch.ts');
  const start = src.indexOf('const SWALLOWED_TYPES = [');
  assert.notEqual(start, -1, 'SWALLOWED_TYPES must be an array literal');
  const block = src.slice(start, src.indexOf('] as const', start));
  for (const type of ['mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'pointerout', 'pointerleave']) {
    assert.match(block, new RegExp(`'${type}'`), `${type} must stay in the swallow list`);
  }
});

test('#283: the swallow reason names the host leave timer, not our own choice', () => {
  const src = upstream('effects/subagent-chip-touch.ts');
  assert.match(src, /onPointerLeave/);
  assert.match(src, /pinnedRef/);
});

test('#279 + v4.0: package.json points the plugin manager at vector assets/icon.svg and ships docs', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.icon, 'assets/icon.svg');
  assert.equal(pkg.exports['./icon'], './assets/icon.svg');
  assert.ok(pkg.files.includes('assets'), 'assets must ship with the package');
  assert.ok(pkg.files.includes('docs'), 'docs must ship with the package');
  assert.equal(existsSync(join(root, 'assets', 'icon.png')), false, 'legacy raster icon.png must be removed');
});

test('#279: locale metadata is resolvable through the package exports', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.exports['./locale/*.json'], './locale/*.json');
  assert.ok(pkg.files.includes('locale'), 'locale must ship with the package');
});

test('#279 + v4.0: both locale dictionaries carry title, description, and detail markdown paths', () => {
  const zhMeta = JSON.parse(read('locale/zh.json')).meta;
  const enMeta = JSON.parse(read('locale/en.json')).meta;
  for (const [lang, meta, detailPath] of [
    ['zh', zhMeta, 'docs/DETAIL.zh.md'],
    ['en', enMeta, 'docs/DETAIL.md'],
  ]) {
    assert.equal(typeof meta.title, 'string');
    assert.equal(typeof meta.description, 'string');
    assert.ok(meta.title.length > 0 && meta.description.length > 0, `${lang} meta must not be empty`);
    assert.equal(meta.detail, detailPath, `${lang} meta.detail must point to ${detailPath}`);
    const detailMd = read(detailPath).trim();
    assert.match(detailMd, /^!\[[^\]]+\]\(preview\.svg\)$/, `${detailPath} must be strictly a single image line`);
  }
});

test('v4.0: shipped icon.svg (256x256, <16KB) and preview.svg (640x300 pure vector) follow DSH Creator Preset', () => {
  const iconPath = join(root, 'assets', 'icon.svg');
  const iconSvg = readFileSync(iconPath, 'utf8');
  assert.ok(statSync(iconPath).size < 16 * 1024, 'icon.svg must stay under 16 KB');
  assert.match(iconSvg, /viewBox="0 0 256 256"/);

  const previewSvg = read('docs/preview.svg');
  assert.match(previewSvg, /viewBox="0 0 640 300"/);
  assert.doesNotMatch(previewSvg, /<(?:text|foreignObject|script|style)\b/i, 'preview.svg must be pure vector shapes without text/script/style tags');
});
