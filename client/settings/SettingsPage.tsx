// dsh-pocket v4.0 设置主页面（4 分区渐进披露布局，适配 640px 桌面设置栏与 390px 手机视口）
import * as React from 'react';
import { AdvancedSection } from './AdvancedSection.tsx';
import { ConnectionHubCard } from './ConnectionHubCard.tsx';
import { DeviceListCard } from './DeviceListCard.tsx';
import { Icons } from './icons.tsx';
import { MobilePrefsCard } from './MobilePrefsCard.tsx';
import { Alert, Button, ElapsedTimer, Modal, StatusChip, Toast } from './primitives.tsx';
import { useSettings, type RpcCallFn, type SettingsController } from './use-settings.ts';
import { fmt, type TranslateFn } from './util.ts';

export interface SettingsPageProps {
  rpcCall: RpcCallFn;
  t: TranslateFn;
}

export function SettingsModals({ s }: { s: SettingsController }): React.ReactElement {
  const { t, pending } = s;

  return (
    <>
      {s.resetOpen ? (
        <Modal
          title={t('resetTitle')}
          tone="danger"
          onClose={() => s.setResetOpen(false)}
          actions={
            <>
              <Button variant="ghost" size="sm" autoFocus onClick={() => s.setResetOpen(false)}>
                {t('cancel')}
              </Button>
              <Button
                variant="danger"
                size="sm"
                disabled={pending.reset === true}
                onClick={s.doFactoryReset}
              >
                {t('resetConfirm')}
              </Button>
            </>
          }
        >
          <div className="dshp-modal-body">{t('resetBody')}</div>
        </Modal>
      ) : null}

      {s.lanToggleOpen !== null ? (
        <Modal
          title={t(s.lanToggleOpen ? 'lanToggleTitleOn' : 'lanToggleTitleOff')}
          tone={s.lanToggleOpen ? 'brand' : 'warn'}
          onClose={() => s.setLanToggleOpen(null)}
          actions={
            <>
              <Button variant="ghost" size="sm" autoFocus onClick={() => s.setLanToggleOpen(null)}>
                {t('cancel')}
              </Button>
              <Button variant="primary" size="sm" onClick={s.confirmLanToggle}>
                {t('confirm')}
              </Button>
            </>
          }
        >
          <div className="dshp-modal-body">
            {t(s.lanToggleOpen ? 'lanToggleBodyOn' : 'lanToggleBodyOff')}
          </div>
        </Modal>
      ) : null}

      {s.disclaimerOpen ? (
        <Modal
          title={t('disclaimerTitle')}
          tone="warn"
          onClose={() => s.setDisclaimerOpen(false)}
          actions={
            <>
              <Button
                variant="ghost"
                size="sm"
                autoFocus
                onClick={() => s.setDisclaimerOpen(false)}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={!s.disclaimerChecked}
                onClick={s.confirmDisclaimer}
              >
                {t('disclaimerAgree')}
              </Button>
            </>
          }
        >
          <div className="dshp-modal-body">{t('disclaimerBody')}</div>
          <label className="dshp-check">
            <input
              type="checkbox"
              checked={s.disclaimerChecked}
              onChange={(e) => s.setDisclaimerChecked(e.target.checked)}
            />
            <span>{t('disclaimerAgree')}</span>
          </label>
          {!s.disclaimerChecked ? (
            <div className="dshp-err-text" style={{ marginTop: 8 }}>
              {t('disclaimerHint')}
            </div>
          ) : null}
        </Modal>
      ) : null}

      {s.revokeAllOpen ? (
        <Modal
          title={t('devicesRevokeAllTitle')}
          tone="danger"
          onClose={() => s.setRevokeAllOpen(false)}
          actions={
            <>
              <Button
                variant="ghost"
                size="sm"
                autoFocus
                onClick={() => s.setRevokeAllOpen(false)}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="danger"
                size="sm"
                disabled={pending.devRevokeAll === true}
                onClick={s.revokeAllDevices}
              >
                {t('devicesRevokeAllConfirm')}
              </Button>
            </>
          }
        >
          <div className="dshp-modal-body">{t('devicesRevokeAllBody')}</div>
        </Modal>
      ) : null}

      <Toast message={s.toast} />
    </>
  );
}

