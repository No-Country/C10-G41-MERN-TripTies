const express = require('express')
const { postLogin } = require('./auth.controller')
const routes = express.Router()

routes.post('/login', postLogin)


module.exports = routes