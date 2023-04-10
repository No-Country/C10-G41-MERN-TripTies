const express = require('express')
const { postLogin, postRecoveryToken } = require('./auth.controller')
const routes = express.Router()

routes.post('/login', postLogin)
routes.post('/recovery-password', postRecoveryToken)


module.exports = routes