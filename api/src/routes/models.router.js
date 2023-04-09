const express = require('express')
const routesUsers = require('./user.router')
const routesProfiles = require('./profiles.router')
const routesComments = require('./comment.router')
const routesFollows = require('./follow.router')
const routesLogin = require('../auth/auth.router')
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)
const routesConversation = require('../chat/chatRoutes/conversation.route')

const {
  postUser,
  getAllUsers,
} = require('../controllers/user.controller')
const isAdmin = require('../middlewares/isAdmin.middleware')
// const isOwner = require('../middlewares/isOwner.middleware')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/auth', routesLogin)
  router.post('/sign-up', postUser)

  router.get('/users', passport.authenticate('jwt', {session: false}), isAdmin, getAllUsers) //Only admins
  router.use('/user', routesUsers) //Only admins
  router.use('/profiles', routesProfiles) //Some restrictions
  router.use('/conversations', routesConversation) //fix all route 
  router.use('/follow', routesFollows)

  router.use('/user', routesUsers)

  // TODO : change after publication's logic is ready
  // router.use('/:publicationId/comments', routesComments)
  router.use('/comments', routesComments)


  router.use

}

module.exports = routerModels