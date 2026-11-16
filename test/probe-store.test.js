// 探针落盘层：追加、白名单、节流、轮转、清空（评审 §7.1）
//
// 这里守的是「探针不能变成用户的事故」：磁盘上只追加本机计数、坏包写不进去、
// 每分钟最多 60 包、单文件 8 MB 自动轮转、设置页能一键清空。

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { PROBE_FILE, PROBE_MAX_BYTES, appendProbePacket, clearProbe, probePath, probeStats } from '../lib/probe.mjs';
import { setProbeEnabled } from '../lib/settings.mjs';

async function withHome(fn) {
  const home = mkdtempSync(join(tmpdir(), 'dshp-probe-'));
  const prev = process.env.DSH_HOME;
  process.env.DSH_HOME = home;
  try {
    return await fn(home);
  } finally {
    // 先按当前 DSH_HOME 清掉本用例的临时文件，再恢复环境变量——顺序反了会去清真实用户的探针日志。
    try { clearProbe(); } catch { /* 临时目录已删也不影响 */ }
    if (prev === undefined) delete process.env.DSH_HOME;
    else process.env.DSH_HOME = prev;
    rmSync(home, { recursive: true, force: true });
  }
}

const now = () => Date.now();

function packet(overrides = {}) {
  const at = now();
  return {
    v: 1,
    since: at - 60_000,
    now: at,
    env: { standalone: true, displayMode: 'standalone', ios: '17.2', host: '3.0.12' },
    surfaces: { read: 30_000, type: 5000, approve: 0, files: 0, settings: 0, other: 1000 },
    clicks: { conversation: 4, composer: 2 },
    counts: { sends: 1, chars: 12, loads: 1 },
    link: { downs: 1, recovers: 1, probes: 10, offline: 0, recoverMs: [1500] },
    perf: { frames: 60, slowFrames: 3 },
    anchors: { checked: 1, missing: {} },
    freezeMaxMs: 0,
    samples: [],
    ...overrides,
  };
}

test('探针落盘：默认不采集，打开后才落盘；stats 反映字节数/包数/最后时间', async () => {
  await withHome(async () => {
    clearProbe();
    assert.equal(probeStats().enabled, false, '默认不采：路线 A 已直接开工，不再默认挂采集');
    const blocked = appendProbePacket(packet());
    assert.equal(blocked.accepted, false);
    assert.equal(blocked.reason, 'disabled');
    setProbeEnabled(true);
    const at = now();
    const result = appendProbePacket(packet({ now: at, since: at - 60_000 }));
    assert.equal(result.accepted, true);
    assert.equal(result.packets, 1);
    assert.equal(result.lastAt, at);

    const path = probePath();
    assert.equal(path.endsWith(PROBE_FILE), true);
    assert.equal(existsSync(path), true);
    const lines = readFileSync(path, 'utf8').split('\n').filter((line) => line !== '');
    assert.equal(lines.length, 1);
    assert.equal(JSON.parse(lines[0]).now, at);

    const stats = probeStats();
    assert.equal(stats.enabled, true);
    assert.equal(stats.packets, 1);
    assert.equal(stats.lastAt, at);
    assert.ok(stats.bytes > 0);
    assert.equal(stats.maxBytes, PROBE_MAX_BYTES);
    assert.ok(stats.path.endsWith(PROBE_FILE), '界面看到的是归约后的路径');
    assert.ok(stats.path.startsWith('~') || stats.path.startsWith('$DSH_HOME'));
  });
});

test('探针落盘：坏包被拒（invalid）且不产生文件', async () => {
  await withHome(async () => {
    clearProbe();
    setProbeEnabled(true);
    const result = appendProbePacket(packet({ v: 9 }));
    assert.equal(result.accepted, false);
    assert.equal(result.reason, 'invalid');
    assert.equal(existsSync(probePath()), false);
    assert.equal(probeStats().packets, 0);
  });
});

test('探针落盘：开关关掉后拒收（disabled），重新打开即恢复', async () => {
  await withHome(async () => {
    clearProbe();
    setProbeEnabled(false);
    const off = appendProbePacket(packet());
    assert.equal(off.accepted, false);
    assert.equal(off.reason, 'disabled');
    assert.equal(probeStats().enabled, false, 'status 里的开关状态跟着 settings 走');

    setProbeEnabled(true);
    const on = appendProbePacket(packet());
    assert.equal(on.accepted, true);
  });
});

test('探针落盘：500ms 内第二包被节流（throttled），不会写第二行', async () => {
  await withHome(async () => {
    clearProbe();
    setProbeEnabled(true);
    const first = appendProbePacket(packet());
    assert.equal(first.accepted, true);
    const second = appendProbePacket(packet());
    assert.equal(second.accepted, false);
    assert.equal(second.reason, 'throttled');
    const lines = readFileSync(probePath(), 'utf8').split('\n').filter((line) => line !== '');
    assert.equal(lines.length, 1, '节流包不落盘');
  });
});

test('探针落盘：文件将超过 8 MB 时轮转到 probe.jsonl.1（只留一代）', async () => {
  await withHome(async () => {
    clearProbe();
    const path = probePath();
    mkdirSync(dirname(path), { recursive: true });
    setProbeEnabled(true);
    writeFileSync(path, 'x'.repeat(PROBE_MAX_BYTES), 'utf8');
    assert.equal(probeStats().bytes, PROBE_MAX_BYTES);

    const result = appendProbePacket(packet());
    assert.equal(result.accepted, true);
    assert.equal(existsSync(path + '.1'), true, '旧文件改名为 .1');
    const current = readFileSync(path, 'utf8').split('\n').filter((line) => line !== '');
    assert.equal(current.length, 1, '新包写进新文件');
    assert.doesNotThrow(() => JSON.parse(current[0]));
    assert.ok(probeStats().bytes < PROBE_MAX_BYTES);
  });
});

test('探针落盘：清空删除主文件与轮转文件，释放字节数并归零', async () => {
  await withHome(async () => {
    clearProbe();
    const path = probePath();
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, 'a'.repeat(1024), 'utf8');
    writeFileSync(path + '.1', 'b'.repeat(2048), 'utf8');
    const result = clearProbe();
    assert.equal(result.freedBytes, 3072);
    assert.equal(result.packets, 0);
    assert.equal(existsSync(path), false);
    assert.equal(existsSync(path + '.1'), false);
    const stats = probeStats();
    assert.equal(stats.bytes, 0);
    assert.equal(stats.packets, 0);
    assert.equal(stats.lastAt, 0);
  });
});

test('探针落盘：外部写入后 stats 能重扫出包数（大小变化即失效内存计数）', async () => {
  await withHome(async () => {
    clearProbe();
    mkdirSync(dirname(probePath()), { recursive: true });
    const at = now();
    const a = JSON.stringify({ now: at - 5000 });
    const b = JSON.stringify({ now: at });
    writeFileSync(probePath(), a + '\n' + b + '\n', 'utf8');
    const stats = probeStats();
    assert.equal(stats.packets, 2);
    assert.equal(stats.lastAt, at);
  });
});
