// 设置页源码合集。
//
// 终局评审 §6.2 把 1253 行的 client/index.jsx 拆成薄壳 + client/settings/* 之后，
// 源码契约测试若只读 index.jsx，就只剩插槽注册与页面骨架可断言——真正的 UI 接线
// 与文案全部搬进了 settings/ 目录。这里把两者拼成一份源码给测试断言，契约不变。
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const clientDir = join(here, '..', '..', 'client');
const settingsDir = join(clientDir, 'settings');

export function settingsSource() {
  const parts = [readFileSync(join(clientDir, 'index.jsx'), 'utf8')];
  for (const file of readdirSync(settingsDir).sort()) {
    if (!/\.(js|jsx)$/.test(file)) continue;
    parts.push(readFileSync(join(settingsDir, file), 'utf8'));
  }
  return parts.join('\n');
}
