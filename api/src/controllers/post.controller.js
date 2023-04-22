const { uploadFile } = require('../../s3')
const Likes = require('../models/likes.models')
const postModels = require('../models/post.models')
const Post = require('../services/post.services')
const { unlinkFile } = require('../utils/unlinkFile')

const postNewPost = async (req, res, next) => {
  const userId = req.user._id
  const content = req.body
  const files = req.files
  
  try {
    const data = await Post.createPost(userId, content)
    //   const files = req

    //   if (files && files.length > 0) {
    //     const newImages = await Promise.all(
    //       files.map(async (file) => {
    //         const fileName = `uploads/posts/photos/${data._id}.${file.name}`
    //         const bucketUrl = `${process.env.AWS_DOMAIN}/${fileName}`

    //         console.log('url', bucketUrl)

    //         await uploadFile(file, fileName)
    //         const newImage = await Post.createImage(data._id, bucketUrl)
    //         return newImage
    //       })
    //     )

    //     // // Actualizar el campo photoPost con la URL de la imagen
    //     const urls = newImages.map((image) => image.url)
    //     await postModels.updateOne({ _id: data._id }, { photoPost: urls })
    //   }
    res.status(201).json(data);

  } catch (err) {
    res.status(400).json({
      message: err.message,
      fields: {
        content: 'string',
        privacity: 'Public' | 'Private',
        photoPost: '[req.files]',
        video: '[req.files]',
        rate: 'number',
        name: 'string',
        clasification: 'string',
        reported: 'number',
      },
    })
  }
}

// const postNewPost = (req, res, next) => {
//   const userId = req.user._id
//   const content = req.body

//   Post.createPost(userId, content )
//     .then((data) => {
//       res.status(201).json(data)
//       next()
//     })
//     .catch((err) => {
//       res.status(400).json({
//         message: err.message,
//         fields: {
//           content: 'string',
//           privacity: 'Public' | 'Private',
//           photoPost: '[req.files]',
//           video: '[req.files]',
//           rate: 'number',
//           name: 'string',
//           clasification: 'string',
//           reported: 'number'
//         },
//       })
//     })
// }

const putPost = (req, res) => {
  const { content, location } = req.body
  const { postId } = req.params
  const userId = req.user._id

  Post.updatePost({ _id: postId, user: userId }, { content, location })

    .then((data) => {
      if (data.nModified > 0) {
        res.status(200).json({
          message: `Post with id: ${postId} edited successfully by the user with id: ${userId}`,
        })
      } else {
        res.status(400).json({ message: 'Post not available' })
      }
    })
    .catch((err) => {
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
      totalPages: totalPages,
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

//! --------------------POST IMAGES -------------------------

const createImagePost = async (req, res, next) => {
  const files = req.files

  try {
    if (!files || files.length === 0) {
      throw new Error('No images received', 400, 'Bad Request')
    }

    const newImages = await Promise.all(
      files.map(async (file) => {
        const fileName = `uploads/posts/photos/${file.originalname
          .split('.')
          .pop()}`
        const bucketUrl = `${process.env.AWS_DOMAIN}/${fileName}`

        await uploadFile(file, fileName)

        const newImage = await Post.createImage(bucketUrl);
        console.log("newImage: ", newImage);
        return newImage;
      })
    )

    return res.status(200).json({
      results: {
        message: `Count of uploaded images: ${newImages.length}`,
        imagesUploaded: newImages,
      },
    })
  } catch (error) {
    if (files) {
      await Promise.all(
        files.map(async (file) => {
          try {
            await unlinkFile(file.path)
          } catch (error) {
            //
          }
        })
      )
    }
    return next(error)
  }
}

//! ------------------------ LIKES ----------------------------

const postLikeByPost = async (req, res) => {
  const id = req.user._id
  const { postId } = req.params

  try {
    const existingLike = await Likes.findOne({ profile: id, post: postId })
    if (existingLike) {
      throw new Error('User has already liked this post')
    }

    const like = await Post.addLikeByPost(id, postId)
    res.status(201).json(like)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  postNewPost,
  putPost,
  postLikeByPost,
  createImagePost,
}
