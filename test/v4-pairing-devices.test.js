// v4.0 扫码一步配对、持久设备凭据、通道隔离与连接级即时撤销测试套件
import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { WebSocket, WebSocketServer } from 'ws';

import {
  DEVICE_COOKIE,
  cookieSecretPath,
  createDeviceStore,
  devicesPath,
} from '../lib/auth/device-store.mjs';
import { DEFAULT_PAIRING_TTL_MS, createPairingManager } from '../lib/auth/pairing.mjs';
import { createPocketProxy } from '../lib/proxy.mjs';
import { cookieFor, TOKEN_COOKIE } from '../lib/proxy/auth.mjs';
import { installPocketRpc } from '../lib/web-rpc.js';
import {
  getAccessToken,
  resetPocketState,
  setCustomPin,
  tokenForHost,
} from '../lib/index.js';
import { POCKET_ENDPOINTS, POCKET_RPC_CHANNEL } from '../client/api.js';

function withTempHome(t) {
  const prev = process.env.DSH_HOME;
  const dir = mkdtempSync(join(tmpdir(), 'dsh-v4-pair-'));
  process.env.DSH_HOME = dir;
  t.after(() => {
    if (prev === undefined) delete process.env.DSH_HOME;
    else process.env.DSH_HOME = prev;
    try { rmSync(dir, { recursive: true, force: true }); } catch { /* Windows 文件句柄释放延迟 */ }
  });
  return dir;
}

function sha256Hex(s) {
  return createHash('sha256').update(String(s), 'utf8').digest('hex');
}

function rawRequest({ port, method = 'GET', path = '/', headers = {}, body = null }) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port, method, path, headers }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(chunks).toString('utf8'),
        });
      });
    });
    req.on('error', reject);
    if (body !== null) req.write(body);
    req.end();
  });
}

function extractCookiePair(setCookieHeaders, cookieName) {
  const list = Array.isArray(setCookieHeaders)
    ? setCookieHeaders
    : setCookieHeaders ? [setCookieHeaders] : [];
  for (const item of list) {
    const first = String(item).split(';')[0].trim();
    if (first.startsWith(`${cookieName}=`)) {
      return { rawHeader: String(item), pair: first, value: first.slice(cookieName.length + 1) };
    }
  }
  return null;
}

