const User = require('../services/user.services')

const isAdmin = async (request, response, next) => {
  const id = request.user._id
  User.getUserInformation(id)
    .then(data => {
      if (data.role == 'ADMIN') {
        next()
      }
      else {
        response.status(400).json({ message: 'Only admins have access' })
      }
    })
    .catch(err => response.status(400).json({ message: err.message })
    )
}
module.exports = isAdmin