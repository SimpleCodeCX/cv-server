const { DBPWD, DBDATABASE, LOGSTASHURL } = require('./variate');
// 本地开发版
module.exports = {
  mariadb: {
    host: 'localhost',
    user: 'root',
    password: DBPWD,
    database: DBDATABASE
  },
  logstashUrl: LOGSTASHURL
};