const express = require('express')
const routesUsers = require('./user.router')
const routesProfiles = require('./profiles.router')
const routesLogin = require('../auth/auth.router')
const routesPosts = require('./post.router')
const routesComments = require('./comment.router')
const routesFollows = require('./follow.router')
const routesConversation = require('../chat/chatRoutes/conversation.route')
const { getInfoUser } = require('../controllers/user.controller')
const routesTag = require("./tag.router");
const passport = require("passport");
require("../middlewares/auth.middleware")(passport);


function routerModels(app) {
  const router = express.Router();

  app.use("/api/v1", router);

  router.use('/auth', routesLogin)
  router.use('/user', routesUsers)
  router.get('/user-info', passport.authenticate('jwt', { session: false }), getInfoUser)
  router.use('/profiles', routesProfiles)
  router.use('/posts', routesPosts)
  router.use('/follow', routesFollows)
  router.use("/conversations", routesConversation);
  router.use("/tag", routesTag);



  // TODO : change after publication's logic is ready
  // router.use('/:publicationId/comments', routesComments)
  router.use("/comments", routesComments);
}

module.exports = routerModels;
