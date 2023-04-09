const express = require('express')
const { postLogin, postRecoveryToken, patchPassword } = require('./auth.controller')
const routes = express.Router()

routes.post('/login', postLogin)
routes.post('/recovery-password', postRecoveryToken)
routes.patch('/recovery-password/:userId', patchPassword)


module.exports = routes