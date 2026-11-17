// dsh-pocket v4.0 Web Client Entry (`client/client.js`):
// - Mounts `SettingsPage` in `settings.section` (with dual-generation stylesheet support:
//   `meta.stylesheets` on DSH 0.2.2-rc.2+ and `<style id="dshp-settings-css">` fallback on < 0.2.2-rc.2).
// - Enforces a zero-overhead desktop gate: pure desktop fine-pointer sessions (`>= 1024px` and
//   not `pointer: coarse`) never download or evaluate `client.mobile.js` unless resized/switched,
//   while phones, tablets/foldables (`pointer: coarse`), and `?dsh-layout=mobile` lazy-load
//   `./client.mobile.js` via `require.async` (with `/dsh-pocket/client.mobile.js` fallback on DSH < 0.2.2).

import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { POCKET_RPC_CHANNEL, redactStatus } from './api.js'
import { persistLayoutFromUrl, resolveLayout } from './mobile/layout-mode.mjs'
import { NS as POCKET_NS, en as POCKET_EN, zh as POCKET_ZH } from './pocket-locales.js'
import { PocketSettingsTab } from './settings/SettingsPage.tsx'
import { POCKET_SETTINGS_CSS } from './settings/styles.ts'
import type { RpcCallFn } from './settings/use-settings.ts'
import type { TranslateFn } from './settings/util.ts'

interface MobileChunkExports {
  mobileApply?: (ctx: ClientContext) => void
}

type HostRequireFn = ((id: string) => unknown) & {
  async?: (id: string) => Promise<MobileChunkExports>
}

interface ChunkLoaderDescriptor {
  id?: string
  chunk?: string
  factory?: (req: HostRequireFn) => MobileChunkExports
}

type PocketChunkWindow = Window & {
  __dshpChunkLoader?: {
    load: (descriptor: ChunkLoaderDescriptor) => void
  }
}

declare const __dshpHostRequire: HostRequireFn | undefined

export const name = 'dsh-pocket'

// Must remain a superset of `client/mobile/upstream/index.tsx` `inject` services so Cordis
// provides all required host services before lazy mobile chunk activation.
export const inject = [
  'slots',
  'connection',
  'layout',
  'locale',
  'sessionLogDownload',
  'sessions',
]

let fallbackLoadPromise: Promise<MobileChunkExports | null> | null = null

function readViewportWidth(): number {
  if (typeof window !== 'undefined' && typeof window.innerWidth === 'number' && window.innerWidth > 0) {
    return window.innerWidth
  }
  if (typeof innerWidth === 'number' && innerWidth > 0) {
    return innerWidth
  }
  return 1440
}

function readLegacyMobileLayout(): string {
  try {
    if (typeof localStorage === 'undefined') return ''
    const v = localStorage.getItem('dsh-mobile-nav-layout')
    return v === 'desktop' || v === 'mobile' ? v : ''
  } catch {
    return ''
  }
}

function loadMobileChunkFallback(hostReq: HostRequireFn): Promise<MobileChunkExports | null> {
  if (fallbackLoadPromise !== null) return fallbackLoadPromise
  fallbackLoadPromise = (async (): Promise<MobileChunkExports | null> => {
    try {
      const res = await fetch(`${POCKET_RPC_CHANNEL}/client.mobile.js`, {
        method: 'GET',
        credentials: 'same-origin',
        cache: 'no-cache',
      })
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }
      const scriptText = await res.text()
      const win = window as PocketChunkWindow
      let captured: ((req: HostRequireFn) => MobileChunkExports) | null = null
      win.__dshpChunkLoader = {
        load(descriptor) {
          if (descriptor && typeof descriptor.factory === 'function') {
            captured = descriptor.factory
          }
        },
      }
      try {
        if (typeof document !== 'undefined' && document.head) {
          const scriptEl = document.createElement('script')
          scriptEl.textContent = scriptText
          document.head.appendChild(scriptEl)
          scriptEl.remove()
        }
        // Fallback for non-DOM test harnesses where `<script>` append is a no-op
        if (captured === null) {
          // eslint-disable-next-line @typescript-eslint/no-implied-eval
          new Function(scriptText)()
        }
      } finally {
        delete win.__dshpChunkLoader
      }
      if (captured === null) {
        throw new Error('client.mobile.js did not register a chunk factory')
      }
      const factoryFn = captured as (req: HostRequireFn) => MobileChunkExports
      return factoryFn(hostReq)
    } catch (err) {
      fallbackLoadPromise = null
      console.warn('[dsh-pocket] Fallback chunk load failed:', err)
      return null
    }
  })()
  return fallbackLoadPromise
}

async function importMobileChunk(): Promise<MobileChunkExports | null> {
  const hostReq = typeof __dshpHostRequire === 'function' ? __dshpHostRequire : undefined
  if (hostReq === undefined) return null

  if (typeof hostReq.async === 'function') {
    return await hostReq.async('./client.mobile.js')
  }

  try {
    return hostReq('./client.mobile.js') as MobileChunkExports
  } catch {
    if (typeof window !== 'undefined' && typeof fetch === 'function') {
      return await loadMobileChunkFallback(hostReq)
    }
    return null
  }
}

