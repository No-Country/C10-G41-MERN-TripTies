const Profile = require('../services/profile.services')

const putUserProfile = async (req, res) => {
  let { userId } = req.params
  let { first_name, last_name, email, profile } = req.body

const putProfile = async (req, res) => {
  const userId = req.params.userId
  const {description, birthday, portrait} = req.body

  try {
    const user = await User.findUserById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const profileData = {description, birthday, portrait}
    const updatedProfile = await Profile.editUserProfile(userId, profileData)
    return res.status(200).json({ profile: updatedProfile })
  } catch (error) {
    return res.status(500).json({ message: 'Server error' })
  }
}

const getProfile = async (req, res, next) => {
  const { userId } = req.params
  try {
    const profile = await Profile.findProfileById(profileId)
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    const { username, first_name, last_name, photo } = profile._doc
    const { description, birthday, portrait } = profile.profile
    return res.status(200).json({ username, first_name, last_name, photo, description, birthday, portrait })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getAllUsersWithProfile = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const users = await Profile.findAllUsersWithProfile(page)
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}


module.exports = {
  getProfile,
  getAllUsersWithProfile,
  putUserProfile
}