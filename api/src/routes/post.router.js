const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

const {
  postNewPost
} = require('../controllers/post.controller')

router.route('/')
  .post(passport.authenticate('jwt', {session: false}), postNewPost)


module.exports = router