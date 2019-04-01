const { skillDal } = require('../dal');
const handleData = require('./handleData');
const { SkillModel } = require('../model');

// get all skill 
async function getAll() {
  return await skillDal.getAll();
}

// get skill by id
async function getById(skillId) {
  const dbData = await skillDal.getById(skillId);
  return handleData.getFirstRow(dbData);
}

// get skill by skill_value
async function getBySkillValue(skill_value) {
  const dbData = await skillDal.getBySkillValue(skill_value);
  return handleData.getFirstRow(dbData);
}

// insert skill_value
async function insertSkill(skillValue, description, details) {
  const result = await skillDal.insertSkill(skillValue, description, details);
  return handleData.getCUDResult(result);
}

// update skill info by skillId
async function updateById(skillId, skillValue, description, details) {
  const result = await skillDal.updateById(skillId, skillValue, description, details);
  return handleData.getCUDResult(result);
}

// delete skill by skillId
async function deleteBySkillId(skillId) {
  const result = await skillDal.deleteBySkillId(skillId);
  return handleData.getCUDResult(result);
}

// format skill 
function formatSkillDb(skillDb) {
  if (skillDb === '') {
    return '';
  }
  const skill = new SkillModel();
  skill.skillId = skillDb['skill_id'];
  skill.skillValue = skillDb['skill_value'];
  skill.description = skillDb['description'];
  skill.details = skillDb['details'];
  return skill;
}

// format skill list
function formatSkillDbList(skillDbList) {
  if (skillDbList === '') {
    return [];
  }
  const skillDataList = [];
  for (let i = 0; i < skillDbList.length; i++) {
    const skill = this.formatSkillDb(skillDbList[i]);
    skillDataList.push(skill);
  }
  return skillDataList;
}

module.exports = exports = {
  getAll,
  getById,
  getBySkillValue,
  insertSkill,
  updateById,
  deleteBySkillId,
  formatSkillDb,
  formatSkillDbList
}

