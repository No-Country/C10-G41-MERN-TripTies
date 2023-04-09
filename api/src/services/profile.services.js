const Profile = require('../models/profiles.models')
const User = require('../models/users.models')
const  mongoose = require('mongoose')


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
    return profile
  } catch (error) {
    throw Error('Not found Profile', 404, 'Not Found')
  }
}

const editUserProfile = async (userId, userData) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  console.log(userId, userData)

  try {
    const user = await User.findById(userId).session(session)
    const  profile  = await Profile.findOne({ user: userId }).session(session)

    // console.log(user)
    // console.log(profile)

    if (!user) {
      throw new Error('Not found user', 404, 'Not Found')
    }

    if (!profile) {
      throw new Error('Not found profiles', 404, 'Not Found')
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          photo: userData.photo
        }
      },
      { new: true, session }
    )

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          description: userData.profile.description,
          birthday: userData.profile.birthday,
          portrait: userData.profile.portrait
        }
      },
      { new: true, session }
    )

    await session.commitTransaction()
    session.endSession()

    return { updatedUser, updatedProfile }
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    throw err
  }
}

module.exports = {
  findProfile,
  findAllProfiles,
  editUserProfile
}