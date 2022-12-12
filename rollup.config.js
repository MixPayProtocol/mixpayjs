const createBanner = require('create-banner');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const nodePolyfills = require('rollup-plugin-node-polyfills');
const rollupTypescript = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');
const { babel } = require('@rollup/plugin-babel');
const pkg = require('./package.json');

pkg.name = pkg.name.replace('js', '');

const banner = createBanner();
const name = 'MixPay';

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      banner,
      file: pkg.main,
      format: 'cjs',
      exports: 'auto',
    },
    {
      banner,
      name,
      file: pkg.umd,
      format: 'umd',
      globals: {
        axios: 'axios',
      },
    },
    {
      banner,
      name,
      file: pkg.module,
      format: 'esm',
    },
  ],
  // sourceMap: false,
  plugins: [
    resolve(),
    nodePolyfills(),
    rollupTypescript(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
  ],
  external: ['axios'],
};
