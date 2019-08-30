# egg-jwt

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
![npm](https://img.shields.io/npm/dw/@jackyhweng/egg-jwt)

[npm-image]: https://img.shields.io/npm/v/egg-jwt2.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/egg-jwt2
[travis-image]: https://img.shields.io/travis/deepexi/egg-jwt2.svg?style=flat-square
[travis-url]: https://travis-ci.org/deepexi/egg-jwt2
[codecov-image]: https://img.shields.io/codecov/c/gh/deepexi/egg-jwt2.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/deepexi/egg-jwt2
[download-image]: https://img.shields.io/npm/dw/@jackyhweng/egg-jwt
[download-url]: https://www.npmjs.com/package/@jackyhweng/egg-jwt



Deepexi Egg's JWT(JSON Web Token Authentication Plugin)

## Install

```bash
$ npm i egg-authorization --save

```


## Usage

```js
// {app_root}/config/plugin.js
exports.auth = {
  enable: true,
  package: "egg-authorization"
};
```

## Configuration

```js
// {app_root}/config/config.default.js
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

```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```javascript
// app/router.js
"use strict";

module.exports = app => {
  app.get('/login',app.controller.login.index);
};
```


```js
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


```

you can use this way to get the token context 

```js

// app/controller/test.js
("use strict");

module.exports = app => {
  class SuccessController extends app.Controller {
    index() {
        // get the token 
        const authorization = this.ctx.headers.authorization;
        const data = this.ctx.auth.decode(authorization);
        console.log(data);
        this.ctx.body = data;
    }
  }
  return SuccessController;
};
```


## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
