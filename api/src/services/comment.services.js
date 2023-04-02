const Comment = require('../models/comment.models')

const createComment = async (commentData) => {
  const newComment = new Comment(commentData)
  await newComment.save()
  return newComment
}

//TODO: return in a tree form, with replies as a list in a field "replies :"
const findComments = async () => {
  const comments = await Comment.find({})
  return comments
}


const changeComment = async ( id, user_id) => {
  const comment = await Comment.findById(id)
  const alreadyLiked = comment.likes.includes(user_id)
  let res 
  if(user_id && !alreadyLiked){
    res = await Comment.updateOne({ _id: id }, { $push: { likes: user_id } })
  } else {
    res = await Comment.updateOne({ _id: id }, { $pull: { likes: user_id } })
  }
  return res 
}

// only the user that post the comment could delete it
const removeComment = async (id) => {
  const result = await Comment.findByIdAndDelete(id)
  return(result)
}

module.exports = {
  createComment,
  findComments,
  changeComment,
  removeComment
}