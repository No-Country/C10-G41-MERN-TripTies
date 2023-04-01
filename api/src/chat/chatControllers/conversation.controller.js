const Conversation = require('../chatServices/conversation.services')

const postConversation = (req, res) =>{
  const { title, participantId } = req.body
  const ownerId = req.user._id
  Conversation.createConversation({title, participantId, ownerId})
    .then(data => {
      res.status(201).json(data)
    })
    .catch((err) => {
      res.status(400).json({message: err.message, fields: {
        title: 'String', 
        participantId: 'id'
      }})
    })
}


module.exports = {
  postConversation
}