const { default: mongoose } = require('mongoose')
const Likes = require('../models/likes.models')
const Post = require('../models/post.models')
const Profile = require('../models/profiles.models')
const User = require('../models/users.models')

const findAllPosts = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('content media.location')
    .lean()

  const count = await Post.countDocuments()
  const totalPages = Math.ceil(count / limit)

  return { posts, totalPages }
}

const findPostById = async (postId) => {
  const post = await Post.findById(postId)
  return post
}


const createPost = async (id, obj) => {
  let userId = await User.findOne({ _id: id })

  const data = await Post.create({
    user: userId._id,
    contentPost: obj.contentPost,
    images: obj.images,
    location: obj.location,
    reported: obj.reported, 
    rating: obj.rating
  })
  return data
}

const updatePost = async (postId, userId, obj) => {

  console.log(postId)
  console.log(userId)
  console.log(obj)
  const post = await Post.findOneAndUpdate(
    { _id: postId, user: userId },
    obj,
    { new: true }
  )
  return post
}

// const addLikeByPost = async(id, postId) => {
//   const session = await mongoose.startSession()
//   session.startTransaction()
//   try {
//     const profile = await Profile.findOne( { user: id } )
//     let like = await Likes.create({
//       user: profile._id,
//       post: postId
//     })
//     await like.save({ session })
//     await session.commitTransaction()
//     session.endSession()
//     return like
//   }
//   catch (error) {
//     await session.abortTransaction()
//     session.endSession()
//     throw new Error(error.message)
//   }
// }
const addLikeByPost = async(id, postId) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const profile = await Profile.findOne( { user: id } )
    let like = await Likes.findOneAndUpdate(
      { user: profile._id, post: postId },
      { $setOnInsert: { user: profile._id, post: postId } },
      { upsert: true, new: true, session, setDefaultsOnInsert: true }
    )
    await session.commitTransaction()
    session.endSession()
    return like
  }
  catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw new Error(error.message)
  }
}



module.exports = {
  findAllPosts,
  findPostById,
  createPost,
  updatePost, 
  addLikeByPost
}