async function createUpstreamAndRpcHarness(t, {
  home,
  lanUrl = 'http://192.168.1.50:3081',
  tunnelUrl = 'https://pocket.example.com',
  now = Date.now,
} = {}) {
  const upstreamHits = [];
  const registeredRoutes = [];
  const deviceStore = createDeviceStore({ home, now });
  const pairing = createPairingManager({ ttlMs: DEFAULT_PAIRING_TTL_MS, now });
  let currentTunnelUrl = tunnelUrl;
  let tunnelStopped = 0;

  const serviceStub = {
    dshPort: 3080,
    status: async () => ({
      proxyRunning: true,
      proxyPort: 3081,
      dshPort: 3080,
      lanUrl,
      lanQr: 'data:image/png;base64,lan',
      tunnelRunning: Boolean(currentTunnelUrl),
      tunnelUrl: currentTunnelUrl,
      tunnelQr: currentTunnelUrl ? 'data:image/png;base64,wan' : null,
      tunnelState: { phase: currentTunnelUrl ? 'ready' : 'idle' },
    }),
    startTunnel: async () => ({ url: currentTunnelUrl }),
    stopTunnel: () => {
      tunnelStopped += 1;
      currentTunnelUrl = null;
    },
  };

  const ctx = {
    webServer: {
      register(route) {
        registeredRoutes.push(route);
        return () => {
          const idx = registeredRoutes.indexOf(route);
          if (idx >= 0) registeredRoutes.splice(idx, 1);
        };
      },
    },
  };

  const disposeRpc = installPocketRpc(ctx, {
    service: serviceStub,
    deviceStore,
    pairing,
    getToken: () => getAccessToken(),
    getLanToken: () => tokenForHost('192.168.1.50:3081'),
    refreshLanToken: () => {
      const fresh = setCustomPin('lan', '');
      return fresh;
    },
    getPinCustom: () => false,
    setCustomPin: (which, val) => setCustomPin(which, val),
    resetPocket: () => resetPocketState(),
    log: { error() {}, warn() {}, info() {} },
  });
  t.after(() => disposeRpc?.());

  const upstream = http.createServer(async (req, res) => {
    for (const r of registeredRoutes) {
      if (r.kind === 'prefix' && req.url?.startsWith(r.path)) {
        await r.handler(req, res, { kind: 'authenticated-peer' });
        return;
      }
    }
    upstreamHits.push({
      method: req.method,
      url: req.url,
      referer: req.headers.referer ?? null,
      host: req.headers.host ?? null,
      originHeader: req.headers['x-dsh-pocket-origin'] ?? null,
    });
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end('<!doctype html><html><head></head><body>ok</body></html>');
  });

  const wss = new WebSocketServer({ server: upstream });
  wss.on('connection', (ws) => {
    ws.on('message', (msg) => ws.send(`echo:${msg.toString()}`));
  });

  await new Promise((r) => upstream.listen(0, '127.0.0.1', r));
  const upstreamPort = upstream.address().port;

  const logs = [];
  const proxy = await createPocketProxy({
    upstream: { host: '127.0.0.1', port: upstreamPort },
    port: 0,
    host: '127.0.0.1',
    log: (m) => logs.push(String(m)),
    auth: {
      get sessionKey() {
        return deviceStore.getCookieSecret();
      },
      devices: deviceStore,
      pairing,
      getToken: (h) => tokenForHost(h),
      getCredentialKind: () => 'persistent',
      isProtected: () => true,
    },
  });

  t.after(async () => {
    await proxy.close();
    for (const client of wss.clients) {
      try { client.terminate(); } catch { /* ignore */ }
    }
    await new Promise((r) => wss.close(r));
    await new Promise((r) => upstream.close(r));
  });

  const callRpc = async (endpoint, payload = {}, origin = null) => {
    const headers = {
      host: `127.0.0.1:${upstreamPort}`,
      'content-type': 'application/json',
      ...(origin ? { 'x-dsh-pocket-origin': origin } : {}),
    };
    const resp = await rawRequest({
      port: upstreamPort,
      method: 'POST',
      path: `${POCKET_RPC_CHANNEL}/${endpoint}`,
      headers,
      body: JSON.stringify({ rpcId: 'rpc-1', method: endpoint, payload }),
    });
    assert.equal(resp.status, 200);
    return JSON.parse(resp.body).result;
  };

  return {
    upstreamPort,
    proxyPort: proxy.port,
    upstreamHits,
    logs,
    deviceStore,
    pairing,
    callRpc,
    setTunnelUrl: (u) => { currentTunnelUrl = u; },
    get tunnelStopped() { return tunnelStopped; },
  };
}

test('v4 pairing.issue：仅允许本机 loopback 签发，生成有效二维码 DataURL，通道未就绪时拒绝', async (t) => {
  const home = withTempHome(t);
  const h = await createUpstreamAndRpcHarness(t, { home });

  // LAN 与 Public 来源均严禁签发扫码配对票据
  const lanDenied = await h.callRpc(POCKET_ENDPOINTS.pairingIssue, { channel: 'lan' }, 'lan');
  assert.equal(lanDenied.ok, false);
  assert.equal(lanDenied.error.code, 'forbidden');

  const pubDenied = await h.callRpc(POCKET_ENDPOINTS.pairingIssue, { channel: 'public' }, 'public');
  assert.equal(pubDenied.ok, false);
  assert.equal(pubDenied.error.code, 'forbidden');

  // Loopback 签发 LAN 与 Public 配对码成功
  const lanIssued = await h.callRpc(POCKET_ENDPOINTS.pairingIssue, { channel: 'lan' });
  assert.equal(lanIssued.ok, true);
  assert.equal(lanIssued.value.channel, 'lan');
  assert.match(lanIssued.value.ticket, /^[A-Za-z0-9_-]{20,}$/);
  assert.equal(lanIssued.value.url, `http://192.168.1.50:3081/?pair=${lanIssued.value.ticket}`);
  assert.match(lanIssued.value.qr, /^data:image\/png;base64,/);
  assert.equal(lanIssued.value.ttlMs, DEFAULT_PAIRING_TTL_MS);

  const pubIssued = await h.callRpc(POCKET_ENDPOINTS.pairingIssue, { channel: 'public' });
  assert.equal(pubIssued.ok, true);
  assert.equal(pubIssued.value.channel, 'public');
  assert.equal(pubIssued.value.url, `https://pocket.example.com/?pair=${pubIssued.value.ticket}`);
  assert.match(pubIssued.value.qr, /^data:image\/png;base64,/);

  // 隧道关闭时签发 public 配对码返回 bad-request
  h.setTunnelUrl(null);
  const noWan = await h.callRpc(POCKET_ENDPOINTS.pairingIssue, { channel: 'public' });
  assert.equal(noWan.ok, false);
  assert.equal(noWan.error.code, 'bad-request');
});

