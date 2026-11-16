// 镜像期变换契约：vendor/ 的上游代码要变成 client/mobile/upstream/ 的可用代码，
// 靠 T1（locale NS 改名）和 T2（stats 让位）两条确定性变换。这两条一旦静默失效，
// 手机端表现为整页起不来（NS 撞车）或「隐藏统计条」开关没反应，且没有任何报错。
// 所以规则本身单独钉住，不依赖补丁是否应用成功。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { TRANSFORM_VERSION, assertTransformedTree, transformSource } from '../scripts/lib/upstream-transform.mjs';

const BT = String.fromCharCode(96);

test('变换版本号是整数（改动规则时必须递增）', () => {
  assert.equal(typeof TRANSFORM_VERSION, 'number');
  assert.ok(Number.isInteger(TRANSFORM_VERSION));
});

test('T1：locale NS 从 dshWebMobileNav 改成 pocketMobileNav', () => {
  const source = 'locale.register("dshWebMobileNav", dict);\nconst ns = dshWebMobileNav;\n';
  const out = transformSource('core/i18n.ts', source);
  assert.ok(!out.includes('dshWebMobileNav'), '不允许残留上游 NS');
  assert.equal((out.match(/pocketMobileNav/g) ?? []).length, 2);
});

test('T1：legacy mobileNav 只替换带引号形态，dataset.mobileNav 必须原样保留', () => {
  const source = "register('mobileNav'); use(" + BT + "mobileNav" + BT + "); el.dataset.mobileNav = 'x';\n";
  const out = transformSource('core/nav.ts', source);
  assert.ok(out.includes("register('pocketMobileNav')"));
  assert.ok(out.includes(BT + 'pocketMobileNav' + BT));
  assert.ok(out.includes('dataset.mobileNav'), 'dataset.mobileNav 是 kebab 钩子，改了会断 DOM 契约');
});

test('T1：非脚本文件不参与变换', () => {
  assert.equal(transformSource('AGENTS.md', 'dshWebMobileNav'), 'dshWebMobileNav');
});

test('T2：stats 让位 guard 落在选择器项首，而不是复合链中段', () => {
  const source = ['export const css = {', '  a: {', '    [data-mobile-nav="stats"] {', '      display: none;', '    },', '  },', '};', ''].join('\n');
  const out = transformSource('styles/compat.css.ts', source);
  assert.ok(
    out.includes('body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] {'),
    'guard 必须排在 [data-mobile-nav="stats"] 前面，插到复合链中段永远匹配不到',
  );
});

test('T2：逗号列表里只有含 stats 的项加 guard，其余项不动', () => {
  const source = '    .a [data-mobile-nav="stats"], .b, .c [data-mobile-nav="stats"] {';
  const out = transformSource('styles/list.css.ts', source);
  assert.ok(out.includes('body:not([data-pocket-stats="off"]) .a [data-mobile-nav="stats"]'));
  assert.ok(out.includes('body:not([data-pocket-stats="off"]) .c [data-mobile-nav="stats"]'));
  assert.ok(out.includes('.b,'), '.b 不含 stats，不能加 guard');
  assert.ok(!out.includes('body:not([data-pocket-stats="off"]) .b'));
});

test('T2：注释行与声明行即使含 stats 也不改写', () => {
  const source = ['    // [data-mobile-nav="stats"] 说明', '    /* [data-mobile-nav="stats"] */', '    content: \'[data-mobile-nav="stats"]\';', ''].join('\n');
  const out = transformSource('styles/comment.css.ts', source);
  assert.ok(!out.includes('body:not([data-pocket-stats="off"])'), '注释与声明不是选择器，加 guard 会破坏语法');
});

test('两条变换都是幂等的（重复跑不会累积前缀）', () => {
  const source = ['export const css = {', '  [data-mobile-nav="stats"],', '  [data-mobile-nav="stats"]:hover {', '    color: red;', '  },', '};', ''].join('\n');
  const once = transformSource('styles/idem.css.ts', source);
  assert.equal(transformSource('styles/idem.css.ts', once), once);
  const ns = "const ns = 'dshWebMobileNav';\n";
  const nsOnce = transformSource('core/ns.ts', ns);
  assert.equal(transformSource('core/ns.ts', nsOnce), nsOnce);
});

test('assertTransformedTree 会拦住残留 NS 与中段 guard', () => {
  const dir = mkdtempSync(join(tmpdir(), 'transform-assert-'));
  try {
    mkdirSync(join(dir, 'core'), { recursive: true });
    mkdirSync(join(dir, 'styles'), { recursive: true });
    writeFileSync(join(dir, 'core', 'ns.ts'), "const x = 'dshWebMobileNav';\n");
    writeFileSync(join(dir, 'styles', 'bad.css.ts'), '  [data-x] body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] {}\n');
    assert.throws(() => assertTransformedTree(dir), /残留 dshWebMobileNav/);
    rmSync(join(dir, 'core', 'ns.ts'));
    assert.throws(() => assertTransformedTree(dir), /选择器链中段/);
    rmSync(join(dir, 'styles', 'bad.css.ts'));
    writeFileSync(join(dir, 'styles', 'ok.css.ts'), '  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] {}\n');
    assert.equal(assertTransformedTree(dir), true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
