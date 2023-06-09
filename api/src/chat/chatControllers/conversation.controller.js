const Conversation = require('../chatServices/conversation.services')

const postConversation = (req, res) => {
  const { title, participantId } = req.body
  const ownerId = req.user._id
  
  Conversation.createConversation({ title, participantId, ownerId })
    .then(data => {
      res.status(201).json(data)
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message, fields: {
          title: 'String',
          participantId: 'id'
        }
      })
    })
}

const getAllConversations = (req, res) => {
  Conversation.findAllConversations()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(400).json({message: err.message})
    })
}


const getConversationById = async (req, res, next) => {
  const { conversationId } = req.params

  try {
    const conversation = await Conversation.findConversationById(conversationId)

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' })
    }

    return res.status(200).json({ conversation })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const putConversation = async (req, res) => {
  const { conversationId } = req.params
  const { title } = req.body
  try {
    const updatedConversation = await Conversation.editConversation(conversationId, { title })
    res.status(200).json({ conversation: updatedConversation })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteConversation = (req, res, next) => {
  const { conversationId } = req.params

  Conversation.removeConversation(conversationId)
    .then(conversation => {
      res.status(200).json({ message: 'Conversation deleted succesfully', conversation })
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = {
  postConversation,
  getAllConversations,
  getConversationById,
  putConversation,
  deleteConversation
}