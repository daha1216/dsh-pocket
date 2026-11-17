// 代理自身渲染的 HTML 页面（登录、配对过期、局域网关闭、桌面门禁、握手过渡/阻断）。
//
// v4.0 视觉与国际化约定：
//   - 无外部资源、内联样式、零第三方依赖；
//   - 自动适配系统浅色 / 深色模式（@media (prefers-color-scheme: dark)，深色基底 #0b0d12 / #14171f）；
//   - R20 卡片圆角、0.5px 视网膜细边框、胶囊语言切换器（corner-shape: round）、字重 <= 500；
//   - 输入框字号 >= 16px（18px），彻底杜绝 iOS Safari 聚焦自动放大；
//   - 服务端按 Accept-Language 推断初始语言（默认 'zh'），配合右上角「中 / EN」胶囊单语切换，
//     告别中英双语硬拼接，同时在 DOM 内保留双语语义节点保证可访问性与无闪烁切换。

import { HANDSHAKE_RETRY_PARAM } from './handshake.mjs';

/**
 * 根据请求头 Accept-Language 推断首选界面语言（'zh' | 'en'，默认 'zh'）。
 * @param {string | string[] | undefined} acceptLanguage
 * @returns {'zh' | 'en'}
 */
export function resolvePageLang(acceptLanguage) {
  const raw = Array.isArray(acceptLanguage) ? acceptLanguage.join(',') : String(acceptLanguage ?? '').trim();
  if (!raw) return 'zh';
  let bestZh = -1;
  let bestEn = -1;
  const parts = raw.split(',').slice(0, 16);
  for (const part of parts) {
    const segs = part.trim().split(';');
    const tag = (segs[0] ?? '').trim().toLowerCase();
    if (!tag) continue;
    let q = 1;
    for (let i = 1; i < segs.length; i++) {
      const m = /^q=([01](?:\.\d{0,3})?)$/i.exec(segs[i].trim());
      if (m) q = Number(m[1]);
    }
    if (tag === 'zh' || tag.startsWith('zh-')) {
      if (q > bestZh) bestZh = q;
    } else if (tag === 'en' || tag.startsWith('en-')) {
      if (q > bestEn) bestEn = q;
    }
  }
  if (bestEn > 0 && bestEn > bestZh) return 'en';
  return 'zh';
}

