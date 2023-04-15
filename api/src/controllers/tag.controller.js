const Tag = require("../services/tag.services");

const getAllTags = async (req, res, next) => {
  try {
    // const page = parseInt(req.query.page);
    // const limit = parseInt(req.query.limit);
    const { tags } = await Tag.findAllTags();

    res.status(200).json({
      tags,
    });
  } catch (err) {
    next(err);
  }
};

const postTag = async (req, res, next) => {
  // const info = req.body;
  // console.log(info);
  // Tag.createTag(info);
  // .then((data) => {
  //   res.status(200).json(data);
  // })
  // .catch((err) => {
  //   res.status(400).json({
  //     message: err.message,
  //     fields: {
  //       content: "String",
  //       images: "req.files",
  //       location: "point/coordinates",
  //       reported: "Number",
  //       rating: "Number",
  //     },
  //   });
  // });
};

module.exports = { getAllTags, postTag };
