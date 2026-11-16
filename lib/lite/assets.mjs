// dsh-pocket 轻量视图（终局评审 §7.1 路线 A）：页面资源与直出处理。
//
// 为什么由代理直出：轻量视图刻意**不**经过宿主的上游 HTML 注入（proxy/html-inject.mjs
// 会把任何 text/html 响应改写掉，注入移动端 polyfill 与 transport shim），也不依赖
// 宿主的 React 界面。它只是一个静态页面，数据全部走宿主既有的 /api JSON-RPC。
//
// 鉴权：直出发生在 enforceAccessControl 之后，所以页面对未通过 PIN 的访客不可见；
// 页面自己的 /api 调用复用同一个 dsh 浏览器 cookie（代理把 Host 改写成 loopback）。
import { readFileSync } from 'node:fs';

/** 页面入口（不带尾斜杠也接受）。 */
export const LITE_PAGE_PATH = '/__dsh-pocket/lite';
/** 静态资源前缀。 */
export const LITE_ASSET_PREFIX = '/__dsh-pocket/lite/';

const CONTENT_TYPES = {
  'index.html': 'text/html; charset=utf-8',
  'app.css': 'text/css; charset=utf-8',
  'app.js': 'application/javascript; charset=utf-8',
  // 加到主屏幕（iOS 16.4+/Android）用它决定 standalone 显示与启动地址。
  'manifest.webmanifest': 'application/manifest+json; charset=utf-8',
};

const assetCache = new Map();

/**
 * 读一个页面资源（首次读盘后常驻内存：内容随插件版本变，进程生命周期内不会变）。
 * @param {string} name 资源文件名（只接受 CONTENT_TYPES 里的键）
 * @returns {string} 文本内容
 */
function readAsset(name) {
  const cached = assetCache.get(name);
  if (cached !== undefined) return cached;
  const text = readFileSync(new URL('./' + name, import.meta.url), 'utf8');
  assetCache.set(name, text);
  return text;
}

/**
 * 判断一个请求是不是轻量视图的静态请求。
 * @param {string} pathname 已解析的 URL pathname
 * @returns {boolean}
 */
export function isLiteRequest(pathname) {
  if (typeof pathname !== 'string' || pathname === '') return false;
  if (pathname === LITE_PAGE_PATH || pathname === LITE_PAGE_PATH + '/') return true;
  return pathname.startsWith(LITE_ASSET_PREFIX);
}

/**
 * 判断一个请求是不是轻量视图的页面本身（不含静态资源）。
 * @param {string} pathname 已解析的 URL pathname
 * @returns {boolean}
 */
export function isLitePageRequest(pathname) {
  return pathname === LITE_PAGE_PATH || pathname === LITE_PAGE_PATH + '/';
}

/**
 * 直出轻量视图的页面与资源。
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 * @param {string} pathname 已解析的 URL pathname
 * @param {Record<string, string | string[]>} [extraHeaders] 追加到 200 响应上的头
 *   （代理用它把宿主会话的 Set-Cookie 挂到页面上，见 lib/lite/session.mjs）
 * @returns {boolean} true = 已经接管这个请求
 */
export function serveLiteRequest(req, res, pathname, extraHeaders) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return false;
  if (!isLiteRequest(pathname)) return false;
  let name = 'index.html';
  if (pathname.startsWith(LITE_ASSET_PREFIX)) name = pathname.slice(LITE_ASSET_PREFIX.length);
  // 只认白名单里的三个文件：任何目录穿越/未知名字都直接 404，不碰文件系统。
  const type = CONTENT_TYPES[name];
  if (type === undefined) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' });
    res.end('dsh-pocket lite: not found');
    return true;
  }
  const body = readAsset(name);
  res.writeHead(200, {
    'content-type': type,
    // 页面与脚本体跟随插件版本变；no-cache 让每次打开都回源校验，避免手机缓存
    // 把旧协议留在主屏上。
    'cache-control': 'no-cache',
    'x-content-type-options': 'nosniff',
    ...(extraHeaders ?? {}),
  });
  if (req.method === 'HEAD') res.end();
  else res.end(body);
  return true;
}