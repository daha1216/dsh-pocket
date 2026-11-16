// 轻量视图（评审 §7.1 路线 A）：页面资源直出与前端契约。
//
// 这里只钉两件事：① 代理只直出白名单里的三个文件，路径不对/方法不对都不接管；
// ② 页面自己用的宿主协议字符串不能漂（改了协议忘记改页面 = 手机上一片空白）。
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';

import {
  LITE_PAGE_PATH,
  LITE_ASSET_PREFIX,
  isLitePageRequest,
  isLiteRequest,
  serveLiteRequest,
} from '../lib/lite/assets.mjs';
import { fetchHostSession } from '../lib/lite/session.mjs';
import { createPocketProxy } from '../lib/proxy.mjs';

const here = (rel) => fileURLToPath(new URL(rel, import.meta.url));
const html = readFileSync(here('../lib/lite/index.html'), 'utf8');
const app = readFileSync(here('../lib/lite/app.js'), 'utf8');
const css = readFileSync(here('../lib/lite/app.css'), 'utf8');
const proxy = readFileSync(here('../lib/proxy.mjs'), 'utf8');

/** 最小 ServerResponse 桩：只记 writeHead/end 的入参。 */
function fakeRes() {
  return {
    status: null,
    headers: null,
    body: null,
    written: 0,
    writeHead(status, headers) { this.status = status; this.headers = headers; this.written += 1; },
    end(body) { if (body !== undefined) this.body = body; },
  };
}
const get = (pathname, method = 'GET') => ({ method, url: pathname });

test('lite: page path and asset prefix are served, everything else is not', () => {
  assert.equal(LITE_PAGE_PATH, '/__dsh-pocket/lite');
  assert.equal(LITE_ASSET_PREFIX, '/__dsh-pocket/lite/');
  assert.equal(isLiteRequest('/__dsh-pocket/lite'), true);
  assert.equal(isLiteRequest('/__dsh-pocket/lite/'), true);
  assert.equal(isLiteRequest('/__dsh-pocket/lite/app.js'), true);
  // 前缀相近但不是它：不能被吞掉（否则上游 404 变成我们的 404）。
  assert.equal(isLiteRequest('/__dsh-pocket/lit'), false);
  assert.equal(isLiteRequest('/__dsh-pocket/litex'), false);
  assert.equal(isLiteRequest('/__dsh-pocket'), false);
  assert.equal(isLiteRequest('/'), false);
  assert.equal(isLiteRequest('/api/session/list'), false);
  assert.equal(isLiteRequest(''), false);
});

test('lite: page and assets are served from disk with no-cache and nosniff', () => {
  const page = fakeRes();
  assert.equal(serveLiteRequest(get('/__dsh-pocket/lite'), page, '/__dsh-pocket/lite'), true);
  assert.equal(page.status, 200);
  assert.match(page.headers['content-type'], /^text\/html/);
  assert.equal(page.headers['cache-control'], 'no-cache');
  assert.equal(page.headers['x-content-type-options'], 'nosniff');
  assert.equal(page.body, html);

  const js = fakeRes();
  assert.equal(serveLiteRequest(get('/__dsh-pocket/lite/app.js'), js, '/__dsh-pocket/lite/app.js'), true);
  assert.match(js.headers['content-type'], /^application\/javascript/);

  const sheet = fakeRes();
  assert.equal(serveLiteRequest(get('/__dsh-pocket/lite/app.css'), sheet, '/__dsh-pocket/lite/app.css'), true);
  assert.match(sheet.headers['content-type'], /^text\/css/);
});

test('lite: HEAD gets headers but no body', () => {
  const res = fakeRes();
  assert.equal(serveLiteRequest(get('/__dsh-pocket/lite', 'HEAD'), res, '/__dsh-pocket/lite'), true);
  assert.equal(res.status, 200);
  assert.equal(res.body, null);
});

test('lite: unknown asset and traversal are 404, and non-GET is not claimed', () => {
  const missing = fakeRes();
  assert.equal(serveLiteRequest(get('/__dsh-pocket/lite/nope.js'), missing, '/__dsh-pocket/lite/nope.js'), true);
  assert.equal(missing.status, 404);
  assert.match(missing.body, /not found/);

  // 目录穿越不会被读盘：名字不在白名单里就 404。
  const traversal = fakeRes();
  assert.equal(serveLiteRequest(get('/__dsh-pocket/lite/../proxy.mjs'), traversal, '/__dsh-pocket/lite/../proxy.mjs'), true);
  assert.equal(traversal.status, 404);

  // POST 不归轻量视图管（交给上游按原样处理），且不能写响应。
  const post = fakeRes();
  assert.equal(serveLiteRequest(get('/__dsh-pocket/lite', 'POST'), post, '/__dsh-pocket/lite'), false);
  assert.equal(post.written, 0);
});

