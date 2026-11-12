// Host / 来源分类与上游请求的目标改写（评审 §3.2：接入层策略集中在一处）。
//
// 所有「这个 Host 算本机、局域网还是公网」「该不该要密码」「关掉局域网后放不放行」
// 的判定都从这里出，避免同一条规则在代理与 WebSocket 两条路径上各写一遍后漂移。
// classifySource 的兜底方向与 classifyHost 相反（认不出按 public），原因见函数注释。

import { isIP } from 'node:net';

// 代理→上游 RPC 的来源分级头（loopback / lan / public）。入站同名头在
// loopbackAuthority 里被丢弃，值只由不可伪造的源地址 + policyHost 决定，
// 上游据此决定「公网 PIN 是否回显给这个客户端」之类的授权。
export const POCKET_ORIGIN_HEADER = 'x-dsh-pocket-origin';

/**
 * 取出 Host 里的主机名：去端口、去 IPv6 方括号、去 FQDN 尾点、小写。
 * classifyHost / isLoopbackHost 必须用同一套归一化，否则会出现「一个说是本机、
 * 另一个说不是」的分裂判定（审计实测 `127.0.0.1.`、`127.evil.com`、`[2001:db8::1]`
 * 两种函数给出相反结论）。
 */
function hostNameOnly(host) {
  let name = String(host ?? '').trim().toLowerCase();
  if (name.startsWith('[')) {
    const end = name.indexOf(']');
    if (end >= 0) name = name.slice(1, end); // [::1]:3081 → ::1
  } else {
    // 只有「恰好一个冒号且后面是纯数字」才是 host:port。裸 IPv6（≥2 个冒号）
    // 不能按端口切——`::1` 会被切出一个孤零零的 ':'，再被当成非 IP 主机名。
    const parts = name.split(':');
    if (parts.length === 2 && /^\d+$/.test(parts[1])) name = parts[0];
  }
  return name.replace(/\.+$/, ''); // 127.0.0.1. / localhost. → 去尾点
}

/**
 * Host 信任边界分类（issue #66：fail closed）。
 *
 * 旧逻辑只认 `*.trycloudflare.com` 后缀为公网，其余一律当局域网——用户自建
 * 命名隧道/反向代理指向本机端口时，固定域名被误判成局域网；若局域网密码又
 * 关着，公网入口就无密码裸奔。现在反转为 fail closed：
 *   - loopback：localhost / 127.x / ::1 / 0.0.0.0（本机与 cloudflared 回连）
 *   - lan：RFC1918 私网 IPv4、CGNAT 100.64/10（RFC 6598，Tailscale/ZeroTier 默认网段，
 *     公网不可路由）、IPv6 ULA/link-local、`.local`（mDNS）、无点单标签名（NetBIOS 计算机名等）
 *   - public：其余一切 Host（trycloudflare 或任何陌生域名）→ 强制公网密码
 *
 * @returns {'loopback'|'lan'|'public'}
 */
export function classifyHost(host) {
  let name = hostNameOnly(host);
  // IPv4-mapped IPv6（`::ffff:127.0.0.1`）是双栈环境下可能出现的本机字面量：按嵌入的
  // IPv4 规则分类，否则会被当成陌生域名、要求公网密码（审计 F6）。
  const mapped = /^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/.exec(name);
  if (mapped) name = mapped[1];
  if (name === '') return 'loopback'; // 无 Host（HTTP/1.0/畸形）→ 历史行为，当本机
  if (name === 'localhost' || name === '0.0.0.0') return 'loopback';
  const ipVersion = isIP(name);
  if (ipVersion === 4) {
    if (/^127\./.test(name)) return 'loopback';
    // RFC1918 私网 + CGNAT 100.64/10（RFC 6598，Tailscale/ZeroTier 默认网段，公网不可路由）
    if (/^(?:10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.|100\.(?:6[4-9]|[7-9]\d|1(?:0\d|1\d|2[0-7]))\.)/.test(name)) return 'lan';
    return 'public';
  }
  if (ipVersion === 6) {
    if (name === '::1') return 'loopback';
    if (/^(?:fe80:|f[cd][0-9a-f]{2}:)/.test(name)) return 'lan'; // IPv6 link-local / ULA
    return 'public';
  }
  // 非 IP 字面量：只有 localhost / 单标签名 / .local 是局域网；带点的域名一律 public。
  // 旧实现用 `/^127\./` 直接匹配字符串，`127.evil.com` 这种可注册域名会被判成本机
  // （配合 DNS rebinding 等于零认证入口）；`127.0.0.1.` 带尾点也与字面量不一致。
  if (name.endsWith('.local') || !name.includes('.')) return 'lan';
  return 'public';
}

