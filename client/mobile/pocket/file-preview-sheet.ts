import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { POCKET_RPC_CHANNEL, POCKET_ENDPOINTS } from '../../api.js'
import {
  PANEL_DISMISS_EVENT,
  PANEL_MARKER,
  dismissTopPanel,
} from '../upstream/platform/panel-stack.ts'
import {
  MOBILE_FILE_PREVIEW_ATTRIBUTE,
  MOBILE_FILE_PREVIEW_EVENT,
} from './prefs-sync.ts'

/** Bilingual "Add workspace" labels rendered by the host UI (hidden on mobile). */
const WS_LABELS = ['添加工作区', '添加工作区…', 'Add workspace', 'Add workspace…']

/** Explicit ARIA roles exempted from file-link interception (tabs, session rows, menus). */
const ROLE_EXEMPT = '[role="tab"], [role="treeitem"], [role="menuitem"], [role="menu"]'

/** Clipboard ceiling (2 MiB) so mobile browsers never stall copying massive logs. */
const MAX_COPY_BYTES = 2 * 1024 * 1024

/** Preview sheet inline truncation limit (128 KiB). */
export const PREVIEW_TRUNCATE_BYTES = 128 * 1024

/** Manual selection fallback ceiling (64 KiB) when clipboard write is blocked on plain HTTP. */
const FALLBACK_PREVIEW_CHARS = 64 * 1024

export interface ReadFileResponse {
  ok: boolean
  value?: { content: string; path: string; size: number }
  error?: { message: string }
}

export interface FileGuardOptions {
  /** Override `body[data-dsh-pocket-file-preview]` (`undefined` reads live body attribute, default `true`). */
  previewEnabled?: boolean
  /** Force inline `[复制]` button injection even when preview sheet is enabled (`default: false`). */
  injectCopyButtons?: boolean
}

const COPY_ICON_SVG =
  '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
  '<rect x="5.5" y="5.5" width="8" height="8" rx="1.75" stroke="currentColor" stroke-width="1.6"/>' +
  '<path d="M10.5 5.5V3.75A1.75 1.75 0 0 0 8.75 2h-5A1.75 1.75 0 0 0 2 3.75v5A1.75 1.75 0 0 0 3.75 10.5H5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
  '</svg>'

const CLOSE_ICON_SVG =
  '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">' +
  '<path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>' +
  '</svg>'

const FILE_ICON_SVG =
  '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
  '<path d="M4 2h5l3.5 3.5V13a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 13V3.5A1.5 1.5 0 0 1 4 2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' +
  '<path d="M9 2v3.5h3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>'

const WARN_ICON_SVG =
  '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
  '<circle cx="10" cy="10" r="7.5" stroke="currentColor" stroke-width="1.6"/>' +
  '<path d="M10 6.5v4.2M10 13.5h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
  '</svg>'

/** Semantic path heuristic without relying on host hashed CSS classes. */
export function looksLikeFilePath(text: string | null): boolean {
  const s = (text ?? '').trim()
  if (s.length < 3 || s.length > 320) return false
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(s) && !/^file:\/\//i.test(s)) return false
  if (/^(\/|~\/|\.\.?\/|[A-Za-z]:\\)/.test(s)) return true
  if (/\/[\w.-]+\.\w{1,12}$/.test(s)) return true
  return false
}

function basenameOf(filePath: string): string {
  const clean = filePath.replace(/[\\/]+$/, '')
  const parts = clean.split(/[\\/]/)
  return parts[parts.length - 1] || filePath
}

function formatByteSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Slice text cleanly without splitting a trailing UTF-16 surrogate pair. */
function truncateTextCleanly(content: string, maxChars: number): { text: string; truncated: boolean } {
  if (content.length <= maxChars) return { text: content, truncated: false }
  let end = maxChars
  const code = content.charCodeAt(end - 1)
  if (code >= 0xd800 && code <= 0xdbff) end -= 1
  return { text: content.slice(0, end), truncated: true }
}

function buildLineNumbers(text: string): string {
  let lines = 1
  for (let i = 0; i < text.length; i += 1) {
    if (text.charCodeAt(i) === 10) lines += 1
  }
  const nums = new Array<string>(lines)
  for (let i = 0; i < lines; i += 1) nums[i] = String(i + 1)
  return nums.join('\n')
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fallback to textarea execCommand on plain HTTP LAN */
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.top = '-9999px'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.focus()
    ta.select()
    const okCopy = document.execCommand('copy')
    ta.remove()
    return okCopy
  } catch {
    return false
  }
}

