// v4.0 双分块架构（client.js + client.mobile.js）、零私有 UI 包依赖、FilePreviewSheet 底栏抽屉交互
// 与 DSH 0.2.2+ 双代宿主兼容（auth:'required' / peer 第三参 / webserver/entry-url 启动令牌）测试套件
import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script, createContext } from 'node:vm';
import { build } from 'esbuild';

import { apply } from '../lib/index.js';
import { installPocketRpc } from '../lib/web-rpc.js';
import { mountSessionDeleteRoute } from '../lib/delete-session.mjs';
import { POCKET_ENDPOINTS, POCKET_RPC_CHANNEL } from '../client/api.js';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const clientDir = join(repoRoot, 'client');

function walkFiles(dir, exts) {
  const out = [];
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, ent.name);
    if (ent.isDirectory()) {
      out.push(...walkFiles(full, exts));
    } else if (exts.some((ext) => ent.name.endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

function rawHttp({ port, method = 'GET', path = '/', headers = {}, body = null }) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port, method, path, headers }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(chunks).toString('utf8'),
        });
      });
    });
    req.on('error', reject);
    if (body !== null) req.write(body);
    req.end();
  });
}

test('v4 双分块产物与零私有包纯度：client/ 全树零 @deepseek-ai/dsh-client-ui-primitives，meta.stylesheets 与 IIFE 隔离严格成立', () => {
  const mainPath = join(clientDir, 'client.js');
  const mobilePath = join(clientDir, 'client.mobile.js');
  const mainStat = statSync(mainPath);
  const mobileStat = statSync(mobilePath);

  assert.ok(mainStat.size > 10_000 && mainStat.size < 200_000, `client.js should stay lean (<200KB), got ${mainStat.size}B`);
  assert.ok(mobileStat.size > 50_000, `client.mobile.js must exist and carry mobile bundle, got ${mobileStat.size}B`);

  const allClientFiles = walkFiles(clientDir, ['.js', '.mjs', '.jsx', '.ts', '.tsx']);
  assert.ok(allClientFiles.length >= 25);
  for (const file of allClientFiles) {
    const raw = readFileSync(file, 'utf8');
    // 剥离块注释与整行注释后，断言源码与产物零引用 @deepseek-ai/dsh-client-ui-primitives
    const codeOnly = raw
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '');
    assert.equal(
      codeOnly.includes('@deepseek-ai/dsh-client-ui-primitives'),
      false,
      `Forbidden private package @deepseek-ai/dsh-client-ui-primitives found in ${file}`,
    );
  }
  assert.equal(readFileSync(mainPath, 'utf8').includes('@deepseek-ai/dsh-client-ui-primitives'), false);
  assert.equal(readFileSync(mobilePath, 'utf8').includes('@deepseek-ai/dsh-client-ui-primitives'), false);

  const mainCode = readFileSync(mainPath, 'utf8');
  let descriptor = null;
  const win = {
    __ModuleLoader__: {
      load(desc) { descriptor = desc; },
    },
  };
  new Function('window', mainCode)(win);

  assert.equal('__dshpSettingsCss' in win, false, '__dshpSettingsCss must stay isolated inside IIFE');
  assert.ok(descriptor && descriptor.id === 'dsh-pocket');
  assert.equal(typeof descriptor.meta, 'function');
  const cssText = descriptor.meta()?.stylesheets?.['client/settings/styles.css']?.text?.();
  assert.equal(typeof cssText, 'string');
  assert.ok(cssText.includes('.dshp-page'), 'meta.stylesheets must expose Settings CSS');
  assert.equal(cssText.includes('/*'), false, 'meta.stylesheets CSS must have comments stripped');

  const exportsObj = descriptor.factory((id) => {
    if (id === 'react') return { createElement: () => null, Fragment: 'Fragment' };
    throw new Error(`Unexpected require: ${id}`);
  });
  assert.deepEqual(
    Object.keys(exportsObj).sort(),
    ['apply', 'inject', 'name', 'redactStatus'],
    'module.exports must contain strictly business exports',
  );
});

