const Likes = require('../models/likes.models')
const Post = require('../services/post.services')

const postNewPost = (req, res) => {
  const userId = req.user._id
  const { content } = req.body


  Post.createPost(userId, { content })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(400).json({
        message: err.message, fields: {
          content: 'String',
          media: [
            'type',
            'url',
            'description'
          ],
          location: 'point/coordinates',
          reported: 'Number'
        }
      })
    })
}

const putPost = (req, res) => {
  const { content, location } = req.body
  const {postId} = req.params
  const userId = req.user._id

  // console.log(content, location)
  // console.log(postId)
  // console.log(userId)

  Post.updatePost({_id: postId, user: userId}, { content, location })

    .then(data => {
      if (data.nModified > 0) {
        res.status(200).json({ message: `Post with id: ${postId} edited successfully by the user with id: ${userId}` })
      } else {
        res.status(400).json({ message: 'Post not available' })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const getAllPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const { posts, totalPages } = await Post.findAllPosts({ page, limit })

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages
    })
  } catch (err) {
    next(err)
  }
}

const getPostById = async (req, res) => {

  const { postId } = req.params
  try {
    const post = await Post.findPostById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    return res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// const postLikeByPost = (request, response) => {
//   const id = request.user._id
//   const { postId } = request.params

//   Post.addLikeByPost(id, postId)
//     .then(data => response.status(201).json(data))
//     .catch(err => response.status(400).json({ message: err.message }))
// }

const postLikeByPost = async (request, response) => {
  const id = request.user._id
  const { postId } = request.params

  try {
    const existingLike = await Likes.findOne({ user: id, post: postId })
    if (existingLike) {
      throw new Error('User has already liked this post')
    }

    const like = await Post.addLikeByPost(id, postId)
    response.status(201).json(like)
  } catch (error) {
    response.status(409).json({ message: error.message })
  }
}




module.exports = {
  getAllPosts,
  getPostById,
  postNewPost, 
  putPost, 
  postLikeByPost
}