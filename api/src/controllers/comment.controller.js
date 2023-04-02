const { createComment, findComments, changeComment, removeComment } = require('../services/comment.services')

const postComment = (req, res) => {
  const { user_id, content } = req.body
  createComment({ user_id, content })
    .then((response) => {
      res.status(201).json(response)
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message, fields: {
          user_id: 'String',
          content: 'String'
        }
      })
    })
}

const getComments = (req, res) => {
  findComments()
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message
      })
    })
}

const updateComment = (req, res) => {
  changeComment(req.body)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message, fields: {
          user_id: 'String',
          reposted: 'Bool'
        }
      })
    })
}

const deleteComment = (req, res) => {
  const { id } = req.body
  removeComment(id)
    .then(() => {
      res.status(204)
    })
}

module.exports = {
  postComment,
  getComments,
  updateComment,
  deleteComment,
}
