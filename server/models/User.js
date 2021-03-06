const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 实例化数据模型
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('users', UserSchema)
