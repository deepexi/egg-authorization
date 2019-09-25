'use strict';

const util = require('../../lib/utils');
const _ = require('lodash');
module.exports = options => {

  return async function tokenValid(ctx, next) {


    try {
      if (options === null || !options.enable) {
        await next();
      } else {

        const type = options.type;
        switch (type) {
          case 'jwt': {
            const commonConfig = options.jwt.common;
            const parseConfig = options.jwt.parse;
            // const onerrorConfig = options.onerror;
            const tokenPos = parseConfig.tokenPos || 'headers.authorization';
            let authToken = _.get(ctx.req, tokenPos).split(' ');
            const authType = authToken[0];
            authToken = authToken[1];
            ctx.logger.info(`auth type: ${authType}, token : ${authToken}`);
            if (commonConfig.enableParse) {
              // 根据token的位置
              const result = ctx.auth.decode(authToken);
              if (result === null && commonConfig.enableOnError) {
                // todo 为空根据策略返回
                // 判断返回格式
                util.acceptsResult(ctx, options);
                this.ctx.logger.warn('valid token');
                return;
              }
              if (result) ctx.query.user = result;
            }

            if (commonConfig.enableSignature) {
              ctx.auth.verify(authToken);
            }

            break;
          }
          default : {
            break;
          }
        }
        await next();
      }
    } catch (e) {
      ctx.logger.warn('valid token');

      const commonConfig = options.jwt.common;
      const onerrorConfig = options.jwt.onerror;
      if (!commonConfig.enableOnError || onerrorConfig.strategy === 'ignore') {
        await next();
      }
      // 按照策略处理 ignore、exception
      if (commonConfig.enableOnError && onerrorConfig.strategy === 'returnFormat') {
        // 判断返回格式
        util.acceptsResult(ctx, onerrorConfig);
        return;
      }

      if (commonConfig.enableOnError && onerrorConfig.strategy === 'exception') {
        throw new Error('valid token');
      }
    }
  };
};