export function SettingsPage({ rpcCall, t }: SettingsPageProps): React.ReactElement {
  const s = useSettings(rpcCall, t);

  const wanStatusLabel = s.tunnelUrl
    ? t('statusConnected')
    : s.tunnelReconnecting
      ? t('statusReconnecting')
      : t('statusOff');

  const wanChipTone = s.tunnelUrl ? 'success' : s.tunnelReconnecting ? 'warn' : 'neutral';

  return (
    <div className="dshp-page" data-dshp-ui="v4">
      {/* 页头与双通道实时状态胶囊 */}
      <header className="dshp-head">
        <div className="dshp-head-left">
          <span className="dshp-badge">
            <Icons.smartphone size={20} />
          </span>
          <div className="dshp-head-main">
            <div className="dshp-title">{t('section')}</div>
            <div className="dshp-sub">{t('subtitle')}</div>
          </div>
        </div>
        <div className="dshp-chips">
          {s.status ? (
            <>
              <StatusChip on={s.status.lanEnabled !== false}>
                {`${t('lanAccess')} · ${s.status.lanEnabled !== false ? t('statusOn') : t('statusOff')}`}
              </StatusChip>
              <StatusChip tone={wanChipTone}>
                {`${t('wanAccess')} · ${wanStatusLabel}`}
              </StatusChip>
            </>
          ) : (
            <span className="dshp-hint" style={{ marginTop: 0 }}>
              {t('loadingStatus')}
            </span>
          )}
        </div>
      </header>

      {/* 顶部全局提示横幅：错误 / 离线 / 重启完成 / 待重启 */}
      {s.error ? (
        <Alert
          kind="error"
          icon={Icons.warn}
          extra={
            <div className="dshp-inline" style={{ marginTop: 8 }}>
              <Button variant="secondary" size="sm" onClick={() => s.setError(null)}>
                {t('ok')}
              </Button>
            </div>
          }
        >
          {s.errText(s.error)}
        </Alert>
      ) : null}

      {s.offline ? (
        <Alert kind="warn" icon={Icons.warn}>
          {t('offlineHint')}
        </Alert>
      ) : null}

      {!s.isDesktop && s.restartNotice ? (
        <Alert
          kind="info"
          icon={Icons.refresh}
          title={t('restarted')}
          extra={
            <div className="dshp-inline" style={{ marginTop: 8 }}>
              {s.autoReloadFailed ? (
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Icons.refresh}
                  onClick={() => {
                    s.setAutoReloadFailed(false);
                    void s.waitForHostThenReload();
                  }}
                >
                  {t('reloadNow')}
                </Button>
              ) : null}
              {s.autoReloadFailed ? (
                <span className="dshp-hint" style={{ marginTop: 0 }}>
                  {t('reloadFailed')}
                </span>
              ) : null}
              <Button variant="quiet" size="sm" onClick={() => s.setRestartNotice(false)}>
                {t('ok')}
              </Button>
            </div>
          }
        >
          <div className="dshp-hint" style={{ wordBreak: 'break-all', marginTop: 2 }}>
            {fmt(t, 'bgHint', {
              cmd:
                s.status?.killHint
                ?? `lsof -ti :${s.status?.dshPort ?? 3080} | xargs kill -9`,
            })}
          </div>
        </Alert>
      ) : null}

      {!s.isDesktop && !s.publicView && s.needsRestart && !s.restartDismissed ? (
        <Alert
          kind="warn"
          icon={Icons.refresh}
          title={fmt(t, 'updatedRestart', { ver: s.versionInfo?.current })}
          extra={
            <div className="dshp-inline" style={{ marginTop: 8 }}>
              {s.versionInfo?.restarting ? (
                <Button variant="secondary" size="sm" disabled>
                  {t('restartingNow')}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  icon={Icons.refresh}
                  onClick={s.restartPocket}
                >
                  {t('restartNow')}
                </Button>
              )}
              {s.versionInfo?.restarting ? null : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => s.setRestartDismissed(true)}
                >
                  {t('later')}
                </Button>
              )}
            </div>
          }
        >
          <div className="dshp-hint" style={{ marginTop: 2 }}>
            {s.versionInfo?.restarting ? (
              <ElapsedTimer
                startedAt={s.versionInfo.startedAt}
                render={(sec) => fmt(t, 'restartingDetail', { s: sec })}
              />
            ) : s.versionInfo?.error ? (
              fmt(t, 'restartFailed', {
                err: s.errText(s.versionInfo.error) || t('unknownError'),
              })
            ) : (
              t('updatedRestartDetail')
            )}
          </div>
        </Alert>
      ) : null}

      {/* Zone 1: 双通道连接中枢 */}
      <ConnectionHubCard s={s} />

      {/* Zone 2: 已授权设备列表（公网访客不展示） */}
      {!s.publicView ? <DeviceListCard s={s} /> : null}

      {/* Zone 3: 手机端显示偏好 */}
      <MobilePrefsCard s={s} />

      {/* Zone 4: 可折叠高级选项与维护 + 页脚 */}
      <AdvancedSection s={s} />

      {/* 页面级模态框与底部悬浮胶囊 Toast */}
      <SettingsModals s={s} />
    </div>
  );
}

export const PocketSettingsTab = SettingsPage;
export default SettingsPage;
