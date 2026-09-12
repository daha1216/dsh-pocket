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
  target: ['chrome100'],
  external: ['react', 'react/jsx-runtime', '@deepseek-ai/dsh-client-ui-primitives'],
  write: false,
  minify: process.env.NODE_ENV === 'production',
  legalComments: 'none',
});

const bundled = result.outputFiles?.[0]?.text;
if (!bundled) throw new Error('esbuild did not produce a client bundle');

// esbuild 在产物里插入 `// <入口路径>` 溯源注释，路径是**绝对路径**：
// 直接提交会把构建机器的路径（用户名、盘符、目录名）写进公开仓库。
// 这里统一剥掉 packageRoot 前缀，只保留仓库内相对路径（跨机器重建结果一致）。
const pathPrefix = packageRoot.replace(/\\/g, '/');
const bundledClean = bundled
  .split('\n')
  .map((line) => {
    const m = /^(\s*\/\/ )([A-Za-z]:[\\/].*)$/.exec(line);
    if (!m) return line;
    const rel = m[2].replace(/\\/g, '/').replace(pathPrefix + '/', '');
    return m[1] + rel;
  })
  .join('\n');

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
${bundledClean}
    return module.exports;
  }
});
`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, wrapped, 'utf8');
console.log(`Wrote ${outputPath}`);
