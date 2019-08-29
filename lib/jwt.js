/**
 *  Created by Jakcy On 2019-08-21
 */

'use strict';
const jwt = require('jsonwebtoken');

exports.sign = function(payload, exp, secret) {
  const token = jwt.sign({
    payload,
    exp: Math.floor(Date.now() / 1000) + exp,
  }, secret);
  return token;
};

exports.verify = function(token, secret) {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

exports.decode = function(token) {
  return jwt.decode(token);
};

