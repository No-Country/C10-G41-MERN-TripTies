const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const FollowSchema = new Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    following: {
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


module.exports = model('Follow', FollowSchema)