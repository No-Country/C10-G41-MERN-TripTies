const {
  createComment,
  findComments,
  changeComment,
  removeComment,
} = require('../services/comment.services')

const postComment = (req, res) => {
  const user_id = req.userToken._id
  const post_id = req.baseUrl.split('/')[4]
  const { parent_id, content } = req.body
  createComment({ user_id, parent_id, content, post_id })
    .then((response) => {
      res.status(201).json(response)
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
        fields: {
          parent_id: 'String-Optional',
          content: 'String',
        },
      })
    })
}

const getComments = (req, res, next) => {
  const post_id = req.baseUrl.split('/')[4]
  findComments(post_id)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      next(err)
    })
}

const updateComment = (req, res) => {
  const id = req.body.id
  const user_id = req.userToken._id
  changeComment(id, user_id)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
        fields: {
          id: 'String',
          user_id: 'String',
          reposted: 'Bool',
        },
      })
    })
}

const deleteComment = (req, res, next) => {
  const { id } = req.body
  removeComment(id)
    .then(() => {
      res.status(204).json({ message: 'Comment deleted succesfully ', id })
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = {
  postComment,
  getComments,
  updateComment,
  deleteComment,
}
