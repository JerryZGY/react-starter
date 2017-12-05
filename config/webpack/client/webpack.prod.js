// Node module
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const OptimizeJsPlugin = require('optimize-js-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// Config
const { ANALYZE_BUNDLE, appHtml } = require('../config');
const baseWebpackConfig = require('./webpack.base');

const { plugins } = baseWebpackConfig;

const analyzePlugins = ANALYZE_BUNDLE ? [new BundleAnalyzerPlugin({ analyzerMode: 'static' })] : [];

module.exports = {
  ...baseWebpackConfig,
  module: {
    ...baseWebpackConfig.module,
    rules: [
      ...baseWebpackConfig.module.rules,
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: require.resolve('style-loader'),
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: true
              }
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
                ]
              }
            },
            require.resolve('resolve-url-loader')
          ]
        })
      }
    ]
  },
  plugins: [
    ...plugins,
    ...analyzePlugins,
    new webpack.ProgressPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[hash:6].css',
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true,
        discardComments: { removeAll: true }
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: { ecma: 6, drop_console: true },
        output: { ecma: 6, comments: false }
      }
    }),
    new OptimizeJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
    new CompressionPlugin({ algorithm: 'gzip' }),
    new HtmlWebpackPlugin({
      inject: true,
      template: appHtml,
      favicon: 'public/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ]
};
