// Node module
const fs = require('fs');
const path = require('path');
// Version
const { version: VERSION } = require('../../package.json');

const {
  NODE_ENV = 'development',
  NODE_PATH = '',
  ANALYZE_BUNDLE
} = process.env;

const appPath = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => path.resolve(appPath, relativePath);

const distPath = resolveApp('dist');

const CLIENT_DIST_PATH = distPath;

const SERVER_DIST_PATH = distPath;

const nodePath = NODE_PATH
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => resolveApp(appPath, folder))
  .join(path.delimiter);

module.exports = {
  publicPath: '/',
  isProduction: NODE_ENV === 'production',
  nodePath,
  appPath,
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appPackageJson: resolveApp('package.json'),
  appNodeModulesPath: resolveApp('node_modules'),
  srcPath: resolveApp('src'),
  distPath,
  polyfills: ['isomorphic-fetch'],
  VERSION,
  NODE_ENV,
  CLIENT_DIST_PATH,
  SERVER_DIST_PATH
}
