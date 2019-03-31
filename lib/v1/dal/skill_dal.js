const dbHelper = require('./dbHelper');

// get all skill 
async function getAll() {
  const sqlStr = `select * from skill`;
  return await dbHelper.query(sqlStr, []);
}

// get skill by id
async function getById(skillId) {
  const sqlStr = 'select * from skill where skill_id=?';
  const sqlParams = [skillId];
  return await dbHelper.query(sqlStr, sqlParams);
}

// get skill by skill_value
async function getBySkillValue(skill_value) {
  const sqlStr = 'select * from skill where skill_value=?';
  const sqlParams = [skill_value];
  return await dbHelper.query(sqlStr, sqlParams);
}

// insert skill: skill_value
async function insertSkill(skill_value, description, details) {
  const sqlStr = `insert into skill (skill_value,description,details) values(?,?,?) `;
  const sqlParams = [skill_value, description, details];
  return await dbHelper.insert(sqlStr, sqlParams);
}

// update skill info by skill_id
async function updateById(skill_id, skill_value, description, details) {
  const sqlStr = `update skill 
                  set skill_value=?, description=?, details=?
                  where skill_id=?`;
  const sqlParams = [skill_value, description, details, skill_id];
  return await dbHelper.update(sqlStr, sqlParams);
}

// delete skill by skill_id
async function deleteBySkillId(skill_id) {
  const sqlStr = `delete from skill where skill_id=?`;
  const sqlParams = [skill_id];
  return await dbHelper.delete(sqlStr, sqlParams);
}

exports.getAll = getAll;
exports.getById = getById;
exports.getBySkillValue = getBySkillValue;
exports.insertSkill = insertSkill;
exports.updateById = updateById;
exports.deleteBySkillId = deleteBySkillId;
