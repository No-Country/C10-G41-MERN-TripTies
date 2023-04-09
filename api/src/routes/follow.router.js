const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

const {
  followUser
} = require('../controllers/follow.controller')


router.get('/', followUser)

module.exports = router