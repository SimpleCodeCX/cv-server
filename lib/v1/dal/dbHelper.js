const mysql = require('mysql');
const mariadb = require('./mariadb.conf');
const logger = require('../../logger')();
const { common } = require('../..');

const dbConnectionString = mariadb.getMariadbConf();
let db = null;
let pingInterval;
function handleError(err) {
  logger.info(err.stack || err);
  connect();
}

function connect() {
  if (db !== null) {
    db.destroy();
    db = null;
  }

  db = mysql.createConnection(dbConnectionString);
  db.connect(function (err) {
    if (err) {
      logger.info('error when connecting to db,reConnecting after 2 seconds:', err);
      setTimeout(connect, 2000);
    }
  });
  db.on('error', handleError);

  // ping db each hour, to keep alive
  clearInterval(pingInterval);
  pingInterval = setInterval(() => {
    logger.info('ping...');
    db.ping((err) => {
      if (err) {
        logger.info('ping error: ' + JSON.stringify(err));
      }
    });
  }, 3600000);
}

connect();

// execute the sql.
function exeScript(sqlType, sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, function (error, results) {
      if (error) {
        logger.info(sqlType + '：' + error);
        // db.rollback(function () {
        //     reject(error);
        // });
        reject(error);
      }
      // reject("error");
      resolve(results);
    });
  });
}

async function callExeScript(sqlType, sql, params) {
  let result;
  try {
    result = await exeScript(sqlType, sql, params);
  }
  catch (err) {
    return common.apiErrorResponseFormat(40001);
  }
  return result;
}

async function query(sql, params) {
  const result = await callExeScript('query', sql, params);
  if (result.error_no) {
    return result;
  }
  if (result.length >= 1) {
    return result;
  } else {
    // 这里等于空时，不直接返回error的数据结构，因为等于空时不一定代表错误，因此为空的错误逻辑交给调用者进行处理
    return '';
  }
}

async function insert(sql, params) {
  const result = await callExeScript('insert', sql, params);
  if (result.error_no) {
    return result;
  }
  return result;
}

async function update(sql, params) {
  const result = await callExeScript('update', sql, params);
  if (result.error_no) {
    return result;
  }
  return result;
}

//这里delete估计是关键，所以采用delete1
async function delete1(sql, params) {
  const result = await callExeScript('delete', sql, params);
  if (result.error_no) {
    return result;
  }
  return result;
}

module.exports = exports = {
  query,
  insert,
  update,
  delete: delete1
};