const mongoose = require('mongoose')
const Conversation = require('../chatModels/conversation.models')
const Participant = require('../chatModels/participants.models')
const User = require('../../models/users.models')

const createConversation = async(obj) =>{

  const newConversation = await Conversation.create({
    title: obj.title, 
    userId: obj.ownerId //? Creador de la conversación (owner)
  })

  const participant1 = await Participant.create({
    userId: obj.ownerId, 
    conversationId: newConversation._id
  }) 
  const participant2 = await Participant.create({
    userId: obj.participantId, //Este es el otro usuario que viene desde el body
    conversationId: newConversation._id
  })

  return {
    createConversation, 
    participant1, 
    participant2
  }
}

module.exports = {
  createConversation
}