# NOTICE / 来源与第三方声明

本仓库**不是原始作品**，是以下项目的个人 fork（纯净合并版）。

## 主体：dsh-pocket

- 上游：https://github.com/shaobeichen/dsh-pocket （作者：程序员少北晨 / shaobeichen）
- 许可：**GPL-2.0**（全文见 `LICENSE`，原样保留上游版权声明与许可文本）
- 本仓库基线：上游 main（v2.10.6 线，d2e0b46），维护者 **大哈**（[@daha1216](https://github.com/daha1216)）
- 合并策略：**纯净合并**——不带旧 fork 的自用定制（静态资源缓存与 PWA、已授权设备管理、
  Web Push 通知等均不包含），只保留两上游的最新代码 + 必要适配修复
  （如 dsh 0.2.0-rc.1 手机端模型设置页加载失败修复）+ 品牌化（设置页页脚与仓库链接指向本 fork）。
- 按 GPL-2.0 要求：本副本同样以 GPL-2.0 发布；上游版权与许可全文保留，改动之处即本仓库
  相对上游的 git 差异（`CHANGELOG.md` 为上游历史记录，原样保留）。

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
