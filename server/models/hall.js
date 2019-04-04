const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 实例化数据模型
const HallSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  seat: {
    type: Number,
    required: true
  },
  createtime: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('hall', HallSchema, 'halls')
