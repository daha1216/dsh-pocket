/** Dispatched on `document` once the visible band has SETTLED (two equal
 *  frames), right after `--dsha-mobile-visible-vh` is written. The variable
 *  itself now follows the keyboard frame by frame when the device keeps up, and
 *  only moves on settle when it does not (effects/viewport-meta.ts +
 *  core/visible-band-publish.ts); this event is the settle edge either way, so
 *  effects that lay out against the variable re-measure on it instead of racing
 *  the keyboard (2026-11-03). */
export const VISIBLE_BAND_EVENT = 'dsh-mobile-visible-band'
