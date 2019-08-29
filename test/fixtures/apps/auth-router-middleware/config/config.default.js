'use strict';

exports.auth = {
  enable: true,
  type: 'jwt',
  secret: 'XnMib79vzwP01gtr',
  enableParse: true,
  enableSignature: false,
  // match和ignore不能同时使用
  match: [ '/login' ],
  onerror: {
    type: 'json',
    enable: true,
  },
};

