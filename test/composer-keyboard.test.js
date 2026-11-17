// composer 座位键盘抬升（M3b，2026-09-29 真机反馈「键盘挡住输入内容」）：座位是
// 宿主 sticky bottom:0 钉布局视口底，iOS/Android(resizes-visual) 键盘只收缩
// visual viewport → 输入行整排沉键盘底。修法=键盘开态把座位 sticky 偏移改为
// --dshp-kb。v4.0 拆分为 pocket/extra-styles.css.ts + pocket/viewport-and-chrome.ts
// 并随按需移动分包 client/client.mobile.js 下发。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const extraStyles = readFileSync(
  new URL('../client/mobile/pocket/extra-styles.css.ts', import.meta.url),
  'utf8',
);
const viewportChrome = readFileSync(
  new URL('../client/mobile/pocket/viewport-and-chrome.ts', import.meta.url),
  'utf8',
);
const mobileBundle = readFileSync(
  new URL('../client/client.mobile.js', import.meta.url),
  'utf8',
);

test('抬座位规则只在键盘开态命中（html[data-dshp-kb="open"] 门控 + 座位三锚点选择器族）', () => {
  const gated = extraStyles.match(
    /html\[data-dshp-kb="open"\][^{]*\{[^}]*position:\s*sticky\s*!important;[^}]*bottom:\s*var\(--dshp-kb, 0px\)\s*!important;[^}]*\}/,
  );
  assert.ok(gated, '必须存在 data-dshp-kb="open" 门控的座位 sticky+bottom 覆盖规则');
  const sel = gated[0];
  for (const anchor of [
    '[data-mobile-nav="frame"] [class*="_composerSeat"]',
    'div[class*="_frame"] [class*="_composerSeat"]',
    '[data-mobile-nav="frame"] [data-phase] [class*="_composerSeat"]',
  ]) {
    assert.ok(sel.includes(anchor), `选择器族必须含锚点 ${anchor}`);
  }
});

test('抬座位不用 translateY，但必须 transform:none 中和上游内联抬升（10-14 键盘案统一 sticky 单机制）', () => {
  const m3b = extraStyles.slice(extraStyles.indexOf('M3b'), extraStyles.indexOf('M3b') + 1600);
  assert.ok(m3b.includes('containing block'), 'M3b 注释必须记录 transform 禁用原因（防后人『优化』成 translateY）');
  const bare = extraStyles.replace(/\/\*[\s\S]*?\*\//g, '');
  const gatedRule = bare.match(/html\[data-dshp-kb="open"\][^{]*\{[^}]*\}/)?.[0] ?? '';
  assert.ok(gatedRule.length > 0, '剥注释后必须仍能取到开态门控规则');
  assert.ok(!gatedRule.includes('translate'), '抬升不得走 translateY（transform 会把座位子树 fixed 弹层变 containing block）');
  assert.ok(/transform:\s*none\s*!important/.test(gatedRule), '开态必须 transform:none 中和上游内联抬升');
});

test('开合标记与 --dshp-kb 同点维护（同短路路径，卸载时清理）', () => {
  const w = viewportChrome.match(/root\.style\.setProperty\('--dshp-kb', value\)[\s\S]{0,300}?removeAttribute\('data-dshp-kb'\)/);
  assert.ok(w, "setProperty('--dshp-kb') 之后必须同点维护 data-dshp-kb 开合标记");
  assert.ok(w[0].includes(`if (kb > 0) root.setAttribute('data-dshp-kb', 'open')`), '开态=kb>0 置 open，否则摘除');
  const d = viewportChrome.match(/root\.style\.removeProperty\('--dshp-kb'\)\s*\n\s*root\.removeAttribute\('data-dshp-kb'\)/);
  assert.ok(d, '卸载清理必须同时摘 --dshp-kb 变量与 data-dshp-kb 标记');
});

test('打包产物含座位抬升全链路标记（CSS 规则 + 标记写入）', () => {
  assert.ok(mobileBundle.includes('[data-dshp-kb="open"]'), '移动分包必须含开态门控选择器');
  assert.ok(/html\[data-dshp-kb="open"\][^{]*\{[^}]*--dshp-kb/.test(mobileBundle), '移动分包必须含 bottom: var(--dshp-kb) 规则');
  assert.ok(
    mobileBundle.includes("setAttribute('data-dshp-kb','open')")
      || mobileBundle.includes('setAttribute("data-dshp-kb","open")')
      || /setAttribute\(.data-dshp-kb.,.open.\)/.test(mobileBundle),
    '移动分包必须含开态标记写入',
  );
});
