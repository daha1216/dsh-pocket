// 设置页数据层：一个 hook 管住「拉 status、轮询、操作、派生值」，视图只读它。
//
// 为什么单独拆出来（终局评审 §6.2）：原 PocketSettingsTab 是 1253 行的单组件，15 个
// useState 加 3 个 ref 手写了一套数据层——status 的 10s 轮询、visibilitychange 补拉、
// 乱序快照丢弃、单项操作 pending 计数、弹窗焦点归还全挤在渲染函数里。想改任何一个
// 通道都得通读全文，也说不清「状态到底谁写的」。现在数据只在这里写，sections.jsx 只画。
import { useEffect, useRef, useState } from 'react';

import { POCKET_ENDPOINTS, compareVersions } from '../api.js';
import { POCKET_SETTINGS_CSS } from './styles.js';
import {
  applyMobileFontSize, applyMobilePinchZoomSetting, applyMobileRightbarSetting,
  elapsedSince, fetchWithTimeout, makeErrText, sleepUnlessAborted,
} from './util.js';

export function useSettings(rpcCall, t) {
  // status 必须是本 hook 的第一个 state：首帧为 null，视图靠它判断「还没拉到」。
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [tunnelState, setTunnelState] = useState(null); // 隧道进度 { phase, detail, startedAt }
  const [restartNotice, setRestartNotice] = useState(false); // 重启后提示
  const [versionInfo, setVersionInfo] = useState(null); // { current, loaded, restarting, startedAt, error }
  const [restartDismissed, setRestartDismissed] = useState(false); // 「已装新版未重启」横幅被「稍后」关掉
  const [isDesktop, setIsDesktop] = useState(false); // DSH Desktop（Electron）环境：重启由桌面版管理
  const [now, setNow] = useState(Date.now()); // 每秒 tick，驱动倒计时
  const [pinShown, setPinShown] = useState({}); // 密码明文开关 { lan?: true, public?: true }——默认遮罩
  const [autoReloadFailed, setAutoReloadFailed] = useState(false); // 重启后自动刷新失败
  const [pending, setPending] = useState({}); // 单项操作进行中标记：refreshPin/lanAuth/lanToggle/wan/prefs/savePin/saveNamed/lanAddr/reset/cache/probe
  const [offline, setOffline] = useState(false); // 连续拉不到 status：宿主可能正在重启
  const [disclaimerOpen, setDisclaimerOpen] = useState(false); // 开公网前的安全免责声明（issue #31）
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);
  const [tunnelCfg, setTunnelCfg] = useState(null); // 命名隧道表单 { hostname, token, err }
  const [resetOpen, setResetOpen] = useState(false); // 恢复出厂确认框
  const [lanToggleOpen, setLanToggleOpen] = useState(null); // null | true | false（目标 on 状态）
  const [customPin, setCustomPin] = useState(null); // 自定义密码输入 { which: 'public'|'lan', value, err }
  const [advOpen, setAdvOpen] = useState(false); // 局域网「高级（手动选地址）」展开态
  const [toast, setToast] = useState(null);

  const failuresRef = useRef(0); // 连续失败次数（不进 state，避免每次失败都重渲染）
  const mutatedAtRef = useRef(0); // 最近一次本地修改时间：用于丢弃比本地状态更旧的 status 快照
  const loadSeqRef = useRef(0); // load 调用序号：只有最后发起的那次能提交快照（防乱序覆盖）
  const pendingCountsRef = useRef({});
  const reloadAbortRef = useRef(null);
  const toastTimer = useRef(null);
  const lastFocusRef = useRef(null);

  // status 首帧还没回来时，setStatus((s) => ({ ...s, ... })) 会把 null 展开成 {}
  // —— 界面字段短暂变 undefined。统一走这里：没数据就丢弃这次局部更新，
  // 下一次 status 轮询会带回真实值。
  const patchStatus = (patch) => setStatus((s) => (s ? { ...s, ...patch } : s));

  // 单项操作的进行中标记：防止连点造成请求乱序（例如开关连点，先发的「开」后到，
  // 会把「关」的结果盖掉）。mutatedAtRef 同时记录本地修改时刻，供 status 轮询判断快照新旧。
  // pending 的值保持布尔（渲染层大量 pending.x === true 判断），计数单独放在 ref 里：
  // 三个手机端偏好开关共用 'prefs' 这个 key，若直接置 true/delete，先返回的请求会把还在
  // 飞的另一个请求的锁提前解开（连点可重复提交）。
  const withPending = async (key, fn) => {
    mutatedAtRef.current = Date.now();
    const counts = pendingCountsRef.current;
    counts[key] = (counts[key] ?? 0) + 1;
    setPending((p) => (p[key] === true ? p : { ...p, [key]: true }));
    try {
      return await fn();
    } finally {
      counts[key] = Math.max(0, (counts[key] ?? 1) - 1);
      if (counts[key] === 0) {
        delete counts[key];
        setPending((p) => {
          if (p[key] !== true) return p;
          const next = { ...p };
          delete next[key];
          return next;
        });
      }
    }
  };

  // 设置页样式表：按 id 幂等注入；已存在时更新内容，避免插件热重载后残留旧 CSS。
  useEffect(() => {
    const id = 'dshp-settings-css';
    let el = document.getElementById(id);
    if (el && el.tagName !== 'STYLE') el = null;
    if (!el) {
      el = document.createElement('style');
      el.id = id;
      document.head.appendChild(el);
    }
    if (el.textContent !== POCKET_SETTINGS_CSS) el.textContent = POCKET_SETTINGS_CSS;
    return undefined;
  }, []);

  // 进行中操作的「已等待 X 秒」倒计时——只在有活跃倒计时（重启进行中、隧道
  // 连接中）时才挂每秒 tick，操作结束即卸载；空闲设置页不再无条件每秒重渲染
  const countdownActive = !!((versionInfo?.restarting && versionInfo?.startedAt)
    || (tunnelState?.startedAt && ['downloading', 'starting', 'registering'].includes(tunnelState?.phase ?? '')));
  useEffect(() => {
    if (!countdownActive) return undefined;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [countdownActive]);

  const elapsed = (startedAt) => elapsedSince(startedAt, now);

  const call = async (endpoint, payload) => {
    // 30s 上限：隧道半开时 rpc.call 可能永远不回来，导致按钮永久 disabled、只在重启时
    // 靠整页刷新才能恢复。超时按失败处理，让用户看到错误并重试。
    const res = await rpcCall(
      endpoint,
      payload,
      typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function'
        ? AbortSignal.timeout(30000)
        : undefined,
    );
    if (!res?.ok) throw new Error(res?.error?.message ?? 'RPC failed');
    return res.value;
  };

  // 重启后自动刷新：旧进程退出到新进程开始监听之间有数秒空窗（helper 还要等端口
  // 释放、dsh web 还要启动），固定 2 秒 reload 会撞上 ERR_CONNECTION_REFUSED 白屏。
  // 改成轮询本页地址直到真的能连上再刷新；30 秒还没起来就交给用户点「刷新页面」。
  useEffect(() => () => { reloadAbortRef.current?.abort(); }, []);
  const waitForHostThenReload = async () => {
    // 每次重试最多等 3 秒：旧实现单次 fetch 永不 resolve 时会卡在 await，
    // deadline 再也不会被检查，「刷新页面」按钮永远不出现。
    reloadAbortRef.current?.abort();
    const ctrl = new AbortController();
    reloadAbortRef.current = ctrl;
    const deadline = Date.now() + 30000;
    while (Date.now() < deadline && !ctrl.signal.aborted) {
      try {
        const res = await fetchWithTimeout(location.href, { method: 'GET', cache: 'no-store' }, 3000);
        if (res.ok) { if (!ctrl.signal.aborted) location.reload(); return; }
      } catch { /* 新进程还没起来 / 单次请求超时 */ }
      await sleepUnlessAborted(1000, ctrl.signal);
    }
    if (!ctrl.signal.aborted) setAutoReloadFailed(true);
  };

  const load = async () => {
    const startedAt = Date.now();
    // 并发快照的先后顺序：轮询（10s）与 visibilitychange 都会触发 load，经隧道
    // 时一次 /status 可能拖到十几秒，于是「先发的慢请求」晚于「后发的快请求」
    // 落地，用更旧的快照盖掉新状态（隧道进度条倒退、开关回弹）。只有最后发起
    // 的那次 load 允许提交结果；被判过期的这次直接丢弃。
    const seq = ++loadSeqRef.current;
    try {
      const s = await call(POCKET_ENDPOINTS.status, {});
      if (seq !== loadSeqRef.current) return;
      // 拉取期间用户刚改过设置：这份快照可能比本地状态旧，丢掉，否则会把刚切的开关弹回去
      if (mutatedAtRef.current > startedAt) { setOffline(false); failuresRef.current = 0; return; }
      failuresRef.current = 0;
      setOffline(false);
      setStatus(s);
      applyMobileRightbarSetting(s.mobileRightbarEnabled);
      applyMobilePinchZoomSetting(s.mobilePinchZoomEnabled);
      applyMobileFontSize(s.mobileFontSize);
      setTunnelState(s.tunnelState ?? null);
      if (s.desktop) setIsDesktop(true);
      if (s.restartNotice) {
        // 新进程确认起来了：显示一次「已重启」，清掉旧的更新横幅（单状态，不并存），
        // 然后自动刷新页面加载新代码——不用用户手动刷新
        setRestartNotice(true);
        setVersionInfo(null);
        if (!sessionStorage.getItem('dshp-auto-reloaded')) {
          sessionStorage.setItem('dshp-auto-reloaded', '1');
          waitForHostThenReload();
        }
      }
    } catch {
      // 过期的失败不该计入连续失败：另一条更新的 load 已经成功的话，这里加一
      // 会让「offline」横幅在宿主明明正常时亮起来。
      if (seq !== loadSeqRef.current) return;
      // 宿主重启/网络抖动时静默重试；连续失败 2 次才提示，避免一次抖动就报错
      failuresRef.current += 1;
      if (failuresRef.current >= 2) setOffline(true);
    }
  };

  useEffect(() => {
    load();
    // 页面不可见时跳过 status 轮询，回到前台立刻补一次（不等下一拍）。
    // 10s 而非 3s：每次 status 都带两张二维码 data URL，常开设置页没必要这么频繁。
    const onVisible = () => { if (!document.hidden) load(); };
    document.addEventListener('visibilitychange', onVisible);
    const timer = setInterval(() => { if (!document.hidden) load(); }, 10000);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
      // 卸载后迟到的响应一律作废（否则会 setState 到已卸载组件上）
      loadSeqRef.current += 1;
    };
  }, []);

  // 每次页面加载清掉自动刷新标记——这样下次重启（更新后）才能再次触发自动刷新
  useEffect(() => {
    try { sessionStorage.removeItem('dshp-auto-reloaded'); } catch { /* 忽略 */ }
  }, []);

  // 版本信息：只回答一个问题——磁盘上是新版本、进程还跑着旧代码吗？
  //   current = 磁盘 package.json 的版本（重跑 add 装完立刻变）
  //   loaded  = 本进程启动时加载的版本
  // 更新契约只有一条：重跑 README 里的 add 命令装包，再重启 dsh web 生效。插件内不
  // 探测 npm registry（npm 上的 dsh-pocket 不是本 fork，版本号与本仓无关），也没有
  // 一键更新（dsh plugin update 会把上游代码盖在本地修改上）。
  // 桌面端（isDesktop）：重启由 DSH Desktop 管理，不探测、不显示横幅。
  useEffect(() => {
    if (isDesktop) return undefined;
    let alive = true;
    const check = async () => {
      // 切后台时不打 RPC，回前台由 visibilitychange 补一次
      if (document.hidden) return;
      try {
        const v = await call(POCKET_ENDPOINTS.version, {});
        if (!alive) return;
        // 只刷新版本号，保留进行中的重启状态：旧进程仍能应答这次轮询时
        // 不能把「重启中…（Ns）」的计时和错误清掉。
        setVersionInfo((prev) => ({
          current: v.current ?? null,
          loaded: v.loaded ?? null,
          restarting: prev?.restarting === true,
          startedAt: prev?.startedAt,
          error: prev?.error,
        }));
      } catch { /* 宿主暂时连不上：保留上一次读数，回前台再查 */ }
    };
    const onVisible = () => { if (!document.hidden) void check(); };
    document.addEventListener('visibilitychange', onVisible);
    check();
    return () => {
      alive = false;
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [isDesktop]);

  // 装了新版但进程还跑着旧代码——唯一需要提示的更新场景（重启才读得到新代码）。
  // 重启后新进程读到的 loaded 等于 current，横幅自动消失。
  const needsRestart = !!versionInfo?.current && !!versionInfo?.loaded
    && compareVersions(versionInfo.current, versionInfo.loaded) > 0;

  // 重启宿主（加载新代码的唯一方式：刷新页面只重载前端，服务端还是旧进程）
  const restartPocket = async () => {
    setVersionInfo((v) => ({ ...(v ?? {}), restarting: true, startedAt: Date.now(), error: null }));
    try {
      // 宿主 500ms 后自杀，RPC 响应可能来不及送达 → 3 秒超时兜底，别让按钮永远卡「重启中…」
      await Promise.race([
        call(POCKET_ENDPOINTS.restart, {}),
        new Promise((_, rej) => setTimeout(() => rej(new Error('restart requested (no reply within 3s)')), 3000)),
      ]);
      setVersionInfo((v) => ({ ...(v ?? {}), restarting: true }));
    } catch (err) {
      // 网络断连/超时同样视为「已请求重启」——旧进程即将退出，等新进程起来后刷新即可
      const msg = String(err?.message ?? '');
      if (/connection|socket|fetch|network|abort|cancelled|ECONN|disconnect|closed|timeout/i.test(msg)) {
        setVersionInfo((v) => ({ ...(v ?? {}), restarting: true }));
        return;
      }
      setVersionInfo((v) => ({ ...(v ?? {}), restarting: false, error: err.message }));
    }
  };

  // 安全免责声明（issue #31）：每次开启公网都必须先弹框勾选「我已知情」。
  // 服务端同样强制（tunnel.start 需 disclaimer: true），防绕过前端直接调 RPC。
  const doStartTunnel = async () => {
    // 命名隧道模式：Token/域名没配齐就不发起（服务端同样会拒绝）
    const cfg = status?.tunnelConfig;
    if (!cfg?.hostname || !cfg?.tokenSet) {
      setTunnelCfg({ hostname: cfg?.hostname ?? '', token: '', err: t('namedNeedCfg') });
      return;
    }
    setError(null);
    setTunnelState({ phase: 'starting', detail: '正在开启…', startedAt: Date.now() });
    await withPending('wan', async () => {
      try {
        const s = await call(POCKET_ENDPOINTS.tunnelStart, { disclaimer: true });
        setStatus(s);
        // 启动接口返回的就是最新状态：直接同步隧道进度，否则要等下一拍轮询才从「连接中」跳出来
        setTunnelState(s.tunnelState ?? null);
      } catch (err) {
        setError(err.message);
        setTunnelState(null);
      }
    });
  };
  const startTunnel = () => {
    const cfg = status?.tunnelConfig;
    if (!cfg?.hostname || !cfg?.tokenSet) {
      setTunnelCfg({ hostname: cfg?.hostname ?? '', token: '', err: null });
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

  const stopTunnel = () => withPending('wan', async () => {
    try {
      const s = await call(POCKET_ENDPOINTS.tunnelStop, {});
      setStatus(s);
      setTunnelState(s.tunnelState ?? null);
    } catch (err) {
      setError(err.message);
    }
  });

  // Token 输入留空时保留已有凭据；配置保存不自动开启公网。
  const saveNamedTunnel = () => withPending('saveNamed', async () => {
    try {
      const s = await call(POCKET_ENDPOINTS.tunnelSetConfig, {
        mode: 'named',
        hostname: tunnelCfg?.hostname ?? '',
        token: tunnelCfg?.token || undefined, // 留空不覆盖已存 Token
      });
      setStatus(s);
      setTunnelCfg(null);
    } catch (err) {
      setTunnelCfg((c) => ({ ...(c ?? {}), err: err.message }));
    }
  });

  // 恢复出厂设置：清本机设置 + 重设随机密码（弹窗确认；RPC 端也强制校验 confirm）
  const doFactoryReset = async () => {
    setResetOpen(false);
    setError(null);
    await withPending('reset', async () => {
      try {
        const next = await call(POCKET_ENDPOINTS.pocketReset, { confirm: true });
        setStatus(next);
        applyMobileRightbarSetting(next.mobileRightbarEnabled);
        applyMobilePinchZoomSetting(next.mobilePinchZoomEnabled);
        applyMobileFontSize(next.mobileFontSize);
        setTunnelCfg(null);
        setCustomPin(null);
        setAdvOpen(false);
        setPinShown({});
        // 重置可能不完整（设置文件删不掉 / 新 PIN 只落内存）：说清楚，
        // 否则用户以为回到了出厂，实际开关和密码还是旧的。
        if (Array.isArray(next?.resetWarnings) && next.resetWarnings.length > 0) {
          setError(next.resetWarnings.join('；'));
          showToast(t('resetPartial'));
        } else {
          showToast(t('resetDone'));
        }
      } catch (err) {
        setError(err.message);
        showToast(t('resetFailed'));
      }
    });
  };

  // 刷新局域网访问密码（旧密码立即作废）
  const refreshLanPin = () => withPending('refreshPin', async () => {
    try {
      const r = await call(POCKET_ENDPOINTS.lanTokenRefresh, {});
      setStatus((s) => (s ? { ...s, lanToken: r.lanToken } : s));
      // 新密码默认不保持明文展示
      setPinShown((m) => ({ ...m, lan: false }));
    } catch (err) {
      setError(err.message);
    }
  });

  // 局域网访问密码开关（issue #24）：默认开启；关闭后局域网扫码直连（公网不受影响）
  const setLanAuth = (on) => withPending('lanAuth', async () => {
    try {
      const r = await call(POCKET_ENDPOINTS.lanAuthSetEnabled, { on });
      setStatus((s) => (s ? { ...s, lanAuthEnabled: r.lanAuthEnabled } : s));
    } catch (err) {
      setError(err.message);
    }
  });

  const setMobileRightbar = (on) => withPending('prefs', async () => {
    try {
      const r = await call(POCKET_ENDPOINTS.mobileRightbarSetEnabled, { on });
      const enabled = r.mobileRightbarEnabled === true;
      patchStatus({ mobileRightbarEnabled: enabled });
      applyMobileRightbarSetting(enabled);
    } catch (err) {
      setError(err.message);
    }
  });

  const setMobilePinchZoom = (on) => withPending('prefs', async () => {
    try {
      const r = await call(POCKET_ENDPOINTS.mobilePinchZoomSetEnabled, { on });
      const enabled = r.mobilePinchZoomEnabled === true;
      patchStatus({ mobilePinchZoomEnabled: enabled });
      applyMobilePinchZoomSetting(enabled);
    } catch (err) {
      setError(err.message);
    }
  });

  const setMobileFontSize = (size) => withPending('prefs', async () => {
    try {
      const r = await call(POCKET_ENDPOINTS.mobileFontSetSize, { size });
      const px = Number(r.mobileFontSize) || 0;
      patchStatus({ mobileFontSize: px });
      applyMobileFontSize(px);
    } catch (err) {
      setError(err.message);
    }
  });

  // 代理侧缓存（评审 §3.4）：清空静态资源转码缓存与会话列表瘦身缓存。
  // 缓存只是中间结果，清掉只会让下一次加载变慢，所以不做二次确认；
  // 用量随下一次 status 轮询刷新（status.cache），这里顺手用返回值立即纠正。
  const clearCache = () => withPending('cache', async () => {
    try {
      const r = await call(POCKET_ENDPOINTS.cacheClear, {});
      patchStatus({ cache: r.cache });
      showToast(fmtToastBytes(t, 'cacheCleared', r.freedBytes));
    } catch (err) {
      setError(err.message);
    }
  });

  // 使用探针（评审 §7.1）：开关与清空。数据只是本机 JSONL，清掉不影响任何功能；
  // 关掉后手机端下次拉 status 就会停采并清掉本地残留（端点见 lib/web-rpc.js）。
  const clearProbe = () => withPending('probe', async () => {
    try {
      const r = await call(POCKET_ENDPOINTS.probeClear, {});
      patchStatus({ probe: r.probe });
      showToast(fmtToastBytes(t, 'probeCleared', r.freedBytes));
    } catch (err) {
      setError(err.message);
    }
  });

  const setProbe = (on) => withPending('probe', async () => {
    try {
      const r = await call(POCKET_ENDPOINTS.probeSetEnabled, { on });
      patchStatus({ probe: r.probe });
      showToast(on ? t('probeEnabledToast') : t('probeDisabledToast'));
    } catch (err) {
      setError(err.message);
    }
  });

  // 局域网访问总开关：关闭后局域网扫码/链接直接失效（公网不受影响）。
  // 切换前弹窗确认；服务端用 setLanEnabled 持久化，代理按 Host 实时拦截。
  const requestLanToggle = (on) => setLanToggleOpen(on);
  const confirmLanToggle = () => {
    const on = lanToggleOpen;
    setLanToggleOpen(null);
    if (on === null) return undefined;
    return withPending('lanToggle', async () => {
      try {
        const r = await call(POCKET_ENDPOINTS.lanSetEnabled, { on });
        setStatus((s) => (s ? { ...s, lanEnabled: r.lanEnabled } : s));
      } catch (err) {
        setError(err.message);
      }
    });
  };

  // 局域网地址手动覆盖（Tailscale/VPN 等远程访问场景）：空值恢复自动选择
  const setLanAddress = (ip) => withPending('lanAddr', async () => {
    try {
      setStatus(await call(POCKET_ENDPOINTS.lanSetOverride, { ip }));
    } catch (err) {
      setError(err.message);
    }
  });

  // 自定义访问密码：公网/局域网各自设固定 8–64 位密码（英文字母大小写或数字）。
  const saveCustomPin = (which) => withPending('savePin', async () => {
    // 先做本地长度校验，不合法就不发请求（服务端还会再校验一次）
    if (String(customPin?.value ?? '').length < 8) {
      setCustomPin((c) => ({ ...(c ?? {}), err: t('pinInvalid') }));
      return;
    }
    try {
      const r = await call(POCKET_ENDPOINTS.pinSetCustom, { which, value: customPin?.value ?? '' });
      setStatus((s) => (s ? {
        ...s,
        accessToken: which === 'public' ? r.pin : s.accessToken,
        lanToken: which === 'lan' ? r.pin : s.lanToken,
        publicPinCustom: which === 'public' ? true : s.publicPinCustom,
        lanPinCustom: which === 'lan' ? true : s.lanPinCustom,
      } : s));
      setCustomPin(null);
      // 写入磁盘失败时后端仍返回内存 PIN（本次运行有效），但重启后会失效。
      // 不提示的话用户以为改好了，重启后再也登不上。
      if (r && r.persisted === false) {
        showToast(t('pinSaveMemoryOnly'));
      }
    } catch (err) {
      setCustomPin((c) => ({ ...(c ?? {}), err: err.message }));
    }
  });

  const lanUrl = status?.lanUrl;
  const tunnelUrl = status?.tunnelUrl;
  // 轻量视图的地址：优先公网（在哪儿都能开），其次局域网（不走隧道，最快），
  // 最后才用当前 origin——设置页有时是从 127.0.0.1 打开的，那个地址手机连不上。
  const liteUrl = (tunnelUrl || lanUrl || (typeof location !== 'undefined' ? location.origin : '')) + '/__dsh-pocket/lite';
  // 公网来源（隧道）只能管理自己的密码：隧道开关/配置、局域网开关、恢复出厂
  // 都是本机主人的动作，服务端会回 forbidden，前端据此直接隐藏而不是让用户点了报错。
  const publicView = status?.origin === 'public';
  const tunnelPhase = tunnelState?.phase ?? 'idle';
  const tunnelStarting = ['downloading', 'starting', 'registering'].includes(tunnelPhase);
  const tunnelStateDetail = tunnelState?.detail ?? '';
  const tunnelStateStarted = tunnelState?.startedAt ?? null;
  const tunnelConfig = status?.tunnelConfig ?? { hostname: '', tokenSet: false };
  const publicConfigured = Boolean(tunnelConfig.hostname && tunnelConfig.tokenSet);
  const openTunnelConfig = () => setTunnelCfg({ hostname: tunnelConfig.hostname ?? '', token: '', err: null });
  const tunnelConfigChanged = Boolean(tunnelUrl && tunnelUrl !== 'https://' + tunnelConfig.hostname);
  const errText = makeErrText(t);

  // 轻量 Toast：操作成功/失败后短暂提示（自动消失，不打断操作）
  const showToast = (text) => {
    setToast(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // 弹窗可访问性：Esc 关闭最上层弹窗；打开时记住焦点，关闭后还回去（键盘用户不丢位置）。
  const anyModalOpen = disclaimerOpen || lanToggleOpen !== null || resetOpen;
  useEffect(() => {
    if (!anyModalOpen) return undefined;
    lastFocusRef.current = document.activeElement;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      // 弹窗自己消费掉 Esc：只 preventDefault 的话事件继续冒泡到宿主监听器，
      // 一次 Esc 会同时关掉弹窗与设置分区（用户填到一半的表单随之丢失）。
      e.preventDefault();
      e.stopPropagation();
      if (disclaimerOpen) { setDisclaimerOpen(false); return; }
      if (lanToggleOpen !== null) { setLanToggleOpen(null); return; }
      if (resetOpen) setResetOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      const el = lastFocusRef.current;
      lastFocusRef.current = null;
      if (el && typeof el.focus === 'function' && el.isConnected) el.focus();
    };
  }, [anyModalOpen, disclaimerOpen, lanToggleOpen, resetOpen]);

  return {
    t, status, error, setError, offline, pending, patchStatus,
    tunnelState, tunnelPhase, tunnelStarting, tunnelStateDetail, tunnelStateStarted,
    tunnelConfig, publicConfigured, tunnelConfigChanged, openTunnelConfig,
    tunnelCfg, setTunnelCfg, saveNamedTunnel, startTunnel, stopTunnel,
    disclaimerOpen, setDisclaimerOpen, disclaimerChecked, setDisclaimerChecked, confirmDisclaimer,
    lanUrl, tunnelUrl, liteUrl, publicView,
    lanToggleOpen, setLanToggleOpen, requestLanToggle, confirmLanToggle,
    setLanAuth, refreshLanPin, setLanAddress,
    customPin, setCustomPin, saveCustomPin, pinShown, setPinShown,
    advOpen, setAdvOpen,
    restartNotice, setRestartNotice, versionInfo, restartDismissed, setRestartDismissed,
    isDesktop, autoReloadFailed, setAutoReloadFailed, needsRestart, restartPocket, waitForHostThenReload,
    setMobileRightbar, setMobilePinchZoom, setMobileFontSize,
    clearCache, clearProbe, setProbe,
    resetOpen, setResetOpen, doFactoryReset,
    toast, showToast, now, elapsed, errText,
  };
}

// 清缓存/清探针的 Toast 文案都带一个「释放了多少 MB」的占位符。
function fmtToastBytes(t, key, freedBytes) {
  return t(key).split('{mb}').join(((Number(freedBytes) || 0) / 1024 / 1024).toFixed(1));
}
