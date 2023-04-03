const { Schema, model, default: mongoose } = require('mongoose')

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    emailVerified: { default: false, type: Boolean }, 
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }, 
    role: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Role',
      default: 'USER'
    }, 
    isOnline: {type: Boolean, required: true, default: false}
  },
  
  {
    timestamps: true,
    versionKey: false
  }
)


module.exports = model('User', UserSchema)