// Smoke-test dsh-pocket v4.0 dual-chunk client activation (`client.js` + `client.mobile.js`).
// Verifies:
//   1) Zero `@deepseek-ai/dsh-client-ui-primitives` runtime `require` calls & zero `window.__dshpSettingsCss` global leak.
//   2) `meta().stylesheets["client/settings/styles.css"].text()` is valid & `module.exports` stays clean.
//   3) Desktop fine-pointer mode (`innerWidth = 1440`, `pointer: coarse` = false) does NOT load `client.mobile.js`!
//   4) Dynamic resize (`1440 -> 390`) lazy-loads `client.mobile.js` on demand & disposes cleanly.
//   5) Mobile mode (`innerWidth = 390`, `pointer: coarse` = true) loads `client.mobile.js` via `require.async` (DSH 0.2.2+).
//   6) Legacy DSH `< 0.2.2` mode (`require.async` undefined) fetches `/dsh-pocket/client.mobile.js`, captures via
//      `window.__dshpChunkLoader` (cleaning it up afterwards), and activates all mobile effects cleanly!
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const mainCode = readFileSync(new URL('./client.js', import.meta.url), 'utf8');
const mobileCode = readFileSync(new URL('./client.mobile.js', import.meta.url), 'utf8');

const React = {
  createElement: (...a) => ({ a }),
  Fragment: 'Fragment',
  useState: (v) => [typeof v === 'function' ? v() : v, () => {}],
  useEffect: () => {},
  useRef: (v) => ({ current: v }),
  useMemo: (f) => f(),
  useCallback: (f) => f,
};

