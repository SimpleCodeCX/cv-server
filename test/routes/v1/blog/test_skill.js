const supertest = require('supertest')
const {
  HOST
} = require('../../../config/test.config');
const { SkillModel } = require('./model');
const request = supertest(HOST)

describe('开始测试 skill 接口', () => {
  const skillModel = new SkillModel();
  skillModel.skillValue = 'skillValue1';
  skillModel.description = 'description1';
  skillModel.details = 'details1';
  before((done) => {
    done()
  });

  it('test api: (post) /skill (添加skill)', function (done) {
    const skillData = {
      skillValue: skillModel.skillValue,
      description: skillModel.description,
      details: skillModel.details
    };
    request.post('/api/v1/blog/skill')
      .expect(200)
      .send(skillData)
      .end((err, res) => {
        const responseData = JSON.parse(res.text);
        responseData.success.should.equal(true);
        skillModel.skillId = responseData.body.skillId;
        skillModel.skillId.should.be.ok();
        const keys = Object.keys(skillModel);
        responseData.body.should.have.keys(...keys);
        done();
      })
  });

  it('test api: (post) /skill (添加重复的skill,添加失败)', function (done) {
    const skillData = {
      skillValue: skillModel.skillValue,
      description: skillModel.description,
      details: skillModel.details
    };
    request.post('/api/v1/blog/skill')
      .expect(200)
      .send(skillData)
      .end((err, res) => {
        const responseData = JSON.parse(res.text);
        responseData.success.should.equal(false);
        responseData.error_no.should.equal(60001);
        done();
      })
  });

  it('test api: (post) /skill (添加skill,没有传参数,添加失败)', function (done) {
    request.post('/api/v1/blog/skill')
      .expect(200)
      .end((err, res) => {
        const responseData = JSON.parse(res.text);
        responseData.success.should.equal(false);
        responseData.error_no.should.equal(40002)
        done();
      })
  });

  it('test api: (get) /skill (查询所有的skill)', function (done) {
    request.get('/api/v1/blog/skill')
      .expect(200)
      .end((err, res) => {
        const responseData = JSON.parse(res.text);
        responseData.success.should.equal(true);
        responseData.body.forEach(item => {
          if (item.skillId === skillModel.skillId) {
            done();
          }
        });
        const keys = Object.keys(skillModel);
        responseData.body[0].should.have.keys(...keys);
      })
  });

  it('test api: (get) /skill (查询id为skillId的skill)', function (done) {
    request.get(`/api/v1/blog/skill/${skillModel.skillId}`)
      .expect(200)
      .end((err, res) => {
        const responseData = JSON.parse(res.text);
        responseData.success.should.equal(true);
        responseData.body.skillId.should.equal(skillModel.skillId);
        responseData.body.skillValue.should.equal(skillModel.skillValue);
        done();
      })
  });

  it('test api: (get) /skill (查询skillId不存在的skill,为空)', function (done) {
    request.get(`/api/v1/blog/skill/noExist`)
      .expect(200)
      .end((err, res) => {
        const responseData = JSON.parse(res.text);
        responseData.success.should.equal(true);
        responseData.body.should.equal('');
        done();
      })
  });

  it('test api: (put) /skill (根据skillId修改skill信息,没有传参数,修改失败)', function (done) {
    request.put(`/api/v1/blog/skill/${skillModel.skillId}`)
      .expect(200)
      .end((err, res) => {
        const responseData = JSON.parse(res.text);
        responseData.success.should.equal(false);
        responseData.error_no.should.equal(40002)
        done();
      })
  });

  it('test api: (put) /skill (根据skillId修改skill信息,skillValue已经存在,修改失败)', function (done) {
    const skillData = {
      skillValue: skillModel.skillValue,
      description: skillModel.description,
      details: skillModel.details
    };
    request.put(`/api/v1/blog/skill/${skillModel.skillId}`)
      .expect(200)
      .send(skillData)
      .end((err, res) => {
        const responseData = JSON.parse(res.text);
        responseData.success.should.equal(false);
        responseData.error_no.should.equal(60001)
        done();
      })
  });

  it('test api: (put) /skill (根据skillId修改skill信息)', function (done) {
    const params = {
      skillValue: 'skillValue2',
      description: 'description2',
      details: 'details2'
    };
    request.put(`/api/v1/blog/skill/${skillModel.skillId}`)
      .expect(200)
      .send(params)
      .end((err, res) => {
        const responseData = JSON.parse(res.text);
        responseData.success.should.equal(true);
        responseData.body.isUpdateSuccess.should.equal(true)
        done();
      })
  });

  it('test api: (delete) /skill/{id} (删除skillId的skill)', function (done) {
    request.delete(`/api/v1/blog/skill/${skillModel.skillId}`)
      .expect(200)
      .end((err, res) => {
        const responseData = JSON.parse(res.text);
        responseData.success.should.equal(true);
        responseData.body.isDeleteSuccess.should.equal(true)
        done();
      })
  });

  it('test api: (delete) /skill/{id} (删除skillId不存在的skill,删除失败)', function (done) {
    request.delete(`/api/v1/blog/skill/${skillModel.skillId}`)
      .expect(200)
      .end((err, res) => {
        const responseData = JSON.parse(res.text);
        responseData.success.should.equal(false);
        responseData.error_no.should.equal(40008)
        done();
      })
  });

})