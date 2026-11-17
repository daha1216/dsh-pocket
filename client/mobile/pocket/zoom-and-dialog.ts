import { MOBILE_PINCH_ZOOM_ATTRIBUTE } from '../../api.js'

/** Breakpoint-reactive installer registered by `mobileApply`. */
export type ArmOnNarrow = (label: string, install: () => () => void) => void

/**
 * Installs:
 * 1. Conditional iOS Safari pinch-zoom lock (blocks zoom-in from 1x when disabled,
 *    while ALWAYS allowing pinch-out recovery whenever `visualViewport.scale > 1`).
 * 2. Accessible modal Tab focus containment (`[role="dialog"][aria-modal="true"]`)
 *    for plugin-owned modal surfaces (`data-mobile-nav`).
 */
export function installZoomAndDialog(armOnNarrow: ArmOnNarrow): void {
  armOnNarrow('dsh-pocket: mobile zoom lock', () => {
    let startScale = 0
    const onStart = (): void => {
      startScale = window.visualViewport?.scale ?? 0
    }
    const onChange = (event: Event): void => {
      // When user explicitly enables pinch zoom in Settings, allow both pinch-in and pinch-out.
      if (document.body?.getAttribute(MOBILE_PINCH_ZOOM_ATTRIBUTE) === 'on') return

      const gestureScale = (event as Event & { scale?: number }).scale
      const shrinking =
        typeof gestureScale === 'number' && Number.isFinite(gestureScale) && gestureScale < 1
      // Escape hatch (#45): if iOS auto-zoomed an input (> 1x), ALWAYS allow pinching out to 1x!
      if (startScale > 1.0001 && shrinking) return
      event.preventDefault()
    }
    const onEnd = (): void => {
      startScale = 0
    }
    document.addEventListener('gesturestart', onStart, { passive: false })
    document.addEventListener('gesturechange', onChange, { passive: false })
    document.addEventListener('gestureend', onEnd, { passive: false })
    return () => {
      document.removeEventListener('gesturestart', onStart)
      document.removeEventListener('gesturechange', onChange)
      document.removeEventListener('gestureend', onEnd)
    }
  })

  armOnNarrow('dsh-pocket: dialog focus containment', () => {
    const DIALOG = '[role="dialog"][aria-modal="true"]'
    const FOCUSABLE =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const triggerStack: HTMLElement[] = []
    const isOurs = (el: Element): boolean =>
      el.hasAttribute('data-mobile-nav') || el.parentElement?.hasAttribute('data-mobile-nav') === true
    const focusables = (node: Element): HTMLElement[] =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0,
      )
    const isShown = (el: Element): boolean =>
      !el.closest('[aria-hidden="true"], [inert]') && el.getClientRects().length > 0
    const topDialog = (): HTMLElement | null => {
      const list = Array.from(document.querySelectorAll<HTMLElement>(DIALOG)).filter(
        (el) => isOurs(el) && isShown(el),
      )
      return list.length > 0 ? list[list.length - 1] : null
    }
    let active: HTMLElement | null = null

    const onKeyDown = (event: KeyboardEvent): void => {
      if (active === null || !active.isConnected) return
      if (event.key !== 'Tab') return
      const list = focusables(active)
      if (list.length === 0) {
        event.preventDefault()
        if (document.activeElement !== active) active.focus({ preventScroll: true })
        return
      }
      const first = list[0]
      const last = list[list.length - 1]
      const current = document.activeElement as HTMLElement | null
      if (event.shiftKey && (current === first || !active.contains(current))) {
        event.preventDefault()
        last.focus({ preventScroll: true })
      } else if (!event.shiftKey && (current === last || !active.contains(current))) {
        event.preventDefault()
        first.focus({ preventScroll: true })
      }
    }
    document.addEventListener('keydown', onKeyDown, true)

    const sync = (): void => {
      const dialog = topDialog()
      if (dialog === active) return
      if (active !== null && dialog !== null) {
        active = dialog
        if (!dialog.hasAttribute('tabindex')) dialog.setAttribute('tabindex', '-1')
        const list = focusables(dialog)
        ;(list[0] ?? dialog).focus({ preventScroll: true })
        return
      }
      if (active !== null) {
        const back = triggerStack.pop()
        active = null
        if (back !== undefined && back.isConnected) back.focus({ preventScroll: true })
        return
      }
      active = dialog
      if (dialog === null) return
      const opener = document.activeElement as HTMLElement | null
      if (opener !== null && opener !== document.body && !dialog.contains(opener)) {
        triggerStack.push(opener)
      }
      if (!dialog.hasAttribute('tabindex')) dialog.setAttribute('tabindex', '-1')
      const list = focusables(dialog)
      ;(list[0] ?? dialog).focus({ preventScroll: true })
    }

    let raf = 0
    const schedule = (): void => {
      if (raf === 0) {
        raf = requestAnimationFrame(() => {
          raf = 0
          sync()
        })
      }
    }
    sync()
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type !== 'childList') continue
        for (const n of m.addedNodes) {
          if (n.nodeType === 1) {
            schedule()
            return
          }
        }
        for (const n of m.removedNodes) {
          if (n.nodeType === 1) {
            schedule()
            return
          }
        }
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      observer.disconnect()
      if (raf !== 0) cancelAnimationFrame(raf)
      active?.removeAttribute('tabindex')
      active = null
      triggerStack.length = 0
    }
  })
}
