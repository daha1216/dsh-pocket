// dsh-pocket 网页客户端：
//   1. 设置页签「手机访问」（局域网/公网二维码 + 更新/重启提示）
//   2. 移动端适配（移植自 MIT 项目 dsh-web-mobile，见 client/mobile/LICENSE.dsh-web-mobile）
//
// 手机扫码打开的就是电脑上的 dsh web，实时同步；窄屏自动变成抽屉布局。
//
// 注：Web Push 已移除——浏览器推送依赖 Google FCM（Chrome）等境外服务，
// 国内直连被墙，普通用户用不了。专注扫码同屏这一件事。

import { createElement as h, useEffect, useRef, useState } from 'react';

import { POCKET_RPC_CHANNEL, POCKET_ENDPOINTS, MOBILE_RIGHTBAR_ATTRIBUTE, MOBILE_RIGHTBAR_EVENT, redactStatus, compareVersions } from './api.js';
import { mobileApply } from './mobile/mobile-apply.tsx';
import { NS as POCKET_NS, zh as POCKET_ZH, en as POCKET_EN } from './pocket-locales.js';

const name = 'dsh-pocket';
const inject = ['slots', 'connection', 'layout', 'locale', 'sessionLogDownload'];

// 词典在 pocket-locales.js；这里只做「取 key → 替换 {占位符} → 字符串」。
// 不依赖 DSH t() 的插值能力，避免行为不一致。
function fmt(t, key, vars) {
  let s = t(key);
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = String(s).split(`{${k}}`).join(String(v));
    }
  }
  return s;
}

