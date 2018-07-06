// server.js
const next = require('next');
const routes = require('./routes');
const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handler = routes.getRequestHandler(app);

// With express
console.log(process.env.NODE_ENV);
const express = require('express');
const port = isDev ? 3000 : 80;
app.prepare().then(() => {
  express()
    .use(handler)
    .listen(port);
});