const router = require('express').Router()
const Conversation = require('../chatControllers/conversation.controller')
const Message = require('../chatControllers/message.controller')
const authMiddleware = require('../../middlewares/auth.middleware')


router.route('/')
  .get( authMiddleware, Conversation.getAllConversations)
  .post( authMiddleware, Conversation.postConversation)

router.route('/:conversationId')
  .get( authMiddleware, Conversation.getConversationById)
  .put( authMiddleware, Conversation.putConversation) //Arreglar
  .delete( authMiddleware, Conversation.deleteConversation)

router.route('/:conversationId/messages')
  .post( authMiddleware, Message.postMessage)


module.exports = router