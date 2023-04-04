const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)
const isOwner = require('../middlewares/isOwner.middleware')

const {
  deleteUser, 
  getUserById,
} = require('../controllers/user.controller')

router.get('/:userId', getUserById)
router.delete('/:userId', passport.authenticate('jwt', {session: false}), isOwner,deleteUser)

module.exports = router