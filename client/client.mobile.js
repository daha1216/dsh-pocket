(window.__dshpChunkLoader || window.__ModuleLoader__).load({
  id: "dsh-pocket",
  chunk: "client.mobile.js",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    var React = require("react");
var Qt=Object.defineProperty;var cr=Object.getOwnPropertyDescriptor;var pr=Object.getOwnPropertyNames;var hr=Object.prototype.hasOwnProperty;var ur=(e,t)=>{for(var o in t)Qt(e,o,{get:t[o],enumerable:!0})},mr=(e,t,o,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of pr(t))!hr.call(e,n)&&n!==o&&Qt(e,n,{get:()=>t[n],enumerable:!(a=cr(t,n))||a.enumerable});return e};var fr=e=>mr(Qt({},"__esModule",{value:!0}),e);var ld={};ur(ld,{mobileApply:()=>sr});module.exports=fr(ld);var vt=require("react");var de=require("react");function Je(e,t,...o){let a=e??16;return(0,de.createElement)("svg",{width:a,height:a,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.65,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...t?{className:t}:{}},...o)}var Za=({size:e,className:t})=>Je(e,t,(0,de.createElement)("path",{key:"clip",d:"M13.4 7.5L7.8 13.1a3.5 3.5 0 0 1-4.95-4.95l5.9-5.9a2.3 2.3 0 0 1 3.25 3.25L6.25 11.25a1.15 1.15 0 0 1-1.63-1.63l5.13-5.12"})),Qa=({size:e,className:t})=>Je(e,t,(0,de.createElement)("rect",{key:"box",x:2,y:2.5,width:12,height:11,rx:2}),(0,de.createElement)("path",{key:"bar",d:"M6 2.5v11"})),Ja=({size:e,className:t})=>Je(e,t,(0,de.createElement)("path",{key:"folder",d:"M2 4.5A1.5 1.5 0 0 1 3.5 3h2.5l1.4 1.5h4.6A1.5 1.5 0 0 1 13.5 6v1.5M2 7.5h12l-1.15 4.9a1.5 1.5 0 0 1-1.46 1.1H3.4A1.4 1.4 0 0 1 2 12.1V4.5Z"})),eo=({size:e,className:t})=>Je(e,t,(0,de.createElement)("path",{key:"arrow",d:"M8 2v7.5M5.2 4.8L8 2l2.8 2.8"}),(0,de.createElement)("path",{key:"tray",d:"M3 9.5v3A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-3"})),to=({size:e,className:t})=>Je(e,t,(0,de.createElement)("path",{key:"arrow",d:"M8 2v7.5M5.2 6.7L8 9.5l2.8-2.8"}),(0,de.createElement)("path",{key:"tray",d:"M3 10.5v2A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-2"}));function Jt(){return document.querySelector("[data-shell-overlay]")?.parentElement??null}var ao=null;function F(){let e=ao;if(e!==null&&e.isConnected&&e.getAttribute("data-mobile-nav")==="frame")return e;let o=document.querySelector('[data-mobile-nav="frame"]')??Jt();return ao=o,o}var br="[data-sidebar-right-expand]",gr="[data-sidebar-right-toggle]";function gt(e=document){let t=e.querySelector(gr),o=e.querySelector(br),a=typeof o?.click=="function"?o:t;return typeof a?.click!="function"?!1:(a.click(),!0)}function oo({toggleSidebar:e,t}){let o=()=>{gt()},[a,n]=(0,vt.useState)(!1);return(0,vt.useEffect)(()=>{let i=()=>{let c=F();return c!==null&&!c.hasAttribute("data-sidebar-collapsed")};n(i());let r=0,s=()=>{r===0&&(r=requestAnimationFrame(()=>{r=0,n(i())}))},l=new MutationObserver(c=>{for(let b of c){if(b.type==="attributes"){if(b.attributeName==="data-sidebar-collapsed"){s();return}continue}let m=[...b.addedNodes,...b.removedNodes];if(m.length===0||!m.every(v=>v.nodeType===Node.TEXT_NODE)){s();return}}});return l.observe(document.documentElement,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["data-sidebar-collapsed"]}),()=>{r!==0&&cancelAnimationFrame(r),l.disconnect()}},[]),React.createElement(React.Fragment,null,React.createElement("button",{type:"button","data-mobile-nav":"toggle","aria-label":t(a?"close":"open"),"aria-expanded":a,title:t(a?"close":"open"),onClick:()=>e()},React.createElement(Qa,{size:16})),React.createElement("button",{type:"button","data-mobile-nav":"files","aria-label":t("files"),title:t("files"),onClick:o},React.createElement(Ja,{size:16})))}function no({useInput:e,useSession:t,t:o}){let a=e(r=>r.phase!=="plain"),n=t(r=>r.subagent!==null),i=a||n;return React.createElement("button",{type:"button","data-mobile-nav":"file-upload","aria-label":o("fileUpload"),title:o("fileUpload"),disabled:i},React.createElement(Za,{size:16}))}var io=`
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
`;var ro=`
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
`;var so=`@media (max-width: 1023px) and (pointer: coarse) {
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
`;var lo=`@media (max-width: 1023px) and (pointer: coarse) {
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
`;var co=[io,ro,so,lo].join(`
`);var ue="(max-width: 1023px) and (pointer: coarse)",po="(min-width: 1024px)",wt="(pointer: coarse)",ho="(min-width: 1024px) and (pointer: coarse)";function H(e,t,o,a=ue){e.effect(()=>{let n=window.matchMedia(a),i,r=()=>{i?.(),i=n.matches?o(n):void 0};return r(),n.addEventListener("change",r),()=>{n.removeEventListener("change",r),i?.()}},t)}function uo(e,t){if(t!==null)try{if(t("(font: -apple-system-body) and (-webkit-touch-callout: none)"))return!0}catch{}let o=e.userAgent;return/iP(hone|ad|od)/.test(o)?!0:/Macintosh/.test(o)&&e.maxTouchPoints>1}var ea="--mobile-nav-header-h",vr='[data-mobile-nav="frame"] [data-phase] header',et=null,Fe=null;function fo(e){if(typeof document>"u")return;let t=document.documentElement;t.style.getPropertyValue(ea)!==e&&t.style.setProperty(ea,e)}function bo(){let e=F(),t=et;return t===null||e===null||!(t instanceof HTMLElement)?"0px":`${Math.round(Math.max(0,t.getBoundingClientRect().bottom-e.getBoundingClientRect().top))}px`}function mo(){fo(bo())}function wr(){let e=et;fo(e instanceof HTMLElement&&e.offsetHeight===0?"0px":bo())}function xr(){if(typeof document>"u")return;let e=document.querySelector(vr);if(e===et){e!==null&&typeof ResizeObserver>"u"&&mo();return}Fe?.disconnect(),et=e,e!==null&&typeof ResizeObserver<"u"&&(Fe=Fe??new ResizeObserver(()=>{mo()}),Fe.observe(e)),wr()}function go(){return{name:"header-metrics",scopes:["*"],ensure:()=>{xr()},dispose:()=>{Fe?.disconnect(),Fe=null,et=null,typeof document<"u"&&document.documentElement.style.removeProperty(ea)}}}var ta="characterData";function vo(e){return e.type==="attributes"?e.attributeName===null?"*":e.attributeName:e.type==="characterData"?ta:"*"}function wo(e){let t=e.onError??((g,y,p)=>{console.error(`[dsh-web-mobile] reconciler task ${g}${p==="dispose"?" dispose":""} failed`,y)}),o=new Set,a=null,n=new Set,i=!1,r=null,s=g=>{try{g.ensure()}catch(y){t(g.name,y,"ensure")}},l=g=>{try{g.dispose()}catch(y){t(g.name,y,"dispose")}},c=()=>{if(r!==null&&(r(),r=null),a===null){n.clear(),i=!1;return}let g=n,y=i;if(n=new Set,i=!1,y)for(let p of a)s(p);else if(g.size>0)for(let p of a){let h=p.scopes;(h===void 0||h.some(w=>g.has(w)))&&s(p)}},b=()=>{r===null&&(r=e.requestFrame(()=>{r=null,c()}))};return{get size(){return o.size},register:g=>(o.add(g),a!==null&&(a.add(g),s(g)),()=>{o.delete(g),a!==null&&a.delete(g)&&l(g)}),activate:()=>{a===null&&(a=new Set(o),i=!0,c())},deactivate:()=>{if(r!==null&&(r(),r=null),n.clear(),i=!1,a!==null){let g=a;a=null;for(let y of g)l(y)}},note:g=>{for(let y of g)n.add(y);b()},flush:c}}var $="pocketMobileNav",xo={open:"打开目录",close:"收起目录",backdrop:"点击关闭目录",back:"返回",backToConversation:"返回会话",sessionLog:"导出会话日志",downloadMenu:"下载",downloads:"下载记录",quickSettings:"设置",files:"文件浏览",fileUpload:"添加文件",fileUploadImage:"上传图片",fileUploadAttachment:"上传附件",questionExpand:"展开回答",questionCollapse:"收起回答",deleteSession:"删除会话",deleteConfirmTitle:"删除会话？",deleteConfirmDesc:"将删除「{title}」的完整会话记录，此操作不可恢复。",deleteConfirmYes:"删除",deleteConfirmNo:"取消",deletePending:"正在删除…",deleteErrorBusy:"该会话正在运行且无法停止，请稍后重试。",deleteErrorNotFound:"会话不存在或已被删除。",deleteErrorResolve:"无法确定要删除的会话，请重试。",deleteErrorGeneric:"删除失败：{message}"},yo={open:"Open directory",close:"Close directory",backdrop:"Click to close directory",back:"Back",backToConversation:"Back to conversation",sessionLog:"Session log",downloadMenu:"Downloads",downloads:"Downloads history",quickSettings:"Settings",files:"Files",fileUpload:"Add files",fileUploadImage:"Upload image",fileUploadAttachment:"Upload attachment",questionExpand:"Expand answer",questionCollapse:"Collapse answer",deleteSession:"Delete session",deleteConfirmTitle:"Delete session?",deleteConfirmDesc:"The complete log of “{title}” will be permanently removed. This cannot be undone.",deleteConfirmYes:"Delete",deleteConfirmNo:"Cancel",deletePending:"Deleting…",deleteErrorBusy:"This session is running and could not be stopped. Try again later.",deleteErrorNotFound:"The session does not exist or was already deleted.",deleteErrorResolve:"Could not identify the session to delete. Please try again.",deleteErrorGeneric:"Delete failed: {message}"};var ko="[data-composer-card], [data-composer-input], [contenteditable], input, textarea, button";function Eo(e){let t=e.matches;if(typeof t=="function"&&t.call(e,ko))return!0;let o=e.querySelector;return typeof o=="function"&&o.call(e,ko)!==null}function To(e){let t=e.querySelectorAll;if(typeof t!="function"||typeof getComputedStyle!="function")return/\d\s*%/.test(e.textContent??"");for(let o of t.call(e,"svg circle")){let a=getComputedStyle(o).strokeDasharray;if(a!==""&&a!=="none"&&!/^(0px?)(\s+0px?)*$/.test(a))return!0}return!1}function yr(e,t){return e.contains(t)||Eo(e)?!1:To(e)}function aa(e){let t=e.closest("[data-composer-dock]");if(t!==null){let a=[...t.children].filter(i=>!i.contains(e)&&!Eo(i)&&!i.hasAttribute("data-mobile-nav")),n=a.find(To)??(a.length===1?a[0]:void 0);if(n!==void 0)return{dock:t,ring:n}}let o=e.closest('[class*="_composerStack"]');for(let a=e.parentElement;a!==null;a=a.parentElement){let n=[...a.children].find(i=>yr(i,e));if(n!==void 0)return{dock:a,ring:n};if(a===o)break}return null}function kr(e){return e===null||!e.isConnected||e.closest("[data-phase]")===null?!1:e.closest('[class*="_composerStack"]')!==null}var Er=/^TPS\s+\d/,Tr=/TPS\s+\d/,_r=e=>{for(let[t,o]of e.entries())if(Er.test((o.textContent??"").trim())&&!(o.children.length>0)&&o.parentElement!==null)return{index:t,mark:o.getAttribute("data-mobile-nav")!=="stats-tps"};return{index:-1,mark:!1}};function Sr(e,t,o,a){return e!==null?{el:e.el,reserve:e.reserve,live:t}:Tr.test(o())?a():null}function Cr(e,t,o,a){return e?t:o&&a}function _o(){let e=(f,k)=>{getComputedStyle(f).position==="static"&&f.setAttribute("data-mobile-nav",k)},t=f=>{for(let k=f.parentElement;k!==null;k=k.parentElement)if(getComputedStyle(k).position!=="static")return k;return null},o=(f,k)=>{let _=t(f);if(_===null)return null;let L=k.getBoundingClientRect(),M=_.getBoundingClientRect(),S=f.getBoundingClientRect();return{host:f,left:L.left-M.left-_.clientLeft,top:L.top-M.top-_.clientTop-(S.height-L.height)/2}},a=f=>{let k=f.host;k.style.left!==`${f.left}px`&&(k.style.left=`${f.left}px`),k.style.top!==`${f.top}px`&&(k.style.top=`${f.top}px`)},n=f=>{let k=f.closest('[class*="_composerStack"]');if(k===null)return null;let _=f.querySelector(':scope > [data-mobile-nav="stats-tps-reserve"]'),L=[...k.querySelectorAll("div")],M=_r(L);if(M.index<0)return null;let S=L[M.index];if(S===void 0)return null;_===null&&(_=document.createElement("span"),_.setAttribute("data-mobile-nav","stats-tps-reserve"),_.setAttribute("aria-hidden","true"),f.appendChild(_));let R=S.textContent??"";_.textContent!==R&&(_.textContent=R),M.mark&&S.setAttribute("data-mobile-nav","stats-tps");let P=S.parentElement;return P===null?null:(e(P,"stats-tps-row"),{el:S,reserve:_,live:R})},i=f=>{let{el:k,reserve:_}=f,L=o(k,_);return{el:k,measured:L,width:_.getBoundingClientRect().width}},r=f=>{f.measured!==null&&a(f.measured);let k=f.el,_=`${f.width}px`;k.style.maxWidth!==_&&(k.style.maxWidth=_)},s=f=>{let k=aa(f);if(k===null)return null;let{dock:_,ring:L}=k,M=document.querySelector('[data-composer-card] [class*="_row"] [class*="_trailing"]');if(M===null)return null;let S=M.querySelector(':scope > [data-mobile-nav="stats-ring-reserve"]'),R=M.querySelector(':scope > [class*="_primary"]');return S===null?(S=document.createElement("span"),S.setAttribute("data-mobile-nav","stats-ring-reserve"),M.insertBefore(S,R)):(R===null?M.lastElementChild!==S:S.nextElementSibling!==R)&&M.insertBefore(S,R),L.getAttribute("data-mobile-nav")!=="stats-ring"&&L.setAttribute("data-mobile-nav","stats-ring"),e(_,"stats-ring-dock"),{ring:L,reserve:S,measured:o(L,S)}},l=f=>{let k=n(f);k!==null&&r(i(k))},c=f=>{let k=s(f);k!==null&&k.measured!==null&&a(k.measured)},b=null,m=0,v="",T=f=>{if(f===null)return"none";let k=f.getBoundingClientRect();return`${Math.round(k.left)}:${Math.round(k.top)}:${Math.round(k.width)}`},g=()=>{let f=document.querySelector('[data-mobile-nav="stats"]');if(f===null)return;let k=f.getBoundingClientRect(),_=`${Math.round(k.left)}:${Math.round(k.top)}:${Math.round(k.width)}:${Math.round(k.height)}|${T(document.querySelector('[data-mobile-nav="stats-ring-reserve"]'))}`;if(_===v)return;v=_;let L=n(f),M=L===null?null:i(L),S=s(f);M!==null&&r(M),S!==null&&S.measured!==null&&a(S.measured)},y=()=>{m===0&&(m=requestAnimationFrame(()=>{m=0,g()}))},p="",h=null,w=null,E=null,A=null,x=null,u=(f,k)=>f!==null&&f.isConnected&&f.getAttribute("data-mobile-nav")===k,d=f=>{let k=aa(f);return k===null?!1:k.ring===E};return{name:"stats-line",scopes:["*",ta],ensure:()=>{b===null&&(b=y,window.addEventListener("resize",y),window.visualViewport?.addEventListener("resize",y));let f=x;if((f===null||!f.isConnected||!f.matches('[data-mobile-nav="stats"]'))&&(f=x=document.querySelector('[data-mobile-nav="stats"]')),f!==null&&kr(f)){let _=f.getBoundingClientRect(),L=`${Math.round(_.left)}:${Math.round(_.top)}:${Math.round(_.width)}:${Math.round(_.height)}`,M=u(h,"stats-tps"),S=u(w,"stats-tps-reserve"),R=M&&S&&h!==null&&w!==null?{el:h,reserve:w,live:""}:null,P=f.closest('[class*="_composerStack"]'),D=Sr(R,h?.textContent??"",()=>P?.textContent??"",()=>n(f)),Q=`${L}|${D===null?"none":D.live}|${T(A)}`,K=Cr(D===null,h===null&&w===null,u(h,"stats-tps"),u(w,"stats-tps-reserve"));if(Q===p&&K&&u(E,"stats-ring")&&d(f)&&u(A,"stats-ring-reserve"))return;p=Q;let G=D!==null&&D.el===h?n(f):D,W=G===null?null:i(G),j=s(f);W!==null&&r(W),j!==null&&j.measured!==null&&a(j.measured),h=G===null?null:G.el,w=G===null?null:G.reserve,E=j===null?null:j.ring,A=j===null?null:j.reserve,p=`${L}|${D===null?"none":D.live}|${T(A)}`;return}f?.removeAttribute("data-mobile-nav");let k=document.querySelector('[class*="_composerStack"]');if(k!==null)for(let _ of['[class*="_root"]',"[data-slot]"])for(let L of k.querySelectorAll(_)){if(L.matches('[data-testid="todo-panel"]'))continue;let M=L.querySelectorAll("button");if(M.length>0&&![...M].every(R=>R.getAttribute("aria-haspopup")!==null))continue;let S=L.textContent??"";if(/(turns|steps|\bLLM\b|轮|步)/.test(S)&&L.querySelector("textarea, [data-composer-input]")===null){L.setAttribute("data-mobile-nav","stats"),l(L),c(L);return}}},dispose:()=>{m!==0&&(cancelAnimationFrame(m),m=0),v="",x=null,b!==null&&(window.removeEventListener("resize",b),window.visualViewport?.removeEventListener("resize",b),b=null);for(let f of document.querySelectorAll('[data-mobile-nav="stats-ring"], [data-mobile-nav="stats-tps"]')){let k=f;k.style.left="",k.style.top="",k.style.maxWidth=""}for(let f of["stats","stats-ring","stats-ring-dock","stats-tps","stats-tps-row"])for(let k of document.querySelectorAll(`[data-mobile-nav="${f}"]`))k.removeAttribute("data-mobile-nav");for(let f of document.querySelectorAll('[data-mobile-nav="stats-ring-reserve"], [data-mobile-nav="stats-tps-reserve"]'))f.remove()}}}function na(){oa?.()}var oa=null,Lr=200,Ar='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="18" height="18"><path d="M9.8 3.4 5.2 8l4.6 4.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',Mr='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="18" height="18"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.67272 0.522841C10.8339 0.522841 11.76 0.522714 12.4963 0.602493C13.2453 0.683657 13.8789 0.854248 14.4264 1.25197C14.7504 1.48739 15.0355 1.77247 15.2709 2.0965C15.6686 2.64394 15.8392 3.27758 15.9204 4.02655C16.0002 4.7629 16 5.68895 16 6.85014V9.14986C16 10.3111 16.0002 11.2371 15.9204 11.9735C15.8392 12.7224 15.6686 13.3561 15.2709 13.9035C15.0355 14.2275 14.7504 14.5126 14.4264 14.748C13.8789 15.1458 13.2453 15.3163 12.4963 15.3975C11.76 15.4773 10.8339 15.4772 9.67272 15.4772H6.3273C5.16611 15.4772 4.24006 15.4773 3.50371 15.3975C2.75474 15.3163 2.1211 15.1458 1.57366 14.748C1.24963 14.5126 0.964549 14.2275 0.729131 13.9035C0.331407 13.3561 0.160817 12.7224 0.0796529 11.9735C-0.000126137 11.2371 1.25338e-09 10.3111 1.25338e-09 9.14986V6.85014C1.25329e-09 5.68895 -0.000126137 4.7629 0.0796529 4.02655C0.160817 3.27758 0.331407 2.64394 0.729131 2.0965C0.964549 1.77247 1.24963 1.48739 1.57366 1.25197C2.1211 0.854248 2.75474 0.683657 3.50371 0.602493C4.24006 0.522714 5.16611 0.522841 6.3273 0.522841H9.67272ZM5.54303 1.88715V14.1118C5.78636 14.1128 6.04709 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C6.04709 1.88307 5.78636 1.8862 5.54303 1.88715ZM4.1828 1.91166C3.99125 1.9216 3.8148 1.93577 3.65076 1.95353C3.01764 2.02212 2.65034 2.1506 2.37325 2.35179C2.16463 2.50337 1.98052 2.68747 1.82895 2.89609C1.62776 3.17318 1.49928 3.54048 1.43069 4.1736C1.36074 4.81967 1.36023 5.65896 1.36023 6.85014V9.14986C1.36023 10.341 1.36074 11.1803 1.43069 11.8264C1.49928 12.4595 1.62776 12.8268 1.82895 13.1039C1.98052 13.3125 2.16463 13.4966 2.37325 13.6482C2.65034 13.8494 3.01764 13.9779 3.65076 14.0465C4.29683 14.1164 5.13612 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C5.13612 1.88307 4.29683 1.88358 3.65076 1.95353C3.47672 1.97129 3.30027 1.98546 3.10872 1.9954L4.1828 1.91166Z" fill="currentColor"/></svg>';function So(e,t,o){let a=null,n=null,i=null,r=!1,s=()=>{let v=F();return v===null?!1:!v.hasAttribute("data-sidebar-collapsed")},l=null,c=()=>{let v=l;return v!==null&&v.isConnected&&v.matches('[data-phase="active"]')?!1:(l=document.querySelector('[data-phase="active"]'),l===null)},b=v=>{if(o!==null&&o.panelOpen()){v.preventDefault(),v.stopPropagation(),o.back();return}t()},m=()=>{if(n===null)return;let v=o!==null&&o.panelOpen(),T=v&&o!==null&&o.subpageOpen(),g=T?"back-level":v?"exit-panel":"open-drawer";if(n.dataset.mobileNavFabMode===g)return;n.dataset.mobileNavFabMode=g;let y=e(T?"back":v?"backToConversation":"open");n.setAttribute("aria-label",y),n.title=y,n.innerHTML=v?Ar:Mr};return{name:"overlay-backdrop-fab",scopes:["*","data-sidebar-collapsed","data-phase"],ensure:()=>{oa=()=>{a!==null&&(r=!0,a.style.pointerEvents="none",a.style.opacity="0")};let v=F();if(v===null){i!==null&&(window.clearTimeout(i),i=null),a?.remove(),a=null,n?.remove(),n=null;return}s()?a===null?(a=document.createElement("div"),a.dataset.mobileNav="backdrop",a.setAttribute("role","button"),a.setAttribute("aria-label",e("backdrop")),v.appendChild(a),r=!1):r&&i!==null&&(window.clearTimeout(i),i=null,r=!1,a.style.removeProperty("pointer-events"),a.style.removeProperty("opacity")):a!==null&&(a.style.pointerEvents="none",a.style.opacity="0",r=!0,i===null&&(i=window.setTimeout(()=>{i=null,a?.remove(),a=null},Lr+60))),c()&&!s()&&n===null?(n=document.createElement("button"),n.type="button",n.dataset.mobileNav="fab",n.setAttribute("aria-label",e("open")),n.title=e("open"),n.addEventListener("click",b),v.appendChild(n)):(!c()||s())&&n!==null&&(n.remove(),n=null),m()},dispose:()=>{i!==null&&(window.clearTimeout(i),i=null),oa=null,l=null,a?.remove(),a=null,n?.remove(),n=null}}}function Co(){let e=null,t=null;return{name:"file-viewer-open-marker",scopes:["*"],ensure:()=>{let o=F();if(o===null)return;let a=document.querySelector(".dsfv-panel")!==null;a===e&&o===t||(e=a,t=o,a?o.setAttribute("data-file-viewer-open",""):o.hasAttribute("data-file-viewer-open")&&o.removeAttribute("data-file-viewer-open"))},dispose:()=>{e=null,t=null,F()?.removeAttribute("data-file-viewer-open")}}}function ae(e){if(typeof e!="object"||e===null)return;let t=e;if(typeof t.current=="string")return t.current;for(let o in t.byId){let a=t.byId[o];if(a===void 0)continue;let n=a.retainedBy?.mainView;if(typeof n=="number"&&n>0&&typeof a.id=="string")return a.id}}function Lo(e){return typeof e?.clear=="function"}function Ao(e){return typeof e?.open=="function"}var Rr=4,Pr=350;async function Mo(e){let t=e.attempts??Rr,o=e.intervalMs??Pr;for(let a=0;a<t;a+=1){try{await e.refresh?.()}catch{}if(!e.listed())return!0;a+1<t&&await e.sleep(o)}return!e.listed()}var _e="data-mobile-nav-panel",we="dsh-mobile-panel-dismiss";function Or(){return Array.from(document.querySelectorAll(`[${_e}]`))}function xt(){let e=Or(),t=e[e.length-1];return t===void 0?!1:(t.dispatchEvent(new CustomEvent(we,{bubbles:!0,composed:!0})),!0)}var Ro='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.95317V10.0469" stroke="currentColor" stroke-width="1"/><path d="M4.25 6.29688L8 10.0469L11.75 6.29688" stroke="currentColor" stroke-width="1"/><path d="M1.5 10.0469V13.158C1.5 13.3937 1.60536 13.6198 1.79289 13.7865C1.98043 13.9532 2.23478 14.0469 2.5 14.0469H13.5C13.7652 14.0469 14.0196 13.9532 14.2071 13.7865C14.3946 13.6198 14.5 13.3937 14.5 13.158V10.0469" stroke="currentColor" stroke-width="1"/></svg>',Ir='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1"/><path d="M8 4.6V8l2.2 1.6" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>';function Po(e){let t=e.locale.bind($),o=()=>ae(e.sessions.list.getSnapshot()),a=null,n=null,i=null,r=null,s=null,l=null,c=null,b=null,m=null,v=()=>{r?.remove(),r=null,s=null,l!==null&&document.removeEventListener("pointerdown",l,!0),l=null,c!==null&&document.removeEventListener(we,c),c=null,b?.disconnect(),b=null,m!==null&&(window.removeEventListener("resize",m),window.removeEventListener("orientationchange",m)),m=null,n?.setAttribute("aria-expanded","false")},T=()=>{if(r===null||n===null)return;let E=n.getBoundingClientRect();r.style.top=`${Math.round(E.bottom+4)}px`,r.style.right=`${Math.round(window.innerWidth-E.right)}px`},g=(E,A,x)=>{let u=document.createElement("button");u.type="button",u.setAttribute("role","menuitem"),u.dataset.mobileNav=A,u.innerHTML=x;let d=document.createElement("span");return d.textContent=E,u.appendChild(d),u},y=()=>{if(n===null)return;if(r!==null){v();return}let E=document.createElement("div");E.dataset.mobileNav="session-log-menu",E.setAttribute(_e,"session-log"),E.setAttribute("role","menu"),E.setAttribute("aria-label",t("downloadMenu"));let A=g(t("sessionLog"),"session-log-export",Ro);A.disabled=o()===void 0,A.addEventListener("click",()=>{let d=o();v(),d!==void 0&&e.sessionLogDownload.download(d)}),E.appendChild(A),s=A;let x=window.DSHA;if(typeof x?.openDownloads=="function"){let d=g(t("downloads"),"session-log-downloads",Ir);d.addEventListener("click",()=>{let C=x?.openDownloads?.();v(),C!==void 0&&C.catch(()=>{})}),E.appendChild(d)}document.body.appendChild(E),r=E,T(),n.setAttribute("aria-expanded","true"),l=d=>{let C=d.target;C instanceof Node&&(E.contains(C)||n!==null&&(C===n||n.contains(C))||v())},document.addEventListener("pointerdown",l,!0),c=d=>{d.target===E&&v()},document.addEventListener(we,c);let u=F();u!==null&&(b=new MutationObserver(()=>{u.hasAttribute("data-sidebar-collapsed")&&v()}),b.observe(u,{attributes:!0,attributeFilter:["data-sidebar-collapsed"]})),m=()=>{T()},window.addEventListener("resize",m),window.addEventListener("orientationchange",m),window.setTimeout(()=>{A.focus({preventScroll:!0})},0)},p=()=>{s!==null&&(s.disabled=o()===void 0)},h=()=>{let E=F();return E===null?null:E.querySelector('[class*="sidebarCol"] [class*="logoRow"]')??E.querySelector('[class*="logoRow"]')},w=(E,A)=>{A.parentElement!==E&&E.appendChild(A)};return{name:"drawer-session-log",scopes:["*"],ensure:()=>{let E=h();E!==null&&(n===null&&(a=document.createElement("span"),a.dataset.mobileNav="session-log-wrap",n=document.createElement("button"),n.type="button",n.dataset.mobileNav="session-log",n.setAttribute("aria-haspopup","menu"),n.setAttribute("aria-expanded","false"),n.setAttribute("aria-label",t("downloadMenu")),n.title=t("downloadMenu"),n.innerHTML=Ro,n.addEventListener("click",y),a.appendChild(n),i=e.sessions.list.subscribe(()=>{p()})),a!==null&&w(E,a),p())},dispose:()=>{v(),i?.(),i=null,a?.remove(),a=null,n=null}}}var Hr='<svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true" stroke-width="1.3"><path d="M8 9.75012C8.9665 9.75012 9.75 8.96662 9.75 8.00012C9.75 7.03362 8.9665 6.25012 8 6.25012C7.0335 6.25012 6.25 7.03362 6.25 8.00012C6.25 8.96662 7.0335 9.75012 8 9.75012Z" stroke="currentColor"/><path d="M13.0107 7.79377C12.9505 7.89401 12.9205 7.94413 12.9205 7.99951C12.9205 8.0549 12.9505 8.10502 13.0106 8.20528L13.9849 9.83006C14.045 9.93029 14.0751 9.9804 14.0751 10.0358C14.0751 10.0911 14.045 10.1413 13.9849 10.2415L13.0037 11.8777C12.9468 11.9726 12.9184 12.0201 12.8725 12.0461C12.8267 12.072 12.7713 12.072 12.6607 12.072H10.6704C10.5598 12.072 10.5045 12.072 10.4586 12.098C10.4128 12.1239 10.3843 12.1714 10.3274 12.2662L9.33825 13.9142C9.28133 14.009 9.25287 14.0564 9.20703 14.0823C9.16118 14.1083 9.10588 14.1083 8.99529 14.1083H7.00486C6.89426 14.1083 6.83896 14.1083 6.79312 14.0823C6.74727 14.0564 6.71881 14.009 6.6619 13.9142L5.67273 12.2662C5.61581 12.1714 5.58735 12.1239 5.54151 12.098C5.49566 12.072 5.44036 12.072 5.32977 12.072H3.33945C3.2288 12.072 3.17347 12.072 3.12761 12.0461C3.08176 12.0201 3.0533 11.9726 2.9964 11.8777L2.0152 10.2415C1.9551 10.1413 1.92505 10.0911 1.92505 10.0358C1.92505 9.9804 1.9551 9.93029 2.0152 9.83006L2.98951 8.20528C3.04963 8.10502 3.07969 8.0549 3.07969 7.99951C3.07968 7.94413 3.04961 7.89401 2.98946 7.79377L2.01529 6.17011C1.95514 6.06987 1.92507 6.01975 1.92507 5.96437C1.92506 5.90899 1.95512 5.85886 2.01524 5.7586L2.9964 4.1224C3.0533 4.0275 3.08176 3.98005 3.12761 3.95408C3.17347 3.92811 3.2288 3.92811 3.33945 3.92811H5.32977C5.44036 3.92811 5.49566 3.92811 5.54151 3.90216C5.58735 3.87621 5.61581 3.82879 5.67273 3.73397L6.6619 2.08599C6.71881 1.99116 6.74727 1.94375 6.79312 1.9178C6.83896 1.89185 6.89426 1.89185 7.00486 1.89185H8.99529C9.10588 1.89185 9.16118 1.89185 9.20703 1.9178C9.25287 1.94375 9.28133 1.99116 9.33825 2.08599L10.3274 3.73397C10.3843 3.82879 10.4128 3.87621 10.4586 3.90216C10.5045 3.92811 10.5598 3.92811 10.6704 3.92811H12.6607C12.7713 3.92811 12.8267 3.92811 12.8725 3.95408C12.9184 3.98005 12.9468 4.0275 13.0037 4.1224L13.9849 5.7586C14.045 5.85886 14.0751 5.90899 14.0751 5.96437C14.0751 6.01975 14.045 6.06987 13.9849 6.17011L13.0107 7.79377Z" stroke="currentColor" stroke-miterlimit="10"/></svg>',Nr='[class*="sidebarCol"] [class*="triggerRow"]',Oo='button[aria-haspopup="menu"]',Fr=400,yt="data-mobile-nav-quick-menu",Br="[data-mobile-nav-quick-menu]";function kt(e){let t=e.locale.bind($),o=null,a=null,n=null,i=()=>{let T=F();return T===null?null:T.querySelector(Nr)},r=()=>{n!==null&&(window.clearTimeout(n),n=null)},s=T=>{let g=document.documentElement;g.setAttribute("data-mobile-nav-quick","");let y=!1,p=()=>{y||(y=!0,r(),g.removeAttribute("data-mobile-nav-quick"))},h=()=>T.getAttribute("aria-expanded")==="true";h()||T.click(),requestAnimationFrame(()=>{let w=document.querySelectorAll('[role="menu"]'),A=(h()&&w.length>0?w[w.length-1]:null)?.querySelector('[role="menuitem"]')??null;if(A===null){h()&&T.click(),p();return}A.click(),n=window.setTimeout(()=>{h()&&T.click(),p()},Fr)})},l=()=>{let T=i();if(T===null)return;let g=T.querySelector(Oo);g!==null&&s(g)},c=()=>{o=document.createElement("span"),o.dataset.mobileNav="quick-settings-wrap",a=document.createElement("button"),a.type="button",a.dataset.mobileNav="quick-settings",a.setAttribute("aria-label",t("quickSettings")),a.setAttribute("aria-haspopup","dialog"),a.title=t("quickSettings"),a.innerHTML=Hr,a.addEventListener("click",l),o.appendChild(a)},b=T=>![...T.children].some(g=>g.getAttribute("data-phase")!==null||g.getAttribute("role")==="status"),m=()=>{for(let T of document.querySelectorAll(Br))T.removeAttribute(yt)},v=T=>{let g=document.querySelectorAll('[role="menu"]'),y=g.length>0?g[g.length-1]??null:null;if(y===null)return;let p=T.querySelector(Oo);if(!(p!==null&&p.getAttribute("aria-expanded")==="true"&&b(T))){y.removeAttribute(yt);return}y.hasAttribute(yt)||y.setAttribute(yt,"")};return{name:"drawer-quick-settings",scopes:["*"],ensure:()=>{let T=i();T!==null&&((a===null||o===null)&&c(),o!==null&&o.parentElement!==T&&T.appendChild(o),v(T))},dispose:()=>{r(),document.documentElement.removeAttribute("data-mobile-nav-quick"),m(),o?.remove(),o=null,a=null}}}function Io(e){return Number.isNaN(e)?1:Math.min(4,Math.max(1,e))}function me(){return{scale:1,x:0,y:0}}function Ho(e,t,o){if(!Number.isFinite(t)||t<=0)return{...e};if(!(e.scale>0))return me();let a=Io(e.scale*t);if(a===1)return me();let n=a/e.scale;return{scale:a,x:o.x-(o.x-e.x)*n,y:o.y-(o.y-e.y)*n}}function Et(e,t){let o=Io(e.scale);if(o===1)return me();let a=Number.isFinite(t.width)&&t.width>0?t.width:0,n=Number.isFinite(t.height)&&t.height>0?t.height:0,i=(o-1)*a/2,r=(o-1)*n/2,s=Number.isFinite(e.x)?Math.min(i,Math.max(-i,e.x)):0,l=Number.isFinite(e.y)?Math.min(r,Math.max(-r,e.y)):0;return{scale:o,x:s,y:l}}function No(e,t){let o=Math.hypot(e.x,e.y),a=Math.hypot(t.x,t.y);return o===0||!Number.isFinite(o)||!Number.isFinite(a)?1:a/o}function Fo(e){return e.scale<=1?{scale:2.5,x:0,y:0}:me()}function Bo(){let e=null,t=null,o=me(),a=new Map,n=null,i=null,r=null,s=()=>({width:window.innerWidth,height:window.innerHeight}),l=()=>{for(let x of document.body.querySelectorAll(':scope > [role="dialog"][aria-modal="true"]')){if(!(x instanceof HTMLElement))continue;let u=x.querySelector(":scope > :first-child > img");if(u instanceof HTMLImageElement)return{root:x,image:u}}return null},c=()=>{t!==null&&(t.style.transform="",t.style.transformOrigin="",t.style.willChange="",t=null)},b=()=>{e!==null&&(e.removeEventListener("pointerdown",g),e.removeEventListener("pointermove",y),e.removeEventListener("pointerup",p),e.removeEventListener("pointercancel",h),e.removeEventListener("gesturestart",w),e.removeEventListener("touchmove",E),e.getAttribute("data-mobile-nav")==="image-lightbox"&&e.removeAttribute("data-mobile-nav")),c(),a.clear(),n=null,i=null,r=null,o=me(),e=null},m=()=>{if(t===null)return{x:0,y:0};let x=t.getBoundingClientRect();return{x:x.left+x.width/2-o.x,y:x.top+x.height/2-o.y}},v=()=>{t!==null&&(t.style.transform="translate3d("+o.x+"px, "+o.y+"px, 0) scale("+o.scale+")")},T=()=>{let x=[...a.values()],u=x[0],d=x[1];if(u===void 0||d===void 0)return;let C={x:(u.x+d.x)/2,y:(u.y+d.y)/2},f=m();i={startSpan:{x:d.x-u.x,y:d.y-u.y},startMid:C,startZoom:{...o},anchor:{x:C.x-f.x,y:C.y-f.y}},n=null},g=x=>{if(x.pointerType!=="mouse"){if(a.set(x.pointerId,{x:x.clientX,y:x.clientY}),a.size>=2){T();return}n={pointerId:x.pointerId,startX:x.clientX,startY:x.clientY,originX:o.x,originY:o.y,moved:!1,startedOnImage:x.target===t}}},y=x=>{if(!a.has(x.pointerId))return;let u={x:x.clientX,y:x.clientY};if(a.set(x.pointerId,u),a.size>=2){if(i===null){T();return}let f=[...a.values()],k=f[0],_=f[1];if(k===void 0||_===void 0)return;let L={x:(k.x+_.x)/2,y:(k.y+_.y)/2},M=No(i.startSpan,{x:_.x-k.x,y:_.y-k.y}),S=Ho(i.startZoom,M,i.anchor);o=Et({scale:S.scale,x:S.x+(L.x-i.startMid.x),y:S.y+(L.y-i.startMid.y)},s()),v();return}if(n===null||n.pointerId!==x.pointerId||!n.startedOnImage)return;let d=u.x-n.startX,C=u.y-n.startY;(Math.abs(d)>4||Math.abs(C)>4)&&(n.moved=!0),o=Et({scale:o.scale,x:n.originX+d,y:n.originY+C},s()),v()},p=x=>{if(!a.delete(x.pointerId))return;if(a.size>=2){T();return}if(a.size===1){let C=[...a.entries()][0];if(i=null,n=null,C!==void 0){let[f,k]=C;n={pointerId:f,startX:k.x,startY:k.y,originX:o.x,originY:o.y,moved:!0,startedOnImage:!0}}return}let u=n;if(n=null,i=null,u===null||u.pointerId!==x.pointerId||!u.startedOnImage||u.moved){r=null;return}let d=Date.now();if(r!==null&&d-r.at<=320&&Math.hypot(x.clientX-r.x,x.clientY-r.y)<=28){o=Et(Fo(o),s()),r=null,v();return}r={at:d,x:x.clientX,y:x.clientY}},h=x=>{a.delete(x.pointerId),a.size<2&&(i=null),a.size===0&&(n=null,r=null)},w=x=>{x.preventDefault()},E=x=>{x.touches.length>1&&x.preventDefault()},A=(x,u)=>{e=x,t=u,o=me(),a.clear(),n=null,i=null,r=null,e.setAttribute("data-mobile-nav","image-lightbox"),t.style.transformOrigin="50% 50%",t.style.willChange="transform",e.addEventListener("pointerdown",g),e.addEventListener("pointermove",y),e.addEventListener("pointerup",p),e.addEventListener("pointercancel",h),e.addEventListener("gesturestart",w),e.addEventListener("touchmove",E,{passive:!1})};return{name:"image-lightbox-zoom",scopes:["*"],ensure:()=>{let x=l();if(x===null){b();return}if(e===x.root){t!==x.image&&(c(),t=x.image,o=me(),t.style.transformOrigin="50% 50%",t.style.willChange="transform");return}b(),A(x.root,x.image)},dispose:()=>{b()}}}var Be=new WeakMap,ia=!1;function ra(){ia=!0}function sa(){ia=!1}function la(){return ia}function Tt(e){return typeof e=="object"&&e!==null&&"parentElement"in e&&e.parentElement!==void 0}function zo(e,t,o){let a=performance.now()+t;if(!Tt(e)){if(typeof e!="object"&&typeof e!="function"||e===null)return;Be.set(e,a);return}let n=e;for(;n!==null&&(Be.set(n,a),n!==o);)n=Tt(n.parentElement)?n.parentElement:null}function tt(e){let t=performance.now(),o=e.target;if(!Tt(o)){if(typeof o!="object"&&typeof o!="function"||o===null)return!1;let n=Be.get(o);return n===void 0?!1:n<=t?(Be.delete(o),!1):!0}let a=o;for(;a!==null;){let n=Be.get(a);if(n!==void 0)if(n<=t)Be.delete(a);else return!0;a=Tt(a.parentElement)?a.parentElement:null}return!1}var zr=["node","session","summary","result"],Dr=["sessionId","id"],qr=["__reactFiber$","__reactInternalInstance$"];function Vr(e){if(typeof e!="object"||e===null)return null;let t=e.id;return typeof t=="string"?t:null}function Wr(e,t){if(e==null)return null;for(let o of zr){let a=Vr(e[o]);if(a!==null&&t(a))return a}for(let o of Dr){let a=e[o];if(typeof a=="string"&&t(a))return a}return null}function _t(e,t,o=60){let a=e;for(let n=0;n<o&&a!==null&&a!==void 0;n+=1){let i=Wr(a.memoizedProps,t);if(i!==null)return i;a=a.return}return null}function St(e){if(e==null||typeof e!="object")return null;let t=e;for(let o of qr)for(let a of Object.keys(t)){if(!a.startsWith(o))continue;let n=t[a];if(typeof n=="object"&&n!==null)return n}return null}function da(e,t,o){return Math.abs(t.x-e.x)<=o&&Math.abs(t.y-e.y)<=o}var Kr=.45;function Ur(e,t=Kr){return Math.round(e*t)}var ca=8,Gr=.16,Do=.13,jo=60,jr=.45,$r=.45,Ce=350,Xr=300,$o=8,Ae=110,qo=280,Vo=101,Yr=.45,Zr=.16,Qr=.45,xe=0,Me=!1,ye=[],nt=0,ha=0,Re=!1,ke=0,ot=null,X=null,Pe=!1,Xo=0,Le=!1,be=!1,it=!1,fe="drawer",ua=!1,Yo=()=>!1;function Jr(e,t,o){let a=o?-t.dx:t.dx;if(Math.abs(a)<=e.lockPx||Math.abs(a)<=Math.abs(t.dy))return"none";if(e.drawerOpen){if(Math.abs(a)/e.viewportWidthPx>=e.closeDistanceRatio)return"close";let r=o?-t.velX:t.velX;return r>0!=a>0?"none":Math.abs(r)>=e.closeVelocity?"close":"none"}return a<=0?"none":a/e.viewportWidthPx>=e.openDistanceRatio||(o?-t.velX:t.velX)>=e.openVelocity?"open":"none"}function es(e,t,o){let a=o?-t.dx:t.dx;if(Math.abs(a)<=e.lockPx||Math.abs(a)<=Math.abs(t.dy))return"none";let n=o?-t.velX:t.velX;if(a<0)return e.panelOpen||e.drawerOpen?"none":-a/e.viewportWidthPx>=e.distanceRatio?"files":n>0!=a>0?"none":-n>=e.velocity?"files":"none";if(e.drawerOpen){let i=e.drawerCloseDistanceRatio??e.distanceRatio;return a/e.viewportWidthPx>=i?"close":n<=0?"none":n>=e.velocity?"close":"none"}return e.panelOpen?a/e.viewportWidthPx>=e.distanceRatio?"files":n>0!=a>0?"none":n>=e.velocity?"files":"none":"none"}function ts(e,t,o){let a=o-t,n=e.filter(l=>l.t>=a);if(n.length<2)return 0;let i=n[n.length-2],r=n[n.length-1],s=r.t-i.t;return s<=0?0:(r.x-i.x)/s}function as(e,t,o,a){let n=o?e:t-e;return n>=0&&n<=a}function os(e,t){return e||!t?"drawer":"files"}function ns(e,t,o,a){let n=e<=0?-1:1,i=Math.abs(e),r=o?-t:t;return a?r>=0?null:n*Math.min(i,-r)+0:r<=0?null:n*(i-Math.min(i,r))+0}function Zo(e,t){let o=t?-e:e;return o<=0?null:t?`translateX(max(0px, calc(${Vo}% - ${o}px)))`:`translateX(min(0px, calc(-${Vo}% + ${o}px)))`}function is(e){let t=e;for(;t!==null;){if((t.overflowX==="auto"||t.overflowX==="scroll")&&t.scrollWidth>t.clientWidth+1)return t;t=t.parent}return null}function Ve(){let e=F();return e!==null&&e.firstElementChild instanceof HTMLElement?e.firstElementChild:null}function ma(){let e=F();return e!==null&&!e.hasAttribute("data-sidebar-collapsed")}function Qo(){let e=document.querySelector("[data-sidebar-right-panel]");return e!==null&&e.hasAttribute("data-sidebar-right-open")}function rs(e){let t=null,o=e;for(;o!==null;)t={parent:t,scrollWidth:o.scrollWidth,clientWidth:o.clientWidth,overflowX:getComputedStyle(o).overflowX},o=o.parentElement;return t}function Mt(){return document.querySelector('[aria-modal="true"]')!==null}function fa(){return document.documentElement.hasAttribute("data-dsh-taskboard-active")||document.documentElement.hasAttribute("data-dsh-ssh-active")||document.querySelector("[data-conversation-composer-overlay]")!==null}function Jo(){if(typeof window>"u")return!1;let e=window.getSelection();if(e!==null&&!e.isCollapsed)return!0;if(typeof document>"u")return!1;let t=document.activeElement;if(t===null)return!1;let o=t.tagName;if(o!=="TEXTAREA"&&o!=="INPUT")return!1;try{let{selectionStart:a,selectionEnd:n}=t;return typeof a=="number"&&typeof n=="number"&&a!==n}catch{return!1}}function en(){return performance.now()<ke}function tn(e){return document.documentElement.hasAttribute("data-mobile-nav-dragging")||document.body.hasAttribute("data-mobile-nav-dragging")?!0:e.target instanceof Element&&e.target.closest("[data-mobile-nav-dragging]")!==null}var Wo=200;function ss(e){let t=e.closest(".dsh-pet-root");if(t!==null)return t;if(e.closest('[data-mobile-nav="frame"]')!==null)return null;let o=e;for(;o!==null;){if(o instanceof HTMLElement){let a=getComputedStyle(o);if((a.position==="fixed"||a.position==="absolute")&&o.offsetWidth<=Wo&&o.offsetHeight<=Wo)return o}o=o.parentElement}return null}function an(e){return e.target instanceof Element&&ss(e.target)!==null}function Ko(){X=null,Pe=!1,be=!1,it=!1,Le=rt();let e=Ve();if(e===null||!Re)return;X=e;let t=e.getBoundingClientRect().width*Ae/100;Xo=Le?t:-t}var pa=!1,ze=0;function ba(){if(!pa)return;pa=!1,X?.style.removeProperty("content-visibility");let e=Ve();e!==null&&e!==X&&e.style.removeProperty("content-visibility")}function ls(e){if(be||it)return;let t=Ve();if(t===null||Mt()||fa()){it=!0;return}X=t,Pe=!0,t.style.setProperty("transition","none","important");let o=Zo(1e-4,Le);t.style.setProperty("transform",o??`translateX(-${Ae}%)`,"important"),t.style.willChange="transform",t.style.setProperty("content-visibility","hidden","important"),pa=!0,be=!0,e.layout.toggleSidebar(),ze=requestAnimationFrame(()=>{ze=requestAnimationFrame(()=>{ze=0,ba()})})}function Uo(e,t){if(!Me||fe!=="drawer")return;if(!Re){let a=Le?-t:t;if(!be&&(a<$o||(ls(e),!be)))return;let n=Zo(t,Le);if(n===null){X?.style.setProperty("transform",`translateX(-${Ae}%)`,"important");return}X?.style.setProperty("transform",n,"important");return}if(X===null)return;let o=ns(Xo,t,Le,Re);if(o===null){Pe=!0,X.style.setProperty("transition","none","important"),X.style.setProperty("transform","translateX(0px)","important");return}Pe=!0,X.style.setProperty("transition","none","important"),X.style.setProperty("transform",`translateX(${o}px)`,"important")}function At(){let e=X;!Pe||e===null||(Pe=!1,e.style.removeProperty("transition"),e.style.removeProperty("transform"))}var De=null;function Ct(){let e=De;if(e===null)return;De=null,window.clearTimeout(e.timer),e.el.style.removeProperty("transition"),e.el.style.removeProperty("transform");let t=F();t!==null&&!t.hasAttribute("data-sidebar-collapsed")&&e.ctx.layout.toggleSidebar()}function on(e,t,o){let a=De;if(!(a!==null&&a.el===t&&a.target===o)){if(Ct(),window.matchMedia("(prefers-reduced-motion: reduce)").matches){na(),ke=performance.now()+Ce,De={el:t,ctx:e,timer:0,target:o},Ct();return}t.style.setProperty("transition",`transform ${qo}ms ease-in-out`,"important"),t.style.getPropertyValue("transform")!==""&&t.getBoundingClientRect(),t.style.setProperty("transform",o,"important"),na(),ke=performance.now()+Ce,De={el:t,ctx:e,timer:window.setTimeout(Ct,qo+40),target:o}}}function Lt(e){let t=X;if(X=null,Pe=!1,t===null){At(),e.layout.toggleSidebar(),ke=performance.now()+Ce;return}let o=Le?`translateX(${Ae}%)`:`translateX(-${Ae}%)`;on(e,t,o)}function nn(e){if(!ma()||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return!1;let t=Ve();if(t===null)return!1;let o=rt()?`translateX(${Ae}%)`:`translateX(-${Ae}%)`;return on(e,t,o),!0}function Se(e,t=!1){if(De!==null){t&&Ct();return}let o=be;if(be=!1,it=!1,ba(),o&&e!==null&&X!==null&&!t){qe(),Lt(e);return}At(),qe(),o&&e!==null&&(e.layout.toggleSidebar(),ke=performance.now()+Ce)}function ds(e,t,o){if(en()||Mt()||fa()||Jo()||tn(e)||an(e)||!(e.target instanceof Element)||is(rs(e.target))!==null||e.target.closest('[class*="_composerSeat"], [data-composer-card], [class*="_dock"]')!==null)return!1;let a=ma(),n=Ur(o,Yr);if(a){let i=F();if(i===null)return!1;let r=i.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom||e.target.closest('[class*="sessionRow"] button')!==null)return!1;let s=Ve(),l=s===null?null:s.getBoundingClientRect(),c=l!==null&&e.clientX>=l.left&&e.clientX<=l.right;fe=os(c,as(e.clientX,o,t,n))}else Qo()?fe="files":fe="pending";return xe=e.pointerId,Me=!1,nt=e.clientX,ha=e.clientY,ye=[{t:e.timeStamp,x:e.clientX}],!0}function cs(e){let t=e.clientX-nt,o=e.clientY-ha;return Math.max(Math.abs(t),Math.abs(o))<ca?!1:tn(e)||an(e)||Math.abs(t)<=Math.abs(o)?(qe(),!1):(Me=!0,Re=ma(),fe==="pending"&&(fe=t>0!==rt()?"drawer":"files"),fe==="files"?(ua=Qo(),Re&&Ko(),ra(),!0):(ra(),Ko(),!0))}function Go(e){ye.push({t:e.timeStamp,x:e.clientX});let t=e.timeStamp-jo,o=0;for(;o<ye.length-1&&ye[o].t<t;)o+=1;o>0&&(ye=ye.slice(o))}function ps(e,t,o,a){let n=Me,i=be;be=!1,it=!1;let r=fe==="files",s=ua,l=ts(ye,jo,t.timeStamp),c=t.clientX-nt,b=t.clientY-ha;if(qe(),!n){i&&Lt(e);return}let v=Mt()||!i&&en()?"none":r?es({distanceRatio:Zr,velocity:Qr,lockPx:ca,viewportWidthPx:a,panelOpen:s,drawerOpen:Re,drawerCloseDistanceRatio:Do},{dx:c,dy:b,velX:l},o):Jr({openDistanceRatio:Gr,closeDistanceRatio:Do,openVelocity:jr,closeVelocity:$r,lockPx:ca,viewportWidthPx:a,drawerOpen:Re},{dx:c,dy:b,velX:l},o);if(ba(),i){let T=c>0!==o&&Math.abs(c)>=$o;v==="open"||T?(At(),ke=performance.now()+Ce):Lt(e),t.target instanceof Element&&at(t.target);return}if(t.target instanceof Element){if(v==="close"){at(t.target),Lt(e);return}At(),v==="open"&&(at(t.target),e.layout.toggleSidebar(),ke=performance.now()+Ce),v==="files"&&(Yo(),at(t.target),ke=performance.now()+Ce),r&&v==="none"&&at(t.target)}}function at(e){let t=Ve(),o=t!==null&&t.contains(e)?t:F()??null;zo(e,Xr,o),ot=e}function qe(){xe=0,Me=!1,ye=[],fe="drawer",ua=!1,sa()}function rt(){let e=F();return e!==null&&getComputedStyle(e).direction==="rtl"}function rn(e,t){H(e,"dsh-web-mobile: sidebar swipe gestures",()=>{Yo=t;let o=()=>window.innerWidth||document.documentElement.clientWidth||0,a=m=>{if(ot=null,sa(),!(m.pointerType!=="touch"&&m.pointerType!=="pen")){if(xe!==0&&xe!==m.pointerId){Se(e);return}ds(m,rt(),o())}},n=m=>{if(m.pointerId===xe){if(Mt()||fa()){Se(e);return}if(Me)Go(m),Uo(e,m.clientX-nt);else{if(Jo()){qe();return}cs(m)&&(Go(m),Uo(e,m.clientX-nt))}}},i=m=>{m.pointerId===xe&&ps(e,m,rt(),o())},r=m=>{m.pointerId===xe&&Se(e)},s=m=>{if(ot===null||!(m.target instanceof Element))return;let v=m.target.closest('[data-mobile-nav="backdrop"], [data-mobile-nav="fab"]');v!==null&&!v.contains(ot)||tt(m)&&(m.stopPropagation(),m.preventDefault(),ot=null)},l=()=>{document.hidden&&Se(e)},c=m=>{if(xe!==0){if(m.touches.length!==1||!m.cancelable||document.hidden){Se(e);return}Me&&m.preventDefault()}};document.addEventListener("pointerdown",a,!0),document.addEventListener("pointermove",n,!0),document.addEventListener("pointerup",i,!0),document.addEventListener("pointercancel",r,!0),document.addEventListener("click",s,!0),document.addEventListener("touchmove",c,{capture:!0,passive:!1});let b=()=>Se(e);return document.addEventListener("visibilitychange",l),window.addEventListener("blur",b),()=>{document.removeEventListener("pointerdown",a,!0),document.removeEventListener("pointermove",n,!0),document.removeEventListener("pointerup",i,!0),document.removeEventListener("pointercancel",r,!0),document.removeEventListener("click",s,!0),document.removeEventListener("touchmove",c,{capture:!0}),document.removeEventListener("visibilitychange",l),window.removeEventListener("blur",b),ze!==0&&(cancelAnimationFrame(ze),ze=0),Se(e,!0)}})}var sn=12,We=null,hs='button[data-dsh-taskboard-entry], button[data-dsh-ssh-entry], [class*="newSession"], [class*="sessionRow"], [class*="searchResultRow"], [class*="searchResultWorkspace"], [class*="panelRow"]';function st(e){nn(e)||e.layout.toggleSidebar()}function ln(e){H(e,"dsh-web-mobile: drawer close (Escape + navigate)",()=>{let t=()=>{st(e)},o=()=>{let _=F();return _!==null&&!_.hasAttribute("data-sidebar-collapsed")},a=_=>{if(_.key==="Escape"&&document.querySelector('[aria-modal="true"]')===null){if(xt()){_.preventDefault();return}o()&&t()}},n=()=>document.querySelector('[data-mobile-nav="frame"] > :first-child'),i=_=>{if(document.querySelector('[aria-modal="true"]')!==null||!o()||!(_ instanceof Element))return!1;let L=n();return L===null||!L.contains(_)||_.closest('[class*="sessionRow"] button')!==null||_.closest('button[class*="panelRow"][aria-haspopup="menu"]')!==null?!1:_.closest(hs)!==null},r=_=>!(_ instanceof Element&&_.closest("[data-dsha-session-select]")!==null)&&i(_),s=0,l="",c=null,b=null,m=_=>{if(!_.isTrusted)return;let L=_.target;L instanceof Element&&L.closest('[class*="sessionRow"] [class*="_title"]')!==null&&(_.preventDefault(),_.stopPropagation())},v=()=>n()?.querySelector('[role="treeitem"][aria-selected="true"]')?.querySelector('[class*="_title"]')?.textContent?.trim()??null,T=()=>{c?.disconnect(),c=null,b!==null&&window.clearTimeout(b),b=null,l=""},g=()=>{T(),l=v()??"";let _=n();_!==null&&(c=new MutationObserver(()=>{if(!o()){T();return}let L=v();L!==null&&L!==l&&(T(),t())}),c.observe(_,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-selected"]}),b=window.setTimeout(T,2e3))},y=_=>e.sessions.list.getSnapshot().byId[_]!==void 0,p=(_,L)=>{if(We===null||!da(We,{x:L.clientX,y:L.clientY},sn))return null;let M=_t(St(_),y);return M===null||ae(e.sessions.list.getSnapshot())===M?null:M},h=null,w=!1,E=0,A=()=>{w=!0,h?.(),h=null,E!==0&&(window.clearTimeout(E),E=0)},x=_=>{A(),w=!1;let L=()=>{w||(A(),o()&&t())};h=e.sessions.list.subscribe(()=>{ae(e.sessions.list.getSnapshot())===_&&(E!==0&&window.clearTimeout(E),E=window.setTimeout(()=>{E=0,L()},0))})},u=0,d=_=>{u=performance.now(),We=_.pointerType==="touch"||_.pointerType==="pen"?{x:_.clientX,y:_.clientY}:null},C=_=>{let L=_.target;if(la()||tt(_))return;if(L instanceof Element&&L.closest('[data-mobile-nav="backdrop"]')!==null){o()&&t();return}let M=L instanceof Element?L.closest('[role="treeitem"][data-dsha-session-select]'):null;if(M!==null&&_.detail>0&&i(L)){if(_.defaultPrevented||We!==null&&(performance.now()-u>=500||!da(We,{x:_.clientX,y:_.clientY},sn)))return;_.preventDefault(),_.stopPropagation(),T(),A(),s=performance.now(),M.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,detail:0}));return}performance.now()-s<500||r(L)&&t()},f=_=>{if(la()||tt(_)||_.pointerType!=="touch"&&_.pointerType!=="pen")return;let L=_.target;if(!(L instanceof Element)||!r(L))return;let M=L.closest('[role="treeitem"]');if(M!==null){if(s=performance.now(),M.getAttribute("aria-selected")==="true")t();else{let S=p(M,_);S===null?(A(),g()):(T(),Ao(e.sessions)?(x(S),e.sessions.open(S)):(A(),g()))}return}},k=()=>{o()&&t()};return document.addEventListener("dsha-session-open",k),document.addEventListener("dblclick",m,!0),document.addEventListener("keydown",a,!0),document.addEventListener("click",C,!0),document.addEventListener("pointerdown",d,!0),document.addEventListener("pointerup",f,!0),()=>{T(),A(),We=null,document.removeEventListener("dsha-session-open",k),document.removeEventListener("dblclick",m,!0),document.removeEventListener("keydown",a,!0),document.removeEventListener("click",C,!0),document.removeEventListener("pointerdown",d,!0),document.removeEventListener("pointerup",f,!0)}})}var ga=!1,va=!1,Rt=wo({requestFrame:e=>{let t=0;return t=requestAnimationFrame(()=>{t=0,e()}),()=>{t!==0&&cancelAnimationFrame(t)}}});function dn(e){return ga?()=>{}:(ga=!0,H(e,"dsh-web-mobile: DOM reconciler",()=>{let t=new MutationObserver(o=>{let a=new Set;for(let n of o)(n.target instanceof Element?n.target:n.target.parentElement)?.closest("[data-chat-flow]")||a.add(vo(n));a.size>0&&Rt.note(a)});return t.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,characterData:!0,attributeFilter:["style","class","data-phase","data-sidebar-collapsed"]}),Rt.activate(),()=>{t.disconnect(),Rt.deactivate()}}),()=>{ga=!1})}function oe(e){return Rt.register(e)}function cn(e,t){if(va)return()=>{};va=!0;let o=e.locale.bind($),a=[oe(_o()),oe(So(o,()=>st(e),t)),oe(t.task),oe(Co()),oe(Po(e)),oe(kt(e)),oe(Bo())];return()=>{for(let n of a)n();va=!1}}var lt="dsh-mobile-visible-band";function pn({frameBudgetMs:e=32,stutterLimit:t=3,burstIdleMs:o=240}={}){let a=!0,n=0,i=0;return{noteFrame:b=>{if(!a)return!1;if(n===0||b-n>o)return n=b,i=0,!0;let m=b-n;return n=b,m<=e?(i=0,!0):(i+=1,i>=t&&(a=!1),a)},noteSettled:()=>{n=0,i=0},isLive:()=>a,reset:()=>{a=!0,n=0,i=0}}}var hn="data-mobile-nav-ios",wa="width=device-width, initial-scale=1, viewport-fit=cover",un="--dsh-web-mobile-vh",xa=()=>document.querySelector('meta[name="viewport"]');function mn(){let e=null,t=null,o=!1,a=()=>{let s=xa();s!==null&&(e===null&&(e=s.content),!(o||s.content===wa)&&(o=!0,s.content=wa,o=!1))},n=new MutationObserver(a),i=()=>{let s=xa();s!==t&&(t!==null&&n.disconnect(),t=s,s!==null&&n.observe(s,{attributes:!0,attributeFilter:["content"]}))},r=new MutationObserver(()=>{i(),a()});return r.observe(document.head,{childList:!0}),i(),a(),()=>{n.disconnect(),r.disconnect();let s=xa();s!==null&&e!==null&&s.content===wa&&(s.content=e)}}function fn(){let e=document.documentElement,t=0,o=0,a="",n="",i="",r="",s=0,l=0,c=pn(),b=v=>{n!==v&&(n=v,e.style.setProperty("--dsha-mobile-visible-vh",v))},m=()=>{l=0;let v=window.innerHeight,T=window.innerWidth,g=window.visualViewport,p=`${Math.max(1,Math.min(v,g?.height??v))}px`,h=`${g?.offsetTop??0}px`;e.style.getPropertyValue("--dsha-mobile-viewport-top")!==h&&e.style.setProperty("--dsha-mobile-viewport-top",h),s=p===r?s+1:0,r=p;let w=s>=2;if(c.isLive()?(b(p),w?c.noteSettled():c.noteFrame(performance.now())):w&&b(p),w&&p!==i&&(i=p,document.dispatchEvent(new CustomEvent(lt))),!w&&l===0&&(l=requestAnimationFrame(m)),t===0||v>t||T!==o){t=v,o=T;let E=`${v}px`;E!==a&&(a=E,e.style.setProperty(un,E))}};return m(),window.addEventListener("resize",m),window.visualViewport?.addEventListener("resize",m),window.visualViewport?.addEventListener("scroll",m),()=>{window.removeEventListener("resize",m),window.visualViewport?.removeEventListener("resize",m),window.visualViewport?.removeEventListener("scroll",m),l!==0&&cancelAnimationFrame(l),l=0,e.style.removeProperty("--dsha-mobile-visible-vh"),e.style.removeProperty("--dsha-mobile-viewport-top"),a="",e.style.removeProperty(un)}}function bn(e){if(!e)return;let t=document.documentElement;return t.setAttribute(hn,""),()=>{t.removeAttribute(hn)}}var us='[data-dsh-responsive-part="sidebar-toggle"]:not([data-mobile-nav])',gn='[data-mobile-nav="dismiss-shadow"]';function ms(){if(typeof document>"u")return;let e=document.querySelector(gn),t=document.querySelector(us),o=t?.closest('[data-pane="sidebar"]')??null;if(t===null||o===null){e?.remove();return}if(e!==null&&e.parentElement===o&&o.firstElementChild===e)return;let a=e??document.createElement("span");e===null&&(a.setAttribute("data-mobile-nav","dismiss-shadow"),a.setAttribute("data-dsh-responsive-part","sidebar-toggle"),a.setAttribute("aria-hidden","true"),a.style.setProperty("display","none","important")),o.insertBefore(a,o.firstElementChild)}function vn(){if(ya)return()=>{};ya=!0;let e=null,t=oe({name:"frame-marker",scopes:["*"],ensure:()=>{e=Jt(),e!==null&&!e.hasAttribute("data-mobile-nav")&&e.setAttribute("data-mobile-nav","frame"),ms()},dispose:()=>{e!==null&&e.removeAttribute("data-mobile-nav"),typeof document<"u"&&document.querySelector(gn)?.remove(),e=null}}),o=oe(go());return()=>{o(),t(),ya=!1}}var ya=!1;function wn(e){H(e,"dsh-web-mobile: status bar theme + viewport + zoom guard",()=>{let t=document.createElement("meta");t.name="theme-color";let o=()=>getComputedStyle(document.body).backgroundColor,a=typeof CSS<"u"&&typeof CSS.supports=="function"?l=>CSS.supports(l):null;t.content=o(),t.parentElement===null&&document.head.appendChild(t);let n=new MutationObserver(()=>{t.content=o()});n.observe(document.body,{attributes:!0,attributeFilter:["data-ds-dark-theme"]});let i=mn(),r=bn(uo(navigator,a)),s=fn();return()=>{s(),n.disconnect(),i(),t.remove(),r?.()}})}var Pt="data-mobile-nav-selecting";function fs(){let e=window.getSelection();if(e===null||e.isCollapsed)return!1;let t=e.anchorNode;if(t===null)return!1;let o=t instanceof HTMLElement?t:t.parentElement;return o===null||o.closest("[data-composer-card]")!==null?!1:o.closest("[data-phase]")!==null}function xn(e){H(e,"dsh-web-mobile: selection chrome yield",()=>{if(typeof document>"u")return;let t=document.documentElement,o=()=>{let a=fs();a!==t.hasAttribute(Pt)&&(a?t.setAttribute(Pt,""):t.removeAttribute(Pt))};return document.addEventListener("selectionchange",o),o(),()=>{document.removeEventListener("selectionchange",o),t.removeAttribute(Pt)}})}var yn='[data-mobile-nav="frame"] button[class*="_trigger"][aria-haspopup="tree"][aria-expanded]:not([class*="_switcherTrigger"])',bs='[class*="ZKlsPq_root"], [class*="ZKlsPq_menu"], [class*="h8S2Va_root"], [class*="h8S2Va_menu"]',gs=800,vs=1e3,kn=["mouseover","mouseout","mouseenter","mouseleave","pointerout","pointerleave"];function En(e){H(e,"dsh-web-mobile: lineage chip touch toggle",()=>{if(typeof PointerEvent>"u")return;let t=0,o=()=>{t=Date.now()+gs},a=null,n=0,i=c=>{if(c.pointerType!=="touch"&&c.pointerType!=="pen")return;o();let b=c.target;if(!(b instanceof Element))return;let m=b.closest(yn);if(m===null)return;let v=m.getAttribute("aria-expanded")==="true";m.dispatchEvent(new KeyboardEvent("keydown",{key:v?"Escape":"ArrowDown",bubbles:!0,cancelable:!0})),a=m,n=Date.now()+vs},r=c=>{if(a===null)return;if(Date.now()>=n){a=null;return}let b=c.target;b instanceof Element&&b.closest(yn)===a&&(a=null,c.stopPropagation())},s=c=>{c.pointerType!=="touch"&&c.pointerType!=="pen"||o()},l=c=>{if(Date.now()>=t||!c.isTrusted)return;let b=c.target;b instanceof Element&&b.closest(bs)!==null&&c.stopImmediatePropagation()};document.addEventListener("pointerdown",s,!0),document.addEventListener("pointerup",i,!0),document.addEventListener("click",r,!0);for(let c of kn)document.addEventListener(c,l,!0);return()=>{document.removeEventListener("pointerdown",s,!0),document.removeEventListener("pointerup",i,!0),document.removeEventListener("click",r,!0);for(let c of kn)document.removeEventListener(c,l,!0)}})}var ws="workspace",xs='data-mobile-nav="session-delete"',ka="var(--dsw-alias-state-error-primary, #b91c1c)",ys='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.4782 4.84067L14.2138 10.1152C14.1102 12.1872 14.067 13.0115 13.3866 13.9607C13.1044 14.3546 12.7498 14.6912 12.3424 14.9535C11.8239 15.2872 11.2415 15.4316 10.5585 15.4998C9.88727 15.5668 9.04946 15.5656 7.99998 15.5656C6.95051 15.5656 6.1127 15.5668 5.44142 15.4998C4.75851 15.4316 4.17602 15.2872 3.65753 14.9535C3.25012 14.6912 2.89559 14.3546 2.61332 13.9607C1.93296 13.0115 1.88979 12.1872 1.78619 10.1152L1.52179 4.84067L2.89006 4.77277L3.15343 10.0463C3.26221 12.2218 3.32452 12.6015 3.72646 13.1624C3.90825 13.4161 4.13686 13.6334 4.39927 13.8023C4.66204 13.9714 5.00263 14.0792 5.57825 14.1367C6.16562 14.1953 6.92298 14.1963 7.99998 14.1963C9.07699 14.1963 9.83434 14.1953 10.4217 14.1367C10.9973 14.0792 11.3379 14.1367 11.6007 13.8023C11.8631 13.6334 12.0917 13.4161 12.2735 13.1624C12.6755 12.6015 12.7378 12.2218 12.8465 10.0463L13.1099 4.77277L14.4782 4.84067ZM5.43011 6.22849H6.7994V11.3909H5.43011V6.22849ZM9.20056 6.22849H10.5699V11.3909H9.20056V6.22849ZM8.53597 0.434431C9.17976 0.434431 9.6522 0.426926 10.0966 0.571258C10.2357 0.616451 10.3717 0.672554 10.502 0.738948C10.9182 0.951107 11.2464 1.29099 11.7015 1.74612L12.4978 2.54136H15.3742V3.91169H0.625732V2.54136H3.50218L4.29845 1.74612C4.75358 1.29099 5.08174 0.951107 5.49801 0.738948C5.62831 0.672554 5.76425 0.616451 5.90334 0.571258C6.34776 0.426926 6.82021 0.434431 7.46399 0.434431H8.53597ZM7.46399 1.80476C6.73208 1.80476 6.51641 1.81187 6.32617 1.87369C6.25545 1.89667 6.18668 1.92533 6.12041 1.95907C5.96398 2.03878 5.82348 2.16253 5.44142 2.54136H10.5585C10.1765 2.16253 10.036 2.03878 9.87955 1.95907C9.81329 1.92533 9.74452 1.89667 9.6738 1.87369C9.48356 1.81187 9.26789 1.80476 8.53597 1.80476H7.46399Z" fill="currentColor" /></svg>';function Oe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Tn(e){H(e,"dsh-web-mobile: session-menu delete",()=>{let t=e.locale.bind($),o=(f,k)=>e.locale.bind(ws)(f,k),a=null,n=0,i=null,r=null,s=0,l=f=>{let k=f.getAttribute("data-row-key")??"";if(k.startsWith("session:")){let L=k.slice(8);if(L!=="")return L}let _=f.getAttribute("data-dsha-session-select");return _!==null&&_!==""?_:_t(St(f),w)},c=f=>(f.querySelector('[class*="_itemLabel"]')??f).textContent?.trim()??"",b=f=>{let k=[...f.querySelectorAll('[role="menuitem"]')].map(c),_=o("rename"),L=o("menu.fork");return k.includes(_)&&k.includes(L)&&k.includes(o("menu.archiveSession"))},m=()=>{r!==null&&(document.removeEventListener("keydown",r,!0),r=null),i!==null&&(i.backdrop.remove(),i.card.remove(),i=null)},v=(f,k)=>{m();let _=document.body,L=document.createElement("div");L.dataset.mobileNav="delete-dialog-backdrop";let M=document.createElement("div");M.dataset.mobileNav="delete-dialog",M.setAttribute("role","dialog"),M.setAttribute("aria-modal","true"),M.innerHTML=`
        <div data-mobile-nav="delete-confirm-title">${Oe(t("deleteConfirmTitle"))}</div>
        <div data-mobile-nav="delete-confirm-desc">${Oe(t("deleteConfirmDesc",{title:k}))}</div>
        <div data-mobile-nav="delete-confirm-actions">
          <button type="button" data-mobile-nav="delete-confirm-no">${Oe(t("deleteConfirmNo"))}</button>
          <button type="button" data-mobile-nav="delete-confirm-yes">${Oe(t("deleteConfirmYes"))}</button>
        </div>
        <div data-mobile-nav="delete-error" role="alert" hidden></div>`;let S=M.querySelector('[data-mobile-nav="delete-confirm-no"]'),R=M.querySelector('[data-mobile-nav="delete-confirm-yes"]'),P=M.querySelector('[data-mobile-nav="delete-error"]');S?.addEventListener("click",m),L.addEventListener("click",W=>{W.target===L&&m()});let D=W=>{W.key==="Escape"&&m()};document.addEventListener("keydown",D,!0),r=D;let Q=()=>{R!==null&&(R.disabled=!1,R.textContent=t("deleteConfirmYes")),S!==null&&(S.disabled=!1)},K=W=>{P!==null&&(P.textContent=W,P.hidden=!1),Q()},G=(W,j)=>{let Te=W?.error?.code;if(Te==="session-not-found")return t("deleteErrorNotFound");if(Te==="session-busy")return t("deleteErrorBusy");let O=W?.error?.message??(j instanceof Error?j.message:String(j));return t("deleteErrorGeneric",{message:O})};R?.addEventListener("click",async()=>{R.disabled=!0,S!==null&&(S.disabled=!0),R.textContent=t("deletePending"),P!==null&&(P.hidden=!0);let W=++s;try{let N=await fetch("/api/mobile-nav.session.delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionId:f})}),I=await N.json().catch(()=>null);if(!N.ok||I===null||I.ok!==!0){K(G(I,new Error(`HTTP ${N.status}`)));return}}catch(N){let I=!1;try{I=await Mo({listed:()=>e.sessions.list.getSnapshot()?.byId?.[f]!==void 0,refresh:async()=>{await e.sessions.refresh?.()},sleep:B=>new Promise(J=>{window.setTimeout(()=>{J()},B)})})}catch{I=!1}if(!I){K(G(null,N));return}}let j=ae(e.sessions.list.getSnapshot())===f;if(W!==s)return;m(),j&&Lo(e.sessions)&&e.sessions.clear();let Te=e.sessions;try{await Te.refresh?.()}catch(N){console.warn("[dsh-web-mobile] session list refresh after delete failed:",N)}let O=F();O===null||O.hasAttribute("data-sidebar-collapsed")||j&&window.matchMedia(ue).matches&&st(e)}),_.appendChild(L),L.appendChild(M),i={backdrop:L,card:M}},T=f=>{m();let k=document.body,_=document.createElement("div");_.dataset.mobileNav="delete-dialog-backdrop";let L=document.createElement("div");L.dataset.mobileNav="delete-dialog",L.setAttribute("role","dialog"),L.setAttribute("aria-modal","true"),L.innerHTML=`
        <div data-mobile-nav="delete-confirm-title">${Oe(t("deleteSession"))}</div>
        <div data-mobile-nav="delete-error" role="alert">${Oe(f)}</div>
        <div data-mobile-nav="delete-confirm-actions">
          <button type="button" data-mobile-nav="delete-confirm-no">${Oe(t("deleteConfirmNo"))}</button>
        </div>`,L.querySelector('[data-mobile-nav="delete-confirm-no"]')?.addEventListener("click",m),_.addEventListener("click",S=>{S.target===_&&m()});let M=S=>{S.key==="Escape"&&m()};document.addEventListener("keydown",M,!0),r=M,k.appendChild(_),_.appendChild(L),i={backdrop:_,card:L}},g=new Set,y=f=>{if(f.querySelector(`[${xs}]`)!==null)return;let k=f.querySelector('[role="menuitem"]'),_=k?.parentElement??null,L=f.querySelector('[class*="_viewport"]');if(k===null||_===null||L===null)return;let M=_.cloneNode(!0),S=M.querySelector('[role="menuitem"]');if(S===null)return;let R=S.querySelector('[class*="_itemIcon"]');R!==null&&(R.innerHTML=ys,R.style.color=ka);let P=S.querySelector('[class*="_itemLabel"]');P!==null?(P.textContent=t("deleteSession"),P.style.color=ka):S.firstElementChild===null&&(S.textContent=t("deleteSession"),S.style.color=ka),S.setAttribute("data-mobile-nav","session-delete"),S.addEventListener("click",D=>{D.preventDefault(),D.stopPropagation();let Q=a;Q?.button.click();try{if(Q===null){T(t("deleteErrorResolve"));return}let K=Q.sessionId;if(K===null){T(t("deleteErrorResolve"));return}v(K,Q.title)}catch(K){console.error("[dsh-web-mobile] session delete failed:",K),T(t("deleteErrorGeneric",{message:K instanceof Error?K.message:String(K)}))}}),L.appendChild(M),g.add(M)},p=()=>{for(let k of g)k.isConnected||g.delete(k);let f=o("session.new");for(let k of document.querySelectorAll('[role="menu"]'))b(k)&&(a!==null&&a.title===f||y(k))},h=()=>{n===0&&(n=requestAnimationFrame(()=>{n=0,p()}))},w=f=>e.sessions.list.getSnapshot().byId[f]!==void 0,E=f=>{let k=[...f.querySelectorAll("button")],_=k.find(M=>{let S=M.getAttribute("aria-label")??"";return/session actions/i.test(S)});return _!==void 0?_:k.find(M=>{let S=M.getAttribute("aria-label")??"";return!/archive session|pin session/i.test(S)})??null},A=f=>{if(!(f instanceof Element))return;let k=f.closest('[class*="_sessionRow"]');if(k===null)return;let _=E(k);if(_===null)return;let L=k.querySelector('[class*="_title"]')?.textContent?.trim()??"",M=l(k);a={button:_,title:L,sessionId:M},h()},x=f=>A(f.target),u=f=>A(f.target);document.addEventListener("click",x,!0),document.addEventListener("contextmenu",u,!0);let d=f=>{if(a===null)return!1;for(let k of f.removedNodes)if(k instanceof Element&&(k.matches('[role="menu"]')||k.querySelector('[role="menu"]')!==null))return!0;return!1},C=new MutationObserver(f=>{let k=f.length===0;for(let L of f)if((L.target instanceof Element?L.target:L.target.parentElement)?.closest("[data-chat-flow]")==null){k=!0;break}if(!k)return;let _=!1;for(let L of f){if(L.type!=="childList")continue;let M=L.target;if(M===document.body){h();break}if(_||(_=d(L)),M instanceof HTMLElement&&(M.matches('[role="menu"]')||M.closest('[role="menu"]')!==null)){h();break}}_&&a!==null&&![...document.querySelectorAll('[role="menu"]')].some(b)&&(a=null)});return C.observe(document.body,{childList:!0,subtree:!0}),p(),()=>{document.removeEventListener("click",x,!0),document.removeEventListener("contextmenu",u,!0),C.disconnect(),n!==0&&cancelAnimationFrame(n),m();for(let f of g)f.remove();g.clear(),a=null}},wt)}function _n(e){return e.insideCard?e.onInput?"close":e.onControl?"arm":"close":"ignore"}var Ot=new Set,It=null;function Sn(e){if(It===null){let o=HTMLInputElement.prototype,a=Object.getOwnPropertyDescriptor(o,"focus"),n=o.focus;if(typeof n!="function"||a?.configurable===!1||!a&&!Object.isExtensible(o))return()=>{};let i=function(s){for(let l of Ot)if(l.shouldSkip(this))return;n.call(this,s)};try{Object.defineProperty(o,"focus",{configurable:!0,writable:!0,enumerable:a?.enumerable??!1,value:i})}catch{return()=>{}}It=()=>{if(Object.getOwnPropertyDescriptor(o,"focus")?.value===i)try{a?Object.defineProperty(o,"focus",a):delete o.focus}catch{}}}let t={shouldSkip:e};return Ot.add(t),()=>{if(Ot.delete(t)&&Ot.size===0){let o=It;It=null,o?.()}}}var Ht="data-mobile-nav-focus-shadow",Ee="[data-composer-input]";function Cn(){let e=null,t=0,o=!1,a=new Set,n=new Set;function i(){let p=e!==null&&e.isConnected?e:document.querySelector(`[${Ht}]`);if(e=null,p===null)return;p.removeAttribute(Ht);let h=p;Object.prototype.hasOwnProperty.call(p,"focus")&&delete h.focus}function r(p){return e===p&&p.hasAttribute(Ht)?!1:(i(),e=p,p.setAttribute(Ht,""),Object.defineProperty(p,"focus",{configurable:!0,writable:!0,value:function(){}}),!0)}let s=new MutationObserver(()=>{if(!o)return;let p=document.querySelector(Ee);p!==null&&r(p)});function l(){window.clearTimeout(t),t=0,o=!1,s.disconnect(),i()}function c(p,h=!1){if(l(),o=!0,h){let w=document.querySelector(Ee);w!==null&&r(w),s.observe(document.documentElement,{childList:!0,subtree:!0})}t=window.setTimeout(l,p)}function b(p){if(!o)return;let h=p.target;h instanceof HTMLElement&&h.closest(Ee)!==null&&h.blur()}function m(p,h){let w=h.target;if(w instanceof Element){o&&w.closest(Ee)!==null&&l();for(let E of a)E({kind:p,target:w})}}let v=p=>m("pointer",p),T=p=>m("touch",p),g=p=>m("mouse",p);function y(){l(),document.removeEventListener("pointerdown",v,!0),document.removeEventListener("touchstart",T,!0),document.removeEventListener("mousedown",g,!0),document.removeEventListener("focusin",b,!0);for(let p of n)p();n.clear(),a.clear()}return document.addEventListener("pointerdown",v,!0),document.addEventListener("touchstart",T,!0),document.addEventListener("mousedown",g,!0),document.addEventListener("focusin",b,!0),{inputSelector:Ee,shadow:r,release:l,hold:c,holding:()=>o,onPress(p){return a.add(p),()=>{a.delete(p)}},guardInputFocus(p){let h=Sn(p);return n.add(h),()=>{n.delete(h)&&h()}},dispose:y}}var ks="[data-composer-card]",Es='button, [role="button"], [role="option"], [role="menuitem"], [role="combobox"], [aria-haspopup], select, a[href], label, input',Ts=700,Ln=e=>{let t=o=>{let a=o.target.closest(ks);if(a===null)return;let n=a.querySelector(Ee);if(n===null)return;let i=o.target.closest(Es);if(_n({insideCard:!0,onInput:o.target.closest(Ee)!==null,onControl:i!==null&&a.contains(i)})!=="arm"){e.release();return}e.hold(Ts),e.shadow(n)};return e.onPress(t)};function An(e,t){H(e,"dsh-web-mobile: focus domain",()=>{let o=Cn(),a=[];for(let n of t){let i=n(o);i!==void 0&&a.push(i)}return()=>{for(let n of a)n();o.dispose()}})}var _s='[data-menu-material], [class*="_7KE1Ra_menu"]',Ss='[data-menu-material] input[role="searchbox"], input[role="searchbox"][aria-controls$="-models"]';var Mn=e=>{let t=null,o=0,a=()=>{t===null&&(t=e.guardInputFocus(s=>s.matches(Ss)))},n=()=>{t?.(),t=null},i=s=>{s.kind==="pointer"&&(a(),window.clearTimeout(o),o=window.setTimeout(()=>{document.querySelector(_s)===null&&n()},2e3))},r=e.onPress(i);return()=>{r(),window.clearTimeout(o),n()}};var Ea=800,Rn="data-mobile-panel-exit",Pn="dsh-mobile-panel-exit";function On(e){return t=>{let o=e.sessions.list,a=ae(o.getSnapshot()),n=()=>document.querySelector(`[data-mobile-nav="frame"][${Rn}]`)!==null,i=new MutationObserver(()=>{!t.holding()&&n()&&t.hold(Ea,!0)}),r=o.subscribe(()=>{let l=ae(o.getSnapshot());l!==a&&(a=l,t.hold(Ea,!0))}),s=()=>{t.holding()||t.hold(Ea,!0)};return i.observe(document.documentElement,{attributes:!0,attributeFilter:[Rn]}),document.addEventListener(Pn,s),()=>{r(),i.disconnect(),document.removeEventListener(Pn,s)}}}var In='[data-shortcut-modal="shortcuts"] [data-modal-autofocus]',Hn=e=>{let t=new WeakSet(document.querySelectorAll(In)),o=new WeakSet;return e.guardInputFocus(a=>{if(a.matches(In)){if(!t.has(a)&&a.hasAttribute("data-dsh-automatic-focus")){if(!o.has(a)){o.add(a),Promise.resolve().then(()=>t.add(a));let n=a.closest('[role="dialog"][aria-modal="true"]');n!==null&&!n.contains(document.activeElement)&&n.focus({preventScroll:!0})}return!0}t.add(a)}return!1})};function Nn(e){let{visibleHeight:t,headerBottom:o,seatHeight:a,seatBottom:n,scrollY:i,offsetTop:r}=e;for(let m of[t,o,a,n,i,r])if(!Number.isFinite(m))return 0;if(Math.abs(i-r)>24)return 0;let s=Math.max(0,t),l=Math.max(0,s-Math.max(0,a)),c=Math.max(0,o-l),b=Math.max(0,n-s);return c+b}function Fn(e,t){return Number.isFinite(t)?e?t>0:t>=1:!1}var dt="data-mobile-nav-composer-tight",Cs='[class*="_composerSeat"]',Ls='header:has([class*="_headerLeading"])';function Bn(e){H(e,"dsh-web-mobile: composer clearance",()=>{let t=!1,o=0,a=0,n=()=>{t=!1,o=0,F()?.removeAttribute(dt)},i=()=>{a=0;let s=F();if(s===null){n();return}let l=s.querySelector(Cs),c=s.querySelector(Ls),b=l?.getBoundingClientRect()??null;if(l===null||c===null||b===null||b.width===0||b.height===0){n();return}t||(o=b.height);let m=window.visualViewport,v=Nn({visibleHeight:Math.min(window.innerHeight,m?.height??window.innerHeight),headerBottom:c.getBoundingClientRect().bottom,seatHeight:o>0?o:b.height,seatBottom:b.bottom,scrollY:window.scrollY,offsetTop:m?.offsetTop??0});t=Fn(t,v),t?s.hasAttribute(dt)||s.setAttribute(dt,""):s.hasAttribute(dt)&&s.removeAttribute(dt)},r=()=>{a===0&&(a=requestAnimationFrame(i))};return window.addEventListener("resize",r),window.addEventListener("orientationchange",r),window.visualViewport?.addEventListener("resize",r),window.visualViewport?.addEventListener("scroll",r),document.addEventListener("focusin",r,!0),document.addEventListener("focusout",r,!0),r(),()=>{window.removeEventListener("resize",r),window.removeEventListener("orientationchange",r),window.visualViewport?.removeEventListener("resize",r),window.visualViewport?.removeEventListener("scroll",r),document.removeEventListener("focusin",r,!0),document.removeEventListener("focusout",r,!0),a!==0&&(cancelAnimationFrame(a),a=0),n()}})}function zn(e){H(e,"dsh-web-mobile: document scroll lock",()=>{let t=window.scrollBy.bind(window),o=window.scrollTo.bind(window),a=()=>{(window.scrollX!==0||window.scrollY!==0)&&o(0,0)},n=((...s)=>{a()}),i=((...s)=>{a()}),r=()=>{(window.scrollX!==0||window.scrollY!==0)&&o(0,0)};return window.scrollBy=n,window.scrollTo=i,window.addEventListener("scroll",r,{passive:!0}),document.addEventListener("scroll",r,!0),r(),()=>{window.scrollBy=t,window.scrollTo=o,window.removeEventListener("scroll",r),document.removeEventListener("scroll",r,!0)}})}var Dn={reservePx:0,bandPx:0};function qn(e){let{visibleHeight:t,headerHeight:o,frameBottom:a,seatBottom:n,framePadding:i}=e;for(let b of[t,o,a,n,i])if(!Number.isFinite(b))return Dn;if(t<=0||o<0)return Dn;let r=Math.max(0,t-n),s=Math.max(0,n-a),l=r+s+Math.max(0,i),c=Math.max(0,t-o-l);return{reservePx:l,bandPx:c}}function Vn(e){return!Number.isFinite(e)||e<=0?0:Math.min(e*.6,520)}function Wn(e,t,o,a){return!t||!Number.isFinite(o)||o<=0?!1:e||!Number.isFinite(a)||a<=0?!0:o>a}function Kn(e){let{fieldTop:t,fieldBottom:o,bodyTop:a,bodyBottom:n,scrollTop:i,scrollHeight:r,clientHeight:s,visibleTop:l,visibleBottom:c}=e;for(let p of[t,o,a,n,i,r,s])if(!Number.isFinite(p))return i;let b=l===void 0||!Number.isFinite(l)?a:Math.max(a,l),m=c===void 0||!Number.isFinite(c)?n:Math.min(n,c);if(m-b<1)return i;let v=Math.max(0,r-s),T=Math.max(0,m-b),g=Math.min(8,T/2),y=i;return t<b+g?y=i-(b+g-t):o>m-g&&(y=i+(o-(m-g))),Math.min(Math.max(y,0),v)}var ct="data-mobile-nav-question-full",Ta="--dsha-mobile-question-reserve",As="question-expand",Ms='[class*="_frame"][style*="--dsh-composer-side-clearance"], [class*="_frame"]',Rs='[class*="_headerActions"]',Un='[class*="_body"]',Ps='[class*="_fieldInput"]',Os='[data-question-key] [class*="_card"]',Is='[class*="_footer"]',Gn='[class*="_composerSeat"]',Hs="--dsha-mobile-visible-vh",Ns="--mobile-nav-header-h",Fs=['<svg class="dsh-web-mobile-question-expand" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>",'<svg class="dsh-web-mobile-question-collapse" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M2 6h4V2M14 6h-4V2M2 10h4v4M14 10h-4v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>"].join(""),jn=e=>{let t=document.documentElement.style.getPropertyValue(e).trim(),o=Number.parseFloat(t);return Number.isFinite(o)?o:Number.NaN};function $n(e){let t=e.locale.bind($);H(e,"dsh-web-mobile: question fullscreen",()=>{let o=!1,a=!1,n=null,i=null,r="",s=0,l=null,c=null,b=u=>(l!==null&&l.isConnected&&u.contains(l)||(l=u.querySelector(Gn)),l),m=()=>{let u=F();if(u===null)return null;let C=b(u)??u;return c!==null&&c.isConnected&&C.contains(c)||(c=C.querySelector(Ms)),c},v=()=>t(a?"questionCollapse":"questionExpand"),T=()=>{if(n===null)return;let u=v();n.getAttribute("aria-label")!==u&&(n.setAttribute("aria-label",u),n.title=u);let d=a?"true":"false";n.getAttribute("aria-expanded")!==d&&n.setAttribute("aria-expanded",d)},g=()=>{o=!1,a=!1,s!==0&&(cancelAnimationFrame(s),s=0);let u=F();u!==null&&u.hasAttribute(ct)&&u.removeAttribute(ct),i?.style.removeProperty(Ta),i=null,r="",T()},y=()=>{let u=document.activeElement;if(!(u instanceof HTMLElement)||!u.matches(Ps))return;let d=u.closest(Os),C=u.closest(Un),f=d!==null&&d.scrollHeight>d.clientHeight+1?d:C;if(f===null)return;let k=f===d?d.querySelector(":scope > "+Is):null,L=u.getBoundingClientRect(),M=f.getBoundingClientRect(),S=k?.getBoundingClientRect().top??Number.NaN,R={top:M.top,bottom:Number.isFinite(S)?Math.min(M.bottom,S):M.bottom},P=window.visualViewport,D=P?.offsetTop??Number.NaN,Q=P==null?Number.NaN:P.offsetTop+P.height,K=Kn({fieldTop:L.top,fieldBottom:L.bottom,bodyTop:R.top,bodyBottom:R.bottom,scrollTop:f.scrollTop,scrollHeight:f.scrollHeight,clientHeight:f.clientHeight,visibleTop:D,visibleBottom:Q});Math.abs(K-f.scrollTop)>=1&&(f.scrollTop=K)},p=()=>{s=0;let u=F(),d=m();if(u===null||d===null){g();return}let C=u.querySelector(Gn),f=d.getBoundingClientRect(),k=C?.getBoundingClientRect()??null,_=getComputedStyle(d),L=jn(Hs),M=qn({visibleHeight:L,headerHeight:jn(Ns),frameBottom:f.bottom,seatBottom:k===null?Number.NaN:k.bottom,framePadding:Number.parseFloat(_.paddingTop)+Number.parseFloat(_.paddingBottom)}),S=Wn(a,o,M.bandPx,Vn(L)),R=`${Math.round(M.reservePx)}px`;i!==d&&(i?.style.removeProperty(Ta),i=d,r=""),r!==R&&(r=R,d.style.setProperty(Ta,R)),S!==u.hasAttribute(ct)&&(S?u.setAttribute(ct,""):u.removeAttribute(ct)),a=S,T(),a||(o=!1)},h=()=>{s===0&&(s=requestAnimationFrame(()=>{s=0,y(),o&&p()}))},w=()=>{o=!a,s!==0&&(cancelAnimationFrame(s),s=0),p(),a||(o=!1)},E=u=>{let d=u.querySelector(Rs);if(d!==null){if(n===null){let C=document.createElement("button");C.type="button",C.dataset.mobileNav=As,C.innerHTML=Fs,C.addEventListener("click",w),n=C}n.parentElement!==d&&d.insertBefore(n,d.lastElementChild),T()}},x=oe({name:"question-fullscreen",scopes:["*"],ensure:()=>{let u=m();if(u===null){g();return}if(u.querySelector(Un)===null){n?.remove(),g();return}E(u),o&&h()},dispose:()=>{g(),n!==null&&(n.removeEventListener("click",w),n.remove(),n=null)}});return window.addEventListener("resize",h),window.addEventListener("orientationchange",h),window.visualViewport?.addEventListener("resize",h),document.addEventListener("focusin",h,!0),document.addEventListener("focusout",h,!0),document.addEventListener(lt,h),h(),()=>{window.removeEventListener("resize",h),window.removeEventListener("orientationchange",h),window.visualViewport?.removeEventListener("resize",h),document.removeEventListener("focusin",h,!0),document.removeEventListener("focusout",h,!0),document.removeEventListener(lt,h),x()}})}var _a='[class*="_add"]',Bs="[data-trigger-menu]",Yn="[data-composer-input]",zs=e=>{let t=e.getBoundingClientRect();return t.width>0&&t.height>0&&e.getClientRects().length>0},Sa=()=>{for(let e of document.querySelectorAll(Bs))if(zs(e))return e;return null},Zn=()=>{let e=document.querySelector(Yn);return e instanceof HTMLElement?e:null},Xn=()=>{let e=Zn();e!==null&&document.activeElement===e&&e.blur()},Ds=()=>{let e=Zn();e!==null&&e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",keyCode:27,which:27,bubbles:!0,cancelable:!0}))};function Qn(e){H(e,"dsh-web-mobile: composer plus toggle",()=>{let t=!1,o=[],a=()=>{for(let l of o)window.clearTimeout(l);o=[]},n=l=>{let c=l.target;t=c instanceof Element&&c.closest(_a)!==null&&Sa()!==null},i=l=>{let c=l.target;c instanceof Element&&c.closest(_a)!==null&&Xn()},r=l=>{let c=t;t=!1;let b=l.target;if(!(!(b instanceof Element)||b.closest(_a)===null)){c&&Sa()!==null&&Ds(),a();for(let m of[120,320,640])o.push(window.setTimeout(()=>{Sa()!==null&&Xn()},m))}},s=l=>{let c=l.target;c instanceof Element&&c.closest(Yn)!==null&&a()};return document.addEventListener("pointerdown",i,!0),document.addEventListener("pointerdown",s,!0),document.addEventListener("click",n,!0),document.addEventListener("click",r,!1),()=>{a(),document.removeEventListener("pointerdown",i,!0),document.removeEventListener("pointerdown",s,!0),document.removeEventListener("click",n,!0),document.removeEventListener("click",r,!1)}})}var qs='[class*="heroWorkspaceRow"] > button[aria-haspopup="menu"]',Vs='[role="menu"]';function Jn(e){H(e,"dsh-web-mobile: workspace chip toggle",()=>{let t=null,o=i=>i instanceof Element?i.closest(qs):null,a=i=>{t=null;let r=o(i.target);r!==null&&r.getAttribute("aria-expanded")==="true"&&document.querySelector(Vs)!==null&&(t=r)},n=i=>{let r=t;t=null,!(r===null||o(i.target)!==r)&&i.stopPropagation()};return document.addEventListener("pointerdown",a,!0),document.addEventListener("click",n,!0),()=>{t=null,document.removeEventListener("pointerdown",a,!0),document.removeEventListener("click",n,!0)}})}var Ws="[data-team-action]",Ks='[data-team-action] > button[aria-haspopup="dialog"]',Us="[data-team-panel]";function ei(e){H(e,"dsh-web-mobile: team chip toggle",()=>{let t=null,o=i=>i instanceof Element?i.closest(Ks):null,a=i=>{t=null;let r=o(i.target);r!==null&&r.getAttribute("aria-expanded")==="true"&&document.querySelector(Ws)!==null&&document.querySelector(Us)!==null&&(t=r)},n=i=>{let r=t;t=null,!(r===null||o(i.target)!==r)&&(document.body.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0})),i.stopPropagation())};return document.addEventListener("pointerdown",a,!0),document.addEventListener("click",n,!0),()=>{t=null,document.removeEventListener("pointerdown",a,!0),document.removeEventListener("click",n,!0)}},wt)}var ti='[class*="_7KE1Ra_trigger"]',ai='[class*="_7KE1Ra_menu"]',Gs="[data-composer-card]",Nt=8,oi=[0,60,200];function ni(e){H(e,"dsh-web-mobile: model menu anchor",()=>{let t=0,o=null,a=null,n=[],i=null,r=null,s=null,l=null,c=()=>{let d=l;l=null,d!==null&&d.el.style.left===d.value&&(d.el.style.left=d.original)},b=d=>{if(d===null)return null;let C=a?.get(d);if(C!==void 0)return C;let f=d.getBoundingClientRect(),k=f.width>0&&f.height>0?f:null;return a?.set(d,k),k},m=()=>{for(let d of document.querySelectorAll(ai))if(b(d)!==null)return d;return null},v=d=>{let C=b(d);if(C===null)return;let f=C.width,k=document.documentElement.clientWidth,_=Math.max(Nt,k-f-Nt),L=b(r),M=b(s),S=L===null?null:L.right-f,R;if(S!==null&&S>=Nt&&S<=_)R=S;else if(M!==null)R=M.left+(M.width-f)/2;else return;let P=`${Math.round(Math.min(Math.max(R,Nt),_))}px`;l!==null&&l.el!==d&&c(),l===null?l={el:d,value:P,original:d.style.left}:l.value=P,d.style.left!==P&&(d.style.left=P)},T=()=>{i=m(),r=i===null?null:document.querySelector(ti),s=i===null?null:document.querySelector(Gs),i!==null&&v(i)},g=()=>{if(i!==null){if(b(i)===null){c(),i=null,r=null,s=null;return}v(i)}},y=d=>{o=d,t===0&&(t=window.requestAnimationFrame(()=>{t=0;let C=o;o=null,a=new Map;try{C!==null&&C()}finally{a=null}}))},p=()=>{y(T);for(let d of oi)n.push(window.setTimeout(()=>y(T),d));for(;n.length>oi.length*2;){let d=n.shift();d!==void 0&&window.clearTimeout(d)}},h=d=>{let C=d.target;return C instanceof Element?C.closest(ti)!==null||C.closest(ai)!==null:!1},w=d=>{h(d)&&p()},E=d=>{h(d)&&p()},A=d=>{h(d)&&p()},x=d=>{h(d)&&p()},u=()=>{y(g)};return document.addEventListener("pointerdown",w,!0),document.addEventListener("keydown",E,!0),document.addEventListener("focusin",A,!0),document.addEventListener("click",x,!0),window.addEventListener("resize",u),document.addEventListener("scroll",u,!0),()=>{document.removeEventListener("pointerdown",w,!0),document.removeEventListener("keydown",E,!0),document.removeEventListener("focusin",A,!0),document.removeEventListener("click",x,!0),window.removeEventListener("resize",u),document.removeEventListener("scroll",u,!0),t!==0&&window.cancelAnimationFrame(t),o=null,a=null;for(let d of n)window.clearTimeout(d);n.length=0,c(),i=null,r=null,s=null}})}function ii(e){return e.insideOpen||e.onInteractive?"ignore":"open"}var js="li[data-plugin-package], li[data-plugin-row], li[data-plugin-item]",$s='button[class*="_cardOpen"], button[class*="_rowOpen"]',Xs='button, a, input, select, textarea, [role="switch"], [role="button"], [role="tab"], [contenteditable="true"]';function ri(e){H(e,"dsh-web-mobile: plugin card tap",()=>{let t=o=>{let a=o.target;if(!(a instanceof Element))return;let n=a.closest(js);if(n===null)return;let i=n.querySelector($s);!(i instanceof HTMLButtonElement)||ii({insideOpen:i.contains(a),onInteractive:a.closest(Xs)!==null})==="ignore"||(o.preventDefault(),i.click())};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)})}function si(e,t){let o=0,a=!1;return{schedule(n){a||(a=!0,o=e(()=>{a=!1,n()}))},cancel(){a&&(t(o),a=!1)}}}function li(e){e.effect(()=>{let t=window.matchMedia(ue),o='[class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"])',a={"white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis","max-width":"100%"},n=[{pick:h=>h,props:{"flex-wrap":"wrap","align-items":"center",gap:"4px 10px"}},{pick:h=>h.children[0]??null,props:{flex:"1 1 100%","max-width":"100%","min-width":"0"}},{pick:h=>h.querySelector('[class*="spec"]'),props:a},{pick:h=>h.querySelector('[class*="nm"]'),props:a}],i=new WeakMap,r=(h,w)=>{let E=i.get(h);E===void 0&&i.set(h,E=new Map);for(let[A,x]of Object.entries(w)){let u="important",d=h.style.getPropertyValue(A),C=h.style.getPropertyPriority(A);if(d===x&&C===u)continue;let f=E.get(A),k=f!==void 0&&f.value===d&&f.priority===C;E.set(A,k?{...f,value:x,priority:u}:{value:x,priority:u,before:d,beforePriority:C}),h.style.setProperty(A,x,u)}},s=h=>{let w=i.get(h);if(w!==void 0){for(let[E,A]of w)w.delete(E),!(h.style.getPropertyValue(E)!==A.value||h.style.getPropertyPriority(E)!==A.priority)&&(A.before===""?h.style.removeProperty(E):h.style.setProperty(E,A.before,A.beforePriority));w.size===0&&i.delete(h)}},l=()=>{document.querySelectorAll(o).forEach(h=>{for(let w of n){let E=w.pick(h);E&&s(E)}})},c=null,b='[data-dsh-market-root], [role="dialog"]',m="[data-dsh-market-root]",v=()=>{let h=c;if(h!==null&&h.isConnected)return h;let w=document.querySelector(b);return w===null?(c=null,null):(c=w.matches(m)?w:document.querySelector(m)??w,c)},T=()=>{let h=v();if(h===null)return;let w=h.querySelectorAll(o);w.length===0&&!h.matches(m)&&(w=document.querySelectorAll(o)),w.forEach(E=>{for(let A of n){let x=A.pick(E);x&&r(x,A.props)}})},g=()=>{l(),t.matches&&T()};g();let y=si(h=>window.requestAnimationFrame(h),h=>window.cancelAnimationFrame(h)),p=new MutationObserver((h=[])=>{let w=h.length===0;for(let E of h)if((E.target instanceof Element?E.target:E.target.parentElement)?.closest("[data-chat-flow]")==null){w=!0;break}w&&t.matches&&y.schedule(()=>{t.matches&&T()})});return p.observe(document.documentElement,{childList:!0,subtree:!0}),t.addEventListener("change",g),()=>{y.cancel(),p.disconnect(),t.removeEventListener("change",g),l(),c=null}},"dsh-web-mobile: installed-list-inline-styles")}function di(e){H(e,"tablet-quick-settings",()=>{let t=kt(e);t.ensure();let o=!1,a=()=>{o=!1;try{t.ensure()}catch(i){console.error("[dsh-web-mobile] tablet-quick-settings",i)}},n=new MutationObserver(()=>{o||(o=!0,requestAnimationFrame(a))});return n.observe(document.documentElement,{childList:!0,subtree:!0}),()=>{n.disconnect(),t.dispose()}},ho)}var Ys="[data-composer-input]";function Zs(e){if(!e.isTrusted||e.defaultPrevented||e.inputType!=="insertText")return!1;let t=e.data;return typeof t!="string"||t===`
`||t==="\r"?!1:t.includes(`
`)||t.includes("\r")}function Qs(e){if(typeof DataTransfer!="function"||typeof ClipboardEvent!="function")return null;try{let t=new DataTransfer;t.setData("text/plain",e);let o=new ClipboardEvent("paste",{clipboardData:t,bubbles:!0,cancelable:!0});return o.clipboardData?.getData("text/plain")!==e?null:o}catch{return null}}function ci(e){H(e,"dsh-web-mobile: composer paste guard",()=>{let t=o=>{if(!(o instanceof InputEvent)||!Zs(o))return;let a=o.target;if(!(a instanceof Element))return;let n=a.closest(Ys);if(n===null)return;let i=Qs(o.data??"");i!==null&&(o.preventDefault(),o.stopPropagation(),n.dispatchEvent(i))};return document.addEventListener("beforeinput",t,!0),()=>{document.removeEventListener("beforeinput",t,!0)}})}var Js='[data-mobile-nav="file-upload"]',el="[data-composer-card]",tl="input[type=file]",Ie=null;function al(e){return e==="image"?"image/*":""}function ol(e){return typeof e?.pickFile=="function"?e.pickFile.bind(e):void 0}function hi(e){return Array.isArray(e)?e.filter(t=>typeof File<"u"&&t instanceof File):[]}function nl(e,t){return t?"fallback":e==null?"cancelled":Array.isArray(e)?e.length===0?"cancelled":hi(e).length>0?"files":"fallback":"fallback"}function Ca(){let e=document.querySelector(el);return e===null?null:e.querySelector(tl)}function il(e,t){if(t===null)return!1;try{let o=new DataTransfer;for(let a of e)o.items.add(a);t.files=o.files}catch{return!1}return t.dispatchEvent(new Event("change",{bubbles:!0})),!0}var rl='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20"><rect x="2.5" y="3.5" width="15" height="13" rx="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="7.2" cy="8" r="1.4" fill="currentColor"/><path d="M4.2 14.6l3.6-3.4 2.6 2.4 2.3-2.3 3.1 3.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',sl='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20"><path d="M12.6 3.2H6.4A1.9 1.9 0 0 0 4.5 5.1v9.8a1.9 1.9 0 0 0 1.9 1.9h7.2a1.9 1.9 0 0 0 1.9-1.9V6.6l-2.9-3.4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12.4 3.4v3.3h3.1" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';function La(e,t=Ca()){if(t===null)return;let o=al(e),a=t.hasAttribute("accept"),n=t.getAttribute("accept");o!==""&&t.setAttribute("accept",o);try{t.click()}finally{o!==""&&(a?t.setAttribute("accept",n??""):t.removeAttribute("accept"))}}async function ll(e,t){let o=window.DSHA,a=ol(o);if(a===void 0){La("file");return}let n=Ca(),i=t?.()??null,r=null,s=!1;try{r=await a({accept:[],multiple:!0,title:e("fileUploadAttachment")})}catch{s=!0}if(n===null||Ca()!==n||i!==null&&(t?.()??null)!==i)return;let l=nl(r,s);l!=="cancelled"&&(l==="files"&&il(hi(r),n)||La("file",n))}var pi=8,pt=8;function dl(e,t,o){let a=e.top-pi-t.height;a<o.top+pt&&(a=Math.min(e.bottom+pi,o.bottom-t.height-pt));let n=Math.max(o.left+pt,Math.min(e.left,o.right-t.width-pt));return{top:Math.round(Math.max(o.top+pt,a)),left:Math.round(n)}}function cl(){let e=window.visualViewport;return e!=null?{top:e.offsetTop,bottom:e.offsetTop+e.height,left:e.offsetLeft,right:e.offsetLeft+e.width}:{top:0,bottom:window.innerHeight,left:0,right:window.innerWidth}}function pl(e,t,o){Ie?.(),Ie=null;let a=document.createElement("div");a.dataset.mobileNav="file-picker-backdrop";let n=document.createElement("div");n.dataset.mobileNav="file-picker",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-label",e("fileUploadAttachment"));let i=[{kind:"image",icon:rl,label:e("fileUploadImage")},{kind:"file",icon:sl,label:e("fileUploadAttachment")}],r=[],s=()=>{Ie===s&&(Ie=null);for(let E of r.splice(0))E();a.remove()};Ie=s;let l=E=>{E.key==="Escape"&&s()};for(let E of i){let A=document.createElement("button");A.type="button",A.dataset.mobileNav="file-picker-option",A.dataset.kind=E.kind;let x=document.createElement("span");x.dataset.mobileNav="file-picker-icon",x.innerHTML=E.icon;let u=document.createElement("span");u.textContent=E.label,A.append(x,u),A.addEventListener("click",()=>{s(),E.kind==="file"?ll(e,o):La(E.kind)}),n.append(A)}a.addEventListener("click",E=>{E.target===a&&s()}),document.addEventListener("keydown",l,!0),r.push(()=>document.removeEventListener("keydown",l,!0)),a.append(n),document.body.append(a),n.style.visibility="hidden";let c=!1,b=()=>{c||(c=!0,n.style.visibility="")},m="",v=0,T=window.setTimeout(b,400);r.push(()=>window.clearTimeout(T));let g=()=>{if(!t.isConnected){s();return}let E=t.getBoundingClientRect(),A=n.getBoundingClientRect(),x=dl(E,A,cl()),u=`${x.top}px`,d=`${x.left}px`;n.style.top!==u&&(n.style.top=u),n.style.left!==d&&(n.style.left=d);let C=`${x.top}:${x.left}`;C===m?v+=1:(m=C,v=0),v>=2&&b()};g();let y=!0,p=()=>{y||g()};window.addEventListener("resize",p),window.addEventListener("orientationchange",p),window.visualViewport?.addEventListener("resize",p),window.visualViewport?.addEventListener("scroll",p),r.push(()=>window.removeEventListener("resize",p)),r.push(()=>window.removeEventListener("orientationchange",p)),r.push(()=>window.visualViewport?.removeEventListener("resize",p)),r.push(()=>window.visualViewport?.removeEventListener("scroll",p));let h=0,w=requestAnimationFrame(function E(){if(g(),!n.isConnected){y=!1;return}++h<12?w=requestAnimationFrame(E):(y=!1,b())});r.push(()=>cancelAnimationFrame(w))}function ui(e){H(e,"dsh-web-mobile: composer file picker",()=>{let t=e.locale.bind($),o=()=>ae(e.sessions.list.getSnapshot())??null,a=n=>{let i=n.target;if(!(i instanceof Element))return;let r=i.closest(Js);r===null||r.hasAttribute("disabled")||(n.preventDefault(),n.stopPropagation(),pl(t,r,o))};return document.addEventListener("click",a,!0),()=>{document.removeEventListener("click",a,!0),Ie?.(),Ie=null,document.querySelector('[data-mobile-nav="file-picker-backdrop"]')?.remove()}})}var Ft="mobile-nav-attachments";function Ke(e){return typeof e=="object"&&e!==null}function mi(e){return Ke(e)?(Array.isArray(e.attachmentIds)?e.attachmentIds:Array.isArray(e.imageIds)?e.imageIds:[]).filter(o=>typeof o=="string"):[]}function fi(e,t){if(!Array.isArray(e))return[];let o=[];for(let a of e){if(!Ke(a)||typeof a.id!="string")continue;let n=a.kind==="image"||a.kind==="file"?a.kind:void 0;if(n===void 0)continue;let i=Ke(a.file)?a.file:void 0,r=typeof i?.name=="string"?i.name:"",s=typeof i?.size=="number"&&Number.isFinite(i.size)?i.size:void 0,l=Ke(t)&&Ke(t[a.id])?t[a.id]:void 0,c=l?.status==="uploading"||l?.status==="ready"||l?.status==="error"?l.status:void 0;o.push({id:a.id,kind:n,name:r,...s===void 0?{}:{bytes:s},...n==="file"&&c!==void 0?{status:c}:{}})}return o}function hl(e){if(e<1024)return`${e} B`;let t=["KB","MB","GB"],o=e/1024,a=0;for(;o>=1024&&a<t.length-1;)o/=1024,a+=1;return`${o>=10?Math.round(o):Math.round(o*10)/10} ${t[a]}`}function ul(e){let t=new Map;for(let o of e)t.set(o.name,(t.get(o.name)??0)+1);return e.map((o,a)=>({v:1,id:o.id,kind:o.kind,name:o.name,ordinal:a+1,ambiguous:o.name===""||(t.get(o.name)??0)>1}))}function bi(e,t){return e.name===""?t.unnamed(e.ordinal):e.name}function ml(e,t,o){if(o||t.includes("/"))return!1;let a=t.trim().toLowerCase();return a===""||e.toLowerCase().includes(a)}function gi(e,t,o,a){let n=t.trim().toLowerCase(),i=[];for(let[r,s]of ul(e).entries()){let l=e[r];if(l===void 0)continue;let c=bi(s,a);if(!ml(c,t,o))continue;let b=[l.kind==="image"?a.kindImage:a.kindFile];l.bytes!==void 0&&b.push(hl(l.bytes)),l.status==="uploading"?b.push(a.uploading):l.status==="error"&&b.push(a.failed),i.push({rank:n!==""&&c.toLowerCase().startsWith(n)?0:1,index:r,row:{name:c,description:b.join(" · "),icon:"file",section:a.section,value:JSON.stringify(s)}})}return i.sort((r,s)=>r.rank-s.rank||r.index-s.index),i.map(r=>r.row)}function vi(e){if(typeof e!="string")return;let t;try{t=JSON.parse(e)}catch{return}if(!Ke(t)||t.v!==1)return;let{id:o,kind:a,name:n,ordinal:i,ambiguous:r}=t;if(!(typeof o!="string"||a!=="file"&&a!=="image"||typeof n!="string")&&!(typeof i!="number"||!Number.isInteger(i)||i<1||typeof r!="boolean"))return{v:1,id:o,kind:a,name:n,ordinal:i,ambiguous:r}}function fl(e,t){return`@${t.mention}:${e.name===""?`#${e.ordinal}`:e.name}`}function Aa(e,t){let o=vi(e);if(o!==void 0)return{source:Ft,ref:JSON.stringify(o),label:bi(o,t),appearance:"file",clipboardText:fl(o,t)}}function wi(e){let t=vi(e);if(t===void 0)throw new Error(`${Ft}: unrecognized attachment reference`);let o=t.kind==="image"?"Image":"File",a=t.name===""?o:`${o} ${JSON.stringify(t.name)}`;return t.ambiguous?`[attachment #${t.ordinal}: ${a}]`:`[attachment: ${a}]`}var xi="pocketMobileNav.attachments",gl={section:"本次附件","kind.file":"文件","kind.image":"图片","status.uploading":"上传中","status.failed":"上传失败",unnamed:"附件 {n}",mention:"附件"},vl={section:"Attachments in this message","kind.file":"File","kind.image":"Image","status.uploading":"Uploading","status.failed":"Upload failed",unnamed:"Attachment {n}",mention:"attachment"};function wl(e,t){let o=e.get("sessions"),a=e.get("conversation"),n=o?.scope?.(t);if(n===void 0||a?.input?.for===void 0)return[];let i=mi(a.input.for(n)?.state?.getSnapshot());if(i.length===0)return[];let r=typeof a.resolveDraftAttachments=="function"?a.resolveDraftAttachments(i):typeof a.draftImages=="function"?a.draftImages(i):void 0;return fi(r,a.fileUploads?.getSnapshot())}function Ma(e){let t=e.locale.bind(xi);return{section:t("section"),kindFile:t("kind.file"),kindImage:t("kind.image"),uploading:t("status.uploading"),failed:t("status.failed"),unnamed:o=>t("unnamed",{n:o}),mention:t("mention")}}function xl(e){return{trigger:"@",name:Ft,order:-10,showGroupTitle:!1,candidates(t,o){if(o.signal.aborted)return Promise.resolve([]);try{return Promise.resolve(gi(wl(e,t.sessionId),o.query,o.drilled===!0,Ma(e)))}catch{return Promise.resolve([])}},onPick({candidate:t}){let o=Aa(t.value,Ma(e));return o===void 0?void 0:{insert:o}},codec:{clipboardText:t=>Aa(t,Ma(e))?.clipboardText??"",serialize:t=>{try{return Promise.resolve(wi(t))}catch(o){return Promise.reject(o)}}}}}function yi(e){e.effect(()=>e.locale.register(xi,{zh:gl,en:vl}),"dsh-web-mobile: attachment mention dictionaries"),e.inject(["inputTriggers"],t=>{H(t,"dsh-web-mobile: attachment mention source",()=>{let o=t.get("inputTriggers");if(typeof o?.registerSource=="function")return o.registerSource(xl(t))})})}var Bt="pocketMobileNavFileShare",ki={share:"分享",shareFile:"分享「{name}」",downloadFile:"下载「{name}」",sharing:"正在准备文件…",downloadedUnsupported:"当前环境不支持直接分享；已开始下载，请在系统保存位置确认",downloadedTooLarge:"文件超过 50 MB；已开始下载，请在系统保存位置确认",downloadedShareFailed:"分享未能完成；已开始下载，请在系统保存位置确认",errorTooLarge:"文件太大（超过 200 MB），无法在手机端分享或下载",errorNotFound:"文件不存在或已被移动",errorGeneric:"分享失败：{message}"},Ei={share:"Share",shareFile:'Share "{name}"',downloadFile:'Download "{name}"',sharing:"Preparing file…",downloadedUnsupported:"Direct sharing is unavailable here; a download has started — confirm it at the location your system shows",downloadedTooLarge:"The file is over 50 MB; a download has started — confirm it at the location your system shows",downloadedShareFailed:"Sharing did not finish; a download has started — confirm it at the location your system shows",errorTooLarge:"The file is too large (over 200 MB) to share or download on mobile",errorNotFound:"The file no longer exists or was moved",errorGeneric:"Share failed: {message}"};var Z=require("react");var ge=class extends Error{code;constructor(t,o){super(o),this.code=t,this.name="FileShareError"}};function yl(e){let t=e.code??"";return t==="workspace-file/too-large"?new ge("too-large",e.message??t):t==="workspace-file/not-found"||t==="workspace-file/not-regular-file"?new ge("not-found",e.message??t):new ge("read-failed",e.message??(t||"read failed"))}async function Ti(e,t,o,a=1048576,n=209715200){let i=[],r=0;for(;;){o.throwIfAborted();let s=await e(t,{offset:r,length:a},o);if(o.throwIfAborted(),!s.ok)throw yl(s.error);let{data:l,eof:c,bytes:b}=s.value;if(b!==void 0&&b>n)throw new ge("too-large",`${t}: ${b} bytes exceed the ${n} byte share cap`);if(i.push(new Uint8Array(l)),r+=l.length,r>n)throw new ge("too-large",`${t}: more than ${n} bytes`);if(c||l.length===0)break}return{parts:i,size:r}}function kl(e){return typeof e=="object"&&e!==null&&e.name==="AbortError"}function zt(e){return e.share!==void 0&&e.canShare!==void 0}async function _i(e,t){if(e.size>(t.shareMax??52428800))return t.download(e),{kind:"downloaded",reason:"too-large"};let o=t.share;if(o===void 0)return t.download(e),{kind:"downloaded",reason:"unsupported"};let a=!1;try{a=t.canShare?.({files:[e]})===!0}catch{a=!1}if(!a)return t.download(e),{kind:"downloaded",reason:"unsupported"};try{return await o({files:[e],title:e.name}),{kind:"shared"}}catch(n){return kl(n)?{kind:"cancelled"}:(t.download(e),{kind:"downloaded",reason:"share-failed"})}}var El={txt:"text/plain",log:"text/plain",md:"text/markdown",markdown:"text/markdown",csv:"text/csv",tsv:"text/tab-separated-values",json:"application/json",xml:"application/xml",yaml:"text/yaml",yml:"text/yaml",html:"text/html",htm:"text/html",css:"text/css",js:"text/javascript",mjs:"text/javascript",ts:"text/plain",tsx:"text/plain",py:"text/plain",sh:"text/plain",svg:"image/svg+xml",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",bmp:"image/bmp",heic:"image/heic",avif:"image/avif",mp3:"audio/mpeg",wav:"audio/wav",m4a:"audio/mp4",ogg:"audio/ogg",mp4:"video/mp4",mov:"video/quicktime",webm:"video/webm",pdf:"application/pdf",zip:"application/zip",gz:"application/gzip",tar:"application/x-tar",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",xls:"application/vnd.ms-excel",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",ppt:"application/vnd.ms-powerpoint",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation"};function Dt(e){return e.split(/[/\\]+/).filter(Boolean).at(-1)??e}function Si(e){let t=e.lastIndexOf(".");return t<=0?"application/octet-stream":El[e.slice(t+1).toLowerCase()]??"application/octet-stream"}var Tl='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 2v7.5M5.2 4.8L8 2l2.8 2.8" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 9.5v3A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-3" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/></svg>',_l='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 2v7.5M5.2 6.7L8 9.5l2.8-2.8" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 10.5v2A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-2" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/></svg>';function Sl(e){document.querySelector('[data-mobile-nav="file-share-toast"]')?.remove();let t=document.createElement("div");t.dataset.mobileNav="file-share-toast",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.style.cssText='position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom, 0px) + var(--dshp-kb, 0px) + 64px);transform:translateX(-50%);z-index:2147483550;max-width:calc(100vw - 32px);padding:8px 16px;border-radius:999px;corner-shape:round;border:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.24));background:var(--dsw-alias-bg-layer-2, #1f2430);color:var(--dsw-alias-label-primary, #f3f4f6);font:500 13px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:var(--dsw-elevation-panel, 0 4px 14px rgba(0,0,0,.22));pointer-events:none;text-align:center',t.textContent=e,document.body.appendChild(t),setTimeout(()=>t.remove(),3e3)}function Ci(e,t){return zt(Vt())?e("shareFile",{name:t}):e("downloadFile",{name:t})}function Cl(e,t){return e.kind!=="downloaded"?null:e.reason==="too-large"?t("downloadedTooLarge"):e.reason==="share-failed"?t("downloadedShareFailed"):t("downloadedUnsupported")}function Ll(e,t){if(e instanceof ge){if(e.code==="too-large")return t("errorTooLarge");if(e.code==="not-found")return t("errorNotFound")}return t("errorGeneric",{message:e instanceof Error?e.message:String(e)})}function Al(e){let t=URL.createObjectURL(e),o=document.createElement("a");o.href=t,o.download=e.name,o.rel="noopener",o.style.display="none",document.body.appendChild(o),o.click(),o.remove(),setTimeout(()=>URL.revokeObjectURL(t),3e4)}function Vt(){let e=navigator,t=window.DSHA;return{canShare:typeof t?.canShareFile=="function"?o=>o.files.length===1&&t.canShareFile(o.files[0]):typeof e.canShare=="function"?o=>e.canShare(o):void 0,share:typeof t?.shareFile=="function"?o=>t.shareFile(o.files[0]):typeof e.share=="function"?o=>e.share(o):void 0,download:Al}}function Li(e,t,o){let[a,n]=(0,Z.useState)(null),i=(0,Z.useRef)(null),r=(0,Z.useRef)({sessionId:e,readFileRange:t,t:o});r.current={sessionId:e,readFileRange:t,t:o},(0,Z.useEffect)(()=>()=>i.current?.abort(),[]);let s=(0,Z.useCallback)(c=>{Sl(c)},[]),l=(0,Z.useCallback)(c=>{if(i.current!==null)return;let b=new AbortController;i.current=b,n(c);let{sessionId:m,readFileRange:v,t:T}=r.current;(async()=>{let{parts:y}=await Ti((A,x,u)=>v(m,A,x,u),c,b.signal),p=Dt(c),h=new File(y,p,{type:Si(p)}),w=await _i(h,Vt()),E=Cl(w,T);E!==null&&s(E)})().catch(y=>{b.signal.aborted||(console.warn("[dsh-pocket] file share failed:",y),s(Ll(y,T)))}).finally(()=>{i.current===b&&(i.current=null),b.signal.aborted||n(null)})},[s]);return{busyPath:a,share:l}}function Ai({absolutePath:e,sessionId:t,readFileRange:o,t:a}){let{busyPath:n,share:i}=Li(t,o,a),r=n!==null;return React.createElement("button",{type:"button","data-mobile-nav":"file-share-preview","aria-label":r?a("sharing"):Ci(a,Dt(e)),"aria-busy":r,disabled:r,onClick:()=>i(e)},zt(Vt())?React.createElement(eo,{size:16}):React.createElement(to,{size:16}))}var qt="file-share-row";function Mi({sessionId:e,readFileRange:t,t:o}){let{busyPath:a,share:n}=Li(e,t,o),i=(0,Z.useRef)(null),r=(0,Z.useRef)({busyPath:a,share:n,t:o});r.current={busyPath:a,share:n,t:o};let s=(0,Z.useRef)(null);return(0,Z.useEffect)(()=>{let c=(i.current?.closest('[data-files-state="tree"]')??null)?.querySelector("[data-files-body]")??null;if(c===null)return;let b=y=>{y.preventDefault(),y.stopPropagation();let h=y.currentTarget.parentElement?.getAttribute("data-files-path");h&&r.current.share(h)},m=()=>{let{busyPath:y,t:p}=r.current;for(let h of c.querySelectorAll(`[data-mobile-nav="${qt}"]`))h.parentElement?.getAttribute("data-files-entry")!=="file"&&h.remove();for(let h of c.querySelectorAll('li[data-files-entry="file"]')){let w=h.querySelector(`:scope > [data-mobile-nav="${qt}"]`);w===null&&(w=document.createElement("button"),w.type="button",w.dataset.mobileNav=qt,w.innerHTML=zt(Vt())?Tl:_l,w.addEventListener("click",b),h.appendChild(w));let E=h.getAttribute("data-files-path")??"",A=y!==null&&y===E,x=A?p("sharing"):Ci(p,Dt(E)),u=y!==null;w.getAttribute("aria-label")!==x&&w.setAttribute("aria-label",x),w.disabled!==u&&(w.disabled=u),A?w.setAttribute("aria-busy","true"):w.removeAttribute("aria-busy")}};s.current=m;let v=0,T=()=>{v===0&&(v=requestAnimationFrame(()=>{v=0,m()}))},g=new MutationObserver(T);return g.observe(c,{childList:!0,subtree:!0}),m(),()=>{g.disconnect(),v!==0&&cancelAnimationFrame(v),s.current=null;for(let y of c.querySelectorAll(`[data-mobile-nav="${qt}"]`))y.removeEventListener("click",b),y.remove()}},[]),(0,Z.useEffect)(()=>{s.current?.()},[a,o]),React.createElement("span",{hidden:!0,"data-mobile-nav":"file-share-anchor",ref:i})}function Ri(e){e.inject(["slots","locale","remote","remote.workspaceFiles"],t=>{t.effect(()=>t.locale.register(Bt,{zh:ki,en:Ei}),"dsh-web-mobile: file-share dictionaries");let o=t.remote,a=()=>({readFileRange:(n,i,r,s)=>o.workspaceFiles.readBytes(n,i,{range:r},s)});H(t,"dsh-web-mobile: file share",()=>{let n=[t.slots.inject("sidebar.right.tab.document.actions",()=>t.slots.register({name:"sidebar.right.tab.document.actions",id:"mobile-nav-file-share",order:100,locale:Bt,inject:a},Ai)),t.slots.inject("sidebar.right.tab.files.actions",()=>t.slots.register({name:"sidebar.right.tab.files.actions",id:"mobile-nav-file-share-rows",order:100,locale:Bt,inject:a},Mi))];return()=>{for(let i of n)i()}})})}function Pi(e){if(typeof e!="object"||e===null)return null;let t=e.selectPanel;return typeof t!="function"?null:()=>{t.call(e,null)}}var Oi='[class*="panelRow"][aria-current="page"]',Ia=!1,Ra=null,Pa=null;function Wt(){let e=Pa;return e!==null&&e.isConnected&&e.matches(Oi)?!0:(Pa=document.querySelector(Oi),Pa!==null)}function Oa(){return!Ia&&Wt()}var Ii="data-mobile-panel-exit",Ml="dsh-mobile-panel-exit",Rl=2e3,Pl="panel-ghost",Ol=280,Il='[data-mobile-nav="frame"] [class*="_centerCol"] > * > *',Hl='section[data-plugin-panel] button[class*="_moreBack"],section[data-plugin-panel] [data-plugin-detail] button[class*="_crumb"],section[data-plugin-panel] [data-plugin-item-detail] button[class*="_crumb"],section[data-plugin-panel] [data-plugin-row-detail] button[class*="_crumb"]';function Hi(e){let t=Pi(e),o=t!==null,a=!1,n=!1,i=null,r=0,s=null,l=null,c=null,b=Symbol("panel-exit");function m(){let u=F();if(u===null)return[];let d=[];for(let C of u.querySelectorAll('[class*="_centerCol"]')){let f=C.firstElementChild?.firstElementChild;if(f instanceof HTMLElement)for(let k of f.getAnimations())k.playState!=="idle"&&d.push(k)}return d}function v(){if(a){if(i!==null&&(window.clearTimeout(i),i=null),r!==0&&(cancelAnimationFrame(r),r=0),Ra===b){let u=F();u!==null&&u.removeAttribute(Ii),Ia=!1,Ra=null}a=!1}}function T(){l!==null&&(window.clearTimeout(l),l=null);let u=s;s=null,u!==null&&(c!==null&&u.removeEventListener("animationend",c,!0),c=null,u.remove())}function g(u){if(n||!a)return;let d=m();if(d.length===0){if(u<2){r=requestAnimationFrame(()=>{r=0,g(u+1)});return}v();return}let C=0;for(let f of d){let k=f.effect?.getTiming(),_=typeof k?.delay=="number"?k.delay:0,L=typeof k?.duration=="number"?k.duration:0,M=typeof k?.iterations=="number"?k.iterations:1;C=Math.max(C,_+L*M),f.finished.then(()=>v(),()=>v())}i=window.setTimeout(v,Math.min(Rl,Math.max(250,C+200)))}function y(){if(!Wt())return null;let u=document.querySelector(Il);return u instanceof HTMLElement?u:null}function p(){if(!Wt())return null;let u=document.querySelector(Hl);return u instanceof HTMLElement?u:null}function h(){return p()!==null}function w(u){T();let d=document.createElement("div");return d.dataset.mobileNav=Pl,d.setAttribute("aria-hidden","true"),d.append(u.cloneNode(!0)),document.body.append(d),d}let E=()=>{if(n||!o||a)return;a=!0,Ia=!0,Ra=b;let u=F();u!==null&&u.setAttribute(Ii,""),document.dispatchEvent(new CustomEvent(Ml));let d=y();s=d===null?null:w(d);try{t()}finally{if(r=requestAnimationFrame(()=>{r=0,g(0)}),s!==null){let C=s;c=f=>{f.animationName==="dsh-web-mobile-panel-ghost-out"&&T()},C.addEventListener("animationend",c,!0),l=window.setTimeout(T,Ol+120)}}},A=()=>{if(n||!o||a)return;let u=p();if(u!==null){u.click();return}E()};function x(){n=!0,v(),T()}return{exit:E,back:A,supported:o,panelOpen:Wt,subpageOpen:h,task:Nl(E,o,A,p),dispose:x}}function Nl(e,t,o,a){let n=!1,i=0,r=null,s=!1,l=!1,c=!1,b=null;function m(){c=!1,b!==null&&(window.clearTimeout(b),b=null)}function v(){c=!0,b!==null&&window.clearTimeout(b),b=window.setTimeout(m,1200);try{history.back()}catch{m()}}function T(){try{return history.pushState({mobilePanelExit:!0},""),!0}catch{return!1}}function g(){!t||n||T()&&(n=!0)}function y(){t&&T()&&(i+=1)}function p(A){return A===null?0:A.className.includes("_moreBack")?1:2}function h(){if(c){m();return}if(i>0)i-=1;else if(n)n=!1;else return;if(Oa()&&a()!==null){s=!0,o();return}Oa()&&e()}function w(){l||(window.addEventListener("popstate",h),l=!0)}function E(){l&&(window.removeEventListener("popstate",h),l=!1)}return{name:"panel-back-exit",scopes:["*"],ensure:()=>{if(!t)return;if(w(),!Oa()){n&&(n=!1,v()),r=null,s=!1;return}g();let A=a(),x=p(r),u=p(A);if(u===x)return;let d=s;if(s=!1,r=A,u>x){d||y();return}!d&&i>0&&(i-=1,v())},dispose:()=>{E(),m(),n&&(n=!1,v())}}}function Ni(e,t){H(e,"dsh-web-mobile: panel row returns to conversation",()=>{let o=a=>{let n=a.target;if(!(n instanceof Element)||typeof n.closest!="function")return;let i=n.closest('[class*="panelRow"]');i!==null&&i.getAttribute("aria-current")==="page"&&(a.preventDefault(),a.stopPropagation(),t())};return document.addEventListener("click",o,!0),()=>document.removeEventListener("click",o,!0)})}var Fl=/[?,]dsh-web-mobile\/client\.js/;function Bl(e){if(typeof e!="string"||e==="")return null;try{let t=new URL(e,"http://x").searchParams.get("rev");return t===null||t===""?null:t}catch{return null}}function zl(){for(let e of document.head.querySelectorAll('script[src], link[rel="preload"]')){let t=e.getAttribute("src")??e.getAttribute("href");if(t!==null&&Fl.test(t))return Bl(t)}return null}function Fi(e){e.effect(()=>{let t=new URLSearchParams(location.search);if(!t.has("mobile-nav-debug"))return()=>{};let o=[],a=p=>o.push(`ERR ${p.message.slice(0,120)}`),n=p=>o.push(`REJ ${String(p.reason).slice(0,120)}`);window.addEventListener("error",a),window.addEventListener("unhandledrejection",n);let i=document.createElement("div");i.style.cssText=["position:fixed","top:40px","right:6px","z-index:2147483000","background:rgba(0,0,0,.82)","color:#fff","font:11px/1.5 ui-monospace,monospace","padding:8px 10px","border-radius:8px","max-width:94vw","max-height:70vh","overflow:auto","white-space:pre-wrap","pointer-events:none"].join(";");let r=()=>{let p=x=>!!document.querySelector(x),h=x=>{let u=document.querySelector(x);return u===null?"absent":getComputedStyle(u).visibility},w=document.querySelector('[data-mobile-nav="frame"]'),E=()=>{let x=document.querySelector("[data-sidebar-right-panel]");if(x===null)return"absent";let u=x.getBoundingClientRect();return`${x.getAttribute("data-sidebar-right-panel")} pad ${getComputedStyle(x).paddingTop} rect ${Math.round(u.top)},${Math.round(u.left)} ${Math.round(u.width)}x${Math.round(u.height)}`};return[`build rev ${zl()??"?"} (diag chips)`,`URL ${location.pathname}${location.search}`,`W ${innerWidth} x ${innerHeight} dpr ${devicePixelRatio}`,`mq≤1023 ${matchMedia(ue).matches}  mq≥1024 ${matchMedia(po).matches}`,`safeTop framePad ${w===null?"n/a":getComputedStyle(w).paddingTop}  rightPanel ${E()}`,`css ${p('style[data-plugin-css*="mobile"]')}  frame ${!!w}`,`header ${h("[data-phase] header")}  composer ${p("textarea, [data-composer-input]")}`,`genui cards ${document.querySelectorAll("[data-genui]").length}  panel ${p("[data-genui-panel]")}`,`phase ${document.querySelector("[data-phase]")?.getAttribute("data-phase")??"?"}`,`errs ${o.slice(-5).join(" | ")||"none"}`].join(`
`)},s=()=>{i.textContent=r()};s();let l=0,c=()=>{l===0&&(l=requestAnimationFrame(()=>{l=0,s()}))},b=new MutationObserver(p=>{for(let h of p)if(!(h.target===i||i.contains(h.target))){c();return}});b.observe(document.body,{childList:!0,subtree:!0,attributes:!0});let m=setInterval(s,1500);document.body.appendChild(i);let v=p=>{let h=document.querySelector(p);if(h===null)return"absent";let w=h.getBoundingClientRect();return`${Math.round(w.x)},${Math.round(w.y)} ${Math.round(w.width)}x${Math.round(w.height)}`},T=()=>[r(),`rects toggle ${v('[data-mobile-nav="toggle"]')} files ${v('[data-mobile-nav="files"]')} header ${v("[data-phase] header")} titleCluster ${v('[class*="_titleCluster"]')}`,`chips crea ${v('[class*="SVAs4q_"]')} team ${v("[data-team-action]")} model ${v('[class*="_7KE1Ra_trigger"]')} crumbs ${v('[class*="_crumbs"]')} crumbCurrent ${v('[class*="_crumbCurrent"]')}`,`ua ${navigator.userAgent}`,`screen ${screen.width}x${screen.height} standalone ${matchMedia("(display-mode: standalone)").matches}`,`vv ${visualViewport===null?"n/a":`${Math.round(visualViewport.width)}x${Math.round(visualViewport.height)}@${Math.round(visualViewport.offsetTop)}`}`].join(`
`),g=t.get("beacon")||"http://127.0.0.1:3199/diag",y=setInterval(()=>{fetch(g,{method:"POST",mode:"no-cors",body:T()}).catch(()=>{})},2e3);return()=>{window.removeEventListener("error",a),window.removeEventListener("unhandledrejection",n),b.disconnect(),clearInterval(m),clearInterval(y),l!==0&&cancelAnimationFrame(l),i.remove()}},"dsh-web-mobile: debug badge")}var Ha=1e4,ht=window,Kt=ht.__dshaMobileScrollState instanceof WeakMap?ht.__dshaMobileScrollState:ht.__dshaMobileScrollState=new WeakMap;function Bi(){return[...document.querySelectorAll('[data-mobile-nav="frame"] [class*="scrollBody"]')]}function Dl(){for(let e of Bi())if(e.scrollTop>0){let t={top:e.scrollTop,savedAt:Date.now(),url:location.href};Kt.set(e,t),ht.__dshaMobileLastScroll=t}else Kt.delete(e)}function ql(){for(let a of Bi()){let n=Kt.get(a);Kt.delete(a),!(!n||Date.now()-n.savedAt>Ha||n.url!==location.href)&&requestAnimationFrame(()=>{a.isConnected&&n.url===location.href&&Date.now()-n.savedAt<=Ha&&a.scrollTop===0&&(a.scrollTop=n.top)})}let e=ht.__dshaMobileLastScroll;if(e===void 0)return;let t=0,o=()=>{if(t+=1,e.url!==location.href||Date.now()-e.savedAt>Ha)return;let a=document.querySelector('[class*="scrollBody"]');if(a!==null&&a.scrollTop===0&&a.scrollHeight>=e.top+a.clientHeight){a.scrollTop=e.top;return}t<30&&requestAnimationFrame(o)};requestAnimationFrame(o)}function zi(e){e.effect(()=>e.locale.register($,{zh:xo,en:yo}),"dsh-web-mobile: dictionaries"),e.effect(()=>{for(let a of document.querySelectorAll('style[data-plugin-css="dsh-web-mobile/mobile.css"]'))a.remove();let o=document.createElement("style");return o.dataset.plugin="dsh-web-mobile",o.dataset.pluginCss="dsh-web-mobile/mobile.css",o.textContent=co,document.head.appendChild(o),setTimeout(()=>{o.isConnected&&document.head.appendChild(o)},0),ql(),()=>{Dl(),o.remove()}},"dsh-web-mobile: styles"),li(e),di(e);let t=Hi(e.layout);e.effect(()=>{let o=[vn(),dn(e),cn(e,t),()=>t.dispose()];return()=>{for(let a of o)a()}},"dsh-web-mobile: reconciler infrastructure"),xn(e),ln(e),Ni(e,t.exit),Tn(e),rn(e,gt),En(e),An(e,[Hn,Mn,Ln,On(e)]),Bn(e),zn(e),$n(e),Qn(e),Jn(e),ei(e),ni(e),ri(e),ci(e),ui(e),yi(e),wn(e),Ri(e),Fi(e),e.slots.inject("conversation.session.header.actions",()=>e.slots.register({name:"conversation.session.header.actions",id:"mobile-nav-toggle",order:10,locale:$,inject:()=>({toggleSidebar:()=>e.layout.toggleSidebar()})},oo)),e.slots.inject("conversation.input.left",()=>e.slots.register({name:"conversation.input.left",id:"mobile-nav-file-upload",order:10,locale:$,inject:()=>({})},no))}var Ut="dsh-pocket.layout";function Di({urlValue:e,stored:t,narrowMatch:o}){let a=String(e??"").trim().toLowerCase();return a==="desktop"?"desktop":a==="mobile"?"mobile":a==="auto"?o?"mobile":"desktop":t==="desktop"||t==="mobile"?t:o?"mobile":"desktop"}function qi(e){try{if(typeof localStorage>"u")return"";if(e==null)return Vl();let t=String(e).trim().toLowerCase();try{t==="desktop"||t==="mobile"?localStorage.setItem(Ut,t):(t==="auto"||t==="")&&localStorage.removeItem(Ut)}catch{}let o=localStorage.getItem(Ut);return o==="desktop"||o==="mobile"?o:""}catch{return""}}function Vl(){try{if(typeof localStorage>"u")return"";let e=localStorage.getItem(Ut);return e==="desktop"||e==="mobile"?e:""}catch{return""}}var Na="pocket";var Wl=`
  body[data-dsh-pocket-layout="mobile"] [data-mobile-nav="frame"] [class*="scrollBody"] {
    touch-action: pan-y pinch-zoom !important;
  }
  body[data-dsh-pocket-layout="mobile"][data-dsh-pocket-pinch-zoom="off"],
  body[data-dsh-pocket-layout="mobile"][data-dsh-pocket-pinch-zoom="off"] [data-mobile-nav="frame"] [class*="scrollBody"] {
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
    height: 28px !important;
    padding: 0 10px !important;
    border: 0.5px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, .24)) !important;
    border-radius: var(--dsw-radius-sm, 8px) !important;
    background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, .08)) !important;
    color: var(--dsw-alias-label-primary, inherit) !important;
    font-family: inherit !important;
    font-size: 12px !important;
    font-weight: 500 !important;
    line-height: 1 !important;
    cursor: pointer !important;
    -webkit-tap-highlight-color: transparent !important;
  }
  [data-mobile-nav="copy-file"]::after {
    content: "";
    position: absolute;
    inset: -8px -6px;
  }
  [data-mobile-nav="copy-file"]:active {
    background: var(--dsw-alias-interactive-bg-active, rgba(127, 127, 127, .16)) !important;
  }
  [data-mobile-nav="copy-file"][disabled] {
    opacity: .55 !important;
    cursor: default !important;
  }
  [data-mobile-nav="back-to-bottom"]::after {
    content: "";
    position: absolute;
    inset: -4px;
  }
  @media (hover: hover) {
    [data-mobile-nav="back-to-bottom"]:hover {
      background: var(--dsw-alias-bg-layer-3, var(--dsw-alias-interactive-bg-hover, #282e3d)) !important;
    }
  }
  [data-mobile-nav="back-to-bottom"]:active {
    transform: scale(0.95);
  }
  @keyframes dsh-pocket-sheet-rise {
    from { transform: translateY(18px); opacity: 0.92; }
    to { transform: none; opacity: 1; }
  }
  @keyframes dsh-pocket-skeleton-pulse {
    0%, 100% { opacity: 0.45; }
    50% { opacity: 0.9; }
  }
  [data-mobile-nav="file-preview-backdrop"] {
    position: fixed;
    inset: 0;
    z-index: 2147483440;
    background: rgba(0, 0, 0, 0.45);
    -webkit-tap-highlight-color: transparent;
  }
  [data-mobile-nav="file-preview-sheet"] {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2147483450;
    max-height: 82vh;
    max-height: min(82vh, calc(100dvh - env(safe-area-inset-top, 0px) - 24px));
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: env(safe-area-inset-left, 0px);
    padding-right: env(safe-area-inset-right, 0px);
    padding-bottom: env(safe-area-inset-bottom, 0px);
    border-radius: var(--dsw-radius-panel, 28px) var(--dsw-radius-panel, 28px) 0 0;
    border-top: 0.5px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.22));
    background: var(--dsw-alias-bg-layer-1, #171b24);
    color: var(--dsw-alias-label-primary, #f3f4f6);
    box-shadow: var(--dsw-elevation-prominent, 0 -12px 40px rgba(0, 0, 0, 0.28));
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    animation: dsh-pocket-sheet-rise 0.18s var(--ds-ease-out, ease-out);
    outline: none;
  }
  [data-mobile-nav="file-preview-skeleton-line"] {
    height: 12px;
    border-radius: 999px;
    corner-shape: round;
    background: var(--dsw-alias-bg-layer-3, rgba(127, 127, 127, 0.18));
    animation: dsh-pocket-skeleton-pulse 1.2s ease-in-out infinite;
  }
  @media (hover: hover) {
    [data-mobile-nav="file-preview-copy"]:hover:not(:disabled),
    [data-mobile-nav="file-preview-close"]:hover {
      background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.14)) !important;
    }
  }
  [data-mobile-nav="file-preview-copy"]:active:not(:disabled),
  [data-mobile-nav="file-preview-close"]:active {
    background: var(--dsw-alias-interactive-bg-active, rgba(127, 127, 127, 0.2)) !important;
  }
  [data-mobile-nav="file-preview-copy"]:disabled {
    opacity: 0.45;
    cursor: default !important;
  }
  @media (prefers-reduced-motion: reduce) {
    [data-mobile-nav="file-preview-sheet"],
    [data-mobile-nav="file-preview-skeleton-line"],
    [data-mobile-nav="back-to-bottom"] {
      animation: none !important;
      transition: none !important;
    }
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
}`;function Vi(e){e.effect(()=>{for(let o of document.querySelectorAll('style[data-plugin-css="dsh-pocket/mobile-extras.css"]'))o.remove();let t=document.createElement("style");return t.dataset.plugin="dsh-pocket",t.dataset.pluginCss="dsh-pocket/mobile-extras.css",t.textContent=Wl,document.head.appendChild(t),()=>{t.remove()}},"dsh-pocket: mobile extra styles")}var Ue="/dsh-pocket";var Fa="data-dsh-pocket-mobile-rightbar",Ba="dsh-pocket:mobile-rightbar",ut="data-dsh-pocket-pinch-zoom",za="dsh-pocket:mobile-pinch-zoom",Gt="data-dsh-pocket-mobile-font",Da="dsh-pocket:mobile-font-size",jt="--dsh-pocket-mobile-font-size";var Ge=Object.freeze({status:"pocket.status",tunnelStart:"tunnel.start",tunnelStop:"tunnel.stop",tunnelSetConfig:"tunnel.setConfig",version:"pocket.version",restart:"pocket.restart",lanTokenRefresh:"token.lanRefresh",lanAuthSetEnabled:"lanAuth.setEnabled",lanSetOverride:"lan.setOverride",lanSetEnabled:"lan.setEnabled",mobileRightbarSetEnabled:"mobile.rightbar.setEnabled",mobilePinchZoomSetEnabled:"mobile.pinchZoom.setEnabled",mobileFontSetSize:"mobile.font.setSize",mobileFilePreviewSetEnabled:"mobile.filePreview.setEnabled",pinSetCustom:"pin.setCustom",pocketReset:"pocket.reset",fileRead:"pocket.fileRead",cacheStats:"pocket.cache.stats",cacheClear:"pocket.cache.clear",pairingIssue:"pairing.issue",devicesList:"devices.list",devicesRename:"devices.rename",devicesRevoke:"devices.revoke",devicesRevokeAll:"devices.revokeAll"});var $t="data-dsh-pocket-file-preview",mt="dsh-pocket:mobile-file-preview";function Wi(e){e.effect(()=>{let t=!0,o=!1,a=!1,n=!1,i=!1,r=p=>{document.body?.setAttribute(Fa,p?"on":"off")},s=p=>{document.body?.setAttribute(ut,p?"on":"off")},l=p=>{let h=document.body;if(!h)return;let w=Number(p);Number.isInteger(w)&&w>=12&&w<=22?(h.style.setProperty(jt,`${w}px`),h.setAttribute(Gt,String(w))):(h.style.removeProperty(jt),h.removeAttribute(Gt))},c=p=>{document.body?.setAttribute($t,p?"on":"off")},b=p=>{o=!0,r(p.detail?.enabled===!0)},m=p=>{a=!0,s(p.detail?.enabled===!0)},v=p=>{n=!0,l(Number(p.detail?.size)||0)},T=p=>{i=!0;let h=p.detail;c(typeof h?.enabled=="boolean"?h.enabled:h?.enabled!==!1)},g=()=>{o||r(!0),a||s(!1),n||l(0),i||c(!0)},y=async()=>{try{let p=e.connection?.rpc;if(typeof p?.call!="function"){t&&g();return}let h=await p.call(Ue,Ge.status,{});if(!t)return;if(h?.ok!==!0||!h.value){g();return}let w=h.value;o||r(w.mobileRightbarEnabled!==!1),a||s(w.mobilePinchZoomEnabled===!0),n||l(Number(w.mobileFontSize)||0),i||c(w.mobileFilePreviewEnabled!==!1)}catch{t&&g()}};return window.addEventListener(Ba,b),window.addEventListener(za,m),window.addEventListener(Da,v),window.addEventListener(mt,T),y(),()=>{t=!1,window.removeEventListener(Ba,b),window.removeEventListener(za,m),window.removeEventListener(Da,v),window.removeEventListener(mt,T),document.body?.removeAttribute(Fa),document.body?.removeAttribute(ut),document.body?.style.removeProperty(jt),document.body?.removeAttribute(Gt),document.body?.removeAttribute($t)}},"dsh-pocket: mobile preferences sync")}function Ki(e){e("dsh-pocket: mobile zoom lock",()=>{let t=0,o=()=>{t=window.visualViewport?.scale??0},a=i=>{if(document.body?.getAttribute(ut)==="on")return;let r=i.scale,s=typeof r=="number"&&Number.isFinite(r)&&r<1;t>1.0001&&s||i.preventDefault()},n=()=>{t=0};return document.addEventListener("gesturestart",o,{passive:!1}),document.addEventListener("gesturechange",a,{passive:!1}),document.addEventListener("gestureend",n,{passive:!1}),()=>{document.removeEventListener("gesturestart",o),document.removeEventListener("gesturechange",a),document.removeEventListener("gestureend",n)}}),e("dsh-pocket: dialog focus containment",()=>{let t='[role="dialog"][aria-modal="true"]',o='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',a=[],n=g=>g.hasAttribute("data-mobile-nav")||g.parentElement?.hasAttribute("data-mobile-nav")===!0,i=g=>Array.from(g.querySelectorAll(o)).filter(y=>y.getClientRects().length>0),r=g=>!g.closest('[aria-hidden="true"], [inert]')&&g.getClientRects().length>0,s=()=>{let g=Array.from(document.querySelectorAll(t)).filter(y=>n(y)&&r(y));return g.length>0?g[g.length-1]:null},l=null,c=g=>{if(l===null||!l.isConnected||g.key!=="Tab")return;let y=i(l);if(y.length===0){g.preventDefault(),document.activeElement!==l&&l.focus({preventScroll:!0});return}let p=y[0],h=y[y.length-1],w=document.activeElement;g.shiftKey&&(w===p||!l.contains(w))?(g.preventDefault(),h.focus({preventScroll:!0})):!g.shiftKey&&(w===h||!l.contains(w))&&(g.preventDefault(),p.focus({preventScroll:!0}))};document.addEventListener("keydown",c,!0);let b=()=>{let g=s();if(g===l)return;if(l!==null&&g!==null){l=g,g.hasAttribute("tabindex")||g.setAttribute("tabindex","-1"),(i(g)[0]??g).focus({preventScroll:!0});return}if(l!==null){let h=a.pop();l=null,h!==void 0&&h.isConnected&&h.focus({preventScroll:!0});return}if(l=g,g===null)return;let y=document.activeElement;y!==null&&y!==document.body&&!g.contains(y)&&a.push(y),g.hasAttribute("tabindex")||g.setAttribute("tabindex","-1"),(i(g)[0]??g).focus({preventScroll:!0})},m=0,v=()=>{m===0&&(m=requestAnimationFrame(()=>{m=0,b()}))};b();let T=new MutationObserver(g=>{for(let y of g)if(y.type==="childList"){for(let p of y.addedNodes)if(p.nodeType===1){v();return}for(let p of y.removedNodes)if(p.nodeType===1){v();return}}});return T.observe(document.body,{childList:!0,subtree:!0}),()=>{document.removeEventListener("keydown",c,!0),T.disconnect(),m!==0&&cancelAnimationFrame(m),l?.removeAttribute("tabindex"),l=null,a.length=0}})}function Ui(e){let{hasGeneration:t,generation:o,state:a}=e??{};if(t===!0){let i=o!=null;return{down:!i,usable:i}}let n=a==="disconnected"||a==="connecting";return{down:n,usable:!n}}function Gi(e){let{hasGeneration:t,generation:o,state:a}=e??{};return t===!0&&o!==void 0&&o!==null?"up":a==="connecting"?"connecting":t===!0||a==="disconnected"?"down":"up"}function ji({staleMs:e=2500,hardStuckMs:t=8e3,maxRepairAttempts:o=3}={}){let a=new Map,n=new Map,i=Number.NEGATIVE_INFINITY,r=Number.NEGATIVE_INFINITY,s=0,l=!1,c=(w,E)=>{if(w.down){l=!0;return}l&&(l=!1,s+=1,i=E)},b=w=>{r=w,s+=1,l=!1,n.clear()},m=(w,E)=>a.has(w)?!1:(a.set(w,E),!0),v=w=>{a.delete(w),n.delete(w)},T=(w,E,A={})=>{let x=a.get(w);if(x===void 0)return g;if((n.get(w)??0)>=o)return{waiting:!1,stale:!0,repair:!1,reconnect:!1};let u=A.openState==="loading";if(u&&A.openPromise==="gone")return p(w,{reconnect:!1});let d=A.openState!=="open"&&A.openState!=="cold";if(r>x){let C=E-r;return C<e?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:e-C}:d?p(w,{reconnect:!0}):y}if(s>0&&i>x){let C=E-Math.max(x,i);return C<e?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:e-C}:d?p(w,{reconnect:!1}):y}if(u&&E-x>=t)return p(w,{reconnect:!0});if(A.openState==="open"){let C=e-(E-x);return C>0?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:C}:y}if(A.openState===void 0){let C=t-(E-x);return C>0?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:C}:y}return u?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:Math.max(0,t-(E-x))}:g},g={waiting:!1,stale:!1,repair:!1,reconnect:!1},y={waiting:!1,stale:!0,repair:!1,reconnect:!1},p=(w,{reconnect:E})=>(n.set(w,(n.get(w)??0)+1),{waiting:!1,stale:!0,repair:!0,reconnect:E});return{noteLink:c,noteResume:b,observe:m,release:v,decide:T,reset:()=>{a.clear(),n.clear(),l=!1,s=0,i=Number.NEGATIVE_INFINITY,r=Number.NEGATIVE_INFINITY}}}function $i({gapMs:e=5e3,intervalMs:t=1e3}={}){let o=null;return{tick:i=>{if(o===null)return o=i,!1;let r=i-o;return o=i,r>Math.max(e,t*2)},reset:()=>{o=null},intervalMs:t}}var Gl=1500,Xi=900,jl=400,Yi=500,$l=[2e3,4e3,8e3,15e3,3e4],Xl=15e3,Yl=3e4,Zi=1200,Qi=3e3;function Ji({pingMs:e=Gl,probeRetryMs:t=jl,backoffMs:o=$l,hostStuckMs:a=Xl,coldStuckMs:n=Yl}={}){let i=!1,r=!1,s=0,l=null,c=0,b=Number.NEGATIVE_INFINITY,m=!1,v=Number.NEGATIVE_INFINITY,T=()=>{l=null,c=0,v=Number.NEGATIVE_INFINITY},g=(x,u)=>{if((typeof x=="boolean"?x?"down":"up":x)==="up"){i=!0,r=!1,s===0&&l!==null&&T();return}r=!0,l===null&&(l=u)},y=(x,u)=>{if(u!==!0||m)return!1;let d=s>0?t:e;return x-b<d?!1:(b=x,m=!0,!0)},p=(x,u)=>{if(m=!1,x===!0){s=0,i=!0,!r&&l!==null&&T();return}s+=1,b=u,l===null&&(l=u)},h=(x,u)=>{if(u!==!0||l===null)return!1;let d=s>=2&&!r,C=i&&r&&x-l>=a,f=!i&&x-l>=n;if(!d&&!C&&!f)return!1;let k=o[Math.min(c,o.length-1)];return x-v<k?!1:(c+=1,v=x,!0)};return{noteState:g,shouldProbe:y,noteProbe:p,shouldForceReconnect:h,shouldReconnect:h,isDown:()=>i&&l!==null,downFor:x=>i&&l!==null?x-l:0,reset:()=>{i=!1,r=!1,s=0,m=!1,b=Number.NEGATIVE_INFINITY,T()}}}var Zl="/__dsh-pocket/ping";function tr(e,t,o){t("dsh-pocket: settling watchdog (host reconnect leaves composer hidden)",()=>{let a="data-dshp-settling-stale",n=ji(),i=$i(),r=new Map,s=0,l=0,c=!1,b=()=>performance.now(),m=()=>{let S=e.connection,R=typeof S?.generation?.getSnapshot=="function";return Ui({hasGeneration:R,generation:R?S.generation?.getSnapshot?.():void 0,state:R?void 0:S?.state?.getSnapshot?.()})},v=()=>{try{let S=e.sessions?.list?.getSnapshot?.();if(S===null||typeof S!="object")return;if(typeof S.current=="string")return S.current;for(let R in S.byId){let P=S.byId[R];if(P===void 0)continue;let D=P.retainedBy?.mainView;if(typeof D=="number"&&D>0&&typeof P.id=="string")return P.id}}catch{}},T=S=>{if(S===void 0)return{};try{let R=e.sessions?.manager?.get?.(S);if(R===void 0)return{};let P=R.getSnapshot?.()?.openState;if(typeof P!="string")return{};let D="openPromise"in R?R.openPromise===null||R.openPromise===void 0?"gone":"live":"unknown";return{openState:P,openPromise:D}}catch{return{}}},g=()=>{try{let S=e.connection;typeof S?.reconnect=="function"&&S.reconnect()}catch{}},y=S=>{let R=S.getAttribute("data-conversation-session");if(typeof R=="string"&&R!=="")return R;let D=S.querySelector("[data-conversation-session]")?.getAttribute("data-conversation-session");return typeof D=="string"&&D!==""?D:void 0},p=(S,R)=>{S&&g();try{let P=(R===void 0?void 0:y(R))??v();if(P===void 0)return;let D=e.sessions?.manager?.get?.(P);if(typeof D?.resync!="function")return;D.resync()}catch{}},h=S=>{let R=r.get(S);R!==void 0&&(window.clearTimeout(R),r.delete(S))},w=S=>S.getAttribute("data-phase")==="settling"?"data-phase":S.getAttribute("data-content-phase")==="settling"?"data-content-phase":null,E=(S,R=2500)=>{r.has(S)||r.set(S,window.setTimeout(()=>{r.delete(S),A(S)},Math.max(0,R)))},A=S=>{if(c||!S.isConnected||w(S)===null)return;let R=y(S)??v(),P=n.decide(S,b(),T(R));if(P.repair&&p(P.reconnect,S),!P.stale){P.waiting&&E(S,P.remainingMs??2500);return}S.getAttribute(a)===null&&S.setAttribute(a,"")},x='[data-phase="settling"],[data-content-phase="settling"]',u=()=>{if(s=0,c)return;let S=b(),R=document.querySelectorAll(x);for(let P of Array.from(document.querySelectorAll(`[${a}]`)))w(P)===null&&(P.removeAttribute(a),n.release(P));for(let P of Array.from(R))n.observe(P,S),E(P);for(let P of Array.from(r.keys()))(!P.isConnected||w(P)===null)&&(h(P),n.release(P))},d=()=>{s===0&&!c&&(s=requestAnimationFrame(u))},C=new MutationObserver(S=>{for(let R of S){if(R.type==="attributes"){d();return}for(let P of R.addedNodes)if(P.nodeType!==3){d();return}for(let P of R.removedNodes)if(P.nodeType!==3){d();return}}});C.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-phase","data-content-phase"]});let f=()=>{n.noteLink(m(),b());for(let S of Array.from(r.keys()))h(S);d()},k=[];for(let S of["generation","state"])try{let R=e.connection[S];typeof R?.subscribe=="function"&&k.push(R.subscribe(f))}catch{}let _=()=>{n.noteResume(b());for(let S of Array.from(r.keys()))h(S);d()},L=()=>{document.visibilityState==="visible"&&_()},M=S=>{S.persisted&&_()};return document.addEventListener("visibilitychange",L),window.addEventListener("pageshow",M),l=window.setInterval(()=>{i.tick(b())&&_()},i.intervalMs),u(),()=>{c=!0,C.disconnect();for(let S of k)S();document.removeEventListener("visibilitychange",L),window.removeEventListener("pageshow",M),l!==0&&window.clearInterval(l),i.reset(),s!==0&&cancelAnimationFrame(s);for(let S of r.values())window.clearTimeout(S);r.clear(),n.reset();for(let S of Array.from(document.querySelectorAll(`[${a}]`)))S.removeAttribute(a)}}),t("dsh-pocket: link watchdog (silent disconnect never recovers)",()=>{let a=Ji(),n=!1,i=0,r=null,s=0,l=()=>performance.now(),c=()=>{try{let u=e.connection,d=typeof u?.generation?.getSnapshot=="function";return Gi({hasGeneration:d,generation:d?u.generation?.getSnapshot?.():void 0,state:typeof u?.state?.getSnapshot=="function"?u.state.getSnapshot():void 0})}catch{return"up"}},b=()=>{try{let u=e.connection;typeof u?.reconnect=="function"&&u.reconnect()}catch{}},m=null,v=!1,T=0,g=()=>(m!==null&&m.isConnected||(m=document.createElement("div"),m.setAttribute("data-mobile-nav","link-banner"),m.setAttribute("role","status"),m.setAttribute("aria-live","polite"),m.style.cssText="position:fixed;left:50%;top:calc(env(safe-area-inset-top, 0px) + 10px);transform:translateX(-50%);z-index:2147483600;max-width:calc(100vw - 32px);padding:8px 16px;border-radius:999px;corner-shape:round;border:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.22));font:500 13px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:var(--dsw-alias-label-on-color, #ffffff);box-shadow:var(--dsw-elevation-prominent, 0 8px 24px rgba(0,0,0,.28));pointer-events:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center",document.body.appendChild(m)),m),y=(u,d)=>{let C=g();C.textContent=u,C.style.background=d==="down"?"var(--dsw-alias-state-error-primary, #dc2626)":"var(--dsw-alias-state-success-primary, #16a34a)",C.style.display="block"},p=()=>{window.clearTimeout(T),T=0,m?.remove(),m=null,v=!1},h=()=>{if(n)return;let u=l(),d=a.isDown()&&a.downFor(u)>=Zi;if(d!==v)if(v=d,d)window.clearTimeout(T),T=0,s=u-a.downFor(u),y(o("linkDown","连接已断开，正在自动重连…"),"down");else{let C=s===0?0:Math.round(u-s);s=0,C>=Qi?(y(o("linkBack","✅ 已重新连接"),"back"),T=window.setTimeout(p,1400)):p()}},w=()=>{let u=!1,d=typeof AbortController=="function"?new AbortController:null;r=d;let C=f=>{u||n||(u=!0,window.clearTimeout(i),i=0,r===d&&(r=null),a.noteProbe(f,l()),h())};i=window.setTimeout(()=>{d?.abort(),C(!1)},Xi);try{if(typeof fetch=="function"){fetch(Zl,{method:"GET",cache:"no-store",credentials:"same-origin",...d?{signal:d.signal}:{}}).then(k=>{if(k.status===401||k.status===403){C(!1);return}C(k.status===204||k.ok)},()=>C(!1));return}let f=e.connection?.rpc;if(typeof f?.call!="function"){C(!0);return}Promise.resolve(f.call(Ue,Ge.status,{})).then(()=>C(!0),()=>C(!1))}catch{C(!1)}},E=()=>{if(n)return;let u=l(),d=document.visibilityState==="visible";a.noteState(c(),u);let C=navigator.onLine!==!1;a.shouldForceReconnect(u,d&&C)&&b(),a.shouldProbe(u,d)&&w(),h()},A=window.setInterval(E,Yi),x=()=>{document.visibilityState==="visible"&&E()};return document.addEventListener("visibilitychange",x),E(),()=>{n=!0,window.clearInterval(A),window.clearTimeout(i),r?.abort(),r=null,p(),a.reset(),document.removeEventListener("visibilitychange",x)}})}var Ql='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 3.75v10.5M4.5 9.75L9 14.25l4.5-4.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>';function ar(e,t,o){t("dsh-pocket: keyboard height css var (--dshp-kb)",()=>{let a=window.visualViewport;if(a==null)return()=>{};let n=document.documentElement,i=0,r="",s=0,l=!1,c=null,b=()=>(c!==null&&c.isConnected&&c.matches("[data-composer-seat]")&&c.getClientRects().length>0||(c=Array.from(document.querySelectorAll("[data-composer-seat]")).find(T=>T.getClientRects().length>0)??null),c),m=()=>{i=0;let T=Math.max(0,window.innerHeight-a.height-a.offsetTop),g=0;if(Math.abs(a.scale-1)<.01){let h=b();if(h!==null){let w=h.getBoundingClientRect().bottom+(l?s:0);g=Math.max(0,w-a.height)}}let y=Math.min(Math.max(T,g),Math.round(window.innerHeight*.6));s=y,l=y>0;let p=`${Math.round(y)}px`;p!==r&&(r=p,n.style.setProperty("--dshp-kb",p),y>0?n.setAttribute("data-dshp-kb","open"):n.removeAttribute("data-dshp-kb"))},v=()=>{i===0&&(i=requestAnimationFrame(m))};return a.addEventListener("resize",v),a.addEventListener("scroll",v),m(),()=>{a.removeEventListener("resize",v),a.removeEventListener("scroll",v),i!==0&&cancelAnimationFrame(i),c=null,n.style.removeProperty("--dshp-kb"),n.removeAttribute("data-dshp-kb")}}),t("dsh-pocket: first-visit tips",()=>{let a="dsh-pocket:first-visit-tips:v1",n=!0;try{n=window.localStorage.getItem(a)!==null}catch{}if(n)return()=>{};let i=()=>{try{window.localStorage.setItem(a,"1")}catch{}},r=null,s=0,l=()=>{i(),window.clearTimeout(s),s=0,r?.remove(),r=null};r=document.createElement("div"),r.setAttribute("data-mobile-nav","first-visit-tips"),r.setAttribute("role","dialog"),r.setAttribute("aria-label",o("tipsTitle","这是电脑上 DSH 的手机界面")),r.style.cssText="position:fixed;left:max(12px, env(safe-area-inset-left, 0px));right:max(12px, env(safe-area-inset-right, 0px));bottom:calc(env(safe-area-inset-bottom, 0px) + 76px);z-index:2147483500;max-width:420px;margin:0 auto;padding:16px 18px;border-radius:var(--dsw-radius-xl, 20px);border:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.22));background:var(--dsw-alias-bg-layer-2, #1f2430);color:var(--dsw-alias-label-primary, #f3f4f6);font:400 13px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:var(--dsw-elevation-prominent, 0 12px 32px rgba(0,0,0,.28))";let c=document.createElement("div");c.textContent=o("tipsTitle","这是电脑上 DSH 的手机界面"),c.style.cssText="font-weight:500;font-size:14px;line-height:1.4;margin-bottom:6px;color:var(--dsw-alias-label-primary, #f3f4f6)";let b=document.createElement("div");b.textContent=o("tipsBody",`与电脑实时同步，不是另一个应用。
· 右滑（或点左上角）打开会话抽屉
· 断线会自动重连，不用手动刷新
· 字号、键盘、右边栏都在设置页「手机访问」里`),b.style.cssText="white-space:pre-line;color:var(--dsw-alias-label-secondary, #cbd5e1)";let m=document.createElement("button");return m.type="button",m.textContent=o("tipsDismiss","知道了"),m.style.cssText="margin-top:12px;height:32px;padding:0 14px;border:0.5px solid var(--dsw-alias-border-l2, rgba(127,127,127,.28));border-radius:var(--dsw-radius-md, 12px);background:var(--dsw-alias-bg-layer-3, rgba(127,127,127,.12));color:var(--dsw-alias-label-primary, #f3f4f6);font:500 13px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;cursor:pointer;-webkit-tap-highlight-color:transparent",m.addEventListener("click",l),r.append(c,b,m),document.body.appendChild(r),s=window.setTimeout(l,12e3),()=>{window.clearTimeout(s),r?.remove(),r=null}}),t("dsh-pocket: back to bottom pill",()=>{let n=null,i=0,r=!1,s=null,l=null,c=null,b=()=>{let d=document.querySelectorAll("[data-conversation-scroll]");for(let C of Array.from(d))if(C.getClientRects().length>0)return C;return null},m=()=>Array.from(document.querySelectorAll("[data-composer-seat]")).find(d=>d.getClientRects().length>0)??null,v=()=>{let d=m();return d===null?92:Math.max(12,window.innerHeight-d.getBoundingClientRect().top+12)},T=()=>{r&&(r=!1,n!==null&&(n.style.display="none"))},g=()=>{if(n===null)return;let d=`${v()}px`;n.style.bottom!==d&&(n.style.bottom=d)},y=()=>(n!==null&&n.isConnected||(n=document.createElement("button"),n.type="button",n.setAttribute("data-mobile-nav","back-to-bottom"),n.setAttribute("aria-label",o("backToBottom","回到底部")),n.innerHTML=Ql,n.style.cssText="position:fixed;right:max(14px, env(safe-area-inset-right, 0px));z-index:2147483400;width:40px;height:40px;border-radius:50%;corner-shape:round;border:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.24));background:var(--dsw-alias-bg-layer-2, #1f2430);color:var(--dsw-alias-label-primary, #f3f4f6);box-shadow:var(--dsw-elevation-panel, 0 4px 14px rgba(0,0,0,.22));display:none;align-items:center;justify-content:center;padding:0;cursor:pointer;-webkit-tap-highlight-color:transparent",n.addEventListener("click",()=>{let d=b();if(d!==null)try{d.scrollTo({top:d.scrollHeight,behavior:"smooth"})}catch{d.scrollTop=d.scrollHeight}T()}),document.body.appendChild(n)),n),p=()=>{i===0&&(i=requestAnimationFrame(E))},h=typeof ResizeObserver=="function"?new ResizeObserver(()=>{r&&g(),p()}):null,w=d=>{if(h===null)return;let C=d?.firstElementChild??null,f=m();d===s&&C===l&&f===c||(h.disconnect(),s=d,l=C,c=f,d!==null&&h.observe(d),C!==null&&h.observe(C),f!==null&&h.observe(f))};function E(){if(i=0,document.visibilityState!=="visible"){T();return}let d=b();if(w(d),d===null||d.scrollHeight-d.scrollTop-d.clientHeight<=280){T();return}let C=y();g(),r||(C.style.display="flex",r=!0)}let A=()=>{r&&g(),p()},x=d=>{let C=d.target;C instanceof Element&&C.closest("[data-conversation-scroll]")!==null&&p()},u=new MutationObserver(d=>{for(let C of d)if(C.type==="childList"){for(let f of C.addedNodes)if(f.nodeType===1){p();return}for(let f of C.removedNodes)if(f.nodeType===1){p();return}}});return document.addEventListener("scroll",x,{capture:!0,passive:!0}),window.addEventListener("resize",A),window.visualViewport?.addEventListener("resize",A),document.addEventListener("visibilitychange",p),u.observe(document.body,{childList:!0,subtree:!0}),p(),()=>{i!==0&&cancelAnimationFrame(i),h?.disconnect(),u.disconnect(),s=null,l=null,c=null,document.removeEventListener("scroll",x,!0),window.removeEventListener("resize",A),window.visualViewport?.removeEventListener("resize",A),document.removeEventListener("visibilitychange",p),n?.remove(),n=null,r=!1}}),t("dsh-pocket: standalone viewport guard (scroll residue / short layout viewport)",()=>{let a=window.visualViewport;if(a==null)return()=>{};let n=document.documentElement,i=0,r=0,s=!1,l=null,c=0,b=new URLSearchParams(window.location.search).has("dshp-diag"),m=g=>{l===null&&(l=document.createElement("div"),l.dataset.dshPocketDiag="1",l.style.cssText="position:fixed;top:calc(env(safe-area-inset-top, 0px) + 2px);left:2px;z-index:2147483647;font:10px/1.4 ui-monospace,Menlo,Consolas,monospace;background:rgba(0,0,0,.65);color:#4ade80;padding:2px 6px;border-radius:4px;pointer-events:none;white-space:normal;width:calc(100vw - 8px);word-break:break-all",document.body.appendChild(l));let y=Array.from(document.querySelectorAll("[data-composer-seat]")).find(d=>d.getClientRects().length>0)??null,p=y?.closest("[data-conversation-scroll]")??null,h=p?.querySelector('[class*="_viewArea"]')??null,w=" va=-/col=-/nz=-";if(h!==null){w=` va=${Math.round(h.getBoundingClientRect().height)}/col=-/nz=-`;let d=h;for(let C=0;C<6&&d!==null;C+=1){if(d.children.length>10){let f=Array.from(d.children).filter(k=>k.offsetHeight>0).length;w=` va=${Math.round(h.getBoundingClientRect().height)} col=${Math.round(d.getBoundingClientRect().height)} nz=${f}/${d.children.length}`;break}d=d.firstElementChild}}let E=p===null?"":` sb=${p.clientHeight}/${p.scrollHeight}@${Math.round(p.scrollTop)}`,A=y===null?"":` seatB=${Math.round(y.getBoundingClientRect().bottom)}`,x=getComputedStyle(n).getPropertyValue("--dshp-kb").trim()||"0px",u=n.hasAttribute("data-dshp-kb")?1:0;l.textContent=`tag=v4.0 ih=${window.innerHeight} vv=${Math.round(a.height)} off=${Math.round(a.offsetTop)} sc=${a.scale.toFixed(2)} sy=${window.scrollY}${E}${A}${w} kbc=${x}/f=${u}`,g&&(window.clearTimeout(c),c=window.setTimeout(()=>{l?.remove(),l=null},8e3))},v=()=>{i=0;let g=a.height>=window.innerHeight-8;if(Math.abs(a.scale-1)<.01&&a.height-window.innerHeight>8){if(r===0&&(r=performance.now()),!s&&performance.now()-r>600){s=!0,n.style.setProperty("--dshp-frame-h",`${Math.round(a.height)}px`),n.style.setProperty("--dshp-vh-diff",`${Math.round(a.height-window.innerHeight)}px`),n.setAttribute("data-dsh-pocket-full-height","");let p=Array.from(document.querySelectorAll("[data-conversation-scroll]")).find(h=>h.getClientRects().length>0)??null;p!==null&&p.scrollHeight-p.scrollTop-p.clientHeight<=8&&requestAnimationFrame(()=>{s&&p.isConnected&&(p.scrollTop=p.scrollHeight)}),m(!0)}}else r=0,s&&(s=!1,n.style.removeProperty("--dshp-frame-h"),n.style.removeProperty("--dshp-vh-diff"),n.removeAttribute("data-dsh-pocket-full-height"));!s&&g&&(window.scrollY>1||a.offsetTop>1)&&window.scrollTo(0,0),b&&m(!1)},T=()=>{i===0&&(i=requestAnimationFrame(v))};return a.addEventListener("resize",T),a.addEventListener("scroll",T),window.addEventListener("focusout",T),window.addEventListener("pageshow",T),v(),()=>{a.removeEventListener("resize",T),a.removeEventListener("scroll",T),window.removeEventListener("focusout",T),window.removeEventListener("pageshow",T),i!==0&&cancelAnimationFrame(i),window.clearTimeout(c),l?.remove(),n.style.removeProperty("--dshp-frame-h"),n.style.removeProperty("--dshp-vh-diff"),n.removeAttribute("data-dsh-pocket-full-height")}})}var Jl=["添加工作区","添加工作区…","Add workspace","Add workspace…"],or='[role="tab"], [role="treeitem"], [role="menuitem"], [role="menu"]',nr=2*1024*1024,Wa=128*1024,ir=64*1024,ed='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.75" stroke="currentColor" stroke-width="1.6"/><path d="M10.5 5.5V3.75A1.75 1.75 0 0 0 8.75 2h-5A1.75 1.75 0 0 0 2 3.75v5A1.75 1.75 0 0 0 3.75 10.5H5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',td='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',ad='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 2h5l3.5 3.5V13a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 13V3.5A1.5 1.5 0 0 1 4 2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 2v3.5h3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',od='<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.5" stroke="currentColor" stroke-width="1.6"/><path d="M10 6.5v4.2M10 13.5h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';function Ka(e){let t=(e??"").trim();return t.length<3||t.length>320||/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(t)&&!/^file:\/\//i.test(t)?!1:!!(/^(\/|~\/|\.\.?\/|[A-Za-z]:\\)/.test(t)||/\/[\w.-]+\.\w{1,12}$/.test(t))}function qa(e){let o=e.replace(/[\\/]+$/,"").split(/[\\/]/);return o[o.length-1]||e}function Va(e){return!Number.isFinite(e)||e<0?"":e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(e<10*1024?1:0)} KB`:`${(e/(1024*1024)).toFixed(1)} MB`}function nd(e,t){if(e.length<=t)return{text:e,truncated:!1};let o=t,a=e.charCodeAt(o-1);return a>=55296&&a<=56319&&(o-=1),{text:e.slice(0,o),truncated:!0}}function id(e){let t=1;for(let a=0;a<e.length;a+=1)e.charCodeAt(a)===10&&(t+=1);let o=new Array(t);for(let a=0;a<t;a+=1)o[a]=String(a+1);return o.join(`
`)}async function rr(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.top="-9999px",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let o=document.execCommand("copy");return t.remove(),o}catch{return!1}}function Ua(e){let t=()=>{try{let a=e.sessions?.list?.getSnapshot?.();if(a===null||typeof a!="object")return;if(typeof a.current=="string")return a.current;for(let n in a.byId){let i=a.byId[n];if(i===void 0)continue;let r=i.retainedBy?.mainView;if(typeof r=="number"&&r>0&&typeof i.id=="string")return i.id}}catch{}},o=()=>{try{let n=(e.get?.("workspaces")??e.workspaces)?.list,i=Array.isArray(n)?n:n&&typeof n=="object"&&"value"in n?n.value:null;if(Array.isArray(i))for(let r of i){let s=r?.cwd??r?.root;if(typeof s=="string"&&s)return s}}catch{}return""};return a=>{let n=t();return e.connection.rpc.call(Ue,Ge.fileRead,{path:a,cwd:o(),...n===void 0?{}:{sessionId:n}})}}function Ga(e,t,o){let a=!1,n=()=>{try{let O=document.documentElement?.lang||(typeof navigator<"u"?navigator.language:"")||"";return/^en\b/i.test(O)}catch{return!1}},i=(O,N,I)=>{try{let B=t(O);if(typeof B=="string"&&B.length>0&&B!==O)return B}catch{}return n()?I:N},r=(O,N,I,B)=>{let J=i(O,I,B);for(let[ne,Y]of Object.entries(N))J=J.split(`{${ne}}`).join(String(Y));return J},s=()=>typeof o?.previewEnabled=="boolean"?o.previewEnabled:document.body?.getAttribute($t)!=="off",l=()=>typeof o?.injectCopyButtons=="boolean"?o.injectCopyButtons:!s(),c=null,b=null,m=O=>{(c===null||!c.isConnected)&&(c=document.createElement("div"),c.setAttribute("data-mobile-nav","file-guard-toast"),c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.style.cssText="position:fixed;left:50%;bottom:calc(64px + env(safe-area-inset-bottom, 0px) + var(--dshp-kb, 0px));transform:translateX(-50%);max-width:84vw;z-index:2147483550;padding:9px 16px;border-radius:999px;corner-shape:round;border:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.24));background:var(--dsw-alias-bg-layer-2, #1f2430);color:var(--dsw-alias-label-primary, #f3f4f6);font-size:13px;font-weight:500;line-height:1.4;text-align:center;box-shadow:var(--dsw-elevation-panel, 0 4px 16px rgba(0,0,0,.28));pointer-events:none;opacity:0;transition:opacity .18s ease",document.body.appendChild(c)),c.textContent=O,requestAnimationFrame(()=>{c!==null&&(c.style.opacity="1")}),b!==null&&window.clearTimeout(b),b=window.setTimeout(()=>{c!==null&&(c.style.opacity="0")},2600)},v=null,T=O=>{document.activeElement?.blur(),v?.remove();let I=O.length>ir?`${O.slice(0,ir)}
${i("fileTruncated","…已截断","… truncated")}`:O,B=document.createElement("div");B.setAttribute("data-mobile-nav","file-guard-fallback"),B.style.cssText="position:fixed;left:max(8px, env(safe-area-inset-left, 0px));right:max(8px, env(safe-area-inset-right, 0px));bottom:calc(16px + env(safe-area-inset-bottom, 0px) + var(--dshp-kb, 0px));max-height:45vh;overflow:auto;z-index:2147483560;padding:12px 14px;border-radius:var(--dsw-radius-lg, 16px);border:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.24));background:var(--dsw-alias-bg-layer-1, #171b24);color:var(--dsw-alias-label-primary, #f3f4f6);box-shadow:var(--dsw-elevation-prominent, 0 8px 28px rgba(0,0,0,.36));-webkit-overflow-scrolling:touch";let J=document.createElement("div");J.style.cssText="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--dsw-alias-label-secondary, #9ca3af);margin-bottom:8px";let ne=document.createElement("span");ne.textContent=i("fileFallbackTitle","复制失败，长按下方文本选择","Copy failed — long-press the text below to select it");let Y=document.createElement("button");Y.type="button",Y.textContent=i("fileFallbackClose","关闭","Close"),Y.style.cssText="border:0.5px solid var(--dsw-alias-border-l2, rgba(127,127,127,.3));background:transparent;color:var(--dsw-alias-label-primary, #f3f4f6);border-radius:var(--dsw-radius-sm, 8px);padding:4px 10px;font-size:12px;font-weight:500;cursor:pointer",Y.addEventListener("click",()=>{B.remove(),v===B&&(v=null)});let U=document.createElement("pre");U.textContent=I,U.style.cssText="margin:0;white-space:pre-wrap;word-break:break-all;user-select:text;-webkit-user-select:text;font-size:12px;line-height:1.5;font-family:var(--dsh-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)",J.append(ne,Y),B.append(J,U),document.body.appendChild(B),v=B},g=null,y=null,p=0,h=null,w=!1,E=!1,A=0,x=null,u=null,d=null,C=()=>{E=!1,A!==0&&(window.clearTimeout(A),A=0)},f=(O=!1)=>{if(p+=1,x!==null&&(document.removeEventListener(we,x),x=null),u!==null&&(document.removeEventListener("keydown",u),u=null),y!==null&&(y.removeAttribute(_e),y.remove(),y=null),g!==null&&(g.remove(),g=null),w)if(w=!1,!O&&typeof history<"u"&&typeof history.back=="function"){E=!0,A!==0&&window.clearTimeout(A),A=window.setTimeout(()=>{C(),d!==null&&(window.removeEventListener("popstate",d),d=null)},800);try{history.back()}catch{C()}}else d!==null&&(window.removeEventListener("popstate",d),d=null);else d!==null&&!E&&(window.removeEventListener("popstate",d),d=null);let N=h;if(h=null,N!==null&&N.isConnected)try{N.focus({preventScroll:!0})}catch{}},k=(O,N)=>{let I=O.replace(/^file:\/\//i,""),B=document.activeElement;if(B!==null&&B!==N&&typeof B.blur=="function"&&B.blur(),y!==null)x!==null&&(document.removeEventListener(we,x),x=null),u!==null&&(document.removeEventListener("keydown",u),u=null),y.removeAttribute(_e),y.remove(),y=null,g?.remove(),g=null;else if(h=N,typeof history<"u"&&typeof history.pushState=="function")try{history.pushState({dshPocketFilePreview:!0},""),w=!0}catch{w=!1}let J=++p,ne="",Y=0,U=!1,ie=document.createElement("div");ie.setAttribute("data-mobile-nav","file-preview-backdrop"),ie.addEventListener("click",()=>{f(!1)});let V=document.createElement("div");V.setAttribute("data-mobile-nav","file-preview-sheet"),V.setAttribute(_e,"file-preview"),V.setAttribute("role","dialog"),V.setAttribute("aria-label",qa(I)),V.setAttribute("tabindex","-1");let ee=document.createElement("div");ee.style.cssText="display:flex;justify-content:center;padding:10px 0 2px;flex:none;touch-action:none";let He=document.createElement("div");He.style.cssText="width:36px;height:4px;border-radius:999px;corner-shape:round;background:var(--dsw-alias-border-l2, rgba(127,127,127,.35))",ee.appendChild(He);let re=document.createElement("div");re.setAttribute("data-mobile-nav","file-preview-header"),re.style.cssText="display:flex;align-items:center;gap:8px;padding:6px 10px 10px 16px;border-bottom:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.2));flex:none";let je=document.createElement("div");je.style.cssText="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px";let $e=document.createElement("div");$e.style.cssText="display:flex;align-items:center;gap:6px;min-width:0";let Xt=document.createElement("span");Xt.style.cssText="display:inline-flex;flex:none;color:var(--dsw-alias-label-secondary, #9ca3af)",Xt.innerHTML=ad;let Xe=document.createElement("span");Xe.setAttribute("data-mobile-nav","file-preview-title"),Xe.textContent=qa(I),Xe.style.cssText="font-size:15px;font-weight:500;line-height:1.35;color:var(--dsw-alias-label-primary, #f3f4f6);overflow:hidden;text-overflow:ellipsis;white-space:nowrap";let Ne=document.createElement("span");Ne.setAttribute("data-mobile-nav","file-preview-size"),Ne.hidden=!0,Ne.style.cssText="flex:none;padding:2px 8px;border-radius:999px;corner-shape:round;font-size:11px;font-weight:500;line-height:1.3;background:var(--dsw-alias-bg-layer-2, rgba(127,127,127,.12));color:var(--dsw-alias-label-secondary, #9ca3af)",$e.append(Xt,Xe,Ne);let Ye=document.createElement("div");Ye.setAttribute("data-mobile-nav","file-preview-path"),Ye.textContent=I,Ye.style.cssText="font-size:12px;line-height:1.35;color:var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary, #9ca3af));overflow:hidden;text-overflow:ellipsis;white-space:nowrap",je.append($e,Ye);let lr=()=>i("filePreviewCopyAll","复制全文","Copy all"),te=document.createElement("button");te.type="button",te.setAttribute("data-mobile-nav","file-preview-copy"),te.disabled=!0,te.style.cssText='flex:none;display:inline-flex;align-items:center;justify-content:center;gap:5px;height:34px;min-width:44px;padding:0 12px;border-radius:var(--dsw-radius-md, 12px);border:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.24));background:var(--dsw-alias-bg-layer-2, rgba(127,127,127,.1));color:var(--dsw-alias-label-primary, #f3f4f6);font:500 12.5px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;cursor:pointer;-webkit-tap-highlight-color:transparent';let ja=()=>{te.innerHTML=ed;let z=document.createElement("span");z.textContent=lr(),te.appendChild(z)};ja(),te.addEventListener("click",async()=>{if(!U)return;if(Y>nr){m(r("fileTooLarge",{size:(Y/(1024*1024)).toFixed(1)},"文件过大（{size}MB），已跳过复制","File too large ({size}MB), copy skipped"));return}te.disabled=!0;let z=await rr(ne);if(!(a||y!==V))if(te.disabled=!1,z){let q=Math.max(1,Math.round(Y/1024));te.textContent=i("filePreviewCopiedShort","✓ 已复制","✓ Copied"),m(r("fileCopyDone",{kb:q},"已复制文件内容（{kb} KB）","File content copied ({kb} KB)")),window.setTimeout(()=>{y===V&&te.isConnected&&ja()},1600)}else m(i("fileCopyFailedFallback","复制失败，下方可长按选择","Copy failed — long-press below to select instead")),T(ne)});let ve=document.createElement("button");ve.type="button",ve.setAttribute("data-mobile-nav","file-preview-close"),ve.setAttribute("aria-label",i("fileFallbackClose","关闭","Close")),ve.innerHTML=td,ve.style.cssText="flex:none;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;min-width:44px;min-height:44px;padding:0;border:0;border-radius:50%;corner-shape:round;background:transparent;color:var(--dsw-alias-label-secondary, #9ca3af);cursor:pointer;-webkit-tap-highlight-color:transparent",ve.addEventListener("click",()=>{f(!1)}),re.append(je,te,ve);let Ze=null,$a=z=>{z.target?.closest("button")===null&&(Ze=z.clientY)},Xa=z=>{if(Ze!==null&&z.clientY-Ze>56){Ze=null,f(!1);return}Ze=null};ee.addEventListener("pointerdown",$a),ee.addEventListener("pointerup",Xa),re.addEventListener("pointerdown",$a),re.addEventListener("pointerup",Xa);let se=document.createElement("div");se.setAttribute("data-mobile-nav","file-preview-body"),se.style.cssText="flex:1;min-height:180px;overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;position:relative";let ft=document.createElement("div");ft.setAttribute("data-mobile-nav","file-preview-loading"),ft.style.cssText="display:flex;flex-direction:column;gap:10px;padding:18px 16px";for(let z of["62%","88%","76%","54%","82%","45%"]){let q=document.createElement("div");q.setAttribute("data-mobile-nav","file-preview-skeleton-line"),q.style.width=z,ft.appendChild(q)}se.appendChild(ft),V.append(ee,re,se),document.body.append(ie,V),g=ie,y=V,x=z=>{z.target===V&&f(!1)},document.addEventListener(we,x),u=z=>{if(y!==V||!V.isConnected)return;if(z.key==="Escape"&&!z.defaultPrevented){xt()&&z.preventDefault();return}if(z.key!=="Tab")return;let q=Array.from(V.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"])'));if(q.length===0)return;let ce=q[0],le=q[q.length-1],pe=document.activeElement;z.shiftKey&&(pe===ce||!V.contains(pe))?(z.preventDefault(),le.focus({preventScroll:!0})):!z.shiftKey&&(pe===le||!V.contains(pe))&&(z.preventDefault(),ce.focus({preventScroll:!0}))},document.addEventListener("keydown",u),d===null&&(d=()=>{if(E){C(),y===null&&d!==null&&(window.removeEventListener("popstate",d),d=null);return}y!==null&&f(!0)},window.addEventListener("popstate",d));try{ve.focus({preventScroll:!0})}catch{}let Yt=z=>{se.textContent="";let q=document.createElement("div");q.setAttribute("data-mobile-nav","file-preview-error"),q.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:32px 20px;text-align:center";let ce=document.createElement("div");ce.style.cssText="color:var(--dsw-alias-state-error-primary, #ef4444);display:inline-flex",ce.innerHTML=od;let le=document.createElement("div");le.textContent=z,le.style.cssText="font-size:13.5px;line-height:1.5;color:var(--dsw-alias-label-secondary, #cbd5e1);max-width:340px;word-break:break-word",q.append(ce,le),se.appendChild(q)};Promise.resolve().then(()=>e(I)).then(z=>{if(a||J!==p||y!==V)return;if(!z?.ok||!z.value){Yt(z?.error?.message||i("filePreviewError","无法读取该文件","Unable to read this file"));return}let q=z.value.content??"",ce=z.value.path||I,le=typeof z.value.size=="number"?z.value.size:q.length;Ye.textContent=ce,Xe.textContent=qa(ce);let pe=Va(le);if(pe&&(Ne.textContent=pe,Ne.hidden=!1),q.includes("\0")){Yt(i("filePreviewBinary","二进制文件暂不支持文本预览","Binary files cannot be previewed as text"));return}ne=q,Y=le,U=!0,te.disabled=!1,se.textContent="";let{text:Ya,truncated:dr}=nd(q,Wa);if(dr||le>Wa){let he=document.createElement("div");he.setAttribute("data-mobile-nav","file-preview-truncated"),he.textContent=i("filePreviewTruncatedNotice",`文件较大（${pe||Va(q.length)}），仅展示前 128 KB；点击右上角「复制全文」可复制完整内容`,`Large file (${pe||Va(q.length)}) — showing first 128 KB; tap "Copy all" for full content`),he.style.cssText="padding:8px 16px;font-size:12px;line-height:1.45;background:var(--dsw-alias-bg-layer-2, rgba(127,127,127,.1));color:var(--dsw-alias-label-secondary, #9ca3af);border-bottom:0.5px solid var(--dsw-alias-border-l3, rgba(127,127,127,.18))",se.appendChild(he)}if(q.length===0){let he=document.createElement("div");he.setAttribute("data-mobile-nav","file-preview-empty"),he.textContent=i("filePreviewEmpty","（空文件）","(Empty file)"),he.style.cssText="padding:28px 16px;text-align:center;font-size:13px;color:var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary, #9ca3af))",se.appendChild(he);return}let Zt=document.createElement("div");Zt.style.cssText="display:flex;align-items:stretch;min-width:max-content;font-family:var(--dsh-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);font-size:12.5px;line-height:1.6;tab-size:2";let Qe=document.createElement("pre");Qe.setAttribute("data-mobile-nav","file-preview-gutter"),Qe.setAttribute("aria-hidden","true"),Qe.textContent=id(Ya),Qe.style.cssText="margin:0;padding:12px 10px 16px 14px;text-align:right;user-select:none;-webkit-user-select:none;white-space:pre;font:inherit;line-height:inherit;color:var(--dsw-alias-label-tertiary, rgba(127,127,127,.6));border-right:0.5px solid var(--dsw-alias-border-l4, rgba(127,127,127,.15));flex:none";let bt=document.createElement("pre");bt.setAttribute("data-mobile-nav","file-preview-code"),bt.textContent=Ya,bt.style.cssText="margin:0;padding:12px 16px 16px 12px;flex:1;white-space:pre;user-select:text;-webkit-user-select:text;font:inherit;line-height:inherit;color:var(--dsw-alias-label-primary, #f3f4f6)",Zt.append(Qe,bt),se.appendChild(Zt)},z=>{a||J!==p||y!==V||Yt(z instanceof Error?z.message:i("filePreviewError","无法读取该文件","Unable to read this file"))})},_=O=>{let N=O.target;if(N===null)return;let I=N.closest("button, a");if(I===null||I.hasAttribute("data-mobile-nav")||I.closest("[data-mobile-nav]")!==null||I.closest("[data-phase]")===null||I.closest(or)!==null)return;let B=(I.textContent??"").trim();Ka(B)&&(O.preventDefault(),O.stopImmediatePropagation(),s()?k(B,I):m(i("fileGuardMsg","手机上无法直接打开电脑上的文件","Cannot open a file stored on your computer directly from the phone")))};document.addEventListener("click",_,!0);let L=0,M=()=>{document.querySelectorAll('[data-mobile-nav="copy-file"]').forEach(O=>O.remove()),document.querySelectorAll('[data-mobile-nav-copy="1"]').forEach(O=>{O.removeAttribute("data-mobile-nav-copy"),O.removeAttribute("data-mobile-nav-copy-id")})},S=(O=document)=>{if(!l())return;let N=O.querySelectorAll("button, a");(O instanceof Element&&O.matches("button, a")?[O,...N]:N).forEach(B=>{if(B.getAttribute("data-mobile-nav-copy")==="1"||B.hasAttribute("data-mobile-nav")||B.closest("[data-phase]")===null||B.closest(or)!==null)return;let J=(B.textContent??"").trim();if(!Ka(J))return;B.setAttribute("data-mobile-nav-copy","1");let ne=String(++L);B.setAttribute("data-mobile-nav-copy-id",ne);let Y=B.parentElement;if(Y!==null)for(let ie of Array.from(Y.querySelectorAll(':scope > [data-mobile-nav="copy-file"]')))ie.previousElementSibling?.getAttribute("data-mobile-nav-copy-id")!==ie.getAttribute("data-mobile-nav-copy-for")&&ie.remove();let U=document.createElement("button");U.type="button",U.setAttribute("data-mobile-nav","copy-file"),U.setAttribute("data-mobile-nav-copy-for",ne),U.textContent=i("fileCopy","复制","Copy"),U.addEventListener("click",async ie=>{ie.preventDefault(),ie.stopPropagation();let V=(B.textContent??"").trim().replace(/^file:\/\//i,"");U.disabled=!0,U.textContent="…";try{let ee=await e(V);if(a)return;if(!ee?.ok){m(ee?.error?.message??i("fileCopyFailed","复制失败","Copy failed"));return}let He=ee.value?.content??"",re=ee.value?.size??He.length;if(re>nr){m(r("fileTooLarge",{size:(re/(1024*1024)).toFixed(1)},"文件过大（{size}MB），已跳过复制","File too large ({size}MB), copy skipped"));return}let je=await rr(He);if(a)return;if(je){let $e=Math.max(1,Math.round(re/1024));m(r("fileCopyDone",{kb:$e},"已复制文件内容（{kb} KB）","File content copied ({kb} KB)"))}else m(i("fileCopyFailedFallback","复制失败，下方可长按选择","Copy failed — long-press below to select instead")),T(He)}catch(ee){a||m(ee instanceof Error?ee.message:i("fileCopyFailed","复制失败","Copy failed"))}finally{U.isConnected&&(U.disabled=!1,U.textContent=i("fileCopy","复制","Copy"))}}),B.parentElement?.insertBefore(U,B.nextSibling)})},R=new Map,P='[role="menuitem"],[role="option"],li,button,a',D=O=>{let N=(O.getAttribute("aria-label")||""||O.textContent||"").trim();if(Jl.includes(N)){let I=O;R.has(O)||R.set(O,I.style.display),I.style.display="none",O.setAttribute("data-mobile-nav-hide","add-workspace")}},Q=O=>{O instanceof Element&&O.matches(P)&&D(O),O.querySelectorAll(P).forEach(D)},K=()=>{l()?(f(!1),S(document)):M()};window.addEventListener(mt,K);let G=new Set,W=0,j=()=>{W=0;let O=l();for(let N of G)N.isConnected&&(O&&S(N),Q(N));G.clear();for(let N of R.keys())N.isConnected||R.delete(N)};l()&&S(document),Q(document);let Te=new MutationObserver(O=>{for(let N of O){if(N.type==="characterData"){let I=N.target.parentElement;I!==null&&I.childElementCount>0&&G.add(I);continue}N.addedNodes.forEach(I=>{I.nodeType===1?G.add(I):I.nodeType===3&&I.parentElement!==null&&G.add(I.parentElement)})}G.size>0&&W===0&&(W=requestAnimationFrame(j))});return Te.observe(document.body,{childList:!0,subtree:!0,characterData:!0}),()=>{a=!0,f(!1),C(),d!==null&&(window.removeEventListener("popstate",d),d=null),window.removeEventListener(mt,K),document.removeEventListener("click",_,!0),Te.disconnect(),W!==0&&cancelAnimationFrame(W),G.clear(),b!==null&&window.clearTimeout(b),c?.remove(),c=null,v?.remove(),v=null,M(),document.querySelectorAll('[data-mobile-nav-hide="add-workspace"]').forEach(O=>{let N=O,I=R.get(O);I!==void 0?N.style.display=I:N.style.removeProperty("display"),R.delete(O),O.removeAttribute("data-mobile-nav-hide")}),R.clear()}}function rd(e,t,o){try{let n=e.locale.bind(Na)(t);return typeof n=="string"&&n.length>0&&n!==t?n:o}catch{return o}}function sd(){try{if(typeof localStorage>"u")return"";let e=localStorage.getItem("dsh-mobile-nav-layout");return e==="desktop"||e==="mobile"?e:""}catch{return""}}function sr(e){let t=new URL(window.location.href).searchParams.get("dsh-layout"),o=t??"",a=o.trim().toLowerCase(),n=window.matchMedia(ue),i=qi(t)||sd(),r=Di({urlValue:o,stored:i,narrowMatch:n.matches});if(document.body?.setAttribute("data-dsh-pocket-layout",r),a==="desktop"||a!=="auto"&&a!=="mobile"&&i==="desktop")return;let l=a==="mobile"||a!=="auto"&&i==="mobile",c=l?{matches:!0,addEventListener:()=>{},removeEventListener:()=>{}}:n;l||e.effect(()=>{let v=()=>{document.body?.setAttribute("data-dsh-pocket-layout",n.matches?"mobile":"desktop")};return n.addEventListener("change",v),()=>{n.removeEventListener("change",v)}},"dsh-pocket: auto layout attribute sync on breakpoint change");let b=(v,T)=>{e.effect(()=>{let g,y=()=>{g?.(),g=c.matches?T():void 0};return y(),c.addEventListener?.("change",y),()=>{c.removeEventListener?.("change",y),g?.()}},v)};zi(e),Wi(e),Vi(e),Ki(b);let m=(v,T)=>rd(e,v,T);tr(e,b,m),ar(e,b,m),b("dsh-pocket: file preview sheet + workspace guard",()=>{let v=Ua(e),T=e.locale.bind(Na);return Ga(v,T)})}

    return module.exports;
  }
});
