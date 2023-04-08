const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const RecoveryPasswordSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User', 
      required: true }, 
    used: {type: Boolean, default: false}  
  },
  {
    timestamps: true,
    versionKey: false
  }
)


module.exports = model('RecoveryPassword', RecoveryPasswordSchema)