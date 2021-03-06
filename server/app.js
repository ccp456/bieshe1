const Koa = require('koa')
const serve = require('koa-static')
const Router = require('koa-router')
const mongoose = require('mongoose')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const cheerio = require('cheerio')
const superagent = require('superagent')
const koaBody = require('koa-body')
const path = require('path')
const fs = require('fs')

// 实例化
const app = new Koa()
const router = new Router()

app.use(bodyParser(), cheerio, superagent)

// 跨域
app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/test') {
      return '*' // 允许来自所有域名请求
    }
    return 'http://localhost:5555'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// 引入
const users = require('./routes/api/users')
const craw = require('./routes/api/craw')
const watch = require('./routes/api/watch')
const hall = require('./routes/api/hall')
const video = require('./routes/api/video')
const static = require('./routes/api/static')

// 路由
router.get('/', async ctx => {
  ctx.body = { msg: 'Hello Koa' }
})

// config
const db = require('./config/key').mongoURI

// 连接数据库
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('db connected~')
  })
  .catch(err => {
    console.log(err)
  })

// 配置地址
router.use('/api/users', users)
router.use('/api/craw', craw)
router.use('/api/watch', watch)
router.use('/api/hall', hall)
router.use('/api/video', video)
router.use('/api/static',static)

// 配置
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server started on ${port}`)
})
