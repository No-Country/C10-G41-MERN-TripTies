const mongoose = require('mongoose')
const User = require('../models/users.models')
const Profile = require('../models/profiles.models')

const CustomError = require('../utils/error-handler')
const { hash } = require('../utils/crypto')


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

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email })
      .then(user => {
        resolve(user)
      })
      .catch(err => {
        reject(err)
      })
  })
}


const createUser = async (userData) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // Crear nuevo usuario con campos obligatorios
    const user = new User({
      username: userData.username,
      email: userData.email,
      password: hash(userData.password),
    })
    // Guardar usuario en la base de datos
    await user.save({ session })
    // Crear nuevo perfil vacío asociado al usuario
    const profile = new Profile({
      user: user._id,
      photo: '',
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

const getProfile = async (userId) => {
  try {
    // Buscamos el perfil del usuario por su ID y lo retornamos
    const profile = await Profile.findOne({ user: userId }, '-_id -user').lean()

    return profile
  } catch (error) {
    throw new CustomError('Not found Profile', 404, 'Not Found')
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


const removeUser = async (userId) => {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .then(user => {
        if (!user) {
          reject(new Error(`User with the id was not found ${userId}`))
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
  getUserByEmail,
  createUser,
  getProfile,
  removeUser,
  editProfile
}