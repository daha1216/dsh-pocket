// 移动端文件守卫（issue #17，镜像层实现 client/mobile/fileGuard.ts）：手机点文件
// 链接会触发桌面 open 失败，改为弹提示 + 注入「复制」按钮，并隐藏「添加工作区」
// 入口。断言打在镜像层实际契约上（识别不依赖 hash 类名、拦截只落消息流容器内、
// 文案走 pocket 词典、产物含逻辑），不引 jsdom，读源码/产物断言。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../client/mobile/fileGuard.ts', import.meta.url), 'utf8');
const apply = readFileSync(new URL('../client/mobile/mobile-apply.tsx', import.meta.url), 'utf8');
const locales = readFileSync(new URL('../client/pocket-locales.js', import.meta.url), 'utf8');
const bundle = readFileSync(new URL('../client/client.js', import.meta.url), 'utf8');

test('fileGuard 只依赖稳定结构（button/a + 路径文案），不依赖 hash 类名', () => {
  assert.ok(src.includes("closest('button, a')"), '必须用 closest("button, a") 找文件链接');
  assert.ok(src.includes('looksLikeFilePath'), '必须用语义化路径检测，而非按类名');
  // hash 类名形如 [class$="_xxx"]；检测逻辑里绝不能出现按类名的属性选择器
  assert.ok(!/\[class[*^$]?=/.test(src), 'fileGuard.ts 的检测不能出现 class 属性选择器（hash 类名每次构建都变）');
});

test('H4 误伤收敛：拦截与注入只落在消息流容器（[data-phase]）内 + ARIA 角色豁免', () => {
  assert.ok(src.includes("closest('[data-phase]')"), '目标必须先落在 [data-phase] 消息流容器内（抽屉/头部/菜单天然豁免）');
  assert.ok(src.includes('ROLE_EXEMPT'), 'tab/treeitem/menuitem/menu 角色必须豁免（文件查看器 tab/会话行/菜单）');
});

test('mobile-apply 已接线 startFileGuard（窄屏生效、传入 readFile 与词典 t）', () => {
  assert.ok(apply.includes("import { startFileGuard } from './fileGuard.ts'"), '必须 import 模块');
  assert.ok(apply.includes('startFileGuard(readFile, fileGuardT)'), '调用必须携带 readFile 回调与词典取词函数');
  assert.ok(apply.includes('POCKET_ENDPOINTS.fileRead'), 'readFile 回调必须打到 fileRead 端点');
});

test('fileGuard 用户可见文案已进 pocket 词典（zh 源真 / en 同键，缺键=文案裸奔）', () => {
  const keys = ['fileGuardMsg', 'fileCopy', 'fileCopyDone', 'fileCopyFailed', 'fileCopyFailedFallback', 'fileFallbackTitle', 'fileFallbackClose', 'fileTooLarge', 'fileTruncated'];
  for (const k of keys) {
    const hits = (locales.match(new RegExp(`'${k}':`, 'g')) || []).length;
    assert.ok(hits >= 2, `词典键 ${k} 必须 zh/en 各一条（实际 ${hits} 条）`);
  }
});

test('「添加工作区」隐藏探针覆盖中英双语', () => {
  assert.ok(src.includes('添加工作区') && src.includes('Add workspace'), '必须覆盖中英双语的添加工作区入口');
});

test('打包产物含守卫 + 复制按钮结构标记', () => {
  // esbuild 压缩不改属性/方法名字符串，只查 ASCII 结构标记
  assert.ok(/closest\(\s*["']button, a["']\s*\)/.test(bundle), '产物必须保留 closest("button, a") 检测——先跑 node client/build.mjs');
  assert.ok(bundle.includes('stopImmediatePropagation'), '产物必须能在捕获阶段阻止桌面 open');
  assert.ok(bundle.includes('file-guard-toast'), '产物必须含 toast 标记');
  assert.ok(bundle.includes('add-workspace'), '产物必须含隐藏添加工作区的逻辑');
  assert.ok(bundle.includes('copy-file'), '产物必须含复制按钮标记 data-mobile-nav="copy-file"');
  assert.ok(bundle.includes('data-mobile-nav-copy'), '产物必须用标记避免重复注入复制按钮');
});
