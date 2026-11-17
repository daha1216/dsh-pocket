import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { ArmOnNarrow } from './zoom-and-dialog.ts'
import type { PocketTextFn } from './link-and-settling.ts'

const DOWN_ARROW_SVG =
  '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">' +
  '<path d="M9 3.75v10.5M4.5 9.75L9 14.25l4.5-4.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>'

/**
 * Installs viewport & floating chrome enhancements:
 * 1. `--dshp-kb` + `data-dshp-kb="open"` keyboard height variable.
 * 2. First-visit onboarding card (`first-visit-tips`) styled with `--dsw-alias-*` & R20.
 * 3. Dark-mode-aware `back-to-bottom` pill with zero polling timers (`scroll` + `ResizeObserver` + structural `MutationObserver`).
 * 4. iOS standalone A2HS short-layout-viewport & scroll-residue guard.
 */
export function installViewportAndChrome(
  _ctx: ClientContext,
  armOnNarrow: ArmOnNarrow,
  pocketText: PocketTextFn,
): void {
  armOnNarrow('dsh-pocket: keyboard height css var (--dshp-kb)', () => {
    const vv = window.visualViewport
    if (vv === null || vv === undefined) return () => {}
    const root = document.documentElement
    let raf = 0
    let last = ''
    let lastKb = 0
    let liftActive = false
    let seatEl: HTMLElement | null = null

    const findSeat = (): HTMLElement | null => {
      if (
        seatEl !== null &&
        seatEl.isConnected &&
        seatEl.matches('[data-composer-seat]') &&
        seatEl.getClientRects().length > 0
      ) {
        return seatEl
      }
      seatEl =
        Array.from(document.querySelectorAll<HTMLElement>('[data-composer-seat]')).find(
          (el) => el.getClientRects().length > 0,
        ) ?? null
      return seatEl
    }

    const write = (): void => {
      raf = 0
      const raw = Math.max(0, window.innerHeight - vv.height - vv.offsetTop)
      let occl = 0
      if (Math.abs(vv.scale - 1) < 0.01) {
        const seat = findSeat()
        if (seat !== null) {
          const restBottom = seat.getBoundingClientRect().bottom + (liftActive ? lastKb : 0)
          occl = Math.max(0, restBottom - vv.height)
        }
      }
      const kb = Math.min(Math.max(raw, occl), Math.round(window.innerHeight * 0.6))
      lastKb = kb
      liftActive = kb > 0
      const value = `${Math.round(kb)}px`
      if (value === last) return
      last = value
      root.style.setProperty('--dshp-kb', value)
      if (kb > 0) root.setAttribute('data-dshp-kb', 'open')
      else root.removeAttribute('data-dshp-kb')
    }

    const schedule = (): void => {
      if (raf === 0) raf = requestAnimationFrame(write)
    }
    vv.addEventListener('resize', schedule)
    vv.addEventListener('scroll', schedule)
    write()
    return () => {
      vv.removeEventListener('resize', schedule)
      vv.removeEventListener('scroll', schedule)
      if (raf !== 0) cancelAnimationFrame(raf)
      seatEl = null
      root.style.removeProperty('--dshp-kb')
      root.removeAttribute('data-dshp-kb')
    }
  })

  armOnNarrow('dsh-pocket: first-visit tips', () => {
    const KEY = 'dsh-pocket:first-visit-tips:v1'
    let seen = true
    try {
      seen = window.localStorage.getItem(KEY) !== null
    } catch {
      /* private mode: skip rather than nagging every visit */
    }
    if (seen) return () => {}

    const markSeen = (): void => {
      try {
        window.localStorage.setItem(KEY, '1')
      } catch {
        /* ignore quota errors */
      }
    }

    let card: HTMLDivElement | null = null
    let closeTimer = 0
    const dismiss = (): void => {
      markSeen()
      window.clearTimeout(closeTimer)
      closeTimer = 0
      card?.remove()
      card = null
    }

    card = document.createElement('div')
    card.setAttribute('data-mobile-nav', 'first-visit-tips')
    card.setAttribute('role', 'dialog')
    card.setAttribute('aria-label', pocketText('tipsTitle', '这是电脑上 DSH 的手机界面'))
    card.style.cssText =
      "position:fixed;left:max(12px, env(safe-area-inset-left, 0px));right:max(12px, env(safe-area-inset-right, 0px));bottom:calc(env(safe-area-inset-bottom, 0px) + 76px);z-index:2147483500;max-width:420px;margin:0 auto;padding:16px 18px;border-radius:var(--dsw-radius-xl, 20px);border:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.22));background:var(--dsw-alias-bg-layer-2, #1f2430);color:var(--dsw-alias-label-primary, #f3f4f6);font:400 13px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:var(--dsw-elevation-prominent, 0 12px 32px rgba(0,0,0,.28))"

    const title = document.createElement('div')
    title.textContent = pocketText('tipsTitle', '这是电脑上 DSH 的手机界面')
    title.style.cssText =
      'font-weight:500;font-size:14px;line-height:1.4;margin-bottom:6px;color:var(--dsw-alias-label-primary, #f3f4f6)'

    const body = document.createElement('div')
    body.textContent = pocketText(
      'tipsBody',
      '与电脑实时同步，不是另一个应用。\n· 右滑（或点左上角）打开会话抽屉\n· 断线会自动重连，不用手动刷新\n· 字号、键盘、右边栏都在设置页「手机访问」里',
    )
    body.style.cssText = 'white-space:pre-line;color:var(--dsw-alias-label-secondary, #cbd5e1)'

    const ok = document.createElement('button')
    ok.type = 'button'
    ok.textContent = pocketText('tipsDismiss', '知道了')
    ok.style.cssText =
      "margin-top:12px;height:32px;padding:0 14px;border:0.5px solid var(--dsw-alias-border-l2, rgba(127,127,127,.28));border-radius:var(--dsw-radius-md, 12px);background:var(--dsw-alias-bg-layer-3, rgba(127,127,127,.12));color:var(--dsw-alias-label-primary, #f3f4f6);font:500 13px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;cursor:pointer;-webkit-tap-highlight-color:transparent"
    ok.addEventListener('click', dismiss)

    card.append(title, body, ok)
    document.body.appendChild(card)
    closeTimer = window.setTimeout(dismiss, 12_000)

    return () => {
      window.clearTimeout(closeTimer)
      card?.remove()
      card = null
    }
  })

  armOnNarrow('dsh-pocket: back to bottom pill', () => {
    const AWAY_PX = 280
    let pill: HTMLButtonElement | null = null
    let raf = 0
    let shown = false
    let observedScroller: HTMLElement | null = null
    let observedContent: Element | null = null
    let observedSeat: HTMLElement | null = null

    const visibleScroller = (): HTMLElement | null => {
      const nodes = document.querySelectorAll<HTMLElement>('[data-conversation-scroll]')
      for (const node of Array.from(nodes)) {
        if (node.getClientRects().length > 0) return node
      }
      return null
    }

    const visibleSeat = (): HTMLElement | null =>
      Array.from(document.querySelectorAll<HTMLElement>('[data-composer-seat]')).find(
        (el) => el.getClientRects().length > 0,
      ) ?? null

    const pillBottom = (): number => {
      const seat = visibleSeat()
      if (seat === null) return 92
      return Math.max(12, window.innerHeight - seat.getBoundingClientRect().top + 12)
    }

    const hide = (): void => {
      if (!shown) return
      shown = false
      if (pill !== null) pill.style.display = 'none'
    }

    const place = (): void => {
      if (pill === null) return
      const bottom = `${pillBottom()}px`
      if (pill.style.bottom !== bottom) pill.style.bottom = bottom
    }

    const ensurePill = (): HTMLButtonElement => {
      if (pill !== null && pill.isConnected) return pill
      pill = document.createElement('button')
      pill.type = 'button'
      pill.setAttribute('data-mobile-nav', 'back-to-bottom')
      pill.setAttribute('aria-label', pocketText('backToBottom', '回到底部'))
      pill.innerHTML = DOWN_ARROW_SVG
      pill.style.cssText =
        'position:fixed;right:max(14px, env(safe-area-inset-right, 0px));z-index:2147483400;width:40px;height:40px;border-radius:50%;corner-shape:round;border:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.24));background:var(--dsw-alias-bg-layer-2, #1f2430);color:var(--dsw-alias-label-primary, #f3f4f6);box-shadow:var(--dsw-elevation-panel, 0 4px 14px rgba(0,0,0,.22));display:none;align-items:center;justify-content:center;padding:0;cursor:pointer;-webkit-tap-highlight-color:transparent'
      pill.addEventListener('click', () => {
        const el = visibleScroller()
        if (el !== null) {
          try {
            el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
          } catch {
            el.scrollTop = el.scrollHeight
          }
        }
        hide()
      })
      document.body.appendChild(pill)
      return pill
    }

    const schedule = (): void => {
      if (raf === 0) raf = requestAnimationFrame(update)
    }

    const resizeObserver =
      typeof ResizeObserver === 'function'
        ? new ResizeObserver(() => {
            if (shown) place()
            schedule()
          })
        : null

    const syncObservedNodes = (scroller: HTMLElement | null): void => {
      if (resizeObserver === null) return
      const content = scroller?.firstElementChild ?? null
      const seat = visibleSeat()
      if (scroller === observedScroller && content === observedContent && seat === observedSeat) {
        return
      }
      resizeObserver.disconnect()
      observedScroller = scroller
      observedContent = content
      observedSeat = seat
      if (scroller !== null) resizeObserver.observe(scroller)
      if (content !== null) resizeObserver.observe(content)
      if (seat !== null) resizeObserver.observe(seat)
    }

    function update(): void {
      raf = 0
      if (document.visibilityState !== 'visible') {
        hide()
        return
      }
      const el = visibleScroller()
      syncObservedNodes(el)
      if (el === null || el.scrollHeight - el.scrollTop - el.clientHeight <= AWAY_PX) {
        hide()
        return
      }
      const node = ensurePill()
      place()
      if (!shown) {
        node.style.display = 'flex'
        shown = true
      }
    }

    const onViewport = (): void => {
      if (shown) place()
      schedule()
    }

    const onScroll = (event: Event): void => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest('[data-conversation-scroll]') !== null) schedule()
    }

    // Event-driven session switch & streaming block mount hook (zero idle polling timers).
    const mutationObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type !== 'childList') continue
        for (const n of m.addedNodes) {
          if (n.nodeType === 1) {
            schedule()
            return
          }
        }
        for (const n of m.removedNodes) {
          if (n.nodeType === 1) {
            schedule()
            return
          }
        }
      }
    })

    document.addEventListener('scroll', onScroll, { capture: true, passive: true })
    window.addEventListener('resize', onViewport)
    window.visualViewport?.addEventListener('resize', onViewport)
    document.addEventListener('visibilitychange', schedule)
    mutationObserver.observe(document.body, { childList: true, subtree: true })
    schedule()

    return () => {
      if (raf !== 0) cancelAnimationFrame(raf)
      resizeObserver?.disconnect()
      mutationObserver.disconnect()
      observedScroller = null
      observedContent = null
      observedSeat = null
      document.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onViewport)
      window.visualViewport?.removeEventListener('resize', onViewport)
      document.removeEventListener('visibilitychange', schedule)
      pill?.remove()
      pill = null
      shown = false
    }
  })

  armOnNarrow('dsh-pocket: standalone viewport guard (scroll residue / short layout viewport)', () => {
    const vv = window.visualViewport
    if (vv === null || vv === undefined) return () => {}
    const root = document.documentElement
    let raf = 0
    let shortSince = 0
    let applied = false
    let diagEl: HTMLDivElement | null = null
    let diagTimer = 0
    const wantDiag = new URLSearchParams(window.location.search).has('dshp-diag')

    const showDiag = (auto: boolean): void => {
      if (diagEl === null) {
        diagEl = document.createElement('div')
        diagEl.dataset.dshPocketDiag = '1'
        diagEl.style.cssText =
          'position:fixed;top:calc(env(safe-area-inset-top, 0px) + 2px);left:2px;z-index:2147483647;font:10px/1.4 ui-monospace,Menlo,Consolas,monospace;background:rgba(0,0,0,.65);color:#4ade80;padding:2px 6px;border-radius:4px;pointer-events:none;white-space:normal;width:calc(100vw - 8px);word-break:break-all'
        document.body.appendChild(diagEl)
      }
      const seatEl =
        Array.from(document.querySelectorAll<HTMLElement>('[data-composer-seat]')).find(
          (el) => el.getClientRects().length > 0,
        ) ?? null
      const sbEl = seatEl?.closest<HTMLElement>('[data-conversation-scroll]') ?? null
      const vaEl = sbEl?.querySelector<HTMLElement>('[class*="_viewArea"]') ?? null
      let colNote = ' va=-/col=-/nz=-'
      if (vaEl !== null) {
        colNote = ` va=${Math.round(vaEl.getBoundingClientRect().height)}/col=-/nz=-`
        let n: HTMLElement | null = vaEl
        for (let i = 0; i < 6 && n !== null; i += 1) {
          if (n.children.length > 10) {
            const nz = Array.from(n.children).filter(
              (c) => (c as HTMLElement).offsetHeight > 0,
            ).length
            colNote = ` va=${Math.round(vaEl.getBoundingClientRect().height)} col=${Math.round(n.getBoundingClientRect().height)} nz=${nz}/${n.children.length}`
            break
          }
          n = n.firstElementChild as HTMLElement | null
        }
      }
      const sbNote =
        sbEl === null ? '' : ` sb=${sbEl.clientHeight}/${sbEl.scrollHeight}@${Math.round(sbEl.scrollTop)}`
      const seatNote =
        seatEl === null ? '' : ` seatB=${Math.round(seatEl.getBoundingClientRect().bottom)}`
      const kbc = getComputedStyle(root).getPropertyValue('--dshp-kb').trim() || '0px'
      const kbf = root.hasAttribute('data-dshp-kb') ? 1 : 0
      diagEl.textContent = `tag=v4.0 ih=${window.innerHeight} vv=${Math.round(vv.height)} off=${Math.round(vv.offsetTop)} sc=${vv.scale.toFixed(2)} sy=${window.scrollY}${sbNote}${seatNote}${colNote} kbc=${kbc}/f=${kbf}`
      if (auto) {
        window.clearTimeout(diagTimer)
        diagTimer = window.setTimeout(() => {
          diagEl?.remove()
          diagEl = null
        }, 8000)
      }
    }

    const check = (): void => {
      raf = 0
      const kbClosed = vv.height >= window.innerHeight - 8
      const short = Math.abs(vv.scale - 1) < 0.01 && vv.height - window.innerHeight > 8
      if (short) {
        if (shortSince === 0) shortSince = performance.now()
        if (!applied && performance.now() - shortSince > 600) {
          applied = true
          root.style.setProperty('--dshp-frame-h', `${Math.round(vv.height)}px`)
          root.style.setProperty('--dshp-vh-diff', `${Math.round(vv.height - window.innerHeight)}px`)
          root.setAttribute('data-dsh-pocket-full-height', '')
          const sb =
            Array.from(document.querySelectorAll<HTMLElement>('[data-conversation-scroll]')).find(
              (el) => el.getClientRects().length > 0,
            ) ?? null
          if (sb !== null && sb.scrollHeight - sb.scrollTop - sb.clientHeight <= 8) {
            requestAnimationFrame(() => {
              if (applied && sb.isConnected) sb.scrollTop = sb.scrollHeight
            })
          }
          showDiag(true)
        }
      } else {
        shortSince = 0
        if (applied) {
          applied = false
          root.style.removeProperty('--dshp-frame-h')
          root.style.removeProperty('--dshp-vh-diff')
          root.removeAttribute('data-dsh-pocket-full-height')
        }
      }
      if (!applied && kbClosed && (window.scrollY > 1 || vv.offsetTop > 1)) window.scrollTo(0, 0)
      if (wantDiag) showDiag(false)
    }

    const schedule = (): void => {
      if (raf === 0) raf = requestAnimationFrame(check)
    }
    vv.addEventListener('resize', schedule)
    vv.addEventListener('scroll', schedule)
    window.addEventListener('focusout', schedule)
    window.addEventListener('pageshow', schedule)
    check()

    return () => {
      vv.removeEventListener('resize', schedule)
      vv.removeEventListener('scroll', schedule)
      window.removeEventListener('focusout', schedule)
      window.removeEventListener('pageshow', schedule)
      if (raf !== 0) cancelAnimationFrame(raf)
      window.clearTimeout(diagTimer)
      diagEl?.remove()
      root.style.removeProperty('--dshp-frame-h')
      root.style.removeProperty('--dshp-vh-diff')
      root.removeAttribute('data-dsh-pocket-full-height')
    }
  })
}
