const router = require('express').Router()
const participantValidate = require('../../middlewares/participantChatValidate')
const { getAllConversations, postConversation, getConversationById, putConversation, deleteConversation } = require('../chatControllers/conversation.controller')
const Message = require('../chatControllers/message.controller')
const passport = require('passport')
require('../../middlewares/auth.middleware')(passport)


router.route('/')
  .get( passport.authenticate('jwt', {session: false}), getAllConversations )
  .post( passport.authenticate('jwt', {session: false}), postConversation ) 

router.route('/:conversationId')
  .get( passport.authenticate('jwt', {session: false}), participantValidate, getConversationById )
  .put( passport.authenticate('jwt', {session: false}), participantValidate, putConversation ) //Arreglar
  .delete( passport.authenticate('jwt', {session: false}), participantValidate, deleteConversation )

router.route('/:conversationId/message')
  .post( passport.authenticate('jwt', {session: false}), participantValidate, Message.postMessage)


module.exports = router