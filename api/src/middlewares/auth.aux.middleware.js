const jwt = require('jsonwebtoken')
const User = require('../services/user.services')
require('dotenv').config()

const getUserFromToken = async (request, response, next) => {
  const token = request.get('authorization')
  if (token && token.startsWith('JWT ')) {
    const decodedToken = jwt.verify(token.replace('JWT ', ''), process.env.JWT_SECRET)
    if (!decodedToken._id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findUserById(decodedToken._id)
    request.userToken = user
  } else {
    request.userToken = null
  }
  next()
}

module.exports = getUserFromToken