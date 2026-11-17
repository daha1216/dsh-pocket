// v4.0 代理性能引擎（Worker >16MiB 瘦身 / 并发零阻塞缓存组装 / 零忙等设置写盘）、/__dsh-pocket/ping、
// TunnelSupervisor 指数退避自愈熔断与 runTunnelPreflight 环境预检测试套件
import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { brotliDecompressSync, gzipSync } from 'node:zlib';
import {
  closeSync,
  mkdirSync,
  mkdtempSync,
  openSync,
  readFileSync,
  rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import {
  POCKET_PING_PATH,
  SW_SCRIPT,
  createPocketProxy,
  createProxyCache,
  isImmutableUrl,
} from '../lib/proxy.mjs';
import { SESSION_LIST_SLIM_MAX } from '../lib/proxy/cache.mjs';
import { DEVICE_COOKIE, createDeviceStore } from '../lib/auth/device-store.mjs';
import {
  flushSettings,
  lanEnabled,
  mobileFontSize,
  setLanEnabled,
  setMobileFontSize,
  settingsPath,
} from '../lib/settings.mjs';
import {
  TUNNEL_RECONNECT_BACKOFF_MS,
  createPocketService,
  isFatalTunnelError,
} from '../lib/service.mjs';
import { runTunnelPreflight } from '../lib/preflight.mjs';

function withTempHome(t) {
  const prev = process.env.DSH_HOME;
  const dir = mkdtempSync(join(tmpdir(), 'dsh-v4-perf-'));
  process.env.DSH_HOME = dir;
  t.after(() => {
    if (prev === undefined) delete process.env.DSH_HOME;
    else process.env.DSH_HOME = prev;
    try { rmSync(dir, { recursive: true, force: true }); } catch { /* Windows 延迟释放 */ }
  });
  return dir;
}

function rawHttp({ port, method = 'GET', path = '/', headers = {}, body = null }) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port, method, path, headers }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          rawBody: Buffer.concat(chunks),
        });
      });
    });
    req.on('error', reject);
    if (body !== null) req.write(body);
    req.end();
  });
}

