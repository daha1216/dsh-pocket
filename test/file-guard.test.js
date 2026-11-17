// 移动端文件预览底栏抽屉与工作区守卫（issue #17 + v4.0 FilePreviewSheet）：
// 手机点消息流里的文件链接拦截桌面 open，默认拉起底部代码预览抽屉（集成 panel-stack 返回关闭），
// 关闭预览模式时回退轻提示 + 可选复制按钮，并隐藏「添加工作区」入口。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const sheetSrc = readFileSync(
  new URL('../client/mobile/pocket/file-preview-sheet.ts', import.meta.url),
  'utf8',
);
const entrySrc = readFileSync(
  new URL('../client/mobile/fileGuard.ts', import.meta.url),
  'utf8',
);
const apply = readFileSync(
  new URL('../client/mobile/mobile-apply.tsx', import.meta.url),
  'utf8',
);
const locales = readFileSync(
  new URL('../client/pocket-locales.js', import.meta.url),
  'utf8',
);
const mobileBundle = readFileSync(
  new URL('../client/client.mobile.js', import.meta.url),
  'utf8',
);

test('fileGuard 只依赖稳定结构（button/a + 路径文案），不依赖 hash 类名', () => {
  assert.ok(entrySrc.includes('startFileGuard'), '兼容入口必须导出 startFileGuard');
  assert.ok(sheetSrc.includes("closest('button, a')"), '必须用 closest("button, a") 找文件链接');
  assert.ok(sheetSrc.includes('looksLikeFilePath'), '必须用语义化路径检测，而非按类名');
  assert.ok(!/\[class[*^$]?=/.test(sheetSrc), '检测逻辑不能出现 class 属性选择器（hash 类名每次构建都变）');
});

test('H4 误伤收敛：拦截与注入只落在消息流容器（[data-phase]）内 + ARIA 角色豁免', () => {
  assert.ok(sheetSrc.includes("closest('[data-phase]')"), '目标必须先落在 [data-phase] 消息流容器内');
  assert.ok(sheetSrc.includes('ROLE_EXEMPT'), 'tab/treeitem/menuitem/menu 角色必须豁免');
});

test('mobile-apply 已接线 startFileGuard（窄屏生效、传入 readFile 与词典 t）', () => {
  assert.ok(apply.includes("from './fileGuard.ts'"), '必须从 fileGuard.ts 导入');
  assert.ok(apply.includes('startFileGuard(readFile, fileGuardT)'), '调用必须携带 readFile 回调与词典取词函数');
  assert.ok(sheetSrc.includes('POCKET_ENDPOINTS.fileRead'), 'readFile 回调必须打到 fileRead 端点');
});

test('fileGuard 与预览抽屉用户可见文案已进 pocket 词典（zh/en 成对）', () => {
  const keys = [
    'fileGuardMsg',
    'fileCopy',
    'fileCopyDone',
    'fileCopyFailed',
    'fileCopyFailedFallback',
    'fileFallbackTitle',
    'fileFallbackClose',
    'fileTooLarge',
    'fileTruncated',
    'filePreviewCopyAll',
    'filePreviewError',
    'filePreviewBinary',
    'filePreviewEmpty',
  ];
  for (const k of keys) {
    const hits = (locales.match(new RegExp(`['"]?\\b${k}\\b['"]?\\s*:`, 'g')) || []).length;
    assert.ok(hits >= 2, `词典键 ${k} 必须 zh/en 各一条（实际 ${hits} 条）`);
  }
});

test('「添加工作区」隐藏探针覆盖中英双语', () => {
  assert.ok(
    sheetSrc.includes('添加工作区') && sheetSrc.includes('Add workspace'),
    '必须覆盖中英双语的添加工作区入口',
  );
});

test('移动分包产物含文件预览抽屉 + 守卫 + 降级复制按钮结构标记', () => {
  assert.ok(
    /closest\(\s*["']button, a["']\s*\)/.test(mobileBundle),
    'client.mobile.js 必须保留 closest("button, a") 检测',
  );
  assert.ok(mobileBundle.includes('stopImmediatePropagation'), '产物必须能在捕获阶段阻止桌面 open');
  assert.ok(mobileBundle.includes('file-preview-sheet'), '产物必须含底部文件预览抽屉标记');
  assert.ok(mobileBundle.includes('file-guard-toast'), '产物必须含 toast 标记');
  assert.ok(mobileBundle.includes('add-workspace'), '产物必须含隐藏添加工作区的逻辑');
  assert.ok(mobileBundle.includes('copy-file'), '产物必须保留降级复制按钮标记 data-mobile-nav="copy-file"');
  assert.ok(mobileBundle.includes('data-mobile-nav-copy'), '产物必须用标记避免重复注入复制按钮');
});
