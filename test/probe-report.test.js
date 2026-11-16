// 探针报告脚本：解析、窗口、份额、判定（评审 §7.1）
//
// 判定是这次探针的唯一产出——「手机 80% 的时间在做什么」必须能被一条命令重算，
// 所以这里逐条钉住阈值行为：换口径时先改测试，再改 JUDGE。

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { JUDGE, aggregate, fmtDuration, judge, parsePackets, percentile, renderReport, summarize, withinDays } from '../scripts/probe-report.mjs';

const NOW = 1_790_000_000_000;
const DAY = 24 * 60 * 60 * 1000;

function packet(offset, surfaces, clicks, counts, link, extra = {}) {
  return {
    v: 1,
    since: NOW,
    now: NOW - offset,
    env: { standalone: true, displayMode: 'standalone', ios: '17.2', host: '3.0.12' },
    surfaces,
    clicks,
    counts,
    link,
    perf: { frames: 100, slowFrames: 5 },
    anchors: { checked: 1, missing: {} },
    freezeMaxMs: 0,
    samples: [],
    ...extra,
  };
}

test('报告：解析 JSONL 跳过坏行、空行、数组行', () => {
  const text = [
    '{"now":1}',
    '',
    'not json',
    '[1,2,3]',
    'null',
    '{"now":2}',
  ].join('\n');
  const packets = parsePackets(text);
  assert.deepEqual(packets.map((p) => p.now), [1, 2]);
  assert.deepEqual(parsePackets(''), []);
  assert.deepEqual(parsePackets(undefined), []);
});

test('报告：窗口按包内时间过滤（文件时间不算）', () => {
  const packets = [{ now: NOW - 1 * DAY }, { now: NOW - 10 * DAY }, { now: NOW + 1000 }];
  assert.deepEqual(withinDays(packets, 7, NOW).map((p) => p.now), [NOW - 1 * DAY, NOW + 1000]);
  assert.equal(withinDays(packets, 30, NOW).length, 3);
});

test('报告：百分位用 ceil 索引，空数组为 0', () => {
  assert.equal(percentile([], 50), 0);
  assert.equal(percentile([5], 95), 5);
  assert.equal(percentile([1, 2, 3, 4, 5], 50), 3);
  assert.equal(percentile([1, 2, 3, 4, 5], 95), 5);
  assert.equal(percentile([100, 200, 300, 400], 50), 200);
  assert.equal(percentile([1, 2, 3, 4], 80), 4);
});

test('报告：份额、日均点击、每条约字数与链路分位数', () => {
  const packets = [
    packet(0, { read: 60_000, type: 20_000, approve: 10_000, files: 5_000, settings: 5_000, other: 0 },
      { conversation: 10, files: 2, settings: 1 },
      { sends: 2, chars: 100, sessions: 2, approvals: 1 },
      { downs: 2, recovers: 2, probes: 10, offline: 0, recoverMs: [1000, 3000] }),
    packet(DAY, { read: 40_000, type: 10_000, approve: 10_000, files: 30_000, settings: 10_000, other: 0 },
      { conversation: 5, files: 6, settings: 2 },
      { sends: 3, chars: 140, sessions: 1, approvals: 2 },
      { downs: 1, recovers: 1, probes: 5, offline: 1, recoverMs: [9000] }),
  ];
  const report = summarize(packets, { days: 7, now: NOW + 1000 });
  assert.equal(report.window.packets, 2);
  assert.equal(report.window.spanDays, 2);
  assert.equal(report.surfaces.totalMs, 200_000);
  assert.equal(report.surfaces.share.read, 0.5);
  assert.equal(report.surfaces.share.files, 0.175);
  assert.equal(report.lightweightShare, 0.75);
  assert.equal(report.panelsShare, 0.25);
  assert.equal(report.clicksPerDay.files, 4);
  assert.equal(report.panelsClicksPerDay, 5.5);
  assert.equal(report.counts.sends, 5);
  assert.equal(report.counts.charsPerSend, 48);
  assert.equal(report.counts.sessionsPerDay, 1.5);
  assert.equal(report.link.downs, 3);
  assert.equal(report.link.p50, 3000);
  assert.equal(report.link.p95, 9000);
  assert.equal(report.perf.slowPct, 0.05);
  assert.equal(report.env.standalone, 2);
});

test('报告：PWA 独立窗口与浏览器标签互斥（display-mode 可能只是 fullscreen）', () => {
  const packets = [
    packet(0, { read: 1000 }, {}, {}, {}, { env: { standalone: true, displayMode: 'fullscreen', ios: '18.1', host: '3.0.12' } }),
    packet(0, { read: 1000 }, {}, {}, {}, { env: { standalone: false, displayMode: 'browser', ios: '', host: '3.0.12' } }),
  ];
  const report = summarize(packets, { days: 7, now: NOW + 1000 });
  assert.equal(report.env.seen, 2);
  assert.equal(report.env.standalone, 1);
  assert.equal(report.env.browser, 1);
  assert.equal(report.env.displayModes.fullscreen, 1);
  assert.equal(report.env.displayModes.browser, 1);
  assert.ok(renderReport(report).includes('PWA 独立窗口 50.0% · 浏览器标签 50.0%'));
});