function normalizeLang(lang) {
  return lang === 'en' ? 'en' : 'zh';
}

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const BASE_PAGE_CSS = `
:root{
  color-scheme:light dark;
  --p-bg:#f4f5f8;
  --p-card:#ffffff;
  --p-surface:#f8f9fb;
  --p-border:rgba(15,23,42,0.09);
  --p-border-subtle:rgba(15,23,42,0.06);
  --p-ink:#111827;
  --p-ink-2:#4b5563;
  --p-ink-3:#8b93a4;
  --p-accent:#4f6ef7;
  --p-accent-hover:#3f5ee6;
  --p-accent-soft:rgba(79,110,247,0.10);
  --p-input-bg:#ffffff;
  --p-input-border:#d1d5db;
  --p-err:#dc2626;
  --p-err-bg:rgba(220,38,38,0.08);
  --p-code-bg:rgba(15,23,42,0.05);
}
@media (prefers-color-scheme: dark){
  :root{
    --p-bg:#0b0d12;
    --p-card:#14171f;
    --p-surface:#1a1e29;
    --p-border:rgba(255,255,255,0.09);
    --p-border-subtle:rgba(255,255,255,0.06);
    --p-ink:#f3f4f6;
    --p-ink-2:#9ca3af;
    --p-ink-3:#6b7280;
    --p-accent:#6380ff;
    --p-accent-hover:#758fff;
    --p-accent-soft:rgba(99,128,255,0.14);
    --p-input-bg:#0e1117;
    --p-input-border:#282e3d;
    --p-err:#f87171;
    --p-err-bg:rgba(248,113,113,0.12);
    --p-code-bg:rgba(255,255,255,0.07);
  }
}
*{box-sizing:border-box}
html[data-lang="zh"] [data-lang-en]{display:none!important}
html[data-lang="en"] [data-lang-zh]{display:none!important}
body{margin:0;min-height:100vh;min-height:100dvh;display:flex;align-items:center;justify-content:center;padding:20px;background:var(--p-bg);color:var(--p-ink);font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Inter','PingFang SC','Segoe UI',sans-serif;-webkit-font-smoothing:antialiased;touch-action:manipulation}
.card{position:relative;background:var(--p-card);border:1px solid var(--p-border);border-radius:20px;padding:28px 24px 24px;max-width:380px;width:100%;text-align:center}
@media (-webkit-min-device-pixel-ratio: 2),(min-resolution: 2dppx){
  .card{border-width:0.5px}
}
.topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
.brand-badge{display:inline-flex;align-items:center;gap:7px;padding:5px 11px;border-radius:999px;corner-shape:round;background:var(--p-accent-soft);color:var(--p-accent);font-size:12px;font-weight:500;letter-spacing:0.1px}
.brand-badge svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.lang-pill{display:inline-flex;align-items:center;gap:4px;height:28px;padding:0 10px;border-radius:999px;corner-shape:round;border:1px solid var(--p-border);background:var(--p-surface);color:var(--p-ink-2);font-size:12px;font-weight:500;cursor:pointer;font-family:inherit}
.lang-pill .active-tag{color:var(--p-ink)}
.lang-pill .sep{opacity:0.35}
@media (hover: hover){
  .lang-pill:hover{border-color:var(--p-input-border);color:var(--p-ink)}
}
.lang-pill:focus-visible{outline:2px solid var(--p-accent);outline-offset:2px}
.icon-ring{width:44px;height:44px;margin:0 auto 14px;border-radius:50%;corner-shape:round;background:var(--p-accent-soft);color:var(--p-accent);display:flex;align-items:center;justify-content:center}
.icon-ring.warn{background:var(--p-err-bg);color:var(--p-err)}
.icon-ring svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}
h1{font-size:18px;font-weight:500;line-height:1.35;margin:0 0 8px;color:var(--p-ink);letter-spacing:-0.01em}
p{font-size:13.5px;line-height:1.6;color:var(--p-ink-2);margin:0 0 14px}
code{background:var(--p-code-bg);padding:2px 6px;border-radius:6px;font-size:12px;color:var(--p-ink);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.primary-btn,.secondary-btn{display:inline-flex;align-items:center;justify-content:center;width:100%;min-height:42px;padding:10px 16px;font-size:15px;font-weight:500;border-radius:12px;text-decoration:none;cursor:pointer;border:none;font-family:inherit}
.primary-btn{background:var(--p-accent);color:#fff}
.secondary-btn{background:var(--p-surface);color:var(--p-ink);border:1px solid var(--p-border);margin-top:8px}
@media (hover: hover){
  .primary-btn:hover{background:var(--p-accent-hover)}
  .secondary-btn:hover{border-color:var(--p-input-border)}
}
.primary-btn:focus-visible,.secondary-btn:focus-visible{outline:2px solid var(--p-accent);outline-offset:2px}
.step{text-align:left;background:var(--p-surface);border:1px solid var(--p-border-subtle);border-radius:14px;padding:13px 15px;margin:12px 0;font-size:12.5px;color:var(--p-ink-2);line-height:1.75}
.step-title{color:var(--p-ink);font-weight:500;display:block;margin-bottom:4px}
.foot-note{font-size:12px;line-height:1.6;color:var(--p-ink-3);margin:14px 0 0}
`.trim();

const LANG_SWITCH_SCRIPT = `
(function(){
  var root=document.documentElement;
  var btn=document.getElementById('lang-switch');
  function applyLang(l){
    if(l!=='zh'&&l!=='en')return;
    root.setAttribute('data-lang',l);
    root.setAttribute('lang',l==='en'?'en':'zh-CN');
    var z=document.getElementById('lang-tag-zh');
    var e=document.getElementById('lang-tag-en');
    if(z)z.className=l==='zh'?'active-tag':'';
    if(e)e.className=l==='en'?'active-tag':'';
    if(typeof window.__onPocketLangChange==='function')window.__onPocketLangChange(l);
  }
  try{
    var saved=localStorage.getItem('dsh-pocket:page-lang');
    if(saved==='zh'||saved==='en')applyLang(saved);
  }catch(_){}
  if(btn){
    btn.addEventListener('click',function(){
      var next=root.getAttribute('data-lang')==='en'?'zh':'en';
      applyLang(next);
      try{localStorage.setItem('dsh-pocket:page-lang',next);}catch(_){}
    });
  }
})();
`.trim();

