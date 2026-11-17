# dsh-pocket v4.0 移动端适配架构说明

自 **v4.0.0** 起，`client/mobile/` 已内化为本仓库的一等 TypeScript / TSX 源码，独立演进（不再依赖 `vendor/dsh-web-mobile` 快照、`patches/` 补丁队列与 `upstream:*` 同步脚本；轻量视图与使用探针亦已退役）。原衍生自 [dsh-web-mobile](https://github.com/mexiaosqwq/dsh-web-mobile) 的部分完整保留 MIT 许可证声明（见 [LICENSE.dsh-web-mobile](./LICENSE.dsh-web-mobile)）。

## 目录结构

```text
client/
  index.tsx                      ← 主入口（SettingsPage + 桌面零开销门控 + 按需异步加载 client.mobile.js）
  mobile-chunk.ts                ← 移动端分包入口（导出 mobileApply -> client/client.mobile.js）
  mobile/
    LICENSE.dsh-web-mobile       ← MIT 归属声明（必须保留）
    PORTING.md                   ← 本说明文档
    mobile-apply.tsx             ← 移动端编排器（布局判定 / auto 折叠屏动态门控 / upstream + pocket 装配）
    layout-mode.mjs              ← ?dsh-layout=desktop|mobile|auto 与 localStorage 持久化判定
    settling-watchdog.mjs        ← settling 卡死恢复与链路存活状态机（纯函数可单测）
    fileGuard.ts                 ← 文件预览抽屉兼容导出入口
    anchors.ts                   ← 宿主 CSS Modules [class*="..."] 锚点自动台账（勿手改）
    pocket/
      extra-styles.css.ts        ← 横屏刘海安全区、键盘座位抬升、settling 兜底、文件预览抽屉样式
      prefs-sync.ts              ← 单次 pocket.status 启动同步 4 项手机偏好 + CustomEvent 实时监听
      zoom-and-dialog.ts         ← iOS 条件捏合缩放锁（>1x 永远放行还原）+ 模态弹窗焦点约束
      link-and-settling.ts       ← settling 看门狗 + /__dsh-pocket/ping 零 I/O 探活与状态胶囊
      viewport-and-chrome.ts     ← --dshp-kb 键盘高度、iOS standalone 视口守卫、首次引导、无轮询回到底部胶囊
      file-preview-sheet.ts      ← 移动端文件链接底部代码预览抽屉（接入 panel-stack.ts 与 Android 返回键）
    upstream/                    ← 内化维护的移动壳层核心（抽屉手势、协调器、焦点域、面板栈与布局样式）
```

## 双分包按需加载（`client.js` + `client.mobile.js`）

`npm run build`（`node client/build.mjs`）产出两个模块包：

1. **`client/client.js`**：仅包含设置页（`SettingsPage`）、词典、协议常量与轻量布局门控，并通过 `meta().stylesheets` 向 DSH `0.2.2-rc.2+` 声明 `client/settings/styles.css`（旧版宿主自动走 `<style id="dshp-settings-css">` 回退）。纯桌面精细指针环境（`>= 1024px` 且非 `pointer: coarse`）启动时**零开销**，完全不下载或执行移动端适配代码。
2. **`client/client.mobile.js`**：包含完整的移动端壳层与 `pocket/` 增强模块，在窄屏、触屏设备（含 iPad 横屏与展开态折叠屏）、`?dsh-layout=mobile` 或窗口缩窄跨过断点时经 `require.async('./client.mobile.js')` 按需加载。

## 宿主升级与锚点台账维护

手机层样式通过 `[class*="..."]` 子串锚定宿主 CSS Modules 类名，所有锚点集中登记在 `client/mobile/anchors.ts`：

```bash
npm run anchors:dump                  # 从本机 DSH Desktop (app.asar) 抽取真实类名快照
npm run anchors:gen                   # 根据 client/ 源码重算 client/mobile/anchors.ts
node scripts/gen-anchors.mjs --check  # 校验 anchors.ts 是否与源码完全一致
npm run anchors:report                # 输出 legacy / external 锚点与源码落点报告
```

## 常用验证命令

```bash
npm run typecheck             # TypeScript 全量类型检查 (tsc --noEmit)
npm run build                 # 构建 client/client.js 与 client/client.mobile.js
node client/repro-activate.mjs # 验证桌面零加载门控与移动端分包激活冒烟
npm test                      # 运行单元与集成测试套件
```
