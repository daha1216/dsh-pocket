// 兼容薄重导出层（Wave 2 切换 client/index.tsx 后可直接引用 primitives.tsx / icons.tsx）
import * as React from 'react';
import { Ico, Icons } from './icons.tsx';
import {
  Alert,
  Btn,
  Button,
  Card,
  ElapsedTimer,
  Modal,
  Row,
  SegmentedControl,
  StatusChip,
  Switch as SwitchPrimitive,
  Toast,
} from './primitives.tsx';

export const Chip = StatusChip;

export const Switch = (on, onClick, disabled, label = undefined) =>
  React.createElement(SwitchPrimitive, {
    checked: Boolean(on),
    onChange: () => onClick?.(),
    disabled: disabled === true,
    label: label ?? undefined,
  });

export {
  Alert,
  Btn,
  Button,
  Card,
  ElapsedTimer,
  Ico,
  Icons,
  Modal,
  Row,
  SegmentedControl,
  StatusChip,
  Toast,
};
