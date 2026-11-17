// dsh-pocket v4.0 RPC & DOM protocol contract (shared between client and host)

export const POCKET_RPC_CHANNEL = '/dsh-pocket';
export const POCKET_PING_PATH = '/__dsh-pocket/ping';

export const MOBILE_RIGHTBAR_ATTRIBUTE = 'data-dsh-pocket-mobile-rightbar';
export const MOBILE_RIGHTBAR_EVENT = 'dsh-pocket:mobile-rightbar';
export const MOBILE_PINCH_ZOOM_ATTRIBUTE = 'data-dsh-pocket-pinch-zoom';
export const MOBILE_PINCH_ZOOM_EVENT = 'dsh-pocket:mobile-pinch-zoom';

// Independent mobile content font size override (0 = follow desktop)
export const MOBILE_FONT_ATTRIBUTE = 'data-dsh-pocket-mobile-font';
export const MOBILE_FONT_EVENT = 'dsh-pocket:mobile-font-size';
export const MOBILE_FONT_SIZE_VAR = '--dsh-pocket-mobile-font-size';
export const MOBILE_FONT_MIN = 12;
export const MOBILE_FONT_MAX = 22;

// Mobile workspace file link bottom-sheet preview toggle
export const MOBILE_FILE_PREVIEW_ATTRIBUTE = 'data-dsh-pocket-file-preview';
export const MOBILE_FILE_PREVIEW_EVENT = 'dsh-pocket:mobile-file-preview';

export const POCKET_ENDPOINTS = Object.freeze({
  status: 'pocket.status',
  tunnelStart: 'tunnel.start',
  tunnelStop: 'tunnel.stop',
  tunnelSetConfig: 'tunnel.setConfig',
  version: 'pocket.version',
  restart: 'pocket.restart',
  lanTokenRefresh: 'token.lanRefresh',
  lanAuthSetEnabled: 'lanAuth.setEnabled',
  lanSetOverride: 'lan.setOverride',
  lanSetEnabled: 'lan.setEnabled',
  mobileRightbarSetEnabled: 'mobile.rightbar.setEnabled',
  mobilePinchZoomSetEnabled: 'mobile.pinchZoom.setEnabled',
  mobileFontSetSize: 'mobile.font.setSize',
  mobileFilePreviewSetEnabled: 'mobile.filePreview.setEnabled',
  pinSetCustom: 'pin.setCustom',
  pocketReset: 'pocket.reset',
  fileRead: 'pocket.fileRead',
  cacheStats: 'pocket.cache.stats',
  cacheClear: 'pocket.cache.clear',
  pairingIssue: 'pairing.issue',
  devicesList: 'devices.list',
  devicesRename: 'devices.rename',
  devicesRevoke: 'devices.revoke',
  devicesRevokeAll: 'devices.revokeAll',
} as const);

export type PocketEndpointKey = keyof typeof POCKET_ENDPOINTS;
export type PocketEndpointName = (typeof POCKET_ENDPOINTS)[PocketEndpointKey];
export type PocketAccessChannel = 'lan' | 'public';
export type PocketOriginClass = 'loopback' | 'lan' | 'public';
export type PocketAuthMethod = 'pair' | 'pin';
export type PocketDeviceKind = 'phone' | 'tablet' | 'desktop';

export interface PocketDeviceSummary {
  id: string;
  name: string;
  autoName: string;
  uaSummary: string;
  kind?: PocketDeviceKind;
  channel: PocketAccessChannel;
  authMethod: PocketAuthMethod;
  createdAt: number;
  lastSeenAt: number;
  lastIp: string;
  online: boolean;
}

export interface PocketPairingTicket {
  ticket: string;
  url: string;
  expiresAt: number;
  ttlMs: number;
  channel?: PocketAccessChannel;
}

export interface PocketTunnelPreflight {
  tunDetected: boolean;
  tunInterfaces: string[];
  proxyEnvDetected: boolean;
  proxyEnvStripped: boolean;
  portShifted: boolean;
  targetServiceUrl: string;
}

export type PocketTunnelPhase =
  | 'idle'
  | 'downloading'
  | 'starting'
  | 'registering'
  | 'ready'
  | 'reconnecting'
  | 'error';

export interface PocketTunnelState {
  phase: PocketTunnelPhase;
  detail?: string | null;
  error?: string | null;
  attempt?: number;
  nextRetryAt?: number | null;
  startedAt?: number | null;
}

