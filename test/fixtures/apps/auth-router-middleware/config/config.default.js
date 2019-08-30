'use strict';

exports.auth = {
  enable: true,
  // 是使用什么认证
  type: 'jwt',
  // jwt配置
  jwt: {
    common: {
      enableParse: true,
      enableSignature: false,
      enableOnError: true,
    },
    generate: {
      secret: '123456',
      // 有效时间
      exp: 3600,
    },
    parse: {
      // 需要解析 token 的位置
      tokenPos: 'headers.authorization',
    },
    // 用户自定义错误
    onerror: {
      // 解析错误的时候策略 ignore,exception,returnFormat
      strategy: 'returnFormat',
      returnType: 'json',
      json(ctx) {
        ctx.body = { msg: 'Unauthorized' };
        ctx.status = 401;
      },
      html(ctx) {
        ctx.body = '<h3>Unauthorized</h3>';
        ctx.status = 410;
      },
    },
  }

};

