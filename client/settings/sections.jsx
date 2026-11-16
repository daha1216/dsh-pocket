// 设置页三个分区 + 页面级弹窗：纯渲染，状态与操作全部来自 use-settings.js 的 hook。
// 分区顺序即页面顺序：连接（局域网 → 轻量视图 → 公网）→ 手机端偏好 → 维护。
import { createElement as h } from 'react';

import { fmt, copyText, fmtBytes, MOBILE_FONT_OPTIONS } from './util.js';
import { Alert, Btn, Card, Ico, Modal, QRBlock, Row, Switch } from './ui.jsx';

// ── 连接区：局域网卡 → 轻量视图入口 → 公网卡 ──────────────────────────────
export function renderConnection(s) {
  const { t, status, pending, publicView, errText, showToast, elapsed } = s;

  // 访问密码值行：遮罩（固定 8 个点，不泄露长度）/明文 + 显示/隐藏 + 额外按钮
  const pinValueRow = (which, value, extraBtns) => h('div', { className: 'dshp-pinbox' },
    h('span', { className: 'dshp-pin-value', 'data-dshp-pin': which }, s.pinShown[which] ? value : '••••••••'),
    Btn({
      variant: 'ghost', mini: true,
      onClick: () => s.setPinShown((m) => ({ ...m, [which]: !m[which] })),
    }, s.pinShown[which] ? t('pinHide') : t('pinShow')),
    ...(extraBtns ?? []));

  // 自定义密码输入行：输入框 + 保存/取消
  const customPinRow = (which) => h('div', { className: 'dshp-adv' },
    h('div', { className: 'dshp-custom' },
      h('span', null, t('customizing')),
      h('input', {
        className: 'dshp-input is-mono',
        style: { width: 150, textAlign: 'center' },
        type: 'password', minLength: 8, maxLength: 64,
        name: 'dsh-pocket-pin', autoComplete: 'new-password', spellCheck: false,
        value: s.customPin?.value ?? '', autoFocus: true,
        // 过滤掉字母数字以外的字符（服务端也只收 [a-zA-Z0-9]），但不能再静默吞：
        // 粘贴全角/中文时用户得知道字符被忽略了，否则只会看到「长度不够」。
        onChange: (e) => {
          const raw = e.target.value;
          const filtered = raw.replace(/[^a-zA-Z0-9]/g, '');
          s.setCustomPin((c) => ({
            ...c,
            value: filtered,
            err: filtered.length === raw.length ? null : t('pinCharsFiltered'),
          }));
        },
        onKeyDown: (e) => { if (e.key === 'Enter') s.saveCustomPin(which); if (e.key === 'Escape') s.setCustomPin(null); },
      }),
      Btn({ variant: 'primary', mini: true, onClick: () => s.saveCustomPin(which), disabled: pending.savePin === true }, t('save')),
      Btn({ variant: 'ghost', mini: true, onClick: () => s.setCustomPin(null), disabled: pending.savePin === true }, t('cancel'))),
    s.customPin?.err ? h('div', { className: 'dshp-err-text' }, errText(s.customPin.err)) : null);

  const customBtn = (which) => Btn({ variant: 'ghost', mini: true, onClick: () => s.setCustomPin({ which, value: '', err: null }) }, t('customize'));

  // ── 公网卡片的派生片段（拆开写，避免多层三元把 JSX 括号搞乱）─────────────
  const wanStatusView = s.tunnelStarting
    ? Alert({
      kind: 'info', icon: Ico.info,
      children: s.tunnelPhase === 'downloading'
        ? fmt(t, 'downloading', { s: elapsed(s.tunnelStateStarted) })
        : fmt(t, 'connecting', { s: elapsed(s.tunnelStateStarted), suffix: elapsed(s.tunnelStateStarted) > 30 ? t('slowHint') : '' }),
    })
    : s.tunnelPhase === 'error'
      ? Alert({ kind: 'error', icon: Ico.warn, children: fmt(t, 'error', { detail: errText(s.tunnelStateDetail) || t('unknownError') }) })
      : (!s.tunnelUrl && s.publicConfigured
        ? Alert({
          kind: 'info', icon: Ico.info, children: t('wanOffHint'),
          extra: h('div', { style: { marginTop: 8 } },
            Btn({ variant: 'primary', onClick: s.startTunnel, disabled: pending.wan === true || pending.saveNamed === true }, t('enable'))),
        })
        : null);

  const namedSummaryView = s.publicConfigured && !s.tunnelCfg
    ? h('div', { className: 'dshp-panel' },
      h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 10 } },
        h('div', { style: { flex: 1, minWidth: 0 } },
          h('div', { className: 'dshp-panel-title' }, s.tunnelConfig.hostname || '—'),
          h('div', { className: 'dshp-hint', style: { marginTop: 2 } },
            s.tunnelConfig.tokenSet ? t('namedTokenSet') : t('namedTokenMissing'))),
        Btn({ variant: 'ghost', mini: true, onClick: () => s.setTunnelCfg({ hostname: s.tunnelConfig.hostname ?? '', token: '', err: null }) }, t('namedEdit'))),
      h('div', { className: 'dshp-hint', style: { marginTop: 8, lineHeight: 1.65 } }, t('namedHow')),
      !s.tunnelConfig.tokenSet || !s.tunnelConfig.hostname ? h('div', { className: 'dshp-err-text' }, t('namedNeedCfg')) : null)
    : null;

  const namedFormView = s.tunnelCfg
    ? h('div', { className: 'dshp-form' },
      h('label', { className: 'dshp-field' }, t('namedHostnameLabel'),
        h('input', {
          className: 'dshp-input',
          placeholder: 'pocket.example.com',
          value: s.tunnelCfg.hostname ?? '',
          autoFocus: true,
          onChange: (e) => s.setTunnelCfg((c) => ({ ...c, hostname: e.target.value.trim(), err: null })),
          onKeyDown: (e) => { if (e.key === 'Enter') s.saveNamedTunnel(); if (e.key === 'Escape') s.setTunnelCfg(null); },
        })),
      h('label', { className: 'dshp-field' }, t('namedTokenLabel'),
        h('input', {
          className: 'dshp-input is-mono',
          type: 'password',
          name: 'dsh-pocket-tunnel-token', autoComplete: 'off', spellCheck: false,
          value: s.tunnelCfg.token ?? '',
          onChange: (e) => s.setTunnelCfg((c) => ({ ...c, token: e.target.value.trim(), err: null })),
          onKeyDown: (e) => { if (e.key === 'Enter') s.saveNamedTunnel(); if (e.key === 'Escape') s.setTunnelCfg(null); },
        })),
      h('div', { className: 'dshp-inline' },
        Btn({ variant: 'primary', mini: true, onClick: s.saveNamedTunnel, disabled: pending.saveNamed === true }, t('save')),
        Btn({ variant: 'ghost', mini: true, onClick: () => s.setTunnelCfg(null), disabled: pending.saveNamed === true }, t('cancel'))),
      h('div', { className: 'dshp-hint' }, t('namedHow')),
      h('div', { className: 'dshp-warn-text' }, t('namedSecurity')),
      s.tunnelCfg.err ? h('div', { className: 'dshp-err-text' }, errText(s.tunnelCfg.err)) : null)
    : null;

  const publicConfigView = h('div', { className: 'dshp-adv' },
    s.tunnelConfigChanged ? h('div', { className: 'dshp-warn-text' }, t('namedTakeEffect')) : null,
    !s.publicConfigured && !s.tunnelCfg ? Alert({
      kind: 'info', icon: Ico.info, children: t('publicSetupHint'),
      extra: h('div', { style: { marginTop: 8 } },
        Btn({ variant: 'primary', onClick: s.openTunnelConfig }, t('publicConfigure'))),
    }) : null,
    namedSummaryView,
    namedFormView);

  const publicPinView = status?.accessToken
    ? Row({
      label: t('pinLabel'),
      stack: true,
      extra: s.customPin?.which === 'public'
        ? customPinRow('public')
        : h('div', null,
          pinValueRow('public', status.accessToken, [customBtn('public')]),
          h('div', { className: 'dshp-warn-text' }, t('namedSecurity'))),
    })
    : null;

  const wanBody = h('div', null,
    s.tunnelUrl ? QRBlock({ src: status.tunnelQr, url: s.tunnelUrl, hint: t('namedRunningHint'), t, toast: showToast }) : null,
    Row({ label: t('publicConfig'), stack: true, extra: publicConfigView }),
    s.publicConfigured || s.tunnelUrl ? publicPinView : null);

  // ── 局域网卡：总开关 → 二维码 → 访问密码 → 高级（手动选地址）────────────
  const lanCard = Card({
    key: 'lan', icon: Ico.lan, title: t('lanAccess'), sub: t('lanHint'),
    right: Switch(status?.lanEnabled !== false, () => s.requestLanToggle(status?.lanEnabled === false), !status || pending.lanToggle === true || publicView, t('lanAccess')),
    children: publicView
      ? h('div', { className: 'dshp-hint' }, t('lanLocalOnly'))
      : !status
      ? h('div', { className: 'dshp-loading' }, t('loadingStatus'))
      : status.lanEnabled === false
        ? Alert({
          kind: 'info', icon: Ico.info, children: t('lanDisabledHint'),
          extra: h('div', { style: { marginTop: 8 } },
            Btn({ variant: 'primary', onClick: () => s.requestLanToggle(true), disabled: pending.lanToggle === true }, t('lanToggleTitleOn'))),
        })
        : (s.lanUrl
          ? h('div', null,
            QRBlock({ src: status.lanQr, url: s.lanUrl, hint: null, t, toast: showToast }),
            Row({
              label: t('lanPin'),
              desc: status?.lanAuthEnabled === false ? t('lanPinOff') : null,
              control: Switch(status?.lanAuthEnabled !== false, () => s.setLanAuth(status?.lanAuthEnabled === false), pending.lanAuth === true, t('lanPin')),
            }),
            status?.lanAuthEnabled === false
              ? null
              : (s.customPin?.which === 'lan'
                ? customPinRow('lan')
                : status.lanToken
                  ? h('div', null,
                    pinValueRow('lan', status.lanToken, [
                      Btn({ variant: 'ghost', mini: true, icon: Ico.refresh, onClick: s.refreshLanPin, disabled: pending.refreshPin === true }, t('refresh')),
                      customBtn('lan'),
                    ]),
                    status.lanPinCustom ? h('div', { className: 'dshp-warn-text' }, t('pinCustomHint')) : null)
                  // 公网访问时后端故意不返回局域网 PIN（防止隧道访客拿到后
                  // 在同一 WiFi 下直连、绕过「关掉隧道」这种撤销手段）。
                  // 本机/局域网拿不到则是读取失败，不要误报成「远端不显示」。
                  : h('div', { className: 'dshp-hint' }, publicView ? t('lanPinRemoteHint') : t('lanPinUnavailable'))),
            Row({
              label: t('advAddress'),
              control: Btn({ variant: 'ghost', mini: true, onClick: () => s.setAdvOpen((v) => !v) }, (status.lanIpOverride || t('lanAddressAuto')) + (s.advOpen ? ' ‹' : ' ›')),
              extra: s.advOpen ? h('div', { className: 'dshp-adv' },
                h('label', { className: 'dshp-field' }, t('lanAddress'),
                  h('select', {
                    className: 'dshp-select',
                    value: status.lanIpOverride || '',
                    disabled: pending.lanAddr === true,
                    onChange: (e) => s.setLanAddress(e.target.value),
                  },
                  h('option', { value: '' }, t('lanAddressAuto')),
                  (status.lanCandidates || []).map((ip) => h('option', { key: ip, value: ip }, ip))))) : null,
            }),
            // 评审 §5.3 #8：局域网直连不是安全上下文，明确标成「调试口径」，
            // 别让人把它当成长期地址（无离线/推送，PIN 走明文 HTTP）。
            h('div', { className: 'dshp-hint' }, t('lanDebugHint')),
          )
          : h('div', { className: 'dshp-hint' }, t('lanStarting'))),
  });

  // ── 轻量视图卡（评审 §7.1 路线 A）─────────────────────────────────────────
  // 代理直出的独立页面：只做「看会话 + 发消息 + 批审批」，不加载宿主 React 界面。
  // 宿主界面仍是默认入口（这里不跳转），它坏了才是这一页兜底；两边共用同一份数据。
  const liteCard = Card({
    key: 'lite', icon: Ico.lite, title: t('liteTitle'), sub: t('liteHint'),
    children: h('div', null,
      Row({
        label: t('liteAddress'),
        desc: t('liteAddressHint'),
        control: Btn({ variant: 'ghost', mini: true, icon: Ico.copy, onClick: async () => showToast(await copyText(s.liteUrl) ? t('copied') : t('copyFailed')) }, t('copyLink')),
      }),
      h('div', { className: 'dshp-hint', style: { wordBreak: 'break-all' } }, s.liteUrl),
      h('div', { className: 'dshp-inline', style: { marginTop: 10 } },
        Btn({ variant: 'primary', mini: true, icon: Ico.lite, onClick: () => { window.open(s.liteUrl, '_blank', 'noopener'); } }, t('liteOpen')))),
  });

  // ── 公网卡：总开关（开=已连隧道）；开启经免责声明弹窗确认 ────────────────
  const wanCard = Card({
    key: 'wan', icon: Ico.wan, title: t('wanAccess'), sub: t('namedWanHint'),
    right: Switch(!!s.tunnelUrl, () => (s.tunnelUrl ? s.stopTunnel() : s.startTunnel()), s.tunnelStarting || pending.wan === true || pending.saveNamed === true || !status || publicView, t('wanAccess')),
    children: publicView
      ? h('div', null,
        s.tunnelUrl ? QRBlock({ src: status?.tunnelQr, url: s.tunnelUrl, hint: t('namedRunningHint'), t, toast: showToast }) : null,
        h('div', { className: 'dshp-hint' }, t('wanLocalOnly')))
      : !status
      ? h('div', { className: 'dshp-loading' }, t('loadingStatus'))
      : h('div', null, wanStatusView, wanBody),
  });

  return [lanCard, liteCard, wanCard];
}

