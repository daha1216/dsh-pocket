import { classifyComposerPress } from '../core/focus-press.ts'
import { COMPOSER_INPUT_SELECTOR } from '../platform/focus-domain.ts'
import type { FocusPolicy, PressEvent } from '../platform/focus-domain.ts'

/**
 * iOS keyboard guard for the composer's fixed control cluster.
 *
 * Upstream `dsh-client-ui-conversation` (0.1.2-rc.1) hangs the same
 * `keepFocus` handler on the composer row's three buttons (send, stop, the
 * `+` commands trigger):
 *
 *   const keepFocus = (e) => {
 *     e.preventDefault()
 *     editor?.getRootElement()?.focus({ preventScroll: true })
 *   }
 *
 * `onMouseDown` keeps the caret in the editor across button clicks on
 * desktop. On iOS WebKit the same handler runs inside the tap's synthesized
 * mousedown, and that programmatic `focus()` call re-raises the on-screen
 * keyboard whenever it had closed (scroll-to-dismiss, keyboard dismissal,
 * PWA relaunch) while logical focus never left the contenteditable. The
 * user taps Send on a collapsed keyboard and the keyboard springs back up
 * over the running conversation — the message still sends, but the screen
 * is now half keyboard.
 *
 * Fix strategy: in the capture phase of every press whose target sits inside
 * the composer card but is NOT the editing surface itself, shadow the
 * `[data-composer-input]` element's own `focus` property for a short window.
 * React's `keepFocus` then calls the shadow instead of the prototype method,
 * the keyboard stays down, and the shadow is dropped by the domain at the end
 * of the window:
 *
 *   capture press → shadow focus → (bubbling) keepFocus → click →
 *   window end
 *
 * Why shadowing instead of intercepting the event: `keepFocus`'s own
 * `preventDefault()` must keep running (it stops the tap from blurring
 * the editor), and the editor's own tap-to-type path must never be
 * touched — only the button-initiated programmatic focus is undesirable
 * on iOS. A capture-phase `stopPropagation` would break both.
 *
 * 2026-11-17（Phase 1 ④）：捕获监听、影子槽、窗口都搬进 platform/focus-domain.ts
 * （四个守卫共用一套，见 effects/focus-domain.ts）。本文件只剩策略：把一次按下归到
 * core/focus-press.ts 的判定表上，再决定开窗 / 收窗。启用条件也从「iOS WebKit 或
 * 粗指针」简化为「由 focus domain 在移动断点武装」——MOBILE_QUERY 本身已含
 * `(pointer: coarse)`，桌面（精细指针）任何宽度都不会走到这里。
 *
 * DOM contract (verified against 0.1.2-rc.1 dsh-client-ui-conversation):
 * - `[data-composer-card]` — the composer card root (InputBar).
 * - `[data-composer-input]` — the Lexical contenteditable surface.
 * - The buttons carry hashed `_primary`/`_add` classes and no stable
 *   data marker, so the card boundary (not the buttons) is the anchor.
 * Audit both markers when the conversation package upgrades.
 */

/** The composer card root that owns the fixed control cluster. */
const COMPOSER_CARD_SELECTOR = '[data-composer-card]'

/** Interactive controls inside the card — the only presses whose handlers
 *  (keepFocus on send/stop/+, the + onClick's focusDraftEditor) refocus the
 *  editor programmatically. Blank card padding/gaps are not controls. */
const COMPOSER_CONTROL_SELECTOR =
  'button, [role="button"], [role="option"], [role="menuitem"], [role="combobox"], [aria-haspopup], select, a[href], label, input'

/**
 * 影子存活窗口 = 700ms 固定窗口，**不能**"click 后立刻撤"。
 * 2026-09-23 真机探针的事件轨迹（点一次 `+`）：
 *   51.5 clicks:添加文件或调用指令 / shadow:ON
 *   51.6 shadow:off          ← 旧的"click 后 setTimeout(0) 撤"
 *   51.7 vv 754→471          ← 键盘此时才弹 ⇒ 宿主是在"菜单打开后的 effect"
 *                              里再 focus 一次，撤早了等于白装。
 * 影子只拦**程序化** focus()；窗口内用户点输入框由 focus domain 当场收窗，
 * 所以放宽到 700ms 是安全的；窗口内新的按钮点按会重置计时。
 */
const SHADOW_WINDOW_MS = 700

/** Press policy: swallow the host's programmatic refocus of the editor.
 *  Installed by effects/focus-domain.ts while the mobile breakpoint is armed. */
export const composerKeyboardPolicy: FocusPolicy = (domain) => {
  const onPress = (press: PressEvent): void => {
    const card = press.target.closest(COMPOSER_CARD_SELECTOR)
    if (card === null) return
    const editor = card.querySelector<HTMLElement>(COMPOSER_INPUT_SELECTOR)
    if (editor === null) return
    const control = press.target.closest(COMPOSER_CONTROL_SELECTOR)
    const verdict = classifyComposerPress({
      insideCard: true,
      onInput: press.target.closest(COMPOSER_INPUT_SELECTOR) !== null,
      // 控件判定限定在卡片内：卡片外的祖先（例如整页容器上的 role）不算。
      onControl: control !== null && card.contains(control),
    })
    if (verdict !== 'arm') {
      domain.release()
      return
    }
    domain.hold(SHADOW_WINDOW_MS)
    domain.shadow(editor)
  }
  return domain.onPress(onPress)
}
