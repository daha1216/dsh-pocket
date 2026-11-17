import type { FocusPolicy } from '../platform/focus-domain.ts'

const AUTOFOCUS_FIELD = '[data-shortcut-modal="shortcuts"] [data-modal-autofocus]'

/**
 * 宿主 `dsh-client-ui-shortcuts` 的弹层（`data-shortcut-modal="shortcuts"`）打开时把焦点
 * 抢到搜索框，手机随即弹软键盘——用户是来编辑快捷键的，键盘却盖掉半屏；弹层按 `100dvh`
 * 定高，键盘一压整体缩一截（实测 844→520 时 600px→496px，就是「打开就闪」）。
 *
 * 这里给 input 原型影子（core/prototype-focus-shadow.ts，#84）注册一个一次性谓词：
 * 带 `data-dsh-automatic-focus` 且还没初始化过的搜索框，第一次聚焦被吞掉并把焦点还给
 * dialog；用户随后自己点搜索框照常聚焦。原型影子由 focus domain 代管（2026-11-17，
 * Phase 1 ④），所以本策略没有自己的安装/卸载监听，只有一条谓词。
 */
export const shortcutModalKeyboardPolicy: FocusPolicy = (domain) => {
  // 影子在 MutationObserver 之外注册（这里由 focus domain 在武装时注册），微任务时序
  // 早于 React 被动 effect，所以第一帧的抢焦也拦得住。
  const initialized = new WeakSet(document.querySelectorAll(AUTOFOCUS_FIELD))
  const pending = new WeakSet<HTMLInputElement>()
  return domain.guardInputFocus((element) => {
    if (element.matches(AUTOFOCUS_FIELD)) {
      if (!initialized.has(element) && element.hasAttribute('data-dsh-automatic-focus')) {
        if (!pending.has(element)) {
          pending.add(element)
          Promise.resolve().then(() => initialized.add(element))
          const dialog = element.closest<HTMLElement>('[role="dialog"][aria-modal="true"]')
          if (dialog !== null && !dialog.contains(document.activeElement)) {
            dialog.focus({ preventScroll: true })
          }
        }
        return true
      }
      initialized.add(element)
    }
    return false
  })
}
