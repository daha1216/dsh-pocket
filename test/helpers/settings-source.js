// 设置页源码合集（v4.0 TS/TSX 模块化架构）。
//
// 把 client/index.tsx（及兼容入口 index.jsx）与 client/settings/* 下的全部源码拼合，
// 供设置页契约与文案接线测试统一检索。
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const clientDir = join(here, '..', '..', 'client');
const settingsDir = join(clientDir, 'settings');

export function settingsSource() {
  const parts = [];
  for (const entry of ['index.tsx', 'index.jsx']) {
    const p = join(clientDir, entry);
    if (existsSync(p)) parts.push(readFileSync(p, 'utf8'));
  }
  for (const file of readdirSync(settingsDir).sort()) {
    if (!/\.(js|jsx|ts|tsx)$/.test(file)) continue;
    parts.push(readFileSync(join(settingsDir, file), 'utf8'));
  }
  return parts.join('\n');
}
