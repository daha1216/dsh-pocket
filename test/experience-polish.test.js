// 体验断档打磨（2026-11-12 评审 §5.3）：断线横幅、键盘期禁过渡、首次进入引导、
// 回到底部胶囊、局域网「调试模式」标注、PIN 页说明。
//
// 这些全是 pocket 附加层的 DOM 接线（mobile-apply.tsx 的非 React 部分 / 设置页 /
// 代理登录页），没有可独立单测的纯判据，因此断言分三层：
//   1) 源码接线：标记名、选择器、locale 键必须同时在场，删掉任何一端都会红；
//   2) 词典完整性：新键在 zh/en 都在，且不带占位符（横幅是纯文本，不该有 {}）；
//   3) 产物：构建后的 client/client.js 里能找到这些标记（防止「源码改了、包里没有」）。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { settingsSource } from './helpers/settings-source.js';

const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8');
const apply = read('client/mobile/mobile-apply.tsx');
const settings = settingsSource();
const proxy = read('lib/proxy.mjs');
const pages = read('lib/proxy/pages.mjs');
const { zh, en } = await import('../client/pocket-locales.js');

test('键盘开态短路过渡：只在 html[data-dshp-kb="open"] 下命中', () => {
  assert.match(apply, /html\[data-dshp-kb="open"\] \[data-mobile-nav="frame"\]/);
  assert.match(apply, /html\[data-dshp-kb="open"\] \[data-conversation-scroll\]/);
  assert.match(apply, /html\[data-dshp-kb="open"\] \[data-composer-seat\]/);
  const at = apply.indexOf('键盘期禁过渡');
  assert.ok(at > 0, '缺少键盘期禁过渡段落');
  assert.match(apply.slice(at, at + 900), /transition: none !important/);
});

test('断线横幅：状态跳变驱动、恢复后自动摘、不挡点击', () => {
  assert.match(apply, /data-mobile-nav', 'link-banner'/);
  assert.match(apply, /pointer-events:none/);
  assert.match(apply, /const syncBanner = \(\): void =>/);
  // 只在跳变时写 DOM：同状态直接 return
  assert.match(apply, /if \(down === bannerDown\) return/);
  // 恢复提示留 1.4s 再摘
  assert.match(apply, /bannerBackTimer = window\.setTimeout\(removeBanner, 1400\)/);
  assert.match(apply, /pocketText\(ctx, 'linkDown'/);
  assert.match(apply, /pocketText\(ctx, 'linkBack'/);
});

test('首次引导：一次性、可关闭、不碰宿主 React 树', () => {
  assert.match(apply, /const KEY = 'dsh-pocket:first-visit-tips:v1'/);
  assert.match(apply, /data-mobile-nav', 'first-visit-tips'/);
  assert.match(apply, /window\.localStorage\.setItem\(KEY, '1'\)/);
  assert.match(apply, /closeTimer = window\.setTimeout\(dismiss, 12_000\)/);
  assert.match(apply, /pocketText\(ctx, 'tipsTitle'/);
});

test('回到底部胶囊：离底阈值、可见滚动区、座位自适应、点击回底', () => {
  assert.match(apply, /const AWAY_PX = 280/);
  assert.match(apply, /querySelectorAll<HTMLElement>\('\[data-conversation-scroll\]'\)/);
  assert.match(apply, /data-mobile-nav', 'back-to-bottom'/);
  assert.match(apply, /el\.scrollTo\(\{ top: el\.scrollHeight, behavior: 'smooth' \}\)/);
  assert.match(apply, /if \(pill\.style\.bottom !== bottom\) pill\.style\.bottom = bottom/);
  assert.match(apply, /pillBottom\(\)/);
});

test('新文案在 zh/en 都存在且无占位符，设置页/登录页各自接上', () => {
  const keys = ['linkDown', 'linkBack', 'tipsTitle', 'tipsBody', 'tipsDismiss', 'backToBottom', 'lanDebugHint'];
  for (const key of keys) {
    assert.equal(typeof zh[key], 'string', `zh 缺 ${key}`);
    assert.equal(typeof en[key], 'string', `en 缺 ${key}`);
    assert.ok(!/\{\w+\}/.test(zh[key]) && !/\{\w+\}/.test(en[key]), `${key} 不该有占位符`);
  }
  assert.match(settings, /t\('lanDebugHint'\)/);
  assert.match(pages, /\.hint\{/);
  assert.match(pages, /这是你电脑上 DSH 的手机入口/);
});

test('构建产物里带得到这些标记（源码改了、包里没有 = 接线失败）', () => {
  const bundle = read('client/client.js');
  for (const marker of ['link-banner', 'first-visit-tips', 'back-to-bottom', 'lanDebugHint']) {
    assert.ok(bundle.includes(marker), `bundle 缺 ${marker}`);
  }
});
