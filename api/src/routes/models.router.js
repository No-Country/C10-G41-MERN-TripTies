const express = require('express')
const routesUsers = require('./user.router')

const {
  postUser, 
  getAllUsers,
} = require('../controllers/user.controller')

function routerModels(app){
  const router = express.Router()

  app.use('/api/v1', router)

  router.post('/sign-up', postUser)
  router.use('/user', routesUsers)
  router.get('/users', getAllUsers)

  router.use
}

module.exports = routerModels