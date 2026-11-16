# dsh-pocket 移动端移植层（dsh-web-mobile 同步机制）

pocket 的移动端适配移植自 [dsh-web-mobile](https://github.com/mexiaosqwq/dsh-web-mobile)（MIT，LICENSE.dsh-web-mobile）。
本目录的结构让「上游更新 → 同步进 pocket」成为一条命令的事。

## 目录结构

```
client/mobile/
  upstream/            ← 生成物：vendor 快照 + 镜像变换 + patches 重建出来的树（勿手改，改 patches/）
  mobile-apply.tsx     ← pocket 适配器：布局门控 → 调 upstream apply → pocket 附加层
  fileGuard.ts         ← pocket 专属：issue #17 文件链接守卫 + 「复制」按钮
  layout-mode.mjs      ← pocket 专属：issue #74 ?dsh-layout= 强制布局
  probe-core.mjs       ← pocket 专属：使用探针的浏览器侧核心（默认关）
  settling-watchdog.mjs
  LICENSE.dsh-web-mobile
  PORTING.md           ← 本文件

vendor/dsh-web-mobile/  ← 上游源码快照（tag 原样，仅换行统一 LF）+ UPSTREAM.json（repo/tag/commit + 逐文件 sha256）
patches/                ← 本地补丁集（31 个 .patch）+ MANIFEST.json（顺序、行数、sha256）
scripts/upstream.mjs    ← check / apply / regen / bump
scripts/lib/upstream-transform.mjs  ← 镜像变换 T0/T1/T2（与补丁分开，免得每条补丁都带一遍改名）
```

**`upstream/` 是生成物，不是手改的地方。** 它由 `vendor/dsh-web-mobile/` 快照经三条镜像变换、
再打上 `patches/*.patch` 得到；`npm run upstream:check` 会在临时目录重跑这条流水线并与
`upstream/` 逐字节比对，不一致就点名到文件。想改 upstream 行为：改 `upstream/` →
`npm run upstream:regen` 把差异固化成补丁；不打算保留的临时试验不要留在 `upstream/` 里。

## 同步步骤（上游发新版后）

```powershell
npm run upstream:check     # upstream/ 能否由 vendor + 变换 + patches 精确重建（提交前/CI 跑这个）
npm run upstream:apply     # 重建并覆盖 upstream/（等价于 check 通过后采纳结果）
npm run upstream:regen     # 改完 upstream/ 之后：把当前差异重新固化成 patches/（旧补丁集被替换）
npm run upstream:bump -- --from <本地克隆路径> --tag v3.4.0 --commit <40 位 sha>
```

`upstream:bump` 做三件事：从本地克隆 `git archive <ref> src/client` 取快照写进
`vendor/dsh-web-mobile/`；重写 `UPSTREAM.json`（repo / tag / commit / sourcePath / 逐文件
sha256）；再用现有补丁集试重建。补丁打不上就停下并列出冲突文件——这时候要逐条对账补丁
（`patches/MANIFEST.json` 里有顺序与行数），而不是把 upstream/ 硬覆盖过去。

**镜像变换（`scripts/lib/upstream-transform.mjs`，构建期自动施加，不写进补丁）**：

1. **T0 换行归一化**：所有文本文件统一 LF。补丁按行比对，一端 CRLF 一端 LF 会让整文件变成
   「全删全加」（实测 sidebar-swipe / layout / misc 三个文件因此涨到 +6000 行）；
   `.gitattributes` 同时把 `client/mobile/upstream/**`、`vendor/**`、`patches/**` 钉成 `eol=lf`。
2. **T1 NS 改名**：`dshWebMobileNav` → `pocketMobileNav`（含 `.attachments` 等子 NS 与
   `…FileShare` 变体；历史 `mobileNav` 字面量同改，`dataset.mobileNav` / `data-mobile-nav`
   是 data 属性**不在其列**）。理由：vendored 副本注册同名人会与独立安装的 dsh-web-mobile
   撞车（上游 locales.ts 注释：register 重名 throw 且整条插件 fiber 死亡）。
3. **T2 stats 让位**：`[data-mobile-nav="stats"]` 的每个选择器项首加
   `body:not([data-pocket-stats="off"])`——别的插件设 `document.body.dataset.pocketStats='off'`
   就能整组回收 stats 条，纯 CSS、无 JS 拦截，且幂等（已前缀的不再二次加）。

变换后 `assertTransformedTree()` 断言三件事：零 `dshWebMobileNav` 残留、guard 不落在选择器
链中段、没有 CRLF。断言必须走文件系统遍历——**上游新增未跟踪文件**（如 v3.1.0 的
file-share-locale.ts）用 git grep 搜不到。

构建依赖 esbuild：vendored 于 `%USERPROFILE%\.dsh\dsh-pocket\vendor\node_modules\`
（esbuild@0.28.1 + @esbuild/win32-x64，与仓库内 `vendor/dsh-web-mobile/` 是两回事），
`dsh plugin update dsh-pocket` 重装包后 junction 会丢——重建一次即可恢复。

**同步后必做：**
1. 重启 dsh web（`node %USERPROFILE%\.dsh\dsh-pocket\detached-restart.cjs`，注意会断当前会话）。
   combo URL 的 rev 启动时重分配，无缓存问题。
2. WebKit（JSC/同 iPhone 引擎）回归：登录 PIN → 开历史会话（对话渲染）→ 抽屉开合 → 左缘右滑。
3. **对表 inject 硬依赖**：upstream/index.tsx 的 `export const inject` 若增删服务名，
   `client/index.jsx` 的适配器 inject 数组必须同步改成它的超集（v3.1.0 起 upstream
   新增 `'sessions'`，漏声明 → 宿主给 `ctx.sessions` 传 undefined → 激活即抛
   "1 entry did not activate"，2026-10-14 实测翻车一次）。upstream 动态依赖
   （`ctx.inject([...], cb)` 懒加载，如 inputTriggers/remote.workspaceFiles）不进
   静态表，宿主 0.2.0-rc.1 原生支持。
4. **激活冒烟**：`node client\repro-activate.mjs`（桩环境直跑 bundle 的 apply()，
   应打印 `apply() completed` + 47 effects + locale NS 清单；NS 重名/漏 inject
   一律当场炸）。比「重启后拿手机试」快得多。
5. **验补丁集**：`npm run upstream:check`（手改了 `upstream/` 没固化 → 这里红）。
6. **重算锚点台账**：`npm run anchors:gen`（sync 增删锚点后不重算，契约测试红）；宿主升级
   还要先 `npm run anchors:dump`，详见下方「锚点台账与宿主升级 triage」。

## 锚点台账与宿主升级 triage

手机层的 170 个 `[class*="…"]` 锚点集中登记在 `client/mobile/anchors.ts`，由
`scripts/gen-anchors.mjs` 从「源码里的锚点 × 宿主真实类名快照（`test/fixtures/host-classes.json`）」
生成 —— 不要手改。宿主升级后按这个顺序走：

1. `npm run anchors:dump` 重抽本机 DSH Desktop（app.asar）里选择器位的真实类名；
2. `npm run anchors:gen` 重算台账，diff 里直接看出哪些锚点从 host 掉进 legacy；
3. `npm run anchors:report` 控制台列出 legacy / external 明细及各自的落点（usedIn）；
4. `npm run test:anchors` 现抽一遍并逐条核活（需要本机装着 DSH Desktop）。

`ANCHOR_AREAS` 把锚点按源码文件分组：宿主重构某块 DOM 时通常是一整片同时掉，先看
哪个模块掉得最多，再决定补更稳的选择器（优先 data-* / 结构选择器）还是删掉已无用的规则。
哈希换代**不需要**改名——子串匹配天然扛住，台账状态会自己从 legacy 翻回 host；只有宿主
改了 localName 词形（新类名与旧类名只差词形、整族一起掉）才用
`npm run anchors:rename -- <旧片段> <新片段>` 一次改全仓（默认只打印，`--apply` 才写盘并
自动重算台账）。契约测试 `test/anchors-contract.test.js` 钉住「台账 == 重算结果」与
「分组 == 实际落点」，源码增删锚点后不重新生成就是红。

## upstream/ 内的 pocket 补丁（固化在 patches/）

`upstream/` 里的本地改动不再靠「同步后手工重打」：它们已经固化成
`patches/NNNN-<路径>.patch`（路径里的 `/` 写成 `__`），顺序与 sha256 记在
`patches/MANIFEST.json`，全部由 `npm run upstream:check` 逐字节验证。下面的编号
（#1…#17）是历史台账编号，用来对上 2026-11-03 那次对账；编号与补丁文件的对照见
「各补丁的落点与理由」前面那张表。

**对账基线：上游 v3.2.3 = `91b328c1c0217cd58cf807a22e000ee8a56b6622`**（提交 c02bde5
「吸收上游 v3.2.3（#260）」引入；早期记录的 `main @2cf9061` / v3.2.2 已过时）。
当前补丁集 31 个文件、+725 / −973 行。
14 条补丁全部重打完成（3 条已被上游吸收，见下；这批改动现已全部固化成 `patches/`）。本轮上游要点：
- 新效果 ×5：composer-clearance（#245 横屏键盘挤压输入框）、question-fullscreen
  （提问卡手动全屏回答）、image-lightbox-zoom（灯箱双指缩放只缩图片）、
  drawer-quick-settings（抽屉一键设置齿轮）+ tablet-quick-settings（平板档单独武装）；
  effects 总数 42 → 47。
- #254 死锚修复：宿主 0.2.1 哈希换代使 layout.css 86 处/misc.css 18 处失效，上游改用
  后缀锚（`[class*="_suffix"]`）与 `header:has([class*="_headerLeading"])`。
- document-scroll-lock（新文件）：JS 把 document 钉回 scrollY=0（宿主 caret helper 的
  window.scrollBy 把整个壳顶飞，`overflow:hidden` 拦不住、`position:fixed` 炸绘制）。
- 键盘视口外壳满高（a5b867e）：frame 高度改 `--dsha-mobile-visible-vh`，拒绝文档级 scroll。
- inject 名单不变（仍是 5 服务），repro-activate 冒烟需给 window 桩补 `scrollBy`/`scrollX`。

**哈希重锚（pocket 侧对宿主 0.2.1-rc.5 的额外对账）**：上游新效果里仍有 4 个精确哈希
选择器锚在 rc.2 的 class map（`Mbwy4a_*`），rc.5 已换代为 `wnLwla_*`（后缀名不变）。
`effects/question-fullscreen.ts` 的四个 SELECTOR 常量已改后缀锚（`[class*="_headerActions"]`
等；CARD_FRAME 用 `[class*="_frame"]`，已核验 conversation 包无 `_frame` 类、user-questions
包内 Nksazq_frame（PlanReviewPanel）与 wnLwla_frame 同形同 padding，误命中无行为差异）。
`composer-clearance.ts` 的 `wSkVaW_header` 只在注释里，选择器本体已是 `header:has(...)`
结构锚，rc.5 免改。styles 两文件的全部 wSkVaW/Mbwy4a 均在注释里，无死规则。

**3 条已被上游吸收（免打）**：
- #9 base.css 三处 hover 包 `@media (hover: hover)` —— 上游现为 4 处（多了
  downloads/quick-settings 两个新按钮）。
- #8③ preview-full-toggle 的 hover 包裹 —— 上游 compat.css 已自带（该按钮已于 2026-11-12
  随 aionui 集成删除，见 #17）。
- #12 reasoning-defaults 退避 —— 该文件上游 v3.2.0 已退休（旧记录，本轮再次确认无需打）。

**补丁集 ↔ 台账对照**（`patches/` 下文件名 = 序号 + 路径，路径里的 `/` 写成 `__`）：

| 补丁 | 承载的改动 |
| --- | --- |
| 0001 AGENTS.md | 上游目录说明的 pocket 侧增补（#15/#17 删除后同步索引） |
| 0002 components/MobileNavToggle.tsx | #6 抽屉开关 aria-expanded 订阅 |
| 0003 components/open-files-panel.ts | #17 删第三方 explorer 回退，只留宿主右侧栏 |
| 0004 core/composer-clearance.ts | #15 清掉指向键盘抬升的注释 |
| 0005 core/visible-band-publish.ts | #16 新文件：可见带逐帧发布判据 |
| 0006 debug.ts | #3 paint() 改 rAF 合并 |
| 0007 effects/AGENTS.md | 上游 effect 索引的 pocket 侧增补 |
| 0008 effects/aionui-compat.ts | #17 整份删除 |
| 0009 effects/composer-clearance.ts | #15 注释清理 |
| 0010 effects/composer-keyboard-lift.ts | #15 整份删除 |
| 0011 effects/file-viewer-compat.ts | #5 wasActive/lastFrame memo + dispose 清缓存 |
| 0012 effects/header-metrics.ts | #17 注释里去掉已删的 preview-fullscreen |
| 0013 effects/overlay-backdrop-fab.ts | #1 frame-null 清理 + #13③ hero 锚缓存 |
| 0014 effects/panel-exit.ts | #13② panelRow 锚缓存 |
| 0015 effects/phone-chrome.ts | #17 dispose 里三个已废标记的清理 |
| 0016 effects/preview-fullscreen.ts | #17 整份删除 |
| 0017 effects/question-fullscreen.ts | 后缀锚重锚（哈希换代）+ 可见带事件消费（#16 配套） |
| 0018 effects/reconciler-adapter.ts | #17 摘掉三个任务注册与三条 attributeFilter |
| 0019 effects/session-focus-guard.ts | 2026-11-03 性能批：子树观察者只在窗口内挂 |
| 0020 effects/session-menu.ts | #2 capture anchor 共用 + #14 chat-flow 整批早退 |
| 0021 effects/sidebar-swipe.ts | #4 willChange + 输入区起手守卫 |
| 0022 effects/stats-line.ts | #13① stats 锚缓存 |
| 0023 effects/subagent-chip-touch.ts | 子代理芯片：pointerleave 一并吞掉（tap 后卡片被 hover 关掉） |
| 0024 effects/viewport-meta.ts | #16 可见带高度发布改写 |
| 0025 i18n/locales.ts | #17 删 previewFullscreen 词条 |
| 0026 index.tsx | #15/#17 摘掉 import 与装配调用 |
| 0027 platform/visible-band.ts | #16 平台层可见带事件注释配套 |
| 0028 styles/base.css.ts | #17 删 sheet-up 关键帧 |
| 0029 styles/compat.css.ts | #8①opPanel z-index +#8②cardShots 横滚 +#10 dvh + #17 两列 sheet 几何删除 |
| 0030 styles/layout.css.ts | #7 四条（text-size-adjust / overscroll / 座位 2px / 钉底）+ #10 dvh 三处 |
| 0031 styles/misc.css.ts | #17 平板居中与桌面隐藏项删除 |

**各补丁的落点与理由（2026-11-03 实录，编号沿用旧台账）**：
- #1 `effects/overlay-backdrop-fab.ts` — frame-null 分支清理 timer/backdrop/FAB（原样重打）。
- #2 `effects/session-menu.ts` — ①capture contextmenu + captureRow 共用；②removedMenu
  清 anchor。上游本轮把 onDocumentClick 重构为内联箭头函数，补丁改挂在同构的 captureRow 上。
- #3 `debug.ts` — paint() rAF 合并（schedulePaint）+ dispose 清 raf。上游新增了
  textContent 自反馈守卫，补丁保留其原语义，只把 paint() 调用点换成 schedulePaint()。
- #4 `effects/sidebar-swipe.ts` — ①armOpenFollow 加 `willChange='transform'`（本版上游
  arm 序列重排，落点在 transform pin 之后、content-visibility 之前）；②起手守卫
  composerSeat/composer-card/dock 三选择器（落在 findHorizontalScroller 判定之后）。
- #5 `effects/file-viewer-compat.ts` — wasActive/lastFrame memo + dispose 清缓存。⚠ 补丁
  引入的 `active` 变量必须先于 memo 判断计算（本轮冒烟抓到漏行）。
- #6 `components/MobileNavToggle.tsx` — aria-expanded 订阅（data-sidebar-collapsed +
  attributeFilter + 纯文本批跳过 + rAF 合并）。上游该组件本轮重写（48 行），补丁整体移植。
- #7 `styles/layout.css.ts` — ①html/body `text-size-adjust: 100%`；②scrollBody
  `overscroll-behavior: contain`；③座位/root `padding-bottom: 2px`；④座位钉底
  `margin-top: auto`（`[data-phase="active"] [data-conversation-scroll] > [data-composer-seat]`）。
  ①②③④的插入点：html,body 第一块 / scrollBody 块 / z-index:30 顶栏规则之后、
  composer-tight 块之前（新上游把钉底等旧规则整段删了，需整块移植）。
- #8 `styles/compat.css.ts` — ①opPanel `z-index: 60`；②cardShots
  `overscroll-behavior-x: contain`（③已被上游吸收）。
- #10 dvh 双行回退 — compat 1 处（模式菜单；explorer/preview 两列与预览全屏已随 #17 删除）
  + layout 3 处（team-action 面板、_panel 族 -96px、-200px）。`--dsh-web-mobile-vh`
  变量式两处上游自带回退语义免打。
- #13 每-flush 查询缓存批 — ①`effects/stats-line.ts` mark() 的锚缓存（cachedAnchor +
  dispose 清空；上游 mark() 重构为 viewportHandler 注册后的快路径，补丁挂同一处）；
  ②`effects/panel-exit.ts` panelRowActiveEl 模块级缓存；③`effects/overlay-backdrop-fab.ts`
  heroActiveEl 缓存 + dispose 清空；④`effects/aionui-compat.ts` colCache 两列缓存 +
  dispose 清空（该效果已随 #17 删除，此项仅存档）。
- #14 `effects/session-menu.ts` — body 观察者 chat-flow 整批早退（与 #2 同文件，一并打）。
- #15（2026-11-12 新增）`effects/composer-keyboard-lift.ts` — **整份删除**。上游 #149 的 iOS
  键盘抬升 2026-10-31 起就已停用（`index.tsx` 里留 `void installComposerKeyboardLift` 一行占位），
  帧数据显示它和引擎自己的滚动纠正互相拉扯（seat 578→283→560、conv 8572↔8587 每帧来回），
  而引擎单独工作时座位落在可见带内；评审报告把它列为死路径，文件与占位一并删除。
  落地形式：`patches/0010`（整份删除）+ `0026`（摘 index.tsx 的 import 与占位调用）
  + `0004`/`0009`（composer-clearance 两处注释）。上游 bump 后若该文件被改写，补丁会
  打不上——那是对账信号，别改成「同步后手工再删一次」。
- #16（2026-11-12 新增）`--dsha-mobile-visible-vh` 自适应发布 — **新文件**
  `core/visible-band-publish.ts`（纯判据，零 DOM）+ `effects/viewport-meta.ts` 的
  `syncStableViewportHeight()` 改写。评审 §3.3 要求变量跟手（键盘动画期间逐帧变），但
  2026-10-31 owner 手机实测逐帧发布会让整个 app 每帧重排约 20 次、会话列表白屏 1-2s，
  所以当时改成了「停稳才发布」。折中是：默认逐帧直写；同时量帧节拍，连续 3 帧超过 32ms
  就判定这台设备扛不住，本次会话余下时间退回停稳发布（每次过渡只重排一次），降级单向
  不回升。消费者（提问卡全屏带）仍然只在停稳后收到 `dsh-mobile-visible-band` 事件；
  `--dsha-mobile-viewport-top` 改为去重直写（全仓暂无消费者）。
  落地形式：`patches/0005`（新文件）+ `0024`（viewport-meta 改写）+ `0027`（平台层注释）
  + `0017`（question-fullscreen 消费事件）；契约断言在 `test/upstream-v323-port.test.js`
  与 `test/visible-band.test.js`。
- #17（2026-11-12 新增）aionui / dsh-web-ui explorer-preview 集成 — **整层删除**。评审
  §2.5 把它列为死路径（本机 profile 从未装过 dsh-web-ui）：`effects/aionui-compat.ts`
  （chevron 关标记、preview sheet 标记、伪装 Windows 桌面绕套件 Android 检查）、
  `effects/preview-fullscreen.ts`（预览全屏切换按钮）、`effects/reconciler-adapter.ts` 的
  三个任务注册与三条 attributeFilter、`phone-chrome.ts` dispose 的三个标记清理、
  `styles/compat.css.ts` 的两列 sheet 几何/全屏/抽屉让位/hover/reduced-motion、
  `styles/base.css.ts` 的 `dsh-web-mobile-sheet-up` 关键帧、`styles/misc.css.ts` 的平板
  居中与桌面隐藏项、`i18n/locales.ts` 的 previewFullscreen/previewExitFullscreen、pocket
  附加层的 explorer 可用性探测（issue #48）与其 POCKET_EXTRA_CSS 隐藏规则、debug 探针
  两行，全部移除。文件浏览只剩宿主官方右侧栏（`data-sidebar-right-expand` /
  `-toggle`）；dsh-web-ui 的 task-board / ssh 兼容块**保留**。
  落地形式：`patches/0003` `0008` `0012` `0015` `0016` `0018` `0025` `0028` `0029` `0031`
  + `0001`/`0007`（两份 AGENTS.md 索引）。上游 bump 后若补丁打不上，先看是不是这几份
  文件被上游改写过，再决定重放还是作废该条；改完跑 `npm run anchors:gen`（锚点台账计数
  会变）与全量测试。

**历史对账基线：v3.2.0 (473a78b)（已被 2026-11-03 的 main @2cf9061 取代，见上一节）。**
当时相对 v3.1.0 的 14 条补丁：#12
`effects/reasoning-defaults.ts` 随上游 v3.2.0 退休整份删除、补丁作废；#13 的
stats-line 部分已按上游新 `locateRing` 代码重放；其余 12 条原样重打。v3.2.0
还吸收了本仓此前的两个真机修复点（viewport `interactive-widget=resizes-content`、
swipe `if (!tracking) return`），并新增 `effects/drawer-session-log.ts`（抽屉品牌行
图标，替代旧 `sidebar.footer.action` 胶囊）——本仓 POCKET_EXTRA_CSS 里对应的
`[data-mobile-nav="session-log"]` 触控高度规则已删除。

**历史（2026-10-14 对账基线 v3.1.0 (ab3a85b)）：** v3.0.3 清单 13 条的去向：#1 脏键豁免
（上游 reconciler 拆分——adapter 过滤 [data-chat-flow] 内全部记录 + core 的
characterData 脏键取代）、#4③ dispose 清注入（上游 injected Set）、#5 gesture-guard
清扫（上游 consumed 改 WeakMap，detached 节点天然可回收）**已被上游吸收**；NS 改名
与 stats 让位升级为脚本镜像期变换（见「同步步骤」节）。存活 11 条重编号如下
（⚠ 2026-10-14 审查更正：#2「frame 缓存 isConnected 检查」v3.1.0 上游**没有**吸收
——upstream/effects/phone-chrome.ts 上游仍是裸 `frame = findFrame()`，isConnected
短路是我们镜像里的本地补丁，回归存活清单，勿再误记）：

1. `effects/overlay-backdrop-fab.ts` — frame 缺失分支：清 backdropRemoveTimer、
   backdrop/FAB 引用后 early return（挂起的 stale 引用会让 frame 恢复后永不重挂）。
2. `effects/session-menu.ts` — ① capture 阶段 contextmenu 也更新 anchor（captureRow
   共用，长按/右键开菜单）；② 菜单卸载且再无会话菜单时 anchor 清空（removedMenu
   检测，防程序化开菜单命中过期 anchor）。③ dispose 清注入项上游已做（injected Set）。
3. `debug.ts` — observer 回调里的 `paint()` 改 rAF 合并（schedulePaint + dispose
   取消）；`?mobile-nav-debug=1` 下流式每批强制 reflow 的豁免。
4. `effects/sidebar-swipe.ts` — ① follow 合成层：armOpenFollow 设
   `style.willChange='transform'`，releaseFollowStyles 与 finishPendingCommit 两个
   内联出口同步 removeProperty（漏清理=抽屉常驻占一个合成层）；② 起手守卫：目标在
   `_composerSeat`/`[data-composer-card]`/`_dock` 内直接 false（输入区起手不开抽屉）。
5. `effects/file-viewer-compat.ts` — 备忘上次 panel 存在性 + frame 引用，同值同帧
   直接 return；dispose 清缓存。
6. `components/MobileNavToggle.tsx` — 抽屉开关 a11y：`useState`+`useEffect` 订阅
   `data-sidebar-collapsed`（documentElement 级 MutationObserver + attributeFilter，
   口径同 phone-chrome drawerOpen()），渲染 `aria-expanded`，开/关态 aria-label/title
   在 `t('open')`/`t('close')` 间切换。观察者回调必须：纯文本 childList 批次跳过 +
   其余 rAF 合并——attributeFilter 不挡 childList，流式每 token 都会进回调，裸跑
   readOpen = 每帧两次全文档 querySelector。（图标兜底已上游化：core/icon-compat.ts。）
7. `styles/layout.css.ts` — `html,body` 加 `-webkit-text-size-adjust/text-size-adjust:
   100%`（iOS 竖屏防文字自动放大）；`[class*="_scrollBody"]` 加
   `overscroll-behavior: contain`；composer 座底部安全区
   `padding-bottom: 2px !important`（`_composerSeat` 三选择器组）+ 输入卡外层
   root `:has(> [class*="_card"])` 底垫同收 2px。注意：v3.1.0 起 frame 自身
   已垫 `env(safe-area-inset-bottom)`（#193），座位不得再叠 inset——旧值
   `calc(5px + env(...))` 是 v3.0.3 时代 frame 不垫底部的补偿，照叠会把
   inset 计两遍（哈希代际变化时静默 no-op）。
8. `styles/compat.css.ts` — opPanel 补 `z-index: 60 !important`；cardShots 横滚容器补
   `overscroll-behavior-x: contain !important`；preview-full-toggle 的 :hover 包入
   `@media (hover: hover)`（该按钮已随 #17 删除，这半句仅存档）。
9. `styles/base.css.ts` — 三处 :hover（toggle/files、session-log、fab）包入
   `@media (hover: hover)`（:active 拆出保留），触屏点后不再粘滞灰底。
10. dvh 全量补 vh 回退双行（vh 行在前、dvh 行在后；iOS<15.4 无 dvh 引擎整条丢弃 dvh
    声明）：`compat.css.ts` agent-preset 菜单（max-height；explorer/preview 两列与预览全屏
    已随 #17 删除）；
    `layout.css.ts` header `_menu`（max-height）、`_panel` 族（max-height calc-96px）、
    team-action 面板（max-height calc-200px）。
 11. `effects/phone-chrome.ts` — frame 引用缓存加 isConnected 短路：
     if (frame === null || !frame.isConnected) frame = findFrame()`。宿主 SPA 换页/
     重挂会把旧 frame 从文档摘除，裸缓存会让后续轮询一直对着游离节点打标。上游
     v3.1.0 仍是裸缓存（audit 2026-10-14 复核），勿信「已吸收」旧说。

2026-10-15 性能批新增 12–14（流式每-flush 固定税 + 轮询退避；#12 已于 v3.2.0 作废）：

12. ~~`effects/reasoning-defaults.ts`~~（**已作废**：v3.2.0 上游退休该文件） — 固定 10s describe 轮询改自调度退避：10s→60s→
    300s 封顶，describe 回合成功（ok=true）步进、失败（超时/拒绝/无 remote/上轮
    未完）回 10s。settings/document-updated 订阅已即时 fill，稳态每 10s 一次全量
    settings describe RPC 属重复劳动。fill 加可选 onDone(ok) 回调上报结果；2s
    retry 与事件路径不动。找点：`setInterval(fill, 10_000)` 处 + fill 尾部
    finally（onDone 调用）。
13. 每-flush 查询缓存批（四处，模式同 #11 phone-chrome frame 缓存 / installed-list
    resolveRoot 的 isConnected 短路；凡命中属性可能在保持连接的节点间移动的选择器
    （aria-current、data-phase、自有标记），缓存命中一律加 matches() 复验；缺席
    （null）不缓存负结果、照旧查询——负结果无法安全失效）：
    - `effects/stats-line.ts` — mark() 每趟的 `[data-mobile-nav="stats"]` 锚查询，
      闭包 cachedAnchor，dispose 清空；
    - `effects/panel-exit.ts` — panelOwnsMainArea() 的
      `[class*="panelRow"][aria-current="page"]`，模块级缓存（aria-current 随面板
      选中换宿主，matches 复验兜住）；
    - `effects/overlay-backdrop-fab.ts` — heroPhase() 的 `[data-phase="active"]`
      （ensure 每趟最多调两次），闭包缓存 + dispose 清空；注意别覆盖 #1 的
      frame-null 清理补丁；
    - `effects/aionui-compat.ts` — sheet-rise-replay ensure 的两列 colCache（该效果已随
      #17 删除，此项仅存档）。
14. `effects/session-menu.ts` — body 全树 MutationObserver 补 chat-flow 整批早退
    （照抄 installed-list 的过滤形态）：整批 records 全在 `[data-chat-flow]` 内
    直接 return，不跑 scheduleInject 也不跑 removedMenu 判定——会话菜单是 body 级
    portal，正文内 mutation 不可能含菜单开合。此前它是唯一缺这层过滤的观察者，
    流式期间每条记录都白跑一次 closest('[role="menu"]')。

### 适配器层的宿主侧配套（不在 upstream/ 内，但同一次合并引入）

- `lib/delete-session.mjs` + `lib/index.js` 挂 `/api/mobile-nav.session.delete`（移植
  上游 v3.0.3 宿主侧 delete-session）：上游 session-menu 的删除按钮 fetch 此端点，
  官方宿主没有——不挂则手机端删除永远 404。sameOrigin 放宽为「Origin 与 Host 同
  主机名（端口忽略）或均为 loopback」（dsh-pocket 代理会改写 Host/Origin 为 loopback
  权威后转发，宽式的直连 3080 调试也放行）。
- `mobile-apply.tsx` POCKET_EXTRA_CSS：rc.2 右上角双入口治理。原生 corner
  （`[data-conversation-header-corner]`，dsh-client-ui-sidebar-right 注入）与插件
  files 按钮叠位；上游 v3.0.3 的两条 corner 规则锚的旧结构/旧哈希（wSkVaW_→D_tfqW_）
  在 rc.2 全不命中。按 dsh-pocket 上游方案：`mobileRightbarEnabled=off` 藏 corner；
  默认 on 时 corner 36px seat + files 左移 right:44px 让位。
  **代际护栏**：off 态规则特意加 html 前缀提到 (0,4,1)——它赢的前提是上游旧结构
  corner 规则在当前宿主不命中；若未来宿主把 corner 移回 wrapper 末子节点且上游
  重锚出 `(0,5,x)` 的 `display:flex`，需同步提权本规则。每次 sync 后用
  `git grep -n 'headerCorner' upstream/styles/` 对账。

## 移植历史

- pocket 原移植基线 ≈ 上游 **v1.0.0**（MobileNavToggle/MobileDrawerFooter 逐字相同）。
- **2026-09-06 同步到 main @75d2311（v2.3.0 + PR #47）**：补齐 v1.5.0→v2.3.0 五个版本——
  - v1.5.0/v2.0.0：哈希类选择器改子串匹配 + `:not` 守卫（CSS 稳定性）、phase 2-4 代码重组
  - v2.1.1：大 JSON 压缩（宿主侧，pocket 未采用，见下）、子代理弹卡、抽屉点会话收起、输入区钉位
  - v2.2.0：抽屉「收起但不打开」修复 (#32)、子代理芯片一闪即退、iOS 点搜索框强制放大修复（PR#35 字号≥16px）、刘海屏输入框下方露白
  - v2.3.0：左缘 45% 右滑手势 (#16/PR#37)、流式每帧开销优化（raf-scheduler）、抽屉屏外跳渲染、手势后点按无响应、Android 左缘滑触发返回（overscroll-behavior-x）、起指让位横滚容器、减弱动态效果禁动画、debug 徽章重接线（?mobile-nav-debug=1）、隐形热区改纯几何判定
- **2026-09-28 同步到 main @a094288（v3.0.3 + PR #137，跨 v2.4.1 共 293 提交）**：
  - v2.4.1：浮球拖拽让位手势、session-delete 触屏全宽武装
  - v3.0.0（0.1.6-alpha.2 适配大版本）：core/icon-compat（图标两代命名运行时取）、
    core/sessions-compat（a2 双代会话形状）、输入区常驻文件入口（ComposerFileButton，
    0.1.6 删回形针后放回工具行）、侧栏面板退出路径（panel-exit）、workspace/team/
    composer-plus 三 chip 开关、model-menu-anchor、shortcut-modal-keyboard-guard、
    drawer⇄files 共存契约、#104 stats-line 脱离 React 卸载路径
  - v3.0.1–v3.0.3（0.1.7-alpha.2→rc.2 适配线）：settings/market 弹层 rc.2 portal 迁移
    重锚（#105 CSS 替代 reparent）、session-delete 0.1.7 冷启动（归档行/磨砂弹窗/
    same-origin/1MiB/trash 阶段）、stats-line/git-chip 纯 CSS 锚定、快捷键弹层手机端
    五轮修复（#120–#128 后 #137 回滚 #129–#136 为 pre-loop 树）
  - 合并时 pocket 补做：宿主侧 delete-session 路由移植（手机删除 404 断链）、
    rc.2 右上角双入口治理（见上「适配器层的宿主侧配套」）、老清单 20 条补丁对账
    重打（8 条已被上游吸收、2 条随文件删除作废、13 条存活重编号）
- **2026-10-14 同步到 v3.1.0 @ab3a85b（基于上游 v3.0.6 b78babc 的基线重放版）**：
  - 上游要点：C08 stats-line TPS 宽度不刷新（characterData scope）、panel-exit
    try/finally、disposer 按 ownership 删除、@patch 注册门禁、reasoning-effort
    自动档位（compat 不支持不写 tier）、顶栏座位重做（后台任务点进标题行、
    subagent chip 钉右、标题省略+展开）、性能第一批（header-metrics 几何重绑拆分、
    installed-list 容器缓存、model-menu-anchor 每帧 rect 缓存、composer-file-picker
    先比后写）、断点收敛 767px、!important 941→922
  - 架构变化：reconciler 拆 `core/reconciler-core.ts`（DOM-free）+
    `effects/reconciler-adapter.ts`（唯一全树 observer，characterData:true，
    **过滤 [data-chat-flow] 内全部记录**）；getFrame/findFrame 迁至
    `platform/frame.ts`；NS 家族改 `dshWebMobileNav` 前缀（与 dsh-pocket 撞车的
    #162 由上游在上游侧同时解决：pocket 应注册 pocketMobileNav——本仓由 sync
    脚本镜像期变换保证）
  - pocket 侧配套：sync 脚本新增镜像期变换 + 残留断言（见「同步步骤」节）；
    13 条补丁对账重打（4 条被上游吸收、存活 10 条重编号）；gesture-guard 的
    WeakMap 化使清扫补丁作废；session-menu ③ 上游 injected Set 化
- **2026-10-19 同步到 v3.2.0 @473a78b**（三方合并：变换后 v3.1.0 → 本仓补丁 diff →
  cherry-pick 到变换后 v3.2.0；唯一冲突 `styles/base.css.ts` 的 hover 规则按补丁形态解）：
  - 上游要点：#226 viewport 补 `interactive-widget=resizes-content`（Android 键盘
    不再把整页 pan 上去）、#223 iOS 首个 preventDefault 的 touchmove 取消整笔滚动
    导致左右死区、#227 抽屉「导出会话日志」从 footer 胶囊迁到品牌行 28×28 图标
    （新增 `effects/drawer-session-log.ts`，删 `components/MobileDrawerFooter.tsx`
    引用；镜像里该组件文件上游仍保留但已无引用）、#229 壁纸插件把侧栏底色置
    transparent 的补回、#216 宿主 0.2.1 stats 双档锚 + `locateRing`、#217 后台任务
    chip 形状锚、#214/#221 第三方卡顿与 z-index、#218 退休 reasoning-defaults、
    #219 退休 model-capabilities 面板适配
  - pocket 侧配套：14 条补丁三方合并（#12 作废、13 条存活）；POCKET_EXTRA_CSS
    删除旧 `[data-mobile-nav="session-log"]` 触控高度规则；`client/repro-activate.mjs`
    的 DOM 桩补 `querySelector` 等形状（新任务会查 frame 品牌行）
- **2026-11-03 同步到 main @2cf9061**（v3.2.1 #234、v3.2.2 #246/#250/#253 与
  #254/#257/#258 全部纳入；14 条补丁重打实录见上方「重打落点」）：
  - 上游要点：灯箱双指缩放（只缩 img，core/image-zoom-core.ts）、提问卡手动全屏回答
    （core/question-fullscreen.ts + 键盘期回答框滚回可视）、composer-clearance
    （#245 横屏键盘挤压：座位被顶栏盖住时 `data-mobile-nav-composer-tight` 收 dock 行）、
    抽屉一键设置齿轮 + 平板档单任务武装（TABLET_TOUCH_QUERY）、document-scroll-lock
    （JS 钉 document 滚动）、#254 死锚批量修复（后缀锚 + header:has 结构锚）、
    sidebar-swipe 速度窗口物理化（60ms 斜率 0.45 px/ms + 350ms 冷却）、panel-exit
    Android 返回键逐层退（pushState 必须提前备，同任务发的会被 WebView 丢）、
    host 半区 compress.ts 改 libuv 线程池（pocket 不采用——代理层已流式压缩）、
    file-transfer.js（DSHA 下载桥，pocket 不采用）
  - pocket 侧配套：14 条补丁重打（#8③/#9/#12 已被上游吸收，实打 11 条）+ 哈希重锚
    （question-fullscreen 四个 SELECTOR 常量换后缀锚，宿主 rc.5 = wnLwla_）+
    `repro-activate.mjs` window 桩补 `scrollBy`/`scrollX`（document-scroll-lock 需要）；
    冒烟 47 effects 全注册、locale NS 6 族正常、289/0/2 全绿

## pocket 附加层（适配器 mobile-apply.tsx 负责，上游没有的）

1. **布局门控（issue #74）**：`?dsh-layout=` > localStorage > auto。desktop → 整段 mobile 不挂。
2. **fileGuard（issue #17）**：拦文件链接点击、注入「复制」按钮（走 pocket RPC fileRead）、
   隐藏「添加工作区」。依赖的 CSS 规则（copy-file 按钮样式、aria-label 隐藏）也搬进了
   POCKET_EXTRA_CSS（上游样式表没有这些）。
3. **使用探针（2026-11-12，评审 Phase 2 的数据来源）**：`client/mobile/probe-core.mjs`
   （纯状态机，无 DOM/fs/localStorage）+ `mobile-apply.tsx` 的
   `armOnNarrow('dsh-pocket: usage probe (2026-11-12)')` 采集 arm + `lib/probe.mjs` 白名单落盘
   （`$DSH_HOME/dsh-pocket/probe.jsonl`，8 MB 轮转一代）+ RPC
   `pocket.probe.report/stats/clear/setEnabled`（前三个公网也放行，开关只限本机）+
   设置页「使用探针」卡 + `scripts/probe-report.mjs` 周报与判定。不采集消息内容、不发网络请求。
   **同步后确认**：mobile-apply.tsx 是 pocket 文件、sync 不覆盖，但探针 arm 引用了
   `anchors.ts` 的 ANCHORS 做宿主类名体检；sync 后若上游增删样式锚点，需跑
   `node scripts/gen-anchors.mjs` 重新生成台账，否则锚点契约测试会因「源码锚点集合 ≠ 台账」失败。

4. **轻量视图（2026-11-12，评审 §7.1 路线 A）**：`lib/lite/`（`assets.mjs` 直出 +
   `index.html`/`app.css`/`app.js` 页面本体）由代理在 `/__dsh-pocket/lite` 直出，
   **不经过宿主 HTML 注入链**，所以既不受移动端 polyfill 影响，也不需要同步上游任何文件。
   页面数据只走宿主自己的 `/api`：`session/list`、`session/state`、`session/events`
   （`beforeSeq` 排他上界翻页）、`session/prompt`、`session/cancel`；审批走
   `/api/remote.mux` 开 `$events` 流 + `POST /api/$events/result`
   （`outcome {kind:'result',value:'allowed-once'|'rejected'}`）。
   **同步后确认**：宿主若改这几个端点的信封或 args 键（例如把 `_request` 换成别的 wire 名、
   改 `$events/result` 的 outcome 形状），轻量视图会静默失效（手机上空白或发不出消息），
   需回头看 `lib/lite/app.js` 并跑 `node --test test/lite-view.test.js`。
   `assets.mjs` 首次读盘后常驻内存，**改页面文件要重启宿主**才生效（设置页「重启」或重启 dsh web）。
   **宿主会话握手**：宿主的 `/api` 与 WebSocket 要求 `dsh-auth-*` cookie（`GET /?token=…`
   换来的），而轻量视图由代理直出、从不经过 `GET /`——所以从主屏幕直接打开的手机没有 cookie，
   `/api` 全 401（列表空白 + 断线横幅）。修法在 `lib/lite/session.mjs`：直出页面前，代理
   **每次**都在服务端替浏览器做一次同样的换 cookie（`GET /?token=`，3s 超时，失败 fail open——
   页面照常直出），把上游 `Set-Cookie` 挂到**页面**响应上（静态资源不挂）。每次都换是有意的：
   宿主这一跳是现签无状态 cookie（`dsh-client-connection/src/browser-auth.ts` 的 `authorizeIndex`，
   不在宿主建会话），刷新不涨内存，还能顺带覆盖主屏冷启动、cookie 过期与放置很久再打开。
   同步后若宿主改了根路径换 cookie 的机制（issue #77 那条，含 303 + cookie 绑定 authority），
   这里要跟着改；测试见 `test/lite-view.test.js` 的 host handshake 三条。

## 故意不移植的部分

- **src/index.ts + src/compress.ts（宿主侧响应压缩）**：pocket 的 lib/proxy.mjs 已在代理层
  做大 JSON/文本的 gzip/br 流式压缩（跳过 SSE），上游的 ServerResponse 补丁与之重复且可能
  双重压缩，不采用。
- **上游 MobileNavOverlay → 已被上游自己的 reconciler 任务取代**：v2.3.0 的
  overlay-backdrop-fab 任务（createOverlayTask）就是 backdrop + FAB 的实现，pocket 旧
  MobileNavOverlay.tsx + nav-targets.mjs 已退役删除。

## 已知行为差异（相对 pocket v1.0.0 时代移植）

1. **断点三处统一为上游 MOBILE_QUERY**：`(max-width: 1023px) and (pointer: coarse)`——
   上游 JS 效果（phone-chrome MOBILE_QUERY）、上游样式主 gate（原有裸 `(max-width:768px)`
   宽度臂已按下方补丁清单收窄）、pocket 的 narrowMQ（mobile-apply.tsx，驱动 auto 判定 /
   fileGuard / zoom-lock）现在同口径。此前 pocket 只看宽度：桌面浏览器
   窄窗会误判成 mobile（fileGuard 拦文件链接弹「手机上无法打开」、隐藏「添加工作区」）。
   真机 iPhone/安卓不受影响。
2. **`?dsh-layout=mobile` 强制模式部分降级**：pocket 附加层（fileGuard）仍会强制挂载（resolveLayout 走 narrow mock 恒真）；但上游的样式与效果按 MOBILE_QUERY 门控，
   在鼠标指针的桌面浏览器上不会强制出移动布局（旧移植可以）。真机上强制 mobile 不受影响
   （本来就是 coarse pointer）。`?dsh-layout=desktop`（主要用法：宽屏手机/平板强制电脑布局）
   不受影响。
