const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

const { getFollowers, getFollowings } = require('../controllers/follow.controller')


router.get('/followers', passport.authenticate('jwt', {session: false}), getFollowers)
router.get('/following', passport.authenticate('jwt', {session: false}), getFollowings)

module.exports = router