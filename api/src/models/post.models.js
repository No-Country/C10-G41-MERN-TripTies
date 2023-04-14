const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  user: { type: Object, required: true },
  content: { type: String, required: true },
  privacity: { type: String, enum: ['Public', 'Private'], required: true },
  photo: { type: [Object], required: true },
  video: { type: [Object], required: true },
  rate: { type: Number, min: 1, max: 5, required: true },
  name: { type: String, required: true },
  clasification: { type: String, required: true },
  reported: { type: Number, default: 0 },
  liked: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
})


module.exports = model('Post', postSchema)