/**
 * Wraps `ctx` so `mobileApply(mobileCtx)` works safely after async `require.async` resolution
 * across all Cordis generations and disposes 100% of registered effects on plugin unload.
 */
function createAsyncMobileContext(
  ctx: ClientContext,
  isActive: () => boolean,
  trackDisposer: (fn: () => void) => void,
): ClientContext {
  const wrapDisposer = (d: unknown, kind: string): (() => void) => {
    if (typeof d !== 'function') return () => {}
    let disposed = false
    const once = (): void => {
      if (disposed) return
      disposed = true
      try {
        ;(d as () => void)()
      } catch (err) {
        console.warn(`[dsh-pocket] mobile ${kind} cleanup error:`, err)
      }
    }
    trackDisposer(once)
    return once
  }

  const safeEffect = (fn: () => (() => void) | void, label?: string): (() => void) => {
    if (!isActive()) return () => {}
    let cleaned = false
    let started = false
    let innerCleanup: (() => void) | void
    const runCleanupOnce = (): void => {
      if (cleaned) return
      cleaned = true
      if (typeof innerCleanup === 'function') {
        try {
          innerCleanup()
        } catch (err) {
          console.warn('[dsh-pocket] mobile effect cleanup error:', err)
        }
      }
    }

    let executed = false
    try {
      ctx.effect(() => {
        executed = true
        if (started || cleaned || !isActive()) return runCleanupOnce
        started = true
        innerCleanup = fn()
        return runCleanupOnce
      }, label)
    } catch {
      /* Post-apply async scope in stricter Cordis builds: run directly below */
    }

    if (!executed && !started && isActive()) {
      started = true
      innerCleanup = fn()
    }
    trackDisposer(runCleanupOnce)
    return runCleanupOnce
  }

  const safeSlots =
    ctx.slots && typeof ctx.slots === 'object'
      ? new Proxy(ctx.slots, {
          get(slotsTarget, prop) {
            if (prop === 'inject') {
              return (slotName: string, setup: () => (() => void) | void): (() => void) => {
                if (!isActive() || typeof slotsTarget.inject !== 'function') return () => {}
                try {
                  const orig = slotsTarget.inject.bind(slotsTarget)
                  const d = orig(slotName, () => {
                    if (!isActive()) return undefined
                    return setup()
                  })
                  return wrapDisposer(d, 'slots.inject')
                } catch (err) {
                  console.warn('[dsh-pocket] mobile slots.inject error:', err)
                  return () => {}
                }
              }
            }
            const val = Reflect.get(slotsTarget, prop, slotsTarget)
            return typeof val === 'function' ? val.bind(slotsTarget) : val
          },
        })
      : ctx.slots

  const proxyCtx: ClientContext = new Proxy(ctx, {
    get(target, prop) {
      if (prop === 'effect') return safeEffect
      if (prop === 'slots') return safeSlots
      if (prop === 'inject') {
        return (
          deps: readonly string[],
          callback: (scope: ClientContext) => void,
        ): (() => void) => {
          if (!isActive() || typeof target.inject !== 'function') return () => {}
          try {
            const orig = target.inject.bind(target)
            const d = orig(deps, (scope: ClientContext) => {
              if (!isActive()) return
              const safeScope =
                scope === ctx || scope === proxyCtx
                  ? proxyCtx
                  : createAsyncMobileContext(scope, isActive, trackDisposer)
              callback(safeScope)
            })
            return wrapDisposer(d, 'inject')
          } catch (err) {
            console.warn('[dsh-pocket] mobile inject error:', err)
            return () => {}
          }
        }
      }
      const value = Reflect.get(target, prop, target)
      return typeof value === 'function' ? value.bind(target) : value
    },
  })

  return proxyCtx
}