export interface PocketTunnelConfig {
  mode: 'named';
  hostname: string;
  tokenSet: boolean;
}

export interface PocketLanCandidate {
  ip: string;
  name?: string;
  virtual?: boolean;
}

export interface PocketRawStatus {
  proxyRunning?: boolean;
  proxyPort?: number | null;
  lanUrl?: string | null;
  lanQr?: string | null;
  lanCandidates?: Array<string | PocketLanCandidate>;
  lanIpOverride?: string;
  tunnelRunning?: boolean;
  tunnelUrl?: string | null;
  tunnelQr?: string | null;
  tunnelState?: PocketTunnelState;
  tunnelConfig?: PocketTunnelConfig;
  dshPort?: number | null;
  portShifted?: boolean;
  preflight?: PocketTunnelPreflight | null;
  mobileFilePreviewEnabled?: boolean;
  [key: string]: unknown;
}

export interface PocketRedactedStatus {
  proxyRunning: boolean;
  proxyPort: number | null;
  lanUrl: string | null;
  lanQr: string | null;
  lanCandidates: Array<string | PocketLanCandidate>;
  lanIpOverride: string;
  tunnelRunning: boolean;
  tunnelUrl: string | null;
  tunnelQr: string | null;
  tunnelState: PocketTunnelState;
  tunnelConfig: PocketTunnelConfig;
  dshPort: number | null;
  portShifted?: boolean;
  preflight?: PocketTunnelPreflight | null;
  mobileFilePreviewEnabled?: boolean;
}

/** Semantic version comparison: positive when a > b, 0 when equal, negative when a < b. */
export function compareVersions(a: string | number, b: string | number): number {
  const pa = String(a).replace(/^[vV]/, '').split('.');
  const pb = String(b).replace(/^[vV]/, '').split('.');
  for (let i = 0; i < 3; i++) {
    const x = parseInt(pa[i] ?? '0', 10) || 0;
    const y = parseInt(pb[i] ?? '0', 10) || 0;
    if (x !== y) return x - y;
  }
  const aPre = String(a).replace(/^[vV]/, '').match(/-.*$/)?.[0] ?? '';
  const bPre = String(b).replace(/^[vV]/, '').match(/-.*$/)?.[0] ?? '';
  if (!aPre && !bPre) return 0;
  if (!aPre) return 1;
  if (!bPre) return -1;
  const aParts = aPre.slice(1).split('.');
  const bParts = bPre.slice(1).split('.');
  const len = Math.max(aParts.length, bParts.length);
  for (let i = 0; i < len; i++) {
    const ax = aParts[i] ?? '';
    const bx = bParts[i] ?? '';
    if (ax === bx) continue;
    const aNum = /^\d+$/.test(ax);
    const bNum = /^\d+$/.test(bx);
    if (aNum && bNum) return Number(ax) - Number(bx);
    if (aNum) return -1;
    if (bNum) return 1;
    return ax < bx ? -1 : 1;
  }
  return 0;
}

/** Browser-safe status snapshot (no secrets; includes QR data URLs and optional diagnostics). */
export function redactStatus(s?: PocketRawStatus | null): PocketRedactedStatus {
  return {
    proxyRunning: s?.proxyRunning === true,
    proxyPort: s?.proxyPort ?? null,
    lanUrl: s?.lanUrl ?? null,
    lanQr: s?.lanQr ?? null,
    lanCandidates: Array.isArray(s?.lanCandidates) ? s.lanCandidates : [],
    lanIpOverride: s?.lanIpOverride ?? '',
    tunnelRunning: s?.tunnelRunning === true,
    tunnelUrl: s?.tunnelUrl ?? null,
    tunnelQr: s?.tunnelQr ?? null,
    tunnelState: s?.tunnelState ?? { phase: 'idle' },
    tunnelConfig: s?.tunnelConfig ?? { mode: 'named', hostname: '', tokenSet: false },
    dshPort: s?.dshPort ?? null,
    ...(s?.portShifted !== undefined ? { portShifted: Boolean(s.portShifted) } : {}),
    ...(s?.preflight !== undefined ? { preflight: s.preflight } : {}),
    ...(s?.mobileFilePreviewEnabled !== undefined
      ? { mobileFilePreviewEnabled: s.mobileFilePreviewEnabled !== false }
      : {}),
  };
}
