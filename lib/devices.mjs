// dsh-pocket 设备注册表（$DSH_HOME/dsh-pocket/devices.json）
//
// 为什么需要：升级前的登录 cookie 是 `sha256(PIN:sessionKey)`——**所有设备同值**，
// 服务端无法区分「这台手机」和「那台手机」，因此既不能单独列出、也不能单独踢下线。
// 本模块给每台设备发一枚独立 id，并提供注册表让设置页列出/改名/下线。
//
// 文件形态（version 1）：
//   { version: 1, epoch: 1, devices: [{ id, customName?, uaType, firstSeen, lastActive, lastIp, scope, push? }] }
//   - id：16 位 hex（v2 cookie 里那份）；旧版无 id 的登录在表里固定呈现为一条 `legacy`
//   - scope：'lan' | 'public'——该设备最近一次成功登录时命中哪一侧的 PIN
//   - push（R3 可选字段）：{ endpoint, p256dh, auth, events:{turn,approval}, addedAt }——
//     Web Push 订阅，挂在设备上。**无该字段 = 未订阅**（老 devices.json 照常加载）；
//     设备单独下线（revoke）或「下线其他设备」epoch 清场时一并消失（不再通知已下线的设备）。
//   - epoch：全局代数。「下线其他设备」把 epoch +1 → 所有设备（含 legacy）的 cookie 校验
//     公式里的 epoch 变了，于是自然失效，只有下发新 cookie 才能重新通过。
//
// 写入策略：tmp + rename 原子替换（半截文件永远不会出现在 devices.json 上）；
// touch（lastActive/lastIp）在内存里即时更新，落盘节流 ≥30s，避免每次静态资源请求都写盘。
// 加载失败：把坏文件备份成 devices.json.corrupt 后重建空表，代理绝不因为注册表崩掉。

