const User = require('../services/user.services')

async function isOwner(req, res, next) {
  const authenticatedUserId = req.user._id
  const profileId = req.params.profileId

  console.log(authenticatedUserId, profileId)

  try {
    const profile = await User.getProfile(profileId)

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    const profileOwnerId = profile.user._id

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