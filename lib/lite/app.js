'use strict';
/*
 * dsh-pocket 轻量视图（终局评审 §7.1 路线 A 的最小实现）。
 *
 * 它不复用宿主的 React 界面：只走宿主已经在用的 HTTP JSON-RPC（/api/session/*）与
 * 远程事件线（/api/remote.mux + /api/$events/result），因此不需要任何宿主改动，
 * 也不会被代理的移动端 HTML 注入碰到（本页由代理直出，不走上游）。
 *
 * 协议出处（解包自 app.asar 的宿主源码）：
 *   dsh-client-connection/lib/client.node.js  createWebConnectionRpc.call —— 信封形状
 *   dsh-api-gateway/src/index.ts               remoteRequest / openRemoteEvents —— args 约束
 *   dsh-api-gateway/src/stream-protocol.ts     $events 帧与 $events/result 结果校验
 *   dsh-api-session-controller/src/types.ts    session/list|events|prompt|state 的字段
 *
 * 设计边界：只读消息 + 发消息 + 审批。不做附件、模型选择、新建/删除会话、搜索、
 * 用户提问（user-questions）审批——这些仍然回宿主界面（fallback）做。
 */
(function () {
  var DICT = {
    zh: {
      title: '会话',
      listEmpty: '还没有会话。回到宿主界面新建一个。',
      loading: '加载中…',
      older: '加载更早的消息',
      composer: '发消息…',
      send: '发送',
      stop: '停止',
      allow: '允许一次',
      reject: '拒绝',
      approvalNeed: '需要你批准',
      approvalReason: '理由',
      tool: '工具',
      toolResult: '结果',
      offline: '与电脑的连接断开了，正在重试…',
      online: '连接已恢复',
      authFail: '登录状态失效了，请点右侧链接重新登录。',
      reopen: '打开主界面',
      retry: '重试',
      loadFail: '加载失败：',
      sent: '已发送',
      stopSent: '已请求停止',
      running: '运行中',
      untitled: '空白会话',
      justNow: '刚刚',
      minutesAgo: ' 分钟前',
      hoursAgo: ' 小时前',
      daysAgo: ' 天前',
      interrupted: '本轮已中断',
      turnError: '本轮出错：',
      image: '[图片]',
      file: '[文件]',
      emptyText: '（空消息）'
    },
    en: {
      title: 'Sessions',
      listEmpty: 'No sessions yet. Create one in the host UI.',
      loading: 'Loading…',
      older: 'Load earlier messages',
      composer: 'Message…',
      send: 'Send',
      stop: 'Stop',
      allow: 'Allow once',
      reject: 'Reject',
      approvalNeed: 'Approval needed',
      approvalReason: 'Reason',
      tool: 'Tool',
      toolResult: 'Result',
      offline: 'Disconnected from the computer, retrying…',
      online: 'Connection restored',
      authFail: 'Your session expired. Reopen the host UI to sign in again.',
      reopen: 'Open host UI',
      retry: 'Retry',
      loadFail: 'Failed to load: ',
      sent: 'Sent',
      stopSent: 'Stop requested',
      running: 'running',
      untitled: 'empty session',
      justNow: 'just now',
      minutesAgo: ' min ago',
      hoursAgo: ' h ago',
      daysAgo: ' d ago',
      interrupted: 'Turn interrupted',
      turnError: 'Turn failed: ',
      image: '[image]',
      file: '[file]',
      emptyText: '(empty message)'
    }
  };

  var LANG = (navigator.language || 'zh').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en';
  function t(key) {
    var table = DICT[LANG] || DICT.zh;
    if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
    return Object.prototype.hasOwnProperty.call(DICT.zh, key) ? DICT.zh[key] : key;
  }

  function pick(id) { return document.getElementById(id); }

  var state = {
    view: 'list',
    sessions: [],
    sessionId: null,
    sessionTitle: '',
    records: [],
    hasMore: false,
    running: false,
    approvals: {},
    approvalOrder: [],
    clientId: null,
    linkDown: false,
    authFailed: false,
    busy: false,
    lastListAt: 0,
    lastChatAt: 0,
    toastTimer: 0
  };

  var dom = null;
  var PAGE_MESSAGES = 30;
  var LIST_POLL_MS = 5000;
  var CHAT_POLL_MS = 3000;
  var RECONNECT_MS = [1000, 2000, 4000, 8000, 15000];

  // ── 传输：宿主 HTTP JSON-RPC 信封 ──────────────────────────────────────────
  // 与宿主浏览器客户端逐字一致：POST /api/<endpoint>，body 是
  // {type:'client-request', rpcId, method:<endpoint>, payload:{args}}；成功回
  // {type:'server-response', rpcId, result:{ok:true,value}}，业务失败是 ok:false。
  var rpcSeq = 0;
  function nextRpcId() {
    rpcSeq += 1;
    return 'lite-' + Date.now().toString(36) + '-' + rpcSeq.toString(36);
  }
  function rpc(endpoint, args) {
    var id = nextRpcId();
    return fetch('/api/' + endpoint, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type: 'client-request', rpcId: id, method: endpoint, payload: { args: args || {} } })
    }).then(function (res) {
      if (res.status === 401 || res.status === 403) {
        var authErr = new Error('authentication required');
        authErr.code = 'auth';
        throw authErr;
      }
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    }).then(function (body) {
      if (!body || body.type !== 'server-response') throw new Error('bad rpc response');
      if (body.rpcId !== id) throw new Error('rpc id mismatch');
      var result = body.result;
      if (!result) throw new Error('rpc response has no result');
      if (!result.ok) {
        var err = new Error((result.error && result.error.message) || 'rpc failed');
        err.code = result.error && result.error.code;
        throw err;
      }
      return result.value;
    });
  }

  // ── 视图切换 ──────────────────────────────────────────────────────────────
  function setView(view) {
    state.view = view;
    var chat = view === 'chat';
    dom.viewList.hidden = chat;
    dom.viewChat.hidden = !chat;
    dom.composer.hidden = !chat;
    dom.back.hidden = !chat;
    dom.refresh.hidden = chat;
    dom.title.textContent = chat ? (state.sessionTitle || t('title')) : 'DSH Pocket';
    if (!chat) {
      dom.messages.replaceChildren();
      state.records = [];
      state.hasMore = false;
      state.sessionId = null;
      state.running = false;
      state.lastListAt = 0;
      dom.older.hidden = true;
    }
  }

  function showToast(text) {
    dom.toast.textContent = text;
    dom.toast.hidden = false;
    if (state.toastTimer) window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(function () { dom.toast.hidden = true; }, 1800);
  }

  function showBanner(text, options) {
    var opts = options || {};
    dom.bannerText.textContent = text;
    dom.bannerLink.hidden = opts.link !== true;
    dom.bannerRetry.hidden = opts.retry !== true;
    dom.banner.hidden = false;
    dom.banner.setAttribute('data-kind', opts.error === true ? 'error' : 'warn');
  }
  function hideBanner() { dom.banner.hidden = true; }

  // ── 会话列表 ──────────────────────────────────────────────────────────────
  function titleOf(summary) {
    var values = summary && summary.projections && summary.projections.values;
    var title = values && values.title;
    return typeof title === 'string' && title.trim() !== '' ? title : '';
  }
  function relativeTime(ms) {
    if (!ms) return '';
    var delta = Date.now() - Number(ms);
    if (!isFinite(delta) || delta < 0) return '';
    if (delta < 60000) return t('justNow');
    if (delta < 3600000) return Math.floor(delta / 60000) + t('minutesAgo');
    if (delta < 86400000) return Math.floor(delta / 3600000) + t('hoursAgo');
    return Math.floor(delta / 86400000) + t('daysAgo');
  }

  function renderSessions() {
    var frag = document.createDocumentFragment();
    state.sessions.forEach(function (summary) {
      var row = document.createElement('li');
      row.className = 'row';
      row.setAttribute('data-session-id', String(summary.sessionId));
      row.addEventListener('click', function () { openSession(summary); });
      var main = document.createElement('div');
      main.className = 'row__main';
      var title = document.createElement('div');
      title.className = 'row__title';
      title.textContent = titleOf(summary) || t('untitled');
      main.appendChild(title);
      var bits = [];
      if (summary.running) bits.push(t('running'));
      var when = relativeTime(summary.updatedAt);
      if (when) bits.push(when);
      if (bits.length) {
        var sub = document.createElement('div');
        sub.className = 'row__sub';
        sub.textContent = bits.join(' · ');
        main.appendChild(sub);
      }
      row.appendChild(main);
      if (summary.running) {
        var dot = document.createElement('span');
        dot.className = 'row__dot';
        row.appendChild(dot);
      }
      frag.appendChild(row);
    });
    dom.list.replaceChildren(frag);
    dom.listEmpty.hidden = state.sessions.length !== 0;
    dom.listEmpty.textContent = t('listEmpty');
  }

  function loadSessions() {
    return rpc('session/list', { _request: {} }).then(function (value) {
      state.sessions = (value && value.items) || [];
      state.lastListAt = Date.now();
      state.authFailed = false;
      hideBanner();
      renderSessions();
    }).catch(handleFailure);
  }

  function handleFailure(err) {
    if (err && err.code === 'auth') {
      state.authFailed = true;
      showBanner(t('authFail'), { error: true, link: true });
      return;
    }
    if (state.linkDown) return;
    showBanner(t('loadFail') + ((err && err.message) || 'error'), { error: true, retry: true });
  }

  // ── 会话：消息 ────────────────────────────────────────────────────────────
  function seqOf(record) { return record && record.event ? Number(record.event.seq) : 0; }
  function recordKey(record) { return seqOf(record) + ':' + String((record.event && record.event.type) || ''); }

  // 轮询刷新最新一页时不能整体替换：用户翻过更早的消息后，替换会把它们丢掉，
  // 也会让「加载更早」按钮重新出现。这里按 seq 合并去重。
  function mergeRecords(existing, incoming) {
    if (!incoming || !incoming.length) return existing;
    if (!existing.length) return incoming.slice().sort(function (a, b) { return seqOf(a) - seqOf(b); });
    var byKey = new Map();
    existing.forEach(function (record) { byKey.set(recordKey(record), record); });
    incoming.forEach(function (record) { byKey.set(recordKey(record), record); });
    var merged = Array.from(byKey.values());
    merged.sort(function (a, b) { return seqOf(a) - seqOf(b); });
    return merged;
  }

  function openSession(summary) {
    state.sessionId = String(summary.sessionId);
    state.sessionTitle = titleOf(summary) || t('untitled');
    state.records = [];
    state.hasMore = false;
    state.running = !!summary.running;
    setView('chat');
    history.pushState({ lite: 'chat', sessionId: state.sessionId }, '');
    updateStopButton();
    dom.messages.replaceChildren();
    loadLatestPage();
    loadState();
  }

  function fetchPage(extra) {
    var request = { address: { kind: 'session', sessionId: state.sessionId }, maxMessages: PAGE_MESSAGES };
    Object.keys(extra || {}).forEach(function (key) { request[key] = extra[key]; });
    return rpc('session/events', { request: request });
  }

  function loadLatestPage() {
    if (!state.sessionId) return Promise.resolve();
    return fetchPage().then(function (page) {
      var stick = isNearBottom();
      // 只有首屏才采信 hasMore：之后的翻页状态由 loadOlderPage 维护，
      // 否则每秒轮询都会把「已经翻到底」改回「还有更早」。
      var firstLoad = state.records.length === 0;
      state.records = mergeRecords(state.records, (page && page.records) || []);
      if (firstLoad) state.hasMore = !!(page && page.hasMore);
      state.lastChatAt = Date.now();
      hideBanner();
      renderMessages(stick);
    }).catch(handleFailure);
  }

  function loadOlderPage() {
    if (!state.records.length || state.busy || !state.hasMore) return;
    state.busy = true;
    dom.older.textContent = t('loading');
    var first = state.records[0];
    var beforeSeq = first && first.event ? first.event.seq : undefined;
    var extra = {};
    if (beforeSeq !== undefined) extra.beforeSeq = beforeSeq;
    fetchPage(extra).then(function (page) {
      var older = (page && page.records) || [];
      state.hasMore = !!(page && page.hasMore);
      state.records = mergeRecords(state.records, older);
      renderMessages(false);
    }).catch(handleFailure).then(function () {
      state.busy = false;
      dom.older.textContent = t('older');
    });
  }

  function isNearBottom() {
    var el = dom.viewChat;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }

  function textOfBlocks(blocks) {
    if (!Array.isArray(blocks)) return '';
    var parts = [];
    blocks.forEach(function (block) {
      if (!block || typeof block !== 'object') return;
      if (block.type === 'text' && typeof block.text === 'string') parts.push(block.text);
      else if (block.type === 'image') parts.push(t('image'));
      else if (block.type === 'file') parts.push(t('file'));
    });
    return parts.join('\n').trim();
  }

  function toolArgPreview(raw) {
    if (typeof raw !== 'string' || raw === '') return '';
    var parsed = null;
    try { parsed = JSON.parse(raw); } catch (err) { parsed = null; }
    if (parsed && typeof parsed === 'object') {
      var keys = ['command', 'file_path', 'path', 'pattern', 'query', 'url', 'description', 'prompt', 'content'];
      for (var i = 0; i < keys.length; i += 1) {
        var value = parsed[keys[i]];
        if (typeof value === 'string' && value !== '') return clip(value);
      }
    }
    return clip(raw);
  }
  function clip(text) { return text.length > 80 ? text.slice(0, 80) + '…' : text; }

  function toolRow(name, preview, body, isError) {
    var box = document.createElement('div');
    box.className = 'tool';
    if (isError) box.setAttribute('data-error', '1');
    var head = document.createElement('div');
    head.className = 'tool__head';
    var tag = document.createElement('span');
    tag.className = 'tool__name';
    tag.textContent = name;
    head.appendChild(tag);
    if (preview) {
      var arg = document.createElement('span');
      arg.className = 'tool__arg';
      arg.textContent = preview;
      head.appendChild(arg);
    }
    box.appendChild(head);
    if (body) {
      var pre = document.createElement('pre');
      pre.className = 'tool__body';
      pre.textContent = body;
      box.appendChild(pre);
      box.addEventListener('click', function () {
        box.setAttribute('data-open', box.getAttribute('data-open') === '1' ? '0' : '1');
      });
    }
    return box;
  }

  function bubble(kind, text) {
    var wrap = document.createElement('div');
    wrap.className = 'msg msg--' + kind;
    var body = document.createElement('div');
    body.className = 'bubble';
    body.textContent = text === '' ? t('emptyText') : text;
    wrap.appendChild(body);
    return wrap;
  }

  function notice(text, isError) {
    var node = document.createElement('div');
    node.className = 'notice';
    if (isError) node.setAttribute('data-error', '1');
    node.textContent = text;
    return node;
  }

  function renderEvent(event) {
    if (!event || typeof event.type !== 'string') return null;
    var data = event.data || {};
    if (event.type === 'user/message') return bubble('user', textOfBlocks(data.content));
    if (event.type === 'assistant/message') {
      var message = data.message || {};
      var frag = document.createDocumentFragment();
      var text = textOfBlocks(message.content);
      if (text !== '') frag.appendChild(bubble('bot', text));
      if (Array.isArray(message.content)) {
        message.content.forEach(function (block) {
          if (!block || block.type !== 'tool-call') return;
          frag.appendChild(toolRow(block.name || t('tool'), toolArgPreview(block.arguments), block.arguments || '', false));
        });
      }
      return frag.childNodes.length === 0 ? null : frag;
    }
    if (event.type === 'tool/call') {
      return toolRow(data.name || t('tool'), toolArgPreview(data.arguments), data.arguments || '', false);
    }
    if (event.type === 'tool/result') {
      var resultText = textOfBlocks((data.message || {}).content);
      var failed = !!data.error;
      if (failed) {
        var reason = (data.error && (data.error.message || data.error.code)) || 'error';
        resultText = resultText ? resultText + '\n' + reason : reason;
      }
      var head = resultText ? resultText.split('\n')[0] : '';
      return toolRow(t('toolResult'), clip(head), resultText, failed);
    }
    if (event.type === 'turn/end') {
      var turn = data.reason || {};
      if (turn.kind === 'error') return notice(t('turnError') + ((turn.error && turn.error.message) || 'error'), true);
      if (turn.kind === 'interrupted' || turn.kind === 'aborted') return notice(t('interrupted'), false);
      return null;
    }
    if (event.type === 'session/title') {
      var next = data.title;
      if (typeof next === 'string' && next !== '' && state.sessionTitle !== next) {
        state.sessionTitle = next;
        dom.title.textContent = next;
      }
      return null;
    }
    return null;
  }

  function renderMessages(stickToBottom) {
    var frag = document.createDocumentFragment();
    state.records.forEach(function (record) {
      if (!record || record.type !== 'event') return;
      var node = renderEvent(record.event);
      if (node) frag.appendChild(node);
    });
    dom.messages.replaceChildren(frag);
    dom.older.hidden = !state.hasMore;
    dom.older.textContent = t('older');
    if (stickToBottom) dom.viewChat.scrollTop = dom.viewChat.scrollHeight;
  }

  function loadState() {
    if (!state.sessionId) return Promise.resolve();
    return rpc('session/state', { request: { sessionId: state.sessionId } }).then(function (value) {
      state.running = !!(value && value.running);
      updateStopButton();
    }).catch(function () { });
  }

  function updateStopButton() {
    dom.stop.hidden = !state.running;
    dom.send.hidden = state.running;
  }

  // ── 发消息 / 停止 ─────────────────────────────────────────────────────────
  function uuid() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.floor(Math.random() * 16);
      var v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
    });
  }

  function send() {
    var text = dom.input.value.trim();
    if (text === '' || !state.sessionId || state.busy) return;
    state.busy = true;
    dom.send.disabled = true;
    var zone = 'UTC';
    try { zone = Intl.DateTimeFormat().resolvedOptions().timeZone || zone; } catch (err) { zone = 'UTC'; }
    rpc('session/prompt', {
      request: {
        requestId: uuid(),
        sessionId: state.sessionId,
        mode: 'queue',
        content: [{ type: 'text', text: text }],
        clientTimeZone: zone
      }
    }).then(function () {
      dom.input.value = '';
      autoGrow();
      showToast(t('sent'));
      return loadLatestPage();
    }).catch(handleFailure).then(function () {
      state.busy = false;
      dom.send.disabled = false;
    });
  }

  function cancelRun() {
    if (!state.sessionId) return;
    rpc('session/cancel', { request: { sessionId: state.sessionId } }).then(function () {
      showToast(t('stopSent'));
      loadState();
    }).catch(handleFailure);
  }

  function autoGrow() {
    dom.input.style.height = 'auto';
    dom.input.style.height = Math.min(dom.input.scrollHeight, 132) + 'px';
  }

  // ── 审批：宿主的远程事件线（$events） ─────────────────────────────────────
  // 这是桌面界面用的同一条协议：WS 打开逻辑流 $events，收到 waterfall 帧就有
  // 待审批；回答是 POST /api/$events/result。多端可同时收到，先答先得，其余端
  // 会收到 cancel 帧。只有 owner peer（本机/经代理的手机都算）能开这条流。
  var socket = null;
  var socketRetry = 0;
  var socketTimer = 0;

  function connectEvents() {
    if (socket && (socket.readyState === 0 || socket.readyState === 1)) return;
    if (state.authFailed) return;
    var proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    var streamId = uuid();
    var ws = null;
    try { ws = new WebSocket(proto + '//' + location.host + '/api/remote.mux'); } catch (err) { scheduleConnect(); return; }
    socket = ws;
    ws.onopen = function () {
      socketRetry = 0;
      ws.send(JSON.stringify({ type: 'open', streamId: streamId, endpoint: '$events', payload: { args: {} } }));
    };
    ws.onmessage = function (message) {
      var frame = null;
      try { frame = JSON.parse(message.data); } catch (err) { return; }
      if (!frame || frame.streamId !== streamId) return;
      if (frame.type === 'item') handleEventsFrame(frame.value);
      else if (frame.type === 'error' || frame.type === 'end') dropSocket();
    };
    ws.onerror = function () { };
    ws.onclose = function () {
      if (socket === ws) socket = null;
      scheduleConnect();
    };
  }

  function dropSocket() {
    var ws = socket;
    socket = null;
    if (ws) { try { ws.close(); } catch (err) { /* 已经关闭 */ } }
    scheduleConnect();
  }

  function scheduleConnect() {
    if (socketTimer) window.clearTimeout(socketTimer);
    var delay = RECONNECT_MS[Math.min(socketRetry, RECONNECT_MS.length - 1)];
    socketRetry += 1;
    setLinkDown(true);
    socketTimer = window.setTimeout(function () {
      socketTimer = 0;
      connectEvents();
    }, delay);
  }

  function setLinkDown(down) {
    if (state.linkDown === down) return;
    state.linkDown = down;
    if (down) showBanner(t('offline'), { error: true });
    else {
      hideBanner();
      showToast(t('online'));
    }
  }

  function handleEventsFrame(frame) {
    if (!frame || typeof frame.type !== 'string') return;
    if (frame.type === 'ready') {
      state.clientId = frame.clientId;
      setLinkDown(false);
      return;
    }
    if (frame.type === 'waterfall' && frame.event === 'approval/request') {
      addApproval(frame);
      return;
    }
    if (frame.type === 'cancel') removeApproval(frame.eventId);
  }

  function addApproval(frame) {
    var request = frame.request || {};
    state.approvals[frame.eventId] = {
      toolName: request.toolName || t('tool'),
      reason: request.reason || ''
    };
    if (state.approvalOrder.indexOf(frame.eventId) === -1) state.approvalOrder.push(frame.eventId);
    renderApprovals();
  }

  function removeApproval(eventId) {
    if (!state.approvals[eventId]) return;
    delete state.approvals[eventId];
    state.approvalOrder = state.approvalOrder.filter(function (id) { return id !== eventId; });
    renderApprovals();
  }

  function answerApproval(eventId, outcome) {
    if (!state.clientId) { showToast(t('offline')); return; }
    rpc('$events/result', {
      clientId: state.clientId,
      eventId: eventId,
      outcome: { kind: 'result', value: outcome }
    }).then(function () {
      removeApproval(eventId);
    }).catch(handleFailure);
  }

  function renderApprovals() {
    var frag = document.createDocumentFragment();
    state.approvalOrder.forEach(function (eventId) {
      var item = state.approvals[eventId];
      if (!item) return;
      var card = document.createElement('div');
      card.className = 'approval';
      card.setAttribute('data-event-id', eventId);
      var head = document.createElement('div');
      head.className = 'approval__head';
      head.textContent = t('approvalNeed');
      var tool = document.createElement('div');
      tool.className = 'approval__tool';
      tool.textContent = item.toolName;
      card.appendChild(head);
      card.appendChild(tool);
      if (item.reason) {
        var reason = document.createElement('div');
        reason.className = 'approval__reason';
        reason.textContent = t('approvalReason') + '：' + item.reason;
        card.appendChild(reason);
      }
      var actions = document.createElement('div');
      actions.className = 'approval__actions';
      actions.appendChild(actionButton(t('allow'), 'btn--allow', function () { answerApproval(eventId, 'allowed-once'); }));
      actions.appendChild(actionButton(t('reject'), 'btn--reject', function () { answerApproval(eventId, 'rejected'); }));
      card.appendChild(actions);
      frag.appendChild(card);
    });
    dom.approvals.replaceChildren(frag);
  }

  function actionButton(label, kind, onClick) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn ' + kind;
    button.textContent = label;
    button.addEventListener('click', onClick);
    return button;
  }

  // ── 轮询与生命周期 ───────────────────────────────────────────────────────
  function tick() {
    if (document.hidden || state.authFailed) return;
    var now = Date.now();
    if (state.view === 'list') {
      if (now - state.lastListAt >= LIST_POLL_MS) loadSessions();
      return;
    }
    if (state.view === 'chat' && state.sessionId && now - state.lastChatAt >= CHAT_POLL_MS) {
      loadLatestPage();
      loadState();
    }
  }

  function onVisible() {
    if (document.hidden) return;
    connectEvents();
    if (state.view === 'chat') { loadLatestPage(); loadState(); }
    else loadSessions();
  }

  // iOS PWA 的键盘不改窗口尺寸：只有 visualViewport 会变，所以把可视高度写成 CSS
  // 变量给布局用，否则输入框会被键盘盖住一半。
  function syncViewport() {
    var vv = window.visualViewport;
    var height = vv ? vv.height : window.innerHeight;
    if (!height) return;
    document.documentElement.style.setProperty('--app-h', height + 'px');
  }

  function bindEvents() {
    dom.back.addEventListener('click', function () {
      if (history.state && history.state.lite === 'chat') history.back();
      else setView('list');
    });
    dom.refresh.addEventListener('click', function () {
      if (state.view === 'list') { loadSessions(); return; }
      loadLatestPage();
      loadState();
    });
    dom.older.addEventListener('click', loadOlderPage);
    dom.bannerRetry.addEventListener('click', function () { hideBanner(); onVisible(); });
    dom.composer.addEventListener('submit', function (event) { event.preventDefault(); send(); });
    dom.input.addEventListener('input', autoGrow);
    dom.input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
        event.preventDefault();
        send();
      }
    });
    dom.stop.addEventListener('click', cancelRun);
    dom.viewChat.addEventListener('scroll', function () {
      if (state.hasMore && dom.viewChat.scrollTop < 40 && !state.busy) loadOlderPage();
    });
    window.addEventListener('popstate', function (event) {
      if (event.state && event.state.lite === 'chat') return;
      setView('list');
      loadSessions();
    });
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('online', onVisible);
    window.addEventListener('offline', function () { setLinkDown(true); });
    window.addEventListener('resize', syncViewport);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', syncViewport);
      window.visualViewport.addEventListener('scroll', function () {
        if (state.view === 'chat' && isNearBottom()) dom.viewChat.scrollTop = dom.viewChat.scrollHeight;
      });
    }
  }

  function boot() {
    dom = {
      app: pick('app'),
      title: pick('title'),
      back: pick('backBtn'),
      refresh: pick('refreshBtn'),
      banner: pick('banner'),
      bannerText: pick('bannerText'),
      bannerLink: pick('bannerLink'),
      bannerRetry: pick('bannerRetry'),
      viewList: pick('viewList'),
      viewChat: pick('viewChat'),
      listHint: pick('listHint'),
      list: pick('sessionList'),
      listEmpty: pick('listEmpty'),
      messages: pick('messages'),
      older: pick('olderBtn'),
      composer: pick('composer'),
      input: pick('input'),
      send: pick('sendBtn'),
      stop: pick('stopBtn'),
      approvals: pick('approvals'),
      toast: pick('toast')
    };
    dom.input.placeholder = t('composer');
    dom.send.textContent = t('send');
    dom.stop.textContent = t('stop');
    dom.older.textContent = t('older');
    dom.bannerLink.textContent = t('reopen');
    dom.bannerRetry.textContent = t('retry');
    dom.listEmpty.textContent = t('listEmpty');
    dom.listHint.textContent = t('loading');
    syncViewport();
    bindEvents();
    setView('list');
    history.replaceState({ lite: 'list' }, '');
    loadSessions();
    connectEvents();
    window.setInterval(tick, 1000);
  }

  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
