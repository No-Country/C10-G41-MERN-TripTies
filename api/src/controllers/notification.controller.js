const {
  createNotification,
  findNotifications,
} = require('../services/Notification.services')

const postNotification = (req, res) => {
  const { user_id, content, type_notification } = req.body
  createNotification({ user_id, content, type_notification })
    .then((response) => {
      res.status(201).json(response)
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
        fields: {
          user_id: 'String',
          content: 'String',
          type_notification: 'String',
        },
      })
    })
}

const getNotifications = (req, res) => {
  findNotifications()
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      })
    })
}

module.exports = {
  postNotification,
  getNotifications,
}
