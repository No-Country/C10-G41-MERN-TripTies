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
const { deleteUser } = require('../controllers/user.controller')

router.get('/', getAllUsersWithProfile)

router
  .route('/:userId')
  .get(getProfile)
  .put(passport.authenticate('jwt', { session: false }), putUserProfile)
  .delete(passport.authenticate('jwt', { session: false }), deleteUser)

router
  .route('/:followingId/follow')
  .post(passport.authenticate('jwt', { session: false }), followUser)

router
  .route('/:userId/follow/:followingId')
  .post(passport.authenticate('jwt', { session: false }), followUser)

module.exports = router