test('v4 一步扫码配对：HEAD 预检不烧票、GET 兑换种 HttpOnly 设备 Cookie、URL/Referer/日志零泄漏、单次原子销毁与 90s 过期', async (t) => {
  const home = withTempHome(t);
  let clock = 1_700_000_000_000;
  const h = await createUpstreamAndRpcHarness(t, { home, now: () => clock });

  const issued = await h.callRpc(POCKET_ENDPOINTS.pairingIssue, { channel: 'lan' });
  const ticket = issued.value.ticket;
  assert.equal(h.pairing.activeCount(), 1);

  // 1) 相机/IM 预览 HEAD /?pair=<ticket> 绝不消耗票据
  const headRes = await rawRequest({
    port: h.proxyPort,
    method: 'HEAD',
    path: `/?pair=${ticket}`,
    headers: { host: `192.168.1.50:${h.proxyPort}`, accept: 'text/html' },
  });
  assert.equal(headRes.status, 200);
  assert.equal(headRes.headers['cache-control'], 'no-store');
  assert.equal(h.pairing.activeCount(), 1, 'HEAD must not burn pairing ticket');

  // 2) GET /?pair=<ticket> 一步兑换：302 跳转 /?dsh-pocket-auth=1 + HttpOnly dsh_pocket_device Cookie
  const getRes = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: `/?pair=${ticket}`,
    headers: {
      host: `192.168.1.50:${h.proxyPort}`,
      accept: 'text/html',
      'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1',
    },
  });
  assert.equal(getRes.status, 302);
  assert.equal(getRes.headers.location, '/?dsh-pocket-auth=1');
  assert.equal(getRes.headers['cache-control'], 'no-store');
  const devCookie = extractCookiePair(getRes.headers['set-cookie'], DEVICE_COOKIE);
  assert.ok(devCookie, 'Must set dsh_pocket_device cookie');
  assert.match(devCookie.rawHeader, /HttpOnly/i);
  assert.match(devCookie.rawHeader, /SameSite=Lax/i);
  assert.equal(h.pairing.activeCount(), 0, 'Ticket must be burned immediately on GET');
  assert.equal(h.upstreamHits.length, 0, 'Redemption must redirect before hitting upstream');

  // 携带设备 Cookie 访问上游，且残留 ?pair= 与 Referer 中的 ?pair= 均被彻底剥离
  const authedRes = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: `/?dsh-pocket-auth=1&keep=yes`,
    headers: {
      host: `192.168.1.50:${h.proxyPort}`,
      cookie: devCookie.pair,
      referer: `http://192.168.1.50:${h.proxyPort}/?pair=${ticket}&from=qr`,
      accept: 'text/html',
    },
  });
  assert.equal(authedRes.status, 200);
  assert.equal(h.upstreamHits.length, 1);
  assert.equal(h.upstreamHits[0].url.includes(ticket), false, 'Upstream URL must never see ticket');
  assert.equal(String(h.upstreamHits[0].referer).includes(ticket), false, 'Upstream Referer must scrub ?pair=');
  assert.equal(h.logs.some((l) => l.includes(ticket)), false, 'Proxy logs must never leak raw ticket');

  // 3) 重放同一张票据必须失败并返回 pairExpiredPageHtml
  const replayHtml = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: `/?pair=${ticket}`,
    headers: { host: `192.168.1.50:${h.proxyPort}`, accept: 'text/html' },
  });
  assert.equal(replayHtml.status, 401);
  assert.match(replayHtml.body, /<!doctype html>/i);
  assert.ok(
    replayHtml.body.includes('配对码已过期或无效') || replayHtml.body.includes('Pairing link expired'),
    'Replay must render pairExpiredPageHtml',
  );

  // 4) 超过 90s TTL 后兑换：根路径返回过期引导页，API 路径返回 JSON reason="expired"
  const expiringHtml = await h.callRpc(POCKET_ENDPOINTS.pairingIssue, { channel: 'lan' });
  const expiringJson = await h.callRpc(POCKET_ENDPOINTS.pairingIssue, { channel: 'lan' });
  clock += DEFAULT_PAIRING_TTL_MS + 1_000;

  const expiredPage = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: `/?pair=${expiringHtml.value.ticket}`,
    headers: { host: `192.168.1.50:${h.proxyPort}`, accept: 'text/html' },
  });
  assert.equal(expiredPage.status, 401);
  assert.ok(expiredPage.body.includes('限时 90 秒') || expiredPage.body.includes('expires after 90 seconds'));

  const expiredRes = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: `/api/probe?pair=${expiringJson.value.ticket}`,
    headers: { host: `192.168.1.50:${h.proxyPort}`, accept: 'application/json' },
  });
  assert.equal(expiredRes.status, 401);
  assert.deepEqual(JSON.parse(expiredRes.body), {
    error: 'invalid-pairing-ticket',
    reason: 'expired',
  });
});

