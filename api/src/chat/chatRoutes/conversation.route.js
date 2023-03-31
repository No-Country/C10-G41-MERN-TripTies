const router = require('express').Router()
const Conversation = require('../chatControllers/conversation.controller')
const passportJWT = require('../../middlewares/auth.middleware')


router.route('/')
  .post(passportJWT.authenticate('jwt', {session: false}), Conversation.postConversation)