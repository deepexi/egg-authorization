'use strict';

module.exports = app => {
  class ErrorController extends app.Controller {
    async index() {
      console.log('========= error');
      return {
        message: 'error',
        code: 500,
      };
    }
  }
  return ErrorController;
};
