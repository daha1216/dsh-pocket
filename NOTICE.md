# NOTICE / 来源与第三方声明

本仓库**不是原始作品**，是以下项目的个人 fork（自用维护副本）。

## 主体：dsh-pocket

- 上游：https://github.com/shaobeichen/dsh-pocket （作者：程序员少北晨 / shaobeichen）
- 许可：**GPL-2.0**（全文见 `LICENSE`，原样保留上游版权声明与许可文本）
- 本仓库基线：上游 **v2.10.6**，维护者 **大哈**（[@daha1216](https://github.com/daha1216)）
- 本仓库改动：在上游基础上加了几处自用定制（静态资源缓存与 PWA、已授权设备管理、
  Web Push 通知、公网入口安全声明），并把设置页页脚 / 仓库链接改为本 fork。
  功能与上游一致，不含删减。
- 按 GPL-2.0 要求：本副本同样以 GPL-2.0 发布；上游版权与许可全文保留，改动之处即本仓库
  相对上游的 git 差异。

> 说明：本仓库源码 = 本机 `~/.dsh/profiles/web/node_modules/dsh-pocket` 已安装树的快照
> （排除 `node_modules/`）。因此它天然包含了 `~/.dsh/profiles/web/patches/` 里那条本地补丁
> 的全部内容——**本仓库就是那批改动的源码形态**。

## 移动端适配：dsh-web-mobile

- 上游：https://github.com/mexiaosqwq/dsh-web-mobile （作者：mexiaosqwq）
- 许可：**MIT**（兼容 GPL-2.0），声明原文保留在 `client/mobile/LICENSE.dsh-web-mobile`
- 范围：`client/mobile/upstream/**` 为其 `src/client/**` 的原样镜像，另含 pocket 侧适配层

## 运行时下载的第三方二进制：cloudflared

- 上游：https://github.com/cloudflare/cloudflared （Cloudflare，Apache-2.0）
- **本仓库不打包、不分发**该二进制；`lib/tunnel.mjs` 在用户首次开启公网访问时按平台从
  cloudflared 官方发布页（及国内镜像）下载到本机 `$DSH_HOME/dsh-pocket/bin/`，
  并以 `--no-autoupdate` 启动。

## 依赖

- 运行时依赖：`qrcode`（MIT）、`qrcode-terminal`（Apache-2.0）
- 对等依赖：`@deepseek-ai/cordis`（DeepSeek Harness 侧提供，本仓库不打包）

## 仓库内与源码快照的差异

仓库比源码快照多这三个**纯仓库维护文件**（不进 npm 包、不影响运行）：
`.gitignore`、`.gitattributes`、本 `NOTICE.md`。
