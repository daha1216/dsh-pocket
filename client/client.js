window.__ModuleLoader__.load({
  id: "dsh-pocket",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    // The DSH client module system provides react as a module, never as a
    // global. esbuild keeps react external (see the build config above) and
    // its classic JSX transform emits bare React.createElement calls for the
    // mobile components (which import only named hooks, not React itself), so
    // the bundle must bind React itself - otherwise every mobile component
    // crashes at render time with "ReferenceError: React is not defined".
    var React = require("react");
var vs=Object.create;var qt=Object.defineProperty;var xs=Object.getOwnPropertyDescriptor;var ys=Object.getOwnPropertyNames;var ks=Object.getPrototypeOf,_s=Object.prototype.hasOwnProperty;var Es=(e,t)=>{for(var a in t)qt(e,a,{get:t[a],enumerable:!0})},Wn=(e,t,a,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of ys(t))!_s.call(e,o)&&o!==a&&qt(e,o,{get:()=>t[o],enumerable:!(n=xs(t,o))||n.enumerable});return e};var Oa=(e,t,a)=>(a=e!=null?vs(ks(e)):{},Wn(t||!e||!e.__esModule?qt(a,"default",{value:e,enumerable:!0}):a,e)),Ts=e=>Wn(qt({},"__esModule",{value:!0}),e);var kc={};Es(kc,{apply:()=>yc,inject:()=>bc,name:()=>fc,redactStatus:()=>jn});module.exports=Ts(kc);var y=require("react"),mc=Oa(require("@deepseek-ai/dsh-client-ui-primitives"),1);var xe="/dsh-pocket",wt="data-dsh-pocket-mobile-rightbar",vt="dsh-pocket:mobile-rightbar",nt="data-dsh-pocket-pinch-zoom",xt="dsh-pocket:mobile-pinch-zoom",Fe="data-dsh-pocket-mobile-font",yt="dsh-pocket:mobile-font-size",ze="--dsh-pocket-mobile-font-size";var $=Object.freeze({status:"pocket.status",tunnelStart:"tunnel.start",tunnelStop:"tunnel.stop",tunnelSetConfig:"tunnel.setConfig",version:"pocket.version",restart:"pocket.restart",lanTokenRefresh:"token.lanRefresh",lanAuthSetEnabled:"lanAuth.setEnabled",lanSetOverride:"lan.setOverride",lanSetEnabled:"lan.setEnabled",mobileRightbarSetEnabled:"mobile.rightbar.setEnabled",mobilePinchZoomSetEnabled:"mobile.pinchZoom.setEnabled",mobileFontSetSize:"mobile.font.setSize",pinSetCustom:"pin.setCustom",pocketReset:"pocket.reset",fileRead:"pocket.fileRead",cacheStats:"pocket.cache.stats",cacheClear:"pocket.cache.clear",probeReport:"pocket.probe.report",probeStats:"pocket.probe.stats",probeClear:"pocket.probe.clear",probeSetEnabled:"pocket.probe.setEnabled"});function Vn(e,t){let a=String(e).replace(/^[vV]/,"").split("."),n=String(t).replace(/^[vV]/,"").split(".");for(let b=0;b<3;b++){let l=parseInt(a[b],10)||0,s=parseInt(n[b],10)||0;if(l!==s)return l-s}let o=String(e).replace(/^[vV]/,"").match(/-.*$/)?.[0]??"",r=String(t).replace(/^[vV]/,"").match(/-.*$/)?.[0]??"";if(!o&&!r)return 0;if(!o)return 1;if(!r)return-1;let i=o.slice(1).split("."),d=r.slice(1).split("."),f=Math.max(i.length,d.length);for(let b=0;b<f;b++){let l=i[b]??"",s=d[b]??"";if(l===s)continue;let u=/^\d+$/.test(l),x=/^\d+$/.test(s);return u&&x?Number(l)-Number(s):u?-1:x?1:l<s?-1:1}return 0}function jn(e){return{proxyRunning:e?.proxyRunning===!0,proxyPort:e?.proxyPort??null,lanUrl:e?.lanUrl??null,lanQr:e?.lanQr??null,lanCandidates:Array.isArray(e?.lanCandidates)?e.lanCandidates:[],lanIpOverride:e?.lanIpOverride??"",tunnelRunning:e?.tunnelRunning===!0,tunnelUrl:e?.tunnelUrl??null,tunnelQr:e?.tunnelQr??null,tunnelState:e?.tunnelState??{phase:"idle"},tunnelConfig:e?.tunnelConfig??{mode:"named",hostname:"",tokenSet:!1},dshPort:e?.dshPort??null}}var Vt=require("react");var Ss=Oa(require("@deepseek-ai/dsh-client-ui-primitives"),1),Cs=()=>null,Ia=e=>{let t=Ss;for(let a of e){let n=t[a];if(n!==void 0)return n}return Cs},Gn=Ia(["IconPaperclipOutlineRegular","IconPaperclipOutline16"]),Un=Ia(["IconPanelLeftOutlineRegular","IconPanelLeftOutline16"]),Kn=Ia(["IconFolderOpenOutlineRegular","IconFolderOpenOutline16"]);function Na(){return document.querySelector("[data-shell-overlay]")?.parentElement??null}var Xn=null;function j(){let e=Xn;if(e!==null&&e.isConnected&&e.getAttribute("data-mobile-nav")==="frame")return e;let a=document.querySelector('[data-mobile-nav="frame"]')??Na();return Xn=a,a}var As="[data-sidebar-right-expand]",Ls="[data-sidebar-right-toggle]";function Wt(e=document){let t=e.querySelector(Ls),a=e.querySelector(As),n=typeof a?.click=="function"?a:t;return typeof n?.click!="function"?!1:(n.click(),!0)}function $n({toggleSidebar:e,t}){let a=()=>{Wt()},[n,o]=(0,Vt.useState)(!1);return(0,Vt.useEffect)(()=>{let r=()=>{let b=j();return b!==null&&!b.hasAttribute("data-sidebar-collapsed")};o(r());let i=0,d=()=>{i===0&&(i=requestAnimationFrame(()=>{i=0,o(r())}))},f=new MutationObserver(b=>{for(let l of b){if(l.type==="attributes"){if(l.attributeName==="data-sidebar-collapsed"){d();return}continue}let s=[...l.addedNodes,...l.removedNodes];if(s.length===0||!s.every(u=>u.nodeType===Node.TEXT_NODE)){d();return}}});return f.observe(document.documentElement,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["data-sidebar-collapsed"]}),()=>{i!==0&&cancelAnimationFrame(i),f.disconnect()}},[]),React.createElement(React.Fragment,null,React.createElement("button",{type:"button","data-mobile-nav":"toggle","aria-label":t(n?"close":"open"),"aria-expanded":n,title:t(n?"close":"open"),onClick:()=>e()},React.createElement(Un,{size:16})),React.createElement("button",{type:"button","data-mobile-nav":"files","aria-label":t("files"),title:t("files"),onClick:a},React.createElement(Kn,{size:16})))}function Zn({useInput:e,useSession:t,t:a}){let n=e(i=>i.phase!=="plain"),o=t(i=>i.subagent!==null),r=n||o;return React.createElement("button",{type:"button","data-mobile-nav":"file-upload","aria-label":a("fileUpload"),title:a("fileUpload"),disabled:r},React.createElement(Gn,{size:16}))}var Yn=`
[data-mobile-nav="toggle"],
[data-mobile-nav="files"],
[data-mobile-nav="downloads"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex: none;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--dsw-alias-label-secondary, inherit);
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
@media (hover: hover) {
  [data-mobile-nav="toggle"]:hover,
  [data-mobile-nav="files"]:hover,
  [data-mobile-nav="downloads"]:hover {
    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
  }
}
[data-mobile-nav="toggle"]:active,
[data-mobile-nav="files"]:active,
[data-mobile-nav="downloads"]:active {
  background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
}
[data-mobile-nav="toggle"]::after,
[data-mobile-nav="files"]::after {
  content: '';
  position: absolute;
  inset: -8px;
}
[data-mobile-nav="toggle"]:focus-visible,
[data-mobile-nav="files"]:focus-visible,
[data-mobile-nav="downloads"]:focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary, #4f6ef7);
  outline-offset: 1px;
}
[data-mobile-nav="session-log-wrap"] {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
}
[data-mobile-nav="session-log"] {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: var(--dsw-radius-md, 8px);
  background: transparent;
  color: var(--dsw-alias-label-secondary, inherit);
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
[data-mobile-nav="session-log"]::after {
  content: '';
  position: absolute;
  inset: -8px -6px;
}
@media (hover: hover) {
  [data-mobile-nav="session-log"]:hover:not(:disabled) {
    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
  }
}
[data-mobile-nav="session-log"]:active:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
}
[data-mobile-nav="session-log"][aria-expanded="true"]:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
}
[data-mobile-nav="session-log"]:disabled {
  color: var(--dsw-alias-label-dimmed, rgba(0, 0, 0, .35));
  cursor: default;
  background: transparent;
}
[data-mobile-nav="quick-settings-wrap"] {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
}
[data-mobile-nav="quick-settings"] {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: var(--dsw-radius-md, 8px);
  background: transparent;
  color: var(--dsw-alias-label-secondary, inherit);
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
[data-mobile-nav="quick-settings"]::after {
  content: '';
  position: absolute;
  inset: -7px;
}
@media (hover: hover) {
  [data-mobile-nav="quick-settings"]:hover {
    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
  }
}
[data-mobile-nav="quick-settings"]:active {
  background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
}
[data-mobile-nav="quick-settings"]:focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary, #4f6ef7);
  outline-offset: 1px;
}
[data-mobile-nav="frame"] [class*="sidebarCol"] [class*="triggerRow"]:has(> button[data-phase], > [role="status"]) [data-mobile-nav="quick-settings-wrap"] {
  display: none !important;
}
[data-mobile-nav-quick-menu] > [role="presentation"] > :first-child > [role="menuitem"] {
  display: none !important;
}
[data-mobile-nav-quick] [role="menu"] {
  visibility: hidden !important;
}
[data-mobile-nav="delete-confirm-title"] {
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: var(--dsw-alias-text-primary, rgb(15, 17, 21));
}
[data-mobile-nav="delete-confirm-desc"] {
  font-size: 12px;
  line-height: 17px;
  color: var(--dsw-alias-label-secondary, inherit);
}
[data-mobile-nav="delete-confirm-actions"] {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 2px;
}
[data-mobile-nav="delete-confirm-actions"] > button {
  height: 36px;
  padding: 0 14px;
  border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, .12));
  border-radius: 18px;
  background: transparent;
  color: var(--dsw-alias-label-primary, inherit);
  font-family: inherit;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
[data-mobile-nav="delete-confirm-yes"] {
  border-color: transparent !important;
  background: var(--dsw-alias-state-error-primary, #b91c1c) !important;
  color: #ffffff !important;
}
[data-mobile-nav="delete-confirm-actions"] > button:disabled {
  opacity: .55;
  cursor: default;
}
[data-mobile-nav="delete-error"] {
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  color: var(--dsw-alias-state-error-primary, #b91c1c);
}
[data-mobile-nav="delete-dialog-backdrop"] {
  position: fixed;
  inset: 0;
  z-index: 55;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, .4);
  animation: dsh-web-mobile-fade .2s var(--ds-ease-in-out, ease-in-out);
}
[data-mobile-nav="delete-dialog"] {
  position: static;
  width: min(420px, calc(100vw - 32px));
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(248, 249, 250, .58);
  -webkit-backdrop-filter: blur(40px) saturate(1.5);
  backdrop-filter: blur(40px) saturate(1.5);
  box-shadow: rgba(0, 0, 0, .04) 0 0 0 .5px, rgba(0, 0, 0, .04) 0 3px 8px 0, rgba(0, 0, 0, .05) 0 0 20px 0;
}
@media (prefers-reduced-motion: reduce) {
  [data-mobile-nav="delete-dialog-backdrop"],
  [data-mobile-nav="delete-dialog"],
  [data-mobile-nav="file-picker-backdrop"],
  [data-mobile-nav="file-picker"] {
    animation: none !important;
  }
}
[data-mobile-nav="file-picker-backdrop"] {
  position: fixed;
  inset: 0;
  z-index: 55;
  background: transparent;
}
[data-mobile-nav="file-picker"] {
  position: fixed;
  box-sizing: border-box;
  width: max-content;
  min-width: 0;
  max-width: min(78vw, 240px);
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 5px;
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-2, #fff);
  box-shadow: rgba(0, 0, 0, .16) 0 8px 28px, rgba(0, 0, 0, .06) 0 0 0 .5px;
  animation: dsh-web-mobile-fade .12s var(--ds-ease-in-out, ease-in-out);
}
[data-mobile-nav="file-picker-option"] {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 34px;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--dsw-alias-label-primary, currentColor);
  font: inherit;
  font-size: 14px;
  line-height: 1.3;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
[data-mobile-nav="file-picker-icon"] {
  flex: none;
  display: inline-flex;
  color: var(--dsw-alias-label-secondary, currentColor);
}
[data-mobile-nav="file-picker-icon"] svg {
  width: 18px;
  height: 18px;
}
[data-mobile-nav="file-picker-option"]:active {
  background: var(--dsw-alias-interactive-bg-active, rgba(127, 127, 127, .12));
}
@media (max-width: 1023px) and (pointer: coarse) {
  body:has([data-mobile-nav="frame"]:not([data-sidebar-collapsed])) [role="menu"] {
    z-index: 1400 !important;
  }
  body:has([data-mobile-nav="backdrop"])
    > div:has(> [role="dialog"][aria-modal="true"]) {
    z-index: 1400 !important;
  }
  [data-mobile-nav="delete-dialog-backdrop"] {
    z-index: 1400 !important;
  }
  [data-mobile-nav="file-picker-backdrop"] {
    z-index: 1400 !important;
  }
  [data-mobile-nav="delete-dialog"] {
    z-index: 1401 !important;
  }
  body:has([data-mobile-nav="frame"]:not([data-sidebar-collapsed]))
    [data-usage-stats-panel] {
    z-index: 1400 !important;
  }
  body:has([data-mobile-nav="frame"]:not([data-sidebar-collapsed]))
    [class*="_overlayLayer"] {
    z-index: 1400 !important;
  }
  body:has([data-sidebar-right-open][data-sidebar-right-panel="fullscreen"]) [data-mobile-nav="fab"] {
    z-index: 55 !important;
  }
  body:has([data-sidebar-right-open][data-sidebar-right-panel="fullscreen"])
    [class*="_overlayLayer"] {
    z-index: 1400 !important;
  }
}
@media (max-width: 1023px) and (pointer: coarse) {
  @media (hover: none) {
    html,
    body {
      -webkit-tap-highlight-color: transparent;
    }
    :where(button, [role="button"], [role="menuitem"], [role="menuitemradio"], [role="option"], [role="tab"], [role="treeitem"], a[href]) {
      transition: box-shadow .12s var(--ds-ease-in-out, ease-in-out), transform .12s var(--ds-ease-in-out, ease-in-out);
    }
    :where(button, [role="button"], [role="menuitem"], [role="menuitemradio"], [role="option"], [role="tab"], [role="treeitem"], a[href]):where(:active):where(:not(:disabled, [aria-disabled="true"], [aria-selected="true"], [aria-pressed="true"], [aria-checked="true"])) {
      box-shadow: inset 0 0 0 100vmax var(--dsw-alias-interactive-bg-active, color-mix(in srgb, currentColor 8%, transparent));
    }
    :where(button:has(> svg:only-child), button[aria-label]:not(:has(> span, > div))):where(:active):where(:not(:disabled, [aria-disabled="true"])) {
      transform: scale(.96);
    }
    [data-team-action] > button:active,
    [data-dsha-lineage-trigger]:active {
      box-shadow: none;
      transform: none;
    }
    @media (prefers-reduced-motion: reduce) {
      :where(button, [role="button"], [role="menuitem"], [role="menuitemradio"], [role="option"], [role="tab"], [role="treeitem"], a[href]) {
        transition: none;
      }
      :where(button:has(> svg:only-child), button[aria-label]:not(:has(> span, > div))):where(:active) {
        transform: none;
      }
    }
  }
}
[data-mobile-nav="fab"] {
  position: absolute;
  top: calc(env(safe-area-inset-top, 0px) + 12px);
  left: 10px;
  z-index: 21;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, .12));
  border-radius: 50%;
  background: var(--dsw-alias-button-floating-fill, #ffffff);
  color: var(--dsw-alias-label-primary, inherit);
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, .18);
  -webkit-tap-highlight-color: transparent;
}
[data-mobile-nav="fab"]::after {
  content: '';
  position: absolute;
  inset: -3px;
}
@media (hover: hover) {
  [data-mobile-nav="fab"]:hover {
    background: var(--dsw-alias-button-floating-hover, rgba(0, 0, 0, .08));
  }
}
[data-mobile-nav="fab"]:focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary, #4f6ef7);
  outline-offset: 2px;
}
[data-mobile-nav="backdrop"] {
  position: absolute;
  inset: 0;
  z-index: 1250;
  background: rgba(0, 0, 0, .45);
  cursor: pointer;
  animation: dsh-web-mobile-fade .2s var(--ds-ease-in-out, ease-in-out);
  transition: opacity .2s var(--ds-ease-in-out, ease-in-out);
  -webkit-tap-highlight-color: transparent;
}
@keyframes dsh-web-mobile-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  [data-mobile-nav="backdrop"] {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes dsh-web-mobile-sheet-in {
  from {
    transform: translateY(14px) scale(.98);
  }
  to {
    transform: none;
  }
}
`;var Qn=`
@media (max-width: 1023px) and (pointer: coarse) {
  html,
  body {
    touch-action: pan-y pinch-zoom !important;
    overscroll-behavior-x: none !important;
    -webkit-text-size-adjust: 100% !important;
    text-size-adjust: 100% !important;
  }
  html,
  body {
    height: 100% !important;
    overflow: hidden !important;
    overscroll-behavior: none !important;
    background: var(--dsw-alias-bg-base, #fff) !important;
  }
  html [data-mobile-nav="frame"] {
    box-sizing: border-box !important;
    position: relative !important;
    height: var(--dsha-mobile-visible-vh, 100%) !important;
    grid-template-columns: minmax(0, 1fr) 0 0 !important;
    padding-top: env(safe-area-inset-top, 0px) !important;
    padding-bottom: env(safe-area-inset-bottom, 0px) !important;
  }
  html [data-mobile-nav="frame"] > :has([data-conversation-region]) {
    grid-column: 1 !important;
    grid-row: 1 !important;
  }
  html [data-mobile-nav="frame"] [class*="_centerCol"] {
    grid-column: 1 !important;
    grid-row: 1 !important;
  }
  [data-mobile-nav="frame"] > [class*="_sidebarCol"] {
    position: absolute !important;
    inset: 0 auto 0 0 !important;
    width: min(88vw, 280px) !important;
    z-index: 1300 !important;
    transform: translateX(-110%);
    transition: transform .28s var(--ds-ease-in-out, ease-in-out);
    padding-top: env(safe-area-inset-top, 0px) !important;
    border-right: none !important;
    background: var(--dsw-specific-sidebar-fill, #f9fafb);
    touch-action: pan-y pinch-zoom !important;
  }
  body[data-dsh-bg] [data-mobile-nav="frame"] > [class*="_sidebarCol"] {
    background: var(--dsw-static-neutral-bluish-50, #f9fafb);
  }
  body[data-ds-dark-theme][data-dsh-bg] [data-mobile-nav="frame"] > [class*="_sidebarCol"] {
    background: var(--dsw-static-neutral-bluish-900, #1b1b1c);
  }
  [data-mobile-nav="frame"][data-sidebar-collapsed] > :first-child {
    width: min(88vw, 280px) !important;
    transform: translateX(-110%) !important;
  }
  [data-mobile-nav="frame"]:not([data-sidebar-collapsed]) > :first-child {
    transform: none !important;
  }
  html [data-mobile-nav="frame"][data-sidebar-collapsed] [data-pane="sidebar"] [data-dsh-responsive-part="sidebar-toggle"],
  html [data-mobile-nav="frame"] [data-dsh-responsive-part="sidebar-toggle"],
  html [data-mobile-nav="frame"] [class*="hHd-Xa_toggle"]:is([aria-label*="sidebar" i], [aria-label*="侧边栏"]),
  html [data-mobile-nav="frame"] [data-conversation-header-leading] button[aria-label*="sidebar" i],
  html [data-mobile-nav="frame"] [data-conversation-header-leading] button[aria-label*="侧边栏"],
  html [data-mobile-nav="frame"] [data-shell-leading] button[aria-label*="sidebar" i],
  html [data-mobile-nav="frame"] [data-shell-leading] button[aria-label*="侧边栏"] {
    display: none !important;
  }
  [data-sidebar-right-panel="fullscreen"] {
    padding-top: env(safe-area-inset-top, 0px) !important;
  }
  [data-sidebar-right-open][data-sidebar-right-panel="fullscreen"] {
    z-index: 10 !important;
  }
  body[data-dsh-bg] [data-sidebar-right-open][data-sidebar-right-panel="fullscreen"] {
    background-color: var(--dsw-static-neutral-bluish-00, #fff);
  }
  body[data-ds-dark-theme][data-dsh-bg] [data-sidebar-right-open][data-sidebar-right-panel="fullscreen"] {
    background-color: var(--dsw-static-neutral-bluish-950, #151517);
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-sidebar-right-panel] [data-dockkit-split-button],
    [data-sidebar-right-panel] span:has(> [data-dockkit-split-button]),
    [data-sidebar-right-panel] [data-sidebar-right-mode="push"] {
      display: none !important;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    [data-mobile-nav="frame"] > [class*="_sidebarCol"] {
      transition: none !important;
    }
  }
  [data-side="sidebar"],
  [data-side="details"] {
    display: none !important;
  }
  [data-phase] [class*="_scrollBody"] {
    scrollbar-gutter: auto !important;
    scrollbar-width: none;
    overscroll-behavior: contain;
  }
  [data-phase] [class*="_scrollBody"]::-webkit-scrollbar {
    display: none !important;
    width: 0;
    height: 0;
  }
  [data-mobile-nav="frame"] [data-phase] [class*="_scrollBody"] {
    margin-top: calc(-1 * var(--mobile-nav-header-h, 0px)) !important;
    padding-top: var(--mobile-nav-header-h, 0px) !important;
  }
  html[data-mobile-nav-selecting] [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    pointer-events: none !important;
  }
  [data-phase] [class*="_actions"] {
    overflow: hidden;
  }
  [data-phase] [class*="_actions"] [class*="_timeEnd"] {
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }
  @media (hover: none), (pointer: coarse) {
    [data-phase] [role="tooltip"],
    [data-phase] [class*="_actions"] [class*="_bubble"] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  }
  [data-phase]
    [class*="_scroll"]:not([class*="_scrollBody"]):not(:has([data-composer-input])):has(p) {
    padding-left: 20px;
    padding-right: 20px;
    font-size: var(--dsw-font-markdown-base-font-size, var(--dsh-content-font-size, 14px)) !important;
  }
  [data-phase]
    [class*="_scroll"]:not([class*="_scrollBody"]):not(:has([data-composer-input])):has(p) p,
  [data-phase]
    [class*="_scroll"]:not([class*="_scrollBody"]):not(:has([data-composer-input])):has(p) li,
  [data-phase]
    [class*="_scroll"]:not([class*="_scrollBody"]):not(:has([data-composer-input])):has(p) [
      class*="_text_"
    ] {
    font-size: inherit !important;
  }
  [data-phase] table {
    width: 100%;
    max-width: 100%;
  }
  [data-phase] th,
  [data-phase] td {
    max-width: none;
    min-width: 0;
  }
  [data-phase] [class*="_scroll"]:not([class*="_scrollBody"]) img {
    width: auto !important;
    max-width: 100% !important;
    height: auto !important;
    max-height: 220px !important;
    max-height: min(40dvh, 220px) !important;
  }
  [data-phase] [class*="_userStack"],
  [data-phase] [class*="_userStack"] [class*="_bubble"] {
    box-sizing: border-box;
    width: fit-content;
    max-width: 100%;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) {
    box-sizing: border-box;
    container-type: inline-size;
    container-name: dsh-mobile-composer;
    flex-wrap: nowrap;
    gap: 3px;
    padding-left: 6px;
    padding-right: 6px;
    overflow: visible;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]):has([class*="_primary"] ~ [class*="_primary"]) {
    flex-wrap: wrap;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]):has([class*="_primary"] ~ [class*="_primary"]) > [class*="_trailing"] > [class*="_primary"]:has(~ [class*="_primary"]) {
    margin-right: 8px;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > :first-child {
    flex: 0 1 auto;
    min-width: 0;
    gap: 8px;
    overflow: visible;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] {
    flex: 1 1 auto;
    min-width: 0;
    gap: 3px;
    overflow: visible;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] {
    flex: 0 1 auto;
    min-width: 0;
    max-width: none;
    gap: 0;
    overflow: visible;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] > [class*="_trigger"] {
    flex: 1 1 auto;
    min-width: 28px;
    max-width: 100%;
    display: flex !important;
    overflow: hidden;
    padding: 0 !important;
    gap: 0 !important;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] > [class*="_trigger"] > [class*="_triggerLabel"] {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] > :not([class*="_trigger"]) {
    flex: 0 1 auto;
    min-width: 34px;
    max-width: max-content;
    overflow: visible;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] > [class*="_wrap"] > [class*="_chip"] {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }
  @container dsh-mobile-composer (max-width: 359px) {
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] > [class*="_trigger"] > [class*="_triggerLabel"] {
      display: none !important;
    }
  }
  [data-mobile-nav="frame"] [data-phase] [class*="iWlSmW_trigger"] {
    padding: 0 !important;
    gap: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] [class*="iWlSmW_triggerIcon"] svg {
    width: 16px !important;
    height: 16px !important;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="menu"]) {
    flex: 0 1 auto;
    min-width: 0;
    overflow: visible;
  }
  @container dsh-mobile-composer (max-width: 359px) {
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="menu"]) {
      flex-basis: auto;
    }
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="menu"]) > [class*="_trigger"] {
    display: flex !important;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="menu"]) > [class*="_trigger"] > [class*="_triggerLabel"] {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_root"]:has(> [class*="_trigger"]):not(:has(> [class*="_trigger"][aria-haspopup="menu"])) {
    flex: 0 0 auto;
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [class*="_7KE1Ra_menu"][role="menu"]:has(> [role="menuitemradio"]) {
      width: min(208px, calc(100vw - 32px)) !important;
      min-width: 0 !important;
      max-width: calc(100vw - 32px) !important;
    }
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > :first-child > :not([class*="_add"]) {
    flex-shrink: 1;
    min-width: 0;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > :not([class*="_primary"]) {
    flex-shrink: 1;
    min-width: 0;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > :first-child > [class*="_add"] {
    flex: none;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_root"] {
    flex: none;
    min-width: 0;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:has([class*="_trigger"][aria-haspopup="menu"]) {
    justify-content: flex-end;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:has([class*="_trigger"][aria-haspopup="menu"]) > :first-child {
    margin-left: auto;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="dialog"]) {
    margin-right: 0px;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="menu"]) {
    margin-left: auto;
    margin-right: -4px;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="dialog"]) > [class*="_trigger"] {
    width: 28px;
    height: 34px;
    padding: 0;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:not(:has([class*="_trigger"][aria-haspopup="menu"])) > [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="dialog"]) {
    margin-left: auto;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:not(:has([class*="_trigger"][aria-haspopup="menu"])) > [data-mobile-nav="stats-ring-reserve"] {
    margin-left: auto !important;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:not(:has([class*="_trigger"][aria-haspopup="menu"])) > [class*="_primary"] {
    margin-left: 0;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_primary"] {
    flex: none;
    margin-left: auto;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:has([class*="_trigger"][aria-haspopup="menu"], > [class*="_root"] > [class*="_trigger"][aria-haspopup="dialog"]) > [class*="_primary"] {
    margin-left: 0;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]):has([class*="_primary"] ~ [class*="_primary"]) > [class*="_trailing"] {
    justify-content: flex-end;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]):has([class*="_primary"] ~ [class*="_primary"]) > [class*="_trailing"] > [class*="_primary"] {
    margin-left: 0;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_primary"] {
    box-sizing: border-box !important;
    width: 28px !important;
    min-width: 28px !important;
    height: 28px !important;
    min-height: 28px !important;
    padding: 0 !important;
    border-radius: 50% !important;
  }
  [class*="_trailing"] > [class*="_primary"] {
    box-sizing: border-box !important;
    width: 28px !important;
    min-width: 28px !important;
    height: 28px !important;
    min-height: 28px !important;
    padding: 0 !important;
    border-radius: 50% !important;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_primary"] svg {
    width: 16px !important;
    height: 16px !important;
  }
  [class*="_trailing"] > [class*="_primary"] svg {
    width: 16px !important;
    height: 16px !important;
  }
  [data-phase] [class*="_dock"] [class*="_trigger"][aria-haspopup="dialog"] {
    position: relative;
  }
  [data-phase] [class*="_dock"] [class*="_trigger"][aria-haspopup="dialog"]::after {
    content: '';
    position: absolute;
    inset: -4px;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [data-seat-root] {
    flex: 1 1 auto;
    justify-content: flex-end;
    position: static !important;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [data-seat-root] > [data-seat-panel] {
    left: 0 !important;
    right: 0 !important;
    max-width: min(100%, 420px) !important;
    transform: none !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  @media (max-height: 700px) {
    [data-seat-model-menu] {
      max-height: min(220px, calc(50vh - 110px)) !important;
    }
  }
  @media (orientation: portrait) and (max-height: 505px) {
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [data-seat-root] > [data-seat-panel] {
      max-height: calc(50dvh - 45px) !important;
      overflow-y: auto !important;
      overscroll-behavior: contain !important;
    }
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [data-seat-root] > [data-seat-panel] > * {
      flex: 0 0 auto !important;
    }
  }
  @media (orientation: landscape) {
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [data-seat-root] > [data-seat-panel] {
      position: fixed !important;
      left: 16px !important;
      right: 16px !important;
      bottom: 12px !important;
      top: auto !important;
      transform: none !important;
      margin: 0 auto !important;
      max-width: min(100%, 420px) !important;
    }
  }
  [data-composer-card] [data-mobile-nav="file-upload"] {
    flex: 0 0 auto !important;
    width: 28px !important;
    min-width: 28px !important;
    max-width: 28px !important;
    height: 28px !important;
    min-height: 28px !important;
    padding: 0 !important;
    position: relative !important;
    margin: 0 0 0 -8px !important;
    display: grid !important;
    place-items: center;
    border: 0 !important;
    border-radius: 999px;
    background: transparent;
    color: inherit;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  [data-composer-card] [data-mobile-nav="file-upload"]::before {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 999px;
    background: transparent;
    transition: background .12s ease;
  }
  [data-composer-card] [data-mobile-nav="file-upload"]::before {
    background: transparent !important;
  }
  [data-composer-card] [data-mobile-nav="file-upload"]:hover,
  [data-composer-card] [data-mobile-nav="file-upload"]:active,
  [data-composer-card] [data-mobile-nav="file-upload"]:focus-visible {
    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
    box-shadow: none !important;
    outline: none !important;
    border-color: transparent !important;
  }
  [data-mobile-nav="frame"] [data-phase] header button,
  [data-mobile-nav="frame"] [data-phase] header [role="tab"],
  [data-mobile-nav="frame"] [data-phase] header [role="menuitem"],
  [data-mobile-nav="frame"] [data-phase] header [role="button"],
  [data-mobile-nav="frame"] [data-phase] header [tabindex],
  [data-composer-card] button,
  [data-composer-card] [role="button"],
  [data-composer-card] [tabindex] {
    -webkit-tap-highlight-color: transparent;
  }
  body[data-ds-dark-theme] [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]),
  html[data-ds-dark-theme] [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    background-color: var(--dsw-alias-bg-base, #151517) !important;
  }
  body[data-ds-dark-theme][data-dsh-bg] [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    background-color: var(--dsw-static-neutral-bluish-950, #151517) !important;
  }
  [data-mobile-nav="frame"] [data-phase] header button:active,
  [data-mobile-nav="frame"] [data-phase] header [role="tab"]:active {
    filter: brightness(.92);
  }
  [data-composer-card] [data-mobile-nav="file-upload"]::after {
    content: '';
    position: absolute;
    inset: -7px;
    border-radius: 999px;
  }
  [data-composer-card] [data-mobile-nav="file-upload"]:disabled {
    opacity: 0.38;
    cursor: default;
  }
  [data-composer-card]:not(:has(input[type=file])) [data-mobile-nav="file-upload"] {
    display: none !important;
  }
  [data-mobile-nav="frame"] [data-phase="active"] [data-composer-card] {
    padding-top: 2px !important;
    gap: 4px !important;
  }
  [data-mobile-nav="frame"] [data-phase="active"] [data-composer-card] [class*="_row"] {
    padding: 0 8px !important;
  }
  [data-mobile-nav="frame"] [data-phase="active"] [data-composer-card] [data-composer-input],
  [data-mobile-nav="frame"] [data-phase="active"] [data-composer-card] [class*="_scroll"] {
    min-height: 28px !important;
    padding-top: 2px !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    padding-left: 0 !important;
    padding-right: 8px !important;
    position: relative !important;
    background: var(--dsw-alias-bg-layer-1, #fff) !important;
    z-index: 30 !important;
  }
  [data-mobile-nav="frame"] [class*="_composerSeat"],
  div[class*="_frame"] [class*="_composerSeat"],
  [data-mobile-nav="frame"] [data-phase] [class*="_composerSeat"] {
    padding-bottom: 2px !important;
  }
  [data-mobile-nav="frame"] [class*="_composerSeat"] [class*="_root"]:has(> [class*="_card"]),
  div[class*="_frame"] [class*="_composerSeat"] [class*="_root"]:has(> [class*="_card"]),
  [data-mobile-nav="frame"] [data-phase] [class*="_composerSeat"] [class*="_root"]:has(> [class*="_card"]) {
    padding-bottom: 2px !important;
  }
  [data-phase="active"] [data-conversation-scroll] > [data-composer-seat] {
    margin-top: auto !important;
  }
  [data-mobile-nav="frame"][data-mobile-nav-composer-tight] [class*="_composerSeat"] {
    z-index: 31 !important;
  }
  @media (orientation: landscape) {
    [data-mobile-nav="frame"][data-mobile-nav-composer-tight] [class*="_composerSeat"] [data-composer-dock],
    [data-mobile-nav="frame"][data-mobile-nav-composer-tight] [class*="_composerSeat"] [data-composer-stats] {
      display: none !important;
    }
  }
  [data-mobile-nav="frame"] [data-phase] header[class*="_headerHidden"] {
    display: none;
  }
  [data-mobile-nav="frame"] [data-phase] header[class*="headerBlank"] {
    display: none;
  }
  [data-mobile-nav="frame"] [data-phase] header:not(:has([class*="_headerLeading"])) [class*="_headerActions"] [class*="_root"]:not([class*="_switcherRoot"]):has(> button[class*="_trigger"]) {
    position: static !important;
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header [class*="_tabs"] {
      padding-left: 8px !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }
    html body [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-conversation-tabs][role="tablist"] > button[role="tab"],
    html body [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-conversation-tabs] > button[class*="_tab"]:not([class*="_tabs"]) {
      padding: 6px 0 3px !important;
    }
    html body [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-conversation-tabs][role="tablist"],
    html body [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-conversation-tabs][role="tablist"] {
      margin-top: -8px !important;
    }
    html body [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
      grid-template-rows: auto auto !important;
      row-gap: 3.5px !important;
    }
    html body [data-mobile-nav="frame"] [data-phase] header [role="tablist"] {
      min-height: 0 !important;
      height: 21px !important;
      align-items: flex-end !important;
    }
    html [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleRow"] {
      height: auto !important;
      min-height: 0 !important;
    }
    html [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_tab"]:not([class*="_tabs"]) {
      padding-top: 0 !important;
      align-self: flex-end !important;
    }
    html [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-conversation-tabs][role="tablist"] > button[role="tab"] {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    html [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-conversation-tabs][role="tablist"] {
      gap: 6px !important;
    }
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) > :first-child {
    display: flex !important;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    gap: 2px;
    padding-left: 40px;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) > :first-child > :first-child {
    display: flex !important;
    align-items: center;
    flex: 1 1 auto;
    min-width: 0;
    gap: 2px;
  }
  [data-mobile-nav="toggle"] {
    position: absolute !important;
    left: 8px !important;
    top: 12px !important;
    z-index: 2 !important;
  }
  [data-mobile-nav="files"] {
    position: absolute !important;
    right: 8px !important;
    left: auto !important;
    top: 12px !important;
    z-index: 2 !important;
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="files"] {
      right: 4px !important;
    }
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerActions"] {
    display: flex !important;
    align-items: center;
    box-sizing: border-box;
    flex: 0 1 auto;
    min-width: 0;
    max-width: calc(100% - 32px);
    margin-left: auto;
    justify-content: flex-end;
    gap: 2px;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_crumbs"] {
    flex: 1 1 0;
    min-width: 30%;
    max-width: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_label"]:has(> svg) {
    order: 1;
    flex: 0 1 auto;
    min-width: 0;
    max-width: min(38vw, 220px);
    display: block;
    position: relative;
    box-sizing: border-box;
    padding-left: 18px;
    padding-right: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_label"]:has(> svg) > svg {
    position: absolute !important;
    left: 0 !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_root"]:not([class*="_switcherRoot"]):has(> button[class*="_trigger"]) {
    order: 2;
    flex: 0 0 auto;
    min-width: 0;
    max-width: min(40vw, 180px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_root"]:not([class*="_switcherRoot"]):has(> button[class*="_trigger"]) > button {
    min-width: 0;
    max-width: 100%;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_root"]:not([class*="_switcherRoot"]):has(> button[class*="_trigger"]) > button > * {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_root"]:not([class*="_switcherRoot"]):has(> button[class*="_trigger"]) > button,
  [data-mobile-nav="frame"] [data-phase] header [class*="_root"]:not([class*="_switcherRoot"]):has(> button[class*="_trigger"]) > button * {
    white-space: nowrap !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_crumbs"] [class*="_separator"] {
    display: none !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_headerUtilities"] {
    overflow: visible !important;
    height: 30px !important;
    min-height: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_headerUtilities"] [class*="nL4_yW_moreButton"] {
    display: none !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [data-mobile-nav="files"] {
    width: 28px;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) > :first-child > :last-child {
    display: none !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [role="tablist"] {
    flex-wrap: nowrap;
    gap: 0 16px;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    touch-action: pan-x;
    scrollbar-width: none;
  }
  [data-mobile-nav="frame"] [data-phase] header [role="tablist"]::-webkit-scrollbar {
    display: none;
  }
  [data-mobile-nav="frame"] [data-phase] header [role="tablist"] > button {
    flex-shrink: 0;
    white-space: nowrap;
    scroll-snap-align: start;
  }
  [data-mobile-nav="frame"] [data-phase] header:has(> *) {
    min-height: 0 !important;
    grid-template-rows: minmax(36px, auto) minmax(32px, auto) !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [role="tab"] {
    min-height: 32px !important;
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has(> *) {
      grid-template-rows: minmax(36px, auto) minmax(26px, auto) !important;
    }
    [data-mobile-nav="frame"] [data-phase] header [role="tab"] {
      min-height: 26px !important;
    }
  }
  @media (max-height: 480px) and (orientation: landscape) {
    [data-mobile-nav="frame"] [data-phase] header:has(> *) {
      grid-template-rows: minmax(36px, auto) minmax(24px, auto) !important;
    }
    [data-mobile-nav="frame"] [data-phase] header [role="tab"] {
      min-height: 24px !important;
    }
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_titleCluster"] {
    padding-right: 0 !important;
    margin-right: 46px !important;
  }
  @media (max-width: 559px) {
    [data-mobile-nav="frame"] [data-phase] header [class*="_crumbs"] {
      padding-right: 8px;
    }
  }
  @media (max-width: 359px) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_crumbs"] [class*="_root"]):has([class*="_headerActions"] [class*="_root"]) [class*="_label"]:has(> svg) {
      display: none !important;
    }
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_menu"] {
    left: auto !important;
    right: 8px !important;
    width: min(336px, calc(100vw - 16px));
    max-width: none;
    max-height: min(420px, calc(100vh - 120px));
    max-height: min(420px, calc(100dvh - 120px));
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    padding-left: 8px !important;
    padding-right: 8px !important;
    padding-top: 0 !important;
    min-height: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) > :first-child {
    flex-wrap: nowrap !important;
    align-items: center !important;
    gap: 0 !important;
    padding-left: 32px !important;
    padding-right: 0 !important;
    padding-top: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-mobile-nav="toggle"] {
    top: 6px !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerLeading"] {
    padding: 0 !important;
    padding-left: 32px !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has(> [data-conversation-header-leading]) > [data-conversation-header-leading] {
    width: auto !important;
    min-width: 0 !important;
    padding: 0 !important;
    gap: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has(> [data-conversation-header-leading]) [data-slot="conversation.header.leading"] {
    display: none !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has(> [data-conversation-header-leading]) [class*="_titleRow"] {
    box-sizing: border-box !important;
    padding-left: 32px !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) > :first-child > :first-child {
    flex: 0 0 auto !important;
    width: auto !important;
    min-width: 0 !important;
    gap: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleCluster"] :is(button, [role="button"]):not([class*="QsffPG_root"] button):not([class*="ZKlsPq_root"] button) {
    min-width: 0 !important;
    min-height: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleCluster"] {
    display: flex !important;
    flex-wrap: nowrap !important;
    flex: 1 1 auto !important;
    width: auto !important;
    max-width: none !important;
    min-width: 0 !important;
    min-height: 40px !important;
    gap: 0 4px !important;
    justify-content: flex-start !important;
    align-items: center !important;
    overflow-x: auto !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleCluster"] > [class*="_crumbs"] {
    flex: 1 1 auto !important;
    width: auto !important;
    min-width: 72px !important;
    max-width: none !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    min-height: 0 !important;
    padding-right: 0 !important;
    overflow: visible !important;
    white-space: nowrap !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_crumbs"] [class*="_crumbCurrent"] {
    flex: 0 1 auto !important;
    width: auto !important;
    min-width: 0 !important;
    max-width: 100px !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    text-overflow: clip !important;
    white-space: nowrap !important;
    text-align: left !important;
    justify-content: flex-start !important;
    touch-action: pan-x !important;
    overscroll-behavior-x: contain !important;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_crumbs"] [class*="_crumbCurrent"]::-webkit-scrollbar {
    display: none;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_crumbs"] [class*="_crumbSeg"] > button {
    flex: 0 1 auto !important;
    min-width: 0 !important;
    max-width: 80px !important;
    overflow-x: hidden !important;
    overflow-y: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    text-align: left !important;
    touch-action: pan-x !important;
    overscroll-behavior-x: contain !important;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_crumbs"] [class*="_crumbSeg"] {
    flex: 0 1 auto !important;
    min-width: 0 !important;
    justify-content: flex-start !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerActions"] {
    flex: 0 0 auto !important;
    width: auto !important;
    max-width: none !important;
    min-height: 36px !important;
    margin-left: auto !important;
    padding: 0 !important;
    border-top: 0 !important;
    justify-content: flex-end !important;
    gap: 4px !important;
    overflow-x: auto !important;
    scrollbar-width: none;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerActions"]::-webkit-scrollbar {
    display: none;
  }
  [data-mobile-nav="frame"] [data-phase] [data-mobile-nav="stats"] {
    justify-content: flex-start !important;
    gap: 6px !important;
  }
  [data-mobile-nav="frame"] [data-phase] [data-mobile-nav="stats"] [class*="_sep"] {
    margin: 0 2px !important;
  }
  [data-mobile-nav="frame"] [data-phase] [data-mobile-nav="stats"] [class*="_pill"] {
    padding-left: 6px !important;
    padding-right: 6px !important;
  }
  [data-mobile-nav="frame"] [data-phase] [data-composer-dock]:has([data-composer-stat]) {
    gap: 8px !important;
  }
  [data-mobile-nav="frame"] [data-phase] [data-composer-dock] > [data-mobile-nav="stats"] {
    flex: 1 1 auto !important;
    width: auto !important;
    gap: 12px !important;
  }
  [data-mobile-nav="frame"] [data-phase] [data-composer-dock] [data-composer-stat] {
    margin: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] [data-composer-dock] [data-composer-stat] [class*="_pill"] {
    padding-right: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] [data-composer-dock] [data-composer-stat] [class*="_pill"] {
    padding-left: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] [data-composer-dock] > :not([data-mobile-nav]):not(:has([data-composer-stat])):has(circle[stroke-dasharray]) {
    flex: 0 0 auto !important;
    margin-left: auto !important;
  }
  [data-mobile-nav="frame"] [data-phase] [data-composer-dock] > :not([data-mobile-nav]):not(:has([data-composer-stat])):has(circle[stroke-dasharray]) button {
    padding: 0 !important;
    gap: 0 !important;
    position: relative !important;
  }
  [data-mobile-nav="frame"] [data-phase] [data-composer-dock] > :not([data-mobile-nav]):not(:has([data-composer-stat])):has(circle[stroke-dasharray]) button::after {
    content: "";
    position: absolute;
    inset: -8px -6px;
  }
  [data-mobile-nav="frame"] [data-phase] [data-composer-dock] > :not([data-mobile-nav]):not(:has([data-composer-stat])):has(circle[stroke-dasharray]) button > span {
    display: none !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-mobile-nav="files"] {
    width: 36px !important;
    height: 36px !important;
    flex: 0 0 36px !important;
    top: 2px !important;
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-mobile-nav="files"] {
      width: 30px !important;
      height: 30px !important;
      flex: 0 0 30px !important;
      top: 5px !important;
    }
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleRow"] > [class*="_headerCorner"] {
    display: none !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) > :first-child > :last-child[class*="_headerCorner"] {
    display: flex !important;
    flex: 0 0 auto !important;
    margin-left: 4px !important;
    margin-right: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerCorner"] button {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
    min-height: 36px !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerUtilities"] {
    display: none !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [role="tablist"] {
    flex: 1 1 auto !important;
    min-width: 0 !important;
    width: auto !important;
    margin-top: 4px !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    position: relative !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [role="tablist"] {
    padding-right: 8px !important;
    box-sizing: border-box !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-team-action][class*="_root"] {
    flex: 0 1 auto !important;
    min-width: 28px !important;
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-team-action][class*="_root"] {
      left: 3px !important;
    }
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerActions"] div:has(> button[class*="_trigger"] > [class*="_count"]) {
      order: 9 !important;
    }
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerActions"] button[class*="_trigger"] > [class*="_count"] {
      display: none !important;
    }
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_menu"]:not([class*="_menuAnchor"]) {
    position: fixed !important;
    left: 8px !important;
    right: 8px !important;
    top: calc(env(safe-area-inset-top, 0px) + 80px) !important;
    bottom: auto !important;
    width: auto !important;
    max-width: none !important;
    max-height: calc(100vh - 96px) !important;
    max-height: calc(100dvh - 96px) !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-team-action] [class*="_panel"] {
    position: fixed !important;
    left: 8px !important;
    right: 8px !important;
    top: calc(env(safe-area-inset-top, 0px) + 80px) !important;
    bottom: auto !important;
    width: auto !important;
    max-width: none !important;
    max-height: calc(100vh - 200px) !important;
    max-height: calc(100dvh - 200px) !important;
    white-space: normal !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"] {
    position: absolute !important;
    left: 104px !important;
    right: 8px !important;
    bottom: 0 !important;
    height: 21px !important;
    min-height: 21px !important;
    align-items: stretch !important;
    z-index: 3 !important;
    margin: 0 auto !important;
    width: max-content !important;
    min-width: 0 !important;
    max-width: min(32vw, 116px) !important;
    flex: 0 0 auto !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"] > button {
    height: 21px !important;
    min-height: 21px !important;
    line-height: 16px !important;
    padding: 0 4px 5px !important;
    align-items: center !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has([role="tablist"] button:nth-of-type(3)) [class*="ZKlsPq_root"]:not([class*="_switcherRoot"]),
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has([role="tablist"] > button:nth-child(3)) [class*="ZKlsPq_root"]:not([class*="_switcherRoot"]) {
    left: auto !important;
    right: 8px !important;
    margin: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has([class*="viewsMoreAnchor"]) [class*="ZKlsPq_root"]:not([class*="_switcherRoot"]) {
    left: auto !important;
    right: 34px !important;
    margin: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]),
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) * {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"])::-webkit-scrollbar,
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) *::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_switcherRoot"] {
    max-width: min(46vw, 180px) !important;
    overflow: hidden !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_switcherRoot"] > button {
    max-width: 100% !important;
    min-width: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"][class*="_switcherRoot"] {
    position: absolute !important;
    left: auto !important;
    right: 8px !important;
    top: 48px !important;
    bottom: auto !important;
    margin: 0 !important;
    transform: none !important;
    z-index: 3 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"]:not([class*="_switcherRoot"]) {
    position: absolute !important;
    left: auto !important;
    right: 8px !important;
    top: 48px !important;
    bottom: auto !important;
    margin: 0 !important;
    transform: none !important;
    z-index: 3 !important;
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"]:not([class*="_switcherRoot"]),
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"][class*="_switcherRoot"] {
      top: auto !important;
      bottom: -2px !important;
    }
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="SVAs4q_label"] {
      position: relative !important;
      margin-right: 2px !important;
      flex: 0 1 auto !important;
      min-width: 0 !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      border-radius: 999px !important;
    }
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="SVAs4q_label"]::before {
      content: '' !important;
      position: absolute !important;
      inset: -1px -5px !important;
      border-radius: 999px !important;
      background: transparent !important;
      pointer-events: none !important;
    }
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-team-action][class*="_root"] > button,
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="VoX2oq_trigger"] {
      padding-left: 2px !important;
    }
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) > [class*="_titleCluster"],
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleCluster"] > [class*="_headerActions"] {
    position: static !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"] span:not([class*="_separator"]) {
    display: block !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    min-width: 0 !important;
    max-width: 100% !important;
  }
  @media (max-width: 767px) {
    [data-mobile-nav="frame"] [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) {
      --dsh-composer-model-text-display: none;
      --dsh-composer-model-icon-display: block;
    }
    [data-mobile-nav="frame"] [data-phase] [class*="_7KE1Ra_trigger"] {
      padding: 0 !important;
      gap: 0 !important;
    }
    [data-mobile-nav="frame"] [data-phase] [class*="_7KE1Ra_chevron"] {
      margin-left: 0 !important;
    }
  }
  [data-mobile-nav="frame"] [data-phase] [class*="_7KE1Ra_trigger"] {
    max-width: min(360px, 60cqw) !important;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) {
    position: absolute !important;
    left: 8px !important;
    top: calc(env(safe-area-inset-top, 0px) + 12px) !important;
    width: calc(100vw - 16px);
    max-width: calc(100vw - 16px);
    height: auto;
    max-height: min(800px, calc(100vh - 24px - env(safe-area-inset-top, 0px)));
    max-height: min(800px, calc(var(--dsh-web-mobile-vh, 100dvh) - 24px - env(safe-area-inset-top, 0px)));
    transition: max-height .2s var(--ds-ease-out, ease-in-out);
    flex-direction: column !important;
    border-radius: 14px !important;
    animation: dsh-web-mobile-sheet-in .22s var(--ds-ease-out, ease-in-out);
  }
  :has(> [aria-modal="true"][data-shortcut-modal="settings"]) > [class*="_mask"] {
    animation: dsh-web-mobile-fade .18s var(--ds-ease-out, ease-in-out);
  }
  @media (prefers-reduced-motion: reduce) {
    [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]),
    :has(> [aria-modal="true"][data-shortcut-modal="settings"]) > [class*="_mask"] {
      animation: none !important;
    }
  }
  [aria-modal="true"]:not(:has(> :first-child > :last-child > button)) {
    max-width: calc(100vw - 32px);
  }
  div[role="dialog"][aria-modal="true"]:has(> :first-child > img) {
    left: 0 !important;
    right: 0 !important;
    width: auto !important;
    max-width: none !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    touch-action: none !important;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child {
    width: 100%;
    flex-direction: row !important;
    align-items: center;
    gap: 6px;
    padding: 10px 12px 8px;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child > :first-child {
    display: none !important;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child [class*="_navList"] {
    flex: 1 1 auto;
    min-width: 0;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    gap: 6px;
    margin-right: 42px;
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child [class*="_navList"]::-webkit-scrollbar {
    height: 2px !important;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child [class*="_navList"]::-webkit-scrollbar-thumb {
    background: var(--dsw-alias-border-l2, rgba(0, 0, 0, .22)) !important;
    border-radius: 1px !important;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child [class*="_navList"]::-webkit-scrollbar-track {
    background: transparent !important;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child [class*="_navCell"] {
    flex: 0 0 auto !important;
    white-space: nowrap !important;
    padding: 6px 8px !important;
    gap: 6px !important;
    font-size: 13px !important;
    justify-content: flex-start !important;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child [class*="_navCell"] svg {
    width: 14px !important;
    height: 14px !important;
    flex: none !important;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) {
    position: absolute;
    top: 10px;
    right: 12px;
    z-index: 10;
    flex: 0 0 auto;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    padding: 0 0 0 4px;
    height: 32px;
    min-height: 32px;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) > * {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) > :last-child {
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 50% !important;
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06)) !important;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) > :last-child::after {
    content: "";
    position: absolute;
    inset: -6px -6px 0 -6px;
    border-radius: 50%;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) [class*="_actions"] {
    display: none !important;
  }
  [aria-modal="true"] [class*="_cubeRow"] {
    gap: 6px;
  }
  [aria-modal="true"] [class*="_cubeRow"] > * {
    flex: 1 1 0;
    flex-direction: row !important;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 8px;
    min-height: 0;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child {
    flex: 1 1 auto;
    min-height: 0;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > :last-child {
    padding: 0 12px 24px;
  }
  [data-mobile-nav="frame"] section[data-plugin-panel] {
    --dsh-web-mobile-panel-clearance: calc(56px - clamp(24px, 4vw, 48px));
  }
  [data-mobile-nav="frame"] section[data-plugin-panel] [class*="_pageHead"] {
    margin-left: var(--dsh-web-mobile-panel-clearance) !important;
    width: calc(100% - var(--dsh-web-mobile-panel-clearance)) !important;
  }
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-detail] > button:first-child,
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-item-detail] > button:first-child,
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-row-detail] > button:first-child,
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-detail] button[class*="_crumb"],
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-item-detail] button[class*="_crumb"],
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-row-detail] button[class*="_crumb"] {
    margin-left: var(--dsh-web-mobile-panel-clearance) !important;
  }
  [data-mobile-nav="frame"] [class*="_pageHeading"] > h1 {
    margin-left: var(--dsh-web-mobile-panel-clearance, calc(56px - clamp(24px, 4vw, 48px))) !important;
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] section[data-plugin-panel] [class*="_pageHeading"] {
      flex: 1 1 auto !important;
      min-width: 0 !important;
      margin-left: 0 !important;
      width: auto !important;
    }
    [data-mobile-nav="frame"] section[data-plugin-panel] [class*="_toolbar"] {
      flex: 0 0 auto !important;
      margin-left: auto !important;
    }
    [data-mobile-nav="frame"] section[data-plugin-panel] [class*="_pageHeading"] > h1 {
      margin-left: 0 !important;
    }
  }
  [aria-modal="true"][data-shortcut-modal="shortcuts"] {
    position: absolute !important;
    left: 8px !important;
    top: calc(env(safe-area-inset-top, 0px) + 12px) !important;
    width: calc(100vw - 16px) !important;
    max-width: calc(100vw - 16px) !important;
    max-height: min(760px, calc(var(--dsh-web-mobile-vh, 100dvh) - 24px - env(safe-area-inset-top, 0px))) !important;
    transition: max-height .2s var(--ds-ease-out, ease-in-out);
    transform: none !important;
    border-radius: 14px !important;
    animation: none !important;
  }
  @media (max-width: 767px) {
    [aria-modal="true"][data-shortcut-modal="shortcuts"] [class*="_searchRow"] {
      display: none !important;
    }
  }
  :has(> [aria-modal="true"][data-shortcut-modal="shortcuts"]) > [class*="_mask"]::after {
    animation: none !important;
    background: transparent !important;
  }
  li[data-plugin-package],
  li[data-plugin-row],
  li[data-plugin-item] {
    position: relative !important;
  }
  li[data-plugin-package] button[class*="_cardOpen"]::after,
  li[data-plugin-row] button[class*="_rowOpen"]::after,
  li[data-plugin-item] button[class*="_cardOpen"]::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    z-index: 1;
  }
  li[data-plugin-package] :is(button:not([class*="_cardOpen"]), a, input),
  li[data-plugin-row] :is(button:not([class*="_rowOpen"]), a, input),
  li[data-plugin-item] :is(button:not([class*="_cardOpen"]), a, input) {
    position: relative;
    z-index: 2;
  }
  @keyframes dsh-web-mobile-panel-in {
    from { opacity: .55; transform: translateX(100%); }
  }
  @keyframes dsh-web-mobile-panel-reveal {
    from { opacity: 0; transform: translateX(-14px); }
  }
  [data-mobile-nav="frame"]:has([class*="panelRow"][aria-current="page"]) [class*="_centerCol"] > * > * {
    animation: dsh-web-mobile-panel-in .28s cubic-bezier(0, 0, .2, 1) backwards;
  }
  [data-mobile-nav="frame"][data-mobile-panel-exit]:not(:has([class*="panelRow"][aria-current="page"])) [class*="_centerCol"] > * > * {
    animation: dsh-web-mobile-panel-reveal .18s cubic-bezier(0, 0, .2, 1) backwards;
  }
  [data-mobile-nav="panel-ghost"] {
    position: fixed;
    inset: 0;
    z-index: 1200;
    pointer-events: none;
    overflow: hidden;
    background: var(--dsw-alias-bg-layer-1, #fff);
    animation: dsh-web-mobile-panel-ghost-out .28s cubic-bezier(.4, 0, .2, 1) both;
  }
  [data-mobile-nav="panel-ghost"] > * {
    width: 100%;
    height: 100%;
  }
  @keyframes dsh-web-mobile-panel-ghost-out {
    to { opacity: .72; transform: translateX(100%); }
  }
  [data-mobile-nav="frame"] [class*="scrollBody"] [class*="_scroll"]:not([class*="scrollBody"]) > * {
    content-visibility: auto;
    contain-intrinsic-size: auto 320px;
  }
  [data-mobile-nav="frame"] [class*="_textDocument"] [class*="_line"] {
    content-visibility: auto;
    contain-intrinsic-size: auto 20px;
  }
  @media (prefers-reduced-motion: reduce) {
    [data-mobile-nav="frame"]:has([class*="panelRow"][aria-current="page"]) [class*="_centerCol"] > * > *,
    [data-mobile-nav="panel-ghost"],
    [data-mobile-nav="frame"][data-mobile-panel-exit]:not(:has([class*="panelRow"][aria-current="page"])) [class*="_centerCol"] > * > * {
      animation: none !important;
    }
  }
  [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor {
    order: 1;
    width: max-content;
    flex: 0 1 auto;
    min-width: 0;
    max-width: min(40vw, 130px);
    margin-left: auto;
  }
  [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor [data-dsha-agent-preset="header"] {
    display: inline-flex !important;
    align-items: center;
    gap: 4px;
    width: 100%;
    max-width: 100%;
    height: 36px !important;
    min-height: 36px !important;
    padding: 0 4px;
    border: 0;
    background: transparent;
    font: inherit;
    font-size: 12px;
  }
  [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor [data-dsha-agent-preset="header"] > svg {
    position: static !important;
    transform: none !important;
    flex: 0 0 auto;
  }
  [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor [data-dsha-agent-preset="header"] > span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor [data-dsha-agent-preset="header"] > svg:last-of-type {
    transition: transform .12s;
  }
  [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor [data-dsha-agent-preset="header"][aria-expanded="true"] > svg:last-of-type {
    transform: rotate(180deg) !important;
  }
  @media (prefers-reduced-motion: reduce) {
    [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor [data-dsha-agent-preset="header"] > svg:last-of-type {
      transition: none !important;
    }
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor {
      left: 0 !important;
    }
    [data-mobile-nav="frame"] [data-phase] header:has([data-team-action]) .dsha-preset-header-anchor [data-dsha-agent-preset="header"] > span {
      max-width: 4em;
    }
  }
  [data-mobile-nav="frame"] [class*="sessionRow"] [class*="_rowActions"] {
    display: inline-flex !important;
  }
  [data-mobile-nav="frame"] [class*="sessionRow"] [class*="_rowActions"] :is([aria-label="归档会话"], [aria-label="取消归档"], [aria-label="置顶会话"], [aria-label="取消置顶"], [aria-label="Archive session"], [aria-label="Unarchive session"], [aria-label="Pin session"], [aria-label="Unpin session"]) {
    display: none !important;
  }
  [data-question-key] [class*="_headerActions"] {
    gap: 12px !important;
  }
  [data-question-key] [class*="_iconButton"] {
    position: relative;
  }
  [data-question-key] [class*="_headerActions"] [class*="_iconButton"]::after {
    content: '';
    position: absolute;
    inset: -4px;
  }
  [data-mobile-nav="frame"] [data-question-key] [class*="_body"] {
    min-width: 0;
    overflow-x: hidden !important;
  }
  [data-mobile-nav="frame"] [data-question-key] [class*="_title"],
  [data-mobile-nav="frame"] [data-question-key] [class*="_detail"],
  [data-mobile-nav="frame"] [data-question-key] [class*="_reviewNote"] {
    overflow-wrap: anywhere;
  }
  [data-mobile-nav="frame"] [data-question-key] [class*="_optionLabel"],
  [data-mobile-nav="frame"] [data-question-key] [class*="_description"] {
    min-width: 0;
    overflow-wrap: anywhere;
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-question-key] [class*="_frame"] {
      padding-left: var(--dsh-composer-side-clearance, 16px) !important;
      padding-right: var(--dsh-composer-side-clearance, 16px) !important;
    }
    [data-mobile-nav="frame"] [data-question-key] [class*="_header"]:not([class*="_headerActions"]) {
      position: relative;
      padding: 10px 8px 0 12px !important;
    }
    [data-mobile-nav="frame"] [data-question-key] [class*="_headerActions"] {
      position: absolute;
      top: 10px;
      right: 6px;
      gap: 20px !important;
      z-index: 1;
    }
    [data-mobile-nav="frame"] [data-question-key] [class*="_headerActions"] [class*="_iconButton"] {
      position: relative;
    }
    [data-mobile-nav="frame"] [data-question-key] [class*="_headerActions"] [class*="_iconButton"]::after {
      content: '';
      position: absolute;
      inset: -10px;
    }
    [data-mobile-nav="frame"] [data-question-key] [class*="_headingBlock"] {
      flex: 1 1 100%;
      min-width: 0;
    }
    [data-mobile-nav="frame"] [data-question-key] [class*="_eyebrow"] {
      margin-right: 116px;
    }
    [data-mobile-nav="frame"] [data-question-key] [class*="_title"] {
      padding-top: 2px;
      font-size: 15px;
      line-height: 23px;
    }
    [data-mobile-nav="frame"] [data-question-key] [class*="_card"]:not([class*="_cardMinimized"]) {
      overflow-x: hidden !important;
      overflow-y: auto !important;
      overscroll-behavior: contain;
      touch-action: pan-y pinch-zoom;
      scrollbar-width: none;
    }
    [data-mobile-nav="frame"] [data-question-key] [class*="_card"]::-webkit-scrollbar {
      display: none;
    }
    [data-mobile-nav="frame"] [data-question-key] [class*="_card"]:not([class*="_cardMinimized"]) > [class*="_body"] {
      flex: 0 0 auto !important;
      overflow: visible !important;
      overscroll-behavior: auto !important;
    }
    [data-mobile-nav="frame"] [data-question-key] [class*="_card"]:not([class*="_cardMinimized"]) > [class*="_footer"] {
      position: sticky;
      bottom: -10px;
      z-index: 1;
      background: var(--dsw-specific-input-major);
      padding-top: 8px !important;
      padding-bottom: 10px !important;
      margin-top: 4px !important;
      margin-bottom: -10px !important;
    }
    [data-mobile-nav="frame"] [data-question-key] [class*="_header"]:not([class*="_headerActions"]) {
      position: relative;
      padding-bottom: 8px;
    }
    [data-mobile-nav="frame"] [data-question-key] [class*="_options"] {
      padding-left: 8px;
      padding-right: 8px;
    }
    [data-mobile-nav="frame"] [data-question-key] [class*="_detail"] p {
      margin: 0 0 8px;
    }
    [data-mobile-nav="frame"] [data-question-key] [class*="_detail"] p:last-child {
      margin-bottom: 0;
    }
  }
  [data-mobile-nav="frame"] [data-question-key] [class*="_headerActions"] [data-mobile-nav="question-expand"] {
    position: relative;
    display: grid;
    place-items: center;
    flex: none;
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: 0 0;
    color: var(--dsw-alias-label-tertiary);
    cursor: pointer;
  }
  [data-mobile-nav="frame"] [data-question-key] [class*="_headerActions"] [data-mobile-nav="question-expand"]::after {
    content: '';
    position: absolute;
    inset: -10px;
  }
  [data-mobile-nav="frame"] [data-question-key] [class*="_headerActions"] [data-mobile-nav="question-expand"] svg {
    width: 14px;
    height: 14px;
  }
  [data-mobile-nav="frame"] [data-mobile-nav="question-expand"] .dsh-web-mobile-question-collapse {
    display: none;
  }
  [data-mobile-nav="frame"][data-mobile-nav-question-full] [data-mobile-nav="question-expand"] .dsh-web-mobile-question-expand {
    display: none;
  }
  [data-mobile-nav="frame"][data-mobile-nav-question-full] [data-mobile-nav="question-expand"] .dsh-web-mobile-question-collapse {
    display: block;
  }
  [data-mobile-nav="frame"][data-mobile-nav-question-full] [data-question-key] [class*="_frame"] {
    --dsha-mobile-question-band: calc(
      var(--dsha-mobile-visible-vh) - var(--mobile-nav-header-h) - var(--dsha-mobile-question-reserve, 0px)
    );
  }
  [data-mobile-nav="frame"][data-mobile-nav-question-full] [data-question-key] [class*="_card"]:not([class*="_cardMinimized"]) {
    height: var(--dsha-mobile-question-band, auto);
    max-height: var(--dsha-mobile-question-band, min(60vh, 520px));
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header [class*="_titleCluster"] {
      padding-right: 0 !important;
      margin-right: 34px !important;
    }
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleCluster"] {
      gap: 0 6px !important;
    }
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_crumbs"] [class*="_crumbCurrent"] {
      max-width: 100% !important;
      overflow-x: hidden !important;
      text-overflow: ellipsis !important;
      touch-action: pan-y pinch-zoom !important;
    }
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerActions"] {
      gap: 6px !important;
    }
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has([data-mobile-nav="header-back"]) [class*="_titleRow"] {
      padding-left: 0 !important;
    }
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has([data-mobile-nav="header-back"]) [class*="_titleCluster"] {
      display: contents !important;
    }
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has([data-mobile-nav="header-back"]) [class*="_titleCluster"] > [class*="_headerActions"] {
      margin-left: 0 !important;
      justify-content: flex-start !important;
    }
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has([data-mobile-nav="header-back"]) [class*="_titleCluster"] > [class*="_crumbs"] {
      overflow: hidden !important;
    }
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] [data-chat-running]:not(:first-child) {
      margin-top: 4px !important;
    }
    [data-mobile-nav="frame"] [data-phase] [data-chat-running] [class*="_runningDivider"] {
      margin: 3px 0 4px !important;
    }
    [data-mobile-nav="frame"] [data-phase] [class*="_scroll"]:has(> [data-chat-flow]) {
      padding-bottom: 6px !important;
    }
    [data-mobile-nav="frame"] [data-phase] [data-chat-flow-kind="turn-tail"] {
      margin-top: 4px !important;
    }
    [data-mobile-nav="frame"] [data-phase="active"] [data-composer-card] [class*="_row"]:has(> [class*="_trailing"]) {
      padding-bottom: 6px !important;
    }
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) [class*="_add"] {
      width: 30px !important;
      min-width: 30px !important;
      height: 30px !important;
      min-height: 30px !important;
    }
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_primary"],
    [class*="_trailing"] > [class*="_primary"] {
      width: 30px !important;
      min-width: 30px !important;
      height: 30px !important;
      min-height: 30px !important;
      transform: none !important;
    }
    [data-mobile-nav="frame"] [data-phase] [data-composer-card] [data-mobile-nav="file-upload"] {
      width: 30px !important;
      min-width: 30px !important;
      max-width: 30px !important;
      height: 30px !important;
      min-height: 30px !important;
      margin-left: -9px !important;
    }
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) [class*="_add"] svg,
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_primary"] svg,
    [class*="_trailing"] > [class*="_primary"] svg,
    [data-mobile-nav="frame"] [data-phase] [data-composer-card] [data-mobile-nav="file-upload"] svg {
      width: 18px !important;
      height: 18px !important;
    }
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] [class*="_triggerIcon"],
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] [class*="_triggerIcon"] svg,
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [class*="_triggerIcon"],
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] button[class*="_trigger"]:not([aria-haspopup]) svg {
      width: 18px !important;
      height: 18px !important;
    }
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) [class*="_add"],
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [class*="_triggerAnchor"] > button,
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] [class*="_trigger"],
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_root"] > [class*="_trigger"],
    [data-mobile-nav="frame"] [data-phase] [data-composer-card] [data-mobile-nav="file-upload"] {
      color: var(--dsw-alias-label-secondary) !important;
    }
  }
}
`;var Jn=`@media (max-width: 1023px) and (pointer: coarse) {
  button[data-dsh-taskboard-entry],
  button[data-dsh-ssh-entry] {
    margin-bottom: 8px !important;
  }
  [data-dsh-taskboard-board] > [class*="_columns"] {
    grid-template-columns: repeat(5, minmax(240px, 1fr)) !important;
    overflow-x: auto !important;
  }
  html[data-dsh-taskboard-active] [data-mobile-nav="fab"],
  html[data-dsh-ssh-active] [data-mobile-nav="fab"],
  html[data-dsh-taskboard-active] [data-mobile-nav="backdrop"],
  html[data-dsh-ssh-active] [data-mobile-nav="backdrop"] {
    display: none !important;
  }
  [data-dsh-taskboard-board] > [class*="_boardHeader"] [class*="_search"] {
    flex: 1 1 auto !important;
    min-width: 80px !important;
  }
  [aria-modal="true"] [class*="_tabs"] {
    flex-wrap: wrap !important;
    row-gap: 8px !important;
  }
  [aria-modal="true"] [class*="_searchInline"] {
    flex: 1 1 100% !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  [data-dsh-market-root] [class*="tabSearch"] input,
  [data-dsh-market-root] input[class*="tabSearch"] {
    font-size: 16px !important;
  }
  [data-dsh-market-root] [class*="_opPanel"] {
    position: fixed !important;
    top: 50% !important;
    bottom: auto !important;
    left: 50% !important;
    right: auto !important;
    transform: translate(-50%, -50%) !important;
    z-index: 60 !important;
  }
  [data-dsh-market-root] [class*="_titleRow"] {
    flex-wrap: wrap !important;
    row-gap: 6px !important;
  }
  [data-dsh-market-root] [class*="_titleRow"] [class*="_title"] {
    flex: 0 1 auto !important;
    min-width: 0 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  [data-dsh-market-root] [class*="_titleRow"] button {
    white-space: nowrap !important;
  }
  [data-dsh-market-root] [class*="_byline"] {
    flex-wrap: nowrap !important;
  }
  [data-dsh-market-root] {
    margin-top: 12px !important;
  }
  @media (max-width: 360px) {
    [data-dsh-market-root] [class*="_byline"] {
      gap: 4px !important;
      font-size: 10px !important;
    }
    [data-dsh-market-root] [class*="_byline"] [class*="_dot"] {
      margin-left: 3px !important;
    }
  }
  @media (max-width: 560px) {
    [data-mobile-nav="frame"] [role="dialog"]:has([data-dsh-market-root]) > nav {
      display: flex !important;
    }
    [role="dialog"]:has([data-dsh-market-root]) > nav {
      display: flex !important;
    }
  }
  [class*="usg_"][class*="_statsRow"] {
    flex-direction: column !important;
  }
  [class*="usg_"][class*="_stat"]:not([class*="_statsRow"]) {
    flex: 0 0 auto !important;
    width: 100% !important;
    min-width: 0 !important;
  }
  [aria-modal="true"] details[class*="_customized"]:not([open]) > [class*="_customizedBody"] {
    display: none !important;
  }
  [role="dialog"][aria-modal="true"] [class*="_footer"] {
    flex-wrap: wrap !important;
  }
  [role="dialog"][aria-modal="true"] [class*="_footer"] button[class*="_button"] {
    white-space: nowrap !important;
  }
  [aria-modal="true"] [class*="_cubeRow"] > * {
    border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, .12)) !important;
  }
  [data-mobile-nav="frame"] [class*="_footerActions"] {
    flex-wrap: wrap !important;
    gap: 6px !important;
  }
  body:has([aria-modal="true"]) .dsh-pet-root,
  body:has([data-sidebar-right-open][data-sidebar-right-panel="fullscreen"]) .dsh-pet-root,
  body:has([aria-modal="true"]) > [class*="_float"]:has([class*="_sprite"][role="button"]),
  body:has([data-sidebar-right-open][data-sidebar-right-panel="fullscreen"])
    > [class*="_float"]:has([class*="_sprite"][role="button"]) {
    display: none !important;
  }
  [data-mobile-nav="stats"] {
    margin-top: -2px !important;
    display: flex !important;
    flex-flow: row nowrap !important;
    align-items: center !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    height: 28px !important;
    min-height: 28px !important;
    max-height: 28px !important;
    box-sizing: border-box !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    overscroll-behavior-x: none;
    scrollbar-width: none !important;
    padding: 0 !important;
    line-height: 18px !important;
    font-size: 10px !important;
  }
  [data-mobile-nav="stats"]::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  [data-mobile-nav="stats"] > * {
    display: flex !important;
    flex-flow: row nowrap !important;
    align-items: center !important;
    white-space: nowrap !important;
    margin-right: 6px !important;
    padding: 0 !important;
  }
  [data-mobile-nav="stats"] > *:first-child {
    flex: 0 0 auto !important;
    width: max-content !important;
    min-width: max-content !important;
    max-width: none !important;
  }
  [data-mobile-nav="stats"] > *:last-child {
    display: flex !important;
    align-items: center !important;
    flex: 0 1 auto !important;
    width: auto !important;
    min-width: 0 !important;
    max-width: none !important;
    overflow: hidden !important;
    margin-right: 0 !important;
  }
  [data-mobile-nav="stats"] > *:last-child > * {
    display: flex !important;
    align-items: center !important;
    min-width: 0 !important;
    max-width: 100% !important;
    overflow: hidden !important;
  }
  [data-mobile-nav="stats"] > *:last-child svg {
    flex: 0 0 auto !important;
  }
  [data-mobile-nav="stats"] > *:last-child span {
    flex: 0 1 auto !important;
    min-width: 0 !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  [data-mobile-nav="stats"] button {
    padding: 0 3px !important;
    margin: 0 !important;
    min-width: 0 !important;
    max-width: 100% !important;
  }
  [data-mobile-nav="stats"] button,
  [data-mobile-nav="stats"] button span,
  [data-mobile-nav="stats"] button svg,
  [data-mobile-nav="stats"] > * {
    font-size: 10px !important;
    line-height: 18px !important;
  }
  [data-mobile-nav="stats"] > *:not(:last-child) {
    margin-right: 3px !important;
  }
  [data-mobile-nav="stats"] * {
    white-space: nowrap !important;
  }
  [data-mobile-nav="stats-ring"] {
    position: absolute !important;
    flex: 0 0 auto !important;
    display: inline-flex !important;
    align-items: center !important;
    min-width: 0 !important;
    margin: 0 2px 0 0 !important;
    padding: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    border: 0 !important;
  }
  [data-mobile-nav="stats-ring"],
  [data-mobile-nav="stats-ring"] * {
    font-size: 0 !important;
  }
  [data-mobile-nav="stats-ring"] button {
    padding: 0 !important;
    margin: 0 !important;
    gap: 0 !important;
    min-width: 0 !important;
    width: auto !important;
    background: transparent !important;
    box-shadow: none !important;
    border: 0 !important;
  }
  [data-mobile-nav="stats-ring"] svg {
    display: inline-block !important;
    width: 18px !important;
    height: 18px !important;
    flex: 0 0 auto !important;
  }
  [data-mobile-nav="stats-ring"] [class*="_track"] {
    stroke: color-mix(in srgb, var(--dsw-alias-label-primary, #000) 25%, transparent) !important;
  }
  [data-mobile-nav="stats-ring-reserve"],
  [data-mobile-nav="stats-tps-reserve"] {
    visibility: hidden !important;
    pointer-events: none !important;
  }
  [data-mobile-nav="stats-ring-reserve"] {
    flex: 0 0 auto !important;
    display: inline-block !important;
    width: 18px !important;
    height: 18px !important;
    margin: 0 2px 0 0 !important;
    padding: 0 !important;
  }
  [data-mobile-nav="stats-tps"] {
    display: flex !important;
    flex-flow: row nowrap !important;
    align-items: center !important;
    margin: 0 !important;
    padding: 0 !important;
    font-size: 10px !important;
    line-height: 18px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  [data-mobile-nav="stats-tps"] * {
    white-space: nowrap !important;
  }
  [data-mobile-nav="stats-tps"] span {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    min-width: 0 !important;
  }
  [data-mobile-nav="stats-ring-dock"],
  [data-mobile-nav="stats-tps-row"] {
    position: relative;
  }
  [data-mobile-nav="frame"] [data-genui-panel] {
    margin: 6px 12px 4px !important;
    border-color: var(--dsw-alias-border-l1, rgba(0, 0, 0, .12)) !important;
    border-radius: 12px !important;
  }
  [data-mobile-nav="frame"] [data-genui-panel] [class*="_panelToggle"] {
    padding: 7px 12px !important;
    gap: 8px !important;
  }
  [data-mobile-nav="frame"] [data-genui-panel] [class*="_panelBadge"] {
    padding: 0 7px !important;
    border-radius: 5px !important;
    font-size: 10.5px !important;
    line-height: 1.7 !important;
  }
  [data-mobile-nav="frame"] [data-genui-panel] [class*="_panelTitle"] {
    flex: 1 1 auto !important;
    min-width: 0 !important;
    font-size: 12.5px !important;
    line-height: 1.45 !important;
  }
  [data-mobile-nav="frame"] [data-genui-panel] [class*="_panelChevron"] {
    flex: none !important;
    margin-left: 0 !important;
    padding-left: 4px !important;
  }
  [data-mobile-nav="frame"] [class*="_composerStack"] {
    position: relative;
  }
  [data-mobile-nav="frame"] [data-gitgraph-chip-anchor] {
    position: absolute !important;
    top: 12px !important;
    left: 28px !important;
    right: auto !important;
    bottom: auto !important;
    z-index: 1 !important;
  }
  [data-mobile-nav="frame"] [data-phase="hero"] [data-gitgraph-chip-anchor] {
    top: 134.9px !important;
  }
  [data-mobile-nav="frame"] [class*="_composerStack"]:has([data-gitgraph-chip-anchor]) [class*="_card"]:has(textarea, [data-composer-input]) {
    padding-top: 44px !important;
  }
  [data-mobile-nav="frame"] .meme-picker {
    left: 0 !important;
    right: 0 !important;
    width: auto !important;
    box-sizing: border-box !important;
    max-width: 386px !important;
  }
  [data-mobile-nav="frame"] .meme-picker .mp-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(64px, 1fr)) !important;
    scrollbar-width: thin !important;
    scrollbar-color: var(--dsw-alias-label-tertiary, rgba(0, 0, 0, .3)) transparent !important;
  }
  [data-mobile-nav="frame"] .meme-picker .mp-cell {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 1 !important;
  }
  [data-mobile-nav="frame"] .meme-picker .mp-grid::-webkit-scrollbar {
    width: 4px !important;
  }
  [data-mobile-nav="frame"] .meme-picker .mp-grid::-webkit-scrollbar-thumb {
    background: var(--dsw-alias-label-tertiary, rgba(0, 0, 0, .3)) !important;
    border-radius: 999px !important;
  }
  [data-mobile-nav="frame"] .meme-picker .mp-grid::-webkit-scrollbar-track {
    background: transparent !important;
  }
  [role="menu"]:has([class*="cubgiG_item"]) {
    top: auto !important;
    left: 50% !important;
    right: auto !important;
    bottom: 12px !important;
    transform: translateX(-50%) !important;
    width: min(100% - 24px, 360px) !important;
    max-width: 360px !important;
    max-height: min(55vh, 440px) !important;
    max-height: min(55dvh, 440px) !important;
    padding: 30px 6px 10px !important;
    border-radius: 16px !important;
  }
  [role="menu"]:has([class*="cubgiG_item"])::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 36px;
    height: 4px;
    border-radius: 999px;
    background: var(--dsw-alias-border-l2, rgba(0, 0, 0, .22)) !important;
    pointer-events: none;
  }
  [role="menu"]:has([class*="cubgiG_item"]) [class*="_viewport_"] {
    scrollbar-width: thin !important;
    scrollbar-color: var(--dsw-alias-label-tertiary, rgba(0, 0, 0, .3)) transparent !important;
  }
  [role="menu"]:has([class*="cubgiG_item"]) [class*="_viewport_"]::-webkit-scrollbar {
    width: 4px !important;
  }
  [role="menu"]:has([class*="cubgiG_item"]) [class*="_viewport_"]::-webkit-scrollbar-thumb {
    background: var(--dsw-alias-label-tertiary, rgba(0, 0, 0, .3)) !important;
    border-radius: 999px !important;
  }
  [role="menu"]:has([class*="cubgiG_item"]) [class*="_viewport_"]::-webkit-scrollbar-track {
    background: transparent !important;
  }
  [aria-modal="true"] [class*="tabSearchRow"] {
  padding: 2px 4px 16px !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > div > [class*="spec"] {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  max-width: 100% !important;
  font-size: 12px !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > div > [class*="nm"] {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  max-width: 100% !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) {
    flex-wrap: wrap !important;
    align-items: center !important;
    gap: 4px 10px !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > div:first-child {
    flex: 1 1 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > [class*="grow"] {
    flex: 1 1 auto !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > button {
    flex: 0 0 auto !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > button[class*="switch"] {
    order: 3 !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > button:not([class*="switch"]) {
    order: 2 !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > [class*="owner"] {
    order: 1 !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > [class*="grow"] {
    order: 0 !important;
  }
  [data-mobile-nav="frame"] [class*="cardShots"] {
  display: flex !important;
  flex-wrap: nowrap !important;
  overflow-x: auto !important;
  -webkit-overflow-scrolling: touch !important;
  overscroll-behavior-x: contain !important;
  scrollbar-width: thin !important;
  min-width: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  gap: 8px !important;
  padding: 4px 0 !important;
  }
  [data-mobile-nav="frame"] [class*="cardShots"] > [class*="cardShot"] {
  flex: 0 0 min(100%, 420px) !important;
  width: min(100%, 420px) !important;
  max-width: 100% !important;
  height: auto !important;
  display: block !important;
  object-fit: contain !important;
  }
  [data-mobile-nav="frame"] [class*="cardShots"]::-webkit-scrollbar {
  height: 4px !important;
  }
  [data-mobile-nav="frame"] [class*="cardShots"]::-webkit-scrollbar-thumb {
  background: var(--ds-border-color, #ccc) !important;
  border-radius: 4px !important;
}
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-panel {
    min-width: 0 !important;
    max-width: 100% !important;
    overflow-x: hidden !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-titlebar {
    gap: 4px !important;
    padding: 6px 8px !important;
    flex-wrap: nowrap !important;
    min-width: 0 !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-titlebar-path {
    min-width: 0 !important;
    padding-right: 4px !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-path {
    font-size: 13px !important;
    min-width: 0 !important;
    max-width: 220px !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-titlebar-actions {
    flex-wrap: wrap !important;
    gap: 4px !important;
    justify-content: flex-end !important;
    margin-left: auto !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-toolbar-btn {
    min-height: 34px !important;
    padding: 0 10px !important;
    font-size: 13px !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-icon-btn,
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-back-btn {
    min-height: 34px !important;
    min-width: 34px !important;
  }
  @media (max-width: 480px) {
    [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-meta {
      display: none !important;
    }
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-statusbar {
    flex-wrap: wrap !important;
    gap: 4px 10px !important;
    padding: 4px 8px calc(4px + env(safe-area-inset-bottom, 0px)) !important;
    font-size: 12px !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-renderer,
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-renderer-stack,
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-scroll,
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-csv-scroll,
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-code-body {
    min-width: 0 !important;
    max-width: 100% !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-scroll,
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-csv-scroll {
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-browser-nav,
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-subtoolbar {
    flex-wrap: wrap !important;
    gap: 6px !important;
    padding: 4px 8px !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-file-row {
    min-height: 44px !important;
    padding: 8px 10px !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-file-list [class*="name"] {
    min-width: 0 !important;
  }
  [data-mobile-nav="frame"] .dsfv-produced-chip,
  [data-mobile-nav="frame"] .dsfv-produced-folder {
    min-height: 40px !important;
    padding: 0 12px !important;
  }
  @media (prefers-reduced-motion: reduce) {
    [data-mobile-nav="frame"][data-file-viewer-open] [class*="dsfv-"] {
      transition: none !important;
      animation: none !important;
    }
  }
  [data-files-body] li[data-files-entry="file"]:has(> [data-mobile-nav="file-share-row"]) {
    display: flex;
    align-items: center;
  }
  [data-files-body] li[data-files-entry="file"]:has(> [data-mobile-nav="file-share-row"]) > button:first-child {
    flex: 1 1 auto;
    min-width: 0;
  }
  [data-mobile-nav="file-share-row"],
  [data-mobile-nav="file-share-preview"] {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    border-radius: var(--dsw-radius-sm, 6px);
    background: transparent;
    color: var(--dsw-alias-label-tertiary, currentColor);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  [data-mobile-nav="file-share-row"] {
    width: 36px;
    height: 32px;
  }
  [data-mobile-nav="file-share-preview"] {
    width: 32px;
    height: 32px;
    color: var(--dsw-alias-label-secondary, currentColor);
  }
  [data-mobile-nav="file-share-row"] svg,
  [data-mobile-nav="file-share-preview"] svg {
    width: 16px;
    height: 16px;
  }
  [data-mobile-nav="file-share-row"]:active,
  [data-mobile-nav="file-share-preview"]:active {
    background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.16));
  }
  [data-mobile-nav="file-share-row"]:focus-visible,
  [data-mobile-nav="file-share-preview"]:focus-visible {
    outline: 2px solid var(--dsw-alias-border-focus, #4d6bfe);
    outline-offset: -2px;
  }
  [data-mobile-nav="file-share-row"][aria-busy="true"],
  [data-mobile-nav="file-share-preview"][aria-busy="true"] {
    opacity: 0.45;
    cursor: progress;
  }
  [data-mobile-nav="file-share-toast"] {
    position: fixed;
    left: 50%;
    bottom: calc(24px + env(safe-area-inset-bottom, 0px));
    z-index: 1500;
    max-width: min(90vw, 420px);
    padding: 8px 14px;
    border-radius: 10px;
    background: rgba(28, 28, 30, 0.92);
    color: #fff;
    font-size: 13px;
    line-height: 1.45;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .ofm_aurora {
    display: none !important;
  }
  .ofm_wave,
  .ofm_bubble,
  .ofm_fish,
  .ofm_tankrays {
    animation: none !important;
  }
  .ofm_nav,
  .ofm_glass,
  .ofm_hero,
  .ofm_panel,
  .ofm_ann,
  .ofm_modal,
  .ofm_toast {
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    background: var(--dsw-alias-bg-layer-2, #fff) !important;
  }
  .ofm_scrim {
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
  }
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] .md-table-wide {
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch;
    }
    [data-mobile-nav="frame"] .md-table-wide > table {
      width: auto !important;
      min-width: 100% !important;
    }
    [data-mobile-nav="frame"] .md-table-wide > table th {
      white-space: nowrap !important;
    }
    [data-mobile-nav="frame"] .md-table-wide > table th,
    [data-mobile-nav="frame"] .md-table-wide > table td {
      min-width: 4.5em !important;
    }
  }
  body > .ofm_toasts {
    z-index: 1310 !important;
  }
}
@media (max-width: 1023px) and (pointer: coarse) {
  [class*="GTtnTq_root"] [class*="_disclosure"][aria-expanded] {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 22px !important;
    height: 22px !important;
    font-size: 15px !important;
    line-height: 1 !important;
  }
  [class*="GTtnTq_objectTree"] details > summary::marker {
    font-size: 15px !important;
  }
  [class*="GTtnTq_modeSelector"] {
    font-size: 13px !important;
    padding: 4px 6px !important;
    min-height: 32px !important;
  }
  [class*="GTtnTq_table"] {
    border-collapse: separate !important;
    border-spacing: 0 !important;
  }
  [class*="GTtnTq_table"] [class*="GTtnTq_sticky"] {
    will-change: transform !important;
  }
}
`;var eo=`@media (max-width: 1023px) and (pointer: coarse) {
  [data-phase="hero"] [class*="_card"]:has(textarea, [data-composer-input]) {
    gap: 8px !important;
  }
  [data-phase="hero"] [class*="_composerStack"]:not(:has([data-gitgraph-chip-anchor])) [class*="_card"]:has(textarea, [data-composer-input]) {
    padding-top: 6px !important;
  }
  [data-phase="hero"] textarea:placeholder-shown {
    height: 28px !important;
  }
  [data-phase="hero"] [class*="_card"]:has(textarea:placeholder-shown) > [class*="_scroll"],
  [data-phase="hero"] [class*="_card"]:has(textarea:placeholder-shown) [class*="_grow"] {
    height: 28px !important;
  }
  [data-phase="hero"] [class*="_card"]:has(textarea, [data-composer-input]) > [class*="_row"] {
    padding-top: 2px !important;
  }
  [data-phase="hero"] [class*="_headline"] {
    line-height: 1.15 !important;
    margin-bottom: 0 !important;
  }
  [data-phase="hero"] [class*="_stack"] {
    gap: 0 !important;
  }
  [data-slot="conversation.input.dock"] [data-gitgraph-chip-anchor] {
    order: -1 !important;
  }
  [data-slot="conversation.input.dock"] [data-gitgraph-chip-anchor] [data-gitgraph-chip] {
    touch-action: manipulation !important;
    min-height: 34px !important;
    padding: 0 12px !important;
    font-size: 13px !important;
  }
  [data-slot="conversation.input.dock"] [data-gitgraph-chip-anchor] [data-gitgraph-chip]:active {
    transform: scale(.96) !important;
    transition: transform .12s !important;
  }
  [data-slot="conversation.input.dock"] .dsws-capsule {
    gap: 1px 3px !important;
    padding: 3px 4px !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    scrollbar-width: none !important;
  }
  [data-slot="conversation.input.dock"] .dsws-capsule::-webkit-scrollbar {
    display: none !important;
  }
  [data-slot="conversation.input.dock"] .dsws-capsule .dsws-capsule-word {
    padding: 2px 4px !important;
    column-gap: 3px !important;
  }
  [data-slot="conversation.input.dock"] .dsws-capsule .dsws-seg {
    padding: 2px 4px !important;
    gap: 3px !important;
  }
  [data-slot="conversation.input.dock"] .dsws-capsule .dsws-split .dsws-split-part {
    padding: 2px 4px !important;
  }
  [data-slot="conversation.input.dock"] .dsws-capsule .dsws-timebtn {
    padding: 2px 4px !important;
  }
  [data-slot="conversation.input.dock"] .dsws-capsule .dsws-skillbtn,
  [data-slot="conversation.input.dock"] .dsws-capsule .dsws-fold-toggle {
    padding: 1px 2px !important;
  }
  html[data-mobile-nav-ios] [data-question-key] [class*="_customInput"],
  html[data-mobile-nav-ios] [data-question-key] [class*="_customTextarea"] {
    font-size: 16px !important;
  }
  html[data-mobile-nav-ios] [data-mobile-nav="frame"] [class*="dsfv-search-input"],
  html[data-mobile-nav-ios] [data-mobile-nav="frame"] [class*="dsfv-jump-input"],
  html[data-mobile-nav-ios] [data-mobile-nav="frame"] [class*="dsfv-page-input"] {
    font-size: 16px !important;
  }
  html[data-mobile-nav-ios] textarea,
  html[data-mobile-nav-ios] [contenteditable]:not([contenteditable="false"]),
  html[data-mobile-nav-ios] [data-input-mirror],
  html[data-mobile-nav-ios] [data-input-backdrop],
  html[data-mobile-nav-ios] input:not([type="button"]):not([type="checkbox"]):not([type="color"]):not([type="file"]):not([type="hidden"]):not([type="image"]):not([type="radio"]):not([type="range"]):not([type="reset"]):not([type="submit"]) {
    font-size: 16px !important;
  }
  [data-mobile-nav="frame"] > [class*="_sidebarCol"] [role="tree"] {
    content-visibility: auto;
    contain-intrinsic-size: auto 600px;
  }
  [data-mobile-nav="frame"] > [class*="_sidebarCol"],
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]),
  [data-mobile-nav="frame"] [data-composer-card],
  [data-mobile-nav="stats"],
  [data-mobile-nav="fab"],
  [data-mobile-nav="backdrop"] {
    -webkit-user-select: none !important;
    user-select: none !important;
  }
  [data-mobile-nav="frame"] [data-composer-input],
  [data-mobile-nav="frame"] [data-composer-card] textarea,
  [data-mobile-nav="frame"] > [class*="_sidebarCol"] [role="dialog"],
  [data-mobile-nav="frame"] > [class*="_sidebarCol"] input,
  [data-mobile-nav="frame"] > [class*="_sidebarCol"] textarea,
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) input {
    -webkit-user-select: text !important;
    user-select: text !important;
  }
}
@media (min-width: 768px) and (max-width: 1023px) and (pointer: coarse) {
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])),
  [aria-modal="true"]:not(:has(> :first-child > :last-child > button)) {
    left: 0 !important;
    right: 0 !important;
    margin-left: auto !important;
    margin-right: auto !important;
    width: min(calc(100vw - 32px), 720px) !important;
    max-width: min(calc(100vw - 32px), 720px) !important;
  }
  [aria-modal="true"] [class*="_section"] {
    width: 100% !important;
    max-width: none !important;
  }
}
@media (min-width: 1024px), (pointer: fine), (pointer: none) {
  [data-mobile-nav="toggle"],
  [data-mobile-nav="files"],
  [data-mobile-nav="downloads"],
  [data-mobile-nav="file-upload"],
  [data-mobile-nav="fab"],
  [data-mobile-nav="backdrop"],
  [data-mobile-nav="session-log"],
  [data-mobile-nav="session-log-wrap"],
  [data-mobile-nav="quick-settings"],
  [data-mobile-nav="quick-settings-wrap"],
  [data-mobile-nav="question-expand"] {
    display: none !important;
  }
}
@media (pointer: fine), (pointer: none) {
  [data-mobile-nav="session-delete"],
  [data-mobile-nav="delete-dialog-backdrop"],
  [data-mobile-nav="delete-dialog"] {
    display: none !important;
  }
}
@media (min-width: 1024px) and (pointer: coarse) {
  [class*="sessionRow"] [class*="_rowActions"] {
    display: inline-flex !important;
  }
  [class*="sessionRow"] {
    min-height: 44px !important;
  }
  [class*="sessionRow"] [class*="_rowActions"] {
    gap: 4px !important;
  }
  [class*="sessionRow"] [class*="_rowActions"] button,
  [class*="sessionRow"] [class*="_rowActions"] [role="button"] {
    width: 40px !important;
    height: 40px !important;
    min-width: 40px !important;
    min-height: 40px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 !important;
    border-radius: 10px;
  }
  [class*="sessionRow"] [class*="_rowActions"] :is([aria-label="归档会话"], [aria-label="取消归档"], [aria-label="置顶会话"], [aria-label="取消置顶"], [aria-label="Archive session"], [aria-label="Unarchive session"], [aria-label="Pin session"], [aria-label="Unpin session"]) {
    display: none !important;
  }
  header [class*="viewsMore"],
  header [class*="viewsMoreAnchor"] {
    display: none !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) {
    position: absolute !important;
    left: 8px !important;
    top: calc(env(safe-area-inset-top, 0px) + 12px) !important;
    width: calc(100vw - 16px) !important;
    max-width: calc(100vw - 16px) !important;
    height: auto;
    max-height: calc(100dvh - 24px - env(safe-area-inset-top, 0px));
    flex-direction: column !important;
    border-radius: 14px !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child {
    width: 100%;
    flex-direction: row !important;
    align-items: center;
    gap: 6px;
    padding: 10px 12px 8px;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child > :first-child {
    display: none !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child [class*="_navList"] {
    flex: 1 1 auto;
    min-width: 0;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    overflow: visible !important;
    gap: 6px;
    margin-right: 42px;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child [class*="_navCell"] {
    flex: 0 0 auto !important;
    white-space: nowrap !important;
    padding: 6px 8px !important;
    gap: 6px !important;
    font-size: 13px !important;
    justify-content: flex-start !important;
  }
  [class*="titleCluster"] [class*="headerActions"] {
    flex: 1 1 auto !important;
  }
  [class*="titleCluster"] [class*="headerActions"] [class*="SVAs4q_label"] {
    order: -1 !important;
  }
  [class*="titleCluster"] [class*="headerActions"] [class*="VoX2oq_root"] {
    margin-left: auto !important;
  }
  [class*="titleCluster"] [class*="headerActions"] > div > :last-child {
    margin-right: auto !important;
  }
  [data-mobile-nav="quick-settings-wrap"],
  [data-mobile-nav="quick-settings"] {
    display: inline-flex !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) [class*="_actions"] {
    display: none !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) {
    position: absolute;
    top: 10px;
    right: 12px;
    z-index: 10;
    flex: 0 0 auto;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    padding: 0 0 0 4px;
    height: 32px;
    min-height: 32px;
  }
}
@media (max-width: 1023px) and (pointer: coarse) {
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="viewsMoreAnchor"] {
    flex: 0 0 auto !important;
  }
}
@media (max-width: 1023px) and (pointer: coarse) {
  body:has([data-mobile-nav="frame"]:not([data-sidebar-collapsed])) [class*="moreMenu"] {
    left: 8px !important;
    right: auto !important;
    max-width: calc(min(88vw, 280px) - 16px) !important;
  }
}
@media (max-width: 1023px) and (pointer: coarse) {
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-mobile-nav="downloads"] {
    display: none !important;
  }
}
[data-mobile-nav="session-log-menu"] {
  position: fixed;
  z-index: 1400;
  box-sizing: border-box;
  min-width: 200px;
  max-width: calc(100vw - 24px);
  padding: 4px;
  border: 0;
  border-radius: var(--dsw-radius-lg, 12px);
  background: var(--dsw-menu-surface-fill, var(--dsw-alias-bg-elevated, #fff));
  backdrop-filter: var(--dsw-menu-backdrop-filter, blur(20px));
  --dsw-elevation-stroke-color: var(--dsw-alias-border-l1);
  box-shadow: var(--dsw-elevation-prominent, 0 3px 8px rgba(0, 0, 0, .04), 0 0 20px rgba(0, 0, 0, .05));
}
[data-mobile-nav="session-log-menu"] [role="menuitem"] {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  min-height: 34px;
  padding: 6px 8px;
  border: 0;
  border-radius: var(--dsw-radius-md, 8px);
  background: transparent;
  color: var(--dsw-alias-label-primary, #141414);
  font: inherit;
  font-size: 13px;
  line-height: 20px;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
}
[data-mobile-nav="session-log-menu"] [role="menuitem"] svg {
  flex: none;
  color: var(--dsw-alias-label-secondary, inherit);
}
[data-mobile-nav="session-log-menu"] [role="menuitem"]:hover:not(:disabled),
[data-mobile-nav="session-log-menu"] [role="menuitem"]:active:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
}
[data-mobile-nav="session-log-menu"] [role="menuitem"]:disabled {
  opacity: .45;
}
@media (max-width: 1023px) and (pointer: coarse) {
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    margin-top: -8px !important;
  }
}
`;var to=[Yn,Qn,Jn,eo].join(`
`);var Be="(max-width: 1023px) and (pointer: coarse)",ao="(min-width: 1024px)",jt="(pointer: coarse)",no="(min-width: 1024px) and (pointer: coarse)";function D(e,t,a,n=Be){e.effect(()=>{let o=window.matchMedia(n),r,i=()=>{r?.(),r=o.matches?a(o):void 0};return i(),o.addEventListener("change",i),()=>{o.removeEventListener("change",i),r?.()}},t)}function Gt(e,t){if(t!==null)try{if(t("(font: -apple-system-body) and (-webkit-touch-callout: none)"))return!0}catch{}let a=e.userAgent;return/iP(hone|ad|od)/.test(a)?!0:/Macintosh/.test(a)&&e.maxTouchPoints>1}var Ha="--mobile-nav-header-h",Ms='[data-mobile-nav="frame"] [data-phase] header',kt=null,ot=null;function ro(e){if(typeof document>"u")return;let t=document.documentElement;t.style.getPropertyValue(Ha)!==e&&t.style.setProperty(Ha,e)}function io(){let e=j(),t=kt;return t===null||e===null||!(t instanceof HTMLElement)?"0px":`${Math.round(Math.max(0,t.getBoundingClientRect().bottom-e.getBoundingClientRect().top))}px`}function oo(){ro(io())}function Rs(){let e=kt;ro(e instanceof HTMLElement&&e.offsetHeight===0?"0px":io())}function Ps(){if(typeof document>"u")return;let e=document.querySelector(Ms);if(e===kt){e!==null&&typeof ResizeObserver>"u"&&oo();return}ot?.disconnect(),kt=e,e!==null&&typeof ResizeObserver<"u"&&(ot=ot??new ResizeObserver(()=>{oo()}),ot.observe(e)),Rs()}function so(){return{name:"header-metrics",scopes:["*"],ensure:()=>{Ps()},dispose:()=>{ot?.disconnect(),ot=null,kt=null,typeof document<"u"&&document.documentElement.style.removeProperty(Ha)}}}var Fa="characterData";function lo(e){return e.type==="attributes"?e.attributeName===null?"*":e.attributeName:e.type==="characterData"?Fa:"*"}function co(e){let t=e.onError??((g,S,v)=>{console.error(`[dsh-web-mobile] reconciler task ${g}${v==="dispose"?" dispose":""} failed`,S)}),a=new Set,n=null,o=new Set,r=!1,i=null,d=g=>{try{g.ensure()}catch(S){t(g.name,S,"ensure")}},f=g=>{try{g.dispose()}catch(S){t(g.name,S,"dispose")}},b=()=>{if(i!==null&&(i(),i=null),n===null){o.clear(),r=!1;return}let g=o,S=r;if(o=new Set,r=!1,S)for(let v of n)d(v);else if(g.size>0)for(let v of n){let m=v.scopes;(m===void 0||m.some(C=>g.has(C)))&&d(v)}},l=()=>{i===null&&(i=e.requestFrame(()=>{i=null,b()}))};return{get size(){return a.size},register:g=>(a.add(g),n!==null&&(n.add(g),d(g)),()=>{a.delete(g),n!==null&&n.delete(g)&&f(g)}),activate:()=>{n===null&&(n=new Set(a),r=!0,b())},deactivate:()=>{if(i!==null&&(i(),i=null),o.clear(),r=!1,n!==null){let g=n;n=null;for(let S of g)f(S)}},note:g=>{for(let S of g)o.add(S);l()},flush:b}}var re="pocketMobileNav",po={open:"打开目录",close:"收起目录",backdrop:"点击关闭目录",back:"返回",backToConversation:"返回会话",sessionLog:"导出会话日志",downloadMenu:"下载",downloads:"下载记录",quickSettings:"设置",files:"文件浏览",fileUpload:"添加文件",fileUploadImage:"上传图片",fileUploadAttachment:"上传附件",questionExpand:"展开回答",questionCollapse:"收起回答",deleteSession:"删除会话",deleteConfirmTitle:"删除会话？",deleteConfirmDesc:"将删除「{title}」的完整会话记录，此操作不可恢复。",deleteConfirmYes:"删除",deleteConfirmNo:"取消",deletePending:"正在删除…",deleteErrorBusy:"该会话正在运行且无法停止，请稍后重试。",deleteErrorNotFound:"会话不存在或已被删除。",deleteErrorResolve:"无法确定要删除的会话，请重试。",deleteErrorGeneric:"删除失败：{message}"},ho={open:"Open directory",close:"Close directory",backdrop:"Click to close directory",back:"Back",backToConversation:"Back to conversation",sessionLog:"Session log",downloadMenu:"Downloads",downloads:"Downloads history",quickSettings:"Settings",files:"Files",fileUpload:"Add files",fileUploadImage:"Upload image",fileUploadAttachment:"Upload attachment",questionExpand:"Expand answer",questionCollapse:"Collapse answer",deleteSession:"Delete session",deleteConfirmTitle:"Delete session?",deleteConfirmDesc:"The complete log of “{title}” will be permanently removed. This cannot be undone.",deleteConfirmYes:"Delete",deleteConfirmNo:"Cancel",deletePending:"Deleting…",deleteErrorBusy:"This session is running and could not be stopped. Try again later.",deleteErrorNotFound:"The session does not exist or was already deleted.",deleteErrorResolve:"Could not identify the session to delete. Please try again.",deleteErrorGeneric:"Delete failed: {message}"};var uo="[data-composer-card], [data-composer-input], [contenteditable], input, textarea, button";function mo(e){let t=e.matches;if(typeof t=="function"&&t.call(e,uo))return!0;let a=e.querySelector;return typeof a=="function"&&a.call(e,uo)!==null}function fo(e){let t=e.querySelectorAll;if(typeof t!="function"||typeof getComputedStyle!="function")return/\d\s*%/.test(e.textContent??"");for(let a of t.call(e,"svg circle")){let n=getComputedStyle(a).strokeDasharray;if(n!==""&&n!=="none"&&!/^(0px?)(\s+0px?)*$/.test(n))return!0}return!1}function Os(e,t){return e.contains(t)||mo(e)?!1:fo(e)}function za(e){let t=e.closest("[data-composer-dock]");if(t!==null){let n=[...t.children].filter(r=>!r.contains(e)&&!mo(r)&&!r.hasAttribute("data-mobile-nav")),o=n.find(fo)??(n.length===1?n[0]:void 0);if(o!==void 0)return{dock:t,ring:o}}let a=e.closest('[class*="_composerStack"]');for(let n=e.parentElement;n!==null;n=n.parentElement){let o=[...n.children].find(r=>Os(r,e));if(o!==void 0)return{dock:n,ring:o};if(n===a)break}return null}function Is(e){return e===null||!e.isConnected||e.closest("[data-phase]")===null?!1:e.closest('[class*="_composerStack"]')!==null}var Ns=/^TPS\s+\d/,Hs=/TPS\s+\d/,Fs=e=>{for(let[t,a]of e.entries())if(Ns.test((a.textContent??"").trim())&&!(a.children.length>0)&&a.parentElement!==null)return{index:t,mark:a.getAttribute("data-mobile-nav")!=="stats-tps"};return{index:-1,mark:!1}};function zs(e,t,a,n){return e!==null?{el:e.el,reserve:e.reserve,live:t}:Hs.test(a())?n():null}function Bs(e,t,a,n){return e?t:a&&n}function bo(){let e=(h,_)=>{getComputedStyle(h).position==="static"&&h.setAttribute("data-mobile-nav",_)},t=h=>{for(let _=h.parentElement;_!==null;_=_.parentElement)if(getComputedStyle(_).position!=="static")return _;return null},a=(h,_)=>{let T=t(h);if(T===null)return null;let R=_.getBoundingClientRect(),P=T.getBoundingClientRect(),O=h.getBoundingClientRect();return{host:h,left:R.left-P.left-T.clientLeft,top:R.top-P.top-T.clientTop-(O.height-R.height)/2}},n=h=>{let _=h.host;_.style.left!==`${h.left}px`&&(_.style.left=`${h.left}px`),_.style.top!==`${h.top}px`&&(_.style.top=`${h.top}px`)},o=h=>{let _=h.closest('[class*="_composerStack"]');if(_===null)return null;let T=h.querySelector(':scope > [data-mobile-nav="stats-tps-reserve"]'),R=[..._.querySelectorAll("div")],P=Fs(R);if(P.index<0)return null;let O=R[P.index];if(O===void 0)return null;T===null&&(T=document.createElement("span"),T.setAttribute("data-mobile-nav","stats-tps-reserve"),T.setAttribute("aria-hidden","true"),h.appendChild(T));let H=O.textContent??"";T.textContent!==H&&(T.textContent=H),P.mark&&O.setAttribute("data-mobile-nav","stats-tps");let W=O.parentElement;return W===null?null:(e(W,"stats-tps-row"),{el:O,reserve:T,live:H})},r=h=>{let{el:_,reserve:T}=h,R=a(_,T);return{el:_,measured:R,width:T.getBoundingClientRect().width}},i=h=>{h.measured!==null&&n(h.measured);let _=h.el,T=`${h.width}px`;_.style.maxWidth!==T&&(_.style.maxWidth=T)},d=h=>{let _=za(h);if(_===null)return null;let{dock:T,ring:R}=_,P=document.querySelector('[data-composer-card] [class*="_row"] [class*="_trailing"]');if(P===null)return null;let O=P.querySelector(':scope > [data-mobile-nav="stats-ring-reserve"]'),H=P.querySelector(':scope > [class*="_primary"]');return O===null?(O=document.createElement("span"),O.setAttribute("data-mobile-nav","stats-ring-reserve"),P.insertBefore(O,H)):(H===null?P.lastElementChild!==O:O.nextElementSibling!==H)&&P.insertBefore(O,H),R.getAttribute("data-mobile-nav")!=="stats-ring"&&R.setAttribute("data-mobile-nav","stats-ring"),e(T,"stats-ring-dock"),{ring:R,reserve:O,measured:a(R,O)}},f=h=>{let _=o(h);_!==null&&i(r(_))},b=h=>{let _=d(h);_!==null&&_.measured!==null&&n(_.measured)},l=null,s=0,u="",x=h=>{if(h===null)return"none";let _=h.getBoundingClientRect();return`${Math.round(_.left)}:${Math.round(_.top)}:${Math.round(_.width)}`},g=()=>{let h=document.querySelector('[data-mobile-nav="stats"]');if(h===null)return;let _=h.getBoundingClientRect(),T=`${Math.round(_.left)}:${Math.round(_.top)}:${Math.round(_.width)}:${Math.round(_.height)}|${x(document.querySelector('[data-mobile-nav="stats-ring-reserve"]'))}`;if(T===u)return;u=T;let R=o(h),P=R===null?null:r(R),O=d(h);P!==null&&i(P),O!==null&&O.measured!==null&&n(O.measured)},S=()=>{s===0&&(s=requestAnimationFrame(()=>{s=0,g()}))},v="",m=null,C=null,A=null,k=null,E=null,c=(h,_)=>h!==null&&h.isConnected&&h.getAttribute("data-mobile-nav")===_,p=h=>{let _=za(h);return _===null?!1:_.ring===A};return{name:"stats-line",scopes:["*",Fa],ensure:()=>{l===null&&(l=S,window.addEventListener("resize",S),window.visualViewport?.addEventListener("resize",S));let h=E;if((h===null||!h.isConnected||!h.matches('[data-mobile-nav="stats"]'))&&(h=E=document.querySelector('[data-mobile-nav="stats"]')),h!==null&&Is(h)){let T=h.getBoundingClientRect(),R=`${Math.round(T.left)}:${Math.round(T.top)}:${Math.round(T.width)}:${Math.round(T.height)}`,P=c(m,"stats-tps"),O=c(C,"stats-tps-reserve"),H=P&&O&&m!==null&&C!==null?{el:m,reserve:C,live:""}:null,W=h.closest('[class*="_composerStack"]'),G=zs(H,m?.textContent??"",()=>W?.textContent??"",()=>o(h)),V=`${R}|${G===null?"none":G.live}|${x(k)}`,Z=Bs(G===null,m===null&&C===null,c(m,"stats-tps"),c(C,"stats-tps-reserve"));if(V===v&&Z&&c(A,"stats-ring")&&p(h)&&c(k,"stats-ring-reserve"))return;v=V;let ae=G!==null&&G.el===m?o(h):G,I=ae===null?null:r(ae),B=d(h);I!==null&&i(I),B!==null&&B.measured!==null&&n(B.measured),m=ae===null?null:ae.el,C=ae===null?null:ae.reserve,A=B===null?null:B.ring,k=B===null?null:B.reserve,v=`${R}|${G===null?"none":G.live}|${x(k)}`;return}h?.removeAttribute("data-mobile-nav");let _=document.querySelector('[class*="_composerStack"]');if(_!==null)for(let T of['[class*="_root"]',"[data-slot]"])for(let R of _.querySelectorAll(T)){if(R.matches('[data-testid="todo-panel"]'))continue;let P=R.querySelectorAll("button");if(P.length>0&&![...P].every(H=>H.getAttribute("aria-haspopup")!==null))continue;let O=R.textContent??"";if(/(turns|steps|\bLLM\b|轮|步)/.test(O)&&R.querySelector("textarea, [data-composer-input]")===null){R.setAttribute("data-mobile-nav","stats"),f(R),b(R);return}}},dispose:()=>{s!==0&&(cancelAnimationFrame(s),s=0),u="",E=null,l!==null&&(window.removeEventListener("resize",l),window.visualViewport?.removeEventListener("resize",l),l=null);for(let h of document.querySelectorAll('[data-mobile-nav="stats-ring"], [data-mobile-nav="stats-tps"]')){let _=h;_.style.left="",_.style.top="",_.style.maxWidth=""}for(let h of["stats","stats-ring","stats-ring-dock","stats-tps","stats-tps-row"])for(let _ of document.querySelectorAll(`[data-mobile-nav="${h}"]`))_.removeAttribute("data-mobile-nav");for(let h of document.querySelectorAll('[data-mobile-nav="stats-ring-reserve"], [data-mobile-nav="stats-tps-reserve"]'))h.remove()}}}function Da(){Ba?.()}var Ba=null,Ds=200,qs='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="18" height="18"><path d="M9.8 3.4 5.2 8l4.6 4.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',Ws='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="18" height="18"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.67272 0.522841C10.8339 0.522841 11.76 0.522714 12.4963 0.602493C13.2453 0.683657 13.8789 0.854248 14.4264 1.25197C14.7504 1.48739 15.0355 1.77247 15.2709 2.0965C15.6686 2.64394 15.8392 3.27758 15.9204 4.02655C16.0002 4.7629 16 5.68895 16 6.85014V9.14986C16 10.3111 16.0002 11.2371 15.9204 11.9735C15.8392 12.7224 15.6686 13.3561 15.2709 13.9035C15.0355 14.2275 14.7504 14.5126 14.4264 14.748C13.8789 15.1458 13.2453 15.3163 12.4963 15.3975C11.76 15.4773 10.8339 15.4772 9.67272 15.4772H6.3273C5.16611 15.4772 4.24006 15.4773 3.50371 15.3975C2.75474 15.3163 2.1211 15.1458 1.57366 14.748C1.24963 14.5126 0.964549 14.2275 0.729131 13.9035C0.331407 13.3561 0.160817 12.7224 0.0796529 11.9735C-0.000126137 11.2371 1.25338e-09 10.3111 1.25338e-09 9.14986V6.85014C1.25329e-09 5.68895 -0.000126137 4.7629 0.0796529 4.02655C0.160817 3.27758 0.331407 2.64394 0.729131 2.0965C0.964549 1.77247 1.24963 1.48739 1.57366 1.25197C2.1211 0.854248 2.75474 0.683657 3.50371 0.602493C4.24006 0.522714 5.16611 0.522841 6.3273 0.522841H9.67272ZM5.54303 1.88715V14.1118C5.78636 14.1128 6.04709 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C6.04709 1.88307 5.78636 1.8862 5.54303 1.88715ZM4.1828 1.91166C3.99125 1.9216 3.8148 1.93577 3.65076 1.95353C3.01764 2.02212 2.65034 2.1506 2.37325 2.35179C2.16463 2.50337 1.98052 2.68747 1.82895 2.89609C1.62776 3.17318 1.49928 3.54048 1.43069 4.1736C1.36074 4.81967 1.36023 5.65896 1.36023 6.85014V9.14986C1.36023 10.341 1.36074 11.1803 1.43069 11.8264C1.49928 12.4595 1.62776 12.8268 1.82895 13.1039C1.98052 13.3125 2.16463 13.4966 2.37325 13.6482C2.65034 13.8494 3.01764 13.9779 3.65076 14.0465C4.29683 14.1164 5.13612 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C5.13612 1.88307 4.29683 1.88358 3.65076 1.95353C3.47672 1.97129 3.30027 1.98546 3.10872 1.9954L4.1828 1.91166Z" fill="currentColor"/></svg>';function go(e,t,a){let n=null,o=null,r=null,i=!1,d=()=>{let u=j();return u===null?!1:!u.hasAttribute("data-sidebar-collapsed")},f=null,b=()=>{let u=f;return u!==null&&u.isConnected&&u.matches('[data-phase="active"]')?!1:(f=document.querySelector('[data-phase="active"]'),f===null)},l=u=>{if(a!==null&&a.panelOpen()){u.preventDefault(),u.stopPropagation(),a.back();return}t()},s=()=>{if(o===null)return;let u=a!==null&&a.panelOpen(),x=u&&a!==null&&a.subpageOpen(),g=x?"back-level":u?"exit-panel":"open-drawer";if(o.dataset.mobileNavFabMode===g)return;o.dataset.mobileNavFabMode=g;let S=e(x?"back":u?"backToConversation":"open");o.setAttribute("aria-label",S),o.title=S,o.innerHTML=u?qs:Ws};return{name:"overlay-backdrop-fab",scopes:["*","data-sidebar-collapsed","data-phase"],ensure:()=>{Ba=()=>{n!==null&&(i=!0,n.style.pointerEvents="none",n.style.opacity="0")};let u=j();if(u===null){r!==null&&(window.clearTimeout(r),r=null),n?.remove(),n=null,o?.remove(),o=null;return}d()?n===null?(n=document.createElement("div"),n.dataset.mobileNav="backdrop",n.setAttribute("role","button"),n.setAttribute("aria-label",e("backdrop")),u.appendChild(n),i=!1):i&&r!==null&&(window.clearTimeout(r),r=null,i=!1,n.style.removeProperty("pointer-events"),n.style.removeProperty("opacity")):n!==null&&(n.style.pointerEvents="none",n.style.opacity="0",i=!0,r===null&&(r=window.setTimeout(()=>{r=null,n?.remove(),n=null},Ds+60))),b()&&!d()&&o===null?(o=document.createElement("button"),o.type="button",o.dataset.mobileNav="fab",o.setAttribute("aria-label",e("open")),o.title=e("open"),o.addEventListener("click",l),u.appendChild(o)):(!b()||d())&&o!==null&&(o.remove(),o=null),s()},dispose:()=>{r!==null&&(window.clearTimeout(r),r=null),Ba=null,f=null,n?.remove(),n=null,o?.remove(),o=null}}}function wo(){let e=null,t=null;return{name:"file-viewer-open-marker",scopes:["*"],ensure:()=>{let a=j();if(a===null)return;let n=document.querySelector(".dsfv-panel")!==null;n===e&&a===t||(e=n,t=a,n?a.setAttribute("data-file-viewer-open",""):a.hasAttribute("data-file-viewer-open")&&a.removeAttribute("data-file-viewer-open"))},dispose:()=>{e=null,t=null,j()?.removeAttribute("data-file-viewer-open")}}}function ue(e){if(typeof e!="object"||e===null)return;let t=e;if(typeof t.current=="string")return t.current;for(let a in t.byId){let n=t.byId[a];if(n===void 0)continue;let o=n.retainedBy?.mainView;if(typeof o=="number"&&o>0&&typeof n.id=="string")return n.id}}function vo(e){return typeof e?.clear=="function"}function xo(e){return typeof e?.open=="function"}var Vs=4,js=350;async function yo(e){let t=e.attempts??Vs,a=e.intervalMs??js;for(let n=0;n<t;n+=1){try{await e.refresh?.()}catch{}if(!e.listed())return!0;n+1<t&&await e.sleep(a)}return!e.listed()}var ko='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.95317V10.0469" stroke="currentColor" stroke-width="1"/><path d="M4.25 6.29688L8 10.0469L11.75 6.29688" stroke="currentColor" stroke-width="1"/><path d="M1.5 10.0469V13.158C1.5 13.3937 1.60536 13.6198 1.79289 13.7865C1.98043 13.9532 2.23478 14.0469 2.5 14.0469H13.5C13.7652 14.0469 14.0196 13.9532 14.2071 13.7865C14.3946 13.6198 14.5 13.3937 14.5 13.158V10.0469" stroke="currentColor" stroke-width="1"/></svg>',Gs='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1"/><path d="M8 4.6V8l2.2 1.6" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>';function _o(e){let t=e.locale.bind(re),a=()=>ue(e.sessions.list.getSnapshot()),n=null,o=null,r=null,i=null,d=null,f=null,b=null,l=null,s=null,u=()=>{i?.remove(),i=null,d=null,f!==null&&document.removeEventListener("pointerdown",f,!0),f=null,b!==null&&document.removeEventListener("keydown",b,!0),b=null,l?.disconnect(),l=null,s!==null&&(window.removeEventListener("resize",s),window.removeEventListener("orientationchange",s)),s=null,o?.setAttribute("aria-expanded","false")},x=()=>{if(i===null||o===null)return;let A=o.getBoundingClientRect();i.style.top=`${Math.round(A.bottom+4)}px`,i.style.right=`${Math.round(window.innerWidth-A.right)}px`},g=(A,k,E)=>{let c=document.createElement("button");c.type="button",c.setAttribute("role","menuitem"),c.dataset.mobileNav=k,c.innerHTML=E;let p=document.createElement("span");return p.textContent=A,c.appendChild(p),c},S=()=>{if(o===null)return;if(i!==null){u();return}let A=document.createElement("div");A.dataset.mobileNav="session-log-menu",A.setAttribute("role","menu"),A.setAttribute("aria-label",t("downloadMenu"));let k=g(t("sessionLog"),"session-log-export",ko);k.disabled=a()===void 0,k.addEventListener("click",()=>{let p=a();u(),p!==void 0&&e.sessionLogDownload.download(p)}),A.appendChild(k),d=k;let E=window.DSHA;if(typeof E?.openDownloads=="function"){let p=g(t("downloads"),"session-log-downloads",Gs);p.addEventListener("click",()=>{let L=E?.openDownloads?.();u(),L!==void 0&&L.catch(()=>{})}),A.appendChild(p)}document.body.appendChild(A),i=A,x(),o.setAttribute("aria-expanded","true"),f=p=>{let L=p.target;L instanceof Node&&(A.contains(L)||o!==null&&(L===o||o.contains(L))||u())},document.addEventListener("pointerdown",f,!0),b=p=>{p.key==="Escape"&&(p.preventDefault(),u())},document.addEventListener("keydown",b,!0);let c=j();c!==null&&(l=new MutationObserver(()=>{c.hasAttribute("data-sidebar-collapsed")&&u()}),l.observe(c,{attributes:!0,attributeFilter:["data-sidebar-collapsed"]})),s=()=>{x()},window.addEventListener("resize",s),window.addEventListener("orientationchange",s),window.setTimeout(()=>{k.focus({preventScroll:!0})},0)},v=()=>{d!==null&&(d.disabled=a()===void 0)},m=()=>{let A=j();return A===null?null:A.querySelector('[class*="sidebarCol"] [class*="logoRow"]')??A.querySelector('[class*="logoRow"]')},C=(A,k)=>{k.parentElement!==A&&A.appendChild(k)};return{name:"drawer-session-log",scopes:["*"],ensure:()=>{let A=m();A!==null&&(o===null&&(n=document.createElement("span"),n.dataset.mobileNav="session-log-wrap",o=document.createElement("button"),o.type="button",o.dataset.mobileNav="session-log",o.setAttribute("aria-haspopup","menu"),o.setAttribute("aria-expanded","false"),o.setAttribute("aria-label",t("downloadMenu")),o.title=t("downloadMenu"),o.innerHTML=ko,o.addEventListener("click",S),n.appendChild(o),r=e.sessions.list.subscribe(()=>{v()})),n!==null&&C(A,n),v())},dispose:()=>{u(),r?.(),r=null,n?.remove(),n=null,o=null}}}var Us='<svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true" stroke-width="1.3"><path d="M8 9.75012C8.9665 9.75012 9.75 8.96662 9.75 8.00012C9.75 7.03362 8.9665 6.25012 8 6.25012C7.0335 6.25012 6.25 7.03362 6.25 8.00012C6.25 8.96662 7.0335 9.75012 8 9.75012Z" stroke="currentColor"/><path d="M13.0107 7.79377C12.9505 7.89401 12.9205 7.94413 12.9205 7.99951C12.9205 8.0549 12.9505 8.10502 13.0106 8.20528L13.9849 9.83006C14.045 9.93029 14.0751 9.9804 14.0751 10.0358C14.0751 10.0911 14.045 10.1413 13.9849 10.2415L13.0037 11.8777C12.9468 11.9726 12.9184 12.0201 12.8725 12.0461C12.8267 12.072 12.7713 12.072 12.6607 12.072H10.6704C10.5598 12.072 10.5045 12.072 10.4586 12.098C10.4128 12.1239 10.3843 12.1714 10.3274 12.2662L9.33825 13.9142C9.28133 14.009 9.25287 14.0564 9.20703 14.0823C9.16118 14.1083 9.10588 14.1083 8.99529 14.1083H7.00486C6.89426 14.1083 6.83896 14.1083 6.79312 14.0823C6.74727 14.0564 6.71881 14.009 6.6619 13.9142L5.67273 12.2662C5.61581 12.1714 5.58735 12.1239 5.54151 12.098C5.49566 12.072 5.44036 12.072 5.32977 12.072H3.33945C3.2288 12.072 3.17347 12.072 3.12761 12.0461C3.08176 12.0201 3.0533 11.9726 2.9964 11.8777L2.0152 10.2415C1.9551 10.1413 1.92505 10.0911 1.92505 10.0358C1.92505 9.9804 1.9551 9.93029 2.0152 9.83006L2.98951 8.20528C3.04963 8.10502 3.07969 8.0549 3.07969 7.99951C3.07968 7.94413 3.04961 7.89401 2.98946 7.79377L2.01529 6.17011C1.95514 6.06987 1.92507 6.01975 1.92507 5.96437C1.92506 5.90899 1.95512 5.85886 2.01524 5.7586L2.9964 4.1224C3.0533 4.0275 3.08176 3.98005 3.12761 3.95408C3.17347 3.92811 3.2288 3.92811 3.33945 3.92811H5.32977C5.44036 3.92811 5.49566 3.92811 5.54151 3.90216C5.58735 3.87621 5.61581 3.82879 5.67273 3.73397L6.6619 2.08599C6.71881 1.99116 6.74727 1.94375 6.79312 1.9178C6.83896 1.89185 6.89426 1.89185 7.00486 1.89185H8.99529C9.10588 1.89185 9.16118 1.89185 9.20703 1.9178C9.25287 1.94375 9.28133 1.99116 9.33825 2.08599L10.3274 3.73397C10.3843 3.82879 10.4128 3.87621 10.4586 3.90216C10.5045 3.92811 10.5598 3.92811 10.6704 3.92811H12.6607C12.7713 3.92811 12.8267 3.92811 12.8725 3.95408C12.9184 3.98005 12.9468 4.0275 13.0037 4.1224L13.9849 5.7586C14.045 5.85886 14.0751 5.90899 14.0751 5.96437C14.0751 6.01975 14.045 6.06987 13.9849 6.17011L13.0107 7.79377Z" stroke="currentColor" stroke-miterlimit="10"/></svg>',Ks='[class*="sidebarCol"] [class*="triggerRow"]',Eo='button[aria-haspopup="menu"]',Xs=400,Ut="data-mobile-nav-quick-menu",$s="[data-mobile-nav-quick-menu]";function Kt(e){let t=e.locale.bind(re),a=null,n=null,o=null,r=()=>{let x=j();return x===null?null:x.querySelector(Ks)},i=()=>{o!==null&&(window.clearTimeout(o),o=null)},d=x=>{let g=document.documentElement;g.setAttribute("data-mobile-nav-quick","");let S=!1,v=()=>{S||(S=!0,i(),g.removeAttribute("data-mobile-nav-quick"))},m=()=>x.getAttribute("aria-expanded")==="true";m()||x.click(),requestAnimationFrame(()=>{let C=document.querySelectorAll('[role="menu"]'),k=(m()&&C.length>0?C[C.length-1]:null)?.querySelector('[role="menuitem"]')??null;if(k===null){m()&&x.click(),v();return}k.click(),o=window.setTimeout(()=>{m()&&x.click(),v()},Xs)})},f=()=>{let x=r();if(x===null)return;let g=x.querySelector(Eo);g!==null&&d(g)},b=()=>{a=document.createElement("span"),a.dataset.mobileNav="quick-settings-wrap",n=document.createElement("button"),n.type="button",n.dataset.mobileNav="quick-settings",n.setAttribute("aria-label",t("quickSettings")),n.setAttribute("aria-haspopup","dialog"),n.title=t("quickSettings"),n.innerHTML=Us,n.addEventListener("click",f),a.appendChild(n)},l=x=>![...x.children].some(g=>g.getAttribute("data-phase")!==null||g.getAttribute("role")==="status"),s=()=>{for(let x of document.querySelectorAll($s))x.removeAttribute(Ut)},u=x=>{let g=document.querySelectorAll('[role="menu"]'),S=g.length>0?g[g.length-1]??null:null;if(S===null)return;let v=x.querySelector(Eo);if(!(v!==null&&v.getAttribute("aria-expanded")==="true"&&l(x))){S.removeAttribute(Ut);return}S.hasAttribute(Ut)||S.setAttribute(Ut,"")};return{name:"drawer-quick-settings",scopes:["*"],ensure:()=>{let x=r();x!==null&&((n===null||a===null)&&b(),a!==null&&a.parentElement!==x&&x.appendChild(a),u(x))},dispose:()=>{i(),document.documentElement.removeAttribute("data-mobile-nav-quick"),s(),a?.remove(),a=null,n=null}}}function To(e){return Number.isNaN(e)?1:Math.min(4,Math.max(1,e))}function ye(){return{scale:1,x:0,y:0}}function So(e,t,a){if(!Number.isFinite(t)||t<=0)return{...e};if(!(e.scale>0))return ye();let n=To(e.scale*t);if(n===1)return ye();let o=n/e.scale;return{scale:n,x:a.x-(a.x-e.x)*o,y:a.y-(a.y-e.y)*o}}function Xt(e,t){let a=To(e.scale);if(a===1)return ye();let n=Number.isFinite(t.width)&&t.width>0?t.width:0,o=Number.isFinite(t.height)&&t.height>0?t.height:0,r=(a-1)*n/2,i=(a-1)*o/2,d=Number.isFinite(e.x)?Math.min(r,Math.max(-r,e.x)):0,f=Number.isFinite(e.y)?Math.min(i,Math.max(-i,e.y)):0;return{scale:a,x:d,y:f}}function Co(e,t){let a=Math.hypot(e.x,e.y),n=Math.hypot(t.x,t.y);return a===0||!Number.isFinite(a)||!Number.isFinite(n)?1:n/a}function Ao(e){return e.scale<=1?{scale:2.5,x:0,y:0}:ye()}function Lo(){let e=null,t=null,a=ye(),n=new Map,o=null,r=null,i=null,d=()=>({width:window.innerWidth,height:window.innerHeight}),f=()=>{for(let E of document.body.querySelectorAll(':scope > [role="dialog"][aria-modal="true"]')){if(!(E instanceof HTMLElement))continue;let c=E.querySelector(":scope > :first-child > img");if(c instanceof HTMLImageElement)return{root:E,image:c}}return null},b=()=>{t!==null&&(t.style.transform="",t.style.transformOrigin="",t.style.willChange="",t=null)},l=()=>{e!==null&&(e.removeEventListener("pointerdown",g),e.removeEventListener("pointermove",S),e.removeEventListener("pointerup",v),e.removeEventListener("pointercancel",m),e.removeEventListener("gesturestart",C),e.removeEventListener("touchmove",A),e.getAttribute("data-mobile-nav")==="image-lightbox"&&e.removeAttribute("data-mobile-nav")),b(),n.clear(),o=null,r=null,i=null,a=ye(),e=null},s=()=>{if(t===null)return{x:0,y:0};let E=t.getBoundingClientRect();return{x:E.left+E.width/2-a.x,y:E.top+E.height/2-a.y}},u=()=>{t!==null&&(t.style.transform="translate3d("+a.x+"px, "+a.y+"px, 0) scale("+a.scale+")")},x=()=>{let E=[...n.values()],c=E[0],p=E[1];if(c===void 0||p===void 0)return;let L={x:(c.x+p.x)/2,y:(c.y+p.y)/2},h=s();r={startSpan:{x:p.x-c.x,y:p.y-c.y},startMid:L,startZoom:{...a},anchor:{x:L.x-h.x,y:L.y-h.y}},o=null},g=E=>{if(E.pointerType!=="mouse"){if(n.set(E.pointerId,{x:E.clientX,y:E.clientY}),n.size>=2){x();return}o={pointerId:E.pointerId,startX:E.clientX,startY:E.clientY,originX:a.x,originY:a.y,moved:!1,startedOnImage:E.target===t}}},S=E=>{if(!n.has(E.pointerId))return;let c={x:E.clientX,y:E.clientY};if(n.set(E.pointerId,c),n.size>=2){if(r===null){x();return}let h=[...n.values()],_=h[0],T=h[1];if(_===void 0||T===void 0)return;let R={x:(_.x+T.x)/2,y:(_.y+T.y)/2},P=Co(r.startSpan,{x:T.x-_.x,y:T.y-_.y}),O=So(r.startZoom,P,r.anchor);a=Xt({scale:O.scale,x:O.x+(R.x-r.startMid.x),y:O.y+(R.y-r.startMid.y)},d()),u();return}if(o===null||o.pointerId!==E.pointerId||!o.startedOnImage)return;let p=c.x-o.startX,L=c.y-o.startY;(Math.abs(p)>4||Math.abs(L)>4)&&(o.moved=!0),a=Xt({scale:a.scale,x:o.originX+p,y:o.originY+L},d()),u()},v=E=>{if(!n.delete(E.pointerId))return;if(n.size>=2){x();return}if(n.size===1){let L=[...n.entries()][0];if(r=null,o=null,L!==void 0){let[h,_]=L;o={pointerId:h,startX:_.x,startY:_.y,originX:a.x,originY:a.y,moved:!0,startedOnImage:!0}}return}let c=o;if(o=null,r=null,c===null||c.pointerId!==E.pointerId||!c.startedOnImage||c.moved){i=null;return}let p=Date.now();if(i!==null&&p-i.at<=320&&Math.hypot(E.clientX-i.x,E.clientY-i.y)<=28){a=Xt(Ao(a),d()),i=null,u();return}i={at:p,x:E.clientX,y:E.clientY}},m=E=>{n.delete(E.pointerId),n.size<2&&(r=null),n.size===0&&(o=null,i=null)},C=E=>{E.preventDefault()},A=E=>{E.touches.length>1&&E.preventDefault()},k=(E,c)=>{e=E,t=c,a=ye(),n.clear(),o=null,r=null,i=null,e.setAttribute("data-mobile-nav","image-lightbox"),t.style.transformOrigin="50% 50%",t.style.willChange="transform",e.addEventListener("pointerdown",g),e.addEventListener("pointermove",S),e.addEventListener("pointerup",v),e.addEventListener("pointercancel",m),e.addEventListener("gesturestart",C),e.addEventListener("touchmove",A,{passive:!1})};return{name:"image-lightbox-zoom",scopes:["*"],ensure:()=>{let E=f();if(E===null){l();return}if(e===E.root){t!==E.image&&(b(),t=E.image,a=ye(),t.style.transformOrigin="50% 50%",t.style.willChange="transform");return}l(),k(E.root,E.image)},dispose:()=>{l()}}}var rt=new WeakMap,qa=!1;function Wa(){qa=!0}function Va(){qa=!1}function ja(){return qa}function $t(e){return typeof e=="object"&&e!==null&&"parentElement"in e&&e.parentElement!==void 0}function Mo(e,t,a){let n=performance.now()+t;if(!$t(e)){if(typeof e!="object"&&typeof e!="function"||e===null)return;rt.set(e,n);return}let o=e;for(;o!==null&&(rt.set(o,n),o!==a);)o=$t(o.parentElement)?o.parentElement:null}function _t(e){let t=performance.now(),a=e.target;if(!$t(a)){if(typeof a!="object"&&typeof a!="function"||a===null)return!1;let o=rt.get(a);return o===void 0?!1:o<=t?(rt.delete(a),!1):!0}let n=a;for(;n!==null;){let o=rt.get(n);if(o!==void 0)if(o<=t)rt.delete(n);else return!0;n=$t(n.parentElement)?n.parentElement:null}return!1}var Zs=["node","session","summary","result"],Ys=["sessionId","id"],Qs=["__reactFiber$","__reactInternalInstance$"];function Js(e){if(typeof e!="object"||e===null)return null;let t=e.id;return typeof t=="string"?t:null}function el(e,t){if(e==null)return null;for(let a of Zs){let n=Js(e[a]);if(n!==null&&t(n))return n}for(let a of Ys){let n=e[a];if(typeof n=="string"&&t(n))return n}return null}function Zt(e,t,a=60){let n=e;for(let o=0;o<a&&n!==null&&n!==void 0;o+=1){let r=el(n.memoizedProps,t);if(r!==null)return r;n=n.return}return null}function Yt(e){if(e==null||typeof e!="object")return null;let t=e;for(let a of Qs)for(let n of Object.keys(t)){if(!n.startsWith(a))continue;let o=t[n];if(typeof o=="object"&&o!==null)return o}return null}function Ga(e,t,a){return Math.abs(t.x-e.x)<=a&&Math.abs(t.y-e.y)<=a}var tl=.45;function al(e,t=tl){return Math.round(e*t)}var Ua=8,nl=.16,Ro=.13,zo=60,ol=.45,rl=.45,qe=350,il=300,Bo=8,Ve=110,Po=280,Oo=101,sl=.45,ll=.16,dl=.45,Ae=0,je=!1,Le=[],St=0,Xa=0,Ge=!1,Me=0,Tt=null,ie=null,Ue=!1,Do=0,We=!1,_e=!1,Ct=!1,ke="drawer",$a=!1,qo=()=>!1;function cl(e,t,a){let n=a?-t.dx:t.dx;if(Math.abs(n)<=e.lockPx||Math.abs(n)<=Math.abs(t.dy))return"none";if(e.drawerOpen){if(Math.abs(n)/e.viewportWidthPx>=e.closeDistanceRatio)return"close";let i=a?-t.velX:t.velX;return i>0!=n>0?"none":Math.abs(i)>=e.closeVelocity?"close":"none"}return n<=0?"none":n/e.viewportWidthPx>=e.openDistanceRatio||(a?-t.velX:t.velX)>=e.openVelocity?"open":"none"}function pl(e,t,a){let n=a?-t.dx:t.dx;if(Math.abs(n)<=e.lockPx||Math.abs(n)<=Math.abs(t.dy))return"none";let o=a?-t.velX:t.velX;if(n<0)return e.panelOpen||e.drawerOpen?"none":-n/e.viewportWidthPx>=e.distanceRatio?"files":o>0!=n>0?"none":-o>=e.velocity?"files":"none";if(e.drawerOpen){let r=e.drawerCloseDistanceRatio??e.distanceRatio;return n/e.viewportWidthPx>=r?"close":o<=0?"none":o>=e.velocity?"close":"none"}return e.panelOpen?n/e.viewportWidthPx>=e.distanceRatio?"files":o>0!=n>0?"none":o>=e.velocity?"files":"none":"none"}function hl(e,t,a){let n=a-t,o=e.filter(f=>f.t>=n);if(o.length<2)return 0;let r=o[o.length-2],i=o[o.length-1],d=i.t-r.t;return d<=0?0:(i.x-r.x)/d}function ul(e,t,a,n){let o=a?e:t-e;return o>=0&&o<=n}function ml(e,t){return e||!t?"drawer":"files"}function fl(e,t,a,n){let o=e<=0?-1:1,r=Math.abs(e),i=a?-t:t;return n?i>=0?null:o*Math.min(r,-i)+0:i<=0?null:o*(r-Math.min(r,i))+0}function Wo(e,t){let a=t?-e:e;return a<=0?null:t?`translateX(max(0px, calc(${Oo}% - ${a}px)))`:`translateX(min(0px, calc(-${Oo}% + ${a}px)))`}function bl(e){let t=e;for(;t!==null;){if((t.overflowX==="auto"||t.overflowX==="scroll")&&t.scrollWidth>t.clientWidth+1)return t;t=t.parent}return null}function dt(){let e=j();return e!==null&&e.firstElementChild instanceof HTMLElement?e.firstElementChild:null}function Za(){let e=j();return e!==null&&!e.hasAttribute("data-sidebar-collapsed")}function Vo(){let e=document.querySelector("[data-sidebar-right-panel]");return e!==null&&e.hasAttribute("data-sidebar-right-open")}function gl(e){let t=null,a=e;for(;a!==null;)t={parent:t,scrollWidth:a.scrollWidth,clientWidth:a.clientWidth,overflowX:getComputedStyle(a).overflowX},a=a.parentElement;return t}function ta(){return document.querySelector('[aria-modal="true"]')!==null}function Ya(){return document.documentElement.hasAttribute("data-dsh-taskboard-active")||document.documentElement.hasAttribute("data-dsh-ssh-active")||document.querySelector("[data-conversation-composer-overlay]")!==null}function jo(){if(typeof window>"u")return!1;let e=window.getSelection();if(e!==null&&!e.isCollapsed)return!0;if(typeof document>"u")return!1;let t=document.activeElement;if(t===null)return!1;let a=t.tagName;if(a!=="TEXTAREA"&&a!=="INPUT")return!1;try{let{selectionStart:n,selectionEnd:o}=t;return typeof n=="number"&&typeof o=="number"&&n!==o}catch{return!1}}function Go(){return performance.now()<Me}function Uo(e){return document.documentElement.hasAttribute("data-mobile-nav-dragging")||document.body.hasAttribute("data-mobile-nav-dragging")?!0:e.target instanceof Element&&e.target.closest("[data-mobile-nav-dragging]")!==null}var Io=200;function wl(e){let t=e.closest(".dsh-pet-root");if(t!==null)return t;if(e.closest('[data-mobile-nav="frame"]')!==null)return null;let a=e;for(;a!==null;){if(a instanceof HTMLElement){let n=getComputedStyle(a);if((n.position==="fixed"||n.position==="absolute")&&a.offsetWidth<=Io&&a.offsetHeight<=Io)return a}a=a.parentElement}return null}function Ko(e){return e.target instanceof Element&&wl(e.target)!==null}function No(){ie=null,Ue=!1,_e=!1,Ct=!1,We=At();let e=dt();if(e===null||!Ge)return;ie=e;let t=e.getBoundingClientRect().width*Ve/100;Do=We?t:-t}var Ka=!1,it=0;function Qa(){if(!Ka)return;Ka=!1,ie?.style.removeProperty("content-visibility");let e=dt();e!==null&&e!==ie&&e.style.removeProperty("content-visibility")}function vl(e){if(_e||Ct)return;let t=dt();if(t===null||ta()||Ya()){Ct=!0;return}ie=t,Ue=!0,t.style.setProperty("transition","none","important");let a=Wo(1e-4,We);t.style.setProperty("transform",a??`translateX(-${Ve}%)`,"important"),t.style.willChange="transform",t.style.setProperty("content-visibility","hidden","important"),Ka=!0,_e=!0,e.layout.toggleSidebar(),it=requestAnimationFrame(()=>{it=requestAnimationFrame(()=>{it=0,Qa()})})}function Ho(e,t){if(!je||ke!=="drawer")return;if(!Ge){let n=We?-t:t;if(!_e&&(n<Bo||(vl(e),!_e)))return;let o=Wo(t,We);if(o===null){ie?.style.setProperty("transform",`translateX(-${Ve}%)`,"important");return}ie?.style.setProperty("transform",o,"important");return}if(ie===null)return;let a=fl(Do,t,We,Ge);if(a===null){Ue=!0,ie.style.setProperty("transition","none","important"),ie.style.setProperty("transform","translateX(0px)","important");return}Ue=!0,ie.style.setProperty("transition","none","important"),ie.style.setProperty("transform",`translateX(${a}px)`,"important")}function ea(){let e=ie;!Ue||e===null||(Ue=!1,e.style.removeProperty("transition"),e.style.removeProperty("transform"))}var st=null;function Qt(){let e=st;if(e===null)return;st=null,window.clearTimeout(e.timer),e.el.style.removeProperty("transition"),e.el.style.removeProperty("transform");let t=j();t!==null&&!t.hasAttribute("data-sidebar-collapsed")&&e.ctx.layout.toggleSidebar()}function Xo(e,t,a){let n=st;if(!(n!==null&&n.el===t&&n.target===a)){if(Qt(),window.matchMedia("(prefers-reduced-motion: reduce)").matches){Da(),Me=performance.now()+qe,st={el:t,ctx:e,timer:0,target:a},Qt();return}t.style.setProperty("transition",`transform ${Po}ms ease-in-out`,"important"),t.style.getPropertyValue("transform")!==""&&t.getBoundingClientRect(),t.style.setProperty("transform",a,"important"),Da(),Me=performance.now()+qe,st={el:t,ctx:e,timer:window.setTimeout(Qt,Po+40),target:a}}}function Jt(e){let t=ie;if(ie=null,Ue=!1,t===null){ea(),e.layout.toggleSidebar(),Me=performance.now()+qe;return}let a=We?`translateX(${Ve}%)`:`translateX(-${Ve}%)`;Xo(e,t,a)}function $o(e){if(!Za()||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return!1;let t=dt();if(t===null)return!1;let a=At()?`translateX(${Ve}%)`:`translateX(-${Ve}%)`;return Xo(e,t,a),!0}function De(e,t=!1){if(st!==null){t&&Qt();return}let a=_e;if(_e=!1,Ct=!1,Qa(),a&&e!==null&&ie!==null&&!t){lt(),Jt(e);return}ea(),lt(),a&&e!==null&&(e.layout.toggleSidebar(),Me=performance.now()+qe)}function xl(e,t,a){if(Go()||ta()||Ya()||jo()||Uo(e)||Ko(e)||!(e.target instanceof Element)||bl(gl(e.target))!==null||e.target.closest('[class*="_composerSeat"], [data-composer-card], [class*="_dock"]')!==null)return!1;let n=Za(),o=al(a,sl);if(n){let r=j();if(r===null)return!1;let i=r.getBoundingClientRect();if(e.clientX<i.left||e.clientX>i.right||e.clientY<i.top||e.clientY>i.bottom||e.target.closest('[class*="sessionRow"] button')!==null)return!1;let d=dt(),f=d===null?null:d.getBoundingClientRect(),b=f!==null&&e.clientX>=f.left&&e.clientX<=f.right;ke=ml(b,ul(e.clientX,a,t,o))}else Vo()?ke="files":ke="pending";return Ae=e.pointerId,je=!1,St=e.clientX,Xa=e.clientY,Le=[{t:e.timeStamp,x:e.clientX}],!0}function yl(e){let t=e.clientX-St,a=e.clientY-Xa;return Math.max(Math.abs(t),Math.abs(a))<Ua?!1:Uo(e)||Ko(e)||Math.abs(t)<=Math.abs(a)?(lt(),!1):(je=!0,Ge=Za(),ke==="pending"&&(ke=t>0!==At()?"drawer":"files"),ke==="files"?($a=Vo(),Ge&&No(),Wa(),!0):(Wa(),No(),!0))}function Fo(e){Le.push({t:e.timeStamp,x:e.clientX});let t=e.timeStamp-zo,a=0;for(;a<Le.length-1&&Le[a].t<t;)a+=1;a>0&&(Le=Le.slice(a))}function kl(e,t,a,n){let o=je,r=_e;_e=!1,Ct=!1;let i=ke==="files",d=$a,f=hl(Le,zo,t.timeStamp),b=t.clientX-St,l=t.clientY-Xa;if(lt(),!o){r&&Jt(e);return}let u=ta()||!r&&Go()?"none":i?pl({distanceRatio:ll,velocity:dl,lockPx:Ua,viewportWidthPx:n,panelOpen:d,drawerOpen:Ge,drawerCloseDistanceRatio:Ro},{dx:b,dy:l,velX:f},a):cl({openDistanceRatio:nl,closeDistanceRatio:Ro,openVelocity:ol,closeVelocity:rl,lockPx:Ua,viewportWidthPx:n,drawerOpen:Ge},{dx:b,dy:l,velX:f},a);if(Qa(),r){let x=b>0!==a&&Math.abs(b)>=Bo;u==="open"||x?(ea(),Me=performance.now()+qe):Jt(e),t.target instanceof Element&&Et(t.target);return}if(t.target instanceof Element){if(u==="close"){Et(t.target),Jt(e);return}ea(),u==="open"&&(Et(t.target),e.layout.toggleSidebar(),Me=performance.now()+qe),u==="files"&&(qo(),Et(t.target),Me=performance.now()+qe),i&&u==="none"&&Et(t.target)}}function Et(e){let t=dt(),a=t!==null&&t.contains(e)?t:j()??null;Mo(e,il,a),Tt=e}function lt(){Ae=0,je=!1,Le=[],ke="drawer",$a=!1,Va()}function At(){let e=j();return e!==null&&getComputedStyle(e).direction==="rtl"}function Zo(e,t){D(e,"dsh-web-mobile: sidebar swipe gestures",()=>{qo=t;let a=()=>window.innerWidth||document.documentElement.clientWidth||0,n=s=>{if(Tt=null,Va(),!(s.pointerType!=="touch"&&s.pointerType!=="pen")){if(Ae!==0&&Ae!==s.pointerId){De(e);return}xl(s,At(),a())}},o=s=>{if(s.pointerId===Ae){if(ta()||Ya()){De(e);return}if(je)Fo(s),Ho(e,s.clientX-St);else{if(jo()){lt();return}yl(s)&&(Fo(s),Ho(e,s.clientX-St))}}},r=s=>{s.pointerId===Ae&&kl(e,s,At(),a())},i=s=>{s.pointerId===Ae&&De(e)},d=s=>{if(Tt===null||!(s.target instanceof Element))return;let u=s.target.closest('[data-mobile-nav="backdrop"], [data-mobile-nav="fab"]');u!==null&&!u.contains(Tt)||_t(s)&&(s.stopPropagation(),s.preventDefault(),Tt=null)},f=()=>{document.hidden&&De(e)},b=s=>{if(Ae!==0){if(s.touches.length!==1||!s.cancelable||document.hidden){De(e);return}je&&s.preventDefault()}};document.addEventListener("pointerdown",n,!0),document.addEventListener("pointermove",o,!0),document.addEventListener("pointerup",r,!0),document.addEventListener("pointercancel",i,!0),document.addEventListener("click",d,!0),document.addEventListener("touchmove",b,{capture:!0,passive:!1});let l=()=>De(e);return document.addEventListener("visibilitychange",f),window.addEventListener("blur",l),()=>{document.removeEventListener("pointerdown",n,!0),document.removeEventListener("pointermove",o,!0),document.removeEventListener("pointerup",r,!0),document.removeEventListener("pointercancel",i,!0),document.removeEventListener("click",d,!0),document.removeEventListener("touchmove",b,{capture:!0}),document.removeEventListener("visibilitychange",f),window.removeEventListener("blur",l),it!==0&&(cancelAnimationFrame(it),it=0),De(e,!0)}})}var Yo=12,ct=null,_l='button[data-dsh-taskboard-entry], button[data-dsh-ssh-entry], [class*="newSession"], [class*="sessionRow"], [class*="searchResultRow"], [class*="searchResultWorkspace"], [class*="panelRow"]';function Lt(e){$o(e)||e.layout.toggleSidebar()}function Qo(e){D(e,"dsh-web-mobile: drawer close (Escape + navigate)",()=>{let t=()=>{Lt(e)},a=()=>{let T=j();return T!==null&&!T.hasAttribute("data-sidebar-collapsed")},n=T=>{T.key==="Escape"&&document.querySelector('[aria-modal="true"]')===null&&a()&&t()},o=()=>document.querySelector('[data-mobile-nav="frame"] > :first-child'),r=T=>{if(document.querySelector('[aria-modal="true"]')!==null||!a()||!(T instanceof Element))return!1;let R=o();return R===null||!R.contains(T)||T.closest('[class*="sessionRow"] button')!==null||T.closest('button[class*="panelRow"][aria-haspopup="menu"]')!==null?!1:T.closest(_l)!==null},i=T=>!(T instanceof Element&&T.closest("[data-dsha-session-select]")!==null)&&r(T),d=0,f="",b=null,l=null,s=T=>{if(!T.isTrusted)return;let R=T.target;R instanceof Element&&R.closest('[class*="sessionRow"] [class*="_title"]')!==null&&(T.preventDefault(),T.stopPropagation())},u=()=>o()?.querySelector('[role="treeitem"][aria-selected="true"]')?.querySelector('[class*="_title"]')?.textContent?.trim()??null,x=()=>{b?.disconnect(),b=null,l!==null&&window.clearTimeout(l),l=null,f=""},g=()=>{x(),f=u()??"";let T=o();T!==null&&(b=new MutationObserver(()=>{if(!a()){x();return}let R=u();R!==null&&R!==f&&(x(),t())}),b.observe(T,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-selected"]}),l=window.setTimeout(x,2e3))},S=T=>e.sessions.list.getSnapshot().byId[T]!==void 0,v=(T,R)=>{if(ct===null||!Ga(ct,{x:R.clientX,y:R.clientY},Yo))return null;let P=Zt(Yt(T),S);return P===null||ue(e.sessions.list.getSnapshot())===P?null:P},m=null,C=!1,A=0,k=()=>{C=!0,m?.(),m=null,A!==0&&(window.clearTimeout(A),A=0)},E=T=>{k(),C=!1;let R=()=>{C||(k(),a()&&t())};m=e.sessions.list.subscribe(()=>{ue(e.sessions.list.getSnapshot())===T&&(A!==0&&window.clearTimeout(A),A=window.setTimeout(()=>{A=0,R()},0))})},c=0,p=T=>{c=performance.now(),ct=T.pointerType==="touch"||T.pointerType==="pen"?{x:T.clientX,y:T.clientY}:null},L=T=>{let R=T.target;if(ja()||_t(T))return;if(R instanceof Element&&R.closest('[data-mobile-nav="backdrop"]')!==null){a()&&t();return}let P=R instanceof Element?R.closest('[role="treeitem"][data-dsha-session-select]'):null;if(P!==null&&T.detail>0&&r(R)){if(T.defaultPrevented||ct!==null&&(performance.now()-c>=500||!Ga(ct,{x:T.clientX,y:T.clientY},Yo)))return;T.preventDefault(),T.stopPropagation(),x(),k(),d=performance.now(),P.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,detail:0}));return}performance.now()-d<500||i(R)&&t()},h=T=>{if(ja()||_t(T)||T.pointerType!=="touch"&&T.pointerType!=="pen")return;let R=T.target;if(!(R instanceof Element)||!i(R))return;let P=R.closest('[role="treeitem"]');if(P!==null){if(d=performance.now(),P.getAttribute("aria-selected")==="true")t();else{let O=v(P,T);O===null?(k(),g()):(x(),xo(e.sessions)?(E(O),e.sessions.open(O)):(k(),g()))}return}},_=()=>{a()&&t()};return document.addEventListener("dsha-session-open",_),document.addEventListener("dblclick",s,!0),document.addEventListener("keydown",n,!0),document.addEventListener("click",L,!0),document.addEventListener("pointerdown",p,!0),document.addEventListener("pointerup",h,!0),()=>{x(),k(),ct=null,document.removeEventListener("dsha-session-open",_),document.removeEventListener("dblclick",s,!0),document.removeEventListener("keydown",n,!0),document.removeEventListener("click",L,!0),document.removeEventListener("pointerdown",p,!0),document.removeEventListener("pointerup",h,!0)}})}var Ja=!1,en=!1,aa=co({requestFrame:e=>{let t=0;return t=requestAnimationFrame(()=>{t=0,e()}),()=>{t!==0&&cancelAnimationFrame(t)}}});function Jo(e){return Ja?()=>{}:(Ja=!0,D(e,"dsh-web-mobile: DOM reconciler",()=>{let t=new MutationObserver(a=>{let n=new Set;for(let o of a)(o.target instanceof Element?o.target:o.target.parentElement)?.closest("[data-chat-flow]")||n.add(lo(o));n.size>0&&aa.note(n)});return t.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,characterData:!0,attributeFilter:["style","class","data-phase","data-sidebar-collapsed"]}),aa.activate(),()=>{t.disconnect(),aa.deactivate()}}),()=>{Ja=!1})}function me(e){return aa.register(e)}function er(e,t){if(en)return()=>{};en=!0;let a=e.locale.bind(re),n=[me(bo()),me(go(a,()=>Lt(e),t)),me(t.task),me(wo()),me(_o(e)),me(Kt(e)),me(Lo())];return()=>{for(let o of n)o();en=!1}}var Mt="dsh-mobile-visible-band";function tr({frameBudgetMs:e=32,stutterLimit:t=3,burstIdleMs:a=240}={}){let n=!0,o=0,r=0;return{noteFrame:l=>{if(!n)return!1;if(o===0||l-o>a)return o=l,r=0,!0;let s=l-o;return o=l,s<=e?(r=0,!0):(r+=1,r>=t&&(n=!1),n)},noteSettled:()=>{o=0,r=0},isLive:()=>n,reset:()=>{n=!0,o=0,r=0}}}var ar="data-mobile-nav-ios",tn="width=device-width, initial-scale=1, viewport-fit=cover",nr="--dsh-web-mobile-vh",an=()=>document.querySelector('meta[name="viewport"]');function or(){let e=null,t=null,a=!1,n=()=>{let d=an();d!==null&&(e===null&&(e=d.content),!(a||d.content===tn)&&(a=!0,d.content=tn,a=!1))},o=new MutationObserver(n),r=()=>{let d=an();d!==t&&(t!==null&&o.disconnect(),t=d,d!==null&&o.observe(d,{attributes:!0,attributeFilter:["content"]}))},i=new MutationObserver(()=>{r(),n()});return i.observe(document.head,{childList:!0}),r(),n(),()=>{o.disconnect(),i.disconnect();let d=an();d!==null&&e!==null&&d.content===tn&&(d.content=e)}}function rr(){let e=document.documentElement,t=0,a=0,n="",o="",r="",i="",d=0,f=0,b=tr(),l=u=>{o!==u&&(o=u,e.style.setProperty("--dsha-mobile-visible-vh",u))},s=()=>{f=0;let u=window.innerHeight,x=window.innerWidth,g=window.visualViewport,v=`${Math.max(1,Math.min(u,g?.height??u))}px`,m=`${g?.offsetTop??0}px`;e.style.getPropertyValue("--dsha-mobile-viewport-top")!==m&&e.style.setProperty("--dsha-mobile-viewport-top",m),d=v===i?d+1:0,i=v;let C=d>=2;if(b.isLive()?(l(v),C?b.noteSettled():b.noteFrame(performance.now())):C&&l(v),C&&v!==r&&(r=v,document.dispatchEvent(new CustomEvent(Mt))),!C&&f===0&&(f=requestAnimationFrame(s)),t===0||u>t||x!==a){t=u,a=x;let A=`${u}px`;A!==n&&(n=A,e.style.setProperty(nr,A))}};return s(),window.addEventListener("resize",s),window.visualViewport?.addEventListener("resize",s),window.visualViewport?.addEventListener("scroll",s),()=>{window.removeEventListener("resize",s),window.visualViewport?.removeEventListener("resize",s),window.visualViewport?.removeEventListener("scroll",s),f!==0&&cancelAnimationFrame(f),f=0,e.style.removeProperty("--dsha-mobile-visible-vh"),e.style.removeProperty("--dsha-mobile-viewport-top"),n="",e.style.removeProperty(nr)}}function ir(e){if(!e)return;let t=document.documentElement;return t.setAttribute(ar,""),()=>{t.removeAttribute(ar)}}var El='[data-dsh-responsive-part="sidebar-toggle"]:not([data-mobile-nav])',sr='[data-mobile-nav="dismiss-shadow"]';function Tl(){if(typeof document>"u")return;let e=document.querySelector(sr),t=document.querySelector(El),a=t?.closest('[data-pane="sidebar"]')??null;if(t===null||a===null){e?.remove();return}if(e!==null&&e.parentElement===a&&a.firstElementChild===e)return;let n=e??document.createElement("span");e===null&&(n.setAttribute("data-mobile-nav","dismiss-shadow"),n.setAttribute("data-dsh-responsive-part","sidebar-toggle"),n.setAttribute("aria-hidden","true"),n.style.setProperty("display","none","important")),a.insertBefore(n,a.firstElementChild)}function lr(){if(nn)return()=>{};nn=!0;let e=null,t=me({name:"frame-marker",scopes:["*"],ensure:()=>{e=Na(),e!==null&&!e.hasAttribute("data-mobile-nav")&&e.setAttribute("data-mobile-nav","frame"),Tl()},dispose:()=>{e!==null&&e.removeAttribute("data-mobile-nav"),typeof document<"u"&&document.querySelector(sr)?.remove(),e=null}}),a=me(so());return()=>{a(),t(),nn=!1}}var nn=!1;function dr(e){D(e,"dsh-web-mobile: status bar theme + viewport + zoom guard",()=>{let t=document.createElement("meta");t.name="theme-color";let a=()=>getComputedStyle(document.body).backgroundColor,n=typeof CSS<"u"&&typeof CSS.supports=="function"?f=>CSS.supports(f):null;t.content=a(),t.parentElement===null&&document.head.appendChild(t);let o=new MutationObserver(()=>{t.content=a()});o.observe(document.body,{attributes:!0,attributeFilter:["data-ds-dark-theme"]});let r=or(),i=ir(Gt(navigator,n)),d=rr();return()=>{d(),o.disconnect(),r(),t.remove(),i?.()}})}var na="data-mobile-nav-selecting";function Sl(){let e=window.getSelection();if(e===null||e.isCollapsed)return!1;let t=e.anchorNode;if(t===null)return!1;let a=t instanceof HTMLElement?t:t.parentElement;return a===null||a.closest("[data-composer-card]")!==null?!1:a.closest("[data-phase]")!==null}function cr(e){D(e,"dsh-web-mobile: selection chrome yield",()=>{if(typeof document>"u")return;let t=document.documentElement,a=()=>{let n=Sl();n!==t.hasAttribute(na)&&(n?t.setAttribute(na,""):t.removeAttribute(na))};return document.addEventListener("selectionchange",a),a(),()=>{document.removeEventListener("selectionchange",a),t.removeAttribute(na)}})}var pr='[data-mobile-nav="frame"] button[class*="_trigger"][aria-haspopup="tree"][aria-expanded]:not([class*="_switcherTrigger"])',Cl='[class*="ZKlsPq_root"], [class*="ZKlsPq_menu"], [class*="h8S2Va_root"], [class*="h8S2Va_menu"]',Al=800,Ll=1e3,hr=["mouseover","mouseout","mouseenter","mouseleave","pointerout","pointerleave"];function ur(e){D(e,"dsh-web-mobile: lineage chip touch toggle",()=>{if(typeof PointerEvent>"u")return;let t=0,a=()=>{t=Date.now()+Al},n=null,o=0,r=b=>{if(b.pointerType!=="touch"&&b.pointerType!=="pen")return;a();let l=b.target;if(!(l instanceof Element))return;let s=l.closest(pr);if(s===null)return;let u=s.getAttribute("aria-expanded")==="true";s.dispatchEvent(new KeyboardEvent("keydown",{key:u?"Escape":"ArrowDown",bubbles:!0,cancelable:!0})),n=s,o=Date.now()+Ll},i=b=>{if(n===null)return;if(Date.now()>=o){n=null;return}let l=b.target;l instanceof Element&&l.closest(pr)===n&&(n=null,b.stopPropagation())},d=b=>{b.pointerType!=="touch"&&b.pointerType!=="pen"||a()},f=b=>{if(Date.now()>=t||!b.isTrusted)return;let l=b.target;l instanceof Element&&l.closest(Cl)!==null&&b.stopImmediatePropagation()};document.addEventListener("pointerdown",d,!0),document.addEventListener("pointerup",r,!0),document.addEventListener("click",i,!0);for(let b of hr)document.addEventListener(b,f,!0);return()=>{document.removeEventListener("pointerdown",d,!0),document.removeEventListener("pointerup",r,!0),document.removeEventListener("click",i,!0);for(let b of hr)document.removeEventListener(b,f,!0)}})}var Ml="workspace",Rl='data-mobile-nav="session-delete"',on="var(--dsw-alias-state-error-primary, #b91c1c)",Pl='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.4782 4.84067L14.2138 10.1152C14.1102 12.1872 14.067 13.0115 13.3866 13.9607C13.1044 14.3546 12.7498 14.6912 12.3424 14.9535C11.8239 15.2872 11.2415 15.4316 10.5585 15.4998C9.88727 15.5668 9.04946 15.5656 7.99998 15.5656C6.95051 15.5656 6.1127 15.5668 5.44142 15.4998C4.75851 15.4316 4.17602 15.2872 3.65753 14.9535C3.25012 14.6912 2.89559 14.3546 2.61332 13.9607C1.93296 13.0115 1.88979 12.1872 1.78619 10.1152L1.52179 4.84067L2.89006 4.77277L3.15343 10.0463C3.26221 12.2218 3.32452 12.6015 3.72646 13.1624C3.90825 13.4161 4.13686 13.6334 4.39927 13.8023C4.66204 13.9714 5.00263 14.0792 5.57825 14.1367C6.16562 14.1953 6.92298 14.1963 7.99998 14.1963C9.07699 14.1963 9.83434 14.1953 10.4217 14.1367C10.9973 14.0792 11.3379 14.1367 11.6007 13.8023C11.8631 13.6334 12.0917 13.4161 12.2735 13.1624C12.6755 12.6015 12.7378 12.2218 12.8465 10.0463L13.1099 4.77277L14.4782 4.84067ZM5.43011 6.22849H6.7994V11.3909H5.43011V6.22849ZM9.20056 6.22849H10.5699V11.3909H9.20056V6.22849ZM8.53597 0.434431C9.17976 0.434431 9.6522 0.426926 10.0966 0.571258C10.2357 0.616451 10.3717 0.672554 10.502 0.738948C10.9182 0.951107 11.2464 1.29099 11.7015 1.74612L12.4978 2.54136H15.3742V3.91169H0.625732V2.54136H3.50218L4.29845 1.74612C4.75358 1.29099 5.08174 0.951107 5.49801 0.738948C5.62831 0.672554 5.76425 0.616451 5.90334 0.571258C6.34776 0.426926 6.82021 0.434431 7.46399 0.434431H8.53597ZM7.46399 1.80476C6.73208 1.80476 6.51641 1.81187 6.32617 1.87369C6.25545 1.89667 6.18668 1.92533 6.12041 1.95907C5.96398 2.03878 5.82348 2.16253 5.44142 2.54136H10.5585C10.1765 2.16253 10.036 2.03878 9.87955 1.95907C9.81329 1.92533 9.74452 1.89667 9.6738 1.87369C9.48356 1.81187 9.26789 1.80476 8.53597 1.80476H7.46399Z" fill="currentColor" /></svg>';function Ke(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function mr(e){D(e,"dsh-web-mobile: session-menu delete",()=>{let t=e.locale.bind(re),a=(h,_)=>e.locale.bind(Ml)(h,_),n=null,o=0,r=null,i=null,d=0,f=h=>{let _=h.getAttribute("data-row-key")??"";if(_.startsWith("session:")){let R=_.slice(8);if(R!=="")return R}let T=h.getAttribute("data-dsha-session-select");return T!==null&&T!==""?T:Zt(Yt(h),C)},b=h=>(h.querySelector('[class*="_itemLabel"]')??h).textContent?.trim()??"",l=h=>{let _=[...h.querySelectorAll('[role="menuitem"]')].map(b),T=a("rename"),R=a("menu.fork");return _.includes(T)&&_.includes(R)&&_.includes(a("menu.archiveSession"))},s=()=>{i!==null&&(document.removeEventListener("keydown",i,!0),i=null),r!==null&&(r.backdrop.remove(),r.card.remove(),r=null)},u=(h,_)=>{s();let T=document.body,R=document.createElement("div");R.dataset.mobileNav="delete-dialog-backdrop";let P=document.createElement("div");P.dataset.mobileNav="delete-dialog",P.setAttribute("role","dialog"),P.setAttribute("aria-modal","true"),P.innerHTML=`
        <div data-mobile-nav="delete-confirm-title">${Ke(t("deleteConfirmTitle"))}</div>
        <div data-mobile-nav="delete-confirm-desc">${Ke(t("deleteConfirmDesc",{title:_}))}</div>
        <div data-mobile-nav="delete-confirm-actions">
          <button type="button" data-mobile-nav="delete-confirm-no">${Ke(t("deleteConfirmNo"))}</button>
          <button type="button" data-mobile-nav="delete-confirm-yes">${Ke(t("deleteConfirmYes"))}</button>
        </div>
        <div data-mobile-nav="delete-error" role="alert" hidden></div>`;let O=P.querySelector('[data-mobile-nav="delete-confirm-no"]'),H=P.querySelector('[data-mobile-nav="delete-confirm-yes"]'),W=P.querySelector('[data-mobile-nav="delete-error"]');O?.addEventListener("click",s),R.addEventListener("click",I=>{I.target===R&&s()});let G=I=>{I.key==="Escape"&&s()};document.addEventListener("keydown",G,!0),i=G;let V=()=>{H!==null&&(H.disabled=!1,H.textContent=t("deleteConfirmYes")),O!==null&&(O.disabled=!1)},Z=I=>{W!==null&&(W.textContent=I,W.hidden=!1),V()},ae=(I,B)=>{let q=I?.error?.code;if(q==="session-not-found")return t("deleteErrorNotFound");if(q==="session-busy")return t("deleteErrorBusy");let Q=I?.error?.message??(B instanceof Error?B.message:String(B));return t("deleteErrorGeneric",{message:Q})};H?.addEventListener("click",async()=>{H.disabled=!0,O!==null&&(O.disabled=!0),H.textContent=t("deletePending"),W!==null&&(W.hidden=!0);let I=++d;try{let oe=await fetch("/api/mobile-nav.session.delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionId:h})}),se=await oe.json().catch(()=>null);if(!oe.ok||se===null||se.ok!==!0){Z(ae(se,new Error(`HTTP ${oe.status}`)));return}}catch(oe){let se=!1;try{se=await yo({listed:()=>e.sessions.list.getSnapshot()?.byId?.[h]!==void 0,refresh:async()=>{await e.sessions.refresh?.()},sleep:Pe=>new Promise(Ze=>{window.setTimeout(()=>{Ze()},Pe)})})}catch{se=!1}if(!se){Z(ae(null,oe));return}}let B=ue(e.sessions.list.getSnapshot())===h;if(I!==d)return;s(),B&&vo(e.sessions)&&e.sessions.clear();let q=e.sessions;try{await q.refresh?.()}catch(oe){console.warn("[dsh-web-mobile] session list refresh after delete failed:",oe)}let Q=j();Q===null||Q.hasAttribute("data-sidebar-collapsed")||B&&window.matchMedia(Be).matches&&Lt(e)}),T.appendChild(R),R.appendChild(P),r={backdrop:R,card:P}},x=h=>{s();let _=document.body,T=document.createElement("div");T.dataset.mobileNav="delete-dialog-backdrop";let R=document.createElement("div");R.dataset.mobileNav="delete-dialog",R.setAttribute("role","dialog"),R.setAttribute("aria-modal","true"),R.innerHTML=`
        <div data-mobile-nav="delete-confirm-title">${Ke(t("deleteSession"))}</div>
        <div data-mobile-nav="delete-error" role="alert">${Ke(h)}</div>
        <div data-mobile-nav="delete-confirm-actions">
          <button type="button" data-mobile-nav="delete-confirm-no">${Ke(t("deleteConfirmNo"))}</button>
        </div>`,R.querySelector('[data-mobile-nav="delete-confirm-no"]')?.addEventListener("click",s),T.addEventListener("click",O=>{O.target===T&&s()});let P=O=>{O.key==="Escape"&&s()};document.addEventListener("keydown",P,!0),i=P,_.appendChild(T),T.appendChild(R),r={backdrop:T,card:R}},g=new Set,S=h=>{if(h.querySelector(`[${Rl}]`)!==null)return;let _=h.querySelector('[role="menuitem"]'),T=_?.parentElement??null,R=h.querySelector('[class*="_viewport"]');if(_===null||T===null||R===null)return;let P=T.cloneNode(!0),O=P.querySelector('[role="menuitem"]');if(O===null)return;let H=O.querySelector('[class*="_itemIcon"]');H!==null&&(H.innerHTML=Pl,H.style.color=on);let W=O.querySelector('[class*="_itemLabel"]');W!==null?(W.textContent=t("deleteSession"),W.style.color=on):O.firstElementChild===null&&(O.textContent=t("deleteSession"),O.style.color=on),O.setAttribute("data-mobile-nav","session-delete"),O.addEventListener("click",G=>{G.preventDefault(),G.stopPropagation();let V=n;V?.button.click();try{if(V===null){x(t("deleteErrorResolve"));return}let Z=V.sessionId;if(Z===null){x(t("deleteErrorResolve"));return}u(Z,V.title)}catch(Z){console.error("[dsh-web-mobile] session delete failed:",Z),x(t("deleteErrorGeneric",{message:Z instanceof Error?Z.message:String(Z)}))}}),R.appendChild(P),g.add(P)},v=()=>{for(let _ of g)_.isConnected||g.delete(_);let h=a("session.new");for(let _ of document.querySelectorAll('[role="menu"]'))l(_)&&(n!==null&&n.title===h||S(_))},m=()=>{o===0&&(o=requestAnimationFrame(()=>{o=0,v()}))},C=h=>e.sessions.list.getSnapshot().byId[h]!==void 0,A=h=>{let _=[...h.querySelectorAll("button")],T=_.find(P=>{let O=P.getAttribute("aria-label")??"";return/session actions/i.test(O)});return T!==void 0?T:_.find(P=>{let O=P.getAttribute("aria-label")??"";return!/archive session|pin session/i.test(O)})??null},k=h=>{if(!(h instanceof Element))return;let _=h.closest('[class*="_sessionRow"]');if(_===null)return;let T=A(_);if(T===null)return;let R=_.querySelector('[class*="_title"]')?.textContent?.trim()??"",P=f(_);n={button:T,title:R,sessionId:P},m()},E=h=>k(h.target),c=h=>k(h.target);document.addEventListener("click",E,!0),document.addEventListener("contextmenu",c,!0);let p=h=>{if(n===null)return!1;for(let _ of h.removedNodes)if(_ instanceof Element&&(_.matches('[role="menu"]')||_.querySelector('[role="menu"]')!==null))return!0;return!1},L=new MutationObserver(h=>{let _=h.length===0;for(let R of h)if((R.target instanceof Element?R.target:R.target.parentElement)?.closest("[data-chat-flow]")==null){_=!0;break}if(!_)return;let T=!1;for(let R of h){if(R.type!=="childList")continue;let P=R.target;if(P===document.body){m();break}if(T||(T=p(R)),P instanceof HTMLElement&&(P.matches('[role="menu"]')||P.closest('[role="menu"]')!==null)){m();break}}T&&n!==null&&![...document.querySelectorAll('[role="menu"]')].some(l)&&(n=null)});return L.observe(document.body,{childList:!0,subtree:!0}),v(),()=>{document.removeEventListener("click",E,!0),document.removeEventListener("contextmenu",c,!0),L.disconnect(),o!==0&&cancelAnimationFrame(o),s();for(let h of g)h.remove();g.clear(),n=null}},jt)}var Ol="[data-composer-card]",rn="[data-composer-input]",Il='button, [role="button"], [role="option"], [role="menuitem"], [role="combobox"], [aria-haspopup], select, a[href], label, input',Re="data-mobile-nav-focus-shadow";function fr(e){D(e,"dsh-web-mobile: composer keyboard guard",()=>{let t=Gt(navigator,typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports.bind(CSS):null),a=typeof matchMedia=="function"&&matchMedia("(pointer: coarse)").matches;if(!t&&!a)return;let n=0,o=()=>{window.clearTimeout(n),n=0;let d=document.querySelector(`[${Re}]`);if(d===null)return;d.removeAttribute(Re);let f=d;Object.prototype.hasOwnProperty.call(d,"focus")&&delete f.focus},r=d=>{let f=d.target;if(!(f instanceof Element)||typeof f.closest!="function")return;let b=f.closest(Ol);if(b===null)return;let l=b.querySelector(rn);if(l===null)return;if(f.closest(rn)!==null){o();return}let s=f.closest(Il);if(s===null||!b.contains(s)){o();return}o(),l.setAttribute(Re,""),Object.defineProperty(l,"focus",{configurable:!0,writable:!0,value:function(){}}),window.clearTimeout(n),n=window.setTimeout(o,700)},i=d=>{if(n===0)return;let f=d.target;f instanceof HTMLElement&&f.closest(rn)!==null&&f.blur()};return document.addEventListener("pointerdown",r,!0),document.addEventListener("touchstart",r,!0),document.addEventListener("mousedown",r,!0),document.addEventListener("focusin",i,!0),()=>{document.removeEventListener("pointerdown",r,!0),document.removeEventListener("touchstart",r,!0),document.removeEventListener("mousedown",r,!0),document.removeEventListener("focusin",i,!0),o()}})}function br(e){let{visibleHeight:t,headerBottom:a,seatHeight:n,seatBottom:o,scrollY:r,offsetTop:i}=e;for(let s of[t,a,n,o,r,i])if(!Number.isFinite(s))return 0;if(Math.abs(r-i)>24)return 0;let d=Math.max(0,t),f=Math.max(0,d-Math.max(0,n)),b=Math.max(0,a-f),l=Math.max(0,o-d);return b+l}function gr(e,t){return Number.isFinite(t)?e?t>0:t>=1:!1}var Rt="data-mobile-nav-composer-tight",Nl='[class*="_composerSeat"]',Hl='header:has([class*="_headerLeading"])';function wr(e){D(e,"dsh-web-mobile: composer clearance",()=>{let t=!1,a=0,n=0,o=()=>{t=!1,a=0,j()?.removeAttribute(Rt)},r=()=>{n=0;let d=j();if(d===null){o();return}let f=d.querySelector(Nl),b=d.querySelector(Hl),l=f?.getBoundingClientRect()??null;if(f===null||b===null||l===null||l.width===0||l.height===0){o();return}t||(a=l.height);let s=window.visualViewport,u=br({visibleHeight:Math.min(window.innerHeight,s?.height??window.innerHeight),headerBottom:b.getBoundingClientRect().bottom,seatHeight:a>0?a:l.height,seatBottom:l.bottom,scrollY:window.scrollY,offsetTop:s?.offsetTop??0});t=gr(t,u),t?d.hasAttribute(Rt)||d.setAttribute(Rt,""):d.hasAttribute(Rt)&&d.removeAttribute(Rt)},i=()=>{n===0&&(n=requestAnimationFrame(r))};return window.addEventListener("resize",i),window.addEventListener("orientationchange",i),window.visualViewport?.addEventListener("resize",i),window.visualViewport?.addEventListener("scroll",i),document.addEventListener("focusin",i,!0),document.addEventListener("focusout",i,!0),i(),()=>{window.removeEventListener("resize",i),window.removeEventListener("orientationchange",i),window.visualViewport?.removeEventListener("resize",i),window.visualViewport?.removeEventListener("scroll",i),document.removeEventListener("focusin",i,!0),document.removeEventListener("focusout",i,!0),n!==0&&(cancelAnimationFrame(n),n=0),o()}})}function vr(e){D(e,"dsh-web-mobile: document scroll lock",()=>{let t=window.scrollBy.bind(window),a=window.scrollTo.bind(window),n=()=>{(window.scrollX!==0||window.scrollY!==0)&&a(0,0)},o=((...d)=>{n()}),r=((...d)=>{n()}),i=()=>{(window.scrollX!==0||window.scrollY!==0)&&a(0,0)};return window.scrollBy=o,window.scrollTo=r,window.addEventListener("scroll",i,{passive:!0}),document.addEventListener("scroll",i,!0),i(),()=>{window.scrollBy=t,window.scrollTo=a,window.removeEventListener("scroll",i),document.removeEventListener("scroll",i,!0)}})}var xr={reservePx:0,bandPx:0};function yr(e){let{visibleHeight:t,headerHeight:a,frameBottom:n,seatBottom:o,framePadding:r}=e;for(let l of[t,a,n,o,r])if(!Number.isFinite(l))return xr;if(t<=0||a<0)return xr;let i=Math.max(0,t-o),d=Math.max(0,o-n),f=i+d+Math.max(0,r),b=Math.max(0,t-a-f);return{reservePx:f,bandPx:b}}function kr(e){return!Number.isFinite(e)||e<=0?0:Math.min(e*.6,520)}function _r(e,t,a,n){return!t||!Number.isFinite(a)||a<=0?!1:e||!Number.isFinite(n)||n<=0?!0:a>n}function Er(e){let{fieldTop:t,fieldBottom:a,bodyTop:n,bodyBottom:o,scrollTop:r,scrollHeight:i,clientHeight:d,visibleTop:f,visibleBottom:b}=e;for(let v of[t,a,n,o,r,i,d])if(!Number.isFinite(v))return r;let l=f===void 0||!Number.isFinite(f)?n:Math.max(n,f),s=b===void 0||!Number.isFinite(b)?o:Math.min(o,b);if(s-l<1)return r;let u=Math.max(0,i-d),x=Math.max(0,s-l),g=Math.min(8,x/2),S=r;return t<l+g?S=r-(l+g-t):a>s-g&&(S=r+(a-(s-g))),Math.min(Math.max(S,0),u)}var Pt="data-mobile-nav-question-full",sn="--dsha-mobile-question-reserve",Fl="question-expand",zl='[class*="_frame"][style*="--dsh-composer-side-clearance"], [class*="_frame"]',Bl='[class*="_headerActions"]',Tr='[class*="_body"]',Dl='[class*="_fieldInput"]',ql='[data-question-key] [class*="_card"]',Wl='[class*="_footer"]',Sr='[class*="_composerSeat"]',Vl="--dsha-mobile-visible-vh",jl="--mobile-nav-header-h",Gl=['<svg class="dsh-web-mobile-question-expand" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>",'<svg class="dsh-web-mobile-question-collapse" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M2 6h4V2M14 6h-4V2M2 10h4v4M14 10h-4v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>"].join(""),Cr=e=>{let t=document.documentElement.style.getPropertyValue(e).trim(),a=Number.parseFloat(t);return Number.isFinite(a)?a:Number.NaN};function Ar(e){let t=e.locale.bind(re);D(e,"dsh-web-mobile: question fullscreen",()=>{let a=!1,n=!1,o=null,r=null,i="",d=0,f=null,b=null,l=c=>(f!==null&&f.isConnected&&c.contains(f)||(f=c.querySelector(Sr)),f),s=()=>{let c=j();if(c===null)return null;let L=l(c)??c;return b!==null&&b.isConnected&&L.contains(b)||(b=L.querySelector(zl)),b},u=()=>t(n?"questionCollapse":"questionExpand"),x=()=>{if(o===null)return;let c=u();o.getAttribute("aria-label")!==c&&(o.setAttribute("aria-label",c),o.title=c);let p=n?"true":"false";o.getAttribute("aria-expanded")!==p&&o.setAttribute("aria-expanded",p)},g=()=>{a=!1,n=!1,d!==0&&(cancelAnimationFrame(d),d=0);let c=j();c!==null&&c.hasAttribute(Pt)&&c.removeAttribute(Pt),r?.style.removeProperty(sn),r=null,i="",x()},S=()=>{let c=document.activeElement;if(!(c instanceof HTMLElement)||!c.matches(Dl))return;let p=c.closest(ql),L=c.closest(Tr),h=p!==null&&p.scrollHeight>p.clientHeight+1?p:L;if(h===null)return;let _=h===p?p.querySelector(":scope > "+Wl):null,R=c.getBoundingClientRect(),P=h.getBoundingClientRect(),O=_?.getBoundingClientRect().top??Number.NaN,H={top:P.top,bottom:Number.isFinite(O)?Math.min(P.bottom,O):P.bottom},W=window.visualViewport,G=W?.offsetTop??Number.NaN,V=W==null?Number.NaN:W.offsetTop+W.height,Z=Er({fieldTop:R.top,fieldBottom:R.bottom,bodyTop:H.top,bodyBottom:H.bottom,scrollTop:h.scrollTop,scrollHeight:h.scrollHeight,clientHeight:h.clientHeight,visibleTop:G,visibleBottom:V});Math.abs(Z-h.scrollTop)>=1&&(h.scrollTop=Z)},v=()=>{d=0;let c=j(),p=s();if(c===null||p===null){g();return}let L=c.querySelector(Sr),h=p.getBoundingClientRect(),_=L?.getBoundingClientRect()??null,T=getComputedStyle(p),R=Cr(Vl),P=yr({visibleHeight:R,headerHeight:Cr(jl),frameBottom:h.bottom,seatBottom:_===null?Number.NaN:_.bottom,framePadding:Number.parseFloat(T.paddingTop)+Number.parseFloat(T.paddingBottom)}),O=_r(n,a,P.bandPx,kr(R)),H=`${Math.round(P.reservePx)}px`;r!==p&&(r?.style.removeProperty(sn),r=p,i=""),i!==H&&(i=H,p.style.setProperty(sn,H)),O!==c.hasAttribute(Pt)&&(O?c.setAttribute(Pt,""):c.removeAttribute(Pt)),n=O,x(),n||(a=!1)},m=()=>{d===0&&(d=requestAnimationFrame(()=>{d=0,S(),a&&v()}))},C=()=>{a=!n,d!==0&&(cancelAnimationFrame(d),d=0),v(),n||(a=!1)},A=c=>{let p=c.querySelector(Bl);if(p!==null){if(o===null){let L=document.createElement("button");L.type="button",L.dataset.mobileNav=Fl,L.innerHTML=Gl,L.addEventListener("click",C),o=L}o.parentElement!==p&&p.insertBefore(o,p.lastElementChild),x()}},E=me({name:"question-fullscreen",scopes:["*"],ensure:()=>{let c=s();if(c===null){g();return}if(c.querySelector(Tr)===null){o?.remove(),g();return}A(c),a&&m()},dispose:()=>{g(),o!==null&&(o.removeEventListener("click",C),o.remove(),o=null)}});return window.addEventListener("resize",m),window.addEventListener("orientationchange",m),window.visualViewport?.addEventListener("resize",m),document.addEventListener("focusin",m,!0),document.addEventListener("focusout",m,!0),document.addEventListener(Mt,m),m(),()=>{window.removeEventListener("resize",m),window.removeEventListener("orientationchange",m),window.visualViewport?.removeEventListener("resize",m),document.removeEventListener("focusin",m,!0),document.removeEventListener("focusout",m,!0),document.removeEventListener(Mt,m),E()}})}var ln='[class*="_add"]',Ul="[data-trigger-menu]",Mr="[data-composer-input]",Kl=e=>{let t=e.getBoundingClientRect();return t.width>0&&t.height>0&&e.getClientRects().length>0},dn=()=>{for(let e of document.querySelectorAll(Ul))if(Kl(e))return e;return null},Rr=()=>{let e=document.querySelector(Mr);return e instanceof HTMLElement?e:null},Lr=()=>{let e=Rr();e!==null&&document.activeElement===e&&e.blur()},Xl=()=>{let e=Rr();e!==null&&e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",keyCode:27,which:27,bubbles:!0,cancelable:!0}))};function Pr(e){D(e,"dsh-web-mobile: composer plus toggle",()=>{let t=!1,a=[],n=()=>{for(let f of a)window.clearTimeout(f);a=[]},o=f=>{let b=f.target;t=b instanceof Element&&b.closest(ln)!==null&&dn()!==null},r=f=>{let b=f.target;b instanceof Element&&b.closest(ln)!==null&&Lr()},i=f=>{let b=t;t=!1;let l=f.target;if(!(!(l instanceof Element)||l.closest(ln)===null)){b&&dn()!==null&&Xl(),n();for(let s of[120,320,640])a.push(window.setTimeout(()=>{dn()!==null&&Lr()},s))}},d=f=>{let b=f.target;b instanceof Element&&b.closest(Mr)!==null&&n()};return document.addEventListener("pointerdown",r,!0),document.addEventListener("pointerdown",d,!0),document.addEventListener("click",o,!0),document.addEventListener("click",i,!1),()=>{n(),document.removeEventListener("pointerdown",r,!0),document.removeEventListener("pointerdown",d,!0),document.removeEventListener("click",o,!0),document.removeEventListener("click",i,!1)}})}var $l='[class*="heroWorkspaceRow"] > button[aria-haspopup="menu"]',Zl='[role="menu"]';function Or(e){D(e,"dsh-web-mobile: workspace chip toggle",()=>{let t=null,a=r=>r instanceof Element?r.closest($l):null,n=r=>{t=null;let i=a(r.target);i!==null&&i.getAttribute("aria-expanded")==="true"&&document.querySelector(Zl)!==null&&(t=i)},o=r=>{let i=t;t=null,!(i===null||a(r.target)!==i)&&r.stopPropagation()};return document.addEventListener("pointerdown",n,!0),document.addEventListener("click",o,!0),()=>{t=null,document.removeEventListener("pointerdown",n,!0),document.removeEventListener("click",o,!0)}})}var Yl="[data-team-action]",Ql='[data-team-action] > button[aria-haspopup="dialog"]',Jl="[data-team-panel]";function Ir(e){D(e,"dsh-web-mobile: team chip toggle",()=>{let t=null,a=r=>r instanceof Element?r.closest(Ql):null,n=r=>{t=null;let i=a(r.target);i!==null&&i.getAttribute("aria-expanded")==="true"&&document.querySelector(Yl)!==null&&document.querySelector(Jl)!==null&&(t=i)},o=r=>{let i=t;t=null,!(i===null||a(r.target)!==i)&&(document.body.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0})),r.stopPropagation())};return document.addEventListener("pointerdown",n,!0),document.addEventListener("click",o,!0),()=>{t=null,document.removeEventListener("pointerdown",n,!0),document.removeEventListener("click",o,!0)}},jt)}var Nr='[class*="_7KE1Ra_trigger"]',Hr='[class*="_7KE1Ra_menu"]',ed="[data-composer-card]",oa=8,Fr=[0,60,200];function zr(e){D(e,"dsh-web-mobile: model menu anchor",()=>{let t=0,a=null,n=null,o=[],r=null,i=null,d=null,f=null,b=()=>{let p=f;f=null,p!==null&&p.el.style.left===p.value&&(p.el.style.left=p.original)},l=p=>{if(p===null)return null;let L=n?.get(p);if(L!==void 0)return L;let h=p.getBoundingClientRect(),_=h.width>0&&h.height>0?h:null;return n?.set(p,_),_},s=()=>{for(let p of document.querySelectorAll(Hr))if(l(p)!==null)return p;return null},u=p=>{let L=l(p);if(L===null)return;let h=L.width,_=document.documentElement.clientWidth,T=Math.max(oa,_-h-oa),R=l(i),P=l(d),O=R===null?null:R.right-h,H;if(O!==null&&O>=oa&&O<=T)H=O;else if(P!==null)H=P.left+(P.width-h)/2;else return;let W=`${Math.round(Math.min(Math.max(H,oa),T))}px`;f!==null&&f.el!==p&&b(),f===null?f={el:p,value:W,original:p.style.left}:f.value=W,p.style.left!==W&&(p.style.left=W)},x=()=>{r=s(),i=r===null?null:document.querySelector(Nr),d=r===null?null:document.querySelector(ed),r!==null&&u(r)},g=()=>{if(r!==null){if(l(r)===null){b(),r=null,i=null,d=null;return}u(r)}},S=p=>{a=p,t===0&&(t=window.requestAnimationFrame(()=>{t=0;let L=a;a=null,n=new Map;try{L!==null&&L()}finally{n=null}}))},v=()=>{S(x);for(let p of Fr)o.push(window.setTimeout(()=>S(x),p));for(;o.length>Fr.length*2;){let p=o.shift();p!==void 0&&window.clearTimeout(p)}},m=p=>{let L=p.target;return L instanceof Element?L.closest(Nr)!==null||L.closest(Hr)!==null:!1},C=p=>{m(p)&&v()},A=p=>{m(p)&&v()},k=p=>{m(p)&&v()},E=p=>{m(p)&&v()},c=()=>{S(g)};return document.addEventListener("pointerdown",C,!0),document.addEventListener("keydown",A,!0),document.addEventListener("focusin",k,!0),document.addEventListener("click",E,!0),window.addEventListener("resize",c),document.addEventListener("scroll",c,!0),()=>{document.removeEventListener("pointerdown",C,!0),document.removeEventListener("keydown",A,!0),document.removeEventListener("focusin",k,!0),document.removeEventListener("click",E,!0),window.removeEventListener("resize",c),document.removeEventListener("scroll",c,!0),t!==0&&window.cancelAnimationFrame(t),a=null,n=null;for(let p of o)window.clearTimeout(p);o.length=0,b(),r=null,i=null,d=null}})}var ra=new Set,ia=null;function sa(e){if(ia===null){let a=HTMLInputElement.prototype,n=Object.getOwnPropertyDescriptor(a,"focus"),o=a.focus;if(typeof o!="function"||n?.configurable===!1||!n&&!Object.isExtensible(a))return()=>{};let r=function(d){for(let f of ra)if(f.shouldSkip(this))return;o.call(this,d)};try{Object.defineProperty(a,"focus",{configurable:!0,writable:!0,enumerable:n?.enumerable??!1,value:r})}catch{return()=>{}}ia=()=>{if(Object.getOwnPropertyDescriptor(a,"focus")?.value===r)try{n?Object.defineProperty(a,"focus",n):delete a.focus}catch{}}}let t={shouldSkip:e};return ra.add(t),()=>{if(ra.delete(t)&&ra.size===0){let a=ia;ia=null,a?.()}}}var Br='[data-shortcut-modal="shortcuts"] [data-modal-autofocus]';function Dr(e){D(e,"dsh-web-mobile: shortcut modal keyboard guard",()=>{let t=new WeakSet(document.querySelectorAll(Br)),a=new WeakSet,n=sa(o=>{if(o.matches(Br)){if(!t.has(o)&&o.hasAttribute("data-dsh-automatic-focus")){if(!a.has(o)){a.add(o),Promise.resolve().then(()=>t.add(o));let r=o.closest('[role="dialog"][aria-modal="true"]');r!==null&&!r.contains(document.activeElement)&&r.focus({preventScroll:!0})}return!0}t.add(o)}return!1});return()=>n()})}var td='[data-menu-material], [class*="_7KE1Ra_menu"]',ad='[data-menu-material] input[role="searchbox"], input[role="searchbox"][aria-controls$="-models"]',nd=2e3;function qr(e){D(e,"dsh-web-mobile: model menu keyboard guard",()=>{let t=null,a=0,n=()=>{t===null&&(t=sa(i=>i.matches(ad)))},o=()=>{t?.(),t=null},r=()=>{n(),window.clearTimeout(a),a=window.setTimeout(()=>{document.querySelector(td)===null&&o()},nd)};return document.addEventListener("pointerdown",r,!0),()=>{document.removeEventListener("pointerdown",r,!0),window.clearTimeout(a),o()}})}function Wr(e){return e.insideOpen||e.onInteractive?"ignore":"open"}var od="li[data-plugin-package], li[data-plugin-row], li[data-plugin-item]",rd='button[class*="_cardOpen"], button[class*="_rowOpen"]',id='button, a, input, select, textarea, [role="switch"], [role="button"], [role="tab"], [contenteditable="true"]';function Vr(e){D(e,"dsh-web-mobile: plugin card tap",()=>{let t=a=>{let n=a.target;if(!(n instanceof Element))return;let o=n.closest(od);if(o===null)return;let r=o.querySelector(rd);!(r instanceof HTMLButtonElement)||Wr({insideOpen:r.contains(n),onInteractive:n.closest(id)!==null})==="ignore"||(a.preventDefault(),r.click())};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)})}function jr(e,t){let a=0,n=!1;return{schedule(o){n||(n=!0,a=e(()=>{n=!1,o()}))},cancel(){n&&(t(a),n=!1)}}}function Gr(e){e.effect(()=>{let t=window.matchMedia(Be),a='[class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"])',n={"white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis","max-width":"100%"},o=[{pick:m=>m,props:{"flex-wrap":"wrap","align-items":"center",gap:"4px 10px"}},{pick:m=>m.children[0]??null,props:{flex:"1 1 100%","max-width":"100%","min-width":"0"}},{pick:m=>m.querySelector('[class*="spec"]'),props:n},{pick:m=>m.querySelector('[class*="nm"]'),props:n}],r=new WeakMap,i=(m,C)=>{let A=r.get(m);A===void 0&&r.set(m,A=new Map);for(let[k,E]of Object.entries(C)){let c="important",p=m.style.getPropertyValue(k),L=m.style.getPropertyPriority(k);if(p===E&&L===c)continue;let h=A.get(k),_=h!==void 0&&h.value===p&&h.priority===L;A.set(k,_?{...h,value:E,priority:c}:{value:E,priority:c,before:p,beforePriority:L}),m.style.setProperty(k,E,c)}},d=m=>{let C=r.get(m);if(C!==void 0){for(let[A,k]of C)C.delete(A),!(m.style.getPropertyValue(A)!==k.value||m.style.getPropertyPriority(A)!==k.priority)&&(k.before===""?m.style.removeProperty(A):m.style.setProperty(A,k.before,k.beforePriority));C.size===0&&r.delete(m)}},f=()=>{document.querySelectorAll(a).forEach(m=>{for(let C of o){let A=C.pick(m);A&&d(A)}})},b=null,l='[data-dsh-market-root], [role="dialog"]',s="[data-dsh-market-root]",u=()=>{let m=b;if(m!==null&&m.isConnected)return m;let C=document.querySelector(l);return C===null?(b=null,null):(b=C.matches(s)?C:document.querySelector(s)??C,b)},x=()=>{let m=u();if(m===null)return;let C=m.querySelectorAll(a);C.length===0&&!m.matches(s)&&(C=document.querySelectorAll(a)),C.forEach(A=>{for(let k of o){let E=k.pick(A);E&&i(E,k.props)}})},g=()=>{f(),t.matches&&x()};g();let S=jr(m=>window.requestAnimationFrame(m),m=>window.cancelAnimationFrame(m)),v=new MutationObserver((m=[])=>{let C=m.length===0;for(let A of m)if((A.target instanceof Element?A.target:A.target.parentElement)?.closest("[data-chat-flow]")==null){C=!0;break}C&&t.matches&&S.schedule(()=>{t.matches&&x()})});return v.observe(document.documentElement,{childList:!0,subtree:!0}),t.addEventListener("change",g),()=>{S.cancel(),v.disconnect(),t.removeEventListener("change",g),f(),b=null}},"dsh-web-mobile: installed-list-inline-styles")}function Ur(e){D(e,"tablet-quick-settings",()=>{let t=Kt(e);t.ensure();let a=!1,n=()=>{a=!1;try{t.ensure()}catch(r){console.error("[dsh-web-mobile] tablet-quick-settings",r)}},o=new MutationObserver(()=>{a||(a=!0,requestAnimationFrame(n))});return o.observe(document.documentElement,{childList:!0,subtree:!0}),()=>{o.disconnect(),t.dispose()}},no)}var sd=800,la="[data-composer-input]",Kr="data-mobile-panel-exit",Xr="dsh-mobile-panel-exit";function $r(e){D(e,"dsh-web-mobile: session focus guard",()=>{let t=e.sessions.list,a=ue(t.getSnapshot()),n=0,o=!1,r=()=>{window.clearTimeout(n),n=0,o=!1,f.disconnect();let S=document.querySelector(`[${Re}]`);if(S===null)return;S.removeAttribute(Re);let v=S;Object.prototype.hasOwnProperty.call(S,"focus")&&delete v.focus},i=S=>{S.hasAttribute(Re)||(S.setAttribute(Re,""),Object.defineProperty(S,"focus",{configurable:!0,writable:!0,value:function(){}}))},d=()=>document.querySelector(`[data-mobile-nav="frame"][${Kr}]`)!==null,f=new MutationObserver(()=>{if(!o)return;let S=document.querySelector(la);S!==null&&i(S)}),b=()=>{r(),o=!0;let S=document.querySelector(la);S!==null&&i(S),f.observe(document.documentElement,{childList:!0,subtree:!0}),n=window.setTimeout(r,sd)},l=new MutationObserver(()=>{!o&&d()&&b()}),s=S=>{if(!o)return;let v=S.target;v instanceof Element&&v.closest(la)!==null&&r()},u=S=>{if(!o)return;let v=S.target;v instanceof HTMLElement&&v.closest(la)!==null&&v.blur()},x=t.subscribe(()=>{let S=ue(t.getSnapshot());S!==a&&(a=S,b())}),g=()=>{o||b()};return l.observe(document.documentElement,{attributes:!0,attributeFilter:[Kr]}),document.addEventListener(Xr,g),document.addEventListener("pointerdown",s,!0),document.addEventListener("focusin",u,!0),()=>{x(),l.disconnect(),document.removeEventListener(Xr,g),document.removeEventListener("pointerdown",s,!0),document.removeEventListener("focusin",u,!0),r()}})}var ld="[data-composer-input]";function dd(e){if(!e.isTrusted||e.defaultPrevented||e.inputType!=="insertText")return!1;let t=e.data;return typeof t!="string"||t===`
`||t==="\r"?!1:t.includes(`
`)||t.includes("\r")}function cd(e){if(typeof DataTransfer!="function"||typeof ClipboardEvent!="function")return null;try{let t=new DataTransfer;t.setData("text/plain",e);let a=new ClipboardEvent("paste",{clipboardData:t,bubbles:!0,cancelable:!0});return a.clipboardData?.getData("text/plain")!==e?null:a}catch{return null}}function Zr(e){D(e,"dsh-web-mobile: composer paste guard",()=>{let t=a=>{if(!(a instanceof InputEvent)||!dd(a))return;let n=a.target;if(!(n instanceof Element))return;let o=n.closest(ld);if(o===null)return;let r=cd(a.data??"");r!==null&&(a.preventDefault(),a.stopPropagation(),o.dispatchEvent(r))};return document.addEventListener("beforeinput",t,!0),()=>{document.removeEventListener("beforeinput",t,!0)}})}var pd='[data-mobile-nav="file-upload"]',hd="[data-composer-card]",ud="input[type=file]",Xe=null;function md(e){return e==="image"?"image/*":""}function fd(e){return typeof e?.pickFile=="function"?e.pickFile.bind(e):void 0}function Qr(e){return Array.isArray(e)?e.filter(t=>typeof File<"u"&&t instanceof File):[]}function bd(e,t){return t?"fallback":e==null?"cancelled":Array.isArray(e)?e.length===0?"cancelled":Qr(e).length>0?"files":"fallback":"fallback"}function cn(){let e=document.querySelector(hd);return e===null?null:e.querySelector(ud)}function gd(e,t){if(t===null)return!1;try{let a=new DataTransfer;for(let n of e)a.items.add(n);t.files=a.files}catch{return!1}return t.dispatchEvent(new Event("change",{bubbles:!0})),!0}var wd='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20"><rect x="2.5" y="3.5" width="15" height="13" rx="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="7.2" cy="8" r="1.4" fill="currentColor"/><path d="M4.2 14.6l3.6-3.4 2.6 2.4 2.3-2.3 3.1 3.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',vd='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20"><path d="M12.6 3.2H6.4A1.9 1.9 0 0 0 4.5 5.1v9.8a1.9 1.9 0 0 0 1.9 1.9h7.2a1.9 1.9 0 0 0 1.9-1.9V6.6l-2.9-3.4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12.4 3.4v3.3h3.1" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';function pn(e,t=cn()){if(t===null)return;let a=md(e),n=t.hasAttribute("accept"),o=t.getAttribute("accept");a!==""&&t.setAttribute("accept",a);try{t.click()}finally{a!==""&&(n?t.setAttribute("accept",o??""):t.removeAttribute("accept"))}}async function xd(e,t){let a=window.DSHA,n=fd(a);if(n===void 0){pn("file");return}let o=cn(),r=t?.()??null,i=null,d=!1;try{i=await n({accept:[],multiple:!0,title:e("fileUploadAttachment")})}catch{d=!0}if(o===null||cn()!==o||r!==null&&(t?.()??null)!==r)return;let f=bd(i,d);f!=="cancelled"&&(f==="files"&&gd(Qr(i),o)||pn("file",o))}var Yr=8,Ot=8;function yd(e,t,a){let n=e.top-Yr-t.height;n<a.top+Ot&&(n=Math.min(e.bottom+Yr,a.bottom-t.height-Ot));let o=Math.max(a.left+Ot,Math.min(e.left,a.right-t.width-Ot));return{top:Math.round(Math.max(a.top+Ot,n)),left:Math.round(o)}}function kd(){let e=window.visualViewport;return e!=null?{top:e.offsetTop,bottom:e.offsetTop+e.height,left:e.offsetLeft,right:e.offsetLeft+e.width}:{top:0,bottom:window.innerHeight,left:0,right:window.innerWidth}}function _d(e,t,a){Xe?.(),Xe=null;let n=document.createElement("div");n.dataset.mobileNav="file-picker-backdrop";let o=document.createElement("div");o.dataset.mobileNav="file-picker",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label",e("fileUploadAttachment"));let r=[{kind:"image",icon:wd,label:e("fileUploadImage")},{kind:"file",icon:vd,label:e("fileUploadAttachment")}],i=[],d=()=>{Xe===d&&(Xe=null);for(let A of i.splice(0))A();n.remove()};Xe=d;let f=A=>{A.key==="Escape"&&d()};for(let A of r){let k=document.createElement("button");k.type="button",k.dataset.mobileNav="file-picker-option",k.dataset.kind=A.kind;let E=document.createElement("span");E.dataset.mobileNav="file-picker-icon",E.innerHTML=A.icon;let c=document.createElement("span");c.textContent=A.label,k.append(E,c),k.addEventListener("click",()=>{d(),A.kind==="file"?xd(e,a):pn(A.kind)}),o.append(k)}n.addEventListener("click",A=>{A.target===n&&d()}),document.addEventListener("keydown",f,!0),i.push(()=>document.removeEventListener("keydown",f,!0)),n.append(o),document.body.append(n),o.style.visibility="hidden";let b=!1,l=()=>{b||(b=!0,o.style.visibility="")},s="",u=0,x=window.setTimeout(l,400);i.push(()=>window.clearTimeout(x));let g=()=>{if(!t.isConnected){d();return}let A=t.getBoundingClientRect(),k=o.getBoundingClientRect(),E=yd(A,k,kd()),c=`${E.top}px`,p=`${E.left}px`;o.style.top!==c&&(o.style.top=c),o.style.left!==p&&(o.style.left=p);let L=`${E.top}:${E.left}`;L===s?u+=1:(s=L,u=0),u>=2&&l()};g();let S=!0,v=()=>{S||g()};window.addEventListener("resize",v),window.addEventListener("orientationchange",v),window.visualViewport?.addEventListener("resize",v),window.visualViewport?.addEventListener("scroll",v),i.push(()=>window.removeEventListener("resize",v)),i.push(()=>window.removeEventListener("orientationchange",v)),i.push(()=>window.visualViewport?.removeEventListener("resize",v)),i.push(()=>window.visualViewport?.removeEventListener("scroll",v));let m=0,C=requestAnimationFrame(function A(){if(g(),!o.isConnected){S=!1;return}++m<12?C=requestAnimationFrame(A):(S=!1,l())});i.push(()=>cancelAnimationFrame(C))}function Jr(e){D(e,"dsh-web-mobile: composer file picker",()=>{let t=e.locale.bind(re),a=()=>ue(e.sessions.list.getSnapshot())??null,n=o=>{let r=o.target;if(!(r instanceof Element))return;let i=r.closest(pd);i===null||i.hasAttribute("disabled")||(o.preventDefault(),o.stopPropagation(),_d(t,i,a))};return document.addEventListener("click",n,!0),()=>{document.removeEventListener("click",n,!0),Xe?.(),Xe=null,document.querySelector('[data-mobile-nav="file-picker-backdrop"]')?.remove()}})}var da="mobile-nav-attachments";function pt(e){return typeof e=="object"&&e!==null}function ei(e){return pt(e)?(Array.isArray(e.attachmentIds)?e.attachmentIds:Array.isArray(e.imageIds)?e.imageIds:[]).filter(a=>typeof a=="string"):[]}function ti(e,t){if(!Array.isArray(e))return[];let a=[];for(let n of e){if(!pt(n)||typeof n.id!="string")continue;let o=n.kind==="image"||n.kind==="file"?n.kind:void 0;if(o===void 0)continue;let r=pt(n.file)?n.file:void 0,i=typeof r?.name=="string"?r.name:"",d=typeof r?.size=="number"&&Number.isFinite(r.size)?r.size:void 0,f=pt(t)&&pt(t[n.id])?t[n.id]:void 0,b=f?.status==="uploading"||f?.status==="ready"||f?.status==="error"?f.status:void 0;a.push({id:n.id,kind:o,name:i,...d===void 0?{}:{bytes:d},...o==="file"&&b!==void 0?{status:b}:{}})}return a}function Ed(e){if(e<1024)return`${e} B`;let t=["KB","MB","GB"],a=e/1024,n=0;for(;a>=1024&&n<t.length-1;)a/=1024,n+=1;return`${a>=10?Math.round(a):Math.round(a*10)/10} ${t[n]}`}function Td(e){let t=new Map;for(let a of e)t.set(a.name,(t.get(a.name)??0)+1);return e.map((a,n)=>({v:1,id:a.id,kind:a.kind,name:a.name,ordinal:n+1,ambiguous:a.name===""||(t.get(a.name)??0)>1}))}function ai(e,t){return e.name===""?t.unnamed(e.ordinal):e.name}function Sd(e,t,a){if(a||t.includes("/"))return!1;let n=t.trim().toLowerCase();return n===""||e.toLowerCase().includes(n)}function ni(e,t,a,n){let o=t.trim().toLowerCase(),r=[];for(let[i,d]of Td(e).entries()){let f=e[i];if(f===void 0)continue;let b=ai(d,n);if(!Sd(b,t,a))continue;let l=[f.kind==="image"?n.kindImage:n.kindFile];f.bytes!==void 0&&l.push(Ed(f.bytes)),f.status==="uploading"?l.push(n.uploading):f.status==="error"&&l.push(n.failed),r.push({rank:o!==""&&b.toLowerCase().startsWith(o)?0:1,index:i,row:{name:b,description:l.join(" · "),icon:"file",section:n.section,value:JSON.stringify(d)}})}return r.sort((i,d)=>i.rank-d.rank||i.index-d.index),r.map(i=>i.row)}function oi(e){if(typeof e!="string")return;let t;try{t=JSON.parse(e)}catch{return}if(!pt(t)||t.v!==1)return;let{id:a,kind:n,name:o,ordinal:r,ambiguous:i}=t;if(!(typeof a!="string"||n!=="file"&&n!=="image"||typeof o!="string")&&!(typeof r!="number"||!Number.isInteger(r)||r<1||typeof i!="boolean"))return{v:1,id:a,kind:n,name:o,ordinal:r,ambiguous:i}}function Cd(e,t){return`@${t.mention}:${e.name===""?`#${e.ordinal}`:e.name}`}function hn(e,t){let a=oi(e);if(a!==void 0)return{source:da,ref:JSON.stringify(a),label:ai(a,t),appearance:"file",clipboardText:Cd(a,t)}}function ri(e){let t=oi(e);if(t===void 0)throw new Error(`${da}: unrecognized attachment reference`);let a=t.kind==="image"?"Image":"File",n=t.name===""?a:`${a} ${JSON.stringify(t.name)}`;return t.ambiguous?`[attachment #${t.ordinal}: ${n}]`:`[attachment: ${n}]`}var ii="pocketMobileNav.attachments",Ld={section:"本次附件","kind.file":"文件","kind.image":"图片","status.uploading":"上传中","status.failed":"上传失败",unnamed:"附件 {n}",mention:"附件"},Md={section:"Attachments in this message","kind.file":"File","kind.image":"Image","status.uploading":"Uploading","status.failed":"Upload failed",unnamed:"Attachment {n}",mention:"attachment"};function Rd(e,t){let a=e.get("sessions"),n=e.get("conversation"),o=a?.scope?.(t);if(o===void 0||n?.input?.for===void 0)return[];let r=ei(n.input.for(o)?.state?.getSnapshot());if(r.length===0)return[];let i=typeof n.resolveDraftAttachments=="function"?n.resolveDraftAttachments(r):typeof n.draftImages=="function"?n.draftImages(r):void 0;return ti(i,n.fileUploads?.getSnapshot())}function un(e){let t=e.locale.bind(ii);return{section:t("section"),kindFile:t("kind.file"),kindImage:t("kind.image"),uploading:t("status.uploading"),failed:t("status.failed"),unnamed:a=>t("unnamed",{n:a}),mention:t("mention")}}function Pd(e){return{trigger:"@",name:da,order:-10,showGroupTitle:!1,candidates(t,a){if(a.signal.aborted)return Promise.resolve([]);try{return Promise.resolve(ni(Rd(e,t.sessionId),a.query,a.drilled===!0,un(e)))}catch{return Promise.resolve([])}},onPick({candidate:t}){let a=hn(t.value,un(e));return a===void 0?void 0:{insert:a}},codec:{clipboardText:t=>hn(t,un(e))?.clipboardText??"",serialize:t=>{try{return Promise.resolve(ri(t))}catch(a){return Promise.reject(a)}}}}}function si(e){e.effect(()=>e.locale.register(ii,{zh:Ld,en:Md}),"dsh-web-mobile: attachment mention dictionaries"),e.inject(["inputTriggers"],t=>{D(t,"dsh-web-mobile: attachment mention source",()=>{let a=t.get("inputTriggers");if(typeof a?.registerSource=="function")return a.registerSource(Pd(t))})})}var ca="pocketMobileNavFileShare",li={share:"分享",shareFile:"分享「{name}」",downloadFile:"下载「{name}」",sharing:"正在准备文件…",downloadedUnsupported:"当前环境不支持直接分享；已开始下载，请在系统保存位置确认",downloadedTooLarge:"文件超过 50 MB；已开始下载，请在系统保存位置确认",downloadedShareFailed:"分享未能完成；已开始下载，请在系统保存位置确认",errorTooLarge:"文件太大（超过 200 MB），无法在手机端分享或下载",errorNotFound:"文件不存在或已被移动",errorGeneric:"分享失败：{message}"},di={share:"Share",shareFile:'Share "{name}"',downloadFile:'Download "{name}"',sharing:"Preparing file…",downloadedUnsupported:"Direct sharing is unavailable here; a download has started — confirm it at the location your system shows",downloadedTooLarge:"The file is over 50 MB; a download has started — confirm it at the location your system shows",downloadedShareFailed:"Sharing did not finish; a download has started — confirm it at the location your system shows",errorTooLarge:"The file is too large (over 200 MB) to share or download on mobile",errorNotFound:"The file no longer exists or was moved",errorGeneric:"Share failed: {message}"};var ne=require("react"),Hd=Oa(require("@deepseek-ai/dsh-client-ui-primitives"),1);var Ee=class extends Error{code;constructor(t,a){super(a),this.code=t,this.name="FileShareError"}};function Od(e){let t=e.code??"";return t==="workspace-file/too-large"?new Ee("too-large",e.message??t):t==="workspace-file/not-found"||t==="workspace-file/not-regular-file"?new Ee("not-found",e.message??t):new Ee("read-failed",e.message??(t||"read failed"))}async function ci(e,t,a,n=1048576,o=209715200){let r=[],i=0;for(;;){a.throwIfAborted();let d=await e(t,{offset:i,length:n},a);if(a.throwIfAborted(),!d.ok)throw Od(d.error);let{data:f,eof:b,bytes:l}=d.value;if(l!==void 0&&l>o)throw new Ee("too-large",`${t}: ${l} bytes exceed the ${o} byte share cap`);if(r.push(new Uint8Array(f)),i+=f.length,i>o)throw new Ee("too-large",`${t}: more than ${o} bytes`);if(b||f.length===0)break}return{parts:r,size:i}}function Id(e){return typeof e=="object"&&e!==null&&e.name==="AbortError"}function pa(e){return e.share!==void 0&&e.canShare!==void 0}async function pi(e,t){if(e.size>(t.shareMax??52428800))return t.download(e),{kind:"downloaded",reason:"too-large"};let a=t.share;if(a===void 0)return t.download(e),{kind:"downloaded",reason:"unsupported"};let n=!1;try{n=t.canShare?.({files:[e]})===!0}catch{n=!1}if(!n)return t.download(e),{kind:"downloaded",reason:"unsupported"};try{return await a({files:[e],title:e.name}),{kind:"shared"}}catch(o){return Id(o)?{kind:"cancelled"}:(t.download(e),{kind:"downloaded",reason:"share-failed"})}}var Nd={txt:"text/plain",log:"text/plain",md:"text/markdown",markdown:"text/markdown",csv:"text/csv",tsv:"text/tab-separated-values",json:"application/json",xml:"application/xml",yaml:"text/yaml",yml:"text/yaml",html:"text/html",htm:"text/html",css:"text/css",js:"text/javascript",mjs:"text/javascript",ts:"text/plain",tsx:"text/plain",py:"text/plain",sh:"text/plain",svg:"image/svg+xml",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",bmp:"image/bmp",heic:"image/heic",avif:"image/avif",mp3:"audio/mpeg",wav:"audio/wav",m4a:"audio/mp4",ogg:"audio/ogg",mp4:"video/mp4",mov:"video/quicktime",webm:"video/webm",pdf:"application/pdf",zip:"application/zip",gz:"application/gzip",tar:"application/x-tar",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",xls:"application/vnd.ms-excel",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",ppt:"application/vnd.ms-powerpoint",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation"};function ha(e){return e.split(/[/\\]+/).filter(Boolean).at(-1)??e}function hi(e){let t=e.lastIndexOf(".");return t<=0?"application/octet-stream":Nd[e.slice(t+1).toLowerCase()]??"application/octet-stream"}var ma=Hd,ui=["IconShareOutlineRegular","IconShareOutline16"].map(e=>ma[e]).find(e=>typeof e=="function"),mi=["IconWarningOutlineRegular","IconWarningOutline16"].map(e=>ma[e]).find(e=>typeof e=="function"),mn=typeof ma.Toast=="function"?ma.Toast:void 0,fi='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5v8.5M8 1.5 5 4.5M8 1.5l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 7H4a1.5 1.5 0 0 0-1.5 1.5v4A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 12 7h-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',bi='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5v8.5M8 10 5 7M8 10l3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 12.5H4A1.5 1.5 0 0 0 2.5 14v.5h11V14A1.5 1.5 0 0 0 12 12.5h-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';function Fd(){return React.createElement("span",{"aria-hidden":"true",dangerouslySetInnerHTML:{__html:bi}})}function zd(){return ui!==void 0?React.createElement(ui,{size:16}):React.createElement("span",{"aria-hidden":"true",dangerouslySetInnerHTML:{__html:fi}})}function Bd(e){document.querySelector('[data-mobile-nav="file-share-toast"]')?.remove();let t=document.createElement("div");t.dataset.mobileNav="file-share-toast",t.setAttribute("role","status"),t.textContent=e,document.body.appendChild(t),setTimeout(()=>t.remove(),3e3)}function gi(e,t){return pa(fa())?e("shareFile",{name:t}):e("downloadFile",{name:t})}function Dd(e,t){return e.kind!=="downloaded"?null:e.reason==="too-large"?t("downloadedTooLarge"):e.reason==="share-failed"?t("downloadedShareFailed"):t("downloadedUnsupported")}function qd(e,t){if(e instanceof Ee){if(e.code==="too-large")return t("errorTooLarge");if(e.code==="not-found")return t("errorNotFound")}return t("errorGeneric",{message:e instanceof Error?e.message:String(e)})}function Wd(e){let t=URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download=e.name,a.rel="noopener",a.style.display="none",document.body.appendChild(a),a.click(),a.remove(),setTimeout(()=>URL.revokeObjectURL(t),3e4)}function fa(){let e=navigator,t=window.DSHA;return{canShare:typeof t?.canShareFile=="function"?a=>a.files.length===1&&t.canShareFile(a.files[0]):typeof e.canShare=="function"?a=>e.canShare(a):void 0,share:typeof t?.shareFile=="function"?a=>t.shareFile(a.files[0]):typeof e.share=="function"?a=>e.share(a):void 0,download:Wd}}function wi(e,t,a){let[n,o]=(0,ne.useState)(null),[r,i]=(0,ne.useState)(null),d=(0,ne.useRef)(null),f=(0,ne.useRef)(0),b=(0,ne.useRef)({sessionId:e,readFileRange:t,t:a});b.current={sessionId:e,readFileRange:t,t:a},(0,ne.useEffect)(()=>()=>d.current?.abort(),[]);let l=(0,ne.useCallback)(x=>{if(mn===void 0){Bd(x);return}f.current+=1,i({seq:f.current,text:x})},[]),s=(0,ne.useCallback)(x=>{if(d.current!==null)return;let g=new AbortController;d.current=g,o(x);let{sessionId:S,readFileRange:v,t:m}=b.current;(async()=>{let{parts:A}=await ci((L,h,_)=>v(S,L,h,_),x,g.signal),k=ha(x),E=new File(A,k,{type:hi(k)}),c=await pi(E,fa()),p=Dd(c,m);p!==null&&l(p)})().catch(A=>{g.signal.aborted||(console.warn("[dsh-web-mobile] file share failed:",A),l(qd(A,m)))}).finally(()=>{d.current===g&&(d.current=null),g.signal.aborted||o(null)})},[l]),u=r===null||mn===void 0?null:React.createElement(mn,{key:r.seq,text:r.text,...mi===void 0?{}:{icon:React.createElement(Vd,null)},onDone:()=>i(null)});return{busyPath:n,share:s,toast:u}}function Vd(){let e=mi;return e===void 0?null:React.createElement(e,null)}function vi({absolutePath:e,sessionId:t,readFileRange:a,t:n}){let{busyPath:o,share:r,toast:i}=wi(t,a,n),d=o!==null;return React.createElement(React.Fragment,null,React.createElement("button",{type:"button","data-mobile-nav":"file-share-preview","aria-label":d?n("sharing"):gi(n,ha(e)),"aria-busy":d,disabled:d,onClick:()=>r(e)},pa(fa())?React.createElement(zd,null):React.createElement(Fd,null)),i)}var ua="file-share-row";function xi({sessionId:e,readFileRange:t,t:a}){let{busyPath:n,share:o,toast:r}=wi(e,t,a),i=(0,ne.useRef)(null),d=(0,ne.useRef)({busyPath:n,share:o,t:a});d.current={busyPath:n,share:o,t:a};let f=(0,ne.useRef)(null);return(0,ne.useEffect)(()=>{let l=(i.current?.closest('[data-files-state="tree"]')??null)?.querySelector("[data-files-body]")??null;if(l===null)return;let s=v=>{v.preventDefault(),v.stopPropagation();let C=v.currentTarget.parentElement?.getAttribute("data-files-path");C&&d.current.share(C)},u=()=>{let{busyPath:v,t:m}=d.current;for(let C of l.querySelectorAll(`[data-mobile-nav="${ua}"]`))C.parentElement?.getAttribute("data-files-entry")!=="file"&&C.remove();for(let C of l.querySelectorAll('li[data-files-entry="file"]')){let A=C.querySelector(`:scope > [data-mobile-nav="${ua}"]`);A===null&&(A=document.createElement("button"),A.type="button",A.dataset.mobileNav=ua,A.innerHTML=pa(fa())?fi:bi,A.addEventListener("click",s),C.appendChild(A));let k=C.getAttribute("data-files-path")??"",E=v!==null&&v===k,c=E?m("sharing"):gi(m,ha(k)),p=v!==null;A.getAttribute("aria-label")!==c&&A.setAttribute("aria-label",c),A.disabled!==p&&(A.disabled=p),E?A.setAttribute("aria-busy","true"):A.removeAttribute("aria-busy")}};f.current=u;let x=0,g=()=>{x===0&&(x=requestAnimationFrame(()=>{x=0,u()}))},S=new MutationObserver(g);return S.observe(l,{childList:!0,subtree:!0}),u(),()=>{S.disconnect(),x!==0&&cancelAnimationFrame(x),f.current=null;for(let v of l.querySelectorAll(`[data-mobile-nav="${ua}"]`))v.removeEventListener("click",s),v.remove()}},[]),(0,ne.useEffect)(()=>{f.current?.()},[n,a]),React.createElement(React.Fragment,null,React.createElement("span",{hidden:!0,"data-mobile-nav":"file-share-anchor",ref:i}),r)}function yi(e){e.inject(["slots","locale","remote","remote.workspaceFiles"],t=>{t.effect(()=>t.locale.register(ca,{zh:li,en:di}),"dsh-web-mobile: file-share dictionaries");let a=t.remote,n=()=>({readFileRange:(o,r,i,d)=>a.workspaceFiles.readBytes(o,r,{range:i},d)});D(t,"dsh-web-mobile: file share",()=>{let o=[t.slots.inject("sidebar.right.tab.document.actions",()=>t.slots.register({name:"sidebar.right.tab.document.actions",id:"mobile-nav-file-share",order:100,locale:ca,inject:n},vi)),t.slots.inject("sidebar.right.tab.files.actions",()=>t.slots.register({name:"sidebar.right.tab.files.actions",id:"mobile-nav-file-share-rows",order:100,locale:ca,inject:n},xi))];return()=>{for(let r of o)r()}})})}function ki(e){if(typeof e!="object"||e===null)return null;let t=e.selectPanel;return typeof t!="function"?null:()=>{t.call(e,null)}}var _i='[class*="panelRow"][aria-current="page"]',wn=!1,fn=null,bn=null;function ba(){let e=bn;return e!==null&&e.isConnected&&e.matches(_i)?!0:(bn=document.querySelector(_i),bn!==null)}function gn(){return!wn&&ba()}var Ei="data-mobile-panel-exit",jd="dsh-mobile-panel-exit",Gd=2e3,Ud="panel-ghost",Kd=280,Xd='[data-mobile-nav="frame"] [class*="_centerCol"] > * > *',$d='section[data-plugin-panel] button[class*="_moreBack"],section[data-plugin-panel] [data-plugin-detail] button[class*="_crumb"],section[data-plugin-panel] [data-plugin-item-detail] button[class*="_crumb"],section[data-plugin-panel] [data-plugin-row-detail] button[class*="_crumb"]';function Ti(e){let t=ki(e),a=t!==null,n=!1,o=!1,r=null,i=0,d=null,f=null,b=null,l=Symbol("panel-exit");function s(){let c=j();if(c===null)return[];let p=[];for(let L of c.querySelectorAll('[class*="_centerCol"]')){let h=L.firstElementChild?.firstElementChild;if(h instanceof HTMLElement)for(let _ of h.getAnimations())_.playState!=="idle"&&p.push(_)}return p}function u(){if(n){if(r!==null&&(window.clearTimeout(r),r=null),i!==0&&(cancelAnimationFrame(i),i=0),fn===l){let c=j();c!==null&&c.removeAttribute(Ei),wn=!1,fn=null}n=!1}}function x(){f!==null&&(window.clearTimeout(f),f=null);let c=d;d=null,c!==null&&(b!==null&&c.removeEventListener("animationend",b,!0),b=null,c.remove())}function g(c){if(o||!n)return;let p=s();if(p.length===0){if(c<2){i=requestAnimationFrame(()=>{i=0,g(c+1)});return}u();return}let L=0;for(let h of p){let _=h.effect?.getTiming(),T=typeof _?.delay=="number"?_.delay:0,R=typeof _?.duration=="number"?_.duration:0,P=typeof _?.iterations=="number"?_.iterations:1;L=Math.max(L,T+R*P),h.finished.then(()=>u(),()=>u())}r=window.setTimeout(u,Math.min(Gd,Math.max(250,L+200)))}function S(){if(!ba())return null;let c=document.querySelector(Xd);return c instanceof HTMLElement?c:null}function v(){if(!ba())return null;let c=document.querySelector($d);return c instanceof HTMLElement?c:null}function m(){return v()!==null}function C(c){x();let p=document.createElement("div");return p.dataset.mobileNav=Ud,p.setAttribute("aria-hidden","true"),p.append(c.cloneNode(!0)),document.body.append(p),p}let A=()=>{if(o||!a||n)return;n=!0,wn=!0,fn=l;let c=j();c!==null&&c.setAttribute(Ei,""),document.dispatchEvent(new CustomEvent(jd));let p=S();d=p===null?null:C(p);try{t()}finally{if(i=requestAnimationFrame(()=>{i=0,g(0)}),d!==null){let L=d;b=h=>{h.animationName==="dsh-web-mobile-panel-ghost-out"&&x()},L.addEventListener("animationend",b,!0),f=window.setTimeout(x,Kd+120)}}},k=()=>{if(o||!a||n)return;let c=v();if(c!==null){c.click();return}A()};function E(){o=!0,u(),x()}return{exit:A,back:k,supported:a,panelOpen:ba,subpageOpen:m,task:Zd(A,a,k,v),dispose:E}}function Zd(e,t,a,n){let o=!1,r=0,i=null,d=!1,f=!1,b=!1,l=null;function s(){b=!1,l!==null&&(window.clearTimeout(l),l=null)}function u(){b=!0,l!==null&&window.clearTimeout(l),l=window.setTimeout(s,1200);try{history.back()}catch{s()}}function x(){try{return history.pushState({mobilePanelExit:!0},""),!0}catch{return!1}}function g(){!t||o||x()&&(o=!0)}function S(){t&&x()&&(r+=1)}function v(k){return k===null?0:k.className.includes("_moreBack")?1:2}function m(){if(b){s();return}if(r>0)r-=1;else if(o)o=!1;else return;if(gn()&&n()!==null){d=!0,a();return}gn()&&e()}function C(){f||(window.addEventListener("popstate",m),f=!0)}function A(){f&&(window.removeEventListener("popstate",m),f=!1)}return{name:"panel-back-exit",scopes:["*"],ensure:()=>{if(!t)return;if(C(),!gn()){o&&(o=!1,u()),i=null,d=!1;return}g();let k=n(),E=v(i),c=v(k);if(c===E)return;let p=d;if(d=!1,i=k,c>E){p||S();return}!p&&r>0&&(r-=1,u())},dispose:()=>{A(),s(),o&&(o=!1,u())}}}function Si(e,t){D(e,"dsh-web-mobile: panel row returns to conversation",()=>{let a=n=>{let o=n.target;if(!(o instanceof Element)||typeof o.closest!="function")return;let r=o.closest('[class*="panelRow"]');r!==null&&r.getAttribute("aria-current")==="page"&&(n.preventDefault(),n.stopPropagation(),t())};return document.addEventListener("click",a,!0),()=>document.removeEventListener("click",a,!0)})}var Yd=/[?,]dsh-web-mobile\/client\.js/;function Qd(e){if(typeof e!="string"||e==="")return null;try{let t=new URL(e,"http://x").searchParams.get("rev");return t===null||t===""?null:t}catch{return null}}function Jd(){for(let e of document.head.querySelectorAll('script[src], link[rel="preload"]')){let t=e.getAttribute("src")??e.getAttribute("href");if(t!==null&&Yd.test(t))return Qd(t)}return null}function Ci(e){e.effect(()=>{let t=new URLSearchParams(location.search);if(!t.has("mobile-nav-debug"))return()=>{};let a=[],n=v=>a.push(`ERR ${v.message.slice(0,120)}`),o=v=>a.push(`REJ ${String(v.reason).slice(0,120)}`);window.addEventListener("error",n),window.addEventListener("unhandledrejection",o);let r=document.createElement("div");r.style.cssText=["position:fixed","top:40px","right:6px","z-index:2147483000","background:rgba(0,0,0,.82)","color:#fff","font:11px/1.5 ui-monospace,monospace","padding:8px 10px","border-radius:8px","max-width:94vw","max-height:70vh","overflow:auto","white-space:pre-wrap","pointer-events:none"].join(";");let i=()=>{let v=E=>!!document.querySelector(E),m=E=>{let c=document.querySelector(E);return c===null?"absent":getComputedStyle(c).visibility},C=document.querySelector('[data-mobile-nav="frame"]'),A=()=>{let E=document.querySelector("[data-sidebar-right-panel]");if(E===null)return"absent";let c=E.getBoundingClientRect();return`${E.getAttribute("data-sidebar-right-panel")} pad ${getComputedStyle(E).paddingTop} rect ${Math.round(c.top)},${Math.round(c.left)} ${Math.round(c.width)}x${Math.round(c.height)}`};return[`build rev ${Jd()??"?"} (diag chips)`,`URL ${location.pathname}${location.search}`,`W ${innerWidth} x ${innerHeight} dpr ${devicePixelRatio}`,`mq≤1023 ${matchMedia(Be).matches}  mq≥1024 ${matchMedia(ao).matches}`,`safeTop framePad ${C===null?"n/a":getComputedStyle(C).paddingTop}  rightPanel ${A()}`,`css ${v('style[data-plugin-css*="mobile"]')}  frame ${!!C}`,`header ${m("[data-phase] header")}  composer ${v("textarea, [data-composer-input]")}`,`genui cards ${document.querySelectorAll("[data-genui]").length}  panel ${v("[data-genui-panel]")}`,`phase ${document.querySelector("[data-phase]")?.getAttribute("data-phase")??"?"}`,`errs ${a.slice(-5).join(" | ")||"none"}`].join(`
`)},d=()=>{r.textContent=i()};d();let f=0,b=()=>{f===0&&(f=requestAnimationFrame(()=>{f=0,d()}))},l=new MutationObserver(v=>{for(let m of v)if(!(m.target===r||r.contains(m.target))){b();return}});l.observe(document.body,{childList:!0,subtree:!0,attributes:!0});let s=setInterval(d,1500);document.body.appendChild(r);let u=v=>{let m=document.querySelector(v);if(m===null)return"absent";let C=m.getBoundingClientRect();return`${Math.round(C.x)},${Math.round(C.y)} ${Math.round(C.width)}x${Math.round(C.height)}`},x=()=>[i(),`rects toggle ${u('[data-mobile-nav="toggle"]')} files ${u('[data-mobile-nav="files"]')} header ${u("[data-phase] header")} titleCluster ${u('[class*="_titleCluster"]')}`,`chips crea ${u('[class*="SVAs4q_"]')} team ${u("[data-team-action]")} model ${u('[class*="_7KE1Ra_trigger"]')} crumbs ${u('[class*="_crumbs"]')} crumbCurrent ${u('[class*="_crumbCurrent"]')}`,`ua ${navigator.userAgent}`,`screen ${screen.width}x${screen.height} standalone ${matchMedia("(display-mode: standalone)").matches}`,`vv ${visualViewport===null?"n/a":`${Math.round(visualViewport.width)}x${Math.round(visualViewport.height)}@${Math.round(visualViewport.offsetTop)}`}`].join(`
`),g=t.get("beacon")||"http://127.0.0.1:3199/diag",S=setInterval(()=>{fetch(g,{method:"POST",mode:"no-cors",body:x()}).catch(()=>{})},2e3);return()=>{window.removeEventListener("error",n),window.removeEventListener("unhandledrejection",o),l.disconnect(),clearInterval(s),clearInterval(S),f!==0&&cancelAnimationFrame(f),r.remove()}},"dsh-web-mobile: debug badge")}var vn=1e4,It=window,ga=It.__dshaMobileScrollState instanceof WeakMap?It.__dshaMobileScrollState:It.__dshaMobileScrollState=new WeakMap;function Ai(){return[...document.querySelectorAll('[data-mobile-nav="frame"] [class*="scrollBody"]')]}function ec(){for(let e of Ai())if(e.scrollTop>0){let t={top:e.scrollTop,savedAt:Date.now(),url:location.href};ga.set(e,t),It.__dshaMobileLastScroll=t}else ga.delete(e)}function tc(){for(let n of Ai()){let o=ga.get(n);ga.delete(n),!(!o||Date.now()-o.savedAt>vn||o.url!==location.href)&&requestAnimationFrame(()=>{n.isConnected&&o.url===location.href&&Date.now()-o.savedAt<=vn&&n.scrollTop===0&&(n.scrollTop=o.top)})}let e=It.__dshaMobileLastScroll;if(e===void 0)return;let t=0,a=()=>{if(t+=1,e.url!==location.href||Date.now()-e.savedAt>vn)return;let n=document.querySelector('[class*="scrollBody"]');if(n!==null&&n.scrollTop===0&&n.scrollHeight>=e.top+n.clientHeight){n.scrollTop=e.top;return}t<30&&requestAnimationFrame(a)};requestAnimationFrame(a)}function Li(e){e.effect(()=>e.locale.register(re,{zh:po,en:ho}),"dsh-web-mobile: dictionaries"),e.effect(()=>{for(let n of document.querySelectorAll('style[data-plugin-css="dsh-web-mobile/mobile.css"]'))n.remove();let a=document.createElement("style");return a.dataset.plugin="dsh-web-mobile",a.dataset.pluginCss="dsh-web-mobile/mobile.css",a.textContent=to,document.head.appendChild(a),setTimeout(()=>{a.isConnected&&document.head.appendChild(a)},0),tc(),()=>{ec(),a.remove()}},"dsh-web-mobile: styles"),Gr(e),Ur(e);let t=Ti(e.layout);e.effect(()=>{let a=[lr(),Jo(e),er(e,t),()=>t.dispose()];return()=>{for(let n of a)n()}},"dsh-web-mobile: reconciler infrastructure"),cr(e),Qo(e),Si(e,t.exit),mr(e),Zo(e,Wt),ur(e),fr(e),wr(e),vr(e),Ar(e),Pr(e),Or(e),Ir(e),zr(e),Dr(e),qr(e),Vr(e),$r(e),Zr(e),Jr(e),si(e),dr(e),yi(e),Ci(e),e.slots.inject("conversation.session.header.actions",()=>e.slots.register({name:"conversation.session.header.actions",id:"mobile-nav-toggle",order:10,locale:re,inject:()=>({toggleSidebar:()=>e.layout.toggleSidebar()})},$n)),e.slots.inject("conversation.input.left",()=>e.slots.register({name:"conversation.input.left",id:"mobile-nav-file-upload",order:10,locale:re,inject:()=>({})},Zn))}var ac=["添加工作区","添加工作区…","Add workspace","Add workspace…"],Mi='[role="tab"], [role="treeitem"], [role="menuitem"], [role="menu"]';function Ri(e){let t=(e??"").trim();return t.length<3||t.length>320||/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(t)&&!/^file:\/\//i.test(t)?!1:!!(/^(\/|~\/|\.\.?\/|[A-Za-z]:\\)/.test(t)||/\/[\w.\-]+\.\w{1,12}$/.test(t))}async function nc(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.top="-9999px",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let a=document.execCommand("copy");return t.remove(),a}catch{return!1}}function Pi(e,t){let a=!1,n=(k,E)=>{let c=t(k);if(E!==void 0)for(let[p,L]of Object.entries(E))c=c.split(`{${p}}`).join(String(L));return c},o=null,r=null,i=k=>{o===null&&(o=document.createElement("div"),o.setAttribute("data-mobile-nav","file-guard-toast"),Object.assign(o.style,{position:"fixed",left:"50%",bottom:"calc(64px + var(--dshp-kb, 0px))",transform:"translateX(-50%)",maxWidth:"84vw",zIndex:"9999",padding:"10px 14px",borderRadius:"10px",background:"rgba(20,22,28,.92)",color:"#fff",fontSize:"13px",lineHeight:"1.4",textAlign:"center",fontFamily:"inherit",boxShadow:"0 4px 16px rgba(0,0,0,.28)",pointerEvents:"none",opacity:"0",transition:"opacity .18s ease"}),document.body.appendChild(o)),o.textContent=k,requestAnimationFrame(()=>{o!==null&&(o.style.opacity="1")}),r!==null&&window.clearTimeout(r),r=window.setTimeout(()=>{o!==null&&(o.style.opacity="0")},2600)},d=null,f=k=>{document.activeElement?.blur(),d?.remove();let c=k.length>65536?`${k.slice(0,65536)}
${t("fileTruncated")}`:k,p=document.createElement("div");p.setAttribute("data-mobile-nav","file-guard-fallback"),Object.assign(p.style,{position:"fixed",left:"max(8px, env(safe-area-inset-left, 0px))",right:"max(8px, env(safe-area-inset-right, 0px))",bottom:"calc(16px + env(safe-area-inset-bottom, 0px) + var(--dshp-kb, 0px))",maxHeight:"45vh",overflow:"auto",zIndex:"10000",padding:"10px 12px",borderRadius:"10px",background:"rgba(20,22,28,.96)",color:"#eee",boxShadow:"0 6px 24px rgba(0,0,0,.4)",WebkitOverflowScrolling:"touch"});let L=document.createElement("div");Object.assign(L.style,{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px",color:"#9aa0a8",marginBottom:"6px"});let h=document.createElement("span");h.textContent=t("fileFallbackTitle");let _=document.createElement("button");_.type="button",_.textContent=t("fileFallbackClose"),Object.assign(_.style,{border:"1px solid #444a52",background:"transparent",color:"#eee",borderRadius:"6px",padding:"2px 10px",fontSize:"12px",cursor:"pointer"}),_.addEventListener("click",()=>{p.remove()});let T=document.createElement("pre");T.textContent=c,Object.assign(T.style,{margin:"0",whiteSpace:"pre-wrap",wordBreak:"break-all",userSelect:"text",WebkitUserSelect:"text",fontSize:"12px",lineHeight:"1.5",fontFamily:"inherit"}),L.append(h,_),p.append(L,T),document.body.appendChild(p),d=p},b=k=>{let E=k.target;if(E===null)return;let c=E.closest("button, a");c!==null&&c.closest("[data-phase]")!==null&&c.closest(Mi)===null&&Ri(c.textContent)&&(k.preventDefault(),k.stopImmediatePropagation(),i(t("fileGuardMsg")))};document.addEventListener("click",b,!0);let l=0,s=(k=document)=>{let E=k.querySelectorAll("button, a");(k instanceof Element&&k.matches("button, a")?[k,...E]:E).forEach(p=>{if(p.getAttribute("data-mobile-nav-copy")==="1"||p.closest("[data-phase]")===null||p.closest(Mi)!==null)return;let L=(p.textContent??"").trim();if(!Ri(L))return;p.setAttribute("data-mobile-nav-copy","1");let h=String(++l);p.setAttribute("data-mobile-nav-copy-id",h);let _=p.parentElement;if(_!==null)for(let R of Array.from(_.querySelectorAll(':scope > [data-mobile-nav="copy-file"]')))R.previousElementSibling?.getAttribute("data-mobile-nav-copy-id")!==R.getAttribute("data-mobile-nav-copy-for")&&R.remove();let T=document.createElement("button");T.type="button",T.setAttribute("data-mobile-nav","copy-file"),T.setAttribute("data-mobile-nav-copy-for",h),T.textContent=t("fileCopy"),T.addEventListener("click",async R=>{R.preventDefault(),R.stopPropagation();let P=(p.textContent??"").trim().replace(/^file:\/\//i,"");T.disabled=!0,T.textContent="…";try{let O=await e(P);if(a)return;if(!O?.ok){i(O?.error?.message??t("fileCopyFailed"));return}let H=O.value?.content??"",W=O.value?.size??H.length;if(W>2097152){i(n("fileTooLarge",{size:(W/(1024*1024)).toFixed(1)}));return}let G=await nc(H);if(a)return;if(G){let V=Math.max(1,Math.round(W/1024));i(n("fileCopyDone",{kb:V}))}else i(t("fileCopyFailedFallback")),f(H)}catch(O){a||i(O instanceof Error?O.message:t("fileCopyFailed"))}finally{T.isConnected&&(T.disabled=!1,T.textContent=t("fileCopy"))}}),p.parentElement?.insertBefore(T,p.nextSibling)})},u=new Map,x='[role="menuitem"],[role="option"],li,button,a',g=k=>{let E=(k.getAttribute("aria-label")||""||k.textContent||"").trim();if(ac.includes(E)){let c=k;u.has(k)||u.set(k,c.style.display),c.style.display="none",k.setAttribute("data-mobile-nav-hide","add-workspace")}},S=k=>{k instanceof Element&&k.matches(x)&&g(k),k.querySelectorAll(x).forEach(g)},v=new Set,m=0,C=()=>{m=0;for(let k of v)k.isConnected&&(s(k),S(k));v.clear();for(let k of u.keys())k.isConnected||u.delete(k)};s(),S(document);let A=new MutationObserver(k=>{for(let E of k){if(E.type==="characterData"){let c=E.target.parentElement;c!==null&&c.childElementCount>0&&v.add(c);continue}E.addedNodes.forEach(c=>{c.nodeType===1?v.add(c):c.nodeType===3&&c.parentElement!==null&&v.add(c.parentElement)})}v.size>0&&m===0&&(m=requestAnimationFrame(C))});return A.observe(document.body,{childList:!0,subtree:!0,characterData:!0}),()=>{a=!0,document.removeEventListener("click",b,!0),A.disconnect(),m!==0&&cancelAnimationFrame(m),v.clear(),r!==null&&window.clearTimeout(r),o?.remove(),o=null,d?.remove(),d=null,document.querySelectorAll('[data-mobile-nav="copy-file"]').forEach(k=>k.remove()),document.querySelectorAll('[data-mobile-nav-copy="1"]').forEach(k=>k.removeAttribute("data-mobile-nav-copy")),document.querySelectorAll('[data-mobile-nav-hide="add-workspace"]').forEach(k=>{let E=k,c=u.get(k);c!==void 0?E.style.display=c:E.style.removeProperty("display"),u.delete(k),k.removeAttribute("data-mobile-nav-hide")}),u.clear()}}var wa="dsh-pocket.layout";function Oi({urlValue:e,stored:t,narrowMatch:a}){let n=String(e??"").trim().toLowerCase();return n==="desktop"?"desktop":n==="mobile"?"mobile":n==="auto"?a?"mobile":"desktop":t==="desktop"||t==="mobile"?t:a?"mobile":"desktop"}function Ii(e){try{if(typeof localStorage>"u")return"";if(e==null)return oc();let t=String(e).trim().toLowerCase();try{t==="desktop"||t==="mobile"?localStorage.setItem(wa,t):(t==="auto"||t==="")&&localStorage.removeItem(wa)}catch{}let a=localStorage.getItem(wa);return a==="desktop"||a==="mobile"?a:""}catch{return""}}function oc(){try{if(typeof localStorage>"u")return"";let e=localStorage.getItem(wa);return e==="desktop"||e==="mobile"?e:""}catch{return""}}function xn(e){let{hasGeneration:t,generation:a,state:n}=e??{};if(t===!0){let r=a!=null;return{down:!r,usable:r}}let o=n==="disconnected"||n==="connecting";return{down:o,usable:!o}}function Ni({staleMs:e=2500,hardStuckMs:t=8e3,maxRepairAttempts:a=3}={}){let n=new Map,o=new Map,r=Number.NEGATIVE_INFINITY,i=Number.NEGATIVE_INFINITY,d=0,f=!1,b=(C,A)=>{if(C.down){f=!0;return}f&&(f=!1,d+=1,r=A)},l=C=>{i=C,d+=1,f=!1,o.clear()},s=(C,A)=>n.has(C)?!1:(n.set(C,A),!0),u=C=>{n.delete(C),o.delete(C)},x=(C,A,k={})=>{let E=n.get(C);if(E===void 0)return g;if((o.get(C)??0)>=a)return{waiting:!1,stale:!0,repair:!1,reconnect:!1};let c=k.openState==="loading";if(c&&k.openPromise==="gone")return v(C,{reconnect:!1});let p=k.openState!=="open"&&k.openState!=="cold";if(i>E){let L=A-i;return L<e?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:e-L}:p?v(C,{reconnect:!0}):S}if(d>0&&r>E){let L=A-Math.max(E,r);return L<e?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:e-L}:p?v(C,{reconnect:!1}):S}if(c&&A-E>=t)return v(C,{reconnect:!0});if(k.openState==="open"){let L=e-(A-E);return L>0?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:L}:S}if(k.openState===void 0){let L=t-(A-E);return L>0?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:L}:S}return c?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:Math.max(0,t-(A-E))}:g},g={waiting:!1,stale:!1,repair:!1,reconnect:!1},S={waiting:!1,stale:!0,repair:!1,reconnect:!1},v=(C,{reconnect:A})=>(o.set(C,(o.get(C)??0)+1),{waiting:!1,stale:!0,repair:!0,reconnect:A});return{noteLink:b,noteResume:l,observe:s,release:u,decide:x,reset:()=>{n.clear(),o.clear(),f=!1,d=0,r=Number.NEGATIVE_INFINITY,i=Number.NEGATIVE_INFINITY}}}function Hi({gapMs:e=5e3,intervalMs:t=1e3}={}){let a=null;return{tick:r=>{if(a===null)return a=r,!1;let i=r-a;return a=r,i>Math.max(e,t*2)},reset:()=>{a=null},intervalMs:t}}var rc=1500,Fi=900,zi=500,ic=[2e3,4e3,8e3,15e3,3e4];function Bi({pingMs:e=rc,backoffMs:t=ic}={}){let a=!1,n=!1,o=null,r=0,i=Number.NEGATIVE_INFINITY,d=!1,f=Number.NEGATIVE_INFINITY,b=()=>{o=null,r=0,f=Number.NEGATIVE_INFINITY};return{noteState:(v,m)=>{if(a=v===!0,a){o===null&&(o=m);return}!n&&o!==null&&b()},shouldProbe:(v,m)=>m!==!0||d||v-i<e?!1:(i=v,d=!0,!0),noteProbe:(v,m)=>{if(d=!1,v===!0){n=!1,!a&&o!==null&&b();return}n=!0,o===null&&(o=m)},shouldReconnect:(v,m)=>{if(m!==!0||o===null)return!1;let C=t[Math.min(r,t.length-1)];return v-f<C?!1:(r+=1,f=v,!0)},isDown:()=>o!==null,reset:()=>{a=!1,n=!1,d=!1,i=Number.NEGATIVE_INFINITY,b()}}}var va="dsh-pocket:probe:state:v1";var xa="dsh-pocket:link-verdict";var yn=Object.freeze(["read","type","approve","files","settings","other"]),kn=Object.freeze(["conversation","composer","approve","files","settings","panel","nav","header","other"]),_n=Object.freeze(["loads","sessions","sends","chars","approvals","scrollPx","errors","rejections","freezes","bfcache","longtasks"]),sc=Object.freeze(["displayMode","ios","host","platform"]),lc=Object.freeze(["dpr","screenW","screenH","viewportW","viewportH","safeTop","safeBottom","safeLeft","safeRight"]);function te(e,t=1e9){let a=Math.round(Number(e));return!Number.isFinite(a)||a<=0?0:Math.min(t,a)}function ht(e){let t=Math.round(Number(e));return!Number.isFinite(t)||t<=0?0:Math.min(t,864e13)}function Nt(e,t=160){return typeof e!="string"&&typeof e!="number"?"":String(e).replace(/[\u0000-\u001f\u007f]+/g," ").replace(/\s+/g," ").trim().slice(0,t)}function Di(e){if(e===null||typeof e!="object"||Array.isArray(e))return null;let t={standalone:e.standalone===!0};for(let a of sc){let n=Nt(e[a],40);n!==""&&(t[a]=n)}for(let a of lc){let n=Math.round(Number(e[a]));Number.isFinite(n)&&n>0&&(t[a]=Math.min(n,1e5))}return t}function Ht(e=Date.now()){let t=ht(e)||Date.now(),a={};for(let r of yn)a[r]=0;let n={};for(let r of kn)n[r]=0;let o={};for(let r of _n)o[r]=0;return{v:1,since:t,updated:t,env:null,surfaces:a,clicks:n,counts:o,link:{downs:0,recovers:0,probes:0,offline:0,recoverMs:[],lastDownAt:0},perf:{frames:0,slowFrames:0},anchors:{checked:0,missing:{}},freezeMaxMs:0,samples:[]}}function qi(e,t){if(e.env!==null)return e;let a=Di(t);return a!==null&&(e.env=a),e}function ya(e,t,a){let n=yn.includes(t)?t:"other",o=Math.min(te(a,6e4),6e4);return o===0||(e.surfaces[n]=Math.min(6048e5,e.surfaces[n]+o)),e}function Wi(e,t){let a=kn.includes(t)?t:"other";return e.clicks[a]=Math.min(1e9,e.clicks[a]+1),e}function Te(e,t,a=1){if(!_n.includes(t))return e;let n=te(a,1e9);return n===0||(e.counts[t]=Math.min(1e9,e.counts[t]+n)),e}function Vi(e,t=Date.now()){return e.link.downs=Math.min(1e9,e.link.downs+1),e.link.lastDownAt=ht(t),e}function ji(e,t){let a=te(t,6e5);return e.link.recovers=Math.min(1e9,e.link.recovers+1),e.link.recoverMs.push(a),e.link.recoverMs.length>64&&e.link.recoverMs.splice(0,e.link.recoverMs.length-64),e}function Gi(e){return e.link.probes=Math.min(1e9,e.link.probes+1),e}function Ui(e){return e.link.offline=Math.min(1e9,e.link.offline+1),e}function Ki(e,t,a){let n=te(t,1e9);if(n===0)return e;let o=Math.min(n,te(a,1e9));return e.perf.frames=Math.min(1e9,e.perf.frames+n),e.perf.slowFrames=Math.min(e.perf.frames,e.perf.slowFrames+o),e}function Xi(e,t){e.anchors.checked=Math.min(1e6,e.anchors.checked+1);let a=Array.isArray(t)?t:[];for(let o of a.slice(0,32)){let r=Nt(o,64);r===""||!/^[\w-]+$/.test(r)||(e.anchors.missing[r]=Math.min(1e6,(e.anchors.missing[r]??0)+1))}let n=Object.entries(e.anchors.missing);return n.length>32&&(n.sort((o,r)=>r[1]-o[1]),e.anchors.missing=Object.fromEntries(n.slice(0,32))),e}function En(e,t,a){let n=t==="rejection",o=n?"rejections":"errors";if(e.counts[o]=Math.min(1e9,e.counts[o]+1),e.samples.length<5){let r=Nt(a,160);r!==""&&e.samples.push({kind:n?"rejection":"error",text:r})}return e}function $i(e,t){let a=te(t,6e5);return a<=0||(e.counts.freezes=Math.min(1e9,e.counts.freezes+1),e.freezeMaxMs=Math.max(e.freezeMaxMs,a)),e}function Zi(e,t=Date.now()){let a=Math.max(ht(e.since)||0,ht(t)||0);return{v:1,since:e.since,now:a,env:e.env===null?null:{...e.env},surfaces:{...e.surfaces},clicks:{...e.clicks},counts:{...e.counts},link:{downs:e.link.downs,recovers:e.link.recovers,probes:e.link.probes,offline:e.link.offline,recoverMs:[...e.link.recoverMs],lastDownAt:e.link.lastDownAt},perf:{...e.perf},anchors:{checked:e.anchors.checked,missing:{...e.anchors.missing}},freezeMaxMs:e.freezeMaxMs,samples:e.samples.map(n=>({kind:n.kind,text:n.text}))}}function Tn(e,t=Date.now()){let a=Ht(t);return a.env=e.env,a}function Yi(e){try{return JSON.stringify(e)}catch{return""}}function Qi(e){if(typeof e!="string"||e==="")return null;let t;try{t=JSON.parse(e)}catch{return null}if(t===null||typeof t!="object"||Array.isArray(t))return null;let a=Ht(),n=ht(t.since);n!==0&&(a.since=n),a.env=Di(t.env);for(let d of yn)a.surfaces[d]=te(t.surfaces?.[d],6048e5);for(let d of kn)a.clicks[d]=te(t.clicks?.[d]);for(let d of _n)a.counts[d]=te(t.counts?.[d]);a.link.downs=te(t.link?.downs),a.link.recovers=te(t.link?.recovers),a.link.probes=te(t.link?.probes),a.link.offline=te(t.link?.offline),a.link.lastDownAt=ht(t.link?.lastDownAt);let o=Array.isArray(t.link?.recoverMs)?t.link.recoverMs:[];a.link.recoverMs=o.slice(-64).map(d=>te(d,6e5)),a.perf.frames=te(t.perf?.frames),a.perf.slowFrames=Math.min(a.perf.frames,te(t.perf?.slowFrames)),a.anchors.checked=te(t.anchors?.checked,1e6);let r=t.anchors?.missing;if(r!==null&&typeof r=="object"&&!Array.isArray(r))for(let[d,f]of Object.entries(r).slice(0,32)){let b=Nt(d,64),l=te(f,1e6);b!==""&&/^[\w-]+$/.test(b)&&l>0&&(a.anchors.missing[b]=l)}a.freezeMaxMs=te(t.freezeMaxMs,6e5);let i=Array.isArray(t.samples)?t.samples:[];for(let d of i.slice(0,5)){let f=Nt(d?.text,160);f!==""&&a.samples.push({kind:d?.kind==="rejection"?"rejection":"error",text:f})}return a}function Ji(e){try{return JSON.stringify(e).length}catch{return Number.POSITIVE_INFINITY}}var es=[{fragment:"GTtnTq_modeSelector",status:"legacy",note:"旧宿主哈希族；现行宿主已无同名片段"},{fragment:"GTtnTq_objectTree",status:"legacy",note:"旧宿主哈希族；现行宿主已无同名片段"},{fragment:"GTtnTq_root",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / AtgMta"},{fragment:"GTtnTq_sticky",status:"legacy",note:"旧宿主哈希族；现行宿主已无同名片段"},{fragment:"GTtnTq_table",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：O9N_wq"},{fragment:"QsffPG_root",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / AtgMta"},{fragment:"SVAs4q_",status:"legacy",note:"旧宿主片段：现行宿主已无"},{fragment:"SVAs4q_label",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：Ag-ohG / BE0jCW",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"VoX2oq_root",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / AtgMta"},{fragment:"VoX2oq_trigger",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / Ag-ohG"},{fragment:"ZKlsPq_menu",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：Ag-ohG / Luqt-a"},{fragment:"ZKlsPq_root",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / AtgMta",usedIn:["mobile/upstream/effects/subagent-chip-touch.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"ZuhsRW",status:"legacy",note:"旧宿主片段：现行宿主已无",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_7KE1Ra_chevron",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：Ag-ohG / BE0jCW"},{fragment:"_7KE1Ra_menu",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：Ag-ohG / Luqt-a",usedIn:["mobile/upstream/effects/model-menu-anchor.ts","mobile/upstream/effects/model-menu-keyboard-guard.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_7KE1Ra_trigger",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / Ag-ohG",usedIn:["mobile/upstream/debug.ts","mobile/upstream/effects/model-menu-anchor.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_actions",status:"host",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_add",status:"host",note:"≤3 字符：本体过泛，命中不代表语义有效",usedIn:["mobile/upstream/effects/composer-plus-toggle.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_approval",status:"host"},{fragment:"_boardHeader",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_body",status:"host",usedIn:["mobile/upstream/effects/question-fullscreen.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_bubble",status:"host"},{fragment:"_button",status:"host"},{fragment:"_byline",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_card",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/effects/question-fullscreen.ts","mobile/upstream/styles/compat.css.ts","mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_cardMinimized",status:"host"},{fragment:"_cardOpen",status:"host",usedIn:["mobile/upstream/effects/plugin-card-tap.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_centerCol",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/effects/panel-exit.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_chip",status:"host"},{fragment:"_columns",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_composerSeat",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/effects/composer-clearance.ts","mobile/upstream/effects/question-fullscreen.ts","mobile/upstream/effects/sidebar-swipe.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_composerStack",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/effects/stats-line.ts","mobile/upstream/platform/composer-anchor.ts","mobile/upstream/styles/compat.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_copyable",status:"legacy",note:"旧宿主片段：现行宿主已无"},{fragment:"_count",status:"host"},{fragment:"_crumb",status:"host",usedIn:["mobile/upstream/effects/panel-exit.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_crumbCurrent",status:"host",usedIn:["mobile/upstream/debug.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_crumbSeg",status:"host"},{fragment:"_crumbs",status:"host",usedIn:["mobile/upstream/debug.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_cubeRow",status:"host",usedIn:["mobile/upstream/styles/compat.css.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_customInput",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_customTextarea",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_customized",status:"host"},{fragment:"_customizedBody",status:"host"},{fragment:"_description",status:"host"},{fragment:"_detail",status:"host"},{fragment:"_disclosure",status:"host"},{fragment:"_dock",status:"host",usedIn:["mobile/upstream/effects/sidebar-swipe.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_dot",status:"host",note:"≤3 字符：本体过泛，命中不代表语义有效"},{fragment:"_drawer",status:"host"},{fragment:"_eyebrow",status:"host"},{fragment:"_fieldInput",status:"host"},{fragment:"_float",status:"host"},{fragment:"_footer",status:"host",usedIn:["mobile/upstream/effects/question-fullscreen.ts","mobile/upstream/styles/compat.css.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_footerActions",status:"host"},{fragment:"_frame",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/effects/question-fullscreen.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_grow",status:"host"},{fragment:"_header",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_headerActions",status:"host",usedIn:["mobile/upstream/effects/question-fullscreen.ts","mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_headerCorner",status:"host"},{fragment:"_headerHidden",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_headerLeading",status:"host",usedIn:["mobile/upstream/effects/composer-clearance.ts","mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_headerUtilities",status:"host"},{fragment:"_headingBlock",status:"host"},{fragment:"_headline",status:"host"},{fragment:"_iconButton",status:"host"},{fragment:"_itemIcon",status:"host"},{fragment:"_itemLabel",status:"host"},{fragment:"_label",status:"host"},{fragment:"_line",status:"host"},{fragment:"_mask",status:"host"},{fragment:"_menu",status:"host"},{fragment:"_menuAnchor",status:"host"},{fragment:"_modes",status:"host"},{fragment:"_moreBack",status:"host"},{fragment:"_navCell",status:"host",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_navList",status:"host",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_opPanel",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_optionLabel",status:"host"},{fragment:"_options",status:"host"},{fragment:"_overlayLayer",status:"host"},{fragment:"_pageHead",status:"host"},{fragment:"_pageHeading",status:"host"},{fragment:"_panel",status:"host"},{fragment:"_panelBadge",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_panelChevron",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_panelTitle",status:"host"},{fragment:"_panelToggle",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_pill",status:"host"},{fragment:"_primary",status:"host",usedIn:["mobile/upstream/effects/stats-line.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_reviewNote",status:"host"},{fragment:"_root",status:"host",usedIn:["mobile/upstream/effects/stats-line.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_row",status:"host",note:"≤3 字符：本体过泛，命中不代表语义有效",usedIn:["mobile/upstream/effects/stats-line.ts","mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_rowActions",status:"host",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_rowOpen",status:"host",usedIn:["mobile/upstream/effects/plugin-card-tap.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_runningDivider",status:"host"},{fragment:"_scroll",status:"host",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_scrollBody",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/styles/layout.css.ts"]},{fragment:"_search",status:"host"},{fragment:"_searchInline",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_searchRow",status:"host"},{fragment:"_section",status:"host"},{fragment:"_sep",status:"host",note:"≤3 字符：本体过泛，命中不代表语义有效"},{fragment:"_separator",status:"host"},{fragment:"_sessionRow",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/effects/session-menu.ts"]},{fragment:"_sheet",status:"host"},{fragment:"_sidebar",status:"host"},{fragment:"_sidebarCol",status:"host",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_sprite",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_stack",status:"host"},{fragment:"_stat",status:"host"},{fragment:"_statsRow",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_switcherRoot",status:"host"},{fragment:"_switcherTrigger",status:"host"},{fragment:"_tab",status:"host",note:"≤3 字符：本体过泛，命中不代表语义有效"},{fragment:"_tabs",status:"host",usedIn:["mobile/upstream/styles/compat.css.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_textDocument",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_timeEnd",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_title",status:"host",usedIn:["mobile/upstream/effects/drawer-close.ts","mobile/upstream/effects/session-menu.ts","mobile/upstream/styles/compat.css.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_titleBar",status:"legacy",note:"旧宿主片段：现行宿主已无"},{fragment:"_titleCluster",status:"host",usedIn:["mobile/upstream/debug.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_titleRow",status:"host",usedIn:["mobile/upstream/styles/compat.css.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_toolbar",status:"host"},{fragment:"_tools",status:"host"},{fragment:"_track",status:"host"},{fragment:"_trailing",status:"host",usedIn:["mobile/upstream/effects/stats-line.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_trigger",status:"host",usedIn:["mobile/upstream/effects/subagent-chip-touch.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_triggerAnchor",status:"host"},{fragment:"_triggerIcon",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_triggerLabel",status:"host"},{fragment:"_userStack",status:"host"},{fragment:"_viewArea",status:"host"},{fragment:"_viewport",status:"host"},{fragment:"_viewport_",status:"host"},{fragment:"_wrap",status:"host"},{fragment:"cardShot",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"cardShots",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"cubgiG_item",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：Ag-ohG / DXuOLW"},{fragment:"dsfv-",status:"external",note:"dsh-file-viewer（本机未安装，无法实证）"},{fragment:"dsfv-jump-input",status:"external",note:"dsh-file-viewer（本机未安装，无法实证）"},{fragment:"dsfv-page-input",status:"external",note:"dsh-file-viewer（本机未安装，无法实证）"},{fragment:"dsfv-search-input",status:"external",note:"dsh-file-viewer（本机未安装，无法实证）"},{fragment:"grow",status:"host"},{fragment:"h8S2Va_menu",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：Ag-ohG / Luqt-a"},{fragment:"h8S2Va_root",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / AtgMta"},{fragment:"hHd-Xa_toggle",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：HOHHba / K5rwea"},{fragment:"headerActions",status:"host"},{fragment:"headerBlank",status:"host"},{fragment:"heroWorkspaceRow",status:"host"},{fragment:"iWlSmW_trigger",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / Ag-ohG"},{fragment:"iWlSmW_triggerIcon",status:"legacy",note:"旧宿主哈希族；现行宿主已无同名片段"},{fragment:"irow",status:"external",note:"dsh-web-ui 已安装列表（本机未安装，无法实证）",usedIn:["mobile/upstream/effects/installed-list.ts","mobile/upstream/styles/compat.css.ts"]},{fragment:"irowActions",status:"external",note:"dsh-web-ui 已安装列表（本机未安装，无法实证）",usedIn:["mobile/upstream/effects/installed-list.ts","mobile/upstream/styles/compat.css.ts"]},{fragment:"irowTrailing",status:"external",note:"dsh-web-ui 已安装列表（本机未安装，无法实证）",usedIn:["mobile/upstream/effects/installed-list.ts","mobile/upstream/styles/compat.css.ts"]},{fragment:"logoRow",status:"host"},{fragment:"moreMenu",status:"host"},{fragment:"nL4_yW_moreButton",status:"legacy",note:"旧宿主哈希族；现行宿主已无同名片段"},{fragment:"name",status:"host"},{fragment:"newSession",status:"host"},{fragment:"nm",status:"host",note:"≤3 字符：本体过泛，命中不代表语义有效",usedIn:["mobile/upstream/effects/installed-list.ts","mobile/upstream/styles/compat.css.ts"]},{fragment:"owner",status:"host"},{fragment:"panelRow",status:"host",usedIn:["mobile/upstream/effects/drawer-close.ts","mobile/upstream/effects/panel-exit.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"scrollBody",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/index.tsx","mobile/upstream/styles/layout.css.ts"]},{fragment:"searchResultRow",status:"host"},{fragment:"searchResultWorkspace",status:"host"},{fragment:"sessionRow",status:"host",usedIn:["mobile/upstream/effects/drawer-close.ts","mobile/upstream/effects/sidebar-swipe.ts","mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"sidebarCol",status:"host",usedIn:["mobile/upstream/effects/drawer-quick-settings.ts","mobile/upstream/effects/drawer-session-log.ts","mobile/upstream/styles/base.css.ts"]},{fragment:"spec",status:"host",usedIn:["mobile/upstream/effects/installed-list.ts","mobile/upstream/styles/compat.css.ts"]},{fragment:"switch",status:"host"},{fragment:"tabSearch",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"tabSearchRow",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"titleCluster",status:"host"},{fragment:"triggerRow",status:"host",usedIn:["mobile/upstream/effects/drawer-quick-settings.ts","mobile/upstream/styles/base.css.ts"]},{fragment:"usg_",status:"legacy",note:"旧宿主片段：现行宿主已无"},{fragment:"viewsMore",status:"host"},{fragment:"viewsMoreAnchor",status:"host",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]}];var ut="pocket",Sn={section:"手机访问",title:"📱 手机访问",subtitle:"手机扫码打开的就是电脑上的这个界面，实时同步",developer:"开发者：大哈",starAsk:"⭐ 顺手留颗 Star，大哈能高兴一整天",starCta:"好，这就去 Star",restarted:"已重启",reloadFailed:"自动刷新没成功（新进程可能还在启动）",reloadNow:"刷新页面",ok:"知道了",loadingStatus:"正在读取状态…",offlineHint:"暂时连不上宿主（可能正在重启），恢复后会自动刷新状态",later:"稍后",bgHint:"进程在后台运行（不挂终端）。如需停止：{cmd}",updatedRestart:"已更新 v{ver}，重启生效",restartingNow:"正在重启生效…",restarting:"重启中…",restartNow:"🔄 重启 dsh web 生效",restartingDetail:"⏳ 正在重启生效（通常 10-30 秒）· 已等待 {s} 秒",updatedRestartDetail:"已更新，重启 dsh web 生效",versionLine:"v{ver}",updateDocLink:"更新方法",updateHint:"更新方式：重跑 README 里的 add 命令（插件内不再一键更新），装完重启 dsh web 生效",restartFailed:"重启失败：{err}",wanAccess:"公网访问",publicConfig:"公网配置",publicSetupHint:"不提供现成公网地址。请先配置自己的 Cloudflare 域名与 Tunnel Token；未配置时公网保持关闭，保存配置不会自动开启。",publicConfigure:"配置公网访问",pinLabel:"访问密码",advAddress:"高级 · 手动选地址",wanOffHint:"公网已关闭。开启后可通过自配固定域名从任何网络访问（每次开启需确认免责声明）",resetFactory:"🧹 恢复出厂设置",resetGo:"恢复",resetIntro:"设置搞出问题时的临时兜底：清空本机配置并重设随机密码（DSH 的会话、模型、插件配置不受影响）",resetTitle:"⚠️ 确认恢复出厂设置？",resetBody:`将清空并恢复默认：
① 开关：局域网访问=开、访问密码=开、手机端右边栏=开、局域网地址=自动
② 公网：关闭公网访问，清空 Tunnel Token、固定域名与自动恢复标记；重新配置前保持关闭
③ 密码：公网和局域网都换成新的随机 8 位密码（旧密码立即作废，手机需重新输入）

DSH 自身的会话、模型、插件配置不受影响；此操作不可撤销。`,resetConfirm:"确认恢复",resetDone:"✅ 已恢复出厂设置：设置已清空，密码已换新（手机需重新输入）",resetFailed:"❌ 恢复失败，请重试",resetPartial:"⚠️ 重置不完整：部分设置或密码没能写入磁盘，详情见下方提示",pinSaveMemoryOnly:"⚠️ 密码只在本次运行有效：写入磁盘失败，重启后会失效",lanTitle:"📶 局域网（同一 WiFi）",lanHint:"手机连接同一 WiFi 后扫码即可打开",lanAccess:"局域网访问",lanDisabledHint:"局域网访问已关闭：手机扫码/链接均不可用（公网不受影响）。点「开」恢复。",lanToggleTitleOff:"关闭局域网访问",lanToggleBodyOff:"关闭后，同一 WiFi 下的手机将无法扫码访问（局域网二维码/链接立即失效）。公网访问不受影响。确定关闭？",lanToggleTitleOn:"开启局域网访问",lanToggleBodyOn:"开启后，同一 WiFi 的手机扫码即可访问（默认需输入局域网密码）。确定开启？",confirm:"确定",lanAddress:"局域网地址",lanAddressAuto:"自动（推荐）",lanPin:"局域网访问密码",on:"开",off:"关",lanPinValue:"🔐 访问密码：{pin}（手机打开需输入；与公网密码分开）",lanPinCustomValue:"🔐 访问密码：{pin}（自定义；手机打开需输入）",refresh:"刷新",customize:"自定义",customizing:"新密码（8–64 位，英文字母或数字）：",save:"保存",cancel:"取消",pinInvalid:"密码必须是 8–64 位英文字母或数字",pinCharsFiltered:"只保留英文字母和数字，其他字符已被忽略",pinCustomHint:"自定义密码不会自动换新；泄露后请主动修改",lanPinOff:"🔓 密码已关闭：扫码直连，无需密码（仅同一局域网设备可访问；公网仍要密码）",lanPinRemoteHint:"为避免公网访客拿到局域网密码，这里只在本机/局域网内显示；需要查看请改用局域网地址打开设置。",lanPinUnavailable:"暂时读不到局域网访问密码，请刷新页面重试。",lanLocalOnly:"局域网入口的开/关与地址只允许在本机或局域网内修改；你现在是通过公网隧道访问的。",wanLocalOnly:"公网隧道的开启/停止与配置只允许在本机或局域网内操作；通过隧道访问时只能查看状态。",resetLocalOnly:"恢复出厂设置只允许在本机或局域网内执行。",lanStarting:"代理未就绪…",mobileRightbar:"手机端右边栏",mobileRightbarHint:"显示原生右边栏入口；普通手机可按需关闭，折叠屏展开后使用更方便",prefsTitle:"手机端偏好",prefsHint:"这些开关只影响手机上的显示，桌面端不受影响",statusOn:"已开启",statusOff:"已关闭",statusConnected:"已连接",mobilePinchZoom:"手机端两指捏合缩放",mobilePinchZoomHint:"默认关闭：两指捏合禁用、页面锁定 1x；开启后恢复捏合，页面意外被放大时可用它还原",mobileFontSize:"手机端字号",mobileFontSizeHint:"默认「跟随桌面」，桌面改字号时手机同步变化；选择具体字号后仅手机会话正文独立变化，不影响桌面设置",mobileFontFollow:"跟随桌面",wanTitle:"🌐 公网（人在外面）",wanHint:"需先自行配置 Cloudflare 固定域名与 Tunnel Token，开启后可从任何网络访问",wanPin:"🔐 访问密码：{pin}（启停或重启不会自动换新；手机打开链接需输入）",wanPinCustom:"🔐 访问密码：{pin}（自定义；启停或重启不会自动换新）",stopTunnel:"关闭公网",enable:"开启公网访问",opening:"开启中…",namedSummary:"固定域名：{host} · Token {token}",namedTokenSet:"已配置",namedTokenMissing:"未配置",namedEdit:"修改",namedHostnameLabel:"固定域名：",namedTokenLabel:"Tunnel Token（留空 = 保持不变）：",namedHow:"请用自己的 Cloudflare 账号和域名，在 Zero Trust → Networks → Tunnels 创建命名隧道并复制 Token；自行添加 Public Hostname 路由，将 Service 指向本机实际代理端口（通常为 http://127.0.0.1:3081，改过端口请相应修改）。保存配置不会自动开启公网。",namedSecurity:"固定域名长期可被发现、更易被扫描。请设置自定义强密码并用完即关；公网密码不会随启停或重启自动换新，泄露后请主动修改。",namedNeedCfg:"请先填写自己的 Cloudflare 固定域名与 Tunnel Token",namedRunningHint:"自配固定域名（Cloudflare 命名隧道）——地址不随重启变化",namedWanHint:"仅支持自配 Cloudflare 固定域名与 Tunnel Token；未配置时公网保持关闭",namedTakeEffect:"配置已保存，不会自动开启公网；如公网正在运行，需关闭并重新开启后生效",disclaimerTitle:"⚠️ 安全免责声明",disclaimerBody:"开启公网 = 把本机 DSH（能执行代码）暴露到互联网。任何人拿到公网链接和密码，都能访问甚至操作你的电脑。请确认：① 使用自定义强密码或妥善保管自动密码；② 用完立即「关闭公网」；③ 公司/涉密网络请先确认合规。",disclaimerAgree:"我已知情，同意开启",disclaimerHint:"请勾选「我已知情」后再开启公网",downloading:"⏳ 下载 cloudflared（首次约 20-50MB，通常 1-2 分钟；之后秒开）· 已等待 {s} 秒",connecting:"⏳ 连接 Cloudflare 边缘（通常 5-30 秒）· 已等待 {s} 秒{suffix}",slowHint:" — 有点久？检查是否开着代理/VPN（Clash TUN 等）",error:"❌ 开启失败：{detail}（可重试；若是代理/VPN 问题见 README 排障）",unknownError:"未知错误",feedback:"有问题？欢迎到 GitHub Issues 反馈 🙏",fileGuardMsg:"手机上无法直接打开电脑上的文件",fileCopy:"复制",fileCopyDone:"已复制文件内容（{kb} KB）",fileCopyFailed:"复制失败",fileCopyFailedFallback:"复制失败，下方可长按选择",fileFallbackTitle:"复制失败，长按下方文本选择",fileFallbackClose:"关闭",fileTooLarge:"文件过大（{size}MB），已跳过复制",fileTruncated:"…已截断",copyLink:"复制链接",copied:"✅ 已复制地址",copyFailed:"复制失败，请长按地址手动复制",pinShow:"显示",pinHide:"隐藏",cacheTitle:"代理缓存",cacheSub:"手机访问的加速层：静态资源转码结果与会话列表瘦身结果共用一个内存预算；清空只会让下一次加载变慢",cacheUsage:"已用 {used} / {budget}",cacheEntries:"共 {n} 个缓存条目（静态资源 + 会话列表）",cacheClear:"清空缓存",cacheCleared:"✅ 已清空缓存，释放 {mb} MB",liteTitle:"轻量视图（手机专用）",liteHint:"只看会话、发消息、批审批；不加载宿主界面，弱网和旧手机更快",liteAddress:"地址",liteAddressHint:"加到主屏幕就是一个独立的小应用；打不开时随时回到宿主界面，两者共用同一份数据",liteOpen:"打开轻量视图",probeTitle:"使用探针",probeSub:"只在你这台电脑上留一份用量记录，用来决定手机端下一步怎么做",probeEnabled:"采集使用数据",probeEnabledHint:"记录各页面停留时长、点击区域、断线恢复耗时、宿主类名失效情况。不含消息内容，不联网。",probeUsage:"已用 {used} / {budget}",probeWhere:"{n} 个数据包 · 写入 {path}",probeLast:"最近一次 {when}",probeEmpty:"还没有数据",probeClear:"清空记录",probeCleared:"✅ 已清空探针记录，释放 {mb} MB",probeEnabledToast:"已开启使用探针",probeDisabledToast:"已关闭使用探针（手机端不再上报）",linkDown:"连接已断开，正在自动重连…",linkBack:"✅ 已重新连接",tipsTitle:"这是电脑上 DSH 的手机界面",tipsBody:`与电脑实时同步，不是另一个应用。
· 右滑（或点左上角）打开会话抽屉
· 断线会自动重连，不用手动刷新
· 字号、键盘、右边栏都在设置页「手机访问」里`,tipsDismiss:"知道了",backToBottom:"回到底部",lanDebugHint:"局域网直连不是安全上下文（浏览器限制）：没有离线缓存、装到主屏与推送，密码也在明文 HTTP 上传输。适合在家里的 WiFi 下应急；长期使用请配置公网隧道（HTTPS）。"},ts={section:"Phone access",title:"📱 Phone access",subtitle:"The phone shows this exact screen, live",developer:"Developer: daha1216 (大哈)",starAsk:"⭐ Drop a Star if it helped — it makes daha1216’s day",starCta:"★ Star it on GitHub",restarted:"Restarted",reloadFailed:"Auto-reload did not go through (the new process may still be starting)",reloadNow:"Reload",ok:"Got it",loadingStatus:"Loading status…",offlineHint:"Cannot reach the host right now (it may be restarting); status refreshes automatically once it is back",later:"Later",bgHint:"Running in the background (not attached to a terminal). To stop: {cmd}",updatedRestart:"Updated to v{ver} — restart to apply",restartingNow:"Restarting to apply…",restarting:"Restarting…",restartNow:"🔄 Restart dsh web now",restartingDetail:"⏳ Restarting to apply (usually 10-30s) · {s}s elapsed",updatedRestartDetail:"Updated — restart dsh web to apply",versionLine:"v{ver}",updateDocLink:"How to update",updateHint:"To update: re-run the add command from the README (there is no in-plugin updater), then restart dsh web",restartFailed:"Restart failed: {err}",wanAccess:"Public access",publicConfig:"Public configuration",publicSetupHint:"No ready-made public address is provided. Configure your own Cloudflare hostname and Tunnel Token first. Public access stays off until configured; saving does not start it.",publicConfigure:"Configure public access",pinLabel:"Access PIN",advAddress:"Advanced · Pick address",wanOffHint:"Public access is off. Enable it to use your configured hostname from any network (accept the disclaimer on each enable).",resetFactory:"🧹 Factory reset",resetGo:"Reset",resetIntro:"Temporary fallback when settings break: clear local config and re-roll random PINs (DSH sessions, models and plugin config are untouched)",resetTitle:"⚠️ Confirm factory reset?",resetBody:`This clears and restores defaults:
① Switches: LAN access on, access PIN on, mobile right sidebar on, LAN address auto
② Public: access stopped; Tunnel Token, fixed hostname and auto-restore marker cleared. Public access stays off until configured again
③ PINs: both public and LAN become new random 8-character PINs (old ones stop working; the phone must re-enter)

Your DSH sessions, models and plugin config are untouched. This cannot be undone.`,resetConfirm:"Reset",resetDone:"✅ Factory reset done: settings cleared and PINs re-rolled (re-enter the PIN on your phone)",resetFailed:"❌ Reset failed — please retry",resetPartial:"⚠️ Reset incomplete: some settings or PINs could not be written to disk — see the hint below",pinSaveMemoryOnly:"⚠️ PIN is only valid for this run: writing to disk failed, so it reverts after a restart",lanTitle:"📶 LAN (same Wi-Fi)",lanHint:"Scan to open once your phone is on the same Wi-Fi",lanAccess:"LAN access",lanDisabledHint:'LAN access is off — the QR code and link are unavailable (public access is unaffected). Tap "On" to restore.',lanToggleTitleOff:"Turn off LAN access",lanToggleBodyOff:"Once off, phones on the same Wi-Fi can no longer scan to connect (the LAN QR code and link stop working immediately). Public access is unaffected. Turn it off?",lanToggleTitleOn:"Turn on LAN access",lanToggleBodyOn:"Once on, phones on the same Wi-Fi can scan to connect (a LAN PIN is required by default). Turn it on?",confirm:"Confirm",lanAddress:"LAN address",lanAddressAuto:"Auto (recommended)",lanPin:"LAN access PIN",on:"On",off:"Off",lanPinValue:"🔐 PIN: {pin} (required on the phone; separate from the public PIN)",lanPinCustomValue:"🔐 PIN: {pin} (custom; required on the phone)",refresh:"Refresh",customize:"Customize",customizing:"New PIN (8–64 chars, letters/digits): ",save:"Save",cancel:"Cancel",pinInvalid:"PIN must be 8–64 characters (letters and digits only)",pinCharsFiltered:"Only letters and digits are kept; other characters were ignored",pinCustomHint:"Custom PINs do not rotate automatically; change yours if it leaks.",lanPinOff:"🔓 PIN off — scan & go, no PIN (LAN devices only; public still requires PIN)",lanPinRemoteHint:"Hidden over the tunnel so public visitors cannot read the LAN PIN. Open Settings via the LAN address to view it.",lanPinUnavailable:"Couldn't read the LAN PIN; refresh the page and try again.",lanLocalOnly:"LAN access can only be toggled or re-addressed from the host or the local network; you are visiting through the public tunnel.",wanLocalOnly:"Starting, stopping and configuring the public tunnel is local-only; over the tunnel you can only view its status.",resetLocalOnly:"Factory reset can only be run from the host or the local network.",lanStarting:"Proxy starting…",mobileRightbar:"Mobile right sidebar",mobileRightbarHint:"Show the native right-sidebar entry; disable it for a compact phone header or keep it on for an unfolded display",prefsTitle:"Mobile preferences",prefsHint:"These options only affect the phone layout; the desktop is untouched",statusOn:"On",statusOff:"Off",statusConnected:"Connected",mobilePinchZoom:"Mobile pinch zoom",mobilePinchZoomHint:"Off by default: two-finger pinch disabled, page locked at 1x; turn on to restore pinch for recovering from accidental zoom",mobileFontSize:"Mobile font size",mobileFontSizeHint:'Defaults to "Follow desktop", so desktop font changes also affect the phone. Choose a specific size for independent mobile conversation text without changing the desktop setting.',mobileFontFollow:"Follow desktop",wanTitle:"🌐 Anywhere (public)",wanHint:"Configure your own Cloudflare fixed hostname and Tunnel Token first, then enable access from any network.",wanPin:"🔐 PIN: {pin} (not rotated on stop/start or restart; required on the phone)",wanPinCustom:"🔐 PIN: {pin} (custom; not rotated on stop/start or restart)",stopTunnel:"Stop",enable:"Enable anywhere",opening:"Enabling…",namedSummary:"Fixed domain: {host} · Token {token}",namedTokenSet:"configured",namedTokenMissing:"not set",namedEdit:"Edit",namedHostnameLabel:"Fixed domain:",namedTokenLabel:"Tunnel Token (blank = keep current):",namedHow:"Use your own Cloudflare account and domain. Create a named tunnel in Zero Trust → Networks → Tunnels, copy its Token, and add a Public Hostname route yourself. Point its Service to the actual local proxy port (usually http://127.0.0.1:3081; adjust if changed). Saving does not start public access.",namedSecurity:"A fixed hostname remains discoverable and is easier to scan. Use a strong custom PIN and turn access off when done. The public PIN does not rotate on stop/start or restart; change it yourself if it leaks.",namedNeedCfg:"Set your own Cloudflare fixed hostname and Tunnel Token first",namedRunningHint:"Your configured hostname (Cloudflare named tunnel) — unchanged on restart",namedWanHint:"Requires your own Cloudflare fixed hostname and Tunnel Token; public access stays off until configured.",namedTakeEffect:"Configuration saved; public access is not started automatically. If it is running, turn it off and on again to apply changes.",disclaimerTitle:"⚠️ Security disclaimer",disclaimerBody:"Enabling public access exposes this computer’s DSH (which can execute code) to the internet. Anyone with the public link and PIN can reach — and operate — your computer. Please confirm: ① use a strong custom PIN or keep the auto-generated one safe; ② turn public access OFF as soon as you’re done; ③ on a corporate/classified network, confirm compliance first.",disclaimerAgree:"I understand and agree",disclaimerHint:'Check "I understand" before enabling public access',downloading:"⏳ Downloading cloudflared (first run ~20-50MB, usually 1-2 min; instant afterward) · {s}s elapsed",connecting:"⏳ Connecting to Cloudflare edge (usually 5-30s) · {s}s elapsed{suffix}",slowHint:" — taking long? Check for a proxy/VPN (e.g., Clash TUN)",error:"❌ Failed to enable: {detail} (you can retry; for proxy/VPN issues see the README)",unknownError:"unknown error",feedback:"🙏 Questions? Open an issue on GitHub",fileGuardMsg:"Cannot open a file stored on your computer directly from the phone",fileCopy:"Copy",fileCopyDone:"File content copied ({kb} KB)",fileCopyFailed:"Copy failed",fileCopyFailedFallback:"Copy failed — long-press below to select instead",fileFallbackTitle:"Copy failed — long-press the text below to select it",fileFallbackClose:"Close",fileTooLarge:"File too large ({size}MB), copy skipped",fileTruncated:"… truncated",copyLink:"Copy link",copied:"✅ Address copied",copyFailed:"Copy failed — long-press the address to copy it manually",pinShow:"Show",pinHide:"Hide",cacheTitle:"Proxy cache",cacheSub:"The phone-access speed layer: transcoded assets and slimmed session lists share one memory budget. Clearing only makes the next load slower.",cacheUsage:"{used} of {budget} used",cacheEntries:"{n} cached entries (assets + session lists)",cacheClear:"Clear cache",cacheCleared:"✅ Cache cleared, {mb} MB freed",liteTitle:"Lightweight view (phone)",liteHint:"Sessions, sending and approvals only — no host UI, faster on slow or old phones",liteAddress:"Address",liteAddressHint:"Add it to the home screen for a standalone app; if it misbehaves the host UI is still there, on the same data",liteOpen:"Open lightweight view",probeTitle:"Usage probe",probeSub:"Keeps a local usage log so the next step for the phone view can be decided from data",probeEnabled:"Collect usage data",probeEnabledHint:"Records time per screen, tap areas, reconnect delays and whether host class names still exist. No message content, never uploaded.",probeUsage:"{used} of {budget} used",probeWhere:"{n} packets · written to {path}",probeLast:"last {when}",probeEmpty:"no data yet",probeClear:"Clear log",probeCleared:"✅ Probe log cleared, {mb} MB freed",probeEnabledToast:"Usage probe enabled",probeDisabledToast:"Usage probe disabled (the phone stops reporting)",linkDown:"Disconnected — reconnecting automatically…",linkBack:"✅ Reconnected",tipsTitle:"This is DSH from your computer, sized for the phone",tipsBody:`It syncs live with the desktop — not a separate app.
· Swipe right (or tap the top-left corner) for the session drawer
· A dropped connection reconnects by itself; no refresh needed
· Font size, keyboard and right sidebar live in Settings → Phone access`,tipsDismiss:"Got it",backToBottom:"Back to bottom",lanDebugHint:"LAN direct access is not a secure context (browser restriction): no offline cache, home-screen install or push, and the PIN travels over plain HTTP. Fine for quick access at home; use the public tunnel (HTTPS) for regular use."};var uc=`
  body[data-dsh-pocket-layout="mobile"] [data-mobile-nav="frame"] [class*="scrollBody"] {
    touch-action: pan-y pinch-zoom !important;
  }
  body[data-dsh-pocket-pinch-zoom="off"],
  body[data-dsh-pocket-pinch-zoom="off"] [data-mobile-nav="frame"] [class*="scrollBody"] {
    touch-action: pan-y !important;
  }
  body[data-dsh-pocket-layout="mobile"] button[aria-label="添加工作区"],
  body[data-dsh-pocket-layout="mobile"] button[aria-label="添加工作区…"],
  body[data-dsh-pocket-layout="mobile"] button[aria-label="Add workspace"],
  body[data-dsh-pocket-layout="mobile"] button[aria-label="Add workspace…"] {
    display: none !important;
  }
  [data-mobile-nav="copy-file"] {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    margin-left: 6px !important;
    vertical-align: baseline !important;
    position: relative;
    height: 30px !important;
    padding: 0 8px !important;
    border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, .14)) !important;
    border-radius: 6px !important;
    background: var(--dsw-alias-bg-layer-1, #fff) !important;
    color: var(--dsw-alias-label-primary, inherit) !important;
    font-family: inherit !important;
    font-size: 12px !important;
    line-height: 1 !important;
    cursor: pointer !important;
    -webkit-tap-highlight-color: transparent !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .12) !important;
  }
  [data-mobile-nav="copy-file"]::after {
    content: "";
    position: absolute;
    inset: -6px;
  }
  [data-mobile-nav="copy-file"]:active {
    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06)) !important;
  }
  [data-mobile-nav="copy-file"][disabled] {
    opacity: .55 !important;
    cursor: default !important;
  }
@media (max-width: 1023px) and (pointer: coarse) {
  html body[data-dsh-pocket-layout="mobile"][data-dsh-pocket-mobile-rightbar="off"] [data-conversation-header-corner] {
    display: none !important;
  }
  body[data-dsh-pocket-layout="mobile"]:not([data-dsh-pocket-mobile-rightbar="off"]) [data-conversation-header-corner] {
    display: flex !important;
    flex: 0 0 auto !important;
    margin-left: 4px !important;
    margin-right: 0 !important;
  }
  body[data-dsh-pocket-layout="mobile"]:not([data-dsh-pocket-mobile-rightbar="off"]) [data-conversation-header-corner] button {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
    min-height: 36px !important;
  }
  body[data-dsh-pocket-layout="mobile"]:not([data-dsh-pocket-mobile-rightbar="off"]) [data-mobile-nav="files"] {
    right: 44px !important;
  }
  body[data-dsh-pocket-layout="mobile"][data-dsh-pocket-mobile-font] {
    --dsh-content-font-size: var(--dsh-pocket-mobile-font-size) !important;
  }
  body [role="button"][class*="_card"][class*="_copyable"] {
    display: none !important;
  }
  [data-phase="hero"] button[data-sidebar-right-expand] {
    display: none !important;
  }
  [data-phase] [data-composer-card] button:not(:disabled),
  [data-phase="hero"] button:not([data-mobile-nav]):not(:disabled),
  button[aria-label*="侧边栏"]:not(:disabled):not([aria-modal] *),
  button[aria-label*="right sidebar" i]:not(:disabled):not([aria-modal] *),
  button[aria-label*="搜索会话"]:not(:disabled):not([aria-modal] *),
  button[aria-label*="视图选项"]:not(:disabled):not([aria-modal] *),
  button[aria-label*="新建会话"]:not(:disabled):not([aria-modal] *),
  button[aria-label*="展开其余"]:not(:disabled):not([aria-modal] *),
  [data-phase] button[aria-label*="智能体团队"]:not(:disabled),
  [data-phase] button[aria-label*="更多操作"]:not(:disabled),
  [data-phase] button[aria-label^="Watcher"]:not(:disabled) {
    position: relative;
  }
  [data-phase="hero"] button:not([data-mobile-nav]):not(:disabled)::after,
  button[aria-label*="侧边栏"]:not(:disabled):not([aria-modal] *)::after,
  button[aria-label*="right sidebar" i]:not(:disabled):not([aria-modal] *)::after,
  button[aria-label*="搜索会话"]:not(:disabled):not([aria-modal] *)::after,
  button[aria-label*="视图选项"]:not(:disabled):not([aria-modal] *)::after,
  button[aria-label*="新建会话"]:not(:disabled):not([aria-modal] *)::after,
  button[aria-label*="展开其余"]:not(:disabled):not([aria-modal] *)::after,
  [data-phase] button[aria-label*="智能体团队"]:not(:disabled)::after,
  [data-phase] button[aria-label*="更多操作"]:not(:disabled)::after,
  [data-phase] button[aria-label^="Watcher"]:not(:disabled)::after {
    content: "";
    position: absolute;
    inset: -5px -2px;
  }
  [data-phase] [data-composer-card] button:not(:disabled)::after {
    content: "";
    position: absolute;
    inset: -8px;
  }
  @media (max-width: 1023px) and (pointer: coarse) {
    [data-mobile-nav="frame"],
    div[class*="_frame"]:has(> div[class*="_centerCol"]) {
      padding-left: env(safe-area-inset-left, 0px) !important;
      padding-right: env(safe-area-inset-right, 0px) !important;
    }
    [data-mobile-nav="frame"] > :first-child,
    div[class*="_frame"]:has(> div[class*="_centerCol"]) > :first-child {
      padding-left: env(safe-area-inset-left, 0px) !important;
    }
    [data-mobile-nav="fab"] {
      left: max(10px, env(safe-area-inset-left, 0px)) !important;
    }
    [data-mobile-nav="delete-dialog"] {
      transform: translateY(calc(-0.5 * var(--dshp-kb, 0px))) !important;
    }
    html[data-dshp-kb="open"] [data-mobile-nav="frame"] [class*="_composerSeat"],
    html[data-dshp-kb="open"] div[class*="_frame"] [class*="_composerSeat"],
    html[data-dshp-kb="open"] [data-mobile-nav="frame"] [data-phase] [class*="_composerSeat"] {
      position: sticky !important;
      bottom: var(--dshp-kb, 0px) !important;
      transform: none !important;
    }
    html [data-phase="settling"][data-dshp-settling-stale] [class*="_composerSeat"],
    html [data-content-phase="settling"][data-dshp-settling-stale] [class*="_composerSeat"] {
      visibility: visible !important;
    }
    html[data-dsh-pocket-full-height],
    html[data-dsh-pocket-full-height] body {
      height: var(--dshp-frame-h, 100%) !important;
    }
    html[data-dsh-pocket-full-height] [data-mobile-nav="frame"] {
      height: var(--dshp-frame-h, 100%) !important;
      max-height: var(--dshp-frame-h, 100%) !important;
    }
    [data-mobile-nav="delete-confirm-actions"] > button {
      min-height: 44px !important;
    }
    [data-mobile-nav="fab"] {
      min-width: 44px !important;
      min-height: 44px !important;
    }
    html[data-dshp-kb="open"] [data-mobile-nav="frame"],
    html[data-dshp-kb="open"] [data-conversation-scroll],
    html[data-dshp-kb="open"] [data-composer-seat],
    html[data-dshp-kb="open"] [class*="_composerSeat"] {
      transition: none !important;
    }
  }
}`;function $e(e,t,a){try{let o=e.locale.bind(ut)(t);return typeof o=="string"&&o.length>0?o:a}catch{return a}}function ns(e){let t=new URL(window.location.href).searchParams.get("dsh-layout"),a=t??"",n=window.matchMedia("(max-width: 1023px) and (pointer: coarse)"),o=Ii(t),r=Oi({urlValue:a,stored:o,narrowMatch:n.matches});if(document.body?.setAttribute("data-dsh-pocket-layout",r),r==="desktop")return;let i=n;r==="mobile"&&(i={matches:!0,addEventListener:()=>{},removeEventListener:()=>{}});let d=a.trim().toLowerCase();d==="desktop"||d==="mobile"||d!=="auto"&&(o==="desktop"||o==="mobile")||e.effect(()=>{let l=()=>{document.body?.setAttribute("data-dsh-pocket-layout",n.matches?"mobile":"desktop")};return n.addEventListener("change",l),()=>{n.removeEventListener("change",l)}},"dsh-pocket: auto layout attribute sync on breakpoint change");let b=(l,s)=>{e.effect(()=>{let u,x=()=>{u?.(),u=i.matches?s():void 0};return x(),i.addEventListener?.("change",x),()=>{i.removeEventListener?.("change",x),u?.()}},l)};Li(e),e.effect(()=>{let l=!0,s=g=>{document.body?.setAttribute(wt,g?"on":"off")},u=g=>{s(g.detail?.enabled===!0)},x=async()=>{try{let g=await e.connection.rpc.call(xe,$.status,{});l&&s(g?.ok===!0?g.value?.mobileRightbarEnabled!==!1:!0)}catch{l&&s(!0)}};return window.addEventListener(vt,u),x(),()=>{l=!1,window.removeEventListener(vt,u),document.body?.removeAttribute(wt)}},"dsh-mobile-nav: optional right sidebar"),e.effect(()=>{let l=!0,s=g=>{document.body?.setAttribute(nt,g?"on":"off")},u=g=>{s(g.detail?.enabled===!0)},x=async()=>{try{let g=await e.connection.rpc.call(xe,$.status,{});l&&s(g?.ok===!0?g.value?.mobilePinchZoomEnabled===!0:!1)}catch{l&&s(!1)}};return window.addEventListener(xt,u),x(),()=>{l=!1,window.removeEventListener(xt,u),document.body?.removeAttribute(nt)}},"dsh-pocket: pinch-zoom setting"),e.effect(()=>{let l=!0,s=g=>{let S=document.body;if(!S)return;let v=Number(g);Number.isInteger(v)&&v>=12&&v<=22?(S.style.setProperty(ze,`${v}px`),S.setAttribute(Fe,String(v))):(S.style.removeProperty(ze),S.removeAttribute(Fe))},u=g=>{s(Number(g.detail?.size)||0)},x=async()=>{try{let g=await e.connection.rpc.call(xe,$.status,{});l&&s(g?.ok===!0&&Number(g.value?.mobileFontSize)||0)}catch{l&&s(0)}};return window.addEventListener(yt,u),x(),()=>{l=!1,window.removeEventListener(yt,u),document.body?.style.removeProperty(ze),document.body?.removeAttribute(Fe)}},"dsh-pocket: mobile font size"),b("dsh-pocket: mobile zoom lock",()=>{let l=0,s=()=>{l=window.visualViewport?.scale??0},u=g=>{let S=g.scale,v=typeof S=="number"&&Number.isFinite(S)&&S<1;if(document.body?.getAttribute(nt)!=="on"){if(l>1.0001&&v)return;g.preventDefault();return}l>0&&l*S<=l||g.preventDefault()},x=()=>{l=0};return document.addEventListener("gesturestart",s,{passive:!1}),document.addEventListener("gesturechange",u,{passive:!1}),document.addEventListener("gestureend",x,{passive:!1}),()=>{document.removeEventListener("gesturestart",s),document.removeEventListener("gesturechange",u),document.removeEventListener("gestureend",x)}}),b("dsh-pocket: dialog focus containment",()=>{let l='[role="dialog"][aria-modal="true"]',s='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',u=[],x=p=>p.hasAttribute("data-mobile-nav")||p.parentElement?.hasAttribute("data-mobile-nav")===!0,g=p=>Array.from(p.querySelectorAll(s)).filter(L=>L.getClientRects().length>0),S=p=>!p.closest('[aria-hidden="true"], [inert]')&&p.getClientRects().length>0,v=()=>{let p=Array.from(document.querySelectorAll(l)).filter(L=>x(L)&&S(L));return p.length>0?p[p.length-1]:null},m=null,C=p=>{if(m===null||!m.isConnected||p.key!=="Tab")return;let L=g(m);if(L.length===0){p.preventDefault(),document.activeElement!==m&&m.focus({preventScroll:!0});return}let h=L[0],_=L[L.length-1],T=document.activeElement;p.shiftKey&&(T===h||!m.contains(T))?(p.preventDefault(),_.focus({preventScroll:!0})):!p.shiftKey&&(T===_||!m.contains(T))&&(p.preventDefault(),h.focus({preventScroll:!0}))};document.addEventListener("keydown",C,!0);let A=()=>{let p=v();if(p===m)return;if(m!==null&&p!==null){m=p,p.hasAttribute("tabindex")||p.setAttribute("tabindex","-1"),(g(p)[0]??p).focus({preventScroll:!0});return}if(m!==null){let _=u.pop();m=null,_!==void 0&&_.isConnected&&_.focus({preventScroll:!0});return}if(m=p,p===null)return;let L=document.activeElement;L!==null&&L!==document.body&&!p.contains(L)&&u.push(L),p.hasAttribute("tabindex")||p.setAttribute("tabindex","-1"),(g(p)[0]??p).focus({preventScroll:!0})},k=0,E=()=>{k===0&&(k=requestAnimationFrame(()=>{k=0,A()}))};A();let c=new MutationObserver(p=>{for(let L of p)if(L.type==="childList"){for(let h of L.addedNodes)if(h.nodeType===1){E();return}for(let h of L.removedNodes)if(h.nodeType===1){E();return}}});return c.observe(document.body,{childList:!0,subtree:!0}),()=>{document.removeEventListener("keydown",C,!0),c.disconnect(),k!==0&&cancelAnimationFrame(k),m?.removeAttribute("tabindex"),m=null,u.length=0}}),e.effect(()=>{let l=document.createElement("style");return l.dataset.plugin="dsh-pocket",l.dataset.pluginCss="dsh-pocket/mobile-extras.css",l.textContent=uc,document.head.appendChild(l),()=>{l.remove()}},"dsh-pocket: mobile extra styles (issue #17)"),b("dsh-pocket: settling watchdog (host reconnect leaves composer hidden)",()=>{let l="data-dshp-settling-stale",s=Ni(),u=Hi(),x=new Map,g=0,S=0,v=!1,m=()=>performance.now(),C=()=>{let I=e.connection,B=typeof I?.generation?.getSnapshot=="function";return xn({hasGeneration:B,generation:B?I.generation?.getSnapshot?.():void 0,state:B?void 0:I?.state?.getSnapshot?.()})},A=()=>{try{let I=e.sessions?.list?.getSnapshot?.();if(I===null||typeof I!="object")return;if(typeof I.current=="string")return I.current;for(let B in I.byId){let q=I.byId[B];if(q===void 0)continue;let Q=q.retainedBy?.mainView;if(typeof Q=="number"&&Q>0&&typeof q.id=="string")return q.id}}catch{}},k=I=>{if(I===void 0)return{};try{let B=e.sessions?.manager?.get?.(I);if(B===void 0)return{};let q=B.getSnapshot?.()?.openState;if(typeof q!="string")return{};let Q="openPromise"in B?B.openPromise===null||B.openPromise===void 0?"gone":"live":"unknown";return{openState:q,openPromise:Q}}catch{return{}}},E=()=>{try{let I=e.connection;typeof I?.reconnect=="function"&&I.reconnect()}catch{}},c=I=>{let B=I.getAttribute("data-conversation-session");if(typeof B=="string"&&B!=="")return B;let Q=I.querySelector("[data-conversation-session]")?.getAttribute("data-conversation-session");return typeof Q=="string"&&Q!==""?Q:void 0},p=(I,B)=>{I&&E();try{let q=(B===void 0?void 0:c(B))??A();if(q===void 0)return;let Q=e.sessions?.manager?.get?.(q);if(typeof Q?.resync!="function")return;Q.resync()}catch{}},L=I=>{let B=x.get(I);B!==void 0&&(window.clearTimeout(B),x.delete(I))},h=I=>I.getAttribute("data-phase")==="settling"?"data-phase":I.getAttribute("data-content-phase")==="settling"?"data-content-phase":null,_=I=>{if(v||!I.isConnected||h(I)===null)return;let B=c(I)??A(),q=s.decide(I,m(),k(B));if(q.repair&&p(q.reconnect,I),!q.stale){q.waiting&&T(I,q.remainingMs??2500);return}I.getAttribute(l)===null&&I.setAttribute(l,"")},T=(I,B=2500)=>{x.has(I)||x.set(I,window.setTimeout(()=>{x.delete(I),_(I)},Math.max(0,B)))},R='[data-phase="settling"],[data-content-phase="settling"]',P=()=>{if(g=0,v)return;let I=m(),B=document.querySelectorAll(R);for(let q of Array.from(document.querySelectorAll(`[${l}]`)))h(q)===null&&(q.removeAttribute(l),s.release(q));for(let q of Array.from(B))s.observe(q,I),T(q);for(let q of Array.from(x.keys()))(!q.isConnected||h(q)===null)&&(L(q),s.release(q))},O=()=>{g===0&&!v&&(g=requestAnimationFrame(P))},H=new MutationObserver(I=>{for(let B of I){if(B.type==="attributes"){O();return}for(let q of B.addedNodes)if(q.nodeType!==3){O();return}for(let q of B.removedNodes)if(q.nodeType!==3){O();return}}});H.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-phase","data-content-phase"]});let W=()=>{s.noteLink(C(),m());for(let I of Array.from(x.keys()))L(I);O()},G=[];for(let I of["generation","state"])try{let B=e.connection[I];typeof B?.subscribe=="function"&&G.push(B.subscribe(W))}catch{}let V=()=>{s.noteResume(m());for(let I of Array.from(x.keys()))L(I);O()},Z=()=>{document.visibilityState==="visible"&&V()},ae=I=>{I.persisted&&V()};return document.addEventListener("visibilitychange",Z),window.addEventListener("pageshow",ae),S=window.setInterval(()=>{u.tick(m())&&V()},u.intervalMs),P(),()=>{v=!0,H.disconnect();for(let I of G)I();document.removeEventListener("visibilitychange",Z),window.removeEventListener("pageshow",ae),S!==0&&window.clearInterval(S),u.reset(),g!==0&&cancelAnimationFrame(g);for(let I of x.values())window.clearTimeout(I);x.clear(),s.reset();for(let I of Array.from(document.querySelectorAll(`[${l}]`)))I.removeAttribute(l)}},"dsh-pocket: settling watchdog (host reconnect leaves composer hidden)"),b("dsh-pocket: link watchdog (silent disconnect never recovers)",()=>{let l=Bi(),s=!1,u=0,x=()=>performance.now(),g=P=>{try{document.dispatchEvent(new CustomEvent(xa,{detail:P}))}catch{}},S=0,v=()=>{try{let P=e.connection,O=typeof P?.generation?.getSnapshot=="function";return xn({hasGeneration:O,generation:O?P.generation?.getSnapshot?.():void 0,state:O?void 0:P?.state?.getSnapshot?.()}).down}catch{return!1}},m=()=>{try{let P=e.connection;typeof P?.reconnect=="function"&&P.reconnect()}catch{}},C=null,A=!1,k=0,E=()=>(C!==null&&C.isConnected||(C=document.createElement("div"),C.setAttribute("data-mobile-nav","link-banner"),C.setAttribute("role","status"),C.setAttribute("aria-live","polite"),C.style.cssText="position:fixed;left:50%;top:calc(env(safe-area-inset-top, 0px) + 10px);transform:translateX(-50%);z-index:2147483600;max-width:calc(100vw - 32px);padding:7px 14px;border-radius:999px;font:13px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff;box-shadow:0 4px 14px rgba(0,0,0,.22);pointer-events:none;white-space:nowrap;text-align:center",document.body.appendChild(C)),C),c=(P,O)=>{let H=E();H.textContent=P,H.style.background=O==="down"?"rgba(185,28,28,.96)":"rgba(21,128,61,.96)",H.style.display="block"},p=()=>{window.clearTimeout(k),k=0,C?.remove(),C=null,A=!1},L=()=>{if(s)return;let P=l.isDown();P!==A&&(A=P,P?(window.clearTimeout(k),k=0,S=x(),g({kind:"down"}),c($e(e,"linkDown","连接已断开，正在自动重连…"),"down")):(g({kind:"recover",ms:S===0?0:Math.round(x()-S)}),S=0,c($e(e,"linkBack","✅ 已重新连接"),"back"),k=window.setTimeout(p,1400)))},h=()=>{let P=O=>{s||(window.clearTimeout(u),u=0,l.noteProbe(O,x()),g({kind:"probe"}),L())};u=window.setTimeout(()=>P(!1),Fi);try{let O=e.connection?.rpc;if(typeof O?.call!="function"){P(!0);return}Promise.resolve(O.call(xe,$.status,{})).then(()=>P(!0),()=>P(!1))}catch{P(!1)}},_=()=>{if(s)return;let P=x(),O=document.visibilityState==="visible";l.noteState(v(),P),l.shouldReconnect(P,O)&&m(),l.shouldProbe(P,O)&&h(),L()},T=window.setInterval(_,zi),R=()=>{document.visibilityState==="visible"&&_()};return document.addEventListener("visibilitychange",R),_(),()=>{s=!0,window.clearInterval(T),window.clearTimeout(u),p(),l.reset(),document.removeEventListener("visibilitychange",R)}},"dsh-pocket: link watchdog (silent disconnect never recovers)"),b("dsh-pocket: usage probe (2026-11-12)",()=>{let l=(()=>{try{let F="__dshp_probe__";return window.localStorage.setItem(F,"1"),window.localStorage.removeItem(F),window.localStorage}catch{return null}})(),s=(()=>{try{return Qi(l?.getItem(va)??null)??Ht(Date.now())}catch{return Ht(Date.now())}})(),u=!1,x=!0,g=0,S="read",v="read",m=0,C=()=>{if(l!==null)try{l.setItem(va,Yi(s))}catch{}},A=()=>{try{let F=document.createElement("div");F.style.cssText="position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)",(document.body??document.documentElement).appendChild(F);let z=window.getComputedStyle(F),U=fe=>Math.round(Number.parseFloat(fe)||0),J={top:U(z.paddingTop),right:U(z.paddingRight),bottom:U(z.paddingBottom),left:U(z.paddingLeft)};return F.remove(),J}catch{return{top:0,right:0,bottom:0,left:0}}},k=F=>{let z=navigator,U=/(?:iPhone|iPad|iPod).*?OS (\d+)[._](\d+)/.exec(z.userAgent)??/OS (\d+)[._](\d+) like Mac OS X/.exec(z.userAgent),J=(()=>{try{return window.matchMedia("(display-mode: standalone)").matches?"standalone":window.matchMedia("(display-mode: fullscreen)").matches?"fullscreen":"browser"}catch{return"browser"}})(),fe=window.visualViewport,et=A();return{standalone:z.standalone===!0||J==="standalone",displayMode:J,ios:U===null?"":`${U[1]}.${U[2]}`,host:F,platform:typeof z.platform=="string"?z.platform:"",dpr:Number(window.devicePixelRatio)||0,screenW:Math.round(window.screen?.width??0),screenH:Math.round(window.screen?.height??0),viewportW:Math.round(fe?.width??window.innerWidth),viewportH:Math.round(fe?.height??window.innerHeight),safeTop:et.top,safeBottom:et.bottom,safeLeft:et.left,safeRight:et.right}},E='[class*="_composerSeat"],[class*="_composerStack"],[data-composer-seat]',c='[data-conversation-scroll],[class*="_scrollBody"]',p=()=>{let F=document.activeElement;return F instanceof HTMLElement?F.isContentEditable?!0:F.tagName!=="TEXTAREA"&&F.tagName!=="INPUT"?!1:F.closest(E)!==null:!1},L=()=>document.querySelector("[data-dshp-section]")!==null?"settings":document.querySelector("[data-sidebar-right-toggle]")!==null?"files":document.querySelector('[class*="_approval"]')!==null?"approve":p()?"type":"read",h=()=>{if(u||!x)return;let F=performance.now(),z=document.visibilityState==="visible";if(m!==0&&z){let U=Math.round(F-m);U>3e3?($i(s,U-1e3),ya(s,S,1e3)):ya(s,S,U)}S=L(),z&&S==="approve"&&v!=="approve"&&Te(s,"approvals"),v=S,m=F},_=F=>{let z=F instanceof Element?F:null;return z===null?"other":z.closest("[data-dshp-section]")!==null?"settings":z.closest('[class*="_approval"]')!==null?"approve":z.closest("[data-sidebar-right-toggle],[data-sidebar-right-expand]")!==null?"files":z.closest(E)!==null?"composer":z.closest(c)!==null?"conversation":z.closest("[data-mobile-nav]")!==null?"nav":z.closest('header,[class*="_titleBar"],[class*="_header"]')!==null?"header":z.closest('[class*="_sessionRow"],[data-sidebar],[class*="_sidebar"],[class*="_drawer"],[class*="_sheet"]')!==null?"panel":"other"},T=F=>{Wi(s,_(F.target));let z=F.target instanceof Element?F.target:null;z!==null&&z.closest('[class*="_sessionRow"]')!==null&&Te(s,"sessions")},R=new WeakMap,P=0,O=0,H=0,W=F=>{if(u){P=0;return}O!==0&&Ki(s,1,F-O>50?1:0),O=F,performance.now()<H?P=requestAnimationFrame(W):(P=0,O=0)},G=()=>{H=performance.now()+800,P===0&&!u&&(O=0,P=requestAnimationFrame(W))},V=F=>{let z=F.target;if(!(z instanceof HTMLElement)||z.matches(c)===!1&&z.closest(c)===null)return;let U=R.get(z);if(R.set(z,z.scrollTop),G(),U===void 0)return;let J=Math.abs(z.scrollTop-U);J>0&&Te(s,"scrollPx",Math.min(J,2e4))},Z=new WeakMap,ae=F=>F instanceof HTMLTextAreaElement||F instanceof HTMLInputElement?F.value??"":F.textContent??"",I=F=>{let z=F.target;if(!(z instanceof HTMLElement)||z.closest(E)===null)return;let U=ae(z),J=Z.get(z)??"";Z.set(z,U),U.length>J.length&&Te(s,"chars",U.length-J.length),J.trim()!==""&&U.trim()===""&&Te(s,"sends")},B=es.filter(F=>F.status==="host").map(F=>F.fragment),q=()=>{if(!(u||!x))try{let F=new Set;for(let U of Array.from(document.querySelectorAll("[class]"))){let J=U.getAttribute("class");if(J!==null)for(let fe of J.split(/\s+/))fe!==""&&F.add(fe)}let z=Array.from(F).join(" ");Xi(s,B.filter(U=>z.includes(U)===!1))}catch{}},Q=F=>{En(s,"error",F.message)},oe=F=>{let z=F.reason;En(s,"rejection",typeof z=="string"?z:z instanceof Error?z.message:String(z??""))},se=()=>{Ui(s)},Pe=F=>{let z=F.detail;z?.kind==="down"?Vi(s,Date.now()):z?.kind==="recover"?ji(s,typeof z.ms=="number"?z.ms:0):z?.kind==="probe"&&Gi(s)},Ze=e.connection?.rpc,Ye=(F,z)=>{try{return typeof Ze?.call!="function"?Promise.resolve(null):Promise.resolve(Ze.call(xe,F,z))}catch{return Promise.resolve(null)}},mt=()=>{if(u||!x)return;g=Date.now(),C();let F=Zi(s);if(Ji(F)>16384){s=Tn(s),C();return}Ye($.probeReport,{packet:F}).then(z=>{u||!x||!(z?.ok===!0&&z.value?.accepted===!0)||(s=Tn(s),C())}).catch(()=>{})},zt=()=>{if(document.visibilityState==="visible"){m=performance.now();return}m!==0&&ya(s,S,Math.min(Math.round(performance.now()-m),1e3*2)),m=performance.now(),C(),Date.now()-g>6e4&&mt()},he=F=>{F?.persisted===!0&&Te(s,"bfcache"),C(),mt()},de=window.setInterval(h,1e3),ft=window.setInterval(C,6e4),Qe=window.setInterval(mt,3e5),Oe=window.setInterval(q,3e5),Je=null;try{let F=PerformanceObserver.supportedEntryTypes;Array.isArray(F)&&F.includes("longtask")&&(Je=new PerformanceObserver(z=>{Te(s,"longtasks",z.getEntries().length)}),Je.observe({entryTypes:["longtask"]}))}catch{Je=null}let Bt=(F=!0)=>{u||(u=!0,window.clearInterval(de),window.clearInterval(ft),window.clearInterval(Qe),window.clearInterval(Oe),document.removeEventListener("click",T,!0),document.removeEventListener("scroll",V,!0),document.removeEventListener("input",I,!0),document.removeEventListener(xa,Pe),window.removeEventListener("offline",se),document.removeEventListener("visibilitychange",zt),window.removeEventListener("pagehide",he),window.removeEventListener("error",Q),window.removeEventListener("unhandledrejection",oe),Je?.disconnect(),P!==0&&(cancelAnimationFrame(P),P=0),F&&C())};return Te(s,"loads"),document.addEventListener("click",T,!0),document.addEventListener("scroll",V,!0),document.addEventListener("input",I,!0),document.addEventListener(xa,Pe),window.addEventListener("offline",se),document.addEventListener("visibilitychange",zt),window.addEventListener("pagehide",he),window.addEventListener("error",Q),window.addEventListener("unhandledrejection",oe),h(),q(),Ye($.status,{}).then(F=>{if(u||F?.ok!==!0)return;let z=F.value?.probe;if(z!=null&&z.enabled===!1){x=!1;try{l?.removeItem(va)}catch{}Bt(!1);return}Ye($.version,{}).then(U=>{if(u||U?.ok!==!0)return;let J=U.value,fe=typeof J?.loaded=="string"?J.loaded:typeof J?.current=="string"?J.current:"";s=qi(s,k(fe)),C()}).catch(()=>{})}).catch(()=>{}),()=>Bt()},"dsh-pocket: usage probe (2026-11-12)"),b("dsh-pocket: keyboard height css var (--dshp-kb)",()=>{let l=window.visualViewport;if(l==null)return()=>{};let s=document.documentElement,u=0,x="",g=0,S=!1,v=null,m=()=>(v!==null&&v.isConnected&&v.matches("[data-composer-seat]")&&v.getClientRects().length>0||(v=Array.from(document.querySelectorAll("[data-composer-seat]")).find(k=>k.getClientRects().length>0)??null),v),C=()=>{u=0;let k=Math.max(0,window.innerHeight-l.height-l.offsetTop),E=0;if(Math.abs(l.scale-1)<.01){let L=m();if(L!==null){let h=L.getBoundingClientRect().bottom+(S?g:0);E=Math.max(0,h-l.height)}}let c=Math.min(Math.max(k,E),Math.round(window.innerHeight*.6));g=c,S=c>0;let p=`${Math.round(c)}px`;p!==x&&(x=p,s.style.setProperty("--dshp-kb",p),c>0?s.setAttribute("data-dshp-kb","open"):s.removeAttribute("data-dshp-kb"))},A=()=>{u===0&&(u=requestAnimationFrame(C))};return l.addEventListener("resize",A),l.addEventListener("scroll",A),C(),()=>{l.removeEventListener("resize",A),l.removeEventListener("scroll",A),u!==0&&cancelAnimationFrame(u),v=null,s.style.removeProperty("--dshp-kb"),s.removeAttribute("data-dshp-kb")}}),b("dsh-pocket: first-visit tips",()=>{let l="dsh-pocket:first-visit-tips:v1",s=!0;try{s=window.localStorage.getItem(l)!==null}catch{}if(s)return()=>{};let u=()=>{try{window.localStorage.setItem(l,"1")}catch{}},x=null,g=0,S=()=>{u(),window.clearTimeout(g),g=0,x?.remove(),x=null};x=document.createElement("div"),x.setAttribute("data-mobile-nav","first-visit-tips"),x.setAttribute("role","dialog"),x.setAttribute("aria-label",$e(e,"tipsTitle","这是电脑上 DSH 的手机界面")),x.style.cssText="position:fixed;left:12px;right:12px;bottom:calc(env(safe-area-inset-bottom, 0px) + 76px);z-index:2147483500;max-width:420px;margin:0 auto;padding:14px 16px;border-radius:14px;background:rgba(17,24,39,.97);color:#f9fafb;font:13px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.3)";let v=document.createElement("div");v.textContent=$e(e,"tipsTitle","这是电脑上 DSH 的手机界面"),v.style.cssText="font-weight:600;font-size:14px;margin-bottom:6px";let m=document.createElement("div");m.textContent=$e(e,"tipsBody",`与电脑实时同步，不是另一个应用。
· 右滑（或点左上角）打开会话抽屉
· 断线会自动重连，不用手动刷新
· 字号、键盘、右边栏都在设置页「手机访问」里`),m.style.cssText="white-space:pre-line;color:#d1d5db";let C=document.createElement("button");return C.type="button",C.textContent=$e(e,"tipsDismiss","知道了"),C.style.cssText="margin-top:10px;padding:7px 12px;border:1px solid rgba(255,255,255,.28);border-radius:8px;background:transparent;color:#fff;font:13px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;cursor:pointer",C.addEventListener("click",S),x.append(v,m,C),document.body.appendChild(x),g=window.setTimeout(S,12e3),()=>{window.clearTimeout(g),x?.remove(),x=null}}),b("dsh-pocket: back to bottom pill",()=>{let s=null,u=0,x=!1,g=()=>{let L=document.querySelectorAll("[data-conversation-scroll]");for(let h of Array.from(L))if(h.getClientRects().length>0)return h;return null},S=()=>{let L=Array.from(document.querySelectorAll("[data-composer-seat]")).find(h=>h.getClientRects().length>0)??null;return L===null?92:Math.max(12,window.innerHeight-L.getBoundingClientRect().top+12)},v=()=>(s!==null&&s.isConnected||(s=document.createElement("button"),s.type="button",s.setAttribute("data-mobile-nav","back-to-bottom"),s.setAttribute("aria-label",$e(e,"backToBottom","回到底部")),s.textContent="↓",s.style.cssText="position:fixed;right:14px;z-index:2147483400;width:40px;height:40px;border-radius:50%;border:1px solid rgba(0,0,0,.08);background:rgba(255,255,255,.96);color:#111827;font:18px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.18);display:none;align-items:center;justify-content:center;padding:0;cursor:pointer;-webkit-tap-highlight-color:transparent",s.addEventListener("click",()=>{let L=g();if(L!==null)try{L.scrollTo({top:L.scrollHeight,behavior:"smooth"})}catch{L.scrollTop=L.scrollHeight}m()}),document.body.appendChild(s)),s),m=()=>{x&&(x=!1,s!==null&&(s.style.display="none"))},C=()=>{if(s===null)return;let L=`${S()}px`;s.style.bottom!==L&&(s.style.bottom=L)},A=()=>{if(u=0,document.visibilityState!=="visible"){m();return}let L=g();if(L===null||L.scrollHeight-L.scrollTop-L.clientHeight<=280){m();return}let h=v();x||(C(),h.style.display="flex",x=!0)},k=()=>{C(),E()},E=()=>{u===0&&(u=requestAnimationFrame(A))},c=L=>{let h=L.target;h instanceof Element&&h.closest("[data-conversation-scroll]")!==null&&E()};document.addEventListener("scroll",c,{capture:!0,passive:!0}),window.addEventListener("resize",k),window.visualViewport?.addEventListener("resize",k);let p=window.setInterval(E,1200);return E(),()=>{u!==0&&cancelAnimationFrame(u),window.clearInterval(p),document.removeEventListener("scroll",c,!0),window.removeEventListener("resize",k),window.visualViewport?.removeEventListener("resize",k),s?.remove(),s=null,x=!1}}),b("dsh-pocket: standalone viewport guard (scroll residue / short layout viewport)",()=>{let l=window.visualViewport;if(l==null)return()=>{};let s=document.documentElement,u=0,x=0,g=!1,S=null,v=0,m=new URLSearchParams(window.location.search).has("dshp-diag"),C=E=>{S===null&&(S=document.createElement("div"),S.dataset.dshPocketDiag="1",S.style.cssText="position:fixed;top:calc(env(safe-area-inset-top, 0px) + 2px);left:2px;z-index:2147483647;font:10px/1.4 ui-monospace,Menlo,Consolas,monospace;background:rgba(0,0,0,.65);color:#4ade80;padding:2px 6px;border-radius:4px;pointer-events:none;white-space:normal;width:calc(100vw - 8px);word-break:break-all",document.body.appendChild(S));let c=Array.from(document.querySelectorAll("[data-composer-seat]")).find(O=>O.getClientRects().length>0)??null,p=c?.closest("[data-conversation-scroll]")??null,L=p?.querySelector('[class*="_viewArea"]')??null,h=" va=-/col=-/nz=-";if(L!==null){h=` va=${Math.round(L.getBoundingClientRect().height)}/col=-/nz=-`;let O=L;for(let H=0;H<6&&O!==null;H+=1){if(O.children.length>10){let W=Array.from(O.children).filter(G=>G.offsetHeight>0).length;h=` va=${Math.round(L.getBoundingClientRect().height)} col=${Math.round(O.getBoundingClientRect().height)} nz=${W}/${O.children.length}`;break}O=O.firstElementChild}}let _=p===null?"":` sb=${p.clientHeight}/${p.scrollHeight}@${Math.round(p.scrollTop)}`,T=c===null?"":` seatB=${Math.round(c.getBoundingClientRect().bottom)}`,R=getComputedStyle(s).getPropertyValue("--dshp-kb").trim()||"0px",P=s.hasAttribute("data-dshp-kb")?1:0;S.textContent=`tag=1014.3 ih=${window.innerHeight} vv=${Math.round(l.height)} off=${Math.round(l.offsetTop)} sc=${l.scale.toFixed(2)} sy=${window.scrollY}${_}${T}${h} kbc=${R}/f=${P}`,E&&(window.clearTimeout(v),v=window.setTimeout(()=>{S?.remove(),S=null},8e3))},A=()=>{u=0;let E=l.height>=window.innerHeight-8;if(Math.abs(l.scale-1)<.01&&l.height-window.innerHeight>8){if(x===0&&(x=performance.now()),!g&&performance.now()-x>600){g=!0,s.style.setProperty("--dshp-frame-h",`${Math.round(l.height)}px`),s.style.setProperty("--dshp-vh-diff",`${Math.round(l.height-window.innerHeight)}px`),s.setAttribute("data-dsh-pocket-full-height","");let p=Array.from(document.querySelectorAll("[data-conversation-scroll]")).find(L=>L.getClientRects().length>0)??null;p!==null&&p.scrollHeight-p.scrollTop-p.clientHeight<=8&&requestAnimationFrame(()=>{g&&p.isConnected&&(p.scrollTop=p.scrollHeight)}),C(!0)}}else x=0,g&&(g=!1,s.style.removeProperty("--dshp-frame-h"),s.style.removeProperty("--dshp-vh-diff"),s.removeAttribute("data-dsh-pocket-full-height"));!g&&E&&(window.scrollY>1||l.offsetTop>1)&&window.scrollTo(0,0),m&&C(!1)},k=()=>{u===0&&(u=requestAnimationFrame(A))};return l.addEventListener("resize",k),l.addEventListener("scroll",k),window.addEventListener("focusout",k),window.addEventListener("pageshow",k),A(),()=>{l.removeEventListener("resize",k),l.removeEventListener("scroll",k),window.removeEventListener("focusout",k),window.removeEventListener("pageshow",k),u!==0&&cancelAnimationFrame(u),window.clearTimeout(v),S?.remove(),s.style.removeProperty("--dshp-frame-h"),s.style.removeProperty("--dshp-vh-diff"),s.removeAttribute("data-dsh-pocket-full-height")}}),b("dsh-pocket: file open guard + copy button + hide add-workspace (issue #17)",()=>{let l=()=>{try{let g=e.sessions?.list?.getSnapshot?.();if(g===null||typeof g!="object")return;if(typeof g.current=="string")return g.current;for(let S in g.byId){let v=g.byId[S];if(v===void 0)continue;let m=v.retainedBy?.mainView;if(typeof m=="number"&&m>0&&typeof v.id=="string")return v.id}}catch{}},s=()=>{try{let S=(e.get?.("workspaces")??e.workspaces)?.list,v=Array.isArray(S)?S:S&&typeof S=="object"&&"value"in S?S.value:null;if(Array.isArray(v))for(let m of v){let C=m?.cwd??m?.root;if(typeof C=="string"&&C)return C}}catch{}return""},u=g=>{let S=l();return e.connection.rpc.call(xe,$.fileRead,{path:g,cwd:s(),...S===void 0?{}:{sessionId:S}})},x=e.locale.bind(ut);return Pi(u,x)})}var fc="dsh-pocket",bc=["slots","connection","layout","locale","sessionLogDownload","sessions"];function le(e,t,a){let n=e(t);if(a)for(let[o,r]of Object.entries(a))n=String(n).split(`{${o}}`).join(String(r));return n}async function gc(e,t,a){if(typeof AbortSignal<"u"&&typeof AbortSignal.timeout=="function")return fetch(e,{...t,signal:AbortSignal.timeout(a)});let n=new AbortController,o=setTimeout(()=>n.abort(),a);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(o)}}function wc(e,t){return new Promise(a=>{if(t?.aborted){a();return}let n=()=>{clearTimeout(o),t?.removeEventListener?.("abort",n),a()},o=setTimeout(n,e);t?.addEventListener?.("abort",n,{once:!0})})}function Cn(e){let t=e!==!1;document.body?.setAttribute(wt,t?"on":"off"),window.dispatchEvent(new CustomEvent(vt,{detail:{enabled:t}}))}function An(e){let t=e===!0;document.body?.setAttribute(nt,t?"on":"off"),window.dispatchEvent(new CustomEvent(xt,{detail:{enabled:t}}))}var vc=[0,...Array.from({length:11},(e,t)=>12+t)];function Ln(e){let t=Number(e),a=Number.isInteger(t)&&t>=12&&t<=22;a?(document.body?.style.setProperty(ze,`${t}px`),document.body?.setAttribute(Fe,String(t))):(document.body?.style.removeProperty(ze),document.body?.removeAttribute(Fe)),window.dispatchEvent(new CustomEvent(yt,{detail:{size:a?t:0}}))}async function os(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:0;left:0;opacity:0",document.body.appendChild(t),t.select();let a=document.execCommand("copy");return t.remove(),a===!0}catch{return!1}}var ce=e=>{let t=mc??{};for(let a of e)if(typeof t[a]=="function")return t[a];return()=>null},Y={settings:ce(["IconSettingsOutlineRegular","IconSettingsOutline16"]),lan:ce(["IconLinkOutlineRegular","IconLinkOutline16"]),wan:ce(["IconGlobeOutlineRegular","IconGlobeOutline16"]),pin:ce(["IconShieldOutlineRegular","IconShieldOutline16"]),sliders:ce(["IconSlidersTwoOutlineRegular","IconSlidersTwoOutline16"]),trash:ce(["IconTrashOutlineRegular","IconTrashOutline16"]),copy:ce(["IconCopyOutlineRegular","IconCopyOutline16"]),refresh:ce(["IconRefreshOutlineRegular","IconRefreshOutline16"]),download:ce(["IconDownloadOutlineRegular","IconDownloadOutline16"]),warn:ce(["IconWarningOutlineRegular","IconWarningOutline16"]),info:ce(["IconInfoOutlineRegular","IconInfoOutline16"]),check:ce(["IconCheckCircleOutlineRegular","IconCheckCircleOutline16"]),chevron:ce(["IconChevronDownOutlineRegular","IconChevronDownOutline16"]),lite:ce(["IconSmartphoneOutlineRegular","IconDeviceMobileOutlineRegular","IconMobileOutline16"])},rs=`
.dshp-page{max-width:760px;margin:0 auto;--dshp-text:var(--dsw-alias-label-primary,#0f1115);--dshp-text-2:var(--dsw-alias-label-secondary,#61666b);--dshp-text-3:var(--dsw-alias-label-tertiary,#81858c);--dshp-line:rgba(15,17,21,.09);--dshp-line-2:rgba(15,17,21,.16);--dshp-fill:rgba(15,17,21,.04);--dshp-fill-2:rgba(15,17,21,.07);--dshp-brand:var(--dsw-alias-brand-primary,#0f1115);--dshp-on-brand:var(--dsw-alias-label-primary-foreground,#fff);--dshp-danger:var(--dsw-alias-state-error-primary,#e5484d);--dshp-warn:var(--dsw-alias-state-warn-primary,#b45309);--dshp-success:var(--dsw-alias-state-success-primary,#10b981);--dshp-shadow:0 1px 2px rgba(15,17,21,.04),0 8px 24px -16px rgba(15,17,21,.18);--dshp-line:color-mix(in srgb,var(--dshp-text) 10%,transparent);--dshp-line-2:color-mix(in srgb,var(--dshp-text) 17%,transparent);--dshp-fill:color-mix(in srgb,var(--dshp-text) 4.5%,transparent);--dshp-fill-2:color-mix(in srgb,var(--dshp-text) 8%,transparent);display:flex;flex-direction:column;gap:16px;max-width:620px;color:var(--dshp-text);font-size:13px;line-height:1.55}
body[data-ds-dark-theme] .dshp-page{--dshp-line:rgba(255,255,255,.11);--dshp-line-2:rgba(255,255,255,.2);--dshp-fill:rgba(255,255,255,.055);--dshp-fill-2:rgba(255,255,255,.09);--dshp-shadow:0 1px 2px rgba(0,0,0,.4),0 8px 24px -16px rgba(0,0,0,.6);--dshp-line:color-mix(in srgb,var(--dshp-text) 13%,transparent);--dshp-line-2:color-mix(in srgb,var(--dshp-text) 22%,transparent);--dshp-fill:color-mix(in srgb,var(--dshp-text) 6%,transparent);--dshp-fill-2:color-mix(in srgb,var(--dshp-text) 10%,transparent)}
.dshp-head{display:flex;align-items:center;gap:12px}
.dshp-badge{flex:none;width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:var(--dshp-fill);color:var(--dshp-brand);border:1px solid var(--dshp-line)}
.dshp-head-main{flex:1;min-width:0}
.dshp-title{font-size:17px;font-weight:650;letter-spacing:-.2px;line-height:1.3}
.dshp-sub{margin-top:3px;font-size:12px;color:var(--dshp-text-3)}
.dshp-chips{display:flex;flex-wrap:wrap;gap:6px}
.dshp-chip{display:inline-flex;align-items:center;gap:6px;height:23px;padding:0 9px;border-radius:999px;border:1px solid transparent;background:var(--dshp-fill);font-size:11.5px;font-weight:500;color:var(--dshp-text-3);white-space:nowrap}
.dshp-chip-dot{width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.55}
.dshp-chip.is-on{background:color-mix(in srgb,var(--dshp-success) 13%,transparent);border-color:color-mix(in srgb,var(--dshp-success) 24%,transparent);color:color-mix(in srgb,var(--dshp-success) 72%,var(--dshp-text))}
.dshp-chip.is-on .dshp-chip-dot{opacity:1}
.dshp-card{background:var(--dsw-alias-bg-layer-1,#fff);border:1px solid var(--dshp-line);border-radius:14px;box-shadow:var(--dshp-shadow);overflow:hidden}
.dshp-card.is-danger{background:color-mix(in srgb,var(--dshp-danger) 4%,var(--dsw-alias-bg-layer-1,#fff));border-color:color-mix(in srgb,var(--dshp-danger) 20%,transparent)}
.dshp-card-head{display:flex;align-items:flex-start;gap:11px;padding:14px 16px}
.dshp-card-icon{flex:none;width:30px;height:30px;border-radius:9px;display:grid;place-items:center;background:var(--dshp-fill);color:var(--dshp-text-2)}
.dshp-card-text{flex:1;min-width:0}
.dshp-card-title{font-size:13.5px;font-weight:600;letter-spacing:-.1px}
.dshp-card-sub{margin-top:2px;font-size:11.5px;line-height:1.5;color:var(--dshp-text-3)}
.dshp-card-body{padding:0 16px 14px;display:flex;flex-direction:column;gap:12px}
.dshp-card-body>.dshp-row:first-child{border-top:1px solid var(--dshp-line);padding-top:12px}
.dshp-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:12px;border-top:1px solid var(--dshp-line)}
.dshp-row.is-stack{flex-direction:column;align-items:stretch;gap:8px}
.dshp-row-label{font-size:13px;font-weight:500}
.dshp-row-desc{margin-top:3px;font-size:11.5px;line-height:1.5;color:var(--dshp-text-3)}
.dshp-btn{font:inherit;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;height:30px;padding:0 12px;border-radius:8px;border:1px solid transparent;font-size:12.5px;font-weight:550;white-space:nowrap;transition:background .12s ease,border-color .12s ease,color .12s ease,opacity .12s ease}
.dshp-btn:focus-visible{outline:2px solid color-mix(in srgb,var(--dshp-brand) 40%,transparent);outline-offset:2px}
.dshp-btn:disabled{opacity:.45;cursor:default}
.dshp-btn.is-primary{background:var(--dshp-brand);color:var(--dshp-on-brand);border-color:transparent}
.dshp-btn.is-primary:hover:not(:disabled){background:color-mix(in srgb,var(--dshp-brand) 86%,var(--dshp-text-3))}
.dshp-btn.is-ghost{background:var(--dsw-alias-bg-layer-1,#fff);border-color:var(--dshp-line-2);color:var(--dshp-text)}
.dshp-btn.is-ghost:hover:not(:disabled){background:var(--dshp-fill)}
.dshp-btn.is-quiet{background:transparent;color:var(--dshp-text-2)}
.dshp-btn.is-quiet:hover:not(:disabled){background:var(--dshp-fill);color:var(--dshp-text)}
.dshp-btn.is-danger{background:transparent;border-color:color-mix(in srgb,var(--dshp-danger) 32%,transparent);color:var(--dshp-danger)}
.dshp-btn.is-danger:hover:not(:disabled){background:color-mix(in srgb,var(--dshp-danger) 9%,transparent)}
.dshp-btn.is-mini{height:26px;padding:0 9px;font-size:11.5px;font-weight:500;border-radius:7px}
.dshp-link{font:inherit;cursor:pointer;border:0;background:none;padding:0;color:var(--dshp-text-2);font-size:12px;text-decoration:underline;text-decoration-color:var(--dshp-line-2);text-underline-offset:2px}
.dshp-link:hover{color:var(--dshp-text)}
.dshp-switch{flex:none;position:relative;width:36px;height:20px;padding:2px;border:0;border-radius:999px;cursor:pointer;background:var(--dshp-fill-2);transition:background .14s ease}
.dshp-switch[aria-checked="true"]{background:var(--dshp-brand)}
.dshp-switch:disabled{opacity:.45;cursor:default}
.dshp-switch:focus-visible{outline:2px solid color-mix(in srgb,var(--dshp-brand) 40%,transparent);outline-offset:2px}
.dshp-switch-thumb{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:var(--dshp-on-brand);box-shadow:0 1px 2px rgba(0,0,0,.22);transition:transform .14s ease}
.dshp-switch[aria-checked="true"] .dshp-switch-thumb{transform:translateX(16px)}
.dshp-qr{display:flex;align-items:center;gap:14px;flex-wrap:wrap;background:var(--dshp-fill);border:1px solid var(--dshp-line);border-radius:12px;padding:12px}
.dshp-qr-frame{flex:none;padding:6px;background:#fff;border-radius:10px;border:1px solid rgba(15,17,21,.08);box-shadow:0 1px 2px rgba(15,17,21,.06)}
.dshp-qr-frame img{display:block;width:116px;height:116px;border-radius:2px}
.dshp-qr-main{flex:1 1 190px;min-width:180px}
.dshp-url{font-family:ui-monospace,Menlo,monospace;font-size:12px;line-height:1.6;word-break:break-all;color:var(--dshp-text);background:var(--dsw-alias-bg-layer-1,#fff);border:1px solid var(--dshp-line);border-radius:8px;padding:7px 9px}
.dshp-qr-hint{margin-top:6px;font-size:11.5px;line-height:1.5;color:var(--dshp-text-3)}
.dshp-qr-actions{display:flex;gap:6px;margin-top:9px;flex-wrap:wrap}
.dshp-alert{display:flex;gap:9px;align-items:flex-start;padding:10px 12px;border-radius:10px;background:var(--dshp-fill);border:1px solid var(--dshp-line);font-size:12.5px;line-height:1.6;color:var(--dshp-text-2)}
.dshp-alert-icon{flex:none;margin-top:1px;color:var(--dshp-text-3)}
.dshp-alert.is-info{background:var(--dshp-fill)}
.dshp-alert.is-warn{background:color-mix(in srgb,var(--dshp-warn) 9%,transparent);border-color:color-mix(in srgb,var(--dshp-warn) 22%,transparent);color:var(--dshp-text-2)}
.dshp-alert.is-warn .dshp-alert-icon{color:var(--dshp-warn)}
.dshp-alert.is-error{background:color-mix(in srgb,var(--dshp-danger) 8%,transparent);border-color:color-mix(in srgb,var(--dshp-danger) 20%,transparent);color:var(--dshp-text-2)}
.dshp-alert.is-error .dshp-alert-icon{color:var(--dshp-danger)}
.dshp-alert.is-success{background:color-mix(in srgb,var(--dshp-success) 9%,transparent);border-color:color-mix(in srgb,var(--dshp-success) 22%,transparent)}
.dshp-alert.is-success .dshp-alert-icon{color:var(--dshp-success)}
.dshp-alert-body{flex:1;min-width:0}
.dshp-alert-title{font-weight:600;color:var(--dshp-text);margin-bottom:2px}
.dshp-select{padding-right:28px;min-width:104px;cursor:pointer}
.dshp-panel-title{font-family:var(--dshp-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:12.5px;font-weight:600;line-height:1.45;word-break:break-all}
.dshp-input,.dshp-select{font:inherit;height:32px;padding:0 10px;border-radius:8px;border:1px solid var(--dshp-line-2);background:var(--dsw-alias-bg-layer-1,#fff);color:var(--dshp-text);font-size:12.5px;outline:none;min-width:0;box-sizing:border-box}
.dshp-input:focus,.dshp-select:focus{border-color:color-mix(in srgb,var(--dshp-brand) 45%,transparent);box-shadow:0 0 0 3px color-mix(in srgb,var(--dshp-brand) 12%,transparent)}
.dshp-input.is-mono{font-family:ui-monospace,Menlo,monospace;letter-spacing:.5px}
.dshp-pinbox{display:flex;align-items:center;gap:8px;flex-wrap:wrap;background:var(--dshp-fill);border:1px solid var(--dshp-line);border-radius:10px;padding:8px 10px}
.dshp-pin-value{font-family:ui-monospace,Menlo,monospace;font-size:13.5px;letter-spacing:2px;color:var(--dshp-text);flex:1;min-width:96px;word-break:break-all}
.dshp-pinbox .dshp-btn{flex:none}
.dshp-pin{font-family:ui-monospace,Menlo,monospace;font-size:13px;letter-spacing:.5px}
.dshp-inline{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.dshp-custom{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:12px;color:var(--dshp-text-2)}
.dshp-hint{margin-top:6px;font-size:11.5px;line-height:1.5;color:var(--dshp-text-3)}
.dshp-warn-text{margin-top:6px;font-size:11.5px;line-height:1.5;color:var(--dshp-warn)}
.dshp-err-text{margin-top:6px;font-size:11.5px;line-height:1.5;color:var(--dshp-danger)}
.dshp-panel{display:flex;flex-direction:column;gap:6px;background:var(--dshp-fill);border:1px solid var(--dshp-line);border-radius:10px;padding:10px 12px}
.dshp-adv{display:flex;flex-direction:column;gap:10px;width:100%}
.dshp-form{display:flex;flex-direction:column;gap:10px}
.dshp-field{display:flex;flex-direction:column;gap:5px;font-size:12px;color:var(--dshp-text-2)}
.dshp-check{display:flex;align-items:flex-start;gap:8px;margin-top:12px;font-size:12.5px;line-height:1.55;cursor:pointer}
.dshp-check input{flex:none;width:15px;height:15px;margin:2px 0 0;accent-color:var(--dshp-brand)}
.dshp-loading{display:flex;align-items:center;gap:8px;padding:16px 2px;font-size:12.5px;color:var(--dshp-text-3)}
.dshp-loading::before{content:"";flex:none;width:12px;height:12px;border-radius:50%;border:2px solid var(--dshp-line-2);border-top-color:var(--dshp-text-2);animation:dshp-spin .8s linear infinite}
@keyframes dshp-spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion: reduce){.dshp-loading::before{animation:none}.dshp-btn,.dshp-switch,.dshp-switch-thumb{transition:none}}
.dshp-footer{display:flex;align-items:center;justify-content:center;gap:7px;flex-wrap:wrap;padding-top:14px;border-top:1px solid var(--dshp-line);font-size:11.5px;color:var(--dshp-text-3)}
.dshp-footer a{color:var(--dshp-text-2);text-decoration:none}
.dshp-footer a:hover{color:var(--dshp-text);text-decoration:underline;text-underline-offset:2px}
.dshp-modal-backdrop{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(15,17,21,.42);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
.dshp-modal{width:100%;max-width:420px;padding:20px;border-radius:16px;background:var(--dsw-alias-bg-layer-1,#fff);border:1px solid var(--dshp-line);box-shadow:0 24px 64px -16px rgba(15,17,21,.4)}
.dshp-modal-title{font-size:15.5px;font-weight:600;letter-spacing:-.1px;margin-bottom:10px}
.dshp-modal-title.is-warn{color:var(--dshp-warn)}
.dshp-modal-title.is-danger{color:var(--dshp-danger)}
.dshp-modal-title.is-brand{color:var(--dshp-text)}
.dshp-modal-body{font-size:13px;line-height:1.7;white-space:pre-line;color:var(--dshp-text-2)}
.dshp-modal-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:18px}
.dshp-toast{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:10001;max-width:320px;padding:11px 18px;border-radius:10px;background:var(--dsw-alias-label-primary,#111);color:var(--dsw-alias-bg-layer-1,#fff);font-size:13px;line-height:1.5;text-align:center;box-shadow:0 12px 32px rgba(0,0,0,.3)}
@media (max-width:560px){
  .dshp-page{gap:14px}
  .dshp-badge{width:36px;height:36px;border-radius:10px}
  .dshp-title{font-size:16px}
  .dshp-card-head{padding:13px 13px}
  .dshp-card-body{padding:0 13px 13px}
  .dshp-qr{padding:11px;gap:12px}
  .dshp-qr-frame img{width:108px;height:108px}
  .dshp-qr-main{min-width:100%}
  .dshp-btn{padding:0 11px}
  .dshp-row{gap:10px}
}
`;function xc({rpcCall:e,t}){let[a,n]=(0,y.useState)(null),[o,r]=(0,y.useState)(null),[i,d]=(0,y.useState)(null),[f,b]=(0,y.useState)(!1),[l,s]=(0,y.useState)(null),[u,x]=(0,y.useState)(!1),[g,S]=(0,y.useState)(!1),[v,m]=(0,y.useState)(Date.now()),[C,A]=(0,y.useState)({}),[k,E]=(0,y.useState)(!1),[c,p]=(0,y.useState)({}),[L,h]=(0,y.useState)(!1),_=(0,y.useRef)(0),T=(0,y.useRef)(0),R=(0,y.useRef)(0),P=w=>n(M=>M&&{...M,...w}),O=(0,y.useRef)({}),H=async(w,M)=>{T.current=Date.now();let N=O.current;N[w]=(N[w]??0)+1,p(X=>X[w]===!0?X:{...X,[w]:!0});try{return await M()}finally{N[w]=Math.max(0,(N[w]??1)-1),N[w]===0&&(delete N[w],p(X=>{if(X[w]!==!0)return X;let ee={...X};return delete ee[w],ee}))}};(0,y.useEffect)(()=>{let w="dshp-settings-css",M=document.getElementById(w);M&&M.tagName!=="STYLE"&&(M=null),M||(M=document.createElement("style"),M.id=w,document.head.appendChild(M)),M.textContent!==rs&&(M.textContent=rs)},[]),(0,y.useEffect)(()=>{if(!(!!(l?.restarting&&l?.startedAt)||!!(i?.startedAt&&["downloading","starting","registering"].includes(i?.phase??""))))return;let M=setInterval(()=>m(Date.now()),1e3);return()=>clearInterval(M)},[l,i]);let W=w=>w?Math.max(0,Math.floor((v-w)/1e3)):0,G=w=>{let M=Number(w)||0;return M>=1024*1024?`${(M/1024/1024).toFixed(1)} MB`:`${Math.round(M/1024)} KB`},V=async(w,M)=>{let N=await e(w,M,typeof AbortSignal<"u"&&typeof AbortSignal.timeout=="function"?AbortSignal.timeout(3e4):void 0);if(!N?.ok)throw new Error(N?.error?.message??"RPC failed");return N.value},Z=(0,y.useRef)(null);(0,y.useEffect)(()=>()=>{Z.current?.abort()},[]);let ae=async()=>{Z.current?.abort();let w=new AbortController;Z.current=w;let M=Date.now()+3e4;for(;Date.now()<M&&!w.signal.aborted;){try{if((await gc(location.href,{method:"GET",cache:"no-store"},3e3)).ok){w.signal.aborted||location.reload();return}}catch{}await wc(1e3,w.signal)}w.signal.aborted||E(!0)},I=async()=>{let w=Date.now(),M=++R.current;try{let N=await V($.status,{});if(M!==R.current)return;if(T.current>w){h(!1),_.current=0;return}_.current=0,h(!1),n(N),Cn(N.mobileRightbarEnabled),An(N.mobilePinchZoomEnabled),Ln(N.mobileFontSize),d(N.tunnelState??null),N.desktop&&S(!0),N.restartNotice&&(b(!0),s(null),sessionStorage.getItem("dshp-auto-reloaded")||(sessionStorage.setItem("dshp-auto-reloaded","1"),ae()))}catch{if(M!==R.current)return;_.current+=1,_.current>=2&&h(!0)}};(0,y.useEffect)(()=>{I();let w=()=>{document.hidden||I()};document.addEventListener("visibilitychange",w);let M=setInterval(()=>{document.hidden||I()},1e4);return()=>{clearInterval(M),document.removeEventListener("visibilitychange",w),R.current+=1}},[]),(0,y.useEffect)(()=>{try{sessionStorage.removeItem("dshp-auto-reloaded")}catch{}},[]),(0,y.useEffect)(()=>{if(g)return;let w=!0,M=async()=>{if(!document.hidden)try{let X=await V($.version,{});if(!w)return;s(ee=>({current:X.current??null,loaded:X.loaded??null,restarting:ee?.restarting===!0,startedAt:ee?.startedAt,error:ee?.error}))}catch{}},N=()=>{document.hidden||M()};return document.addEventListener("visibilitychange",N),M(),()=>{w=!1,document.removeEventListener("visibilitychange",N)}},[g]);let B=!!l?.current&&!!l?.loaded&&Vn(l.current,l.loaded)>0,q=async()=>{s(w=>({...w??{},restarting:!0,startedAt:Date.now(),error:null}));try{await Promise.race([V($.restart,{}),new Promise((w,M)=>setTimeout(()=>M(new Error("restart requested (no reply within 3s)")),3e3))]),s(w=>({...w??{},restarting:!0}))}catch(w){let M=String(w?.message??"");if(/connection|socket|fetch|network|abort|cancelled|ECONN|disconnect|closed|timeout/i.test(M)){s(N=>({...N??{},restarting:!0}));return}s(N=>({...N??{},restarting:!1,error:w.message}))}},[Q,oe]=(0,y.useState)(!1),[se,Pe]=(0,y.useState)(!1),Ze=async()=>{let w=a?.tunnelConfig;if(!w?.hostname||!w?.tokenSet){de({hostname:w?.hostname??"",token:"",err:t("namedNeedCfg")});return}r(null),d({phase:"starting",detail:"正在开启…",startedAt:Date.now()}),await H("wan",async()=>{try{let M=await V($.tunnelStart,{disclaimer:!0});n(M),d(M.tunnelState??null)}catch(M){r(M.message),d(null)}})},Ye=()=>{let w=a?.tunnelConfig;if(!w?.hostname||!w?.tokenSet){de({hostname:w?.hostname??"",token:"",err:null});return}Pe(!1),oe(!0)},mt=()=>{se&&(oe(!1),Ze())},zt=()=>H("wan",async()=>{try{let w=await V($.tunnelStop,{});n(w),d(w.tunnelState??null)}catch(w){r(w.message)}}),[he,de]=(0,y.useState)(null),ft=()=>H("saveNamed",async()=>{try{let w=await V($.tunnelSetConfig,{mode:"named",hostname:he?.hostname??"",token:he?.token||void 0});n(w),de(null)}catch(w){de(M=>({...M??{},err:w.message}))}}),[Qe,Oe]=(0,y.useState)(!1),Je=async()=>{Oe(!1),r(null),await H("reset",async()=>{try{let w=await V($.pocketReset,{confirm:!0});n(w),Cn(w.mobileRightbarEnabled),An(w.mobilePinchZoomEnabled),Ln(w.mobileFontSize),de(null),Ce(null),qn(!1),A({}),Array.isArray(w?.resetWarnings)&&w.resetWarnings.length>0?(r(w.resetWarnings.join("；")),we(t("resetPartial"))):we(t("resetDone"))}catch(w){r(w.message),we(t("resetFailed"))}})},Bt=()=>H("refreshPin",async()=>{try{let w=await V($.lanTokenRefresh,{});n(M=>M&&{...M,lanToken:w.lanToken}),A(M=>({...M,lan:!1}))}catch(w){r(w.message)}}),F=w=>H("lanAuth",async()=>{try{let M=await V($.lanAuthSetEnabled,{on:w});n(N=>N&&{...N,lanAuthEnabled:M.lanAuthEnabled})}catch(M){r(M.message)}}),z=w=>H("prefs",async()=>{try{let N=(await V($.mobileRightbarSetEnabled,{on:w})).mobileRightbarEnabled===!0;P({mobileRightbarEnabled:N}),Cn(N)}catch(M){r(M.message)}}),U=w=>H("prefs",async()=>{try{let N=(await V($.mobilePinchZoomSetEnabled,{on:w})).mobilePinchZoomEnabled===!0;P({mobilePinchZoomEnabled:N}),An(N)}catch(M){r(M.message)}}),J=w=>H("prefs",async()=>{try{let M=await V($.mobileFontSetSize,{size:w}),N=Number(M.mobileFontSize)||0;P({mobileFontSize:N}),Ln(N)}catch(M){r(M.message)}}),fe=()=>H("cache",async()=>{try{let w=await V($.cacheClear,{});P({cache:w.cache}),we(le(t,"cacheCleared",{mb:((Number(w.freedBytes)||0)/1024/1024).toFixed(1)}))}catch(w){r(w.message)}}),et=()=>H("probe",async()=>{try{let w=await V($.probeClear,{});P({probe:w.probe}),we(le(t,"probeCleared",{mb:((Number(w.freedBytes)||0)/1024/1024).toFixed(1)}))}catch(w){r(w.message)}}),is=w=>H("probe",async()=>{try{let M=await V($.probeSetEnabled,{on:w});P({probe:M.probe}),we(t(w?"probeEnabledToast":"probeDisabledToast"))}catch(M){r(M.message)}}),[Se,bt]=(0,y.useState)(null),Mn=w=>bt(w),ss=()=>{let w=Se;if(bt(null),w!==null)return H("lanToggle",async()=>{try{let M=await V($.lanSetEnabled,{on:w});n(N=>N&&{...N,lanEnabled:M.lanEnabled})}catch(M){r(M.message)}})},ls=w=>H("lanAddr",async()=>{try{n(await V($.lanSetOverride,{ip:w}))}catch(M){r(M.message)}}),[Ie,Ce]=(0,y.useState)(null),Rn=w=>H("savePin",async()=>{if(String(Ie?.value??"").length<8){Ce(M=>({...M??{},err:t("pinInvalid")}));return}try{let M=await V($.pinSetCustom,{which:w,value:Ie?.value??""});n(N=>N&&{...N,accessToken:w==="public"?M.pin:N.accessToken,lanToken:w==="lan"?M.pin:N.lanToken,publicPinCustom:w==="public"?!0:N.publicPinCustom,lanPinCustom:w==="lan"?!0:N.lanPinCustom}),Ce(null),M&&M.persisted===!1&&we(t("pinSaveMemoryOnly"))}catch(M){Ce(N=>({...N??{},err:M.message}))}}),Ea=a?.lanUrl,pe=a?.tunnelUrl,Ta=(pe||Ea||(typeof location<"u"?location.origin:""))+"/__dsh-pocket/lite",Ne=a?.origin==="public",Sa=i?.phase??"idle",Pn=["downloading","starting","registering"].includes(Sa),ds=i?.detail??"",Ca=i?.startedAt??null,ge=a?.tunnelConfig??{hostname:"",tokenSet:!1},Dt=!!(ge.hostname&&ge.tokenSet),cs=()=>de({hostname:ge.hostname??"",token:"",err:null}),ps=!!(pe&&pe!==`https://${ge.hostname}`),gt=w=>{let M=String(w??""),N=M.indexOf(" | ");return N<0?M:(t("ok")===Sn.ok?M.slice(0,N):M.slice(N+3)).trim()},[On,In]=(0,y.useState)(null),Aa=(0,y.useRef)(null),we=w=>{In(w),clearTimeout(Aa.current),Aa.current=setTimeout(()=>In(null),2600)};(0,y.useEffect)(()=>()=>clearTimeout(Aa.current),[]);let La=(0,y.useRef)(null),Nn=Q||Se!==null||Qe;(0,y.useEffect)(()=>{if(!Nn)return;La.current=document.activeElement;let w=M=>{if(M.key==="Escape"){if(M.preventDefault(),M.stopPropagation(),Q){oe(!1);return}if(Se!==null){bt(null);return}Qe&&Oe(!1)}};return window.addEventListener("keydown",w),()=>{window.removeEventListener("keydown",w);let M=La.current;La.current=null,M&&typeof M.focus=="function"&&M.isConnected&&M.focus()}},[Nn,Q,Se,Qe]);let tt=(w,M,N,X=null)=>(0,y.createElement)("button",{role:"switch",type:"button","aria-checked":!!w,disabled:N===!0,"aria-label":X??void 0,className:"dshp-switch",onClick:N===!0?void 0:M},(0,y.createElement)("span",{className:"dshp-switch-thumb"})),K=(w,...M)=>{let{variant:N="ghost",mini:X=!1,icon:ee=null,children:at,...Pa}=w??{},ws=M.length>0?M:at;return(0,y.createElement)("button",{type:"button",...Pa,className:`dshp-btn is-${N}${X?" is-mini":""}`},ee?(0,y.createElement)(ee,{size:X?12:14}):null,ws)},Hn=({on:w,children:M})=>(0,y.createElement)("span",{className:`dshp-chip${w?" is-on":""}`},(0,y.createElement)("span",{className:"dshp-chip-dot"}),M),He=({icon:w,title:M,sub:N,right:X,children:ee,danger:at=!1,key:Pa})=>(0,y.createElement)("section",{className:`dshp-card${at?" is-danger":""}`,"data-dshp-section":Pa??""},(0,y.createElement)("div",{className:"dshp-card-head"},w?(0,y.createElement)("span",{className:"dshp-card-icon"},(0,y.createElement)(w,{size:16})):null,(0,y.createElement)("div",{className:"dshp-card-text"},(0,y.createElement)("div",{className:"dshp-card-title"},M),N?(0,y.createElement)("div",{className:"dshp-card-sub"},N):null),X??null),ee?(0,y.createElement)("div",{className:"dshp-card-body"},ee):null),be=({label:w,desc:M,control:N,extra:X,stack:ee=!1})=>(0,y.createElement)("div",{className:`dshp-row${ee?" is-stack":""}`},(0,y.createElement)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,rowGap:8,flexWrap:"wrap",minWidth:0,width:"100%"}},(0,y.createElement)("div",{style:{minWidth:0}},(0,y.createElement)("div",{className:"dshp-row-label"},w),M?(0,y.createElement)("div",{className:"dshp-row-desc"},M):null),N??null),X??null),ve=({kind:w="info",icon:M=null,children:N,title:X=null,extra:ee=null})=>(0,y.createElement)("div",{className:`dshp-alert is-${w}`},M?(0,y.createElement)("span",{className:"dshp-alert-icon"},(0,y.createElement)(M,{size:14})):null,(0,y.createElement)("div",{className:"dshp-alert-body"},X?(0,y.createElement)("div",{className:"dshp-alert-title"},X):null,N,ee??null)),Ma=({src:w,url:M,hint:N})=>(0,y.createElement)("div",{className:"dshp-qr"},(0,y.createElement)("div",{className:"dshp-qr-frame"},w?(0,y.createElement)("img",{src:w,alt:"QR"}):null),(0,y.createElement)("div",{className:"dshp-qr-main"},(0,y.createElement)("div",{className:"dshp-url"},M),N?(0,y.createElement)("div",{className:"dshp-qr-hint"},N):null,(0,y.createElement)("div",{className:"dshp-qr-actions"},K({variant:"ghost",mini:!0,icon:Y.copy,onClick:async()=>we(await os(M)?t("copied"):t("copyFailed"))},t("copyLink"))))),Fn=(w,M,N)=>(0,y.createElement)("div",{className:"dshp-pinbox"},(0,y.createElement)("span",{className:"dshp-pin-value","data-dshp-pin":w},C[w]?M:"••••••••"),K({variant:"ghost",mini:!0,onClick:()=>A(X=>({...X,[w]:!X[w]}))},C[w]?t("pinHide"):t("pinShow")),...N??[]),zn=w=>(0,y.createElement)("div",{className:"dshp-adv"},(0,y.createElement)("div",{className:"dshp-custom"},(0,y.createElement)("span",null,t("customizing")),(0,y.createElement)("input",{className:"dshp-input is-mono",style:{width:150,textAlign:"center"},type:"password",minLength:8,maxLength:64,name:"dsh-pocket-pin",autoComplete:"new-password",spellCheck:!1,value:Ie?.value??"",autoFocus:!0,onChange:M=>{let N=M.target.value,X=N.replace(/[^a-zA-Z0-9]/g,"");Ce(ee=>({...ee,value:X,err:X.length===N.length?null:t("pinCharsFiltered")}))},onKeyDown:M=>{M.key==="Enter"&&Rn(w),M.key==="Escape"&&Ce(null)}}),K({variant:"primary",mini:!0,onClick:()=>Rn(w),disabled:c.savePin===!0},t("save")),K({variant:"ghost",mini:!0,onClick:()=>Ce(null),disabled:c.savePin===!0},t("cancel"))),Ie?.err?(0,y.createElement)("div",{className:"dshp-err-text"},gt(Ie.err)):null),Bn=w=>K({variant:"ghost",mini:!0,onClick:()=>Ce({which:w,value:"",err:null})},t("customize")),Ra=({title:w,tone:M="warn",children:N,actions:X,onClose:ee})=>(0,y.createElement)("div",{className:"dshp-modal-backdrop",onClick:at=>{at.target===at.currentTarget&&ee?.()}},(0,y.createElement)("div",{className:"dshp-modal",role:"dialog","aria-modal":"true","aria-label":w},(0,y.createElement)("div",{className:`dshp-modal-title is-${M}`},w),N,(0,y.createElement)("div",{className:"dshp-modal-actions"},X))),[Dn,qn]=(0,y.useState)(!1),hs=Pn?ve({kind:"info",icon:Y.info,children:Sa==="downloading"?le(t,"downloading",{s:W(Ca)}):le(t,"connecting",{s:W(Ca),suffix:W(Ca)>30?t("slowHint"):""})}):Sa==="error"?ve({kind:"error",icon:Y.warn,children:le(t,"error",{detail:gt(ds)||t("unknownError")})}):!pe&&Dt?ve({kind:"info",icon:Y.info,children:t("wanOffHint"),extra:(0,y.createElement)("div",{style:{marginTop:8}},K({variant:"primary",onClick:Ye,disabled:c.wan===!0||c.saveNamed===!0},t("enable")))}):null,us=Dt&&!he?(0,y.createElement)("div",{className:"dshp-panel"},(0,y.createElement)("div",{style:{display:"flex",alignItems:"flex-start",gap:10}},(0,y.createElement)("div",{style:{flex:1,minWidth:0}},(0,y.createElement)("div",{className:"dshp-panel-title"},ge.hostname||"—"),(0,y.createElement)("div",{className:"dshp-hint",style:{marginTop:2}},ge.tokenSet?t("namedTokenSet"):t("namedTokenMissing"))),K({variant:"ghost",mini:!0,onClick:()=>de({hostname:ge.hostname??"",token:"",err:null})},t("namedEdit"))),(0,y.createElement)("div",{className:"dshp-hint",style:{marginTop:8,lineHeight:1.65}},t("namedHow")),!ge.tokenSet||!ge.hostname?(0,y.createElement)("div",{className:"dshp-err-text"},t("namedNeedCfg")):null):null,ms=he?(0,y.createElement)("div",{className:"dshp-form"},(0,y.createElement)("label",{className:"dshp-field"},t("namedHostnameLabel"),(0,y.createElement)("input",{className:"dshp-input",placeholder:"pocket.example.com",value:he.hostname??"",autoFocus:!0,onChange:w=>de(M=>({...M,hostname:w.target.value.trim(),err:null})),onKeyDown:w=>{w.key==="Enter"&&ft(),w.key==="Escape"&&de(null)}})),(0,y.createElement)("label",{className:"dshp-field"},t("namedTokenLabel"),(0,y.createElement)("input",{className:"dshp-input is-mono",type:"password",name:"dsh-pocket-tunnel-token",autoComplete:"off",spellCheck:!1,value:he.token??"",onChange:w=>de(M=>({...M,token:w.target.value.trim(),err:null})),onKeyDown:w=>{w.key==="Enter"&&ft(),w.key==="Escape"&&de(null)}})),(0,y.createElement)("div",{className:"dshp-inline"},K({variant:"primary",mini:!0,onClick:ft,disabled:c.saveNamed===!0},t("save")),K({variant:"ghost",mini:!0,onClick:()=>de(null),disabled:c.saveNamed===!0},t("cancel"))),(0,y.createElement)("div",{className:"dshp-hint"},t("namedHow")),(0,y.createElement)("div",{className:"dshp-warn-text"},t("namedSecurity")),he.err?(0,y.createElement)("div",{className:"dshp-err-text"},gt(he.err)):null):null,fs=(0,y.createElement)("div",{className:"dshp-adv"},ps?(0,y.createElement)("div",{className:"dshp-warn-text"},t("namedTakeEffect")):null,!Dt&&!he?ve({kind:"info",icon:Y.info,children:t("publicSetupHint"),extra:(0,y.createElement)("div",{style:{marginTop:8}},K({variant:"primary",onClick:cs},t("publicConfigure")))}):null,us,ms),bs=a?.accessToken?be({label:t("pinLabel"),stack:!0,extra:Ie?.which==="public"?zn("public"):(0,y.createElement)("div",null,Fn("public",a.accessToken,[Bn("public")]),(0,y.createElement)("div",{className:"dshp-warn-text"},t("namedSecurity")))}):null,gs=(0,y.createElement)("div",null,pe?Ma({src:a.tunnelQr,url:pe,hint:t("namedRunningHint")}):null,be({label:t("publicConfig"),stack:!0,extra:fs}),Dt||pe?bs:null);return(0,y.createElement)("div",{className:"dshp-page","data-dshp-ui":"v3"},(0,y.createElement)("header",{className:"dshp-head"},(0,y.createElement)("span",{className:"dshp-badge"},(0,y.createElement)(Y.settings,{size:19})),(0,y.createElement)("div",{className:"dshp-head-main"},(0,y.createElement)("div",{className:"dshp-title"},t("section")),(0,y.createElement)("div",{className:"dshp-sub"},t("subtitle")))),(0,y.createElement)("div",{className:"dshp-chips"},a?[Hn({on:a.lanEnabled!==!1,children:`${t("lanAccess")} · ${a.lanEnabled!==!1?t("statusOn"):t("statusOff")}`}),Hn({on:!!pe,children:`${t("wanAccess")} · ${t(pe?"statusConnected":"statusOff")}`})]:(0,y.createElement)("span",{className:"dshp-hint",style:{marginTop:0}},t("loadingStatus"))),o?ve({kind:"error",icon:Y.warn,children:gt(o),extra:(0,y.createElement)("div",{className:"dshp-inline",style:{marginTop:8}},K({variant:"ghost",mini:!0,onClick:()=>r(null)},t("ok")))}):null,L?ve({kind:"warn",icon:Y.warn,children:t("offlineHint")}):null,!g&&f?ve({kind:"info",icon:Y.refresh,title:t("restarted"),children:(0,y.createElement)("div",{className:"dshp-hint",style:{wordBreak:"break-all",marginTop:2}},le(t,"bgHint",{cmd:a?.killHint??`lsof -ti :${a?.dshPort??3080} | xargs kill -9`})),extra:(0,y.createElement)("div",{className:"dshp-inline",style:{marginTop:8}},k?K({variant:"ghost",mini:!0,icon:Y.refresh,onClick:()=>{E(!1),ae()}},t("reloadNow")):null,k?(0,y.createElement)("span",{className:"dshp-hint",style:{marginTop:0}},t("reloadFailed")):null,K({variant:"quiet",mini:!0,onClick:()=>b(!1)},t("ok")))}):null,!g&&!Ne&&B&&!u?ve({kind:"warn",icon:Y.refresh,title:le(t,"updatedRestart",{ver:l.current}),children:(0,y.createElement)("div",{className:"dshp-hint",style:{marginTop:2}},l.restarting?le(t,"restartingDetail",{s:W(l.startedAt)}):l.error?le(t,"restartFailed",{err:gt(l.error)||t("unknownError")}):t("updatedRestartDetail")),extra:(0,y.createElement)("div",{className:"dshp-inline",style:{marginTop:8}},l.restarting?K({variant:"ghost",mini:!0,disabled:!0},t("restartingNow")):K({variant:"primary",mini:!0,icon:Y.refresh,onClick:q},t("restartNow")),l.restarting?null:K({variant:"ghost",mini:!0,onClick:()=>x(!0)},t("later")))}):null,He({key:"lan",icon:Y.lan,title:t("lanAccess"),sub:t("lanHint"),right:tt(a?.lanEnabled!==!1,()=>Mn(a?.lanEnabled===!1),!a||c.lanToggle===!0||Ne,t("lanAccess")),children:Ne?(0,y.createElement)("div",{className:"dshp-hint"},t("lanLocalOnly")):a?a.lanEnabled===!1?ve({kind:"info",icon:Y.info,children:t("lanDisabledHint"),extra:(0,y.createElement)("div",{style:{marginTop:8}},K({variant:"primary",onClick:()=>Mn(!0),disabled:c.lanToggle===!0},t("lanToggleTitleOn")))}):Ea?(0,y.createElement)("div",null,Ma({src:a.lanQr,url:Ea,hint:null}),be({label:t("lanPin"),desc:a?.lanAuthEnabled===!1?t("lanPinOff"):null,control:tt(a?.lanAuthEnabled!==!1,()=>F(a?.lanAuthEnabled===!1),c.lanAuth===!0,t("lanPin"))}),a?.lanAuthEnabled===!1?null:Ie?.which==="lan"?zn("lan"):a.lanToken?(0,y.createElement)("div",null,Fn("lan",a.lanToken,[K({variant:"ghost",mini:!0,icon:Y.refresh,onClick:Bt,disabled:c.refreshPin===!0},t("refresh")),Bn("lan")]),a.lanPinCustom?(0,y.createElement)("div",{className:"dshp-warn-text"},t("pinCustomHint")):null):(0,y.createElement)("div",{className:"dshp-hint"},t(Ne?"lanPinRemoteHint":"lanPinUnavailable")),be({label:t("advAddress"),control:K({variant:"ghost",mini:!0,onClick:()=>qn(w=>!w)},(a.lanIpOverride||t("lanAddressAuto"))+(Dn?" ‹":" ›")),extra:Dn?(0,y.createElement)("div",{className:"dshp-adv"},(0,y.createElement)("label",{className:"dshp-field"},t("lanAddress"),(0,y.createElement)("select",{className:"dshp-select",value:a.lanIpOverride||"",disabled:c.lanAddr===!0,onChange:w=>ls(w.target.value)},(0,y.createElement)("option",{value:""},t("lanAddressAuto")),(a.lanCandidates||[]).map(w=>(0,y.createElement)("option",{key:w,value:w},w))))):null}),(0,y.createElement)("div",{className:"dshp-hint"},t("lanDebugHint"))):(0,y.createElement)("div",{className:"dshp-hint"},t("lanStarting")):(0,y.createElement)("div",{className:"dshp-loading"},t("loadingStatus"))}),He({key:"lite",icon:Y.lite,title:t("liteTitle"),sub:t("liteHint"),children:(0,y.createElement)("div",null,be({label:t("liteAddress"),desc:t("liteAddressHint"),control:K({variant:"ghost",mini:!0,icon:Y.copy,onClick:async()=>we(await os(Ta)?t("copied"):t("copyFailed"))},t("copyLink"))}),(0,y.createElement)("div",{className:"dshp-hint",style:{wordBreak:"break-all"}},Ta),(0,y.createElement)("div",{className:"dshp-inline",style:{marginTop:10}},K({variant:"primary",mini:!0,icon:Y.lite,onClick:()=>{window.open(Ta,"_blank","noopener")}},t("liteOpen"))))}),He({key:"wan",icon:Y.wan,title:t("wanAccess"),sub:t("namedWanHint"),right:tt(!!pe,()=>pe?zt():Ye(),Pn||c.wan===!0||c.saveNamed===!0||!a||Ne,t("wanAccess")),children:Ne?(0,y.createElement)("div",null,pe?Ma({src:a?.tunnelQr,url:pe,hint:t("namedRunningHint")}):null,(0,y.createElement)("div",{className:"dshp-hint"},t("wanLocalOnly"))):a?(0,y.createElement)("div",null,hs,gs):(0,y.createElement)("div",{className:"dshp-loading"},t("loadingStatus"))}),He({key:"prefs",icon:Y.sliders,title:t("prefsTitle"),sub:t("prefsHint"),children:a?(0,y.createElement)("div",null,be({label:t("mobileRightbar"),desc:t("mobileRightbarHint"),control:tt(a.mobileRightbarEnabled!==!1,()=>z(a.mobileRightbarEnabled===!1),c.prefs===!0,t("mobileRightbar"))}),be({label:t("mobilePinchZoom"),desc:t("mobilePinchZoomHint"),control:tt(a.mobilePinchZoomEnabled===!0,()=>U(a.mobilePinchZoomEnabled!==!0),c.prefs===!0,t("mobilePinchZoom"))}),be({label:t("mobileFontSize"),desc:t("mobileFontSizeHint"),control:(0,y.createElement)("select",{className:"dshp-select",value:String(Number(a.mobileFontSize)||0),disabled:c.prefs===!0,onChange:w=>J(Number(w.target.value))},vc.map(w=>(0,y.createElement)("option",{key:w,value:String(w)},w===0?t("mobileFontFollow"):`${w} px`)))})):(0,y.createElement)("div",{className:"dshp-loading"},t("loadingStatus"))}),a?.cache?He({key:"cache",icon:Y.refresh,title:t("cacheTitle"),sub:t("cacheSub"),children:be({label:le(t,"cacheUsage",{used:G(a.cache.bytes),budget:G(a.cache.budgetBytes)}),desc:le(t,"cacheEntries",{n:a.cache.entries??0}),control:K({variant:"ghost",mini:!0,icon:Y.trash,onClick:fe,disabled:c.cache===!0},t("cacheClear"))})}):null,a?.probe&&a.origin!=="public"?He({key:"probe",icon:Y.info,title:t("probeTitle"),sub:t("probeSub"),children:(0,y.createElement)("div",null,be({label:t("probeEnabled"),desc:t("probeEnabledHint"),control:tt(a.probe.enabled!==!1,()=>is(a.probe.enabled===!1),c.probe===!0,t("probeEnabled"))}),be({label:le(t,"probeUsage",{used:G(a.probe.bytes),budget:G(a.probe.maxBytes)}),desc:le(t,"probeWhere",{n:a.probe.packets??0,path:a.probe.path??""})+(a.probe.lastAt?" · "+le(t,"probeLast",{when:new Date(a.probe.lastAt).toLocaleString()}):" · "+t("probeEmpty")),control:K({variant:"ghost",mini:!0,icon:Y.trash,onClick:et,disabled:c.probe===!0},t("probeClear"))}))}):null,He({key:"reset",icon:Y.trash,title:t("resetFactory"),sub:t("resetIntro"),danger:!0,right:Ne?(0,y.createElement)("div",{className:"dshp-hint"},t("resetLocalOnly")):K({variant:"danger",mini:!0,onClick:()=>Oe(!0),disabled:c.reset===!0},t("resetGo"))}),(0,y.createElement)("footer",{className:"dshp-footer"},l?.current?(0,y.createElement)("span",{title:t("updateHint")},le(t,"versionLine",{ver:l.current})):null,l?.current?(0,y.createElement)("span",null,"·"):null,(0,y.createElement)("a",{href:"https://github.com/daha1216/dsh-pocket#-怎么用",target:"_blank",rel:"noreferrer",title:t("updateHint")},t("updateDocLink")),(0,y.createElement)("span",null,"·"),(0,y.createElement)("span",null,t("developer")),(0,y.createElement)("span",null,"·"),(0,y.createElement)("a",{href:"https://github.com/daha1216/dsh-pocket",target:"_blank",rel:"noreferrer",title:t("starAsk")},t("starCta")),(0,y.createElement)("span",null,"·"),(0,y.createElement)("a",{href:"https://github.com/daha1216/dsh-pocket/issues",target:"_blank",rel:"noreferrer"},t("feedback"))),Qe?Ra({title:t("resetTitle"),tone:"danger",onClose:()=>Oe(!1),children:(0,y.createElement)("div",{className:"dshp-modal-body"},t("resetBody")),actions:(0,y.createElement)("div",{className:"dshp-inline"},K({variant:"ghost",mini:!0,autoFocus:!0,onClick:()=>Oe(!1)},t("cancel")),K({variant:"danger",mini:!0,onClick:Je,disabled:c.reset===!0},t("resetConfirm")))}):null,Se!==null?Ra({title:t(Se?"lanToggleTitleOn":"lanToggleTitleOff"),tone:Se?"brand":"warn",onClose:()=>bt(null),children:(0,y.createElement)("div",{className:"dshp-modal-body"},t(Se?"lanToggleBodyOn":"lanToggleBodyOff")),actions:(0,y.createElement)("div",{className:"dshp-inline"},K({variant:"ghost",mini:!0,autoFocus:!0,onClick:()=>bt(null)},t("cancel")),K({variant:"primary",mini:!0,onClick:ss},t("confirm")))}):null,Q?Ra({title:t("disclaimerTitle"),tone:"warn",onClose:()=>oe(!1),children:(0,y.createElement)("div",null,(0,y.createElement)("div",{className:"dshp-modal-body"},t("disclaimerBody")),(0,y.createElement)("label",{className:"dshp-check"},(0,y.createElement)("input",{type:"checkbox",checked:se,onChange:w=>Pe(w.target.checked)}),t("disclaimerAgree")),se?null:(0,y.createElement)("div",{className:"dshp-err-text",style:{marginTop:8}},t("disclaimerHint"))),actions:(0,y.createElement)("div",{className:"dshp-inline"},K({variant:"ghost",mini:!0,autoFocus:!0,onClick:()=>oe(!1)},t("cancel")),K({variant:"primary",mini:!0,disabled:!se,onClick:mt},t("disclaimerAgree")))}):null,On?(0,y.createElement)("div",{className:"dshp-toast",role:"status","aria-live":"polite"},On):null)}function yc(e){if(e?.connection)try{Object.defineProperty(e.connection,"isLoopback",{value:!0,writable:!0,configurable:!0})}catch{try{e.connection.isLoopback=!0}catch{}}let t=e.locale.bind(ut);e.effect(()=>e.locale.register(ut,{zh:Sn,en:ts}),"dsh-pocket: pocket locale dictionaries"),ns(e);let a=(n,o,r)=>e.connection.rpc.call(xe,n,o,r);e.slots.inject("settings.section",()=>e.slots.register({name:"settings.section",id:"pocket",order:1,label:()=>t("section"),inject:()=>({rpcCall:a,t})},xc))}

    return module.exports;
  }
});
