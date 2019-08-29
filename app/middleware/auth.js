'use strict';

const util = require('../../lib/utils');
const _ = require('lodash');
module.exports = options => {

  return async function tokenValid(ctx, next) {
    try {
      if (options === null || !options.enable) {
        await next();
      } else {

        const enableSignature = options.enableSignature;
        const enableParse = options.enableParse;

        // 根据token的位置
        const tokenPos = options.tokenPos || 'headers.authorization';
        const authToken = _.get(ctx.req, tokenPos);
        // const authToken = ctx.header.authorization;

        if (typeof authToken === 'undefined') {
          console.log('throw exception');
        }

        // const isWhiteUrl = whiteUrls.some(whiteUrl => ctx.url.startsWith(whiteUrl));
        if (enableSignature) {
          ctx.auth.verify(authToken);
        }

        if (enableParse) {
          // TODO 解析可以配置多种方式
          const result = ctx.auth.decode(authToken);
          if (result === null && options.onerror.enable) {
            // todo 为空根据策略返回
            // 判断返回格式
            util.acceptsResult(ctx, options);
            this.ctx.logger.warn('valid token');
            return;
          }
          if (result) ctx.query.user = result;
        }

        // todo
        // console.log('decode token: ', ctx.auth.decode(authToken));
        await next();
      }
    } catch (e) {
      if (options.strategy === 'ignore') {
        console.log('ignore');
      }
      // 按照策略处理 ignore、exception
      if (options.onerror.enable) {
        // 判断返回格式
        util.acceptsResult(ctx, options);
        return;
      }
      this.ctx.logger.warn('valid token');
    }
  };
};
