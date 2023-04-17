<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../middlewares/auth.middleware")(passport);
=======
const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

>>>>>>> 872acd81412717d5ec42cd0b0efe5b57df5c36b7
const {
  getProfile,
  getAllUsersWithProfile,
  putUserProfile,
<<<<<<< HEAD
} = require("../controllers/profile.controller");
const { followUser } = require("../controllers/follow.controller");
=======
} = require('../controllers/profile.controller')
const { followUser } = require('../controllers/follow.controller')
const { deleteUser } = require('../controllers/user.controller')
>>>>>>> 872acd81412717d5ec42cd0b0efe5b57df5c36b7

router.get("/", getAllUsersWithProfile);

<<<<<<< HEAD
router
  .route("/:userId")
  .get(getProfile)
  .put(passport.authenticate("jwt", { session: false }), putUserProfile);

router
  .route("/:userId/follow/:followingId")
  .post(passport.authenticate("jwt", { session: false }), followUser);

router
  .route("/:userId/follow/:followingId")
  .post(passport.authenticate("jwt", { session: false }), followUser);
=======
router.route('/:userId')
  .get(getProfile) 
  .put(passport.authenticate('jwt', {session: false}), putUserProfile)
  .delete(passport.authenticate('jwt', {session: false}), deleteUser)
  
router.route('/:followingId/follow')
  .post(passport.authenticate('jwt', {session: false}), followUser)
>>>>>>> 872acd81412717d5ec42cd0b0efe5b57df5c36b7

router
  .route("/:userId/follow/:followingId")
  .post(passport.authenticate("jwt", { session: false }), followUser);

module.exports = router;
