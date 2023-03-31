const express = require('express')
const routesUsers = require('./user.router')
const routesFollows = require('./follow.router')
const routesLogin = require('../auth/auth.router')
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

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
  router.use('/follow', routesFollows)

  router.use
}

module.exports = routerModels