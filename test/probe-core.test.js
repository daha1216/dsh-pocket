// 使用探针的纯逻辑层：边界、打包、宿主校验（评审 §7.1）
//
// 这些断言是「数据可信」的下限：探针不上报消息内容，但如果计数本身能被坏数据
// 撑爆/污染，报告里的百分比就没有意义。每条用例都对应一个真实风险。

import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  PROBE_VERSION,
  PROBE_SURFACES,
  PROBE_CLICK_AREAS,
  PROBE_MAX_ERROR_SAMPLES,
  PROBE_MAX_RECOVER_SAMPLES,
  PROBE_MAX_TEXT,
  createProbeState,
  normalizeEnv,
  probeText,
  noteEnv,
  noteSurface,
  noteClick,
  noteCount,
  noteLinkDown,
  noteLinkRecover,
  noteLinkProbe,
  noteLinkOffline,
  noteFrames,
  noteAnchorAudit,
  noteError,
  noteFreeze,
  snapshotPacket,
  resetProbeState,
  serializeProbeState,
  parseProbeState,
  normalizePacket,
  packetBytes,
} from '../client/mobile/probe-core.mjs';

const NOW = 1_790_000_000_000;

test('probe-core：表面时长只落在白名单里，未知表面归 other 且单次封顶 60s', () => {
  const state = createProbeState(NOW);
  noteSurface(state, 'read', 1000);
  noteSurface(state, 'not-a-surface', 2000);
  noteSurface(state, 'read', 120_000); // 单次最多记 60s：采样抖动不能伪造出几小时
  assert.equal(state.surfaces.read, 61_000);
  assert.equal(state.surfaces.other, 2000);
  assert.equal(state.surfaces.files, 0);
  noteSurface(state, 'read', 0);
  noteSurface(state, 'read', -5);
  assert.equal(state.surfaces.read, 61_000, '0/负数不累加');
});

test('probe-core：点击与计数只认白名单键，计数有上限', () => {
  const state = createProbeState(NOW);
  noteClick(state, 'composer');
  noteClick(state, 'unknown-area');
  assert.equal(state.clicks.composer, 1);
  assert.equal(state.clicks.other, 1);
  noteCount(state, 'sends');
  noteCount(state, 'sends', 2);
  noteCount(state, 'not-a-count');
  assert.equal(state.counts.sends, 3);
  assert.equal('not-a-count' in state.counts, false);
  noteCount(state, 'sends', Number.MAX_SAFE_INTEGER);
  assert.equal(state.counts.sends, 1_000_000_000, '计数封顶，坏输入不能撑爆报告');
});

test('probe-core：链路记录包含失败次数、恢复样本与探活', () => {
  const state = createProbeState(NOW);
  noteLinkDown(state, NOW + 5);
  noteLinkDown(state, NOW + 9);
  noteLinkProbe(state);
  noteLinkProbe(state);
  noteLinkOffline(state);
  noteLinkRecover(state, 1200);
  noteLinkRecover(state, 0); // 0ms 也是有效样本：说明马上就回来了
  assert.equal(state.link.downs, 2);
  assert.equal(state.link.probes, 2);
  assert.equal(state.link.offline, 1);
  assert.deepEqual(state.link.recoverMs, [1200, 0]);
  assert.equal(state.link.lastDownAt, NOW + 9, '记最近一次断线时间');
  for (let i = 0; i < 100; i += 1) noteLinkRecover(state, i);
  assert.equal(state.link.recoverMs.length, PROBE_MAX_RECOVER_SAMPLES, '样本有界');
  assert.equal(state.link.recoverMs.at(-1), 99, '丢最旧、留最新');
});

test('probe-core：帧统计只接受滚动期的帧，慢帧不超过总帧', () => {
  const state = createProbeState(NOW);
  noteFrames(state, 10, 3);
  noteFrames(state, 10, 99);
  assert.equal(state.perf.frames, 20);
  assert.equal(state.perf.slowFrames, 13, '慢帧被夹到累计总帧以内（3 + min(10,99)）');
  noteFrames(state, 0, 5);
  assert.equal(state.perf.frames, 20);
});

