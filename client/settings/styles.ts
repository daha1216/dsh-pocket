// dsh-pocket v4.0 设置页样式系统（对齐 DSH Official R20 / 0.5px / --dsw-alias-* 规范）
// - 卡片统一 R20 + 0.5px 细描边 + 层级底色，零阴影，零硬编码深色选择器
// - 圆角严格阶梯：R8 (sm) / R12 (md) / R16 (lg) / R20 (xl) / R28 (panel)
// - 圆形 (50%) 与胶囊 (999px) 全部声明 corner-shape: round
// - 字重上限 500，靠字号与 label-primary/secondary/tertiary 墨色拉开层级
// - @media (hover: hover) 隔离悬停态；@media (pointer: coarse) 锁定输入控件 >= 16px 字号防 iOS 缩放
export const POCKET_SETTINGS_CSS = `
.dshp-page {
  --dshp-ink-1: var(--dsw-alias-label-primary, #111318);
  --dshp-ink-2: var(--dsw-alias-label-secondary, #5a6069);
  --dshp-ink-3: var(--dsw-alias-label-tertiary, #868c96);
  --dshp-brand: var(--dsw-alias-brand-primary, #2563eb);
  --dshp-on-brand: var(--dsw-alias-label-primary-foreground, #ffffff);
  --dshp-danger: var(--dsw-alias-state-error-primary, #e5484d);
  --dshp-warn: var(--dsw-alias-state-warn-primary, #d97706);
  --dshp-success: var(--dsw-alias-state-success-primary, #10b981);
  --dshp-surface-1: var(--dsw-alias-bg-layer-1, #ffffff);
  --dshp-surface-2: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.04));
  --dshp-surface-3: var(--dsw-alias-bg-layer-3, rgba(127, 127, 127, 0.08));
  --dshp-stroke: var(--dsw-alias-settings-card-stroke, var(--dsw-alias-border-l4, rgba(127, 127, 127, 0.18)));
  --dshp-stroke-soft: color-mix(in srgb, var(--dshp-ink-1) 9%, transparent);
  --dshp-stroke-strong: color-mix(in srgb, var(--dshp-ink-1) 18%, transparent);
  --dshp-fill-subtle: color-mix(in srgb, var(--dshp-ink-1) 4.5%, transparent);
  --dshp-fill-hover: color-mix(in srgb, var(--dshp-ink-1) 7.5%, transparent);
  --dshp-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  box-sizing: border-box;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 4px 0 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: var(--dshp-ink-1);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.55;
}

.dshp-page *, .dshp-page *::before, .dshp-page *::after {
  box-sizing: border-box;
}

/* 页头与通道状态胶囊 */
.dshp-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.dshp-head-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1 1 240px;
}

.dshp-badge {
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: var(--dsw-radius-md, 12px);
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--dshp-brand) 10%, var(--dshp-surface-2));
  color: var(--dshp-brand);
  border: 0.5px solid color-mix(in srgb, var(--dshp-brand) 22%, transparent);
}

.dshp-head-main {
  flex: 1;
  min-width: 0;
}

.dshp-title {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.3;
  color: var(--dshp-ink-1);
}

.dshp-sub {
  margin-top: 3px;
  font-size: 12.5px;
  color: var(--dshp-ink-2);
  line-height: 1.45;
}

.dshp-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.dshp-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  corner-shape: round;
  border: 0.5px solid var(--dshp-stroke);
  background: var(--dshp-fill-subtle);
  font-size: 12px;
  font-weight: 500;
  color: var(--dshp-ink-2);
  white-space: nowrap;
}

.dshp-chip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  corner-shape: round;
  background: currentColor;
  opacity: 0.5;
}

.dshp-chip.is-on {
  background: color-mix(in srgb, var(--dshp-success) 12%, transparent);
  border-color: color-mix(in srgb, var(--dshp-success) 28%, transparent);
  color: color-mix(in srgb, var(--dshp-success) 78%, var(--dshp-ink-1));
}

.dshp-chip.is-on .dshp-chip-dot {
  background: var(--dshp-success);
  opacity: 1;
}

.dshp-chip.is-warn {
  background: color-mix(in srgb, var(--dshp-warn) 12%, transparent);
  border-color: color-mix(in srgb, var(--dshp-warn) 28%, transparent);
  color: color-mix(in srgb, var(--dshp-warn) 82%, var(--dshp-ink-1));
}

.dshp-chip.is-warn .dshp-chip-dot {
  background: var(--dshp-warn);
  opacity: 1;
}

/* 标准设置卡片（R20 + 0.5px 描边 + 零阴影） */
.dshp-card {
  border-radius: var(--dsw-radius-xl, 20px);
  border: 0.5px solid var(--dsw-alias-settings-card-stroke, var(--dsw-alias-border-l4, rgba(127, 127, 127, 0.18)));
  background: var(--dsw-alias-settings-card-fill, var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.04)));
  overflow: hidden;
}

.dshp-card.is-danger {
  border-color: color-mix(in srgb, var(--dshp-danger) 28%, var(--dshp-stroke));
  background: color-mix(in srgb, var(--dshp-danger) 3.5%, var(--dsw-alias-settings-card-fill, var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.04))));
}

.dshp-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
}

.dshp-card-head-left {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  min-width: 0;
  flex: 1;
}

.dshp-card-icon {
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: var(--dsw-radius-sm, 8px);
  display: grid;
  place-items: center;
  background: var(--dshp-fill-subtle);
  color: var(--dshp-ink-2);
  border: 0.5px solid var(--dshp-stroke-soft);
}

.dshp-card-text {
  flex: 1;
  min-width: 0;
}

.dshp-card-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.dshp-card-title {
  font-size: 14.5px;
  font-weight: 500;
  line-height: 1.35;
  color: var(--dshp-ink-1);
}

.dshp-card-sub {
  margin-top: 2px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--dshp-ink-3);
}

.dshp-card-body {
  padding: 0 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dshp-card-body > .dshp-row:first-child {
  border-top: 0.5px solid var(--dshp-stroke-soft);
  padding-top: 14px;
}

/* SegmentedControl（外 R12 + 4px 内距 + 内 R8 同心圆角） */
.dshp-hub-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px 0;
  flex-wrap: wrap;
}

.dshp-seg {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border-radius: var(--dsw-radius-md, 12px);
  background: var(--dshp-fill-subtle);
  border: 0.5px solid var(--dshp-stroke-soft);
  min-width: 0;
  max-width: 100%;
}

.dshp-seg-item {
  font: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  border: 0;
  border-radius: var(--dsw-radius-sm, 8px);
  background: transparent;
  color: var(--dshp-ink-2);
  font-size: 12.5px;
  font-weight: 500;
  white-space: nowrap;
  transition: background 0.14s ease, color 0.14s ease;
}

.dshp-seg-item.is-active {
  background: var(--dshp-surface-1);
  color: var(--dshp-ink-1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.dshp-seg-item:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--dshp-brand) 45%, transparent);
  outline-offset: 1px;
}

.dshp-hub-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--dshp-ink-2);
}

.dshp-hub-body {
  padding: 14px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 二维码与直连面板（嵌套容器 R16） */
.dshp-qr-hub {
  display: flex;
  align-items: stretch;
  gap: 16px;
  padding: 14px;
  border-radius: var(--dsw-radius-lg, 16px);
  background: var(--dshp-fill-subtle);
  border: 0.5px solid var(--dshp-stroke-soft);
}

.dshp-qr-col {
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.dshp-qr-frame {
  padding: 8px;
  background: #ffffff;
  border-radius: var(--dsw-radius-lg, 16px);
  border: 0.5px solid rgba(15, 17, 21, 0.12);
  display: grid;
  place-items: center;
}

.dshp-qr-frame img {
  display: block;
  width: 132px;
  height: 132px;
  border-radius: var(--dsw-radius-xs, 4px);
}

.dshp-qr-main {
  flex: 1 1 220px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.dshp-pair-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.dshp-pair-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  corner-shape: round;
  background: color-mix(in srgb, var(--dshp-brand) 12%, transparent);
  border: 0.5px solid color-mix(in srgb, var(--dshp-brand) 28%, transparent);
  color: color-mix(in srgb, var(--dshp-brand) 85%, var(--dshp-ink-1));
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
}

.dshp-url-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 10px;
  border-radius: var(--dsw-radius-md, 12px);
  background: var(--dshp-surface-1);
  border: 0.5px solid var(--dshp-stroke);
  min-width: 0;
}

.dshp-url {
  font-family: var(--dshp-mono);
  font-size: 12.5px;
  line-height: 1.5;
  word-break: break-all;
  color: var(--dshp-ink-1);
  min-width: 0;
  flex: 1;
}

.dshp-qr-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.dshp-qr-hint {
  font-size: 12px;
  line-height: 1.5;
  color: var(--dshp-ink-3);
}

/* 设置行（Row） */
.dshp-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 14px;
  border-top: 0.5px solid var(--dshp-stroke-soft);
}

.dshp-row.is-borderless {
  border-top: 0;
  padding-top: 0;
}

.dshp-row-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  row-gap: 8px;
  flex-wrap: wrap;
  width: 100%;
  min-width: 0;
}

.dshp-row.is-stack .dshp-row-main {
  align-items: flex-start;
}

.dshp-row-info {
  flex: 1 1 200px;
  min-width: 0;
}

.dshp-row-label {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--dshp-ink-1);
  line-height: 1.4;
}

.dshp-row-desc {
  margin-top: 3px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--dshp-ink-3);
}

.dshp-row-control {
  flex: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 按钮：md (H34 / R12) 与 sm (H28 / R8) */
.dshp-btn {
  font: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 34px;
  padding: 0 14px;
  border-radius: var(--dsw-radius-md, 12px);
  border: 0.5px solid transparent;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition: background 0.14s ease, border-color 0.14s ease, color 0.14s ease, opacity 0.14s ease;
}

.dshp-btn.is-sm,
.dshp-btn.is-mini {
  height: 28px;
  padding: 0 10px;
  font-size: 12px;
  border-radius: var(--dsw-radius-sm, 8px);
}

.dshp-btn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--dshp-brand) 45%, transparent);
  outline-offset: 2px;
}

.dshp-btn:disabled {
  opacity: 0.45;
  cursor: default;
}

.dshp-btn.is-primary {
  background: var(--dshp-brand);
  color: var(--dshp-on-brand);
  border-color: transparent;
}

.dshp-btn.is-secondary,
.dshp-btn.is-ghost {
  background: var(--dshp-surface-1);
  border-color: var(--dshp-stroke-strong);
  color: var(--dshp-ink-1);
}

.dshp-btn.is-quiet {
  background: transparent;
  border-color: transparent;
  color: var(--dshp-ink-2);
}

.dshp-btn.is-danger {
  background: color-mix(in srgb, var(--dshp-danger) 8%, transparent);
  border-color: color-mix(in srgb, var(--dshp-danger) 30%, transparent);
  color: var(--dshp-danger);
}

/* 开关（Switch：999px 轨道 + 50% 圆钮，均带 corner-shape: round） */
.dshp-switch {
  flex: none;
  position: relative;
  width: 38px;
  height: 22px;
  padding: 2px;
  border: 0;
  border-radius: 999px;
  corner-shape: round;
  cursor: pointer;
  background: color-mix(in srgb, var(--dshp-ink-1) 18%, transparent);
  transition: background 0.15s ease;
}

.dshp-switch[aria-checked="true"] {
  background: var(--dshp-brand);
}

.dshp-switch:disabled {
  opacity: 0.45;
  cursor: default;
}

.dshp-switch:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--dshp-brand) 45%, transparent);
  outline-offset: 2px;
}

.dshp-switch-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  corner-shape: round;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.15s ease;
}

.dshp-switch[aria-checked="true"] .dshp-switch-thumb {
  transform: translateX(16px);
}

/* 输入框与下拉选择（H34 / R12） */
.dshp-input,
.dshp-select {
  font: inherit;
  height: 34px;
  padding: 0 12px;
  border-radius: var(--dsw-radius-md, 12px);
  border: 0.5px solid var(--dshp-stroke-strong);
  background: var(--dshp-surface-1);
  color: var(--dshp-ink-1);
  font-size: 13px;
  font-weight: 400;
  outline: none;
  min-width: 0;
}

.dshp-select {
  padding-right: 28px;
  min-width: 120px;
  cursor: pointer;
}

.dshp-input:focus,
.dshp-select:focus {
  border-color: color-mix(in srgb, var(--dshp-brand) 55%, transparent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dshp-brand) 14%, transparent);
}

.dshp-input.is-mono {
  font-family: var(--dshp-mono);
  letter-spacing: 0.03em;
}

/* 提示横幅（Alert：R16 嵌套圆角） */
.dshp-alert {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 12px 14px;
  border-radius: var(--dsw-radius-lg, 16px);
  background: var(--dshp-fill-subtle);
  border: 0.5px solid var(--dshp-stroke);
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--dshp-ink-2);
}

.dshp-alert-icon {
  flex: none;
  margin-top: 2px;
  color: var(--dshp-ink-2);
  display: inline-flex;
}

.dshp-alert.is-info {
  background: color-mix(in srgb, var(--dshp-brand) 6%, var(--dshp-fill-subtle));
  border-color: color-mix(in srgb, var(--dshp-brand) 20%, var(--dshp-stroke));
}

.dshp-alert.is-info .dshp-alert-icon {
  color: var(--dshp-brand);
}

.dshp-alert.is-warn {
  background: color-mix(in srgb, var(--dshp-warn) 9%, transparent);
  border-color: color-mix(in srgb, var(--dshp-warn) 26%, transparent);
  color: var(--dshp-ink-1);
}

.dshp-alert.is-warn .dshp-alert-icon {
  color: var(--dshp-warn);
}

.dshp-alert.is-error {
  background: color-mix(in srgb, var(--dshp-danger) 9%, transparent);
  border-color: color-mix(in srgb, var(--dshp-danger) 26%, transparent);
  color: var(--dshp-ink-1);
}

.dshp-alert.is-error .dshp-alert-icon {
  color: var(--dshp-danger);
}

.dshp-alert.is-success {
  background: color-mix(in srgb, var(--dshp-success) 9%, transparent);
  border-color: color-mix(in srgb, var(--dshp-success) 26%, transparent);
}

.dshp-alert.is-success .dshp-alert-icon {
  color: var(--dshp-success);
}

.dshp-alert-body {
  flex: 1;
  min-width: 0;
}

.dshp-alert-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--dshp-ink-1);
  margin-bottom: 2px;
}

/* 嵌套面板与两步公网配置向导（R16） */
.dshp-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  border-radius: var(--dsw-radius-lg, 16px);
  background: var(--dshp-fill-subtle);
  border: 0.5px solid var(--dshp-stroke-soft);
}

.dshp-panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.dshp-panel-title {
  font-family: var(--dshp-mono);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--dshp-ink-1);
  word-break: break-all;
}

.dshp-step-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  border-radius: var(--dsw-radius-lg, 16px);
  background: var(--dshp-fill-subtle);
  border: 0.5px solid var(--dshp-stroke-soft);
}

.dshp-step-title {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--dshp-ink-1);
}

.dshp-step-desc {
  font-size: 12px;
  line-height: 1.5;
  color: var(--dshp-ink-2);
}

.dshp-target-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  padding: 6px 8px 6px 12px;
  border-radius: var(--dsw-radius-md, 12px);
  background: var(--dshp-surface-1);
  border: 0.5px solid var(--dshp-stroke);
}

.dshp-target-code {
  font-family: var(--dshp-mono);
  font-size: 12.5px;
  color: var(--dshp-ink-1);
  word-break: break-all;
}

.dshp-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dshp-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--dshp-ink-2);
}

/* Zone 2：已授权设备列表 */
.dshp-count-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 7px;
  border-radius: 999px;
  corner-shape: round;
  background: var(--dshp-fill-subtle);
  border: 0.5px solid var(--dshp-stroke);
  font-size: 11.5px;
  font-weight: 500;
  color: var(--dshp-ink-2);
}

.dshp-empty {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: var(--dsw-radius-lg, 16px);
  background: var(--dshp-fill-subtle);
  border: 0.5px dashed var(--dshp-stroke-strong);
  color: var(--dshp-ink-2);
  font-size: 12.5px;
  line-height: 1.55;
}

.dshp-empty-icon {
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: var(--dsw-radius-md, 12px);
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--dshp-brand) 10%, transparent);
  color: var(--dshp-brand);
}

.dshp-device-list {
  display: flex;
  flex-direction: column;
}

.dshp-device-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-top: 0.5px solid var(--dshp-stroke-soft);
  flex-wrap: wrap;
}

.dshp-device-row:first-child {
  padding-top: 4px;
  border-top: 0;
}

.dshp-device-row:last-child {
  padding-bottom: 0;
}

.dshp-device-left {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  flex: 1 1 220px;
  min-width: 0;
}

.dshp-device-icon {
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: var(--dsw-radius-md, 12px);
  display: grid;
  place-items: center;
  background: var(--dshp-fill-subtle);
  color: var(--dshp-ink-2);
  border: 0.5px solid var(--dshp-stroke-soft);
}

.dshp-device-info {
  flex: 1;
  min-width: 0;
}

.dshp-device-title {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
}

.dshp-device-name {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--dshp-ink-1);
  word-break: break-word;
}

.dshp-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  corner-shape: round;
  background: var(--dshp-fill-subtle);
  border: 0.5px solid var(--dshp-stroke);
  font-size: 11px;
  font-weight: 500;
  color: var(--dshp-ink-2);
  white-space: nowrap;
}

.dshp-tag.is-public {
  background: color-mix(in srgb, var(--dshp-brand) 10%, transparent);
  border-color: color-mix(in srgb, var(--dshp-brand) 24%, transparent);
  color: color-mix(in srgb, var(--dshp-brand) 82%, var(--dshp-ink-1));
}

.dshp-tag.is-online {
  background: color-mix(in srgb, var(--dshp-success) 12%, transparent);
  border-color: color-mix(in srgb, var(--dshp-success) 26%, transparent);
  color: color-mix(in srgb, var(--dshp-success) 80%, var(--dshp-ink-1));
}

.dshp-online-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  corner-shape: round;
  background: var(--dshp-success);
}

.dshp-device-meta {
  margin-top: 3px;
  font-size: 11.5px;
  color: var(--dshp-ink-3);
  line-height: 1.45;
  word-break: break-word;
}

.dshp-device-edit {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  width: 100%;
}

/* Zone 4：可折叠高级与维护区 */
.dshp-adv-toggle {
  font: inherit;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 15px 18px;
  background: transparent;
  border: 0;
  color: inherit;
  text-align: left;
}

.dshp-adv-toggle:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--dshp-brand) 45%, transparent);
  outline-offset: -2px;
  border-radius: var(--dsw-radius-xl, 20px);
}

.dshp-chevron {
  flex: none;
  color: var(--dshp-ink-3);
  display: inline-flex;
  transition: transform 0.16s ease;
}

.dshp-chevron.is-open {
  transform: rotate(180deg);
}

.dshp-pinbox {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 8px 12px;
  border-radius: var(--dsw-radius-lg, 16px);
  background: var(--dshp-fill-subtle);
  border: 0.5px solid var(--dshp-stroke-soft);
}

.dshp-pin-value {
  font-family: var(--dshp-mono);
  font-size: 13.5px;
  letter-spacing: 0.12em;
  color: var(--dshp-ink-1);
  flex: 1 1 110px;
  min-width: 0;
  word-break: break-all;
}

.dshp-inline {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.dshp-custom {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 12.5px;
  color: var(--dshp-ink-2);
}

.dshp-adv {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.dshp-hint {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--dshp-ink-3);
}

.dshp-warn-text {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--dshp-warn);
}

.dshp-err-text {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--dshp-danger);
}

.dshp-danger-zone {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 12px 14px;
  border-radius: var(--dsw-radius-lg, 16px);
  background: color-mix(in srgb, var(--dshp-danger) 5%, transparent);
  border: 0.5px solid color-mix(in srgb, var(--dshp-danger) 24%, transparent);
}

/* 加载态与页脚 */
.dshp-loading {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 2px;
  font-size: 12.5px;
  color: var(--dshp-ink-3);
}

.dshp-loading::before {
  content: "";
  flex: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  corner-shape: round;
  border: 1.5px solid var(--dshp-stroke-strong);
  border-top-color: var(--dshp-brand);
  animation: dshp-spin 0.8s linear infinite;
}

@keyframes dshp-spin {
  to { transform: rotate(360deg); }
}

.dshp-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  padding-top: 6px;
  font-size: 12px;
  color: var(--dshp-ink-3);
}

.dshp-footer a {
  color: var(--dshp-ink-2);
  text-decoration: none;
}

/* 弹窗（Modal：R28 面板 + border: 0 + prominent 阴影，遮罩 rgba(0,0,0,0.45) 严禁毛玻璃模糊） */
.dshp-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.45);
}

.dshp-modal {
  width: 100%;
  max-width: 440px;
  padding: 24px;
  border-radius: var(--dsw-radius-panel, 28px);
  border: 0;
  background: var(--dsw-alias-bg-layer-1, #ffffff);
  box-shadow: var(--dsw-elevation-prominent, 0 24px 64px rgba(0, 0, 0, 0.32));
  color: var(--dshp-ink-1);
}

.dshp-modal-title {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.35;
  margin-bottom: 10px;
  color: var(--dshp-ink-1);
}

.dshp-modal-title.is-warn {
  color: var(--dshp-warn);
}

.dshp-modal-title.is-danger {
  color: var(--dshp-danger);
}

.dshp-modal-body {
  font-size: 13px;
  line-height: 1.65;
  white-space: pre-line;
  color: var(--dshp-ink-2);
}

.dshp-check {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 14px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--dshp-ink-1);
  cursor: pointer;
}

.dshp-check input {
  flex: none;
  width: 16px;
  height: 16px;
  margin: 2px 0 0;
  accent-color: var(--dshp-brand);
}

.dshp-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
  flex-wrap: wrap;
}

/* 底部悬浮非阻塞胶囊 Toast */
.dshp-toast {
  position: fixed;
  left: 50%;
  bottom: calc(24px + env(safe-area-inset-bottom, 0px));
  transform: translateX(-50%);
  z-index: 10001;
  max-width: min(90vw, 420px);
  padding: 9px 18px;
  border-radius: 999px;
  corner-shape: round;
  background: var(--dsw-alias-label-primary, #14171f);
  color: var(--dsw-alias-bg-layer-1, #ffffff);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  text-align: center;
  pointer-events: none;
  box-shadow: var(--dsw-elevation-panel, 0 8px 28px rgba(0, 0, 0, 0.24));
}

/* 悬停态严格包裹于 @media (hover: hover) */
@media (hover: hover) {
  .dshp-btn.is-primary:hover:not(:disabled) {
    background: color-mix(in srgb, var(--dshp-brand) 86%, #000000);
  }
  .dshp-btn.is-secondary:hover:not(:disabled),
  .dshp-btn.is-ghost:hover:not(:disabled) {
    background: var(--dshp-fill-subtle);
  }
  .dshp-btn.is-quiet:hover:not(:disabled) {
    background: var(--dshp-fill-subtle);
    color: var(--dshp-ink-1);
  }
  .dshp-btn.is-danger:hover:not(:disabled) {
    background: color-mix(in srgb, var(--dshp-danger) 14%, transparent);
  }
  .dshp-seg-item:not(.is-active):hover {
    color: var(--dshp-ink-1);
    background: var(--dshp-fill-hover);
  }
  .dshp-adv-toggle:hover {
    background: var(--dshp-fill-subtle);
  }
  .dshp-footer a:hover {
    color: var(--dshp-ink-1);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}

/* 触屏指针：输入控件字号强制 >= 16px，彻底消除 iOS Safari 聚焦自动放大 */
@media (pointer: coarse) {
  .dshp-input,
  .dshp-select {
    font-size: 16px;
    min-height: 40px;
  }
  .dshp-btn {
    min-height: 38px;
  }
  .dshp-btn.is-sm,
  .dshp-btn.is-mini {
    min-height: 34px;
  }
  .dshp-seg-item {
    min-height: 34px;
  }
}

/* 窄屏适配（390px 手机视口至紧凑面板） */
@media (max-width: 540px) {
  .dshp-page {
    gap: 14px;
  }
  .dshp-card-head {
    padding: 14px 15px;
  }
  .dshp-card-body {
    padding: 0 15px 15px;
  }
  .dshp-hub-top {
    padding: 14px 15px 0;
  }
  .dshp-hub-body {
    padding: 12px 15px 15px;
  }
  .dshp-seg {
    width: 100%;
    display: flex;
  }
  .dshp-seg-item {
    flex: 1;
    padding: 0 8px;
  }
  .dshp-qr-hub {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .dshp-qr-main {
    width: 100%;
    flex: none;
    align-items: stretch;
    text-align: left;
  }
  .dshp-pair-row,
  .dshp-qr-actions {
    justify-content: center;
  }
  .dshp-adv-toggle {
    padding: 14px 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dshp-loading::before {
    animation: none;
  }
  .dshp-btn,
  .dshp-switch,
  .dshp-switch-thumb,
  .dshp-seg-item,
  .dshp-chevron {
    transition: none;
  }
}
`;
