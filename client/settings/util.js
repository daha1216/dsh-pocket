// 设置页共用的纯工具：文案插值、字节与秒数格式化、剪贴板、带超时的 fetch，
// 以及三个把手机端偏好「落地到 body」的函数（mobile-apply 只读这些标记与事件）。
import {
  MOBILE_RIGHTBAR_ATTRIBUTE, MOBILE_RIGHTBAR_EVENT,
  MOBILE_PINCH_ZOOM_ATTRIBUTE, MOBILE_PINCH_ZOOM_EVENT,
  MOBILE_FONT_ATTRIBUTE, MOBILE_FONT_EVENT, MOBILE_FONT_SIZE_VAR,
  MOBILE_FONT_MIN, MOBILE_FONT_MAX,
} from '../api.js';
import { zh as POCKET_ZH } from '../pocket-locales.js';

// 词典在 pocket-locales.js；这里只做「取 key → 替换 {占位符} → 字符串」。
// 不依赖 DSH t() 的插值能力，避免行为不一致。
export function fmt(t, key, vars) {
  let s = t(key);
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = String(s).split(`{${k}}`).join(String(v));
    }
  }
  return s;
}

/** 给 fetch 加超时：隧道半开/弱网时浏览器可能永远不 resolve，界面会卡死在「进行中」。
 * 优先用 AbortSignal.timeout（Safari 16+/Chrome 103+），不可用时退回手动 controller。 */
export async function fetchWithTimeout(url, opts, ms) {
  if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
    return fetch(url, { ...opts, signal: AbortSignal.timeout(ms) });
  }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** 可被 AbortSignal 提前唤醒的 sleep：组件卸载/取消后不必再多等一个轮询间隔。 */
export function sleepUnlessAborted(ms, signal) {
  return new Promise((resolve) => {
    if (signal?.aborted) { resolve(); return; }
    const done = () => { clearTimeout(timer); signal?.removeEventListener?.('abort', done); resolve(); };
    const timer = setTimeout(done, ms);
    signal?.addEventListener?.('abort', done, { once: true });
  });
}

function applyMobileRightbarSetting(enabled) {
  const on = enabled !== false;
  document.body?.setAttribute(MOBILE_RIGHTBAR_ATTRIBUTE, on ? 'on' : 'off');
  window.dispatchEvent(new CustomEvent(MOBILE_RIGHTBAR_EVENT, { detail: { enabled: on } }));
}

function applyMobilePinchZoomSetting(enabled) {
  const on = enabled === true;
  document.body?.setAttribute(MOBILE_PINCH_ZOOM_ATTRIBUTE, on ? 'on' : 'off');
  window.dispatchEvent(new CustomEvent(MOBILE_PINCH_ZOOM_EVENT, { detail: { enabled: on } }));
}

// 手机端独立字号：0 = 跟随桌面。落 body 属性 + CSS 变量，由 POCKET_EXTRA_CSS
// 只在手机布局下覆盖宿主的内容字号轴（桌面布局选择器不命中）。
export const MOBILE_FONT_OPTIONS = [0, ...Array.from({ length: MOBILE_FONT_MAX - MOBILE_FONT_MIN + 1 }, (_, i) => MOBILE_FONT_MIN + i)];

export function applyMobileFontSize(size) {
  const px = Number(size);
  const valid = Number.isInteger(px) && px >= MOBILE_FONT_MIN && px <= MOBILE_FONT_MAX;
  if (valid) {
    document.body?.style.setProperty(MOBILE_FONT_SIZE_VAR, `${px}px`);
    document.body?.setAttribute(MOBILE_FONT_ATTRIBUTE, String(px));
  } else {
    document.body?.style.removeProperty(MOBILE_FONT_SIZE_VAR);
    document.body?.removeAttribute(MOBILE_FONT_ATTRIBUTE);
  }
  window.dispatchEvent(new CustomEvent(MOBILE_FONT_EVENT, { detail: { size: valid ? px : 0 } }));
}

export { applyMobileRightbarSetting, applyMobilePinchZoomSetting };

// 剪贴板：优先 Clipboard API（需安全上下文），LAN http 场景回退 execCommand
export async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* 回退 */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok === true;
  } catch {
    return false;
  }
}

// 缓存/探针用量的人读格式：设置页只需要「12.3 MB」这种量级，不追求精确单位。
export function fmtBytes(bytes) {
  const n = Number(bytes) || 0;
  return n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`;
}

// 进行中操作的「已等待 N 秒」：now 由设置页的每秒 tick 提供，纯函数便于视图直接调用。
export const elapsedSince = (startedAt, now) => (startedAt ? Math.max(0, Math.floor((now - startedAt) / 1000)) : 0);

// 后端错误消息统一为「中文 | English」混排；按当前界面语言只显示对应一半。
export const makeErrText = (t) => (msg) => {
  const s = String(msg ?? '');
  const i = s.indexOf(' | ');
  if (i < 0) return s;
  return (t('ok') === POCKET_ZH.ok ? s.slice(0, i) : s.slice(i + 3)).trim();
};
