const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 实例化数据模型
const watchSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  createtime: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('WATCH', watchSchema, 'WATCH')
