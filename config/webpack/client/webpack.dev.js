// Node module
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const AutoDllPlugin = require('autodll-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Config
const { appHtml, polyfills } = require('../config');
const baseWebpackConfig = require('./webpack.base');

const { entry, plugins } = baseWebpackConfig;

module.exports = {
  ...baseWebpackConfig,
  entry: [
    entry.client,
    'react-error-overlay',
    'react-hot-loader/patch',
    'react-dev-utils/webpackHotDevClient'
  ],
  module: {
    ...baseWebpackConfig.module,
    rules: [
      ...baseWebpackConfig.module.rules,
      {
        test: /\.css$/,
        loaders: [
          { loader: require.resolve('style-loader') },
          {
            loader: require.resolve('css-loader'),
            options: { sourceMap: true }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9'
                  ],
                  flexbox: 'no-2009'
                })
              ],
              sourceMap: true
            }
          },
          require.resolve('resolve-url-loader')
        ]
      }
    ]
  },
  plugins: [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ inject: true, template: appHtml }),
    new AutoDllPlugin({
      debug: true,
      filename: '[name].js',
      entry: { polyfills }
    })
  ]
};
