// 用装在本机的 DSH Desktop（resources/app.asar）现抽一遍宿主类名，逐条核活台账里
// 判成 host 的锚点。契约测试（test/anchors-contract.test.js）只保证「台账与快照一致」，
// 快照会不会过期它管不了；这条才是「宿主升级后手机层的样式还活着吗」的机器化答案，
// 也是 Phase 0 要求的失效探测本体。
//
// 运行：npm run test:anchors（或 node --test test/local/anchors-live.test.js）
// 没装 DSH Desktop 的环境（CI 容器、纯 npm 用户）自动跳过，不当失败。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { extractHostClasses, resolveHostAsar } from '../../scripts/dump-host-classes.mjs';
import { collectSourceAnchors, classifyAnchor, readFixture } from '../../scripts/anchors.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const asar = resolveHostAsar();

test('宿主里的每一个 host 锚点仍然命中真实类名', { skip: asar ? false : '本机没有 DSH Desktop 的 app.asar（设 $DSH_POCKET_HOST_ASAR 可指定）' }, () => {
  const live = extractHostClasses(asar).hashed;
  const fixture = readFixture(root);
  const alive = new Set();
  const dead = [];
  for (const fragment of collectSourceAnchors(root)) {
    const wasHost = classifyAnchor(fragment, fixture.hashed).status === 'host';
    const isHost = live.some((name) => name.includes(fragment));
    if (isHost) alive.add(fragment);
    else if (wasHost) dead.push(fragment);
  }
  assert.deepEqual(dead, [], '这些锚点在本机宿主里已失效（先跑 npm run anchors:dump 确认，再改 CSS 或补新前缀）');
  // 防呆：抽取本身坏掉（比如 asar 布局变了）会让 alive 变成 0，与「全部锚点失效」同形。
  assert.ok(alive.size > 100, '只认出 ' + alive.size + ' 个存活锚点，抽取很可能已经坏了');
});
