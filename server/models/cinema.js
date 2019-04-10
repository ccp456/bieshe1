const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 实例化数据模型
const cinemaSchema = new Schema({
  num: {
    type: String
  },
  cinema: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('cinema', cinemaSchema, 'cinema')
