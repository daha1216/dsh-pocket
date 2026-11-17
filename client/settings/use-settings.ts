// dsh-pocket v4.0 设置页状态与数据层 Hook
import { useEffect, useRef, useState } from 'react';

import * as pocketApi from '../api.js';
import { POCKET_SETTINGS_CSS } from './styles.ts';
import {
  applyMobileFilePreviewSetting,
  applyMobileFontSize,
  applyMobilePinchZoomSetting,
  applyMobileRightbarSetting,
  elapsedSince,
  encodeQrSvgDataUrl,
  fetchWithTimeout,
  makeErrText,
  sleepUnlessAborted,
  type TranslateFn,
} from './util.ts';

const { POCKET_ENDPOINTS, compareVersions } = pocketApi;

const EP = {
  status: POCKET_ENDPOINTS.status ?? 'pocket.status',
  tunnelStart: POCKET_ENDPOINTS.tunnelStart ?? 'tunnel.start',
  tunnelStop: POCKET_ENDPOINTS.tunnelStop ?? 'tunnel.stop',
  tunnelSetConfig: POCKET_ENDPOINTS.tunnelSetConfig ?? 'tunnel.setConfig',
  version: POCKET_ENDPOINTS.version ?? 'pocket.version',
  restart: POCKET_ENDPOINTS.restart ?? 'pocket.restart',
  lanTokenRefresh: POCKET_ENDPOINTS.lanTokenRefresh ?? 'token.lanRefresh',
  lanAuthSetEnabled: POCKET_ENDPOINTS.lanAuthSetEnabled ?? 'lanAuth.setEnabled',
  lanSetOverride: POCKET_ENDPOINTS.lanSetOverride ?? 'lan.setOverride',
  lanSetEnabled: POCKET_ENDPOINTS.lanSetEnabled ?? 'lan.setEnabled',
  mobileRightbarSetEnabled: POCKET_ENDPOINTS.mobileRightbarSetEnabled ?? 'mobile.rightbar.setEnabled',
  mobilePinchZoomSetEnabled: POCKET_ENDPOINTS.mobilePinchZoomSetEnabled ?? 'mobile.pinchZoom.setEnabled',
  mobileFontSetSize: POCKET_ENDPOINTS.mobileFontSetSize ?? 'mobile.font.setSize',
  mobileFilePreviewSetEnabled:
    (POCKET_ENDPOINTS as Record<string, string | undefined>).mobileFilePreviewSetEnabled ?? 'mobile.filePreview.setEnabled',
  pinSetCustom: POCKET_ENDPOINTS.pinSetCustom ?? 'pin.setCustom',
  pocketReset: POCKET_ENDPOINTS.pocketReset ?? 'pocket.reset',
  cacheClear: POCKET_ENDPOINTS.cacheClear ?? 'pocket.cache.clear',
  pairingIssue: (POCKET_ENDPOINTS as Record<string, string | undefined>).pairingIssue ?? 'pairing.issue',
  devicesList: (POCKET_ENDPOINTS as Record<string, string | undefined>).devicesList ?? 'devices.list',
  devicesRename: (POCKET_ENDPOINTS as Record<string, string | undefined>).devicesRename ?? 'devices.rename',
  devicesRevoke: (POCKET_ENDPOINTS as Record<string, string | undefined>).devicesRevoke ?? 'devices.revoke',
  devicesRevokeAll: (POCKET_ENDPOINTS as Record<string, string | undefined>).devicesRevokeAll ?? 'devices.revokeAll',
} as const;

export type ChannelKind = 'lan' | 'public';

export interface TunnelStateInfo {
  phase?: 'idle' | 'downloading' | 'starting' | 'registering' | 'ready' | 'reconnecting' | 'error' | string;
  detail?: string;
  startedAt?: number | null;
  attempt?: number;
  nextRetryAt?: number | null;
}

export interface TunnelConfigInfo {
  mode?: string;
  hostname?: string;
  tokenSet?: boolean;
}

export interface TunnelPreflightInfo {
  tunDetected?: boolean;
  tunInterfaces?: string[];
  proxyEnvDetected?: boolean;
  proxyEnvStripped?: boolean;
  portShifted?: boolean;
  targetServiceUrl?: string;
}

