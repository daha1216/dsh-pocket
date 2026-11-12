// HTML 文档注入（2026-11-12 评审 §3.1 拆包）。
//
// 宿主对声明了 accept-encoding 的浏览器（Chrome/Edge/Safari 全都声明）会回 gzip/br 压缩
// HTML——早期实现直接跳过压缩响应，结果**真实浏览器永远拿不到注入**（curl 不发
// accept-encoding 才看得到注入版）：randomUUID/AbortSignal.any polyfill 与 transport shim
// （issue #58/#96）全部静默失效，手机上表现为模型设置页「settings are unavailable in this
// browser」。现在先解压再注入；页面本体几十 KB，注入后以未压缩回传（删掉 content-encoding），
// 不值得重压。超过 HTML_INJECT_MAX（含未知长度的 chunked 响应）则放弃注入、原样流式回传。
//
// 注入顺序是行为契约：先 polyfill/shim（injectHtml 自带标记，重复注入会被 INJECT_MARK 挡掉），
// 再 TOKEN_SCRUB_SCRIPT（地址栏清 PIN）。两者都往 <head> 里塞，没有 <head> 的文档退到
// <body> 之后、再不行直接前置——脚本只要在首次 replaceState 之前执行即可。
import { gunzipSync, brotliDecompressSync, inflateSync } from 'node:zlib';
import { HTML_INJECT_MAX, INJECT_MARK, TOKEN_SCRUB_MARK, TOKEN_SCRUB_SCRIPT } from './inject.mjs';

/**
 * @param {{req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse,
 *   proxyRes: import('node:http').IncomingMessage, contentType: string, injectHtml: string}} ctx
 * @returns {boolean} 已接管响应（调用方必须立刻 return）
 */
export function injectHtmlDocument({ req, res, proxyRes, contentType, injectHtml }) {
  // HTML 文档注入（SSE/WS/JS/CSS 原样透传）。宿主对声明了 accept-encoding 的浏览器
  // （Chrome/Edge/Safari 全都声明）会回 gzip/br 压缩 HTML——早期实现直接跳过压缩响应，
  // 结果**真实浏览器永远拿不到注入**（curl 不发 accept-encoding 才看得到注入版）：
  // randomUUID/AbortSignal.any polyfill 与 transport shim（issue #58/#96）全部静默失效，
  // 手机上表现为模型设置页「settings are unavailable in this browser」。现在先解压
  // 再注入；页面本体几十 KB，注入后以未压缩回传（删掉 content-encoding），不值得重压。
  // 超过 HTML_INJECT_MAX（含未知长度的 chunked 响应）则放弃注入、原样流式回传。
  const htmlDeclared = Number(proxyRes.headers['content-length'] || 0);
  // 206（Range）响应是片段：注入 <head> 里的脚本会被截断/重复，直接透传。
  // 204/304 没有正文：注入分支会写出与实际不符的 content-length、并清掉 304 的
  // 缓存验证器（审计实测），同样直接透传。
  const bodyless = proxyRes.statusCode === 204 || proxyRes.statusCode === 304;
  if (injectHtml && !bodyless && proxyRes.statusCode !== 206 && contentType.includes('text/html') && htmlDeclared <= HTML_INJECT_MAX) {
    const chunks = [];
    let htmlBytes = 0;
    let htmlOverflow = false;
    proxyRes.on('data', (c) => {
      if (htmlOverflow) return;
      chunks.push(c);
      htmlBytes += c.length;
      if (htmlBytes > HTML_INJECT_MAX) {
        // 超大/未知长度响应：放弃注入，已收字节 + 后续数据直接流式回传，
        // 不再把整段 body 攒在内存里（同步解压炸弹会直接打死宿主进程）。
        htmlOverflow = true;
        const buffered = Buffer.concat(chunks);
        chunks.length = 0;
        if (!res.headersSent) res.writeHead(proxyRes.statusCode ?? 200, { ...proxyRes.headers });
        res.write(buffered);
        proxyRes.pipe(res);
      }
    });
    proxyRes.on('end', () => {
      if (htmlOverflow) return;
      const raw = Buffer.concat(chunks);
      const enc = String(proxyRes.headers['content-encoding'] ?? '').trim().toLowerCase();
      // 解压成功才注入：解压失败或白名单外编码（空/gzip/x-gzip/br/deflate
      // 之外）一律按原始头 + 原始体纯透传——继续注入只会得到有损 utf8 往返
      // 加损坏的 body，还要删上游的 content-encoding 头。
      // maxOutputLength：压缩比异常（解压炸弹）时让 zlib 直接抛错而不是先分配
      // GB 级内存；抛错走「原样透传」分支，客户端拿到的仍是可用的压缩体。
      let body = null;
      const maxOut = { maxOutputLength: HTML_INJECT_MAX };
      if (enc === '') body = raw;
      else if (enc === 'gzip' || enc === 'x-gzip') { try { body = gunzipSync(raw, maxOut); } catch { /* 见上 */ } }
      else if (enc === 'br') { try { body = brotliDecompressSync(raw, maxOut); } catch { /* 见上 */ } }
      else if (enc === 'deflate') { try { body = inflateSync(raw, maxOut); } catch { /* 见上 */ } }
      if (body === null) {
        res.writeHead(proxyRes.statusCode ?? 502, { ...proxyRes.headers });
        res.end(raw);
        return;
      }
      let html = body.toString('utf8');
      const scrub = req.__pocketTokenScrubbed && !html.includes(TOKEN_SCRUB_MARK) ? TOKEN_SCRUB_SCRIPT : '';
      let injected = false;
      if (!html.includes(INJECT_MARK)) {
        html = html.replace(/<head[^>]*>/i, (m) => { injected = true; return `${m}${injectHtml}${scrub}`; });
      } else if (scrub !== '') {
        html = html.replace(/<head[^>]*>/i, (m) => { injected = true; return `${m}${scrub}`; });
      }
      // 没有 <head> 的文档（片段、极简页）不能悄悄跳过注入：先退到 <body> 之后，
      // 再不行就直接前置（脚本在浏览器解析到前执行即可，位置不影响 replaceState）。
      if (!injected && scrub + injectHtml !== '') {
        if (/<body[^>]*>/i.test(html)) html = html.replace(/<body[^>]*>/i, (m) => `${m}${injectHtml}${scrub}`);
        else html = `${injectHtml}${scrub}${html}`;
      }
      const out = Buffer.from(html, 'utf8');
      const outHeaders = { ...proxyRes.headers };
      delete outHeaders['content-encoding'];
      delete outHeaders['content-length'];
      delete outHeaders['transfer-encoding'];
      outHeaders['content-length'] = String(out.length);
      // 注入后的 HTML 携带本代理的动态补丁（含注入标记判重），
      // 必须禁用缓存——否则手机/中间层（nginx 等）拿到没有补丁的旧
      // 文档后，isLoopback 修复不生效且难以排查（表现为"改了没效果"）。
      outHeaders['cache-control'] = 'no-store';
      delete outHeaders['etag'];
      delete outHeaders['last-modified'];
      delete outHeaders['expires'];
      res.writeHead(proxyRes.statusCode ?? 200, outHeaders);
      res.end(out);
    });
    proxyRes.on('error', () => res.destroy());
    return true;
  }
  return false;
}
