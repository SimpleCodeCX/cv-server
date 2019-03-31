const router = require('koa-router')();
const { skillCtl } = require('../../../../controller');
router.prefix('/skill');

/**
 * GET: Get all skill list
 * api: .../skill
 * request params: null
 */
router.get('/', skillCtl.getAll);

/**
 * GET: Get skill by skillId
 * api: .../skill/{id}
 * request params: 
 *         id: 1
 */
router.get('/:id', skillCtl.getBySkillId);

/**
 * POST: add skill
 * api: .../skill
 * request params: null
 * request body:
 *         {
 *           skillValue: 'Node/Koa2',
 *           description: '...'
 *           details: '...;;...'
 *         };
 */
// 由于没有做登录认证，为了安全考虑，上线的时候，把增、删、改的接口屏蔽哈哈
router.post('/', skillCtl.postSkill);

/**
 * POST: update skill by skillID
 * api: .../skill
 * request params: null
 * request body:
 *         {
 *           skillId: 1,
 *           skillValue: 'Node/Koa2'
 *         };
 */
// 由于没有做登录认证，为了安全考虑，上线的时候，把增、删、改的接口屏蔽哈哈
router.put('/:id', skillCtl.putSkill);

/**
 * DELETE: delete skill by skillId 
 * api: .../skill/{id}
 * request params:
 *         id: 1
 */
// 由于没有做登录认证，为了安全考虑，上线的时候，把增、删、改的接口屏蔽哈哈
router.delete('/:id', skillCtl.deleteBySkillId);
module.exports = router;
