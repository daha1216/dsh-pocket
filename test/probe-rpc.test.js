// 探针 RPC 端点：status 带用量、上报转交落盘、来源分级、缺注入降级（评审 §7.1）
//
// 三件事必须一起守住：① 手机从隧道（public）进来也能上报——探针要采的就是这个场景；
// ② 开关会写 settings.json，属于本机配置，不能在公网被改；③ 旧调用面（没注入 probe）
// 不能抛错，否则升级后设置页整页起不来。

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { createPocketService } from '../lib/service.mjs';
import { installPocketRpc } from '../lib/web-rpc.js';
import { POCKET_RPC_CHANNEL, POCKET_ENDPOINTS } from '../client/api.js';

function fakeCtxConnection() {
  let handler = null;
  const handle = (channel, fn, opts) => {
    assert.equal(channel, POCKET_RPC_CHANNEL);
    assert.deepEqual(opts, { authority: 'loopback' });
    handler = fn;
    return () => { handler = null; };
  };
  return { rpc: { handle }, get handler() { return handler; } };
}

function stubInternals() {
  return {
    lanIPv4: () => '192.168.1.50',
    lanCandidates: async () => ['192.168.1.50'],
    encodeQr: async (text) => 'data:qr;' + text,
    createProxy: async ({ port }) => ({ port, close: async () => {} }),
    startNamedTunnel: async () => ({ url: null, kill: () => {} }),
  };
}

function namedTunnelConfig() {
  return { mode: 'named', token: 'fake-token-for-tests', hostname: 'pocket.example.com' };
}

function probeStub(overrides = {}) {
  const calls = { append: [], clear: 0, setEnabled: [] };
  const stats = {
    enabled: true,
    path: '~/.dsh/dsh-pocket/probe.jsonl',
    bytes: 2048,
    maxBytes: 8 * 1024 * 1024,
    packets: 3,
    lastAt: 1_790_000_000_000,
  };
  const stub = {
    calls,
    stats: () => ({ ...stats }),
    append: (raw) => {
      calls.append.push(raw);
      if (raw !== null && typeof raw === 'object' && raw.bad === true) {
        return { accepted: false, reason: 'invalid', packets: 0, lastAt: 0 };
      }
      return { accepted: true, packets: 4, lastAt: 1_790_000_001_000 };
    },
    clear: () => {
      calls.clear += 1;
      return { freedBytes: 2048, packets: 0, lastAt: 0 };
    },
    setEnabled: (on) => {
      calls.setEnabled.push(on);
      return on;
    },
    ...overrides,
  };
  return stub;
}

async function withService(fn, options = {}) {
  const service = createPocketService({ dshPort: 3080, port: 3081, internals: stubInternals(), getTunnelConfig: namedTunnelConfig });
  const conn = fakeCtxConnection();
  installPocketRpc({ connection: conn }, { service, log: { error() {}, warn() {} }, ...options });
  try {
    return await fn({ service, conn });
  } finally {
    await service.dispose();
  }
}

test('RPC：status 带探针用量，probe.stats 原样回统计', async () => {
  const probe = probeStub();
  await withService(async ({ conn }) => {
    const status = await conn.handler(POCKET_ENDPOINTS.status, {});
    assert.equal(status.ok, true);
    assert.equal(status.value.probe.packets, 3, '设置页据此渲染探针卡片');
    assert.equal(status.value.probe.bytes, 2048);

    const stats = await conn.handler(POCKET_ENDPOINTS.probeStats, {});
    assert.equal(stats.ok, true);
    assert.deepEqual(stats.value.probe, probe.stats());
  }, { probe });
});

test('RPC：probe.report 把包交给落盘层，原样回 accepted/reason/packets', async () => {
  const probe = probeStub();
  await withService(async ({ conn }) => {
    const packet = { v: 1, since: 1, now: 2 };
    const res = await conn.handler(POCKET_ENDPOINTS.probeReport, { packet });
    assert.equal(res.ok, true);
    assert.equal(res.value.accepted, true);
    assert.equal(res.value.packets, 4);
    assert.deepEqual(probe.calls.append, [packet]);

    const rejected = await conn.handler(POCKET_ENDPOINTS.probeReport, { packet: { bad: true } });
    assert.equal(rejected.ok, true, '坏包不是 RPC 错误：回 accepted:false 让客户端继续累计');
    assert.equal(rejected.value.accepted, false);
    assert.equal(rejected.value.reason, 'invalid');
    assert.equal(probe.calls.append.length, 2);
  }, { probe });
});

