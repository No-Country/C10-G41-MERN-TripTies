const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')


const ConversationSchema = new Schema(
  {
    title: {type: String, required: true},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Conversation', ConversationSchema)