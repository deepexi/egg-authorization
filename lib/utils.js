/**
 *  Created by Jakcy On 2019-08-21
 */
'use strict';

exports.acceptsResult = function(ctx, options) {

  if (options.onerror.returnType) {
    switch (options.onerror.returnType) {
      case 'json': {
        options.onerror.json(ctx);
        break;
      }
      case 'html': {
        options.onerror.html(ctx);
        break;
      }
      default : {
        throw new Error('error type is valid!');
      }
    }
  } else {
    // 没有设置返回的错误类型，要根据请求的方法来
    if (ctx.get('x-requested-with') === 'XMLHttpRequest' ||
      ctx.headers.get('Content-Type') === 'application/json') {
      options.onerror.json(ctx);
      return;
    }
    options.onerror.html(ctx);
    return;

  }
};

