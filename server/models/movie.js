const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 实例化数据模型
const movieSchema = new Schema({
  mname: {
    type: String
  },
  city: {
    type: String
  },
  province: {
    type: String
  },
  offline: {
    type: Number
  },
  active: {
    type: Number
  },
  maoyan: {
    type: Number
  },
  alipay: {
    type: Number
  },
  paipian: {
    type: Number
  },
  area: {
    type: String
  },
  update: {
    type: Date
  }
})

module.exports = mongoose.model('movie', movieSchema, 'movie')
