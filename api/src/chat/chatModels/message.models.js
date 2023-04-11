const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const MessageSchema = new Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Conversation', 
      required: true
    }, 
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    }, 
    message: {type: String, required: true}
  }
)

module.exports = model('Message', MessageSchema)