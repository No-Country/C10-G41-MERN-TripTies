const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../middlewares/auth.middleware")(passport);
const isOwner = require("../middlewares/isOwner.middleware");

const {
  deleteUser,
  getUserById,
  getAllUsers,
} = require("../controllers/user.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");

router.get("/", passport.authenticate("jwt", { session: false }), getAllUsers); //Only admins

router
  .route("/:userId")
  .get(passport.authenticate("jwt", { session: false }), getUserById)
  .delete(isOwner, deleteUser);

module.exports = router;
