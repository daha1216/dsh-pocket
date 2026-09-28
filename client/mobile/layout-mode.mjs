// 布局模式判定（issue #74：宽屏手机/Pad 可选电脑布局）
//
// 优先级：URL 参数 (?dsh-layout=desktop|mobile|auto) > localStorage > 默认 auto。
//   - 参数值大小写不敏感（DESKTOP 与 desktop 等价）；
//   - 'auto' 不写 localStorage，仅按 matchMedia 走；
//   - 显式 'desktop' / 'mobile' 同步到 localStorage，下次无 URL 参数也走同样布局；
//   - 其它非法值（?dsh-layout=banana）：不生效也不清除已有存储（静默回退旧值），
//     避免手滑拼写清掉用户的显式选择。
//
// 纯函数，便于单测；mobile-apply.tsx 读 DOM/localStorage 喂进来。
// localStorage 的**访问本身**可能抛 SecurityError（Chrome 禁 cookie/沙箱 iframe），
// 两个碰 storage 的函数都整体兜底降级——本模块抛出会让整个 pocket 插件初始化中断。

/** @typedef {'mobile' | 'desktop'} ForcedLayout */

/** localStorage 键名常量：本模块多处读写与 index.jsx 的布局切换 UI 共用同一键，
 *  字面量散落多处易漂移（一处改、另一处漏改即读写脱节），收敛为导出常量统一来源。 */
export const LAYOUT_STORAGE_KEY = 'dsh-pocket.layout';

/** 解析输入。 */
export function resolveLayout({ urlValue, stored, narrowMatch }) {
  const url = String(urlValue ?? '').trim().toLowerCase();
  if (url === 'desktop') return 'desktop';
  if (url === 'mobile') return 'mobile';
  // 'auto' / 空 / 非法值 → 用 localStorage / matchMedia
  if (stored === 'desktop' || stored === 'mobile') return stored;
  return narrowMatch ? 'mobile' : 'desktop';
}

/** 同步 localStorage 的副作用（在 mobileApply 入口跑一次）。返回最终存储值。 */
export function persistLayoutFromUrl(urlValue) {
  try {
    if (typeof localStorage === 'undefined') return '';
    // 没有 ?dsh-layout= 参数（null/undefined）→ 不写不改，直接用已存的布局（issue #74）。
    // 缺这一分支时 `String(null ?? '') = ''` 会走下面的 removeItem，把用户存过的布局每次刷新都清掉。
    if (urlValue === null || urlValue === undefined) return readStoredLayout();
    const v = String(urlValue).trim().toLowerCase();
    try {
      if (v === 'desktop' || v === 'mobile') localStorage.setItem(LAYOUT_STORAGE_KEY, v);
      else if (v === 'auto' || v === '') localStorage.removeItem(LAYOUT_STORAGE_KEY);
    } catch { /* 写失败（隐私模式/配额）→ 静默，仍尝试读回现值 */ }
    const s = localStorage.getItem(LAYOUT_STORAGE_KEY);
    return s === 'desktop' || s === 'mobile' ? s : '';
  } catch {
    // 访问器级异常（typeof 只防未声明标识符，防不了会抛的 getter）必须整体降级。
    return '';
  }
}

/** 读 localStorage 当前的 layout 值（'desktop' | 'mobile' | ''）。 */
export function readStoredLayout() {
  try {
    if (typeof localStorage === 'undefined') return '';
    const v = localStorage.getItem(LAYOUT_STORAGE_KEY);
    return v === 'desktop' || v === 'mobile' ? v : '';
  } catch {
    return '';
  }
}
