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

const findProfileById = async (id) => {
  try {
    // Buscamos el perfil del usuario por su ID y lo retornamos
    const profile = await Profile.findById(id)
    return profile
  } catch (error) {
    throw Error('Not found Profile', 404, 'Not Found')
  }
}

const findProfileByUser = async (userId) => {
  try {
    // Buscamos el perfil del usuario por su ID y lo retornamos
    const profile = await Profile.findOne({ user: userId})
    return profile
  } catch (error) {
    throw Error('Not found Profile', 404, 'Not Found')
  }
}


const editUserProfile = async(userId, profileData) => {
  try {
    const profile = await Profile.findOne({ user: userId })
    if (!profile) {
      return null
    }
    console.log('still running?:')
    profile.description = profileData.description || profile.description
    profile.birthday = profileData.birthday || profile.birthday
    profile.portrait = profileData.portrait || profile.portrait
    
    const profileUpdated = await profile.save()
    return profileUpdated
  } catch (error) {
    throw new Error(error.message)
  }
}


module.exports = {
  findProfileById,
  findProfileByUser,
  findAllProfiles,
  editUserProfile
}