// issue #96：dsh 0.1.1-rc.2 起，宿主注入的 @deepseek-ai/dsh-client-connection 会调
//   const api = fixtureClient ?? transport?.createApiClient() ?? new WebApiClient()
// transport = globalThis.__DSH_TRANSPORT__。经 dsh-pocket 代理（手机 / 局域网 / 隧道）
// 访问时宿主给的 transport 不带 createApiClient → TypeError 整页崩。
// 本测试验证代理注入的兜底脚本 TRANSPORT_API_CLIENT_SHIM：
//   - 方法缺失时补一个返回 null 的实现（触发宿主 ?? new WebApiClient() 兜底）
//   - 宿主自己有实现时不覆盖
//   - shim 在宿主赋值之前/之后执行都能生效

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createContext, runInContext } from 'node:vm';

const { TRANSPORT_API_CLIENT_SHIM, DEFAULT_INJECT } = await import('../lib/proxy.mjs');

/** 提取 script 体（vm 只接受纯 JS）。 */
function shimJs() {
  return TRANSPORT_API_CLIENT_SHIM.match(/<script[^>]*>([\s\S]*)<\/script>/)?.[1]
    ?? TRANSPORT_API_CLIENT_SHIM;
}

/** 建一个模拟浏览器全局（globalThis 指向自身 + 常用内建），先执行 shim。 */
function freshContext() {
  const ctx = { Object, console, Array, Error, TypeError, String };
  ctx.globalThis = ctx;
  ctx.window = ctx;
  createContext(ctx);
  runInContext(shimJs(), ctx);
  return ctx;
}

test('shim：注入内容带判重标记，且已进入默认注入集合', () => {
  assert.ok(TRANSPORT_API_CLIENT_SHIM.includes('data-dsh-pocket-transport-shim="1"'), '带注入判重标记');
  assert.ok(DEFAULT_INJECT.includes('data-dsh-pocket-transport-shim="1"'), '进入 DEFAULT_INJECT');
  assert.ok(DEFAULT_INJECT.includes('data-dsh-pocket-polyfill="1"'), 'polyfill 仍保留');
});

test('shim（issue #96）：宿主之后赋值的 transport 缺 createApiClient 时补兜底', () => {
  const ctx = freshContext();
  runInContext('globalThis.__DSH_TRANSPORT__ = { foo: 1 };', ctx); // 宿主模块后跑
  const t = ctx.__DSH_TRANSPORT__;

  assert.equal(t.foo, 1, '不破坏宿主原有属性');
  assert.equal(typeof t.createApiClient, 'function', '补上 createApiClient');
  assert.equal(t.createApiClient(), null, '返回 null → 触发 ?? new WebApiClient()');
  // 模拟宿主那行：fixtureClient ?? transport?.createApiClient() ?? new WebApiClient()
  assert.equal(t.createApiClient() ?? 'WebApiClient', 'WebApiClient', '连接层回落到 WebApiClient');
});

test('shim（issue #96）：宿主自带 createApiClient 时绝不覆盖', () => {
  const ctx = freshContext();
  runInContext('globalThis.__DSH_TRANSPORT__ = { createApiClient: function(){ return "REAL"; } };', ctx);
  assert.equal(ctx.__DSH_TRANSPORT__.createApiClient(), 'REAL', '保留宿主实现');
});

test('shim（issue #96）：shim 晚于宿主赋值时，已存在的 transport 也会被补', () => {
  const ctx = { Object, console };
  ctx.globalThis = ctx;
  createContext(ctx);
  runInContext('globalThis.__DSH_TRANSPORT__ = { bar: 2 };', ctx); // 宿主先赋值
  runInContext(shimJs(), ctx);
  assert.equal(typeof ctx.__DSH_TRANSPORT__.createApiClient, 'function', '补上兜底');
  assert.equal(ctx.__DSH_TRANSPORT__.createApiClient(), null, '返回 null');
});

