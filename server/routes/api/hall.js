const Router = require('koa-router')
const router = new Router()

const Hall = require('../../models/hall')
const Cinema = require('../../models/cinema')
/**
 * 影院
 */
router.get('/getcinema', async ctx => {
  const result = await Cinema.find()
  ctx.body = result
})
router.post('/postnewcinema', async ctx => {
  const num = await Cinema.countDocuments()
  let hid = 1
  for (let i = 0; i < num; i++) {
    const check = await Cinema.find({id: hid})
    if (check.length >= 1) hid += 1
  }
  console.log(ctx.request.body)
  const newCinema = new Cinema({
    id: hid,
    cinema: ctx.request.body.cinema,
    province: ctx.request.body.province,
    city: ctx.request.body.city,
    address: ctx.request.body.address,
    area: ctx.request.body.area
  })
  await newCinema.save().then(hall => {
    ctx.body = hall
  }).catch((err) => {
    console.log(err)
  })
})

router.post('/delcinema', async ctx => {
  let id = ctx.request.body.id
  await Cinema.deleteOne({id: id}).then(() => {
    ctx.body = {message: '删除成功'}
  }).catch(err => {
    console.log(err)
  })
})
/**
 * @route Post api/hall/newhall
 * @desc  影厅
 * @access
 */
router.post('/posthall', async ctx => {
  let id = ctx.request.body.id
  const result = await Hall.find({belong: id})
  ctx.body = result
})

router.post('/newhall', async ctx => {
  const newhall = new Hall({
    cid: ctx.request.body.id,
    name: ctx.request.body.name,
    seat: ctx.request.body.seat
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
