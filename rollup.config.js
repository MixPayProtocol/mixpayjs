const createBanner = require('create-banner');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const pkg = require('./package.json');

pkg.name = pkg.name.replace('js', '');

const banner = createBanner();
const name = 'MixPay';

module.exports = {
  input: 'src/index.js',
  output: [
    {
      banner,
      name,
      file: `dist/${pkg.name}.js`,
      format: 'umd',
    },
    {
      banner,
      file: `dist/${pkg.name}.common.js`,
      format: 'cjs',
      exports: 'auto',
    },
    {
      banner,
      name,
      file: `dist/${pkg.name}.esm.js`,
      format: 'esm',
    },
    {
      banner,
      name,
      file: `docs/js/${pkg.name}.js`,
      format: 'umd',
    },
  ],
  // sourceMap: false,
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
  ],
};
