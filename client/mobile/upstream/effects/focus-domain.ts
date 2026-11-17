import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { installMobileEffect } from '../platform/breakpoints.ts'
import { createFocusDomain } from '../platform/focus-domain.ts'
import type { FocusPolicy } from '../platform/focus-domain.ts'

/**
 * The single mobile focus effect (Phase 1 ④, 评审 §6.2, 2026-11-17).
 *
 * 评审把四个 keyboard guard 归并成一个「焦点域管理器」。归并的不是四个文件的内容，
 * 而是它们各自重复的基础设施：一次 effect 安装、一套 document 捕获监听（pointerdown /
 * touchstart / mousedown / focusin）、一个 own-property 影子槽、一个定时窗口。四个守卫
 * 保持独立文件，只导出策略——触发条件与决策；基础状态全在 platform/focus-domain.ts。
 *
 * 顺序不构成契约：四个策略互不读取对方的状态（各自的触发源分别是按下事件、会话快照订阅、
 * 面板退场事件、以及一次性的原型级谓词），同一次按下同时被两个策略看到也无害。
 *
 * 各自的报障背景留在各自文件的文档块里（composer / session / model menu / shortcut modal），
 * 这里只记它们此后**只有一个**安装点。
 */
export function installFocusDomain(ctx: ClientContext, policies: FocusPolicy[]): void {
  installMobileEffect(ctx, 'dsh-web-mobile: focus domain', () => {
    const domain = createFocusDomain()
    const releases: (() => void)[] = []
    for (const policy of policies) {
      const release = policy(domain)
      if (release !== undefined) releases.push(release)
    }
    return () => {
      for (const release of releases) release()
      domain.dispose()
    }
  })
}
