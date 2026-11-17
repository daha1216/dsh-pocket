// 兼容薄适配层：将 v4.0 四大分区桥接至过渡期 client/index.jsx（Wave 2 将直接挂载 SettingsPage.tsx）
import * as React from 'react';
import { AdvancedSection } from './AdvancedSection.tsx';
import { ConnectionHubCard } from './ConnectionHubCard.tsx';
import { DeviceListCard } from './DeviceListCard.tsx';
import { MobilePrefsCard } from './MobilePrefsCard.tsx';
import { SettingsModals } from './SettingsPage.tsx';

export function renderConnection(s) {
  return [
    React.createElement(ConnectionHubCard, { key: 'hub', s }),
    !s.publicView ? React.createElement(DeviceListCard, { key: 'devices', s }) : null,
  ];
}

export function renderPrefs(s) {
  return [React.createElement(MobilePrefsCard, { key: 'prefs', s })];
}

export function renderMaintenance(s) {
  return [React.createElement(AdvancedSection, { key: 'advanced', s })];
}

export function renderModals(s) {
  return [React.createElement(SettingsModals, { key: 'modals', s })];
}
