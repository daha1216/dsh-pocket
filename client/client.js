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
var Ts=Object.create;var Ht=Object.defineProperty;var Ss=Object.getOwnPropertyDescriptor;var Cs=Object.getOwnPropertyNames;var As=Object.getPrototypeOf,Ls=Object.prototype.hasOwnProperty;var Ms=(e,t)=>{for(var a in t)Ht(e,a,{get:t[a],enumerable:!0})},En=(e,t,a,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Cs(t))!Ls.call(e,o)&&o!==a&&Ht(e,o,{get:()=>t[o],enumerable:!(n=Ss(t,o))||n.enumerable});return e};var Ca=(e,t,a)=>(a=e!=null?Ts(As(e)):{},En(t||!e||!e.__esModule?Ht(a,"default",{value:e,enumerable:!0}):a,e)),Rs=e=>En(Ht({},"__esModule",{value:!0}),e);var Ac={};Ms(Ac,{apply:()=>Cc,inject:()=>Tc,name:()=>Ec,redactStatus:()=>Sn});module.exports=Rs(Ac);var le=require("react");var ye="/dsh-pocket",ut="data-dsh-pocket-mobile-rightbar",mt="dsh-pocket:mobile-rightbar",Je="data-dsh-pocket-pinch-zoom",ft="dsh-pocket:mobile-pinch-zoom",Ne="data-dsh-pocket-mobile-font",bt="dsh-pocket:mobile-font-size",He="--dsh-pocket-mobile-font-size";var $=Object.freeze({status:"pocket.status",tunnelStart:"tunnel.start",tunnelStop:"tunnel.stop",tunnelSetConfig:"tunnel.setConfig",version:"pocket.version",restart:"pocket.restart",lanTokenRefresh:"token.lanRefresh",lanAuthSetEnabled:"lanAuth.setEnabled",lanSetOverride:"lan.setOverride",lanSetEnabled:"lan.setEnabled",mobileRightbarSetEnabled:"mobile.rightbar.setEnabled",mobilePinchZoomSetEnabled:"mobile.pinchZoom.setEnabled",mobileFontSetSize:"mobile.font.setSize",pinSetCustom:"pin.setCustom",pocketReset:"pocket.reset",fileRead:"pocket.fileRead",cacheStats:"pocket.cache.stats",cacheClear:"pocket.cache.clear",probeReport:"pocket.probe.report",probeStats:"pocket.probe.stats",probeClear:"pocket.probe.clear",probeSetEnabled:"pocket.probe.setEnabled"});function Tn(e,t){let a=String(e).replace(/^[vV]/,"").split("."),n=String(t).replace(/^[vV]/,"").split(".");for(let g=0;g<3;g++){let l=parseInt(a[g],10)||0,s=parseInt(n[g],10)||0;if(l!==s)return l-s}let o=String(e).replace(/^[vV]/,"").match(/-.*$/)?.[0]??"",r=String(t).replace(/^[vV]/,"").match(/-.*$/)?.[0]??"";if(!o&&!r)return 0;if(!o)return 1;if(!r)return-1;let i=o.slice(1).split("."),d=r.slice(1).split("."),f=Math.max(i.length,d.length);for(let g=0;g<f;g++){let l=i[g]??"",s=d[g]??"";if(l===s)continue;let m=/^\d+$/.test(l),x=/^\d+$/.test(s);return m&&x?Number(l)-Number(s):m?-1:x?1:l<s?-1:1}return 0}function Sn(e){return{proxyRunning:e?.proxyRunning===!0,proxyPort:e?.proxyPort??null,lanUrl:e?.lanUrl??null,lanQr:e?.lanQr??null,lanCandidates:Array.isArray(e?.lanCandidates)?e.lanCandidates:[],lanIpOverride:e?.lanIpOverride??"",tunnelRunning:e?.tunnelRunning===!0,tunnelUrl:e?.tunnelUrl??null,tunnelQr:e?.tunnelQr??null,tunnelState:e?.tunnelState??{phase:"idle"},tunnelConfig:e?.tunnelConfig??{mode:"named",hostname:"",tokenSet:!1},dshPort:e?.dshPort??null}}var Bt=require("react");var Ps=Ca(require("@deepseek-ai/dsh-client-ui-primitives"),1),Os=()=>null,Aa=e=>{let t=Ps;for(let a of e){let n=t[a];if(n!==void 0)return n}return Os},Cn=Aa(["IconPaperclipOutlineRegular","IconPaperclipOutline16"]),An=Aa(["IconPanelLeftOutlineRegular","IconPanelLeftOutline16"]),Ln=Aa(["IconFolderOpenOutlineRegular","IconFolderOpenOutline16"]);function La(){return document.querySelector("[data-shell-overlay]")?.parentElement??null}var Mn=null;function U(){let e=Mn;if(e!==null&&e.isConnected&&e.getAttribute("data-mobile-nav")==="frame")return e;let a=document.querySelector('[data-mobile-nav="frame"]')??La();return Mn=a,a}var Is="[data-sidebar-right-expand]",Ns="[data-sidebar-right-toggle]";function Ft(e=document){let t=e.querySelector(Ns),a=e.querySelector(Is),n=typeof a?.click=="function"?a:t;return typeof n?.click!="function"?!1:(n.click(),!0)}function Rn({toggleSidebar:e,t}){let a=()=>{Ft()},[n,o]=(0,Bt.useState)(!1);return(0,Bt.useEffect)(()=>{let r=()=>{let g=U();return g!==null&&!g.hasAttribute("data-sidebar-collapsed")};o(r());let i=0,d=()=>{i===0&&(i=requestAnimationFrame(()=>{i=0,o(r())}))},f=new MutationObserver(g=>{for(let l of g){if(l.type==="attributes"){if(l.attributeName==="data-sidebar-collapsed"){d();return}continue}let s=[...l.addedNodes,...l.removedNodes];if(s.length===0||!s.every(m=>m.nodeType===Node.TEXT_NODE)){d();return}}});return f.observe(document.documentElement,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["data-sidebar-collapsed"]}),()=>{i!==0&&cancelAnimationFrame(i),f.disconnect()}},[]),React.createElement(React.Fragment,null,React.createElement("button",{type:"button","data-mobile-nav":"toggle","aria-label":t(n?"close":"open"),"aria-expanded":n,title:t(n?"close":"open"),onClick:()=>e()},React.createElement(An,{size:16})),React.createElement("button",{type:"button","data-mobile-nav":"files","aria-label":t("files"),title:t("files"),onClick:a},React.createElement(Ln,{size:16})))}function Pn({useInput:e,useSession:t,t:a}){let n=e(i=>i.phase!=="plain"),o=t(i=>i.subagent!==null),r=n||o;return React.createElement("button",{type:"button","data-mobile-nav":"file-upload","aria-label":a("fileUpload"),title:a("fileUpload"),disabled:r},React.createElement(Cn,{size:16}))}var On=`
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
`;var In=`
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
  [data-mobile-nav="frame"] [data-phase] header [class*="_titleCluster"] {
    -webkit-mask-image: none !important;
    mask-image: none !important;
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
`;var Nn=`@media (max-width: 1023px) and (pointer: coarse) {
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
`;var Hn=`@media (max-width: 1023px) and (pointer: coarse) {
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
`;var Fn=[On,In,Nn,Hn].join(`
`);var Fe="(max-width: 1023px) and (pointer: coarse)",Bn="(min-width: 1024px)",zt="(pointer: coarse)",zn="(min-width: 1024px) and (pointer: coarse)";function D(e,t,a,n=Fe){e.effect(()=>{let o=window.matchMedia(n),r,i=()=>{r?.(),r=o.matches?a(o):void 0};return i(),o.addEventListener("change",i),()=>{o.removeEventListener("change",i),r?.()}},t)}function Dt(e,t){if(t!==null)try{if(t("(font: -apple-system-body) and (-webkit-touch-callout: none)"))return!0}catch{}let a=e.userAgent;return/iP(hone|ad|od)/.test(a)?!0:/Macintosh/.test(a)&&e.maxTouchPoints>1}var Ma="--mobile-nav-header-h",Hs='[data-mobile-nav="frame"] [data-phase] header',gt=null,et=null;function qn(e){if(typeof document>"u")return;let t=document.documentElement;t.style.getPropertyValue(Ma)!==e&&t.style.setProperty(Ma,e)}function Vn(){let e=U(),t=gt;return t===null||e===null||!(t instanceof HTMLElement)?"0px":`${Math.round(Math.max(0,t.getBoundingClientRect().bottom-e.getBoundingClientRect().top))}px`}function Dn(){qn(Vn())}function Fs(){let e=gt;qn(e instanceof HTMLElement&&e.offsetHeight===0?"0px":Vn())}function Bs(){if(typeof document>"u")return;let e=document.querySelector(Hs);if(e===gt){e!==null&&typeof ResizeObserver>"u"&&Dn();return}et?.disconnect(),gt=e,e!==null&&typeof ResizeObserver<"u"&&(et=et??new ResizeObserver(()=>{Dn()}),et.observe(e)),Fs()}function Wn(){return{name:"header-metrics",scopes:["*"],ensure:()=>{Bs()},dispose:()=>{et?.disconnect(),et=null,gt=null,typeof document<"u"&&document.documentElement.style.removeProperty(Ma)}}}var Ra="characterData";function Un(e){return e.type==="attributes"?e.attributeName===null?"*":e.attributeName:e.type==="characterData"?Ra:"*"}function Gn(e){let t=e.onError??((w,E,y)=>{console.error(`[dsh-web-mobile] reconciler task ${w}${y==="dispose"?" dispose":""} failed`,E)}),a=new Set,n=null,o=new Set,r=!1,i=null,d=w=>{try{w.ensure()}catch(E){t(w.name,E,"ensure")}},f=w=>{try{w.dispose()}catch(E){t(w.name,E,"dispose")}},g=()=>{if(i!==null&&(i(),i=null),n===null){o.clear(),r=!1;return}let w=o,E=r;if(o=new Set,r=!1,E)for(let y of n)d(y);else if(w.size>0)for(let y of n){let v=y.scopes;(v===void 0||v.some(S=>w.has(S)))&&d(y)}},l=()=>{i===null&&(i=e.requestFrame(()=>{i=null,g()}))};return{get size(){return a.size},register:w=>(a.add(w),n!==null&&(n.add(w),d(w)),()=>{a.delete(w),n!==null&&n.delete(w)&&f(w)}),activate:()=>{n===null&&(n=new Set(a),r=!0,g())},deactivate:()=>{if(i!==null&&(i(),i=null),o.clear(),r=!1,n!==null){let w=n;n=null;for(let E of w)f(E)}},note:w=>{for(let E of w)o.add(E);l()},flush:g}}var ie="pocketMobileNav",jn={open:"打开目录",close:"收起目录",backdrop:"点击关闭目录",back:"返回",backToConversation:"返回会话",sessionLog:"导出会话日志",downloadMenu:"下载",downloads:"下载记录",quickSettings:"设置",files:"文件浏览",fileUpload:"添加文件",fileUploadImage:"上传图片",fileUploadAttachment:"上传附件",questionExpand:"展开回答",questionCollapse:"收起回答",deleteSession:"删除会话",deleteConfirmTitle:"删除会话？",deleteConfirmDesc:"将删除「{title}」的完整会话记录，此操作不可恢复。",deleteConfirmYes:"删除",deleteConfirmNo:"取消",deletePending:"正在删除…",deleteErrorBusy:"该会话正在运行且无法停止，请稍后重试。",deleteErrorNotFound:"会话不存在或已被删除。",deleteErrorResolve:"无法确定要删除的会话，请重试。",deleteErrorGeneric:"删除失败：{message}"},Kn={open:"Open directory",close:"Close directory",backdrop:"Click to close directory",back:"Back",backToConversation:"Back to conversation",sessionLog:"Session log",downloadMenu:"Downloads",downloads:"Downloads history",quickSettings:"Settings",files:"Files",fileUpload:"Add files",fileUploadImage:"Upload image",fileUploadAttachment:"Upload attachment",questionExpand:"Expand answer",questionCollapse:"Collapse answer",deleteSession:"Delete session",deleteConfirmTitle:"Delete session?",deleteConfirmDesc:"The complete log of “{title}” will be permanently removed. This cannot be undone.",deleteConfirmYes:"Delete",deleteConfirmNo:"Cancel",deletePending:"Deleting…",deleteErrorBusy:"This session is running and could not be stopped. Try again later.",deleteErrorNotFound:"The session does not exist or was already deleted.",deleteErrorResolve:"Could not identify the session to delete. Please try again.",deleteErrorGeneric:"Delete failed: {message}"};var Xn="[data-composer-card], [data-composer-input], [contenteditable], input, textarea, button";function $n(e){let t=e.matches;if(typeof t=="function"&&t.call(e,Xn))return!0;let a=e.querySelector;return typeof a=="function"&&a.call(e,Xn)!==null}function Zn(e){let t=e.querySelectorAll;if(typeof t!="function"||typeof getComputedStyle!="function")return/\d\s*%/.test(e.textContent??"");for(let a of t.call(e,"svg circle")){let n=getComputedStyle(a).strokeDasharray;if(n!==""&&n!=="none"&&!/^(0px?)(\s+0px?)*$/.test(n))return!0}return!1}function zs(e,t){return e.contains(t)||$n(e)?!1:Zn(e)}function Pa(e){let t=e.closest("[data-composer-dock]");if(t!==null){let n=[...t.children].filter(r=>!r.contains(e)&&!$n(r)&&!r.hasAttribute("data-mobile-nav")),o=n.find(Zn)??(n.length===1?n[0]:void 0);if(o!==void 0)return{dock:t,ring:o}}let a=e.closest('[class*="_composerStack"]');for(let n=e.parentElement;n!==null;n=n.parentElement){let o=[...n.children].find(r=>zs(r,e));if(o!==void 0)return{dock:n,ring:o};if(n===a)break}return null}function Ds(e){return e===null||!e.isConnected||e.closest("[data-phase]")===null?!1:e.closest('[class*="_composerStack"]')!==null}var qs=/^TPS\s+\d/,Vs=/TPS\s+\d/,Ws=e=>{for(let[t,a]of e.entries())if(qs.test((a.textContent??"").trim())&&!(a.children.length>0)&&a.parentElement!==null)return{index:t,mark:a.getAttribute("data-mobile-nav")!=="stats-tps"};return{index:-1,mark:!1}};function Us(e,t,a,n){return e!==null?{el:e.el,reserve:e.reserve,live:t}:Vs.test(a())?n():null}function Gs(e,t,a,n){return e?t:a&&n}function Yn(){let e=(h,k)=>{getComputedStyle(h).position==="static"&&h.setAttribute("data-mobile-nav",k)},t=h=>{for(let k=h.parentElement;k!==null;k=k.parentElement)if(getComputedStyle(k).position!=="static")return k;return null},a=(h,k)=>{let _=t(h);if(_===null)return null;let A=k.getBoundingClientRect(),L=_.getBoundingClientRect(),M=h.getBoundingClientRect();return{host:h,left:A.left-L.left-_.clientLeft,top:A.top-L.top-_.clientTop-(M.height-A.height)/2}},n=h=>{let k=h.host;k.style.left!==`${h.left}px`&&(k.style.left=`${h.left}px`),k.style.top!==`${h.top}px`&&(k.style.top=`${h.top}px`)},o=h=>{let k=h.closest('[class*="_composerStack"]');if(k===null)return null;let _=h.querySelector(':scope > [data-mobile-nav="stats-tps-reserve"]'),A=[...k.querySelectorAll("div")],L=Ws(A);if(L.index<0)return null;let M=A[L.index];if(M===void 0)return null;_===null&&(_=document.createElement("span"),_.setAttribute("data-mobile-nav","stats-tps-reserve"),_.setAttribute("aria-hidden","true"),h.appendChild(_));let F=M.textContent??"";_.textContent!==F&&(_.textContent=F),L.mark&&M.setAttribute("data-mobile-nav","stats-tps");let V=M.parentElement;return V===null?null:(e(V,"stats-tps-row"),{el:M,reserve:_,live:F})},r=h=>{let{el:k,reserve:_}=h,A=a(k,_);return{el:k,measured:A,width:_.getBoundingClientRect().width}},i=h=>{h.measured!==null&&n(h.measured);let k=h.el,_=`${h.width}px`;k.style.maxWidth!==_&&(k.style.maxWidth=_)},d=h=>{let k=Pa(h);if(k===null)return null;let{dock:_,ring:A}=k,L=document.querySelector('[data-composer-card] [class*="_row"] [class*="_trailing"]');if(L===null)return null;let M=L.querySelector(':scope > [data-mobile-nav="stats-ring-reserve"]'),F=L.querySelector(':scope > [class*="_primary"]');return M===null?(M=document.createElement("span"),M.setAttribute("data-mobile-nav","stats-ring-reserve"),L.insertBefore(M,F)):(F===null?L.lastElementChild!==M:M.nextElementSibling!==F)&&L.insertBefore(M,F),A.getAttribute("data-mobile-nav")!=="stats-ring"&&A.setAttribute("data-mobile-nav","stats-ring"),e(_,"stats-ring-dock"),{ring:A,reserve:M,measured:a(A,M)}},f=h=>{let k=o(h);k!==null&&i(r(k))},g=h=>{let k=d(h);k!==null&&k.measured!==null&&n(k.measured)},l=null,s=0,m="",x=h=>{if(h===null)return"none";let k=h.getBoundingClientRect();return`${Math.round(k.left)}:${Math.round(k.top)}:${Math.round(k.width)}`},w=()=>{let h=document.querySelector('[data-mobile-nav="stats"]');if(h===null)return;let k=h.getBoundingClientRect(),_=`${Math.round(k.left)}:${Math.round(k.top)}:${Math.round(k.width)}:${Math.round(k.height)}|${x(document.querySelector('[data-mobile-nav="stats-ring-reserve"]'))}`;if(_===m)return;m=_;let A=o(h),L=A===null?null:r(A),M=d(h);L!==null&&i(L),M!==null&&M.measured!==null&&n(M.measured)},E=()=>{s===0&&(s=requestAnimationFrame(()=>{s=0,w()}))},y="",v=null,S=null,T=null,u=null,b=null,p=(h,k)=>h!==null&&h.isConnected&&h.getAttribute("data-mobile-nav")===k,c=h=>{let k=Pa(h);return k===null?!1:k.ring===T};return{name:"stats-line",scopes:["*",Ra],ensure:()=>{l===null&&(l=E,window.addEventListener("resize",E),window.visualViewport?.addEventListener("resize",E));let h=b;if((h===null||!h.isConnected||!h.matches('[data-mobile-nav="stats"]'))&&(h=b=document.querySelector('[data-mobile-nav="stats"]')),h!==null&&Ds(h)){let _=h.getBoundingClientRect(),A=`${Math.round(_.left)}:${Math.round(_.top)}:${Math.round(_.width)}:${Math.round(_.height)}`,L=p(v,"stats-tps"),M=p(S,"stats-tps-reserve"),F=L&&M&&v!==null&&S!==null?{el:v,reserve:S,live:""}:null,V=h.closest('[class*="_composerStack"]'),X=Us(F,v?.textContent??"",()=>V?.textContent??"",()=>o(h)),Y=`${A}|${X===null?"none":X.live}|${x(u)}`,Q=Gs(X===null,v===null&&S===null,p(v,"stats-tps"),p(S,"stats-tps-reserve"));if(Y===y&&Q&&p(T,"stats-ring")&&c(h)&&p(u,"stats-ring-reserve"))return;y=Y;let ne=X!==null&&X.el===v?o(h):X,O=ne===null?null:r(ne),B=d(h);O!==null&&i(O),B!==null&&B.measured!==null&&n(B.measured),v=ne===null?null:ne.el,S=ne===null?null:ne.reserve,T=B===null?null:B.ring,u=B===null?null:B.reserve,y=`${A}|${X===null?"none":X.live}|${x(u)}`;return}h?.removeAttribute("data-mobile-nav");let k=document.querySelector('[class*="_composerStack"]');if(k!==null)for(let _ of['[class*="_root"]',"[data-slot]"])for(let A of k.querySelectorAll(_)){if(A.matches('[data-testid="todo-panel"]'))continue;let L=A.querySelectorAll("button");if(L.length>0&&![...L].every(F=>F.getAttribute("aria-haspopup")!==null))continue;let M=A.textContent??"";if(/(turns|steps|\bLLM\b|轮|步)/.test(M)&&A.querySelector("textarea, [data-composer-input]")===null){A.setAttribute("data-mobile-nav","stats"),f(A),g(A);return}}},dispose:()=>{s!==0&&(cancelAnimationFrame(s),s=0),m="",b=null,l!==null&&(window.removeEventListener("resize",l),window.visualViewport?.removeEventListener("resize",l),l=null);for(let h of document.querySelectorAll('[data-mobile-nav="stats-ring"], [data-mobile-nav="stats-tps"]')){let k=h;k.style.left="",k.style.top="",k.style.maxWidth=""}for(let h of["stats","stats-ring","stats-ring-dock","stats-tps","stats-tps-row"])for(let k of document.querySelectorAll(`[data-mobile-nav="${h}"]`))k.removeAttribute("data-mobile-nav");for(let h of document.querySelectorAll('[data-mobile-nav="stats-ring-reserve"], [data-mobile-nav="stats-tps-reserve"]'))h.remove()}}}function Ia(){Oa?.()}var Oa=null,js=200,Ks='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="18" height="18"><path d="M9.8 3.4 5.2 8l4.6 4.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',Xs='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="18" height="18"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.67272 0.522841C10.8339 0.522841 11.76 0.522714 12.4963 0.602493C13.2453 0.683657 13.8789 0.854248 14.4264 1.25197C14.7504 1.48739 15.0355 1.77247 15.2709 2.0965C15.6686 2.64394 15.8392 3.27758 15.9204 4.02655C16.0002 4.7629 16 5.68895 16 6.85014V9.14986C16 10.3111 16.0002 11.2371 15.9204 11.9735C15.8392 12.7224 15.6686 13.3561 15.2709 13.9035C15.0355 14.2275 14.7504 14.5126 14.4264 14.748C13.8789 15.1458 13.2453 15.3163 12.4963 15.3975C11.76 15.4773 10.8339 15.4772 9.67272 15.4772H6.3273C5.16611 15.4772 4.24006 15.4773 3.50371 15.3975C2.75474 15.3163 2.1211 15.1458 1.57366 14.748C1.24963 14.5126 0.964549 14.2275 0.729131 13.9035C0.331407 13.3561 0.160817 12.7224 0.0796529 11.9735C-0.000126137 11.2371 1.25338e-09 10.3111 1.25338e-09 9.14986V6.85014C1.25329e-09 5.68895 -0.000126137 4.7629 0.0796529 4.02655C0.160817 3.27758 0.331407 2.64394 0.729131 2.0965C0.964549 1.77247 1.24963 1.48739 1.57366 1.25197C2.1211 0.854248 2.75474 0.683657 3.50371 0.602493C4.24006 0.522714 5.16611 0.522841 6.3273 0.522841H9.67272ZM5.54303 1.88715V14.1118C5.78636 14.1128 6.04709 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C6.04709 1.88307 5.78636 1.8862 5.54303 1.88715ZM4.1828 1.91166C3.99125 1.9216 3.8148 1.93577 3.65076 1.95353C3.01764 2.02212 2.65034 2.1506 2.37325 2.35179C2.16463 2.50337 1.98052 2.68747 1.82895 2.89609C1.62776 3.17318 1.49928 3.54048 1.43069 4.1736C1.36074 4.81967 1.36023 5.65896 1.36023 6.85014V9.14986C1.36023 10.341 1.36074 11.1803 1.43069 11.8264C1.49928 12.4595 1.62776 12.8268 1.82895 13.1039C1.98052 13.3125 2.16463 13.4966 2.37325 13.6482C2.65034 13.8494 3.01764 13.9779 3.65076 14.0465C4.29683 14.1164 5.13612 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C5.13612 1.88307 4.29683 1.88358 3.65076 1.95353C3.47672 1.97129 3.30027 1.98546 3.10872 1.9954L4.1828 1.91166Z" fill="currentColor"/></svg>';function Qn(e,t,a){let n=null,o=null,r=null,i=!1,d=()=>{let m=U();return m===null?!1:!m.hasAttribute("data-sidebar-collapsed")},f=null,g=()=>{let m=f;return m!==null&&m.isConnected&&m.matches('[data-phase="active"]')?!1:(f=document.querySelector('[data-phase="active"]'),f===null)},l=m=>{if(a!==null&&a.panelOpen()){m.preventDefault(),m.stopPropagation(),a.back();return}t()},s=()=>{if(o===null)return;let m=a!==null&&a.panelOpen(),x=m&&a!==null&&a.subpageOpen(),w=x?"back-level":m?"exit-panel":"open-drawer";if(o.dataset.mobileNavFabMode===w)return;o.dataset.mobileNavFabMode=w;let E=e(x?"back":m?"backToConversation":"open");o.setAttribute("aria-label",E),o.title=E,o.innerHTML=m?Ks:Xs};return{name:"overlay-backdrop-fab",scopes:["*","data-sidebar-collapsed","data-phase"],ensure:()=>{Oa=()=>{n!==null&&(i=!0,n.style.pointerEvents="none",n.style.opacity="0")};let m=U();if(m===null){r!==null&&(window.clearTimeout(r),r=null),n?.remove(),n=null,o?.remove(),o=null;return}d()?n===null?(n=document.createElement("div"),n.dataset.mobileNav="backdrop",n.setAttribute("role","button"),n.setAttribute("aria-label",e("backdrop")),m.appendChild(n),i=!1):i&&r!==null&&(window.clearTimeout(r),r=null,i=!1,n.style.removeProperty("pointer-events"),n.style.removeProperty("opacity")):n!==null&&(n.style.pointerEvents="none",n.style.opacity="0",i=!0,r===null&&(r=window.setTimeout(()=>{r=null,n?.remove(),n=null},js+60))),g()&&!d()&&o===null?(o=document.createElement("button"),o.type="button",o.dataset.mobileNav="fab",o.setAttribute("aria-label",e("open")),o.title=e("open"),o.addEventListener("click",l),m.appendChild(o)):(!g()||d())&&o!==null&&(o.remove(),o=null),s()},dispose:()=>{r!==null&&(window.clearTimeout(r),r=null),Oa=null,f=null,n?.remove(),n=null,o?.remove(),o=null}}}function Jn(){let e=null,t=null;return{name:"file-viewer-open-marker",scopes:["*"],ensure:()=>{let a=U();if(a===null)return;let n=document.querySelector(".dsfv-panel")!==null;n===e&&a===t||(e=n,t=a,n?a.setAttribute("data-file-viewer-open",""):a.hasAttribute("data-file-viewer-open")&&a.removeAttribute("data-file-viewer-open"))},dispose:()=>{e=null,t=null,U()?.removeAttribute("data-file-viewer-open")}}}function ue(e){if(typeof e!="object"||e===null)return;let t=e;if(typeof t.current=="string")return t.current;for(let a in t.byId){let n=t.byId[a];if(n===void 0)continue;let o=n.retainedBy?.mainView;if(typeof o=="number"&&o>0&&typeof n.id=="string")return n.id}}function eo(e){return typeof e?.clear=="function"}function to(e){return typeof e?.open=="function"}var $s=4,Zs=350;async function ao(e){let t=e.attempts??$s,a=e.intervalMs??Zs;for(let n=0;n<t;n+=1){try{await e.refresh?.()}catch{}if(!e.listed())return!0;n+1<t&&await e.sleep(a)}return!e.listed()}var no='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.95317V10.0469" stroke="currentColor" stroke-width="1"/><path d="M4.25 6.29688L8 10.0469L11.75 6.29688" stroke="currentColor" stroke-width="1"/><path d="M1.5 10.0469V13.158C1.5 13.3937 1.60536 13.6198 1.79289 13.7865C1.98043 13.9532 2.23478 14.0469 2.5 14.0469H13.5C13.7652 14.0469 14.0196 13.9532 14.2071 13.7865C14.3946 13.6198 14.5 13.3937 14.5 13.158V10.0469" stroke="currentColor" stroke-width="1"/></svg>',Ys='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1"/><path d="M8 4.6V8l2.2 1.6" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>';function oo(e){let t=e.locale.bind(ie),a=()=>ue(e.sessions.list.getSnapshot()),n=null,o=null,r=null,i=null,d=null,f=null,g=null,l=null,s=null,m=()=>{i?.remove(),i=null,d=null,f!==null&&document.removeEventListener("pointerdown",f,!0),f=null,g!==null&&document.removeEventListener("keydown",g,!0),g=null,l?.disconnect(),l=null,s!==null&&(window.removeEventListener("resize",s),window.removeEventListener("orientationchange",s)),s=null,o?.setAttribute("aria-expanded","false")},x=()=>{if(i===null||o===null)return;let T=o.getBoundingClientRect();i.style.top=`${Math.round(T.bottom+4)}px`,i.style.right=`${Math.round(window.innerWidth-T.right)}px`},w=(T,u,b)=>{let p=document.createElement("button");p.type="button",p.setAttribute("role","menuitem"),p.dataset.mobileNav=u,p.innerHTML=b;let c=document.createElement("span");return c.textContent=T,p.appendChild(c),p},E=()=>{if(o===null)return;if(i!==null){m();return}let T=document.createElement("div");T.dataset.mobileNav="session-log-menu",T.setAttribute("role","menu"),T.setAttribute("aria-label",t("downloadMenu"));let u=w(t("sessionLog"),"session-log-export",no);u.disabled=a()===void 0,u.addEventListener("click",()=>{let c=a();m(),c!==void 0&&e.sessionLogDownload.download(c)}),T.appendChild(u),d=u;let b=window.DSHA;if(typeof b?.openDownloads=="function"){let c=w(t("downloads"),"session-log-downloads",Ys);c.addEventListener("click",()=>{let C=b?.openDownloads?.();m(),C!==void 0&&C.catch(()=>{})}),T.appendChild(c)}document.body.appendChild(T),i=T,x(),o.setAttribute("aria-expanded","true"),f=c=>{let C=c.target;C instanceof Node&&(T.contains(C)||o!==null&&(C===o||o.contains(C))||m())},document.addEventListener("pointerdown",f,!0),g=c=>{c.key==="Escape"&&(c.preventDefault(),m())},document.addEventListener("keydown",g,!0);let p=U();p!==null&&(l=new MutationObserver(()=>{p.hasAttribute("data-sidebar-collapsed")&&m()}),l.observe(p,{attributes:!0,attributeFilter:["data-sidebar-collapsed"]})),s=()=>{x()},window.addEventListener("resize",s),window.addEventListener("orientationchange",s),window.setTimeout(()=>{u.focus({preventScroll:!0})},0)},y=()=>{d!==null&&(d.disabled=a()===void 0)},v=()=>{let T=U();return T===null?null:T.querySelector('[class*="sidebarCol"] [class*="logoRow"]')??T.querySelector('[class*="logoRow"]')},S=(T,u)=>{u.parentElement!==T&&T.appendChild(u)};return{name:"drawer-session-log",scopes:["*"],ensure:()=>{let T=v();T!==null&&(o===null&&(n=document.createElement("span"),n.dataset.mobileNav="session-log-wrap",o=document.createElement("button"),o.type="button",o.dataset.mobileNav="session-log",o.setAttribute("aria-haspopup","menu"),o.setAttribute("aria-expanded","false"),o.setAttribute("aria-label",t("downloadMenu")),o.title=t("downloadMenu"),o.innerHTML=no,o.addEventListener("click",E),n.appendChild(o),r=e.sessions.list.subscribe(()=>{y()})),n!==null&&S(T,n),y())},dispose:()=>{m(),r?.(),r=null,n?.remove(),n=null,o=null}}}var Qs='<svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true" stroke-width="1.3"><path d="M8 9.75012C8.9665 9.75012 9.75 8.96662 9.75 8.00012C9.75 7.03362 8.9665 6.25012 8 6.25012C7.0335 6.25012 6.25 7.03362 6.25 8.00012C6.25 8.96662 7.0335 9.75012 8 9.75012Z" stroke="currentColor"/><path d="M13.0107 7.79377C12.9505 7.89401 12.9205 7.94413 12.9205 7.99951C12.9205 8.0549 12.9505 8.10502 13.0106 8.20528L13.9849 9.83006C14.045 9.93029 14.0751 9.9804 14.0751 10.0358C14.0751 10.0911 14.045 10.1413 13.9849 10.2415L13.0037 11.8777C12.9468 11.9726 12.9184 12.0201 12.8725 12.0461C12.8267 12.072 12.7713 12.072 12.6607 12.072H10.6704C10.5598 12.072 10.5045 12.072 10.4586 12.098C10.4128 12.1239 10.3843 12.1714 10.3274 12.2662L9.33825 13.9142C9.28133 14.009 9.25287 14.0564 9.20703 14.0823C9.16118 14.1083 9.10588 14.1083 8.99529 14.1083H7.00486C6.89426 14.1083 6.83896 14.1083 6.79312 14.0823C6.74727 14.0564 6.71881 14.009 6.6619 13.9142L5.67273 12.2662C5.61581 12.1714 5.58735 12.1239 5.54151 12.098C5.49566 12.072 5.44036 12.072 5.32977 12.072H3.33945C3.2288 12.072 3.17347 12.072 3.12761 12.0461C3.08176 12.0201 3.0533 11.9726 2.9964 11.8777L2.0152 10.2415C1.9551 10.1413 1.92505 10.0911 1.92505 10.0358C1.92505 9.9804 1.9551 9.93029 2.0152 9.83006L2.98951 8.20528C3.04963 8.10502 3.07969 8.0549 3.07969 7.99951C3.07968 7.94413 3.04961 7.89401 2.98946 7.79377L2.01529 6.17011C1.95514 6.06987 1.92507 6.01975 1.92507 5.96437C1.92506 5.90899 1.95512 5.85886 2.01524 5.7586L2.9964 4.1224C3.0533 4.0275 3.08176 3.98005 3.12761 3.95408C3.17347 3.92811 3.2288 3.92811 3.33945 3.92811H5.32977C5.44036 3.92811 5.49566 3.92811 5.54151 3.90216C5.58735 3.87621 5.61581 3.82879 5.67273 3.73397L6.6619 2.08599C6.71881 1.99116 6.74727 1.94375 6.79312 1.9178C6.83896 1.89185 6.89426 1.89185 7.00486 1.89185H8.99529C9.10588 1.89185 9.16118 1.89185 9.20703 1.9178C9.25287 1.94375 9.28133 1.99116 9.33825 2.08599L10.3274 3.73397C10.3843 3.82879 10.4128 3.87621 10.4586 3.90216C10.5045 3.92811 10.5598 3.92811 10.6704 3.92811H12.6607C12.7713 3.92811 12.8267 3.92811 12.8725 3.95408C12.9184 3.98005 12.9468 4.0275 13.0037 4.1224L13.9849 5.7586C14.045 5.85886 14.0751 5.90899 14.0751 5.96437C14.0751 6.01975 14.045 6.06987 13.9849 6.17011L13.0107 7.79377Z" stroke="currentColor" stroke-miterlimit="10"/></svg>',Js='[class*="sidebarCol"] [class*="triggerRow"]',ro='button[aria-haspopup="menu"]',el=400,qt="data-mobile-nav-quick-menu",tl="[data-mobile-nav-quick-menu]";function Vt(e){let t=e.locale.bind(ie),a=null,n=null,o=null,r=()=>{let x=U();return x===null?null:x.querySelector(Js)},i=()=>{o!==null&&(window.clearTimeout(o),o=null)},d=x=>{let w=document.documentElement;w.setAttribute("data-mobile-nav-quick","");let E=!1,y=()=>{E||(E=!0,i(),w.removeAttribute("data-mobile-nav-quick"))},v=()=>x.getAttribute("aria-expanded")==="true";v()||x.click(),requestAnimationFrame(()=>{let S=document.querySelectorAll('[role="menu"]'),u=(v()&&S.length>0?S[S.length-1]:null)?.querySelector('[role="menuitem"]')??null;if(u===null){v()&&x.click(),y();return}u.click(),o=window.setTimeout(()=>{v()&&x.click(),y()},el)})},f=()=>{let x=r();if(x===null)return;let w=x.querySelector(ro);w!==null&&d(w)},g=()=>{a=document.createElement("span"),a.dataset.mobileNav="quick-settings-wrap",n=document.createElement("button"),n.type="button",n.dataset.mobileNav="quick-settings",n.setAttribute("aria-label",t("quickSettings")),n.setAttribute("aria-haspopup","dialog"),n.title=t("quickSettings"),n.innerHTML=Qs,n.addEventListener("click",f),a.appendChild(n)},l=x=>![...x.children].some(w=>w.getAttribute("data-phase")!==null||w.getAttribute("role")==="status"),s=()=>{for(let x of document.querySelectorAll(tl))x.removeAttribute(qt)},m=x=>{let w=document.querySelectorAll('[role="menu"]'),E=w.length>0?w[w.length-1]??null:null;if(E===null)return;let y=x.querySelector(ro);if(!(y!==null&&y.getAttribute("aria-expanded")==="true"&&l(x))){E.removeAttribute(qt);return}E.hasAttribute(qt)||E.setAttribute(qt,"")};return{name:"drawer-quick-settings",scopes:["*"],ensure:()=>{let x=r();x!==null&&((n===null||a===null)&&g(),a!==null&&a.parentElement!==x&&x.appendChild(a),m(x))},dispose:()=>{i(),document.documentElement.removeAttribute("data-mobile-nav-quick"),s(),a?.remove(),a=null,n=null}}}function io(e){return Number.isNaN(e)?1:Math.min(4,Math.max(1,e))}function ke(){return{scale:1,x:0,y:0}}function so(e,t,a){if(!Number.isFinite(t)||t<=0)return{...e};if(!(e.scale>0))return ke();let n=io(e.scale*t);if(n===1)return ke();let o=n/e.scale;return{scale:n,x:a.x-(a.x-e.x)*o,y:a.y-(a.y-e.y)*o}}function Wt(e,t){let a=io(e.scale);if(a===1)return ke();let n=Number.isFinite(t.width)&&t.width>0?t.width:0,o=Number.isFinite(t.height)&&t.height>0?t.height:0,r=(a-1)*n/2,i=(a-1)*o/2,d=Number.isFinite(e.x)?Math.min(r,Math.max(-r,e.x)):0,f=Number.isFinite(e.y)?Math.min(i,Math.max(-i,e.y)):0;return{scale:a,x:d,y:f}}function lo(e,t){let a=Math.hypot(e.x,e.y),n=Math.hypot(t.x,t.y);return a===0||!Number.isFinite(a)||!Number.isFinite(n)?1:n/a}function co(e){return e.scale<=1?{scale:2.5,x:0,y:0}:ke()}function po(){let e=null,t=null,a=ke(),n=new Map,o=null,r=null,i=null,d=()=>({width:window.innerWidth,height:window.innerHeight}),f=()=>{for(let b of document.body.querySelectorAll(':scope > [role="dialog"][aria-modal="true"]')){if(!(b instanceof HTMLElement))continue;let p=b.querySelector(":scope > :first-child > img");if(p instanceof HTMLImageElement)return{root:b,image:p}}return null},g=()=>{t!==null&&(t.style.transform="",t.style.transformOrigin="",t.style.willChange="",t=null)},l=()=>{e!==null&&(e.removeEventListener("pointerdown",w),e.removeEventListener("pointermove",E),e.removeEventListener("pointerup",y),e.removeEventListener("pointercancel",v),e.removeEventListener("gesturestart",S),e.removeEventListener("touchmove",T),e.getAttribute("data-mobile-nav")==="image-lightbox"&&e.removeAttribute("data-mobile-nav")),g(),n.clear(),o=null,r=null,i=null,a=ke(),e=null},s=()=>{if(t===null)return{x:0,y:0};let b=t.getBoundingClientRect();return{x:b.left+b.width/2-a.x,y:b.top+b.height/2-a.y}},m=()=>{t!==null&&(t.style.transform="translate3d("+a.x+"px, "+a.y+"px, 0) scale("+a.scale+")")},x=()=>{let b=[...n.values()],p=b[0],c=b[1];if(p===void 0||c===void 0)return;let C={x:(p.x+c.x)/2,y:(p.y+c.y)/2},h=s();r={startSpan:{x:c.x-p.x,y:c.y-p.y},startMid:C,startZoom:{...a},anchor:{x:C.x-h.x,y:C.y-h.y}},o=null},w=b=>{if(b.pointerType!=="mouse"){if(n.set(b.pointerId,{x:b.clientX,y:b.clientY}),n.size>=2){x();return}o={pointerId:b.pointerId,startX:b.clientX,startY:b.clientY,originX:a.x,originY:a.y,moved:!1,startedOnImage:b.target===t}}},E=b=>{if(!n.has(b.pointerId))return;let p={x:b.clientX,y:b.clientY};if(n.set(b.pointerId,p),n.size>=2){if(r===null){x();return}let h=[...n.values()],k=h[0],_=h[1];if(k===void 0||_===void 0)return;let A={x:(k.x+_.x)/2,y:(k.y+_.y)/2},L=lo(r.startSpan,{x:_.x-k.x,y:_.y-k.y}),M=so(r.startZoom,L,r.anchor);a=Wt({scale:M.scale,x:M.x+(A.x-r.startMid.x),y:M.y+(A.y-r.startMid.y)},d()),m();return}if(o===null||o.pointerId!==b.pointerId||!o.startedOnImage)return;let c=p.x-o.startX,C=p.y-o.startY;(Math.abs(c)>4||Math.abs(C)>4)&&(o.moved=!0),a=Wt({scale:a.scale,x:o.originX+c,y:o.originY+C},d()),m()},y=b=>{if(!n.delete(b.pointerId))return;if(n.size>=2){x();return}if(n.size===1){let C=[...n.entries()][0];if(r=null,o=null,C!==void 0){let[h,k]=C;o={pointerId:h,startX:k.x,startY:k.y,originX:a.x,originY:a.y,moved:!0,startedOnImage:!0}}return}let p=o;if(o=null,r=null,p===null||p.pointerId!==b.pointerId||!p.startedOnImage||p.moved){i=null;return}let c=Date.now();if(i!==null&&c-i.at<=320&&Math.hypot(b.clientX-i.x,b.clientY-i.y)<=28){a=Wt(co(a),d()),i=null,m();return}i={at:c,x:b.clientX,y:b.clientY}},v=b=>{n.delete(b.pointerId),n.size<2&&(r=null),n.size===0&&(o=null,i=null)},S=b=>{b.preventDefault()},T=b=>{b.touches.length>1&&b.preventDefault()},u=(b,p)=>{e=b,t=p,a=ke(),n.clear(),o=null,r=null,i=null,e.setAttribute("data-mobile-nav","image-lightbox"),t.style.transformOrigin="50% 50%",t.style.willChange="transform",e.addEventListener("pointerdown",w),e.addEventListener("pointermove",E),e.addEventListener("pointerup",y),e.addEventListener("pointercancel",v),e.addEventListener("gesturestart",S),e.addEventListener("touchmove",T,{passive:!1})};return{name:"image-lightbox-zoom",scopes:["*"],ensure:()=>{let b=f();if(b===null){l();return}if(e===b.root){t!==b.image&&(g(),t=b.image,a=ke(),t.style.transformOrigin="50% 50%",t.style.willChange="transform");return}l(),u(b.root,b.image)},dispose:()=>{l()}}}var tt=new WeakMap,Na=!1;function Ha(){Na=!0}function Fa(){Na=!1}function Ba(){return Na}function Ut(e){return typeof e=="object"&&e!==null&&"parentElement"in e&&e.parentElement!==void 0}function ho(e,t,a){let n=performance.now()+t;if(!Ut(e)){if(typeof e!="object"&&typeof e!="function"||e===null)return;tt.set(e,n);return}let o=e;for(;o!==null&&(tt.set(o,n),o!==a);)o=Ut(o.parentElement)?o.parentElement:null}function wt(e){let t=performance.now(),a=e.target;if(!Ut(a)){if(typeof a!="object"&&typeof a!="function"||a===null)return!1;let o=tt.get(a);return o===void 0?!1:o<=t?(tt.delete(a),!1):!0}let n=a;for(;n!==null;){let o=tt.get(n);if(o!==void 0)if(o<=t)tt.delete(n);else return!0;n=Ut(n.parentElement)?n.parentElement:null}return!1}var al=["node","session","summary","result"],nl=["sessionId","id"],ol=["__reactFiber$","__reactInternalInstance$"];function rl(e){if(typeof e!="object"||e===null)return null;let t=e.id;return typeof t=="string"?t:null}function il(e,t){if(e==null)return null;for(let a of al){let n=rl(e[a]);if(n!==null&&t(n))return n}for(let a of nl){let n=e[a];if(typeof n=="string"&&t(n))return n}return null}function Gt(e,t,a=60){let n=e;for(let o=0;o<a&&n!==null&&n!==void 0;o+=1){let r=il(n.memoizedProps,t);if(r!==null)return r;n=n.return}return null}function jt(e){if(e==null||typeof e!="object")return null;let t=e;for(let a of ol)for(let n of Object.keys(t)){if(!n.startsWith(a))continue;let o=t[n];if(typeof o=="object"&&o!==null)return o}return null}function za(e,t,a){return Math.abs(t.x-e.x)<=a&&Math.abs(t.y-e.y)<=a}var sl=.45;function ll(e,t=sl){return Math.round(e*t)}var Da=8,dl=.16,uo=.13,xo=60,cl=.45,pl=.45,ze=350,hl=300,yo=8,qe=110,mo=280,fo=101,ul=.45,ml=.16,fl=.45,Ae=0,Ve=!1,Le=[],yt=0,Va=0,We=!1,Me=0,xt=null,se=null,Ue=!1,ko=0,De=!1,Ee=!1,kt=!1,_e="drawer",Wa=!1,_o=()=>!1;function bl(e,t,a){let n=a?-t.dx:t.dx;if(Math.abs(n)<=e.lockPx||Math.abs(n)<=Math.abs(t.dy))return"none";if(e.drawerOpen){if(Math.abs(n)/e.viewportWidthPx>=e.closeDistanceRatio)return"close";let i=a?-t.velX:t.velX;return i>0!=n>0?"none":Math.abs(i)>=e.closeVelocity?"close":"none"}return n<=0?"none":n/e.viewportWidthPx>=e.openDistanceRatio||(a?-t.velX:t.velX)>=e.openVelocity?"open":"none"}function gl(e,t,a){let n=a?-t.dx:t.dx;if(Math.abs(n)<=e.lockPx||Math.abs(n)<=Math.abs(t.dy))return"none";let o=a?-t.velX:t.velX;if(n<0)return e.panelOpen||e.drawerOpen?"none":-n/e.viewportWidthPx>=e.distanceRatio?"files":o>0!=n>0?"none":-o>=e.velocity?"files":"none";if(e.drawerOpen){let r=e.drawerCloseDistanceRatio??e.distanceRatio;return n/e.viewportWidthPx>=r?"close":o<=0?"none":o>=e.velocity?"close":"none"}return e.panelOpen?n/e.viewportWidthPx>=e.distanceRatio?"files":o>0!=n>0?"none":o>=e.velocity?"files":"none":"none"}function wl(e,t,a){let n=a-t,o=e.filter(f=>f.t>=n);if(o.length<2)return 0;let r=o[o.length-2],i=o[o.length-1],d=i.t-r.t;return d<=0?0:(i.x-r.x)/d}function vl(e,t,a,n){let o=a?e:t-e;return o>=0&&o<=n}function xl(e,t){return e||!t?"drawer":"files"}function yl(e,t,a,n){let o=e<=0?-1:1,r=Math.abs(e),i=a?-t:t;return n?i>=0?null:o*Math.min(r,-i)+0:i<=0?null:o*(r-Math.min(r,i))+0}function Eo(e,t){let a=t?-e:e;return a<=0?null:t?`translateX(max(0px, calc(${fo}% - ${a}px)))`:`translateX(min(0px, calc(-${fo}% + ${a}px)))`}function kl(e){let t=e;for(;t!==null;){if((t.overflowX==="auto"||t.overflowX==="scroll")&&t.scrollWidth>t.clientWidth+1)return t;t=t.parent}return null}function rt(){let e=U();return e!==null&&e.firstElementChild instanceof HTMLElement?e.firstElementChild:null}function Ua(){let e=U();return e!==null&&!e.hasAttribute("data-sidebar-collapsed")}function To(){let e=document.querySelector("[data-sidebar-right-panel]");return e!==null&&e.hasAttribute("data-sidebar-right-open")}function _l(e){let t=null,a=e;for(;a!==null;)t={parent:t,scrollWidth:a.scrollWidth,clientWidth:a.clientWidth,overflowX:getComputedStyle(a).overflowX},a=a.parentElement;return t}function Zt(){return document.querySelector('[aria-modal="true"]')!==null}function Ga(){return document.documentElement.hasAttribute("data-dsh-taskboard-active")||document.documentElement.hasAttribute("data-dsh-ssh-active")||document.querySelector("[data-conversation-composer-overlay]")!==null}function So(){if(typeof window>"u")return!1;let e=window.getSelection();if(e!==null&&!e.isCollapsed)return!0;if(typeof document>"u")return!1;let t=document.activeElement;if(t===null)return!1;let a=t.tagName;if(a!=="TEXTAREA"&&a!=="INPUT")return!1;try{let{selectionStart:n,selectionEnd:o}=t;return typeof n=="number"&&typeof o=="number"&&n!==o}catch{return!1}}function Co(){return performance.now()<Me}function Ao(e){return document.documentElement.hasAttribute("data-mobile-nav-dragging")||document.body.hasAttribute("data-mobile-nav-dragging")?!0:e.target instanceof Element&&e.target.closest("[data-mobile-nav-dragging]")!==null}var bo=200;function El(e){let t=e.closest(".dsh-pet-root");if(t!==null)return t;if(e.closest('[data-mobile-nav="frame"]')!==null)return null;let a=e;for(;a!==null;){if(a instanceof HTMLElement){let n=getComputedStyle(a);if((n.position==="fixed"||n.position==="absolute")&&a.offsetWidth<=bo&&a.offsetHeight<=bo)return a}a=a.parentElement}return null}function Lo(e){return e.target instanceof Element&&El(e.target)!==null}function go(){se=null,Ue=!1,Ee=!1,kt=!1,De=_t();let e=rt();if(e===null||!We)return;se=e;let t=e.getBoundingClientRect().width*qe/100;ko=De?t:-t}var qa=!1,at=0;function ja(){if(!qa)return;qa=!1,se?.style.removeProperty("content-visibility");let e=rt();e!==null&&e!==se&&e.style.removeProperty("content-visibility")}function Tl(e){if(Ee||kt)return;let t=rt();if(t===null||Zt()||Ga()){kt=!0;return}se=t,Ue=!0,t.style.setProperty("transition","none","important");let a=Eo(1e-4,De);t.style.setProperty("transform",a??`translateX(-${qe}%)`,"important"),t.style.willChange="transform",t.style.setProperty("content-visibility","hidden","important"),qa=!0,Ee=!0,e.layout.toggleSidebar(),at=requestAnimationFrame(()=>{at=requestAnimationFrame(()=>{at=0,ja()})})}function wo(e,t){if(!Ve||_e!=="drawer")return;if(!We){let n=De?-t:t;if(!Ee&&(n<yo||(Tl(e),!Ee)))return;let o=Eo(t,De);if(o===null){se?.style.setProperty("transform",`translateX(-${qe}%)`,"important");return}se?.style.setProperty("transform",o,"important");return}if(se===null)return;let a=yl(ko,t,De,We);if(a===null){Ue=!0,se.style.setProperty("transition","none","important"),se.style.setProperty("transform","translateX(0px)","important");return}Ue=!0,se.style.setProperty("transition","none","important"),se.style.setProperty("transform",`translateX(${a}px)`,"important")}function $t(){let e=se;!Ue||e===null||(Ue=!1,e.style.removeProperty("transition"),e.style.removeProperty("transform"))}var nt=null;function Kt(){let e=nt;if(e===null)return;nt=null,window.clearTimeout(e.timer),e.el.style.removeProperty("transition"),e.el.style.removeProperty("transform");let t=U();t!==null&&!t.hasAttribute("data-sidebar-collapsed")&&e.ctx.layout.toggleSidebar()}function Mo(e,t,a){let n=nt;if(!(n!==null&&n.el===t&&n.target===a)){if(Kt(),window.matchMedia("(prefers-reduced-motion: reduce)").matches){Ia(),Me=performance.now()+ze,nt={el:t,ctx:e,timer:0,target:a},Kt();return}t.style.setProperty("transition",`transform ${mo}ms ease-in-out`,"important"),t.style.getPropertyValue("transform")!==""&&t.getBoundingClientRect(),t.style.setProperty("transform",a,"important"),Ia(),Me=performance.now()+ze,nt={el:t,ctx:e,timer:window.setTimeout(Kt,mo+40),target:a}}}function Xt(e){let t=se;if(se=null,Ue=!1,t===null){$t(),e.layout.toggleSidebar(),Me=performance.now()+ze;return}let a=De?`translateX(${qe}%)`:`translateX(-${qe}%)`;Mo(e,t,a)}function Ro(e){if(!Ua()||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return!1;let t=rt();if(t===null)return!1;let a=_t()?`translateX(${qe}%)`:`translateX(-${qe}%)`;return Mo(e,t,a),!0}function Be(e,t=!1){if(nt!==null){t&&Kt();return}let a=Ee;if(Ee=!1,kt=!1,ja(),a&&e!==null&&se!==null&&!t){ot(),Xt(e);return}$t(),ot(),a&&e!==null&&(e.layout.toggleSidebar(),Me=performance.now()+ze)}function Sl(e,t,a){if(Co()||Zt()||Ga()||So()||Ao(e)||Lo(e)||!(e.target instanceof Element)||kl(_l(e.target))!==null||e.target.closest('[class*="_composerSeat"], [data-composer-card], [class*="_dock"]')!==null)return!1;let n=Ua(),o=ll(a,ul);if(n){let r=U();if(r===null)return!1;let i=r.getBoundingClientRect();if(e.clientX<i.left||e.clientX>i.right||e.clientY<i.top||e.clientY>i.bottom||e.target.closest('[class*="sessionRow"] button')!==null)return!1;let d=rt(),f=d===null?null:d.getBoundingClientRect(),g=f!==null&&e.clientX>=f.left&&e.clientX<=f.right;_e=xl(g,vl(e.clientX,a,t,o))}else To()?_e="files":_e="pending";return Ae=e.pointerId,Ve=!1,yt=e.clientX,Va=e.clientY,Le=[{t:e.timeStamp,x:e.clientX}],!0}function Cl(e){let t=e.clientX-yt,a=e.clientY-Va;return Math.max(Math.abs(t),Math.abs(a))<Da?!1:Ao(e)||Lo(e)||Math.abs(t)<=Math.abs(a)?(ot(),!1):(Ve=!0,We=Ua(),_e==="pending"&&(_e=t>0!==_t()?"drawer":"files"),_e==="files"?(Wa=To(),We&&go(),Ha(),!0):(Ha(),go(),!0))}function vo(e){Le.push({t:e.timeStamp,x:e.clientX});let t=e.timeStamp-xo,a=0;for(;a<Le.length-1&&Le[a].t<t;)a+=1;a>0&&(Le=Le.slice(a))}function Al(e,t,a,n){let o=Ve,r=Ee;Ee=!1,kt=!1;let i=_e==="files",d=Wa,f=wl(Le,xo,t.timeStamp),g=t.clientX-yt,l=t.clientY-Va;if(ot(),!o){r&&Xt(e);return}let m=Zt()||!r&&Co()?"none":i?gl({distanceRatio:ml,velocity:fl,lockPx:Da,viewportWidthPx:n,panelOpen:d,drawerOpen:We,drawerCloseDistanceRatio:uo},{dx:g,dy:l,velX:f},a):bl({openDistanceRatio:dl,closeDistanceRatio:uo,openVelocity:cl,closeVelocity:pl,lockPx:Da,viewportWidthPx:n,drawerOpen:We},{dx:g,dy:l,velX:f},a);if(ja(),r){let x=g>0!==a&&Math.abs(g)>=yo;m==="open"||x?($t(),Me=performance.now()+ze):Xt(e),t.target instanceof Element&&vt(t.target);return}if(t.target instanceof Element){if(m==="close"){vt(t.target),Xt(e);return}$t(),m==="open"&&(vt(t.target),e.layout.toggleSidebar(),Me=performance.now()+ze),m==="files"&&(_o(),vt(t.target),Me=performance.now()+ze),i&&m==="none"&&vt(t.target)}}function vt(e){let t=rt(),a=t!==null&&t.contains(e)?t:U()??null;ho(e,hl,a),xt=e}function ot(){Ae=0,Ve=!1,Le=[],_e="drawer",Wa=!1,Fa()}function _t(){let e=U();return e!==null&&getComputedStyle(e).direction==="rtl"}function Po(e,t){D(e,"dsh-web-mobile: sidebar swipe gestures",()=>{_o=t;let a=()=>window.innerWidth||document.documentElement.clientWidth||0,n=s=>{if(xt=null,Fa(),!(s.pointerType!=="touch"&&s.pointerType!=="pen")){if(Ae!==0&&Ae!==s.pointerId){Be(e);return}Sl(s,_t(),a())}},o=s=>{if(s.pointerId===Ae){if(Zt()||Ga()){Be(e);return}if(Ve)vo(s),wo(e,s.clientX-yt);else{if(So()){ot();return}Cl(s)&&(vo(s),wo(e,s.clientX-yt))}}},r=s=>{s.pointerId===Ae&&Al(e,s,_t(),a())},i=s=>{s.pointerId===Ae&&Be(e)},d=s=>{if(xt===null||!(s.target instanceof Element))return;let m=s.target.closest('[data-mobile-nav="backdrop"], [data-mobile-nav="fab"]');m!==null&&!m.contains(xt)||wt(s)&&(s.stopPropagation(),s.preventDefault(),xt=null)},f=()=>{document.hidden&&Be(e)},g=s=>{if(Ae!==0){if(s.touches.length!==1||!s.cancelable||document.hidden){Be(e);return}Ve&&s.preventDefault()}};document.addEventListener("pointerdown",n,!0),document.addEventListener("pointermove",o,!0),document.addEventListener("pointerup",r,!0),document.addEventListener("pointercancel",i,!0),document.addEventListener("click",d,!0),document.addEventListener("touchmove",g,{capture:!0,passive:!1});let l=()=>Be(e);return document.addEventListener("visibilitychange",f),window.addEventListener("blur",l),()=>{document.removeEventListener("pointerdown",n,!0),document.removeEventListener("pointermove",o,!0),document.removeEventListener("pointerup",r,!0),document.removeEventListener("pointercancel",i,!0),document.removeEventListener("click",d,!0),document.removeEventListener("touchmove",g,{capture:!0}),document.removeEventListener("visibilitychange",f),window.removeEventListener("blur",l),at!==0&&(cancelAnimationFrame(at),at=0),Be(e,!0)}})}var Oo=12,it=null,Ll='button[data-dsh-taskboard-entry], button[data-dsh-ssh-entry], [class*="newSession"], [class*="sessionRow"], [class*="searchResultRow"], [class*="searchResultWorkspace"], [class*="panelRow"]';function Et(e){Ro(e)||e.layout.toggleSidebar()}function Io(e){D(e,"dsh-web-mobile: drawer close (Escape + navigate)",()=>{let t=()=>{Et(e)},a=()=>{let _=U();return _!==null&&!_.hasAttribute("data-sidebar-collapsed")},n=_=>{_.key==="Escape"&&document.querySelector('[aria-modal="true"]')===null&&a()&&t()},o=()=>document.querySelector('[data-mobile-nav="frame"] > :first-child'),r=_=>{if(document.querySelector('[aria-modal="true"]')!==null||!a()||!(_ instanceof Element))return!1;let A=o();return A===null||!A.contains(_)||_.closest('[class*="sessionRow"] button')!==null||_.closest('button[class*="panelRow"][aria-haspopup="menu"]')!==null?!1:_.closest(Ll)!==null},i=_=>!(_ instanceof Element&&_.closest("[data-dsha-session-select]")!==null)&&r(_),d=0,f="",g=null,l=null,s=_=>{if(!_.isTrusted)return;let A=_.target;A instanceof Element&&A.closest('[class*="sessionRow"] [class*="_title"]')!==null&&(_.preventDefault(),_.stopPropagation())},m=()=>o()?.querySelector('[role="treeitem"][aria-selected="true"]')?.querySelector('[class*="_title"]')?.textContent?.trim()??null,x=()=>{g?.disconnect(),g=null,l!==null&&window.clearTimeout(l),l=null,f=""},w=()=>{x(),f=m()??"";let _=o();_!==null&&(g=new MutationObserver(()=>{if(!a()){x();return}let A=m();A!==null&&A!==f&&(x(),t())}),g.observe(_,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-selected"]}),l=window.setTimeout(x,2e3))},E=_=>e.sessions.list.getSnapshot().byId[_]!==void 0,y=(_,A)=>{if(it===null||!za(it,{x:A.clientX,y:A.clientY},Oo))return null;let L=Gt(jt(_),E);return L===null||ue(e.sessions.list.getSnapshot())===L?null:L},v=null,S=!1,T=0,u=()=>{S=!0,v?.(),v=null,T!==0&&(window.clearTimeout(T),T=0)},b=_=>{u(),S=!1;let A=()=>{S||(u(),a()&&t())};v=e.sessions.list.subscribe(()=>{ue(e.sessions.list.getSnapshot())===_&&(T!==0&&window.clearTimeout(T),T=window.setTimeout(()=>{T=0,A()},0))})},p=0,c=_=>{p=performance.now(),it=_.pointerType==="touch"||_.pointerType==="pen"?{x:_.clientX,y:_.clientY}:null},C=_=>{let A=_.target;if(Ba()||wt(_))return;if(A instanceof Element&&A.closest('[data-mobile-nav="backdrop"]')!==null){a()&&t();return}let L=A instanceof Element?A.closest('[role="treeitem"][data-dsha-session-select]'):null;if(L!==null&&_.detail>0&&r(A)){if(_.defaultPrevented||it!==null&&(performance.now()-p>=500||!za(it,{x:_.clientX,y:_.clientY},Oo)))return;_.preventDefault(),_.stopPropagation(),x(),u(),d=performance.now(),L.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,detail:0}));return}performance.now()-d<500||i(A)&&t()},h=_=>{if(Ba()||wt(_)||_.pointerType!=="touch"&&_.pointerType!=="pen")return;let A=_.target;if(!(A instanceof Element)||!i(A))return;let L=A.closest('[role="treeitem"]');if(L!==null){if(d=performance.now(),L.getAttribute("aria-selected")==="true")t();else{let M=y(L,_);M===null?(u(),w()):(x(),to(e.sessions)?(b(M),e.sessions.open(M)):(u(),w()))}return}},k=()=>{a()&&t()};return document.addEventListener("dsha-session-open",k),document.addEventListener("dblclick",s,!0),document.addEventListener("keydown",n,!0),document.addEventListener("click",C,!0),document.addEventListener("pointerdown",c,!0),document.addEventListener("pointerup",h,!0),()=>{x(),u(),it=null,document.removeEventListener("dsha-session-open",k),document.removeEventListener("dblclick",s,!0),document.removeEventListener("keydown",n,!0),document.removeEventListener("click",C,!0),document.removeEventListener("pointerdown",c,!0),document.removeEventListener("pointerup",h,!0)}})}var Ka=!1,Xa=!1,Yt=Gn({requestFrame:e=>{let t=0;return t=requestAnimationFrame(()=>{t=0,e()}),()=>{t!==0&&cancelAnimationFrame(t)}}});function No(e){return Ka?()=>{}:(Ka=!0,D(e,"dsh-web-mobile: DOM reconciler",()=>{let t=new MutationObserver(a=>{let n=new Set;for(let o of a)(o.target instanceof Element?o.target:o.target.parentElement)?.closest("[data-chat-flow]")||n.add(Un(o));n.size>0&&Yt.note(n)});return t.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,characterData:!0,attributeFilter:["style","class","data-phase","data-sidebar-collapsed"]}),Yt.activate(),()=>{t.disconnect(),Yt.deactivate()}}),()=>{Ka=!1})}function me(e){return Yt.register(e)}function Ho(e,t){if(Xa)return()=>{};Xa=!0;let a=e.locale.bind(ie),n=[me(Yn()),me(Qn(a,()=>Et(e),t)),me(t.task),me(Jn()),me(oo(e)),me(Vt(e)),me(po())];return()=>{for(let o of n)o();Xa=!1}}var Tt="dsh-mobile-visible-band";function Fo({frameBudgetMs:e=32,stutterLimit:t=3,burstIdleMs:a=240}={}){let n=!0,o=0,r=0;return{noteFrame:l=>{if(!n)return!1;if(o===0||l-o>a)return o=l,r=0,!0;let s=l-o;return o=l,s<=e?(r=0,!0):(r+=1,r>=t&&(n=!1),n)},noteSettled:()=>{o=0,r=0},isLive:()=>n,reset:()=>{n=!0,o=0,r=0}}}var Bo="data-mobile-nav-ios",$a="width=device-width, initial-scale=1, viewport-fit=cover",zo="--dsh-web-mobile-vh",Za=()=>document.querySelector('meta[name="viewport"]');function Do(){let e=null,t=null,a=!1,n=()=>{let d=Za();d!==null&&(e===null&&(e=d.content),!(a||d.content===$a)&&(a=!0,d.content=$a,a=!1))},o=new MutationObserver(n),r=()=>{let d=Za();d!==t&&(t!==null&&o.disconnect(),t=d,d!==null&&o.observe(d,{attributes:!0,attributeFilter:["content"]}))},i=new MutationObserver(()=>{r(),n()});return i.observe(document.head,{childList:!0}),r(),n(),()=>{o.disconnect(),i.disconnect();let d=Za();d!==null&&e!==null&&d.content===$a&&(d.content=e)}}function qo(){let e=document.documentElement,t=0,a=0,n="",o="",r="",i="",d=0,f=0,g=Fo(),l=m=>{o!==m&&(o=m,e.style.setProperty("--dsha-mobile-visible-vh",m))},s=()=>{f=0;let m=window.innerHeight,x=window.innerWidth,w=window.visualViewport,y=`${Math.max(1,Math.min(m,w?.height??m))}px`,v=`${w?.offsetTop??0}px`;e.style.getPropertyValue("--dsha-mobile-viewport-top")!==v&&e.style.setProperty("--dsha-mobile-viewport-top",v),d=y===i?d+1:0,i=y;let S=d>=2;if(g.isLive()?(l(y),S?g.noteSettled():g.noteFrame(performance.now())):S&&l(y),S&&y!==r&&(r=y,document.dispatchEvent(new CustomEvent(Tt))),!S&&f===0&&(f=requestAnimationFrame(s)),t===0||m>t||x!==a){t=m,a=x;let T=`${m}px`;T!==n&&(n=T,e.style.setProperty(zo,T))}};return s(),window.addEventListener("resize",s),window.visualViewport?.addEventListener("resize",s),window.visualViewport?.addEventListener("scroll",s),()=>{window.removeEventListener("resize",s),window.visualViewport?.removeEventListener("resize",s),window.visualViewport?.removeEventListener("scroll",s),f!==0&&cancelAnimationFrame(f),f=0,e.style.removeProperty("--dsha-mobile-visible-vh"),e.style.removeProperty("--dsha-mobile-viewport-top"),n="",e.style.removeProperty(zo)}}function Vo(e){if(!e)return;let t=document.documentElement;return t.setAttribute(Bo,""),()=>{t.removeAttribute(Bo)}}var Ml='[data-dsh-responsive-part="sidebar-toggle"]:not([data-mobile-nav])',Wo='[data-mobile-nav="dismiss-shadow"]';function Rl(){if(typeof document>"u")return;let e=document.querySelector(Wo),t=document.querySelector(Ml),a=t?.closest('[data-pane="sidebar"]')??null;if(t===null||a===null){e?.remove();return}if(e!==null&&e.parentElement===a&&a.firstElementChild===e)return;let n=e??document.createElement("span");e===null&&(n.setAttribute("data-mobile-nav","dismiss-shadow"),n.setAttribute("data-dsh-responsive-part","sidebar-toggle"),n.setAttribute("aria-hidden","true"),n.style.setProperty("display","none","important")),a.insertBefore(n,a.firstElementChild)}function Uo(){if(Ya)return()=>{};Ya=!0;let e=null,t=me({name:"frame-marker",scopes:["*"],ensure:()=>{e=La(),e!==null&&!e.hasAttribute("data-mobile-nav")&&e.setAttribute("data-mobile-nav","frame"),Rl()},dispose:()=>{e!==null&&e.removeAttribute("data-mobile-nav"),typeof document<"u"&&document.querySelector(Wo)?.remove(),e=null}}),a=me(Wn());return()=>{a(),t(),Ya=!1}}var Ya=!1;function Go(e){D(e,"dsh-web-mobile: status bar theme + viewport + zoom guard",()=>{let t=document.createElement("meta");t.name="theme-color";let a=()=>getComputedStyle(document.body).backgroundColor,n=typeof CSS<"u"&&typeof CSS.supports=="function"?f=>CSS.supports(f):null;t.content=a(),t.parentElement===null&&document.head.appendChild(t);let o=new MutationObserver(()=>{t.content=a()});o.observe(document.body,{attributes:!0,attributeFilter:["data-ds-dark-theme"]});let r=Do(),i=Vo(Dt(navigator,n)),d=qo();return()=>{d(),o.disconnect(),r(),t.remove(),i?.()}})}var Qt="data-mobile-nav-selecting";function Pl(){let e=window.getSelection();if(e===null||e.isCollapsed)return!1;let t=e.anchorNode;if(t===null)return!1;let a=t instanceof HTMLElement?t:t.parentElement;return a===null||a.closest("[data-composer-card]")!==null?!1:a.closest("[data-phase]")!==null}function jo(e){D(e,"dsh-web-mobile: selection chrome yield",()=>{if(typeof document>"u")return;let t=document.documentElement,a=()=>{let n=Pl();n!==t.hasAttribute(Qt)&&(n?t.setAttribute(Qt,""):t.removeAttribute(Qt))};return document.addEventListener("selectionchange",a),a(),()=>{document.removeEventListener("selectionchange",a),t.removeAttribute(Qt)}})}var Ko='[data-mobile-nav="frame"] button[class*="_trigger"][aria-haspopup="tree"][aria-expanded]:not([class*="_switcherTrigger"])',Ol='[class*="ZKlsPq_root"], [class*="ZKlsPq_menu"], [class*="h8S2Va_root"], [class*="h8S2Va_menu"]',Il=800,Nl=1e3,Xo=["mouseover","mouseout","mouseenter","mouseleave","pointerout","pointerleave"];function $o(e){D(e,"dsh-web-mobile: lineage chip touch toggle",()=>{if(typeof PointerEvent>"u")return;let t=0,a=()=>{t=Date.now()+Il},n=null,o=0,r=g=>{if(g.pointerType!=="touch"&&g.pointerType!=="pen")return;a();let l=g.target;if(!(l instanceof Element))return;let s=l.closest(Ko);if(s===null)return;let m=s.getAttribute("aria-expanded")==="true";s.dispatchEvent(new KeyboardEvent("keydown",{key:m?"Escape":"ArrowDown",bubbles:!0,cancelable:!0})),n=s,o=Date.now()+Nl},i=g=>{if(n===null)return;if(Date.now()>=o){n=null;return}let l=g.target;l instanceof Element&&l.closest(Ko)===n&&(n=null,g.stopPropagation())},d=g=>{g.pointerType!=="touch"&&g.pointerType!=="pen"||a()},f=g=>{if(Date.now()>=t||!g.isTrusted)return;let l=g.target;l instanceof Element&&l.closest(Ol)!==null&&g.stopImmediatePropagation()};document.addEventListener("pointerdown",d,!0),document.addEventListener("pointerup",r,!0),document.addEventListener("click",i,!0);for(let g of Xo)document.addEventListener(g,f,!0);return()=>{document.removeEventListener("pointerdown",d,!0),document.removeEventListener("pointerup",r,!0),document.removeEventListener("click",i,!0);for(let g of Xo)document.removeEventListener(g,f,!0)}})}var Hl="workspace",Fl='data-mobile-nav="session-delete"',Qa="var(--dsw-alias-state-error-primary, #b91c1c)",Bl='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.4782 4.84067L14.2138 10.1152C14.1102 12.1872 14.067 13.0115 13.3866 13.9607C13.1044 14.3546 12.7498 14.6912 12.3424 14.9535C11.8239 15.2872 11.2415 15.4316 10.5585 15.4998C9.88727 15.5668 9.04946 15.5656 7.99998 15.5656C6.95051 15.5656 6.1127 15.5668 5.44142 15.4998C4.75851 15.4316 4.17602 15.2872 3.65753 14.9535C3.25012 14.6912 2.89559 14.3546 2.61332 13.9607C1.93296 13.0115 1.88979 12.1872 1.78619 10.1152L1.52179 4.84067L2.89006 4.77277L3.15343 10.0463C3.26221 12.2218 3.32452 12.6015 3.72646 13.1624C3.90825 13.4161 4.13686 13.6334 4.39927 13.8023C4.66204 13.9714 5.00263 14.0792 5.57825 14.1367C6.16562 14.1953 6.92298 14.1963 7.99998 14.1963C9.07699 14.1963 9.83434 14.1953 10.4217 14.1367C10.9973 14.0792 11.3379 14.1367 11.6007 13.8023C11.8631 13.6334 12.0917 13.4161 12.2735 13.1624C12.6755 12.6015 12.7378 12.2218 12.8465 10.0463L13.1099 4.77277L14.4782 4.84067ZM5.43011 6.22849H6.7994V11.3909H5.43011V6.22849ZM9.20056 6.22849H10.5699V11.3909H9.20056V6.22849ZM8.53597 0.434431C9.17976 0.434431 9.6522 0.426926 10.0966 0.571258C10.2357 0.616451 10.3717 0.672554 10.502 0.738948C10.9182 0.951107 11.2464 1.29099 11.7015 1.74612L12.4978 2.54136H15.3742V3.91169H0.625732V2.54136H3.50218L4.29845 1.74612C4.75358 1.29099 5.08174 0.951107 5.49801 0.738948C5.62831 0.672554 5.76425 0.616451 5.90334 0.571258C6.34776 0.426926 6.82021 0.434431 7.46399 0.434431H8.53597ZM7.46399 1.80476C6.73208 1.80476 6.51641 1.81187 6.32617 1.87369C6.25545 1.89667 6.18668 1.92533 6.12041 1.95907C5.96398 2.03878 5.82348 2.16253 5.44142 2.54136H10.5585C10.1765 2.16253 10.036 2.03878 9.87955 1.95907C9.81329 1.92533 9.74452 1.89667 9.6738 1.87369C9.48356 1.81187 9.26789 1.80476 8.53597 1.80476H7.46399Z" fill="currentColor" /></svg>';function Ge(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Zo(e){D(e,"dsh-web-mobile: session-menu delete",()=>{let t=e.locale.bind(ie),a=(h,k)=>e.locale.bind(Hl)(h,k),n=null,o=0,r=null,i=null,d=0,f=h=>{let k=h.getAttribute("data-row-key")??"";if(k.startsWith("session:")){let A=k.slice(8);if(A!=="")return A}let _=h.getAttribute("data-dsha-session-select");return _!==null&&_!==""?_:Gt(jt(h),S)},g=h=>(h.querySelector('[class*="_itemLabel"]')??h).textContent?.trim()??"",l=h=>{let k=[...h.querySelectorAll('[role="menuitem"]')].map(g),_=a("rename"),A=a("menu.fork");return k.includes(_)&&k.includes(A)&&k.includes(a("menu.archiveSession"))},s=()=>{i!==null&&(document.removeEventListener("keydown",i,!0),i=null),r!==null&&(r.backdrop.remove(),r.card.remove(),r=null)},m=(h,k)=>{s();let _=document.body,A=document.createElement("div");A.dataset.mobileNav="delete-dialog-backdrop";let L=document.createElement("div");L.dataset.mobileNav="delete-dialog",L.setAttribute("role","dialog"),L.setAttribute("aria-modal","true"),L.innerHTML=`
        <div data-mobile-nav="delete-confirm-title">${Ge(t("deleteConfirmTitle"))}</div>
        <div data-mobile-nav="delete-confirm-desc">${Ge(t("deleteConfirmDesc",{title:k}))}</div>
        <div data-mobile-nav="delete-confirm-actions">
          <button type="button" data-mobile-nav="delete-confirm-no">${Ge(t("deleteConfirmNo"))}</button>
          <button type="button" data-mobile-nav="delete-confirm-yes">${Ge(t("deleteConfirmYes"))}</button>
        </div>
        <div data-mobile-nav="delete-error" role="alert" hidden></div>`;let M=L.querySelector('[data-mobile-nav="delete-confirm-no"]'),F=L.querySelector('[data-mobile-nav="delete-confirm-yes"]'),V=L.querySelector('[data-mobile-nav="delete-error"]');M?.addEventListener("click",s),A.addEventListener("click",O=>{O.target===A&&s()});let X=O=>{O.key==="Escape"&&s()};document.addEventListener("keydown",X,!0),i=X;let Y=()=>{F!==null&&(F.disabled=!1,F.textContent=t("deleteConfirmYes")),M!==null&&(M.disabled=!1)},Q=O=>{V!==null&&(V.textContent=O,V.hidden=!1),Y()},ne=(O,B)=>{let q=O?.error?.code;if(q==="session-not-found")return t("deleteErrorNotFound");if(q==="session-busy")return t("deleteErrorBusy");let ee=O?.error?.message??(B instanceof Error?B.message:String(B));return t("deleteErrorGeneric",{message:ee})};F?.addEventListener("click",async()=>{F.disabled=!0,M!==null&&(M.disabled=!0),F.textContent=t("deletePending"),V!==null&&(V.hidden=!0);let O=++d;try{let he=await fetch("/api/mobile-nav.session.delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionId:h})}),de=await he.json().catch(()=>null);if(!he.ok||de===null||de.ok!==!0){Q(ne(de,new Error(`HTTP ${he.status}`)));return}}catch(he){let de=!1;try{de=await ao({listed:()=>e.sessions.list.getSnapshot()?.byId?.[h]!==void 0,refresh:async()=>{await e.sessions.refresh?.()},sleep:Oe=>new Promise(ve=>{window.setTimeout(()=>{ve()},Oe)})})}catch{de=!1}if(!de){Q(ne(null,he));return}}let B=ue(e.sessions.list.getSnapshot())===h;if(O!==d)return;s(),B&&eo(e.sessions)&&e.sessions.clear();let q=e.sessions;try{await q.refresh?.()}catch(he){console.warn("[dsh-web-mobile] session list refresh after delete failed:",he)}let ee=U();ee===null||ee.hasAttribute("data-sidebar-collapsed")||B&&window.matchMedia(Fe).matches&&Et(e)}),_.appendChild(A),A.appendChild(L),r={backdrop:A,card:L}},x=h=>{s();let k=document.body,_=document.createElement("div");_.dataset.mobileNav="delete-dialog-backdrop";let A=document.createElement("div");A.dataset.mobileNav="delete-dialog",A.setAttribute("role","dialog"),A.setAttribute("aria-modal","true"),A.innerHTML=`
        <div data-mobile-nav="delete-confirm-title">${Ge(t("deleteSession"))}</div>
        <div data-mobile-nav="delete-error" role="alert">${Ge(h)}</div>
        <div data-mobile-nav="delete-confirm-actions">
          <button type="button" data-mobile-nav="delete-confirm-no">${Ge(t("deleteConfirmNo"))}</button>
        </div>`,A.querySelector('[data-mobile-nav="delete-confirm-no"]')?.addEventListener("click",s),_.addEventListener("click",M=>{M.target===_&&s()});let L=M=>{M.key==="Escape"&&s()};document.addEventListener("keydown",L,!0),i=L,k.appendChild(_),_.appendChild(A),r={backdrop:_,card:A}},w=new Set,E=h=>{if(h.querySelector(`[${Fl}]`)!==null)return;let k=h.querySelector('[role="menuitem"]'),_=k?.parentElement??null,A=h.querySelector('[class*="_viewport"]');if(k===null||_===null||A===null)return;let L=_.cloneNode(!0),M=L.querySelector('[role="menuitem"]');if(M===null)return;let F=M.querySelector('[class*="_itemIcon"]');F!==null&&(F.innerHTML=Bl,F.style.color=Qa);let V=M.querySelector('[class*="_itemLabel"]');V!==null?(V.textContent=t("deleteSession"),V.style.color=Qa):M.firstElementChild===null&&(M.textContent=t("deleteSession"),M.style.color=Qa),M.setAttribute("data-mobile-nav","session-delete"),M.addEventListener("click",X=>{X.preventDefault(),X.stopPropagation();let Y=n;Y?.button.click();try{if(Y===null){x(t("deleteErrorResolve"));return}let Q=Y.sessionId;if(Q===null){x(t("deleteErrorResolve"));return}m(Q,Y.title)}catch(Q){console.error("[dsh-web-mobile] session delete failed:",Q),x(t("deleteErrorGeneric",{message:Q instanceof Error?Q.message:String(Q)}))}}),A.appendChild(L),w.add(L)},y=()=>{for(let k of w)k.isConnected||w.delete(k);let h=a("session.new");for(let k of document.querySelectorAll('[role="menu"]'))l(k)&&(n!==null&&n.title===h||E(k))},v=()=>{o===0&&(o=requestAnimationFrame(()=>{o=0,y()}))},S=h=>e.sessions.list.getSnapshot().byId[h]!==void 0,T=h=>{let k=[...h.querySelectorAll("button")],_=k.find(L=>{let M=L.getAttribute("aria-label")??"";return/session actions/i.test(M)});return _!==void 0?_:k.find(L=>{let M=L.getAttribute("aria-label")??"";return!/archive session|pin session/i.test(M)})??null},u=h=>{if(!(h instanceof Element))return;let k=h.closest('[class*="_sessionRow"]');if(k===null)return;let _=T(k);if(_===null)return;let A=k.querySelector('[class*="_title"]')?.textContent?.trim()??"",L=f(k);n={button:_,title:A,sessionId:L},v()},b=h=>u(h.target),p=h=>u(h.target);document.addEventListener("click",b,!0),document.addEventListener("contextmenu",p,!0);let c=h=>{if(n===null)return!1;for(let k of h.removedNodes)if(k instanceof Element&&(k.matches('[role="menu"]')||k.querySelector('[role="menu"]')!==null))return!0;return!1},C=new MutationObserver(h=>{let k=h.length===0;for(let A of h)if((A.target instanceof Element?A.target:A.target.parentElement)?.closest("[data-chat-flow]")==null){k=!0;break}if(!k)return;let _=!1;for(let A of h){if(A.type!=="childList")continue;let L=A.target;if(L===document.body){v();break}if(_||(_=c(A)),L instanceof HTMLElement&&(L.matches('[role="menu"]')||L.closest('[role="menu"]')!==null)){v();break}}_&&n!==null&&![...document.querySelectorAll('[role="menu"]')].some(l)&&(n=null)});return C.observe(document.body,{childList:!0,subtree:!0}),y(),()=>{document.removeEventListener("click",b,!0),document.removeEventListener("contextmenu",p,!0),C.disconnect(),o!==0&&cancelAnimationFrame(o),s();for(let h of w)h.remove();w.clear(),n=null}},zt)}var zl="[data-composer-card]",Ja="[data-composer-input]",Dl='button, [role="button"], [role="option"], [role="menuitem"], [role="combobox"], [aria-haspopup], select, a[href], label, input',Re="data-mobile-nav-focus-shadow";function Yo(e){D(e,"dsh-web-mobile: composer keyboard guard",()=>{let t=Dt(navigator,typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports.bind(CSS):null),a=typeof matchMedia=="function"&&matchMedia("(pointer: coarse)").matches;if(!t&&!a)return;let n=0,o=()=>{window.clearTimeout(n),n=0;let d=document.querySelector(`[${Re}]`);if(d===null)return;d.removeAttribute(Re);let f=d;Object.prototype.hasOwnProperty.call(d,"focus")&&delete f.focus},r=d=>{let f=d.target;if(!(f instanceof Element)||typeof f.closest!="function")return;let g=f.closest(zl);if(g===null)return;let l=g.querySelector(Ja);if(l===null)return;if(f.closest(Ja)!==null){o();return}let s=f.closest(Dl);if(s===null||!g.contains(s)){o();return}o(),l.setAttribute(Re,""),Object.defineProperty(l,"focus",{configurable:!0,writable:!0,value:function(){}}),window.clearTimeout(n),n=window.setTimeout(o,700)},i=d=>{if(n===0)return;let f=d.target;f instanceof HTMLElement&&f.closest(Ja)!==null&&f.blur()};return document.addEventListener("pointerdown",r,!0),document.addEventListener("touchstart",r,!0),document.addEventListener("mousedown",r,!0),document.addEventListener("focusin",i,!0),()=>{document.removeEventListener("pointerdown",r,!0),document.removeEventListener("touchstart",r,!0),document.removeEventListener("mousedown",r,!0),document.removeEventListener("focusin",i,!0),o()}})}function Qo(e){let{visibleHeight:t,headerBottom:a,seatHeight:n,seatBottom:o,scrollY:r,offsetTop:i}=e;for(let s of[t,a,n,o,r,i])if(!Number.isFinite(s))return 0;if(Math.abs(r-i)>24)return 0;let d=Math.max(0,t),f=Math.max(0,d-Math.max(0,n)),g=Math.max(0,a-f),l=Math.max(0,o-d);return g+l}function Jo(e,t){return Number.isFinite(t)?e?t>0:t>=1:!1}var St="data-mobile-nav-composer-tight",ql='[class*="_composerSeat"]',Vl='header:has([class*="_headerLeading"])';function er(e){D(e,"dsh-web-mobile: composer clearance",()=>{let t=!1,a=0,n=0,o=()=>{t=!1,a=0,U()?.removeAttribute(St)},r=()=>{n=0;let d=U();if(d===null){o();return}let f=d.querySelector(ql),g=d.querySelector(Vl),l=f?.getBoundingClientRect()??null;if(f===null||g===null||l===null||l.width===0||l.height===0){o();return}t||(a=l.height);let s=window.visualViewport,m=Qo({visibleHeight:Math.min(window.innerHeight,s?.height??window.innerHeight),headerBottom:g.getBoundingClientRect().bottom,seatHeight:a>0?a:l.height,seatBottom:l.bottom,scrollY:window.scrollY,offsetTop:s?.offsetTop??0});t=Jo(t,m),t?d.hasAttribute(St)||d.setAttribute(St,""):d.hasAttribute(St)&&d.removeAttribute(St)},i=()=>{n===0&&(n=requestAnimationFrame(r))};return window.addEventListener("resize",i),window.addEventListener("orientationchange",i),window.visualViewport?.addEventListener("resize",i),window.visualViewport?.addEventListener("scroll",i),document.addEventListener("focusin",i,!0),document.addEventListener("focusout",i,!0),i(),()=>{window.removeEventListener("resize",i),window.removeEventListener("orientationchange",i),window.visualViewport?.removeEventListener("resize",i),window.visualViewport?.removeEventListener("scroll",i),document.removeEventListener("focusin",i,!0),document.removeEventListener("focusout",i,!0),n!==0&&(cancelAnimationFrame(n),n=0),o()}})}function tr(e){D(e,"dsh-web-mobile: document scroll lock",()=>{let t=window.scrollBy.bind(window),a=window.scrollTo.bind(window),n=()=>{(window.scrollX!==0||window.scrollY!==0)&&a(0,0)},o=((...d)=>{n()}),r=((...d)=>{n()}),i=()=>{(window.scrollX!==0||window.scrollY!==0)&&a(0,0)};return window.scrollBy=o,window.scrollTo=r,window.addEventListener("scroll",i,{passive:!0}),document.addEventListener("scroll",i,!0),i(),()=>{window.scrollBy=t,window.scrollTo=a,window.removeEventListener("scroll",i),document.removeEventListener("scroll",i,!0)}})}var ar={reservePx:0,bandPx:0};function nr(e){let{visibleHeight:t,headerHeight:a,frameBottom:n,seatBottom:o,framePadding:r}=e;for(let l of[t,a,n,o,r])if(!Number.isFinite(l))return ar;if(t<=0||a<0)return ar;let i=Math.max(0,t-o),d=Math.max(0,o-n),f=i+d+Math.max(0,r),g=Math.max(0,t-a-f);return{reservePx:f,bandPx:g}}function or(e){return!Number.isFinite(e)||e<=0?0:Math.min(e*.6,520)}function rr(e,t,a,n){return!t||!Number.isFinite(a)||a<=0?!1:e||!Number.isFinite(n)||n<=0?!0:a>n}function ir(e){let{fieldTop:t,fieldBottom:a,bodyTop:n,bodyBottom:o,scrollTop:r,scrollHeight:i,clientHeight:d,visibleTop:f,visibleBottom:g}=e;for(let y of[t,a,n,o,r,i,d])if(!Number.isFinite(y))return r;let l=f===void 0||!Number.isFinite(f)?n:Math.max(n,f),s=g===void 0||!Number.isFinite(g)?o:Math.min(o,g);if(s-l<1)return r;let m=Math.max(0,i-d),x=Math.max(0,s-l),w=Math.min(8,x/2),E=r;return t<l+w?E=r-(l+w-t):a>s-w&&(E=r+(a-(s-w))),Math.min(Math.max(E,0),m)}var Ct="data-mobile-nav-question-full",en="--dsha-mobile-question-reserve",Wl="question-expand",Ul='[class*="_frame"][style*="--dsh-composer-side-clearance"], [class*="_frame"]',Gl='[class*="_headerActions"]',sr='[class*="_body"]',jl='[class*="_fieldInput"]',Kl='[data-question-key] [class*="_card"]',Xl='[class*="_footer"]',lr='[class*="_composerSeat"]',$l="--dsha-mobile-visible-vh",Zl="--mobile-nav-header-h",Yl=['<svg class="dsh-web-mobile-question-expand" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>",'<svg class="dsh-web-mobile-question-collapse" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M2 6h4V2M14 6h-4V2M2 10h4v4M14 10h-4v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>"].join(""),dr=e=>{let t=document.documentElement.style.getPropertyValue(e).trim(),a=Number.parseFloat(t);return Number.isFinite(a)?a:Number.NaN};function cr(e){let t=e.locale.bind(ie);D(e,"dsh-web-mobile: question fullscreen",()=>{let a=!1,n=!1,o=null,r=null,i="",d=0,f=null,g=null,l=p=>(f!==null&&f.isConnected&&p.contains(f)||(f=p.querySelector(lr)),f),s=()=>{let p=U();if(p===null)return null;let C=l(p)??p;return g!==null&&g.isConnected&&C.contains(g)||(g=C.querySelector(Ul)),g},m=()=>t(n?"questionCollapse":"questionExpand"),x=()=>{if(o===null)return;let p=m();o.getAttribute("aria-label")!==p&&(o.setAttribute("aria-label",p),o.title=p);let c=n?"true":"false";o.getAttribute("aria-expanded")!==c&&o.setAttribute("aria-expanded",c)},w=()=>{a=!1,n=!1,d!==0&&(cancelAnimationFrame(d),d=0);let p=U();p!==null&&p.hasAttribute(Ct)&&p.removeAttribute(Ct),r?.style.removeProperty(en),r=null,i="",x()},E=()=>{let p=document.activeElement;if(!(p instanceof HTMLElement)||!p.matches(jl))return;let c=p.closest(Kl),C=p.closest(sr),h=c!==null&&c.scrollHeight>c.clientHeight+1?c:C;if(h===null)return;let k=h===c?c.querySelector(":scope > "+Xl):null,A=p.getBoundingClientRect(),L=h.getBoundingClientRect(),M=k?.getBoundingClientRect().top??Number.NaN,F={top:L.top,bottom:Number.isFinite(M)?Math.min(L.bottom,M):L.bottom},V=window.visualViewport,X=V?.offsetTop??Number.NaN,Y=V==null?Number.NaN:V.offsetTop+V.height,Q=ir({fieldTop:A.top,fieldBottom:A.bottom,bodyTop:F.top,bodyBottom:F.bottom,scrollTop:h.scrollTop,scrollHeight:h.scrollHeight,clientHeight:h.clientHeight,visibleTop:X,visibleBottom:Y});Math.abs(Q-h.scrollTop)>=1&&(h.scrollTop=Q)},y=()=>{d=0;let p=U(),c=s();if(p===null||c===null){w();return}let C=p.querySelector(lr),h=c.getBoundingClientRect(),k=C?.getBoundingClientRect()??null,_=getComputedStyle(c),A=dr($l),L=nr({visibleHeight:A,headerHeight:dr(Zl),frameBottom:h.bottom,seatBottom:k===null?Number.NaN:k.bottom,framePadding:Number.parseFloat(_.paddingTop)+Number.parseFloat(_.paddingBottom)}),M=rr(n,a,L.bandPx,or(A)),F=`${Math.round(L.reservePx)}px`;r!==c&&(r?.style.removeProperty(en),r=c,i=""),i!==F&&(i=F,c.style.setProperty(en,F)),M!==p.hasAttribute(Ct)&&(M?p.setAttribute(Ct,""):p.removeAttribute(Ct)),n=M,x(),n||(a=!1)},v=()=>{d===0&&(d=requestAnimationFrame(()=>{d=0,E(),a&&y()}))},S=()=>{a=!n,d!==0&&(cancelAnimationFrame(d),d=0),y(),n||(a=!1)},T=p=>{let c=p.querySelector(Gl);if(c!==null){if(o===null){let C=document.createElement("button");C.type="button",C.dataset.mobileNav=Wl,C.innerHTML=Yl,C.addEventListener("click",S),o=C}o.parentElement!==c&&c.insertBefore(o,c.lastElementChild),x()}},b=me({name:"question-fullscreen",scopes:["*"],ensure:()=>{let p=s();if(p===null){w();return}if(p.querySelector(sr)===null){o?.remove(),w();return}T(p),a&&v()},dispose:()=>{w(),o!==null&&(o.removeEventListener("click",S),o.remove(),o=null)}});return window.addEventListener("resize",v),window.addEventListener("orientationchange",v),window.visualViewport?.addEventListener("resize",v),document.addEventListener("focusin",v,!0),document.addEventListener("focusout",v,!0),document.addEventListener(Tt,v),v(),()=>{window.removeEventListener("resize",v),window.removeEventListener("orientationchange",v),window.visualViewport?.removeEventListener("resize",v),document.removeEventListener("focusin",v,!0),document.removeEventListener("focusout",v,!0),document.removeEventListener(Tt,v),b()}})}var tn='[class*="_add"]',Ql="[data-trigger-menu]",hr="[data-composer-input]",Jl=e=>{let t=e.getBoundingClientRect();return t.width>0&&t.height>0&&e.getClientRects().length>0},an=()=>{for(let e of document.querySelectorAll(Ql))if(Jl(e))return e;return null},ur=()=>{let e=document.querySelector(hr);return e instanceof HTMLElement?e:null},pr=()=>{let e=ur();e!==null&&document.activeElement===e&&e.blur()},ed=()=>{let e=ur();e!==null&&e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",keyCode:27,which:27,bubbles:!0,cancelable:!0}))};function mr(e){D(e,"dsh-web-mobile: composer plus toggle",()=>{let t=!1,a=[],n=()=>{for(let f of a)window.clearTimeout(f);a=[]},o=f=>{let g=f.target;t=g instanceof Element&&g.closest(tn)!==null&&an()!==null},r=f=>{let g=f.target;g instanceof Element&&g.closest(tn)!==null&&pr()},i=f=>{let g=t;t=!1;let l=f.target;if(!(!(l instanceof Element)||l.closest(tn)===null)){g&&an()!==null&&ed(),n();for(let s of[120,320,640])a.push(window.setTimeout(()=>{an()!==null&&pr()},s))}},d=f=>{let g=f.target;g instanceof Element&&g.closest(hr)!==null&&n()};return document.addEventListener("pointerdown",r,!0),document.addEventListener("pointerdown",d,!0),document.addEventListener("click",o,!0),document.addEventListener("click",i,!1),()=>{n(),document.removeEventListener("pointerdown",r,!0),document.removeEventListener("pointerdown",d,!0),document.removeEventListener("click",o,!0),document.removeEventListener("click",i,!1)}})}var td='[class*="heroWorkspaceRow"] > button[aria-haspopup="menu"]',ad='[role="menu"]';function fr(e){D(e,"dsh-web-mobile: workspace chip toggle",()=>{let t=null,a=r=>r instanceof Element?r.closest(td):null,n=r=>{t=null;let i=a(r.target);i!==null&&i.getAttribute("aria-expanded")==="true"&&document.querySelector(ad)!==null&&(t=i)},o=r=>{let i=t;t=null,!(i===null||a(r.target)!==i)&&r.stopPropagation()};return document.addEventListener("pointerdown",n,!0),document.addEventListener("click",o,!0),()=>{t=null,document.removeEventListener("pointerdown",n,!0),document.removeEventListener("click",o,!0)}})}var nd="[data-team-action]",od='[data-team-action] > button[aria-haspopup="dialog"]',rd="[data-team-panel]";function br(e){D(e,"dsh-web-mobile: team chip toggle",()=>{let t=null,a=r=>r instanceof Element?r.closest(od):null,n=r=>{t=null;let i=a(r.target);i!==null&&i.getAttribute("aria-expanded")==="true"&&document.querySelector(nd)!==null&&document.querySelector(rd)!==null&&(t=i)},o=r=>{let i=t;t=null,!(i===null||a(r.target)!==i)&&(document.body.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0})),r.stopPropagation())};return document.addEventListener("pointerdown",n,!0),document.addEventListener("click",o,!0),()=>{t=null,document.removeEventListener("pointerdown",n,!0),document.removeEventListener("click",o,!0)}},zt)}var gr='[class*="_7KE1Ra_trigger"]',wr='[class*="_7KE1Ra_menu"]',id="[data-composer-card]",Jt=8,vr=[0,60,200];function xr(e){D(e,"dsh-web-mobile: model menu anchor",()=>{let t=0,a=null,n=null,o=[],r=null,i=null,d=null,f=null,g=()=>{let c=f;f=null,c!==null&&c.el.style.left===c.value&&(c.el.style.left=c.original)},l=c=>{if(c===null)return null;let C=n?.get(c);if(C!==void 0)return C;let h=c.getBoundingClientRect(),k=h.width>0&&h.height>0?h:null;return n?.set(c,k),k},s=()=>{for(let c of document.querySelectorAll(wr))if(l(c)!==null)return c;return null},m=c=>{let C=l(c);if(C===null)return;let h=C.width,k=document.documentElement.clientWidth,_=Math.max(Jt,k-h-Jt),A=l(i),L=l(d),M=A===null?null:A.right-h,F;if(M!==null&&M>=Jt&&M<=_)F=M;else if(L!==null)F=L.left+(L.width-h)/2;else return;let V=`${Math.round(Math.min(Math.max(F,Jt),_))}px`;f!==null&&f.el!==c&&g(),f===null?f={el:c,value:V,original:c.style.left}:f.value=V,c.style.left!==V&&(c.style.left=V)},x=()=>{r=s(),i=r===null?null:document.querySelector(gr),d=r===null?null:document.querySelector(id),r!==null&&m(r)},w=()=>{if(r!==null){if(l(r)===null){g(),r=null,i=null,d=null;return}m(r)}},E=c=>{a=c,t===0&&(t=window.requestAnimationFrame(()=>{t=0;let C=a;a=null,n=new Map;try{C!==null&&C()}finally{n=null}}))},y=()=>{E(x);for(let c of vr)o.push(window.setTimeout(()=>E(x),c));for(;o.length>vr.length*2;){let c=o.shift();c!==void 0&&window.clearTimeout(c)}},v=c=>{let C=c.target;return C instanceof Element?C.closest(gr)!==null||C.closest(wr)!==null:!1},S=c=>{v(c)&&y()},T=c=>{v(c)&&y()},u=c=>{v(c)&&y()},b=c=>{v(c)&&y()},p=()=>{E(w)};return document.addEventListener("pointerdown",S,!0),document.addEventListener("keydown",T,!0),document.addEventListener("focusin",u,!0),document.addEventListener("click",b,!0),window.addEventListener("resize",p),document.addEventListener("scroll",p,!0),()=>{document.removeEventListener("pointerdown",S,!0),document.removeEventListener("keydown",T,!0),document.removeEventListener("focusin",u,!0),document.removeEventListener("click",b,!0),window.removeEventListener("resize",p),document.removeEventListener("scroll",p,!0),t!==0&&window.cancelAnimationFrame(t),a=null,n=null;for(let c of o)window.clearTimeout(c);o.length=0,g(),r=null,i=null,d=null}})}var ea=new Set,ta=null;function aa(e){if(ta===null){let a=HTMLInputElement.prototype,n=Object.getOwnPropertyDescriptor(a,"focus"),o=a.focus;if(typeof o!="function"||n?.configurable===!1||!n&&!Object.isExtensible(a))return()=>{};let r=function(d){for(let f of ea)if(f.shouldSkip(this))return;o.call(this,d)};try{Object.defineProperty(a,"focus",{configurable:!0,writable:!0,enumerable:n?.enumerable??!1,value:r})}catch{return()=>{}}ta=()=>{if(Object.getOwnPropertyDescriptor(a,"focus")?.value===r)try{n?Object.defineProperty(a,"focus",n):delete a.focus}catch{}}}let t={shouldSkip:e};return ea.add(t),()=>{if(ea.delete(t)&&ea.size===0){let a=ta;ta=null,a?.()}}}var yr='[data-shortcut-modal="shortcuts"] [data-modal-autofocus]';function kr(e){D(e,"dsh-web-mobile: shortcut modal keyboard guard",()=>{let t=new WeakSet(document.querySelectorAll(yr)),a=new WeakSet,n=aa(o=>{if(o.matches(yr)){if(!t.has(o)&&o.hasAttribute("data-dsh-automatic-focus")){if(!a.has(o)){a.add(o),Promise.resolve().then(()=>t.add(o));let r=o.closest('[role="dialog"][aria-modal="true"]');r!==null&&!r.contains(document.activeElement)&&r.focus({preventScroll:!0})}return!0}t.add(o)}return!1});return()=>n()})}var sd='[data-menu-material], [class*="_7KE1Ra_menu"]',ld='[data-menu-material] input[role="searchbox"], input[role="searchbox"][aria-controls$="-models"]',dd=2e3;function _r(e){D(e,"dsh-web-mobile: model menu keyboard guard",()=>{let t=null,a=0,n=()=>{t===null&&(t=aa(i=>i.matches(ld)))},o=()=>{t?.(),t=null},r=()=>{n(),window.clearTimeout(a),a=window.setTimeout(()=>{document.querySelector(sd)===null&&o()},dd)};return document.addEventListener("pointerdown",r,!0),()=>{document.removeEventListener("pointerdown",r,!0),window.clearTimeout(a),o()}})}function Er(e){return e.insideOpen||e.onInteractive?"ignore":"open"}var cd="li[data-plugin-package], li[data-plugin-row], li[data-plugin-item]",pd='button[class*="_cardOpen"], button[class*="_rowOpen"]',hd='button, a, input, select, textarea, [role="switch"], [role="button"], [role="tab"], [contenteditable="true"]';function Tr(e){D(e,"dsh-web-mobile: plugin card tap",()=>{let t=a=>{let n=a.target;if(!(n instanceof Element))return;let o=n.closest(cd);if(o===null)return;let r=o.querySelector(pd);!(r instanceof HTMLButtonElement)||Er({insideOpen:r.contains(n),onInteractive:n.closest(hd)!==null})==="ignore"||(a.preventDefault(),r.click())};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)})}function Sr(e,t){let a=0,n=!1;return{schedule(o){n||(n=!0,a=e(()=>{n=!1,o()}))},cancel(){n&&(t(a),n=!1)}}}function Cr(e){e.effect(()=>{let t=window.matchMedia(Fe),a='[class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"])',n={"white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis","max-width":"100%"},o=[{pick:v=>v,props:{"flex-wrap":"wrap","align-items":"center",gap:"4px 10px"}},{pick:v=>v.children[0]??null,props:{flex:"1 1 100%","max-width":"100%","min-width":"0"}},{pick:v=>v.querySelector('[class*="spec"]'),props:n},{pick:v=>v.querySelector('[class*="nm"]'),props:n}],r=new WeakMap,i=(v,S)=>{let T=r.get(v);T===void 0&&r.set(v,T=new Map);for(let[u,b]of Object.entries(S)){let p="important",c=v.style.getPropertyValue(u),C=v.style.getPropertyPriority(u);if(c===b&&C===p)continue;let h=T.get(u),k=h!==void 0&&h.value===c&&h.priority===C;T.set(u,k?{...h,value:b,priority:p}:{value:b,priority:p,before:c,beforePriority:C}),v.style.setProperty(u,b,p)}},d=v=>{let S=r.get(v);if(S!==void 0){for(let[T,u]of S)S.delete(T),!(v.style.getPropertyValue(T)!==u.value||v.style.getPropertyPriority(T)!==u.priority)&&(u.before===""?v.style.removeProperty(T):v.style.setProperty(T,u.before,u.beforePriority));S.size===0&&r.delete(v)}},f=()=>{document.querySelectorAll(a).forEach(v=>{for(let S of o){let T=S.pick(v);T&&d(T)}})},g=null,l='[data-dsh-market-root], [role="dialog"]',s="[data-dsh-market-root]",m=()=>{let v=g;if(v!==null&&v.isConnected)return v;let S=document.querySelector(l);return S===null?(g=null,null):(g=S.matches(s)?S:document.querySelector(s)??S,g)},x=()=>{let v=m();if(v===null)return;let S=v.querySelectorAll(a);S.length===0&&!v.matches(s)&&(S=document.querySelectorAll(a)),S.forEach(T=>{for(let u of o){let b=u.pick(T);b&&i(b,u.props)}})},w=()=>{f(),t.matches&&x()};w();let E=Sr(v=>window.requestAnimationFrame(v),v=>window.cancelAnimationFrame(v)),y=new MutationObserver((v=[])=>{let S=v.length===0;for(let T of v)if((T.target instanceof Element?T.target:T.target.parentElement)?.closest("[data-chat-flow]")==null){S=!0;break}S&&t.matches&&E.schedule(()=>{t.matches&&x()})});return y.observe(document.documentElement,{childList:!0,subtree:!0}),t.addEventListener("change",w),()=>{E.cancel(),y.disconnect(),t.removeEventListener("change",w),f(),g=null}},"dsh-web-mobile: installed-list-inline-styles")}function Ar(e){D(e,"tablet-quick-settings",()=>{let t=Vt(e);t.ensure();let a=!1,n=()=>{a=!1;try{t.ensure()}catch(r){console.error("[dsh-web-mobile] tablet-quick-settings",r)}},o=new MutationObserver(()=>{a||(a=!0,requestAnimationFrame(n))});return o.observe(document.documentElement,{childList:!0,subtree:!0}),()=>{o.disconnect(),t.dispose()}},zn)}var ud=800,na="[data-composer-input]",Lr="data-mobile-panel-exit",Mr="dsh-mobile-panel-exit";function Rr(e){D(e,"dsh-web-mobile: session focus guard",()=>{let t=e.sessions.list,a=ue(t.getSnapshot()),n=0,o=!1,r=()=>{window.clearTimeout(n),n=0,o=!1,f.disconnect();let E=document.querySelector(`[${Re}]`);if(E===null)return;E.removeAttribute(Re);let y=E;Object.prototype.hasOwnProperty.call(E,"focus")&&delete y.focus},i=E=>{E.hasAttribute(Re)||(E.setAttribute(Re,""),Object.defineProperty(E,"focus",{configurable:!0,writable:!0,value:function(){}}))},d=()=>document.querySelector(`[data-mobile-nav="frame"][${Lr}]`)!==null,f=new MutationObserver(()=>{if(!o)return;let E=document.querySelector(na);E!==null&&i(E)}),g=()=>{r(),o=!0;let E=document.querySelector(na);E!==null&&i(E),f.observe(document.documentElement,{childList:!0,subtree:!0}),n=window.setTimeout(r,ud)},l=new MutationObserver(()=>{!o&&d()&&g()}),s=E=>{if(!o)return;let y=E.target;y instanceof Element&&y.closest(na)!==null&&r()},m=E=>{if(!o)return;let y=E.target;y instanceof HTMLElement&&y.closest(na)!==null&&y.blur()},x=t.subscribe(()=>{let E=ue(t.getSnapshot());E!==a&&(a=E,g())}),w=()=>{o||g()};return l.observe(document.documentElement,{attributes:!0,attributeFilter:[Lr]}),document.addEventListener(Mr,w),document.addEventListener("pointerdown",s,!0),document.addEventListener("focusin",m,!0),()=>{x(),l.disconnect(),document.removeEventListener(Mr,w),document.removeEventListener("pointerdown",s,!0),document.removeEventListener("focusin",m,!0),r()}})}var md="[data-composer-input]";function fd(e){if(!e.isTrusted||e.defaultPrevented||e.inputType!=="insertText")return!1;let t=e.data;return typeof t!="string"||t===`
`||t==="\r"?!1:t.includes(`
`)||t.includes("\r")}function bd(e){if(typeof DataTransfer!="function"||typeof ClipboardEvent!="function")return null;try{let t=new DataTransfer;t.setData("text/plain",e);let a=new ClipboardEvent("paste",{clipboardData:t,bubbles:!0,cancelable:!0});return a.clipboardData?.getData("text/plain")!==e?null:a}catch{return null}}function Pr(e){D(e,"dsh-web-mobile: composer paste guard",()=>{let t=a=>{if(!(a instanceof InputEvent)||!fd(a))return;let n=a.target;if(!(n instanceof Element))return;let o=n.closest(md);if(o===null)return;let r=bd(a.data??"");r!==null&&(a.preventDefault(),a.stopPropagation(),o.dispatchEvent(r))};return document.addEventListener("beforeinput",t,!0),()=>{document.removeEventListener("beforeinput",t,!0)}})}var gd='[data-mobile-nav="file-upload"]',wd="[data-composer-card]",vd="input[type=file]",je=null;function xd(e){return e==="image"?"image/*":""}function yd(e){return typeof e?.pickFile=="function"?e.pickFile.bind(e):void 0}function Ir(e){return Array.isArray(e)?e.filter(t=>typeof File<"u"&&t instanceof File):[]}function kd(e,t){return t?"fallback":e==null?"cancelled":Array.isArray(e)?e.length===0?"cancelled":Ir(e).length>0?"files":"fallback":"fallback"}function nn(){let e=document.querySelector(wd);return e===null?null:e.querySelector(vd)}function _d(e,t){if(t===null)return!1;try{let a=new DataTransfer;for(let n of e)a.items.add(n);t.files=a.files}catch{return!1}return t.dispatchEvent(new Event("change",{bubbles:!0})),!0}var Ed='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20"><rect x="2.5" y="3.5" width="15" height="13" rx="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="7.2" cy="8" r="1.4" fill="currentColor"/><path d="M4.2 14.6l3.6-3.4 2.6 2.4 2.3-2.3 3.1 3.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',Td='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20"><path d="M12.6 3.2H6.4A1.9 1.9 0 0 0 4.5 5.1v9.8a1.9 1.9 0 0 0 1.9 1.9h7.2a1.9 1.9 0 0 0 1.9-1.9V6.6l-2.9-3.4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12.4 3.4v3.3h3.1" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';function on(e,t=nn()){if(t===null)return;let a=xd(e),n=t.hasAttribute("accept"),o=t.getAttribute("accept");a!==""&&t.setAttribute("accept",a);try{t.click()}finally{a!==""&&(n?t.setAttribute("accept",o??""):t.removeAttribute("accept"))}}async function Sd(e,t){let a=window.DSHA,n=yd(a);if(n===void 0){on("file");return}let o=nn(),r=t?.()??null,i=null,d=!1;try{i=await n({accept:[],multiple:!0,title:e("fileUploadAttachment")})}catch{d=!0}if(o===null||nn()!==o||r!==null&&(t?.()??null)!==r)return;let f=kd(i,d);f!=="cancelled"&&(f==="files"&&_d(Ir(i),o)||on("file",o))}var Or=8,At=8;function Cd(e,t,a){let n=e.top-Or-t.height;n<a.top+At&&(n=Math.min(e.bottom+Or,a.bottom-t.height-At));let o=Math.max(a.left+At,Math.min(e.left,a.right-t.width-At));return{top:Math.round(Math.max(a.top+At,n)),left:Math.round(o)}}function Ad(){let e=window.visualViewport;return e!=null?{top:e.offsetTop,bottom:e.offsetTop+e.height,left:e.offsetLeft,right:e.offsetLeft+e.width}:{top:0,bottom:window.innerHeight,left:0,right:window.innerWidth}}function Ld(e,t,a){je?.(),je=null;let n=document.createElement("div");n.dataset.mobileNav="file-picker-backdrop";let o=document.createElement("div");o.dataset.mobileNav="file-picker",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label",e("fileUploadAttachment"));let r=[{kind:"image",icon:Ed,label:e("fileUploadImage")},{kind:"file",icon:Td,label:e("fileUploadAttachment")}],i=[],d=()=>{je===d&&(je=null);for(let T of i.splice(0))T();n.remove()};je=d;let f=T=>{T.key==="Escape"&&d()};for(let T of r){let u=document.createElement("button");u.type="button",u.dataset.mobileNav="file-picker-option",u.dataset.kind=T.kind;let b=document.createElement("span");b.dataset.mobileNav="file-picker-icon",b.innerHTML=T.icon;let p=document.createElement("span");p.textContent=T.label,u.append(b,p),u.addEventListener("click",()=>{d(),T.kind==="file"?Sd(e,a):on(T.kind)}),o.append(u)}n.addEventListener("click",T=>{T.target===n&&d()}),document.addEventListener("keydown",f,!0),i.push(()=>document.removeEventListener("keydown",f,!0)),n.append(o),document.body.append(n),o.style.visibility="hidden";let g=!1,l=()=>{g||(g=!0,o.style.visibility="")},s="",m=0,x=window.setTimeout(l,400);i.push(()=>window.clearTimeout(x));let w=()=>{if(!t.isConnected){d();return}let T=t.getBoundingClientRect(),u=o.getBoundingClientRect(),b=Cd(T,u,Ad()),p=`${b.top}px`,c=`${b.left}px`;o.style.top!==p&&(o.style.top=p),o.style.left!==c&&(o.style.left=c);let C=`${b.top}:${b.left}`;C===s?m+=1:(s=C,m=0),m>=2&&l()};w();let E=!0,y=()=>{E||w()};window.addEventListener("resize",y),window.addEventListener("orientationchange",y),window.visualViewport?.addEventListener("resize",y),window.visualViewport?.addEventListener("scroll",y),i.push(()=>window.removeEventListener("resize",y)),i.push(()=>window.removeEventListener("orientationchange",y)),i.push(()=>window.visualViewport?.removeEventListener("resize",y)),i.push(()=>window.visualViewport?.removeEventListener("scroll",y));let v=0,S=requestAnimationFrame(function T(){if(w(),!o.isConnected){E=!1;return}++v<12?S=requestAnimationFrame(T):(E=!1,l())});i.push(()=>cancelAnimationFrame(S))}function Nr(e){D(e,"dsh-web-mobile: composer file picker",()=>{let t=e.locale.bind(ie),a=()=>ue(e.sessions.list.getSnapshot())??null,n=o=>{let r=o.target;if(!(r instanceof Element))return;let i=r.closest(gd);i===null||i.hasAttribute("disabled")||(o.preventDefault(),o.stopPropagation(),Ld(t,i,a))};return document.addEventListener("click",n,!0),()=>{document.removeEventListener("click",n,!0),je?.(),je=null,document.querySelector('[data-mobile-nav="file-picker-backdrop"]')?.remove()}})}var oa="mobile-nav-attachments";function st(e){return typeof e=="object"&&e!==null}function Hr(e){return st(e)?(Array.isArray(e.attachmentIds)?e.attachmentIds:Array.isArray(e.imageIds)?e.imageIds:[]).filter(a=>typeof a=="string"):[]}function Fr(e,t){if(!Array.isArray(e))return[];let a=[];for(let n of e){if(!st(n)||typeof n.id!="string")continue;let o=n.kind==="image"||n.kind==="file"?n.kind:void 0;if(o===void 0)continue;let r=st(n.file)?n.file:void 0,i=typeof r?.name=="string"?r.name:"",d=typeof r?.size=="number"&&Number.isFinite(r.size)?r.size:void 0,f=st(t)&&st(t[n.id])?t[n.id]:void 0,g=f?.status==="uploading"||f?.status==="ready"||f?.status==="error"?f.status:void 0;a.push({id:n.id,kind:o,name:i,...d===void 0?{}:{bytes:d},...o==="file"&&g!==void 0?{status:g}:{}})}return a}function Md(e){if(e<1024)return`${e} B`;let t=["KB","MB","GB"],a=e/1024,n=0;for(;a>=1024&&n<t.length-1;)a/=1024,n+=1;return`${a>=10?Math.round(a):Math.round(a*10)/10} ${t[n]}`}function Rd(e){let t=new Map;for(let a of e)t.set(a.name,(t.get(a.name)??0)+1);return e.map((a,n)=>({v:1,id:a.id,kind:a.kind,name:a.name,ordinal:n+1,ambiguous:a.name===""||(t.get(a.name)??0)>1}))}function Br(e,t){return e.name===""?t.unnamed(e.ordinal):e.name}function Pd(e,t,a){if(a||t.includes("/"))return!1;let n=t.trim().toLowerCase();return n===""||e.toLowerCase().includes(n)}function zr(e,t,a,n){let o=t.trim().toLowerCase(),r=[];for(let[i,d]of Rd(e).entries()){let f=e[i];if(f===void 0)continue;let g=Br(d,n);if(!Pd(g,t,a))continue;let l=[f.kind==="image"?n.kindImage:n.kindFile];f.bytes!==void 0&&l.push(Md(f.bytes)),f.status==="uploading"?l.push(n.uploading):f.status==="error"&&l.push(n.failed),r.push({rank:o!==""&&g.toLowerCase().startsWith(o)?0:1,index:i,row:{name:g,description:l.join(" · "),icon:"file",section:n.section,value:JSON.stringify(d)}})}return r.sort((i,d)=>i.rank-d.rank||i.index-d.index),r.map(i=>i.row)}function Dr(e){if(typeof e!="string")return;let t;try{t=JSON.parse(e)}catch{return}if(!st(t)||t.v!==1)return;let{id:a,kind:n,name:o,ordinal:r,ambiguous:i}=t;if(!(typeof a!="string"||n!=="file"&&n!=="image"||typeof o!="string")&&!(typeof r!="number"||!Number.isInteger(r)||r<1||typeof i!="boolean"))return{v:1,id:a,kind:n,name:o,ordinal:r,ambiguous:i}}function Od(e,t){return`@${t.mention}:${e.name===""?`#${e.ordinal}`:e.name}`}function rn(e,t){let a=Dr(e);if(a!==void 0)return{source:oa,ref:JSON.stringify(a),label:Br(a,t),appearance:"file",clipboardText:Od(a,t)}}function qr(e){let t=Dr(e);if(t===void 0)throw new Error(`${oa}: unrecognized attachment reference`);let a=t.kind==="image"?"Image":"File",n=t.name===""?a:`${a} ${JSON.stringify(t.name)}`;return t.ambiguous?`[attachment #${t.ordinal}: ${n}]`:`[attachment: ${n}]`}var Vr="pocketMobileNav.attachments",Nd={section:"本次附件","kind.file":"文件","kind.image":"图片","status.uploading":"上传中","status.failed":"上传失败",unnamed:"附件 {n}",mention:"附件"},Hd={section:"Attachments in this message","kind.file":"File","kind.image":"Image","status.uploading":"Uploading","status.failed":"Upload failed",unnamed:"Attachment {n}",mention:"attachment"};function Fd(e,t){let a=e.get("sessions"),n=e.get("conversation"),o=a?.scope?.(t);if(o===void 0||n?.input?.for===void 0)return[];let r=Hr(n.input.for(o)?.state?.getSnapshot());if(r.length===0)return[];let i=typeof n.resolveDraftAttachments=="function"?n.resolveDraftAttachments(r):typeof n.draftImages=="function"?n.draftImages(r):void 0;return Fr(i,n.fileUploads?.getSnapshot())}function sn(e){let t=e.locale.bind(Vr);return{section:t("section"),kindFile:t("kind.file"),kindImage:t("kind.image"),uploading:t("status.uploading"),failed:t("status.failed"),unnamed:a=>t("unnamed",{n:a}),mention:t("mention")}}function Bd(e){return{trigger:"@",name:oa,order:-10,showGroupTitle:!1,candidates(t,a){if(a.signal.aborted)return Promise.resolve([]);try{return Promise.resolve(zr(Fd(e,t.sessionId),a.query,a.drilled===!0,sn(e)))}catch{return Promise.resolve([])}},onPick({candidate:t}){let a=rn(t.value,sn(e));return a===void 0?void 0:{insert:a}},codec:{clipboardText:t=>rn(t,sn(e))?.clipboardText??"",serialize:t=>{try{return Promise.resolve(qr(t))}catch(a){return Promise.reject(a)}}}}}function Wr(e){e.effect(()=>e.locale.register(Vr,{zh:Nd,en:Hd}),"dsh-web-mobile: attachment mention dictionaries"),e.inject(["inputTriggers"],t=>{D(t,"dsh-web-mobile: attachment mention source",()=>{let a=t.get("inputTriggers");if(typeof a?.registerSource=="function")return a.registerSource(Bd(t))})})}var ra="pocketMobileNavFileShare",Ur={share:"分享",shareFile:"分享「{name}」",downloadFile:"下载「{name}」",sharing:"正在准备文件…",downloadedUnsupported:"当前环境不支持直接分享；已开始下载，请在系统保存位置确认",downloadedTooLarge:"文件超过 50 MB；已开始下载，请在系统保存位置确认",downloadedShareFailed:"分享未能完成；已开始下载，请在系统保存位置确认",errorTooLarge:"文件太大（超过 200 MB），无法在手机端分享或下载",errorNotFound:"文件不存在或已被移动",errorGeneric:"分享失败：{message}"},Gr={share:"Share",shareFile:'Share "{name}"',downloadFile:'Download "{name}"',sharing:"Preparing file…",downloadedUnsupported:"Direct sharing is unavailable here; a download has started — confirm it at the location your system shows",downloadedTooLarge:"The file is over 50 MB; a download has started — confirm it at the location your system shows",downloadedShareFailed:"Sharing did not finish; a download has started — confirm it at the location your system shows",errorTooLarge:"The file is too large (over 200 MB) to share or download on mobile",errorNotFound:"The file no longer exists or was moved",errorGeneric:"Share failed: {message}"};var re=require("react"),Vd=Ca(require("@deepseek-ai/dsh-client-ui-primitives"),1);var Te=class extends Error{code;constructor(t,a){super(a),this.code=t,this.name="FileShareError"}};function zd(e){let t=e.code??"";return t==="workspace-file/too-large"?new Te("too-large",e.message??t):t==="workspace-file/not-found"||t==="workspace-file/not-regular-file"?new Te("not-found",e.message??t):new Te("read-failed",e.message??(t||"read failed"))}async function jr(e,t,a,n=1048576,o=209715200){let r=[],i=0;for(;;){a.throwIfAborted();let d=await e(t,{offset:i,length:n},a);if(a.throwIfAborted(),!d.ok)throw zd(d.error);let{data:f,eof:g,bytes:l}=d.value;if(l!==void 0&&l>o)throw new Te("too-large",`${t}: ${l} bytes exceed the ${o} byte share cap`);if(r.push(new Uint8Array(f)),i+=f.length,i>o)throw new Te("too-large",`${t}: more than ${o} bytes`);if(g||f.length===0)break}return{parts:r,size:i}}function Dd(e){return typeof e=="object"&&e!==null&&e.name==="AbortError"}function ia(e){return e.share!==void 0&&e.canShare!==void 0}async function Kr(e,t){if(e.size>(t.shareMax??52428800))return t.download(e),{kind:"downloaded",reason:"too-large"};let a=t.share;if(a===void 0)return t.download(e),{kind:"downloaded",reason:"unsupported"};let n=!1;try{n=t.canShare?.({files:[e]})===!0}catch{n=!1}if(!n)return t.download(e),{kind:"downloaded",reason:"unsupported"};try{return await a({files:[e],title:e.name}),{kind:"shared"}}catch(o){return Dd(o)?{kind:"cancelled"}:(t.download(e),{kind:"downloaded",reason:"share-failed"})}}var qd={txt:"text/plain",log:"text/plain",md:"text/markdown",markdown:"text/markdown",csv:"text/csv",tsv:"text/tab-separated-values",json:"application/json",xml:"application/xml",yaml:"text/yaml",yml:"text/yaml",html:"text/html",htm:"text/html",css:"text/css",js:"text/javascript",mjs:"text/javascript",ts:"text/plain",tsx:"text/plain",py:"text/plain",sh:"text/plain",svg:"image/svg+xml",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",bmp:"image/bmp",heic:"image/heic",avif:"image/avif",mp3:"audio/mpeg",wav:"audio/wav",m4a:"audio/mp4",ogg:"audio/ogg",mp4:"video/mp4",mov:"video/quicktime",webm:"video/webm",pdf:"application/pdf",zip:"application/zip",gz:"application/gzip",tar:"application/x-tar",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",xls:"application/vnd.ms-excel",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",ppt:"application/vnd.ms-powerpoint",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation"};function sa(e){return e.split(/[/\\]+/).filter(Boolean).at(-1)??e}function Xr(e){let t=e.lastIndexOf(".");return t<=0?"application/octet-stream":qd[e.slice(t+1).toLowerCase()]??"application/octet-stream"}var da=Vd,$r=["IconShareOutlineRegular","IconShareOutline16"].map(e=>da[e]).find(e=>typeof e=="function"),Zr=["IconWarningOutlineRegular","IconWarningOutline16"].map(e=>da[e]).find(e=>typeof e=="function"),ln=typeof da.Toast=="function"?da.Toast:void 0,Yr='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5v8.5M8 1.5 5 4.5M8 1.5l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 7H4a1.5 1.5 0 0 0-1.5 1.5v4A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 12 7h-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',Qr='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5v8.5M8 10 5 7M8 10l3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 12.5H4A1.5 1.5 0 0 0 2.5 14v.5h11V14A1.5 1.5 0 0 0 12 12.5h-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';function Wd(){return React.createElement("span",{"aria-hidden":"true",dangerouslySetInnerHTML:{__html:Qr}})}function Ud(){return $r!==void 0?React.createElement($r,{size:16}):React.createElement("span",{"aria-hidden":"true",dangerouslySetInnerHTML:{__html:Yr}})}function Gd(e){document.querySelector('[data-mobile-nav="file-share-toast"]')?.remove();let t=document.createElement("div");t.dataset.mobileNav="file-share-toast",t.setAttribute("role","status"),t.textContent=e,document.body.appendChild(t),setTimeout(()=>t.remove(),3e3)}function Jr(e,t){return ia(ca())?e("shareFile",{name:t}):e("downloadFile",{name:t})}function jd(e,t){return e.kind!=="downloaded"?null:e.reason==="too-large"?t("downloadedTooLarge"):e.reason==="share-failed"?t("downloadedShareFailed"):t("downloadedUnsupported")}function Kd(e,t){if(e instanceof Te){if(e.code==="too-large")return t("errorTooLarge");if(e.code==="not-found")return t("errorNotFound")}return t("errorGeneric",{message:e instanceof Error?e.message:String(e)})}function Xd(e){let t=URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download=e.name,a.rel="noopener",a.style.display="none",document.body.appendChild(a),a.click(),a.remove(),setTimeout(()=>URL.revokeObjectURL(t),3e4)}function ca(){let e=navigator,t=window.DSHA;return{canShare:typeof t?.canShareFile=="function"?a=>a.files.length===1&&t.canShareFile(a.files[0]):typeof e.canShare=="function"?a=>e.canShare(a):void 0,share:typeof t?.shareFile=="function"?a=>t.shareFile(a.files[0]):typeof e.share=="function"?a=>e.share(a):void 0,download:Xd}}function ei(e,t,a){let[n,o]=(0,re.useState)(null),[r,i]=(0,re.useState)(null),d=(0,re.useRef)(null),f=(0,re.useRef)(0),g=(0,re.useRef)({sessionId:e,readFileRange:t,t:a});g.current={sessionId:e,readFileRange:t,t:a},(0,re.useEffect)(()=>()=>d.current?.abort(),[]);let l=(0,re.useCallback)(x=>{if(ln===void 0){Gd(x);return}f.current+=1,i({seq:f.current,text:x})},[]),s=(0,re.useCallback)(x=>{if(d.current!==null)return;let w=new AbortController;d.current=w,o(x);let{sessionId:E,readFileRange:y,t:v}=g.current;(async()=>{let{parts:T}=await jr((C,h,k)=>y(E,C,h,k),x,w.signal),u=sa(x),b=new File(T,u,{type:Xr(u)}),p=await Kr(b,ca()),c=jd(p,v);c!==null&&l(c)})().catch(T=>{w.signal.aborted||(console.warn("[dsh-web-mobile] file share failed:",T),l(Kd(T,v)))}).finally(()=>{d.current===w&&(d.current=null),w.signal.aborted||o(null)})},[l]),m=r===null||ln===void 0?null:React.createElement(ln,{key:r.seq,text:r.text,...Zr===void 0?{}:{icon:React.createElement($d,null)},onDone:()=>i(null)});return{busyPath:n,share:s,toast:m}}function $d(){let e=Zr;return e===void 0?null:React.createElement(e,null)}function ti({absolutePath:e,sessionId:t,readFileRange:a,t:n}){let{busyPath:o,share:r,toast:i}=ei(t,a,n),d=o!==null;return React.createElement(React.Fragment,null,React.createElement("button",{type:"button","data-mobile-nav":"file-share-preview","aria-label":d?n("sharing"):Jr(n,sa(e)),"aria-busy":d,disabled:d,onClick:()=>r(e)},ia(ca())?React.createElement(Ud,null):React.createElement(Wd,null)),i)}var la="file-share-row";function ai({sessionId:e,readFileRange:t,t:a}){let{busyPath:n,share:o,toast:r}=ei(e,t,a),i=(0,re.useRef)(null),d=(0,re.useRef)({busyPath:n,share:o,t:a});d.current={busyPath:n,share:o,t:a};let f=(0,re.useRef)(null);return(0,re.useEffect)(()=>{let l=(i.current?.closest('[data-files-state="tree"]')??null)?.querySelector("[data-files-body]")??null;if(l===null)return;let s=y=>{y.preventDefault(),y.stopPropagation();let S=y.currentTarget.parentElement?.getAttribute("data-files-path");S&&d.current.share(S)},m=()=>{let{busyPath:y,t:v}=d.current;for(let S of l.querySelectorAll(`[data-mobile-nav="${la}"]`))S.parentElement?.getAttribute("data-files-entry")!=="file"&&S.remove();for(let S of l.querySelectorAll('li[data-files-entry="file"]')){let T=S.querySelector(`:scope > [data-mobile-nav="${la}"]`);T===null&&(T=document.createElement("button"),T.type="button",T.dataset.mobileNav=la,T.innerHTML=ia(ca())?Yr:Qr,T.addEventListener("click",s),S.appendChild(T));let u=S.getAttribute("data-files-path")??"",b=y!==null&&y===u,p=b?v("sharing"):Jr(v,sa(u)),c=y!==null;T.getAttribute("aria-label")!==p&&T.setAttribute("aria-label",p),T.disabled!==c&&(T.disabled=c),b?T.setAttribute("aria-busy","true"):T.removeAttribute("aria-busy")}};f.current=m;let x=0,w=()=>{x===0&&(x=requestAnimationFrame(()=>{x=0,m()}))},E=new MutationObserver(w);return E.observe(l,{childList:!0,subtree:!0}),m(),()=>{E.disconnect(),x!==0&&cancelAnimationFrame(x),f.current=null;for(let y of l.querySelectorAll(`[data-mobile-nav="${la}"]`))y.removeEventListener("click",s),y.remove()}},[]),(0,re.useEffect)(()=>{f.current?.()},[n,a]),React.createElement(React.Fragment,null,React.createElement("span",{hidden:!0,"data-mobile-nav":"file-share-anchor",ref:i}),r)}function ni(e){e.inject(["slots","locale","remote","remote.workspaceFiles"],t=>{t.effect(()=>t.locale.register(ra,{zh:Ur,en:Gr}),"dsh-web-mobile: file-share dictionaries");let a=t.remote,n=()=>({readFileRange:(o,r,i,d)=>a.workspaceFiles.readBytes(o,r,{range:i},d)});D(t,"dsh-web-mobile: file share",()=>{let o=[t.slots.inject("sidebar.right.tab.document.actions",()=>t.slots.register({name:"sidebar.right.tab.document.actions",id:"mobile-nav-file-share",order:100,locale:ra,inject:n},ti)),t.slots.inject("sidebar.right.tab.files.actions",()=>t.slots.register({name:"sidebar.right.tab.files.actions",id:"mobile-nav-file-share-rows",order:100,locale:ra,inject:n},ai))];return()=>{for(let r of o)r()}})})}function oi(e){if(typeof e!="object"||e===null)return null;let t=e.selectPanel;return typeof t!="function"?null:()=>{t.call(e,null)}}var ri='[class*="panelRow"][aria-current="page"]',hn=!1,dn=null,cn=null;function pa(){let e=cn;return e!==null&&e.isConnected&&e.matches(ri)?!0:(cn=document.querySelector(ri),cn!==null)}function pn(){return!hn&&pa()}var ii="data-mobile-panel-exit",Zd="dsh-mobile-panel-exit",Yd=2e3,Qd="panel-ghost",Jd=280,ec='[data-mobile-nav="frame"] [class*="_centerCol"] > * > *',tc='section[data-plugin-panel] button[class*="_moreBack"],section[data-plugin-panel] [data-plugin-detail] button[class*="_crumb"],section[data-plugin-panel] [data-plugin-item-detail] button[class*="_crumb"],section[data-plugin-panel] [data-plugin-row-detail] button[class*="_crumb"]';function si(e){let t=oi(e),a=t!==null,n=!1,o=!1,r=null,i=0,d=null,f=null,g=null,l=Symbol("panel-exit");function s(){let p=U();if(p===null)return[];let c=[];for(let C of p.querySelectorAll('[class*="_centerCol"]')){let h=C.firstElementChild?.firstElementChild;if(h instanceof HTMLElement)for(let k of h.getAnimations())k.playState!=="idle"&&c.push(k)}return c}function m(){if(n){if(r!==null&&(window.clearTimeout(r),r=null),i!==0&&(cancelAnimationFrame(i),i=0),dn===l){let p=U();p!==null&&p.removeAttribute(ii),hn=!1,dn=null}n=!1}}function x(){f!==null&&(window.clearTimeout(f),f=null);let p=d;d=null,p!==null&&(g!==null&&p.removeEventListener("animationend",g,!0),g=null,p.remove())}function w(p){if(o||!n)return;let c=s();if(c.length===0){if(p<2){i=requestAnimationFrame(()=>{i=0,w(p+1)});return}m();return}let C=0;for(let h of c){let k=h.effect?.getTiming(),_=typeof k?.delay=="number"?k.delay:0,A=typeof k?.duration=="number"?k.duration:0,L=typeof k?.iterations=="number"?k.iterations:1;C=Math.max(C,_+A*L),h.finished.then(()=>m(),()=>m())}r=window.setTimeout(m,Math.min(Yd,Math.max(250,C+200)))}function E(){if(!pa())return null;let p=document.querySelector(ec);return p instanceof HTMLElement?p:null}function y(){if(!pa())return null;let p=document.querySelector(tc);return p instanceof HTMLElement?p:null}function v(){return y()!==null}function S(p){x();let c=document.createElement("div");return c.dataset.mobileNav=Qd,c.setAttribute("aria-hidden","true"),c.append(p.cloneNode(!0)),document.body.append(c),c}let T=()=>{if(o||!a||n)return;n=!0,hn=!0,dn=l;let p=U();p!==null&&p.setAttribute(ii,""),document.dispatchEvent(new CustomEvent(Zd));let c=E();d=c===null?null:S(c);try{t()}finally{if(i=requestAnimationFrame(()=>{i=0,w(0)}),d!==null){let C=d;g=h=>{h.animationName==="dsh-web-mobile-panel-ghost-out"&&x()},C.addEventListener("animationend",g,!0),f=window.setTimeout(x,Jd+120)}}},u=()=>{if(o||!a||n)return;let p=y();if(p!==null){p.click();return}T()};function b(){o=!0,m(),x()}return{exit:T,back:u,supported:a,panelOpen:pa,subpageOpen:v,task:ac(T,a,u,y),dispose:b}}function ac(e,t,a,n){let o=!1,r=0,i=null,d=!1,f=!1,g=!1,l=null;function s(){g=!1,l!==null&&(window.clearTimeout(l),l=null)}function m(){g=!0,l!==null&&window.clearTimeout(l),l=window.setTimeout(s,1200);try{history.back()}catch{s()}}function x(){try{return history.pushState({mobilePanelExit:!0},""),!0}catch{return!1}}function w(){!t||o||x()&&(o=!0)}function E(){t&&x()&&(r+=1)}function y(u){return u===null?0:u.className.includes("_moreBack")?1:2}function v(){if(g){s();return}if(r>0)r-=1;else if(o)o=!1;else return;if(pn()&&n()!==null){d=!0,a();return}pn()&&e()}function S(){f||(window.addEventListener("popstate",v),f=!0)}function T(){f&&(window.removeEventListener("popstate",v),f=!1)}return{name:"panel-back-exit",scopes:["*"],ensure:()=>{if(!t)return;if(S(),!pn()){o&&(o=!1,m()),i=null,d=!1;return}w();let u=n(),b=y(i),p=y(u);if(p===b)return;let c=d;if(d=!1,i=u,p>b){c||E();return}!c&&r>0&&(r-=1,m())},dispose:()=>{T(),s(),o&&(o=!1,m())}}}function li(e,t){D(e,"dsh-web-mobile: panel row returns to conversation",()=>{let a=n=>{let o=n.target;if(!(o instanceof Element)||typeof o.closest!="function")return;let r=o.closest('[class*="panelRow"]');r!==null&&r.getAttribute("aria-current")==="page"&&(n.preventDefault(),n.stopPropagation(),t())};return document.addEventListener("click",a,!0),()=>document.removeEventListener("click",a,!0)})}var nc=/[?,]dsh-web-mobile\/client\.js/;function oc(e){if(typeof e!="string"||e==="")return null;try{let t=new URL(e,"http://x").searchParams.get("rev");return t===null||t===""?null:t}catch{return null}}function rc(){for(let e of document.head.querySelectorAll('script[src], link[rel="preload"]')){let t=e.getAttribute("src")??e.getAttribute("href");if(t!==null&&nc.test(t))return oc(t)}return null}function di(e){e.effect(()=>{let t=new URLSearchParams(location.search);if(!t.has("mobile-nav-debug"))return()=>{};let a=[],n=y=>a.push(`ERR ${y.message.slice(0,120)}`),o=y=>a.push(`REJ ${String(y.reason).slice(0,120)}`);window.addEventListener("error",n),window.addEventListener("unhandledrejection",o);let r=document.createElement("div");r.style.cssText=["position:fixed","top:40px","right:6px","z-index:2147483000","background:rgba(0,0,0,.82)","color:#fff","font:11px/1.5 ui-monospace,monospace","padding:8px 10px","border-radius:8px","max-width:94vw","max-height:70vh","overflow:auto","white-space:pre-wrap","pointer-events:none"].join(";");let i=()=>{let y=b=>!!document.querySelector(b),v=b=>{let p=document.querySelector(b);return p===null?"absent":getComputedStyle(p).visibility},S=document.querySelector('[data-mobile-nav="frame"]'),T=()=>{let b=document.querySelector("[data-sidebar-right-panel]");if(b===null)return"absent";let p=b.getBoundingClientRect();return`${b.getAttribute("data-sidebar-right-panel")} pad ${getComputedStyle(b).paddingTop} rect ${Math.round(p.top)},${Math.round(p.left)} ${Math.round(p.width)}x${Math.round(p.height)}`};return[`build rev ${rc()??"?"} (diag chips)`,`URL ${location.pathname}${location.search}`,`W ${innerWidth} x ${innerHeight} dpr ${devicePixelRatio}`,`mq≤1023 ${matchMedia(Fe).matches}  mq≥1024 ${matchMedia(Bn).matches}`,`safeTop framePad ${S===null?"n/a":getComputedStyle(S).paddingTop}  rightPanel ${T()}`,`css ${y('style[data-plugin-css*="mobile"]')}  frame ${!!S}`,`header ${v("[data-phase] header")}  composer ${y("textarea, [data-composer-input]")}`,`genui cards ${document.querySelectorAll("[data-genui]").length}  panel ${y("[data-genui-panel]")}`,`phase ${document.querySelector("[data-phase]")?.getAttribute("data-phase")??"?"}`,`errs ${a.slice(-5).join(" | ")||"none"}`].join(`
`)},d=()=>{r.textContent=i()};d();let f=0,g=()=>{f===0&&(f=requestAnimationFrame(()=>{f=0,d()}))},l=new MutationObserver(y=>{for(let v of y)if(!(v.target===r||r.contains(v.target))){g();return}});l.observe(document.body,{childList:!0,subtree:!0,attributes:!0});let s=setInterval(d,1500);document.body.appendChild(r);let m=y=>{let v=document.querySelector(y);if(v===null)return"absent";let S=v.getBoundingClientRect();return`${Math.round(S.x)},${Math.round(S.y)} ${Math.round(S.width)}x${Math.round(S.height)}`},x=()=>[i(),`rects toggle ${m('[data-mobile-nav="toggle"]')} files ${m('[data-mobile-nav="files"]')} header ${m("[data-phase] header")} titleCluster ${m('[class*="_titleCluster"]')}`,`chips crea ${m('[class*="SVAs4q_"]')} team ${m("[data-team-action]")} model ${m('[class*="_7KE1Ra_trigger"]')} crumbs ${m('[class*="_crumbs"]')} crumbCurrent ${m('[class*="_crumbCurrent"]')}`,`ua ${navigator.userAgent}`,`screen ${screen.width}x${screen.height} standalone ${matchMedia("(display-mode: standalone)").matches}`,`vv ${visualViewport===null?"n/a":`${Math.round(visualViewport.width)}x${Math.round(visualViewport.height)}@${Math.round(visualViewport.offsetTop)}`}`].join(`
`),w=t.get("beacon")||"http://127.0.0.1:3199/diag",E=setInterval(()=>{fetch(w,{method:"POST",mode:"no-cors",body:x()}).catch(()=>{})},2e3);return()=>{window.removeEventListener("error",n),window.removeEventListener("unhandledrejection",o),l.disconnect(),clearInterval(s),clearInterval(E),f!==0&&cancelAnimationFrame(f),r.remove()}},"dsh-web-mobile: debug badge")}var un=1e4,Lt=window,ha=Lt.__dshaMobileScrollState instanceof WeakMap?Lt.__dshaMobileScrollState:Lt.__dshaMobileScrollState=new WeakMap;function ci(){return[...document.querySelectorAll('[data-mobile-nav="frame"] [class*="scrollBody"]')]}function ic(){for(let e of ci())if(e.scrollTop>0){let t={top:e.scrollTop,savedAt:Date.now(),url:location.href};ha.set(e,t),Lt.__dshaMobileLastScroll=t}else ha.delete(e)}function sc(){for(let n of ci()){let o=ha.get(n);ha.delete(n),!(!o||Date.now()-o.savedAt>un||o.url!==location.href)&&requestAnimationFrame(()=>{n.isConnected&&o.url===location.href&&Date.now()-o.savedAt<=un&&n.scrollTop===0&&(n.scrollTop=o.top)})}let e=Lt.__dshaMobileLastScroll;if(e===void 0)return;let t=0,a=()=>{if(t+=1,e.url!==location.href||Date.now()-e.savedAt>un)return;let n=document.querySelector('[class*="scrollBody"]');if(n!==null&&n.scrollTop===0&&n.scrollHeight>=e.top+n.clientHeight){n.scrollTop=e.top;return}t<30&&requestAnimationFrame(a)};requestAnimationFrame(a)}function pi(e){e.effect(()=>e.locale.register(ie,{zh:jn,en:Kn}),"dsh-web-mobile: dictionaries"),e.effect(()=>{for(let n of document.querySelectorAll('style[data-plugin-css="dsh-web-mobile/mobile.css"]'))n.remove();let a=document.createElement("style");return a.dataset.plugin="dsh-web-mobile",a.dataset.pluginCss="dsh-web-mobile/mobile.css",a.textContent=Fn,document.head.appendChild(a),setTimeout(()=>{a.isConnected&&document.head.appendChild(a)},0),sc(),()=>{ic(),a.remove()}},"dsh-web-mobile: styles"),Cr(e),Ar(e);let t=si(e.layout);e.effect(()=>{let a=[Uo(),No(e),Ho(e,t),()=>t.dispose()];return()=>{for(let n of a)n()}},"dsh-web-mobile: reconciler infrastructure"),jo(e),Io(e),li(e,t.exit),Zo(e),Po(e,Ft),$o(e),Yo(e),er(e),tr(e),cr(e),mr(e),fr(e),br(e),xr(e),kr(e),_r(e),Tr(e),Rr(e),Pr(e),Nr(e),Wr(e),Go(e),ni(e),di(e),e.slots.inject("conversation.session.header.actions",()=>e.slots.register({name:"conversation.session.header.actions",id:"mobile-nav-toggle",order:10,locale:ie,inject:()=>({toggleSidebar:()=>e.layout.toggleSidebar()})},Rn)),e.slots.inject("conversation.input.left",()=>e.slots.register({name:"conversation.input.left",id:"mobile-nav-file-upload",order:10,locale:ie,inject:()=>({})},Pn))}var lc=["添加工作区","添加工作区…","Add workspace","Add workspace…"],hi='[role="tab"], [role="treeitem"], [role="menuitem"], [role="menu"]';function ui(e){let t=(e??"").trim();return t.length<3||t.length>320||/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(t)&&!/^file:\/\//i.test(t)?!1:!!(/^(\/|~\/|\.\.?\/|[A-Za-z]:\\)/.test(t)||/\/[\w.\-]+\.\w{1,12}$/.test(t))}async function dc(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.top="-9999px",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let a=document.execCommand("copy");return t.remove(),a}catch{return!1}}function mi(e,t){let a=!1,n=(u,b)=>{let p=t(u);if(b!==void 0)for(let[c,C]of Object.entries(b))p=p.split(`{${c}}`).join(String(C));return p},o=null,r=null,i=u=>{o===null&&(o=document.createElement("div"),o.setAttribute("data-mobile-nav","file-guard-toast"),Object.assign(o.style,{position:"fixed",left:"50%",bottom:"calc(64px + var(--dshp-kb, 0px))",transform:"translateX(-50%)",maxWidth:"84vw",zIndex:"9999",padding:"10px 14px",borderRadius:"10px",background:"rgba(20,22,28,.92)",color:"#fff",fontSize:"13px",lineHeight:"1.4",textAlign:"center",fontFamily:"inherit",boxShadow:"0 4px 16px rgba(0,0,0,.28)",pointerEvents:"none",opacity:"0",transition:"opacity .18s ease"}),document.body.appendChild(o)),o.textContent=u,requestAnimationFrame(()=>{o!==null&&(o.style.opacity="1")}),r!==null&&window.clearTimeout(r),r=window.setTimeout(()=>{o!==null&&(o.style.opacity="0")},2600)},d=null,f=u=>{document.activeElement?.blur(),d?.remove();let p=u.length>65536?`${u.slice(0,65536)}
${t("fileTruncated")}`:u,c=document.createElement("div");c.setAttribute("data-mobile-nav","file-guard-fallback"),Object.assign(c.style,{position:"fixed",left:"max(8px, env(safe-area-inset-left, 0px))",right:"max(8px, env(safe-area-inset-right, 0px))",bottom:"calc(16px + env(safe-area-inset-bottom, 0px) + var(--dshp-kb, 0px))",maxHeight:"45vh",overflow:"auto",zIndex:"10000",padding:"10px 12px",borderRadius:"10px",background:"rgba(20,22,28,.96)",color:"#eee",boxShadow:"0 6px 24px rgba(0,0,0,.4)",WebkitOverflowScrolling:"touch"});let C=document.createElement("div");Object.assign(C.style,{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px",color:"#9aa0a8",marginBottom:"6px"});let h=document.createElement("span");h.textContent=t("fileFallbackTitle");let k=document.createElement("button");k.type="button",k.textContent=t("fileFallbackClose"),Object.assign(k.style,{border:"1px solid #444a52",background:"transparent",color:"#eee",borderRadius:"6px",padding:"2px 10px",fontSize:"12px",cursor:"pointer"}),k.addEventListener("click",()=>{c.remove()});let _=document.createElement("pre");_.textContent=p,Object.assign(_.style,{margin:"0",whiteSpace:"pre-wrap",wordBreak:"break-all",userSelect:"text",WebkitUserSelect:"text",fontSize:"12px",lineHeight:"1.5",fontFamily:"inherit"}),C.append(h,k),c.append(C,_),document.body.appendChild(c),d=c},g=u=>{let b=u.target;if(b===null)return;let p=b.closest("button, a");p!==null&&p.closest("[data-phase]")!==null&&p.closest(hi)===null&&ui(p.textContent)&&(u.preventDefault(),u.stopImmediatePropagation(),i(t("fileGuardMsg")))};document.addEventListener("click",g,!0);let l=0,s=(u=document)=>{let b=u.querySelectorAll("button, a");(u instanceof Element&&u.matches("button, a")?[u,...b]:b).forEach(c=>{if(c.getAttribute("data-mobile-nav-copy")==="1"||c.closest("[data-phase]")===null||c.closest(hi)!==null)return;let C=(c.textContent??"").trim();if(!ui(C))return;c.setAttribute("data-mobile-nav-copy","1");let h=String(++l);c.setAttribute("data-mobile-nav-copy-id",h);let k=c.parentElement;if(k!==null)for(let A of Array.from(k.querySelectorAll(':scope > [data-mobile-nav="copy-file"]')))A.previousElementSibling?.getAttribute("data-mobile-nav-copy-id")!==A.getAttribute("data-mobile-nav-copy-for")&&A.remove();let _=document.createElement("button");_.type="button",_.setAttribute("data-mobile-nav","copy-file"),_.setAttribute("data-mobile-nav-copy-for",h),_.textContent=t("fileCopy"),_.addEventListener("click",async A=>{A.preventDefault(),A.stopPropagation();let L=(c.textContent??"").trim().replace(/^file:\/\//i,"");_.disabled=!0,_.textContent="…";try{let M=await e(L);if(a)return;if(!M?.ok){i(M?.error?.message??t("fileCopyFailed"));return}let F=M.value?.content??"",V=M.value?.size??F.length;if(V>2097152){i(n("fileTooLarge",{size:(V/(1024*1024)).toFixed(1)}));return}let X=await dc(F);if(a)return;if(X){let Y=Math.max(1,Math.round(V/1024));i(n("fileCopyDone",{kb:Y}))}else i(t("fileCopyFailedFallback")),f(F)}catch(M){a||i(M instanceof Error?M.message:t("fileCopyFailed"))}finally{_.isConnected&&(_.disabled=!1,_.textContent=t("fileCopy"))}}),c.parentElement?.insertBefore(_,c.nextSibling)})},m=new Map,x='[role="menuitem"],[role="option"],li,button,a',w=u=>{let b=(u.getAttribute("aria-label")||""||u.textContent||"").trim();if(lc.includes(b)){let p=u;m.has(u)||m.set(u,p.style.display),p.style.display="none",u.setAttribute("data-mobile-nav-hide","add-workspace")}},E=u=>{u instanceof Element&&u.matches(x)&&w(u),u.querySelectorAll(x).forEach(w)},y=new Set,v=0,S=()=>{v=0;for(let u of y)u.isConnected&&(s(u),E(u));y.clear();for(let u of m.keys())u.isConnected||m.delete(u)};s(),E(document);let T=new MutationObserver(u=>{for(let b of u){if(b.type==="characterData"){let p=b.target.parentElement;p!==null&&p.childElementCount>0&&y.add(p);continue}b.addedNodes.forEach(p=>{p.nodeType===1?y.add(p):p.nodeType===3&&p.parentElement!==null&&y.add(p.parentElement)})}y.size>0&&v===0&&(v=requestAnimationFrame(S))});return T.observe(document.body,{childList:!0,subtree:!0,characterData:!0}),()=>{a=!0,document.removeEventListener("click",g,!0),T.disconnect(),v!==0&&cancelAnimationFrame(v),y.clear(),r!==null&&window.clearTimeout(r),o?.remove(),o=null,d?.remove(),d=null,document.querySelectorAll('[data-mobile-nav="copy-file"]').forEach(u=>u.remove()),document.querySelectorAll('[data-mobile-nav-copy="1"]').forEach(u=>u.removeAttribute("data-mobile-nav-copy")),document.querySelectorAll('[data-mobile-nav-hide="add-workspace"]').forEach(u=>{let b=u,p=m.get(u);p!==void 0?b.style.display=p:b.style.removeProperty("display"),m.delete(u),u.removeAttribute("data-mobile-nav-hide")}),m.clear()}}var ua="dsh-pocket.layout";function fi({urlValue:e,stored:t,narrowMatch:a}){let n=String(e??"").trim().toLowerCase();return n==="desktop"?"desktop":n==="mobile"?"mobile":n==="auto"?a?"mobile":"desktop":t==="desktop"||t==="mobile"?t:a?"mobile":"desktop"}function bi(e){try{if(typeof localStorage>"u")return"";if(e==null)return cc();let t=String(e).trim().toLowerCase();try{t==="desktop"||t==="mobile"?localStorage.setItem(ua,t):(t==="auto"||t==="")&&localStorage.removeItem(ua)}catch{}let a=localStorage.getItem(ua);return a==="desktop"||a==="mobile"?a:""}catch{return""}}function cc(){try{if(typeof localStorage>"u")return"";let e=localStorage.getItem(ua);return e==="desktop"||e==="mobile"?e:""}catch{return""}}function gi(e){let{hasGeneration:t,generation:a,state:n}=e??{};if(t===!0){let r=a!=null;return{down:!r,usable:r}}let o=n==="disconnected"||n==="connecting";return{down:o,usable:!o}}function wi(e){let{hasGeneration:t,generation:a,state:n}=e??{};return t===!0&&a!==void 0&&a!==null?"up":n==="connecting"?"connecting":t===!0||n==="disconnected"?"down":"up"}function vi({staleMs:e=2500,hardStuckMs:t=8e3,maxRepairAttempts:a=3}={}){let n=new Map,o=new Map,r=Number.NEGATIVE_INFINITY,i=Number.NEGATIVE_INFINITY,d=0,f=!1,g=(S,T)=>{if(S.down){f=!0;return}f&&(f=!1,d+=1,r=T)},l=S=>{i=S,d+=1,f=!1,o.clear()},s=(S,T)=>n.has(S)?!1:(n.set(S,T),!0),m=S=>{n.delete(S),o.delete(S)},x=(S,T,u={})=>{let b=n.get(S);if(b===void 0)return w;if((o.get(S)??0)>=a)return{waiting:!1,stale:!0,repair:!1,reconnect:!1};let p=u.openState==="loading";if(p&&u.openPromise==="gone")return y(S,{reconnect:!1});let c=u.openState!=="open"&&u.openState!=="cold";if(i>b){let C=T-i;return C<e?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:e-C}:c?y(S,{reconnect:!0}):E}if(d>0&&r>b){let C=T-Math.max(b,r);return C<e?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:e-C}:c?y(S,{reconnect:!1}):E}if(p&&T-b>=t)return y(S,{reconnect:!0});if(u.openState==="open"){let C=e-(T-b);return C>0?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:C}:E}if(u.openState===void 0){let C=t-(T-b);return C>0?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:C}:E}return p?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:Math.max(0,t-(T-b))}:w},w={waiting:!1,stale:!1,repair:!1,reconnect:!1},E={waiting:!1,stale:!0,repair:!1,reconnect:!1},y=(S,{reconnect:T})=>(o.set(S,(o.get(S)??0)+1),{waiting:!1,stale:!0,repair:!0,reconnect:T});return{noteLink:g,noteResume:l,observe:s,release:m,decide:x,reset:()=>{n.clear(),o.clear(),f=!1,d=0,r=Number.NEGATIVE_INFINITY,i=Number.NEGATIVE_INFINITY}}}function xi({gapMs:e=5e3,intervalMs:t=1e3}={}){let a=null;return{tick:r=>{if(a===null)return a=r,!1;let i=r-a;return a=r,i>Math.max(e,t*2)},reset:()=>{a=null},intervalMs:t}}var pc=1500,yi=900,hc=400,ki=500,uc=[2e3,4e3,8e3,15e3,3e4],mc=15e3,fc=3e4,_i=1200,Ei=3e3;function Ti({pingMs:e=pc,probeRetryMs:t=hc,backoffMs:a=uc,hostStuckMs:n=mc,coldStuckMs:o=fc}={}){let r=!1,i=!1,d=0,f=null,g=0,l=Number.NEGATIVE_INFINITY,s=!1,m=Number.NEGATIVE_INFINITY,x=()=>{f=null,g=0,m=Number.NEGATIVE_INFINITY},w=(b,p)=>{if((typeof b=="boolean"?b?"down":"up":b)==="up"){r=!0,i=!1,d===0&&f!==null&&x();return}i=!0,f===null&&(f=p)},E=(b,p)=>{if(p!==!0||s)return!1;let c=d>0?t:e;return b-l<c?!1:(l=b,s=!0,!0)},y=(b,p)=>{if(s=!1,b===!0){d=0,r=!0,!i&&f!==null&&x();return}d+=1,l=p,f===null&&(f=p)},v=(b,p)=>{if(p!==!0||f===null)return!1;let c=d>=2&&!i,C=r&&i&&b-f>=n,h=!r&&b-f>=o;if(!c&&!C&&!h)return!1;let k=a[Math.min(g,a.length-1)];return b-m<k?!1:(g+=1,m=b,!0)};return{noteState:w,shouldProbe:E,noteProbe:y,shouldForceReconnect:v,shouldReconnect:v,isDown:()=>r&&f!==null,downFor:b=>r&&f!==null?b-f:0,reset:()=>{r=!1,i=!1,d=0,s=!1,l=Number.NEGATIVE_INFINITY,x()}}}var ma="dsh-pocket:probe:state:v1";var fa="dsh-pocket:link-verdict";var mn=Object.freeze(["read","type","approve","files","settings","other"]),fn=Object.freeze(["conversation","composer","approve","files","settings","panel","nav","header","other"]),bn=Object.freeze(["loads","sessions","sends","chars","approvals","scrollPx","errors","rejections","freezes","bfcache","longtasks"]),bc=Object.freeze(["displayMode","ios","host","platform"]),gc=Object.freeze(["dpr","screenW","screenH","viewportW","viewportH","safeTop","safeBottom","safeLeft","safeRight"]);function ae(e,t=1e9){let a=Math.round(Number(e));return!Number.isFinite(a)||a<=0?0:Math.min(t,a)}function lt(e){let t=Math.round(Number(e));return!Number.isFinite(t)||t<=0?0:Math.min(t,864e13)}function Mt(e,t=160){return typeof e!="string"&&typeof e!="number"?"":String(e).replace(/[\u0000-\u001f\u007f]+/g," ").replace(/\s+/g," ").trim().slice(0,t)}function Si(e){if(e===null||typeof e!="object"||Array.isArray(e))return null;let t={standalone:e.standalone===!0};for(let a of bc){let n=Mt(e[a],40);n!==""&&(t[a]=n)}for(let a of gc){let n=Math.round(Number(e[a]));Number.isFinite(n)&&n>0&&(t[a]=Math.min(n,1e5))}return t}function Rt(e=Date.now()){let t=lt(e)||Date.now(),a={};for(let r of mn)a[r]=0;let n={};for(let r of fn)n[r]=0;let o={};for(let r of bn)o[r]=0;return{v:1,since:t,updated:t,env:null,surfaces:a,clicks:n,counts:o,link:{downs:0,recovers:0,probes:0,offline:0,recoverMs:[],lastDownAt:0},perf:{frames:0,slowFrames:0},anchors:{checked:0,missing:{}},freezeMaxMs:0,samples:[]}}function Ci(e,t){if(e.env!==null)return e;let a=Si(t);return a!==null&&(e.env=a),e}function ba(e,t,a){let n=mn.includes(t)?t:"other",o=Math.min(ae(a,6e4),6e4);return o===0||(e.surfaces[n]=Math.min(6048e5,e.surfaces[n]+o)),e}function Ai(e,t){let a=fn.includes(t)?t:"other";return e.clicks[a]=Math.min(1e9,e.clicks[a]+1),e}function Se(e,t,a=1){if(!bn.includes(t))return e;let n=ae(a,1e9);return n===0||(e.counts[t]=Math.min(1e9,e.counts[t]+n)),e}function Li(e,t=Date.now()){return e.link.downs=Math.min(1e9,e.link.downs+1),e.link.lastDownAt=lt(t),e}function Mi(e,t){let a=ae(t,6e5);return e.link.recovers=Math.min(1e9,e.link.recovers+1),e.link.recoverMs.push(a),e.link.recoverMs.length>64&&e.link.recoverMs.splice(0,e.link.recoverMs.length-64),e}function Ri(e){return e.link.probes=Math.min(1e9,e.link.probes+1),e}function Pi(e){return e.link.offline=Math.min(1e9,e.link.offline+1),e}function Oi(e,t,a){let n=ae(t,1e9);if(n===0)return e;let o=Math.min(n,ae(a,1e9));return e.perf.frames=Math.min(1e9,e.perf.frames+n),e.perf.slowFrames=Math.min(e.perf.frames,e.perf.slowFrames+o),e}function Ii(e,t){e.anchors.checked=Math.min(1e6,e.anchors.checked+1);let a=Array.isArray(t)?t:[];for(let o of a.slice(0,32)){let r=Mt(o,64);r===""||!/^[\w-]+$/.test(r)||(e.anchors.missing[r]=Math.min(1e6,(e.anchors.missing[r]??0)+1))}let n=Object.entries(e.anchors.missing);return n.length>32&&(n.sort((o,r)=>r[1]-o[1]),e.anchors.missing=Object.fromEntries(n.slice(0,32))),e}function gn(e,t,a){let n=t==="rejection",o=n?"rejections":"errors";if(e.counts[o]=Math.min(1e9,e.counts[o]+1),e.samples.length<5){let r=Mt(a,160);r!==""&&e.samples.push({kind:n?"rejection":"error",text:r})}return e}function Ni(e,t){let a=ae(t,6e5);return a<=0||(e.counts.freezes=Math.min(1e9,e.counts.freezes+1),e.freezeMaxMs=Math.max(e.freezeMaxMs,a)),e}function Hi(e,t=Date.now()){let a=Math.max(lt(e.since)||0,lt(t)||0);return{v:1,since:e.since,now:a,env:e.env===null?null:{...e.env},surfaces:{...e.surfaces},clicks:{...e.clicks},counts:{...e.counts},link:{downs:e.link.downs,recovers:e.link.recovers,probes:e.link.probes,offline:e.link.offline,recoverMs:[...e.link.recoverMs],lastDownAt:e.link.lastDownAt},perf:{...e.perf},anchors:{checked:e.anchors.checked,missing:{...e.anchors.missing}},freezeMaxMs:e.freezeMaxMs,samples:e.samples.map(n=>({kind:n.kind,text:n.text}))}}function wn(e,t=Date.now()){let a=Rt(t);return a.env=e.env,a}function Fi(e){try{return JSON.stringify(e)}catch{return""}}function Bi(e){if(typeof e!="string"||e==="")return null;let t;try{t=JSON.parse(e)}catch{return null}if(t===null||typeof t!="object"||Array.isArray(t))return null;let a=Rt(),n=lt(t.since);n!==0&&(a.since=n),a.env=Si(t.env);for(let d of mn)a.surfaces[d]=ae(t.surfaces?.[d],6048e5);for(let d of fn)a.clicks[d]=ae(t.clicks?.[d]);for(let d of bn)a.counts[d]=ae(t.counts?.[d]);a.link.downs=ae(t.link?.downs),a.link.recovers=ae(t.link?.recovers),a.link.probes=ae(t.link?.probes),a.link.offline=ae(t.link?.offline),a.link.lastDownAt=lt(t.link?.lastDownAt);let o=Array.isArray(t.link?.recoverMs)?t.link.recoverMs:[];a.link.recoverMs=o.slice(-64).map(d=>ae(d,6e5)),a.perf.frames=ae(t.perf?.frames),a.perf.slowFrames=Math.min(a.perf.frames,ae(t.perf?.slowFrames)),a.anchors.checked=ae(t.anchors?.checked,1e6);let r=t.anchors?.missing;if(r!==null&&typeof r=="object"&&!Array.isArray(r))for(let[d,f]of Object.entries(r).slice(0,32)){let g=Mt(d,64),l=ae(f,1e6);g!==""&&/^[\w-]+$/.test(g)&&l>0&&(a.anchors.missing[g]=l)}a.freezeMaxMs=ae(t.freezeMaxMs,6e5);let i=Array.isArray(t.samples)?t.samples:[];for(let d of i.slice(0,5)){let f=Mt(d?.text,160);f!==""&&a.samples.push({kind:d?.kind==="rejection"?"rejection":"error",text:f})}return a}function zi(e){try{return JSON.stringify(e).length}catch{return Number.POSITIVE_INFINITY}}var Di=[{fragment:"GTtnTq_modeSelector",status:"legacy",note:"旧宿主哈希族；现行宿主已无同名片段"},{fragment:"GTtnTq_objectTree",status:"legacy",note:"旧宿主哈希族；现行宿主已无同名片段"},{fragment:"GTtnTq_root",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / AtgMta"},{fragment:"GTtnTq_sticky",status:"legacy",note:"旧宿主哈希族；现行宿主已无同名片段"},{fragment:"GTtnTq_table",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：O9N_wq"},{fragment:"QsffPG_root",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / AtgMta"},{fragment:"SVAs4q_",status:"legacy",note:"旧宿主片段：现行宿主已无"},{fragment:"SVAs4q_label",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：Ag-ohG / BE0jCW",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"VoX2oq_root",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / AtgMta"},{fragment:"VoX2oq_trigger",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / Ag-ohG"},{fragment:"ZKlsPq_menu",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：Ag-ohG / Luqt-a"},{fragment:"ZKlsPq_root",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / AtgMta",usedIn:["mobile/upstream/effects/subagent-chip-touch.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"ZuhsRW",status:"legacy",note:"旧宿主片段：现行宿主已无",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_7KE1Ra_chevron",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：Ag-ohG / BE0jCW"},{fragment:"_7KE1Ra_menu",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：Ag-ohG / Luqt-a",usedIn:["mobile/upstream/effects/model-menu-anchor.ts","mobile/upstream/effects/model-menu-keyboard-guard.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_7KE1Ra_trigger",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / Ag-ohG",usedIn:["mobile/upstream/debug.ts","mobile/upstream/effects/model-menu-anchor.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_actions",status:"host",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_add",status:"host",note:"≤3 字符：本体过泛，命中不代表语义有效",usedIn:["mobile/upstream/effects/composer-plus-toggle.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_approval",status:"host"},{fragment:"_boardHeader",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_body",status:"host",usedIn:["mobile/upstream/effects/question-fullscreen.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_bubble",status:"host"},{fragment:"_button",status:"host"},{fragment:"_byline",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_card",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/effects/question-fullscreen.ts","mobile/upstream/styles/compat.css.ts","mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_cardMinimized",status:"host"},{fragment:"_cardOpen",status:"host",usedIn:["mobile/upstream/effects/plugin-card-tap.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_centerCol",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/effects/panel-exit.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_chip",status:"host"},{fragment:"_columns",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_composerSeat",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/effects/composer-clearance.ts","mobile/upstream/effects/question-fullscreen.ts","mobile/upstream/effects/sidebar-swipe.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_composerStack",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/effects/stats-line.ts","mobile/upstream/platform/composer-anchor.ts","mobile/upstream/styles/compat.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_copyable",status:"legacy",note:"旧宿主片段：现行宿主已无"},{fragment:"_count",status:"host"},{fragment:"_crumb",status:"host",usedIn:["mobile/upstream/effects/panel-exit.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_crumbCurrent",status:"host",usedIn:["mobile/upstream/debug.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_crumbSeg",status:"host"},{fragment:"_crumbs",status:"host",usedIn:["mobile/upstream/debug.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_cubeRow",status:"host",usedIn:["mobile/upstream/styles/compat.css.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_customInput",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_customTextarea",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_customized",status:"host"},{fragment:"_customizedBody",status:"host"},{fragment:"_description",status:"host"},{fragment:"_detail",status:"host"},{fragment:"_disclosure",status:"host"},{fragment:"_dock",status:"host",usedIn:["mobile/upstream/effects/sidebar-swipe.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_dot",status:"host",note:"≤3 字符：本体过泛，命中不代表语义有效"},{fragment:"_drawer",status:"host"},{fragment:"_eyebrow",status:"host"},{fragment:"_fieldInput",status:"host"},{fragment:"_float",status:"host"},{fragment:"_footer",status:"host",usedIn:["mobile/upstream/effects/question-fullscreen.ts","mobile/upstream/styles/compat.css.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_footerActions",status:"host"},{fragment:"_frame",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/effects/question-fullscreen.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_grow",status:"host"},{fragment:"_header",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_headerActions",status:"host",usedIn:["mobile/upstream/effects/question-fullscreen.ts","mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_headerCorner",status:"host"},{fragment:"_headerHidden",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_headerLeading",status:"host",usedIn:["mobile/upstream/effects/composer-clearance.ts","mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_headerUtilities",status:"host"},{fragment:"_headingBlock",status:"host"},{fragment:"_headline",status:"host"},{fragment:"_iconButton",status:"host"},{fragment:"_itemIcon",status:"host"},{fragment:"_itemLabel",status:"host"},{fragment:"_label",status:"host"},{fragment:"_line",status:"host"},{fragment:"_mask",status:"host"},{fragment:"_menu",status:"host"},{fragment:"_menuAnchor",status:"host"},{fragment:"_modes",status:"host"},{fragment:"_moreBack",status:"host"},{fragment:"_navCell",status:"host",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_navList",status:"host",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_opPanel",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_optionLabel",status:"host"},{fragment:"_options",status:"host"},{fragment:"_overlayLayer",status:"host"},{fragment:"_pageHead",status:"host"},{fragment:"_pageHeading",status:"host"},{fragment:"_panel",status:"host"},{fragment:"_panelBadge",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_panelChevron",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_panelTitle",status:"host"},{fragment:"_panelToggle",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_pill",status:"host"},{fragment:"_primary",status:"host",usedIn:["mobile/upstream/effects/stats-line.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_reviewNote",status:"host"},{fragment:"_root",status:"host",usedIn:["mobile/upstream/effects/stats-line.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_row",status:"host",note:"≤3 字符：本体过泛，命中不代表语义有效",usedIn:["mobile/upstream/effects/stats-line.ts","mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_rowActions",status:"host",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_rowOpen",status:"host",usedIn:["mobile/upstream/effects/plugin-card-tap.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_runningDivider",status:"host"},{fragment:"_scroll",status:"host",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_scrollBody",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/styles/layout.css.ts"]},{fragment:"_search",status:"host"},{fragment:"_searchInline",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_searchRow",status:"host"},{fragment:"_section",status:"host"},{fragment:"_sep",status:"host",note:"≤3 字符：本体过泛，命中不代表语义有效"},{fragment:"_separator",status:"host"},{fragment:"_sessionRow",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/effects/session-menu.ts"]},{fragment:"_sheet",status:"host"},{fragment:"_sidebar",status:"host"},{fragment:"_sidebarCol",status:"host",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"_sprite",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_stack",status:"host"},{fragment:"_stat",status:"host"},{fragment:"_statsRow",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_switcherRoot",status:"host"},{fragment:"_switcherTrigger",status:"host"},{fragment:"_tab",status:"host",note:"≤3 字符：本体过泛，命中不代表语义有效"},{fragment:"_tabs",status:"host",usedIn:["mobile/upstream/styles/compat.css.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_textDocument",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_timeEnd",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_title",status:"host",usedIn:["mobile/upstream/effects/drawer-close.ts","mobile/upstream/effects/session-menu.ts","mobile/upstream/styles/compat.css.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_titleBar",status:"legacy",note:"旧宿主片段：现行宿主已无"},{fragment:"_titleCluster",status:"host",usedIn:["mobile/upstream/debug.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_titleRow",status:"host",usedIn:["mobile/upstream/styles/compat.css.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_toolbar",status:"host"},{fragment:"_tools",status:"host"},{fragment:"_track",status:"host"},{fragment:"_trailing",status:"host",usedIn:["mobile/upstream/effects/stats-line.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_trigger",status:"host",usedIn:["mobile/upstream/effects/subagent-chip-touch.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"_triggerAnchor",status:"host"},{fragment:"_triggerIcon",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"_triggerLabel",status:"host"},{fragment:"_userStack",status:"host"},{fragment:"_viewArea",status:"host"},{fragment:"_viewport",status:"host"},{fragment:"_viewport_",status:"host"},{fragment:"_wrap",status:"host"},{fragment:"cardShot",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"cardShots",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"cubgiG_item",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：Ag-ohG / DXuOLW"},{fragment:"dsfv-",status:"external",note:"dsh-file-viewer（本机未安装，无法实证）"},{fragment:"dsfv-jump-input",status:"external",note:"dsh-file-viewer（本机未安装，无法实证）"},{fragment:"dsfv-page-input",status:"external",note:"dsh-file-viewer（本机未安装，无法实证）"},{fragment:"dsfv-search-input",status:"external",note:"dsh-file-viewer（本机未安装，无法实证）"},{fragment:"grow",status:"host"},{fragment:"h8S2Va_menu",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：Ag-ohG / Luqt-a"},{fragment:"h8S2Va_root",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / AtgMta"},{fragment:"hHd-Xa_toggle",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：HOHHba / K5rwea"},{fragment:"headerActions",status:"host"},{fragment:"headerBlank",status:"host"},{fragment:"heroWorkspaceRow",status:"host"},{fragment:"iWlSmW_trigger",status:"legacy",note:"旧宿主哈希族；现行同类名前缀：A6Bq1a / Ag-ohG"},{fragment:"iWlSmW_triggerIcon",status:"legacy",note:"旧宿主哈希族；现行宿主已无同名片段"},{fragment:"irow",status:"external",note:"dsh-web-ui 已安装列表（本机未安装，无法实证）",usedIn:["mobile/upstream/effects/installed-list.ts","mobile/upstream/styles/compat.css.ts"]},{fragment:"irowActions",status:"external",note:"dsh-web-ui 已安装列表（本机未安装，无法实证）",usedIn:["mobile/upstream/effects/installed-list.ts","mobile/upstream/styles/compat.css.ts"]},{fragment:"irowTrailing",status:"external",note:"dsh-web-ui 已安装列表（本机未安装，无法实证）",usedIn:["mobile/upstream/effects/installed-list.ts","mobile/upstream/styles/compat.css.ts"]},{fragment:"logoRow",status:"host"},{fragment:"moreMenu",status:"host"},{fragment:"nL4_yW_moreButton",status:"legacy",note:"旧宿主哈希族；现行宿主已无同名片段"},{fragment:"name",status:"host"},{fragment:"newSession",status:"host"},{fragment:"nm",status:"host",note:"≤3 字符：本体过泛，命中不代表语义有效",usedIn:["mobile/upstream/effects/installed-list.ts","mobile/upstream/styles/compat.css.ts"]},{fragment:"owner",status:"host"},{fragment:"panelRow",status:"host",usedIn:["mobile/upstream/effects/drawer-close.ts","mobile/upstream/effects/panel-exit.ts","mobile/upstream/styles/layout.css.ts"]},{fragment:"scrollBody",status:"host",usedIn:["mobile/mobile-apply.tsx","mobile/upstream/index.tsx","mobile/upstream/styles/layout.css.ts"]},{fragment:"searchResultRow",status:"host"},{fragment:"searchResultWorkspace",status:"host"},{fragment:"sessionRow",status:"host",usedIn:["mobile/upstream/effects/drawer-close.ts","mobile/upstream/effects/sidebar-swipe.ts","mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]},{fragment:"sidebarCol",status:"host",usedIn:["mobile/upstream/effects/drawer-quick-settings.ts","mobile/upstream/effects/drawer-session-log.ts","mobile/upstream/styles/base.css.ts"]},{fragment:"spec",status:"host",usedIn:["mobile/upstream/effects/installed-list.ts","mobile/upstream/styles/compat.css.ts"]},{fragment:"switch",status:"host"},{fragment:"tabSearch",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"tabSearchRow",status:"external",note:"dsh-web-ui explorer/preview（本机未安装，无法实证）"},{fragment:"titleCluster",status:"host"},{fragment:"triggerRow",status:"host",usedIn:["mobile/upstream/effects/drawer-quick-settings.ts","mobile/upstream/styles/base.css.ts"]},{fragment:"usg_",status:"legacy",note:"旧宿主片段：现行宿主已无"},{fragment:"viewsMore",status:"host"},{fragment:"viewsMoreAnchor",status:"host",usedIn:["mobile/upstream/styles/layout.css.ts","mobile/upstream/styles/misc.css.ts"]}];var dt="pocket",ga={section:"手机访问",title:"📱 手机访问",subtitle:"手机扫码打开的就是电脑上的这个界面，实时同步",developer:"开发者：大哈",starAsk:"⭐ 顺手留颗 Star，大哈能高兴一整天",starCta:"好，这就去 Star",restarted:"已重启",reloadFailed:"自动刷新没成功（新进程可能还在启动）",reloadNow:"刷新页面",ok:"知道了",loadingStatus:"正在读取状态…",offlineHint:"暂时连不上宿主（可能正在重启），恢复后会自动刷新状态",later:"稍后",bgHint:"进程在后台运行（不挂终端）。如需停止：{cmd}",updatedRestart:"已更新 v{ver}，重启生效",restartingNow:"正在重启生效…",restarting:"重启中…",restartNow:"🔄 重启 dsh web 生效",restartingDetail:"⏳ 正在重启生效（通常 10-30 秒）· 已等待 {s} 秒",updatedRestartDetail:"已更新，重启 dsh web 生效",versionLine:"v{ver}",updateDocLink:"更新方法",updateHint:"更新方式：重跑 README 里的 add 命令（插件内不再一键更新），装完重启 dsh web 生效",restartFailed:"重启失败：{err}",wanAccess:"公网访问",publicConfig:"公网配置",publicSetupHint:"不提供现成公网地址。请先配置自己的 Cloudflare 域名与 Tunnel Token；未配置时公网保持关闭，保存配置不会自动开启。",publicConfigure:"配置公网访问",pinLabel:"访问密码",advAddress:"高级 · 手动选地址",wanOffHint:"公网已关闭。开启后可通过自配固定域名从任何网络访问（每次开启需确认免责声明）",resetFactory:"🧹 恢复出厂设置",resetGo:"恢复",resetIntro:"设置搞出问题时的临时兜底：清空本机配置并重设随机密码（DSH 的会话、模型、插件配置不受影响）",resetTitle:"⚠️ 确认恢复出厂设置？",resetBody:`将清空并恢复默认：
① 开关：局域网访问=开、访问密码=开、手机端右边栏=开、局域网地址=自动
② 公网：关闭公网访问，清空 Tunnel Token、固定域名与自动恢复标记；重新配置前保持关闭
③ 密码：公网和局域网都换成新的随机 8 位密码（旧密码立即作废，手机需重新输入）

DSH 自身的会话、模型、插件配置不受影响；此操作不可撤销。`,resetConfirm:"确认恢复",resetDone:"✅ 已恢复出厂设置：设置已清空，密码已换新（手机需重新输入）",resetFailed:"❌ 恢复失败，请重试",resetPartial:"⚠️ 重置不完整：部分设置或密码没能写入磁盘，详情见下方提示",pinSaveMemoryOnly:"⚠️ 密码只在本次运行有效：写入磁盘失败，重启后会失效",lanTitle:"📶 局域网（同一 WiFi）",lanHint:"手机连接同一 WiFi 后扫码即可打开",lanAccess:"局域网访问",lanDisabledHint:"局域网访问已关闭：手机扫码/链接均不可用（公网不受影响）。点「开」恢复。",lanToggleTitleOff:"关闭局域网访问",lanToggleBodyOff:"关闭后，同一 WiFi 下的手机将无法扫码访问（局域网二维码/链接立即失效）。公网访问不受影响。确定关闭？",lanToggleTitleOn:"开启局域网访问",lanToggleBodyOn:"开启后，同一 WiFi 的手机扫码即可访问（默认需输入局域网密码）。确定开启？",confirm:"确定",lanAddress:"局域网地址",lanAddressAuto:"自动（推荐）",lanPin:"局域网访问密码",on:"开",off:"关",lanPinValue:"🔐 访问密码：{pin}（手机打开需输入；与公网密码分开）",lanPinCustomValue:"🔐 访问密码：{pin}（自定义；手机打开需输入）",refresh:"刷新",customize:"自定义",customizing:"新密码（8–64 位，英文字母或数字）：",save:"保存",cancel:"取消",pinInvalid:"密码必须是 8–64 位英文字母或数字",pinCharsFiltered:"只保留英文字母和数字，其他字符已被忽略",pinCustomHint:"自定义密码不会自动换新；泄露后请主动修改",lanPinOff:"🔓 密码已关闭：扫码直连，无需密码（仅同一局域网设备可访问；公网仍要密码）",lanPinRemoteHint:"为避免公网访客拿到局域网密码，这里只在本机/局域网内显示；需要查看请改用局域网地址打开设置。",lanPinUnavailable:"暂时读不到局域网访问密码，请刷新页面重试。",lanLocalOnly:"局域网入口的开/关与地址只允许在本机或局域网内修改；你现在是通过公网隧道访问的。",wanLocalOnly:"公网隧道的开启/停止与配置只允许在本机或局域网内操作；通过隧道访问时只能查看状态。",resetLocalOnly:"恢复出厂设置只允许在本机或局域网内执行。",lanStarting:"代理未就绪…",mobileRightbar:"手机端右边栏",mobileRightbarHint:"显示原生右边栏入口；普通手机可按需关闭，折叠屏展开后使用更方便",prefsTitle:"手机端偏好",prefsHint:"这些开关只影响手机上的显示，桌面端不受影响",statusOn:"已开启",statusOff:"已关闭",statusConnected:"已连接",mobilePinchZoom:"手机端两指捏合缩放",mobilePinchZoomHint:"默认关闭：两指捏合禁用、页面锁定 1x；开启后恢复捏合，页面意外被放大时可用它还原",mobileFontSize:"手机端字号",mobileFontSizeHint:"默认「跟随桌面」，桌面改字号时手机同步变化；选择具体字号后仅手机会话正文独立变化，不影响桌面设置",mobileFontFollow:"跟随桌面",wanTitle:"🌐 公网（人在外面）",wanHint:"需先自行配置 Cloudflare 固定域名与 Tunnel Token，开启后可从任何网络访问",wanPin:"🔐 访问密码：{pin}（启停或重启不会自动换新；手机打开链接需输入）",wanPinCustom:"🔐 访问密码：{pin}（自定义；启停或重启不会自动换新）",stopTunnel:"关闭公网",enable:"开启公网访问",opening:"开启中…",namedSummary:"固定域名：{host} · Token {token}",namedTokenSet:"已配置",namedTokenMissing:"未配置",namedEdit:"修改",namedHostnameLabel:"固定域名：",namedTokenLabel:"Tunnel Token（留空 = 保持不变）：",namedHow:"请用自己的 Cloudflare 账号和域名，在 Zero Trust → Networks → Tunnels 创建命名隧道并复制 Token；自行添加 Public Hostname 路由，将 Service 指向本机实际代理端口（通常为 http://127.0.0.1:3081，改过端口请相应修改）。保存配置不会自动开启公网。",namedSecurity:"固定域名长期可被发现、更易被扫描。请设置自定义强密码并用完即关；公网密码不会随启停或重启自动换新，泄露后请主动修改。",namedNeedCfg:"请先填写自己的 Cloudflare 固定域名与 Tunnel Token",namedRunningHint:"自配固定域名（Cloudflare 命名隧道）——地址不随重启变化",namedWanHint:"仅支持自配 Cloudflare 固定域名与 Tunnel Token；未配置时公网保持关闭",namedTakeEffect:"配置已保存，不会自动开启公网；如公网正在运行，需关闭并重新开启后生效",disclaimerTitle:"⚠️ 安全免责声明",disclaimerBody:"开启公网 = 把本机 DSH（能执行代码）暴露到互联网。任何人拿到公网链接和密码，都能访问甚至操作你的电脑。请确认：① 使用自定义强密码或妥善保管自动密码；② 用完立即「关闭公网」；③ 公司/涉密网络请先确认合规。",disclaimerAgree:"我已知情，同意开启",disclaimerHint:"请勾选「我已知情」后再开启公网",downloading:"⏳ 下载 cloudflared（首次约 20-50MB，通常 1-2 分钟；之后秒开）· 已等待 {s} 秒",connecting:"⏳ 连接 Cloudflare 边缘（通常 5-30 秒）· 已等待 {s} 秒{suffix}",slowHint:" — 有点久？检查是否开着代理/VPN（Clash TUN 等）",error:"❌ 开启失败：{detail}（可重试；若是代理/VPN 问题见 README 排障）",unknownError:"未知错误",feedback:"有问题？欢迎到 GitHub Issues 反馈 🙏",fileGuardMsg:"手机上无法直接打开电脑上的文件",fileCopy:"复制",fileCopyDone:"已复制文件内容（{kb} KB）",fileCopyFailed:"复制失败",fileCopyFailedFallback:"复制失败，下方可长按选择",fileFallbackTitle:"复制失败，长按下方文本选择",fileFallbackClose:"关闭",fileTooLarge:"文件过大（{size}MB），已跳过复制",fileTruncated:"…已截断",copyLink:"复制链接",copied:"✅ 已复制地址",copyFailed:"复制失败，请长按地址手动复制",pinShow:"显示",pinHide:"隐藏",cacheTitle:"代理缓存",cacheSub:"手机访问的加速层：静态资源转码结果与会话列表瘦身结果共用一个内存预算；清空只会让下一次加载变慢",cacheUsage:"已用 {used} / {budget}",cacheEntries:"共 {n} 个缓存条目（静态资源 + 会话列表）",cacheClear:"清空缓存",cacheCleared:"✅ 已清空缓存，释放 {mb} MB",liteTitle:"轻量视图（手机专用）",liteHint:"只看会话、发消息、批审批；不加载宿主界面，弱网和旧手机更快",liteAddress:"地址",liteAddressHint:"加到主屏幕就是一个独立的小应用；打不开时随时回到宿主界面，两者共用同一份数据",liteOpen:"打开轻量视图",probeTitle:"使用探针",probeSub:"只在你这台电脑上留一份用量记录，用来决定手机端下一步怎么做",probeEnabled:"采集使用数据",probeEnabledHint:"记录各页面停留时长、点击区域、断线恢复耗时、宿主类名失效情况。不含消息内容，不联网。",probeUsage:"已用 {used} / {budget}",probeWhere:"{n} 个数据包 · 写入 {path}",probeLast:"最近一次 {when}",probeEmpty:"还没有数据",probeClear:"清空记录",probeCleared:"✅ 已清空探针记录，释放 {mb} MB",probeEnabledToast:"已开启使用探针",probeDisabledToast:"已关闭使用探针（手机端不再上报）",linkDown:"连接已断开，正在自动重连…",linkBack:"✅ 已重新连接",tipsTitle:"这是电脑上 DSH 的手机界面",tipsBody:`与电脑实时同步，不是另一个应用。
· 右滑（或点左上角）打开会话抽屉
· 断线会自动重连，不用手动刷新
· 字号、键盘、右边栏都在设置页「手机访问」里`,tipsDismiss:"知道了",backToBottom:"回到底部",lanDebugHint:"局域网直连不是安全上下文（浏览器限制）：没有离线缓存、装到主屏与推送，密码也在明文 HTTP 上传输。适合在家里的 WiFi 下应急；长期使用请配置公网隧道（HTTPS）。"},qi={section:"Phone access",title:"📱 Phone access",subtitle:"The phone shows this exact screen, live",developer:"Developer: daha1216 (大哈)",starAsk:"⭐ Drop a Star if it helped — it makes daha1216’s day",starCta:"★ Star it on GitHub",restarted:"Restarted",reloadFailed:"Auto-reload did not go through (the new process may still be starting)",reloadNow:"Reload",ok:"Got it",loadingStatus:"Loading status…",offlineHint:"Cannot reach the host right now (it may be restarting); status refreshes automatically once it is back",later:"Later",bgHint:"Running in the background (not attached to a terminal). To stop: {cmd}",updatedRestart:"Updated to v{ver} — restart to apply",restartingNow:"Restarting to apply…",restarting:"Restarting…",restartNow:"🔄 Restart dsh web now",restartingDetail:"⏳ Restarting to apply (usually 10-30s) · {s}s elapsed",updatedRestartDetail:"Updated — restart dsh web to apply",versionLine:"v{ver}",updateDocLink:"How to update",updateHint:"To update: re-run the add command from the README (there is no in-plugin updater), then restart dsh web",restartFailed:"Restart failed: {err}",wanAccess:"Public access",publicConfig:"Public configuration",publicSetupHint:"No ready-made public address is provided. Configure your own Cloudflare hostname and Tunnel Token first. Public access stays off until configured; saving does not start it.",publicConfigure:"Configure public access",pinLabel:"Access PIN",advAddress:"Advanced · Pick address",wanOffHint:"Public access is off. Enable it to use your configured hostname from any network (accept the disclaimer on each enable).",resetFactory:"🧹 Factory reset",resetGo:"Reset",resetIntro:"Temporary fallback when settings break: clear local config and re-roll random PINs (DSH sessions, models and plugin config are untouched)",resetTitle:"⚠️ Confirm factory reset?",resetBody:`This clears and restores defaults:
① Switches: LAN access on, access PIN on, mobile right sidebar on, LAN address auto
② Public: access stopped; Tunnel Token, fixed hostname and auto-restore marker cleared. Public access stays off until configured again
③ PINs: both public and LAN become new random 8-character PINs (old ones stop working; the phone must re-enter)

Your DSH sessions, models and plugin config are untouched. This cannot be undone.`,resetConfirm:"Reset",resetDone:"✅ Factory reset done: settings cleared and PINs re-rolled (re-enter the PIN on your phone)",resetFailed:"❌ Reset failed — please retry",resetPartial:"⚠️ Reset incomplete: some settings or PINs could not be written to disk — see the hint below",pinSaveMemoryOnly:"⚠️ PIN is only valid for this run: writing to disk failed, so it reverts after a restart",lanTitle:"📶 LAN (same Wi-Fi)",lanHint:"Scan to open once your phone is on the same Wi-Fi",lanAccess:"LAN access",lanDisabledHint:'LAN access is off — the QR code and link are unavailable (public access is unaffected). Tap "On" to restore.',lanToggleTitleOff:"Turn off LAN access",lanToggleBodyOff:"Once off, phones on the same Wi-Fi can no longer scan to connect (the LAN QR code and link stop working immediately). Public access is unaffected. Turn it off?",lanToggleTitleOn:"Turn on LAN access",lanToggleBodyOn:"Once on, phones on the same Wi-Fi can scan to connect (a LAN PIN is required by default). Turn it on?",confirm:"Confirm",lanAddress:"LAN address",lanAddressAuto:"Auto (recommended)",lanPin:"LAN access PIN",on:"On",off:"Off",lanPinValue:"🔐 PIN: {pin} (required on the phone; separate from the public PIN)",lanPinCustomValue:"🔐 PIN: {pin} (custom; required on the phone)",refresh:"Refresh",customize:"Customize",customizing:"New PIN (8–64 chars, letters/digits): ",save:"Save",cancel:"Cancel",pinInvalid:"PIN must be 8–64 characters (letters and digits only)",pinCharsFiltered:"Only letters and digits are kept; other characters were ignored",pinCustomHint:"Custom PINs do not rotate automatically; change yours if it leaks.",lanPinOff:"🔓 PIN off — scan & go, no PIN (LAN devices only; public still requires PIN)",lanPinRemoteHint:"Hidden over the tunnel so public visitors cannot read the LAN PIN. Open Settings via the LAN address to view it.",lanPinUnavailable:"Couldn't read the LAN PIN; refresh the page and try again.",lanLocalOnly:"LAN access can only be toggled or re-addressed from the host or the local network; you are visiting through the public tunnel.",wanLocalOnly:"Starting, stopping and configuring the public tunnel is local-only; over the tunnel you can only view its status.",resetLocalOnly:"Factory reset can only be run from the host or the local network.",lanStarting:"Proxy starting…",mobileRightbar:"Mobile right sidebar",mobileRightbarHint:"Show the native right-sidebar entry; disable it for a compact phone header or keep it on for an unfolded display",prefsTitle:"Mobile preferences",prefsHint:"These options only affect the phone layout; the desktop is untouched",statusOn:"On",statusOff:"Off",statusConnected:"Connected",mobilePinchZoom:"Mobile pinch zoom",mobilePinchZoomHint:"Off by default: two-finger pinch disabled, page locked at 1x; turn on to restore pinch for recovering from accidental zoom",mobileFontSize:"Mobile font size",mobileFontSizeHint:'Defaults to "Follow desktop", so desktop font changes also affect the phone. Choose a specific size for independent mobile conversation text without changing the desktop setting.',mobileFontFollow:"Follow desktop",wanTitle:"🌐 Anywhere (public)",wanHint:"Configure your own Cloudflare fixed hostname and Tunnel Token first, then enable access from any network.",wanPin:"🔐 PIN: {pin} (not rotated on stop/start or restart; required on the phone)",wanPinCustom:"🔐 PIN: {pin} (custom; not rotated on stop/start or restart)",stopTunnel:"Stop",enable:"Enable anywhere",opening:"Enabling…",namedSummary:"Fixed domain: {host} · Token {token}",namedTokenSet:"configured",namedTokenMissing:"not set",namedEdit:"Edit",namedHostnameLabel:"Fixed domain:",namedTokenLabel:"Tunnel Token (blank = keep current):",namedHow:"Use your own Cloudflare account and domain. Create a named tunnel in Zero Trust → Networks → Tunnels, copy its Token, and add a Public Hostname route yourself. Point its Service to the actual local proxy port (usually http://127.0.0.1:3081; adjust if changed). Saving does not start public access.",namedSecurity:"A fixed hostname remains discoverable and is easier to scan. Use a strong custom PIN and turn access off when done. The public PIN does not rotate on stop/start or restart; change it yourself if it leaks.",namedNeedCfg:"Set your own Cloudflare fixed hostname and Tunnel Token first",namedRunningHint:"Your configured hostname (Cloudflare named tunnel) — unchanged on restart",namedWanHint:"Requires your own Cloudflare fixed hostname and Tunnel Token; public access stays off until configured.",namedTakeEffect:"Configuration saved; public access is not started automatically. If it is running, turn it off and on again to apply changes.",disclaimerTitle:"⚠️ Security disclaimer",disclaimerBody:"Enabling public access exposes this computer’s DSH (which can execute code) to the internet. Anyone with the public link and PIN can reach — and operate — your computer. Please confirm: ① use a strong custom PIN or keep the auto-generated one safe; ② turn public access OFF as soon as you’re done; ③ on a corporate/classified network, confirm compliance first.",disclaimerAgree:"I understand and agree",disclaimerHint:'Check "I understand" before enabling public access',downloading:"⏳ Downloading cloudflared (first run ~20-50MB, usually 1-2 min; instant afterward) · {s}s elapsed",connecting:"⏳ Connecting to Cloudflare edge (usually 5-30s) · {s}s elapsed{suffix}",slowHint:" — taking long? Check for a proxy/VPN (e.g., Clash TUN)",error:"❌ Failed to enable: {detail} (you can retry; for proxy/VPN issues see the README)",unknownError:"unknown error",feedback:"🙏 Questions? Open an issue on GitHub",fileGuardMsg:"Cannot open a file stored on your computer directly from the phone",fileCopy:"Copy",fileCopyDone:"File content copied ({kb} KB)",fileCopyFailed:"Copy failed",fileCopyFailedFallback:"Copy failed — long-press below to select instead",fileFallbackTitle:"Copy failed — long-press the text below to select it",fileFallbackClose:"Close",fileTooLarge:"File too large ({size}MB), copy skipped",fileTruncated:"… truncated",copyLink:"Copy link",copied:"✅ Address copied",copyFailed:"Copy failed — long-press the address to copy it manually",pinShow:"Show",pinHide:"Hide",cacheTitle:"Proxy cache",cacheSub:"The phone-access speed layer: transcoded assets and slimmed session lists share one memory budget. Clearing only makes the next load slower.",cacheUsage:"{used} of {budget} used",cacheEntries:"{n} cached entries (assets + session lists)",cacheClear:"Clear cache",cacheCleared:"✅ Cache cleared, {mb} MB freed",liteTitle:"Lightweight view (phone)",liteHint:"Sessions, sending and approvals only — no host UI, faster on slow or old phones",liteAddress:"Address",liteAddressHint:"Add it to the home screen for a standalone app; if it misbehaves the host UI is still there, on the same data",liteOpen:"Open lightweight view",probeTitle:"Usage probe",probeSub:"Keeps a local usage log so the next step for the phone view can be decided from data",probeEnabled:"Collect usage data",probeEnabledHint:"Records time per screen, tap areas, reconnect delays and whether host class names still exist. No message content, never uploaded.",probeUsage:"{used} of {budget} used",probeWhere:"{n} packets · written to {path}",probeLast:"last {when}",probeEmpty:"no data yet",probeClear:"Clear log",probeCleared:"✅ Probe log cleared, {mb} MB freed",probeEnabledToast:"Usage probe enabled",probeDisabledToast:"Usage probe disabled (the phone stops reporting)",linkDown:"Disconnected — reconnecting automatically…",linkBack:"✅ Reconnected",tipsTitle:"This is DSH from your computer, sized for the phone",tipsBody:`It syncs live with the desktop — not a separate app.
· Swipe right (or tap the top-left corner) for the session drawer
· A dropped connection reconnects by itself; no refresh needed
· Font size, keyboard and right sidebar live in Settings → Phone access`,tipsDismiss:"Got it",backToBottom:"Back to bottom",lanDebugHint:"LAN direct access is not a secure context (browser restriction): no offline cache, home-screen install or push, and the PIN travels over plain HTTP. Fine for quick access at home; use the public tunnel (HTTPS) for regular use."};var kc=`
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
}`;function Ke(e,t,a){try{let o=e.locale.bind(dt)(t);return typeof o=="string"&&o.length>0?o:a}catch{return a}}function Wi(e){let t=new URL(window.location.href).searchParams.get("dsh-layout"),a=t??"",n=window.matchMedia("(max-width: 1023px) and (pointer: coarse)"),o=bi(t),r=fi({urlValue:a,stored:o,narrowMatch:n.matches});if(document.body?.setAttribute("data-dsh-pocket-layout",r),r==="desktop")return;let i=n;r==="mobile"&&(i={matches:!0,addEventListener:()=>{},removeEventListener:()=>{}});let d=a.trim().toLowerCase();d==="desktop"||d==="mobile"||d!=="auto"&&(o==="desktop"||o==="mobile")||e.effect(()=>{let l=()=>{document.body?.setAttribute("data-dsh-pocket-layout",n.matches?"mobile":"desktop")};return n.addEventListener("change",l),()=>{n.removeEventListener("change",l)}},"dsh-pocket: auto layout attribute sync on breakpoint change");let g=(l,s)=>{e.effect(()=>{let m,x=()=>{m?.(),m=i.matches?s():void 0};return x(),i.addEventListener?.("change",x),()=>{i.removeEventListener?.("change",x),m?.()}},l)};pi(e),e.effect(()=>{let l=!0,s=w=>{document.body?.setAttribute(ut,w?"on":"off")},m=w=>{s(w.detail?.enabled===!0)},x=async()=>{try{let w=await e.connection.rpc.call(ye,$.status,{});l&&s(w?.ok===!0?w.value?.mobileRightbarEnabled!==!1:!0)}catch{l&&s(!0)}};return window.addEventListener(mt,m),x(),()=>{l=!1,window.removeEventListener(mt,m),document.body?.removeAttribute(ut)}},"dsh-mobile-nav: optional right sidebar"),e.effect(()=>{let l=!0,s=w=>{document.body?.setAttribute(Je,w?"on":"off")},m=w=>{s(w.detail?.enabled===!0)},x=async()=>{try{let w=await e.connection.rpc.call(ye,$.status,{});l&&s(w?.ok===!0?w.value?.mobilePinchZoomEnabled===!0:!1)}catch{l&&s(!1)}};return window.addEventListener(ft,m),x(),()=>{l=!1,window.removeEventListener(ft,m),document.body?.removeAttribute(Je)}},"dsh-pocket: pinch-zoom setting"),e.effect(()=>{let l=!0,s=w=>{let E=document.body;if(!E)return;let y=Number(w);Number.isInteger(y)&&y>=12&&y<=22?(E.style.setProperty(He,`${y}px`),E.setAttribute(Ne,String(y))):(E.style.removeProperty(He),E.removeAttribute(Ne))},m=w=>{s(Number(w.detail?.size)||0)},x=async()=>{try{let w=await e.connection.rpc.call(ye,$.status,{});l&&s(w?.ok===!0&&Number(w.value?.mobileFontSize)||0)}catch{l&&s(0)}};return window.addEventListener(bt,m),x(),()=>{l=!1,window.removeEventListener(bt,m),document.body?.style.removeProperty(He),document.body?.removeAttribute(Ne)}},"dsh-pocket: mobile font size"),g("dsh-pocket: mobile zoom lock",()=>{let l=0,s=()=>{l=window.visualViewport?.scale??0},m=w=>{let E=w.scale,y=typeof E=="number"&&Number.isFinite(E)&&E<1;if(document.body?.getAttribute(Je)!=="on"){if(l>1.0001&&y)return;w.preventDefault();return}l>0&&l*E<=l||w.preventDefault()},x=()=>{l=0};return document.addEventListener("gesturestart",s,{passive:!1}),document.addEventListener("gesturechange",m,{passive:!1}),document.addEventListener("gestureend",x,{passive:!1}),()=>{document.removeEventListener("gesturestart",s),document.removeEventListener("gesturechange",m),document.removeEventListener("gestureend",x)}}),g("dsh-pocket: dialog focus containment",()=>{let l='[role="dialog"][aria-modal="true"]',s='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',m=[],x=c=>c.hasAttribute("data-mobile-nav")||c.parentElement?.hasAttribute("data-mobile-nav")===!0,w=c=>Array.from(c.querySelectorAll(s)).filter(C=>C.getClientRects().length>0),E=c=>!c.closest('[aria-hidden="true"], [inert]')&&c.getClientRects().length>0,y=()=>{let c=Array.from(document.querySelectorAll(l)).filter(C=>x(C)&&E(C));return c.length>0?c[c.length-1]:null},v=null,S=c=>{if(v===null||!v.isConnected||c.key!=="Tab")return;let C=w(v);if(C.length===0){c.preventDefault(),document.activeElement!==v&&v.focus({preventScroll:!0});return}let h=C[0],k=C[C.length-1],_=document.activeElement;c.shiftKey&&(_===h||!v.contains(_))?(c.preventDefault(),k.focus({preventScroll:!0})):!c.shiftKey&&(_===k||!v.contains(_))&&(c.preventDefault(),h.focus({preventScroll:!0}))};document.addEventListener("keydown",S,!0);let T=()=>{let c=y();if(c===v)return;if(v!==null&&c!==null){v=c,c.hasAttribute("tabindex")||c.setAttribute("tabindex","-1"),(w(c)[0]??c).focus({preventScroll:!0});return}if(v!==null){let k=m.pop();v=null,k!==void 0&&k.isConnected&&k.focus({preventScroll:!0});return}if(v=c,c===null)return;let C=document.activeElement;C!==null&&C!==document.body&&!c.contains(C)&&m.push(C),c.hasAttribute("tabindex")||c.setAttribute("tabindex","-1"),(w(c)[0]??c).focus({preventScroll:!0})},u=0,b=()=>{u===0&&(u=requestAnimationFrame(()=>{u=0,T()}))};T();let p=new MutationObserver(c=>{for(let C of c)if(C.type==="childList"){for(let h of C.addedNodes)if(h.nodeType===1){b();return}for(let h of C.removedNodes)if(h.nodeType===1){b();return}}});return p.observe(document.body,{childList:!0,subtree:!0}),()=>{document.removeEventListener("keydown",S,!0),p.disconnect(),u!==0&&cancelAnimationFrame(u),v?.removeAttribute("tabindex"),v=null,m.length=0}}),e.effect(()=>{let l=document.createElement("style");return l.dataset.plugin="dsh-pocket",l.dataset.pluginCss="dsh-pocket/mobile-extras.css",l.textContent=kc,document.head.appendChild(l),()=>{l.remove()}},"dsh-pocket: mobile extra styles (issue #17)"),g("dsh-pocket: settling watchdog (host reconnect leaves composer hidden)",()=>{let l="data-dshp-settling-stale",s=vi(),m=xi(),x=new Map,w=0,E=0,y=!1,v=()=>performance.now(),S=()=>{let O=e.connection,B=typeof O?.generation?.getSnapshot=="function";return gi({hasGeneration:B,generation:B?O.generation?.getSnapshot?.():void 0,state:B?void 0:O?.state?.getSnapshot?.()})},T=()=>{try{let O=e.sessions?.list?.getSnapshot?.();if(O===null||typeof O!="object")return;if(typeof O.current=="string")return O.current;for(let B in O.byId){let q=O.byId[B];if(q===void 0)continue;let ee=q.retainedBy?.mainView;if(typeof ee=="number"&&ee>0&&typeof q.id=="string")return q.id}}catch{}},u=O=>{if(O===void 0)return{};try{let B=e.sessions?.manager?.get?.(O);if(B===void 0)return{};let q=B.getSnapshot?.()?.openState;if(typeof q!="string")return{};let ee="openPromise"in B?B.openPromise===null||B.openPromise===void 0?"gone":"live":"unknown";return{openState:q,openPromise:ee}}catch{return{}}},b=()=>{try{let O=e.connection;typeof O?.reconnect=="function"&&O.reconnect()}catch{}},p=O=>{let B=O.getAttribute("data-conversation-session");if(typeof B=="string"&&B!=="")return B;let ee=O.querySelector("[data-conversation-session]")?.getAttribute("data-conversation-session");return typeof ee=="string"&&ee!==""?ee:void 0},c=(O,B)=>{O&&b();try{let q=(B===void 0?void 0:p(B))??T();if(q===void 0)return;let ee=e.sessions?.manager?.get?.(q);if(typeof ee?.resync!="function")return;ee.resync()}catch{}},C=O=>{let B=x.get(O);B!==void 0&&(window.clearTimeout(B),x.delete(O))},h=O=>O.getAttribute("data-phase")==="settling"?"data-phase":O.getAttribute("data-content-phase")==="settling"?"data-content-phase":null,k=O=>{if(y||!O.isConnected||h(O)===null)return;let B=p(O)??T(),q=s.decide(O,v(),u(B));if(q.repair&&c(q.reconnect,O),!q.stale){q.waiting&&_(O,q.remainingMs??2500);return}O.getAttribute(l)===null&&O.setAttribute(l,"")},_=(O,B=2500)=>{x.has(O)||x.set(O,window.setTimeout(()=>{x.delete(O),k(O)},Math.max(0,B)))},A='[data-phase="settling"],[data-content-phase="settling"]',L=()=>{if(w=0,y)return;let O=v(),B=document.querySelectorAll(A);for(let q of Array.from(document.querySelectorAll(`[${l}]`)))h(q)===null&&(q.removeAttribute(l),s.release(q));for(let q of Array.from(B))s.observe(q,O),_(q);for(let q of Array.from(x.keys()))(!q.isConnected||h(q)===null)&&(C(q),s.release(q))},M=()=>{w===0&&!y&&(w=requestAnimationFrame(L))},F=new MutationObserver(O=>{for(let B of O){if(B.type==="attributes"){M();return}for(let q of B.addedNodes)if(q.nodeType!==3){M();return}for(let q of B.removedNodes)if(q.nodeType!==3){M();return}}});F.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-phase","data-content-phase"]});let V=()=>{s.noteLink(S(),v());for(let O of Array.from(x.keys()))C(O);M()},X=[];for(let O of["generation","state"])try{let B=e.connection[O];typeof B?.subscribe=="function"&&X.push(B.subscribe(V))}catch{}let Y=()=>{s.noteResume(v());for(let O of Array.from(x.keys()))C(O);M()},Q=()=>{document.visibilityState==="visible"&&Y()},ne=O=>{O.persisted&&Y()};return document.addEventListener("visibilitychange",Q),window.addEventListener("pageshow",ne),E=window.setInterval(()=>{m.tick(v())&&Y()},m.intervalMs),L(),()=>{y=!0,F.disconnect();for(let O of X)O();document.removeEventListener("visibilitychange",Q),window.removeEventListener("pageshow",ne),E!==0&&window.clearInterval(E),m.reset(),w!==0&&cancelAnimationFrame(w);for(let O of x.values())window.clearTimeout(O);x.clear(),s.reset();for(let O of Array.from(document.querySelectorAll(`[${l}]`)))O.removeAttribute(l)}},"dsh-pocket: settling watchdog (host reconnect leaves composer hidden)"),g("dsh-pocket: link watchdog (silent disconnect never recovers)",()=>{let l=Ti(),s=!1,m=0,x=()=>performance.now(),w=L=>{try{document.dispatchEvent(new CustomEvent(fa,{detail:L}))}catch{}},E=0,y=()=>{try{let L=e.connection,M=typeof L?.generation?.getSnapshot=="function";return wi({hasGeneration:M,generation:M?L.generation?.getSnapshot?.():void 0,state:typeof L?.state?.getSnapshot=="function"?L.state.getSnapshot():void 0})}catch{return"up"}},v=()=>{try{let L=e.connection;typeof L?.reconnect=="function"&&L.reconnect()}catch{}},S=null,T=!1,u=0,b=()=>(S!==null&&S.isConnected||(S=document.createElement("div"),S.setAttribute("data-mobile-nav","link-banner"),S.setAttribute("role","status"),S.setAttribute("aria-live","polite"),S.style.cssText="position:fixed;left:50%;top:calc(env(safe-area-inset-top, 0px) + 10px);transform:translateX(-50%);z-index:2147483600;max-width:calc(100vw - 32px);padding:7px 14px;border-radius:999px;font:13px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff;box-shadow:0 4px 14px rgba(0,0,0,.22);pointer-events:none;white-space:nowrap;text-align:center",document.body.appendChild(S)),S),p=(L,M)=>{let F=b();F.textContent=L,F.style.background=M==="down"?"rgba(185,28,28,.96)":"rgba(21,128,61,.96)",F.style.display="block"},c=()=>{window.clearTimeout(u),u=0,S?.remove(),S=null,T=!1},C=()=>{if(s)return;let L=x(),M=l.isDown()&&l.downFor(L)>=_i;if(M!==T)if(T=M,M)window.clearTimeout(u),u=0,E=L-l.downFor(L),w({kind:"down"}),p(Ke(e,"linkDown","连接已断开，正在自动重连…"),"down");else{let F=E===0?0:Math.round(L-E);w({kind:"recover",ms:F}),E=0,F>=Ei?(p(Ke(e,"linkBack","✅ 已重新连接"),"back"),u=window.setTimeout(c,1400)):c()}},h=()=>{let L=M=>{s||(window.clearTimeout(m),m=0,l.noteProbe(M,x()),w({kind:"probe"}),C())};m=window.setTimeout(()=>L(!1),yi);try{let M=e.connection?.rpc;if(typeof M?.call!="function"){L(!0);return}Promise.resolve(M.call(ye,$.status,{})).then(()=>L(!0),()=>L(!1))}catch{L(!1)}},k=()=>{if(s)return;let L=x(),M=document.visibilityState==="visible";l.noteState(y(),L);let F=navigator.onLine!==!1;l.shouldForceReconnect(L,M&&F)&&v(),l.shouldProbe(L,M)&&h(),C()},_=window.setInterval(k,ki),A=()=>{document.visibilityState==="visible"&&k()};return document.addEventListener("visibilitychange",A),k(),()=>{s=!0,window.clearInterval(_),window.clearTimeout(m),c(),l.reset(),document.removeEventListener("visibilitychange",A)}},"dsh-pocket: link watchdog (silent disconnect never recovers)"),g("dsh-pocket: usage probe (2026-11-12)",()=>{let l=(()=>{try{let N="__dshp_probe__";return window.localStorage.setItem(N,"1"),window.localStorage.removeItem(N),window.localStorage}catch{return null}})(),s=(()=>{try{return Bi(l?.getItem(ma)??null)??Rt(Date.now())}catch{return Rt(Date.now())}})(),m=!1,x=!0,w=0,E="read",y="read",v=0,S=()=>{if(l!==null)try{l.setItem(ma,Fi(s))}catch{}},T=()=>{try{let N=document.createElement("div");N.style.cssText="position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)",(document.body??document.documentElement).appendChild(N);let H=window.getComputedStyle(N),K=be=>Math.round(Number.parseFloat(be)||0),te={top:K(H.paddingTop),right:K(H.paddingRight),bottom:K(H.paddingBottom),left:K(H.paddingLeft)};return N.remove(),te}catch{return{top:0,right:0,bottom:0,left:0}}},u=N=>{let H=navigator,K=/(?:iPhone|iPad|iPod).*?OS (\d+)[._](\d+)/.exec(H.userAgent)??/OS (\d+)[._](\d+) like Mac OS X/.exec(H.userAgent),te=(()=>{try{return window.matchMedia("(display-mode: standalone)").matches?"standalone":window.matchMedia("(display-mode: fullscreen)").matches?"fullscreen":"browser"}catch{return"browser"}})(),be=window.visualViewport,Ye=T();return{standalone:H.standalone===!0||te==="standalone",displayMode:te,ios:K===null?"":`${K[1]}.${K[2]}`,host:N,platform:typeof H.platform=="string"?H.platform:"",dpr:Number(window.devicePixelRatio)||0,screenW:Math.round(window.screen?.width??0),screenH:Math.round(window.screen?.height??0),viewportW:Math.round(be?.width??window.innerWidth),viewportH:Math.round(be?.height??window.innerHeight),safeTop:Ye.top,safeBottom:Ye.bottom,safeLeft:Ye.left,safeRight:Ye.right}},b='[class*="_composerSeat"],[class*="_composerStack"],[data-composer-seat]',p='[data-conversation-scroll],[class*="_scrollBody"]',c=()=>{let N=document.activeElement;return N instanceof HTMLElement?N.isContentEditable?!0:N.tagName!=="TEXTAREA"&&N.tagName!=="INPUT"?!1:N.closest(b)!==null:!1},C=()=>document.querySelector("[data-dshp-section]")!==null?"settings":document.querySelector("[data-sidebar-right-toggle]")!==null?"files":document.querySelector('[class*="_approval"]')!==null?"approve":c()?"type":"read",h=()=>{if(m||!x)return;let N=performance.now(),H=document.visibilityState==="visible";if(v!==0&&H){let K=Math.round(N-v);K>3e3?(Ni(s,K-1e3),ba(s,E,1e3)):ba(s,E,K)}E=C(),H&&E==="approve"&&y!=="approve"&&Se(s,"approvals"),y=E,v=N},k=N=>{let H=N instanceof Element?N:null;return H===null?"other":H.closest("[data-dshp-section]")!==null?"settings":H.closest('[class*="_approval"]')!==null?"approve":H.closest("[data-sidebar-right-toggle],[data-sidebar-right-expand]")!==null?"files":H.closest(b)!==null?"composer":H.closest(p)!==null?"conversation":H.closest("[data-mobile-nav]")!==null?"nav":H.closest('header,[class*="_titleBar"],[class*="_header"]')!==null?"header":H.closest('[class*="_sessionRow"],[data-sidebar],[class*="_sidebar"],[class*="_drawer"],[class*="_sheet"]')!==null?"panel":"other"},_=N=>{Ai(s,k(N.target));let H=N.target instanceof Element?N.target:null;H!==null&&H.closest('[class*="_sessionRow"]')!==null&&Se(s,"sessions")},A=new WeakMap,L=0,M=0,F=0,V=N=>{if(m){L=0;return}M!==0&&Oi(s,1,N-M>50?1:0),M=N,performance.now()<F?L=requestAnimationFrame(V):(L=0,M=0)},X=()=>{F=performance.now()+800,L===0&&!m&&(M=0,L=requestAnimationFrame(V))},Y=N=>{let H=N.target;if(!(H instanceof HTMLElement)||H.matches(p)===!1&&H.closest(p)===null)return;let K=A.get(H);if(A.set(H,H.scrollTop),X(),K===void 0)return;let te=Math.abs(H.scrollTop-K);te>0&&Se(s,"scrollPx",Math.min(te,2e4))},Q=new WeakMap,ne=N=>N instanceof HTMLTextAreaElement||N instanceof HTMLInputElement?N.value??"":N.textContent??"",O=N=>{let H=N.target;if(!(H instanceof HTMLElement)||H.closest(b)===null)return;let K=ne(H),te=Q.get(H)??"";Q.set(H,K),K.length>te.length&&Se(s,"chars",K.length-te.length),te.trim()!==""&&K.trim()===""&&Se(s,"sends")},B=Di.filter(N=>N.status==="host").map(N=>N.fragment),q=()=>{if(!(m||!x))try{let N=new Set;for(let K of Array.from(document.querySelectorAll("[class]"))){let te=K.getAttribute("class");if(te!==null)for(let be of te.split(/\s+/))be!==""&&N.add(be)}let H=Array.from(N).join(" ");Ii(s,B.filter(K=>H.includes(K)===!1))}catch{}},ee=N=>{gn(s,"error",N.message)},he=N=>{let H=N.reason;gn(s,"rejection",typeof H=="string"?H:H instanceof Error?H.message:String(H??""))},de=()=>{Pi(s)},Oe=N=>{let H=N.detail;H?.kind==="down"?Li(s,Date.now()):H?.kind==="recover"?Mi(s,typeof H.ms=="number"?H.ms:0):H?.kind==="probe"&&Ri(s)},ve=e.connection?.rpc,ct=(N,H)=>{try{return typeof ve?.call!="function"?Promise.resolve(null):Promise.resolve(ve.call(ye,N,H))}catch{return Promise.resolve(null)}},Ie=()=>{if(m||!x)return;w=Date.now(),S();let N=Hi(s);if(zi(N)>16384){s=wn(s),S();return}ct($.probeReport,{packet:N}).then(H=>{m||!x||!(H?.ok===!0&&H.value?.accepted===!0)||(s=wn(s),S())}).catch(()=>{})},$e=()=>{if(document.visibilityState==="visible"){v=performance.now();return}v!==0&&ba(s,E,Math.min(Math.round(performance.now()-v),1e3*2)),v=performance.now(),S(),Date.now()-w>6e4&&Ie()},Ze=N=>{N?.persisted===!0&&Se(s,"bfcache"),S(),Ie()},xe=window.setInterval(h,1e3),oe=window.setInterval(S,6e4),It=window.setInterval(Ie,3e5),Sa=window.setInterval(q,3e5),J=null;try{let N=PerformanceObserver.supportedEntryTypes;Array.isArray(N)&&N.includes("longtask")&&(J=new PerformanceObserver(H=>{Se(s,"longtasks",H.getEntries().length)}),J.observe({entryTypes:["longtask"]}))}catch{J=null}let pt=(N=!0)=>{m||(m=!0,window.clearInterval(xe),window.clearInterval(oe),window.clearInterval(It),window.clearInterval(Sa),document.removeEventListener("click",_,!0),document.removeEventListener("scroll",Y,!0),document.removeEventListener("input",O,!0),document.removeEventListener(fa,Oe),window.removeEventListener("offline",de),document.removeEventListener("visibilitychange",$e),window.removeEventListener("pagehide",Ze),window.removeEventListener("error",ee),window.removeEventListener("unhandledrejection",he),J?.disconnect(),L!==0&&(cancelAnimationFrame(L),L=0),N&&S())};return Se(s,"loads"),document.addEventListener("click",_,!0),document.addEventListener("scroll",Y,!0),document.addEventListener("input",O,!0),document.addEventListener(fa,Oe),window.addEventListener("offline",de),document.addEventListener("visibilitychange",$e),window.addEventListener("pagehide",Ze),window.addEventListener("error",ee),window.addEventListener("unhandledrejection",he),h(),q(),ct($.status,{}).then(N=>{if(m||N?.ok!==!0)return;let H=N.value?.probe;if(H!=null&&H.enabled===!1){x=!1;try{l?.removeItem(ma)}catch{}pt(!1);return}ct($.version,{}).then(K=>{if(m||K?.ok!==!0)return;let te=K.value,be=typeof te?.loaded=="string"?te.loaded:typeof te?.current=="string"?te.current:"";s=Ci(s,u(be)),S()}).catch(()=>{})}).catch(()=>{}),()=>pt()},"dsh-pocket: usage probe (2026-11-12)"),g("dsh-pocket: keyboard height css var (--dshp-kb)",()=>{let l=window.visualViewport;if(l==null)return()=>{};let s=document.documentElement,m=0,x="",w=0,E=!1,y=null,v=()=>(y!==null&&y.isConnected&&y.matches("[data-composer-seat]")&&y.getClientRects().length>0||(y=Array.from(document.querySelectorAll("[data-composer-seat]")).find(u=>u.getClientRects().length>0)??null),y),S=()=>{m=0;let u=Math.max(0,window.innerHeight-l.height-l.offsetTop),b=0;if(Math.abs(l.scale-1)<.01){let C=v();if(C!==null){let h=C.getBoundingClientRect().bottom+(E?w:0);b=Math.max(0,h-l.height)}}let p=Math.min(Math.max(u,b),Math.round(window.innerHeight*.6));w=p,E=p>0;let c=`${Math.round(p)}px`;c!==x&&(x=c,s.style.setProperty("--dshp-kb",c),p>0?s.setAttribute("data-dshp-kb","open"):s.removeAttribute("data-dshp-kb"))},T=()=>{m===0&&(m=requestAnimationFrame(S))};return l.addEventListener("resize",T),l.addEventListener("scroll",T),S(),()=>{l.removeEventListener("resize",T),l.removeEventListener("scroll",T),m!==0&&cancelAnimationFrame(m),y=null,s.style.removeProperty("--dshp-kb"),s.removeAttribute("data-dshp-kb")}}),g("dsh-pocket: first-visit tips",()=>{let l="dsh-pocket:first-visit-tips:v1",s=!0;try{s=window.localStorage.getItem(l)!==null}catch{}if(s)return()=>{};let m=()=>{try{window.localStorage.setItem(l,"1")}catch{}},x=null,w=0,E=()=>{m(),window.clearTimeout(w),w=0,x?.remove(),x=null};x=document.createElement("div"),x.setAttribute("data-mobile-nav","first-visit-tips"),x.setAttribute("role","dialog"),x.setAttribute("aria-label",Ke(e,"tipsTitle","这是电脑上 DSH 的手机界面")),x.style.cssText="position:fixed;left:12px;right:12px;bottom:calc(env(safe-area-inset-bottom, 0px) + 76px);z-index:2147483500;max-width:420px;margin:0 auto;padding:14px 16px;border-radius:14px;background:rgba(17,24,39,.97);color:#f9fafb;font:13px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.3)";let y=document.createElement("div");y.textContent=Ke(e,"tipsTitle","这是电脑上 DSH 的手机界面"),y.style.cssText="font-weight:600;font-size:14px;margin-bottom:6px";let v=document.createElement("div");v.textContent=Ke(e,"tipsBody",`与电脑实时同步，不是另一个应用。
· 右滑（或点左上角）打开会话抽屉
· 断线会自动重连，不用手动刷新
· 字号、键盘、右边栏都在设置页「手机访问」里`),v.style.cssText="white-space:pre-line;color:#d1d5db";let S=document.createElement("button");return S.type="button",S.textContent=Ke(e,"tipsDismiss","知道了"),S.style.cssText="margin-top:10px;padding:7px 12px;border:1px solid rgba(255,255,255,.28);border-radius:8px;background:transparent;color:#fff;font:13px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;cursor:pointer",S.addEventListener("click",E),x.append(y,v,S),document.body.appendChild(x),w=window.setTimeout(E,12e3),()=>{window.clearTimeout(w),x?.remove(),x=null}}),g("dsh-pocket: back to bottom pill",()=>{let s=null,m=0,x=!1,w=()=>{let C=document.querySelectorAll("[data-conversation-scroll]");for(let h of Array.from(C))if(h.getClientRects().length>0)return h;return null},E=()=>{let C=Array.from(document.querySelectorAll("[data-composer-seat]")).find(h=>h.getClientRects().length>0)??null;return C===null?92:Math.max(12,window.innerHeight-C.getBoundingClientRect().top+12)},y=()=>(s!==null&&s.isConnected||(s=document.createElement("button"),s.type="button",s.setAttribute("data-mobile-nav","back-to-bottom"),s.setAttribute("aria-label",Ke(e,"backToBottom","回到底部")),s.textContent="↓",s.style.cssText="position:fixed;right:14px;z-index:2147483400;width:40px;height:40px;border-radius:50%;border:1px solid rgba(0,0,0,.08);background:rgba(255,255,255,.96);color:#111827;font:18px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.18);display:none;align-items:center;justify-content:center;padding:0;cursor:pointer;-webkit-tap-highlight-color:transparent",s.addEventListener("click",()=>{let C=w();if(C!==null)try{C.scrollTo({top:C.scrollHeight,behavior:"smooth"})}catch{C.scrollTop=C.scrollHeight}v()}),document.body.appendChild(s)),s),v=()=>{x&&(x=!1,s!==null&&(s.style.display="none"))},S=()=>{if(s===null)return;let C=`${E()}px`;s.style.bottom!==C&&(s.style.bottom=C)},T=()=>{if(m=0,document.visibilityState!=="visible"){v();return}let C=w();if(C===null||C.scrollHeight-C.scrollTop-C.clientHeight<=280){v();return}let h=y();x||(S(),h.style.display="flex",x=!0)},u=()=>{S(),b()},b=()=>{m===0&&(m=requestAnimationFrame(T))},p=C=>{let h=C.target;h instanceof Element&&h.closest("[data-conversation-scroll]")!==null&&b()};document.addEventListener("scroll",p,{capture:!0,passive:!0}),window.addEventListener("resize",u),window.visualViewport?.addEventListener("resize",u);let c=window.setInterval(b,1200);return b(),()=>{m!==0&&cancelAnimationFrame(m),window.clearInterval(c),document.removeEventListener("scroll",p,!0),window.removeEventListener("resize",u),window.visualViewport?.removeEventListener("resize",u),s?.remove(),s=null,x=!1}}),g("dsh-pocket: standalone viewport guard (scroll residue / short layout viewport)",()=>{let l=window.visualViewport;if(l==null)return()=>{};let s=document.documentElement,m=0,x=0,w=!1,E=null,y=0,v=new URLSearchParams(window.location.search).has("dshp-diag"),S=b=>{E===null&&(E=document.createElement("div"),E.dataset.dshPocketDiag="1",E.style.cssText="position:fixed;top:calc(env(safe-area-inset-top, 0px) + 2px);left:2px;z-index:2147483647;font:10px/1.4 ui-monospace,Menlo,Consolas,monospace;background:rgba(0,0,0,.65);color:#4ade80;padding:2px 6px;border-radius:4px;pointer-events:none;white-space:normal;width:calc(100vw - 8px);word-break:break-all",document.body.appendChild(E));let p=Array.from(document.querySelectorAll("[data-composer-seat]")).find(M=>M.getClientRects().length>0)??null,c=p?.closest("[data-conversation-scroll]")??null,C=c?.querySelector('[class*="_viewArea"]')??null,h=" va=-/col=-/nz=-";if(C!==null){h=` va=${Math.round(C.getBoundingClientRect().height)}/col=-/nz=-`;let M=C;for(let F=0;F<6&&M!==null;F+=1){if(M.children.length>10){let V=Array.from(M.children).filter(X=>X.offsetHeight>0).length;h=` va=${Math.round(C.getBoundingClientRect().height)} col=${Math.round(M.getBoundingClientRect().height)} nz=${V}/${M.children.length}`;break}M=M.firstElementChild}}let k=c===null?"":` sb=${c.clientHeight}/${c.scrollHeight}@${Math.round(c.scrollTop)}`,_=p===null?"":` seatB=${Math.round(p.getBoundingClientRect().bottom)}`,A=getComputedStyle(s).getPropertyValue("--dshp-kb").trim()||"0px",L=s.hasAttribute("data-dshp-kb")?1:0;E.textContent=`tag=1014.3 ih=${window.innerHeight} vv=${Math.round(l.height)} off=${Math.round(l.offsetTop)} sc=${l.scale.toFixed(2)} sy=${window.scrollY}${k}${_}${h} kbc=${A}/f=${L}`,b&&(window.clearTimeout(y),y=window.setTimeout(()=>{E?.remove(),E=null},8e3))},T=()=>{m=0;let b=l.height>=window.innerHeight-8;if(Math.abs(l.scale-1)<.01&&l.height-window.innerHeight>8){if(x===0&&(x=performance.now()),!w&&performance.now()-x>600){w=!0,s.style.setProperty("--dshp-frame-h",`${Math.round(l.height)}px`),s.style.setProperty("--dshp-vh-diff",`${Math.round(l.height-window.innerHeight)}px`),s.setAttribute("data-dsh-pocket-full-height","");let c=Array.from(document.querySelectorAll("[data-conversation-scroll]")).find(C=>C.getClientRects().length>0)??null;c!==null&&c.scrollHeight-c.scrollTop-c.clientHeight<=8&&requestAnimationFrame(()=>{w&&c.isConnected&&(c.scrollTop=c.scrollHeight)}),S(!0)}}else x=0,w&&(w=!1,s.style.removeProperty("--dshp-frame-h"),s.style.removeProperty("--dshp-vh-diff"),s.removeAttribute("data-dsh-pocket-full-height"));!w&&b&&(window.scrollY>1||l.offsetTop>1)&&window.scrollTo(0,0),v&&S(!1)},u=()=>{m===0&&(m=requestAnimationFrame(T))};return l.addEventListener("resize",u),l.addEventListener("scroll",u),window.addEventListener("focusout",u),window.addEventListener("pageshow",u),T(),()=>{l.removeEventListener("resize",u),l.removeEventListener("scroll",u),window.removeEventListener("focusout",u),window.removeEventListener("pageshow",u),m!==0&&cancelAnimationFrame(m),window.clearTimeout(y),E?.remove(),s.style.removeProperty("--dshp-frame-h"),s.style.removeProperty("--dshp-vh-diff"),s.removeAttribute("data-dsh-pocket-full-height")}}),g("dsh-pocket: file open guard + copy button + hide add-workspace (issue #17)",()=>{let l=()=>{try{let w=e.sessions?.list?.getSnapshot?.();if(w===null||typeof w!="object")return;if(typeof w.current=="string")return w.current;for(let E in w.byId){let y=w.byId[E];if(y===void 0)continue;let v=y.retainedBy?.mainView;if(typeof v=="number"&&v>0&&typeof y.id=="string")return y.id}}catch{}},s=()=>{try{let E=(e.get?.("workspaces")??e.workspaces)?.list,y=Array.isArray(E)?E:E&&typeof E=="object"&&"value"in E?E.value:null;if(Array.isArray(y))for(let v of y){let S=v?.cwd??v?.root;if(typeof S=="string"&&S)return S}}catch{}return""},m=w=>{let E=l();return e.connection.rpc.call(ye,$.fileRead,{path:w,cwd:s(),...E===void 0?{}:{sessionId:E}})},x=e.locale.bind(dt);return mi(m,x)})}var I=require("react");function ce(e,t,a){let n=e(t);if(a)for(let[o,r]of Object.entries(a))n=String(n).split(`{${o}}`).join(String(r));return n}async function Ui(e,t,a){if(typeof AbortSignal<"u"&&typeof AbortSignal.timeout=="function")return fetch(e,{...t,signal:AbortSignal.timeout(a)});let n=new AbortController,o=setTimeout(()=>n.abort(),a);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(o)}}function Gi(e,t){return new Promise(a=>{if(t?.aborted){a();return}let n=()=>{clearTimeout(o),t?.removeEventListener?.("abort",n),a()},o=setTimeout(n,e);t?.addEventListener?.("abort",n,{once:!0})})}function xa(e){let t=e!==!1;document.body?.setAttribute(ut,t?"on":"off"),window.dispatchEvent(new CustomEvent(mt,{detail:{enabled:t}}))}function ya(e){let t=e===!0;document.body?.setAttribute(Je,t?"on":"off"),window.dispatchEvent(new CustomEvent(ft,{detail:{enabled:t}}))}var ji=[0,...Array.from({length:11},(e,t)=>12+t)];function ka(e){let t=Number(e),a=Number.isInteger(t)&&t>=12&&t<=22;a?(document.body?.style.setProperty(He,`${t}px`),document.body?.setAttribute(Ne,String(t))):(document.body?.style.removeProperty(He),document.body?.removeAttribute(Ne)),window.dispatchEvent(new CustomEvent(bt,{detail:{size:a?t:0}}))}async function _a(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:0;left:0;opacity:0",document.body.appendChild(t),t.select();let a=document.execCommand("copy");return t.remove(),a===!0}catch{return!1}}function Ot(e){let t=Number(e)||0;return t>=1024*1024?`${(t/1024/1024).toFixed(1)} MB`:`${Math.round(t/1024)} KB`}var Ki=(e,t)=>e?Math.max(0,Math.floor((t-e)/1e3)):0,Xi=e=>t=>{let a=String(t??""),n=a.indexOf(" | ");return n<0?a:(e("ok")===ga.ok?a.slice(0,n):a.slice(n+3)).trim()};var G=require("react"),_c=Ca(require("@deepseek-ai/dsh-client-ui-primitives"),1);var pe=e=>{let t=_c??{};for(let a of e)if(typeof t[a]=="function")return t[a];return()=>null},Z={settings:pe(["IconSettingsOutlineRegular","IconSettingsOutline16"]),lan:pe(["IconLinkOutlineRegular","IconLinkOutline16"]),wan:pe(["IconGlobeOutlineRegular","IconGlobeOutline16"]),pin:pe(["IconShieldOutlineRegular","IconShieldOutline16"]),sliders:pe(["IconSlidersTwoOutlineRegular","IconSlidersTwoOutline16"]),trash:pe(["IconTrashOutlineRegular","IconTrashOutline16"]),copy:pe(["IconCopyOutlineRegular","IconCopyOutline16"]),refresh:pe(["IconRefreshOutlineRegular","IconRefreshOutline16"]),download:pe(["IconDownloadOutlineRegular","IconDownloadOutline16"]),warn:pe(["IconWarningOutlineRegular","IconWarningOutline16"]),info:pe(["IconInfoOutlineRegular","IconInfoOutline16"]),check:pe(["IconCheckCircleOutlineRegular","IconCheckCircleOutline16"]),chevron:pe(["IconChevronDownOutlineRegular","IconChevronDownOutline16"]),lite:pe(["IconSmartphoneOutlineRegular","IconDeviceMobileOutlineRegular","IconMobileOutline16"])},Xe=(e,t,a,n=null)=>(0,G.createElement)("button",{role:"switch",type:"button","aria-checked":!!e,disabled:a===!0,"aria-label":n??void 0,className:"dshp-switch",onClick:a===!0?void 0:t},(0,G.createElement)("span",{className:"dshp-switch-thumb"})),j=(e,...t)=>{let{variant:a="ghost",mini:n=!1,icon:o=null,children:r,...i}=e??{},d=t.length>0?t:r;return(0,G.createElement)("button",{type:"button",...i,className:`dshp-btn is-${a}${n?" is-mini":""}`},o?(0,G.createElement)(o,{size:n?12:14}):null,d)},vn=({on:e,children:t})=>(0,G.createElement)("span",{className:`dshp-chip${e?" is-on":""}`},(0,G.createElement)("span",{className:"dshp-chip-dot"}),t),Pe=({icon:e,title:t,sub:a,right:n,children:o,danger:r=!1,key:i})=>(0,G.createElement)("section",{className:`dshp-card${r?" is-danger":""}`,"data-dshp-section":i??""},(0,G.createElement)("div",{className:"dshp-card-head"},e?(0,G.createElement)("span",{className:"dshp-card-icon"},(0,G.createElement)(e,{size:16})):null,(0,G.createElement)("div",{className:"dshp-card-text"},(0,G.createElement)("div",{className:"dshp-card-title"},t),a?(0,G.createElement)("div",{className:"dshp-card-sub"},a):null),n??null),o?(0,G.createElement)("div",{className:"dshp-card-body"},o):null),fe=({label:e,desc:t,control:a,extra:n,stack:o=!1})=>(0,G.createElement)("div",{className:`dshp-row${o?" is-stack":""}`},(0,G.createElement)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,rowGap:8,flexWrap:"wrap",minWidth:0,width:"100%"}},(0,G.createElement)("div",{style:{minWidth:0}},(0,G.createElement)("div",{className:"dshp-row-label"},e),t?(0,G.createElement)("div",{className:"dshp-row-desc"},t):null),a??null),n??null),ge=({kind:e="info",icon:t=null,children:a,title:n=null,extra:o=null})=>(0,G.createElement)("div",{className:`dshp-alert is-${e}`},t?(0,G.createElement)("span",{className:"dshp-alert-icon"},(0,G.createElement)(t,{size:14})):null,(0,G.createElement)("div",{className:"dshp-alert-body"},n?(0,G.createElement)("div",{className:"dshp-alert-title"},n):null,a,o??null)),Ea=({src:e,url:t,hint:a,t:n,toast:o})=>(0,G.createElement)("div",{className:"dshp-qr"},(0,G.createElement)("div",{className:"dshp-qr-frame"},e?(0,G.createElement)("img",{src:e,alt:"QR"}):null),(0,G.createElement)("div",{className:"dshp-qr-main"},(0,G.createElement)("div",{className:"dshp-url"},t),a?(0,G.createElement)("div",{className:"dshp-qr-hint"},a):null,(0,G.createElement)("div",{className:"dshp-qr-actions"},j({variant:"ghost",mini:!0,icon:Z.copy,onClick:async()=>o(await _a(t)?n("copied"):n("copyFailed"))},n("copyLink"))))),Ta=({title:e,tone:t="warn",children:a,actions:n,onClose:o})=>(0,G.createElement)("div",{className:"dshp-modal-backdrop",onClick:r=>{r.target===r.currentTarget&&o?.()}},(0,G.createElement)("div",{className:"dshp-modal",role:"dialog","aria-modal":"true","aria-label":e},(0,G.createElement)("div",{className:`dshp-modal-title is-${t}`},e),a,(0,G.createElement)("div",{className:"dshp-modal-actions"},n)));function $i(e){let{t,status:a,pending:n,publicView:o,errText:r,showToast:i,elapsed:d}=e,f=(u,b,p)=>(0,I.createElement)("div",{className:"dshp-pinbox"},(0,I.createElement)("span",{className:"dshp-pin-value","data-dshp-pin":u},e.pinShown[u]?b:"••••••••"),j({variant:"ghost",mini:!0,onClick:()=>e.setPinShown(c=>({...c,[u]:!c[u]}))},e.pinShown[u]?t("pinHide"):t("pinShow")),...p??[]),g=u=>(0,I.createElement)("div",{className:"dshp-adv"},(0,I.createElement)("div",{className:"dshp-custom"},(0,I.createElement)("span",null,t("customizing")),(0,I.createElement)("input",{className:"dshp-input is-mono",style:{width:150,textAlign:"center"},type:"password",minLength:8,maxLength:64,name:"dsh-pocket-pin",autoComplete:"new-password",spellCheck:!1,value:e.customPin?.value??"",autoFocus:!0,onChange:b=>{let p=b.target.value,c=p.replace(/[^a-zA-Z0-9]/g,"");e.setCustomPin(C=>({...C,value:c,err:c.length===p.length?null:t("pinCharsFiltered")}))},onKeyDown:b=>{b.key==="Enter"&&e.saveCustomPin(u),b.key==="Escape"&&e.setCustomPin(null)}}),j({variant:"primary",mini:!0,onClick:()=>e.saveCustomPin(u),disabled:n.savePin===!0},t("save")),j({variant:"ghost",mini:!0,onClick:()=>e.setCustomPin(null),disabled:n.savePin===!0},t("cancel"))),e.customPin?.err?(0,I.createElement)("div",{className:"dshp-err-text"},r(e.customPin.err)):null),l=u=>j({variant:"ghost",mini:!0,onClick:()=>e.setCustomPin({which:u,value:"",err:null})},t("customize")),s=e.tunnelStarting?ge({kind:"info",icon:Z.info,children:e.tunnelPhase==="downloading"?ce(t,"downloading",{s:d(e.tunnelStateStarted)}):ce(t,"connecting",{s:d(e.tunnelStateStarted),suffix:d(e.tunnelStateStarted)>30?t("slowHint"):""})}):e.tunnelPhase==="error"?ge({kind:"error",icon:Z.warn,children:ce(t,"error",{detail:r(e.tunnelStateDetail)||t("unknownError")})}):!e.tunnelUrl&&e.publicConfigured?ge({kind:"info",icon:Z.info,children:t("wanOffHint"),extra:(0,I.createElement)("div",{style:{marginTop:8}},j({variant:"primary",onClick:e.startTunnel,disabled:n.wan===!0||n.saveNamed===!0},t("enable")))}):null,m=e.publicConfigured&&!e.tunnelCfg?(0,I.createElement)("div",{className:"dshp-panel"},(0,I.createElement)("div",{style:{display:"flex",alignItems:"flex-start",gap:10}},(0,I.createElement)("div",{style:{flex:1,minWidth:0}},(0,I.createElement)("div",{className:"dshp-panel-title"},e.tunnelConfig.hostname||"—"),(0,I.createElement)("div",{className:"dshp-hint",style:{marginTop:2}},e.tunnelConfig.tokenSet?t("namedTokenSet"):t("namedTokenMissing"))),j({variant:"ghost",mini:!0,onClick:()=>e.setTunnelCfg({hostname:e.tunnelConfig.hostname??"",token:"",err:null})},t("namedEdit"))),(0,I.createElement)("div",{className:"dshp-hint",style:{marginTop:8,lineHeight:1.65}},t("namedHow")),!e.tunnelConfig.tokenSet||!e.tunnelConfig.hostname?(0,I.createElement)("div",{className:"dshp-err-text"},t("namedNeedCfg")):null):null,x=e.tunnelCfg?(0,I.createElement)("div",{className:"dshp-form"},(0,I.createElement)("label",{className:"dshp-field"},t("namedHostnameLabel"),(0,I.createElement)("input",{className:"dshp-input",placeholder:"pocket.example.com",value:e.tunnelCfg.hostname??"",autoFocus:!0,onChange:u=>e.setTunnelCfg(b=>({...b,hostname:u.target.value.trim(),err:null})),onKeyDown:u=>{u.key==="Enter"&&e.saveNamedTunnel(),u.key==="Escape"&&e.setTunnelCfg(null)}})),(0,I.createElement)("label",{className:"dshp-field"},t("namedTokenLabel"),(0,I.createElement)("input",{className:"dshp-input is-mono",type:"password",name:"dsh-pocket-tunnel-token",autoComplete:"off",spellCheck:!1,value:e.tunnelCfg.token??"",onChange:u=>e.setTunnelCfg(b=>({...b,token:u.target.value.trim(),err:null})),onKeyDown:u=>{u.key==="Enter"&&e.saveNamedTunnel(),u.key==="Escape"&&e.setTunnelCfg(null)}})),(0,I.createElement)("div",{className:"dshp-inline"},j({variant:"primary",mini:!0,onClick:e.saveNamedTunnel,disabled:n.saveNamed===!0},t("save")),j({variant:"ghost",mini:!0,onClick:()=>e.setTunnelCfg(null),disabled:n.saveNamed===!0},t("cancel"))),(0,I.createElement)("div",{className:"dshp-hint"},t("namedHow")),(0,I.createElement)("div",{className:"dshp-warn-text"},t("namedSecurity")),e.tunnelCfg.err?(0,I.createElement)("div",{className:"dshp-err-text"},r(e.tunnelCfg.err)):null):null,w=(0,I.createElement)("div",{className:"dshp-adv"},e.tunnelConfigChanged?(0,I.createElement)("div",{className:"dshp-warn-text"},t("namedTakeEffect")):null,!e.publicConfigured&&!e.tunnelCfg?ge({kind:"info",icon:Z.info,children:t("publicSetupHint"),extra:(0,I.createElement)("div",{style:{marginTop:8}},j({variant:"primary",onClick:e.openTunnelConfig},t("publicConfigure")))}):null,m,x),E=a?.accessToken?fe({label:t("pinLabel"),stack:!0,extra:e.customPin?.which==="public"?g("public"):(0,I.createElement)("div",null,f("public",a.accessToken,[l("public")]),(0,I.createElement)("div",{className:"dshp-warn-text"},t("namedSecurity")))}):null,y=(0,I.createElement)("div",null,e.tunnelUrl?Ea({src:a.tunnelQr,url:e.tunnelUrl,hint:t("namedRunningHint"),t,toast:i}):null,fe({label:t("publicConfig"),stack:!0,extra:w}),e.publicConfigured||e.tunnelUrl?E:null),v=Pe({key:"lan",icon:Z.lan,title:t("lanAccess"),sub:t("lanHint"),right:Xe(a?.lanEnabled!==!1,()=>e.requestLanToggle(a?.lanEnabled===!1),!a||n.lanToggle===!0||o,t("lanAccess")),children:o?(0,I.createElement)("div",{className:"dshp-hint"},t("lanLocalOnly")):a?a.lanEnabled===!1?ge({kind:"info",icon:Z.info,children:t("lanDisabledHint"),extra:(0,I.createElement)("div",{style:{marginTop:8}},j({variant:"primary",onClick:()=>e.requestLanToggle(!0),disabled:n.lanToggle===!0},t("lanToggleTitleOn")))}):e.lanUrl?(0,I.createElement)("div",null,Ea({src:a.lanQr,url:e.lanUrl,hint:null,t,toast:i}),fe({label:t("lanPin"),desc:a?.lanAuthEnabled===!1?t("lanPinOff"):null,control:Xe(a?.lanAuthEnabled!==!1,()=>e.setLanAuth(a?.lanAuthEnabled===!1),n.lanAuth===!0,t("lanPin"))}),a?.lanAuthEnabled===!1?null:e.customPin?.which==="lan"?g("lan"):a.lanToken?(0,I.createElement)("div",null,f("lan",a.lanToken,[j({variant:"ghost",mini:!0,icon:Z.refresh,onClick:e.refreshLanPin,disabled:n.refreshPin===!0},t("refresh")),l("lan")]),a.lanPinCustom?(0,I.createElement)("div",{className:"dshp-warn-text"},t("pinCustomHint")):null):(0,I.createElement)("div",{className:"dshp-hint"},t(o?"lanPinRemoteHint":"lanPinUnavailable")),fe({label:t("advAddress"),control:j({variant:"ghost",mini:!0,onClick:()=>e.setAdvOpen(u=>!u)},(a.lanIpOverride||t("lanAddressAuto"))+(e.advOpen?" ‹":" ›")),extra:e.advOpen?(0,I.createElement)("div",{className:"dshp-adv"},(0,I.createElement)("label",{className:"dshp-field"},t("lanAddress"),(0,I.createElement)("select",{className:"dshp-select",value:a.lanIpOverride||"",disabled:n.lanAddr===!0,onChange:u=>e.setLanAddress(u.target.value)},(0,I.createElement)("option",{value:""},t("lanAddressAuto")),(a.lanCandidates||[]).map(u=>(0,I.createElement)("option",{key:u,value:u},u))))):null}),(0,I.createElement)("div",{className:"dshp-hint"},t("lanDebugHint"))):(0,I.createElement)("div",{className:"dshp-hint"},t("lanStarting")):(0,I.createElement)("div",{className:"dshp-loading"},t("loadingStatus"))}),S=Pe({key:"lite",icon:Z.lite,title:t("liteTitle"),sub:t("liteHint"),children:(0,I.createElement)("div",null,fe({label:t("liteAddress"),desc:t("liteAddressHint"),control:j({variant:"ghost",mini:!0,icon:Z.copy,onClick:async()=>i(await _a(e.liteUrl)?t("copied"):t("copyFailed"))},t("copyLink"))}),(0,I.createElement)("div",{className:"dshp-hint",style:{wordBreak:"break-all"}},e.liteUrl),(0,I.createElement)("div",{className:"dshp-inline",style:{marginTop:10}},j({variant:"primary",mini:!0,icon:Z.lite,onClick:()=>{window.open(e.liteUrl,"_blank","noopener")}},t("liteOpen"))))}),T=Pe({key:"wan",icon:Z.wan,title:t("wanAccess"),sub:t("namedWanHint"),right:Xe(!!e.tunnelUrl,()=>e.tunnelUrl?e.stopTunnel():e.startTunnel(),e.tunnelStarting||n.wan===!0||n.saveNamed===!0||!a||o,t("wanAccess")),children:o?(0,I.createElement)("div",null,e.tunnelUrl?Ea({src:a?.tunnelQr,url:e.tunnelUrl,hint:t("namedRunningHint"),t,toast:i}):null,(0,I.createElement)("div",{className:"dshp-hint"},t("wanLocalOnly"))):a?(0,I.createElement)("div",null,s,y):(0,I.createElement)("div",{className:"dshp-loading"},t("loadingStatus"))});return[v,S,T]}function Zi(e){let{t,status:a,pending:n}=e;return[Pe({key:"prefs",icon:Z.sliders,title:t("prefsTitle"),sub:t("prefsHint"),children:a?(0,I.createElement)("div",null,fe({label:t("mobileRightbar"),desc:t("mobileRightbarHint"),control:Xe(a.mobileRightbarEnabled!==!1,()=>e.setMobileRightbar(a.mobileRightbarEnabled===!1),n.prefs===!0,t("mobileRightbar"))}),fe({label:t("mobilePinchZoom"),desc:t("mobilePinchZoomHint"),control:Xe(a.mobilePinchZoomEnabled===!0,()=>e.setMobilePinchZoom(a.mobilePinchZoomEnabled!==!0),n.prefs===!0,t("mobilePinchZoom"))}),fe({label:t("mobileFontSize"),desc:t("mobileFontSizeHint"),control:(0,I.createElement)("select",{className:"dshp-select",value:String(Number(a.mobileFontSize)||0),disabled:n.prefs===!0,onChange:o=>e.setMobileFontSize(Number(o.target.value))},ji.map(o=>(0,I.createElement)("option",{key:o,value:String(o)},o===0?t("mobileFontFollow"):o+" px")))})):(0,I.createElement)("div",{className:"dshp-loading"},t("loadingStatus"))})]}function Yi(e){let{t,status:a,pending:n,publicView:o}=e,r=[];return a?.cache&&r.push(Pe({key:"cache",icon:Z.refresh,title:t("cacheTitle"),sub:t("cacheSub"),children:fe({label:ce(t,"cacheUsage",{used:Ot(a.cache.bytes),budget:Ot(a.cache.budgetBytes)}),desc:ce(t,"cacheEntries",{n:a.cache.entries??0}),control:j({variant:"ghost",mini:!0,icon:Z.trash,onClick:e.clearCache,disabled:n.cache===!0},t("cacheClear"))})})),a?.probe&&a.origin!=="public"&&r.push(Pe({key:"probe",icon:Z.info,title:t("probeTitle"),sub:t("probeSub"),children:(0,I.createElement)("div",null,fe({label:t("probeEnabled"),desc:t("probeEnabledHint"),control:Xe(a.probe.enabled!==!1,()=>e.setProbe(a.probe.enabled===!1),n.probe===!0,t("probeEnabled"))}),fe({label:ce(t,"probeUsage",{used:Ot(a.probe.bytes),budget:Ot(a.probe.maxBytes)}),desc:ce(t,"probeWhere",{n:a.probe.packets??0,path:a.probe.path??""})+(a.probe.lastAt?" · "+ce(t,"probeLast",{when:new Date(a.probe.lastAt).toLocaleString()}):" · "+t("probeEmpty")),control:j({variant:"ghost",mini:!0,icon:Z.trash,onClick:e.clearProbe,disabled:n.probe===!0},t("probeClear"))}))})),r.push(Pe({key:"reset",icon:Z.trash,title:t("resetFactory"),sub:t("resetIntro"),danger:!0,right:o?(0,I.createElement)("div",{className:"dshp-hint"},t("resetLocalOnly")):j({variant:"danger",mini:!0,onClick:()=>e.setResetOpen(!0),disabled:n.reset===!0},t("resetGo"))})),r.push((0,I.createElement)("footer",{className:"dshp-footer"},e.versionInfo?.current?(0,I.createElement)("span",{title:t("updateHint")},ce(t,"versionLine",{ver:e.versionInfo.current})):null,e.versionInfo?.current?(0,I.createElement)("span",null,"·"):null,(0,I.createElement)("a",{href:"https://github.com/daha1216/dsh-pocket#-怎么用",target:"_blank",rel:"noreferrer",title:t("updateHint")},t("updateDocLink")),(0,I.createElement)("span",null,"·"),(0,I.createElement)("span",null,t("developer")),(0,I.createElement)("span",null,"·"),(0,I.createElement)("a",{href:"https://github.com/daha1216/dsh-pocket",target:"_blank",rel:"noreferrer",title:t("starAsk")},t("starCta")),(0,I.createElement)("span",null,"·"),(0,I.createElement)("a",{href:"https://github.com/daha1216/dsh-pocket/issues",target:"_blank",rel:"noreferrer"},t("feedback")))),r}function Qi(e){let{t,pending:a}=e;return[e.resetOpen?Ta({title:t("resetTitle"),tone:"danger",onClose:()=>e.setResetOpen(!1),children:(0,I.createElement)("div",{className:"dshp-modal-body"},t("resetBody")),actions:(0,I.createElement)("div",{className:"dshp-inline"},j({variant:"ghost",mini:!0,autoFocus:!0,onClick:()=>e.setResetOpen(!1)},t("cancel")),j({variant:"danger",mini:!0,onClick:e.doFactoryReset,disabled:a.reset===!0},t("resetConfirm")))}):null,e.lanToggleOpen!==null?Ta({title:t(e.lanToggleOpen?"lanToggleTitleOn":"lanToggleTitleOff"),tone:e.lanToggleOpen?"brand":"warn",onClose:()=>e.setLanToggleOpen(null),children:(0,I.createElement)("div",{className:"dshp-modal-body"},t(e.lanToggleOpen?"lanToggleBodyOn":"lanToggleBodyOff")),actions:(0,I.createElement)("div",{className:"dshp-inline"},j({variant:"ghost",mini:!0,autoFocus:!0,onClick:()=>e.setLanToggleOpen(null)},t("cancel")),j({variant:"primary",mini:!0,onClick:e.confirmLanToggle},t("confirm")))}):null,e.disclaimerOpen?Ta({title:t("disclaimerTitle"),tone:"warn",onClose:()=>e.setDisclaimerOpen(!1),children:(0,I.createElement)("div",null,(0,I.createElement)("div",{className:"dshp-modal-body"},t("disclaimerBody")),(0,I.createElement)("label",{className:"dshp-check"},(0,I.createElement)("input",{type:"checkbox",checked:e.disclaimerChecked,onChange:n=>e.setDisclaimerChecked(n.target.checked)}),t("disclaimerAgree")),e.disclaimerChecked?null:(0,I.createElement)("div",{className:"dshp-err-text",style:{marginTop:8}},t("disclaimerHint"))),actions:(0,I.createElement)("div",{className:"dshp-inline"},j({variant:"ghost",mini:!0,autoFocus:!0,onClick:()=>e.setDisclaimerOpen(!1)},t("cancel")),j({variant:"primary",mini:!0,disabled:!e.disclaimerChecked,onClick:e.confirmDisclaimer},t("disclaimerAgree")))}):null,e.toast?(0,I.createElement)("div",{className:"dshp-toast",role:"status","aria-live":"polite"},e.toast):null]}var W=require("react");var xn=`
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
`;function es(e,t){let[a,n]=(0,W.useState)(null),[o,r]=(0,W.useState)(null),[i,d]=(0,W.useState)(null),[f,g]=(0,W.useState)(!1),[l,s]=(0,W.useState)(null),[m,x]=(0,W.useState)(!1),[w,E]=(0,W.useState)(!1),[y,v]=(0,W.useState)(Date.now()),[S,T]=(0,W.useState)({}),[u,b]=(0,W.useState)(!1),[p,c]=(0,W.useState)({}),[C,h]=(0,W.useState)(!1),[k,_]=(0,W.useState)(!1),[A,L]=(0,W.useState)(!1),[M,F]=(0,W.useState)(null),[V,X]=(0,W.useState)(!1),[Y,Q]=(0,W.useState)(null),[ne,O]=(0,W.useState)(null),[B,q]=(0,W.useState)(!1),[ee,he]=(0,W.useState)(null),de=(0,W.useRef)(0),Oe=(0,W.useRef)(0),ve=(0,W.useRef)(0),ct=(0,W.useRef)({}),Ie=(0,W.useRef)(null),$e=(0,W.useRef)(null),Ze=(0,W.useRef)(null),xe=R=>n(P=>P&&{...P,...R}),oe=async(R,P)=>{Oe.current=Date.now();let z=ct.current;z[R]=(z[R]??0)+1,c(we=>we[R]===!0?we:{...we,[R]:!0});try{return await P()}finally{z[R]=Math.max(0,(z[R]??1)-1),z[R]===0&&(delete z[R],c(we=>{if(we[R]!==!0)return we;let Qe={...we};return delete Qe[R],Qe}))}};(0,W.useEffect)(()=>{let R="dshp-settings-css",P=document.getElementById(R);P&&P.tagName!=="STYLE"&&(P=null),P||(P=document.createElement("style"),P.id=R,document.head.appendChild(P)),P.textContent!==xn&&(P.textContent=xn)},[]);let It=!!(l?.restarting&&l?.startedAt||i?.startedAt&&["downloading","starting","registering"].includes(i?.phase??""));(0,W.useEffect)(()=>{if(!It)return;let R=setInterval(()=>v(Date.now()),1e3);return()=>clearInterval(R)},[It]);let Sa=R=>Ki(R,y),J=async(R,P)=>{let z=await e(R,P,typeof AbortSignal<"u"&&typeof AbortSignal.timeout=="function"?AbortSignal.timeout(3e4):void 0);if(!z?.ok)throw new Error(z?.error?.message??"RPC failed");return z.value};(0,W.useEffect)(()=>()=>{Ie.current?.abort()},[]);let pt=async()=>{Ie.current?.abort();let R=new AbortController;Ie.current=R;let P=Date.now()+3e4;for(;Date.now()<P&&!R.signal.aborted;){try{if((await Ui(location.href,{method:"GET",cache:"no-store"},3e3)).ok){R.signal.aborted||location.reload();return}}catch{}await Gi(1e3,R.signal)}R.signal.aborted||b(!0)},N=async()=>{let R=Date.now(),P=++ve.current;try{let z=await J($.status,{});if(P!==ve.current)return;if(Oe.current>R){h(!1),de.current=0;return}de.current=0,h(!1),n(z),xa(z.mobileRightbarEnabled),ya(z.mobilePinchZoomEnabled),ka(z.mobileFontSize),d(z.tunnelState??null),z.desktop&&E(!0),z.restartNotice&&(g(!0),s(null),sessionStorage.getItem("dshp-auto-reloaded")||(sessionStorage.setItem("dshp-auto-reloaded","1"),pt()))}catch{if(P!==ve.current)return;de.current+=1,de.current>=2&&h(!0)}};(0,W.useEffect)(()=>{N();let R=()=>{document.hidden||N()};document.addEventListener("visibilitychange",R);let P=setInterval(()=>{document.hidden||N()},1e4);return()=>{clearInterval(P),document.removeEventListener("visibilitychange",R),ve.current+=1}},[]),(0,W.useEffect)(()=>{try{sessionStorage.removeItem("dshp-auto-reloaded")}catch{}},[]),(0,W.useEffect)(()=>{if(w)return;let R=!0,P=async()=>{if(!document.hidden)try{let we=await J($.version,{});if(!R)return;s(Qe=>({current:we.current??null,loaded:we.loaded??null,restarting:Qe?.restarting===!0,startedAt:Qe?.startedAt,error:Qe?.error}))}catch{}},z=()=>{document.hidden||P()};return document.addEventListener("visibilitychange",z),P(),()=>{R=!1,document.removeEventListener("visibilitychange",z)}},[w]);let H=!!l?.current&&!!l?.loaded&&Tn(l.current,l.loaded)>0,K=async()=>{s(R=>({...R??{},restarting:!0,startedAt:Date.now(),error:null}));try{await Promise.race([J($.restart,{}),new Promise((R,P)=>setTimeout(()=>P(new Error("restart requested (no reply within 3s)")),3e3))]),s(R=>({...R??{},restarting:!0}))}catch(R){let P=String(R?.message??"");if(/connection|socket|fetch|network|abort|cancelled|ECONN|disconnect|closed|timeout/i.test(P)){s(z=>({...z??{},restarting:!0}));return}s(z=>({...z??{},restarting:!1,error:R.message}))}},te=async()=>{let R=a?.tunnelConfig;if(!R?.hostname||!R?.tokenSet){F({hostname:R?.hostname??"",token:"",err:t("namedNeedCfg")});return}r(null),d({phase:"starting",detail:"正在开启…",startedAt:Date.now()}),await oe("wan",async()=>{try{let P=await J($.tunnelStart,{disclaimer:!0});n(P),d(P.tunnelState??null)}catch(P){r(P.message),d(null)}})},be=()=>{let R=a?.tunnelConfig;if(!R?.hostname||!R?.tokenSet){F({hostname:R?.hostname??"",token:"",err:null});return}L(!1),_(!0)},Ye=()=>{A&&(_(!1),te())},ts=()=>oe("wan",async()=>{try{let R=await J($.tunnelStop,{});n(R),d(R.tunnelState??null)}catch(R){r(R.message)}}),as=()=>oe("saveNamed",async()=>{try{let R=await J($.tunnelSetConfig,{mode:"named",hostname:M?.hostname??"",token:M?.token||void 0});n(R),F(null)}catch(R){F(P=>({...P??{},err:R.message}))}}),ns=async()=>{X(!1),r(null),await oe("reset",async()=>{try{let R=await J($.pocketReset,{confirm:!0});n(R),xa(R.mobileRightbarEnabled),ya(R.mobilePinchZoomEnabled),ka(R.mobileFontSize),F(null),O(null),q(!1),T({}),Array.isArray(R?.resetWarnings)&&R.resetWarnings.length>0?(r(R.resetWarnings.join("；")),Ce(t("resetPartial"))):Ce(t("resetDone"))}catch(R){r(R.message),Ce(t("resetFailed"))}})},os=()=>oe("refreshPin",async()=>{try{let R=await J($.lanTokenRefresh,{});n(P=>P&&{...P,lanToken:R.lanToken}),T(P=>({...P,lan:!1}))}catch(R){r(R.message)}}),rs=R=>oe("lanAuth",async()=>{try{let P=await J($.lanAuthSetEnabled,{on:R});n(z=>z&&{...z,lanAuthEnabled:P.lanAuthEnabled})}catch(P){r(P.message)}}),is=R=>oe("prefs",async()=>{try{let z=(await J($.mobileRightbarSetEnabled,{on:R})).mobileRightbarEnabled===!0;xe({mobileRightbarEnabled:z}),xa(z)}catch(P){r(P.message)}}),ss=R=>oe("prefs",async()=>{try{let z=(await J($.mobilePinchZoomSetEnabled,{on:R})).mobilePinchZoomEnabled===!0;xe({mobilePinchZoomEnabled:z}),ya(z)}catch(P){r(P.message)}}),ls=R=>oe("prefs",async()=>{try{let P=await J($.mobileFontSetSize,{size:R}),z=Number(P.mobileFontSize)||0;xe({mobileFontSize:z}),ka(z)}catch(P){r(P.message)}}),ds=()=>oe("cache",async()=>{try{let R=await J($.cacheClear,{});xe({cache:R.cache}),Ce(Ji(t,"cacheCleared",R.freedBytes))}catch(R){r(R.message)}}),cs=()=>oe("probe",async()=>{try{let R=await J($.probeClear,{});xe({probe:R.probe}),Ce(Ji(t,"probeCleared",R.freedBytes))}catch(R){r(R.message)}}),ps=R=>oe("probe",async()=>{try{let P=await J($.probeSetEnabled,{on:R});xe({probe:P.probe}),Ce(t(R?"probeEnabledToast":"probeDisabledToast"))}catch(P){r(P.message)}}),hs=R=>Q(R),us=()=>{let R=Y;if(Q(null),R!==null)return oe("lanToggle",async()=>{try{let P=await J($.lanSetEnabled,{on:R});n(z=>z&&{...z,lanEnabled:P.lanEnabled})}catch(P){r(P.message)}})},ms=R=>oe("lanAddr",async()=>{try{n(await J($.lanSetOverride,{ip:R}))}catch(P){r(P.message)}}),fs=R=>oe("savePin",async()=>{if(String(ne?.value??"").length<8){O(P=>({...P??{},err:t("pinInvalid")}));return}try{let P=await J($.pinSetCustom,{which:R,value:ne?.value??""});n(z=>z&&{...z,accessToken:R==="public"?P.pin:z.accessToken,lanToken:R==="lan"?P.pin:z.lanToken,publicPinCustom:R==="public"?!0:z.publicPinCustom,lanPinCustom:R==="lan"?!0:z.lanPinCustom}),O(null),P&&P.persisted===!1&&Ce(t("pinSaveMemoryOnly"))}catch(P){O(z=>({...z??{},err:P.message}))}}),yn=a?.lanUrl,Nt=a?.tunnelUrl,bs=(Nt||yn||(typeof location<"u"?location.origin:""))+"/__dsh-pocket/lite",gs=a?.origin==="public",kn=i?.phase??"idle",ws=["downloading","starting","registering"].includes(kn),vs=i?.detail??"",xs=i?.startedAt??null,ht=a?.tunnelConfig??{hostname:"",tokenSet:!1},ys=!!(ht.hostname&&ht.tokenSet),ks=()=>F({hostname:ht.hostname??"",token:"",err:null}),_s=!!(Nt&&Nt!=="https://"+ht.hostname),Es=Xi(t),Ce=R=>{he(R),clearTimeout($e.current),$e.current=setTimeout(()=>he(null),2600)};(0,W.useEffect)(()=>()=>clearTimeout($e.current),[]);let _n=k||Y!==null||V;return(0,W.useEffect)(()=>{if(!_n)return;Ze.current=document.activeElement;let R=P=>{if(P.key==="Escape"){if(P.preventDefault(),P.stopPropagation(),k){_(!1);return}if(Y!==null){Q(null);return}V&&X(!1)}};return window.addEventListener("keydown",R),()=>{window.removeEventListener("keydown",R);let P=Ze.current;Ze.current=null,P&&typeof P.focus=="function"&&P.isConnected&&P.focus()}},[_n,k,Y,V]),{t,status:a,error:o,setError:r,offline:C,pending:p,patchStatus:xe,tunnelState:i,tunnelPhase:kn,tunnelStarting:ws,tunnelStateDetail:vs,tunnelStateStarted:xs,tunnelConfig:ht,publicConfigured:ys,tunnelConfigChanged:_s,openTunnelConfig:ks,tunnelCfg:M,setTunnelCfg:F,saveNamedTunnel:as,startTunnel:be,stopTunnel:ts,disclaimerOpen:k,setDisclaimerOpen:_,disclaimerChecked:A,setDisclaimerChecked:L,confirmDisclaimer:Ye,lanUrl:yn,tunnelUrl:Nt,liteUrl:bs,publicView:gs,lanToggleOpen:Y,setLanToggleOpen:Q,requestLanToggle:hs,confirmLanToggle:us,setLanAuth:rs,refreshLanPin:os,setLanAddress:ms,customPin:ne,setCustomPin:O,saveCustomPin:fs,pinShown:S,setPinShown:T,advOpen:B,setAdvOpen:q,restartNotice:f,setRestartNotice:g,versionInfo:l,restartDismissed:m,setRestartDismissed:x,isDesktop:w,autoReloadFailed:u,setAutoReloadFailed:b,needsRestart:H,restartPocket:K,waitForHostThenReload:pt,setMobileRightbar:is,setMobilePinchZoom:ss,setMobileFontSize:ls,clearCache:ds,clearProbe:cs,setProbe:ps,resetOpen:V,setResetOpen:X,doFactoryReset:ns,toast:ee,showToast:Ce,now:y,elapsed:Sa,errText:Es}}function Ji(e,t,a){return e(t).split("{mb}").join(((Number(a)||0)/1024/1024).toFixed(1))}var Ec="dsh-pocket",Tc=["slots","connection","layout","locale","sessionLogDownload","sessions"];function Sc({rpcCall:e,t}){let a=es(e,t);return(0,le.createElement)("div",{className:"dshp-page","data-dshp-ui":"v3"},(0,le.createElement)("header",{className:"dshp-head"},(0,le.createElement)("span",{className:"dshp-badge"},(0,le.createElement)(Z.settings,{size:19})),(0,le.createElement)("div",{className:"dshp-head-main"},(0,le.createElement)("div",{className:"dshp-title"},t("section")),(0,le.createElement)("div",{className:"dshp-sub"},t("subtitle")))),(0,le.createElement)("div",{className:"dshp-chips"},a.status?[vn({on:a.status.lanEnabled!==!1,children:t("lanAccess")+" · "+(a.status.lanEnabled!==!1?t("statusOn"):t("statusOff"))}),vn({on:!!a.tunnelUrl,children:t("wanAccess")+" · "+(a.tunnelUrl?t("statusConnected"):t("statusOff"))})]:(0,le.createElement)("span",{className:"dshp-hint",style:{marginTop:0}},t("loadingStatus"))),a.error?ge({kind:"error",icon:Z.warn,children:a.errText(a.error),extra:(0,le.createElement)("div",{className:"dshp-inline",style:{marginTop:8}},j({variant:"ghost",mini:!0,onClick:()=>a.setError(null)},t("ok")))}):null,a.offline?ge({kind:"warn",icon:Z.warn,children:t("offlineHint")}):null,!a.isDesktop&&a.restartNotice?ge({kind:"info",icon:Z.refresh,title:t("restarted"),children:(0,le.createElement)("div",{className:"dshp-hint",style:{wordBreak:"break-all",marginTop:2}},ce(t,"bgHint",{cmd:a.status?.killHint??"lsof -ti :"+(a.status?.dshPort??3080)+" | xargs kill -9"})),extra:(0,le.createElement)("div",{className:"dshp-inline",style:{marginTop:8}},a.autoReloadFailed?j({variant:"ghost",mini:!0,icon:Z.refresh,onClick:()=>{a.setAutoReloadFailed(!1),a.waitForHostThenReload()}},t("reloadNow")):null,a.autoReloadFailed?(0,le.createElement)("span",{className:"dshp-hint",style:{marginTop:0}},t("reloadFailed")):null,j({variant:"quiet",mini:!0,onClick:()=>a.setRestartNotice(!1)},t("ok")))}):null,!a.isDesktop&&!a.publicView&&a.needsRestart&&!a.restartDismissed?ge({kind:"warn",icon:Z.refresh,title:ce(t,"updatedRestart",{ver:a.versionInfo.current}),children:(0,le.createElement)("div",{className:"dshp-hint",style:{marginTop:2}},a.versionInfo.restarting?ce(t,"restartingDetail",{s:a.elapsed(a.versionInfo.startedAt)}):a.versionInfo.error?ce(t,"restartFailed",{err:a.errText(a.versionInfo.error)||t("unknownError")}):t("updatedRestartDetail")),extra:(0,le.createElement)("div",{className:"dshp-inline",style:{marginTop:8}},a.versionInfo.restarting?j({variant:"ghost",mini:!0,disabled:!0},t("restartingNow")):j({variant:"primary",mini:!0,icon:Z.refresh,onClick:a.restartPocket},t("restartNow")),a.versionInfo.restarting?null:j({variant:"ghost",mini:!0,onClick:()=>a.setRestartDismissed(!0)},t("later")))}):null,...$i(a),...Zi(a),...Yi(a),...Qi(a))}function Cc(e){if(e?.connection)try{Object.defineProperty(e.connection,"isLoopback",{value:!0,writable:!0,configurable:!0})}catch{try{e.connection.isLoopback=!0}catch{}}let t=e.locale.bind(dt);e.effect(()=>e.locale.register(dt,{zh:ga,en:qi}),"dsh-pocket: pocket locale dictionaries"),Wi(e);let a=(n,o,r)=>e.connection.rpc.call(ye,n,o,r);e.slots.inject("settings.section",()=>e.slots.register({name:"settings.section",id:"pocket",order:1,label:()=>t("section"),inject:()=>({rpcCall:a,t})},Sc))}

    return module.exports;
  }
});
