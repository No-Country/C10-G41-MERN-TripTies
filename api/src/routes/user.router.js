const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)
const isOwner = require('../middlewares/isOwner.middleware')

const {
  putProfile, 
  deleteUser, 
  getUserById,
  getAllProfiles
} = require('../controllers/user.controller')


router.get('/:userId', getUserById)
router.delete('/:userId', passport.authenticate('jwt', {session: false}), deleteUser)
router.get('/profiles', getAllProfiles)
router.put('/:profileId/profile', passport.authenticate('jwt', {session: false}), isOwner, putProfile)

module.exports = router