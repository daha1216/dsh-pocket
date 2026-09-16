// dsh-pocket 核心：Host/Origin 改写反向代理
//
// 为什么需要它：DSH 的 /api 浏览器信任栅栏只认 loopback（127.0.0.1）或
// `--trusted-host` 白名单（且官方禁了 0.0.0.0 绑定，防止把远程执行代码暴露给网络）。
// 本代理把入站请求的 Host / Origin 统一改写成 loopback 权威（127.0.0.1:3080），
// 转发给本机 dsh web——栅栏永远看到 loopback，于是：
//   - 局域网：手机直接访问 http://<电脑IP>:端口
//   - 公网：cloudflared 隧道指到本代理，任意域名都能进
// 都不需要改 dsh 的任何配置。
//
// 同步保证：普通请求与 WebSocket upgrade（/api/events.host 流式推送）都原样透传，
// 手机看到的界面与电脑完全一致、实时。

import { createServer } from 'node:http';
import { request as httpRequest } from 'node:http';
import { createGzip, createBrotliCompress, constants as zlibConstants } from 'node:zlib';
import { createHash, timingSafeEqual } from 'node:crypto';
// 设备注册表（v2 登录 cookie 的设备身份）：见 lib/devices.mjs 文件头注释
import { LEGACY_DEVICE_ID, newDeviceId, parseUaType } from './devices.mjs';

const DEFAULT_UPSTREAM = { host: '127.0.0.1', port: 3080 };

/**
 * 非安全上下文（http://<LAN-IP>:端口）里浏览器缺两个 API，由代理注入 polyfill
 * （只在缺少时生效，不覆盖原生实现）：
 *   1. crypto.randomUUID——DSH 连接层 mint RPC id 用，缺失直接抛错；
 *   2. AbortSignal.any（issue #53）——Android 厂商浏览器/WebView（Chrome < 116）
 *      无原生实现，DSH 连接层发送消息会调 AbortSignal.any([...])，缺失则消息发不出。
 * 带 data-dsh-pocket-polyfill 标记：注入判重用它，而不是搜索 "crypto.randomUUID"
 * 字样（dsh 页面源码里可能恰好出现该字符串，导致误判为已注入而跳过）。
 */
export const RANDOM_UUID_POLYFILL = `<script data-dsh-pocket-polyfill="1">!function(){try{if(self.crypto&&!self.crypto.randomUUID){self.crypto.randomUUID=function(){var b=new Uint8Array(16);self.crypto.getRandomValues(b);b[6]=b[6]&15|64;b[8]=b[8]&63|128;var h="";for(var i=0;i<16;i++){var x=b[i].toString(16);h+=(x.length<2?"0":"")+x;if(i===3||i===5||i===7||i===9)h+="-";}return h;}}}catch(e){}}();
!function(){try{if(self.AbortSignal&&!self.AbortSignal.any){self.AbortSignal.any=function(signals){var controller=new AbortController();var list=Array.from(signals||[]);var done=false;var handlers=list.map(function(signal){return function(){abort(signal);};});function cleanup(){for(var i=0;i<list.length;i++){try{list[i].removeEventListener('abort',handlers[i]);}catch(e){}}}function abort(signal){if(done)return;done=true;cleanup();try{controller.abort(signal.reason);}catch(e){controller.abort();}}for(var j=0;j<list.length;j++){var sig=list[j];if(sig.aborted){abort(sig);break;}sig.addEventListener('abort',handlers[j],{once:true});}return controller.signal;};}}catch(e){}}();
/* 注：曾用「全局 let location + Proxy」伪装 location.hostname 修 DSH isLoopback 判定
（issue #58：局域网访问模型设置页报 settings unavailable）——但 let location 全局
词法绑定会让任何恰好顶层声明 location 的脚本（DSH 插件经典 script）SyntaxError 崩溃，
导致会话列表不显示（实测 PAGEERROR: Identifier 'location' has already been declared）。
已回退；该问题属 DSH 客户端限制（location.hostname 是 unforgeable 属性）无法安全绕过。*/</script>`;

/**
 * issue #96：dsh 0.1.1-rc.2 起，`@deepseek-ai/dsh-client-connection` 的连接层改成
 *   const api = fixtureClient ?? transport?.createApiClient() ?? new WebApiClient()
 * 其中 transport = globalThis.__DSH_TRANSPORT__（由 DSH 宿主 web shell 注入，本仓库
 * 全程不创建、不引用这个全局）。桌面直连 127.0.0.1:3080 时宿主给的 transport 带
 * createApiClient；经本代理（局域网 / 隧道域名）访问时宿主给的 transport 不带该方法
 * → 手机上一执行就 TypeError: transport?.createApiClient is not a function，整页崩。
 *
 * 兜底策略：只在该方法缺失时补一个返回 null 的实现。null 会触发宿主自己那条
 * `?? new WebApiClient()` 兜底分支，等于让连接层回到旧版本（0.1.1-rc.2 之前）的
 * 行为。宿主自己有实现时一律不覆盖。
 *
 * 这是 stopgap 不是根治：真正的契约缺口在 DSH 宿主，需上游修复。
 */
export const TRANSPORT_API_CLIENT_SHIM = `<script data-dsh-pocket-transport-shim="1">!function(){try{var K='__DSH_TRANSPORT__',cur=globalThis[K];function patch(t){try{if(t&&typeof t==='object'&&typeof t.createApiClient!=='function'){try{Object.defineProperty(t,'createApiClient',{value:function(){return null;},writable:true,configurable:true});}catch(e){try{t.createApiClient=function(){return null;};}catch(e2){}}}}catch(e){}return t;}if(cur)patch(cur);Object.defineProperty(globalThis,K,{configurable:true,enumerable:true,get:function(){return cur;},set:function(t){cur=patch(t);}});}catch(e){}}();</script>`;

const INJECT_MARK = 'data-dsh-pocket-polyfill="1"';

/**
 * DSH Desktop（桌面版）渲染进程兼容补丁（issue #3/#4，已于 issue #76 停用）。
 *
 * 历史：旧版 dsh-plugin-desktop 的 client 在页面加载时从 URL query 读
 * `dsh-desktop-mode` 与 `dsh-desktop-platform`，缺失即抛
 * "invalid or missing dsh-desktop-mode null" → 页面崩（手机扫码访问桌面版时正是如此）。
 * 本脚本用 history.replaceState 补上这两个参数（无跳转、不重载），取最轻的
 * `compatibility` 模式——不激活桌面布局，避免与移动端适配叠加。
 *
 * @deprecated 不要再注入（issue #76，DSH Desktop 2.0.3 起）：
 *   ① mode 与 platform **同时缺失**时，parseDesktopClientEnvironment 直接返回 undefined
 *      （视作非桌面外壳，跳过全部桌面逻辑），正是手机/浏览器页面需要的效果；
 *   ② 只要 URL 上出现任一 dsh-desktop-* 标记，客户端就强制校验整组（material +
 *      semver version + mica），只补两个必然抛 "invalid or missing
 *      dsh-desktop-material" → 插件树加载失败 → 页面变成「打开恢复模式」；
 *   ③ 更糟：decideDesktopBrowserAccess 见到 dsh-desktop-* 前缀就把没有渲染器 token 的
 *      普通浏览器判为 denied（403），刷新后直接打不开。
 * lib/index.js 已不再注入本脚本；保留导出仅为兼容旧版本桌面端与既有测试。
 */
export function desktopEnvPatchScript(platform) {
  const p = ['darwin', 'win32', 'linux'].includes(platform) ? platform : 'linux';
  return `<script data-dsh-pocket-desktop-patch="1">!function(){try{var s=new URLSearchParams(location.search);if(!s.has('dsh-desktop-mode')||!s.has('dsh-desktop-platform')){s.set('dsh-desktop-mode','compatibility');s.set('dsh-desktop-platform','${p}');var u=new URL(location.href);u.search=s.toString();history.replaceState(null,'',u);}}catch(e){}}();</script>`;
}

/** 上游响应是否压缩过（压缩流不能做文本注入，会损坏页面）。 */
function isCompressed(headers) {
  return /(^|,\s*)(gzip|br|deflate)(\s*,|$)/i.test(String(headers['content-encoding'] ?? ''));
}

