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
var zr=Object.create;var yt=Object.defineProperty;var Dr=Object.getOwnPropertyDescriptor;var Br=Object.getOwnPropertyNames;var qr=Object.getPrototypeOf,Wr=Object.prototype.hasOwnProperty;var Vr=(e,t)=>{for(var a in t)yt(e,a,{get:t[a],enumerable:!0})},fn=(e,t,a,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Br(t))!Wr.call(e,o)&&o!==a&&yt(e,o,{get:()=>t[o],enumerable:!(n=Dr(t,o))||n.enumerable});return e};var ca=(e,t,a)=>(a=e!=null?zr(qr(e)):{},fn(t||!e||!e.__esModule?yt(a,"default",{value:e,enumerable:!0}):a,e)),jr=e=>fn(yt({},"__esModule",{value:!0}),e);var Hd={};Vr(Hd,{apply:()=>Id,inject:()=>Ld,name:()=>Ad,redactStatus:()=>wn});module.exports=jr(Hd);var y=require("react"),Cd=ca(require("@deepseek-ai/dsh-client-ui-primitives"),1);var Se="/dsh-pocket",tt="data-dsh-pocket-mobile-rightbar",at="dsh-pocket:mobile-rightbar",Be="data-dsh-pocket-pinch-zoom",nt="dsh-pocket:mobile-pinch-zoom",Ce="data-dsh-pocket-mobile-font",ot="dsh-pocket:mobile-font-size",Ae="--dsh-pocket-mobile-font-size";var G=Object.freeze({status:"pocket.status",tunnelStart:"tunnel.start",tunnelStop:"tunnel.stop",tunnelSetConfig:"tunnel.setConfig",version:"pocket.version",update:"pocket.update",restart:"pocket.restart",lanTokenRefresh:"token.lanRefresh",lanAuthSetEnabled:"lanAuth.setEnabled",lanSetOverride:"lan.setOverride",lanSetEnabled:"lan.setEnabled",mobileRightbarSetEnabled:"mobile.rightbar.setEnabled",mobilePinchZoomSetEnabled:"mobile.pinchZoom.setEnabled",mobileFontSetSize:"mobile.font.setSize",pinSetCustom:"pin.setCustom",pocketReset:"pocket.reset",fileRead:"pocket.fileRead"});function pa(e,t){let a=String(e).replace(/^[vV]/,"").split("."),n=String(t).replace(/^[vV]/,"").split(".");for(let f=0;f<3;f++){let s=parseInt(a[f],10)||0,d=parseInt(n[f],10)||0;if(s!==d)return s-d}let o=String(e).replace(/^[vV]/,"").match(/-.*$/)?.[0]??"",i=String(t).replace(/^[vV]/,"").match(/-.*$/)?.[0]??"";if(!o&&!i)return 0;if(!o)return 1;if(!i)return-1;let r=o.slice(1).split("."),l=i.slice(1).split("."),u=Math.max(r.length,l.length);for(let f=0;f<u;f++){let s=r[f]??"",d=l[f]??"";if(s===d)continue;let m=/^\d+$/.test(s),T=/^\d+$/.test(d);return m&&T?Number(s)-Number(d):m?-1:T?1:s<d?-1:1}return 0}function bn(e){return String(e??"").trim().toLowerCase().replace(/^git\+/,"").replace(/\/+$/,"").replace(/\.git$/,"")}function gn(e,t){let a=bn(e);return a!==""&&a===bn(t)}function wn(e){return{proxyRunning:e?.proxyRunning===!0,proxyPort:e?.proxyPort??null,lanUrl:e?.lanUrl??null,lanQr:e?.lanQr??null,lanCandidates:Array.isArray(e?.lanCandidates)?e.lanCandidates:[],lanIpOverride:e?.lanIpOverride??"",tunnelRunning:e?.tunnelRunning===!0,tunnelUrl:e?.tunnelUrl??null,tunnelQr:e?.tunnelQr??null,tunnelState:e?.tunnelState??{phase:"idle"},tunnelConfig:e?.tunnelConfig??{mode:"named",hostname:"",tokenSet:!1},dshPort:e?.dshPort??null}}var Et=require("react");var Ur=ca(require("@deepseek-ai/dsh-client-ui-primitives"),1),Gr=()=>null,ha=e=>{let t=Ur;for(let a of e){let n=t[a];if(n!==void 0)return n}return Gr},vn=ha(["IconPaperclipOutlineRegular","IconPaperclipOutline16"]),xn=ha(["IconPanelLeftOutlineRegular","IconPanelLeftOutline16"]),yn=ha(["IconFolderOpenOutlineRegular","IconFolderOpenOutline16"]);function ua(){return document.querySelector("[data-shell-overlay]")?.parentElement??null}var kn=null;function D(){let e=kn;if(e!==null&&e.isConnected&&e.getAttribute("data-mobile-nav")==="frame")return e;let a=document.querySelector('[data-mobile-nav="frame"]')??ua();return kn=a,a}var Kr="[data-sidebar-right-expand]",$r="[data-sidebar-right-toggle]";function kt(e=document,t=D()){let a=e.querySelector($r),n=e.querySelector(Kr),o=typeof n?.click=="function"?n:a;return typeof o?.click=="function"?(o.click(),!0):(t===null||(t.removeAttribute("data-aionui-preview-open"),t.setAttribute("data-aionui-explorer-open","")),!1)}function En({toggleSidebar:e,t}){let a=()=>{kt()},[n,o]=(0,Et.useState)(!1);return(0,Et.useEffect)(()=>{let i=()=>{let f=D();return f!==null&&!f.hasAttribute("data-sidebar-collapsed")};o(i());let r=0,l=()=>{r===0&&(r=requestAnimationFrame(()=>{r=0,o(i())}))},u=new MutationObserver(f=>{for(let s of f){if(s.type==="attributes"){if(s.attributeName==="data-sidebar-collapsed"){l();return}continue}let d=[...s.addedNodes,...s.removedNodes];if(d.length===0||!d.every(m=>m.nodeType===Node.TEXT_NODE)){l();return}}});return u.observe(document.documentElement,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["data-sidebar-collapsed"]}),()=>{r!==0&&cancelAnimationFrame(r),u.disconnect()}},[]),React.createElement(React.Fragment,null,React.createElement("button",{type:"button","data-mobile-nav":"toggle","aria-label":t(n?"close":"open"),"aria-expanded":n,title:t(n?"close":"open"),onClick:()=>e()},React.createElement(xn,{size:16})),React.createElement("button",{type:"button","data-mobile-nav":"files","aria-label":t("files"),title:t("files"),onClick:a},React.createElement(yn,{size:16})))}function Tn({useInput:e,useSession:t,t:a}){let n=e(r=>r.phase!=="plain"),o=t(r=>r.subagent!==null),i=n||o;return React.createElement("button",{type:"button","data-mobile-nav":"file-upload","aria-label":a("fileUpload"),title:a("fileUpload"),disabled:i},React.createElement(vn,{size:16}))}var _n=`
/* ---------- base control styles (rendered at any width, hidden where unused) ---------- */

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
  /* 44px 触控热区（2026-10-25 owner 指定）：盒子保持 28×28（观感与顶栏行高不变），
     命中区由下面的透明 ::after 外扩 8px 拿到 44×44。锚点必须是按钮自己，所以这里
     补 position:relative。 */
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
/* 悬停反馈只给真有指针的设备：手机上没有 hover，Chromium 会把点击后的 :hover
   粘住，图标一直是一块灰底 —— 这就是「粘滞 hover」。按下反馈由 :active 单独承担，
   触屏观感不变。 */
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
/* 顶栏两端各一颗，中间隔着标题，不与任何控件相邻，可以对称外扩。 */
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

/* Drawer brand-row session-log icon (issue #225): the plugin-owned button is
   injected into the host's logo row by effects/drawer-session-log.ts, so it
   sizes as a compact icon control instead of the old footer pill. The host
   brand button is flex:1 and gives up exactly this width. The wrapper keeps the
   button out of the row's direct-button set: the third-party dsh-web-all layer
   adopts that row's last direct button as its sidebar toggle (see
   effects/drawer-session-log.ts#mount). */
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
  /* ::after 的锚点；28 + 8*2 纵向、+6*2 横向 = 44 高 / 40 宽命中盒（品牌按钮在左）。 */
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
/* 44px 热区：品牌行右端，左侧是宿主品牌按钮（flex:1，占满整行），所以横向只外扩
   6px（40 宽），纵向外扩 8px（44 高）；再宽就会从品牌按钮的右端抢走可点区域。 */
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
/* 菜单开着时触发器保持按下底（owner 2026-10-25：「点它弹面板时没有灰，反而是关闭
   那一下闪一层灰，顺序像反了」）。根因是 portal 菜单一挂载就把指针从按钮上接走，
   :active 立刻结束 ⇒ 开面板那一下的按下底几乎看不见；关闭那次点击时菜单已经不在了，
   :active 反而完整走完。用 aria-expanded 把「开着」表达成持久的按下态：开面板即
   有反馈、关掉即撤掉，与宿主菜单触发器的既有形态一致（选中态而不是悬停态）。 */
[data-mobile-nav="session-log"][aria-expanded="true"]:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
}
[data-mobile-nav="session-log"]:disabled {
  color: var(--dsw-alias-label-dimmed, rgba(0, 0, 0, .35));
  cursor: default;
  background: transparent;
}

/* Drawer quick-settings icon (2026-10-20): the host merged the settings entry
   into the account launcher (the settings.launcher slot), so opening settings on
   a phone costs two taps — the footer account row, then the menu's first item.
   effects/drawer-quick-settings.ts injects this gear at the right end of that
   same row and replays that path in one tap. The wrapper mirrors the brand-row
   icon so no row heuristic adopts the node as the host's own control. */
[data-mobile-nav="quick-settings-wrap"] {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  /* 2026-10-21 用户「UI应该再向左调整一下」：行宽是 calc(100% + 4px)、左右各外扩 2px，
     账户 launcher 内边距 6px —— 让齿轮右缘对齐那颗按钮的内容右缘（column − 4px）。 */
  margin-right: 6px;
}
[data-mobile-nav="quick-settings"] {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* 2026-10-21 用户「UI太小了!」：28 → 36（图标 16 → 20），仍在 44px 行内居中。
     2026-10-22 用户「还是太大了」：36 → 30（图标 20 → 17，同比例）。 */
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: var(--dsw-radius-md, 8px);
  background: transparent;
  color: var(--dsw-alias-label-secondary, inherit);
  cursor: pointer;
  /* 30 + 7*2 = 44 命中盒；账户 launcher 在左，只吃 7px。 */
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
/* 44px 热区：30×30 的盒子外扩 7px；左侧是账户 launcher（整行大按钮），只吃 7px。 */
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

/* @patch
   id: drawer-quick-settings-chip-guard
   for: dsh-client-ui-primitives 的 ConnectionIndicator（connecting/disconnected 渲染 button[data-phase]，recovered 渲染 div[role="status"]）与账户 launcher 同处 settingsArea 的 triggerRow
   why: 该行只有 260px；连接条 flex:none（中文约 136px、英文约 190px），齿轮常驻会在英文下把账户按钮挤到约 26px、头像被裁
   until: 宿主给该行提供独立的次要动作位，或连接条不再占用行宽——届时删本块
   test: tests/drawer-quick-settings.test.ts
*/
[data-mobile-nav="frame"] [class*="sidebarCol"] [class*="triggerRow"]:has(> button[data-phase], > [role="status"]) [data-mobile-nav="quick-settings-wrap"] {
  display: none !important;
}

/* @patch
   id: drawer-quick-settings-menu-entry
   for: dsh-client-ui-settings-account 的 AccountMenu items 数组（settings / contact / signout|signin）与 dsh-client-ui-primitives 的 Menu 列表结构（role=menu > div[role=presentation] > div > button[role=menuitem]）
   why: 2026-10-21 用户要求「把原来的打开方式进行删除，只保留这个」——齿轮已是设置入口，账户菜单里同一项成了重复路径；宿主源码不可改，只能由 effects/drawer-quick-settings.ts 在菜单节点上打标记、这里收起第一项
   until: 宿主给 settings.launcher 提供独立动作位，或账户菜单自己把设置项拆出去——届时删本块
   test: tests/drawer-quick-settings.test.ts
*/
[data-mobile-nav-quick-menu] > [role="presentation"] > :first-child > [role="menuitem"] {
  display: none !important;
}

/* Same click chain, flash guard: the gear opens the host account menu and picks
   its first item in the following frame. While the marker sits on <html> that
   intermediate menu stays unpainted (a JS click does not need visibility); the
   task removes the marker once the chain settles. */
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

/* Centered frosted-glass modal for the delete confirm / error card: the
   backdrop is a flex positioning container (centering + 16px inset padding)
   and the card rides inside it as a static child (session-menu.ts appends
   the card INTO the backdrop for exactly this reason). Look baseline = the
   host ⋯ menu's portal root, measured 2026-09-24: translucent
   rgba(248,249,250,.58) fill with blur(40px) saturate(1.5) frosted glass,
   16px radius, hairline + soft shadow. Geometry baseline = the host Dialog,
   measured the same day: centered modal, 16px/500 title, 36px pill buttons,
   solid-fill primary. [hidden] keeps the error line out of layout until a
   failure lands. */
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

/* ---------- composer file picker (effects/composer-file-picker.ts) ----------
   手机档回形针入口的两选项浮层（上传图片 / 上传附件）。宿主在 0.1.6 删掉了自带的
   附件按钮，只剩 composer 里一个隐藏 input，直接点它只会弹系统文件选择器 ——
   形态不可控、也没有「只挑图片」这条路（2026-10-06 报障）。
   形态（同日店主反馈「这个 UI 太丑了，缩小点，不要从底部弹出」）：**贴锚点的小浮层**，
   不是整宽底部弹层 —— 宽度贴着内容（「width: max-content」，上限 min(78vw, 240px)），行高 34px、
   行间距 0（2026-10-07 店主：「之间的距离更紧致一点」+「右边的留白有点多了，往左边缩点」），字号 14px。
   定位用「position: fixed」，top/left 由 JS 按回形针 rect 算（上方优先，夹进视口 8px
   内边距，且**视口一变就重算** —— 键盘收起把整体下移一个键盘高时浮层必须跟着锚点走，
   否则会停在会话中部，2026-10-07 真机报障），所以这里只写盒子、不写定位与整宽。
   没有「取消」行：点浮层外或按返回键关闭（外层透明遮罩只负责收点击）。
   挂 document.body（与上面的 delete-dialog 同一取舍：挂在 frame 里会被第三方
   dismiss shim 的捕获链吞点击），z 在移动档块里抬到 1400。 */
[data-mobile-nav="file-picker-backdrop"] {
  position: fixed;
  inset: 0;
  z-index: 55;
  background: transparent;
}
[data-mobile-nav="file-picker"] {
  position: fixed;
  box-sizing: border-box;
  /* 宽度贴着内容（2026-10-07 店主：「右边的留白有点多了，往左边缩点」）：
     两行都是「图标 + 两字标签」，固定 168px 起步会在右侧留一大块空白。 */
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

/* ---------- popover band above the open drawer (mobile only) ----------
   The host portals its menus to <body> as position: fixed with z-index 1100,
   while the drawer column carries 1300 and our backdrop 1250. A menu opened
   from inside the drawer therefore painted UNDER both: measured 2026-09-14 at
   390px on the session row's ⋯ menu — menu rect [160,454,218,168] z1100, and
   elementFromPoint at its centre AND at both of its ends returned drawer
   elements, so the whole menu was unreachable and the row could not be
   renamed/forked/archived/deleted from the phone (the second half of the
   owner's report: the popup the ⋯ opens is pressed under the drawer).
   The raise is gated on the open drawer: our backdrop makes that the only
   state in which a menu can be opened from the drawer, so the closed-drawer
   and desktop stacks keep the host's own ordering.
   The plugin's own confirm card sits in the same band: it mounts on
   document.body (NOT in the frame — see session-menu.ts, which appends the
   backdrop and the card there so the third-party dismiss shim's capture-phase
   click chain cannot swallow its buttons) and carried the base z 55/56, so the
   drawer covered its left 272px (measured: elementFromPoint inside that band hit
   the drawer's own button, and the confirm card is 358px wide starting at x=8). */
@media (max-width: 1023px) and (pointer: coarse) {
  body:has([data-mobile-nav="frame"]:not([data-sidebar-collapsed])) [role="menu"] {
    z-index: 1400 !important;
  }
  /* Host modal dialogs (workspace rename, and any future dialog of the same
     shape) portal to a direct body child that carries the stacking context:
     body > div { position: fixed; z-index: 1000 } wrapping
     [role="dialog"][aria-modal="true"] (inner z-index: 1 — raising the dialog
     itself is useless, it only sorts inside that root).
     NOTE (2026-09-23): the hashes once recorded here (_root_w1urq_2 /
     _dialog_w1urq_22) are gone from both 0.1.7-alpha.1 and alpha.2, so this
     comment anchors on the SHAPE only — which is what the rule below already
     matches. Do not reintroduce a hash here without re-measuring.
     Measured 2026-09-19: with the drawer open (column z 1300) the workspace
     Rename dialog sat entirely under it and needed the drawer closed first.
     Raise the portal root, not the dialog.
     GATE (2026-09-25, real device): the gate is OUR BACKDROP'S PRESENCE, not
     the drawer-open marker. Marker and paint disagree for the whole close
     transition — the backdrop fades over .2s and is removed 260ms after the
     marker flips (overlay-backdrop-fab.ts), the column transitions .28s
     (layout.css.ts) and React swaps the pane subtree ~200ms late — so a
     marker-gated raise went dark inside that window and the drawer band
     covered any open modal. Measured on the reporter's phone (Android 16
     WebView) with the shortcut modal open: forcing data-sidebar-collapsed
     dropped this root 1400 -> 1000 and made elementsFromPoint(0.85w, .30h)
     return [data-mobile-nav="backdrop"] — rgba(0,0,0,.45) over the modal's
     white = luminance 141, matching the reporter's recording (140 behind a
     280px drawer edge). That is the "快捷键弹层抽搐/闪" report: a ~200-280ms
     dark frame with the drawer over the shortcut modal, not a compositing
     tear. The backdrop's presence IS the drawing condition, so gating on it
     has no such window; with no backdrop the host's own ordering stands (a
     menu opened inside a modal still sorts above it). Our own delete backdrop
     matches this rule too since the 2026-09-24 centered rework (its direct
     child card carries role=dialog) — harmlessly: it sets the same 1400 the
     dedicated rule below sets. */
  body:has([data-mobile-nav="backdrop"])
    > div:has(> [role="dialog"][aria-modal="true"]) {
    z-index: 1400 !important;
  }
  [data-mobile-nav="delete-dialog-backdrop"] {
    z-index: 1400 !important;
  }
  /* 同一个带里：回形针弹层也要压过抽屉（z 1300）与抽屉遮罩（1250）。 */
  [data-mobile-nav="file-picker-backdrop"] {
    z-index: 1400 !important;
  }
  [data-mobile-nav="delete-dialog"] {
    z-index: 1401 !important;
  }
  /* dsh-usage-stats portals its panel to <body> as position: fixed with
     z-index 100 (desktop-designed; the drawer does not exist there). With our
     drawer open (column z 1300) the「用量/余额」panel sat under it: measured
     2026-09-20 at 390px — panel rect [12,91,366,625] z100 vs drawer 280px wide
     z1300, and elementFromPoint at the panel's centre AND its left corners
     returned drawer elements, so only a ~98px strip on the right stayed
     reachable. The plugin also unmounts the panel when the drawer closes
     (Escape-linked dismissal) and the badge only renders in the open drawer,
     so the open-drawer gate covers the panel's only reachable state; the
     closed-drawer and desktop stacks keep the plugin's own ordering. */
  body:has([data-mobile-nav="frame"]:not([data-sidebar-collapsed]))
    [data-usage-stats-panel] {
    z-index: 1400 !important;
  }
  /* AppFrame overlayLayer band — the class self-fix of our own layering
     contract (NOT a per-plugin adaptation): plugin and host sheets portal
     INTO the AppFrame overlay layer (position: absolute; z-index 20 — its
     own stacking context), so no z-index on a sheet itself can out-rank the
     drawer column's 1300 in the root context, and every sheet opened from
     the drawer landed behind it. Measured 2026-09-22 at 390px with the
     drawer open: a probe sheet inside the layer stayed hit-blocked by
     drawer elements at z auto AND z 9999 alike, and only raising the layer
     ROOT revealed it (elementFromPoint). Raise the stacking root, not the
     children — the same shape as the dialog portal-root raise above. The
     body-ported bands keep their own raises (menus 1100, dialog root 1000,
     usage-stats panel 100): each is a per-surface adaptation patch for a
     portal OUTSIDE this layer. Closed-drawer and desktop stacks keep the
     host's own ordering. */
  body:has([data-mobile-nav="frame"]:not([data-sidebar-collapsed]))
    [class*="_overlayLayer"] {
    z-index: 1400 !important;
  }
  /* 0.1.7 fullscreen sidebar panels (the sidebar terminal / files / preview /
     browser tabs) state the dockkit cell at z 40 — the host sets
     --dsh-dockkit-dock-layer: 40 on .panel[data-sidebar-right-panel=fullscreen]
     — which outranks the
     host's own overlay layer (20) and our FAB (21). Measured 2026-09-23 at
     390px with the terminal panel open: elementFromPoint at the FAB's centre
     returned a panel child, and a real tap on it left the drawer closed — the
     phone lost its only way back to navigation (the FAB is the screen's only
     control once a panel owns the main area, see overlay-backdrop-fab.ts).
     Raise OUR two surfaces for that state, the same "raise the root, not the
     children" shape as above; the FAB stays in the below-the-drawer band (55)
     so an open drawer keeps covering it. Gate on the open attribute: the
     presentation attribute alone survives a closed panel. Closed-panel,
     docked-panel (dock layer 10) and desktop stacks keep the host's order. */
  body:has([data-sidebar-right-open][data-sidebar-right-panel="fullscreen"]) [data-mobile-nav="fab"] {
    z-index: 55 !important;
  }
  body:has([data-sidebar-right-open][data-sidebar-right-panel="fullscreen"])
    [class*="_overlayLayer"] {
    z-index: 1400 !important;
  }
}

/* ---------- touch press feedback (mobile + hover: none only) ----------
   Android WebView paints its own translucent blue tap highlight
   (-webkit-tap-highlight-color default) over every tapped control. The
   property is inherited and no host package sets it on descendants (grep of
   dsh-client-ui-* bundles, 2026-10), so transparent on html/body clears it
   page-wide; the explicit transparent values on our own controls above stay
   as the desktop-width fallback. In its place the UI gives its own pressed
   state: an inset box-shadow tint (paint-only, no layout, does not fight a
   host background) in the host's interactive-bg-active colour, which the
   theme defines for both light and dark. Every selector sits in :where(), so
   (0,0,0) loses to any host or plugin rule that styles the element itself —
   aria-selected / aria-pressed / own :active states keep their look — and
   :focus-visible outlines are untouched. Desktop and narrow mouse windows
   never enter this block (MOBILE_QUERY + hover: none). */
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
    /* Icon-only buttons (a lone svg child, or a button that carries only an
       aria-label) also shrink a touch. */
    :where(button:has(> svg:only-child), button[aria-label]:not(:has(> span, > div))):where(:active):where(:not(:disabled, [aria-disabled="true"])) {
      transform: scale(.96);
    }
    /* 例外（2026-10-20，店主）：头部那两颗芯片不要按压反馈。
       症状：点「智能体团队」图标开面板、再点它关闭时，图标周围闪一块浅灰
       （:active 的 inset 填充 + 图标缩到 .96）；「子智能体 / N 个子代理」芯片同样。
       为什么要去掉：这两颗**开启态本来就有宿主自己的反馈** —— 团队图标打开时变粗，
       子智能体芯片右侧有 chevron；按压灰圈和它们说的是同一件事，等于两份反馈叠在
       一起，功能重复。加上两颗平时没有底色，整块浮灰在浅色壁纸上像一块脏。所以
       只给它们清掉，其它按钮（抽屉行、菜单项、标签页、回形针等）的按压反馈原样保留。
       两个标记都是宿主稳定的 data-*（不是哈希类）；宿主换标记时本块惰性失效，
       届时按新标记改选择器即可，不必连带改上面两条通用规则。 */
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

/* Floating fallback button (hero / blank phases without a session header).
   Top aligns with the session header's toggle row (that row sits 12px below
   the frame's safe-area padding); when the client has set viewport-fit=cover
   the safe-area inset moves it below the notch too. */
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
/* 44px 热区：38×38 的悬浮球外扩 3px。 */
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

/* Dimmed backdrop under the open drawer; above every column, below the drawer.
   z 1250: 0.1.5 pins its native sidebarCol at z-index:1100 and paints mid
   layers up to that band; the backdrop must sit above the host stack
   (below the drawer's 1300) so the dim covers the content area on every
   host generation. Keep in sync with the drawer z in layout.css.ts. */
[data-mobile-nav="backdrop"] {
  position: absolute;
  inset: 0;
  z-index: 1250;
  background: rgba(0, 0, 0, .45);
  cursor: pointer;
  animation: dsh-web-mobile-fade .2s var(--ds-ease-in-out, ease-in-out);
  /* Fade-out twin of the mount animation: the task eases the dimming away
     (inline opacity 0 + pointer-events none) and removes the element after
     the fade. Also used by the gesture layer so the backdrop fades in step
     with a close-follow commit's slide-out. */
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
/* Settings sheet entrance: the official dialog mounts with no animation at
   all, so it snaps in. A slight rise/scale reads as a proper sheet.
   No opacity arm (issue #124, 2026-09-25): checker scene 4 screencast caught
   the fade double-exposing the still-open drawer underneath the panel
   (frame a005) — sliding in fully opaque keeps the motion, drops the bleed. */
@keyframes dsh-web-mobile-sheet-in {
  from {
    transform: translateY(14px) scale(.98);
  }
  to {
    transform: none;
  }
}
/* Preview sheet rise: the aionui preview column opens as a bottom sheet. */
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

`;var Sn=`/* ---------- mobile-only layout (narrow viewport AND touch-primary pointer) ---------- */

@media (max-width: 1023px) and (pointer: coarse) {
  /* --- Phone chrome ---
     The system status bar stays visible (no fullscreen). Three adjustments
     make it behave:
     - touch-action: pan-y pinch-zoom kills double-tap-to-zoom (and the 300ms
       tap delay) while keeping vertical pan. Omitting pan-x (i.e. not using
       the manipulation alias) forbids HORIZONTAL pan on the root: a
       left-edge horizontal drag would otherwise be claimed by the browser as
       a pan (firing pointercancel) before the sidebar swipe layer can
       classify it. touch-action does not inherit and the behavior
       intersection stops at the first scroll container, so only touches
       landing directly on the root background are affected — inner
       horizontal scrolling of content containers is untouched. pinch-zoom is
       listed on purpose (#45): a bare pan-y also drops pinch, and then a
       zoom the browser applied by itself — iOS enlarges the viewport when a
       field under 16px takes focus — can no longer be undone by the user,
       so the app stays magnified until it is reopened or rotated. Two-finger
       zoom is also the WCAG 1.4.4 escape hatch and costs the gesture layer
       nothing: pinch is not a horizontal pan.
     - overscroll-behavior-x: none suppresses the browser's edge history
       navigation on the root scroller — Android Chrome claims a horizontal
       stroke that STARTS within its edge band (EDGE_WIDTH_DP=48dp,
       NavigationHandler.java) and navigates BACK, the exact gesture that
       opens the drawer ("页面直接返回上一页", 2026-08-29 user report). Only
       html/body count for this (Chromium issue 41483088: inner containers
       are ignored by the navigation path). iOS Safari's edge back-swipe has
       no CSS opt-out (WebKit bug 240183) — there the widened gesture start
       zone (START_ZONE_RATIO 0.45 of the viewport width, ~176px at 390px,
       past every browser's edge-claim strip) is the mitigation.
     - With the client's viewport-fit=cover, env(safe-area-inset-top) is the
       status bar / notch height; the rules below push the app content below
       it so the status bar never covers anything. Off notched phones (or in
       a normal browser tab where the layout viewport already sits below the
       status bar) the inset is 0 and nothing shifts. */
  html,
  body {
    touch-action: pan-y pinch-zoom !important;
    overscroll-behavior-x: none !important;
    /* iOS 竖屏防文字自动放大（pocket 补丁）：Safari 在窄视口会自行放大
       ≥阈值字号的文本，输入与消息排版被破坏；两行同值，前缀行给老引擎。 */
    -webkit-text-size-adjust: 100% !important;
    text-size-adjust: 100% !important;
  }

  /* AppFrame: the drawer takes the sidebar column out of grid flow, so the
     remaining in-flow items (center, details) land in tracks 1..2: give the
     center every pixel and keep the details track at zero. The top padding
     clears the status bar / notch for every in-flow surface (session header,
     messages, composer); the absolutely-positioned drawer is unaffected (its
     containing block is the frame's padding box, i.e. still the frame top).
     box-sizing MUST be border-box: the official frame is height:100% of a
     100%-height body, and it is content-box by default, so the safe-area
     padding is ADDED on top of the full viewport height. The frame then grows
     to 100% + inset, the document itself becomes scrollable by exactly the
     inset, and the sticky composer seat (bottom:0 of the scroll body) lands
     below the visual viewport. Symptoms on a notched phone: the whole UI can
     be swiped up, the composer lifts off the bottom leaving a blank strip,
     and the newest message sits under the composer because the host's
     at-bottom follow scrolls its own scroll body, not the document. With
     border-box the padding is taken out of the 100% height instead, so the
     frame is exactly one viewport tall and the document never scrolls.

     The leading html element selector is load-bearing, not decoration: the
     third-party @linxin666/dsh-web-all sheet ships an equal-specificity
     !important grid-template-columns for this same element under
     (max-width: 768px), so without the extra element the winner is decided by
     which sheet happens to be injected later. Measured before and after with
     scripts/probes/cascade-conflict-probe.mjs: no computed value moves, the
     rule only stops depending on sheet order (audit D-5 option A). */
  /* ---------- the shell is exactly the VISIBLE band, and the document cannot
     scroll (2026-10-31) ----------
     Field dump, 402x684 iPhone with the keyboard up:

       META     vv=402x345@325  inner=402x359  scrollY=325  doc=402x684
       FRAME    [0,-325 402x684]

     The frame is still the full 684 while the visible band is 345 tall, so the
     document is scrollable by exactly the keyboard height — and something in the
     host scrolls it to that maximum (the Lexical caret helper's window.scrollBy
     is the known caller, issue #149). Once the document has scrolled 325px, the
     whole frame — composer included — sits 325px above the band. That is the
     real cause of 「输入框缩下去 / 跳下去」; every compensation applied downstream
     of it (transform, container height) was fighting the symptom, and the
     engine's numbers only looked self-inconsistent because the page had been
     scrolled underneath us.

     Fix at the source: size the shell to the visible band and take the document
     out of the scrolling business entirely. 「--dsha-mobile-visible-vh」 is
     maintained live by viewport-meta (min of innerHeight and the visual viewport height),
     so this follows the keyboard without any per-engine arithmetic; the app's own
     containers keep their scrolling. */
  /* overflow: hidden only stops the USER; the host's caret helper calls
     window.scrollBy, which still moves an overflow:hidden document. Field dump
     2026-10-31 11:44:50 (keyboard up): scrollY=92 with the shell at -92 while the
     visible band was [92, 437] — the shell's bottom edge sat at 253, so the lower
     184px of the band showed the page background under the composer. That is the
     owner's 「输入框被顶飞，看到底部的空白」. Locking the scroll from CSS via
     position: fixed on html broke the whole document paint on the owner's phone
     (2026-10-31 「炸了」), so the lock is done in JS instead — see
     effects/document-scroll-lock.ts. */
  html,
  body {
    height: 100% !important;
    overflow: hidden !important;
    overscroll-behavior: none !important;
    /* The shell now ends where the visible band ends, so while the keyboard is
       still animating there is a strip of body below it. Without this the strip
       is the browser's default white — read as "白屏" for the 1-2s the keyboard
       takes to rise. Paint it with the host's own page colour so the strip reads
       as the app, and the keyboard simply slides over it. */
    background: var(--dsw-alias-bg-base, #fff) !important;
  }
  html [data-mobile-nav="frame"] {
    box-sizing: border-box !important;
    position: relative !important;
    height: var(--dsha-mobile-visible-vh, 100%) !important;
    grid-template-columns: minmax(0, 1fr) 0 0 !important;
    padding-top: env(safe-area-inset-top, 0px) !important;
    /* Bottom safe area, symmetric with the top inset above. It MUST stay in
       this rule: box-sizing: border-box is the pair that makes the padding eat
       into the one-viewport height instead of adding scrollable overflow
       (pitfalls §safe-area — padding without border-box pushes the composer
       seat below the fold).
       Why we have to own it: the third-party @linxin666 sheet (the same one
       the grid-template-columns note above is about) ships this padding only
       under (max-width: 768px), and the host ships none at all, so 769-1023px
       touch devices had no bottom inset from either side and their content sat
       in the system-bar band (issue #193). In the <=768px band that sheet's
       declaration and this one are the same property with the same value, so
       they do not stack. */
    padding-bottom: env(safe-area-inset-bottom, 0px) !important;
  }

  /* The sidebar column (first grid child) becomes a left drawer. The drawer
     hugs the sidebar content exactly (the wide sidebar carries an inline
     width, ~280px): a fixed 92vw box would leave a white strip where the
     container background shows beside the content.
     Closed state: translateX(-110%) — more than -100% of the max-content
     width — guarantees the whole drawer (and its shadow, had it one) leaves
     the viewport. A mere -100% leaves a sliver on screen; -105% (as used
     before) left 14px of the drawer plus a long 32px-blur shadow gradient
     visible along the left edge of the main UI. No box-shadow at all: the
     dimmed backdrop already separates drawer from content. */
  /* These legacy column rules stay armed on every host generation: the phone
     owner prefers this drawer over the official overlay one (2026-09-13). The
     host's own drawer ships NO full-screen backdrop, so the conversation beside
     it stays hit-testable - the rejection reason.
     Layering contract: this column is 1300 and the backdrop 1250 (base.css),
     both deliberately above the host's native sidebarCol at 1100. The earlier
     value of 40 sat BELOW that 1100: because this same rule also forces
     position/inset/width on the element, the column kept a correct-looking box
     while neither painting nor hit-testing, which is the "all black, click
     anywhere closes" root cause. The backdrop we append carries the dimming. */
  [data-mobile-nav="frame"] > :first-child {
    position: absolute !important;
    inset: 0 auto 0 0 !important;
    /* !important is load-bearing: the host ships
       [data-dsh-frame] [data-pane="sidebar"] { width: min(88vw, 320px) !important }
       under (max-width: 768px), which at 390px resolves to a flat 320px and
       BEATS a plain declaration here - measured: our max-content never applied
       and the column stayed 320px.
       280 is the drawer's hard floor, measured by sweeping the column width from
       304 down to 264: the inner surface is a FIXED 280px box and never
       reflows, so every pixel below 280 is simply clipped off its right edge
       (the list stays 270px at every width and its right edge sits at 278, so
       270 and below cut into the list itself). At exactly 280 the panel is fully
       intact - only the 12px of its right-hand padding is given up - which is
       what the owner asked for over the previous 304. Going narrower is a
       one-line change, but it starts eating content. */
    width: min(88vw, 280px) !important;
    /* 1300 is a contract with base.css: the host pins its native sidebarCol at
       z-index:1100 and paints its mid layers up to that band, so the drawer must
       sit above the host stack AND above our own backdrop at 1250 (which dims
       the content area). At 40 the backdrop covered the drawer itself, so
       opening it showed a full-screen dim with no drawer (measured 2026-09-13
       at 390px: backdrop [0,0,390,844] z1250 over column [0,0,320,844] z40, and
       elementFromPoint(40,300) returned the backdrop). Keep in sync with the
       backdrop z in base.css. */
    z-index: 1300 !important;
    transform: translateX(-110%);
    transition: transform .28s var(--ds-ease-in-out, ease-in-out);
    /* Keep the drawer's own content below the status bar / notch: the drawer
       spans the full frame height (its absolute containing block is the
       frame's padding box, so the frame's own safe-area padding does NOT
       reach it). The drawer background paints the status-bar strip, which
       the client's theme-color meta matches, so the strip reads seamless. */
    padding-top: env(safe-area-inset-top, 0px) !important;
    /* Kill the official sidebarCol right border: with the backdrop the edge
       reads cleanly, and the settings dialog (width:100% of this box) stays
       pixel-flush with the drawer. */
    border-right: none !important;

    /* The drawer's inner surface is 280px wide while the column is 88vw/320px, so
     the remaining 40px showed our own column background as a vertical strip
     along the right edge (measured: content right edge 280, column 320; the
     owner reported a white bar). The inner surface owns that band instead, so
     the strip is filled by the drawer's real surface colour.
     That scenario cannot recur as the layout stands: the column is
     min(88vw, 280px), never wider than the 280px inner surface, so the
     inequality that produced the band (column > surface) no longer holds at any
     viewport width (measured 430/390/340/320 = flush at 280, 300 -> 264,
     280 -> 246; a narrower column just crops the surface). The only change that
     would bring it back is raising the column's upper bound past 280px, or the
     host narrowing the inner surface below it. */
    /* The 40px band is a STACKING result, not a colour one: the drawer's inner
     surface is only 280px wide (host markup), while our column is 320px and
     carries z-index 1300 - so the column's own background paints OVER the
     surface's right 40px. Pixel-verified from a screenshot with the drawer open:
     x=10..270 rgb(249,250,251) (the surface) against x=285..315 rgb(255,255,255)
     (our white column). Repainting the column with the surface's own value makes
     the seam invisible.
     The value pinned here is the host's own drawer-fill token - the one
     .pI_x6G_sidebarCol paints with: --dsw-specific-sidebar-fill, i.e.
     --dsw-static-neutral-bluish-50 (#f9fafb) in light and
     --dsw-static-neutral-bluish-900 (#1b1b1c) in dark. Pinning it, rather than
     letting the host rule paint, keeps the band covered without depending on
     cascade order. The fallback is deliberately the token's LIGHT value: if the
     host ever renames this internal token the declaration degrades to today's
     light behaviour instead of going unset, so it cannot get worse. Do not
     "simplify" this back to --dsw-alias-bg-surface: that name is defined nowhere
     in the host, which froze this rule on its fallback and painted the drawer
     light in the dark theme (issue #192). */
    background: var(--dsw-specific-sidebar-fill, #f9fafb);
    /* Drawer swipe gestures (edge swipe-in / content swipe-out, see
     docs/specs/2026-08-27-sidebar-swipe-gestures.md).
     One rule is load-bearing for the gesture layer: dropping pan-x on the
     drawer lets horizontal pointermove events reach the gesture code —
     WITHOUT it the browser treats a horizontal stroke as a pan, fires
     pointercancel and the gesture never classifies (vertical panning stays
     intact). Start-hit is decided purely by geometry on the document
     capture listener (START_ZONE_RATIO = 0.45 of the viewport width, ~176px
     at 390px); there is no hotspot element (removed per audit C2,
     2026-08-27). pinch-zoom rides along with the
     root value so a browser-applied zoom stays undoable inside the drawer
     too (#45); touch-action intersects down the ancestor chain, so a bare
     pan-y here would cancel the root's pinch permission. */
    touch-action: pan-y pinch-zoom !important;
  }

  /* 壁纸兼容（issue #228）：deepseek-harness-background 0.6.x 在
     body[data-dsh-bg] 上把 --dsw-specific-sidebar-fill 置为 transparent（body 内联），
     而抽屉列以该令牌为唯一底色；令牌存在时 var() 的 fallback 不会生效，整列
     于是透出壁纸。宿主内表面（sidebarCol）用同一令牌，也透明，没有第二层
     填充源。壁纸启用时按该令牌自身的两档静态值补回原色：浅色
     --dsw-static-neutral-bluish-50、深色 --dsw-static-neutral-bluish-900。
     这两个静态令牌在明暗两套里取值相同，所以深色必须单独一条。
     规则只在 body[data-dsh-bg] 下命中，无壁纸时完全不参与。 */
  /* @patch
     id: wallpaper-drawer-fill
     for: deepseek-harness-background 0.6.x 的 body[data-dsh-bg]（壁纸启用时把 --dsw-specific-sidebar-fill 置为 transparent）
     why: 抽屉列的唯一底色就是该令牌，第三方插件把它清空后整列透出壁纸；宿主内表面同样透明，没有其它填充源
     until: 上游提供不透明的面板填充接缝，或不再把 --dsw-specific-sidebar-fill 置空——届时本块删除
     test: tests/wallpaper-surface-fill.test.ts
  */
  body[data-dsh-bg] [data-mobile-nav="frame"] > :first-child {
    background: var(--dsw-static-neutral-bluish-50, #f9fafb);
  }
  body[data-ds-dark-theme][data-dsh-bg] [data-mobile-nav="frame"] > :first-child {
    background: var(--dsw-static-neutral-bluish-900, #1b1b1c);
  }

  /* Closed slot, at the host's OWN specificity. 0.1.5 added a narrow-branch
     rule [data-dsh-frame][data-sidebar-collapsed] [data-pane="sidebar"]
     { width:52px !important; transform:none; pointer-events:none;
     background:transparent !important } - specificity (0,3,0), one class above
     the rule above, so it won BOTH width and transform: the closed drawer
     stayed a 52px transparent shell at x=0 and the only state delta left was
     the width (52<->280), which "transition: transform" cannot animate.
     Measured 2026-09-17: closed pane transform:none / width:52 /
     rect [0,0,52,844], and every frame sampled across a toggle click stayed
     transform:none - the owner's "no slide animation on click" report.
     Matching that specificity (plus !important, since the host declaration is
     important) restores the design's own slot (spec 2026-08-27, drawer DOM):
     a min(88vw, 280px) column translated -110% of its own width, i.e. -308px
     at 390px. The gesture layer never depended on this rule - it writes an
     inline transform !important - so only the CSS-driven click paths regressed. */
  [data-mobile-nav="frame"][data-sidebar-collapsed] > :first-child {
    width: min(88vw, 280px) !important;
    transform: translateX(-110%) !important;
  }

  /* Expanded state (frame without data-sidebar-collapsed) slides the drawer in.
     The open state must be transform:none — NOT translateX(0): an identity
     transform still makes the drawer the containing block for fixed-position
     descendants (the settings dialog's .VOzbGW_overlay is portaled into the
     sidebar DOM). With the identity transform the wide settings sheet
     (100vw-16) overflows the 280px drawer, the dialog's focus scrolls the
     overflow:hidden drawer to scrollLeft=102, and every static child (plus the
     fixed overlay) shifts 102px off-screen. With transform:none the overlay is
     viewport-anchored: it dims the full screen and the sheet sits at left:8. */
  [data-mobile-nav="frame"]:not([data-sidebar-collapsed]) > :first-child {
    transform: none !important;
  }


  /* The host's own drawer handle. It renders the branded fish glyph (a 24x17
     path in a 23.16x17.04 viewBox) and the phone owner reads it as a stray
     "whale" sitting at the very top-left of the header: measured [10,14,44,44]
     against our own toggle at [8,12,28,28], i.e. the two overlap in the same
     corner. It also duplicates what our toggle already does, so on the mobile
     branch it is removed. The selector keys on the host's own label - the
     element carries no distinguishing class (hHd-Xa_iconButton is shared with
     every other icon button, and the label flips to "Collapse sidebar" when the
     drawer is open, which is why the attribute prefix matches both states and
     both get removed). Nothing in this plugin queries that element; the drawer
     still opens from our toggle, the edge swipe, and closes by tapping the
     backdrop or swiping it away. */
  /* Two selectors and both are needed. The competitor is NOT the host's own
     CSS: @linxin666/dsh-web-all injects, under (max-width: 768px),
     [data-dsh-frame][data-sidebar-collapsed] [data-pane="sidebar"]
     [data-dsh-responsive-part="sidebar-toggle"] { pointer-events: auto;
     display: inline-flex !important }. That is 4 attribute selectors AND
     !important - exactly what the first selector below is - so this is NOT an
     out-specify, it is a TIE decided by sheet order, and it holds only because
     our sheet is injected after theirs. Measured twice, not inferred:
     scripts/probes/cascade-conflict-probe.mjs reports both sides imp=true at
     (0,4,0) and lists this as a reviewed order-tie; if the injection order
     flips, the dismiss shadow returns as a visible inline-flex box with
     pointer-events restored. Done (audit D-5 option A, 2026-09-16): every
     selector below carries a leading html, which lifts the first one to
     (0,4,1) and ends the tie - the outcome no longer depends on which sheet is
     injected later. The hash class and the label stay as fallbacks for hosts
     without that hook. */
  html [data-mobile-nav="frame"][data-sidebar-collapsed] [data-pane="sidebar"] [data-dsh-responsive-part="sidebar-toggle"],
  html [data-mobile-nav="frame"] [data-dsh-responsive-part="sidebar-toggle"],
  html [data-mobile-nav="frame"] [class*="hHd-Xa_toggle"]:is([aria-label*="sidebar" i], [aria-label*="侧边栏"]),
  /* The label-only fallbacks MUST stay scoped to the seats the host's own
     drawer handle can live in. Unscoped they match by aria-label substring,
     and the session row's ⋯ carries 会话“<title>”的操作 — so any session
     whose title contains 侧边栏 (or "sidebar") lost its ⋯ menu entirely
     (2026-09-22 phone repro: title 侧边栏不见了 → rowActions button
     display:none, row height unchanged, time shifted right by the 16px the
     button would have taken). Anchor them to the frame's leading seat and to
     the header's leading cell instead. */
  html [data-mobile-nav="frame"] [data-conversation-header-leading] button[aria-label*="sidebar" i],
  html [data-mobile-nav="frame"] [data-conversation-header-leading] button[aria-label*="侧边栏"],
  html [data-mobile-nav="frame"] [data-shell-leading] button[aria-label*="sidebar" i],
  html [data-mobile-nav="frame"] [data-shell-leading] button[aria-label*="侧边栏"] {
    display: none !important;
  }

  /* The host's own right sidebar IS the Files panel on phones, and the host
     pins it as a full-bleed sheet: [data-sidebar-right-panel=fullscreen]
     carries inset:0 (0.1.5: position:fixed; 0.2.x dockkit: position:absolute,
     both spanning the whole viewport) and no inset of its own (the host CSS
     never mentions safe-area at all). Its top row - the tab strip holding the
     tab label, the + button and the Split / Exit-fullscreen pair at the right
     edge - therefore sat UNDER the status bar: measured at 390x844 with the
     panel open, the strip is [0,0,390,38] and the phone's status bar owns the
     top of the screen. The frame's own safe-area padding cannot reach it: the
     panel starts at the viewport top regardless of the frame's padding box.
     Taking the inset as padding pushes the whole row below the status bar,
     with the right-hand buttons still on the right edge.
     ONLY the fullscreen form: the host's docked form (measured at 820x1180 -
     form=push, position:absolute, 365px right-anchored) has the frame's
     padding box as its containing block, so it already starts below the
     status bar; padding it too would add the inset a second time. A host
     generation that renames the form value should fail the probe loudly
     instead of silently double-padding. The rule lives in the mobile branch,
     so desktop keeps the host layout. */
  [data-sidebar-right-panel="fullscreen"] {
    padding-top: env(safe-area-inset-top, 0px) !important;
  }

  /* 0.2.0 dockkit 重构删掉了面板本体自带的 z-index 与底色（0.1.5 是
     .P3OORG_panel{z-index:10; background:var(--dsw-alias-bg-base)}）。下面两条
     规则各补回一条，共用 [data-sidebar-right-open] 门控：fullscreen 形态值由
     视口宽度推导、关态也在场，且关态面板的 rect 同样铺满视口（实测 390x844 →
     [0,0,390,844]），漏门会给关闭态那块空面板涂色/抬层。 */
  /* @patch
     id: fullscreen-panel-sheet
     for: dsh-client-ui-sidebar-right 0.2.x 的 [data-sidebar-right-panel="fullscreen"]（0.2.0 起面板本体不再自带 z-index）
     why: 面板 z auto 而活跃会话的输入卡座是 sticky z-index:7，面板自身表面被输入卡压住；恢复 0.1.5 的 z-index:10，面板重新是一整张 sheet
     until: 上游把 z-index 还给面板本体，或给全屏面板一个不依赖 z 的层叠接缝——届时本块删除
     test: tests/fullscreen-panel-sheet.test.ts
  */
  [data-sidebar-right-open][data-sidebar-right-panel="fullscreen"] {
    z-index: 10 !important;
  }
  /* @patch
     id: wallpaper-panel-fill
     for: deepseek-harness-background 0.6.x 的 body[data-dsh-bg]（壁纸启用时把 --dsw-alias-bg-base 置为 transparent）+ 0.2.x 全屏右侧栏面板
     why: 面板唯一的底色就是继承来的 --dsw-alias-bg-base（浅色 = neutral-bluish-00、深色 = neutral-bluish-950）；令牌被清空后全屏面板整片透出会话正文，无壁纸时内容层自绘该令牌故不需要常驻补色
     until: 上游给全屏面板提供不透明的填充接缝，或不再把 --dsw-alias-bg-base 置空——届时本块删除
     test: tests/wallpaper-surface-fill.test.ts
  */
  body[data-dsh-bg] [data-sidebar-right-open][data-sidebar-right-panel="fullscreen"] {
    background-color: var(--dsw-static-neutral-bluish-00, #fff);
  }
  body[data-ds-dark-theme][data-dsh-bg] [data-sidebar-right-open][data-sidebar-right-panel="fullscreen"] {
    background-color: var(--dsw-static-neutral-bluish-950, #151517);
  }

  /* Phone chrome keeps only the collapse control. Split visibility must not
     depend on data-dockkit-split-blocked: DockLayout measures after each commit,
     so conditional display can alternate blocked/allowed at the width threshold.
     Hide the wrapper too, since a blocked split wrapper is a tab stop. */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-sidebar-right-panel] [data-dockkit-split-button],
    [data-sidebar-right-panel] span:has(> [data-dockkit-split-button]),
    [data-sidebar-right-panel] [data-sidebar-right-mode="push"] {
      display: none !important;
    }
  }

  /* prefers-reduced-motion: the drawer's .28s slide is motion; drop it
     (audit S2 2026-08-27 — the old reduce block only covered the settings
     sheet and its mask). Same idiom as the animation:none blocks below. */
  @media (prefers-reduced-motion: reduce) {
    [data-mobile-nav="frame"] > :first-child {
      transition: none !important;
    }
  }

  /* Drag handles are useless on touch and would float over the drawer. */
  [data-side="sidebar"],
  [data-side="details"] {
    display: none !important;
  }

  /* --- Conversation text on mobile ---
     The official message flow keeps desktop's 32px side gutters and 16px
     type. On a phone: shrink the type a notch and widen the lines by
     trimming the gutters (the sidebar drawer list keeps its size). The
     flow's scroll container holds the markdown <p> paragraphs; since
     DSH 0.1.2-rc.1 the composer is a Lexical contenteditable that also
     renders real <p> paragraphs inside its own _scroll container, so the
     composer must be excluded explicitly via
     :not(:has([data-composer-input])). */
  /* The official main scroll body reserves scrollbar-gutter for desktop
     scrollbars (8px), which shoves every column off-center on a phone.
     Classic desktop scrollbars (Edge/Chrome) also occupy ~8-17px in a
     phone-sized viewport, shifting the column further. Mobile scrolling
     is touch/wheel, so remove the scrollbar entirely on phones: the
     column is then exactly centered in every browser. */
  [data-phase] [class*="_scrollBody"] {
    scrollbar-gutter: auto !important;
    scrollbar-width: none;
    /* 消息滚动体收拢自身的过滚动（pocket 补丁）：到底/到顶继续拽时不再把
       整页（drawer/背景）拖出橡皮筋。 */
    overscroll-behavior: contain;
  }
  [data-phase] [class*="_scrollBody"]::-webkit-scrollbar {
    display: none !important;
    width: 0;
    height: 0;
  }
  /* ---------- selection-drag autoscroll ramp (2026-10-07 live-host probe) ----------
     Report (Android): once the conversation chrome became unselectable, dragging
     the selection handle up stopped grabbing the title bar, but the conversation
     did not scroll WITH the finger - it teleported a few screens up instead.
     Mechanism measured on the live host (390x844, touch-emulated, selection anchor
     inside the message flow, pointer held 1.4s): Blink only starts autoscrolling a
     selection drag once the pointer is within ~3px of the scrollport's top edge,
     and the RATE grows with how far the pointer sits ABOVE that edge, saturating
     fast - y=140/100 -> 0 px/s, y=70 -> 1018, y=50 -> 2225, y=30 -> 3329,
     y=10 -> 3232 px/s. The conversation scrollport's top edge is the header's
     bottom edge (y=67), so every finger position on the header is 17-57px "above
     the list" and lands in the 2200-3300 px/s band: one 777px screen every ~0.23s,
     which reads as dropped frames / a jump to somewhere else. The ramp is
     geometric, not ours - from y>=100 nothing scrolls at all, so the speed is
     decided by where the list's box starts.
     Fix: extend the scrollport's box up under the header so a drag point over the
     header is only a few px above the list edge. Measured with the box moved to
     y=0: y=30 -> 0 px/s, y=10 -> 595 px/s. The visual position is unchanged by
     construction - the box grows upward by H while padding-top: H pushes the
     content back down, so an element at content offset X still paints at
     H + X - scrollTop (live-host check: header [0,0,390,67] and the composer seat
     [0,740,388,104] are identical before/after; only the box [0,67,388,777] ->
     [0,0,388,844] and scrollHeight +H move).
     H comes from --mobile-nav-header-h, written by the reconciler task
     "header-metrics" (phone-chrome.ts) as the header's bottom edge measured from
     the frame's top. It is 0px whenever the header is not measurable (hero / blank
     header), which makes both declarations below a no-op - the layout fails open if
     the host ever stops rendering a conversation header. Phone tier only: the
     desktop header is an ordinary in-flow bar and there is no touch selection drag
     to ramp. */
  [data-mobile-nav="frame"] [data-phase] [class*="_scrollBody"] {
    margin-top: calc(-1 * var(--mobile-nav-header-h, 0px)) !important;
    padding-top: var(--mobile-nav-header-h, 0px) !important;
  }
  /* ---------- selection handle drag: keep the extent local (2026-10-07) ----------
     The phone selection handle drag is a native (Android WebView
     TouchSelectionController) gesture: each move hit-tests the handle position to
     resolve the selection extent and then reveals that extent. With the bar
     unselectable but still hit-testable it won that hit test, Blink walked FORWARD
     in DOM order to the next selectable node - the flow's first item, the
     "Load earlier" gate, measured on the live host - and revealed it: the viewport
     teleported to the top of the conversation instead of extending by a line
     (reported as "not scroll-selection, it jumps somewhere else"). Dropping the bar
     out of the hit test for the duration of the selection lets the same point
     resolve into the message the lifted box above now puts underneath it, so the
     extent stays local and the scroll ramp stays gentle. 「pointer-events」 only -
     no layout change, so nothing reflows while the finger is down. The marker is
     set by installSelectionChromeYield (phone-chrome.ts) and only for selections
     that live in the conversation (composer/drawer keep their chrome
     interactive); header buttons remain reachable the moment the selection
     collapses, which is also what a tap anywhere else does. */
  html[data-mobile-nav-selecting] [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    pointer-events: none !important;
  }
  /* A transparent header was harmless while nothing could scroll underneath it;
     with the box lifted it would show the messages through the title row
     (headless screenshot 2026-10-07: message text bled across "Standard mode"
     and the tab strip), so the header rule below now carries an opaque
     background. */
  /* Message action rows (copy / run-time badges) can overflow the right
     edge on narrow screens — keep them inside the message width. */
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

  /* Message tooltip bubbles (copy / feedback labels, message-row hover
     bubbles) are redundant on touch: the icon already flips to a checkmark.
     Suppress only inside the actions row — the fork's original scope. On
     this host (0.1.1-rc.2) NO tooltip renders as a visible bubble: the copy
     label is a visuallyHidden span and no client-ui package emits
     role="tooltip". The user message bubble (Sixlwa_bubble since the host moved
     it to dsh-client-ui-chat) and the goal
     bubble (oRe1gG_bubble) live in _userStack/_row, NOT in _actions — the
     previously unscoped selector hid every user message on touch devices
     (2026-09-06 live regression). role="tooltip" stays globally suppressed:
     genuine ARIA tooltips are exactly what the sticky-residue fix targets,
     and nothing legitimate carries the role today. The actions-row arm
     re-activates by itself when a host version renders tooltip labels
     inline in the actions row (DSH 0.1.2 shape). */
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
    /* Message text follows the host's own font-size axis (Settings -> 字号大小)
       instead of a frozen phone constant. The host writes the user's choice to
       <body> as --dsh-content-font-size and derives the longhand token
       --dsw-font-markdown-base-font-size from it; the previous 15px !important
       cut that chain at the container, so settings 12-17 did nothing for message
       text while the host's own markdown blocks still moved — two sizes mixed in
       one column (#52). Read the longhand token only: the other token ending in
       -base is the font shorthand, an invalid font-size value that the parser
       drops and the cascade silently falls back on. The fallback chain ends at
       the host's own default axis value. */
    font-size: var(--dsw-font-markdown-base-font-size, var(--dsh-content-font-size, 14px)) !important;
  }
  /* Descendants only inherit: the host already resolves the same token on its
     own markdown blocks (and its styles pin 16px on paragraphs / list items),
     so a rule per p / li / user-message text would cut the axis a second time. */
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

  /* Markdown tables: the official table uses width:max-content, so on a phone
     it hugs the content and leaves dead space beside/inside the table. Force
     the table to fill the message column and let the table wrapper handle
     overflow if a cell is genuinely too wide. */
  [data-phase] table {
    width: 100%;
    max-width: 100%;
  }
  [data-phase] th,
  [data-phase] td {
    max-width: none;
    min-width: 0;
  }

  /* Markdown images: the official rule often forces width:100%, which
     upscales small square images to the full message column. Show small
     images at their intrinsic size; large / very wide images still scale
     down to fit the column (max-width:100% keeps horizontal panoramas
     adaptive without overflowing). */
  [data-phase] [class*="_scroll"]:not([class*="_scrollBody"]) img {
    width: auto !important;
    max-width: 100% !important;
    height: auto !important;
    /* Cap square / tall images so a big sticker does not dominate the
       narrow column; landscape images stay governed by max-width only.
       The plain px line is the fallback for engines without dvh. */
    max-height: 220px !important;
    max-height: min(40dvh, 220px) !important;
  }

  /* User bubbles: the official stack is capped at min(525px, 82%), which on a
     phone leaves a large blank strip on the left and pushes the bubble high.
     On mobile let the user message fill the same full width as assistant
     messages (the bubble background then spans the whole message column). */
  [data-phase] [class*="_userStack"],
  [data-phase] [class*="_userStack"] [class*="_bubble"] {
    box-sizing: border-box;
    width: fit-content;
    max-width: 100%;
  }

  /* --- Composer bottom row on mobile ---
     The official row contains two lanes: tools (plus + permission/mode
     controls) and trailing (model + context + send). The previous rules made
     the modes lane flex:none, so its full intrinsic width collided with the
     model selector on narrow phones. Keep fixed hit targets fixed, but let
     text-bearing controls shrink and ellipsize before they paint over the
     trailing lane. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) {
    box-sizing: border-box;
    container-type: inline-size;
    container-name: dsh-mobile-composer;
    flex-wrap: nowrap;
    /* 2026-09-23 店主："每个功能键隔的空间太多"。真机实测间距主要不是 gap（6px）
       而是各控件自己的内边距；这里 gap 收到 3px，配合下面模型 chip 的 padding
       收紧，把右簇焊成一团。 */
    gap: 3px;
    padding-left: 6px;
    padding-right: 6px;
    /* The dropdown menu is absolutely positioned inside this row; any
       overflow: hidden here would clip it. Inner lanes keep their own
       overflow clipping, so the row itself can stay visible. */
    overflow: visible;
  }
  /* Dual-primary form (subagent view: stop + send). The four-control
     cluster [model][meter][stop][send] overflows the single-row lane the
     nowrap rule above enforces; the model pill is the only shrinkable
     item, so it collapses to zero and the fixed trio loses its auto
     margin (all hug the lane's left edge, send may even paint off-view).
     Restore the official wrap for this form only: the trailing lane
     drops to a second full-width row where the four controls always
     fit. Main-session three-control form keeps single-row layout. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]):has([class*="_primary"] ~ [class*="_primary"]) {
    flex-wrap: wrap;
  }
  /* Issue #140: in that same dual-primary form the stop key and the send key
     sit one 3px lane-gap apart — two same-shaped 34px pills where a mis-touch
     on the left one interrupts the running reply. The 2026-09-23 「焊在一起」
     3px decision keeps governing the main session's [model][send] cluster;
     only this form (the one with two adjacent destructive-adjacent primaries)
     gets +8px between the stop and the send key. Knob: margin-right. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]):has([class*="_primary"] ~ [class*="_primary"]) > [class*="_trailing"] > [class*="_primary"]:has(~ [class*="_primary"]) {
    margin-right: 8px;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > :first-child {
    flex: 0 1 auto;
    min-width: 0;
    /* 2026-09-23 店主第三轮："左边那三个功能区挨得太近了，隔开一点点"。
       权限控件收窄 16px 后，📎 跟着整体左移、贴到了 ⌄ 上（实测墨迹间距只剩 ~3px）。
       工具道 gap 单列放宽到 8px（右簇仍 3px，保持焊在一起）。 */
    gap: 8px;
    /* The permission dropdown (Menu, side: top) pops upward from inside the
       tools lane; overflow hidden here would crop it, same as the row. Text
       ellipsis is handled by the trigger label itself. */
    overflow: visible;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] {
    flex: 1 1 auto;
    min-width: 0;
    gap: 3px;
    /* Must not clip the model dropdown; the model trigger clips its own label. */
    overflow: visible;
  }
  /* Permission / plan controls share the tools lane inside the a2-style
     'div.modes' container (class survives as 'css.modes'; audit doc §10.1 /
     E-1). The positional anchor '> :first-child > :nth-child(2)' was already
     off-target on rc.2 and dies entirely on a2, so the series re-anchors on
     the tools lane's modes container: '[class*="_tools"] > [class*="_modes"]'
     (live-verified on the rc.2 host: the modes div is a direct child of the
     tools lane, a grandchild of the row — a row-direct-child anchor matches
     nothing on either generation). The permission label uses the remaining
     tools width, while the lower-priority plan slot keeps an icon-sized
     target instead of stealing model width. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] {
    flex: 0 1 auto;
    min-width: 0;
    max-width: none;
    /* 2026-09-23 店主："左边那个权限的也缩一点点"：容器 gap 4→0。 */
    gap: 0;
    /* The permission Menu list (side: top) pops upward out of this lane;
       overflow hidden crops it. The trigger label clips its own text. */
    overflow: visible;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] > [class*="_trigger"] {
    flex: 1 1 auto;
    min-width: 28px;
    max-width: 100%;
    display: flex !important;
    overflow: hidden;
    /* 权限 trigger 自带内边距 + flex gap（图标与 ⌄ 之间），图标化后都是浪费：
       2026-09-23 按店主"缩一点点"归零（真机 44px 盒 → ~34px）。 */
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
  /* Slot wrappers such as the live plan chip are not trigger elements. Do
     not force them into an icon-sized box: their child button would overflow
     that wrapper and paint over PermissionSelect. Keep the wrapper intrinsic;
     the model lane below is the one that sacrifices width. */
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
  /* 权限触发器（宿主 dsh-client-ui-permission-presets，样式哈希 iWlSmW_）自身带
     padding:0 4px 0 8px + gap:4px —— 与模型 chip 同款浪费（左 8px 是给文字留的）。
     2026-09-23 店主："左边那个权限的也缩一点点"。注意：它外面套了一层
     display:contents 包装（真机探针：modes[55,44] > div[contents] > root[55,44]），
     所以「_modes > _trigger」这类直接子代锚点命不中（上一版改了没反应），
     必须用哈希后代锚点；哈希变了整条自动失效，不会误伤别家。 */
  [data-mobile-nav="frame"] [data-phase] [class*="iWlSmW_trigger"] {
    padding: 0 !important;
    gap: 0 !important;
  }
  /* 2026-09-23 店主："权限的图标有点小，稍微大一点点，不然左边轻右边重"。
     宿主把图标包在 _triggerIcon 里、自己写死 14px（iWlSmW_triggerIcon svg
     的 width/height 都是 14px），与 + / 📎 的 16px 不齐。只放大那个包装里的
     svg：⌄ 箭头不在 _triggerIcon 内，不会被一起放大。盒子 28×28 不变（16 仍有余量）。
     注意：本文件是模板字符串，注释里**不能出现反引号**（会劈开 CSS）。 */
  [data-mobile-nav="frame"] [data-phase] [class*="iWlSmW_triggerIcon"] svg {
    width: 16px !important;
    height: 16px !important;
  }

  /* Model selector: flexible and shrinkable, but never clipped.
     The root must be overflow:visible so the dropdown menu can render.
     The trigger itself clips the label text. */
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

  /* Model switcher menu: was centered here with left:50% + translateX(-50%), but the
     host now PORTALS the menu to <body> (measured 2026-09-23: _7KE1Ra_menu, role=menu,
     position:fixed, parent=BODY, inline left/top), so this child-chain selector stopped
     matching and the rule had been dead. The re-anchor lives in JS instead —
     effects/model-menu-anchor.ts centers the panel on the trigger and clamps it to the
     viewport. Do not re-add a CSS rule here without checking the portal parent. */

  /* Phone reasoning-effort list is compact; the model catalog and the tablet stay
     host-sized. Measured on the real host bundle (dsh-client-ui-model-selection
     0.2.0-rc.2, 393x844, phone emulation): the effort pane renders 248px wide
     (its own min-width is 240px) while its four levels need far less.
     The two panes differ in the SHAPE of their radio list, and that difference is
     the only reliable discriminator (measured, same run):
       effort pane   DIV._surface_ri079_1._7KE1Ra_menu[role=menu]
                       > DIV._material_ri079_21
                       > button._7KE1Ra_option[role=menuitemradio]   <- DIRECT child
       model pane    DIV._surface_ri079_1._7KE1Ra_menu[role=group]
                       > DIV._material_ri079_21
                       > DIV._7KE1Ra_groups.scrollable[role=menu]
                           > SECTION._group_121p8_1[role=group] > button[role=menuitemradio]
     The host sets 「role: pane === "model" ? "group" : "menu"」, so the effort pane is
     the role=menu shell and its radios ARE direct children, while the catalog's sit
     two levels deeper. Requiring both halves — role=menu AND a direct-child radio —
     therefore selects the effort list and leaves the catalog at its host size.
     Neither half is safe alone: dropping the role also matches the catalog's inner
     _groups container, and matching radios as descendants selects the catalog shell.
     (Measured with each variant: the group/descendant form hit the catalog only.)
     「min-width: 0 !important」 is load-bearing: without it the host's own
     min-width 240px keeps the pane at 240 no matter what width is set. */
  @media (max-width: 767px) and (pointer: coarse) {
    [class*="_7KE1Ra_menu"][role="menu"]:has(> [role="menuitemradio"]) {
      width: min(208px, calc(100vw - 32px)) !important;
      min-width: 0 !important;
      max-width: calc(100vw - 32px) !important;
    }
  }

  /* --- Fix composer row overflow at narrow widths (320px-360px) ---
     Force every direct child of the tools and trailing lanes to shrink,
     so they can fit within the available space without causing horizontal
     overflow. The fixed-size icon buttons are exempt: officially both are
     flex:none at a fixed size (plus 28x28, send 34x34) and must stay put,
     not participate in adaptation. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > :first-child > :not([class*="_add"]) {
    flex-shrink: 1;
    min-width: 0;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > :not([class*="_primary"]) {
    flex-shrink: 1;
    min-width: 0;
  }
  /* Pin the plus button at the left edge of the tools lane: official
     flex:none 28x28, never squeezed by narrower viewports. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > :first-child > [class*="_add"] {
    flex: none;
  }
  /* The context meter in the trailing lane is another fixed-size icon
     control: its trigger is officially width:28px flex:none, but the root
     itself is shrinkable, so a squeezed root lets the trigger paint over
     the pinned send button. Keep the whole meter at its natural size; its
     trigger uses aria-haspopup="dialog", so the model-selector menu rules
     (keyed on "menu") still do not apply.
     GENERATION NOTE (issue #140, 2026-09-29): 0.1.7-rc.2 moved the
     ContextMeter out of this lane into the dock row under the card (next to
     the TPS stats pills) — on rc.2 NONE of the trailing-lane meter rules in
     this section match any more, and the trigger is back to its official
     ~22px-tall box. They stay for the 0.1.5/0.1.6 generations where the
     meter really rendered in the lane (structural anchors, inert elsewhere);
     the rc.2+ hit-area repair lives in the dock-row section below. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_root"] {
    flex: none;
    min-width: 0;
  }
  /* --- 右簇贴右：2026-09-23 重新对锚（模型胶囊改"只留图标"后暴露的旧账）---
     宿主把右簇（模型座位 standardControls / 麦克风 activity / 发送 primary）
     放进可增长的 trailing 车道，靠"某个成员带 margin-left:auto"把整簇顶到右缘。
     插件原来把吸收器挂在模型 root 上：
       > [class*="_trailing"] [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="menu"])
     但 0.1.7 的祖先链变成了
       trailing > standardControls(flex item) > div[display:contents] > _root > _trigger
     于是 root 只是 standardControls **内部**的 flex item，auto 外边距落在一个
     内容宽度的盒子里 ⇒ 等于失效。真机探针实测三者 ml 全 = 0px，就是铁证。
     2026-09-23 之前胶囊很宽、把车道填满，看不出来；胶囊一收成图标，右簇立刻
     塌到左边（发送 x≈316 → 224，右边空出 ~76px，店主一眼看出"位置被移了"）。
     修法：把吸收器改锚到「车道的第一个 flex item」，并只在模型座位在场时生效
     —— 那时宿主那条把 primary 的 auto 清零的规则也在生效，避免两个 auto 平分
     空隙；模型不在场（子代理视图）照旧由 primary 自己的 auto 收尾。
     justify-content: flex-end 是兜底：万一首个 child 是 display:none，auto
     无处可挂时仍能贴右（此时无 auto 外边距，flex-end 才起作用）。 */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:has([class*="_trigger"][aria-haspopup="menu"]) {
    justify-content: flex-end;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:has([class*="_trigger"][aria-haspopup="menu"]) > :first-child {
    margin-left: auto;
  }
  /* ContextMeter (JObwrW_ hash family) hugging the primary key. This single
     value is the whole spacing knob, and because the trigger box is centred on
     the ring ink it doubles as the ink offset:
       6px + margin-right = the sliver before the primary key = the ink's
       leftward shift. 0px (current) therefore shifts the ink 6px -- exactly the
       official lane gap, with no negative-margin trick left in the chain --
       while -6px pins the ink perfectly still and +8px was vetoed on
       2026-09-17 as "too much" (14px). The phone owner asked for a visible
       shift after 1px (-5px) proved imperceptible, and will re-tune this number
       by eye: change it and nothing else moves.
     Anchor on the unique aria-haspopup="dialog" trigger (no other composer
     control uses it), not the hashed class, so an upstream hash bump cannot
     silently unhook us. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="dialog"]) {
    margin-right: 0px;
  }
  /* The model pill joins the same right cluster: its margin-left:auto absorbs
     ALL trailing slack, so the adaptive void sits between the tools lane and
     the pill (visible on wide phones/tablets), while [pill][meter][send] stay
     welded together at the right edge on every width. Descendant combinator
     on purpose: the pill root sits behind a display:contents wrapper, so a
     direct-child combinator silently misses (probe-verified). Within the
     trailing lane aria-haspopup="menu" belongs to the model trigger alone. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="menu"]) {
    margin-left: auto;
    margin-right: -4px;
  }
  /* Grow only the invisible trigger BOX, never the ring ink: 24x24 -> 28x34.
     The WIDTH is capped at 28 by pure geometry, not by taste: the box is
     centred on the ink, and the primary key's hit box begins 14px right of the
     ink's centre, so 28 is the widest box that can reach that boundary without
     stealing a single pixel from the destructive key (the current 1px sliver
     is the spacing knob on the root rule above); the same arithmetic puts the
     left edge on the model pill's edge. The 34px HEIGHT is free: the primary
     key is already the tallest control in the lane, so the box cannot overlap
     anything vertically and the row height does not move. Hit area 576 -> 952
     square px (+65%) with the ink within 1px of its old spot (probe-asserted),
     and the ring's ink stays at its official 14px -- enlarging it is rejected
     as attention-grabbing. Knob: height can drop to 28 if the tap halo should
     be a circle rather than a stadium. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="dialog"]) > [class*="_trigger"] {
    width: 28px;
    height: 34px;
    padding: 0;
  }
  /* Slack-absorber priority in the trailing lane: model pill > meter > send.
     Exactly one element carries margin-left:auto so the adaptive void always
     sits BEFORE the welded right cluster, never inside it. The meter itself
     never had an auto before 2026-09-06: in subagent sessions the model seat
     is officially absent (the parent pins the model), and zeroing the send's
     auto on the meter's aria-haspopup="dialog" then left NOTHING to absorb
     slack -- the whole right cluster hugged the lane's left edge (user
     screenshot). Fix: when no model pill renders, the meter root becomes the
     absorber, welding [meter][send] at the right edge like the main view's
     [pill][meter][send]; the send's auto only survives when neither renders. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:not(:has([class*="_trigger"][aria-haspopup="menu"])) > [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="dialog"]) {
    margin-left: auto;
  }

  /* --- rc.2+ 的第二个失效面：子代理 composer 里环锚点回不到发送键左边（2026-10-12）---
     上面那条「无模型胶囊时由 ContextMeter 当吸收器」的兜底，在 **0.1.7-rc.2+** 上
     再也匹配不到：宿主已经把 ContextMeter 从 trailing 车道搬进卡片下方的 dock 行
     （实测路径 … > [class*="_card"] > [class*="_root"] > [class*="_dock"] > span.JObwrW_root），
     它不再是车道的子元素，「:has(> [class*="_trigger"][aria-haspopup="dialog"])」落空。
     后果（headless 393×844 实测，主/子两视图同机对比）：子代理会话里模型胶囊整个不渲染，
     「standardControls」塌成 0×0 且 margin-left:0，于是车道里唯一带 auto 的是发送键自己，
     插件注入的环锚点 span[data-mobile-nav="stats-ring-reserve"]（普通流内元素）被留在
     车道左缘 —— 环 x=127，而主会话同一元素 x=310、发送键在 333：**188px 空档**，
     用户看到的就是「上下文表跑到左边去了」。
     修法与 #191 同源（同一根因族：rc.2 把 meter 搬走后，车道里的 auto 归属没人接管）：
     没有模型胶囊时让**环锚点**顶替 meter 当吸收器，并把发送键的 auto 清零 ——
     不清零的话两个 auto 会平分空隙，环同样回不到键边。
     门控与上面那条兜底完全一致（车道里没有 aria-haspopup="menu"），所以主会话
     （模型胶囊在场）零改动。 */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:not(:has([class*="_trigger"][aria-haspopup="menu"])) > [data-mobile-nav="stats-ring-reserve"] {
    /* !important 不可省：compat 层有一条 [data-mobile-nav="stats-ring-reserve"]
       { margin: 0 2px 0 0 !important }。两条都 important 时先比特异性 —— 本选择器
       远高于那条裸属性选择器，加 !important 就能赢；不加则被它压成 margin-left:0。
       2026-10-12 受控实验实测：不加 → 环仍停在 x=127、发送键反被拉到 150（188px 空档
       只是从「环与键之间」搬到「键的右侧」）；加 → 环 310 / 键 333，正是期望值。 */
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
  /* Issue #191 — the subagent running form (stop + send, both _primary) has
     NEITHER of the zeroing rule's two gates: ModelSelect renders nothing in an
     addressed subagent session (no aria-haspopup="menu" in the lane) and the
     meter lives in the card's dock row since rc.2 (no _root > dialog trigger
     in the lane either). Both primaries therefore keep the auto margin from the
     rule above, and flex SPLITS the free space between the two auto margins —
     the stop key lands mid-lane with a void on both sides of it.
     Same recipe as the model-present case (:707-712): zero every auto so no
     element competes for the slack, and let justify-content pin the whole
     cluster right. Zeroing alone would hug the LEFT edge instead, so both
     halves are required. Scoped to the dual-primary form, so the main
     session's single-primary path keeps its auto untouched. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]):has([class*="_primary"] ~ [class*="_primary"]) > [class*="_trailing"] {
    justify-content: flex-end;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]):has([class*="_primary"] ~ [class*="_primary"]) > [class*="_trailing"] > [class*="_primary"] {
    margin-left: 0;
  }
  /* 2026-10-20（店主）：「暂停键和发送键……大小缩小，和其他功能键保持一样的大小」。
     同行三个功能键（+ / 权限 / 📎）的官方标称是 28×28，主键（发送、停止生成）官方
     是 34×34 —— 手机档把主键压到同一档：盒 28×28、内边距清零、圆角保持正圆，
     图标仍是 16px，因此圆心与同行按钮落在同一条线上。双主键形态（停止 + 发送）
     同样命中，两者都收小，8px 的防误触间距规则不受影响。
     2026-10-20 二轮：App 会往页面注入一张读不到 cssRules 的样式表（见上方页签条
     注释），第一版没加 !important，真机上尺寸没变。这里按「抗覆盖」写：三项尺寸
     全部 important，并补一条不依赖 [data-phase] / _card / _row 祖先链的兜底选择器
     （车道直系子元素即主键），祖先链任一新代断层都不至于整条规则死掉。
     后续：2026-10-20 四/五轮把**手机档**再改到 30px + 18px 图标并统一颜色，
     覆盖在文件末尾「输入区功能键尺寸」段；本段仍是 768–1023 平板档的值，别删。 */
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

  /* --- ContextMeter hit area on 0.1.7-rc.2+ (issue #140) ---
     The stats-line overlay parks the ring in the composer card's trailing
     lane (right cluster next to the send key — a deliberate 2026-09-23
     placement, kept per the reporter's confirmation at acceptance). The
     official trigger is 16x20px, far under the touch minimum. Regrow the
     hit area IN PLACE with a transparent ::after (the 📎 recipe).
     2026-09-29 acceptance, final geometry (headless-measured): the ring
     svg and its reserve are set to 18px (compat.css.ts — 16px was too
     small to aim, 24px/20px too big, the reporter settled on 18px), the
     width growth is absorbed by the lane's left slack so the key gaps
     stay 6px/5px, and the hit box is a SYMMETRIC 26x26 square
     (inset -4px) keeping the generous touch area around the smaller
     ring — 2px/1px clearance to the model and send keys. The track is
     deepened to 25% black (compat.css.ts) so the donut reads as a
     meter, not a spinner.
     Knobs: the svg/reserve size (compat.css.ts) and this inset; the box
     must stay a square hugging the ring, its edges clamped by the two
     neighbouring keys. The dock container owns only this one dialog
     trigger (the TPS stats pills render plain text), so a scoped
     aria-haspopup="dialog" anchor cannot cross-match anything; the DOM
     ancestry (ring inside the dock container) is unchanged by the
     overlay's absolute positioning. */
  [data-phase] [class*="_dock"] [class*="_trigger"][aria-haspopup="dialog"] {
    position: relative;
  }
  [data-phase] [class*="_dock"] [class*="_trigger"][aria-haspopup="dialog"]::after {
    content: '';
    position: absolute;
    inset: -4px;
  }

  /* --- Third-party model seats (issue #60: @hytime/dsh-thinking-effort) ---
     A seat registered on conversation.input.model replaces the official pill,
     so the trailing lane no longer contains an aria-haspopup="menu" trigger:
     the pill absorber rule above never matches, and the meter fallback below
     would split the slack with the seat (two auto margins share it), leaving
     the seat stranded mid-lane. Worse, in the seat's open state the root's
     only child is the absolutely positioned panel, so the root collapses to
     zero width and the panel's right:0 anchor (width min(336px, 100vw - 32px))
     sweeps 336px leftward from wherever the stranded root sits — 230px off
     screen at 393px (reporter-measured: root x=106, panel left=-230; with our
     stylesheet disabled the root sat at x=339 and the panel at +3, which pins
     the blame on our injection). Both repairs anchor on the plugin's own
     stable data-seat-* markers (identical across v0.2.3-v0.3.7) and leave the
     official pill untouched:
     1. the seat root stretches across the trailing lane with its content
        pushed to the right edge, so the closed chip welds onto the
        [meter][send] cluster AND the grown root consumes all free space,
        which zeroes the meter fallback's margin-left:auto (flexible lengths
        resolve before auto margins — no double void). The root is also made
        position:static so the panel below anchors to the composer card
        instead — the root is 0-width while the panel is open, so any
        root-relative offset is meaningless;
     2. while the panel is open its anchor is laid over the composer card
        (left:0/right:0 against the card's padding box + an auto-margin
        centre), so the panel is centred on the card, never rides the
        collapsed root and never leaves the viewport.

     ── 2026-10-04, thinking-effort 0.3.7: the old centring recipe had to go ──
     Repair 2 used to be 'left:50%; right:auto; transform:translateX(-50%)'.
     That recipe only worked while the plugin positioned nothing itself: a
     mobile viewport left the panel hanging off whichever edge the collapsed
     root sat near. 0.3.7 added its own narrow-screen clamp, which writes an
     INLINE 'left' (390px phone, new chat: root x=122, inline left=-106px —
     i.e. 16px, exactly the right place). Inline 'left' wins over the
     stylesheet, so the recipe's 'left' became dead weight while its
     'transform' kept firing, shifting the panel half its width further left:
     x = 122 + (-106) + (-168) = -152px, off screen by 152px — the reproduced
     bug. Two layers each half-applied. The fix keeps repair 1 (the stretch
     is still what welds the closed chip onto the [meter][send] cluster) and
     replaces repair 2 with the card-anchored recipe above; 'transform:none'
     is what neutralises the stray translateX, and 'left:0' is '!important'
     because it must beat that inline value. Panel width stays the plugin's
     own (336px, capped at 100%) so the Off/High/Max ticks keep their
     designed spacing.

     The panel opens bottom:calc(100% + 8px) above the card, but the card is
     only 70-108px tall on a phone while the panel is 208px, so it always
     overflows upward — that is the plugin's own desktop behaviour and is
     kept. What is NOT acceptable is overflowing the VIEWPORT, so three
     guards follow (the inner listbox, the keyboard-short phone, landscape).
     Every guard stays inside this mobile media query: desktop untouched. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [data-seat-root] {
    flex: 1 1 auto;
    justify-content: flex-end;
    /* Keep parked here rather than in a second rule: the panel below anchors
       to the card, not to this root. */
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

  /* Guard 1 — the panel's inner model listbox opens upward (bottom:58px
     inside the panel) with max-height:min(220px, 100vh - 96px). On a short
     screen that ceiling is taller than the room above the panel, so the
     listbox pokes past the viewport top (320x568: menu y=-41). Clamp it to
     half the viewport minus the panel's own 58px offset + padding. */
  @media (max-height: 700px) {
    [data-seat-model-menu] {
      max-height: min(220px, calc(50vh - 110px)) !important;
    }
  }

  /* Guard 2 — with the on-screen keyboard up (portrait, ≤505px tall) there
     is not even 208px of room above the card. Let the whole panel scroll
     inside itself instead of escaping the top; children keep their natural
     height so the slider and its ticks are never squashed. */
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

  /* Guard 3 — landscape: above the card there are only ~156px (the card
     sits low, the panel is 208px), so an upward opening can never fit.
     Detach the panel into a bottom-docked sheet instead; it floats clear
     of the card and the viewport top. */
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

  /* --- Composer file entry (0.1.6 host) ---
     The 0.1.6-alpha.2 host deleted the composer's paperclip attach button, so
     the only file entry left is the 文件 row inside the "+" listbox. The
     control is contributed to the host-declared conversation.input.left list
     slot ("Compact controls at the left of the composer tool row"), inside the
     tools lane beside the plus button, so only its own box is needed here:
     28x28 like the plus button and fixed — one of the row's hit targets, never
     part of the adaptive shrink. Its click handler triggers the host's own
     hidden input[type=file], so intake validation and upload stay host-owned. */
  [data-composer-card] [data-mobile-nav="file-upload"] {
    flex: 0 0 auto !important;
    /* 2026-09-23 店主："触发点有点小，没那么容易点" ⇒ 盒子 28×28 → 34×34
       （面积 +47%），再由下面的 ::after 向外扩 4px（最终命中区约 42×42）。
       **图标位置不变**：盒宽 +6 后 margin-left 从 -10 收到 -13，图标中心原地不动；
       高度对齐发送键的 34px，行高不受影响。 */
    /* 2026-10-07 店主：「点一下有一层深一点的灰色，也有一层浅一点的灰色，去掉一层」。
       根因是**嵌套两层**：宿主的按钮盒底色（34x34、圆角 8）与我们的 ::before 胶囊
       （28x28 圆）半透明叠半透明 —— 重叠区深、外圈浅。压层叠（!important）在真机上
       压不住那一层（实测按下仍是 233 外圈 + 222 内层），所以改成**结构上只有一层**：
       可见胶囊 = 按钮盒本身。盒子 28x28 + 全圆角，与加号同尺寸；图标中心不变
       （盒宽 34→28 ⇒ margin-left 由 -11 收到 -8）；命中区仍由 ::after 外扩。 */
    width: 28px !important;
    min-width: 28px !important;
    max-width: 28px !important;
    height: 28px !important;
    min-height: 28px !important;
    padding: 0 !important;
    position: relative !important;
    /* 左移 10px + 图标 14→16px（2026-09-23，店主："太往右了、有点小"）：
       工具道现在是 [+][⚠⌄][📎]，宿主给 modes 控件留了较宽的尾部留白，📎 看着
       离左边一截。与参考图逐像素对齐（以 + 为锚点）：参考 📎 墨迹 107..117 CSS，
       我们原先是 114..123；而墨迹高度 48 vs 参考 54 物理 px ⇒ 图标 14 偏小，
       换成宿主通用的 16（+ / ⚠ 都是 16）。28px 盒 + 16px 图标居中 ⇒ 墨迹左缘
       = 盒左缘 + 8.85，故盒左缘取 98 ⇒ margin-left: -10px（吃掉 6px gap 后再
       压进 modes 尾部留白 4px，不碰它的墨迹：chevron 墨迹止于 ~91）。
       这一个数值就是"往左多少"的旋钮，可按眼睛调，别动别的。 */
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
  /* 按下/悬停反馈：宿主其它按钮（加号常驻、模型与权限触发器按下）都有灰胶囊，
     只有我们这个是纯透明、也没有 :active —— 店主 2026-09-23："文件上传那个图标
     怎么没有胶囊？"（点了没反应）。用宿主自己的 hover token，视觉与官方一致。 */
  /* 可见胶囊只在 ::before 上画 28×28 的圆（与加号同尺寸，店主："胶囊有点太大"），
     按钮盒子仍是 34×34 + ::after 外扩 —— 命中区大、看起来小，两者解耦。 */
  [data-composer-card] [data-mobile-nav="file-upload"]::before {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 999px;
    background: transparent;
    transition: background .12s ease;
  }
  [data-composer-card] [data-mobile-nav="file-upload"]::before {
    /* 胶囊已由盒子本体承担，这一层永久透明（保留节点是为了不惊动既有锚点）。 */
    background: transparent !important;
  }
  /* 2026-10-07 店主："点一下有一层深一点的灰色，也有一层浅一点的灰色，去掉一层"。
     真因是**半透明叠半透明**，不是我们画了两层胶囊：宿主全局 CSS 里有
     「button:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}」
     （特异性 0,2,1 > 上面那条基础规则的 0,2,0，所以它赢了）与
     「button:active{background-color:#0000001f}」，两者都画在这个按钮的**盒子**上；
     而 ::before 的可见胶囊又画一层 ⇒ 重叠区深、外圈浅，看着就是两层灰。
     可见胶囊只留 ::before 一层：盒子在所有状态下强制透明（::after 只有命中区、无底色）。 */
  [data-composer-card] [data-mobile-nav="file-upload"]:hover,
  [data-composer-card] [data-mobile-nav="file-upload"]:active,
  [data-composer-card] [data-mobile-nav="file-upload"]:focus-visible {
    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
    box-shadow: none !important;
    outline: none !important;
    border-color: transparent !important;
  }
  /* 压掉浏览器默认的淡蓝 tap 高亮（店主 2026-09-23："单纯点击图标，出现一个淡蓝色
     的原始的点击画面"）。读源码取证：宿主头部那几个包（dsh-client-ui-subagent /
     agent-preset / dsh-experimental-client-ui-agent-team / jobs）**都没有 :active、
     也没有任何 tap-highlight 处理**，触摸设备上点"标准模式 / Agent Team / 1 个子代理 /
     对话·轨迹"就会叠一层原始高亮；我们输入区的控件早已处理（见上面 file-upload 那组）。
     做法与输入区同源：高亮透明，按下反馈交给宿主自己的 :hover/:active token
     （那几个包各有 2~9 条 :hover 规则，触摸时 Chromium 会套用）。 */
  /* 覆盖范围放宽：宿主有些控件不是 button（实测输入区里就有 [role=button]、带
     tabindex 的 div 形态），所以三类一起收。 */
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

  /* 深色下顶栏与页面底色的断层（issue #176「减轻顶部纯黑区域与网页头部的突兀色差」/
     2026-10-11 真机反馈：手机上头部呈灰黑一块，跟上面那行系统时间栏分得太开）。
     实测（393×844，真实会话，深色）：page/body 与 frame 都是 #151517（--dsw-alias-bg-base），
     而宿主会话头部自带层色 #232324，头部上方还夹着一条跟随页面底色的安全区带
     ⇒ 「深色带 → 较亮头部 → 深色内容」三段断层。
     处理：手机档（本块在移动媒体查询内）把头部底色并到页面底色，层次改由分隔线与内容承担；
     浅色档宿主两头同为白、本来就没有断层，不参与；桌面档不碰。
     宿主深色标记挂在 body 上（实测设 body[data-ds-dark-theme] 即切到 #151517），
     html 上若也挂同一个标记一并覆盖。 */
  body[data-ds-dark-theme] [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]),
  html[data-ds-dark-theme] [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    background-color: var(--dsw-alias-bg-base, #151517) !important;
  }
  /* 壁纸兼容（issue #228）：同一个插件把 --dsw-alias-bg-base 也置为 transparent
     （见上方深色顶栏规则）。深色下顶栏用该令牌与页面同色，令牌被清空后顶栏
     失去底色，消息滚动区从标题行下方穿过。壁纸启用时用该令牌自身的深色静态
     定义补回原色；浅色档通用规则已经用未被覆盖的 --dsw-alias-bg-layer-1，
     不需要新规则。门控含 data-ds-dark-theme，特异性 (0,4,2) 高于上方深色
     规则的 (0,3,2)，不依赖源码顺序。 */
  /* @patch
     id: wallpaper-header-fill
     for: deepseek-harness-background 0.6.x 的 body[data-dsh-bg]（壁纸启用时把 --dsw-alias-bg-base 置为 transparent）
     why: 深色顶栏以该令牌与页面同色，第三方插件把它清空后顶栏失去底色，滚动内容从标题行穿过
     until: 上游提供不透明的面板填充接缝，或不再把 --dsw-alias-bg-base 置空——届时本块删除
     test: tests/wallpaper-surface-fill.test.ts
  */
  body[data-ds-dark-theme][data-dsh-bg] [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    background-color: var(--dsw-static-neutral-bluish-950, #151517) !important;
  }
  /* 头部 UI 的按下反馈（店主 2026-09-23："是头部 UI，没有触发反馈"）。
     取证：头部四个宿主包 :active 全为 0，反馈只挂 :hover。
     ⚠ 第一版我给整颗 button 上 background-color，店主实测"胶囊过宽、跑到子代理下面"
     —— 因为 button 盒比可见胶囊大（芯片文字只占盒的一部分）。所以改成**不改几何**的
     按下效果：整体压暗（.92 ≈ 宿主 token 的观感强度；太淡店主会觉得"没变"）。胶囊类的视觉仍由宿主自己的 chip 背景负责。
     不用 position/伪元素：头部芯片里挂着宿主的弹层，改 position 会挪动包含块。 */
  [data-mobile-nav="frame"] [data-phase] header button:active,
  [data-mobile-nav="frame"] [data-phase] header [role="tab"]:active {
    filter: brightness(.92);
  }
  /* 头部那些 v 的翻转：**标准模式那个现在会翻** —— 规则在本文件「DSHA 集成层：预设 chip」
     那一块（搜 data-dsha-agent-preset="header" 的 svg:last-of-type 两条）。这里留一段纠正记录，
     免得后人被已经作废的旧结论误导：

     · 旧结论（同日早先写的）称"本 WebView 里该 svg 的 CSS transform 完全失效"——**错的**。
       真因是预设 chip 的 > svg 上有一条我们自己写的
       [data-dsha-agent-preset="header"] > svg { transform: none !important }（DSHA 集成层拿它把
       图标拉回静态流）。**内联 transform: rotate(45deg) 没带 !important，被那条压掉**，
       于是量出"盒子不变、computed 仍是 none"，被我误判成 WebView 不吃 CSS transform。
     · 子代理 chip 的 v 一直是宿主自带：dsh-client-ui-subagent 的
       .ZKlsPq_trigger svg{transition:transform .12s} + 类 .ZKlsPq_triggerOpen{transform:rotate(180deg)}。
     · 禁止对头部 svg 写通配规则（header svg{...} / [class*=chevron]{...}）：那会覆盖子代理 chip
       自己的 triggerOpen 状态，出现"修一个压掉另一个"（这正是当时反复翻车的原因）。 */
  /* 输入区**宿主渲染**的功能键**不再自加胶囊**（店主 2026-09-23："点击功能键怎么有两个
     灰色的叠加？"）。
     原因：宿主本来就有自己的 hover 底色（conversation 包 13 条 :hover、model-selection 3 条、
     permission-presets 2 条、input-trigger 3 条），我们再加一层 ::before 就是**两层灰叠在一起**。
     教训：上一轮店主说"这几个功能没有触击反馈"，我据此加了胶囊 —— 实际是那次刚把浏览器默认
     淡蓝 tap 高亮压掉、观感反差的错觉；**宿主已有的反馈不要再叠一层**。
     我们自己注入的 📎（[data-mobile-nav="file-upload"]）例外：宿主没有对应控件、也就没有底色，
     它的胶囊留在上面那组规则里。 */
  /* 命中区外扩：::after 属于按钮本身，一起参与命中测试，视觉完全不变。 */
  [data-composer-card] [data-mobile-nav="file-upload"]::after {
    content: '';
    position: absolute;
    inset: -7px;
    border-radius: 999px;
  }
  /* A busy submit phase or a subagent session refuses attachments. The host
     gates intake on canAcceptDrop (package-private), so this reads the closest
     observable facts — input phase and subagent — and keeps the control from
     opening a dialog the host would then reject. */
  [data-composer-card] [data-mobile-nav="file-upload"]:disabled {
    opacity: 0.38;
    cursor: default;
  }
  /* The hidden input[type=file] this control triggers only exists on
     0.1.6-alpha.2+ hosts (the rc generation's intake is paste/drop only),
     while the host renders the input.left seat on both generations. Hide the
     control wherever the host has no file input for it to trigger — its click
     would otherwise be a permanent silent no-op there (review 2026-09-19). */
  [data-composer-card]:not(:has(input[type=file])) [data-mobile-nav="file-upload"] {
    display: none !important;
  }

  /* --- Composer vertical slack on mobile (0.1.6 host) ---
     The host's own .card padding-top:8px + gap:12px and .row padding leave 29px of pure
     blank space in a 98px single-line card (measured). Only the vertical slack is trimmed;
     horizontal padding and both hit targets stay untouched. Scoped to the active phase on
     purpose: the hero composer's input carries the host's own min-height floor, and trimming
     it there re-creates the clip/scrollbar defect recorded under Pitfalls「hero 输入框下限」. */
  /* DSHA：输入卡片自身留白偏大。宿主那两声明全出自它自己的
     dsh-client-ui-conversation（.uV2eYG_card 是 padding-top:8px + gap:12px，
     .uV2eYG_row 再吃 padding:2px 8px 6px），单行输入时卡片 98px 里有 29px
     是纯空白。手机上只压纵向留白（真机实测 moderate 档）：
       卡片 98 -> 78、编辑器 36 -> 32、按钮行 42 -> 36、文字底到按钮顶 29 -> 19px。
     横向 padding（8px）与两个按钮尺寸（28/34px）一律不动，触控目标不变；
     编辑器仍是可增长的多行框（max-height 336px），只是单行时不再垫高。 */
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
  /* --- Session header on mobile ---
     Keep the host-owned metadata in one responsive row. The conversation
     title, the mode text and the running/subagent status all keep their
     words; the one tenant that yields width when a phone runs out of it is
     the background-job trigger's verbose label ("1 background job running"),
     while Files keeps its hit area. */
  /* Both !important flags are load-bearing. The host's session-controller sheet
     ships [data-dsh-frame] [data-dsh-responsive-part="conversation-header"] with
     padding-left: 60px !important under (max-width: 768px), so a plain
     declaration here loses however specific it is: measured 2026-09-13 at
     390px, the computed padding-left stayed 60px and the title still began at
     x=100 with our rule present, matching and later in source order. The value
     is 0 because our own toggle already occupies that left seat (painted at
     x=8-36), so the host reservation is pure dead space on a phone. */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    padding-left: 0 !important;
    padding-right: 8px !important;
    position: relative !important;
    /* Opaque AND above the flow, both required: the host bar has no background,
       and the message flow is a later sibling, so it painted OVER the bar (three
       headless screenshots 2026-10-07: transparent -> content read through the
       title row; opaque but unraised -> byte-identical to transparent, i.e. the
       background was painted underneath; opaque + raised -> pixel-identical to
       the untouched band). The scroll box runs underneath because of the
       "selection-drag autoscroll ramp" rule above (it lifts it by
       --mobile-nav-header-h). Same surface token the panel ghost uses, so themes
       carry over; the host keeps its --dsw-alias-border-l3 bottom border.
       z-index 30 clears the flow's own raised layers (host banners measured at
       z 6-7 and the marks slot / composer seat at 7 on the live host) while
       staying under this plugin's overlay tier (55+ backdrops/panels, FAB 21 is
       hero-only where the header is hidden, drawer/menus 1000+) so a dialog or
       the drawer still covers the bar. */
    background: var(--dsw-alias-bg-layer-1, #fff) !important;
    z-index: 30 !important;
  }

  /* ---------- pocket 补丁：座位底垫 / 钉底（v3.1.0 起重算） ----------
     底部安全区与输入框边距：frame 自身已垫 env(safe-area-inset-bottom)
     （v3.1.0 新增的 #193 修复），座位只补 2px 呼吸缝。旧值 calc(5px +
     env(...)) 是 v3.0.3 时代 frame 不垫底部的补偿——现在照叠会把 inset 计
     两遍（34px inset 真机 ~73px 下巴）。类名哈希代际不同时规则静默 no-op
     （与上游其余规则同一种脆弱性）。 */
  [data-mobile-nav="frame"] [class*="_composerSeat"],
  div[class*="_frame"] [class*="_composerSeat"],
  [data-mobile-nav="frame"] [data-phase] [class*="_composerSeat"] {
    padding-bottom: 2px !important;
  }

  /* 输入卡外层 root 的 8px 底垫收紧为 2px（pocket 补丁）：root 是宿主
     InputBar 的包裹层（padding: 0 … 8px），底垫只服务桌面悬浮态；移动端
     frame 已垫 inset，这 8px 属于重复留白。root 结构变化时 :has 不匹配，
     规则退化为 no-op。 */
  [data-mobile-nav="frame"] [class*="_composerSeat"] [class*="_root"]:has(> [class*="_card"]),
  div[class*="_frame"] [class*="_composerSeat"] [class*="_root"]:has(> [class*="_card"]),
  [data-mobile-nav="frame"] [data-phase] [class*="_composerSeat"] [class*="_root"]:has(> [class*="_card"]) {
    padding-bottom: 2px !important;
  }

  /* 座位钉底（pocket 补丁，10-14 真机底部空白案第二轮定案）：iOS WebKit 上
     viewArea（显式 px 高度的 flex 子项）在滚动容器 flex 列里 flex-grow 不生效
     （Blink 同构即拉伸，WebKit 停在内容高），内容不足一屏时座位按流内位置悬在
     内容末尾、与窗口底之间留出死区（真机探针 seatB=643 vs 视口 796）。座位是
     scrollBody 的直接 flex 子项，margin-top:auto 是跨引擎页脚钉底模式：有富余
     时吃掉全部自由空间把座位压到容器底，无富余（内容满/超一屏）时解析为 0、
     与 sticky 行为和长内容态完全无扰。hero 态被 [data-phase=active] 排除——
     hero 的居中布局依赖自由空间分配，auto margin 会抢走它把输入框甩到底。
     全部走宿主稳定标记（data-phase/-scroll/-seat），无哈希脆弱性。 */
  [data-phase="active"] [data-conversation-scroll] > [data-composer-seat] {
    margin-top: auto !important;
  }

  /* ---------- 键盘压矮的横屏：composer 座位必须压在顶栏之上（issue #245）----------
     报障（owner，2026-10-25）：「当输入时屏幕变为横屏时，输入框可能会错位甚至
     消失,目前只能进行刷新」。机理不是某个视口变量写错，是**两块盒子的几何打架**：
       · 宿主座位「_composerSeat」是纯 CSS 的 position:sticky; bottom:0 —— 0.2.1-rc.3
         的对话包里它只出现在样式表、类名表与 JSX，没有任何 JS 读它的 rect，也没有
         100dvh，所以座位的顶边永远 = 可见带底 − 座位高；
       · 上面那条顶栏规则把顶栏抬到消息流之上（z-index:30 + 不透明底），而
         scrollBody 的负 margin 抬升又让座位的盒区一直延伸到 y=0，于是座位与顶栏
         在没有足够高度时必然重叠。
     竖屏键盘弹起仍有 400+px，座位够不到顶栏；横屏（本机 792×360）键盘不收，布局
     视口只剩 ~110-160px，而顶栏 67-77px + 座位 70-102px 已经超过可见带 —— 座位的
     上半截（就是 Lexical 编辑行）落进顶栏的盒子里，被不透明顶栏整块盖住：用户看到
     「输入框消失、只剩发送行」；只重叠一部分时就是「错位」。sticky 滚不开，刷新会
     收起键盘，所以看起来「只能刷新」。
     标记由 effects/composer-clearance.ts 按实测几何开关（不用媒体查询：顶栏高、
     座位高、可见带三个量都随设备、输入法与草稿长度变），这里只做两件事：
     ① 让座位压过顶栏（31 > 30）——用户正在打字的表面绝不许被盖住；
     ② 横屏矮带里座位本来就放不下，先让掉次要行（dock 行：上下文圈/统计胶囊），
        把高度还给编辑行，顺带把顶栏的标题行与抽屉入口露出来。
     dock 锚稳定的 data-composer-dock（0.2.1 InputBar 行标记）与 data-composer-stats（0.1.5/0.1.7/0.2.0
     的统计行，见 pitfalls「统计条被宿主拆条」）；两代标记互不重叠，缺席的一侧自然空转。 */
  /* @patch
     id: composer-seat-above-header
     for: dsh-client-ui-conversation 0.2.1 的 composer 座位（[class*="_composerSeat"]，position:sticky; bottom:0）+ 本插件顶栏规则（header.wSkVaW_header 的 z-index:30 与不透明底）
     why: 宿主没把「座位 vs 顶栏」的层叠关系暴露成槽位或变量，而插件又必须让顶栏盖住消息流（否则消息从标题行底下透出），键盘压矮的横屏里只能由插件给座位让位；触发条件是实测几何，CSS 媒体查询写不出设备无关的阈值，故层叠覆盖只在本效果置标记时生效
     until: 宿主把 composer 做成独立浮层（座位自带高于顶栏的层叠层）或提供座位/顶栏之间的层叠契约 —— 届时整块删除
     test: tests/composer-clearance.test.ts
  */
  [data-mobile-nav="frame"][data-mobile-nav-composer-tight] [class*="_composerSeat"] {
    z-index: 31 !important;
  }
  /* 只在横屏让出次要行。竖屏里座位本来就放得下，让掉它只会让 composer 变矮 30px——
     2026-10-30 真机逐帧（402x684 竖屏）：tight=T 时 seatH=76、tight=- 时 seatH=106，
     42 帧对 65 帧，正好是统计行那一行的高度；店主的「输入框缩下去」就是这个。
     z-index 那条不受影响：竖屏里它只负责让座位压过顶栏。 */
  @media (orientation: landscape) {
    [data-mobile-nav="frame"][data-mobile-nav-composer-tight] [class*="_composerSeat"] [data-composer-dock],
    [data-mobile-nav="frame"][data-mobile-nav-composer-tight] [class*="_composerSeat"] [data-composer-stats] {
      display: none !important;
    }
  }
  /* The hero phase's empty header must stay hidden on phones. The host hides
     it via the headerHidden class at (0,1,0), but its own session-controller
     sheet re-shows the conversation header as a grid at <=768px —
     [data-dsh-frame] [data-dsh-responsive-part="conversation-header"] with
     display grid at (0,2,0) — and that beats the hide on the very element
     carrying both classes. Result measured 2026-09-19 at 390px: an empty 85px
     header paints only its 1px border-bottom (--dsw-alias-border-l3) as a stray
     gray hairline under the status bar (pixel-scanned at y=84-85,
     rgb(224,224,224)); desktop keeps display none and no line. Our (0,3,1)
     re-hide needs no !important: the grid rule's display is a normal
     declaration and our style tag loads last. The header carries no children in
     hero (drawer entry is the FAB), so hiding it frees the dead 85px too. */
  [data-mobile-nav="frame"] [data-phase] header[class*="_headerHidden"] {
    display: none;
  }
  /* 0.1.6-alpha.2 renamed the hero-empty marker: headerHidden -> headerBlank
     (audit §1 row 3), so the rule above is a dead needle on alpha.2 and this
     one is dead on rc hosts — together they cover both generations. Same
     (0,3,1) shape, same no-!important reasoning as above. */
  [data-mobile-nav="frame"] [data-phase] header[class*="headerBlank"] {
    display: none;
  }
  /* Header popovers resolve against the header, not against their 28px flow
     box. 0.1.5's background-job chip anchors its menu with
     position:absolute; top:calc(100% + 5px) inside .QsffPG_root
     {position:relative} — a 28px-tall chip — so the menu was laid out at
     x=-16 (our right:8px resolved against that 156px chip root) and then
     clipped twice: by our own overflow:hidden on the chip root and by the
     host's [data-dsh-responsive-part="session-title-cluster"]
     {overflow:hidden}. The chip still reported aria-expanded=true with
     nothing painted and nothing hit-testable: measured 2026-09-14 at 390px,
     menu rect [-16,49,336,40], elementFromPoint at its centre returned the
     view tabs row. A positioned header plus a static chip root puts the same
     menu at [46,77,336,73] — inside the viewport, its rows hit-testable, and
     an outside tap still dismisses it (menus 1 -> 0). On 0.1.6-alpha.2 the
     chip leaves the flow entirely (absolute, in the gated block below), and
     this rule's higher specificity ((0,6,2) vs the new (0,4,1)) would pin it
     static there too — so it is excluded on alpha.2 hosts via :not(:has(...))
     and keeps governing rc hosts (review 2026-09-19).
     BOTH halves are load-bearing: forcing the chip root static without
     positioning the header moves the containing block out to the frame, and
     the menu lands at x=8 y=849 — past the 844px viewport (A/B 2026-09-13).
     Scoped to the header actions slot, so the subagent lineage root inside
     the crumbs keeps its own anchored, fixed-position menu. */
  [data-mobile-nav="frame"] [data-phase] header:not(:has([class*="_headerLeading"])) [class*="_headerActions"] [class*="_root"]:not([class*="_switcherRoot"]):has(> button[class*="_trigger"]) {
    position: static !important;
  }
  /* The tab strip is a separate grid item from the title row and does not
     inherit the title row's inset, so after the header padding above went to 0
     it sat flush against the bezel (measured: tablist x=0, first tab 0..30
     while the title starts at 40). Give it the same left inset as the toggle so
     the two rows read as one column. */
  /* ---------- 手机档专属：头部留白收紧（≤767px + coarse）----------
     数值是照 360×754 真机量的（页签条 margin-top -4 / 页签下划线 5px /
     页签按钮去上内边距、靠底对齐 / 标题行回到内容高度）。**只对真·手机档生效**：
     768–1023 的平板档保持上游手机 UI 的排布，不套这台手机的魔数
     （仓库既有惯例，见文件末尾的 DSHA 预设块）。
     真机读数（修前 → 修后）：头部 77 → 67px、标题↔页签文字间距 22 → 15px。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header [class*="_tabs"] {
      padding-left: 8px !important;
      /* 2026-09-23 店主："标题和下面『对话』中间的空白有点多"。
         宿主给这条页签条 margin-top:10px，页签按钮自己还带 padding-bottom:9px
         （给选中下划线留位），两行文字之间就空出一条。收紧：
         margin 归零（真机 4 → 0）+ 下划线贴到 5px（页签条 36 → 31px）。
         ⚠ 选择器必须用**后代**：页签条外面套了一层 display:contents 的 div
         （真机链：div.wSkVaW_tabs < div[0..0] < header.wSkVaW_header），
         所以原来的「header > [class*="wSkVaW_tabs"]」是条死规则 —— padding-left
         从来没生效过（现按后代写，值仍是实测的 8px，视觉不变）。 */
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }
    /* 2026-10-20 五轮（真机截图实测）：上面那条 5px 一直没生效 —— 宿主按钮自带
       padding: 0 0 9px，App 注入表又把它钉回 9px，所以文字离下划线 10px、离标题只有
       7px（店主：「太挤了，把对话那一行移动贴近下面那条线」）。改用宿主稳定的
       data-conversation-tabs 标记 + html body 前缀把特异性拉满，把下内边距压到 3px：
       文字随之下沉 6px —— 贴近分隔线，同时标题侧的留白回来。 */
    html body [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-conversation-tabs][role="tablist"] > button[role="tab"],
    html body [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-conversation-tabs] > button[class*="_tab"]:not([class*="_tabs"]) {
      /* 2026-10-20：店主「先把刚刚的改动还原」——回到上一版定稿的 6 / 3
         （总高仍是 16 + 9 = 25px，文字下沉、下划线不动）。后续再按店主给的目标间距调。 */
      padding: 6px 0 3px !important;
    }
    /* 2026-10-20 修正：页签条的 margin-top **是有效的**（早前判定"无效"是误判 —— 当时
       与行高改动叠在一起，测到的位移被行高变化掩盖）。经验公式（设备像素）：
       间距 ≈ 67.5 + 3.81 × (row-gap + margin-top)；基线 margin-top 由本文件下方
       「header:has(_headerLeading) [role="tablist"] { margin-top: 4px }」 给出。
       终态 = row-gap 3.5 + margin-top −8 ⇒ 净 −4.5 ⇒ 实测 50（店主定稿）。 */
    html body [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-conversation-tabs][role="tablist"],
    html body [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-conversation-tabs][role="tablist"] {
      /* 必须压过本文件下方 header:has(_headerLeading) [role="tablist"] 的 4px（(0,4,1)），
         所以这里挂满 data 标记（(0,5,3)）；只写 [role="tablist"] 会输。 */
      margin-top: -8px !important;
    }
    /* 2026-10-20（终态）：「标题↔对话」间距的唯一有效旋钮是 header 的 row-gap。
       两行网格先回到内容高（App 注入表原本钉死 40px + 36px），再由 row-gap 撑缝：
       页签行整体下移、header 跟着长高 ⇒ 标题侧留白变大、对话到下方黑线的距离不变。
       实测（设备像素）：auto/0 → 37；+6px → 60；+3.5px → 50（店主定稿值）。
       页签条自身的 margin-top 被 App 表钉死，-4/-8/0/6px 四个值都无效，已放弃。 */
    html body [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
      grid-template-rows: auto auto !important;
      row-gap: 3.5px !important;
    }
    /* 页签行钉到内容高（16px 行高 + 5px 下划线位 = 21px）：文字与下划线贴住行底，
       不再在 36px 的老行高里居中，多出来的空白由上面的 row-gap 统一管理。 */
    html body [data-mobile-nav="frame"] [data-phase] header [role="tablist"] {
      min-height: 0 !important;
      height: 21px !important;
      align-items: flex-end !important;
    }

    /* 真机读数：头部的 grid-template-rows 被钉成固定的 40px 36px（宿主自己没写行高，
       是 DSHA 那张表给的），于是标题行、页签行都各留一截死空间。改成 auto：两行各自
       贴住内容，标题行按 36px 的预设 chip 走、页签行由页签按钮撑开。 */
    /* 标题行实测 40px 高，而里面最高的东西是 36px 的预设 chip（"标准模式"）——
       多出来的 4px 是死空间。让行高回到内容高度（用 auto + min-height:0，
       不写死 36：将来标题簇里出现更高的东西（子代理谱系等）也不会被裁）。 */
    html [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleRow"] {
      height: auto !important;
      min-height: 0 !important;
    }
    /* 页签按钮文字上方还有 6px 空白（按钮被容器撑到 32px 高、文字居中）：去掉上内边距，
       下内边距 5px 已在上面钉住（下划线位置不变）。 */
    html [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_tab"]:not([class*="_tabs"]) {
      padding-top: 0 !important;
      align-self: flex-end !important;
    }
  }
  /* NOTHING extra here on purpose. The header's own padding is already forced
     to 0 above, and the title row carries padding-left:40px of its own, so the
     title lands at x=40 - the toggle's right edge (36) plus 4px. A negative
     margin added on top of that over-corrected and pulled the title off the
     left edge (measured 2026-09-13: crumb x=20, and the string's first glyph
     painted partially outside the viewport), so the reclaim lives in exactly
     one place: the header padding. */

  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) > :first-child {
    display: flex !important;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    gap: 2px;
    /* Just enough for the toggle (28px at left:8 -> right edge 36) plus 4px of
       breathing room; the host's 60px rail reservation is neutralised above. */
    padding-left: 40px;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) > :first-child > :first-child {
    display: flex !important;
    align-items: center;
    flex: 1 1 auto;
    min-width: 0;
    gap: 2px;
  }
  /* The directory toggle stays at the far left of the header. */
  [data-mobile-nav="toggle"] {
    position: absolute !important;
    left: 8px !important;
    top: 12px !important;
    z-index: 2 !important;
  }
  /* The files opener is pinned to the header's right corner, mirroring the
     directory toggle on the left (same 8px edge, same 12px seat). In flow it
     can never reach that corner: the host reserves the last 44px of the title
     cluster for a utilities seat that is EMPTY on mobile - measured at 390px,
     headerUtilities sits at x=374 with width 0 while the title cluster carries
     padding-right: 44px - so the button stopped at x=300..328 and left 62px of
     bare header to its right (2026-09-14 phone-side report: the opener is not
     pinned to the top-right corner). Absolute positioning also returns its
     28px of flow width to the title lane, and the containing block is the same
     one the toggle resolves against, so both controls shift together with the
     frame's safe-area padding. The 44px reservation itself is trimmed to the
     28px band this button actually paints in the compact-rows block below, so
     the title lane keeps the difference. */
  [data-mobile-nav="files"] {
    position: absolute !important;
    right: 8px !important;
    left: auto !important;
    top: 12px !important;
    z-index: 2 !important;
  }
  /* 手机档（≤767 + coarse）：文件夹按钮右移 4px（原 8px），为标题行右簇再腾出空间。
     与左侧 ☰ 的 8px 不再对称，是用户明确接受的取舍（2026-10-12 用户规格）。
     平板档这一档没被要求动，所以留在这条手机档作用域里；共用档保持本批之前的值。 */
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
  /* The title takes the remaining width and never paints outside it; the
     metadata lane's mode text is what shrinks first. */
  /* min-width is a readable floor (2026-09-13 phone report: the title showed a
     single glyph then an ellipsis). This lane has flex basis 0, so it is the
     first thing every crowding neighbour eats: measured at 320px with a lineage
     chip in the row, the crumb client width collapsed to 16px and NOTHING of
     the title was painted. 30% of the row keeps 2-4 CJK glyphs plus the host's
     own ellipsis whatever else is pinned next to it. */
  [data-mobile-nav="frame"] [data-phase] header [class*="_crumbs"] {
    flex: 1 1 0;
    min-width: 30%;
    max-width: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }
  /* Mode label: keep the icon AND the words. On a phone this chip is the only
     mode switcher there is, so its text is not the surplus it was once
     treated as: the longest preset name measured needs 121px including the
     18px icon seat, while the old cap min(22vw, 220px) allowed just 85.8px at
     390px — the text was clipped at every phone width even before the
     crowding rules below pinned it to the icon alone (2026-09-14 phone
     report: the mode label showed only its glyph). 38vw keeps the label whole
     from 320px up and still lets it ellipsize before the title on wider
     screens. */
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
  /* Running/subagent controls keep their full status text and hit area; they
     do not give up width to the mode label. NOTE: the real subagent lineage
     root has class="ZKlsPq_root " — a TRAILING SPACE from the plugin's
     template-literal className — so [class$="_root"] never matches it. Use
     [class*="_root"] and exclude the switcher root ([class*="_switcherRoot"])
     so only the count/job roots get pinned (the switcher must stay shrinkable
     so its own title can ellipsize). */
  /* Pinned (flex 0 0 auto) with a max-width cap. A shrinkable chip is squeezed
     below its content and the count reads as clipped or overwritten (the
     2026-08-22 report), while a bare max-content pin eats the session title,
     whose flex basis is 0: measured 2026-09-13 at 320px, the crumb went 68px
     -> 16px and the painted title was EMPTY while the chip kept its full text.
     Pinned + capped + the crumbs min-width floor above is what holds both —
     the title ellipsizes, the count keeps its words, and the hit area stays
     one inline-flex button.
     NOTE: the popover containment lives with the header rules above, which
     force this root position:static. That only works together with the
     positioned header: static on its own moved the containing block out to
     the frame and the menu landed at x=8 y=849, past the 844px viewport
     (A/B 2026-09-13). */
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
  /* The lineage count's leading "/" (ZKlsPq_separator — official desktop
     chrome rendered only for a root session inside the crumbs) looks like a
     stray extra breadcrumb level on small screens; hide it. The crumbSep "/"
     between ancestry segments (subagent sessions) is a real separator and
     stays. */
  [data-mobile-nav="frame"] [data-phase] header [class*="_crumbs"] [class*="_separator"] {
    display: none !important;
  }
  /* The header's right-hand slot clips its own dropdown away (0.1.5 host bug).
     wSkVaW_headerUtilities is a 44x44 grid cell with overflow:auto, and the host
     mounts its "More actions" menu INSIDE it: the menu is 218x52, so the cell
     clipped it to 44x44 and the menu was never painted and never hit-testable
     (measured: menu rect 156,56 218x52, computed flex/visible/opacity 1, yet
     elementsFromPoint at the item centre returned the view tabs row and nothing
     from the menu). Raising the menu z-index cannot help - the cell's own
     stacking context traps it. Releasing the overflow paints the menu where the
     host positioned it, and the item then works (verified: a real tap opening
     the session-log export dialog, menus 1 -> 0 dialogs 1). Scoped to the mobile
     branch and to this one cell, so desktop keeps the host layout. The section
     is hidden on mobile anyway - the drawer footer carries the same action - but
     the release stays for any plugin that registers a header dropdown here. */
  [data-mobile-nav="frame"] [data-phase] header [class*="_headerUtilities"] {
    overflow: visible !important;
    /* The seat is empty on a phone (its only button is hidden just below) yet
       still 44px tall, which floors the whole title row — see the compact-rows
       block after the tab strip. */
    height: 30px !important;
    min-height: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_headerUtilities"] [class*="nL4_yW_moreButton"] {
    display: none !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [data-mobile-nav="files"] {
    width: 28px;
  }
  /* Session log download: gone from the header row on mobile (the utilities
     seat holds only the session-log-export capsule).
     ⚠ 作用域必须是会话顶栏本身（header.wSkVaW_header），不能写成裸 header：
     提问卡（dsh-client-ui-user-questions）的 Mbwy4a_frame 就渲染在 composerSeat 里、
     也在 [data-phase] 之下，它的 Mbwy4a_header > headingBlock > :last-child 正是问题正文
     <h2>。裸 header 版本把问题正文整行 display:none —— 店主「你提的问题被吞掉了」即此
     （2026-10-20 真机 DOM 取证：h2 computed display:none，逐条禁用本样式表内的规则定位到
     这条）。顶栏的签名类由宿主 ConversationRoot.module.css 的 .header 提供（wSkVaW_header），
     本文件其它顶栏规则同样以它/其子类作代际锚。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) > :first-child > :last-child {
    display: none !important;
  }
  /* View tabs strip (official [role="tablist"] under the crumbs row).
     Desktop ships a single flex row (gap: 36) sized for the two stock tabs
     (对话/轨迹). Plugins register further views (memory / skill / todo
     panels, per-plugin settings pages), and once the count passes two the
     shrinkable buttons collapse to their min-content: CJK labels stack one
     glyph per line (staircase), latin labels break word-per-line — the
     strip eats a screenful of vertical space (#41, 8 tabs, HarmonyOS
     browser). Scroll the strip horizontally instead — the standard mobile
     tab-bar pattern — with every label kept whole (flex-shrink: 0 +
     nowrap). Affordance is the peek: the naturally cut-off tab at the right
     edge says "more this way" (unlike the settings navList, whose buttons
     nearly fit and would show no cut edge), which is why this strip scrolls
     while that one wraps. touch-action: pan-x opts the strip into
     horizontal panning — the root's pan-y intersection stops at this first
     scroll container (same mechanism as the drawer's pan-y), so the page
     never scrolls sideways. overscroll-behavior-x: contain stops a flick
     from chaining past the ends; snap keeps tabs edge-aligned after a
     fling; the scrollbar stays hidden like every native tab bar. */
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
  /* Compact session header rows (2026-09-14 phone report: the top is very
     empty). The host's own mobile sheet lays the header out as
     grid-template-rows: minmax(32px, auto) minmax(44px, auto) with
     [role="tab"] { min-height: 44px }, and both rows then grow to 44: the
     title row is floored by the empty utilities seat above, the tab row by the
     buttons' own floor. Measured at 390px: header 97px = 8 padding + 44 + 44 +
     1 border, for 36px of painted content. Capping the rows at 36/32 and the
     tabs at their own content height gives 77px, with nothing else degraded —
     title, mode text, status chips, chevrons and both pinned corner buttons
     keep their measured geometry, and the tab strip keeps its #41 contract
     (horizontal scroll, 16px gap, whole labels, pan-x).
     The host's 8px padding-top is deliberately kept: the title row's 28px
     content then centres at y=26, exactly the centre of the pinned corner
     controls (toggle and Files opener both sit at top:12, 28px tall). Trimming
     that padding to 4 shaved 4 more px but left the text row visibly riding
     above both buttons (2026-09-14 phone report: the text row sits too high
     against the drawer and Files controls), so the row height is what pays for
     the compaction, not the alignment.
     :has(> *) guards the hero header: it is an EMPTY, host-hidden grid that
     still occupies 85px while the composer is laid out under it. In the hero
     the header has 0 element children, so the guard leaves it at its official
     height — measured, the hero composer rect [0,349,388,231] is identical
     with and without this block. */
  [data-mobile-nav="frame"] [data-phase] header:has(> *) {
    min-height: 0 !important;
    /* 2026-09-23 二轮：页签行地板 32 → 26（店主："标题和下面『对话』中间空白有点多"）。
       标题行地板保持 36 —— 它下面的文字要跟 top:6 的圆形按钮对齐（实测文字中心
       y=20 = 圆形按钮中心），压标题行会把文字顶得比按钮高（2026-09-14 已踩过）。
       页签按钮的 32px 地板同理下到 26px（文字 16px + 下划线留 5px），
       页签条的下沿随之从 76 收到 66。 */
    grid-template-rows: minmax(36px, auto) minmax(32px, auto) !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [role="tab"] {
    min-height: 32px !important;
  }
  /* 手机档专属（≤767px + coarse）：页签行地板 32 → 26（下划线收到 5px 后仍够点）。
     平板档保留 32px 的既有值，不跟手机一起压。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has(> *) {
      grid-template-rows: minmax(36px, auto) minmax(26px, auto) !important;
    }
    [data-mobile-nav="frame"] [data-phase] header [role="tab"] {
      min-height: 26px !important;
    }
  }
  /* 横屏短高度（旋转后的手机 / 横置的小平板）：宽度 ≥768 的档位在横屏里会掉进平板档
     的 87px 头部，但可用高度只剩 375–480px —— 顶栏 + 输入区 + 统计行吃掉近一半。
     2026-10-29 无头宽度矩阵实测 812×375：header 87 + 座位 92 = 179px，正文只剩约
     196px（#245 的横屏场景）。
     本轮只收行高地板（页签 32 → 24），实测 87 → 80；页签自身还挂着 9px 下内边距
     （下一轮按真机读数再定，别在这里猜）。只按「形状」（横屏 + 高度 ≤480）收紧，
     不按宽度分平板档：竖屏、桌面档与真正的高平板都不命中；页签 24px 也不与 ≤767
     手机档的 26px 定稿值重复（那条手机档值由 phone-tier-gating 测试锁着）。 */
  @media (max-height: 480px) and (orientation: landscape) {
    [data-mobile-nav="frame"] [data-phase] header:has(> *) {
      grid-template-rows: minmax(36px, auto) minmax(24px, auto) !important;
    }
    [data-mobile-nav="frame"] [data-phase] header [role="tab"] {
      min-height: 24px !important;
    }
  }
  /* The title cluster reserves its last 44px for that empty utilities seat.
     The lane's right edge must stay clear of the Files opener's HIT BOX,
     otherwise the opener eats the trailing chips' taps. The pre-2026-09-22
     value (26px, a width optimisation) only cleared at the 390px test width:
     measured at 360x754 (dpr 4) the Agent Team chip ran to x=334 while the
     opener's 36px box started at x=316 — an 18px overlap, so tapping the
     chip's tail opened the Files panel. The reference phone UI shows the lane
     ending at ~314 with the opener box at 316..352, i.e. the full 44px seat
     plus 2px of breathing room, so restore that instead of narrowing the
     opener: 46px clears the 36px box at right:8 by 2px at every width. */
  [data-mobile-nav="frame"] [data-phase] header [class*="_titleCluster"] {
    /* 本批之前的值。2026-10-12/13 那串「46 → 40 → 36 → 32 → 26 → 34」的实验
       **只针对手机档**（后台任务圆点搬进标题行后与预设 chip 的间距），已整串
       搬进下面那条手机档作用域；共用档（= 平板档）保持本批之前的 46px 不动。
       预留从 padding 改记 margin（2026-10-17）：标题簇是 overflow:auto 的滚动
       容器，内容溢出时的裁剪线是 **padding box** —— 写在 padding 上会留下 46px
       的「可绘制溢出区」，挤爆的那一截 chip 正好画进预留带、被绝对定位的文件
       按钮压住（真机症状：预设 chip 末字被文件夹图标盖住）。改记 margin 后簇的
       border box 收在预留带左侧，溢出再大也止步于按钮之前，内容宽度不变
       （345 − 46 ⇄ 299 − 0）。 */
    padding-right: 0 !important;
    margin-right: 46px !important;
  }
  /* Header crowding on narrow phones.
     Three tenants want the same row: the session title, the mode chip and the
     status chips. The mode chip is the only mode switcher a phone has and the
     title is the only session identity, so both keep their words and the title
     ellipsizes instead (measured 2026-09-14 at 390px with a lineage chip
     present: after this the mode label keeps 101px of text and the crumb
     135px).
     The lineage root (dsh-client-ui-subagent) sits in the crumbs for BOTH
     running and idle descendants, so the guards below key on that root rather
     than the transient running-state dot — otherwise the row would reflow the
     moment agents go idle. Match roots with [class*="_root"] (the real class
     carries a trailing space; [class$="_root"] matches nothing).
     The background-job label used to yield here through two width-gated rules
     (<=440px, and <=559px when the lineage chip was present). Both were keyed
     on the chip's classed wrapper, which host 0.2.1 no longer renders, so they
     are deleted: the label is now hidden unconditionally by the job-chip rule
     in the phone-scope section (see header-job-chip-collapse). */
  /* With the subagent lineage (any state) AND a background job present
     together, 390px cannot hold the title, the mode words and the lineage
     count at once; the crumb gives 8px back to the action lane. */
  @media (max-width: 559px) {
    [data-mobile-nav="frame"] [data-phase] header [class*="_crumbs"] {
      padding-right: 8px;
    }
  }
  /* Last resort on 320px-class screens: the title and both status chips cannot
     share the row with the mode words, so the mode chip keeps only its icon. */
  @media (max-width: 359px) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_crumbs"] [class*="_root"]):has([class*="_headerActions"] [class*="_root"]) [class*="_label"]:has(> svg) {
      display: none !important;
    }
  }

  /* --- 顶栏状态 chip 座位契约：**暂缓**（2026-10-12 受控实验后整块撤回）---
     用户规格：「子智能体 chip 固定不变，后台任务 chip 出现在它左侧、间隔 2px」。
     首版用 flex 容器 + order + gap 实现，**受控实验证明该机制不成立**：
     子智能体 chip（ZKlsPq_root）在 alpha.2 代宿主上被插件自己钉成 position:absolute，
     绝对定位元素脱离文档流，flex 的 order 与容器 gap 都决定不了它的落点 ——
     注入一颗合成 jobs chip 后该 chip 实测从 x=292 跳到 x=174（视觉间距 −211px），
     三个目标点无一达成；容器 computed gap 也仍是宿主自己的 4px。
     真实 jobs chip 无法在受控环境构造（宿主在后台任务数为 0 时整颗不渲染），
     故本条**已整块撤回**，等拿到「真机带后台任务的截图 + 视觉稿」后按绝对定位口径重做。
     撤回是安全的：本组只在两颗 chip 同时在场时匹配，撤掉后单 chip 形态回到既有那批
     规则的管辖（受控实验：单 chip 的 rect 与撤前逐像素一致，规则匹配数=0）。 */

  /* --- Header popovers on mobile (dsh-client-ui-jobs / dsh-client-ui-subagent) --- */
  /* Both entries sit in the session header and both anchor their panel to the
     trigger's left edge (left:0 inside their own root), so clamp them to the
     viewport. The background-job menu resolves against the header (see the
     containment rules at the top of this section) and the subagent lineage
     menu is position:fixed, so right:8px pins either panel 8px from the
     phone's right edge: measured [46,77,336,73] for the job menu and
     [38,41,336,58] for the lineage menu at 390px, both fully inside the
     viewport. Do NOT clamp with left:8px: measured, that put the panel at
     x=350..686 (off-screen) against a right-anchored x=30..366. */
  [data-mobile-nav="frame"] [data-phase] header [class*="_menu"] {
    left: auto !important;
    right: 8px !important;
    width: min(336px, calc(100vw - 16px));
    max-width: none;
    max-height: min(420px, calc(100vh - 120px));
    max-height: min(420px, calc(100dvh - 120px));
  }

  /* --- 0.1.6-alpha.2 session-header adaptation (audited on a real device) ---
     The 16-item reconciliation in docs/upstream/2026-09-19-mobile-header-0.1.6-adaptation.md,
     landing the 14 items whose anchors exist in 0.1.6-alpha.2 host builds. Two preset items
     (#6/#7) are deliberately omitted: they anchor on .dsha-preset-header-anchor, a marker
     that exists only in the DSHA build, so they would be dead rules here.
     GENERATION GATING: only _headerLeading/_crumbCurrent/_crumbSeg/_headerCorner are
     alpha.2-only classes — every other anchor below (_titleCluster/_crumbs/_headerActions/
     _headerUtilities/tablist/QsffPG_/ZKlsPq_ and the :first-child chains) also exists on
     0.1.5-rc hosts, where these rules would silently re-tune geometry the older rules
     measured (review 2026-09-19). Every selector therefore carries
     header:has([class*="_headerLeading"]): the whole block is dead on pre-alpha.2 hosts and
     the rc-generation rules keep governing there unchanged. */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    /* 顶部留白收窄：宿主 header 自带 padding-top: 10px、标题行再垫 2px，
       叠在刘海/状态栏避让之上就显空。这两处一起清零。 */
    padding-left: 8px !important;
    padding-right: 8px !important;
    padding-top: 0 !important;
    /* 宿主 header 有 min-height: 76px，而内容只有 ~69px，底部会垫出 7.6px 空白
       （实测：标签行底边 106，header 底边 113.6）。贴底定位的状态 chip 会被这
       段空白顶下去、和标签行错开。手机上让 header 贴住内容高度。 */
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
  /* 目录开关跟着一起上移，保持与标题/按钮同一行居中。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-mobile-nav="toggle"] {
    top: 6px !important;
  }
   /* 空座位不判空、只塌宽：a2 槽位渲染器永远在 headerLeading 里挂一个
      [data-slot] 包装元素（display:contents、0×0），:empty 与 :not(:has(*))
      两种「空」判定都恒不命中（宿主自己的 :empty 规则同样失效），而
      display:none 又会在某代真的渲染控件时误藏真控件。这里不判定空不空，
      只把第三方误标进来的预留 padding 塌掉——web-all 兼容层按 0.1.5 结构
      把本座位误标成 session-title-cluster，注入 padding-inline-end:44px，
      座位于是 0 内容 + 44 padding = 44px 死占（实测 390px：座位
      [40,22,44,0]、titleCluster 被顶到 x=84）。padding 归零后空座位 = 0×0，
      真有内容的宿主也不受影响（内容盒照常渲染）。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerLeading"] {
    /* 不能塌掉左侧座位本身：上面那条（> :first-child）给本座位留了
       padding-left:32px 作面板开关的座位，而 padding: 0 !important 是
       简写，会把它一并清零。两条规则特异性同为 (0,4,1)，按源序本块在后
       ⇒ 简写胜出，座位塌成 0×0、网格第一列 0px、标题直接压到 left:8 的
       面板按钮上（真机实测 2026-09-22，360x754@4：crumbs x=8、
       toggle 8,6 28x28；真机 DOM 规则枚举确认胜出者就是本块）。
       NOTE: 本文件整体是 JS 模板字符串，注释里绝不能出现反引号。 */
    padding: 0 !important;
    padding-left: 32px !important;
  }
  /* --- 0.2.0-rc.x：header 变 grid，座位从 titleRow 内部搬到了 header 自己的第一列 ---
     上面两条把「面板开关的 32px 座位」记在座位自己身上（padding-left）。在
     0.1.6-alpha.2 里 headerLeading 是 titleRow 的第一个孩子，这个 padding 就是
     titleRow 内容盒的起点，标题的 40px 落点是它直接算出来的。0.2.0-rc.x 把 header
     改成 grid-template-columns: auto minmax(0,1fr)：座位成了 header 的直接孩子
     （grid-area: 1/1），titleRow 独占第二列（grid-column: 2），于是标题的 40px 落点
     变成「网格第一列恰好 32px」的副作用——座位一旦被谁塌掉（padding 被覆盖、宽度被
     第三方归零、display 被藏），第一列就回到 0px，标题立刻压到 left:8 的圆形开关上。
     2026-09-22 在 0.1.6 上实测过同一个失败面（座位被 padding 简写清零 → 第一列 0px
     → crumbs x=8、toggle 8,6 28x28），当时靠把 padding-left 补回来止住；这一代改成
     把座位记在标题行自己身上：padding-left 加在 titleRow 上（border-box，不撑破第二
     列），座位格归零，标题落点不再依赖座位格存在、也不依赖它的宽度算得对不对。
     判别式是「座位是不是 header 的直接孩子」——0.1.6 及更早座位在 titleRow 内部，
     整块不命中，老规则原样管老宿主。
     附带修掉一条静默漂移：老规则「header > :first-child > :last-child { display:none }」
     在 0.1.5 藏的是会话日志胶囊；0.2.0 里 header 的第一格是座位，它最后一个孩子是
     conversation.header.leading 槽的包装元素，整条规则于是变成「藏掉整个 leading 槽」
     （实测：往槽里注入 28x28 按钮，计算盒 0x0）。手机档这一格是插件自己的抽屉开关
     （绝对定位 left:8），槽里的控件必然和它叠在一起，所以「藏」的结果是对的、理由
     一直没写下来；这里按槽名显式藏，别再靠 :last-child 误伤。
     NOTE: 本文件整体是 JS 模板字符串，注释里绝不能出现反引号。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has(> [data-conversation-header-leading]) > [data-conversation-header-leading] {
    width: auto !important;
    min-width: 0 !important;
    padding: 0 !important;
    gap: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has(> [data-conversation-header-leading]) [data-slot="conversation.header.leading"] {
    display: none !important;
  }
  /* 这里从一开始就用 [class*="_titleRow"] 后缀形（不是 [class*="wSkVaW_titleRow"]）：
     全包只有 titleRow 含这个片段（无前缀重叠，且已被 header:has 门控），后缀形对哈希
     前缀改名免疫——座位记错地方的代价是标题静默压回开关上，不值得为风格统一冒这个险。
     2026-10-30 宿主把前缀从 wSkVaW_ 换成 tlcmdG_ 时，只有这条活着，全表其余 9 条
     前缀形选择器当天全部归零（标题簇预留、corner 去重、tabs/tab/titleRow/
     headerUtilities 全灭），随后统一改成后缀形。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has(> [data-conversation-header-leading]) [class*="_titleRow"] {
    box-sizing: border-box !important;
    padding-left: 32px !important;
  }
  /* 0.1.6 的新头部里，titleRow 的第一个孩子是新增的空座位
     headerLeading（macOS 桌面控件，安卓上渲染 null）。插件按 0.1.5 老结构
     写的「header > :first-child > :first-child { flex: 1 1 auto }」现在套在
     这个空座位上，于是它吃掉全部剩余宽度、把标题顶到右侧（实测 411px 宽
     屏幕上标题被推到 131px 处）。让它不参与伸缩即可——有内容时也不会塌。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) > :first-child > :first-child {
    flex: 0 0 auto !important;
    width: auto !important;
    min-width: 0 !important;
    gap: 0 !important;
  }
   /* 第三方兼容层（@linxin666/dsh-web-all 的 web-ui-compat 行）按 0.1.5 结构
      把本代 titleCluster 误标成 session-utilities，给里面所有按钮注入
      min-width/min-height:44px + flex:none：toggle/files、模式/团队/面包屑
      按钮全被顶成 44 —— toggle (8,6,44,44) 中心 28、files (338,2,44,44)
      中心 24、标题带中心 22 三心不齐；files 加宽后越过 headerActions 流右缘
      6px（338 < 344）。宿主 0.1.6-alpha.2 自身没有任何 44px 下限（全包
      grep 零命中），这里把外来下限归零：控件回到各自设计尺寸（toggle 28
      来自 base.css、files 36 来自下面的 a2 专条、chips/面包屑回宿主自然
      高度），三心回到 20，titleCluster 的 min-height:40 !important 重新
      主导行高。QsffPG/ZKlsPq 两个状态 chip 用 :not 明确豁免：它们的
      25px 下限由后面 min-height:25px !important 专条供给，特异性 (0,4,1)
      低于本条 (0,7,1)，不豁免会被顺手压掉，不靠书写顺序。 */
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
    /* 三级间隙 6 → 4（2026-09-23 用户拍板）：团队 chip 在手机档被宿主
       @container(width<=480px) 藏掉标签、只剩 14px 图标（对账见 §6），
       这一行不再需要 6px 的呼吸量；收成 4px 让「模式 / 团队 / 文件夹」
       看起来是一组。 */
    /* 本批之前的值。2026-10-12 的「标题这一行三个之间放宽到 6px」只针对手机档
       （后台任务圆点搬进标题行后与预设 chip 的间距），已搬进手机档作用域。 */
    gap: 0 4px !important;
    justify-content: flex-start !important;
    align-items: center !important;
    /* 簇溢出守卫，随断点 A 无条件化并入本显示规则（原为独立条）：极端
       字体下 crumbs 触地板后的残余溢出保持可横滑，不依赖 web-all 垫片
       （缺席时簇溢出默认 visible，会压画到 corner 按钮上）；内容放得下时
       本声明完全惰性。x:auto 把 y 也算成 auto，簇内容高 ≤40px 恒不纵溢
       无实害；findHorizontalScroller 对 overflow-x 容器让位。 */
    overflow-x: auto !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleCluster"] > [class*="_crumbs"] {
    /* 标题改成自适应：面包屑条吃掉动作区之外的剩余宽度，标题多长就显示多少，
       装不下时由每一段自己的滑动窗口（见下）横向滑。min-width 保底 4 字，
       防止预设名字很长时把标题挤没。 */
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
  /* 标题本体：自适应宽度 + 横向滑动。宽度由上面面包屑条的剩余空间决定，
     装不下时在本段内左右滑（touch-action: pan-x 让浏览器先认领横滑，
     左缘抽屉手势不会抢走这一笔）。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_crumbs"] [class*="_crumbCurrent"] {
    flex: 0 1 auto !important;
    width: auto !important;
    min-width: 0 !important;
    /* 6 个汉字上限：6×14px + 左右 padding 16px = 100px。再长就在本段内横滑，
       这样标题永远不会顶到右侧的预设。 */
    /* 本批之前的值（100px 横滑窗 + 硬切）。2026-10-12 的「缩到 80px 再改省略号、
       最后取消硬顶改 max-width: 100%」只针对手机档（子智能体 chip 进标题行后
       要让出约 100px），已整串搬进手机档作用域；共用档（= 平板档）保持不动。 */
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
  /* 面包屑的父会话段同样是 <button>，不设窗口就会顶出去（子代理会话实测）。 */
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
    /* 断点 A（用户拍板 2026-09-19，全移动档无条件生效）：动作行不参与收缩，
       chips 按自然宽渲染，收缩职责全数交还 crumbs 滑动窗口当避震器。
       根因链：内容是字体相对的、预算是固定像素的——headless（CJK
       fallback 字体）文字窄、真机（另叠加 Android fontScale）文字宽，
       flex:0 1 auto 按 basis 比例收缩时行内唯一无下限的项是模式 label
       （min-width:0），真机截成「创造…」「Agent Te…」而 headless 全字。
       为什么无条件化：首版用 min-width:377 分档（按 390 假设视口的 k≈1.2
       破坏点推演），真机 diag 读数证伪——设备实测视口 360、dpr 3.5
       （vivo V2425A，Android 16，Chrome 151），整台设备落在档位之下，A 档
       从未绘制、旧收缩机制照跑、芯片照压；同一读数里无门的 stats 规则真机
       验证生效、A 档未生效，对照坐实是分档包裹死档而非声明无效。目标任何
       手机宽度芯片全字、极端窄屏靠滑窗降级不靠截断——分档与目标矛盾，删，
       flex 直接并入本几何规则唯一声明。新几何：lane 停缩后行内唯一可缩项
       是 crumbs（flex 1 1 auto，地板 72px；窗口帽 max-width:100px 是字体
       无关盒子，窗内 pan-x 滑动保证长标题可读），避震容量 = crumbs 自然
       宽−72（根会话约 28px、子代理会话双窗最多 128px；360 真机肥字体
       k>1.22 时 crumbs 触地板、残余走 cluster 横滑）。级联核查：本规则是
       全档唯一 flex 来源、无其他 flex 分量；rc 代 840 行是普通权重且
       prelude 不同（无 :has 门），被本条 importance 压制，无 order-tie。 */
    flex: 0 0 auto !important;
    width: auto !important;
    max-width: none !important;
    min-height: 36px !important;
    margin-left: auto !important;
    padding: 0 !important;
    border-top: 0 !important;
    justify-content: flex-end !important;
    /* 与 titleCluster 同步收到 4px（2026-09-23）：动作行里的 chip（任务 /
       谱系 / 团队）之间也只留 4px。 */
    /* 本批之前的值。2026-10-12 的「动作行内各 chip 之间放宽到 6px」只针对手机档，
       已搬进手机档作用域。 */
    gap: 4px !important;
    overflow-x: auto !important;
    scrollbar-width: none;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerActions"]::-webkit-scrollbar {
    display: none;
  }
  /* stats 行左端「N 轮」被裁且不可达（用户真机两帧 + headless 390 复现）：
     宿主 bOPqQW_root 是 justify-content:center 的横向滚动容器，内容溢出
     49px（scrollWidth 333 / clientWidth 284）时两侧对称各裁 ~50px——右侧
     scrollLeft 最大 49 可达，左侧起点 x=-34 是负坐标、scrollLeft 恒 ≥0
     永不可达，center+overflow 经典陷阱。改 flex-start 后溢出全落在右侧，
     滑动全程可达；取舍：内容放得下时行内从宿主的居中变左对齐（视觉差异
     仅空隙分布），功能缺陷（指标永久丢一段）优先。特异性 (0,3,0) 带
     !important 胜宿主 (0,1,0) 普通声明，与书写顺序无关；data-mobile-nav=
     "stats" 是 stats-line 效果打的稳定标记，无哈希、跨宿主代际可用。
     本条置于 ①嵌套块外：裁切陷阱与断点 A 的档位无关，全移动宽度生效。 */
  [data-mobile-nav="frame"] [data-phase] [data-mobile-nav="stats"] {
    justify-content: flex-start !important;
    /* 指标行的空隙在手机上偏松（2026-10-07 店主截图：「距离缩一点，更紧致一点」）。
       宿主 dsh-client-ui-chat 的 StatsPills 叠了三层：root 的 12px 列间距 +
       sep 的 6px 两侧 margin + pill 的 8px 内边距 ⇒ 390px 实测两个指标之间的
       视觉空隙 ~28px。手机档收成 gap 6 / sep 2 / pill 6：同组内 ~14px、组间
       6px，仍然留得住「·」的读法，pill 的垂直尺寸没动（触控高度由宿主
       line-height 决定）。类名前缀 bOPqQW_ 会随宿主换代，故用子串锚并整条
       限定在本插件自己的 stats 标记内：换代只会让规则惰性化，不会误伤别处。 */
    gap: 6px !important;
  }
  [data-mobile-nav="frame"] [data-phase] [data-mobile-nav="stats"] [class*="_sep"] {
    margin: 0 2px !important;
  }
  [data-mobile-nav="frame"] [data-phase] [data-mobile-nav="stats"] [class*="_pill"] {
    padding-left: 6px !important;
    padding-right: 6px !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-mobile-nav="files"] {
    /* Keep the 36px seat the reference phone UI shows (opener box 316..352 at
       360px, icon 326..342): it is the geometry the lane's 46px reservation
       above is tuned against. Mirror the toggle's centre (top:6px for a 28px
       control -> centre y=20) by lifting the taller box to top:2px.
       本批之前的值；2026-10-12 的「座位 36→30 + top 2→5」只针对手机档，见手机档作用域。 */
    width: 36px !important;
    height: 36px !important;
    flex: 0 0 36px !important;
    top: 2px !important;
  }
  /* 手机档（≤767 + coarse）：2026-10-12 用户规格 —— 座位 36 → 30px（原来比左侧 ☰
     的 28px 胖一圈，用户指出"外部灰色胶囊"偏大）。top 由 2 改 5，保持图标中心仍在
     y=20，与 ☰ 同一水平线。平板档没被要求动，仍是 36px / top:2。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-mobile-nav="files"] {
      width: 30px !important;
      height: 30px !important;
      flex: 0 0 30px !important;
      top: 5px !important;
    }
  }
  /* 新宿主把「右侧栏入口」放进了 titleRow 的 headerCorner。手机上市宿右侧栏
     就是 Files 面板，所以它和插件的文件按钮是同一个面板的两个入口；而它带
     margin-right:-16px，36px 盒子在 360px 视口下会从文件按钮右侧漏出一角
     （2026-09-22 实测：corner [332,2 36x36]、图标 343..358 外露，被视口裁切），
     与参考图"右上角只有一个文件夹图标"不一致，也与插件自己的文件按钮重复。
     只针对标题行内的 corner，老一代宿主（corner 是唯一入口）不受影响。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleRow"] > [class*="_headerCorner"] {
    display: none !important;
  }
  /* 右上角换人：0.1.6 把「右侧栏展开按钮」放进了 headerCorner，而插件的
     老规则「header > :first-child > :last-child 显示 none」在 0.1.5
     藏的是「会话日志胶囊」；新结构里 titleRow 的 :last-child 变成 corner，
     于是右侧栏入口被误藏、面板在手机上打不开。这里把 corner 放出来，
     同时让出「⋯」菜单那一格（360px 一行塞不下两个）。 */
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
  /* 状态 chip 的座位：
     · 子代理谱系 chip（dsh-client-ui-subagent 的 ZKlsPq_root）—— 绝对定位到
       「对话/轨迹」行右侧；
     · 后台任务 chip（dsh-client-ui-jobs）—— 2026-10-17 起不再搬座位：宿主
       0.2.1 只渲染无类名包裹 div，旧代 QsffPG_root 那套座位规则已整块删除，
       现行规则见本条下方的 header-job-chip-collapse。
    谱系 chip 若不搬，会和标题窗口 + 预设 + 文件抢同一条 flex，实测直接叠在
     一起（进子代理会话时最明显）；动作行因此只留 [预设][团队][文件]。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    position: relative !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [role="tablist"] {
    padding-right: 8px !important;
    /* 宿主的标签行宽度是满宽、默认 content-box，加 padding 会把它顶到
       x=8..368（右缘越过 header 右缘 360 共 8px，header.scrollWidth-clientWidth=8），
       也就是下面那条 118px 预留里有 8px 落在屏外。补 border-box 把它收回来，
       预留才是"整整 118px"。 */
    box-sizing: border-box !important;
  }
  /* 2026-10-12（受控实测后删除）：原「jobs 在场 ⇒ tablist 右侧预留 118px」规则
     被证明是**惰性的** —— 同一 DOM 上切 8px ↔ 118px，tablist 的 rect、clientWidth 与
     注入元素的 x **差量全为 0**。原因：本表 box-sizing 为 border-box，padding 落在声明
     宽度之内、不缩小 flex 容器的 content box；而 tablist 是 overflow-x 为 auto 的滚动容器，
     子元素可以排进 padding 区 ⇒ 预留区挡不住任何视觉重叠，只让 scrollWidth 多 110px，
     并在溢出后造成整行左移 8px（临界从 159 抬到 167）。
     实测临界（393×844，合成"第三方 chip"）：无 jobs 时 >159px 压到谱系 chip；
     有 jobs（74px 文案态）时 >83px 压到 jobs chip；标签行溢出要到 260px 才发生。
     要真正预留，border-box 下 padding 做不到，须用 margin-right 或
     width: calc(100% - Npx)（该替代方案未实测，属推断）；而 83px 这个上限的根源是
     jobs 的定位公式（左缘 = 谱系左缘 − 2 − jobs 宽），要腾更多得动定位而不是 padding。 */
   /* Agent Team chip（VoX2oq_root，data-team-action）被 rc 代 pin 规则钉死
      （flex 0 0 auto + order 2，实测 98.7px），动作行里唯一可缩的模式 chip
      被压到 56.2px（390px 实测「创造模式」只剩「创造…」）。模式 chip 是
      手机端唯一的模式切换入口（pitfalls ⑤：必须保字），团队 chip 的完整
      文字在自己的面板里有承载（点开即达），所以让它先让：保持 order:2
      不变（创造在前、团队在后的次序不能翻），只把不可缩改成可缩，并加
      收缩下限保住图标点击区；内部省略号窗口由 rc 代的
      > button / > button > * 规则继续供给。特异性 (0,5,1) 高于 pin 规则
      (0,4,1)，且 !important，不依赖书写顺序；:has 门控保证 rc 宿主不命中。
      2026-09-23 下限 44 → 28（用户拍板）：宿主自己那条 @container(width<=480px)
      把标签藏了，手机档这颗 chip 实际只剩 14px 图标，44px 的盒子成了那一行
      最宽的空占位（真机 dpr 4：图标右缘 291 → 文件按钮图标左缘 326，观感 35px
      留白）。28 = 图标 14 + 宿主自带左右内边距 7（.VoX2oq_trigger padding），
      与本插件 toggle/files 同尺寸，不再额外扩拍击区。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-team-action][class*="_root"] {
    flex: 0 1 auto !important;
    min-width: 28px !important;
  }
  /* 团队 chip 图标在「标准模式」与文件按钮之间居中（2026-09-26 用户拍板）。
     真机 360px / dpr 4 实测（无障碍盒 = 绘制盒）：标准模式 205..274、团队 chip
     278..306、文件按钮 316..352 —— 左缝 4、右缝 10，盒心 292 落在区间心 295 左侧。
     只做绘制层位移（宿主 .VoX2oq_root 本来就是 position:relative，不新增包含块、
     也不动它自己的弹层锚定），布局一个像素不变：46px 承重预留保持原样（见
     pitfalls「header 拥挤」），文件按钮不会被压。位移后两缝 7/7，图标正好居中。
     只在真·手机档生效：768–1023 平板档排布不同，不套这台手机的魔数。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-team-action][class*="_root"] {
      left: 3px !important;
    }
  }
  /* 后台任务 chip 的**现行**规则（宿主 0.2.1 起）：上面那整个 QsffPG_root 族在该代
     静默失配 —— 宿主只渲染一个**无类名**的包裹 div，类名映射表里已经没有 root 键。
     失效后果实测：8 字文案（1 个后台任务运行中）回到标题行，标题触 72px 地板后动作
     簇仍放不下，溢出的 30px 画进文件按钮预留带、被文件夹图标压住（真机「顶部错位」）。
     用户规格（2026-10-17）：只留状态圆点 + 折叠箭头，位置排在预设与文件夹之间、
     智能体团队 chip（pin 为 order 2）的右边。锚改用「trigger 直接挂 _count」这一
     形状，不依赖包裹 div 的类名；槽位是 display:contents 的包裹节点，故不写直接
     子元素组合符。诊断与判据见 pitfalls「header 拥挤」。 */
  /* @patch
     id: header-job-chip-collapse
     for: dsh-client-ui-jobs 的后台任务 chip（0.2.1 起包裹 div 无类名）
     why: chip 由宿主作为 header.actions 槽的贡献节点渲染，类名与结构归宿主所有，
          插件只能在样式层收窄可见内容与序位
     until: 宿主给该 chip 稳定的数据标记，或在手机档自带折叠形态
     test: tests/a2-header-gating.test.ts
  */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerActions"] div:has(> button[class*="_trigger"] > [class*="_count"]) {
      order: 9 !important;
    }
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerActions"] button[class*="_trigger"] > [class*="_count"] {
      display: none !important;
    }
  }
  /* 头部弹层定位（jobs 任务列表 / subagent 谱系 / 预设菜单都会命中的同一族）：
     插件老规则是「弹层左缘 = chip 左缘 + 8px」，那条规则成立的年代 chip 都
     贴着 header 左缘；现在标题窗口 72px + 子代理 chip + 预设都靠中右，336px
     宽的面板会被整体推到视口外 —— 点开就像没反应。
     统一改成视口定位：贴在 header 下方、左右各留 8px 满宽展开；顺带脱离
     headerActions 的 overflow 裁剪（绝对定位的面板会被那个 auto 裁掉）。 */
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
  /* 官方 agent-team 插件（@deepseek-ai/dsh-experimental-client-ui-agent-team）的
     TeamAction 弹层：根元素 data-team-action（VoX2oq_root，挂在 headerActions 槽
     order 20），面板 VoX2oq_panel 是 absolute 弹层。它和上面 _menu 族栽在同一个
     裁剪问题上 —— _headerActions 的 overflow 滚动盒把它整个裁掉（实测 390/360px
     视口均不可见、关闭键落在视口外），但类名不含 _menu，上面那条规则救不到，
     所以这里同款视口定位脱离裁剪。哈希前缀 VoX2oq_ 跨版本会变，按仓库约定用
     _panel 子串匹配；不会误伤其他弹层 —— data-team-action 根标记只有 agent-team
     插件在用，特异性 (0,5,1) 也高于 _menu 族的 (0,4,1)。代际上整条已由外层
     header:has([class*="_headerLeading"]) 门控，pre-alpha.2 宿主不命中。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-team-action] [class*="_panel"] {
    position: fixed !important;
    left: 8px !important;
    right: 8px !important;
    top: calc(env(safe-area-inset-top, 0px) + 80px) !important;
    bottom: auto !important;
    width: auto !important;
    max-width: none !important;
    /* 底部让位 composer 区：会话页 composer 卡顶缘实测 y=738、stats line
       到 840（844 视口，底部区共 106px）——原 max-height 100dvh-96px 让
       面板伸到 y=828，底部 90px 的任务列表被输入框盖住（2026-09-19 用户
       报障）。120px = composer 区 106px + 14px 呼吸间距；键盘弹出时 dvh
       收缩，面板随之再缩。 */
    max-height: calc(100vh - 200px) !important;
    max-height: calc(100dvh - 200px) !important;
    /* 面板虽被拖出头部渲染点，white-space 仍继承 0.1.6 头部的 nowrap
       （头部整行防换行是既有决策）——手机 374px 宽 + 长任务标题时内容
       单行撑出面板（实测 scrollWidth 541 / clientWidth 374，任务状态
       徽标被推到面板外 x=496 处）。恢复面板内正常换行。 */
    white-space: normal !important;
  }
  /* 子代理谱系 chip（ZKlsPq_root）：0.1.6 把它渲染在标题面包屑内部。进子代理
     会话时面包屑变成「父会话 / 当前会话」两段 + 这个 chip，动作行就叠在一起，
     所以整块搬到「对话/轨迹」这一行的空白区里居中，并与标签文字纵向对齐。
     后台任务 chip（同族的另一颗状态 chip）2026-10-17 起改由「trigger 直接挂
     _count」的形状锚收窄（见下方 header-job-chip-collapse）——宿主 0.2.1 不再给
     它的包裹 div 类名，QsffPG_root 那套座位规则已整块删除。 */
  /* @patch
     id: header-chip-seat
     for: 宿主 3.0.6 的 headerActions / titleCluster 槽位（子智能体谱系 chip 的座位）
     why: 槽位树由宿主 React 管理，本插件不能插入自有节点，只能靠 CSS 改排位
     until: 上游在标题行提供稳定的 actions/title 槽标记，或把该 chip 分到独立容器
     test: tests/a2-header-gating.test.ts
  */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"] {
    position: absolute !important;
    /* 在「标签右侧的空白区」里居中（左边界让开对话/轨迹，约 104px），
       比整行居中往右一些。 */
    left: 104px !important;
    right: 8px !important;
    /* 纵向对齐标签：直接镜像标签的盒模型 —— 标签是「16px 行高 + 9px 下内边距」，
       总高 25px 且贴着 header 底边。chip 也做成 25px 高、bottom:0、下内边距 9px，
       内容区正好落在同一段 16px 里，文字必然与「对话/轨迹」齐平。 */
    bottom: 0 !important;
    /* 2026-10-20：页签行收到 21px（16px 行高 + 5px 下划线位）后，chip 的 25px 盒
       会比标签行高出 4px、文字随之上浮。这里镜像标签的盒：21px 高、贴底。 */
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
  /* 2026-10-12：原「后台任务在场 ⇒ 谱系 chip 让位到 right:126px」规则已删除。
     用户规格是主次对调（谱系 chip 固定不动、后台任务 chip 让到它左侧），
     让位一旦保留就会把谱系 chip 推走 —— 与规格直接冲突。2026-10-17 起后台
     任务 chip 已不在标签行（宿主去了类名、旧座位规则删除），让位更没有存在
     的理由。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"] > button {
    height: 21px !important;
    min-height: 21px !important;
    line-height: 16px !important;
    /* 原 9px 下内边距是「贴 header 底边、与标签文字齐平」用的；搬进标题行后要改贴
       预设 chip 的竖直中心（与后台任务 chip 搬上去时同一处理）。 */
    /* 2026-10-12 用户规格：右侧内边距 4 → 2px，让 chip 的文字/箭头更靠近右缘。 */
    /* 下内边距 9 → 5，与页签按钮的 5px 下划线位一致：两者文字底边都离 header 底边 5px。 */
    padding: 0 4px 5px !important;
    align-items: center !important;
  }
  /* 已知边界：标签行出现第三个标签时，标签总宽约
     252px，已经越过子代理 chip 居中区的左边界（104px），两者会叠在一起。
     这里用 :has() 按标签数量切换策略 —— ≥3 个标签时不再居中，改成停靠在标签行
     右侧的空白区（右缘 8px；有后台任务 chip 时让到 126px）。标签行本身可横向
     滑动，chip 不会被挤到下面，也不再盖住第三个标签：
       chip 占 268~352（宽 84），标签止于 8+252=260，右侧余量 8px。
     两个变体并列，兼容「tab 是 tablist 直接子按钮」与「tab 被容器包裹」两种渲染；
     两条变体均 (0,5,2)（带 QsffPG 的二次覆盖规则为 (0,6,2)），高于上面两条既有规则，
     不依赖书写顺序。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has([role="tablist"] button:nth-of-type(3)) [class*="ZKlsPq_root"]:not([class*="_switcherRoot"]),
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has([role="tablist"] > button:nth-child(3)) [class*="ZKlsPq_root"]:not([class*="_switcherRoot"]) {
    left: auto !important;
    right: 8px !important;
    margin: 0 !important;
  }
  /* 2026-10-12：≥3 标签版的让位规则（原 right:126px）已一并删除 —— 同 Y1，
     主次对调后谱系 chip 不再为后台任务 chip 让位。 */
  /* 真机反馈：「标题下面多了一条灰色滑条」。第 4/5 条为了让长标题能左右拖着看，
     把面包屑做成了横向滚动容器 —— 实测 button.wSkVaW_crumb: overflow-x:auto、
     scrollWidth − clientWidth = 88；像素实测那条灰条是 x=40.0~89.5、高 7.8、
     拇指宽 ≈50 的圆角滚动条（100×100/188 ≈ 53，吻合）。
     本机 WebView 不认 scrollbar-width（CSS.supports 为 false），只有
     ::-webkit-scrollbar 生效；而且滚动条是「经典占位式」的 8px（合成容器实测
     offsetHeight − clientHeight = 8）。所以这里对整个会话头部统一掐掉滚动条：
     滑动能力保留，视觉上不再多一条。头部里任何位置的滚动条在 360px 宽的手机上
     都不是想要的，故不再按具体类名收窄范围。 */
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
  /* 单子代理运行态的 switcher 变体（宿主 SubagentHeaderLineage variant=
     "switcher"，根类是「基类 + 修饰类」双类 ZKlsPq_root ZKlsPq_switcherRoot，
     挂在 crumbs 内同一 lineage 槽位，a2 bundle line 615 实锤）：pin 规则按
     设计排除 _switcherRoot（切换器必须保持可缩），于是它从我方链里继承了
     零溢出约束——宿主 trigger 上限 max-width:244px 大于我方根帽 116px，
     根又没有 overflow，trigger 连同标题从右锚定的根左缘向右画出最多
     128px：真机 390 上文字冲到 ≈389、越过条带右缘 374，省略号点也在视口
     外，看起来像「无省略号」。聚合态「N 个子代理」类表不含 _switcherRoot，
     不被本条命中（结构锚区分，文本无关）。修法：根帽提到 min(46vw,180px)
     （数值可调，给运行中标题比计数 chip 更多余地）+ 根 overflow 收口 +
     trigger max-width:100%，让宿主自带的 title 省略号链（flex:1 +
     min-width:0 + ellipsis）在根内收口；svg 宿主自带 flex:none，⋮⋮/箭头
     图标与省略号共存；菜单是 position:fixed，不受根 overflow 裁剪，点击
     不受损。特异性与上面 ZKlsPq_root 规则同类同权 (0,4,1)，靠书写在后接管
     switcher 变体；h8S2Va 旧代是否有同名修饰类未取证，a2 (ZKlsPq_) 已实测
     对号。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_switcherRoot"] {
    max-width: min(46vw, 180px) !important;
    overflow: hidden !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_switcherRoot"] > button {
    max-width: 100% !important;
    min-width: 0 !important;
  }
  /* switcher 定位（用户拍板 2026-09-19：右靠 + 与 tab 基线对齐）：基础规则
     把 switcher 与聚合 chip 一起居中/让位，取证实测 179.4 宽被推到
     84.6..264，整个压进 tab 带（tab 按钮 y 44-76、中心 y=60）盖住轨迹/
     记忆两 tab。本条用双类结构锚（聚合态类表无 _switcherRoot，零误伤）
     把 switcher 拉回右缘 8px 惯例位；top:48 使 25 高中心 60.5 ≈ tab 中心
     60，完成基线对齐——基础规则的 bottom:0 因 top+height+bottom 全非 auto
     过约束，按 spec 忽略 bottom、top 执政，行为确定。
     360 真机推演：右锚后左缘 360−8−180=172 > tabs 端 ~126，46px 空隙。
     菜单 position:fixed 独立定位层，不受本条影响（取证已证）。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"][class*="_switcherRoot"] {
    /* 同上，进标题行流程。变体实测宽 180px，而标题行右簇只有约 229px 可用
       （= 可用 305 − 标题地板 72 − 间隙 4），减去预设 chip 95 与间距后只剩约 124px，
       所以这里封顶，超出部分由内部 span 的 ellipsis 收掉（见本文件 ZKlsPq span 规则）。 */
    /* 换位后同样回标签行；标题行才需要的 124px 封顶随之撤掉。 */
    /* 2026-10-12 用户要求：**位置定死，不被其他插件移动**。
       绝对定位元素的落点由「四边偏移 + 包含块 + transform」三者决定，所以三处都钉：
       ① 四边写全（含 bottom: auto），别的插件只改一条也推不动；
       ② 包含块锁死在 header（见下面把 _titleCluster/_headerActions 钉成 static 的那条）；
       ③ transform/margin 归零并加 !important，防被 translate / 外边距挪走；
       ④ z-index 提固定值，防止标签行后来者把它盖住。
       ⚠ 本块只钉「不被别的插件移动」——落点本身仍是本批之前那套（绝对定位贴
       标签行右缘）；手机档的形态差异由手机档作用域表达。 */
    position: absolute !important;
    left: auto !important;
    right: 8px !important;
    top: 48px !important;
    bottom: auto !important;
    margin: 0 !important;
    transform: none !important;
    z-index: 3 !important;
  }
  /* 聚合 chip 右锚（用户拍板 2026-09-19：中置的子代理元素应右靠）：与
     switcher 同款右靠 + 基线（top:48 → 25 高中心 60.5 ≈ tab 中心 60；
     bottom:0 过约束被忽略、top 执政）。聚合 ~97 宽右锚后 285..382，标签行
     无第二颗状态 chip 时零碰撞（tabs 端 ≤170）。:not(_switcherRoot) 把变体
     让给上面 switcher 专属规则，二者匹配集不相交、无 order-tie。聚合
     max-width min(32vw,116) 沿用基础规则不动；数值 48/8 可调。 */
  /* @patch
     id: lineage-chip-pinned
     for: 宿主 ZKlsPq 子智能体 chip 的绝对定位落点（含包含块）
     why: 别的插件只要给任一祖先加 position:relative，包含块被抢、chip 就会挪位；四边偏移加 transform 是唯一能钉死的手段
     until: 宿主为该 chip 提供非绝对定位的稳定槽（届时四边偏移与祖先 static 都可删）
     test: tests/a2-header-gating.test.ts
  */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"]:not([class*="_switcherRoot"]) {
    /* 2026-10-12 用户规格（第三批·B 方案）：把**子智能体 chip 从标签行搬进标题行**，
       坐在「智能体预设 chip」与「文件夹按钮」之间 —— 即原先后台任务圆点占的那个位置；
       后台任务 chip 已进标题行（现由 header-job-chip-collapse 收窄）。
       原来它是 absolute + right:8px + top:48px（相对 header，视觉上落在标签行 y=42..67）。
       进流程后 left/right/top 全部失效，由 order 排在预设 chip 之后。 */
    /* 2026-10-12 换位后回标签行：绝对定位贴右缘、top:48（原形态）。 */
    /* 2026-10-12 用户要求：**位置定死，不被其他插件移动**。
       绝对定位元素的落点由「四边偏移 + 包含块 + transform」三者决定，所以三处都钉：
       ① 四边写全（含 bottom: auto），别的插件只改一条也推不动；
       ② 包含块锁死在 header（见下面把 _titleCluster/_headerActions 钉成 static 的那条）；
       ③ transform/margin 归零并加 !important，防被 translate / 外边距挪走；
       ④ z-index 提固定值，防止标签行后来者把它盖住。 */
    position: absolute !important;
    left: auto !important;
    right: 8px !important;
    top: 48px !important;
    bottom: auto !important;
    margin: 0 !important;
    transform: none !important;
    z-index: 3 !important;
  }
  /* 手机档（≤767 + coarse）：上面两条的 top:48 是按"标题行 40 + 页签行 36"的老几何
     推的（25 高中心 60.5 ≈ tab 中心 60）。本插件的手机档把页签行压到 26px 之后，
     真机页签文字落在 43..58（tab 盒 40..66），芯片还停在 48 ⇒ 文字 49..63、比
     "对话/轨迹"低 6px（店主 2026-09-23 截图报障："调了间距但忘记把这个调了"）。
     同特异性 + 同 !important 时后到先得，所以本条必须写在那两条之后：42 让芯片
     文字落到 43..57，与页签文字 43..58 对齐。平板档不压页签行，仍用 48。 */
  @media (max-width: 767px) and (pointer: coarse) {
    /* ⚠ 两个选择器都必须写成与上面两条**同特异性**：
       聚合变体的 48px 规则是 …[class*=ZKlsPq_root]:not([class*=_switcherRoot])，
       :not() 会把参数的特异性算进去 ⇒ (0,5,1)。我第一版第一个选择器写成通用的
       …[class*=ZKlsPq_root]（只有 (0,4,1)）⇒ 特异性输给那条 48px，
       店主实测"又没对齐了"（聚合芯片文字回到 49..63）。带上 :not(...) 才并列、
       再靠"后到先得"取胜。 */
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"]:not([class*="_switcherRoot"]),
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"][class*="_switcherRoot"] {
      /* 2026-10-20：原先钉 top: 42px 是按「标题行 40 + 页签行 36」的固定几何推的，
         本插件这几轮把页签行压到 21px 之后，42 就比「对话」低了一截、还压到正文上。
         改成贴 header 底边：chip 盒 21px、下内边距 5px，与页签按钮同一个盒模型，
         页签行再怎么压缩都不会再错位（top 必须显式 auto，否则上面那条 48px 继续执政）。 */
      top: auto !important;
      /* 截图实测逐轮校：页签文字本轮下沉后，chip 需再降 5px 才与「对话」同基线
         （负值不越出 header 视觉范围，chip 高 21、z-index 3）。 */
      bottom: -2px !important;
    }
  }
  /* 谱系 chip 里的文字（子代理标题 /「N 个子代理」）给一个规矩的省略号窗口：
     不要裁成半个字，也不要靠滚动去够剩下的字。 */
   /* :not([class*="_separator"])：rc 代有 (0,4,1) !important 的
      [class*="_crumbs"] [class*="_separator"] display:none 规则，专门隐藏
      谱系计数前的「/」（小屏上它读起来像多出一层面包屑层级）；本条原来
      同为 (0,4,1) !important 且书写在后，同特异性后到先得把 separator
      顶回 display:block（实测 390px separator [269.1,·,5.5,25] 实绘可见）。
      加 :not 把 separator 从本条管辖范围摘掉，隐藏权交还 rc 代那条。 */
  /* 2026-10-12 用户规格：给智能体预设 chip 套一层**不可见的胶囊**。
     动机：公共车道里预设 chip 与子智能体 chip 会贴在一起（间距已被收到 0），
     不套这层就分不清是两个控件。
     做法：外壳用 ::before 画一个透明底的圆角胶囊（「灰色层、不显现」——形状与圆角
     就位，底色透明；将来要显灰只需把 background 换成变量），实际间隔由 margin-right
     给出（几 px，用户明确要求「不至于为 0」）。
     用 ::before 而不是给本体加 padding：本 chip 的图标是 position:absolute 贴左缘的，
     给本体加左内边距会让文字右移而图标不动，两者会叠上。 */
  /* @patch
     id: preset-invisible-capsule
     for: 宿主 SVAs4q_label 智能体预设 chip 的外包裹层
     why: 该 chip 的图标是 position:absolute 贴左缘，给本体加内边距会让文字与图标叠上；只能加一层绝对定位外壳
     until: 宿主给预设 chip 自身加上左右内边距（本外壳与 margin 一并删）
     test: tests/a2-header-gating.test.ts
  */
  /* 智能体预设 chip（SVAs4q_label）：**本批之前这里没有任何本插件的规则** ——
     宿主的 max-width 180px + ellipsis 边界照旧，外层不加包裹层。
     2026-10-12 的「不可见胶囊 + 可收缩 + 超长省略号」是一组只针对手机档的改动，
     见下面的手机档作用域（平板档继续走宿主原样）。 */
  /* 手机档（≤767 + coarse）：2026-10-12 用户规格 —— 给智能体预设 chip 套一层
     **不可见的胶囊**。动机：公共车道里预设 chip 与子智能体 chip 会贴在一起
     （间距已被收到 0），不套这层就分不清是两个控件。做法：外壳用 ::before 画一个
     透明底的圆角胶囊（「灰色层、不显现」——形状与圆角就位，底色透明），实际间隔由
     margin-right 给出（几 px，用户明确要求「不至于为 0」）。用 ::before 而不是给
     本体加 padding：本 chip 的图标是 position:absolute 贴左缘的，给本体加左内边距
     会让文字右移而图标不动，两者会叠上。
     另加「长名字防护」：宿主自带的 min-width:auto（= 内容宽）会让长名字把同级挤出去、
     先压垮标题的 72px 地板再让整簇溢出；这里补可收缩 + min-width:0 + 省略号。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="SVAs4q_label"] {
      position: relative !important;
      /* 先归零（去掉与宿主自带 2px 右内边距的重复），用户看过之后要求
         「外包裹层的 px 抬一丢丢」⇒ 占回 2px。现在的构成 = 宿主自带右内边距 2 + 本 margin 2
         + 容器 gap 0 + 团队 chip 左内边距 2 = 6px（改前是 11px，大头那 7px 已收掉）。 */
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
      /* 用户要求「外包裹层的 px 抬一丢丢」：左右各 4 → 5px，上下也包 1px。 */
      inset: -1px -5px !important;
      border-radius: 999px !important;
      background: transparent !important;
      pointer-events: none !important;
    }
    /* 2026-10-12 用户反馈「预设与团队之间距离太多」：实测大头来自**团队 chip 自己**的
       左内边距（宿主 .VoX2oq_trigger 是 padding: 3px 7px）。7 → 2px 收掉 5px，
       与上面预设的 margin 归零合起来，这段总间距从 11px 降到 4px（视觉上才看得出来）。
       代价：该按钮左侧命中区窄 5px（高度仍由 min-height: 28px 保证）—— 用户若觉得难点，
       把 2px 往上调即可，值就是唯一旋钮。 */
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-team-action][class*="_root"] > button,
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="VoX2oq_trigger"] {
      padding-left: 2px !important;
    }
  }
  /* 2026-10-12：把子智能体 chip 与 header 之间的两个祖先钉成 static ——
       绝对定位元素认「最近的已定位祖先」作包含块，别的插件只要给它们其中任何一个
       加上 position:relative，chip 就会以那个元素为基准重新落点（相对位移）。
       二者今天本来就不是定位元素，钉成 static 对现有布局零影响，只是把包含块锁死在 header。 */
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
  /* composer 模型选择 chip（dsh-client-ui-model-selection，样式哈希
     _7KE1Ra_）。2026-09-23 改档：真·手机档一律**只留图标**
     （IconDataOutlineRegular），模型名与 effort 不再常驻 —— 官方新加的语音
     按钮吃掉宽度后「图标+名字」把动作行挤爆；点图标打开菜单后再选模型。

     上游 0.1.7 已把这个能力做成契约：conversation 的 observeControlRow()
     实测 row 装不下时才打 data-model-compact，其 CSS
     「.uV2eYG_row[data-model-compact]」向下传
       --dsh-composer-model-text-display: none;
       --dsh-composer-model-icon-display: block;
     由 model-selection 消费：triggerIcon display:var(…icon…,none)、
     triggerLabel/triggerEffort display:var(…text…,block)。
     **旧规则 [class*="_7KE1Ra_triggerLabel"]{display:inline !important}
     正是把它顶掉的那一条** —— 图标被 compact 显形、名字又被我们拉回来，
     所以现场是"图标和名字同时出现"，也就是"上游代码里有、却不生效"。
     这里删掉它，并在 ≤767px 直接钉住这两个变量，不去赌宿主的实测结果
     （否则一旦某项变窄让 row 装得下，文字又会长回来，来回抖）。

     _7KE1Ra_ 是本代 model-selection 的样式哈希，包不在则整条死规则，无需
     另加代际门；必须带哈希前缀，裸 [class*=_triggerLabel] 会误伤
     permission-presets / settings-general 的同名片段。 */
  @media (max-width: 767px) {
    [data-mobile-nav="frame"] [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) {
      --dsh-composer-model-text-display: none;
      --dsh-composer-model-icon-display: block;
    }
    /* 图标化后（上方变量钉死为 icon-only）宿主那套 padding:0 4px 0 8px 纯属
       浪费（左 8px 是给文字留的）。2026-09-23 店主第二轮："范围有点大、
       ⌄ 离图标远" ⇒ padding 归零、gap 归零，匣子只剩「图标 + ⌄」本身
       （实测墨迹间距 10px → ~4px，匣宽 46 → ~32px）。issue #101 对账：原与
       max-width 同块、无档位限定，768–1023 平板档文字在场时也被归零，chip
       内部「图标|模型名|effort|⌄」贴死 —— 2026-09-24 挪进本 ≤767 专档。 */
    [data-mobile-nav="frame"] [data-phase] [class*="_7KE1Ra_trigger"] {
      padding: 0 !important;
      gap: 0 !important;
    }
    /* ⌄ 的 svg 自身带内边距（墨迹比 viewBox 窄），再拉近 2px。gap 归零后两个
       svg 的内边距会让墨迹直接贴住（实测墨迹连成一段），这里不再加负 margin，
       留 ~2px 呼吸 —— 间距从 10px 收到 2px。 */
    [data-mobile-nav="frame"] [data-phase] [class*="_7KE1Ra_chevron"] {
      margin-left: 0 !important;
    }
  }
  /* 模型 chip 宽度预算（只对仍显示文字的 768–1023 平板档有意义）：宿主
     trigger 的 max-width min(360px,45cqw) 在窄容器下只给
     label+icon+effort+chevron 留 ~160px，模型名会省略成「GLM-5.3-Fla…」
     （headless 字体窄恰好放得下，同一盲区）。放宽到 60cqw，effort 有宿主
     自带 flex-shrink:1000 先让位。手机档文字已隐藏，这条不参与。特异性
     (0,3,0)+!important 胜宿主 (0,1,0) 普通声明；60 数值可调。 */
  [data-mobile-nav="frame"] [data-phase] [class*="_7KE1Ra_trigger"] {
    max-width: min(360px, 60cqw) !important;
    /* issue #101 对账：padding/gap 归零与 chevron margin-left:0 已分档至上方
       ≤767 专档（那是「图标化后」的前提）；768–1023 文字显示档保留宿主
       padding 0 4px 0 8px 与宿主 gap，⌄ 回宿主 margin。 */
  }
  /* --- Settings dialog on mobile ---
     Desktop: 800px two-column flex (188px nav + content). Mobile: a
     near-full-width sheet — nav tabs wrap into rows on top, option rows
     stay horizontal (title+description left, control right). Structural
     selectors are scoped to the unique aria-modal dialog; every
     settings-specific rule is gated with
     :has(> :first-child > :last-child > button) — the settings nav tab
     list holds <button> tabs, so the transient export dialog (the same
     primitives Modal, header(title+close)+description+body) keeps its
     official centered card layout. Requires :has() support
     (Chromium 105+, 2022).

     The directory picker (dsh-client-ui-directory-picker-browse) must be
     excluded too: its footer bar holds <button> children AND its breadcrumb
     trail (role="navigation") — which the role gate relies on to exclude
     it — is REPLACED by the path input in edit mode (pencil button), so
     without the ZuhsRW exclusion clicking the pencil would suddenly match
     this sheet rule: the dialog jumps to the top of the screen, the header
     (with the path input) is hidden by the > :first-child > :first-child
     display:none rule below, and the user can no longer type a path
     (issue #12, 2026-08-16). The picker family keeps the official layout
     on mobile in every mode.

     The keyboard-shortcut modal (dsh-client-ui-shortcuts, the same
     primitives Modal → data-shortcut-modal="shortcuts") needs the same
     exclusion for the same class of reason: its first child is the
     CONTENT column (nhfO0a_contents = header + search row + list +
     footer), not a nav row, and its footer holds <button> children, so
     the family predicate matched it and the sheet rules transposed the
     whole dialog — measured 2026-09-25 at 390px: the
     > :first-child { flex-direction: row } rule laid search row / list /
     footer SIDE BY SIDE (x=20 / 118 / 278, list 1296px tall, spilling
     far outside the sheet), and > :first-child > :first-child
     { display: none } swallowed the 「快捷键」 title together with its
     close button (owner report). The host tags every modal of this
     family: data-shortcut-modal="settings" on the settings sheet,
     "shortcuts" on this one — gating on that attribute (not on a hashed
     class) keeps the official centered card, the same treatment the
     export dialog gets.

     The gate is the host's own contract first, shape second (2026-10-30,
     owner report 「手机上经常不显示输入框」): a pure shape guess used to
     claim ANY aria-modal whose last child holds a button, and a third-party
     consent dialog matched it exactly — measured at 412px, its mask was
     forced to position:absolute / width:100vw-16 at z-index 10100 (a
     full-screen cover) and its panel to flex-direction:row, rendering the
     notice as six 30-130px columns of 7-glyph lines. The dialog then cannot
     be dismissed, so the composer underneath stays invisible for the whole
     session. Fix: gate on 「data-shortcut-modal="settings"」 — the attribute
     the host itself stamps on SettingsRoot (verified in
     dsh-client-ui-settings-general 0.2.0-rc.2 / 0.2.1-rc.2) — and keep one
     shape arm only for the 0.1.7 line, which does not tag its panel. That
     arm requires TWO adjacent buttons in the panel's last child (the
     settings nav list is a row of tab buttons), which a consent dialog's
     single confirm button never satisfies. No third-party class name is
     named anywhere in this block. */
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) {
    position: absolute !important;
    left: 8px !important;
    /* Fixed top (no translateY): a transform on the panel combined with the
       panel overflowing the max-content drawer shifts the fixed overlay's
       coordinate frame, dragging the whole sidebar content off-screen. The
       safe-area inset keeps the sheet below the status bar / notch. */
    top: calc(env(safe-area-inset-top, 0px) + 12px) !important;
    width: calc(100vw - 16px);
    max-width: calc(100vw - 16px);
    /* Height follows the content (no dead space under a short page); it
       caps at the KEYBOARD-LESS viewport height minus 24 (less the safe-area
       top) and the options area scrolls only then. STABLE_VIEWPORT_VAR, not
       100dvh: measured 2026-09-25 on Android 16 WebView (adjustResize), the
       soft keyboard takes the layout viewport 754 -> 471 and vh / svh / lvh /
       dvh all follow it, so a dvh-sized sheet collapses a step the moment the
       shortcut modal's search field raises the keyboard — the reporter's
       「又闪一下」. The variable never moves for the keyboard, so the sheet
       keeps its size and the keyboard covers its lower half instead. */
    height: auto;
    max-height: min(800px, calc(100vh - 24px - env(safe-area-inset-top, 0px)));
    max-height: min(800px, calc(var(--dsh-web-mobile-vh, 100dvh) - 24px - env(safe-area-inset-top, 0px)));
    /* Only a real viewport change (rotation / window resize) reaches this now,
       so the short transition reads as a slide instead of a jump. */
    transition: max-height .2s var(--ds-ease-out, ease-in-out);
    flex-direction: column !important;
    border-radius: 14px !important;
    animation: dsh-web-mobile-sheet-in .22s var(--ds-ease-out, ease-in-out);
  }
  /* The settings sheet's dimmed mask fades in with the panel: the mask is the
     overlay's first child, so it is reached as a direct child of the overlay
     that holds the settings panel. The panel is identified by its stable
     data-shortcut-modal="settings" marker (host value; the shortcut editor uses
     "shortcut-edit" instead, so this cannot reach that family) plus
     role/aria-modal. Keep the outer :has() ATTRIBUTE-ONLY: an earlier form
     tested the panel's shape by nesting a :has() inside this one, which is an
     invalid selector — Chromium dropped the entire rule without a word and the
     fade never ran once (issue: settings mask, found 2026-09-27 and 2026-10-10).
     scripts/css-structure-check.mjs now fails the build on nested :has(). */
  :has(> [aria-modal="true"][data-shortcut-modal="settings"]) > [class*="_mask"] {
    animation: dsh-web-mobile-fade .18s var(--ds-ease-out, ease-in-out);
  }
  @media (prefers-reduced-motion: reduce) {
    [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]),
    :has(> [aria-modal="true"][data-shortcut-modal="settings"]) > [class*="_mask"] {
      animation: none !important;
    }
  }
  /* The export dialog (not the settings sheet) must never overflow the
     viewport: the official centered card can be wider than 390px. */
  [aria-modal="true"]:not(:has(> :first-child > :last-child > button)) {
    max-width: calc(100vw - 32px);
  }
  /* Image lightbox (dsh-client-ui-primitives ImageLightbox; body-portal
     div[role=dialog][aria-modal=true] whose stage holds the image and the
     close button). The export rule directly above only excludes dialogs whose
     stage's LAST child contains a button; in this lightbox the stage's last
     child IS the close button (its own child is the icon svg), so the
     :not(:has(...)) predicate is true and the 100vw - 32px cap hits the
     backdrop: on a 390 viewport the mask covers [0,358] and the right 32px is
     neither painted nor hit-testable. The misc.css 720px centered tablet rule
     hits it the same way. This positive override restores the full-bleed
     backdrop without editing either of them: the leading div buys the extra
     specificity point, and that point is load-bearing on the tablet branch —
     misc.css.ts is concatenated AFTER layout.css.ts, so an equal-specificity
     override would lose to the 720px centered tablet rule (0,3,1 vs 0,3,1)
     and leave the 768-1023 lightbox inset on both sides.
     The :has() arm stays SINGLE-level: a nested :has() is an invalid selector
     and Chromium would drop the whole rule silently (see the settings mask
     episode in docs/maintenance/pitfalls.md).
     touch-action:none keeps the page-level pinch/pan out of this layer (the
     root rule's pan-y pinch-zoom stays untouched for every other surface);
     tests/ios-zoom-guard.test.ts pins this deliberate none and
     effects/image-lightbox-zoom.ts attaches its gesture listeners to this
     dialog node only, never to document. */
  /* @patch
     id: image-lightbox-fullbleed
     for: dsh-client-ui-primitives ImageLightbox（role=dialog + aria-modal=true，stage 末孩子是关闭按钮）
     why: 宿主遮罩自身是 fixed inset:0，却被上方「非设置形状弹层」的 max-width 收窄规则与 misc.css 平板档 720px 居中规则命中，右侧漏画且不拦点击
     until: 宿主给灯箱提供独立的 data-* 标记或自带移动端铺满形态，届时删本块
     test: tests/css-rules.test.ts
  */
  div[role="dialog"][aria-modal="true"]:has(> :first-child > img) {
    left: 0 !important;
    right: 0 !important;
    width: auto !important;
    max-width: none !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    touch-action: none !important;
  }
  /* Nav bar: hide the "Settings" caption (redundant on a full-width sheet)
     and wrap the tab list so every tab is visible — a horizontal scroll cut
     the last tab ("Plugins") off with no affordance to scroll. */
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
  /* The tab strip stays clear of the toolbar: the toolbar (the close ✕ on
     this host — the config-file button is hidden below) is absolutely
     positioned over the nav row's right end (#105 A' — it stays at its
     React home in the content column; see below). The strip is pinned to
     ONE horizontal scroller: flex-wrap:nowrap + overflow-x:auto.
     2026-09-25, rc.2 portal regression: 0.1.7-rc.1 rendered this sheet in
     place (inside the app frame); rc.2 wraps it in
     createPortal(..., document.body) — diffed rc.1 vs rc.2 bundles, no
     createPortal before — so every [data-mobile-nav="frame"]-scoped
     dialog rule (the frame-era single-row scroller in compat.css among
     them) went dead the moment the overlay became a direct body child.
     What survived was this rule's own flex-wrap:wrap, which had been
     losing to the host's nowrap scroller and now had nothing to lose to:
     the cells broke into uneven rows (3/2/3/2/1 at 402px) whose first row
     slid under the 138px toolbar (config-file button + close) — the
     settings-sheet half of the owner's 2026-09-25 report. Pinning the
     scroller here makes the geometry host-generation independent again;
     the cells keep flex-shrink:0 + nowrap (rule below), the strip
     scrolls, and the hairline scrollbar is the affordance. The scroller
     VIEWPORT stops short of the toolbar zone: margin-right = toolbar
     width (36: the 32px round close + 4px) + 6px gap (measured
     2026-09-24) reproduces the reparent-era scroller geometry (its box
     ended 6px short of the toolbar). The strip must be anchored by its
     class. */
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
  /* Hairline scrollbar for the tab strip: the default WebKit scrollbar
     reads fat on a phone; 2px keeps the scroll affordance without the
     bulk. (Portal-aware copies of the frame-scoped rules in compat.css,
     which died with the rc.2 portal move.) */
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
  /* Cells stay whole inside the scroller: no shrink, no wrap, compact
     metrics. (Portal-aware copies of the frame-scoped rules in compat.css,
     which died with the rc.2 portal move.) */
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
  /* Content toolbar (close, plus the config-file button on hosts that
     render one): pinned over the nav row's right end, flush right.
     #105 A' — the toolbar stays at its React home (the content column's
     direct child) and is absolutely positioned against the dialog; the
     dialog is position:absolute itself, so it is the containing block
     and no new one is introduced. Constants measured 2026-09-24 (CDP,
     393px): the reparented toolbar — whose visual this replaces — sat
     at in-dialog dy=10 / fromRight=12, hence top 10px / right 12px.
     Out of flow, the toolbar's own row disappears and the options area
     starts right under the nav row; the navList's scroll viewport stops
     short of the toolbar with margin-right = toolbar width (36: the 32px
     round close + 4px) + 6px gap (measured). Children carry official
     auto-margins
     that would defeat flex-end, so neutralize them. The close button
     gets a round tappable base so it reads as its own control, not
     part of the outline button.
     Anchored structurally, not by class substring: a bare [class*="_header"]
     also matches every plugin settings card header in the options area —
     the official Plugins config cards (YyYd_a_header) and the dsh-web-ui-all
     group cards (Kwoi6G_header / Jh0q7G_header / rUBhvW_header; the bpnj3G_/jmhvDG_
     siblings were renamed upstream in dsh-web-all 0.3.20, verified 2026-09-18), all sharing the upstream template text-align:left,
     gap:12px, padding:14px 16px). The old broad anchor right-aligned their
     text, gutted the padding and painted a 32px gray circle behind the
     chevron (2026-09-05 sweep: 8 bleeding headers). The toolbar's one
     structural home is the content column's direct child (the panel's
     :last-child); the post-reparent nav-row home died with the
     settings-toolbar-reparent task. Card headers live deeper — inside
     the options scroll area — and match neither, so no per-plugin hash
     guards are needed. */
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) {
    position: absolute;
    top: 10px;
    right: 12px;
    /* z-index is load-bearing since 0.1.7-rc.2 (owner report 2026-09-25):
       the sheet is portaled to <body>, and the market page (dshmarket's
       nUhMVa_root, position:relative, z:auto) paints AFTER this header in
       DOM order — both are z:auto positioned, so the market head covered
       the pinned toolbar: the close ✕ stayed visible through the head's
       transparent right end but hit-testing returned the head, so tapping
       the ✕ did nothing ("按了关闭没用"). z-index lifts the toolbar into
       the painted-above layer: above the market root and its sticky list
       heads (.stickyHead z:5), still below the market's own transient
       layers (.opPanel z:40, .lightbox z:10000) which SHOULD cover it.
       Settings view: the toolbar sits over the nav row's reserved right
       end (margin-right 42px), so nothing there to cover or be covered. */
    z-index: 10;
    flex: 0 0 auto;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    padding: 0 0 0 4px;
    /* Hug the close ✕ only: the host header box is 54px tall, and with the
       actions hidden its empty lower half (above the market's "导出日志"
       button, which starts ~13px under the ✕) formed a dead zone that
       ate the export button's top-right corner once z-index lifted the
       toolbar above it (owner report follow-up 2026-09-25). 32px = the
       close's own height, so the toolbar's box ends where the ✕ ends. */
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
  /* 32px is under the ~44px touch minimum and this ✕ shares the corner
     with the market's version text (above-left) and its export button
     (below-left) — the owner's "很容易误触" report 2026-09-25. Extend the
     HIT area only (no visual change): the pseudo-element grows up, left
     and right by 6px — never downward, where the market's "导出日志"
     button starts ~13px under the ✕'s bottom edge and must keep its own
     top-right corner. Anchored to the button (position:relative above),
     so the extension travels with the pinned toolbar. */
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) > :last-child::after {
    content: "";
    position: absolute;
    inset: -6px -6px 0 -6px;
    border-radius: 50%;
  }
  /* The config-file action (a settings.action slot — dsh-version-update's
     "打开配置文件") is hidden on phones: it is rarely needed here, and its
     ~94px next to the 32px close made the pinned toolbar 138px wide —
     wide enough to swallow the nav strip's first cells while the strip
     still wrapped (2026-09-25 report, the other half of the same
     regression as the scroller fix above). The close ✕ is the toolbar's
     SIBLING, not its child (verified in the live DOM: header children are
     [actions, close]), so hiding the actions never removes the way out.
     Desktop keeps the button: this whole block sits inside the mobile
     media wrapper. (Portal-aware replacement for the frame-scoped rule in
     compat.css, which died with the rc.2 portal move.) */
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) [class*="_actions"] {
    display: none !important;
  }
  /* Appearance mode cards: the official cube row renders three tall
     vertical cards (~268px) that eat half the sheet. Turn them into a
     compact horizontal trio (icon + label inline, equal widths).
     Relies on the official cube-row class name of this version. */
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
  /* Content: the options scroll area gets bottom breathing room so the last
     row never sits flush against the sheet's rounded corner. */
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child {
    flex: 1 1 auto;
    min-height: 0;
  }
  [aria-modal="true"]:is([data-shortcut-modal="settings"], :has(> :first-child > :last-child > button + button)):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > :last-child {
    padding: 0 12px 24px;
  }
  /* 0.1.6-alpha.2 宿主的插件管理页（dsh-client-ui-plugin-manager 渲染的
     section[data-plugin-panel]）。FAB 是全站恒定的左上角控件（用户明确
     要求：右下角不对，就放左上角），所以规则不做的是挪 FAB，做的是给
     面板自己的左上角内容让位。两个页面都要让，偏移量同一个：
     - 列表页：**有**内容在左上角 —— H1「插件」实测 [24,28,91,28]，与 FAB 盒
       [10,12,38,38] 重叠 24×22；点标题左缘命中的是 FAB 而不是标题
       （2026-09-19 报障）。上一版这里记的是「热区为空、零规则」，实测不成立。
     - 详情页（DetailTop 组件）：宿主返回键「返回插件列表」crumb，文字实测
       [24,28,70,19]，同样压在 FAB 左半——点它会触发开抽屉而不是返回。
       详情根的 data-* 标记有三种：内置插件详情 data-plugin-item-detail、市场
       插件详情 data-plugin-row-detail、builtin 详情 data-plugin-detail
       （实测「智能体团队」卡走的就是第三种），三条选择器并列全覆盖。
     让位量 = FAB 右缘（10 + 38 = 48）+ 8px 间距 = 56px，**写成相对量**：
     减掉宿主自己的 padding（clamp(24px,4vw,48px)），这样它跟着视口走，而不是
     把 390px 上量到的 32px 钉死（768px 平板上宿主 padding 是 30.7px，钉死的
     32px 会过量）。在 390px 上它算出来正好还是 32px，与上一版行为一致。
     锚点全部是宿主 data-* 标记，比 css-module 哈希类（X_2TxG_）稳定；
     pre-alpha.2 宿主没有这些标记，规则天然不命中（代际门控）。 */
  [data-mobile-nav="frame"] section[data-plugin-panel] {
    --dsh-web-mobile-panel-clearance: calc(56px - clamp(24px, 4vw, 48px));
  }
  /* 页首是宿主滚动盒的直接子元素，宿主给它 width:100%（.X_2TxG_page>*）。
     这种盒子上用 margin 会把整行顶出右缘、给面板加出一条横向滚动条，所以
     这里用 margin + 等量收窄：margin 盒仍是 100%，左缘让开 FAB，右缘不再
     外扩。0.2.1-rc.2 起工具栏已换行且按 flex-start 排布，「添加插件」不再
     贴右，旧注释里那个「保持贴右」的右缘假设已不成立；规则本身的行为
     （左缘让位、右缘不越界）不变。 */
  [data-mobile-nav="frame"] section[data-plugin-panel] [class*="_pageHead"] {
    margin-left: var(--dsh-web-mobile-panel-clearance) !important;
    width: calc(100% - var(--dsh-web-mobile-panel-clearance)) !important;
  }
  /* 详情 crumb 是被拉伸的 flex item（没有 width:100%），margin 就是对的工具。
     **0.1.7-rc.2 起「直子」形态落空**：宿主把 crumb 套进了 DetailTop 的根盒
     （实测链 [data-plugin-detail] > div.X_2TxG_detailTop > button.X_2TxG_crumb），
     于是上面三条「> button:first-child」在详情页全部 matches()=false ——
     crumb 的 margin-left 计算值 0px，停在宿主 padding 上：盒 [24,28,342,14]、
     自带箭头图标 [24,28,14,14]、文字 span x=44，整条压在 FAB 盒
     [10,12,38,38]（右缘 48）里 —— 图标 14px 全遮、文字首字压 4px；
     elementFromPoint 在图标中心与文字首字处都命中 FAB，点「返回插件列表」
     实际触发的是 FAB 的 exit-panel（2026-09-25 报障截图同形）。
     所以保留直子三条（旧代宿主仍走它们），再按 crumb 自己的哈希片段补三条
     后代选择器。片段取「_crumb」：同前缀的 svg.crumbIcon 不是 button 天然排除，
     本子树里也没有别的 crumb 家族（文件面板 ZuhsRW_crumb* 在另一棵树）。
     实测让位后 crumb 变 [56,28,310,14] —— flex 拉伸项自己收窄 32px，无横向
     溢出（面板 scrollWidth 恒 390），点文字可正常返回列表。 */
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-detail] > button:first-child,
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-item-detail] > button:first-child,
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-row-detail] > button:first-child,
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-detail] button[class*="_crumb"],
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-item-detail] button[class*="_crumb"],
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-row-detail] button[class*="_crumb"] {
    margin-left: var(--dsh-web-mobile-panel-clearance) !important;
  }
  /* 自动化任务面板（@deepseek-ai/dsh-client-ui-schedule，0.2.0-rc.2 随实验性
     bundle 提供）不是 section[data-plugin-panel]：该 bundle 里
     「data-plugin-panel」命中 0 次，页头是 t-XoWW_pageHeading(display:flex)，
     标题是 h1{flex:1;min-width:0;margin:0}。盒模型取自宿主自己的 CSS：
     pageContent padding = clamp(24px,4vw,48px)（390px 视口取 24px），
     于是标题左缘 24px 落进 FAB 盒 [10,12,38,38]（右缘 48）——20px 字号的
     首字被整颗压住（2026-10-06 报障截图）。让位量沿用同一口径
     （56px − 宿主自身 padding）；作用对象取 h1：它是 margin:0 的 flex item，
     margin-left 只吃 flex 自由空间，不需要 width 补偿，也不会像整宽盒那样
     顶出横向滚动条。0.2.1-rc.2 起插件管理页的标题 h1 也命中「_pageHeading」
     片段（旧注释「全部宿主 bundle 只有这一个渲染者」的假设已不成立），本页
     会被一起串到；下方嵌套的手机档块把 section[data-plugin-panel] 里的两级
     margin-left 归零，自动化任务面板仍用本条让位。 */
  [data-mobile-nav="frame"] [class*="_pageHeading"] > h1 {
    margin-left: var(--dsh-web-mobile-panel-clearance, calc(56px - clamp(24px, 4vw, 48px))) !important;
  }
  /* 插件管理页页首左对齐（2026-10-20 实测）：插件管理页的页头同时被上面两条
     「给 FAB 让位」的规则命中 —— 一条给 [class*="_pageHead"] 加 margin-left，
     另一条给 [class*="_pageHeading"] > h1 加 margin-left。两个片段互为子串，
     页首容器与标题各自被让位一次，页首于是离左缘远、与左上角浮起的 ← 之间
     空出一大截。手机档只对 section[data-plugin-panel] 收口：先把 clearance
     改成 60px 口径（FAB 右缘 48 + 12 间距；390px 视口上算出 36px），再归零被
     「_pageHead」子串误伤的两级 margin。只影响本页；自动化任务面板与详情
     crumb 的让位规则照旧。
     同日按店主参考图再落一档：页首必须「一行内排」——标题+说明在左、刷新键与
     添加插件按钮在右。宿主 pageHead 是 flex-wrap:wrap，这一步直接禁止换行、让
     heading 可收缩（min-width:0），工具栏 flex:0 0 auto + margin-left:auto 贴右；
     说明文字过长时在左列内换行，不再把工具栏挤到第二行。 */
  /* @patch
     id: plugin-panel-head-left-align
     for: dsh-client-ui-plugin-manager 0.2.1-rc.2 的 section[data-plugin-panel] 页首（_pageHead / _pageHeading / h1 三层）
     why: 两条让位规则靠子串同时命中页首容器与页首标题，叠加后页首离左缘过远；宿主没有区分「页头容器」与「页首标题」的稳定标记
     until: 宿主给页首容器独立标记，或页首不再需要给 FAB 让位，届时删本块
     test: tests/css-rules.test.ts
  */
  @media (max-width: 767px) and (pointer: coarse) {
    /* 一行内排：标题 + 说明在左、工具栏（刷新 + 添加插件）在右（2026-10-20 店主参考图）。
       宿主 pageHead 自己是 flex-wrap:wrap + space-between；内容宽 300 出头时
       heading(≈154) + gap16 + toolbar(≈172) 放不下一行，就折成三行堆叠。
       这里禁止换行、把 heading 让成可收缩的 flex 项（min-width:0 才能压到内容宽），
       toolbar 保持自身宽度贴右；说明过长时在左列内换行，不再把工具栏挤下去。 */
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
  /* 快捷键弹层在手机上的落地形态。上面那条 :not([data-shortcut-modal="shortcuts"])
     只是把它从设置面板家族里摘出来、还它官方的内部排版（2026-09-25 实测：纵向列
     回来了、标题「快捷键」回来了、列表 441px 可滚、无横向溢出、docScrollWidth
     恒 390）。但官方的外框在手机上仍会「抽搐」：宿主 Modal 的 _root 是
     position:fixed; inset:0; align-items:center（视口居中），而弹层打开时会自动
     聚焦搜索框（实测 activeElement = INPUT「搜索快捷键」），手机随即弹软键盘 ——
     视口一缩，居中卡片就整体重排/回弹，肉眼即抖动。所以这里给它插件自己的「纸片」
     几何：顶部锚定（键盘怎么变，上缘都钉在 12px）+ 与设置面板同款左缘/宽度/圆角/
     入场动画。高度沿用宿主的 600px：nhfO0a_contents 是 flex:1 1 0%，要有一个确定的
     高度才撑得开列表，故不改成 auto；max-height 再按视口收口，超出的部分进列表自己
     的 scroll（_list 已是 flex:1 + min-height:0 + overflow-y:auto），与设置面板同款。
     宿主那 30px 的 translateY 是桌面居中卡的微调，顶部锚定后必须归零。 */
  [aria-modal="true"][data-shortcut-modal="shortcuts"] {
    position: absolute !important;
    left: 8px !important;
    top: calc(env(safe-area-inset-top, 0px) + 12px) !important;
    width: calc(100vw - 16px) !important;
    max-width: calc(100vw - 16px) !important;
    /* 同上：键盘不进这层的高度。这一层下面就是键盘，卡片缩一次就一定被看见，
       所以用「不含键盘的视口高度」定高 → 点搜索框时卡片纹丝不动，键盘盖住下半截。 */
    max-height: min(760px, calc(var(--dsh-web-mobile-vh, 100dvh) - 24px - env(safe-area-inset-top, 0px))) !important;
    transition: max-height .2s var(--ds-ease-out, ease-in-out);
    transform: none !important;
    border-radius: 14px !important;
    /* 不做透明度淡入。改动前（#124 修法二刀，2026-09-25）设置面板的
       dsh-web-mobile-sheet-in 还带 opacity 段，而本层叠在**同样全宽全白**的
       设置面板上，淡入的 .22s 里两层文字互相透出：CDP screencast 逐帧实拍
       （390×844）第 10-15 帧能看到「权限/语言/外观」与「快捷键速查/新会话」
       重影，肉眼就是「闪」。该刀后 sheet-in 已是纯滑入，不再有透明度重影的
       机制；本层维持瞬时出现（不写 animation 会落回宿主的 _modalEnter，
       同样是透明度淡入）；遮罩自己的淡入保留，整体仍是一次正常的弹层出现。 */
    animation: none !important;
  }
  /* 手机档收掉搜索行（报障人拍板 2026-09-25：「加回来又闪了，不要这个了，手机上也不怎么用」）。
     因果已由报障人两次实机复现钉死：**行在 → 打开就闪；行藏 → 不闪**。机理：宿主 Modal 会把
     焦点抢到 [data-modal-autofocus]（就是这个搜索框），键盘在弹层打开那一瞬就抬起来，布局
     视口随之 754→471，整页重排 —— 就是「全屏闪」。收掉这个唯一的文本输入，弹层里就再也
     弹不出键盘，那一步不存在；而不是靠 focus 影子去拦（那条守卫在这台引擎上并不总是拦得住）。
     只做 CSS 隐藏，**绝不删宿主节点**：宿主是 React 渲染的，删掉它卸载时 parent.removeChild
     会抛 NotFoundError，被 SlotErrorBoundary 吞掉后整个 slot 变空白（见 pitfalls「搬宿主
     React 节点」）。想恢复搜索只需删掉这两行，但要接受打开瞬间那一下全屏闪。 */
  /* 手机档（窄屏）才收；768–1023 的平板档与桌面档照旧保留搜索
     （报障人 2026-09-25 拍板：「手机端不要了，平板电脑端照旧」）。 */
  @media (max-width: 767px) {
    [aria-modal="true"][data-shortcut-modal="shortcuts"] [class*="_searchRow"] {
      display: none !important;
    }
  }
  /* 这一层的遮罩也在每次挂载时跑宿主的 _modalEnter（0.2s 透明度淡入）：全屏亮度在
     0.24 档上渐变一次，肉眼看就是「全屏闪」。上一版只掐了卡片自己的动画、**故意保留**
     了遮罩的淡入；报障人 2026-09-25 的反馈（「全屏闪」）说明那一步同样看得见。
     这里连同卡片一起瞬时化：弹层与遮罩同帧出现、同帧消失，中间没有渐变。 */
  :has(> [aria-modal="true"][data-shortcut-modal="shortcuts"]) > [class*="_mask"]::after {
    animation: none !important;
    /* 手机档这个弹层只能从设置面板里打开，而设置面板自己已经压了一层 0.24 的遮罩；
       再叠一层就是全屏暗度 0.24 → 0.42 的一步 —— 报障人说的「全屏闪」。这一层不再
       重复变暗：屏幕的整体明暗在弹层开合前后完全一致，剩下的变化只有卡片本身。 */
    background: transparent !important;
  }
  /* --- 插件管理页（dsh-client-ui-plugin-manager）：整卡 / 整行可点 ---
     2026-10-07 店主：「打开如图里面的功能，需要点击那些加黑字体才行」。读宿主源码确认到两层：
     ① 宿主**已经**给标题按钮铺了整卡覆盖层（「.cardOpen:after{position:absolute;inset:0}」 配
        「.cardLink{position:relative}」，标准 stretched-link）；
     ② 但卡片 DOM 顺序是 icon → titleRow(button) → **cardDesc**，描述是个 -webkit-box 盒子，
        绘制顺序排在覆盖层**之后** ⇒ 描述整块把点击吃掉，点它什么都不发生；只有标题（按钮自身）
        与描述以外的细缝能开详情。
     所以本规则不是「再加一层」，而是**把覆盖层抬到描述之上**（z-index），并把卡片里的其它
     交互件（开关等）抬得更高，保证它们仍能单独点。
     根节点仍钉 「position: relative」：一旦宿主换代不再给 cardLink 定位，「inset:0」 的包含块会
     落到更外层 —— 覆盖层铺满整页，就成了「点哪都开第一个插件的详情」。
     2026-10-08 补：宿主的条目根有**三种**（li[data-plugin-package] 包卡片、li[data-plugin-row]
     包详情里的行、li[data-plugin-item] 官方 item 卡）。item 卡（plugins.item 槽）当初漏了 ——
     真机症状正是「有开关的包卡片能整卡点，从『终端』起的 item 卡只有加黑标题能点」。 */
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
    /* 关键一行：压过同卡片里的描述/徽标等静态盒子（宿主那层没有 z-index）。 */
    z-index: 1;
  }
  li[data-plugin-package] :is(button:not([class*="_cardOpen"]), a, input),
  li[data-plugin-row] :is(button:not([class*="_rowOpen"]), a, input),
  li[data-plugin-item] :is(button:not([class*="_cardOpen"]), a, input) {
    position: relative;
    /* 比覆盖层高一档：开关等控件仍在覆盖层之上，可单独点。 */
    z-index: 2;
  }

  /* ---------- sidebar panel enter / exit (see effects/panel-exit.ts) ----------
     A sidebar panel REPLACES the main area. Two motions, both short and
     horizontal, matching the drawer's own rail-in (.15s, translate + fade):
       · enter — the panel slides in from the right;
       · exit  — the panel does NOT animate out; the conversation it hands the
         main area back to fades in instead.
     The asymmetry is deliberate. selectPanel(null) remounts the whole
     conversation and that commit blocks the main thread long enough to matter
     (measured on a phone: ~390 ms for a long session), so fading the panel out
     first would leave the screen blank for that whole window — panel already
     transparent, conversation not mounted yet. Keeping the panel opaque until
     the commit means the two swap on one frame.
     The enter rule is a CSS condition on purpose: :has() matches in the same
     commit that swaps the main slot, so the animation is already running at the
     element's first style resolution and there is no full-opacity frame first.
     The exit marker is set by JS before the swap for the same reason. */
  @keyframes dsh-web-mobile-panel-in {
    from { opacity: .55; transform: translateX(100%); }
  }
  /* Deliberately NOT reusing dsh-web-mobile-fade. The reason is the GHOST tail,
     not the whole exit: since 2026-10-12 the reveal side compares Animation
     objects (panel-exit.ts finishMain reads event.animationName only for the
     ghost), and the ghost cleanup still listens on animationend BY NAME
     (panel-exit.ts ghostEnd). dsh-web-mobile-fade also runs on the backdrop and
     the dialogs, which are frame descendants too — reusing it would end the
     ghost early. Comment corrected 2026-10-13 (was claiming the whole exit
     listens by name; the code had moved on). */
  @keyframes dsh-web-mobile-panel-reveal {
    from { opacity: 0; transform: translateX(-14px); }
  }
  [data-mobile-nav="frame"]:has([class*="panelRow"][aria-current="page"]) [class*="_centerCol"] > * > * {
    animation: dsh-web-mobile-panel-in .28s cubic-bezier(0, 0, .2, 1) backwards;
  }
  [data-mobile-nav="frame"][data-mobile-panel-exit]:not(:has([class*="panelRow"][aria-current="page"])) [class*="_centerCol"] > * > * {
    /* ease-out rather than the shared in-out curve: the panel vanishes and the
       conversation appears on the same frame, so the fade has to come up fast
       or the first frames read as a flash of empty background. */
    animation: dsh-web-mobile-panel-reveal .18s cubic-bezier(0, 0, .2, 1) backwards;
  }
  /* ---------- 面板进出：从侧面滑出 / 从原路滑回（2026-10-07 店主两轮报障） ----------
     ① 第一轮：「退出的时候看着跟掉帧一样，直接回到聊天界面」—— 逐帧实测（390×844，插件页）：
        点返回后的**第一帧**面板元素就已从 DOM 消失，退场动画落在 0×0 空槽上。
     ② 第二轮：「空档有点久了……像打开侧边栏一样，从侧面滑出来，然后从原路返回」——
        上一版把切换推迟 220ms 等真面板滑完，结果会话重挂那次 commit（长会话 ~390ms）
        又往后挪了 220ms，空档反而更明显。
     终态：退场不再动真面板，而是把面板 clone 成**冻结快照**（panel-exit.ts 里的
     panel-ghost），**立刻**切换，让快照在合成器上滑回右侧 —— 主线程忙着重挂会话时它照样
     不掉帧；进场整屏从右侧滑入（时长与抽屉的 .28s 对齐），会话侧从左侧 14px 滑回。
     方向：进 = 从右往左推入，退 = 原路推回右侧。 */
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
  /* ---------- 长会话：消息块 content-visibility（2026-10-07 实测） ----------
     店主报「对话越长、切换/开侧边栏越卡」。真宿主取证（最长会话，中心列 ~6000 节点）：
       · 点抽屉那一拍 = 236ms longtask / 3 条（短会话 0ms），且随会话长度暴涨；
       · CPU profile：「(program)」（样式计算/布局/绘制）1216ms、宿主自己的
         「getAnimations({subtree:true})」 75ms、宿主 JS 个位数 ms、**插件 JS ≈ 8ms**
         ⇒ 代价是「大 DOM 的布局/绘制」，不是插件逻辑。
     这里让会话滚动区里的**消息块**自己跳过屏外内容的布局/绘制（窄选择器：只命中
     滚动区的直接子块，本次实测 3 个；宿主的 scrollBody 自身用 :not 排除）：
       · 运行时注入 A/B（同一会话，每臂 n=3）：点抽屉长任务 关 = 247/62/143ms
         （复测 386/206）→ 开 = **57/61/70ms**（紧致一条 ~60ms 带）；
       · 「contain-intrinsic-size: auto 320px」：auto 表示「渲染过就用记住的真实高度」，
         只有从未渲染过的块才吃 320px 兜底 ⇒ 本次实测 scrollHeight 17699 前后不变、
         置顶/置底位置正常，没有滚动跳变。 */
  [data-mobile-nav="frame"] [class*="scrollBody"] [class*="_scroll"]:not([class*="scrollBody"]) > * {
    content-visibility: auto;
    contain-intrinsic-size: auto 320px;
  }
  /* ---------- 文档预览的代码行：屏外行跳过布局/绘制（2026-10-09 实测） ----------
     报障场景：打开一份 13.4k 行文件的文档预览（DOM 23,662 节点）后整页卡死。
     真机读数（Android 16 WebView）：单帧最差 269 / 310 / 395 / 485 / 530ms，
     rAF 帧率掉到 2 / 5 / 17，长任务每秒合计最高 1031ms；加上下面这条规则后
     最长帧 33ms、帧率 88–119、长任务归零，只剩首次挂载建 React 元素的那几帧。
     代码行行高统一（约 20px），所以 contain-intrinsic-size 的估值精确，滚回很久
     以前的历史也不会跳滚动条 —— 这正是它与上面那条消息块规则（高度差异大、
     兜底给 320px）分开写的原因。
     选择器保持窄：只在移动 frame 内，且必须落在宿主文档预览模块自己的代码行
     容器里（dsh-client-ui-sidebar-documentpreview 的 TextPreview：_textDocument
     容器中的 _line 行）。同模块的 _preview 是更泛的词根，chat / conversation /
     deliverables 等别的宿主模块也有这个名字，纳入会越界改到那些面板，所以不收。
     这一条只省布局与绘制，不省 React 挂载的 JS，「切换会话」的卡顿不在它的射程内。 */
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

  /* ---------- DSHA 集成层：预设 chip 布局（宿主 @deepseek-ai/dsh-client-ui-agent-preset
     的 DSHA 补丁标记 .dsha-preset-header-anchor / [data-dsha-agent-preset]）。
     按 CSS 宽分两档，自动切换：
     ① 结构修正：图标与下拉箭头都是 position:absolute; left:0，会双双叠在
        「标准模式」文字上。这是宿主 DOM 决定的 bug，**任何手机档都要修** ——
        否则换到 768–1023 的平板/折叠屏就复现同一处叠字。
     ② 按 360px 实测钉出来的调优值（left 归零、团队 chip 在场时预设名 4 字上限）：
        只在「真·手机」档（CSS 宽 ≤ 767px，对齐上游 768px 平板档边界）生效；
        768–1023 保留上游手机 UI 的排布，不套这台手机的魔数。
     非 DSHA 宿主上没有这些标记，整块天然不命中（死规则）。 ---------- */
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
    /* 左右内边距 6 → 4（2026-09-23 用户拍板）：与 6 → 4 的三级间隙一起，
       把「标准模式 / 智能体 / 文件夹」收成一组；文字本身不受影响。 */
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
  /* 预设 chip 的 ⌄ 翻转（上游/DSHA 都没给这个 v 做开合指示；子代理 chip 有宿主自带的）。
     两件事必须同时成立才修得好：
     ① 上面那条 > svg 写过 transform: none !important，任何旋转都会被它压死 —— 这里用
        svg:last-of-type 提高特异性 + !important 接管，**不去删那条通用规则**（它还管着图标 svg）。
     ② 钩子各走各的：预设 chip 只有 aria-expanded 属性，子代理 chip 是宿主自己的
        .ZKlsPq_triggerOpen 类。所以这里只锚 [data-dsha-agent-preset="header"]，
        **完全不碰子代理芯片**，改这边不会把那边压掉。
     svg:last-of-type 取 chip 里最后一个 svg（下拉箭头）；只有一个 svg 时同样命中。
     时长 .12s 与子代理 chip 自带的 transition 一致，两个 v 观感统一。 */
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
  /* ② 真·手机档（CSS 宽 ≤ 767px）才生效的调优值。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor {
      /* 宿主 cubgiG_menuAnchor 带 left:-8px（原本是给弹层对位用的），
         手机上和标题窗口右缘叠 2px；这里把它拉回 0，整体右移 8px。 */
      left: 0 !important;
    }
    /* 智能体团队 Web 开启后头部多一个 Agent Team chip；预设名超过 4 个字就会
       把它挤掉（实测 6 个字时 Agent Team 被裁成「Agent Te」并压住文件按钮）。
       此时把预设名收成 4 个字 + 省略号 —— 完整名字在预设菜单里点开即达。 */
    [data-mobile-nav="frame"] [data-phase] header:has([data-team-action]) .dsha-preset-header-anchor [data-dsha-agent-preset="header"] > span {
      max-width: 4em;
    }
  }
  /* ---------- 会话行的 ⋯ 菜单在触屏常显（2026-09-22 交互契约） ----------
     宿主只在 :hover 和 menuOpen 时显示 _rowActions，而手机没有 hover。
     长按改名已于 2026-10-07 下线（真机上它依赖的事件重放到不了宿主），
     所以这个锚点是触屏到达重命名 / 分叉 / 归档 / 删除的唯一入口，必须常显。
     行内布局不动：标题是 flex:1 + min-width:0，自己让位并省略；host 的
     time / pinIndicator 保持原样。只作用于抽屉里的会话行，搜索行
     （searchResultRow）不受影响。 */
  [data-mobile-nav="frame"] [class*="sessionRow"] [class*="_rowActions"] {
    display: inline-flex !important;
  }
  /* ---------- 归档 / 置顶快捷按钮在手机档收进 ⋯ 菜单（issue #154） ----------
     宿主把两颗快捷按钮注册进「sidebar.workspaces.session.row.action」槽位
     （archive order 100 / pin order 200）；_rowActions 一常显，抽屉里每一行
     就多两颗图标、行尾发挤，而手机用户多数并不需要这两个入口。四个动作
     （归档 / 取消归档 / 置顶 / 取消置顶）在 ⋯ 菜单里都有，所以按宿主自己的
     aria-label 精确匹配隐藏它们——⋯ 锚点的 label 含会话标题（「会话“X”的
     操作」/「Session actions for X」），精确匹配不会误撞。宿主字典目前只有
     zh/en 两套（2026-10-10 核对 0.2.0-rc.2 产物），换到别的语言时本规则静默
     失效：按钮照常显示，不会隐藏错东西；第三方注册进同一槽位的快捷按钮也
     不动。 */
  [data-mobile-nav="frame"] [class*="sessionRow"] [class*="_rowActions"] :is([aria-label="归档会话"], [aria-label="取消归档"], [aria-label="置顶会话"], [aria-label="取消置顶"], [aria-label="Archive session"], [aria-label="Unarchive session"], [aria-label="Pin session"], [aria-label="Unpin session"]) {
    display: none !important;
  }

  /* ---------- 提问卡（ask-user）头部按钮热区（issue #140） ----------
     宿主 dsh-client-ui-user-questions 的 QuestionComposer 头部两颗图标按钮
     ——「收起问题卡片」与「放弃整组问题」——官方 24×24px、headerActions
     gap 4px，远低于触控下限；「放弃」紧贴「收起」（放弃 = pending.cancel()
     后 actions.clear，整组草稿不可恢复地清空，宿主无确认），单手误触即丢
     内容。手机档原地放大命中盒（::after 透明扩展，墨迹与版式零变化），
     同时拉开两颗按钮的节距：24px 按钮 + 12px gap + ±4px 扩展 = 32px 命中
     盒、命中盒之间净空 4px——扩展幅度若超过节距的一半，两颗命中盒会互相
     重叠，反而制造新的误触，这是本组数值的硬约束。
     作用域：头部动作区专用（_headerActions 后代），翻页器的 prev/next 也
     是同族 iconButton，但节距只有 6px，吃不下 ±4px 扩展，不掺和。哈希族
     Mbwy4a_ 是该包 QuestionComposer.module.css 的稳定前缀，哈希变更时整组
     规则自动失效，不误伤别家（哈希子串锚，非后缀锚，见 pitfalls「哈希子
     串」）。 */
  [class*="Mbwy4a_headerActions"] {
    gap: 12px !important;
  }
  [class*="Mbwy4a_iconButton"] {
    position: relative;
  }
  [class*="Mbwy4a_headerActions"] [class*="Mbwy4a_iconButton"]::after {
    content: '';
    position: absolute;
    inset: -4px;
  }
  /* ===== 提问卡（ask_user_question）：横滑收敛 / 正文列宽 / 全屏回答 =====
     2026-10-25 owner 真机三报障（360×792 竖屏、792×360 横屏，DSHA WebView
     0.2.1-rc.3）：① 卡片正文能左右滑（截图里文字被横向滚过、左侧被截断）；
     ② 长问题 + 键盘弹起后答案框看不见字（「收起键盘才看到」），内容上下猛跳；
     ③ 滚卡片掉帧。本节只做 ① 与 ② 的几何；③ 的逐条归因见
     docs/maintenance/pitfalls.md §提问卡全屏。

     A. 横滑收敛。宿主 Mbwy4a_body 只写了 overflow-y:auto，另一轴被 CSS 计算成
        auto —— 任何比卡宽的子节点都能把它撑成横向滚动容器；而宿主只给
        Mbwy4a_field > * 加了 overflow-wrap:anywhere，_title / _description /
        _detail / _optionLabel / _reviewNote 五族都没有换行兜底（长 token 与长英文
        单词直接溢出）。手机档把横轴钉成 hidden，并给这五族补换行兜底；optionLabel
        与 description 是 _optionLine（flex 行）的子项，min-width:0 让它们真的能
        收缩到内容宽。刻意不用 overflow-x:clip：本代 WebView 上它与 overflow-y:auto
        组合按规范会退化成 hidden，同一结果却多一条要引擎理解的规则。

     B. 正文列宽。实测卡宽 ≈293 / 屏 360：_frame 左右各 clearance(16) + 16 = 32，
        正文列 = 卡宽 − _header 左右内边距：宿主 ≤720 档是 18/12 ⇒ ≈263，桌面档
        24/16 ⇒ ≈253（owner 报的 253 是后一档口径；同一段文字两次读数差 10px，这里
        按更窄的那个记）。≈70%，owner 看到的就是右边那片留白。手机档把 _frame 多吃的
        那 16px 还回去——对齐 composer 卡自己的列：宿主 uV2eYG_root 的左右 padding
        就是 --dsh-composer-side-clearance 本身，两张卡同一列；composer 卡同样带
        elevation 阴影，说明阴影不需要额外侧留白。_header 左右各收到 12/8（宿主
        ≤720 档是 18/12），与标题行的 12px 落点同一条线。
        数值取舍：侧留白绝不再压过 clearance —— 那是宿主给顶栏两个角按钮（left:8
        起、28px 宽）与抽屉/文件面板留的列，压过去正文列线就与顶栏 chip 错开；
        12/8 与 owner 已经验收过的标题行缩进同源，不再自造第二套边距。合计正文列
        253–263 → 308（+45~55px，≈17~22%）。只对 ≤767 真手机档生效，768–1023 平板保持宿主
        排布（与本文件「头部留白收紧」块同一约定）。

     C. 全屏回答（effects/question-fullscreen.ts 打 data-mobile-nav-question-full）。
        几何全部来自插件已维护的两个变量：可见带 --dsha-mobile-visible-vh（键盘会
        缩）与顶栏底 --mobile-nav-header-h；唯一的实测项是卡片下面那一截（frame 的
        上下 padding + 座位里 composer 自己的行），由效果量出来写成
        --dsha-mobile-question-reserve。卡片用 height + max-height 吃掉整条可见带，
        body（宿主 flex:auto;min-height:0;overflow-y:auto）滚动、footer（跳过/提交）
        恒在卡底。缺任一变量 ⇒ --dsha-mobile-question-band 变成 guaranteed-invalid
        ⇒ 两条声明各自回落 auto / 宿主自己的 min(60vh,520px)（fail-open，画面回到
        宿主默认）。刻意不用 --dsh-web-mobile-vh：那是「键盘不缩」的稳定高度，给
        弹层定高用的；全屏回答必须跟着键盘让位，否则下半截还是被盖住。
        与 issue #245 的紧凑态共存：那条只把座位抬到 z-index 31（压顶栏 30）并收起
        dock 行，两节都挂在同一个 frame 上、都只读自己的标记，可以同时为真。
        _cardMinimized 让路：宿主的收起键仍然能把卡折回一行。 */
  /* @patch
     id: ask-question-card-phone
     for: dsh-client-ui-user-questions 的 QuestionComposer.module.css（哈希前缀 Mbwy4a_：_frame / _card / _body / _header / _headerActions / _title 等）与其宿主 composerSeat
     why: 宿主卡片把 overflow-x 计算成 auto 且只给自定义回答框补了换行；60vh 定高在 adjustResize 的 WebView 上随软键盘缩，回答框因此被滚出 body 可视区。插件不能在宿主包里改这两件事，只能在自己的手机档样式表里收横轴、补换行、按实测可见带重算高度
     until: 宿主把 Mbwy4a_body 的 overflow-x 钉成 hidden/clip 并给五族文本补换行、或卡片自带「展开」形态与键盘感知定高 —— 届时整节删除
     test: tests/question-fullscreen.test.ts
  */
  [data-mobile-nav="frame"] [class*="Mbwy4a_body"] {
    min-width: 0;
    overflow-x: hidden !important;
  }
  [data-mobile-nav="frame"] [class*="Mbwy4a_title"],
  [data-mobile-nav="frame"] [class*="Mbwy4a_detail"],
  [data-mobile-nav="frame"] [class*="Mbwy4a_reviewNote"] {
    overflow-wrap: anywhere;
  }
  [data-mobile-nav="frame"] [class*="Mbwy4a_optionLabel"],
  [data-mobile-nav="frame"] [class*="Mbwy4a_description"] {
    min-width: 0;
    overflow-wrap: anywhere;
  }
  /* B 的 header 锚必须排掉 _headerActions：class 属性里 "Mbwy4a_header" 是
     "Mbwy4a_headerActions" 的前缀子串（pitfalls §哈希子串：前缀重叠片段用 :not
     防误伤），少了这个 :not 就会把动作行的 padding 一起改成 10px 8px 0 12px。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [class*="Mbwy4a_frame"] {
      padding-left: var(--dsh-composer-side-clearance, 16px) !important;
      padding-right: var(--dsh-composer-side-clearance, 16px) !important;
    }
    [data-mobile-nav="frame"] [class*="Mbwy4a_header"]:not([class*="Mbwy4a_headerActions"]) {
      position: relative;
      padding: 10px 8px 0 12px !important;
    }
    /* 2026-10-25 owner 真机反馈「你提的问题右边有一大片留白，真的舒服吗」：
       宿主把动作行（收起/关闭 + 我们注入的展开）当普通 flex 项摆在同一行，
       「_headingBlock」 只有 min-width:0、没有 flex-grow —— 三颗 24px 图标 + 12px
       gap（我们扩过 gap）合计 ≈96px 的**整块**列被从正文里永久扣掉：问题正文
       只有卡宽 − 96 − 16gap ≈ 230px（≈ 屏宽的 64%），而且每一行都短、右侧永远
       空一截。图标只在卡头那一行有用，正文没理由陪着让位。
       改法：动作行脱离 flex 流（绝对定位到卡头右上），headingBlock 吃满整行；
       首行之下不再被图标占用。代价是 eyebrow 必须自己让开图标列（短标题，
       margin-right 给足 116px 即可，长了它会换行而不是压到正文）。
       40px 顶部：8 行高 + 图标 24px + 两次 4px 呼吸，标题第一行不会钻到图标
       底下（实测图标底边 30，标题顶边 34）。
       间距 2026-10-25 二批由 6 改 20：44px 热区要求三颗图标两两中心距 ≥44px，
       否则外扩的命中盒会彼此叠住、抢同一笔（见下一条）。可见图标仍是 24px，
       整排从 84px 变 112px；动作行 top 6 → 10 让 44px 热区整块落在卡片内。 */
    [data-mobile-nav="frame"] [class*="Mbwy4a_headerActions"] {
      position: absolute;
      /* 10 而不是 6：宿主 _card 是 overflow:hidden，热区顶边要落在卡片内
         （6 − 10 = −4 会被裁掉 4px，44 只剩 40）。10 − 10 = 0，整 44 都在卡内；
         图标可见位置随之下移 4px（底边 34），仍不超过正文顶边。 */
      top: 10px;
      right: 6px;
      gap: 20px !important;
      z-index: 1;
    }
    /* 三颗图标的 44px 热区（2026-10-25 二批，owner 拍板「拉到 44」）：
       宿主只给 _iconButton 24×24 的盒子，本插件注入的展开键同样 24×24；
       24 + 20 间距 = 44，据此把每颗的透明 ::after 外扩 10px：44×44，相邻热区
       刚好相接、不重叠（再大就互相抢笔，见上一条 gap）。::after 只管命中，
       可见尺寸 / 圆底 / 行高一律不动（与 035dd21 的 44px 热区同一手法）。
       纵向会伸进正文首行右侧约 13px（热区 y 6~50、正文顶边 33）：正文不可点，
       可接受；换来的是 44px 的最小命中。 */
    [data-mobile-nav="frame"] [class*="Mbwy4a_headerActions"] [class*="Mbwy4a_iconButton"] {
      position: relative;
    }
    [data-mobile-nav="frame"] [class*="Mbwy4a_headerActions"] [class*="Mbwy4a_iconButton"]::after {
      content: '';
      position: absolute;
      inset: -10px;
    }
    [data-mobile-nav="frame"] [class*="Mbwy4a_headingBlock"] {
      flex: 1 1 100%;
      min-width: 0;
    }
    [data-mobile-nav="frame"] [class*="Mbwy4a_eyebrow"] {
      /* 112（三颗 24 + 两个 20 间距）+ 6 右距 − 8 卡头右内边距 + 4 呼吸 ≈ 116：
         图标列整体右移后，eyebrow（短标题）不能钻到里面。 */
      margin-right: 116px;
    }
    /* 正文可读性（owner 两轮口径）：第一轮「太挤」→ 16/24；第二轮「字体缩小一点，
       但不要太缩小」→ 15/23。取宿主手机档正文族的字号（15px），只把行距从 21 抬到
       23 —— 字号不动、行距放宽，是同一密度带里最保守的一档，不再自创刻度。
       首行 padding-top 2：图标底边 30，标题顶边 = 10 + 16 + 5 + 2 = 33，仍不重叠。
       Markdown 段落（_detail 走 MarkdownText）补 8px 段距，末段不留尾隙。 */
    [data-mobile-nav="frame"] [class*="Mbwy4a_title"] {
      padding-top: 2px;
      font-size: 15px;
      line-height: 23px;
      /* owner 第三轮（2026-10-25）：问题正文本身也要封顶 —— 超长问题现在会把卡头
         撑到占满整张卡（body 被压成一条缝、底部按钮被顶出可视区）。宿主把 question
         正文渲染成 header 里的 h2、header 是 flex-shrink:0，所以正文多长卡头就多高。
         这里让正文自己变成和下面选项区同族的滚动容器：超过 min(34vh,232px) 就在
         标题内部滚动（键盘态 vh 会缩，232 是竖屏 360×792 下 34vh≈269 的封顶值，
         保证 body 至少还剩半屏可用）。2026-10-25 第三轮再次收窄：owner 实测
         「问题区还是太长，再缩 1/3」→ 34vh/232px 的三分之二 ≈ 23vh/155px
         （约 6~7 行正文），问题区与选项区高度观感终于同级。
         overscroll-behavior:contain 防止滑到底后
         把会话一起带走；touch-action 按全库约定写 pan-y pinch-zoom。 */
      max-height: min(23vh, 155px);
      overflow-y: auto;
      overscroll-behavior: contain;
      touch-action: pan-y pinch-zoom;
      scrollbar-width: none;
    }
    [data-mobile-nav="frame"] [class*="Mbwy4a_title"]::-webkit-scrollbar {
      display: none;
    }
    /* 排版微调（owner 2026-10-25）：问题区与选项区之间加一条分隔线——两段内容
       同色同字重，靠留白分不开，读起来像一段连续文字。用 0.5px 光学细线
       （本库弹层/卡片的既有刻度，见 b-end 的那套 0.5px 微边框约定）。颜色取宿主
       描边色阶的第二档 --dsw-alias-border-l2：l1 在真机上「几乎看不见」，l2 是宿主
       自己给浮层描边用的那一档（elevation-stroke-color 也是它），「看得见但不显眼」；
       深浅仍随主题走，不自造色值。
       线画在 header 的 border box 上 = 卡片整宽，与卡片的圆角裁剪路径一致；
       padding-bottom 2 → 8 给线上下各留呼吸。 */
    /* 线画在伪元素上而不是 border：owner 三轮口径（l1「几乎看不见」→ l2「太深了」）
       说明要的是两档之间。同一个 token 加 opacity 比再找一档色值可控，也仍然跟随
       主题（深浅两侧都比 l2 淡同样的比例）；0.5px 高度 = 本库的微边框刻度。 */
    [data-mobile-nav="frame"] [class*="Mbwy4a_header"]:not([class*="Mbwy4a_headerActions"]) {
      position: relative;
      padding-bottom: 8px;
    }
    [data-mobile-nav="frame"] [class*="Mbwy4a_header"]:not([class*="Mbwy4a_headerActions"])::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 0.5px;
      background: var(--dsw-alias-border-l2, rgba(0, 0, 0, 0.14));
      opacity: 0.55;
      pointer-events: none;
    }
    [data-mobile-nav="frame"] [class*="Mbwy4a_options"] {
      padding-left: 8px;
      padding-right: 8px;
    }
    [data-mobile-nav="frame"] [class*="Mbwy4a_detail"] p {
      margin: 0 0 8px;
    }
    [data-mobile-nav="frame"] [class*="Mbwy4a_detail"] p:last-child {
      margin-bottom: 0;
    }
  }
  /* C：展开/收起按钮，与宿主那两颗 24px 图标键同盒。三颗统一 44×44 命中盒
     （::after ±10；间距 20 见上面手机档「三颗图标的 44px 热区」一条），
     可见图标仍是 24px。 */
  [data-mobile-nav="frame"] [class*="Mbwy4a_headerActions"] [data-mobile-nav="question-expand"] {
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
  [data-mobile-nav="frame"] [class*="Mbwy4a_headerActions"] [data-mobile-nav="question-expand"]::after {
    content: '';
    position: absolute;
    inset: -10px;
  }
  [data-mobile-nav="frame"] [class*="Mbwy4a_headerActions"] [data-mobile-nav="question-expand"] svg {
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
  [data-mobile-nav="frame"][data-mobile-nav-question-full] [class*="Mbwy4a_frame"] {
    --dsha-mobile-question-band: calc(
      var(--dsha-mobile-visible-vh) - var(--mobile-nav-header-h) - var(--dsha-mobile-question-reserve, 0px)
    );
  }
  [data-mobile-nav="frame"][data-mobile-nav-question-full] [class*="Mbwy4a_card"]:not([class*="Mbwy4a_cardMinimized"]) {
    height: var(--dsha-mobile-question-band, auto);
    max-height: var(--dsha-mobile-question-band, min(60vh, 520px));
  }
  /* ===== 手机档作用域补充（2026-10-13）=====
     下面四组是本批（2026-10-12/13）顶栏改动里「共用档已还原成本批之前的值、
     手机档需要另一个值」的那部分。它们与本文件里其它 @media (max-width: 767px)
     and (pointer: coarse) 嵌套块同权限 —— 同层 + 同特异性 + 书写在后，覆盖共用档。 */
  /* ① 标题簇右侧预留：共用 46px（给右端文件夹按钮）→ 手机档 34px。
     34 是 2026-10-12/13 那串「46 → 40 → 36 → 32 → 26 → 34」的终值，每一档的动机：
       46 → 40：后台任务圆点搬进标题行后偏左、与预设 chip 显得拥挤，收 6px 整簇右移；
       40 → 36：文件夹按钮盒子从 x=349 起、36px 宽，36 让整簇右缘正好贴到它的左沿
                （视觉上离图标仍余 10px 内边距），是**安全上限**，再往下会压进命中区；
       36 → 32：与「文件夹按钮右移 4px」**配对** —— 只移按钮不缩本值，两者之间会凭空
                多出 4px（用户要的是整组右移，不是拉开）；
       32 → 26：与「文件夹座位 36→30」**配对** —— 座位窄 6px 后其左沿右移 6px；
       26 → 34：用户反馈圆点离文件夹太近（0px），左下 8px 后按钮盒内还有 7px 内边距到
                图标，视觉距离约 15px。代价：整簇左移 8px，标题窗口相应窄 8px。
       2026-10-17：数值不变，只把这条预留从 padding 改记 margin —— 理由同共用档那条
       （滚动容器的裁剪线在 padding box，padding 预留挡不住溢出，chip 会被文件按钮
       压住）。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header [class*="_titleCluster"] {
      padding-right: 0 !important;
      margin-right: 34px !important;
    }
  }
  /* ② 标题行三个（标题 / 预设 / 后台任务）之间的间距：共用 4px → 手机档 6px
     （2026-10-12 用户要求；本条管「标题 ↔ 右侧 chip 簇」）。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleCluster"] {
      gap: 0 6px !important;
    }
  }
  /* ③ 标题本体：共用 100px 横滑窗 + clip（截断处是硬切，像被裁掉）→ 手机档
     可扩展 + 省略号（2026-10-12 用户规格）。第一轮收 80px 硬顶，第二轮取消硬顶改
     100%：硬顶的问题是「关掉团队 chip 后腾出的空间标题吃不到」；改成 100% 后由 flex
     决定 —— 右侧各 chip 是 flex 0 0 auto（不收缩，先拿够自己的地方），标题再吃掉
     剩下的，不够时由本条 ellipsis 收尾，既有 72px 地板（在 _crumbs 上）仍兜底。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_crumbs"] [class*="_crumbCurrent"] {
      max-width: 100% !important;
      overflow-x: hidden !important;
      text-overflow: ellipsis !important;
      /* 共用档保留本批之前的 pan-x（那时标题是横滑窗，横滑要先被浏览器认领，
         免得左缘抽屉手势抢走这一笔）；手机档改成不横滑的省略号窗口 ⇒ 横滑认领
         随之撤掉，否则手势层的判定与实际可滚动性对不上。
         写成 pan-y pinch-zoom（而不是 auto）与全库其余的 touch-action 声明同形，
         tests/ios-zoom-guard.test.ts 会逐条检查「非 pan-x 的值必须含 pinch-zoom」。 */
      touch-action: pan-y pinch-zoom !important;
    }
  }
  /* ④ 动作行内各 chip 之间：共用 4px → 手机档 6px（2026-10-12 用户要求）。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerActions"] {
      gap: 6px !important;
    }
  }
  /* @patch
     id: zen-remote-header-yield
     for: dsh-zen-remote 2.2.5 的手机档 header reflow（headerActions 里注入 [data-mobile-nav="header-back"]，titleRow 改成 92px/1fr/92px 三栏，titleCluster 靠 display:contents 变成直系 grid 项）
     why: 本插件 0.2.x 块对 _titleCluster 的 display:flex !important 会打败 zen-remote 的 display:contents，集群退化成一个 92px 的 grid 项，再减 34px 预留只剩 58px，注入的 44px 返回键被 overflow-x:auto 裁掉；改 titleRow 列模板会把 zen-remote 的三栏整体压平、返回键落到右上，不能治根
     until: dsh-zen-remote 不再重排 header，或它改为不依赖 display:contents 的稳定槽位，届时删本块
     test: tests/a2-header-gating.test.ts
  */
  @media (max-width: 767px) and (pointer: coarse) {
    /* zen-remote 2.2.5 的手机档 home CSS 把本插件的 toggle 藏了，32px 的开关座位
       在这条路径上是死空间；归零后返回键落在 x≈8 的原生位，而不是 x≈40。 */
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has([data-mobile-nav="header-back"]) [class*="_titleRow"] {
      padding-left: 0 !important;
    }
    /* 让回 zen-remote 的三栏：集群不生成盒子，crumbs / headerActions 直接落进它的 grid。
       只在 header-back 在场时生效——没装 zen-remote 的页面仍走共用档的 flex 集群。 */
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has([data-mobile-nav="header-back"]) [class*="_titleCluster"] {
      display: contents !important;
    }
    /* 共用档用 margin-left:auto + flex-end 把动作行贴右；在 zen-remote 的第 1 列里
       那会把返回键推离列首（实测 x≈118，落在 58px 滚动盒外），归零后它贴列左缘（x≈8）。 */
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has([data-mobile-nav="header-back"]) [class*="_titleCluster"] > [class*="_headerActions"] {
      margin-left: 0 !important;
      justify-content: flex-start !important;
    }
    /* 共用档为了横滑窗保留 overflow:visible；zen-remote 的居中标题靠 hidden 裁边。 */
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has([data-mobile-nav="header-back"]) [class*="_titleCluster"] > [class*="_crumbs"] {
      overflow: hidden !important;
    }
  }
  /* ===== 对话区留白 + 输入框高度（2026-10-20，店主截图定档）=====
     店主三处「留白太多」＋「输入框太小」，只对真·手机档生效（平板保持上游排布）。
     真机读数（1380×3036，dpr≈3.83，下同）：
       · 思考行文字底 → 运行状态分隔线 99 设备px、分隔线 →「深度求索中」文字 59（合计 158）；
       · 「深度求索中」文字底 → 输入卡片上缘 82；
       · 回复正文文字底 → 动作行图标顶 112。
     每条都取宿主自己那一层旋钮，不碰别的间距（一次只动一处，便于逐条回滚）：
       ① 运行状态是宿主的稳定标记 [data-chat-running]，它自己声明 --dsh-chat-flow-gap:12px
          给自己的 margin-top 供值；分隔线内距是 8/10。首轮按「旋钮各自减半」落成 6/4/5，
          真机复测「思考行文字底 → 分隔线」只从 99 降到 63（约 64%，不是 50%）——
          因为两行文字各自的 29px 行盒里还有约 25 设备px 的固定行距收不掉。于是第二轮按
          「文字到文字减半」反推：三条边距合计压到 11px（运行状态 margin-top 4、分隔线上 3、
          下 4），实测 99 → 51、158 → 86，才是店主眼里的「一半」。这一条同时把宿主
          「turn-process 之后 16px」那一档压平（合计仍是 8px）；header 那套页签规则不参与。
       ② 「深度求索中」到输入卡片之间没有别的留白，就是聊天滚动区的 padding-bottom；
          同样是先 16 → 8（实测 82 → 50，只有 61%），再收到 6px（实测 82 → 42）。
          滚动区用「直接子节点带 data-chat-flow」认 —— 带这个标记的元素不止一处
          （step-process 的内容容器也带），靠「_scroll 祖先 + 直接子代」两点收窄才不会误伤。
       ③ 动作行挂在 turn-tail（[data-turn-tail]）里，与正文的间距 = 流间距 12px +
          动作行自身 margin-top 4px ⇒ 把承载它的 flowItem（data-chat-flow-kind="turn-tail"）
          的流间距压到 4px，合计 8px，正好一半。
       ④ 输入卡片内的上下分布（2026-10-20 二轮）：首轮把编辑器 min-height 抬到 40px，
          真机看「文字 ↔ 功能键」空出 19px（卡片 65 → 77），功能键离卡片底缘却只剩 2px，
          店主两处都不满意。改成「文字段落回原高 + 给功能键留出底部呼吸」：编辑器回到共用档
          的 28px（本条覆盖物一并撤掉），行内底部给 6px——功能键相对卡片底缘上移 6px（2 → 8），
          文字与功能键之间由 19 回到 7px，卡片净高 71px（键行 30px 时为 73px）。
          会话区底部吸底，长高只往上吃聊天区，底部 stats 行不位移。
       2026-10-20 十轮（店主：「不行太挤了，还原吧」）：七～九轮对消息流的收紧
       （turn-tail 内部 gap 0、userRow gap 2 与时间行盒 20、turn-process 5、上下文环命中盒 -3）
       已整段删除，全部回到宿主默认值（16 / 6 + 28 / 16 / -4）；上面 ①～④ 是本轮之前
       店主已逐条验收过的值，保留。 */
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
  /* ===== 输入区功能键尺寸（2026-10-20 三轮 → 四轮）=====
     三轮初版把整行盒子统一抬到 32px，真机看「很不协调：偏中间那几颗（权限 / 模型 /
     语音）下面很空」——圆键（加号、发送 / 停止）有可见圆底，盒子就是它的可见边界；
     中间几颗是**无底图标键**，盒子加高只会给图标多垫一圈透明空白，眼睛读到的是
     「图标变小了、下面还空着」。所以盒子尺寸按元素分档，不再统一：
       · 有可见圆底的：加号、📎、发送 / 停止 = 30px（比原来 28 大一档，比 32 收一档）；
         📎 也走这一档，margin-left 由 -8 收到 -9（盒子 +2px 的一半），图标中心原地不动；
       · 无底图标键（权限 / 模型 chip / 语音）= 盒子不动，靠**图标**变大，一律 18px：
         加号 14、权限 14（.iWlSmW_triggerIcon svg）、模型 16、📎 与主键 16；
       · 上下文环不动 —— 它本来就是 18px 的仪表，图标统一到 18 后整行反而齐了。
     上一轮为「图标键」加的那两条透明 min-height 已删除（就是它们制造的空白）。 */
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
      /* 宿主 .uV2eYG_primary 自带 transform: translateY(-2px)（给 34px 主键做光学对齐）。
         现在整排键同高 30px、盒中心对齐，保留 -2px 会让发送/停止键比旁边高 2px
         （真机实测：蓝键中心 2817、其余图标 2825）。这里归零。 */
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
    /* 图标统一 18px（宿主：加号 14、主键 16；📎 是我们自己的控件，也是 16）。 */
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) [class*="_add"] svg,
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_primary"] svg,
    [class*="_trailing"] > [class*="_primary"] svg,
    [data-mobile-nav="frame"] [data-phase] [data-composer-card] [data-mobile-nav="file-upload"] svg {
      width: 18px !important;
      height: 18px !important;
    }
    /* 无底图标键：权限 / 模型 chip / 语音，图标一律 18px（宿主：权限 14 / 模型 16 /
       语音本来就是 18）。**两种形状都要写**：权限把图标包在 _triggerIcon 包装里
       （iWlSmW_triggerIcon > svg），模型的 triggerIcon 直接挂在 svg 自己身上
       （ModelSelect 的 IconDataOutlineRegular 带 className=triggerIcon）—— 只写
       「… _triggerIcon svg」时模型那颗静默不中（四轮真机复测墨迹 55 → 56 设备px）。
       上限 18：再大就会压到 ⌄ 的节距（图标与 chevron 之间只有 ~2px）。 */
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] [class*="_triggerIcon"],
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] [class*="_triggerIcon"] svg,
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [class*="_triggerIcon"],
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] button[class*="_trigger"]:not([aria-haspopup]) svg {
      width: 18px !important;
      height: 18px !important;
    }
    /* ===== 功能键颜色统一（2026-10-20 五轮）=====
       店主：「功能键有部分是加黑加深的，有部分是灰色的，颜色不协调」。
       真机取色（设备像素，按最暗的实心像素）：
         · 加号 #07080c、📎 #08070c、语音 #08080a —— 近黑（label-primary）；
         · 权限 ⚠ #5a5c60、模型图标 #595c62 —— 灰（label-secondary）；
         · 两个 ⌄ #a6aaab —— 更浅一档（label-caption），宿主自己给 ⌄ 的层级。
       三种来源：加号是宿主 .uV2eYG_add 的 color:label-primary；📎 是我们的按钮
       color: inherit（吃到卡片正文色）；语音键没写 color 所以继承；
       权限/模型是宿主写死的 label-secondary。手机上把整行图标统一到
       **label-secondary**（与占多数的权限/模型/环一致，⌄ 仍留 caption 层级），
       发送键保持蓝色主色不动。只作用于手机档：平板/桌面保留宿主原本的分层。
       语音键不能靠「:not([aria-haspopup])」认：语音不可用时宿主会临时给它
       aria-haspopup="dialog"（打开安装引导），那一刻颜色就会漏掉、又变回黑的。
       改用它的锚点包装 _triggerAnchor > button。
       想反过来走深色的话，把这五条里的 token 换成 --dsw-alias-label-primary 即可。 */
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) [class*="_add"],
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [class*="_triggerAnchor"] > button,
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] [class*="_trigger"],
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_root"] > [class*="_trigger"],
    [data-mobile-nav="frame"] [data-phase] [data-composer-card] [data-mobile-nav="file-upload"] {
      color: var(--dsw-alias-label-secondary) !important;
    }
  }
}
`;var Cn=`@media (max-width: 1023px) and (pointer: coarse) {
  /* ---------- dsh-web-ui family compatibility ----------
     The linxin666 plugin suite extends the shell frame directly:
       - aionui-panel appends two trailing grid columns (explorer / preview)
         plus absolute drag handles to [data-dsh-frame]; its 5-track inline
         grid is already overridden above, but the handles and columns would
         still float over the main UI. On mobile the columns leave the grid
         as floating bottom sheets and keep their own visibility state —
         the suite's collapse chevron / preview tabs still work, so no
         feature is lost. The task-board / ssh plugins inject sidebar
         entries and center-column takeover panels; the entries need
         spacing and the kanban needs scrollable columns. */

  /* Touch devices: the drag handles are useless — the floating expand
     button is the opener. */
  .aionui-explorer-handle,
  .aionui-preview-handle {
    display: none !important;
  }

  /* Shared base: both columns leave the grid as floating panels. The
     explorer is gated shut by default (its own persisted expanded state
     must never cover the mobile UI on load); the header Files action opens
     it via the frame marker below, and the sheet's own collapse chevron
     clears it. Preview stays owned by the suite (hidden while no tab is
     open). The per-column rules below override the geometry. */
  [data-aionui-explorer-col],
  [data-aionui-preview-col] {
    position: fixed !important;
    z-index: 55 !important;
    background: var(--aion-bg-base, #ffffff) !important;
    border-left: none !important;
  }
  /* Explorer (file tree) bottom sheet: bottom edge aligned exactly with
     the composer card's bottom line — the card sits 36px above the
     viewport bottom (8px composer padding + the 28px stats strip below
     the card), so the sheet uses the same 36px bottom offset. */
  [data-aionui-explorer-col] {
    visibility: hidden !important;
    left: 8px !important;
    right: 8px !important;
    top: auto !important;
    bottom: 36px !important;
    width: auto !important;
    /* vh 行在前、dvh 行在后（pocket 补丁）：无 dvh 引擎把 dvh 声明整条丢弃，
       回退行保证 sheet 仍有高度。 */
    height: min(55vh, 460px) !important;
    height: min(55dvh, 460px) !important;
    max-height: calc(100vh - 44px) !important;
    max-height: calc(100dvh - 44px) !important;
    border-radius: 14px !important;
    overflow: hidden !important;
    box-shadow: 0 -4px 28px rgba(0, 0, 0, .18) !important;
    animation: dsh-web-mobile-sheet-up .24s var(--ds-ease-out, ease-in-out) !important;
  }
  /* Preview (file content) bottom sheet. Gated shut by default: the suite
     persists open preview tabs in localStorage and restores them on load,
     which would pop the sheet over the fresh UI. The client only sets the
     frame marker after the user taps a file row in the explorer; the
     suite's own collapse chevron clears it via the visibility watcher. */
  [data-aionui-preview-col] {
    visibility: hidden !important;
    position: fixed !important;
    left: 8px !important;
    right: 8px !important;
    top: auto !important;
    bottom: 40px !important;
    width: auto !important;
    /* vh 行在前、dvh 行在后（pocket 补丁），同上。 */
    height: min(50vh, 420px) !important;
    height: min(50dvh, 420px) !important;
    max-height: calc(100vh - 48px) !important;
    max-height: calc(100dvh - 48px) !important;
    border-radius: 14px !important;
    overflow: hidden !important;
    box-shadow: 0 -4px 28px rgba(0, 0, 0, .18) !important;
    z-index: 56 !important;
    animation: dsh-web-mobile-sheet-up .24s var(--ds-ease-out, ease-in-out) !important;
    /* Fullscreen toggle (issue #8): animate the geometry change instead of
       snapping. visibility is deliberately not listed, so opening/closing
       the sheet stays instant; the open/close keyframes own transform. */
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
  /* User-opened preview sheet (frame marker, set on file-row tap). */
  [data-mobile-nav="frame"][data-aionui-preview-open] [data-aionui-preview-col] {
    visibility: visible !important;
  }
  /* The Files action opens the explorer sheet (frame marker). */
  [data-mobile-nav="frame"][data-aionui-explorer-open] [data-aionui-explorer-col] {
    visibility: visible !important;
  }
  /* While the preview sheet is up, the explorer sheet yields (two stacked
     bottom sheets would read as one broken overlay). Closing the preview
     via its collapse chevron / tab close clears the marker, and the
     explorer sheet returns. Same specificity as the explorer-open rule, so
     this must stay AFTER it. */
  [data-mobile-nav="frame"][data-aionui-preview-open] [data-aionui-explorer-col] {
    visibility: hidden !important;
  }
  /* The open drawer must never sit under a sheet: while the frame is in the
     narrow-expanded state both sheets yield (later in the file than the
     open marker rule, so it wins at equal specificity). The fullscreen
     toggle is a descendant of this column, so it is hidden with the rest of
     the column — there is no separate drawer-open rule for it. */
  [data-mobile-nav="frame"]:not([data-sidebar-collapsed]) [data-aionui-explorer-col],
  [data-mobile-nav="frame"]:not([data-sidebar-collapsed]) [data-aionui-preview-col] {
    visibility: hidden !important;
    display: none !important;
  }
  /* The suite's own expand button reads the store state we bypass on
     mobile — hide it; the header Files action is the opener. */
  .aionui-floating-expand {
    display: none !important;
  }

  /* Preview sheet fullscreen toggle (issue #8): a fixed button parked in the
     sheet's titlebar row, just left of the suite's collapse chevron (24px at
     right:8px of the sheet, and the sheet spans 8px..(100vw-8px)). The top
     calc mirrors the sheet geometry above (bottom 40px + min(50dvh, 420px));
     when the frame carries "data-mobile-preview-full" the sheet goes
     fullscreen and the button moves to the viewport corner. */
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
    /* Native look: same size/radius/hover language as the suite's tab-bar
       icon buttons (the 20px panelCollapse next to it). The button lives
       INSIDE the preview column, so it rides the sheet's own open
       animation and geometry transition — no curve matching needed. */
    transition: background-color .15s, top .24s var(--ds-ease-out, ease-in-out);
  }
  /* 44px 热区：20×20 的按钮外扩——纵向 ±12px（标题栏行内上下都有空），横向只能
     ±4px（右侧 8px 外就是宿主自己的 20px 收起键：两颗命中盒再宽就会互相压住，
     变成「点收起却展开」。该约束与上面「头部按钮热区」那组同一来源）。 */
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
  /* Keep the last tab (and the "+" URL-tab trigger) from sliding under the
     fullscreen toggle: reserve the right end of the preview tab row. */
  [data-aionui-preview-col] [class*="_tabScroll"] {
    padding-right: 34px !important;
  }
  /* Visible only while the preview sheet is open. Visibility itself is
     inherited from the column, so the sheet's own hide rules (collapse,
     drawer open) cover the button too. */
  [data-mobile-nav="frame"][data-aionui-preview-open] [data-aionui-preview-col] [data-mobile-nav="preview-full-toggle"] {
    display: inline-flex !important;
  }
  /* Icon swap on the frame fullscreen marker. */
  [data-mobile-nav="preview-full-toggle"] .dsh-web-mobile-full-out {
    display: none !important;
  }
  [data-mobile-nav="frame"][data-mobile-preview-full] [data-aionui-preview-col] [data-mobile-nav="preview-full-toggle"] .dsh-web-mobile-full-in {
    display: none !important;
  }
  [data-mobile-nav="frame"][data-mobile-preview-full] [data-aionui-preview-col] [data-mobile-nav="preview-full-toggle"] .dsh-web-mobile-full-out {
    display: inline !important;
  }
  /* Fullscreen preview: the sheet fills the whole viewport (notch included);
     the safe-area padding drops the titlebar row below the status bar, and
     the toggle follows the titlebar into the top corner. */
  [data-mobile-nav="frame"][data-aionui-preview-open][data-mobile-preview-full] [data-aionui-preview-col] {
    inset: 0 !important;
    left: 0 !important;
    right: 0 !important;
    top: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    /* vh 回退行在前（pocket 补丁），无 dvh 引擎丢弃 dvh 行后仍有高度。 */
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
  /* Fullscreen: the column fills the viewport, so the button follows the
     titlebar row down below the notch. */
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

  /* dsh-web-ui sidebar entries (task board / ssh) sit flush against each
     other — give the injected rows breathing room. */
  button[data-dsh-taskboard-entry],
  button[data-dsh-ssh-entry] {
    margin-bottom: 8px !important;
  }

  /* Task board: five kanban columns at minmax(0,1fr) crush into ~78px phone
     strips. Give every column a usable minimum and let the row scroll. */
  [data-dsh-taskboard-board] > [class*="_columns"] {
    grid-template-columns: repeat(5, minmax(240px, 1fr)) !important;
    overflow-x: auto !important;
  }
  /* The floating button must not float over a takeover panel (task board /
     ssh own the center column while active). */
  html[data-dsh-taskboard-active] [data-mobile-nav="fab"],
  html[data-dsh-ssh-active] [data-mobile-nav="fab"],
  html[data-dsh-taskboard-active] [data-mobile-nav="backdrop"],
  html[data-dsh-ssh-active] [data-mobile-nav="backdrop"] {
    display: none !important;
  }
  /* Board header: let the search field take the slack instead of squeezing
     the action buttons. */
  [data-dsh-taskboard-board] > [class*="_boardHeader"] [class*="_search"] {
    flex: 1 1 auto !important;
    min-width: 80px !important;
  }

  /* ---------- dsh-web-ui polish: plugin market search ----------
     The market tab row (Discover / Themes / Installed + the plugin search
     box) is a no-wrap flex: at 390px the tabs plus the ~218px search box
     (~475px total) overflow the ~334px sheet and the search box runs off
     the right edge of the screen (it also forces a horizontal scrollbar on
     the sheet's options area). Let the row wrap: the tabs keep the first
     line and the search box gets its own full-width second line. */

  [aria-modal="true"] [class*="_tabs"] {
    flex-wrap: wrap !important;
    row-gap: 8px !important;
  }
  [aria-modal="true"] [class*="_searchInline"] {
    flex: 1 1 100% !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  /* iOS Safari auto-zooms a focused input whose computed font-size is below
     16px. dshmarket's tab search uses the shared primitive Input at 13px;
     raise only this market-owned field on mobile so focusing it keeps the
     current viewport scale. Scoped to the market root to avoid changing
     unrelated settings/search fields; pinch zoom stays available. */
  [data-dsh-market-root] [class*="tabSearch"] input,
  [data-dsh-market-root] input[class*="tabSearch"] {
    font-size: 16px !important;
  }

  /* ---------- dshmarket polish: Tasks operations popup ----------
     Upstream .opPanel is a small dropdown pinned to the right edge of its
     ~54px trigger button; on a phone it reads as stuck to the sheet edge
     instead of centered. Promote it to a fixed, viewport-centered card:
     no ancestor between the popup and the viewport carries a transform,
     so position:fixed centers against the real viewport (a plain left:50%
     would resolve against the tiny relative trigger wrapper and land even
     further right). The upstream 86vw width cap, 70vh max-height and
     internal scroll all still apply; the close button stays inside.
     2026-09-25: re-anchored from [data-mobile-nav="frame"] [aria-modal]
     to the market's own root marker — since rc.2 the whole settings
     sheet (market included) is portaled to <body> and no longer matches a
     frame-descendant selector. */
  [data-dsh-market-root] [class*="_opPanel"] {
    position: fixed !important;
    top: 50% !important;
    bottom: auto !important;
    left: 50% !important;
    right: auto !important;
    transform: translate(-50%, -50%) !important;
    /* pocket 补丁：唯一无 z-index 的 fixed 层——不钉层级时后来居上的兄弟
       层可把它盖住。 */
    z-index: 60 !important;
  }

  /* ---------- dshmarket polish: header title row ----------
     The title row (icon + title + repo link + version + optional
     "Update market" / "Update all" buttons) is a nowrap flex whose
     natural width (~450px with both update buttons) exceeds the ~334px
     sheet. Flex then crushes the flexible items below their content
     width and every label wraps word-by-word — the "text turns
     vertical" report. Trigger is state-dependent (the buttons only
     exist while plugin updates are pending), which explains the
     sometimes-horizontal/sometimes-vertical flapping. Let the row wrap
     instead: line 1 keeps icon + title + repo + version, the update
     buttons get their own full-width-feeling second line, and the title
     itself is locked to one ellipsized line no matter what follows it.
     2026-09-25: re-anchored from [data-mobile-nav="frame"] [aria-modal]
     to the market's own root marker — since rc.2 the whole settings
     sheet (market included) is portaled to <body> and no longer matches a
     frame-descendant selector. Same day, second pass: the ported rule's
     flex:1 1 auto on the title GREW it to fill the row, which pushed the
     repo link and the version "v1.65.1" to the far right — exactly where
     the pinned toolbar's close ✕ sits, crowding the corner the owner
     reported as "很容易误触" (hit-test: the version box reached x≈378,
     the close ✕ starts at x=350). flex:0 1 auto keeps the title at its
     natural width (repo + version pack left, as upstream intends) while
     still letting it shrink-and-ellipsize when the update buttons force a
     wrap — the wrap rule above, not flex-grow, is what makes room for
     them. */
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

  /* ---------- dshmarket polish: card byline stays on one line ----------
     The byline (avatar · owner · version · ↓downloads · ★stars) is a
     wrapping flex row by upstream design — the market would rather drop
     the counts to a second line than over-shrink the owner name (its
     .owner carries flex:0 1 auto + ellipsis + min-width:44px exactly for
     that). At a phone's card width the break point lands mid-row though:
     everything but the star fits, so a lone "· ★ 8k" wraps onto its own
     line under the author — inconsistent with the cards that happen to
     fit, which reads as a rendering bug (owner report 2026-09-25,
     IMG_4208: dsh-remote-web-ui and dsh-skill-explorer both orphaned the
     star). Pin the row to one line instead: the owner is the market's own
     flexible item, so it absorbs the squeeze and the counts stay whole.
     Desktop cards are far wider than the row and never wrapped anyway. */
  [data-dsh-market-root] [class*="_byline"] {
    flex-wrap: nowrap !important;
  }

  /* ---------- dshmarket polish: top inset ----------
     The sheet is pinned to the top of the screen (A': top = safe-area +
     12px) and the market page started FLUSH against the sheet's top
     edge — measured 2026-09-25: the title row's gap from the sheet's top
     was 0px while the pinned close ✕ sat 10px under it, so the whole
     page read as crushed against the boundary (owner report, IMG_4211:
     "最上面快要顶到边界了... 把整体往下移一点，有点留白会更美观").
     Give the page the same 12px inset its own horizontal padding already
     has (the root box was 12px from each side, 0px from the top), so the
     title lands ~12px under the sheet's rounded corner, level with the
     close ✕. The market page is the sheet's CONTENT, so it moves; the
     pinned toolbar (close ✕) belongs to the sheet and deliberately does
     NOT move ("关闭按钮可以不动"). Scrolls away naturally with the page.
     Desktop market is vertically centered with the host's own clearance
     and never had this read; the rule is mobile-only. */
  [data-dsh-market-root] {
    margin-top: 12px !important;
  }
  /* Below ~360px the fixed-width counts plus the owner's 44px min overrun
     the card, so the ellipsis eats most of the name ("omds..."). Trade text
     size for name length on the smallest phones: 11px → 10px text and
     6px → 4px gaps buy the owner roughly a third more room while the row
     stays one line. Tablet/phone tiers above this width are unaffected. */
  @media (max-width: 360px) {
    [data-dsh-market-root] [class*="_byline"] {
      gap: 4px !important;
      font-size: 10px !important;
    }
    [data-dsh-market-root] [class*="_byline"] [class*="_dot"] {
      margin-left: 3px !important;
    }
  }

  /* ---------- dshmarket 1.20+ compat: keep the settings nav visible ----------
     Upstream Market.module.css hides the host dialog's nav on phones
     ([role=dialog]:has([data-dsh-market-root]) > nav { display:none } at
     max-width:560px) so the market can take over the dialog; its comment
     assumes the host keeps "its own close button in the content header".
     Our host's only close ✕ lives inside that very nav, so the market
     would leave no categories and no way back or out (dead-end UI,
     2026-08-23). Mirror upstream's exact media condition and restore the
     nav: categories row + ✕ stay above the inline market page.
     2026-09-25 (rc.2 regression): 0.1.7-rc.2 renders this sheet through
     createPortal(..., document.body), so the frame-scoped selector matches
     nothing on rc.2+ hosts and the market takeover silently won — no
     categories row above the market page on every updated phone. The twin
     rule below carries the same declaration on a structural anchor
     ([role=dialog]:has(...) > nav, no frame prefix): on rc.1 hosts the
     frame-scoped rule does the work and the twin is inert (the sheet is a
     frame descendant there); on rc.2+ the twin carries it. Both stay
     inside this file's mobile media wrapper, so desktop never sees them.
     Premise note: this host generation keeps its close ✕ in the CONTENT
     header (pinned top-right — see layout.css), so the dead-end half of
     the 2026-08-23 report no longer applies; the rule is kept and twinned
     for the categories row it restores (guarded by the test suite). */
  @media (max-width: 560px) {
    [data-mobile-nav="frame"] [role="dialog"]:has([data-dsh-market-root]) > nav {
      display: flex !important;
    }
    [role="dialog"]:has([data-dsh-market-root]) > nav {
      display: flex !important;
    }
  }

  /* ---------- dsh-usage-stats polish: usage & balance panel ----------
     The panel's stats row shows three token counters side by side
     (today / month / total). The counters use tabular nowrap figures whose
     min-content width overflows the ~336px panel body on a phone: figures
     clip at the row's edges and the panel grows a horizontal scrollbar.
     Stack the three counters vertically — full-width rows, so the figures
     always fit. */

  [class*="usg_"][class*="_statsRow"] {
    flex-direction: column !important;
  }
  [class*="usg_"][class*="_stat"]:not([class*="_statsRow"]) {
    flex: 0 0 auto !important;
    width: 100% !important;
    min-width: 0 !important;
  }

  /* ---------- dsh-web-ui polish: settings sheet ----------
     Keep the nav tabs on ONE horizontally scrolling row. Setting rows need
     no mobile rework: the host redesigned them into compact space-between
     rows (text left, control right — verified in
     dsh-client-ui-settings-general .Pt1bsG_row, 2026-09-24). The old
     "stack each row" rules, written for the previous two-column generation
     with its dead label/control gap, now fight that design and double every
     row's height; they were removed (see the tombstone below). */

  /* Nav tabs + toolbar: TOMBSTONE (2026-09-25). This whole family —
     the single-row scroller, its hairline scrollbar, the compact cells and
     the hidden "Open configuration file" button — was scoped to
     [data-mobile-nav="frame"] because rc.1 rendered the settings sheet in
     place, inside the app frame. rc.2 wraps the sheet in
     createPortal(..., document.body): the overlay is a direct body child,
     nothing inside it matches a frame-descendant selector, and every rule
     here went dead at once. The live symptoms were the nav cells wrapping
     into uneven rows that slid under the 138px toolbar and the config-file
     button reappearing in that toolbar (owner report 2026-09-25). The
     portal-aware replacements live in layout.css.ts, in the "Settings
     dialog on mobile" section, anchored on the same structural
     :has(> :first-child > :last-child > button) gate (settings sheet only;
     export dialog and directory picker stay excluded). Nothing to restore
     here — do not re-add behind a frame selector. */
  /* Setting rows: no mobile rework — the host renders compact space-between
     rows natively (.Pt1bsG_row: text left, control right, 16px vertical
     padding, .5px divider). The previous "stack each row" rule family
     (column + gap:8 + control width:100% + the 36×20 switch cap that undid
     it) was written for the old two-column generation; on the redesigned
     host it doubled every row's height — the "settings feel vertically
     empty" report 2026-09-24 — and was removed in full. If an older host
     generation ever needs stacking again, reintroduce behind a generation
     guard, not as a blanket [class*="_row"] override. */
  /* Models provider editor: a CLOSED <details> ("_customized", the customized
     models section) must not paint its body. This engine paints the ~1500px
     model catalog of the closed details as a ghost layer anyway: it overlays
     the editor's own action rows (Fetch/Cancel/Apply/Add model) and the
     provider rows BEFORE the editor row in DOM order (those paint under the
     ghost and lose hit-testing), while rows after it paint above. Result
     (owner report 2026-09-19): providers cannot be deleted, "fetch available
     models" does nothing — every tap lands on whatever row overlaps the
     ghost. The host layout is computed for the collapsed details (editor
     217px, rows 903px), so the fix is to restore what the browser should do
     on its own: hide the body while the details is closed. Tapping the
     summary then opens it for real (details 33 → 1532px, rows re-flow,
     every button hittable — verified in place before this rule was written). */
  [aria-modal="true"] details[class*="_customized"]:not([open]) > [class*="_customizedBody"] {
    display: none !important;
  }
  /* Owner dialog footers (_w1urq family: the provider delete confirm, the
     workspace rename dialog, ...): the footer buttons keep white-space
     normal, so any width squeeze — a narrow viewport, a long provider name,
     Android font scaling (owner report 2026-09-19, verified at 320px with a
     1.3x font bump) — wraps the label inside the fixed 36px row where the
     second line clips. Keep each label on one line and let the footer wrap
     whole buttons to a second row instead. */
  [role="dialog"][aria-modal="true"] [class*="_footer"] {
    flex-wrap: wrap !important;
  }
  [role="dialog"][aria-modal="true"] [class*="_footer"] button[class*="_button"] {
    white-space: nowrap !important;
  }
  /* Appearance mode group: give the cube row a consistent bordered
     segmented look (the official borders differ per state). */
  [aria-modal="true"] [class*="_cubeRow"] > * {
    border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, .12)) !important;
  }

  /* ---------- dsh-web-ui polish: explorer sheet ----------
     The aionui explorer was designed for a desktop side column: compact the
     header, search box and tree rows so a phone shows more entries, and pad
     the scroll bottom so the last row never sits flush on the edge. */

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

  /* ---------- dsh-web-ui polish: drawer footer ----------
     The official footerActions row also hosts the remote-web-ui entry row
     (two icon buttons) and the usage/balance badge; without wrapping the
     groups squeeze each other on one line. Wrap so each group gets its own
     row. (The plugin's own footer pill was removed on 2026-10-18 — the
     session-log entry now lives in the drawer brand row.) */
  [data-mobile-nav="frame"] [class*="_footerActions"] {
    flex-wrap: wrap !important;
    gap: 6px !important;
  }

  /* ---------- dsh-web-ui polish: floating pet ----------
     The whale-girl pet (dsh-pet) floats at the viewport corner with a
     persisted, draggable position. Its root is a pointer-events:auto drag
     layer, so while a sheet owns the screen it sits on top of the sheet's own
     content and swallows taps; hide it for that sheet's lifetime.
     2026-10-29 (#248): 0.3.x renamed the root to .dsh-pet-root — the shipped
     bundle carries no _float / _sprite / role=button node at all, so the old
     descendant selector had been dead for the whole 0.3 line. Both generations
     are listed. The mobile scale rule that used to live here is gone: it never
     matched 0.3.x, and the pet's own size setting owns that decision. */
  /* @patch
     id: pet-hidden-under-sheets
     for: dsh-pet 0.3.x 的 .dsh-pet-root（slot shell.overlay）+ 老代际 _float/_sprite 根节点
     why: 宠物根节点是拖拽层，弹层与全屏右侧栏面板期间压住面板内容并吞点击；旧选择器打不到 0.3.x 的根节点
     until: 宠物插件提供「背景 inert 时自行收起」的接缝，或稳定暴露一个语义标记——届时合并本块
     test: tests/pet-overlay.test.ts
  */
  body:has([aria-modal="true"]) .dsh-pet-root,
  body:has([data-sidebar-right-open][data-sidebar-right-panel="fullscreen"]) .dsh-pet-root,
  body:has([aria-modal="true"]) > [class*="_float"]:has([class*="_sprite"][role="button"]),
  body:has([data-sidebar-right-open][data-sidebar-right-panel="fullscreen"])
    > [class*="_float"]:has([class*="_sprite"][role="button"]) {
    display: none !important;
  }

  /* ---------- dsh-web-ui polish: conversation stats line ----------
     The official session-status row (turns / steps / LLM time / TTFT /
     cache) is long. The client marks the exact row with
     [data-mobile-nav="stats"] (text-anchored, hashed classes can't be
     targeted). Layout: ONE fixed-height (28px) flex strip that scrolls
     horizontally — the full metrics stream stays reachable by swiping,
     the row never grows vertically, no ellipsis or fade, 12px gaps
     between metric groups, a 2px scrollbar as the swipe affordance.

     2026-09-23 改档（店主："把那个滑动的压缩一下，固定住，不再滑动"）：
     真机探针实测 可见宽 251px、内容 390px（"10 轮 268 步·244 tok/s" 178 +
     "57.5M tok·缓存命中 99%" 187，gap 12、font 12），右边 ~75px 被 dock 里的
     上下文百分比那块占着 ⇒ 一行本来就放不下。按店主选择：**保持一行 + 末尾
     省略号**。做法：字号 12→10（≈0.83×）、组间距 12→6、去掉为滚动条留的
     4px 下内边距；overflow 改 hidden（不可滑）、滚动条显式干掉；第一组
     flex:0 0 auto 保持完整，最后一组 flex:0 1 auto + min-width:0 自己吃掉
     差额并在末尾出省略号（实测截到"…缓存命…"，tok 数字仍完整可读）。
     高度仍是 28px：composer 的底部占位（8px + 28px）不变，其它几何不跟着动。

      2026-10-06 加档（店主："输入框下面的轮次这一条和输入框底部的距离缩减一下，
      但不能挨得太近，还是要留出一点空间"）。**实测（真机同源 headless，工厂版）**：
      卡片 rect.bottom=808、轮次条 rect.top=812 → flex 间隙只有 4px，视觉间距
      ≈ 4px + 28px 行高里文字上方的约 5px ≈ 9px。所以只上提 2px（margin-top:-2px）
      → 视觉间距约 7px，仍留余量；早前的 -4px 会把间隙压到 0（就是"挨得太近"），
      已按实测改回。不改 28px 行高、不动 composer 底部占位（8px + 28px 几何契约）。 */

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
  /* 第一组（轮次·步数·tok/s）保持完整。 */
  [data-mobile-nav="stats"] > *:first-child {
    flex: 0 0 auto !important;
    width: max-content !important;
    min-width: max-content !important;
    max-width: none !important;
  }
  /* 最后一组（tok 总量·缓存命中）吃掉剩余宽度，末尾省略号。
     2026-09-23 第二版修正：第一版把整组改成 display:block + 子元素 inline，
     结果药丸里的图标变成 inline、基线对齐错位（店主："图标都出现位移"）。
     这版保持 flex 对齐，只让药丸**内部的文字 span** 收缩 + 出省略号；
     图标 svg 固定不缩。另外把两组药丸的左右内边距压到 6px、组间距压到 4px，
     抠出来的宽度全部让给第二组（实测它原本只分到 76px 而需要 156px）。 */
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
  /* 药丸内部的 span/svg 有自己的字号（宿主 .pill 自带），只在外层设 10px 不会被
     继承进去 —— 真机上第二组仍差 ~20px 被省略号切掉，所以这里显式压到内部。 */
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
  /* 「上下文环」显示在输入框行的右簇（店主 2026-09-23 确认：
     环要、百分比数字不要）。font-size:0 只塌掉文本、环 svg 有显式尺寸不受
     影响；绝对定位盖在自建占位上（见下方 #104 注释），不再搬动节点。 */
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
  /* 文本要连**药丸内部**一起塌掉：药丸自带字号，只在外层设 0 不继承进去，
     真机上会留下半个 "46"。整棵子树 font-size:0，环 svg 用显式 px 不受影响。 */
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
    /* 宿主给药丸画的灰底/描边在输入框行里显得比环大一倍（店主："圆圈占了很多空间"），
       全去掉，只留环本身。 */
    background: transparent !important;
    box-shadow: none !important;
    border: 0 !important;
  }
  [data-mobile-nav="stats-ring"] svg {
    display: inline-block !important;
    /* 2026-09-29 验收定稿（issue #140）：16px 难瞄准、24px 过大、20px 仍偏大，
       店主拍板 18px；与 26×26 命中盒（见 layout.css.ts 的环规则）匹配。
       增宽由尾道左侧富余吸收，按键间距不变。 */
    width: 18px !important;
    height: 18px !important;
    flex: 0 0 auto !important;
  }
  /* 轨道深化（2026-09-29 验收，issue #140）：宿主轨道只有 12% 黑，环放大到
     24px 后深灰进度弧显得像残缺的加载圈（店主「什么玩意儿」）。加深到 25%
     让 donut 成完整圆环——是「用量表」不是「spinner」。子串锚 class*=_track
     与仓库哈希锚惯例一致，环标记内不会跨匹配（fill 类名不同）。
     #142：25% 黑改按主题取色——color-mix 取 25% 标签色（label-primary 浅色
     =近黑、暗色=近白），浅色维持 #140 验收观感，暗色自动翻成 25% 白（裸
     rgba(0,0,0,.25) 在暗色下不可见，环又退回残缺加载圈）；token 缺失时 var
     兜底 #000 与原值等价。border 族没有 25% 等价档，纯 var 兜底会让浅色回
     归宿主 12%，故用 color-mix；宿主 CSS 已用同款 color-mix+var 组合。 */
  [data-mobile-nav="stats-ring"] [class*="_track"] {
    stroke: color-mix(in srgb, var(--dsw-alias-label-primary, #000) 25%, transparent) !important;
  }
  /* 环与 TPS 读数不再搬动宿主 React 节点（#104：搬动后宿主卸载调 removeChild
     对不上父节点直接抛 NotFoundError，SlotErrorBoundary 把整个 composer 槽位
     清空）。节点留在 React 渲染的原位，可见槽位由插件自建占位顶住，宿主节点
     绝对定位盖在占位上；占位是插件节点，宿主重建/卸载都不经过它。 */
  [data-mobile-nav="stats-ring-reserve"],
  [data-mobile-nav="stats-tps-reserve"] {
    visibility: hidden !important;
    pointer-events: none !important;
  }
  [data-mobile-nav="stats-ring-reserve"] {
    flex: 0 0 auto !important;
    display: inline-block !important;
    /* 18px 与定稿的环（上方 svg 规则）同尺寸：占位顶住的槽位即环的落点，
       尾道左侧富余吸收增宽，按键间距不变。 */
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
  /* overlay 的定位上下文：宿主自己没定位时才生效（无 !important，宿主样式随时
     可以接管；stats-line 每帧按真实 positioned ancestor 计算，不受影响）。 */
  [data-mobile-nav="stats-ring-dock"],
  [data-mobile-nav="stats-tps-row"] {
    position: relative;
  }

  /* ---------- dsh-genui panel dock ----------
     The genui panel docks above the composer (conversation.input.dock,
     id genui-panel). On a phone its business-blue outline, generous chrome
     and single-line ellipsis read as an unfinished artifact: long titles
     truncate mid-word ("…default b···") with the chevron glued to the
     ellipsis, and the pill crowds the composer. Mobile treatment: neutral
     card border matching the composer, tighter chrome so the full title
     fits, chevron with breathing room. Scoped to the mobile frame marker —
     desktop keeps genui's own styling untouched. */

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

  /* ---------- git-graph branch chip: CSS re-anchor, no reparent (A′) ----------
     The branch chip (conversation.input.dock) floats between the dock rows
     and the input card; on a phone it reads as a stray capsule crowding the
     composer. #105: the old fix reparented the chip INTO the composer card,
     and React's unmount removeChild then threw NotFoundError into the
     SlotErrorBoundary (same root cause as #104). A′ re-anchors instead:
     the chip stays where React rendered it (inside the dock subtree) and
     the composerStack becomes the containing block, with the anchor
     constants = the card's static offset inside the stack + the original
     (12,12) corner offset. Constants measured 2026-09-24 (CDP, 393px):
     conversation phase card offset (16,0) → top 12 / left 28; hero phase
     card offset (16,122.9) → top 134.9 / left 28 (hero override below).
     The plugin's own sheet sets all four offsets on the anchor, so
     right/bottom must be neutralized too. Desktop untouched: the frame
     marker only exists below 1024px. Chip row geometry (2026-08-16, user
     feedback): 48px padding left a 16px dead gap and made the composer read
     too tall; 40px = chip (24px) at corner +12 + ~4px to the textarea; the
     chip has since grown to 28px (git-graph chip CSS), so the row is 44px
     (2026-09-06). The 44px clearance now keys off a STACK-level :has() —
     the chip is no longer a card descendant, so a card-level :has() could
     never match; the card disambiguation keeps non-composer cards (e.g. a
     todo card sharing the stack) out of the chip row. */
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

  /* ---------- dsh-meme 表情选择卡片：右缘安全距离 ----------
     The meme picker (conversation.input.overlay, id meme-picker) is
     absolutely positioned left:0 inside the composer's overlay anchor with
     width:min(360px,90vw). That 90vw resolves against the VIEWPORT, not the
     anchor, and with the picker's own padding+border the border-box
     (377px on a 390px phone) exceeds the 356px anchor — the card's right
     edge then runs past the anchor and off the right screen edge, while the
     left edge keeps the anchor's 17px safe inset. Stretch the card to the
     anchor on both sides (left/right 0, width auto, border-box) so the
     right gap mirrors the left; cap at the card's original border-box size
     (360px content + 24px padding + 2px border) so tablets keep the
     intended card width instead of stretching. Desktop is untouched: the
     frame marker only exists below 1024px. */
  [data-mobile-nav="frame"] .meme-picker {
    left: 0 !important;
    right: 0 !important;
    width: auto !important;
    box-sizing: border-box !important;
    max-width: 386px !important;
  }

  /* dsh-meme 网格缩略图：自适应铺满卡片,保留 8px 间隙。
     dsh-meme 的 .mp-grid 是 flex-wrap + 固定 76px 的 .mp-cell(行内 style 再压到 74px):
     3 列(390px 手机)时每行右侧剩 ~78px 空白,卡片没有铺满。换成响应式 grid:
     repeat(auto-fill, minmax(64px,1fr)) 让列数随可用宽度伸缩、卡片 width:100% +
     aspect-ratio:1 随轨道自适应(方形,cover 裁切不变),gap 仍是 dsh-meme 的 8px。
     行内 width/height 用 !important 覆盖;手机端约 4 列、平板端约 5 列,均满宽。 */
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
  /* dsh-meme 网格右侧滚动条：默认 WebKit 滚动条在手机上看太粗,压成 4px
     细条——保留滚动指示又不占横向空间,thumb 圆角浅色、轨道透明。 */
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

  /* ---------- agent preset 模式选择菜单：手机端紧凑底部弹层 ----------
     The official agent-preset menu (role=menu, portal mounted on body) uses
     position:fixed + max-height:820px + bottom:12px, so on a phone it
     stretches from the trigger down to 12px above the screen bottom —
     effectively filling the screen. Turn it into a polished bottom sheet:
     cap the height, center it horizontally (the official max-width 360px
     left-anchors at left:12px, leaving 12/18px asymmetric gaps), add a
     drag-handle affordance, breathing room, and softer top radius; the
     inner viewport keeps scrolling. Scoped to the agent-preset item class
     (cubgiG_*) so other role=menu dropdowns (model/access mode) are
     untouched. Desktop ≥1024px is outside the media query, so it keeps the
     official large dropdown. */
  /* agent-preset 菜单依赖 @deepseek-ai/dsh-client-ui-agent-preset 的 CSS Module 哈希 (cubgiG_*)，升级该包时需验证此选择器是否仍有效 */
  [role="menu"]:has([class*="cubgiG_item"]) {
    top: auto !important;
    left: 50% !important;
    right: auto !important;
    bottom: 12px !important;
    transform: translateX(-50%) !important;
    width: min(100% - 24px, 360px) !important;
    max-width: 360px !important;
    /* vh 回退行在前（pocket 补丁），无 dvh 引擎时模式选择菜单不塌回 auto。 */
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
  /* 菜单内部滚动条：默认 WebKit 滚动条在竖屏太粗,会占 ~15px 宽度把文字描述
     挤窄,导致描述换行/截断不自然。压成 4px 细条(与表情网格一致),文字区域
     恢复自适应宽度。 */
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

/* 搜索框底部间距修复 */
  [aria-modal="true"] [class*="tabSearchRow"] {
  padding: 2px 4px 16px !important;
  }


  /* ===== 已安装列表：路径单行截断 ===== */
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
  /* ===== 已安装列表：手机端纵向重排 ===== */
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
  /* ===== 市场卡片图片容器：横向滚动 ===== */
  [data-mobile-nav="frame"] [class*="cardShots"] {
  display: flex !important;
  flex-wrap: nowrap !important;
  overflow-x: auto !important;
  -webkit-overflow-scrolling: touch !important;
  /* 到头继续拽不把整页拖出（pocket 补丁） */
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

  /* ---------- dsh-file-viewer (conversation.view tab「文件查看器」) ----------
     The plugin ships NO responsive CSS: its min-width:0 flex panels overflow
     on a phone — the titlebar caps the path at 520px beside a 5-button action
     row, and CSV/code headers row-stick inside content scrollers. It renders
     inline into the conversation view region (stable 'dsfv-*' prefix, injected
     <style>), not a modal sheet, so the fixes here are: stop the PANEL from
     scrolling horizontally (leave horizontal scrolling inside the content
     scrollers), compress the titlebar/statusbar, enlarge touch targets, and
     scope everything under [data-file-viewer-open] so only the active
     file-viewer tab is affected. The marker is owned by the
     file-viewer-open-marker reconciler task; nothing leaks to desktop because
     this whole block lives inside the mobile media query.
     (Port of community fork fix 2ff7976.) */

  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-panel {
    min-width: 0 !important;
    max-width: 100% !important;
    overflow-x: hidden !important;
  }
  /* Titlebar: single compact row; path truncates, secondary meta hides on
     narrow, the 5-button action row wraps to two rows of tall targets. */
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
  /* Status bar: wrap, safe-area bottom padding, compact. */
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-statusbar {
    flex-wrap: wrap !important;
    gap: 4px 10px !important;
    padding: 4px 8px calc(4px + env(safe-area-inset-bottom, 0px)) !important;
    font-size: 12px !important;
  }
  /* Content scrollers must own horizontal scrolling; the flex columns and the
     renderer stack must not let content push the panel wide. */
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
  /* Browser / subtoolbar rows wrap; file rows get touch-friendly height. */
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
  /* Produced-file chips render in the conversation tail, outside the viewer
     tab — keep tappable but not scoped to the marker. */
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

  /* ---------- File share (effects/file-share.ts) ----------
     Files tree rows: the plugin appends one share button after the host's
     own row button inside li[data-files-entry="file"] (host nodes are never
     moved). The li becomes a flex row only while it carries that button, the
     host button keeps the remaining width. Preview header: one icon button in
     the official document.actions slot, sized like the host tool buttons. */
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
  /* Fallback notice, only on hosts without the primitives Toast. */
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

  /* ---------- Markdown 表格：手机档（≤767px）不再被压成「一字一行」 ----------
     2026-10-06 真机报障：6 列宽表在 390px 上被 table-layout:auto 压到每列
     1~2 字宽，表头竖排成一列单字，完全不可读。宿主 chat 包（ui-chat）只给
     表格外面套了 .md-table-wide —— 用容器查询单位做「出血加宽」
     （--dsh-table-lead / --dsh-table-spare），**整包没有任何 th/td/table
     规则**（已 grep 确认，唯一命中在 settings-subagent 的 depthTable，与本页
     无关），所以列宽完全由内容最小宽度决定，没有下限也没有滚动容器。
     这里补齐手机档的两件事：给单元格一个最小宽度下限 + 让包裹层横向滚动。
     th 允许 nowrap（表头本来就短、竖排最难看），td 只设下限、长句仍可换行，
     不会把表格撑到无法阅读的宽度。
     平板（768–1023）与桌面不动 —— 店主明确「平板不用」（对齐上游 768px
     分档边界，与 layout.css.ts 的手机档写法一致）。 */
  /* @patch
     id: ofm-mobile-cost-ceiling
     for: dsh-our-free-model 2.0.0 的 ofm_ 私有类名（毛玻璃表面 + 极光层 + 装饰动画）
     why: 上游把设置页做成一张超长 backdrop-filter 大面 + 常驻全屏极光，插件侧没有手机档成本降级，本插件只能用自己的手机档样式兜
     until: 上游自己给手机档出成本降级（或拿掉极光层与 blur 表面）——届时本块整节删除
     test: tests/our-free-model-cost.test.ts
  */
  /* ---------- dsh-our-free-model: mobile cost ceiling ----------
     该插件设置页在手机上卡顿掉帧。实测数字、驱动限制与验证方法见
     docs/maintenance/pitfalls.md「第三方成本上限」——这里只记为什么这么写。

     选择器用裸的 ofm_ 前缀类名，不加任何祖先锚。设置页经 createPortal 挂到
     document.body，[data-mobile-nav="frame"] 后代选择器一个都不命中；而
     .ofm_scrim 与 .ofm_toast 也 portal 到 body，锚 .ofm_root 同样漏。前缀是
     本插件独占（宿主与全仓 0 命中），锚根买不到隔离，只赔掉 portal 出去的那几块。

     只砍装饰，且按「遮罩 vs 表面」分两组——同一个「去 blur」动作，两类需要相反
     的补法：表面按半透明设计，只摘 filter 会让页面从下面透出来，故补不透明底；
     .ofm_scrim 是蒙层，补底等于把整页涂黑，故只摘 filter。

     带状态的动画一律保留（loading 骨架、池子 busy/over 点、状态点、进度条、
     aria-busy 按钮）。.ofm_scanline 看着像装饰，实则挂在登录等待提示上，上游
     自己的 prefers-reduced-motion 块也不杀它。

     本块在顶层手机档（≤1023px + pointer: coarse），触屏平板也吃到——有意为之：
     这是成本修复不是布局修复，与屏宽无关。 */
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

  /* @patch
     id: ofm-toast-above-drawer
     for: dsh-our-free-model 2.0.0 的 .ofm_toasts（公告 toast，portal 到 document.body）
     why: 该插件把 toast 钉在 z-index 1200 并自称浮在所有层之上，但本插件移动抽屉是 1300、遮罩 1250、宿主原生侧栏 1100 —— 打开抽屉时整条 toast 既不可见也不可点，插件侧没有可调的层级接口
     until: 上游把 toast 抬到宿主弹层之上（1400+）或宿主提供官方通知层 —— 届时本块删除
     test: tests/our-free-model-toast-layer.test.ts
  */
  /* ---------- dsh-our-free-model: announcement toast above the drawer ----------
     2026-10-17 店主报障：打开侧边栏时左下角的官方推送消息被抽屉挡住。
     实测（390×844 触屏仿真）：toast .ofm_toasts rect(18,738,354×88) z1200；
     本插件 backdrop z1250、抽屉列 z1300 ⇒ elementFromPoint(195,780) 命中抽屉
     里的 Usage/Balance 按钮、(330,780) 命中遮罩 —— 整条与点击一起没了。

     选择器用 body 直子锚：插件 toastHost() 把 .ofm_toasts 挂在 document.body
     （不存在才建），.ofm_ 前缀又是本插件独占（宿主与全仓 0 命中，见上一节），
     所以这层锚既精确又不会误伤。

     1310 的取值：高于抽屉 1300（否则被盖），低于本插件自己的弹层 1400 与
     file-share toast 1500（公告 toast 不该压过模态）。桌面档没有抽屉，问题
     只在手机档出现，规则因此留在本顶层手机媒体查询内。

     代价（店主 2026-10-17 选定 A 方案时知情）：toast 通栏 354px 比抽屉 280px
     宽，浮起后会压住抽屉底部约 88px（用户行/设置按钮区）约 10 秒（插件
     holdMs 默认 10000），期间那几颗按钮点不到 —— 这是「推送可见」与「抽屉
     底部可点」的二选一，本次选了前者。 */
  body > .ofm_toasts {
    z-index: 1310 !important;
  }
}

/* ---------- session inspector: the disclosure triangles are too small ----------
   2026-10-20 店主报障：手机端「会话数据诊断」面板（宿主实验插件
   dsh-experimental-session-inspector）里那些深色小三角太小、点不准。

   三处 disclosure 不是一个东西，得分开打：
   A 表格「类型」列里的行展开箭头 —— 16px 宽、11px 的 ▸/▾ 文本按钮，
     组件自己只给了 width:16px，没有 height/line-height，实际可点面 ≈16×13px，
     而它紧贴「选中该行」的类型文本按钮（同一 td 内相邻），手机上很容易点错。
   B 「原始数据」JSON 树每层 —— 原生 details/summary 的 UA marker，
     宿主只设了 cursor:pointer，没有任何尺寸声明，随 root 的 11px 字号一起小。
   C 面板顶部「原始数据 ▾」—— 原生 select 的 UA 箭头，同样 11px。
   行高 30px 是宿主虚拟化的常量（client.js 里 size/estimateSize 与 sticky 偏移
   多处写死 30，且没有 measureElement），所以只放大控件本身，绝不改行高。 */
@media (max-width: 1023px) and (pointer: coarse) {
  /* @patch
     id: session-inspector-disclosure-size
     for: @deepseek-ai/dsh-experimental-session-inspector 0.2.1-rc.2（CSS 模块哈希前缀 GTtnTq）
     why: 树行展开箭头只有 16×≈13px、字号 11px，低于触控下限，且与相邻的「选中该行」按钮动作不同
     until: 宿主把 GTtnTq_disclosure 提到 ≥24px，或换成可缩放图标并自带内边距
     test: tests/css-rules.test.ts
  */
  /* A：行箭头。22px 正好等于行内容盒（30px 行高 − 上下 4px 内边距），
     不会撑高行、也不会打乱虚拟化的行位置模型。 */
  [class*="GTtnTq_root"] [class*="_disclosure"][aria-expanded] {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 22px !important;
    height: 22px !important;
    font-size: 15px !important;
    line-height: 1 !important;
  }
  /* B：JSON 树的原生 marker。字段名的缩进槽是 16px（ul 的 padding-inline-start），
     15px 字形正好卡进槽里，放大不会把字段名右移。 */
  [class*="GTtnTq_objectTree"] details > summary::marker {
    font-size: 15px !important;
  }
  /* C：顶部模式选择器（原生 select）。不在虚拟化区域里，可以直接长高。 */
  [class*="GTtnTq_modeSelector"] {
    font-size: 13px !important;
    padding: 4px 6px !important;
    min-height: 32px !important;
  }
  /* D：吸顶祖先行（顶部那一群灰色行）在快速滑动时错乱/拖影。
     宿主给它们是 position:sticky + 灰底，而整张表是 border-collapse:collapse ——
     Chromium 里「sticky 的 <tr> + 合并边框」会逐帧重算行盒，甩动时就撕开。
     两刀都只动呈现、不动布局：①把合并边框换成 separate + 0 间距（每行只有一条
     border-bottom，视觉与合并边框一致，但行盒不再是合并边框模型）；②给 sticky
     行独立合成层，吸顶位移整块平移，不再每帧重绘整行。
     计时器/虚拟区间仍归宿主，这里不碰 scrollTop 与 overflow-anchor。 */
  /* @patch
     id: session-inspector-sticky-flicker
     for: @deepseek-ai/dsh-experimental-session-inspector 0.2.1-rc.2（GTtnTq_table / GTtnTq_sticky）
     why: sticky 的 <tr> 叠在 border-collapse:collapse 表格上，快速滑动时吸顶祖先行被逐帧重算行盒，出现撕裂/拖影
     until: 宿主把表格改成 border-collapse:separate，或不再用 sticky <tr> 表达祖先上下文
     test: tests/css-rules.test.ts
  */
  [class*="GTtnTq_table"] {
    border-collapse: separate !important;
    border-spacing: 0 !important;
  }
  [class*="GTtnTq_table"] [class*="GTtnTq_sticky"] {
    will-change: transform !important;
  }
}

`;var An=`@media (max-width: 1023px) and (pointer: coarse) {
  /* ---------- hero composer on mobile ----------
     The official hero card carries a 2-line textarea plus a tall tool row,
     which reads oversized on a phone. Tighten the empty-state rhythm: keep
     the official centered hero, shrink the textarea line box, slim the card
     padding and the tool row, and close the gap under the headline. */

  [data-phase="hero"] [class*="_card"]:has(textarea, [data-composer-input]) {
    gap: 8px !important;
  }
  /* Composer stacks carrying the git branch chip must keep compat.css's 44px
     chip clearance: that rule sets padding-top: 44px on the composer card of
     any stack that contains the absolutely-positioned chip anchor (A′, #105:
     the chip stays in the dock subtree and is re-anchored to the stack, so
     the exclusion moved from the card level to this stack-level :not(:has())
     — a card-level :has() could never match anymore). Chip geometry: top
     corner +12 + 28px chip — the chip grew 24→28px, so the clearance grew
     40→44px to keep the same ~4px breathing gap (2026-09-06). This compact
     override used to stomp the clearance back to 6px with the same
     specificity (this sheet loads after compat), so on the hero empty state
     the chip painted over the input line (2026-09-06). Excluding
     chip-bearing stacks restores the clearance; the textarea collapse below
     still applies to them. */
  [data-phase="hero"] [class*="_composerStack"]:not(:has([data-gitgraph-chip-anchor])) [class*="_card"]:has(textarea, [data-composer-input]) {
    padding-top: 6px !important;
  }
  /* The official composer autosizes the textarea and writes an inline
     height (2 lines on the hero empty state) on the textarea's scroll/grow
     wrappers. :placeholder-shown lets us collapse the EMPTY state to one
     line with !important; as soon as the user types, the pseudo-class no
     longer matches and the autosizer's inline height takes over again — so
     multi-line growth keeps working. */
  [data-phase="hero"] textarea:placeholder-shown {
    height: 28px !important;
  }
  [data-phase="hero"] [class*="_card"]:has(textarea:placeholder-shown) > [class*="_scroll"],
  [data-phase="hero"] [class*="_card"]:has(textarea:placeholder-shown) [class*="_grow"] {
    height: 28px !important;
  }
  /* The one-line collapse above is deliberately NOT mirrored onto the Lexical
     generation (0.1.2+), even though it signals its empty state with the
     separate [data-composer-placeholder] node. That host pins the hero input
     itself — hero-scoped min-height: 52px, because its hero hint wraps to two
     lines — and a min-height floor beats an outer height: the 28px wrappers of
     2026-09-05 only shrank the scrollport under a 52px input, i.e. overflow-y
     auto with scrollHeight 52 against clientHeight 28 → scrollbar plus a
     clipped first input line and hint line (phone report 2026-09-14, probe
     scripts/probes/hero-composer-clip-probe.mjs). The textarea generation this
     collapse was written for has no such floor — its input is a transparent
     height:100% layer over the wrappers — so it still collapses there. */
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

  /* ---------- composer dock: swap git branch chip with the todo card ----------
     The git-graph branch chip (conversation.input.dock, order 100) floats
     alone at the bottom-left above the input card, with a dead zone to its
     right; the full-width todo card (order 0) sits above it. Swap them so
     the chip reads as the stack's top row and the todo card fills the row
     above the composer. The dock container itself is display:contents
     (inline style) — its children are direct flex items of the composer
     stack, so order on the children is what reorders them. Only the chip
     needs an order change: -1 puts it before the todo card (order 0) and
     before the input card (order 0, later in DOM). The todo card must KEEP
     its order 0 — raising it past the input card's order 0 would drop it
     below the composer entirely (2026-08-16 regression, fixed). The queue
     strip (order 20) keeps hugging the input card. Desktop untouched (this
     block lives inside the max-width: 1023px media query). */
  [data-slot="conversation.input.dock"] [data-gitgraph-chip-anchor] {
    order: -1 !important;
  }
  /* Mobile tap target + feedback for the branch chip (git-graph, 24px
     desktop spec). Two real-world problems: ① the chip is tiny and sits
     right above the expandable todo card — mis-taps land on the todo card;
     ② opening the popover waits for the host's /git/branches round-trip
     (~700ms on device) with zero feedback, so users tap again and toggle
     the popover closed. Enlarge the target, kill double-tap zoom delay,
     and give an instant pressed state so a tap reads as registered. */
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

  /* ---------- mattskills status capsule: keep its tail (skills button / fold
      chevron) inside the pill on portrait ----------
      dsh-mattpocock-skills-deck renders a capsule status bar in
      conversation.input.dock (order 40, the row above the composer card). Its
      own sheet deliberately never shrinks icons or counters ("图标与普通计数
      永不收缩"), so as soon as the capsule's content is wider than the pill the
      host wrapper's overflow:hidden cuts the right edge and the two segments
      that sit last — the skills-list button (2×2 grid) and the fold chevron
      that collapses the whole deck strip — are not painted at all.
      Measured 2026-10-10 on a 393px portrait viewport, session bound to a
      ticket with two-digit counters (可接 21 / 诊断 20): capsule content
      ≈ 415px against a ~360px pill, i.e. ~55px short — exactly those two
      segments; the same session on landscape shows both, so this is width
      pressure, not a missing feature (and not a deck version difference:
      1.7.51 / 1.8.0-rc.1 / 1.8.0-rc.2 all render both unconditionally).
      Reclaim the width from the capsule's desktop-sized spacing (6px column
      gap plus 7px padding on each of ~11 children) rather than hiding any
      segment, and keep a horizontal scroll as the fallback for the narrowest
      phones so the tail can still be swiped into view. The scrollbar stays
      hidden, so the pill still reads as one pill. Desktop untouched: this
      block lives inside the max-width: 1023px media query. */
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

  /* ---------- ask question composer (ask_user_question): kill iOS Safari
      input-focus auto-zoom ----------
      Safari on iPhone enlarges the whole viewport when a focused <input> /
      <textarea> computes font-size < 16px, and only reverts on blur. The ask
      dialog is a modal composer takeover, so taps outside never blur the
      field and the magnification persists until the field loses focus
      (e.g. the dialog is dismissed). The ask
      composer's custom-answer <input> (.customInput) and optionless free-form
      <textarea> (.customTextarea) both ship at 14px (ui-user-questions
      QuestionComposer.module.css). Raise them to 16px on iOS only, where the
      zoom can actually happen: on Android and desktop there is nothing to
      suppress, so they keep the compact size they were designed with
      (2026-09-16, audit D-1 option A; the iOS WebKit floor below covers these
      fields too, this rule keeps the requirement stated where it applies).
      Scoped to the ask
      composer's stable [data-question-key] root (AGENTS.md: scope hashed-class
      selectors to the owning region, prefer stable data-* markers); the
      class-name suffix match follows the plugin's established harness
      CSS-module convention (verified against the live app: generated names
      end with the original local name, e.g. uV2eYG_input / bhn1Oq_searchInput). */
  html[data-mobile-nav-ios] [data-question-key] [class*="_customInput"],
  html[data-mobile-nav-ios] [data-question-key] [class*="_customTextarea"] {
    font-size: 16px !important;
  }

  /* ---------- dsh-file-viewer inputs: kill iOS Safari auto-zoom ----------
     Same rule as the ask composer above: the file viewer's search / jump-to-
     line / pdf-page fields ship at 13-14px, which Safari auto-magnifies on
     focus inside a panel that does not blur on tap-away. Raise them to 16px
     on iOS only for the same reason as the ask composer above (2026-09-16,
     audit D-1 option A). Scoped to the frame marker; the
     viewer itself is scoped by its stable dsfv prefix.
     (Port of community fork fix 2ff7976.) */
  html[data-mobile-nav-ios] [data-mobile-nav="frame"] [class*="dsfv-search-input"],
  html[data-mobile-nav-ios] [data-mobile-nav="frame"] [class*="dsfv-jump-input"],
  html[data-mobile-nav-ios] [data-mobile-nav="frame"] [class*="dsfv-page-input"] {
    font-size: 16px !important;
  }

  /* ---------- iOS WebKit: hold every text field at >=16px so Safari never
      focus-zooms the viewport (#45) ----------
      Report (iPhone 15 Pro Max): the page magnifies as soon as a field takes
      focus, sometimes also when switching sessions (the host composer mounts
      with autoFocus), and it stays magnified until the app is closed and
      reopened or rotated landscape->portrait.
      Mechanism: iOS Safari enlarges the visual viewport whenever a focused
      input / textarea computes below 16px, and it only zooms back out on
      blur — a chat shell keeps the composer focused, so the zoom has no
      moment to revert; before this fix the root touch-action also withheld
      pinch-zoom, so the user could not pull it back out either (see
      layout.css.ts). maximum-scale=1 in the viewport meta is NOT the fix:
      iOS 10+ ignores it for user pinch zoom while other engines honor it, so
      writing it would only take zoom away from Android. Raising the fields is
      the fix that stays inside the standard.
      Gated on html[data-mobile-nav-ios] (phone-chrome.ts detectIosWebKit)
      because only WebKit on iOS zooms on focus: Android and desktop keep the
      compact 13px search boxes they were designed with. The floor covers
      every text-entry field on the page, including the ones portalled
      outside the frame (settings dialogs, the market sheet, third-party
      panels) — a phone can reach all of them. Button-like and widget inputs
      are excluded (nothing to type, no keyboard), and select is left alone on
      purpose: it would break the composer's 28px access-mode control, and a
      native picker overlays the screen instead of leaving a zoomed page
      behind. The composer's mirror / backdrop layers ride along with the
      textarea: they measure the autosize height and paint the highlight, so
      all three must share one font-size or the caret drifts off the text
      (they inherit 16px from the host card today — the rule locks that in on
      hosts whose composer ships smaller).
      The contenteditable branch is the forward-looking one: dsh
      0.1.2-rc.1 replaces the composer textarea with a Lexical
      contenteditable whose card reads font-size:
      var(--dsh-content-font-size, 14px), i.e. 14px by default — squarely in
      the zoom-triggering range. Match the attribute rather than the value
      "true" (Lexical writes "true", other hosts use plaintext-only or the
      bare attribute) and exclude contenteditable="false", which Lexical puts
      on decorator nodes inside the editor. */
  html[data-mobile-nav-ios] textarea,
  html[data-mobile-nav-ios] [contenteditable]:not([contenteditable="false"]),
  html[data-mobile-nav-ios] [data-input-mirror],
  html[data-mobile-nav-ios] [data-input-backdrop],
  html[data-mobile-nav-ios] input:not([type="button"]):not([type="checkbox"]):not([type="color"]):not([type="file"]):not([type="hidden"]):not([type="image"]):not([type="radio"]):not([type="range"]):not([type="reset"]):not([type="submit"]) {
    font-size: 16px !important;
  }

  /* ---------- drawer session tree: skip off-screen rendering ----------
     The drawer mounts ~389 nodes at once (the open gesture early-commits
     the host state while the drawer is still off-screen), and during
     streaming every token commit re-lays-out tree rows that are not even
     visible. content-visibility: auto lets the engine skip layout and
     paint of the session tree while it is outside the viewport (the arm
     moment of the open gesture) and of off-screen rows when the drawer is
     open on a long conversation. contain-intrinsic-size keeps the scroll
     geometry stable while rows are skipped. Scoped to the drawer tree via
     the frame marker + first child so the explorer sheet tree (a different
     subtree) is not affected. Measured with CDP Tracing on an empty
     conversation at 1x CPU (2026-08-29): biggest script task 104 -> 66ms,
     max rAF gap 167 -> 33ms; the benefit scales with conversation length.
     Desktop untouched (this block lives inside the max-width: 1023px
     media query). */
  [data-mobile-nav="frame"] > :first-child [role="tree"] {
    content-visibility: auto;
    contain-intrinsic-size: auto 600px;
  }

  /* ---------- text selection stays inside content (B1, 2026-10-04) ----------
     Report (Android): long-press a word in an AI reply, drag the selection
     handle up over the session header, and the selection jumps to "select
     all" instead of extending through the message list. Mechanism: the
     header and the composer card are ordinary selectable boxes; the header
     sits BEFORE the scrollport in DOM order (header, then
     [data-conversation-scroll]) and the drawer earlier still (frame first
     child, parked off-screen at -110%). A selection extent whose hit point
     resolves into that chrome lands IN the chrome, so the highlighted range
     covers the header and app shell on top of the messages - on a phone it
     reads as the whole page. With the chrome unselectable the extent snaps
     to the nearest message text instead (headless drag-select 390x844
     touch-emulated, message -> header: focus node went from the header
     title span to a message <p>; message -> composer row: from the Send
     button to a message <p>; the scrollport kept auto-scrolling in both).
     Layout is untouched: this only sets user-select.
     Kept selectable: the message flow (outside every rule below) and the
     composer editing surface, which is re-enabled explicitly - auto would
     inherit none from the card, and an unselectable contenteditable cannot
     host a caret or a paste on WebKit. Dialogs and text fields portalled
     into the drawer DOM (settings sheet) are re-enabled the same way, so
     their values stay copyable. Scope: the conversation header is the host
     header inside the [data-phase] root, anchored to the HOST HEADER CLASS
     (header.wSkVaW_header) rather than to a bare header - a bare header also
     hits every other <header> under [data-phase], and the ask-question card
     (dsh-client-ui-user-questions QuestionComposer) renders its own
     <header class="Mbwy4a_header"> in composerSeat with the question text
     as the heading. A bare header made that text unselectable, so the
     question could not be long-press-copied (2026-10-20, same anchor rule
     as the layout.css.ts header block; the dock above the input card is
     reply content and must stay copyable). The anchor stays the DESCENDANT
     form on purpose: 0.2.0-rc.2 (live-host probe 2026-10-07) renders an
     unclassed wrapper <div> between .wSkVaW_root[data-phase] and
     <header class="wSkVaW_header">, so the child-combinator form this rule
     used to carry matched 0 elements - the title bar kept user-select:auto
     and a drag-select up over it still ended in the header title span (4391
     selected chars, opening with the title / mode / tab labels). On the
     composer side only the input card ([data-composer-card], host marker
     since 0.1.2) and the plugin stats row. */
  [data-mobile-nav="frame"] > :first-child,
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
  [data-mobile-nav="frame"] > :first-child [role="dialog"],
  [data-mobile-nav="frame"] > :first-child input,
  [data-mobile-nav="frame"] > :first-child textarea,
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) input {
    -webkit-user-select: text !important;
    user-select: text !important;
  }
}

/* ---------- tablet / wide mobile: keep sheets from becoming full-width ----------
   Below 768px the near-full-width sheets are the right call for a phone.
   On wider but still sub-desktop viewports (foldables, tablet portrait,
   desktop-mode tall windows) the same full-bleed sheet leaves content
   clustered at the left edge with a large dead zone on the right. Cap and
   center the modal sheets and the aionui bottom sheets instead. */
@media (min-width: 768px) and (max-width: 1023px) and (pointer: coarse) {
  /* Centered, never edge-to-edge — for the modal shapes below, not for every
     modal dialog. Covered: modals that are not sheet-shaped, plus sheet-shaped
     ones with neither a navigation element nor a directory picker. A modal
     that is sheet-shaped AND carries the directory picker is left out on
     purpose — layout.css.ts holds the dedicated rule for it. The settings
     sheet has a higher-specificity full-width rule above, so repeat its
     selector here to win; the generic export/other-modal rule is covered by
     the second selector. */
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])),
  [aria-modal="true"]:not(:has(> :first-child > :last-child > button)) {
    left: 0 !important;
    right: 0 !important;
    margin-left: auto !important;
    margin-right: auto !important;
    width: min(calc(100vw - 32px), 720px) !important;
    max-width: min(calc(100vw - 32px), 720px) !important;
  }

  /* The dsh-web-ui explorer / preview bottom sheets: same treatment — keep
     the mobile bottom-sheet behavior, but stop them spanning the full width. */
  [data-aionui-explorer-col],
  [data-aionui-preview-col] {
    left: 0 !important;
    right: 0 !important;
    width: min(calc(100vw - 32px), 720px) !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  /* Settings sections (e.g. Agent presets) often carry a desktop max-width
     (720px) that leaves a dead strip on the right once the sheet is capped to
     the same width; let them fill the sheet body instead. */
  [aria-modal="true"] [class*="_section"] {
    width: 100% !important;
    max-width: none !important;
  }
}

/* ---------- desktop / non-touch: the mobile controls must never appear ----------
   Exact complement of the mobile query "(max-width: 1023px) and (pointer:
   coarse)" as a comma list (NOT A or NOT B): any viewport ≥1024px, plus any
   narrow viewport whose primary pointer is a mouse (fine) or absent (none).
   The pointer terms are what keep the header Files button off narrow desktop
   windows — the slot renders the buttons at every width, so before this the
   only guard was the width term (2026-08-30 PC leak: split windows and OS
   display scaling dropped the CSS viewport below 1024px and armed the whole
   mobile shell on desktop).

   The session-delete trio (menu item + confirm/error dialog) is the ONE
   deliberate exception: its effect arms on TOUCH_QUERY (pointer: coarse at
   every width — large tablets in landscape), so it lives in the pointer-only
   block below instead of this width arm. */

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

/* Session-delete trio: hide on mouse-driven or pointer-less windows at ANY
   width. No width term — the injection is armed on touch at every width, so
   a width arm here would hide the item on wide touch (the device class the
   injection exists for). */
@media (pointer: fine), (pointer: none) {
  [data-mobile-nav="session-delete"],
  [data-mobile-nav="delete-dialog-backdrop"],
  [data-mobile-nav="delete-dialog"] {
    display: none !important;
  }
}

/* 宽屏触屏（≥1024，壳不生效）同样没有 hover：会话行的 ⋯ 必须常显。
   宿主只在 :hover / menuOpen 时显示 _rowActions（dsh-client-ui-workspace），
   而这一档没有移动壳的帧内规则兜底（手机档那条在 layout.css 的 frame 作用域里），
   于是触屏平板点不到重命名 / 分叉 / 归档 / 删除 —— 只按指针门挂上同一条可见性
   规则，不动行内布局（标题仍是 flex:1 + min-width:0 自己让位）。
   与 session-delete 三件套同一门控口径：粗指针在任何宽度都成立。 */
@media (min-width: 1024px) and (pointer: coarse) {
  [class*="sessionRow"] [class*="_rowActions"] {
    display: inline-flex !important;
  }

  /* ①′ 触屏平板的行内热区（2026-10-29 实测：会话行 32px 高、行距 34，
     行内操作按钮只有 16×16、彼此相隔 31px —— 手指点不中，也点不准）。
     做法：行抬到 44px（宿主没有行高约束，标题仍 flex:1 自己省略），
     按钮盒 40×40、间距 4px（盒间净空 0、不重叠），图标本身仍是 16px 不放大。
     40 而不是 44：三个按钮 + 净空在 256px 侧栏里已经占掉 128px，
     再宽就把标题挤到 100px 以下；44 需要侧栏加宽，是产品取舍，不在本轮。 */
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

  /* @patch
     id: wide-touch-session-shortcuts
     for: dsh-client-ui-workspace 的会话行 _rowActions 与归档 / 置顶快捷按钮
     why: 宽屏触屏常显三颗 40px 按钮挤压标题；沿用手机档 #154 的精确标签收进 ⋯ 菜单（#255）
     until: 宿主自带触屏快捷按钮收起规则，或会话行提供独立的操作区布局契约，届时删本块
     test: tests/dsha-session-interaction.test.ts
  */
  [class*="sessionRow"] [class*="_rowActions"] :is([aria-label="归档会话"], [aria-label="取消归档"], [aria-label="置顶会话"], [aria-label="取消置顶"], [aria-label="Archive session"], [aria-label="Unarchive session"], [aria-label="Pin session"], [aria-label="Unpin session"]) {
    display: none !important;
  }

  /* ① 隐藏「更多视图」⋯（owner 2026-10-29）：手机档早就藏了（≤1023 那条在下面），
     它的入口是宿主 header 里的 viewsMoreAnchor；平板这一档没有壳的帧内规则，
     于是这颗对触屏平板毫无用处的按钮就漏了出来。只藏按钮与锚点，菜单不会再弹。 */
  header [class*="viewsMore"],
  header [class*="viewsMoreAnchor"] {
    display: none !important;
  }

  /* ② 设置弹层改成手机档的「顶边贴齐、整宽、内容高」sheet（owner 2026-10-29：
     「手机端和设置界面是分开的，平板还是原生，也改造成手机一样」）。
     原生的 800×800 居中模态在平板上离拇指太远；手机档的几何在 layout.css 的
     移动块里（同一条家族谓词），这里只按粗指针补同样的几何与横向页签导航，
     不动内容列。谓词与手机档完全一致：首孩子末孩子里有 button、且不是导航树 /
     目录选择器 / 快捷键弹层。 */
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
  /* 手机档隐藏的是导航标题（整宽 sheet 上冗余）；横排后页签独占一行。 */
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
  /* ②′ 平板标题行布局（owner 2026-10-29 团队投票：其余功能居中）。
     宿主把标题、预设、Agent Team / 子智能体 / 后台任务都塞在 titleCluster 的
     headerActions 里，从左一个接一个排；平板宽屏上它们全挤在标题后面。
     这里把「预设」用 order 提到最前（留在标题旁），其余状态入口用一对对称的
     margin:auto 居中 —— 对称 margin 的好处是：后台任务 chip 出现/消失时，
     整组的**中心点不动**，只有两翼伸缩，不会像左对齐那样把标题区推来推去。
     只作用于 ≥1024 + 粗指针（平板原生布局档），≤1023 的壳与桌面都不命中。 */
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

  /* ③ 一键设置齿轮放回来（owner 2026-10-29：「手机上是分开的，平板还是原生」——
     手机档把设置从账户菜单里拆出来、给了独立齿轮，平板这一档协调器不跑，齿轮又被
     上面的桌面隐藏块一起藏掉。这里按粗指针放回，注入逻辑见 effects/tablet-quick-settings.ts；
     账户菜单里那份设置项的收起由 base.css 的 data-mobile-nav-quick-menu 规则负责，那条是全局的。 */
  [data-mobile-nav="quick-settings-wrap"],
  [data-mobile-nav="quick-settings"] {
    display: inline-flex !important;
  }

  /* ④ 设置弹层顶部的「Open configuration file」按钮：手机档在 layout.css 的家族谓词里
     藏了它（约 94px + 32px 关闭键会把工具栏撑到 138px，挤掉页签行）。平板照做。 */
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) [class*="_actions"] {
    display: none !important;
  }
  /* ⑤ 关掉上面那颗按钮之后，内容列顶部的工具栏（关闭 ✕）会留在文档流里、落到页签行
     左下方（实测 x≈38 / y≈123）。手机档的做法是把它绝对定位钉到弹层右上角
     （layout.css 的 #105 A′：top 10 / right 12 / z-index 10 / 32px 高）；平板这里
     补同一条，让 ✕ 与页签行右端对齐。 */
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

/* 手机档：「更多视图」⋯ 与侧边栏「更多」重复，而且它把页签行挤成两行
   （tablist 宽 100% → flex 换行），连带把谱系 chip 顶到 header 底边那条空行。
   只藏按钮本身：菜单以它为锚点，藏了按钮就不会再弹出。 */
@media (max-width: 1023px) and (pointer: coarse) {
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) button[class*="viewsMore"],
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="viewsMoreAnchor"] {
    display: none !important;
  }
}

/* 抽屉打开时，「更多」菜单（宿主 PanelMoreMenu，align=start、宽 288）从锚点
   左缘起算会越过 min(88vw,280px) 的抽屉右缘。把菜单钉在抽屉内：左缘 8px、
   宽度跟着抽屉算，右侧留 8px。 */
@media (max-width: 1023px) and (pointer: coarse) {
  body:has([data-mobile-nav="frame"]:not([data-sidebar-collapsed])) [class*="moreMenu"] {
    left: 8px !important;
    right: auto !important;
    max-width: calc(min(88vw, 280px) - 16px) !important;
  }
}

/* 头部「下载记录」按钮：它是 headerActions 里唯一留在文档流里的插件按钮
   （toggle/files 都绝对定位到两角），所以会孤零零卡在标题和「标准模式」之间。
   右侧图标簇已经没有 28px 的空位（团队 chip 的箭头与文件按钮只隔 ~39px），
   先把它从头部撤下；要保留入口就放进抽屉品牌行或文件面板。 */
@media (max-width: 1023px) and (pointer: coarse) {
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-mobile-nav="downloads"] {
    display: none !important;
  }
}

/* 抽屉品牌行「下载」菜单：视觉与宿主 Menu 对齐（Menu.module.css / MenuSurface）：
   4px 内边距、radius-lg 表面、elevation-prominent 阴影、34px 行高、13px 字、
   6px 图标间距；行高与「更多」菜单完全一致。 */
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
  /* 与宿主 Menu.module.css 同款：prominent 阴影的第一段是 0.5px 描边环，
     颜色取自 --dsw-elevation-stroke-color；不声明它会落成黑色，就是用户看到的黑边。 */
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


/* 头部顶部留白：屏幕状态栏高 38px（152px @4x），标题原始落在 54px。
   2026-10-25 试过 -16（标题约 38），会进入 App 的顶部遮盖层，已回退到 -8
   （标题约 46，仍在状态栏之下）；再往上需要 App 层配合，见 04-plan 交接文档。 */
@media (max-width: 1023px) and (pointer: coarse) {
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    margin-top: -8px !important;
  }
}

`;var Ln=[_n,Sn,Cn,An].join(`
`);var Le="(max-width: 1023px) and (pointer: coarse)",Mn="(min-width: 1024px)",Tt="(pointer: coarse)",Rn="(min-width: 1024px) and (pointer: coarse)";function F(e,t,a,n=Le){e.effect(()=>{let o=window.matchMedia(n),i,r=()=>{i?.(),i=o.matches?a(o):void 0};return r(),o.addEventListener("change",r),()=>{o.removeEventListener("change",r),i?.()}},t)}function qe(e,t){if(t!==null)try{if(t("(font: -apple-system-body) and (-webkit-touch-callout: none)"))return!0}catch{}let a=e.userAgent;return/iP(hone|ad|od)/.test(a)?!0:/Macintosh/.test(a)&&e.maxTouchPoints>1}var ma="--mobile-nav-header-h",Xr='[data-mobile-nav="frame"] [data-phase] header',it=null,We=null;function On(e){if(typeof document>"u")return;let t=document.documentElement;t.style.getPropertyValue(ma)!==e&&t.style.setProperty(ma,e)}function Nn(){let e=D(),t=it;return t===null||e===null||!(t instanceof HTMLElement)?"0px":`${Math.round(Math.max(0,t.getBoundingClientRect().bottom-e.getBoundingClientRect().top))}px`}function Pn(){On(Nn())}function Zr(){let e=it;On(e instanceof HTMLElement&&e.offsetHeight===0?"0px":Nn())}function Yr(){if(typeof document>"u")return;let e=document.querySelector(Xr);if(e===it){e!==null&&typeof ResizeObserver>"u"&&Pn();return}We?.disconnect(),it=e,e!==null&&typeof ResizeObserver<"u"&&(We=We??new ResizeObserver(()=>{Pn()}),We.observe(e)),Zr()}function In(){return{name:"header-metrics",scopes:["*"],ensure:()=>{Yr()},dispose:()=>{We?.disconnect(),We=null,it=null,typeof document<"u"&&document.documentElement.style.removeProperty(ma)}}}var fa="characterData";function Hn(e){return e.type==="attributes"?e.attributeName===null?"*":e.attributeName:e.type==="characterData"?fa:"*"}function Fn(e){let t=e.onError??((c,C,S)=>{console.error(`[dsh-web-mobile] reconciler task ${c}${S==="dispose"?" dispose":""} failed`,C)}),a=new Set,n=null,o=new Set,i=!1,r=null,l=c=>{try{c.ensure()}catch(C){t(c.name,C,"ensure")}},u=c=>{try{c.dispose()}catch(C){t(c.name,C,"dispose")}},f=()=>{if(r!==null&&(r(),r=null),n===null){o.clear(),i=!1;return}let c=o,C=i;if(o=new Set,i=!1,C)for(let S of n)l(S);else if(c.size>0)for(let S of n){let _=S.scopes;(_===void 0||_.some(L=>c.has(L)))&&l(S)}},s=()=>{r===null&&(r=e.requestFrame(()=>{r=null,f()}))};return{get size(){return a.size},register:c=>(a.add(c),n!==null&&(n.add(c),l(c)),()=>{a.delete(c),n!==null&&n.delete(c)&&u(c)}),activate:()=>{n===null&&(n=new Set(a),i=!0,f())},deactivate:()=>{if(r!==null&&(r(),r=null),o.clear(),i=!1,n!==null){let c=n;n=null;for(let C of c)u(C)}},note:c=>{for(let C of c)o.add(C);s()},flush:f}}var Q="pocketMobileNav",zn={open:"打开目录",close:"收起目录",backdrop:"点击关闭目录",back:"返回",backToConversation:"返回会话",sessionLog:"导出会话日志",downloadMenu:"下载",downloads:"下载记录",quickSettings:"设置",files:"文件浏览",fileUpload:"添加文件",fileUploadImage:"上传图片",fileUploadAttachment:"上传附件",previewFullscreen:"全屏预览",previewExitFullscreen:"退出全屏",questionExpand:"展开回答",questionCollapse:"收起回答",deleteSession:"删除会话",deleteConfirmTitle:"删除会话？",deleteConfirmDesc:"将删除「{title}」的完整会话记录，此操作不可恢复。",deleteConfirmYes:"删除",deleteConfirmNo:"取消",deletePending:"正在删除…",deleteErrorBusy:"该会话正在运行且无法停止，请稍后重试。",deleteErrorNotFound:"会话不存在或已被删除。",deleteErrorResolve:"无法确定要删除的会话，请重试。",deleteErrorGeneric:"删除失败：{message}"},Dn={open:"Open directory",close:"Close directory",backdrop:"Click to close directory",back:"Back",backToConversation:"Back to conversation",sessionLog:"Session log",downloadMenu:"Downloads",downloads:"Downloads history",quickSettings:"Settings",files:"Files",fileUpload:"Add files",fileUploadImage:"Upload image",fileUploadAttachment:"Upload attachment",previewFullscreen:"Fullscreen preview",previewExitFullscreen:"Exit fullscreen",questionExpand:"Expand answer",questionCollapse:"Collapse answer",deleteSession:"Delete session",deleteConfirmTitle:"Delete session?",deleteConfirmDesc:"The complete log of “{title}” will be permanently removed. This cannot be undone.",deleteConfirmYes:"Delete",deleteConfirmNo:"Cancel",deletePending:"Deleting…",deleteErrorBusy:"This session is running and could not be stopped. Try again later.",deleteErrorNotFound:"The session does not exist or was already deleted.",deleteErrorResolve:"Could not identify the session to delete. Please try again.",deleteErrorGeneric:"Delete failed: {message}"};function Bn(e){F(e,"dsh-web-mobile: aionui explorer close marker",()=>{let t=a=>{let n=a.target;n===null||!n.closest(".aionui-collapse-chevron")||D()?.removeAttribute("data-aionui-explorer-open")};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)}),F(e,"dsh-web-mobile: preview sheet open marker",()=>{let t=()=>{D()?.removeAttribute("data-aionui-preview-open"),D()?.removeAttribute("data-mobile-preview-full")},a="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",n="5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",o=null,i=!1,r=["platform","userAgent","appVersion"],l=new Map,u=()=>{if(o!==null&&(window.clearTimeout(o),o=null),!!i){i=!1;for(let m of r){let T=l.get(m)??null;T===null?delete navigator[m]:Object.defineProperty(navigator,m,T)}l.clear()}},f=()=>{if(!i){for(let m of r)l.set(m,Object.getOwnPropertyDescriptor(navigator,m)??null);Object.defineProperty(navigator,"platform",{value:"Win32",configurable:!0}),Object.defineProperty(navigator,"userAgent",{value:a,configurable:!0}),Object.defineProperty(navigator,"appVersion",{value:n,configurable:!0}),i=!0}o!==null&&window.clearTimeout(o),o=window.setTimeout(u,1e3)},s=m=>{let T=m.target;if(T===null)return;let c=T.closest('[data-aionui-explorer-col] [class*="_treeRow"]');c!==null&&c.querySelector('[class*="_treeArrow"]:not([class*="_treeArrowEmpty"])')===null&&(f(),D()?.setAttribute("data-aionui-preview-open",""))},d=m=>{let T=m.target;T!==null&&T.closest('[data-aionui-preview-col] [class*="_panelCollapse"]')!==null&&t()};return document.addEventListener("click",s,!0),document.addEventListener("click",d,!0),()=>{u(),document.removeEventListener("click",s,!0),document.removeEventListener("click",d,!0)}})}function qn(){return{name:"preview-close-sync",scopes:["style"],ensure:()=>{let e=document.querySelector("[data-aionui-preview-col]");e!==null&&e.style.visibility==="hidden"&&(D()?.removeAttribute("data-aionui-preview-open"),D()?.removeAttribute("data-mobile-preview-full"))},dispose:()=>{}}}function Wn(){let e=["[data-aionui-explorer-col]","[data-aionui-preview-col]"],t=new Map,a=new Map,n=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,o=u=>{let f=a.get(u);if(f!==void 0){a.delete(u);try{f.anim.cancel()}catch{}}},i=()=>{for(let u of e){let f=a.get(u);if(f===void 0)continue;if(!f.el.isConnected){o(u);continue}let s=document.querySelector(u);s!==null&&s!==f.el&&o(u)}},r=(u,f)=>{if(o(u),n())return;let s=f.animate([{opacity:0,transform:"translateY(28px)"},{opacity:1,transform:"none"}],{duration:280,easing:"cubic-bezier(.16, 1, .3, 1)",fill:"backwards"});a.set(u,{el:f,anim:s}),s.finished.then(()=>{a.get(u)?.anim===s&&a.delete(u)}).catch(()=>{})},l=[null,null];return{name:"sheet-rise-replay",scopes:["*","style","class","data-aionui-explorer-open","data-aionui-preview-open","data-mobile-preview-full"],ensure:()=>{let u=e.map((f,s)=>{let d=l[s];return d!==null&&d.isConnected&&d.matches(f)?d:l[s]=document.querySelector(f)});if(!(a.size===0&&u[0]===null&&u[1]===null)){i();for(let f=0;f<e.length;f++){let s=e[f],d=u[f];if(d===null){o(s);continue}let m=a.get(s);m!==void 0&&m.el!==d&&o(s);let T=getComputedStyle(d).visibility==="visible",c=t.get(s)??!1;T&&!c&&r(s,d),t.set(s,T)}}},dispose:()=>{for(let u of e)o(u);a.clear(),t.clear(),l[0]=l[1]=null}}}var Vn="[data-composer-card], [data-composer-input], [contenteditable], input, textarea, button";function jn(e){let t=e.matches;if(typeof t=="function"&&t.call(e,Vn))return!0;let a=e.querySelector;return typeof a=="function"&&a.call(e,Vn)!==null}function Un(e){let t=e.querySelectorAll;if(typeof t!="function"||typeof getComputedStyle!="function")return/\d\s*%/.test(e.textContent??"");for(let a of t.call(e,"svg circle")){let n=getComputedStyle(a).strokeDasharray;if(n!==""&&n!=="none"&&!/^(0px?)(\s+0px?)*$/.test(n))return!0}return!1}function Qr(e,t){return e.contains(t)||jn(e)?!1:Un(e)}function ba(e){let t=e.closest("[data-composer-dock]");if(t!==null){let n=[...t.children].filter(i=>!i.contains(e)&&!jn(i)&&!i.hasAttribute("data-mobile-nav")),o=n.find(Un)??(n.length===1?n[0]:void 0);if(o!==void 0)return{dock:t,ring:o}}let a=e.closest('[class*="_composerStack"]');for(let n=e.parentElement;n!==null;n=n.parentElement){let o=[...n.children].find(i=>Qr(i,e));if(o!==void 0)return{dock:n,ring:o};if(n===a)break}return null}function Jr(e){return e===null||!e.isConnected||e.closest("[data-phase]")===null?!1:e.closest('[class*="_composerStack"]')!==null}var es=/^TPS\s+\d/,ts=/TPS\s+\d/,as=e=>{for(let[t,a]of e.entries())if(es.test((a.textContent??"").trim())&&!(a.children.length>0)&&a.parentElement!==null)return{index:t,mark:a.getAttribute("data-mobile-nav")!=="stats-tps"};return{index:-1,mark:!1}};function ns(e,t,a,n){return e!==null?{el:e.el,reserve:e.reserve,live:t}:ts.test(a())?n():null}function os(e,t,a,n){return e?t:a&&n}function Gn(){let e=(b,k)=>{getComputedStyle(b).position==="static"&&b.setAttribute("data-mobile-nav",k)},t=b=>{for(let k=b.parentElement;k!==null;k=k.parentElement)if(getComputedStyle(k).position!=="static")return k;return null},a=(b,k)=>{let x=t(b);if(x===null)return null;let R=k.getBoundingClientRect(),O=x.getBoundingClientRect(),P=b.getBoundingClientRect();return{host:b,left:R.left-O.left-x.clientLeft,top:R.top-O.top-x.clientTop-(P.height-R.height)/2}},n=b=>{let k=b.host;k.style.left!==`${b.left}px`&&(k.style.left=`${b.left}px`),k.style.top!==`${b.top}px`&&(k.style.top=`${b.top}px`)},o=b=>{let k=b.closest('[class*="_composerStack"]');if(k===null)return null;let x=b.querySelector(':scope > [data-mobile-nav="stats-tps-reserve"]'),R=[...k.querySelectorAll("div")],O=as(R);if(O.index<0)return null;let P=R[O.index];if(P===void 0)return null;x===null&&(x=document.createElement("span"),x.setAttribute("data-mobile-nav","stats-tps-reserve"),x.setAttribute("aria-hidden","true"),b.appendChild(x));let z=P.textContent??"";x.textContent!==z&&(x.textContent=z),O.mark&&P.setAttribute("data-mobile-nav","stats-tps");let q=P.parentElement;return q===null?null:(e(q,"stats-tps-row"),{el:P,reserve:x,live:z})},i=b=>{let{el:k,reserve:x}=b,R=a(k,x);return{el:k,measured:R,width:x.getBoundingClientRect().width}},r=b=>{b.measured!==null&&n(b.measured);let k=b.el,x=`${b.width}px`;k.style.maxWidth!==x&&(k.style.maxWidth=x)},l=b=>{let k=ba(b);if(k===null)return null;let{dock:x,ring:R}=k,O=document.querySelector('[data-composer-card] [class*="_row"] [class*="_trailing"]');if(O===null)return null;let P=O.querySelector(':scope > [data-mobile-nav="stats-ring-reserve"]'),z=O.querySelector(':scope > [class*="_primary"]');return P===null?(P=document.createElement("span"),P.setAttribute("data-mobile-nav","stats-ring-reserve"),O.insertBefore(P,z)):(z===null?O.lastElementChild!==P:P.nextElementSibling!==z)&&O.insertBefore(P,z),R.getAttribute("data-mobile-nav")!=="stats-ring"&&R.setAttribute("data-mobile-nav","stats-ring"),e(x,"stats-ring-dock"),{ring:R,reserve:P,measured:a(R,P)}},u=b=>{let k=o(b);k!==null&&r(i(k))},f=b=>{let k=l(b);k!==null&&k.measured!==null&&n(k.measured)},s=null,d=0,m="",T=b=>{if(b===null)return"none";let k=b.getBoundingClientRect();return`${Math.round(k.left)}:${Math.round(k.top)}:${Math.round(k.width)}`},c=()=>{let b=document.querySelector('[data-mobile-nav="stats"]');if(b===null)return;let k=b.getBoundingClientRect(),x=`${Math.round(k.left)}:${Math.round(k.top)}:${Math.round(k.width)}:${Math.round(k.height)}|${T(document.querySelector('[data-mobile-nav="stats-ring-reserve"]'))}`;if(x===m)return;m=x;let R=o(b),O=R===null?null:i(R),P=l(b);O!==null&&r(O),P!==null&&P.measured!==null&&n(P.measured)},C=()=>{d===0&&(d=requestAnimationFrame(()=>{d=0,c()}))},S="",_=null,L=null,g=null,h=null,E=null,v=(b,k)=>b!==null&&b.isConnected&&b.getAttribute("data-mobile-nav")===k,p=b=>{let k=ba(b);return k===null?!1:k.ring===g};return{name:"stats-line",scopes:["*",fa],ensure:()=>{s===null&&(s=C,window.addEventListener("resize",C),window.visualViewport?.addEventListener("resize",C));let b=E;if((b===null||!b.isConnected||!b.matches('[data-mobile-nav="stats"]'))&&(b=E=document.querySelector('[data-mobile-nav="stats"]')),b!==null&&Jr(b)){let x=b.getBoundingClientRect(),R=`${Math.round(x.left)}:${Math.round(x.top)}:${Math.round(x.width)}:${Math.round(x.height)}`,O=v(_,"stats-tps"),P=v(L,"stats-tps-reserve"),z=O&&P&&_!==null&&L!==null?{el:_,reserve:L,live:""}:null,q=b.closest('[class*="_composerStack"]'),U=ns(z,_?.textContent??"",()=>q?.textContent??"",()=>o(b)),K=`${R}|${U===null?"none":U.live}|${T(h)}`,Z=os(U===null,_===null&&L===null,v(_,"stats-tps"),v(L,"stats-tps-reserve"));if(K===S&&Z&&v(g,"stats-ring")&&p(b)&&v(h,"stats-ring-reserve"))return;S=K;let te=U!==null&&U.el===_?o(b):U,I=te===null?null:i(te),H=l(b);I!==null&&r(I),H!==null&&H.measured!==null&&n(H.measured),_=te===null?null:te.el,L=te===null?null:te.reserve,g=H===null?null:H.ring,h=H===null?null:H.reserve,S=`${R}|${U===null?"none":U.live}|${T(h)}`;return}b?.removeAttribute("data-mobile-nav");let k=document.querySelector('[class*="_composerStack"]');if(k!==null)for(let x of['[class*="_root"]',"[data-slot]"])for(let R of k.querySelectorAll(x)){if(R.matches('[data-testid="todo-panel"]'))continue;let O=R.querySelectorAll("button");if(O.length>0&&![...O].every(z=>z.getAttribute("aria-haspopup")!==null))continue;let P=R.textContent??"";if(/(turns|steps|\bLLM\b|轮|步)/.test(P)&&R.querySelector("textarea, [data-composer-input]")===null){R.setAttribute("data-mobile-nav","stats"),u(R),f(R);return}}},dispose:()=>{d!==0&&(cancelAnimationFrame(d),d=0),m="",E=null,s!==null&&(window.removeEventListener("resize",s),window.visualViewport?.removeEventListener("resize",s),s=null);for(let b of document.querySelectorAll('[data-mobile-nav="stats-ring"], [data-mobile-nav="stats-tps"]')){let k=b;k.style.left="",k.style.top="",k.style.maxWidth=""}for(let b of["stats","stats-ring","stats-ring-dock","stats-tps","stats-tps-row"])for(let k of document.querySelectorAll(`[data-mobile-nav="${b}"]`))k.removeAttribute("data-mobile-nav");for(let b of document.querySelectorAll('[data-mobile-nav="stats-ring-reserve"], [data-mobile-nav="stats-tps-reserve"]'))b.remove()}}}function Kn(e){let t=null,a=o=>{let i=D()?.hasAttribute("data-mobile-preview-full")??!1,r=e(i?"previewExitFullscreen":"previewFullscreen");o.getAttribute("aria-label")!==r&&(o.setAttribute("aria-label",r),o.title=r)},n=()=>{D()?.toggleAttribute("data-mobile-preview-full"),t!==null&&a(t)};return{name:"preview-fullscreen-toggle",scopes:["data-aionui-preview-open","data-mobile-preview-full"],ensure:()=>{let o=document.querySelector("[data-aionui-preview-col]");o!==null&&(t===null&&(t=document.createElement("button"),t.type="button",t.dataset.mobileNav="preview-full-toggle",t.innerHTML=['<svg class="dsh-web-mobile-full-in" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>",'<svg class="dsh-web-mobile-full-out" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>"].join(""),t.addEventListener("click",n)),a(t),t.parentElement!==o&&o.appendChild(t))},dispose:()=>{t?.remove(),t=null}}}function wa(){ga?.()}var ga=null,is=200,rs='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="18" height="18"><path d="M9.8 3.4 5.2 8l4.6 4.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',ss='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="18" height="18"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.67272 0.522841C10.8339 0.522841 11.76 0.522714 12.4963 0.602493C13.2453 0.683657 13.8789 0.854248 14.4264 1.25197C14.7504 1.48739 15.0355 1.77247 15.2709 2.0965C15.6686 2.64394 15.8392 3.27758 15.9204 4.02655C16.0002 4.7629 16 5.68895 16 6.85014V9.14986C16 10.3111 16.0002 11.2371 15.9204 11.9735C15.8392 12.7224 15.6686 13.3561 15.2709 13.9035C15.0355 14.2275 14.7504 14.5126 14.4264 14.748C13.8789 15.1458 13.2453 15.3163 12.4963 15.3975C11.76 15.4773 10.8339 15.4772 9.67272 15.4772H6.3273C5.16611 15.4772 4.24006 15.4773 3.50371 15.3975C2.75474 15.3163 2.1211 15.1458 1.57366 14.748C1.24963 14.5126 0.964549 14.2275 0.729131 13.9035C0.331407 13.3561 0.160817 12.7224 0.0796529 11.9735C-0.000126137 11.2371 1.25338e-09 10.3111 1.25338e-09 9.14986V6.85014C1.25329e-09 5.68895 -0.000126137 4.7629 0.0796529 4.02655C0.160817 3.27758 0.331407 2.64394 0.729131 2.0965C0.964549 1.77247 1.24963 1.48739 1.57366 1.25197C2.1211 0.854248 2.75474 0.683657 3.50371 0.602493C4.24006 0.522714 5.16611 0.522841 6.3273 0.522841H9.67272ZM5.54303 1.88715V14.1118C5.78636 14.1128 6.04709 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C6.04709 1.88307 5.78636 1.8862 5.54303 1.88715ZM4.1828 1.91166C3.99125 1.9216 3.8148 1.93577 3.65076 1.95353C3.01764 2.02212 2.65034 2.1506 2.37325 2.35179C2.16463 2.50337 1.98052 2.68747 1.82895 2.89609C1.62776 3.17318 1.49928 3.54048 1.43069 4.1736C1.36074 4.81967 1.36023 5.65896 1.36023 6.85014V9.14986C1.36023 10.341 1.36074 11.1803 1.43069 11.8264C1.49928 12.4595 1.62776 12.8268 1.82895 13.1039C1.98052 13.3125 2.16463 13.4966 2.37325 13.6482C2.65034 13.8494 3.01764 13.9779 3.65076 14.0465C4.29683 14.1164 5.13612 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C5.13612 1.88307 4.29683 1.88358 3.65076 1.95353C3.47672 1.97129 3.30027 1.98546 3.10872 1.9954L4.1828 1.91166Z" fill="currentColor"/></svg>';function $n(e,t,a){let n=null,o=null,i=null,r=!1,l=()=>{let m=D();return m===null?!1:!m.hasAttribute("data-sidebar-collapsed")},u=null,f=()=>{let m=u;return m!==null&&m.isConnected&&m.matches('[data-phase="active"]')?!1:(u=document.querySelector('[data-phase="active"]'),u===null)},s=m=>{if(a!==null&&a.panelOpen()){m.preventDefault(),m.stopPropagation(),a.back();return}t()},d=()=>{if(o===null)return;let m=a!==null&&a.panelOpen(),T=m&&a!==null&&a.subpageOpen(),c=T?"back-level":m?"exit-panel":"open-drawer";if(o.dataset.mobileNavFabMode===c)return;o.dataset.mobileNavFabMode=c;let C=e(T?"back":m?"backToConversation":"open");o.setAttribute("aria-label",C),o.title=C,o.innerHTML=m?rs:ss};return{name:"overlay-backdrop-fab",scopes:["*","data-sidebar-collapsed","data-phase"],ensure:()=>{ga=()=>{n!==null&&(r=!0,n.style.pointerEvents="none",n.style.opacity="0")};let m=D();if(m===null){i!==null&&(window.clearTimeout(i),i=null),n?.remove(),n=null,o?.remove(),o=null;return}l()?n===null?(n=document.createElement("div"),n.dataset.mobileNav="backdrop",n.setAttribute("role","button"),n.setAttribute("aria-label",e("backdrop")),m.appendChild(n),r=!1):r&&i!==null&&(window.clearTimeout(i),i=null,r=!1,n.style.removeProperty("pointer-events"),n.style.removeProperty("opacity")):n!==null&&(n.style.pointerEvents="none",n.style.opacity="0",r=!0,i===null&&(i=window.setTimeout(()=>{i=null,n?.remove(),n=null},is+60))),f()&&!l()&&o===null?(o=document.createElement("button"),o.type="button",o.dataset.mobileNav="fab",o.setAttribute("aria-label",e("open")),o.title=e("open"),o.addEventListener("click",s),m.appendChild(o)):(!f()||l())&&o!==null&&(o.remove(),o=null),d()},dispose:()=>{i!==null&&(window.clearTimeout(i),i=null),ga=null,u=null,n?.remove(),n=null,o?.remove(),o=null}}}function Xn(){let e=null,t=null;return{name:"file-viewer-open-marker",scopes:["*"],ensure:()=>{let a=D();if(a===null)return;let n=document.querySelector(".dsfv-panel")!==null;n===e&&a===t||(e=n,t=a,n?a.setAttribute("data-file-viewer-open",""):a.hasAttribute("data-file-viewer-open")&&a.removeAttribute("data-file-viewer-open"))},dispose:()=>{e=null,t=null,D()?.removeAttribute("data-file-viewer-open")}}}function se(e){if(typeof e!="object"||e===null)return;let t=e;if(typeof t.current=="string")return t.current;for(let a in t.byId){let n=t.byId[a];if(n===void 0)continue;let o=n.retainedBy?.mainView;if(typeof o=="number"&&o>0&&typeof n.id=="string")return n.id}}function Zn(e){return typeof e?.clear=="function"}function Yn(e){return typeof e?.open=="function"}var ls=4,ds=350;async function Qn(e){let t=e.attempts??ls,a=e.intervalMs??ds;for(let n=0;n<t;n+=1){try{await e.refresh?.()}catch{}if(!e.listed())return!0;n+1<t&&await e.sleep(a)}return!e.listed()}var Jn='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.95317V10.0469" stroke="currentColor" stroke-width="1"/><path d="M4.25 6.29688L8 10.0469L11.75 6.29688" stroke="currentColor" stroke-width="1"/><path d="M1.5 10.0469V13.158C1.5 13.3937 1.60536 13.6198 1.79289 13.7865C1.98043 13.9532 2.23478 14.0469 2.5 14.0469H13.5C13.7652 14.0469 14.0196 13.9532 14.2071 13.7865C14.3946 13.6198 14.5 13.3937 14.5 13.158V10.0469" stroke="currentColor" stroke-width="1"/></svg>',cs='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1"/><path d="M8 4.6V8l2.2 1.6" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>';function eo(e){let t=e.locale.bind(Q),a=()=>se(e.sessions.list.getSnapshot()),n=null,o=null,i=null,r=null,l=null,u=null,f=null,s=null,d=null,m=()=>{r?.remove(),r=null,l=null,u!==null&&document.removeEventListener("pointerdown",u,!0),u=null,f!==null&&document.removeEventListener("keydown",f,!0),f=null,s?.disconnect(),s=null,d!==null&&(window.removeEventListener("resize",d),window.removeEventListener("orientationchange",d)),d=null,o?.setAttribute("aria-expanded","false")},T=()=>{if(r===null||o===null)return;let g=o.getBoundingClientRect();r.style.top=`${Math.round(g.bottom+4)}px`,r.style.right=`${Math.round(window.innerWidth-g.right)}px`},c=(g,h,E)=>{let v=document.createElement("button");v.type="button",v.setAttribute("role","menuitem"),v.dataset.mobileNav=h,v.innerHTML=E;let p=document.createElement("span");return p.textContent=g,v.appendChild(p),v},C=()=>{if(o===null)return;if(r!==null){m();return}let g=document.createElement("div");g.dataset.mobileNav="session-log-menu",g.setAttribute("role","menu"),g.setAttribute("aria-label",t("downloadMenu"));let h=c(t("sessionLog"),"session-log-export",Jn);h.disabled=a()===void 0,h.addEventListener("click",()=>{let p=a();m(),p!==void 0&&e.sessionLogDownload.download(p)}),g.appendChild(h),l=h;let E=window.DSHA;if(typeof E?.openDownloads=="function"){let p=c(t("downloads"),"session-log-downloads",cs);p.addEventListener("click",()=>{let M=E?.openDownloads?.();m(),M!==void 0&&M.catch(()=>{})}),g.appendChild(p)}document.body.appendChild(g),r=g,T(),o.setAttribute("aria-expanded","true"),u=p=>{let M=p.target;M instanceof Node&&(g.contains(M)||o!==null&&(M===o||o.contains(M))||m())},document.addEventListener("pointerdown",u,!0),f=p=>{p.key==="Escape"&&(p.preventDefault(),m())},document.addEventListener("keydown",f,!0);let v=D();v!==null&&(s=new MutationObserver(()=>{v.hasAttribute("data-sidebar-collapsed")&&m()}),s.observe(v,{attributes:!0,attributeFilter:["data-sidebar-collapsed"]})),d=()=>{T()},window.addEventListener("resize",d),window.addEventListener("orientationchange",d),window.setTimeout(()=>{h.focus({preventScroll:!0})},0)},S=()=>{l!==null&&(l.disabled=a()===void 0)},_=()=>{let g=D();return g===null?null:g.querySelector('[class*="sidebarCol"] [class*="logoRow"]')??g.querySelector('[class*="logoRow"]')},L=(g,h)=>{h.parentElement!==g&&g.appendChild(h)};return{name:"drawer-session-log",scopes:["*"],ensure:()=>{let g=_();g!==null&&(o===null&&(n=document.createElement("span"),n.dataset.mobileNav="session-log-wrap",o=document.createElement("button"),o.type="button",o.dataset.mobileNav="session-log",o.setAttribute("aria-haspopup","menu"),o.setAttribute("aria-expanded","false"),o.setAttribute("aria-label",t("downloadMenu")),o.title=t("downloadMenu"),o.innerHTML=Jn,o.addEventListener("click",C),n.appendChild(o),i=e.sessions.list.subscribe(()=>{S()})),n!==null&&L(g,n),S())},dispose:()=>{m(),i?.(),i=null,n?.remove(),n=null,o=null}}}var ps='<svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true" stroke-width="1.3"><path d="M8 9.75012C8.9665 9.75012 9.75 8.96662 9.75 8.00012C9.75 7.03362 8.9665 6.25012 8 6.25012C7.0335 6.25012 6.25 7.03362 6.25 8.00012C6.25 8.96662 7.0335 9.75012 8 9.75012Z" stroke="currentColor"/><path d="M13.0107 7.79377C12.9505 7.89401 12.9205 7.94413 12.9205 7.99951C12.9205 8.0549 12.9505 8.10502 13.0106 8.20528L13.9849 9.83006C14.045 9.93029 14.0751 9.9804 14.0751 10.0358C14.0751 10.0911 14.045 10.1413 13.9849 10.2415L13.0037 11.8777C12.9468 11.9726 12.9184 12.0201 12.8725 12.0461C12.8267 12.072 12.7713 12.072 12.6607 12.072H10.6704C10.5598 12.072 10.5045 12.072 10.4586 12.098C10.4128 12.1239 10.3843 12.1714 10.3274 12.2662L9.33825 13.9142C9.28133 14.009 9.25287 14.0564 9.20703 14.0823C9.16118 14.1083 9.10588 14.1083 8.99529 14.1083H7.00486C6.89426 14.1083 6.83896 14.1083 6.79312 14.0823C6.74727 14.0564 6.71881 14.009 6.6619 13.9142L5.67273 12.2662C5.61581 12.1714 5.58735 12.1239 5.54151 12.098C5.49566 12.072 5.44036 12.072 5.32977 12.072H3.33945C3.2288 12.072 3.17347 12.072 3.12761 12.0461C3.08176 12.0201 3.0533 11.9726 2.9964 11.8777L2.0152 10.2415C1.9551 10.1413 1.92505 10.0911 1.92505 10.0358C1.92505 9.9804 1.9551 9.93029 2.0152 9.83006L2.98951 8.20528C3.04963 8.10502 3.07969 8.0549 3.07969 7.99951C3.07968 7.94413 3.04961 7.89401 2.98946 7.79377L2.01529 6.17011C1.95514 6.06987 1.92507 6.01975 1.92507 5.96437C1.92506 5.90899 1.95512 5.85886 2.01524 5.7586L2.9964 4.1224C3.0533 4.0275 3.08176 3.98005 3.12761 3.95408C3.17347 3.92811 3.2288 3.92811 3.33945 3.92811H5.32977C5.44036 3.92811 5.49566 3.92811 5.54151 3.90216C5.58735 3.87621 5.61581 3.82879 5.67273 3.73397L6.6619 2.08599C6.71881 1.99116 6.74727 1.94375 6.79312 1.9178C6.83896 1.89185 6.89426 1.89185 7.00486 1.89185H8.99529C9.10588 1.89185 9.16118 1.89185 9.20703 1.9178C9.25287 1.94375 9.28133 1.99116 9.33825 2.08599L10.3274 3.73397C10.3843 3.82879 10.4128 3.87621 10.4586 3.90216C10.5045 3.92811 10.5598 3.92811 10.6704 3.92811H12.6607C12.7713 3.92811 12.8267 3.92811 12.8725 3.95408C12.9184 3.98005 12.9468 4.0275 13.0037 4.1224L13.9849 5.7586C14.045 5.85886 14.0751 5.90899 14.0751 5.96437C14.0751 6.01975 14.045 6.06987 13.9849 6.17011L13.0107 7.79377Z" stroke="currentColor" stroke-miterlimit="10"/></svg>',hs='[class*="sidebarCol"] [class*="triggerRow"]',to='button[aria-haspopup="menu"]',us=400,_t="data-mobile-nav-quick-menu",ms="[data-mobile-nav-quick-menu]";function St(e){let t=e.locale.bind(Q),a=null,n=null,o=null,i=()=>{let T=D();return T===null?null:T.querySelector(hs)},r=()=>{o!==null&&(window.clearTimeout(o),o=null)},l=T=>{let c=document.documentElement;c.setAttribute("data-mobile-nav-quick","");let C=!1,S=()=>{C||(C=!0,r(),c.removeAttribute("data-mobile-nav-quick"))},_=()=>T.getAttribute("aria-expanded")==="true";_()||T.click(),requestAnimationFrame(()=>{let L=document.querySelectorAll('[role="menu"]'),h=(_()&&L.length>0?L[L.length-1]:null)?.querySelector('[role="menuitem"]')??null;if(h===null){_()&&T.click(),S();return}h.click(),o=window.setTimeout(()=>{_()&&T.click(),S()},us)})},u=()=>{let T=i();if(T===null)return;let c=T.querySelector(to);c!==null&&l(c)},f=()=>{a=document.createElement("span"),a.dataset.mobileNav="quick-settings-wrap",n=document.createElement("button"),n.type="button",n.dataset.mobileNav="quick-settings",n.setAttribute("aria-label",t("quickSettings")),n.setAttribute("aria-haspopup","dialog"),n.title=t("quickSettings"),n.innerHTML=ps,n.addEventListener("click",u),a.appendChild(n)},s=T=>![...T.children].some(c=>c.getAttribute("data-phase")!==null||c.getAttribute("role")==="status"),d=()=>{for(let T of document.querySelectorAll(ms))T.removeAttribute(_t)},m=T=>{let c=document.querySelectorAll('[role="menu"]'),C=c.length>0?c[c.length-1]??null:null;if(C===null)return;let S=T.querySelector(to);if(!(S!==null&&S.getAttribute("aria-expanded")==="true"&&s(T))){C.removeAttribute(_t);return}C.hasAttribute(_t)||C.setAttribute(_t,"")};return{name:"drawer-quick-settings",scopes:["*"],ensure:()=>{let T=i();T!==null&&((n===null||a===null)&&f(),a!==null&&a.parentElement!==T&&T.appendChild(a),m(T))},dispose:()=>{r(),document.documentElement.removeAttribute("data-mobile-nav-quick"),d(),a?.remove(),a=null,n=null}}}function ao(e){return Number.isNaN(e)?1:Math.min(4,Math.max(1,e))}function ue(){return{scale:1,x:0,y:0}}function no(e,t,a){if(!Number.isFinite(t)||t<=0)return{...e};if(!(e.scale>0))return ue();let n=ao(e.scale*t);if(n===1)return ue();let o=n/e.scale;return{scale:n,x:a.x-(a.x-e.x)*o,y:a.y-(a.y-e.y)*o}}function Ct(e,t){let a=ao(e.scale);if(a===1)return ue();let n=Number.isFinite(t.width)&&t.width>0?t.width:0,o=Number.isFinite(t.height)&&t.height>0?t.height:0,i=(a-1)*n/2,r=(a-1)*o/2,l=Number.isFinite(e.x)?Math.min(i,Math.max(-i,e.x)):0,u=Number.isFinite(e.y)?Math.min(r,Math.max(-r,e.y)):0;return{scale:a,x:l,y:u}}function oo(e,t){let a=Math.hypot(e.x,e.y),n=Math.hypot(t.x,t.y);return a===0||!Number.isFinite(a)||!Number.isFinite(n)?1:n/a}function io(e){return e.scale<=1?{scale:2.5,x:0,y:0}:ue()}function ro(){let e=null,t=null,a=ue(),n=new Map,o=null,i=null,r=null,l=()=>({width:window.innerWidth,height:window.innerHeight}),u=()=>{for(let E of document.body.querySelectorAll(':scope > [role="dialog"][aria-modal="true"]')){if(!(E instanceof HTMLElement))continue;let v=E.querySelector(":scope > :first-child > img");if(v instanceof HTMLImageElement)return{root:E,image:v}}return null},f=()=>{t!==null&&(t.style.transform="",t.style.transformOrigin="",t.style.willChange="",t=null)},s=()=>{e!==null&&(e.removeEventListener("pointerdown",c),e.removeEventListener("pointermove",C),e.removeEventListener("pointerup",S),e.removeEventListener("pointercancel",_),e.removeEventListener("gesturestart",L),e.removeEventListener("touchmove",g),e.getAttribute("data-mobile-nav")==="image-lightbox"&&e.removeAttribute("data-mobile-nav")),f(),n.clear(),o=null,i=null,r=null,a=ue(),e=null},d=()=>{if(t===null)return{x:0,y:0};let E=t.getBoundingClientRect();return{x:E.left+E.width/2-a.x,y:E.top+E.height/2-a.y}},m=()=>{t!==null&&(t.style.transform="translate3d("+a.x+"px, "+a.y+"px, 0) scale("+a.scale+")")},T=()=>{let E=[...n.values()],v=E[0],p=E[1];if(v===void 0||p===void 0)return;let M={x:(v.x+p.x)/2,y:(v.y+p.y)/2},b=d();i={startSpan:{x:p.x-v.x,y:p.y-v.y},startMid:M,startZoom:{...a},anchor:{x:M.x-b.x,y:M.y-b.y}},o=null},c=E=>{if(E.pointerType!=="mouse"){if(n.set(E.pointerId,{x:E.clientX,y:E.clientY}),n.size>=2){T();return}o={pointerId:E.pointerId,startX:E.clientX,startY:E.clientY,originX:a.x,originY:a.y,moved:!1,startedOnImage:E.target===t}}},C=E=>{if(!n.has(E.pointerId))return;let v={x:E.clientX,y:E.clientY};if(n.set(E.pointerId,v),n.size>=2){if(i===null){T();return}let b=[...n.values()],k=b[0],x=b[1];if(k===void 0||x===void 0)return;let R={x:(k.x+x.x)/2,y:(k.y+x.y)/2},O=oo(i.startSpan,{x:x.x-k.x,y:x.y-k.y}),P=no(i.startZoom,O,i.anchor);a=Ct({scale:P.scale,x:P.x+(R.x-i.startMid.x),y:P.y+(R.y-i.startMid.y)},l()),m();return}if(o===null||o.pointerId!==E.pointerId||!o.startedOnImage)return;let p=v.x-o.startX,M=v.y-o.startY;(Math.abs(p)>4||Math.abs(M)>4)&&(o.moved=!0),a=Ct({scale:a.scale,x:o.originX+p,y:o.originY+M},l()),m()},S=E=>{if(!n.delete(E.pointerId))return;if(n.size>=2){T();return}if(n.size===1){let M=[...n.entries()][0];if(i=null,o=null,M!==void 0){let[b,k]=M;o={pointerId:b,startX:k.x,startY:k.y,originX:a.x,originY:a.y,moved:!0,startedOnImage:!0}}return}let v=o;if(o=null,i=null,v===null||v.pointerId!==E.pointerId||!v.startedOnImage||v.moved){r=null;return}let p=Date.now();if(r!==null&&p-r.at<=320&&Math.hypot(E.clientX-r.x,E.clientY-r.y)<=28){a=Ct(io(a),l()),r=null,m();return}r={at:p,x:E.clientX,y:E.clientY}},_=E=>{n.delete(E.pointerId),n.size<2&&(i=null),n.size===0&&(o=null,r=null)},L=E=>{E.preventDefault()},g=E=>{E.touches.length>1&&E.preventDefault()},h=(E,v)=>{e=E,t=v,a=ue(),n.clear(),o=null,i=null,r=null,e.setAttribute("data-mobile-nav","image-lightbox"),t.style.transformOrigin="50% 50%",t.style.willChange="transform",e.addEventListener("pointerdown",c),e.addEventListener("pointermove",C),e.addEventListener("pointerup",S),e.addEventListener("pointercancel",_),e.addEventListener("gesturestart",L),e.addEventListener("touchmove",g,{passive:!1})};return{name:"image-lightbox-zoom",scopes:["*"],ensure:()=>{let E=u();if(E===null){s();return}if(e===E.root){t!==E.image&&(f(),t=E.image,a=ue(),t.style.transformOrigin="50% 50%",t.style.willChange="transform");return}s(),h(E.root,E.image)},dispose:()=>{s()}}}var Ve=new WeakMap,va=!1;function xa(){va=!0}function ya(){va=!1}function ka(){return va}function At(e){return typeof e=="object"&&e!==null&&"parentElement"in e&&e.parentElement!==void 0}function so(e,t,a){let n=performance.now()+t;if(!At(e)){if(typeof e!="object"&&typeof e!="function"||e===null)return;Ve.set(e,n);return}let o=e;for(;o!==null&&(Ve.set(o,n),o!==a);)o=At(o.parentElement)?o.parentElement:null}function rt(e){let t=performance.now(),a=e.target;if(!At(a)){if(typeof a!="object"&&typeof a!="function"||a===null)return!1;let o=Ve.get(a);return o===void 0?!1:o<=t?(Ve.delete(a),!1):!0}let n=a;for(;n!==null;){let o=Ve.get(n);if(o!==void 0)if(o<=t)Ve.delete(n);else return!0;n=At(n.parentElement)?n.parentElement:null}return!1}var fs=["node","session","summary","result"],bs=["sessionId","id"],gs=["__reactFiber$","__reactInternalInstance$"];function ws(e){if(typeof e!="object"||e===null)return null;let t=e.id;return typeof t=="string"?t:null}function vs(e,t){if(e==null)return null;for(let a of fs){let n=ws(e[a]);if(n!==null&&t(n))return n}for(let a of bs){let n=e[a];if(typeof n=="string"&&t(n))return n}return null}function Lt(e,t,a=60){let n=e;for(let o=0;o<a&&n!==null&&n!==void 0;o+=1){let i=vs(n.memoizedProps,t);if(i!==null)return i;n=n.return}return null}function Mt(e){if(e==null||typeof e!="object")return null;let t=e;for(let a of gs)for(let n of Object.keys(t)){if(!n.startsWith(a))continue;let o=t[n];if(typeof o=="object"&&o!==null)return o}return null}function Ea(e,t,a){return Math.abs(t.x-e.x)<=a&&Math.abs(t.y-e.y)<=a}var xs=.45;function lo(e,t=xs){return Math.round(e*t)}var Ta=8,ys=.16,co=.13,wo=60,ks=.45,Es=.45,Re=350,Ts=300,_s=8,Ne=110,po=280,ho=101,Ss=.45,Cs=.16,As=.45,we=0,Ie=!1,ve=[],dt=0,Sa=0,He=!1,xe=0,lt=null,J=null,Fe=!1,vo=0,Pe=!1,me=!1,ct=!1,Oe="drawer",Ca=!1,xo=()=>!1;function Ls(e,t,a){let n=a?-t.dx:t.dx;if(Math.abs(n)<=e.lockPx||Math.abs(n)<=Math.abs(t.dy))return"none";if(e.drawerOpen){if(Math.abs(n)/e.viewportWidthPx>=e.closeDistanceRatio)return"close";let r=a?-t.velX:t.velX;return r>0!=n>0?"none":Math.abs(r)>=e.closeVelocity?"close":"none"}return n<=0?"none":n/e.viewportWidthPx>=e.openDistanceRatio||(a?-t.velX:t.velX)>=e.openVelocity?"open":"none"}function Ms(e,t,a){let n=a?-t.dx:t.dx;if(Math.abs(n)<=e.lockPx||Math.abs(n)<=Math.abs(t.dy))return"none";let o=a?-t.velX:t.velX;if(n<0)return e.panelOpen||e.drawerOpen?"none":-n/e.viewportWidthPx>=e.distanceRatio?"files":o>0!=n>0?"none":-o>=e.velocity?"files":"none";if(e.drawerOpen){let i=e.drawerCloseDistanceRatio??e.distanceRatio;return n/e.viewportWidthPx>=i?"close":o<=0?"none":o>=e.velocity?"close":"none"}return e.panelOpen?n/e.viewportWidthPx>=e.distanceRatio?"files":o>0!=n>0?"none":o>=e.velocity?"files":"none":"none"}function Rs(e,t,a){let n=a-t,o=e.filter(u=>u.t>=n);if(o.length<2)return 0;let i=o[o.length-2],r=o[o.length-1],l=r.t-i.t;return l<=0?0:(r.x-i.x)/l}function Ps(e,t,a,n){let o=a?t-e:e;return o>=0&&o<=n.startZonePx}function uo(e,t,a,n){let o=a?e:t-e;return o>=0&&o<=n}function Os(e,t){return e||!t?"drawer":"files"}function Ns(e,t,a,n){let o=e<=0?-1:1,i=Math.abs(e),r=a?-t:t;return n?r>=0?null:o*Math.min(i,-r)+0:r<=0?null:o*(i-Math.min(i,r))+0}function yo(e,t){let a=t?-e:e;return a<=0?null:t?`translateX(max(0px, calc(${ho}% - ${a}px)))`:`translateX(min(0px, calc(-${ho}% + ${a}px)))`}function Is(e){let t=e;for(;t!==null;){if((t.overflowX==="auto"||t.overflowX==="scroll")&&t.scrollWidth>t.clientWidth+1)return t;t=t.parent}return null}function Ke(){let e=D();return e!==null&&e.firstElementChild instanceof HTMLElement?e.firstElementChild:null}function Aa(){let e=D();return e!==null&&!e.hasAttribute("data-sidebar-collapsed")}function Hs(){let e=document.querySelector("[data-sidebar-right-panel]");return e!==null&&e.hasAttribute("data-sidebar-right-open")}function Fs(e){let t=null,a=e;for(;a!==null;)t={parent:t,scrollWidth:a.scrollWidth,clientWidth:a.clientWidth,overflowX:getComputedStyle(a).overflowX},a=a.parentElement;return t}function It(){return document.querySelector('[aria-modal="true"]')!==null}function La(){return document.documentElement.hasAttribute("data-dsh-taskboard-active")||document.documentElement.hasAttribute("data-dsh-ssh-active")||document.querySelector("[data-conversation-composer-overlay]")!==null}function ko(){if(typeof window>"u")return!1;let e=window.getSelection();if(e!==null&&!e.isCollapsed)return!0;if(typeof document>"u")return!1;let t=document.activeElement;if(t===null)return!1;let a=t.tagName;if(a!=="TEXTAREA"&&a!=="INPUT")return!1;try{let{selectionStart:n,selectionEnd:o}=t;return typeof n=="number"&&typeof o=="number"&&n!==o}catch{return!1}}function Eo(){return performance.now()<xe}function To(e){return document.documentElement.hasAttribute("data-mobile-nav-dragging")||document.body.hasAttribute("data-mobile-nav-dragging")?!0:e.target instanceof Element&&e.target.closest("[data-mobile-nav-dragging]")!==null}var mo=200;function zs(e){let t=e.closest(".dsh-pet-root");if(t!==null)return t;if(e.closest('[data-mobile-nav="frame"]')!==null)return null;let a=e;for(;a!==null;){if(a instanceof HTMLElement){let n=getComputedStyle(a);if((n.position==="fixed"||n.position==="absolute")&&a.offsetWidth<=mo&&a.offsetHeight<=mo)return a}a=a.parentElement}return null}function _o(e){return e.target instanceof Element&&zs(e.target)!==null}function fo(){J=null,Fe=!1,me=!1,ct=!1,Pe=Nt();let e=Ke();if(e===null||!He)return;J=e;let t=e.getBoundingClientRect().width*Ne/100;vo=Pe?t:-t}var _a=!1,je=0;function Ma(){if(!_a)return;_a=!1,J?.style.removeProperty("content-visibility");let e=Ke();e!==null&&e!==J&&e.style.removeProperty("content-visibility")}function Ds(e){if(me||ct)return;let t=Ke();if(t===null||It()||La()){ct=!0;return}J=t,Fe=!0,t.style.setProperty("transition","none","important");let a=yo(1e-4,Pe);t.style.setProperty("transform",a??`translateX(-${Ne}%)`,"important"),t.style.willChange="transform",t.style.setProperty("content-visibility","hidden","important"),_a=!0,me=!0,e.layout.toggleSidebar(),je=requestAnimationFrame(()=>{je=requestAnimationFrame(()=>{je=0,Ma()})})}function bo(e,t){if(!Ie||Oe!=="drawer")return;if(!He){let n=Pe?-t:t;if(!me&&(n<_s||(Ds(e),!me)))return;let o=yo(t,Pe);if(o===null){J?.style.setProperty("transform",`translateX(-${Ne}%)`,"important");return}J?.style.setProperty("transform",o,"important");return}if(J===null)return;let a=Ns(vo,t,Pe,He);if(a===null){Fe=!0,J.style.setProperty("transition","none","important"),J.style.setProperty("transform","translateX(0px)","important");return}Fe=!0,J.style.setProperty("transition","none","important"),J.style.setProperty("transform",`translateX(${a}px)`,"important")}function Ot(){let e=J;!Fe||e===null||(Fe=!1,e.style.removeProperty("transition"),e.style.removeProperty("transform"))}var Ue=null;function Rt(){let e=Ue;if(e===null)return;Ue=null,window.clearTimeout(e.timer),e.el.style.removeProperty("transition"),e.el.style.removeProperty("transform");let t=D();t!==null&&!t.hasAttribute("data-sidebar-collapsed")&&e.ctx.layout.toggleSidebar()}function So(e,t,a){let n=Ue;if(!(n!==null&&n.el===t&&n.target===a)){if(Rt(),window.matchMedia("(prefers-reduced-motion: reduce)").matches){wa(),xe=performance.now()+Re,Ue={el:t,ctx:e,timer:0,target:a},Rt();return}t.style.setProperty("transition",`transform ${po}ms ease-in-out`,"important"),t.style.getPropertyValue("transform")!==""&&t.getBoundingClientRect(),t.style.setProperty("transform",a,"important"),wa(),xe=performance.now()+Re,Ue={el:t,ctx:e,timer:window.setTimeout(Rt,po+40),target:a}}}function Pt(e){let t=J;if(J=null,Fe=!1,t===null){Ot(),e.layout.toggleSidebar(),xe=performance.now()+Re;return}let a=Pe?`translateX(${Ne}%)`:`translateX(-${Ne}%)`;So(e,t,a)}function Co(e){if(!Aa()||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return!1;let t=Ke();if(t===null)return!1;let a=Nt()?`translateX(${Ne}%)`:`translateX(-${Ne}%)`;return So(e,t,a),!0}function Me(e,t=!1){if(Ue!==null){t&&Rt();return}let a=me;if(me=!1,ct=!1,Ma(),a&&e!==null&&J!==null&&!t){Ge(),Pt(e);return}Ot(),Ge(),a&&e!==null&&(e.layout.toggleSidebar(),xe=performance.now()+Re)}function Bs(e,t,a){if(Eo()||It()||La()||ko()||To(e)||_o(e)||!(e.target instanceof Element)||Is(Fs(e.target))!==null||e.target.closest('[class*="_composerSeat"], [data-composer-card], [class*="_dock"]')!==null)return!1;let n=Aa(),o=lo(a,Ss);if(n){let i=D();if(i===null)return!1;let r=i.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom||e.target.closest('[class*="sessionRow"] button')!==null)return!1;let l=Ke(),u=l===null?null:l.getBoundingClientRect(),f=u!==null&&e.clientX>=u.left&&e.clientX<=u.right;Oe=Os(f,uo(e.clientX,a,t,o))}else if(Ps(e.clientX,a,t,{startZonePx:lo(a)}))Oe="drawer";else if(uo(e.clientX,a,t,o))Oe="files";else return!1;return we=e.pointerId,Ie=!1,dt=e.clientX,Sa=e.clientY,ve=[{t:e.timeStamp,x:e.clientX}],!0}function qs(e){let t=e.clientX-dt,a=e.clientY-Sa;return Math.max(Math.abs(t),Math.abs(a))<Ta?!1:To(e)||_o(e)||Math.abs(t)<=Math.abs(a)?(Ge(),!1):(Ie=!0,He=Aa(),Oe==="files"?(Ca=Hs(),He&&fo(),xa(),!0):(xa(),fo(),!0))}function go(e){ve.push({t:e.timeStamp,x:e.clientX});let t=e.timeStamp-wo,a=0;for(;a<ve.length-1&&ve[a].t<t;)a+=1;a>0&&(ve=ve.slice(a))}function Ws(e,t,a,n){let o=Ie,i=me;me=!1,ct=!1;let r=Oe==="files",l=Ca,u=Rs(ve,wo,t.timeStamp),f=t.clientX-dt,s=t.clientY-Sa;if(Ge(),!o){i&&Pt(e);return}let m=It()||!i&&Eo()?"none":r?Ms({distanceRatio:Cs,velocity:As,lockPx:Ta,viewportWidthPx:n,panelOpen:l,drawerOpen:He,drawerCloseDistanceRatio:co},{dx:f,dy:s,velX:u},a):Ls({openDistanceRatio:ys,closeDistanceRatio:co,openVelocity:ks,closeVelocity:Es,lockPx:Ta,viewportWidthPx:n,drawerOpen:He},{dx:f,dy:s,velX:u},a);if(Ma(),i){m==="open"?(Ot(),xe=performance.now()+Re):Pt(e),t.target instanceof Element&&st(t.target);return}if(t.target instanceof Element){if(m==="close"){st(t.target),Pt(e);return}Ot(),m==="open"&&(st(t.target),e.layout.toggleSidebar(),xe=performance.now()+Re),m==="files"&&(xo(),st(t.target),xe=performance.now()+Re),r&&m==="none"&&st(t.target)}}function st(e){let t=Ke(),a=t!==null&&t.contains(e)?t:D()??null;so(e,Ts,a),lt=e}function Ge(){we=0,Ie=!1,ve=[],Oe="drawer",Ca=!1,ya()}function Nt(){let e=D();return e!==null&&getComputedStyle(e).direction==="rtl"}function Ao(e,t){F(e,"dsh-web-mobile: sidebar swipe gestures",()=>{xo=t;let a=()=>window.innerWidth||document.documentElement.clientWidth||0,n=d=>{if(lt=null,ya(),!(d.pointerType!=="touch"&&d.pointerType!=="pen")){if(we!==0&&we!==d.pointerId){Me(e);return}Bs(d,Nt(),a())}},o=d=>{if(d.pointerId===we){if(It()||La()){Me(e);return}if(Ie)go(d),bo(e,d.clientX-dt);else{if(ko()){Ge();return}qs(d)&&(go(d),bo(e,d.clientX-dt))}}},i=d=>{d.pointerId===we&&Ws(e,d,Nt(),a())},r=d=>{d.pointerId===we&&Me(e)},l=d=>{if(lt===null||!(d.target instanceof Element))return;let m=d.target.closest('[data-mobile-nav="backdrop"], [data-mobile-nav="fab"]');m!==null&&!m.contains(lt)||rt(d)&&(d.stopPropagation(),d.preventDefault(),lt=null)},u=()=>{document.hidden&&Me(e)},f=d=>{if(we!==0){if(d.touches.length!==1||!d.cancelable||document.hidden){Me(e);return}Ie&&d.preventDefault()}};document.addEventListener("pointerdown",n,!0),document.addEventListener("pointermove",o,!0),document.addEventListener("pointerup",i,!0),document.addEventListener("pointercancel",r,!0),document.addEventListener("click",l,!0),document.addEventListener("touchmove",f,{capture:!0,passive:!1});let s=()=>Me(e);return document.addEventListener("visibilitychange",u),window.addEventListener("blur",s),()=>{document.removeEventListener("pointerdown",n,!0),document.removeEventListener("pointermove",o,!0),document.removeEventListener("pointerup",i,!0),document.removeEventListener("pointercancel",r,!0),document.removeEventListener("click",l,!0),document.removeEventListener("touchmove",f,{capture:!0}),document.removeEventListener("visibilitychange",u),window.removeEventListener("blur",s),je!==0&&(cancelAnimationFrame(je),je=0),Me(e,!0)}})}var Lo=12,$e=null,Vs='button[data-dsh-taskboard-entry], button[data-dsh-ssh-entry], [class*="newSession"], [class*="sessionRow"], [class*="searchResultRow"], [class*="searchResultWorkspace"], [class*="panelRow"]';function pt(e){Co(e)||e.layout.toggleSidebar()}function Mo(e){F(e,"dsh-web-mobile: drawer close (Escape + navigate)",()=>{let t=()=>{pt(e)},a=()=>{let x=D();return x!==null&&!x.hasAttribute("data-sidebar-collapsed")},n=x=>{x.key==="Escape"&&document.querySelector('[aria-modal="true"]')===null&&a()&&t()},o=()=>document.querySelector('[data-mobile-nav="frame"] > :first-child'),i=x=>{if(document.querySelector('[aria-modal="true"]')!==null||!a()||!(x instanceof Element))return!1;let R=o();return R===null||!R.contains(x)||x.closest('[class*="sessionRow"] button')!==null||x.closest('button[class*="panelRow"][aria-haspopup="menu"]')!==null?!1:x.closest(Vs)!==null},r=x=>!(x instanceof Element&&x.closest("[data-dsha-session-select]")!==null)&&i(x),l=0,u="",f=null,s=null,d=x=>{if(!x.isTrusted)return;let R=x.target;R instanceof Element&&R.closest('[class*="sessionRow"] [class*="_title"]')!==null&&(x.preventDefault(),x.stopPropagation())},m=()=>o()?.querySelector('[role="treeitem"][aria-selected="true"]')?.querySelector('[class*="_title"]')?.textContent?.trim()??null,T=()=>{f?.disconnect(),f=null,s!==null&&window.clearTimeout(s),s=null,u=""},c=()=>{T(),u=m()??"";let x=o();x!==null&&(f=new MutationObserver(()=>{if(!a()){T();return}let R=m();R!==null&&R!==u&&(T(),t())}),f.observe(x,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-selected"]}),s=window.setTimeout(T,2e3))},C=x=>e.sessions.list.getSnapshot().byId[x]!==void 0,S=(x,R)=>{if($e===null||!Ea($e,{x:R.clientX,y:R.clientY},Lo))return null;let O=Lt(Mt(x),C);return O===null||se(e.sessions.list.getSnapshot())===O?null:O},_=null,L=!1,g=0,h=()=>{L=!0,_?.(),_=null,g!==0&&(window.clearTimeout(g),g=0)},E=x=>{h(),L=!1;let R=()=>{L||(h(),a()&&t())};_=e.sessions.list.subscribe(()=>{se(e.sessions.list.getSnapshot())===x&&(g!==0&&window.clearTimeout(g),g=window.setTimeout(()=>{g=0,R()},0))})},v=0,p=x=>{v=performance.now(),$e=x.pointerType==="touch"||x.pointerType==="pen"?{x:x.clientX,y:x.clientY}:null},M=x=>{let R=x.target;if(ka()||rt(x))return;if(R instanceof Element&&R.closest('[data-mobile-nav="backdrop"]')!==null){a()&&t();return}let O=R instanceof Element?R.closest('[role="treeitem"][data-dsha-session-select]'):null;if(O!==null&&x.detail>0&&i(R)){if(x.defaultPrevented||$e!==null&&(performance.now()-v>=500||!Ea($e,{x:x.clientX,y:x.clientY},Lo)))return;x.preventDefault(),x.stopPropagation(),T(),h(),l=performance.now(),O.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,detail:0}));return}performance.now()-l<500||r(R)&&t()},b=x=>{if(ka()||rt(x)||x.pointerType!=="touch"&&x.pointerType!=="pen")return;let R=x.target;if(!(R instanceof Element)||!r(R))return;let O=R.closest('[role="treeitem"]');if(O!==null){if(l=performance.now(),O.getAttribute("aria-selected")==="true")t();else{let P=S(O,x);P===null?(h(),c()):(T(),Yn(e.sessions)?(E(P),e.sessions.open(P)):(h(),c()))}return}},k=()=>{a()&&t()};return document.addEventListener("dsha-session-open",k),document.addEventListener("dblclick",d,!0),document.addEventListener("keydown",n,!0),document.addEventListener("click",M,!0),document.addEventListener("pointerdown",p,!0),document.addEventListener("pointerup",b,!0),()=>{T(),h(),$e=null,document.removeEventListener("dsha-session-open",k),document.removeEventListener("dblclick",d,!0),document.removeEventListener("keydown",n,!0),document.removeEventListener("click",M,!0),document.removeEventListener("pointerdown",p,!0),document.removeEventListener("pointerup",b,!0)}})}var Ra=!1,Pa=!1,Ht=Fn({requestFrame:e=>{let t=0;return t=requestAnimationFrame(()=>{t=0,e()}),()=>{t!==0&&cancelAnimationFrame(t)}}});function Ro(e){return Ra?()=>{}:(Ra=!0,F(e,"dsh-web-mobile: DOM reconciler",()=>{let t=new MutationObserver(a=>{let n=new Set;for(let o of a)(o.target instanceof Element?o.target:o.target.parentElement)?.closest("[data-chat-flow]")||n.add(Hn(o));n.size>0&&Ht.note(n)});return t.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,characterData:!0,attributeFilter:["style","class","data-phase","data-sidebar-collapsed","data-aionui-explorer-open","data-aionui-preview-open","data-mobile-preview-full"]}),Ht.activate(),()=>{t.disconnect(),Ht.deactivate()}}),()=>{Ra=!1})}function ee(e){return Ht.register(e)}function Po(e,t){if(Pa)return()=>{};Pa=!0;let a=e.locale.bind(Q),n=[ee(Kn(a)),ee(qn()),ee(Wn()),ee(Gn()),ee($n(a,()=>pt(e),t)),ee(t.task),ee(Xn()),ee(eo(e)),ee(St(e)),ee(ro())];return()=>{for(let o of n)o();Pa=!1}}var Oo="data-mobile-nav-ios",Oa="width=device-width, initial-scale=1, viewport-fit=cover",No="--dsh-web-mobile-vh",Na=()=>document.querySelector('meta[name="viewport"]');function Io(){let e=null,t=null,a=!1,n=()=>{let l=Na();l!==null&&(e===null&&(e=l.content),!(a||l.content===Oa)&&(a=!0,l.content=Oa,a=!1))},o=new MutationObserver(n),i=()=>{let l=Na();l!==t&&(t!==null&&o.disconnect(),t=l,l!==null&&o.observe(l,{attributes:!0,attributeFilter:["content"]}))},r=new MutationObserver(()=>{i(),n()});return r.observe(document.head,{childList:!0}),i(),n(),()=>{o.disconnect(),r.disconnect();let l=Na();l!==null&&e!==null&&l.content===Oa&&(l.content=e)}}function Ho(){let e=document.documentElement,t=0,a=0,n="",o="",i=0,r=0,l=()=>{let u=window.innerHeight,f=window.innerWidth,s=window.visualViewport,m=`${Math.max(1,Math.min(u,s?.height??u))}px`,T=`${s?.offsetTop??0}px`;if(i=m===o?i+1:0,o=m,i>=2&&e.style.getPropertyValue("--dsha-mobile-visible-vh")!==m?e.style.setProperty("--dsha-mobile-visible-vh",m):i<2&&r===0&&(r=requestAnimationFrame(()=>{r=0,l()})),e.style.getPropertyValue("--dsha-mobile-viewport-top")!==T&&e.style.setProperty("--dsha-mobile-viewport-top",T),t===0||u>t||f!==a){t=u,a=f;let c=`${u}px`;c!==n&&(n=c,e.style.setProperty(No,c))}};return l(),window.addEventListener("resize",l),window.visualViewport?.addEventListener("resize",l),window.visualViewport?.addEventListener("scroll",l),()=>{window.removeEventListener("resize",l),window.visualViewport?.removeEventListener("resize",l),window.visualViewport?.removeEventListener("scroll",l),r!==0&&cancelAnimationFrame(r),r=0,e.style.removeProperty("--dsha-mobile-visible-vh"),e.style.removeProperty("--dsha-mobile-viewport-top"),n="",e.style.removeProperty(No)}}function Fo(e){if(!e)return;let t=document.documentElement;return t.setAttribute(Oo,""),()=>{t.removeAttribute(Oo)}}var js='[data-dsh-responsive-part="sidebar-toggle"]:not([data-mobile-nav])',zo='[data-mobile-nav="dismiss-shadow"]';function Us(){if(typeof document>"u")return;let e=document.querySelector(zo),t=document.querySelector(js),a=t?.closest('[data-pane="sidebar"]')??null;if(t===null||a===null){e?.remove();return}if(e!==null&&e.parentElement===a&&a.firstElementChild===e)return;let n=e??document.createElement("span");e===null&&(n.setAttribute("data-mobile-nav","dismiss-shadow"),n.setAttribute("data-dsh-responsive-part","sidebar-toggle"),n.setAttribute("aria-hidden","true"),n.style.setProperty("display","none","important")),a.insertBefore(n,a.firstElementChild)}function Do(){if(Ia)return()=>{};Ia=!0;let e=null,t=ee({name:"frame-marker",scopes:["*"],ensure:()=>{e=ua(),e!==null&&!e.hasAttribute("data-mobile-nav")&&e.setAttribute("data-mobile-nav","frame"),Us()},dispose:()=>{e!==null&&(e.removeAttribute("data-mobile-nav"),e.removeAttribute("data-mobile-preview-full"),e.removeAttribute("data-aionui-explorer-open"),e.removeAttribute("data-aionui-preview-open")),typeof document<"u"&&document.querySelector(zo)?.remove(),e=null}}),a=ee(In());return()=>{a(),t(),Ia=!1}}var Ia=!1;function Bo(e){F(e,"dsh-web-mobile: status bar theme + viewport + zoom guard",()=>{let t=document.createElement("meta");t.name="theme-color";let a=()=>getComputedStyle(document.body).backgroundColor,n=typeof CSS<"u"&&typeof CSS.supports=="function"?u=>CSS.supports(u):null;t.content=a(),t.parentElement===null&&document.head.appendChild(t);let o=new MutationObserver(()=>{t.content=a()});o.observe(document.body,{attributes:!0,attributeFilter:["data-ds-dark-theme"]});let i=Io(),r=Fo(qe(navigator,n)),l=Ho();return()=>{l(),o.disconnect(),i(),t.remove(),r?.()}})}var Ft="data-mobile-nav-selecting";function Gs(){let e=window.getSelection();if(e===null||e.isCollapsed)return!1;let t=e.anchorNode;if(t===null)return!1;let a=t instanceof HTMLElement?t:t.parentElement;return a===null||a.closest("[data-composer-card]")!==null?!1:a.closest("[data-phase]")!==null}function qo(e){F(e,"dsh-web-mobile: selection chrome yield",()=>{if(typeof document>"u")return;let t=document.documentElement,a=()=>{let n=Gs();n!==t.hasAttribute(Ft)&&(n?t.setAttribute(Ft,""):t.removeAttribute(Ft))};return document.addEventListener("selectionchange",a),a(),()=>{document.removeEventListener("selectionchange",a),t.removeAttribute(Ft)}})}var Wo='[data-mobile-nav="frame"] button[class*="_trigger"][aria-haspopup="tree"][aria-expanded]:not([class*="_switcherTrigger"])',Ks='[class*="ZKlsPq_root"], [class*="ZKlsPq_menu"], [class*="h8S2Va_root"], [class*="h8S2Va_menu"]',$s=800,Xs=1e3,Vo=["mouseover","mouseout","mouseenter","mouseleave"];function jo(e){F(e,"dsh-web-mobile: lineage chip touch toggle",()=>{if(typeof PointerEvent>"u")return;let t=0,a=()=>{t=Date.now()+$s},n=null,o=0,i=f=>{if(f.pointerType!=="touch"&&f.pointerType!=="pen")return;a();let s=f.target;if(!(s instanceof Element))return;let d=s.closest(Wo);if(d===null)return;let m=d.getAttribute("aria-expanded")==="true";d.dispatchEvent(new KeyboardEvent("keydown",{key:m?"Escape":"ArrowDown",bubbles:!0,cancelable:!0})),n=d,o=Date.now()+Xs},r=f=>{if(n===null)return;if(Date.now()>=o){n=null;return}let s=f.target;s instanceof Element&&s.closest(Wo)===n&&(n=null,f.stopPropagation())},l=f=>{f.pointerType!=="touch"&&f.pointerType!=="pen"||a()},u=f=>{if(Date.now()>=t||!f.isTrusted)return;let s=f.target;s instanceof Element&&s.closest(Ks)!==null&&f.stopImmediatePropagation()};document.addEventListener("pointerdown",l,!0),document.addEventListener("pointerup",i,!0),document.addEventListener("click",r,!0);for(let f of Vo)document.addEventListener(f,u,!0);return()=>{document.removeEventListener("pointerdown",l,!0),document.removeEventListener("pointerup",i,!0),document.removeEventListener("click",r,!0);for(let f of Vo)document.removeEventListener(f,u,!0)}})}var Zs="workspace",Ys='data-mobile-nav="session-delete"',Ha="var(--dsw-alias-state-error-primary, #b91c1c)",Qs='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.4782 4.84067L14.2138 10.1152C14.1102 12.1872 14.067 13.0115 13.3866 13.9607C13.1044 14.3546 12.7498 14.6912 12.3424 14.9535C11.8239 15.2872 11.2415 15.4316 10.5585 15.4998C9.88727 15.5668 9.04946 15.5656 7.99998 15.5656C6.95051 15.5656 6.1127 15.5668 5.44142 15.4998C4.75851 15.4316 4.17602 15.2872 3.65753 14.9535C3.25012 14.6912 2.89559 14.3546 2.61332 13.9607C1.93296 13.0115 1.88979 12.1872 1.78619 10.1152L1.52179 4.84067L2.89006 4.77277L3.15343 10.0463C3.26221 12.2218 3.32452 12.6015 3.72646 13.1624C3.90825 13.4161 4.13686 13.6334 4.39927 13.8023C4.66204 13.9714 5.00263 14.0792 5.57825 14.1367C6.16562 14.1953 6.92298 14.1963 7.99998 14.1963C9.07699 14.1963 9.83434 14.1953 10.4217 14.1367C10.9973 14.0792 11.3379 14.1367 11.6007 13.8023C11.8631 13.6334 12.0917 13.4161 12.2735 13.1624C12.6755 12.6015 12.7378 12.2218 12.8465 10.0463L13.1099 4.77277L14.4782 4.84067ZM5.43011 6.22849H6.7994V11.3909H5.43011V6.22849ZM9.20056 6.22849H10.5699V11.3909H9.20056V6.22849ZM8.53597 0.434431C9.17976 0.434431 9.6522 0.426926 10.0966 0.571258C10.2357 0.616451 10.3717 0.672554 10.502 0.738948C10.9182 0.951107 11.2464 1.29099 11.7015 1.74612L12.4978 2.54136H15.3742V3.91169H0.625732V2.54136H3.50218L4.29845 1.74612C4.75358 1.29099 5.08174 0.951107 5.49801 0.738948C5.62831 0.672554 5.76425 0.616451 5.90334 0.571258C6.34776 0.426926 6.82021 0.434431 7.46399 0.434431H8.53597ZM7.46399 1.80476C6.73208 1.80476 6.51641 1.81187 6.32617 1.87369C6.25545 1.89667 6.18668 1.92533 6.12041 1.95907C5.96398 2.03878 5.82348 2.16253 5.44142 2.54136H10.5585C10.1765 2.16253 10.036 2.03878 9.87955 1.95907C9.81329 1.92533 9.74452 1.89667 9.6738 1.87369C9.48356 1.81187 9.26789 1.80476 8.53597 1.80476H7.46399Z" fill="currentColor" /></svg>';function ze(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Uo(e){F(e,"dsh-web-mobile: session-menu delete",()=>{let t=e.locale.bind(Q),a=(b,k)=>e.locale.bind(Zs)(b,k),n=null,o=0,i=null,r=null,l=0,u=b=>{let k=b.getAttribute("data-row-key")??"";if(k.startsWith("session:")){let R=k.slice(8);if(R!=="")return R}let x=b.getAttribute("data-dsha-session-select");return x!==null&&x!==""?x:Lt(Mt(b),L)},f=b=>(b.querySelector('[class*="_itemLabel"]')??b).textContent?.trim()??"",s=b=>{let k=[...b.querySelectorAll('[role="menuitem"]')].map(f),x=a("rename"),R=a("menu.fork");return k.includes(x)&&k.includes(R)&&k.includes(a("menu.archiveSession"))},d=()=>{r!==null&&(document.removeEventListener("keydown",r,!0),r=null),i!==null&&(i.backdrop.remove(),i.card.remove(),i=null)},m=(b,k)=>{d();let x=document.body,R=document.createElement("div");R.dataset.mobileNav="delete-dialog-backdrop";let O=document.createElement("div");O.dataset.mobileNav="delete-dialog",O.setAttribute("role","dialog"),O.setAttribute("aria-modal","true"),O.innerHTML=`
        <div data-mobile-nav="delete-confirm-title">${ze(t("deleteConfirmTitle"))}</div>
        <div data-mobile-nav="delete-confirm-desc">${ze(t("deleteConfirmDesc",{title:k}))}</div>
        <div data-mobile-nav="delete-confirm-actions">
          <button type="button" data-mobile-nav="delete-confirm-no">${ze(t("deleteConfirmNo"))}</button>
          <button type="button" data-mobile-nav="delete-confirm-yes">${ze(t("deleteConfirmYes"))}</button>
        </div>
        <div data-mobile-nav="delete-error" role="alert" hidden></div>`;let P=O.querySelector('[data-mobile-nav="delete-confirm-no"]'),z=O.querySelector('[data-mobile-nav="delete-confirm-yes"]'),q=O.querySelector('[data-mobile-nav="delete-error"]');P?.addEventListener("click",d),R.addEventListener("click",I=>{I.target===R&&d()});let U=I=>{I.key==="Escape"&&d()};document.addEventListener("keydown",U,!0),r=U;let K=()=>{z!==null&&(z.disabled=!1,z.textContent=t("deleteConfirmYes")),P!==null&&(P.disabled=!1)},Z=I=>{q!==null&&(q.textContent=I,q.hidden=!1),K()},te=(I,H)=>{let B=I?.error?.code;if(B==="session-not-found")return t("deleteErrorNotFound");if(B==="session-busy")return t("deleteErrorBusy");let $=I?.error?.message??(H instanceof Error?H.message:String(H));return t("deleteErrorGeneric",{message:$})};z?.addEventListener("click",async()=>{z.disabled=!0,P!==null&&(P.disabled=!0),z.textContent=t("deletePending"),q!==null&&(q.hidden=!0);let I=++l;try{let de=await fetch("/api/mobile-nav.session.delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionId:b})}),le=await de.json().catch(()=>null);if(!de.ok||le===null||le.ok!==!0){Z(te(le,new Error(`HTTP ${de.status}`)));return}}catch(de){let le=!1;try{le=await Qn({listed:()=>e.sessions.list.getSnapshot()?.byId?.[b]!==void 0,refresh:async()=>{await e.sessions.refresh?.()},sleep:ea=>new Promise(ta=>{window.setTimeout(()=>{ta()},ea)})})}catch{le=!1}if(!le){Z(te(null,de));return}}let H=se(e.sessions.list.getSnapshot())===b;if(I!==l)return;d(),H&&Zn(e.sessions)&&e.sessions.clear();let B=e.sessions;try{await B.refresh?.()}catch(de){console.warn("[dsh-web-mobile] session list refresh after delete failed:",de)}let $=D();$===null||$.hasAttribute("data-sidebar-collapsed")||H&&window.matchMedia(Le).matches&&pt(e)}),x.appendChild(R),R.appendChild(O),i={backdrop:R,card:O}},T=b=>{d();let k=document.body,x=document.createElement("div");x.dataset.mobileNav="delete-dialog-backdrop";let R=document.createElement("div");R.dataset.mobileNav="delete-dialog",R.setAttribute("role","dialog"),R.setAttribute("aria-modal","true"),R.innerHTML=`
        <div data-mobile-nav="delete-confirm-title">${ze(t("deleteSession"))}</div>
        <div data-mobile-nav="delete-error" role="alert">${ze(b)}</div>
        <div data-mobile-nav="delete-confirm-actions">
          <button type="button" data-mobile-nav="delete-confirm-no">${ze(t("deleteConfirmNo"))}</button>
        </div>`,R.querySelector('[data-mobile-nav="delete-confirm-no"]')?.addEventListener("click",d),x.addEventListener("click",P=>{P.target===x&&d()});let O=P=>{P.key==="Escape"&&d()};document.addEventListener("keydown",O,!0),r=O,k.appendChild(x),x.appendChild(R),i={backdrop:x,card:R}},c=new Set,C=b=>{if(b.querySelector(`[${Ys}]`)!==null)return;let k=b.querySelector('[role="menuitem"]'),x=k?.parentElement??null,R=b.querySelector('[class*="_viewport"]');if(k===null||x===null||R===null)return;let O=x.cloneNode(!0),P=O.querySelector('[role="menuitem"]');if(P===null)return;let z=P.querySelector('[class*="_itemIcon"]');z!==null&&(z.innerHTML=Qs,z.style.color=Ha);let q=P.querySelector('[class*="_itemLabel"]');q!==null?(q.textContent=t("deleteSession"),q.style.color=Ha):P.firstElementChild===null&&(P.textContent=t("deleteSession"),P.style.color=Ha),P.setAttribute("data-mobile-nav","session-delete"),P.addEventListener("click",U=>{U.preventDefault(),U.stopPropagation();let K=n;K?.button.click();try{if(K===null){T(t("deleteErrorResolve"));return}let Z=K.sessionId;if(Z===null){T(t("deleteErrorResolve"));return}m(Z,K.title)}catch(Z){console.error("[dsh-web-mobile] session delete failed:",Z),T(t("deleteErrorGeneric",{message:Z instanceof Error?Z.message:String(Z)}))}}),R.appendChild(O),c.add(O)},S=()=>{for(let k of c)k.isConnected||c.delete(k);let b=a("session.new");for(let k of document.querySelectorAll('[role="menu"]'))s(k)&&(n!==null&&n.title===b||C(k))},_=()=>{o===0&&(o=requestAnimationFrame(()=>{o=0,S()}))},L=b=>e.sessions.list.getSnapshot().byId[b]!==void 0,g=b=>{let k=[...b.querySelectorAll("button")],x=k.find(O=>{let P=O.getAttribute("aria-label")??"";return/session actions/i.test(P)});return x!==void 0?x:k.find(O=>{let P=O.getAttribute("aria-label")??"";return!/archive session|pin session/i.test(P)})??null},h=b=>{if(!(b instanceof Element))return;let k=b.closest('[class*="_sessionRow"]');if(k===null)return;let x=g(k);if(x===null)return;let R=k.querySelector('[class*="_title"]')?.textContent?.trim()??"",O=u(k);n={button:x,title:R,sessionId:O},_()},E=b=>h(b.target),v=b=>h(b.target);document.addEventListener("click",E,!0),document.addEventListener("contextmenu",v,!0);let p=b=>{if(n===null)return!1;for(let k of b.removedNodes)if(k instanceof Element&&(k.matches('[role="menu"]')||k.querySelector('[role="menu"]')!==null))return!0;return!1},M=new MutationObserver(b=>{let k=b.length===0;for(let R of b)if((R.target instanceof Element?R.target:R.target.parentElement)?.closest("[data-chat-flow]")==null){k=!0;break}if(!k)return;let x=!1;for(let R of b){if(R.type!=="childList")continue;let O=R.target;if(O===document.body){_();break}if(x||(x=p(R)),O instanceof HTMLElement&&(O.matches('[role="menu"]')||O.closest('[role="menu"]')!==null)){_();break}}x&&n!==null&&![...document.querySelectorAll('[role="menu"]')].some(s)&&(n=null)});return M.observe(document.body,{childList:!0,subtree:!0}),S(),()=>{document.removeEventListener("click",E,!0),document.removeEventListener("contextmenu",v,!0),M.disconnect(),o!==0&&cancelAnimationFrame(o),d();for(let b of c)b.remove();c.clear(),n=null}},Tt)}var Js="[data-composer-card]",Fa="[data-composer-input]",el='button, [role="button"], [role="option"], [role="menuitem"], [role="combobox"], [aria-haspopup], select, a[href], label, input',ye="data-mobile-nav-focus-shadow";function Go(e){F(e,"dsh-web-mobile: composer keyboard guard",()=>{let t=qe(navigator,typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports.bind(CSS):null),a=typeof matchMedia=="function"&&matchMedia("(pointer: coarse)").matches;if(!t&&!a)return;let n=0,o=()=>{window.clearTimeout(n),n=0;let l=document.querySelector(`[${ye}]`);if(l===null)return;l.removeAttribute(ye);let u=l;Object.prototype.hasOwnProperty.call(l,"focus")&&delete u.focus},i=l=>{let u=l.target;if(!(u instanceof Element)||typeof u.closest!="function")return;let f=u.closest(Js);if(f===null)return;let s=f.querySelector(Fa);if(s===null)return;if(u.closest(Fa)!==null){o();return}let d=u.closest(el);if(d===null||!f.contains(d)){o();return}o(),s.setAttribute(ye,""),Object.defineProperty(s,"focus",{configurable:!0,writable:!0,value:function(){}}),window.clearTimeout(n),n=window.setTimeout(o,700)},r=l=>{if(n===0)return;let u=l.target;u instanceof HTMLElement&&u.closest(Fa)!==null&&u.blur()};return document.addEventListener("pointerdown",i,!0),document.addEventListener("touchstart",i,!0),document.addEventListener("mousedown",i,!0),document.addEventListener("focusin",r,!0),()=>{document.removeEventListener("pointerdown",i,!0),document.removeEventListener("touchstart",i,!0),document.removeEventListener("mousedown",i,!0),document.removeEventListener("focusin",r,!0),o()}})}var tl=24;function al(e){let{seatBottom:t,viewportHeight:a,scale:n,scrollY:o,offsetTop:i}=e;if(!Number.isFinite(t)||!Number.isFinite(a)||!Number.isFinite(n)||Math.abs(n-1)>.01||!Number.isFinite(o)||!Number.isFinite(i)||Math.abs(o-i)>tl)return 0;let r=t-a;return r>0?r:0}var Ko='[data-mobile-nav="frame"] [class*="_composerSeat"]',$o="[data-composer-input]";function Xo(e){F(e,"dsh-web-mobile: composer keyboard lift",()=>{if(!qe(navigator,typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports.bind(CSS):null))return;let t=window.visualViewport;if(!t)return;let a=null,n=0,o=0,i=()=>{if(o=0,a===null||!a.isConnected)return;let s=al({seatBottom:a.getBoundingClientRect().bottom+n,viewportHeight:t.height,scale:t.scale,scrollY:window.scrollY,offsetTop:t.offsetTop});n=s,a.style.transform=s>0?`translateY(${-s}px)`:""},r=()=>{o===0&&(o=requestAnimationFrame(i))},l=()=>{t.removeEventListener("resize",r),t.removeEventListener("scroll",r),window.removeEventListener("scroll",r),o!==0&&(cancelAnimationFrame(o),o=0),a!==null&&(a.style.transform=""),a=null,n=0},u=s=>{let d=s.target;if(!(d instanceof Element)||d.closest($o)===null)return;l();let m=document.querySelector(Ko);m!==null&&(a=m,t.addEventListener("resize",r),t.addEventListener("scroll",r),window.addEventListener("scroll",r,{passive:!0}),r())},f=s=>{let d=s.target;if(!(d instanceof Element)||d.closest($o)===null)return;let m=s.relatedTarget;m instanceof Element&&m.closest(Ko)!==null||l()};return document.addEventListener("focusin",u,!0),document.addEventListener("focusout",f,!0),()=>{document.removeEventListener("focusin",u,!0),document.removeEventListener("focusout",f,!0),l()}})}function Zo(e){let{visibleHeight:t,headerBottom:a,seatHeight:n,seatBottom:o,scrollY:i,offsetTop:r}=e;for(let d of[t,a,n,o,i,r])if(!Number.isFinite(d))return 0;if(Math.abs(i-r)>24)return 0;let l=Math.max(0,t),u=Math.max(0,l-Math.max(0,n)),f=Math.max(0,a-u),s=Math.max(0,o-l);return f+s}function Yo(e,t){return Number.isFinite(t)?e?t>0:t>=1:!1}var ht="data-mobile-nav-composer-tight",nl='[class*="_composerSeat"]',ol='header:has([class*="_headerLeading"])';function Qo(e){F(e,"dsh-web-mobile: composer clearance",()=>{let t=!1,a=0,n=0,o=()=>{t=!1,a=0,D()?.removeAttribute(ht)},i=()=>{n=0;let l=D();if(l===null){o();return}let u=l.querySelector(nl),f=l.querySelector(ol),s=u?.getBoundingClientRect()??null;if(u===null||f===null||s===null||s.width===0||s.height===0){o();return}t||(a=s.height);let d=window.visualViewport,m=Zo({visibleHeight:Math.min(window.innerHeight,d?.height??window.innerHeight),headerBottom:f.getBoundingClientRect().bottom,seatHeight:a>0?a:s.height,seatBottom:s.bottom,scrollY:window.scrollY,offsetTop:d?.offsetTop??0});t=Yo(t,m),t?l.hasAttribute(ht)||l.setAttribute(ht,""):l.hasAttribute(ht)&&l.removeAttribute(ht)},r=()=>{n===0&&(n=requestAnimationFrame(i))};return window.addEventListener("resize",r),window.addEventListener("orientationchange",r),window.visualViewport?.addEventListener("resize",r),window.visualViewport?.addEventListener("scroll",r),document.addEventListener("focusin",r,!0),document.addEventListener("focusout",r,!0),r(),()=>{window.removeEventListener("resize",r),window.removeEventListener("orientationchange",r),window.visualViewport?.removeEventListener("resize",r),window.visualViewport?.removeEventListener("scroll",r),document.removeEventListener("focusin",r,!0),document.removeEventListener("focusout",r,!0),n!==0&&(cancelAnimationFrame(n),n=0),o()}})}function Jo(e){F(e,"dsh-web-mobile: document scroll lock",()=>{let t=window.scrollBy.bind(window),a=window.scrollTo.bind(window),n=()=>{(window.scrollX!==0||window.scrollY!==0)&&a(0,0)},o=((...l)=>{n()}),i=((...l)=>{n()}),r=()=>{(window.scrollX!==0||window.scrollY!==0)&&a(0,0)};return window.scrollBy=o,window.scrollTo=i,window.addEventListener("scroll",r,{passive:!0}),document.addEventListener("scroll",r,!0),r(),()=>{window.scrollBy=t,window.scrollTo=a,window.removeEventListener("scroll",r),document.removeEventListener("scroll",r,!0)}})}var ei={reservePx:0,bandPx:0};function ti(e){let{visibleHeight:t,headerHeight:a,frameBottom:n,seatBottom:o,framePadding:i}=e;for(let s of[t,a,n,o,i])if(!Number.isFinite(s))return ei;if(t<=0||a<0)return ei;let r=Math.max(0,t-o),l=Math.max(0,o-n),u=r+l+Math.max(0,i),f=Math.max(0,t-a-u);return{reservePx:u,bandPx:f}}function ai(e){return!Number.isFinite(e)||e<=0?0:Math.min(e*.6,520)}function ni(e,t,a,n){return!t||!Number.isFinite(a)||a<=0?!1:e||!Number.isFinite(n)||n<=0?!0:a>n}function oi(e){let{fieldTop:t,fieldBottom:a,bodyTop:n,bodyBottom:o,scrollTop:i,scrollHeight:r,clientHeight:l,visibleTop:u,visibleBottom:f}=e;for(let S of[t,a,n,o,i,r,l])if(!Number.isFinite(S))return i;let s=u===void 0||!Number.isFinite(u)?n:Math.max(n,u),d=f===void 0||!Number.isFinite(f)?o:Math.min(o,f);if(d-s<1)return i;let m=Math.max(0,r-l),T=Math.max(0,d-s),c=Math.min(8,T/2),C=i;return t<s+c?C=i-(s+c-t):a>d-c&&(C=i+(a-(d-c))),Math.min(Math.max(C,0),m)}var ut="data-mobile-nav-question-full",za="--dsha-mobile-question-reserve",il="question-expand",rl='[class*="_frame"][style*="--dsh-composer-side-clearance"], [class*="_frame"]',sl='[class*="_headerActions"]',ii='[class*="_body"]',ll='[class*="_fieldInput"]',dl='[class*="_composerSeat"]',cl="--dsha-mobile-visible-vh",pl="--mobile-nav-header-h",hl=['<svg class="dsh-web-mobile-question-expand" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>",'<svg class="dsh-web-mobile-question-collapse" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M2 6h4V2M14 6h-4V2M2 10h4v4M14 10h-4v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>"].join(""),ri=e=>{let t=document.documentElement.style.getPropertyValue(e).trim(),a=Number.parseFloat(t);return Number.isFinite(a)?a:Number.NaN};function si(e){let t=e.locale.bind(Q);F(e,"dsh-web-mobile: question fullscreen",()=>{let a=!1,n=!1,o=null,i=null,r="",l=0,u=()=>{let g=D();return g===null?null:g.querySelector(rl)},f=()=>t(n?"questionCollapse":"questionExpand"),s=()=>{if(o===null)return;let g=f();o.getAttribute("aria-label")!==g&&(o.setAttribute("aria-label",g),o.title=g);let h=n?"true":"false";o.getAttribute("aria-expanded")!==h&&o.setAttribute("aria-expanded",h)},d=()=>{a=!1,n=!1,l!==0&&(cancelAnimationFrame(l),l=0);let g=D();g!==null&&g.hasAttribute(ut)&&g.removeAttribute(ut),i?.style.removeProperty(za),i=null,r="",s()},m=()=>{let g=document.activeElement;if(!(g instanceof HTMLElement)||!g.matches(ll))return;let h=g.closest(ii);if(h===null)return;let v=g.getBoundingClientRect(),p=h.getBoundingClientRect(),M=window.visualViewport,b=M?.offsetTop??Number.NaN,k=M==null?Number.NaN:M.offsetTop+M.height,x=oi({fieldTop:v.top,fieldBottom:v.bottom,bodyTop:p.top,bodyBottom:p.bottom,scrollTop:h.scrollTop,scrollHeight:h.scrollHeight,clientHeight:h.clientHeight,visibleTop:b,visibleBottom:k});Math.abs(x-h.scrollTop)>=1&&(h.scrollTop=x)},T=()=>{l=0;let g=D(),h=u();if(g===null||h===null){d();return}let E=g.querySelector(dl),v=h.getBoundingClientRect(),p=E?.getBoundingClientRect()??null,M=getComputedStyle(h),b=ri(cl),k=ti({visibleHeight:b,headerHeight:ri(pl),frameBottom:v.bottom,seatBottom:p===null?Number.NaN:p.bottom,framePadding:Number.parseFloat(M.paddingTop)+Number.parseFloat(M.paddingBottom)}),x=ni(n,a,k.bandPx,ai(b)),R=`${Math.round(k.reservePx)}px`;i!==h&&(i?.style.removeProperty(za),i=h,r=""),r!==R&&(r=R,h.style.setProperty(za,R)),x!==g.hasAttribute(ut)&&(x?g.setAttribute(ut,""):g.removeAttribute(ut)),n=x,s(),n||(a=!1)},c=()=>{l===0&&(l=requestAnimationFrame(()=>{l=0,m(),a&&T()}))},C=()=>{a=!n,l!==0&&(cancelAnimationFrame(l),l=0),T(),n||(a=!1)},S=g=>{let h=g.querySelector(sl);if(h!==null){if(o===null){let E=document.createElement("button");E.type="button",E.dataset.mobileNav=il,E.innerHTML=hl,E.addEventListener("click",C),o=E}o.parentElement!==h&&h.insertBefore(o,h.lastElementChild),s()}},L=ee({name:"question-fullscreen",scopes:["*"],ensure:()=>{let g=u();if(g===null){d();return}if(g.querySelector(ii)===null){o?.remove(),d();return}S(g),a&&c()},dispose:()=>{d(),o!==null&&(o.removeEventListener("click",C),o.remove(),o=null)}});return window.addEventListener("resize",c),window.addEventListener("orientationchange",c),window.visualViewport?.addEventListener("resize",c),document.addEventListener("focusin",c,!0),document.addEventListener("focusout",c,!0),c(),()=>{window.removeEventListener("resize",c),window.removeEventListener("orientationchange",c),window.visualViewport?.removeEventListener("resize",c),document.removeEventListener("focusin",c,!0),document.removeEventListener("focusout",c,!0),L()}})}var Da='[class*="_add"]',ul="[data-trigger-menu]",di="[data-composer-input]",ml=e=>{let t=e.getBoundingClientRect();return t.width>0&&t.height>0&&e.getClientRects().length>0},Ba=()=>{for(let e of document.querySelectorAll(ul))if(ml(e))return e;return null},ci=()=>{let e=document.querySelector(di);return e instanceof HTMLElement?e:null},li=()=>{let e=ci();e!==null&&document.activeElement===e&&e.blur()},fl=()=>{let e=ci();e!==null&&e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",keyCode:27,which:27,bubbles:!0,cancelable:!0}))};function pi(e){F(e,"dsh-web-mobile: composer plus toggle",()=>{let t=!1,a=[],n=()=>{for(let u of a)window.clearTimeout(u);a=[]},o=u=>{let f=u.target;t=f instanceof Element&&f.closest(Da)!==null&&Ba()!==null},i=u=>{let f=u.target;f instanceof Element&&f.closest(Da)!==null&&li()},r=u=>{let f=t;t=!1;let s=u.target;if(!(!(s instanceof Element)||s.closest(Da)===null)){f&&Ba()!==null&&fl(),n();for(let d of[120,320,640])a.push(window.setTimeout(()=>{Ba()!==null&&li()},d))}},l=u=>{let f=u.target;f instanceof Element&&f.closest(di)!==null&&n()};return document.addEventListener("pointerdown",i,!0),document.addEventListener("pointerdown",l,!0),document.addEventListener("click",o,!0),document.addEventListener("click",r,!1),()=>{n(),document.removeEventListener("pointerdown",i,!0),document.removeEventListener("pointerdown",l,!0),document.removeEventListener("click",o,!0),document.removeEventListener("click",r,!1)}})}var bl='[class*="heroWorkspaceRow"] > button[aria-haspopup="menu"]',gl='[role="menu"]';function hi(e){F(e,"dsh-web-mobile: workspace chip toggle",()=>{let t=null,a=i=>i instanceof Element?i.closest(bl):null,n=i=>{t=null;let r=a(i.target);r!==null&&r.getAttribute("aria-expanded")==="true"&&document.querySelector(gl)!==null&&(t=r)},o=i=>{let r=t;t=null,!(r===null||a(i.target)!==r)&&i.stopPropagation()};return document.addEventListener("pointerdown",n,!0),document.addEventListener("click",o,!0),()=>{t=null,document.removeEventListener("pointerdown",n,!0),document.removeEventListener("click",o,!0)}})}var wl="[data-team-action]",vl='[data-team-action] > button[aria-haspopup="dialog"]',xl="[data-team-panel]";function ui(e){F(e,"dsh-web-mobile: team chip toggle",()=>{let t=null,a=i=>i instanceof Element?i.closest(vl):null,n=i=>{t=null;let r=a(i.target);r!==null&&r.getAttribute("aria-expanded")==="true"&&document.querySelector(wl)!==null&&document.querySelector(xl)!==null&&(t=r)},o=i=>{let r=t;t=null,!(r===null||a(i.target)!==r)&&(document.body.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0})),i.stopPropagation())};return document.addEventListener("pointerdown",n,!0),document.addEventListener("click",o,!0),()=>{t=null,document.removeEventListener("pointerdown",n,!0),document.removeEventListener("click",o,!0)}},Tt)}var mi='[class*="_7KE1Ra_trigger"]',fi='[class*="_7KE1Ra_menu"]',yl="[data-composer-card]",zt=8,bi=[0,60,200];function gi(e){F(e,"dsh-web-mobile: model menu anchor",()=>{let t=0,a=null,n=null,o=[],i=null,r=null,l=null,u=null,f=()=>{let p=u;u=null,p!==null&&p.el.style.left===p.value&&(p.el.style.left=p.original)},s=p=>{if(p===null)return null;let M=n?.get(p);if(M!==void 0)return M;let b=p.getBoundingClientRect(),k=b.width>0&&b.height>0?b:null;return n?.set(p,k),k},d=()=>{for(let p of document.querySelectorAll(fi))if(s(p)!==null)return p;return null},m=p=>{let M=s(p);if(M===null)return;let b=M.width,k=document.documentElement.clientWidth,x=Math.max(zt,k-b-zt),R=s(r),O=s(l),P=R===null?null:R.right-b,z;if(P!==null&&P>=zt&&P<=x)z=P;else if(O!==null)z=O.left+(O.width-b)/2;else return;let q=`${Math.round(Math.min(Math.max(z,zt),x))}px`;u!==null&&u.el!==p&&f(),u===null?u={el:p,value:q,original:p.style.left}:u.value=q,p.style.left!==q&&(p.style.left=q)},T=()=>{i=d(),r=i===null?null:document.querySelector(mi),l=i===null?null:document.querySelector(yl),i!==null&&m(i)},c=()=>{if(i!==null){if(s(i)===null){f(),i=null,r=null,l=null;return}m(i)}},C=p=>{a=p,t===0&&(t=window.requestAnimationFrame(()=>{t=0;let M=a;a=null,n=new Map;try{M!==null&&M()}finally{n=null}}))},S=()=>{C(T);for(let p of bi)o.push(window.setTimeout(()=>C(T),p));for(;o.length>bi.length*2;){let p=o.shift();p!==void 0&&window.clearTimeout(p)}},_=p=>{let M=p.target;return M instanceof Element?M.closest(mi)!==null||M.closest(fi)!==null:!1},L=p=>{_(p)&&S()},g=p=>{_(p)&&S()},h=p=>{_(p)&&S()},E=p=>{_(p)&&S()},v=()=>{C(c)};return document.addEventListener("pointerdown",L,!0),document.addEventListener("keydown",g,!0),document.addEventListener("focusin",h,!0),document.addEventListener("click",E,!0),window.addEventListener("resize",v),document.addEventListener("scroll",v,!0),()=>{document.removeEventListener("pointerdown",L,!0),document.removeEventListener("keydown",g,!0),document.removeEventListener("focusin",h,!0),document.removeEventListener("click",E,!0),window.removeEventListener("resize",v),document.removeEventListener("scroll",v,!0),t!==0&&window.cancelAnimationFrame(t),a=null,n=null;for(let p of o)window.clearTimeout(p);o.length=0,f(),i=null,r=null,l=null}})}var Dt=new Set,Bt=null;function qt(e){if(Bt===null){let a=HTMLInputElement.prototype,n=Object.getOwnPropertyDescriptor(a,"focus"),o=a.focus;if(typeof o!="function"||n?.configurable===!1||!n&&!Object.isExtensible(a))return()=>{};let i=function(l){for(let u of Dt)if(u.shouldSkip(this))return;o.call(this,l)};try{Object.defineProperty(a,"focus",{configurable:!0,writable:!0,enumerable:n?.enumerable??!1,value:i})}catch{return()=>{}}Bt=()=>{if(Object.getOwnPropertyDescriptor(a,"focus")?.value===i)try{n?Object.defineProperty(a,"focus",n):delete a.focus}catch{}}}let t={shouldSkip:e};return Dt.add(t),()=>{if(Dt.delete(t)&&Dt.size===0){let a=Bt;Bt=null,a?.()}}}var wi='[data-shortcut-modal="shortcuts"] [data-modal-autofocus]';function vi(e){F(e,"dsh-web-mobile: shortcut modal keyboard guard",()=>{let t=new WeakSet(document.querySelectorAll(wi)),a=new WeakSet,n=qt(o=>{if(o.matches(wi)){if(!t.has(o)&&o.hasAttribute("data-dsh-automatic-focus")){if(!a.has(o)){a.add(o),Promise.resolve().then(()=>t.add(o));let i=o.closest('[role="dialog"][aria-modal="true"]');i!==null&&!i.contains(document.activeElement)&&i.focus({preventScroll:!0})}return!0}t.add(o)}return!1});return()=>n()})}var kl='[data-menu-material], [class*="_7KE1Ra_menu"]',El='[data-menu-material] input[role="searchbox"], input[role="searchbox"][aria-controls$="-models"]',Tl=2e3;function xi(e){F(e,"dsh-web-mobile: model menu keyboard guard",()=>{let t=null,a=0,n=()=>{t===null&&(t=qt(r=>r.matches(El)))},o=()=>{t?.(),t=null},i=()=>{n(),window.clearTimeout(a),a=window.setTimeout(()=>{document.querySelector(kl)===null&&o()},Tl)};return document.addEventListener("pointerdown",i,!0),()=>{document.removeEventListener("pointerdown",i,!0),window.clearTimeout(a),o()}})}function yi(e){return e.insideOpen||e.onInteractive?"ignore":"open"}var _l="li[data-plugin-package], li[data-plugin-row], li[data-plugin-item]",Sl='button[class*="_cardOpen"], button[class*="_rowOpen"]',Cl='button, a, input, select, textarea, [role="switch"], [role="button"], [role="tab"], [contenteditable="true"]';function ki(e){F(e,"dsh-web-mobile: plugin card tap",()=>{let t=a=>{let n=a.target;if(!(n instanceof Element))return;let o=n.closest(_l);if(o===null)return;let i=o.querySelector(Sl);!(i instanceof HTMLButtonElement)||yi({insideOpen:i.contains(n),onInteractive:n.closest(Cl)!==null})==="ignore"||(a.preventDefault(),i.click())};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)})}function Ei(e,t){let a=0,n=!1;return{schedule(o){n||(n=!0,a=e(()=>{n=!1,o()}))},cancel(){n&&(t(a),n=!1)}}}function Ti(e){e.effect(()=>{let t=window.matchMedia(Le),a='[class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"])',n={"white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis","max-width":"100%"},o=[{pick:_=>_,props:{"flex-wrap":"wrap","align-items":"center",gap:"4px 10px"}},{pick:_=>_.children[0]??null,props:{flex:"1 1 100%","max-width":"100%","min-width":"0"}},{pick:_=>_.querySelector('[class*="spec"]'),props:n},{pick:_=>_.querySelector('[class*="nm"]'),props:n}],i=new WeakMap,r=(_,L)=>{let g=i.get(_);g===void 0&&i.set(_,g=new Map);for(let[h,E]of Object.entries(L)){let v="important",p=_.style.getPropertyValue(h),M=_.style.getPropertyPriority(h);if(p===E&&M===v)continue;let b=g.get(h),k=b!==void 0&&b.value===p&&b.priority===M;g.set(h,k?{...b,value:E,priority:v}:{value:E,priority:v,before:p,beforePriority:M}),_.style.setProperty(h,E,v)}},l=_=>{let L=i.get(_);if(L!==void 0){for(let[g,h]of L)L.delete(g),!(_.style.getPropertyValue(g)!==h.value||_.style.getPropertyPriority(g)!==h.priority)&&(h.before===""?_.style.removeProperty(g):_.style.setProperty(g,h.before,h.beforePriority));L.size===0&&i.delete(_)}},u=()=>{document.querySelectorAll(a).forEach(_=>{for(let L of o){let g=L.pick(_);g&&l(g)}})},f=null,s='[data-dsh-market-root], [role="dialog"]',d="[data-dsh-market-root]",m=()=>{let _=f;if(_!==null&&_.isConnected)return _;let L=document.querySelector(s);return L===null?(f=null,null):(f=L.matches(d)?L:document.querySelector(d)??L,f)},T=()=>{let _=m();if(_===null)return;let L=_.querySelectorAll(a);L.length===0&&!_.matches(d)&&(L=document.querySelectorAll(a)),L.forEach(g=>{for(let h of o){let E=h.pick(g);E&&r(E,h.props)}})},c=()=>{u(),t.matches&&T()};c();let C=Ei(_=>window.requestAnimationFrame(_),_=>window.cancelAnimationFrame(_)),S=new MutationObserver((_=[])=>{let L=_.length===0;for(let g of _)if((g.target instanceof Element?g.target:g.target.parentElement)?.closest("[data-chat-flow]")==null){L=!0;break}L&&t.matches&&C.schedule(()=>{t.matches&&T()})});return S.observe(document.documentElement,{childList:!0,subtree:!0}),t.addEventListener("change",c),()=>{C.cancel(),S.disconnect(),t.removeEventListener("change",c),u(),f=null}},"dsh-web-mobile: installed-list-inline-styles")}function _i(e){F(e,"tablet-quick-settings",()=>{let t=St(e);t.ensure();let a=!1,n=()=>{a=!1;try{t.ensure()}catch(i){console.error("[dsh-web-mobile] tablet-quick-settings",i)}},o=new MutationObserver(()=>{a||(a=!0,requestAnimationFrame(n))});return o.observe(document.documentElement,{childList:!0,subtree:!0}),()=>{o.disconnect(),t.dispose()}},Rn)}var Al=800,Wt="[data-composer-input]",Si="data-mobile-panel-exit",Ci="dsh-mobile-panel-exit";function Ai(e){F(e,"dsh-web-mobile: session focus guard",()=>{let t=e.sessions.list,a=se(t.getSnapshot()),n=0,o=!1,i=()=>{window.clearTimeout(n),n=0,o=!1;let c=document.querySelector(`[${ye}]`);if(c===null)return;c.removeAttribute(ye);let C=c;Object.prototype.hasOwnProperty.call(c,"focus")&&delete C.focus},r=c=>{c.hasAttribute(ye)||(c.setAttribute(ye,""),Object.defineProperty(c,"focus",{configurable:!0,writable:!0,value:function(){}}))},l=()=>document.querySelector(`[data-mobile-nav="frame"][${Si}]`)!==null,u=()=>{i(),o=!0;let c=document.querySelector(Wt);c!==null&&r(c),n=window.setTimeout(i,Al)},f=new MutationObserver(()=>{if(!o&&l()&&u(),!o)return;let c=document.querySelector(Wt);c!==null&&r(c)}),s=c=>{if(!o)return;let C=c.target;C instanceof Element&&C.closest(Wt)!==null&&i()},d=c=>{if(!o)return;let C=c.target;C instanceof HTMLElement&&C.closest(Wt)!==null&&C.blur()},m=t.subscribe(()=>{let c=se(t.getSnapshot());c!==a&&(a=c,u())}),T=()=>{o||u()};return f.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[Si]}),document.addEventListener(Ci,T),document.addEventListener("pointerdown",s,!0),document.addEventListener("focusin",d,!0),()=>{m(),f.disconnect(),document.removeEventListener(Ci,T),document.removeEventListener("pointerdown",s,!0),document.removeEventListener("focusin",d,!0),i()}})}var Ll="[data-composer-input]";function Ml(e){if(!e.isTrusted||e.defaultPrevented||e.inputType!=="insertText")return!1;let t=e.data;return typeof t!="string"||t===`
`||t==="\r"?!1:t.includes(`
`)||t.includes("\r")}function Rl(e){if(typeof DataTransfer!="function"||typeof ClipboardEvent!="function")return null;try{let t=new DataTransfer;t.setData("text/plain",e);let a=new ClipboardEvent("paste",{clipboardData:t,bubbles:!0,cancelable:!0});return a.clipboardData?.getData("text/plain")!==e?null:a}catch{return null}}function Li(e){F(e,"dsh-web-mobile: composer paste guard",()=>{let t=a=>{if(!(a instanceof InputEvent)||!Ml(a))return;let n=a.target;if(!(n instanceof Element))return;let o=n.closest(Ll);if(o===null)return;let i=Rl(a.data??"");i!==null&&(a.preventDefault(),a.stopPropagation(),o.dispatchEvent(i))};return document.addEventListener("beforeinput",t,!0),()=>{document.removeEventListener("beforeinput",t,!0)}})}var Pl='[data-mobile-nav="file-upload"]',Ol="[data-composer-card]",Nl="input[type=file]",De=null;function Il(e){return e==="image"?"image/*":""}function Hl(e){return typeof e?.pickFile=="function"?e.pickFile.bind(e):void 0}function Ri(e){return Array.isArray(e)?e.filter(t=>typeof File<"u"&&t instanceof File):[]}function Fl(e,t){return t?"fallback":e==null?"cancelled":Array.isArray(e)?e.length===0?"cancelled":Ri(e).length>0?"files":"fallback":"fallback"}function qa(){let e=document.querySelector(Ol);return e===null?null:e.querySelector(Nl)}function zl(e,t){if(t===null)return!1;try{let a=new DataTransfer;for(let n of e)a.items.add(n);t.files=a.files}catch{return!1}return t.dispatchEvent(new Event("change",{bubbles:!0})),!0}var Dl='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20"><rect x="2.5" y="3.5" width="15" height="13" rx="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="7.2" cy="8" r="1.4" fill="currentColor"/><path d="M4.2 14.6l3.6-3.4 2.6 2.4 2.3-2.3 3.1 3.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',Bl='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20"><path d="M12.6 3.2H6.4A1.9 1.9 0 0 0 4.5 5.1v9.8a1.9 1.9 0 0 0 1.9 1.9h7.2a1.9 1.9 0 0 0 1.9-1.9V6.6l-2.9-3.4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12.4 3.4v3.3h3.1" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';function Wa(e,t=qa()){if(t===null)return;let a=Il(e),n=t.hasAttribute("accept"),o=t.getAttribute("accept");a!==""&&t.setAttribute("accept",a);try{t.click()}finally{a!==""&&(n?t.setAttribute("accept",o??""):t.removeAttribute("accept"))}}async function ql(e,t){let a=window.DSHA,n=Hl(a);if(n===void 0){Wa("file");return}let o=qa(),i=t?.()??null,r=null,l=!1;try{r=await n({accept:[],multiple:!0,title:e("fileUploadAttachment")})}catch{l=!0}if(o===null||qa()!==o||i!==null&&(t?.()??null)!==i)return;let u=Fl(r,l);u!=="cancelled"&&(u==="files"&&zl(Ri(r),o)||Wa("file",o))}var Mi=8,mt=8;function Wl(e,t,a){let n=e.top-Mi-t.height;n<a.top+mt&&(n=Math.min(e.bottom+Mi,a.bottom-t.height-mt));let o=Math.max(a.left+mt,Math.min(e.left,a.right-t.width-mt));return{top:Math.round(Math.max(a.top+mt,n)),left:Math.round(o)}}function Vl(){let e=window.visualViewport;return e!=null?{top:e.offsetTop,bottom:e.offsetTop+e.height,left:e.offsetLeft,right:e.offsetLeft+e.width}:{top:0,bottom:window.innerHeight,left:0,right:window.innerWidth}}function jl(e,t,a){De?.(),De=null;let n=document.createElement("div");n.dataset.mobileNav="file-picker-backdrop";let o=document.createElement("div");o.dataset.mobileNav="file-picker",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label",e("fileUploadAttachment"));let i=[{kind:"image",icon:Dl,label:e("fileUploadImage")},{kind:"file",icon:Bl,label:e("fileUploadAttachment")}],r=[],l=()=>{De===l&&(De=null);for(let g of r.splice(0))g();n.remove()};De=l;let u=g=>{g.key==="Escape"&&l()};for(let g of i){let h=document.createElement("button");h.type="button",h.dataset.mobileNav="file-picker-option",h.dataset.kind=g.kind;let E=document.createElement("span");E.dataset.mobileNav="file-picker-icon",E.innerHTML=g.icon;let v=document.createElement("span");v.textContent=g.label,h.append(E,v),h.addEventListener("click",()=>{l(),g.kind==="file"?ql(e,a):Wa(g.kind)}),o.append(h)}n.addEventListener("click",g=>{g.target===n&&l()}),document.addEventListener("keydown",u,!0),r.push(()=>document.removeEventListener("keydown",u,!0)),n.append(o),document.body.append(n),o.style.visibility="hidden";let f=!1,s=()=>{f||(f=!0,o.style.visibility="")},d="",m=0,T=window.setTimeout(s,400);r.push(()=>window.clearTimeout(T));let c=()=>{if(!t.isConnected){l();return}let g=t.getBoundingClientRect(),h=o.getBoundingClientRect(),E=Wl(g,h,Vl()),v=`${E.top}px`,p=`${E.left}px`;o.style.top!==v&&(o.style.top=v),o.style.left!==p&&(o.style.left=p);let M=`${E.top}:${E.left}`;M===d?m+=1:(d=M,m=0),m>=2&&s()};c();let C=!0,S=()=>{C||c()};window.addEventListener("resize",S),window.addEventListener("orientationchange",S),window.visualViewport?.addEventListener("resize",S),window.visualViewport?.addEventListener("scroll",S),r.push(()=>window.removeEventListener("resize",S)),r.push(()=>window.removeEventListener("orientationchange",S)),r.push(()=>window.visualViewport?.removeEventListener("resize",S)),r.push(()=>window.visualViewport?.removeEventListener("scroll",S));let _=0,L=requestAnimationFrame(function g(){if(c(),!o.isConnected){C=!1;return}++_<12?L=requestAnimationFrame(g):(C=!1,s())});r.push(()=>cancelAnimationFrame(L))}function Pi(e){F(e,"dsh-web-mobile: composer file picker",()=>{let t=e.locale.bind(Q),a=()=>se(e.sessions.list.getSnapshot())??null,n=o=>{let i=o.target;if(!(i instanceof Element))return;let r=i.closest(Pl);r===null||r.hasAttribute("disabled")||(o.preventDefault(),o.stopPropagation(),jl(t,r,a))};return document.addEventListener("click",n,!0),()=>{document.removeEventListener("click",n,!0),De?.(),De=null,document.querySelector('[data-mobile-nav="file-picker-backdrop"]')?.remove()}})}var Vt="mobile-nav-attachments";function Xe(e){return typeof e=="object"&&e!==null}function Oi(e){return Xe(e)?(Array.isArray(e.attachmentIds)?e.attachmentIds:Array.isArray(e.imageIds)?e.imageIds:[]).filter(a=>typeof a=="string"):[]}function Ni(e,t){if(!Array.isArray(e))return[];let a=[];for(let n of e){if(!Xe(n)||typeof n.id!="string")continue;let o=n.kind==="image"||n.kind==="file"?n.kind:void 0;if(o===void 0)continue;let i=Xe(n.file)?n.file:void 0,r=typeof i?.name=="string"?i.name:"",l=typeof i?.size=="number"&&Number.isFinite(i.size)?i.size:void 0,u=Xe(t)&&Xe(t[n.id])?t[n.id]:void 0,f=u?.status==="uploading"||u?.status==="ready"||u?.status==="error"?u.status:void 0;a.push({id:n.id,kind:o,name:r,...l===void 0?{}:{bytes:l},...o==="file"&&f!==void 0?{status:f}:{}})}return a}function Ul(e){if(e<1024)return`${e} B`;let t=["KB","MB","GB"],a=e/1024,n=0;for(;a>=1024&&n<t.length-1;)a/=1024,n+=1;return`${a>=10?Math.round(a):Math.round(a*10)/10} ${t[n]}`}function Gl(e){let t=new Map;for(let a of e)t.set(a.name,(t.get(a.name)??0)+1);return e.map((a,n)=>({v:1,id:a.id,kind:a.kind,name:a.name,ordinal:n+1,ambiguous:a.name===""||(t.get(a.name)??0)>1}))}function Ii(e,t){return e.name===""?t.unnamed(e.ordinal):e.name}function Kl(e,t,a){if(a||t.includes("/"))return!1;let n=t.trim().toLowerCase();return n===""||e.toLowerCase().includes(n)}function Hi(e,t,a,n){let o=t.trim().toLowerCase(),i=[];for(let[r,l]of Gl(e).entries()){let u=e[r];if(u===void 0)continue;let f=Ii(l,n);if(!Kl(f,t,a))continue;let s=[u.kind==="image"?n.kindImage:n.kindFile];u.bytes!==void 0&&s.push(Ul(u.bytes)),u.status==="uploading"?s.push(n.uploading):u.status==="error"&&s.push(n.failed),i.push({rank:o!==""&&f.toLowerCase().startsWith(o)?0:1,index:r,row:{name:f,description:s.join(" · "),icon:"file",section:n.section,value:JSON.stringify(l)}})}return i.sort((r,l)=>r.rank-l.rank||r.index-l.index),i.map(r=>r.row)}function Fi(e){if(typeof e!="string")return;let t;try{t=JSON.parse(e)}catch{return}if(!Xe(t)||t.v!==1)return;let{id:a,kind:n,name:o,ordinal:i,ambiguous:r}=t;if(!(typeof a!="string"||n!=="file"&&n!=="image"||typeof o!="string")&&!(typeof i!="number"||!Number.isInteger(i)||i<1||typeof r!="boolean"))return{v:1,id:a,kind:n,name:o,ordinal:i,ambiguous:r}}function $l(e,t){return`@${t.mention}:${e.name===""?`#${e.ordinal}`:e.name}`}function Va(e,t){let a=Fi(e);if(a!==void 0)return{source:Vt,ref:JSON.stringify(a),label:Ii(a,t),appearance:"file",clipboardText:$l(a,t)}}function zi(e){let t=Fi(e);if(t===void 0)throw new Error(`${Vt}: unrecognized attachment reference`);let a=t.kind==="image"?"Image":"File",n=t.name===""?a:`${a} ${JSON.stringify(t.name)}`;return t.ambiguous?`[attachment #${t.ordinal}: ${n}]`:`[attachment: ${n}]`}var Di="pocketMobileNav.attachments",Zl={section:"本次附件","kind.file":"文件","kind.image":"图片","status.uploading":"上传中","status.failed":"上传失败",unnamed:"附件 {n}",mention:"附件"},Yl={section:"Attachments in this message","kind.file":"File","kind.image":"Image","status.uploading":"Uploading","status.failed":"Upload failed",unnamed:"Attachment {n}",mention:"attachment"};function Ql(e,t){let a=e.get("sessions"),n=e.get("conversation"),o=a?.scope?.(t);if(o===void 0||n?.input?.for===void 0)return[];let i=Oi(n.input.for(o)?.state?.getSnapshot());if(i.length===0)return[];let r=typeof n.resolveDraftAttachments=="function"?n.resolveDraftAttachments(i):typeof n.draftImages=="function"?n.draftImages(i):void 0;return Ni(r,n.fileUploads?.getSnapshot())}function ja(e){let t=e.locale.bind(Di);return{section:t("section"),kindFile:t("kind.file"),kindImage:t("kind.image"),uploading:t("status.uploading"),failed:t("status.failed"),unnamed:a=>t("unnamed",{n:a}),mention:t("mention")}}function Jl(e){return{trigger:"@",name:Vt,order:-10,showGroupTitle:!1,candidates(t,a){if(a.signal.aborted)return Promise.resolve([]);try{return Promise.resolve(Hi(Ql(e,t.sessionId),a.query,a.drilled===!0,ja(e)))}catch{return Promise.resolve([])}},onPick({candidate:t}){let a=Va(t.value,ja(e));return a===void 0?void 0:{insert:a}},codec:{clipboardText:t=>Va(t,ja(e))?.clipboardText??"",serialize:t=>{try{return Promise.resolve(zi(t))}catch(a){return Promise.reject(a)}}}}}function Bi(e){e.effect(()=>e.locale.register(Di,{zh:Zl,en:Yl}),"dsh-web-mobile: attachment mention dictionaries"),e.inject(["inputTriggers"],t=>{F(t,"dsh-web-mobile: attachment mention source",()=>{let a=t.get("inputTriggers");if(typeof a?.registerSource=="function")return a.registerSource(Jl(t))})})}var jt="pocketMobileNavFileShare",qi={share:"分享",shareFile:"分享「{name}」",downloadFile:"下载「{name}」",sharing:"正在准备文件…",downloadedUnsupported:"当前环境不支持直接分享；已开始下载，请在系统保存位置确认",downloadedTooLarge:"文件超过 50 MB；已开始下载，请在系统保存位置确认",downloadedShareFailed:"分享未能完成；已开始下载，请在系统保存位置确认",errorTooLarge:"文件太大（超过 200 MB），无法在手机端分享或下载",errorNotFound:"文件不存在或已被移动",errorGeneric:"分享失败：{message}"},Wi={share:"Share",shareFile:'Share "{name}"',downloadFile:'Download "{name}"',sharing:"Preparing file…",downloadedUnsupported:"Direct sharing is unavailable here; a download has started — confirm it at the location your system shows",downloadedTooLarge:"The file is over 50 MB; a download has started — confirm it at the location your system shows",downloadedShareFailed:"Sharing did not finish; a download has started — confirm it at the location your system shows",errorTooLarge:"The file is too large (over 200 MB) to share or download on mobile",errorNotFound:"The file no longer exists or was moved",errorGeneric:"Share failed: {message}"};var Y=require("react"),nd=ca(require("@deepseek-ai/dsh-client-ui-primitives"),1);var fe=class extends Error{code;constructor(t,a){super(a),this.code=t,this.name="FileShareError"}};function ed(e){let t=e.code??"";return t==="workspace-file/too-large"?new fe("too-large",e.message??t):t==="workspace-file/not-found"||t==="workspace-file/not-regular-file"?new fe("not-found",e.message??t):new fe("read-failed",e.message??(t||"read failed"))}async function Vi(e,t,a,n=1048576,o=209715200){let i=[],r=0;for(;;){a.throwIfAborted();let l=await e(t,{offset:r,length:n},a);if(a.throwIfAborted(),!l.ok)throw ed(l.error);let{data:u,eof:f,bytes:s}=l.value;if(s!==void 0&&s>o)throw new fe("too-large",`${t}: ${s} bytes exceed the ${o} byte share cap`);if(i.push(new Uint8Array(u)),r+=u.length,r>o)throw new fe("too-large",`${t}: more than ${o} bytes`);if(f||u.length===0)break}return{parts:i,size:r}}function td(e){return typeof e=="object"&&e!==null&&e.name==="AbortError"}function Ut(e){return e.share!==void 0&&e.canShare!==void 0}async function ji(e,t){if(e.size>(t.shareMax??52428800))return t.download(e),{kind:"downloaded",reason:"too-large"};let a=t.share;if(a===void 0)return t.download(e),{kind:"downloaded",reason:"unsupported"};let n=!1;try{n=t.canShare?.({files:[e]})===!0}catch{n=!1}if(!n)return t.download(e),{kind:"downloaded",reason:"unsupported"};try{return await a({files:[e],title:e.name}),{kind:"shared"}}catch(o){return td(o)?{kind:"cancelled"}:(t.download(e),{kind:"downloaded",reason:"share-failed"})}}var ad={txt:"text/plain",log:"text/plain",md:"text/markdown",markdown:"text/markdown",csv:"text/csv",tsv:"text/tab-separated-values",json:"application/json",xml:"application/xml",yaml:"text/yaml",yml:"text/yaml",html:"text/html",htm:"text/html",css:"text/css",js:"text/javascript",mjs:"text/javascript",ts:"text/plain",tsx:"text/plain",py:"text/plain",sh:"text/plain",svg:"image/svg+xml",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",bmp:"image/bmp",heic:"image/heic",avif:"image/avif",mp3:"audio/mpeg",wav:"audio/wav",m4a:"audio/mp4",ogg:"audio/ogg",mp4:"video/mp4",mov:"video/quicktime",webm:"video/webm",pdf:"application/pdf",zip:"application/zip",gz:"application/gzip",tar:"application/x-tar",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",xls:"application/vnd.ms-excel",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",ppt:"application/vnd.ms-powerpoint",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation"};function Gt(e){return e.split(/[/\\]+/).filter(Boolean).at(-1)??e}function Ui(e){let t=e.lastIndexOf(".");return t<=0?"application/octet-stream":ad[e.slice(t+1).toLowerCase()]??"application/octet-stream"}var $t=nd,Gi=["IconShareOutlineRegular","IconShareOutline16"].map(e=>$t[e]).find(e=>typeof e=="function"),Ki=["IconWarningOutlineRegular","IconWarningOutline16"].map(e=>$t[e]).find(e=>typeof e=="function"),Ua=typeof $t.Toast=="function"?$t.Toast:void 0,$i='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5v8.5M8 1.5 5 4.5M8 1.5l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 7H4a1.5 1.5 0 0 0-1.5 1.5v4A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 12 7h-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',Xi='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5v8.5M8 10 5 7M8 10l3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 12.5H4A1.5 1.5 0 0 0 2.5 14v.5h11V14A1.5 1.5 0 0 0 12 12.5h-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';function od(){return React.createElement("span",{"aria-hidden":"true",dangerouslySetInnerHTML:{__html:Xi}})}function id(){return Gi!==void 0?React.createElement(Gi,{size:16}):React.createElement("span",{"aria-hidden":"true",dangerouslySetInnerHTML:{__html:$i}})}function rd(e){document.querySelector('[data-mobile-nav="file-share-toast"]')?.remove();let t=document.createElement("div");t.dataset.mobileNav="file-share-toast",t.setAttribute("role","status"),t.textContent=e,document.body.appendChild(t),setTimeout(()=>t.remove(),3e3)}function Zi(e,t){return Ut(Xt())?e("shareFile",{name:t}):e("downloadFile",{name:t})}function sd(e,t){return e.kind!=="downloaded"?null:e.reason==="too-large"?t("downloadedTooLarge"):e.reason==="share-failed"?t("downloadedShareFailed"):t("downloadedUnsupported")}function ld(e,t){if(e instanceof fe){if(e.code==="too-large")return t("errorTooLarge");if(e.code==="not-found")return t("errorNotFound")}return t("errorGeneric",{message:e instanceof Error?e.message:String(e)})}function dd(e){let t=URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download=e.name,a.rel="noopener",a.style.display="none",document.body.appendChild(a),a.click(),a.remove(),setTimeout(()=>URL.revokeObjectURL(t),3e4)}function Xt(){let e=navigator,t=window.DSHA;return{canShare:typeof t?.canShareFile=="function"?a=>a.files.length===1&&t.canShareFile(a.files[0]):typeof e.canShare=="function"?a=>e.canShare(a):void 0,share:typeof t?.shareFile=="function"?a=>t.shareFile(a.files[0]):typeof e.share=="function"?a=>e.share(a):void 0,download:dd}}function Yi(e,t,a){let[n,o]=(0,Y.useState)(null),[i,r]=(0,Y.useState)(null),l=(0,Y.useRef)(null),u=(0,Y.useRef)(0),f=(0,Y.useRef)({sessionId:e,readFileRange:t,t:a});f.current={sessionId:e,readFileRange:t,t:a},(0,Y.useEffect)(()=>()=>l.current?.abort(),[]);let s=(0,Y.useCallback)(T=>{if(Ua===void 0){rd(T);return}u.current+=1,r({seq:u.current,text:T})},[]),d=(0,Y.useCallback)(T=>{if(l.current!==null)return;let c=new AbortController;l.current=c,o(T);let{sessionId:C,readFileRange:S,t:_}=f.current;(async()=>{let{parts:g}=await Vi((M,b,k)=>S(C,M,b,k),T,c.signal),h=Gt(T),E=new File(g,h,{type:Ui(h)}),v=await ji(E,Xt()),p=sd(v,_);p!==null&&s(p)})().catch(g=>{c.signal.aborted||(console.warn("[dsh-web-mobile] file share failed:",g),s(ld(g,_)))}).finally(()=>{l.current===c&&(l.current=null),c.signal.aborted||o(null)})},[s]),m=i===null||Ua===void 0?null:React.createElement(Ua,{key:i.seq,text:i.text,...Ki===void 0?{}:{icon:React.createElement(cd,null)},onDone:()=>r(null)});return{busyPath:n,share:d,toast:m}}function cd(){let e=Ki;return e===void 0?null:React.createElement(e,null)}function Qi({absolutePath:e,sessionId:t,readFileRange:a,t:n}){let{busyPath:o,share:i,toast:r}=Yi(t,a,n),l=o!==null;return React.createElement(React.Fragment,null,React.createElement("button",{type:"button","data-mobile-nav":"file-share-preview","aria-label":l?n("sharing"):Zi(n,Gt(e)),"aria-busy":l,disabled:l,onClick:()=>i(e)},Ut(Xt())?React.createElement(id,null):React.createElement(od,null)),r)}var Kt="file-share-row";function Ji({sessionId:e,readFileRange:t,t:a}){let{busyPath:n,share:o,toast:i}=Yi(e,t,a),r=(0,Y.useRef)(null),l=(0,Y.useRef)({busyPath:n,share:o,t:a});l.current={busyPath:n,share:o,t:a};let u=(0,Y.useRef)(null);return(0,Y.useEffect)(()=>{let s=(r.current?.closest('[data-files-state="tree"]')??null)?.querySelector("[data-files-body]")??null;if(s===null)return;let d=S=>{S.preventDefault(),S.stopPropagation();let L=S.currentTarget.parentElement?.getAttribute("data-files-path");L&&l.current.share(L)},m=()=>{let{busyPath:S,t:_}=l.current;for(let L of s.querySelectorAll(`[data-mobile-nav="${Kt}"]`))L.parentElement?.getAttribute("data-files-entry")!=="file"&&L.remove();for(let L of s.querySelectorAll('li[data-files-entry="file"]')){let g=L.querySelector(`:scope > [data-mobile-nav="${Kt}"]`);g===null&&(g=document.createElement("button"),g.type="button",g.dataset.mobileNav=Kt,g.innerHTML=Ut(Xt())?$i:Xi,g.addEventListener("click",d),L.appendChild(g));let h=L.getAttribute("data-files-path")??"",E=S!==null&&S===h,v=E?_("sharing"):Zi(_,Gt(h)),p=S!==null;g.getAttribute("aria-label")!==v&&g.setAttribute("aria-label",v),g.disabled!==p&&(g.disabled=p),E?g.setAttribute("aria-busy","true"):g.removeAttribute("aria-busy")}};u.current=m;let T=0,c=()=>{T===0&&(T=requestAnimationFrame(()=>{T=0,m()}))},C=new MutationObserver(c);return C.observe(s,{childList:!0,subtree:!0}),m(),()=>{C.disconnect(),T!==0&&cancelAnimationFrame(T),u.current=null;for(let S of s.querySelectorAll(`[data-mobile-nav="${Kt}"]`))S.removeEventListener("click",d),S.remove()}},[]),(0,Y.useEffect)(()=>{u.current?.()},[n,a]),React.createElement(React.Fragment,null,React.createElement("span",{hidden:!0,"data-mobile-nav":"file-share-anchor",ref:r}),i)}function er(e){e.inject(["slots","locale","remote","remote.workspaceFiles"],t=>{t.effect(()=>t.locale.register(jt,{zh:qi,en:Wi}),"dsh-web-mobile: file-share dictionaries");let a=t.remote,n=()=>({readFileRange:(o,i,r,l)=>a.workspaceFiles.readBytes(o,i,{range:r},l)});F(t,"dsh-web-mobile: file share",()=>{let o=[t.slots.inject("sidebar.right.tab.document.actions",()=>t.slots.register({name:"sidebar.right.tab.document.actions",id:"mobile-nav-file-share",order:100,locale:jt,inject:n},Qi)),t.slots.inject("sidebar.right.tab.files.actions",()=>t.slots.register({name:"sidebar.right.tab.files.actions",id:"mobile-nav-file-share-rows",order:100,locale:jt,inject:n},Ji))];return()=>{for(let i of o)i()}})})}function tr(e){if(typeof e!="object"||e===null)return null;let t=e.selectPanel;return typeof t!="function"?null:()=>{t.call(e,null)}}var ar='[class*="panelRow"][aria-current="page"]',Xa=!1,Ga=null,Ka=null;function Zt(){let e=Ka;return e!==null&&e.isConnected&&e.matches(ar)?!0:(Ka=document.querySelector(ar),Ka!==null)}function $a(){return!Xa&&Zt()}var nr="data-mobile-panel-exit",pd="dsh-mobile-panel-exit",hd=2e3,ud="panel-ghost",md=280,fd='[data-mobile-nav="frame"] [class*="_centerCol"] > * > *',bd='section[data-plugin-panel] button[class*="_moreBack"],section[data-plugin-panel] [data-plugin-detail] button[class*="_crumb"],section[data-plugin-panel] [data-plugin-item-detail] button[class*="_crumb"],section[data-plugin-panel] [data-plugin-row-detail] button[class*="_crumb"]';function or(e){let t=tr(e),a=t!==null,n=!1,o=!1,i=null,r=0,l=null,u=null,f=null,s=Symbol("panel-exit");function d(){let v=D();if(v===null)return[];let p=[];for(let M of v.querySelectorAll('[class*="_centerCol"]')){let b=M.firstElementChild?.firstElementChild;if(b instanceof HTMLElement)for(let k of b.getAnimations())k.playState!=="idle"&&p.push(k)}return p}function m(){if(n){if(i!==null&&(window.clearTimeout(i),i=null),r!==0&&(cancelAnimationFrame(r),r=0),Ga===s){let v=D();v!==null&&v.removeAttribute(nr),Xa=!1,Ga=null}n=!1}}function T(){u!==null&&(window.clearTimeout(u),u=null);let v=l;l=null,v!==null&&(f!==null&&v.removeEventListener("animationend",f,!0),f=null,v.remove())}function c(v){if(o||!n)return;let p=d();if(p.length===0){if(v<2){r=requestAnimationFrame(()=>{r=0,c(v+1)});return}m();return}let M=0;for(let b of p){let k=b.effect?.getTiming(),x=typeof k?.delay=="number"?k.delay:0,R=typeof k?.duration=="number"?k.duration:0,O=typeof k?.iterations=="number"?k.iterations:1;M=Math.max(M,x+R*O),b.finished.then(()=>m(),()=>m())}i=window.setTimeout(m,Math.min(hd,Math.max(250,M+200)))}function C(){if(!Zt())return null;let v=document.querySelector(fd);return v instanceof HTMLElement?v:null}function S(){if(!Zt())return null;let v=document.querySelector(bd);return v instanceof HTMLElement?v:null}function _(){return S()!==null}function L(v){T();let p=document.createElement("div");return p.dataset.mobileNav=ud,p.setAttribute("aria-hidden","true"),p.append(v.cloneNode(!0)),document.body.append(p),p}let g=()=>{if(o||!a||n)return;n=!0,Xa=!0,Ga=s;let v=D();v!==null&&v.setAttribute(nr,""),document.dispatchEvent(new CustomEvent(pd));let p=C();l=p===null?null:L(p);try{t()}finally{if(r=requestAnimationFrame(()=>{r=0,c(0)}),l!==null){let M=l;f=b=>{b.animationName==="dsh-web-mobile-panel-ghost-out"&&T()},M.addEventListener("animationend",f,!0),u=window.setTimeout(T,md+120)}}},h=()=>{if(o||!a||n)return;let v=S();if(v!==null){v.click();return}g()};function E(){o=!0,m(),T()}return{exit:g,back:h,supported:a,panelOpen:Zt,subpageOpen:_,task:gd(g,a,h,S),dispose:E}}function gd(e,t,a,n){let o=!1,i=0,r=null,l=!1,u=!1,f=!1,s=null;function d(){f=!1,s!==null&&(window.clearTimeout(s),s=null)}function m(){f=!0,s!==null&&window.clearTimeout(s),s=window.setTimeout(d,1200);try{history.back()}catch{d()}}function T(){try{return history.pushState({mobilePanelExit:!0},""),!0}catch{return!1}}function c(){!t||o||T()&&(o=!0)}function C(){t&&T()&&(i+=1)}function S(h){return h===null?0:h.className.includes("_moreBack")?1:2}function _(){if(f){d();return}if(i>0)i-=1;else if(o)o=!1;else return;if($a()&&n()!==null){l=!0,a();return}$a()&&e()}function L(){u||(window.addEventListener("popstate",_),u=!0)}function g(){u&&(window.removeEventListener("popstate",_),u=!1)}return{name:"panel-back-exit",scopes:["*"],ensure:()=>{if(!t)return;if(L(),!$a()){o&&(o=!1,m()),r=null,l=!1;return}c();let h=n(),E=S(r),v=S(h);if(v===E)return;let p=l;if(l=!1,r=h,v>E){p||C();return}!p&&i>0&&(i-=1,m())},dispose:()=>{g(),d(),o&&(o=!1,m())}}}function ir(e,t){F(e,"dsh-web-mobile: panel row returns to conversation",()=>{let a=n=>{let o=n.target;if(!(o instanceof Element)||typeof o.closest!="function")return;let i=o.closest('[class*="panelRow"]');i!==null&&i.getAttribute("aria-current")==="page"&&(n.preventDefault(),n.stopPropagation(),t())};return document.addEventListener("click",a,!0),()=>document.removeEventListener("click",a,!0)})}var wd=/[?,]dsh-web-mobile\/client\.js/;function vd(e){if(typeof e!="string"||e==="")return null;try{let t=new URL(e,"http://x").searchParams.get("rev");return t===null||t===""?null:t}catch{return null}}function xd(){for(let e of document.head.querySelectorAll('script[src], link[rel="preload"]')){let t=e.getAttribute("src")??e.getAttribute("href");if(t!==null&&wd.test(t))return vd(t)}return null}function rr(e){e.effect(()=>{let t=new URLSearchParams(location.search);if(!t.has("mobile-nav-debug"))return()=>{};let a=[],n=S=>a.push(`ERR ${S.message.slice(0,120)}`),o=S=>a.push(`REJ ${String(S.reason).slice(0,120)}`);window.addEventListener("error",n),window.addEventListener("unhandledrejection",o);let i=document.createElement("div");i.style.cssText=["position:fixed","top:40px","right:6px","z-index:2147483000","background:rgba(0,0,0,.82)","color:#fff","font:11px/1.5 ui-monospace,monospace","padding:8px 10px","border-radius:8px","max-width:94vw","max-height:70vh","overflow:auto","white-space:pre-wrap","pointer-events:none"].join(";");let r=()=>{let S=E=>!!document.querySelector(E),_=E=>{let v=document.querySelector(E);return v===null?"absent":getComputedStyle(v).visibility},L=document.querySelector('[data-mobile-nav="frame"]'),g=()=>{let E=document.querySelector("[data-sidebar-right-panel]");if(E===null)return"absent";let v=E.getBoundingClientRect();return`${E.getAttribute("data-sidebar-right-panel")} pad ${getComputedStyle(E).paddingTop} rect ${Math.round(v.top)},${Math.round(v.left)} ${Math.round(v.width)}x${Math.round(v.height)}`};return[`build rev ${xd()??"?"} (diag chips)`,`URL ${location.pathname}${location.search}`,`W ${innerWidth} x ${innerHeight} dpr ${devicePixelRatio}`,`mq≤1023 ${matchMedia(Le).matches}  mq≥1024 ${matchMedia(Mn).matches}`,`safeTop framePad ${L===null?"n/a":getComputedStyle(L).paddingTop}  rightPanel ${g()}`,`css ${S('style[data-plugin-css*="mobile"]')}  frame ${!!L}`,`previewCol ${_("[data-aionui-preview-col]")}  explorerCol ${_("[data-aionui-explorer-col]")}`,`previewOpen ${L?.hasAttribute("data-aionui-preview-open")??"?"}  explorerOpen ${L?.hasAttribute("data-aionui-explorer-open")??"?"}  previewFull ${L?.hasAttribute("data-mobile-preview-full")??"?"}`,`header ${_("[data-phase] header")}  composer ${S("textarea, [data-composer-input]")}`,`genui cards ${document.querySelectorAll("[data-genui]").length}  panel ${S("[data-genui-panel]")}`,`phase ${document.querySelector("[data-phase]")?.getAttribute("data-phase")??"?"}`,`errs ${a.slice(-5).join(" | ")||"none"}`].join(`
`)},l=()=>{i.textContent=r()};l();let u=0,f=()=>{u===0&&(u=requestAnimationFrame(()=>{u=0,l()}))},s=new MutationObserver(S=>{for(let _ of S)if(!(_.target===i||i.contains(_.target))){f();return}});s.observe(document.body,{childList:!0,subtree:!0,attributes:!0});let d=setInterval(l,1500);document.body.appendChild(i);let m=S=>{let _=document.querySelector(S);if(_===null)return"absent";let L=_.getBoundingClientRect();return`${Math.round(L.x)},${Math.round(L.y)} ${Math.round(L.width)}x${Math.round(L.height)}`},T=()=>[r(),`rects toggle ${m('[data-mobile-nav="toggle"]')} files ${m('[data-mobile-nav="files"]')} header ${m("[data-phase] header")} titleCluster ${m('[class*="_titleCluster"]')}`,`chips crea ${m('[class*="SVAs4q_"]')} team ${m("[data-team-action]")} model ${m('[class*="_7KE1Ra_trigger"]')} crumbs ${m('[class*="_crumbs"]')} crumbCurrent ${m('[class*="_crumbCurrent"]')}`,`ua ${navigator.userAgent}`,`screen ${screen.width}x${screen.height} standalone ${matchMedia("(display-mode: standalone)").matches}`,`vv ${visualViewport===null?"n/a":`${Math.round(visualViewport.width)}x${Math.round(visualViewport.height)}@${Math.round(visualViewport.offsetTop)}`}`].join(`
`),c=t.get("beacon")||"http://127.0.0.1:3199/diag",C=setInterval(()=>{fetch(c,{method:"POST",mode:"no-cors",body:T()}).catch(()=>{})},2e3);return()=>{window.removeEventListener("error",n),window.removeEventListener("unhandledrejection",o),s.disconnect(),clearInterval(d),clearInterval(C),u!==0&&cancelAnimationFrame(u),i.remove()}},"dsh-web-mobile: debug badge")}var Za=1e4,ft=window,Yt=ft.__dshaMobileScrollState instanceof WeakMap?ft.__dshaMobileScrollState:ft.__dshaMobileScrollState=new WeakMap;function sr(){return[...document.querySelectorAll('[data-mobile-nav="frame"] [class*="scrollBody"]')]}function yd(){for(let e of sr())if(e.scrollTop>0){let t={top:e.scrollTop,savedAt:Date.now(),url:location.href};Yt.set(e,t),ft.__dshaMobileLastScroll=t}else Yt.delete(e)}function kd(){for(let n of sr()){let o=Yt.get(n);Yt.delete(n),!(!o||Date.now()-o.savedAt>Za||o.url!==location.href)&&requestAnimationFrame(()=>{n.isConnected&&o.url===location.href&&Date.now()-o.savedAt<=Za&&n.scrollTop===0&&(n.scrollTop=o.top)})}let e=ft.__dshaMobileLastScroll;if(e===void 0)return;let t=0,a=()=>{if(t+=1,e.url!==location.href||Date.now()-e.savedAt>Za)return;let n=document.querySelector('[class*="scrollBody"]');if(n!==null&&n.scrollTop===0&&n.scrollHeight>=e.top+n.clientHeight){n.scrollTop=e.top;return}t<30&&requestAnimationFrame(a)};requestAnimationFrame(a)}function lr(e){e.effect(()=>e.locale.register(Q,{zh:zn,en:Dn}),"dsh-web-mobile: dictionaries"),e.effect(()=>{for(let n of document.querySelectorAll('style[data-plugin-css="dsh-web-mobile/mobile.css"]'))n.remove();let a=document.createElement("style");return a.dataset.plugin="dsh-web-mobile",a.dataset.pluginCss="dsh-web-mobile/mobile.css",a.textContent=Ln,document.head.appendChild(a),setTimeout(()=>{a.isConnected&&document.head.appendChild(a)},0),kd(),()=>{yd(),a.remove()}},"dsh-web-mobile: styles"),Ti(e),_i(e);let t=or(e.layout);e.effect(()=>{let a=[Do(),Ro(e),Po(e,t),()=>t.dispose()];return()=>{for(let n of a)n()}},"dsh-web-mobile: reconciler infrastructure"),qo(e),Mo(e),ir(e,t.exit),Uo(e),Ao(e,kt),jo(e),Go(e),Qo(e),Jo(e),si(e),pi(e),hi(e),ui(e),gi(e),vi(e),xi(e),ki(e),Ai(e),Li(e),Pi(e),Bi(e),Bo(e),Bn(e),er(e),rr(e),e.slots.inject("conversation.session.header.actions",()=>e.slots.register({name:"conversation.session.header.actions",id:"mobile-nav-toggle",order:10,locale:Q,inject:()=>({toggleSidebar:()=>e.layout.toggleSidebar()})},En)),e.slots.inject("conversation.input.left",()=>e.slots.register({name:"conversation.input.left",id:"mobile-nav-file-upload",order:10,locale:Q,inject:()=>({})},Tn))}var Ed=["添加工作区","添加工作区…","Add workspace","Add workspace…"],dr='[role="tab"], [role="treeitem"], [role="menuitem"], [role="menu"]';function cr(e){let t=(e??"").trim();return t.length<3||t.length>320||/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(t)&&!/^file:\/\//i.test(t)?!1:!!(/^(\/|~\/|\.\.?\/|[A-Za-z]:\\)/.test(t)||/\/[\w.\-]+\.\w{1,12}$/.test(t))}async function Td(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.top="-9999px",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let a=document.execCommand("copy");return t.remove(),a}catch{return!1}}function pr(e,t){let a=!1,n=(h,E)=>{let v=t(h);if(E!==void 0)for(let[p,M]of Object.entries(E))v=v.split(`{${p}}`).join(String(M));return v},o=null,i=null,r=h=>{o===null&&(o=document.createElement("div"),o.setAttribute("data-mobile-nav","file-guard-toast"),Object.assign(o.style,{position:"fixed",left:"50%",bottom:"calc(64px + var(--dshp-kb, 0px))",transform:"translateX(-50%)",maxWidth:"84vw",zIndex:"9999",padding:"10px 14px",borderRadius:"10px",background:"rgba(20,22,28,.92)",color:"#fff",fontSize:"13px",lineHeight:"1.4",textAlign:"center",fontFamily:"inherit",boxShadow:"0 4px 16px rgba(0,0,0,.28)",pointerEvents:"none",opacity:"0",transition:"opacity .18s ease"}),document.body.appendChild(o)),o.textContent=h,requestAnimationFrame(()=>{o!==null&&(o.style.opacity="1")}),i!==null&&window.clearTimeout(i),i=window.setTimeout(()=>{o!==null&&(o.style.opacity="0")},2600)},l=null,u=h=>{document.activeElement?.blur(),l?.remove();let v=h.length>65536?`${h.slice(0,65536)}
${t("fileTruncated")}`:h,p=document.createElement("div");p.setAttribute("data-mobile-nav","file-guard-fallback"),Object.assign(p.style,{position:"fixed",left:"max(8px, env(safe-area-inset-left, 0px))",right:"max(8px, env(safe-area-inset-right, 0px))",bottom:"calc(16px + env(safe-area-inset-bottom, 0px) + var(--dshp-kb, 0px))",maxHeight:"45vh",overflow:"auto",zIndex:"10000",padding:"10px 12px",borderRadius:"10px",background:"rgba(20,22,28,.96)",color:"#eee",boxShadow:"0 6px 24px rgba(0,0,0,.4)",WebkitOverflowScrolling:"touch"});let M=document.createElement("div");Object.assign(M.style,{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px",color:"#9aa0a8",marginBottom:"6px"});let b=document.createElement("span");b.textContent=t("fileFallbackTitle");let k=document.createElement("button");k.type="button",k.textContent=t("fileFallbackClose"),Object.assign(k.style,{border:"1px solid #444a52",background:"transparent",color:"#eee",borderRadius:"6px",padding:"2px 10px",fontSize:"12px",cursor:"pointer"}),k.addEventListener("click",()=>{p.remove()});let x=document.createElement("pre");x.textContent=v,Object.assign(x.style,{margin:"0",whiteSpace:"pre-wrap",wordBreak:"break-all",userSelect:"text",WebkitUserSelect:"text",fontSize:"12px",lineHeight:"1.5",fontFamily:"inherit"}),M.append(b,k),p.append(M,x),document.body.appendChild(p),l=p},f=h=>{let E=h.target;if(E===null)return;let v=E.closest("button, a");v!==null&&v.closest("[data-phase]")!==null&&v.closest(dr)===null&&cr(v.textContent)&&(h.preventDefault(),h.stopImmediatePropagation(),r(t("fileGuardMsg")))};document.addEventListener("click",f,!0);let s=0,d=(h=document)=>{let E=h.querySelectorAll("button, a");(h instanceof Element&&h.matches("button, a")?[h,...E]:E).forEach(p=>{if(p.getAttribute("data-mobile-nav-copy")==="1"||p.closest("[data-phase]")===null||p.closest(dr)!==null)return;let M=(p.textContent??"").trim();if(!cr(M))return;p.setAttribute("data-mobile-nav-copy","1");let b=String(++s);p.setAttribute("data-mobile-nav-copy-id",b);let k=p.parentElement;if(k!==null)for(let R of Array.from(k.querySelectorAll(':scope > [data-mobile-nav="copy-file"]')))R.previousElementSibling?.getAttribute("data-mobile-nav-copy-id")!==R.getAttribute("data-mobile-nav-copy-for")&&R.remove();let x=document.createElement("button");x.type="button",x.setAttribute("data-mobile-nav","copy-file"),x.setAttribute("data-mobile-nav-copy-for",b),x.textContent=t("fileCopy"),x.addEventListener("click",async R=>{R.preventDefault(),R.stopPropagation();let O=(p.textContent??"").trim().replace(/^file:\/\//i,"");x.disabled=!0,x.textContent="…";try{let P=await e(O);if(a)return;if(!P?.ok){r(P?.error?.message??t("fileCopyFailed"));return}let z=P.value?.content??"",q=P.value?.size??z.length;if(q>2097152){r(n("fileTooLarge",{size:(q/(1024*1024)).toFixed(1)}));return}let U=await Td(z);if(a)return;if(U){let K=Math.max(1,Math.round(q/1024));r(n("fileCopyDone",{kb:K}))}else r(t("fileCopyFailedFallback")),u(z)}catch(P){a||r(P instanceof Error?P.message:t("fileCopyFailed"))}finally{x.isConnected&&(x.disabled=!1,x.textContent=t("fileCopy"))}}),p.parentElement?.insertBefore(x,p.nextSibling)})},m=new Map,T='[role="menuitem"],[role="option"],li,button,a',c=h=>{let E=(h.getAttribute("aria-label")||""||h.textContent||"").trim();if(Ed.includes(E)){let v=h;m.has(h)||m.set(h,v.style.display),v.style.display="none",h.setAttribute("data-mobile-nav-hide","add-workspace")}},C=h=>{h instanceof Element&&h.matches(T)&&c(h),h.querySelectorAll(T).forEach(c)},S=new Set,_=0,L=()=>{_=0;for(let h of S)h.isConnected&&(d(h),C(h));S.clear();for(let h of m.keys())h.isConnected||m.delete(h)};d(),C(document);let g=new MutationObserver(h=>{for(let E of h){if(E.type==="characterData"){let v=E.target.parentElement;v!==null&&v.childElementCount>0&&S.add(v);continue}E.addedNodes.forEach(v=>{v.nodeType===1?S.add(v):v.nodeType===3&&v.parentElement!==null&&S.add(v.parentElement)})}S.size>0&&_===0&&(_=requestAnimationFrame(L))});return g.observe(document.body,{childList:!0,subtree:!0,characterData:!0}),()=>{a=!0,document.removeEventListener("click",f,!0),g.disconnect(),_!==0&&cancelAnimationFrame(_),S.clear(),i!==null&&window.clearTimeout(i),o?.remove(),o=null,l?.remove(),l=null,document.querySelectorAll('[data-mobile-nav="copy-file"]').forEach(h=>h.remove()),document.querySelectorAll('[data-mobile-nav-copy="1"]').forEach(h=>h.removeAttribute("data-mobile-nav-copy")),document.querySelectorAll('[data-mobile-nav-hide="add-workspace"]').forEach(h=>{let E=h,v=m.get(h);v!==void 0?E.style.display=v:E.style.removeProperty("display"),m.delete(h),h.removeAttribute("data-mobile-nav-hide")}),m.clear()}}var Qt="dsh-pocket.layout";function hr({urlValue:e,stored:t,narrowMatch:a}){let n=String(e??"").trim().toLowerCase();return n==="desktop"?"desktop":n==="mobile"?"mobile":n==="auto"?a?"mobile":"desktop":t==="desktop"||t==="mobile"?t:a?"mobile":"desktop"}function ur(e){try{if(typeof localStorage>"u")return"";if(e==null)return _d();let t=String(e).trim().toLowerCase();try{t==="desktop"||t==="mobile"?localStorage.setItem(Qt,t):(t==="auto"||t==="")&&localStorage.removeItem(Qt)}catch{}let a=localStorage.getItem(Qt);return a==="desktop"||a==="mobile"?a:""}catch{return""}}function _d(){try{if(typeof localStorage>"u")return"";let e=localStorage.getItem(Qt);return e==="desktop"||e==="mobile"?e:""}catch{return""}}function mr(e){let{hasGeneration:t,generation:a,state:n}=e??{};if(t===!0){let i=a!=null;return{down:!i,usable:i}}let o=n==="disconnected"||n==="connecting";return{down:o,usable:!o}}function fr({staleMs:e=2500,hardStuckMs:t=8e3,maxRepairAttempts:a=3}={}){let n=new Map,o=new Map,i=Number.NEGATIVE_INFINITY,r=Number.NEGATIVE_INFINITY,l=0,u=!1,f=(L,g)=>{if(L.down){u=!0;return}u&&(u=!1,l+=1,i=g)},s=L=>{r=L,l+=1,u=!1,o.clear()},d=(L,g)=>n.has(L)?!1:(n.set(L,g),!0),m=L=>{n.delete(L),o.delete(L)},T=(L,g,h={})=>{let E=n.get(L);if(E===void 0)return c;if((o.get(L)??0)>=a)return{waiting:!1,stale:!0,repair:!1,reconnect:!1};let v=h.openState==="loading";if(v&&h.openPromise==="gone")return S(L,{reconnect:!1});let p=h.openState!=="open"&&h.openState!=="cold";if(r>E){let M=g-r;return M<e?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:e-M}:p?S(L,{reconnect:!0}):C}if(l>0&&i>E){let M=g-Math.max(E,i);return M<e?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:e-M}:p?S(L,{reconnect:!1}):C}if(v&&g-E>=t)return S(L,{reconnect:!0});if(h.openState==="open"){let M=e-(g-E);return M>0?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:M}:C}if(h.openState===void 0){let M=t-(g-E);return M>0?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:M}:C}return v?{waiting:!0,stale:!1,repair:!1,reconnect:!1,remainingMs:Math.max(0,t-(g-E))}:c},c={waiting:!1,stale:!1,repair:!1,reconnect:!1},C={waiting:!1,stale:!0,repair:!1,reconnect:!1},S=(L,{reconnect:g})=>(o.set(L,(o.get(L)??0)+1),{waiting:!1,stale:!0,repair:!0,reconnect:g});return{noteLink:f,noteResume:s,observe:d,release:m,decide:T,reset:()=>{n.clear(),o.clear(),u=!1,l=0,i=Number.NEGATIVE_INFINITY,r=Number.NEGATIVE_INFINITY}}}function br({gapMs:e=5e3,intervalMs:t=1e3}={}){let a=null;return{tick:i=>{if(a===null)return a=i,!1;let r=i-a;return a=i,r>Math.max(e,t*2)},reset:()=>{a=null},intervalMs:t}}var bt="pocket",Ya={section:"手机访问",title:"📱 手机访问",subtitle:"手机扫码打开的就是电脑上的这个界面，实时同步",developer:"开发者：大哈",starAsk:"⭐ 顺手留颗 Star，大哈能高兴一整天",starCta:"好，这就去 Star",restarted:"已重启",reloadFailed:"自动刷新没成功（新进程可能还在启动）",reloadNow:"刷新页面",ok:"知道了",loadingStatus:"正在读取状态…",offlineHint:"暂时连不上宿主（可能正在重启），恢复后会自动刷新状态",updateFailedTitle:"更新失败",later:"稍后",bgHint:"进程在后台运行（不挂终端）。如需停止：{cmd}",updatedRestart:"已更新 v{ver}，重启生效",updateAutoRestarting:"已更新 v{ver}，正在自动重启…",updatedOk:"已更新 v{ver}",updateAvailable:"新版本 v{ver}",updating:"更新中…",updateTo:"更新到 v{ver}",restartingNow:"正在重启生效…",restarting:"重启中…",restartNow:"🔄 重启 dsh web 生效",updatingDetail:"⏳ 更新中（通常 1-2 分钟）· 已等待 {s} 秒",restartingDetail:"⏳ 正在重启生效（通常 10-30 秒）· 已等待 {s} 秒",updatedAutoDetail:"已更新，正在自动重启生效，请稍候刷新",updatedRestartDetail:"已更新，重启 dsh web 生效",updateFailed:"失败：{err}（手动更新：dsh plugin --profile web update dsh-pocket --latest -w）",versionRange:"当前 v{cur} → 最新 v{latest}",wanAccess:"公网访问",publicConfig:"公网配置",publicSetupHint:"不提供现成公网地址。请先配置自己的 Cloudflare 域名与 Tunnel Token；未配置时公网保持关闭，保存配置不会自动开启。",publicConfigure:"配置公网访问",pinLabel:"访问密码",advAddress:"高级 · 手动选地址",wanOffHint:"公网已关闭。开启后可通过自配固定域名从任何网络访问（每次开启需确认免责声明）",resetFactory:"🧹 恢复出厂设置",resetGo:"恢复",resetIntro:"设置搞出问题时的临时兜底：清空本机配置并重设随机密码（DSH 的会话、模型、插件配置不受影响）",resetTitle:"⚠️ 确认恢复出厂设置？",resetBody:`将清空并恢复默认：
① 开关：局域网访问=开、访问密码=开、手机端右边栏=开、局域网地址=自动
② 公网：关闭公网访问，清空 Tunnel Token、固定域名与自动恢复标记；重新配置前保持关闭
③ 密码：公网和局域网都换成新的随机 8 位密码（旧密码立即作废，手机需重新输入）

DSH 自身的会话、模型、插件配置不受影响；此操作不可撤销。`,resetConfirm:"确认恢复",resetDone:"✅ 已恢复出厂设置：设置已清空，密码已换新（手机需重新输入）",resetFailed:"❌ 恢复失败，请重试",resetPartial:"⚠️ 重置不完整：部分设置或密码没能写入磁盘，详情见下方提示",pinSaveMemoryOnly:"⚠️ 密码只在本次运行有效：写入磁盘失败，重启后会失效",lanTitle:"📶 局域网（同一 WiFi）",lanHint:"手机连接同一 WiFi 后扫码即可打开",lanAccess:"局域网访问",lanDisabledHint:"局域网访问已关闭：手机扫码/链接均不可用（公网不受影响）。点「开」恢复。",lanToggleTitleOff:"关闭局域网访问",lanToggleBodyOff:"关闭后，同一 WiFi 下的手机将无法扫码访问（局域网二维码/链接立即失效）。公网访问不受影响。确定关闭？",lanToggleTitleOn:"开启局域网访问",lanToggleBodyOn:"开启后，同一 WiFi 的手机扫码即可访问（默认需输入局域网密码）。确定开启？",confirm:"确定",lanAddress:"局域网地址",lanAddressAuto:"自动（推荐）",lanPin:"局域网访问密码",on:"开",off:"关",lanPinValue:"🔐 访问密码：{pin}（手机打开需输入；与公网密码分开）",lanPinCustomValue:"🔐 访问密码：{pin}（自定义；手机打开需输入）",refresh:"刷新",customize:"自定义",customizing:"新密码（8–64 位，英文字母或数字）：",save:"保存",cancel:"取消",pinInvalid:"密码必须是 8–64 位英文字母或数字",pinCharsFiltered:"只保留英文字母和数字，其他字符已被忽略",pinCustomHint:"自定义密码不会自动换新；泄露后请主动修改",lanPinOff:"🔓 密码已关闭：扫码直连，无需密码（仅同一局域网设备可访问；公网仍要密码）",lanPinRemoteHint:"为避免公网访客拿到局域网密码，这里只在本机/局域网内显示；需要查看请改用局域网地址打开设置。",lanPinUnavailable:"暂时读不到局域网访问密码，请刷新页面重试。",lanLocalOnly:"局域网入口的开/关与地址只允许在本机或局域网内修改；你现在是通过公网隧道访问的。",wanLocalOnly:"公网隧道的开启/停止与配置只允许在本机或局域网内操作；通过隧道访问时只能查看状态。",resetLocalOnly:"恢复出厂设置只允许在本机或局域网内执行。",lanStarting:"代理未就绪…",mobileRightbar:"手机端右边栏",mobileRightbarHint:"显示原生右边栏入口；普通手机可按需关闭，折叠屏展开后使用更方便",prefsTitle:"手机端偏好",prefsHint:"这些开关只影响手机上的显示，桌面端不受影响",statusOn:"已开启",statusOff:"已关闭",statusConnected:"已连接",mobilePinchZoom:"手机端两指捏合缩放",mobilePinchZoomHint:"默认关闭：两指捏合禁用、页面锁定 1x；开启后恢复捏合，页面意外被放大时可用它还原",mobileFontSize:"手机端字号",mobileFontSizeHint:"默认「跟随桌面」，桌面改字号时手机同步变化；选择具体字号后仅手机会话正文独立变化，不影响桌面设置",mobileFontFollow:"跟随桌面",wanTitle:"🌐 公网（人在外面）",wanHint:"需先自行配置 Cloudflare 固定域名与 Tunnel Token，开启后可从任何网络访问",wanPin:"🔐 访问密码：{pin}（启停或重启不会自动换新；手机打开链接需输入）",wanPinCustom:"🔐 访问密码：{pin}（自定义；启停或重启不会自动换新）",stopTunnel:"关闭公网",enable:"开启公网访问",opening:"开启中…",namedSummary:"固定域名：{host} · Token {token}",namedTokenSet:"已配置",namedTokenMissing:"未配置",namedEdit:"修改",namedHostnameLabel:"固定域名：",namedTokenLabel:"Tunnel Token（留空 = 保持不变）：",namedHow:"请用自己的 Cloudflare 账号和域名，在 Zero Trust → Networks → Tunnels 创建命名隧道并复制 Token；自行添加 Public Hostname 路由，将 Service 指向本机实际代理端口（通常为 http://127.0.0.1:3081，改过端口请相应修改）。保存配置不会自动开启公网。",namedSecurity:"固定域名长期可被发现、更易被扫描。请设置自定义强密码并用完即关；公网密码不会随启停或重启自动换新，泄露后请主动修改。",namedNeedCfg:"请先填写自己的 Cloudflare 固定域名与 Tunnel Token",namedRunningHint:"自配固定域名（Cloudflare 命名隧道）——地址不随重启变化",namedWanHint:"仅支持自配 Cloudflare 固定域名与 Tunnel Token；未配置时公网保持关闭",namedTakeEffect:"配置已保存，不会自动开启公网；如公网正在运行，需关闭并重新开启后生效",disclaimerTitle:"⚠️ 安全免责声明",disclaimerBody:"开启公网 = 把本机 DSH（能执行代码）暴露到互联网。任何人拿到公网链接和密码，都能访问甚至操作你的电脑。请确认：① 使用自定义强密码或妥善保管自动密码；② 用完立即「关闭公网」；③ 公司/涉密网络请先确认合规。",disclaimerAgree:"我已知情，同意开启",disclaimerHint:"请勾选「我已知情」后再开启公网",downloading:"⏳ 下载 cloudflared（首次约 20-50MB，通常 1-2 分钟；之后秒开）· 已等待 {s} 秒",connecting:"⏳ 连接 Cloudflare 边缘（通常 5-30 秒）· 已等待 {s} 秒{suffix}",slowHint:" — 有点久？检查是否开着代理/VPN（Clash TUN 等）",error:"❌ 开启失败：{detail}（可重试；若是代理/VPN 问题见 README 排障）",unknownError:"未知错误",feedback:"有问题？欢迎到 GitHub Issues 反馈 🙏",fileGuardMsg:"手机上无法直接打开电脑上的文件",fileCopy:"复制",fileCopyDone:"已复制文件内容（{kb} KB）",fileCopyFailed:"复制失败",fileCopyFailedFallback:"复制失败，下方可长按选择",fileFallbackTitle:"复制失败，长按下方文本选择",fileFallbackClose:"关闭",fileTooLarge:"文件过大（{size}MB），已跳过复制",fileTruncated:"…已截断",copyLink:"复制链接",copied:"✅ 已复制地址",copyFailed:"复制失败，请长按地址手动复制",pinShow:"显示",pinHide:"隐藏"},gr={section:"Phone access",title:"📱 Phone access",subtitle:"The phone shows this exact screen, live",developer:"Developer: daha1216 (大哈)",starAsk:"⭐ Drop a Star if it helped — it makes daha1216’s day",starCta:"★ Star it on GitHub",restarted:"Restarted",reloadFailed:"Auto-reload did not go through (the new process may still be starting)",reloadNow:"Reload",ok:"Got it",loadingStatus:"Loading status…",offlineHint:"Cannot reach the host right now (it may be restarting); status refreshes automatically once it is back",updateFailedTitle:"Update failed",later:"Later",bgHint:"Running in the background (not attached to a terminal). To stop: {cmd}",updatedRestart:"Updated to v{ver} — restart to apply",updateAutoRestarting:"Updated to v{ver} — auto-restarting…",updatedOk:"Updated to v{ver}",updateAvailable:"Update available: v{ver}",updating:"Updating…",updateTo:"Update to v{ver}",restartingNow:"Restarting to apply…",restarting:"Restarting…",restartNow:"🔄 Restart dsh web now",updatingDetail:"⏳ Updating (usually 1-2 min) · {s}s elapsed",restartingDetail:"⏳ Restarting to apply (usually 10-30s) · {s}s elapsed",updatedAutoDetail:"Updated — auto-restarting in progress, refresh shortly",updatedRestartDetail:"Updated — restart dsh web to apply",updateFailed:"Failed: {err} (manual update: dsh plugin --profile web update dsh-pocket --latest -w)",versionRange:"Current v{cur} → latest v{latest}",wanAccess:"Public access",publicConfig:"Public configuration",publicSetupHint:"No ready-made public address is provided. Configure your own Cloudflare hostname and Tunnel Token first. Public access stays off until configured; saving does not start it.",publicConfigure:"Configure public access",pinLabel:"Access PIN",advAddress:"Advanced · Pick address",wanOffHint:"Public access is off. Enable it to use your configured hostname from any network (accept the disclaimer on each enable).",resetFactory:"🧹 Factory reset",resetGo:"Reset",resetIntro:"Temporary fallback when settings break: clear local config and re-roll random PINs (DSH sessions, models and plugin config are untouched)",resetTitle:"⚠️ Confirm factory reset?",resetBody:`This clears and restores defaults:
① Switches: LAN access on, access PIN on, mobile right sidebar on, LAN address auto
② Public: access stopped; Tunnel Token, fixed hostname and auto-restore marker cleared. Public access stays off until configured again
③ PINs: both public and LAN become new random 8-character PINs (old ones stop working; the phone must re-enter)

Your DSH sessions, models and plugin config are untouched. This cannot be undone.`,resetConfirm:"Reset",resetDone:"✅ Factory reset done: settings cleared and PINs re-rolled (re-enter the PIN on your phone)",resetFailed:"❌ Reset failed — please retry",resetPartial:"⚠️ Reset incomplete: some settings or PINs could not be written to disk — see the hint below",pinSaveMemoryOnly:"⚠️ PIN is only valid for this run: writing to disk failed, so it reverts after a restart",lanTitle:"📶 LAN (same Wi-Fi)",lanHint:"Scan to open once your phone is on the same Wi-Fi",lanAccess:"LAN access",lanDisabledHint:'LAN access is off — the QR code and link are unavailable (public access is unaffected). Tap "On" to restore.',lanToggleTitleOff:"Turn off LAN access",lanToggleBodyOff:"Once off, phones on the same Wi-Fi can no longer scan to connect (the LAN QR code and link stop working immediately). Public access is unaffected. Turn it off?",lanToggleTitleOn:"Turn on LAN access",lanToggleBodyOn:"Once on, phones on the same Wi-Fi can scan to connect (a LAN PIN is required by default). Turn it on?",confirm:"Confirm",lanAddress:"LAN address",lanAddressAuto:"Auto (recommended)",lanPin:"LAN access PIN",on:"On",off:"Off",lanPinValue:"🔐 PIN: {pin} (required on the phone; separate from the public PIN)",lanPinCustomValue:"🔐 PIN: {pin} (custom; required on the phone)",refresh:"Refresh",customize:"Customize",customizing:"New PIN (8–64 chars, letters/digits): ",save:"Save",cancel:"Cancel",pinInvalid:"PIN must be 8–64 characters (letters and digits only)",pinCharsFiltered:"Only letters and digits are kept; other characters were ignored",pinCustomHint:"Custom PINs do not rotate automatically; change yours if it leaks.",lanPinOff:"🔓 PIN off — scan & go, no PIN (LAN devices only; public still requires PIN)",lanPinRemoteHint:"Hidden over the tunnel so public visitors cannot read the LAN PIN. Open Settings via the LAN address to view it.",lanPinUnavailable:"Couldn't read the LAN PIN; refresh the page and try again.",lanLocalOnly:"LAN access can only be toggled or re-addressed from the host or the local network; you are visiting through the public tunnel.",wanLocalOnly:"Starting, stopping and configuring the public tunnel is local-only; over the tunnel you can only view its status.",resetLocalOnly:"Factory reset can only be run from the host or the local network.",lanStarting:"Proxy starting…",mobileRightbar:"Mobile right sidebar",mobileRightbarHint:"Show the native right-sidebar entry; disable it for a compact phone header or keep it on for an unfolded display",prefsTitle:"Mobile preferences",prefsHint:"These options only affect the phone layout; the desktop is untouched",statusOn:"On",statusOff:"Off",statusConnected:"Connected",mobilePinchZoom:"Mobile pinch zoom",mobilePinchZoomHint:"Off by default: two-finger pinch disabled, page locked at 1x; turn on to restore pinch for recovering from accidental zoom",mobileFontSize:"Mobile font size",mobileFontSizeHint:'Defaults to "Follow desktop", so desktop font changes also affect the phone. Choose a specific size for independent mobile conversation text without changing the desktop setting.',mobileFontFollow:"Follow desktop",wanTitle:"🌐 Anywhere (public)",wanHint:"Configure your own Cloudflare fixed hostname and Tunnel Token first, then enable access from any network.",wanPin:"🔐 PIN: {pin} (not rotated on stop/start or restart; required on the phone)",wanPinCustom:"🔐 PIN: {pin} (custom; not rotated on stop/start or restart)",stopTunnel:"Stop",enable:"Enable anywhere",opening:"Enabling…",namedSummary:"Fixed domain: {host} · Token {token}",namedTokenSet:"configured",namedTokenMissing:"not set",namedEdit:"Edit",namedHostnameLabel:"Fixed domain:",namedTokenLabel:"Tunnel Token (blank = keep current):",namedHow:"Use your own Cloudflare account and domain. Create a named tunnel in Zero Trust → Networks → Tunnels, copy its Token, and add a Public Hostname route yourself. Point its Service to the actual local proxy port (usually http://127.0.0.1:3081; adjust if changed). Saving does not start public access.",namedSecurity:"A fixed hostname remains discoverable and is easier to scan. Use a strong custom PIN and turn access off when done. The public PIN does not rotate on stop/start or restart; change it yourself if it leaks.",namedNeedCfg:"Set your own Cloudflare fixed hostname and Tunnel Token first",namedRunningHint:"Your configured hostname (Cloudflare named tunnel) — unchanged on restart",namedWanHint:"Requires your own Cloudflare fixed hostname and Tunnel Token; public access stays off until configured.",namedTakeEffect:"Configuration saved; public access is not started automatically. If it is running, turn it off and on again to apply changes.",disclaimerTitle:"⚠️ Security disclaimer",disclaimerBody:"Enabling public access exposes this computer’s DSH (which can execute code) to the internet. Anyone with the public link and PIN can reach — and operate — your computer. Please confirm: ① use a strong custom PIN or keep the auto-generated one safe; ② turn public access OFF as soon as you’re done; ③ on a corporate/classified network, confirm compliance first.",disclaimerAgree:"I understand and agree",disclaimerHint:'Check "I understand" before enabling public access',downloading:"⏳ Downloading cloudflared (first run ~20-50MB, usually 1-2 min; instant afterward) · {s}s elapsed",connecting:"⏳ Connecting to Cloudflare edge (usually 5-30s) · {s}s elapsed{suffix}",slowHint:" — taking long? Check for a proxy/VPN (e.g., Clash TUN)",error:"❌ Failed to enable: {detail} (you can retry; for proxy/VPN issues see the README)",unknownError:"unknown error",feedback:"🙏 Questions? Open an issue on GitHub",fileGuardMsg:"Cannot open a file stored on your computer directly from the phone",fileCopy:"Copy",fileCopyDone:"File content copied ({kb} KB)",fileCopyFailed:"Copy failed",fileCopyFailedFallback:"Copy failed — long-press below to select instead",fileFallbackTitle:"Copy failed — long-press the text below to select it",fileFallbackClose:"Close",fileTooLarge:"File too large ({size}MB), copy skipped",fileTruncated:"… truncated",copyLink:"Copy link",copied:"✅ Address copied",copyFailed:"Copy failed — long-press the address to copy it manually",pinShow:"Show",pinHide:"Hide"};var Sd=`/* pocket 控件/门控样式：刻意不加媒体查询——mobileApply 启动时写入的
     body[data-dsh-pocket-layout] 就是门（desktop 布局在写入之后才早退，选择器
     天然不命中；?dsh-layout=mobile 强制移动的宽桌面也依赖这些规则，宽度媒体
     反而会漏掉它）。 */
  /* ---------- iOS 双击智能缩放治理（2026-10-14 真机反馈：双击/轻点页面自己放大） ----------
     根规则 html,body{touch-action:pan-y pinch-zoom} 的交集止于第一个滚动容器
     （上游 layout.css 注释自述），消息/会话/文件等纵向滚动区内部的双击缩放
     一直没被覆盖。对 frame 内的纵向滚动容器补同值：不带 pan-x，左缘抽屉
     手势照旧不被浏览器抢走；pinch-zoom 保留 #45 捏合逃生口；代码块等横向
     滚动内容是更内层的 scroll container，由最内层规则接管，不受影响。 */
  body[data-dsh-pocket-layout="mobile"] [data-mobile-nav="frame"] [class*="scrollBody"] {
    touch-action: pan-y pinch-zoom !important;
  }

  /* ---------- 两指捏合缩放开关（2026-10-14）：默认关，全拦 ----------
     设置层写 body[data-dsh-pocket-pinch-zoom]（默认 off）；off 时去掉
     pinch-zoom 令牌（Android 侧 touch-action 即生效），iOS 侧由下方 H3
     手势锁双向全拦兜底。注意：关闭期间若浏览器自行放大视口（#45 场景）
     将无法捏合还原，只能重开页面——提示文案已写在设置页开关下方。 */
  body[data-dsh-pocket-pinch-zoom="off"],
  body[data-dsh-pocket-pinch-zoom="off"] [data-mobile-nav="frame"] [class*="scrollBody"] {
    touch-action: pan-y !important;
  }

  /* ---------- 宿主没有 aionui explorer 列时隐藏「文件浏览」入口（issue #48） ----------
     官方 DeepSeek Harness 不带 dsh-web-ui；explorer 列存在与否由下方探测 effect
     标到 frame 上（data-mobile-nav-explorer）。没有列时这两个入口点了没反应。 */
  body[data-dsh-pocket-layout="mobile"] [data-mobile-nav-explorer="0"] [data-mobile-nav="files"],
  body[data-dsh-pocket-layout="mobile"] [data-mobile-nav-explorer="0"] [data-mobile-nav="explorer"] {
    display: none !important;
  }

  /* ---------- 隐藏「添加工作区」入口（issue #17 修正：手机上配工作区无意义） ----------
     图标按钮的 aria-label 随语言变化，两种都覆盖；下拉菜单里的文本项由
     fileGuard.ts 的 MutationObserver 按文案兜底隐藏。由布局属性门控：
     桌面窄窗（auto→desktop）不隐藏，强制 mobile 的宽桌面要隐藏。 */
  body[data-dsh-pocket-layout="mobile"] button[aria-label="添加工作区"],
  body[data-dsh-pocket-layout="mobile"] button[aria-label="添加工作区…"],
  body[data-dsh-pocket-layout="mobile"] button[aria-label="Add workspace"],
  body[data-dsh-pocket-layout="mobile"] button[aria-label="Add workspace…"] {
    display: none !important;
  }

  /* ---------- 文件链接旁的「复制」按钮（issue #17：复制文件内容） ----------
     由 fileGuard.ts 注入，这里兜底样式。M10：实体 22→30px 高、字号 11→12px
     （原尺寸在手指下太抠，30px 仍保持行内紧凑视觉）；剩余触距用 ::after 向外
     扩 6px 补足（Apple HIG 44pt 触控标准的折中：实体紧凑、点区达标，与上游
     扩点伪元素同款手法），自身 position:relative 提供扩区的定位上下文。 */
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
  /* ---------- 右上角双入口冲突治理（0.1.7-rc.2 实测，2026-09-28 合并时发现） ----------
     rc.2 宿主把「右侧栏展开」经 dsh-client-ui-sidebar-right 注入
     conversation.session.header.corner 槽 → header 顶层 div[data-conversation-
     header-corner]（稳定属性，代际安全）。上游 dsh-web-mobile v3.0.3 的两条 corner
     规则分别锚 0.1.6-alpha.2（titleRow 内 + wSkVaW_ 哈希前缀）与 0.1.5（:first-child
     > :last-child）——rc.2 上结构与哈希都已变（D_tfqW_、corner 移到 header 顶层），
     两条全不命中 → 原生 corner 与插件绝对定位的 files 按钮（right:8px）叠在右上角。
     解法取自 dsh-pocket 上游（其 mobile.css.ts 用同一稳定属性 + 本开关）：
     - mobileRightbarEnabled=off → 藏原生 corner，files 独占右上角（web-mobile 的
       设计几何）；
     - 开关默认 on → corner 可见，files 左移 44px 让位（数值同上游实测）。
     特异性：本组覆盖选择器 (0,3,x) 均高于被覆盖的 (0,1,0)/(0,5,1 旧结构规则在
     rc.2 本就不命中)，不赌标签顺序。两态都带 body[data-dsh-pocket-layout] 门：
     桌面布局不藏宿主原生入口。 */
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

  /* ---------- 移动端独立字号（2026-10-18 用户要求：手机调字号不影响桌面） ----------
     宿主把「字号大小」写在 body 的 --dsh-content-font-size 上，delta / secondary /
     markdown 字号 token 等派生值全部由它 calc。这里只在「手机布局 + 用户选了独立
     字号」两个条件同时成立时替换这一个轴；!important 用于压过宿主写在 body 上的
     内联值，桌面布局选择器不命中，桌面字号保持原样。 */
  body[data-dsh-pocket-layout="mobile"][data-dsh-pocket-mobile-font] {
    --dsh-content-font-size: var(--dsh-pocket-mobile-font-size) !important;
  }

  /* ---------- 会话行悬停卡片 ----------
     宿主把它挂在 body 下（不在 [data-phase] 内，上游的 tooltip 抑制规则够不着）。
     触屏点一下会话行会模拟 hover，卡片残留在抽屉右侧并溢出屏幕。
     选择器刻意不用「body >」直接子匹配：宿主经 portal 容器挂载时会隔一层 div，
     直接子匹配会漏（卡片类名 _card/_copyable + role=button 组合只属于这类悬停
     卡，去掉大于号不会误伤消息卡）。 */
  body [role="button"][class*="_card"][class*="_copyable"] {
    display: none !important;
  }

  /* ---------- 新会话页多余的右边栏开关 ----------
     宿主 headerBlank 的 titleRow 把「打开右侧边栏」塞在左上角（会话页在右上角
     是对的），紧贴 pocket 的 FAB，看着像多出来的按钮。新会话阶段没有右栏内容，
     直接隐藏；会话页（phase=active）不受影响。 */
  [data-phase="hero"] button[data-sidebar-right-expand] {
    display: none !important;
  }

  /* ---------- 小触点扩大点击区（粗指针） ----------
     宿主按钮普遍只有 22–28px：输入栏（加号/访问模式/模型）、会话头部
     （智能体团队 22×24/更多操作/Watcher/侧边栏开关）、抽屉（搜索/视图选项/
     收起侧边栏/新建会话/展开其余）、hero 的工作区与模式选择器。
     用伪元素把可点区向外扩，不改布局；相邻按钮的实体盒在自己的层绘制，
     不会被邻位的扩区抢走核心点击。分两档（实测间距定值）：
     - 紧凑档 -5px -2px：hero 工作区行 gap:2、会话头部工具组 gap:4、抽屉图标/
       列表行紧邻——横向最多 -2px，恰好吃满 2px 缝隙、绝不越界进邻盒；
     - 输入卡档 -8px：卡内行 gap:12/8，四向扩张都只落在空隙里。
     两档都加 :not(:disabled)：禁用按钮不派发 click，扩区若越到邻位会变成
     按不着的死条。三条边界（均实测核对过 computed ::after）：① 会话头部 tabs
     （对话/轨迹/版本/分叉）自带装饰性 ::after（选中下划线 inset:27px 0 -1），
     套我们的 inset 会把下划线撑成大色块——绝不扩它们；② 消息流内密集小操作簇
     （复制/编辑/反馈，间距仅几像素）不扩——互相抢点反而更难点；③ 抽屉整棵树
     挂在 [data-phase] 之外（实测 inPhase=false），抽屉控件的选择器必须不带
     [data-phase] 前缀，否则永远匹配不到（这些 aria-label 只属于抽屉，去掉
     前缀无误伤）。④ v3.0.3 起设置 sheet/快捷键弹层 portal 到 body，无 [data-phase]
     前缀的 aria-label 选择器一律加 :not([aria-modal] *)，弹层内同文案按钮不扩点
     （弹层自带足够密度的布局，误扩会盖邻位）。 */
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
  /* 紧凑档：横向 -2px 吃满最小缝（gap:2/4），纵向 -5px。 */
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
  /* 输入卡档（放最后：与 hero 规则同等特异性，靠后声明让卡内按钮拿到 -8px）。 */
  [data-phase] [data-composer-card] button:not(:disabled)::after {
    content: "";
    position: absolute;
    inset: -8px;
  }

  /* ---------- H5 横屏刘海 safe-area 左右缘 ----------
     全项目（上游 + 本层）此前零处 safe-area-inset-left/right：上游只处理了竖屏的
     top（状态栏）与 bottom（home indicator）。iPhone 横屏（宽 844-932px，仍
     <1024，移动布局激活）时刘海落在屏幕左右缘，FAB（上游 base.css.ts left:10px）、
     抽屉内容、底部 sheet（上游一律 left/right:8px）会被刘海压住。
     为何放 POCKET_EXTRA_CSS：upstream/ 是整目录同步的上游镜像（sync 脚本覆盖，
     手改必丢——零手改原则），只能在 pocket 层以同特异性 + 后加载 + !important 压过。
     为何这一段（与本文件其它段不同）套媒体查询：被覆盖的上游规则本身全部住在
     (max-width:1023px) and (pointer:coarse) 臂内，覆盖必须与被覆盖同臂——否则
     断点翻宽后上游已回退桌面布局（aionui 列恢复网格列、delete-dialog 卸载），
     这里的 left/right !important 却残留，会把桌面网格列拽离原位。竖屏/无刘海
     设备 env() 恒 0，全部零位移。 */
  @media (max-width: 1023px) and (pointer: coarse) {
    /* a) frame 容器：上游同选择器已写 padding-top（layout.css.ts，竖屏让出状态
       栏），这里补左右两缘——中列（会话头/消息流/输入卡）是 in-flow 子元素，
       吃 frame 的 padding，直接让出刘海。 */
    [data-mobile-nav="frame"],
    div[class*="_frame"]:has(> div[class*="_centerCol"]) {
      padding-left: env(safe-area-inset-left, 0px) !important;
      padding-right: env(safe-area-inset-right, 0px) !important;
    }
    /* 抽屉：绝对定位子元素（containing block = frame 的 padding box），上一条的
       frame padding 挪不动它（padding 不影响绝对定位后代的偏移基准），需要自带
       padding-left 把内容让出左侧刘海；抽屉宽 ≤92vw，右侧到不了屏幕右缘，不需要。 */
    [data-mobile-nav="frame"] > :first-child,
    div[class*="_frame"]:has(> div[class*="_centerCol"]) > :first-child {
      padding-left: env(safe-area-inset-left, 0px) !important;
    }
    /* b) FAB（上游 base.css.ts left:10px）：max() 保证无刘海时仍是 10px。 */
    [data-mobile-nav="fab"] {
      left: max(10px, env(safe-area-inset-left, 0px)) !important;
    }
    /* c) 底部 sheet/面板：上游 base.css.ts 的 delete-dialog 与 compat.css.ts 的
       explorer/preview 两列 sheet 全是 left/right:8px。全屏预览态（compat.css.ts
       的三标记 + full 选择器，特异性更高）不受影响。fileGuard 的长按 fallback
       面板是内联样式，在 fileGuard.ts 里直接写同款 max()。 */
    /* 回归修复：aionui 两列选择器单独加 html 前缀提特异性——上游 compat.css 对
       同名选择器写有同特异性 left/right:8px !important，且其 style 标签用
       setTimeout(0) 把自己重排到 head 末尾（同特异性 + !important 对拼时后加载
       者胜，纯赌顺序），赌输则本覆盖整条失效。html 前缀加一档特异性后无论谁
       排在后都稳赢。delete-dialog 不加前缀：上游 base.css 对它没有同值竞争，
       !important 已稳赢，无需陪绑。 */
    [data-aionui-explorer-col],
    html [data-aionui-explorer-col],
    html [data-aionui-preview-col] {
      left: max(8px, env(safe-area-inset-left, 0px)) !important;
      right: max(8px, env(safe-area-inset-right, 0px)) !important;
    }

    /* ---------- M3 键盘期 overlay 协调 ----------
       iOS 软键盘弹起只收缩 visual viewport，fixed 元素仍锚 layout viewport。
       --dshp-kb 由 mobile-apply.tsx 的 effect 监听 visualViewport resize/scroll
       按帧写入 documentElement；键盘收起或 Android（resize 整个视口，差值 ≈0）时
       恒 0px，规则退化为无位移。fileGuard 的 toast/fallback 是内联样式，直接在
       fileGuard.ts 用该变量。FAB 无需处理：它是 frame 内绝对定位、top 锚定，
       永远在屏幕上部，键盘盖不到。
       删除确认卡（2026-09-28 v3.0.3 同步后重写）：上游把卡改成 backdrop
       （fixed inset:0 flex 居中）的 position:static 子元素，bottom/left/right 对它
       全部无效（旧覆盖已死）。改用 translateY 抬升半键盘高——卡原居屏幕中线，
       键盘占掉下半屏后抬一半正好让按钮带留在可视区；0px 时零位移。 */
    [data-mobile-nav="delete-dialog"] {
      transform: translateY(calc(-0.5 * var(--dshp-kb, 0px))) !important;
    }

    /* ---------- M3b 键盘期 composer 座位抬升（2026-09-29 真机反馈：键盘挡住输入内容） ----------
       宿主只在 [data-phase=active]（有内容的会话）给座位 position:sticky;bottom:0，
       钉在滚动视口底=布局视口底；iOS 与 Android(resizes-visual) 的软键盘只收缩
       visual viewport、布局视口不动 → 座位连同输入行整排沉到键盘底下。hero 态
       （空会话）座位更是静态居中，同样被键盘盖。键盘开态统一补 sticky + 把偏移
       改为键盘高度（html[data-dshp-kb="open"] 由 --dshp-kb 写入方同点维护）：
       sticky 只上推不下压——active 态座位钉到可视视口底；hero 态自然位在阈值之上
       时零位移、被键盘压到时同样自动上抬，一条规则通吃两形态。kb 公式已减
       vv.offsetTop，浏览器为露出焦点而滚动页面时偏移自洽。收起态（属性缺席）
       规则不命中，宿主原定位逐字节保留。刻意不用 translateY：座位子树里的
       fixed 弹层（plus 菜单等）会被 transform 变成 containing block，锚定全乱。
       html 前缀与三锚点选择器族同上游座位 padding 规则（防类名哈希代际漂移），
       特异性手法同 M2。
       键盘开态同时置 transform:none（10-14 键盘案）：上游 composer-keyboard-lift
       会给座位内联 translateY 抬升——与本规则双抬叠加、且让座位子树 fixed 弹层
       （plus 菜单）失去锚点。统一到 sticky 单机制：!important 压过上游内联样式，
       通道校验 fail-open 时也绝不再漏抬。 */
    html[data-dshp-kb="open"] [data-mobile-nav="frame"] [class*="_composerSeat"],
    html[data-dshp-kb="open"] div[class*="_frame"] [class*="_composerSeat"],
    html[data-dshp-kb="open"] [data-mobile-nav="frame"] [data-phase] [class*="_composerSeat"] {
      position: sticky !important;
      bottom: var(--dshp-kb, 0px) !important;
      transform: none !important;
    }

    /* ---------- settling 卡死兜底（2026-10-28 反馈：宿主重连后输入框会消失） ----------
       宿主把输入栏可见性绑在 data-phase 上：ConversationMainPanel 的
         settling = sessionId !== undefined && (shellPhase === "blank" &&
                    openState === "loading" && summaryBlank !== true ||
                    parentAvailabilityPending)
       命中时 [data-phase=settling] [class*=_composerSeat] { visibility: hidden }——
       座位仍在文档流里占位，只是不可见。
       而 openState 只由 Session.doOpen 的 try/catch 推进：events.open() 在重连期
       挂在 RemoteStreamMuxClient.waitForSocket 上就永远停在 "loading"；抛非
       RemoteFailure 的异常时 catch 直接 rethrow，openState 同样停在 "loading"
       （只有 isRemoteFailure 才置 "error"）。重连后 manager.handleConnected()
       只清 projectionStores、重拉 list/projections，不碰任何 Session 的
       openState——这个 "loading" 再没人接手。于是座位永久不可见，只有离开再进
       会话（重新 retain → open()）才恢复。
       本文件下方的 settling 看门狗在「连接正常 + settling 持续超过阈值」时给同一
       根节点打 data-dshp-settling-stale，此处按标记还原可见性：即使用户侧修复
       （resync）因宿主形状变化没能生效，用户也绝不会被锁在「没有输入框」的死局。
       特异性：上游是 .root[data-phase=settling] .composerSeat = (0,3,0) 且无
       !important；本条同档但带 html 前缀并加 !important，稳赢，不赌标签顺序。 */
    html [data-phase="settling"][data-dshp-settling-stale] [class*="_composerSeat"],
    html [data-content-phase="settling"][data-dshp-settling-stale] [class*="_composerSeat"] {
      visibility: visible !important;
    }

    /* ---------- iOS standalone 布局视口偏矮兜底（2026-09-28 真机反馈：A2HS 底部留白） ----------
       部分 iOS 版本的 standalone（添加到主屏幕）模式下，100%/dvh 参照的布局视口
       不含底部一段真实窗口（innerHeight < visualViewport.height，键盘收起且未缩放
       时仍成立）。视口守卫 effect（本文件下方）检测到该态持续 600ms 后：写
       --dshp-frame-h（= 可视高度）并给 html 标 data-dsh-pocket-full-height；此处把
       html/body 高度链顶满真实窗口（frame 是 100% 高度链的后代，自然跟着顶满）。
       标记与变量任一缺席时规则不命中，行为与旧版逐字节一致——不赌宿主原始
       html 高度写法是什么。 */
    html[data-dsh-pocket-full-height],
    html[data-dsh-pocket-full-height] body {
      height: var(--dshp-frame-h, 100%) !important;
    }

    /* 10-14 空白案补注：html/body 顶满只对「frame 是纯 100% 高度链后代」成立——
       中间任何一层被 100vh（B 态下 = 矮布局视口，如 660）截断时顶满传导不到
       frame，底部仍空出等于差值的一条带。给 frame 本体（reconciler 的
       data-mobile-nav="frame" 标记；健康态高度本就等值）直接补一跳，双保险。
       max-height 同值：单写 height 会被中间层的 max-height:100vh 压回。 */
    html[data-dsh-pocket-full-height] [data-mobile-nav="frame"] {
      height: var(--dshp-frame-h, 100%) !important;
      max-height: var(--dshp-frame-h, 100%) !important;
    }

    /* ---------- M10 上游小控件触控达标（44pt 触控标准：Apple HIG / WCAG 2.2） ----------
       上游控件以桌面视觉密度定尺寸（28-38px），手指按压容易 miss。upstream 零手改
       原则 → 在本层用 min-* 覆盖（min-height/width 会压过上游的固定 height/width）。 */
    /* 删除确认弹窗两按钮（base.css.ts [data-mobile-nav="delete-confirm-actions"]>button
       height:30px）→ 44px：破坏性操作的确认键不容 miss。 */
    [data-mobile-nav="delete-confirm-actions"] > button {
      min-height: 44px !important;
    }
    /* 抽屉品牌行「导出会话」图标（v3.2.0 起 28×28，issue #225）：不再给 min-height，
       否则会把品牌行撑高；触控目标由 wrapper 的 28px 图标 + 行内 padding 保证。 */
    /* FAB（base.css.ts 38×38）→ 44×44。 */
    [data-mobile-nav="fab"] {
      min-width: 44px !important;
      min-height: 44px !important;
    }
  }
}`;function vr(e){let t=new URL(window.location.href).searchParams.get("dsh-layout"),a=t??"",n=window.matchMedia("(max-width: 1023px) and (pointer: coarse)"),o=ur(t),i=hr({urlValue:a,stored:o,narrowMatch:n.matches});if(document.body?.setAttribute("data-dsh-pocket-layout",i),i==="desktop")return;let r=n;i==="mobile"&&(r={matches:!0,addEventListener:()=>{},removeEventListener:()=>{}});let l=a.trim().toLowerCase();l==="desktop"||l==="mobile"||l!=="auto"&&(o==="desktop"||o==="mobile")||e.effect(()=>{let s=()=>{document.body?.setAttribute("data-dsh-pocket-layout",n.matches?"mobile":"desktop")};return n.addEventListener("change",s),()=>{n.removeEventListener("change",s)}},"dsh-pocket: auto layout attribute sync on breakpoint change");let f=(s,d)=>{e.effect(()=>{let m,T=()=>{m?.(),m=r.matches?d():void 0};return T(),r.addEventListener?.("change",T),()=>{r.removeEventListener?.("change",T),m?.()}},s)};lr(e),e.effect(()=>{let s=!0,d=c=>{document.body?.setAttribute(tt,c?"on":"off")},m=c=>{d(c.detail?.enabled===!0)},T=async()=>{try{let c=await e.connection.rpc.call(Se,G.status,{});s&&d(c?.ok===!0?c.value?.mobileRightbarEnabled!==!1:!0)}catch{s&&d(!0)}};return window.addEventListener(at,m),T(),()=>{s=!1,window.removeEventListener(at,m),document.body?.removeAttribute(tt)}},"dsh-mobile-nav: optional right sidebar"),e.effect(()=>{let s=!0,d=c=>{document.body?.setAttribute(Be,c?"on":"off")},m=c=>{d(c.detail?.enabled===!0)},T=async()=>{try{let c=await e.connection.rpc.call(Se,G.status,{});s&&d(c?.ok===!0?c.value?.mobilePinchZoomEnabled===!0:!1)}catch{s&&d(!1)}};return window.addEventListener(nt,m),T(),()=>{s=!1,window.removeEventListener(nt,m),document.body?.removeAttribute(Be)}},"dsh-pocket: pinch-zoom setting"),e.effect(()=>{let s=!0,d=c=>{let C=document.body;if(!C)return;let S=Number(c);Number.isInteger(S)&&S>=12&&S<=22?(C.style.setProperty(Ae,`${S}px`),C.setAttribute(Ce,String(S))):(C.style.removeProperty(Ae),C.removeAttribute(Ce))},m=c=>{d(Number(c.detail?.size)||0)},T=async()=>{try{let c=await e.connection.rpc.call(Se,G.status,{});s&&d(c?.ok===!0&&Number(c.value?.mobileFontSize)||0)}catch{s&&d(0)}};return window.addEventListener(ot,m),T(),()=>{s=!1,window.removeEventListener(ot,m),document.body?.style.removeProperty(Ae),document.body?.removeAttribute(Ce)}},"dsh-pocket: mobile font size"),f("dsh-pocket: mobile zoom lock",()=>{let s=0,d=()=>{s=window.visualViewport?.scale??0},m=c=>{let C=c.scale,S=typeof C=="number"&&Number.isFinite(C)&&C<1;if(document.body?.getAttribute(Be)!=="on"){if(s>1.0001&&S)return;c.preventDefault();return}s>0&&s*C<=s||c.preventDefault()},T=()=>{s=0};return document.addEventListener("gesturestart",d,{passive:!1}),document.addEventListener("gesturechange",m,{passive:!1}),document.addEventListener("gestureend",T,{passive:!1}),()=>{document.removeEventListener("gesturestart",d),document.removeEventListener("gesturechange",m),document.removeEventListener("gestureend",T)}}),f("dsh-pocket: dialog focus containment",()=>{let s='[role="dialog"][aria-modal="true"]',d='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',m=[],T=p=>p.hasAttribute("data-mobile-nav")||p.parentElement?.hasAttribute("data-mobile-nav")===!0,c=p=>Array.from(p.querySelectorAll(d)).filter(M=>M.getClientRects().length>0),C=p=>!p.closest('[aria-hidden="true"], [inert]')&&p.getClientRects().length>0,S=()=>{let p=Array.from(document.querySelectorAll(s)).filter(M=>T(M)&&C(M));return p.length>0?p[p.length-1]:null},_=null,L=p=>{if(_===null||!_.isConnected||p.key!=="Tab")return;let M=c(_);if(M.length===0){p.preventDefault(),document.activeElement!==_&&_.focus({preventScroll:!0});return}let b=M[0],k=M[M.length-1],x=document.activeElement;p.shiftKey&&(x===b||!_.contains(x))?(p.preventDefault(),k.focus({preventScroll:!0})):!p.shiftKey&&(x===k||!_.contains(x))&&(p.preventDefault(),b.focus({preventScroll:!0}))};document.addEventListener("keydown",L,!0);let g=()=>{let p=S();if(p===_)return;if(_!==null&&p!==null){_=p,p.hasAttribute("tabindex")||p.setAttribute("tabindex","-1"),(c(p)[0]??p).focus({preventScroll:!0});return}if(_!==null){let k=m.pop();_=null,k!==void 0&&k.isConnected&&k.focus({preventScroll:!0});return}if(_=p,p===null)return;let M=document.activeElement;M!==null&&M!==document.body&&!p.contains(M)&&m.push(M),p.hasAttribute("tabindex")||p.setAttribute("tabindex","-1"),(c(p)[0]??p).focus({preventScroll:!0})},h=0,E=()=>{h===0&&(h=requestAnimationFrame(()=>{h=0,g()}))};g();let v=new MutationObserver(p=>{for(let M of p)if(M.type==="childList"){for(let b of M.addedNodes)if(b.nodeType===1){E();return}for(let b of M.removedNodes)if(b.nodeType===1){E();return}}});return v.observe(document.body,{childList:!0,subtree:!0}),()=>{document.removeEventListener("keydown",L,!0),v.disconnect(),h!==0&&cancelAnimationFrame(h),_?.removeAttribute("tabindex"),_=null,m.length=0}}),f("dsh-pocket: explorer availability (issue #48)",()=>{let s=()=>document.querySelector('[data-mobile-nav="frame"]'),d=0,m=()=>{d=0;let S=document.querySelector("[data-aionui-explorer-col]")!==null?"1":"0",_=s();_!==null&&_.getAttribute("data-mobile-nav-explorer")!==S&&_.setAttribute("data-mobile-nav-explorer",S)};m();let T=window.setTimeout(m,1500),c=()=>{d===0&&(d=requestAnimationFrame(m))},C=new MutationObserver(S=>{for(let _ of S){for(let L of _.addedNodes)if(L.nodeType!==3){c();return}for(let L of _.removedNodes)if(L.nodeType!==3){c();return}}});return C.observe(document.body,{childList:!0,subtree:!0}),()=>{window.clearTimeout(T),d!==0&&cancelAnimationFrame(d),C.disconnect(),s()?.removeAttribute("data-mobile-nav-explorer")}}),e.effect(()=>{let s=document.createElement("style");return s.dataset.plugin="dsh-pocket",s.dataset.pluginCss="dsh-pocket/mobile-extras.css",s.textContent=Sd,document.head.appendChild(s),()=>{s.remove()}},"dsh-pocket: mobile extra styles (issue #17/#48)"),f("dsh-pocket: settling watchdog (host reconnect leaves composer hidden)",()=>{let s="data-dshp-settling-stale",d=fr(),m=br(),T=new Map,c=0,C=0,S=!1,_=()=>performance.now(),L=()=>{let I=e.connection,H=typeof I?.generation?.getSnapshot=="function";return mr({hasGeneration:H,generation:H?I.generation?.getSnapshot?.():void 0,state:H?void 0:I?.state?.getSnapshot?.()})},g=()=>{try{let I=e.sessions?.list?.getSnapshot?.();if(I===null||typeof I!="object")return;if(typeof I.current=="string")return I.current;for(let H in I.byId){let B=I.byId[H];if(B===void 0)continue;let $=B.retainedBy?.mainView;if(typeof $=="number"&&$>0&&typeof B.id=="string")return B.id}}catch{}},h=I=>{if(I===void 0)return{};try{let H=e.sessions?.manager?.get?.(I);if(H===void 0)return{};let B=H.getSnapshot?.()?.openState;if(typeof B!="string")return{};let $="openPromise"in H?H.openPromise===null||H.openPromise===void 0?"gone":"live":"unknown";return{openState:B,openPromise:$}}catch{return{}}},E=()=>{try{let I=e.connection;typeof I?.reconnect=="function"&&I.reconnect()}catch{}},v=I=>{let H=I.getAttribute("data-conversation-session");if(typeof H=="string"&&H!=="")return H;let $=I.querySelector("[data-conversation-session]")?.getAttribute("data-conversation-session");return typeof $=="string"&&$!==""?$:void 0},p=(I,H)=>{I&&E();try{let B=(H===void 0?void 0:v(H))??g();if(B===void 0)return;let $=e.sessions?.manager?.get?.(B);if(typeof $?.resync!="function")return;$.resync()}catch{}},M=I=>{let H=T.get(I);H!==void 0&&(window.clearTimeout(H),T.delete(I))},b=I=>I.getAttribute("data-phase")==="settling"?"data-phase":I.getAttribute("data-content-phase")==="settling"?"data-content-phase":null,k=I=>{if(S||!I.isConnected||b(I)===null)return;let H=v(I)??g(),B=d.decide(I,_(),h(H));if(B.repair&&p(B.reconnect,I),!B.stale){B.waiting&&x(I,B.remainingMs??2500);return}I.getAttribute(s)===null&&I.setAttribute(s,"")},x=(I,H=2500)=>{T.has(I)||T.set(I,window.setTimeout(()=>{T.delete(I),k(I)},Math.max(0,H)))},R='[data-phase="settling"],[data-content-phase="settling"]',O=()=>{if(c=0,S)return;let I=_(),H=document.querySelectorAll(R);for(let B of Array.from(document.querySelectorAll(`[${s}]`)))b(B)===null&&(B.removeAttribute(s),d.release(B));for(let B of Array.from(H))d.observe(B,I),x(B);for(let B of Array.from(T.keys()))(!B.isConnected||b(B)===null)&&(M(B),d.release(B))},P=()=>{c===0&&!S&&(c=requestAnimationFrame(O))},z=new MutationObserver(I=>{for(let H of I){if(H.type==="attributes"){P();return}for(let B of H.addedNodes)if(B.nodeType!==3){P();return}for(let B of H.removedNodes)if(B.nodeType!==3){P();return}}});z.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-phase","data-content-phase"]});let q=()=>{d.noteLink(L(),_());for(let I of Array.from(T.keys()))M(I);P()},U=[];for(let I of["generation","state"])try{let H=e.connection[I];typeof H?.subscribe=="function"&&U.push(H.subscribe(q))}catch{}let K=()=>{d.noteResume(_());for(let I of Array.from(T.keys()))M(I);P()},Z=()=>{document.visibilityState==="visible"&&K()},te=I=>{I.persisted&&K()};return document.addEventListener("visibilitychange",Z),window.addEventListener("pageshow",te),C=window.setInterval(()=>{m.tick(_())&&K()},m.intervalMs),O(),()=>{S=!0,z.disconnect();for(let I of U)I();document.removeEventListener("visibilitychange",Z),window.removeEventListener("pageshow",te),C!==0&&window.clearInterval(C),m.reset(),c!==0&&cancelAnimationFrame(c);for(let I of T.values())window.clearTimeout(I);T.clear(),d.reset();for(let I of Array.from(document.querySelectorAll(`[${s}]`)))I.removeAttribute(s)}},"dsh-pocket: settling watchdog (host reconnect leaves composer hidden)"),f("dsh-pocket: keyboard height css var (--dshp-kb)",()=>{let s=window.visualViewport;if(s==null)return()=>{};let d=document.documentElement,m=0,T="",c=0,C=!1,S=null,_=()=>(S!==null&&S.isConnected&&S.matches("[data-composer-seat]")&&S.getClientRects().length>0||(S=Array.from(document.querySelectorAll("[data-composer-seat]")).find(h=>h.getClientRects().length>0)??null),S),L=()=>{m=0;let h=Math.max(0,window.innerHeight-s.height-s.offsetTop),E=0;if(Math.abs(s.scale-1)<.01){let M=_();if(M!==null){let b=M.getBoundingClientRect().bottom+(C?c:0);E=Math.max(0,b-s.height)}}let v=Math.min(Math.max(h,E),Math.round(window.innerHeight*.6));c=v,C=v>0;let p=`${Math.round(v)}px`;p!==T&&(T=p,d.style.setProperty("--dshp-kb",p),v>0?d.setAttribute("data-dshp-kb","open"):d.removeAttribute("data-dshp-kb"))},g=()=>{m===0&&(m=requestAnimationFrame(L))};return s.addEventListener("resize",g),s.addEventListener("scroll",g),L(),()=>{s.removeEventListener("resize",g),s.removeEventListener("scroll",g),m!==0&&cancelAnimationFrame(m),S=null,d.style.removeProperty("--dshp-kb"),d.removeAttribute("data-dshp-kb")}}),f("dsh-pocket: standalone viewport guard (scroll residue / short layout viewport)",()=>{let s=window.visualViewport;if(s==null)return()=>{};let d=document.documentElement,m=0,T=0,c=!1,C=null,S=0,_=new URLSearchParams(window.location.search).has("dshp-diag"),L=E=>{C===null&&(C=document.createElement("div"),C.dataset.dshPocketDiag="1",C.style.cssText="position:fixed;top:calc(env(safe-area-inset-top, 0px) + 2px);left:2px;z-index:2147483647;font:10px/1.4 ui-monospace,Menlo,Consolas,monospace;background:rgba(0,0,0,.65);color:#4ade80;padding:2px 6px;border-radius:4px;pointer-events:none;white-space:normal;width:calc(100vw - 8px);word-break:break-all",document.body.appendChild(C));let v=Array.from(document.querySelectorAll("[data-composer-seat]")).find(P=>P.getClientRects().length>0)??null,p=v?.closest("[data-conversation-scroll]")??null,M=p?.querySelector('[class*="_viewArea"]')??null,b=" va=-/col=-/nz=-";if(M!==null){b=` va=${Math.round(M.getBoundingClientRect().height)}/col=-/nz=-`;let P=M;for(let z=0;z<6&&P!==null;z+=1){if(P.children.length>10){let q=Array.from(P.children).filter(U=>U.offsetHeight>0).length;b=` va=${Math.round(M.getBoundingClientRect().height)} col=${Math.round(P.getBoundingClientRect().height)} nz=${q}/${P.children.length}`;break}P=P.firstElementChild}}let k=p===null?"":` sb=${p.clientHeight}/${p.scrollHeight}@${Math.round(p.scrollTop)}`,x=v===null?"":` seatB=${Math.round(v.getBoundingClientRect().bottom)}`,R=getComputedStyle(d).getPropertyValue("--dshp-kb").trim()||"0px",O=d.hasAttribute("data-dshp-kb")?1:0;C.textContent=`tag=1014.3 ih=${window.innerHeight} vv=${Math.round(s.height)} off=${Math.round(s.offsetTop)} sc=${s.scale.toFixed(2)} sy=${window.scrollY}${k}${x}${b} kbc=${R}/f=${O}`,E&&(window.clearTimeout(S),S=window.setTimeout(()=>{C?.remove(),C=null},8e3))},g=()=>{m=0;let E=s.height>=window.innerHeight-8;if(Math.abs(s.scale-1)<.01&&s.height-window.innerHeight>8){if(T===0&&(T=performance.now()),!c&&performance.now()-T>600){c=!0,d.style.setProperty("--dshp-frame-h",`${Math.round(s.height)}px`),d.style.setProperty("--dshp-vh-diff",`${Math.round(s.height-window.innerHeight)}px`),d.setAttribute("data-dsh-pocket-full-height","");let p=Array.from(document.querySelectorAll("[data-conversation-scroll]")).find(M=>M.getClientRects().length>0)??null;p!==null&&p.scrollHeight-p.scrollTop-p.clientHeight<=8&&requestAnimationFrame(()=>{c&&p.isConnected&&(p.scrollTop=p.scrollHeight)}),L(!0)}}else T=0,c&&(c=!1,d.style.removeProperty("--dshp-frame-h"),d.style.removeProperty("--dshp-vh-diff"),d.removeAttribute("data-dsh-pocket-full-height"));!c&&E&&(window.scrollY>1||s.offsetTop>1)&&window.scrollTo(0,0),_&&L(!1)},h=()=>{m===0&&(m=requestAnimationFrame(g))};return s.addEventListener("resize",h),s.addEventListener("scroll",h),window.addEventListener("focusout",h),window.addEventListener("pageshow",h),g(),()=>{s.removeEventListener("resize",h),s.removeEventListener("scroll",h),window.removeEventListener("focusout",h),window.removeEventListener("pageshow",h),m!==0&&cancelAnimationFrame(m),window.clearTimeout(S),C?.remove(),d.style.removeProperty("--dshp-frame-h"),d.style.removeProperty("--dshp-vh-diff"),d.removeAttribute("data-dsh-pocket-full-height")}}),f("dsh-pocket: file open guard + copy button + hide add-workspace (issue #17)",()=>{let s=()=>{try{let c=e.sessions?.list?.getSnapshot?.();if(c===null||typeof c!="object")return;if(typeof c.current=="string")return c.current;for(let C in c.byId){let S=c.byId[C];if(S===void 0)continue;let _=S.retainedBy?.mainView;if(typeof _=="number"&&_>0&&typeof S.id=="string")return S.id}}catch{}},d=()=>{try{let C=(e.get?.("workspaces")??e.workspaces)?.list,S=Array.isArray(C)?C:C&&typeof C=="object"&&"value"in C?C.value:null;if(Array.isArray(S))for(let _ of S){let L=_?.cwd??_?.root;if(typeof L=="string"&&L)return L}}catch{}return""},m=c=>{let C=s();return e.connection.rpc.call(Se,G.fileRead,{path:c,cwd:d(),...C===void 0?{}:{sessionId:C}})},T=e.locale.bind(bt);return pr(m,T)})}var Ad="dsh-pocket",Ld=["slots","connection","layout","locale","sessionLogDownload","sessions"];function ae(e,t,a){let n=e(t);if(a)for(let[o,i]of Object.entries(a))n=String(n).split(`{${o}}`).join(String(i));return n}async function Md(e,t,a){if(typeof AbortSignal<"u"&&typeof AbortSignal.timeout=="function")return fetch(e,{...t,signal:AbortSignal.timeout(a)});let n=new AbortController,o=setTimeout(()=>n.abort(),a);try{return await fetch(e,{...t,signal:n.signal})}finally{clearTimeout(o)}}function Rd(e,t){return new Promise(a=>{if(t?.aborted){a();return}let n=()=>{clearTimeout(o),t?.removeEventListener?.("abort",n),a()},o=setTimeout(n,e);t?.addEventListener?.("abort",n,{once:!0})})}function Qa(e){let t=e!==!1;document.body?.setAttribute(tt,t?"on":"off"),window.dispatchEvent(new CustomEvent(at,{detail:{enabled:t}}))}function Ja(e){let t=e===!0;document.body?.setAttribute(Be,t?"on":"off"),window.dispatchEvent(new CustomEvent(nt,{detail:{enabled:t}}))}var Pd=[0,...Array.from({length:11},(e,t)=>12+t)];function en(e){let t=Number(e),a=Number.isInteger(t)&&t>=12&&t<=22;a?(document.body?.style.setProperty(Ae,`${t}px`),document.body?.setAttribute(Ce,String(t))):(document.body?.style.removeProperty(Ae),document.body?.removeAttribute(Ce)),window.dispatchEvent(new CustomEvent(ot,{detail:{size:a?t:0}}))}async function Od(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:0;left:0;opacity:0",document.body.appendChild(t),t.select();let a=document.execCommand("copy");return t.remove(),a===!0}catch{return!1}}var ne=e=>{let t=Cd??{};for(let a of e)if(typeof t[a]=="function")return t[a];return()=>null},X={settings:ne(["IconSettingsOutlineRegular","IconSettingsOutline16"]),lan:ne(["IconLinkOutlineRegular","IconLinkOutline16"]),wan:ne(["IconGlobeOutlineRegular","IconGlobeOutline16"]),pin:ne(["IconShieldOutlineRegular","IconShieldOutline16"]),sliders:ne(["IconSlidersTwoOutlineRegular","IconSlidersTwoOutline16"]),trash:ne(["IconTrashOutlineRegular","IconTrashOutline16"]),copy:ne(["IconCopyOutlineRegular","IconCopyOutline16"]),refresh:ne(["IconRefreshOutlineRegular","IconRefreshOutline16"]),download:ne(["IconDownloadOutlineRegular","IconDownloadOutline16"]),warn:ne(["IconWarningOutlineRegular","IconWarningOutline16"]),info:ne(["IconInfoOutlineRegular","IconInfoOutline16"]),check:ne(["IconCheckCircleOutlineRegular","IconCheckCircleOutline16"]),chevron:ne(["IconChevronDownOutlineRegular","IconChevronDownOutline16"])},xr=`
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
`;function Nd({rpcCall:e,t}){let[a,n]=(0,y.useState)(null),[o,i]=(0,y.useState)(null),[r,l]=(0,y.useState)(null),[u,f]=(0,y.useState)(!1),[s,d]=(0,y.useState)(null),[m,T]=(0,y.useState)(!1),[c,C]=(0,y.useState)(Date.now()),[S,_]=(0,y.useState)({}),[L,g]=(0,y.useState)(!1),[h,E]=(0,y.useState)({}),[v,p]=(0,y.useState)(!1),M=(0,y.useRef)(0),b=(0,y.useRef)(0),k=(0,y.useRef)(0),x=w=>n(A=>A&&{...A,...w}),R=(0,y.useRef)({}),O=async(w,A)=>{b.current=Date.now();let N=R.current;N[w]=(N[w]??0)+1,E(W=>W[w]===!0?W:{...W,[w]:!0});try{return await A()}finally{N[w]=Math.max(0,(N[w]??1)-1),N[w]===0&&(delete N[w],E(W=>{if(W[w]!==!0)return W;let j={...W};return delete j[w],j}))}};(0,y.useEffect)(()=>{let w="dshp-settings-css",A=document.getElementById(w);A&&A.tagName!=="STYLE"&&(A=null),A||(A=document.createElement("style"),A.id=w,document.head.appendChild(A)),A.textContent!==xr&&(A.textContent=xr)},[]),(0,y.useEffect)(()=>{if(!(!!((s?.updating||s?.restarting)&&s?.startedAt)||!!(r?.startedAt&&["downloading","starting","registering"].includes(r?.phase??""))))return;let A=setInterval(()=>C(Date.now()),1e3);return()=>clearInterval(A)},[s,r]);let P=w=>w?Math.max(0,Math.floor((c-w)/1e3)):0,z=async(w,A)=>{let N=await e(w,A,typeof AbortSignal<"u"&&typeof AbortSignal.timeout=="function"?AbortSignal.timeout(3e4):void 0);if(!N?.ok)throw new Error(N?.error?.message??"RPC failed");return N.value},q=(0,y.useRef)(null);(0,y.useEffect)(()=>()=>{q.current?.abort()},[]);let U=async()=>{q.current?.abort();let w=new AbortController;q.current=w;let A=Date.now()+3e4;for(;Date.now()<A&&!w.signal.aborted;){try{if((await Md(location.href,{method:"GET",cache:"no-store"},3e3)).ok){w.signal.aborted||location.reload();return}}catch{}await Rd(1e3,w.signal)}w.signal.aborted||g(!0)},K=async()=>{let w=Date.now(),A=++k.current;try{let N=await z(G.status,{});if(A!==k.current)return;if(b.current>w){p(!1),M.current=0;return}M.current=0,p(!1),n(N),Qa(N.mobileRightbarEnabled),Ja(N.mobilePinchZoomEnabled),en(N.mobileFontSize),l(N.tunnelState??null),N.desktop&&T(!0),N.restartNotice&&(f(!0),d(null),sessionStorage.getItem("dshp-auto-reloaded")||(sessionStorage.setItem("dshp-auto-reloaded","1"),U()))}catch{if(A!==k.current)return;M.current+=1,M.current>=2&&p(!0)}};(0,y.useEffect)(()=>{K();let w=()=>{document.hidden||K()};document.addEventListener("visibilitychange",w);let A=setInterval(()=>{document.hidden||K()},1e4);return()=>{clearInterval(A),document.removeEventListener("visibilitychange",w),k.current+=1}},[]),(0,y.useEffect)(()=>{try{sessionStorage.removeItem("dshp-auto-reloaded")}catch{}},[]),(0,y.useEffect)(()=>{if(m)return;let w=!0,A=async()=>{if(!document.hidden)try{let j=await z(G.version,{}),re=await(await fetch("https://registry.npmjs.org/dsh-pocket/latest",{cache:"no-store"})).json();if(!w)return;let _e=typeof re?.version=="string"?re.version:null,da=typeof re?.repository=="string"?re.repository:re?.repository?.url??null;gn(j.repository??null,da)&&_e&&j.current&&pa(_e,j.current)>0?d({current:j.current,latest:_e,updating:!1,result:null}):j.current&&j.loaded&&pa(j.current,j.loaded)>0&&d({current:j.current,latest:j.current,updating:!1,result:"ok",updated:!0})}catch{}},N=()=>{document.hidden||A()};document.addEventListener("visibilitychange",N),A();let W=setInterval(A,900*1e3);return()=>{w=!1,clearInterval(W),document.removeEventListener("visibilitychange",N)}},[m]);let Z=async()=>{d(w=>({...w??{},restarting:!0,startedAt:Date.now()}));try{await Promise.race([z(G.restart,{}),new Promise((w,A)=>setTimeout(()=>A(new Error("restart requested (no reply within 3s)")),3e3))]),d(w=>({...w??{},restarting:!0,result:"ok"}))}catch(w){let A=String(w?.message??"");if(/connection|socket|fetch|network|abort|cancelled|ECONN|disconnect|closed|timeout/i.test(A)){d(N=>({...N??{},restarting:!0,result:"ok"}));return}d(N=>({...N??{},restarting:!1,result:"fail",output:w.message}))}},te=async()=>{d(w=>({...w??{},updating:!0,result:null,startedAt:Date.now()}));try{let w=await z(G.update,{});d(A=>({...A??{},updating:!1,result:w.ok?"ok":"fail",autoRestart:w.autoRestart===!0,output:w.output??w.error}))}catch(w){d(A=>({...A??{},updating:!1,result:"fail",output:w.message}))}},[I,H]=(0,y.useState)(!1),[B,$]=(0,y.useState)(!1),de=async()=>{let w=a?.tunnelConfig;if(!w?.hostname||!w?.tokenSet){oe({hostname:w?.hostname??"",token:"",err:t("namedNeedCfg")});return}i(null),l({phase:"starting",detail:"正在开启…",startedAt:Date.now()}),await O("wan",async()=>{try{let A=await z(G.tunnelStart,{disclaimer:!0});n(A),l(A.tunnelState??null)}catch(A){i(A.message),l(null)}})},le=()=>{let w=a?.tunnelConfig;if(!w?.hostname||!w?.tokenSet){oe({hostname:w?.hostname??"",token:"",err:null});return}$(!1),H(!0)},ea=()=>{B&&(H(!1),de())},ta=()=>O("wan",async()=>{try{let w=await z(G.tunnelStop,{});n(w),l(w.tunnelState??null)}catch(w){i(w.message)}}),[ce,oe]=(0,y.useState)(null),aa=()=>O("saveNamed",async()=>{try{let w=await z(G.tunnelSetConfig,{mode:"named",hostname:ce?.hostname??"",token:ce?.token||void 0});n(w),oe(null)}catch(w){oe(A=>({...A??{},err:w.message}))}}),[wt,Ze]=(0,y.useState)(!1),yr=async()=>{Ze(!1),i(null),await O("reset",async()=>{try{let w=await z(G.pocketReset,{confirm:!0});n(w),Qa(w.mobileRightbarEnabled),Ja(w.mobilePinchZoomEnabled),en(w.mobileFontSize),oe(null),ge(null),mn(!1),_({}),Array.isArray(w?.resetWarnings)&&w.resetWarnings.length>0?(i(w.resetWarnings.join("；")),Je(t("resetPartial"))):Je(t("resetDone"))}catch(w){i(w.message),Je(t("resetFailed"))}})},kr=()=>O("refreshPin",async()=>{try{let w=await z(G.lanTokenRefresh,{});n(A=>A&&{...A,lanToken:w.lanToken}),_(A=>({...A,lan:!1}))}catch(w){i(w.message)}}),Er=w=>O("lanAuth",async()=>{try{let A=await z(G.lanAuthSetEnabled,{on:w});n(N=>N&&{...N,lanAuthEnabled:A.lanAuthEnabled})}catch(A){i(A.message)}}),Tr=w=>O("prefs",async()=>{try{let N=(await z(G.mobileRightbarSetEnabled,{on:w})).mobileRightbarEnabled===!0;x({mobileRightbarEnabled:N}),Qa(N)}catch(A){i(A.message)}}),_r=w=>O("prefs",async()=>{try{let N=(await z(G.mobilePinchZoomSetEnabled,{on:w})).mobilePinchZoomEnabled===!0;x({mobilePinchZoomEnabled:N}),Ja(N)}catch(A){i(A.message)}}),Sr=w=>O("prefs",async()=>{try{let A=await z(G.mobileFontSetSize,{size:w}),N=Number(A.mobileFontSize)||0;x({mobileFontSize:N}),en(N)}catch(A){i(A.message)}}),[be,Ye]=(0,y.useState)(null),tn=w=>Ye(w),Cr=()=>{let w=be;if(Ye(null),w!==null)return O("lanToggle",async()=>{try{let A=await z(G.lanSetEnabled,{on:w});n(N=>N&&{...N,lanEnabled:A.lanEnabled})}catch(A){i(A.message)}})},Ar=w=>O("lanAddr",async()=>{try{n(await z(G.lanSetOverride,{ip:w}))}catch(A){i(A.message)}}),[ke,ge]=(0,y.useState)(null),an=w=>O("savePin",async()=>{if(String(ke?.value??"").length<8){ge(A=>({...A??{},err:t("pinInvalid")}));return}try{let A=await z(G.pinSetCustom,{which:w,value:ke?.value??""});n(N=>N&&{...N,accessToken:w==="public"?A.pin:N.accessToken,lanToken:w==="lan"?A.pin:N.lanToken,publicPinCustom:w==="public"?!0:N.publicPinCustom,lanPinCustom:w==="lan"?!0:N.lanPinCustom}),ge(null),A&&A.persisted===!1&&Je(t("pinSaveMemoryOnly"))}catch(A){ge(N=>({...N??{},err:A.message}))}}),nn=a?.lanUrl,ie=a?.tunnelUrl,Ee=a?.origin==="public",na=r?.phase??"idle",on=["downloading","starting","registering"].includes(na),Lr=r?.detail??"",oa=r?.startedAt??null,pe=a?.tunnelConfig??{hostname:"",tokenSet:!1},vt=!!(pe.hostname&&pe.tokenSet),Mr=()=>oe({hostname:pe.hostname??"",token:"",err:null}),Rr=!!(ie&&ie!==`https://${pe.hostname}`),Qe=w=>{let A=String(w??""),N=A.indexOf(" | ");return N<0?A:(t("ok")===Ya.ok?A.slice(0,N):A.slice(N+3)).trim()},[rn,sn]=(0,y.useState)(null),ia=(0,y.useRef)(null),Je=w=>{sn(w),clearTimeout(ia.current),ia.current=setTimeout(()=>sn(null),2600)};(0,y.useEffect)(()=>()=>clearTimeout(ia.current),[]);let ra=(0,y.useRef)(null),ln=I||be!==null||wt;(0,y.useEffect)(()=>{if(!ln)return;ra.current=document.activeElement;let w=A=>{if(A.key==="Escape"){if(A.preventDefault(),A.stopPropagation(),I){H(!1);return}if(be!==null){Ye(null);return}wt&&Ze(!1)}};return window.addEventListener("keydown",w),()=>{window.removeEventListener("keydown",w);let A=ra.current;ra.current=null,A&&typeof A.focus=="function"&&A.isConnected&&A.focus()}},[ln,I,be,wt]);let et=(w,A,N,W=null)=>(0,y.createElement)("button",{role:"switch",type:"button","aria-checked":!!w,disabled:N===!0,"aria-label":W??void 0,className:"dshp-switch",onClick:N===!0?void 0:A},(0,y.createElement)("span",{className:"dshp-switch-thumb"})),V=(w,...A)=>{let{variant:N="ghost",mini:W=!1,icon:j=null,children:re,..._e}=w??{},da=A.length>0?A:re;return(0,y.createElement)("button",{type:"button",..._e,className:`dshp-btn is-${N}${W?" is-mini":""}`},j?(0,y.createElement)(j,{size:W?12:14}):null,da)},dn=({on:w,children:A})=>(0,y.createElement)("span",{className:`dshp-chip${w?" is-on":""}`},(0,y.createElement)("span",{className:"dshp-chip-dot"}),A),xt=({icon:w,title:A,sub:N,right:W,children:j,danger:re=!1,key:_e})=>(0,y.createElement)("section",{className:`dshp-card${re?" is-danger":""}`,"data-dshp-section":_e??""},(0,y.createElement)("div",{className:"dshp-card-head"},w?(0,y.createElement)("span",{className:"dshp-card-icon"},(0,y.createElement)(w,{size:16})):null,(0,y.createElement)("div",{className:"dshp-card-text"},(0,y.createElement)("div",{className:"dshp-card-title"},A),N?(0,y.createElement)("div",{className:"dshp-card-sub"},N):null),W??null),j?(0,y.createElement)("div",{className:"dshp-card-body"},j):null),Te=({label:w,desc:A,control:N,extra:W,stack:j=!1})=>(0,y.createElement)("div",{className:`dshp-row${j?" is-stack":""}`},(0,y.createElement)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,rowGap:8,flexWrap:"wrap",minWidth:0,width:"100%"}},(0,y.createElement)("div",{style:{minWidth:0}},(0,y.createElement)("div",{className:"dshp-row-label"},w),A?(0,y.createElement)("div",{className:"dshp-row-desc"},A):null),N??null),W??null),he=({kind:w="info",icon:A=null,children:N,title:W=null,extra:j=null})=>(0,y.createElement)("div",{className:`dshp-alert is-${w}`},A?(0,y.createElement)("span",{className:"dshp-alert-icon"},(0,y.createElement)(A,{size:14})):null,(0,y.createElement)("div",{className:"dshp-alert-body"},W?(0,y.createElement)("div",{className:"dshp-alert-title"},W):null,N,j??null)),sa=({src:w,url:A,hint:N})=>(0,y.createElement)("div",{className:"dshp-qr"},(0,y.createElement)("div",{className:"dshp-qr-frame"},w?(0,y.createElement)("img",{src:w,alt:"QR"}):null),(0,y.createElement)("div",{className:"dshp-qr-main"},(0,y.createElement)("div",{className:"dshp-url"},A),N?(0,y.createElement)("div",{className:"dshp-qr-hint"},N):null,(0,y.createElement)("div",{className:"dshp-qr-actions"},V({variant:"ghost",mini:!0,icon:X.copy,onClick:async()=>Je(await Od(A)?t("copied"):t("copyFailed"))},t("copyLink"))))),cn=(w,A,N)=>(0,y.createElement)("div",{className:"dshp-pinbox"},(0,y.createElement)("span",{className:"dshp-pin-value","data-dshp-pin":w},S[w]?A:"••••••••"),V({variant:"ghost",mini:!0,onClick:()=>_(W=>({...W,[w]:!W[w]}))},S[w]?t("pinHide"):t("pinShow")),...N??[]),pn=w=>(0,y.createElement)("div",{className:"dshp-adv"},(0,y.createElement)("div",{className:"dshp-custom"},(0,y.createElement)("span",null,t("customizing")),(0,y.createElement)("input",{className:"dshp-input is-mono",style:{width:150,textAlign:"center"},type:"password",minLength:8,maxLength:64,name:"dsh-pocket-pin",autoComplete:"new-password",spellCheck:!1,value:ke?.value??"",autoFocus:!0,onChange:A=>{let N=A.target.value,W=N.replace(/[^a-zA-Z0-9]/g,"");ge(j=>({...j,value:W,err:W.length===N.length?null:t("pinCharsFiltered")}))},onKeyDown:A=>{A.key==="Enter"&&an(w),A.key==="Escape"&&ge(null)}}),V({variant:"primary",mini:!0,onClick:()=>an(w),disabled:h.savePin===!0},t("save")),V({variant:"ghost",mini:!0,onClick:()=>ge(null),disabled:h.savePin===!0},t("cancel"))),ke?.err?(0,y.createElement)("div",{className:"dshp-err-text"},Qe(ke.err)):null),hn=w=>V({variant:"ghost",mini:!0,onClick:()=>ge({which:w,value:"",err:null})},t("customize")),la=({title:w,tone:A="warn",children:N,actions:W,onClose:j})=>(0,y.createElement)("div",{className:"dshp-modal-backdrop",onClick:re=>{re.target===re.currentTarget&&j?.()}},(0,y.createElement)("div",{className:"dshp-modal",role:"dialog","aria-modal":"true","aria-label":w},(0,y.createElement)("div",{className:`dshp-modal-title is-${A}`},w),N,(0,y.createElement)("div",{className:"dshp-modal-actions"},W))),[un,mn]=(0,y.useState)(!1),Pr=on?he({kind:"info",icon:X.info,children:na==="downloading"?ae(t,"downloading",{s:P(oa)}):ae(t,"connecting",{s:P(oa),suffix:P(oa)>30?t("slowHint"):""})}):na==="error"?he({kind:"error",icon:X.warn,children:ae(t,"error",{detail:Qe(Lr)||t("unknownError")})}):!ie&&vt?he({kind:"info",icon:X.info,children:t("wanOffHint"),extra:(0,y.createElement)("div",{style:{marginTop:8}},V({variant:"primary",onClick:le,disabled:h.wan===!0||h.saveNamed===!0},t("enable")))}):null,Or=vt&&!ce?(0,y.createElement)("div",{className:"dshp-panel"},(0,y.createElement)("div",{style:{display:"flex",alignItems:"flex-start",gap:10}},(0,y.createElement)("div",{style:{flex:1,minWidth:0}},(0,y.createElement)("div",{className:"dshp-panel-title"},pe.hostname||"—"),(0,y.createElement)("div",{className:"dshp-hint",style:{marginTop:2}},pe.tokenSet?t("namedTokenSet"):t("namedTokenMissing"))),V({variant:"ghost",mini:!0,onClick:()=>oe({hostname:pe.hostname??"",token:"",err:null})},t("namedEdit"))),(0,y.createElement)("div",{className:"dshp-hint",style:{marginTop:8,lineHeight:1.65}},t("namedHow")),!pe.tokenSet||!pe.hostname?(0,y.createElement)("div",{className:"dshp-err-text"},t("namedNeedCfg")):null):null,Nr=ce?(0,y.createElement)("div",{className:"dshp-form"},(0,y.createElement)("label",{className:"dshp-field"},t("namedHostnameLabel"),(0,y.createElement)("input",{className:"dshp-input",placeholder:"pocket.example.com",value:ce.hostname??"",autoFocus:!0,onChange:w=>oe(A=>({...A,hostname:w.target.value.trim(),err:null})),onKeyDown:w=>{w.key==="Enter"&&aa(),w.key==="Escape"&&oe(null)}})),(0,y.createElement)("label",{className:"dshp-field"},t("namedTokenLabel"),(0,y.createElement)("input",{className:"dshp-input is-mono",type:"password",name:"dsh-pocket-tunnel-token",autoComplete:"off",spellCheck:!1,value:ce.token??"",onChange:w=>oe(A=>({...A,token:w.target.value.trim(),err:null})),onKeyDown:w=>{w.key==="Enter"&&aa(),w.key==="Escape"&&oe(null)}})),(0,y.createElement)("div",{className:"dshp-inline"},V({variant:"primary",mini:!0,onClick:aa,disabled:h.saveNamed===!0},t("save")),V({variant:"ghost",mini:!0,onClick:()=>oe(null),disabled:h.saveNamed===!0},t("cancel"))),(0,y.createElement)("div",{className:"dshp-hint"},t("namedHow")),(0,y.createElement)("div",{className:"dshp-warn-text"},t("namedSecurity")),ce.err?(0,y.createElement)("div",{className:"dshp-err-text"},Qe(ce.err)):null):null,Ir=(0,y.createElement)("div",{className:"dshp-adv"},Rr?(0,y.createElement)("div",{className:"dshp-warn-text"},t("namedTakeEffect")):null,!vt&&!ce?he({kind:"info",icon:X.info,children:t("publicSetupHint"),extra:(0,y.createElement)("div",{style:{marginTop:8}},V({variant:"primary",onClick:Mr},t("publicConfigure")))}):null,Or,Nr),Hr=a?.accessToken?Te({label:t("pinLabel"),stack:!0,extra:ke?.which==="public"?pn("public"):(0,y.createElement)("div",null,cn("public",a.accessToken,[hn("public")]),(0,y.createElement)("div",{className:"dshp-warn-text"},t("namedSecurity")))}):null,Fr=(0,y.createElement)("div",null,ie?sa({src:a.tunnelQr,url:ie,hint:t("namedRunningHint")}):null,Te({label:t("publicConfig"),stack:!0,extra:Ir}),vt||ie?Hr:null);return(0,y.createElement)("div",{className:"dshp-page","data-dshp-ui":"v3"},(0,y.createElement)("header",{className:"dshp-head"},(0,y.createElement)("span",{className:"dshp-badge"},(0,y.createElement)(X.settings,{size:19})),(0,y.createElement)("div",{className:"dshp-head-main"},(0,y.createElement)("div",{className:"dshp-title"},t("section")),(0,y.createElement)("div",{className:"dshp-sub"},t("subtitle")))),(0,y.createElement)("div",{className:"dshp-chips"},a?[dn({on:a.lanEnabled!==!1,children:`${t("lanAccess")} · ${a.lanEnabled!==!1?t("statusOn"):t("statusOff")}`}),dn({on:!!ie,children:`${t("wanAccess")} · ${t(ie?"statusConnected":"statusOff")}`})]:(0,y.createElement)("span",{className:"dshp-hint",style:{marginTop:0}},t("loadingStatus"))),o?he({kind:"error",icon:X.warn,children:Qe(o),extra:(0,y.createElement)("div",{className:"dshp-inline",style:{marginTop:8}},V({variant:"ghost",mini:!0,onClick:()=>i(null)},t("ok")))}):null,v?he({kind:"warn",icon:X.warn,children:t("offlineHint")}):null,!m&&u?he({kind:"info",icon:X.refresh,title:t("restarted"),children:(0,y.createElement)("div",{className:"dshp-hint",style:{wordBreak:"break-all",marginTop:2}},ae(t,"bgHint",{cmd:a?.killHint??`lsof -ti :${a?.dshPort??3080} | xargs kill -9`})),extra:(0,y.createElement)("div",{className:"dshp-inline",style:{marginTop:8}},L?V({variant:"ghost",mini:!0,icon:X.refresh,onClick:()=>{g(!1),U()}},t("reloadNow")):null,L?(0,y.createElement)("span",{className:"dshp-hint",style:{marginTop:0}},t("reloadFailed")):null,V({variant:"quiet",mini:!0,onClick:()=>f(!1)},t("ok")))}):null,!m&&!Ee&&s?he({kind:"warn",icon:X.download,title:s.updated?ae(t,"updatedRestart",{ver:s.current}):s.result==="ok"?s.autoRestart?ae(t,"updateAutoRestarting",{ver:s.latest}):ae(t,"updatedOk",{ver:s.latest}):s.result==="fail"?t("updateFailedTitle"):ae(t,"updateAvailable",{ver:s.latest}),children:(0,y.createElement)("div",{className:"dshp-hint",style:{marginTop:2}},s.updating?ae(t,"updatingDetail",{s:P(s.startedAt)}):s.restarting?ae(t,"restartingDetail",{s:P(s.startedAt)}):s.result==="ok"?s.autoRestart?t("updatedAutoDetail"):t("updatedRestartDetail"):s.result==="fail"?ae(t,"updateFailed",{err:Qe(s.output)||t("unknownError")}):ae(t,"versionRange",{cur:s.current,latest:s.latest})),extra:(0,y.createElement)("div",{className:"dshp-inline",style:{marginTop:8}},s.result!=="ok"?V({variant:"primary",mini:!0,icon:X.download,onClick:te,disabled:s.updating},s.updating?t("updating"):ae(t,"updateTo",{ver:s.latest})):s.autoRestart?V({variant:"ghost",mini:!0,disabled:!0},t("restartingNow")):V({variant:"primary",mini:!0,icon:X.refresh,onClick:Z,disabled:s.restarting},s.restarting?t("restarting"):t("restartNow")),!s.updating&&!s.restarting?V({variant:"ghost",mini:!0,onClick:()=>d(null)},t("later")):null)}):null,xt({key:"lan",icon:X.lan,title:t("lanAccess"),sub:t("lanHint"),right:et(a?.lanEnabled!==!1,()=>tn(a?.lanEnabled===!1),!a||h.lanToggle===!0||Ee,t("lanAccess")),children:Ee?(0,y.createElement)("div",{className:"dshp-hint"},t("lanLocalOnly")):a?a.lanEnabled===!1?he({kind:"info",icon:X.info,children:t("lanDisabledHint"),extra:(0,y.createElement)("div",{style:{marginTop:8}},V({variant:"primary",onClick:()=>tn(!0),disabled:h.lanToggle===!0},t("lanToggleTitleOn")))}):nn?(0,y.createElement)("div",null,sa({src:a.lanQr,url:nn,hint:null}),Te({label:t("lanPin"),desc:a?.lanAuthEnabled===!1?t("lanPinOff"):null,control:et(a?.lanAuthEnabled!==!1,()=>Er(a?.lanAuthEnabled===!1),h.lanAuth===!0,t("lanPin"))}),a?.lanAuthEnabled===!1?null:ke?.which==="lan"?pn("lan"):a.lanToken?(0,y.createElement)("div",null,cn("lan",a.lanToken,[V({variant:"ghost",mini:!0,icon:X.refresh,onClick:kr,disabled:h.refreshPin===!0},t("refresh")),hn("lan")]),a.lanPinCustom?(0,y.createElement)("div",{className:"dshp-warn-text"},t("pinCustomHint")):null):(0,y.createElement)("div",{className:"dshp-hint"},t(Ee?"lanPinRemoteHint":"lanPinUnavailable")),Te({label:t("advAddress"),control:V({variant:"ghost",mini:!0,onClick:()=>mn(w=>!w)},(a.lanIpOverride||t("lanAddressAuto"))+(un?" ‹":" ›")),extra:un?(0,y.createElement)("div",{className:"dshp-adv"},(0,y.createElement)("label",{className:"dshp-field"},t("lanAddress"),(0,y.createElement)("select",{className:"dshp-select",value:a.lanIpOverride||"",disabled:h.lanAddr===!0,onChange:w=>Ar(w.target.value)},(0,y.createElement)("option",{value:""},t("lanAddressAuto")),(a.lanCandidates||[]).map(w=>(0,y.createElement)("option",{key:w,value:w},w))))):null})):(0,y.createElement)("div",{className:"dshp-hint"},t("lanStarting")):(0,y.createElement)("div",{className:"dshp-loading"},t("loadingStatus"))}),xt({key:"wan",icon:X.wan,title:t("wanAccess"),sub:t("namedWanHint"),right:et(!!ie,()=>ie?ta():le(),on||h.wan===!0||h.saveNamed===!0||!a||Ee,t("wanAccess")),children:Ee?(0,y.createElement)("div",null,ie?sa({src:a?.tunnelQr,url:ie,hint:t("namedRunningHint")}):null,(0,y.createElement)("div",{className:"dshp-hint"},t("wanLocalOnly"))):a?(0,y.createElement)("div",null,Pr,Fr):(0,y.createElement)("div",{className:"dshp-loading"},t("loadingStatus"))}),xt({key:"prefs",icon:X.sliders,title:t("prefsTitle"),sub:t("prefsHint"),children:a?(0,y.createElement)("div",null,Te({label:t("mobileRightbar"),desc:t("mobileRightbarHint"),control:et(a.mobileRightbarEnabled!==!1,()=>Tr(a.mobileRightbarEnabled===!1),h.prefs===!0,t("mobileRightbar"))}),Te({label:t("mobilePinchZoom"),desc:t("mobilePinchZoomHint"),control:et(a.mobilePinchZoomEnabled===!0,()=>_r(a.mobilePinchZoomEnabled!==!0),h.prefs===!0,t("mobilePinchZoom"))}),Te({label:t("mobileFontSize"),desc:t("mobileFontSizeHint"),control:(0,y.createElement)("select",{className:"dshp-select",value:String(Number(a.mobileFontSize)||0),disabled:h.prefs===!0,onChange:w=>Sr(Number(w.target.value))},Pd.map(w=>(0,y.createElement)("option",{key:w,value:String(w)},w===0?t("mobileFontFollow"):`${w} px`)))})):(0,y.createElement)("div",{className:"dshp-loading"},t("loadingStatus"))}),xt({key:"reset",icon:X.trash,title:t("resetFactory"),sub:t("resetIntro"),danger:!0,right:Ee?(0,y.createElement)("div",{className:"dshp-hint"},t("resetLocalOnly")):V({variant:"danger",mini:!0,onClick:()=>Ze(!0),disabled:h.reset===!0},t("resetGo"))}),(0,y.createElement)("footer",{className:"dshp-footer"},(0,y.createElement)("span",null,t("developer")),(0,y.createElement)("span",null,"·"),(0,y.createElement)("a",{href:"https://github.com/daha1216/dsh-pocket",target:"_blank",rel:"noreferrer",title:t("starAsk")},t("starCta")),(0,y.createElement)("span",null,"·"),(0,y.createElement)("a",{href:"https://github.com/daha1216/dsh-pocket/issues",target:"_blank",rel:"noreferrer"},t("feedback"))),wt?la({title:t("resetTitle"),tone:"danger",onClose:()=>Ze(!1),children:(0,y.createElement)("div",{className:"dshp-modal-body"},t("resetBody")),actions:(0,y.createElement)("div",{className:"dshp-inline"},V({variant:"ghost",mini:!0,autoFocus:!0,onClick:()=>Ze(!1)},t("cancel")),V({variant:"danger",mini:!0,onClick:yr,disabled:h.reset===!0},t("resetConfirm")))}):null,be!==null?la({title:t(be?"lanToggleTitleOn":"lanToggleTitleOff"),tone:be?"brand":"warn",onClose:()=>Ye(null),children:(0,y.createElement)("div",{className:"dshp-modal-body"},t(be?"lanToggleBodyOn":"lanToggleBodyOff")),actions:(0,y.createElement)("div",{className:"dshp-inline"},V({variant:"ghost",mini:!0,autoFocus:!0,onClick:()=>Ye(null)},t("cancel")),V({variant:"primary",mini:!0,onClick:Cr},t("confirm")))}):null,I?la({title:t("disclaimerTitle"),tone:"warn",onClose:()=>H(!1),children:(0,y.createElement)("div",null,(0,y.createElement)("div",{className:"dshp-modal-body"},t("disclaimerBody")),(0,y.createElement)("label",{className:"dshp-check"},(0,y.createElement)("input",{type:"checkbox",checked:B,onChange:w=>$(w.target.checked)}),t("disclaimerAgree")),B?null:(0,y.createElement)("div",{className:"dshp-err-text",style:{marginTop:8}},t("disclaimerHint"))),actions:(0,y.createElement)("div",{className:"dshp-inline"},V({variant:"ghost",mini:!0,autoFocus:!0,onClick:()=>H(!1)},t("cancel")),V({variant:"primary",mini:!0,disabled:!B,onClick:ea},t("disclaimerAgree")))}):null,rn?(0,y.createElement)("div",{className:"dshp-toast",role:"status","aria-live":"polite"},rn):null)}function Id(e){if(e?.connection)try{Object.defineProperty(e.connection,"isLoopback",{value:!0,writable:!0,configurable:!0})}catch{try{e.connection.isLoopback=!0}catch{}}let t=e.locale.bind(bt);e.effect(()=>e.locale.register(bt,{zh:Ya,en:gr}),"dsh-pocket: pocket locale dictionaries"),vr(e);let a=(n,o,i)=>e.connection.rpc.call(Se,n,o,i);e.slots.inject("settings.section",()=>e.slots.register({name:"settings.section",id:"pocket",order:1,label:()=>t("section"),inject:()=>({rpcCall:a,t})},Nd))}

    return module.exports;
  }
});
