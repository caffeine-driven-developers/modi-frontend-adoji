/* eslint-disable import/no-extraneous-dependencies */
// const path = require('path');
const {
  addWebpackAlias,
  addBabelPlugin,
  addBabelPlugins,
  override,
  addLessLoader,
} = require('customize-cra');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

const myFixBabelImports = (libraryName, options, thirdArg) =>
  addBabelPlugin([
    'import',
    Object.assign(
      {},
      {
        libraryName,
      },
      options,
    ),
    thirdArg,
  ]);

module.exports = override(
  addWebpackAlias({
    'react-dom': '@hot-loader/react-dom',
  }),
  ...addBabelPlugins('styled-jsx/babel'),
  myFixBabelImports(
    'import',
    {
      libraryName: 'lodash',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'import2',
  ),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#0275FF' },
  }),
  rewireReactHotLoader,
);
