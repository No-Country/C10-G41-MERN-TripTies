const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)
const isOwner = require('../middlewares/isOwner.middleware')
const routesConversation = require('../chat/chatRoutes/conversation.route')

const {
  putProfile, 
  getAllProfiles,
  getProfile,
} = require('../controllers/profile.controller')

router.get('/all', passport.authenticate('jwt', {session: false}), getAllProfiles)
router.get('/:profileId', getProfile)  
router.put('/:profileId/editProfile', passport.authenticate('jwt', {session: false}), isOwner, putProfile) //Fix put service. Dont save the information
router.use('/:profileId/conversations', passport.authenticate('jwt', {session: false}), routesConversation)

module.exports = router