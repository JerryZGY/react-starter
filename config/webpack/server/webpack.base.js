// Node module
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
// Config
const config = require('../config');
const commonWebpackConfig = require('../webpack.common');

const {
  isProduction,
  srcPath,
  distPath,
  SERVER_DIST_PATH,
  CLIENT_DIST_PATH
} = config;

const {
  resolve,
  plugins
} = commonWebpackConfig;

module.exports = {
  name: 'server',
  target: 'node',
  node: {
    __dirname: true,
    global: true
  },
  devtool: isProduction ? false : 'eval',
  externals: [nodeExternals()],
  entry: path.join(srcPath, isProduction ? './server' : './server/server'),
  output: {
    path: SERVER_DIST_PATH,
    filename: 'index.js',
    chunkFilename: isProduction ? '[name].[chunkhash:6].js' : '[name].js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]?[loaders]'
  },
  resolve,
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: require.resolve('ts-loader'), options: { silent: true, transpileOnly: true } }
        ]
      }
    ]
  },
  plugins: [
    ...plugins,
    new webpack.DefinePlugin({
      'process.env.SERVER_DIST_PATH': JSON.stringify(SERVER_DIST_PATH),
      'process.env.CLIENT_DIST_PATH': JSON.stringify(CLIENT_DIST_PATH)
    })
  ]
}
