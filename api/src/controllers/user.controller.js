const { createUser } = require('../services/user.services')

const postUser = (req, res) => {
  const { username, password, email } = req.body
  createUser({ username, password, email })
    .then(response => {
      res.status(201).json(response)
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message, fields: {
          username: 'String',
          email: 'example@example.com',
          password: 'String'
        }
      })
    })
}

module.exports = {
  postUser
}