// 官方 DeepSeek Harness 设计系统（dsh-client-ui-theme design-platform.css）：
// 按钮 md=36px 胶囊形 / sm=28px；品牌色 --dsw-alias-brand-primary；
// hover 走 --dsw-alias-button-*-hover；间距 4px 栅格；正文 13px。
const styles = {
  card: { background: 'var(--dsw-alias-bg-layer-1,#fff)', border: '1px solid var(--dsw-alias-border-l2,#e5e7eb)', borderRadius: 12, padding: '16px 20px', maxWidth: 480 },
  block: { borderTop: '1px solid var(--dsw-alias-border-l2,#e5e7eb)', marginTop: 16, paddingTop: 16 },
  muted: { color: 'var(--dsw-alias-label-tertiary,#8b93a1)', fontSize: 12, lineHeight: 1.5 },
  code: { fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 12, wordBreak: 'break-all', margin: '6px 0 10px', color: 'var(--dsw-alias-label-primary,inherit)' },
  // 主按钮：官方 md 胶囊形（36px）
  primary: { font: 'inherit', cursor: 'pointer', border: 'none', background: 'var(--dsw-alias-button-primary-fill, var(--dsw-alias-brand-primary,#4f6ef7))', color: 'var(--dsw-alias-label-primary-foreground, #fff)', height: 36, padding: '0 16px', borderRadius: 999, fontSize: 13, fontWeight: 500, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
  // 次级按钮：官方 outline/ghost 胶囊形
  btn: { font: 'inherit', cursor: 'pointer', border: '1px solid var(--dsw-alias-button-ghost-active-border, var(--dsw-alias-border-l2,#d1d5db))', background: 'var(--dsw-alias-bg-layer-1,#fff)', color: 'var(--dsw-alias-label-primary,inherit)', height: 36, padding: '0 16px', borderRadius: 999, fontSize: 13, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
  qr: { width: 220, height: 220, borderRadius: 10, border: '1px solid var(--dsw-alias-border-l2,#e5e7eb)', margin: '8px 0' },
  warn: { color: 'var(--dsw-alias-state-warn-primary,#b45309)', fontSize: 12, lineHeight: 1.5 },
};

function applyMobileRightbarSetting(enabled) {
  const on = enabled !== false;
  document.body?.setAttribute(MOBILE_RIGHTBAR_ATTRIBUTE, on ? 'on' : 'off');
  window.dispatchEvent(new CustomEvent(MOBILE_RIGHTBAR_EVENT, { detail: { enabled: on } }));
}

function PocketSettingsTab({ rpcCall, t }) {
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [tunnelState, setTunnelState] = useState(null); // 隧道进度 {phase, detail, startedAt}
  const [restartNotice, setRestartNotice] = useState(false); // 重启后提示
  const [updateInfo, setUpdateInfo] = useState(null); // { current, latest, updating, result, startedAt } | null
  const [isDesktop, setIsDesktop] = useState(false); // DSH Desktop（Electron）环境：更新/重启由桌面版管理
  const [now, setNow] = useState(Date.now()); // 每秒 tick，驱动倒计时

  // 进行中操作的「已等待 X 秒」倒计时
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const elapsed = (startedAt) => (startedAt ? Math.max(0, Math.floor((Date.now() - startedAt) / 1000)) : 0);

  const call = async (endpoint, payload) => {
    const res = await rpcCall(endpoint, payload);
    if (!res?.ok) throw new Error(res?.error?.message ?? 'RPC failed');
    return res.value;
  };

  const load = async () => {
    try {
      const s = await call(POCKET_ENDPOINTS.status, {});
      setStatus(s);
      applyMobileRightbarSetting(s.mobileRightbarEnabled);
      setTunnelState(s.tunnelState ?? null);
      if (s.desktop) setIsDesktop(true);
      if (s.restartNotice) {
        // 新进程确认起来了：显示一次「已重启」，清掉旧的更新横幅（单状态，不并存），
        // 然后自动刷新页面加载新代码——不用用户手动刷新
        setRestartNotice(true);
        setUpdateInfo(null);
        if (!sessionStorage.getItem('dshp-auto-reloaded')) {
          sessionStorage.setItem('dshp-auto-reloaded', '1');
          setTimeout(() => { try { location.reload(); } catch { /* 忽略 */ } }, 2000);
        }
      }
    } catch { /* 忽略瞬时失败 */ }
    // 已授权设备：同一轮询里取（旧宿主没有这个 endpoint → 该区块不渲染）
    try { setDevView(await call(POCKET_ENDPOINTS.devicesList, {})); } catch { /* 忽略 */ }
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 3000);
    return () => clearInterval(t);
  }, []);

  // 每次页面加载清掉自动刷新标记——这样下次重启（更新后）才能再次触发自动刷新
  useEffect(() => {
    try { sessionStorage.removeItem('dshp-auto-reloaded'); } catch { /* 忽略 */ }
  }, []);

  // 版本检测：host 当前版本 vs npm registry latest（registry 带 CORS *）
  // 两种情况显示横幅：① 有新版可更新；② 磁盘已更新但进程还是旧代码（重启生效）
  // cache: 'no-store' —— registry 响应带缓存头，浏览器会缓存旧版本号导致「小版本不提示」
  // 周期重查（每 5 分钟）：npm registry 的 /latest 走 CDN 边缘缓存，刚发布后打开页面
  // 可能拿到旧版本号——周期性重查让更新提示在缓存刷新后自动出现，不用重开页面。
  // 桌面端（isDesktop）：更新/重启由 DSH Desktop 管理，这里不做版本检测、不显示更新横幅
  useEffect(() => {
    if (isDesktop) return;
    let alive = true;
    const check = async () => {
      try {
        const v = await call(POCKET_ENDPOINTS.version, {});
        const meta = await (await fetch('https://registry.npmjs.org/dsh-pocket/latest', { cache: 'no-store' })).json();
        if (!alive) return;
        const latest = typeof meta?.version === 'string' ? meta.version : null;
        if (latest && v.current && compareVersions(latest, v.current) > 0) {
          setUpdateInfo({ current: v.current, latest, updating: false, result: null });
        } else if (v.current && v.loaded && compareVersions(v.current, v.loaded) > 0) {
          // 已更新未重启：显示「已更新，重启生效」+ 重启按钮
          setUpdateInfo({ current: v.current, latest: v.current, updating: false, result: 'ok', updated: true });
        }
      } catch { /* 网络失败静默 */ }
    };
    check();
    const t = setInterval(check, 5 * 60 * 1000);
    return () => { alive = false; clearInterval(t); };
  }, [isDesktop]);

  // 重启宿主（更新生效必需：刷新页面不会重载服务端代码）
  const restartPocket = async () => {
    setUpdateInfo((u) => ({ ...u, restarting: true, startedAt: Date.now() }));
    try {
      // 宿主 500ms 后自杀，RPC 响应可能来不及送达 → 3 秒超时兜底，别让按钮永远卡「重启中…」
      await Promise.race([
        call(POCKET_ENDPOINTS.restart, {}),
        new Promise((_, rej) => setTimeout(() => rej(new Error('restart requested (no reply within 3s)')), 3000)),
      ]);
      setUpdateInfo((u) => ({ ...u, restarting: true, result: 'ok' }));
    } catch (err) {
      // 网络断连/超时同样视为「已请求重启」——旧进程即将退出，等新进程起来后刷新即可
      const msg = String(err?.message ?? '');
      if (/connection|socket|fetch|network|abort|cancelled|ECONN|disconnect|closed|timeout/i.test(msg)) {
        setUpdateInfo((u) => ({ ...u, restarting: true, result: 'ok' }));
        return;
      }
      setUpdateInfo((u) => ({ ...u, restarting: false, result: 'fail', output: err.message }));
    }
  };

  // 一键更新：调宿主 dsh plugin update（成功后宿主自动重启生效，用户只点一次）
  const runUpdate = async () => {
    setUpdateInfo((u) => ({ ...u, updating: true, result: null, startedAt: Date.now() }));
    try {
      const r = await call(POCKET_ENDPOINTS.update, {});
      setUpdateInfo((u) => ({
        ...u,
        updating: false,
        result: r.ok ? 'ok' : 'fail',
        autoRestart: r.autoRestart === true,
        output: r.output ?? r.error,
      }));
    } catch (err) {
      setUpdateInfo((u) => ({ ...u, updating: false, result: 'fail', output: err.message }));
    }
  };

  // 安全免责声明（issue #31；本轮可配置 never | once | always，见设置页「安全声明」行）：
  //   - never ：直接开启（不弹）；
  //   - once  ：首次弹一次，勾选后服务端记住（status.disclaimerAckedAt > 0），之后直接开；
  //   - always：每次开启都弹。
  // 服务端同样按模式强制校验（tunnel.start），防绕过前端直接调 RPC。

  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);
  /** 当前声明模式（服务端 status 为准；旧宿主没有该字段 → 按 once 处理）。 */
  const disclaimerMode = status?.disclaimerMode ?? 'once';

  const doStartTunnel = async () => {
    // 命名隧道模式：Token/域名没配齐就不发起（服务端同样会拒绝）
    const cfg = status?.tunnelConfig;
    if (cfg?.mode === 'named' && (!cfg.hostname || !cfg.tokenSet)) {
      setError(t('namedNeedCfg'));
      return;
    }
    setBusy(true);
    setError(null);
    setTunnelState({ phase: 'starting', detail: '正在开启…', startedAt: Date.now() });
    try {
      setStatus(await call(POCKET_ENDPOINTS.tunnelStart, { disclaimer: true }));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };
  const startTunnel = () => {
    // never 直接开；once 且已确认过直接开；其余（always / once 首开）弹框确认。
    const mode = status?.disclaimerMode ?? 'once';
    if (mode === 'never' || (mode === 'once' && (status?.disclaimerAckedAt ?? 0) > 0)) {
      doStartTunnel();
      return;
    }
    setDisclaimerChecked(false);
    setDisclaimerOpen(true);
  };
  const confirmDisclaimer = () => {
    if (!disclaimerChecked) return; // 未勾选不允许
    setDisclaimerOpen(false);
    doStartTunnel();
  };
  /** 切换声明模式（服务端枚举校验；非法值直接报错，不静默降级）。 */
  const applyDisclaimerMode = async (mode) => {
    try {
      setStatus(await call(POCKET_ENDPOINTS.disclaimerSetMode, { mode }));
    } catch (err) {
      setError(err.message);
    }
  };

  const stopTunnel = async () => {
    try { setStatus(await call(POCKET_ENDPOINTS.tunnelStop, {})); } catch { /* 忽略 */ }
  };

  // 公网模式（issue #66）：随机域名（默认零配置）/ 固定域名（Cloudflare 命名隧道 + Tunnel Token）
  // tunnelCfg：编辑态 { hostname, token, err } | null；token 输入留空 = 保持已存的 Token 不变
  const [tunnelCfg, setTunnelCfg] = useState(null);
  const switchToQuick = async () => {
    try { setStatus(await call(POCKET_ENDPOINTS.tunnelSetConfig, { mode: 'quick' })); } catch (err) { setError(err.message); }
  };
  const saveNamedTunnel = async () => {
    try {
      setStatus(await call(POCKET_ENDPOINTS.tunnelSetConfig, {
        mode: 'named',
        hostname: tunnelCfg?.hostname ?? '',
        token: tunnelCfg?.token || undefined, // 留空不覆盖已存 Token
      }));
      setTunnelCfg(null);
    } catch (err) {
      setTunnelCfg((c) => ({ ...c, err: err.message }));
    }
  };

  // 恢复出厂设置：清本机设置 + 重设随机密码（弹窗确认；RPC 端也强制校验 confirm）
  const [resetOpen, setResetOpen] = useState(false);
  const doFactoryReset = async () => {
    setResetOpen(false);
    setBusy(true);
    setError(null);
    try {
      const next = await call(POCKET_ENDPOINTS.pocketReset, { confirm: true });
      setStatus(next);
      applyMobileRightbarSetting(next.mobileRightbarEnabled);
      setTunnelCfg(null);
      setCustomPin(null);
      setAdvOpen(false);
      showToast(t('resetDone'));
    } catch (err) {
      setError(err.message);
      showToast(t('resetFailed'));
    } finally {
      setBusy(false);
    }
  };

  // 刷新局域网访问密码（旧密码立即作废）
  const refreshLanPin = async () => {
    try {
      const r = await call(POCKET_ENDPOINTS.lanTokenRefresh, {});
      setStatus((s) => ({ ...s, lanToken: r.lanToken }));
    } catch { /* 忽略 */ }
  };

  // 局域网访问密码开关（issue #24）：默认开启；关闭后局域网扫码直连（公网不受影响）
  const setLanAuth = async (on) => {
    try {
      const r = await call(POCKET_ENDPOINTS.lanAuthSetEnabled, { on });
      setStatus((s) => ({ ...s, lanAuthEnabled: r.lanAuthEnabled }));
    } catch { /* 忽略 */ }
  };

  const setMobileRightbar = async (on) => {
    try {
      const r = await call(POCKET_ENDPOINTS.mobileRightbarSetEnabled, { on });
      const enabled = r.mobileRightbarEnabled === true;
      setStatus((s) => ({ ...s, mobileRightbarEnabled: enabled }));
      applyMobileRightbarSetting(enabled);
    } catch (err) {
      setError(err.message);
    }
  };

  // 局域网访问总开关：关闭后局域网扫码/链接直接失效（公网不受影响）。
  // 切换前弹窗确认（弹窗提醒）；服务端用 setLanEnabled 持久化，代理按 Host 实时拦截。
  const [lanToggleOpen, setLanToggleOpen] = useState(null); // null | true | false（目标 on 状态）
  const requestLanToggle = (on) => setLanToggleOpen(on);
  const confirmLanToggle = async () => {
    const on = lanToggleOpen;
    setLanToggleOpen(null);
    if (on === null) return;
    try {
      const r = await call(POCKET_ENDPOINTS.lanSetEnabled, { on });
      setStatus((s) => ({ ...s, lanEnabled: r.lanEnabled }));
    } catch (err) {
      setError(err.message);
    }
  };

  // 局域网地址手动覆盖（Tailscale/VPN 等远程访问场景）：空值恢复自动选择
  const setLanAddress = async (ip) => {
    try {
      setStatus(await call(POCKET_ENDPOINTS.lanSetOverride, { ip }));
    } catch (err) {
      setError(err.message);
    }
  };

  // 自定义访问密码（issue #33）：公网/局域网各自设固定 8–64 位密码（英文字母大小写或数字）；自定义后公网不再自动轮换。
  // customPin: { which: 'public'|'lan', value, err } | null —— 正在输入自定义密码的区块
  const [customPin, setCustomPin] = useState(null);
  const saveCustomPin = async (which) => {
    try {
      const r = await call(POCKET_ENDPOINTS.pinSetCustom, { which, value: customPin?.value ?? '' });
      setStatus((s) => ({
        ...s,
        accessToken: which === 'public' ? r.pin : s.accessToken,
        lanToken: which === 'lan' ? r.pin : s.lanToken,
        publicPinCustom: which === 'public' ? true : s.publicPinCustom,
        lanPinCustom: which === 'lan' ? true : s.lanPinCustom,
      }));
      setCustomPin(null);
    } catch (err) {
      setCustomPin((c) => ({ ...c, err: err.message }));
    }
  };
  // 渲染自定义输入行（共用）：输入框 + 保存/取消
  const customPinRow = (which) => h('div', { style: { marginTop: 6, fontSize: 12, color: 'var(--dsw-alias-label-secondary,#6b7280)', lineHeight: 1.5 } },
    t('customizing'),
    h('input', {
      style: { width: 130, margin: '0 6px', padding: '4px 8px', fontSize: 14, letterSpacing: 1, textAlign: 'center', border: '1px solid var(--dsw-alias-border-l2,#d1d5db)', borderRadius: 6, outline: 'none' },
      type: 'password',
      minLength: 8,
      maxLength: 64,
      value: customPin?.value ?? '',
      autoFocus: true,
      onChange: (e) => setCustomPin((c) => ({ ...c, value: e.target.value.replace(/[^a-zA-Z0-9]/g, ''), err: null })),
      onKeyDown: (e) => { if (e.key === 'Enter') saveCustomPin(which); if (e.key === 'Escape') setCustomPin(null); },
    }),
    h('button', { style: { ...styles.btn, height: 26, padding: '0 10px', fontSize: 12, marginLeft: 2 }, onClick: () => saveCustomPin(which) }, t('save')),
    h('button', { style: { ...styles.btn, height: 26, padding: '0 10px', fontSize: 12 }, onClick: () => setCustomPin(null) }, t('cancel')),
    customPin?.err ? h('div', { style: { color: 'var(--dsw-alias-state-error-primary,#dc2626)', marginTop: 4 } }, errText(customPin.err)) : null,
  );
  // 「自定义」按钮（非输入态显示在密码行末尾）
  const customBtn = (which) => h('button', { style: { ...styles.btn, height: 26, padding: '0 10px', fontSize: 12, marginLeft: 8 }, onClick: () => setCustomPin({ which, value: '', err: null }) }, t('customize'));

  const lanUrl = status?.lanUrl;
  const tunnelUrl = status?.tunnelUrl;
  const tunnelPhase = tunnelState?.phase ?? 'idle';
  const tunnelStarting = ['downloading', 'starting', 'registering'].includes(tunnelPhase);
  const tunnelStateDetail = tunnelState?.detail ?? '';
  const tunnelStateStarted = tunnelState?.startedAt ?? null;
  // 公网模式视图（issue #66）：{ mode, hostname, tokenSet }
  const tunnelModeView = status?.tunnelConfig ?? { mode: 'quick', hostname: '', tokenSet: false };
  const namedMode = tunnelModeView.mode === 'named';
  // 模式按钮选中态高亮：固定域名模式本身，或正在编辑固定域名配置，都视为「选中」
  const namedActive = namedMode || tunnelCfg !== null;
  // 后端错误消息统一为「中文 | English」混排；按当前界面语言只显示对应一半
  const errText = (msg) => {
    const s = String(msg ?? '');
    const i = s.indexOf(' | ');
    if (i < 0) return s;
    return (t('ok') === POCKET_ZH.ok ? s.slice(0, i) : s.slice(i + 3)).trim();
  };
  // 轻量 Toast：操作成功/失败后短暂提示（自动消失，不打断操作）
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const showToast = (text) => {
    setToast(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };
  useEffect(() => () => clearTimeout(toastTimer.current), []);
  const modeBtnStyle = (active) => ({
    ...styles.btn, height: 28, padding: '0 12px', fontSize: 12,
    fontWeight: active ? 600 : 400,
    background: active ? 'var(--dsw-alias-button-primary-fill, var(--dsw-alias-brand-primary,#4f6ef7))' : 'var(--dsw-alias-bg-layer-1,#fff)',
    color: active ? 'var(--dsw-alias-label-primary-foreground, #fff)' : 'var(--dsw-alias-label-primary,inherit)',
  });
  // iOS 风格小开关（重排后统一用：局域网总开关 / 局域网密码开关）
  const Switch = (on, onClick) => h('button', {
    role: 'switch', 'aria-checked': !!on,
    style: { flexShrink: 0, width: 40, height: 22, borderRadius: 11, border: 'none', padding: 0, position: 'relative', cursor: 'pointer', font: 'inherit', background: on ? 'var(--dsw-alias-button-primary-fill, var(--dsw-alias-brand-primary,#4f6ef7))' : 'var(--dsw-alias-border-l2,#d1d5db)' },
    onClick,
  }, h('span', { style: { position: 'absolute', top: 2, left: on ? 20 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff' } }));
  // 卡片内主内容：二维码 + 地址 + 提示
  const qrArea = (src, url, hint) => h('div', { style: { background: 'var(--dsw-alias-bg-layer-2,#f3f4f6)', borderRadius: 10, padding: '10px 12px', textAlign: 'center', margin: '10px 0' } },
    h('img', { src, alt: 'QR', style: styles.qr }),
    h('div', { style: styles.code }, url),
    h('div', { style: styles.muted }, hint));
  // 设置行：上分隔线，内部第一行 = 左标签 + 右操作；extra 作为第二段渲染
  const row = (label, control, extra) => h('div', { style: { borderTop: '1px solid var(--dsw-alias-border-l2,#e5e7eb)', paddingTop: 9, marginTop: 9 } },
    h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 } },
      h('span', { style: { fontSize: 13 } }, label), control), extra ?? null);
  // 高级（手动选地址）展开态
  const [advOpen, setAdvOpen] = useState(false);

  // ---------- 已授权设备（本轮新增） ----------
  // 每台设备一行：名称 + 范围徽标（局域网/公网）+ 在线/活跃状态 + IP + 「本机」标记；
  // 操作：改名（行内编辑）/ 下线（确认弹窗）；区块右上角是「下线其他设备」（确认弹窗）。
  // 数据来自 devices.list（宿主按请求 cookie 认定「本机」，代理每 3 秒把在线状态刷新一次）。
  const [devView, setDevView] = useState(null);        // { devices, currentId, epoch } | null
  const [devEdit, setDevEdit] = useState(null);        // { id, name, err } | null（行内改名）
  const [devConfirm, setDevConfirm] = useState(null);  // 待确认下线的设备 | null
  const [othersConfirm, setOthersConfirm] = useState(false);
  // R7：设备区块默认收起——设备多了（实测 44 台）会把设置页拉得很长。
  // 收起态只渲染「标题行（点击展开 + 计数徽标）+ 简介行」，不渲染任何设备行；
  // 展开态与改动前完全一致（改名 / 下线 / 本机标记 / 空态文案）。
  const [devOpen, setDevOpen] = useState(false);
  const devLabel = (d) => (d.legacy ? t('deviceLegacy') : (d.label || d.uaType || t('unknownError')));
  // 相对时间：拿 state 里的 now 参与计算，秒级 tick 会驱动重渲染（不额外开定时器）
  const relActive = (ts) => {
    const s = Math.max(0, Math.floor((now - (ts || 0)) / 1000));
    if (s < 60) return t('deviceJustNow');
    const m = Math.floor(s / 60);
    if (m < 60) return fmt(t, 'deviceMinAgo', { n: m });
    const hh = Math.floor(m / 60);
    if (hh < 24) return fmt(t, 'deviceHourAgo', { n: hh });
    return fmt(t, 'deviceDayAgo', { n: Math.floor(hh / 24) });
  };
  const chip = (text, strong) => h('span', {
    style: {
      fontSize: 11, lineHeight: 1.6, padding: '0 6px', borderRadius: 999, whiteSpace: 'nowrap',
      border: '1px solid var(--dsw-alias-border-l2,#e5e7eb)',
      color: strong ? 'var(--dsw-alias-brand-primary,#4f6ef7)' : 'var(--dsw-alias-label-secondary,#6b7280)',
      background: 'var(--dsw-alias-bg-layer-2,#f3f4f6)',
    },
  }, text);
  const doRename = async (id) => {
    try {
      setDevView(await call(POCKET_ENDPOINTS.devicesRename, { id, name: devEdit?.name ?? '' }));
      setDevEdit(null);
      showToast(t('deviceRenamed'));
    } catch (err) {
      setDevEdit((e) => ({ ...e, err: err.message }));
    }
  };
  const doRevoke = async () => {
    const dev = devConfirm;
    setDevConfirm(null);
    if (!dev) return;
    try {
      setDevView(await call(POCKET_ENDPOINTS.devicesRevoke, { id: dev.id }));
      showToast(t('deviceRevoked'));
    } catch (err) {
      setError(err.message);
    }
  };
  const doRevokeOthers = async () => {
    setOthersConfirm(false);
    try {
      setDevView(await call(POCKET_ENDPOINTS.devicesRevokeOthers, {}));
      showToast(t('deviceOthersRevoked'));
    } catch (err) {
      setError(err.message);
    }
  };
  // 单台设备行（窄屏排得下：上行名称/徽标，下行状态/IP，操作用 sm 按钮换行）
  const devRow = (d) => h('div', { 'data-dsh-pocket-device-row': '1', style: { borderTop: '1px solid var(--dsw-alias-border-l2,#e5e7eb)', paddingTop: 9, marginTop: 9 } },
    h('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' } },
      h('div', { style: { flex: '1 1 150px', minWidth: 0 } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' } },
          h('span', { style: { fontSize: 13, fontWeight: 500, wordBreak: 'break-word' } }, devLabel(d)),
          d.current ? chip(t('deviceThis'), true) : null,
        ),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginTop: 3, ...styles.muted } },
          // scope 徽标始终显示真实 scope（legacy 的名称已经写在上面那行，徽标不再重复「旧设备」）
          chip(d.scope === 'public' ? t('deviceScopePublic') : t('deviceScopeLan')),
          h('span', null, d.online ? `🟢 ${t('deviceOnline')}` : `🕒 ${relActive(d.lastActive)}`),
          d.lastIp ? h('span', { style: { fontFamily: 'ui-monospace,Menlo,monospace' } }, d.lastIp) : null,
        ),
      ),
      d.revocable
        ? h('div', { style: { display: 'flex', gap: 6, flexShrink: 0 } },
          h('button', {
            style: { ...styles.btn, height: 26, padding: '0 10px', fontSize: 12 },
            onClick: () => setDevEdit({ id: d.id, name: d.customName ?? '', err: null }),
          }, t('deviceRename')),
          h('button', {
            style: { ...styles.btn, height: 26, padding: '0 10px', fontSize: 12, color: 'var(--dsw-alias-state-error-primary,#dc2626)' },
            onClick: () => setDevConfirm(d),
          }, t('deviceRevoke')),
        )
        : null,
    ),
    d.legacy ? h('div', { style: { ...styles.muted, marginTop: 4 } }, t('deviceLegacyHint')) : null,
    devEdit?.id === d.id
      ? h('div', null,
        h('div', { style: { marginTop: 6, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' } },
          h('input', {
            style: { flex: '1 1 120px', minWidth: 0, padding: '4px 8px', fontSize: 13, border: '1px solid var(--dsw-alias-border-l2,#d1d5db)', borderRadius: 6, outline: 'none' },
            placeholder: t('deviceRenameHint'),
            maxLength: 32,
            value: devEdit.name,
            autoFocus: true,
            onChange: (e) => setDevEdit((x) => ({ ...x, name: e.target.value, err: null })),
            onKeyDown: (e) => { if (e.key === 'Enter') doRename(d.id); if (e.key === 'Escape') setDevEdit(null); },
          }),
          h('button', { style: { ...styles.btn, height: 26, padding: '0 10px', fontSize: 12 }, onClick: () => doRename(d.id) }, t('save')),
          h('button', { style: { ...styles.btn, height: 26, padding: '0 10px', fontSize: 12 }, onClick: () => setDevEdit(null) }, t('cancel')),
        ),
        devEdit.err ? h('div', { style: { marginTop: 4, fontSize: 12, color: 'var(--dsw-alias-state-error-primary,#dc2626)' } }, errText(devEdit.err)) : null,
      )
      : null,
  );

  // ---------- 通知（R3：Web Push） ----------
  // 能力链：安全上下文 → Service Worker → PushManager → Notification。
  // 三个典型不可用场景各有明确引导（规格 C）：
  //   - http://IP（局域网明文）→ 没有安全上下文，通知无法注册：引导走公网 HTTPS 入口；
  //   - iOS Safari 标签页（未「添加到主屏幕」）→ 没有 PushManager：引导先添加到主屏幕；
  //   - 桌面 Firefox/旧浏览器不支持 → 如实说不支持。
  // 订阅写在「当前设备」（服务端按请求 cookie 识别），所以状态也从 devices.list 的本机行读。
  const [caps, setCaps] = useState(null);          // 能力探测结果
  const [notifyBusy, setNotifyBusy] = useState(false);
  const [notifyTesting, setNotifyTesting] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState(null); // 通知区块的即时反馈（成功/失败文案）
  useEffect(() => {
    const detect = () => {
      const ua = navigator.userAgent || '';
      // iPadOS 13+ 的 Safari 自称 Macintosh：用 maxTouchPoints 兜底识别
      const ios = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && (navigator.maxTouchPoints || 0) > 1);
      const standalone = window.navigator.standalone === true
        || Boolean(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
      setCaps({
        secure: window.isSecureContext === true,
        sw: 'serviceWorker' in navigator,
        push: 'PushManager' in window,
        notif: typeof Notification !== 'undefined',
        permission: typeof Notification !== 'undefined' ? Notification.permission : 'unsupported',
        ios,
        standalone,
        origin: window.location.origin,
      });
    };
    detect();
    // 权限可能在系统/站点设置里被改（回前台后自愈），低频轮询即可
    const t = setInterval(detect, 4000);
    return () => clearInterval(t);
  }, []);
  const curDevRow = (devView?.devices || []).find((d) => d.current) ?? null;
  const curPush = curDevRow?.push ?? null;
  const canNotify = Boolean(caps?.secure && caps?.sw && caps?.push && caps?.notif);
  /** base64url → Uint8Array（applicationServerKey 要的是字节数组，不是字符串）。 */
  const keyBytes = (b64u) => {
    const norm = String(b64u ?? '').replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(norm + '='.repeat((4 - (norm.length % 4)) % 4));
    const out = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  };
  /**
   * 「开启通知」：用户手势内三连——权限 → 注册 SW（scope /）→ pushManager.subscribe
   * → notify.subscribe 落盘到本机设备。任何一步失败都如实报错（不假装成功）。
   */
  const enableNotify = async () => {
    setNotifyBusy(true);
    setNotifyMsg(null);
    try {
      if (!window.isSecureContext) throw new Error(t('notifyNeedHttps'));
      if (!('serviceWorker' in navigator) || !('PushManager' in window) || typeof Notification === 'undefined') {
        throw new Error(t('notifyUnsupported'));
      }
      const perm = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
      if (perm !== 'granted') throw new Error(perm === 'denied' ? t('notifyDenied') : t('notifySubscribeFail'));
      const reg = await navigator.serviceWorker.register('/dsh-pocket-assets/sw.js', { scope: '/' });
      // 必须等 SW 激活：激活前 pushManager.subscribe 会抛 InvalidStateError
      const ready = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise((_, reject) => setTimeout(() => reject(new Error('service worker not ready | Service Worker 未就绪')), 15000)),
      ]);
      const target = ready && ready.pushManager ? ready : reg;
      let sub = await target.pushManager.getSubscription();
      if (!sub) {
        const { key } = await call(POCKET_ENDPOINTS.notifyVapidKey, {});
        sub = await target.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(key) });
      }
      const json = typeof sub.toJSON === 'function' ? sub.toJSON() : sub;
      const view = await call(POCKET_ENDPOINTS.notifySubscribe, {
        subscription: { endpoint: json.endpoint, keys: { p256dh: json.keys?.p256dh, auth: json.keys?.auth } },
        events: { turn: true, approval: true },
      });
      setDevView(view);
      setNotifyMsg(t('notifyEnabled'));
      showToast(t('notifyEnabled'));
    } catch (err) {
      setNotifyMsg(fmt(t, 'notifySubscribeFail', { err: (err && err.message) || String(err) }));
    }
    setNotifyBusy(false);
  };
  /** 「关闭通知」：浏览器侧退订 + 服务端清掉本机订阅。 */
  const disableNotify = async () => {
    setNotifyBusy(true);
    setNotifyMsg(null);
    try {
      try {
        const reg = navigator.serviceWorker?.getRegistration ? await navigator.serviceWorker.getRegistration('/') : null;
        const sub = reg?.pushManager ? await reg.pushManager.getSubscription() : null;
        if (sub) await sub.unsubscribe();
      } catch { /* 浏览器退订失败不阻塞服务端清理 */ }
      setDevView(await call(POCKET_ENDPOINTS.notifyUnsubscribe, {}));
      setNotifyMsg(t('notifyDisabled'));
      showToast(t('notifyDisabled'));
    } catch (err) {
      setNotifyMsg(fmt(t, 'notifySubscribeFail', { err: (err && err.message) || String(err) }));
    }
    setNotifyBusy(false);
  };
  /** 发送测试通知（服务端真发一条到本机；发不出去如实回报）。 */
  const sendTestNotify = async () => {
    setNotifyTesting(true);
    setNotifyMsg(null);
    try {
      const r = await call(POCKET_ENDPOINTS.notifyTest, {});
      setNotifyMsg(r?.sent
        ? t('notifyTestOk')
        : fmt(t, 'notifyTestFail', { err: `HTTP ${r?.status ?? 0}${r?.error ? ` · ${r.error}` : ''}` }));
    } catch (err) {
      setNotifyMsg(fmt(t, 'notifyTestFail', { err: (err && err.message) || String(err) }));
    }
    setNotifyTesting(false);
  };
  /** 事件开关（回合完成 / 等待审批）。 */
  const toggleNotifyEvents = async (key, on) => {
    if (!curPush) return;
    try {
      setNotifyBusy(true);
      setDevView(await call(POCKET_ENDPOINTS.notifySetEvents, { events: { [key]: on } }));
    } catch (err) {
      setNotifyMsg((err && err.message) || String(err));
    }
    setNotifyBusy(false);
  };

  return h('div', { style: styles.card },
    h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 } },
      h('div', null,
        h('strong', null, t('title')),
        h('div', { style: styles.muted }, t('subtitle')),
      ),
      h('div', { style: { fontSize: 12, color: 'var(--dsw-alias-label-tertiary,#8b93a1)', textAlign: 'right' } },
        h('div', { style: { whiteSpace: 'nowrap' } }, t('developer')),
        h('div', { style: { whiteSpace: 'nowrap' } }, t('starAsk')),
        h('a', { href: 'https://github.com/daha1216/dsh-pocket', target: '_blank', rel: 'noreferrer', style: { color: 'var(--dsw-alias-brand-primary,#4f6ef7)', fontSize: 12, lineHeight: 1.6, textDecoration: 'underline' } },
          t('starCta')),
      ),
    ),

    // 桌面端不显示更新/重启横幅（更新由 DSH Desktop 管理），也不需要额外提示

    // 重启后提示（进程在后台运行，停止方法）——左侧蓝色色条（桌面端不会触发本插件的自重启）
    !isDesktop && restartNotice ? h('div', { style: { ...styles.block, borderLeft: '4px solid var(--dsw-alias-brand-primary,#4f6ef7)', borderRadius: 8, background: 'var(--dsw-alias-bg-layer-2,#f3f4f6)', padding: '10px 12px' } },
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 } },
        h('div', { style: { fontWeight: 600, fontSize: 13 } }, t('restarted')),
        h('button', { style: styles.btn, onClick: () => setRestartNotice(false) }, t('ok')),
      ),
      h('div', { style: styles.muted, marginTop: 4, wordBreak: 'break-all' }, fmt(t, 'bgHint', { cmd: status?.killHint ?? `lsof -ti :${status?.dshPort ?? 3080} | xargs kill -9` })),
    ) : null,

    // 更新提示——左侧黄色色条（提示有新版本）；单状态：有更新/更新中/已更新自动重启，不并存
    // 桌面端不渲染（更新由 DSH Desktop 管理）
    !isDesktop && updateInfo ? h('div', { style: { ...styles.block, borderLeft: '4px solid var(--dsw-alias-state-warn-primary,#b45309)', borderRadius: 8, background: 'var(--dsw-alias-bg-layer-2,#f3f4f6)', padding: '10px 12px' } },
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 } },
        h('div', { style: { fontWeight: 600, fontSize: 13 } },
          updateInfo.updated
            ? fmt(t, 'updatedRestart', { ver: updateInfo.current })
            : updateInfo.result === 'ok'
              ? (updateInfo.autoRestart ? fmt(t, 'updateAutoRestarting', { ver: updateInfo.latest }) : fmt(t, 'updatedOk', { ver: updateInfo.latest }))
              : fmt(t, 'updateAvailable', { ver: updateInfo.latest })),
        updateInfo.result !== 'ok'
          ? h('button', { style: styles.primary, onClick: runUpdate, disabled: updateInfo.updating }, updateInfo.updating ? t('updating') : fmt(t, 'updateTo', { ver: updateInfo.latest }))
          : updateInfo.autoRestart
            ? h('button', { style: styles.btn, disabled: true }, t('restartingNow'))
            : h('button', { style: styles.primary, onClick: restartPocket, disabled: updateInfo.restarting }, updateInfo.restarting ? t('restarting') : t('restartNow')),
      ),
      h('div', { style: styles.muted, marginTop: 4 },
        updateInfo.updating
          ? fmt(t, 'updatingDetail', { s: elapsed(updateInfo.startedAt) })
        : updateInfo.restarting
          ? fmt(t, 'restartingDetail', { s: elapsed(updateInfo.startedAt) })
        : updateInfo.result === 'ok'
          ? (updateInfo.autoRestart ? t('updatedAutoDetail')
            : t('updatedRestartDetail'))
        : updateInfo.result === 'fail' ? fmt(t, 'updateFailed', { err: errText(updateInfo.output) || t('unknownError') })
        : fmt(t, 'versionRange', { cur: updateInfo.current, latest: updateInfo.latest })),
    ) : null,

    // 局域网：标题行自带总开关 → 二维码+地址 → 设置行（访问密码 / 高级·手动选地址）
    h('div', { style: styles.block },
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        h('span', { style: { fontWeight: 600, fontSize: 13 } }, t('lanAccess')),
        Switch(status?.lanEnabled !== false, () => requestLanToggle(status?.lanEnabled === false)),
      ),
      status?.lanEnabled === false
        ? h('div', { style: { marginTop: 8, fontSize: 12, color: 'var(--dsw-alias-state-warn-primary,#b45309)', lineHeight: 1.5 } }, t('lanDisabledHint'))
        : (lanUrl
          ? h('div', null,
            qrArea(status.lanQr, lanUrl, t('lanHint')),
            // 访问密码行：开关 + 值（关闭时提示直连）
            row(t('lanPin'), Switch(status?.lanAuthEnabled !== false, () => setLanAuth(status?.lanAuthEnabled === false)),
              status?.lanAuthEnabled === false
                ? h('div', { style: { ...styles.muted, marginTop: 6 } }, t('lanPinOff'))
                : (customPin?.which === 'lan'
                  ? customPinRow('lan')
                  : h('div', { style: { marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' } },
                    h('span', { style: { fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 13, letterSpacing: 1 } }, status.lanToken),
                    h('button', { style: { ...styles.btn, height: 26, padding: '0 10px', fontSize: 12 }, onClick: refreshLanPin }, t('refresh')),
                    customBtn('lan'),
                    status?.lanPinCustom ? h('span', { style: { fontSize: 11, color: 'var(--dsw-alias-state-warn-primary,#b45309)' } }, t('pinCustomHint')) : null,
                  ))),
            // 高级：手动选地址（默认收起）
            row(t('advAddress'),
              h('button', { style: { border: 'none', background: 'none', font: 'inherit', cursor: 'pointer', fontSize: 12, color: 'var(--dsw-alias-label-tertiary,#8b93a1)', padding: 0 }, onClick: () => setAdvOpen((v) => !v) },
                (status?.lanIpOverride || t('lanAddressAuto')) + ' ›'),
              advOpen ? h('div', { style: { marginTop: 8 } },
                h('label', { style: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--dsw-alias-label-secondary,#6b7280)' } },
                  t('lanAddress'),
                  h('select', {
                    value: status?.lanIpOverride || '',
                    onChange: (e) => setLanAddress(e.target.value),
                    style: { font: 'inherit', height: 30, padding: '0 8px', borderRadius: 8, border: '1px solid var(--dsw-alias-border-l2,#d1d5db)', background: 'var(--dsw-alias-bg-layer-1,#fff)', color: 'var(--dsw-alias-label-primary,inherit)' },
                  },
                  h('option', { value: '' }, t('lanAddressAuto')),
                  (status?.lanCandidates || []).map((ip) => h('option', { key: ip, value: ip }, ip)),
                  ),
                ),
              ) : null),
          )
          : h('div', { style: styles.muted }, t('lanStarting'))),
    ),

    // 公网：标题行自带 开启/关闭 → 开启后：二维码+地址、地址模式行、访问密码行
    h('div', { style: styles.block },
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        h('span', { style: { fontWeight: 600, fontSize: 13 } }, t('wanAccess')),
        tunnelUrl
          ? h('button', { style: { ...styles.btn, height: 28, padding: '0 12px', fontSize: 12, color: 'var(--dsw-alias-state-error-primary,#dc2626)' }, onClick: stopTunnel }, t('stopTunnel'))
          : h('button', { style: { ...styles.primary, height: 28, padding: '0 14px', fontSize: 12 }, onClick: startTunnel, disabled: busy || tunnelStarting }, busy || tunnelStarting ? t('opening') : t('enable')),
      ),
      tunnelStarting
        ? h('div', { style: { marginTop: 8, fontSize: 12, color: 'var(--dsw-alias-label-secondary,#6b7280)' } },
          tunnelPhase === 'downloading'
            ? fmt(t, 'downloading', { s: elapsed(tunnelStateStarted) })
            : fmt(t, 'connecting', { s: elapsed(tunnelStateStarted), suffix: elapsed(tunnelStateStarted) > 30 ? t('slowHint') : '' }))
        : tunnelPhase === 'error'
          ? h('div', { style: { marginTop: 8, fontSize: 12, color: 'var(--dsw-alias-state-error-primary,#dc2626)' } },
            fmt(t, 'error', { detail: errText(tunnelStateDetail) || t('unknownError') }))
          : (!tunnelUrl && !isDesktop ? h('div', { style: { ...styles.muted, marginTop: 8 } }, t('wanOffHint')) : null),
      tunnelUrl
        ? h('div', null,
          qrArea(status.tunnelQr, tunnelUrl, namedMode ? t('namedRunningHint') : t('wanHint')),
          // 防钓鱼 / 别收藏（issue #82）：公网链接仅本次有效、勿收藏提示
          h('div', { style: { marginTop: 8, fontSize: 12, lineHeight: 1.5, borderLeft: '4px solid var(--dsw-alias-state-warn-primary,#b45309)', background: 'var(--dsw-alias-bg-layer-2,#f3f4f6)', borderRadius: 8, padding: '8px 10px' } }, t('wanEphemeralWarn')),
          // 地址模式行（随机/固定；固定域名选中或编辑时高亮）
          row(t('modeLabel'),
            h('span', { style: { display: 'inline-flex', gap: 6 } },
              h('button', { style: modeBtnStyle(!namedActive), onClick: namedMode ? switchToQuick : (tunnelCfg ? () => setTunnelCfg(null) : undefined) }, t('modeQuick')),
              h('button', { style: modeBtnStyle(namedActive), onClick: () => setTunnelCfg(tunnelCfg ? null : { hostname: tunnelModeView.hostname ?? '', token: '', err: null }) }, t('modeNamed')),
            ),
            h('div', { style: { marginTop: 6 } },
              // 刚保存固定域名但当前连接仍是随机域名：需关闭后重新开启才生效
              namedMode && /trycloudflare\.com/i.test(tunnelUrl ?? '') ? h('div', { style: { ...styles.warn } }, t('namedTakeEffect')) : null,
              // 固定域名：已保存摘要 + 修改入口（非编辑态）
              namedMode && !tunnelCfg ? h('div', { style: { ...styles.muted } },
                fmt(t, 'namedSummary', { host: tunnelModeView.hostname || '—', token: tunnelModeView.tokenSet ? t('namedTokenSet') : t('namedTokenMissing') }),
                h('button', { style: { ...styles.btn, height: 26, padding: '0 10px', fontSize: 12, marginLeft: 8 }, onClick: () => setTunnelCfg({ hostname: tunnelModeView.hostname ?? '', token: '', err: null }) }, t('namedEdit')),
                h('div', { style: { ...styles.muted, marginTop: 4 } }, t('namedHow')),
                !tunnelModeView.tokenSet || !tunnelModeView.hostname ? h('div', { style: { marginTop: 2, color: 'var(--dsw-alias-state-error-primary,#dc2626)' } }, t('namedNeedCfg')) : null,
              ) : null,
              // 固定域名：编辑表单（域名 + Tunnel Token，Token 留空保持不变）
              tunnelCfg ? h('div', { style: { marginTop: 6, fontSize: 12, color: 'var(--dsw-alias-label-secondary,#6b7280)', lineHeight: 1.6 } },
                h('div', null,
                  t('namedHostnameLabel'),
                  h('input', {
                    style: { margin: '4px 0 0 6px', padding: '4px 8px', fontSize: 13, border: '1px solid var(--dsw-alias-border-l2,#d1d5db)', borderRadius: 6, outline: 'none', width: 200 },
                    placeholder: 'pocket.example.com',
                    value: tunnelCfg.hostname ?? '',
                    autoFocus: true,
                    onChange: (e) => setTunnelCfg((c) => ({ ...c, hostname: e.target.value.trim(), err: null })),
                    onKeyDown: (e) => { if (e.key === 'Enter') saveNamedTunnel(); if (e.key === 'Escape') setTunnelCfg(null); },
                  }),
                ),
                h('div', { style: { marginTop: 6 } },
                  t('namedTokenLabel'),
                  h('input', {
                    style: { margin: '4px 0 0 6px', padding: '4px 8px', fontSize: 13, border: '1px solid var(--dsw-alias-border-l2,#d1d5db)', borderRadius: 6, outline: 'none', width: 240, fontFamily: 'ui-monospace,Menlo,monospace' },
                    type: 'password',
                    value: tunnelCfg.token ?? '',
                    onChange: (e) => setTunnelCfg((c) => ({ ...c, token: e.target.value.trim(), err: null })),
                    onKeyDown: (e) => { if (e.key === 'Enter') saveNamedTunnel(); if (e.key === 'Escape') setTunnelCfg(null); },
                  }),
                ),
                h('div', { style: { marginTop: 6, display: 'flex', gap: 8 } },
                  h('button', { style: { ...styles.btn, height: 26, padding: '0 10px', fontSize: 12 }, onClick: saveNamedTunnel }, t('save')),
                  h('button', { style: { ...styles.btn, height: 26, padding: '0 10px', fontSize: 12 }, onClick: () => setTunnelCfg(null) }, t('cancel')),
                ),
                h('div', { style: { ...styles.muted, marginTop: 6 } }, t('namedHow')),
                h('div', { style: { marginTop: 2, fontSize: 11, color: 'var(--dsw-alias-state-warn-primary,#b45309)', lineHeight: 1.5 } }, t('namedSecurity')),
                tunnelCfg.err ? h('div', { style: { color: 'var(--dsw-alias-state-error-primary,#dc2626)', marginTop: 4 } }, errText(tunnelCfg.err)) : null,
              ) : null,
            ),
          ),
          // 访问密码行：值 + 自定义（自定义输入态整体替换）
          status.accessToken
            ? row(t('pinLabel'),
              customPin?.which === 'public'
                ? null
                : h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 8 } },
                  h('span', { style: { fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 13, letterSpacing: 1 } }, status.accessToken),
                  customBtn('public')),
              h('div', { style: { marginTop: 6 } },
                customPin?.which === 'public' ? customPinRow('public') : null,
                status?.publicPinCustom ? h('div', { style: { ...styles.warn } }, t('pinCustomHint')) : null,
                namedMode ? h('div', { style: { ...styles.warn } }, t('namedSecurity')) : null))
            : null,
        )
        : null,
      // 安全声明（本轮）：开启公网前的确认方式 —— 每次确认 / 仅首次（默认）/ 从不提示。
      // 与公网开关是否打开无关（关闭时也能改；服务端按同一份模式校验 tunnel.start）。
      row(t('disclaimerMode'),
        h('select', {
          value: disclaimerMode,
          onChange: (e) => applyDisclaimerMode(e.target.value),
          style: { font: 'inherit', height: 30, padding: '0 8px', borderRadius: 8, border: '1px solid var(--dsw-alias-border-l2,#d1d5db)', background: 'var(--dsw-alias-bg-layer-1,#fff)', color: 'var(--dsw-alias-label-primary,inherit)' },
        },
        h('option', { value: 'always' }, t('disclaimerModeAlways')),
        h('option', { value: 'once' }, t('disclaimerModeOnce')),
        h('option', { value: 'never' }, t('disclaimerModeNever')),
        ),
        h('div', { style: { ...styles.muted, marginTop: 6 } }, t('disclaimerModeHint'))),
    ),

    // 已授权设备（R7 折叠）：局域网 / 公网区块之后。旧宿主没有 devices.list → devView 为 null，整块不渲染。
    // 标题行整体是折叠头（点击切换 devOpen，aria-expanded 同步）：收起态显示计数徽标
    // 「已访问设备（N）」，展开态显示原标题；右侧「下线其他设备」两种状态都保留。
    // 收起态**不渲染设备行列表**（设备多了设置页会被拉得很长）；展开态行为与改动前一致。
    devView ? h('div', { style: styles.block },
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' } },
        h('button', {
          type: 'button',
          'data-dsh-pocket-devices-toggle': '1',
          'aria-expanded': devOpen,
          onClick: () => setDevOpen((v) => !v),
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 6, flex: '1 1 auto', minWidth: 0,
            background: 'transparent', border: 'none', padding: 0, margin: 0, font: 'inherit',
            color: 'inherit', cursor: 'pointer', textAlign: 'left',
          },
        },
          h('span', { style: { fontSize: 11, lineHeight: 1, color: 'var(--dsw-alias-label-tertiary,#8b93a1)' } }, devOpen ? '▾' : '▸'),
          h('span', { style: { fontWeight: 600, fontSize: 13 } },
            devOpen ? t('devicesTitle') : fmt(t, 'devicesCount', { n: (devView.devices || []).length })),
        ),
        h('button', {
          style: { ...styles.btn, height: 28, padding: '0 12px', fontSize: 12, color: 'var(--dsw-alias-state-error-primary,#dc2626)', flexShrink: 0 },
          onClick: () => setOthersConfirm(true),
        }, t('devicesRevokeOthers')),
      ),
      h('div', { style: { ...styles.muted, marginTop: 6 } }, t('devicesIntro')),
      devOpen
        ? ((devView.devices || []).length === 0
          ? h('div', { style: { ...styles.muted, marginTop: 8 } }, t('devicesEmpty'))
          : (devView.devices || []).map((d) => h('div', { key: d.id }, devRow(d))))
        : null,
    ) : null,

    // 通知（R3 Web Push）：已授权设备区块之后。旧宿主没有 notify.* → 能力探测照跑，
    // 但任何操作都会失败并给出真实错误；区块本身在 devView 存在时才渲染（同设备区块）。
    devView ? h('div', { style: styles.block },
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' } },
        h('span', { style: { fontWeight: 600, fontSize: 13 } }, t('notifyTitle')),
        canNotify
          ? (curPush
            ? h('button', {
              style: { ...styles.btn, height: 28, padding: '0 12px', fontSize: 12 },
              disabled: notifyBusy,
              onClick: disableNotify,
            }, notifyBusy ? t('notifyEnabling') : t('notifyDisable'))
            : h('button', {
              style: { ...styles.primary, height: 28, padding: '0 12px', fontSize: 12 },
              disabled: notifyBusy,
              onClick: enableNotify,
            }, notifyBusy ? t('notifyEnabling') : t('notifyEnable')))
          : null,
      ),
      h('div', { style: { ...styles.muted, marginTop: 6 } }, t('notifyIntro')),
      // iOS 使用流程（纯文案，独立成段）：只看 caps.ios，不参与下面的失败引导优先级链
      // （旧引导说「当前不行」，本段说「完整流程」，两者并存）。standalone 为真时缀状态词，
      // 说明步骤供重装/换机时参考；非 iOS 不渲染。
      caps && caps.ios
        ? h('div', { style: { marginTop: 8 } },
          caps.standalone
            ? h('div', { style: { ...styles.muted } }, t('notifyIosInstalled'))
            : null,
          h('div', { style: { ...styles.muted, marginTop: caps.standalone ? 2 : 0 } }, t('notifyIosSteps')))
        : null,
      // 条件引导（按优先级）：非安全上下文 → iOS 未安装 → 浏览器不支持
      !caps
        ? null
        : !caps.secure
          ? h('div', { style: { ...styles.warn, marginTop: 6 } }, t('notifyNeedHttps'))
          : (caps.ios && !caps.standalone)
            ? h('div', { style: { marginTop: 6 } },
              h('div', { style: { ...styles.warn } }, t('notifyNeedInstall')),
              h('div', { style: { ...styles.muted, marginTop: 2 } }, t('notifyNeedInstallHow')))
            : (!caps.sw || !caps.push || !caps.notif)
              ? h('div', { style: { ...styles.warn, marginTop: 6 } }, t('notifyUnsupported'))
              : null,
      // 状态：本机订阅详情 + 事件开关 + 测试
      canNotify && curPush
        ? h('div', { style: { marginTop: 8 } },
          h('div', { style: { fontSize: 12, color: 'var(--dsw-alias-label-secondary,#6b7280)' } },
            fmt(t, 'notifyStatusOn', { date: new Date(curPush.addedAt || Date.now()).toLocaleDateString() })),
          h('label', { style: { display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 8, fontSize: 13, cursor: 'pointer' } },
            h('input', {
              type: 'checkbox',
              checked: curPush.events?.turn !== false,
              disabled: notifyBusy,
              style: { width: 16, height: 16, marginTop: 2 },
              onChange: (e) => toggleNotifyEvents('turn', e.target.checked),
            }),
            h('span', null,
              h('div', null, t('notifyEventTurn')),
              h('div', { style: { ...styles.muted } }, t('notifyEventTurnHint')))),
          h('label', { style: { display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 8, fontSize: 13, cursor: 'pointer' } },
            h('input', {
              type: 'checkbox',
              checked: curPush.events?.approval !== false,
              disabled: notifyBusy,
              style: { width: 16, height: 16, marginTop: 2 },
              onChange: (e) => toggleNotifyEvents('approval', e.target.checked),
            }),
            h('span', null,
              h('div', null, t('notifyEventApproval')),
              h('div', { style: { ...styles.muted } }, t('notifyEventApprovalHint')))),
          h('div', { style: { marginTop: 10 } },
            h('button', {
              style: { ...styles.btn, height: 28, padding: '0 12px', fontSize: 12 },
              disabled: notifyTesting || notifyBusy,
              onClick: sendTestNotify,
            }, notifyTesting ? t('notifyTesting') : t('notifyTest'))),
          h('div', { style: { ...styles.muted, marginTop: 8 } }, t('notifyHintKeepOpen')))
        : null,
      // 没有本机身份（桌面浏览器没走过手机访问密码）→ 通知只能绑定设备，如实引导
      canNotify && !curPush && !devView.currentId
        ? h('div', { style: { ...styles.muted, marginTop: 8 } }, t('notifyNoDevice'))
        : null,
      notifyMsg
        ? h('div', { style: { marginTop: 8, fontSize: 12, color: /^❌/.test(notifyMsg) ? 'var(--dsw-alias-state-error-primary,#dc2626)' : 'var(--dsw-alias-label-secondary,#6b7280)' } }, notifyMsg)
        : null,
    ) : null,

    h('div', { style: styles.block },
      row(
        t('mobileRightbar'),
        Switch(status?.mobileRightbarEnabled !== false, () => setMobileRightbar(status?.mobileRightbarEnabled === false)),
        h('div', { style: { ...styles.muted, marginTop: 6 } }, t('mobileRightbarHint')),
      ),
    ),

    error ? h('div', { style: { color: 'var(--dsw-alias-state-error-primary,#dc2626)', fontSize: 12, marginTop: 8 } }, `❌ ${errText(error)}`) : null,

    // 恢复出厂设置：设置出问题时的临时兜底（最底部，避免误触）
    h('div', { style: styles.block },
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 } },
        h('span', { style: { fontWeight: 600, fontSize: 13 } }, t('resetFactory')),
        h('button', { style: { ...styles.btn, height: 28, padding: '0 12px', fontSize: 12, color: 'var(--dsw-alias-state-error-primary,#dc2626)' }, onClick: () => setResetOpen(true) }, t('resetGo')),
      ),
      h('div', { style: { ...styles.muted, marginTop: 6 } }, t('resetIntro')),
    ),

    // 恢复出厂设置确认弹框
    resetOpen ? h('div', { style: { position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 } },
      h('div', { style: { background: 'var(--dsw-alias-bg-layer-1,#fff)', borderRadius: 12, maxWidth: 440, width: '100%', padding: '20px 22px', boxShadow: '0 8px 32px rgba(0,0,0,.18)' } },
        h('div', { style: { fontWeight: 600, fontSize: 15, color: 'var(--dsw-alias-state-warn-primary,#b45309)', marginBottom: 10 } }, t('resetTitle')),
        h('div', { style: { fontSize: 13, lineHeight: 1.7, color: 'var(--dsw-alias-label-primary,inherit)', whiteSpace: 'pre-line' } }, t('resetBody')),
        h('div', { style: { display: 'flex', gap: 8, marginTop: 16 } },
          h('button', { style: { ...styles.btn, flex: 1 }, onClick: () => setResetOpen(false) }, t('cancel')),
          h('button', { style: { ...styles.primary, flex: 1, background: 'var(--dsw-alias-state-error-primary,#dc2626)' }, onClick: doFactoryReset }, t('resetConfirm')),
        ),
      ),
    ) : null,

    // Toast：重置等操作的即时反馈（固定屏幕正中央，2.6s 自动消失）
    toast ? h('div', {
      style: { position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10001, width: 'auto', maxWidth: 280, background: 'rgba(17,24,39,.92)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 16px', fontSize: 13, lineHeight: 1.5, textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,.22)' },
    }, toast) : null,

    // 局域网访问开关确认弹框（关闭/打开时弹窗提醒）
    lanToggleOpen !== null ? h('div', { style: { position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 } },
      h('div', { style: { background: 'var(--dsw-alias-bg-layer-1,#fff)', borderRadius: 12, maxWidth: 420, width: '100%', padding: '20px 22px', boxShadow: '0 8px 32px rgba(0,0,0,.18)' } },
        h('div', { style: { fontWeight: 600, fontSize: 15, color: lanToggleOpen ? 'var(--dsw-alias-brand-primary,#4f6ef7)' : 'var(--dsw-alias-state-warn-primary,#b45309)', marginBottom: 10 } }, t(lanToggleOpen ? 'lanToggleTitleOn' : 'lanToggleTitleOff')),
        h('div', { style: { fontSize: 13, lineHeight: 1.7, color: 'var(--dsw-alias-label-primary,inherit)' } }, t(lanToggleOpen ? 'lanToggleBodyOn' : 'lanToggleBodyOff')),
        h('div', { style: { display: 'flex', gap: 8, marginTop: 16 } },
          h('button', { style: { ...styles.btn, flex: 1 }, onClick: () => setLanToggleOpen(null) }, t('cancel')),
          h('button', { style: { ...styles.primary, flex: 1 }, onClick: confirmLanToggle }, t('confirm')),
        ),
      ),
    ) : null,

    // 安全免责声明弹框（issue #31）：按模式弹出（每次确认 / 仅首次 / 从不，见「安全声明」设置行）
    disclaimerOpen ? h('div', { style: { position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 } },
      h('div', { style: { background: 'var(--dsw-alias-bg-layer-1,#fff)', borderRadius: 12, maxWidth: 420, width: '100%', padding: '20px 22px', boxShadow: '0 8px 32px rgba(0,0,0,.18)' } },
        h('div', { style: { fontWeight: 600, fontSize: 15, color: 'var(--dsw-alias-state-warn-primary,#b45309)', marginBottom: 10 } }, t('disclaimerTitle')),
        h('div', { style: { fontSize: 13, lineHeight: 1.7, color: 'var(--dsw-alias-label-primary,inherit)' } }, t('disclaimerBody')),
        // 仅首次模式：明确告知「记住」与改回路径，避免用户以为再也看不到声明
        disclaimerMode === 'once' ? h('div', { style: { ...styles.muted, marginTop: 10 } }, t('disclaimerOnceNote')) : null,
        h('label', { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, fontSize: 13, cursor: 'pointer' } },
          h('input', { type: 'checkbox', checked: disclaimerChecked, onChange: (e) => setDisclaimerChecked(e.target.checked), style: { width: 16, height: 16 } }),
          t('disclaimerAgree'),
        ),
        h('div', { style: { display: 'flex', gap: 8, marginTop: 16 } },
          h('button', { style: { ...styles.btn, flex: 1 }, onClick: () => setDisclaimerOpen(false) }, t('cancel')),
          h('button', {
            style: { ...styles.primary, flex: 1, opacity: disclaimerChecked ? 1 : .5 },
            disabled: !disclaimerChecked,
            onClick: confirmDisclaimer,
          }, t('disclaimerAgree')),
        ),
        !disclaimerChecked ? h('div', { style: { marginTop: 8, fontSize: 12, color: 'var(--dsw-alias-state-error-primary,#dc2626)' } }, t('disclaimerHint')) : null,
      ),
    ) : null,

    // 下线设备确认弹框（单台）
    devConfirm ? h('div', { style: { position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 } },
      h('div', { style: { background: 'var(--dsw-alias-bg-layer-1,#fff)', borderRadius: 12, maxWidth: 420, width: '100%', padding: '20px 22px', boxShadow: '0 8px 32px rgba(0,0,0,.18)' } },
        h('div', { style: { fontWeight: 600, fontSize: 15, color: 'var(--dsw-alias-state-warn-primary,#b45309)', marginBottom: 10 } }, t('deviceRevokeTitle')),
        h('div', { style: { fontSize: 13, lineHeight: 1.7, color: 'var(--dsw-alias-label-primary,inherit)' } },
          fmt(t, 'deviceRevokeBody', { name: devLabel(devConfirm) })),
        h('div', { style: { display: 'flex', gap: 8, marginTop: 16 } },
          h('button', { style: { ...styles.btn, flex: 1 }, onClick: () => setDevConfirm(null) }, t('cancel')),
          h('button', { style: { ...styles.primary, flex: 1, background: 'var(--dsw-alias-state-error-primary,#dc2626)' }, onClick: doRevoke }, t('deviceRevokeConfirm')),
        ),
      ),
    ) : null,

    // 下线其他设备确认弹框（一次踢掉除本机外的全部设备）
    othersConfirm ? h('div', { style: { position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 } },
      h('div', { style: { background: 'var(--dsw-alias-bg-layer-1,#fff)', borderRadius: 12, maxWidth: 440, width: '100%', padding: '20px 22px', boxShadow: '0 8px 32px rgba(0,0,0,.18)' } },
        h('div', { style: { fontWeight: 600, fontSize: 15, color: 'var(--dsw-alias-state-warn-primary,#b45309)', marginBottom: 10 } }, t('deviceRevokeOthersTitle')),
        h('div', { style: { fontSize: 13, lineHeight: 1.7, color: 'var(--dsw-alias-label-primary,inherit)' } }, t('deviceRevokeOthersBody')),
        // 本机识别不出来（桌面浏览器没走过 pocket 密码）→ 如实提示：这次会把自己也踢掉
        devView?.currentId ? null : h('div', { style: { ...styles.warn, marginTop: 8 } }, t('deviceRevokeOthersAll')),
        h('div', { style: { display: 'flex', gap: 8, marginTop: 16 } },
          h('button', { style: { ...styles.btn, flex: 1 }, onClick: () => setOthersConfirm(false) }, t('cancel')),
          h('button', { style: { ...styles.primary, flex: 1, background: 'var(--dsw-alias-state-error-primary,#dc2626)' }, onClick: doRevokeOthers }, t('deviceRevokeConfirm')),
        ),
      ),
    ) : null,

    // 页面最底部：反馈入口
    h('div', { style: { ...styles.block, textAlign: 'center' } },
      h('a', { href: 'https://github.com/daha1216/dsh-pocket/issues', target: '_blank', rel: 'noreferrer', style: { fontSize: 12, color: 'var(--dsw-alias-label-secondary,#6b7280)', textDecoration: 'none' } },
        t('feedback')),
    ),
  );
}

