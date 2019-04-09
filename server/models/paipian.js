const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 实例化数据模型
const paipianSchema = new Schema({
  pid: {
    type: String
  },
  mname: {
    type: String
  },
  mid: {
    type: String
  },
  ptime: {
    type: Date,
    required: true
  },
  hall: {
    type: String
  },
  status: {
    type: String
  },
  male: {
    type: Number
  },
  nul: {
    type: Number
  },
  female: {
    type: Number
  },
  auto: {
    type: String
  }
})

module.exports = mongoose.model('PAIPIAN', paipianSchema, 'PAIPIAN')
