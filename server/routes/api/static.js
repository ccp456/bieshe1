const Router = require('koa-router')
const router = new Router()

const Sell = require('../../models/sell')
const Paipian = require('../../models/paipian')

router.post('/postsell', async ctx => {
  const result = await Paipian.find({auto: '0'})
  if (result.length > 0) {
    ctx.body = {
      status: 0
    }
  }
})

module.exports = router.routes()
