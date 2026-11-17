// dsh-pocket 自有矢量图标集（纯内联 SVG，零外部图标包运行时依赖）
import * as React from 'react';

export interface IconProps {
  size?: number;
  className?: string;
}

export type IconComponent = (props: IconProps) => React.ReactElement;

function Svg({ size = 16, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const Icons = {
  settings: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.08a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.08a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </Svg>
  ),
  wifi: (p: IconProps) => (
    <Svg {...p}>
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </Svg>
  ),
  globe: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.6 12h18.8" />
      <path d="M12 2.5a14.5 14.5 0 0 1 0 19 14.5 14.5 0 0 1 0-19Z" />
    </Svg>
  ),
  shield: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 2.75 19.5 6v6c0 5-3.25 8.5-7.5 9.75C7.75 20.5 4.5 17 4.5 12V6L12 2.75Z" />
      <path d="m9.25 12 2 2 3.75-3.75" />
    </Svg>
  ),
  smartphone: (p: IconProps) => (
    <Svg {...p}>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M10.5 18h3" />
    </Svg>
  ),
  laptop: (p: IconProps) => (
    <Svg {...p}>
      <rect x="3.5" y="4.5" width="17" height="11.5" rx="2" />
      <path d="M2 19.5h20" />
    </Svg>
  ),
  tablet: (p: IconProps) => (
    <Svg {...p}>
      <rect x="4.5" y="2.5" width="15" height="19" rx="2.5" />
      <path d="M10.5 18h3" />
    </Svg>
  ),
  sliders: (p: IconProps) => (
    <Svg {...p}>
      <path d="M4 7h9" />
      <path d="M17 7h3" />
      <circle cx="15" cy="7" r="2" />
      <path d="M4 17h3" />
      <path d="M11 17h9" />
      <circle cx="9" cy="17" r="2" />
    </Svg>
  ),
  copy: (p: IconProps) => (
    <Svg {...p}>
      <rect x="9" y="9" width="11.5" height="11.5" rx="2" />
      <path d="M5.5 15H4.5a2 2 0 0 1-2-2V4.5a2 2 0 0 1 2-2H13a2 2 0 0 1 2 2v1" />
    </Svg>
  ),
  refresh: (p: IconProps) => (
    <Svg {...p}>
      <path d="M20.5 11a8.5 8.5 0 0 0-14.75-5.75L3.5 7.5" />
      <path d="M3.5 3.5v4h4" />
      <path d="M3.5 13a8.5 8.5 0 0 0 14.75 5.75l2.25-2.25" />
      <path d="M20.5 20.5v-4h-4" />
    </Svg>
  ),
  trash: (p: IconProps) => (
    <Svg {...p}>
      <path d="M3.5 6h17" />
      <path d="M8.5 6V4.25A1.75 1.75 0 0 1 10.25 2.5h3.5A1.75 1.75 0 0 1 15.5 4.25V6" />
      <path d="M18.5 6v13.25a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V6" />
      <path d="M10 10.5v6" />
      <path d="M14 10.5v6" />
    </Svg>
  ),
  check: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="m8.5 12.25 2.35 2.35 4.65-4.85" />
    </Svg>
  ),
  warn: (p: IconProps) => (
    <Svg {...p}>
      <path d="M10.3 3.85 2.6 17.2a2 2 0 0 0 1.73 3h15.34a2 2 0 0 0 1.73-3L13.7 3.85a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4.5" />
      <circle cx="12" cy="16.8" r="0.8" fill="currentColor" stroke="none" />
    </Svg>
  ),
  info: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 11.25v5" />
      <circle cx="12" cy="8" r="0.85" fill="currentColor" stroke="none" />
    </Svg>
  ),
  chevron: (p: IconProps) => (
    <Svg {...p}>
      <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
    </Svg>
  ),
  eye: (p: IconProps) => (
    <Svg {...p}>
      <path d="M2.25 12S5.75 5.5 12 5.5 21.75 12 21.75 12 18.25 18.5 12 18.5 2.25 12 2.25 12Z" />
      <circle cx="12" cy="12" r="2.75" />
    </Svg>
  ),
  eyeOff: (p: IconProps) => (
    <Svg {...p}>
      <path d="M10.6 6.1A10.6 10.6 0 0 1 12 6c6.25 0 9.75 6 9.75 6a17.4 17.4 0 0 1-3.12 3.88" />
      <path d="M6.62 6.62A17.2 17.2 0 0 0 2.25 12s3.5 6 9.75 6c1.92 0 3.58-.56 4.98-1.38" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="m3 3 18 18" />
    </Svg>
  ),
  sparkles: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 3l1.85 5.15L19 10l-5.15 1.85L12 17l-1.85-5.15L5 10l5.15-1.85L12 3Z" />
      <path d="M19 15.5l.85 2.15L22 18.5l-2.15.85L19 21.5l-.85-2.15L16 18.5l2.15-.85L19 15.5Z" />
    </Svg>
  ),
  code: (p: IconProps) => (
    <Svg {...p}>
      <path d="m8.5 8-4.5 4 4.5 4" />
      <path d="m15.5 8 4.5 4-4.5 4" />
      <path d="m13.5 5.5-3 13" />
    </Svg>
  ),
  edit: (p: IconProps) => (
    <Svg {...p}>
      <path d="M15.5 4.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4 10.5-10.5Z" />
    </Svg>
  ),
} as const;

// 兼容旧版 Ico 命名映射（供平滑过渡与旧模块别名调用）
export const Ico = {
  ...Icons,
  lan: Icons.wifi,
  wan: Icons.globe,
  pin: Icons.shield,
  lite: Icons.smartphone,
} as const;
