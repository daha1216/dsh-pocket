// dsh-pocket 服务：在 dsh web 进程内跑改头代理 + 公网隧道（含 Supervisor 自动重连与环境预检）
//
// - 代理：监听 0.0.0.0:<port>（默认 3081），把入站 Host/Origin 改写成
//   127.0.0.1:<dshPort>（dsh web 实际端口），HTTP + WebSocket 全透传。
//   这样 DSH 的 /api 浏览器信任栅栏永远看到 loopback，局域网/公网都能进，
//   且不需要改 dsh 的任何配置（0.0.0.0 绑定被 dsh 官方禁用）。
// - 隧道：用户自行配置 cloudflared 命名隧道与域名后，才可开启公网访问；
//   运行期若 cloudflared 异常退出，由内置 Supervisor 按指数退避自动重连，遇致命配置/鉴权错误熔断。

import { homedir, networkInterfaces } from 'node:os';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { createPocketProxy } from './proxy.mjs';
import { startNamedTunnel } from './tunnel.mjs';
import { runTunnelPreflight } from './preflight.mjs';
import { isValidIpv4 } from './ip.mjs';

const require = createRequire(import.meta.url);

/** Named Tunnel Supervisor 指数退避阶梯（毫秒），实际等待带 ±10% 抖动。 */
export const TUNNEL_RECONNECT_BACKOFF_MS = Object.freeze([2_000, 5_000, 15_000, 30_000, 60_000]);

/** 立即退出判定窗口（< 3s 视为秒退）。 */
const IMMEDIATE_EXIT_WINDOW_MS = 3_000;
/** 0 次稳定连接前提下，连续秒退达到此次数即触发熔断，避免死循环拉起坏配置。 */
const CIRCUIT_BREAKER_FAST_EXITS = 5;

/** 致命鉴权/配置错误：一旦出现直接熔断到 error，不再无意义重试。 */
export function isFatalTunnelError(message) {
  return /\b401\b|unauthorized|invalid[^\r\n]*token|not\s+valid|incorrect\s+usage|flag\s+provided\s+but\s+not\s+defined|unknown\s+(?:flag|command)/i
    .test(String(message ?? ''));
}

/** URL → 二维码 data URL（浏览器 <img> 直接显示，全本地不依赖第三方）。 */
export async function qrDataUrl(text, { width = 220, margin = 1 } = {}) {
  const QRCode = require('qrcode');
  return QRCode.toDataURL(text, { errorCorrectionLevel: 'M', margin, width, type: 'image/png' });
}

// RFC1918 私网地址：手机与电脑连同一局域网时通常可直连。
// 另含 CGNAT 100.64/10（RFC 6598，Tailscale/ZeroTier 默认网段，公网不可路由），保持一致（issue #79）。
const PRIVATE_IPV4_RE = /^(?:10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.|100\.(?:6[4-9]|[7-9]\d|1(?:0\d|1\d|2[0-7]))\.)/;

/** 名称像真实物理网卡的接口（WLAN / Wi-Fi / Ethernet / 以太网 / 有线 / 无线 / en / eth）。
 *  注意：`本地连接` 用负前瞻 `(?!\*)` 排除 Windows 的「移动热点 / Internet 连接共享（ICS）」
 *  虚拟适配器 `本地连接* N`（IP 固定 192.168.137.1，手机连真实 Wi-Fi 时与它不在同一网段，
 *  扫码不可达）——issue #176。 */
const PHYSICAL_IFACE_RE = /^(?:wlan|wi-?fi|wireless|ethernet|eth\d|en\d|wlp\d|以太网|有线|无线|本地连接(?!\*))/i;

/** 常见的 VPN / 虚拟网卡名称：手机通常无法通过它们直连电脑。
 *  含 Windows ICS / 移动热点（`本地连接*`）与承载网络 / Wi-Fi Direct 虚拟适配器——issue #176。 */
const VPN_IFACE_RE = /(?:radmin|tailscale|zerotier|easytier|et_|tun|tap|vpn|vethernet|virtual|vmware|virtualbox|wsl|docker|teredo|hamachi|bluetooth|bridge|本地连接\*|hostednetwork|wifidirect)/i;

