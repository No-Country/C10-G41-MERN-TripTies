const {Schema, model } = require('mongoose')

const likesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

likesSchema.index({ user: 1, post: 1 }, { unique: true })

module.exports = model('Like', likesSchema)
