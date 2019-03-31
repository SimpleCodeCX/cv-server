const { GLOBAL_CONFIG } = require('../../../config/system.config');

exports.getMariadbConf = () => {
  return {
    host: GLOBAL_CONFIG.mariadb.host,
    user: GLOBAL_CONFIG.mariadb.user,
    password: GLOBAL_CONFIG.mariadb.password,
    database: GLOBAL_CONFIG.mariadb.database,
    dateStrings: true
  };
}