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


createConversation({
  title: 'Conversacion Nicolas - Lucas',//? Titulo del chat
  ownerId: '642760c3f11351d583eac0d2', //? Nicolas como owner
  participantId: '6425e411bfc9e1571c1aaa06' //? Lucas como invitado
})
  .then(data => console.log(data))
  .catch(err => console.log(err))

module.exports = {
  createConversation
}