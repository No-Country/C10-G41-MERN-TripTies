const express = require('express')
const routesUsers = require('./user.router')
const routesProfiles = require('./profiles.router')
const routesFollows = require('./follow.router')
const routesLogin = require('../auth/auth.router')
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)
const routesConversation = require('../chat/chatRoutes/conversation.route')

const {
  postUser,
  getAllUsers,
} = require('../controllers/user.controller')
// const isOwner = require('../middlewares/isOwner.middleware')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/', routesLogin)
  router.post('/sign-up', postUser)
  router.get('/users', getAllUsers) //Only admins
  router.use('/user', routesUsers) //Only admins
  router.use('/profiles', routesProfiles) //Some restrictions
  router.use('/conversations', routesConversation) //fix all route 
  router.use('/follow', routesFollows)
}

module.exports = routerModels