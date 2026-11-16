// 设置页视图件：只用宿主 token + className，样式在 ./styles.js。
// 这里是纯展示层——不持有任何状态，所有数据由 use-settings.js 的 hook 传进来。
import { createElement as h } from 'react';
import * as uiPrimitives from '@deepseek-ai/dsh-client-ui-primitives';

import { copyText } from './util.js';

// ── 宿主图标适配（两代命名）───────────────────────────────────────────────
// 宿主 primitives 的图标有两代命名：0.1.0-rc.6 是 IconXxxOutline16，
// 0.1.7-alpha.1 起是 IconXxxOutlineRegular。运行时哪个存在用哪个，都没有则
// 返回空组件——宁可少画一个图标，也不让整页渲染抛错（同 mobile/upstream/core/icon-compat.ts）。
const pickIcon = (names) => {
  const table = (uiPrimitives ?? {});
  for (const n of names) {
    if (typeof table[n] === 'function') return table[n];
  }
  return () => null;
};

export const Ico = {
  settings: pickIcon(['IconSettingsOutlineRegular', 'IconSettingsOutline16']),
  lan: pickIcon(['IconLinkOutlineRegular', 'IconLinkOutline16']),
  wan: pickIcon(['IconGlobeOutlineRegular', 'IconGlobeOutline16']),
  pin: pickIcon(['IconShieldOutlineRegular', 'IconShieldOutline16']),
  sliders: pickIcon(['IconSlidersTwoOutlineRegular', 'IconSlidersTwoOutline16']),
  trash: pickIcon(['IconTrashOutlineRegular', 'IconTrashOutline16']),
  copy: pickIcon(['IconCopyOutlineRegular', 'IconCopyOutline16']),
  refresh: pickIcon(['IconRefreshOutlineRegular', 'IconRefreshOutline16']),
  download: pickIcon(['IconDownloadOutlineRegular', 'IconDownloadOutline16']),
  warn: pickIcon(['IconWarningOutlineRegular', 'IconWarningOutline16']),
  info: pickIcon(['IconInfoOutlineRegular', 'IconInfoOutline16']),
  check: pickIcon(['IconCheckCircleOutlineRegular', 'IconCheckCircleOutline16']),
  chevron: pickIcon(['IconChevronDownOutlineRegular', 'IconChevronDownOutline16']),
  // 轻量视图用手机图标；宿主没有这一族时退化成空组件（只是少画一个图标）。
  lite: pickIcon(['IconSmartphoneOutlineRegular', 'IconDeviceMobileOutlineRegular', 'IconMobileOutline16']),
};

// 开关：跟宿主 0.2.x 对齐（36×20 轨道 / 16×16 圆钮）；disabled 用于操作进行中。
export const Switch = (on, onClick, disabled, label = null) => h('button', {
  role: 'switch', type: 'button', 'aria-checked': !!on, disabled: disabled === true,
  'aria-label': label ?? undefined,
  className: 'dshp-switch',
  onClick: disabled === true ? undefined : onClick,
}, h('span', { className: 'dshp-switch-thumb' }));

// 按钮：variant = primary | ghost | quiet | danger；mini = 行内小按钮。
// 文案两种传法都支持：props.children，或 Btn({...}, '文案') 的第二参数
// （后者是旧调用风格；只按 props 解构会静默丢掉第二参数，渲染出空白按钮）。
export const Btn = (props, ...extraChildren) => {
  const { variant = 'ghost', mini = false, icon = null, children: propChildren, ...rest } = props ?? {};
  const children = extraChildren.length > 0 ? extraChildren : propChildren;
  return h('button', {
    type: 'button',
    ...rest,
    className: `dshp-btn is-${variant}${mini ? ' is-mini' : ''}`,
  }, icon ? h(icon, { size: mini ? 12 : 14 }) : null, children);
};

// 状态胶囊：圆点 + 文本（用于页头汇总当前两条通道的状态）
export const Chip = ({ on, children }) => h('span', { className: `dshp-chip${on ? ' is-on' : ''}` },
  h('span', { className: 'dshp-chip-dot' }), children);

// 分区卡：图标 + 标题 + 副题 + 右侧控件，内容在卡片体里
export const Card = ({ icon, title, sub, right, children, danger = false, key }) => h('section', {
  className: `dshp-card${danger ? ' is-danger' : ''}`,
  'data-dshp-section': key ?? '',
},
h('div', { className: 'dshp-card-head' },
  icon ? h('span', { className: 'dshp-card-icon' }, h(icon, { size: 16 })) : null,
  h('div', { className: 'dshp-card-text' },
    h('div', { className: 'dshp-card-title' }, title),
    sub ? h('div', { className: 'dshp-card-sub' }, sub) : null),
  right ?? null),
children ? h('div', { className: 'dshp-card-body' }, children) : null);

// 设置行：左标签（可带说明）+ 右控件；extra 渲染在整行下方（展开面板等）
export const Row = ({ label, desc, control, extra, stack = false }) => h('div', {
  className: `dshp-row${stack ? ' is-stack' : ''}`,
},
h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, rowGap: 8, flexWrap: 'wrap', minWidth: 0, width: '100%' } },
  h('div', { style: { minWidth: 0 } },
    h('div', { className: 'dshp-row-label' }, label),
    desc ? h('div', { className: 'dshp-row-desc' }, desc) : null),
  control ?? null),
extra ?? null);

// 提示条：kind = info | warn | error
export const Alert = ({ kind = 'info', icon = null, children, title = null, extra = null }) => h('div', { className: `dshp-alert is-${kind}` },
  icon ? h('span', { className: 'dshp-alert-icon' }, h(icon, { size: 14 })) : null,
  h('div', { className: 'dshp-alert-body' },
    title ? h('div', { className: 'dshp-alert-title' }, title) : null,
    children,
    extra ?? null));

// 二维码横排卡：左 128px 码（白底衬 quiet zone）+ 右侧地址/提示/复制
export const QRBlock = ({ src, url, hint, t, toast }) => h('div', { className: 'dshp-qr' },
  h('div', { className: 'dshp-qr-frame' }, src ? h('img', { src, alt: 'QR' }) : null),
  h('div', { className: 'dshp-qr-main' },
    h('div', { className: 'dshp-url' }, url),
    hint ? h('div', { className: 'dshp-qr-hint' }, hint) : null,
    h('div', { className: 'dshp-qr-actions' },
      Btn({ variant: 'ghost', mini: true, icon: Ico.copy, onClick: async () => toast(await copyText(url) ? t('copied') : t('copyFailed')) }, t('copyLink')))));

// 统一确认弹窗：遮罩 + 面板（标题色随语义）+ 内容 + 右对齐操作
// 可访问性：role=dialog + aria-modal + aria-label；Esc 关闭（见 use-settings.js 的全局 keydown effect）；
// 点遮罩空白处关闭。取消按钮带 autoFocus，键盘用户打开即可直接 Esc/Enter。
export const Modal = ({ title, tone = 'warn', children, actions, onClose }) => h('div', {
  className: 'dshp-modal-backdrop',
  onClick: (e) => { if (e.target === e.currentTarget) onClose?.(); },
},
h('div', { className: 'dshp-modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': title },
  h('div', { className: `dshp-modal-title is-${tone}` }, title),
  children,
  h('div', { className: 'dshp-modal-actions' }, actions)));