test('v4 双分块按需加载与 <0.2.2 端到端 HTTP 兜底：桌面零加载、窄屏热切、0.2.2+ require.async、旧版 GET/HEAD /dsh-pocket/client.mobile.js', async (t) => {
  const mainCode = readFileSync(join(clientDir, 'client.js'), 'utf8');
  const mobileCode = readFileSync(join(clientDir, 'client.mobile.js'), 'utf8');

  // 挂载真实 installPocketRpc HTTP 路由验证 GET/HEAD /dsh-pocket/client.mobile.js 端到端分发
  let registeredRoute = null;
  const disposeRpc = installPocketRpc(
    {
      webServer: {
        register(r) {
          registeredRoute = r;
          return () => { registeredRoute = null; };
        },
      },
    },
    {
      service: { status: async () => ({ proxyRunning: true, dshPort: 3080 }) },
      log: { error() {}, warn() {}, info() {} },
    },
  );
  t.after(() => disposeRpc?.());
  assert.ok(registeredRoute);

  const server = http.createServer((req, res) => registeredRoute.handler(req, res, { peer: 'ok' }));
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const rpcPort = server.address().port;
  t.after(() => new Promise((r) => server.close(r)));

  const headChunk = await rawHttp({
    port: rpcPort,
    method: 'HEAD',
    path: `${POCKET_RPC_CHANNEL}/client.mobile.js`,
  });
  assert.equal(headChunk.status, 200);
  assert.match(String(headChunk.headers['content-type']), /application\/javascript/);
  assert.equal(headChunk.headers['cache-control'], 'no-cache');
  assert.equal(headChunk.body, '');

  const getChunk = await rawHttp({
    port: rpcPort,
    method: 'GET',
    path: `${POCKET_RPC_CHANNEL}/client.mobile.js`,
  });
  assert.equal(getChunk.status, 200);
  assert.equal(getChunk.body, mobileCode);

  const ReactStub = {
    createElement: (...a) => ({ a }),
    Fragment: 'Fragment',
    useState: (v) => [typeof v === 'function' ? v() : v, () => {}],
    useEffect: () => {},
    useRef: (v) => ({ current: v }),
    useMemo: (f) => f(),
    useCallback: (f) => f,
  };

  async function runClientMode({ width, coarse, withRequireAsync }) {
    const makeEl = (tag = 'div') => ({
      tagName: tag.toUpperCase(),
      id: '',
      textContent: '',
      innerHTML: '',
      setAttribute() {},
      removeAttribute() {},
      getAttribute: () => null,
      hasAttribute: () => false,
      appendChild() {},
      append() {},
      remove() {},
      insertBefore() {},
      addEventListener() {},
      removeEventListener() {},
      click() {},
      focus() {},
      blur() {},
      getClientRects: () => [{ width: 100, height: 32 }],
      getBoundingClientRect: () => ({ top: 0, bottom: 32, left: 0, right: 100, width: 100, height: 32 }),
      style: { setProperty() {}, removeProperty() {}, getPropertyValue: () => '', cssText: '' },
      dataset: {},
      classList: { add() {}, remove() {} },
      isConnected: true,
      contains: () => false,
      querySelector: () => null,
      querySelectorAll: () => [],
      parentElement: null,
      childElementCount: 0,
      children: [],
      firstElementChild: null,
      closest: () => null,
      matches: () => false,
    });

    const frame = makeEl('div');
    let asyncLoads = 0;
    let httpFallbackLoads = 0;
    const inflightFetches = [];
    let mainDesc = null;
    const chunkDescs = new Map();
    let resizeFn = null;
    let vmCtx = null;

    const headEl = makeEl('head');
    headEl.appendChild = (elNode) => {
      if (elNode?.tagName === 'SCRIPT' && elNode.textContent && vmCtx) {
        new Script(elNode.textContent).runInContext(vmCtx);
      }
      return elNode;
    };

    const win = {
      location: { href: `http://127.0.0.1:${rpcPort}/`, search: '' },
      innerWidth: width,
      innerHeight: 844,
      scrollY: 0,
      scrollX: 0,
      scrollTo() {},
      scrollBy() {},
      matchMedia: (query) => {
        const q = String(query);
        let matches = false;
        if (q === '(max-width: 1023px) and (pointer: coarse)') matches = width <= 1023 && coarse;
        else if (q === '(min-width: 1024px) and (pointer: coarse)') matches = width >= 1024 && coarse;
        else if (q === '(max-width: 1023px)') matches = width <= 1023;
        else if (q === '(min-width: 1024px)') matches = width >= 1024;
        else if (q === '(pointer: coarse)') matches = coarse;
        return { matches, addEventListener() {}, removeEventListener() {} };
      },
      addEventListener(ev, fn) { if (ev === 'resize') resizeFn = fn; },
      removeEventListener(ev, fn) { if (ev === 'resize' && resizeFn === fn) resizeFn = null; },
      setTimeout: () => 0,
      clearTimeout() {},
      setInterval: () => 0,
      clearInterval() {},
      requestAnimationFrame: () => 1,
      cancelAnimationFrame() {},
      dispatchEvent() {},
      CustomEvent: class { constructor(n, o) { this.type = n; this.detail = o?.detail; } },
      visualViewport: null,
      navigator: globalThis.navigator,
      URLSearchParams,
      getSelection: () => ({ rangeCount: 0, isCollapsed: true, removeAllRanges() {}, addRange() {} }),
      __ModuleLoader__: {
        load(d) {
          if (d.chunk) chunkDescs.set(d.chunk, d);
          else mainDesc = d;
        },
      },
    };

    const doc = {
      visibilityState: 'visible',
      activeElement: null,
      querySelector: (s) => (s === '[data-mobile-nav="frame"]' ? frame : null),
      querySelectorAll: () => [],
      getElementById: () => null,
      createElement: (tag) => makeEl(tag),
      documentElement: makeEl('html'),
      body: makeEl('body'),
      head: headEl,
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() {},
    };

    const vmGlobals = {
      window: win,
      document: doc,
      location: win.location,
      innerWidth: width,
      innerHeight: 844,
      devicePixelRatio: 2,
      navigator: globalThis.navigator,
      console,
      URL,
      URLSearchParams,
      Node: { TEXT_NODE: 3 },
      MutationObserver: class { observe() {} disconnect() {} },
      ResizeObserver: class { observe() {} disconnect() {} },
      getComputedStyle: () => ({ getPropertyValue: () => '', visibility: 'visible', paddingTop: '0px' }),
      getSelection: win.getSelection,
      Selection: class {},
      Range: class {},
      Element: class {},
      HTMLElement: class {},
      HTMLInputElement: class {},
      HTMLTextAreaElement: class {},
      KeyboardEvent: class { constructor(tp) { Object.assign(this, tp); } },
      PointerEvent: class {},
      Event: class { constructor(tp) { this.type = tp; } },
      EventTarget: class {},
      CustomEvent: win.CustomEvent,
      requestAnimationFrame: () => 1,
      cancelAnimationFrame() {},
      setTimeout: () => 0,
      clearTimeout() {},
      setInterval: () => 0,
      clearInterval() {},
      fetch: (url) => {
        const p = (async () => {
          if (url === `${POCKET_RPC_CHANNEL}/client.mobile.js`) {
            httpFallbackLoads += 1;
            const resp = await rawHttp({ port: rpcPort, method: 'GET', path: url });
            return {
              ok: resp.status === 200,
              status: resp.status,
              text: async () => resp.body,
            };
          }
          return { ok: true, status: 204, text: async () => '' };
        })();
        inflightFetches.push(p);
        return p;
      },
    };
    vmGlobals.globalThis = vmGlobals;
    vmCtx = createContext(vmGlobals);
    new Script(mainCode).runInContext(vmCtx);

    const hostReq = (id) => {
      if (id === 'react') return ReactStub;
      throw new Error(`Unexpected sync require: ${id}`);
    };
    if (withRequireAsync) {
      hostReq.async = async (id) => {
        assert.equal(id, './client.mobile.js');
        asyncLoads += 1;
        new Script(mobileCode).runInContext(vmCtx);
        return chunkDescs.get('client.mobile.js').factory(hostReq);
      };
    }

    const pluginExports = mainDesc.factory(hostReq);
    const effects = [];
    const disposers = [];
    const ctx = {
      locale: { register: () => () => {}, bind: () => (k) => k },
      inject: (_deps, cb) => { cb(ctx); return () => {}; },
      effect: (fn, label) => {
        effects.push(label ?? 'anon');
        const off = fn();
        if (typeof off === 'function') disposers.push(off);
        return off;
      },
      slots: { inject: () => () => {}, register: () => () => {} },
      layout: { toggleSidebar() {} },
      connection: { rpc: { call: async () => ({ ok: true, value: {} }) } },
      get: () => undefined,
      sessions: { list: { getSnapshot: () => ({ current: 's1', byId: {} }), subscribe: () => () => {} }, selected: null },
      sessionLogDownload: { download() {} },
    };

    pluginExports.apply(ctx);
    await Promise.allSettled(inflightFetches);
    for (let i = 0; i < 10; i += 1) await new Promise((r) => setImmediate(r));
    assert.equal('__dshpChunkLoader' in win, false, '__dshpChunkLoader must never remain on window');

    return {
      get asyncLoads() { return asyncLoads; },
      get httpFallbackLoads() { return httpFallbackLoads; },
      effects,
      resizeToMobile: async () => {
        width = 390;
        win.innerWidth = 390;
        vmGlobals.innerWidth = 390;
        resizeFn?.();
        for (let i = 0; i < 6; i += 1) await new Promise((r) => setImmediate(r));
      },
      dispose: () => { while (disposers.length > 0) disposers.pop()?.(); },
    };
  }

  // 1) 桌面精细指针：零分块加载
  const desktop = await runClientMode({ width: 1440, coarse: false, withRequireAsync: true });
  assert.equal(desktop.asyncLoads, 0);
  assert.equal(desktop.httpFallbackLoads, 0);

  // 2) 桌面窗口缩窄至 < 1024px：按需动态加载 1 次
  await desktop.resizeToMobile();
  assert.equal(desktop.asyncLoads, 1);
  desktop.dispose();

  // 3) DSH 0.2.2+ 手机访问：走 require.async('./client.mobile.js')，零 HTTP 兜底请求
  const mobile022 = await runClientMode({ width: 390, coarse: true, withRequireAsync: true });
  assert.equal(mobile022.asyncLoads, 1);
  assert.equal(mobile022.httpFallbackLoads, 0);
  assert.ok(mobile022.effects.length >= 40);
  mobile022.dispose();

  // 4) DSH 0.2.0–0.2.1 手机访问（无 require.async）：真实拉取 GET /dsh-pocket/client.mobile.js 激活全部移动效果
  const mobileLegacy = await runClientMode({ width: 390, coarse: true, withRequireAsync: false });
  assert.equal(mobileLegacy.asyncLoads, 0);
  assert.equal(mobileLegacy.httpFallbackLoads, 1);
  assert.ok(mobileLegacy.effects.length >= 40);
  mobileLegacy.dispose();
});

