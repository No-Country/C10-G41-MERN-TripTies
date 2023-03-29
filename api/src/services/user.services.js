const mongoose = require('mongoose')
const User = require('../models/users.models')
const Profile = require('../models/profiles.models')

const CustomError = require('../utils/error-handler')


const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find()
      .then(users => {
        resolve(users)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const getUserOr404 = (_id) => {
  let user = User.findById(_id)

  if (!user) throw new CustomError('Not found User', 404, 'Not Found')

  return user
}

const getUserByUsername = async (username) => {
  const user = await User.findOne({ username: username })
  return user
}



const createUser = async (userData) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  
  try {
    // Crear nuevo usuario con campos obligatorios
    const user = new User({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    })

    // Guardar usuario en la base de datos
    await user.save({ session })

    // Crear nuevo perfil vacío asociado al usuario
    const profile = new Profile({
      user: user._id,
      description: '',
      birthday: '',
      portrait: ''
    })

    // Guardar perfil en la base de datos
    await profile.save({ session })

    // Completar la transacción
    await session.commitTransaction()
    session.endSession()

    return user
  } catch (error) {
    // Si hay un error, deshacer la transacción
    await session.abortTransaction()
    session.endSession()
    throw new Error(error.message)
  }
}



const editProfile = async (userId, profileData) => {
  const session = await mongoose.startSession()
  try {
    await session.withTransaction(async () => {
      const user = await User.findById(userId).session(session)
      if (!user) {
        throw new Error(`User with id ${userId} not found`)
      }

      const profile = await Profile.findById(user.profile).session(session)
      if (!profile) {
        throw new Error(`Profile for user with id ${userId} not found`)
      }

      // Update profile with new data
      profile.photo = profileData.photo
      profile.birthday = profileData.birthday
      profile.description = profileData.description
      profile.portrait = profileData.portrait
      await profile.save()

      return profile
    })
  } catch (error) {
    throw new Error(`Transaction failed: ${error.message}`)
  } finally {
    session.endSession()
  }
}




// const createUser = (userData) => {
//   return new Promise((resolve, reject) => {
//     mongoose.startSession()
//       .then(session => {
//         session.startTransaction()
//         const newUser = new User(userData)
//         newUser.save({ session })
//           .then(() => {
//             resolve(newUser)
//           })
//           .catch(err => {
//             reject(err)
//           })
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

const removeUser = async(userId) => {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .then(user => {
        if(!user) {
          reject(new Error(`No se encotró el usuario con el id ${userId}`))
        }
        return user.deleteOne()
      })
      .then(deletedUser => {
        resolve(deletedUser)
      })
      .catch((err) => {
        reject(err)
      })
  })  
}







module.exports = {
  getAllUsers,
  getUserOr404,
  getUserByUsername,
  createUser, 
  removeUser, 
  editProfile
}