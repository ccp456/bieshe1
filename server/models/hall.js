const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 实例化数据模型
const HallSchema = new Schema({
  belong: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  seat: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('hall', HallSchema, 'halls')
