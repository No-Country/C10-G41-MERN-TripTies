const { mongoose } = require('mongoose')
const Comment = require('../models/comment.models')

const createComment = async (commentData) => {
  const newComment = new Comment(commentData)
  await newComment.save()
  return newComment
}

const findComments = async () => {
  const comments = await Comment.find({})
  return comments
}

// has to change to use the user of the token
const changeComment = async (data) => {
  if(data.user_id && data.like===1){
    const res = await Comment.updateOne({ _id: data.id }, { $push: { friends: data.user_id } })
    return res
  }
  if(data.user_id && data.like===0){
    const res = await Comment.updateOne({ _id: data.id }, { $pull: { friends: data.user_id } })
    return res 
  }
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