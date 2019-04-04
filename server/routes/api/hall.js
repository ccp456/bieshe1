const Router = require('koa-router')
const router = new Router()

const Hall = require('../../models/hall')

/**
 * @route Post api/hall/gethall
 * @desc  获取
 * @access
 */
router.get('/gethall', async ctx => {
  const result = await Hall.find()
  ctx.body = result
})

/**
 * @route Post api/hall/newhall
 * @desc  添加
 * @access
 */
router.post('/newhall', async ctx => {
  const num = await Hall.countDocuments()
  let hid = 1
  for (let i = 0; i < num; i++) {
    const check = await Hall.find({_id: hid})
    if (check.length >= 1) hid += 1
  }
  const newhall = new Hall({
    _id: hid,
    name: ctx.request.body.name,
    seat: ctx.request.body.seat,
    createtime: Date()
  })
  await newhall.save().then(hall => {
    ctx.body = hall
  }).catch((err) => {
    console.log(err)
  })
})

/**
 * @route Post api/hall/delhall
 * @desc  删除
 * @access
 */
router.post('/delhall', async ctx => {
  let Id = ctx.request.body.Id
  await Hall.deleteOne({_id: Id}).then(() => {
    ctx.body = {message: '删除成功'}
  }).catch(err => {
    console.log(err)
  })
})

module.exports = router.routes()
