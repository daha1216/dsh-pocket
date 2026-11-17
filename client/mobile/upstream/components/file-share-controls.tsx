import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactElement } from 'react'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import { IconDownload, IconShare } from '../core/icon-compat.ts'
import {
  FileShareError,
  deliverFile,
  fileNameOf,
  canShareFiles,
  mimeTypeOf,
  readWholeFile,
} from './file-share-core.ts'
import type { ReadBytesResult, ShareOutcome } from './file-share-core.ts'
import { FILE_SHARE_NS } from './file-share-locale.ts'
import type { FileShareKey } from './file-share-locale.ts'

/**
 * Host 0.2.0 slot contracts this feature contributes to (declared by
 * ui-sidebar-files and ui-sidebar-documentpreview). Both are session
 * list slots whose owner passes `{ absolutePath }` (files: the tree root;
 * document: the previewed file's Host path, rendered only once it is known).
 */
declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface SlotMap {
    'sidebar.right.tab.files.actions': { kind: 'list'; scope: 'session'; owner: { absolutePath: string } }
    'sidebar.right.tab.document.actions': { kind: 'list'; scope: 'session'; owner: { absolutePath: string } }
  }
}

/**
 * Session-bound ranged read over the host's `remote.workspaceFiles.readBytes`.
 */
export type ReadFileRange = (
  sessionId: string,
  path: string,
  range: { offset: number; length: number },
  signal: AbortSignal,
) => Promise<ReadBytesResult>

/** Business face both share controls receive through their slot `inject`. */
export interface FileShareInject {
  readFileRange: ReadFileRange
}

/** Props both slot entries consume (a supertype of the composed slot props). */
export interface FileShareSlotProps extends FileShareInject, PropsLocale<typeof FILE_SHARE_NS> {
  /** Owner share: the tree root (files) or the previewed file (document). */
  absolutePath: string
  /** Framework-resolved session id. */
  sessionId: string
}

type Translate = (key: FileShareKey, params?: Record<string, unknown>) => string

/** Inline share glyph for DOM-appended tree rows (`currentColor`, `stroke-width="1.65"`). */
const SHARE_SVG = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">'
  + '<path d="M8 2v7.5M5.2 4.8L8 2l2.8 2.8" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/>'
  + '<path d="M3 9.5v3A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-3" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/></svg>'

const DOWNLOAD_SVG = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">'
  + '<path d="M8 2v7.5M5.2 6.7L8 9.5l2.8-2.8" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/>'
  + '<path d="M3 10.5v2A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-2" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/></svg>'

/**
 * Self-owned floating status pill mounted on `<body>` so no transformed sheet
 * ancestor can mis-place the fixed box, and no host primitives import is needed.
 */
function showFallbackNotice(text: string): void {
  document.querySelector('[data-mobile-nav="file-share-toast"]')?.remove()
  const node = document.createElement('div')
  node.dataset.mobileNav = 'file-share-toast'
  node.setAttribute('role', 'status')
  node.setAttribute('aria-live', 'polite')
  node.style.cssText = 'position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom, 0px) + var(--dshp-kb, 0px) + 64px);transform:translateX(-50%);z-index:2147483550;max-width:calc(100vw - 32px);padding:8px 16px;border-radius:999px;corner-shape:round;border:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.24));background:var(--dsw-alias-bg-layer-2, #1f2430);color:var(--dsw-alias-label-primary, #f3f4f6);font:500 13px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:var(--dsw-elevation-panel, 0 4px 14px rgba(0,0,0,.22));pointer-events:none;text-align:center'
  node.textContent = text
  document.body.appendChild(node)
  setTimeout(() => node.remove(), 3000)
}

/**
 * The button label: 「分享」 only when the platform really has Web Share, else
 * 「下载」.
 */
function shareLabel(t: Translate, name: string): string {
  return canShareFiles(platformDeps()) ? t('shareFile', { name }) : t('downloadFile', { name })
}

/** Copy for one outcome; null when the outcome speaks for itself (sheet shown / dismissed). */
function outcomeText(outcome: ShareOutcome, t: Translate): string | null {
  if (outcome.kind !== 'downloaded') return null
  if (outcome.reason === 'too-large') return t('downloadedTooLarge')
  if (outcome.reason === 'share-failed') return t('downloadedShareFailed')
  return t('downloadedUnsupported')
}

/** Copy for one failure. */
function failureText(error: unknown, t: Translate): string {
  if (error instanceof FileShareError) {
    if (error.code === 'too-large') return t('errorTooLarge')
    if (error.code === 'not-found') return t('errorNotFound')
  }
  return t('errorGeneric', { message: error instanceof Error ? error.message : String(error) })
}

/** Anchor download, revoked once the browser has had time to start it. */
function downloadFile(file: File): void {
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = file.name
  link.rel = 'noopener'
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 30_000)
}

/** The live platform seams for deliverFile. */
function platformDeps(): Parameters<typeof deliverFile<File>>[1] {
  const nav = navigator as Navigator & Partial<Pick<Navigator, 'canShare' | 'share'>>
  const bridge = (window as Window & { DSHA?: {
    canShareFile?: (file: File) => boolean
    shareFile?: (file: File) => Promise<void>
  } }).DSHA
  return {
    canShare: typeof bridge?.canShareFile === 'function'
      ? data => data.files.length === 1 && bridge.canShareFile!(data.files[0]!)
      : typeof nav.canShare === 'function' ? data => nav.canShare!(data) : undefined,
    share: typeof bridge?.shareFile === 'function'
      ? data => bridge.shareFile!(data.files[0]!)
      : typeof nav.share === 'function' ? data => nav.share!(data) : undefined,
    download: downloadFile,
  }
}

