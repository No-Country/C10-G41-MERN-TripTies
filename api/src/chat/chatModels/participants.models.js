const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const ParticipantSchema = new Schema (
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation', 
      required: true
    }
  }, 
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Participant', ParticipantSchema)