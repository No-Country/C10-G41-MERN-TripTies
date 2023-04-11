const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../middlewares/auth.middleware")(passport);

const {
  postNewPost,
  getAllPosts,
  getPostById,
  putPost,
  postLikeByPost,
} = require("../controllers/post.controller");

router
  .route("/")
  .get(getAllPosts)
  .post(passport.authenticate("jwt", { session: false }), postNewPost);

router
  .route("/:postId")
  .get(passport.authenticate("jwt", { session: false }), getPostById)
  .put(passport.authenticate("jwt", { session: false }), putPost);

router
  .route("/:postId/like")
  .post(passport.authenticate("jwt", { session: false }), postLikeByPost);

module.exports = router;