/**
 * 从 networkInterfaces() 返回的接口表里选出手机最可能可达的 IPv4。
 *
 * @param {ReturnType<typeof networkInterfaces>} interfaces
 * @returns {string|null}
 */
export function selectLanIPv4(interfaces) {
  const candidates = [];
  for (const [name, addrs] of Object.entries(interfaces ?? {})) {
    for (const addr of addrs ?? []) {
      if (addr.family !== 'IPv4' || addr.internal) continue;
      const ip = addr.address;
      if (!ip || ip.startsWith('127.') || ip.startsWith('169.254.')) continue;

      let score = 0;
      if (PRIVATE_IPV4_RE.test(ip)) score += 100;
      if (PHYSICAL_IFACE_RE.test(name)) score += 20;
      else if (VPN_IFACE_RE.test(name)) score -= 50;

      candidates.push({ ip, score, order: candidates.length });
    }
  }

  const isIcsSubnet = (ip) => ip.startsWith('192.168.137.');
  candidates.sort((a, b) =>
    b.score - a.score ||
    (isIcsSubnet(a.ip) === isIcsSubnet(b.ip) ? a.order - b.order : isIcsSubnet(a.ip) ? 1 : -1),
  );
  return candidates[0]?.ip ?? null;
}

// ---------- WSL 局域网 IP（issue #39） ----------

/** WSL 检测：/proc/version 含 microsoft/wsl，或 WSL 专属环境变量存在。 */
export function detectWsl() {
  try {
    const v = readFileSync('/proc/version', 'utf8').toLowerCase();
    if (v.includes('microsoft') || v.includes('wsl')) return true;
  } catch { /* 非 Linux：无 /proc/version */ }
  return Boolean(process.env.WSL_DISTRO_NAME || process.env.WSL_INTEROP);
}

/**
 * 解析 ipconfig.exe 输出，默认取非虚拟网卡块的 IPv4 地址（保持输出顺序）。
 * @param {string} text ipconfig.exe 的完整输出
 * @param {{ includeVpn?: boolean }} [opts] 传 includeVpn 时保留 Tailscale/VPN 等候选
 * @returns {string[]} 候选 IPv4 列表
 */
