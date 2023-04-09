const { Schema, model, default: mongoose } = require('mongoose')

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    first_name: {type: String},
    last_name: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    emailVerified: { default: false, type: Boolean }, 
    photo: {type: String},
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }, 
    role: { type: String, default: 'USER' }, 
    isOnline: {type: Boolean, default: false}
  },
  
  {
    timestamps: true,
    versionKey: false
  }
)


module.exports = model('User', UserSchema)