// dsh-pocket 自有无障碍基础组件库（纯 React + DSH 语义变量，零外部 UI 原语包运行时依赖）
import * as React from 'react';
import type { IconComponent } from './icons.tsx';

export interface CardProps {
  sectionId?: string;
  icon?: IconComponent;
  title: React.ReactNode;
  badge?: React.ReactNode;
  sub?: React.ReactNode;
  right?: React.ReactNode;
  danger?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Card({
  sectionId,
  icon: Icon,
  title,
  badge,
  sub,
  right,
  danger = false,
  className = '',
  children,
}: CardProps): React.ReactElement {
  return (
    <section
      className={`dshp-card${danger ? ' is-danger' : ''}${className ? ` ${className}` : ''}`}
      data-dshp-section={sectionId ?? undefined}
    >
      <div className="dshp-card-head">
        <div className="dshp-card-head-left">
          {Icon ? (
            <span className="dshp-card-icon">
              <Icon size={16} />
            </span>
          ) : null}
          <div className="dshp-card-text">
            <div className="dshp-card-title-row">
              <div className="dshp-card-title">{title}</div>
              {badge ?? null}
            </div>
            {sub ? <div className="dshp-card-sub">{sub}</div> : null}
          </div>
        </div>
        {right ?? null}
      </div>
      {children ? <div className="dshp-card-body">{children}</div> : null}
    </section>
  );
}

export interface RowProps {
  label: React.ReactNode;
  desc?: React.ReactNode;
  control?: React.ReactNode;
  extra?: React.ReactNode;
  stack?: boolean;
  borderless?: boolean;
}

export function Row({
  label,
  desc,
  control,
  extra,
  stack = false,
  borderless = false,
}: RowProps): React.ReactElement {
  return (
    <div className={`dshp-row${stack ? ' is-stack' : ''}${borderless ? ' is-borderless' : ''}`}>
      <div className="dshp-row-main">
        <div className="dshp-row-info">
          <div className="dshp-row-label">{label}</div>
          {desc ? <div className="dshp-row-desc">{desc}</div> : null}
        </div>
        {control ? <div className="dshp-row-control">{control}</div> : null}
      </div>
      {extra ?? null}
    </div>
  );
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'quiet' | 'danger';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  mini?: boolean;
  icon?: IconComponent | null;
}

export function Button({
  variant = 'ghost',
  size = 'md',
  mini = false,
  icon: Icon = null,
  className = '',
  children,
  ...rest
}: ButtonProps): React.ReactElement {
  const isSmall = size === 'sm' || mini;
  return (
    <button
      type="button"
      {...rest}
      className={`dshp-btn is-${variant}${isSmall ? ' is-sm' : ''}${className ? ` ${className}` : ''}`}
    >
      {Icon ? <Icon size={isSmall ? 13 : 15} /> : null}
      {children}
    </button>
  );
}

// 兼容旧式 Btn(props, ...children) 调用签名
export const Btn = (props: ButtonProps = {}, ...extraChildren: React.ReactNode[]): React.ReactElement => {
  const { children: propChildren, ...rest } = props ?? {};
  const children = extraChildren.length > 0 ? extraChildren : propChildren;
  return <Button {...rest}>{children}</Button>;
};

export interface SwitchProps {
  checked: boolean;
  onChange: (nextChecked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export function Switch({ checked, onChange, disabled = false, label }: SwitchProps): React.ReactElement {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={Boolean(checked)}
      aria-label={label}
      disabled={disabled}
      className="dshp-switch"
      onClick={disabled ? undefined : () => onChange(!checked)}
    >
      <span className="dshp-switch-thumb" />
    </button>
  );
}

export interface SegmentedOption<T extends string> {
  value: T;
  label: React.ReactNode;
  icon?: IconComponent;
}

export interface SegmentedControlProps<T extends string> {
  value: T;
  options: readonly SegmentedOption<T>[];
  onChange: (value: T) => void;
  ariaLabel?: string;
}

export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: SegmentedControlProps<T>): React.ReactElement {
  const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const idx = options.findIndex((o) => o.value === value);
    if (idx < 0 || options.length < 2) return;
    e.preventDefault();
    const delta = e.key === 'ArrowRight' ? 1 : -1;
    const nextIdx = (idx + delta + options.length) % options.length;
    const nextOpt = options[nextIdx];
    if (nextOpt) {
      onChange(nextOpt.value);
      itemRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <div className="dshp-seg" role="tablist" aria-label={ariaLabel} onKeyDown={handleKeyDown}>
      {options.map((opt, idx) => {
        const active = opt.value === value;
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            className={`dshp-seg-item${active ? ' is-active' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            {Icon ? <Icon size={15} /> : null}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export interface StatusChipProps {
  on?: boolean;
  tone?: 'neutral' | 'success' | 'warn';
  children: React.ReactNode;
}

export function StatusChip({ on = false, tone, children }: StatusChipProps): React.ReactElement {
  const resolvedTone = tone ?? (on ? 'success' : 'neutral');
  const toneClass = resolvedTone === 'success' ? ' is-on' : resolvedTone === 'warn' ? ' is-warn' : '';
  return (
    <span className={`dshp-chip${toneClass}`}>
      <span className="dshp-chip-dot" />
      {children}
    </span>
  );
}

export interface AlertProps {
  kind?: 'info' | 'warn' | 'error' | 'success';
  icon?: IconComponent | null;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children?: React.ReactNode;
}

export function Alert({
  kind = 'info',
  icon: Icon = null,
  title = null,
  extra = null,
  children,
}: AlertProps): React.ReactElement {
  return (
    <div className={`dshp-alert is-${kind}`} role={kind === 'error' ? 'alert' : undefined}>
      {Icon ? (
        <span className="dshp-alert-icon">
          <Icon size={15} />
        </span>
      ) : null}
      <div className="dshp-alert-body">
        {title ? <div className="dshp-alert-title">{title}</div> : null}
        {children}
        {extra ?? null}
      </div>
    </div>
  );
}

export interface ModalProps {
  title: string;
  tone?: 'brand' | 'warn' | 'danger';
  onClose?: () => void;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function Modal({
  title,
  tone = 'brand',
  onClose,
  actions,
  children,
}: ModalProps): React.ReactElement {
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;
    const prevFocus = document.activeElement as HTMLElement | null;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // 阻止冒泡至宿主设置面板，避免按一次 Esc 把整张设置页一起关掉
      e.preventDefault();
      e.stopPropagation();
      onCloseRef.current?.();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (prevFocus && typeof prevFocus.focus === 'function' && prevFocus.isConnected) {
        prevFocus.focus();
      }
    };
  }, []);

  return (
    <div
      className="dshp-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="dshp-modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className={`dshp-modal-title is-${tone}`}>{title}</div>
        {children}
        {actions ? <div className="dshp-modal-actions">{actions}</div> : null}
      </div>
    </div>
  );
}

export interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps): React.ReactElement | null {
  if (!message) return null;
  return (
    <div className="dshp-toast" role="status" aria-live="polite">
      {message}
    </div>
  );
}

export interface ElapsedTimerProps {
  startedAt?: number | null;
  render?: (seconds: number) => React.ReactNode;
}

// 独立叶子计时器：1 秒 setInterval 仅重渲染此 <span>，绝不牵连整张 SettingsPage 重绘
export function ElapsedTimer({ startedAt, render }: ElapsedTimerProps): React.ReactElement {
  const [now, setNow] = React.useState<number>(() => Date.now());

  React.useEffect(() => {
    if (!startedAt) return undefined;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [startedAt]);

  const seconds = startedAt ? Math.max(0, Math.floor((now - startedAt) / 1000)) : 0;
  return <span>{render ? render(seconds) : `${seconds}s`}</span>;
}