test('RPC：公网来源能上报/看统计/清空，但不能开关探针（属于本机配置）', async () => {
  const probe = probeStub();
  await withService(async ({ conn }) => {
    const report = await conn.handler(POCKET_ENDPOINTS.probeReport, { packet: { v: 1 } }, undefined, 'public');
    assert.equal(report.ok, true, '隧道里的手机必须能上报');
    assert.equal(report.value.accepted, true);

    const stats = await conn.handler(POCKET_ENDPOINTS.probeStats, {}, undefined, 'public');
    assert.equal(stats.ok, true);

    const clear = await conn.handler(POCKET_ENDPOINTS.probeClear, {}, undefined, 'public');
    assert.equal(clear.ok, true);
    assert.equal(clear.value.freedBytes, 2048);

    const denied = await conn.handler(POCKET_ENDPOINTS.probeSetEnabled, { on: false }, undefined, 'public');
    assert.equal(denied.ok, false, '公网不能关掉主人的采集开关');
    assert.equal(denied.error?.code, 'forbidden', '要能和参数错误区分，客户端才知道是权限问题');
    assert.deepEqual(probe.calls.setEnabled, []);

    const lan = await conn.handler(POCKET_ENDPOINTS.probeSetEnabled, { on: true }, undefined, 'lan');
    assert.equal(lan.ok, true, '局域网来源可以调');
    assert.deepEqual(probe.calls.setEnabled, [true]);
    assert.equal(lan.value.probeEnabled, true);
  }, { probe });
});

test('RPC：没注入 probe 时全部降级为 null / 0 / bad-request，不抛错', async () => {
  await withService(async ({ conn }) => {
    const status = await conn.handler(POCKET_ENDPOINTS.status, {});
    assert.equal(status.ok, true);
    assert.equal(status.value.probe, null, '缺注入给 null，客户端据此不渲染卡片');

    const stats = await conn.handler(POCKET_ENDPOINTS.probeStats, {});
    assert.equal(stats.value.probe, null);

    const report = await conn.handler(POCKET_ENDPOINTS.probeReport, { packet: { v: 1 } });
    assert.equal(report.ok, true);
    assert.equal(report.value.accepted, false, '没有落盘层就当没接受，客户端继续累计');
    assert.equal(report.value.packets, 0);

    const clear = await conn.handler(POCKET_ENDPOINTS.probeClear, {});
    assert.equal(clear.value.freedBytes, 0);
    assert.equal(clear.value.probe, null);

    const toggle = await conn.handler(POCKET_ENDPOINTS.probeSetEnabled, { on: false });
    assert.equal(toggle.ok, false, '没有探针时开关是 bad-request');
  });
});

test('接线：mobile-apply 有探针 arm，bundle 带 arm 标签与端点串', () => {
  const source = readFileSync(new URL('../client/mobile/mobile-apply.tsx', import.meta.url), 'utf8');
  assert.ok(source.includes("armOnNarrow('dsh-pocket: usage probe (2026-11-12)'"));
  assert.ok(source.includes('POCKET_ENDPOINTS.probeReport'));
  assert.ok(source.includes('PROBE_STATE_KEY'));
  assert.ok(source.includes('ANCHORS.filter'));
  assert.ok(source.includes('document.addEventListener(PROBE_LINK_EVENT'));

  const bundle = readFileSync(new URL('../client/client.js', import.meta.url), 'utf8');
  assert.ok(bundle.includes('dsh-pocket: usage probe'), 'bundle 里能搜到 arm 标签（探针必须真的被构建进去）');
  assert.ok(bundle.includes('pocket.probe.report'));
  assert.ok(bundle.includes('pocket.probe.stats'));
  assert.ok(bundle.includes('pocket.probe.clear'));
  assert.ok(bundle.includes('dsh-pocket:probe:state:v1'));
});
