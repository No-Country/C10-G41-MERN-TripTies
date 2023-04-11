const { Schema, model } = require('mongoose')

const CommentSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    parent_id: {type: Schema.Types.ObjectId, ref: 'Comment'},
    post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true},
    content: { type: String, required: true, maxLength: 500, trim:true },
    reported: {default: false, type: Boolean},
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }, 
)

// CommentSchema.virtual('likesCount').get( () => {
//   return this.likes.length
// })
// CommentSchema.set('toJSON', { virtuals: true })


module.exports = model('Comment', CommentSchema)