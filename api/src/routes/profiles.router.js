const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)
const isOwner = require('../middlewares/isOwner.middleware')
const { multerProfilePhotos } = require('../middlewares/multer.middleware')

const {
  putProfile, 
  getAllProfiles,
  getProfile,
} = require('../controllers/profile.controller')

router.get('/all', passport.authenticate('jwt', {session: false}), getAllProfiles)
router.get('/:profileId', getProfile)  
router.put('/:userId/editProfile', passport.authenticate('jwt', {session: false}), isOwner, multerProfilePhotos, putProfile) //Fix put service. Dont save the information
module.exports = router