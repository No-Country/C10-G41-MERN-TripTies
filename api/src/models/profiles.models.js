const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const ProfileSchema = new Schema (
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true
    },
    first_name: {type: String},
    last_name: {type: String},
    photo: {type: String},
    description: {type: String, trim: true},
    birthday: {type: Date},
    portrait: {type: String}, 
    publications: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Publication',
    }, 
    status: {type: String, default: 'active'}
  }, 
  {
    timestamps: true
  }
)

module.exports = model('Profile', ProfileSchema)