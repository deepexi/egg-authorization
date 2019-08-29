'use strict';

module.exports = app => {
  class LoginController extends app.Controller {
    * index() {
      console.log('login query body : ', this.ctx.query.user);
      this.ctx.body = this.ctx.query;
    }
  }
  return LoginController;
};
