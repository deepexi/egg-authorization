/**
 *  Created by Jakcy On 2019-08-20
 *
 */

'use strict';

const { AUTH } = require('../../lib/private_key');
const jwtUtil = require('../../lib/jwt');

class Auth {
  constructor(app) {
    this.app = app;
    this.config = this.app.config.auth;
    if (this.app.config.auth.type === 'jwt') {
      this.auth = jwtUtil;
    }
  }

  sign(payload) {

    const token = this.auth.sign(
      payload,
      Math.floor(Date.now() / 1000) + this.config.exp,
      this.config.secret);
    return token;
  }

  verify(token) {
    return this.auth.verify(
      token,
      this.config.secret
    );
  }

  decode(token) {
    return this.auth.decode(token);
  }

}

module.exports = {
  get auth() {
    this[AUTH] = new Auth(this.app);
    return this[AUTH];
  },
};
