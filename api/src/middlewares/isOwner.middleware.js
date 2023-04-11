const User = require('../services/user.services')

async function isOwner(req, res, next) {
  const authenticatedUserId = req.user._id
  const userId = req.params.userId

  try {
    const user = await User.findUserById(userId)
    if (!user) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    const profileOwnerId = user._id

    if (authenticatedUserId == profileOwnerId) {
      // The authenticated user is the owner of the profile, so we allow the request to continue
      next()
    } else {
      // The authenticated user is not the owner of the profile, so we return an error message
      return res.status(403).json({ message: 'You do not have permission to perform this action' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error' })
  }
}


module.exports = isOwner