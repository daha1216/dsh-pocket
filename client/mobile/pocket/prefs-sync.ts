import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import {
  POCKET_RPC_CHANNEL,
  POCKET_ENDPOINTS,
  MOBILE_RIGHTBAR_ATTRIBUTE,
  MOBILE_RIGHTBAR_EVENT,
  MOBILE_PINCH_ZOOM_ATTRIBUTE,
  MOBILE_PINCH_ZOOM_EVENT,
  MOBILE_FONT_ATTRIBUTE,
  MOBILE_FONT_EVENT,
  MOBILE_FONT_SIZE_VAR,
  MOBILE_FONT_MIN,
  MOBILE_FONT_MAX,
} from '../../api.js'

/** Body attribute controlling whether file path taps open the preview sheet (`on`) or toast (`off`). */
export const MOBILE_FILE_PREVIEW_ATTRIBUTE = 'data-dsh-pocket-file-preview'

/** Live Settings broadcast event for `mobileFilePreviewEnabled`. */
export const MOBILE_FILE_PREVIEW_EVENT = 'dsh-pocket:mobile-file-preview'

interface PocketStatusPrefs {
  mobileRightbarEnabled?: boolean
  mobilePinchZoomEnabled?: boolean
  mobileFontSize?: number
  mobileFilePreviewEnabled?: boolean
}

/**
 * Synchronizes all 4 mobile preferences (`mobileRightbarEnabled`, `mobilePinchZoomEnabled`,
 * `mobileFontSize`, `mobileFilePreviewEnabled`) onto `document.body` via ONE single startup
 * `pocket.status` RPC call, plus listens to the 4 `CustomEvent`s for instant live updates.
 */
export function installPocketPrefsSync(ctx: ClientContext): void {
  ctx.effect(() => {
    let active = true
    let rightbarTouched = false
    let pinchTouched = false
    let fontTouched = false
    let previewTouched = false

    const applyRightbar = (enabled: boolean): void => {
      document.body?.setAttribute(MOBILE_RIGHTBAR_ATTRIBUTE, enabled ? 'on' : 'off')
    }

    const applyPinchZoom = (enabled: boolean): void => {
      document.body?.setAttribute(MOBILE_PINCH_ZOOM_ATTRIBUTE, enabled ? 'on' : 'off')
    }

    const applyFontSize = (size: number): void => {
      const body = document.body
      if (!body) return
      const px = Number(size)
      if (Number.isInteger(px) && px >= MOBILE_FONT_MIN && px <= MOBILE_FONT_MAX) {
        body.style.setProperty(MOBILE_FONT_SIZE_VAR, `${px}px`)
        body.setAttribute(MOBILE_FONT_ATTRIBUTE, String(px))
      } else {
        body.style.removeProperty(MOBILE_FONT_SIZE_VAR)
        body.removeAttribute(MOBILE_FONT_ATTRIBUTE)
      }
    }

    const applyFilePreview = (enabled: boolean): void => {
      document.body?.setAttribute(MOBILE_FILE_PREVIEW_ATTRIBUTE, enabled ? 'on' : 'off')
    }

    const onRightbarEvent = (event: Event): void => {
      rightbarTouched = true
      applyRightbar((event as CustomEvent<{ enabled?: boolean }>).detail?.enabled === true)
    }

    const onPinchZoomEvent = (event: Event): void => {
      pinchTouched = true
      applyPinchZoom((event as CustomEvent<{ enabled?: boolean }>).detail?.enabled === true)
    }

    const onFontEvent = (event: Event): void => {
      fontTouched = true
      applyFontSize(Number((event as CustomEvent<{ size?: number }>).detail?.size) || 0)
    }

    const onFilePreviewEvent = (event: Event): void => {
      previewTouched = true
      const detail = (event as CustomEvent<{ enabled?: boolean }>).detail
      applyFilePreview(typeof detail?.enabled === 'boolean' ? detail.enabled : detail?.enabled !== false)
    }

    const applyDefaultsIfUntouched = (): void => {
      if (!rightbarTouched) applyRightbar(true)
      if (!pinchTouched) applyPinchZoom(false)
      if (!fontTouched) applyFontSize(0)
      if (!previewTouched) applyFilePreview(true)
    }

    const loadAllPrefs = async (): Promise<void> => {
      try {
        const rpc = (ctx.connection as unknown as {
          rpc?: { call?: (channel: string, endpoint: string, payload: unknown) => Promise<unknown> }
        })?.rpc
        if (typeof rpc?.call !== 'function') {
          if (active) applyDefaultsIfUntouched()
          return
        }
        const result = (await rpc.call(POCKET_RPC_CHANNEL, POCKET_ENDPOINTS.status, {})) as {
          ok?: boolean
          value?: PocketStatusPrefs
        }
        if (!active) return
        if (result?.ok !== true || !result.value) {
          applyDefaultsIfUntouched()
          return
        }
        const prefs = result.value
        if (!rightbarTouched) applyRightbar(prefs.mobileRightbarEnabled !== false)
        if (!pinchTouched) applyPinchZoom(prefs.mobilePinchZoomEnabled === true)
        if (!fontTouched) applyFontSize(Number(prefs.mobileFontSize) || 0)
        if (!previewTouched) applyFilePreview(prefs.mobileFilePreviewEnabled !== false)
      } catch {
        if (active) applyDefaultsIfUntouched()
      }
    }

    window.addEventListener(MOBILE_RIGHTBAR_EVENT, onRightbarEvent)
    window.addEventListener(MOBILE_PINCH_ZOOM_EVENT, onPinchZoomEvent)
    window.addEventListener(MOBILE_FONT_EVENT, onFontEvent)
    window.addEventListener(MOBILE_FILE_PREVIEW_EVENT, onFilePreviewEvent)
    void loadAllPrefs()

    return () => {
      active = false
      window.removeEventListener(MOBILE_RIGHTBAR_EVENT, onRightbarEvent)
      window.removeEventListener(MOBILE_PINCH_ZOOM_EVENT, onPinchZoomEvent)
      window.removeEventListener(MOBILE_FONT_EVENT, onFontEvent)
      window.removeEventListener(MOBILE_FILE_PREVIEW_EVENT, onFilePreviewEvent)
      document.body?.removeAttribute(MOBILE_RIGHTBAR_ATTRIBUTE)
      document.body?.removeAttribute(MOBILE_PINCH_ZOOM_ATTRIBUTE)
      document.body?.style.removeProperty(MOBILE_FONT_SIZE_VAR)
      document.body?.removeAttribute(MOBILE_FONT_ATTRIBUTE)
      document.body?.removeAttribute(MOBILE_FILE_PREVIEW_ATTRIBUTE)
    }
  }, 'dsh-pocket: mobile preferences sync')
}
