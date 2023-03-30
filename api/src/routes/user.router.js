const express = require('express')
const router = express.Router()

const {
  putProfile, 
  deleteUser, 
  getProfile
} = require('../controllers/user.controller')


router.get('/:userId', getProfile)
router.delete('/:userId', deleteUser)
router.put('/:userId/profile', putProfile)

module.exports = router