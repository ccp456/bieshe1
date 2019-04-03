const Router = require('koa-router')
const router = new Router()

// 引入watch
const wadb = require('../../models/watch')
const ppdb = require('../../models/paipian')

/**
 * @router GET api/watch/home
 * @desc 首页数据
 * @access 接口公开
 */
router.get('/home', async ctx => {
  let td = new Date()
  let y = td.getFullYear()
  let m = (td.getMonth() + 1 < 10 ? '0' + (td.getMonth() + 1) : td.getMonth() + 1) - 1
  let d = td.getDate()
  // 总观众
  const wre = await wadb.find({createtime: {$lte: Date()}})
  let aw = wre.length
  // 今日增长观众
  const newwatch = await wadb.find({createtime: new Date(y, m, d)})
  let nw = newwatch.length
  // 5天增长

  const fe = await ppdb
    .aggregate([{$group: {_id: '', favg: {$avg: '$female'}}}])
  const ma = await ppdb
    .aggregate([{$group: {_id: '', favg: {$avg: '$male'}}}])
  const nu = await ppdb
    .aggregate([{$group: {_id: '', favg: {$avg: '$nul'}}}])

  const d1 = await wadb.find({createtime: new Date(y, m, d - 1)})
  const d2 = await wadb.find({createtime: new Date(y, m, d - 2)})
  const d3 = await wadb.find({createtime: new Date(y, m, d - 3)})
  const d4 = await wadb.find({createtime: new Date(y, m, d - 4)})
  let q1 = d1.length
  let q2 = d2.length
  let q3 = d3.length
  let q4 = d4.length
  let d4m = q4 - 9
  let d3m = q3 - 18
  let d2m = q2 - 15
  let d1m = q1 - 11
  let nwm = nw - 16

  ctx.body = {
    audience: {nw: nw, aw: aw},
    day5: [q4, q3, q2, q1, nw],
    day5f: [9, 18, 15, 11, 16],
    day5m: [d4m, d3m, d2m, d1m, nwm],
    coc: [fe, ma, nu]
  }
})

module.exports = router.routes()
