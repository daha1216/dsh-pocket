// 可见带发布策略（2026-11-12，评审 §3.3「键盘跟手无跳变」）
//
// 被测对象是 client/mobile/upstream/core/visible-band-publish.ts：变量什么时候逐帧跟着
// 键盘写、什么时候退回停稳写，由它判定；DOM 接线在 effects/viewport-meta.ts。
//
// 为什么需要这条判据（模块文件头有完整背景）：壳层高度直接读 --dsha-mobile-visible-vh，
// 而 :root 上的自定义属性会让整个文档重排。2026-10-31 owner 手机实测：逐帧发布 → 整个 app
// 每帧重排约 20 次、会话列表白屏 1-2s；一刀切「停稳才发布」又让键盘动画末尾跳一下。设备
// 能力事先测不出来，只能运行时量帧节拍、量力而行。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const { createBandPublishGovernor, FRAME_BUDGET_MS, STUTTER_LIMIT, BURST_IDLE_MS } =
  await import('../client/mobile/upstream/core/visible-band-publish.ts');

const viewport = readFileSync(
  new URL('../client/mobile/upstream/effects/viewport-meta.ts', import.meta.url), 'utf8');

test('governor：正常帧节拍一直保持逐帧发布', () => {
  const g = createBandPublishGovernor();
  assert.equal(g.isLive(), true, '默认逐帧（跟手）');
  let at = 1000;
  for (let i = 0; i < 12; i += 1) {
    assert.equal(g.noteFrame(at), true, '16ms 一帧不该降级');
    at += 16;
  }
  assert.equal(g.isLive(), true);
  assert.deepEqual([FRAME_BUDGET_MS, STUTTER_LIMIT], [32, 3], '预算与阈值是评审口径');
});

test('governor：单帧抖动（GC、别的标签页）不算设备扛不住', () => {
  const g = createBandPublishGovernor();
  g.noteFrame(1000);
  g.noteFrame(1060); // 一帧 60ms：单次抖动
  g.noteFrame(1076); // 立刻恢复正常：计数必须清零
  g.noteFrame(1120); // 又一次
  g.noteFrame(1136);
  assert.equal(g.isLive(), true);
});

test('governor：连续超预算就降级，且本次会话不再回升', () => {
  const g = createBandPublishGovernor();
  g.noteFrame(1000);
  g.noteFrame(1060);
  g.noteFrame(1120);
  assert.equal(g.noteFrame(1180), false, '第三帧仍然超预算 → 判定扛不住');
  assert.equal(g.isLive(), false);
  // 即便之后帧节拍恢复，也不回升：降级单向，行为可预测（恢复要等下次页面加载）。
  assert.equal(g.noteFrame(1196), false);
  g.noteSettled();
  assert.equal(g.isLive(), false, 'noteSettled 只清节拍，不恢复降级');
});

test('governor：两轮过渡之间的长间隔重新计数', () => {
  const g = createBandPublishGovernor();
  g.noteFrame(1000);
  g.noteFrame(1060); // 慢
  g.noteFrame(1120); // 慢
  // 键盘收起又抬起：间隔远大于一轮过渡，上一轮的计数不能算到这一轮头上。
  assert.equal(g.noteFrame(1120 + BURST_IDLE_MS + 100), true);
  g.noteFrame(1120 + BURST_IDLE_MS + 100 + 60); // 慢
  g.noteFrame(1120 + BURST_IDLE_MS + 100 + 120); // 慢
  assert.equal(g.isLive(), true, '新一轮只累计了两帧');
});

test('governor：reset 回到逐帧（新一次装载）', () => {
  const g = createBandPublishGovernor();
  g.noteFrame(1000);
  g.noteFrame(1060);
  g.noteFrame(1120);
  g.noteFrame(1180);
  assert.equal(g.isLive(), false);
  g.reset();
  assert.equal(g.isLive(), true);
  assert.equal(g.noteFrame(2000), true);
});

test('viewport-meta 接线：live 逐帧直写、降级只在停稳写、事件停稳派发一次', () => {
  assert.match(viewport,
    /import \{ createBandPublishGovernor \} from '\.\.\/core\/visible-band-publish\.ts'/,
    '策略必须来自纯模块');
  assert.match(viewport, /const publish = createBandPublishGovernor\(\)/);
  // 变量写入只有一个出口，且按值去重（写入会重排整个文档）。
  assert.match(viewport, /if \(written === value\) return/);
  // 逐帧路径（跟手）与降级路径（停稳）并存。
  assert.match(viewport, /if \(publish\.isLive\(\)\) \{\s*\n\s*writeBand\(bandValue\)/,
    'live 时必须每帧直写');
  assert.match(viewport, /else if \(settled\) \{\s*\n\s*writeBand\(bandValue\)/,
    '降级时只在停稳那一刻写');
  // 事件只在停稳且值变过时派发：动画期间派发等于把重排风暴转嫁给每个消费者。
  assert.match(viewport, /if \(settled && bandValue !== settledValue\) \{/);
  assert.match(viewport, /document\.dispatchEvent\(new CustomEvent\(VISIBLE_BAND_EVENT\)\)/);
  // 旧的两帧写入门控必须消失（否则 live 路径名存实亡）。
  assert.doesNotMatch(viewport, /pendingVisibleFrames/);
});

test('viewport-meta：未停稳时自补帧，保证事件与降级写入不会永远等不到', () => {
  assert.match(viewport, /if \(!settled && bandFrame === 0\) bandFrame = requestAnimationFrame\(syncStableViewport\)/,
    '最后一次 resize 之后未必还有事件，要用 rAF 自己推进到停稳');
  assert.match(viewport, /if \(bandFrame !== 0\) cancelAnimationFrame\(bandFrame\)/,
    '清理必须取消待执行的帧');
});
