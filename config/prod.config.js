const { DBHOST, DBUSER, DBPWD, DBDATABASE, LOGSTASHURL } = require('./variate');
// 正式版
module.exports = {
  mariadb: {
    host: DBHOST,
    user: DBUSER,
    password: DBPWD,
    database: DBDATABASE
  },
  logstashUrl: LOGSTASHURL
};