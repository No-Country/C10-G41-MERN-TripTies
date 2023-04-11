const Comment = require('../models/comment.models')

const createComment = async (commentData) => {
  if (commentData.parent_id && await Comment.findOne({_id: commentData.parent_id})=== null) {
    throw new Error('Invalid parent_id')
  }
  const newComment = new Comment(commentData)
  await newComment.save()
  return newComment
}

const findComments = async () => {
  const comments = await Comment.find({})
  const commentMap = new Map()
  for(let comment of comments){
    if(!comment.parent_id) {
      const aux = comment.toObject()
      aux.replies = []
      commentMap.set(comment.id, aux)
    }
  }
  for(const comment of comments){
    if(comment.parent_id) {
      const parentAux = commentMap.get(comment.parent_id.toString())
      parentAux.replies.push(comment)
    }
  }
  console.log('COMMENTS:', commentMap)
  return([...commentMap.values()])
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