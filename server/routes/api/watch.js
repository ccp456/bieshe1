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
  // 总场次
  const allsession = await ppdb.find({ptime: {$lte: Date()}})
  let as = allsession.length
  // 新增场次
  const newsession = await ppdb.find({ptime: {$lte: new Date(y, m, d), $gte: new Date(y, m, d - 1)}})
  let ns = newsession.length
  // 总售出
  const allder = await ppdb
    .aggregate([
      {$match: {ptime: {$lte: new Date(y, m, d)}}},
      {$group: {_id: '', fsum: {$sum: '$female'}, msum: {$sum: '$male'}}}
    ])
  let ad = allder[0].fsum + allder[0].msum
  // 当日售出
  const newder = await ppdb
    .aggregate([
      {$match: {ptime: {$lte: new Date(y, m, d), $gte: new Date(y, m, d - 1)}}},
      {$group: {_id: '', fsum: {$sum: '$female'}, msum: {$sum: '$male'}}}
    ])
  let nd = newder[0].fsum + newder[0].msum

  // 图标
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
  let d4m = q4 - 33
  let d3m = q3 - 38
  let d2m = q2 - 35
  let d1m = q1 - 31
  let nwm = nw - 26

  ctx.body = {
    audience: {nw: nw, aw: aw},
    session: {ns: ns, as: as},
    sold: {nd: nd, ad: ad},
    day5: [q4, q3, q2, q1, nw],
    day5f: [33, 38, 35, 31, 26],
    day5m: [d4m, d3m, d2m, d1m, nwm],
    coc: [
      {value: fe[0].favg, name: '女性'},
      {value: ma[0].favg, name: '男性'},
      {value: nu[0].favg, name: '空位'}
    ]
  }
})

module.exports = router.routes()
