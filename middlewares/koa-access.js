const isDev = /^dev/.test(process.env.npm_lifecycle_event);
const logger = require('../lib').logger.logstash;

// 获取客户端ip
const REGEX_IPV4 = /\d+\.\d+\.\d+\.\d+$/;
function realip(ctx) {
  return ctx.get('x-real-ip') || (ctx.ip.match(REGEX_IPV4) || [])[0] || 'unknow ip';
}

// 创建16位随机值
// 使用36进制，可以充分利用进制宽度，36进制可以让字符串短一点
function uuid() {
  return [
    (+new Date).toString(36).substr(-6),
    Math.random().toString(36).substr(-10),
  ].join('').toUpperCase();
}

// 打印每次请求的日志
module.exports = function (opts = {}) {
  const cookieid_name = opts.cookieid_name || 'rid'; // cookie id name
  return async function (ctx, next) {
    const start = Date.now();

    // cookieid 每一个用户分配一个cookieId
    let cookieid = ctx.cookies.get(cookieid_name);
    if (!cookieid) {
      ctx.cookies.set(cookieid_name, cookieid = uuid());
    }
    // requestId 每一个请求一个分配一个requestId
    const requestId = uuid();
    // 前部分是用户id，后部分是request id
    const rid = cookieid + '-' + requestId;

    // 为了在别的地方可以通过ctx.rid取到rid cookie + requestId
    ctx.rid = rid;

    await next();
    const headers = ctx.headers || {};
    // 此次请求所花费的时间(ms)
    const cost = Date.now() - start;
    const body = typeof ctx.body === 'string' && ctx.body.length > 200 ?
      'body is too large:' + ctx.body.toString().substr(0, 200) :
      ctx.body;
    isDev ?
      null :
      logger.mark(
        rid,
        realip(ctx),
        cost + 'ms',
        ctx.method,
        ctx.status,
        ctx.url,
        ctx.params,
        headers['user-agent'] || '',
        headers.referer || headers.referrer || '',
        body
      );
  };
};