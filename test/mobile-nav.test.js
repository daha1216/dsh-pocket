// 抽屉导航与折叠屏/平板 auto 布局契约（v4.0 双分包架构）。
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
const mobileBundle = readFileSync(new URL('../client/client.mobile.js', import.meta.url), 'utf8');

test('layout-mode：URL 参数 > localStorage > auto 的优先级（issue #74）', () => {
  assert.equal(resolveLayout({ urlValue: 'desktop', stored: 'mobile', narrowMatch: true }), 'desktop');
  assert.equal(resolveLayout({ urlValue: '', stored: 'mobile', narrowMatch: true }), 'mobile');
  assert.equal(resolveLayout({ urlValue: '', stored: null, narrowMatch: true }), 'mobile');
  assert.equal(resolveLayout({ urlValue: '', stored: null, narrowMatch: false }), 'desktop');
  assert.equal(resolveLayout({ urlValue: 'banana', stored: 'mobile', narrowMatch: false }), 'mobile');
  assert.equal(resolveLayout({ urlValue: 'banana', stored: null, narrowMatch: false }), 'desktop');
});

test('layout-mode：persistLayoutFromUrl 只固化合法显式值，存储键稳定', () => {
  assert.equal(LAYOUT_STORAGE_KEY, 'dsh-pocket.layout', '设置页恢复入口与 mobileApply 必须读写同一键');
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
    assert.equal(persistLayoutFromUrl('mobile'), 'mobile');
    assert.equal(persistLayoutFromUrl('banana'), 'mobile');
    assert.equal(persistLayoutFromUrl(null), 'mobile');
  } finally {
    delete globalThis.localStorage;
  }
});

test('layout-mode：无 localStorage 环境（Node/沙箱）安全降级为空串', () => {
  assert.equal(readStoredLayout(), '', '无 storage 返回空（模块必须自守卫）');
});

test('mobile-apply：仅显式强制 desktop 早退，auto 模式保留跨断点监听（折叠屏/iPad 修复）', () => {
  assert.ok(
    apply.includes('forcedDesktop') && apply.includes('if (forcedDesktop) return'),
    '仅显式强制 desktop 模式早退，auto 模式在 >=1024px 仍挂载断点同步与平板适配',
  );
  assert.ok(
    apply.includes("document.body?.setAttribute('data-dsh-pocket-layout', layout)"),
    '必须先写布局门控属性',
  );
});

test('抽屉 frame 样式 + 桌面隐藏闸在移动分包产物中（宽屏/鼠标设备不出现移动控件）', () => {
  assert.ok(mobileBundle.includes('[data-mobile-nav="frame"'), '抽屉 frame 样式存在');
  assert.ok(
    mobileBundle.includes('@media (min-width: 1024px), (pointer: fine), (pointer: none)'),
    '桌面隐藏闸存在（toggle/files/fab/backdrop 在 ≥1024px 或非触控指针下 display:none）',
  );
  assert.ok(mobileBundle.includes('data-sidebar-collapsed'), '抽屉状态订阅 data-sidebar-collapsed 存在');
});

test('标题簇的 mask 渐隐在手机档被关掉（否则左缘的 toggle 整颗被 mask 掉）', () => {
  assert.match(
    mobileBundle,
    /header \[class\*="_titleCluster"\] \{\s+-webkit-mask-image: none !important;\s+mask-image: none !important;/,
    'client.mobile.js 必须带上关掉标题簇 mask 的那条规则',
  );
});
