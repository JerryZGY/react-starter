// Node module
const webpack = require('webpack');
const OptimizeJsPlugin = require('optimize-js-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// Config
const { ANALYZE_BUNDLE } = require('../config');
const baseWebpackConfig = require('./webpack.base');

const { plugins } = baseWebpackConfig;

const analyzePlugins = ANALYZE_BUNDLE ? [new BundleAnalyzerPlugin({ analyzerMode: 'static' })] : [];

module.exports = {
  ...baseWebpackConfig,
  plugins: [
    ...plugins,
    ...analyzePlugins,
    new webpack.ProgressPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: { ecma: 6, drop_console: true },
        output: { ecma: 6, comments: false }
      }
    }),
    new OptimizeJsPlugin()
  ]
};