export interface PocketDevice {
  id: string;
  name?: string;
  autoName?: string;
  uaSummary?: string;
  kind?: 'phone' | 'tablet' | 'desktop' | string;
  channel?: 'lan' | 'public' | string;
  authMethod?: 'pair' | 'pin' | string;
  online?: boolean;
  createdAt?: number | string;
  lastSeenAt?: number | string;
  lastIp?: string;
}

export type LanCandidateItem = string | { ip: string; name?: string; virtual?: boolean };

export interface CacheStatsInfo {
  bytes?: number;
  budgetBytes?: number;
  entries?: number;
}

export interface PocketStatus {
  origin?: 'loopback' | 'lan' | 'public' | string;
  desktop?: boolean;
  proxyRunning?: boolean;
  proxyPort?: number | null;
  dshPort?: number | null;
  portShifted?: boolean;
  preflight?: TunnelPreflightInfo | null;
  lanEnabled?: boolean;
  lanAuthEnabled?: boolean;
  lanUrl?: string | null;
  lanQr?: string | null;
  lanToken?: string | null;
  lanPinCustom?: boolean;
  lanCandidates?: LanCandidateItem[];
  lanIpOverride?: string;
  tunnelRunning?: boolean;
  tunnelUrl?: string | null;
  tunnelQr?: string | null;
  tunnelState?: TunnelStateInfo | null;
  tunnelConfig?: TunnelConfigInfo | null;
  accessToken?: string | null;
  publicPinCustom?: boolean;
  mobileRightbarEnabled?: boolean;
  mobilePinchZoomEnabled?: boolean;
  mobileFontSize?: number;
  mobileFilePreviewEnabled?: boolean;
  devices?: PocketDevice[];
  cache?: CacheStatsInfo | null;
  restartNotice?: unknown;
  killHint?: string;
  resetWarnings?: string[];
}

export interface VersionInfoState {
  current: string | null;
  loaded: string | null;
  restarting: boolean;
  startedAt?: number;
  error?: string | null;
}

export interface PairingTicketState {
  channel: ChannelKind;
  ticket: string;
  url: string;
  qr: string | null;
  expiresAt: number;
}

export interface TunnelFormState {
  hostname: string;
  token: string;
  err: string | null;
}

export interface CustomPinFormState {
  which: 'lan' | 'public';
  value: string;
  err: string | null;
}

export interface RpcEnvelope<T = any> {
  ok?: boolean;
  value?: T;
  error?: { code?: string; message?: string };
}

export type RpcCallFn = (endpoint: string, payload?: Record<string, unknown>, signal?: AbortSignal) => Promise<RpcEnvelope>;

