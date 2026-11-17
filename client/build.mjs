// dsh-pocket v4.0 Dual-Chunk Web Client Bundler:
//   1) client/index.tsx        -> client/client.js        (entry + SettingsPage + meta.stylesheets)
//   2) client/mobile-chunk.ts  -> client/client.mobile.js (lazy mobile host adaptation chunk)
import { mkdir, readFile, utimes, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { stripCssComments } from '../scripts/strip-css-comments.mjs';

const sourceDir = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(sourceDir, '..');
const mainOutputPath = resolve(packageRoot, 'client/client.js');
const mobileOutputPath = resolve(packageRoot, 'client/client.mobile.js');
const settingsStylesPath = resolve(sourceDir, 'settings/styles.ts');
const loaderId = process.env.DSH_POCKET_CLIENT_ID ?? 'dsh-pocket';
const minify = process.env.DSH_POCKET_NO_MINIFY !== '1';

// Extract and strip `POCKET_SETTINGS_CSS` once inside `client.js`'s private IIFE closure so
// `meta.stylesheets` and the `< 0.2.2-rc.2` fallback share the single stripped CSS string
// without leaking onto `window` or polluting `module.exports`.
const rawStylesModule = (await readFile(settingsStylesPath, 'utf8')).replace(/\r\n/g, '\n');
const cssMatch = rawStylesModule.match(/export const POCKET_SETTINGS_CSS = `([\s\S]*?)`;/);
if (!cssMatch) {
  throw new Error('Could not extract POCKET_SETTINGS_CSS from client/settings/styles.ts');
}
if (cssMatch[1].includes('${')) {
  throw new Error('POCKET_SETTINGS_CSS must not use template interpolation');
}
const strippedSettingsCss = stripCssComments(cssMatch[1]).trim();

const sharedSettingsStylesPlugin = {
  name: 'dshp-shared-settings-css',
  setup(b) {
    b.onLoad({ filter: /settings[\\/]styles\.ts$/ }, (args) => {
      if (resolve(args.path) !== settingsStylesPath) return undefined;
      return {
        contents: 'declare const __dshpSettingsCss: string;\nexport const POCKET_SETTINGS_CSS = __dshpSettingsCss;\n',
        loader: 'ts',
      };
    });
  },
};

const stripInBundle = (text) =>
  text.replace(/`((?:[^`\\]|\\.)*)`/gs, (whole, css) => {
    if (css.includes('${')) return whole;
    if (!/@media|@font-face|@keyframes|@container/.test(css)) return whole;
    if (!/^[ \t\n]*(?:[.[#[:@*]|\/\*)/.test(css)) return whole;
    return `\`${stripCssComments(css)}\``;
  });

const commonBuildOptions = {
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: ['chrome105'],
  // Classic JSX (`React.createElement`) binds to `var React = require("react")` inside
  // `factory`, avoiding any runtime dependency on `react/jsx-runtime` in older DSH loaders.
  jsx: 'transform',
  tsconfigRaw: { compilerOptions: { jsx: 'react' } },
  write: false,
  minify,
  charset: 'utf8',
  legalComments: 'none',
};

const [mainResult, mobileResult] = await Promise.all([
  build({
    ...commonBuildOptions,
    entryPoints: [resolve(sourceDir, 'index.tsx')],
    external: ['react', 'react/jsx-runtime', './client.mobile.js'],
    plugins: [sharedSettingsStylesPlugin],
  }),
  build({
    ...commonBuildOptions,
    entryPoints: [resolve(sourceDir, 'mobile-chunk.ts')],
    external: ['react', 'react/jsx-runtime'],
  }),
]);

const bundledMain = mainResult.outputFiles?.[0]?.text;
const bundledMobile = mobileResult.outputFiles?.[0]?.text;
if (!bundledMain || !bundledMobile) {
  throw new Error('esbuild failed to emit client.js or client.mobile.js');
}

const cleanedMain = stripInBundle(bundledMain);
const cleanedMobile = stripInBundle(bundledMobile);

const wrappedMain = `(() => {
  const __dshpSettingsCss = ${JSON.stringify(strippedSettingsCss)};
  window.__ModuleLoader__.load({
    id: ${JSON.stringify(loaderId)},
    factory: (require) => {
      var __dshpHostRequire = require;
      var module = { exports: {} };
      var exports = module.exports;
      var React = require("react");
${cleanedMain}
      return module.exports;
    },
    meta: () => ({
      stylesheets: {
        "client/settings/styles.css": { text: () => __dshpSettingsCss }
      }
    })
  });
})();
`;

const wrappedMobile = `(window.__dshpChunkLoader || window.__ModuleLoader__).load({
  id: ${JSON.stringify(loaderId)},
  chunk: "client.mobile.js",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    var React = require("react");
${cleanedMobile}
    return module.exports;
  }
});
`;

await mkdir(dirname(mainOutputPath), { recursive: true });
await writeFile(mobileOutputPath, wrappedMobile.replace(/\r\n/g, '\n'), 'utf8');
await writeFile(mainOutputPath, wrappedMain.replace(/\r\n/g, '\n'), 'utf8');

// Ensure owner `client.js` mtime is strictly refreshed after `client.mobile.js` so DSH HMR
// (`tsdown.client.ts:676`) always bumps chunk revision URLs together.
const now = new Date();
await utimes(mainOutputPath, now, now);

console.log(
  `Wrote ${mainOutputPath} (${Buffer.byteLength(wrappedMain)} B) + ${mobileOutputPath} (${Buffer.byteLength(wrappedMobile)} B)`,
);
