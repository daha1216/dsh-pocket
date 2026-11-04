// dsh-pocket 网页客户端打包：client/index.jsx → client/client.js
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { stripCssComments } from '../scripts/strip-css-comments.mjs';

const sourceDir = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(sourceDir, '..');
const outputPath = resolve(packageRoot, 'client/client.js');
const loaderId = process.env.DSH_POCKET_CLIENT_ID ?? 'dsh-pocket';

const result = await build({
  entryPoints: [resolve(sourceDir, 'index.jsx')],
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  // chrome105：注入样式大量使用 :has()（Chrome 105 起才支持；如 mobile-apply 的
  // body[data-dsh-pocket-layout] 系列选择器）。构建基线若低于真实运行基线
  // （原 chrome100），产物会「声称兼容 100、样式实则 105+ 才生效」——基线与
  // 实际依赖对齐，esbuild 的语法降级决策才有意义。
  target: ['chrome105'],
  external: ['react', 'react/jsx-runtime', '@deepseek-ai/dsh-client-ui-primitives'],
  write: false,
  // 默认压缩；DSH_POCKET_NO_MINIFY=1 显式关闭（package.json 没有任何脚本设置 NODE_ENV）
  minify: process.env.DSH_POCKET_NO_MINIFY !== '1',
  // esbuild 默认 ascii 会把非 ASCII 全部转成 \uXXXX——本包 CSS/文案中文密集，
  // 纯属体积浪费；JS 按规范默认按 UTF-8 解析，加载侧无兼容问题。
  charset: 'utf8',
  legalComments: 'none',
});

const bundled = result.outputFiles?.[0]?.text;
if (!bundled) throw new Error('esbuild did not produce a client bundle');

// 模板字面量里的 CSS 注释（设计记录）只留在源码里，产物剥掉——它们约占注入
// 样式表的一半，且每个页面加载都要被浏览器重新解析。esbuild minify 会改名
// 常量（var _n=`...`），按 *_CSS 名字匹配行不通；改按内容识别：无插值、
// 含 @media/@font-face/@keyframes/@container、且以选择器或 CSS 注释开头的
// 模板串才剥。本仓产物里满足这三条的全部是纯 CSS 文本（base/layout/compat/
// misc + 设置页样式，见 tests/strip-css-comments.test.js），其余模板串
// （JS/文案/HTML 片段）一律原样返回。${ 出现在内容里时整串跳过。
const stripInBundle = (text) =>
  text.replace(/`((?:[^`\\]|\\.)*)`/gs, (whole, css) => {
    if (css.includes('${')) return whole
    if (!/@media|@font-face|@keyframes|@container/.test(css)) return whole
    if (!/^[ \t\n]*(?:[.[#[:@*]|\/\*)/.test(css)) return whole
    return `\`${stripCssComments(css)}\``
  });
const cleaned = stripInBundle(bundled);

const wrapped = `window.__ModuleLoader__.load({
  id: ${JSON.stringify(loaderId)},
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    // The DSH client module system provides react as a module, never as a
    // global. esbuild keeps react external (see the build config above) and
    // its classic JSX transform emits bare React.createElement calls for the
    // mobile components (which import only named hooks, not React itself), so
    // the bundle must bind React itself - otherwise every mobile component
    // crashes at render time with "ReferenceError: React is not defined".
    var React = require("react");
${cleaned}
    return module.exports;
  }
});
`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, wrapped, 'utf8');
console.log(`Wrote ${outputPath}`);