/** Builds the RPC-backed `readFile` callback bound to the active DSH session & workspace. */
export function createPocketFileReader(
  ctx: ClientContext,
): (filePath: string) => Promise<ReadFileResponse> {
  const currentSessionId = (): string | undefined => {
    try {
      const list = (ctx as unknown as {
        sessions?: { list?: { getSnapshot?: () => unknown } }
      }).sessions?.list?.getSnapshot?.() as
        | {
            current?: unknown
            byId?: Record<string, { id?: unknown; retainedBy?: { mainView?: unknown } }>
          }
        | undefined
      if (list === null || typeof list !== 'object') return undefined
      if (typeof list.current === 'string') return list.current
      for (const key in list.byId) {
        const summary = list.byId[key]
        if (summary === undefined) continue
        const mainView = summary.retainedBy?.mainView
        if (typeof mainView === 'number' && mainView > 0 && typeof summary.id === 'string') {
          return summary.id
        }
      }
    } catch {
      /* host session snapshot shape unavailable */
    }
    return undefined
  }

  const getWorkspaceCwd = (): string => {
    try {
      const ws =
        (ctx as unknown as { get?: (k: string) => unknown }).get?.('workspaces') ??
        (ctx as unknown as { workspaces?: unknown }).workspaces
      const list = (ws as { list?: unknown })?.list
      const arr: unknown[] | null = Array.isArray(list)
        ? list
        : list && typeof list === 'object' && 'value' in (list as object)
          ? (list as { value: unknown[] }).value
          : null
      if (Array.isArray(arr)) {
        for (const w of arr) {
          const c =
            (w as { cwd?: string; root?: string })?.cwd ??
            (w as { cwd?: string; root?: string })?.root
          if (typeof c === 'string' && c) return c
        }
      }
    } catch {
      /* fallback to host process.cwd() */
    }
    return ''
  }

  return (filePath: string) => {
    const sessionId = currentSessionId()
    return ctx.connection.rpc.call(POCKET_RPC_CHANNEL, POCKET_ENDPOINTS.fileRead, {
      path: filePath,
      cwd: getWorkspaceCwd(),
      ...(sessionId === undefined ? {} : { sessionId }),
    }) as Promise<ReadFileResponse>
  }
}

/**
 * Intercepts workspace file links inside `[data-phase]` on mobile:
 * - When `data-dsh-pocket-file-preview !== 'off'` (default `on`), opens the
 *   Mobile File Preview Bottom Sheet (`[data-mobile-nav="file-preview-sheet"]`,
 *   `data-mobile-nav-panel="file-preview"` integrated with `panel-stack.ts` + `popstate`)
 *   and keeps chat prose clean without extra `[复制]` buttons.
 * - When `data-dsh-pocket-file-preview === 'off'`, shows a toast and provides
 *   inline `[复制]` buttons as an optional legacy mode.
 */
