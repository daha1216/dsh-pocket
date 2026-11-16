// dsh-pocket 网页客户端：设置页签「手机访问」+ 移动端适配入口。
//
// 手机扫码打开的就是电脑上的 dsh web，实时同步；窄屏自动变抽屉布局。
//
// 设置页按终局评审 §6.2 拆分完毕，本文件只留插槽注册与页面骨架：
//   - settings/use-settings.js：状态、轮询、动作与派生（唯一的 useStatus 数据源）；
//   - settings/ui.jsx：Switch/Btn/Chip/Card/Row/Alert/QRBlock/Modal 与图标表；
//   - settings/sections.jsx：连接 / 偏好 / 维护三个分区 + 页面级弹窗；
//   - settings/styles.js：整张 .dshp-* 样式表（由 hook 以 #dshp-settings-css 注入一次）。
//
// 注：Web Push 已移除——浏览器推送依赖 Google FCM（Chrome）等境外服务，
// 国内直连被墙，普通用户用不了。专注扫码同屏这一件事。

import { createElement as h } from 'react';

import { POCKET_RPC_CHANNEL, redactStatus } from './api.js';
import { mobileApply } from './mobile/mobile-apply.tsx';
import { NS as POCKET_NS, zh as POCKET_ZH, en as POCKET_EN } from './pocket-locales.js';
import { renderConnection, renderMaintenance, renderModals, renderPrefs } from './settings/sections.jsx';
import { useSettings } from './settings/use-settings.js';
import { Alert, Btn, Chip, Ico } from './settings/ui.jsx';
import { fmt } from './settings/util.js';

const name = 'dsh-pocket';
// inject 必须是 upstream（client/mobile/upstream/index.tsx）inject 的超集：
// v3.1.0 起新增 'sessions'（session-focus-guard 读 ctx.sessions.list），
// 漏声明会让宿主给 ctx.sessions 传 undefined，激活即抛错 "did not activate"。
const inject = ['slots', 'connection', 'layout', 'locale', 'sessionLogDownload', 'sessions'];

function PocketSettingsTab({ rpcCall, t }) {
  const s = useSettings(rpcCall, t);

  return h('div', { className: 'dshp-page', 'data-dshp-ui': 'v3' },
    // 页头：图标 + 标题 + 副题；下面一行状态胶囊汇总两条通道
    h('header', { className: 'dshp-head' },
      h('span', { className: 'dshp-badge' }, h(Ico.settings, { size: 19 })),
      h('div', { className: 'dshp-head-main' },
        h('div', { className: 'dshp-title' }, t('section')),
        h('div', { className: 'dshp-sub' }, t('subtitle')))),
    h('div', { className: 'dshp-chips' },
      s.status
        ? [
          Chip({ on: s.status.lanEnabled !== false, children: t('lanAccess') + ' · ' + (s.status.lanEnabled !== false ? t('statusOn') : t('statusOff')) }),
          Chip({ on: !!s.tunnelUrl, children: t('wanAccess') + ' · ' + (s.tunnelUrl ? t('statusConnected') : t('statusOff')) }),
        ]
        : h('span', { className: 'dshp-hint', style: { marginTop: 0 } }, t('loadingStatus'))),

    // 操作错误：放在页面顶部（即使操作按钮在下面也一眼看见），可手动关掉
    s.error ? Alert({ kind: 'error', icon: Ico.warn, children: s.errText(s.error),
      extra: h('div', { className: 'dshp-inline', style: { marginTop: 8 } },
        Btn({ variant: 'ghost', mini: true, onClick: () => s.setError(null) }, t('ok'))) }) : null,

    // 与宿主断开：连续两次拉不到 status 才提示（宿主重启期间正常现象，恢复后自动消失）
    s.offline ? Alert({ kind: 'warn', icon: Ico.warn, children: t('offlineHint') }) : null,

    // 重启后提示（进程在后台运行，停止方法）——桌面端不显示更新/重启横幅（由 DSH Desktop 管理）
    !s.isDesktop && s.restartNotice ? Alert({ kind: 'info', icon: Ico.refresh,
      title: t('restarted'),
      children: h('div', { className: 'dshp-hint', style: { wordBreak: 'break-all', marginTop: 2 } },
        fmt(t, 'bgHint', { cmd: s.status?.killHint ?? ('lsof -ti :' + (s.status?.dshPort ?? 3080) + ' | xargs kill -9') })),
      extra: h('div', { className: 'dshp-inline', style: { marginTop: 8 } },
        s.autoReloadFailed
          ? Btn({ variant: 'ghost', mini: true, icon: Ico.refresh, onClick: () => { s.setAutoReloadFailed(false); s.waitForHostThenReload(); } }, t('reloadNow'))
          : null,
        s.autoReloadFailed ? h('span', { className: 'dshp-hint', style: { marginTop: 0 } }, t('reloadFailed')) : null,
        Btn({ variant: 'quiet', mini: true, onClick: () => s.setRestartNotice(false) }, t('ok'))),
    }) : null,

    // 已装新版但进程还跑着旧代码——唯一的更新相关提示（插件内没有一键更新；
    // 更新方式写在页脚，指向 README 的说明）。公网访客不渲染：服务端已拒绝公网
    // 走 restart（forbidden），露出按钮只会让人点了报错——重启是本机能力。
    !s.isDesktop && !s.publicView && s.needsRestart && !s.restartDismissed ? Alert({ kind: 'warn', icon: Ico.refresh,
      title: fmt(t, 'updatedRestart', { ver: s.versionInfo.current }),
      children: h('div', { className: 'dshp-hint', style: { marginTop: 2 } },
        s.versionInfo.restarting
          ? fmt(t, 'restartingDetail', { s: s.elapsed(s.versionInfo.startedAt) })
          : s.versionInfo.error
            ? fmt(t, 'restartFailed', { err: s.errText(s.versionInfo.error) || t('unknownError') })
            : t('updatedRestartDetail')),
      extra: h('div', { className: 'dshp-inline', style: { marginTop: 8 } },
        s.versionInfo.restarting
          ? Btn({ variant: 'ghost', mini: true, disabled: true }, t('restartingNow'))
          : Btn({ variant: 'primary', mini: true, icon: Ico.refresh, onClick: s.restartPocket }, t('restartNow')),
        // 「稍后」只隐藏本次横幅：不改任何状态，下次打开设置页会重新判 needsRestart
        s.versionInfo.restarting ? null : Btn({ variant: 'ghost', mini: true, onClick: () => s.setRestartDismissed(true) }, t('later'))),
    }) : null,

    // ── 三个分区：连接（局域网 → 轻量视图 → 公网）→ 手机端偏好 → 维护 ──────
    ...renderConnection(s),
    ...renderPrefs(s),
    ...renderMaintenance(s),

    // ── 页面级弹窗与 Toast ────────────────────────────────────────────────
    ...renderModals(s),
  );
}