test('v4 FilePreviewSheet（startFileGuard）DOM 交互：点击路径拉起底栏抽屉、加载骨架→行号代码/复制全文/44x44关闭、panel-stack Escape 关闭及关闭开关降级', async () => {
  const bundled = await build({
    entryPoints: [join(clientDir, 'mobile/pocket/file-preview-sheet.ts')],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'browser',
    target: ['chrome105'],
  });

  // 轻量自包含 DOM 树（支持捕获/冒泡事件传播、属性选择器、MutationObserver 与剪贴板）
  class MiniEvent {
    constructor(type, init = {}) {
      this.type = type;
      this.bubbles = Boolean(init.bubbles);
      this.cancelable = init.cancelable !== false;
      this.detail = init.detail;
      this.key = init.key ?? '';
      this.shiftKey = Boolean(init.shiftKey);
      this.defaultPrevented = false;
      this._stopped = false;
      this._stoppedImmediate = false;
      this.target = null;
      this.currentTarget = null;
    }
    preventDefault() { if (this.cancelable) this.defaultPrevented = true; }
    stopPropagation() { this._stopped = true; }
    stopImmediatePropagation() { this._stopped = true; this._stoppedImmediate = true; }
  }

  function matchSingleCompound(el, rawCompound, scopeEl) {
    let s = rawCompound.trim();
    if (!s) return false;
    if (s === ':scope') return el === scopeEl;
    // 提取 :not(...)
    const nots = [];
    s = s.replace(/:not\(([^)]+)\)/g, (_m, inner) => {
      nots.push(inner.trim());
      return '';
    });
    for (const n of nots) {
      if (matchSingleCompound(el, n, scopeEl)) return false;
    }
    // 提取 [attr="val"] 或 [attr]
    const attrs = [];
    s = s.replace(/\[([A-Za-z0-9_-]+)(?:=["']?([^"'\]]*)["']?)?\]/g, (_m, k, v) => {
      attrs.push({ k, v });
      return '';
    });
    for (const { k, v } of attrs) {
      if (!el.hasAttribute(k)) return false;
      if (v !== undefined && el.getAttribute(k) !== v) return false;
    }
    const tag = s.trim();
    if (tag && tag !== '*' && el.tagName.toLowerCase() !== tag.toLowerCase()) return false;
    return true;
  }

  function matchSelector(el, selectorList, scopeEl = null) {
    const parts = String(selectorList).split(',');
    for (const raw of parts) {
      const trimmed = raw.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith(':scope >')) {
        const rest = trimmed.slice(':scope >'.length).trim();
        if (el.parentElement === scopeEl && matchSingleCompound(el, rest, scopeEl)) return true;
        continue;
      }
      if (matchSingleCompound(el, trimmed, scopeEl)) return true;
    }
    return false;
  }

  class MiniElement {
    constructor(tagName, ownerDoc) {
      this.nodeType = 1;
      this.tagName = String(tagName).toUpperCase();
      this.ownerDocument = ownerDoc;
      this.parentElement = null;
      this.children = [];
      this.attrs = new Map();
      this.listeners = [];
      this._text = '';
      this.innerHTML = '';
      this.disabled = false;
      this.hidden = false;
      this.type = '';
      this.style = {
        cssText: '',
        display: '',
        width: '',
        opacity: '',
        setProperty(k, v) { this[k] = v; },
        removeProperty(k) { delete this[k]; },
      };
    }
    get isConnected() {
      let cur = this;
      while (cur) {
        if (cur === this.ownerDocument.documentElement) return true;
        cur = cur.parentElement;
      }
      return false;
    }
    get childElementCount() { return this.children.length; }
    get nextSibling() {
      if (!this.parentElement) return null;
      const idx = this.parentElement.children.indexOf(this);
      return idx >= 0 ? (this.parentElement.children[idx + 1] ?? null) : null;
    }
    get previousElementSibling() {
      if (!this.parentElement) return null;
      const idx = this.parentElement.children.indexOf(this);
      return idx > 0 ? this.parentElement.children[idx - 1] : null;
    }
    get textContent() {
      if (this.children.length === 0) return this._text;
      return this._text + this.children.map((c) => c.textContent).join('');
    }
    set textContent(val) {
      this._text = String(val ?? '');
      for (const c of this.children) c.parentElement = null;
      this.children = [];
    }
    setAttribute(k, v) { this.attrs.set(k, String(v)); }
    getAttribute(k) { return this.attrs.has(k) ? this.attrs.get(k) : null; }
    hasAttribute(k) { return this.attrs.has(k); }
    removeAttribute(k) { this.attrs.delete(k); }
    appendChild(child) {
      if (child.parentElement) child.remove();
      child.parentElement = this;
      this.children.push(child);
      return child;
    }
    append(...nodes) {
      for (const n of nodes) {
        if (n instanceof MiniElement) this.appendChild(n);
      }
    }
    insertBefore(node, refNode) {
      if (node.parentElement) node.remove();
      node.parentElement = this;
      if (!refNode) {
        this.children.push(node);
        return node;
      }
      const idx = this.children.indexOf(refNode);
      if (idx < 0) this.children.push(node);
      else this.children.splice(idx, 0, node);
      return node;
    }
    remove() {
      if (!this.parentElement) return;
      const idx = this.parentElement.children.indexOf(this);
      if (idx >= 0) this.parentElement.children.splice(idx, 1);
      this.parentElement = null;
    }
    matches(sel) { return matchSelector(this, sel, this); }
    closest(sel) {
      let cur = this;
      while (cur) {
        if (matchSelector(cur, sel, this)) return cur;
        cur = cur.parentElement;
      }
      return null;
    }
    contains(other) {
      let cur = other;
      while (cur) {
        if (cur === this) return true;
        cur = cur.parentElement;
      }
      return false;
    }
    querySelectorAll(sel) {
      const out = [];
      const walk = (node) => {
        for (const ch of node.children) {
          if (matchSelector(ch, sel, this)) out.push(ch);
          walk(ch);
        }
      };
      walk(this);
      return out;
    }
    querySelector(sel) { return this.querySelectorAll(sel)[0] ?? null; }
    focus() { this.ownerDocument.activeElement = this; }
    blur() { if (this.ownerDocument.activeElement === this) this.ownerDocument.activeElement = null; }
    addEventListener(type, fn, opts) {
      const capture = typeof opts === 'boolean' ? opts : Boolean(opts?.capture);
      this.listeners.push({ type, fn, capture });
    }
    removeEventListener(type, fn, opts) {
      const capture = typeof opts === 'boolean' ? opts : Boolean(opts?.capture);
      this.listeners = this.listeners.filter((l) => !(l.type === type && l.fn === fn && l.capture === capture));
    }
    dispatchEvent(ev) {
      ev.target = this;
      const chain = [];
      let p = this.parentElement;
      while (p) { chain.push(p); p = p.parentElement; }
      chain.push(this.ownerDocument);
      const topDown = [...chain].reverse();

      for (const ancestor of topDown) {
        ev.currentTarget = ancestor;
        for (const l of [...ancestor.listeners]) {
          if (l.capture && l.type === ev.type) {
            l.fn(ev);
            if (ev._stoppedImmediate) break;
          }
        }
        if (ev._stopped) return !ev.defaultPrevented;
      }

      ev.currentTarget = this;
      for (const l of [...this.listeners]) {
        if (l.type === ev.type) {
          l.fn(ev);
          if (ev._stoppedImmediate) break;
        }
      }
      if (ev._stopped || !ev.bubbles) return !ev.defaultPrevented;

      for (const ancestor of chain) {
        ev.currentTarget = ancestor;
        for (const l of [...ancestor.listeners]) {
          if (!l.capture && l.type === ev.type) {
            l.fn(ev);
            if (ev._stoppedImmediate) break;
          }
        }
        if (ev._stopped) break;
      }
      return !ev.defaultPrevented;
    }
  }

  const doc = {
    listeners: [],
    activeElement: null,
    documentElement: null,
    head: null,
    body: null,
    createElement(tag) { return new MiniElement(tag, doc); },
    querySelectorAll(sel) { return doc.documentElement.querySelectorAll(sel); },
    querySelector(sel) { return doc.documentElement.querySelector(sel); },
    addEventListener(type, fn, opts) {
      const capture = typeof opts === 'boolean' ? opts : Boolean(opts?.capture);
      doc.listeners.push({ type, fn, capture });
    },
    removeEventListener(type, fn, opts) {
      const capture = typeof opts === 'boolean' ? opts : Boolean(opts?.capture);
      doc.listeners = doc.listeners.filter((l) => !(l.type === type && l.fn === fn && l.capture === capture));
    },
    dispatchEvent(ev) {
      ev.target = doc;
      ev.currentTarget = doc;
      for (const l of [...doc.listeners]) {
        if (l.type === ev.type) {
          l.fn(ev);
          if (ev._stoppedImmediate) break;
        }
      }
      return !ev.defaultPrevented;
    },
  };
  doc.documentElement = new MiniElement('html', doc);
  doc.documentElement.setAttribute('lang', 'zh-CN');
  doc.head = doc.documentElement.appendChild(new MiniElement('head', doc));
  doc.body = doc.documentElement.appendChild(new MiniElement('body', doc));

  let clipboardWrites = [];
  const winListeners = [];
  const win = {
    setTimeout: (fn) => { void Promise.resolve().then(fn); return 1; },
    clearTimeout() {},
    addEventListener(type, fn) { winListeners.push({ type, fn }); },
    removeEventListener(type, fn) {
      const idx = winListeners.findIndex((x) => x.type === type && x.fn === fn);
      if (idx >= 0) winListeners.splice(idx, 1);
    },
    dispatchEvent(ev) {
      for (const l of [...winListeners]) {
        if (l.type === ev.type) l.fn(ev);
      }
    },
  };
  const nav = {
    language: 'zh-CN',
    clipboard: {
      writeText: async (txt) => { clipboardWrites.push(txt); },
    },
  };

  const mod = { exports: {} };
  const vmGlobals = {
    module: mod,
    exports: mod.exports,
    window: win,
    document: doc,
    navigator: nav,
    history: { pushState() {}, back() {} },
    Element: MiniElement,
    HTMLElement: MiniElement,
    Event: MiniEvent,
    CustomEvent: MiniEvent,
    KeyboardEvent: MiniEvent,
    MutationObserver: class { observe() {} disconnect() {} },
    requestAnimationFrame: (cb) => { cb(); return 1; },
    cancelAnimationFrame() {},
    console,
  };
  vmGlobals.globalThis = vmGlobals;
  new Script(bundled.outputFiles[0].text).runInContext(createContext(vmGlobals));

  const { startFileGuard } = mod.exports;

  // 在聊天消息流容器 [data-phase] 内放一个文件链接按钮
  const phaseBox = doc.body.appendChild(doc.createElement('div'));
  phaseBox.setAttribute('data-phase', 'done');
  const fileBtn = phaseBox.appendChild(doc.createElement('button'));
  fileBtn.textContent = 'src/core/engine.ts';

  let resolveRead = null;
  const readFile = (filePath) =>
    new Promise((resolve) => {
      resolveRead = (val) => resolve({
        ok: true,
        value: { path: `/workspace/${filePath}`, content: val, size: Buffer.byteLength(val) },
      });
    });

  const stopGuard = startFileGuard(readFile, (k) => k);

  // 默认预览模式开启：不污染正文注入 [复制] 按钮
  assert.equal(doc.querySelector('[data-mobile-nav="copy-file"]'), null);

  // 1) 点击聊天内路径按钮：拦截默认动作并立即拉起 FilePreviewSheet + 加载骨架
  const clickEv = new MiniEvent('click', { bubbles: true, cancelable: true });
  fileBtn.dispatchEvent(clickEv);
  assert.equal(clickEv.defaultPrevented, true);

  const sheet = doc.querySelector('[data-mobile-nav="file-preview-sheet"]');
  assert.ok(sheet, 'FilePreviewSheet must mount on path click');
  assert.equal(sheet.getAttribute('data-mobile-nav-panel'), 'file-preview', 'Must register in panel-stack');
  assert.equal(sheet.getAttribute('role'), 'dialog');
  assert.ok(doc.querySelector('[data-mobile-nav="file-preview-loading"]'), 'Loading skeleton must show while RPC inflight');

  const closeBtn = doc.querySelector('[data-mobile-nav="file-preview-close"]');
  assert.ok(closeBtn);
  assert.match(closeBtn.style.cssText, /width:44px;height:44px/, 'Close button must have >=44x44 touch target');

  // 2) RPC 返回后渲染行号、代码、字节角标并解锁「复制全文」
  await Promise.resolve();
  assert.equal(typeof resolveRead, 'function');
  resolveRead('const a = 1;\nconst b = 2;\nexport { a, b };');
  for (let i = 0; i < 5; i += 1) await new Promise((r) => setImmediate(r));

  assert.equal(doc.querySelector('[data-mobile-nav="file-preview-loading"]'), null);
  assert.equal(doc.querySelector('[data-mobile-nav="file-preview-gutter"]')?.textContent, '1\n2\n3');
  assert.equal(
    doc.querySelector('[data-mobile-nav="file-preview-code"]')?.textContent,
    'const a = 1;\nconst b = 2;\nexport { a, b };',
  );
  assert.equal(doc.querySelector('[data-mobile-nav="file-preview-size"]')?.textContent, '42 B');

  const copyBtn = doc.querySelector('[data-mobile-nav="file-preview-copy"]');
  assert.equal(copyBtn.disabled, false);
  copyBtn.dispatchEvent(new MiniEvent('click', { bubbles: true }));
  for (let i = 0; i < 4; i += 1) await new Promise((r) => setImmediate(r));
  assert.deepEqual(clipboardWrites, ['const a = 1;\nconst b = 2;\nexport { a, b };']);

  // 3) 按 Escape 通过 panel-stack（dismissTopPanel -> dsh-mobile-panel-dismiss）关闭预览抽屉
  const escEv = new MiniEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
  doc.dispatchEvent(escEv);
  assert.equal(escEv.defaultPrevented, true);
  assert.equal(doc.querySelector('[data-mobile-nav="file-preview-sheet"]'), null, 'Escape must dismiss FilePreviewSheet');
  assert.equal(doc.querySelector('[data-mobile-nav="file-preview-backdrop"]'), null);

  // 4) 切换 data-dsh-pocket-file-preview="off"：回退为内联复制按钮 + 轻提示 Toast，不再开抽屉
  doc.body.setAttribute('data-dsh-pocket-file-preview', 'off');
  win.dispatchEvent(new MiniEvent('dsh-pocket:mobile-file-preview'));
  assert.ok(doc.querySelector('[data-mobile-nav="copy-file"]'), 'Disabling preview injects fallback copy button');

  fileBtn.dispatchEvent(new MiniEvent('click', { bubbles: true, cancelable: true }));
  assert.equal(doc.querySelector('[data-mobile-nav="file-preview-sheet"]'), null, 'Sheet must stay closed when preview=off');
  const toast = doc.querySelector('[data-mobile-nav="file-guard-toast"]');
  assert.ok(toast && toast.textContent.includes('无法直接打开'), 'Fallback toast must display when preview=off');

  stopGuard();
});

