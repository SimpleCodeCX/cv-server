const router = require('koa-router')();

const blog = require('./v1/blog');

router.prefix('/v1');

router.use(blog.routes(), blog.allowedMethods());

router.get('/', function (ctx) {
  ctx.body = 'api/v1';
});

router.get('/errorTest', function () {
  throw (new Error('11111'));
});

module.exports = router;
