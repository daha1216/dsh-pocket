// dsh-pocket 网页客户端打包：client/index.jsx → client/client.js
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

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
${bundled}
    return module.exports;
  }
});
`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, wrapped, 'utf8');
console.log(`Wrote ${outputPath}`);
