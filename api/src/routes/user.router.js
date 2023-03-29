const express = require('express')
const router = express.Router()

const {
  getUser,
  updateProfile, 
  deleteUser,
  getUserByNick
} = require('../controllers/user.controller')


router.get('/:userId', getUser)
router.get('/:username', getUserByNick)
router.patch('/:userId/profile', updateProfile)
router.delete('/:userId', deleteUser)

module.exports = router