const Profile = require('../services/profile.services')


const putProfile = async(req, res) => {
  const { userId } = req.params
  const { photo, description, birthday, portrait } = req.body

  try {
    const updatedProfile = await Profile.editProfile(userId, { photo, description, birthday, portrait })
    res.status(200).json({ profile: updatedProfile })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getProfile = async (req, res, next) => {
  const { profileId } = req.params
  try {
    const profile = await Profile.findProfile(profileId)
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