function renderTopBar(lang) {
  const isEn = lang === 'en';
  return `<div class="topbar">
<span class="brand-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="3"/><line x1="10" y1="18.5" x2="14" y2="18.5"/></svg>DSH Pocket</span>
<button id="lang-switch" class="lang-pill" type="button" aria-label="切换语言 / Switch language"><span id="lang-tag-zh" class="${isEn ? '' : 'active-tag'}">中</span><span class="sep">/</span><span id="lang-tag-en" class="${isEn ? 'active-tag' : ''}">EN</span></button>
</div>`;
}

/**
 * 登录页：按访问来源显示提示（局域网 / 公网）。
 * credentialKind: 'persistent'（可长期复用）|'ephemeral'（短期轮换，不建议保存）。
 * error: false|true|'locked'（locked 带剩余秒数）。
 * lang: 'zh'|'en'（默认 'zh'）。
 */
export function loginPageHtml(error, isPublic, retryAfter = 0, credentialKind = 'ephemeral', lang = 'zh') {
  const l = normalizeLang(lang);
  const whereZh = isPublic ? '此公网地址' : '此局域网地址';
  const whereEn = isPublic ? 'This public address' : 'This LAN address';
  const autocomplete = credentialKind === 'persistent' ? 'current-password' : 'off';
  const usernameField = credentialKind === 'persistent'
    ? '<input class="implicit-username" id="pocket-username" name="username" type="text" autocomplete="username" value="dsh-pocket" tabindex="-1" aria-hidden="true" readonly>'
    : '';
  const safeRetry = Math.max(1, Number(retryAfter) || 1);
  const errHtml = error === 'locked'
    ? `<div class="err has-err" role="alert"><span data-lang-zh>尝试次数过多，请 ${safeRetry} 秒后再试</span><span data-lang-en>Too many attempts — try again in ${safeRetry}s</span></div>`
    : error
      ? '<div class="err has-err" role="alert"><span data-lang-zh>密码错误，请重试</span><span data-lang-en>Wrong PIN, try again</span></div>'
      : '<div class="err" aria-live="polite"></div>';

  return `<!doctype html><html lang="${l === 'en' ? 'en' : 'zh-CN'}" data-lang="${l}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DSH Pocket · ${l === 'en' ? 'Access Verification' : '访问验证'}</title>
<style>
${BASE_PAGE_CSS}
label.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.implicit-username{display:none}
.pin-field{position:relative;margin-bottom:12px}
input#current-password{width:100%;box-sizing:border-box;padding:10px 50px;font-size:18px;line-height:24px;letter-spacing:6px;text-align:center;caret-color:#4f6ef7;background:var(--p-input-bg);color:var(--p-ink);border:1px solid var(--p-input-border);border-radius:12px;outline:none;min-height:46px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
input::-ms-reveal,input::-ms-clear{display:none}
input#current-password:focus{border-color:var(--p-accent);box-shadow:0 0 0 2px var(--p-accent-soft)}
.pin-toggle{position:absolute;right:3px;top:50%;transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:42px;height:42px;padding:0;background:transparent;color:var(--p-ink-3);border:0;border-radius:10px;cursor:pointer}
@media (hover: hover){
  .pin-toggle:hover{color:var(--p-ink);background:var(--p-surface)}
}
.pin-toggle:focus-visible{outline:2px solid var(--p-accent);outline-offset:1px}
.pin-toggle svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}
.pin-toggle .is-hidden{display:none}
.enter-button{width:100%;min-height:44px;padding:10px 16px;font-size:15px;font-weight:500;background:var(--p-accent);color:#fff;border:none;border-radius:12px;cursor:pointer;font-family:inherit}
@media (hover: hover){
  .enter-button:hover{background:var(--p-accent-hover)}
}
.enter-button:focus-visible{outline:2px solid var(--p-accent);outline-offset:2px}
.err{color:var(--p-err);font-size:12.5px;margin-bottom:12px;min-height:18px;line-height:1.45}
.err.has-err{background:var(--p-err-bg);padding:8px 12px;border-radius:10px}
.hint{font-size:12px;line-height:1.65;color:var(--p-ink-3);margin:16px 0 0;padding-top:14px;border-top:1px solid var(--p-border-subtle);text-align:left}
</style></head><body><div class="card">
${renderTopBar(l)}
<div class="icon-ring"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2.5"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></div>
<h1><span data-lang-zh>访问密码验证</span><span data-lang-en>Enter Access PIN</span></h1>
<p><span data-lang-zh>${whereZh}受访问密码保护，请输入访问密码（或在电脑端扫码一步免密配对）。</span><span data-lang-en>${whereEn} is protected — enter your fallback PIN or scan the pairing QR code on your computer.</span></p>
${errHtml}
<form method="post" action="/pocket-login">
${usernameField}
<label class="sr-only" for="current-password">访问密码 | Access PIN</label>
<div class="pin-field">
<input id="current-password" name="token" type="password" minlength="8" maxlength="64" autocomplete="${autocomplete}" autocapitalize="none" spellcheck="false" autofocus required>
<button id="toggle-password" class="pin-toggle" type="button" aria-controls="current-password" aria-pressed="false" aria-label="显示访问密码 | Show access PIN" title="显示密码 | Show password">
<svg id="eye-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path id="eye-slash" d="M3 3l18 18"/></svg>
</button>
</div>
<button class="enter-button" type="submit"><span data-lang-zh>进入</span><span data-lang-en>Continue</span></button>
</form>
<p class="hint"><span data-lang-zh>这是你电脑上 DSH 的手机入口，会话与电脑实时同步。推荐在电脑端「设置 → 手机访问」直接扫码一步连接；备用访问密码也在同一页面查看，公网访问经由 Cloudflare 隧道加密。</span><span data-lang-en>This is the mobile entry to DSH on your computer — sessions sync live. Scan the QR code under Settings → Phone access on your desktop for instant pairing, or find the fallback PIN there. Public access is encrypted via Cloudflare Tunnel.</span></p>
<script>
${LANG_SWITCH_SCRIPT}
const pinInput=document.getElementById('current-password');
const pinToggle=document.getElementById('toggle-password');
const eyeSlash=document.getElementById('eye-slash');
pinToggle.addEventListener('pointerdown',(event)=>event.preventDefault());
pinToggle.addEventListener('click',()=>{
  const show=pinInput.type==='password';
  const hadFocus=document.activeElement===pinInput;
  const start=pinInput.selectionStart;
  const end=pinInput.selectionEnd;
  pinInput.type=show?'text':'password';
  eyeSlash.classList.toggle('is-hidden',show);
  pinToggle.setAttribute('aria-pressed',String(show));
  pinToggle.setAttribute('aria-label',show?'隐藏访问密码 | Hide access PIN':'显示访问密码 | Show access PIN');
  pinToggle.title=show?'隐藏密码 | Hide password':'显示密码 | Show password';
  if(hadFocus&&start!==null&&end!==null) pinInput.setSelectionRange(start,end);
});
</script>
</div></body></html>`;
}

