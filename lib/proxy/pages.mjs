// 代理自己吐给浏览器的 HTML 页面（登录、策略拒绝、握手过渡/失败）。
//
// 集中在一个文件是为了让「手机看到的每一张非上游页面」可以一次审完：全部无外部
// 资源、无框架、内联样式，且不依赖代理运行时状态（只接受调用方传入的文案变量）。

import { HANDSHAKE_RETRY_PARAM } from './handshake.mjs';

/**
 * 登录页：按访问来源显示提示（局域网 / 公网）。
 * credentialKind: 'persistent'（可长期复用）|'ephemeral'（短期轮换，不建议保存）。
 * error: false|true|'locked'（locked 带剩余秒数）。
 */
export function loginPageHtml(error, isPublic, retryAfter = 0, credentialKind = 'ephemeral') {
  const where = isPublic ? '此公网地址' : '此局域网地址';
  const whereEn = isPublic ? 'This public address' : 'This LAN address';
  const autocomplete = credentialKind === 'persistent' ? 'current-password' : 'off';
  const usernameField = credentialKind === 'persistent'
    ? '<input class="implicit-username" id="pocket-username" name="username" type="text" autocomplete="username" value="dsh-pocket" tabindex="-1" aria-hidden="true" readonly>'
    : '';
  const errMsg = error === 'locked'
    ? `尝试次数过多，请 ${retryAfter} 秒后再试 | Too many attempts — try again in ${retryAfter}s`
    : error ? '密码错误，请重试 | Wrong PIN, try again' : '';
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DSH Pocket · 访问验证</title>
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;touch-action:manipulation}
.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:28px 24px;max-width:320px;width:calc(100% - 48px);text-align:center}
h1{font-size:16px;margin:0 0 4px;color:#111827}
p{font-size:13px;color:#6b7280;margin:0 0 16px}
label.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.implicit-username{display:none}
.pin-field{position:relative;margin-bottom:12px}
input{width:100%;box-sizing:border-box;padding:10px 50px;font-size:18px;line-height:24px;letter-spacing:6px;text-align:center;caret-color:#4f6ef7;border:1px solid #d1d5db;border-radius:8px;outline:none}
input::-ms-reveal,input::-ms-clear{display:none}
input:focus{border-color:#4f6ef7;box-shadow:0 0 0 1px #4f6ef7}
.pin-toggle{position:absolute;right:2px;top:50%;transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:44px;height:44px;padding:0;background:transparent;color:#6b7280;border:0;border-radius:6px;cursor:pointer}
.pin-toggle:hover{color:#374151;background:#f3f4f6}
.pin-toggle:focus-visible{outline:2px solid #4f6ef7;outline-offset:1px}
.pin-toggle svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}
.pin-toggle .is-hidden{display:none}
.enter-button{width:100%;padding:10px;font-size:15px;background:#4f6ef7;color:#fff;border:none;border-radius:8px;cursor:pointer}
.err{color:#dc2626;font-size:12px;margin-bottom:10px;min-height:16px}
.hint{font-size:12px;line-height:1.6;color:#9ca3af;margin:14px 0 0;text-align:left}
</style></head><body><div class="card">
<h1>🔐 DSH Pocket</h1>
<p>${where}受访问密码保护，请输入访问密码 | ${whereEn} is password-protected — enter the access PIN</p>
<div class="err">${errMsg}</div>
<form method="post" action="/pocket-login">
${usernameField}
<label class="sr-only" for="current-password">访问密码 | Access PIN</label>
<div class="pin-field">
<input id="current-password" name="token" type="password" minlength="8" maxlength="64" autocomplete="${autocomplete}" autocapitalize="none" spellcheck="false" autofocus required>
<button id="toggle-password" class="pin-toggle" type="button" aria-controls="current-password" aria-pressed="false" aria-label="显示访问密码 | Show access PIN" title="显示密码 | Show password">
<svg id="eye-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path id="eye-slash" d="M3 3l18 18"/></svg>
</button>
</div>
<button class="enter-button" type="submit">进入 | Enter</button>
</form>
<p class="hint">这是你电脑上 DSH 的手机入口，会话与电脑实时同步。访问密码在电脑端「设置 → 手机访问」里查看；公网访问经由 Cloudflare 隧道加密。<br>What is this? It is the mobile entry to DSH on your computer — sessions sync live. Find the access PIN under Settings → Phone access on the desktop; public access goes through an encrypted Cloudflare tunnel.</p>
<script>
const pinInput=document.getElementById('current-password');
const pinToggle=document.getElementById('toggle-password');
const eyeSlash=document.getElementById('eye-slash');
// 指针点击眼睛时不抢走输入框焦点；键盘 Tab 到按钮时仍保留原生按钮行为。
pinToggle.addEventListener('pointerdown',(event)=>event.preventDefault());
pinToggle.addEventListener('click',()=>{
  const show=pinInput.type==='password';
  const hadFocus=document.activeElement===pinInput;
  const start=pinInput.selectionStart;
  const end=pinInput.selectionEnd;
  pinInput.type=show?'text':'password';
  // 图标表达当前状态：有斜线 = 密码隐藏；无斜线 = 密码可见。
  eyeSlash.classList.toggle('is-hidden',show);
  pinToggle.setAttribute('aria-pressed',String(show));
  pinToggle.setAttribute('aria-label',show?'隐藏访问密码 | Hide access PIN':'显示访问密码 | Show access PIN');
  pinToggle.title=show?'隐藏密码 | Hide password':'显示密码 | Show password';
  if(hadFocus&&start!==null&&end!==null) pinInput.setSelectionRange(start,end);
});
</script>
</div></body></html>`;
}

/** 局域网访问已关闭时的提示页（浏览器导航时显示；API/WS 返回 403 JSON/拒绝握手）。 */
export function lanDisabledPageHtml() {
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DSH Pocket · 局域网访问已关闭</title>
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;touch-action:manipulation}
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
export function desktopAccessBlockedPageHtml() {
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DSH Pocket · 桌面端未开启浏览器访问</title>
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;touch-action:manipulation}
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

/** 握手过渡页：200 + Set-Cookie（由调用方带上）+ meta refresh 跳回干净根路径。 */
export function handshakePageHtml(extraHead = '') {
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8">
${extraHead}
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="refresh" content="0; url=/">
<title>DSH Pocket · 正在进入 | opening…</title>
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;touch-action:manipulation}
p{font-size:13px;color:#6b7280;margin:0}
</style></head><body><p>正在进入… | opening…</p></body></html>`;
}

/** 握手反复失败时的提示页（issue #91）：说清原因并给出可操作的规避办法。 */
export function handshakeBlockedPageHtml() {
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DSH Pocket · 无法完成登录握手</title>
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;touch-action:manipulation}
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
② 如需公网访问，请先在设置页配置<strong>自己的 Cloudflare 固定域名与 Tunnel Token</strong>，再开启对应的 HTTPS 入口；插件不提供现成公网地址。</p>
<p style="margin-top:14px"><a href="/?${HANDSHAKE_RETRY_PARAM}=1" style="display:inline-block;padding:8px 14px;background:#4f6ef7;color:#fff;border-radius:8px;text-decoration:none;font-size:13px">重试一次 | Retry</a></p>
<p style="color:#9ca3af;font-size:12px">Browser did not keep the session cookie, so the login handshake could not complete (issue #91). Safari over plain <code>http://</code> + IP is the known case — try Chrome, or use the public HTTPS entry.</p>
</div></body></html>`;
}
