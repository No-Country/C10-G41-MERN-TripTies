const Tag = require('../services/tag.services')

const getAllTags = async (req, res, next) => {
  try {
    // const page = parseInt(req.query.page);
    // const limit = parseInt(req.query.limit);
    const { tags } = await Tag.findAllTags()

    res.status(200).json({
      tags,
    });
  } catch (err) {
    next(err)
  }
};

const postTag = async (req, res) => {
  const info = req.body
  Tag.createTag(info)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
        fields: {
          tag: 'String'
        },
      })
    })
}

module.exports = { getAllTags, postTag }
