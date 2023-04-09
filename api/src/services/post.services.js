const Post = require('../models/post.models')
const User = require('../models/users.models')

const createPost = async (id, obj) => {

  let userId = await User.findOne({ _id: id })

  const data = await Post.create({
    user: userId._id,
    content: obj.content, 
    media: obj.media, 
    location: obj.location, 
    reported: obj.reported
  })
  return data
}




module.exports = {
  createPost
}