test('报告：无数据时结论是「还没有数据」，不是「轻量视图够用」', () => {
  const report = summarize([], { days: 7, now: NOW });
  assert.equal(report.verdict.kind, 'no-data');
  assert.equal(report.window.packets, 0);
  assert.ok(renderReport(report).includes('还没有数据'));
});

test('报告：看+批+发占比高、面板几乎不用 → 轻量视图够用', () => {
  const packets = [
    packet(0, { read: 120_000, type: 30_000, approve: 20_000, files: 0, settings: 1_000, other: 9_000 },
      { conversation: 20, composer: 5 }, { sends: 2, chars: 40, sessions: 3 }, { downs: 0, recovers: 0, probes: 5, offline: 0, recoverMs: [] }),
  ];
  const report = summarize(packets, { days: 7, now: NOW + 1000 });
  assert.ok(report.lightweightShare >= JUDGE.lightweightShare);
  assert.equal(report.verdict.kind, 'lightweight');
  assert.ok(report.verdict.text.includes('§7.1'));
  assert.ok(report.verdict.notes.length > 0);
});

test('报告：文件/设置占比高 → 宿主 UI 仍不可替代', () => {
  const packets = [
    packet(0, { read: 50_000, type: 10_000, approve: 10_000, files: 20_000, settings: 10_000, other: 0 },
      { conversation: 5, files: 4, settings: 2 }, { sends: 1, chars: 10, sessions: 1 }, { downs: 0, recovers: 0, probes: 1, offline: 0, recoverMs: [] }),
  ];
  const report = summarize(packets, { days: 7, now: NOW + 1000 });
  assert.ok(report.panelsShare >= JUDGE.panelsShare);
  assert.equal(report.verdict.kind, 'host-ui');
  assert.ok(report.verdict.headline.includes('宿主 UI'));
});

test('报告：面板点击日均高同样判宿主 UI 不可替代', () => {
  const packets = [
    packet(0, { read: 100_000, type: 10_000, approve: 10_000, files: 1_000, settings: 1_000, other: 1_000 },
      { conversation: 5, files: 10, settings: 3 }, { sends: 1, chars: 10, sessions: 1 }, { downs: 0, recovers: 0, probes: 1, offline: 0, recoverMs: [] }),
  ];
  const report = summarize(packets, { days: 7, now: NOW + 1000 });
  assert.ok(report.panelsClicksPerDay >= JUDGE.panelsClicksPerDay);
  assert.equal(report.verdict.kind, 'host-ui');
});

test('报告：两边都不够 → 继续采（mixed），不提前下结论', () => {
  const packets = [
    packet(0, { read: 50_000, type: 10_000, approve: 10_000, files: 10_000, settings: 5_000, other: 15_000 },
      { conversation: 5 }, { sends: 1, chars: 10, sessions: 1 }, { downs: 0, recovers: 0, probes: 1, offline: 0, recoverMs: [] }),
  ];
  const report = summarize(packets, { days: 7, now: NOW + 1000 });
  assert.equal(report.verdict.kind, 'mixed');
  assert.ok(report.verdict.text.includes('再采'));
});

test('报告：断线 p95 与慢帧会被点名，而不是只夸 UI', () => {
  const packets = [
    packet(0, { read: 100_000, type: 10_000, approve: 10_000, files: 0, settings: 0, other: 0 },
      { conversation: 5 }, { sends: 1, chars: 10, sessions: 1 },
      { downs: 2, recovers: 2, probes: 5, offline: 0, recoverMs: [9000] },
      { perf: { frames: 100, slowFrames: 40 } }),
  ];
  const report = summarize(packets, { days: 7, now: NOW + 1000 });
  assert.equal(report.verdict.kind, 'lightweight');
  assert.ok(report.verdict.notes.some((note) => note.includes('断线恢复 p95')));
  assert.ok(report.verdict.notes.some((note) => note.includes('慢帧')));
  const text = renderReport(report);
  assert.ok(text.includes('判定：'));
  assert.ok(text.includes('时间去哪了'));
  assert.ok(text.includes('锚点体检'));
  assert.ok(text.includes('链路'));
});

test('报告：人读时长与聚合辅助', () => {
  assert.equal(fmtDuration(0), '0s');
  assert.equal(fmtDuration(12_000), '12s');
  assert.equal(fmtDuration(192_000), '3m 12s');
  assert.equal(fmtDuration(3_720_000), '1h 02m');
  const acc = aggregate([{ now: 5, surfaces: { read: 1000 }, counts: { sends: 2 } }]);
  assert.equal(acc.surfaces.read, 1000);
  assert.equal(acc.counts.sends, 2);
  assert.equal(judge(null).kind, 'no-data');
});