test('shim（issue #96）：transport 为 null / 非对象时不报错', () => {
  const ctx = freshContext();
  // issue #58 修复后，浏览器场景（宿主从不赋值）shim 会主动创建占位 transport：
  // ownsHost=true 让连接层判 loopback（否则远程浏览器模型设置页 unavailable），
  // createApiClient 兜底防 issue #96 的 TypeError。
  const seeded = ctx.__DSH_TRANSPORT__;
  assert.equal(typeof seeded, 'object', '未赋值时 shim 创建占位 transport');
  assert.equal(seeded.ownsHost, true, '占位 transport 声明 ownsHost=true');
  assert.equal(typeof seeded.createApiClient, 'function', '占位 transport 带方法兜底');
  assert.equal(seeded.createApiClient(), null, '返回 null → 触发 ?? new WebApiClient()');
  runInContext('globalThis.__DSH_TRANSPORT__ = null;', ctx);
  assert.equal(ctx.__DSH_TRANSPORT__, null, 'null 原样透传不抛错');
  runInContext('globalThis.__DSH_TRANSPORT__ = 42;', ctx);
  assert.equal(ctx.__DSH_TRANSPORT__, 42, '非对象不处理');
});

// issue #58（0.2.0-rc.1 复发）：连接层 isLoopback = transport?.ownsHost === true || …。
// 远程浏览器（局域网 IP / 隧道域名）location.hostname 非 loopback，若 transport 不声明
// ownsHost，ui-settings 会在插件激活期把 settings mirror 固化成 memory 模式——模型设置页
// 报「settings are unavailable in this browser」。shim 在宿主赋值 transport 时补 ownsHost=true，
// 时机早于一切插件激活。宿主原生声明 true（桌面 Electron 渲染进程）时不得覆盖。
test('shim（issue #58）：transport.ownsHost 缺失时补 true，宿主已声明 true 时不覆盖', () => {
  const ctx = freshContext();
  runInContext('globalThis.__DSH_TRANSPORT__ = { foo: 1 };', ctx);
  assert.equal(ctx.__DSH_TRANSPORT__.ownsHost, true, '缺失时补 ownsHost=true');

  const ctx2 = freshContext();
  runInContext('globalThis.__DSH_TRANSPORT__ = { ownsHost: false };', ctx2);
  assert.equal(ctx2.__DSH_TRANSPORT__.ownsHost, true, 'false 也补成 true（代理场景的浏览器页本就不拥有宿主）');

  const ctx3 = freshContext();
  runInContext('globalThis.__DSH_TRANSPORT__ = { ownsHost: true };', ctx3);
  assert.equal(ctx3.__DSH_TRANSPORT__.ownsHost, true, '宿主声明 true 时保持（不重复定义）');
});

test('shim（issue #58）：宿主 delete __DSH_TRANSPORT__ 后属性仍在（configurable:false）', () => {
  const ctx = freshContext();
  // 宿主 web shell 消费后 delete（消费即焚）。configurable:false 下非严格模式 delete
  // 静默失败，connection 包稍后的 apply() 仍能读到 ownsHost=true 的占位 transport。
  const result = runInContext('delete globalThis.__DSH_TRANSPORT__', ctx);
  assert.equal(result, false, 'delete 不可配置属性静默失败返回 false');
  assert.equal(ctx.__DSH_TRANSPORT__.ownsHost, true, '属性保留，ownsHost 仍为 true');
  // 宿主真赋值通道不受 configurable 影响（accessor set）
  runInContext('globalThis.__DSH_TRANSPORT__ = { foo: 9 };', ctx);
  assert.equal(ctx.__DSH_TRANSPORT__.foo, 9, 'set 通道仍可用');
  assert.equal(ctx.__DSH_TRANSPORT__.ownsHost, true, '宿主后赋值也被 patch 出 ownsHost');
});
