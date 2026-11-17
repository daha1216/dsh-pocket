# NOTICE / 来源与第三方开源许可声明

本项目（`dsh-pocket`）以 **GPL-2.0** 许可证开源发布（全文见根目录 `LICENSE`）。自 **v4.0.0** 起，本仓库作为独立架构版本自主演进，不再使用历史 `vendor/` 快照与 `patches/` 补丁队列机制，同时完整保留并致谢以下上游项目与第三方组件的版权及许可声明。

---

## 1. 基础前身项目：shaobeichen/dsh-pocket

- **上游仓库**：https://github.com/shaobeichen/dsh-pocket
- **原作者**：程序员少北晨（`shaobeichen`）
- **许可证**：**GPL-2.0**（版权声明与许可正文完整保留于 `LICENSE`）
- **演进说明**：本仓库早期由 [@daha1216](https://github.com/daha1216)（大哈）基于上游 `dsh-pocket` 派生维护；v4.0.0 重构了设备级持久认证、一步扫码配对、Worker 异步代理瘦身、隧道守护自愈与 DSH 官方规范 TSX 设置页，所有衍生修改均遵循 GPL-2.0 开源发布。

---

## 2. 内化的移动端适配代码：mexiaosqwq/dsh-web-mobile (MIT)

本仓库中用于将 DeepSeek Harness 桌面 Web 界面适配为移动端抽屉与触控体验的部分核心模块，最初移植并衍生自 `dsh-web-mobile`：

- **上游仓库**：https://github.com/mexiaosqwq/dsh-web-mobile
- **原作者**：`mexiaosqwq`
- **许可证**：**MIT License**（与 GPL-2.0 完全兼容）
- **涉及路径与文件**：
  - `client/mobile/upstream/**`（内化并持续维护的抽屉框架、焦点域管理、面板栈、手势与移动端样式层，已移除外部私有图标包运行时依赖并改为自有内联 SVG）
  - `lib/delete-session.mjs`（会话回收站安全删除路由与事务逻辑）
  - `client/mobile/LICENSE.dsh-web-mobile`（上游版权声明文件）
- **MIT 版权与许可正文**：

```text
Copyright (c) mexiaosqwq

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 3. 运行时按需下载的外部工具：cloudflared

- **上游仓库**：https://github.com/cloudflare/cloudflared （Cloudflare, Inc.）
- **许可证**：**Apache-2.0**
- **说明**：本仓库**不打包、不分发** `cloudflared` 二进制文件。仅当用户主动配置并开启公网命名隧道且本机未安装 `cloudflared` 时，`lib/tunnel.mjs` 才从官方发布源或镜像按需下载至用户本机 `$DSH_HOME/dsh-pocket/bin/` 目录并以独立子进程方式调用。

---

## 4. 运行时与对等依赖

- **运行时依赖**：`qrcode`（MIT License，用于本地生成配对与通道二维码）
- **宿主对等依赖（Peer Dependencies）**：`@deepseek-ai/cordis`（由宿主 DeepSeek Harness 环境提供，本仓库不打包分发）
