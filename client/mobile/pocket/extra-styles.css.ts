import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'

/**
 * Pocket-specific CSS rules complementing the mobile shell stylesheet:
 * safe-area landscape insets, keyboard composer lift, settling recovery,
 * optional rightbar header layout, mobile font override, touch target padding,
 * and the Mobile File Preview Bottom Sheet.
 */
export const POCKET_EXTRA_CSS = `/* Pocket layout-gated & coarse-pointer styles */
  /* ---------- iOS double-tap zoom guard inside conversation scroll containers ---------- */
  body[data-dsh-pocket-layout="mobile"] [data-mobile-nav="frame"] [class*="scrollBody"] {
    touch-action: pan-y pinch-zoom !important;
  }

  /* ---------- Pinch-zoom toggle (default off in mobile layout) ---------- */
  body[data-dsh-pocket-layout="mobile"][data-dsh-pocket-pinch-zoom="off"],
  body[data-dsh-pocket-layout="mobile"][data-dsh-pocket-pinch-zoom="off"] [data-mobile-nav="frame"] [class*="scrollBody"] {
    touch-action: pan-y !important;
  }

  /* ---------- Hide "Add workspace" buttons in mobile layout ---------- */
  body[data-dsh-pocket-layout="mobile"] button[aria-label="添加工作区"],
  body[data-dsh-pocket-layout="mobile"] button[aria-label="添加工作区…"],
  body[data-dsh-pocket-layout="mobile"] button[aria-label="Add workspace"],
  body[data-dsh-pocket-layout="mobile"] button[aria-label="Add workspace…"] {
    display: none !important;
  }

  /* ---------- Optional inline copy button when file preview mode is off ---------- */
  [data-mobile-nav="copy-file"] {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    margin-left: 6px !important;
    vertical-align: baseline !important;
    position: relative;
    height: 28px !important;
    padding: 0 10px !important;
    border: 0.5px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, .24)) !important;
    border-radius: var(--dsw-radius-sm, 8px) !important;
    background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, .08)) !important;
    color: var(--dsw-alias-label-primary, inherit) !important;
    font-family: inherit !important;
    font-size: 12px !important;
    font-weight: 500 !important;
    line-height: 1 !important;
    cursor: pointer !important;
    -webkit-tap-highlight-color: transparent !important;
  }
  [data-mobile-nav="copy-file"]::after {
    content: "";
    position: absolute;
    inset: -8px -6px;
  }
  [data-mobile-nav="copy-file"]:active {
    background: var(--dsw-alias-interactive-bg-active, rgba(127, 127, 127, .16)) !important;
  }
  [data-mobile-nav="copy-file"][disabled] {
    opacity: .55 !important;
    cursor: default !important;
  }

  /* ---------- Back-to-bottom pill 44pt+ hit target & hover guard ---------- */
  [data-mobile-nav="back-to-bottom"]::after {
    content: "";
    position: absolute;
    inset: -4px;
  }
  @media (hover: hover) {
    [data-mobile-nav="back-to-bottom"]:hover {
      background: var(--dsw-alias-bg-layer-3, var(--dsw-alias-interactive-bg-hover, #282e3d)) !important;
    }
  }
  [data-mobile-nav="back-to-bottom"]:active {
    transform: scale(0.95);
  }

  /* ---------- Mobile File Preview Bottom Sheet ---------- */
  @keyframes dsh-pocket-sheet-rise {
    from { transform: translateY(18px); opacity: 0.92; }
    to { transform: none; opacity: 1; }
  }
  @keyframes dsh-pocket-skeleton-pulse {
    0%, 100% { opacity: 0.45; }
    50% { opacity: 0.9; }
  }
  [data-mobile-nav="file-preview-backdrop"] {
    position: fixed;
    inset: 0;
    z-index: 2147483440;
    background: rgba(0, 0, 0, 0.45);
    -webkit-tap-highlight-color: transparent;
  }
  [data-mobile-nav="file-preview-sheet"] {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2147483450;
    max-height: 82vh;
    max-height: min(82vh, calc(100dvh - env(safe-area-inset-top, 0px) - 24px));
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: env(safe-area-inset-left, 0px);
    padding-right: env(safe-area-inset-right, 0px);
    padding-bottom: env(safe-area-inset-bottom, 0px);
    border-radius: var(--dsw-radius-panel, 28px) var(--dsw-radius-panel, 28px) 0 0;
    border-top: 0.5px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.22));
    background: var(--dsw-alias-bg-layer-1, #171b24);
    color: var(--dsw-alias-label-primary, #f3f4f6);
    box-shadow: var(--dsw-elevation-prominent, 0 -12px 40px rgba(0, 0, 0, 0.28));
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    animation: dsh-pocket-sheet-rise 0.18s var(--ds-ease-out, ease-out);
    outline: none;
  }
  [data-mobile-nav="file-preview-skeleton-line"] {
    height: 12px;
    border-radius: 999px;
    corner-shape: round;
    background: var(--dsw-alias-bg-layer-3, rgba(127, 127, 127, 0.18));
    animation: dsh-pocket-skeleton-pulse 1.2s ease-in-out infinite;
  }
  @media (hover: hover) {
    [data-mobile-nav="file-preview-copy"]:hover:not(:disabled),
    [data-mobile-nav="file-preview-close"]:hover {
      background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.14)) !important;
    }
  }
  [data-mobile-nav="file-preview-copy"]:active:not(:disabled),
  [data-mobile-nav="file-preview-close"]:active {
    background: var(--dsw-alias-interactive-bg-active, rgba(127, 127, 127, 0.2)) !important;
  }
  [data-mobile-nav="file-preview-copy"]:disabled {
    opacity: 0.45;
    cursor: default !important;
  }
  @media (prefers-reduced-motion: reduce) {
    [data-mobile-nav="file-preview-sheet"],
    [data-mobile-nav="file-preview-skeleton-line"],
    [data-mobile-nav="back-to-bottom"] {
      animation: none !important;
      transition: none !important;
    }
  }

@media (max-width: 1023px) and (pointer: coarse) {
  /* ---------- Session header rightbar corner coexistence ---------- */
  html body[data-dsh-pocket-layout="mobile"][data-dsh-pocket-mobile-rightbar="off"] [data-conversation-header-corner] {
    display: none !important;
  }
  body[data-dsh-pocket-layout="mobile"]:not([data-dsh-pocket-mobile-rightbar="off"]) [data-conversation-header-corner] {
    display: flex !important;
    flex: 0 0 auto !important;
    margin-left: 4px !important;
    margin-right: 0 !important;
  }
  body[data-dsh-pocket-layout="mobile"]:not([data-dsh-pocket-mobile-rightbar="off"]) [data-conversation-header-corner] button {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
    min-height: 36px !important;
  }
  body[data-dsh-pocket-layout="mobile"]:not([data-dsh-pocket-mobile-rightbar="off"]) [data-mobile-nav="files"] {
    right: 44px !important;
  }

  /* ---------- Independent mobile content font size ---------- */
  body[data-dsh-pocket-layout="mobile"][data-dsh-pocket-mobile-font] {
    --dsh-content-font-size: var(--dsh-pocket-mobile-font-size) !important;
  }

  /* ---------- Suppress touch-triggered session-row hover card ---------- */
  body [role="button"][class*="_card"][class*="_copyable"] {
    display: none !important;
  }

  /* ---------- Hide redundant rightbar expand button on blank hero phase ---------- */
  [data-phase="hero"] button[data-sidebar-right-expand] {
    display: none !important;
  }

  /* ---------- Coarse-pointer touch target expansion ---------- */
  [data-phase] [data-composer-card] button:not(:disabled),
  [data-phase="hero"] button:not([data-mobile-nav]):not(:disabled),
  button[aria-label*="侧边栏"]:not(:disabled):not([aria-modal] *),
  button[aria-label*="right sidebar" i]:not(:disabled):not([aria-modal] *),
  button[aria-label*="搜索会话"]:not(:disabled):not([aria-modal] *),
  button[aria-label*="视图选项"]:not(:disabled):not([aria-modal] *),
  button[aria-label*="新建会话"]:not(:disabled):not([aria-modal] *),
  button[aria-label*="展开其余"]:not(:disabled):not([aria-modal] *),
  [data-phase] button[aria-label*="智能体团队"]:not(:disabled),
  [data-phase] button[aria-label*="更多操作"]:not(:disabled),
  [data-phase] button[aria-label^="Watcher"]:not(:disabled) {
    position: relative;
  }
  [data-phase="hero"] button:not([data-mobile-nav]):not(:disabled)::after,
  button[aria-label*="侧边栏"]:not(:disabled):not([aria-modal] *)::after,
  button[aria-label*="right sidebar" i]:not(:disabled):not([aria-modal] *)::after,
  button[aria-label*="搜索会话"]:not(:disabled):not([aria-modal] *)::after,
  button[aria-label*="视图选项"]:not(:disabled):not([aria-modal] *)::after,
  button[aria-label*="新建会话"]:not(:disabled):not([aria-modal] *)::after,
  button[aria-label*="展开其余"]:not(:disabled):not([aria-modal] *)::after,
  [data-phase] button[aria-label*="智能体团队"]:not(:disabled)::after,
  [data-phase] button[aria-label*="更多操作"]:not(:disabled)::after,
  [data-phase] button[aria-label^="Watcher"]:not(:disabled)::after {
    content: "";
    position: absolute;
    inset: -5px -2px;
  }
  [data-phase] [data-composer-card] button:not(:disabled)::after {
    content: "";
    position: absolute;
    inset: -8px;
  }

  /* ---------- H5 Landscape notch safe-area left/right insets ---------- */
  [data-mobile-nav="frame"],
  div[class*="_frame"]:has(> div[class*="_centerCol"]) {
    padding-left: env(safe-area-inset-left, 0px) !important;
    padding-right: env(safe-area-inset-right, 0px) !important;
  }
  [data-mobile-nav="frame"] > :first-child,
  div[class*="_frame"]:has(> div[class*="_centerCol"]) > :first-child {
    padding-left: env(safe-area-inset-left, 0px) !important;
  }
  [data-mobile-nav="fab"] {
    left: max(10px, env(safe-area-inset-left, 0px)) !important;
  }

  /* ---------- M3 Keyboard-active overlay coordination ---------- */
  [data-mobile-nav="delete-dialog"] {
    transform: translateY(calc(-0.5 * var(--dshp-kb, 0px))) !important;
  }

  /* ---------- M3b Keyboard-active composer seat lift ----------
     Do NOT use translateY here: transform turns the seat into a containing block
     for fixed popovers inside the composer subtree (e.g. the plus menu) and breaks
     their viewport anchoring. Sticky bottom + transform:none neutralizes inline lifts. */
  html[data-dshp-kb="open"] [data-mobile-nav="frame"] [class*="_composerSeat"],
  html[data-dshp-kb="open"] div[class*="_frame"] [class*="_composerSeat"],
  html[data-dshp-kb="open"] [data-mobile-nav="frame"] [data-phase] [class*="_composerSeat"] {
    position: sticky !important;
    bottom: var(--dshp-kb, 0px) !important;
    transform: none !important;
  }

  /* ---------- Stale settling fallback: restore composer visibility ---------- */
  html [data-phase="settling"][data-dshp-settling-stale] [class*="_composerSeat"],
  html [data-content-phase="settling"][data-dshp-settling-stale] [class*="_composerSeat"] {
    visibility: visible !important;
  }

  /* ---------- iOS standalone short-layout-viewport full-height chain ---------- */
  html[data-dsh-pocket-full-height],
  html[data-dsh-pocket-full-height] body {
    height: var(--dshp-frame-h, 100%) !important;
  }
  html[data-dsh-pocket-full-height] [data-mobile-nav="frame"] {
    height: var(--dshp-frame-h, 100%) !important;
    max-height: var(--dshp-frame-h, 100%) !important;
  }

  /* ---------- M10 44pt minimum touch targets for critical controls ---------- */
  [data-mobile-nav="delete-confirm-actions"] > button {
    min-height: 44px !important;
  }
  [data-mobile-nav="fab"] {
    min-width: 44px !important;
    min-height: 44px !important;
  }

  /* ---------- 键盘期禁过渡 (suppress layout lag during keyboard animation) ---------- */
  html[data-dshp-kb="open"] [data-mobile-nav="frame"],
  html[data-dshp-kb="open"] [data-conversation-scroll],
  html[data-dshp-kb="open"] [data-composer-seat],
  html[data-dshp-kb="open"] [class*="_composerSeat"] {
    transition: none !important;
  }
}`

/** Injects `POCKET_EXTRA_CSS` into `<head>` with hot-swap deduplication. */
export function installPocketExtraStyles(ctx: ClientContext): void {
  ctx.effect(() => {
    for (const stale of document.querySelectorAll('style[data-plugin-css="dsh-pocket/mobile-extras.css"]')) {
      stale.remove()
    }
    const tag = document.createElement('style')
    tag.dataset.plugin = 'dsh-pocket'
    tag.dataset.pluginCss = 'dsh-pocket/mobile-extras.css'
    tag.textContent = POCKET_EXTRA_CSS
    document.head.appendChild(tag)
    return () => {
      tag.remove()
    }
  }, 'dsh-pocket: mobile extra styles')
}
