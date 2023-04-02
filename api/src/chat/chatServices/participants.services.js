const Participants = require('../chatModels/participants.models')

const getConversationParticipants = async (conversationId) => {
  const participants = await Participants.find({ conversation: conversationId })
    .populate('user', '_id name email') // populate user info
    .select('-conversation') // exclude conversation field from result

  if (!participants) {
    throw new Error('Participants not found')
  }

  return participants
}

module.exports = { getConversationParticipants }
