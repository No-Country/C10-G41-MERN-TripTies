const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const ProfileSchema = new Schema (
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true
    },
    photo: {type: String},
    description: {type: String, trim: true},
    birthday: {type: Date},
    portrait: {type: String}
  }, 
  {
    timestamps: true
  }
)

module.exports = model('Profile', ProfileSchema)