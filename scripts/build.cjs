const { build } = require('esbuild');
const fs = require('node:fs/promises');

(async () => {
  await build({ entryPoints: ['cloud.js'], bundle: true, format: 'iife', outfile: 'assets/cloud.js', minify: true });
  // Only browser assets belong in the publicly served deployment directory.
  await fs.rm('dist', { recursive: true, force: true });
  await fs.mkdir('dist', { recursive: true });
  for (const name of ['index.html', 'app.js', 'style.css']) await fs.copyFile(name, `dist/${name}`);
  await fs.cp('assets', 'dist/assets', { recursive: true });
})().catch(error => { console.error(error); process.exitCode = 1; });
