// Build-time removal of CSS comments from the stylesheet modules (2026-11-05,
// ported from upstream v3.2.3 scripts/lib/strip-css-comments.mjs).
//
// The styles/*.css.ts modules are template-literal CSS whose comments are the
// design record (owner decisions, measurements, host archaeology). They are a
// large share of the injected stylesheet and ship verbatim inside
// client/client.js, then get parsed by the browser on every page load.
// Sources keep every comment; only the emitted bundle drops them.
//
// Safe by construction for this repo's CSS: no template literal contains "${"
// (refused below) and no rule text contains "/*" outside a comment
// (tests/strip-css-comments.test.ts pins the parsed rule list is identical
// before and after stripping).

/** Remove every CSS block comment and collapse the blank runs they leave. */
export function stripCssComments(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{2,}/g, '\n')
}

/** Strip the CSS inside `export const <NAME>_CSS = \`...\`` declarations. */
export function stripEmittedCssModule(source) {
  return source.replace(
    /(export const [A-Z_]+_CSS = `)([\s\S]*?)(`;)/g,
    (_, open, css, close) => {
      if (css.includes('${')) {
        throw new Error('styles module uses interpolation; refusing to strip')
      }
      return open + stripCssComments(css) + close
    },
  )
}