test('lite: page shell is a standalone iOS-friendly PWA surface', () => {
  assert.match(html, /viewport-fit=cover/);
  assert.match(html, /apple-mobile-web-app-capable/);
  assert.match(html, /maximum-scale=1/);
  // 资源必须用绝对路径：页面地址是 /__dsh-pocket/lite（没有尾斜杠），相对路径会被
  // 浏览器解析成 /__dsh-pocket/app.js，脚本根本不会加载（2026-11-12 假宿主实测踩到）。
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]).filter((ref) => /\bapp\.(js|css)$/.test(ref));
  assert.equal(refs.length, 2, 'page must reference app.css and app.js');
  for (const ref of refs) {
    const resolved = new URL(ref, 'http://x' + LITE_PAGE_PATH).pathname;
    assert.ok(resolved.startsWith(LITE_ASSET_PREFIX), ref + ' must resolve under the asset prefix, got ' + resolved);
    const res = fakeRes();
    assert.equal(serveLiteRequest(get(resolved), res, resolved), true);
    assert.equal(res.status, 200, ref + ' must be served');
  }
  // 加到主屏幕：iOS 16.4+/Android 用 manifest 决定 standalone 与启动地址，
  // start_url 必须等于页面路径，否则主屏图标打开的是别的页面。
  const manifest = JSON.parse(readFileSync(here('../lib/lite/manifest.webmanifest'), 'utf8'));
  assert.equal(manifest.start_url, LITE_PAGE_PATH);
  assert.equal(manifest.scope, LITE_PAGE_PATH);
  assert.equal(manifest.display, 'standalone');
  assert.match(html, /rel="manifest" href="\/__dsh-pocket\/lite\/manifest\.webmanifest"/);
  const mres = fakeRes();
  assert.equal(serveLiteRequest(get('/__dsh-pocket/lite/manifest.webmanifest'), mres, '/__dsh-pocket/lite/manifest.webmanifest'), true);
  assert.equal(mres.status, 200);
  assert.match(mres.headers['content-type'], /manifest\+json/);
  // 页面脚本引用的节点必须都在壳里，否则运行到一半报 null。
  for (const id of ['app', 'title', 'backBtn', 'refreshBtn', 'banner', 'bannerText', 'bannerLink', 'bannerRetry',
    'viewList', 'listHint', 'sessionList', 'listEmpty', 'viewChat', 'messages', 'olderBtn', 'composer',
    'input', 'sendBtn', 'stopBtn', 'approvals', 'toast']) {
    assert.match(html, new RegExp('id="' + id + '"'), 'missing #' + id);
  }
  assert.match(css, /safe-area-inset-bottom/);
  assert.match(css, /prefers-color-scheme:\s*dark/);
});

test('lite: the page speaks the host JSON-RPC envelope and remote-event wire', () => {
  assert.match(app, /type:\s*'client-request'/);
  assert.match(app, /rpcId/);
  assert.match(app, /'\/api\/'\s*\+/);
  // 端点与其 args 键（宿主按 descriptor 的 wire 名取参，名字错了就是 400/缺失参数）。
  for (const endpoint of ['session/list', 'session/events', 'session/state', 'session/prompt', 'session/cancel']) {
    assert.ok(app.includes("'" + endpoint + "'"), 'missing endpoint ' + endpoint);
  }
  assert.match(app, /_request:\s*\{\}/);
  assert.match(app, /maxMessages:\s*PAGE_MESSAGES/);
  assert.match(app, /kind:\s*'session'/);
  // 审批：打开 $events 流 + POST $events/result，outcome 只允许这两个值。
  assert.match(app, /endpoint:\s*'\$events'/);
  assert.match(app, /'\$events\/result'/);
  assert.match(app, /'allowed-once'/);
  assert.match(app, /'rejected'/);
  assert.match(app, /\/api\/remote\.mux/);
  // 不碰 innerHTML：消息内容一律 textContent。
  assert.equal(app.includes('innerHTML'), false);
});