test('v4 严格通道隔离：LAN 与 Public 配对码互不可跨通道兑换，LAN 设备 Cookie 严禁访问 Public 隧道', async (t) => {
  const home = withTempHome(t);
  const h = await createUpstreamAndRpcHarness(t, { home });

  // 1) LAN 签发的票据拿到 Public 域名去兑换 → 401 channel-mismatch 且立即烧毁
  const lanTicket = (await h.callRpc(POCKET_ENDPOINTS.pairingIssue, { channel: 'lan' })).value.ticket;
  const crossPub = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: `/?pair=${lanTicket}`,
    headers: { host: 'pocket.example.com', accept: 'text/html' },
  });
  assert.equal(crossPub.status, 401);
  assert.ok(crossPub.body.includes('当前配对码与访问入口不匹配'), 'Must render channel-mismatch pairExpiredPageHtml');
  assert.equal(h.pairing.activeCount(), 0, 'Cross-channel attempt must atomically burn ticket');

  // 2) Public 签发的票据拿到 LAN Host（API JSON）去兑换 → 401 channel-mismatch 且立即烧毁
  const pubTicket = (await h.callRpc(POCKET_ENDPOINTS.pairingIssue, { channel: 'public' })).value.ticket;
  const crossLan = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: `/api/check?pair=${pubTicket}`,
    headers: { host: `192.168.1.50:${h.proxyPort}`, accept: 'application/json' },
  });
  assert.equal(crossLan.status, 401);
  assert.equal(JSON.parse(crossLan.body).reason, 'channel-mismatch');

  // 3) 正常兑换一台 LAN 设备 + 一台 Public 设备（公网兑换还须带 Secure 属性）
  const lanTicket2 = (await h.callRpc(POCKET_ENDPOINTS.pairingIssue, { channel: 'lan' })).value.ticket;
  const lanRedeem = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: `/?pair=${lanTicket2}`,
    headers: { host: `192.168.1.50:${h.proxyPort}`, accept: 'text/html' },
  });
  const lanDevCookie = extractCookiePair(lanRedeem.headers['set-cookie'], DEVICE_COOKIE);
  assert.ok(lanDevCookie);

  const pubTicket2 = (await h.callRpc(POCKET_ENDPOINTS.pairingIssue, { channel: 'public' })).value.ticket;
  const pubRedeem = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: `/?pair=${pubTicket2}`,
    headers: { host: 'pocket.example.com', 'x-forwarded-proto': 'https', accept: 'text/html' },
  });
  const pubDevCookie = extractCookiePair(pubRedeem.headers['set-cookie'], DEVICE_COOKIE);
  assert.ok(pubDevCookie);
  assert.match(pubDevCookie.rawHeader, /;\s*Secure/i, 'Public HTTPS cookie must carry Secure');

  // LAN 设备 Cookie 访问公网域名 → 严禁通过（401 channel-mismatch）
  const lanOnPublic = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: '/__dsh-pocket/ping',
    headers: { host: 'pocket.example.com', cookie: lanDevCookie.pair, accept: 'application/json' },
  });
  assert.equal(lanOnPublic.status, 401);
  assert.equal(JSON.parse(lanOnPublic.body).reason, 'channel-mismatch');

  // Public 设备 Cookie 访问公网与局域网均放行（204）
  const pubOnPublic = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: '/__dsh-pocket/ping',
    headers: { host: 'pocket.example.com', cookie: pubDevCookie.pair },
  });
  assert.equal(pubOnPublic.status, 204);

  const pubOnLan = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: '/__dsh-pocket/ping',
    headers: { host: `192.168.1.50:${h.proxyPort}`, cookie: pubDevCookie.pair },
  });
  assert.equal(pubOnLan.status, 204);
});