test('v4 DSH 0.2.2+ 宿主兼容：webServer.register 声明 auth:"required"、支持第 3 参 peer 直放且保留 0.2.0–0.2.1 鉴权栅栏', async (t) => {
  const tmpDir = mkdtempSync(join(tmpdir(), 'dsh-v4-022-del-'));
  t.after(() => { try { rmSync(tmpDir, { recursive: true, force: true }); } catch { /* ignore */ } });

  // 构造一个真实持久化会话目录供 /api/mobile-nav.session.delete 移入回收站
  const sessId = 'sess-022-peer';
  const sessDir = join(tmpDir, '_no-cwd', sessId);
  mkdirSync(sessDir, { recursive: true });
  writeFileSync(join(sessDir, 'session.jsonl'), '{"id":"sess-022-peer"}\n', 'utf8');

  const routes = new Map();
  let rejectionCalls = 0;
  const ctx = {
    webServer: {
      register(route) {
        routes.set(route.path, route);
        return () => routes.delete(route.path);
      },
    },
    connection: {
      requestRejection() {
        rejectionCalls += 1;
        return 401;
      },
    },
    get(serviceName) {
      if (serviceName === 'sessionPersistence') {
        return {
          config: { root: tmpDir },
          list: async () => [{ header: { id: sessId } }],
        };
      }
      return undefined;
    },
  };

  const offRpc = installPocketRpc(ctx, {
    service: { status: async () => ({ proxyRunning: true, proxyPort: 3081, dshPort: 3080 }) },
    log: { error() {}, warn() {}, info() {} },
  });
  const offDel = mountSessionDeleteRoute(ctx, { warn() {} });
  t.after(() => { offRpc?.(); offDel?.(); });

  const rpcRoute = routes.get(POCKET_RPC_CHANNEL);
  const delRoute = routes.get('/api/mobile-nav.session.delete');
  assert.equal(rpcRoute?.auth, 'required', '/dsh-pocket route must declare auth: "required" for DSH 0.2.2+');
  assert.equal(delRoute?.auth, 'required', 'session.delete route must declare auth: "required" for DSH 0.2.2+');

  // 起两个入口测试同一套路由：portLegacy 不传 peer（模拟 0.2.0–0.2.1），port022 传入第 3 参 peer（模拟 0.2.2+）
  const dispatch = (injectPeer) =>
    http.createServer((req, res) => {
      const peer = injectPeer ? { kind: 'dsh-022-peer', authenticated: true } : undefined;
      if (req.url?.startsWith(POCKET_RPC_CHANNEL)) return rpcRoute.handler(req, res, peer);
      if (req.url === '/api/mobile-nav.session.delete') return delRoute.handler(req, res, peer);
      res.writeHead(404).end();
    });

  const srvLegacy = dispatch(false);
  const srv022 = dispatch(true);
  await Promise.all([
    new Promise((r) => srvLegacy.listen(0, '127.0.0.1', r)),
    new Promise((r) => srv022.listen(0, '127.0.0.1', r)),
  ]);
  t.after(async () => {
    await new Promise((r) => srvLegacy.close(r));
    await new Promise((r) => srv022.close(r));
  });

  // 1) DSH 0.2.0–0.2.1（peer === undefined）：严格走 connection.requestRejection -> 401
  const legacyRpc = await rawHttp({
    port: srvLegacy.address().port,
    method: 'POST',
    path: `${POCKET_RPC_CHANNEL}/${POCKET_ENDPOINTS.status}`,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ rpcId: '1', method: POCKET_ENDPOINTS.status, payload: {} }),
  });
  assert.equal(legacyRpc.status, 401);

  const legacyDel = await rawHttp({
    port: srvLegacy.address().port,
    method: 'POST',
    path: '/api/mobile-nav.session.delete',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ sessionId: sessId }),
  });
  assert.equal(legacyDel.status, 401);
  assert.equal(rejectionCalls, 2);

  // 2) DSH 0.2.2+（webServer 鉴权通过并注入 peer）：即便无 connection.requestRejection 通过或非 loopback Host 也正常放行
  const peerRpc = await rawHttp({
    port: srv022.address().port,
    method: 'POST',
    path: `${POCKET_RPC_CHANNEL}/${POCKET_ENDPOINTS.status}`,
    headers: { host: 'devbox.lan:3080', 'content-type': 'application/json' },
    body: JSON.stringify({ rpcId: '2', method: POCKET_ENDPOINTS.status, payload: {} }),
  });
  assert.equal(peerRpc.status, 200);
  assert.equal(JSON.parse(peerRpc.body).result.ok, true);

  const peerDel = await rawHttp({
    port: srv022.address().port,
    method: 'POST',
    path: '/api/mobile-nav.session.delete',
    headers: { host: 'devbox.lan:3080', 'content-type': 'application/json' },
    body: JSON.stringify({ sessionId: sessId }),
  });
  assert.equal(peerDel.status, 200);
  assert.deepEqual(JSON.parse(peerDel.body), { ok: true, deleted: sessId });
  assert.equal(rejectionCalls, 2, 'DSH 0.2.2+ peer path must not re-run legacy requestRejection');
});