export function parseIpconfig(text, { includeVpn = false } = {}) {
  const out = [];
  const blocks = String(text).split(/\r?\n(?=\S)/);
  const ipRe = /IPv4[^0-9]{0,40}((?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)/;
  for (const block of blocks) {
    const title = String(block.split(/\r?\n/)[0] ?? '');
    if (!includeVpn && VPN_IFACE_RE.test(title)) continue;
    const m = block.match(ipRe);
    if (m) out.push(m[0].replace(/^IPv4[^0-9]*/i, ''));
  }
  return out;
}

function runIpconfig() {
  const candidates = ['ipconfig.exe', '/mnt/c/Windows/System32/ipconfig.exe'];
  return new Promise((resolve) => {
    const tryNext = (i) => {
      if (i >= candidates.length) return resolve(null);
      execFile(candidates[i], [], { timeout: 5000, windowsHide: true }, (err, stdout) => {
        if (err || !stdout) return tryNext(i + 1);
        resolve(String(stdout));
      });
    };
    tryNext(0);
  });
}

async function lanIPv4() {
  if (detectWsl()) {
    try {
      const out = await runIpconfig();
      const candidates = parseIpconfig(out ?? '');
      const ip = candidates.find((c) => PRIVATE_IPV4_RE.test(c)) ?? candidates[0];
      if (ip) return ip;
    } catch { /* 回退 */ }
  }
  return selectLanIPv4(networkInterfaces());
}

/** 收集所有可手动选择的局域网/Tailnet 候选 IP（WSL 下以 Windows ipconfig 为准）。 */
async function listLanCandidates() {
  if (detectWsl()) {
    try {
      const out = await runIpconfig();
      const ips = parseIpconfig(out ?? '', { includeVpn: true });
      if (ips.length) return [...new Set(ips)];
    } catch { /* 回退 */ }
  }
  const ips = [];
  for (const [, addrs] of Object.entries(networkInterfaces())) {
    for (const addr of addrs ?? []) {
      if (addr.family !== 'IPv4' || addr.internal) continue;
      const ip = addr.address;
      if (!ip || ip.startsWith('127.') || ip.startsWith('169.254.')) continue;
      if (!ips.includes(ip)) ips.push(ip);
    }
  }
  return ips;
}

/**
 * 创建 Pocket 服务。
 * @param {object} opts
 * @param {number} opts.dshPort   dsh web 实际端口（从 ctx.webServer.port 取）
 * @param {number} [opts.port]    代理端口（默认 3081）
 * @param {object} [opts.internals] 测试注入：createProxy / startNamedTunnel / lanIPv4 / reconnectBackoffMs 等
 * @returns {PocketService}
 */
export function createPocketService({
  dshPort,
  port = 3081,
  home,
  internals = {},
  getLanIpOverride,
  getLanEnabled = () => true,
  injectHtml,
  auth,
  launchToken = () => '',
  getTunnelConfig,
  onTunnelReady,
  log = console,
} = {}) {
  const logInfo = (...args) => (log.info ?? log.log).call(log, ...args);
  const logWarn = (...args) => log.warn(...args);
  const createProxy = internals.createProxy ?? createPocketProxy;
  const startNamed = internals.startNamedTunnel ?? startNamedTunnel;
  const isProcessAliveImpl = (pid) => {
    try { process.kill(pid, 0); return true; } catch (err) { return err?.code === 'EPERM'; }
  };
  const isProcessAlive = internals.isProcessAlive ?? isProcessAliveImpl;
  const orphanCheck = internals.isOrphanCloudflared ?? ((pid) => isOrphanCloudflared(pid));
  const orphanKill = internals.killPid ?? ((pid) => killPid(pid));
  const getLanOverride = () => {
    const value = String(getLanIpOverride?.() ?? '').trim();
    return isValidIpv4(value) ? value : '';
  };

  const LAN_IP_CACHE_MS = 30_000;
  let lanCache = null;
  const getLan = async () => {
    const override = getLanOverride();
    if (override) return override;
    if (internals.lanIPv4) return internals.lanIPv4();
    const now = Date.now();
    if (!lanCache || now - lanCache.at > LAN_IP_CACHE_MS) {
      lanCache = { at: now, ip: await lanIPv4() };
    }
    return lanCache.ip;
  };
  let lanCandidateCache = null;
  const getLanCandidates = async () => {
    if (internals.lanCandidates) return internals.lanCandidates();
    const now = Date.now();
    if (!lanCandidateCache || now - lanCandidateCache.at > 15000) {
      lanCandidateCache = { at: now, ips: await listLanCandidates() };
    }
    return lanCandidateCache.ips;
  };

  let proxy = null;
  let proxyPromise = null;
  let disposed = false;
  let proxyGeneration = 0;
  let tunnel = null;
  let tunnelAbort = null;
  let tunnelPromise = null;
  /** 隧道进度：{ phase: idle|downloading|starting|registering|ready|reconnecting|error, detail, startedAt, attempt?, nextRetryAt? } */
  const tunnelState = { phase: 'idle', detail: '', startedAt: null };

  // ---------- Named Tunnel Supervisor 自动重连与熔断状态 ----------
  let supervisorActive = false;
  let supervisorTimer = null;
  let healthyTimer = null;
  let supervisorAttempt = 0;
  let sustainedConnections = 0;
  let consecutiveFastExits = 0;

  function clearSupervisorTimers() {
    if (supervisorTimer !== null) {
      clearTimeout(supervisorTimer);
      supervisorTimer = null;
    }
    if (healthyTimer !== null) {
      clearTimeout(healthyTimer);
      healthyTimer = null;
    }
  }

  function clearReconnectFields() {
    delete tunnelState.attempt;
    delete tunnelState.nextRetryAt;
  }

  function tripCircuitBreaker(detail) {
    supervisorActive = false;
    clearSupervisorTimers();
    clearReconnectFields();
    tunnelState.phase = 'error';
    tunnelState.detail = detail;
    tunnelState.startedAt = null;
  }

  function computeBackoffDelayMs(attempt) {
    const steps = Array.isArray(internals.reconnectBackoffMs) && internals.reconnectBackoffMs.length > 0
      ? internals.reconnectBackoffMs
      : TUNNEL_RECONNECT_BACKOFF_MS;
    const base = steps[Math.min(Math.max(0, attempt - 1), steps.length - 1)];
    const jitter = internals.disableJitter ? 1 : (0.9 + Math.random() * 0.2);
    return Math.max(10, Math.round(base * jitter));
  }

  function scheduleSupervisorReconnect(zhReason, enReason) {
    if (disposed || !supervisorActive) return;
    clearSupervisorTimers();
    supervisorAttempt += 1;
    const delayMs = computeBackoffDelayMs(supervisorAttempt);
    const now = Date.now();
    const nextRetryAt = now + delayMs;
    const waitSec = Math.max(1, Math.round(delayMs / 1000));

    tunnelState.phase = 'reconnecting';
    tunnelState.attempt = supervisorAttempt;
    tunnelState.nextRetryAt = nextRetryAt;
    tunnelState.startedAt = tunnelState.startedAt ?? now;
    tunnelState.detail = `${zhReason}，将在 ${waitSec}s 后自动重连（第 ${supervisorAttempt} 次） | ${enReason}, reconnecting in ${waitSec}s (attempt ${supervisorAttempt})`;

    logWarn(
      'dsh-pocket: named tunnel exited, scheduling auto-heal attempt=%d in %dms | 命名隧道异常断开，将在 %dms 后第 %d 次自动重连',
      supervisorAttempt,
      delayMs,
      delayMs,
      supervisorAttempt,
    );

    supervisorTimer = setTimeout(() => {
      supervisorTimer = null;
      void runSupervisorAttempt();
    }, delayMs);
    supervisorTimer.unref?.();
  }

  const qrCache = new Map();
  const encodeQr = internals.encodeQr ?? qrDataUrl;
  async function qrCached(text) {
    if (!text) return null;
    if (qrCache.has(text)) {
      const hit = qrCache.get(text);
      qrCache.delete(text);
      qrCache.set(text, hit);
      return hit;
    }
    if (qrCache.size >= 8) {
      const oldest = qrCache.keys().next().value;
      qrCache.delete(oldest);
    }
    qrCache.set(text, encodeQr(text).catch(() => null));
    return qrCache.get(text);
  }

  const autoStatePath = home ? join(home, 'dsh-pocket', 'tunnel-auto.json') : null;
  let autoStateQueue = Promise.resolve();
  function persistAutoTunnel(pid) {
    if (!autoStatePath) return;
    autoStateQueue = autoStateQueue.then(async () => {
      try {
        await mkdir(dirname(autoStatePath), { recursive: true });
        await writeFile(autoStatePath, JSON.stringify({
          at: Date.now(),
          mode: 'named',
          hostPid: process.pid,
          ...(Number.isInteger(pid) ? { pid } : {}),
        }), 'utf8');
      } catch { /* 忽略 */ }
    });
    return autoStateQueue;
  }
  function clearAutoTunnel() {
    if (!autoStatePath) return;
    autoStateQueue = autoStateQueue.then(async () => {
      try { await rm(autoStatePath, { force: true }); } catch { /* 忽略 */ }
    });
    return autoStateQueue;
  }

  const spawnedPids = new Set();
  function probeWindowsImage(pid) {
    return new Promise((resolve) => {
      execFile('tasklist', ['/FI', `PID eq ${pid}`, '/FO', 'CSV'], { cwd: homedir() }, (err, stdout) => {
        if (err) return resolve(null);
        const line = String(stdout).split('\n').find((l) => l.includes(`"${pid}"`));
        if (!line) return resolve(null);
        resolve(line.split(',')[0]?.replace(/"/g, '').toLowerCase() ?? null);
      });
    });
  }
  async function isOrphanCloudflared(pid) {
    if (process.platform === 'win32') {
      const image = await probeWindowsImage(pid);
      return image !== null && image.startsWith('cloudflared');
    }
    try { process.kill(pid, 0); } catch { return false; }
    try {
      const comm = await readFile(`/proc/${pid}/comm`, 'utf8');
      return comm.trim().startsWith('cloudflared');
    } catch { return false; }
  }
  function killPid(pid) {
    return new Promise((resolve, reject) => {
      if (process.platform === 'win32') {
        execFile('taskkill', ['/PID', String(pid), '/F'], { cwd: homedir() }, (err) => (err ? reject(err) : resolve()));
      } else {
        try { process.kill(pid, 'SIGKILL'); resolve(); } catch (err) { reject(err); }
      }
    });
  }
  async function killOrphanCloudflared() {
    if (!autoStatePath) return;
    let marker = null;
    try {
      marker = JSON.parse(await readFile(autoStatePath, 'utf8'));
    } catch { return; }
    const markerHostPid = Number(marker?.hostPid);
    if (Number.isInteger(markerHostPid) && markerHostPid > 0 && markerHostPid !== process.pid
      && isProcessAlive(markerHostPid)) {
      logInfo('dsh-pocket: orphan sweep skipped — tunnel owned by live host pid=%s | 隧道属于另一个存活实例，跳过清扫 pid=%s', markerHostPid, markerHostPid);
      return;
    }
    const pid = marker?.pid;
    if (!Number.isInteger(pid) || pid <= 0 || spawnedPids.has(pid)) return;
    try {
      if (!(await orphanCheck(pid))) return;
      await orphanKill(pid);
      logInfo('dsh-pocket: killed orphan cloudflared pid=%s | 已清理孤儿 cloudflared 进程 pid=%s', pid, pid);
    } catch (err) {
      logWarn('dsh-pocket: orphan cloudflared sweep skipped | 孤儿清扫跳过: %s', err?.message ?? err);
    }
  }

  /**
   * 内部单飞启动隧道（供显式 startTunnel 与 Supervisor 自动重连共用）。
   * @param {{ fromSupervisor: boolean }} opts
   */
  function launchNamedTunnel({ fromSupervisor }) {
    const controller = new AbortController();
    tunnelAbort = controller;
    const p = (async () => {
      await null;
      try {
        await service.startProxy();
        if (controller.signal.aborted) {
          throw new Error('dsh-pocket tunnel start aborted | 隧道启动已取消');
        }
        if (proxy && proxy.port !== port) {
          throw new Error(
            `端口 ${port} 被占用，局域网代理实际运行在 ${proxy.port}；`
            + `已配置的固定域名隧道 ingress 指向 ${port}，现在开启公网会 502 或命中另一个实例。`
            + '请释放该端口，或把 proxyPort 与 Cloudflare ingress 一起改成同一个端口 | '
            + `proxy is on ${proxy.port} but the tunnel ingress points at ${port}`,
          );
        }
        if (!fromSupervisor || !tunnelState.startedAt) {
          tunnelState.startedAt = Date.now();
        }
        const onPhase = (phase) => {
          tunnelState.phase = phase;
          if (phase === 'downloading') tunnelState.detail = '首次下载 cloudflared（约 20MB）| first run downloads cloudflared (~20MB)';
          else if (phase === 'starting') tunnelState.detail = '启动隧道进程… | starting tunnel…';
          else if (phase === 'registering') tunnelState.detail = '连接 Cloudflare 边缘（通常 5-30 秒）| connecting to Cloudflare edge (usually 5-30s)';
          else if (phase === 'ready') tunnelState.detail = '隧道就绪 | ready';
        };
        const cfg = typeof getTunnelConfig === 'function' ? (getTunnelConfig() ?? {}) : {};
        if (cfg.mode !== 'named' || !cfg.token || !cfg.hostname) {
          throw new Error(
            '公网访问需要自行配置固定域名与 Tunnel Token（设置 → 手机访问 → 公网配置） | '
            + 'public access requires your own fixed hostname and Tunnel Token in Settings',
          );
        }
        await killOrphanCloudflared();
        controller.signal.throwIfAborted();
        const result = await startNamed({ token: cfg.token, home, signal: controller.signal, onPhase });
        if (controller.signal.aborted || disposed) {
          result.kill();
          controller.signal.throwIfAborted();
          if (disposed) throw new Error('dsh-pocket tunnel start aborted | 隧道启动已取消');
        }
        const connectedAt = Date.now();
        const mine = {
          url: `https://${cfg.hostname}`,
          pid: result.pid ?? null,
          kill: result.kill,
          onExit: result.onExit,
        };
        tunnel = mine;
        supervisorActive = true;
        clearReconnectFields();
        tunnelState.phase = 'ready';
        tunnelState.detail = '隧道就绪 | ready';

        if (healthyTimer !== null) clearTimeout(healthyTimer);
        healthyTimer = setTimeout(() => {
          healthyTimer = null;
          if (tunnel === mine && !disposed) {
            sustainedConnections += 1;
            consecutiveFastExits = 0;
            supervisorAttempt = 0;
          }
        }, IMMEDIATE_EXIT_WINDOW_MS);
        healthyTimer.unref?.();

        mine.onExit?.((code, exitDetail = '') => {
          if (Number.isInteger(mine.pid)) spawnedPids.delete(mine.pid);
          if (controller.signal.aborted || disposed) return;
          if (tunnel !== mine) return;
          if (healthyTimer !== null) {
            clearTimeout(healthyTimer);
            healthyTimer = null;
          }
          tunnel = null;
          if (tunnelAbort === controller) tunnelAbort = null;

          const livedMs = Date.now() - connectedAt;
          if (livedMs >= IMMEDIATE_EXIT_WINDOW_MS) {
            sustainedConnections += 1;
            consecutiveFastExits = 0;
            supervisorAttempt = 0;
          } else {
            consecutiveFastExits += 1;
          }

          const zhBase = `隧道进程退出（code=${code}）${exitDetail ? `：${exitDetail}` : ''}`;
          const enBase = `tunnel process exited (code=${code})${exitDetail ? `: ${exitDetail}` : ''}`;

          if (
            !supervisorActive
            || isFatalTunnelError(exitDetail)
            || (sustainedConnections === 0 && consecutiveFastExits >= CIRCUIT_BREAKER_FAST_EXITS)
          ) {
            tripCircuitBreaker(`${zhBase} | ${enBase}`);
            return;
          }

          scheduleSupervisorReconnect(zhBase, enBase);
        });

        if (Number.isInteger(mine.pid)) spawnedPids.add(mine.pid);
        void persistAutoTunnel(mine.pid);
        try { onTunnelReady?.('named'); } catch { /* 忽略 */ }
        return mine.url;
      } catch (err) {
        if (!controller.signal.aborted && !fromSupervisor) {
          clearReconnectFields();
          tunnelState.phase = 'error';
          tunnelState.detail = err?.message ?? String(err);
          tunnelState.startedAt = null;
        }
        throw err;
      } finally {
        if (tunnelPromise === p) tunnelPromise = null;
      }
    })();
    tunnelPromise = p;
    return p;
  }

  async function runSupervisorAttempt() {
    if (disposed || !supervisorActive || tunnel || tunnelPromise) return;
    const attemptStart = Date.now();
    try {
      await launchNamedTunnel({ fromSupervisor: true });
      logInfo(
        'dsh-pocket: public tunnel auto-healed on attempt %d | 公网隧道自动重连成功（第 %d 次）',
        supervisorAttempt,
        supervisorAttempt,
      );
    } catch (err) {
      if (disposed || !supervisorActive) return;
      const msg = err?.message ?? String(err);
      // 配置缺失、端口顺延或致命鉴权/参数错误直接熔断，不继续重试。
      const cfg = (() => {
        try { return typeof getTunnelConfig === 'function' ? (getTunnelConfig() ?? {}) : {}; } catch { return {}; }
      })();
      const portShiftedNow = Boolean(proxy && proxy.port !== port);
      const invalidCfg = cfg.mode !== 'named' || !cfg.token || !cfg.hostname;
      if (invalidCfg || portShiftedNow || isFatalTunnelError(msg)) {
        tripCircuitBreaker(msg);
        return;
      }
      if (Date.now() - attemptStart < IMMEDIATE_EXIT_WINDOW_MS) {
        consecutiveFastExits += 1;
      }
      if (sustainedConnections === 0 && consecutiveFastExits >= CIRCUIT_BREAKER_FAST_EXITS) {
        tripCircuitBreaker(msg);
        return;
      }
      const brief = msg.slice(0, 180);
      scheduleSupervisorReconnect(`自动重连未就绪（${brief}）`, `reconnect failed (${brief})`);
    }
  }

  const service = {
    dshPort,
    async startProxy() {
      if (disposed) throw new Error('dsh-pocket service disposed | 服务已卸载，无法启动代理');
      if (proxy) return proxy;
      if (proxyPromise) return proxyPromise;
      const generation = proxyGeneration;
      const p = (async () => {
        let lastErr = null;
        for (let candidate = port; candidate < port + 10; candidate++) {
          if (disposed || generation !== proxyGeneration) {
            throw new Error('dsh-pocket service disposed | 服务已卸载，无法启动代理');
          }
          let created = null;
          try {
            created = await createProxy({
              port: candidate,
              host: '0.0.0.0',
              upstream: { host: '127.0.0.1', port: dshPort },
              ...(injectHtml ? { injectHtml } : {}),
              ...(auth ? { auth } : {}),
              lanAccessEnabled: () => getLanEnabled(),
              ...(launchToken ? { launchToken } : {}),
            });
          } catch (err) {
            if (err?.code !== 'EADDRINUSE') throw err;
            lastErr = err;
            continue;
          }
          if (disposed || generation !== proxyGeneration) {
            try { await created.close(); } catch { /* 已关闭 */ }
            throw new Error('dsh-pocket service disposed | 服务已卸载，无法启动代理');
          }
          proxy = created;
          if (candidate !== port) {
            logInfo(`dsh-pocket: port ${port} busy, proxy on ${candidate} | 端口 ${port} 被占用，代理改用 ${candidate}`);
          }
          break;
        }
        if (!proxy) throw lastErr ?? new Error('proxy start failed | 代理启动失败');
        return proxy;
      })();
      proxyPromise = p;
      try {
        return await p;
      } finally {
        if (proxyPromise === p) proxyPromise = null;
      }
    },

    /** 启动公网隧道（幂等；返回公网 URL）。若当前处于退避等待，立即取消定时器并重新连接。 */
    async startTunnel() {
      if (disposed) throw new Error('dsh-pocket service disposed | 服务已卸载，无法启动隧道');
      if (tunnel) return tunnel.url;
      if (tunnelPromise) return tunnelPromise;
      // 用户显式重新触发开启时，清掉挂起的退避定时器与历史熔断计数，立即重连。
      clearSupervisorTimers();
      clearReconnectFields();
      supervisorAttempt = 0;
      consecutiveFastExits = 0;
      sustainedConnections = 0;
      return launchNamedTunnel({ fromSupervisor: false });
    },

    /**
     * 停止公网隧道（代理保持），并立即取消任何挂起的 Supervisor 自动重连定时器。
     * @param {{ keepAutoMarker?: boolean }} [opts]
     */
    stopTunnel({ keepAutoMarker = false } = {}) {
      supervisorActive = false;
      clearSupervisorTimers();
      clearReconnectFields();
      supervisorAttempt = 0;
      consecutiveFastExits = 0;
      sustainedConnections = 0;

      tunnelAbort?.abort();
      tunnelAbort = null;
      tunnelPromise = null;
      if (tunnel) {
        if (Number.isInteger(tunnel.pid)) spawnedPids.delete(tunnel.pid);
        tunnel.kill();
      }
      tunnel = null;
      tunnelState.phase = 'idle';
      tunnelState.detail = '';
      tunnelState.startedAt = null;
      if (!keepAutoMarker) void clearAutoTunnel();
    },

    /** 启动时自动恢复上次开启的公网隧道（DSH 重启后 cloudflared 子进程被杀，issue #11）。 */
    async restoreTunnelIfNeeded() {
      logInfo('dsh-pocket: auto-restore check | 自动恢复检查：读取上次隧道状态');
      if (!autoStatePath || tunnel || tunnelPromise) return;
      let marker;
      try {
        marker = JSON.parse(await readFile(autoStatePath, 'utf8'));
      } catch { return; }
      if (!marker?.at) return;
      try {
        const cfg = typeof getTunnelConfig === 'function' ? (getTunnelConfig() ?? {}) : {};
        if (cfg.mode !== 'named' || !cfg.token || !cfg.hostname || (cfg.autoRestore === false && marker.mode !== 'named')
          || (marker.mode !== undefined && marker.mode !== 'named')) {
          await killOrphanCloudflared();
          await clearAutoTunnel();
          logInfo('dsh-pocket: auto-restore skipped — configure public access first | 旧公网恢复标记已清除，请先自行配置固定域名');
          return;
        }
        logInfo('dsh-pocket: auto-restore: marker found, starting tunnel | 发现上次开启标记，尝试自动恢复');
        await service.startTunnel();
        logInfo('dsh-pocket: public tunnel auto-restored | 已自动恢复公网隧道');
      } catch (err) {
        logWarn('dsh-pocket: tunnel auto-restore failed | 自动恢复隧道失败: %s', err?.message ?? err);
      }
    },

    /** 状态快照（RPC 返回，不含敏感信息；包含 preflight 环境预检与二维码缓存）。 */
    async status() {
      const lan = await getLan();
      const proxyPort = proxy?.port ?? null;
      const lanUrl = lan && proxyPort ? `http://${lan}:${proxyPort}` : null;
      const lanIpOverride = getLanOverride();
      const lanCandidates = [...new Set(await getLanCandidates())];
      if (lanIpOverride && !lanCandidates.includes(lanIpOverride)) lanCandidates.push(lanIpOverride);
      const portShifted = Boolean(proxy && proxy.port !== port);
      const preflight = runTunnelPreflight({
        interfaces: typeof internals.networkInterfaces === 'function' ? internals.networkInterfaces() : undefined,
        env: internals.env ?? process.env,
        configuredPort: port,
        actualPort: proxyPort,
      });
      return {
        proxyRunning: proxy !== null,
        proxyPort,
        lanUrl,
        lanQr: await qrCached(lanUrl),
        lanCandidates,
        lanIpOverride,
        tunnelRunning: tunnel !== null,
        tunnelUrl: tunnel?.url ?? null,
        tunnelQr: await qrCached(tunnel?.url ?? null),
        tunnelState: { ...tunnelState },
        tunnelConfig: (() => {
          const cfg = typeof getTunnelConfig === 'function' ? (getTunnelConfig() ?? {}) : {};
          return {
            mode: 'named',
            hostname: typeof cfg?.hostname === 'string' ? cfg.hostname : '',
            tokenSet: Boolean(cfg?.token),
          };
        })(),
        dshPort,
        portShifted,
        preflight,
      };
    },

    /** 停止一切（插件卸载时）。进程退出不是用户手动关闭：保留自动恢复标记。 */
    async dispose() {
      disposed = true;
      proxyGeneration += 1;
      service.stopTunnel({ keepAutoMarker: true });
      const inflight = proxyPromise;
      if (inflight) {
        try { await inflight; } catch { /* 过期启动自行关闭 */ }
      }
      if (proxy) {
        const p = proxy;
        proxy = null;
        try { await p.close(); } catch { /* server 已关闭等边缘情况 */ }
      }
    },
  };
  return service;
}