test('v4 磁盘零明文哈希存储、跨宿主重启持久登录、设备管理 RPC 权限与 PIN 轮换/恢复出厂精细撤销', async (t) => {
  const home = withTempHome(t);
  const h = await createUpstreamAndRpcHarness(t, { home });

  // 签发 1 台 LAN 扫码设备 + 1 台 LAN PIN 登录设备 + 1 台 Public PIN 登录设备
  const lanPairTicket = (await h.callRpc(POCKET_ENDPOINTS.pairingIssue, { channel: 'lan' })).value.ticket;
  const lanPairRedeem = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: `/?pair=${lanPairTicket}`,
    headers: {
      host: `192.168.1.50:${h.proxyPort}`,
      'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_2 like Mac OS X) Safari/604.1',
    },
  });
  const lanPairCookie = extractCookiePair(lanPairRedeem.headers['set-cookie'], DEVICE_COOKIE);
  const [lanPairId, lanPairRawSecret] = lanPairCookie.value.split('.');

  const lanPin = tokenForHost('192.168.1.50:3081');
  const lanPinLogin = await rawRequest({
    port: h.proxyPort,
    method: 'POST',
    path: '/pocket-login',
    headers: {
      host: `192.168.1.50:${h.proxyPort}`,
      'content-type': 'application/x-www-form-urlencoded',
      'user-agent': 'Mozilla/5.0 (Linux; Android 15) Chrome/131.0.0.0 Mobile Safari/537.36',
    },
    body: `token=${encodeURIComponent(lanPin)}`,
  });
  assert.equal(lanPinLogin.status, 302);
  const lanPinDevCookie = extractCookiePair(lanPinLogin.headers['set-cookie'], DEVICE_COOKIE);
  const lanLegacyTokenCookie = extractCookiePair(lanPinLogin.headers['set-cookie'], TOKEN_COOKIE);
  assert.ok(lanPinDevCookie && lanLegacyTokenCookie);

  const pubPin = getAccessToken();
  const pubPinLogin = await rawRequest({
    port: h.proxyPort,
    method: 'POST',
    path: '/pocket-login',
    headers: {
      host: 'pocket.example.com',
      'content-type': 'application/x-www-form-urlencoded',
      'user-agent': 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) Safari/604.1',
    },
    body: `token=${encodeURIComponent(pubPin)}`,
  });
  assert.equal(pubPinLogin.status, 302);
  const pubPinDevCookie = extractCookiePair(pubPinLogin.headers['set-cookie'], DEVICE_COOKIE);

  // 1) 验证磁盘 devices.json 只存 sha256 哈希，零明文密钥落盘！
  const rawDisk = readFileSync(devicesPath(home), 'utf8');
  assert.equal(rawDisk.includes(lanPairRawSecret), false, 'Raw device secret must NEVER touch disk');
  const parsedDisk = JSON.parse(rawDisk);
  const diskRecord = parsedDisk.devices.find((d) => d.id === lanPairId);
  assert.equal(diskRecord.secretHash, sha256Hex(lanPairRawSecret));

  // 2) 模拟 dsh web 宿主重启：全新 DeviceStore 实例读取同一 DSH_HOME，设备 Cookie 与持久 cookie-secret 均保持登录
  const freshStoreAfterRestart = createDeviceStore({ home });
  assert.equal(freshStoreAfterRestart.getCookieSecret(), h.deviceStore.getCookieSecret());
  assert.equal(freshStoreAfterRestart.verifyDeviceCookie(lanPairCookie.pair, 'lan').ok, true);
  assert.equal(
    cookieFor(lanPin, freshStoreAfterRestart.getCookieSecret()),
    lanLegacyTokenCookie.value,
    'Persistent cookie-secret keeps TOKEN_COOKIE valid across restarts',
  );

  // 3) 设备管理 RPC：本机/LAN 可查可改名，Public 访客列表隐藏且全部管理端点返回 forbidden
  const pubStatus = await h.callRpc(POCKET_ENDPOINTS.status, {}, 'public');
  assert.deepEqual(pubStatus.value.devices, []);
  for (const [ep, payload] of [
    [POCKET_ENDPOINTS.devicesList, {}],
    [POCKET_ENDPOINTS.devicesRename, { id: lanPairId, name: 'Hacked' }],
    [POCKET_ENDPOINTS.devicesRevoke, { id: lanPairId }],
    [POCKET_ENDPOINTS.devicesRevokeAll, {}],
  ]) {
    const denied = await h.callRpc(ep, payload, 'public');
    assert.equal(denied.ok, false, `${ep} must be forbidden on public origin`);
    assert.equal(denied.error.code, 'forbidden');
  }

  const listRes = await h.callRpc(POCKET_ENDPOINTS.devicesList, {}, 'lan');
  assert.equal(listRes.ok, true);
  assert.equal(listRes.value.devices.length, 3);
  assert.equal('secretHash' in listRes.value.devices[0], false, 'Sanitized device must omit secretHash');

  const renameRes = await h.callRpc(POCKET_ENDPOINTS.devicesRename, { id: lanPairId, name: '我的主力 iPhone' });
  assert.equal(renameRes.ok, true);
  assert.equal(renameRes.value.device.name, '我的主力 iPhone');

  // 4) 局域网 PIN 轮换（token.lanRefresh）：只撤销 lan + authMethod='pin' 设备，保留扫码配对（pair）与公网设备！
  const refreshRes = await h.callRpc(POCKET_ENDPOINTS.lanTokenRefresh, {});
  assert.equal(refreshRes.ok, true);

  const lanPinAfterRotate = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: '/__dsh-pocket/ping',
    headers: {
      host: `192.168.1.50:${h.proxyPort}`,
      cookie: `${lanPinDevCookie.pair}; ${lanLegacyTokenCookie.pair}`,
    },
  });
  assert.equal(lanPinAfterRotate.status, 401, 'LAN PIN-login device must be revoked on LAN PIN refresh');

  const lanPairAfterRotate = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: '/__dsh-pocket/ping',
    headers: { host: `192.168.1.50:${h.proxyPort}`, cookie: lanPairCookie.pair },
  });
  assert.equal(lanPairAfterRotate.status, 204, 'LAN QR-paired device must survive LAN PIN refresh');

  const pubPinAfterLanRotate = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: '/__dsh-pocket/ping',
    headers: { host: 'pocket.example.com', cookie: pubPinDevCookie.pair },
  });
  assert.equal(pubPinAfterLanRotate.status, 204, 'Public device must survive LAN PIN refresh');

  // 自定义公网 PIN（pin.setCustom）同样撤销公网 PIN 登录设备，仍保留 LAN 扫码设备
  const setPubPin = await h.callRpc(POCKET_ENDPOINTS.pinSetCustom, {
    which: 'public',
    value: 'CustomPubPin2026',
  });
  assert.equal(setPubPin.ok, true);
  const pubPinAfterPubRotate = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: '/__dsh-pocket/ping',
    headers: { host: 'pocket.example.com', cookie: pubPinDevCookie.pair },
  });
  assert.equal(pubPinAfterPubRotate.status, 401, 'Public PIN device must be revoked when public PIN changes');

  // 5) 恢复出厂设置（pocket.reset）：清空全部设备 + 轮换 cookie-secret + 停隧道
  const oldCookieSecret = readFileSync(cookieSecretPath(home), 'utf8').trim();
  const resetRes = await h.callRpc(POCKET_ENDPOINTS.pocketReset, { confirm: true });
  assert.equal(resetRes.ok, true);
  assert.equal(h.tunnelStopped, 1);
  assert.deepEqual(h.deviceStore.listDevices(), []);
  const newCookieSecret = readFileSync(cookieSecretPath(home), 'utf8').trim();
  assert.notEqual(newCookieSecret, oldCookieSecret, 'Factory reset must rotate cookie-secret');
  assert.equal(existsSync(cookieSecretPath(home)), true);

  const pairAfterReset = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: '/__dsh-pocket/ping',
    headers: { host: `192.168.1.50:${h.proxyPort}`, cookie: lanPairCookie.pair },
  });
  assert.equal(pairAfterReset.status, 401, 'All paired devices must be wiped on factory reset');
});

