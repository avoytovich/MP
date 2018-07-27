const routes = require('next-routes');

// Restart server after
// Name   Page      Pattern
module.exports = routes()
  .add('about-with-id', '/about/:id', 'about')
  .add('about', '/about', 'about')
  .add('shoper', '/shoper', 'shoper')
  .add('profashional', '/profashional/:id', 'profashional')
  .add(
    'profashionalEditProfile',
    '/profashional/:id/edit-profile',
    'profashional/edit-profile',
  )
  .add('with-modal', '/:modal', 'index')
  .add('root', '/:modal', 'index') // signup, login, email, verify
  .add('reset-password', '/reset-password/:key', 'index')
  .add('privateInfo', '/private-info/:id', 'profashional/private-info')
  .add('activate', '/activate/:code', 'activate');
