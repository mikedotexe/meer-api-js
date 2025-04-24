import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
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
    replace({
      preventAssignment: true,
      values: {
        'this && this.__extends': 'globalThis && globalThis.__extends',
        'this && this.__assign': 'globalThis && globalThis.__assign',
        'this && this.__rest': 'globalThis && globalThis.__rest',
        'this && this.__decorate': 'globalThis && globalThis.__decorate'
      }
    }),
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
      mainFields: ['browser', 'module', 'main']
    }),
    commonjs({
      include: /node_modules/,
      transformMixedEsModules: true,
      requireReturnsDefault: 'auto'
    })
  ]
};
