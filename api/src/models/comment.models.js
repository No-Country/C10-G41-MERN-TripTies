const { Schema, model } = require('mongoose')

const CommentSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    // publication_id: { type: Schema.Types.ObjectId, ref: 'Publication' },
    content: { type: String,required: true, maxLength: 500, trim:true },
    reported: {default: false, type: Boolean},
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }, 
)

CommentSchema.virtual('likesCount').get( () => {
  return this.likes.length
})


module.exports = model('Comment', CommentSchema)