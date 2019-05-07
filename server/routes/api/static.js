const Router = require('koa-router')
const router = new Router()

const Movie = require('../../models/movie')
// const Sell = require('../../models/sell')
const Paipian = require('../../models/paipian')

router.post('/postsell', async ctx => {
  const result = await Paipian.find({auto: '0'})
  if (result.length > 0) {
    ctx.body = {
      status: 0
    }
  }
})

router.get('/postMovie', async ctx => {
  const param = ctx.request.query // 对象
  const table = [{
    $group: {
      _id: '$mname',
      paipian: {$sum: '$paipian'},
      alipay: {$sum: '$alipay'},
      maoyan: {$sum: '$maoyan'},
      offline: {$sum: '$offline'},
      active: {$sum: '$active'}
    }
  }]
  let result
  if (param.area === 'all') {
    result = await Movie.aggregate(table)
  }
  ctx.body = result
})

module.exports = router.routes()
