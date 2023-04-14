const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

const {
  getProfile,
  getAllUsersWithProfile,
  putUserProfile,
} = require('../controllers/profile.controller')
const { followUser } = require('../controllers/follow.controller')

router.get('/', getAllUsersWithProfile)

router.route('/:userId')
  .get(getProfile) 
  .put(passport.authenticate('jwt', {session: false}), putUserProfile)
  
router.route('/:userId/follow/:followingId')
  .post(passport.authenticate('jwt', {session: false}), followUser)

module.exports = router