const Message = require('../chatModels/message.models')

const createMessage = async (obj) => {
  const data = await Message.create({
    conversation: obj.conversationId, 
    user: obj.userId, 
    message: obj.message
  })
  return data 
}

module.exports = {
  createMessage
}