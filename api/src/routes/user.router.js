const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

const {
  putProfile, 
  deleteUser, 
  getProfile
} = require('../controllers/user.controller')


router.get('/:userId', getProfile)
router.delete('/:userId', deleteUser)
router.put('/:userId/profile', passport.authenticate('jwt', {session: false}), putProfile)

module.exports = router