test('lite: proxy serves the page after auth, and mints the host session first', () => {
  assert.match(proxy, /import \{ isLitePageRequest, serveLiteRequest \} from '\.\/lite\/assets\.mjs';/);
  assert.match(proxy, /import \{ fetchHostSession \} from '\.\/lite\/session\.mjs';/);
  // 页面分支：直出前替浏览器换一次宿主会话 cookie（从主屏幕直接打开的手机从不经过
  // GET /，拿不到 dsh-auth-*，/api 会 401）。每次打开都换——那一跳在宿主侧是无状态签名。
  assert.match(proxy, /if \(\(req\.method === 'GET' \|\| req\.method === 'HEAD'\) && isLitePageRequest\(swPath\)\) \{/);
  assert.match(proxy, /await fetchHostSession\(\{ upstream, launchToken, headers: \{ \.\.\.req\.headers \}, agent: upstreamAgent, log \}\)/);
  assert.match(proxy, /serveLiteRequest\(req, res, swPath, setCookies\.length > 0 \? \{ 'set-cookie': setCookies \} : undefined\);/);
  // 静态资源照旧同步直出，不触发握手。
  assert.match(proxy, /if \(serveLiteRequest\(req, res, swPath\)\) return;/);
  const auth = proxy.indexOf('enforceAccessControl(');
  const serve = proxy.indexOf('isLitePageRequest(swPath)');
  const handshake = proxy.indexOf('upstreamPathWithLaunchToken(');
  assert.ok(auth > 0 && serve > auth, 'lite must be served after access control');
  assert.ok(handshake === -1 || serve < handshake, 'lite must not go through the normal navigation handshake');
  // 直出页面可能等一次握手，处理器因此是异步的：异常必须仍能兜住（否则 Promise
  // rejection 会变成 unhandledRejection）。
  assert.match(proxy, /async function handleClientRequest\(req, res\)/);
  assert.match(proxy, /pending\.catch\(crash\)/);
  // 仍由 createPocketProxy 出这个处理器（拆包后入口不能丢）。
  assert.match(proxy, /export function createPocketProxy/);
});

test('lite: chat paging survives the poll, and the offline banner can actually hide', () => {
  // 2026-11-12 假宿主实测踩到两件事：① 3 秒轮询整体替换 records，把用户翻出来的
  // 更早消息又丢掉、按钮重新出现；② .banner 设了 display:flex，[hidden] 的 UA 规则
  // 压不住，断线横幅在恢复之后仍然挂在页面上。
  assert.match(app, /function mergeRecords\(existing, incoming\)/);
  assert.match(app, /var firstLoad = state\.records\.length === 0;/);
  assert.match(app, /if \(firstLoad\) state\.hasMore = !!\(page && page\.hasMore\);/);
  assert.match(app, /state\.records = mergeRecords\(state\.records, \(page && page\.records\) \|\| \[\]\);/);
  assert.match(app, /if \(!state\.records\.length \|\| state\.busy \|\| !state\.hasMore\) return;/);
  assert.match(css, /\.banner\[hidden\] \{ display: none; \}/);
  assert.match(css, /\.banner__link\[hidden\], \.banner__retry\[hidden\] \{ display: none; \}/);
});

test('lite: the settings tab exposes an address that prefers the public hostname', () => {
  const src = readFileSync(here('../client/index.jsx'), 'utf8');
  // 地址优先级：公网 > 局域网 > 当前 origin。手机上打开设置页时 location.origin 是电脑地址，
  // 不能作为首选（人在外面就连不上）。
  assert.ok(src.includes("const liteUrl = (tunnelUrl || lanUrl || (typeof location !== 'undefined' ? location.origin : '')) + '/__dsh-pocket/lite';"),
    'lite URL must prefer the public hostname, then LAN, then origin');
  assert.ok(src.includes("t('liteOpen')"), 'settings tab must offer an open button');
  assert.ok(src.includes("h('div', { className: 'dshp-hint', style: { wordBreak: 'break-all' } }, liteUrl)"),
    'settings tab must show the address itself so it can be copied by hand');
  // 打包产物里也要有这个路径，否则设置页拿到的是旧 bundle。
  const bundle = readFileSync(here('../client/client.js'), 'utf8');
  assert.ok(bundle.includes('/__dsh-pocket/lite'), 'built bundle must carry the lite path');
});

test('lite: a page response can carry the host session cookie back to the browser', () => {
  const res = fakeRes();
  assert.equal(isLitePageRequest('/__dsh-pocket/lite'), true);
  assert.equal(isLitePageRequest('/__dsh-pocket/lite/'), true);
  assert.equal(isLitePageRequest('/__dsh-pocket/lite/app.js'), false);
  assert.equal(serveLiteRequest(get('/__dsh-pocket/lite'), res, '/__dsh-pocket/lite', {
    'set-cookie': ['dsh-auth-abc=xyz; Path=/; HttpOnly'],
  }), true);
  assert.equal(res.status, 200);
  assert.deepEqual(res.headers['set-cookie'], ['dsh-auth-abc=xyz; Path=/; HttpOnly']);
  // 代理只给页面传额外头；静态资源照旧直出（随后浏览器自己带 cookie 来取）。
  const js = fakeRes();
  assert.equal(serveLiteRequest(get('/__dsh-pocket/lite/app.js'), js, '/__dsh-pocket/lite/app.js'), true);
  assert.equal(js.headers['set-cookie'], undefined);
});

test('lite: host handshake reuses the navigation token exchange, and fails open', async () => {
  const seen = [];
  const up = createServer((req, res) => {
    seen.push(req.url);
    if (!String(req.url).startsWith('/?token=')) {
      res.writeHead(401, { 'content-type': 'text/plain' });
      res.end('no session');
      return;
    }
    res.writeHead(303, {
      'set-cookie': ['dsh-auth-abc=xyz; Path=/; HttpOnly', 'dsh-desktop-session=1; Path=/'],
      location: '/',
    });
    res.end();
  });
  await new Promise((resolve) => up.listen(0, '127.0.0.1', resolve));
  const upstream = { host: '127.0.0.1', port: up.address().port };
  try {
    const cookies = await fetchHostSession({ upstream, launchToken: 'tok en/+' });
    assert.deepEqual(cookies, ['dsh-auth-abc=xyz; Path=/; HttpOnly', 'dsh-desktop-session=1; Path=/']);
    // 与普通导航同一条路径：token 必须编码，不能原样拼进查询串。
    assert.equal(seen[0], '/?token=tok%20en%2F%2B');
  } finally {
    await new Promise((resolve) => up.close(resolve));
  }
  // 没有启动 token（宿主不再注入）或上游不可达：空数组，页面照常直出。
  assert.deepEqual(await fetchHostSession({ upstream, launchToken: '' }), []);
  assert.deepEqual(await fetchHostSession({ upstream, launchToken: () => '' }), []);
  assert.deepEqual(await fetchHostSession({ upstream, launchToken: 'tok', timeoutMs: 300 }), []);
});

test('lite: proxy hands the browser a host session before serving the page', async () => {
  const seen = [];
  const up = createServer((req, res) => {
    seen.push(req.url);
    if (String(req.url).startsWith('/?token=')) {
      res.writeHead(303, { 'set-cookie': ['dsh-auth-abc=xyz; Path=/; HttpOnly'], location: '/' });
      res.end();
      return;
    }
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end('<html></html>');
  });
  await new Promise((resolve) => up.listen(0, '127.0.0.1', resolve));
  const proxy = await createPocketProxy({
    port: 0,
    host: '127.0.0.1',
    upstream: { host: '127.0.0.1', port: up.address().port },
    launchToken: () => 'tok',
  });
  try {
    const first = await fetch('http://127.0.0.1:' + proxy.port + LITE_PAGE_PATH);
    assert.equal(first.status, 200);
    assert.equal(await first.text(), html, '页面仍由代理直出');
    assert.deepEqual(first.headers.getSetCookie(), ['dsh-auth-abc=xyz; Path=/; HttpOnly']);
    assert.deepEqual(seen, ['/?token=tok'], 'first open does exactly one handshake and does not proxy the page');

    // 每次打开都换一次：宿主侧是现签无状态 cookie，刷新顺带覆盖过期与冷启动。
    const second = await fetch('http://127.0.0.1:' + proxy.port + LITE_PAGE_PATH, {
      headers: { cookie: 'dsh-auth-abc=xyz' },
    });
    assert.equal(second.status, 200);
    assert.deepEqual(second.headers.getSetCookie(), ['dsh-auth-abc=xyz; Path=/; HttpOnly']);
    assert.deepEqual(seen, ['/?token=tok', '/?token=tok'], 'every page open refreshes the host session');
  } finally {
    await proxy.close();
    await new Promise((resolve) => up.close(resolve));
  }
});