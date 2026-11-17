// Zone 1：双通道连接中枢卡片（SegmentedControl 局域网 / 公网固定域名 + 扫码一步配对 + Cloudflare 两步向导与环境预检）
import * as React from 'react';
import { Icons } from './icons.tsx';
import {
  Alert,
  Button,
  ElapsedTimer,
  SegmentedControl,
  Switch,
  type SegmentedOption,
} from './primitives.tsx';
import type { ChannelKind, SettingsController } from './use-settings.ts';
import { copyText, fmt } from './util.ts';

export interface ConnectionHubCardProps {
  s: SettingsController;
}

interface QrHubBlockProps {
  qrSrc: string | null | undefined;
  url: string;
  pairingActive: boolean;
  noPinLan?: boolean;
  refreshPending?: boolean;
  onRefreshPairing?: () => void;
  hint?: React.ReactNode;
  subHint?: React.ReactNode;
  s: SettingsController;
}

function QrHubBlock({
  qrSrc,
  url,
  pairingActive,
  noPinLan = false,
  refreshPending = false,
  onRefreshPairing,
  hint,
  subHint,
  s,
}: QrHubBlockProps): React.ReactElement {
  const { t, showToast } = s;
  return (
    <div className="dshp-qr-hub">
      <div className="dshp-qr-col">
        <div className="dshp-qr-frame">
          {qrSrc ? <img src={qrSrc} alt="QR" /> : null}
        </div>
      </div>
      <div className="dshp-qr-main">
        {(pairingActive || noPinLan) ? (
          <div className="dshp-pair-row">
            {pairingActive ? (
              <span className="dshp-pair-badge">
                <Icons.sparkles size={13} />
                <span>{t('pairOneStepBadge')}</span>
              </span>
            ) : (
              <span className="dshp-pair-badge">
                <Icons.wifi size={13} />
                <span>{t('lanNoPinBadge')}</span>
              </span>
            )}
          </div>
        ) : null}

        <div className="dshp-url-box">
          <div className="dshp-url">{url}</div>
        </div>

        <div className="dshp-qr-actions">
          <Button
            variant="secondary"
            size="sm"
            icon={Icons.copy}
            onClick={async () => {
              const ok = await copyText(url);
              showToast(ok ? t('copied') : t('copyFailed'));
            }}
          >
            {t('copyLink')}
          </Button>
          {pairingActive && onRefreshPairing ? (
            <Button
              variant="ghost"
              size="sm"
              icon={Icons.refresh}
              disabled={refreshPending}
              onClick={onRefreshPairing}
            >
              {t('pairRefreshQr')}
            </Button>
          ) : null}
        </div>

        {hint ? <div className="dshp-qr-hint">{hint}</div> : null}
        {subHint ? <div className="dshp-qr-hint">{subHint}</div> : null}
      </div>
    </div>
  );
}

