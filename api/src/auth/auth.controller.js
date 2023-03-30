const jwt = require('jsonwebtoken')
const { verifyUser } = require('./auth.services')
require('dotenv').config()

const postLogin = (req, res) => {

  const { email, password } = req.body
  if (email && password) {
    verifyUser(email, password)
      .then(data => {
        if (data) {
          const token = jwt.sign({
            username: data.username,
            email: data.email 
          }, process.env.JWT_SECRET)
          res.status(200).json({message: 'Correct credentials', token })
        }
        else {
          res.status(400).json({ message: 'Invalid credentials' })
        }
      })
      .catch(err => res.status(400).json({message: err.message}))
  } 
  else {
    res.status(400).json({
      message: 'All parameters are required', fields: {
        email: 'example@mail.com',
        password: 'String'
      }
    })
  }
}

module.exports = {
  postLogin
}