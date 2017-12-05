// Node module
const fs = require('fs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const openBrowser = require('react-dev-utils/openBrowser');
const clearConsole = require('react-dev-utils/clearConsole');
const { choosePort, createCompiler, prepareProxy, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
// Config
const { appPublic, appPackageJson } = require('../config/webpack/config');
const clientConfig = require('../config/webpack/client/webpack.dev');
const devServerConfig = require('../config/webpack/dev/webpack.base');

const HOST = process.env.HOST || '0.0.0.0';
const isInteractive = process.stdout.isTTY;
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (port == null) { return; }
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(appPackageJson).name;
    const urls = prepareUrls(protocol, HOST, port);
    const compiler = createCompiler(webpack, clientConfig, appName, urls, true);
    const proxySetting = require(appPackageJson).proxy;
    const proxyConfig = prepareProxy(proxySetting, appPublic);
    const serverConfig = devServerConfig(proxyConfig, urls.lanUrlForConfig);
    const devServer = new WebpackDevServer(compiler, serverConfig);
    devServer.listen(port, HOST, err => {
      if (err) { return console.log(err); }
      if (isInteractive) { clearConsole(); }
      openBrowser(urls.localUrlForBrowser);
    });
    ['SIGINT', 'SIGTERM'].forEach(sig => process.on(sig, () => {
      devServer.close();
      process.exit();
    }));
  })
  .catch(err => {
    if (err && err.message) { console.log(err.message); }
    process.exit(1);
  });
