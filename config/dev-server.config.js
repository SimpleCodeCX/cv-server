const { DBHOST, DBUSER, DBPWD, DBDATABASE, LOGSTASHURL } = require('./variate');
// 服务器开发版
module.exports = {
  mariadb: {
    host: DBHOST,
    user: DBUSER,
    password: DBPWD,
    database: DBDATABASE
  },
  logstashUrl: LOGSTASHURL
};