test('v4 session/list Worker 引擎：>16MiB 超大会话列表瘦身 + 7 路并发缓存命中异步组装（prefixBuf/suffixBuf）', async (t) => {
  assert.equal(SESSION_LIST_SLIM_MAX, 64 * 1024 * 1024, 'SESSION_LIST_SLIM_MAX must be raised to 64 MiB');

  // 源码守卫：slim-response.mjs 严禁出现任何同步压缩/解压阻塞主线程
  const slimRespSrc = readFileSync(new URL('../lib/proxy/slim-response.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(
    slimRespSrc,
    /\b(?:brotliCompressSync|brotliDecompressSync|gzipSync|gunzipSync|inflateSync|deflateSync)\b/,
    'slim-response.mjs must never call *Sync zlib APIs on the main thread',
  );

  // 构造 > 16 MiB（约 18.8 MiB）未压缩会话列表 JSON（模拟 1100+ 重度会话宿主）
  const pad = 'x'.repeat(4_100);
  const items = [];
  for (let i = 0; i < 1_120; i += 1) {
    const id = `sess-${String(i).padStart(4, '0')}`;
    items.push({
      id,
      title: `Session ${i}`,
      projections: {
        values: {
          keepSummary: `keep:${i}`,
          watcherInsights: [{ kind: 'idle', summary: 'ok' }],
          contextHeaders: { pad },
          'retrace/forkmap': { pad },
          'retrace/versions': { pad },
          turnOutline: { pad },
        },
      },
    });
  }
  const templateSuffix = JSON.stringify({
    ok: true,
    value: { items },
  });
  assert.ok(
    Buffer.byteLength(templateSuffix) > 17 * 1024 * 1024,
    `Expected > 17 MiB uncompressed payload, got ${(Buffer.byteLength(templateSuffix) / (1024 * 1024)).toFixed(2)} MiB`,
  );

  // 预构造一个模板 gzip 缓冲区，按每次请求只替换固定长度 rpcId 以加速上游桩回包
  let upstreamCalls = 0;
  const upstream = http.createServer((req, res) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      upstreamCalls += 1;
      const reqBody = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      const fullJson = `{"type":"server-response","rpcId":${JSON.stringify(reqBody.rpcId)},"result":${templateSuffix}}`;
      res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
      res.end(fullJson);
    });
  });
  await new Promise((r) => upstream.listen(0, '127.0.0.1', r));
  const upstreamPort = upstream.address().port;

  const customCache = createProxyCache();
  const proxy = await createPocketProxy({
    upstream: { host: '127.0.0.1', port: upstreamPort },
    port: 0,
    host: '127.0.0.1',
    cache: customCache,
  });

  t.after(async () => {
    await proxy.close();
    await new Promise((r) => upstream.close(r));
  });

  const postSessionList = (rpcId) =>
    rawHttp({
      port: proxy.port,
      method: 'POST',
      path: '/api/session/list',
      headers: {
        host: `127.0.0.1:${proxy.port}`,
        'content-type': 'application/json',
        'accept-encoding': 'br, gzip',
      },
      body: JSON.stringify({ rpcId, method: 'session/list', payload: {} }),
    });

  // 1) 首屏冷请求：> 16 MiB 载荷在 v4 中不再溢出跳过，而是经 Worker 剥离肥胖字段并压成 Brotli
  const cold = await postSessionList('cold-rpc-0');
  assert.equal(cold.status, 200);
  assert.equal(cold.headers['cache-control'], 'no-store', 'Slimmed response must carry cache-control: no-store');
  assert.equal(cold.headers['content-encoding'], 'br');
  assert.ok(
    cold.rawBody.length < 128 * 1024,
    `Expected Brotli slimmed payload < 128 KiB (from >17 MiB), got ${cold.rawBody.length} B`,
  );

  const coldPlain = brotliDecompressSync(cold.rawBody);
  assert.ok(
    coldPlain.length < 512 * 1024,
    `Expected uncompressed slimmed JSON < 512 KiB (from >17 MiB), got ${coldPlain.length} B`,
  );
  const coldParsed = JSON.parse(coldPlain.toString('utf8'));
  assert.equal(coldParsed.rpcId, 'cold-rpc-0');
  const v0 = coldParsed.result.value.items[0].projections.values;
  assert.deepEqual(v0.watcherInsights, [{ kind: 'idle', summary: 'ok' }], 'watcherInsights must be preserved');
  assert.equal(v0.keepSummary, 'keep:0');
  for (const strippedKey of ['contextHeaders', 'retrace/forkmap', 'retrace/versions', 'turnOutline']) {
    assert.equal(strippedKey in v0, false, `${strippedKey} must be stripped`);
  }

  // 2) 7 路并发缓存命中：绕过 3 槽原始解压闸门，全部命中 prefixBuf/suffixBuf 并精确回填各自的 rpcId！
  const hitIds = Array.from({ length: 7 }, (_, i) => `concurrent-hit-${i + 1}`);
  const hitResponses = await Promise.all(hitIds.map((id) => postSessionList(id)));
  assert.equal(upstreamCalls, 8);

  for (let i = 0; i < hitIds.length; i += 1) {
    const res = hitResponses[i];
    assert.equal(res.status, 200);
    assert.equal(
      res.headers['x-dsh-pocket-slim-cache'],
      'hit',
      `Concurrent request #${i + 1} must hit sessionListCache without falling through`,
    );
    const decoded = JSON.parse(brotliDecompressSync(res.rawBody).toString('utf8'));
    assert.equal(decoded.rpcId, hitIds[i], 'Each concurrent cache hit must carry its own rpcId');
    assert.equal('contextHeaders' in decoded.result.value.items[42].projections.values, false);
  }

  assert.ok(customCache.stats().sessionList.entries >= 1);
});

