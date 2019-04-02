const Router = require('koa-router')
const router = new Router()

// 引入watch
const wadb = require('../../models/watch')

/**
 * @router GET api/watch/home
 * @desc 首页数据
 * @access 接口公开
 */
let home
router.get('/home', async ctx => {
  const wre = await wadb.find()
  let aw = wre.length
  // 总观众

  let td = new Date()
  let y = td.getFullYear()
  let m = (td.getMonth() + 1 < 10 ? '0' + (td.getMonth() + 1) : td.getMonth() + 1) - 1
  let d = td.getDate()
  const newwatch = await wadb.find({createtime: new Date(y, m, d)})
  let nw = newwatch.length
  // 今日增长观众

  /* home.push({
    , $gte: {$date: now.setDate(now.getDate() - 1)}
    allwatch: aw,
    newwatch: nw
  }) */
})

module.exports = router.routes()
