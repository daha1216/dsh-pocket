// 隧道运行环境预检（v4.0 Preflight Diagnostics）。
//
// 在用户配置或开启 Cloudflare Named Tunnel 前，零副作用检测三类最常见故障根因：
//   1. 活跃 TUN / 透明代理虚拟网卡（Clash / Mihomo / sing-box / v2ray / Wintun / utun 等）
//      ——会劫持 TCP/UDP 7844 边缘连接导致注册超时或公网 530 / 1033；
//   2. Shell 代理环境变量（HTTP_PROXY / HTTPS_PROXY / ALL_PROXY）
//      ——本插件在 spawn cloudflared 时已通过 cloudflaredEnv 主动剥离；
//   3. 代理端口顺延（portShifted：配置端口被占用，实际监听在顺延端口，与固定 ingress 不一致）。

import { networkInterfaces } from 'node:os';

/** 典型代理 / TUN 虚拟网卡命名特征（排除普通物理网卡与 WSL/Docker 桥接网卡）。 */
export const TUN_ADAPTER_NAME_RE = /\b(?:clash|mihomo|sing-?box|v2ray|xray|hiddify|nekoray|nekobox|surge|loon|shadowrocket|quantumult|wintun|wireguard|openvpn|meta)\b|(?:^|[^a-z])(?:utun\d*|tun\d*|tap\d*)(?:$|[^a-z0-9])/i;

/** macOS 系统内建 utun 接口匹配（空闲 utun0..3 仅有 fe80:: 链路本地地址，需区分活跃隧道）。 */
const MACOS_UTUN_ONLY_RE = /^utun\d*$/i;

/** Clash / Mihomo / Surge / sing-box TUN Fake-IP 常用网段（RFC 2544 198.18.0.0/15）。 */
const FAKE_IP_TUN_IPV4_RE = /^198\.1[89]\./;

const PROXY_ENV_CHECK_KEYS = [
  'HTTP_PROXY',
  'HTTPS_PROXY',
  'ALL_PROXY',
  'http_proxy',
  'https_proxy',
  'all_proxy',
];

function isIPv4Family(family) {
  return family === 'IPv4' || family === 4;
}

function isIPv6Family(family) {
  return family === 'IPv6' || family === 6;
}

function hasActiveTunnelAddress(name, addrs) {
  if (!Array.isArray(addrs) || addrs.length === 0) return false;
  const isPureUtun = MACOS_UTUN_ONLY_RE.test(name);
  for (const entry of addrs) {
    if (!entry || entry.internal) continue;
    const addr = String(entry.address ?? '').trim();
    if (!addr) continue;
    if (isIPv4Family(entry.family)) {
      if (addr.startsWith('127.') || addr.startsWith('169.254.')) continue;
      return true;
    }
    if (isIPv6Family(entry.family)) {
      const lower = addr.toLowerCase();
      if (lower === '::1') continue;
      // macOS 空闲系统 utun 默认挂 fe80:: 链路本地地址；仅有 fe80:: 不算开启了代理 TUN
      if (isPureUtun && lower.startsWith('fe80:')) continue;
      return true;
    }
  }
  return false;
}

function hasFakeIpRangeAddress(addrs) {
  if (!Array.isArray(addrs)) return false;
  return addrs.some((entry) => (
    entry
    && !entry.internal
    && isIPv4Family(entry.family)
    && FAKE_IP_TUN_IPV4_RE.test(String(entry.address ?? '').trim())
  ));
}

function safeInterfaces(explicit) {
  if (explicit !== undefined) return explicit ?? {};
  try {
    return networkInterfaces() ?? {};
  } catch {
    return {};
  }
}

/**
 * 执行隧道环境预检（纯内存计算，零网络请求、零子进程调用）。
 *
 * @param {object} [opts]
 * @param {Record<string, Array<{address: string, family: string|number, internal: boolean}>>} [opts.interfaces]
 * @param {Record<string, string|undefined>} [opts.env]
 * @param {number|null} [opts.configuredPort]
 * @param {number|null} [opts.actualPort]
 */
export function runTunnelPreflight({
  interfaces,
  env = process.env,
  configuredPort = 3081,
  actualPort = null,
} = {}) {
  const ifaceMap = safeInterfaces(interfaces);
  const tunInterfaces = [];

  for (const [rawName, addrs] of Object.entries(ifaceMap)) {
    const name = String(rawName ?? '').trim();
    if (!name) continue;
    const nameMatched = TUN_ADAPTER_NAME_RE.test(name);
    if ((nameMatched && hasActiveTunnelAddress(name, addrs)) || (!nameMatched && hasFakeIpRangeAddress(addrs))) {
      tunInterfaces.push(name);
    }
  }

  const envSource = env ?? {};
  const proxyEnvDetected = PROXY_ENV_CHECK_KEYS.some((key) => {
    const val = envSource[key];
    return typeof val === 'string' && val.trim().length > 0;
  });

  const portShifted = Boolean(actualPort && configuredPort && actualPort !== configuredPort);
  const effectivePort = actualPort || configuredPort || 3081;

  return {
    tunDetected: tunInterfaces.length > 0,
    tunInterfaces,
    proxyEnvDetected,
    proxyEnvStripped: true,
    portShifted,
    targetServiceUrl: `http://127.0.0.1:${effectivePort}`,
  };
}
