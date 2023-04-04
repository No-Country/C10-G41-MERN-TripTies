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

const findProfile = async (profileId) => {  
  try {
    // Buscamos el perfil del usuario por su ID y lo retornamos
    // const profile = await Profile.findById(id, '_id', 'user').lean()
    const profile = await Profile.findById(profileId)
    return profile
  } catch (error) {
    throw Error('Not found Profile', 404, 'Not Found')
  }
}


const editProfile = async (userId, updatedFields) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // Buscamos el perfil del usuario por su ID y lo actualizamos
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      updatedFields,
      { new: true, session }
    ).session(session)
    await session.commitTransaction()
    return updatedProfile
  } catch (error) {
    await session.abortTransaction()
    throw new Error(`Error updating user profile: ${error.message}`)
  } finally {
    session.endSession()
  }
}

module.exports = {
  findProfile,
  findAllProfiles,
  editProfile
}