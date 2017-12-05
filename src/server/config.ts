const config = {
  port: 3500,
  dist: process.env.CLIENT_DIST_PATH,
  version: process.env.VERSION,
  isDev: process.env.NODE_ENV === 'development'
};

export default config;