export function apply(ctx) {
  // 兜底：确保 connection.isLoopback 为 true（issue #58）。
  // 注：代理注入的 loopback 补丁（proxy.mjs LOOPBACK_ENV_PATCH）已在 #105 移除——
  // 它与 DSH Desktop 2.0.4+ 客户端运行时不兼容，会令 BootHandoff 阶段白屏。
  // #58「远程浏览器开设置页」需上游提供官方信任来源机制才能正经解决；此处仅保留兜底。
  if (ctx?.connection) {
    try {
      Object.defineProperty(ctx.connection, 'isLoopback', { value: true, writable: true, configurable: true });
    } catch {
      try { ctx.connection.isLoopback = true; } catch { /* 忽略 */ }
    }
  }

  // 移动端适配（dsh-web-mobile 移植）：抽屉布局/触控/安全区，仅窄屏生效
  mobileApply(ctx);

  const rpcCall = (endpoint, payload, signal) =>
    ctx.connection.rpc.call(POCKET_RPC_CHANNEL, endpoint, payload, signal);

  // 设置页签接入 DSH 本地化：注册 pocket 词典（zh/en），并绑定一个随当前 locale 切换的 t()。
  const translate = ctx.locale.bind(POCKET_NS);
  ctx.effect(() => ctx.locale.register(POCKET_NS, { zh: POCKET_ZH, en: POCKET_EN }), 'dsh-pocket: pocket locale dictionaries');

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
