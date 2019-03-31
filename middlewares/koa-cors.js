const URL = require('url');

// 允许跨域访问
// curl -i http://localhost:3000/test
module.exports = async function (ctx, next) {
  const origin = URL.parse(ctx.get('origin') || ctx.get('referer') || '');
  if (origin.protocol && origin.host) {
    ctx.set('Access-Control-Allow-Origin', `${origin.protocol}//${origin.host}`);
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With, User-Agent, Referer, Content-Type, Cache-Control,accesstoken');
    ctx.set('Access-Control-Allow-Credentials', 'true');
  }
  if (ctx.method !== 'OPTIONS') {
    await next();
  } else {
    ctx.body = '';
  }
};