/** Shared share-flow state: single flight, busy path, failure notice. */
function useFileShare(sessionId: string, readFileRange: ReadFileRange, t: Translate): {
  busyPath: string | null
  share: (path: string) => void
} {
  const [busyPath, setBusyPath] = useState<string | null>(null)
  const inFlight = useRef<AbortController | null>(null)
  const latest = useRef({ sessionId, readFileRange, t })
  latest.current = { sessionId, readFileRange, t }

  useEffect(() => () => inFlight.current?.abort(), [])

  const announce = useCallback((text: string): void => {
    showFallbackNotice(text)
  }, [])

  const share = useCallback((path: string): void => {
    if (inFlight.current !== null) return
    const controller = new AbortController()
    inFlight.current = controller
    setBusyPath(path)
    const { sessionId: id, readFileRange: read, t: tr } = latest.current
    const run = async (): Promise<void> => {
      const { parts } = await readWholeFile((p, range, signal) => read(id, p, range, signal), path, controller.signal)
      const name = fileNameOf(path)
      const file = new File(parts, name, { type: mimeTypeOf(name) })
      const outcome = await deliverFile(file, platformDeps())
      const text = outcomeText(outcome, tr)
      if (text !== null) announce(text)
    }
    run().catch((error: unknown) => {
      if (controller.signal.aborted) return
      console.warn('[dsh-pocket] file share failed:', error)
      announce(failureText(error, tr))
    }).finally(() => {
      if (inFlight.current === controller) inFlight.current = null
      if (!controller.signal.aborted) setBusyPath(null)
    })
  }, [announce])

  return { busyPath, share }
}

/**
 * Preview header share button, contributed to `sidebar.right.tab.document.actions`.
 */
export function FilePreviewShareButton({ absolutePath, sessionId, readFileRange, t }: FileShareSlotProps): ReactElement {
  const { busyPath, share } = useFileShare(sessionId, readFileRange, t)
  const busy = busyPath !== null
  return (
    <button
      type="button"
      data-mobile-nav="file-share-preview"
      aria-label={busy ? t('sharing') : shareLabel(t, fileNameOf(absolutePath))}
      aria-busy={busy}
      disabled={busy}
      onClick={() => share(absolutePath)}
    >
      {canShareFiles(platformDeps()) ? <IconShare size={16} /> : <IconDownload size={16} />}
    </button>
  )
}

/** Marker on each injected row button (idempotence + CSS + probe key). */
const ROW_BUTTON = 'file-share-row'

/**
 * Row-end share buttons for the Files tree.
 */
export function FilesRowShare({ sessionId, readFileRange, t }: FileShareSlotProps): ReactElement {
  const { busyPath, share } = useFileShare(sessionId, readFileRange, t)
  const anchorRef = useRef<HTMLSpanElement | null>(null)
  const latest = useRef({ busyPath, share, t })
  latest.current = { busyPath, share, t }
  const decorateRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const root = anchorRef.current?.closest<HTMLElement>('[data-files-state="tree"]') ?? null
    const body = root?.querySelector<HTMLElement>('[data-files-body]') ?? null
    if (body === null) return undefined

    const onClick = (event: MouseEvent): void => {
      event.preventDefault()
      event.stopPropagation()
      const button = event.currentTarget as HTMLButtonElement
      const path = button.parentElement?.getAttribute('data-files-path')
      if (path) latest.current.share(path)
    }

    const decorate = (): void => {
      const { busyPath: busy, t: tr } = latest.current
      for (const stale of body.querySelectorAll<HTMLButtonElement>(`[data-mobile-nav="${ROW_BUTTON}"]`)) {
        if (stale.parentElement?.getAttribute('data-files-entry') !== 'file') stale.remove()
      }
      for (const row of body.querySelectorAll<HTMLElement>('li[data-files-entry="file"]')) {
        let button = row.querySelector<HTMLButtonElement>(`:scope > [data-mobile-nav="${ROW_BUTTON}"]`)
        if (button === null) {
          button = document.createElement('button')
          button.type = 'button'
          button.dataset.mobileNav = ROW_BUTTON
          button.innerHTML = canShareFiles(platformDeps()) ? SHARE_SVG : DOWNLOAD_SVG
          button.addEventListener('click', onClick)
          row.appendChild(button)
        }
        const path = row.getAttribute('data-files-path') ?? ''
        const active = busy !== null && busy === path
        const label = active ? tr('sharing') : shareLabel(tr, fileNameOf(path))
        const blocked = busy !== null
        if (button.getAttribute('aria-label') !== label) button.setAttribute('aria-label', label)
        if (button.disabled !== blocked) button.disabled = blocked
        if (active) button.setAttribute('aria-busy', 'true')
        else button.removeAttribute('aria-busy')
      }
    }
    decorateRef.current = decorate

    let raf = 0
    const schedule = (): void => {
      if (raf !== 0) return
      raf = requestAnimationFrame(() => {
        raf = 0
        decorate()
      })
    }
    const observer = new MutationObserver(schedule)
    observer.observe(body, { childList: true, subtree: true })
    decorate()
    return () => {
      observer.disconnect()
      if (raf !== 0) cancelAnimationFrame(raf)
      decorateRef.current = null
      for (const button of body.querySelectorAll<HTMLButtonElement>(`[data-mobile-nav="${ROW_BUTTON}"]`)) {
        button.removeEventListener('click', onClick)
        button.remove()
      }
    }
  }, [])

  useEffect(() => {
    decorateRef.current?.()
  }, [busyPath, t])

  return <span hidden data-mobile-nav="file-share-anchor" ref={anchorRef} />
}