import { readFileSync, writeFileSync, mkdirSync, renameSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { randomBytes } from 'node:crypto';

/** 注册表 schema 版本（写入值；读取时只做宽松校验）。 */
export const DEVICES_VERSION = 1;
/** 旧版登录（无设备 id）在注册表里的固定 id。 */
export const LEGACY_DEVICE_ID = 'legacy';
/** 设备 id：16 位 hex（8 字节随机）。 */
export const DEVICE_ID_RE = /^[0-9a-f]{16}$/;
/** touch 落盘节流窗口（毫秒）。 */
export const TOUCH_PERSIST_MS = 30_000;
/** 设备名的最大长度（按 Unicode 码点计）。 */
export const DEVICE_NAME_MAX = 32;
/** 「在线」判定：lastActive 距今小于该毫秒数，或该设备有活着的 WebSocket。 */
export const ONLINE_WINDOW_MS = 60_000;
/** 推送订阅的 endpoint 长度上限（能力 URL，超长一律丢弃）。 */
export const PUSH_ENDPOINT_MAX = 2048;
/** 推送事件开关（与 lib/webpush.mjs 的 PUSH_EVENT_KINDS 对齐；缺省视为开启）。 */
export const PUSH_EVENT_KEYS = ['turn', 'approval'];

/** devices.json 路径（DSH_HOME 优先，与 lib/settings.mjs 同一约定）。 */
export function devicesPath(home) {
  const root = home ?? process.env.DSH_HOME ?? join(homedir(), '.dsh');
  return join(root, 'dsh-pocket', 'devices.json');
}

/** 生成一枚新的设备 id（CSPRNG：16 位 hex）。 */
export function newDeviceId() {
  return randomBytes(8).toString('hex');
}

/**
 * 由 User-Agent 猜设备类型（只用于列表展示，不作为安全依据）。
 * 覆盖 spec 要求的四种形态：iPhone·Safari / Android·Chrome / Mac·Chrome / 其他。
 */
export function parseUaType(ua) {
  const s = String(ua ?? '');
  const chromium = /(?:CriOS|Chrome|Chromium|Edg|EdgiOS|OPR|SamsungBrowser)/i.test(s);
  const firefox = /(?:FxiOS|Firefox)/i.test(s);
  const edge = /(?:Edg|EdgiOS|EdgA)\//i.test(s);
  const browser = edge ? (s.includes('iOS') || /iPhone|iPad|iPod/i.test(s) ? 'Edge' : 'Edge')
    : firefox ? 'Firefox'
      : chromium ? 'Chrome'
        : /Safari/i.test(s) ? 'Safari' : '';
  const join_ = (platform) => (browser ? `${platform}·${browser}` : platform);
  if (/iPhone|iPod/i.test(s)) return join_('iPhone');
  if (/iPad/i.test(s)) return join_('iPad');
  if (/Android/i.test(s)) return join_('Android');
  if (/Macintosh|Mac OS X/i.test(s)) return join_('Mac');
  if (/Windows/i.test(s)) return join_('Windows');
  if (/Linux|X11/i.test(s)) return join_('Linux');
  return '其他';
}

/** 设备在列表里的自动名称（用户改过就用用户的）。 */
export function deviceLabel(device) {
  const custom = typeof device?.customName === 'string' ? device.customName.trim() : '';
  if (custom) return custom;
  if (device?.id === LEGACY_DEVICE_ID) return LEGACY_DEVICE_ID; // 展示名由前端按语言渲染
  const ua = typeof device?.uaType === 'string' && device.uaType.trim() ? device.uaType.trim() : '其他';
  return ua;
}

/** 归一化用户输入的名字：折叠空白 + trim；超过 DEVICE_NAME_MAX 抛错。空串 = 清除。 */
export function normalizeDeviceName(name) {
  const trimmed = String(name ?? '').replace(/[\r\n\t]+/g, ' ').trim();
  if (!trimmed) return '';
  if ([...trimmed].length > DEVICE_NAME_MAX) {
    throw new Error(`设备名最长 ${DEVICE_NAME_MAX} 个字 | device name must be at most ${DEVICE_NAME_MAX} characters`);
  }
  return trimmed;
}

/** 从坏文件里尽力捞回 epoch（捞不到按 1），再按 fail-closed 抬到 ≥2（见文件头注释）。 */
function recoveredEpoch(raw) {
  let found = 0;
  try { found = Number(/(?:^|[^0-9])"epoch"\s*:\s*(\d+)/.exec(String(raw ?? ''))?.[1] ?? 0) || 0; } catch { /* 忽略 */ }
  return Math.max(2, Number.isFinite(found) ? found : 0);
}

/**
 * 清洗一条推送订阅（Web Push，R3 新增）。
 *
 * 形态：{ endpoint, p256dh, auth, events: {turn, approval}, addedAt }
 *   - endpoint：推送服务的投递 URL（能力 URL）。**只允许 https**，外加一条刻意的
 *     loopback 例外（http://127.0.0.1 / http://localhost），让本地假接收端能做 e2e；
 *     本 RPC 的信任边界本就是「持有访问密码的人 = 你自己」，与 fileRead 同级。
 *   - p256dh：65 字节未压缩 P-256 公钥（base64url）；auth：16 字节（base64url）。
 *   - events：缺省全开（true）；显式 false 才关。
 * 形状不对返回 null（整条 push 丢弃，不影响设备本身）。
 */
export function sanitizePush(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const endpoint = String(raw.endpoint ?? '').trim();
  if (!endpoint || endpoint.length > PUSH_ENDPOINT_MAX) return null;
  let url = null;
  try { url = new URL(endpoint); } catch { return null; }
  if (url.protocol !== 'https:') {
    const loopback = url.protocol === 'http:' && (url.hostname === '127.0.0.1' || url.hostname === 'localhost' || url.hostname === '[::1]');
    if (!loopback) return null;
  }
  const p256dh = String(raw.p256dh ?? raw.keys?.p256dh ?? '').trim();
  const auth = String(raw.auth ?? raw.keys?.auth ?? '').trim();
  const pointLen = /^[A-Za-z0-9_-]+$/.test(p256dh) ? Buffer.from(p256dh, 'base64url').length : 0;
  const authLen = /^[A-Za-z0-9_-]+$/.test(auth) ? Buffer.from(auth, 'base64url').length : 0;
  if (pointLen !== 65 || authLen !== 16) return null;
  const events = {};
  for (const key of PUSH_EVENT_KEYS) events[key] = raw.events?.[key] !== false;
  const addedAt = Number.isFinite(raw.addedAt) ? raw.addedAt : Date.now();
  return { endpoint, p256dh, auth, events, addedAt };
}

/** 单条设备记录的宽松清洗：字段类型不对就丢弃该字段，id 非法就丢弃该条。 */
function sanitizeDevice(d) {
  if (!d || typeof d !== 'object') return null;
  const id = String(d.id ?? '');
  if (!(id === LEGACY_DEVICE_ID || DEVICE_ID_RE.test(id))) return null;
  const out = {
    id,
    uaType: typeof d.uaType === 'string' && d.uaType ? d.uaType : '其他',
    scope: d.scope === 'public' ? 'public' : 'lan',
    firstSeen: Number.isFinite(d.firstSeen) ? d.firstSeen : 0,
    lastActive: Number.isFinite(d.lastActive) ? d.lastActive : 0,
    lastIp: typeof d.lastIp === 'string' ? d.lastIp : '',
  };
  const custom = typeof d.customName === 'string' ? d.customName.trim() : '';
  if (custom) out.customName = custom.slice(0, DEVICE_NAME_MAX);
  // 无 push 字段 = 未订阅（向后兼容读：老 devices.json 照常加载）
  const push = sanitizePush(d.push);
  if (push) out.push = push;
  return out;
}

/** 清洗整表：非法条目丢弃；重复 id 只留第一条。 */
function sanitizeRegistry(obj) {
  const devices = [];
  const seen = new Set();
  for (const raw of Array.isArray(obj?.devices) ? obj.devices : []) {
    const d = sanitizeDevice(raw);
    if (d && !seen.has(d.id)) { seen.add(d.id); devices.push(d); }
  }
  const epoch = Number.isFinite(obj?.epoch) && obj.epoch >= 1 ? Math.floor(obj.epoch) : 1;
  return { version: DEVICES_VERSION, epoch, devices };
}

/**
 * 创建设备注册表（内存态 + 落盘）。
 * @param {object} [opts]
 * @param {string} [opts.file] 注册表路径（默认 devicesPath()）
 * @param {number} [opts.persistMs] touch 落盘节流（默认 TOUCH_PERSIST_MS）
 * @param {(msg:string)=>void} [opts.log] 日志（可选）
 */
export function createDeviceStore({ file = devicesPath(), persistMs = TOUCH_PERSIST_MS, log = null } = {}) {
  let state = null;        // { version, epoch, devices }
  const index = new Map(); // id -> device（与 state.devices 同对象）
  /** id -> Set<socket>：活着的 WebSocket（踢设备时一并断开）。 */
  const sockets = new Map();
  /** 外部监听（代理侧不用，RPC 侧用它感知下线；保留给未来扩展）。 */
  const listeners = new Set();
  let lastPersist = 0;
  let persistTimer = null;

  function applyState(next) {
    state = next;
    index.clear();
    for (const d of state.devices) index.set(d.id, d);
  }

  /** 读盘；坏文件先备份再重建（不抛错）。rebuilt=true 表示这份状态需要立刻写回磁盘。 */
  function load() {
    let raw = null;
    try {
      raw = readFileSync(file, 'utf8');
    } catch {
      return { state: { version: DEVICES_VERSION, epoch: 1, devices: [] }, rebuilt: false }; // 首次运行：epoch=1，旧 cookie 继续有效
    }
    try {
      const obj = JSON.parse(raw);
      if (!obj || typeof obj !== 'object' || !Array.isArray(obj.devices)) throw new Error('unexpected shape');
      return { state: sanitizeRegistry(obj), rebuilt: false };
    } catch (err) {
      // 文件在但读不懂：备份坏文件，重建空表并把 epoch 抬到 ≥2（v1 legacy 通道按 fail-closed 失效）
      try { renameSync(file, `${file}.corrupt`); } catch { /* 备份失败也让流程继续 */ }
      log?.(`dsh-pocket: devices.json unreadable (${err?.message ?? err}) — backed up and rebuilt | 设备注册表损坏，已备份并重建`);
      return { state: { version: DEVICES_VERSION, epoch: recoveredEpoch(raw), devices: [] }, rebuilt: true };
    }
  }

  {
    const initial = load();
    applyState(initial.state);
    if (initial.rebuilt) persist(); // 自愈后的空表立刻落盘（否则磁盘上只剩 .corrupt 备份）
  }

  /** 原子落盘（tmp + rename）；任何 IO 错误都吞掉，绝不影响代理。 */
  function persist() {
    try {
      mkdirSync(dirname(file), { recursive: true });
      const tmp = `${file}.tmp`;
      writeFileSync(tmp, JSON.stringify(state, null, 2), { mode: 0o600 });
      renameSync(tmp, file);
      lastPersist = Date.now();
    } catch (err) {
      log?.(`dsh-pocket: devices.json write failed | 设备注册表写入失败: ${err?.message ?? err}`);
    }
    if (persistTimer) { clearTimeout(persistTimer); persistTimer = null; }
  }

  /** touch 落盘节流：到点后落一次（timer.unref 不拖住进程退出）。 */
  function persistThrottled() {
    if (Date.now() - lastPersist >= persistMs) { persist(); return; }
    if (persistTimer) return;
    persistTimer = setTimeout(() => { persistTimer = null; persist(); }, persistMs);
    persistTimer.unref?.();
  }

  function emit(event) {
    for (const fn of listeners) { try { fn(event); } catch { /* 忽略 */ } }
  }

  /** 断开某个 id 名下的全部活 WebSocket。 */
  function killSockets(id, exceptId = null) {
    for (const [key, set] of sockets) {
      if (key === exceptId) continue;
      if (id !== null && key !== id) continue;
      for (const socket of [...set]) { try { socket.destroy(); } catch { /* 已断开 */ } }
      set.clear();
    }
    if (id !== null) sockets.delete(id);
  }

  const store = {
    file,
    epoch: () => state.epoch,
    list: () => state.devices,
    get: (id) => index.get(String(id ?? '')) ?? null,
    has: (id) => index.has(String(id ?? '')),

    /**
     * 登录成功时登记/更新设备：新设备补 firstSeen；已存在则只更新 uaType/scope/lastActive/lastIp
     * （跨重启/跨 PIN 轮换保持同一 id，仅重绑 cookie hash）。
     */
    register(id, { uaType = '其他', scope = 'lan', ip = '', at = Date.now(), legacy = false } = {}) {
      const key = String(id ?? '');
      if (!(key === LEGACY_DEVICE_ID || DEVICE_ID_RE.test(key))) return null;
      let d = index.get(key);
      if (!d) {
        d = { id: key, uaType, scope: scope === 'public' ? 'public' : 'lan', firstSeen: at, lastActive: at, lastIp: ip };
        if (legacy) d.uaType = 'legacy';
        state.devices.push(d);
        index.set(key, d);
      } else {
        d.uaType = legacy ? 'legacy' : uaType;
        d.scope = scope === 'public' ? 'public' : 'lan';
        d.lastActive = at;
        if (ip) d.lastIp = ip;
      }
      persist();
      return d;
    },

    /** 每次通过校验的请求：内存即时更新，落盘节流。 */
    touch(id, { ip = '', at = Date.now() } = {}) {
      const d = index.get(String(id ?? ''));
      if (!d) return null;
      d.lastActive = at;
      if (ip) d.lastIp = ip;
      persistThrottled();
      return d;
    },

    /** 单独下线：删除即吊销（cookie 校验查表失败 → 401），并断开它的活 WS。 */
    revoke(id) {
      const key = String(id ?? '');
      if (key === LEGACY_DEVICE_ID) return false; // 旧版凭证没有个体身份，只能靠「全部下线」
      const d = index.get(key);
      if (!d) return false;
      index.delete(key);
      state.devices = state.devices.filter((x) => x.id !== key);
      killSockets(key);
      persist();
      emit({ type: 'revoke', id: key });
      return true;
    },

    /**
     * 下线其他设备：epoch +1 → 除 keepId 外所有 v2 失效；legacy（v1）在 epoch>1 时一律失效，
     * 条目从表里摘掉（它已经没有可用凭证，重新登录会以新的 v2 设备出现）。
     * 活 WS 同样只留 keepId；**推送订阅也一并清场**——被 epoch 清掉的设备不再通过鉴权，
     * 留着它的订阅等于继续给一台「已下线」的设备发通知（R3）。
     */
    revokeOthers(keepId = null) {
      state.epoch += 1;
      const removed = state.devices.filter((d) => d.id === LEGACY_DEVICE_ID).length;
      if (removed) {
        state.devices = state.devices.filter((d) => d.id !== LEGACY_DEVICE_ID);
        index.delete(LEGACY_DEVICE_ID);
      }
      const keep = keepId ? String(keepId) : null;
      for (const d of state.devices) {
        if (d.id === keep) continue;
        if (d.push) delete d.push;
      }
      killSockets(null, keepId);
      persist();
      emit({ type: 'revoke-others', keepId, epoch: state.epoch });
      return { epoch: state.epoch, removedLegacy: removed, kept: keepId ? index.get(String(keepId)) ?? null : null };
    },

    /** 改名（空串 = 恢复自动名称）。 */
    rename(id, name) {
      const d = index.get(String(id ?? ''));
      if (!d) return null;
      const clean = normalizeDeviceName(name);
      if (clean) d.customName = clean;
      else delete d.customName;
      persist();
      return d;
    },

    // ---------- Web Push 订阅（R3：挂设备模型上，随设备下线/epoch 清场一起消失） ----------
    /**
     * 写入/替换该设备的推送订阅。subscription 形状 {endpoint, keys:{p256dh, auth}}（浏览器
     * 原生 PushSubscription.toJSON()）；非法返回 null（调用方如实报错，不静默存坏数据）。
     */
    setPush(id, subscription, { events = null, at = Date.now() } = {}) {
      const d = index.get(String(id ?? ''));
      if (!d) return null;
      const push = sanitizePush({
        endpoint: subscription?.endpoint ?? subscription?.keys?.endpoint,
        p256dh: subscription?.keys?.p256dh ?? subscription?.p256dh,
        auth: subscription?.keys?.auth ?? subscription?.auth,
        events: events ?? subscription?.events ?? d.push?.events,
        addedAt: at,
      });
      if (!push) return null;
      d.push = push;
      persist();
      return d;
    },

    /** 清除该设备的推送订阅（用户「关闭通知」/ 订阅失效）。返回是否真的清了。 */
    clearPush(id) {
      const d = index.get(String(id ?? ''));
      if (!d || !d.push) return false;
      delete d.push;
      persist();
      return true;
    },

    /** 更新事件开关（缺省键保持原值；无订阅返回 null）。 */
    setPushEvents(id, events) {
      const d = index.get(String(id ?? ''));
      if (!d || !d.push) return null;
      for (const key of PUSH_EVENT_KEYS) {
        if (events && typeof events[key] === 'boolean') d.push.events[key] = events[key];
      }
      persist();
      return d;
    },

    /** 所有带推送订阅的设备（{id, push} 最小投影；不复制 endpoint 以外的东西给调用方自行判断）。 */
    pushTargets: () => state.devices.filter((d) => d.push).map((d) => ({ id: d.id, push: d.push })),

    // ---------- 活连接（WebSocket）追踪 ----------
    /** 关联活 socket：断开时自动摘除。设备被下线时由 killSockets 主动 destroy。 */
    trackSocket(id, socket) {
      const key = String(id ?? '');
      if (!key || !socket) return;
      let set = sockets.get(key);
      if (!set) { set = new Set(); sockets.set(key, set); }
      set.add(socket);
      const drop = () => {
        const s = sockets.get(key);
        if (!s) return;
        s.delete(socket);
        if (s.size === 0) sockets.delete(key);
      };
      socket.once('close', drop);
      socket.once('error', drop);
    },

    /** 该设备当前是否有活 WebSocket。 */
    isOnline: (id) => (sockets.get(String(id ?? ''))?.size ?? 0) > 0,
    /**
     * 「这台设备此刻有没有活 WS」——推送抑制门用的**严格**条件（R3 明确区分）：
     * isOnline 只看 WS，而列表视图（client/api.js deviceViews）把它和「60s 内活跃」合成
     * 一个 online 徽标。推送判定要的是「页面开着 = 人在看」，所以这里显式给一个不含
     * 时间窗口语义的名字，避免以后有人把 isOnline 改成宽松版时静默改变推送行为。
     */
    hasLiveWs: (id) => (sockets.get(String(id ?? ''))?.size ?? 0) > 0,
    /** 有活连接的设备 id 集合。 */
    liveIds: () => new Set(sockets.keys()),
    /** 活连接总数（诊断用）。 */
    socketCount: () => [...sockets.values()].reduce((n, s) => n + s.size, 0),

    /** 立即落盘（测试与关停用）。 */
    flush: () => persist(),
    /** 监听设备事件（revoke / revoke-others）；返回取消订阅函数。 */
    on: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
    /** 当前内存快照（诊断/测试用，勿修改）。 */
    snapshot: () => JSON.parse(JSON.stringify(state)),
  };
  return store;
}
