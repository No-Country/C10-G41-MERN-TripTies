const Message = require('../chatModels/message.models')

const createMessage = async (obj) => {
  const data = await Message.create({
    user: obj._id, 
    conversation: obj.conversationId, 
    message: obj.message.message
  })
  return data 
}

module.exports = {
  createMessage
}