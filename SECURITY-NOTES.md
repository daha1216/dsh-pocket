# 安全说明（本 fork）

本仓库是 [shaobeichen/dsh-pocket](https://github.com/shaobeichen/dsh-pocket) 的个人自用副本，
内容取自**本机已安装的 v2.10.3 产物**（`~/.dsh/profiles/web/node_modules/dsh-pocket`），
已做一次安全审查，并修掉其中两处可被利用的问题。除此以外未改功能。

## 相对上游 v2.10.3 的两处加固

### 1. 限速身份键不再信任任意来源的 `cf-connecting-ip`（`lib/proxy.mjs`）

**问题**：`clientIp(req)` 原先无条件采信请求头 `cf-connecting-ip`：

```js
const cf = String(req.headers['cf-connecting-ip'] ?? '').trim();
if (cf) return cf;
```

该头是**请求头**，不是可信信道。能直连代理端口（局域网 IP 或你自己暴露的端口）的人只要
每次请求换一个头值，就等于每次换一个限速身份，8 位 PIN 的「连续输错 5 次锁 60 秒」
完全失效——退化成可全速穷举。

**修复**：仅当连接源地址是 loopback（即经本机 cloudflared 隧道回连，源地址必为 127.0.0.1）
才采信该头，其余一律用 socket 源地址（函数已导出，便于验证）：

```js
const addr = String(req.socket?.remoteAddress ?? '');
if (classifySource(addr) === 'loopback') {
  const cf = String(req.headers['cf-connecting-ip'] ?? '').trim();
  if (cf) return cf;
}
return addr || 'unknown';
```

隧道场景行为不变（cf-connecting-ip 仍被采信）；`x-forwarded-for` 始终不采信。

**已验证**（`verify-security.mjs`，4 条断言）：来源 `203.0.113.9` / `192.168.1.50` 时
伪造头被忽略、身份保持 socket 地址；来源 `127.0.0.1` 时仍采信该头。

**已知边界（接受）**：本机进程伪造该头仍能换身份。本机进程已具备本机任意执行权限，
不是这条防线要挡的对象；局域网与公网来源的绕过通道已关闭。

（与上游 v2.10.4 commit `517eb00` 的同一处修复等价，另加导出与注释。）

### 2. 登录表单改常量时间比较（`lib/proxy.mjs`）

**问题**：`POST /pocket-login` 原先用 `submitted === token` 比对 PIN——普通 `===` 在首个
不同字节处提前返回，理论上可被计时侧信道逐字节还原 PIN（issue #90 已在 cookie 与
`?token=` 两条通道用 `safeEqual` 修掉，这里被漏掉）。同时它只比对主 PIN，会挡掉
替代令牌（临时 PIN，issue #69 钩子）。

**修复**：与另外两条通道统一——对 `acceptedTokens`（主 PIN + 替代令牌）逐个 `safeEqual`：

```js
const matched = acceptedTokens.find((candidate) => safeEqual(submitted, candidate));
if (matched !== undefined) { /* 种 cookie 用 matched */ }
```

**已验证**（`verify-security.mjs`）：正确 PIN → 302 放行（带 `/?dsh-pocket-auth=1`）、
替代令牌（临时 PIN）→ 302 放行、错误 PIN → 200 登录页。

（与上游 v2.10.4 commit `517eb00` 的同一处修复等价。）

## 验证脚本

```sh
node verify-security.mjs   # 8 条断言，无第三方依赖；全过 → exit 0
```

输出示例：`同一身份连续失败达阈值后锁定（429） — 状态序列=200,200,200,200,429`

## 审查结论：未发现的问题

- **无硬编码凭据**：全量源码（含 `client/client.js` 打包产物）无 token / 私钥 / 密码字面量。
- **凭据都在本机运行时目录，不入库**：公网 PIN 存 `$DSH_HOME/dsh-pocket/token`、
  局域网 PIN 存 `.../token-lan`、开关与自定义标记/tunnel token 存 `.../settings.json`
  （`lib/settings.mjs:36` 以 `mode: 0o600` 写入）。这些文件**不在本仓库**。
- **无静默外发**：出站目标仅限 cloudflared 官方源与三个国内加速镜像（`ghproxy.net`、
  `gh.ddlc.top`、`gh-proxy.com`）、清华 TUNA Homebrew bottle 镜像、Cloudflare 隧道端点。
  没有任何第三方统计/回传地址。
- **无 `eval` / `new Function` / `vm`**：子进程调用仅四处，均为固定命令——
  `ipconfig`（探测本机局域网 IP，`lib/service.mjs:120`）、`where cloudflared`（探测已装二进制，
  `lib/tunnel.mjs:346`）、`cloudflared tunnel run`（`lib/tunnel.mjs:452/542`）、
  `dsh plugin ... update dsh-pocket`（设置页手动点更新，`lib/index.js:221`）。
- **失败时闭合（fail closed）**：除 loopback 与私网地址外，一切陌生域名按公网处理、强制公网 PIN。
- **下载的 cloudflared 以 `--no-autoupdate` 启动**，不会被静默换版本。

## 已知的、按设计接受的边界（非漏洞，但你需要知道）

- **`pocket.fileRead` 可读任意本机文件路径**（`lib/web-rpc.js:146`，手机端「复制文件内容」用）。
  它没有工作区沙箱：绝对路径、`~/` 展开、相对路径都收。可达性等于「拿到 PIN 就能读你机器上的文件」。
  仅当你自己开启公网访问、且 PIN 泄露时才有实际风险。
- **DSH 本身能执行代码**：公网访问 = 把可执行代码的 DSH 暴露到互联网。用完即关、用强 PIN。
- **`install` 请固定到 commit**（见下），避免「仓库被改 → 下次装到别的代码」。

## 安装与更新

```sh
# 固定 commit 安装（推荐：pinned spec，pnpm 只在 ref 变化时才重新取，不会静默拉到新代码）
dsh plugin --profile web add github:daha1216/dsh-pocket#<commit-sha> -w

# 跟默认分支（每次重装可能拿到新代码）
dsh plugin --profile web add github:daha1216/dsh-pocket -w
```

改本仓库后原子生效：更新 `package.json` 的 `version` → push → 本机
`dsh plugin --profile web update dsh-pocket --latest -w` → 重启 dsh web。

## 版本

`2.10.3`，与上游 v2.10.3 同号：本 fork 只做安全加固，不参与上游版本序列，也**不使用**
上游 `dsh plugin ... update ... --latest` 之类的语义（本仓库不从 npm 安装）。
