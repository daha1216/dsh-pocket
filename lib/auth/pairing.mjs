// dsh-pocket v4.0 一步扫码配对票据管理器（内存态一次性 CSPRNG 令牌）
//
// 安全不变量：
//   1. 128-bit CSPRNG URL-safe 票据（randomBytes(16).toString('base64url')）；
//   2. 内存中只存 sha256(ticket) 摘要，比对走 timingSafeEqual；
//   3. 严格一次性原子销毁（single-use burn）：首次命中立即删除，绝不可重放；
//   4. 严格通道绑定：局域网签发的票据（channel='lan'）严禁在公网入口兑换，反之亦然；
//   5. 活跃票据上限 32 条，过期票据保留短暂墓碑以便精准区分 'expired' 与 'invalid'。

import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

export const DEFAULT_PAIRING_TTL_MS = 90_000;
export const MAX_ACTIVE_PAIRING_TICKETS = 32;
const EXPIRED_TOMBSTONE_RETENTION_MS = 10 * 60_000;
const MAX_TOTAL_ENTRIES = 128;

function sha256Buf(value) {
  return createHash('sha256').update(String(value), 'utf8').digest();
}

/**
 * 创建一步扫码配对票据管理器。
 * @param {{ ttlMs?: number, maxActive?: number, now?: () => number }} [options]
 */
export function createPairingManager({
  ttlMs = DEFAULT_PAIRING_TTL_MS,
  maxActive = MAX_ACTIVE_PAIRING_TICKETS,
  now = Date.now,
} = {}) {
  const effectiveTtlMs = Number.isFinite(ttlMs) && ttlMs > 0 ? Math.floor(ttlMs) : DEFAULT_PAIRING_TTL_MS;
  const effectiveMaxActive = Number.isFinite(maxActive) && maxActive >= 1 ? Math.floor(maxActive) : MAX_ACTIVE_PAIRING_TICKETS;

  /**
   * 键为内部自增序号，值为 { ticketHash: string, ticketHashBuf: Buffer, channel: 'lan'|'public', createdAt: number, expiresAt: number }
   * @type {Map<number, { ticketHash: string, ticketHashBuf: Buffer, channel: 'lan' | 'public', createdAt: number, expiresAt: number }>}
   */
  const entries = new Map();
  let seq = 0;

  function prune(ts) {
    const activeKeys = [];
    for (const [id, entry] of entries) {
      if (ts > entry.expiresAt + EXPIRED_TOMBSTONE_RETENTION_MS) {
        entries.delete(id);
      } else if (ts <= entry.expiresAt) {
        activeKeys.push(id);
      }
    }
    // 活跃票据超出上限时按签发先后淘汰最旧条目
    while (activeKeys.length >= effectiveMaxActive) {
      const oldestKey = activeKeys.shift();
      if (oldestKey !== undefined) entries.delete(oldestKey);
    }
    while (entries.size >= MAX_TOTAL_ENTRIES) {
      const oldest = entries.keys().next().value;
      if (oldest === undefined) break;
      entries.delete(oldest);
    }
  }

  return {
    /**
     * 签发一张绑定指定通道的单次配对票据。
     * @param {{ channel: 'lan' | 'public', baseUrl?: string }} params
     */
    issue({ channel, baseUrl = '' } = {}) {
      if (channel !== 'lan' && channel !== 'public') {
        throw new Error(`未知配对通道: ${String(channel)} | invalid pairing channel`);
      }
      const ts = now();
      prune(ts);

      const ticket = randomBytes(16).toString('base64url');
      const ticketHashBuf = sha256Buf(ticket);
      const ticketHash = ticketHashBuf.toString('hex');
      const expiresAt = ts + effectiveTtlMs;

      seq += 1;
      entries.set(seq, {
        ticketHash,
        ticketHashBuf,
        channel,
        createdAt: ts,
        expiresAt,
      });

      const cleanBase = String(baseUrl ?? '').trim().replace(/\/+$/, '');
      const url = cleanBase ? `${cleanBase}/?pair=${ticket}` : `/?pair=${ticket}`;

      return {
        ticket,
        url,
        expiresAt,
        ttlMs: effectiveTtlMs,
        channel,
      };
    },

    /**
     * 兑换并原子销毁配对票据（单次有效，不可重放）。
     * @param {string} rawTicket
     * @param {'lan' | 'public'} currentChannel
     * @returns {{ ok: true, channel: 'lan' | 'public' } | { ok: false, reason: 'expired' | 'invalid' | 'channel-mismatch' }}
     */
    redeem(rawTicket, currentChannel) {
      const raw = String(rawTicket ?? '').trim();
      if (raw.length < 16 || raw.length > 128 || !/^[A-Za-z0-9_-]+$/.test(raw)) {
        return { ok: false, reason: 'invalid' };
      }

      const candidateBuf = sha256Buf(raw);
      let matchedId = null;
      let matchedEntry = null;

      // 遍历全表做常量时间摘要比较，避免早退造成时序侧信道
      for (const [id, entry] of entries) {
        if (
          entry.ticketHashBuf.length === candidateBuf.length
          && timingSafeEqual(entry.ticketHashBuf, candidateBuf)
        ) {
          matchedId = id;
          matchedEntry = entry;
        }
      }

      if (matchedId === null || matchedEntry === null) {
        return { ok: false, reason: 'invalid' };
      }

      // 原子单次销毁：只要命中摘要，无论后续是否过期或跨通道都立即作废
      entries.delete(matchedId);

      const ts = now();
      if (currentChannel !== matchedEntry.channel) {
        return { ok: false, reason: 'channel-mismatch' };
      }
      if (ts > matchedEntry.expiresAt) {
        return { ok: false, reason: 'expired' };
      }
      return { ok: true, channel: matchedEntry.channel };
    },

    /** 清空全部或指定通道的待兑换票据（如关闭隧道或恢复出厂设置时调用）。 */
    clear({ channel } = {}) {
      if (channel !== 'lan' && channel !== 'public') {
        entries.clear();
        return;
      }
      for (const [id, entry] of entries) {
        if (entry.channel === channel) entries.delete(id);
      }
    },

    /** 当前未过期的活跃票据数。 */
    activeCount() {
      const ts = now();
      let n = 0;
      for (const entry of entries.values()) {
        if (ts <= entry.expiresAt) n += 1;
      }
      return n;
    },
  };
}
