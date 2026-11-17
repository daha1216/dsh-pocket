// 设置页共用纯工具与 DOM 偏好同步辅助函数
import QRCode from 'qrcode';
import * as pocketApi from '../api.js';
import { zh as POCKET_ZH } from '../pocket-locales.js';

export type TranslateFn = (key: string) => string;

const MOBILE_RIGHTBAR_ATTRIBUTE = pocketApi.MOBILE_RIGHTBAR_ATTRIBUTE ?? 'data-dsh-pocket-mobile-rightbar';
const MOBILE_RIGHTBAR_EVENT = pocketApi.MOBILE_RIGHTBAR_EVENT ?? 'dsh-pocket:mobile-rightbar';
const MOBILE_PINCH_ZOOM_ATTRIBUTE = pocketApi.MOBILE_PINCH_ZOOM_ATTRIBUTE ?? 'data-dsh-pocket-pinch-zoom';
const MOBILE_PINCH_ZOOM_EVENT = pocketApi.MOBILE_PINCH_ZOOM_EVENT ?? 'dsh-pocket:mobile-pinch-zoom';
const MOBILE_FONT_ATTRIBUTE = pocketApi.MOBILE_FONT_ATTRIBUTE ?? 'data-dsh-pocket-mobile-font';
const MOBILE_FONT_EVENT = pocketApi.MOBILE_FONT_EVENT ?? 'dsh-pocket:mobile-font-size';
const MOBILE_FONT_SIZE_VAR = pocketApi.MOBILE_FONT_SIZE_VAR ?? '--dsh-pocket-mobile-font-size';
const MOBILE_FONT_MIN = pocketApi.MOBILE_FONT_MIN ?? 12;
const MOBILE_FONT_MAX = pocketApi.MOBILE_FONT_MAX ?? 22;
const MOBILE_FILE_PREVIEW_ATTRIBUTE =
  (pocketApi as Record<string, unknown>).MOBILE_FILE_PREVIEW_ATTRIBUTE as string | undefined
  ?? 'data-dsh-pocket-file-preview';
const MOBILE_FILE_PREVIEW_EVENT =
  (pocketApi as Record<string, unknown>).MOBILE_FILE_PREVIEW_EVENT as string | undefined
  ?? 'dsh-pocket:mobile-file-preview';

export function fmt(t: TranslateFn, key: string, vars?: Record<string, string | number | null | undefined>): string {
  let s = String(t(key));
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.split(`{${k}}`).join(String(v ?? ''));
    }
  }
  return s;
}

export async function fetchWithTimeout(url: string, opts: RequestInit, ms: number): Promise<Response> {
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

export function sleepUnlessAborted(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal?.aborted) {
      resolve();
      return;
    }
    const done = () => {
      clearTimeout(timer);
      signal?.removeEventListener?.('abort', done);
      resolve();
    };
    const timer = setTimeout(done, ms);
    signal?.addEventListener?.('abort', done, { once: true });
  });
}

function dispatchSafe(name: string, detail: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') return;
  try {
    if (typeof CustomEvent === 'function') {
      window.dispatchEvent(new CustomEvent(name, { detail }));
    }
  } catch {
    // 忽略受限测试上下文
  }
}

export function applyMobileRightbarSetting(enabled: boolean | undefined): void {
  const on = enabled !== false;
  if (typeof document !== 'undefined') {
    document.body?.setAttribute(MOBILE_RIGHTBAR_ATTRIBUTE, on ? 'on' : 'off');
  }
  dispatchSafe(MOBILE_RIGHTBAR_EVENT, { enabled: on });
}

export function applyMobilePinchZoomSetting(enabled: boolean | undefined): void {
  const on = enabled === true;
  if (typeof document !== 'undefined') {
    document.body?.setAttribute(MOBILE_PINCH_ZOOM_ATTRIBUTE, on ? 'on' : 'off');
  }
  dispatchSafe(MOBILE_PINCH_ZOOM_EVENT, { enabled: on });
}

