const { common } = require('../lib');
const { skillBll } = require('../lib/v1/bll');

// get all skill list
async function getAll(ctx) {
  const results = await skillBll.getAll();
  if (results.error_no) {
    return ctx.body = results;
  }
  ctx.body = common.apiNormalResponseFormat(skillBll.formatSkillDbList(results));
}

// get skill by skillId
async function getBySkillId(ctx) {
  // get params
  const skillId = ctx.params.id;
  const params = [skillId];
  // check params is null or error
  if (common.checkParamsIsNullOrError(params)) {
    return ctx.body = common.apiErrorResponseFormat(40002);
  }
  // get data
  const result = await skillBll.getById(skillId);
  if (result.error_no) {
    return ctx.body = result;
  }
  // response data
  return ctx.body = common.apiNormalResponseFormat(skillBll.formatSkillDb(result));
}

// insert skill info
async function postSkill(ctx) {
  // get params
  const skillValue = ctx.request.body.skillValue;
  const description = ctx.request.body.description;
  const params = [skillValue, description];
  // check params is null or error
  if (common.checkParamsIsNullOrError(params)) {
    return ctx.body = common.apiErrorResponseFormat(40002);
  }
  // check skillValue is exist
  const queryResults = await skillBll.getBySkillValue(skillValue);
  if (queryResults.error_no) {
    return ctx.body = queryResults;
  }
  if (queryResults !== '') {
    return ctx.body = common.apiErrorResponseFormat(60001);
  }
  // insert data
  const insertResult = await skillBll.insertSkill(skillValue, description);
  if (insertResult.error_no) {
    return ctx.body = insertResult;
  }
  if (insertResult.affectedRows !== 1) {
    return ctx.body = common.apiErrorResponseFormat(40007);
  }

  // response data
  const getResult = await skillBll.getById(insertResult.insertId);
  if (getResult.error_no) {
    return ctx.body = getResult;
  }
  return ctx.body = common.apiNormalResponseFormat(skillBll.formatSkillDb(getResult));
}

// update skill info by skillId
async function putSkill(ctx) {
  // get params
  const skillId = ctx.params.id;
  const skillValue = ctx.request.body.skillValue;
  const description = ctx.request.body.description;
  // check params is null or error
  const params = [skillId, skillValue];
  if (common.checkParamsIsNullOrError(params)) {
    return ctx.body = common.apiErrorResponseFormat(40002);
  }
  // check skillValue is exist
  const queryResults = await skillBll.getBySkillValue(skillValue);
  if (queryResults.error_no) {
    return ctx.body = queryResults;
  }
  if (queryResults !== '') {
    return ctx.body = common.apiErrorResponseFormat(60001);
  }
  // update skill info
  const updateResult = await skillBll.updateById(skillId, skillValue, description);
  if (updateResult.error_no) {
    return ctx.body = updateResult;
  }
  if (updateResult.affectedRows !== 1) {
    return ctx.body = common.apiErrorResponseFormat(40006);
  }
  // response data
  return ctx.body = common.apiNormalResponseFormat({ isUpdateSuccess: true });

}

// delete skill info by skillId
async function deleteBySkillId(ctx) {
  // get params
  const skillId = ctx.params.id;
  const params = [skillId];
  if (common.checkParamsIsNullOrError(params)) {
    return ctx.body = common.apiErrorResponseFormat(40002);
  }
  // delete data
  const deleteResults = await skillBll.deleteBySkillId(skillId);
  if (deleteResults.error_no) {
    return ctx.body = deleteResults;
  }
  if (deleteResults.affectedRows !== 1) {
    return ctx.body = common.apiErrorResponseFormat(40008);
  }
  // response data
  return ctx.body = common.apiNormalResponseFormat({ isDeleteSuccess: true });
}

module.exports = exports = {
  getAll,
  getBySkillId,
  postSkill,
  putSkill,
  deleteBySkillId
}
