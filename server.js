// server.js
const next = require('next');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handler = routes.getRequestHandler(app);

const getPort = env => {
  switch (env) {
    case 'production':
      return 80;
    case 'stage':
      return 80;
    default:
      return 3000;
  }
};

// With express
const express = require('express');
const port = getPort(process.env.NODE_ENV);
console.log('PORT: ', port);
app.prepare().then(() => {
  express()
    .use(handler)
    .use(cookieParser())
    .listen(port);
});
