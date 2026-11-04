// v3.2.3 吸收批次（#260）源码不变量钉子（2026-11-05）。
// 上游 tests 的源码审计式断言按 pocket 树路径改写，覆盖四块：
//   visible-band 常量与 viewport-meta 停稳发布、session-focus-guard 观察窗口化、
//   question-fullscreen 双缓存 + 卡滚动 + VISIBLE_BAND 订阅、layout.css.ts
//   死锚修复（data-question-key 作用域 + 无 Mbwy4a 存活选择器）与
//   question-card-single-scroll @patch 块。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const upstream = (p) => readFileSync(join(here, '..', 'client', 'mobile', 'upstream', p), 'utf8');

test('visible-band.ts exports the published event name verbatim', () => {
  const src = upstream('platform/visible-band.ts');
  assert.match(src, /VISIBLE_BAND_EVENT = 'dsh-mobile-visible-band'/);
});

test('viewport-meta publishes the band var only after two equal frames', () => {
  const src = upstream('effects/viewport-meta.ts');
  assert.match(src, /pendingVisibleFrames >= 2/);
  assert.match(src, /import \{ VISIBLE_BAND_EVENT \} from '\.\.\/platform\/visible-band\.ts'/);
  assert.match(src, /dispatchEvent\(new CustomEvent\(VISIBLE_BAND_EVENT/);
});

test('session-focus-guard: input observer is window-scoped', () => {
  const src = upstream('effects/session-focus-guard.ts');
  assert.match(src, /windowOpen = true\s*\n\s*const el/);
  assert.match(src, /inputObserver\.observe\(document\.documentElement, \{ childList: true, subtree: true \}\)/);
  assert.match(src, /windowOpen = false\s*\n\s*inputObserver\.disconnect\(\)/);
});

test('session-focus-guard: resident observer watches only the panel-exit attribute', () => {
  const src = upstream('effects/session-focus-guard.ts');
  const start = src.indexOf('markerObserver.observe(');
  const block = src.slice(start, src.indexOf('})', start));
  assert.doesNotMatch(block, /childList/);
  assert.match(block, /attributeFilter: \[PANEL_EXIT_ATTR\]/);
});

test('question-fullscreen: card/body caches with liveness checks', () => {
  const src = upstream('effects/question-fullscreen.ts');
  assert.match(src, /seatCache/);
  assert.match(src, /cardCache/);
  assert.match(src, /isConnected/);
});

test('question-fullscreen: scrolls the card when it overflows, falls back to body', () => {
  const src = upstream('effects/question-fullscreen.ts');
  assert.match(src, /CARD_SELECTOR = '\[data-question-key\] \[class\*="_card"\]'/);
  assert.match(src, /CARD_FOOTER_SELECTOR = '\[class\*="_footer"\]'/);
  assert.match(src, /cardEl\.scrollHeight > cardEl\.clientHeight \+ 1 \? cardEl : bodyEl/);
  assert.match(src, /':scope > ' \+ CARD_FOOTER_SELECTOR/);
});

test('question-fullscreen: relayouts on the visible-band settle event', () => {
  const src = upstream('effects/question-fullscreen.ts');
  assert.match(src, /import \{ VISIBLE_BAND_EVENT \} from '\.\.\/platform\/visible-band\.ts'/);
  assert.match(src, /document\.addEventListener\(VISIBLE_BAND_EVENT, schedule\)/);
  assert.match(src, /document\.removeEventListener\(VISIBLE_BAND_EVENT, schedule\)/);
});

test('layout.css: zero live Mbwy4a_ selectors (comment mentions only)', () => {
  const src = upstream('styles/layout.css.ts');
  const m = src.match(/LAYOUT_CSS = `([\s\S]*)`/);
  assert.ok(m, 'LAYOUT_CSS template found');
  const css = m[1];
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  assert.doesNotMatch(noComments, /Mbwy4a/, 'live selectors must use suffix anchors');
});

test('layout.css: every question-card rule is scoped by data-question-key', () => {
  const css = upstream('styles/layout.css.ts');
  // 28 条重锚后的规则每条都带作用域；锚定计数防回归。
  const scoped = css.match(/\[data-question-key\] \[class\*=/g) ?? [];
  assert.ok(scoped.length >= 28, `expected >=28 scoped rules, got ${scoped.length}`);
});

test('layout.css: question-card-single-scroll patch block present', () => {
  const css = upstream('styles/layout.css.ts');
  assert.match(css, /id: question-card-single-scroll/);
  assert.match(css, /\[data-question-key\] \[class\*="_card"\]:not\(\[class\*="_cardMinimized"\]\) \{\s*\n\s*overflow-x: hidden !important;\s*\n\s*overflow-y: auto !important;/);
  assert.match(css, /\[data-question-key\] \[class\*="_card"\]:not\(\[class\*="_cardMinimized"\]\) > \[class\*="_body"\] \{\s*\n\s*flex: 0 0 auto !important;\s*\n\s*overflow: visible !important;/);
  assert.match(css, /position: sticky;\s*\n\s*bottom: -10px;/);
});

test('layout.css: stats-line ring fallback block present (dock absorber)', () => {
  const css = upstream('styles/layout.css.ts');
  assert.match(css, /\[data-composer-dock\]:has\(\[data-composer-stat\]\) \{\s*\n\s*gap: 8px !important;/);
  assert.match(css, /:has\(circle\[stroke-dasharray\]\) button::after \{\s*\n\s*content: "";/);
});

test('layout.css: divider pseudo-element removed (single-scroll 4th round)', () => {
  const css = upstream('styles/layout.css.ts');
  assert.ok(!css.includes('_headerActions"])::after'), '0.5px divider line must be gone');
});
