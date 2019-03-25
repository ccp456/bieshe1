const Router = require('koa-router')
const router = new Router()
const key = require('../../config/key')
const jwt = require('jsonwebtoken')

// 引入User
const User = require('../../models/User')

/**
 * @router GET api/users/test
 * @desc 测试接口地址
 * @access 接口公开
 */
router.get('/test', async ctx => {
  ctx.status = 200
  ctx.body = { msg: 'users works... ' }
})

/**
 * @route Post api/users/register
 * @desc 注册
 * @access
 */

router.post('/register', async ctx => {
  // console.log(ctx.request.body)
  const findResult = await User.find({username: ctx.request.body.username})
  if (findResult.length > 0) {
    ctx.status = 500
    ctx.body = { email: '名字已存在' }
  } else {
    const newUser = new User({
      username: ctx.request.body.username,
      password: ctx.request.body.password
    })

    // console.log(newUser)
    await newUser.save().then(user => {
      ctx.body = user
    }).catch((err) => {
      console.log(err)
    })
    ctx.body = newUser
  }
})

/**
 * @route Post api/users/login
 * @desc 登录
 * @access
 */
router.post('/login', async ctx => {
  // 查询
  const findResult = await User.find({ username: ctx.request.body.username })
  const user = findResult[0]
  const password = ctx.request.body.password
  // 判断是否查到
  if (findResult.length === 0) {
    ctx.status = 404
    ctx.body = { username: '用户不存在' }
  } else {
    if (password === user.password) {
      const payload = { id: user.id, name: user.username }
      const token = jwt.sign(payload, key.logintoken, { expiresIn: 3600 })

      ctx.status = 200
      ctx.body = { success: true, token: 'Bearer ' + token }
    } else {
      ctx.status = 400
      ctx.body = { password: '密码错误' }
    }
  }
})

module.exports = router.routes()
