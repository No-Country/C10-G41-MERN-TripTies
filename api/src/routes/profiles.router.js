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
const isOwner = require('../middlewares/isOwner.middleware')

router.get('/', getAllUsersWithProfile)

router.route('/:userId')
  .get(getProfile) 
  .put(isOwner, putUserProfile)
  
router.route('/:userId/follow/:followingId')
  .post(isOwner, followUser)

module.exports = router