const router = require('express').Router()
const Conversation = require('../chatControllers/conversation.controller')
const passport = require('passport')
require('../../middlewares/auth.middleware')(passport)


router.route('/')
  .post(passport.authenticate('jwt', {session: false}), Conversation.postConversation)

module.exports = router