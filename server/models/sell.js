const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 实例化数据模型
const sellSchema = new Schema({
  id: {
    type: String
  },
  mname: {
    type: String
  },
  cinema: {
    type: String
  },
  province: {
    type: Date,
    required: true
  },
  city: {
    type: String
  },
  area: {
    type: String
  },
  type: {
    type: String
  }
})

module.exports = mongoose.model('sell', sellSchema, 'sell')
