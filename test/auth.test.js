'use strict';

const mm = require('egg-mock');
const jwt = require('jsonwebtoken');
// const assert = require('assert');

describe('test/auth.test.js', () => {
  let app;

  afterEach(mm.restore);

  [ 'auth-router-middleware' ].forEach(name => {
    describe(name, () => {
      before(async () => {
        app = mm.app({
          baseDir: `apps/${name}`,
          plugin: true,
          cache: false,
        });
        await app.ready();
      });

      after(() => app.close());

      const token2 = jwt.sign({ foo: 'bar' }, 'shhhhh');
      console.log('token: ', token2);
      const decoded = jwt.verify(token2, 'shhhhh');
      console.log(decoded.foo); // bar

      const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiJmOTdhM2JmY2ZlN2I0NWNmYjQ5YmE4MzRjODZhOGU0ZiIsImlzcyI6IndCN3Z4QTd5WmlWZno0NzAySDVXUVZpSUxMeEVUSDI5IiwidGVuYW50SWQiOiI0ZTA4Njc5MTIxMjY0OWQ3OWYzMGVjMDUyNzU5OWFlZSIsImNoYW5uZWwiOiJwYyIsImV4cCI6MTU2NTc4MzU3NSwidXNlcklkIjoiM2Q1OGM2ZDAxYjcyNGY1NmFjMjdhNTQ1YjhhNDJiMjUiLCJpYXQiOjE1NjU3NzYzNzV9.B8-CFGOUNy5i8Ucz5SmZQoh7SxZt5O1T_BSpqPUx44Y';

      it('should be ok test', async () => {
        await app
          .httpRequest()
          .get('/login')
          .set('Authorization', token)
          .expect(200);
      });


      it('should be throw 401', async () => {
        await app
          .httpRequest()
          .get('/login')
          .set('Authorization', 'Bearer token')
          .expect({ msg: 'Unauthorized' })
          .expect(401);
      });


      // it('test ctx decode token', async () => {
      //   await app
      //     .httpRequest()
      //     .get('/testVerify')
      //     .set('Authorization', token)
      //     .expect({
      //       accountId: 'f97a3bfcfe7b45cfb49ba834c86a8e4f',
      //       iss: 'wB7vxA7yZiVfz4702H5WQViILLxETH29',
      //       tenantId: '4e086791212649d79f30ec0527599aee',
      //       channel: 'pc',
      //       exp: 1565783575,
      //       userId: '3d58c6d01b724f56ac27a545b8a42b25',
      //       iat: 1565776375,
      //     })
      //     .expect(200);
      // });
      //
      // it('should be throw token error', async () => {
      //   await app
      //     .httpRequest()
      //     .get('/login')
      //     .set('Authorization', 'error token')
      //     .expect(402);
      // });
      //
      // it('should be throw token empty', async () => {
      //   await app
      //     .httpRequest()
      //     .get('/login')
      //     .expect(401);
      // });

      // it('should throw 401 if token is empty! ', async () => {
      //   await app
      //     .httpRequest()
      //     .get('/test')
      //     .expect(402);
      // });

    });
  });
});
