const { MARIADBPWD } = require('./variate');
// 本地开发版
module.exports = {
  mariadb: {
    host: 'localhost',
    user: 'root',
    password: MARIADBPWD,
    database: 'blog'
  }
}