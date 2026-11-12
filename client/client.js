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
var Br=Object.create;var Et=Object.defineProperty;var qr=Object.getOwnPropertyDescriptor;var Wr=Object.getOwnPropertyNames;var Vr=Object.getPrototypeOf,Gr=Object.prototype.hasOwnProperty;var jr=(e,t)=>{for(var a in t)Et(e,a,{get:t[a],enumerable:!0})},gn=(e,t,a,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Wr(t))!Gr.call(e,o)&&o!==a&&Et(e,o,{get:()=>t[o],enumerable:!(n=qr(t,o))||n.enumerable});return e};var pa=(e,t,a)=>(a=e!=null?Br(Vr(e)):{},gn(t||!e||!e.__esModule?Et(a,"default",{value:e,enumerable:!0}):a,e)),Kr=e=>gn(Et({},"__esModule",{value:!0}),e);var zd={};jr(zd,{apply:()=>Fd,inject:()=>Rd,name:()=>Md,redactStatus:()=>vn});module.exports=Kr(zd);var y=require("react"),Ld=pa(require("@deepseek-ai/dsh-client-ui-primitives"),1);var ve="/dsh-pocket",at="data-dsh-pocket-mobile-rightbar",nt="dsh-pocket:mobile-rightbar",qe="data-dsh-pocket-pinch-zoom",ot="dsh-pocket:mobile-pinch-zoom",Se="data-dsh-pocket-mobile-font",it="dsh-pocket:mobile-font-size",Ce="--dsh-pocket-mobile-font-size";var K=Object.freeze({status:"pocket.status",tunnelStart:"tunnel.start",tunnelStop:"tunnel.stop",tunnelSetConfig:"tunnel.setConfig",version:"pocket.version",restart:"pocket.restart",lanTokenRefresh:"token.lanRefresh",lanAuthSetEnabled:"lanAuth.setEnabled",lanSetOverride:"lan.setOverride",lanSetEnabled:"lan.setEnabled",mobileRightbarSetEnabled:"mobile.rightbar.setEnabled",mobilePinchZoomSetEnabled:"mobile.pinchZoom.setEnabled",mobileFontSetSize:"mobile.font.setSize",pinSetCustom:"pin.setCustom",pocketReset:"pocket.reset",fileRead:"pocket.fileRead",cacheStats:"pocket.cache.stats",cacheClear:"pocket.cache.clear"});function wn(e,t){let a=String(e).replace(/^[vV]/,"").split("."),n=String(t).replace(/^[vV]/,"").split(".");for(let w=0;w<3;w++){let s=parseInt(a[w],10)||0,l=parseInt(n[w],10)||0;if(s!==l)return s-l}let o=String(e).replace(/^[vV]/,"").match(/-.*$/)?.[0]??"",i=String(t).replace(/^[vV]/,"").match(/-.*$/)?.[0]??"";if(!o&&!i)return 0;if(!o)return 1;if(!i)return-1;let r=o.slice(1).split("."),p=i.slice(1).split("."),b=Math.max(r.length,p.length);for(let w=0;w<b;w++){let s=r[w]??"",l=p[w]??"";if(s===l)continue;let m=/^\d+$/.test(s),k=/^\d+$/.test(l);return m&&k?Number(s)-Number(l):m?-1:k?1:s<l?-1:1}return 0}function vn(e){return{proxyRunning:e?.proxyRunning===!0,proxyPort:e?.proxyPort??null,lanUrl:e?.lanUrl??null,lanQr:e?.lanQr??null,lanCandidates:Array.isArray(e?.lanCandidates)?e.lanCandidates:[],lanIpOverride:e?.lanIpOverride??"",tunnelRunning:e?.tunnelRunning===!0,tunnelUrl:e?.tunnelUrl??null,tunnelQr:e?.tunnelQr??null,tunnelState:e?.tunnelState??{phase:"idle"},tunnelConfig:e?.tunnelConfig??{mode:"named",hostname:"",tokenSet:!1},dshPort:e?.dshPort??null}}var _t=require("react");var Ur=pa(require("@deepseek-ai/dsh-client-ui-primitives"),1),$r=()=>null,ha=e=>{let t=Ur;for(let a of e){let n=t[a];if(n!==void 0)return n}return $r},xn=ha(["IconPaperclipOutlineRegular","IconPaperclipOutline16"]),yn=ha(["IconPanelLeftOutlineRegular","IconPanelLeftOutline16"]),kn=ha(["IconFolderOpenOutlineRegular","IconFolderOpenOutline16"]);function ua(){return document.querySelector("[data-shell-overlay]")?.parentElement??null}var En=null;function q(){let e=En;if(e!==null&&e.isConnected&&e.getAttribute("data-mobile-nav")==="frame")return e;let a=document.querySelector('[data-mobile-nav="frame"]')??ua();return En=a,a}var Xr="[data-sidebar-right-expand]",Zr="[data-sidebar-right-toggle]";function Tt(e=document){let t=e.querySelector(Zr),a=e.querySelector(Xr),n=typeof a?.click=="function"?a:t;return typeof n?.click!="function"?!1:(n.click(),!0)}function Tn({toggleSidebar:e,t}){let a=()=>{Tt()},[n,o]=(0,_t.useState)(!1);return(0,_t.useEffect)(()=>{let i=()=>{let w=q();return w!==null&&!w.hasAttribute("data-sidebar-collapsed")};o(i());let r=0,p=()=>{r===0&&(r=requestAnimationFrame(()=>{r=0,o(i())}))},b=new MutationObserver(w=>{for(let s of w){if(s.type==="attributes"){if(s.attributeName==="data-sidebar-collapsed"){p();return}continue}let l=[...s.addedNodes,...s.removedNodes];if(l.length===0||!l.every(m=>m.nodeType===Node.TEXT_NODE)){p();return}}});return b.observe(document.documentElement,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["data-sidebar-collapsed"]}),()=>{r!==0&&cancelAnimationFrame(r),b.disconnect()}},[]),React.createElement(React.Fragment,null,React.createElement("button",{type:"button","data-mobile-nav":"toggle","aria-label":t(n?"close":"open"),"aria-expanded":n,title:t(n?"close":"open"),onClick:()=>e()},React.createElement(yn,{size:16})),React.createElement("button",{type:"button","data-mobile-nav":"files","aria-label":t("files"),title:t("files"),onClick:a},React.createElement(kn,{size:16})))}function _n({useInput:e,useSession:t,t:a}){let n=e(r=>r.phase!=="plain"),o=t(r=>r.subagent!==null),i=n||o;return React.createElement("button",{type:"button","data-mobile-nav":"file-upload","aria-label":a("fileUpload"),title:a("fileUpload"),disabled:i},React.createElement(xn,{size:16}))}var Sn=`
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
`;var Cn=`
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
`;var An=`@media (max-width: 1023px) and (pointer: coarse) {
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
`;var Ln=`@media (max-width: 1023px) and (pointer: coarse) {
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
`;var Mn=[Sn,Cn,An,Ln].join(`
`);var Ae="(max-width: 1023px) and (pointer: coarse)",Rn="(min-width: 1024px)",St="(pointer: coarse)",Pn="(min-width: 1024px) and (pointer: coarse)";function z(e,t,a,n=Ae){e.effect(()=>{let o=window.matchMedia(n),i,r=()=>{i?.(),i=o.matches?a(o):void 0};return r(),o.addEventListener("change",r),()=>{o.removeEventListener("change",r),i?.()}},t)}function Ct(e,t){if(t!==null)try{if(t("(font: -apple-system-body) and (-webkit-touch-callout: none)"))return!0}catch{}let a=e.userAgent;return/iP(hone|ad|od)/.test(a)?!0:/Macintosh/.test(a)&&e.maxTouchPoints>1}var ma="--mobile-nav-header-h",Yr='[data-mobile-nav="frame"] [data-phase] header',rt=null,We=null;function In(e){if(typeof document>"u")return;let t=document.documentElement;t.style.getPropertyValue(ma)!==e&&t.style.setProperty(ma,e)}function Nn(){let e=q(),t=rt;return t===null||e===null||!(t instanceof HTMLElement)?"0px":`${Math.round(Math.max(0,t.getBoundingClientRect().bottom-e.getBoundingClientRect().top))}px`}function On(){In(Nn())}function Qr(){let e=rt;In(e instanceof HTMLElement&&e.offsetHeight===0?"0px":Nn())}function Jr(){if(typeof document>"u")return;let e=document.querySelector(Yr);if(e===rt){e!==null&&typeof ResizeObserver>"u"&&On();return}We?.disconnect(),rt=e,e!==null&&typeof ResizeObserver<"u"&&(We=We??new ResizeObserver(()=>{On()}),We.observe(e)),Qr()}function Hn(){return{name:"header-metrics",scopes:["*"],ensure:()=>{Jr()},dispose:()=>{We?.disconnect(),We=null,rt=null,typeof document<"u"&&document.documentElement.style.removeProperty(ma)}}}var fa="characterData";function Fn(e){return e.type==="attributes"?e.attributeName===null?"*":e.attributeName:e.type==="characterData"?fa:"*"}function zn(e){let t=e.onError??((v,A,u)=>{console.error(`[dsh-web-mobile] reconciler task ${v}${u==="dispose"?" dispose":""} failed`,A)}),a=new Set,n=null,o=new Set,i=!1,r=null,p=v=>{try{v.ensure()}catch(A){t(v.name,A,"ensure")}},b=v=>{try{v.dispose()}catch(A){t(v.name,A,"dispose")}},w=()=>{if(r!==null&&(r(),r=null),n===null){o.clear(),i=!1;return}let v=o,A=i;if(o=new Set,i=!1,A)for(let u of n)p(u);else if(v.size>0)for(let u of n){let g=u.scopes;(g===void 0||g.some(L=>v.has(L)))&&p(u)}},s=()=>{r===null&&(r=e.requestFrame(()=>{r=null,w()}))};return{get size(){return a.size},register:v=>(a.add(v),n!==null&&(n.add(v),p(v)),()=>{a.delete(v),n!==null&&n.delete(v)&&b(v)}),activate:()=>{n===null&&(n=new Set(a),i=!0,w())},deactivate:()=>{if(r!==null&&(r(),r=null),o.clear(),i=!1,n!==null){let v=n;n=null;for(let A of v)b(A)}},note:v=>{for(let A of v)o.add(A);s()},flush:w}}var Q="pocketMobileNav",Dn={open:"打开目录",close:"收起目录",backdrop:"点击关闭目录",back:"返回",backToConversation:"返回会话",sessionLog:"导出会话日志",downloadMenu:"下载",downloads:"下载记录",quickSettings:"设置",files:"文件浏览",fileUpload:"添加文件",fileUploadImage:"上传图片",fileUploadAttachment:"上传附件",questionExpand:"展开回答",questionCollapse:"收起回答",deleteSession:"删除会话",deleteConfirmTitle:"删除会话？",deleteConfirmDesc:"将删除「{title}」的完整会话记录，此操作不可恢复。",deleteConfirmYes:"删除",deleteConfirmNo:"取消",deletePending:"正在删除…",deleteErrorBusy:"该会话正在运行且无法停止，请稍后重试。",deleteErrorNotFound:"会话不存在或已被删除。",deleteErrorResolve:"无法确定要删除的会话，请重试。",deleteErrorGeneric:"删除失败：{message}"},Bn={open:"Open directory",close:"Close directory",backdrop:"Click to close directory",back:"Back",backToConversation:"Back to conversation",sessionLog:"Session log",downloadMenu:"Downloads",downloads:"Downloads history",quickSettings:"Settings",files:"Files",fileUpload:"Add files",fileUploadImage:"Upload image",fileUploadAttachment:"Upload attachment",questionExpand:"Expand answer",questionCollapse:"Collapse answer",deleteSession:"Delete session",deleteConfirmTitle:"Delete session?",deleteConfirmDesc:"The complete log of “{title}” will be permanently removed. This cannot be undone.",deleteConfirmYes:"Delete",deleteConfirmNo:"Cancel",deletePending:"Deleting…",deleteErrorBusy:"This session is running and could not be stopped. Try again later.",deleteErrorNotFound:"The session does not exist or was already deleted.",deleteErrorResolve:"Could not identify the session to delete. Please try again.",deleteErrorGeneric:"Delete failed: {message}"};var qn="[data-composer-card], [data-composer-input], [contenteditable], input, textarea, button";function Wn(e){let t=e.matches;if(typeof t=="function"&&t.call(e,qn))return!0;let a=e.querySelector;return typeof a=="function"&&a.call(e,qn)!==null}function Vn(e){let t=e.querySelectorAll;if(typeof t!="function"||typeof getComputedStyle!="function")return/\d\s*%/.test(e.textContent??"");for(let a of t.call(e,"svg circle")){let n=getComputedStyle(a).strokeDasharray;if(n!==""&&n!=="none"&&!/^(0px?)(\s+0px?)*$/.test(n))return!0}return!1}function es(e,t){return e.contains(t)||Wn(e)?!1:Vn(e)}function ba(e){let t=e.closest("[data-composer-dock]");if(t!==null){let n=[...t.children].filter(i=>!i.contains(e)&&!Wn(i)&&!i.hasAttribute("data-mobile-nav")),o=n.find(Vn)??(n.length===1?n[0]:void 0);if(o!==void 0)return{dock:t,ring:o}}let a=e.closest('[class*="_composerStack"]');for(let n=e.parentElement;n!==null;n=n.parentElement){let o=[...n.children].find(i=>es(i,e));if(o!==void 0)return{dock:n,ring:o};if(n===a)break}return null}function ts(e){return e===null||!e.isConnected||e.closest("[data-phase]")===null?!1:e.closest('[class*="_composerStack"]')!==null}var as=/^TPS\s+\d/,ns=/TPS\s+\d/,os=e=>{for(let[t,a]of e.entries())if(as.test((a.textContent??"").trim())&&!(a.children.length>0)&&a.parentElement!==null)return{index:t,mark:a.getAttribute("data-mobile-nav")!=="stats-tps"};return{index:-1,mark:!1}};function is(e,t,a,n){return e!==null?{el:e.el,reserve:e.reserve,live:t}:ns.test(a())?n():null}function rs(e,t,a,n){return e?t:a&&n}function Gn(){let e=(h,T)=>{getComputedStyle(h).position==="static"&&h.setAttribute("data-mobile-nav",T)},t=h=>{for(let T=h.parentElement;T!==null;T=T.parentElement)if(getComputedStyle(T).position!=="static")return T;return null},a=(h,T)=>{let f=t(h);if(f===null)return null;let M=T.getBoundingClientRect(),O=f.getBoundingClientRect(),P=h.getBoundingClientRect();return{host:h,left:M.left-O.left-f.clientLeft,top:M.top-O.top-f.clientTop-(P.height-M.height)/2}},n=h=>{let T=h.host;T.style.left!==`${h.left}px`&&(T.style.left=`${h.left}px`),T.style.top!==`${h.top}px`&&(T.style.top=`${h.top}px`)},o=h=>{let T=h.closest('[class*="_composerStack"]');if(T===null)return null;let f=h.querySelector(':scope > [data-mobile-nav="stats-tps-reserve"]'),M=[...T.querySelectorAll("div")],O=os(M);if(O.index<0)return null;let P=M[O.index];if(P===void 0)return null;f===null&&(f=document.createElement("span"),f.setAttribute("data-mobile-nav","stats-tps-reserve"),f.setAttribute("aria-hidden","true"),h.appendChild(f));let H=P.textContent??"";f.textContent!==H&&(f.textContent=H),O.mark&&P.setAttribute("data-mobile-nav","stats-tps");let B=P.parentElement;return B===null?null:(e(B,"stats-tps-row"),{el:P,reserve:f,live:H})},i=h=>{let{el:T,reserve:f}=h,M=a(T,f);return{el:T,measured:M,width:f.getBoundingClientRect().width}},r=h=>{h.measured!==null&&n(h.measured);let T=h.el,f=`${h.width}px`;T.style.maxWidth!==f&&(T.style.maxWidth=f)},p=h=>{let T=ba(h);if(T===null)return null;let{dock:f,ring:M}=T,O=document.querySelector('[data-composer-card] [class*="_row"] [class*="_trailing"]');if(O===null)return null;let P=O.querySelector(':scope > [data-mobile-nav="stats-ring-reserve"]'),H=O.querySelector(':scope > [class*="_primary"]');return P===null?(P=document.createElement("span"),P.setAttribute("data-mobile-nav","stats-ring-reserve"),O.insertBefore(P,H)):(H===null?O.lastElementChild!==P:P.nextElementSibling!==H)&&O.insertBefore(P,H),M.getAttribute("data-mobile-nav")!=="stats-ring"&&M.setAttribute("data-mobile-nav","stats-ring"),e(f,"stats-ring-dock"),{ring:M,reserve:P,measured:a(M,P)}},b=h=>{let T=o(h);T!==null&&r(i(T))},w=h=>{let T=p(h);T!==null&&T.measured!==null&&n(T.measured)},s=null,l=0,m="",k=h=>{if(h===null)return"none";let T=h.getBoundingClientRect();return`${Math.round(T.left)}:${Math.round(T.top)}:${Math.round(T.width)}`},v=()=>{let h=document.querySelector('[data-mobile-nav="stats"]');if(h===null)return;let T=h.getBoundingClientRect(),f=`${Math.round(T.left)}:${Math.round(T.top)}:${Math.round(T.width)}:${Math.round(T.height)}|${k(document.querySelector('[data-mobile-nav="stats-ring-reserve"]'))}`;if(f===m)return;m=f;let M=o(h),O=M===null?null:i(M),P=p(h);O!==null&&r(O),P!==null&&P.measured!==null&&n(P.measured)},A=()=>{l===0&&(l=requestAnimationFrame(()=>{l=0,v()}))},u="",g=null,L=null,S=null,E=null,_=null,c=(h,T)=>h!==null&&h.isConnected&&h.getAttribute("data-mobile-nav")===T,d=h=>{let T=ba(h);return T===null?!1:T.ring===S};return{name:"stats-line",scopes:["*",fa],ensure:()=>{s===null&&(s=A,window.addEventListener("resize",A),window.visualViewport?.addEventListener("resize",A));let h=_;if((h===null||!h.isConnected||!h.matches('[data-mobile-nav="stats"]'))&&(h=_=document.querySelector('[data-mobile-nav="stats"]')),h!==null&&ts(h)){let f=h.getBoundingClientRect(),M=`${Math.round(f.left)}:${Math.round(f.top)}:${Math.round(f.width)}:${Math.round(f.height)}`,O=c(g,"stats-tps"),P=c(L,"stats-tps-reserve"),H=O&&P&&g!==null&&L!==null?{el:g,reserve:L,live:""}:null,B=h.closest('[class*="_composerStack"]'),j=is(H,g?.textContent??"",()=>B?.textContent??"",()=>o(h)),W=`${M}|${j===null?"none":j.live}|${k(E)}`,U=rs(j===null,g===null&&L===null,c(g,"stats-tps"),c(L,"stats-tps-reserve"));if(W===u&&U&&c(S,"stats-ring")&&d(h)&&c(E,"stats-ring-reserve"))return;u=W;let ee=j!==null&&j.el===g?o(h):j,N=ee===null?null:i(ee),F=p(h);N!==null&&r(N),F!==null&&F.measured!==null&&n(F.measured),g=ee===null?null:ee.el,L=ee===null?null:ee.reserve,S=F===null?null:F.ring,E=F===null?null:F.reserve,u=`${M}|${j===null?"none":j.live}|${k(E)}`;return}h?.removeAttribute("data-mobile-nav");let T=document.querySelector('[class*="_composerStack"]');if(T!==null)for(let f of['[class*="_root"]',"[data-slot]"])for(let M of T.querySelectorAll(f)){if(M.matches('[data-testid="todo-panel"]'))continue;let O=M.querySelectorAll("button");if(O.length>0&&![...O].every(H=>H.getAttribute("aria-haspopup")!==null))continue;let P=M.textContent??"";if(/(turns|steps|\bLLM\b|轮|步)/.test(P)&&M.querySelector("textarea, [data-composer-input]")===null){M.setAttribute("data-mobile-nav","stats"),b(M),w(M);return}}},dispose:()=>{l!==0&&(cancelAnimationFrame(l),l=0),m="",_=null,s!==null&&(window.removeEventListener("resize",s),window.visualViewport?.removeEventListener("resize",s),s=null);for(let h of document.querySelectorAll('[data-mobile-nav="stats-ring"], [data-mobile-nav="stats-tps"]')){let T=h;T.style.left="",T.style.top="",T.style.maxWidth=""}for(let h of["stats","stats-ring","stats-ring-dock","stats-tps","stats-tps-row"])for(let T of document.querySelectorAll(`[data-mobile-nav="${h}"]`))T.removeAttribute("data-mobile-nav");for(let h of document.querySelectorAll('[data-mobile-nav="stats-ring-reserve"], [data-mobile-nav="stats-tps-reserve"]'))h.remove()}}}function wa(){ga?.()}var ga=null,ss=200,ls='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="18" height="18"><path d="M9.8 3.4 5.2 8l4.6 4.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',ds='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="18" height="18"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.67272 0.522841C10.8339 0.522841 11.76 0.522714 12.4963 0.602493C13.2453 0.683657 13.8789 0.854248 14.4264 1.25197C14.7504 1.48739 15.0355 1.77247 15.2709 2.0965C15.6686 2.64394 15.8392 3.27758 15.9204 4.02655C16.0002 4.7629 16 5.68895 16 6.85014V9.14986C16 10.3111 16.0002 11.2371 15.9204 11.9735C15.8392 12.7224 15.6686 13.3561 15.2709 13.9035C15.0355 14.2275 14.7504 14.5126 14.4264 14.748C13.8789 15.1458 13.2453 15.3163 12.4963 15.3975C11.76 15.4773 10.8339 15.4772 9.67272 15.4772H6.3273C5.16611 15.4772 4.24006 15.4773 3.50371 15.3975C2.75474 15.3163 2.1211 15.1458 1.57366 14.748C1.24963 14.5126 0.964549 14.2275 0.729131 13.9035C0.331407 13.3561 0.160817 12.7224 0.0796529 11.9735C-0.000126137 11.2371 1.25338e-09 10.3111 1.25338e-09 9.14986V6.85014C1.25329e-09 5.68895 -0.000126137 4.7629 0.0796529 4.02655C0.160817 3.27758 0.331407 2.64394 0.729131 2.0965C0.964549 1.77247 1.24963 1.48739 1.57366 1.25197C2.1211 0.854248 2.75474 0.683657 3.50371 0.602493C4.24006 0.522714 5.16611 0.522841 6.3273 0.522841H9.67272ZM5.54303 1.88715V14.1118C5.78636 14.1128 6.04709 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C6.04709 1.88307 5.78636 1.8862 5.54303 1.88715ZM4.1828 1.91166C3.99125 1.9216 3.8148 1.93577 3.65076 1.95353C3.01764 2.02212 2.65034 2.1506 2.37325 2.35179C2.16463 2.50337 1.98052 2.68747 1.82895 2.89609C1.62776 3.17318 1.49928 3.54048 1.43069 4.1736C1.36074 4.81967 1.36023 5.65896 1.36023 6.85014V9.14986C1.36023 10.341 1.36074 11.1803 1.43069 11.8264C1.49928 12.4595 1.62776 12.8268 1.82895 13.1039C1.98052 13.3125 2.16463 13.4966 2.37325 13.6482C2.65034 13.8494 3.01764 13.9779 3.65076 14.0465C4.29683 14.1164 5.13612 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C5.13612 1.88307 4.29683 1.88358 3.65076 1.95353C3.47672 1.97129 3.30027 1.98546 3.10872 1.9954L4.1828 1.91166Z" fill="currentColor"/></svg>';function jn(e,t,a){let n=null,o=null,i=null,r=!1,p=()=>{let m=q();return m===null?!1:!m.hasAttribute("data-sidebar-collapsed")},b=null,w=()=>{let m=b;return m!==null&&m.isConnected&&m.matches('[data-phase="active"]')?!1:(b=document.querySelector('[data-phase="active"]'),b===null)},s=m=>{if(a!==null&&a.panelOpen()){m.preventDefault(),m.stopPropagation(),a.back();return}t()},l=()=>{if(o===null)return;let m=a!==null&&a.panelOpen(),k=m&&a!==null&&a.subpageOpen(),v=k?"back-level":m?"exit-panel":"open-drawer";if(o.dataset.mobileNavFabMode===v)return;o.dataset.mobileNavFabMode=v;let A=e(k?"back":m?"backToConversation":"open");o.setAttribute("aria-label",A),o.title=A,o.innerHTML=m?ls:ds};return{name:"overlay-backdrop-fab",scopes:["*","data-sidebar-collapsed","data-phase"],ensure:()=>{ga=()=>{n!==null&&(r=!0,n.style.pointerEvents="none",n.style.opacity="0")};let m=q();if(m===null){i!==null&&(window.clearTimeout(i),i=null),n?.remove(),n=null,o?.remove(),o=null;return}p()?n===null?(n=document.createElement("div"),n.dataset.mobileNav="backdrop",n.setAttribute("role","button"),n.setAttribute("aria-label",e("backdrop")),m.appendChild(n),r=!1):r&&i!==null&&(window.clearTimeout(i),i=null,r=!1,n.style.removeProperty("pointer-events"),n.style.removeProperty("opacity")):n!==null&&(n.style.pointerEvents="none",n.style.opacity="0",r=!0,i===null&&(i=window.setTimeout(()=>{i=null,n?.remove(),n=null},ss+60))),w()&&!p()&&o===null?(o=document.createElement("button"),o.type="button",o.dataset.mobileNav="fab",o.setAttribute("aria-label",e("open")),o.title=e("open"),o.addEventListener("click",s),m.appendChild(o)):(!w()||p())&&o!==null&&(o.remove(),o=null),l()},dispose:()=>{i!==null&&(window.clearTimeout(i),i=null),ga=null,b=null,n?.remove(),n=null,o?.remove(),o=null}}}function Kn(){let e=null,t=null;return{name:"file-viewer-open-marker",scopes:["*"],ensure:()=>{let a=q();if(a===null)return;let n=document.querySelector(".dsfv-panel")!==null;n===e&&a===t||(e=n,t=a,n?a.setAttribute("data-file-viewer-open",""):a.hasAttribute("data-file-viewer-open")&&a.removeAttribute("data-file-viewer-open"))},dispose:()=>{e=null,t=null,q()?.removeAttribute("data-file-viewer-open")}}}function re(e){if(typeof e!="object"||e===null)return;let t=e;if(typeof t.current=="string")return t.current;for(let a in t.byId){let n=t.byId[a];if(n===void 0)continue;let o=n.retainedBy?.mainView;if(typeof o=="number"&&o>0&&typeof n.id=="string")return n.id}}function Un(e){return typeof e?.clear=="function"}function $n(e){return typeof e?.open=="function"}var cs=4,ps=350;async function Xn(e){let t=e.attempts??cs,a=e.intervalMs??ps;for(let n=0;n<t;n+=1){try{await e.refresh?.()}catch{}if(!e.listed())return!0;n+1<t&&await e.sleep(a)}return!e.listed()}var Zn='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.95317V10.0469" stroke="currentColor" stroke-width="1"/><path d="M4.25 6.29688L8 10.0469L11.75 6.29688" stroke="currentColor" stroke-width="1"/><path d="M1.5 10.0469V13.158C1.5 13.3937 1.60536 13.6198 1.79289 13.7865C1.98043 13.9532 2.23478 14.0469 2.5 14.0469H13.5C13.7652 14.0469 14.0196 13.9532 14.2071 13.7865C14.3946 13.6198 14.5 13.3937 14.5 13.158V10.0469" stroke="currentColor" stroke-width="1"/></svg>',hs='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1"/><path d="M8 4.6V8l2.2 1.6" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>';function Yn(e){let t=e.locale.bind(Q),a=()=>re(e.sessions.list.getSnapshot()),n=null,o=null,i=null,r=null,p=null,b=null,w=null,s=null,l=null,m=()=>{r?.remove(),r=null,p=null,b!==null&&document.removeEventListener("pointerdown",b,!0),b=null,w!==null&&document.removeEventListener("keydown",w,!0),w=null,s?.disconnect(),s=null,l!==null&&(window.removeEventListener("resize",l),window.removeEventListener("orientationchange",l)),l=null,o?.setAttribute("aria-expanded","false")},k=()=>{if(r===null||o===null)return;let S=o.getBoundingClientRect();r.style.top=`${Math.round(S.bottom+4)}px`,r.style.right=`${Math.round(window.innerWidth-S.right)}px`},v=(S,E,_)=>{let c=document.createElement("button");c.type="button",c.setAttribute("role","menuitem"),c.dataset.mobileNav=E,c.innerHTML=_;let d=document.createElement("span");return d.textContent=S,c.appendChild(d),c},A=()=>{if(o===null)return;if(r!==null){m();return}let S=document.createElement("div");S.dataset.mobileNav="session-log-menu",S.setAttribute("role","menu"),S.setAttribute("aria-label",t("downloadMenu"));let E=v(t("sessionLog"),"session-log-export",Zn);E.disabled=a()===void 0,E.addEventListener("click",()=>{let d=a();m(),d!==void 0&&e.sessionLogDownload.download(d)}),S.appendChild(E),p=E;let _=window.DSHA;if(typeof _?.openDownloads=="function"){let d=v(t("downloads"),"session-log-downloads",hs);d.addEventListener("click",()=>{let C=_?.openDownloads?.();m(),C!==void 0&&C.catch(()=>{})}),S.appendChild(d)}document.body.appendChild(S),r=S,k(),o.setAttribute("aria-expanded","true"),b=d=>{let C=d.target;C instanceof Node&&(S.contains(C)||o!==null&&(C===o||o.contains(C))||m())},document.addEventListener("pointerdown",b,!0),w=d=>{d.key==="Escape"&&(d.preventDefault(),m())},document.addEventListener("keydown",w,!0);let c=q();c!==null&&(s=new MutationObserver(()=>{c.hasAttribute("data-sidebar-collapsed")&&m()}),s.observe(c,{attributes:!0,attributeFilter:["data-sidebar-collapsed"]})),l=()=>{k()},window.addEventListener("resize",l),window.addEventListener("orientationchange",l),window.setTimeout(()=>{E.focus({preventScroll:!0})},0)},u=()=>{p!==null&&(p.disabled=a()===void 0)},g=()=>{let S=q();return S===null?null:S.querySelector('[class*="sidebarCol"] [class*="logoRow"]')??S.querySelector('[class*="logoRow"]')},L=(S,E)=>{E.parentElement!==S&&S.appendChild(E)};return{name:"drawer-session-log",scopes:["*"],ensure:()=>{let S=g();S!==null&&(o===null&&(n=document.createElement("span"),n.dataset.mobileNav="session-log-wrap",o=document.createElement("button"),o.type="button",o.dataset.mobileNav="session-log",o.setAttribute("aria-haspopup","menu"),o.setAttribute("aria-expanded","false"),o.setAttribute("aria-label",t("downloadMenu")),o.title=t("downloadMenu"),o.innerHTML=Zn,o.addEventListener("click",A),n.appendChild(o),i=e.sessions.list.subscribe(()=>{u()})),n!==null&&L(S,n),u())},dispose:()=>{m(),i?.(),i=null,n?.remove(),n=null,o=null}}}var us='<svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true" stroke-width="1.3"><path d="M8 9.75012C8.9665 9.75012 9.75 8.96662 9.75 8.00012C9.75 7.03362 8.9665 6.25012 8 6.25012C7.0335 6.25012 6.25 7.03362 6.25 8.00012C6.25 8.96662 7.0335 9.75012 8 9.75012Z" stroke="currentColor"/><path d="M13.0107 7.79377C12.9505 7.89401 12.9205 7.94413 12.9205 7.99951C12.9205 8.0549 12.9505 8.10502 13.0106 8.20528L13.9849 9.83006C14.045 9.93029 14.0751 9.9804 14.0751 10.0358C14.0751 10.0911 14.045 10.1413 13.9849 10.2415L13.0037 11.8777C12.9468 11.9726 12.9184 12.0201 12.8725 12.0461C12.8267 12.072 12.7713 12.072 12.6607 12.072H10.6704C10.5598 12.072 10.5045 12.072 10.4586 12.098C10.4128 12.1239 10.3843 12.1714 10.3274 12.2662L9.33825 13.9142C9.28133 14.009 9.25287 14.0564 9.20703 14.0823C9.16118 14.1083 9.10588 14.1083 8.99529 14.1083H7.00486C6.89426 14.1083 6.83896 14.1083 6.79312 14.0823C6.74727 14.0564 6.71881 14.009 6.6619 13.9142L5.67273 12.2662C5.61581 12.1714 5.58735 12.1239 5.54151 12.098C5.49566 12.072 5.44036 12.072 5.32977 12.072H3.33945C3.2288 12.072 3.17347 12.072 3.12761 12.0461C3.08176 12.0201 3.0533 11.9726 2.9964 11.8777L2.0152 10.2415C1.9551 10.1413 1.92505 10.0911 1.92505 10.0358C1.92505 9.9804 1.9551 9.93029 2.0152 9.83006L2.98951 8.20528C3.04963 8.10502 3.07969 8.0549 3.07969 7.99951C3.07968 7.94413 3.04961 7.89401 2.98946 7.79377L2.01529 6.17011C1.95514 6.06987 1.92507 6.01975 1.92507 5.96437C1.92506 5.90899 1.95512 5.85886 2.01524 5.7586L2.9964 4.1224C3.0533 4.0275 3.08176 3.98005 3.12761 3.95408C3.17347 3.92811 3.2288 3.92811 3.33945 3.92811H5.32977C5.44036 3.92811 5.49566 3.92811 5.54151 3.90216C5.58735 3.87621 5.61581 3.82879 5.67273 3.73397L6.6619 2.08599C6.71881 1.99116 6.74727 1.94375 6.79312 1.9178C6.83896 1.89185 6.89426 1.89185 7.00486 1.89185H8.99529C9.10588 1.89185 9.16118 1.89185 9.20703 1.9178C9.25287 1.94375 9.28133 1.99116 9.33825 2.08599L10.3274 3.73397C10.3843 3.82879 10.4128 3.87621 10.4586 3.90216C10.5045 3.92811 10.5598 3.92811 10.6704 3.92811H12.6607C12.7713 3.92811 12.8267 3.92811 12.8725 3.95408C12.9184 3.98005 12.9468 4.0275 13.0037 4.1224L13.9849 5.7586C14.045 5.85886 14.0751 5.90899 14.0751 5.96437C14.0751 6.01975 14.045 6.06987 13.9849 6.17011L13.0107 7.79377Z" stroke="currentColor" stroke-miterlimit="10"/></svg>',ms='[class*="sidebarCol"] [class*="triggerRow"]',Qn='button[aria-haspopup="menu"]',fs=400,At="data-mobile-nav-quick-menu",bs="[data-mobile-nav-quick-menu]";function Lt(e){let t=e.locale.bind(Q),a=null,n=null,o=null,i=()=>{let k=q();return k===null?null:k.querySelector(ms)},r=()=>{o!==null&&(window.clearTimeout(o),o=null)},p=k=>{let v=document.documentElement;v.setAttribute("data-mobile-nav-quick","");let A=!1,u=()=>{A||(A=!0,r(),v.removeAttribute("data-mobile-nav-quick"))},g=()=>k.getAttribute("aria-expanded")==="true";g()||k.click(),requestAnimationFrame(()=>{let L=document.querySelectorAll('[role="menu"]'),E=(g()&&L.length>0?L[L.length-1]:null)?.querySelector('[role="menuitem"]')??null;if(E===null){g()&&k.click(),u();return}E.click(),o=window.setTimeout(()=>{g()&&k.click(),u()},fs)})},b=()=>{let k=i();if(k===null)return;let v=k.querySelector(Qn);v!==null&&p(v)},w=()=>{a=document.createElement("span"),a.dataset.mobileNav="quick-settings-wrap",n=document.createElement("button"),n.type="button",n.dataset.mobileNav="quick-settings",n.setAttribute("aria-label",t("quickSettings")),n.setAttribute("aria-haspopup","dialog"),n.title=t("quickSettings"),n.innerHTML=us,n.addEventListener("click",b),a.appendChild(n)},s=k=>![...k.children].some(v=>v.getAttribute("data-phase")!==null||v.getAttribute("role")==="status"),l=()=>{for(let k of document.querySelectorAll(bs))k.removeAttribute(At)},m=k=>{let v=document.querySelectorAll('[role="menu"]'),A=v.length>0?v[v.length-1]??null:null;if(A===null)return;let u=k.querySelector(Qn);if(!(u!==null&&u.getAttribute("aria-expanded")==="true"&&s(k))){A.removeAttribute(At);return}A.hasAttribute(At)||A.setAttribute(At,"")};return{name:"drawer-quick-settings",scopes:["*"],ensure:()=>{let k=i();k!==null&&((n===null||a===null)&&w(),a!==null&&a.parentElement!==k&&k.appendChild(a),m(k))},dispose:()=>{r(),document.documentElement.removeAttribute("data-mobile-nav-quick"),l(),a?.remove(),a=null,n=null}}}function Jn(e){return Number.isNaN(e)?1:Math.min(4,Math.max(1,e))}function he(){return{scale:1,x:0,y:0}}function eo(e,t,a){if(!Number.isFinite(t)||t<=0)return{...e};if(!(e.scale>0))return he();let n=Jn(e.scale*t);if(n===1)return he();let o=n/e.scale;return{scale:n,x:a.x-(a.x-e.x)*o,y:a.y-(a.y-e.y)*o}}function Mt(e,t){let a=Jn(e.scale);if(a===1)return he();let n=Number.isFinite(t.width)&&t.width>0?t.width:0,o=Number.isFinite(t.height)&&t.height>0?t.height:0,i=(a-1)*n/2,r=(a-1)*o/2,p=Number.isFinite(e.x)?Math.min(i,Math.max(-i,e.x)):0,b=Number.isFinite(e.y)?Math.min(r,Math.max(-r,e.y)):0;return{scale:a,x:p,y:b}}function to(e,t){let a=Math.hypot(e.x,e.y),n=Math.hypot(t.x,t.y);return a===0||!Number.isFinite(a)||!Number.isFinite(n)?1:n/a}function ao(e){return e.scale<=1?{scale:2.5,x:0,y:0}:he()}function no(){let e=null,t=null,a=he(),n=new Map,o=null,i=null,r=null,p=()=>({width:window.innerWidth,height:window.innerHeight}),b=()=>{for(let _ of document.body.querySelectorAll(':scope > [role="dialog"][aria-modal="true"]')){if(!(_ instanceof HTMLElement))continue;let c=_.querySelector(":scope > :first-child > img");if(c instanceof HTMLImageElement)return{root:_,image:c}}return null},w=()=>{t!==null&&(t.style.transform="",t.style.transformOrigin="",t.style.willChange="",t=null)},s=()=>{e!==null&&(e.removeEventListener("pointerdown",v),e.removeEventListener("pointermove",A),e.removeEventListener("pointerup",u),e.removeEventListener("pointercancel",g),e.removeEventListener("gesturestart",L),e.removeEventListener("touchmove",S),e.getAttribute("data-mobile-nav")==="image-lightbox"&&e.removeAttribute("data-mobile-nav")),w(),n.clear(),o=null,i=null,r=null,a=he(),e=null},l=()=>{if(t===null)return{x:0,y:0};let _=t.getBoundingClientRect();return{x:_.left+_.width/2-a.x,y:_.top+_.height/2-a.y}},m=()=>{t!==null&&(t.style.transform="translate3d("+a.x+"px, "+a.y+"px, 0) scale("+a.scale+")")},k=()=>{let _=[...n.values()],c=_[0],d=_[1];if(c===void 0||d===void 0)return;let C={x:(c.x+d.x)/2,y:(c.y+d.y)/2},h=l();i={startSpan:{x:d.x-c.x,y:d.y-c.y},startMid:C,startZoom:{...a},anchor:{x:C.x-h.x,y:C.y-h.y}},o=null},v=_=>{if(_.pointerType!=="mouse"){if(n.set(_.pointerId,{x:_.clientX,y:_.clientY}),n.size>=2){k();return}o={pointerId:_.pointerId,startX:_.clientX,startY:_.clientY,originX:a.x,originY:a.y,moved:!1,startedOnImage:_.target===t}}},A=_=>{if(!n.has(_.pointerId))return;let c={x:_.clientX,y:_.clientY};if(n.set(_.pointerId,c),n.size>=2){if(i===null){k();return}let h=[...n.values()],T=h[0],f=h[1];if(T===void 0||f===void 0)return;let M={x:(T.x+f.x)/2,y:(T.y+f.y)/2},O=to(i.startSpan,{x:f.x-T.x,y:f.y-T.y}),P=eo(i.startZoom,O,i.anchor);a=Mt({scale:P.scale,x:P.x+(M.x-i.startMid.x),y:P.y+(M.y-i.startMid.y)},p()),m();return}if(o===null||o.pointerId!==_.pointerId||!o.startedOnImage)return;let d=c.x-o.startX,C=c.y-o.startY;(Math.abs(d)>4||Math.abs(C)>4)&&(o.moved=!0),a=Mt({scale:a.scale,x:o.originX+d,y:o.originY+C},p()),m()},u=_=>{if(!n.delete(_.pointerId))return;if(n.size>=2){k();return}if(n.size===1){let C=[...n.entries()][0];if(i=null,o=null,C!==void 0){let[h,T]=C;o={pointerId:h,startX:T.x,startY:T.y,originX:a.x,originY:a.y,moved:!0,startedOnImage:!0}}return}let c=o;if(o=null,i=null,c===null||c.pointerId!==_.pointerId||!c.startedOnImage||c.moved){r=null;return}let d=Date.now();if(r!==null&&d-r.at<=320&&Math.hypot(_.clientX-r.x,_.clientY-r.y)<=28){a=Mt(ao(a),p()),r=null,m();return}r={at:d,x:_.clientX,y:_.clientY}},g=_=>{n.delete(_.pointerId),n.size<2&&(i=null),n.size===0&&(o=null,r=null)},L=_=>{_.preventDefault()},S=_=>{_.touches.length>1&&_.preventDefault()},E=(_,c)=>{e=_,t=c,a=he(),n.clear(),o=null,i=null,r=null,e.setAttribute("data-mobile-nav","image-lightbox"),t.style.transformOrigin="50% 50%",t.style.willChange="transform",e.addEventListener("pointerdown",v),e.addEventListener("pointermove",A),e.addEventListener("pointerup",u),e.addEventListener("pointercancel",g),e.addEventListener("gesturestart",L),e.addEventListener("touchmove",S,{passive:!1})};return{name:"image-lightbox-zoom",scopes:["*"],ensure:()=>{let _=b();if(_===null){s();return}if(e===_.root){t!==_.image&&(w(),t=_.image,a=he(),t.style.transformOrigin="50% 50%",t.style.willChange="transform");return}s(),E(_.root,_.image)},dispose:()=>{s()}}}var Ve=new WeakMap,va=!1;function xa(){va=!0}function ya(){va=!1}function ka(){return va}function Rt(e){return typeof e=="object"&&e!==null&&"parentElement"in e&&e.parentElement!==void 0}function oo(e,t,a){let n=performance.now()+t;if(!Rt(e)){if(typeof e!="object"&&typeof e!="function"||e===null)return;Ve.set(e,n);return}let o=e;for(;o!==null&&(Ve.set(o,n),o!==a);)o=Rt(o.parentElement)?o.parentElement:null}function st(e){let t=performance.now(),a=e.target;if(!Rt(a)){if(typeof a!="object"&&typeof a!="function"||a===null)return!1;let o=Ve.get(a);return o===void 0?!1:o<=t?(Ve.delete(a),!1):!0}let n=a;for(;n!==null;){let o=Ve.get(n);if(o!==void 0)if(o<=t)Ve.delete(n);else return!0;n=Rt(n.parentElement)?n.parentElement:null}return!1}var gs=["node","session","summary","result"],ws=["sessionId","id"],vs=["__reactFiber$","__reactInternalInstance$"];function xs(e){if(typeof e!="object"||e===null)return null;let t=e.id;return typeof t=="string"?t:null}function ys(e,t){if(e==null)return null;for(let a of gs){let n=xs(e[a]);if(n!==null&&t(n))return n}for(let a of ws){let n=e[a];if(typeof n=="string"&&t(n))return n}return null}function Pt(e,t,a=60){let n=e;for(let o=0;o<a&&n!==null&&n!==void 0;o+=1){let i=ys(n.memoizedProps,t);if(i!==null)return i;n=n.return}return null}function Ot(e){if(e==null||typeof e!="object")return null;let t=e;for(let a of vs)for(let n of Object.keys(t)){if(!n.startsWith(a))continue;let o=t[n];if(typeof o=="object"&&o!==null)return o}return null}function Ea(e,t,a){return Math.abs(t.x-e.x)<=a&&Math.abs(t.y-e.y)<=a}var ks=.45;function Es(e,t=ks){return Math.round(e*t)}var Ta=8,Ts=.16,io=.13,uo=60,_s=.45,Ss=.45,Me=350,Cs=300,mo=8,Pe=110,ro=280,so=101,As=.45,Ls=.16,Ms=.45,xe=0,Oe=!1,ye=[],ct=0,Sa=0,Ie=!1,ke=0,dt=null,J=null,Ne=!1,fo=0,Re=!1,me=!1,pt=!1,ue="drawer",Ca=!1,bo=()=>!1;function Rs(e,t,a){let n=a?-t.dx:t.dx;if(Math.abs(n)<=e.lockPx||Math.abs(n)<=Math.abs(t.dy))return"none";if(e.drawerOpen){if(Math.abs(n)/e.viewportWidthPx>=e.closeDistanceRatio)return"close";let r=a?-t.velX:t.velX;return r>0!=n>0?"none":Math.abs(r)>=e.closeVelocity?"close":"none"}return n<=0?"none":n/e.viewportWidthPx>=e.openDistanceRatio||(a?-t.velX:t.velX)>=e.openVelocity?"open":"none"}function Ps(e,t,a){let n=a?-t.dx:t.dx;if(Math.abs(n)<=e.lockPx||Math.abs(n)<=Math.abs(t.dy))return"none";let o=a?-t.velX:t.velX;if(n<0)return e.panelOpen||e.drawerOpen?"none":-n/e.viewportWidthPx>=e.distanceRatio?"files":o>0!=n>0?"none":-o>=e.velocity?"files":"none";if(e.drawerOpen){let i=e.drawerCloseDistanceRatio??e.distanceRatio;return n/e.viewportWidthPx>=i?"close":o<=0?"none":o>=e.velocity?"close":"none"}return e.panelOpen?n/e.viewportWidthPx>=e.distanceRatio?"files":o>0!=n>0?"none":o>=e.velocity?"files":"none":"none"}function Os(e,t,a){let n=a-t,o=e.filter(b=>b.t>=n);if(o.length<2)return 0;let i=o[o.length-2],r=o[o.length-1],p=r.t-i.t;return p<=0?0:(r.x-i.x)/p}function Is(e,t,a,n){let o=a?e:t-e;return o>=0&&o<=n}function Ns(e,t){return e||!t?"drawer":"files"}function Hs(e,t,a,n){let o=e<=0?-1:1,i=Math.abs(e),r=a?-t:t;return n?r>=0?null:o*Math.min(i,-r)+0:r<=0?null:o*(i-Math.min(i,r))+0}function go(e,t){let a=t?-e:e;return a<=0?null:t?`translateX(max(0px, calc(${so}% - ${a}px)))`:`translateX(min(0px, calc(-${so}% + ${a}px)))`}function Fs(e){let t=e;for(;t!==null;){if((t.overflowX==="auto"||t.overflowX==="scroll")&&t.scrollWidth>t.clientWidth+1)return t;t=t.parent}return null}function Ue(){let e=q();return e!==null&&e.firstElementChild instanceof HTMLElement?e.firstElementChild:null}function Aa(){let e=q();return e!==null&&!e.hasAttribute("data-sidebar-collapsed")}function wo(){let e=document.querySelector("[data-sidebar-right-panel]");return e!==null&&e.hasAttribute("data-sidebar-right-open")}function zs(e){let t=null,a=e;for(;a!==null;)t={parent:t,scrollWidth:a.scrollWidth,clientWidth:a.clientWidth,overflowX:getComputedStyle(a).overflowX},a=a.parentElement;return t}function Ft(){return document.querySelector('[aria-modal="true"]')!==null}function La(){return document.documentElement.hasAttribute("data-dsh-taskboard-active")||document.documentElement.hasAttribute("data-dsh-ssh-active")||document.querySelector("[data-conversation-composer-overlay]")!==null}function vo(){if(typeof window>"u")return!1;let e=window.getSelection();if(e!==null&&!e.isCollapsed)return!0;if(typeof document>"u")return!1;let t=document.activeElement;if(t===null)return!1;let a=t.tagName;if(a!=="TEXTAREA"&&a!=="INPUT")return!1;try{let{selectionStart:n,selectionEnd:o}=t;return typeof n=="number"&&typeof o=="number"&&n!==o}catch{return!1}}function xo(){return performance.now()<ke}function yo(e){return document.documentElement.hasAttribute("data-mobile-nav-dragging")||document.body.hasAttribute("data-mobile-nav-dragging")?!0:e.target instanceof Element&&e.target.closest("[data-mobile-nav-dragging]")!==null}var lo=200;function Ds(e){let t=e.closest(".dsh-pet-root");if(t!==null)return t;if(e.closest('[data-mobile-nav="frame"]')!==null)return null;let a=e;for(;a!==null;){if(a instanceof HTMLElement){let n=getComputedStyle(a);if((n.position==="fixed"||n.position==="absolute")&&a.offsetWidth<=lo&&a.offsetHeight<=lo)return a}a=a.parentElement}return null}function ko(e){return e.target instanceof Element&&Ds(e.target)!==null}function co(){J=null,Ne=!1,me=!1,pt=!1,Re=ht();let e=Ue();if(e===null||!Ie)return;J=e;let t=e.getBoundingClientRect().width*Pe/100;fo=Re?t:-t}var _a=!1,Ge=0;function Ma(){if(!_a)return;_a=!1,J?.style.removeProperty("content-visibility");let e=Ue();e!==null&&e!==J&&e.style.removeProperty("content-visibility")}function Bs(e){if(me||pt)return;let t=Ue();if(t===null||Ft()||La()){pt=!0;return}J=t,Ne=!0,t.style.setProperty("transition","none","important");let a=go(1e-4,Re);t.style.setProperty("transform",a??`translateX(-${Pe}%)`,"important"),t.style.willChange="transform",t.style.setProperty("content-visibility","hidden","important"),_a=!0,me=!0,e.layout.toggleSidebar(),Ge=requestAnimationFrame(()=>{Ge=requestAnimationFrame(()=>{Ge=0,Ma()})})}function po(e,t){if(!Oe||ue!=="drawer")return;if(!Ie){let n=Re?-t:t;if(!me&&(n<mo||(Bs(e),!me)))return;let o=go(t,Re);if(o===null){J?.style.setProperty("transform",`translateX(-${Pe}%)`,"important");return}J?.style.setProperty("transform",o,"important");return}if(J===null)return;let a=Hs(fo,t,Re,Ie);if(a===null){Ne=!0,J.style.setProperty("transition","none","important"),J.style.setProperty("transform","translateX(0px)","important");return}Ne=!0,J.style.setProperty("transition","none","important"),J.style.setProperty("transform",`translateX(${a}px)`,"important")}function Ht(){let e=J;!Ne||e===null||(Ne=!1,e.style.removeProperty("transition"),e.style.removeProperty("transform"))}var je=null;function It(){let e=je;if(e===null)return;je=null,window.clearTimeout(e.timer),e.el.style.removeProperty("transition"),e.el.style.removeProperty("transform");let t=q();t!==null&&!t.hasAttribute("data-sidebar-collapsed")&&e.ctx.layout.toggleSidebar()}function Eo(e,t,a){let n=je;if(!(n!==null&&n.el===t&&n.target===a)){if(It(),window.matchMedia("(prefers-reduced-motion: reduce)").matches){wa(),ke=performance.now()+Me,je={el:t,ctx:e,timer:0,target:a},It();return}t.style.setProperty("transition",`transform ${ro}ms ease-in-out`,"important"),t.style.getPropertyValue("transform")!==""&&t.getBoundingClientRect(),t.style.setProperty("transform",a,"important"),wa(),ke=performance.now()+Me,je={el:t,ctx:e,timer:window.setTimeout(It,ro+40),target:a}}}function Nt(e){let t=J;if(J=null,Ne=!1,t===null){Ht(),e.layout.toggleSidebar(),ke=performance.now()+Me;return}let a=Re?`translateX(${Pe}%)`:`translateX(-${Pe}%)`;Eo(e,t,a)}function To(e){if(!Aa()||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return!1;let t=Ue();if(t===null)return!1;let a=ht()?`translateX(${Pe}%)`:`translateX(-${Pe}%)`;return Eo(e,t,a),!0}function Le(e,t=!1){if(je!==null){t&&It();return}let a=me;if(me=!1,pt=!1,Ma(),a&&e!==null&&J!==null&&!t){Ke(),Nt(e);return}Ht(),Ke(),a&&e!==null&&(e.layout.toggleSidebar(),ke=performance.now()+Me)}function qs(e,t,a){if(xo()||Ft()||La()||vo()||yo(e)||ko(e)||!(e.target instanceof Element)||Fs(zs(e.target))!==null||e.target.closest('[class*="_composerSeat"], [data-composer-card], [class*="_dock"]')!==null)return!1;let n=Aa(),o=Es(a,As);if(n){let i=q();if(i===null)return!1;let r=i.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom||e.target.closest('[class*="sessionRow"] button')!==null)return!1;let p=Ue(),b=p===null?null:p.getBoundingClientRect(),w=b!==null&&e.clientX>=b.left&&e.clientX<=b.right;ue=Ns(w,Is(e.clientX,a,t,o))}else wo()?ue="files":ue="pending";return xe=e.pointerId,Oe=!1,ct=e.clientX,Sa=e.clientY,ye=[{t:e.timeStamp,x:e.clientX}],!0}function Ws(e){let t=e.clientX-ct,a=e.clientY-Sa;return Math.max(Math.abs(t),Math.abs(a))<Ta?!1:yo(e)||ko(e)||Math.abs(t)<=Math.abs(a)?(Ke(),!1):(Oe=!0,Ie=Aa(),ue==="pending"&&(ue=t>0!==ht()?"drawer":"files"),ue==="files"?(Ca=wo(),Ie&&co(),xa(),!0):(xa(),co(),!0))}function ho(e){ye.push({t:e.timeStamp,x:e.clientX});let t=e.timeStamp-uo,a=0;for(;a<ye.length-1&&ye[a].t<t;)a+=1;a>0&&(ye=ye.slice(a))}function Vs(e,t,a,n){let o=Oe,i=me;me=!1,pt=!1;let r=ue==="files",p=Ca,b=Os(ye,uo,t.timeStamp),w=t.clientX-ct,s=t.clientY-Sa;if(Ke(),!o){i&&Nt(e);return}let m=Ft()||!i&&xo()?"none":r?Ps({distanceRatio:Ls,velocity:Ms,lockPx:Ta,viewportWidthPx:n,panelOpen:p,drawerOpen:Ie,drawerCloseDistanceRatio:io},{dx:w,dy:s,velX:b},a):Rs({openDistanceRatio:Ts,closeDistanceRatio:io,openVelocity:_s,closeVelocity:Ss,lockPx:Ta,viewportWidthPx:n,drawerOpen:Ie},{dx:w,dy:s,velX:b},a);if(Ma(),i){let k=w>0!==a&&Math.abs(w)>=mo;m==="open"||k?(Ht(),ke=performance.now()+Me):Nt(e),t.target instanceof Element&&lt(t.target);return}if(t.target instanceof Element){if(m==="close"){lt(t.target),Nt(e);return}Ht(),m==="open"&&(lt(t.target),e.layout.toggleSidebar(),ke=performance.now()+Me),m==="files"&&(bo(),lt(t.target),ke=performance.now()+Me),r&&m==="none"&&lt(t.target)}}function lt(e){let t=Ue(),a=t!==null&&t.contains(e)?t:q()??null;oo(e,Cs,a),dt=e}function Ke(){xe=0,Oe=!1,ye=[],ue="drawer",Ca=!1,ya()}function ht(){let e=q();return e!==null&&getComputedStyle(e).direction==="rtl"}function _o(e,t){z(e,"dsh-web-mobile: sidebar swipe gestures",()=>{bo=t;let a=()=>window.innerWidth||document.documentElement.clientWidth||0,n=l=>{if(dt=null,ya(),!(l.pointerType!=="touch"&&l.pointerType!=="pen")){if(xe!==0&&xe!==l.pointerId){Le(e);return}qs(l,ht(),a())}},o=l=>{if(l.pointerId===xe){if(Ft()||La()){Le(e);return}if(Oe)ho(l),po(e,l.clientX-ct);else{if(vo()){Ke();return}Ws(l)&&(ho(l),po(e,l.clientX-ct))}}},i=l=>{l.pointerId===xe&&Vs(e,l,ht(),a())},r=l=>{l.pointerId===xe&&Le(e)},p=l=>{if(dt===null||!(l.target instanceof Element))return;let m=l.target.closest('[data-mobile-nav="backdrop"], [data-mobile-nav="fab"]');m!==null&&!m.contains(dt)||st(l)&&(l.stopPropagation(),l.preventDefault(),dt=null)},b=()=>{document.hidden&&Le(e)},w=l=>{if(xe!==0){if(l.touches.length!==1||!l.cancelable||document.hidden){Le(e);return}Oe&&l.preventDefault()}};document.addEventListener("pointerdown",n,!0),document.addEventListener("pointermove",o,!0),document.addEventListener("pointerup",i,!0),document.addEventListener("pointercancel",r,!0),document.addEventListener("click",p,!0),document.addEventListener("touchmove",w,{capture:!0,passive:!1});let s=()=>Le(e);return document.addEventListener("visibilitychange",b),window.addEventListener("blur",s),()=>{document.removeEventListener("pointerdown",n,!0),document.removeEventListener("pointermove",o,!0),document.removeEventListener("pointerup",i,!0),document.removeEventListener("pointercancel",r,!0),document.removeEventListener("click",p,!0),document.removeEventListener("touchmove",w,{capture:!0}),document.removeEventListener("visibilitychange",b),window.removeEventListener("blur",s),Ge!==0&&(cancelAnimationFrame(Ge),Ge=0),Le(e,!0)}})}var So=12,$e=null,Gs='button[data-dsh-taskboard-entry], button[data-dsh-ssh-entry], [class*="newSession"], [class*="sessionRow"], [class*="searchResultRow"], [class*="searchResultWorkspace"], [class*="panelRow"]';function ut(e){To(e)||e.layout.toggleSidebar()}function Co(e){z(e,"dsh-web-mobile: drawer close (Escape + navigate)",()=>{let t=()=>{ut(e)},a=()=>{let f=q();return f!==null&&!f.hasAttribute("data-sidebar-collapsed")},n=f=>{f.key==="Escape"&&document.querySelector('[aria-modal="true"]')===null&&a()&&t()},o=()=>document.querySelector('[data-mobile-nav="frame"] > :first-child'),i=f=>{if(document.querySelector('[aria-modal="true"]')!==null||!a()||!(f instanceof Element))return!1;let M=o();return M===null||!M.contains(f)||f.closest('[class*="sessionRow"] button')!==null||f.closest('button[class*="panelRow"][aria-haspopup="menu"]')!==null?!1:f.closest(Gs)!==null},r=f=>!(f instanceof Element&&f.closest("[data-dsha-session-select]")!==null)&&i(f),p=0,b="",w=null,s=null,l=f=>{if(!f.isTrusted)return;let M=f.target;M instanceof Element&&M.closest('[class*="sessionRow"] [class*="_title"]')!==null&&(f.preventDefault(),f.stopPropagation())},m=()=>o()?.querySelector('[role="treeitem"][aria-selected="true"]')?.querySelector('[class*="_title"]')?.textContent?.trim()??null,k=()=>{w?.disconnect(),w=null,s!==null&&window.clearTimeout(s),s=null,b=""},v=()=>{k(),b=m()??"";let f=o();f!==null&&(w=new MutationObserver(()=>{if(!a()){k();return}let M=m();M!==null&&M!==b&&(k(),t())}),w.observe(f,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-selected"]}),s=window.setTimeout(k,2e3))},A=f=>e.sessions.list.getSnapshot().byId[f]!==void 0,u=(f,M)=>{if($e===null||!Ea($e,{x:M.clientX,y:M.clientY},So))return null;let O=Pt(Ot(f),A);return O===null||re(e.sessions.list.getSnapshot())===O?null:O},g=null,L=!1,S=0,E=()=>{L=!0,g?.(),g=null,S!==0&&(window.clearTimeout(S),S=0)},_=f=>{E(),L=!1;let M=()=>{L||(E(),a()&&t())};g=e.sessions.list.subscribe(()=>{re(e.sessions.list.getSnapshot())===f&&(S!==0&&window.clearTimeout(S),S=window.setTimeout(()=>{S=0,M()},0))})},c=0,d=f=>{c=performance.now(),$e=f.pointerType==="touch"||f.pointerType==="pen"?{x:f.clientX,y:f.clientY}:null},C=f=>{let M=f.target;if(ka()||st(f))return;if(M instanceof Element&&M.closest('[data-mobile-nav="backdrop"]')!==null){a()&&t();return}let O=M instanceof Element?M.closest('[role="treeitem"][data-dsha-session-select]'):null;if(O!==null&&f.detail>0&&i(M)){if(f.defaultPrevented||$e!==null&&(performance.now()-c>=500||!Ea($e,{x:f.clientX,y:f.clientY},So)))return;f.preventDefault(),f.stopPropagation(),k(),E(),p=performance.now(),O.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,detail:0}));return}performance.now()-p<500||r(M)&&t()},h=f=>{if(ka()||st(f)||f.pointerType!=="touch"&&f.pointerType!=="pen")return;let M=f.target;if(!(M instanceof Element)||!r(M))return;let O=M.closest('[role="treeitem"]');if(O!==null){if(p=performance.now(),O.getAttribute("aria-selected")==="true")t();else{let P=u(O,f);P===null?(E(),v()):(k(),$n(e.sessions)?(_(P),e.sessions.open(P)):(E(),v()))}return}},T=()=>{a()&&t()};return document.addEventListener("dsha-session-open",T),document.addEventListener("dblclick",l,!0),document.addEventListener("keydown",n,!0),document.addEventListener("click",C,!0),document.addEventListener("pointerdown",d,!0),document.addEventListener("pointerup",h,!0),()=>{k(),E(),$e=null,document.removeEventListener("dsha-session-open",T),document.removeEventListener("dblclick",l,!0),document.removeEventListener("keydown",n,!0),document.removeEventListener("click",C,!0),document.removeEventListener("pointerdown",d,!0),document.removeEventListener("pointerup",h,!0)}})}var Ra=!1,Pa=!1,zt=zn({requestFrame:e=>{let t=0;return t=requestAnimationFrame(()=>{t=0,e()}),()=>{t!==0&&cancelAnimationFrame(t)}}});function Ao(e){return Ra?()=>{}:(Ra=!0,z(e,"dsh-web-mobile: DOM reconciler",()=>{let t=new MutationObserver(a=>{let n=new Set;for(let o of a)(o.target instanceof Element?o.target:o.target.parentElement)?.closest("[data-chat-flow]")||n.add(Fn(o));n.size>0&&zt.note(n)});return t.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,characterData:!0,attributeFilter:["style","class","data-phase","data-sidebar-collapsed"]}),zt.activate(),()=>{t.disconnect(),zt.deactivate()}}),()=>{Ra=!1})}function se(e){return zt.register(e)}function Lo(e,t){if(Pa)return()=>{};Pa=!0;let a=e.locale.bind(Q),n=[se(Gn()),se(jn(a,()=>ut(e),t)),se(t.task),se(Kn()),se(Yn(e)),se(Lt(e)),se(no())];return()=>{for(let o of n)o();Pa=!1}}var mt="dsh-mobile-visible-band";function Mo({frameBudgetMs:e=32,stutterLimit:t=3,burstIdleMs:a=240}={}){let n=!0,o=0,i=0;return{noteFrame:s=>{if(!n)return!1;if(o===0||s-o>a)return o=s,i=0,!0;let l=s-o;return o=s,l<=e?(i=0,!0):(i+=1,i>=t&&(n=!1),n)},noteSettled:()=>{o=0,i=0},isLive:()=>n,reset:()=>{n=!0,o=0,i=0}}}var Ro="data-mobile-nav-ios",Oa="width=device-width, initial-scale=1, viewport-fit=cover",Po="--dsh-web-mobile-vh",Ia=()=>document.querySelector('meta[name="viewport"]');function Oo(){let e=null,t=null,a=!1,n=()=>{let p=Ia();p!==null&&(e===null&&(e=p.content),!(a||p.content===Oa)&&(a=!0,p.content=Oa,a=!1))},o=new MutationObserver(n),i=()=>{let p=Ia();p!==t&&(t!==null&&o.disconnect(),t=p,p!==null&&o.observe(p,{attributes:!0,attributeFilter:["content"]}))},r=new MutationObserver(()=>{i(),n()});return r.observe(document.head,{childList:!0}),i(),n(),()=>{o.disconnect(),r.disconnect();let p=Ia();p!==null&&e!==null&&p.content===Oa&&(p.content=e)}}function Io(){let e=document.documentElement,t=0,a=0,n="",o="",i="",r="",p=0,b=0,w=Mo(),s=m=>{o!==m&&(o=m,e.style.setProperty("--dsha-mobile-visible-vh",m))},l=()=>{b=0;let m=window.innerHeight,k=window.innerWidth,v=window.visualViewport,u=`${Math.max(1,Math.min(m,v?.height??m))}px`,g=`${v?.offsetTop??0}px`;e.style.getPropertyValue("--dsha-mobile-viewport-top")!==g&&e.style.setProperty("--dsha-mobile-viewport-top",g),p=u===r?p+1:0,r=u;let L=p>=2;if(w.isLive()?(s(u),L?w.noteSettled():w.noteFrame(performance.now())):L&&s(u),L&&u!==i&&(i=u,document.dispatchEvent(new CustomEvent(mt))),!L&&b===0&&(b=requestAnimationFrame(l)),t===0||m>t||k!==a){t=m,a=k;let S=`${m}px`;S!==n&&(n=S,e.style.setProperty(Po,S))}};return l(),window.addEventListener("resize",l),window.visualViewport?.addEventListener("resize",l),window.visualViewport?.addEventListener("scroll",l),()=>{window.removeEventListener("resize",l),window.visualViewport?.removeEventListener("resize",l),window.visualViewport?.removeEventListener("scroll",l),b!==0&&cancelAnimationFrame(b),b=0,e.style.removeProperty("--dsha-mobile-visible-vh"),e.style.removeProperty("--dsha-mobile-viewport-top"),n="",e.style.removeProperty(Po)}}function No(e){if(!e)return;let t=document.documentElement;return t.setAttribute(Ro,""),()=>{t.removeAttribute(Ro)}}var js='[data-dsh-responsive-part="sidebar-toggle"]:not([data-mobile-nav])',Ho='[data-mobile-nav="dismiss-shadow"]';function Ks(){if(typeof document>"u")return;let e=document.querySelector(Ho),t=document.querySelector(js),a=t?.closest('[data-pane="sidebar"]')??null;if(t===null||a===null){e?.remove();return}if(e!==null&&e.parentElement===a&&a.firstElementChild===e)return;let n=e??document.createElement("span");e===null&&(n.setAttribute("data-mobile-nav","dismiss-shadow"),n.setAttribute("data-dsh-responsive-part","sidebar-toggle"),n.setAttribute("aria-hidden","true"),n.style.setProperty("display","none","important")),a.insertBefore(n,a.firstElementChild)}function Fo(){if(Na)return()=>{};Na=!0;let e=null,t=se({name:"frame-marker",scopes:["*"],ensure:()=>{e=ua(),e!==null&&!e.hasAttribute("data-mobile-nav")&&e.setAttribute("data-mobile-nav","frame"),Ks()},dispose:()=>{e!==null&&e.removeAttribute("data-mobile-nav"),typeof document<"u"&&document.querySelector(Ho)?.remove(),e=null}}),a=se(Hn());return()=>{a(),t(),Na=!1}}var Na=!1;function zo(e){z(e,"dsh-web-mobile: status bar theme + viewport + zoom guard",()=>{let t=document.createElement("meta");t.name="theme-color";let a=()=>getComputedStyle(document.body).backgroundColor,n=typeof CSS<"u"&&typeof CSS.supports=="function"?b=>CSS.supports(b):null;t.content=a(),t.parentElement===null&&document.head.appendChild(t);let o=new MutationObserver(()=>{t.content=a()});o.observe(document.body,{attributes:!0,attributeFilter:["data-ds-dark-theme"]});let i=Oo(),r=No(Ct(navigator,n)),p=Io();return()=>{p(),o.disconnect(),i(),t.remove(),r?.()}})}var Dt="data-mobile-nav-selecting";function Us(){let e=window.getSelection();if(e===null||e.isCollapsed)return!1;let t=e.anchorNode;if(t===null)return!1;let a=t instanceof HTMLElement?t:t.parentElement;return a===null||a.closest("[data-composer-card]")!==null?!1:a.closest("[data-phase]")!==null}function Do(e){z(e,"dsh-web-mobile: selection chrome yield",()=>{if(typeof document>"u")return;let t=document.documentElement,a=()=>{let n=Us();n!==t.hasAttribute(Dt)&&(n?t.setAttribute(Dt,""):t.removeAttribute(Dt))};return document.addEventListener("selectionchange",a),a(),()=>{document.removeEventListener("selectionchange",a),t.removeAttribute(Dt)}})}var Bo='[data-mobile-nav="frame"] button[class*="_trigger"][aria-haspopup="tree"][aria-expanded]:not([class*="_switcherTrigger"])',$s='[class*="ZKlsPq_root"], [class*="ZKlsPq_menu"], [class*="h8S2Va_root"], [class*="h8S2Va_menu"]',Xs=800,Zs=1e3,qo=["mouseover","mouseout","mouseenter","mouseleave","pointerout","pointerleave"];function Wo(e){z(e,"dsh-web-mobile: lineage chip touch toggle",()=>{if(typeof PointerEvent>"u")return;let t=0,a=()=>{t=Date.now()+Xs},n=null,o=0,i=w=>{if(w.pointerType!=="touch"&&w.pointerType!=="pen")return;a();let s=w.target;if(!(s instanceof Element))return;let l=s.closest(Bo);if(l===null)return;let m=l.getAttribute("aria-expanded")==="true";l.dispatchEvent(new KeyboardEvent("keydown",{key:m?"Escape":"ArrowDown",bubbles:!0,cancelable:!0})),n=l,o=Date.now()+Zs},r=w=>{if(n===null)return;if(Date.now()>=o){n=null;return}let s=w.target;s instanceof Element&&s.closest(Bo)===n&&(n=null,w.stopPropagation())},p=w=>{w.pointerType!=="touch"&&w.pointerType!=="pen"||a()},b=w=>{if(Date.now()>=t||!w.isTrusted)return;let s=w.target;s instanceof Element&&s.closest($s)!==null&&w.stopImmediatePropagation()};document.addEventListener("pointerdown",p,!0),document.addEventListener("pointerup",i,!0),document.addEventListener("click",r,!0);for(let w of qo)document.addEventListener(w,b,!0);return()=>{document.removeEventListener("pointerdown",p,!0),document.removeEventListener("pointerup",i,!0),document.removeEventListener("click",r,!0);for(let w of qo)document.removeEventListener(w,b,!0)}})}var Ys="workspace",Qs='data-mobile-nav="session-delete"',Ha="var(--dsw-alias-state-error-primary, #b91c1c)",Js='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.4782 4.84067L14.2138 10.1152C14.1102 12.1872 14.067 13.0115 13.3866 13.9607C13.1044 14.3546 12.7498 14.6912 12.3424 14.9535C11.8239 15.2872 11.2415 15.4316 10.5585 15.4998C9.88727 15.5668 9.04946 15.5656 7.99998 15.5656C6.95051 15.5656 6.1127 15.5668 5.44142 15.4998C4.75851 15.4316 4.17602 15.2872 3.65753 14.9535C3.25012 14.6912 2.89559 14.3546 2.61332 13.9607C1.93296 13.0115 1.88979 12.1872 1.78619 10.1152L1.52179 4.84067L2.89006 4.77277L3.15343 10.0463C3.26221 12.2218 3.32452 12.6015 3.72646 13.1624C3.90825 13.4161 4.13686 13.6334 4.39927 13.8023C4.66204 13.9714 5.00263 14.0792 5.57825 14.1367C6.16562 14.1953 6.92298 14.1963 7.99998 14.1963C9.07699 14.1963 9.83434 14.1953 10.4217 14.1367C10.9973 14.0792 11.3379 14.1367 11.6007 13.8023C11.8631 13.6334 12.0917 13.4161 12.2735 13.1624C12.6755 12.6015 12.7378 12.2218 12.8465 10.0463L13.1099 4.77277L14.4782 4.84067ZM5.43011 6.22849H6.7994V11.3909H5.43011V6.22849ZM9.20056 6.22849H10.5699V11.3909H9.20056V6.22849ZM8.53597 0.434431C9.17976 0.434431 9.6522 0.426926 10.0966 0.571258C10.2357 0.616451 10.3717 0.672554 10.502 0.738948C10.9182 0.951107 11.2464 1.29099 11.7015 1.74612L12.4978 2.54136H15.3742V3.91169H0.625732V2.54136H3.50218L4.29845 1.74612C4.75358 1.29099 5.08174 0.951107 5.49801 0.738948C5.62831 0.672554 5.76425 0.616451 5.90334 0.571258C6.34776 0.426926 6.82021 0.434431 7.46399 0.434431H8.53597ZM7.46399 1.80476C6.73208 1.80476 6.51641 1.81187 6.32617 1.87369C6.25545 1.89667 6.18668 1.92533 6.12041 1.95907C5.96398 2.03878 5.82348 2.16253 5.44142 2.54136H10.5585C10.1765 2.16253 10.036 2.03878 9.87955 1.95907C9.81329 1.92533 9.74452 1.89667 9.6738 1.87369C9.48356 1.81187 9.26789 1.80476 8.53597 1.80476H7.46399Z" fill="currentColor" /></svg>';function He(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Vo(e){z(e,"dsh-web-mobile: session-menu delete",()=>{let t=e.locale.bind(Q),a=(h,T)=>e.locale.bind(Ys)(h,T),n=null,o=0,i=null,r=null,p=0,b=h=>{let T=h.getAttribute("data-row-key")??"";if(T.startsWith("session:")){let M=T.slice(8);if(M!=="")return M}let f=h.getAttribute("data-dsha-session-select");return f!==null&&f!==""?f:Pt(Ot(h),L)},w=h=>(h.querySelector('[class*="_itemLabel"]')??h).textContent?.trim()??"",s=h=>{let T=[...h.querySelectorAll('[role="menuitem"]')].map(w),f=a("rename"),M=a("menu.fork");return T.includes(f)&&T.includes(M)&&T.includes(a("menu.archiveSession"))},l=()=>{r!==null&&(document.removeEventListener("keydown",r,!0),r=null),i!==null&&(i.backdrop.remove(),i.card.remove(),i=null)},m=(h,T)=>{l();let f=document.body,M=document.createElement("div");M.dataset.mobileNav="delete-dialog-backdrop";let O=document.createElement("div");O.dataset.mobileNav="delete-dialog",O.setAttribute("role","dialog"),O.setAttribute("aria-modal","true"),O.innerHTML=`
        <div data-mobile-nav="delete-confirm-title">${He(t("deleteConfirmTitle"))}</div>
        <div data-mobile-nav="delete-confirm-desc">${He(t("deleteConfirmDesc",{title:T}))}</div>
        <div data-mobile-nav="delete-confirm-actions">
          <button type="button" data-mobile-nav="delete-confirm-no">${He(t("deleteConfirmNo"))}</button>
          <button type="button" data-mobile-nav="delete-confirm-yes">${He(t("deleteConfirmYes"))}</button>
        </div>
        <div data-mobile-nav="delete-error" role="alert" hidden></div>`;let P=O.querySelector('[data-mobile-nav="delete-confirm-no"]'),H=O.querySelector('[data-mobile-nav="delete-confirm-yes"]'),B=O.querySelector('[data-mobile-nav="delete-error"]');P?.addEventListener("click",l),M.addEventListener("click",N=>{N.target===M&&l()});let j=N=>{N.key==="Escape"&&l()};document.addEventListener("keydown",j,!0),r=j;let W=()=>{H!==null&&(H.disabled=!1,H.textContent=t("deleteConfirmYes")),P!==null&&(P.disabled=!1)},U=N=>{B!==null&&(B.textContent=N,B.hidden=!1),W()},ee=(N,F)=>{let D=N?.error?.code;if(D==="session-not-found")return t("deleteErrorNotFound");if(D==="session-busy")return t("deleteErrorBusy");let $=N?.error?.message??(F instanceof Error?F.message:String(F));return t("deleteErrorGeneric",{message:$})};H?.addEventListener("click",async()=>{H.disabled=!0,P!==null&&(P.disabled=!0),H.textContent=t("deletePending"),B!==null&&(B.hidden=!0);let N=++p;try{let te=await fetch("/api/mobile-nav.session.delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionId:h})}),ne=await te.json().catch(()=>null);if(!te.ok||ne===null||ne.ok!==!0){U(ee(ne,new Error(`HTTP ${te.status}`)));return}}catch(te){let ne=!1;try{ne=await Xn({listed:()=>e.sessions.list.getSnapshot()?.byId?.[h]!==void 0,refresh:async()=>{await e.sessions.refresh?.()},sleep:xt=>new Promise(aa=>{window.setTimeout(()=>{aa()},xt)})})}catch{ne=!1}if(!ne){U(ee(null,te));return}}let F=re(e.sessions.list.getSnapshot())===h;if(N!==p)return;l(),F&&Un(e.sessions)&&e.sessions.clear();let D=e.sessions;try{await D.refresh?.()}catch(te){console.warn("[dsh-web-mobile] session list refresh after delete failed:",te)}let $=q();$===null||$.hasAttribute("data-sidebar-collapsed")||F&&window.matchMedia(Ae).matches&&ut(e)}),f.appendChild(M),M.appendChild(O),i={backdrop:M,card:O}},k=h=>{l();let T=document.body,f=document.createElement("div");f.dataset.mobileNav="delete-dialog-backdrop";let M=document.createElement("div");M.dataset.mobileNav="delete-dialog",M.setAttribute("role","dialog"),M.setAttribute("aria-modal","true"),M.innerHTML=`
        <div data-mobile-nav="delete-confirm-title">${He(t("deleteSession"))}</div>
        <div data-mobile-nav="delete-error" role="alert">${He(h)}</div>
        <div data-mobile-nav="delete-confirm-actions">
          <button type="button" data-mobile-nav="delete-confirm-no">${He(t("deleteConfirmNo"))}</button>
        </div>`,M.querySelector('[data-mobile-nav="delete-confirm-no"]')?.addEventListener("click",l),f.addEventListener("click",P=>{P.target===f&&l()});let O=P=>{P.key==="Escape"&&l()};document.addEventListener("keydown",O,!0),r=O,T.appendChild(f),f.appendChild(M),i={backdrop:f,card:M}},v=new Set,A=h=>{if(h.querySelector(`[${Qs}]`)!==null)return;let T=h.querySelector('[role="menuitem"]'),f=T?.parentElement??null,M=h.querySelector('[class*="_viewport"]');if(T===null||f===null||M===null)return;let O=f.cloneNode(!0),P=O.querySelector('[role="menuitem"]');if(P===null)return;let H=P.querySelector('[class*="_itemIcon"]');H!==null&&(H.innerHTML=Js,H.style.color=Ha);let B=P.querySelector('[class*="_itemLabel"]');B!==null?(B.textContent=t("deleteSession"),B.style.color=Ha):P.firstElementChild===null&&(P.textContent=t("deleteSession"),P.style.color=Ha),P.setAttribute("data-mobile-nav","session-delete"),P.addEventListener("click",j=>{j.preventDefault(),j.stopPropagation();let W=n;W?.button.click();try{if(W===null){k(t("deleteErrorResolve"));return}let U=W.sessionId;if(U===null){k(t("deleteErrorResolve"));return}m(U,W.title)}catch(U){console.error("[dsh-web-mobile] session delete failed:",U),k(t("deleteErrorGeneric",{message:U instanceof Error?U.message:String(U)}))}}),M.appendChild(O),v.add(O)},u=()=>{for(let T of v)T.isConnected||v.delete(T);let h=a("session.new");for(let T of document.querySelectorAll('[role="menu"]'))s(T)&&(n!==null&&n.title===h||A(T))},g=()=>{o===0&&(o=requestAnimationFrame(()=>{o=0,u()}))},L=h=>e.sessions.list.getSnapshot().byId[h]!==void 0,S=h=>{let T=[...h.querySelectorAll("button")],f=T.find(O=>{let P=O.getAttribute("aria-label")??"";return/session actions/i.test(P)});return f!==void 0?f:T.find(O=>{let P=O.getAttribute("aria-label")??"";return!/archive session|pin session/i.test(P)})??null},E=h=>{if(!(h instanceof Element))return;let T=h.closest('[class*="_sessionRow"]');if(T===null)return;let f=S(T);if(f===null)return;let M=T.querySelector('[class*="_title"]')?.textContent?.trim()??"",O=b(T);n={button:f,title:M,sessionId:O},g()},_=h=>E(h.target),c=h=>E(h.target);document.addEventListener("click",_,!0),document.addEventListener("contextmenu",c,!0);let d=h=>{if(n===null)return!1;for(let T of h.removedNodes)if(T instanceof Element&&(T.matches('[role="menu"]')||T.querySelector('[role="menu"]')!==null))return!0;return!1},C=new MutationObserver(h=>{let T=h.length===0;for(let M of h)if((M.target instanceof Element?M.target:M.target.parentElement)?.closest("[data-chat-flow]")==null){T=!0;break}if(!T)return;let f=!1;for(let M of h){if(M.type!=="childList")continue;let O=M.target;if(O===document.body){g();break}if(f||(f=d(M)),O instanceof HTMLElement&&(O.matches('[role="menu"]')||O.closest('[role="menu"]')!==null)){g();break}}f&&n!==null&&![...document.querySelectorAll('[role="menu"]')].some(s)&&(n=null)});return C.observe(document.body,{childList:!0,subtree:!0}),u(),()=>{document.removeEventListener("click",_,!0),document.removeEventListener("contextmenu",c,!0),C.disconnect(),o!==0&&cancelAnimationFrame(o),l();for(let h of v)h.remove();v.clear(),n=null}},St)}var el="[data-composer-card]",Fa="[data-composer-input]",tl='button, [role="button"], [role="option"], [role="menuitem"], [role="combobox"], [aria-haspopup], select, a[href], label, input',Ee="data-mobile-nav-focus-shadow";function Go(e){z(e,"dsh-web-mobile: composer keyboard guard",()=>{let t=Ct(navigator,typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports.bind(CSS):null),a=typeof matchMedia=="function"&&matchMedia("(pointer: coarse)").matches;if(!t&&!a)return;let n=0,o=()=>{window.clearTimeout(n),n=0;let p=document.querySelector(`[${Ee}]`);if(p===null)return;p.removeAttribute(Ee);let b=p;Object.prototype.hasOwnProperty.call(p,"focus")&&delete b.focus},i=p=>{let b=p.target;if(!(b instanceof Element)||typeof b.closest!="function")return;let w=b.closest(el);if(w===null)return;let s=w.querySelector(Fa);if(s===null)return;if(b.closest(Fa)!==null){o();return}let l=b.closest(tl);if(l===null||!w.contains(l)){o();return}o(),s.setAttribute(Ee,""),Object.defineProperty(s,"focus",{configurable:!0,writable:!0,value:function(){}}),window.clearTimeout(n),n=window.setTimeout(o,700)},r=p=>{if(n===0)return;let b=p.target;b instanceof HTMLElement&&b.closest(Fa)!==null&&b.blur()};return document.addEventListener("pointerdown",i,!0),document.addEventListener("touchstart",i,!0),document.addEventListener("mousedown",i,!0),document.addEventListener("focusin",r,!0),()=>{document.removeEventListener("pointerdown",i,!0),document.removeEventListener("touchstart",i,!0),document.removeEventListener("mousedown",i,!0),document.removeEventListener("focusin",r,!0),o()}})}function jo(e){let{visibleHeight:t,headerBottom:a,seatHeight:n,seatBottom:o,scrollY:i,offsetTop:r}=e;for(let l of[t,a,n,o,i,r])if(!Number.isFinite(l))return 0;if(Math.abs(i-r)>24)return 0;let p=Math.max(0,t),b=Math.max(0,p-Math.max(0,n)),w=Math.max(0,a-b),s=Math.max(0,o-p);return w+s}function Ko(e,t){return Number.isFinite(t)?e?t>0:t>=1:!1}var ft="data-mobile-nav-composer-tight",al='[class*="_composerSeat"]',nl='header:has([class*="_headerLeading"])';function Uo(e){z(e,"dsh-web-mobile: composer clearance",()=>{let t=!1,a=0,n=0,o=()=>{t=!1,a=0,q()?.removeAttribute(ft)},i=()=>{n=0;let p=q();if(p===null){o();return}let b=p.querySelector(al),w=p.querySelector(nl),s=b?.getBoundingClientRect()??null;if(b===null||w===null||s===null||s.width===0||s.height===0){o();return}t||(a=s.height);let l=window.visualViewport,m=jo({visibleHeight:Math.min(window.innerHeight,l?.height??window.innerHeight),headerBottom:w.getBoundingClientRect().bottom,seatHeight:a>0?a:s.height,seatBottom:s.bottom,scrollY:window.scrollY,offsetTop:l?.offsetTop??0});t=Ko(t,m),t?p.hasAttribute(ft)||p.setAttribute(ft,""):p.hasAttribute(ft)&&p.removeAttribute(ft)},r=()=>{n===0&&(n=requestAnimationFrame(i))};return window.addEventListener("resize",r),window.addEventListener("orientationchange",r),window.visualViewport?.addEventListener("resize",r),window.visualViewport?.addEventListener("scroll",r),document.addEventListener("focusin",r,!0),document.addEventListener("focusout",r,!0),r(),()=>{window.removeEventListener("resize",r),window.removeEventListener("orientationchange",r),window.visualViewport?.removeEventListener("resize",r),window.visualViewport?.removeEventListener("scroll",r),document.removeEventListener("focusin",r,!0),document.removeEventListener("focusout",r,!0),n!==0&&(cancelAnimationFrame(n),n=0),o()}})}function $o(e){z(e,"dsh-web-mobile: document scroll lock",()=>{let t=window.scrollBy.bind(window),a=window.scrollTo.bind(window),n=()=>{(window.scrollX!==0||window.scrollY!==0)&&a(0,0)},o=((...p)=>{n()}),i=((...p)=>{n()}),r=()=>{(window.scrollX!==0||window.scrollY!==0)&&a(0,0)};return window.scrollBy=o,window.scrollTo=i,window.addEventListener("scroll",r,{passive:!0}),document.addEventListener("scroll",r,!0),r(),()=>{window.scrollBy=t,window.scrollTo=a,window.removeEventListener("scroll",r),document.removeEventListener("scroll",r,!0)}})}var Xo={reservePx:0,bandPx:0};function Zo(e){let{visibleHeight:t,headerHeight:a,frameBottom:n,seatBottom:o,framePadding:i}=e;for(let s of[t,a,n,o,i])if(!Number.isFinite(s))return Xo;if(t<=0||a<0)return Xo;let r=Math.max(0,t-o),p=Math.max(0,o-n),b=r+p+Math.max(0,i),w=Math.max(0,t-a-b);return{reservePx:b,bandPx:w}}function Yo(e){return!Number.isFinite(e)||e<=0?0:Math.min(e*.6,520)}function Qo(e,t,a,n){return!t||!Number.isFinite(a)||a<=0?!1:e||!Number.isFinite(n)||n<=0?!0:a>n}function Jo(e){let{fieldTop:t,fieldBottom:a,bodyTop:n,bodyBottom:o,scrollTop:i,scrollHeight:r,clientHeight:p,visibleTop:b,visibleBottom:w}=e;for(let u of[t,a,n,o,i,r,p])if(!Number.isFinite(u))return i;let s=b===void 0||!Number.isFinite(b)?n:Math.max(n,b),l=w===void 0||!Number.isFinite(w)?o:Math.min(o,w);if(l-s<1)return i;let m=Math.max(0,r-p),k=Math.max(0,l-s),v=Math.min(8,k/2),A=i;return t<s+v?A=i-(s+v-t):a>l-v&&(A=i+(a-(l-v))),Math.min(Math.max(A,0),m)}var bt="data-mobile-nav-question-full",za="--dsha-mobile-question-reserve",ol="question-expand",il='[class*="_frame"][style*="--dsh-composer-side-clearance"], [class*="_frame"]',rl='[class*="_headerActions"]',ei='[class*="_body"]',sl='[class*="_fieldInput"]',ll='[data-question-key] [class*="_card"]',dl='[class*="_footer"]',ti='[class*="_composerSeat"]',cl="--dsha-mobile-visible-vh",pl="--mobile-nav-header-h",hl=['<svg class="dsh-web-mobile-question-expand" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>",'<svg class="dsh-web-mobile-question-collapse" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M2 6h4V2M14 6h-4V2M2 10h4v4M14 10h-4v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>"].join(""),ai=e=>{let t=document.documentElement.style.getPropertyValue(e).trim(),a=Number.parseFloat(t);return Number.isFinite(a)?a:Number.NaN};function ni(e){let t=e.locale.bind(Q);z(e,"dsh-web-mobile: question fullscreen",()=>{let a=!1,n=!1,o=null,i=null,r="",p=0,b=null,w=null,s=c=>(b!==null&&b.isConnected&&c.contains(b)||(b=c.querySelector(ti)),b),l=()=>{let c=q();if(c===null)return null;let C=s(c)??c;return w!==null&&w.isConnected&&C.contains(w)||(w=C.querySelector(il)),w},m=()=>t(n?"questionCollapse":"questionExpand"),k=()=>{if(o===null)return;let c=m();o.getAttribute("aria-label")!==c&&(o.setAttribute("aria-label",c),o.title=c);let d=n?"true":"false";o.getAttribute("aria-expanded")!==d&&o.setAttribute("aria-expanded",d)},v=()=>{a=!1,n=!1,p!==0&&(cancelAnimationFrame(p),p=0);let c=q();c!==null&&c.hasAttribute(bt)&&c.removeAttribute(bt),i?.style.removeProperty(za),i=null,r="",k()},A=()=>{let c=document.activeElement;if(!(c instanceof HTMLElement)||!c.matches(sl))return;let d=c.closest(ll),C=c.closest(ei),h=d!==null&&d.scrollHeight>d.clientHeight+1?d:C;if(h===null)return;let T=h===d?d.querySelector(":scope > "+dl):null,M=c.getBoundingClientRect(),O=h.getBoundingClientRect(),P=T?.getBoundingClientRect().top??Number.NaN,H={top:O.top,bottom:Number.isFinite(P)?Math.min(O.bottom,P):O.bottom},B=window.visualViewport,j=B?.offsetTop??Number.NaN,W=B==null?Number.NaN:B.offsetTop+B.height,U=Jo({fieldTop:M.top,fieldBottom:M.bottom,bodyTop:H.top,bodyBottom:H.bottom,scrollTop:h.scrollTop,scrollHeight:h.scrollHeight,clientHeight:h.clientHeight,visibleTop:j,visibleBottom:W});Math.abs(U-h.scrollTop)>=1&&(h.scrollTop=U)},u=()=>{p=0;let c=q(),d=l();if(c===null||d===null){v();return}let C=c.querySelector(ti),h=d.getBoundingClientRect(),T=C?.getBoundingClientRect()??null,f=getComputedStyle(d),M=ai(cl),O=Zo({visibleHeight:M,headerHeight:ai(pl),frameBottom:h.bottom,seatBottom:T===null?Number.NaN:T.bottom,framePadding:Number.parseFloat(f.paddingTop)+Number.parseFloat(f.paddingBottom)}),P=Qo(n,a,O.bandPx,Yo(M)),H=`${Math.round(O.reservePx)}px`;i!==d&&(i?.style.removeProperty(za),i=d,r=""),r!==H&&(r=H,d.style.setProperty(za,H)),P!==c.hasAttribute(bt)&&(P?c.setAttribute(bt,""):c.removeAttribute(bt)),n=P,k(),n||(a=!1)},g=()=>{p===0&&(p=requestAnimationFrame(()=>{p=0,A(),a&&u()}))},L=()=>{a=!n,p!==0&&(cancelAnimationFrame(p),p=0),u(),n||(a=!1)},S=c=>{let d=c.querySelector(rl);if(d!==null){if(o===null){let C=document.createElement("button");C.type="button",C.dataset.mobileNav=ol,C.innerHTML=hl,C.addEventListener("click",L),o=C}o.parentElement!==d&&d.insertBefore(o,d.lastElementChild),k()}},_=se({name:"question-fullscreen",scopes:["*"],ensure:()=>{let c=l();if(c===null){v();return}if(c.querySelector(ei)===null){o?.remove(),v();return}S(c),a&&g()},dispose:()=>{v(),o!==null&&(o.removeEventListener("click",L),o.remove(),o=null)}});return window.addEventListener("resize",g),window.addEventListener("orientationchange",g),window.visualViewport?.addEventListener("resize",g),document.addEventListener("focusin",g,!0),document.addEventListener("focusout",g,!0),document.addEventListener(mt,g),g(),()=>{window.removeEventListener("resize",g),window.removeEventListener("orientationchange",g),window.visualViewport?.removeEventListener("resize",g),document.removeEventListener("focusin",g,!0),document.removeEventListener("focusout",g,!0),document.removeEventListener(mt,g),_()}})}var Da='[class*="_add"]',ul="[data-trigger-menu]",ii="[data-composer-input]",ml=e=>{let t=e.getBoundingClientRect();return t.width>0&&t.height>0&&e.getClientRects().length>0},Ba=()=>{for(let e of document.querySelectorAll(ul))if(ml(e))return e;return null},ri=()=>{let e=document.querySelector(ii);return e instanceof HTMLElement?e:null},oi=()=>{let e=ri();e!==null&&document.activeElement===e&&e.blur()},fl=()=>{let e=ri();e!==null&&e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",keyCode:27,which:27,bubbles:!0,cancelable:!0}))};function si(e){z(e,"dsh-web-mobile: composer plus toggle",()=>{let t=!1,a=[],n=()=>{for(let b of a)window.clearTimeout(b);a=[]},o=b=>{let w=b.target;t=w instanceof Element&&w.closest(Da)!==null&&Ba()!==null},i=b=>{let w=b.target;w instanceof Element&&w.closest(Da)!==null&&oi()},r=b=>{let w=t;t=!1;let s=b.target;if(!(!(s instanceof Element)||s.closest(Da)===null)){w&&Ba()!==null&&fl(),n();for(let l of[120,320,640])a.push(window.setTimeout(()=>{Ba()!==null&&oi()},l))}},p=b=>{let w=b.target;w instanceof Element&&w.closest(ii)!==null&&n()};return document.addEventListener("pointerdown",i,!0),document.addEventListener("pointerdown",p,!0),document.addEventListener("click",o,!0),document.addEventListener("click",r,!1),()=>{n(),document.removeEventListener("pointerdown",i,!0),document.removeEventListener("pointerdown",p,!0),document.removeEventListener("click",o,!0),document.removeEventListener("click",r,!1)}})}var bl='[class*="heroWorkspaceRow"] > button[aria-haspopup="menu"]',gl='[role="menu"]';function li(e){z(e,"dsh-web-mobile: workspace chip toggle",()=>{let t=null,a=i=>i instanceof Element?i.closest(bl):null,n=i=>{t=null;let r=a(i.target);r!==null&&r.getAttribute("aria-expanded")==="true"&&document.querySelector(gl)!==null&&(t=r)},o=i=>{let r=t;t=null,!(r===null||a(i.target)!==r)&&i.stopPropagation()};return document.addEventListener("pointerdown",n,!0),document.addEventListener("click",o,!0),()=>{t=null,document.removeEventListener("pointerdown",n,!0),document.removeEventListener("click",o,!0)}})}var wl="[data-team-action]",vl='[data-team-action] > button[aria-haspopup="dialog"]',xl="[data-team-panel]";function di(e){z(e,"dsh-web-mobile: team chip toggle",()=>{let t=null,a=i=>i instanceof Element?i.closest(vl):null,n=i=>{t=null;let r=a(i.target);r!==null&&r.getAttribute("aria-expanded")==="true"&&document.querySelector(wl)!==null&&document.querySelector(xl)!==null&&(t=r)},o=i=>{let r=t;t=null,!(r===null||a(i.target)!==r)&&(document.body.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0})),i.stopPropagation())};return document.addEventListener("pointerdown",n,!0),document.addEventListener("click",o,!0),()=>{t=null,document.removeEventListener("pointerdown",n,!0),document.removeEventListener("click",o,!0)}},St)}var ci='[class*="_7KE1Ra_trigger"]',pi='[class*="_7KE1Ra_menu"]',yl="[data-composer-card]",Bt=8,hi=[0,60,200];function ui(e){z(e,"dsh-web-mobile: model menu anchor",()=>{let t=0,a=null,n=null,o=[],i=null,r=null,p=null,b=null,w=()=>{let d=b;b=null,d!==null&&d.el.style.left===d.value&&(d.el.style.left=d.original)},s=d=>{if(d===null)return null;let C=n?.get(d);if(C!==void 0)return C;let h=d.getBoundingClientRect(),T=h.width>0&&h.height>0?h:null;return n?.set(d,T),T},l=()=>{for(let d of document.querySelectorAll(pi))if(s(d)!==null)return d;return null},m=d=>{let C=s(d);if(C===null)return;let h=C.width,T=document.documentElement.clientWidth,f=Math.max(Bt,T-h-Bt),M=s(r),O=s(p),P=M===null?null:M.right-h,H;if(P!==null&&P>=Bt&&P<=f)H=P;else if(O!==null)H=O.left+(O.width-h)/2;else return;let B=`${Math.round(Math.min(Math.max(H,Bt),f))}px`;b!==null&&b.el!==d&&w(),b===null?b={el:d,value:B,original:d.style.left}:b.value=B,d.style.left!==B&&(d.style.left=B)},k=()=>{i=l(),r=i===null?null:document.querySelector(ci),p=i===null?null:document.querySelector(yl),i!==null&&m(i)},v=()=>{if(i!==null){if(s(i)===null){w(),i=null,r=null,p=null;return}m(i)}},A=d=>{a=d,t===0&&(t=window.requestAnimationFrame(()=>{t=0;let C=a;a=null,n=new Map;try{C!==null&&C()}finally{n=null}}))},u=()=>{A(k);for(let d of hi)o.push(window.setTimeout(()=>A(k),d));for(;o.length>hi.length*2;){let d=o.shift();d!==void 0&&window.clearTimeout(d)}},g=d=>{let C=d.target;return C instanceof Element?C.closest(ci)!==null||C.closest(pi)!==null:!1},L=d=>{g(d)&&u()},S=d=>{g(d)&&u()},E=d=>{g(d)&&u()},_=d=>{g(d)&&u()},c=()=>{A(v)};return document.addEventListener("pointerdown",L,!0),document.addEventListener("keydown",S,!0),document.addEventListener("focusin",E,!0),document.addEventListener("click",_,!0),window.addEventListener("resize",c),document.addEventListener("scroll",c,!0),()=>{document.removeEventListener("pointerdown",L,!0),document.removeEventListener("keydown",S,!0),document.removeEventListener("focusin",E,!0),document.removeEventListener("click",_,!0),window.removeEventListener("resize",c),document.removeEventListener("scroll",c,!0),t!==0&&window.cancelAnimationFrame(t),a=null,n=null;for(let d of o)window.clearTimeout(d);o.length=0,w(),i=null,r=null,p=null}})}var qt=new Set,Wt=null;function Vt(e){if(Wt===null){let a=HTMLInputElement.prototype,n=Object.getOwnPropertyDescriptor(a,"focus"),o=a.focus;if(typeof o!="function"||n?.configurable===!1||!n&&!Object.isExtensible(a))return()=>{};let i=function(p){for(let b of qt)if(b.shouldSkip(this))return;o.call(this,p)};try{Object.defineProperty(a,"focus",{configurable:!0,writable:!0,enumerable:n?.enumerable??!1,value:i})}catch{return()=>{}}Wt=()=>{if(Object.getOwnPropertyDescriptor(a,"focus")?.value===i)try{n?Object.defineProperty(a,"focus",n):delete a.focus}catch{}}}let t={shouldSkip:e};return qt.add(t),()=>{if(qt.delete(t)&&qt.size===0){let a=Wt;Wt=null,a?.()}}}var mi='[data-shortcut-modal="shortcuts"] [data-modal-autofocus]';function fi(e){z(e,"dsh-web-mobile: shortcut modal keyboard guard",()=>{let t=new WeakSet(document.querySelectorAll(mi)),a=new WeakSet,n=Vt(o=>{if(o.matches(mi)){if(!t.has(o)&&o.hasAttribute("data-dsh-automatic-focus")){if(!a.has(o)){a.add(o),Promise.resolve().then(()=>t.add(o));let i=o.closest('[role="dialog"][aria-modal="true"]');i!==null&&!i.contains(document.activeElement)&&i.focus({preventScroll:!0})}return!0}t.add(o)}return!1});return()=>n()})}var kl='[data-menu-material], [class*="_7KE1Ra_menu"]',El='[data-menu-material] input[role="searchbox"], input[role="searchbox"][aria-controls$="-models"]',Tl=2e3;function bi(e){z(e,"dsh-web-mobile: model menu keyboard guard",()=>{let t=null,a=0,n=()=>{t===null&&(t=Vt(r=>r.matches(El)))},o=()=>{t?.(),t=null},i=()=>{n(),window.clearTimeout(a),a=window.setTimeout(()=>{document.querySelector(kl)===null&&o()},Tl)};return document.addEventListener("pointerdown",i,!0),()=>{document.removeEventListener("pointerdown",i,!0),window.clearTimeout(a),o()}})}function gi(e){return e.insideOpen||e.onInteractive?"ignore":"open"}var _l="li[data-plugin-package], li[data-plugin-row], li[data-plugin-item]",Sl='button[class*="_cardOpen"], button[class*="_rowOpen"]',Cl='button, a, input, select, textarea, [role="switch"], [role="button"], [role="tab"], [contenteditable="true"]';function wi(e){z(e,"dsh-web-mobile: plugin card tap",()=>{let t=a=>{let n=a.target;if(!(n instanceof Element))return;let o=n.closest(_l);if(o===null)return;let i=o.querySelector(Sl);!(i instanceof HTMLButtonElement)||gi({insideOpen:i.contains(n),onInteractive:n.closest(Cl)!==null})==="ignore"||(a.preventDefault(),i.click())};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)})}function vi(e,t){let a=0,n=!1;return{schedule(o){n||(n=!0,a=e(()=>{n=!1,o()}))},cancel(){n&&(t(a),n=!1)}}}function xi(e){e.effect(()=>{let t=window.matchMedia(Ae),a='[class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"])',n={"white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis","max-width":"100%"},o=[{pick:g=>g,props:{"flex-wrap":"wrap","align-items":"center",gap:"4px 10px"}},{pick:g=>g.children[0]??null,props:{flex:"1 1 100%","max-width":"100%","min-width":"0"}},{pick:g=>g.querySelector('[class*="spec"]'),props:n},{pick:g=>g.querySelector('[class*="nm"]'),props:n}],i=new WeakMap,r=(g,L)=>{let S=i.get(g);S===void 0&&i.set(g,S=new Map);for(let[E,_]of Object.entries(L)){let c="important",d=g.style.getPropertyValue(E),C=g.style.getPropertyPriority(E);if(d===_&&C===c)continue;let h=S.get(E),T=h!==void 0&&h.value===d&&h.priority===C;S.set(E,T?{...h,value:_,priority:c}:{value:_,priority:c,before:d,beforePriority:C}),g.style.setProperty(E,_,c)}},p=g=>{let L=i.get(g);if(L!==void 0){for(let[S,E]of L)L.delete(S),!(g.style.getPropertyValue(S)!==E.value||g.style.getPropertyPriority(S)!==E.priority)&&(E.before===""?g.style.removeProperty(S):g.style.setProperty(S,E.before,E.beforePriority));L.size===0&&i.delete(g)}},b=()=>{document.querySelectorAll(a).forEach(g=>{for(let L of o){let S=L.pick(g);S&&p(S)}})},w=null,s='[data-dsh-market-root], [role="dialog"]',l="[data-dsh-market-root]",m=()=>{let g=w;if(g!==null&&g.isConnected)return g;let L=document.querySelector(s);return L===null?(w=null,null):(w=L.matches(l)?L:document.querySelector(l)??L,w)},k=()=>{let g=m();if(g===null)return;let L=g.querySelectorAll(a);L.length===0&&!g.matches(l)&&(L=document.querySelectorAll(a)),L.forEach(S=>{for(let E of o){let _=E.pick(S);_&&r(_,E.props)}})},v=()=>{b(),t.matches&&k()};v();let A=vi(g=>window.requestAnimationFrame(g),g=>window.cancelAnimationFrame(g)),u=new MutationObserver((g=[])=>{let L=g.length===0;for(let S of g)if((S.target instanceof Element?S.target:S.target.parentElement)?.closest("[data-chat-flow]")==null){L=!0;break}L&&t.matches&&A.schedule(()=>{t.matches&&k()})});return u.observe(document.documentElement,{childList:!0,subtree:!0}),t.addEventListener("change",v),()=>{A.cancel(),u.disconnect(),t.removeEventListener("change",v),b(),w=null}},"dsh-web-mobile: installed-list-inline-styles")}function yi(e){z(e,"tablet-quick-settings",()=>{let t=Lt(e);t.ensure();let a=!1,n=()=>{a=!1;try{t.ensure()}catch(i){console.error("[dsh-web-mobile] tablet-quick-settings",i)}},o=new MutationObserver(()=>{a||(a=!0,requestAnimationFrame(n))});return o.observe(document.documentElement,{childList:!0,subtree:!0}),()=>{o.disconnect(),t.dispose()}},Pn)}var Al=800,Gt="[data-composer-input]",ki="data-mobile-panel-exit",Ei="dsh-mobile-panel-exit";function Ti(e){z(e,"dsh-web-mobile: session focus guard",()=>{let t=e.sessions.list,a=re(t.getSnapshot()),n=0,o=!1,i=()=>{window.clearTimeout(n),n=0,o=!1,b.disconnect();let A=document.querySelector(`[${Ee}]`);if(A===null)return;A.removeAttribute(Ee);let u=A;Object.prototype.hasOwnProperty.call(A,"focus")&&delete u.focus},r=A=>{A.hasAttribute(Ee)||(A.setAttribute(Ee,""),Object.defineProperty(A,"focus",{configurable:!0,writable:!0,value:function(){}}))},p=()=>document.querySelector(`[data-mobile-nav="frame"][${ki}]`)!==null,b=new MutationObserver(()=>{if(!o)return;let A=document.querySelector(Gt);A!==null&&r(A)}),w=()=>{i(),o=!0;let A=document.querySelector(Gt);A!==null&&r(A),b.observe(document.documentElement,{childList:!0,subtree:!0}),n=window.setTimeout(i,Al)},s=new MutationObserver(()=>{!o&&p()&&w()}),l=A=>{if(!o)return;let u=A.target;u instanceof Element&&u.closest(Gt)!==null&&i()},m=A=>{if(!o)return;let u=A.target;u instanceof HTMLElement&&u.closest(Gt)!==null&&u.blur()},k=t.subscribe(()=>{let A=re(t.getSnapshot());A!==a&&(a=A,w())}),v=()=>{o||w()};return s.observe(document.documentElement,{attributes:!0,attributeFilter:[ki]}),document.addEventListener(Ei,v),document.addEventListener("pointerdown",l,!0),document.addEventListener("focusin",m,!0),()=>{k(),s.disconnect(),document.removeEventListener(Ei,v),document.removeEventListener("pointerdown",l,!0),document.removeEventListener("focusin",m,!0),i()}})}var Ll="[data-composer-input]";function Ml(e){if(!e.isTrusted||e.defaultPrevented||e.inputType!=="insertText")return!1;let t=e.data;return typeof t!="string"||t===`
`||t==="\r"?!1:t.includes(`
`)||t.includes("\r")}function Rl(e){if(typeof DataTransfer!="function"||typeof ClipboardEvent!="function")return null;try{let t=new DataTransfer;t.setData("text/plain",e);let a=new ClipboardEvent("paste",{clipboardData:t,bubbles:!0,cancelable:!0});return a.clipboardData?.getData("text/plain")!==e?null:a}catch{return null}}function _i(e){z(e,"dsh-web-mobile: composer paste guard",()=>{let t=a=>{if(!(a instanceof InputEvent)||!Ml(a))return;let n=a.target;if(!(n instanceof Element))return;let o=n.closest(Ll);if(o===null)return;let i=Rl(a.data??"");i!==null&&(a.preventDefault(),a.stopPropagation(),o.dispatchEvent(i))};return document.addEventListener("beforeinput",t,!0),()=>{document.removeEventListener("beforeinput",t,!0)}})}var Pl='[data-mobile-nav="file-upload"]',Ol="[data-composer-card]",Il="input[type=file]",Fe=null;function Nl(e){return e==="image"?"image/*":""}function Hl(e){return typeof e?.pickFile=="function"?e.pickFile.bind(e):void 0}function Ci(e){return Array.isArray(e)?e.filter(t=>typeof File<"u"&&t instanceof File):[]}function Fl(e,t){return t?"fallback":e==null?"cancelled":Array.isArray(e)?e.length===0?"cancelled":Ci(e).length>0?"files":"fallback":"fallback"}function qa(){let e=document.querySelector(Ol);return e===null?null:e.querySelector(Il)}function zl(e,t){if(t===null)return!1;try{let a=new DataTransfer;for(let n of e)a.items.add(n);t.files=a.files}catch{return!1}return t.dispatchEvent(new Event("change",{bubbles:!0})),!0}var Dl='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20"><rect x="2.5" y="3.5" width="15" height="13" rx="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="7.2" cy="8" r="1.4" fill="currentColor"/><path d="M4.2 14.6l3.6-3.4 2.6 2.4 2.3-2.3 3.1 3.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',Bl='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20"><path d="M12.6 3.2H6.4A1.9 1.9 0 0 0 4.5 5.1v9.8a1.9 1.9 0 0 0 1.9 1.9h7.2a1.9 1.9 0 0 0 1.9-1.9V6.6l-2.9-3.4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12.4 3.4v3.3h3.1" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';function Wa(e,t=qa()){if(t===null)return;let a=Nl(e),n=t.hasAttribute("accept"),o=t.getAttribute("accept");a!==""&&t.setAttribute("accept",a);try{t.click()}finally{a!==""&&(n?t.setAttribute("accept",o??""):t.removeAttribute("accept"))}}async function ql(e,t){let a=window.DSHA,n=Hl(a);if(n===void 0){Wa("file");return}let o=qa(),i=t?.()??null,r=null,p=!1;try{r=await n({accept:[],multiple:!0,title:e("fileUploadAttachment")})}catch{p=!0}if(o===null||qa()!==o||i!==null&&(t?.()??null)!==i)return;let b=Fl(r,p);b!=="cancelled"&&(b==="files"&&zl(Ci(r),o)||Wa("file",o))}var Si=8,gt=8;function Wl(e,t,a){let n=e.top-Si-t.height;n<a.top+gt&&(n=Math.min(e.bottom+Si,a.bottom-t.height-gt));let o=Math.max(a.left+gt,Math.min(e.left,a.right-t.width-gt));return{top:Math.round(Math.max(a.top+gt,n)),left:Math.round(o)}}function Vl(){let e=window.visualViewport;return e!=null?{top:e.offsetTop,bottom:e.offsetTop+e.height,left:e.offsetLeft,right:e.offsetLeft+e.width}:{top:0,bottom:window.innerHeight,left:0,right:window.innerWidth}}function Gl(e,t,a){Fe?.(),Fe=null;let n=document.createElement("div");n.dataset.mobileNav="file-picker-backdrop";let o=document.createElement("div");o.dataset.mobileNav="file-picker",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label",e("fileUploadAttachment"));let i=[{kind:"image",icon:Dl,label:e("fileUploadImage")},{kind:"file",icon:Bl,label:e("fileUploadAttachment")}],r=[],p=()=>{Fe===p&&(Fe=null);for(let S of r.splice(0))S();n.remove()};Fe=p;let b=S=>{S.key==="Escape"&&p()};for(let S of i){let E=document.createElement("button");E.type="button",E.dataset.mobileNav="file-picker-option",E.dataset.kind=S.kind;let _=document.createElement("span");_.dataset.mobileNav="file-picker-icon",_.innerHTML=S.icon;let c=document.createElement("span");c.textContent=S.label,E.append(_,c),E.addEventListener("click",()=>{p(),S.kind==="file"?ql(e,a):Wa(S.kind)}),o.append(E)}n.addEventListener("click",S=>{S.target===n&&p()}),document.addEventListener("keydown",b,!0),r.push(()=>document.removeEventListener("keydown",b,!0)),n.append(o),document.body.append(n),o.style.visibility="hidden";let w=!1,s=()=>{w||(w=!0,o.style.visibility="")},l="",m=0,k=window.setTimeout(s,400);r.push(()=>window.clearTimeout(k));let v=()=>{if(!t.isConnected){p();return}let S=t.getBoundingClientRect(),E=o.getBoundingClientRect(),_=Wl(S,E,Vl()),c=`${_.top}px`,d=`${_.left}px`;o.style.top!==c&&(o.style.top=c),o.style.left!==d&&(o.style.left=d);let C=`${_.top}:${_.left}`;C===l?m+=1:(l=C,m=0),m>=2&&s()};v();let A=!0,u=()=>{A||v()};window.addEventListener("resize",u),window.addEventListener("orientationchange",u),window.visualViewport?.addEventListener("resize",u),window.visualViewport?.addEventListener("scroll",u),r.push(()=>window.removeEventListener("resize",u)),r.push(()=>window.removeEventListener("orientationchange",u)),r.push(()=>window.visualViewport?.removeEventListener("resize",u)),r.push(()=>window.visualViewport?.removeEventListener("scroll",u));let g=0,L=requestAnimationFrame(function S(){if(v(),!o.isConnected){A=!1;return}++g<12?L=requestAnimationFrame(S):(A=!1,s())});r.push(()=>cancelAnimationFrame(L))}function Ai(e){z(e,"dsh-web-mobile: composer file picker",()=>{let t=e.locale.bind(Q),a=()=>re(e.sessions.list.getSnapshot())??null,n=o=>{let i=o.target;if(!(i instanceof Element))return;let r=i.closest(Pl);r===null||r.hasAttribute("disabled")||(o.preventDefault(),o.stopPropagation(),Gl(t,r,a))};return document.addEventListener("click",n,!0),()=>{document.removeEventListener("click",n,!0),Fe?.(),Fe=null,document.querySelector('[data-mobile-nav="file-picker-backdrop"]')?.remove()}})}var jt="mobile-nav-attachments";function Xe(e){return typeof e=="object"&&e!==null}function Li(e){return Xe(e)?(Array.isArray(e.attachmentIds)?e.attachmentIds:Array.isArray(e.imageIds)?e.imageIds:[]).filter(a=>typeof a=="string"):[]}function Mi(e,t){if(!Array.isArray(e))return[];let a=[];for(let n of e){if(!Xe(n)||typeof n.id!="string")continue;let o=n.kind==="image"||n.kind==="file"?n.kind:void 0;if(o===void 0)continue;let i=Xe(n.file)?n.file:void 0,r=typeof i?.name=="string"?i.name:"",p=typeof i?.size=="number"&&Number.isFinite(i.size)?i.size:void 0,b=Xe(t)&&Xe(t[n.id])?t[n.id]:void 0,w=b?.status==="uploading"||b?.status==="ready"||b?.status==="error"?b.status:void 0;a.push({id:n.id,kind:o,name:r,...p===void 0?{}:{bytes:p},...o==="file"&&w!==void 0?{status:w}:{}})}return a}function jl(e){if(e<1024)return`${e} B`;let t=["KB","MB","GB"],a=e/1024,n=0;for(;a>=1024&&n<t.length-1;)a/=1024,n+=1;return`${a>=10?Math.round(a):Math.round(a*10)/10} ${t[n]}`}function Kl(e){let t=new Map;for(let a of e)t.set(a.name,(t.get(a.name)??0)+1);return e.map((a,n)=>({v:1,id:a.id,kind:a.kind,name:a.name,ordinal:n+1,ambiguous:a.name===""||(t.get(a.name)??0)>1}))}function Ri(e,t){return e.name===""?t.unnamed(e.ordinal):e.name}function Ul(e,t,a){if(a||t.includes("/"))return!1;let n=t.trim().toLowerCase();return n===""||e.toLowerCase().includes(n)}function Pi(e,t,a,n){let o=t.trim().toLowerCase(),i=[];for(let[r,p]of Kl(e).entries()){let b=e[r];if(b===void 0)continue;let w=Ri(p,n);if(!Ul(w,t,a))continue;let s=[b.kind==="image"?n.kindImage:n.kindFile];b.bytes!==void 0&&s.push(jl(b.bytes)),b.status==="uploading"?s.push(n.uploading):b.status==="error"&&s.push(n.failed),i.push({rank:o!==""&&w.toLowerCase().startsWith(o)?0:1,index:r,row:{name:w,description:s.join(" · "),icon:"file",section:n.section,value:JSON.stringify(p)}})}return i.sort((r,p)=>r.rank-p.rank||r.index-p.index),i.map(r=>r.row)}function Oi(e){if(typeof e!="string")return;let t;try{t=JSON.parse(e)}catch{return}if(!Xe(t)||t.v!==1)return;let{id:a,kind:n,name:o,ordinal:i,ambiguous:r}=t;if(!(typeof a!="string"||n!=="file"&&n!=="image"||typeof o!="string")&&!(typeof i!="number"||!Number.isInteger(i)||i<1||typeof r!="boolean"))return{v:1,id:a,kind:n,name:o,ordinal:i,ambiguous:r}}function $l(e,t){return`@${t.mention}:${e.name===""?`#${e.ordinal}`:e.name}`}function Va(e,t){let a=Oi(e);if(a!==void 0)return{source:jt,ref:JSON.stringify(a),label:Ri(a,t),appearance:"file",clipboardText:$l(a,t)}}function Ii(e){let t=Oi(e);if(t===void 0)throw new Error(`${jt}: unrecognized attachment reference`);let a=t.kind==="image"?"Image":"File",n=t.name===""?a:`${a} ${JSON.stringify(t.name)}`;return t.ambiguous?`[attachment #${t.ordinal}: ${n}]`:`[attachment: ${n}]`}var Ni="pocketMobileNav.attachments",Zl={section:"本次附件","kind.file":"文件","kind.image":"图片","status.uploading":"上传中","status.failed":"上传失败",unnamed:"附件 {n}",mention:"附件"},Yl={section:"Attachments in this message","kind.file":"File","kind.image":"Image","status.uploading":"Uploading","status.failed":"Upload failed",unnamed:"Attachment {n}",mention:"attachment"};function Ql(e,t){let a=e.get("sessions"),n=e.get("conversation"),o=a?.scope?.(t);if(o===void 0||n?.input?.for===void 0)return[];let i=Li(n.input.for(o)?.state?.getSnapshot());if(i.length===0)return[];let r=typeof n.resolveDraftAttachments=="function"?n.resolveDraftAttachments(i):typeof n.draftImages=="function"?n.draftImages(i):void 0;return Mi(r,n.fileUploads?.getSnapshot())}function Ga(e){let t=e.locale.bind(Ni);return{section:t("section"),kindFile:t("kind.file"),kindImage:t("kind.image"),uploading:t("status.uploading"),failed:t("status.failed"),unnamed:a=>t("unnamed",{n:a}),mention:t("mention")}}function Jl(e){return{trigger:"@",name:jt,order:-10,showGroupTitle:!1,candidates(t,a){if(a.signal.aborted)return Promise.resolve([]);try{return Promise.resolve(Pi(Ql(e,t.sessionId),a.query,a.drilled===!0,Ga(e)))}catch{return Promise.resolve([])}},onPick({candidate:t}){let a=Va(t.value,Ga(e));return a===void 0?void 0:{insert:a}},codec:{clipboardText:t=>Va(t,Ga(e))?.clipboardText??"",serialize:t=>{try{return Promise.resolve(Ii(t))}catch(a){return Promise.reject(a)}}}}}function Hi(e){e.effect(()=>e.locale.register(Ni,{zh:Zl,en:Yl}),"dsh-web-mobile: attachment mention dictionaries"),e.inject(["inputTriggers"],t=>{z(t,"dsh-web-mobile: attachment mention source",()=>{let a=t.get("inputTriggers");if(typeof a?.registerSource=="function")return a.registerSource(Jl(t))})})}var Kt="pocketMobileNavFileShare",Fi={share:"分享",shareFile:"分享「{name}」",downloadFile:"下载「{name}」",sharing:"正在准备文件…",downloadedUnsupported:"当前环境不支持直接分享；已开始下载，请在系统保存位置确认",downloadedTooLarge:"文件超过 50 MB；已开始下载，请在系统保存位置确认",downloadedShareFailed:"分享未能完成；已开始下载，请在系统保存位置确认",errorTooLarge:"文件太大（超过 200 MB），无法在手机端分享或下载",errorNotFound:"文件不存在或已被移动",errorGeneric:"分享失败：{message}"},zi={share:"Share",shareFile:'Share "{name}"',downloadFile:'Download "{name}"',sharing:"Preparing file…",downloadedUnsupported:"Direct sharing is unavailable here; a download has started — confirm it at the location your system shows",downloadedTooLarge:"The file is over 50 MB; a download has started — confirm it at the location your system shows",downloadedShareFailed:"Sharing did not finish; a download has started — confirm it at the location your system shows",errorTooLarge:"The file is too large (over 200 MB) to share or download on mobile",errorNotFound:"The file no longer exists or was moved",errorGeneric:"Share failed: {message}"};var Y=require("react"),nd=pa(require("@deepseek-ai/dsh-client-ui-primitives"),1);var fe=class extends Error{code;constructor(t,a){super(a),this.code=t,this.name="FileShareError"}};function ed(e){let t=e.code??"";return t==="workspace-file/too-large"?new fe("too-large",e.message??t):t==="workspace-file/not-found"||t==="workspace-file/not-regular-file"?new fe("not-found",e.message??t):new fe("read-failed",e.message??(t||"read failed"))}async function Di(e,t,a,n=1048576,o=209715200){let i=[],r=0;for(;;){a.throwIfAborted();let p=await e(t,{offset:r,length:n},a);if(a.throwIfAborted(),!p.ok)throw ed(p.error);let{data:b,eof:w,bytes:s}=p.value;if(s!==void 0&&s>o)throw new fe("too-large",`${t}: ${s} bytes exceed the ${o} byte share cap`);if(i.push(new Uint8Array(b)),r+=b.length,r>o)throw new fe("too-large",`${t}: more than ${o} bytes`);if(w||b.length===0)break}return{parts:i,size:r}}function td(e){return typeof e=="object"&&e!==null&&e.name==="AbortError"}function Ut(e){return e.share!==void 0&&e.canShare!==void 0}async function Bi(e,t){if(e.size>(t.shareMax??52428800))return t.download(e),{kind:"downloaded",reason:"too-large"};let a=t.share;if(a===void 0)return t.download(e),{kind:"downloaded",reason:"unsupported"};let n=!1;try{n=t.canShare?.({files:[e]})===!0}catch{n=!1}if(!n)return t.download(e),{kind:"downloaded",reason:"unsupported"};try{return await a({files:[e],title:e.name}),{kind:"shared"}}catch(o){return td(o)?{kind:"cancelled"}:(t.download(e),{kind:"downloaded",reason:"share-failed"})}}var ad={txt:"text/plain",log:"text/plain",md:"text/markdown",markdown:"text/markdown",csv:"text/csv",tsv:"text/tab-separated-values",json:"application/json",xml:"application/xml",yaml:"text/yaml",yml:"text/yaml",html:"text/html",htm:"text/html",css:"text/css",js:"text/javascript",mjs:"text/javascript",ts:"text/plain",tsx:"text/plain",py:"text/plain",sh:"text/plain",svg:"image/svg+xml",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",bmp:"image/bmp",heic:"image/heic",avif:"image/avif",mp3:"audio/mpeg",wav:"audio/wav",m4a:"audio/mp4",ogg:"audio/ogg",mp4:"video/mp4",mov:"video/quicktime",webm:"video/webm",pdf:"application/pdf",zip:"application/zip",gz:"application/gzip",tar:"application/x-tar",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",xls:"application/vnd.ms-excel",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",ppt:"application/vnd.ms-powerpoint",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation"};function $t(e){return e.split(/[/\\]+/).filter(Boolean).at(-1)??e}function qi(e){let t=e.lastIndexOf(".");return t<=0?"application/octet-stream":ad[e.slice(t+1).toLowerCase()]??"application/octet-stream"}var Zt=nd,Wi=["IconShareOutlineRegular","IconShareOutline16"].map(e=>Zt[e]).find(e=>typeof e=="function"),Vi=["IconWarningOutlineRegular","IconWarningOutline16"].map(e=>Zt[e]).find(e=>typeof e=="function"),ja=typeof Zt.Toast=="function"?Zt.Toast:void 0,Gi='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5v8.5M8 1.5 5 4.5M8 1.5l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 7H4a1.5 1.5 0 0 0-1.5 1.5v4A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 12 7h-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',ji='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5v8.5M8 10 5 7M8 10l3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 12.5H4A1.5 1.5 0 0 0 2.5 14v.5h11V14A1.5 1.5 0 0 0 12 12.5h-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';function od(){return React.createElement("span",{"aria-hidden":"true",dangerouslySetInnerHTML:{__html:ji}})}function id(){return Wi!==void 0?React.createElement(Wi,{size:16}):React.createElement("span",{"aria-hidden":"true",dangerouslySetInnerHTML:{__html:Gi}})}function rd(e){document.querySelector('[data-mobile-nav="file-share-toast"]')?.remove();let t=document.createElement("div");t.dataset.mobileNav="file-share-toast",t.setAttribute("role","status"),t.textContent=e,document.body.appendChild(t),setTimeout(()=>t.remove(),3e3)}function Ki(e,t){return Ut(Yt())?e("shareFile",{name:t}):e("downloadFile",{name:t})}function sd(e,t){return e.kind!=="downloaded"?null:e.reason==="too-large"?t("downloadedTooLarge"):e.reason==="share-failed"?t("downloadedShareFailed"):t("downloadedUnsupported")}function ld(e,t){if(e instanceof fe){if(e.code==="too-large")return t("errorTooLarge");if(e.code==="not-found")return t("errorNotFound")}return t("errorGeneric",{message:e instanceof Error?e.message:String(e)})}function dd(e){let t=URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download=e.name,a.rel="noopener",a.style.display="none",document.body.appendChild(a),a.click(),a.remove(),setTimeout(()=>URL.revokeObjectURL(t),3e4)}function Yt(){let e=navigator,t=window.DSHA;return{canShare:typeof t?.canShareFile=="function"?a=>a.files.length===1&&t.canShareFile(a.files[0]):typeof e.canShare=="function"?a=>e.canShare(a):void 0,share:typeof t?.shareFile=="function"?a=>t.shareFile(a.files[0]):typeof e.share=="function"?a=>e.share(a):void 0,download:dd}}function Ui(e,t,a){let[n,o]=(0,Y.useState)(null),[i,r]=(0,Y.useState)(null),p=(0,Y.useRef)(null),b=(0,Y.useRef)(0),w=(0,Y.useRef)({sessionId:e,readFileRange:t,t:a});w.current={sessionId:e,readFileRange:t,t:a},(0,Y.useEffect)(()=>()=>p.current?.abort(),[]);let s=(0,Y.useCallback)(k=>{if(ja===void 0){rd(k);return}b.current+=1,r({seq:b.current,text:k})},[]),l=(0,Y.useCallback)(k=>{if(p.current!==null)return;let v=new AbortController;p.current=v,o(k);let{sessionId:A,readFileRange:u,t:g}=w.current;(async()=>{let{parts:S}=await Di((C,h,T)=>u(A,C,h,T),k,v.signal),E=$t(k),_=new File(S,E,{type:qi(E)}),c=await Bi(_,Yt()),d=sd(c,g);d!==null&&s(d)})().catch(S=>{v.signal.aborted||(console.warn("[dsh-web-mobile] file share failed:",S),s(ld(S,g)))}).finally(()=>{p.current===v&&(p.current=null),v.signal.aborted||o(null)})},[s]),m=i===null||ja===void 0?null:React.createElement(ja,{key:i.seq,text:i.text,...Vi===void 0?{}:{icon:React.createElement(cd,null)},onDone:()=>r(null)});return{busyPath:n,share:l,toast:m}}function cd(){let e=Vi;return e===void 0?null:React.createElement(e,null)}function $i({absolutePath:e,sessionId:t,readFileRange:a,t:n}){let{busyPath:o,share:i,toast:r}=Ui(t,a,n),p=o!==null;return React.createElement(React.Fragment,null,React.createElement("button",{type:"button","data-mobile-nav":"file-share-preview","aria-label":p?n("sharing"):Ki(n,$t(e)),"aria-busy":p,disabled:p,onClick:()=>i(e)},Ut(Yt())?React.createElement(id,null):React.createElement(od,null)),r)}var Xt="file-share-row";function Xi({sessionId:e,readFileRange:t,t:a}){let{busyPath:n,share:o,toast:i}=Ui(e,t,a),r=(0,Y.useRef)(null),p=(0,Y.useRef)({busyPath:n,share:o,t:a});p.current={busyPath:n,share:o,t:a};let b=(0,Y.useRef)(null);return(0,Y.useEffect)(()=>{let s=(r.current?.closest('[data-files-state="tree"]')??null)?.querySelector("[data-files-body]")??null;if(s===null)return;let l=u=>{u.preventDefault(),u.stopPropagation();let L=u.currentTarget.parentElement?.getAttribute("data-files-path");L&&p.current.share(L)},m=()=>{let{busyPath:u,t:g}=p.current;for(let L of s.querySelectorAll(`[data-mobile-nav="${Xt}"]`))L.parentElement?.getAttribute("data-files-entry")!=="file"&&L.remove();for(let L of s.querySelectorAll('li[data-files-entry="file"]')){let S=L.querySelector(`:scope > [data-mobile-nav="${Xt}"]`);S===null&&(S=document.createElement("button"),S.type="button",S.dataset.mobileNav=Xt,S.innerHTML=Ut(Yt())?Gi:ji,S.addEventListener("click",l),L.appendChild(S));let E=L.getAttribute("data-files-path")??"",_=u!==null&&u===E,c=_?g("sharing"):Ki(g,$t(E)),d=u!==null;S.getAttribute("aria-label")!==c&&S.setAttribute("aria-label",c),S.disabled!==d&&(S.disabled=d),_?S.setAttribute("aria-busy","true"):S.removeAttribute("aria-busy")}};b.current=m;let k=0,v=()=>{k===0&&(k=requestAnimationFrame(()=>{k=0,m()}))},A=new MutationObserver(v);return A.observe(s,{childList:!0,subtree:!0}),m(),()=>{A.disconnect(),k!==0&&cancelAnimationFrame(k),b.current=null;for(let u of s.querySelectorAll(`[data-mobile-nav="${Xt}"]`))u.removeEventListener("click",l),u.remove()}},[]),(0,Y.useEffect)(()=>{b.current?.()},[n,a]),React.createElement(React.Fragment,null,React.createElement("span",{hidden:!0,"data-mobile-nav":"file-share-anchor",ref:r}),i)}function Zi(e){e.inject(["slots","locale","remote","remote.workspaceFiles"],t=>{t.effect(()=>t.locale.register(Kt,{zh:Fi,en:zi}),"dsh-web-mobile: file-share dictionaries");let a=t.remote,n=()=>({readFileRange:(o,i,r,p)=>a.workspaceFiles.readBytes(o,i,{range:r},p)});z(t,"dsh-web-mobile: file share",()=>{let o=[t.slots.inject("sidebar.right.tab.document.actions",()=>t.slots.register({name:"sidebar.right.tab.document.actions",id:"mobile-nav-file-share",order:100,locale:Kt,inject:n},$i)),t.slots.inject("sidebar.right.tab.files.actions",()=>t.slots.register({name:"sidebar.right.tab.files.actions",id:"mobile-nav-file-share-rows",order:100,locale:Kt,inject:n},Xi))];return()=>{for(let i of o)i()}})})}function Yi(e){if(typeof e!="object"||e===null)return null;let t=e.selectPanel;return typeof t!="function"?null:()=>{t.call(e,null)}}var Qi='[class*="panelRow"][aria-current="page"]',Xa=!1,Ka=null,Ua=null;function Qt(){let e=Ua;return e!==null&&e.isConnected&&e.matches(Qi)?!0:(Ua=document.querySelector(Qi),Ua!==null)}function $a(){return!Xa&&Qt()}var Ji="data-mobile-panel-exit",pd="dsh-mobile-panel-exit",hd=2e3,ud="panel-ghost",md=280,fd='[data-mobile-nav="frame"] [class*="_centerCol"] > * > *',bd='section[data-plugin-panel] button[class*="_moreBack"],section[data-plugin-panel] [data-plugin-detail] button[class*="_crumb"],section[data-plugin-panel] [data-plugin-item-detail] button[class*="_crumb"],section[data-plugin-panel] [data-plugin-row-detail] button[class*="_crumb"]';function er(e){let t=Yi(e),a=t!==null,n=!1,o=!1,i=null,r=0,p=null,b=null,w=null,s=Symbol("panel-exit");function l(){let c=q();if(c===null)return[];let d=[];for(let C of c.querySelectorAll('[class*="_centerCol"]')){let h=C.firstElementChild?.firstElementChild;if(h instanceof HTMLElement)for(let T of h.getAnimations())T.playState!=="idle"&&d.push(T)}return d}function m(){if(n){if(i!==null&&(window.clearTimeout(i),i=null),r!==0&&(cancelAnimationFrame(r),r=0),Ka===s){let c=q();c!==null&&c.removeAttribute(Ji),Xa=!1,Ka=null}n=!1}}function k(){b!==null&&(window.clearTimeout(b),b=null);let c=p;p=null,c!==null&&(w!==null&&c.removeEventListener("animationend",w,!0),w=null,c.remove())}function v(c){if(o||!n)return;let d=l();if(d.length===0){if(c<2){r=requestAnimationFrame(()=>{r=0,v(c+1)});return}m();return}let C=0;for(let h of d){let T=h.effect?.getTiming(),f=typeof T?.delay=="number"?T.delay:0,M=typeof T?.duration=="number"?T.duration:0,O=typeof T?.iterations=="number"?T.iterations:1;C=Math.max(C,f+M*O),h.finished.then(()=>m(),()=>m())}i=window.setTimeout(m,Math.min(hd,Math.max(250,C+200)))}function A(){if(!Qt())return null;let c=document.querySelector(fd);return c instanceof HTMLElement?c:null}function u(){if(!Qt())return null;let c=document.querySelector(bd);return c instanceof HTMLElement?c:null}function g(){return u()!==null}function L(c){k();let d=document.createElement("div");return d.dataset.mobileNav=ud,d.setAttribute("aria-hidden","true"),d.append(c.cloneNode(!0)),document.body.append(d),d}let S=()=>{if(o||!a||n)return;n=!0,Xa=!0,Ka=s;let c=q();c!==null&&c.setAttribute(Ji,""),document.dispatchEvent(new CustomEvent(pd));let d=A();p=d===null?null:L(d);try{t()}finally{if(r=requestAnimationFrame(()=>{r=0,v(0)}),p!==null){let C=p;w=h=>{h.animationName==="dsh-web-mobile-panel-ghost-out"&&k()},C.addEventListener("animationend",w,!0),b=window.setTimeout(k,md+120)}}},E=()=>{if(o||!a||n)return;let c=u();if(c!==null){c.click();return}S()};function _(){o=!0,m(),k()}return{exit:S,back:E,supported:a,panelOpen:Qt,subpageOpen:g,task:gd(S,a,E,u),dispose:_}}function gd(e,t,a,n){let o=!1,i=0,r=null,p=!1,b=!1,w=!1,s=null;function l(){w=!1,s!==null&&(window.clearTimeout(s),s=null)}function m(){w=!0,s!==null&&window.clearTimeout(s),s=window.setTimeout(l,1200);try{history.back()}catch{l()}}function k(){try{return history.pushState({mobilePanelExit:!0},""),!0}catch{return!1}}function v(){!t||o||k()&&(o=!0)}function A(){t&&k()&&(i+=1)}function u(E){return E===null?0:E.className.includes("_moreBack")?1:2}function g(){if(w){l();return}if(i>0)i-=1;else if(o)o=!1;else return;if($a()&&n()!==null){p=!0,a();return}$a()&&e()}function L(){b||(window.addEventListener("popstate",g),b=!0)}function S(){b&&(window.removeEventListener("popstate",g),b=!1)}return{name:"panel-back-exit",scopes:["*"],ensure:()=>{if(!t)return;if(L(),!$a()){o&&(o=!1,m()),r=null,p=!1;return}v();let E=n(),_=u(r),c=u(E);if(c===_)return;let d=p;if(p=!1,r=E,c>_){d||A();return}!d&&i>0&&(i-=1,m())},dispose:()=>{S(),l(),o&&(o=!1,m())}}}function tr(e,t){z(e,"dsh-web-mobile: panel row returns to conversation",()=>{let a=n=>{let o=n.target;if(!(o instanceof Element)||typeof o.closest!="function")return;let i=o.closest('[class*="panelRow"]');i!==null&&i.getAttribute("aria-current")==="page"&&(n.preventDefault(),n.stopPropagation(),t())};return document.addEventListener("click",a,!0),()=>document.removeEventListener("click",a,!0)})}var wd=/[?,]dsh-web-mobile\/client\.js/;function vd(e){if(typeof e!="string"||e==="")return null;try{let t=new URL(e,"http://x").searchParams.get("rev");return t===null||t===""?null:t}catch{return null}}function xd(){for(let e of document.head.querySelectorAll('script[src], link[rel="preload"]')){let t=e.getAttribute("src")??e.getAttribute("href");if(t!==null&&wd.test(t))return vd(t)}return null}function ar(e){e.effect(()=>{let t=new URLSearchParams(location.search);if(!t.has("mobile-nav-debug"))return()=>{};let a=[],n=u=>a.push(`ERR ${u.message.slice(0,120)}`),o=u=>a.push(`REJ ${String(u.reason).slice(0,120)}`);window.addEventListener("error",n),window.addEventListener("unhandledrejection",o);let i=document.createElement("div");i.style.cssText=["position:fixed","top:40px","right:6px","z-index:2147483000","background:rgba(0,0,0,.82)","color:#fff","font:11px/1.5 ui-monospace,monospace","padding:8px 10px","border-radius:8px","max-width:94vw","max-height:70vh","overflow:auto","white-space:pre-wrap","pointer-events:none"].join(";");let r=()=>{let u=_=>!!document.querySelector(_),g=_=>{let c=document.querySelector(_);return c===null?"absent":getComputedStyle(c).visibility},L=document.querySelector('[data-mobile-nav="frame"]'),S=()=>{let _=document.querySelector("[data-sidebar-right-panel]");if(_===null)return"absent";let c=_.getBoundingClientRect();return`${_.getAttribute("data-sidebar-right-panel")} pad ${getComputedStyle(_).paddingTop} rect ${Math.round(c.top)},${Math.round(c.left)} ${Math.round(c.width)}x${Math.round(c.height)}`};return[`build rev ${xd()??"?"} (diag chips)`,`URL ${location.pathname}${location.search}`,`W ${innerWidth} x ${innerHeight} dpr ${devicePixelRatio}`,`mq≤1023 ${matchMedia(Ae).matches}  mq≥1024 ${matchMedia(Rn).matches}`,`safeTop framePad ${L===null?"n/a":getComputedStyle(L).paddingTop}  rightPanel ${S()}`,`css ${u('style[data-plugin-css*="mobile"]')}  frame ${!!L}`,`header ${g("[data-phase] header")}  composer ${u("textarea, [data-composer-input]")}`,`genui cards ${document.querySelectorAll("[data-genui]").length}  panel ${u("[data-genui-panel]")}`,`phase ${document.querySelector("[data-phase]")?.getAttribute("data-phase")??"?"}`,`errs ${a.slice(-5).join(" | ")||"none"}`].join(`
`)},p=()=>{i.textContent=r()};p();let b=0,w=()=>{b===0&&(b=requestAnimationFrame(()=>{b=0,p()}))},s=new MutationObserver(u=>{for(let g of u)if(!(g.target===i||i.contains(g.target))){w();return}});s.observe(document.body,{childList:!0,subtree:!0,attributes:!0});let l=setInterval(p,1500);document.body.appendChild(i);let m=u=>{let g=document.querySelector(u);if(g===null)return"absent";let L=g.getBoundingClientRect();return`${Math.round(L.x)},${Math.round(L.y)} ${Math.round(L.width)}x${Math.round(L.height)}`},k=()=>[r(),`rects toggle ${m('[data-mobile-nav="toggle"]')} files ${m('[data-mobile-nav="files"]')} header ${m("[data-phase] header")} titleCluster ${m('[class*="_titleCluster"]')}`,`chips crea ${m('[class*="SVAs4q_"]')} team ${m("[data-team-action]")} model ${m('[class*="_7KE1Ra_trigger"]')} crumbs ${m('[class*="_crumbs"]')} crumbCurrent ${m('[class*="_crumbCurrent"]')}`,`ua ${navigator.userAgent}`,`screen ${screen.width}x${screen.height} standalone ${matchMedia("(display-mode: standalone)").matches}`,`vv ${visualViewport===null?"n/a":`${Math.round(visualViewport.width)}x${Math.round(visualViewport.height)}@${Math.round(visualViewport.offsetTop)}`}`].join(`
`),v=t.get("beacon")||"http://127.0.0.1:3199/diag",A=setInterval(()=>{fetch(v,{method:"POST",mode:"no-cors",body:k()}).catch(()=>{})},2e3);return()=>{window.removeEventListener("error",n),window.removeEventListener("unhandledrejection",o),s.disconnect(),clearInterval(l),clearInterval(A),b!==0&&cancelAnimationFrame(b),i.remove()}},"dsh-web-mobile: debug badge")}var Za=1e4,wt=window,Jt=wt.__dshaMobileScrollState instanceof WeakMap?wt.__dshaMobileScrollState:wt.__dshaMobileScrollState=new WeakMap;function nr(){return[...document.querySelectorAll('[data-mobile-nav="frame"] [class*="scrollBody"]')]}function yd(){for(let e of nr())if(e.scrollTop>0){let t={top:e.scrollTop,savedAt:Date.now(),url:location.href};Jt.set(e,t),wt.__dshaMobileLastScroll=t}else Jt.delete(e)}function kd(){for(let n of nr()){let o=Jt.get(n);Jt.delete(n),!(!o||Date.now()-o.savedAt>Za||o.url!==location.href)&&requestAnimationFrame(()=>{n.isConnected&&o.url===location.href&&Date.now()-o.savedAt<=Za&&n.scrollTop===0&&(n.scrollTop=o.top)})}let e=wt.__dshaMobileLastScroll;if(e===void 0)return;let t=0,a=()=>{if(t+=1,e.url!==location.href||Date.now()-e.savedAt>Za)return;let n=document.querySelector('[class*="scrollBody"]');if(n!==null&&n.scrollTop===0&&n.scrollHeight>=e.top+n.clientHeight){n.scrollTop=e.top;return}t<30&&requestAnimationFrame(a)};requestAnimationFrame(a)}function or(e){e.effect(()=>e.locale.register(Q,{zh:Dn,en:Bn}),"dsh-web-mobile: dictionaries"),e.effect(()=>{for(let n of document.querySelectorAll('style[data-plugin-css="dsh-web-mobile/mobile.css"]'))n.remove();let a=document.createElement("style");return a.dataset.plugin="dsh-web-mobile",a.dataset.pluginCss="dsh-web-mobile/mobile.css",a.textContent=Mn,document.head.appendChild(a),setTimeout(()=>{a.isConnected&&document.head.appendChild(a)},0),kd(),()=>{yd(),a.remove()}},"dsh-web-mobile: styles"),xi(e),yi(e);let t=er(e.layout);e.effect(()=>{let a=[Fo(),Ao(e),Lo(e,t),()=>t.dispose()];return()=>{for(let n of a)n()}},"dsh-web-mobile: reconciler infrastructure"),Do(e),Co(e),tr(e,t.exit),Vo(e),_o(e,Tt),Wo(e),Go(e),Uo(e),$o(e),ni(e),si(e),li(e),di(e),ui(e),fi(e),bi(e),wi(e),Ti(e),_i(e),Ai(e),Hi(e),zo(e),Zi(e),ar(e),e.slots.inject("conversation.session.header.actions",()=>e.slots.register({name:"conversation.session.header.actions",id:"mobile-nav-toggle",order:10,locale:Q,inject:()=>({toggleSidebar:()=>e.layout.toggleSidebar()})},Tn)),e.slots.inject("conversation.input.left",()=>e.slots.register({name:"conversation.input.left",id:"mobile-nav-file-upload",order:10,locale:Q,inject:()=>({})},_n))}var Ed=["添加工作区","添加工作区…","Add workspace","Add workspace…"],ir='[role="tab"], [role="treeitem"], [role="menuitem"], [role="menu"]';function rr(e){let t=(e??"").trim();return t.length<3||t.length>320||/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(t)&&!/^file:\/\//i.test(t)?!1:!!(/^(\/|~\/|\.\.?\/|[A-Za-z]:\\)/.test(t)||/\/[\w.\-]+\.\w{1,12}$/.test(t))}async function Td(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.top="-9999px",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let a=document.execCommand("copy");return t.remove(),a}catch{return!1}}function sr(e,t){let a=!1,n=(E,_)=>{let c=t(E);if(_!==void 0)for(let[d,C]of Object.entries(_))c=c.split(`{${d}}`).join(String(C));return c},o=null,i=null,r=E=>{o===null&&(o=document.createElement("div"),o.setAttribute("data-mobile-nav","file-guard-toast"),Object.assign(o.style,{position:"fixed",left:"50%",bottom:"calc(64px + var(--dshp-kb, 0px))",transform:"translateX(-50%)",maxWidth:"84vw",zIndex:"9999",padding:"10px 14px",borderRadius:"10px",background:"rgba(20,22,28,.92)",color:"#fff",fontSize:"13px",lineHeight:"1.4",textAlign:"center",fontFamily:"inherit",boxShadow:"0 4px 16px rgba(0,0,0,.28)",pointerEvents:"none",opacity:"0",transition:"opacity .18s ease"}),document.body.appendChild(o)),o.textContent=E,requestAnimationFrame(()=>{o!==null&&(o.style.opacity="1")}),i!==null&&window.clearTimeout(i),i=window.setTimeout(()=>{o!==null&&(o.style.opacity="0")},2600)},p=null,b=E=>{document.activeElement?.blur(),p?.remove();let c=E.length>65536?`${E.slice(0,65536)}
${t("fileTruncated")}`:E,d=document.createElement("div");d.setAttribute("data-mobile-nav","file-guard-fallback"),Object.assign(d.style,{position:"fixed",left:"max(8px, env(safe-area-inset-left, 0px))",right:"max(8px, env(safe-area-inset-right, 0px))",bottom:"calc(16px + env(safe-area-inset-bottom, 0px) + var(--dshp-kb, 0px))",maxHeight:"45vh",overflow:"auto",zIndex:"10000",padding:"10px 12px",borderRadius:"10px",background:"rgba(20,22,28,.96)",color:"#eee",boxShadow:"0 6px 24px rgba(0,0,0,.4)",WebkitOverflowScrolling:"touch"});let C=document.createElement("div");Object.assign(C.style,{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px",color:"#9aa0a8",marginBottom:"6px"});let h=document.createElement("span");h.textContent=t("fileFallbackTitle");let T=document.createElement("button");T.type="button",T.textContent=t("fileFallbackClose"),Object.assign(T.style,{border:"1px solid #444a52",background:"transparent",color:"#eee",borderRadius:"6px",padding:"2px 10px",fontSize:"12px",cursor:"pointer"}),T.addEventListener("click",()=>{d.remove()});let f=document.createElement("pre");f.textContent=c,Object.assign(f.style,{margin:"0",whiteSpace:"pre-wrap",wordBreak:"break-all",userSelect:"text",WebkitUserSelect:"text",fontSize:"12px",lineHeight:"1.5",fontFamily:"inherit"}),C.append(h,T),d.append(C,f),document.body.appendChild(d),p=d},w=E=>{let _=E.target;if(_===null)return;let c=_.closest("button, a");c!==null&&c.closest("[data-phase]")!==null&&c.closest(ir)===null&&rr(c.textContent)&&(E.preventDefault(),E.stopImmediatePropagation(),r(t("fileGuardMsg")))};document.addEventListener("click",w,!0);let s=0,l=(E=document)=>{let _=E.querySelectorAll("button, a");(E instanceof Element&&E.matches("button, a")?[E,..._]:_).forEach(d=>{if(d.getAttribute("data-mobile-nav-copy")==="1"||d.closest("[data-phase]")===null||d.closest(ir)!==null)return;let C=(d.textContent??"").trim();if(!rr(C))return;d.setAttribute("data-mobile-nav-copy","1");let h=String(++s);d.setAttribute("data-mobile-nav-copy-id",h);let T=d.parentElement;if(T!==null)for(let M of Array.from(T.querySelectorAll(':scope > [data-mobile-nav="copy-file"]')))M.previousElementSibling?.getAttribute("data-mobile-nav-copy-id")!==M.getAttribute("data-mobile-nav-copy-for")&&M.remove();let f=document.createElement("button");f.type="button",f.setAttribute("data-mobile-nav","copy-file"),f.setAttribute("data-mobile-nav-copy-for",h),f.textContent=t("fileCopy"),f.addEventListener("click",async M=>{M.preventDefault(),M.stopPropagation();let O=(d.textContent??"").trim().replace(/^file:\/\//i,"");f.disabled=!0,f.textContent="…";try{let P=await e(O);if(a)return;if(!P?.ok){r(P?.error?.message??t("fileCopyFailed"));return}let H=P.value?.content??"",B=P.value?.size??H.length;if(B>2097152){r(n("fileTooLarge",{size:(B/(1024*1024)).toFixed(1)}));return}let j=await Td(H);if(a)return;if(j){let W=Math.max(1,Math.round(B/1024));r(n("fileCopyDone",{kb:W}))}else r(t("fileCopyFailedFallback")),b(H)}catch(P){a||r(P instanceof Error?P.message:t("fileCopyFailed"))}finally{f.isConnected&&(f.disabled=!1,f.textContent=t("fileCopy"))}}),d.parentElement?.insertBefore(f,d.nextSibling)})},m=new Map,k='[role="menuitem"],[role="option"],li,button,a',v=E=>{let _=(E.getAttribute("aria-label")||""||E.textContent||"").trim();if(Ed.includes(_)){let c=E;m.has(E)||m.set(E,c.style.display),c.style.display="none",E.setAttribute("data-mobile-nav-hide","add-workspace")}},A=E=>{E instanceof Element&&E.matches(k)&&v(E),E.querySelectorAll(k).forEach(v)},u=new Set,g=0,L=()=>{g=0;for(let E of u)E.isConnected&&(l(E),A(E));u.clear();for(let E of m.keys())E.isConnected||m.delete(E)};l(),A(document);let S=new MutationObserver(E=>{for(let _ of E){if(_.type==="characterData"){let c=_.target.parentElement;c!==null&&c.childElementCount>0&&u.add(c);continue}_.addedNodes.forEach(c=>{c.nodeType===1?u.add(c):c.nodeType===3&&c.parentElement!==null&&u.add(c.parentElement)})}u.size>0&&g===0&&(g=requestAnimationFrame(L))});return S.observe(document.body,{childList:!0,subtree:!0,characterData:!0}),()=>{a=!0,document.removeEventListener("click",w,!0),S.disconnect(),g!==0&&cancelAnimationFrame(g),u.clear(),i!==null&&window.clearTimeout(i),o?.remove(),o=null,p?.remove(),p=null,document.querySelectorAll('[data-mobile-nav="copy-file"]').forEach(E=>E.remove()),document.querySelectorAll('[data-mobile-nav-copy="1"]').forEach(E=>E.removeAttribute("data-mobile-nav-copy")),document.querySelectorAll('[data-mobile-nav-hide="add-workspace"]').forEach(E=>{let _=E,c=m.get(E);c!==void 0?_.style.display=c:_.style.removeProperty("display"),m.delete(E),E.removeAttribute("data-mobile-nav-hide")}),m.clear()}}var ea="dsh-pocket.layout";function lr({urlValue:e,stored:t,narrowMatch:a}){let n=String(e??"").trim().toLowerCase();return n==="desktop"?"desktop":n==="mobile"?"mobile":n==="auto"?a?"mobile":"desktop":t==="desktop"||t==="mobile"?t:a?"mobile":"desktop"}function dr(e){try{if(typeof localStorage>"u")return"";if(e==null)return _d();let t=String(e).trim().toLowerCase();try{t==="desktop"||t==="mobile"?localStorage.setItem(ea,t):(t==="auto"||t==="")&&localStorage.removeItem(ea)}catch{}let a=localStorage.getItem(ea);return a==="desktop"||a==="mobile"?a:""}catch{return""}}function _d(){try{if(typeof localStorage>"u")return"";let e=localStorage.getItem(ea);return e==="desktop"||e==="mobile"?e:""}catch{return""}}function Ya(e){let{hasGeneration:t,generation:a,state:n}=e??{};if(t===!0){let i=a!=null;return{down:!i,usable:i}}let o=n==="disconnected"||n==="connecting";return{down:o,usable:!o}}function cr({staleMs:e=2500,hardStuckMs:t=8e3,maxRepairAttempts:a=3}={}){let n=new Map,o=new Map,i=Number.NEGATIVE_INFINITY,r=Number.NEGATIVE_INFINITY,p=0,b=!1,w=(L,S)=>{if(L.down){b=!0;return}b&&(b=!1,p+=1,i=S)},s=L=>{r=L,p+=1,b=!1,o.clear()},l=(L,S)=>n.has(L)?!1:(n.set(L,S),!0),m=L=>{n.delete(L),o.delete(L)},k=(L,S,E={})=>{let _=n.get(L);if(_===void 0)return v;if((o.get(L)??0)>=a)return{waiting:!1,stale:!0,repair:!1,reconnect:!1};let c=E.openState==="loading";if(c&&E.openPromise==="gone")return u(L,{reconnect:!1});let d=E.openState!=="open"&&E.openState!=="cold";if(r>_){let C=S-r;return C<e?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:e-C}:d?u(L,{reconnect:!0}):A}if(p>0&&i>_){let C=S-Math.max(_,i);return C<e?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:e-C}:d?u(L,{reconnect:!1}):A}if(c&&S-_>=t)return u(L,{reconnect:!0});if(E.openState==="open"){let C=e-(S-_);return C>0?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:C}:A}if(E.openState===void 0){let C=t-(S-_);return C>0?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:C}:A}return c?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:Math.max(0,t-(S-_))}:v},v={waiting:!1,stale:!1,repair:!1,reconnect:!1},A={waiting:!1,stale:!0,repair:!1,reconnect:!1},u=(L,{reconnect:S})=>(o.set(L,(o.get(L)??0)+1),{waiting:!1,stale:!0,repair:!0,reconnect:S});return{noteLink:w,noteResume:s,observe:l,release:m,decide:k,reset:()=>{n.clear(),o.clear(),b=!1,p=0,i=Number.NEGATIVE_INFINITY,r=Number.NEGATIVE_INFINITY}}}function pr({gapMs:e=5e3,intervalMs:t=1e3}={}){let a=null;return{tick:i=>{if(a===null)return a=i,!1;let r=i-a;return a=i,r>Math.max(e,t*2)},reset:()=>{a=null},intervalMs:t}}var Sd=1500,hr=900,ur=500,Cd=[2e3,4e3,8e3,15e3,3e4];function mr({pingMs:e=Sd,backoffMs:t=Cd}={}){let a=!1,n=!1,o=null,i=0,r=Number.NEGATIVE_INFINITY,p=!1,b=Number.NEGATIVE_INFINITY,w=()=>{o=null,i=0,b=Number.NEGATIVE_INFINITY};return{noteState:(u,g)=>{if(a=u===!0,a){o===null&&(o=g);return}!n&&o!==null&&w()},shouldProbe:(u,g)=>g!==!0||p||u-r<e?!1:(r=u,p=!0,!0),noteProbe:(u,g)=>{if(p=!1,u===!0){n=!1,!a&&o!==null&&w();return}n=!0,o===null&&(o=g)},shouldReconnect:(u,g)=>{if(g!==!0||o===null)return!1;let L=t[Math.min(i,t.length-1)];return u-b<L?!1:(i+=1,b=u,!0)},isDown:()=>o!==null,reset:()=>{a=!1,n=!1,p=!1,r=Number.NEGATIVE_INFINITY,w()}}}var Ze="pocket",Qa={section:"手机访问",title:"📱 手机访问",subtitle:"手机扫码打开的就是电脑上的这个界面，实时同步",developer:"开发者：大哈",starAsk:"⭐ 顺手留颗 Star，大哈能高兴一整天",starCta:"好，这就去 Star",restarted:"已重启",reloadFailed:"自动刷新没成功（新进程可能还在启动）",reloadNow:"刷新页面",ok:"知道了",loadingStatus:"正在读取状态…",offlineHint:"暂时连不上宿主（可能正在重启），恢复后会自动刷新状态",later:"稍后",bgHint:"进程在后台运行（不挂终端）。如需停止：{cmd}",updatedRestart:"已更新 v{ver}，重启生效",restartingNow:"正在重启生效…",restarting:"重启中…",restartNow:"🔄 重启 dsh web 生效",restartingDetail:"⏳ 正在重启生效（通常 10-30 秒）· 已等待 {s} 秒",updatedRestartDetail:"已更新，重启 dsh web 生效",versionLine:"v{ver}",updateDocLink:"更新方法",updateHint:"更新方式：重跑 README 里的 add 命令（插件内不再一键更新），装完重启 dsh web 生效",restartFailed:"重启失败：{err}",wanAccess:"公网访问",publicConfig:"公网配置",publicSetupHint:"不提供现成公网地址。请先配置自己的 Cloudflare 域名与 Tunnel Token；未配置时公网保持关闭，保存配置不会自动开启。",publicConfigure:"配置公网访问",pinLabel:"访问密码",advAddress:"高级 · 手动选地址",wanOffHint:"公网已关闭。开启后可通过自配固定域名从任何网络访问（每次开启需确认免责声明）",resetFactory:"🧹 恢复出厂设置",resetGo:"恢复",resetIntro:"设置搞出问题时的临时兜底：清空本机配置并重设随机密码（DSH 的会话、模型、插件配置不受影响）",resetTitle:"⚠️ 确认恢复出厂设置？",resetBody:`将清空并恢复默认：
① 开关：局域网访问=开、访问密码=开、手机端右边栏=开、局域网地址=自动
② 公网：关闭公网访问，清空 Tunnel Token、固定域名与自动恢复标记；重新配置前保持关闭
③ 密码：公网和局域网都换成新的随机 8 位密码（旧密码立即作废，手机需重新输入）

DSH 自身的会话、模型、插件配置不受影响；此操作不可撤销。`,resetConfirm:"确认恢复",resetDone:"✅ 已恢复出厂设置：设置已清空，密码已换新（手机需重新输入）",resetFailed:"❌ 恢复失败，请重试",resetPartial:"⚠️ 重置不完整：部分设置或密码没能写入磁盘，详情见下方提示",pinSaveMemoryOnly:"⚠️ 密码只在本次运行有效：写入磁盘失败，重启后会失效",lanTitle:"📶 局域网（同一 WiFi）",lanHint:"手机连接同一 WiFi 后扫码即可打开",lanAccess:"局域网访问",lanDisabledHint:"局域网访问已关闭：手机扫码/链接均不可用（公网不受影响）。点「开」恢复。",lanToggleTitleOff:"关闭局域网访问",lanToggleBodyOff:"关闭后，同一 WiFi 下的手机将无法扫码访问（局域网二维码/链接立即失效）。公网访问不受影响。确定关闭？",lanToggleTitleOn:"开启局域网访问",lanToggleBodyOn:"开启后，同一 WiFi 的手机扫码即可访问（默认需输入局域网密码）。确定开启？",confirm:"确定",lanAddress:"局域网地址",lanAddressAuto:"自动（推荐）",lanPin:"局域网访问密码",on:"开",off:"关",lanPinValue:"🔐 访问密码：{pin}（手机打开需输入；与公网密码分开）",lanPinCustomValue:"🔐 访问密码：{pin}（自定义；手机打开需输入）",refresh:"刷新",customize:"自定义",customizing:"新密码（8–64 位，英文字母或数字）：",save:"保存",cancel:"取消",pinInvalid:"密码必须是 8–64 位英文字母或数字",pinCharsFiltered:"只保留英文字母和数字，其他字符已被忽略",pinCustomHint:"自定义密码不会自动换新；泄露后请主动修改",lanPinOff:"🔓 密码已关闭：扫码直连，无需密码（仅同一局域网设备可访问；公网仍要密码）",lanPinRemoteHint:"为避免公网访客拿到局域网密码，这里只在本机/局域网内显示；需要查看请改用局域网地址打开设置。",lanPinUnavailable:"暂时读不到局域网访问密码，请刷新页面重试。",lanLocalOnly:"局域网入口的开/关与地址只允许在本机或局域网内修改；你现在是通过公网隧道访问的。",wanLocalOnly:"公网隧道的开启/停止与配置只允许在本机或局域网内操作；通过隧道访问时只能查看状态。",resetLocalOnly:"恢复出厂设置只允许在本机或局域网内执行。",lanStarting:"代理未就绪…",mobileRightbar:"手机端右边栏",mobileRightbarHint:"显示原生右边栏入口；普通手机可按需关闭，折叠屏展开后使用更方便",prefsTitle:"手机端偏好",prefsHint:"这些开关只影响手机上的显示，桌面端不受影响",statusOn:"已开启",statusOff:"已关闭",statusConnected:"已连接",mobilePinchZoom:"手机端两指捏合缩放",mobilePinchZoomHint:"默认关闭：两指捏合禁用、页面锁定 1x；开启后恢复捏合，页面意外被放大时可用它还原",mobileFontSize:"手机端字号",mobileFontSizeHint:"默认「跟随桌面」，桌面改字号时手机同步变化；选择具体字号后仅手机会话正文独立变化，不影响桌面设置",mobileFontFollow:"跟随桌面",wanTitle:"🌐 公网（人在外面）",wanHint:"需先自行配置 Cloudflare 固定域名与 Tunnel Token，开启后可从任何网络访问",wanPin:"🔐 访问密码：{pin}（启停或重启不会自动换新；手机打开链接需输入）",wanPinCustom:"🔐 访问密码：{pin}（自定义；启停或重启不会自动换新）",stopTunnel:"关闭公网",enable:"开启公网访问",opening:"开启中…",namedSummary:"固定域名：{host} · Token {token}",namedTokenSet:"已配置",namedTokenMissing:"未配置",namedEdit:"修改",namedHostnameLabel:"固定域名：",namedTokenLabel:"Tunnel Token（留空 = 保持不变）：",namedHow:"请用自己的 Cloudflare 账号和域名，在 Zero Trust → Networks → Tunnels 创建命名隧道并复制 Token；自行添加 Public Hostname 路由，将 Service 指向本机实际代理端口（通常为 http://127.0.0.1:3081，改过端口请相应修改）。保存配置不会自动开启公网。",namedSecurity:"固定域名长期可被发现、更易被扫描。请设置自定义强密码并用完即关；公网密码不会随启停或重启自动换新，泄露后请主动修改。",namedNeedCfg:"请先填写自己的 Cloudflare 固定域名与 Tunnel Token",namedRunningHint:"自配固定域名（Cloudflare 命名隧道）——地址不随重启变化",namedWanHint:"仅支持自配 Cloudflare 固定域名与 Tunnel Token；未配置时公网保持关闭",namedTakeEffect:"配置已保存，不会自动开启公网；如公网正在运行，需关闭并重新开启后生效",disclaimerTitle:"⚠️ 安全免责声明",disclaimerBody:"开启公网 = 把本机 DSH（能执行代码）暴露到互联网。任何人拿到公网链接和密码，都能访问甚至操作你的电脑。请确认：① 使用自定义强密码或妥善保管自动密码；② 用完立即「关闭公网」；③ 公司/涉密网络请先确认合规。",disclaimerAgree:"我已知情，同意开启",disclaimerHint:"请勾选「我已知情」后再开启公网",downloading:"⏳ 下载 cloudflared（首次约 20-50MB，通常 1-2 分钟；之后秒开）· 已等待 {s} 秒",connecting:"⏳ 连接 Cloudflare 边缘（通常 5-30 秒）· 已等待 {s} 秒{suffix}",slowHint:" — 有点久？检查是否开着代理/VPN（Clash TUN 等）",error:"❌ 开启失败：{detail}（可重试；若是代理/VPN 问题见 README 排障）",unknownError:"未知错误",feedback:"有问题？欢迎到 GitHub Issues 反馈 🙏",fileGuardMsg:"手机上无法直接打开电脑上的文件",fileCopy:"复制",fileCopyDone:"已复制文件内容（{kb} KB）",fileCopyFailed:"复制失败",fileCopyFailedFallback:"复制失败，下方可长按选择",fileFallbackTitle:"复制失败，长按下方文本选择",fileFallbackClose:"关闭",fileTooLarge:"文件过大（{size}MB），已跳过复制",fileTruncated:"…已截断",copyLink:"复制链接",copied:"✅ 已复制地址",copyFailed:"复制失败，请长按地址手动复制",pinShow:"显示",pinHide:"隐藏",cacheTitle:"代理缓存",cacheSub:"手机访问的加速层：静态资源转码结果与会话列表瘦身结果共用一个内存预算；清空只会让下一次加载变慢",cacheUsage:"已用 {used} / {budget}",cacheEntries:"共 {n} 个缓存条目（静态资源 + 会话列表）",cacheClear:"清空缓存",cacheCleared:"✅ 已清空缓存，释放 {mb} MB",linkDown:"连接已断开，正在自动重连…",linkBack:"✅ 已重新连接",tipsTitle:"这是电脑上 DSH 的手机界面",tipsBody:`与电脑实时同步，不是另一个应用。
· 右滑（或点左上角）打开会话抽屉
· 断线会自动重连，不用手动刷新
· 字号、键盘、右边栏都在设置页「手机访问」里`,tipsDismiss:"知道了",backToBottom:"回到底部",lanDebugHint:"局域网直连不是安全上下文（浏览器限制）：没有离线缓存、装到主屏与推送，密码也在明文 HTTP 上传输。适合在家里的 WiFi 下应急；长期使用请配置公网隧道（HTTPS）。"},fr={section:"Phone access",title:"📱 Phone access",subtitle:"The phone shows this exact screen, live",developer:"Developer: daha1216 (大哈)",starAsk:"⭐ Drop a Star if it helped — it makes daha1216’s day",starCta:"★ Star it on GitHub",restarted:"Restarted",reloadFailed:"Auto-reload did not go through (the new process may still be starting)",reloadNow:"Reload",ok:"Got it",loadingStatus:"Loading status…",offlineHint:"Cannot reach the host right now (it may be restarting); status refreshes automatically once it is back",later:"Later",bgHint:"Running in the background (not attached to a terminal). To stop: {cmd}",updatedRestart:"Updated to v{ver} — restart to apply",restartingNow:"Restarting to apply…",restarting:"Restarting…",restartNow:"🔄 Restart dsh web now",restartingDetail:"⏳ Restarting to apply (usually 10-30s) · {s}s elapsed",updatedRestartDetail:"Updated — restart dsh web to apply",versionLine:"v{ver}",updateDocLink:"How to update",updateHint:"To update: re-run the add command from the README (there is no in-plugin updater), then restart dsh web",restartFailed:"Restart failed: {err}",wanAccess:"Public access",publicConfig:"Public configuration",publicSetupHint:"No ready-made public address is provided. Configure your own Cloudflare hostname and Tunnel Token first. Public access stays off until configured; saving does not start it.",publicConfigure:"Configure public access",pinLabel:"Access PIN",advAddress:"Advanced · Pick address",wanOffHint:"Public access is off. Enable it to use your configured hostname from any network (accept the disclaimer on each enable).",resetFactory:"🧹 Factory reset",resetGo:"Reset",resetIntro:"Temporary fallback when settings break: clear local config and re-roll random PINs (DSH sessions, models and plugin config are untouched)",resetTitle:"⚠️ Confirm factory reset?",resetBody:`This clears and restores defaults:
① Switches: LAN access on, access PIN on, mobile right sidebar on, LAN address auto
② Public: access stopped; Tunnel Token, fixed hostname and auto-restore marker cleared. Public access stays off until configured again
③ PINs: both public and LAN become new random 8-character PINs (old ones stop working; the phone must re-enter)

Your DSH sessions, models and plugin config are untouched. This cannot be undone.`,resetConfirm:"Reset",resetDone:"✅ Factory reset done: settings cleared and PINs re-rolled (re-enter the PIN on your phone)",resetFailed:"❌ Reset failed — please retry",resetPartial:"⚠️ Reset incomplete: some settings or PINs could not be written to disk — see the hint below",pinSaveMemoryOnly:"⚠️ PIN is only valid for this run: writing to disk failed, so it reverts after a restart",lanTitle:"📶 LAN (same Wi-Fi)",lanHint:"Scan to open once your phone is on the same Wi-Fi",lanAccess:"LAN access",lanDisabledHint:'LAN access is off — the QR code and link are unavailable (public access is unaffected). Tap "On" to restore.',lanToggleTitleOff:"Turn off LAN access",lanToggleBodyOff:"Once off, phones on the same Wi-Fi can no longer scan to connect (the LAN QR code and link stop working immediately). Public access is unaffected. Turn it off?",lanToggleTitleOn:"Turn on LAN access",lanToggleBodyOn:"Once on, phones on the same Wi-Fi can scan to connect (a LAN PIN is required by default). Turn it on?",confirm:"Confirm",lanAddress:"LAN address",lanAddressAuto:"Auto (recommended)",lanPin:"LAN access PIN",on:"On",off:"Off",lanPinValue:"🔐 PIN: {pin} (required on the phone; separate from the public PIN)",lanPinCustomValue:"🔐 PIN: {pin} (custom; required on the phone)",refresh:"Refresh",customize:"Customize",customizing:"New PIN (8–64 chars, letters/digits): ",save:"Save",cancel:"Cancel",pinInvalid:"PIN must be 8–64 characters (letters and digits only)",pinCharsFiltered:"Only letters and digits are kept; other characters were ignored",pinCustomHint:"Custom PINs do not rotate automatically; change yours if it leaks.",lanPinOff:"🔓 PIN off — scan & go, no PIN (LAN devices only; public still requires PIN)",lanPinRemoteHint:"Hidden over the tunnel so public visitors cannot read the LAN PIN. Open Settings via the LAN address to view it.",lanPinUnavailable:"Couldn't read the LAN PIN; refresh the page and try again.",lanLocalOnly:"LAN access can only be toggled or re-addressed from the host or the local network; you are visiting through the public tunnel.",wanLocalOnly:"Starting, stopping and configuring the public tunnel is local-only; over the tunnel you can only view its status.",resetLocalOnly:"Factory reset can only be run from the host or the local network.",lanStarting:"Proxy starting…",mobileRightbar:"Mobile right sidebar",mobileRightbarHint:"Show the native right-sidebar entry; disable it for a compact phone header or keep it on for an unfolded display",prefsTitle:"Mobile preferences",prefsHint:"These options only affect the phone layout; the desktop is untouched",statusOn:"On",statusOff:"Off",statusConnected:"Connected",mobilePinchZoom:"Mobile pinch zoom",mobilePinchZoomHint:"Off by default: two-finger pinch disabled, page locked at 1x; turn on to restore pinch for recovering from accidental zoom",mobileFontSize:"Mobile font size",mobileFontSizeHint:'Defaults to "Follow desktop", so desktop font changes also affect the phone. Choose a specific size for independent mobile conversation text without changing the desktop setting.',mobileFontFollow:"Follow desktop",wanTitle:"🌐 Anywhere (public)",wanHint:"Configure your own Cloudflare fixed hostname and Tunnel Token first, then enable access from any network.",wanPin:"🔐 PIN: {pin} (not rotated on stop/start or restart; required on the phone)",wanPinCustom:"🔐 PIN: {pin} (custom; not rotated on stop/start or restart)",stopTunnel:"Stop",enable:"Enable anywhere",opening:"Enabling…",namedSummary:"Fixed domain: {host} · Token {token}",namedTokenSet:"configured",namedTokenMissing:"not set",namedEdit:"Edit",namedHostnameLabel:"Fixed domain:",namedTokenLabel:"Tunnel Token (blank = keep current):",namedHow:"Use your own Cloudflare account and domain. Create a named tunnel in Zero Trust → Networks → Tunnels, copy its Token, and add a Public Hostname route yourself. Point its Service to the actual local proxy port (usually http://127.0.0.1:3081; adjust if changed). Saving does not start public access.",namedSecurity:"A fixed hostname remains discoverable and is easier to scan. Use a strong custom PIN and turn access off when done. The public PIN does not rotate on stop/start or restart; change it yourself if it leaks.",namedNeedCfg:"Set your own Cloudflare fixed hostname and Tunnel Token first",namedRunningHint:"Your configured hostname (Cloudflare named tunnel) — unchanged on restart",namedWanHint:"Requires your own Cloudflare fixed hostname and Tunnel Token; public access stays off until configured.",namedTakeEffect:"Configuration saved; public access is not started automatically. If it is running, turn it off and on again to apply changes.",disclaimerTitle:"⚠️ Security disclaimer",disclaimerBody:"Enabling public access exposes this computer’s DSH (which can execute code) to the internet. Anyone with the public link and PIN can reach — and operate — your computer. Please confirm: ① use a strong custom PIN or keep the auto-generated one safe; ② turn public access OFF as soon as you’re done; ③ on a corporate/classified network, confirm compliance first.",disclaimerAgree:"I understand and agree",disclaimerHint:'Check "I understand" before enabling public access',downloading:"⏳ Downloading cloudflared (first run ~20-50MB, usually 1-2 min; instant afterward) · {s}s elapsed",connecting:"⏳ Connecting to Cloudflare edge (usually 5-30s) · {s}s elapsed{suffix}",slowHint:" — taking long? Check for a proxy/VPN (e.g., Clash TUN)",error:"❌ Failed to enable: {detail} (you can retry; for proxy/VPN issues see the README)",unknownError:"unknown error",feedback:"🙏 Questions? Open an issue on GitHub",fileGuardMsg:"Cannot open a file stored on your computer directly from the phone",fileCopy:"Copy",fileCopyDone:"File content copied ({kb} KB)",fileCopyFailed:"Copy failed",fileCopyFailedFallback:"Copy failed — long-press below to select instead",fileFallbackTitle:"Copy failed — long-press the text below to select it",fileFallbackClose:"Close",fileTooLarge:"File too large ({size}MB), copy skipped",fileTruncated:"… truncated",copyLink:"Copy link",copied:"✅ Address copied",copyFailed:"Copy failed — long-press the address to copy it manually",pinShow:"Show",pinHide:"Hide",cacheTitle:"Proxy cache",cacheSub:"The phone-access speed layer: transcoded assets and slimmed session lists share one memory budget. Clearing only makes the next load slower.",cacheUsage:"{used} of {budget} used",cacheEntries:"{n} cached entries (assets + session lists)",cacheClear:"Clear cache",cacheCleared:"✅ Cache cleared, {mb} MB freed",linkDown:"Disconnected — reconnecting automatically…",linkBack:"✅ Reconnected",tipsTitle:"This is DSH from your computer, sized for the phone",tipsBody:`It syncs live with the desktop — not a separate app.
· Swipe right (or tap the top-left corner) for the session drawer
· A dropped connection reconnects by itself; no refresh needed
· Font size, keyboard and right sidebar live in Settings → Phone access`,tipsDismiss:"Got it",backToBottom:"Back to bottom",lanDebugHint:"LAN direct access is not a secure context (browser restriction): no offline cache, home-screen install or push, and the PIN travels over plain HTTP. Fine for quick access at home; use the public tunnel (HTTPS) for regular use."};var Ad=`
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
}`;function ze(e,t,a){try{let o=e.locale.bind(Ze)(t);return typeof o=="string"&&o.length>0?o:a}catch{return a}}function gr(e){let t=new URL(window.location.href).searchParams.get("dsh-layout"),a=t??"",n=window.matchMedia("(max-width: 1023px) and (pointer: coarse)"),o=dr(t),i=lr({urlValue:a,stored:o,narrowMatch:n.matches});if(document.body?.setAttribute("data-dsh-pocket-layout",i),i==="desktop")return;let r=n;i==="mobile"&&(r={matches:!0,addEventListener:()=>{},removeEventListener:()=>{}});let p=a.trim().toLowerCase();p==="desktop"||p==="mobile"||p!=="auto"&&(o==="desktop"||o==="mobile")||e.effect(()=>{let s=()=>{document.body?.setAttribute("data-dsh-pocket-layout",n.matches?"mobile":"desktop")};return n.addEventListener("change",s),()=>{n.removeEventListener("change",s)}},"dsh-pocket: auto layout attribute sync on breakpoint change");let w=(s,l)=>{e.effect(()=>{let m,k=()=>{m?.(),m=r.matches?l():void 0};return k(),r.addEventListener?.("change",k),()=>{r.removeEventListener?.("change",k),m?.()}},s)};or(e),e.effect(()=>{let s=!0,l=v=>{document.body?.setAttribute(at,v?"on":"off")},m=v=>{l(v.detail?.enabled===!0)},k=async()=>{try{let v=await e.connection.rpc.call(ve,K.status,{});s&&l(v?.ok===!0?v.value?.mobileRightbarEnabled!==!1:!0)}catch{s&&l(!0)}};return window.addEventListener(nt,m),k(),()=>{s=!1,window.removeEventListener(nt,m),document.body?.removeAttribute(at)}},"dsh-mobile-nav: optional right sidebar"),e.effect(()=>{let s=!0,l=v=>{document.body?.setAttribute(qe,v?"on":"off")},m=v=>{l(v.detail?.enabled===!0)},k=async()=>{try{let v=await e.connection.rpc.call(ve,K.status,{});s&&l(v?.ok===!0?v.value?.mobilePinchZoomEnabled===!0:!1)}catch{s&&l(!1)}};return window.addEventListener(ot,m),k(),()=>{s=!1,window.removeEventListener(ot,m),document.body?.removeAttribute(qe)}},"dsh-pocket: pinch-zoom setting"),e.effect(()=>{let s=!0,l=v=>{let A=document.body;if(!A)return;let u=Number(v);Number.isInteger(u)&&u>=12&&u<=22?(A.style.setProperty(Ce,`${u}px`),A.setAttribute(Se,String(u))):(A.style.removeProperty(Ce),A.removeAttribute(Se))},m=v=>{l(Number(v.detail?.size)||0)},k=async()=>{try{let v=await e.connection.rpc.call(ve,K.status,{});s&&l(v?.ok===!0&&Number(v.value?.mobileFontSize)||0)}catch{s&&l(0)}};return window.addEventListener(it,m),k(),()=>{s=!1,window.removeEventListener(it,m),document.body?.style.removeProperty(Ce),document.body?.removeAttribute(Se)}},"dsh-pocket: mobile font size"),w("dsh-pocket: mobile zoom lock",()=>{let s=0,l=()=>{s=window.visualViewport?.scale??0},m=v=>{let A=v.scale,u=typeof A=="number"&&Number.isFinite(A)&&A<1;if(document.body?.getAttribute(qe)!=="on"){if(s>1.0001&&u)return;v.preventDefault();return}s>0&&s*A<=s||v.preventDefault()},k=()=>{s=0};return document.addEventListener("gesturestart",l,{passive:!1}),document.addEventListener("gesturechange",m,{passive:!1}),document.addEventListener("gestureend",k,{passive:!1}),()=>{document.removeEventListener("gesturestart",l),document.removeEventListener("gesturechange",m),document.removeEventListener("gestureend",k)}}),w("dsh-pocket: dialog focus containment",()=>{let s='[role="dialog"][aria-modal="true"]',l='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',m=[],k=d=>d.hasAttribute("data-mobile-nav")||d.parentElement?.hasAttribute("data-mobile-nav")===!0,v=d=>Array.from(d.querySelectorAll(l)).filter(C=>C.getClientRects().length>0),A=d=>!d.closest('[aria-hidden="true"], [inert]')&&d.getClientRects().length>0,u=()=>{let d=Array.from(document.querySelectorAll(s)).filter(C=>k(C)&&A(C));return d.length>0?d[d.length-1]:null},g=null,L=d=>{if(g===null||!g.isConnected||d.key!=="Tab")return;let C=v(g);if(C.length===0){d.preventDefault(),document.activeElement!==g&&g.focus({preventScroll:!0});return}let h=C[0],T=C[C.length-1],f=document.activeElement;d.shiftKey&&(f===h||!g.contains(f))?(d.preventDefault(),T.focus({preventScroll:!0})):!d.shiftKey&&(f===T||!g.contains(f))&&(d.preventDefault(),h.focus({preventScroll:!0}))};document.addEventListener("keydown",L,!0);let S=()=>{let d=u();if(d===g)return;if(g!==null&&d!==null){g=d,d.hasAttribute("tabindex")||d.setAttribute("tabindex","-1"),(v(d)[0]??d).focus({preventScroll:!0});return}if(g!==null){let T=m.pop();g=null,T!==void 0&&T.isConnected&&T.focus({preventScroll:!0});return}if(g=d,d===null)return;let C=document.activeElement;C!==null&&C!==document.body&&!d.contains(C)&&m.push(C),d.hasAttribute("tabindex")||d.setAttribute("tabindex","-1"),(v(d)[0]??d).focus({preventScroll:!0})},E=0,_=()=>{E===0&&(E=requestAnimationFrame(()=>{E=0,S()}))};S();let c=new MutationObserver(d=>{for(let C of d)if(C.type==="childList"){for(let h of C.addedNodes)if(h.nodeType===1){_();return}for(let h of C.removedNodes)if(h.nodeType===1){_();return}}});return c.observe(document.body,{childList:!0,subtree:!0}),()=>{document.removeEventListener("keydown",L,!0),c.disconnect(),E!==0&&cancelAnimationFrame(E),g?.removeAttribute("tabindex"),g=null,m.length=0}}),e.effect(()=>{let s=document.createElement("style");return s.dataset.plugin="dsh-pocket",s.dataset.pluginCss="dsh-pocket/mobile-extras.css",s.textContent=Ad,document.head.appendChild(s),()=>{s.remove()}},"dsh-pocket: mobile extra styles (issue #17)"),w("dsh-pocket: settling watchdog (host reconnect leaves composer hidden)",()=>{let s="data-dshp-settling-stale",l=cr(),m=pr(),k=new Map,v=0,A=0,u=!1,g=()=>performance.now(),L=()=>{let N=e.connection,F=typeof N?.generation?.getSnapshot=="function";return Ya({hasGeneration:F,generation:F?N.generation?.getSnapshot?.():void 0,state:F?void 0:N?.state?.getSnapshot?.()})},S=()=>{try{let N=e.sessions?.list?.getSnapshot?.();if(N===null||typeof N!="object")return;if(typeof N.current=="string")return N.current;for(let F in N.byId){let D=N.byId[F];if(D===void 0)continue;let $=D.retainedBy?.mainView;if(typeof $=="number"&&$>0&&typeof D.id=="string")return D.id}}catch{}},E=N=>{if(N===void 0)return{};try{let F=e.sessions?.manager?.get?.(N);if(F===void 0)return{};let D=F.getSnapshot?.()?.openState;if(typeof D!="string")return{};let $="openPromise"in F?F.openPromise===null||F.openPromise===void 0?"gone":"live":"unknown";return{openState:D,openPromise:$}}catch{return{}}},_=()=>{try{let N=e.connection;typeof N?.reconnect=="function"&&N.reconnect()}catch{}},c=N=>{let F=N.getAttribute("data-conversation-session");if(typeof F=="string"&&F!=="")return F;let $=N.querySelector("[data-conversation-session]")?.getAttribute("data-conversation-session");return typeof $=="string"&&$!==""?$:void 0},d=(N,F)=>{N&&_();try{let D=(F===void 0?void 0:c(F))??S();if(D===void 0)return;let $=e.sessions?.manager?.get?.(D);if(typeof $?.resync!="function")return;$.resync()}catch{}},C=N=>{let F=k.get(N);F!==void 0&&(window.clearTimeout(F),k.delete(N))},h=N=>N.getAttribute("data-phase")==="settling"?"data-phase":N.getAttribute("data-content-phase")==="settling"?"data-content-phase":null,T=N=>{if(u||!N.isConnected||h(N)===null)return;let F=c(N)??S(),D=l.decide(N,g(),E(F));if(D.repair&&d(D.reconnect,N),!D.stale){D.waiting&&f(N,D.remainingMs??2500);return}N.getAttribute(s)===null&&N.setAttribute(s,"")},f=(N,F=2500)=>{k.has(N)||k.set(N,window.setTimeout(()=>{k.delete(N),T(N)},Math.max(0,F)))},M='[data-phase="settling"],[data-content-phase="settling"]',O=()=>{if(v=0,u)return;let N=g(),F=document.querySelectorAll(M);for(let D of Array.from(document.querySelectorAll(`[${s}]`)))h(D)===null&&(D.removeAttribute(s),l.release(D));for(let D of Array.from(F))l.observe(D,N),f(D);for(let D of Array.from(k.keys()))(!D.isConnected||h(D)===null)&&(C(D),l.release(D))},P=()=>{v===0&&!u&&(v=requestAnimationFrame(O))},H=new MutationObserver(N=>{for(let F of N){if(F.type==="attributes"){P();return}for(let D of F.addedNodes)if(D.nodeType!==3){P();return}for(let D of F.removedNodes)if(D.nodeType!==3){P();return}}});H.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-phase","data-content-phase"]});let B=()=>{l.noteLink(L(),g());for(let N of Array.from(k.keys()))C(N);P()},j=[];for(let N of["generation","state"])try{let F=e.connection[N];typeof F?.subscribe=="function"&&j.push(F.subscribe(B))}catch{}let W=()=>{l.noteResume(g());for(let N of Array.from(k.keys()))C(N);P()},U=()=>{document.visibilityState==="visible"&&W()},ee=N=>{N.persisted&&W()};return document.addEventListener("visibilitychange",U),window.addEventListener("pageshow",ee),A=window.setInterval(()=>{m.tick(g())&&W()},m.intervalMs),O(),()=>{u=!0,H.disconnect();for(let N of j)N();document.removeEventListener("visibilitychange",U),window.removeEventListener("pageshow",ee),A!==0&&window.clearInterval(A),m.reset(),v!==0&&cancelAnimationFrame(v);for(let N of k.values())window.clearTimeout(N);k.clear(),l.reset();for(let N of Array.from(document.querySelectorAll(`[${s}]`)))N.removeAttribute(s)}},"dsh-pocket: settling watchdog (host reconnect leaves composer hidden)"),w("dsh-pocket: link watchdog (silent disconnect never recovers)",()=>{let s=mr(),l=!1,m=0,k=()=>performance.now(),v=()=>{try{let f=e.connection,M=typeof f?.generation?.getSnapshot=="function";return Ya({hasGeneration:M,generation:M?f.generation?.getSnapshot?.():void 0,state:M?void 0:f?.state?.getSnapshot?.()}).down}catch{return!1}},A=()=>{try{let f=e.connection;typeof f?.reconnect=="function"&&f.reconnect()}catch{}},u=null,g=!1,L=0,S=()=>(u!==null&&u.isConnected||(u=document.createElement("div"),u.setAttribute("data-mobile-nav","link-banner"),u.setAttribute("role","status"),u.setAttribute("aria-live","polite"),u.style.cssText="position:fixed;left:50%;top:calc(env(safe-area-inset-top, 0px) + 10px);transform:translateX(-50%);z-index:2147483600;max-width:calc(100vw - 32px);padding:7px 14px;border-radius:999px;font:13px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff;box-shadow:0 4px 14px rgba(0,0,0,.22);pointer-events:none;white-space:nowrap;text-align:center",document.body.appendChild(u)),u),E=(f,M)=>{let O=S();O.textContent=f,O.style.background=M==="down"?"rgba(185,28,28,.96)":"rgba(21,128,61,.96)",O.style.display="block"},_=()=>{window.clearTimeout(L),L=0,u?.remove(),u=null,g=!1},c=()=>{if(l)return;let f=s.isDown();f!==g&&(g=f,f?(window.clearTimeout(L),L=0,E(ze(e,"linkDown","连接已断开，正在自动重连…"),"down")):(E(ze(e,"linkBack","✅ 已重新连接"),"back"),L=window.setTimeout(_,1400)))},d=()=>{let f=M=>{l||(window.clearTimeout(m),m=0,s.noteProbe(M,k()),c())};m=window.setTimeout(()=>f(!1),hr);try{let M=e.connection?.rpc;if(typeof M?.call!="function"){f(!0);return}Promise.resolve(M.call(ve,K.status,{})).then(()=>f(!0),()=>f(!1))}catch{f(!1)}},C=()=>{if(l)return;let f=k(),M=document.visibilityState==="visible";s.noteState(v(),f),s.shouldReconnect(f,M)&&A(),s.shouldProbe(f,M)&&d(),c()},h=window.setInterval(C,ur),T=()=>{document.visibilityState==="visible"&&C()};return document.addEventListener("visibilitychange",T),C(),()=>{l=!0,window.clearInterval(h),window.clearTimeout(m),_(),s.reset(),document.removeEventListener("visibilitychange",T)}},"dsh-pocket: link watchdog (silent disconnect never recovers)"),w("dsh-pocket: keyboard height css var (--dshp-kb)",()=>{let s=window.visualViewport;if(s==null)return()=>{};let l=document.documentElement,m=0,k="",v=0,A=!1,u=null,g=()=>(u!==null&&u.isConnected&&u.matches("[data-composer-seat]")&&u.getClientRects().length>0||(u=Array.from(document.querySelectorAll("[data-composer-seat]")).find(E=>E.getClientRects().length>0)??null),u),L=()=>{m=0;let E=Math.max(0,window.innerHeight-s.height-s.offsetTop),_=0;if(Math.abs(s.scale-1)<.01){let C=g();if(C!==null){let h=C.getBoundingClientRect().bottom+(A?v:0);_=Math.max(0,h-s.height)}}let c=Math.min(Math.max(E,_),Math.round(window.innerHeight*.6));v=c,A=c>0;let d=`${Math.round(c)}px`;d!==k&&(k=d,l.style.setProperty("--dshp-kb",d),c>0?l.setAttribute("data-dshp-kb","open"):l.removeAttribute("data-dshp-kb"))},S=()=>{m===0&&(m=requestAnimationFrame(L))};return s.addEventListener("resize",S),s.addEventListener("scroll",S),L(),()=>{s.removeEventListener("resize",S),s.removeEventListener("scroll",S),m!==0&&cancelAnimationFrame(m),u=null,l.style.removeProperty("--dshp-kb"),l.removeAttribute("data-dshp-kb")}}),w("dsh-pocket: first-visit tips",()=>{let s="dsh-pocket:first-visit-tips:v1",l=!0;try{l=window.localStorage.getItem(s)!==null}catch{}if(l)return()=>{};let m=()=>{try{window.localStorage.setItem(s,"1")}catch{}},k=null,v=0,A=()=>{m(),window.clearTimeout(v),v=0,k?.remove(),k=null};k=document.createElement("div"),k.setAttribute("data-mobile-nav","first-visit-tips"),k.setAttribute("role","dialog"),k.setAttribute("aria-label",ze(e,"tipsTitle","这是电脑上 DSH 的手机界面")),k.style.cssText="position:fixed;left:12px;right:12px;bottom:calc(env(safe-area-inset-bottom, 0px) + 76px);z-index:2147483500;max-width:420px;margin:0 auto;padding:14px 16px;border-radius:14px;background:rgba(17,24,39,.97);color:#f9fafb;font:13px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.3)";let u=document.createElement("div");u.textContent=ze(e,"tipsTitle","这是电脑上 DSH 的手机界面"),u.style.cssText="font-weight:600;font-size:14px;margin-bottom:6px";let g=document.createElement("div");g.textContent=ze(e,"tipsBody",`与电脑实时同步，不是另一个应用。
· 右滑（或点左上角）打开会话抽屉
· 断线会自动重连，不用手动刷新
· 字号、键盘、右边栏都在设置页「手机访问」里`),g.style.cssText="white-space:pre-line;color:#d1d5db";let L=document.createElement("button");return L.type="button",L.textContent=ze(e,"tipsDismiss","知道了"),L.style.cssText="margin-top:10px;padding:7px 12px;border:1px solid rgba(255,255,255,.28);border-radius:8px;background:transparent;color:#fff;font:13px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;cursor:pointer",L.addEventListener("click",A),k.append(u,g,L),document.body.appendChild(k),v=window.setTimeout(A,12e3),()=>{window.clearTimeout(v),k?.remove(),k=null}}),w("dsh-pocket: back to bottom pill",()=>{let l=null,m=0,k=!1,v=()=>{let C=document.querySelectorAll("[data-conversation-scroll]");for(let h of Array.from(C))if(h.getClientRects().length>0)return h;return null},A=()=>{let C=Array.from(document.querySelectorAll("[data-composer-seat]")).find(h=>h.getClientRects().length>0)??null;return C===null?92:Math.max(12,window.innerHeight-C.getBoundingClientRect().top+12)},u=()=>(l!==null&&l.isConnected||(l=document.createElement("button"),l.type="button",l.setAttribute("data-mobile-nav","back-to-bottom"),l.setAttribute("aria-label",ze(e,"backToBottom","回到底部")),l.textContent="↓",l.style.cssText="position:fixed;right:14px;z-index:2147483400;width:40px;height:40px;border-radius:50%;border:1px solid rgba(0,0,0,.08);background:rgba(255,255,255,.96);color:#111827;font:18px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.18);display:none;align-items:center;justify-content:center;padding:0;cursor:pointer;-webkit-tap-highlight-color:transparent",l.addEventListener("click",()=>{let C=v();if(C!==null)try{C.scrollTo({top:C.scrollHeight,behavior:"smooth"})}catch{C.scrollTop=C.scrollHeight}g()}),document.body.appendChild(l)),l),g=()=>{k&&(k=!1,l!==null&&(l.style.display="none"))},L=()=>{if(l===null)return;let C=`${A()}px`;l.style.bottom!==C&&(l.style.bottom=C)},S=()=>{if(m=0,document.visibilityState!=="visible"){g();return}let C=v();if(C===null||C.scrollHeight-C.scrollTop-C.clientHeight<=280){g();return}let h=u();k||(L(),h.style.display="flex",k=!0)},E=()=>{L(),_()},_=()=>{m===0&&(m=requestAnimationFrame(S))},c=C=>{let h=C.target;h instanceof Element&&h.closest("[data-conversation-scroll]")!==null&&_()};document.addEventListener("scroll",c,{capture:!0,passive:!0}),window.addEventListener("resize",E),window.visualViewport?.addEventListener("resize",E);let d=window.setInterval(_,1200);return _(),()=>{m!==0&&cancelAnimationFrame(m),window.clearInterval(d),document.removeEventListener("scroll",c,!0),window.removeEventListener("resize",E),window.visualViewport?.removeEventListener("resize",E),l?.remove(),l=null,k=!1}}),w("dsh-pocket: standalone viewport guard (scroll residue / short layout viewport)",()=>{let s=window.visualViewport;if(s==null)return()=>{};let l=document.documentElement,m=0,k=0,v=!1,A=null,u=0,g=new URLSearchParams(window.location.search).has("dshp-diag"),L=_=>{A===null&&(A=document.createElement("div"),A.dataset.dshPocketDiag="1",A.style.cssText="position:fixed;top:calc(env(safe-area-inset-top, 0px) + 2px);left:2px;z-index:2147483647;font:10px/1.4 ui-monospace,Menlo,Consolas,monospace;background:rgba(0,0,0,.65);color:#4ade80;padding:2px 6px;border-radius:4px;pointer-events:none;white-space:normal;width:calc(100vw - 8px);word-break:break-all",document.body.appendChild(A));let c=Array.from(document.querySelectorAll("[data-composer-seat]")).find(P=>P.getClientRects().length>0)??null,d=c?.closest("[data-conversation-scroll]")??null,C=d?.querySelector('[class*="_viewArea"]')??null,h=" va=-/col=-/nz=-";if(C!==null){h=` va=${Math.round(C.getBoundingClientRect().height)}/col=-/nz=-`;let P=C;for(let H=0;H<6&&P!==null;H+=1){if(P.children.length>10){let B=Array.from(P.children).filter(j=>j.offsetHeight>0).length;h=` va=${Math.round(C.getBoundingClientRect().height)} col=${Math.round(P.getBoundingClientRect().height)} nz=${B}/${P.children.length}`;break}P=P.firstElementChild}}let T=d===null?"":` sb=${d.clientHeight}/${d.scrollHeight}@${Math.round(d.scrollTop)}`,f=c===null?"":` seatB=${Math.round(c.getBoundingClientRect().bottom)}`,M=getComputedStyle(l).getPropertyValue("--dshp-kb").trim()||"0px",O=l.hasAttribute("data-dshp-kb")?1:0;A.textContent=`tag=1014.3 ih=${window.innerHeight} vv=${Math.round(s.height)} off=${Math.round(s.offsetTop)} sc=${s.scale.toFixed(2)} sy=${window.scrollY}${T}${f}${h} kbc=${M}/f=${O}`,_&&(window.clearTimeout(u),u=window.setTimeout(()=>{A?.remove(),A=null},8e3))},S=()=>{m=0;let _=s.height>=window.innerHeight-8;if(Math.abs(s.scale-1)<.01&&s.height-window.innerHeight>8){if(k===0&&(k=performance.now()),!v&&performance.now()-k>600){v=!0,l.style.setProperty("--dshp-frame-h",`${Math.round(s.height)}px`),l.style.setProperty("--dshp-vh-diff",`${Math.round(s.height-window.innerHeight)}px`),l.setAttribute("data-dsh-pocket-full-height","");let d=Array.from(document.querySelectorAll("[data-conversation-scroll]")).find(C=>C.getClientRects().length>0)??null;d!==null&&d.scrollHeight-d.scrollTop-d.clientHeight<=8&&requestAnimationFrame(()=>{v&&d.isConnected&&(d.scrollTop=d.scrollHeight)}),L(!0)}}else k=0,v&&(v=!1,l.style.removeProperty("--dshp-frame-h"),l.style.removeProperty("--dshp-vh-diff"),l.removeAttribute("data-dsh-pocket-full-height"));!v&&_&&(window.scrollY>1||s.offsetTop>1)&&window.scrollTo(0,0),g&&L(!1)},E=()=>{m===0&&(m=requestAnimationFrame(S))};return s.addEventListener("resize",E),s.addEventListener("scroll",E),window.addEventListener("focusout",E),window.addEventListener("pageshow",E),S(),()=>{s.removeEventListener("resize",E),s.removeEventListener("scroll",E),window.removeEventListener("focusout",E),window.removeEventListener("pageshow",E),m!==0&&cancelAnimationFrame(m),window.clearTimeout(u),A?.remove(),l.style.removeProperty("--dshp-frame-h"),l.style.removeProperty("--dshp-vh-diff"),l.removeAttribute("data-dsh-pocket-full-height")}}),w("dsh-pocket: file open guard + copy button + hide add-workspace (issue #17)",()=>{let s=()=>{try{let v=e.sessions?.list?.getSnapshot?.();if(v===null||typeof v!="object")return;if(typeof v.current=="string")return v.current;for(let A in v.byId){let u=v.byId[A];if(u===void 0)continue;let g=u.retainedBy?.mainView;if(typeof g=="number"&&g>0&&typeof u.id=="string")return u.id}}catch{}},l=()=>{try{let A=(e.get?.("workspaces")??e.workspaces)?.list,u=Array.isArray(A)?A:A&&typeof A=="object"&&"value"in A?A.value:null;if(Array.isArray(u))for(let g of u){let L=g?.cwd??g?.root;if(typeof L=="string"&&L)return L}}catch{}return""},m=v=>{let A=s();return e.connection.rpc.call(ve,K.fileRead,{path:v,cwd:l(),...A===void 0?{}:{sessionId:A}})},k=e.locale.bind(Ze);return sr(m,k)})}var Md="dsh-pocket",Rd=["slots","connection","layout","locale","sessionLogDownload","sessions"];function le(e,t,a){let n=e(t);if(a)for(let[o,i]of Object.entries(a))n=String(n).split(`{${o}}`).join(String(i));return n}async function Pd(e,t,a){if(typeof AbortSignal<"u"&&typeof AbortSignal.timeout=="function")return fetch(e,{...t,signal:AbortSignal.timeout(a)});let n=new AbortController,o=setTimeout(()=>n.abort(),a);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(o)}}function Od(e,t){return new Promise(a=>{if(t?.aborted){a();return}let n=()=>{clearTimeout(o),t?.removeEventListener?.("abort",n),a()},o=setTimeout(n,e);t?.addEventListener?.("abort",n,{once:!0})})}function Ja(e){let t=e!==!1;document.body?.setAttribute(at,t?"on":"off"),window.dispatchEvent(new CustomEvent(nt,{detail:{enabled:t}}))}function en(e){let t=e===!0;document.body?.setAttribute(qe,t?"on":"off"),window.dispatchEvent(new CustomEvent(ot,{detail:{enabled:t}}))}var Id=[0,...Array.from({length:11},(e,t)=>12+t)];function tn(e){let t=Number(e),a=Number.isInteger(t)&&t>=12&&t<=22;a?(document.body?.style.setProperty(Ce,`${t}px`),document.body?.setAttribute(Se,String(t))):(document.body?.style.removeProperty(Ce),document.body?.removeAttribute(Se)),window.dispatchEvent(new CustomEvent(it,{detail:{size:a?t:0}}))}async function Nd(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:0;left:0;opacity:0",document.body.appendChild(t),t.select();let a=document.execCommand("copy");return t.remove(),a===!0}catch{return!1}}var ae=e=>{let t=Ld??{};for(let a of e)if(typeof t[a]=="function")return t[a];return()=>null},Z={settings:ae(["IconSettingsOutlineRegular","IconSettingsOutline16"]),lan:ae(["IconLinkOutlineRegular","IconLinkOutline16"]),wan:ae(["IconGlobeOutlineRegular","IconGlobeOutline16"]),pin:ae(["IconShieldOutlineRegular","IconShieldOutline16"]),sliders:ae(["IconSlidersTwoOutlineRegular","IconSlidersTwoOutline16"]),trash:ae(["IconTrashOutlineRegular","IconTrashOutline16"]),copy:ae(["IconCopyOutlineRegular","IconCopyOutline16"]),refresh:ae(["IconRefreshOutlineRegular","IconRefreshOutline16"]),download:ae(["IconDownloadOutlineRegular","IconDownloadOutline16"]),warn:ae(["IconWarningOutlineRegular","IconWarningOutline16"]),info:ae(["IconInfoOutlineRegular","IconInfoOutline16"]),check:ae(["IconCheckCircleOutlineRegular","IconCheckCircleOutline16"]),chevron:ae(["IconChevronDownOutlineRegular","IconChevronDownOutline16"])},wr=`
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
`;function Hd({rpcCall:e,t}){let[a,n]=(0,y.useState)(null),[o,i]=(0,y.useState)(null),[r,p]=(0,y.useState)(null),[b,w]=(0,y.useState)(!1),[s,l]=(0,y.useState)(null),[m,k]=(0,y.useState)(!1),[v,A]=(0,y.useState)(!1),[u,g]=(0,y.useState)(Date.now()),[L,S]=(0,y.useState)({}),[E,_]=(0,y.useState)(!1),[c,d]=(0,y.useState)({}),[C,h]=(0,y.useState)(!1),T=(0,y.useRef)(0),f=(0,y.useRef)(0),M=(0,y.useRef)(0),O=x=>n(R=>R&&{...R,...x}),P=(0,y.useRef)({}),H=async(x,R)=>{f.current=Date.now();let I=P.current;I[x]=(I[x]??0)+1,d(V=>V[x]===!0?V:{...V,[x]:!0});try{return await R()}finally{I[x]=Math.max(0,(I[x]??1)-1),I[x]===0&&(delete I[x],d(V=>{if(V[x]!==!0)return V;let X={...V};return delete X[x],X}))}};(0,y.useEffect)(()=>{let x="dshp-settings-css",R=document.getElementById(x);R&&R.tagName!=="STYLE"&&(R=null),R||(R=document.createElement("style"),R.id=x,document.head.appendChild(R)),R.textContent!==wr&&(R.textContent=wr)},[]),(0,y.useEffect)(()=>{if(!(!!(s?.restarting&&s?.startedAt)||!!(r?.startedAt&&["downloading","starting","registering"].includes(r?.phase??""))))return;let R=setInterval(()=>g(Date.now()),1e3);return()=>clearInterval(R)},[s,r]);let B=x=>x?Math.max(0,Math.floor((u-x)/1e3)):0,j=x=>{let R=Number(x)||0;return R>=1024*1024?`${(R/1024/1024).toFixed(1)} MB`:`${Math.round(R/1024)} KB`},W=async(x,R)=>{let I=await e(x,R,typeof AbortSignal<"u"&&typeof AbortSignal.timeout=="function"?AbortSignal.timeout(3e4):void 0);if(!I?.ok)throw new Error(I?.error?.message??"RPC failed");return I.value},U=(0,y.useRef)(null);(0,y.useEffect)(()=>()=>{U.current?.abort()},[]);let ee=async()=>{U.current?.abort();let x=new AbortController;U.current=x;let R=Date.now()+3e4;for(;Date.now()<R&&!x.signal.aborted;){try{if((await Pd(location.href,{method:"GET",cache:"no-store"},3e3)).ok){x.signal.aborted||location.reload();return}}catch{}await Od(1e3,x.signal)}x.signal.aborted||_(!0)},N=async()=>{let x=Date.now(),R=++M.current;try{let I=await W(K.status,{});if(R!==M.current)return;if(f.current>x){h(!1),T.current=0;return}T.current=0,h(!1),n(I),Ja(I.mobileRightbarEnabled),en(I.mobilePinchZoomEnabled),tn(I.mobileFontSize),p(I.tunnelState??null),I.desktop&&A(!0),I.restartNotice&&(w(!0),l(null),sessionStorage.getItem("dshp-auto-reloaded")||(sessionStorage.setItem("dshp-auto-reloaded","1"),ee()))}catch{if(R!==M.current)return;T.current+=1,T.current>=2&&h(!0)}};(0,y.useEffect)(()=>{N();let x=()=>{document.hidden||N()};document.addEventListener("visibilitychange",x);let R=setInterval(()=>{document.hidden||N()},1e4);return()=>{clearInterval(R),document.removeEventListener("visibilitychange",x),M.current+=1}},[]),(0,y.useEffect)(()=>{try{sessionStorage.removeItem("dshp-auto-reloaded")}catch{}},[]),(0,y.useEffect)(()=>{if(v)return;let x=!0,R=async()=>{if(!document.hidden)try{let V=await W(K.version,{});if(!x)return;l(X=>({current:V.current??null,loaded:V.loaded??null,restarting:X?.restarting===!0,startedAt:X?.startedAt,error:X?.error}))}catch{}},I=()=>{document.hidden||R()};return document.addEventListener("visibilitychange",I),R(),()=>{x=!1,document.removeEventListener("visibilitychange",I)}},[v]);let F=!!s?.current&&!!s?.loaded&&wn(s.current,s.loaded)>0,D=async()=>{l(x=>({...x??{},restarting:!0,startedAt:Date.now(),error:null}));try{await Promise.race([W(K.restart,{}),new Promise((x,R)=>setTimeout(()=>R(new Error("restart requested (no reply within 3s)")),3e3))]),l(x=>({...x??{},restarting:!0}))}catch(x){let R=String(x?.message??"");if(/connection|socket|fetch|network|abort|cancelled|ECONN|disconnect|closed|timeout/i.test(R)){l(I=>({...I??{},restarting:!0}));return}l(I=>({...I??{},restarting:!1,error:x.message}))}},[$,te]=(0,y.useState)(!1),[ne,xt]=(0,y.useState)(!1),aa=async()=>{let x=a?.tunnelConfig;if(!x?.hostname||!x?.tokenSet){oe({hostname:x?.hostname??"",token:"",err:t("namedNeedCfg")});return}i(null),p({phase:"starting",detail:"正在开启…",startedAt:Date.now()}),await H("wan",async()=>{try{let R=await W(K.tunnelStart,{disclaimer:!0});n(R),p(R.tunnelState??null)}catch(R){i(R.message),p(null)}})},an=()=>{let x=a?.tunnelConfig;if(!x?.hostname||!x?.tokenSet){oe({hostname:x?.hostname??"",token:"",err:null});return}xt(!1),te(!0)},vr=()=>{ne&&(te(!1),aa())},xr=()=>H("wan",async()=>{try{let x=await W(K.tunnelStop,{});n(x),p(x.tunnelState??null)}catch(x){i(x.message)}}),[de,oe]=(0,y.useState)(null),na=()=>H("saveNamed",async()=>{try{let x=await W(K.tunnelSetConfig,{mode:"named",hostname:de?.hostname??"",token:de?.token||void 0});n(x),oe(null)}catch(x){oe(R=>({...R??{},err:x.message}))}}),[yt,Ye]=(0,y.useState)(!1),yr=async()=>{Ye(!1),i(null),await H("reset",async()=>{try{let x=await W(K.pocketReset,{confirm:!0});n(x),Ja(x.mobileRightbarEnabled),en(x.mobilePinchZoomEnabled),tn(x.mobileFontSize),oe(null),ge(null),bn(!1),S({}),Array.isArray(x?.resetWarnings)&&x.resetWarnings.length>0?(i(x.resetWarnings.join("；")),De(t("resetPartial"))):De(t("resetDone"))}catch(x){i(x.message),De(t("resetFailed"))}})},kr=()=>H("refreshPin",async()=>{try{let x=await W(K.lanTokenRefresh,{});n(R=>R&&{...R,lanToken:x.lanToken}),S(R=>({...R,lan:!1}))}catch(x){i(x.message)}}),Er=x=>H("lanAuth",async()=>{try{let R=await W(K.lanAuthSetEnabled,{on:x});n(I=>I&&{...I,lanAuthEnabled:R.lanAuthEnabled})}catch(R){i(R.message)}}),Tr=x=>H("prefs",async()=>{try{let I=(await W(K.mobileRightbarSetEnabled,{on:x})).mobileRightbarEnabled===!0;O({mobileRightbarEnabled:I}),Ja(I)}catch(R){i(R.message)}}),_r=x=>H("prefs",async()=>{try{let I=(await W(K.mobilePinchZoomSetEnabled,{on:x})).mobilePinchZoomEnabled===!0;O({mobilePinchZoomEnabled:I}),en(I)}catch(R){i(R.message)}}),Sr=x=>H("prefs",async()=>{try{let R=await W(K.mobileFontSetSize,{size:x}),I=Number(R.mobileFontSize)||0;O({mobileFontSize:I}),tn(I)}catch(R){i(R.message)}}),Cr=()=>H("cache",async()=>{try{let x=await W(K.cacheClear,{});O({cache:x.cache}),De(le(t,"cacheCleared",{mb:((Number(x.freedBytes)||0)/1024/1024).toFixed(1)}))}catch(x){i(x.message)}}),[be,Qe]=(0,y.useState)(null),nn=x=>Qe(x),Ar=()=>{let x=be;if(Qe(null),x!==null)return H("lanToggle",async()=>{try{let R=await W(K.lanSetEnabled,{on:x});n(I=>I&&{...I,lanEnabled:R.lanEnabled})}catch(R){i(R.message)}})},Lr=x=>H("lanAddr",async()=>{try{n(await W(K.lanSetOverride,{ip:x}))}catch(R){i(R.message)}}),[Te,ge]=(0,y.useState)(null),on=x=>H("savePin",async()=>{if(String(Te?.value??"").length<8){ge(R=>({...R??{},err:t("pinInvalid")}));return}try{let R=await W(K.pinSetCustom,{which:x,value:Te?.value??""});n(I=>I&&{...I,accessToken:x==="public"?R.pin:I.accessToken,lanToken:x==="lan"?R.pin:I.lanToken,publicPinCustom:x==="public"?!0:I.publicPinCustom,lanPinCustom:x==="lan"?!0:I.lanPinCustom}),ge(null),R&&R.persisted===!1&&De(t("pinSaveMemoryOnly"))}catch(R){ge(I=>({...I??{},err:R.message}))}}),rn=a?.lanUrl,ie=a?.tunnelUrl,_e=a?.origin==="public",oa=r?.phase??"idle",sn=["downloading","starting","registering"].includes(oa),Mr=r?.detail??"",ia=r?.startedAt??null,ce=a?.tunnelConfig??{hostname:"",tokenSet:!1},kt=!!(ce.hostname&&ce.tokenSet),Rr=()=>oe({hostname:ce.hostname??"",token:"",err:null}),Pr=!!(ie&&ie!==`https://${ce.hostname}`),Je=x=>{let R=String(x??""),I=R.indexOf(" | ");return I<0?R:(t("ok")===Qa.ok?R.slice(0,I):R.slice(I+3)).trim()},[ln,dn]=(0,y.useState)(null),ra=(0,y.useRef)(null),De=x=>{dn(x),clearTimeout(ra.current),ra.current=setTimeout(()=>dn(null),2600)};(0,y.useEffect)(()=>()=>clearTimeout(ra.current),[]);let sa=(0,y.useRef)(null),cn=$||be!==null||yt;(0,y.useEffect)(()=>{if(!cn)return;sa.current=document.activeElement;let x=R=>{if(R.key==="Escape"){if(R.preventDefault(),R.stopPropagation(),$){te(!1);return}if(be!==null){Qe(null);return}yt&&Ye(!1)}};return window.addEventListener("keydown",x),()=>{window.removeEventListener("keydown",x);let R=sa.current;sa.current=null,R&&typeof R.focus=="function"&&R.isConnected&&R.focus()}},[cn,$,be,yt]);let et=(x,R,I,V=null)=>(0,y.createElement)("button",{role:"switch",type:"button","aria-checked":!!x,disabled:I===!0,"aria-label":V??void 0,className:"dshp-switch",onClick:I===!0?void 0:R},(0,y.createElement)("span",{className:"dshp-switch-thumb"})),G=(x,...R)=>{let{variant:I="ghost",mini:V=!1,icon:X=null,children:Be,...ca}=x??{},Dr=R.length>0?R:Be;return(0,y.createElement)("button",{type:"button",...ca,className:`dshp-btn is-${I}${V?" is-mini":""}`},X?(0,y.createElement)(X,{size:V?12:14}):null,Dr)},pn=({on:x,children:R})=>(0,y.createElement)("span",{className:`dshp-chip${x?" is-on":""}`},(0,y.createElement)("span",{className:"dshp-chip-dot"}),R),tt=({icon:x,title:R,sub:I,right:V,children:X,danger:Be=!1,key:ca})=>(0,y.createElement)("section",{className:`dshp-card${Be?" is-danger":""}`,"data-dshp-section":ca??""},(0,y.createElement)("div",{className:"dshp-card-head"},x?(0,y.createElement)("span",{className:"dshp-card-icon"},(0,y.createElement)(x,{size:16})):null,(0,y.createElement)("div",{className:"dshp-card-text"},(0,y.createElement)("div",{className:"dshp-card-title"},R),I?(0,y.createElement)("div",{className:"dshp-card-sub"},I):null),V??null),X?(0,y.createElement)("div",{className:"dshp-card-body"},X):null),we=({label:x,desc:R,control:I,extra:V,stack:X=!1})=>(0,y.createElement)("div",{className:`dshp-row${X?" is-stack":""}`},(0,y.createElement)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,rowGap:8,flexWrap:"wrap",minWidth:0,width:"100%"}},(0,y.createElement)("div",{style:{minWidth:0}},(0,y.createElement)("div",{className:"dshp-row-label"},x),R?(0,y.createElement)("div",{className:"dshp-row-desc"},R):null),I??null),V??null),pe=({kind:x="info",icon:R=null,children:I,title:V=null,extra:X=null})=>(0,y.createElement)("div",{className:`dshp-alert is-${x}`},R?(0,y.createElement)("span",{className:"dshp-alert-icon"},(0,y.createElement)(R,{size:14})):null,(0,y.createElement)("div",{className:"dshp-alert-body"},V?(0,y.createElement)("div",{className:"dshp-alert-title"},V):null,I,X??null)),la=({src:x,url:R,hint:I})=>(0,y.createElement)("div",{className:"dshp-qr"},(0,y.createElement)("div",{className:"dshp-qr-frame"},x?(0,y.createElement)("img",{src:x,alt:"QR"}):null),(0,y.createElement)("div",{className:"dshp-qr-main"},(0,y.createElement)("div",{className:"dshp-url"},R),I?(0,y.createElement)("div",{className:"dshp-qr-hint"},I):null,(0,y.createElement)("div",{className:"dshp-qr-actions"},G({variant:"ghost",mini:!0,icon:Z.copy,onClick:async()=>De(await Nd(R)?t("copied"):t("copyFailed"))},t("copyLink"))))),hn=(x,R,I)=>(0,y.createElement)("div",{className:"dshp-pinbox"},(0,y.createElement)("span",{className:"dshp-pin-value","data-dshp-pin":x},L[x]?R:"••••••••"),G({variant:"ghost",mini:!0,onClick:()=>S(V=>({...V,[x]:!V[x]}))},L[x]?t("pinHide"):t("pinShow")),...I??[]),un=x=>(0,y.createElement)("div",{className:"dshp-adv"},(0,y.createElement)("div",{className:"dshp-custom"},(0,y.createElement)("span",null,t("customizing")),(0,y.createElement)("input",{className:"dshp-input is-mono",style:{width:150,textAlign:"center"},type:"password",minLength:8,maxLength:64,name:"dsh-pocket-pin",autoComplete:"new-password",spellCheck:!1,value:Te?.value??"",autoFocus:!0,onChange:R=>{let I=R.target.value,V=I.replace(/[^a-zA-Z0-9]/g,"");ge(X=>({...X,value:V,err:V.length===I.length?null:t("pinCharsFiltered")}))},onKeyDown:R=>{R.key==="Enter"&&on(x),R.key==="Escape"&&ge(null)}}),G({variant:"primary",mini:!0,onClick:()=>on(x),disabled:c.savePin===!0},t("save")),G({variant:"ghost",mini:!0,onClick:()=>ge(null),disabled:c.savePin===!0},t("cancel"))),Te?.err?(0,y.createElement)("div",{className:"dshp-err-text"},Je(Te.err)):null),mn=x=>G({variant:"ghost",mini:!0,onClick:()=>ge({which:x,value:"",err:null})},t("customize")),da=({title:x,tone:R="warn",children:I,actions:V,onClose:X})=>(0,y.createElement)("div",{className:"dshp-modal-backdrop",onClick:Be=>{Be.target===Be.currentTarget&&X?.()}},(0,y.createElement)("div",{className:"dshp-modal",role:"dialog","aria-modal":"true","aria-label":x},(0,y.createElement)("div",{className:`dshp-modal-title is-${R}`},x),I,(0,y.createElement)("div",{className:"dshp-modal-actions"},V))),[fn,bn]=(0,y.useState)(!1),Or=sn?pe({kind:"info",icon:Z.info,children:oa==="downloading"?le(t,"downloading",{s:B(ia)}):le(t,"connecting",{s:B(ia),suffix:B(ia)>30?t("slowHint"):""})}):oa==="error"?pe({kind:"error",icon:Z.warn,children:le(t,"error",{detail:Je(Mr)||t("unknownError")})}):!ie&&kt?pe({kind:"info",icon:Z.info,children:t("wanOffHint"),extra:(0,y.createElement)("div",{style:{marginTop:8}},G({variant:"primary",onClick:an,disabled:c.wan===!0||c.saveNamed===!0},t("enable")))}):null,Ir=kt&&!de?(0,y.createElement)("div",{className:"dshp-panel"},(0,y.createElement)("div",{style:{display:"flex",alignItems:"flex-start",gap:10}},(0,y.createElement)("div",{style:{flex:1,minWidth:0}},(0,y.createElement)("div",{className:"dshp-panel-title"},ce.hostname||"—"),(0,y.createElement)("div",{className:"dshp-hint",style:{marginTop:2}},ce.tokenSet?t("namedTokenSet"):t("namedTokenMissing"))),G({variant:"ghost",mini:!0,onClick:()=>oe({hostname:ce.hostname??"",token:"",err:null})},t("namedEdit"))),(0,y.createElement)("div",{className:"dshp-hint",style:{marginTop:8,lineHeight:1.65}},t("namedHow")),!ce.tokenSet||!ce.hostname?(0,y.createElement)("div",{className:"dshp-err-text"},t("namedNeedCfg")):null):null,Nr=de?(0,y.createElement)("div",{className:"dshp-form"},(0,y.createElement)("label",{className:"dshp-field"},t("namedHostnameLabel"),(0,y.createElement)("input",{className:"dshp-input",placeholder:"pocket.example.com",value:de.hostname??"",autoFocus:!0,onChange:x=>oe(R=>({...R,hostname:x.target.value.trim(),err:null})),onKeyDown:x=>{x.key==="Enter"&&na(),x.key==="Escape"&&oe(null)}})),(0,y.createElement)("label",{className:"dshp-field"},t("namedTokenLabel"),(0,y.createElement)("input",{className:"dshp-input is-mono",type:"password",name:"dsh-pocket-tunnel-token",autoComplete:"off",spellCheck:!1,value:de.token??"",onChange:x=>oe(R=>({...R,token:x.target.value.trim(),err:null})),onKeyDown:x=>{x.key==="Enter"&&na(),x.key==="Escape"&&oe(null)}})),(0,y.createElement)("div",{className:"dshp-inline"},G({variant:"primary",mini:!0,onClick:na,disabled:c.saveNamed===!0},t("save")),G({variant:"ghost",mini:!0,onClick:()=>oe(null),disabled:c.saveNamed===!0},t("cancel"))),(0,y.createElement)("div",{className:"dshp-hint"},t("namedHow")),(0,y.createElement)("div",{className:"dshp-warn-text"},t("namedSecurity")),de.err?(0,y.createElement)("div",{className:"dshp-err-text"},Je(de.err)):null):null,Hr=(0,y.createElement)("div",{className:"dshp-adv"},Pr?(0,y.createElement)("div",{className:"dshp-warn-text"},t("namedTakeEffect")):null,!kt&&!de?pe({kind:"info",icon:Z.info,children:t("publicSetupHint"),extra:(0,y.createElement)("div",{style:{marginTop:8}},G({variant:"primary",onClick:Rr},t("publicConfigure")))}):null,Ir,Nr),Fr=a?.accessToken?we({label:t("pinLabel"),stack:!0,extra:Te?.which==="public"?un("public"):(0,y.createElement)("div",null,hn("public",a.accessToken,[mn("public")]),(0,y.createElement)("div",{className:"dshp-warn-text"},t("namedSecurity")))}):null,zr=(0,y.createElement)("div",null,ie?la({src:a.tunnelQr,url:ie,hint:t("namedRunningHint")}):null,we({label:t("publicConfig"),stack:!0,extra:Hr}),kt||ie?Fr:null);return(0,y.createElement)("div",{className:"dshp-page","data-dshp-ui":"v3"},(0,y.createElement)("header",{className:"dshp-head"},(0,y.createElement)("span",{className:"dshp-badge"},(0,y.createElement)(Z.settings,{size:19})),(0,y.createElement)("div",{className:"dshp-head-main"},(0,y.createElement)("div",{className:"dshp-title"},t("section")),(0,y.createElement)("div",{className:"dshp-sub"},t("subtitle")))),(0,y.createElement)("div",{className:"dshp-chips"},a?[pn({on:a.lanEnabled!==!1,children:`${t("lanAccess")} · ${a.lanEnabled!==!1?t("statusOn"):t("statusOff")}`}),pn({on:!!ie,children:`${t("wanAccess")} · ${t(ie?"statusConnected":"statusOff")}`})]:(0,y.createElement)("span",{className:"dshp-hint",style:{marginTop:0}},t("loadingStatus"))),o?pe({kind:"error",icon:Z.warn,children:Je(o),extra:(0,y.createElement)("div",{className:"dshp-inline",style:{marginTop:8}},G({variant:"ghost",mini:!0,onClick:()=>i(null)},t("ok")))}):null,C?pe({kind:"warn",icon:Z.warn,children:t("offlineHint")}):null,!v&&b?pe({kind:"info",icon:Z.refresh,title:t("restarted"),children:(0,y.createElement)("div",{className:"dshp-hint",style:{wordBreak:"break-all",marginTop:2}},le(t,"bgHint",{cmd:a?.killHint??`lsof -ti :${a?.dshPort??3080} | xargs kill -9`})),extra:(0,y.createElement)("div",{className:"dshp-inline",style:{marginTop:8}},E?G({variant:"ghost",mini:!0,icon:Z.refresh,onClick:()=>{_(!1),ee()}},t("reloadNow")):null,E?(0,y.createElement)("span",{className:"dshp-hint",style:{marginTop:0}},t("reloadFailed")):null,G({variant:"quiet",mini:!0,onClick:()=>w(!1)},t("ok")))}):null,!v&&!_e&&F&&!m?pe({kind:"warn",icon:Z.refresh,title:le(t,"updatedRestart",{ver:s.current}),children:(0,y.createElement)("div",{className:"dshp-hint",style:{marginTop:2}},s.restarting?le(t,"restartingDetail",{s:B(s.startedAt)}):s.error?le(t,"restartFailed",{err:Je(s.error)||t("unknownError")}):t("updatedRestartDetail")),extra:(0,y.createElement)("div",{className:"dshp-inline",style:{marginTop:8}},s.restarting?G({variant:"ghost",mini:!0,disabled:!0},t("restartingNow")):G({variant:"primary",mini:!0,icon:Z.refresh,onClick:D},t("restartNow")),s.restarting?null:G({variant:"ghost",mini:!0,onClick:()=>k(!0)},t("later")))}):null,tt({key:"lan",icon:Z.lan,title:t("lanAccess"),sub:t("lanHint"),right:et(a?.lanEnabled!==!1,()=>nn(a?.lanEnabled===!1),!a||c.lanToggle===!0||_e,t("lanAccess")),children:_e?(0,y.createElement)("div",{className:"dshp-hint"},t("lanLocalOnly")):a?a.lanEnabled===!1?pe({kind:"info",icon:Z.info,children:t("lanDisabledHint"),extra:(0,y.createElement)("div",{style:{marginTop:8}},G({variant:"primary",onClick:()=>nn(!0),disabled:c.lanToggle===!0},t("lanToggleTitleOn")))}):rn?(0,y.createElement)("div",null,la({src:a.lanQr,url:rn,hint:null}),we({label:t("lanPin"),desc:a?.lanAuthEnabled===!1?t("lanPinOff"):null,control:et(a?.lanAuthEnabled!==!1,()=>Er(a?.lanAuthEnabled===!1),c.lanAuth===!0,t("lanPin"))}),a?.lanAuthEnabled===!1?null:Te?.which==="lan"?un("lan"):a.lanToken?(0,y.createElement)("div",null,hn("lan",a.lanToken,[G({variant:"ghost",mini:!0,icon:Z.refresh,onClick:kr,disabled:c.refreshPin===!0},t("refresh")),mn("lan")]),a.lanPinCustom?(0,y.createElement)("div",{className:"dshp-warn-text"},t("pinCustomHint")):null):(0,y.createElement)("div",{className:"dshp-hint"},t(_e?"lanPinRemoteHint":"lanPinUnavailable")),we({label:t("advAddress"),control:G({variant:"ghost",mini:!0,onClick:()=>bn(x=>!x)},(a.lanIpOverride||t("lanAddressAuto"))+(fn?" ‹":" ›")),extra:fn?(0,y.createElement)("div",{className:"dshp-adv"},(0,y.createElement)("label",{className:"dshp-field"},t("lanAddress"),(0,y.createElement)("select",{className:"dshp-select",value:a.lanIpOverride||"",disabled:c.lanAddr===!0,onChange:x=>Lr(x.target.value)},(0,y.createElement)("option",{value:""},t("lanAddressAuto")),(a.lanCandidates||[]).map(x=>(0,y.createElement)("option",{key:x,value:x},x))))):null}),(0,y.createElement)("div",{className:"dshp-hint"},t("lanDebugHint"))):(0,y.createElement)("div",{className:"dshp-hint"},t("lanStarting")):(0,y.createElement)("div",{className:"dshp-loading"},t("loadingStatus"))}),tt({key:"wan",icon:Z.wan,title:t("wanAccess"),sub:t("namedWanHint"),right:et(!!ie,()=>ie?xr():an(),sn||c.wan===!0||c.saveNamed===!0||!a||_e,t("wanAccess")),children:_e?(0,y.createElement)("div",null,ie?la({src:a?.tunnelQr,url:ie,hint:t("namedRunningHint")}):null,(0,y.createElement)("div",{className:"dshp-hint"},t("wanLocalOnly"))):a?(0,y.createElement)("div",null,Or,zr):(0,y.createElement)("div",{className:"dshp-loading"},t("loadingStatus"))}),tt({key:"prefs",icon:Z.sliders,title:t("prefsTitle"),sub:t("prefsHint"),children:a?(0,y.createElement)("div",null,we({label:t("mobileRightbar"),desc:t("mobileRightbarHint"),control:et(a.mobileRightbarEnabled!==!1,()=>Tr(a.mobileRightbarEnabled===!1),c.prefs===!0,t("mobileRightbar"))}),we({label:t("mobilePinchZoom"),desc:t("mobilePinchZoomHint"),control:et(a.mobilePinchZoomEnabled===!0,()=>_r(a.mobilePinchZoomEnabled!==!0),c.prefs===!0,t("mobilePinchZoom"))}),we({label:t("mobileFontSize"),desc:t("mobileFontSizeHint"),control:(0,y.createElement)("select",{className:"dshp-select",value:String(Number(a.mobileFontSize)||0),disabled:c.prefs===!0,onChange:x=>Sr(Number(x.target.value))},Id.map(x=>(0,y.createElement)("option",{key:x,value:String(x)},x===0?t("mobileFontFollow"):`${x} px`)))})):(0,y.createElement)("div",{className:"dshp-loading"},t("loadingStatus"))}),a?.cache?tt({key:"cache",icon:Z.refresh,title:t("cacheTitle"),sub:t("cacheSub"),children:we({label:le(t,"cacheUsage",{used:j(a.cache.bytes),budget:j(a.cache.budgetBytes)}),desc:le(t,"cacheEntries",{n:a.cache.entries??0}),control:G({variant:"ghost",mini:!0,icon:Z.trash,onClick:Cr,disabled:c.cache===!0},t("cacheClear"))})}):null,tt({key:"reset",icon:Z.trash,title:t("resetFactory"),sub:t("resetIntro"),danger:!0,right:_e?(0,y.createElement)("div",{className:"dshp-hint"},t("resetLocalOnly")):G({variant:"danger",mini:!0,onClick:()=>Ye(!0),disabled:c.reset===!0},t("resetGo"))}),(0,y.createElement)("footer",{className:"dshp-footer"},s?.current?(0,y.createElement)("span",{title:t("updateHint")},le(t,"versionLine",{ver:s.current})):null,s?.current?(0,y.createElement)("span",null,"·"):null,(0,y.createElement)("a",{href:"https://github.com/daha1216/dsh-pocket#-怎么用",target:"_blank",rel:"noreferrer",title:t("updateHint")},t("updateDocLink")),(0,y.createElement)("span",null,"·"),(0,y.createElement)("span",null,t("developer")),(0,y.createElement)("span",null,"·"),(0,y.createElement)("a",{href:"https://github.com/daha1216/dsh-pocket",target:"_blank",rel:"noreferrer",title:t("starAsk")},t("starCta")),(0,y.createElement)("span",null,"·"),(0,y.createElement)("a",{href:"https://github.com/daha1216/dsh-pocket/issues",target:"_blank",rel:"noreferrer"},t("feedback"))),yt?da({title:t("resetTitle"),tone:"danger",onClose:()=>Ye(!1),children:(0,y.createElement)("div",{className:"dshp-modal-body"},t("resetBody")),actions:(0,y.createElement)("div",{className:"dshp-inline"},G({variant:"ghost",mini:!0,autoFocus:!0,onClick:()=>Ye(!1)},t("cancel")),G({variant:"danger",mini:!0,onClick:yr,disabled:c.reset===!0},t("resetConfirm")))}):null,be!==null?da({title:t(be?"lanToggleTitleOn":"lanToggleTitleOff"),tone:be?"brand":"warn",onClose:()=>Qe(null),children:(0,y.createElement)("div",{className:"dshp-modal-body"},t(be?"lanToggleBodyOn":"lanToggleBodyOff")),actions:(0,y.createElement)("div",{className:"dshp-inline"},G({variant:"ghost",mini:!0,autoFocus:!0,onClick:()=>Qe(null)},t("cancel")),G({variant:"primary",mini:!0,onClick:Ar},t("confirm")))}):null,$?da({title:t("disclaimerTitle"),tone:"warn",onClose:()=>te(!1),children:(0,y.createElement)("div",null,(0,y.createElement)("div",{className:"dshp-modal-body"},t("disclaimerBody")),(0,y.createElement)("label",{className:"dshp-check"},(0,y.createElement)("input",{type:"checkbox",checked:ne,onChange:x=>xt(x.target.checked)}),t("disclaimerAgree")),ne?null:(0,y.createElement)("div",{className:"dshp-err-text",style:{marginTop:8}},t("disclaimerHint"))),actions:(0,y.createElement)("div",{className:"dshp-inline"},G({variant:"ghost",mini:!0,autoFocus:!0,onClick:()=>te(!1)},t("cancel")),G({variant:"primary",mini:!0,disabled:!ne,onClick:vr},t("disclaimerAgree")))}):null,ln?(0,y.createElement)("div",{className:"dshp-toast",role:"status","aria-live":"polite"},ln):null)}function Fd(e){if(e?.connection)try{Object.defineProperty(e.connection,"isLoopback",{value:!0,writable:!0,configurable:!0})}catch{try{e.connection.isLoopback=!0}catch{}}let t=e.locale.bind(Ze);e.effect(()=>e.locale.register(Ze,{zh:Qa,en:fr}),"dsh-pocket: pocket locale dictionaries"),gr(e);let a=(n,o,i)=>e.connection.rpc.call(ve,n,o,i);e.slots.inject("settings.section",()=>e.slots.register({name:"settings.section",id:"pocket",order:1,label:()=>t("section"),inject:()=>({rpcCall:a,t})},Hd))}

    return module.exports;
  }
});
