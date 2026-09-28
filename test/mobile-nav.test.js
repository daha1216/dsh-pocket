// 抽屉导航（镜像层，dsh-web-mobile 移植）：判定逻辑耦合在 DOM effects 里（upstream/
// 零手改，不拆纯函数），所以这里对可纯测的部分（layout-mode.mjs）做真单测，其余
// 断言结构不变量：抽屉 frame 样式、桌面隐藏闸、布局门控属性、抽屉状态订阅。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const {
  LAYOUT_STORAGE_KEY,
  resolveLayout,
  persistLayoutFromUrl,
  readStoredLayout,
} = await import('../client/mobile/layout-mode.mjs');

const apply = readFileSync(new URL('../client/mobile/mobile-apply.tsx', import.meta.url), 'utf8');
const bundle = readFileSync(new URL('../client/client.js', import.meta.url), 'utf8');

test('layout-mode：URL 参数 > localStorage > auto 的优先级（issue #74）', () => {
  assert.equal(resolveLayout({ urlValue: 'desktop', stored: 'mobile', narrowMatch: true }), 'desktop');
  assert.equal(resolveLayout({ urlValue: '', stored: 'mobile', narrowMatch: true }), 'mobile');
  // 从未选择过的设备按 auto：窄屏走 mobile 适配，宽屏走原生桌面 UI
  assert.equal(resolveLayout({ urlValue: '', stored: null, narrowMatch: true }), 'mobile');
  assert.equal(resolveLayout({ urlValue: '', stored: null, narrowMatch: false }), 'desktop');
  // 非法 URL 值不生效、不清已有存储
  assert.equal(resolveLayout({ urlValue: 'banana', stored: 'mobile', narrowMatch: false }), 'mobile');
  assert.equal(resolveLayout({ urlValue: 'banana', stored: null, narrowMatch: false }), 'desktop');
});

test('layout-mode：persistLayoutFromUrl 只固化合法显式值，存储键稳定', () => {
  assert.equal(LAYOUT_STORAGE_KEY, 'dsh-pocket.layout', '设置页恢复入口与 mobileApply 必须读写同一键');
  // Node 无 localStorage：注入桩让真实读写路径可测（模块自身对 undefined 已有守卫）
  const backing = new Map();
  globalThis.localStorage = {
    getItem: (k) => (backing.has(k) ? backing.get(k) : null),
    setItem: (k, v) => backing.set(k, String(v)),
    removeItem: (k) => backing.delete(k),
  };
  try {
    assert.equal(persistLayoutFromUrl('desktop'), 'desktop');
    assert.equal(persistLayoutFromUrl('mobile'), 'mobile');
    assert.equal(persistLayoutFromUrl(''), '', 'auto/空参数清除显式选择');
    // 非法值不生效也不清已有存储
    assert.equal(persistLayoutFromUrl('mobile'), 'mobile');
    assert.equal(persistLayoutFromUrl('banana'), 'mobile');
    // 无 ?dsh-layout= 参数（null）→ 不写不改，直接读回已存布局
    assert.equal(persistLayoutFromUrl(null), 'mobile');
  } finally {
    delete globalThis.localStorage;
  }
});

test('layout-mode：无 localStorage 环境（Node/沙箱）安全降级为空串', () => {
  assert.equal(readStoredLayout(), '', '无 storage 返回空（模块必须自守卫）');
});

test('mobile-apply：desktop 布局整段早退（不加样式、不挂 slots、不跑 effects）', () => {
  assert.ok(apply.includes("layout === 'desktop'") && apply.includes('return'), 'desktop 模式必须整段不挂');
  assert.ok(apply.includes("document.body?.setAttribute('data-dsh-pocket-layout', layout)"), '必须先写布局门控属性');
});

test('抽屉 frame 样式 + 桌面隐藏闸在产物中（宽屏/鼠标设备不出现移动控件）', () => {
  assert.ok(bundle.includes('[data-mobile-nav="frame"'), '抽屉 frame 样式存在');
  assert.ok(
    bundle.includes('@media (min-width: 1024px), (pointer: fine), (pointer: none)'),
    '桌面隐藏闸存在（toggle/files/fab/backdrop 在 ≥1024px 或非触控指针下 display:none）',
  );
  assert.ok(bundle.includes('data-sidebar-collapsed'), '抽屉状态订阅 data-sidebar-collapsed 存在（a11y 与 chrome 状态）');
});