export function useSettings(rpcCall: RpcCallFn, t: TranslateFn) {
  // status 必须保持为第一个 useState，兼容轻量 VM 测试桩按槽位 0 注入初始快照
  const [status, setStatus] = useState<PocketStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tunnelState, setTunnelState] = useState<TunnelStateInfo | null>(null);
  const [restartNotice, setRestartNotice] = useState<boolean>(false);
  const [versionInfo, setVersionInfo] = useState<VersionInfoState | null>(null);
  const [restartDismissed, setRestartDismissed] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [pinShown, setPinShown] = useState<{ lan?: boolean; public?: boolean }>({});
  const [autoReloadFailed, setAutoReloadFailed] = useState<boolean>(false);
  const [pending, setPending] = useState<Record<string, boolean>>({});
  const [offline, setOffline] = useState<boolean>(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState<boolean>(false);
  const [disclaimerChecked, setDisclaimerChecked] = useState<boolean>(false);
  const [tunnelCfg, setTunnelCfg] = useState<TunnelFormState | null>(null);
  const [resetOpen, setResetOpen] = useState<boolean>(false);
  const [lanToggleOpen, setLanToggleOpen] = useState<boolean | null>(null);
  const [customPin, setCustomPin] = useState<CustomPinFormState | null>(null);
  const [advSectionOpen, setAdvSectionOpen] = useState<boolean>(false);
  const [activeChannel, setActiveChannel] = useState<ChannelKind>('lan');
  const [pairing, setPairing] = useState<PairingTicketState | null>(null);
  const [devicesFallback, setDevicesFallback] = useState<PocketDevice[]>([]);
  const [editingDevice, setEditingDevice] = useState<{ id: string; name: string } | null>(null);
  const [revokeAllOpen, setRevokeAllOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  const failuresRef = useRef<number>(0);
  const mutatedAtRef = useRef<number>(0);
  const loadSeqRef = useRef<number>(0);
  const pairSeqRef = useRef<number>(0);
  const pendingCountsRef = useRef<Record<string, number>>({});
  const reloadAbortRef = useRef<AbortController | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pairTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const channelInitializedRef = useRef<boolean>(false);
  const devicesRpcUnsupportedRef = useRef<boolean>(false);

  const patchStatus = (patch: Partial<PocketStatus>) => {
    setStatus((s) => (s ? { ...s, ...patch } : s));
  };

  const withPending = async <T,>(key: string, fn: () => Promise<T>): Promise<T> => {
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

  const showToast = (text: string) => {
    setToast(text);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2600);
  };

  useEffect(() => () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    if (pairTimerRef.current) clearTimeout(pairTimerRef.current);
    reloadAbortRef.current?.abort();
  }, []);

  // 幂等注入设置页样式表（优先复用 DSH 0.2.2+ meta.stylesheets 或入口 ctx.effect 已挂载节点；独立挂载时卸载自清）
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const hostManaged =
      document.querySelector?.(
        'style[data-plugin="dsh-pocket"][data-path="client/settings/styles.css"]',
      ) ?? null;
    if (hostManaged !== null) return undefined;

    let existing = (document.getElementById?.('dshp-settings-css') ??
      document.querySelector?.('style#dshp-settings-css') ??
      null) as HTMLStyleElement | null;
    if (existing && existing.tagName && existing.tagName !== 'STYLE') existing = null;
    if (existing) {
      if (existing.textContent !== POCKET_SETTINGS_CSS) {
        existing.textContent = POCKET_SETTINGS_CSS;
      }
      return undefined;
    }

    const el = document.createElement('style');
    el.id = 'dshp-settings-css';
    el.setAttribute?.('data-plugin', 'dsh-pocket');
    el.textContent = POCKET_SETTINGS_CSS;
    document.head?.appendChild(el);
    return () => {
      el?.remove();
    };
  }, []);

  const call = async <T = any>(endpoint: string, payload: Record<string, unknown> = {}): Promise<T> => {
    const signal =
      typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function'
        ? AbortSignal.timeout(30000)
        : undefined;
    const res = await rpcCall(endpoint, payload, signal);
    if (!res?.ok) throw new Error(res?.error?.message ?? 'RPC failed');
    return res.value as T;
  };

  const applyAllMobilePrefs = (s: PocketStatus | null | undefined) => {
    if (!s) return;
    applyMobileRightbarSetting(s.mobileRightbarEnabled);
    applyMobilePinchZoomSetting(s.mobilePinchZoomEnabled);
    applyMobileFontSize(s.mobileFontSize);
    applyMobileFilePreviewSetting(s.mobileFilePreviewEnabled);
  };

  const waitForHostThenReload = async () => {
    if (typeof location === 'undefined') return;
    reloadAbortRef.current?.abort();
    const ctrl = new AbortController();
    reloadAbortRef.current = ctrl;
    const deadline = Date.now() + 30000;
    while (Date.now() < deadline && !ctrl.signal.aborted) {
      try {
        const res = await fetchWithTimeout(location.href, { method: 'GET', cache: 'no-store' }, 3000);
        if (res.ok) {
          if (!ctrl.signal.aborted) location.reload();
          return;
        }
      } catch {
        // 新进程尚未监听就绪
      }
      await sleepUnlessAborted(1000, ctrl.signal);
    }
    if (!ctrl.signal.aborted) setAutoReloadFailed(true);
  };

  const fetchDevicesIfNeeded = async (s: PocketStatus) => {
    if (s.origin === 'public') return;
    if (Array.isArray(s.devices)) {
      setDevicesFallback(s.devices);
      return;
    }
    if (devicesRpcUnsupportedRef.current) return;
    try {
      const res = await call<{ devices?: PocketDevice[] } | PocketDevice[]>(EP.devicesList, {});
      const list = Array.isArray(res) ? res : Array.isArray(res?.devices) ? res.devices : null;
      if (list) setDevicesFallback(list);
    } catch {
      // 旧宿主或测试桩未挂载 devices.list 时静默回退
      devicesRpcUnsupportedRef.current = true;
    }
  };

  const load = async () => {
    const startedAt = Date.now();
    const seq = ++loadSeqRef.current;
    try {
      const s = await call<PocketStatus>(EP.status, {});
      if (seq !== loadSeqRef.current) return;
      if (mutatedAtRef.current > startedAt) {
        setOffline(false);
        failuresRef.current = 0;
        return;
      }
      failuresRef.current = 0;
      setOffline(false);
      setStatus(s);
      applyAllMobilePrefs(s);
      setTunnelState(s.tunnelState ?? null);
      if (!channelInitializedRef.current) {
        channelInitializedRef.current = true;
        if (s.origin === 'public') setActiveChannel('public');
      }
      if (s.desktop) setIsDesktop(true);
      if (s.restartNotice) {
        setRestartNotice(true);
        setVersionInfo(null);
        try {
          if (typeof sessionStorage !== 'undefined' && !sessionStorage.getItem('dshp-auto-reloaded')) {
            sessionStorage.setItem('dshp-auto-reloaded', '1');
            void waitForHostThenReload();
          }
        } catch {
          // 忽略隐私模式限制
        }
      }
      void fetchDevicesIfNeeded(s);
    } catch {
      if (seq !== loadSeqRef.current) return;
      failuresRef.current += 1;
      if (failuresRef.current >= 2) setOffline(true);
    }
  };

  useEffect(() => {
    void load();
    if (typeof document === 'undefined') return undefined;
    const onVisible = () => {
      if (!document.hidden) void load();
    };
    document.addEventListener('visibilitychange', onVisible);
    const timer = setInterval(() => {
      if (!document.hidden) void load();
    }, 10000);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
      loadSeqRef.current += 1;
    };
  }, []);

  useEffect(() => {
    try {
      if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem('dshp-auto-reloaded');
    } catch {
      // 忽略
    }
  }, []);

  // 版本检测：桌面客户端由 DSH Desktop 统一管理升级与重启
  useEffect(() => {
    if (isDesktop) return undefined;
    let alive = true;
    const check = async () => {
      if (typeof document !== 'undefined' && document.hidden) return;
      try {
        const v = await call<{ current?: string | null; loaded?: string | null }>(EP.version, {});
        if (!alive) return;
        setVersionInfo((prev) => ({
          current: v?.current ?? null,
          loaded: v?.loaded ?? null,
          restarting: prev?.restarting === true,
          startedAt: prev?.startedAt,
          error: prev?.error ?? null,
        }));
      } catch {
        // 忽略瞬时断连
      }
    };
    const onVisible = () => {
      if (typeof document === 'undefined' || !document.hidden) void check();
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', onVisible);
    }
    void check();
    return () => {
      alive = false;
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', onVisible);
      }
    };
  }, [isDesktop]);

  // 一键免密扫码配对票据自动签发与到期前 10s 自动续期（仅限本机 loopback）
  const channelBaseUrl = activeChannel === 'lan' ? (status?.lanUrl ?? '') : (status?.tunnelUrl ?? '');
  const canIssuePairing = Boolean(
    status?.origin === 'loopback'
    && (activeChannel === 'lan'
      ? status.lanEnabled !== false && Boolean(status.lanUrl)
      : Boolean(status.tunnelUrl)),
  );

  const issuePairingTicket = async (channel: ChannelKind, manualToast = false) => {
    const seq = ++pairSeqRef.current;
    if (pairTimerRef.current) {
      clearTimeout(pairTimerRef.current);
      pairTimerRef.current = null;
    }
    try {
      const res = await call<{
        ticket?: string;
        url?: string;
        qr?: string;
        qrDataUrl?: string;
        expiresAt?: number;
        ttlMs?: number;
      }>(EP.pairingIssue, { channel });
      if (seq !== pairSeqRef.current) return;
      if (!res?.url || !res?.ticket) {
        setPairing(null);
        return;
      }
      const qr = res.qr ?? res.qrDataUrl ?? (await encodeQrSvgDataUrl(res.url));
      if (seq !== pairSeqRef.current) return;
      const expiresAt = Number(res.expiresAt) || Date.now() + (Number(res.ttlMs) || 90_000);
      const nextState: PairingTicketState = {
        channel,
        ticket: res.ticket,
        url: res.url,
        qr,
        expiresAt,
      };
      setPairing(nextState);
      if (manualToast) showToast(t('pairRefreshed'));
      const renewDelay = Math.max(3000, expiresAt - Date.now() - 10_000);
      pairTimerRef.current = setTimeout(() => {
        if (typeof document === 'undefined' || !document.hidden) {
          void issuePairingTicket(channel, false);
        }
      }, renewDelay);
    } catch {
      // 若后端桩环境未启用 pairing.issue，静默降级回标准二维码，绝不报错打断设置页
      if (seq === pairSeqRef.current) setPairing(null);
    }
  };

  useEffect(() => {
    if (!canIssuePairing) {
      pairSeqRef.current += 1;
      if (pairTimerRef.current) {
        clearTimeout(pairTimerRef.current);
        pairTimerRef.current = null;
      }
      setPairing(null);
      return undefined;
    }
    void issuePairingTicket(activeChannel, false);
    const onVisible = () => {
      if (typeof document !== 'undefined' && !document.hidden) {
        void issuePairingTicket(activeChannel, false);
      }
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', onVisible);
    }
    return () => {
      pairSeqRef.current += 1;
      if (pairTimerRef.current) {
        clearTimeout(pairTimerRef.current);
        pairTimerRef.current = null;
      }
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', onVisible);
      }
    };
  }, [canIssuePairing, activeChannel, channelBaseUrl]);

  const refreshPairingTicket = () => {
    if (!canIssuePairing) return Promise.resolve();
    return withPending('pairRefresh', () => issuePairingTicket(activeChannel, true));
  };

  // 重启宿主进程
  const restartPocket = async () => {
    setVersionInfo((v) => ({
      current: v?.current ?? null,
      loaded: v?.loaded ?? null,
      restarting: true,
      startedAt: Date.now(),
      error: null,
    }));
    try {
      await Promise.race([
        call(EP.restart, {}),
        new Promise((_, rej) => setTimeout(() => rej(new Error('restart requested (timeout)')), 3000)),
      ]);
      setVersionInfo((v) => (v ? { ...v, restarting: true } : v));
    } catch (err: any) {
      const msg = String(err?.message ?? '');
      if (/connection|socket|fetch|network|abort|cancelled|ECONN|disconnect|closed|timeout/i.test(msg)) {
        setVersionInfo((v) => (v ? { ...v, restarting: true } : v));
        return;
      }
      setVersionInfo((v) => (v ? { ...v, restarting: false, error: msg } : v));
    }
  };

  // 公网命名隧道启停与配置
  const doStartTunnel = async () => {
    const cfg = status?.tunnelConfig;
    if (!cfg?.hostname || !cfg?.tokenSet) {
      setActiveChannel('public');
      setTunnelCfg({ hostname: cfg?.hostname ?? '', token: '', err: t('namedNeedCfg') });
      return;
    }
    setError(null);
    setTunnelState({ phase: 'starting', detail: t('opening'), startedAt: Date.now() });
    await withPending('wan', async () => {
      try {
        const s = await call<PocketStatus>(EP.tunnelStart, { disclaimer: true });
        setStatus(s);
        setTunnelState(s.tunnelState ?? null);
      } catch (err: any) {
        setError(String(err?.message ?? err));
        setTunnelState(null);
      }
    });
  };

  const startTunnel = () => {
    const cfg = status?.tunnelConfig;
    if (!cfg?.hostname || !cfg?.tokenSet) {
      setActiveChannel('public');
      setTunnelCfg({ hostname: cfg?.hostname ?? '', token: '', err: null });
      return;
    }
    setDisclaimerChecked(false);
    setDisclaimerOpen(true);
  };

  const confirmDisclaimer = () => {
    if (!disclaimerChecked) return;
    setDisclaimerOpen(false);
    void doStartTunnel();
  };

  const stopTunnel = () =>
    withPending('wan', async () => {
      try {
        const s = await call<PocketStatus>(EP.tunnelStop, {});
        setStatus(s);
        setTunnelState(s.tunnelState ?? null);
      } catch (err: any) {
        setError(String(err?.message ?? err));
      }
    });

  const saveNamedTunnel = () =>
    withPending('saveNamed', async () => {
      try {
        const s = await call<PocketStatus>(EP.tunnelSetConfig, {
          mode: 'named',
          hostname: tunnelCfg?.hostname ?? '',
          token: tunnelCfg?.token || undefined,
        });
        setStatus(s);
        setTunnelState(s.tunnelState ?? null);
        setTunnelCfg(null);
      } catch (err: any) {
        setTunnelCfg((c) => ({
          hostname: c?.hostname ?? '',
          token: c?.token ?? '',
          err: String(err?.message ?? err),
        }));
      }
    });

  // 局域网访问开关与网卡选择
  const requestLanToggle = (on: boolean) => setLanToggleOpen(on);

  const confirmLanToggle = () => {
    const on = lanToggleOpen;
    setLanToggleOpen(null);
    if (on === null) return undefined;
    return withPending('lanToggle', async () => {
      try {
        const r = await call<{ lanEnabled: boolean }>(EP.lanSetEnabled, { on });
        patchStatus({ lanEnabled: r.lanEnabled });
      } catch (err: any) {
        setError(String(err?.message ?? err));
      }
    });
  };

  const setLanAuth = (on: boolean) =>
    withPending('lanAuth', async () => {
      try {
        const r = await call<{ lanAuthEnabled: boolean }>(EP.lanAuthSetEnabled, { on });
        patchStatus({ lanAuthEnabled: r.lanAuthEnabled });
      } catch (err: any) {
        setError(String(err?.message ?? err));
      }
    });

  const refreshLanPin = () =>
    withPending('refreshPin', async () => {
      try {
        const r = await call<{ lanToken: string }>(EP.lanTokenRefresh, {});
        patchStatus({ lanToken: r.lanToken, lanPinCustom: false });
        setPinShown((m) => ({ ...m, lan: false }));
      } catch (err: any) {
        setError(String(err?.message ?? err));
      }
    });

  const setLanAddress = (ip: string) =>
    withPending('lanAddr', async () => {
      try {
        const next = await call<PocketStatus>(EP.lanSetOverride, { ip });
        setStatus(next);
      } catch (err: any) {
        setError(String(err?.message ?? err));
      }
    });

  const saveCustomPin = (which: 'lan' | 'public') =>
    withPending('savePin', async () => {
      const val = String(customPin?.value ?? '');
      if (val.length < 8) {
        setCustomPin((c) => ({
          which: c?.which ?? which,
          value: val,
          err: t('pinInvalid'),
        }));
        return;
      }
      try {
        const r = await call<{ pin: string; persisted?: boolean }>(EP.pinSetCustom, { which, value: val });
        setStatus((s) =>
          s
            ? {
                ...s,
                accessToken: which === 'public' ? r.pin : s.accessToken,
                lanToken: which === 'lan' ? r.pin : s.lanToken,
                publicPinCustom: which === 'public' ? true : s.publicPinCustom,
                lanPinCustom: which === 'lan' ? true : s.lanPinCustom,
              }
            : s,
        );
        setCustomPin(null);
        if (r && r.persisted === false) {
          showToast(t('pinSaveMemoryOnly'));
        }
      } catch (err: any) {
        setCustomPin((c) => ({
          which: c?.which ?? which,
          value: val,
          err: String(err?.message ?? err),
        }));
      }
    });

  // 已授权设备管理（重命名 / 单台移除 / 全部移除）
  const syncDevicesList = (updater: (prev: PocketDevice[]) => PocketDevice[]) => {
    setDevicesFallback((prev) => updater(prev));
    setStatus((s) => (s && Array.isArray(s.devices) ? { ...s, devices: updater(s.devices) } : s));
  };

  const startRenameDevice = (dev: PocketDevice) => {
    setEditingDevice({
      id: dev.id,
      name: dev.name || dev.autoName || dev.uaSummary || '',
    });
  };

  const cancelRenameDevice = () => setEditingDevice(null);

  const renameDevice = (id: string, rawName: string) =>
    withPending(`dev:${id}`, async () => {
      const trimmed = rawName.trim().slice(0, 64);
      try {
        const res = await call<{ devices?: PocketDevice[]; device?: PocketDevice }>(EP.devicesRename, {
          id,
          name: trimmed,
        });
        if (Array.isArray(res?.devices)) {
          syncDevicesList(() => res.devices!);
        } else {
          syncDevicesList((list) =>
            list.map((d) => (d.id === id ? { ...d, ...(res?.device ?? {}), name: trimmed } : d)),
          );
        }
        setEditingDevice(null);
        showToast(t('deviceRenamed'));
      } catch (err: any) {
        setError(String(err?.message ?? err));
      }
    });

  const revokeDevice = (id: string) =>
    withPending(`dev:${id}`, async () => {
      try {
        const res = await call<{ devices?: PocketDevice[] }>(EP.devicesRevoke, { id });
        if (Array.isArray(res?.devices)) {
          syncDevicesList(() => res.devices!);
        } else {
          syncDevicesList((list) => list.filter((d) => d.id !== id));
        }
        if (editingDevice?.id === id) setEditingDevice(null);
        showToast(t('deviceRevoked'));
      } catch (err: any) {
        setError(String(err?.message ?? err));
      }
    });

  const revokeAllDevices = () => {
    setRevokeAllOpen(false);
    return withPending('devRevokeAll', async () => {
      try {
        const res = await call<{ devices?: PocketDevice[] }>(EP.devicesRevokeAll, {});
        syncDevicesList(() => (Array.isArray(res?.devices) ? res.devices : []));
        setEditingDevice(null);
        showToast(t('devicesRevokedAll'));
      } catch (err: any) {
        setError(String(err?.message ?? err));
      }
    });
  };

  // 手机端显示偏好（四项）
  const setMobileFilePreview = (on: boolean) =>
    withPending('prefs', async () => {
      try {
        const r = await call<{ mobileFilePreviewEnabled?: boolean }>(EP.mobileFilePreviewSetEnabled, { on });
        const enabled = r?.mobileFilePreviewEnabled !== false;
        patchStatus({ mobileFilePreviewEnabled: enabled });
        applyMobileFilePreviewSetting(enabled);
      } catch (err: any) {
        setError(String(err?.message ?? err));
      }
    });

  const setMobileFontSize = (size: number) =>
    withPending('prefs', async () => {
      try {
        const r = await call<{ mobileFontSize?: number }>(EP.mobileFontSetSize, { size });
        const px = Number(r?.mobileFontSize) || 0;
        patchStatus({ mobileFontSize: px });
        applyMobileFontSize(px);
      } catch (err: any) {
        setError(String(err?.message ?? err));
      }
    });

  const setMobileRightbar = (on: boolean) =>
    withPending('prefs', async () => {
      try {
        const r = await call<{ mobileRightbarEnabled?: boolean }>(EP.mobileRightbarSetEnabled, { on });
        const enabled = r?.mobileRightbarEnabled === true;
        patchStatus({ mobileRightbarEnabled: enabled });
        applyMobileRightbarSetting(enabled);
      } catch (err: any) {
        setError(String(err?.message ?? err));
      }
    });

  const setMobilePinchZoom = (on: boolean) =>
    withPending('prefs', async () => {
      try {
        const r = await call<{ mobilePinchZoomEnabled?: boolean }>(EP.mobilePinchZoomSetEnabled, { on });
        const enabled = r?.mobilePinchZoomEnabled === true;
        patchStatus({ mobilePinchZoomEnabled: enabled });
        applyMobilePinchZoomSetting(enabled);
      } catch (err: any) {
        setError(String(err?.message ?? err));
      }
    });

  // 缓存与恢复出厂设置
  const clearCache = () =>
    withPending('cache', async () => {
      try {
        const r = await call<{ cache?: CacheStatsInfo | null; freedBytes?: number }>(EP.cacheClear, {});
        patchStatus({ cache: r?.cache ?? null });
        const mb = ((Number(r?.freedBytes) || 0) / 1024 / 1024).toFixed(1);
        showToast(t('cacheCleared').split('{mb}').join(mb));
      } catch (err: any) {
        setError(String(err?.message ?? err));
      }
    });

  const doFactoryReset = async () => {
    setResetOpen(false);
    setError(null);
    await withPending('reset', async () => {
      try {
        const next = await call<PocketStatus>(EP.pocketReset, { confirm: true });
        setStatus(next);
        setTunnelState(next?.tunnelState ?? null);
        applyAllMobilePrefs(next);
        setTunnelCfg(null);
        setCustomPin(null);
        setPinShown({});
        setPairing(null);
        setEditingDevice(null);
        setDevicesFallback(Array.isArray(next?.devices) ? next.devices : []);
        if (Array.isArray(next?.resetWarnings) && next.resetWarnings.length > 0) {
          setError(next.resetWarnings.join('；'));
          showToast(t('resetPartial'));
        } else {
          showToast(t('resetDone'));
        }
      } catch (err: any) {
        setError(String(err?.message ?? err));
        showToast(t('resetFailed'));
      }
    });
  };

  const lanUrl = status?.lanUrl ?? null;
  const tunnelUrl = status?.tunnelUrl ?? null;
  const publicView = status?.origin === 'public';
  const tunnelPhase = tunnelState?.phase ?? status?.tunnelState?.phase ?? 'idle';
  const tunnelStarting = ['downloading', 'starting', 'registering'].includes(tunnelPhase);
  const tunnelReconnecting = tunnelPhase === 'reconnecting';
  const tunnelStateDetail = tunnelState?.detail ?? status?.tunnelState?.detail ?? '';
  const tunnelStateStarted = tunnelState?.startedAt ?? status?.tunnelState?.startedAt ?? null;
  const tunnelAttempt = tunnelState?.attempt ?? status?.tunnelState?.attempt ?? null;
  const tunnelConfig = status?.tunnelConfig ?? { hostname: '', tokenSet: false };
  const publicConfigured = Boolean(tunnelConfig.hostname && tunnelConfig.tokenSet);
  const openTunnelConfig = () => {
    setActiveChannel('public');
    setTunnelCfg({ hostname: tunnelConfig.hostname ?? '', token: '', err: null });
  };
  const tunnelConfigChanged = Boolean(tunnelUrl && tunnelConfig.hostname && tunnelUrl !== `https://${tunnelConfig.hostname}`);
  const targetServiceUrl =
    status?.preflight?.targetServiceUrl || `http://127.0.0.1:${status?.proxyPort || 3081}`;
  const devices: PocketDevice[] = Array.isArray(status?.devices) ? status!.devices! : devicesFallback;
  const activePairing = pairing && pairing.channel === activeChannel ? pairing : null;
  const needsRestart =
    Boolean(versionInfo?.current && versionInfo?.loaded)
    && compareVersions(versionInfo!.current!, versionInfo!.loaded!) > 0;
  const errText = makeErrText(t);
  const elapsed = (startedAt?: number | null) => elapsedSince(startedAt);

  return {
    t,
    status,
    error,
    setError,
    offline,
    pending,
    patchStatus,
    activeChannel,
    setActiveChannel,
    pairing: activePairing,
    refreshPairingTicket,
    tunnelState,
    tunnelPhase,
    tunnelStarting,
    tunnelReconnecting,
    tunnelStateDetail,
    tunnelStateStarted,
    tunnelAttempt,
    tunnelConfig,
    publicConfigured,
    tunnelConfigChanged,
    targetServiceUrl,
    openTunnelConfig,
    tunnelCfg,
    setTunnelCfg,
    saveNamedTunnel,
    startTunnel,
    stopTunnel,
    disclaimerOpen,
    setDisclaimerOpen,
    disclaimerChecked,
    setDisclaimerChecked,
    confirmDisclaimer,
    lanUrl,
    tunnelUrl,
    publicView,
    lanToggleOpen,
    setLanToggleOpen,
    requestLanToggle,
    confirmLanToggle,
    setLanAuth,
    refreshLanPin,
    setLanAddress,
    customPin,
    setCustomPin,
    saveCustomPin,
    pinShown,
    setPinShown,
    devices,
    editingDevice,
    setEditingDevice,
    startRenameDevice,
    cancelRenameDevice,
    renameDevice,
    revokeDevice,
    revokeAllOpen,
    setRevokeAllOpen,
    revokeAllDevices,
    advSectionOpen,
    setAdvSectionOpen,
    advOpen: advSectionOpen,
    setAdvOpen: setAdvSectionOpen,
    restartNotice,
    setRestartNotice,
    versionInfo,
    restartDismissed,
    setRestartDismissed,
    isDesktop,
    autoReloadFailed,
    setAutoReloadFailed,
    needsRestart,
    restartPocket,
    waitForHostThenReload,
    setMobileFilePreview,
    setMobileRightbar,
    setMobilePinchZoom,
    setMobileFontSize,
    clearCache,
    resetOpen,
    setResetOpen,
    doFactoryReset,
    toast,
    showToast,
    elapsed,
    errText,
  };
}

export type SettingsController = ReturnType<typeof useSettings>;