/**
 * 一步扫码配对码过期 / 无效 / 通道不匹配提示页（v4.0）。
 * @param {'expired' | 'invalid' | 'channel-mismatch'} [reason='expired']
 * @param {boolean} [isPublic=false]
 * @param {'zh' | 'en'} [lang='zh']
 */
export function pairExpiredPageHtml(reason = 'expired', isPublic = false, lang = 'zh') {
  const l = normalizeLang(lang);
  const isMismatch = reason === 'channel-mismatch';
  const entryZh = isPublic ? '公网域名二维码' : '局域网二维码';
  const entryEn = isPublic ? 'Public domain QR code' : 'LAN QR code';
  const detailZh = isMismatch
    ? `当前配对码与访问入口不匹配（局域网配对码不能用于公网域名）。请在电脑端切换到对应的「${entryZh}」后重新扫码。`
    : '为保障安全，扫码配对链接为单次有效且限时 90 秒（扫过一次或超时即自动作废）。请回到电脑端「设置 → 手机访问」重新扫描最新二维码。';
  const detailEn = isMismatch
    ? `This pairing ticket does not match the current channel (a LAN ticket cannot be redeemed on a public address). Switch to the ${entryEn} tab on your computer and scan again.`
    : 'For security, each QR pairing link is single-use and expires after 90 seconds. Open Settings → Phone access on your computer and scan the refreshed QR code.';

  return `<!doctype html><html lang="${l === 'en' ? 'en' : 'zh-CN'}" data-lang="${l}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DSH Pocket · ${l === 'en' ? 'Pairing Link Expired' : '配对码已过期或无效'}</title>
<style>
${BASE_PAGE_CSS}
</style></head><body><div class="card">
${renderTopBar(l)}
<div class="icon-ring warn"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg></div>
<h1><span data-lang-zh>配对码已过期或无效</span><span data-lang-en>Pairing link expired</span></h1>
<p><span data-lang-zh>${escapeHtml(detailZh)}</span><span data-lang-en>${escapeHtml(detailEn)}</span></p>
<div class="step">
<span class="step-title"><span data-lang-zh>如何重新连接：</span><span data-lang-en>How to connect:</span></span>
<span data-lang-zh>1. 在电脑端打开 <strong>设置 → 手机访问</strong>，二维码会自动刷新；<br>2. 用手机相机重新扫描二维码即可免密直连；<br>3. 若人不在电脑旁，也可点击下方按钮用备用密码登录。</span>
<span data-lang-en>1. Open <strong>Settings → Phone access</strong> on your computer (the QR code auto-refreshes);<br>2. Scan the live QR code with your phone camera;<br>3. Or sign in manually below using your fallback PIN.</span>
</div>
<a class="primary-btn" href="/"><span data-lang-zh>使用备用访问密码登录</span><span data-lang-en>Sign in with fallback PIN</span></a>
<script>${LANG_SWITCH_SCRIPT}</script>
</div></body></html>`;
}

