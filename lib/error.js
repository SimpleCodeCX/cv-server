const errMap = new Map([
  [-1, '系统繁忙，此时请开发者稍候再试'],
  [40001, '数据库出错'],
  [40002, '参数错误'],
  [40003, 'accessToken过期'],
  [40004, 'accessToken无效'],
  [40005, '没有权限'],
  [40006, '更新失败'],
  [40007, '添加失败'],
  [40008, '删除失败'],
  [60001, '该skillValue已经存在,操作失败'],
  [100000, '未知错误']
]);

function getErrorMsg(errcode) {
  errMap.get(errcode);
  return errMap.get(errcode) ? errMap.get(errcode) : errMap.get(-1);
}

exports.getErrorMsg = getErrorMsg;