test('v4 连接级即时撤销：devices.revoke 毫秒级主动销毁该设备的活跃 WebSocket 连接', async (t) => {
  const home = withTempHome(t);
  const h = await createUpstreamAndRpcHarness(t, { home });

  const issued = await h.callRpc(POCKET_ENDPOINTS.pairingIssue, { channel: 'lan' });
  const redeem = await rawRequest({
    port: h.proxyPort,
    method: 'GET',
    path: `/?pair=${issued.value.ticket}`,
    headers: { host: `192.168.1.50:${h.proxyPort}` },
  });
  const devCookie = extractCookiePair(redeem.headers['set-cookie'], DEVICE_COOKIE);
  const deviceId = devCookie.value.split('.')[0];

  // 通过代理建立真实 WebSocket 长连接并验证双向收发 + online 状态为 true
  const ws = new WebSocket(`ws://127.0.0.1:${h.proxyPort}/ws`, {
    headers: {
      Host: `192.168.1.50:${h.proxyPort}`,
      Cookie: devCookie.pair,
    },
  });

  await new Promise((resolve, reject) => {
    ws.once('open', resolve);
    ws.once('error', reject);
  });

  const echoed = await new Promise((resolve, reject) => {
    ws.once('message', (data) => resolve(data.toString()));
    ws.once('error', reject);
    ws.send('hello-v4');
  });
  assert.equal(echoed, 'echo:hello-v4');

  const onlineList = h.deviceStore.listDevices();
  assert.equal(onlineList.length, 1);
  assert.equal(onlineList[0].id, deviceId);
  assert.equal(onlineList[0].online, true, 'Tracked WebSocket must mark device online');

  // 调用 devices.revoke：无需等待下次 HTTP 请求，底层 WebSocket 必须立即断开！
  const closedPromise = new Promise((resolve) => {
    ws.once('close', () => resolve('closed'));
    ws.once('error', () => resolve('errored'));
  });
  const t0 = performance.now();
  const revokeRes = await h.callRpc(POCKET_ENDPOINTS.devicesRevoke, { id: deviceId });
  assert.equal(revokeRes.ok, true);

  const outcome = await Promise.race([
    closedPromise,
    new Promise((r) => setTimeout(() => r('timeout'), 1500)),
  ]);
  const elapsedMs = performance.now() - t0;
  assert.notEqual(outcome, 'timeout', 'Revoking device must immediately destroy its active WebSocket');
  assert.ok(elapsedMs < 1000, `Expected immediate WS teardown (<1000ms), took ${elapsedMs.toFixed(1)}ms`);

  // 撤销后重新握手 WebSocket 或访问 /__dsh-pocket/ping 均立即返回 401
  const rejectedUpgrade = await new Promise((resolve) => {
    const ws2 = new WebSocket(`ws://127.0.0.1:${h.proxyPort}/ws`, {
      headers: {
        Host: `192.168.1.50:${h.proxyPort}`,
        Cookie: devCookie.pair,
      },
    });
    ws2.once('unexpected-response', (_req, res) => {
      res.resume();
      resolve(res.statusCode);
    });
    ws2.once('open', () => {
      ws2.close();
      resolve(101);
    });
    ws2.once('error', () => resolve('error'));
  });
  assert.equal(rejectedUpgrade, 401);
});
