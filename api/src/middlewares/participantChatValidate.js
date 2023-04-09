const findParticipantConversation = require('../chat/chatServices/participants.services')

const participantValidate = (req, res, next) => {
  const { conversationId } = req.params
  const userId = req.user._id

  findParticipantConversation(userId, conversationId)
    // console.log("conversationId:" , conversationId)
    // console.log("user:" , userId)
    .then(data => {
      if(data) {
        next()
      } else {
        res.status(400).json({ message: 'You are not participant from this conversation' })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}


module.exports = participantValidate