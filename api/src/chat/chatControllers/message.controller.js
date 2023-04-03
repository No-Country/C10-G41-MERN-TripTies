const Message = require('../chatServices/message.services')


const postMessage = async (req, res) => {
  try {
    const { _id } = req.user
    const { conversationId } = req.params
    const message = req.body

    // console.log('userId:', _id)
    // console.log('conversationId:', conversationId)
    // console.log('message:', message)

    const data = await Message.createMessage({ _id, conversationId, message })
    console.log('data:', data)
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