export function startFileGuard(
  readFile: (path: string) => Promise<ReadFileResponse>,
  t: (key: string) => string,
  options?: FileGuardOptions,
): () => void {
  let disposed = false

  const isEnglish = (): boolean => {
    try {
      const lang =
        document.documentElement?.lang ||
        (typeof navigator !== 'undefined' ? navigator.language : '') ||
        ''
      return /^en\b/i.test(lang)
    } catch {
      return false
    }
  }

  const tr = (key: string, zhFallback: string, enFallback: string): string => {
    try {
      const val = t(key)
      if (typeof val === 'string' && val.length > 0 && val !== key) return val
    } catch {
      /* dictionary unavailable */
    }
    return isEnglish() ? enFallback : zhFallback
  }

  const fmt = (
    key: string,
    vars: Record<string, string | number>,
    zhFallback: string,
    enFallback: string,
  ): string => {
    let s = tr(key, zhFallback, enFallback)
    for (const [k, v] of Object.entries(vars)) {
      s = s.split(`{${k}}`).join(String(v))
    }
    return s
  }

  const isPreviewEnabled = (): boolean => {
    if (typeof options?.previewEnabled === 'boolean') return options.previewEnabled
    return document.body?.getAttribute(MOBILE_FILE_PREVIEW_ATTRIBUTE) !== 'off'
  }

  const shouldInjectCopyButtons = (): boolean => {
    if (typeof options?.injectCopyButtons === 'boolean') return options.injectCopyButtons
    return !isPreviewEnabled()
  }

  // ---- Non-blocking floating toast ----
  let toastEl: HTMLElement | null = null
  let toastTimer: number | null = null
  const showToast = (text: string): void => {
    if (toastEl === null || !toastEl.isConnected) {
      toastEl = document.createElement('div')
      toastEl.setAttribute('data-mobile-nav', 'file-guard-toast')
      toastEl.setAttribute('role', 'status')
      toastEl.setAttribute('aria-live', 'polite')
      toastEl.style.cssText =
        'position:fixed;left:50%;bottom:calc(64px + env(safe-area-inset-bottom, 0px) + var(--dshp-kb, 0px));transform:translateX(-50%);max-width:84vw;z-index:2147483550;padding:9px 16px;border-radius:999px;corner-shape:round;border:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.24));background:var(--dsw-alias-bg-layer-2, #1f2430);color:var(--dsw-alias-label-primary, #f3f4f6);font-size:13px;font-weight:500;line-height:1.4;text-align:center;box-shadow:var(--dsw-elevation-panel, 0 4px 16px rgba(0,0,0,.28));pointer-events:none;opacity:0;transition:opacity .18s ease'
      document.body.appendChild(toastEl)
    }
    toastEl.textContent = text
    requestAnimationFrame(() => {
      if (toastEl !== null) toastEl.style.opacity = '1'
    })
    if (toastTimer !== null) window.clearTimeout(toastTimer)
    toastTimer = window.setTimeout(() => {
      if (toastEl !== null) toastEl.style.opacity = '0'
    }, 2600)
  }

  // ---- Manual long-press selection fallback when HTTP LAN blocks clipboard ----
  let fallbackEl: HTMLElement | null = null
  const showTextFallback = (text: string): void => {
    ;(document.activeElement as HTMLElement | null)?.blur()
    fallbackEl?.remove()
    const truncated = text.length > FALLBACK_PREVIEW_CHARS
    const preview = truncated
      ? `${text.slice(0, FALLBACK_PREVIEW_CHARS)}\n${tr('fileTruncated', '…已截断', '… truncated')}`
      : text
    const panel = document.createElement('div')
    panel.setAttribute('data-mobile-nav', 'file-guard-fallback')
    panel.style.cssText =
      'position:fixed;left:max(8px, env(safe-area-inset-left, 0px));right:max(8px, env(safe-area-inset-right, 0px));bottom:calc(16px + env(safe-area-inset-bottom, 0px) + var(--dshp-kb, 0px));max-height:45vh;overflow:auto;z-index:2147483560;padding:12px 14px;border-radius:var(--dsw-radius-lg, 16px);border:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.24));background:var(--dsw-alias-bg-layer-1, #171b24);color:var(--dsw-alias-label-primary, #f3f4f6);box-shadow:var(--dsw-elevation-prominent, 0 8px 28px rgba(0,0,0,.36));-webkit-overflow-scrolling:touch'
    const head = document.createElement('div')
    head.style.cssText =
      'display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--dsw-alias-label-secondary, #9ca3af);margin-bottom:8px'
    const title = document.createElement('span')
    title.textContent = tr(
      'fileFallbackTitle',
      '复制失败，长按下方文本选择',
      'Copy failed — long-press the text below to select it',
    )
    const close = document.createElement('button')
    close.type = 'button'
    close.textContent = tr('fileFallbackClose', '关闭', 'Close')
    close.style.cssText =
      'border:0.5px solid var(--dsw-alias-border-l2, rgba(127,127,127,.3));background:transparent;color:var(--dsw-alias-label-primary, #f3f4f6);border-radius:var(--dsw-radius-sm, 8px);padding:4px 10px;font-size:12px;font-weight:500;cursor:pointer'
    close.addEventListener('click', () => {
      panel.remove()
      if (fallbackEl === panel) fallbackEl = null
    })
    const pre = document.createElement('pre')
    pre.textContent = preview
    pre.style.cssText =
      'margin:0;white-space:pre-wrap;word-break:break-all;user-select:text;-webkit-user-select:text;font-size:12px;line-height:1.5;font-family:var(--dsh-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)'
    head.append(title, close)
    panel.append(head, pre)
    document.body.appendChild(panel)
    fallbackEl = panel
  }

  // ---- Mobile File Preview Bottom Sheet ----
  let previewBackdrop: HTMLDivElement | null = null
  let previewSheet: HTMLDivElement | null = null
  let previewRequestSeq = 0
  let previewOpener: HTMLElement | null = null
  let historyArmed = false
  let selfBackPending = false
  let selfBackTimer = 0
  let onSheetPanelDismiss: ((event: Event) => void) | null = null
  let onSheetKeyDown: ((event: KeyboardEvent) => void) | null = null
  let onSheetPopState: (() => void) | null = null

  const clearSelfBack = (): void => {
    selfBackPending = false
    if (selfBackTimer !== 0) {
      window.clearTimeout(selfBackTimer)
      selfBackTimer = 0
    }
  }

  const closePreviewSheet = (fromPopState = false): void => {
    previewRequestSeq += 1
    if (onSheetPanelDismiss !== null) {
      document.removeEventListener(PANEL_DISMISS_EVENT, onSheetPanelDismiss)
      onSheetPanelDismiss = null
    }
    if (onSheetKeyDown !== null) {
      document.removeEventListener('keydown', onSheetKeyDown)
      onSheetKeyDown = null
    }
    if (previewSheet !== null) {
      previewSheet.removeAttribute(PANEL_MARKER)
      previewSheet.remove()
      previewSheet = null
    }
    if (previewBackdrop !== null) {
      previewBackdrop.remove()
      previewBackdrop = null
    }
    if (historyArmed) {
      historyArmed = false
      if (!fromPopState && typeof history !== 'undefined' && typeof history.back === 'function') {
        selfBackPending = true
        if (selfBackTimer !== 0) window.clearTimeout(selfBackTimer)
        selfBackTimer = window.setTimeout(() => {
          clearSelfBack()
          if (onSheetPopState !== null) {
            window.removeEventListener('popstate', onSheetPopState)
            onSheetPopState = null
          }
        }, 800)
        try {
          history.back()
        } catch {
          clearSelfBack()
        }
      } else if (onSheetPopState !== null) {
        window.removeEventListener('popstate', onSheetPopState)
        onSheetPopState = null
      }
    } else if (onSheetPopState !== null && !selfBackPending) {
      window.removeEventListener('popstate', onSheetPopState)
      onSheetPopState = null
    }
    const opener = previewOpener
    previewOpener = null
    if (opener !== null && opener.isConnected) {
      try {
        opener.focus({ preventScroll: true })
      } catch {
        /* ignore focus restore failures */
      }
    }
  }

  const openPreviewSheet = (rawFilePath: string, triggerEl: HTMLElement): void => {
    const filePath = rawFilePath.replace(/^file:\/\//i, '')
    // Retract soft keyboard before raising the bottom sheet
    const active = document.activeElement as HTMLElement | null
    if (active !== null && active !== triggerEl && typeof active.blur === 'function') {
      active.blur()
    }

    // Close existing preview sheet in place without popping history if switching files
    if (previewSheet !== null) {
      if (onSheetPanelDismiss !== null) {
        document.removeEventListener(PANEL_DISMISS_EVENT, onSheetPanelDismiss)
        onSheetPanelDismiss = null
      }
      if (onSheetKeyDown !== null) {
        document.removeEventListener('keydown', onSheetKeyDown)
        onSheetKeyDown = null
      }
      previewSheet.removeAttribute(PANEL_MARKER)
      previewSheet.remove()
      previewSheet = null
      previewBackdrop?.remove()
      previewBackdrop = null
    } else {
      previewOpener = triggerEl
      if (typeof history !== 'undefined' && typeof history.pushState === 'function') {
        try {
          history.pushState({ dshPocketFilePreview: true }, '')
          historyArmed = true
        } catch {
          historyArmed = false
        }
      }
    }

    const seq = ++previewRequestSeq
    let fullContent = ''
    let fullSize = 0
    let loadedOk = false

    const backdrop = document.createElement('div')
    backdrop.setAttribute('data-mobile-nav', 'file-preview-backdrop')
    backdrop.addEventListener('click', () => {
      closePreviewSheet(false)
    })

    const sheet = document.createElement('div')
    sheet.setAttribute('data-mobile-nav', 'file-preview-sheet')
    sheet.setAttribute(PANEL_MARKER, 'file-preview')
    sheet.setAttribute('role', 'dialog')
    sheet.setAttribute('aria-label', basenameOf(filePath))
    sheet.setAttribute('tabindex', '-1')

    // Top grabber pill (also supports downward drag-to-dismiss on header)
    const grabberWrap = document.createElement('div')
    grabberWrap.style.cssText =
      'display:flex;justify-content:center;padding:10px 0 2px;flex:none;touch-action:none'
    const grabber = document.createElement('div')
    grabber.style.cssText =
      'width:36px;height:4px;border-radius:999px;corner-shape:round;background:var(--dsw-alias-border-l2, rgba(127,127,127,.35))'
    grabberWrap.appendChild(grabber)

    // Header: file icon + basename + size badge + path subtitle + [复制全文] + [✕] (44x44)
    const header = document.createElement('div')
    header.setAttribute('data-mobile-nav', 'file-preview-header')
    header.style.cssText =
      'display:flex;align-items:center;gap:8px;padding:6px 10px 10px 16px;border-bottom:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.2));flex:none'

    const titleWrap = document.createElement('div')
    titleWrap.style.cssText = 'flex:1;min-width:0;display:flex;flex-direction:column;gap:2px'

    const titleRow = document.createElement('div')
    titleRow.style.cssText = 'display:flex;align-items:center;gap:6px;min-width:0'

    const fileIcon = document.createElement('span')
    fileIcon.style.cssText =
      'display:inline-flex;flex:none;color:var(--dsw-alias-label-secondary, #9ca3af)'
    fileIcon.innerHTML = FILE_ICON_SVG

    const basenameEl = document.createElement('span')
    basenameEl.setAttribute('data-mobile-nav', 'file-preview-title')
    basenameEl.textContent = basenameOf(filePath)
    basenameEl.style.cssText =
      'font-size:15px;font-weight:500;line-height:1.35;color:var(--dsw-alias-label-primary, #f3f4f6);overflow:hidden;text-overflow:ellipsis;white-space:nowrap'

    const sizeBadge = document.createElement('span')
    sizeBadge.setAttribute('data-mobile-nav', 'file-preview-size')
    sizeBadge.hidden = true
    sizeBadge.style.cssText =
      'flex:none;padding:2px 8px;border-radius:999px;corner-shape:round;font-size:11px;font-weight:500;line-height:1.3;background:var(--dsw-alias-bg-layer-2, rgba(127,127,127,.12));color:var(--dsw-alias-label-secondary, #9ca3af)'

    titleRow.append(fileIcon, basenameEl, sizeBadge)

    const subtitleEl = document.createElement('div')
    subtitleEl.setAttribute('data-mobile-nav', 'file-preview-path')
    subtitleEl.textContent = filePath
    subtitleEl.style.cssText =
      'font-size:12px;line-height:1.35;color:var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary, #9ca3af));overflow:hidden;text-overflow:ellipsis;white-space:nowrap'

    titleWrap.append(titleRow, subtitleEl)

    const copyBtnLabelText = (): string =>
      tr('filePreviewCopyAll', '复制全文', 'Copy all')

    const copyBtn = document.createElement('button')
    copyBtn.type = 'button'
    copyBtn.setAttribute('data-mobile-nav', 'file-preview-copy')
    copyBtn.disabled = true
    copyBtn.style.cssText =
      'flex:none;display:inline-flex;align-items:center;justify-content:center;gap:5px;height:34px;min-width:44px;padding:0 12px;border-radius:var(--dsw-radius-md, 12px);border:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.24));background:var(--dsw-alias-bg-layer-2, rgba(127,127,127,.1));color:var(--dsw-alias-label-primary, #f3f4f6);font:500 12.5px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;cursor:pointer;-webkit-tap-highlight-color:transparent'
    const renderCopyBtnIdle = (): void => {
      copyBtn.innerHTML = COPY_ICON_SVG
      const span = document.createElement('span')
      span.textContent = copyBtnLabelText()
      copyBtn.appendChild(span)
    }
    renderCopyBtnIdle()

    copyBtn.addEventListener('click', async () => {
      if (!loadedOk) return
      if (fullSize > MAX_COPY_BYTES) {
        showToast(
          fmt(
            'fileTooLarge',
            { size: (fullSize / (1024 * 1024)).toFixed(1) },
            '文件过大（{size}MB），已跳过复制',
            'File too large ({size}MB), copy skipped',
          ),
        )
        return
      }
      copyBtn.disabled = true
      const copied = await copyText(fullContent)
      if (disposed || previewSheet !== sheet) return
      copyBtn.disabled = false
      if (copied) {
        const kb = Math.max(1, Math.round(fullSize / 1024))
        copyBtn.textContent = tr('filePreviewCopiedShort', '✓ 已复制', '✓ Copied')
        showToast(
          fmt(
            'fileCopyDone',
            { kb },
            '已复制文件内容（{kb} KB）',
            'File content copied ({kb} KB)',
          ),
        )
        window.setTimeout(() => {
          if (previewSheet === sheet && copyBtn.isConnected) renderCopyBtnIdle()
        }, 1600)
      } else {
        showToast(
          tr(
            'fileCopyFailedFallback',
            '复制失败，下方可长按选择',
            'Copy failed — long-press below to select instead',
          ),
        )
        showTextFallback(fullContent)
      }
    })

    const closeBtn = document.createElement('button')
    closeBtn.type = 'button'
    closeBtn.setAttribute('data-mobile-nav', 'file-preview-close')
    closeBtn.setAttribute('aria-label', tr('fileFallbackClose', '关闭', 'Close'))
    closeBtn.innerHTML = CLOSE_ICON_SVG
    closeBtn.style.cssText =
      'flex:none;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;min-width:44px;min-height:44px;padding:0;border:0;border-radius:50%;corner-shape:round;background:transparent;color:var(--dsw-alias-label-secondary, #9ca3af);cursor:pointer;-webkit-tap-highlight-color:transparent'
    closeBtn.addEventListener('click', () => {
      closePreviewSheet(false)
    })

    header.append(titleWrap, copyBtn, closeBtn)

    // Swipe-down gesture on grabber/header to dismiss naturally on touch
    let dragStartY: number | null = null
    const onHeaderPointerDown = (e: PointerEvent): void => {
      if ((e.target as Element | null)?.closest('button') !== null) return
      dragStartY = e.clientY
    }
    const onHeaderPointerUp = (e: PointerEvent): void => {
      if (dragStartY !== null && e.clientY - dragStartY > 56) {
        dragStartY = null
        closePreviewSheet(false)
        return
      }
      dragStartY = null
    }
    grabberWrap.addEventListener('pointerdown', onHeaderPointerDown)
    grabberWrap.addEventListener('pointerup', onHeaderPointerUp)
    header.addEventListener('pointerdown', onHeaderPointerDown)
    header.addEventListener('pointerup', onHeaderPointerUp)

    // Body container: loading skeleton -> monospace line-numbered viewer or error state
    const body = document.createElement('div')
    body.setAttribute('data-mobile-nav', 'file-preview-body')
    body.style.cssText =
      'flex:1;min-height:180px;overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;position:relative'

    const loadingBox = document.createElement('div')
    loadingBox.setAttribute('data-mobile-nav', 'file-preview-loading')
    loadingBox.style.cssText = 'display:flex;flex-direction:column;gap:10px;padding:18px 16px'
    for (const widthPct of ['62%', '88%', '76%', '54%', '82%', '45%']) {
      const bar = document.createElement('div')
      bar.setAttribute('data-mobile-nav', 'file-preview-skeleton-line')
      bar.style.width = widthPct
      loadingBox.appendChild(bar)
    }
    body.appendChild(loadingBox)

    sheet.append(grabberWrap, header, body)
    document.body.append(backdrop, sheet)
    previewBackdrop = backdrop
    previewSheet = sheet

    // Wire `panel-stack.ts` dismissal (Escape routed via drawer-close -> dismissTopPanel)
    onSheetPanelDismiss = (event: Event): void => {
      if (event.target !== sheet) return
      closePreviewSheet(false)
    }
    document.addEventListener(PANEL_DISMISS_EVENT, onSheetPanelDismiss)

    // Bubble-phase keyboard handler:
    // - Tab focus containment inside sheet;
    // - Escape fallback when `drawer-close.ts` is inactive (e.g. `?dsh-layout=mobile` on desktop).
    onSheetKeyDown = (event: KeyboardEvent): void => {
      if (previewSheet !== sheet || !sheet.isConnected) return
      if (event.key === 'Escape' && !event.defaultPrevented) {
        if (dismissTopPanel()) event.preventDefault()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = Array.from(
        sheet.querySelectorAll<HTMLElement>('button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const current = document.activeElement as HTMLElement | null
      if (event.shiftKey && (current === first || !sheet.contains(current))) {
        event.preventDefault()
        last.focus({ preventScroll: true })
      } else if (!event.shiftKey && (current === last || !sheet.contains(current))) {
        event.preventDefault()
        first.focus({ preventScroll: true })
      }
    }
    document.addEventListener('keydown', onSheetKeyDown)

    if (onSheetPopState === null) {
      onSheetPopState = (): void => {
        if (selfBackPending) {
          clearSelfBack()
          if (previewSheet === null && onSheetPopState !== null) {
            window.removeEventListener('popstate', onSheetPopState)
            onSheetPopState = null
          }
          return
        }
        if (previewSheet !== null) {
          closePreviewSheet(true)
        }
      }
      window.addEventListener('popstate', onSheetPopState)
    }

    try {
      closeBtn.focus({ preventScroll: true })
    } catch {
      /* ignore in headless DOM stubs */
    }

    const renderErrorState = (message: string): void => {
      body.textContent = ''
      const errWrap = document.createElement('div')
      errWrap.setAttribute('data-mobile-nav', 'file-preview-error')
      errWrap.style.cssText =
        'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:32px 20px;text-align:center'
      const iconWrap = document.createElement('div')
      iconWrap.style.cssText =
        'color:var(--dsw-alias-state-error-primary, #ef4444);display:inline-flex'
      iconWrap.innerHTML = WARN_ICON_SVG
      const msgEl = document.createElement('div')
      msgEl.textContent = message
      msgEl.style.cssText =
        'font-size:13.5px;line-height:1.5;color:var(--dsw-alias-label-secondary, #cbd5e1);max-width:340px;word-break:break-word'
      errWrap.append(iconWrap, msgEl)
      body.appendChild(errWrap)
    }

    void Promise.resolve()
      .then(() => readFile(filePath))
      .then(
        (res) => {
          if (disposed || seq !== previewRequestSeq || previewSheet !== sheet) return
          if (!res?.ok || !res.value) {
            renderErrorState(
              res?.error?.message ||
                tr('filePreviewError', '无法读取该文件', 'Unable to read this file'),
            )
            return
          }

          const content = res.value.content ?? ''
          const resolvedPath = res.value.path || filePath
          const size = typeof res.value.size === 'number' ? res.value.size : content.length

          subtitleEl.textContent = resolvedPath
          basenameEl.textContent = basenameOf(resolvedPath)
          const formattedSize = formatByteSize(size)
          if (formattedSize) {
            sizeBadge.textContent = formattedSize
            sizeBadge.hidden = false
          }

          // Guard against binary files containing NUL bytes
          if (content.includes('\u0000')) {
            renderErrorState(
              tr(
                'filePreviewBinary',
                '二进制文件暂不支持文本预览',
                'Binary files cannot be previewed as text',
              ),
            )
            return
          }

          fullContent = content
          fullSize = size
          loadedOk = true
          copyBtn.disabled = false

          body.textContent = ''

          const { text: slicedText, truncated } = truncateTextCleanly(
            content,
            PREVIEW_TRUNCATE_BYTES,
          )
          const byteTruncated = truncated || size > PREVIEW_TRUNCATE_BYTES

          if (byteTruncated) {
            const notice = document.createElement('div')
            notice.setAttribute('data-mobile-nav', 'file-preview-truncated')
            notice.textContent = tr(
              'filePreviewTruncatedNotice',
              `文件较大（${formattedSize || formatByteSize(content.length)}），仅展示前 128 KB；点击右上角「复制全文」可复制完整内容`,
              `Large file (${formattedSize || formatByteSize(content.length)}) — showing first 128 KB; tap "Copy all" for full content`,
            )
            notice.style.cssText =
              'padding:8px 16px;font-size:12px;line-height:1.45;background:var(--dsw-alias-bg-layer-2, rgba(127,127,127,.1));color:var(--dsw-alias-label-secondary, #9ca3af);border-bottom:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.18))'
            body.appendChild(notice)
          }

          if (content.length === 0) {
            const empty = document.createElement('div')
            empty.setAttribute('data-mobile-nav', 'file-preview-empty')
            empty.textContent = tr('filePreviewEmpty', '（空文件）', '(Empty file)')
            empty.style.cssText =
              'padding:28px 16px;text-align:center;font-size:13px;color:var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary, #9ca3af))'
            body.appendChild(empty)
            return
          }

          const codeGrid = document.createElement('div')
          codeGrid.style.cssText =
            'display:flex;align-items:stretch;min-width:max-content;font-family:var(--dsh-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);font-size:12.5px;line-height:1.6;tab-size:2'

          const gutter = document.createElement('pre')
          gutter.setAttribute('data-mobile-nav', 'file-preview-gutter')
          gutter.setAttribute('aria-hidden', 'true')
          gutter.textContent = buildLineNumbers(slicedText)
          gutter.style.cssText =
            'margin:0;padding:12px 10px 16px 14px;text-align:right;user-select:none;-webkit-user-select:none;white-space:pre;font:inherit;line-height:inherit;color:var(--dsw-alias-label-tertiary, rgba(127,127,127,.6));border-right:0.5px solid var(--dsw-alias-border-l4, rgba(127,127,127,.15));flex:none'

          const codePre = document.createElement('pre')
          codePre.setAttribute('data-mobile-nav', 'file-preview-code')
          codePre.textContent = slicedText
          codePre.style.cssText =
            'margin:0;padding:12px 16px 16px 12px;flex:1;white-space:pre;user-select:text;-webkit-user-select:text;font:inherit;line-height:inherit;color:var(--dsw-alias-label-primary, #f3f4f6)'

          codeGrid.append(gutter, codePre)
          body.appendChild(codeGrid)
        },
        (err: unknown) => {
          if (disposed || seq !== previewRequestSeq || previewSheet !== sheet) return
          renderErrorState(
            err instanceof Error
              ? err.message
              : tr('filePreviewError', '无法读取该文件', 'Unable to read this file'),
          )
        },
      )
  }

  // ---- Capture-phase click interceptor inside `[data-phase]` ----
  const onClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement | null
    if (target === null) return
    const el = target.closest('button, a') as HTMLElement | null
    if (el === null) return
    if (el.hasAttribute('data-mobile-nav') || el.closest('[data-mobile-nav]') !== null) return
    if (el.closest('[data-phase]') === null) return
    if (el.closest(ROLE_EXEMPT) !== null) return
    const rawText = (el.textContent ?? '').trim()
    if (!looksLikeFilePath(rawText)) return

    event.preventDefault()
    event.stopImmediatePropagation()

    if (isPreviewEnabled()) {
      openPreviewSheet(rawText, el)
    } else {
      showToast(
        tr(
          'fileGuardMsg',
          '手机上无法直接打开电脑上的文件',
          'Cannot open a file stored on your computer directly from the phone',
        ),
      )
    }
  }
  document.addEventListener('click', onClick, true)

  // ---- Optional inline `[复制]` button injection (only when preview mode is off) ----
  let copySeq = 0
  const clearInjectedCopyButtons = (): void => {
    document.querySelectorAll('[data-mobile-nav="copy-file"]').forEach((b) => b.remove())
    document.querySelectorAll('[data-mobile-nav-copy="1"]').forEach((el) => {
      el.removeAttribute('data-mobile-nav-copy')
      el.removeAttribute('data-mobile-nav-copy-id')
    })
  }

  const injectCopyButtons = (root: ParentNode = document): void => {
    if (!shouldInjectCopyButtons()) return
    const links = root.querySelectorAll('button, a')
    const own = root instanceof Element && root.matches('button, a') ? [root, ...links] : links
    own.forEach((el) => {
      if (el.getAttribute('data-mobile-nav-copy') === '1') return
      if (el.hasAttribute('data-mobile-nav')) return
      if (el.closest('[data-phase]') === null) return
      if (el.closest(ROLE_EXEMPT) !== null) return
      const txt = (el.textContent ?? '').trim()
      if (!looksLikeFilePath(txt)) return
      el.setAttribute('data-mobile-nav-copy', '1')
      const copyId = String(++copySeq)
      el.setAttribute('data-mobile-nav-copy-id', copyId)
      const parentEl = el.parentElement
      if (parentEl !== null) {
        for (const stale of Array.from(
          parentEl.querySelectorAll(':scope > [data-mobile-nav="copy-file"]'),
        )) {
          if (
            stale.previousElementSibling?.getAttribute('data-mobile-nav-copy-id') !==
            stale.getAttribute('data-mobile-nav-copy-for')
          ) {
            stale.remove()
          }
        }
      }
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.setAttribute('data-mobile-nav', 'copy-file')
      btn.setAttribute('data-mobile-nav-copy-for', copyId)
      btn.textContent = tr('fileCopy', '复制', 'Copy')
      btn.addEventListener('click', async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const filePath = (el.textContent ?? '').trim().replace(/^file:\/\//i, '')
        btn.disabled = true
        btn.textContent = '…'
        try {
          const res = await readFile(filePath)
          if (disposed) return
          if (!res?.ok) {
            showToast(res?.error?.message ?? tr('fileCopyFailed', '复制失败', 'Copy failed'))
            return
          }
          const content = res.value?.content ?? ''
          const size = res.value?.size ?? content.length
          if (size > MAX_COPY_BYTES) {
            showToast(
              fmt(
                'fileTooLarge',
                { size: (size / (1024 * 1024)).toFixed(1) },
                '文件过大（{size}MB），已跳过复制',
                'File too large ({size}MB), copy skipped',
              ),
            )
            return
          }
          const copied = await copyText(content)
          if (disposed) return
          if (copied) {
            const kb = Math.max(1, Math.round(size / 1024))
            showToast(
              fmt(
                'fileCopyDone',
                { kb },
                '已复制文件内容（{kb} KB）',
                'File content copied ({kb} KB)',
              ),
            )
          } else {
            showToast(
              tr(
                'fileCopyFailedFallback',
                '复制失败，下方可长按选择',
                'Copy failed — long-press below to select instead',
              ),
            )
            showTextFallback(content)
          }
        } catch (err) {
          if (!disposed) {
            showToast(
              err instanceof Error
                ? err.message
                : tr('fileCopyFailed', '复制失败', 'Copy failed'),
            )
          }
        } finally {
          if (btn.isConnected) {
            btn.disabled = false
            btn.textContent = tr('fileCopy', '复制', 'Copy')
          }
        }
      })
      el.parentElement?.insertBefore(btn, el.nextSibling)
    })
  }

  // ---- Hide "Add workspace" menu items on mobile ----
  const hiddenDisplayBackup = new Map<Element, string>()
  const wsSel = '[role="menuitem"],[role="option"],li,button,a'
  const hideWsOne = (el: Element): void => {
    const txt = ((el.getAttribute('aria-label') || '') || el.textContent || '').trim()
    if (WS_LABELS.includes(txt)) {
      const h = el as HTMLElement
      if (!hiddenDisplayBackup.has(el)) hiddenDisplayBackup.set(el, h.style.display)
      h.style.display = 'none'
      el.setAttribute('data-mobile-nav-hide', 'add-workspace')
    }
  }
  const hideWsEntries = (root: ParentNode): void => {
    if (root instanceof Element && root.matches(wsSel)) hideWsOne(root)
    root.querySelectorAll(wsSel).forEach(hideWsOne)
  }

  // React to live Settings toggle of `dsh-pocket:mobile-file-preview`
  const onPreviewModeChange = (): void => {
    if (shouldInjectCopyButtons()) {
      closePreviewSheet(false)
      injectCopyButtons(document)
    } else {
      clearInjectedCopyButtons()
    }
  }
  window.addEventListener(MOBILE_FILE_PREVIEW_EVENT, onPreviewModeChange)

  const pending = new Set<Element>()
  let raf = 0
  const flush = (): void => {
    raf = 0
    const injectCopies = shouldInjectCopyButtons()
    for (const el of pending) {
      if (!el.isConnected) continue
      if (injectCopies) injectCopyButtons(el)
      hideWsEntries(el)
    }
    pending.clear()
    for (const el of hiddenDisplayBackup.keys()) {
      if (!el.isConnected) hiddenDisplayBackup.delete(el)
    }
  }

  if (shouldInjectCopyButtons()) injectCopyButtons(document)
  hideWsEntries(document)

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'characterData') {
        const parent = m.target.parentElement
        if (parent !== null && parent.childElementCount > 0) pending.add(parent)
        continue
      }
      m.addedNodes.forEach((n) => {
        if (n.nodeType === 1) pending.add(n as Element)
        else if (n.nodeType === 3 && n.parentElement !== null) pending.add(n.parentElement)
      })
    }
    if (pending.size > 0 && raf === 0) raf = requestAnimationFrame(flush)
  })
  observer.observe(document.body, { childList: true, subtree: true, characterData: true })

  return () => {
    disposed = true
    closePreviewSheet(false)
    clearSelfBack()
    if (onSheetPopState !== null) {
      window.removeEventListener('popstate', onSheetPopState)
      onSheetPopState = null
    }
    window.removeEventListener(MOBILE_FILE_PREVIEW_EVENT, onPreviewModeChange)
    document.removeEventListener('click', onClick, true)
    observer.disconnect()
    if (raf !== 0) cancelAnimationFrame(raf)
    pending.clear()
    if (toastTimer !== null) window.clearTimeout(toastTimer)
    toastEl?.remove()
    toastEl = null
    fallbackEl?.remove()
    fallbackEl = null
    clearInjectedCopyButtons()
    document.querySelectorAll('[data-mobile-nav-hide="add-workspace"]').forEach((el) => {
      const h = el as HTMLElement
      const original = hiddenDisplayBackup.get(el)
      if (original !== undefined) h.style.display = original
      else h.style.removeProperty('display')
      hiddenDisplayBackup.delete(el)
      el.removeAttribute('data-mobile-nav-hide')
    })
    hiddenDisplayBackup.clear()
  }
}
