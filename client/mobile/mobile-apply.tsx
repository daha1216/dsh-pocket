// dsh-pocket v4.0 Mobile Host Adaptation Orchestrator.
//
// Architecture (`client/mobile/`):
//   upstream/                      ← Internalized mobile shell engine (MIT, LICENSE.dsh-web-mobile)
//   pocket/extra-styles.css.ts     ← Safe-area, keyboard lift, settling, rightbar & sheet CSS
//   pocket/prefs-sync.ts           ← Single-RPC startup sync + live CustomEvent listeners
//   pocket/zoom-and-dialog.ts      ← Conditional iOS pinch-zoom lock + modal Tab focus containment
//   pocket/link-and-settling.ts    ← Settling watchdog + `/__dsh-pocket/ping` link liveness watchdog
//   pocket/viewport-and-chrome.ts  ← `--dshp-kb`, standalone viewport guard, tips & back-to-bottom pill
//   pocket/file-preview-sheet.ts   ← Mobile File Preview Bottom Sheet (`panel-stack.ts` integrated)
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { apply as upstreamApply } from './upstream/index.tsx'
import { MOBILE_QUERY } from './upstream/platform/breakpoints.ts'
import { resolveLayout, persistLayoutFromUrl } from './layout-mode.mjs'
import { NS as POCKET_NS } from '../pocket-locales.js'
import { installPocketExtraStyles } from './pocket/extra-styles.css.ts'
import { installPocketPrefsSync } from './pocket/prefs-sync.ts'
import { installZoomAndDialog, type ArmOnNarrow } from './pocket/zoom-and-dialog.ts'
import { installLinkAndSettlingWatchdogs } from './pocket/link-and-settling.ts'
import { installViewportAndChrome } from './pocket/viewport-and-chrome.ts'
import { createPocketFileReader, startFileGuard } from './fileGuard.ts'

/** Lazy dictionary lookup with safe built-in fallback. */
function pocketText(ctx: ClientContext, key: string, fallback: string): string {
  try {
    const get = ctx.locale.bind(POCKET_NS) as unknown as (k: string) => unknown
    const value = get(key)
    return typeof value === 'string' && value.length > 0 && value !== key ? value : fallback
  } catch {
    return fallback
  }
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

/**
 * Installs the mobile-adaptive host UI shell and pocket mobile enhancements.
 * @param ctx - DSH client root context.
 */
export function mobileApply(ctx: ClientContext): void {
  const urlRaw = new URL(window.location.href).searchParams.get('dsh-layout')
  const urlValue = urlRaw ?? ''
  const urlNorm = urlValue.trim().toLowerCase()
  const narrowMQ = window.matchMedia(MOBILE_QUERY)
  const stored = persistLayoutFromUrl(urlRaw) || readLegacyMobileLayout()
  const layout = resolveLayout({ urlValue, stored, narrowMatch: narrowMQ.matches })
  document.body?.setAttribute('data-dsh-pocket-layout', layout)

  // Only early-return when layout is EXPLICITLY forced to desktop!
  // In `auto` mode on iPad landscape / unfolded foldable (`width >= 1024px`, `pointer: coarse`),
  // `narrowMQ.matches` starts false (`layout === 'desktop'`), so we MUST still register
  // `narrowMQ` attribute sync, run `upstreamApply(ctx)` (for `tablet-quick-settings`),
  // and let `armOnNarrow` arm/disarm pocket effects whenever `narrowMQ` crosses 1024px.
  const forcedDesktop =
    urlNorm === 'desktop' || (urlNorm !== 'auto' && urlNorm !== 'mobile' && stored === 'desktop')
  if (forcedDesktop) return

  const forcedMobile =
    urlNorm === 'mobile' || (urlNorm !== 'auto' && stored === 'mobile')
  const narrow: MediaQueryList = forcedMobile
    ? ({
        matches: true,
        addEventListener: () => {},
        removeEventListener: () => {},
      } as unknown as MediaQueryList)
    : narrowMQ

  if (!forcedMobile) {
    ctx.effect(() => {
      const syncLayoutAttr = (): void => {
        document.body?.setAttribute(
          'data-dsh-pocket-layout',
          narrowMQ.matches ? 'mobile' : 'desktop',
        )
      }
      narrowMQ.addEventListener('change', syncLayoutAttr)
      return () => {
        narrowMQ.removeEventListener('change', syncLayoutAttr)
      }
    }, 'dsh-pocket: auto layout attribute sync on breakpoint change')
  }

  const armOnNarrow: ArmOnNarrow = (label, install) => {
    ctx.effect(() => {
      let dispose: (() => void) | undefined
      const sync = (): void => {
        dispose?.()
        dispose = narrow.matches ? install() : undefined
      }
      sync()
      narrow.addEventListener?.('change', sync)
      return () => {
        narrow.removeEventListener?.('change', sync)
        dispose?.()
      }
    }, label)
  }

  upstreamApply(ctx)
  installPocketPrefsSync(ctx)
  installPocketExtraStyles(ctx)
  installZoomAndDialog(armOnNarrow)

  const text = (key: string, fallback: string): string => pocketText(ctx, key, fallback)
  installLinkAndSettlingWatchdogs(ctx, armOnNarrow, text)
  installViewportAndChrome(ctx, armOnNarrow, text)

  armOnNarrow('dsh-pocket: file preview sheet + workspace guard', () => {
    const readFile = createPocketFileReader(ctx)
    const fileGuardT = ctx.locale.bind(POCKET_NS) as (key: string) => string
    return startFileGuard(readFile, fileGuardT)
  })
}

import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-session-log-export/client'
