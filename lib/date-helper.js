const moment = require('moment');

/**
 * 格式：2019-01-12 19:53:01
 */
function getNowDateString() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

module.exports.getNowDateString = getNowDateString;