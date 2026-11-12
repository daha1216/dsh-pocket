// dsh-pocket 设置页签 RPC 契约（client 与 host 共享）
export const POCKET_RPC_CHANNEL = '/dsh-pocket';
export const MOBILE_RIGHTBAR_ATTRIBUTE = 'data-dsh-pocket-mobile-rightbar';
export const MOBILE_RIGHTBAR_EVENT = 'dsh-pocket:mobile-rightbar';
export const MOBILE_PINCH_ZOOM_ATTRIBUTE = 'data-dsh-pocket-pinch-zoom';
export const MOBILE_PINCH_ZOOM_EVENT = 'dsh-pocket:mobile-pinch-zoom';
// 移动端独立字号（2026-10-18）：宿主把「字号大小」写在 body 的
// --dsh-content-font-size 上，手机布局下只覆盖这一个轴，桌面布局不受影响。
export const MOBILE_FONT_ATTRIBUTE = 'data-dsh-pocket-mobile-font';
export const MOBILE_FONT_EVENT = 'dsh-pocket:mobile-font-size';
export const MOBILE_FONT_SIZE_VAR = '--dsh-pocket-mobile-font-size';
export const MOBILE_FONT_MIN = 12;
export const MOBILE_FONT_MAX = 22;

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
  pinSetCustom: 'pin.setCustom',
  pocketReset: 'pocket.reset',
  // 移动端「复制文件内容」（issue #17）：手机经此 RPC 让主机读取文件正文，
  // 再写入剪贴板——因为手机无法直接打开电脑上的文件。
  fileRead: 'pocket.fileRead',
  // 代理侧缓存（评审 §3.4）：两个缓存池此前只有内部 clearProxyCaches()，
  // 用户既看不到用量也没有恢复手段。设置页显示「已用 / 预算」并给一个清空按钮。
  cacheStats: 'pocket.cache.stats',
  cacheClear: 'pocket.cache.clear',
});

/** 语义化版本比较：a > b 返回正数，相等 0，a < b 负数（数字段 + 预发布后缀）。 */
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
  // 逐段比较：数字段按数值、文本段按字典序
  const aParts = aPre.slice(1).split('.');
  const bParts = bPre.slice(1).split('.');
  const len = Math.max(aParts.length, bParts.length);
  for (let i = 0; i < len; i++) {
    const ax = aParts[i] ?? '';
    const bx = bParts[i] ?? '';
    if (ax === bx) continue;
    const aNum = /^\d+$/.test(ax);
    const bNum = /^\d+$/.test(bx);
    if (aNum && bNum) return Number(ax) - Number(bx); // 数值比较
    // semver：数字标识符优先级低于字母数字标识符（1.0.0-1 < 1.0.0-alpha）
    if (aNum) return -1;
    if (bNum) return 1;
    return ax < bx ? -1 : 1; // 字典序
  }
  return 0;
}

/** 浏览器可见的状态字段（无敏感信息；含二维码 data URL）。 */
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
  };
}
