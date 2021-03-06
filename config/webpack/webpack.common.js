// Node module
const path = require('path');
const webpack = require('webpack');
// Config
const config = require('./config');

const {
  nodePath,
  appNodeModulesPath,
  VERSION,
  NODE_ENV
} = config;

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['node_modules', appNodeModulesPath].concat(nodePath.split(path.delimiter).filter(Boolean))
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(VERSION),
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ]
}