test('v4 实例级缓存隔离与 ?rev= 分块不可变资产识别（isImmutableUrl + SW_SCRIPT）', async (t) => {
  // 1) /plugins/...?rev=<6+ chars> 识别为 immutable，短 rev 或普通 API 不误判
  assert.equal(isImmutableUrl('/plugins/dsh-pocket/client.js?rev=a1b2c3d4'), true);
  assert.equal(isImmutableUrl('/plugins/dsh-pocket/client.mobile.js?rev=9f8e7d6c'), true);
  assert.equal(isImmutableUrl('/plugins/dsh-pocket/client.mobile.js?foo=1&rev=AbCdEf_12'), true);
  assert.equal(isImmutableUrl('/plugins/dsh-pocket/client.mobile.js?rev=123'), false);
  assert.equal(isImmutableUrl('/api/session/list?rev=a1b2c3d4'), false);
  assert.match(SW_SCRIPT, /rev=\[A-Za-z0-9_-\]\{6,\}/, 'Service Worker script must match ?rev= immutable plugin chunks');

  // 2) 两个独立代理实例持有各自 createProxyCache()，缓存命中零回源，清空 A 不影响 B
  let upstreamHits = 0;
  const upstream = http.createServer((_req, res) => {
    upstreamHits += 1;
    res.writeHead(200, {
      'content-type': 'application/javascript; charset=utf-8',
      'content-encoding': 'gzip',
    });
    res.end(gzipSync('console.log("chunk-v4");'.repeat(80)));
  });
  await new Promise((r) => upstream.listen(0, '127.0.0.1', r));
  const upstreamPort = upstream.address().port;

  const cacheA = createProxyCache();
  const cacheB = createProxyCache();
  const proxyA = await createPocketProxy({
    upstream: { host: '127.0.0.1', port: upstreamPort },
    port: 0,
    host: '127.0.0.1',
    cache: cacheA,
  });
  const proxyB = await createPocketProxy({
    upstream: { host: '127.0.0.1', port: upstreamPort },
    port: 0,
    host: '127.0.0.1',
    cache: cacheB,
  });

  t.after(async () => {
    await proxyA.close();
    await proxyB.close();
    await new Promise((r) => upstream.close(r));
  });

  const assetPath = '/plugins/dsh-pocket/client.mobile.js?rev=deadbeef01';
  const rA = await rawHttp({
    port: proxyA.port,
    path: assetPath,
    headers: { host: `127.0.0.1:${proxyA.port}`, 'accept-encoding': 'br' },
  });
  const rB = await rawHttp({
    port: proxyB.port,
    path: assetPath,
    headers: { host: `127.0.0.1:${proxyB.port}`, 'accept-encoding': 'br' },
  });
  assert.equal(rA.status, 200);
  assert.equal(rB.status, 200);
  assert.equal(rA.headers['content-encoding'], 'br');
  assert.equal(upstreamHits, 2);
  assert.equal(cacheA.stats().immutable.entries, 1);
  assert.equal(cacheB.stats().immutable.entries, 1);

  // 二次访问 proxyA 命中 immutable 缓存，不再回源
  const rA2 = await rawHttp({
    port: proxyA.port,
    path: assetPath,
    headers: { host: `127.0.0.1:${proxyA.port}`, 'accept-encoding': 'br' },
  });
  assert.equal(rA2.status, 200);
  assert.equal(upstreamHits, 2, 'Second request to ?rev= plugin chunk must hit immutable cache');

  cacheA.clear();
  assert.equal(cacheA.stats().immutable.entries, 0);
  assert.equal(cacheB.stats().immutable.entries, 1, 'Clearing proxyA cache must not wipe proxyB cache');
});

