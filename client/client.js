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
var qr=Object.create;var kt=Object.defineProperty;var Br=Object.getOwnPropertyDescriptor;var Wr=Object.getOwnPropertyNames;var Vr=Object.getPrototypeOf,jr=Object.prototype.hasOwnProperty;var Ur=(e,t)=>{for(var a in t)kt(e,a,{get:t[a],enumerable:!0})},bn=(e,t,a,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Wr(t))!jr.call(e,o)&&o!==a&&kt(e,o,{get:()=>t[o],enumerable:!(n=Br(t,o))||n.enumerable});return e};var pa=(e,t,a)=>(a=e!=null?qr(Vr(e)):{},bn(t||!e||!e.__esModule?kt(a,"default",{value:e,enumerable:!0}):a,e)),Gr=e=>bn(kt({},"__esModule",{value:!0}),e);var Dd={};Ur(Dd,{apply:()=>zd,inject:()=>Od,name:()=>Rd,redactStatus:()=>vn});module.exports=Gr(Dd);var x=require("react"),Md=pa(require("@deepseek-ai/dsh-client-ui-primitives"),1);var Se="/dsh-pocket",tt="data-dsh-pocket-mobile-rightbar",at="dsh-pocket:mobile-rightbar",qe="data-dsh-pocket-pinch-zoom",nt="dsh-pocket:mobile-pinch-zoom",Ce="data-dsh-pocket-mobile-font",ot="dsh-pocket:mobile-font-size",Ae="--dsh-pocket-mobile-font-size";var G=Object.freeze({status:"pocket.status",tunnelStart:"tunnel.start",tunnelStop:"tunnel.stop",tunnelSetConfig:"tunnel.setConfig",version:"pocket.version",update:"pocket.update",restart:"pocket.restart",lanTokenRefresh:"token.lanRefresh",lanAuthSetEnabled:"lanAuth.setEnabled",lanSetOverride:"lan.setOverride",lanSetEnabled:"lan.setEnabled",mobileRightbarSetEnabled:"mobile.rightbar.setEnabled",mobilePinchZoomSetEnabled:"mobile.pinchZoom.setEnabled",mobileFontSetSize:"mobile.font.setSize",pinSetCustom:"pin.setCustom",pocketReset:"pocket.reset",fileRead:"pocket.fileRead"});function ha(e,t){let a=String(e).replace(/^[vV]/,"").split("."),n=String(t).replace(/^[vV]/,"").split(".");for(let h=0;h<3;h++){let s=parseInt(a[h],10)||0,l=parseInt(n[h],10)||0;if(s!==l)return s-l}let o=String(e).replace(/^[vV]/,"").match(/-.*$/)?.[0]??"",i=String(t).replace(/^[vV]/,"").match(/-.*$/)?.[0]??"";if(!o&&!i)return 0;if(!o)return 1;if(!i)return-1;let r=o.slice(1).split("."),d=i.slice(1).split("."),p=Math.max(r.length,d.length);for(let h=0;h<p;h++){let s=r[h]??"",l=d[h]??"";if(s===l)continue;let m=/^\d+$/.test(s),E=/^\d+$/.test(l);return m&&E?Number(s)-Number(l):m?-1:E?1:s<l?-1:1}return 0}function gn(e){return String(e??"").trim().toLowerCase().replace(/^git\+/,"").replace(/\/+$/,"").replace(/\.git$/,"")}function wn(e,t){let a=gn(e);return a!==""&&a===gn(t)}function vn(e){return{proxyRunning:e?.proxyRunning===!0,proxyPort:e?.proxyPort??null,lanUrl:e?.lanUrl??null,lanQr:e?.lanQr??null,lanCandidates:Array.isArray(e?.lanCandidates)?e.lanCandidates:[],lanIpOverride:e?.lanIpOverride??"",tunnelRunning:e?.tunnelRunning===!0,tunnelUrl:e?.tunnelUrl??null,tunnelQr:e?.tunnelQr??null,tunnelState:e?.tunnelState??{phase:"idle"},tunnelConfig:e?.tunnelConfig??{mode:"named",hostname:"",tokenSet:!1},dshPort:e?.dshPort??null}}var Tt=require("react");var Kr=pa(require("@deepseek-ai/dsh-client-ui-primitives"),1),$r=()=>null,ua=e=>{let t=Kr;for(let a of e){let n=t[a];if(n!==void 0)return n}return $r},xn=ua(["IconPaperclipOutlineRegular","IconPaperclipOutline16"]),yn=ua(["IconPanelLeftOutlineRegular","IconPanelLeftOutline16"]),kn=ua(["IconFolderOpenOutlineRegular","IconFolderOpenOutline16"]);function ma(){return document.querySelector("[data-shell-overlay]")?.parentElement??null}var En=null;function D(){let e=En;if(e!==null&&e.isConnected&&e.getAttribute("data-mobile-nav")==="frame")return e;let a=document.querySelector('[data-mobile-nav="frame"]')??ma();return En=a,a}var Xr="[data-sidebar-right-expand]",Zr="[data-sidebar-right-toggle]";function Et(e=document,t=D()){let a=e.querySelector(Zr),n=e.querySelector(Xr),o=typeof n?.click=="function"?n:a;return typeof o?.click=="function"?(o.click(),!0):(t===null||(t.removeAttribute("data-aionui-preview-open"),t.setAttribute("data-aionui-explorer-open","")),!1)}function Tn({toggleSidebar:e,t}){let a=()=>{Et()},[n,o]=(0,Tt.useState)(!1);return(0,Tt.useEffect)(()=>{let i=()=>{let h=D();return h!==null&&!h.hasAttribute("data-sidebar-collapsed")};o(i());let r=0,d=()=>{r===0&&(r=requestAnimationFrame(()=>{r=0,o(i())}))},p=new MutationObserver(h=>{for(let s of h){if(s.type==="attributes"){if(s.attributeName==="data-sidebar-collapsed"){d();return}continue}let l=[...s.addedNodes,...s.removedNodes];if(l.length===0||!l.every(m=>m.nodeType===Node.TEXT_NODE)){d();return}}});return p.observe(document.documentElement,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["data-sidebar-collapsed"]}),()=>{r!==0&&cancelAnimationFrame(r),p.disconnect()}},[]),React.createElement(React.Fragment,null,React.createElement("button",{type:"button","data-mobile-nav":"toggle","aria-label":t(n?"close":"open"),"aria-expanded":n,title:t(n?"close":"open"),onClick:()=>e()},React.createElement(yn,{size:16})),React.createElement("button",{type:"button","data-mobile-nav":"files","aria-label":t("files"),title:t("files"),onClick:a},React.createElement(kn,{size:16})))}function _n({useInput:e,useSession:t,t:a}){let n=e(r=>r.phase!=="plain"),o=t(r=>r.subagent!==null),i=n||o;return React.createElement("button",{type:"button","data-mobile-nav":"file-upload","aria-label":a("fileUpload"),title:a("fileUpload"),disabled:i},React.createElement(xn,{size:16}))}var Sn=`
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
@keyframes dsh-web-mobile-sheet-up {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
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
    width: 100% !important;
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
    [data-mobile-nav="frame"] section[data-plugin-panel] > [class*="_pageHead"] {
      --dsh-web-mobile-panel-clearance: calc(60px - clamp(24px, 4vw, 48px));
      flex-wrap: nowrap !important;
      align-items: flex-start !important;
      gap: 8px !important;
    }
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
  .aionui-explorer-handle,
  .aionui-preview-handle {
    display: none !important;
  }
  [data-aionui-explorer-col],
  [data-aionui-preview-col] {
    position: fixed !important;
    z-index: 55 !important;
    background: var(--aion-bg-base, #ffffff) !important;
    border-left: none !important;
  }
  [data-aionui-explorer-col] {
    visibility: hidden !important;
    left: 8px !important;
    right: 8px !important;
    top: auto !important;
    bottom: 36px !important;
    width: auto !important;
    height: min(55vh, 460px) !important;
    height: min(55dvh, 460px) !important;
    max-height: calc(100vh - 44px) !important;
    max-height: calc(100dvh - 44px) !important;
    border-radius: 14px !important;
    overflow: hidden !important;
    box-shadow: 0 -4px 28px rgba(0, 0, 0, .18) !important;
    animation: dsh-web-mobile-sheet-up .24s var(--ds-ease-out, ease-in-out) !important;
  }
  [data-aionui-preview-col] {
    visibility: hidden !important;
    position: fixed !important;
    left: 8px !important;
    right: 8px !important;
    top: auto !important;
    bottom: 40px !important;
    width: auto !important;
    height: min(50vh, 420px) !important;
    height: min(50dvh, 420px) !important;
    max-height: calc(100vh - 48px) !important;
    max-height: calc(100dvh - 48px) !important;
    border-radius: 14px !important;
    overflow: hidden !important;
    box-shadow: 0 -4px 28px rgba(0, 0, 0, .18) !important;
    z-index: 56 !important;
    animation: dsh-web-mobile-sheet-up .24s var(--ds-ease-out, ease-in-out) !important;
    transition:
      left .24s var(--ds-ease-out, ease-in-out),
      right .24s var(--ds-ease-out, ease-in-out),
      top .24s var(--ds-ease-out, ease-in-out),
      bottom .24s var(--ds-ease-out, ease-in-out),
      width .24s var(--ds-ease-out, ease-in-out),
      height .24s var(--ds-ease-out, ease-in-out),
      border-radius .24s var(--ds-ease-out, ease-in-out),
      box-shadow .24s var(--ds-ease-out, ease-in-out),
      padding-top .24s var(--ds-ease-out, ease-in-out) !important;
  }
  [data-mobile-nav="frame"][data-aionui-preview-open] [data-aionui-preview-col] {
    visibility: visible !important;
  }
  [data-mobile-nav="frame"][data-aionui-explorer-open] [data-aionui-explorer-col] {
    visibility: visible !important;
  }
  [data-mobile-nav="frame"][data-aionui-preview-open] [data-aionui-explorer-col] {
    visibility: hidden !important;
  }
  [data-mobile-nav="frame"]:not([data-sidebar-collapsed]) [data-aionui-explorer-col],
  [data-mobile-nav="frame"]:not([data-sidebar-collapsed]) [data-aionui-preview-col] {
    visibility: hidden !important;
    display: none !important;
  }
  .aionui-floating-expand {
    display: none !important;
  }
  [data-mobile-nav="preview-full-toggle"] {
    position: absolute !important;
    right: 36px !important;
    top: 8px !important;
    z-index: 57 !important;
    display: none !important;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--aion-text-secondary, var(--dsw-alias-label-secondary, inherit));
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: background-color .15s, top .24s var(--ds-ease-out, ease-in-out);
  }
  [data-mobile-nav="preview-full-toggle"]::after {
    content: '';
    position: absolute;
    inset: -12px -4px;
  }
  @media (hover: hover) {
    [data-mobile-nav="preview-full-toggle"]:hover {
      background: var(--aion-bg-3, rgba(0, 0, 0, .22));
    }
  }
  [data-mobile-nav="preview-full-toggle"]:active {
    background: var(--aion-bg-active, rgba(0, 0, 0, .28));
  }
  [data-mobile-nav="preview-full-toggle"]:focus-visible {
    outline: 2px solid var(--dsw-alias-state-business-primary, #4f6ef7);
    outline-offset: 2px;
  }
  [data-mobile-nav="preview-full-toggle"] svg {
    width: 14px;
    height: 14px;
  }
  [data-aionui-preview-col] [class*="_tabScroll"] {
    padding-right: 34px !important;
  }
  [data-mobile-nav="frame"][data-aionui-preview-open] [data-aionui-preview-col] [data-mobile-nav="preview-full-toggle"] {
    display: inline-flex !important;
  }
  [data-mobile-nav="preview-full-toggle"] .dsh-web-mobile-full-out {
    display: none !important;
  }
  [data-mobile-nav="frame"][data-mobile-preview-full] [data-aionui-preview-col] [data-mobile-nav="preview-full-toggle"] .dsh-web-mobile-full-in {
    display: none !important;
  }
  [data-mobile-nav="frame"][data-mobile-preview-full] [data-aionui-preview-col] [data-mobile-nav="preview-full-toggle"] .dsh-web-mobile-full-out {
    display: inline !important;
  }
  [data-mobile-nav="frame"][data-aionui-preview-open][data-mobile-preview-full] [data-aionui-preview-col] {
    inset: 0 !important;
    left: 0 !important;
    right: 0 !important;
    top: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    height: 100vh !important;
    height: 100dvh !important;
    max-height: none !important;
    box-sizing: border-box !important;
    padding-top: env(safe-area-inset-top, 0px) !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    z-index: 57 !important;
    animation: none !important;
  }
  [data-mobile-nav="frame"][data-mobile-preview-full] [data-aionui-preview-col] [data-mobile-nav="preview-full-toggle"] {
    top: calc(env(safe-area-inset-top, 0px) + 8px) !important;
  }
  @media (prefers-reduced-motion: reduce) {
    [data-aionui-preview-col],
    [data-mobile-nav="preview-full-toggle"] {
      transition: none !important;
      animation: none !important;
    }
  }
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
  [data-aionui-explorer-col] [class*="_tabBar"]:not([class*="_tabBarRight"]) {
    height: 36px !important;
  }
  [data-aionui-explorer-col] [class*="_tabBtn"],
  [data-aionui-explorer-col] [class*="_tabBtnActive"] {
    padding: 0 12px !important;
    font-size: 13px !important;
  }
  [data-aionui-explorer-col] [class*="_searchBox"] {
    height: 32px !important;
    font-size: 13px !important;
  }
  [data-aionui-explorer-col] [class*="_treeRow"] {
    height: 30px !important;
    font-size: 13px !important;
  }
  [data-aionui-explorer-col] [class*="_treeRow"] svg {
    width: 14px !important;
    height: 14px !important;
  }
  [data-aionui-explorer-col] [class*="_scrollArea"] {
    padding-bottom: 28px !important;
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
  [data-aionui-explorer-col],
  [data-aionui-preview-col] {
    left: 0 !important;
    right: 0 !important;
    width: min(calc(100vw - 32px), 720px) !important;
    margin-left: auto !important;
    margin-right: auto !important;
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
  [data-mobile-nav="preview-full-toggle"],
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
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) button[class*="viewsMore"],
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="viewsMoreAnchor"] {
    display: none !important;
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
`);var Le="(max-width: 1023px) and (pointer: coarse)",Rn="(min-width: 1024px)",_t="(pointer: coarse)",On="(min-width: 1024px) and (pointer: coarse)";function z(e,t,a,n=Le){e.effect(()=>{let o=window.matchMedia(n),i,r=()=>{i?.(),i=o.matches?a(o):void 0};return r(),o.addEventListener("change",r),()=>{o.removeEventListener("change",r),i?.()}},t)}function Be(e,t){if(t!==null)try{if(t("(font: -apple-system-body) and (-webkit-touch-callout: none)"))return!0}catch{}let a=e.userAgent;return/iP(hone|ad|od)/.test(a)?!0:/Macintosh/.test(a)&&e.maxTouchPoints>1}var fa="--mobile-nav-header-h",Yr='[data-mobile-nav="frame"] [data-phase] header',it=null,We=null;function Nn(e){if(typeof document>"u")return;let t=document.documentElement;t.style.getPropertyValue(fa)!==e&&t.style.setProperty(fa,e)}function In(){let e=D(),t=it;return t===null||e===null||!(t instanceof HTMLElement)?"0px":`${Math.round(Math.max(0,t.getBoundingClientRect().bottom-e.getBoundingClientRect().top))}px`}function Pn(){Nn(In())}function Qr(){let e=it;Nn(e instanceof HTMLElement&&e.offsetHeight===0?"0px":In())}function Jr(){if(typeof document>"u")return;let e=document.querySelector(Yr);if(e===it){e!==null&&typeof ResizeObserver>"u"&&Pn();return}We?.disconnect(),it=e,e!==null&&typeof ResizeObserver<"u"&&(We=We??new ResizeObserver(()=>{Pn()}),We.observe(e)),Qr()}function Hn(){return{name:"header-metrics",scopes:["*"],ensure:()=>{Jr()},dispose:()=>{We?.disconnect(),We=null,it=null,typeof document<"u"&&document.documentElement.style.removeProperty(fa)}}}var ba="characterData";function Fn(e){return e.type==="attributes"?e.attributeName===null?"*":e.attributeName:e.type==="characterData"?ba:"*"}function zn(e){let t=e.onError??((w,S,T)=>{console.error(`[dsh-web-mobile] reconciler task ${w}${T==="dispose"?" dispose":""} failed`,S)}),a=new Set,n=null,o=new Set,i=!1,r=null,d=w=>{try{w.ensure()}catch(S){t(w.name,S,"ensure")}},p=w=>{try{w.dispose()}catch(S){t(w.name,S,"dispose")}},h=()=>{if(r!==null&&(r(),r=null),n===null){o.clear(),i=!1;return}let w=o,S=i;if(o=new Set,i=!1,S)for(let T of n)d(T);else if(w.size>0)for(let T of n){let v=T.scopes;(v===void 0||v.some(M=>w.has(M)))&&d(T)}},s=()=>{r===null&&(r=e.requestFrame(()=>{r=null,h()}))};return{get size(){return a.size},register:w=>(a.add(w),n!==null&&(n.add(w),d(w)),()=>{a.delete(w),n!==null&&n.delete(w)&&p(w)}),activate:()=>{n===null&&(n=new Set(a),i=!0,h())},deactivate:()=>{if(r!==null&&(r(),r=null),o.clear(),i=!1,n!==null){let w=n;n=null;for(let S of w)p(S)}},note:w=>{for(let S of w)o.add(S);s()},flush:h}}var Q="pocketMobileNav",Dn={open:"打开目录",close:"收起目录",backdrop:"点击关闭目录",back:"返回",backToConversation:"返回会话",sessionLog:"导出会话日志",downloadMenu:"下载",downloads:"下载记录",quickSettings:"设置",files:"文件浏览",fileUpload:"添加文件",fileUploadImage:"上传图片",fileUploadAttachment:"上传附件",previewFullscreen:"全屏预览",previewExitFullscreen:"退出全屏",questionExpand:"展开回答",questionCollapse:"收起回答",deleteSession:"删除会话",deleteConfirmTitle:"删除会话？",deleteConfirmDesc:"将删除「{title}」的完整会话记录，此操作不可恢复。",deleteConfirmYes:"删除",deleteConfirmNo:"取消",deletePending:"正在删除…",deleteErrorBusy:"该会话正在运行且无法停止，请稍后重试。",deleteErrorNotFound:"会话不存在或已被删除。",deleteErrorResolve:"无法确定要删除的会话，请重试。",deleteErrorGeneric:"删除失败：{message}"},qn={open:"Open directory",close:"Close directory",backdrop:"Click to close directory",back:"Back",backToConversation:"Back to conversation",sessionLog:"Session log",downloadMenu:"Downloads",downloads:"Downloads history",quickSettings:"Settings",files:"Files",fileUpload:"Add files",fileUploadImage:"Upload image",fileUploadAttachment:"Upload attachment",previewFullscreen:"Fullscreen preview",previewExitFullscreen:"Exit fullscreen",questionExpand:"Expand answer",questionCollapse:"Collapse answer",deleteSession:"Delete session",deleteConfirmTitle:"Delete session?",deleteConfirmDesc:"The complete log of “{title}” will be permanently removed. This cannot be undone.",deleteConfirmYes:"Delete",deleteConfirmNo:"Cancel",deletePending:"Deleting…",deleteErrorBusy:"This session is running and could not be stopped. Try again later.",deleteErrorNotFound:"The session does not exist or was already deleted.",deleteErrorResolve:"Could not identify the session to delete. Please try again.",deleteErrorGeneric:"Delete failed: {message}"};function Bn(e){z(e,"dsh-web-mobile: aionui explorer close marker",()=>{let t=a=>{let n=a.target;n===null||!n.closest(".aionui-collapse-chevron")||D()?.removeAttribute("data-aionui-explorer-open")};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)}),z(e,"dsh-web-mobile: preview sheet open marker",()=>{let t=()=>{D()?.removeAttribute("data-aionui-preview-open"),D()?.removeAttribute("data-mobile-preview-full")},a="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",n="5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",o=null,i=!1,r=["platform","userAgent","appVersion"],d=new Map,p=()=>{if(o!==null&&(window.clearTimeout(o),o=null),!!i){i=!1;for(let m of r){let E=d.get(m)??null;E===null?delete navigator[m]:Object.defineProperty(navigator,m,E)}d.clear()}},h=()=>{if(!i){for(let m of r)d.set(m,Object.getOwnPropertyDescriptor(navigator,m)??null);Object.defineProperty(navigator,"platform",{value:"Win32",configurable:!0}),Object.defineProperty(navigator,"userAgent",{value:a,configurable:!0}),Object.defineProperty(navigator,"appVersion",{value:n,configurable:!0}),i=!0}o!==null&&window.clearTimeout(o),o=window.setTimeout(p,1e3)},s=m=>{let E=m.target;if(E===null)return;let w=E.closest('[data-aionui-explorer-col] [class*="_treeRow"]');w!==null&&w.querySelector('[class*="_treeArrow"]:not([class*="_treeArrowEmpty"])')===null&&(h(),D()?.setAttribute("data-aionui-preview-open",""))},l=m=>{let E=m.target;E!==null&&E.closest('[data-aionui-preview-col] [class*="_panelCollapse"]')!==null&&t()};return document.addEventListener("click",s,!0),document.addEventListener("click",l,!0),()=>{p(),document.removeEventListener("click",s,!0),document.removeEventListener("click",l,!0)}})}function Wn(){return{name:"preview-close-sync",scopes:["style"],ensure:()=>{let e=document.querySelector("[data-aionui-preview-col]");e!==null&&e.style.visibility==="hidden"&&(D()?.removeAttribute("data-aionui-preview-open"),D()?.removeAttribute("data-mobile-preview-full"))},dispose:()=>{}}}function Vn(){let e=["[data-aionui-explorer-col]","[data-aionui-preview-col]"],t=new Map,a=new Map,n=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,o=p=>{let h=a.get(p);if(h!==void 0){a.delete(p);try{h.anim.cancel()}catch{}}},i=()=>{for(let p of e){let h=a.get(p);if(h===void 0)continue;if(!h.el.isConnected){o(p);continue}let s=document.querySelector(p);s!==null&&s!==h.el&&o(p)}},r=(p,h)=>{if(o(p),n())return;let s=h.animate([{opacity:0,transform:"translateY(28px)"},{opacity:1,transform:"none"}],{duration:280,easing:"cubic-bezier(.16, 1, .3, 1)",fill:"backwards"});a.set(p,{el:h,anim:s}),s.finished.then(()=>{a.get(p)?.anim===s&&a.delete(p)}).catch(()=>{})},d=[null,null];return{name:"sheet-rise-replay",scopes:["*","style","class","data-aionui-explorer-open","data-aionui-preview-open","data-mobile-preview-full"],ensure:()=>{let p=e.map((h,s)=>{let l=d[s];return l!==null&&l.isConnected&&l.matches(h)?l:d[s]=document.querySelector(h)});if(!(a.size===0&&p[0]===null&&p[1]===null)){i();for(let h=0;h<e.length;h++){let s=e[h],l=p[h];if(l===null){o(s);continue}let m=a.get(s);m!==void 0&&m.el!==l&&o(s);let E=getComputedStyle(l).visibility==="visible",w=t.get(s)??!1;E&&!w&&r(s,l),t.set(s,E)}}},dispose:()=>{for(let p of e)o(p);a.clear(),t.clear(),d[0]=d[1]=null}}}var jn="[data-composer-card], [data-composer-input], [contenteditable], input, textarea, button";function Un(e){let t=e.matches;if(typeof t=="function"&&t.call(e,jn))return!0;let a=e.querySelector;return typeof a=="function"&&a.call(e,jn)!==null}function Gn(e){let t=e.querySelectorAll;if(typeof t!="function"||typeof getComputedStyle!="function")return/\d\s*%/.test(e.textContent??"");for(let a of t.call(e,"svg circle")){let n=getComputedStyle(a).strokeDasharray;if(n!==""&&n!=="none"&&!/^(0px?)(\s+0px?)*$/.test(n))return!0}return!1}function es(e,t){return e.contains(t)||Un(e)?!1:Gn(e)}function ga(e){let t=e.closest("[data-composer-dock]");if(t!==null){let n=[...t.children].filter(i=>!i.contains(e)&&!Un(i)&&!i.hasAttribute("data-mobile-nav")),o=n.find(Gn)??(n.length===1?n[0]:void 0);if(o!==void 0)return{dock:t,ring:o}}let a=e.closest('[class*="_composerStack"]');for(let n=e.parentElement;n!==null;n=n.parentElement){let o=[...n.children].find(i=>es(i,e));if(o!==void 0)return{dock:n,ring:o};if(n===a)break}return null}function ts(e){return e===null||!e.isConnected||e.closest("[data-phase]")===null?!1:e.closest('[class*="_composerStack"]')!==null}var as=/^TPS\s+\d/,ns=/TPS\s+\d/,os=e=>{for(let[t,a]of e.entries())if(as.test((a.textContent??"").trim())&&!(a.children.length>0)&&a.parentElement!==null)return{index:t,mark:a.getAttribute("data-mobile-nav")!=="stats-tps"};return{index:-1,mark:!1}};function is(e,t,a,n){return e!==null?{el:e.el,reserve:e.reserve,live:t}:ns.test(a())?n():null}function rs(e,t,a,n){return e?t:a&&n}function Kn(){let e=(f,y)=>{getComputedStyle(f).position==="static"&&f.setAttribute("data-mobile-nav",y)},t=f=>{for(let y=f.parentElement;y!==null;y=y.parentElement)if(getComputedStyle(y).position!=="static")return y;return null},a=(f,y)=>{let k=t(f);if(k===null)return null;let R=y.getBoundingClientRect(),P=k.getBoundingClientRect(),O=f.getBoundingClientRect();return{host:f,left:R.left-P.left-k.clientLeft,top:R.top-P.top-k.clientTop-(O.height-R.height)/2}},n=f=>{let y=f.host;y.style.left!==`${f.left}px`&&(y.style.left=`${f.left}px`),y.style.top!==`${f.top}px`&&(y.style.top=`${f.top}px`)},o=f=>{let y=f.closest('[class*="_composerStack"]');if(y===null)return null;let k=f.querySelector(':scope > [data-mobile-nav="stats-tps-reserve"]'),R=[...y.querySelectorAll("div")],P=os(R);if(P.index<0)return null;let O=R[P.index];if(O===void 0)return null;k===null&&(k=document.createElement("span"),k.setAttribute("data-mobile-nav","stats-tps-reserve"),k.setAttribute("aria-hidden","true"),f.appendChild(k));let H=O.textContent??"";k.textContent!==H&&(k.textContent=H),P.mark&&O.setAttribute("data-mobile-nav","stats-tps");let B=O.parentElement;return B===null?null:(e(B,"stats-tps-row"),{el:O,reserve:k,live:H})},i=f=>{let{el:y,reserve:k}=f,R=a(y,k);return{el:y,measured:R,width:k.getBoundingClientRect().width}},r=f=>{f.measured!==null&&n(f.measured);let y=f.el,k=`${f.width}px`;y.style.maxWidth!==k&&(y.style.maxWidth=k)},d=f=>{let y=ga(f);if(y===null)return null;let{dock:k,ring:R}=y,P=document.querySelector('[data-composer-card] [class*="_row"] [class*="_trailing"]');if(P===null)return null;let O=P.querySelector(':scope > [data-mobile-nav="stats-ring-reserve"]'),H=P.querySelector(':scope > [class*="_primary"]');return O===null?(O=document.createElement("span"),O.setAttribute("data-mobile-nav","stats-ring-reserve"),P.insertBefore(O,H)):(H===null?P.lastElementChild!==O:O.nextElementSibling!==H)&&P.insertBefore(O,H),R.getAttribute("data-mobile-nav")!=="stats-ring"&&R.setAttribute("data-mobile-nav","stats-ring"),e(k,"stats-ring-dock"),{ring:R,reserve:O,measured:a(R,O)}},p=f=>{let y=o(f);y!==null&&r(i(y))},h=f=>{let y=d(f);y!==null&&y.measured!==null&&n(y.measured)},s=null,l=0,m="",E=f=>{if(f===null)return"none";let y=f.getBoundingClientRect();return`${Math.round(y.left)}:${Math.round(y.top)}:${Math.round(y.width)}`},w=()=>{let f=document.querySelector('[data-mobile-nav="stats"]');if(f===null)return;let y=f.getBoundingClientRect(),k=`${Math.round(y.left)}:${Math.round(y.top)}:${Math.round(y.width)}:${Math.round(y.height)}|${E(document.querySelector('[data-mobile-nav="stats-ring-reserve"]'))}`;if(k===m)return;m=k;let R=o(f),P=R===null?null:i(R),O=d(f);P!==null&&r(P),O!==null&&O.measured!==null&&n(O.measured)},S=()=>{l===0&&(l=requestAnimationFrame(()=>{l=0,w()}))},T="",v=null,M=null,C=null,b=null,_=null,u=(f,y)=>f!==null&&f.isConnected&&f.getAttribute("data-mobile-nav")===y,c=f=>{let y=ga(f);return y===null?!1:y.ring===C};return{name:"stats-line",scopes:["*",ba],ensure:()=>{s===null&&(s=S,window.addEventListener("resize",S),window.visualViewport?.addEventListener("resize",S));let f=_;if((f===null||!f.isConnected||!f.matches('[data-mobile-nav="stats"]'))&&(f=_=document.querySelector('[data-mobile-nav="stats"]')),f!==null&&ts(f)){let k=f.getBoundingClientRect(),R=`${Math.round(k.left)}:${Math.round(k.top)}:${Math.round(k.width)}:${Math.round(k.height)}`,P=u(v,"stats-tps"),O=u(M,"stats-tps-reserve"),H=P&&O&&v!==null&&M!==null?{el:v,reserve:M,live:""}:null,B=f.closest('[class*="_composerStack"]'),U=is(H,v?.textContent??"",()=>B?.textContent??"",()=>o(f)),K=`${R}|${U===null?"none":U.live}|${E(b)}`,$=rs(U===null,v===null&&M===null,u(v,"stats-tps"),u(M,"stats-tps-reserve"));if(K===T&&$&&u(C,"stats-ring")&&c(f)&&u(b,"stats-ring-reserve"))return;T=K;let te=U!==null&&U.el===v?o(f):U,I=te===null?null:i(te),F=d(f);I!==null&&r(I),F!==null&&F.measured!==null&&n(F.measured),v=te===null?null:te.el,M=te===null?null:te.reserve,C=F===null?null:F.ring,b=F===null?null:F.reserve,T=`${R}|${U===null?"none":U.live}|${E(b)}`;return}f?.removeAttribute("data-mobile-nav");let y=document.querySelector('[class*="_composerStack"]');if(y!==null)for(let k of['[class*="_root"]',"[data-slot]"])for(let R of y.querySelectorAll(k)){if(R.matches('[data-testid="todo-panel"]'))continue;let P=R.querySelectorAll("button");if(P.length>0&&![...P].every(H=>H.getAttribute("aria-haspopup")!==null))continue;let O=R.textContent??"";if(/(turns|steps|\bLLM\b|轮|步)/.test(O)&&R.querySelector("textarea, [data-composer-input]")===null){R.setAttribute("data-mobile-nav","stats"),p(R),h(R);return}}},dispose:()=>{l!==0&&(cancelAnimationFrame(l),l=0),m="",_=null,s!==null&&(window.removeEventListener("resize",s),window.visualViewport?.removeEventListener("resize",s),s=null);for(let f of document.querySelectorAll('[data-mobile-nav="stats-ring"], [data-mobile-nav="stats-tps"]')){let y=f;y.style.left="",y.style.top="",y.style.maxWidth=""}for(let f of["stats","stats-ring","stats-ring-dock","stats-tps","stats-tps-row"])for(let y of document.querySelectorAll(`[data-mobile-nav="${f}"]`))y.removeAttribute("data-mobile-nav");for(let f of document.querySelectorAll('[data-mobile-nav="stats-ring-reserve"], [data-mobile-nav="stats-tps-reserve"]'))f.remove()}}}function $n(e){let t=null,a=o=>{let i=D()?.hasAttribute("data-mobile-preview-full")??!1,r=e(i?"previewExitFullscreen":"previewFullscreen");o.getAttribute("aria-label")!==r&&(o.setAttribute("aria-label",r),o.title=r)},n=()=>{D()?.toggleAttribute("data-mobile-preview-full"),t!==null&&a(t)};return{name:"preview-fullscreen-toggle",scopes:["data-aionui-preview-open","data-mobile-preview-full"],ensure:()=>{let o=document.querySelector("[data-aionui-preview-col]");o!==null&&(t===null&&(t=document.createElement("button"),t.type="button",t.dataset.mobileNav="preview-full-toggle",t.innerHTML=['<svg class="dsh-web-mobile-full-in" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>",'<svg class="dsh-web-mobile-full-out" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>"].join(""),t.addEventListener("click",n)),a(t),t.parentElement!==o&&o.appendChild(t))},dispose:()=>{t?.remove(),t=null}}}function va(){wa?.()}var wa=null,ss=200,ls='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="18" height="18"><path d="M9.8 3.4 5.2 8l4.6 4.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',ds='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="18" height="18"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.67272 0.522841C10.8339 0.522841 11.76 0.522714 12.4963 0.602493C13.2453 0.683657 13.8789 0.854248 14.4264 1.25197C14.7504 1.48739 15.0355 1.77247 15.2709 2.0965C15.6686 2.64394 15.8392 3.27758 15.9204 4.02655C16.0002 4.7629 16 5.68895 16 6.85014V9.14986C16 10.3111 16.0002 11.2371 15.9204 11.9735C15.8392 12.7224 15.6686 13.3561 15.2709 13.9035C15.0355 14.2275 14.7504 14.5126 14.4264 14.748C13.8789 15.1458 13.2453 15.3163 12.4963 15.3975C11.76 15.4773 10.8339 15.4772 9.67272 15.4772H6.3273C5.16611 15.4772 4.24006 15.4773 3.50371 15.3975C2.75474 15.3163 2.1211 15.1458 1.57366 14.748C1.24963 14.5126 0.964549 14.2275 0.729131 13.9035C0.331407 13.3561 0.160817 12.7224 0.0796529 11.9735C-0.000126137 11.2371 1.25338e-09 10.3111 1.25338e-09 9.14986V6.85014C1.25329e-09 5.68895 -0.000126137 4.7629 0.0796529 4.02655C0.160817 3.27758 0.331407 2.64394 0.729131 2.0965C0.964549 1.77247 1.24963 1.48739 1.57366 1.25197C2.1211 0.854248 2.75474 0.683657 3.50371 0.602493C4.24006 0.522714 5.16611 0.522841 6.3273 0.522841H9.67272ZM5.54303 1.88715V14.1118C5.78636 14.1128 6.04709 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C6.04709 1.88307 5.78636 1.8862 5.54303 1.88715ZM4.1828 1.91166C3.99125 1.9216 3.8148 1.93577 3.65076 1.95353C3.01764 2.02212 2.65034 2.1506 2.37325 2.35179C2.16463 2.50337 1.98052 2.68747 1.82895 2.89609C1.62776 3.17318 1.49928 3.54048 1.43069 4.1736C1.36074 4.81967 1.36023 5.65896 1.36023 6.85014V9.14986C1.36023 10.341 1.36074 11.1803 1.43069 11.8264C1.49928 12.4595 1.62776 12.8268 1.82895 13.1039C1.98052 13.3125 2.16463 13.4966 2.37325 13.6482C2.65034 13.8494 3.01764 13.9779 3.65076 14.0465C4.29683 14.1164 5.13612 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C5.13612 1.88307 4.29683 1.88358 3.65076 1.95353C3.47672 1.97129 3.30027 1.98546 3.10872 1.9954L4.1828 1.91166Z" fill="currentColor"/></svg>';function Xn(e,t,a){let n=null,o=null,i=null,r=!1,d=()=>{let m=D();return m===null?!1:!m.hasAttribute("data-sidebar-collapsed")},p=null,h=()=>{let m=p;return m!==null&&m.isConnected&&m.matches('[data-phase="active"]')?!1:(p=document.querySelector('[data-phase="active"]'),p===null)},s=m=>{if(a!==null&&a.panelOpen()){m.preventDefault(),m.stopPropagation(),a.back();return}t()},l=()=>{if(o===null)return;let m=a!==null&&a.panelOpen(),E=m&&a!==null&&a.subpageOpen(),w=E?"back-level":m?"exit-panel":"open-drawer";if(o.dataset.mobileNavFabMode===w)return;o.dataset.mobileNavFabMode=w;let S=e(E?"back":m?"backToConversation":"open");o.setAttribute("aria-label",S),o.title=S,o.innerHTML=m?ls:ds};return{name:"overlay-backdrop-fab",scopes:["*","data-sidebar-collapsed","data-phase"],ensure:()=>{wa=()=>{n!==null&&(r=!0,n.style.pointerEvents="none",n.style.opacity="0")};let m=D();if(m===null){i!==null&&(window.clearTimeout(i),i=null),n?.remove(),n=null,o?.remove(),o=null;return}d()?n===null?(n=document.createElement("div"),n.dataset.mobileNav="backdrop",n.setAttribute("role","button"),n.setAttribute("aria-label",e("backdrop")),m.appendChild(n),r=!1):r&&i!==null&&(window.clearTimeout(i),i=null,r=!1,n.style.removeProperty("pointer-events"),n.style.removeProperty("opacity")):n!==null&&(n.style.pointerEvents="none",n.style.opacity="0",r=!0,i===null&&(i=window.setTimeout(()=>{i=null,n?.remove(),n=null},ss+60))),h()&&!d()&&o===null?(o=document.createElement("button"),o.type="button",o.dataset.mobileNav="fab",o.setAttribute("aria-label",e("open")),o.title=e("open"),o.addEventListener("click",s),m.appendChild(o)):(!h()||d())&&o!==null&&(o.remove(),o=null),l()},dispose:()=>{i!==null&&(window.clearTimeout(i),i=null),wa=null,p=null,n?.remove(),n=null,o?.remove(),o=null}}}function Zn(){let e=null,t=null;return{name:"file-viewer-open-marker",scopes:["*"],ensure:()=>{let a=D();if(a===null)return;let n=document.querySelector(".dsfv-panel")!==null;n===e&&a===t||(e=n,t=a,n?a.setAttribute("data-file-viewer-open",""):a.hasAttribute("data-file-viewer-open")&&a.removeAttribute("data-file-viewer-open"))},dispose:()=>{e=null,t=null,D()?.removeAttribute("data-file-viewer-open")}}}function se(e){if(typeof e!="object"||e===null)return;let t=e;if(typeof t.current=="string")return t.current;for(let a in t.byId){let n=t.byId[a];if(n===void 0)continue;let o=n.retainedBy?.mainView;if(typeof o=="number"&&o>0&&typeof n.id=="string")return n.id}}function Yn(e){return typeof e?.clear=="function"}function Qn(e){return typeof e?.open=="function"}var cs=4,ps=350;async function Jn(e){let t=e.attempts??cs,a=e.intervalMs??ps;for(let n=0;n<t;n+=1){try{await e.refresh?.()}catch{}if(!e.listed())return!0;n+1<t&&await e.sleep(a)}return!e.listed()}var eo='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.95317V10.0469" stroke="currentColor" stroke-width="1"/><path d="M4.25 6.29688L8 10.0469L11.75 6.29688" stroke="currentColor" stroke-width="1"/><path d="M1.5 10.0469V13.158C1.5 13.3937 1.60536 13.6198 1.79289 13.7865C1.98043 13.9532 2.23478 14.0469 2.5 14.0469H13.5C13.7652 14.0469 14.0196 13.9532 14.2071 13.7865C14.3946 13.6198 14.5 13.3937 14.5 13.158V10.0469" stroke="currentColor" stroke-width="1"/></svg>',hs='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1"/><path d="M8 4.6V8l2.2 1.6" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>';function to(e){let t=e.locale.bind(Q),a=()=>se(e.sessions.list.getSnapshot()),n=null,o=null,i=null,r=null,d=null,p=null,h=null,s=null,l=null,m=()=>{r?.remove(),r=null,d=null,p!==null&&document.removeEventListener("pointerdown",p,!0),p=null,h!==null&&document.removeEventListener("keydown",h,!0),h=null,s?.disconnect(),s=null,l!==null&&(window.removeEventListener("resize",l),window.removeEventListener("orientationchange",l)),l=null,o?.setAttribute("aria-expanded","false")},E=()=>{if(r===null||o===null)return;let C=o.getBoundingClientRect();r.style.top=`${Math.round(C.bottom+4)}px`,r.style.right=`${Math.round(window.innerWidth-C.right)}px`},w=(C,b,_)=>{let u=document.createElement("button");u.type="button",u.setAttribute("role","menuitem"),u.dataset.mobileNav=b,u.innerHTML=_;let c=document.createElement("span");return c.textContent=C,u.appendChild(c),u},S=()=>{if(o===null)return;if(r!==null){m();return}let C=document.createElement("div");C.dataset.mobileNav="session-log-menu",C.setAttribute("role","menu"),C.setAttribute("aria-label",t("downloadMenu"));let b=w(t("sessionLog"),"session-log-export",eo);b.disabled=a()===void 0,b.addEventListener("click",()=>{let c=a();m(),c!==void 0&&e.sessionLogDownload.download(c)}),C.appendChild(b),d=b;let _=window.DSHA;if(typeof _?.openDownloads=="function"){let c=w(t("downloads"),"session-log-downloads",hs);c.addEventListener("click",()=>{let A=_?.openDownloads?.();m(),A!==void 0&&A.catch(()=>{})}),C.appendChild(c)}document.body.appendChild(C),r=C,E(),o.setAttribute("aria-expanded","true"),p=c=>{let A=c.target;A instanceof Node&&(C.contains(A)||o!==null&&(A===o||o.contains(A))||m())},document.addEventListener("pointerdown",p,!0),h=c=>{c.key==="Escape"&&(c.preventDefault(),m())},document.addEventListener("keydown",h,!0);let u=D();u!==null&&(s=new MutationObserver(()=>{u.hasAttribute("data-sidebar-collapsed")&&m()}),s.observe(u,{attributes:!0,attributeFilter:["data-sidebar-collapsed"]})),l=()=>{E()},window.addEventListener("resize",l),window.addEventListener("orientationchange",l),window.setTimeout(()=>{b.focus({preventScroll:!0})},0)},T=()=>{d!==null&&(d.disabled=a()===void 0)},v=()=>{let C=D();return C===null?null:C.querySelector('[class*="sidebarCol"] [class*="logoRow"]')??C.querySelector('[class*="logoRow"]')},M=(C,b)=>{b.parentElement!==C&&C.appendChild(b)};return{name:"drawer-session-log",scopes:["*"],ensure:()=>{let C=v();C!==null&&(o===null&&(n=document.createElement("span"),n.dataset.mobileNav="session-log-wrap",o=document.createElement("button"),o.type="button",o.dataset.mobileNav="session-log",o.setAttribute("aria-haspopup","menu"),o.setAttribute("aria-expanded","false"),o.setAttribute("aria-label",t("downloadMenu")),o.title=t("downloadMenu"),o.innerHTML=eo,o.addEventListener("click",S),n.appendChild(o),i=e.sessions.list.subscribe(()=>{T()})),n!==null&&M(C,n),T())},dispose:()=>{m(),i?.(),i=null,n?.remove(),n=null,o=null}}}var us='<svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true" stroke-width="1.3"><path d="M8 9.75012C8.9665 9.75012 9.75 8.96662 9.75 8.00012C9.75 7.03362 8.9665 6.25012 8 6.25012C7.0335 6.25012 6.25 7.03362 6.25 8.00012C6.25 8.96662 7.0335 9.75012 8 9.75012Z" stroke="currentColor"/><path d="M13.0107 7.79377C12.9505 7.89401 12.9205 7.94413 12.9205 7.99951C12.9205 8.0549 12.9505 8.10502 13.0106 8.20528L13.9849 9.83006C14.045 9.93029 14.0751 9.9804 14.0751 10.0358C14.0751 10.0911 14.045 10.1413 13.9849 10.2415L13.0037 11.8777C12.9468 11.9726 12.9184 12.0201 12.8725 12.0461C12.8267 12.072 12.7713 12.072 12.6607 12.072H10.6704C10.5598 12.072 10.5045 12.072 10.4586 12.098C10.4128 12.1239 10.3843 12.1714 10.3274 12.2662L9.33825 13.9142C9.28133 14.009 9.25287 14.0564 9.20703 14.0823C9.16118 14.1083 9.10588 14.1083 8.99529 14.1083H7.00486C6.89426 14.1083 6.83896 14.1083 6.79312 14.0823C6.74727 14.0564 6.71881 14.009 6.6619 13.9142L5.67273 12.2662C5.61581 12.1714 5.58735 12.1239 5.54151 12.098C5.49566 12.072 5.44036 12.072 5.32977 12.072H3.33945C3.2288 12.072 3.17347 12.072 3.12761 12.0461C3.08176 12.0201 3.0533 11.9726 2.9964 11.8777L2.0152 10.2415C1.9551 10.1413 1.92505 10.0911 1.92505 10.0358C1.92505 9.9804 1.9551 9.93029 2.0152 9.83006L2.98951 8.20528C3.04963 8.10502 3.07969 8.0549 3.07969 7.99951C3.07968 7.94413 3.04961 7.89401 2.98946 7.79377L2.01529 6.17011C1.95514 6.06987 1.92507 6.01975 1.92507 5.96437C1.92506 5.90899 1.95512 5.85886 2.01524 5.7586L2.9964 4.1224C3.0533 4.0275 3.08176 3.98005 3.12761 3.95408C3.17347 3.92811 3.2288 3.92811 3.33945 3.92811H5.32977C5.44036 3.92811 5.49566 3.92811 5.54151 3.90216C5.58735 3.87621 5.61581 3.82879 5.67273 3.73397L6.6619 2.08599C6.71881 1.99116 6.74727 1.94375 6.79312 1.9178C6.83896 1.89185 6.89426 1.89185 7.00486 1.89185H8.99529C9.10588 1.89185 9.16118 1.89185 9.20703 1.9178C9.25287 1.94375 9.28133 1.99116 9.33825 2.08599L10.3274 3.73397C10.3843 3.82879 10.4128 3.87621 10.4586 3.90216C10.5045 3.92811 10.5598 3.92811 10.6704 3.92811H12.6607C12.7713 3.92811 12.8267 3.92811 12.8725 3.95408C12.9184 3.98005 12.9468 4.0275 13.0037 4.1224L13.9849 5.7586C14.045 5.85886 14.0751 5.90899 14.0751 5.96437C14.0751 6.01975 14.045 6.06987 13.9849 6.17011L13.0107 7.79377Z" stroke="currentColor" stroke-miterlimit="10"/></svg>',ms='[class*="sidebarCol"] [class*="triggerRow"]',ao='button[aria-haspopup="menu"]',fs=400,St="data-mobile-nav-quick-menu",bs="[data-mobile-nav-quick-menu]";function Ct(e){let t=e.locale.bind(Q),a=null,n=null,o=null,i=()=>{let E=D();return E===null?null:E.querySelector(ms)},r=()=>{o!==null&&(window.clearTimeout(o),o=null)},d=E=>{let w=document.documentElement;w.setAttribute("data-mobile-nav-quick","");let S=!1,T=()=>{S||(S=!0,r(),w.removeAttribute("data-mobile-nav-quick"))},v=()=>E.getAttribute("aria-expanded")==="true";v()||E.click(),requestAnimationFrame(()=>{let M=document.querySelectorAll('[role="menu"]'),b=(v()&&M.length>0?M[M.length-1]:null)?.querySelector('[role="menuitem"]')??null;if(b===null){v()&&E.click(),T();return}b.click(),o=window.setTimeout(()=>{v()&&E.click(),T()},fs)})},p=()=>{let E=i();if(E===null)return;let w=E.querySelector(ao);w!==null&&d(w)},h=()=>{a=document.createElement("span"),a.dataset.mobileNav="quick-settings-wrap",n=document.createElement("button"),n.type="button",n.dataset.mobileNav="quick-settings",n.setAttribute("aria-label",t("quickSettings")),n.setAttribute("aria-haspopup","dialog"),n.title=t("quickSettings"),n.innerHTML=us,n.addEventListener("click",p),a.appendChild(n)},s=E=>![...E.children].some(w=>w.getAttribute("data-phase")!==null||w.getAttribute("role")==="status"),l=()=>{for(let E of document.querySelectorAll(bs))E.removeAttribute(St)},m=E=>{let w=document.querySelectorAll('[role="menu"]'),S=w.length>0?w[w.length-1]??null:null;if(S===null)return;let T=E.querySelector(ao);if(!(T!==null&&T.getAttribute("aria-expanded")==="true"&&s(E))){S.removeAttribute(St);return}S.hasAttribute(St)||S.setAttribute(St,"")};return{name:"drawer-quick-settings",scopes:["*"],ensure:()=>{let E=i();E!==null&&((n===null||a===null)&&h(),a!==null&&a.parentElement!==E&&E.appendChild(a),m(E))},dispose:()=>{r(),document.documentElement.removeAttribute("data-mobile-nav-quick"),l(),a?.remove(),a=null,n=null}}}function no(e){return Number.isNaN(e)?1:Math.min(4,Math.max(1,e))}function ue(){return{scale:1,x:0,y:0}}function oo(e,t,a){if(!Number.isFinite(t)||t<=0)return{...e};if(!(e.scale>0))return ue();let n=no(e.scale*t);if(n===1)return ue();let o=n/e.scale;return{scale:n,x:a.x-(a.x-e.x)*o,y:a.y-(a.y-e.y)*o}}function At(e,t){let a=no(e.scale);if(a===1)return ue();let n=Number.isFinite(t.width)&&t.width>0?t.width:0,o=Number.isFinite(t.height)&&t.height>0?t.height:0,i=(a-1)*n/2,r=(a-1)*o/2,d=Number.isFinite(e.x)?Math.min(i,Math.max(-i,e.x)):0,p=Number.isFinite(e.y)?Math.min(r,Math.max(-r,e.y)):0;return{scale:a,x:d,y:p}}function io(e,t){let a=Math.hypot(e.x,e.y),n=Math.hypot(t.x,t.y);return a===0||!Number.isFinite(a)||!Number.isFinite(n)?1:n/a}function ro(e){return e.scale<=1?{scale:2.5,x:0,y:0}:ue()}function so(){let e=null,t=null,a=ue(),n=new Map,o=null,i=null,r=null,d=()=>({width:window.innerWidth,height:window.innerHeight}),p=()=>{for(let _ of document.body.querySelectorAll(':scope > [role="dialog"][aria-modal="true"]')){if(!(_ instanceof HTMLElement))continue;let u=_.querySelector(":scope > :first-child > img");if(u instanceof HTMLImageElement)return{root:_,image:u}}return null},h=()=>{t!==null&&(t.style.transform="",t.style.transformOrigin="",t.style.willChange="",t=null)},s=()=>{e!==null&&(e.removeEventListener("pointerdown",w),e.removeEventListener("pointermove",S),e.removeEventListener("pointerup",T),e.removeEventListener("pointercancel",v),e.removeEventListener("gesturestart",M),e.removeEventListener("touchmove",C),e.getAttribute("data-mobile-nav")==="image-lightbox"&&e.removeAttribute("data-mobile-nav")),h(),n.clear(),o=null,i=null,r=null,a=ue(),e=null},l=()=>{if(t===null)return{x:0,y:0};let _=t.getBoundingClientRect();return{x:_.left+_.width/2-a.x,y:_.top+_.height/2-a.y}},m=()=>{t!==null&&(t.style.transform="translate3d("+a.x+"px, "+a.y+"px, 0) scale("+a.scale+")")},E=()=>{let _=[...n.values()],u=_[0],c=_[1];if(u===void 0||c===void 0)return;let A={x:(u.x+c.x)/2,y:(u.y+c.y)/2},f=l();i={startSpan:{x:c.x-u.x,y:c.y-u.y},startMid:A,startZoom:{...a},anchor:{x:A.x-f.x,y:A.y-f.y}},o=null},w=_=>{if(_.pointerType!=="mouse"){if(n.set(_.pointerId,{x:_.clientX,y:_.clientY}),n.size>=2){E();return}o={pointerId:_.pointerId,startX:_.clientX,startY:_.clientY,originX:a.x,originY:a.y,moved:!1,startedOnImage:_.target===t}}},S=_=>{if(!n.has(_.pointerId))return;let u={x:_.clientX,y:_.clientY};if(n.set(_.pointerId,u),n.size>=2){if(i===null){E();return}let f=[...n.values()],y=f[0],k=f[1];if(y===void 0||k===void 0)return;let R={x:(y.x+k.x)/2,y:(y.y+k.y)/2},P=io(i.startSpan,{x:k.x-y.x,y:k.y-y.y}),O=oo(i.startZoom,P,i.anchor);a=At({scale:O.scale,x:O.x+(R.x-i.startMid.x),y:O.y+(R.y-i.startMid.y)},d()),m();return}if(o===null||o.pointerId!==_.pointerId||!o.startedOnImage)return;let c=u.x-o.startX,A=u.y-o.startY;(Math.abs(c)>4||Math.abs(A)>4)&&(o.moved=!0),a=At({scale:a.scale,x:o.originX+c,y:o.originY+A},d()),m()},T=_=>{if(!n.delete(_.pointerId))return;if(n.size>=2){E();return}if(n.size===1){let A=[...n.entries()][0];if(i=null,o=null,A!==void 0){let[f,y]=A;o={pointerId:f,startX:y.x,startY:y.y,originX:a.x,originY:a.y,moved:!0,startedOnImage:!0}}return}let u=o;if(o=null,i=null,u===null||u.pointerId!==_.pointerId||!u.startedOnImage||u.moved){r=null;return}let c=Date.now();if(r!==null&&c-r.at<=320&&Math.hypot(_.clientX-r.x,_.clientY-r.y)<=28){a=At(ro(a),d()),r=null,m();return}r={at:c,x:_.clientX,y:_.clientY}},v=_=>{n.delete(_.pointerId),n.size<2&&(i=null),n.size===0&&(o=null,r=null)},M=_=>{_.preventDefault()},C=_=>{_.touches.length>1&&_.preventDefault()},b=(_,u)=>{e=_,t=u,a=ue(),n.clear(),o=null,i=null,r=null,e.setAttribute("data-mobile-nav","image-lightbox"),t.style.transformOrigin="50% 50%",t.style.willChange="transform",e.addEventListener("pointerdown",w),e.addEventListener("pointermove",S),e.addEventListener("pointerup",T),e.addEventListener("pointercancel",v),e.addEventListener("gesturestart",M),e.addEventListener("touchmove",C,{passive:!1})};return{name:"image-lightbox-zoom",scopes:["*"],ensure:()=>{let _=p();if(_===null){s();return}if(e===_.root){t!==_.image&&(h(),t=_.image,a=ue(),t.style.transformOrigin="50% 50%",t.style.willChange="transform");return}s(),b(_.root,_.image)},dispose:()=>{s()}}}var Ve=new WeakMap,xa=!1;function ya(){xa=!0}function ka(){xa=!1}function Ea(){return xa}function Lt(e){return typeof e=="object"&&e!==null&&"parentElement"in e&&e.parentElement!==void 0}function lo(e,t,a){let n=performance.now()+t;if(!Lt(e)){if(typeof e!="object"&&typeof e!="function"||e===null)return;Ve.set(e,n);return}let o=e;for(;o!==null&&(Ve.set(o,n),o!==a);)o=Lt(o.parentElement)?o.parentElement:null}function rt(e){let t=performance.now(),a=e.target;if(!Lt(a)){if(typeof a!="object"&&typeof a!="function"||a===null)return!1;let o=Ve.get(a);return o===void 0?!1:o<=t?(Ve.delete(a),!1):!0}let n=a;for(;n!==null;){let o=Ve.get(n);if(o!==void 0)if(o<=t)Ve.delete(n);else return!0;n=Lt(n.parentElement)?n.parentElement:null}return!1}var gs=["node","session","summary","result"],ws=["sessionId","id"],vs=["__reactFiber$","__reactInternalInstance$"];function xs(e){if(typeof e!="object"||e===null)return null;let t=e.id;return typeof t=="string"?t:null}function ys(e,t){if(e==null)return null;for(let a of gs){let n=xs(e[a]);if(n!==null&&t(n))return n}for(let a of ws){let n=e[a];if(typeof n=="string"&&t(n))return n}return null}function Mt(e,t,a=60){let n=e;for(let o=0;o<a&&n!==null&&n!==void 0;o+=1){let i=ys(n.memoizedProps,t);if(i!==null)return i;n=n.return}return null}function Rt(e){if(e==null||typeof e!="object")return null;let t=e;for(let a of vs)for(let n of Object.keys(t)){if(!n.startsWith(a))continue;let o=t[n];if(typeof o=="object"&&o!==null)return o}return null}function Ta(e,t,a){return Math.abs(t.x-e.x)<=a&&Math.abs(t.y-e.y)<=a}var ks=.45;function co(e,t=ks){return Math.round(e*t)}var _a=8,Es=.16,po=.13,vo=60,Ts=.45,_s=.45,Re=350,Ss=300,Cs=8,Ne=110,ho=280,uo=101,As=.45,Ls=.16,Ms=.45,we=0,Ie=!1,ve=[],dt=0,Ca=0,He=!1,xe=0,lt=null,J=null,Fe=!1,xo=0,Oe=!1,me=!1,ct=!1,Pe="drawer",Aa=!1,yo=()=>!1;function Rs(e,t,a){let n=a?-t.dx:t.dx;if(Math.abs(n)<=e.lockPx||Math.abs(n)<=Math.abs(t.dy))return"none";if(e.drawerOpen){if(Math.abs(n)/e.viewportWidthPx>=e.closeDistanceRatio)return"close";let r=a?-t.velX:t.velX;return r>0!=n>0?"none":Math.abs(r)>=e.closeVelocity?"close":"none"}return n<=0?"none":n/e.viewportWidthPx>=e.openDistanceRatio||(a?-t.velX:t.velX)>=e.openVelocity?"open":"none"}function Os(e,t,a){let n=a?-t.dx:t.dx;if(Math.abs(n)<=e.lockPx||Math.abs(n)<=Math.abs(t.dy))return"none";let o=a?-t.velX:t.velX;if(n<0)return e.panelOpen||e.drawerOpen?"none":-n/e.viewportWidthPx>=e.distanceRatio?"files":o>0!=n>0?"none":-o>=e.velocity?"files":"none";if(e.drawerOpen){let i=e.drawerCloseDistanceRatio??e.distanceRatio;return n/e.viewportWidthPx>=i?"close":o<=0?"none":o>=e.velocity?"close":"none"}return e.panelOpen?n/e.viewportWidthPx>=e.distanceRatio?"files":o>0!=n>0?"none":o>=e.velocity?"files":"none":"none"}function Ps(e,t,a){let n=a-t,o=e.filter(p=>p.t>=n);if(o.length<2)return 0;let i=o[o.length-2],r=o[o.length-1],d=r.t-i.t;return d<=0?0:(r.x-i.x)/d}function Ns(e,t,a,n){let o=a?t-e:e;return o>=0&&o<=n.startZonePx}function mo(e,t,a,n){let o=a?e:t-e;return o>=0&&o<=n}function Is(e,t){return e||!t?"drawer":"files"}function Hs(e,t,a,n){let o=e<=0?-1:1,i=Math.abs(e),r=a?-t:t;return n?r>=0?null:o*Math.min(i,-r)+0:r<=0?null:o*(i-Math.min(i,r))+0}function ko(e,t){let a=t?-e:e;return a<=0?null:t?`translateX(max(0px, calc(${uo}% - ${a}px)))`:`translateX(min(0px, calc(-${uo}% + ${a}px)))`}function Fs(e){let t=e;for(;t!==null;){if((t.overflowX==="auto"||t.overflowX==="scroll")&&t.scrollWidth>t.clientWidth+1)return t;t=t.parent}return null}function Ke(){let e=D();return e!==null&&e.firstElementChild instanceof HTMLElement?e.firstElementChild:null}function La(){let e=D();return e!==null&&!e.hasAttribute("data-sidebar-collapsed")}function zs(){let e=document.querySelector("[data-sidebar-right-panel]");return e!==null&&e.hasAttribute("data-sidebar-right-open")}function Ds(e){let t=null,a=e;for(;a!==null;)t={parent:t,scrollWidth:a.scrollWidth,clientWidth:a.clientWidth,overflowX:getComputedStyle(a).overflowX},a=a.parentElement;return t}function Ht(){return document.querySelector('[aria-modal="true"]')!==null}function Ma(){return document.documentElement.hasAttribute("data-dsh-taskboard-active")||document.documentElement.hasAttribute("data-dsh-ssh-active")||document.querySelector("[data-conversation-composer-overlay]")!==null}function Eo(){if(typeof window>"u")return!1;let e=window.getSelection();if(e!==null&&!e.isCollapsed)return!0;if(typeof document>"u")return!1;let t=document.activeElement;if(t===null)return!1;let a=t.tagName;if(a!=="TEXTAREA"&&a!=="INPUT")return!1;try{let{selectionStart:n,selectionEnd:o}=t;return typeof n=="number"&&typeof o=="number"&&n!==o}catch{return!1}}function To(){return performance.now()<xe}function _o(e){return document.documentElement.hasAttribute("data-mobile-nav-dragging")||document.body.hasAttribute("data-mobile-nav-dragging")?!0:e.target instanceof Element&&e.target.closest("[data-mobile-nav-dragging]")!==null}var fo=200;function qs(e){let t=e.closest(".dsh-pet-root");if(t!==null)return t;if(e.closest('[data-mobile-nav="frame"]')!==null)return null;let a=e;for(;a!==null;){if(a instanceof HTMLElement){let n=getComputedStyle(a);if((n.position==="fixed"||n.position==="absolute")&&a.offsetWidth<=fo&&a.offsetHeight<=fo)return a}a=a.parentElement}return null}function So(e){return e.target instanceof Element&&qs(e.target)!==null}function bo(){J=null,Fe=!1,me=!1,ct=!1,Oe=It();let e=Ke();if(e===null||!He)return;J=e;let t=e.getBoundingClientRect().width*Ne/100;xo=Oe?t:-t}var Sa=!1,je=0;function Ra(){if(!Sa)return;Sa=!1,J?.style.removeProperty("content-visibility");let e=Ke();e!==null&&e!==J&&e.style.removeProperty("content-visibility")}function Bs(e){if(me||ct)return;let t=Ke();if(t===null||Ht()||Ma()){ct=!0;return}J=t,Fe=!0,t.style.setProperty("transition","none","important");let a=ko(1e-4,Oe);t.style.setProperty("transform",a??`translateX(-${Ne}%)`,"important"),t.style.willChange="transform",t.style.setProperty("content-visibility","hidden","important"),Sa=!0,me=!0,e.layout.toggleSidebar(),je=requestAnimationFrame(()=>{je=requestAnimationFrame(()=>{je=0,Ra()})})}function go(e,t){if(!Ie||Pe!=="drawer")return;if(!He){let n=Oe?-t:t;if(!me&&(n<Cs||(Bs(e),!me)))return;let o=ko(t,Oe);if(o===null){J?.style.setProperty("transform",`translateX(-${Ne}%)`,"important");return}J?.style.setProperty("transform",o,"important");return}if(J===null)return;let a=Hs(xo,t,Oe,He);if(a===null){Fe=!0,J.style.setProperty("transition","none","important"),J.style.setProperty("transform","translateX(0px)","important");return}Fe=!0,J.style.setProperty("transition","none","important"),J.style.setProperty("transform",`translateX(${a}px)`,"important")}function Nt(){let e=J;!Fe||e===null||(Fe=!1,e.style.removeProperty("transition"),e.style.removeProperty("transform"))}var Ue=null;function Ot(){let e=Ue;if(e===null)return;Ue=null,window.clearTimeout(e.timer),e.el.style.removeProperty("transition"),e.el.style.removeProperty("transform");let t=D();t!==null&&!t.hasAttribute("data-sidebar-collapsed")&&e.ctx.layout.toggleSidebar()}function Co(e,t,a){let n=Ue;if(!(n!==null&&n.el===t&&n.target===a)){if(Ot(),window.matchMedia("(prefers-reduced-motion: reduce)").matches){va(),xe=performance.now()+Re,Ue={el:t,ctx:e,timer:0,target:a},Ot();return}t.style.setProperty("transition",`transform ${ho}ms ease-in-out`,"important"),t.style.getPropertyValue("transform")!==""&&t.getBoundingClientRect(),t.style.setProperty("transform",a,"important"),va(),xe=performance.now()+Re,Ue={el:t,ctx:e,timer:window.setTimeout(Ot,ho+40),target:a}}}function Pt(e){let t=J;if(J=null,Fe=!1,t===null){Nt(),e.layout.toggleSidebar(),xe=performance.now()+Re;return}let a=Oe?`translateX(${Ne}%)`:`translateX(-${Ne}%)`;Co(e,t,a)}function Ao(e){if(!La()||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return!1;let t=Ke();if(t===null)return!1;let a=It()?`translateX(${Ne}%)`:`translateX(-${Ne}%)`;return Co(e,t,a),!0}function Me(e,t=!1){if(Ue!==null){t&&Ot();return}let a=me;if(me=!1,ct=!1,Ra(),a&&e!==null&&J!==null&&!t){Ge(),Pt(e);return}Nt(),Ge(),a&&e!==null&&(e.layout.toggleSidebar(),xe=performance.now()+Re)}function Ws(e,t,a){if(To()||Ht()||Ma()||Eo()||_o(e)||So(e)||!(e.target instanceof Element)||Fs(Ds(e.target))!==null||e.target.closest('[class*="_composerSeat"], [data-composer-card], [class*="_dock"]')!==null)return!1;let n=La(),o=co(a,As);if(n){let i=D();if(i===null)return!1;let r=i.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom||e.target.closest('[class*="sessionRow"] button')!==null)return!1;let d=Ke(),p=d===null?null:d.getBoundingClientRect(),h=p!==null&&e.clientX>=p.left&&e.clientX<=p.right;Pe=Is(h,mo(e.clientX,a,t,o))}else if(Ns(e.clientX,a,t,{startZonePx:co(a)}))Pe="drawer";else if(mo(e.clientX,a,t,o))Pe="files";else return!1;return we=e.pointerId,Ie=!1,dt=e.clientX,Ca=e.clientY,ve=[{t:e.timeStamp,x:e.clientX}],!0}function Vs(e){let t=e.clientX-dt,a=e.clientY-Ca;return Math.max(Math.abs(t),Math.abs(a))<_a?!1:_o(e)||So(e)||Math.abs(t)<=Math.abs(a)?(Ge(),!1):(Ie=!0,He=La(),Pe==="files"?(Aa=zs(),He&&bo(),ya(),!0):(ya(),bo(),!0))}function wo(e){ve.push({t:e.timeStamp,x:e.clientX});let t=e.timeStamp-vo,a=0;for(;a<ve.length-1&&ve[a].t<t;)a+=1;a>0&&(ve=ve.slice(a))}function js(e,t,a,n){let o=Ie,i=me;me=!1,ct=!1;let r=Pe==="files",d=Aa,p=Ps(ve,vo,t.timeStamp),h=t.clientX-dt,s=t.clientY-Ca;if(Ge(),!o){i&&Pt(e);return}let m=Ht()||!i&&To()?"none":r?Os({distanceRatio:Ls,velocity:Ms,lockPx:_a,viewportWidthPx:n,panelOpen:d,drawerOpen:He,drawerCloseDistanceRatio:po},{dx:h,dy:s,velX:p},a):Rs({openDistanceRatio:Es,closeDistanceRatio:po,openVelocity:Ts,closeVelocity:_s,lockPx:_a,viewportWidthPx:n,drawerOpen:He},{dx:h,dy:s,velX:p},a);if(Ra(),i){m==="open"?(Nt(),xe=performance.now()+Re):Pt(e),t.target instanceof Element&&st(t.target);return}if(t.target instanceof Element){if(m==="close"){st(t.target),Pt(e);return}Nt(),m==="open"&&(st(t.target),e.layout.toggleSidebar(),xe=performance.now()+Re),m==="files"&&(yo(),st(t.target),xe=performance.now()+Re),r&&m==="none"&&st(t.target)}}function st(e){let t=Ke(),a=t!==null&&t.contains(e)?t:D()??null;lo(e,Ss,a),lt=e}function Ge(){we=0,Ie=!1,ve=[],Pe="drawer",Aa=!1,ka()}function It(){let e=D();return e!==null&&getComputedStyle(e).direction==="rtl"}function Lo(e,t){z(e,"dsh-web-mobile: sidebar swipe gestures",()=>{yo=t;let a=()=>window.innerWidth||document.documentElement.clientWidth||0,n=l=>{if(lt=null,ka(),!(l.pointerType!=="touch"&&l.pointerType!=="pen")){if(we!==0&&we!==l.pointerId){Me(e);return}Ws(l,It(),a())}},o=l=>{if(l.pointerId===we){if(Ht()||Ma()){Me(e);return}if(Ie)wo(l),go(e,l.clientX-dt);else{if(Eo()){Ge();return}Vs(l)&&(wo(l),go(e,l.clientX-dt))}}},i=l=>{l.pointerId===we&&js(e,l,It(),a())},r=l=>{l.pointerId===we&&Me(e)},d=l=>{if(lt===null||!(l.target instanceof Element))return;let m=l.target.closest('[data-mobile-nav="backdrop"], [data-mobile-nav="fab"]');m!==null&&!m.contains(lt)||rt(l)&&(l.stopPropagation(),l.preventDefault(),lt=null)},p=()=>{document.hidden&&Me(e)},h=l=>{if(we!==0){if(l.touches.length!==1||!l.cancelable||document.hidden){Me(e);return}Ie&&l.preventDefault()}};document.addEventListener("pointerdown",n,!0),document.addEventListener("pointermove",o,!0),document.addEventListener("pointerup",i,!0),document.addEventListener("pointercancel",r,!0),document.addEventListener("click",d,!0),document.addEventListener("touchmove",h,{capture:!0,passive:!1});let s=()=>Me(e);return document.addEventListener("visibilitychange",p),window.addEventListener("blur",s),()=>{document.removeEventListener("pointerdown",n,!0),document.removeEventListener("pointermove",o,!0),document.removeEventListener("pointerup",i,!0),document.removeEventListener("pointercancel",r,!0),document.removeEventListener("click",d,!0),document.removeEventListener("touchmove",h,{capture:!0}),document.removeEventListener("visibilitychange",p),window.removeEventListener("blur",s),je!==0&&(cancelAnimationFrame(je),je=0),Me(e,!0)}})}var Mo=12,$e=null,Us='button[data-dsh-taskboard-entry], button[data-dsh-ssh-entry], [class*="newSession"], [class*="sessionRow"], [class*="searchResultRow"], [class*="searchResultWorkspace"], [class*="panelRow"]';function pt(e){Ao(e)||e.layout.toggleSidebar()}function Ro(e){z(e,"dsh-web-mobile: drawer close (Escape + navigate)",()=>{let t=()=>{pt(e)},a=()=>{let k=D();return k!==null&&!k.hasAttribute("data-sidebar-collapsed")},n=k=>{k.key==="Escape"&&document.querySelector('[aria-modal="true"]')===null&&a()&&t()},o=()=>document.querySelector('[data-mobile-nav="frame"] > :first-child'),i=k=>{if(document.querySelector('[aria-modal="true"]')!==null||!a()||!(k instanceof Element))return!1;let R=o();return R===null||!R.contains(k)||k.closest('[class*="sessionRow"] button')!==null||k.closest('button[class*="panelRow"][aria-haspopup="menu"]')!==null?!1:k.closest(Us)!==null},r=k=>!(k instanceof Element&&k.closest("[data-dsha-session-select]")!==null)&&i(k),d=0,p="",h=null,s=null,l=k=>{if(!k.isTrusted)return;let R=k.target;R instanceof Element&&R.closest('[class*="sessionRow"] [class*="_title"]')!==null&&(k.preventDefault(),k.stopPropagation())},m=()=>o()?.querySelector('[role="treeitem"][aria-selected="true"]')?.querySelector('[class*="_title"]')?.textContent?.trim()??null,E=()=>{h?.disconnect(),h=null,s!==null&&window.clearTimeout(s),s=null,p=""},w=()=>{E(),p=m()??"";let k=o();k!==null&&(h=new MutationObserver(()=>{if(!a()){E();return}let R=m();R!==null&&R!==p&&(E(),t())}),h.observe(k,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-selected"]}),s=window.setTimeout(E,2e3))},S=k=>e.sessions.list.getSnapshot().byId[k]!==void 0,T=(k,R)=>{if($e===null||!Ta($e,{x:R.clientX,y:R.clientY},Mo))return null;let P=Mt(Rt(k),S);return P===null||se(e.sessions.list.getSnapshot())===P?null:P},v=null,M=!1,C=0,b=()=>{M=!0,v?.(),v=null,C!==0&&(window.clearTimeout(C),C=0)},_=k=>{b(),M=!1;let R=()=>{M||(b(),a()&&t())};v=e.sessions.list.subscribe(()=>{se(e.sessions.list.getSnapshot())===k&&(C!==0&&window.clearTimeout(C),C=window.setTimeout(()=>{C=0,R()},0))})},u=0,c=k=>{u=performance.now(),$e=k.pointerType==="touch"||k.pointerType==="pen"?{x:k.clientX,y:k.clientY}:null},A=k=>{let R=k.target;if(Ea()||rt(k))return;if(R instanceof Element&&R.closest('[data-mobile-nav="backdrop"]')!==null){a()&&t();return}let P=R instanceof Element?R.closest('[role="treeitem"][data-dsha-session-select]'):null;if(P!==null&&k.detail>0&&i(R)){if(k.defaultPrevented||$e!==null&&(performance.now()-u>=500||!Ta($e,{x:k.clientX,y:k.clientY},Mo)))return;k.preventDefault(),k.stopPropagation(),E(),b(),d=performance.now(),P.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,detail:0}));return}performance.now()-d<500||r(R)&&t()},f=k=>{if(Ea()||rt(k)||k.pointerType!=="touch"&&k.pointerType!=="pen")return;let R=k.target;if(!(R instanceof Element)||!r(R))return;let P=R.closest('[role="treeitem"]');if(P!==null){if(d=performance.now(),P.getAttribute("aria-selected")==="true")t();else{let O=T(P,k);O===null?(b(),w()):(E(),Qn(e.sessions)?(_(O),e.sessions.open(O)):(b(),w()))}return}},y=()=>{a()&&t()};return document.addEventListener("dsha-session-open",y),document.addEventListener("dblclick",l,!0),document.addEventListener("keydown",n,!0),document.addEventListener("click",A,!0),document.addEventListener("pointerdown",c,!0),document.addEventListener("pointerup",f,!0),()=>{E(),b(),$e=null,document.removeEventListener("dsha-session-open",y),document.removeEventListener("dblclick",l,!0),document.removeEventListener("keydown",n,!0),document.removeEventListener("click",A,!0),document.removeEventListener("pointerdown",c,!0),document.removeEventListener("pointerup",f,!0)}})}var Oa=!1,Pa=!1,Ft=zn({requestFrame:e=>{let t=0;return t=requestAnimationFrame(()=>{t=0,e()}),()=>{t!==0&&cancelAnimationFrame(t)}}});function Oo(e){return Oa?()=>{}:(Oa=!0,z(e,"dsh-web-mobile: DOM reconciler",()=>{let t=new MutationObserver(a=>{let n=new Set;for(let o of a)(o.target instanceof Element?o.target:o.target.parentElement)?.closest("[data-chat-flow]")||n.add(Fn(o));n.size>0&&Ft.note(n)});return t.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,characterData:!0,attributeFilter:["style","class","data-phase","data-sidebar-collapsed","data-aionui-explorer-open","data-aionui-preview-open","data-mobile-preview-full"]}),Ft.activate(),()=>{t.disconnect(),Ft.deactivate()}}),()=>{Oa=!1})}function ee(e){return Ft.register(e)}function Po(e,t){if(Pa)return()=>{};Pa=!0;let a=e.locale.bind(Q),n=[ee($n(a)),ee(Wn()),ee(Vn()),ee(Kn()),ee(Xn(a,()=>pt(e),t)),ee(t.task),ee(Zn()),ee(to(e)),ee(Ct(e)),ee(so())];return()=>{for(let o of n)o();Pa=!1}}var ht="dsh-mobile-visible-band";var No="data-mobile-nav-ios",Na="width=device-width, initial-scale=1, viewport-fit=cover",Io="--dsh-web-mobile-vh",Ia=()=>document.querySelector('meta[name="viewport"]');function Ho(){let e=null,t=null,a=!1,n=()=>{let d=Ia();d!==null&&(e===null&&(e=d.content),!(a||d.content===Na)&&(a=!0,d.content=Na,a=!1))},o=new MutationObserver(n),i=()=>{let d=Ia();d!==t&&(t!==null&&o.disconnect(),t=d,d!==null&&o.observe(d,{attributes:!0,attributeFilter:["content"]}))},r=new MutationObserver(()=>{i(),n()});return r.observe(document.head,{childList:!0}),i(),n(),()=>{o.disconnect(),r.disconnect();let d=Ia();d!==null&&e!==null&&d.content===Na&&(d.content=e)}}function Fo(){let e=document.documentElement,t=0,a=0,n="",o="",i=0,r=0,d=h=>{e.style.setProperty("--dsha-mobile-visible-vh",h),document.dispatchEvent(new CustomEvent(ht))},p=()=>{let h=window.innerHeight,s=window.innerWidth,l=window.visualViewport,E=`${Math.max(1,Math.min(h,l?.height??h))}px`,w=`${l?.offsetTop??0}px`;if(i=E===o?i+1:0,o=E,i>=2&&e.style.getPropertyValue("--dsha-mobile-visible-vh")!==E?d(E):i<2&&r===0&&(r=requestAnimationFrame(()=>{r=0,p()})),e.style.getPropertyValue("--dsha-mobile-viewport-top")!==w&&e.style.setProperty("--dsha-mobile-viewport-top",w),t===0||h>t||s!==a){t=h,a=s;let S=`${h}px`;S!==n&&(n=S,e.style.setProperty(Io,S))}};return p(),window.addEventListener("resize",p),window.visualViewport?.addEventListener("resize",p),window.visualViewport?.addEventListener("scroll",p),()=>{window.removeEventListener("resize",p),window.visualViewport?.removeEventListener("resize",p),window.visualViewport?.removeEventListener("scroll",p),r!==0&&cancelAnimationFrame(r),r=0,e.style.removeProperty("--dsha-mobile-visible-vh"),e.style.removeProperty("--dsha-mobile-viewport-top"),n="",e.style.removeProperty(Io)}}function zo(e){if(!e)return;let t=document.documentElement;return t.setAttribute(No,""),()=>{t.removeAttribute(No)}}var Gs='[data-dsh-responsive-part="sidebar-toggle"]:not([data-mobile-nav])',Do='[data-mobile-nav="dismiss-shadow"]';function Ks(){if(typeof document>"u")return;let e=document.querySelector(Do),t=document.querySelector(Gs),a=t?.closest('[data-pane="sidebar"]')??null;if(t===null||a===null){e?.remove();return}if(e!==null&&e.parentElement===a&&a.firstElementChild===e)return;let n=e??document.createElement("span");e===null&&(n.setAttribute("data-mobile-nav","dismiss-shadow"),n.setAttribute("data-dsh-responsive-part","sidebar-toggle"),n.setAttribute("aria-hidden","true"),n.style.setProperty("display","none","important")),a.insertBefore(n,a.firstElementChild)}function qo(){if(Ha)return()=>{};Ha=!0;let e=null,t=ee({name:"frame-marker",scopes:["*"],ensure:()=>{e=ma(),e!==null&&!e.hasAttribute("data-mobile-nav")&&e.setAttribute("data-mobile-nav","frame"),Ks()},dispose:()=>{e!==null&&(e.removeAttribute("data-mobile-nav"),e.removeAttribute("data-mobile-preview-full"),e.removeAttribute("data-aionui-explorer-open"),e.removeAttribute("data-aionui-preview-open")),typeof document<"u"&&document.querySelector(Do)?.remove(),e=null}}),a=ee(Hn());return()=>{a(),t(),Ha=!1}}var Ha=!1;function Bo(e){z(e,"dsh-web-mobile: status bar theme + viewport + zoom guard",()=>{let t=document.createElement("meta");t.name="theme-color";let a=()=>getComputedStyle(document.body).backgroundColor,n=typeof CSS<"u"&&typeof CSS.supports=="function"?p=>CSS.supports(p):null;t.content=a(),t.parentElement===null&&document.head.appendChild(t);let o=new MutationObserver(()=>{t.content=a()});o.observe(document.body,{attributes:!0,attributeFilter:["data-ds-dark-theme"]});let i=Ho(),r=zo(Be(navigator,n)),d=Fo();return()=>{d(),o.disconnect(),i(),t.remove(),r?.()}})}var zt="data-mobile-nav-selecting";function $s(){let e=window.getSelection();if(e===null||e.isCollapsed)return!1;let t=e.anchorNode;if(t===null)return!1;let a=t instanceof HTMLElement?t:t.parentElement;return a===null||a.closest("[data-composer-card]")!==null?!1:a.closest("[data-phase]")!==null}function Wo(e){z(e,"dsh-web-mobile: selection chrome yield",()=>{if(typeof document>"u")return;let t=document.documentElement,a=()=>{let n=$s();n!==t.hasAttribute(zt)&&(n?t.setAttribute(zt,""):t.removeAttribute(zt))};return document.addEventListener("selectionchange",a),a(),()=>{document.removeEventListener("selectionchange",a),t.removeAttribute(zt)}})}var Vo='[data-mobile-nav="frame"] button[class*="_trigger"][aria-haspopup="tree"][aria-expanded]:not([class*="_switcherTrigger"])',Xs='[class*="ZKlsPq_root"], [class*="ZKlsPq_menu"], [class*="h8S2Va_root"], [class*="h8S2Va_menu"]',Zs=800,Ys=1e3,jo=["mouseover","mouseout","mouseenter","mouseleave","pointerout","pointerleave"];function Uo(e){z(e,"dsh-web-mobile: lineage chip touch toggle",()=>{if(typeof PointerEvent>"u")return;let t=0,a=()=>{t=Date.now()+Zs},n=null,o=0,i=h=>{if(h.pointerType!=="touch"&&h.pointerType!=="pen")return;a();let s=h.target;if(!(s instanceof Element))return;let l=s.closest(Vo);if(l===null)return;let m=l.getAttribute("aria-expanded")==="true";l.dispatchEvent(new KeyboardEvent("keydown",{key:m?"Escape":"ArrowDown",bubbles:!0,cancelable:!0})),n=l,o=Date.now()+Ys},r=h=>{if(n===null)return;if(Date.now()>=o){n=null;return}let s=h.target;s instanceof Element&&s.closest(Vo)===n&&(n=null,h.stopPropagation())},d=h=>{h.pointerType!=="touch"&&h.pointerType!=="pen"||a()},p=h=>{if(Date.now()>=t||!h.isTrusted)return;let s=h.target;s instanceof Element&&s.closest(Xs)!==null&&h.stopImmediatePropagation()};document.addEventListener("pointerdown",d,!0),document.addEventListener("pointerup",i,!0),document.addEventListener("click",r,!0);for(let h of jo)document.addEventListener(h,p,!0);return()=>{document.removeEventListener("pointerdown",d,!0),document.removeEventListener("pointerup",i,!0),document.removeEventListener("click",r,!0);for(let h of jo)document.removeEventListener(h,p,!0)}})}var Qs="workspace",Js='data-mobile-nav="session-delete"',Fa="var(--dsw-alias-state-error-primary, #b91c1c)",el='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.4782 4.84067L14.2138 10.1152C14.1102 12.1872 14.067 13.0115 13.3866 13.9607C13.1044 14.3546 12.7498 14.6912 12.3424 14.9535C11.8239 15.2872 11.2415 15.4316 10.5585 15.4998C9.88727 15.5668 9.04946 15.5656 7.99998 15.5656C6.95051 15.5656 6.1127 15.5668 5.44142 15.4998C4.75851 15.4316 4.17602 15.2872 3.65753 14.9535C3.25012 14.6912 2.89559 14.3546 2.61332 13.9607C1.93296 13.0115 1.88979 12.1872 1.78619 10.1152L1.52179 4.84067L2.89006 4.77277L3.15343 10.0463C3.26221 12.2218 3.32452 12.6015 3.72646 13.1624C3.90825 13.4161 4.13686 13.6334 4.39927 13.8023C4.66204 13.9714 5.00263 14.0792 5.57825 14.1367C6.16562 14.1953 6.92298 14.1963 7.99998 14.1963C9.07699 14.1963 9.83434 14.1953 10.4217 14.1367C10.9973 14.0792 11.3379 14.1367 11.6007 13.8023C11.8631 13.6334 12.0917 13.4161 12.2735 13.1624C12.6755 12.6015 12.7378 12.2218 12.8465 10.0463L13.1099 4.77277L14.4782 4.84067ZM5.43011 6.22849H6.7994V11.3909H5.43011V6.22849ZM9.20056 6.22849H10.5699V11.3909H9.20056V6.22849ZM8.53597 0.434431C9.17976 0.434431 9.6522 0.426926 10.0966 0.571258C10.2357 0.616451 10.3717 0.672554 10.502 0.738948C10.9182 0.951107 11.2464 1.29099 11.7015 1.74612L12.4978 2.54136H15.3742V3.91169H0.625732V2.54136H3.50218L4.29845 1.74612C4.75358 1.29099 5.08174 0.951107 5.49801 0.738948C5.62831 0.672554 5.76425 0.616451 5.90334 0.571258C6.34776 0.426926 6.82021 0.434431 7.46399 0.434431H8.53597ZM7.46399 1.80476C6.73208 1.80476 6.51641 1.81187 6.32617 1.87369C6.25545 1.89667 6.18668 1.92533 6.12041 1.95907C5.96398 2.03878 5.82348 2.16253 5.44142 2.54136H10.5585C10.1765 2.16253 10.036 2.03878 9.87955 1.95907C9.81329 1.92533 9.74452 1.89667 9.6738 1.87369C9.48356 1.81187 9.26789 1.80476 8.53597 1.80476H7.46399Z" fill="currentColor" /></svg>';function ze(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Go(e){z(e,"dsh-web-mobile: session-menu delete",()=>{let t=e.locale.bind(Q),a=(f,y)=>e.locale.bind(Qs)(f,y),n=null,o=0,i=null,r=null,d=0,p=f=>{let y=f.getAttribute("data-row-key")??"";if(y.startsWith("session:")){let R=y.slice(8);if(R!=="")return R}let k=f.getAttribute("data-dsha-session-select");return k!==null&&k!==""?k:Mt(Rt(f),M)},h=f=>(f.querySelector('[class*="_itemLabel"]')??f).textContent?.trim()??"",s=f=>{let y=[...f.querySelectorAll('[role="menuitem"]')].map(h),k=a("rename"),R=a("menu.fork");return y.includes(k)&&y.includes(R)&&y.includes(a("menu.archiveSession"))},l=()=>{r!==null&&(document.removeEventListener("keydown",r,!0),r=null),i!==null&&(i.backdrop.remove(),i.card.remove(),i=null)},m=(f,y)=>{l();let k=document.body,R=document.createElement("div");R.dataset.mobileNav="delete-dialog-backdrop";let P=document.createElement("div");P.dataset.mobileNav="delete-dialog",P.setAttribute("role","dialog"),P.setAttribute("aria-modal","true"),P.innerHTML=`
        <div data-mobile-nav="delete-confirm-title">${ze(t("deleteConfirmTitle"))}</div>
        <div data-mobile-nav="delete-confirm-desc">${ze(t("deleteConfirmDesc",{title:y}))}</div>
        <div data-mobile-nav="delete-confirm-actions">
          <button type="button" data-mobile-nav="delete-confirm-no">${ze(t("deleteConfirmNo"))}</button>
          <button type="button" data-mobile-nav="delete-confirm-yes">${ze(t("deleteConfirmYes"))}</button>
        </div>
        <div data-mobile-nav="delete-error" role="alert" hidden></div>`;let O=P.querySelector('[data-mobile-nav="delete-confirm-no"]'),H=P.querySelector('[data-mobile-nav="delete-confirm-yes"]'),B=P.querySelector('[data-mobile-nav="delete-error"]');O?.addEventListener("click",l),R.addEventListener("click",I=>{I.target===R&&l()});let U=I=>{I.key==="Escape"&&l()};document.addEventListener("keydown",U,!0),r=U;let K=()=>{H!==null&&(H.disabled=!1,H.textContent=t("deleteConfirmYes")),O!==null&&(O.disabled=!1)},$=I=>{B!==null&&(B.textContent=I,B.hidden=!1),K()},te=(I,F)=>{let q=I?.error?.code;if(q==="session-not-found")return t("deleteErrorNotFound");if(q==="session-busy")return t("deleteErrorBusy");let X=I?.error?.message??(F instanceof Error?F.message:String(F));return t("deleteErrorGeneric",{message:X})};H?.addEventListener("click",async()=>{H.disabled=!0,O!==null&&(O.disabled=!0),H.textContent=t("deletePending"),B!==null&&(B.hidden=!0);let I=++d;try{let de=await fetch("/api/mobile-nav.session.delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionId:f})}),le=await de.json().catch(()=>null);if(!de.ok||le===null||le.ok!==!0){$(te(le,new Error(`HTTP ${de.status}`)));return}}catch(de){let le=!1;try{le=await Jn({listed:()=>e.sessions.list.getSnapshot()?.byId?.[f]!==void 0,refresh:async()=>{await e.sessions.refresh?.()},sleep:ta=>new Promise(aa=>{window.setTimeout(()=>{aa()},ta)})})}catch{le=!1}if(!le){$(te(null,de));return}}let F=se(e.sessions.list.getSnapshot())===f;if(I!==d)return;l(),F&&Yn(e.sessions)&&e.sessions.clear();let q=e.sessions;try{await q.refresh?.()}catch(de){console.warn("[dsh-web-mobile] session list refresh after delete failed:",de)}let X=D();X===null||X.hasAttribute("data-sidebar-collapsed")||F&&window.matchMedia(Le).matches&&pt(e)}),k.appendChild(R),R.appendChild(P),i={backdrop:R,card:P}},E=f=>{l();let y=document.body,k=document.createElement("div");k.dataset.mobileNav="delete-dialog-backdrop";let R=document.createElement("div");R.dataset.mobileNav="delete-dialog",R.setAttribute("role","dialog"),R.setAttribute("aria-modal","true"),R.innerHTML=`
        <div data-mobile-nav="delete-confirm-title">${ze(t("deleteSession"))}</div>
        <div data-mobile-nav="delete-error" role="alert">${ze(f)}</div>
        <div data-mobile-nav="delete-confirm-actions">
          <button type="button" data-mobile-nav="delete-confirm-no">${ze(t("deleteConfirmNo"))}</button>
        </div>`,R.querySelector('[data-mobile-nav="delete-confirm-no"]')?.addEventListener("click",l),k.addEventListener("click",O=>{O.target===k&&l()});let P=O=>{O.key==="Escape"&&l()};document.addEventListener("keydown",P,!0),r=P,y.appendChild(k),k.appendChild(R),i={backdrop:k,card:R}},w=new Set,S=f=>{if(f.querySelector(`[${Js}]`)!==null)return;let y=f.querySelector('[role="menuitem"]'),k=y?.parentElement??null,R=f.querySelector('[class*="_viewport"]');if(y===null||k===null||R===null)return;let P=k.cloneNode(!0),O=P.querySelector('[role="menuitem"]');if(O===null)return;let H=O.querySelector('[class*="_itemIcon"]');H!==null&&(H.innerHTML=el,H.style.color=Fa);let B=O.querySelector('[class*="_itemLabel"]');B!==null?(B.textContent=t("deleteSession"),B.style.color=Fa):O.firstElementChild===null&&(O.textContent=t("deleteSession"),O.style.color=Fa),O.setAttribute("data-mobile-nav","session-delete"),O.addEventListener("click",U=>{U.preventDefault(),U.stopPropagation();let K=n;K?.button.click();try{if(K===null){E(t("deleteErrorResolve"));return}let $=K.sessionId;if($===null){E(t("deleteErrorResolve"));return}m($,K.title)}catch($){console.error("[dsh-web-mobile] session delete failed:",$),E(t("deleteErrorGeneric",{message:$ instanceof Error?$.message:String($)}))}}),R.appendChild(P),w.add(P)},T=()=>{for(let y of w)y.isConnected||w.delete(y);let f=a("session.new");for(let y of document.querySelectorAll('[role="menu"]'))s(y)&&(n!==null&&n.title===f||S(y))},v=()=>{o===0&&(o=requestAnimationFrame(()=>{o=0,T()}))},M=f=>e.sessions.list.getSnapshot().byId[f]!==void 0,C=f=>{let y=[...f.querySelectorAll("button")],k=y.find(P=>{let O=P.getAttribute("aria-label")??"";return/session actions/i.test(O)});return k!==void 0?k:y.find(P=>{let O=P.getAttribute("aria-label")??"";return!/archive session|pin session/i.test(O)})??null},b=f=>{if(!(f instanceof Element))return;let y=f.closest('[class*="_sessionRow"]');if(y===null)return;let k=C(y);if(k===null)return;let R=y.querySelector('[class*="_title"]')?.textContent?.trim()??"",P=p(y);n={button:k,title:R,sessionId:P},v()},_=f=>b(f.target),u=f=>b(f.target);document.addEventListener("click",_,!0),document.addEventListener("contextmenu",u,!0);let c=f=>{if(n===null)return!1;for(let y of f.removedNodes)if(y instanceof Element&&(y.matches('[role="menu"]')||y.querySelector('[role="menu"]')!==null))return!0;return!1},A=new MutationObserver(f=>{let y=f.length===0;for(let R of f)if((R.target instanceof Element?R.target:R.target.parentElement)?.closest("[data-chat-flow]")==null){y=!0;break}if(!y)return;let k=!1;for(let R of f){if(R.type!=="childList")continue;let P=R.target;if(P===document.body){v();break}if(k||(k=c(R)),P instanceof HTMLElement&&(P.matches('[role="menu"]')||P.closest('[role="menu"]')!==null)){v();break}}k&&n!==null&&![...document.querySelectorAll('[role="menu"]')].some(s)&&(n=null)});return A.observe(document.body,{childList:!0,subtree:!0}),T(),()=>{document.removeEventListener("click",_,!0),document.removeEventListener("contextmenu",u,!0),A.disconnect(),o!==0&&cancelAnimationFrame(o),l();for(let f of w)f.remove();w.clear(),n=null}},_t)}var tl="[data-composer-card]",za="[data-composer-input]",al='button, [role="button"], [role="option"], [role="menuitem"], [role="combobox"], [aria-haspopup], select, a[href], label, input',ye="data-mobile-nav-focus-shadow";function Ko(e){z(e,"dsh-web-mobile: composer keyboard guard",()=>{let t=Be(navigator,typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports.bind(CSS):null),a=typeof matchMedia=="function"&&matchMedia("(pointer: coarse)").matches;if(!t&&!a)return;let n=0,o=()=>{window.clearTimeout(n),n=0;let d=document.querySelector(`[${ye}]`);if(d===null)return;d.removeAttribute(ye);let p=d;Object.prototype.hasOwnProperty.call(d,"focus")&&delete p.focus},i=d=>{let p=d.target;if(!(p instanceof Element)||typeof p.closest!="function")return;let h=p.closest(tl);if(h===null)return;let s=h.querySelector(za);if(s===null)return;if(p.closest(za)!==null){o();return}let l=p.closest(al);if(l===null||!h.contains(l)){o();return}o(),s.setAttribute(ye,""),Object.defineProperty(s,"focus",{configurable:!0,writable:!0,value:function(){}}),window.clearTimeout(n),n=window.setTimeout(o,700)},r=d=>{if(n===0)return;let p=d.target;p instanceof HTMLElement&&p.closest(za)!==null&&p.blur()};return document.addEventListener("pointerdown",i,!0),document.addEventListener("touchstart",i,!0),document.addEventListener("mousedown",i,!0),document.addEventListener("focusin",r,!0),()=>{document.removeEventListener("pointerdown",i,!0),document.removeEventListener("touchstart",i,!0),document.removeEventListener("mousedown",i,!0),document.removeEventListener("focusin",r,!0),o()}})}var nl=24;function ol(e){let{seatBottom:t,viewportHeight:a,scale:n,scrollY:o,offsetTop:i}=e;if(!Number.isFinite(t)||!Number.isFinite(a)||!Number.isFinite(n)||Math.abs(n-1)>.01||!Number.isFinite(o)||!Number.isFinite(i)||Math.abs(o-i)>nl)return 0;let r=t-a;return r>0?r:0}var $o='[data-mobile-nav="frame"] [class*="_composerSeat"]',Xo="[data-composer-input]";function Zo(e){z(e,"dsh-web-mobile: composer keyboard lift",()=>{if(!Be(navigator,typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports.bind(CSS):null))return;let t=window.visualViewport;if(!t)return;let a=null,n=0,o=0,i=()=>{if(o=0,a===null||!a.isConnected)return;let s=ol({seatBottom:a.getBoundingClientRect().bottom+n,viewportHeight:t.height,scale:t.scale,scrollY:window.scrollY,offsetTop:t.offsetTop});n=s,a.style.transform=s>0?`translateY(${-s}px)`:""},r=()=>{o===0&&(o=requestAnimationFrame(i))},d=()=>{t.removeEventListener("resize",r),t.removeEventListener("scroll",r),window.removeEventListener("scroll",r),o!==0&&(cancelAnimationFrame(o),o=0),a!==null&&(a.style.transform=""),a=null,n=0},p=s=>{let l=s.target;if(!(l instanceof Element)||l.closest(Xo)===null)return;d();let m=document.querySelector($o);m!==null&&(a=m,t.addEventListener("resize",r),t.addEventListener("scroll",r),window.addEventListener("scroll",r,{passive:!0}),r())},h=s=>{let l=s.target;if(!(l instanceof Element)||l.closest(Xo)===null)return;let m=s.relatedTarget;m instanceof Element&&m.closest($o)!==null||d()};return document.addEventListener("focusin",p,!0),document.addEventListener("focusout",h,!0),()=>{document.removeEventListener("focusin",p,!0),document.removeEventListener("focusout",h,!0),d()}})}function Yo(e){let{visibleHeight:t,headerBottom:a,seatHeight:n,seatBottom:o,scrollY:i,offsetTop:r}=e;for(let l of[t,a,n,o,i,r])if(!Number.isFinite(l))return 0;if(Math.abs(i-r)>24)return 0;let d=Math.max(0,t),p=Math.max(0,d-Math.max(0,n)),h=Math.max(0,a-p),s=Math.max(0,o-d);return h+s}function Qo(e,t){return Number.isFinite(t)?e?t>0:t>=1:!1}var ut="data-mobile-nav-composer-tight",il='[class*="_composerSeat"]',rl='header:has([class*="_headerLeading"])';function Jo(e){z(e,"dsh-web-mobile: composer clearance",()=>{let t=!1,a=0,n=0,o=()=>{t=!1,a=0,D()?.removeAttribute(ut)},i=()=>{n=0;let d=D();if(d===null){o();return}let p=d.querySelector(il),h=d.querySelector(rl),s=p?.getBoundingClientRect()??null;if(p===null||h===null||s===null||s.width===0||s.height===0){o();return}t||(a=s.height);let l=window.visualViewport,m=Yo({visibleHeight:Math.min(window.innerHeight,l?.height??window.innerHeight),headerBottom:h.getBoundingClientRect().bottom,seatHeight:a>0?a:s.height,seatBottom:s.bottom,scrollY:window.scrollY,offsetTop:l?.offsetTop??0});t=Qo(t,m),t?d.hasAttribute(ut)||d.setAttribute(ut,""):d.hasAttribute(ut)&&d.removeAttribute(ut)},r=()=>{n===0&&(n=requestAnimationFrame(i))};return window.addEventListener("resize",r),window.addEventListener("orientationchange",r),window.visualViewport?.addEventListener("resize",r),window.visualViewport?.addEventListener("scroll",r),document.addEventListener("focusin",r,!0),document.addEventListener("focusout",r,!0),r(),()=>{window.removeEventListener("resize",r),window.removeEventListener("orientationchange",r),window.visualViewport?.removeEventListener("resize",r),window.visualViewport?.removeEventListener("scroll",r),document.removeEventListener("focusin",r,!0),document.removeEventListener("focusout",r,!0),n!==0&&(cancelAnimationFrame(n),n=0),o()}})}function ei(e){z(e,"dsh-web-mobile: document scroll lock",()=>{let t=window.scrollBy.bind(window),a=window.scrollTo.bind(window),n=()=>{(window.scrollX!==0||window.scrollY!==0)&&a(0,0)},o=((...d)=>{n()}),i=((...d)=>{n()}),r=()=>{(window.scrollX!==0||window.scrollY!==0)&&a(0,0)};return window.scrollBy=o,window.scrollTo=i,window.addEventListener("scroll",r,{passive:!0}),document.addEventListener("scroll",r,!0),r(),()=>{window.scrollBy=t,window.scrollTo=a,window.removeEventListener("scroll",r),document.removeEventListener("scroll",r,!0)}})}var ti={reservePx:0,bandPx:0};function ai(e){let{visibleHeight:t,headerHeight:a,frameBottom:n,seatBottom:o,framePadding:i}=e;for(let s of[t,a,n,o,i])if(!Number.isFinite(s))return ti;if(t<=0||a<0)return ti;let r=Math.max(0,t-o),d=Math.max(0,o-n),p=r+d+Math.max(0,i),h=Math.max(0,t-a-p);return{reservePx:p,bandPx:h}}function ni(e){return!Number.isFinite(e)||e<=0?0:Math.min(e*.6,520)}function oi(e,t,a,n){return!t||!Number.isFinite(a)||a<=0?!1:e||!Number.isFinite(n)||n<=0?!0:a>n}function ii(e){let{fieldTop:t,fieldBottom:a,bodyTop:n,bodyBottom:o,scrollTop:i,scrollHeight:r,clientHeight:d,visibleTop:p,visibleBottom:h}=e;for(let T of[t,a,n,o,i,r,d])if(!Number.isFinite(T))return i;let s=p===void 0||!Number.isFinite(p)?n:Math.max(n,p),l=h===void 0||!Number.isFinite(h)?o:Math.min(o,h);if(l-s<1)return i;let m=Math.max(0,r-d),E=Math.max(0,l-s),w=Math.min(8,E/2),S=i;return t<s+w?S=i-(s+w-t):a>l-w&&(S=i+(a-(l-w))),Math.min(Math.max(S,0),m)}var mt="data-mobile-nav-question-full",Da="--dsha-mobile-question-reserve",sl="question-expand",ll='[class*="_frame"][style*="--dsh-composer-side-clearance"], [class*="_frame"]',dl='[class*="_headerActions"]',ri='[class*="_body"]',cl='[class*="_fieldInput"]',pl='[data-question-key] [class*="_card"]',hl='[class*="_footer"]',si='[class*="_composerSeat"]',ul="--dsha-mobile-visible-vh",ml="--mobile-nav-header-h",fl=['<svg class="dsh-web-mobile-question-expand" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>",'<svg class="dsh-web-mobile-question-collapse" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M2 6h4V2M14 6h-4V2M2 10h4v4M14 10h-4v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>"].join(""),li=e=>{let t=document.documentElement.style.getPropertyValue(e).trim(),a=Number.parseFloat(t);return Number.isFinite(a)?a:Number.NaN};function di(e){let t=e.locale.bind(Q);z(e,"dsh-web-mobile: question fullscreen",()=>{let a=!1,n=!1,o=null,i=null,r="",d=0,p=null,h=null,s=u=>(p!==null&&p.isConnected&&u.contains(p)||(p=u.querySelector(si)),p),l=()=>{let u=D();if(u===null)return null;let A=s(u)??u;return h!==null&&h.isConnected&&A.contains(h)||(h=A.querySelector(ll)),h},m=()=>t(n?"questionCollapse":"questionExpand"),E=()=>{if(o===null)return;let u=m();o.getAttribute("aria-label")!==u&&(o.setAttribute("aria-label",u),o.title=u);let c=n?"true":"false";o.getAttribute("aria-expanded")!==c&&o.setAttribute("aria-expanded",c)},w=()=>{a=!1,n=!1,d!==0&&(cancelAnimationFrame(d),d=0);let u=D();u!==null&&u.hasAttribute(mt)&&u.removeAttribute(mt),i?.style.removeProperty(Da),i=null,r="",E()},S=()=>{let u=document.activeElement;if(!(u instanceof HTMLElement)||!u.matches(cl))return;let c=u.closest(pl),A=u.closest(ri),f=c!==null&&c.scrollHeight>c.clientHeight+1?c:A;if(f===null)return;let y=f===c?c.querySelector(":scope > "+hl):null,R=u.getBoundingClientRect(),P=f.getBoundingClientRect(),O=y?.getBoundingClientRect().top??Number.NaN,H={top:P.top,bottom:Number.isFinite(O)?Math.min(P.bottom,O):P.bottom},B=window.visualViewport,U=B?.offsetTop??Number.NaN,K=B==null?Number.NaN:B.offsetTop+B.height,$=ii({fieldTop:R.top,fieldBottom:R.bottom,bodyTop:H.top,bodyBottom:H.bottom,scrollTop:f.scrollTop,scrollHeight:f.scrollHeight,clientHeight:f.clientHeight,visibleTop:U,visibleBottom:K});Math.abs($-f.scrollTop)>=1&&(f.scrollTop=$)},T=()=>{d=0;let u=D(),c=l();if(u===null||c===null){w();return}let A=u.querySelector(si),f=c.getBoundingClientRect(),y=A?.getBoundingClientRect()??null,k=getComputedStyle(c),R=li(ul),P=ai({visibleHeight:R,headerHeight:li(ml),frameBottom:f.bottom,seatBottom:y===null?Number.NaN:y.bottom,framePadding:Number.parseFloat(k.paddingTop)+Number.parseFloat(k.paddingBottom)}),O=oi(n,a,P.bandPx,ni(R)),H=`${Math.round(P.reservePx)}px`;i!==c&&(i?.style.removeProperty(Da),i=c,r=""),r!==H&&(r=H,c.style.setProperty(Da,H)),O!==u.hasAttribute(mt)&&(O?u.setAttribute(mt,""):u.removeAttribute(mt)),n=O,E(),n||(a=!1)},v=()=>{d===0&&(d=requestAnimationFrame(()=>{d=0,S(),a&&T()}))},M=()=>{a=!n,d!==0&&(cancelAnimationFrame(d),d=0),T(),n||(a=!1)},C=u=>{let c=u.querySelector(dl);if(c!==null){if(o===null){let A=document.createElement("button");A.type="button",A.dataset.mobileNav=sl,A.innerHTML=fl,A.addEventListener("click",M),o=A}o.parentElement!==c&&c.insertBefore(o,c.lastElementChild),E()}},_=ee({name:"question-fullscreen",scopes:["*"],ensure:()=>{let u=l();if(u===null){w();return}if(u.querySelector(ri)===null){o?.remove(),w();return}C(u),a&&v()},dispose:()=>{w(),o!==null&&(o.removeEventListener("click",M),o.remove(),o=null)}});return window.addEventListener("resize",v),window.addEventListener("orientationchange",v),window.visualViewport?.addEventListener("resize",v),document.addEventListener("focusin",v,!0),document.addEventListener("focusout",v,!0),document.addEventListener(ht,v),v(),()=>{window.removeEventListener("resize",v),window.removeEventListener("orientationchange",v),window.visualViewport?.removeEventListener("resize",v),document.removeEventListener("focusin",v,!0),document.removeEventListener("focusout",v,!0),document.removeEventListener(ht,v),_()}})}var qa='[class*="_add"]',bl="[data-trigger-menu]",pi="[data-composer-input]",gl=e=>{let t=e.getBoundingClientRect();return t.width>0&&t.height>0&&e.getClientRects().length>0},Ba=()=>{for(let e of document.querySelectorAll(bl))if(gl(e))return e;return null},hi=()=>{let e=document.querySelector(pi);return e instanceof HTMLElement?e:null},ci=()=>{let e=hi();e!==null&&document.activeElement===e&&e.blur()},wl=()=>{let e=hi();e!==null&&e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",keyCode:27,which:27,bubbles:!0,cancelable:!0}))};function ui(e){z(e,"dsh-web-mobile: composer plus toggle",()=>{let t=!1,a=[],n=()=>{for(let p of a)window.clearTimeout(p);a=[]},o=p=>{let h=p.target;t=h instanceof Element&&h.closest(qa)!==null&&Ba()!==null},i=p=>{let h=p.target;h instanceof Element&&h.closest(qa)!==null&&ci()},r=p=>{let h=t;t=!1;let s=p.target;if(!(!(s instanceof Element)||s.closest(qa)===null)){h&&Ba()!==null&&wl(),n();for(let l of[120,320,640])a.push(window.setTimeout(()=>{Ba()!==null&&ci()},l))}},d=p=>{let h=p.target;h instanceof Element&&h.closest(pi)!==null&&n()};return document.addEventListener("pointerdown",i,!0),document.addEventListener("pointerdown",d,!0),document.addEventListener("click",o,!0),document.addEventListener("click",r,!1),()=>{n(),document.removeEventListener("pointerdown",i,!0),document.removeEventListener("pointerdown",d,!0),document.removeEventListener("click",o,!0),document.removeEventListener("click",r,!1)}})}var vl='[class*="heroWorkspaceRow"] > button[aria-haspopup="menu"]',xl='[role="menu"]';function mi(e){z(e,"dsh-web-mobile: workspace chip toggle",()=>{let t=null,a=i=>i instanceof Element?i.closest(vl):null,n=i=>{t=null;let r=a(i.target);r!==null&&r.getAttribute("aria-expanded")==="true"&&document.querySelector(xl)!==null&&(t=r)},o=i=>{let r=t;t=null,!(r===null||a(i.target)!==r)&&i.stopPropagation()};return document.addEventListener("pointerdown",n,!0),document.addEventListener("click",o,!0),()=>{t=null,document.removeEventListener("pointerdown",n,!0),document.removeEventListener("click",o,!0)}})}var yl="[data-team-action]",kl='[data-team-action] > button[aria-haspopup="dialog"]',El="[data-team-panel]";function fi(e){z(e,"dsh-web-mobile: team chip toggle",()=>{let t=null,a=i=>i instanceof Element?i.closest(kl):null,n=i=>{t=null;let r=a(i.target);r!==null&&r.getAttribute("aria-expanded")==="true"&&document.querySelector(yl)!==null&&document.querySelector(El)!==null&&(t=r)},o=i=>{let r=t;t=null,!(r===null||a(i.target)!==r)&&(document.body.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0})),i.stopPropagation())};return document.addEventListener("pointerdown",n,!0),document.addEventListener("click",o,!0),()=>{t=null,document.removeEventListener("pointerdown",n,!0),document.removeEventListener("click",o,!0)}},_t)}var bi='[class*="_7KE1Ra_trigger"]',gi='[class*="_7KE1Ra_menu"]',Tl="[data-composer-card]",Dt=8,wi=[0,60,200];function vi(e){z(e,"dsh-web-mobile: model menu anchor",()=>{let t=0,a=null,n=null,o=[],i=null,r=null,d=null,p=null,h=()=>{let c=p;p=null,c!==null&&c.el.style.left===c.value&&(c.el.style.left=c.original)},s=c=>{if(c===null)return null;let A=n?.get(c);if(A!==void 0)return A;let f=c.getBoundingClientRect(),y=f.width>0&&f.height>0?f:null;return n?.set(c,y),y},l=()=>{for(let c of document.querySelectorAll(gi))if(s(c)!==null)return c;return null},m=c=>{let A=s(c);if(A===null)return;let f=A.width,y=document.documentElement.clientWidth,k=Math.max(Dt,y-f-Dt),R=s(r),P=s(d),O=R===null?null:R.right-f,H;if(O!==null&&O>=Dt&&O<=k)H=O;else if(P!==null)H=P.left+(P.width-f)/2;else return;let B=`${Math.round(Math.min(Math.max(H,Dt),k))}px`;p!==null&&p.el!==c&&h(),p===null?p={el:c,value:B,original:c.style.left}:p.value=B,c.style.left!==B&&(c.style.left=B)},E=()=>{i=l(),r=i===null?null:document.querySelector(bi),d=i===null?null:document.querySelector(Tl),i!==null&&m(i)},w=()=>{if(i!==null){if(s(i)===null){h(),i=null,r=null,d=null;return}m(i)}},S=c=>{a=c,t===0&&(t=window.requestAnimationFrame(()=>{t=0;let A=a;a=null,n=new Map;try{A!==null&&A()}finally{n=null}}))},T=()=>{S(E);for(let c of wi)o.push(window.setTimeout(()=>S(E),c));for(;o.length>wi.length*2;){let c=o.shift();c!==void 0&&window.clearTimeout(c)}},v=c=>{let A=c.target;return A instanceof Element?A.closest(bi)!==null||A.closest(gi)!==null:!1},M=c=>{v(c)&&T()},C=c=>{v(c)&&T()},b=c=>{v(c)&&T()},_=c=>{v(c)&&T()},u=()=>{S(w)};return document.addEventListener("pointerdown",M,!0),document.addEventListener("keydown",C,!0),document.addEventListener("focusin",b,!0),document.addEventListener("click",_,!0),window.addEventListener("resize",u),document.addEventListener("scroll",u,!0),()=>{document.removeEventListener("pointerdown",M,!0),document.removeEventListener("keydown",C,!0),document.removeEventListener("focusin",b,!0),document.removeEventListener("click",_,!0),window.removeEventListener("resize",u),document.removeEventListener("scroll",u,!0),t!==0&&window.cancelAnimationFrame(t),a=null,n=null;for(let c of o)window.clearTimeout(c);o.length=0,h(),i=null,r=null,d=null}})}var qt=new Set,Bt=null;function Wt(e){if(Bt===null){let a=HTMLInputElement.prototype,n=Object.getOwnPropertyDescriptor(a,"focus"),o=a.focus;if(typeof o!="function"||n?.configurable===!1||!n&&!Object.isExtensible(a))return()=>{};let i=function(d){for(let p of qt)if(p.shouldSkip(this))return;o.call(this,d)};try{Object.defineProperty(a,"focus",{configurable:!0,writable:!0,enumerable:n?.enumerable??!1,value:i})}catch{return()=>{}}Bt=()=>{if(Object.getOwnPropertyDescriptor(a,"focus")?.value===i)try{n?Object.defineProperty(a,"focus",n):delete a.focus}catch{}}}let t={shouldSkip:e};return qt.add(t),()=>{if(qt.delete(t)&&qt.size===0){let a=Bt;Bt=null,a?.()}}}var xi='[data-shortcut-modal="shortcuts"] [data-modal-autofocus]';function yi(e){z(e,"dsh-web-mobile: shortcut modal keyboard guard",()=>{let t=new WeakSet(document.querySelectorAll(xi)),a=new WeakSet,n=Wt(o=>{if(o.matches(xi)){if(!t.has(o)&&o.hasAttribute("data-dsh-automatic-focus")){if(!a.has(o)){a.add(o),Promise.resolve().then(()=>t.add(o));let i=o.closest('[role="dialog"][aria-modal="true"]');i!==null&&!i.contains(document.activeElement)&&i.focus({preventScroll:!0})}return!0}t.add(o)}return!1});return()=>n()})}var _l='[data-menu-material], [class*="_7KE1Ra_menu"]',Sl='[data-menu-material] input[role="searchbox"], input[role="searchbox"][aria-controls$="-models"]',Cl=2e3;function ki(e){z(e,"dsh-web-mobile: model menu keyboard guard",()=>{let t=null,a=0,n=()=>{t===null&&(t=Wt(r=>r.matches(Sl)))},o=()=>{t?.(),t=null},i=()=>{n(),window.clearTimeout(a),a=window.setTimeout(()=>{document.querySelector(_l)===null&&o()},Cl)};return document.addEventListener("pointerdown",i,!0),()=>{document.removeEventListener("pointerdown",i,!0),window.clearTimeout(a),o()}})}function Ei(e){return e.insideOpen||e.onInteractive?"ignore":"open"}var Al="li[data-plugin-package], li[data-plugin-row], li[data-plugin-item]",Ll='button[class*="_cardOpen"], button[class*="_rowOpen"]',Ml='button, a, input, select, textarea, [role="switch"], [role="button"], [role="tab"], [contenteditable="true"]';function Ti(e){z(e,"dsh-web-mobile: plugin card tap",()=>{let t=a=>{let n=a.target;if(!(n instanceof Element))return;let o=n.closest(Al);if(o===null)return;let i=o.querySelector(Ll);!(i instanceof HTMLButtonElement)||Ei({insideOpen:i.contains(n),onInteractive:n.closest(Ml)!==null})==="ignore"||(a.preventDefault(),i.click())};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)})}function _i(e,t){let a=0,n=!1;return{schedule(o){n||(n=!0,a=e(()=>{n=!1,o()}))},cancel(){n&&(t(a),n=!1)}}}function Si(e){e.effect(()=>{let t=window.matchMedia(Le),a='[class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"])',n={"white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis","max-width":"100%"},o=[{pick:v=>v,props:{"flex-wrap":"wrap","align-items":"center",gap:"4px 10px"}},{pick:v=>v.children[0]??null,props:{flex:"1 1 100%","max-width":"100%","min-width":"0"}},{pick:v=>v.querySelector('[class*="spec"]'),props:n},{pick:v=>v.querySelector('[class*="nm"]'),props:n}],i=new WeakMap,r=(v,M)=>{let C=i.get(v);C===void 0&&i.set(v,C=new Map);for(let[b,_]of Object.entries(M)){let u="important",c=v.style.getPropertyValue(b),A=v.style.getPropertyPriority(b);if(c===_&&A===u)continue;let f=C.get(b),y=f!==void 0&&f.value===c&&f.priority===A;C.set(b,y?{...f,value:_,priority:u}:{value:_,priority:u,before:c,beforePriority:A}),v.style.setProperty(b,_,u)}},d=v=>{let M=i.get(v);if(M!==void 0){for(let[C,b]of M)M.delete(C),!(v.style.getPropertyValue(C)!==b.value||v.style.getPropertyPriority(C)!==b.priority)&&(b.before===""?v.style.removeProperty(C):v.style.setProperty(C,b.before,b.beforePriority));M.size===0&&i.delete(v)}},p=()=>{document.querySelectorAll(a).forEach(v=>{for(let M of o){let C=M.pick(v);C&&d(C)}})},h=null,s='[data-dsh-market-root], [role="dialog"]',l="[data-dsh-market-root]",m=()=>{let v=h;if(v!==null&&v.isConnected)return v;let M=document.querySelector(s);return M===null?(h=null,null):(h=M.matches(l)?M:document.querySelector(l)??M,h)},E=()=>{let v=m();if(v===null)return;let M=v.querySelectorAll(a);M.length===0&&!v.matches(l)&&(M=document.querySelectorAll(a)),M.forEach(C=>{for(let b of o){let _=b.pick(C);_&&r(_,b.props)}})},w=()=>{p(),t.matches&&E()};w();let S=_i(v=>window.requestAnimationFrame(v),v=>window.cancelAnimationFrame(v)),T=new MutationObserver((v=[])=>{let M=v.length===0;for(let C of v)if((C.target instanceof Element?C.target:C.target.parentElement)?.closest("[data-chat-flow]")==null){M=!0;break}M&&t.matches&&S.schedule(()=>{t.matches&&E()})});return T.observe(document.documentElement,{childList:!0,subtree:!0}),t.addEventListener("change",w),()=>{S.cancel(),T.disconnect(),t.removeEventListener("change",w),p(),h=null}},"dsh-web-mobile: installed-list-inline-styles")}function Ci(e){z(e,"tablet-quick-settings",()=>{let t=Ct(e);t.ensure();let a=!1,n=()=>{a=!1;try{t.ensure()}catch(i){console.error("[dsh-web-mobile] tablet-quick-settings",i)}},o=new MutationObserver(()=>{a||(a=!0,requestAnimationFrame(n))});return o.observe(document.documentElement,{childList:!0,subtree:!0}),()=>{o.disconnect(),t.dispose()}},On)}var Rl=800,Vt="[data-composer-input]",Ai="data-mobile-panel-exit",Li="dsh-mobile-panel-exit";function Mi(e){z(e,"dsh-web-mobile: session focus guard",()=>{let t=e.sessions.list,a=se(t.getSnapshot()),n=0,o=!1,i=()=>{window.clearTimeout(n),n=0,o=!1,p.disconnect();let S=document.querySelector(`[${ye}]`);if(S===null)return;S.removeAttribute(ye);let T=S;Object.prototype.hasOwnProperty.call(S,"focus")&&delete T.focus},r=S=>{S.hasAttribute(ye)||(S.setAttribute(ye,""),Object.defineProperty(S,"focus",{configurable:!0,writable:!0,value:function(){}}))},d=()=>document.querySelector(`[data-mobile-nav="frame"][${Ai}]`)!==null,p=new MutationObserver(()=>{if(!o)return;let S=document.querySelector(Vt);S!==null&&r(S)}),h=()=>{i(),o=!0;let S=document.querySelector(Vt);S!==null&&r(S),p.observe(document.documentElement,{childList:!0,subtree:!0}),n=window.setTimeout(i,Rl)},s=new MutationObserver(()=>{!o&&d()&&h()}),l=S=>{if(!o)return;let T=S.target;T instanceof Element&&T.closest(Vt)!==null&&i()},m=S=>{if(!o)return;let T=S.target;T instanceof HTMLElement&&T.closest(Vt)!==null&&T.blur()},E=t.subscribe(()=>{let S=se(t.getSnapshot());S!==a&&(a=S,h())}),w=()=>{o||h()};return s.observe(document.documentElement,{attributes:!0,attributeFilter:[Ai]}),document.addEventListener(Li,w),document.addEventListener("pointerdown",l,!0),document.addEventListener("focusin",m,!0),()=>{E(),s.disconnect(),document.removeEventListener(Li,w),document.removeEventListener("pointerdown",l,!0),document.removeEventListener("focusin",m,!0),i()}})}var Ol="[data-composer-input]";function Pl(e){if(!e.isTrusted||e.defaultPrevented||e.inputType!=="insertText")return!1;let t=e.data;return typeof t!="string"||t===`
`||t==="\r"?!1:t.includes(`
`)||t.includes("\r")}function Nl(e){if(typeof DataTransfer!="function"||typeof ClipboardEvent!="function")return null;try{let t=new DataTransfer;t.setData("text/plain",e);let a=new ClipboardEvent("paste",{clipboardData:t,bubbles:!0,cancelable:!0});return a.clipboardData?.getData("text/plain")!==e?null:a}catch{return null}}function Ri(e){z(e,"dsh-web-mobile: composer paste guard",()=>{let t=a=>{if(!(a instanceof InputEvent)||!Pl(a))return;let n=a.target;if(!(n instanceof Element))return;let o=n.closest(Ol);if(o===null)return;let i=Nl(a.data??"");i!==null&&(a.preventDefault(),a.stopPropagation(),o.dispatchEvent(i))};return document.addEventListener("beforeinput",t,!0),()=>{document.removeEventListener("beforeinput",t,!0)}})}var Il='[data-mobile-nav="file-upload"]',Hl="[data-composer-card]",Fl="input[type=file]",De=null;function zl(e){return e==="image"?"image/*":""}function Dl(e){return typeof e?.pickFile=="function"?e.pickFile.bind(e):void 0}function Pi(e){return Array.isArray(e)?e.filter(t=>typeof File<"u"&&t instanceof File):[]}function ql(e,t){return t?"fallback":e==null?"cancelled":Array.isArray(e)?e.length===0?"cancelled":Pi(e).length>0?"files":"fallback":"fallback"}function Wa(){let e=document.querySelector(Hl);return e===null?null:e.querySelector(Fl)}function Bl(e,t){if(t===null)return!1;try{let a=new DataTransfer;for(let n of e)a.items.add(n);t.files=a.files}catch{return!1}return t.dispatchEvent(new Event("change",{bubbles:!0})),!0}var Wl='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20"><rect x="2.5" y="3.5" width="15" height="13" rx="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="7.2" cy="8" r="1.4" fill="currentColor"/><path d="M4.2 14.6l3.6-3.4 2.6 2.4 2.3-2.3 3.1 3.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',Vl='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20"><path d="M12.6 3.2H6.4A1.9 1.9 0 0 0 4.5 5.1v9.8a1.9 1.9 0 0 0 1.9 1.9h7.2a1.9 1.9 0 0 0 1.9-1.9V6.6l-2.9-3.4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12.4 3.4v3.3h3.1" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';function Va(e,t=Wa()){if(t===null)return;let a=zl(e),n=t.hasAttribute("accept"),o=t.getAttribute("accept");a!==""&&t.setAttribute("accept",a);try{t.click()}finally{a!==""&&(n?t.setAttribute("accept",o??""):t.removeAttribute("accept"))}}async function jl(e,t){let a=window.DSHA,n=Dl(a);if(n===void 0){Va("file");return}let o=Wa(),i=t?.()??null,r=null,d=!1;try{r=await n({accept:[],multiple:!0,title:e("fileUploadAttachment")})}catch{d=!0}if(o===null||Wa()!==o||i!==null&&(t?.()??null)!==i)return;let p=ql(r,d);p!=="cancelled"&&(p==="files"&&Bl(Pi(r),o)||Va("file",o))}var Oi=8,ft=8;function Ul(e,t,a){let n=e.top-Oi-t.height;n<a.top+ft&&(n=Math.min(e.bottom+Oi,a.bottom-t.height-ft));let o=Math.max(a.left+ft,Math.min(e.left,a.right-t.width-ft));return{top:Math.round(Math.max(a.top+ft,n)),left:Math.round(o)}}function Gl(){let e=window.visualViewport;return e!=null?{top:e.offsetTop,bottom:e.offsetTop+e.height,left:e.offsetLeft,right:e.offsetLeft+e.width}:{top:0,bottom:window.innerHeight,left:0,right:window.innerWidth}}function Kl(e,t,a){De?.(),De=null;let n=document.createElement("div");n.dataset.mobileNav="file-picker-backdrop";let o=document.createElement("div");o.dataset.mobileNav="file-picker",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label",e("fileUploadAttachment"));let i=[{kind:"image",icon:Wl,label:e("fileUploadImage")},{kind:"file",icon:Vl,label:e("fileUploadAttachment")}],r=[],d=()=>{De===d&&(De=null);for(let C of r.splice(0))C();n.remove()};De=d;let p=C=>{C.key==="Escape"&&d()};for(let C of i){let b=document.createElement("button");b.type="button",b.dataset.mobileNav="file-picker-option",b.dataset.kind=C.kind;let _=document.createElement("span");_.dataset.mobileNav="file-picker-icon",_.innerHTML=C.icon;let u=document.createElement("span");u.textContent=C.label,b.append(_,u),b.addEventListener("click",()=>{d(),C.kind==="file"?jl(e,a):Va(C.kind)}),o.append(b)}n.addEventListener("click",C=>{C.target===n&&d()}),document.addEventListener("keydown",p,!0),r.push(()=>document.removeEventListener("keydown",p,!0)),n.append(o),document.body.append(n),o.style.visibility="hidden";let h=!1,s=()=>{h||(h=!0,o.style.visibility="")},l="",m=0,E=window.setTimeout(s,400);r.push(()=>window.clearTimeout(E));let w=()=>{if(!t.isConnected){d();return}let C=t.getBoundingClientRect(),b=o.getBoundingClientRect(),_=Ul(C,b,Gl()),u=`${_.top}px`,c=`${_.left}px`;o.style.top!==u&&(o.style.top=u),o.style.left!==c&&(o.style.left=c);let A=`${_.top}:${_.left}`;A===l?m+=1:(l=A,m=0),m>=2&&s()};w();let S=!0,T=()=>{S||w()};window.addEventListener("resize",T),window.addEventListener("orientationchange",T),window.visualViewport?.addEventListener("resize",T),window.visualViewport?.addEventListener("scroll",T),r.push(()=>window.removeEventListener("resize",T)),r.push(()=>window.removeEventListener("orientationchange",T)),r.push(()=>window.visualViewport?.removeEventListener("resize",T)),r.push(()=>window.visualViewport?.removeEventListener("scroll",T));let v=0,M=requestAnimationFrame(function C(){if(w(),!o.isConnected){S=!1;return}++v<12?M=requestAnimationFrame(C):(S=!1,s())});r.push(()=>cancelAnimationFrame(M))}function Ni(e){z(e,"dsh-web-mobile: composer file picker",()=>{let t=e.locale.bind(Q),a=()=>se(e.sessions.list.getSnapshot())??null,n=o=>{let i=o.target;if(!(i instanceof Element))return;let r=i.closest(Il);r===null||r.hasAttribute("disabled")||(o.preventDefault(),o.stopPropagation(),Kl(t,r,a))};return document.addEventListener("click",n,!0),()=>{document.removeEventListener("click",n,!0),De?.(),De=null,document.querySelector('[data-mobile-nav="file-picker-backdrop"]')?.remove()}})}var jt="mobile-nav-attachments";function Xe(e){return typeof e=="object"&&e!==null}function Ii(e){return Xe(e)?(Array.isArray(e.attachmentIds)?e.attachmentIds:Array.isArray(e.imageIds)?e.imageIds:[]).filter(a=>typeof a=="string"):[]}function Hi(e,t){if(!Array.isArray(e))return[];let a=[];for(let n of e){if(!Xe(n)||typeof n.id!="string")continue;let o=n.kind==="image"||n.kind==="file"?n.kind:void 0;if(o===void 0)continue;let i=Xe(n.file)?n.file:void 0,r=typeof i?.name=="string"?i.name:"",d=typeof i?.size=="number"&&Number.isFinite(i.size)?i.size:void 0,p=Xe(t)&&Xe(t[n.id])?t[n.id]:void 0,h=p?.status==="uploading"||p?.status==="ready"||p?.status==="error"?p.status:void 0;a.push({id:n.id,kind:o,name:r,...d===void 0?{}:{bytes:d},...o==="file"&&h!==void 0?{status:h}:{}})}return a}function $l(e){if(e<1024)return`${e} B`;let t=["KB","MB","GB"],a=e/1024,n=0;for(;a>=1024&&n<t.length-1;)a/=1024,n+=1;return`${a>=10?Math.round(a):Math.round(a*10)/10} ${t[n]}`}function Xl(e){let t=new Map;for(let a of e)t.set(a.name,(t.get(a.name)??0)+1);return e.map((a,n)=>({v:1,id:a.id,kind:a.kind,name:a.name,ordinal:n+1,ambiguous:a.name===""||(t.get(a.name)??0)>1}))}function Fi(e,t){return e.name===""?t.unnamed(e.ordinal):e.name}function Zl(e,t,a){if(a||t.includes("/"))return!1;let n=t.trim().toLowerCase();return n===""||e.toLowerCase().includes(n)}function zi(e,t,a,n){let o=t.trim().toLowerCase(),i=[];for(let[r,d]of Xl(e).entries()){let p=e[r];if(p===void 0)continue;let h=Fi(d,n);if(!Zl(h,t,a))continue;let s=[p.kind==="image"?n.kindImage:n.kindFile];p.bytes!==void 0&&s.push($l(p.bytes)),p.status==="uploading"?s.push(n.uploading):p.status==="error"&&s.push(n.failed),i.push({rank:o!==""&&h.toLowerCase().startsWith(o)?0:1,index:r,row:{name:h,description:s.join(" · "),icon:"file",section:n.section,value:JSON.stringify(d)}})}return i.sort((r,d)=>r.rank-d.rank||r.index-d.index),i.map(r=>r.row)}function Di(e){if(typeof e!="string")return;let t;try{t=JSON.parse(e)}catch{return}if(!Xe(t)||t.v!==1)return;let{id:a,kind:n,name:o,ordinal:i,ambiguous:r}=t;if(!(typeof a!="string"||n!=="file"&&n!=="image"||typeof o!="string")&&!(typeof i!="number"||!Number.isInteger(i)||i<1||typeof r!="boolean"))return{v:1,id:a,kind:n,name:o,ordinal:i,ambiguous:r}}function Yl(e,t){return`@${t.mention}:${e.name===""?`#${e.ordinal}`:e.name}`}function ja(e,t){let a=Di(e);if(a!==void 0)return{source:jt,ref:JSON.stringify(a),label:Fi(a,t),appearance:"file",clipboardText:Yl(a,t)}}function qi(e){let t=Di(e);if(t===void 0)throw new Error(`${jt}: unrecognized attachment reference`);let a=t.kind==="image"?"Image":"File",n=t.name===""?a:`${a} ${JSON.stringify(t.name)}`;return t.ambiguous?`[attachment #${t.ordinal}: ${n}]`:`[attachment: ${n}]`}var Bi="pocketMobileNav.attachments",Jl={section:"本次附件","kind.file":"文件","kind.image":"图片","status.uploading":"上传中","status.failed":"上传失败",unnamed:"附件 {n}",mention:"附件"},ed={section:"Attachments in this message","kind.file":"File","kind.image":"Image","status.uploading":"Uploading","status.failed":"Upload failed",unnamed:"Attachment {n}",mention:"attachment"};function td(e,t){let a=e.get("sessions"),n=e.get("conversation"),o=a?.scope?.(t);if(o===void 0||n?.input?.for===void 0)return[];let i=Ii(n.input.for(o)?.state?.getSnapshot());if(i.length===0)return[];let r=typeof n.resolveDraftAttachments=="function"?n.resolveDraftAttachments(i):typeof n.draftImages=="function"?n.draftImages(i):void 0;return Hi(r,n.fileUploads?.getSnapshot())}function Ua(e){let t=e.locale.bind(Bi);return{section:t("section"),kindFile:t("kind.file"),kindImage:t("kind.image"),uploading:t("status.uploading"),failed:t("status.failed"),unnamed:a=>t("unnamed",{n:a}),mention:t("mention")}}function ad(e){return{trigger:"@",name:jt,order:-10,showGroupTitle:!1,candidates(t,a){if(a.signal.aborted)return Promise.resolve([]);try{return Promise.resolve(zi(td(e,t.sessionId),a.query,a.drilled===!0,Ua(e)))}catch{return Promise.resolve([])}},onPick({candidate:t}){let a=ja(t.value,Ua(e));return a===void 0?void 0:{insert:a}},codec:{clipboardText:t=>ja(t,Ua(e))?.clipboardText??"",serialize:t=>{try{return Promise.resolve(qi(t))}catch(a){return Promise.reject(a)}}}}}function Wi(e){e.effect(()=>e.locale.register(Bi,{zh:Jl,en:ed}),"dsh-web-mobile: attachment mention dictionaries"),e.inject(["inputTriggers"],t=>{z(t,"dsh-web-mobile: attachment mention source",()=>{let a=t.get("inputTriggers");if(typeof a?.registerSource=="function")return a.registerSource(ad(t))})})}var Ut="pocketMobileNavFileShare",Vi={share:"分享",shareFile:"分享「{name}」",downloadFile:"下载「{name}」",sharing:"正在准备文件…",downloadedUnsupported:"当前环境不支持直接分享；已开始下载，请在系统保存位置确认",downloadedTooLarge:"文件超过 50 MB；已开始下载，请在系统保存位置确认",downloadedShareFailed:"分享未能完成；已开始下载，请在系统保存位置确认",errorTooLarge:"文件太大（超过 200 MB），无法在手机端分享或下载",errorNotFound:"文件不存在或已被移动",errorGeneric:"分享失败：{message}"},ji={share:"Share",shareFile:'Share "{name}"',downloadFile:'Download "{name}"',sharing:"Preparing file…",downloadedUnsupported:"Direct sharing is unavailable here; a download has started — confirm it at the location your system shows",downloadedTooLarge:"The file is over 50 MB; a download has started — confirm it at the location your system shows",downloadedShareFailed:"Sharing did not finish; a download has started — confirm it at the location your system shows",errorTooLarge:"The file is too large (over 200 MB) to share or download on mobile",errorNotFound:"The file no longer exists or was moved",errorGeneric:"Share failed: {message}"};var Y=require("react"),rd=pa(require("@deepseek-ai/dsh-client-ui-primitives"),1);var fe=class extends Error{code;constructor(t,a){super(a),this.code=t,this.name="FileShareError"}};function nd(e){let t=e.code??"";return t==="workspace-file/too-large"?new fe("too-large",e.message??t):t==="workspace-file/not-found"||t==="workspace-file/not-regular-file"?new fe("not-found",e.message??t):new fe("read-failed",e.message??(t||"read failed"))}async function Ui(e,t,a,n=1048576,o=209715200){let i=[],r=0;for(;;){a.throwIfAborted();let d=await e(t,{offset:r,length:n},a);if(a.throwIfAborted(),!d.ok)throw nd(d.error);let{data:p,eof:h,bytes:s}=d.value;if(s!==void 0&&s>o)throw new fe("too-large",`${t}: ${s} bytes exceed the ${o} byte share cap`);if(i.push(new Uint8Array(p)),r+=p.length,r>o)throw new fe("too-large",`${t}: more than ${o} bytes`);if(h||p.length===0)break}return{parts:i,size:r}}function od(e){return typeof e=="object"&&e!==null&&e.name==="AbortError"}function Gt(e){return e.share!==void 0&&e.canShare!==void 0}async function Gi(e,t){if(e.size>(t.shareMax??52428800))return t.download(e),{kind:"downloaded",reason:"too-large"};let a=t.share;if(a===void 0)return t.download(e),{kind:"downloaded",reason:"unsupported"};let n=!1;try{n=t.canShare?.({files:[e]})===!0}catch{n=!1}if(!n)return t.download(e),{kind:"downloaded",reason:"unsupported"};try{return await a({files:[e],title:e.name}),{kind:"shared"}}catch(o){return od(o)?{kind:"cancelled"}:(t.download(e),{kind:"downloaded",reason:"share-failed"})}}var id={txt:"text/plain",log:"text/plain",md:"text/markdown",markdown:"text/markdown",csv:"text/csv",tsv:"text/tab-separated-values",json:"application/json",xml:"application/xml",yaml:"text/yaml",yml:"text/yaml",html:"text/html",htm:"text/html",css:"text/css",js:"text/javascript",mjs:"text/javascript",ts:"text/plain",tsx:"text/plain",py:"text/plain",sh:"text/plain",svg:"image/svg+xml",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",bmp:"image/bmp",heic:"image/heic",avif:"image/avif",mp3:"audio/mpeg",wav:"audio/wav",m4a:"audio/mp4",ogg:"audio/ogg",mp4:"video/mp4",mov:"video/quicktime",webm:"video/webm",pdf:"application/pdf",zip:"application/zip",gz:"application/gzip",tar:"application/x-tar",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",xls:"application/vnd.ms-excel",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",ppt:"application/vnd.ms-powerpoint",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation"};function Kt(e){return e.split(/[/\\]+/).filter(Boolean).at(-1)??e}function Ki(e){let t=e.lastIndexOf(".");return t<=0?"application/octet-stream":id[e.slice(t+1).toLowerCase()]??"application/octet-stream"}var Xt=rd,$i=["IconShareOutlineRegular","IconShareOutline16"].map(e=>Xt[e]).find(e=>typeof e=="function"),Xi=["IconWarningOutlineRegular","IconWarningOutline16"].map(e=>Xt[e]).find(e=>typeof e=="function"),Ga=typeof Xt.Toast=="function"?Xt.Toast:void 0,Zi='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5v8.5M8 1.5 5 4.5M8 1.5l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 7H4a1.5 1.5 0 0 0-1.5 1.5v4A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 12 7h-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',Yi='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5v8.5M8 10 5 7M8 10l3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 12.5H4A1.5 1.5 0 0 0 2.5 14v.5h11V14A1.5 1.5 0 0 0 12 12.5h-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';function sd(){return React.createElement("span",{"aria-hidden":"true",dangerouslySetInnerHTML:{__html:Yi}})}function ld(){return $i!==void 0?React.createElement($i,{size:16}):React.createElement("span",{"aria-hidden":"true",dangerouslySetInnerHTML:{__html:Zi}})}function dd(e){document.querySelector('[data-mobile-nav="file-share-toast"]')?.remove();let t=document.createElement("div");t.dataset.mobileNav="file-share-toast",t.setAttribute("role","status"),t.textContent=e,document.body.appendChild(t),setTimeout(()=>t.remove(),3e3)}function Qi(e,t){return Gt(Zt())?e("shareFile",{name:t}):e("downloadFile",{name:t})}function cd(e,t){return e.kind!=="downloaded"?null:e.reason==="too-large"?t("downloadedTooLarge"):e.reason==="share-failed"?t("downloadedShareFailed"):t("downloadedUnsupported")}function pd(e,t){if(e instanceof fe){if(e.code==="too-large")return t("errorTooLarge");if(e.code==="not-found")return t("errorNotFound")}return t("errorGeneric",{message:e instanceof Error?e.message:String(e)})}function hd(e){let t=URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download=e.name,a.rel="noopener",a.style.display="none",document.body.appendChild(a),a.click(),a.remove(),setTimeout(()=>URL.revokeObjectURL(t),3e4)}function Zt(){let e=navigator,t=window.DSHA;return{canShare:typeof t?.canShareFile=="function"?a=>a.files.length===1&&t.canShareFile(a.files[0]):typeof e.canShare=="function"?a=>e.canShare(a):void 0,share:typeof t?.shareFile=="function"?a=>t.shareFile(a.files[0]):typeof e.share=="function"?a=>e.share(a):void 0,download:hd}}function Ji(e,t,a){let[n,o]=(0,Y.useState)(null),[i,r]=(0,Y.useState)(null),d=(0,Y.useRef)(null),p=(0,Y.useRef)(0),h=(0,Y.useRef)({sessionId:e,readFileRange:t,t:a});h.current={sessionId:e,readFileRange:t,t:a},(0,Y.useEffect)(()=>()=>d.current?.abort(),[]);let s=(0,Y.useCallback)(E=>{if(Ga===void 0){dd(E);return}p.current+=1,r({seq:p.current,text:E})},[]),l=(0,Y.useCallback)(E=>{if(d.current!==null)return;let w=new AbortController;d.current=w,o(E);let{sessionId:S,readFileRange:T,t:v}=h.current;(async()=>{let{parts:C}=await Ui((A,f,y)=>T(S,A,f,y),E,w.signal),b=Kt(E),_=new File(C,b,{type:Ki(b)}),u=await Gi(_,Zt()),c=cd(u,v);c!==null&&s(c)})().catch(C=>{w.signal.aborted||(console.warn("[dsh-web-mobile] file share failed:",C),s(pd(C,v)))}).finally(()=>{d.current===w&&(d.current=null),w.signal.aborted||o(null)})},[s]),m=i===null||Ga===void 0?null:React.createElement(Ga,{key:i.seq,text:i.text,...Xi===void 0?{}:{icon:React.createElement(ud,null)},onDone:()=>r(null)});return{busyPath:n,share:l,toast:m}}function ud(){let e=Xi;return e===void 0?null:React.createElement(e,null)}function er({absolutePath:e,sessionId:t,readFileRange:a,t:n}){let{busyPath:o,share:i,toast:r}=Ji(t,a,n),d=o!==null;return React.createElement(React.Fragment,null,React.createElement("button",{type:"button","data-mobile-nav":"file-share-preview","aria-label":d?n("sharing"):Qi(n,Kt(e)),"aria-busy":d,disabled:d,onClick:()=>i(e)},Gt(Zt())?React.createElement(ld,null):React.createElement(sd,null)),r)}var $t="file-share-row";function tr({sessionId:e,readFileRange:t,t:a}){let{busyPath:n,share:o,toast:i}=Ji(e,t,a),r=(0,Y.useRef)(null),d=(0,Y.useRef)({busyPath:n,share:o,t:a});d.current={busyPath:n,share:o,t:a};let p=(0,Y.useRef)(null);return(0,Y.useEffect)(()=>{let s=(r.current?.closest('[data-files-state="tree"]')??null)?.querySelector("[data-files-body]")??null;if(s===null)return;let l=T=>{T.preventDefault(),T.stopPropagation();let M=T.currentTarget.parentElement?.getAttribute("data-files-path");M&&d.current.share(M)},m=()=>{let{busyPath:T,t:v}=d.current;for(let M of s.querySelectorAll(`[data-mobile-nav="${$t}"]`))M.parentElement?.getAttribute("data-files-entry")!=="file"&&M.remove();for(let M of s.querySelectorAll('li[data-files-entry="file"]')){let C=M.querySelector(`:scope > [data-mobile-nav="${$t}"]`);C===null&&(C=document.createElement("button"),C.type="button",C.dataset.mobileNav=$t,C.innerHTML=Gt(Zt())?Zi:Yi,C.addEventListener("click",l),M.appendChild(C));let b=M.getAttribute("data-files-path")??"",_=T!==null&&T===b,u=_?v("sharing"):Qi(v,Kt(b)),c=T!==null;C.getAttribute("aria-label")!==u&&C.setAttribute("aria-label",u),C.disabled!==c&&(C.disabled=c),_?C.setAttribute("aria-busy","true"):C.removeAttribute("aria-busy")}};p.current=m;let E=0,w=()=>{E===0&&(E=requestAnimationFrame(()=>{E=0,m()}))},S=new MutationObserver(w);return S.observe(s,{childList:!0,subtree:!0}),m(),()=>{S.disconnect(),E!==0&&cancelAnimationFrame(E),p.current=null;for(let T of s.querySelectorAll(`[data-mobile-nav="${$t}"]`))T.removeEventListener("click",l),T.remove()}},[]),(0,Y.useEffect)(()=>{p.current?.()},[n,a]),React.createElement(React.Fragment,null,React.createElement("span",{hidden:!0,"data-mobile-nav":"file-share-anchor",ref:r}),i)}function ar(e){e.inject(["slots","locale","remote","remote.workspaceFiles"],t=>{t.effect(()=>t.locale.register(Ut,{zh:Vi,en:ji}),"dsh-web-mobile: file-share dictionaries");let a=t.remote,n=()=>({readFileRange:(o,i,r,d)=>a.workspaceFiles.readBytes(o,i,{range:r},d)});z(t,"dsh-web-mobile: file share",()=>{let o=[t.slots.inject("sidebar.right.tab.document.actions",()=>t.slots.register({name:"sidebar.right.tab.document.actions",id:"mobile-nav-file-share",order:100,locale:Ut,inject:n},er)),t.slots.inject("sidebar.right.tab.files.actions",()=>t.slots.register({name:"sidebar.right.tab.files.actions",id:"mobile-nav-file-share-rows",order:100,locale:Ut,inject:n},tr))];return()=>{for(let i of o)i()}})})}function nr(e){if(typeof e!="object"||e===null)return null;let t=e.selectPanel;return typeof t!="function"?null:()=>{t.call(e,null)}}var or='[class*="panelRow"][aria-current="page"]',Za=!1,Ka=null,$a=null;function Yt(){let e=$a;return e!==null&&e.isConnected&&e.matches(or)?!0:($a=document.querySelector(or),$a!==null)}function Xa(){return!Za&&Yt()}var ir="data-mobile-panel-exit",md="dsh-mobile-panel-exit",fd=2e3,bd="panel-ghost",gd=280,wd='[data-mobile-nav="frame"] [class*="_centerCol"] > * > *',vd='section[data-plugin-panel] button[class*="_moreBack"],section[data-plugin-panel] [data-plugin-detail] button[class*="_crumb"],section[data-plugin-panel] [data-plugin-item-detail] button[class*="_crumb"],section[data-plugin-panel] [data-plugin-row-detail] button[class*="_crumb"]';function rr(e){let t=nr(e),a=t!==null,n=!1,o=!1,i=null,r=0,d=null,p=null,h=null,s=Symbol("panel-exit");function l(){let u=D();if(u===null)return[];let c=[];for(let A of u.querySelectorAll('[class*="_centerCol"]')){let f=A.firstElementChild?.firstElementChild;if(f instanceof HTMLElement)for(let y of f.getAnimations())y.playState!=="idle"&&c.push(y)}return c}function m(){if(n){if(i!==null&&(window.clearTimeout(i),i=null),r!==0&&(cancelAnimationFrame(r),r=0),Ka===s){let u=D();u!==null&&u.removeAttribute(ir),Za=!1,Ka=null}n=!1}}function E(){p!==null&&(window.clearTimeout(p),p=null);let u=d;d=null,u!==null&&(h!==null&&u.removeEventListener("animationend",h,!0),h=null,u.remove())}function w(u){if(o||!n)return;let c=l();if(c.length===0){if(u<2){r=requestAnimationFrame(()=>{r=0,w(u+1)});return}m();return}let A=0;for(let f of c){let y=f.effect?.getTiming(),k=typeof y?.delay=="number"?y.delay:0,R=typeof y?.duration=="number"?y.duration:0,P=typeof y?.iterations=="number"?y.iterations:1;A=Math.max(A,k+R*P),f.finished.then(()=>m(),()=>m())}i=window.setTimeout(m,Math.min(fd,Math.max(250,A+200)))}function S(){if(!Yt())return null;let u=document.querySelector(wd);return u instanceof HTMLElement?u:null}function T(){if(!Yt())return null;let u=document.querySelector(vd);return u instanceof HTMLElement?u:null}function v(){return T()!==null}function M(u){E();let c=document.createElement("div");return c.dataset.mobileNav=bd,c.setAttribute("aria-hidden","true"),c.append(u.cloneNode(!0)),document.body.append(c),c}let C=()=>{if(o||!a||n)return;n=!0,Za=!0,Ka=s;let u=D();u!==null&&u.setAttribute(ir,""),document.dispatchEvent(new CustomEvent(md));let c=S();d=c===null?null:M(c);try{t()}finally{if(r=requestAnimationFrame(()=>{r=0,w(0)}),d!==null){let A=d;h=f=>{f.animationName==="dsh-web-mobile-panel-ghost-out"&&E()},A.addEventListener("animationend",h,!0),p=window.setTimeout(E,gd+120)}}},b=()=>{if(o||!a||n)return;let u=T();if(u!==null){u.click();return}C()};function _(){o=!0,m(),E()}return{exit:C,back:b,supported:a,panelOpen:Yt,subpageOpen:v,task:xd(C,a,b,T),dispose:_}}function xd(e,t,a,n){let o=!1,i=0,r=null,d=!1,p=!1,h=!1,s=null;function l(){h=!1,s!==null&&(window.clearTimeout(s),s=null)}function m(){h=!0,s!==null&&window.clearTimeout(s),s=window.setTimeout(l,1200);try{history.back()}catch{l()}}function E(){try{return history.pushState({mobilePanelExit:!0},""),!0}catch{return!1}}function w(){!t||o||E()&&(o=!0)}function S(){t&&E()&&(i+=1)}function T(b){return b===null?0:b.className.includes("_moreBack")?1:2}function v(){if(h){l();return}if(i>0)i-=1;else if(o)o=!1;else return;if(Xa()&&n()!==null){d=!0,a();return}Xa()&&e()}function M(){p||(window.addEventListener("popstate",v),p=!0)}function C(){p&&(window.removeEventListener("popstate",v),p=!1)}return{name:"panel-back-exit",scopes:["*"],ensure:()=>{if(!t)return;if(M(),!Xa()){o&&(o=!1,m()),r=null,d=!1;return}w();let b=n(),_=T(r),u=T(b);if(u===_)return;let c=d;if(d=!1,r=b,u>_){c||S();return}!c&&i>0&&(i-=1,m())},dispose:()=>{C(),l(),o&&(o=!1,m())}}}function sr(e,t){z(e,"dsh-web-mobile: panel row returns to conversation",()=>{let a=n=>{let o=n.target;if(!(o instanceof Element)||typeof o.closest!="function")return;let i=o.closest('[class*="panelRow"]');i!==null&&i.getAttribute("aria-current")==="page"&&(n.preventDefault(),n.stopPropagation(),t())};return document.addEventListener("click",a,!0),()=>document.removeEventListener("click",a,!0)})}var yd=/[?,]dsh-web-mobile\/client\.js/;function kd(e){if(typeof e!="string"||e==="")return null;try{let t=new URL(e,"http://x").searchParams.get("rev");return t===null||t===""?null:t}catch{return null}}function Ed(){for(let e of document.head.querySelectorAll('script[src], link[rel="preload"]')){let t=e.getAttribute("src")??e.getAttribute("href");if(t!==null&&yd.test(t))return kd(t)}return null}function lr(e){e.effect(()=>{let t=new URLSearchParams(location.search);if(!t.has("mobile-nav-debug"))return()=>{};let a=[],n=T=>a.push(`ERR ${T.message.slice(0,120)}`),o=T=>a.push(`REJ ${String(T.reason).slice(0,120)}`);window.addEventListener("error",n),window.addEventListener("unhandledrejection",o);let i=document.createElement("div");i.style.cssText=["position:fixed","top:40px","right:6px","z-index:2147483000","background:rgba(0,0,0,.82)","color:#fff","font:11px/1.5 ui-monospace,monospace","padding:8px 10px","border-radius:8px","max-width:94vw","max-height:70vh","overflow:auto","white-space:pre-wrap","pointer-events:none"].join(";");let r=()=>{let T=_=>!!document.querySelector(_),v=_=>{let u=document.querySelector(_);return u===null?"absent":getComputedStyle(u).visibility},M=document.querySelector('[data-mobile-nav="frame"]'),C=()=>{let _=document.querySelector("[data-sidebar-right-panel]");if(_===null)return"absent";let u=_.getBoundingClientRect();return`${_.getAttribute("data-sidebar-right-panel")} pad ${getComputedStyle(_).paddingTop} rect ${Math.round(u.top)},${Math.round(u.left)} ${Math.round(u.width)}x${Math.round(u.height)}`};return[`build rev ${Ed()??"?"} (diag chips)`,`URL ${location.pathname}${location.search}`,`W ${innerWidth} x ${innerHeight} dpr ${devicePixelRatio}`,`mq≤1023 ${matchMedia(Le).matches}  mq≥1024 ${matchMedia(Rn).matches}`,`safeTop framePad ${M===null?"n/a":getComputedStyle(M).paddingTop}  rightPanel ${C()}`,`css ${T('style[data-plugin-css*="mobile"]')}  frame ${!!M}`,`previewCol ${v("[data-aionui-preview-col]")}  explorerCol ${v("[data-aionui-explorer-col]")}`,`previewOpen ${M?.hasAttribute("data-aionui-preview-open")??"?"}  explorerOpen ${M?.hasAttribute("data-aionui-explorer-open")??"?"}  previewFull ${M?.hasAttribute("data-mobile-preview-full")??"?"}`,`header ${v("[data-phase] header")}  composer ${T("textarea, [data-composer-input]")}`,`genui cards ${document.querySelectorAll("[data-genui]").length}  panel ${T("[data-genui-panel]")}`,`phase ${document.querySelector("[data-phase]")?.getAttribute("data-phase")??"?"}`,`errs ${a.slice(-5).join(" | ")||"none"}`].join(`
`)},d=()=>{i.textContent=r()};d();let p=0,h=()=>{p===0&&(p=requestAnimationFrame(()=>{p=0,d()}))},s=new MutationObserver(T=>{for(let v of T)if(!(v.target===i||i.contains(v.target))){h();return}});s.observe(document.body,{childList:!0,subtree:!0,attributes:!0});let l=setInterval(d,1500);document.body.appendChild(i);let m=T=>{let v=document.querySelector(T);if(v===null)return"absent";let M=v.getBoundingClientRect();return`${Math.round(M.x)},${Math.round(M.y)} ${Math.round(M.width)}x${Math.round(M.height)}`},E=()=>[r(),`rects toggle ${m('[data-mobile-nav="toggle"]')} files ${m('[data-mobile-nav="files"]')} header ${m("[data-phase] header")} titleCluster ${m('[class*="_titleCluster"]')}`,`chips crea ${m('[class*="SVAs4q_"]')} team ${m("[data-team-action]")} model ${m('[class*="_7KE1Ra_trigger"]')} crumbs ${m('[class*="_crumbs"]')} crumbCurrent ${m('[class*="_crumbCurrent"]')}`,`ua ${navigator.userAgent}`,`screen ${screen.width}x${screen.height} standalone ${matchMedia("(display-mode: standalone)").matches}`,`vv ${visualViewport===null?"n/a":`${Math.round(visualViewport.width)}x${Math.round(visualViewport.height)}@${Math.round(visualViewport.offsetTop)}`}`].join(`
`),w=t.get("beacon")||"http://127.0.0.1:3199/diag",S=setInterval(()=>{fetch(w,{method:"POST",mode:"no-cors",body:E()}).catch(()=>{})},2e3);return()=>{window.removeEventListener("error",n),window.removeEventListener("unhandledrejection",o),s.disconnect(),clearInterval(l),clearInterval(S),p!==0&&cancelAnimationFrame(p),i.remove()}},"dsh-web-mobile: debug badge")}var Ya=1e4,bt=window,Qt=bt.__dshaMobileScrollState instanceof WeakMap?bt.__dshaMobileScrollState:bt.__dshaMobileScrollState=new WeakMap;function dr(){return[...document.querySelectorAll('[data-mobile-nav="frame"] [class*="scrollBody"]')]}function Td(){for(let e of dr())if(e.scrollTop>0){let t={top:e.scrollTop,savedAt:Date.now(),url:location.href};Qt.set(e,t),bt.__dshaMobileLastScroll=t}else Qt.delete(e)}function _d(){for(let n of dr()){let o=Qt.get(n);Qt.delete(n),!(!o||Date.now()-o.savedAt>Ya||o.url!==location.href)&&requestAnimationFrame(()=>{n.isConnected&&o.url===location.href&&Date.now()-o.savedAt<=Ya&&n.scrollTop===0&&(n.scrollTop=o.top)})}let e=bt.__dshaMobileLastScroll;if(e===void 0)return;let t=0,a=()=>{if(t+=1,e.url!==location.href||Date.now()-e.savedAt>Ya)return;let n=document.querySelector('[class*="scrollBody"]');if(n!==null&&n.scrollTop===0&&n.scrollHeight>=e.top+n.clientHeight){n.scrollTop=e.top;return}t<30&&requestAnimationFrame(a)};requestAnimationFrame(a)}function cr(e){e.effect(()=>e.locale.register(Q,{zh:Dn,en:qn}),"dsh-web-mobile: dictionaries"),e.effect(()=>{for(let n of document.querySelectorAll('style[data-plugin-css="dsh-web-mobile/mobile.css"]'))n.remove();let a=document.createElement("style");return a.dataset.plugin="dsh-web-mobile",a.dataset.pluginCss="dsh-web-mobile/mobile.css",a.textContent=Mn,document.head.appendChild(a),setTimeout(()=>{a.isConnected&&document.head.appendChild(a)},0),_d(),()=>{Td(),a.remove()}},"dsh-web-mobile: styles"),Si(e),Ci(e);let t=rr(e.layout);e.effect(()=>{let a=[qo(),Oo(e),Po(e,t),()=>t.dispose()];return()=>{for(let n of a)n()}},"dsh-web-mobile: reconciler infrastructure"),Wo(e),Ro(e),sr(e,t.exit),Go(e),Lo(e,Et),Uo(e),Ko(e),Jo(e),ei(e),di(e),ui(e),mi(e),fi(e),vi(e),yi(e),ki(e),Ti(e),Mi(e),Ri(e),Ni(e),Wi(e),Bo(e),Bn(e),ar(e),lr(e),e.slots.inject("conversation.session.header.actions",()=>e.slots.register({name:"conversation.session.header.actions",id:"mobile-nav-toggle",order:10,locale:Q,inject:()=>({toggleSidebar:()=>e.layout.toggleSidebar()})},Tn)),e.slots.inject("conversation.input.left",()=>e.slots.register({name:"conversation.input.left",id:"mobile-nav-file-upload",order:10,locale:Q,inject:()=>({})},_n))}var Sd=["添加工作区","添加工作区…","Add workspace","Add workspace…"],pr='[role="tab"], [role="treeitem"], [role="menuitem"], [role="menu"]';function hr(e){let t=(e??"").trim();return t.length<3||t.length>320||/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(t)&&!/^file:\/\//i.test(t)?!1:!!(/^(\/|~\/|\.\.?\/|[A-Za-z]:\\)/.test(t)||/\/[\w.\-]+\.\w{1,12}$/.test(t))}async function Cd(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.top="-9999px",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let a=document.execCommand("copy");return t.remove(),a}catch{return!1}}function ur(e,t){let a=!1,n=(b,_)=>{let u=t(b);if(_!==void 0)for(let[c,A]of Object.entries(_))u=u.split(`{${c}}`).join(String(A));return u},o=null,i=null,r=b=>{o===null&&(o=document.createElement("div"),o.setAttribute("data-mobile-nav","file-guard-toast"),Object.assign(o.style,{position:"fixed",left:"50%",bottom:"calc(64px + var(--dshp-kb, 0px))",transform:"translateX(-50%)",maxWidth:"84vw",zIndex:"9999",padding:"10px 14px",borderRadius:"10px",background:"rgba(20,22,28,.92)",color:"#fff",fontSize:"13px",lineHeight:"1.4",textAlign:"center",fontFamily:"inherit",boxShadow:"0 4px 16px rgba(0,0,0,.28)",pointerEvents:"none",opacity:"0",transition:"opacity .18s ease"}),document.body.appendChild(o)),o.textContent=b,requestAnimationFrame(()=>{o!==null&&(o.style.opacity="1")}),i!==null&&window.clearTimeout(i),i=window.setTimeout(()=>{o!==null&&(o.style.opacity="0")},2600)},d=null,p=b=>{document.activeElement?.blur(),d?.remove();let u=b.length>65536?`${b.slice(0,65536)}
${t("fileTruncated")}`:b,c=document.createElement("div");c.setAttribute("data-mobile-nav","file-guard-fallback"),Object.assign(c.style,{position:"fixed",left:"max(8px, env(safe-area-inset-left, 0px))",right:"max(8px, env(safe-area-inset-right, 0px))",bottom:"calc(16px + env(safe-area-inset-bottom, 0px) + var(--dshp-kb, 0px))",maxHeight:"45vh",overflow:"auto",zIndex:"10000",padding:"10px 12px",borderRadius:"10px",background:"rgba(20,22,28,.96)",color:"#eee",boxShadow:"0 6px 24px rgba(0,0,0,.4)",WebkitOverflowScrolling:"touch"});let A=document.createElement("div");Object.assign(A.style,{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px",color:"#9aa0a8",marginBottom:"6px"});let f=document.createElement("span");f.textContent=t("fileFallbackTitle");let y=document.createElement("button");y.type="button",y.textContent=t("fileFallbackClose"),Object.assign(y.style,{border:"1px solid #444a52",background:"transparent",color:"#eee",borderRadius:"6px",padding:"2px 10px",fontSize:"12px",cursor:"pointer"}),y.addEventListener("click",()=>{c.remove()});let k=document.createElement("pre");k.textContent=u,Object.assign(k.style,{margin:"0",whiteSpace:"pre-wrap",wordBreak:"break-all",userSelect:"text",WebkitUserSelect:"text",fontSize:"12px",lineHeight:"1.5",fontFamily:"inherit"}),A.append(f,y),c.append(A,k),document.body.appendChild(c),d=c},h=b=>{let _=b.target;if(_===null)return;let u=_.closest("button, a");u!==null&&u.closest("[data-phase]")!==null&&u.closest(pr)===null&&hr(u.textContent)&&(b.preventDefault(),b.stopImmediatePropagation(),r(t("fileGuardMsg")))};document.addEventListener("click",h,!0);let s=0,l=(b=document)=>{let _=b.querySelectorAll("button, a");(b instanceof Element&&b.matches("button, a")?[b,..._]:_).forEach(c=>{if(c.getAttribute("data-mobile-nav-copy")==="1"||c.closest("[data-phase]")===null||c.closest(pr)!==null)return;let A=(c.textContent??"").trim();if(!hr(A))return;c.setAttribute("data-mobile-nav-copy","1");let f=String(++s);c.setAttribute("data-mobile-nav-copy-id",f);let y=c.parentElement;if(y!==null)for(let R of Array.from(y.querySelectorAll(':scope > [data-mobile-nav="copy-file"]')))R.previousElementSibling?.getAttribute("data-mobile-nav-copy-id")!==R.getAttribute("data-mobile-nav-copy-for")&&R.remove();let k=document.createElement("button");k.type="button",k.setAttribute("data-mobile-nav","copy-file"),k.setAttribute("data-mobile-nav-copy-for",f),k.textContent=t("fileCopy"),k.addEventListener("click",async R=>{R.preventDefault(),R.stopPropagation();let P=(c.textContent??"").trim().replace(/^file:\/\//i,"");k.disabled=!0,k.textContent="…";try{let O=await e(P);if(a)return;if(!O?.ok){r(O?.error?.message??t("fileCopyFailed"));return}let H=O.value?.content??"",B=O.value?.size??H.length;if(B>2097152){r(n("fileTooLarge",{size:(B/(1024*1024)).toFixed(1)}));return}let U=await Cd(H);if(a)return;if(U){let K=Math.max(1,Math.round(B/1024));r(n("fileCopyDone",{kb:K}))}else r(t("fileCopyFailedFallback")),p(H)}catch(O){a||r(O instanceof Error?O.message:t("fileCopyFailed"))}finally{k.isConnected&&(k.disabled=!1,k.textContent=t("fileCopy"))}}),c.parentElement?.insertBefore(k,c.nextSibling)})},m=new Map,E='[role="menuitem"],[role="option"],li,button,a',w=b=>{let _=(b.getAttribute("aria-label")||""||b.textContent||"").trim();if(Sd.includes(_)){let u=b;m.has(b)||m.set(b,u.style.display),u.style.display="none",b.setAttribute("data-mobile-nav-hide","add-workspace")}},S=b=>{b instanceof Element&&b.matches(E)&&w(b),b.querySelectorAll(E).forEach(w)},T=new Set,v=0,M=()=>{v=0;for(let b of T)b.isConnected&&(l(b),S(b));T.clear();for(let b of m.keys())b.isConnected||m.delete(b)};l(),S(document);let C=new MutationObserver(b=>{for(let _ of b){if(_.type==="characterData"){let u=_.target.parentElement;u!==null&&u.childElementCount>0&&T.add(u);continue}_.addedNodes.forEach(u=>{u.nodeType===1?T.add(u):u.nodeType===3&&u.parentElement!==null&&T.add(u.parentElement)})}T.size>0&&v===0&&(v=requestAnimationFrame(M))});return C.observe(document.body,{childList:!0,subtree:!0,characterData:!0}),()=>{a=!0,document.removeEventListener("click",h,!0),C.disconnect(),v!==0&&cancelAnimationFrame(v),T.clear(),i!==null&&window.clearTimeout(i),o?.remove(),o=null,d?.remove(),d=null,document.querySelectorAll('[data-mobile-nav="copy-file"]').forEach(b=>b.remove()),document.querySelectorAll('[data-mobile-nav-copy="1"]').forEach(b=>b.removeAttribute("data-mobile-nav-copy")),document.querySelectorAll('[data-mobile-nav-hide="add-workspace"]').forEach(b=>{let _=b,u=m.get(b);u!==void 0?_.style.display=u:_.style.removeProperty("display"),m.delete(b),b.removeAttribute("data-mobile-nav-hide")}),m.clear()}}var Jt="dsh-pocket.layout";function mr({urlValue:e,stored:t,narrowMatch:a}){let n=String(e??"").trim().toLowerCase();return n==="desktop"?"desktop":n==="mobile"?"mobile":n==="auto"?a?"mobile":"desktop":t==="desktop"||t==="mobile"?t:a?"mobile":"desktop"}function fr(e){try{if(typeof localStorage>"u")return"";if(e==null)return Ad();let t=String(e).trim().toLowerCase();try{t==="desktop"||t==="mobile"?localStorage.setItem(Jt,t):(t==="auto"||t==="")&&localStorage.removeItem(Jt)}catch{}let a=localStorage.getItem(Jt);return a==="desktop"||a==="mobile"?a:""}catch{return""}}function Ad(){try{if(typeof localStorage>"u")return"";let e=localStorage.getItem(Jt);return e==="desktop"||e==="mobile"?e:""}catch{return""}}function br(e){let{hasGeneration:t,generation:a,state:n}=e??{};if(t===!0){let i=a!=null;return{down:!i,usable:i}}let o=n==="disconnected"||n==="connecting";return{down:o,usable:!o}}function gr({staleMs:e=2500,hardStuckMs:t=8e3,maxRepairAttempts:a=3}={}){let n=new Map,o=new Map,i=Number.NEGATIVE_INFINITY,r=Number.NEGATIVE_INFINITY,d=0,p=!1,h=(M,C)=>{if(M.down){p=!0;return}p&&(p=!1,d+=1,i=C)},s=M=>{r=M,d+=1,p=!1,o.clear()},l=(M,C)=>n.has(M)?!1:(n.set(M,C),!0),m=M=>{n.delete(M),o.delete(M)},E=(M,C,b={})=>{let _=n.get(M);if(_===void 0)return w;if((o.get(M)??0)>=a)return{waiting:!1,stale:!0,repair:!1,reconnect:!1};let u=b.openState==="loading";if(u&&b.openPromise==="gone")return T(M,{reconnect:!1});let c=b.openState!=="open"&&b.openState!=="cold";if(r>_){let A=C-r;return A<e?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:e-A}:c?T(M,{reconnect:!0}):S}if(d>0&&i>_){let A=C-Math.max(_,i);return A<e?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:e-A}:c?T(M,{reconnect:!1}):S}if(u&&C-_>=t)return T(M,{reconnect:!0});if(b.openState==="open"){let A=e-(C-_);return A>0?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:A}:S}if(b.openState===void 0){let A=t-(C-_);return A>0?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:A}:S}return u?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:Math.max(0,t-(C-_))}:w},w={waiting:!1,stale:!1,repair:!1,reconnect:!1},S={waiting:!1,stale:!0,repair:!1,reconnect:!1},T=(M,{reconnect:C})=>(o.set(M,(o.get(M)??0)+1),{waiting:!1,stale:!0,repair:!0,reconnect:C});return{noteLink:h,noteResume:s,observe:l,release:m,decide:E,reset:()=>{n.clear(),o.clear(),p=!1,d=0,i=Number.NEGATIVE_INFINITY,r=Number.NEGATIVE_INFINITY}}}function wr({gapMs:e=5e3,intervalMs:t=1e3}={}){let a=null;return{tick:i=>{if(a===null)return a=i,!1;let r=i-a;return a=i,r>Math.max(e,t*2)},reset:()=>{a=null},intervalMs:t}}var gt="pocket",Qa={section:"手机访问",title:"📱 手机访问",subtitle:"手机扫码打开的就是电脑上的这个界面，实时同步",developer:"开发者：大哈",starAsk:"⭐ 顺手留颗 Star，大哈能高兴一整天",starCta:"好，这就去 Star",restarted:"已重启",reloadFailed:"自动刷新没成功（新进程可能还在启动）",reloadNow:"刷新页面",ok:"知道了",loadingStatus:"正在读取状态…",offlineHint:"暂时连不上宿主（可能正在重启），恢复后会自动刷新状态",updateFailedTitle:"更新失败",later:"稍后",bgHint:"进程在后台运行（不挂终端）。如需停止：{cmd}",updatedRestart:"已更新 v{ver}，重启生效",updateAutoRestarting:"已更新 v{ver}，正在自动重启…",updatedOk:"已更新 v{ver}",updateAvailable:"新版本 v{ver}",updating:"更新中…",updateTo:"更新到 v{ver}",restartingNow:"正在重启生效…",restarting:"重启中…",restartNow:"🔄 重启 dsh web 生效",updatingDetail:"⏳ 更新中（通常 1-2 分钟）· 已等待 {s} 秒",restartingDetail:"⏳ 正在重启生效（通常 10-30 秒）· 已等待 {s} 秒",updatedAutoDetail:"已更新，正在自动重启生效，请稍候刷新",updatedRestartDetail:"已更新，重启 dsh web 生效",updateFailed:"失败：{err}（手动更新：dsh plugin --profile web update dsh-pocket --latest -w）",versionRange:"当前 v{cur} → 最新 v{latest}",wanAccess:"公网访问",publicConfig:"公网配置",publicSetupHint:"不提供现成公网地址。请先配置自己的 Cloudflare 域名与 Tunnel Token；未配置时公网保持关闭，保存配置不会自动开启。",publicConfigure:"配置公网访问",pinLabel:"访问密码",advAddress:"高级 · 手动选地址",wanOffHint:"公网已关闭。开启后可通过自配固定域名从任何网络访问（每次开启需确认免责声明）",resetFactory:"🧹 恢复出厂设置",resetGo:"恢复",resetIntro:"设置搞出问题时的临时兜底：清空本机配置并重设随机密码（DSH 的会话、模型、插件配置不受影响）",resetTitle:"⚠️ 确认恢复出厂设置？",resetBody:`将清空并恢复默认：
① 开关：局域网访问=开、访问密码=开、手机端右边栏=开、局域网地址=自动
② 公网：关闭公网访问，清空 Tunnel Token、固定域名与自动恢复标记；重新配置前保持关闭
③ 密码：公网和局域网都换成新的随机 8 位密码（旧密码立即作废，手机需重新输入）

DSH 自身的会话、模型、插件配置不受影响；此操作不可撤销。`,resetConfirm:"确认恢复",resetDone:"✅ 已恢复出厂设置：设置已清空，密码已换新（手机需重新输入）",resetFailed:"❌ 恢复失败，请重试",resetPartial:"⚠️ 重置不完整：部分设置或密码没能写入磁盘，详情见下方提示",pinSaveMemoryOnly:"⚠️ 密码只在本次运行有效：写入磁盘失败，重启后会失效",lanTitle:"📶 局域网（同一 WiFi）",lanHint:"手机连接同一 WiFi 后扫码即可打开",lanAccess:"局域网访问",lanDisabledHint:"局域网访问已关闭：手机扫码/链接均不可用（公网不受影响）。点「开」恢复。",lanToggleTitleOff:"关闭局域网访问",lanToggleBodyOff:"关闭后，同一 WiFi 下的手机将无法扫码访问（局域网二维码/链接立即失效）。公网访问不受影响。确定关闭？",lanToggleTitleOn:"开启局域网访问",lanToggleBodyOn:"开启后，同一 WiFi 的手机扫码即可访问（默认需输入局域网密码）。确定开启？",confirm:"确定",lanAddress:"局域网地址",lanAddressAuto:"自动（推荐）",lanPin:"局域网访问密码",on:"开",off:"关",lanPinValue:"🔐 访问密码：{pin}（手机打开需输入；与公网密码分开）",lanPinCustomValue:"🔐 访问密码：{pin}（自定义；手机打开需输入）",refresh:"刷新",customize:"自定义",customizing:"新密码（8–64 位，英文字母或数字）：",save:"保存",cancel:"取消",pinInvalid:"密码必须是 8–64 位英文字母或数字",pinCharsFiltered:"只保留英文字母和数字，其他字符已被忽略",pinCustomHint:"自定义密码不会自动换新；泄露后请主动修改",lanPinOff:"🔓 密码已关闭：扫码直连，无需密码（仅同一局域网设备可访问；公网仍要密码）",lanPinRemoteHint:"为避免公网访客拿到局域网密码，这里只在本机/局域网内显示；需要查看请改用局域网地址打开设置。",lanPinUnavailable:"暂时读不到局域网访问密码，请刷新页面重试。",lanLocalOnly:"局域网入口的开/关与地址只允许在本机或局域网内修改；你现在是通过公网隧道访问的。",wanLocalOnly:"公网隧道的开启/停止与配置只允许在本机或局域网内操作；通过隧道访问时只能查看状态。",resetLocalOnly:"恢复出厂设置只允许在本机或局域网内执行。",lanStarting:"代理未就绪…",mobileRightbar:"手机端右边栏",mobileRightbarHint:"显示原生右边栏入口；普通手机可按需关闭，折叠屏展开后使用更方便",prefsTitle:"手机端偏好",prefsHint:"这些开关只影响手机上的显示，桌面端不受影响",statusOn:"已开启",statusOff:"已关闭",statusConnected:"已连接",mobilePinchZoom:"手机端两指捏合缩放",mobilePinchZoomHint:"默认关闭：两指捏合禁用、页面锁定 1x；开启后恢复捏合，页面意外被放大时可用它还原",mobileFontSize:"手机端字号",mobileFontSizeHint:"默认「跟随桌面」，桌面改字号时手机同步变化；选择具体字号后仅手机会话正文独立变化，不影响桌面设置",mobileFontFollow:"跟随桌面",wanTitle:"🌐 公网（人在外面）",wanHint:"需先自行配置 Cloudflare 固定域名与 Tunnel Token，开启后可从任何网络访问",wanPin:"🔐 访问密码：{pin}（启停或重启不会自动换新；手机打开链接需输入）",wanPinCustom:"🔐 访问密码：{pin}（自定义；启停或重启不会自动换新）",stopTunnel:"关闭公网",enable:"开启公网访问",opening:"开启中…",namedSummary:"固定域名：{host} · Token {token}",namedTokenSet:"已配置",namedTokenMissing:"未配置",namedEdit:"修改",namedHostnameLabel:"固定域名：",namedTokenLabel:"Tunnel Token（留空 = 保持不变）：",namedHow:"请用自己的 Cloudflare 账号和域名，在 Zero Trust → Networks → Tunnels 创建命名隧道并复制 Token；自行添加 Public Hostname 路由，将 Service 指向本机实际代理端口（通常为 http://127.0.0.1:3081，改过端口请相应修改）。保存配置不会自动开启公网。",namedSecurity:"固定域名长期可被发现、更易被扫描。请设置自定义强密码并用完即关；公网密码不会随启停或重启自动换新，泄露后请主动修改。",namedNeedCfg:"请先填写自己的 Cloudflare 固定域名与 Tunnel Token",namedRunningHint:"自配固定域名（Cloudflare 命名隧道）——地址不随重启变化",namedWanHint:"仅支持自配 Cloudflare 固定域名与 Tunnel Token；未配置时公网保持关闭",namedTakeEffect:"配置已保存，不会自动开启公网；如公网正在运行，需关闭并重新开启后生效",disclaimerTitle:"⚠️ 安全免责声明",disclaimerBody:"开启公网 = 把本机 DSH（能执行代码）暴露到互联网。任何人拿到公网链接和密码，都能访问甚至操作你的电脑。请确认：① 使用自定义强密码或妥善保管自动密码；② 用完立即「关闭公网」；③ 公司/涉密网络请先确认合规。",disclaimerAgree:"我已知情，同意开启",disclaimerHint:"请勾选「我已知情」后再开启公网",downloading:"⏳ 下载 cloudflared（首次约 20-50MB，通常 1-2 分钟；之后秒开）· 已等待 {s} 秒",connecting:"⏳ 连接 Cloudflare 边缘（通常 5-30 秒）· 已等待 {s} 秒{suffix}",slowHint:" — 有点久？检查是否开着代理/VPN（Clash TUN 等）",error:"❌ 开启失败：{detail}（可重试；若是代理/VPN 问题见 README 排障）",unknownError:"未知错误",feedback:"有问题？欢迎到 GitHub Issues 反馈 🙏",fileGuardMsg:"手机上无法直接打开电脑上的文件",fileCopy:"复制",fileCopyDone:"已复制文件内容（{kb} KB）",fileCopyFailed:"复制失败",fileCopyFailedFallback:"复制失败，下方可长按选择",fileFallbackTitle:"复制失败，长按下方文本选择",fileFallbackClose:"关闭",fileTooLarge:"文件过大（{size}MB），已跳过复制",fileTruncated:"…已截断",copyLink:"复制链接",copied:"✅ 已复制地址",copyFailed:"复制失败，请长按地址手动复制",pinShow:"显示",pinHide:"隐藏"},vr={section:"Phone access",title:"📱 Phone access",subtitle:"The phone shows this exact screen, live",developer:"Developer: daha1216 (大哈)",starAsk:"⭐ Drop a Star if it helped — it makes daha1216’s day",starCta:"★ Star it on GitHub",restarted:"Restarted",reloadFailed:"Auto-reload did not go through (the new process may still be starting)",reloadNow:"Reload",ok:"Got it",loadingStatus:"Loading status…",offlineHint:"Cannot reach the host right now (it may be restarting); status refreshes automatically once it is back",updateFailedTitle:"Update failed",later:"Later",bgHint:"Running in the background (not attached to a terminal). To stop: {cmd}",updatedRestart:"Updated to v{ver} — restart to apply",updateAutoRestarting:"Updated to v{ver} — auto-restarting…",updatedOk:"Updated to v{ver}",updateAvailable:"Update available: v{ver}",updating:"Updating…",updateTo:"Update to v{ver}",restartingNow:"Restarting to apply…",restarting:"Restarting…",restartNow:"🔄 Restart dsh web now",updatingDetail:"⏳ Updating (usually 1-2 min) · {s}s elapsed",restartingDetail:"⏳ Restarting to apply (usually 10-30s) · {s}s elapsed",updatedAutoDetail:"Updated — auto-restarting in progress, refresh shortly",updatedRestartDetail:"Updated — restart dsh web to apply",updateFailed:"Failed: {err} (manual update: dsh plugin --profile web update dsh-pocket --latest -w)",versionRange:"Current v{cur} → latest v{latest}",wanAccess:"Public access",publicConfig:"Public configuration",publicSetupHint:"No ready-made public address is provided. Configure your own Cloudflare hostname and Tunnel Token first. Public access stays off until configured; saving does not start it.",publicConfigure:"Configure public access",pinLabel:"Access PIN",advAddress:"Advanced · Pick address",wanOffHint:"Public access is off. Enable it to use your configured hostname from any network (accept the disclaimer on each enable).",resetFactory:"🧹 Factory reset",resetGo:"Reset",resetIntro:"Temporary fallback when settings break: clear local config and re-roll random PINs (DSH sessions, models and plugin config are untouched)",resetTitle:"⚠️ Confirm factory reset?",resetBody:`This clears and restores defaults:
① Switches: LAN access on, access PIN on, mobile right sidebar on, LAN address auto
② Public: access stopped; Tunnel Token, fixed hostname and auto-restore marker cleared. Public access stays off until configured again
③ PINs: both public and LAN become new random 8-character PINs (old ones stop working; the phone must re-enter)

Your DSH sessions, models and plugin config are untouched. This cannot be undone.`,resetConfirm:"Reset",resetDone:"✅ Factory reset done: settings cleared and PINs re-rolled (re-enter the PIN on your phone)",resetFailed:"❌ Reset failed — please retry",resetPartial:"⚠️ Reset incomplete: some settings or PINs could not be written to disk — see the hint below",pinSaveMemoryOnly:"⚠️ PIN is only valid for this run: writing to disk failed, so it reverts after a restart",lanTitle:"📶 LAN (same Wi-Fi)",lanHint:"Scan to open once your phone is on the same Wi-Fi",lanAccess:"LAN access",lanDisabledHint:'LAN access is off — the QR code and link are unavailable (public access is unaffected). Tap "On" to restore.',lanToggleTitleOff:"Turn off LAN access",lanToggleBodyOff:"Once off, phones on the same Wi-Fi can no longer scan to connect (the LAN QR code and link stop working immediately). Public access is unaffected. Turn it off?",lanToggleTitleOn:"Turn on LAN access",lanToggleBodyOn:"Once on, phones on the same Wi-Fi can scan to connect (a LAN PIN is required by default). Turn it on?",confirm:"Confirm",lanAddress:"LAN address",lanAddressAuto:"Auto (recommended)",lanPin:"LAN access PIN",on:"On",off:"Off",lanPinValue:"🔐 PIN: {pin} (required on the phone; separate from the public PIN)",lanPinCustomValue:"🔐 PIN: {pin} (custom; required on the phone)",refresh:"Refresh",customize:"Customize",customizing:"New PIN (8–64 chars, letters/digits): ",save:"Save",cancel:"Cancel",pinInvalid:"PIN must be 8–64 characters (letters and digits only)",pinCharsFiltered:"Only letters and digits are kept; other characters were ignored",pinCustomHint:"Custom PINs do not rotate automatically; change yours if it leaks.",lanPinOff:"🔓 PIN off — scan & go, no PIN (LAN devices only; public still requires PIN)",lanPinRemoteHint:"Hidden over the tunnel so public visitors cannot read the LAN PIN. Open Settings via the LAN address to view it.",lanPinUnavailable:"Couldn't read the LAN PIN; refresh the page and try again.",lanLocalOnly:"LAN access can only be toggled or re-addressed from the host or the local network; you are visiting through the public tunnel.",wanLocalOnly:"Starting, stopping and configuring the public tunnel is local-only; over the tunnel you can only view its status.",resetLocalOnly:"Factory reset can only be run from the host or the local network.",lanStarting:"Proxy starting…",mobileRightbar:"Mobile right sidebar",mobileRightbarHint:"Show the native right-sidebar entry; disable it for a compact phone header or keep it on for an unfolded display",prefsTitle:"Mobile preferences",prefsHint:"These options only affect the phone layout; the desktop is untouched",statusOn:"On",statusOff:"Off",statusConnected:"Connected",mobilePinchZoom:"Mobile pinch zoom",mobilePinchZoomHint:"Off by default: two-finger pinch disabled, page locked at 1x; turn on to restore pinch for recovering from accidental zoom",mobileFontSize:"Mobile font size",mobileFontSizeHint:'Defaults to "Follow desktop", so desktop font changes also affect the phone. Choose a specific size for independent mobile conversation text without changing the desktop setting.',mobileFontFollow:"Follow desktop",wanTitle:"🌐 Anywhere (public)",wanHint:"Configure your own Cloudflare fixed hostname and Tunnel Token first, then enable access from any network.",wanPin:"🔐 PIN: {pin} (not rotated on stop/start or restart; required on the phone)",wanPinCustom:"🔐 PIN: {pin} (custom; not rotated on stop/start or restart)",stopTunnel:"Stop",enable:"Enable anywhere",opening:"Enabling…",namedSummary:"Fixed domain: {host} · Token {token}",namedTokenSet:"configured",namedTokenMissing:"not set",namedEdit:"Edit",namedHostnameLabel:"Fixed domain:",namedTokenLabel:"Tunnel Token (blank = keep current):",namedHow:"Use your own Cloudflare account and domain. Create a named tunnel in Zero Trust → Networks → Tunnels, copy its Token, and add a Public Hostname route yourself. Point its Service to the actual local proxy port (usually http://127.0.0.1:3081; adjust if changed). Saving does not start public access.",namedSecurity:"A fixed hostname remains discoverable and is easier to scan. Use a strong custom PIN and turn access off when done. The public PIN does not rotate on stop/start or restart; change it yourself if it leaks.",namedNeedCfg:"Set your own Cloudflare fixed hostname and Tunnel Token first",namedRunningHint:"Your configured hostname (Cloudflare named tunnel) — unchanged on restart",namedWanHint:"Requires your own Cloudflare fixed hostname and Tunnel Token; public access stays off until configured.",namedTakeEffect:"Configuration saved; public access is not started automatically. If it is running, turn it off and on again to apply changes.",disclaimerTitle:"⚠️ Security disclaimer",disclaimerBody:"Enabling public access exposes this computer’s DSH (which can execute code) to the internet. Anyone with the public link and PIN can reach — and operate — your computer. Please confirm: ① use a strong custom PIN or keep the auto-generated one safe; ② turn public access OFF as soon as you’re done; ③ on a corporate/classified network, confirm compliance first.",disclaimerAgree:"I understand and agree",disclaimerHint:'Check "I understand" before enabling public access',downloading:"⏳ Downloading cloudflared (first run ~20-50MB, usually 1-2 min; instant afterward) · {s}s elapsed",connecting:"⏳ Connecting to Cloudflare edge (usually 5-30s) · {s}s elapsed{suffix}",slowHint:" — taking long? Check for a proxy/VPN (e.g., Clash TUN)",error:"❌ Failed to enable: {detail} (you can retry; for proxy/VPN issues see the README)",unknownError:"unknown error",feedback:"🙏 Questions? Open an issue on GitHub",fileGuardMsg:"Cannot open a file stored on your computer directly from the phone",fileCopy:"Copy",fileCopyDone:"File content copied ({kb} KB)",fileCopyFailed:"Copy failed",fileCopyFailedFallback:"Copy failed — long-press below to select instead",fileFallbackTitle:"Copy failed — long-press the text below to select it",fileFallbackClose:"Close",fileTooLarge:"File too large ({size}MB), copy skipped",fileTruncated:"… truncated",copyLink:"Copy link",copied:"✅ Address copied",copyFailed:"Copy failed — long-press the address to copy it manually",pinShow:"Show",pinHide:"Hide"};var Ld=`
  body[data-dsh-pocket-layout="mobile"] [data-mobile-nav="frame"] [class*="scrollBody"] {
    touch-action: pan-y pinch-zoom !important;
  }
  body[data-dsh-pocket-pinch-zoom="off"],
  body[data-dsh-pocket-pinch-zoom="off"] [data-mobile-nav="frame"] [class*="scrollBody"] {
    touch-action: pan-y !important;
  }
  body[data-dsh-pocket-layout="mobile"] [data-mobile-nav-explorer="0"] [data-mobile-nav="files"],
  body[data-dsh-pocket-layout="mobile"] [data-mobile-nav-explorer="0"] [data-mobile-nav="explorer"] {
    display: none !important;
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
    [data-aionui-explorer-col],
    html [data-aionui-explorer-col],
    html [data-aionui-preview-col] {
      left: max(8px, env(safe-area-inset-left, 0px)) !important;
      right: max(8px, env(safe-area-inset-right, 0px)) !important;
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
  }
}`;function yr(e){let t=new URL(window.location.href).searchParams.get("dsh-layout"),a=t??"",n=window.matchMedia("(max-width: 1023px) and (pointer: coarse)"),o=fr(t),i=mr({urlValue:a,stored:o,narrowMatch:n.matches});if(document.body?.setAttribute("data-dsh-pocket-layout",i),i==="desktop")return;let r=n;i==="mobile"&&(r={matches:!0,addEventListener:()=>{},removeEventListener:()=>{}});let d=a.trim().toLowerCase();d==="desktop"||d==="mobile"||d!=="auto"&&(o==="desktop"||o==="mobile")||e.effect(()=>{let s=()=>{document.body?.setAttribute("data-dsh-pocket-layout",n.matches?"mobile":"desktop")};return n.addEventListener("change",s),()=>{n.removeEventListener("change",s)}},"dsh-pocket: auto layout attribute sync on breakpoint change");let h=(s,l)=>{e.effect(()=>{let m,E=()=>{m?.(),m=r.matches?l():void 0};return E(),r.addEventListener?.("change",E),()=>{r.removeEventListener?.("change",E),m?.()}},s)};cr(e),e.effect(()=>{let s=!0,l=w=>{document.body?.setAttribute(tt,w?"on":"off")},m=w=>{l(w.detail?.enabled===!0)},E=async()=>{try{let w=await e.connection.rpc.call(Se,G.status,{});s&&l(w?.ok===!0?w.value?.mobileRightbarEnabled!==!1:!0)}catch{s&&l(!0)}};return window.addEventListener(at,m),E(),()=>{s=!1,window.removeEventListener(at,m),document.body?.removeAttribute(tt)}},"dsh-mobile-nav: optional right sidebar"),e.effect(()=>{let s=!0,l=w=>{document.body?.setAttribute(qe,w?"on":"off")},m=w=>{l(w.detail?.enabled===!0)},E=async()=>{try{let w=await e.connection.rpc.call(Se,G.status,{});s&&l(w?.ok===!0?w.value?.mobilePinchZoomEnabled===!0:!1)}catch{s&&l(!1)}};return window.addEventListener(nt,m),E(),()=>{s=!1,window.removeEventListener(nt,m),document.body?.removeAttribute(qe)}},"dsh-pocket: pinch-zoom setting"),e.effect(()=>{let s=!0,l=w=>{let S=document.body;if(!S)return;let T=Number(w);Number.isInteger(T)&&T>=12&&T<=22?(S.style.setProperty(Ae,`${T}px`),S.setAttribute(Ce,String(T))):(S.style.removeProperty(Ae),S.removeAttribute(Ce))},m=w=>{l(Number(w.detail?.size)||0)},E=async()=>{try{let w=await e.connection.rpc.call(Se,G.status,{});s&&l(w?.ok===!0&&Number(w.value?.mobileFontSize)||0)}catch{s&&l(0)}};return window.addEventListener(ot,m),E(),()=>{s=!1,window.removeEventListener(ot,m),document.body?.style.removeProperty(Ae),document.body?.removeAttribute(Ce)}},"dsh-pocket: mobile font size"),h("dsh-pocket: mobile zoom lock",()=>{let s=0,l=()=>{s=window.visualViewport?.scale??0},m=w=>{let S=w.scale,T=typeof S=="number"&&Number.isFinite(S)&&S<1;if(document.body?.getAttribute(qe)!=="on"){if(s>1.0001&&T)return;w.preventDefault();return}s>0&&s*S<=s||w.preventDefault()},E=()=>{s=0};return document.addEventListener("gesturestart",l,{passive:!1}),document.addEventListener("gesturechange",m,{passive:!1}),document.addEventListener("gestureend",E,{passive:!1}),()=>{document.removeEventListener("gesturestart",l),document.removeEventListener("gesturechange",m),document.removeEventListener("gestureend",E)}}),h("dsh-pocket: dialog focus containment",()=>{let s='[role="dialog"][aria-modal="true"]',l='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',m=[],E=c=>c.hasAttribute("data-mobile-nav")||c.parentElement?.hasAttribute("data-mobile-nav")===!0,w=c=>Array.from(c.querySelectorAll(l)).filter(A=>A.getClientRects().length>0),S=c=>!c.closest('[aria-hidden="true"], [inert]')&&c.getClientRects().length>0,T=()=>{let c=Array.from(document.querySelectorAll(s)).filter(A=>E(A)&&S(A));return c.length>0?c[c.length-1]:null},v=null,M=c=>{if(v===null||!v.isConnected||c.key!=="Tab")return;let A=w(v);if(A.length===0){c.preventDefault(),document.activeElement!==v&&v.focus({preventScroll:!0});return}let f=A[0],y=A[A.length-1],k=document.activeElement;c.shiftKey&&(k===f||!v.contains(k))?(c.preventDefault(),y.focus({preventScroll:!0})):!c.shiftKey&&(k===y||!v.contains(k))&&(c.preventDefault(),f.focus({preventScroll:!0}))};document.addEventListener("keydown",M,!0);let C=()=>{let c=T();if(c===v)return;if(v!==null&&c!==null){v=c,c.hasAttribute("tabindex")||c.setAttribute("tabindex","-1"),(w(c)[0]??c).focus({preventScroll:!0});return}if(v!==null){let y=m.pop();v=null,y!==void 0&&y.isConnected&&y.focus({preventScroll:!0});return}if(v=c,c===null)return;let A=document.activeElement;A!==null&&A!==document.body&&!c.contains(A)&&m.push(A),c.hasAttribute("tabindex")||c.setAttribute("tabindex","-1"),(w(c)[0]??c).focus({preventScroll:!0})},b=0,_=()=>{b===0&&(b=requestAnimationFrame(()=>{b=0,C()}))};C();let u=new MutationObserver(c=>{for(let A of c)if(A.type==="childList"){for(let f of A.addedNodes)if(f.nodeType===1){_();return}for(let f of A.removedNodes)if(f.nodeType===1){_();return}}});return u.observe(document.body,{childList:!0,subtree:!0}),()=>{document.removeEventListener("keydown",M,!0),u.disconnect(),b!==0&&cancelAnimationFrame(b),v?.removeAttribute("tabindex"),v=null,m.length=0}}),h("dsh-pocket: explorer availability (issue #48)",()=>{let s=()=>document.querySelector('[data-mobile-nav="frame"]'),l=0,m=()=>{l=0;let T=document.querySelector("[data-aionui-explorer-col]")!==null?"1":"0",v=s();v!==null&&v.getAttribute("data-mobile-nav-explorer")!==T&&v.setAttribute("data-mobile-nav-explorer",T)};m();let E=window.setTimeout(m,1500),w=()=>{l===0&&(l=requestAnimationFrame(m))},S=new MutationObserver(T=>{for(let v of T){for(let M of v.addedNodes)if(M.nodeType!==3){w();return}for(let M of v.removedNodes)if(M.nodeType!==3){w();return}}});return S.observe(document.body,{childList:!0,subtree:!0}),()=>{window.clearTimeout(E),l!==0&&cancelAnimationFrame(l),S.disconnect(),s()?.removeAttribute("data-mobile-nav-explorer")}}),e.effect(()=>{let s=document.createElement("style");return s.dataset.plugin="dsh-pocket",s.dataset.pluginCss="dsh-pocket/mobile-extras.css",s.textContent=Ld,document.head.appendChild(s),()=>{s.remove()}},"dsh-pocket: mobile extra styles (issue #17/#48)"),h("dsh-pocket: settling watchdog (host reconnect leaves composer hidden)",()=>{let s="data-dshp-settling-stale",l=gr(),m=wr(),E=new Map,w=0,S=0,T=!1,v=()=>performance.now(),M=()=>{let I=e.connection,F=typeof I?.generation?.getSnapshot=="function";return br({hasGeneration:F,generation:F?I.generation?.getSnapshot?.():void 0,state:F?void 0:I?.state?.getSnapshot?.()})},C=()=>{try{let I=e.sessions?.list?.getSnapshot?.();if(I===null||typeof I!="object")return;if(typeof I.current=="string")return I.current;for(let F in I.byId){let q=I.byId[F];if(q===void 0)continue;let X=q.retainedBy?.mainView;if(typeof X=="number"&&X>0&&typeof q.id=="string")return q.id}}catch{}},b=I=>{if(I===void 0)return{};try{let F=e.sessions?.manager?.get?.(I);if(F===void 0)return{};let q=F.getSnapshot?.()?.openState;if(typeof q!="string")return{};let X="openPromise"in F?F.openPromise===null||F.openPromise===void 0?"gone":"live":"unknown";return{openState:q,openPromise:X}}catch{return{}}},_=()=>{try{let I=e.connection;typeof I?.reconnect=="function"&&I.reconnect()}catch{}},u=I=>{let F=I.getAttribute("data-conversation-session");if(typeof F=="string"&&F!=="")return F;let X=I.querySelector("[data-conversation-session]")?.getAttribute("data-conversation-session");return typeof X=="string"&&X!==""?X:void 0},c=(I,F)=>{I&&_();try{let q=(F===void 0?void 0:u(F))??C();if(q===void 0)return;let X=e.sessions?.manager?.get?.(q);if(typeof X?.resync!="function")return;X.resync()}catch{}},A=I=>{let F=E.get(I);F!==void 0&&(window.clearTimeout(F),E.delete(I))},f=I=>I.getAttribute("data-phase")==="settling"?"data-phase":I.getAttribute("data-content-phase")==="settling"?"data-content-phase":null,y=I=>{if(T||!I.isConnected||f(I)===null)return;let F=u(I)??C(),q=l.decide(I,v(),b(F));if(q.repair&&c(q.reconnect,I),!q.stale){q.waiting&&k(I,q.remainingMs??2500);return}I.getAttribute(s)===null&&I.setAttribute(s,"")},k=(I,F=2500)=>{E.has(I)||E.set(I,window.setTimeout(()=>{E.delete(I),y(I)},Math.max(0,F)))},R='[data-phase="settling"],[data-content-phase="settling"]',P=()=>{if(w=0,T)return;let I=v(),F=document.querySelectorAll(R);for(let q of Array.from(document.querySelectorAll(`[${s}]`)))f(q)===null&&(q.removeAttribute(s),l.release(q));for(let q of Array.from(F))l.observe(q,I),k(q);for(let q of Array.from(E.keys()))(!q.isConnected||f(q)===null)&&(A(q),l.release(q))},O=()=>{w===0&&!T&&(w=requestAnimationFrame(P))},H=new MutationObserver(I=>{for(let F of I){if(F.type==="attributes"){O();return}for(let q of F.addedNodes)if(q.nodeType!==3){O();return}for(let q of F.removedNodes)if(q.nodeType!==3){O();return}}});H.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-phase","data-content-phase"]});let B=()=>{l.noteLink(M(),v());for(let I of Array.from(E.keys()))A(I);O()},U=[];for(let I of["generation","state"])try{let F=e.connection[I];typeof F?.subscribe=="function"&&U.push(F.subscribe(B))}catch{}let K=()=>{l.noteResume(v());for(let I of Array.from(E.keys()))A(I);O()},$=()=>{document.visibilityState==="visible"&&K()},te=I=>{I.persisted&&K()};return document.addEventListener("visibilitychange",$),window.addEventListener("pageshow",te),S=window.setInterval(()=>{m.tick(v())&&K()},m.intervalMs),P(),()=>{T=!0,H.disconnect();for(let I of U)I();document.removeEventListener("visibilitychange",$),window.removeEventListener("pageshow",te),S!==0&&window.clearInterval(S),m.reset(),w!==0&&cancelAnimationFrame(w);for(let I of E.values())window.clearTimeout(I);E.clear(),l.reset();for(let I of Array.from(document.querySelectorAll(`[${s}]`)))I.removeAttribute(s)}},"dsh-pocket: settling watchdog (host reconnect leaves composer hidden)"),h("dsh-pocket: keyboard height css var (--dshp-kb)",()=>{let s=window.visualViewport;if(s==null)return()=>{};let l=document.documentElement,m=0,E="",w=0,S=!1,T=null,v=()=>(T!==null&&T.isConnected&&T.matches("[data-composer-seat]")&&T.getClientRects().length>0||(T=Array.from(document.querySelectorAll("[data-composer-seat]")).find(b=>b.getClientRects().length>0)??null),T),M=()=>{m=0;let b=Math.max(0,window.innerHeight-s.height-s.offsetTop),_=0;if(Math.abs(s.scale-1)<.01){let A=v();if(A!==null){let f=A.getBoundingClientRect().bottom+(S?w:0);_=Math.max(0,f-s.height)}}let u=Math.min(Math.max(b,_),Math.round(window.innerHeight*.6));w=u,S=u>0;let c=`${Math.round(u)}px`;c!==E&&(E=c,l.style.setProperty("--dshp-kb",c),u>0?l.setAttribute("data-dshp-kb","open"):l.removeAttribute("data-dshp-kb"))},C=()=>{m===0&&(m=requestAnimationFrame(M))};return s.addEventListener("resize",C),s.addEventListener("scroll",C),M(),()=>{s.removeEventListener("resize",C),s.removeEventListener("scroll",C),m!==0&&cancelAnimationFrame(m),T=null,l.style.removeProperty("--dshp-kb"),l.removeAttribute("data-dshp-kb")}}),h("dsh-pocket: standalone viewport guard (scroll residue / short layout viewport)",()=>{let s=window.visualViewport;if(s==null)return()=>{};let l=document.documentElement,m=0,E=0,w=!1,S=null,T=0,v=new URLSearchParams(window.location.search).has("dshp-diag"),M=_=>{S===null&&(S=document.createElement("div"),S.dataset.dshPocketDiag="1",S.style.cssText="position:fixed;top:calc(env(safe-area-inset-top, 0px) + 2px);left:2px;z-index:2147483647;font:10px/1.4 ui-monospace,Menlo,Consolas,monospace;background:rgba(0,0,0,.65);color:#4ade80;padding:2px 6px;border-radius:4px;pointer-events:none;white-space:normal;width:calc(100vw - 8px);word-break:break-all",document.body.appendChild(S));let u=Array.from(document.querySelectorAll("[data-composer-seat]")).find(O=>O.getClientRects().length>0)??null,c=u?.closest("[data-conversation-scroll]")??null,A=c?.querySelector('[class*="_viewArea"]')??null,f=" va=-/col=-/nz=-";if(A!==null){f=` va=${Math.round(A.getBoundingClientRect().height)}/col=-/nz=-`;let O=A;for(let H=0;H<6&&O!==null;H+=1){if(O.children.length>10){let B=Array.from(O.children).filter(U=>U.offsetHeight>0).length;f=` va=${Math.round(A.getBoundingClientRect().height)} col=${Math.round(O.getBoundingClientRect().height)} nz=${B}/${O.children.length}`;break}O=O.firstElementChild}}let y=c===null?"":` sb=${c.clientHeight}/${c.scrollHeight}@${Math.round(c.scrollTop)}`,k=u===null?"":` seatB=${Math.round(u.getBoundingClientRect().bottom)}`,R=getComputedStyle(l).getPropertyValue("--dshp-kb").trim()||"0px",P=l.hasAttribute("data-dshp-kb")?1:0;S.textContent=`tag=1014.3 ih=${window.innerHeight} vv=${Math.round(s.height)} off=${Math.round(s.offsetTop)} sc=${s.scale.toFixed(2)} sy=${window.scrollY}${y}${k}${f} kbc=${R}/f=${P}`,_&&(window.clearTimeout(T),T=window.setTimeout(()=>{S?.remove(),S=null},8e3))},C=()=>{m=0;let _=s.height>=window.innerHeight-8;if(Math.abs(s.scale-1)<.01&&s.height-window.innerHeight>8){if(E===0&&(E=performance.now()),!w&&performance.now()-E>600){w=!0,l.style.setProperty("--dshp-frame-h",`${Math.round(s.height)}px`),l.style.setProperty("--dshp-vh-diff",`${Math.round(s.height-window.innerHeight)}px`),l.setAttribute("data-dsh-pocket-full-height","");let c=Array.from(document.querySelectorAll("[data-conversation-scroll]")).find(A=>A.getClientRects().length>0)??null;c!==null&&c.scrollHeight-c.scrollTop-c.clientHeight<=8&&requestAnimationFrame(()=>{w&&c.isConnected&&(c.scrollTop=c.scrollHeight)}),M(!0)}}else E=0,w&&(w=!1,l.style.removeProperty("--dshp-frame-h"),l.style.removeProperty("--dshp-vh-diff"),l.removeAttribute("data-dsh-pocket-full-height"));!w&&_&&(window.scrollY>1||s.offsetTop>1)&&window.scrollTo(0,0),v&&M(!1)},b=()=>{m===0&&(m=requestAnimationFrame(C))};return s.addEventListener("resize",b),s.addEventListener("scroll",b),window.addEventListener("focusout",b),window.addEventListener("pageshow",b),C(),()=>{s.removeEventListener("resize",b),s.removeEventListener("scroll",b),window.removeEventListener("focusout",b),window.removeEventListener("pageshow",b),m!==0&&cancelAnimationFrame(m),window.clearTimeout(T),S?.remove(),l.style.removeProperty("--dshp-frame-h"),l.style.removeProperty("--dshp-vh-diff"),l.removeAttribute("data-dsh-pocket-full-height")}}),h("dsh-pocket: file open guard + copy button + hide add-workspace (issue #17)",()=>{let s=()=>{try{let w=e.sessions?.list?.getSnapshot?.();if(w===null||typeof w!="object")return;if(typeof w.current=="string")return w.current;for(let S in w.byId){let T=w.byId[S];if(T===void 0)continue;let v=T.retainedBy?.mainView;if(typeof v=="number"&&v>0&&typeof T.id=="string")return T.id}}catch{}},l=()=>{try{let S=(e.get?.("workspaces")??e.workspaces)?.list,T=Array.isArray(S)?S:S&&typeof S=="object"&&"value"in S?S.value:null;if(Array.isArray(T))for(let v of T){let M=v?.cwd??v?.root;if(typeof M=="string"&&M)return M}}catch{}return""},m=w=>{let S=s();return e.connection.rpc.call(Se,G.fileRead,{path:w,cwd:l(),...S===void 0?{}:{sessionId:S}})},E=e.locale.bind(gt);return ur(m,E)})}var Rd="dsh-pocket",Od=["slots","connection","layout","locale","sessionLogDownload","sessions"];function ae(e,t,a){let n=e(t);if(a)for(let[o,i]of Object.entries(a))n=String(n).split(`{${o}}`).join(String(i));return n}async function Pd(e,t,a){if(typeof AbortSignal<"u"&&typeof AbortSignal.timeout=="function")return fetch(e,{...t,signal:AbortSignal.timeout(a)});let n=new AbortController,o=setTimeout(()=>n.abort(),a);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(o)}}function Nd(e,t){return new Promise(a=>{if(t?.aborted){a();return}let n=()=>{clearTimeout(o),t?.removeEventListener?.("abort",n),a()},o=setTimeout(n,e);t?.addEventListener?.("abort",n,{once:!0})})}function Ja(e){let t=e!==!1;document.body?.setAttribute(tt,t?"on":"off"),window.dispatchEvent(new CustomEvent(at,{detail:{enabled:t}}))}function en(e){let t=e===!0;document.body?.setAttribute(qe,t?"on":"off"),window.dispatchEvent(new CustomEvent(nt,{detail:{enabled:t}}))}var Id=[0,...Array.from({length:11},(e,t)=>12+t)];function tn(e){let t=Number(e),a=Number.isInteger(t)&&t>=12&&t<=22;a?(document.body?.style.setProperty(Ae,`${t}px`),document.body?.setAttribute(Ce,String(t))):(document.body?.style.removeProperty(Ae),document.body?.removeAttribute(Ce)),window.dispatchEvent(new CustomEvent(ot,{detail:{size:a?t:0}}))}async function Hd(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:0;left:0;opacity:0",document.body.appendChild(t),t.select();let a=document.execCommand("copy");return t.remove(),a===!0}catch{return!1}}var ne=e=>{let t=Md??{};for(let a of e)if(typeof t[a]=="function")return t[a];return()=>null},Z={settings:ne(["IconSettingsOutlineRegular","IconSettingsOutline16"]),lan:ne(["IconLinkOutlineRegular","IconLinkOutline16"]),wan:ne(["IconGlobeOutlineRegular","IconGlobeOutline16"]),pin:ne(["IconShieldOutlineRegular","IconShieldOutline16"]),sliders:ne(["IconSlidersTwoOutlineRegular","IconSlidersTwoOutline16"]),trash:ne(["IconTrashOutlineRegular","IconTrashOutline16"]),copy:ne(["IconCopyOutlineRegular","IconCopyOutline16"]),refresh:ne(["IconRefreshOutlineRegular","IconRefreshOutline16"]),download:ne(["IconDownloadOutlineRegular","IconDownloadOutline16"]),warn:ne(["IconWarningOutlineRegular","IconWarningOutline16"]),info:ne(["IconInfoOutlineRegular","IconInfoOutline16"]),check:ne(["IconCheckCircleOutlineRegular","IconCheckCircleOutline16"]),chevron:ne(["IconChevronDownOutlineRegular","IconChevronDownOutline16"])},kr=`
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
`;function Fd({rpcCall:e,t}){let[a,n]=(0,x.useState)(null),[o,i]=(0,x.useState)(null),[r,d]=(0,x.useState)(null),[p,h]=(0,x.useState)(!1),[s,l]=(0,x.useState)(null),[m,E]=(0,x.useState)(!1),[w,S]=(0,x.useState)(Date.now()),[T,v]=(0,x.useState)({}),[M,C]=(0,x.useState)(!1),[b,_]=(0,x.useState)({}),[u,c]=(0,x.useState)(!1),A=(0,x.useRef)(0),f=(0,x.useRef)(0),y=(0,x.useRef)(0),k=g=>n(L=>L&&{...L,...g}),R=(0,x.useRef)({}),P=async(g,L)=>{f.current=Date.now();let N=R.current;N[g]=(N[g]??0)+1,_(W=>W[g]===!0?W:{...W,[g]:!0});try{return await L()}finally{N[g]=Math.max(0,(N[g]??1)-1),N[g]===0&&(delete N[g],_(W=>{if(W[g]!==!0)return W;let j={...W};return delete j[g],j}))}};(0,x.useEffect)(()=>{let g="dshp-settings-css",L=document.getElementById(g);L&&L.tagName!=="STYLE"&&(L=null),L||(L=document.createElement("style"),L.id=g,document.head.appendChild(L)),L.textContent!==kr&&(L.textContent=kr)},[]),(0,x.useEffect)(()=>{if(!(!!((s?.updating||s?.restarting)&&s?.startedAt)||!!(r?.startedAt&&["downloading","starting","registering"].includes(r?.phase??""))))return;let L=setInterval(()=>S(Date.now()),1e3);return()=>clearInterval(L)},[s,r]);let O=g=>g?Math.max(0,Math.floor((w-g)/1e3)):0,H=async(g,L)=>{let N=await e(g,L,typeof AbortSignal<"u"&&typeof AbortSignal.timeout=="function"?AbortSignal.timeout(3e4):void 0);if(!N?.ok)throw new Error(N?.error?.message??"RPC failed");return N.value},B=(0,x.useRef)(null);(0,x.useEffect)(()=>()=>{B.current?.abort()},[]);let U=async()=>{B.current?.abort();let g=new AbortController;B.current=g;let L=Date.now()+3e4;for(;Date.now()<L&&!g.signal.aborted;){try{if((await Pd(location.href,{method:"GET",cache:"no-store"},3e3)).ok){g.signal.aborted||location.reload();return}}catch{}await Nd(1e3,g.signal)}g.signal.aborted||C(!0)},K=async()=>{let g=Date.now(),L=++y.current;try{let N=await H(G.status,{});if(L!==y.current)return;if(f.current>g){c(!1),A.current=0;return}A.current=0,c(!1),n(N),Ja(N.mobileRightbarEnabled),en(N.mobilePinchZoomEnabled),tn(N.mobileFontSize),d(N.tunnelState??null),N.desktop&&E(!0),N.restartNotice&&(h(!0),l(null),sessionStorage.getItem("dshp-auto-reloaded")||(sessionStorage.setItem("dshp-auto-reloaded","1"),U()))}catch{if(L!==y.current)return;A.current+=1,A.current>=2&&c(!0)}};(0,x.useEffect)(()=>{K();let g=()=>{document.hidden||K()};document.addEventListener("visibilitychange",g);let L=setInterval(()=>{document.hidden||K()},1e4);return()=>{clearInterval(L),document.removeEventListener("visibilitychange",g),y.current+=1}},[]),(0,x.useEffect)(()=>{try{sessionStorage.removeItem("dshp-auto-reloaded")}catch{}},[]),(0,x.useEffect)(()=>{if(m)return;let g=!0,L=async()=>{if(!document.hidden)try{let j=await H(G.version,{}),re=await(await fetch("https://registry.npmjs.org/dsh-pocket/latest",{cache:"no-store"})).json();if(!g)return;let _e=typeof re?.version=="string"?re.version:null,ca=typeof re?.repository=="string"?re.repository:re?.repository?.url??null;wn(j.repository??null,ca)&&_e&&j.current&&ha(_e,j.current)>0?l({current:j.current,latest:_e,updating:!1,result:null}):j.current&&j.loaded&&ha(j.current,j.loaded)>0&&l({current:j.current,latest:j.current,updating:!1,result:"ok",updated:!0})}catch{}},N=()=>{document.hidden||L()};document.addEventListener("visibilitychange",N),L();let W=setInterval(L,900*1e3);return()=>{g=!1,clearInterval(W),document.removeEventListener("visibilitychange",N)}},[m]);let $=async()=>{l(g=>({...g??{},restarting:!0,startedAt:Date.now()}));try{await Promise.race([H(G.restart,{}),new Promise((g,L)=>setTimeout(()=>L(new Error("restart requested (no reply within 3s)")),3e3))]),l(g=>({...g??{},restarting:!0,result:"ok"}))}catch(g){let L=String(g?.message??"");if(/connection|socket|fetch|network|abort|cancelled|ECONN|disconnect|closed|timeout/i.test(L)){l(N=>({...N??{},restarting:!0,result:"ok"}));return}l(N=>({...N??{},restarting:!1,result:"fail",output:g.message}))}},te=async()=>{l(g=>({...g??{},updating:!0,result:null,startedAt:Date.now()}));try{let g=await H(G.update,{});l(L=>({...L??{},updating:!1,result:g.ok?"ok":"fail",autoRestart:g.autoRestart===!0,output:g.output??g.error}))}catch(g){l(L=>({...L??{},updating:!1,result:"fail",output:g.message}))}},[I,F]=(0,x.useState)(!1),[q,X]=(0,x.useState)(!1),de=async()=>{let g=a?.tunnelConfig;if(!g?.hostname||!g?.tokenSet){oe({hostname:g?.hostname??"",token:"",err:t("namedNeedCfg")});return}i(null),d({phase:"starting",detail:"正在开启…",startedAt:Date.now()}),await P("wan",async()=>{try{let L=await H(G.tunnelStart,{disclaimer:!0});n(L),d(L.tunnelState??null)}catch(L){i(L.message),d(null)}})},le=()=>{let g=a?.tunnelConfig;if(!g?.hostname||!g?.tokenSet){oe({hostname:g?.hostname??"",token:"",err:null});return}X(!1),F(!0)},ta=()=>{q&&(F(!1),de())},aa=()=>P("wan",async()=>{try{let g=await H(G.tunnelStop,{});n(g),d(g.tunnelState??null)}catch(g){i(g.message)}}),[ce,oe]=(0,x.useState)(null),na=()=>P("saveNamed",async()=>{try{let g=await H(G.tunnelSetConfig,{mode:"named",hostname:ce?.hostname??"",token:ce?.token||void 0});n(g),oe(null)}catch(g){oe(L=>({...L??{},err:g.message}))}}),[vt,Ze]=(0,x.useState)(!1),Er=async()=>{Ze(!1),i(null),await P("reset",async()=>{try{let g=await H(G.pocketReset,{confirm:!0});n(g),Ja(g.mobileRightbarEnabled),en(g.mobilePinchZoomEnabled),tn(g.mobileFontSize),oe(null),ge(null),fn(!1),v({}),Array.isArray(g?.resetWarnings)&&g.resetWarnings.length>0?(i(g.resetWarnings.join("；")),Je(t("resetPartial"))):Je(t("resetDone"))}catch(g){i(g.message),Je(t("resetFailed"))}})},Tr=()=>P("refreshPin",async()=>{try{let g=await H(G.lanTokenRefresh,{});n(L=>L&&{...L,lanToken:g.lanToken}),v(L=>({...L,lan:!1}))}catch(g){i(g.message)}}),_r=g=>P("lanAuth",async()=>{try{let L=await H(G.lanAuthSetEnabled,{on:g});n(N=>N&&{...N,lanAuthEnabled:L.lanAuthEnabled})}catch(L){i(L.message)}}),Sr=g=>P("prefs",async()=>{try{let N=(await H(G.mobileRightbarSetEnabled,{on:g})).mobileRightbarEnabled===!0;k({mobileRightbarEnabled:N}),Ja(N)}catch(L){i(L.message)}}),Cr=g=>P("prefs",async()=>{try{let N=(await H(G.mobilePinchZoomSetEnabled,{on:g})).mobilePinchZoomEnabled===!0;k({mobilePinchZoomEnabled:N}),en(N)}catch(L){i(L.message)}}),Ar=g=>P("prefs",async()=>{try{let L=await H(G.mobileFontSetSize,{size:g}),N=Number(L.mobileFontSize)||0;k({mobileFontSize:N}),tn(N)}catch(L){i(L.message)}}),[be,Ye]=(0,x.useState)(null),an=g=>Ye(g),Lr=()=>{let g=be;if(Ye(null),g!==null)return P("lanToggle",async()=>{try{let L=await H(G.lanSetEnabled,{on:g});n(N=>N&&{...N,lanEnabled:L.lanEnabled})}catch(L){i(L.message)}})},Mr=g=>P("lanAddr",async()=>{try{n(await H(G.lanSetOverride,{ip:g}))}catch(L){i(L.message)}}),[ke,ge]=(0,x.useState)(null),nn=g=>P("savePin",async()=>{if(String(ke?.value??"").length<8){ge(L=>({...L??{},err:t("pinInvalid")}));return}try{let L=await H(G.pinSetCustom,{which:g,value:ke?.value??""});n(N=>N&&{...N,accessToken:g==="public"?L.pin:N.accessToken,lanToken:g==="lan"?L.pin:N.lanToken,publicPinCustom:g==="public"?!0:N.publicPinCustom,lanPinCustom:g==="lan"?!0:N.lanPinCustom}),ge(null),L&&L.persisted===!1&&Je(t("pinSaveMemoryOnly"))}catch(L){ge(N=>({...N??{},err:L.message}))}}),on=a?.lanUrl,ie=a?.tunnelUrl,Ee=a?.origin==="public",oa=r?.phase??"idle",rn=["downloading","starting","registering"].includes(oa),Rr=r?.detail??"",ia=r?.startedAt??null,pe=a?.tunnelConfig??{hostname:"",tokenSet:!1},xt=!!(pe.hostname&&pe.tokenSet),Or=()=>oe({hostname:pe.hostname??"",token:"",err:null}),Pr=!!(ie&&ie!==`https://${pe.hostname}`),Qe=g=>{let L=String(g??""),N=L.indexOf(" | ");return N<0?L:(t("ok")===Qa.ok?L.slice(0,N):L.slice(N+3)).trim()},[sn,ln]=(0,x.useState)(null),ra=(0,x.useRef)(null),Je=g=>{ln(g),clearTimeout(ra.current),ra.current=setTimeout(()=>ln(null),2600)};(0,x.useEffect)(()=>()=>clearTimeout(ra.current),[]);let sa=(0,x.useRef)(null),dn=I||be!==null||vt;(0,x.useEffect)(()=>{if(!dn)return;sa.current=document.activeElement;let g=L=>{if(L.key==="Escape"){if(L.preventDefault(),L.stopPropagation(),I){F(!1);return}if(be!==null){Ye(null);return}vt&&Ze(!1)}};return window.addEventListener("keydown",g),()=>{window.removeEventListener("keydown",g);let L=sa.current;sa.current=null,L&&typeof L.focus=="function"&&L.isConnected&&L.focus()}},[dn,I,be,vt]);let et=(g,L,N,W=null)=>(0,x.createElement)("button",{role:"switch",type:"button","aria-checked":!!g,disabled:N===!0,"aria-label":W??void 0,className:"dshp-switch",onClick:N===!0?void 0:L},(0,x.createElement)("span",{className:"dshp-switch-thumb"})),V=(g,...L)=>{let{variant:N="ghost",mini:W=!1,icon:j=null,children:re,..._e}=g??{},ca=L.length>0?L:re;return(0,x.createElement)("button",{type:"button",..._e,className:`dshp-btn is-${N}${W?" is-mini":""}`},j?(0,x.createElement)(j,{size:W?12:14}):null,ca)},cn=({on:g,children:L})=>(0,x.createElement)("span",{className:`dshp-chip${g?" is-on":""}`},(0,x.createElement)("span",{className:"dshp-chip-dot"}),L),yt=({icon:g,title:L,sub:N,right:W,children:j,danger:re=!1,key:_e})=>(0,x.createElement)("section",{className:`dshp-card${re?" is-danger":""}`,"data-dshp-section":_e??""},(0,x.createElement)("div",{className:"dshp-card-head"},g?(0,x.createElement)("span",{className:"dshp-card-icon"},(0,x.createElement)(g,{size:16})):null,(0,x.createElement)("div",{className:"dshp-card-text"},(0,x.createElement)("div",{className:"dshp-card-title"},L),N?(0,x.createElement)("div",{className:"dshp-card-sub"},N):null),W??null),j?(0,x.createElement)("div",{className:"dshp-card-body"},j):null),Te=({label:g,desc:L,control:N,extra:W,stack:j=!1})=>(0,x.createElement)("div",{className:`dshp-row${j?" is-stack":""}`},(0,x.createElement)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,rowGap:8,flexWrap:"wrap",minWidth:0,width:"100%"}},(0,x.createElement)("div",{style:{minWidth:0}},(0,x.createElement)("div",{className:"dshp-row-label"},g),L?(0,x.createElement)("div",{className:"dshp-row-desc"},L):null),N??null),W??null),he=({kind:g="info",icon:L=null,children:N,title:W=null,extra:j=null})=>(0,x.createElement)("div",{className:`dshp-alert is-${g}`},L?(0,x.createElement)("span",{className:"dshp-alert-icon"},(0,x.createElement)(L,{size:14})):null,(0,x.createElement)("div",{className:"dshp-alert-body"},W?(0,x.createElement)("div",{className:"dshp-alert-title"},W):null,N,j??null)),la=({src:g,url:L,hint:N})=>(0,x.createElement)("div",{className:"dshp-qr"},(0,x.createElement)("div",{className:"dshp-qr-frame"},g?(0,x.createElement)("img",{src:g,alt:"QR"}):null),(0,x.createElement)("div",{className:"dshp-qr-main"},(0,x.createElement)("div",{className:"dshp-url"},L),N?(0,x.createElement)("div",{className:"dshp-qr-hint"},N):null,(0,x.createElement)("div",{className:"dshp-qr-actions"},V({variant:"ghost",mini:!0,icon:Z.copy,onClick:async()=>Je(await Hd(L)?t("copied"):t("copyFailed"))},t("copyLink"))))),pn=(g,L,N)=>(0,x.createElement)("div",{className:"dshp-pinbox"},(0,x.createElement)("span",{className:"dshp-pin-value","data-dshp-pin":g},T[g]?L:"••••••••"),V({variant:"ghost",mini:!0,onClick:()=>v(W=>({...W,[g]:!W[g]}))},T[g]?t("pinHide"):t("pinShow")),...N??[]),hn=g=>(0,x.createElement)("div",{className:"dshp-adv"},(0,x.createElement)("div",{className:"dshp-custom"},(0,x.createElement)("span",null,t("customizing")),(0,x.createElement)("input",{className:"dshp-input is-mono",style:{width:150,textAlign:"center"},type:"password",minLength:8,maxLength:64,name:"dsh-pocket-pin",autoComplete:"new-password",spellCheck:!1,value:ke?.value??"",autoFocus:!0,onChange:L=>{let N=L.target.value,W=N.replace(/[^a-zA-Z0-9]/g,"");ge(j=>({...j,value:W,err:W.length===N.length?null:t("pinCharsFiltered")}))},onKeyDown:L=>{L.key==="Enter"&&nn(g),L.key==="Escape"&&ge(null)}}),V({variant:"primary",mini:!0,onClick:()=>nn(g),disabled:b.savePin===!0},t("save")),V({variant:"ghost",mini:!0,onClick:()=>ge(null),disabled:b.savePin===!0},t("cancel"))),ke?.err?(0,x.createElement)("div",{className:"dshp-err-text"},Qe(ke.err)):null),un=g=>V({variant:"ghost",mini:!0,onClick:()=>ge({which:g,value:"",err:null})},t("customize")),da=({title:g,tone:L="warn",children:N,actions:W,onClose:j})=>(0,x.createElement)("div",{className:"dshp-modal-backdrop",onClick:re=>{re.target===re.currentTarget&&j?.()}},(0,x.createElement)("div",{className:"dshp-modal",role:"dialog","aria-modal":"true","aria-label":g},(0,x.createElement)("div",{className:`dshp-modal-title is-${L}`},g),N,(0,x.createElement)("div",{className:"dshp-modal-actions"},W))),[mn,fn]=(0,x.useState)(!1),Nr=rn?he({kind:"info",icon:Z.info,children:oa==="downloading"?ae(t,"downloading",{s:O(ia)}):ae(t,"connecting",{s:O(ia),suffix:O(ia)>30?t("slowHint"):""})}):oa==="error"?he({kind:"error",icon:Z.warn,children:ae(t,"error",{detail:Qe(Rr)||t("unknownError")})}):!ie&&xt?he({kind:"info",icon:Z.info,children:t("wanOffHint"),extra:(0,x.createElement)("div",{style:{marginTop:8}},V({variant:"primary",onClick:le,disabled:b.wan===!0||b.saveNamed===!0},t("enable")))}):null,Ir=xt&&!ce?(0,x.createElement)("div",{className:"dshp-panel"},(0,x.createElement)("div",{style:{display:"flex",alignItems:"flex-start",gap:10}},(0,x.createElement)("div",{style:{flex:1,minWidth:0}},(0,x.createElement)("div",{className:"dshp-panel-title"},pe.hostname||"—"),(0,x.createElement)("div",{className:"dshp-hint",style:{marginTop:2}},pe.tokenSet?t("namedTokenSet"):t("namedTokenMissing"))),V({variant:"ghost",mini:!0,onClick:()=>oe({hostname:pe.hostname??"",token:"",err:null})},t("namedEdit"))),(0,x.createElement)("div",{className:"dshp-hint",style:{marginTop:8,lineHeight:1.65}},t("namedHow")),!pe.tokenSet||!pe.hostname?(0,x.createElement)("div",{className:"dshp-err-text"},t("namedNeedCfg")):null):null,Hr=ce?(0,x.createElement)("div",{className:"dshp-form"},(0,x.createElement)("label",{className:"dshp-field"},t("namedHostnameLabel"),(0,x.createElement)("input",{className:"dshp-input",placeholder:"pocket.example.com",value:ce.hostname??"",autoFocus:!0,onChange:g=>oe(L=>({...L,hostname:g.target.value.trim(),err:null})),onKeyDown:g=>{g.key==="Enter"&&na(),g.key==="Escape"&&oe(null)}})),(0,x.createElement)("label",{className:"dshp-field"},t("namedTokenLabel"),(0,x.createElement)("input",{className:"dshp-input is-mono",type:"password",name:"dsh-pocket-tunnel-token",autoComplete:"off",spellCheck:!1,value:ce.token??"",onChange:g=>oe(L=>({...L,token:g.target.value.trim(),err:null})),onKeyDown:g=>{g.key==="Enter"&&na(),g.key==="Escape"&&oe(null)}})),(0,x.createElement)("div",{className:"dshp-inline"},V({variant:"primary",mini:!0,onClick:na,disabled:b.saveNamed===!0},t("save")),V({variant:"ghost",mini:!0,onClick:()=>oe(null),disabled:b.saveNamed===!0},t("cancel"))),(0,x.createElement)("div",{className:"dshp-hint"},t("namedHow")),(0,x.createElement)("div",{className:"dshp-warn-text"},t("namedSecurity")),ce.err?(0,x.createElement)("div",{className:"dshp-err-text"},Qe(ce.err)):null):null,Fr=(0,x.createElement)("div",{className:"dshp-adv"},Pr?(0,x.createElement)("div",{className:"dshp-warn-text"},t("namedTakeEffect")):null,!xt&&!ce?he({kind:"info",icon:Z.info,children:t("publicSetupHint"),extra:(0,x.createElement)("div",{style:{marginTop:8}},V({variant:"primary",onClick:Or},t("publicConfigure")))}):null,Ir,Hr),zr=a?.accessToken?Te({label:t("pinLabel"),stack:!0,extra:ke?.which==="public"?hn("public"):(0,x.createElement)("div",null,pn("public",a.accessToken,[un("public")]),(0,x.createElement)("div",{className:"dshp-warn-text"},t("namedSecurity")))}):null,Dr=(0,x.createElement)("div",null,ie?la({src:a.tunnelQr,url:ie,hint:t("namedRunningHint")}):null,Te({label:t("publicConfig"),stack:!0,extra:Fr}),xt||ie?zr:null);return(0,x.createElement)("div",{className:"dshp-page","data-dshp-ui":"v3"},(0,x.createElement)("header",{className:"dshp-head"},(0,x.createElement)("span",{className:"dshp-badge"},(0,x.createElement)(Z.settings,{size:19})),(0,x.createElement)("div",{className:"dshp-head-main"},(0,x.createElement)("div",{className:"dshp-title"},t("section")),(0,x.createElement)("div",{className:"dshp-sub"},t("subtitle")))),(0,x.createElement)("div",{className:"dshp-chips"},a?[cn({on:a.lanEnabled!==!1,children:`${t("lanAccess")} · ${a.lanEnabled!==!1?t("statusOn"):t("statusOff")}`}),cn({on:!!ie,children:`${t("wanAccess")} · ${t(ie?"statusConnected":"statusOff")}`})]:(0,x.createElement)("span",{className:"dshp-hint",style:{marginTop:0}},t("loadingStatus"))),o?he({kind:"error",icon:Z.warn,children:Qe(o),extra:(0,x.createElement)("div",{className:"dshp-inline",style:{marginTop:8}},V({variant:"ghost",mini:!0,onClick:()=>i(null)},t("ok")))}):null,u?he({kind:"warn",icon:Z.warn,children:t("offlineHint")}):null,!m&&p?he({kind:"info",icon:Z.refresh,title:t("restarted"),children:(0,x.createElement)("div",{className:"dshp-hint",style:{wordBreak:"break-all",marginTop:2}},ae(t,"bgHint",{cmd:a?.killHint??`lsof -ti :${a?.dshPort??3080} | xargs kill -9`})),extra:(0,x.createElement)("div",{className:"dshp-inline",style:{marginTop:8}},M?V({variant:"ghost",mini:!0,icon:Z.refresh,onClick:()=>{C(!1),U()}},t("reloadNow")):null,M?(0,x.createElement)("span",{className:"dshp-hint",style:{marginTop:0}},t("reloadFailed")):null,V({variant:"quiet",mini:!0,onClick:()=>h(!1)},t("ok")))}):null,!m&&!Ee&&s?he({kind:"warn",icon:Z.download,title:s.updated?ae(t,"updatedRestart",{ver:s.current}):s.result==="ok"?s.autoRestart?ae(t,"updateAutoRestarting",{ver:s.latest}):ae(t,"updatedOk",{ver:s.latest}):s.result==="fail"?t("updateFailedTitle"):ae(t,"updateAvailable",{ver:s.latest}),children:(0,x.createElement)("div",{className:"dshp-hint",style:{marginTop:2}},s.updating?ae(t,"updatingDetail",{s:O(s.startedAt)}):s.restarting?ae(t,"restartingDetail",{s:O(s.startedAt)}):s.result==="ok"?s.autoRestart?t("updatedAutoDetail"):t("updatedRestartDetail"):s.result==="fail"?ae(t,"updateFailed",{err:Qe(s.output)||t("unknownError")}):ae(t,"versionRange",{cur:s.current,latest:s.latest})),extra:(0,x.createElement)("div",{className:"dshp-inline",style:{marginTop:8}},s.result!=="ok"?V({variant:"primary",mini:!0,icon:Z.download,onClick:te,disabled:s.updating},s.updating?t("updating"):ae(t,"updateTo",{ver:s.latest})):s.autoRestart?V({variant:"ghost",mini:!0,disabled:!0},t("restartingNow")):V({variant:"primary",mini:!0,icon:Z.refresh,onClick:$,disabled:s.restarting},s.restarting?t("restarting"):t("restartNow")),!s.updating&&!s.restarting?V({variant:"ghost",mini:!0,onClick:()=>l(null)},t("later")):null)}):null,yt({key:"lan",icon:Z.lan,title:t("lanAccess"),sub:t("lanHint"),right:et(a?.lanEnabled!==!1,()=>an(a?.lanEnabled===!1),!a||b.lanToggle===!0||Ee,t("lanAccess")),children:Ee?(0,x.createElement)("div",{className:"dshp-hint"},t("lanLocalOnly")):a?a.lanEnabled===!1?he({kind:"info",icon:Z.info,children:t("lanDisabledHint"),extra:(0,x.createElement)("div",{style:{marginTop:8}},V({variant:"primary",onClick:()=>an(!0),disabled:b.lanToggle===!0},t("lanToggleTitleOn")))}):on?(0,x.createElement)("div",null,la({src:a.lanQr,url:on,hint:null}),Te({label:t("lanPin"),desc:a?.lanAuthEnabled===!1?t("lanPinOff"):null,control:et(a?.lanAuthEnabled!==!1,()=>_r(a?.lanAuthEnabled===!1),b.lanAuth===!0,t("lanPin"))}),a?.lanAuthEnabled===!1?null:ke?.which==="lan"?hn("lan"):a.lanToken?(0,x.createElement)("div",null,pn("lan",a.lanToken,[V({variant:"ghost",mini:!0,icon:Z.refresh,onClick:Tr,disabled:b.refreshPin===!0},t("refresh")),un("lan")]),a.lanPinCustom?(0,x.createElement)("div",{className:"dshp-warn-text"},t("pinCustomHint")):null):(0,x.createElement)("div",{className:"dshp-hint"},t(Ee?"lanPinRemoteHint":"lanPinUnavailable")),Te({label:t("advAddress"),control:V({variant:"ghost",mini:!0,onClick:()=>fn(g=>!g)},(a.lanIpOverride||t("lanAddressAuto"))+(mn?" ‹":" ›")),extra:mn?(0,x.createElement)("div",{className:"dshp-adv"},(0,x.createElement)("label",{className:"dshp-field"},t("lanAddress"),(0,x.createElement)("select",{className:"dshp-select",value:a.lanIpOverride||"",disabled:b.lanAddr===!0,onChange:g=>Mr(g.target.value)},(0,x.createElement)("option",{value:""},t("lanAddressAuto")),(a.lanCandidates||[]).map(g=>(0,x.createElement)("option",{key:g,value:g},g))))):null})):(0,x.createElement)("div",{className:"dshp-hint"},t("lanStarting")):(0,x.createElement)("div",{className:"dshp-loading"},t("loadingStatus"))}),yt({key:"wan",icon:Z.wan,title:t("wanAccess"),sub:t("namedWanHint"),right:et(!!ie,()=>ie?aa():le(),rn||b.wan===!0||b.saveNamed===!0||!a||Ee,t("wanAccess")),children:Ee?(0,x.createElement)("div",null,ie?la({src:a?.tunnelQr,url:ie,hint:t("namedRunningHint")}):null,(0,x.createElement)("div",{className:"dshp-hint"},t("wanLocalOnly"))):a?(0,x.createElement)("div",null,Nr,Dr):(0,x.createElement)("div",{className:"dshp-loading"},t("loadingStatus"))}),yt({key:"prefs",icon:Z.sliders,title:t("prefsTitle"),sub:t("prefsHint"),children:a?(0,x.createElement)("div",null,Te({label:t("mobileRightbar"),desc:t("mobileRightbarHint"),control:et(a.mobileRightbarEnabled!==!1,()=>Sr(a.mobileRightbarEnabled===!1),b.prefs===!0,t("mobileRightbar"))}),Te({label:t("mobilePinchZoom"),desc:t("mobilePinchZoomHint"),control:et(a.mobilePinchZoomEnabled===!0,()=>Cr(a.mobilePinchZoomEnabled!==!0),b.prefs===!0,t("mobilePinchZoom"))}),Te({label:t("mobileFontSize"),desc:t("mobileFontSizeHint"),control:(0,x.createElement)("select",{className:"dshp-select",value:String(Number(a.mobileFontSize)||0),disabled:b.prefs===!0,onChange:g=>Ar(Number(g.target.value))},Id.map(g=>(0,x.createElement)("option",{key:g,value:String(g)},g===0?t("mobileFontFollow"):`${g} px`)))})):(0,x.createElement)("div",{className:"dshp-loading"},t("loadingStatus"))}),yt({key:"reset",icon:Z.trash,title:t("resetFactory"),sub:t("resetIntro"),danger:!0,right:Ee?(0,x.createElement)("div",{className:"dshp-hint"},t("resetLocalOnly")):V({variant:"danger",mini:!0,onClick:()=>Ze(!0),disabled:b.reset===!0},t("resetGo"))}),(0,x.createElement)("footer",{className:"dshp-footer"},(0,x.createElement)("span",null,t("developer")),(0,x.createElement)("span",null,"·"),(0,x.createElement)("a",{href:"https://github.com/daha1216/dsh-pocket",target:"_blank",rel:"noreferrer",title:t("starAsk")},t("starCta")),(0,x.createElement)("span",null,"·"),(0,x.createElement)("a",{href:"https://github.com/daha1216/dsh-pocket/issues",target:"_blank",rel:"noreferrer"},t("feedback"))),vt?da({title:t("resetTitle"),tone:"danger",onClose:()=>Ze(!1),children:(0,x.createElement)("div",{className:"dshp-modal-body"},t("resetBody")),actions:(0,x.createElement)("div",{className:"dshp-inline"},V({variant:"ghost",mini:!0,autoFocus:!0,onClick:()=>Ze(!1)},t("cancel")),V({variant:"danger",mini:!0,onClick:Er,disabled:b.reset===!0},t("resetConfirm")))}):null,be!==null?da({title:t(be?"lanToggleTitleOn":"lanToggleTitleOff"),tone:be?"brand":"warn",onClose:()=>Ye(null),children:(0,x.createElement)("div",{className:"dshp-modal-body"},t(be?"lanToggleBodyOn":"lanToggleBodyOff")),actions:(0,x.createElement)("div",{className:"dshp-inline"},V({variant:"ghost",mini:!0,autoFocus:!0,onClick:()=>Ye(null)},t("cancel")),V({variant:"primary",mini:!0,onClick:Lr},t("confirm")))}):null,I?da({title:t("disclaimerTitle"),tone:"warn",onClose:()=>F(!1),children:(0,x.createElement)("div",null,(0,x.createElement)("div",{className:"dshp-modal-body"},t("disclaimerBody")),(0,x.createElement)("label",{className:"dshp-check"},(0,x.createElement)("input",{type:"checkbox",checked:q,onChange:g=>X(g.target.checked)}),t("disclaimerAgree")),q?null:(0,x.createElement)("div",{className:"dshp-err-text",style:{marginTop:8}},t("disclaimerHint"))),actions:(0,x.createElement)("div",{className:"dshp-inline"},V({variant:"ghost",mini:!0,autoFocus:!0,onClick:()=>F(!1)},t("cancel")),V({variant:"primary",mini:!0,disabled:!q,onClick:ta},t("disclaimerAgree")))}):null,sn?(0,x.createElement)("div",{className:"dshp-toast",role:"status","aria-live":"polite"},sn):null)}function zd(e){if(e?.connection)try{Object.defineProperty(e.connection,"isLoopback",{value:!0,writable:!0,configurable:!0})}catch{try{e.connection.isLoopback=!0}catch{}}let t=e.locale.bind(gt);e.effect(()=>e.locale.register(gt,{zh:Qa,en:vr}),"dsh-pocket: pocket locale dictionaries"),yr(e);let a=(n,o,i)=>e.connection.rpc.call(Se,n,o,i);e.slots.inject("settings.section",()=>e.slots.register({name:"settings.section",id:"pocket",order:1,label:()=>t("section"),inject:()=>({rpcCall:a,t})},Fd))}

    return module.exports;
  }
});