// ── 手机端偏好：右边栏 / 捏合缩放 / 独立字号 ────────────────────────────────
export function renderPrefs(s) {
  const { t, status, pending } = s;
  return [Card({
    key: 'prefs', icon: Ico.sliders, title: t('prefsTitle'), sub: t('prefsHint'),
    children: !status
      ? h('div', { className: 'dshp-loading' }, t('loadingStatus'))
      : h('div', null,
        Row({
          label: t('mobileRightbar'),
          desc: t('mobileRightbarHint'),
          control: Switch(status.mobileRightbarEnabled !== false, () => s.setMobileRightbar(status.mobileRightbarEnabled === false), pending.prefs === true, t('mobileRightbar')),
        }),
        Row({
          label: t('mobilePinchZoom'),
          desc: t('mobilePinchZoomHint'),
          control: Switch(status.mobilePinchZoomEnabled === true, () => s.setMobilePinchZoom(status.mobilePinchZoomEnabled !== true), pending.prefs === true, t('mobilePinchZoom')),
        }),
        Row({
          label: t('mobileFontSize'),
          desc: t('mobileFontSizeHint'),
          control: h('select', {
            className: 'dshp-select',
            value: String(Number(status.mobileFontSize) || 0),
            disabled: pending.prefs === true,
            onChange: (e) => s.setMobileFontSize(Number(e.target.value)),
          }, MOBILE_FONT_OPTIONS.map((px) => h('option', { key: px, value: String(px) }, px === 0 ? t('mobileFontFollow') : px + ' px'))),
        })),
  })];
}

