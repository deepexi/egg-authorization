'use strict';

exports.auth = {
  enable: true,
  // 是使用什么认证
  type: 'jwt',
  // jwt配置
  jwt: {
    common: {
      // 是否开启解析
      enableParse: true,
      // 是否开启验签
      enableSignature: false,
      // 是否开启错误处理
      enableOnError: true,
    },
    generate: {
      // 生成秘钥
      secret: '123456',
      // 有效时间
      exp: 3600,
    },
    parse: {
      // 需要解析 token 的位置
      tokenPos: 'headers.authorization',
      // 解析秘钥
      secret: '123456',
    },
    // 用户自定义错误
    onerror: {
      // 解析错误的时候策略
      // ignore 忽略错误
      // exception 抛异常
      // returnFormat 返回自定义的格式
      strategy: 'returnFormat',
      // 返回数据的格式，目前支持json 和 html
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
  },

};


