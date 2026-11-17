import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { currentSessionIdOf } from '../core/sessions-compat.ts'
import type { FocusPolicy } from '../platform/focus-domain.ts'

/**
 * Mobile guard: entering a session — or coming back from a main-slot panel —
 * must not raise the soft keyboard by itself.
 *
 * `dsh-client-ui-conversation`'s InputBar focuses the Lexical editor from a
 * passive effect keyed on `[locked, sessionId, editor]` — every session switch
 * programmatically focuses the editing surface (`focusDraftEditor`:
 * `getRootElement()?.focus(...)` plus `editor.focus(...)`). On desktop that is
 * a convenience. On a phone it costs the user half the screen the moment the
 * session opens — they typically want to READ the history first (issue #140).
 *
 * Fix strategy: on a snapshot-observed current-session change, open a short
 * guard window in the shared focus domain, which shadows the editor's own
 * `focus` property so the host's session-switch autofocus lands on the no-op
 * and re-shadows an editor that mounts inside the window. A real tap is
 * unaffected: the browser focuses natively and never routes through the JS
 * method, and a tap on the editing surface closes the window first. The window
 * is finite (see the constant), so no legitimate programmatic refocus (e.g. the
 * `+` command menu, which needs the caret) is swallowed after the switch has
 * settled.
 *
 * 2026-10-20 (店主报障)：退出插件面板回会话时也会弹键盘。同一台机器上的成因是
 * 同一个：面板占住主区时会话被卸载，退场（panel-exit 挂 data-mobile-panel-exit，
 * 220ms 动画后才 selectPanel）结束时 InputBar 重新挂载，它的挂载期聚焦又跑了一遍。
 * 退场标记由 panel-exit 在动画开始前就挂上，早于会话重挂载，所以这层只需要在
 * MutationObserver 里看到该标记出现时顺手开同一个窗口。
 *
 * 2026-09-29 headless correction (issue #140 verification run): the shadow
 * alone is NOT sufficient. When the InputBar remounts for the new session,
 * the host's focus call runs inside the commit's synchronous layout-effect
 * phase — BEFORE any MutationObserver microtask — so the freshly mounted
 * editor got focused while it still had no shadow (focusin measured at
 * t=314ms with marker=false; the observer only shadowed it afterwards). The
 * focus domain therefore keeps the focusin fallback for the window's lifetime:
 * any DOM focus landing on the editing surface is blurred synchronously — the
 * same recipe `composer-keyboard-guard.ts` proved on a real device in the
 * 2026-09-23 keepFocus loop (blur at the focusin capture phase happens
 * before the IME can rise, and drafts/caret live in the host's keyboard
 * state, not in DOM focus).
 *
 * 2026-11-17（Phase 1 ④）：影子槽、窗口、窗口期挂载观察者与 focusin 兜底都在
 * platform/focus-domain.ts（`hold(ms, true)` 就是「窗口内追新挂载的编辑面」）。
 * 本文件只剩三个开窗触发，全部是 domain.hold(FOCUS_GUARD_WINDOW_MS, true)。
 *
 * DOM contract (verified against 0.1.7-rc.2):
 * - `[data-composer-input]` — the Lexical contenteditable surface (count=1;
 *   present in every released host since 0.1.2-alpha.2, per
 *   docs/debug/composer-tree-recon.md).
 * - `data-mobile-nav-focus-shadow` — the shared shadow marker (platform/focus-domain.ts).
 * Re-audit when the conversation package upgrades.
 */

/** Guard window for one session switch. Long enough for a slow phone to
 *  render + run passive effects; short enough that a user tapping `+` right
 *  after the switch only rarely lands inside it. */
const FOCUS_GUARD_WINDOW_MS = 800

/** Frame marker panel-exit sets before it starts leaving (see effects/panel-exit.ts). */
const PANEL_EXIT_ATTR = 'data-mobile-panel-exit'

/**
 * Synchronous companion event, dispatched by panel-exit the moment the marker
 * lands. The marker alone is too late: the InputBar remounts and focuses inside
 * the commit's synchronous layout-effect phase, i.e. before an observer
 * microtask can open the window (the same 2026-09-29 measurement quoted in the
 * header). The event opens the window first, the marker stays as the backstop.
 */
const PANEL_EXIT_EVENT = 'dsh-mobile-panel-exit'

/** Session-switch policy factory. `ctx` is only read here (the subscription);
 *  the policy itself works against the shared domain. */
export function createSessionFocusPolicy(ctx: ClientContext): FocusPolicy {
  return (domain) => {
    const list = ctx.sessions.list
    // Snapshot value at install time: subscribing must not arm the window by
    // itself — only a CHANGE of the current session id does.
    let lastSessionId = currentSessionIdOf(list.getSnapshot())

    const hasPanelExitMarker = (): boolean =>
      document.querySelector(`[data-mobile-nav="frame"][${PANEL_EXIT_ATTR}]`) !== null

    // The resident observer watches ONLY the panel-exit marker (2026-11-03):
    // a panel occupies the main slot while open, so leaving it remounts the
    // InputBar and re-runs its mount-time focus. Arm on the marker's arrival —
    // it lands before the panel actually leaves (panel-exit animates first,
    // then selectPanel), so the window is already open when the conversation
    // remounts. No childList here: marker arrival is an attribute flip on a
    // node that already exists.
    const markerObserver = new MutationObserver(() => {
      if (!domain.holding() && hasPanelExitMarker()) domain.hold(FOCUS_GUARD_WINDOW_MS, true)
    })

    // Invalidation callback (zustand-style): re-read the snapshot and arm only
    // when the current session id actually changed — list churn (titles,
    // ordering, refresh) must never open the window.
    const unsubscribe = list.subscribe(() => {
      const current = currentSessionIdOf(list.getSnapshot())
      if (current === lastSessionId) return
      lastSessionId = current
      domain.hold(FOCUS_GUARD_WINDOW_MS, true)
    })

    const onPanelExit = (): void => {
      if (!domain.holding()) domain.hold(FOCUS_GUARD_WINDOW_MS, true)
    }

    markerObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [PANEL_EXIT_ATTR],
    })
    document.addEventListener(PANEL_EXIT_EVENT, onPanelExit)
    return () => {
      unsubscribe()
      markerObserver.disconnect()
      document.removeEventListener(PANEL_EXIT_EVENT, onPanelExit)
    }
  }
}
