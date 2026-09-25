// dsh-pocket 设置页签 RPC 契约（client 与 host 共享）
export const POCKET_RPC_CHANNEL = '/dsh-pocket';
export const MOBILE_RIGHTBAR_ATTRIBUTE = 'data-dsh-pocket-mobile-rightbar';
export const MOBILE_RIGHTBAR_EVENT = 'dsh-pocket:mobile-rightbar';

export const POCKET_ENDPOINTS = Object.freeze({
  status: 'pocket.status',
  tunnelStart: 'tunnel.start',
  tunnelStop: 'tunnel.stop',
  tunnelSetConfig: 'tunnel.setConfig',
  version: 'pocket.version',
  update: 'pocket.update',
  restart: 'pocket.restart',
  lanTokenRefresh: 'token.lanRefresh',
  lanAuthSetEnabled: 'lanAuth.setEnabled',
  lanSetOverride: 'lan.setOverride',
  lanSetEnabled: 'lan.setEnabled',
  mobileRightbarSetEnabled: 'mobile.rightbar.setEnabled',
  pinSetCustom: 'pin.setCustom',
  pocketReset: 'pocket.reset',
  // 安全免责声明（本轮）：声明模式可配置 never | once | always（默认 once）
  disclaimerSetMode: 'disclaimer.setMode',
  // 已授权设备（本轮新增）：列表 / 改名 / 单独下线 / 全部下线
  devicesList: 'devices.list',
  devicesRename: 'devices.rename',
  devicesRevoke: 'devices.revoke',
  devicesRevokeOthers: 'devices.revokeOthers',
  // Web Push 通知（R3）：公钥 / 订阅 / 退订 / 事件开关 / 测试推送。
  // 写入对象一律是**调用者这台设备**（按请求 cookie 识别），不做跨设备订阅管理。
  notifyVapidKey: 'notify.vapidKey',
  notifySubscribe: 'notify.subscribe',
  notifyUnsubscribe: 'notify.unsubscribe',
  notifySetEvents: 'notify.setEvents',
  notifyTest: 'notify.test',
  // 移动端「复制文件内容」（issue #17）：手机经此 RPC 让主机读取文件正文，
  // 再写入剪贴板——因为手机无法直接打开电脑上的文件。
  fileRead: 'pocket.fileRead',
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
    if (aNum) return 1; // 数字段 > 文本段
    if (bNum) return -1;
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
    tunnelConfig: s?.tunnelConfig ?? { mode: 'quick', hostname: '', tokenSet: false },
    // 安全免责声明（本轮）：模式 + 确认时间戳（0=未确认）——前端据此决定开启公网时弹不弹
    disclaimerMode: s?.disclaimerMode ?? 'once',
    disclaimerAckedAt: s?.disclaimerAckedAt ?? 0,
    dshPort: s?.dshPort ?? null,
  };
}

// ---------- 已授权设备（本轮新增） ----------
/** 「在线」判定窗口：lastActive 距今小于该毫秒数，或该设备有活着的 WebSocket。 */
export const DEVICE_ONLINE_WINDOW_MS = 60_000;
/** 旧版（升级前登录、无设备 id）在列表里的固定 id。 */
export const LEGACY_DEVICE_ID = 'legacy';
/** 推送事件开关的键（与 lib/devices.mjs 的 PUSH_EVENT_KEYS 对齐）。 */
export const PUSH_EVENT_KEYS = ['turn', 'approval'];

/** 设备推送订阅 → 设置页可见的投影（**不含 endpoint/密钥**：那些是可用来推送的能力数据）。 */
export function pushView(push) {
  if (!push || typeof push !== 'object' || typeof push.endpoint !== 'string' || !push.endpoint) return null;
  return {
    subscribed: true,
    events: {
      turn: push.events?.turn !== false,
      approval: push.events?.approval !== false,
    },
    addedAt: Number.isFinite(push.addedAt) ? push.addedAt : 0,
  };
}

/**
 * 设备注册表 → 设置页可见的列表（不含任何秘密：只有 id/名称/UA 类型/时间/IP/scope）。
 * @param {{list:()=>Array, isOnline?:(id:string)=>boolean}} store 设备注册表
 * @param {{currentId?:string|null, now?:number}} [opts] currentId = 调用者自己的设备 id
 * @returns {{devices:Array, currentId:string|null}} 列表已排序：本机 → 在线 → 最近活跃
 */
export function deviceViews(store, { currentId = null, now = Date.now() } = {}) {
  const rows = (store?.list?.() ?? []).map((d) => {
    const legacy = d.id === LEGACY_DEVICE_ID || d.uaType === 'legacy';
    const lastActive = Number.isFinite(d.lastActive) ? d.lastActive : 0;
    return {
      id: d.id,
      // 展示名：用户改过就用用户的；没改过由前端按语言渲染（legacy/UA 类型）
      customName: typeof d.customName === 'string' ? d.customName : '',
      label: typeof d.customName === 'string' && d.customName ? d.customName : (legacy ? '' : (d.uaType ?? '')),
      uaType: d.uaType ?? '',
      legacy,
      scope: d.scope === 'public' ? 'public' : 'lan',
      firstSeen: Number.isFinite(d.firstSeen) ? d.firstSeen : 0,
      lastActive,
      lastIp: typeof d.lastIp === 'string' ? d.lastIp : '',
      online: Boolean(store?.isOnline?.(d.id)) || (lastActive > 0 && now - lastActive < DEVICE_ONLINE_WINDOW_MS),
      current: Boolean(currentId) && d.id === currentId,
      // Web Push 订阅状态（R3；无订阅 = null）。投影里不含 endpoint/密钥。
      push: pushView(d.push),
      // 旧版凭证没有个体身份：不能单独下线（只能用「下线其他设备」让它整体失效）
      revocable: d.id !== LEGACY_DEVICE_ID,
    };
  });
  rows.sort((a, b) => (Number(b.current) - Number(a.current)) || (Number(b.online) - Number(a.online)) || (b.lastActive - a.lastActive));
  return { devices: rows, currentId: currentId ?? null };
}
