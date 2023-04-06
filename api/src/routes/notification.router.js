const router = require('express').Router()

const notificationController = require('../controllers/notification.controller')

router.route('/')
  .post(notificationController.postNotification)
  

router.route('/')
  .get(notificationController.getNotification)
  
  

module.exports = router