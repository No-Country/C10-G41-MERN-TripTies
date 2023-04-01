const Message = require('../chatServices/message.services')


const postMessage = async (req, res) => {
  try {
    const { email } = req.user
    const { conversationId } = req.params
    const message = req.body

    console.log('userId:', email)
    console.log('conversationId:', conversationId)
    console.log('message:', message)

    const data = await Message.createMessage({ email, conversationId, message })
    res.status(201).json(data)
  } catch (err) {
    res.status(400).json({
      message: err.message, fields: {
        message: 'Text'
      }
    })
  }
}

module.exports = {
  postMessage
}