export function ConnectionHubCard({ s }: ConnectionHubCardProps): React.ReactElement {
  const { t, status, pending, publicView, activeChannel } = s;

  const channelOptions: readonly SegmentedOption<ChannelKind>[] = [
    { value: 'lan', label: t('lanAccess'), icon: Icons.wifi },
    { value: 'public', label: t('publicFixedDomain'), icon: Icons.globe },
  ];

  const isLanTab = activeChannel === 'lan';
  const masterChecked = isLanTab
    ? status?.lanEnabled !== false
    : Boolean(s.tunnelUrl) || s.tunnelReconnecting;
  const masterDisabled = isLanTab
    ? !status || pending.lanToggle === true || publicView
    : s.tunnelStarting || pending.wan === true || pending.saveNamed === true || !status || publicView;

  const handleMasterSwitch = () => {
    if (isLanTab) {
      s.requestLanToggle(status?.lanEnabled === false);
    } else if (s.tunnelUrl || s.tunnelReconnecting) {
      void s.stopTunnel();
    } else {
      s.startTunnel();
    }
  };

  const copyTargetService = async () => {
    const ok = await copyText(s.targetServiceUrl);
    s.showToast(ok ? t('copiedTargetUrl') : t('copyFailed'));
  };

  const renderTargetBar = () => (
    <div className="dshp-target-bar">
      <span className="dshp-target-code">{s.targetServiceUrl}</span>
      <Button variant="secondary" size="sm" icon={Icons.copy} onClick={copyTargetService}>
        {t('copyTargetUrl')}
      </Button>
    </div>
  );

  const renderLanBody = () => {
    if (publicView) {
      return <div className="dshp-hint">{t('lanLocalOnly')}</div>;
    }
    if (!status) {
      return <div className="dshp-loading">{t('loadingStatus')}</div>;
    }
    if (status.lanEnabled === false) {
      return (
        <Alert
          kind="info"
          icon={Icons.info}
          extra={
            <div style={{ marginTop: 10 }}>
              <Button
                variant="primary"
                size="sm"
                onClick={() => s.requestLanToggle(true)}
                disabled={pending.lanToggle === true}
              >
                {t('lanToggleTitleOn')}
              </Button>
            </div>
          }
        >
          {t('lanDisabledHint')}
        </Alert>
      );
    }
    if (!s.lanUrl) {
      return <div className="dshp-loading">{t('lanStarting')}</div>;
    }
    const qrSrc = s.pairing?.qr || status.lanQr;
    return (
      <QrHubBlock
        qrSrc={qrSrc}
        url={s.lanUrl}
        pairingActive={Boolean(s.pairing)}
        noPinLan={status?.lanAuthEnabled === false}
        refreshPending={pending.pairRefresh === true}
        onRefreshPairing={s.refreshPairingTicket}
        hint={t('lanScanHint')}
        subHint={t('lanDebugHint')}
        s={s}
      />
    );
  };

  const renderPreflightWarnings = () => {
    if (publicView || !status) return null;
    const preflight = status.preflight;
    const tunDetected = preflight?.tunDetected === true;
    const portShifted = preflight?.portShifted === true || status.portShifted === true;
    if (!tunDetected && !portShifted) return null;

    const ifaces = Array.isArray(preflight?.tunInterfaces) && preflight!.tunInterfaces!.length > 0
      ? preflight!.tunInterfaces!.join(', ')
      : '';

    return (
      <>
        {tunDetected ? (
          <Alert kind="warn" icon={Icons.warn} title={t('preflightTunTitle')}>
            {ifaces ? fmt(t, 'preflightTunBody', { ifaces }) : t('preflightTunBodyGeneric')}
          </Alert>
        ) : null}
        {portShifted ? (
          <Alert
            kind="warn"
            icon={Icons.warn}
            title={fmt(t, 'preflightPortTitle', { port: status.proxyPort ?? 3081 })}
          >
            {fmt(t, 'preflightPortBody', { url: s.targetServiceUrl })}
          </Alert>
        ) : null}
      </>
    );
  };

  const renderPublicStatusBanner = () => {
    if (s.tunnelStarting) {
      return (
        <Alert kind="info" icon={Icons.info}>
          <ElapsedTimer
            startedAt={s.tunnelStateStarted}
            render={(sec) =>
              s.tunnelPhase === 'downloading'
                ? fmt(t, 'downloading', { s: sec })
                : fmt(t, 'connecting', { s: sec, suffix: sec > 30 ? t('slowHint') : '' })
            }
          />
        </Alert>
      );
    }
    if (s.tunnelReconnecting) {
      return (
        <Alert
          kind="warn"
          icon={Icons.refresh}
          extra={
            <div style={{ marginTop: 10 }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={s.stopTunnel}
                disabled={pending.wan === true}
              >
                {t('stopTunnel')}
              </Button>
            </div>
          }
        >
          <ElapsedTimer
            startedAt={s.tunnelStateStarted}
            render={(sec) =>
              s.tunnelAttempt
                ? fmt(t, 'reconnectingDetail', { attempt: s.tunnelAttempt, s: sec })
                : fmt(t, 'reconnectingSimple', { s: sec })
            }
          />
        </Alert>
      );
    }
    if (s.tunnelPhase === 'error') {
      return (
        <Alert
          kind="error"
          icon={Icons.warn}
          extra={
            s.publicConfigured ? (
              <div style={{ marginTop: 10 }}>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Icons.refresh}
                  onClick={s.startTunnel}
                  disabled={pending.wan === true || pending.saveNamed === true}
                >
                  {t('enable')}
                </Button>
              </div>
            ) : null
          }
        >
          {fmt(t, 'error', { detail: s.errText(s.tunnelStateDetail) || t('unknownError') })}
        </Alert>
      );
    }
    if (!s.tunnelUrl && s.publicConfigured) {
      return (
        <Alert
          kind="info"
          icon={Icons.info}
          extra={
            <div style={{ marginTop: 10 }}>
              <Button
                variant="primary"
                size="sm"
                onClick={s.startTunnel}
                disabled={pending.wan === true || pending.saveNamed === true}
              >
                {t('enable')}
              </Button>
            </div>
          }
        >
          {t('wanOffHint')}
        </Alert>
      );
    }
    return null;
  };

  const renderPublicConfigArea = () => {
    if (s.tunnelCfg) {
      return (
        <div className="dshp-panel">
          <div className="dshp-step-box">
            <div className="dshp-step-title">{t('step1Title')}</div>
            <div className="dshp-step-desc">{t('step1Desc')}</div>
            {renderTargetBar()}
          </div>

          <div className="dshp-form">
            <div className="dshp-step-title">{t('step2Title')}</div>
            <label className="dshp-field">
              <span>{t('namedHostnameLabel')}</span>
              <input
                className="dshp-input"
                placeholder="pocket.example.com"
                value={s.tunnelCfg.hostname ?? ''}
                autoFocus
                onChange={(e) =>
                  s.setTunnelCfg((c) => ({
                    hostname: e.target.value.trim(),
                    token: c?.token ?? '',
                    err: null,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') void s.saveNamedTunnel();
                  if (e.key === 'Escape') s.setTunnelCfg(null);
                }}
              />
            </label>
            <label className="dshp-field">
              <span>{t('namedTokenLabel')}</span>
              <input
                className="dshp-input is-mono"
                type="password"
                name="dsh-pocket-tunnel-token"
                autoComplete="off"
                spellCheck={false}
                value={s.tunnelCfg.token ?? ''}
                onChange={(e) =>
                  s.setTunnelCfg((c) => ({
                    hostname: c?.hostname ?? '',
                    token: e.target.value.trim(),
                    err: null,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') void s.saveNamedTunnel();
                  if (e.key === 'Escape') s.setTunnelCfg(null);
                }}
              />
            </label>
            <div className="dshp-inline">
              <Button
                variant="primary"
                size="sm"
                onClick={s.saveNamedTunnel}
                disabled={pending.saveNamed === true}
              >
                {t('save')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => s.setTunnelCfg(null)}
                disabled={pending.saveNamed === true}
              >
                {t('cancel')}
              </Button>
            </div>
            <div className="dshp-warn-text">{t('namedSecurity')}</div>
            {s.tunnelCfg.err ? <div className="dshp-err-text">{s.errText(s.tunnelCfg.err)}</div> : null}
          </div>
        </div>
      );
    }

    if (!s.publicConfigured) {
      return (
        <div className="dshp-panel">
          <div className="dshp-step-title">{t('publicConfig')}</div>
          <div className="dshp-step-desc">{t('publicSetupHint')}</div>
          <div className="dshp-step-box">
            <div className="dshp-step-title">{t('step1Title')}</div>
            <div className="dshp-step-desc">{t('step1Desc')}</div>
            {renderTargetBar()}
          </div>
          <div className="dshp-inline">
            <Button variant="primary" size="sm" onClick={s.openTunnelConfig}>
              {t('publicConfigure')}
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="dshp-panel">
        <div className="dshp-panel-head">
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="dshp-panel-title">{s.tunnelConfig.hostname || '—'}</div>
            <div className="dshp-hint">
              {s.tunnelConfig.tokenSet ? t('namedTokenSet') : t('namedTokenMissing')}
              {' · '}
              {t('targetServiceLabel')}: {s.targetServiceUrl}
            </div>
          </div>
          <div className="dshp-inline">
            <Button variant="ghost" size="sm" icon={Icons.copy} onClick={copyTargetService}>
              {t('copyTargetUrl')}
            </Button>
            <Button variant="secondary" size="sm" onClick={s.openTunnelConfig}>
              {t('namedEdit')}
            </Button>
          </div>
        </div>
        {s.tunnelConfigChanged ? <div className="dshp-warn-text">{t('namedTakeEffect')}</div> : null}
      </div>
    );
  };

  const renderPublicBody = () => {
    if (publicView) {
      return (
        <>
          {s.tunnelUrl ? (
            <QrHubBlock
              qrSrc={status?.tunnelQr}
              url={s.tunnelUrl}
              pairingActive={false}
              hint={t('namedRunningHint')}
              s={s}
            />
          ) : null}
          <div className="dshp-hint">{t('wanLocalOnly')}</div>
        </>
      );
    }
    if (!status) {
      return <div className="dshp-loading">{t('loadingStatus')}</div>;
    }
    const qrSrc = s.pairing?.qr || status.tunnelQr;
    return (
      <>
        {renderPreflightWarnings()}
        {renderPublicStatusBanner()}
        {s.tunnelUrl ? (
          <QrHubBlock
            qrSrc={qrSrc}
            url={s.tunnelUrl}
            pairingActive={Boolean(s.pairing)}
            refreshPending={pending.pairRefresh === true}
            onRefreshPairing={s.refreshPairingTicket}
            hint={t('namedRunningHint')}
            s={s}
          />
        ) : null}
        {renderPublicConfigArea()}
      </>
    );
  };

  return (
    <section className="dshp-card" data-dshp-section={isLanTab ? 'lan' : 'wan'}>
      <div className="dshp-hub-top">
        <SegmentedControl<ChannelKind>
          value={activeChannel}
          options={channelOptions}
          onChange={(next) => s.setActiveChannel(next)}
          ariaLabel={t('section')}
        />
        <div className="dshp-hub-toggle">
          <span>{masterChecked ? t('on') : t('off')}</span>
          <Switch
            checked={masterChecked}
            onChange={handleMasterSwitch}
            disabled={masterDisabled}
            label={isLanTab ? t('lanAccess') : t('wanAccess')}
          />
        </div>
      </div>
      <div className="dshp-hub-body">
        {isLanTab ? renderLanBody() : renderPublicBody()}
      </div>
    </section>
  );
}
