const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

const {
  getAllProfiles,
  getProfile,
} = require('../controllers/profile.controller')

router.get('/', getAllProfiles)
router.get('/:profileId', getProfile)  
module.exports = router