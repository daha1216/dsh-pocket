// Zone 2：已授权设备管理卡片（独立设备持久会话、实时在线绿点、行内重命名、单台与批量撤销）
import * as React from 'react';
import { Icons } from './icons.tsx';
import { Button, Card } from './primitives.tsx';
import type { PocketDevice, SettingsController } from './use-settings.ts';
import { formatRelativeTime, inferDeviceKind } from './util.ts';

export interface DeviceListCardProps {
  s: SettingsController;
}

function DeviceTypeIcon({ device }: { device: PocketDevice }): React.ReactElement {
  const kind = inferDeviceKind(
    `${device.uaSummary ?? ''} ${device.autoName ?? ''} ${device.name ?? ''}`,
    device.kind,
  );
  if (kind === 'tablet') return <Icons.tablet size={17} />;
  if (kind === 'laptop') return <Icons.laptop size={17} />;
  return <Icons.smartphone size={17} />;
}

export function DeviceListCard({ s }: DeviceListCardProps): React.ReactElement | null {
  const { t, status, devices, pending, editingDevice } = s;

  if (s.publicView) return null;

  return (
    <Card
      sectionId="devices"
      icon={Icons.smartphone}
      title={t('devicesTitle')}
      badge={devices.length > 0 ? <span className="dshp-count-pill">{devices.length}</span> : null}
      sub={t('devicesSub')}
      right={
        devices.length > 1 ? (
          <Button
            variant="danger"
            size="sm"
            icon={Icons.trash}
            disabled={pending.devRevokeAll === true}
            onClick={() => s.setRevokeAllOpen(true)}
          >
            {t('devicesRevokeAll')}
          </Button>
        ) : null
      }
    >
      {!status ? (
        <div className="dshp-loading">{t('loadingStatus')}</div>
      ) : devices.length === 0 ? (
        <div className="dshp-empty">
          <span className="dshp-empty-icon">
            <Icons.sparkles size={18} />
          </span>
          <span>{t('devicesEmpty')}</span>
        </div>
      ) : (
        <div className="dshp-device-list">
          {devices.map((dev) => {
            const displayName = dev.name || dev.autoName || dev.uaSummary || t('deviceUnnamed');
            const isEditing = editingDevice?.id === dev.id;
            const rowBusy = pending[`dev:${dev.id}`] === true || pending.devRevokeAll === true;
            const isPublicChannel = dev.channel === 'public';
            const seenText = formatRelativeTime(dev.lastSeenAt ?? dev.createdAt, t);
            const metaParts: string[] = [];
            if (dev.uaSummary && dev.uaSummary !== displayName) metaParts.push(dev.uaSummary);
            if (seenText) metaParts.push(seenText);
            if (dev.lastIp) metaParts.push(dev.lastIp);

            return (
              <div key={dev.id} className="dshp-device-row" data-dshp-device={dev.id}>
                <div className="dshp-device-left">
                  <span className="dshp-device-icon">
                    <DeviceTypeIcon device={dev} />
                  </span>
                  <div className="dshp-device-info">
                    {isEditing ? (
                      <div className="dshp-device-edit">
                        <input
                          className="dshp-input"
                          style={{ flex: '1 1 160px', maxWidth: 260 }}
                          value={editingDevice?.name ?? ''}
                          maxLength={64}
                          autoFocus
                          onChange={(e) =>
                            s.setEditingDevice((curr) =>
                              curr ? { ...curr, name: e.target.value } : null,
                            )
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              void s.renameDevice(dev.id, editingDevice?.name ?? '');
                            }
                            if (e.key === 'Escape') {
                              s.cancelRenameDevice();
                            }
                          }}
                        />
                        <Button
                          variant="primary"
                          size="sm"
                          disabled={rowBusy}
                          onClick={() => s.renameDevice(dev.id, editingDevice?.name ?? '')}
                        >
                          {t('save')}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={rowBusy}
                          onClick={s.cancelRenameDevice}
                        >
                          {t('cancel')}
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="dshp-device-title">
                          <span className="dshp-device-name">{displayName}</span>
                          <Button
                            variant="quiet"
                            size="sm"
                            icon={Icons.edit}
                            disabled={rowBusy}
                            aria-label={t('deviceRename')}
                            title={t('deviceRename')}
                            onClick={() => s.startRenameDevice(dev)}
                          >
                            {t('deviceRename')}
                          </Button>
                          <span className={`dshp-tag${isPublicChannel ? ' is-public' : ''}`}>
                            {isPublicChannel ? t('deviceChannelPublic') : t('deviceChannelLan')}
                          </span>
                          {dev.online ? (
                            <span className="dshp-tag is-online">
                              <span className="dshp-online-dot" />
                              <span>{t('deviceOnline')}</span>
                            </span>
                          ) : null}
                        </div>
                        {metaParts.length > 0 ? (
                          <div className="dshp-device-meta">{metaParts.join(' · ')}</div>
                        ) : null}
                      </>
                    )}
                  </div>
                </div>
                {!isEditing ? (
                  <Button
                    variant="danger"
                    size="sm"
                    disabled={rowBusy}
                    onClick={() => s.revokeDevice(dev.id)}
                  >
                    {t('deviceRevoke')}
                  </Button>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