async function runScenario({ label, width, coarse, legacyNoAsync = false }) {
  const el = (tag = 'div') => ({
    tagName: tag.toUpperCase(),
    id: '',
    textContent: '',
    innerHTML: '',
    setAttribute() {},
    removeAttribute() {},
    getAttribute() { return null; },
    hasAttribute() { return false; },
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
    contains() { return false; },
    querySelector: () => null,
    querySelectorAll: () => [],
    parentElement: null,
    childElementCount: 0,
    children: [],
    firstElementChild: null,
    closest: () => null,
    matches: () => false,
  });

  const frame = el('div');
  let mobileChunkLoads = 0;
  let fallbackFetchHits = 0;
  let mainDescriptor = null;
  const chunkDescriptors = new Map();

  const matchMedia = (query) => {
    const q = String(query);
    let matches = false;
    if (q === '(max-width: 1023px) and (pointer: coarse)') {
      matches = width <= 1023 && coarse;
    } else if (q === '(min-width: 1024px) and (pointer: coarse)') {
      matches = width >= 1024 && coarse;
    } else if (q === '(max-width: 1023px)') {
      matches = width <= 1023;
    } else if (q === '(min-width: 1024px)') {
      matches = width >= 1024;
    } else if (q === '(pointer: coarse)') {
      matches = coarse;
    }
    return { matches, addEventListener() {}, removeEventListener() {} };
  };

  let resizeListener = null;
  const win = {
    location: { href: 'http://127.0.0.1:3081/', search: '' },
    innerWidth: width,
    innerHeight: 844,
    scrollY: 0,
    scrollX: 0,
    scrollTo() {},
    scrollBy() {},
    matchMedia,
    addEventListener(ev, fn) {
      if (ev === 'resize') resizeListener = fn;
    },
    removeEventListener(ev, fn) {
      if (ev === 'resize' && resizeListener === fn) resizeListener = null;
    },
    setTimeout: () => 0,
    clearTimeout() {},
    setInterval: () => 0,
    clearInterval() {},
    requestAnimationFrame: () => 1,
    cancelAnimationFrame() {},
    dispatchEvent() {},
    CustomEvent: class {
      constructor(n, o) {
        this.type = n;
        this.detail = o?.detail;
      }
    },
    visualViewport: null,
    navigator: globalThis.navigator,
    URLSearchParams,
    getSelection: () => selStub,
    __ModuleLoader__: {
      load: (descriptor) => {
        if (descriptor.chunk) {
          chunkDescriptors.set(descriptor.chunk, descriptor);
        } else {
          mainDescriptor = descriptor;
        }
      },
    },
  };

  const doc = {
    visibilityState: 'visible',
    activeElement: null,
    querySelector: (s) => (s === '[data-mobile-nav="frame"]' ? frame : null),
    querySelectorAll: () => [],
    getElementById: () => null,
    createElement: (t) => el(t),
    documentElement: el('html'),
    body: el('body'),
    head: el('head'),
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {},
  };

  const selStub = {
    rangeCount: 0,
    isCollapsed: true,
    anchorNode: null,
    focusNode: null,
    type: 'None',
    getRangeAt: () => ({ collapsed: true, cloneRange: () => ({}) }),
    removeAllRanges() {},
    addRange() {},
    collapse() {},
    empty() {},
  };

  globalThis.window = win;
  globalThis.document = doc;
  globalThis.location = win.location;
  globalThis.innerWidth = width;
  globalThis.innerHeight = 844;
  globalThis.devicePixelRatio = 2;
  globalThis.Node = { TEXT_NODE: 3 };
  globalThis.MutationObserver = class { observe() {} disconnect() {} };
  globalThis.ResizeObserver = class { observe() {} disconnect() {} };
  globalThis.getComputedStyle = () => ({ getPropertyValue: () => '', visibility: 'visible', paddingTop: '0px' });
  globalThis.getSelection = () => selStub;
  globalThis.Selection = class {};
  globalThis.Range = class {};
  globalThis.Element = class {};
  globalThis.HTMLElement = class {};
  globalThis.HTMLInputElement = class {};
  globalThis.HTMLTextAreaElement = class {};
  globalThis.KeyboardEvent = class { constructor(t) { Object.assign(this, t); } };
  globalThis.PointerEvent = class {};
  globalThis.Event = class { constructor(t) { this.type = t; } };
  globalThis.EventTarget = class {};
  globalThis.requestAnimationFrame = () => 1;
  globalThis.cancelAnimationFrame = () => {};
  globalThis.CustomEvent = win.CustomEvent;
  globalThis.fetch = async (url) => {
    if (url === '/dsh-pocket/client.mobile.js') {
      fallbackFetchHits += 1;
      mobileChunkLoads += 1;
      return {
        ok: true,
        status: 200,
        text: async () => mobileCode,
      };
    }
    if (url === '/__dsh-pocket/ping') {
      return { ok: true, status: 204 };
    }
    throw new Error(`[${label}] unexpected fetch URL: ${url}`);
  };

  // Evaluate main bundle (`client.js`)
  new Function('window', 'document', 'Node', 'MutationObserver', 'navigator', mainCode)(
    win,
    doc,
    globalThis.Node,
    globalThis.MutationObserver,
    globalThis.navigator,
  );
  assert.equal('__dshpSettingsCss' in win, false, `[${label}] __dshpSettingsCss must NOT leak onto window`);
  assert.ok(mainDescriptor, `[${label}] main descriptor must register via window.__ModuleLoader__.load`);
  assert.equal(typeof mainDescriptor.meta, 'function', `[${label}] meta() must be present on client.js`);
  const cssText = mainDescriptor.meta()?.stylesheets?.['client/settings/styles.css']?.text?.();
  assert.ok(typeof cssText === 'string' && cssText.includes('.dshp-page'), `[${label}] meta.stylesheets must expose stripped settings CSS`);

  // Strict require stub: ZERO `@deepseek-ai/dsh-client-ui-primitives` allowed!
  const hostRequire = (id) => {
    if (id === 'react') return React;
    throw new Error(`[${label}] unexpected runtime require: ${id}`);
  };
  if (!legacyNoAsync) {
    hostRequire.async = async (id) => {
      if (id === './client.mobile.js') {
        mobileChunkLoads += 1;
        new Function('window', 'document', 'Node', 'MutationObserver', 'navigator', mobileCode)(
          win,
          doc,
          globalThis.Node,
          globalThis.MutationObserver,
          globalThis.navigator,
        );
        const chunkDesc = chunkDescriptors.get('client.mobile.js');
        assert.ok(chunkDesc, 'client.mobile.js must register with chunk: "client.mobile.js"');
        return chunkDesc.factory(hostRequire);
      }
      throw new Error(`[${label}] unexpected async chunk require: ${id}`);
    };
  }

  const exports = mainDescriptor.factory(hostRequire);
  assert.deepEqual(
    Object.keys(exports).sort(),
    ['apply', 'inject', 'name', 'redactStatus'],
    `[${label}] module.exports must carry only business exports`,
  );

  const effects = [];
  const registeredNs = [];
  const disposers = [];
  const ctx = {
    locale: {
      register: (ns) => {
        registeredNs.push(typeof ns === 'object' ? ns.ns : ns);
        return () => {};
      },
      bind: () => (k) => k,
    },
    inject: (deps, cb) => {
      registeredNs.push('dyn:' + deps.join(','));
      cb(ctx);
      return () => {};
    },
    effect: (fn, effLabel) => {
      effects.push(effLabel ?? 'anon');
      const d = fn();
      if (typeof d === 'function') disposers.push(d);
      return d;
    },
    slots: { inject: () => () => {}, register: () => () => {} },
    layout: { toggleSidebar() {} },
    connection: { rpc: { call: async () => ({ ok: true, value: {} }) } },
    get: () => undefined,
    sessions: {
      list: { getSnapshot: () => ({ current: 's1', byId: {} }), subscribe: () => () => {} },
      selected: null,
    },
    sessionLogDownload: { download() {} },
  };

  exports.apply(ctx);
  for (let i = 0; i < 5; i += 1) {
    await new Promise((r) => setImmediate(r));
  }
  assert.equal('__dshpChunkLoader' in win, false, `[${label}] __dshpChunkLoader must be cleaned up after fallback`);

  return {
    get mobileChunkLoads() { return mobileChunkLoads; },
    get fallbackFetchHits() { return fallbackFetchHits; },
    effects,
    registeredNs,
    triggerNarrowResize: async () => {
      width = 390;
      win.innerWidth = 390;
      globalThis.innerWidth = 390;
      resizeListener?.();
      for (let i = 0; i < 5; i += 1) {
        await new Promise((r) => setImmediate(r));
      }
    },
    disposeAll: () => {
      while (disposers.length > 0) disposers.pop()?.();
    },
  };
}

