const mongoose = require('mongoose')
const Profile = require('../models/profiles.models')

const findAllProfiles = () => {
  return new Promise((resolve, reject) => {
    Profile.find()
      .then(profiles => {
        resolve(profiles)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const findProfile = async (userId) => {
  try {
    // Buscamos el perfil del usuario por su ID y lo retornamos
    const profile = await Profile.findById(userId)
    console.log(profile)
    return profile
  } catch (error) {
    throw Error('Not found Profile', 404, 'Not Found')
  }
}


const editUserProfile = async(userId, updatedProfile) => {
  try {
    const profile = await Profile.findOne({ user: userId })
    if (!profile) {
      return null
    }
    profile.description = updatedProfile.description || profile.description
    profile.birthday = updatedProfile.birthday || profile.birthday
    profile.portrait = updatedProfile.portrait || profile.portrait

    const updatedProfile = await profile.save()
    return updatedProfile
  } catch (error) {
    throw new Error(error.message)
  }
}


module.exports = {
  findProfile,
  findAllProfiles,
  editUserProfile
}