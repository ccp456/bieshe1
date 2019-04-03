const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 实例化数据模型
const paipianSchema = new Schema({
  pid: {
    type: String,
    required: true
  },
  mid: {
    type: String,
    required: true
  },
  ptime: {
    type: Date,
    required: true
  },
  male: {
    type: Number,
    required: true
  },
  nul: {
    type: Number,
    required: true
  },
  female: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('PAIPIAN', paipianSchema, 'PAIPIAN')
