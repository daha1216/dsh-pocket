// strip-css-comments 安全性钉子（2026-11-05，自上游 v3.2.3
// tests/strip-css-comments.test.ts 移植改写）。
// 断言两件事：
//   1) stripCssComments 对本仓 CSS 的语义安全——剥注释前后「去掉注释后的
//      规则列表」完全一致（等于只删注释，不动任何规则字符）。
//   2) 所有 *_CSS 模板串不含 ${ 插值（stripEmittedCssModule 的拒绝条件），
//      也不含 url(...) 里夹 /* 的写法（那类字符串会被误删）。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { stripCssComments, stripEmittedCssModule } from '../scripts/strip-css-comments.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const stylesDir = join(here, '..', 'client', 'mobile', 'upstream', 'styles');
const styleFiles = ['base.css.ts', 'layout.css.ts', 'compat.css.ts', 'misc.css.ts'];

const extractCss = (source) => {
  const m = source.match(/_CSS = `([\s\S]*)`/);
  assert.ok(m, 'template literal not found');
  return m[1];
};

/** 从 CSS 文本提出规则列表：剥注释 → 按花括号深度切段（含选择器与块体）。 */
const ruleList = (css) => {
  let depth = 0;
  const rules = [];
  let current = '';
  for (const ch of css) {
    current += ch;
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        rules.push(current.replace(/\s+/g, ' ').trim());
        current = '';
      }
    }
  }
  if (current.trim()) rules.push(current.replace(/\s+/g, ' ').trim());
  return rules;
};

for (const file of styleFiles) {
  test(`stripCssComments keeps rules identical: ${file}`, () => {
    const css = extractCss(readFileSync(join(stylesDir, file), 'utf8'));
    const stripped = stripCssComments(css);
    assert.equal(
      ruleList(stripped).join('\n'),
      ruleList(css.replace(/\/\*[\s\S]*?\*\//g, '')).join('\n'),
      'rule list must not change beyond comment removal',
    );
    assert.ok(!stripped.includes('/*'), 'no comments survive');
    assert.ok(!css.includes('${'), 'styles module must stay interpolation-free');
  });
}

test('stripEmittedCssModule refuses interpolation', () => {
  assert.throws(
    () => stripEmittedCssModule('export const X_CSS = `a{b:${1}}`;'),
    /refusing to strip/,
  );
});

test('stripEmittedCssModule strips plain module', () => {
  const out = stripEmittedCssModule('export const X_CSS = `/* c */ a{b:c}`;');
  assert.equal(out, 'export const X_CSS = ` a{b:c}`;');
});
