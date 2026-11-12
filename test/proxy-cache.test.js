// 代理缓存预算（评审 §3.4：三层缓存 → 一个预算、一个开关）。
//
// 覆盖三件事：
//   1) 预算是单一事实源：两个池子的份额之和就是总预算，单条上限是池子份额的四分之一；
//   2) 旧的两套硬编码上限（16 条 / 32MB、8 条 / 24MB）已经删掉，不再各写各的；
//   3) clearProxyCaches() 幂等且回报释放量——设置页「清空缓存」依赖这两个行为。

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { CACHE_BUDGET, clearProxyCaches, proxyCacheStats } from '../lib/proxy.mjs';

// 预算与淘汰逻辑在拆包后搬到 lib/proxy/cache.mjs；对外导出面仍从 lib/proxy.mjs 再导出。
const cacheSrc = readFileSync(new URL('../lib/proxy/cache.mjs', import.meta.url), 'utf8');

test('CACHE_BUDGET：份额之和 = 总预算，单条上限是池子份额的四分之一', () => {
  assert.ok(Object.isFrozen(CACHE_BUDGET), '预算是冻结常量，运行时不可改');
  assert.equal(CACHE_BUDGET.totalBytes, CACHE_BUDGET.immutableBytes + CACHE_BUDGET.sessionListBytes, '两个池子的份额必须正好用满总预算');
  assert.equal(CACHE_BUDGET.immutableEntryBytes * 4, CACHE_BUDGET.immutableBytes, '单条上限 × 4 = 池子份额（保证不出现「一条吃满」）');
  assert.equal(CACHE_BUDGET.totalBytes, 36 * 1024 * 1024, '总预算 36MB，低于旧的两层峰值 32 + 24 = 56MB');
  assert.ok(Number.isInteger(CACHE_BUDGET.immutableEntries) && CACHE_BUDGET.immutableEntries > 0);
  assert.ok(Number.isInteger(CACHE_BUDGET.sessionListEntries) && CACHE_BUDGET.sessionListEntries > 0);
});

test('proxyCacheStats：清空后形状固定、预算来自 CACHE_BUDGET', () => {
  clearProxyCaches();
  const stats = proxyCacheStats();
  assert.deepEqual(Object.keys(stats).sort(), ['budgetBytes', 'bytes', 'entries', 'immutable', 'sessionList']);
  assert.equal(stats.bytes, 0);
  assert.equal(stats.entries, 0);
  assert.equal(stats.budgetBytes, CACHE_BUDGET.totalBytes);
  for (const pool of ['immutable', 'sessionList']) {
    assert.deepEqual(Object.keys(stats[pool]).sort(), ['budgetBytes', 'bytes', 'entries'], `${pool} 的形状固定`);
    assert.equal(stats[pool].bytes, 0);
    assert.equal(stats[pool].entries, 0);
  }
  assert.equal(stats.immutable.budgetBytes, CACHE_BUDGET.immutableBytes);
  assert.equal(stats.sessionList.budgetBytes, CACHE_BUDGET.sessionListBytes);
  assert.equal(stats.immutable.bytes + stats.sessionList.bytes, stats.bytes, '顶层用量是两个池子之和');
  assert.equal(stats.immutable.entries + stats.sessionList.entries, stats.entries);
});

test('clearProxyCaches：空缓存下可重复调用，freedBytes 归零而不是 NaN', () => {
  clearProxyCaches();
  const first = clearProxyCaches();
  assert.deepEqual(first, { freedBytes: 0, bytes: 0, entries: 0 });
  assert.deepEqual(clearProxyCaches(), first, '重复调用幂等');
});

test('源码里不再保留两套硬编码上限（预算只从 CACHE_BUDGET 派生）', () => {
  const src = cacheSrc;
  for (const legacy of [
    'IMMUTABLE_CACHE_MAX_ENTRIES',
    'IMMUTABLE_CACHE_MAX_BYTES',
    'SESSION_LIST_CACHE_BYTES',
    'SESSION_LIST_CACHE_ENTRIES',
  ]) {
    assert.equal(src.includes(legacy), false, `旧上限 ${legacy} 应已删除（预算是单一事实源）`);
  }
  assert.match(src, /immutableCacheBytes > CACHE_BUDGET\.immutableBytes/, 'immutable 淘汰按预算份额判定');
  assert.match(src, /sessionListCacheBytes\(\) > CACHE_BUDGET\.sessionListBytes/, 'session/list 淘汰按预算份额判定');
});
