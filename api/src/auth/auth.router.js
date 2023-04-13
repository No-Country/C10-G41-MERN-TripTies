const express = require('express')
const {
  postLogin,
  postLoginSocialNetwork,
  postRecoveryToken,
  patchPassword,
} = require('./auth.controller')
const { postUser } = require('../controllers/user.controller')
const router = express.Router()

router.post('/sign-up', postUser)
router.post('/login', postLogin)
router.post('/loginSocial', postLoginSocialNetwork)
router.post('/recovery-password', postRecoveryToken)
router.patch('/recovery-password/:userId', patchPassword)

module.exports = router
