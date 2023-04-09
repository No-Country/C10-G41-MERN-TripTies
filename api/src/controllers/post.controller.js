const Post = require('../services/post.services')

const postNewPost = (req, res) => {
  const userId = req.user._id
  const { content } = req.body


  Post.createPost( userId, { content })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(400).json({
        message: err.message, fields: {
          content: 'String',
          media: [
            'type',
            'url',
            'description'
          ],
          location: 'point/coordinates',
          reported: 'Number'
        }
      })
    })
}

module.exports = {
  postNewPost
}