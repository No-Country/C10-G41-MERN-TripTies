const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)
const isOwner = require('../middlewares/isOwner.middleware')


const {
  deleteUser,
  getUserById,
} = require('../controllers/user.controller')
const { followUser } = require('../controllers/follow.controller')
const { multerProfilePhotos } = require('../middlewares/multer.middleware')
const { putProfile } = require('../controllers/profile.controller')

router.route('/:userId')
  .get(getUserById)
  .delete(passport.authenticate('jwt', { session: false }), isOwner, deleteUser)
  
router.put('/:userId/editProfile', passport.authenticate('jwt', {session: false}), isOwner, multerProfilePhotos, putProfile) //Fix put service. Dont save the information

router.route('/:userId/follow/:followingId')
  .post(passport.authenticate('jwt', { session: false }), isOwner, followUser)



module.exports = router