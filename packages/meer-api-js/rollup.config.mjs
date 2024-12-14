import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: 'src/browser-index.ts',
  output: {
    file: 'dist/browser.js',
    format: 'umd',
    name: 'meer',
    sourcemap: true,
    globals: {
      'borsh': 'borsh',
      'bs58': 'bs58',
      '@noble/curves': 'nobleCurves'
    }
  },
  plugins: [
    json(),
    alias({
      entries: [
        {
          find: '@meer-js',
          replacement: path.resolve(__dirname, '..')
        }
      ]
    }),
    typescript({
      tsconfig: false,
      module: 'esnext',
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
      mainFields: ['browser', 'module', 'main']  // Prioritize browser builds
    }),
    commonjs({
      include: /node_modules/
    })
  ]
};