export function apply(ctx) {
  // 兜底：确保 connection.isLoopback 为 true（issue #58）。
  // 注：代理注入的 loopback 补丁（proxy.mjs LOOPBACK_ENV_PATCH）已在 #105 移除——
  // 它与 DSH Desktop 2.0.4+ 客户端运行时不兼容，会令 BootHandoff 阶段白屏。
  // #58「远程浏览器开设置页」需上游提供官方信任来源机制才能正经解决；此处仅保留兜底。
  // 0.2.0-rc.1 起真正的修复在 proxy.mjs 的 TRANSPORT_API_CLIENT_SHIM（transport.ownsHost=true）：
  // isLoopback = transport?.ownsHost === true || isLoopbackHostname(location.hostname)，
  // 且 ui-settings 在插件激活前就固化 persistence，本插件 apply 时补来不及——只能注入层抢先。
  if (ctx?.connection) {
    try {
      Object.defineProperty(ctx.connection, 'isLoopback', { value: true, writable: true, configurable: true });
    } catch {
      try { ctx.connection.isLoopback = true; } catch { /* 忽略 */ }
    }
  }

  // 设置页签接入 DSH 本地化：注册 pocket 词典（zh/en），并绑定一个随当前 locale 切换的 t()。
  // 必须先于 mobileApply(ctx)：mobile-apply 安装的 fileGuard 取词依赖 pocket 词典已
  // 注册——注册 effect 排在其后的话，理论上 fileGuard 安装期取词会早于词典就位。
  const translate = ctx.locale.bind(POCKET_NS);
  ctx.effect(() => ctx.locale.register(POCKET_NS, { zh: POCKET_ZH, en: POCKET_EN }), 'dsh-pocket: pocket locale dictionaries');

  // 移动端适配（dsh-web-mobile 移植）：抽屉布局/触控/安全区，仅窄屏生效
  mobileApply(ctx);

  const rpcCall = (endpoint, payload, signal) =>
    ctx.connection.rpc.call(POCKET_RPC_CHANNEL, endpoint, payload, signal);

  // 设置一级入口（与 通用设置/模型/插件 同级，order 1 = 通用之后、最外层）
  ctx.slots.inject('settings.section', () =>
    ctx.slots.register(
      {
        name: 'settings.section',
        id: 'pocket',
        order: 1,
        label: () => translate('section'),
        inject: () => ({ rpcCall, t: translate }),
      },
      PocketSettingsTab,
    ),
  );
}

export { name, inject, redactStatus };
