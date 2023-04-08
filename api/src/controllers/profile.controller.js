const mongoose = require('mongoose')
const Profile = require('../services/profile.services')
const User = require('../services/user.services')


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
  const { profileId } = req.params
  try {
    const profile = await Profile.findProfileById(profileId)
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    return res.status(200).json({ profile })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getAllProfiles = (req, res, next) => {
  Profile.findAllProfiles()
    .then(profiles => {
      res.status(200).json(profiles)
    })
    .catch(err => {
      next(err)
    })
}


module.exports = {
  getProfile,
  getAllProfiles,
  putProfile
}