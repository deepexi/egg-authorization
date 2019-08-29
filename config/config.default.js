'use strict';
/**
 *  Created by Jakcy On 2019-08-12
 */


exports.auth = {
  // 是使用什么认证
  type: 'jwt',
  // jwt配置
  jwt: {
    common: {

    },
    parse: {

    },
    generate: {
      exp: {},
    },
  },
  //
  auth: {

  },
  secret: '123456',
  enableParse: false,
  enableSignature: false,
  // 有效时间
  exp: 3600,
  // 需要解析 token 的位置 ,根据jsonpa
  tokenPos: 'headers.authorization',
  // 解析错误的时候策略 ignore,exception
  strategy: 'ignore',
  // 用户自定义错误
  onerror: {
    returnType: 'json',
    enable: true,
    json(ctx) {
      ctx.body = { msg: 'Unauthorized' };
      ctx.status = 401;
    },
    html(ctx) {
      ctx.body = '<h3>Unauthorized</h3>';
      ctx.status = 410;
    },
  },

};

