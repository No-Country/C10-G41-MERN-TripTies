const { Schema, model, default: mongoose } = require('mongoose')


const PostsImageSchema = new Schema({
  url: { type: String, required: true },
  description: { type: String },
  publication: {type: mongoose.Types.ObjectId, ref: 'Post', required: true}
})

module.exports = model('PostsImages', PostsImageSchema)
