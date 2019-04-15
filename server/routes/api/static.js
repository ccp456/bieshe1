const Router = require('koa-router')
const router = new Router()

const Sell = require('../../models/sell')

router.post('/postsell', async ctx => {
  console.log(ctx.request.body)
  if (ctx.request.body.area === '所有') {
    let result0 = ['movie']
    const mname = await Sell.aggregate([{$group: {_id: '$mname'}}])
    const area = await Sell.aggregate([{$group: {_id: '$area'}}])
    for (var i = 1; i < mname.length; i++) {
      result0.push(mname[i]._id)
    }
    for (i = 1; i < mname.length; i++) {
    }
    console.log(area)
  }
})

module.exports = router.routes()
