import { createElement as h } from 'react'
import type { ReactElement } from 'react'

/**
 * Self-owned crisp inline SVG icons for the mobile adaptation layer.
 *
 * Official DSH red-line: plugins MUST NOT import `@deepseek-ai/dsh-client-ui-primitives`
 * at runtime (internal icon/component export names change across DSH releases and can
 * crash plugin activation). All icons here are pure inline SVG React components
 * rendered at `size` (default 16px) with `stroke="currentColor"`, `fill="none"`,
 * and `strokeWidth="1.65"`.
 */

/** Icon component shape shared across mobile slot controls. */
export type HostIcon = (props: { size?: number; className?: string }) => ReactElement

function svgFrame(
  size: number | undefined,
  className: string | undefined,
  ...paths: ReactElement[]
): ReactElement {
  const px = size ?? 16
  return h(
    'svg',
    {
      width: px,
      height: px,
      viewBox: '0 0 16 16',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.65,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': 'true',
      ...(className ? { className } : {}),
    },
    ...paths,
  )
}

/** Composer file attachment entry (paperclip). */
export const IconPaperclip: HostIcon = ({ size, className }) =>
  svgFrame(
    size,
    className,
    h('path', {
      key: 'clip',
      d: 'M13.4 7.5L7.8 13.1a3.5 3.5 0 0 1-4.95-4.95l5.9-5.9a2.3 2.3 0 0 1 3.25 3.25L6.25 11.25a1.15 1.15 0 0 1-1.63-1.63l5.13-5.12',
    }),
  )

/** Session header directory drawer toggle. */
export const IconPanelLeft: HostIcon = ({ size, className }) =>
  svgFrame(
    size,
    className,
    h('rect', { key: 'box', x: 2, y: 2.5, width: 12, height: 11, rx: 2 }),
    h('path', { key: 'bar', d: 'M6 2.5v11' }),
  )

/** Session header Files / right-sidebar entry. */
export const IconFolderOpen: HostIcon = ({ size, className }) =>
  svgFrame(
    size,
    className,
    h('path', {
      key: 'folder',
      d: 'M2 4.5A1.5 1.5 0 0 1 3.5 3h2.5l1.4 1.5h4.6A1.5 1.5 0 0 1 13.5 6v1.5M2 7.5h12l-1.15 4.9a1.5 1.5 0 0 1-1.46 1.1H3.4A1.4 1.4 0 0 1 2 12.1V4.5Z',
    }),
  )

/** File share upward-arrow tray icon. */
export const IconShare: HostIcon = ({ size, className }) =>
  svgFrame(
    size,
    className,
    h('path', { key: 'arrow', d: 'M8 2v7.5M5.2 4.8L8 2l2.8 2.8' }),
    h('path', { key: 'tray', d: 'M3 9.5v3A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-3' }),
  )

/** File download downward-arrow tray icon. */
export const IconDownload: HostIcon = ({ size, className }) =>
  svgFrame(
    size,
    className,
    h('path', { key: 'arrow', d: 'M8 2v7.5M5.2 6.7L8 9.5l2.8-2.8' }),
    h('path', { key: 'tray', d: 'M3 10.5v2A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-2' }),
  )
