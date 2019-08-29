'use strict';

module.exports = app => {
  class TestController extends app.Controller {
    async index() {
      console.log('test query body : ', this.ctx.query);
      this.ctx.body = this.ctx.query;
      const data = this.ctx.auth.sign('a');
      console.log(data);
      const origin = this.ctx.auth.verify(data);
      console.log(origin.payload);
    }

    async testVerify() {
      const authorization = this.ctx.headers.authorization;
      const data = this.ctx.auth.decode(authorization);
      console.log(data);
      this.ctx.body = data;
    }
  }
  return TestController;
};
