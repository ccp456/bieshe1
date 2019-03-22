const koa = require('koa')
const jwt = require('jsonwebtoken')
const Router = require('koa-router')
const mongoose = require('mongoose')
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser')

// 实例化
const app = new koa()
const router = new Router()

app.use(bodyParser())

// 跨域
app.use(cors({
  origin: function (ctx) {
      if (ctx.url === '/test') {
          return "*"; // 允许来自所有域名请求
      }
      return 'http://localhost:8080';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// 引入
const users = require("./routes/api/users")

// 路由
router.get("/", async ctx => {
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
router.use("/api/users",users)

// 配置
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server started on ${ port }`)
})