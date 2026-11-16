// 轻量视图的宿主会话 cookie 握手。
//
// 宿主的 /api 与 WebSocket 要求 dsh-auth-* cookie（启动 token 换来的、绑定 authority 的
// 会话）。正常路径是手机先打开宿主界面：代理给 `GET /` 补一次 ?token=…，上游 303 下发
// cookie（proxy/hosts.mjs 的 upstreamPathWithLaunchToken）。轻量视图由代理直出、从不经过
// 那一跳，于是「直接把 /__dsh-pocket/lite 加到主屏幕」的手机第一次打开时没有 cookie，
// 页面里的 /api 全部 401（表现为列表空白 + 断线横幅）。
//
// 修法：直出页面前，代理在服务端替浏览器做一次同样的换 cookie，把上游下发的 Set-Cookie
// 原样挂到页面响应上（静态资源不需要，浏览器随后带着 cookie 来取）。**每次打开都换**：
// 宿主这一跳是无状态签名（browser-auth.ts 的 authorizeIndex 现签现发，不在宿主建会话），
// 所以刷新不涨内存，却能顺带覆盖「主屏冷启动 / cookie 过期 / 很久没打开」。
// 握手失败不影响页面直出——最坏情况退回「手动先打开一次宿主界面」。
import { request as httpRequest } from 'node:http';
import { loopbackAuthority } from '../proxy/auth.mjs';

/** 握手超时：loopback 往返通常 <5ms，3s 只是防止上游卡死拖住页面直出。 */
export const LITE_HANDSHAKE_TIMEOUT_MS = 3000;

/**
 * 替浏览器用启动 token 换宿主会话 cookie。
 * @param {{
 *   upstream: { host: string, port: number },
 *   launchToken?: string | (() => string),
 *   headers?: Record<string, string | string[] | undefined>,
 *   agent?: import('node:http').Agent,
 *   timeoutMs?: number,
 *   log?: ((line: string) => void) | null,
 * }} options
 * @returns {Promise<string[]>} 上游下发的 Set-Cookie；失败或无需握手时为空数组
 */
export function fetchHostSession({
  upstream,
  launchToken,
  headers = {},
  agent = undefined,
  timeoutMs = LITE_HANDSHAKE_TIMEOUT_MS,
  log = null,
} = {}) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (cookies) => {
      if (settled) return;
      settled = true;
      resolve(cookies);
    };
    const token = typeof launchToken === 'function' ? launchToken() : launchToken;
    if (!token) {
      finish([]);
      return;
    }
    if (!upstream || !upstream.host || !upstream.port) {
      finish([]);
      return;
    }
    let req;
    try {
      req = httpRequest({
        host: upstream.host,
        port: upstream.port,
        method: 'GET',
        // 与普通导航完全同一条路径：上游见 token 就 303 + Set-Cookie。
        path: '/?token=' + encodeURIComponent(token),
        headers: loopbackAuthority({ ...headers, accept: 'text/html' }, upstream),
        agent,
      }, (res) => {
        const raw = res.headers['set-cookie'];
        const cookies = Array.isArray(raw) ? raw.slice() : raw ? [raw] : [];
        // 只要响应头，body 一律丢弃（303 无体，200 时也不必读）。
        res.resume();
        finish(cookies);
      });
    } catch (err) {
      log?.('dsh-pocket: lite handshake skipped | 轻量视图会话握手跳过: ' + (err?.message ?? err));
      finish([]);
      return;
    }
    req.setTimeout(timeoutMs, () => req.destroy(new Error('lite handshake timeout')));
    req.on('error', (err) => {
      log?.('dsh-pocket: lite handshake failed | 轻量视图会话握手失败: ' + (err?.message ?? err));
      finish([]);
    });
    req.end();
  });
}