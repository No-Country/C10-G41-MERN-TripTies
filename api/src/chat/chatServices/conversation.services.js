const Conversation = require('../chatModels/conversation.models')
const Participant = require('../chatModels/participants.models')

const createConversation = async (obj) => {

  const newConversation = await Conversation.create({
    title: obj.title,
    user: obj.ownerId //? Creador de la conversación (owner)
  })

  const participant1 = await Participant.create({
    user: obj.ownerId,
    conversation: newConversation._id
  })
  const participant2 = await Participant.create({
    user: obj.participantId, //Este es el otro usuario que viene desde el body
    conversation: newConversation._id
  })

  return {
    createConversation,
    participant1,
    participant2
  }
}

const findAllConversations = () => {
  return new Promise((resolve, reject) => {
    Conversation.find()
      .then(users => {
        resolve(users)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const findConversationById = async (id) => {
  const user = await Conversation.findById(id)
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

const editConversation = async (conversationId, obj) => {
  try {
    // Buscamos el perfil del usuario por su ID y lo actualizamos
    const updatedConversation = await Conversation.findOneAndUpdate(
      { conversation: conversationId },
      { title: obj.title },
    )
    console.log(updatedConversation)
    return updatedConversation
  } catch (error) {
    throw new Error(`Error updating user conversation: ${error.message}`)
  }
}

const removeConversation = async (conversationId) => {
  return new Promise((resolve, reject) => {
    Conversation.findById(conversationId)
      .then(conversation => {
        if (!conversation) {
          reject(new Error(`User with the id was not found ${conversationId}`))
        }
        return conversation.deleteOne()
      })
      .then(deletedConversation => {
        resolve(deletedConversation)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = {
  createConversation,
  findAllConversations,
  findConversationById,
  editConversation,
  removeConversation
}