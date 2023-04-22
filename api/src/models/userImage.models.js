const { Schema, model } = require('mongoose')


const UserImageSchema = new Schema({
  url: { type: String, required: true }
})

module.exports = model('UserImage', UserImageSchema)
