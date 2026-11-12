// WebSocket 透传的心跳与帧边界追踪（PR #41 / issue #29）。
//
// 浏览器侧 socket 定期收到协议层 Ping；连续静默则主动断开触发客户端重连。
// 插帧必须落在帧边界上，帧解析只跟踪帧头与 payload 剩余长度，不碰内容。


// ---------- WebSocket 心跳注入（PR #41，issue #29） ----------
// DSH 客户端与宿主的 WebSocket downlink 都不发 ping/pong（客户端只读流、
// 宿主只推帧），空闲连接会被路由器 NAT 空闲超时或手机系统省电机制**静默**
// 丢弃：没有 FIN/RST，浏览器收不到 close 事件，dsh-client-connection 也就
// 永远不会重连——手机页面看起来还开着，实则实时通道已死（消息不同步、
// 点击会话卡在加载）。
//
// 代理在每个透传的 WS 连接上定期向浏览器侧发送协议层 Ping（0x89 0x00，
// server→client 不掩码）：
//   - 浏览器网络栈按 RFC 6455 自动回 Pong（不经过任何 JS），一来一回让
//     双向都有流量，NAT/防火墙空闲超时不再触发；
//   - 连续 missLimit 个周期没有任何入站字节（浏览器已死或链路被静默丢弃）
//     → 主动 destroy 连接：浏览器拿到 close 后 dsh-client-connection 会
//     按指数退避自动重连，实时通道随即恢复。
// 只 Ping 浏览器侧：上游是本机 loopback，不会过期；浏览器回的 Pong 原样
// 透传给上游 ws 服务（未请求的 Pong 对 ws 库无害，只触发无害的 pong 事件）。
const WS_PING_FRAME = Buffer.from([0x89, 0x00]); // FIN + opcode 9、长度 0、不掩码

/**
 * 追踪「上游 → 浏览器」这一向的 WebSocket 帧边界。
 *
 * 心跳的 Ping 是直接往浏览器 socket 上写的裸帧。pipe 不以帧为单位搬运数据：
 * 一条大消息（或受到背压时）会被拆成多次 write，如果这时在中间插一个 0x89 0x00，
 * 这 2 字节就落在某条消息的 payload 里——浏览器按 RFC 6455 收到非法帧，直接以
 * 1002 协议错误关闭连接，实时通道反而更频繁地断。
 *
 * 所以注入前必须知道「现在是不是帧边界」。这里只做最小解析：帧头（含 126/127
 * 扩展长度与掩码键）和 payload 剩余字节数，不碰 payload 内容。
 */
export function createWebSocketFrameTracker() {
  let head = Buffer.alloc(0); // 已收但未解析完的帧头（长度/掩码可能跨块）
  let payloadLeft = 0; // 当前帧还没消费掉的 payload 字节数

  const consume = (chunk) => {
    let rest = chunk;
    if (payloadLeft > 0) {
      const take = Math.min(payloadLeft, rest.length);
      payloadLeft -= take;
      rest = rest.subarray(take);
      if (payloadLeft > 0) return;
    }
    for (;;) {
      const bytes = head.length === 0 ? rest : Buffer.concat([head, rest]);
      if (bytes.length < 2) { head = bytes; return; }
      const masked = (bytes[1] & 0x80) !== 0;
      const len7 = bytes[1] & 0x7f;
      let off = 2;
      let len;
      if (len7 === 126) {
        if (bytes.length < off + 2) { head = bytes; return; }
        len = bytes.readUInt16BE(off);
        off += 2;
      } else if (len7 === 127) {
        if (bytes.length < off + 8) { head = bytes; return; }
        const big = bytes.readBigUInt64BE(off);
        len = big > BigInt(Number.MAX_SAFE_INTEGER) ? Number.MAX_SAFE_INTEGER : Number(big);
        off += 8;
      } else {
        len = len7;
      }
      if (masked) {
        if (bytes.length < off + 4) { head = bytes; return; }
        off += 4;
      }
      head = Buffer.alloc(0);
      rest = bytes.subarray(off);
      payloadLeft = len;
      if (payloadLeft > 0) {
        const take = Math.min(payloadLeft, rest.length);
        payloadLeft -= take;
        rest = rest.subarray(take);
        if (payloadLeft > 0) return;
      }
      if (rest.length === 0) return;
    }
  };

  return {
    feed: consume,
    /** true 表示此刻正好在一个帧的边界上，可以安全插入控制帧。 */
    atFrameBoundary() { return payloadLeft === 0 && head.length === 0; },
  };
}

/**
 * 在透传的浏览器侧 socket 上挂载心跳：定期 Ping 保活 + 静默断链检测。
 * 任一路由方向只要有字节流动（Pong 响应）就把静默计数归零；连续 missLimit
 * 个周期零入站流量则判定链路已死，销毁 socket 触发浏览器端重连。
 * @param {import('node:net').Socket} socket 浏览器侧的透传 socket
 * @param {{intervalMs?:number, missLimit?:number, atFrameBoundary?:() => boolean}} [opts]
 *   心跳周期、容忍的静默周期数，以及「现在能否安全插入控制帧」的判定
 */
export function attachWebSocketHeartbeat(socket, { intervalMs = 30_000, missLimit = 2, atFrameBoundary = null } = {}) {
  let misses = 0;
  let stopped = false;
  const onInbound = () => { misses = 0; };
  const timer = setInterval(() => {
    if (stopped) return;
    // 正处于某一帧的 payload 中间：这一拍不插帧（下一拍再试）。不算 miss——
    // 数据还在流，说明链路活着，此刻的静默只是「凑巧在帧中间」。
    if (atFrameBoundary !== null && !atFrameBoundary()) return;
    misses += 1;
    if (misses >= missLimit) {
      // 连续多个周期没有任何入站流量（连 Pong 都没有）→ 静默断链，断开让客户端重连
      socket.destroy();
      return;
    }
    // write 到已销毁的 socket 会抛错（destroy 竞态），写前检查并兜底
    if (!socket.destroyed) {
      try { socket.write(WS_PING_FRAME); } catch { /* 忽略 */ }
    }
  }, intervalMs);
  timer.unref?.();
  socket.on('data', onInbound);
  const cleanup = () => {
    if (stopped) return;
    stopped = true;
    clearInterval(timer);
    socket.off('data', onInbound);
    socket.off('close', cleanup);
    socket.off('error', cleanup);
  };
  socket.on('close', cleanup);
  socket.on('error', cleanup);
}