test('v4 DSH 0.2.2+ 启动令牌桥接：同时支持 webserver/entry-url 被动事件监听与首次请求主动 ctx.emit 探测', async (t) => {
  const home = mkdtempSync(join(tmpdir(), 'dsh-v4-entryurl-'));
  const prevHome = process.env.DSH_HOME;
  process.env.DSH_HOME = home;
  t.after(() => {
    if (prevHome === undefined) delete process.env.DSH_HOME;
    else process.env.DSH_HOME = prevHome;
    try { rmSync(home, { recursive: true, force: true }); } catch { /* ignore */ }
  });

  // 模式 A：宿主启动期广播 webserver/entry-url(baseUrl, entries) 被动捕获
  {
    let entryListener = null;
    let listenerOpts = null;
    let capturedLaunchTokenFn = null;
    const effectCleanups = [];

    const fakeServiceFactory = (opts) => {
      capturedLaunchTokenFn = opts.launchToken;
      return {
        dshPort: opts.dshPort,
        startProxy: async () => ({ port: 3081, close: async () => {} }),
        restoreTunnelIfNeeded: async () => {},
        stopTunnel() {},
        status: async () => ({ proxyRunning: true, dshPort: opts.dshPort }),
        dispose: async () => {},
      };
    };

    const ctxPassive = {
      webServer: { port: 3080, register: () => () => {} },
      connection: {}, // DSH 0.2.2+ 已无 authenticatedUrl
      on(ev, fn, opts) {
        if (ev === 'webserver/entry-url') {
          entryListener = fn;
          listenerOpts = opts;
        }
        return () => { entryListener = null; };
      },
      effect(fn) {
        const cleanup = fn();
        if (typeof cleanup === 'function') effectCleanups.push(cleanup);
      },
      logger: () => ({ info() {}, warn() {}, error() {} }),
    };

    // 通过 internals.service 截获 apply() 构造给 createPocketService 的 launchToken 闭包：
    // 注意 internals.service 若直接传入会跳过 createPocketService 参数构造，因此我们用一个真实无副作用的代理桩：
    let proxyLaunchToken = null;
    apply(ctxPassive, {}, {
      home,
      isDesktop: false,
      createProxy: async (opts) => {
        proxyLaunchToken = opts.launchToken;
        return { port: 3081, close: async () => {} };
      },
      lanIPv4: async () => '192.168.1.2',
      lanCandidates: async () => ['192.168.1.2'],
      encodeQr: async () => 'data:image/png;base64,qr',
    });

    await new Promise((r) => setTimeout(r, 20));
    assert.deepEqual(listenerOpts, { global: true }, 'Must subscribe to webserver/entry-url with { global: true }');
    assert.equal(typeof entryListener, 'function');
    assert.equal(typeof proxyLaunchToken, 'function');
    assert.equal(proxyLaunchToken(), '');

    // 宿主广播 webserver/entry-url
    entryListener('http://127.0.0.1:3080', ['http://127.0.0.1:3080/?token=passive-022-launch-tok']);
    assert.equal(proxyLaunchToken(), 'passive-022-launch-tok');

    for (const fn of effectCleanups) await fn();
    void fakeServiceFactory;
    void capturedLaunchTokenFn;
  }

  // 模式 B：插件晚于 webServer 挂载（未收到被动广播），首次调用 launchToken() 时主动同步 ctx.emit 探测并缓存
  {
    let emitCount = 0;
    let proxyLaunchToken = null;
    const effectCleanups = [];
    const webServerObj = { port: 3080, register: () => () => {} };

    const ctxActiveProbe = {
      webServer: webServerObj,
      connection: {}, // 无 authenticatedUrl
      on: () => () => {},
      emit(targetOrEvent, maybeEvent, maybeBaseUrl, maybeEntries) {
        if (targetOrEvent === webServerObj && maybeEvent === 'webserver/entry-url') {
          emitCount += 1;
          maybeEntries.push({ label: 'Browser', url: `${maybeBaseUrl}/?token=probed-022-launch-tok` });
        }
      },
      effect(fn) {
        const cleanup = fn();
        if (typeof cleanup === 'function') effectCleanups.push(cleanup);
      },
      logger: () => ({ info() {}, warn() {}, error() {} }),
    };

    apply(ctxActiveProbe, {}, {
      home: join(home, 'probe'),
      isDesktop: false,
      createProxy: async (opts) => {
        proxyLaunchToken = opts.launchToken;
        return { port: 3081, close: async () => {} };
      },
      lanIPv4: async () => '192.168.1.2',
      lanCandidates: async () => ['192.168.1.2'],
      encodeQr: async () => 'data:image/png;base64,qr',
    });

    await new Promise((r) => setTimeout(r, 20));
    assert.equal(typeof proxyLaunchToken, 'function');
    assert.equal(proxyLaunchToken(), 'probed-022-launch-tok');
    assert.equal(proxyLaunchToken(), 'probed-022-launch-tok', 'Second call must use cached token');
    assert.equal(emitCount, 1, 'Active probe must run only once and cache captured token');

    for (const fn of effectCleanups) await fn();
  }
});

