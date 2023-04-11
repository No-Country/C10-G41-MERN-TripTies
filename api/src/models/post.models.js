const {Schema, model, default: mongoose} = require('mongoose')


const postSchema = new Schema({
  user: {type: mongoose.Schema.Types.ObjectId, required: true},
  content: { type: String},
  images: { type: mongoose.Types.ObjectId, ref: 'PostsImages', required: true },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
    }
  }, 
  reported: { type: Number, default: 0 },
  rating: { type: Number, min: 1, max: 5 }
})

postSchema.index({ location: '2dsphere' })

module.exports = model('Post', postSchema)
