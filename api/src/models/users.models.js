const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    first_name: {type: String},
    last_name: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    emailVerified: { default: false, type: Boolean }, 
    photo: {type: String},
    role: { type: String, default: 'USER' }, 
    isOnline: {type: Boolean, default: false}
  },
  
  {
    timestamps: true,
    versionKey: false
  }
)


module.exports = model('User', UserSchema)