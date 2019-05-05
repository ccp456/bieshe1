const Router = require('koa-router')
const router = new Router()
const cheerio = require('cheerio')
const superagent = require('superagent')

const Cinema = require('../../models/cinema')
const Movie = require('../../models/movie')
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
  const result = await Paipian
    .find({auto: '0'})
    .sort({ptime: -1})
  ctx.body = result
})

router.post('/newmovie', async ctx => {
  const check = await Paipian.find({
    hall: ctx.request.body.hall,
    ptime: {$gt: ctx.request.body.time - 2 * 60 * 60000, $lt: ctx.request.body.time + 2 * 60 * 60000}
  })
  console.log(check)
  console.log(check)
  if (check.length > 0) {
    ctx.body = '该时间段已有电影播放'
  } else {
    const ccheck = await Cinema.find({
      cinema: ctx.request.body.cinema
    })
    let cinema = ccheck[0]
    const mcheck = await Movie.find({
      mname: ctx.request.body.name,
      city: cinema.city
    })
    console.log(mcheck)
    if (mcheck.length > 0) {
      Movie.updateOne(
        {_id: mcheck[0]._id},
        {$set: {
          paipian: mcheck[0].paipian + 1,
          update: new Date()
        }},
        err => {
          if (err) console.log(err)
        }
      )
    } else {
      let newmovie = new Movie({
        mname: ctx.request.body.name,
        area: cinema.area,
        province: cinema.province,
        city: cinema.city,
        alipay: 0,
        maoyan: 0,
        active: 0,
        offline: 0,
        paipian: 1,
        update: new Date()
      })
      await newmovie.save()
    }
    const np = new Paipian({
      hall: ctx.request.body.hall,
      mname: ctx.request.body.name,
      ptime: ctx.request.body.time,
      cinema: ctx.request.body.cinema,
      status: '等待上映',
      auto: '0'
    })
    await np.save().then(nm => {
      ctx.body = nm
    }).catch(err => {
      console.log(err)
    })
  }
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
/**
 * 更新状态
 */
router.post('/changestatus', async ctx => {
  let result = await Paipian.find({_id: ctx.request.body._id})
  let data = result[0]
  data.status = ctx.request.body.status
  const up = new Paipian(data)
  await up.save()
})

module.exports = router.routes()
