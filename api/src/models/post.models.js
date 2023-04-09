const {Schema, model, default: mongoose} = require('mongoose')

const postSchema = new Schema({
  user: {type: mongoose.Schema.Types.ObjectId, required: true},
  // title: { type: String, required: true },
  content: { type: String, required: true },
  media: [{
    type: { type: String, required: true, enum: ['image', 'video'] },
    url: { type: String, required: true },
    description: { type: String },
    // other metadata for each media file, e.g. size, duration, format, etc.
  }],
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
    }
  }, 
  reported: { type: Number, default: 0 }
})

postSchema.index({ location: '2dsphere' })

module.exports = model('Post', postSchema)
