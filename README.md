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
$ npm i @jackyhweng/egg-jwt --save
```


## Usage

```js
// {app_root}/config/plugin.js
exports.jwt = {
  enable: true,
  package: "@jackyhweng/egg-jwt"
};
```

## Configuration

```js
// {app_root}/config/config.default.js
'use strict';
exports.jwt = {
  enable: true,
  // match和ignore不能同时使用
  match: ['/*']
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```javascript
// app/router.js
"use strict";

module.exports = app => {
  app.get('/test',app.controller.test.index);
};
```

```js
// app/controller/test.js
("use strict");

module.exports = app => {
  class SuccessController extends app.Controller {
    index() {
         console.log('query body : ', this.ctx.query);
         this.ctx.body = this.ctx.query;
    }
  }
  return SuccessController;
};
```


## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
