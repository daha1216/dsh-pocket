// 代理注入浏览器侧的脚本集合（评审 §3.2：接入层与界面层解耦的第一步）。
//
// 这里只放「拼成一段 HTML、由代理塞进上游页面」的字符串与其开关标记：非安全上下文的
// polyfill、__DSH_TRANSPORT__ shim、分享链接的地址栏清理、DSH Desktop 旧补丁
// （已停用，仅为兼容旧桌面端保留导出）、静态资源 Service Worker 与其注册片段。
// 注入判定只看 INJECT_MARK，不看页面里是否出现某个函数名（见 RANDOM_UUID_POLYFILL 注释）。

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
 * issue #58（0.2.0-rc.1 复发，2026-09-28）：连接层判定宿主可达性的表达式是
 *   isLoopback = transport?.ownsHost === true || pageLocation === void 0
 *                || isLoopbackHostname(pageLocation.hostname)
 * 手机经本代理访问时 location.hostname 是局域网 IP / 隧道域名 → isLoopback=false →
 * `dsh-client-ui-settings` 在插件激活期以 `ctx.remote.$host.isLoopback` 一次性固化
 * settings mirror 的 persistence="memory" → 设置页「模型」页签永远报
 * 「加载提供商目录失败: settings are unavailable in this browser」（dsh-pocket 的
 * client apply 里那个 isLoopback 兜底补丁来不及——ui-settings 已经先固化了）。
 * location.hostname 是 unforgeable 属性伪装不了，但**第一分支给我们留了正门**：
 * 让连接层在构造 handle 时读到 transport.ownsHost===true，早于一切插件激活 →
 * settings/模型页在手机上恢复。
 *
 * 时机细节：浏览器页面里宿主 web shell **从不赋值** __DSH_TRANSPORT__（它是 Electron
 * 渲染进程的东西），只拦截「宿主赋值」的话普通浏览器永远等不到。所以 shim 在
 * 「当前没有 transport」时主动创建一个 { ownsHost:true, createApiClient:()=>null }
 * 占位（createApiClient 必须带上：连接层那行 `transport?.createApiClient()` 只对
 * transport 本身做可选链，方法缺失会 TypeError 整页崩——issue #96）。
 *
 * 属性用 configurable:false 安装：宿主 web shell 会在消费后 `delete
 * globalThis.__DSH_TRANSPORT__`（消费即焚），configurable:true 时一删就没了，
 * connection 包稍后的 apply()（`globals.__DSH_TRANSPORT__`）读到 undefined →
 * isLoopback 回落到 hostname 分支 → 修复失效。configurable:false 下非严格模式的
 * delete 静默失败、属性保留；accessor 的 set 不受影响——宿主真赋值（Electron
 * 渲染进程）仍会被拦截 patch，原生实现/原生 true 一律不覆盖。
 *
 * 安全边界：只在「宿主没说 ownsHost」时才声明（true 不覆盖）；本代理的所有入口
 * 本就要求 PIN/cookie 认证，等同用户显式信任该浏览器。桌面 Electron 渲染进程
 * 原生 ownsHost=true，不受影响。
 */
export const TRANSPORT_API_CLIENT_SHIM = `<script data-dsh-pocket-transport-shim="1">!function(){try{var K='__DSH_TRANSPORT__',cur=globalThis[K];function patch(t){try{if(t&&typeof t==='object'){if(typeof t.createApiClient!=='function'){try{Object.defineProperty(t,'createApiClient',{value:function(){return null;},writable:true,configurable:true});}catch(e){try{t.createApiClient=function(){return null;};}catch(e2){}}}if(t.ownsHost!==true){try{Object.defineProperty(t,'ownsHost',{value:true,writable:true,configurable:true});}catch(e){try{t.ownsHost=true;}catch(e2){}}}}}catch(e){}return t;}if(cur)patch(cur);else cur=patch({ownsHost:true,createApiClient:function(){return null;}});Object.defineProperty(globalThis,K,{configurable:false,enumerable:true,get:function(){return cur;},set:function(t){cur=patch(t);}});}catch(e){}}();</script>`;

export const INJECT_MARK = 'data-dsh-pocket-polyfill="1"';

// HTML 注入分支的内存上限：页面本体几十 KB，正常远小于此值。超过就放弃注入、原样
// 流式回传——否则一个超大 HTML（或被劫持成解压炸弹的响应）会把整个报文攒进内存，
// 同步 gunzip/brotliDecompress 还会卡住事件循环（所有 WS/请求一起停摆）。
export const HTML_INJECT_MAX = 4 * 1024 * 1024;

// 分享链接（CLI 二维码 / `?token=<PIN>`）的地址栏清理：代理已经把明文 PIN 从转发给
// 上游的请求行/Referer/日志里摘掉，但浏览器自己的地址栏与历史仍留着它。用
// history.replaceState 就地抹掉 query 里的 token——不跳转（Safari 在 http://纯IP
// 源上会丢 3xx 下发的 Set-Cookie，重定向会破坏扫码登录，见 issue #91）。
// 只在本次请求确实带过口袋 PIN 时注入（req.__pocketTokenScrubbed）。
export const TOKEN_SCRUB_MARK = 'data-dsh-pocket-token-scrub="1"';
export const TOKEN_SCRUB_SCRIPT = `<script ${TOKEN_SCRUB_MARK}>(function(){try{var u=new URL(location.href);var keys=[];u.searchParams.forEach(function(v,k){if(String(k).toLowerCase()==='token')keys.push(k);});if(!keys.length)return;keys.forEach(function(k){u.searchParams.delete(k);});history.replaceState(null,'',u.pathname+(u.search||'')+u.hash);}catch(e){}})();</script>`;

