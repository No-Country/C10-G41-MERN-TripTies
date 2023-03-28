const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
  {
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true,  },
    role: {default: false, type: Boolean},
    emailVerified: {default: false, type: Boolean}  
  }, 
  {
    timestamps: true, 
    versionKey: false
  }
)

module.exports = model('User', UserSchema)