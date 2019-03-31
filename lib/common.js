const error = require('./error');

// check params is null or error
function checkParamsIsNullOrError(params) {
  for (const param of params) {
    if (param === '' || param === undefined || param === null || param === []) {
      return true;
    }
    if (Array.prototype.isPrototypeOf(param) && param.length === 0) { return true; }
    if (Object.prototype.isPrototypeOf(param) && Object.keys(param).length === 0) { return true; }
  }
  return false;
}

function apiNormalResponseFormat(_data) {
  return {
    success: true,
    body: _data
  };
}

function apiErrorResponseFormat(_error_no) {
  return {
    success: false,
    error_no: _error_no,
    error_msg: error.getErrorMsg(_error_no)
  };
}

function strToJson(str) {
  let jsonData = [];
  if (str === null || str === undefined || str === 'null' || str === '') {
    return jsonData;
  }
  try {
    jsonData = JSON.parse(str);
  }
  catch (e) {
    jsonData = [];
  }
  return jsonData;
}

function strToNumber(str) {
  if (Object.prototype.toString.call(str) === '[object Number]') {
    return str;
  }
  if (!/^\d+$/.test(str)) {
    return null;
  }
  return parseInt(str);
}

/**
 * 生成指定区间的随机整数
 * 比如生成[0,100]的闭区间随机整数，randomN(0,100)
 */
function randomN(n, m) {
  const random = Math.floor(Math.random() * (m - n + 1) + n);
  return random;
}

exports.checkParamsIsNullOrError = checkParamsIsNullOrError;
exports.apiNormalResponseFormat = apiNormalResponseFormat;
exports.apiErrorResponseFormat = apiErrorResponseFormat;
exports.strToJson = strToJson;
exports.strToNumber = strToNumber;
exports.randomN = randomN;