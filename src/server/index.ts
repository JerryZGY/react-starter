// Node Module
import Koa from 'koa';
import path from 'path';
import serve from 'koa-static';
import logger from 'koa-logger';
// Lib
import pino from '../lib/logger';
import config from './config';

const { isDev, port, version } = config;
const app = new Koa();
app
  .use(logger())
  .use(serve(path.resolve(process.env.SERVER_DIST_PATH)))
  .listen(port, () => pino.info(`ReactStarter v${version} [Port] ${port} [Mode] ${isDev ? '⚙️' : '🌎'}`));
