// v4.0 设置页视图件与 DSH 官方设计系统契约测试（R20 卡片 / 0.5px 描边 / 自有原语 / 零外部 UI 库依赖）。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { settingsSource } from './helpers/settings-source.js';

const src = settingsSource();
const styles = readFileSync(new URL('../client/settings/styles.ts', import.meta.url), 'utf8');
const primitives = readFileSync(new URL('../client/settings/primitives.tsx', import.meta.url), 'utf8');

test('基础组件：Button 与兼容包装 Btn 同时支持 JSX children 与旧式位置参数', () => {
  assert.match(primitives, /export function Button\(/, '必须导出自有 Button 原语');
  assert.match(primitives, /export const Btn = \(props[^)]*\.\.\.extraChildren/, 'Btn 兼容签名必须接收位置参数 children');
  assert.ok(
    primitives.includes('extraChildren.length > 0 ? extraChildren : propChildren'),
    '必须合并两种传法（防止旧式调用点静默丢文案）',
  );
  const jsxButtons = src.match(/<Button\b/g) ?? [];
  assert.ok(jsxButtons.length >= 15, `v4 设置页应广泛使用自有 <Button> 组件（实际 ${jsxButtons.length} 处）`);
});

test('DSH 官方样式红线：R20 0.5px 无阴影卡片、corner-shape:round、16px 触控输入保底、零外部原语依赖', () => {
  assert.doesNotMatch(
    src,
    /@deepseek-ai\/dsh-client-ui-primitives/,
    'client/settings/** 严禁运行时引用 @deepseek-ai/dsh-client-ui-primitives',
  );
  assert.match(styles, /border-radius:\s*var\(--dsw-radius-xl,\s*20px\)/, '设置卡片必须使用 R20 圆角');
  assert.match(styles, /border:\s*0\.5px solid var\(--dsw-alias-settings-card-stroke/, '设置卡片必须使用 0.5px 描边');
  assert.doesNotMatch(styles, /body\[data-ds-dark-theme\]/, '严禁硬编码 body[data-ds-dark-theme] 主题覆盖');
  assert.doesNotMatch(styles, /backdrop-filter:\s*blur/, '模态框遮罩严禁使用 backdrop-filter: blur');
  assert.match(styles, /corner-shape:\s*round/, '胶囊与圆形必须配对 corner-shape: round');
  assert.match(styles, /@media\s*\(hover:\s*hover\)/, ':hover 规则必须包裹在 @media (hover: hover) 内');
  assert.match(styles, /@media\s*\(pointer:\s*coarse\)[\s\S]*?font-size:\s*16px/, '触控指针下输入框字号保底 16px 防 iOS 自动放大');
});