// ── 维护区：代理缓存 → 使用探针 → 恢复出厂 → 署名行 ────────────────────────
export function renderMaintenance(s) {
  const { t, status, pending, publicView } = s;
  const cards = [];

  // 数据来自 status.cache（每次轮询都带），不另开 effect；旧宿主/桩环境没有
  // cache 字段时整张卡不渲染——显示「0 KB」会让人以为缓存坏了。
  if (status?.cache) {
    cards.push(Card({
      key: 'cache', icon: Ico.refresh, title: t('cacheTitle'), sub: t('cacheSub'),
      children: Row({
        label: fmt(t, 'cacheUsage', { used: fmtBytes(status.cache.bytes), budget: fmtBytes(status.cache.budgetBytes) }),
        desc: fmt(t, 'cacheEntries', { n: status.cache.entries ?? 0 }),
        control: Btn({
          variant: 'ghost', mini: true, icon: Ico.trash,
          onClick: s.clearCache, disabled: pending.cache === true,
        }, t('cacheClear')),
      }),
    }));
  }

  // 使用探针：默认关闭，打开后只是把「手机上到底在干什么」写成本机 JSONL，从不联网。
  // 数据来自 status.probe；旧宿主/桩环境没有 probe 字段时整张卡不渲染。
  if (status?.probe && status.origin !== 'public') {
    cards.push(Card({
      key: 'probe', icon: Ico.info, title: t('probeTitle'), sub: t('probeSub'),
      children: h('div', null,
        Row({
          label: t('probeEnabled'),
          desc: t('probeEnabledHint'),
          control: Switch(status.probe.enabled !== false, () => s.setProbe(status.probe.enabled === false), pending.probe === true, t('probeEnabled')),
        }),
        Row({
          label: fmt(t, 'probeUsage', { used: fmtBytes(status.probe.bytes), budget: fmtBytes(status.probe.maxBytes) }),
          desc: fmt(t, 'probeWhere', {
            n: status.probe.packets ?? 0,
            path: status.probe.path ?? '',
          }) + (status.probe.lastAt ? ' · ' + fmt(t, 'probeLast', { when: new Date(status.probe.lastAt).toLocaleString() }) : ' · ' + t('probeEmpty')),
          control: Btn({
            variant: 'ghost', mini: true, icon: Ico.trash,
            onClick: s.clearProbe, disabled: pending.probe === true,
          }, t('probeClear')),
        })),
    }));
  }

  // 维护：恢复出厂设置（最底部，避免误触）
  cards.push(Card({
    key: 'reset', icon: Ico.trash, title: t('resetFactory'), sub: t('resetIntro'), danger: true,
    right: publicView
      ? h('div', { className: 'dshp-hint' }, t('resetLocalOnly'))
      : Btn({ variant: 'danger', mini: true, onClick: () => s.setResetOpen(true), disabled: pending.reset === true }, t('resetGo')),
  }));

  // 页脚署名行：版本 · 更新方法 · 开发者 · Star · 反馈
  // 更新只有一条路（重跑 README 的 add 命令再重启 dsh web），所以这里给说明链接
  // 而不是一键更新按钮；versionInfo 拿不到时（宿主刚起/RPC 失败）就只留说明链接。
  cards.push(h('footer', { className: 'dshp-footer' },
    s.versionInfo?.current ? h('span', { title: t('updateHint') }, fmt(t, 'versionLine', { ver: s.versionInfo.current })) : null,
    s.versionInfo?.current ? h('span', null, '·') : null,
    h('a', { href: 'https://github.com/daha1216/dsh-pocket#-怎么用', target: '_blank', rel: 'noreferrer', title: t('updateHint') }, t('updateDocLink')),
    h('span', null, '·'),
    h('span', null, t('developer')),
    h('span', null, '·'),
    h('a', { href: 'https://github.com/daha1216/dsh-pocket', target: '_blank', rel: 'noreferrer', title: t('starAsk') }, t('starCta')),
    h('span', null, '·'),
    h('a', { href: 'https://github.com/daha1216/dsh-pocket/issues', target: '_blank', rel: 'noreferrer' }, t('feedback'))));

  return cards;
}

