# NOTICE / 来源与第三方声明

本仓库不是原始作品，是以下项目的个人副本与加固版：

## 主体：dsh-pocket

- 上游：https://github.com/shaobeichen/dsh-pocket （作者：程序员少北晨 / shaobeichen）
- 许可：**GPL-2.0**（全文见 `LICENSE`）
- 本仓库基线：上游 **v2.10.3**
- 本仓库改动：仅两处安全加固，见 `SECURITY-NOTES.md`。功能、界面、文案均沿用上游。
- 按 GPL-2.0 要求：本副本同样以 GPL-2.0 发布，保留上游版权声明与许可全文；
  修改之处已在 `SECURITY-NOTES.md` 明确标注。

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
