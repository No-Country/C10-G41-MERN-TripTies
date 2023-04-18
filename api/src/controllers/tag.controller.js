const Tag = require("../services/tag.services");

const getAllTags = async (req, res, next) => {
  try {
    const { tags } = await Tag.findAllTags();

    res.status(200).json({
      tags,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTags };
