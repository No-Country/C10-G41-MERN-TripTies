const router = require('express').Router()
const Conversation = require('../chatControllers/conversation.controller')
const Message = require('../chatControllers/message.controller')
const passport = require('passport')
require('../../middlewares/auth.middleware')(passport)


router.route('/')
  .get(passport.authenticate('jwt', { session: false }), Conversation.getAllConversations)
  .post(passport.authenticate('jwt', { session: false }), Conversation.postConversation)

router.route('/:conversationId')
  .get(passport.authenticate('jwt', { session: false }), Conversation.getConversationById)
  .put(passport.authenticate('jwt', { session: false }), Conversation.putConversation) //Arreglar
  .delete(passport.authenticate('jwt', {session: false}), Conversation.deleteConversation)

router.route('/:conversationId/messages')
  .post(passport.authenticate('jwt', {session: false}), Message.postMessage)


module.exports = router