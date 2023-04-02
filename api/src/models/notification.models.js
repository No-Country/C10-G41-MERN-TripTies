const { Schema, model } = require('mongoose')

const NotificationSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String,required: true},
    type_notification_id: {type: String}
  }
)

module.exports = model('Notification', NotificationSchema)