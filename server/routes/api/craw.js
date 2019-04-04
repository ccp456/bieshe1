const Router = require('koa-router')
const router = new Router()
const cheerio = require('cheerio')
const superagent = require('superagent')

/**
 * @router GET api/craw/test
 * @desc 测试接口地址
 * @access 接口公开
 */
router.get('/test', async ctx => {
  ctx.status = 200
  ctx.body = { msg: 'craw works... ' }
})

/**
 * @router get api/craw/review
 * @desc 测试接口地址
 * @access 接口公开
 */

let items

router.get('/review', async (ctx, next) => {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('http://news.58921.com/review/')
    .end(function (err, sres) {
    // 常规的错误处理
      if (err) {
        return err
      }
      let $ = cheerio.load(sres.text, {
        decodeEntities: false
      })
      items = []
      $('.excerpt-c5 h2 a').each(function (idx, element) {
        if (idx <= 3) {
          let $element = $(element)
          items.push({
            title: $element.text(),
            href: 'http://news.58921.com/' + $element.attr('href')
          })
        }
      })
    })
  ctx.body = items
})

/**
 * @router get api/craw/newmovie
 * @desc 测试接口地址
 * @access 接口公开
 */
let nm
router.get('/newmovie', async (ctx, next) => {
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
        if (idx <= 5) {
          let $element = $(element)
          // console.log($('img')[idx].attribs.src)
          nm.push({
            img: $('img')[idx].attribs.src,
            title: $element.data().title,
            rate: $element.data().rate,
            release: $element.data().release,
            region: $element.data().region,
            director: $element.data().director,
            actors: $element.data().actors
          })
        }
      })
    })
  ctx.body = nm
})

module.exports = router.routes()
