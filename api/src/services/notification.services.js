const Notification = require('../models/Notification.models')

const createNotification = async (NotificationData) => {
  const newNotification = new Notification(NotificationData)
  await newNotification.save()
  return newNotification
}

const findNotifications = async () => {
  const Notifications = await Notification.find({})
  return Notifications
}

module.exports = {
  createNotification,
  findNotifications,
}