// ── 页面级弹窗与 Toast（都挂在页面末尾，脱离卡片滚动区）─────────────────────
export function renderModals(s) {
  const { t, pending } = s;
  return [
    // 恢复出厂设置确认弹框
    s.resetOpen ? Modal({ title: t('resetTitle'), tone: 'danger', onClose: () => s.setResetOpen(false),
      children: h('div', { className: 'dshp-modal-body' }, t('resetBody')),
      actions: h('div', { className: 'dshp-inline' },
        Btn({ variant: 'ghost', mini: true, autoFocus: true, onClick: () => s.setResetOpen(false) }, t('cancel')),
        Btn({ variant: 'danger', mini: true, onClick: s.doFactoryReset, disabled: pending.reset === true }, t('resetConfirm'))) }) : null,

    // 局域网访问开关确认弹框（关闭/打开时弹窗提醒）
    s.lanToggleOpen !== null ? Modal({ title: t(s.lanToggleOpen ? 'lanToggleTitleOn' : 'lanToggleTitleOff'), tone: s.lanToggleOpen ? 'brand' : 'warn', onClose: () => s.setLanToggleOpen(null),
      children: h('div', { className: 'dshp-modal-body' }, t(s.lanToggleOpen ? 'lanToggleBodyOn' : 'lanToggleBodyOff')),
      actions: h('div', { className: 'dshp-inline' },
        Btn({ variant: 'ghost', mini: true, autoFocus: true, onClick: () => s.setLanToggleOpen(null) }, t('cancel')),
        Btn({ variant: 'primary', mini: true, onClick: s.confirmLanToggle }, t('confirm'))) }) : null,

    // 安全免责声明弹框（issue #31）：每次开启公网访问前确认
    s.disclaimerOpen ? Modal({ title: t('disclaimerTitle'), tone: 'warn', onClose: () => s.setDisclaimerOpen(false),
      children: h('div', null,
        h('div', { className: 'dshp-modal-body' }, t('disclaimerBody')),
        h('label', { className: 'dshp-check' },
          h('input', { type: 'checkbox', checked: s.disclaimerChecked, onChange: (e) => s.setDisclaimerChecked(e.target.checked) }),
          t('disclaimerAgree')),
        !s.disclaimerChecked ? h('div', { className: 'dshp-err-text', style: { marginTop: 8 } }, t('disclaimerHint')) : null),
      actions: h('div', { className: 'dshp-inline' },
        Btn({ variant: 'ghost', mini: true, autoFocus: true, onClick: () => s.setDisclaimerOpen(false) }, t('cancel')),
        Btn({ variant: 'primary', mini: true, disabled: !s.disclaimerChecked, onClick: s.confirmDisclaimer }, t('disclaimerAgree'))) }) : null,

    // Toast：重置等操作的即时反馈（固定屏幕正中央，2.6s 自动消失；读屏通过 aria-live 播报）
    s.toast ? h('div', { className: 'dshp-toast', role: 'status', 'aria-live': 'polite' }, s.toast) : null,
  ];
}