test('probe-core：锚点体检丢弃非法片段，缺失表有界并保留高频项', () => {
  const state = createProbeState(NOW);
  noteAnchorAudit(state, ['_approval', 'bad fragment', '"quoted"', '_scrollBody', '']);
  noteAnchorAudit(state, ['_approval']);
  assert.equal(state.anchors.checked, 2);
  assert.equal(state.anchors.missing._approval, 2);
  assert.equal(state.anchors.missing._scrollBody, 1);
  assert.equal(Object.keys(state.anchors.missing).length, 2, '带空格/引号的片段不记账');

  for (let i = 0; i < 40; i += 1) noteAnchorAudit(state, ['frag_' + i]);
  const keys = Object.keys(state.anchors.missing);
  assert.equal(keys.length, 32, '表有界');
  assert.ok(state.anchors.missing._approval >= 2, '高频片段不会被低次项挤掉');
});

test('probe-core：错误只留短样本，Promise 拒绝单独计数', () => {
  const state = createProbeState(NOW);
  noteError(state, 'error', 'boom\nreason: ' + 'x'.repeat(300));
  noteError(state, 'rejection', 'aborted');
  assert.equal(state.counts.errors, 1);
  assert.equal(state.counts.rejections, 1);
  assert.equal(state.samples.length, 2);
  assert.equal(state.samples[0].kind, 'error');
  assert.equal(state.samples[1].kind, 'rejection');
  assert.ok(state.samples[0].text.length <= PROBE_MAX_TEXT);
  assert.equal(state.samples[0].text.includes('\n'), false, '控制字符被压平');
  for (let i = 0; i < 20; i += 1) noteError(state, 'error', 'e' + i);
  assert.equal(state.samples.length, PROBE_MAX_ERROR_SAMPLES);
  assert.equal(state.counts.errors, 21);
});

test('probe-core：冻结记最长值，0ms 不算冻结', () => {
  const state = createProbeState(NOW);
  noteFreeze(state, 0);
  assert.equal(state.counts.freezes, 0);
  noteFreeze(state, 4200);
  noteFreeze(state, 1800);
  assert.equal(state.counts.freezes, 2);
  assert.equal(state.freezeMaxMs, 4200);
  noteFreeze(state, 10 * 60 * 1000);
  assert.equal(state.freezeMaxMs, 600_000, '封顶 10 分钟');
});

test('probe-core：环境快照白名单重建，且只记第一次', () => {
  assert.deepEqual(normalizeEnv(null), null);
  const env = normalizeEnv({
    standalone: true,
    displayMode: 'standalone',
    ios: '17.2',
    junk: 'dropped',
    dpr: 3,
    safeBottom: 34,
    viewportH: -1,
  });
  assert.deepEqual(env, { standalone: true, displayMode: 'standalone', ios: '17.2', dpr: 3, safeBottom: 34 });
  const state = createProbeState(NOW);
  noteEnv(state, { standalone: true, ios: '17.2', displayMode: 'standalone' });
  noteEnv(state, { standalone: false, ios: '18.0', displayMode: 'browser' });
  assert.equal(state.env.ios, '17.2', '设备快照只记一次');
});

test('probe-core：打包是深拷贝，reset 保留设备环境并重置计数', () => {
  const state = createProbeState(NOW);
  noteEnv(state, { standalone: true, displayMode: 'standalone' });
  noteSurface(state, 'read', 5000);
  noteLinkRecover(state, 1000);
  const packet = snapshotPacket(state, NOW + 60_000);
  assert.equal(packet.v, PROBE_VERSION);
  assert.equal(packet.since, NOW);
  assert.equal(packet.now, NOW + 60_000);
  assert.equal(packet.surfaces.read, 5000);
  assert.deepEqual(packet.link.recoverMs, [1000]);

  state.surfaces.read = 999_999;
  state.link.recoverMs.push(4242);
  assert.equal(packet.surfaces.read, 5000, '包是快照，之后改状态不影响它');
  assert.deepEqual(packet.link.recoverMs, [1000]);

  const fresh = resetProbeState(state, NOW + 120_000);
  assert.equal(fresh.since, NOW + 120_000);
  assert.equal(fresh.surfaces.read, 0);
  assert.deepEqual(fresh.link.recoverMs, []);
  assert.equal(fresh.env.displayMode, 'standalone', 'reset 后仍是同一台设备');
});

