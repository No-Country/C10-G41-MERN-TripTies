const express = require('express')
const routesUsers = require('./user.router')
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

function routerModels(app){
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/', routesLogin)
  router.post('/sign-up', postUser)
  router.use('/user', routesUsers)
  router.get('/users', passport.authenticate('jwt', {session: false}), getAllUsers)
  // TODO : change after publication's logic is ready
  // router.use('/:publicationId/comments', routesComments)
  router.use('/comments', routesComments)
  router.use('/follow', passport.authenticate('jwt', {session: false}, routesFollows))
  router.use('/conversations', passport.authenticate('jwt', {session: false}), routesConversation)

  router.use
}

module.exports = routerModels