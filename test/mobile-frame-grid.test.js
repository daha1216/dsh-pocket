// 宿主框架 grid 定位不变量（2026-11-09 白屏修复）。
// 宿主新版给 frame 子元素加了显式 grid 定位（中央列 grid-area 1/2、右栏 1/3、
// 新增整行底栏），自动流式排布不再成立。pocket 的移动布局只给第一列留宽度，
// 中央列一旦被钉在 0 宽的第二列，整页就是白屏。这组断言把两件事钉住：
// 三轨模板本身，以及「按会话区语义把中央列放回第一列」的覆盖声明；
// 再校验构建产物里规则没被剥注释/压缩吃掉。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const layoutCss = () =>
  readFileSync(join(here, '..', 'client', 'mobile', 'upstream', 'styles', 'layout.css.ts'), 'utf8');
const bundle = () => readFileSync(join(here, '..', 'client', 'client.js'), 'utf8');

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

test('built bundle ships the override', () => {
  const js = bundle();
  assert.ok(js.includes('grid-template-columns: minmax(0, 1fr) 0 0 !important'), 'three-track frame');
  assert.ok(js.includes(`${CENTRE} {`), 'centre override in bundle');
  const at = js.indexOf(`${CENTRE} {`);
  assert.match(js.slice(at, at + 120), /grid-column: 1 !important;/);
});