const desktop = await runScenario({ label: 'desktop-1440-fine', width: 1440, coarse: false });
assert.equal(desktop.mobileChunkLoads, 0, 'Desktop fine-pointer mode MUST NOT load client.mobile.js!');
console.log(
  `[desktop] PASS — client.mobile.js loads=${desktop.mobileChunkLoads}, effects=${desktop.effects.length}`,
);

await desktop.triggerNarrowResize();
assert.equal(desktop.mobileChunkLoads, 1, 'Resizing desktop < 1024px MUST lazy-load client.mobile.js on demand!');
desktop.disposeAll();
console.log(
  `[resize]  PASS — lazy client.mobile.js loads=${desktop.mobileChunkLoads}, total effects=${desktop.effects.length} (cleanly disposed)`,
);

const mobile = await runScenario({ label: 'mobile-390-coarse', width: 390, coarse: true });
assert.equal(mobile.mobileChunkLoads, 1, 'Mobile coarse-pointer mode MUST load client.mobile.js once!');
assert.ok(mobile.effects.length >= 40, `Expected >= 40 effects, got ${mobile.effects.length}`);
console.log(
  `[mobile]  PASS — client.mobile.js loads=${mobile.mobileChunkLoads}, effects=${mobile.effects.length}, localeNS=${JSON.stringify(mobile.registeredNs)}`,
);

const legacy = await runScenario({ label: 'legacy-0.2.0-mobile', width: 390, coarse: true, legacyNoAsync: true });
assert.equal(legacy.fallbackFetchHits, 1, 'DSH < 0.2.2 fallback MUST fetch /dsh-pocket/client.mobile.js once!');
assert.ok(legacy.effects.length >= 40, `Expected >= 40 effects via < 0.2.2 fallback, got ${legacy.effects.length}`);
legacy.disposeAll();
console.log(
  `[legacy]  PASS — /dsh-pocket/client.mobile.js fetch=${legacy.fallbackFetchHits}, effects=${legacy.effects.length}`,
);

process.exit(0);
