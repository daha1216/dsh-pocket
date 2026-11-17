// dsh-pocket 设置页签与移动端 RPC 契约（client 与 host 共享，与 src/shared/protocol.ts 保持一致）

export const POCKET_RPC_CHANNEL = '/dsh-pocket';
export const POCKET_PING_PATH = '/__dsh-pocket/ping';

export const MOBILE_RIGHTBAR_ATTRIBUTE = 'data-dsh-pocket-mobile-rightbar';
export const MOBILE_RIGHTBAR_EVENT = 'dsh-pocket:mobile-rightbar';
export const MOBILE_PINCH_ZOOM_ATTRIBUTE = 'data-dsh-pocket-pinch-zoom';
export const MOBILE_PINCH_ZOOM_EVENT = 'dsh-pocket:mobile-pinch-zoom';

// 移动端独立字号：宿主把「字号大小」写在 body 的 --dsh-content-font-size 上，
// 手机布局下只覆盖这一个轴，桌面布局不受影响。
export const MOBILE_FONT_ATTRIBUTE = 'data-dsh-pocket-mobile-font';
export const MOBILE_FONT_EVENT = 'dsh-pocket:mobile-font-size';
export const MOBILE_FONT_SIZE_VAR = '--dsh-pocket-mobile-font-size';
export const MOBILE_FONT_MIN = 12;
export const MOBILE_FONT_MAX = 22;

// 移动端工作区文件链接点击预览开关（抽屉底部代码预览）
export const MOBILE_FILE_PREVIEW_ATTRIBUTE = 'data-dsh-pocket-file-preview';
export const MOBILE_FILE_PREVIEW_EVENT = 'dsh-pocket:mobile-file-preview';

/**
 * @typedef {'lan' | 'public'} PocketAccessChannel
 * @typedef {'loopback' | 'lan' | 'public'} PocketOriginClass
 * @typedef {'pair' | 'pin'} PocketAuthMethod
 */

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
  // 移动端文件读取：手机经此 RPC 让主机安全读取工作区内文件正文（供预览抽屉与复制使用）
  fileRead: 'pocket.fileRead',
  // 代理侧缓存用量与清空
  cacheStats: 'pocket.cache.stats',
  cacheClear: 'pocket.cache.clear',
  // v4.0 一步扫码配对与设备级独立授权管理
  pairingIssue: 'pairing.issue',
  devicesList: 'devices.list',
  devicesRename: 'devices.rename',
  devicesRevoke: 'devices.revoke',
  devicesRevokeAll: 'devices.revokeAll',
});

/**
 * 语义化版本比较：a > b 返回正数，相等 0，a < b 负数（数字段 + 预发布后缀）。
 * @param {string | number} a
 * @param {string | number} b
 * @returns {number}
 */
export function compareVersions(a, b) {
  const pa = String(a).replace(/^[vV]/, '').split('.');
  const pb = String(b).replace(/^[vV]/, '').split('.');
  for (let i = 0; i < 3; i++) {
    const x = parseInt(pa[i], 10) || 0;
    const y = parseInt(pb[i], 10) || 0;
    if (x !== y) return x - y;
  }
  // 数字段相等：无预发布后缀的更新；都有后缀时按段比较（alpha < beta < rc…，
  // 数字段按数值：rc.9 < rc.10）
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

/**
 * 浏览器可见的状态字段（无敏感信息；含二维码 data URL 及可选预检/端口偏移/预览开关）。
 * @param {Record<string, any> | null | undefined} s
 */
export function redactStatus(s) {
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
