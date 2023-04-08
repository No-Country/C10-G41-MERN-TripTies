const mongoose = require('mongoose')
const Profile = require('../services/profile.services')
const User = require('../services/user.services')


// const putProfile = async(req, res) => {
//   const { userId } = req.params
//   const {first_name, last_name, photo, description, birthday, portrait } = req.body

//   try {
//     const updatedProfile = await Profile.editProfile(userId, {first_name, last_name, photo, description, birthday, portrait })
//     res.status(200).json({ profile: updatedProfile })
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }


// const putProfile = async (req, res) => {
//   const { profileId } = req.params
//   const { first_name, last_name, photo, description, birthday, portrait } = req.body

//   // console.log('profile Id:', profileId)
//   // console.log('req:', req.body)

//   try {
//     const updatedProfile = await Profile.editProfile(profileId, { first_name, last_name, photo, description, birthday, portrait })
//     console.log('profile Id:', profileId)
//     console.log('data:', first_name, last_name, photo, description, birthday, portrait)
//     console.log('updatedProfile:', updatedProfile)
//     if (!updatedProfile) {
//       console.log('Profile not updated')
//       return res.status(400).json({ message: 'Failed to update profile' })
//     }
//     console.log('Profile updated successfully')
//     return res.status(200).json({ profile: updatedProfile })
//   } catch (error) {
//     return res.status(500).json({ message: error.message })
//   }
// }


// const putProfile = async (req, res) => {
//   let { profileId } = req.params
//   let { first_name, last_name, photo, description, birthday, portrait } = req.body
  
//   try {
//     if (first_name, last_name, photo, description, birthday, portrait) {
//       console.log(profileId, {first_name, last_name, photo, description, birthday, portrait})
//       const data = await Profile.editProfile(profileId, { first_name, last_name, photo, description, birthday, portrait })
//       res.status(200).json(data)
//     }
//   } catch (err) {
//     res.status(400).json({
//       message: err.message, fields: {
//         username: 'STRING',
//         profile: {
//           first_name: 'String',
//           last_name: 'String',
//           photo: 'String',
//           description: 'String',
//           birthday: 'DATE',
//           portrait: 'String'
//         }
//       }
//     })
//   }
// }

const putProfile = async (req, res) => {
  const userId = req.params.userId
  const {description, birthday, portrait} = req.body

  // console.log(userId)
  // console.log(first_name, last_name, photo)

  try {
    const user = await User.findUserById(userId)
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const profile = await Profile.findOne({ user: userId })
    console.log(userId)
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    profile.description = description || profile.description
    profile.birthday = birthday || profile.birthday
    profile.portrait = portrait || profile.portrait

    const updatedProfile = await profile.save()

    return res.status(200).json({ profile: updatedProfile })
  } catch (error) {
    return res.status(500).json({ message: 'Server error' })
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