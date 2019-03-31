const { MARIADBPWD } = require('./variate');
// 正式版
module.exports = {
  mariadb: {
    host: '148.70.160.165',
    user: 'admin',
    password: MARIADBPWD,
    database: 'blog'
  }
}