const express = require("express");
const router = express.Router();
const passport = require("passport");
const routesComments = require("./comment.router");
require("../middlewares/auth.middleware")(passport);

const {
  postNewPost,
  getAllPosts,
  getPostById,
  putPost,
  postLikeByPost,
} = require("../controllers/post.controller");
const { multerPublicationsPhotos } = require("../utils/multer");

router
  .route("/")
  .get(getAllPosts)
  .post(
    passport.authenticate("jwt", { session: false }),
    multerPublicationsPhotos.array("image", 3),
    postNewPost
  );

router
  .route("/:postId")
  .get(passport.authenticate("jwt", { session: false }), getPostById)
  .put(passport.authenticate("jwt", { session: false }), putPost);

router.use("/:postId/comments", routesComments);

router
  .route("/:postId/like")
  .post(passport.authenticate("jwt", { session: false }), postLikeByPost);

module.exports = router;
