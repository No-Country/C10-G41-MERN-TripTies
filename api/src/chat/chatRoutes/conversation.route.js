const router = require('express').Router()
const participantValidate = require('../../middlewares/participantChatValidate')
const Conversation = require('../chatControllers/conversation.controller')
const Message = require('../chatControllers/message.controller')
const passport = require('passport')
require('../../middlewares/auth.middleware')(passport)
const isOwner = require('../../middlewares/isOwner.middleware')


router.route('/')
  .get( passport.authenticate('jwt', {session: false}), isOwner, Conversation.getAllConversations)
  .post( passport.authenticate('jwt', {session: false}), isOwner, Conversation.postConversation)

router.route('/:conversationId')
  .get( passport.authenticate('jwt', {session: false}), isOwner, Conversation.getConversationById)
  .put( passport.authenticate('jwt', {session: false}), isOwner, Conversation.putConversation) //Arreglar
  .delete( passport.authenticate('jwt', {session: false}), isOwner, Conversation.deleteConversation)

router.route('/:conversationId/messages')
  .post( passport.authenticate('jwt', {session: false}), participantValidate, Message.postMessage)


module.exports = router