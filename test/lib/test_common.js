const { common } = require('../../lib');

describe('开始测试 lib/common.js 库', () => {
  it('test strToNumber (number string -> numer)', function () {
    common.strToNumber('123').should.equal(123);
  });

  it('test strToNumber (string 1 -> numer)', function () {
    const result = common.strToNumber('a');
    should(result).equal(null);
  });

  it('test strToNumber (string 2 -> numer)', function () {
    const result = common.strToNumber('a1122');
    should(result).equal(null);
  });

  it('test strToNumber (object -> numer)', function () {
    const result = common.strToNumber({ a: 1 });
    should(result).equal(null);
  });


  it('test strToNumber (array -> numer)', function () {
    const result = common.strToNumber(['111', 1111]);
    should(result).equal(null);
  });

})