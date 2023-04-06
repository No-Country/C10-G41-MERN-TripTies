const router = require('express').Router()

const commentController = require('../controllers/comment.controller')

router.route('/')
  .post(commentController.postComment)

router.route('/')
  .get(commentController.getComments)
  
router.route('/')
  .put(commentController.updateComment)

router.route('/')
  .delete(commentController.deleteComment)
  

module.exports = router