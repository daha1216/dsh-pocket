// 体验断档打磨（2026-11-12 评审 §5.3 + v4.0 模块化分包）：断线横幅、键盘期禁过渡、
// 首次进入引导、回到底部胶囊、局域网「调试模式」标注、PIN 页说明。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { settingsSource } from './helpers/settings-source.js';

const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8');
const extraStyles = read('client/mobile/pocket/extra-styles.css.ts');
const linkAndSettling = read('client/mobile/pocket/link-and-settling.ts');
const viewportChrome = read('client/mobile/pocket/viewport-and-chrome.ts');
const settings = settingsSource();
const pages = read('lib/proxy/pages.mjs');
const mainBundle = read('client/client.js');
const mobileBundle = read('client/client.mobile.js');
const { zh, en } = await import('../client/pocket-locales.js');

test('键盘开态短路过渡：只在 html[data-dshp-kb="open"] 下命中', () => {
  assert.match(extraStyles, /html\[data-dshp-kb="open"\] \[data-mobile-nav="frame"\]/);
  assert.match(extraStyles, /html\[data-dshp-kb="open"\] \[data-conversation-scroll\]/);
  assert.match(extraStyles, /html\[data-dshp-kb="open"\] \[data-composer-seat\]/);
  const at = extraStyles.indexOf('键盘期禁过渡');
  assert.ok(at > 0, '缺少键盘期禁过渡段落');
  assert.match(extraStyles.slice(at, at + 900), /transition: none !important/);
});

test('断线横幅：状态跳变驱动、恢复后自动摘、不挡点击', () => {
  assert.match(linkAndSettling, /data-mobile-nav', 'link-banner'/);
  assert.match(linkAndSettling, /pointer-events:none/);
  assert.match(linkAndSettling, /const syncBanner = \(\): void =>/);
  assert.match(linkAndSettling, /if \(down === bannerDown\) return/);
  assert.match(linkAndSettling, /bannerBackTimer = window\.setTimeout\(removeBanner, 1400\)/);
  assert.match(linkAndSettling, /pocketText\('linkDown'/);
  assert.match(linkAndSettling, /pocketText\('linkBack'/);
});

test('首次引导：一次性、可关闭、不碰宿主 React 树', () => {
  assert.match(viewportChrome, /const KEY = 'dsh-pocket:first-visit-tips:v1'/);
  assert.match(viewportChrome, /data-mobile-nav', 'first-visit-tips'/);
  assert.match(viewportChrome, /window\.localStorage\.setItem\(KEY, '1'\)/);
  assert.match(viewportChrome, /closeTimer = window\.setTimeout\(dismiss, 12_000\)/);
  assert.match(viewportChrome, /pocketText\('tipsTitle'/);
});

test('回到底部胶囊：离底阈值、可见滚动区、座位自适应、点击回底、零轮询定时器', () => {
  assert.match(viewportChrome, /const AWAY_PX = 280/);
  assert.match(viewportChrome, /querySelectorAll<HTMLElement>\('\[data-conversation-scroll\]'\)/);
  assert.match(viewportChrome, /data-mobile-nav', 'back-to-bottom'/);
  assert.match(viewportChrome, /el\.scrollTo\(\{ top: el\.scrollHeight, behavior: 'smooth' \}\)/);
  assert.match(viewportChrome, /if \(pill\.style\.bottom !== bottom\) pill\.style\.bottom = bottom/);
  assert.match(viewportChrome, /pillBottom\(\)/);
  assert.match(viewportChrome, /corner-shape:round/);
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

test('双分包构建产物各自携带对应标记（主包带设置页文案，移动分包带移动浮层标记）', () => {
  assert.ok(mainBundle.includes('lanDebugHint'), 'client.js 缺 lanDebugHint');
  for (const marker of ['link-banner', 'first-visit-tips', 'back-to-bottom']) {
    assert.ok(mobileBundle.includes(marker), `client.mobile.js 缺 ${marker}`);
  }
});