export function apply(ctx: ClientContext): void {
  if (ctx?.connection) {
    try {
      Object.defineProperty(ctx.connection, 'isLoopback', {
        value: true,
        writable: true,
        configurable: true,
      })
    } catch {
      try {
        ctx.connection.isLoopback = true
      } catch {
        /* ignore read-only connection facade */
      }
    }
  }

  // Register `pocket` locale dictionary prior to mobile chunk & settings slot evaluation.
  const translate = ctx.locale.bind(POCKET_NS) as unknown as TranslateFn
  ctx.effect(
    () => ctx.locale.register(POCKET_NS, { zh: POCKET_ZH, en: POCKET_EN }),
    'dsh-pocket: pocket locale dictionaries',
  )

  // DSH < 0.2.2-rc.2 stylesheet fallback (skipped when host `meta.stylesheets` already mounted it).
  ctx.effect(() => {
    if (typeof document === 'undefined') return undefined
    const hostManaged = document.querySelector(
      'style[data-plugin="dsh-pocket"][data-path="client/settings/styles.css"]',
    )
    if (hostManaged !== null) return undefined
    let tag = (document.getElementById?.('dshp-settings-css') ??
      document.querySelector?.('style#dshp-settings-css') ??
      null) as HTMLStyleElement | null
    if (tag && tag.tagName && tag.tagName !== 'STYLE') tag = null
    if (!tag) {
      tag = document.createElement('style')
      tag.id = 'dshp-settings-css'
      document.head?.appendChild(tag)
    }
    tag.setAttribute('data-plugin', 'dsh-pocket')
    if (tag.textContent !== POCKET_SETTINGS_CSS) {
      tag.textContent = POCKET_SETTINGS_CSS
    }
    return () => {
      tag?.remove()
    }
  }, 'dsh-pocket: settings stylesheet fallback')

  // Desktop zero-overhead gate + lazy `./client.mobile.js` loader.
  ctx.effect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined

    let active = true
    let mobileLoaded = false
    const lateDisposers: Array<() => void> = []

    const urlRaw = window.location?.href
      ? new URL(window.location.href).searchParams.get('dsh-layout')
      : null
    const urlValue = urlRaw ?? ''
    const urlNorm = urlValue.trim().toLowerCase()
    const stored = persistLayoutFromUrl(urlRaw) || readLegacyMobileLayout()

    const hasMatchMedia = typeof window.matchMedia === 'function'
    const widthMQ = hasMatchMedia ? window.matchMedia('(max-width: 1023px)') : null
    const coarseMQ = hasMatchMedia ? window.matchMedia('(pointer: coarse)') : null
    const narrowCoarseMQ = hasMatchMedia
      ? window.matchMedia('(max-width: 1023px) and (pointer: coarse)')
      : null

    const initialLayout = resolveLayout({
      urlValue,
      stored,
      narrowMatch: Boolean(narrowCoarseMQ?.matches),
    })
    document.body?.setAttribute('data-dsh-pocket-layout', initialLayout)

    const forcedDesktop =
      urlNorm === 'desktop' ||
      (urlNorm !== 'auto' && urlNorm !== 'mobile' && stored === 'desktop')
    if (forcedDesktop) {
      return () => {
        active = false
      }
    }

    const forcedMobile = urlNorm === 'mobile' || (urlNorm !== 'auto' && stored === 'mobile')

    const shouldLoadMobile = (): boolean => {
      if (forcedMobile) return true
      if (coarseMQ?.matches === true) return true
      if (readViewportWidth() < 1024 || widthMQ?.matches === true) return true
      return false
    }

    let detachWatchers: (() => void) | null = null
    const onEnvChange = (): void => {
      if (shouldLoadMobile()) triggerMobileLoad()
    }
    const attachWatchers = (): void => {
      if (!active || mobileLoaded || detachWatchers !== null) return
      widthMQ?.addEventListener?.('change', onEnvChange)
      coarseMQ?.addEventListener?.('change', onEnvChange)
      window.addEventListener?.('resize', onEnvChange)
      detachWatchers = () => {
        widthMQ?.removeEventListener?.('change', onEnvChange)
        coarseMQ?.removeEventListener?.('change', onEnvChange)
        window.removeEventListener?.('resize', onEnvChange)
      }
    }

    const resetAfterLoadFailure = (): void => {
      mobileLoaded = false
      if (active) attachWatchers()
    }

    const triggerMobileLoad = (): void => {
      if (!active || mobileLoaded) return
      mobileLoaded = true
      detachWatchers?.()
      detachWatchers = null

      const mobileCtx = createAsyncMobileContext(
        ctx,
        () => active,
        (dispose) => lateDisposers.push(dispose),
      )

      void importMobileChunk()
        .then(
          (mod) => {
            if (!active) return
            if (typeof mod?.mobileApply !== 'function') {
              resetAfterLoadFailure()
              return
            }
            mod.mobileApply(mobileCtx)
          },
          (err) => {
            resetAfterLoadFailure()
            console.error('[dsh-pocket] Failed to load client.mobile.js:', err)
          },
        )
        .catch((err) => {
          console.error('[dsh-pocket] Failed to apply client.mobile.js:', err)
        })
    }

    if (shouldLoadMobile()) {
      triggerMobileLoad()
    } else {
      attachWatchers()
    }

    return () => {
      active = false
      detachWatchers?.()
      detachWatchers = null
      while (lateDisposers.length > 0) {
        const off = lateDisposers.pop()
        off?.()
      }
    }
  }, 'dsh-pocket: mobile chunk loader')

  const rpcCall: RpcCallFn = (endpoint, payload, signal) =>
    ctx.connection.rpc.call(
      POCKET_RPC_CHANNEL,
      endpoint,
      payload,
      signal,
    ) as ReturnType<RpcCallFn>

  ctx.slots.inject('settings.section', () =>
    ctx.slots.register(
      {
        name: 'settings.section',
        id: 'pocket',
        order: 1,
        label: () => translate('section'),
        inject: () => ({ rpcCall, t: translate }),
      },
      PocketSettingsTab,
    ),
  )
}

export { redactStatus }