test('v4 审计回归：SettingsPage 样式生命周期（0.2.2+ meta.stylesheets 不重复挂载 / 入口共有不误删 / 独立挂载卸载自清）、#-快速开始 锚点、legacy 布局键与分包重试', async () => {
  const mainCode = readFileSync(join(clientDir, 'client.js'), 'utf8');
  const mobileCode = readFileSync(join(clientDir, 'client.mobile.js'), 'utf8');
  const advSrc = readFileSync(join(clientDir, 'settings/AdvancedSection.tsx'), 'utf8');
  const mobileApplySrc = readFileSync(join(clientDir, 'mobile/mobile-apply.tsx'), 'utf8');

  // (b) 页脚文档锚点对齐 v4 README.md (`#-快速开始`)，彻底移除死锚 `#-怎么用`
  assert.equal(advSrc.includes('https://github.com/daha1216/dsh-pocket#-快速开始'), true);
  assert.equal(advSrc.includes('#-怎么用'), false);
  assert.equal(mainCode.includes('https://github.com/daha1216/dsh-pocket#-快速开始'), true);
  assert.equal(mainCode.includes('#-怎么用'), false);

  // (c) mobile-apply.tsx 源码与运行时同步兼容 legacy localStorage['dsh-mobile-nav-layout']
  assert.match(mobileApplySrc, /dsh-mobile-nav-layout/);
  assert.match(mobileApplySrc, /persistLayoutFromUrl\(urlRaw\)\s*\|\|\s*readLegacyMobileLayout\(\)/);

  function createStyleHeadHarness() {
    const headChildren = [];
    const makeStyleEl = (tag = 'style') => {
      const attrs = new Map();
      const node = {
        tagName: String(tag).toUpperCase(),
        id: '',
        textContent: '',
        innerHTML: '',
        parentElement: null,
        isConnected: true,
        childElementCount: 0,
        children: [],
        firstElementChild: null,
        dataset: {},
        classList: { add() {}, remove() {} },
        style: { setProperty() {}, removeProperty() {}, getPropertyValue: () => '', cssText: '' },
        setAttribute(k, v) {
          attrs.set(k, String(v));
          if (k === 'id') node.id = String(v);
        },
        removeAttribute(k) {
          attrs.delete(k);
          if (k === 'id') node.id = '';
        },
        getAttribute(k) {
          if (k === 'id' && node.id) return node.id;
          return attrs.has(k) ? attrs.get(k) : null;
        },
        hasAttribute(k) {
          return (k === 'id' && Boolean(node.id)) || attrs.has(k);
        },
        appendChild(ch) { return ch; },
        append() {},
        insertBefore(ch) { return ch; },
        addEventListener() {},
        removeEventListener() {},
        click() {},
        focus() {},
        blur() {},
        contains: () => false,
        querySelector: () => null,
        querySelectorAll: () => [],
        closest: () => null,
        matches: () => false,
        getClientRects: () => [{ width: 100, height: 32 }],
        getBoundingClientRect: () => ({ top: 0, bottom: 32, left: 0, right: 100, width: 100, height: 32 }),
        remove() {
          const idx = headChildren.indexOf(node);
          if (idx >= 0) headChildren.splice(idx, 1);
          node.parentElement = null;
        },
      };
      return node;
    };

    const head = {
      children: headChildren,
      appendChild(el) {
        if (!headChildren.includes(el)) headChildren.push(el);
        el.parentElement = head;
        return el;
      },
    };
    const body = makeStyleEl('body');

    const querySelector = (sel) => {
      for (const el of headChildren) {
        if (
          sel === 'style[data-plugin="dsh-pocket"][data-path="client/settings/styles.css"]' &&
          el.tagName === 'STYLE' &&
          el.getAttribute('data-plugin') === 'dsh-pocket' &&
          el.getAttribute('data-path') === 'client/settings/styles.css'
        ) {
          return el;
        }
        if (
          (sel === 'style#dshp-settings-css' || sel === '#dshp-settings-css') &&
          el.tagName === 'STYLE' &&
          el.id === 'dshp-settings-css'
        ) {
          return el;
        }
      }
      return null;
    };

    const doc = {
      hidden: true,
      visibilityState: 'hidden',
      head,
      body,
      documentElement: makeStyleEl('html'),
      createElement: (tag) => makeStyleEl(tag),
      getElementById: (id) => headChildren.find((el) => el.id === id) ?? null,
      querySelector,
      querySelectorAll: () => [],
      addEventListener() {},
      removeEventListener() {},
    };
    return { doc, headChildren, makeStyleEl };
  }

  // 构建可收集 useEffect 清理函数并递归展开函数组件的轻量 React 树渲染器
  function createReactMountHarness() {
    let effectFns = [];
    const cleanups = [];
    const ReactHarness = {
      Fragment: Symbol.for('react.fragment'),
      createElement: (type, props, ...children) => ({
        type,
        props: {
          ...(props || {}),
          children: children.length === 0 ? props?.children : children.length === 1 ? children[0] : children,
        },
      }),
      useState: (init) => [typeof init === 'function' ? init() : init, () => {}],
      useRef: (init) => ({ current: init }),
      useMemo: (fn) => fn(),
      useCallback: (fn) => fn,
      useEffect: (fn) => { effectFns.push(fn); },
    };

    const collectLinks = (node, hrefs = []) => {
      if (node == null || typeof node === 'boolean' || typeof node === 'string' || typeof node === 'number') {
        return hrefs;
      }
      if (Array.isArray(node)) {
        for (const item of node) collectLinks(item, hrefs);
        return hrefs;
      }
      if (typeof node.type === 'function') {
        return collectLinks(node.type(node.props || {}), hrefs);
      }
      if (node.type === 'a' && node.props?.href) {
        hrefs.push(node.props.href);
      }
      if (node.props?.children !== undefined) {
        collectLinks(node.props.children, hrefs);
      }
      return hrefs;
    };

    return {
      ReactHarness,
      mount(Component, props) {
        effectFns = [];
        const tree = Component(props);
        const hrefs = collectLinks(tree);
        for (const fn of effectFns) {
          const off = fn();
          if (typeof off === 'function') cleanups.push(off);
        }
        return {
          hrefs,
          unmount() {
            while (cleanups.length > 0) cleanups.pop()?.();
          },
        };
      },
    };
  }

  function loadClientPlugin(doc, winOverrides = {}) {
    let mainDesc = null;
    const chunkDescs = new Map();
    const win = {
      location: { href: 'http://127.0.0.1:3080/', search: '' },
      innerWidth: 1440,
      innerHeight: 900,
      scrollX: 0,
      scrollY: 0,
      scrollTo() {},
      scrollBy() {},
      visualViewport: null,
      dispatchEvent() {},
      matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
      addEventListener() {},
      removeEventListener() {},
      setTimeout: () => 0,
      clearTimeout() {},
      setInterval: () => 0,
      clearInterval() {},
      requestAnimationFrame: () => 1,
      cancelAnimationFrame() {},
      __ModuleLoader__: {
        load(d) {
          if (d.chunk) chunkDescs.set(d.chunk, d);
          else mainDesc = d;
        },
      },
      ...winOverrides,
    };
    const vmGlobals = {
      window: win,
      document: doc,
      location: win.location,
      innerWidth: win.innerWidth,
      innerHeight: win.innerHeight,
      devicePixelRatio: 2,
      performance: globalThis.performance,
      URL,
      URLSearchParams,
      console,
      setTimeout: win.setTimeout,
      clearTimeout: win.clearTimeout,
      setInterval: win.setInterval,
      clearInterval: win.clearInterval,
      requestAnimationFrame: win.requestAnimationFrame,
      cancelAnimationFrame: win.cancelAnimationFrame,
    };
    vmGlobals.globalThis = vmGlobals;
    const vmCtx = createContext(vmGlobals);
    new Script(mainCode).runInContext(vmCtx);
    return { mainDesc, chunkDescs, vmCtx, win, vmGlobals };
  }

  // (a-1) DSH 0.2.2-rc.2+ 已挂载 meta.stylesheets 样式节点：apply() 与 SettingsPage 均不得再创建 #dshp-settings-css
  {
    const { doc, headChildren, makeStyleEl } = createStyleHeadHarness();
    const hostStyle = makeStyleEl('style');
    hostStyle.setAttribute('data-plugin', 'dsh-pocket');
    hostStyle.setAttribute('data-path', 'client/settings/styles.css');
    hostStyle.textContent = '.dshp-page{}';
    doc.head.appendChild(hostStyle);

    const { ReactHarness, mount } = createReactMountHarness();
    const { mainDesc } = loadClientPlugin(doc);
    const exportsObj = mainDesc.factory((id) => {
      if (id === 'react') return ReactHarness;
      throw new Error(`Unexpected require: ${id}`);
    });

    let SettingsComponent = null;
    let slotPropsFactory = null;
    const pluginDisposers = [];
    exportsObj.apply({
      locale: { register: () => () => {}, bind: () => (k) => k },
      effect: (fn) => {
        const d = fn();
        if (typeof d === 'function') pluginDisposers.push(d);
        return d;
      },
      slots: {
        inject: (_name, setup) => { setup(); return () => {}; },
        register: (spec, comp) => {
          slotPropsFactory = spec.inject;
          SettingsComponent = comp;
          return () => {};
        },
      },
      connection: { rpc: { call: async () => ({ ok: true, value: {} }) } },
    });

    assert.equal(typeof SettingsComponent, 'function');
    assert.equal(doc.getElementById('dshp-settings-css'), null, 'apply() must skip #dshp-settings-css when host meta.stylesheets is present');

    const mounted = mount(SettingsComponent, slotPropsFactory());
    assert.equal(doc.getElementById('dshp-settings-css'), null, 'useSettings() must ALSO skip #dshp-settings-css when host meta.stylesheets is present');
    assert.equal(headChildren.length, 1, 'Only the single host-managed <style> must exist in <head>');
    assert.equal(mounted.hrefs.includes('https://github.com/daha1216/dsh-pocket#-快速开始'), true);
    assert.equal(mounted.hrefs.some((h) => h.includes('#-怎么用')), false);

    mounted.unmount();
    while (pluginDisposers.length > 0) pluginDisposers.pop()?.();
    assert.equal(headChildren.length, 1, 'Host-managed <style> must remain untouched');
  }

  // (a-2) DSH < 0.2.2-rc.2 入口 ctx.effect 已挂载 #dshp-settings-css：关闭设置页不得窃取删除，卸载插件才清理
  {
    const { doc, headChildren } = createStyleHeadHarness();
    const { ReactHarness, mount } = createReactMountHarness();
    const { mainDesc } = loadClientPlugin(doc);
    const exportsObj = mainDesc.factory((id) => (id === 'react' ? ReactHarness : null));

    let SettingsComponent = null;
    let slotPropsFactory = null;
    const pluginDisposers = [];
    exportsObj.apply({
      locale: { register: () => () => {}, bind: () => (k) => k },
      effect: (fn) => {
        const d = fn();
        if (typeof d === 'function') pluginDisposers.push(d);
        return d;
      },
      slots: {
        inject: (_name, setup) => { setup(); return () => {}; },
        register: (spec, comp) => {
          slotPropsFactory = spec.inject;
          SettingsComponent = comp;
          return () => {};
        },
      },
      connection: { rpc: { call: async () => ({ ok: true, value: {} }) } },
    });

    assert.ok(doc.getElementById('dshp-settings-css'), 'Entry fallback must mount #dshp-settings-css on <0.2.2-rc.2');
    assert.equal(headChildren.length, 1);

    const mounted = mount(SettingsComponent, slotPropsFactory());
    assert.equal(headChildren.length, 1, 'Opening SettingsPage must reuse entry #dshp-settings-css');
    mounted.unmount();
    assert.ok(doc.getElementById('dshp-settings-css'), 'Unmounting SettingsPage must NOT steal/remove entry-owned #dshp-settings-css');

    while (pluginDisposers.length > 0) pluginDisposers.pop()?.();
    assert.equal(doc.getElementById('dshp-settings-css'), null, 'Plugin unload must dispose entry #dshp-settings-css');
  }

  // (a-3) 独立挂载 <SettingsPage>（既无宿主样式也无入口样式）：自建 #dshp-settings-css 并在卸载时移除
  {
    const { doc } = createStyleHeadHarness();
    const { ReactHarness, mount } = createReactMountHarness();
    const { mainDesc } = loadClientPlugin(doc);
    const exportsObj = mainDesc.factory((id) => (id === 'react' ? ReactHarness : null));

    let SettingsComponent = null;
    let slotPropsFactory = null;
    exportsObj.apply({
      locale: { register: () => () => {}, bind: () => (k) => k },
      // 不执行入口 ctx.effect，模拟纯组件独立挂载测试场景
      effect: () => () => {},
      slots: {
        inject: (_name, setup) => { setup(); return () => {}; },
        register: (spec, comp) => {
          slotPropsFactory = spec.inject;
          SettingsComponent = comp;
          return () => {};
        },
      },
      connection: { rpc: { call: async () => ({ ok: true, value: {} }) } },
    });

    assert.equal(doc.getElementById('dshp-settings-css'), null);
    const mounted = mount(SettingsComponent, slotPropsFactory());
    const fallbackEl = doc.getElementById('dshp-settings-css');
    assert.ok(fallbackEl, 'Standalone SettingsPage mount must inject fallback #dshp-settings-css');
    assert.equal(fallbackEl.getAttribute('data-plugin'), 'dsh-pocket');
    assert.ok(fallbackEl.textContent.includes('.dshp-page'));

    mounted.unmount();
    assert.equal(doc.getElementById('dshp-settings-css'), null, 'Standalone SettingsPage unmount must remove self-created <style>');
  }

  // (c) & 分包加载失败重试 + 异步 ctx.effect 防重入：
  //     1) 宽屏 (1440px) + legacy localStorage['dsh-mobile-nav-layout']='mobile' 一致解析为 mobile；
  //     2) 首次 <0.2.2 fetch 瞬时 503 失败后不锁死 mobileLoaded，下次 resize 重试成功且异步排队 ctx.effect 不双跑
  {
    const { doc, makeStyleEl } = createStyleHeadHarness();
    const frame = makeStyleEl('div');
    doc.querySelector = (sel) => (sel === '[data-mobile-nav="frame"]' ? frame : null);

    let resizeHandler = null;
    let fetchAttempts = 0;
    const storage = new Map([['dsh-mobile-nav-layout', 'mobile']]);
    const localStorageStub = {
      getItem: (k) => (storage.has(k) ? storage.get(k) : null),
      setItem: (k, v) => { storage.set(k, String(v)); },
      removeItem: (k) => { storage.delete(k); },
    };

    const { ReactHarness } = createReactMountHarness();
    const { mainDesc, vmCtx, win, vmGlobals } = loadClientPlugin(doc, {
      innerWidth: 1440,
      addEventListener(ev, fn) { if (ev === 'resize') resizeHandler = fn; },
      removeEventListener(ev, fn) { if (ev === 'resize' && resizeHandler === fn) resizeHandler = null; },
    });

    win.head = doc.head;
    doc.head.appendChild = (elNode) => {
      if (elNode?.tagName === 'SCRIPT' && elNode.textContent) {
        new Script(elNode.textContent).runInContext(vmCtx);
      }
      return elNode;
    };

    Object.assign(vmGlobals, {
      localStorage: localStorageStub,
      navigator: globalThis.navigator,
      Node: { TEXT_NODE: 3 },
      MutationObserver: class { observe() {} disconnect() {} },
      ResizeObserver: class { observe() {} disconnect() {} },
      getComputedStyle: () => ({ getPropertyValue: () => '', visibility: 'visible', paddingTop: '0px' }),
      getSelection: () => ({ rangeCount: 0, isCollapsed: true, removeAllRanges() {}, addRange() {} }),
      Selection: class {},
      Range: class {},
      Element: class {},
      HTMLElement: class {},
      HTMLInputElement: class {},
      HTMLTextAreaElement: class {},
      KeyboardEvent: class { constructor(tp) { Object.assign(this, tp); } },
      PointerEvent: class {},
      Event: class { constructor(tp) { this.type = tp; } },
      EventTarget: class {},
      CustomEvent: class { constructor(n, o) { this.type = n; this.detail = o?.detail; } },
      requestAnimationFrame: () => 1,
      cancelAnimationFrame() {},
      fetch: async (url) => {
        if (url === `${POCKET_RPC_CHANNEL}/client.mobile.js`) {
          fetchAttempts += 1;
          if (fetchAttempts === 1) {
            return { ok: false, status: 503, text: async () => 'unavailable' };
          }
          return { ok: true, status: 200, text: async () => mobileCode };
        }
        return { ok: true, status: 204, text: async () => '' };
      },
    });
    win.localStorage = localStorageStub;
    win.CustomEvent = vmGlobals.CustomEvent;
    win.getSelection = vmGlobals.getSelection;

    const exportsObj = mainDesc.factory((id) => {
      if (id === 'react') return ReactHarness;
      throw new Error(`No sync chunk: ${id}`);
    });

    const queuedAsyncEffects = [];
    let localeRegRuns = 0;
    const pluginDisposers = [];
    let rootApplyDone = false;
    exportsObj.apply({
      locale: {
        register: (ns) => {
          if (ns === 'pocketMobileNav') localeRegRuns += 1;
          return () => {};
        },
        bind: () => (k) => k,
      },
      inject: (_deps, cb) => { cb({
        effect: (fn) => { queuedAsyncEffects.push(fn); return () => {}; },
        inject: () => () => {},
        get: () => undefined,
        locale: { register: () => () => {}, bind: () => (k) => k },
        slots: { inject: () => () => {}, register: () => () => {} },
      }); return () => {}; },
      effect: (fn) => {
        if (!rootApplyDone) {
          const d = fn();
          if (typeof d === 'function') pluginDisposers.push(d);
          return d;
        }
        // 模拟 Cordis 异步排队延迟触发 ctx.effect 回调
        queuedAsyncEffects.push(fn);
        return () => {};
      },
      slots: { inject: () => () => {}, register: () => () => {} },
      layout: { toggleSidebar() {} },
      connection: { rpc: { call: async () => ({ ok: true, value: {} }) } },
      get: () => undefined,
      sessions: { list: { getSnapshot: () => ({ current: 's1', byId: {} }), subscribe: () => () => {} }, selected: null },
      sessionLogDownload: { download() {} },
    });
    rootApplyDone = true;

    for (let i = 0; i < 8; i += 1) await new Promise((r) => setImmediate(r));
    assert.equal(fetchAttempts, 1, 'Initial forcedMobile load should attempt fallback fetch');
    assert.equal(localeRegRuns, 0, 'First fetch failed (503), mobileApply not yet run');
    assert.equal(typeof resizeHandler, 'function', 'Transient failure must re-arm resize watcher for retry');

    // 触发下一次断点/窗口变化：重试加载成功，且 mobileApply 在 1440px 宽屏下读取 dsh-mobile-nav-layout 仍保持 mobile
    doc.body.setAttribute('data-dsh-pocket-layout', 'stale');
    resizeHandler();
    for (let i = 0; i < 10; i += 1) await new Promise((r) => setImmediate(r));

    assert.equal(fetchAttempts, 2, 'Next resize must retry loading client.mobile.js');
    assert.equal(doc.body.getAttribute('data-dsh-pocket-layout'), 'mobile', 'mobileApply must honor legacy dsh-mobile-nav-layout=mobile on >=1024px viewport');
    assert.equal(localeRegRuns, 1, 'mobileApply effect must run once immediately');

    // 触发延迟排队的 ctx.effect 回调：started 门控保证绝不重复执行第二次
    while (queuedAsyncEffects.length > 0) queuedAsyncEffects.shift()?.();
    assert.equal(localeRegRuns, 1, 'Delayed async ctx.effect callback must NOT execute effect body twice');

    while (pluginDisposers.length > 0) pluginDisposers.pop()?.();
  }
});
