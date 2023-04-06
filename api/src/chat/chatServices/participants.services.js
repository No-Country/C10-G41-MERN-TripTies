const Participants = require('../chatModels/participants.models')

const findParticipantConversations = async (userId, conversationId) => {
    const data = await Participants.findOne({ user: userId, conversation: conversationId },
    )
    return data
}

module.exports = findParticipantConversations
