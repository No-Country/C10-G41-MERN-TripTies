const { default: mongoose } = require('mongoose')
const Profile = require('../models/profiles.models')
const User = require('../models/users.models')

const PAGE_SIZE = 5

const findAllUsersWithProfile = async (page) => {
  const skip = (page - 1) * PAGE_SIZE
  const limit = PAGE_SIZE

  const usersWithProfile = await User.aggregate([
    {
      $lookup: {
        from: 'profiles',
        localField: '_id',
        foreignField: 'user',
        as: 'profile'
      }
    },
    {
      $project: {
        _id: 1,
        username: 1,
        first_name: 1,
        last_name: 1,
        photo: { $arrayElemAt: ['$profile.portrait', 0] },
        description: { $arrayElemAt: ['$profile.description', 0] },
        birthday: { $arrayElemAt: ['$profile.birthday', 0] }
      }
    },
    {
      $skip: skip
    },
    {
      $limit: limit
    }
  ])

  return usersWithProfile
}
const findProfile = async (userId) => {
  try {
    // Buscamos el perfil del usuario por su ID y lo retornamos

    const user = await User.findById(userId)
    const profile = await Profile.findOne({ user: userId })
    const userProfile = { profile, ...user }
    return userProfile
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
  // findAllProfiles,
  findAllUsersWithProfile,
  editUserProfile
}