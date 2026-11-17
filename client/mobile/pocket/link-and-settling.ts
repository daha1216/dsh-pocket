import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import {
  createSettlingGuard,
  createFreezeDetector,
  resolveLinkVerdict,
  classifyLink,
  createLinkLiveness,
  SETTLING_STALE_MS,
  LINK_TICK_MS,
  LINK_PROBE_TIMEOUT_MS,
  LINK_BANNER_GRACE_MS,
  LINK_BANNER_BACK_MS,
} from '../settling-watchdog.mjs'
import { POCKET_RPC_CHANNEL, POCKET_ENDPOINTS } from '../../api.js'
import type { ArmOnNarrow } from './zoom-and-dialog.ts'

/** Zero-I/O proxy liveness endpoint (authenticated, < 0.2ms, 204 No Content). */
export const POCKET_PING_PATH = '/__dsh-pocket/ping'

export type PocketTextFn = (key: string, fallback: string) => string

/**
 * Installs:
 * 1. Settling watchdog (recovers hidden composer seat after iOS PWA freeze/reconnect).
 * 2. Link liveness watchdog (lightweight `/__dsh-pocket/ping` probe + silent-disconnect recovery + status banner).
 */
export function installLinkAndSettlingWatchdogs(
  ctx: ClientContext,
  armOnNarrow: ArmOnNarrow,
  pocketText: PocketTextFn,
): void {
  armOnNarrow('dsh-pocket: settling watchdog (host reconnect leaves composer hidden)', () => {
    const STALE_ATTR = 'data-dshp-settling-stale'
    const guard = createSettlingGuard()
    const freeze = createFreezeDetector()
    const timers = new Map<HTMLElement, number>()
    let raf = 0
    let heartbeat = 0
    let disposed = false

    const now = (): number => performance.now()

    const linkVerdict = () => {
      const conn = ctx.connection as unknown as {
        generation?: { getSnapshot?: () => unknown }
        state?: { getSnapshot?: () => unknown }
      }
      const hasGeneration = typeof conn?.generation?.getSnapshot === 'function'
      return resolveLinkVerdict({
        hasGeneration,
        generation: hasGeneration ? conn.generation?.getSnapshot?.() : undefined,
        state: hasGeneration ? undefined : conn?.state?.getSnapshot?.(),
      })
    }

    const activeSessionId = (): string | undefined => {
      try {
        const snapshot = (ctx as unknown as {
          sessions?: { list?: { getSnapshot?: () => unknown } }
        }).sessions?.list?.getSnapshot?.() as
          | {
              current?: unknown
              byId?: Record<string, { id?: unknown; retainedBy?: { mainView?: unknown } }>
            }
          | undefined
        if (snapshot === null || typeof snapshot !== 'object') return undefined
        if (typeof snapshot.current === 'string') return snapshot.current
        for (const key in snapshot.byId) {
          const row = snapshot.byId[key]
          if (row === undefined) continue
          const mainView = row.retainedBy?.mainView
          if (typeof mainView === 'number' && mainView > 0 && typeof row.id === 'string') return row.id
        }
      } catch {
        /* fallback to CSS-only visibility recovery */
      }
      return undefined
    }

    const readHints = (
      id: string | undefined,
    ): { openState?: string; openPromise?: 'live' | 'gone' | 'unknown' } => {
      if (id === undefined) return {}
      try {
        const session = (ctx as unknown as {
          sessions?: { manager?: { get?: (id: string) => unknown } }
        }).sessions?.manager?.get?.(id) as
          | {
              getSnapshot?: () => { openState?: unknown }
              openPromise?: unknown
            }
          | undefined
        if (session === undefined) return {}
        const openState = session.getSnapshot?.()?.openState
        if (typeof openState !== 'string') return {}
        const openPromise =
          'openPromise' in session
            ? session.openPromise === null || session.openPromise === undefined
              ? 'gone'
              : 'live'
            : 'unknown'
        return { openState, openPromise }
      } catch {
        return {}
      }
    }

    const tryReconnect = (): void => {
      try {
        const conn = ctx.connection as unknown as { reconnect?: () => unknown }
        if (typeof conn?.reconnect === 'function') void conn.reconnect()
      } catch {
        /* connection unavailable */
      }
    }

    const sessionIdFor = (root: HTMLElement): string | undefined => {
      const own = root.getAttribute('data-conversation-session')
      if (typeof own === 'string' && own !== '') return own
      const inner = root.querySelector('[data-conversation-session]')
      const id = inner?.getAttribute('data-conversation-session')
      return typeof id === 'string' && id !== '' ? id : undefined
    }

    const tryRepair = (reconnectFirst: boolean, root?: HTMLElement): void => {
      if (reconnectFirst) tryReconnect()
      try {
        const id = (root === undefined ? undefined : sessionIdFor(root)) ?? activeSessionId()
        if (id === undefined) return
        const session = (ctx as unknown as {
          sessions?: { manager?: { get?: (id: string) => unknown } }
        }).sessions?.manager?.get?.(id) as { resync?: () => unknown } | undefined
        if (typeof session?.resync !== 'function') return
        void session.resync()
      } catch {
        /* fallback to CSS-only recovery */
      }
    }

    const clearTimer = (root: HTMLElement): void => {
      const timer = timers.get(root)
      if (timer !== undefined) {
        window.clearTimeout(timer)
        timers.delete(root)
      }
    }

    const settlingPhaseOf = (el: Element): string | null => {
      const rootPhase = el.getAttribute('data-phase')
      if (rootPhase === 'settling') return 'data-phase'
      const bodyPhase = el.getAttribute('data-content-phase')
      if (bodyPhase === 'settling') return 'data-content-phase'
      return null
    }

    const arm = (root: HTMLElement, delayMs = SETTLING_STALE_MS): void => {
      if (timers.has(root)) return
      timers.set(
        root,
        window.setTimeout(() => {
          timers.delete(root)
          markStale(root)
        }, Math.max(0, delayMs)),
      )
    }

    const markStale = (root: HTMLElement): void => {
      if (disposed || !root.isConnected) return
      if (settlingPhaseOf(root) === null) return
      const id = sessionIdFor(root) ?? activeSessionId()
      const verdict = guard.decide(root, now(), readHints(id))
      if (verdict.repair) tryRepair(verdict.reconnect, root)
      if (!verdict.stale) {
        if (verdict.waiting) arm(root, verdict.remainingMs ?? SETTLING_STALE_MS)
        return
      }
      if (root.getAttribute(STALE_ATTR) === null) root.setAttribute(STALE_ATTR, '')
    }

    const SETTLING_SELECTOR = '[data-phase="settling"],[data-content-phase="settling"]'

    const scan = (): void => {
      raf = 0
      if (disposed) return
      const at = now()
      const settling = document.querySelectorAll<HTMLElement>(SETTLING_SELECTOR)
      for (const el of Array.from(document.querySelectorAll<HTMLElement>(`[${STALE_ATTR}]`))) {
        if (settlingPhaseOf(el) === null) {
          el.removeAttribute(STALE_ATTR)
          guard.release(el)
        }
      }
      for (const root of Array.from(settling)) {
        guard.observe(root, at)
        arm(root)
      }
      for (const root of Array.from(timers.keys())) {
        if (!root.isConnected || settlingPhaseOf(root) === null) {
          clearTimer(root)
          guard.release(root)
        }
      }
    }

    const schedule = (): void => {
      if (raf === 0 && !disposed) raf = requestAnimationFrame(scan)
    }

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes') {
          schedule()
          return
        }
        for (const n of m.addedNodes) {
          if (n.nodeType !== 3) {
            schedule()
            return
          }
        }
        for (const n of m.removedNodes) {
          if (n.nodeType !== 3) {
            schedule()
            return
          }
        }
      }
    })
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-phase', 'data-content-phase'],
    })

    const onLinkChange = (): void => {
      guard.noteLink(linkVerdict(), now())
      for (const root of Array.from(timers.keys())) clearTimer(root)
      schedule()
    }
    const unsubscribers: Array<() => void> = []
    for (const key of ['generation', 'state'] as const) {
      try {
        const source = (ctx.connection as unknown as Record<
          string,
          { subscribe?: (listener: () => void) => () => void } | undefined
        >)[key]
        if (typeof source?.subscribe === 'function') {
          unsubscribers.push(source.subscribe(onLinkChange))
        }
      } catch {
        /* ignore unavailable subscription handle */
      }
    }

    const onResume = (): void => {
      guard.noteResume(now())
      for (const root of Array.from(timers.keys())) clearTimer(root)
      schedule()
    }
    const onVisibility = (): void => {
      if (document.visibilityState === 'visible') onResume()
    }
    const onPageShow = (event: PageTransitionEvent): void => {
      if (event.persisted) onResume()
    }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pageshow', onPageShow)
    heartbeat = window.setInterval(() => {
      if (freeze.tick(now())) onResume()
    }, freeze.intervalMs)

    scan()
    return () => {
      disposed = true
      observer.disconnect()
      for (const off of unsubscribers) off()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pageshow', onPageShow)
      if (heartbeat !== 0) window.clearInterval(heartbeat)
      freeze.reset()
      if (raf !== 0) cancelAnimationFrame(raf)
      for (const timer of timers.values()) window.clearTimeout(timer)
      timers.clear()
      guard.reset()
      for (const el of Array.from(document.querySelectorAll<HTMLElement>(`[${STALE_ATTR}]`))) {
        el.removeAttribute(STALE_ATTR)
      }
    }
  })

  armOnNarrow('dsh-pocket: link watchdog (silent disconnect never recovers)', () => {
    const liveness = createLinkLiveness()
    let disposed = false
    let probeTimer = 0
    let activeAbort: AbortController | null = null
    let downAt = 0

    const now = (): number => performance.now()

    const linkState = (): 'up' | 'connecting' | 'down' => {
      try {
        const conn = ctx.connection as unknown as {
          generation?: { getSnapshot?: () => unknown }
          state?: { getSnapshot?: () => unknown }
        }
        const hasGeneration = typeof conn?.generation?.getSnapshot === 'function'
        return classifyLink({
          hasGeneration,
          generation: hasGeneration ? conn.generation?.getSnapshot?.() : undefined,
          state: typeof conn?.state?.getSnapshot === 'function' ? conn.state.getSnapshot() : undefined,
        })
      } catch {
        return 'up'
      }
    }

    const tryReconnect = (): void => {
      try {
        const conn = ctx.connection as unknown as { reconnect?: () => unknown }
        if (typeof conn?.reconnect === 'function') void conn.reconnect()
      } catch {
        /* hand back to host's own reconnect loop */
      }
    }

    let banner: HTMLDivElement | null = null
    let bannerDown = false
    let bannerBackTimer = 0

    const ensureBanner = (): HTMLDivElement => {
      if (banner !== null && banner.isConnected) return banner
      banner = document.createElement('div')
      banner.setAttribute('data-mobile-nav', 'link-banner')
      banner.setAttribute('role', 'status')
      banner.setAttribute('aria-live', 'polite')
      banner.style.cssText =
        "position:fixed;left:50%;top:calc(env(safe-area-inset-top, 0px) + 10px);transform:translateX(-50%);z-index:2147483600;max-width:calc(100vw - 32px);padding:8px 16px;border-radius:999px;corner-shape:round;border:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.22));font:500 13px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:var(--dsw-alias-label-on-color, #ffffff);box-shadow:var(--dsw-elevation-prominent, 0 8px 24px rgba(0,0,0,.28));pointer-events:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center"
      document.body.appendChild(banner)
      return banner
    }

    const paintBanner = (text: string, tone: 'down' | 'back'): void => {
      const el = ensureBanner()
      el.textContent = text
      el.style.background =
        tone === 'down'
          ? 'var(--dsw-alias-state-error-primary, #dc2626)'
          : 'var(--dsw-alias-state-success-primary, #16a34a)'
      el.style.display = 'block'
    }

    const removeBanner = (): void => {
      window.clearTimeout(bannerBackTimer)
      bannerBackTimer = 0
      banner?.remove()
      banner = null
      bannerDown = false
    }

    const syncBanner = (): void => {
      if (disposed) return
      const at = now()
      const down = liveness.isDown() && liveness.downFor(at) >= LINK_BANNER_GRACE_MS
      if (down === bannerDown) return
      bannerDown = down
      if (down) {
        window.clearTimeout(bannerBackTimer)
        bannerBackTimer = 0
        downAt = at - liveness.downFor(at)
        paintBanner(pocketText('linkDown', '连接已断开，正在自动重连…'), 'down')
      } else {
        const outage = downAt === 0 ? 0 : Math.round(at - downAt)
        downAt = 0
        if (outage >= LINK_BANNER_BACK_MS) {
          paintBanner(pocketText('linkBack', '✅ 已重新连接'), 'back')
          bannerBackTimer = window.setTimeout(removeBanner, 1400)
        } else {
          removeBanner()
        }
      }
    }

    /**
     * Lightweight HTTP liveness probe against `/__dsh-pocket/ping` (204 No Content,
     * zero upstream/disk I/O, sits behind proxy access control so 401/403 also detects
     * revoked credentials). Falls back to `pocket.status` RPC ONLY in unit-test stubs
     * where `typeof fetch !== 'function'`.
     */
    const probe = (): void => {
      let settled = false
      const controller = typeof AbortController === 'function' ? new AbortController() : null
      activeAbort = controller

      const finish = (alive: boolean): void => {
        if (settled || disposed) return
        settled = true
        window.clearTimeout(probeTimer)
        probeTimer = 0
        if (activeAbort === controller) activeAbort = null
        liveness.noteProbe(alive, now())
        syncBanner()
      }

      probeTimer = window.setTimeout(() => {
        controller?.abort()
        finish(false)
      }, LINK_PROBE_TIMEOUT_MS)

      try {
        if (typeof fetch === 'function') {
          void fetch(POCKET_PING_PATH, {
            method: 'GET',
            cache: 'no-store',
            credentials: 'same-origin',
            ...(controller ? { signal: controller.signal } : {}),
          }).then(
            (res) => {
              if (res.status === 401 || res.status === 403) {
                finish(false)
                return
              }
              finish(res.status === 204 || res.ok)
            },
            () => finish(false),
          )
          return
        }

        const rpc = (ctx.connection as unknown as {
          rpc?: { call?: (channel: string, endpoint: string, payload: unknown) => unknown }
        })?.rpc
        if (typeof rpc?.call !== 'function') {
          finish(true)
          return
        }
        void Promise.resolve(rpc.call(POCKET_RPC_CHANNEL, POCKET_ENDPOINTS.status, {})).then(
          () => finish(true),
          () => finish(false),
        )
      } catch {
        finish(false)
      }
    }

    const tick = (): void => {
      if (disposed) return
      const at = now()
      const visible = document.visibilityState === 'visible'
      liveness.noteState(linkState(), at)
      const online = navigator.onLine !== false
      if (liveness.shouldForceReconnect(at, visible && online)) tryReconnect()
      if (liveness.shouldProbe(at, visible)) probe()
      syncBanner()
    }

    const timer = window.setInterval(tick, LINK_TICK_MS)
    const onVisibility = (): void => {
      if (document.visibilityState === 'visible') tick()
    }
    document.addEventListener('visibilitychange', onVisibility)
    tick()

    return () => {
      disposed = true
      window.clearInterval(timer)
      window.clearTimeout(probeTimer)
      activeAbort?.abort()
      activeAbort = null
      removeBanner()
      liveness.reset()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  })
}
