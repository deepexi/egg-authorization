'use strict';

module.exports = app => {
  // const jwt = app.middlewares.jwt(app.config.jwt);
  app.get('/test', app.controller.test.index);
  app.get('/login', app.controller.login.index);
  app.get('/testVerify', app.controller.test.testVerify);
  app.get('/500', app.controller.error.index);
};
