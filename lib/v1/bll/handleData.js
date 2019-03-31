function getCount(dbData) {
  if (dbData.error_no) {
    return dbData;
  }
  if (dbData === '') {
    return '';
  }
  return parseInt(dbData[0]['count']);
}

function getFirstRow(dbData) {
  if (dbData.error_no) {
    return dbData;
  }
  if (dbData === '') {
    return '';
  }
  return dbData[0];
}

// 数据库增删改的操作结果
function getCUDResult(result) {
  if (result.error_no) {
    return result;
  }
  return {
    fieldCount: result['fieldCount'],
    affectedRows: result['affectedRows'],
    insertId: result['insertId'],
    serverStatus: result['serverStatus'],
    warningCount: result['warningCount'],
    message: result['message'],
    protocol41: result['protocol41'],
    changedRows: result['changedRows']
  };
}

exports.getCount = getCount;
exports.getFirstRow = getFirstRow;
exports.getCUDResult = getCUDResult;