export function applyMobileFilePreviewSetting(enabled: boolean | undefined): void {
  const on = enabled !== false;
  if (typeof document !== 'undefined') {
    document.body?.setAttribute(MOBILE_FILE_PREVIEW_ATTRIBUTE, on ? 'on' : 'off');
  }
  dispatchSafe(MOBILE_FILE_PREVIEW_EVENT, { enabled: on });
}

export const MOBILE_FONT_OPTIONS: readonly number[] = [
  0,
  ...Array.from({ length: MOBILE_FONT_MAX - MOBILE_FONT_MIN + 1 }, (_, i) => MOBILE_FONT_MIN + i),
];

export function applyMobileFontSize(size: number | undefined): void {
  const px = Number(size);
  const valid = Number.isInteger(px) && px >= MOBILE_FONT_MIN && px <= MOBILE_FONT_MAX;
  if (typeof document !== 'undefined') {
    if (valid) {
      document.body?.style.setProperty(MOBILE_FONT_SIZE_VAR, `${px}px`);
      document.body?.setAttribute(MOBILE_FONT_ATTRIBUTE, String(px));
    } else {
      document.body?.style.removeProperty(MOBILE_FONT_SIZE_VAR);
      document.body?.removeAttribute(MOBILE_FONT_ATTRIBUTE);
    }
  }
  dispatchSafe(MOBILE_FONT_EVENT, { size: valid ? px : 0 });
}

export async function copyText(text: string | null | undefined): Promise<boolean> {
  const val = String(text ?? '');
  if (!val) return false;
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(val);
      return true;
    }
  } catch {
    // 非安全上下文（如局域网 HTTP）降级至 textarea + execCommand
  }
  try {
    if (typeof document === 'undefined') return false;
    const ta = document.createElement('textarea');
    ta.value = val;
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok === true;
  } catch {
    return false;
  }
}

export function fmtBytes(bytes: number | undefined | null): string {
  const n = Number(bytes) || 0;
  return n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`;
}

export const elapsedSince = (startedAt?: number | null, now: number = Date.now()): number =>
  startedAt ? Math.max(0, Math.floor((now - startedAt) / 1000)) : 0;

export const makeErrText = (t: TranslateFn) => (msg: unknown): string => {
  const s = String(msg ?? '');
  const i = s.indexOf(' | ');
  if (i < 0) return s;
  return (t('ok') === POCKET_ZH.ok ? s.slice(0, i) : s.slice(i + 3)).trim();
};

export function formatRelativeTime(ts: number | string | null | undefined, t: TranslateFn): string {
  if (!ts) return '';
  const ms = typeof ts === 'number' ? ts : Date.parse(String(ts));
  if (!Number.isFinite(ms)) return '';
  const diffSec = Math.max(0, Math.floor((Date.now() - ms) / 1000));
  if (diffSec < 60) return t('timeJustNow');
  const mins = Math.floor(diffSec / 60);
  if (mins < 60) return fmt(t, 'timeMinutesAgo', { n: mins });
  const hours = Math.floor(mins / 60);
  if (hours < 24) return fmt(t, 'timeHoursAgo', { n: hours });
  const days = Math.floor(hours / 24);
  return fmt(t, 'timeDaysAgo', { n: days });
}

export async function encodeQrSvgDataUrl(text: string): Promise<string | null> {
  if (!text) return null;
  try {
    const svg = await QRCode.toString(text, {
      type: 'svg',
      margin: 1,
      errorCorrectionLevel: 'M',
    });
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  } catch {
    return null;
  }
}

export function inferDeviceKind(
  summary: string | null | undefined,
  explicitKind?: string | null,
): 'smartphone' | 'tablet' | 'laptop' {
  if (explicitKind === 'tablet') return 'tablet';
  if (explicitKind === 'desktop' || explicitKind === 'laptop') return 'laptop';
  if (explicitKind === 'phone' || explicitKind === 'smartphone') return 'smartphone';
  const s = String(summary ?? '').toLowerCase();
  if (/ipad|tablet|harmonyos.*pad|galaxy tab/.test(s)) return 'tablet';
  if (/mac|windows|linux|desktop|x11|cros/.test(s) && !/android|iphone|mobile/.test(s)) return 'laptop';
  return 'smartphone';
}
