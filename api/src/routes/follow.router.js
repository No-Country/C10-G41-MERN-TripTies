const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../middlewares/auth.middleware")(passport);

const {
  getFollowers,
  getFollowings,
  followUser,
} = require("../controllers/follow.controller");

router.post(
  "/followUser",
  passport.authenticate("jwt", { session: false }),
  followUser
);

router.get(
  "/followers/:userId",
  passport.authenticate("jwt", { session: false }),
  getFollowers
);
router.get(
  "/following/:userId",
  passport.authenticate("jwt", { session: false }),
  getFollowings
);

module.exports = router;
