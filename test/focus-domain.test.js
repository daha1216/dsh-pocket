// Phase 1 ④（2026-11-17，评审 §6.2）：四个键盘守卫合并为一个焦点域管理器。
//
// 这一层锁两件事：
//   1. 判定表（core/focus-press.ts）是纯函数，六格语义直接在 Node 里跑；
//   2. 「只有一处」的归并不变量——仓库没有 jsdom，DOM 原语只能靠源码形状钉住：
//      影子槽/窗口/捕获监听只有 platform/focus-domain.ts 一份，四个守卫只剩策略，
//      index.tsx 只装一次，且不再出现旧的 install*KeyboardGuard。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { classifyComposerPress } from '../client/mobile/upstream/core/focus-press.ts';

const here = dirname(fileURLToPath(import.meta.url));
const upstreamRoot = join(here, '..', 'client', 'mobile', 'upstream');
const upstream = (p) => readFileSync(join(upstreamRoot, p), 'utf8');

const GUARDS = [
  'effects/composer-keyboard-guard.ts',
  'effects/session-focus-guard.ts',
  'effects/model-menu-keyboard-guard.ts',
  'effects/shortcut-modal-keyboard-guard.ts',
];

test('classifyComposerPress: 卡片外的按下不归 composer 管', () => {
  assert.equal(
    classifyComposerPress({ insideCard: false, onInput: true, onControl: true }),
    'ignore',
  );
});

test('classifyComposerPress: 点编辑面是「我要打字」，立刻收窗', () => {
  assert.equal(
    classifyComposerPress({ insideCard: true, onInput: true, onControl: false }),
    'close',
  );
  // 编辑面同时也是 input 元素（contenteditable 不是），input 必须赢。
  assert.equal(
    classifyComposerPress({ insideCard: true, onInput: true, onControl: true }),
    'close',
  );
});

test('classifyComposerPress: 只有按在控件上才武装影子', () => {
  assert.equal(
    classifyComposerPress({ insideCard: true, onInput: false, onControl: true }),
    'arm',
  );
});

test('classifyComposerPress: 卡片空白处当「要打字」处理（B2 长按粘贴）', () => {
  assert.equal(
    classifyComposerPress({ insideCard: true, onInput: false, onControl: false }),
    'close',
  );
});

test('影子标记只有 platform/focus-domain.ts 声明一处', () => {
  const hits = readdirSync(upstreamRoot, { recursive: true })
    .map((p) => String(p).replaceAll('\\', '/'))
    .filter((p) => p.endsWith('.ts') || p.endsWith('.tsx'))
    .filter((p) => /SHADOW_MARKER\s*=/.test(upstream(p)));
  assert.deepEqual(hits, ['platform/focus-domain.ts']);
});

test('四个守卫只剩策略：没有自己的 installer，也不再挂按下/聚焦监听', () => {
  for (const file of GUARDS) {
    const src = upstream(file);
    assert.doesNotMatch(src, /export function install/, file + ' 不该再导出 installer');
    assert.match(src, /FocusPolicy/, file + ' 应导出 FocusPolicy');
    assert.doesNotMatch(
      src,
      /addEventListener\('(pointerdown|touchstart|mousedown|focusin)'/,
      file + ' 不该再自己挂捕获监听（交给 focus domain）',
    );
    assert.doesNotMatch(src, /import \{ shadowFocus \}/, file + ' 不该再自己装原型影子');
  }
});

test('session-focus-guard 的三个开窗触发都走 domain.hold', () => {
  const src = upstream('effects/session-focus-guard.ts');
  // 只数代码行：文档块里也会引用这个调用形状。
  const code = src
    .split('\n')
    .filter((line) => !/^\s*(\*|\/\/)/.test(line))
    .join('\n');
  const holds = code.match(/domain\.hold\(FOCUS_GUARD_WINDOW_MS, true\)/g) ?? [];
  assert.equal(holds.length, 3, '切会话 / panel-exit 标记 / panel-exit 事件各一次');
  assert.match(src, /if \(!domain\.holding\(\) && hasPanelExitMarker\(\)\)/);
});

test('composer 策略先开窗再装影子（hold 内部会收掉上一轮）', () => {
  const src = upstream('effects/composer-keyboard-guard.ts');
  const at = src.indexOf('domain.hold(SHADOW_WINDOW_MS)');
  const shadowAt = src.indexOf('domain.shadow(editor)');
  assert.ok(at > 0 && shadowAt > at, '顺序必须是 hold → shadow');
  assert.match(src, /if \(verdict !== 'arm'\) \{\s*\n\s*domain\.release\(\)/);
});

test('焦点域只有一个 effect 武装、且不受 ctx 之外的状态影响', () => {
  const domainEffect = upstream('effects/focus-domain.ts');
  assert.equal((domainEffect.match(/installMobileEffect\(/g) ?? []).length, 1);
  assert.match(domainEffect, /installMobileEffect\(ctx, 'dsh-web-mobile: focus domain'/);
  // 策略表是参数，不是模块级可变状态：每次武装都新建 domain。
  assert.match(domainEffect, /const domain = createFocusDomain\(\)/);
  const platform = upstream('platform/focus-domain.ts');
  assert.doesNotMatch(platform, /installMobileEffect\(/);
  assert.doesNotMatch(platform, /\bctx\./);
});

test('焦点域只有一个影子槽和一个窗口，hold 先收旧的', () => {
  const src = upstream('platform/focus-domain.ts');
  assert.equal((src.match(/let shadowed/g) ?? []).length, 1);
  assert.equal((src.match(/let windowOpen/g) ?? []).length, 1);
  assert.match(src, /function hold\(ms: number, trackMounts = false\): void \{\s*\n\s*release\(\)/);
  assert.match(src, /if \(windowOpen && target\.closest\(COMPOSER_INPUT_SELECTOR\) !== null\) release\(\)/);
});

test('index.tsx 只装一次焦点域，四个策略全部传进去', () => {
  const src = upstream('index.tsx');
  assert.equal((src.match(/installFocusDomain\(/g) ?? []).length, 1);
  for (const name of [
    'shortcutModalKeyboardPolicy',
    'modelMenuKeyboardPolicy',
    'composerKeyboardPolicy',
    'createSessionFocusPolicy(ctx)',
  ]) {
    assert.ok(src.includes(name), 'index.tsx 漏了 ' + name);
  }
  for (const gone of [
    'installComposerKeyboardGuard',
    'installSessionFocusGuard',
    'installModelMenuKeyboardGuard',
    'installShortcutModalKeyboardGuard',
  ]) {
    assert.ok(!src.includes(gone), 'index.tsx 仍引用 ' + gone);
  }
});