test('probe-core：本地序列化可往返，坏数据当没有', () => {
  const state = createProbeState(NOW);
  noteSurface(state, 'type', 3000);
  noteClick(state, 'composer');
  noteAnchorAudit(state, ['_approval']);
  const text = serializeProbeState(state);
  const restored = parseProbeState(text);
  assert.equal(restored.since, NOW);
  assert.equal(restored.surfaces.type, 3000);
  assert.equal(restored.clicks.composer, 1);
  assert.equal(restored.anchors.missing._approval, 1);
  assert.equal(parseProbeState('not json'), null);
  assert.equal(parseProbeState('[]'), null);
  assert.equal(parseProbeState(''), null);
  const junk = parseProbeState('{"since":"x","surfaces":{"read":-9,"junk":1},"counts":{"sends":"many"}}');
  assert.equal(junk.surfaces.read, 0);
  assert.equal(junk.counts.sends, 0);
  assert.equal('junk' in junk.surfaces, false);
});

test('probe-core：宿主校验拒绝版本/时间/跨度不合法的包', () => {
  const base = { v: 1, since: NOW - 60_000, now: NOW };
  assert.notEqual(normalizePacket(base), null);
  assert.equal(normalizePacket({ ...base, v: 2 }), null);
  assert.equal(normalizePacket({ ...base, since: 0 }), null);
  assert.equal(normalizePacket({ ...base, now: NOW - 120_000 }), null, 'now 早于 since 的包是坏的');
  assert.equal(normalizePacket({ ...base, since: NOW - 8 * 24 * 3600 * 1000 }), null, '跨度超过 7 天');
  assert.equal(normalizePacket([]), null);
  assert.equal(normalizePacket(null), null);
});

test('probe-core：宿主校验按白名单重建字段，未知字段一律丢弃', () => {
  const packet = normalizePacket({
    v: 1,
    since: NOW - 60_000,
    now: NOW,
    env: { standalone: true, ios: '17.2', junk: 'x', injected: '<script>' },
    surfaces: { read: 5000, evil: 123 },
    counts: { sends: 2, evil: 9 },
    link: { downs: 1, recoverMs: [100, 200], junk: 1 },
    anchors: { checked: 3, missing: { _approval: 2, 'bad frag': 1 } },
    freezeMaxMs: 900,
    samples: [{ kind: 'error', text: 'boom' }, { kind: 'weird', text: 'x' }],
    extra: 'dropped',
  });
  assert.deepEqual(Object.keys(packet).sort(), [
    'anchors', 'clicks', 'counts', 'env', 'freezeMaxMs', 'link', 'now', 'perf', 'samples', 'since', 'surfaces', 'v',
  ]);
  assert.equal(packet.env.junk, undefined);
  assert.equal(packet.env.injected, undefined);
  assert.equal(packet.surfaces.evil, undefined);
  assert.equal(packet.counts.evil, undefined);
  assert.equal(packet.link.junk, undefined);
  assert.deepEqual(packet.anchors.missing, { _approval: 2 });
  assert.equal(packet.samples[1].kind, 'error', '未知样本类别归为 error');
  assert.deepEqual(PROBE_SURFACES, ['read', 'type', 'approve', 'files', 'settings', 'other']);
  assert.ok(PROBE_CLICK_AREAS.includes('sessionRow') === false);
  assert.ok(packetBytes(packet) > 0 && packetBytes(packet) < 16 * 1024);
});

test('probeText：压平空白与控制字符并截断', () => {
  assert.equal(probeText('  a\n\tb  '), 'a b');
  assert.equal(probeText('x'.repeat(500), 10), 'x'.repeat(10));
  assert.equal(probeText(null), '');
  assert.equal(probeText(12345), '12345');
});
