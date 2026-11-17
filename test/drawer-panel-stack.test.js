// Phase 1 ④（2026-11-17，评审 §6.2）：抽屉的三个 effect 收成一个面板栈。
//
// 这一层锁的是「Escape 只有一个主」：抽屉里可关闭的层以前各挂一个捕获期 Esc，
// 一次按键既关层又关抽屉。现在层只给自己打 PANEL_MARKER，由 drawer-close 那唯一
// 的 Esc 监听先问栈顶（platform/panel-stack.ts）。DOM 原语在 Node 里跑不起来
// （仓库没有 jsdom），所以钉源码形状。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const upstreamRoot = join(here, '..', 'client', 'mobile', 'upstream');
const upstream = (p) => readFileSync(join(upstreamRoot, p), 'utf8');
/** 只留代码行：文档块里也会引用这些名字，计数时会重复命中。 */
const code = (src) => src
  .split('\n')
  .filter((line) => !/^\s*(\*|\/\/)/.test(line))
  .join('\n');

test('面板标记与事件只有 platform/panel-stack.ts 声明一处', () => {
  const files = readdirSync(upstreamRoot, { recursive: true })
    .map((p) => String(p).replaceAll('\\', '/'))
    .filter((p) => p.endsWith('.ts') || p.endsWith('.tsx'));
  for (const name of ['PANEL_MARKER', 'PANEL_DISMISS_EVENT']) {
    const hits = files.filter((p) => new RegExp('export const ' + name + ' =').test(upstream(p)));
    assert.deepEqual(hits, ['platform/panel-stack.ts'], name + ' 应只有一处声明');
  }
  const src = upstream('platform/panel-stack.ts');
  assert.match(src, /export const PANEL_MARKER = 'data-mobile-nav-panel'/);
  assert.match(src, /export const PANEL_DISMISS_EVENT = 'dsh-mobile-panel-dismiss'/);
});

test('面板栈是 platform 原语：不装 effect、不读 ctx', () => {
  const src = upstream('platform/panel-stack.ts');
  assert.doesNotMatch(src, /installMobileEffect\(/);
  assert.doesNotMatch(src, /\bctx\./);
  assert.doesNotMatch(src, /from '\.\.\/effects\//);
});

test('dismissTopPanel 关的是栈顶（DOM 里最后一个开着的层）并吃掉那个键', () => {
  const src = upstream('platform/panel-stack.ts');
  assert.match(src, /const panels = openPanels\(\)/);
  assert.match(src, /const top = panels\[panels\.length - 1\]/);
  assert.match(src, /if \(top === undefined\) return false/);
  assert.match(
    src,
    /top\.dispatchEvent\(new CustomEvent\(PANEL_DISMISS_EVENT, \{ bubbles: true, composed: true \}\)\)/,
  );
  // 没有层时必须返回 false，否则 Esc 会被无声吞掉、抽屉再也关不上。
  assert.match(src, /return true\s*\n\}/);
  // drawer-close 拿到 true 就 return，不再碰抽屉。
  const close = upstream('effects/drawer-close.ts');
  assert.match(close, /if \(dismissTopPanel\(\)\) \{\s*\n\s*event\.preventDefault\(\)\s*\n\s*return\s*\n\s*\}/);
  const atPanel = close.indexOf('if (dismissTopPanel())');
  const atDrawer = close.indexOf('if (drawerOpen()) toggleSidebar()');
  assert.ok(atPanel > 0 && atDrawer > atPanel, '面板要排在抽屉前面');
  // 宿主模态弹窗仍然优先：它自己的 Esc 语义不能被插件抢。
  assert.ok(
    close.indexOf('document.querySelector(\'[aria-modal="true"]\') !== null') < atPanel,
    '模态检查必须在面板栈之前',
  );
});

test('三个抽屉 effect 里只有 drawer-close 处理 keydown', () => {
  const close = code(upstream('effects/drawer-close.ts'));
  assert.match(close, /addEventListener\('keydown', onKeyDown, true\)/);
  for (const file of ['effects/drawer-session-log.ts', 'effects/drawer-quick-settings.ts']) {
    const src = code(upstream(file));
    assert.doesNotMatch(src, /addEventListener\('keydown'/, file + ' 不该自己挂 keydown');
    assert.doesNotMatch(src, /'Escape'/, file + ' 不该自己判 Escape');
  }
});

test('抽屉下载菜单进栈：打标记 + 认派给自己的 dismiss 事件', () => {
  const src = upstream('effects/drawer-session-log.ts');
  assert.match(src, /import \{ PANEL_DISMISS_EVENT, PANEL_MARKER \} from '\.\.\/platform\/panel-stack\.ts'/);
  // 标记打在菜单面板本身（和 data-mobile-nav="session-log-menu" 同一个节点），
  // 否则 dismissTopPanel 关到的不是它。
  assert.match(src, /panel\.dataset\.mobileNav = 'session-log-menu'\s*\n\s*panel\.setAttribute\(PANEL_MARKER, 'session-log'\)/);
  assert.match(src, /document\.addEventListener\(PANEL_DISMISS_EVENT, onPanelDismiss\)/);
  assert.match(src, /if \(event\.target !== panel\) return/);
  assert.match(src, /document\.removeEventListener\(PANEL_DISMISS_EVENT, onPanelDismiss\)/);
});

test('抽屉一键设置没有自己的层（宿主的菜单自己管 Esc），所以不进栈', () => {
  const src = upstream('effects/drawer-quick-settings.ts');
  assert.doesNotMatch(src, /panel-stack\.ts/);
  assert.doesNotMatch(src, /PANEL_MARKER/);
  // 它只借宿主的 [role=menu]（portal 单例），关闭权在宿主手里。
  assert.match(src, /document\.querySelectorAll<HTMLElement>\('\[role="menu"\]'\)/);
});
