const Router = require('koa-router')
const router = new Router()
const cheerio = require('cheerio')
const superagent = require('superagent')

const Hall = require('../../models/hall')
const Paipian = require('../../models/paipian')

/**
 * 获取影厅
 */

router.get('/getHall', async ctx => {
  const result = await Hall.find()
  ctx.body = result
})

/**
 * 获取电影
 */
let nm
router.get('/mname', async (ctx, next) => {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('https://movie.douban.com/')
    .end(function (err, sres) {
    // 常规的错误处理
      if (err) {
        return err
      }
      let $ = cheerio.load(sres.text, {
        decodeEntities: false
      })
      nm = []
      $('.ui-slide-item').each(function (idx, element) {
        if (idx <= 15) {
          let $element = $(element)
          // console.log($('img')[idx].attribs.src)
          nm.push({
            value: $element.data().title
          })
        }
      })
    })
  ctx.body = nm
})
/**
 * 新增
 */
router.get('/getmovie', async ctx => {
  const result = await Paipian.find({auto: '0'})
  ctx.body = result
})

router.post('/newmovie', async ctx => {
  const np = new Paipian({
    hall: ctx.request.body.hall,
    mname: ctx.request.body.name,
    ptime: ctx.request.body.time,
    status: '放映中',
    auto: '0'
  })
  await np.save().then(nm => {
    ctx.body = nm
  }).catch(err => {
    console.log(err)
  })
})
/**
 * 删除
 */
router.post('/dele', async ctx => {
  let Id = ctx.request.body.Id
  await Paipian.deleteOne({_id: Id}).then(() => {
    ctx.body = {message: '删除成功'}
  })
})

module.exports = router.routes()
