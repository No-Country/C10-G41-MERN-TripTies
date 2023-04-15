const express = require("express");
const router = express.Router();
const {
  getAllTags,
  postTag,
  getTags,
} = require("../controllers/tag.controller");

router.get("/", getAllTags);
router.post("/createTag", postTag);
module.exports = router;
