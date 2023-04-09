const router = require('express').Router()
const participantValidate = require('../../middlewares/participantChatValidate')
const { getAllConversations, postConversation, getConversationById, putConversation, deleteConversation } = require('../chatControllers/conversation.controller')
const Message = require('../chatControllers/message.controller')
const passport = require('passport')
require('../../middlewares/auth.middleware')(passport)


router.route('/')
  .get( participantValidate, getAllConversations )
  .post( participantValidate, postConversation ) 

router.route('/:conversationId')
  .get( participantValidate, getConversationById )
  .put( participantValidate, putConversation ) //Arreglar
  .delete( participantValidate, deleteConversation )

router.route('/:conversationId/message')
  .post( participantValidate, Message.postMessage)


module.exports = router