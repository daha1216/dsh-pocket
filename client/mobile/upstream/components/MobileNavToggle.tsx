import { useEffect, useState } from 'react'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import { IconFolderOpen, IconPanelLeft } from '../core/icon-compat.ts'
import { getFrame } from '../effects/phone-chrome.ts'
import { NS } from '../i18n/locales.ts'
import { openFilesPanel } from './open-files-panel.ts'

/** Full props for the session-header directory toggle. */
export interface MobileNavToggleProps extends PropsRuntime<'conversation.session.header.actions'>, PropsLocale<typeof NS> {
  /** Bound ctx.layout.toggleSidebar(). */
  toggleSidebar: () => void
}

/**
 * Mobile-only icon buttons next to the session title:
 * - toggle: opens the directory drawer on narrow screens.
 * - files: opens the file browser directly — one tap, no drawer round-trip.
 *   Which surface that is (host right sidebar vs. the third-party explorer
 *   sheet) is decided in open-files-panel.ts. The hero/blank phases have no
 *   session header, so this control is absent there; the files entry in those
 *   phases is the right-edge leftward swipe (sidebar-swipe.ts).
 * Hidden entirely on wide screens (CSS media query).
 */
export function MobileNavToggle({ toggleSidebar, t }: MobileNavToggleProps) {
  // pocket 补丁：抽屉开关 a11y——订阅 frame 的 data-sidebar-collapsed
  // （documentElement 级 MutationObserver + attributeFilter），渲染
  // aria-expanded，开/关态 aria-label/title 在 t('open')/t('close') 间切换。
  // 抽屉真值口径与 phone-chrome drawerOpen() 一致（collapsed 属性缺失=开）。
  const [drawerOpen, setDrawerOpen] = useState(false)
  useEffect(() => {
    // 与 phone-chrome drawerOpen() 同一口径：frame 存在且不带
    // data-sidebar-collapsed 即为开。
    const readOpen = (): boolean => {
      const frame = getFrame()
      return frame !== null && !frame.hasAttribute('data-sidebar-collapsed')
    }
    setDrawerOpen(readOpen())
    // 流式输出的每个 token 都是一条文本 childList 突变——抽屉状态不可能被纯
    // 文本批次改变，直接跳过；其余批次 rAF 合并成每帧至多一次 readOpen（两次
    // querySelector）。attributeFilter 只过滤 attributes 类记录，childList 仍会
    // 进回调，所以上面两道豁免是必须的，不是优化。
    let raf = 0
    const schedule = (): void => {
      if (raf !== 0) return
      raf = requestAnimationFrame(() => {
        raf = 0
        setDrawerOpen(readOpen())
      })
    }
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === 'attributes') {
          if (record.attributeName === 'data-sidebar-collapsed') {
            schedule()
            return
          }
          continue
        }
        const nodes = [...record.addedNodes, ...record.removedNodes]
        if (nodes.length === 0 || !nodes.every((node) => node.nodeType === Node.TEXT_NODE)) {
          schedule()
          return
        }
      }
    })
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['data-sidebar-collapsed'],
    })
    return () => {
      if (raf !== 0) cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])
  const toggleExplorer = (): void => {
    openFilesPanel()
  }
  return (
    <>
      <button
        type="button"
        data-mobile-nav="toggle"
        aria-label={drawerOpen ? t('close') : t('open')}
        aria-expanded={drawerOpen}
        title={drawerOpen ? t('close') : t('open')}
        onClick={() => toggleSidebar()}
      >
        <IconPanelLeft size={16} />
      </button>
      <button
        type="button"
        data-mobile-nav="files"
        aria-label={t('files')}
        title={t('files')}
        onClick={toggleExplorer}
      >
        <IconFolderOpen size={16} />
      </button>
    </>
  )
}
