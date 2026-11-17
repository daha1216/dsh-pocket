// Zone 4：可折叠高级选项与维护区（备用密码 / 网卡选择 / 代理缓存 / 恢复出厂设置）+ 页脚
import * as React from 'react';
import { Icons } from './icons.tsx';
import { Button, Row, Switch } from './primitives.tsx';
import type { SettingsController } from './use-settings.ts';
import { fmt, fmtBytes } from './util.ts';

export interface AdvancedSectionProps {
  s: SettingsController;
}

export function AdvancedSection({ s }: AdvancedSectionProps): React.ReactElement {
  const { t, status, pending, publicView } = s;

  const renderPinValueBox = (
    which: 'lan' | 'public',
    value: string,
    extraActions?: React.ReactNode,
  ) => {
    const shown = Boolean(s.pinShown[which]);
    return (
      <div className="dshp-pinbox">
        <span className="dshp-pin-value" data-dshp-pin={which}>
          {shown ? value : '••••••••'}
        </span>
        <Button
          variant="ghost"
          size="sm"
          icon={shown ? Icons.eyeOff : Icons.eye}
          onClick={() => s.setPinShown((m) => ({ ...m, [which]: !m[which] }))}
        >
          {shown ? t('pinHide') : t('pinShow')}
        </Button>
        {extraActions ?? null}
      </div>
    );
  };

  const renderCustomPinEditor = (which: 'lan' | 'public') => (
    <div className="dshp-adv">
      <div className="dshp-custom">
        <span>{t('customizing')}</span>
        <input
          className="dshp-input is-mono"
          style={{ width: 170 }}
          type="password"
          minLength={8}
          maxLength={64}
          name={`dsh-pocket-pin-${which}`}
          autoComplete="new-password"
          spellCheck={false}
          value={s.customPin?.value ?? ''}
          autoFocus
          onChange={(e) => {
            const raw = e.target.value;
            const filtered = raw.replace(/[^a-zA-Z0-9]/g, '');
            s.setCustomPin({
              which,
              value: filtered,
              err: filtered.length === raw.length ? null : t('pinCharsFiltered'),
            });
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') void s.saveCustomPin(which);
            if (e.key === 'Escape') s.setCustomPin(null);
          }}
        />
        <Button
          variant="primary"
          size="sm"
          disabled={pending.savePin === true}
          onClick={() => s.saveCustomPin(which)}
        >
          {t('save')}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={pending.savePin === true}
          onClick={() => s.setCustomPin(null)}
        >
          {t('cancel')}
        </Button>
      </div>
      {s.customPin?.err ? <div className="dshp-err-text">{s.errText(s.customPin.err)}</div> : null}
    </div>
  );

  const displayVersion = s.versionInfo?.current || '4.0.0';

  return (
    <>
      <section className="dshp-card" data-dshp-section="advanced">
        <button
          type="button"
          className="dshp-adv-toggle"
          aria-expanded={s.advSectionOpen}
          onClick={() => s.setAdvSectionOpen((open) => !open)}
        >
          <div className="dshp-card-head-left">
            <span className="dshp-card-icon">
              <Icons.shield size={16} />
            </span>
            <div className="dshp-card-text">
              <div className="dshp-card-title">{t('advSectionTitle')}</div>
              <div className="dshp-card-sub">{t('advSectionSub')}</div>
            </div>
          </div>
          <span className={`dshp-chevron${s.advSectionOpen ? ' is-open' : ''}`}>
            <Icons.chevron size={16} />
          </span>
        </button>

        {s.advSectionOpen ? (
          <div className="dshp-card-body">
            {!status ? (
              <div className="dshp-loading">{t('loadingStatus')}</div>
            ) : (
              <>
                {/* 1. 备用访问密码（手动非扫码登录兜底） */}
                <Row
                  label={t('fallbackPinSection')}
                  desc={t('fallbackPinIntro')}
                  stack
                  extra={
                    <div className="dshp-adv">
                      {/* 局域网备用密码开关与密码值 */}
                      {!publicView ? (
                        <div className="dshp-panel">
                          <div className="dshp-row-main">
                            <div className="dshp-row-info">
                              <div className="dshp-row-label">{t('lanPin')}</div>
                              {status?.lanAuthEnabled === false ? (
                                <div className="dshp-row-desc">{t('lanPinOff')}</div>
                              ) : null}
                            </div>
                            <Switch
                              checked={status?.lanAuthEnabled !== false}
                              onChange={(next) => s.setLanAuth(next)}
                              disabled={pending.lanAuth === true}
                              label={t('lanPin')}
                            />
                          </div>
                          {status?.lanAuthEnabled !== false ? (
                            s.customPin?.which === 'lan' ? (
                              renderCustomPinEditor('lan')
                            ) : status?.lanToken ? (
                              <div>
                                {renderPinValueBox(
                                  'lan',
                                  status.lanToken,
                                  <>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      icon={Icons.refresh}
                                      disabled={pending.refreshPin === true}
                                      onClick={s.refreshLanPin}
                                    >
                                      {t('refresh')}
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        s.setCustomPin({ which: 'lan', value: '', err: null })
                                      }
                                    >
                                      {t('customize')}
                                    </Button>
                                  </>,
                                )}
                                {status?.lanPinCustom ? (
                                  <div className="dshp-warn-text">{t('pinCustomHint')}</div>
                                ) : null}
                              </div>
                            ) : (
                              <div className="dshp-hint">{t('lanPinUnavailable')}</div>
                            )
                          ) : null}
                        </div>
                      ) : (
                        <div className="dshp-hint">{t('lanPinRemoteHint')}</div>
                      )}

                      {/* 公网备用密码（仅本机返回 accessToken 时展示） */}
                      {status?.accessToken ? (
                        <div className="dshp-panel">
                          <div className="dshp-row-label">{t('publicPinLabel')}</div>
                          {s.customPin?.which === 'public' ? (
                            renderCustomPinEditor('public')
                          ) : (
                            <div>
                              {renderPinValueBox(
                                'public',
                                status.accessToken,
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    s.setCustomPin({ which: 'public', value: '', err: null })
                                  }
                                >
                                  {t('customize')}
                                </Button>,
                              )}
                              <div className="dshp-warn-text">{t('namedSecurity')}</div>
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  }
                />

                {/* 2. 网卡与局域网 IPv4 地址选择 */}
                {!publicView ? (
                  <Row
                    label={t('advAddress')}
                    desc={t('lanAddress')}
                    control={
                      <select
                        className="dshp-select"
                        aria-label={t('lanAddress')}
                        value={status?.lanIpOverride || ''}
                        disabled={pending.lanAddr === true}
                        onChange={(e) => s.setLanAddress(e.target.value)}
                      >
                        <option value="">{t('lanAddressAuto')}</option>
                        {(status?.lanCandidates || []).map((item) => {
                          const ip = typeof item === 'string' ? item : item.ip;
                          const label =
                            typeof item === 'string'
                              ? item
                              : item.name
                                ? `${item.ip} (${item.name})`
                                : item.ip;
                          return (
                            <option key={ip} value={ip}>
                              {label}
                            </option>
                          );
                        })}
                      </select>
                    }
                  />
                ) : null}

                {/* 3. 代理侧加速缓存统计与清理 */}
                {status?.cache ? (
                  <Row
                    label={fmt(t, 'cacheUsage', {
                      used: fmtBytes(status.cache.bytes),
                      budget: fmtBytes(status.cache.budgetBytes),
                    })}
                    desc={`${fmt(t, 'cacheEntries', { n: status.cache.entries ?? 0 })} · ${t('cacheSub')}`}
                    control={
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={Icons.trash}
                        disabled={pending.cache === true}
                        onClick={s.clearCache}
                      >
                        {t('cacheClear')}
                      </Button>
                    }
                  />
                ) : null}

                {/* 4. 危险操作：恢复出厂设置 */}
                <div className="dshp-row">
                  <div className="dshp-danger-zone">
                    <div className="dshp-row-info">
                      <div className="dshp-row-label">{t('resetFactory')}</div>
                      <div className="dshp-row-desc">{t('resetIntro')}</div>
                    </div>
                    {publicView ? (
                      <span className="dshp-hint">{t('resetLocalOnly')}</span>
                    ) : (
                      <Button
                        variant="danger"
                        size="sm"
                        icon={Icons.trash}
                        disabled={pending.reset === true}
                        onClick={() => s.setResetOpen(true)}
                      >
                        {t('resetGo')}
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : null}
      </section>

      <footer className="dshp-footer">
        <span title={t('updateHint')}>{fmt(t, 'versionLine', { ver: displayVersion })}</span>
        <span>·</span>
        <a
          href="https://github.com/daha1216/dsh-pocket#-怎么用"
          target="_blank"
          rel="noreferrer"
          title={t('updateHint')}
        >
          {t('updateDocLink')}
        </a>
        <span>·</span>
        <a
          href="https://github.com/daha1216/dsh-pocket"
          target="_blank"
          rel="noreferrer"
          title={t('starAsk')}
        >
          {t('githubLink')}
        </a>
        <span>·</span>
        <a
          href="https://github.com/daha1216/dsh-pocket/issues"
          target="_blank"
          rel="noreferrer"
        >
          {t('feedback')}
        </a>
      </footer>
    </>
  );
}