/** 局域网访问已关闭时的提示页（浏览器导航时显示；API/WS 返回 403 JSON/拒绝握手）。 */
export function lanDisabledPageHtml(lang = 'zh') {
  const l = normalizeLang(lang);
  return `<!doctype html><html lang="${l === 'en' ? 'en' : 'zh-CN'}" data-lang="${l}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DSH Pocket · ${l === 'en' ? 'LAN Access Disabled' : '局域网访问已关闭'}</title>
<style>
${BASE_PAGE_CSS}
</style></head><body><div class="card">
${renderTopBar(l)}
<div class="icon-ring warn"><svg viewBox="0 0 24 24" aria-hidden="true"><line x1="2" y1="2" x2="22" y2="22"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M13.83 10.17A10 10 0 0 1 19 12.859"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg></div>
<h1><span data-lang-zh>局域网访问已关闭</span><span data-lang-en>LAN access is disabled</span></h1>
<p><span data-lang-zh>局域网访问已关闭，扫码与局域网链接均暂停响应。请在电脑端「设置 → 手机访问」中重新开启后再试。</span><span data-lang-en>LAN access is currently turned off — the QR code and LAN link are unavailable. Re-enable it under Settings → Phone access on your computer.</span></p>
<script>${LANG_SWITCH_SCRIPT}</script>
</div></body></html>`;
}

/** 桌面端浏览器访问门禁提示页（issue #81）：DSH Desktop 未开启「浏览器访问」时显示。 */
export function desktopAccessBlockedPageHtml(lang = 'zh') {
  const l = normalizeLang(lang);
  return `<!doctype html><html lang="${l === 'en' ? 'en' : 'zh-CN'}" data-lang="${l}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DSH Pocket · ${l === 'en' ? 'Browser Access Disabled on Desktop' : '桌面端未开启浏览器访问'}</title>
<style>
${BASE_PAGE_CSS}
.card{max-width:416px}
</style></head><body><div class="card">
${renderTopBar(l)}
<div class="icon-ring warn"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2.5"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
<h1><span data-lang-zh>桌面端未开启「浏览器访问」</span><span data-lang-en>Desktop browser access is off</span></h1>
<p><span data-lang-zh>你已通过身份验证，但本机 DSH Desktop 未开启「浏览器访问」，桌面门禁拒绝了外部浏览器的页面请求。</span><span data-lang-en>Authentication succeeded, but the host DSH Desktop has "browser access" disabled and rejected external browser requests.</span></p>
<div class="step">
<span class="step-title"><span data-lang-zh>解决方法（任选其一）：</span><span data-lang-en>How to enable (choose one):</span></span>
<span data-lang-zh>1. DSH Desktop → 设置 → 窗口 / 模式 → 开启「浏览器访问」（自动切到 <code>compatibility</code> 模式）→ <strong>重启 DSH Desktop</strong>。<br>2. 或在配置文件中设置：<br><code>dsh-desktop: { mode: compatibility, openBrowser: true }</code><br>然后重启 DSH Desktop 并刷新本页。</span>
<span data-lang-en>1. DSH Desktop → Settings → Window / Mode → enable "Browser access" (switches to <code>compatibility</code> mode) → <strong>restart DSH Desktop</strong>.<br>2. Or set in your config file:<br><code>dsh-desktop: { mode: compatibility, openBrowser: true }</code><br>then restart DSH Desktop and refresh this page.</span>
</div>
<p class="foot-note"><span data-lang-zh>门禁由 DSH Desktop 宿主控制，DSH Pocket 不会绕过宿主权限边界。</span><span data-lang-en>This gate is enforced by the host DSH Desktop; DSH Pocket never bypasses host access controls.</span></p>
<script>${LANG_SWITCH_SCRIPT}</script>
</div></body></html>`;
}

