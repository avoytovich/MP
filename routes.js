const routes = require('next-routes');

// Restart server after
// Name   Page      Pattern
module.exports = routes()
  .add('about-with-id', '/about/:id', 'about')
  .add('about', '/about', 'about')
  .add('with-modal', '/:modal', 'index')
  .add('root', '/:modal', 'index') // signup, login, email, verify
  .add('reset-password', '/reset-password/:key', 'index');
