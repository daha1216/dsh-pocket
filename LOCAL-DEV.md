# 本地联调与开发指南（v4.0）

改完代码想在本机 `dsh web` 或 DSH Desktop 里直接验证，**无需发版**——将已安装的插件目录软链（或目录联接）到本地仓库即可。

---

## 一、建立本地开发软链（只需做一次）

插件默认安装在 `$DSH_HOME/profiles/web/node_modules/dsh-pocket`（macOS/Linux 默认 `$DSH_HOME` 为 `~/.dsh`，Windows 默认 `%USERPROFILE%\.dsh`）。

### macOS / Linux

```sh
cd ~/.dsh/profiles/web/node_modules
rm -rf dsh-pocket
ln -s /你的/仓库/绝对路径/dsh-pocket dsh-pocket

# 验证软链指向
ls -l dsh-pocket
```

### Windows (PowerShell)

```powershell
$target = "$env:USERPROFILE\.dsh\profiles\web\node_modules\dsh-pocket"
if (Test-Path $target) { Remove-Item $target -Recurse -Force }
New-Item -ItemType Junction -Path $target -Value "C:\你的\仓库\绝对路径\dsh-pocket"
```

> 桌面版同理：将路径中的 `profiles/web` 替换为 `profiles/desktop` 即可。请先在本地仓库执行过一次 `npm install`。

---

## 二、常用构建、校验与测试命令

v4.0 采用第一公民化的 TypeScript/TSX 源码树（已退役历史 `vendor/` 与 `patches/` 队列，直接在源码目录内修改即可）：

```sh
# 1. TypeScript 严格类型检查（覆盖 src/**/*.ts 与 client/**/*.{ts,tsx}）
npm run typecheck

# 2. 打包客户端双产物（生成 client/client.js 与按需懒加载的 client/client.mobile.js）
npm run build

# 3. 校验或更新移动端宿主选择器锚点台账（修改了 [class*="..."] 选择器后执行）
npm run anchors:gen
node scripts/gen-anchors.mjs --check

# 4. 验证客户端在纯桌面端（不加载 mobile chunk）与窄屏移动端的双模激活行为
node client/repro-activate.mjs

# 5. 运行全量单元与集成测试套件
npm test
```

| 修改范围 | 生效步骤 |
| --- | --- |
| `lib/**`（Host 代理、认证、隧道、RPC） | 直接重启 `dsh web` 即可生效 |
| `src/shared/protocol.ts` 或 `client/**` | 先运行 `npm run build` 重新生成 `client/client.js` 与 `client/client.mobile.js`，再重启或刷新宿主 |

---

## 三、v4.0 目录结构速览

```text
dsh-pocket/
├── src/shared/protocol.ts      # 前后端共享协议类型、RPC 端点与 DOM 标记常量
├── lib/
│   ├── index.js                # Cordis 宿主插件入口（兼容 DSH 0.2.0–0.2.2+ 双代生命周期）
│   ├── web-rpc.js              # /dsh-pocket RPC 路由（状态、一步配对签发、设备管理、隧道控制）
│   ├── settings.mjs            # O(1) 内存快照 + 无阻塞异步串行原子落盘（tmp + rename + .bak）
│   ├── service.mjs             # 代理启停与 Named Tunnel Supervisor（指数退避自愈 + 熔断器）
│   ├── preflight.mjs           # TUN 虚拟网卡、代理环境变量与端口偏移预检诊断
│   ├── tunnel.mjs              # cloudflared 多镜像下载校验与命名隧道子进程拉起
│   ├── delete-session.mjs      # 会话安全移入回收站与自动过期清理
│   ├── auth/
│   │   ├── pairing.mjs         # 128-bit CSPRNG 一次性扫码配对票据签发与单次核销
│   │   └── device-store.mjs    # 持久设备凭证表（仅存 sha256 哈希）与活跃 WebSocket 即时吊销
│   └── proxy/                  # 反向代理内核
│       ├── auth.mjs / auth-flow.mjs  # ?pair=、设备 Cookie、备用 PIN 验证与限速
│       ├── pages.mjs           # 自适应深浅色 + Accept-Language 双语登录/状态页
│       ├── slim-response.mjs / slim-worker.mjs # worker_threads 64 MiB 会话列表异步瘦身与重压
│       ├── cache.mjs           # 静态转码与会话瘦身统一内存预算缓存
│       └── upgrade.mjs / inject.mjs / ws.mjs   # WS 鉴权与设备连接追踪、客户端环境补丁注入
├── client/
│   ├── api.js                  # 运行时共享协议常量（ESM）
│   ├── pocket-locales.js       # 设置页与移动端附加层中英词典（zh/en 严格同键）
│   ├── build.mjs               # esbuild 双分包构建脚本（注入 meta.stylesheets 与 chunk 包装）
│   ├── repro-activate.mjs      # 桌面零开销门控与移动端懒加载激活冒烟脚本
│   ├── client.js               # 构建产物 1：桌面与设置页轻量主入口
│   ├── client.mobile.js        # 构建产物 2：移动端宿主适配懒加载分包
│   ├── settings/               # DSH 官方 R20/0.5px 设计规范 TSX 设置页（四分区渐进披露）
│   │   ├── SettingsPage.tsx / ConnectionHubCard.tsx / DeviceListCard.tsx
│   │   ├── MobilePrefsCard.tsx / AdvancedSection.tsx
│   │   └── primitives.tsx / icons.tsx / styles.ts / use-settings.ts / util.ts
│   └── mobile/                 # 移动端宿主 UI 适配引擎
│       ├── mobile-apply.tsx    # 轻量编排入口（折叠屏/iPad auto 动态监听）
│       ├── anchors.ts          # 宿主 CSS 类名后缀锚点契约台账
│       ├── pocket/             # 偏好单次同步、/ping 链路看门狗、视口守卫、file-preview-sheet.ts
│       └── upstream/           # 内化自 dsh-web-mobile (MIT) 的抽屉、焦点域与面板栈模块
├── assets/icon.svg             # 256x256 插件矢量图标
├── docs/                       # DETAIL.zh.md / DETAIL.md 与纯矢量 preview.svg 详情头图
├── locale/                     # zh.json / en.json 插件商店双语元数据
└── test/                       # Node.js 原生 node:test 测试集
```

---

## 四、重启 `dsh web` 与验证本地产物

在终端后台无挂起重启 `dsh web`（macOS / Linux 示例）：

```sh
kill $(lsof -ti :3080 -sTCP:LISTEN) 2>/dev/null || true

node -e "
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const out = fs.openSync('/tmp/dsh-web-dev.log', 'a');
spawn('dsh', ['web'], {
  detached: true, stdio: ['ignore', out, out], env: process.env, cwd: process.env.HOME,
}).unref();
"

# 检查宿主端口 (3080) 与 Pocket 代理端口 (3081)
curl -s -o /dev/null -w "3080:%{http_code}\n" http://127.0.0.1:3080/
curl -s -o /dev/null -w "3081:%{http_code}\n" http://127.0.0.1:3081/__dsh-pocket/ping
```

确认浏览器加载的是最新构建的 `client/client.js`：比对宿主页 HTML 中 `dsh-pocket/client.js?rev=<hash>` 与本地产物内容摘要，修改并重跑 `npm run build` 后 `client.js` 与 `client.mobile.js` 的时间戳及 `rev` 参数会同步刷新。

---

## 五、切回 GitHub 发布版

联调结束后，重新执行标准安装命令即可将软链替换回正式安装的包：

```sh
dsh plugin --profile web add github:daha1216/dsh-pocket -w
```

随后重启 `dsh web` 即可。