// 代理→上游 RPC 的来源分级头（loopback / lan / public）。入站同名头在
// loopbackAuthority 里被丢弃，值只由不可伪造的源地址 + policyHost 决定，
// 上游据此决定「公网 PIN 是否回显给这个客户端」之类的授权。
const POCKET_ORIGIN_HEADER = 'x-dsh-pocket-origin';

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
export function isCompressed(headers) {
  return /(^|,\s*)(gzip|br|deflate)(\s*,|$)/i.test(String(headers['content-encoding'] ?? ''));
}

/** Service Worker 脚本路由（issue 慢加载）——独立直发，不进上游代理。 */
export const SW_SCRIPT_PATH = '/dsh-pocket-sw.js';

/**
 * 静态资源 Service Worker（issue 慢加载）：只缓存「内容寻址」的不可变资源——
 * combo（/plugins/??…&rev=<hash>）与哈希资产（/assets/<name>-<hash>.<ext>）。
 * 其余请求（HTML/API/WebSocket）一律不拦截；命中缓存即免网络，重复打开秒开。
 * 改动缓存语义时递增 CACHE 版本号以丢弃旧条目。
 */
export const SW_SCRIPT = `// dsh-pocket static cache worker (issue: slow mobile load)
var CACHE = 'dshp-static-v1';
var MAX_ENTRIES = 18;
function isImmutable(u) {
  try {
    var x = new URL(u);
    if (x.origin !== self.location.origin) return false;
    if (x.pathname.indexOf('/assets/') === 0 && /-[A-Za-z0-9_-]{8,}\\.[A-Za-z0-9]+$/.test(x.pathname)) return true;
    return x.pathname.indexOf('/plugins/') === 0 && /[?&]rev=[0-9a-f]{6,}/.test(x.search);
  } catch (e) { return false; }
}
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || !isImmutable(req.url)) return;
  e.respondWith(caches.open(CACHE).then(function (cache) {
    return cache.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        // Fetch 规范不向脚本暴露 set-cookie，此守卫为防御性保留；
        // 真正的缓存边界是上面的 isImmutable URL 白名单。
        if (!res || !res.ok || res.headers.get('set-cookie')) return res;
        // fetch() 已解码 body，但 headers 仍带 content-encoding——入库前必须摘掉
        // （并摘 content-length），否则缓存命中时浏览器会拿解码后的字节再解一次。
        var clean = new Response(res.body, { status: res.status, statusText: res.statusText, headers: res.headers });
        clean.headers.delete('content-encoding');
        clean.headers.delete('content-length');
        return cache.put(req, clean.clone()).catch(function () {}).then(function () {
          return cache.keys();
        }).then(function (keys) {
          // 按插入序 FIFO 淘汰最旧的条目——match 不会提升条目位置，不是 LRU
          var stale = keys.slice(0, Math.max(0, keys.length - MAX_ENTRIES));
          return Promise.all(stale.map(function (k) { return cache.delete(k); }));
        }).catch(function () {}).then(function () { return clean; });
      }).catch(function () {
        // 网络错误也给子资源一个明确状态（504），别让 respondWith 整体 reject
        return new Response('dsh-pocket: upstream unreachable', { status: 504, statusText: 'Gateway Timeout' });
      });
    });
  }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (names) {
    return Promise.all(names.map(function (n) { return n === CACHE ? null : caches.delete(n); }));
  }));
});
`;

/** SW 注册片段（随 DEFAULT_INJECT 注入；非安全上下文无 navigator.serviceWorker 自动跳过）。 */
export const SW_REGISTER_SCRIPT = `<script data-dsh-pocket-sw-register="1">!function(){try{if('serviceWorker' in navigator){navigator.serviceWorker.register('${SW_SCRIPT_PATH}').catch(function(){})}}catch(e){}}();</script>`;

export const DEFAULT_INJECT = RANDOM_UUID_POLYFILL + TRANSPORT_API_CLIENT_SHIM + SW_REGISTER_SCRIPT;

/**
 * DSH Desktop advanced 模式不支持的提示覆盖层（issue #19）。
 * advanced 组合会禁用网页版 ui-layout，而桌面 layout 只在 advanced client 提供——
 * 手机页面被注入 compatibility 后无任何 layout 服务 → 启动白屏（Failed to load plugins）。
 * 该脚本在页面上叠加一个固定警告层，让用户明确知道原因（而不是无解白屏）。
 */
export function advancedNoticeScript() {
  return `<script data-dsh-pocket-advanced-notice="1">!function(){try{var d=document.createElement('div');d.style.cssText='position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);color:#fff;font:15px/1.7 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;text-align:center;padding:24px';d.textContent='DSH 桌面端处于 advanced 模式，手机访问暂不支持。请在桌面端设置中切回 compatibility 模式后重启。| DSH Desktop is in advanced mode — phone access is not supported yet. Switch back to compatibility in the desktop app and restart.';document.documentElement.appendChild(d);}catch(e){}}();</script>`;
}
