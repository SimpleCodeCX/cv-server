const router = require('koa-router')();
const {
  skill
} = require('./blog/index');

router.prefix('/blog');

router.get('/', function (ctx) {
  // ctx.res.writeHead(302, { 'Location': 'https://www.baidu.com' });
  ctx.body = 'api/v1/blog';
});

router.use(skill.routes(), skill.allowedMethods());

module.exports = router;
