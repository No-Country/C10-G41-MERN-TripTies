const express = require('express')
const router = express.Router()
const passport = require('passport')
const routesComments = require('./comment.router')
require('../middlewares/auth.middleware')(passport)

const {
  postNewPost,
  getAllPosts,
  getPostById,
  putPost,
  postLikeByPost,
  createImagePost,
} = require('../controllers/post.controller')
const { multerPublicationsPhotos } = require('../utils/multer')
const { postTag } = require('../controllers/tag.controller')

router.route('/')

  .get(getAllPosts)

router.route('/:postId')
  .get(passport.authenticate('jwt', { session: false }), getPostById)
  .put(passport.authenticate('jwt', { session: false }), putPost)
  .post(passport.authenticate('jwt', { session: false }), multerPublicationsPhotos.array('image', 3), createImagePost)


router.use('/:postId/comments', routesComments)

router.route('/:postId/like')
  .post(passport.authenticate('jwt', { session: false }), postLikeByPost)


module.exports = router