/** 该 Host 是否受访问密码保护（公网一律要密码；局域网/本机按设置页开关）。 */
export function isProtectedHost(host, isProtected) {
  return isProtected ? isProtected(host) : classifyHost(host) === 'public';
}

/** 保护强度序：本机最弱（可免密）→ 局域网（按开关）→ 公网（永远要密码）。 */
const HOST_CLASS_RANK = { loopback: 0, lan: 1, public: 2 };

/**
 * 按 TCP 源地址给出来源类别（issue #90）。
 * 与 classifyHost 的区别在**兜底方向**：Host 头里认不出的形态按 loopback 处理
 * （历史行为，避免裸 IPv6 之类把本机访问判成公网）；而源地址认不出时必须按
 * public 处理——源地址是我们唯一不可伪造的信息，兜底方向错了整条防线就白搭。
 * @returns {'loopback'|'lan'|'public'|null} null 表示拿不到源地址（不做任何收紧）
 */
export function classifySource(addr) {
  let a = String(addr ?? '').trim().toLowerCase();
  if (!a) return null;
  if (a.startsWith('::ffff:')) a = a.slice(7); // IPv4-mapped IPv6（Node 双栈监听时常见）
  if (a === '::1' || /^127\./.test(a)) return 'loopback';
  // RFC1918 私网 + CGNAT 100.64/10（与 classifyHost 保持同一套网段判定）
  if (/^(?:10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.|100\.(?:6[4-9]|[7-9]\d|1(?:0\d|1\d|2[0-7]))\.)/.test(a)) return 'lan';
  if (/^169\.254\./.test(a)) return 'lan';            // IPv4 link-local
  if (/^(?:fe80:|f[cd][0-9a-f]{2}:)/.test(a)) return 'lan'; // IPv6 link-local / ULA
  return 'public';
}

/**
 * 请求是否经隧道 / 本地反代进来（源是 loopback 但实际来自外部）。
 *
 * cloudflared 以 `http://127.0.0.1:<port>` 回连本机代理，所以「TCP 源是 loopback」
 * 对隧道流量同样成立；可靠区分是边缘/反代注入、客户端直连时伪造无收益的头：
 * - `cf-connecting-ip` / `cf-ray`：Cloudflare 边缘注入；
 * - `x-forwarded-for` / `x-real-ip` / `forwarded`：nginx/traefik/Caddy 等反代默认注入。
 * 命名隧道的 ingress 若配了 httpHostHeader（或前面还有一层把 Host 改写成
 * 127.0.0.1 的反代），Host 会被判成 loopback/lan，从而把公网入口降级成免密本机。
 * 直接连代理的 LAN/公网客户端即使自带这些头也不会被当成隧道——这一判定还要求
 * TCP 源是 loopback，只有本机进程才满足。
 */
export function isCloudflareTunnelRequest(req) {
  if (classifySource(req?.socket?.remoteAddress) !== 'loopback') return false;
  const h = req?.headers ?? {};
  return Boolean(h['cf-connecting-ip'] || h['cf-ray'] || h['x-forwarded-for'] || h['x-real-ip'] || h.forwarded);
}

/** 隧道流量在策略判定里统一用这个不可路由的占位域名（classifyHost → public）。 */
export const TUNNEL_POLICY_HOST = 'cloudflare-tunnel.invalid';

/**
 * 用于策略判定的 Host（issue #90 第 7 条）。
 *
 * Host 头完全由客户端控制：能直连代理端口的人只要写 `Host: 127.0.0.1:3081`
 * 就会被 classifyHost 判成本机，从而绕过局域网开关和局域网密码——用户若按
 * README 关掉了局域网密码，这就是一条零认证通道。TCP 源地址无法伪造，用它给
 * Host 声明设一个下限。
 *
 * **只收紧、绝不放松**：经 cloudflared 隧道进来的公网请求源地址正是 127.0.0.1，
 * 若按源地址覆盖就会把公网访问降级成本机免密，比原来的问题更严重。所以仅当
 * 声明的保护级别**低于**来源真实级别时，才改用源地址参与判定。
 */
export function policyHost(req, host) {
  const actual = classifySource(req?.socket?.remoteAddress);
  if (!actual) return host;
  const claimed = classifyHost(host);
  if (HOST_CLASS_RANK[actual] <= HOST_CLASS_RANK[claimed]) return host;
  // 用真实源地址替代被伪造的 Host 参与后续全部策略判定（密码归属、局域网开关、
  // 局域网地址覆盖），保证各处判定看到的是同一个来源。
  let addr = String(req.socket.remoteAddress);
  if (addr.toLowerCase().startsWith('::ffff:')) addr = addr.slice(7);
  return addr;
}

