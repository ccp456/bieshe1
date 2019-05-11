const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 实例化数据模型
const importSchema = new Schema({
  mname: {
    type: String
  },
  time: {
    type: Date
  },
  cinema: {
    type: String
  },
  hall: {
    type: String
  },
  sale: {
    type: String
  }
})

module.exports = mongoose.model('imports', importSchema, 'IMPORT')
