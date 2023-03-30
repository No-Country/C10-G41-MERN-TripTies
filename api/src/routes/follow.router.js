const express = require('express')
const router = express.Router()

const {
  followUser
} = require('../controllers/follow.controller')


router.post('/', followUser)

module.exports = router