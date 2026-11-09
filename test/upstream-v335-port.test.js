// v3.3.5 吸收批次（#283、#279）源码不变量钉子（2026-11-09）。
// 两项都是「宿主读得到、我们这边少一行」的类型，靠断言钉住：
//   #283 触摸 shim 必须连 pointer 通道一起吞（宿主 0.2.2-rc.1 的关闭定时器
//        挂在 onPointerLeave，只吞 mouse 族会把刚打开的卡关掉）；
//   #279 插件元数据三件套 —— manifest icon、locale 双语的 meta、以及让宿主
//        exports 解析得到 locale 的那两条 package.json 声明。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
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

test('#279: package.json points the plugin manager at a manifest icon', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.icon, 'assets/icon.png');
  assert.ok(pkg.files.includes('assets'), 'assets must ship with the package');
});

test('#279: locale metadata is resolvable through the package exports', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.exports['./locale/*.json'], './locale/*.json');
  assert.ok(pkg.files.includes('locale'), 'locale must ship with the package');
});

test('#279: both locale dictionaries carry a title and a description', () => {
  for (const lang of ['zh', 'en']) {
    const meta = JSON.parse(read(`locale/${lang}.json`)).meta;
    assert.equal(typeof meta.title, 'string');
    assert.equal(typeof meta.description, 'string');
    assert.ok(meta.title.length > 0 && meta.description.length > 0, `${lang} meta must not be empty`);
  }
});

test('#279: the shipped icon is a 256px RGBA PNG', () => {
  const png = readFileSync(join(root, 'assets', 'icon.png'));
  assert.deepEqual([...png.subarray(0, 8)], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  // IHDR follows the 8-byte signature and a 4-byte length: width at 16, height at 20.
  assert.equal(png.readUInt32BE(16), 256);
  assert.equal(png.readUInt32BE(20), 256);
  assert.equal(png[25], 6, 'colour type 6 = truecolour with alpha');
});