/** 握手过渡页：200 + Set-Cookie（由调用方带上）+ meta refresh 跳回干净根路径。 */
export function handshakePageHtml(extraHead = '', lang = 'zh') {
  const l = normalizeLang(lang);
  return `<!doctype html><html lang="${l === 'en' ? 'en' : 'zh-CN'}" data-lang="${l}"><head><meta charset="utf-8">
${extraHead}
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="refresh" content="0; url=/">
<title>DSH Pocket · ${l === 'en' ? 'Opening…' : '正在进入…'}</title>
<style>
${BASE_PAGE_CSS}
.spinner{width:24px;height:24px;border-radius:50%;corner-shape:round;border:2px solid var(--p-border);border-top-color:var(--p-accent);animation:spin .7s linear infinite;margin:0 auto 12px}
@keyframes spin{to{transform:rotate(360deg)}}
.mini{display:flex;flex-direction:column;align-items:center;justify-content:center}
</style></head><body><div class="mini"><div class="spinner" aria-hidden="true"></div><p style="margin:0"><span data-lang-zh>正在进入…</span><span data-lang-en>Opening…</span></p></div></body></html>`;
}

/** 握手反复失败时的提示页（issue #91）：说明原因并给出可操作的规避办法。 */
export function handshakeBlockedPageHtml(lang = 'zh') {
  const l = normalizeLang(lang);
  return `<!doctype html><html lang="${l === 'en' ? 'en' : 'zh-CN'}" data-lang="${l}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DSH Pocket · ${l === 'en' ? 'Session Handshake Blocked' : '无法完成登录握手'}</title>
<style>
${BASE_PAGE_CSS}
.card{max-width:400px}
</style></head><body><div class="card">
${renderTopBar(l)}
<div class="icon-ring warn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
<h1><span data-lang-zh>无法完成登录握手</span><span data-lang-en>Session handshake failed</span></h1>
<p><span data-lang-zh>浏览器未能保存 DSH 下发的会话 cookie，重试次数太多后已停止自动跳转（常见于 <strong>Safari</strong> 访问纯 IP 的 <code>http://</code> 局域网地址时丢弃 cookie）。</span><span data-lang-en>Your browser did not retain the session cookie issued by DSH, so automatic redirects were stopped. <strong>Safari</strong> over plain <code>http://</code> + IP is a known case.</span></p>
<div class="step">
<span class="step-title"><span data-lang-zh>建议方案：</span><span data-lang-en>What to try:</span></span>
<span data-lang-zh>1. 改用 Chrome / Edge 浏览器打开局域网地址；<br>2. 或在电脑端「设置 → 手机访问」配置自己的 Cloudflare 固定域名与 Tunnel Token，走 HTTPS 入口访问。</span>
<span data-lang-en>1. Open the LAN link in Chrome or Edge;<br>2. Or configure your own Cloudflare Named Tunnel domain in Settings → Phone access to connect over HTTPS.</span>
</div>
<a class="primary-btn" href="/?${HANDSHAKE_RETRY_PARAM}=1"><span data-lang-zh>重试一次</span><span data-lang-en>Retry handshake</span></a>
<script>${LANG_SWITCH_SCRIPT}</script>
</div></body></html>`;
}
