const { getConversationParticipants } = require('../chat/chatServices/participants.services')

const participantValidate = async (req, res) => {
  try {
    const { conversationId } = req.params
    const participants = await getConversationParticipants(conversationId)
    res.status(200).json(participants)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = participantValidate