/**
 * 该 Host 是否 loopback（本机 / cloudflared 回环）。
 * 「关闭局域网」只拦截经局域网 IP/主机名访问的请求，loopback 与公网（trycloudflare）放行：
 *   - cloudflared 隧道以 `http://127.0.0.1:<port>` 回连本机代理，必须放行；
 *   - 电脑自己访问 127.0.0.1/localhost 也应放行（仅当用户手动浏览本代理时）。
 */
export function isLoopbackHost(host) {
  const name = hostNameOnly(host);
  if (name === 'localhost' || name === '::1' || name === '0.0.0.0') return true;
  // 127.0.0.0/8 整段都是 loopback。必须与 classifyHost 的判定一致（那边也认整段），
  // 否则关掉局域网访问后，经 127.0.0.2 这类地址访问本机代理会被误判成「局域网」而 403。
  return isIP(name) === 4 && /^127(?:\.\d{1,3}){3}$/.test(name);
}

/** 请求是否期望 HTML（浏览器导航 → 返回登录页；API/WS → 401）。 */
export function isHtmlRequest(req) {
  const accept = String(req.headers.accept ?? '');
  if (accept.includes('text/html')) return true;
  const url = String(req.url ?? '');
  // 按 pathname 判断，别用 `url === '/'` 严格比 —— 根路径常带 query
  // （`/?dsh-pocket-auth=1`、`/?dsh-pocket-retry=1`、`/?token=…`），
  // 那些同样是浏览器导航，漏判会让它们拿到 401/303 而不是该给的页面。
  let pathname = url;
  try { pathname = new URL(url || '/', 'http://dsh.invalid').pathname; } catch { /* 用原值兜底 */ }
  return pathname === '/' || /\.html?$/i.test(pathname);
}

// ---------- dsh web 浏览器会话 token（issue #77） ----------
// 新版 dsh web（>= 0.1.2-alpha.1）给浏览器会话加了启动 token：根路径 `GET /` 必须带一次
// `?token=<启动 token>` 换一个绑定 authority 的 cookie，之后 /api 与 WebSocket 才放行；
// 否则一律 401（"dsh web authentication required"）。手机扫码进来的 URL 天然没有这个
// token，所以代理要在转发时补一次。
//
// 只在 `GET /` 且请求还没带 dsh-auth-* cookie 时注入：上游拿到 token 会 303 回干净的根
// 路径，若每次都注入就会 303 循环（浏览器很快报"重定向次数过多"）。
export const DSH_AUTH_COOKIE = 'dsh-auth-';
/**
 * 去掉 URL 上所有 `dsh-desktop-*` query 参数（issue #75）。
 *
 * dsh-pocket 在 ≤ 2.1.1 会用 `history.replaceState` 往页面 URL 上写
 * `dsh-desktop-mode=compatibility` 和 `dsh-desktop-platform=<系统>`
 * （desktopEnvPatchScript，已在 2.1.2 删除）。副作用是：用户当时收藏/保存过
 * 的那个地址**一直带着这两个参数**。升级之后我们不再注入了，但用户打开旧
 * 收藏时 URL 里仍然有 —— 上游 `decideDesktopBrowserAccess` 只要见到
 * `dsh-desktop-` 前缀就认定是渲染器请求，普通浏览器没有渲染器 token，直接
 * 403 forbidden。表现就是「我已经升到最新版了，还是 forbidden」。
 *
 * 脏参数是我们写进去的，就得由我们清掉。所有方法、所有路径都清理（不只是
 * `GET /`）——API 与 WebSocket 握手带上这些参数同样会被拦。
 *
 * @param {string} reqUrl - 原始请求路径（含 query）。
 * @returns {string} 清理后的路径；无该前缀参数或解析失败时原样返回。
 */
export function stripDesktopMarkers(reqUrl) {
  let u;
  try {
    u = new URL(reqUrl ?? '/', 'http://dsh.invalid');
  } catch {
    return reqUrl;
  }
  const doomed = [...u.searchParams.keys()].filter((k) => k.startsWith('dsh-desktop-'));
  if (doomed.length === 0) return reqUrl;
  for (const key of doomed) u.searchParams.delete(key);
  return `${u.pathname}${u.search}`;
}

export function upstreamPathWithLaunchToken(reqUrl, method, cookieHeader, launchToken) {
  if (method !== 'GET') return reqUrl;
  let u;
  try { u = new URL(reqUrl ?? '/', 'http://dsh.invalid'); } catch { return reqUrl; }
  if (u.pathname !== '/') return reqUrl;
  // 登录成功后跳回的 `/?dsh-pocket-auth=1`：强制重做一次握手（旧 cookie 可能已过期/被撤销）
  const force = u.searchParams.has('dsh-pocket-auth');
  if (!force && String(cookieHeader ?? '').includes(DSH_AUTH_COOKIE)) return reqUrl;
  if (!launchToken) return reqUrl;
  u.searchParams.set('token', launchToken);
  return `${u.pathname}${u.search}`;
}
