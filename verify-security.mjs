// 安全加固的行为验证（对应 SECURITY-NOTES.md 的两处修复）：
//   1. 登录表单：错误 PIN 被拒、正确 PIN 放行，替代令牌（临时 PIN）也放行；
//   2. 限速身份键：伪造 cf-connecting-ip 不能换身份。这一条分两层验证——
//      直接断言身份键的实现（socket 源地址，与请求头无关），再端到端跑一遍登录。
//
// 跑法（需 Node >= 22，无第三方依赖）：node verify-security.mjs
import { createServer } from 'node:http';
import { createPocketProxy, isProtectedHost, classifyHost, clientIp } from './lib/proxy.mjs';

const PIN = 'AAAA1111';
const UP_PORT = 3399;

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

// 上游：任何请求都回 200，便于区分「被代理放行」与「被门禁拦下」
const upstream = createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain', 'set-cookie': 'dsh-auth-x=1; Path=/' });
  res.end('UPSTREAM_OK');
});
await new Promise((r) => upstream.listen(UP_PORT, '127.0.0.1', r));

// ---- 1. 限速身份键的实现（核心回归点，不需要起代理）----
// clientIp(req)：只有来源是 loopback 才采信 cf-connecting-ip；其余一律用 socket 源地址。
// 这就是「远程来源换头不能换身份」的直接证据。
const reqFrom = (remoteAddress, cf) => ({
  socket: { remoteAddress },
  headers: cf ? { 'cf-connecting-ip': cf } : {},
});
check(
  '远程来源（公网 IP）伪造 cf-connecting-ip → 身份仍是 socket 地址',
  clientIp(reqFrom('203.0.113.9', '10.9.9.7')) === '203.0.113.9',
  `得到 ${clientIp(reqFrom('203.0.113.9', '10.9.9.7'))}`,
);
check(
  '局域网来源（192.168.x）伪造 cf-connecting-ip → 身份仍是 socket 地址',
  clientIp(reqFrom('192.168.1.50', '10.9.9.7')) === '192.168.1.50',
  `得到 ${clientIp(reqFrom('192.168.1.50', '10.9.9.7'))}`,
);
check(
  '隧道回连（loopback）→ 仍采信 cf-connecting-ip（不影响公网场景）',
  clientIp(reqFrom('127.0.0.1', '10.9.9.7')) === '10.9.9.7',
  `得到 ${clientIp(reqFrom('127.0.0.1', '10.9.9.7'))}`,
);
check('isProtectedHost 默认只保护 public Host', isProtectedHost('pocket.example.com') === (classifyHost('pocket.example.com') === 'public'), '默认语义未被改动');

const proxy = await createPocketProxy({
  port: 0,
  host: '127.0.0.1',
  upstream: { host: '127.0.0.1', port: UP_PORT },
  log: () => {},
  auth: {
    getToken: () => PIN,              // 该 Host 的 PIN
    getAltTokens: () => ['TMP99999'], // 替代令牌（临时 PIN）——旧代码会把它挡在门外
    sessionKey: 'test-session-key',
    // TEST-ONLY：强制把当前 Host 当作受保护入口（等价于真实场景的公网域名）。
    // 生产默认语义（isProtected 缺省 → 只有 public 要密码）已由上面那条断言覆盖。
    isProtected: () => true,
  },
  rateLimit: { maxFailures: 5, lockMs: 60_000 },
  lanAccessEnabled: () => true,
  launchToken: () => '',
});
const base = `http://127.0.0.1:${proxy.port}`;

/** POST /pocket-login，返回 { status, location, body }。extraHeaders 用于伪造头。 */
async function login(pin, extraHeaders = {}) {
  const res = await fetch(`${base}/pocket-login`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', ...extraHeaders },
    body: `token=${encodeURIComponent(pin)}`,
    redirect: 'manual',
  });
  return { status: res.status, location: res.headers.get('location'), body: await res.text() };
}

try {
  // ---- 2. 正确 PIN 放行 ----
  const ok = await login(PIN);
  check('正确 PIN 登录 → 302 放行', ok.status === 302 && String(ok.location).startsWith('/?dsh-pocket-auth=1'), `status=${ok.status} location=${ok.location}`);

  // ---- 3. 替代令牌（临时 PIN）也被接受 ----
  const alt = await login('TMP99999');
  check('替代令牌（临时 PIN）→ 302 放行', alt.status === 302, `status=${alt.status} location=${alt.location}`);

  // ---- 4. 错误 PIN 被拒 ----
  const bad = await login('ZZZZ9999');
  check('错误 PIN → 拒绝（200 登录页）', bad.status === 200 && bad.body.includes('password-protected'), `status=${bad.status}`);

  // ---- 5. 端到端：同一身份连续失败达阈值 → 锁定 ----
  // 注意：本机测试客户端来自 loopback，因此它伪造的头会生效（等同 cloudflared 回连），
  // 这正是设计行为。所以这里不伪造头，用同一身份连打失败，验证锁定确实会触发。
  let lockedStatus = null;
  const seen = [];
  for (let i = 0; i < 8; i++) {
    const r = await login('ZZZZ9999'); // 同一身份（loopback 源地址）
    seen.push(r.status);
    if (r.status === 429) { lockedStatus = 429; break; }
  }
  check('同一身份连续失败达阈值后锁定（429）', lockedStatus === 429, `状态序列=${seen.join(',')}`);
} finally {
  await proxy.close();
  upstream.close();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} 通过`);
process.exit(failed.length === 0 ? 0 : 1);