// ---------- 静态资产长缓存（手机局域网首屏卡顿优化） ----------
// 上游 dsh web 对**带内容哈希的**前端产物（/assets/index-C04Zg7TP.js、
// /plugins/??…&rev=a26cf54b828d）既不返回 cache-control，也没有 etag/last-modified
// （2026-09-14 与 2026-09-16 两次实测）。手机每次进页面都要重新下载全部产物
// （实测约 236 个文件），局域网首屏因此明显迟滞。
// 这里只给「文件名含内容哈希」或「URL 带 rev= 内容版本号」的静态资源补长缓存。
//
// 安全护栏（缺一不可）：
//   ① 状态码必须是 200（401/403/404 等一律不碰）；
//   ② content-type 必须是静态类（js/css/字体/图片/wasm），HTML 文档与 JSON/API 不碰；
//   ③ /api/ 路径一律不碰（宁可漏缓存，不可缓存接口响应）；
//   ④ 上游已给 cache-control 就尊重上游，不覆盖；
//   ⑤ 既无内容哈希、又无 rev= 的静态路径（如 /favicon.svg）**绝不**给 immutable
//      ——名字不带版本，内容随时可能变，行为保持原样（不加任何头）。
export const IMMUTABLE_CACHE_CONTROL = 'public, max-age=31536000, immutable';
const HASHED_FILENAME_RE = /-[A-Za-z0-9_]{8,}\.[a-z0-9]+$/; // Vite: index-C04Zg7TP.js / index-J8NrHpw_.css
const REV_QUERY_RE = /[?&]rev=[A-Za-z0-9_-]{8,}(?:&|#|$)/;  // 插件模块: /plugins/??a,b/client.js&rev=a26cf54b828d
const STATIC_ASSET_TYPE_RE = /^(?:text\/(?:javascript|ecmascript|css)|application\/(?:javascript|ecmascript|x-javascript|wasm|font-|vnd\.ms-fontobject)|font\/|image\/)/;

/**
 * 该响应能否加「一年不可变」长缓存：命中返回 cache-control 值，否则 null。
 * 只看 URL 形态 + 响应类型，不做内容嗅探。
 */
export function staticAssetCacheValue(reqUrl, statusCode, headers = {}) {
  if (statusCode !== 200) return null;
  if (headers['cache-control']) return null;
  const raw = String(reqUrl ?? '');
  const path = raw.split('#')[0].split('?')[0];
  if (path === '/api' || path.startsWith('/api/')) return null;
  const type = String(headers['content-type'] ?? '').split(';')[0].trim().toLowerCase();
  if (!STATIC_ASSET_TYPE_RE.test(type)) return null;
  return HASHED_FILENAME_RE.test(path) || REV_QUERY_RE.test(raw) ? IMMUTABLE_CACHE_CONTROL : null;
}

// ---------- PWA：添加到主屏幕（manifest + 图标，自包含） ----------
// 上游 HTML 自带 <link rel="manifest" href="./manifest.webmanifest">，但那份 manifest
// 只有 favicon.svg 图标、没有 theme_color/background_color，display 是 fullscreen；
// 且上游没有 apple-touch-icon 与 apple-mobile-web-app-* 元信息 → iOS「添加到主屏幕」
// 拿不到图标、也不全屏。这里由代理自己提供 manifest + PNG 图标（base64 内嵌源码，
// 避免二进制补丁），并把上游那条 manifest link **原地改指**到我们这份
// （不新增第二条：浏览器只认第一条 manifest，且验收要求标签无重复）。
//
// 路径前缀 /dsh-pocket-assets/*：与 web-rpc 的 /dsh-pocket RPC 通道不冲突。
export const POCKET_ASSETS_PREFIX = '/dsh-pocket-assets';
export const POCKET_MANIFEST_PATH = `${POCKET_ASSETS_PREFIX}/manifest.webmanifest`;
export const POCKET_ICON_192_PATH = `${POCKET_ASSETS_PREFIX}/icon-192.png`;
export const POCKET_ICON_512_PATH = `${POCKET_ASSETS_PREFIX}/icon-512.png`;
/** Service Worker（Web Push 的通知展示与点击处理）——同样走免认证的资产路由。 */
export const POCKET_SW_PATH = `${POCKET_ASSETS_PREFIX}/sw.js`;
/** 与 dsh 界面协调的深色：取 dsh 启动页深色 token `--dsh-boot-bg: #151517`。 */
const PWA_THEME_COLOR = '#151517';

const PWA_MANIFEST_JSON = JSON.stringify({
  name: 'DeepSeek Harness',
  short_name: 'DSH',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  theme_color: PWA_THEME_COLOR,
  background_color: PWA_THEME_COLOR,
  icons: [
    { src: POCKET_ICON_192_PATH, sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: POCKET_ICON_512_PATH, sizes: '512x512', type: 'image/png', purpose: 'any' },
  ],
}, null, 2);

// 图标 PNG（512x512 / 192x192：#4D6BFE 纯色底 + 居中白色粗体 DSH，轻微字距）。
// 生成方式：Playwright webkit 渲染本地 HTML 截图导出（C:/dsh/pocket-r1-gen-icons.mjs），
// base64 内嵌保证补丁是纯文本；原图留档 C:/dsh/pocket-r1-icon-{512,192}.png。
const PWA_ICON_512_PNG_B64 = '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';
const PWA_ICON_192_PNG_B64 = 'iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAABHNCSVQICAgIfAhkiAAAAQRpQ0NQU2tpYQAAGJWVkLFOwlAUhr+LJILBOMjAwNCBgUWCDsaBCYaGzRRJKE5tKV2gbW5rfAHZGFjZiItvIK/ghomJg5OPQEh0NtdqysLAmb785885/zkgXgCydRj7sTT0ptYz+9rhJwKhOmA5UcjuEvD9nnjfzti/8gM3coA1UJE9sw+iCBS9hKuK7YQbiu/jMAZxrVjeGC0QA6DqbbG9xU4olX8KNMajO7XrLzcF1+92gBxQJsJAp6nuTyzBI1x9wcEs1ew5LCdQ+ki1ygJOHuB5lWrpT0JLWr9SFsgMh7B5gmMTTl/h6Pb/ETuyqXlldAICPEa4aLTxcaihcUGdcy5/AKbWPz91UPXdAAAHIElEQVR4nO3dO2wUVxiG4X9RmlyqWIIibkByF0zpLQNUQbIL3EBEB6QhiqukgEgRBUltlA7SIUFDCkciFQmlKbl0RKGBAiSoAumY6NvxCtus2d0zc3Y9872PtEKyYLHhvHM7Z2Y7i+feFAGY2jPtbwCYJgKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKANQKAtQ+m/Q04+PjDiINzEftnIz6fK792cK4z8Pf+86SIV/9FvHod8fhpxOMnEc9f6uuT/Z5dTDWAk8f0GjwQqnjwqOj92h88+vXBo5i47nzEkYWI7qHRf8YDs29/b/fQ26//+7qIh48i7j6IuL0+2nut/TL+v+3SN+W/XYqUv+/CajGV/5tW7wH6W1dtdTdbv1f0BtD6vehtZfP9/RHfnorYN1Nf3J981OkFodft9fRBCoMAdqItsQbQ6eNF/H4nYu2vekPQoY72akuH69+rIQ+rADZvTTVQF78o4sYfZQh1DP5LK1sPYbD7WV8FUghnlju9gasBnIrB31zWAWw+Z6gSgfYmbPmbiQA2aACnRKATXo75m4sAtkVw/uvx/gFPHKv5fwQTRQADDoeWDo/2j7d3ZucJLTSD5VWgYU58WU42DbtEun2eYRzPXpRXoDQJ9PzF268fmI3Y+2k5a7wwz7lFbo0L4PqtIq7f2vo1Hbcf2FhmoJnXqhNQujq0dPjdv2e7/Z+lvb+WO1xYHRyYljzotX5fP6t+tiKOdnXJtt6JNTQ0gEE0kLQl1UuD5mi3iNPHy4GcSiENDWA27b1v3Bp9Ak6/T/MUeh2cKzjnqFkrzwF0+HL2x3JLm0pbW+1VckidfVbg2nOgPq0MoD/INFh0rF1lL5CDDmewO7Q2gH4El6+l//lhhzhaspy6JmnlVLXZZ9Sj1QH0DxtSV08Ou8Sp9fqpjnY7ceViOYtMCNPTipPgYbTyU1dSUug8YKebUe7eLwdwHYvy/rwbsXZn6yXRaVhLWNPfZK3fA4gGcOq5wPu2zlXe993Lrp24erET589Wm1/AeCwCEN0VlmLY4Ykms+qk84NLK+W6JELIzyeAp3lOhHXJtcrl1vevUOVkOTebAHLSlSbds5tD/2SZvUEeBFADnQv8cDlfBDpH0N4g9UQeOyOAhkQgK6eIoG42AaRea9ejSMaJQEsw9PSJXLTGKdcSDUc2AaQuXEuZff7pSv95N0WWw6HTy7W/rS2LiTBJvXEl9YlsvdWpq+UKTq0p0slsnT+L3neaD5RqC4s9gJ7QlkKTXFWfG6RBunot4uR3RVy9WdQycZZzoZ4biz3A4oi3OFY5/h9nXX93vugdxlS5wUV3i+WwNOFHI07bHoetf+rhz8O/Iwvd7aWT5SqPOKxysw9MAtBN63pGZyo9QzQnHRpVOSRicqy6PW0e/FpYlrql1NZ5lJvizyxXW86sVaCYnlaeA2jGtOo9wVpCPQqt4jyykP6w3SrxPHuZ/mfRsgD6H0BRx9MTtPUf5/Ln5nX9ukdAMYzy5zX4q5zMTvvegTZoXAD6QI0qN6EMo6UM1xOXOCsE7X300rG9riLpRFoDdfM1+/KBWuXzh1JjzbEC1VHjAshN6/vr2LJqYO+bSb8TbZKXaJ219iQ49dCnjs8KmATdPonqCGDTIYUuSzYlVI7/68Eh0MaAunozGkHnKE35XpvAPoBBzxrdzXTPQc4P+HNjG4Cu0uhWxqasqNSW/9ff+LzgutkF0H8s+aiftbtbvuefrzD4c7AIQFtPTVDppYVoddGhiN4718I0vbcm1Zp0iNY0rQtAg0aPQNFzO/WrrpfnOszRbO9X35fLmzWjq1cdMUzqA70R0Vk894YpxRrpft39G5/yog/s6H+QxqAwdGjz/OXWWBUVg35yWrcHmLb+J7y8i+3MbsREGKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAKwRAMLZ/0xy5JY6kTn0AAAAAElFTkSuQmCC';
const PWA_ICON_512_PNG = Buffer.from(PWA_ICON_512_PNG_B64, 'base64');
const PWA_ICON_192_PNG = Buffer.from(PWA_ICON_192_PNG_B64, 'base64');

/**
 * Service Worker 源码（纯静态字符串直出，同 manifest 方式；避免二进制/多文件补丁）。
 *
 * 环境保守：ES5 语法（不用箭头函数 / const / let / 模板字符串）——SW 会被浏览器缓存并
 * 长期运行，老 WebView / 旧 Safari 上也要能解析。能力（规格 B）：
 *   - push：解析 {title, body, tag, url} → showNotification；解析失败给兜底文案；
 *   - notificationclick：关通知 → 有窗口则 focus 并 postMessage(url)，没有则 openWindow(url)；
 *   - pushsubscriptionchange：尽力重新订阅并 POST 回 notify.subscribe。
 * 注册 scope 为 `/`，由 /dsh-pocket-assets/* 路由附带 `Service-Worker-Allowed: /` 放行。
 */
export const POCKET_SW_JS = [
  '/* dsh-pocket service worker —— Web Push 通知展示与点击（纯静态，勿手改：源在 lib/proxy.mjs） */',
  "'use strict';",
  '',
  "var ICON = '/dsh-pocket-assets/icon-192.png';",
  "var FALLBACK_TITLE = 'DSH';",
  "var FALLBACK_BODY = '有新动态，点开查看 | New activity';",
  '',
  '/** 解析推送载荷：优先 JSON，退回纯文本，失败返回 null（用兜底文案）。 */',
  'function parsePush(event) {',
  '  if (!event || !event.data) return null;',
  '  try {',
  '    if (typeof event.data.json === "function") {',
  '      var obj = event.data.json();',
  '      if (obj && typeof obj === "object") return obj;',
  '    }',
  '  } catch (e) { /* 非 JSON：继续退回文本 */ }',
  '  try {',
  '    var text = typeof event.data.text === "function" ? event.data.text() : "";',
  '    if (!text) return null;',
  '    try { return JSON.parse(text); } catch (e2) { return { body: text }; }',
  '  } catch (e3) { return null; }',
  '}',
  '',
  "self.addEventListener('push', function (event) {",
  '  var data = parsePush(event);',
  '  var title = data && typeof data.title === "string" && data.title ? data.title : FALLBACK_TITLE;',
  '  var body = data && typeof data.body === "string" && data.body ? data.body : FALLBACK_BODY;',
  '  var tag = data && typeof data.tag === "string" && data.tag ? data.tag : "dsh-pocket";',
  '  var url = data && typeof data.url === "string" && data.url ? data.url : "/";',
  '  event.waitUntil(self.registration.showNotification(title, {',
  '    body: body,',
  '    tag: tag,',
  '    data: { url: url },',
  '    icon: ICON,',
  '    badge: ICON,',
  '    renotify: false',
  '  }));',
  '});',
  '',
  "self.addEventListener('notificationclick', function (event) {",
  '  try { event.notification.close(); } catch (e) { /* 已关闭 */ }',
  '  var url = "/";',
  '  try { if (event.notification && event.notification.data && event.notification.data.url) url = event.notification.data.url; } catch (e) { /* 忽略 */ }',
  "  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {",
  '    for (var i = 0; i < list.length; i++) {',
  '      var client = list[i];',
  '      try { client.postMessage({ type: "dsh-pocket-notify-click", url: url }); } catch (e) { /* 忽略 */ }',
  '      if (typeof client.focus === "function") { try { return client.focus(); } catch (e) { /* 忽略 */ } }',
  '    }',
  '    if (self.clients.openWindow) return self.clients.openWindow(url);',
  '    return undefined;',
  '  }));',
  '});',
  '',
  "self.addEventListener('pushsubscriptionchange', function (event) {",
  '  var oldSub = event.oldSubscription;',
  '  var next = event.newSubscription',
  '    ? Promise.resolve(event.newSubscription)',
  '    : (oldSub && oldSub.options && oldSub.options.applicationServerKey && self.registration.pushManager',
  '      ? self.registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: oldSub.options.applicationServerKey })',
  '      : Promise.reject(new Error("no subscription available")));',
  '  event.waitUntil(next.then(function (sub) {',
  "    return fetch('/dsh-pocket/notify.subscribe', {",
  "      method: 'POST',",
  "      headers: { 'content-type': 'application/json' },",
  '      body: JSON.stringify({',
  "        rpcId: 'sw-resubscribe',",
  "        method: 'notify.subscribe',",
  "        payload: { subscription: typeof sub.toJSON === 'function' ? sub.toJSON() : sub, source: 'pushsubscriptionchange' },",
  '      }),',
  '    });',
  '  }).catch(function () { /* 尽力而为：失败等用户下次开页面时 UI 重新订阅 */ }));',
  '});',
  '',
].join('\n');

/**
 * PWA 静态资源路由（GET/HEAD）：命中返回 { body, type, cache, headers? }，否则 null。
 * 只按**路径**匹配（忽略 query，便于带版本参数击穿缓存）。
 */
export function pwaAsset(url) {
  const path = String(url ?? '').split('#')[0].split('?')[0];
  if (path === POCKET_MANIFEST_PATH) {
    return { body: Buffer.from(PWA_MANIFEST_JSON, 'utf8'), type: 'application/manifest+json', cache: 'no-store' };
  }
  if (path === POCKET_SW_PATH) {
    // Service Worker：绝不能缓存（旧 SW 会一直拦请求）；scope 注册在 /，所以脚本虽在
    // /dsh-pocket-assets/ 下，必须显式声明 Service-Worker-Allowed: /。
    return {
      body: Buffer.from(POCKET_SW_JS, 'utf8'),
      type: 'text/javascript; charset=utf-8',
      cache: 'no-store',
      headers: { 'service-worker-allowed': '/' },
    };
  }
  if (path === POCKET_ICON_512_PATH) return { body: PWA_ICON_512_PNG, type: 'image/png', cache: 'public, max-age=86400' };
  if (path === POCKET_ICON_192_PATH) return { body: PWA_ICON_192_PNG, type: 'image/png', cache: 'public, max-age=86400' };
  return null;
}

const PWA_MARK = 'data-dsh-pocket-pwa="1"';

/**
 * theme-color 同步脚本（为什么需要）：
 * dsh 客户端主题插件在**运行时**往 head 追加自己的 `<meta name="theme-color">`
 * （浅色 `rgb(255,255,255)`，深色随主题），而 HTML 规范规定「树序中第一个 media 匹配的
 * theme-color 生效」——我们注入的静态标签在 head 最前面，会把应用自己那个盖掉
 * （实测：应用只追加、不改写已有标签），于是浅色界面配深色状态栏。
 * 这里用一个极小 MutationObserver 把应用选定的颜色镜像到我们这个（生效的）标签上；
 * 应用始终没给值时保留静态深色兜底。
 */
const PWA_THEME_COLOR_SYNC = `<script data-dsh-pocket-pwa-color="1">!function(){try{var OWN="data-dsh-pocket-pwa",SEL='meta[name="theme-color"]';function src(){var a=document.querySelectorAll(SEL);for(var i=a.length-1;i>=0;i--){if(a[i].getAttribute(OWN)!=="1")return a[i];}return null;}function sync(){try{var s=src();if(!s)return;var m=document.querySelector(SEL+"["+OWN+'="1"]');if(!m)return;var v=s.getAttribute("content");if(v&&m.getAttribute("content")!==v)m.setAttribute("content",v);}catch(e){}}function start(){try{new MutationObserver(sync).observe(document.head,{childList:true,subtree:true,attributes:true,attributeFilter:["content"]});}catch(e){}sync();}if(document.head)start();else document.addEventListener("DOMContentLoaded",start,{once:true});}catch(e){}}();</script>`;

/** PWA head 标签：每条自带「已存在检测」，保证只注入一次、不与上游标签重复。 */
const PWA_HEAD_TAGS = [
  {
    test: /<link\b[^>]*\brel\s*=\s*["']?apple-touch-icon/i,
    tag: `<link rel="apple-touch-icon" sizes="512x512" href="${POCKET_ICON_512_PATH}" ${PWA_MARK} />`,
  },
  {
    test: /<meta\b[^>]*\bname\s*=\s*["']?apple-mobile-web-app-capable/i,
    tag: `<meta name="apple-mobile-web-app-capable" content="yes" ${PWA_MARK} />`,
  },
  {
    test: /<meta\b[^>]*\bname\s*=\s*["']?mobile-web-app-capable/i,
    tag: `<meta name="mobile-web-app-capable" content="yes" ${PWA_MARK} />`,
  },
  {
    test: /<meta\b[^>]*\bname\s*=\s*["']?apple-mobile-web-app-status-bar-style/i,
    tag: `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" ${PWA_MARK} />`,
  },
  {
    test: /<meta\b[^>]*\bname\s*=\s*["']?apple-mobile-web-app-title/i,
    tag: `<meta name="apple-mobile-web-app-title" content="DSH" ${PWA_MARK} />`,
  },
  {
    test: /<meta\b[^>]*\bname\s*=\s*["']?theme-color/i,
    tag: `<meta name="theme-color" content="${PWA_THEME_COLOR}" ${PWA_MARK} />${PWA_THEME_COLOR_SYNC}`,
  },
];

const PWA_MANIFEST_LINK = `<link rel="manifest" href="${POCKET_MANIFEST_PATH}" ${PWA_MARK} />`;

/**
 * 把 PWA 标签注入 HTML（幂等：二次调用不再新增；上游已有同名标签则跳过）。
 * manifest 特殊处理：无论上游有没有 manifest link，结果都**恰好一条**，指向我们这份。
 */
export function applyPwaHead(html) {
  let out = String(html);
  const headOpen = /<head[^>]*>/i;
  if (/<link\b[^>]*\brel\s*=\s*["']?manifest/i.test(out)) {
    out = out.replace(/<link\b[^>]*\brel\s*=\s*["']?manifest[^>]*>/i, PWA_MANIFEST_LINK);
  } else if (headOpen.test(out)) {
    out = out.replace(headOpen, (m) => m + PWA_MANIFEST_LINK);
  }
  const add = PWA_HEAD_TAGS.filter(({ test }) => !test.test(out)).map(({ tag }) => tag);
  if (add.length) out = out.replace(headOpen, (m) => m + add.join(''));
  return out;
}

/**
 * 默认注入到经代理的 HTML 文档里：crypto.randomUUID / AbortSignal.any polyfill
 * （非安全上下文必需）+ issue #96 的 transport.createApiClient 兜底。
 * 注：PWA（manifest / apple-touch-icon / 元信息）不在这里，而是在响应链上由
 * applyPwaHead() 单独应用——它除了插入标签还要**改写上游已有的 manifest link**。
 */
export const DEFAULT_INJECT = RANDOM_UUID_POLYFILL + TRANSPORT_API_CLIENT_SHIM;

/**
 * DSH Desktop advanced 模式不支持的提示覆盖层（issue #19）。
 * advanced 组合会禁用网页版 ui-layout，而桌面 layout 只在 advanced client 提供——
 * 手机页面被注入 compatibility 后无任何 layout 服务 → 启动白屏（Failed to load plugins）。
 * 该脚本在页面上叠加一个固定警告层，让用户明确知道原因（而不是无解白屏）。
 */
export function advancedNoticeScript() {
  return `<script data-dsh-pocket-advanced-notice="1">!function(){try{var d=document.createElement('div');d.style.cssText='position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);color:#fff;font:15px/1.7 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;text-align:center;padding:24px';d.textContent='DSH 桌面端处于 advanced 模式，手机访问暂不支持。请在桌面端设置中切回 compatibility 模式后重启。| DSH Desktop is in advanced mode — phone access is not supported yet. Switch back to compatibility in the desktop app and restart.';document.documentElement.appendChild(d);}catch(e){}}();</script>`;
}

// ---------- 可选访问令牌认证（issue #13 + #33） ----------
// 只对受保护 Host（公网隧道 + 局域网按开关）强制。
// 登录成功后种 HttpOnly 持久 cookie（Max-Age 30 天）→ SPA 内部 API/WS 自动携带。
// 会话保持（issue #33）：cookie 值 = sha256(PIN:sessionKey)——sessionKey 是 dsh web
// 进程级随机密钥（lib/index.js 每次启动生成）。于是：
//   - 电脑 dsh web 一直开着 → 手机输一次密码后长期免输（持久 cookie）
//   - dsh web 重启/更新 → sessionKey 变化 → 旧 cookie 失效 → 手机重新输入
const TOKEN_COOKIE = 'dsh_pocket_token';
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 天（秒）

/** cookie 校验值（v1，升级前形态）：有 sessionKey 时派生，无则退化为 PIN 本身（向后兼容）。 */
function cookieFor(token, sessionKey) {
  if (!sessionKey) return token;
  return createHash('sha256').update(`${token}:${sessionKey}`).digest('hex');
}

// ---------- v2 设备 cookie（本轮新增：每台设备独立身份） ----------
// 形态 `v2.<deviceId 16hex>.<hash>`，hash = sha256(`${deviceId}:${PIN}:${sessionKey}:${epoch}`)。
//   - deviceId 让服务端区分「这台手机」和「那台手机」（v1 的 sha256(PIN:sessionKey) 是同值，
//     无法区分，也因此无法单独踢下线）；
//   - PIN 在公式里 → PIN 轮换（刷新/自定义/开启公网自动换）后旧 cookie 自然失效；
//   - sessionKey 在公式里 → dsh web 重启后旧 cookie 自然失效（与 v1 同一套会话保持语义）；
//   - epoch 在公式里 → 「下线其他设备」把 epoch +1 即可让除调用者外的所有 cookie 失效。
// 校验还要查注册表：设备条目被删除（单独下线）即吊销。
/** v2 cookie 解析（`v2.<16hex>.<64hex>`）；非 v2 形态返回 null。 */
export function parseDeviceCookie(value) {
  const m = /^v2\.([0-9a-f]{16})\.([0-9a-f]{64})$/.exec(String(value ?? '').trim());
  return m ? { deviceId: m[1], hash: m[2] } : null;
}

/** v2 cookie 校验值（同一 epoch 下重复计算即可复现）。 */
export function deviceCookieHash(deviceId, pin, sessionKey, epoch) {
  return createHash('sha256').update(`${deviceId}:${pin}:${sessionKey}:${epoch}`).digest('hex');
}

/** 拼出 v2 cookie 值。 */
export function deviceCookieValue(deviceId, pin, sessionKey, epoch) {
  return `v2.${deviceId}.${deviceCookieHash(deviceId, pin, sessionKey, epoch)}`;
}

/** 带完整属性的 Set-Cookie 值（HTTP 响应头与 RPC 层刷新调用者 cookie 共用同一份属性）。 */
export function authCookieHeader(value) {
  return `${TOKEN_COOKIE}=${value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${COOKIE_MAX_AGE}`;
}

/**
 * 校验 dsh_pocket_token 的**值**（HTTP 与 WebSocket 共用）。
 * @param {string} value cookie 值
 * @param {{devices?:object, sessionKey?:string, pinForScope?:(scope:string)=>string}} opts
 * @returns {{ok:boolean, deviceId:string|null, legacy:boolean, legacyAllowed:boolean, reason:string}}
 *   legacyAllowed：形态是 v1（64hex 无点）**且** epoch 还是 1 —— 调用方据此决定要不要再拿 PIN
 *   列表做一次 v1 比对（只有调用方知道 PIN 列表）。
 */
export function verifyDeviceCookieValue(value, { devices = null, sessionKey = null, pinForScope = null } = {}) {
  const raw = String(value ?? '').trim();
  const none = { ok: false, deviceId: null, legacy: false, legacyAllowed: false, reason: 'none' };
  if (!raw) return none;
  const v2 = parseDeviceCookie(raw);
  if (v2) {
    if (!devices || !sessionKey || typeof pinForScope !== 'function') return { ...none, reason: 'v2-unsupported' };
    const device = devices.get(v2.deviceId);
    if (!device) return { ...none, reason: 'revoked' };      // 注册表里没有 → 已下线
    const pin = pinForScope(device.scope);
    if (!pin) return { ...none, reason: 'no-pin' };
    const expected = deviceCookieHash(v2.deviceId, pin, sessionKey, devices.epoch());
    if (!safeEqual(v2.hash, expected)) return { ...none, reason: 'mismatch' }; // PIN 轮换 / epoch 变更 / 伪造
    return { ok: true, deviceId: v2.deviceId, legacy: false, legacyAllowed: false, reason: 'v2' };
  }
  // v1（升级前签发，无设备身份）：仅在 epoch===1 时仍被接受
  const legacyAllowed = !devices || devices.epoch() === 1;
  return { ...none, legacyAllowed, reason: legacyAllowed ? 'legacy' : 'legacy-epoch' };
}

/**
 * 从 Cookie 头识别「当前是哪台设备」（RPC 层标记「本机」用）。
 * v2 → 完整校验（含 hash 重算）；v1 → 仅当注册表里已有 legacy 条目时认作 legacy。
 * @returns {{id:string, legacy:boolean}|null}
 */
export function identifyDeviceFromCookie(cookieHeader, { devices = null, sessionKey = null, pinForScope = null } = {}) {
  const value = parseCookies(String(cookieHeader ?? ''))[TOKEN_COOKIE];
  if (!value) return null;
  const v = verifyDeviceCookieValue(value, { devices, sessionKey, pinForScope });
  if (v.ok) return { id: v.deviceId, legacy: false };
  if (v.legacyAllowed && devices?.has(LEGACY_DEVICE_ID)) return { id: LEGACY_DEVICE_ID, legacy: true };
  return null;
}

// ---------- 登录速率限制（issue #40，改进版方案 A） ----------
// 8 位数字密码（10^8 组合）本身可接受，真正风险是「无限制重试」让穷举可行。
// 这里做三层防护（内存态，随进程生命周期，与 sessionKey 一致）：
//   1) 单 IP 滑动窗口：60 秒内失败 ≥5 次 → 锁 60 秒（429）
//   2) 全局滑动窗口：1 分钟全局失败 > 50 次 → 全局锁 30 秒（防分布式扫描换 IP 绕过）
//   3) 成功登录清空该 IP 计数
// IP 识别：优先 cf-connecting-ip（Cloudflare 在隧道入口设置的**真实**客户端 IP，
// 可信）；无则回退 socket remoteAddress。**不信任客户端 x-forwarded-for**（可伪造）。
export const DEFAULT_RATE_LIMIT = {
  windowMs: 60_000,      // 失败计数滑动窗口
  maxFailures: 5,        // 窗口内失败阈值 → 触发单 IP 锁
  lockMs: 60_000,        // 单 IP 锁定时长
  globalMaxFailures: 50, // 全局失败阈值（同窗口）→ 触发全局锁
  globalLockMs: 30_000,  // 全局锁定时长
};
function createRateLimiter(cfg = {}) {
  const c = { ...DEFAULT_RATE_LIMIT, ...cfg };
  const failCounts = new Map(); // ip -> { count, windowStart }
  const ipLocks = new Map();    // ip -> lockedUntil
  const global = { count: 0, windowStart: 0, lockedUntil: 0 };
  return {
    /** 该 IP 当前是否被锁；返回 { locked, retryAfter }。 */
    status(ip) {
      const now = Date.now();
      if (global.lockedUntil > now) return { locked: true, retryAfter: Math.ceil((global.lockedUntil - now) / 1000) };
      const until = ipLocks.get(ip) ?? 0;
      if (until > now) return { locked: true, retryAfter: Math.ceil((until - now) / 1000) };
      return { locked: false, retryAfter: 0 };
    },
    /** 记一次失败：维护滑动窗口计数，达阈值触发单 IP / 全局锁。 */
    record(ip) {
      const now = Date.now();
      let rec = failCounts.get(ip);
      if (!rec || now - rec.windowStart > c.windowMs) rec = { count: 0, windowStart: now };
      rec.count++;
      failCounts.set(ip, rec);
      if (now - global.windowStart > c.windowMs) { global.count = 0; global.windowStart = now; }
      global.count++;
      if (rec.count >= c.maxFailures) ipLocks.set(ip, now + c.lockMs);
      if (global.count >= c.globalMaxFailures) global.lockedUntil = now + c.globalLockMs;
      // 防内存膨胀：超过 2000 条记录时清掉已过窗口期的条目
      if (failCounts.size > 2000) {
        for (const [k, v] of failCounts) {
          if (now - v.windowStart > c.windowMs) failCounts.delete(k);
        }
      }
    },
    /** 成功登录：清空该 IP 计数与锁。 */
    clear(ip) {
      failCounts.delete(ip);
      ipLocks.delete(ip);
    },
  };
}
/**
 * 客户端真实 IP（限速与握手计数的身份键）：
 *   - 来自本机（cloudflared 隧道回连，源地址 loopback）→ 认 cf-connecting-ip（Cloudflare 边缘写的真实客户端 IP）；
 *   - 其余一律用 socket 源地址。
 *
 * 为什么不能无条件信任 cf-connecting-ip：那是**请求头**，能直连代理端口的人可以随手
 * 伪造。隧道流量必经本机 cloudflared（源地址必为 loopback），所以把它限定在 loopback
 * 来源既不影响隧道场景，又让「换头即换身份」的限速绕过失效。XFF 同理，始终不认。
 */
export function clientIp(req) {
  const addr = String(req.socket?.remoteAddress ?? '');
  if (classifySource(addr) === 'loopback') {
    const cf = String(req.headers['cf-connecting-ip'] ?? '').trim();
    if (cf) return cf;
  }
  return addr || 'unknown';
}

function parseCookies(header) {
  const out = {};
  for (const part of String(header ?? '').split(';')) {
    const eq = part.indexOf('=');
    if (eq > 0) out[part.slice(0, eq).trim()] = part.slice(eq + 1).trim();
  }
  return out;
}

/** 登录页：按访问来源显示提示（局域网 / 公网）；error: false|true|'locked'（locked 带剩余秒数）。 */
function loginPageHtml(error, isPublic, retryAfter = 0) {
  const where = isPublic ? '此公网地址' : '此局域网地址';
  const whereEn = isPublic ? 'This public address' : 'This LAN address';
  const errMsg = error === 'locked'
    ? `尝试次数过多，请 ${retryAfter} 秒后再试 | Too many attempts — try again in ${retryAfter}s`
    : error ? '密码错误，请重试 | Wrong PIN, try again' : '';
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DSH Pocket · 访问验证</title>
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:28px 24px;max-width:320px;width:calc(100% - 48px);text-align:center}
h1{font-size:16px;margin:0 0 4px;color:#111827}
p{font-size:13px;color:#6b7280;margin:0 0 16px}
input{width:100%;box-sizing:border-box;padding:10px 12px;font-size:18px;letter-spacing:6px;text-align:center;border:1px solid #d1d5db;border-radius:8px;outline:none;margin-bottom:12px}
input:focus{border-color:#4f6ef7}
button{width:100%;padding:10px;font-size:15px;background:#4f6ef7;color:#fff;border:none;border-radius:8px;cursor:pointer}
.err{color:#dc2626;font-size:12px;margin-bottom:10px;min-height:16px}
</style></head><body><div class="card">
<h1>🔐 DSH Pocket</h1>
<p>${where}受访问密码保护，请输入 8 位密码（英文字母或数字） | ${whereEn} is password-protected — enter the 8-character PIN (letters/digits)</p>
<div class="err">${errMsg}</div>
<form method="post" action="/pocket-login">
<input name="token" type="password" maxlength="8" autocomplete="one-time-code" autofocus required>
<button type="submit">进入 | Enter</button>
</form>
</div></body></html>`;
}

/**
 * Host 信任边界分类（issue #66：fail closed）。
 *
 * 旧逻辑只认 `*.trycloudflare.com` 后缀为公网，其余一律当局域网——用户自建
 * 命名隧道/反向代理指向本机端口时，固定域名被误判成局域网；若局域网密码又
 * 关着，公网入口就无密码裸奔。现在反转为 fail closed：
 *   - loopback：localhost / 127.x / ::1 / 0.0.0.0（本机与 cloudflared 回连）
 *   - lan：RFC1918 私网 IPv4、CGNAT 100.64/10（RFC 6598，Tailscale/ZeroTier 默认网段，
 *     公网不可路由）、IPv6 ULA/link-local、`.local`（mDNS）、无点单标签名（NetBIOS 计算机名等）
 *   - public：其余一切 Host（trycloudflare 或任何陌生域名）→ 强制公网密码
 *
 * @returns {'loopback'|'lan'|'public'}
 */
export function classifyHost(host) {
  let name = String(host ?? '').trim().toLowerCase();
  if (name.startsWith('[')) {
    const end = name.indexOf(']');
    if (end >= 0) name = name.slice(1, end); // [::1]:3081 → ::1
  } else {
    name = name.replace(/:\d+$/, ''); // hostname:3081 / 127.0.0.1:3081 → 去掉端口
  }
  if (name === 'localhost' || name === '0.0.0.0' || name === '::1' || /^127\./.test(name)) return 'loopback';
  // RFC1918 私网 + CGNAT 100.64/10（RFC 6598，Tailscale/ZeroTier 默认网段，公网不可路由）
  if (/^(?:10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.|100\.(?:6[4-9]|[7-9]\d|1(?:0\d|1\d|2[0-7]))\.)/.test(name)) return 'lan';
  if (/^(?:fe80:|f[cd][0-9a-f]{2}:)/.test(name) && name.includes(':')) return 'lan'; // IPv6 link-local / ULA
  if (name === '' || name.includes(':')) return 'loopback'; // 裸 IPv6 / 无 Host → 当本机
  if (name.endsWith('.local') || !name.includes('.')) return 'lan'; // mDNS / NetBIOS 单标签名
  return 'public';
}

/** 该 Host 是否受访问密码保护（公网一律要密码；局域网/本机按设置页开关）。 */
function isProtectedHost(host, isProtected) {
  return isProtected ? isProtected(host) : classifyHost(host) === 'public';
}

/** 保护强度序：本机最弱（可免密）→ 局域网（按开关）→ 公网（永远要密码）。 */
const HOST_CLASS_RANK = { loopback: 0, lan: 1, public: 2 };

/**
 * 按 TCP 源地址给出来源类别（issue #90）。
 * 与 classifyHost 的区别在**兜底方向**：Host 头里认不出的形态按 loopback 处理
 * （历史行为，避免裸 IPv6 之类把本机访问判成公网）；而源地址认不出时必须按
 * public 处理——源地址是我们唯一不可伪造的信息，兜底方向错了整条防线就白搭。
 * @returns {'loopback'|'lan'|'public'|null} null 表示拿不到源地址（不做任何收紧）
 */
export function classifySource(addr) {
  let a = String(addr ?? '').trim().toLowerCase();
  if (!a) return null;
  if (a.startsWith('::ffff:')) a = a.slice(7); // IPv4-mapped IPv6（Node 双栈监听时常见）
  if (a === '::1' || /^127\./.test(a)) return 'loopback';
  // RFC1918 私网 + CGNAT 100.64/10（与 classifyHost 保持同一套网段判定）
  if (/^(?:10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.|100\.(?:6[4-9]|[7-9]\d|1(?:0\d|1\d|2[0-7]))\.)/.test(a)) return 'lan';
  if (/^169\.254\./.test(a)) return 'lan';            // IPv4 link-local
  if (/^(?:fe80:|f[cd][0-9a-f]{2}:)/.test(a)) return 'lan'; // IPv6 link-local / ULA
  return 'public';
}

/**
 * 用于策略判定的 Host（issue #90 第 7 条）。
 *
 * Host 头完全由客户端控制：能直连代理端口的人只要写 `Host: 127.0.0.1:3081`
 * 就会被 classifyHost 判成本机，从而绕过局域网开关和局域网密码——用户若按
 * README 关掉了局域网密码，这就是一条零认证通道。TCP 源地址无法伪造，用它给
 * Host 声明设一个下限。
 *
 * **只收紧、绝不放松**：经 cloudflared 隧道进来的公网请求源地址正是 127.0.0.1，
 * 若按源地址覆盖就会把公网访问降级成本机免密，比原来的问题更严重。所以仅当
 * 声明的保护级别**低于**来源真实级别时，才改用源地址参与判定。
 */
export function policyHost(req, host) {
  const actual = classifySource(req?.socket?.remoteAddress);
  if (!actual) return host;
  const claimed = classifyHost(host);
  if (HOST_CLASS_RANK[actual] <= HOST_CLASS_RANK[claimed]) return host;
  // 用真实源地址替代被伪造的 Host 参与后续全部策略判定（密码归属、局域网开关、
  // 局域网地址覆盖），保证各处判定看到的是同一个来源。
  let addr = String(req.socket.remoteAddress);
  if (addr.toLowerCase().startsWith('::ffff:')) addr = addr.slice(7);
  return addr;
}

/**
 * 该 Host 是否 loopback（本机 / cloudflared 回环）。
 * 「关闭局域网」只拦截经局域网 IP/主机名访问的请求，loopback 与公网（trycloudflare）放行：
 *   - cloudflared 隧道以 `http://127.0.0.1:<port>` 回连本机代理，必须放行；
 *   - 电脑自己访问 127.0.0.1/localhost 也应放行（仅当用户手动浏览本代理时）。
 */
function isLoopbackHost(host) {
  let name = String(host ?? '').trim().toLowerCase();
  if (name.startsWith('[')) {
    const end = name.indexOf(']');
    if (end >= 0) name = name.slice(1, end); // [::1]:port → ::1
  } else {
    name = name.replace(/:\d+$/, ''); // hostname:port / 127.0.0.1:port → 去掉端口
  }
  return name === 'localhost' || name === '127.0.0.1' || name === '::1' || name === '0.0.0.0';
}

/** 局域网访问已关闭时的提示页（浏览器导航时显示；API/WS 返回 403 JSON/拒绝握手）。 */
function lanDisabledPageHtml() {
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DSH Pocket · 局域网访问已关闭</title>
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:28px 24px;max-width:360px;width:calc(100% - 48px);text-align:center}
h1{font-size:16px;margin:0 0 8px;color:#111827}
p{font-size:13px;color:#6b7280;margin:0;line-height:1.6}
</style></head><body><div class="card">
<h1>🔒 DSH Pocket</h1>
<p>局域网访问已关闭，扫码/链接均不可用。<br>请在电脑上重新开启后再试。<br><br>LAN access is disabled — the QR code and link are unavailable.<br>Re-enable it on the computer to continue.</p>
</div></body></html>`;
}

/** 桌面端浏览器访问门禁提示页（issue #81）：DSH Desktop 未开启「浏览器访问」时，
 * 上游 desktop-browser-access 门禁对普通浏览器（含经本代理转发的手机）返回 403
 * `forbidden`，且本代理无法携带 Electron renderer secret 绕过。对符合该特征的
 * 浏览器导航请求返回此可操作提示页；API/WS 与其余 403 原样透传。 */
function desktopAccessBlockedPageHtml() {
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DSH Pocket · 桌面端未开启浏览器访问</title>
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:28px 24px;max-width:392px;width:calc(100% - 48px);text-align:center}
h1{font-size:16px;margin:0 0 8px;color:#111827}
p{font-size:13px;color:#6b7280;margin:0 0 12px;line-height:1.6}
code{background:#f3f4f6;padding:2px 6px;border-radius:6px;font-size:12px;color:#374151}
.step{text-align:left;background:#f9fafb;border:1px solid #eef2f7;border-radius:10px;padding:12px 14px;margin-top:8px;font-size:12px;color:#4b5563;line-height:1.8}
</style></head><body><div class="card">
<h1>🖥️ DSH Pocket</h1>
<p>你已通过访问密码，但页面仍被拦截。<br>因为本机 DSH Desktop 未开启「浏览器访问」，桌面门禁拒绝了普通浏览器（含手机）的页面请求。</p>
<div class="step">
<strong>解决方法（任选其一）：</strong><br>
1. DSH Desktop → 设置 → 窗口 / 模式 → 开启「浏览器访问」（自动切到 compatibility 模式）→ <strong>重启 DSH Desktop</strong>。<br>
2. 或在配置文件中设置：<br>
<code>dsh-desktop: { mode: compatibility, openBrowser: true }</code><br>
然后重启 DSH Desktop，再刷新本页。
</div>
<p style="margin-top:14px">注意：访问密码登录成功 ≠ 已获得桌面 Web 访问授权。门禁由 DSH Desktop 控制，pocket 无法代为绕过。</p>
<p style="color:#9ca3af">The host DSH Desktop has "browser access" disabled. Enable it (Settings → window/mode → browser access → restart), or set <code>dsh-desktop.mode: compatibility, openBrowser: true</code>, then refresh.</p>
</div></body></html>`;
}

/** 请求是否期望 HTML（浏览器导航 → 返回登录页；API/WS → 401）。 */
function isHtmlRequest(req) {
  const accept = String(req.headers.accept ?? '');
  if (accept.includes('text/html')) return true;
  const url = String(req.url ?? '');
  // 按 pathname 判断，别用 `url === '/'` 严格比 —— 根路径常带 query
  // （`/?dsh-pocket-auth=1`、`/?dsh-pocket-retry=1`、`/?token=…`），
  // 那些同样是浏览器导航，漏判会让它们拿到 401/303 而不是该给的页面。
  let pathname = url;
  try { pathname = new URL(url || '/', 'http://dsh.invalid').pathname; } catch { /* 用原值兜底 */ }
  return pathname === '/' || /\.html?$/i.test(pathname);
}

/**
 * 常量时间的密码比较（issue #90）：普通 `===` 会在首个不同字节处提前返回，
 * 理论上可被计时侧信道逐字节还原 PIN。长度不同直接判否（PIN 长度固定，
 * 长度本身不是秘密），等长则走 timingSafeEqual。
 */
function safeEqual(a, b) {
  const ba = Buffer.from(String(a ?? ''), 'utf8');
  const bb = Buffer.from(String(b ?? ''), 'utf8');
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/**
 * 请求是否携带 `?token=` —— 用于区分「一次密码尝试」与「普通未认证访问」（issue #90）。
 * 只有前者计入限速失败：普通未认证访问（无 cookie 无 token）本来就该看到登录页，
 * 若也计数，正常用户第一次打开页面就会把自己锁死（子资源还会放大）。
 * cookie 不匹配同样不计数——cookie 值是 sha256(PIN:sessionKey)，攻击者不知道
 * 进程级 sessionKey，这条通道本身不可穷举；而 dsh web 重启后旧 cookie 必然失配，
 * 计数只会误锁老用户。
 */
function hasQueryToken(req) {
  try {
    return new URL(req.url ?? '/', 'http://x').searchParams.get('token') != null;
  } catch {
    return false;
  }
}

/** 校验请求是否已认证。返回 { ok, rawQueryToken, deviceId, legacy }：
 *  - ok=true：已认证；rawQueryToken 是 URL `?token=<PIN>` 命中的那条原始密码（用于种 cookie）；
 *  - 已有 cookie 命中 → rawQueryToken=null（不要重复种）；
 *  - deviceId：命中的设备 id（v2 = 注册表 id，v1 = 'legacy'，无注册表 = null）。
 * @param {object} [opts] { devices, pinForScope } —— 传了才会走 v2 设备校验（否则完全是 v1 老行为） */
function authCheck(req, tokens, sessionKey, opts = {}) {
  const list = (Array.isArray(tokens) ? tokens : tokens ? [tokens] : []).filter(Boolean);
  if (list.length === 0) return { ok: true, rawQueryToken: null, deviceId: null, legacy: false };
  const cookies = parseCookies(req.headers.cookie);
  const cookieTok = cookies[TOKEN_COOKIE];
  if (cookieTok) {
    const v = verifyDeviceCookieValue(cookieTok, { ...opts, sessionKey });
    if (v.ok) return { ok: true, rawQueryToken: null, deviceId: v.deviceId, legacy: false };
    // v1（64hex 无点）：与 PIN 列表逐个常量时间比对——只有这条老通道需要 PIN 明文参与
    if (v.legacyAllowed) {
      for (const token of list) {
        if (safeEqual(cookieTok, cookieFor(token, sessionKey))) {
          return { ok: true, rawQueryToken: null, deviceId: LEGACY_DEVICE_ID, legacy: true };
        }
      }
    }
  }
  const qTok = new URL(req.url ?? '/', 'http://x').searchParams.get('token');
  if (qTok) {
    // URL `?token=<原始 PIN>` 用于分享/扫码直达：用户拿到 URL 就能直输明文 PIN，
    // 不需要把 sha256 哈希也告诉他们。匹配上后由调用方通过 maybeSeedAuthCookie
    // 种 HttpOnly 哈希 cookie，让浏览器后续子资源（assets/*.js 等）也走 cookie
    // 路径——避免「主页 200 但子资源 401」白屏（issue #35）。
    for (const token of list) {
      if (safeEqual(qTok, token)) return { ok: true, rawQueryToken: qTok, deviceId: null, legacy: false };
    }
  }
  return { ok: false, rawQueryToken: null, deviceId: null, legacy: false };
}

/** 把一枚 dsh_pocket_token 写进响应的 set-cookie（monkey-patch res.writeHead 注入第一个响应）。
 *  原实现只在「还没有 cookie」时种；v2 需要能把旧的 v1/失效 cookie **替换**掉（升级与重新登录路径），
 *  所以这里改为无条件写值。 */
function maybeSeedAuthCookie(req, res, cookieValue) {
  if (!cookieValue) return;
  const origWriteHead = res.writeHead.bind(res);
  res.writeHead = function (statusCode, headers) {
    const h = { ...(headers ?? {}) };
    const cookie = authCookieHeader(cookieValue);
    // 已有 set-cookie 头（数组/字符串都支持）则追加
    const prev = h['set-cookie'];
    if (Array.isArray(prev)) h['set-cookie'] = [...prev, cookie];
    else if (typeof prev === 'string') h['set-cookie'] = [prev, cookie];
    else h['set-cookie'] = cookie;
    return origWriteHead(statusCode, h);
  };
}

/**
 * 把浏览器可见的权威改写成 loopback 权威。
 * 除 Host/Origin 外，还必须规范化 Referer 与 Sec-Fetch-Site：DSH 宿主的特权方法
 * 栅栏（settings.describe/credentials.* 等 PRIVILEGED_METHODS）会拒绝
 * sec-fetch-site === 'cross-site'，并校验 Origin 与 Host 匹配；远程访问的这两个头
 * 若不改写，设置/凭据平面会在宿主侧被 403（issue #58 的另一半）。
 * 统一小写化键名，避免 Node 原样转发时大小写键并存导致重复头。
 */
function loopbackAuthority(headers, upstream) {
  const authority = `${upstream.host}:${upstream.port}`;
  const out = {};
  for (const [k, v] of Object.entries(headers)) {
    const lk = k.toLowerCase();
    if (lk === 'host' || lk === 'origin' || lk === 'referer' || lk === 'sec-fetch-site') continue;
    out[lk] = v;
  }
  out.host = authority;
  out.origin = `http://${authority}`;
  const referer = headers.referer ?? headers.Referer;
  if (referer) {
    try {
      const ref = new URL(referer);
      ref.protocol = 'http:';
      ref.host = authority;
      out.referer = ref.toString();
    } catch {
      out.referer = `http://${authority}/`;
    }
  }
  out['sec-fetch-site'] = 'same-origin';
  return out;
}

// ---------- dsh web 浏览器会话 token（issue #77） ----------
// 新版 dsh web（>= 0.1.2-alpha.1）给浏览器会话加了启动 token：根路径 `GET /` 必须带一次
// `?token=<启动 token>` 换一个绑定 authority 的 cookie，之后 /api 与 WebSocket 才放行；
// 否则一律 401（"dsh web authentication required"）。手机扫码进来的 URL 天然没有这个
// token，所以代理要在转发时补一次。
//
// 只在 `GET /` 且请求还没带 dsh-auth-* cookie 时注入：上游拿到 token 会 303 回干净的根
// 路径，若每次都注入就会 303 循环（浏览器很快报"重定向次数过多"）。
const DSH_AUTH_COOKIE = 'dsh-auth-';
/**
 * 去掉 URL 上所有 `dsh-desktop-*` query 参数（issue #75）。
 *
 * dsh-pocket 在 ≤ 2.1.1 会用 `history.replaceState` 往页面 URL 上写
 * `dsh-desktop-mode=compatibility` 和 `dsh-desktop-platform=<系统>`
 * （desktopEnvPatchScript，已在 2.1.2 删除）。副作用是：用户当时收藏/保存过
 * 的那个地址**一直带着这两个参数**。升级之后我们不再注入了，但用户打开旧
 * 收藏时 URL 里仍然有 —— 上游 `decideDesktopBrowserAccess` 只要见到
 * `dsh-desktop-` 前缀就认定是渲染器请求，普通浏览器没有渲染器 token，直接
 * 403 forbidden。表现就是「我已经升到最新版了，还是 forbidden」。
 *
 * 脏参数是我们写进去的，就得由我们清掉。所有方法、所有路径都清理（不只是
 * `GET /`）——API 与 WebSocket 握手带上这些参数同样会被拦。
 *
 * @param {string} reqUrl - 原始请求路径（含 query）。
 * @returns {string} 清理后的路径；无该前缀参数或解析失败时原样返回。
 */
export function stripDesktopMarkers(reqUrl) {
  let u;
  try {
    u = new URL(reqUrl ?? '/', 'http://dsh.invalid');
  } catch {
    return reqUrl;
  }
  const doomed = [...u.searchParams.keys()].filter((k) => k.startsWith('dsh-desktop-'));
  if (doomed.length === 0) return reqUrl;
  for (const key of doomed) u.searchParams.delete(key);
  return `${u.pathname}${u.search}`;
}

export function upstreamPathWithLaunchToken(reqUrl, method, cookieHeader, launchToken) {
  if (method !== 'GET') return reqUrl;
  let u;
  try { u = new URL(reqUrl ?? '/', 'http://dsh.invalid'); } catch { return reqUrl; }
  if (u.pathname !== '/') return reqUrl;
  // 登录成功后跳回的 `/?dsh-pocket-auth=1`：强制重做一次握手（旧 cookie 可能已过期/被撤销）
  const force = u.searchParams.has('dsh-pocket-auth');
  if (!force && String(cookieHeader ?? '').includes(DSH_AUTH_COOKIE)) return reqUrl;
  if (!launchToken) return reqUrl;
  u.searchParams.set('token', launchToken);
  return `${u.pathname}${u.search}`;
}

// ---------- 会话握手重试计数（issue #91） ----------
// Safari（iOS/macOS）不持久化「http:// + 纯 IP 源」上由 3xx 响应下发的 cookie，
// 于是 dsh web 的 launch-token→cookie 握手永远收敛不了：代理每次 `GET /`
// 都补 `?token=`，上游每次 303 回 `/`，浏览器每次都不带 cookie → 无限重定向
// （Safari 报「发生了太多重定位」）。
//
// 两道防线：
//   1) 代理把这次 303 改写成 200 过渡页（Set-Cookie 照发 + meta refresh 跳回 `/`），
//      200 响应上的 cookie 不会被 Safari 的重定向 cookie 策略丢掉；
//   2) 万一 1) 也不管用，用下面的计数器在若干次尝试后停止注入 token 并给出
//      可操作提示页——宁可给用户一句人话，也不要无限转圈。
//
// 只按客户端 IP 计数（无需 cookie 支持，正适合「cookie 用不了」的这个场景）。
export const DEFAULT_HANDSHAKE_LIMIT = 3;
export const HANDSHAKE_WINDOW_MS = 60_000;
/** 提示页「重试」按钮用的查询参数：命中即清空该 IP 的失败计数，且不往上游透传。 */
export const HANDSHAKE_RETRY_PARAM = 'dsh-pocket-retry';

/** 摘掉某个查询参数后重新拼路径；解析失败或本来就没有则原样返回。 */
export function stripQueryParam(reqUrl, name) {
  let u;
  try { u = new URL(reqUrl ?? '/', 'http://dsh.invalid'); } catch { return reqUrl; }
  if (!u.searchParams.has(name)) return reqUrl;
  u.searchParams.delete(name);
  return `${u.pathname}${u.search}`;
}

export function createHandshakeTracker({ max = DEFAULT_HANDSHAKE_LIMIT, windowMs = HANDSHAKE_WINDOW_MS } = {}) {
  /** ip -> { count, start } */
  const hits = new Map();
  return {
    /** 记一次握手注入，返回窗口内的累计次数。 */
    record(ip, now = Date.now()) {
      const rec = hits.get(ip);
      if (!rec || now - rec.start > windowMs) {
        hits.set(ip, { count: 1, start: now });
        return 1;
      }
      rec.count += 1;
      return rec.count;
    },
    /** 握手成功（拿到会话 cookie 的请求）→ 清零。 */
    clear(ip) {
      hits.delete(ip);
    },
    /** 该 IP 是否已达重试上限。 */
    exhausted(ip) {
      const rec = hits.get(ip);
      return !!rec && rec.count >= max;
    },
    /** 清理过期条目，防长期运行内存膨胀。 */
    prune(now = Date.now()) {
      for (const [ip, rec] of hits) {
        if (now - rec.start > windowMs) hits.delete(ip);
      }
    },
  };
}

/** 握手过渡页：200 + Set-Cookie（由调用方带上）+ meta refresh 跳回干净根路径。 */
export function handshakePageHtml() {
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="refresh" content="0; url=/">
<title>DSH Pocket · 正在进入 | opening…</title>
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
p{font-size:13px;color:#6b7280;margin:0}
</style></head><body><p>正在进入… | opening…</p></body></html>`;
}

/** 握手反复失败时的提示页（issue #91）：说清原因并给出可操作的规避办法。 */
export function handshakeBlockedPageHtml() {
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DSH Pocket · 无法完成登录握手</title>
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:24px 22px;max-width:380px;width:calc(100% - 40px)}
h1{font-size:15px;margin:0 0 10px;color:#111827}
p{font-size:13px;color:#6b7280;margin:0 0 10px;line-height:1.7}
code{background:#f3f4f6;padding:1px 5px;border-radius:4px;font-size:12px}
a{color:#4f6ef7}
</style></head><body><div class="card">
<h1>🔁 无法完成登录握手</h1>
<p>浏览器没有保存 DSH 下发的会话 cookie，代理反复重试后仍未成功，因此停在这里而不是无限跳转。</p>
<p><strong>Safari（iOS/macOS）</strong> 在 <code>http://</code> 纯 IP 地址上不会保存这类 cookie，局域网入口因此进不去。</p>
<p>可以试试：<br>
① 换 Chromium 系浏览器（Chrome / Edge）打开局域网地址；<br>
② 改用<strong>公网入口</strong>（设置页开启公网访问，拿到 <code>https://…trycloudflare.com</code> 地址）——HTTPS 域名上 Safari 正常。</p>
<p style="margin-top:14px"><a href="/?${HANDSHAKE_RETRY_PARAM}=1" style="display:inline-block;padding:8px 14px;background:#4f6ef7;color:#fff;border-radius:8px;text-decoration:none;font-size:13px">重试一次 | Retry</a></p>
<p style="color:#9ca3af;font-size:12px">Browser did not keep the session cookie, so the login handshake could not complete (issue #91). Safari over plain <code>http://</code> + IP is the known case — try Chrome, or use the public HTTPS entry.</p>
</div></body></html>`;
}

// ---------- WebSocket 心跳注入（PR #41，issue #29） ----------
// DSH 客户端与宿主的 WebSocket downlink 都不发 ping/pong（客户端只读流、
// 宿主只推帧），空闲连接会被路由器 NAT 空闲超时或手机系统省电机制**静默**
// 丢弃：没有 FIN/RST，浏览器收不到 close 事件，dsh-client-connection 也就
// 永远不会重连——手机页面看起来还开着，实则实时通道已死（消息不同步、
// 点击会话卡在加载）。
//
// 代理在每个透传的 WS 连接上定期向浏览器侧发送协议层 Ping（0x89 0x00，
// server→client 不掩码）：
//   - 浏览器网络栈按 RFC 6455 自动回 Pong（不经过任何 JS），一来一回让
//     双向都有流量，NAT/防火墙空闲超时不再触发；
//   - 连续 missLimit 个周期没有任何入站字节（浏览器已死或链路被静默丢弃）
//     → 主动 destroy 连接：浏览器拿到 close 后 dsh-client-connection 会
//     按指数退避自动重连，实时通道随即恢复。
// 只 Ping 浏览器侧：上游是本机 loopback，不会过期；浏览器回的 Pong 原样
// 透传给上游 ws 服务（未请求的 Pong 对 ws 库无害，只触发无害的 pong 事件）。
const WS_PING_FRAME = Buffer.from([0x89, 0x00]); // FIN + opcode 9、长度 0、不掩码

/**
 * 在透传的浏览器侧 socket 上挂载心跳：定期 Ping 保活 + 静默断链检测。
 * 任一路由方向只要有字节流动（Pong 响应）就把静默计数归零；连续 missLimit
 * 个周期零入站流量则判定链路已死，销毁 socket 触发浏览器端重连。
 * @param {import('node:net').Socket} socket 浏览器侧的透传 socket
 * @param {{intervalMs?:number, missLimit?:number}} [opts] 心跳周期与容忍的静默周期数
 */
function attachWebSocketHeartbeat(socket, { intervalMs = 30_000, missLimit = 2 } = {}) {
  let misses = 0;
  let stopped = false;
  const onInbound = () => { misses = 0; };
  const timer = setInterval(() => {
    if (stopped) return;
    misses += 1;
    if (misses >= missLimit) {
      // 连续多个周期没有任何入站流量（连 Pong 都没有）→ 静默断链，断开让客户端重连
      socket.destroy();
      return;
    }
    // write 到已销毁的 socket 会抛错（destroy 竞态），写前检查并兜底
    if (!socket.destroyed) {
      try { socket.write(WS_PING_FRAME); } catch { /* 忽略 */ }
    }
  }, intervalMs);
  timer.unref?.();
  socket.on('data', onInbound);
  const cleanup = () => {
    if (stopped) return;
    stopped = true;
    clearInterval(timer);
    socket.off('data', onInbound);
    socket.off('close', cleanup);
    socket.off('error', cleanup);
  };
  socket.on('close', cleanup);
  socket.on('error', cleanup);
}

/**
 * 启动 dsh-pocket 代理。
 * @param {object} opts
 * @param {number} [opts.port]      监听端口（默认 3081；dsh web 保持 3080）
 * @param {string} [opts.host]      监听地址（默认 0.0.0.0：LAN 与隧道都能到）
 * @param {{host:string,port:number}} [opts.upstream] 上游 dsh web（默认 127.0.0.1:3080）
 * @param {string} [opts.injectHtml] 注入 HTML 的内容（默认 polyfill + 移动端适配；传 '' 关闭）
 * @param {object} [opts.auth]       可选访问令牌认证（issue #13）：{ getToken, getAltTokens?, isProtected, sessionKey }
 *   - getToken(host) → 主 PIN（公网/局域网各一个，按 host 分类）
 *   - getAltTokens?(host) → 替代令牌列表（可选），校验时与主 PIN 任一命中即放行
 *   - scopeFor?(host) → 'lan' | 'public'（该 host 按哪一侧的 PIN 边界裁决；缺省用 classifyHost）
 *   - getTokenForScope?(scope) → 该侧的当前 PIN（v2 设备 cookie 校验用；缺省则不做设备管理）
 * @param {object} [opts.devices]   设备注册表（lib/devices.mjs 的 store）。传了才启用 v2 设备 cookie、
 *   单独下线/全部下线与活 WS 归属；不传 = 完全保持 v1 老行为（所有设备同 cookie）。
 * @param {object|false} [opts.rateLimit] 登录速率限制参数覆盖（issue #40；测试用短窗口）
 * @param {object|false} [opts.heartbeat] WebSocket 心跳注入（PR #41）：{ intervalMs, missLimit }；false 关闭（默认开：30s/容忍 2 个静默周期）
 * @param {() => boolean} [opts.lanAccessEnabled] 局域网访问是否开启（默认开启）。关闭时拦截经局域网 Host 的请求（公网/loopback 不受影响）。
 * @returns {Promise<{server:import('node:http').Server, close:()=>Promise<void>}>}
 */
export function createPocketProxy({ port = 3081, host = '0.0.0.0', upstream = DEFAULT_UPSTREAM, log = null, injectHtml = DEFAULT_INJECT, auth = null, devices = null, rateLimit = null, heartbeat = {}, lanAccessEnabled = () => true, launchToken = () => '', handshakeLimit } = {}) {
  const limiter = auth ? createRateLimiter(rateLimit ?? {}) : null;
  const sessionKey = auth?.sessionKey ?? null;
  // 设备 cookie 校验所需的两个钩子（都缺 → 退回 v1 行为，绝不半途启用）
  const pinForScope = typeof auth?.getTokenForScope === 'function' ? (scope) => auth.getTokenForScope(scope) : null;
  const deviceOpts = devices && pinForScope ? { devices, pinForScope } : {};
  /** 该 host 属于哪一侧 PIN 边界（与 lib/index.js 的 tokenForHost 同源，保证 scope 与 PIN 对得上）。 */
  const scopeForHost = (h) => {
    if (typeof auth?.scopeFor === 'function') return auth.scopeFor(h) === 'public' ? 'public' : 'lan';
    return classifyHost(h) === 'public' ? 'public' : 'lan';
  };
  /** v1 无身份登录的登记：首次写入注册表，之后只 touch（避免每个请求都落盘）。 */
  const noteLegacyDevice = (scope, ip) => {
    if (!devices) return;
    if (devices.has(LEGACY_DEVICE_ID)) devices.touch(LEGACY_DEVICE_ID, { ip });
    else devices.register(LEGACY_DEVICE_ID, { legacy: true, uaType: 'legacy', scope, ip });
  };
  /**
   * 登录成功 → 签发设备 cookie：已带「注册表里还在的 v2 设备 id」就复用该 id（跨重启/PIN 轮换
   * 保持同一台设备，只是重绑 hash），否则新生成一枚 id 并登记新设备。
   */
  const issueDeviceCookie = (req, pin, scope) => {
    if (!sessionKey || !devices || !pinForScope) return cookieFor(pin, sessionKey); // 无注册表 → v1 老值
    const existing = parseDeviceCookie(parseCookies(req.headers.cookie)[TOKEN_COOKIE]);
    const id = existing && devices.has(existing.deviceId) ? existing.deviceId : newDeviceId();
    devices.register(id, {
      uaType: parseUaType(req.headers['user-agent']),
      scope,
      ip: clientIp(req),
    });
    return deviceCookieValue(id, pin, sessionKey, devices.epoch());
  };
  // 会话握手重试计数（issue #91）：Safari 在 http://IP 源上丢 3xx 的 cookie → 死循环
  const handshake = createHandshakeTracker(
    typeof handshakeLimit === 'number' ? { max: handshakeLimit } : {},
  );
  const server = createServer((req, res) => {
    // 策略判定一律用 policyHost（issue #90）：Host 头可伪造，用不可伪造的 TCP 源地址
    // 给它设下限。转发给上游的 Host 由 loopbackAuthority 单独改写，不受这里影响。
    const host = policyHost(req, String(req.headers.host ?? ''));
    const isPublic = classifyHost(host) === 'public';
    // 局域网访问关闭（issue #54）：拦截经局域网 IP/主机名访问的请求；
    // 公网（含任意非内网 Host——issue #66 fail closed）与 loopback（本机/cloudflared 回连）放行，
    // 公网流量随后照常走访问密码认证。
    if (!isPublic && !isLoopbackHost(host) && !lanAccessEnabled()) {
      if (isHtmlRequest(req)) {
        res.writeHead(403, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
        res.end(lanDisabledPageHtml());
      } else {
        res.writeHead(403, { 'content-type': 'application/json', 'cache-control': 'no-store' });
        res.end('{"error":"lan-disabled"}');
      }
      return;
    }
    // PWA 资源（添加到主屏幕）：manifest 与图标是浏览器安装流程自己发起的请求，
    // 按规范 manifest/icon 抓取的凭据模式是 omit（不带 cookie）——所以必须放在
    // 访问密码认证**之前**，否则永远 401、永远装不上。资源是纯品牌信息（无会话数据）。
    // 只放行 GET/HEAD，其它方法落到下面按普通请求处理（上游会 404/405）。
    if (req.method === 'GET' || req.method === 'HEAD') {
      const pwa = pwaAsset(req.url);
      if (pwa) {
        res.writeHead(200, {
          'content-type': pwa.type,
          'content-length': String(pwa.body.length),
          'cache-control': pwa.cache,
          'x-dsh-pocket-pwa': '1',
          ...(pwa.headers ?? {}), // Service Worker 的 Service-Worker-Allowed: /
        });
        res.end(req.method === 'HEAD' ? undefined : pwa.body);
        return;
      }
    }
    // 访问令牌认证（issue #13 + #18 + #33 + #40 + #69）：局域网与公网按开关/来源要求密码
    if (auth) {
      const protectedHost = isProtectedHost(host, auth.isProtected);
      const token = protectedHost ? (auth.getToken?.(host) ?? null) : null;
      // 临时 PIN（issue #69）：按 host 同源分发（公网临时 PIN 只在公网入口放行，局域网同理）
      const altTokens = protectedHost && token && typeof auth.getAltTokens === 'function' ? (auth.getAltTokens(host) ?? []) : [];
      const acceptedTokens = token ? [token, ...altTokens] : [];
      if (protectedHost && token) {
        const ip = clientIp(req);
        // 本请求的设备 scope（命中哪一侧 PIN 边界）；v2 cookie 与 PIN 都按它派生
        const reqScope = scopeForHost(host);
        // 登录提交：速率限制（issue #40）→ 校验密码 → 种持久 HttpOnly cookie（30 天，绑定进程会话密钥）→ 回首页
        if (req.method === 'POST' && req.url?.startsWith('/pocket-login')) {
          const rl = limiter?.status(ip) ?? { locked: false, retryAfter: 0 };
          if (rl.locked) {
              res.writeHead(429, {
                'content-type': 'text/html; charset=utf-8',
                'cache-control': 'no-store',
                'retry-after': String(rl.retryAfter),
              });
              res.end(loginPageHtml('locked', isPublic, rl.retryAfter));
            return;
          }
          let body = '';
          req.on('data', (c) => { body += c; if (body.length > 1024) req.destroy(); });
          req.on('end', () => {
            const submitted = String(new URLSearchParams(body).get('token') ?? '');
            // 与 cookie / ?token= 两条通道保持一致：常量时间比较 + 主 PIN 与替代令牌
            // （临时 PIN，issue #69 钩子）任一命中即放行。原先这里是 `submitted === token`
            // ——既会提前返回（计时侧信道可逐字节还原 PIN），又把替代令牌挡在门外。
            const matched = acceptedTokens.find((candidate) => safeEqual(submitted, candidate));
            if (matched !== undefined) {
              limiter?.clear(ip);
              res.writeHead(302, {
                // 带上 dsh-pocket-auth=1：登录成功后强制重做一次浏览器会话握手，
                // 换掉可能已过期/被撤销的 dsh web 会话 cookie（issue #77）
                location: '/?dsh-pocket-auth=1',
                // 签发 v2 设备 cookie（含设备 id + 绑定当前 PIN/sessionKey/epoch）
                'set-cookie': authCookieHeader(issueDeviceCookie(req, matched, reqScope)),
                'cache-control': 'no-store',
              });
              res.end();
            } else {
              limiter?.record(ip);
              log?.(`dsh-pocket: login failed from ${ip} | 登录失败 IP: ${ip}`);
              res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
              res.end(loginPageHtml(true, isPublic, 0));
            }
          });
          return;
        }
        // `?token=<PIN>` 是与 POST 登录等价的一次密码尝试（issue #90）：此前只有 POST
        // 分支调用 limiter.record()，这条通道既不计数也不受锁定约束，等于给攻击者留了
        // 一个可全速穷举 8 位 PIN 的旁路。下面把它并入同一套限速。
        const isGuess = hasQueryToken(req);
        if (isGuess) {
          const rl = limiter?.status(ip) ?? { locked: false, retryAfter: 0 };
          // 锁定期内直接拒绝、不做比对——否则锁定窗口本身就是免费的穷举窗口。
          // 正确密码也一并拒绝，与 POST 登录的锁定语义保持一致。
          if (rl.locked) {
            if (isHtmlRequest(req)) {
              res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
              res.end(loginPageHtml('locked', isPublic, rl.retryAfter));
            } else {
              res.writeHead(429, {
                'content-type': 'application/json',
                'cache-control': 'no-store',
                'retry-after': String(rl.retryAfter),
              });
              res.end('{"error":"too-many-attempts"}');
            }
            return;
          }
        }
        const authResult = authCheck(req, acceptedTokens, sessionKey, deviceOpts);
        if (!authResult.ok) {
          if (isGuess) {
            limiter?.record(ip);
            log?.(`dsh-pocket: bad ?token= from ${ip} | URL 密码错误 IP: ${ip}`);
          }
          if (isHtmlRequest(req)) {
            // 锁定期间打开登录页也给提示（HTTP 200 + 锁定文案；429 语义留给 POST 拒绝）
            const rl = limiter?.status(ip) ?? { locked: false, retryAfter: 0 };
            res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
            res.end(loginPageHtml(rl.locked ? 'locked' : false, isPublic, rl.retryAfter));
          } else {
            res.writeHead(401, { 'content-type': 'application/json', 'cache-control': 'no-store' });
            res.end('{"error":"unauthorized"}');
          }
          return;
        }
        // 认证通过：把「这台设备还活着」记进注册表（内存即时；落盘节流 ≥30s）。
        // v1（旧 cookie）首次出现时补一条 legacy 条目，让设置页能把它列出来。
        if (authResult.deviceId === LEGACY_DEVICE_ID) noteLegacyDevice(reqScope, ip);
        else if (authResult.deviceId) devices?.touch(authResult.deviceId, { ip });
        // ?token=<原始 PIN> 直达时种 HttpOnly cookie，让浏览器后续子资源也走 cookie 路径（issue #35）；
        // v2 形态同时把设备身份写进 cookie（老的 v1 cookie 会被这次 Set-Cookie 替换掉）。
        if (authResult.rawQueryToken) {
          limiter?.clear(ip); // 与 POST 登录成功一致：正确的分享链接不该逐步累积到锁定
          maybeSeedAuthCookie(req, res, issueDeviceCookie(req, authResult.rawQueryToken, reqScope));
        }
      }
    }
    const headers = loopbackAuthority({ ...req.headers }, upstream);
    // dsh web 浏览器会话 token（issue #77）：首屏根路径补一次，换回绑定 authority 的 cookie
    const launchTok = (typeof launchToken === 'function' ? launchToken() : '') || '';
    // 先清掉历史遗留的 dsh-desktop-* 参数（issue #75），再补 launch token
    // 握手重试上限（issue #91）：Safari 不保存 http://IP 源上 3xx 下发的 cookie →
    // 补 token → 上游 303 → 浏览器仍无 cookie → 无限循环。达到上限就别再补了，
    // 让请求落到提示页，而不是继续转圈。
    const handshakeIp = clientIp(req);
    // `/?dsh-pocket-retry=1`：提示页上的「重试」入口——清掉这一轮的失败计数，让握手
    // 重新走一遍（否则用户得干等窗口过期）。这参数是我们自己加的，不往上游透传。
    let cleanPath = stripDesktopMarkers(req.url);
    if (cleanPath.includes(HANDSHAKE_RETRY_PARAM)) {
      handshake.clear(handshakeIp);
      cleanPath = stripQueryParam(cleanPath, HANDSHAKE_RETRY_PARAM);
    }
    const handshakeOver = launchTok !== '' && handshake.exhausted(handshakeIp);
    const upstreamPath = handshakeOver
      ? cleanPath
      : upstreamPathWithLaunchToken(cleanPath, req.method, req.headers.cookie, launchTok);
    const didInjectToken = upstreamPath !== cleanPath;
    if (didInjectToken) {
      handshake.record(handshakeIp);
      handshake.prune();
    }
    // 请求带上了会话 cookie → 这一轮的握手计数可以清掉了（说明 cookie 通路是好的）
    if (!didInjectToken && String(req.headers.cookie ?? '').includes(DSH_AUTH_COOKIE)) {
      handshake.clear(handshakeIp);
    }
    if (handshakeOver && isHtmlRequest(req)) {
      // 已判定握不上手 → 停在这里给人话，别再转圈。API/WS 不走这里（上游会 401）。
      res.writeHead(503, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'x-dsh-pocket-handshake': 'blocked',
      });
      res.end(handshakeBlockedPageHtml());
      return;
    }
    const proxyReq = httpRequest(
      { host: upstream.host, port: upstream.port, method: req.method, path: upstreamPath, headers, agent: false },
      (proxyRes) => {
        log?.(`${req.method} ${req.url} -> ${proxyRes.statusCode}`);
        const contentType = String(proxyRes.headers['content-type'] ?? '');
        // 静态资产长缓存（本轮新增）：只认「文件名含内容哈希」或「URL 带 rev=」的
        // js/css/字体/图片；HTML 文档、API/JSON、401/403/404 一律拿不到（见函数注释）。
        // 在压缩分支与裸透传分支**各自**并入同一个值，避免开第二条响应链。
        const assetCache = staticAssetCacheValue(req.url, proxyRes.statusCode, proxyRes.headers);
        // issue #91：我们刚注入了 launch token，上游回 303（换 cookie 后回干净根路径）。
        // Safari 不保存 http://IP 源上 3xx 响应下发的 cookie，于是浏览器下次仍无 cookie
        // → 代理再注入 → 再 303 → 死循环。这里把这次 303 改成 200 过渡页：Set-Cookie
        // 照发（200 上的 cookie 不会被那条重定向策略丢掉），页面用 meta refresh 跳回 `/`。
        if (didInjectToken && proxyRes.statusCode === 303 && isHtmlRequest(req)) {
          const out = { ...proxyRes.headers };
          delete out['content-length'];
          delete out['transfer-encoding'];
          delete out.location; // 自己跳，不留给浏览器去重做一次 303
          const page = Buffer.from(handshakePageHtml(), 'utf8');
          out['content-type'] = 'text/html; charset=utf-8';
          out['content-length'] = String(page.length);
          out['cache-control'] = 'no-store';
          out['x-dsh-pocket-handshake'] = 'transition';
          proxyRes.resume(); // 消费掉上游响应体，释放连接
          res.writeHead(200, out);
          res.end(page);
          return;
        }
        // issue #81：上游 desktop-browser-access 门禁（DSH Desktop 未开启「浏览器访问」时）
        // 对普通浏览器（含经本代理转发的手机）返回 403 text/plain "forbidden"，且本代理无法
        // 携带 Electron renderer secret 绕过。对符合该特征的**浏览器导航**请求改写为可操作
        // 提示页；API/WS 与其余 403 原样透传（不猜 secret、不把任意 403 都判为桌面门禁）。
        if (proxyRes.statusCode === 403 && contentType.includes('text/plain')) {
          const navReq = isHtmlRequest(req);
          const gateChunks = [];
          let gateOverflow = false;
          const passRaw403 = () => {
            if (res.headersSent) return;
            res.writeHead(403, { ...proxyRes.headers });
            if (gateChunks.length) res.write(Buffer.concat(gateChunks));
            proxyRes.pipe(res);
          };
          proxyRes.on('data', (c) => {
            if (gateOverflow) return;
            gateChunks.push(c);
            if (Buffer.concat(gateChunks).length > 65536) { gateOverflow = true; gateChunks.length = 0; passRaw403(); }
          });
          proxyRes.on('end', () => {
            if (gateOverflow || res.headersSent) return;
            const body = Buffer.concat(gateChunks).toString('utf8').trim();
            if (navReq && body === 'forbidden') {
              res.writeHead(403, {
                'content-type': 'text/html; charset=utf-8',
                'cache-control': 'no-store',
                'x-dsh-pocket-gate': 'desktop-browser-access',
              });
              res.end(desktopAccessBlockedPageHtml());
            } else {
              res.writeHead(403, { ...proxyRes.headers });
              res.end(Buffer.concat(gateChunks));
            }
          });
          proxyRes.on('error', () => res.destroy());
          return;
        }
        // 只给**未压缩**的 HTML 文档注入（SSE/WS/JS/CSS 原样透传；压缩流注入会损坏页面）；
        // 注入后修正 Content-Length
        if (injectHtml && contentType.includes('text/html') && !isCompressed(proxyRes.headers)) {
          const chunks = [];
          proxyRes.on('data', (c) => chunks.push(c));
          proxyRes.on('end', () => {
            let html = Buffer.concat(chunks).toString('utf8');
            if (!html.includes(INJECT_MARK)) {
              html = html.replace(/<head[^>]*>/i, (m) => `${m}${injectHtml}`);
            }
            // PWA（添加到主屏幕）：manifest / apple-touch-icon / apple-mobile-web-app 元信息。
            // 与上面的 polyfill 注入相互独立、各自幂等（详见 applyPwaHead：上游已有
            // manifest link 就原地改指我们那份，绝不产生第二条）。
            html = applyPwaHead(html);
            const out = Buffer.from(html, 'utf8');
            const outHeaders = { ...proxyRes.headers };
            delete outHeaders['content-length'];
            delete outHeaders['transfer-encoding'];
            outHeaders['content-length'] = String(out.length);
            // 注入后的 HTML 携带本代理的动态补丁（含注入标记判重），
            // 必须禁用缓存——否则手机/中间层（nginx 等）拿到没有补丁的旧
            // 文档后，isLoopback 修复不生效且难以排查（表现为"改了没效果"）。
            outHeaders['cache-control'] = 'no-store';
            delete outHeaders['etag'];
            delete outHeaders['last-modified'];
            delete outHeaders['expires'];
            res.writeHead(proxyRes.statusCode ?? 200, outHeaders);
            res.end(out);
          });
          proxyRes.on('error', () => res.destroy());
          return;
        }
        // 大 JSON/text 响应**流式压缩**（issue #12）：长会话历史一次返回 17MB+，
        // 局域网直连与隧道段都吃满带宽；压缩到 ~1MB。跳过已压缩、SSE 流
        // （/api/events.* 原样透传）、HTML（走上面的注入分支）。
        // brotli 质量选 6（issue #25）：zlib 默认 q11 压 17MB 要 40s+，手机直接超时；
        // q6 实测 128ms（比 gzip 的 88ms 略慢但同档）且输出更小（1.00MB vs 1.20MB）。
        const acceptEncoding = String(req.headers['accept-encoding'] ?? '');
        const canGzip = /\bgzip\b/.test(acceptEncoding);
        const canBr = /\bbr\b/.test(acceptEncoding);
        const isEventStream = contentType.includes('text/event-stream');
        const knownLen = Number(proxyRes.headers['content-length'] || 0);
        const shouldCompress = (canGzip || canBr)
          && !isCompressed(proxyRes.headers)
          && !isEventStream
          && (contentType.includes('application/json') || contentType.startsWith('text/'))
          && (knownLen === 0 || knownLen >= 1024);
        if (shouldCompress) {
          const enc = canBr ? 'br' : 'gzip';
          const outHeaders = { ...proxyRes.headers };
          delete outHeaders['content-length'];
          delete outHeaders['transfer-encoding'];
          outHeaders['content-encoding'] = enc;
          // 哈希资产走的是这条（js/css 都是 text/* 且体积 >1KB）——缓存头在这里补
          if (assetCache) outHeaders['cache-control'] = assetCache;
          res.writeHead(proxyRes.statusCode ?? 200, outHeaders);
          const z = enc === 'br'
            ? createBrotliCompress({ params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 6 } })
            : createGzip();
          proxyRes.pipe(z).pipe(res);
          // 任一端断开都要清理（含压缩流）。注意：不能用 proxyRes 的 'close'
          // 来掐 res——正常结束后 close 也会触发，此时压缩流可能还没写完，
          // 会误杀连接；异常中止用 'aborted'。
          res.on('close', () => { proxyRes.destroy(); z.destroy(); });
          proxyRes.on('error', () => { z.destroy(); res.destroy(); });
          proxyRes.on('aborted', () => { z.destroy(); res.destroy(); });
          z.on('error', () => res.destroy());
          return;
        }
        // 裸透传（图片/字体/已压缩响应等）。只有需要补缓存头时才拷一份 headers，
        // 其余情况保持原样透传（最小行为变化）。
        res.writeHead(proxyRes.statusCode ?? 502, assetCache ? { ...proxyRes.headers, 'cache-control': assetCache } : proxyRes.headers);
        proxyRes.pipe(res);
        // 任一端断开都要清理另一端：客户端断连销毁上游流（不留僵尸），
        // 上游流中途断开也要掐断客户端（否则响应头已发、体没发完 → 悬挂）
        res.on('close', () => proxyRes.destroy());
        proxyRes.on('error', () => res.destroy());
        proxyRes.on('close', () => { if (!res.writableEnded) res.destroy(); });
      },
    );
    proxyReq.on('error', (err) => {
      if (!res.headersSent) res.writeHead(502, { 'content-type': 'text/plain; charset=utf-8' });
      res.end(`dsh-pocket: 无法连接上游 dsh web（${upstream.host}:${upstream.port}）——先启动 dsh web | ${err.message}`);
    });
    req.pipe(proxyReq);
  });

  // WebSocket upgrade（DSH 的 /api/events.mux + events.host 流式通道）原样透传
  server.on('upgrade', (req, socket, head) => {
    // 与 HTTP 侧同一套判定（issue #90）：否则伪造 Host 的 WS 握手仍可绕过局域网开关
    const host = policyHost(req, String(req.headers.host ?? ''));
    const isPublic = classifyHost(host) === 'public';
    // 局域网访问关闭：拦截经局域网 Host 的 WS 握手（公网/loopback 放行——issue #66 fail closed）
    if (!isPublic && !isLoopbackHost(host) && !lanAccessEnabled()) {
      socket.write('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');
      socket.destroy();
      return;
    }
    // WebSocket 同样校验（防止绕过 HTTP 认证从 WS 进入；含临时 PIN，issue #69）
    /** 本连接的归属设备（v2 设备 id / 'legacy' / null）：upgrade 成功后把 socket 挂到注册表上。 */
    let wsDeviceId = null;
    if (auth) {
      const token = isProtectedHost(host, auth.isProtected) ? (auth.getToken?.(host) ?? null) : null;
      const altTokens = token && typeof auth.getAltTokens === 'function' ? (auth.getAltTokens(host) ?? []) : [];
      const acceptedTokens = token ? [token, ...altTokens] : [];
      // WS 握手上的 ?token= 与 HTTP 侧同权（issue #90）：不并入限速的话，攻击者
      // 只要把穷举换到 upgrade 请求上就照样不受限。
      const wsIp = clientIp(req);
      const wsGuess = hasQueryToken(req);
      if (token && wsGuess) {
        const rl = limiter?.status(wsIp) ?? { locked: false, retryAfter: 0 };
        if (rl.locked) {
          socket.write(`HTTP/1.1 429 Too Many Requests\r\nRetry-After: ${rl.retryAfter}\r\nConnection: close\r\n\r\n`);
          socket.destroy();
          return;
        }
      }
      const wsAuth = authCheck(req, acceptedTokens, sessionKey, deviceOpts);
      if (token && !wsAuth.ok) {
        if (wsGuess) {
          limiter?.record(wsIp);
          log?.(`dsh-pocket: bad ws ?token= from ${wsIp} | WS 密码错误 IP: ${wsIp}`);
        }
        socket.write('HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n');
        socket.destroy();
        return;
      }
      if (token && wsAuth.ok && wsGuess) limiter?.clear(wsIp);
      // 设备归属：v1（legacy）也登记——「全部下线」要能把它一并断开
      if (token && wsAuth.ok && wsAuth.deviceId) {
        wsDeviceId = wsAuth.deviceId;
        if (wsDeviceId === LEGACY_DEVICE_ID) noteLegacyDevice(scopeForHost(host), wsIp);
        else devices?.touch(wsDeviceId, { ip: wsIp });
      }
    }
    const headers = loopbackAuthority({ ...req.headers }, upstream);
    const proxyReq = httpRequest({
      // 同样清掉历史遗留的 dsh-desktop-* 参数（issue #75）
      host: upstream.host, port: upstream.port, method: req.method, path: stripDesktopMarkers(req.url), headers, agent: false,
    });
    proxyReq.on('upgrade', (proxyRes, proxySocket, proxyHead) => {
      socket.write('HTTP/1.1 101 Switching Protocols\r\n');
      // 原样回传上游的 upgrade 头（Sec-WebSocket-Accept 等）
      const raw = [];
      for (const [k, v] of Object.entries(proxyRes.headers)) {
        raw.push(`${k}: ${Array.isArray(v) ? v.join(', ') : v}`);
      }
      socket.write(`${raw.join('\r\n')}\r\n\r\n`);
      if (proxyHead?.length) socket.write(proxyHead);
      // pipe 必须 end:false：默认 end:true 会在对端 FIN 时抢先 end() 对端 socket
      // （优雅 FIN），此时 teardown 的 destroy() 已无法强制关闭对方——上游只收
      // 到 FIN 进入 half-open 永不关闭（PR #56）。半关闭统一交给下面的 'end'
      // 监听 → teardown destroy（RST 强制关闭双方）。
      socket.pipe(proxySocket, { end: false });
      proxySocket.pipe(socket, { end: false });
      // 设备归属（本轮新增）：把这条活 WS 挂到设备名下——单独下线 / 全部下线时
      // 由注册表直接 destroy 它，让客户端立刻掉线重连（重连会被 401 挡住并回到登录页）。
      // 只有 upgrade 真的成功（101）才登记，避免把被拒的连接算成「在线」。
      if (wsDeviceId) devices?.trackSocket(wsDeviceId, socket);
      // 心跳注入（PR #41）：保活 + 静默断链检测（见 attachWebSocketHeartbeat）
      if (heartbeat !== false) attachWebSocketHeartbeat(socket, heartbeat ?? {});
      // 任一端断开都要清理另一端（避免上游残留僵尸连接占用 dsh 连接槽）。
      // 上游侧必须 resetAndDestroy（发 RST）：destroy() 只发干净 FIN，而上游
      // http server 默认 allowHalfOpen=true，收到 FIN 不自动关闭 → 上游仍悬挂
      // （PR #56 实测）。RST 强制对端立即关闭。
      const teardown = () => {
        try { proxySocket.resetAndDestroy?.() ?? proxySocket.destroy(); } catch { try { proxySocket.destroy(); } catch {} }
        try { socket.destroy(); } catch {}
      };
      // 上游侧透传 socket 的读错误（如 dsh web 重启/断开时的 ECONNRESET）必须
      // 吞掉并清理对端，否则未处理的 'error' 事件会让整个 dsh web 进程崩溃退出。
      proxySocket.on('error', () => { try { socket.destroy(); } catch {} });
      proxySocket.on('close', teardown);
      socket.on('close', teardown);
      // 半关闭（收到对端 FIN 的 'end'）对双向转发同样意味着这一端要走了：http server
      // 默认 allowHalfOpen=true，收到 FIN 只触发 'end' 不自动关——若不在 'end' 时销毁，
      // 浏览器/App 直接关页（不发 WS close 帧就 FIN）留下的连接会永久挂在 half-open
      // 状态，上游连接槽被占（且 server.close() 永远等不完）。双向流里半关闭无意义。
      socket.on('end', teardown);
      proxySocket.on('end', teardown);
    });
    // 上游返回普通 HTTP 响应（非 101）：把状态码/头回写后断开，别让客户端永久挂起
    proxyReq.on('response', (proxyRes) => {
      if (proxyRes.statusCode === 101) return; // 理论上 101 走 upgrade 事件
      try {
        const raw = [`HTTP/1.1 ${proxyRes.statusCode} ${proxyRes.statusMessage ?? ''}`.trim()];
        for (const [k, v] of Object.entries(proxyRes.headers)) {
          raw.push(`${k}: ${Array.isArray(v) ? v.join(', ') : v}`);
        }
        // end 会 flush 响应头再 FIN——不要紧跟 destroy()，否则排队的头会被丢弃
        socket.end(raw.join('\r\n') + '\r\n\r\n');
        proxyRes.resume(); // 消费掉上游响应体，释放连接
      } catch { socket.destroy(); }
    });
    proxyReq.on('error', () => socket.destroy());
    // 关键：浏览器在握手请求后可能立即发出首帧（如 mux 流的初始 RPC），
    // node 把它放在 upgrade 事件的 head 里。必须先于 end() 写入 proxyReq，
    // 让上游在 upgrade 事件里就拿到它（与直连行为一致）；等 101 之后再写
    // 会变成迟到的 socket 数据，DSH 的 mux 协议可能错过这个窗口。
    if (head?.length) proxyReq.write(head);
    proxyReq.end();
    socket.on('error', () => socket.destroy());
  });

  // 跟踪所有 TCP 连接（含 WebSocket upgrade 后的 socket——Node 的
  // closeAllConnections 不包含它们，不手动销毁 close() 会永远等）
  const clientSockets = new Set();
  server.on('connection', (sock) => {
    clientSockets.add(sock);
    sock.on('close', () => clientSockets.delete(sock));
    sock.on('error', () => {}); // 防未处理 error 崩进程
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => {
      const actualPort = server.address().port;
      resolve({
        server,
        port: actualPort,
        close: () => new Promise((r) => {
          for (const s of clientSockets) { try { s.destroy(); } catch { /* 忽略 */ } }
          server.close(() => r());
        }),
      });
    });
  });
}
