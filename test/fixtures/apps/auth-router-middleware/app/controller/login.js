'use strict';

module.exports = app => {
  class LoginController extends app.Controller {
    * index() {
      console.log('login userInfo body : ', this.ctx.query.user);
      this.ctx.body = this.ctx.query.user;
    }
  }
  return LoginController;
};
