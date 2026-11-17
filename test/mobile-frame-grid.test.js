// 宿主框架 grid 定位不变量（2026-11-09 白屏修复 + v4.0 双分包校验）。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const layoutCss = () =>
  readFileSync(join(here, '..', 'client', 'mobile', 'upstream', 'styles', 'layout.css.ts'), 'utf8');
const mobileBundle = () => readFileSync(join(here, '..', 'client', 'client.mobile.js'), 'utf8');
const mainBundle = () => readFileSync(join(here, '..', 'client', 'client.js'), 'utf8');

const FRAME = 'html [data-mobile-nav="frame"]';
const CENTRE = `${FRAME} > :has([data-conversation-region])`;

test('frame keeps exactly one width-bearing track', () => {
  const css = layoutCss();
  const rule = css.slice(css.indexOf(`${FRAME} {`), css.indexOf(`${FRAME} {`) + 900);
  assert.match(rule, /grid-template-columns: minmax\(0, 1fr\) 0 0 !important;/);
});

test('the conversation-bearing child is pinned into that track', () => {
  const css = layoutCss();
  const at = css.indexOf(`${CENTRE} {`);
  assert.ok(at > 0, 'centre-column override must exist');
  const rule = css.slice(at, css.indexOf('}', at));
  assert.match(rule, /grid-column: 1 !important;/);
  assert.match(rule, /grid-row: 1 !important;/);
});

test('the override targets a semantic anchor, not a host class hash or child index', () => {
  const css = layoutCss();
  const at = css.indexOf(`${CENTRE} {`);
  const rule = css.slice(at, css.indexOf('}', at));
  assert.doesNotMatch(rule, /\[class\*=/);
  assert.doesNotMatch(rule, /:nth-child\(/);
});

test('built mobile chunk ships the override while desktop entry stays lean', () => {
  const js = mobileBundle();
  assert.ok(js.includes('grid-template-columns: minmax(0, 1fr) 0 0 !important'), 'three-track frame');
  assert.ok(js.includes(`${CENTRE} {`), 'centre override in mobile chunk');
  const at = js.indexOf(`${CENTRE} {`);
  assert.match(js.slice(at, at + 120), /grid-column: 1 !important;/);
  assert.ok(!mainBundle().includes(`${CENTRE} {`), 'desktop client.js does not inline mobile layout CSS');
});
