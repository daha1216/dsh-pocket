// Zone 3：手机端显示偏好卡片（文件链接底部预览 / 独立字号 / 手机右边栏 / 双指捏合缩放）
import * as React from 'react';
import { Icons } from './icons.tsx';
import { Card, Row, Switch } from './primitives.tsx';
import type { SettingsController } from './use-settings.ts';
import { MOBILE_FONT_OPTIONS } from './util.ts';

export interface MobilePrefsCardProps {
  s: SettingsController;
}

export function MobilePrefsCard({ s }: MobilePrefsCardProps): React.ReactElement {
  const { t, status, pending } = s;

  return (
    <Card
      sectionId="prefs"
      icon={Icons.sliders}
      title={t('prefsTitle')}
      sub={t('prefsHint')}
    >
      {!status ? (
        <div className="dshp-loading">{t('loadingStatus')}</div>
      ) : (
        <>
          <Row
            borderless
            label={t('mobileFilePreview')}
            desc={t('mobileFilePreviewHint')}
            control={
              <Switch
                checked={status.mobileFilePreviewEnabled !== false}
                onChange={(next) => s.setMobileFilePreview(next)}
                disabled={pending.prefs === true}
                label={t('mobileFilePreview')}
              />
            }
          />
          <Row
            label={t('mobileFontSize')}
            desc={t('mobileFontSizeHint')}
            control={
              <select
                className="dshp-select"
                aria-label={t('mobileFontSize')}
                value={String(Number(status.mobileFontSize) || 0)}
                disabled={pending.prefs === true}
                onChange={(e) => s.setMobileFontSize(Number(e.target.value))}
              >
                {MOBILE_FONT_OPTIONS.map((px) => (
                  <option key={px} value={String(px)}>
                    {px === 0 ? t('mobileFontFollow') : `${px} px`}
                  </option>
                ))}
              </select>
            }
          />
          <Row
            label={t('mobileRightbar')}
            desc={t('mobileRightbarHint')}
            control={
              <Switch
                checked={status.mobileRightbarEnabled !== false}
                onChange={(next) => s.setMobileRightbar(next)}
                disabled={pending.prefs === true}
                label={t('mobileRightbar')}
              />
            }
          />
          <Row
            label={t('mobilePinchZoom')}
            desc={t('mobilePinchZoomHint')}
            control={
              <Switch
                checked={status.mobilePinchZoomEnabled === true}
                onChange={(next) => s.setMobilePinchZoom(next)}
                disabled={pending.prefs === true}
                label={t('mobilePinchZoom')}
              />
            }
          />
        </>
      )}
    </Card>
  );
}
