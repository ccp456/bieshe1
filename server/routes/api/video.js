const Router = require('koa-router')
const router = new Router()
const cheerio = require('cheerio')
const superagent = require('superagent')
// const path = require('path')
// const fs = require('fs')

const Cinema = require('../../models/cinema')
const Movie = require('../../models/movie')
const Importdata = require('../../models/import')
const Hall = require('../../models/hall')
const Paipian = require('../../models/paipian')

router.post('/importData', async (ctx, next) => {
  console.log(ctx.request.body)
  let base = ctx.request.body
  let sell = ctx.request.body.data
  if (sell.length < 0) ctx.body = 'f'
  else {
    let data = new Importdata({
      mname: base.info.mname,
      cinema: base.info.cinema,
      ptime: base.info.ptime,
      hall: base.info.hall,
      sale: sell.length
    })
    await data.save().then(() => {
      ctx.body = 's'
    }).catch(err => {
      console.log(err)
      ctx.body = 'sf'
    })
  }
})

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
  let res
  const param = ctx.request.query
  const result = await Paipian
    .find({auto: '0'})
    .sort({ptime: -1})
  console.log(param)
  res = result
  let home = []
  let time = new Date()
  // 首页
  if (param.mode === 'home') {
    result.forEach(item => {
      if (item.ptime.toDateString() === time.toDateString()) {
        home.push(item)
      }
    })
    if (home.length > 0) res = home
    else res = '无数据'
  }
  // 筛选
  if (param.search) {
    let check = []
    if (param.movie) {
      // 电影名称
      result.forEach(item => {
        if (item.mname === param.movie) {
          check.push(item)
        }
      })
    } else {
      check = result
    }
    if (param.city || param.province) {
      // 地区
      let cinema
      let area = []
      if (param.city) {
        cinema = await Cinema.find({city: param.city})
      } else {
        cinema = await Cinema.find({province: param.province})
      }
      // console.log(check)
      cinema.forEach(cinema => {
        check.forEach(item => {
          if (item.cinema === cinema.cinema) {
            area.push(item)
          }
        })
      })
      check = area
    }
    if (param.star && param.end) {
      let area = []
      check.forEach(item => {
        let ptime = new Date(item.ptime)
        let star = new Date(param.star)
        let end = new Date(param.end)
        if (ptime.getTime() >= star.getTime() && ptime.getTime() <= end.getTime()) {
          area.push(item)
        }
      })
      check = area
    }
    res = check
  }
  ctx.body = res
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
  console.log(ctx.request.body)
  let result = await Paipian.find({_id: ctx.request.body._id})
  let data = result[0]
  console.log(ctx.request.body)
  data.status = ctx.request.body.status
  const up = new Paipian(data)
  await up.save().then(() => {
    ctx.body = '修改成功'
  })
})

module.exports = router.routes()