test('v4 设置持久化零阻塞：源码零 Atomics.wait / SharedArrayBuffer，跨进程锁竞争时乐观更新并异步合并落盘', async (t) => {
  const home = withTempHome(t);
  const settingsSrc = readFileSync(new URL('../lib/settings.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(settingsSrc, /\bAtomics\.wait\b/, 'lib/settings.mjs must not use Atomics.wait');
  assert.doesNotMatch(settingsSrc, /\bSharedArrayBuffer\b/, 'lib/settings.mjs must not use SharedArrayBuffer');

  const dest = settingsPath();
  mkdirSync(dirname(dest), { recursive: true });
  const lockFile = `${dest}.lock`;

  // 模拟另一进程正短暂持有 .lock：主线程更新必须立即返回（< 50ms），不卡事件循环
  const fd = openSync(lockFile, 'wx');
  const releaseTimer = setTimeout(() => {
    try { closeSync(fd); } catch { /* ignore */ }
    try { rmSync(lockFile, { force: true }); } catch { /* ignore */ }
  }, 45);

  const t0 = performance.now();
  assert.equal(setLanEnabled(false), false);
  assert.equal(setMobileFontSize(17), 17);
  const syncElapsed = performance.now() - t0;

  assert.ok(syncElapsed < 40, `Contended updateSettings must not spin-block main thread (took ${syncElapsed.toFixed(1)}ms)`);
  assert.equal(lanEnabled(), false, 'Optimistic memory cache must reflect mutation immediately');
  assert.equal(mobileFontSize(), 17);

  await flushSettings();
  clearTimeout(releaseTimer);

  const onDisk = JSON.parse(readFileSync(dest, 'utf8'));
  assert.equal(onDisk.lanEnabled, false);
  assert.equal(onDisk.mobileFontSize, 17);
  assert.ok(home);
});

test('v4 零 I/O /__dsh-pocket/ping 探针：已认证 GET/HEAD 直回 204（零上游穿透），设备撤销后立即回 401', async (t) => {
  const home = withTempHome(t);
  const deviceStore = createDeviceStore(home);
  const issued = deviceStore.issueDevice({
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Safari/604.1',
    ip: '192.168.1.88',
    channel: 'lan',
    authMethod: 'pair',
  });
  const cookieHeader = `${DEVICE_COOKIE}=${issued.cookieValue}`;

  let upstreamHits = 0;
  const upstream = http.createServer((_req, res) => {
    upstreamHits += 1;
    res.writeHead(200);
    res.end('upstream');
  });
  await new Promise((r) => upstream.listen(0, '127.0.0.1', r));

  const proxy = await createPocketProxy({
    upstream: { host: '127.0.0.1', port: upstream.address().port },
    port: 0,
    host: '127.0.0.1',
    auth: {
      sessionKey: deviceStore.getCookieSecret(),
      devices: deviceStore,
      getToken: () => '12345678',
      isProtected: () => true,
    },
  });

  t.after(async () => {
    await proxy.close();
    await new Promise((r) => upstream.close(r));
  });

  for (const method of ['GET', 'HEAD']) {
    const okPing = await rawHttp({
      port: proxy.port,
      method,
      path: `${POCKET_PING_PATH}?ts=1`,
      headers: { host: `192.168.1.88:${proxy.port}`, cookie: cookieHeader },
    });
    assert.equal(okPing.status, 204);
    assert.equal(okPing.headers['cache-control'], 'no-store');
    assert.equal(okPing.rawBody.length, 0);
  }
  assert.equal(upstreamHits, 0, '/__dsh-pocket/ping must never hit upstream dsh web');

  // 撤销该设备后，/__dsh-pocket/ping 立即返回 401 并下发清 Cookie 头
  deviceStore.revokeDevice(issued.device.id);
  const revokedPing = await rawHttp({
    port: proxy.port,
    method: 'GET',
    path: POCKET_PING_PATH,
    headers: {
      host: `192.168.1.88:${proxy.port}`,
      cookie: cookieHeader,
      accept: 'application/json',
    },
  });
  assert.equal(revokedPing.status, 401);
  assert.deepEqual(JSON.parse(revokedPing.rawBody.toString('utf8')), {
    error: 'unauthorized',
    revoked: true,
  });
  assert.match(String(revokedPing.headers['set-cookie']), /Max-Age=0/i);
  assert.equal(upstreamHits, 0);
});

test('v4 TunnelSupervisor：指数退避自动重连恢复、401 致命鉴权秒级熔断、连续 5 次秒退熔断与 stopTunnel 清理定时器', async (t) => {
  const home = withTempHome(t);
  assert.deepEqual([...TUNNEL_RECONNECT_BACKOFF_MS], [2_000, 5_000, 15_000, 30_000, 60_000]);
  assert.equal(isFatalTunnelError('ERR 401 Unauthorized: invalid tunnel token'), true);
  assert.equal(isFatalTunnelError('Provided Tunnel token is not valid.'), true);
  assert.equal(isFatalTunnelError('Incorrect Usage: flag provided but not defined'), true);
  assert.equal(isFatalTunnelError('quic connection lost: network unreachable'), false);

  const silentLog = { info() {}, log() {}, warn() {}, error() {} };
  const fakeProxyFactory = async ({ port: p }) => ({ port: p, close: async () => {} });
  const validTunnelCfg = () => ({
    mode: 'named',
    hostname: 'pocket.example.com',
    token: 'eyJhIjoiZmFrZS10b2tlbi1mb3Itc3VwZXJ2aXNvci10ZXN0In0=',
    autoRestore: true,
  });

  // 场景 A：异常退出 → reconnecting → 第 1 次重试失败 → 第 2 次重试成功恢复 ready
  {
    const exits = [];
    let spawnCount = 0;
    const svc = createPocketService({
      dshPort: 3080,
      port: 3081,
      home,
      log: silentLog,
      getTunnelConfig: validTunnelCfg,
      internals: {
        createProxy: fakeProxyFactory,
        lanIPv4: async () => '192.168.1.10',
        lanCandidates: async () => ['192.168.1.10'],
        encodeQr: async (u) => `qr:${u}`,
        reconnectBackoffMs: [25, 35, 50],
        disableJitter: true,
        startNamedTunnel: async () => {
          spawnCount += 1;
          if (spawnCount === 2) {
            throw new Error('edge dial timeout');
          }
          let exitCb = null;
          exits.push((code, detail) => exitCb?.(code, detail));
          return {
            pid: 50_000 + spawnCount,
            kill() {},
            onExit(cb) { exitCb = cb; },
          };
        },
      },
    });
    t.after(() => svc.dispose());

    const url = await svc.startTunnel();
    assert.equal(url, 'https://pocket.example.com');
    assert.equal(spawnCount, 1);

    // 模拟 cloudflared 运行期因网络闪断退出
    exits[0](1, 'connection to edge lost');
    const stReconnecting = await svc.status();
    assert.equal(stReconnecting.tunnelRunning, false);
    assert.equal(stReconnecting.tunnelState.phase, 'reconnecting');
    assert.equal(stReconnecting.tunnelState.attempt, 1);
    assert.ok(Number.isFinite(stReconnecting.tunnelState.nextRetryAt));

    // 等待第 1 次失败（25ms）+ 第 2 次成功（35ms）完成自愈
    const deadline = Date.now() + 2_000;
    while (Date.now() < deadline) {
      const cur = await svc.status();
      if (cur.tunnelRunning && cur.tunnelState.phase === 'ready') break;
      await new Promise((r) => setTimeout(r, 15));
    }
    const stRecovered = await svc.status();
    assert.equal(spawnCount, 3, 'Expected initial start + 1 failed retry + 1 successful retry');
    assert.equal(stRecovered.tunnelRunning, true);
    assert.equal(stRecovered.tunnelUrl, 'https://pocket.example.com');
    assert.equal(stRecovered.tunnelState.phase, 'ready');
    assert.equal(stRecovered.tunnelState.attempt, undefined);
    await svc.dispose();
  }

  // 场景 B：致命 Token 错误（401 Unauthorized）立即熔断到 error，零重试
  {
    let exitCb = null;
    let spawnCount = 0;
    const svc = createPocketService({
      dshPort: 3080,
      port: 3081,
      home: join(home, 'fatal'),
      log: silentLog,
      getTunnelConfig: validTunnelCfg,
      internals: {
        createProxy: fakeProxyFactory,
        lanIPv4: async () => '192.168.1.10',
        lanCandidates: async () => ['192.168.1.10'],
        encodeQr: async (u) => `qr:${u}`,
        reconnectBackoffMs: [20],
        disableJitter: true,
        startNamedTunnel: async () => {
          spawnCount += 1;
          return {
            pid: 60_000 + spawnCount,
            kill() {},
            onExit(cb) { exitCb = cb; },
          };
        },
      },
    });
    t.after(() => svc.dispose());

    await svc.startTunnel();
    exitCb(1, 'ERR 401 Unauthorized: Tunnel token is not valid');
    await new Promise((r) => setTimeout(r, 60));

    const st = await svc.status();
    assert.equal(st.tunnelState.phase, 'error');
    assert.equal(spawnCount, 1, 'Fatal 401 error must trip circuit breaker without retrying');
    await svc.dispose();
  }

  // 场景 C：0 次稳定连接下连续 5 次秒退（<3s）触发熔断；以及 stopTunnel() 立即取消挂起的重连定时器
  {
    const exits = [];
    let spawnCount = 0;
    const svc = createPocketService({
      dshPort: 3080,
      port: 3081,
      home: join(home, 'fast-exits'),
      log: silentLog,
      getTunnelConfig: validTunnelCfg,
      internals: {
        createProxy: fakeProxyFactory,
        lanIPv4: async () => '192.168.1.10',
        lanCandidates: async () => ['192.168.1.10'],
        encodeQr: async (u) => `qr:${u}`,
        reconnectBackoffMs: [20, 20, 20, 20, 20],
        disableJitter: true,
        startNamedTunnel: async () => {
          spawnCount += 1;
          let cb = null;
          exits.push((code, detail) => cb?.(code, detail));
          return {
            pid: 70_000 + spawnCount,
            kill() {},
            onExit(fn) { cb = fn; },
          };
        },
      },
    });
    t.after(() => svc.dispose());

    await svc.startTunnel();
    for (let i = 0; i < 4; i += 1) {
      exits[i](1, 'transient crash');
      assert.equal((await svc.status()).tunnelState.phase, 'reconnecting');
      const waitDeadline = Date.now() + 1_000;
      while (exits.length < i + 2 && Date.now() < waitDeadline) {
        await new Promise((r) => setTimeout(r, 10));
      }
    }
    assert.equal(spawnCount, 5);
    // 第 5 次秒退触发熔断
    exits[4](1, 'transient crash #5');
    await new Promise((r) => setTimeout(r, 60));
    const tripped = await svc.status();
    assert.equal(tripped.tunnelState.phase, 'error');
    assert.equal(spawnCount, 5, '5th consecutive fast exit must trip circuit breaker');

    // 手动重新 startTunnel 重置计数，触发 reconnecting 后立即 stopTunnel 必须取消定时器
    await svc.startTunnel();
    assert.equal(spawnCount, 6);
    exits[5](1, 'drop before manual stop');
    assert.equal((await svc.status()).tunnelState.phase, 'reconnecting');

    svc.stopTunnel();
    await new Promise((r) => setTimeout(r, 60));
    const afterStop = await svc.status();
    assert.equal(afterStop.tunnelState.phase, 'idle');
    assert.equal(spawnCount, 6, 'stopTunnel() must cancel pending supervisor timer');
    await svc.dispose();
  }
});

test('v4 runTunnelPreflight 环境预检：TUN/Fake-IP 检测、macOS 空闲 utun 排除、代理环境变量与端口顺延诊断', async (t) => {
  // 1) Clash/Mihomo/Wintun 活跃网卡 + 未命名网卡携带 198.18.0.0/15 Fake-IP 均精准检出
  const tunReport = runTunnelPreflight({
    interfaces: {
      Ethernet: [{ address: '192.168.1.20', family: 'IPv4', internal: false }],
      Mihomo: [{ address: '198.18.0.1', family: 'IPv4', internal: false }],
      'Custom Adapter': [{ address: '198.19.12.34', family: 'IPv4', internal: false }],
    },
    env: { HTTPS_PROXY: 'http://127.0.0.1:7890' },
    configuredPort: 3081,
    actualPort: 3082,
  });
  assert.equal(tunReport.tunDetected, true);
  assert.deepEqual(tunReport.tunInterfaces, ['Mihomo', 'Custom Adapter']);
  assert.equal(tunReport.proxyEnvDetected, true);
  assert.equal(tunReport.proxyEnvStripped, true);
  assert.equal(tunReport.portShifted, true);
  assert.equal(tunReport.targetServiceUrl, 'http://127.0.0.1:3082');

  // 2) macOS 系统空闲 utun0..2（仅含 fe80:: 链路本地地址）绝不误报为代理 TUN
  const macClean = runTunnelPreflight({
    interfaces: {
      en0: [{ address: '192.168.1.35', family: 'IPv4', internal: false }],
      utun0: [{ address: 'fe80::1', family: 'IPv6', internal: false }],
      utun1: [{ address: 'fe80::abcd:ef01', family: 6, internal: false }],
    },
    env: {},
    configuredPort: 3081,
    actualPort: 3081,
  });
  assert.equal(macClean.tunDetected, false);
  assert.deepEqual(macClean.tunInterfaces, []);
  assert.equal(macClean.proxyEnvDetected, false);
  assert.equal(macClean.portShifted, false);
  assert.equal(macClean.targetServiceUrl, 'http://127.0.0.1:3081');

  // 3) service.status() 完整暴露 preflight 字段
  const svc = createPocketService({
    dshPort: 3080,
    port: 3081,
    log: { info() {}, log() {}, warn() {}, error() {} },
    internals: {
      createProxy: async () => ({ port: 3083, close: async () => {} }),
      lanIPv4: async () => '192.168.1.35',
      lanCandidates: async () => ['192.168.1.35'],
      encodeQr: async () => 'data:image/png;base64,qr',
      networkInterfaces: () => ({
        wintun: [{ address: '10.66.0.2', family: 'IPv4', internal: false }],
      }),
      env: { all_proxy: 'socks5://127.0.0.1:7890' },
    },
  });
  t.after(() => svc.dispose());

  await svc.startProxy();
  const st = await svc.status();
  assert.equal(st.portShifted, true);
  assert.deepEqual(st.preflight, {
    tunDetected: true,
    tunInterfaces: ['wintun'],
    proxyEnvDetected: true,
    proxyEnvStripped: true,
    portShifted: true,
    targetServiceUrl: 'http://127.0.0.1:3083',
  });
});
