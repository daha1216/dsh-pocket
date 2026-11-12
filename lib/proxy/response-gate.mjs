// 响应前段门：两种「不该原样透传」的上游响应在这里改写掉（2026-11-12 评审 §3.1 拆包）。
//
// ① issue #91 握手过渡页：注入过 launch token 的请求，上游回 303 + Set-Cookie。Safari 不保存
//    http://IP 源上 3xx 下发的 cookie → 浏览器下次仍无 cookie → 再注入 → 再 303 死循环。
//    这里把这次 303 改成 200 过渡页：Set-Cookie 照发（200 上的 cookie 不会被那条重定向
//    策略丢掉），页面用 meta refresh 跳回 `/`。
// ② issue #81 桌面门禁：上游 desktop-browser-access 对普通浏览器回 403 text/plain
//    "forbidden"，本代理无法携带 Electron renderer secret 绕过。对**浏览器导航**请求改写成
//    可操作提示页；API/WS 与其余 403 原样透传（不猜 secret、不把任意 403 都判为门禁）。
import { isHtmlRequest } from './hosts.mjs';
import { desktopAccessBlockedPageHtml, handshakePageHtml } from './pages.mjs';
import { TOKEN_SCRUB_SCRIPT } from './inject.mjs';

/**
 * @param {{req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse,
 *   proxyRes: import('node:http').IncomingMessage, contentType: string, didInjectToken: boolean}} ctx
 * @returns {boolean} 已接管响应（调用方必须立刻 return）
 */
export function serveEarlyResponseGate({ req, res, proxyRes, contentType, didInjectToken }) {
  // issue #91：我们刚注入了 launch token，上游回 303（换 cookie 后回干净根路径）。
  // Safari 不保存 http://IP 源上 3xx 响应下发的 cookie，于是浏览器下次仍无 cookie
  // → 代理再注入 → 再 303 → 死循环。这里把这次 303 改成 200 过渡页：Set-Cookie
  // 照发（200 上的 cookie 不会被那条重定向策略丢掉），页面用 meta refresh 跳回 `/`。
  if (didInjectToken && proxyRes.statusCode === 303 && isHtmlRequest(req)) {
    const out = { ...proxyRes.headers };
    delete out['content-length'];
    delete out['transfer-encoding'];
    // 过渡页是我们自己写的明文 HTML：上游 303 若带 content-encoding，原样保留会让
    // 浏览器按 gzip 解码明文 → ERR_CONTENT_DECODING_FAILED 白屏（审计 F8）。
    delete out['content-encoding'];
    delete out.location; // 自己跳，不留给浏览器去重做一次 303
    const page = Buffer.from(handshakePageHtml(req.__pocketTokenScrubbed ? TOKEN_SCRUB_SCRIPT : ''), 'utf8');
    out['content-type'] = 'text/html; charset=utf-8';
    out['content-length'] = String(page.length);
    out['cache-control'] = 'no-store';
    out['x-dsh-pocket-handshake'] = 'transition';
    proxyRes.resume(); // 消费掉上游响应体，释放连接
    res.writeHead(200, out);
    res.end(page);
    return true;
  }
  // issue #81：上游 desktop-browser-access 门禁（DSH Desktop 未开启「浏览器访问」时）
  // 对普通浏览器（含经本代理转发的手机）返回 403 text/plain "forbidden"，且本代理无法
  // 携带 Electron renderer secret 绕过。对符合该特征的**浏览器导航**请求改写为可操作
  // 提示页；API/WS 与其余 403 原样透传（不猜 secret、不把任意 403 都判为桌面门禁）。
  if (proxyRes.statusCode === 403 && contentType.includes('text/plain')) {
    const navReq = isHtmlRequest(req);
    const gateChunks = [];
    let gateBytes = 0;
    let gateOverflow = false;
    proxyRes.on('data', (c) => {
      if (gateOverflow) return;
      gateChunks.push(c);
      // 累加长度，别每个 chunk 都 Buffer.concat 一遍：64KB 上限下小包可能几十个，
      // 每次复制已缓冲的全部字节是 O(n²)。
      gateBytes += c.length;
      if (gateBytes > 65536) {
        // 超过判定阈值：已缓冲的字节必须原样写出再从下一 chunk 起 pipe。
        // 之前这里直接 gateChunks.length = 0 清空，等于把已收到的 64KB 全丢了
        // （passRaw403 里的 if (gateChunks.length) 已空），响应体缺开头。
        gateOverflow = true;
        const buffered = Buffer.concat(gateChunks);
        gateChunks.length = 0;
        if (res.headersSent) return;
        res.writeHead(403, { ...proxyRes.headers });
        if (buffered.length) res.write(buffered);
        proxyRes.pipe(res);
      }
    });
    proxyRes.on('end', () => {
      if (gateOverflow || res.headersSent) return;
      const body = Buffer.concat(gateChunks).toString('utf8').trim();
      if (navReq && body === 'forbidden') {
        res.writeHead(403, {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-store',
          'x-dsh-pocket-gate': 'desktop-browser-access',
        });
        res.end(desktopAccessBlockedPageHtml());
      } else {
        res.writeHead(403, { ...proxyRes.headers });
        res.end(Buffer.concat(gateChunks));
      }
    });
    proxyRes.on('error', () => res.destroy());
    return true;
  }
  return false;
}
