const User = require('../services/user.services')
const CustomError = require('../utils/error-handler')

const postUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    const user = await User.createUser({ username, email, password })
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

const getAllUsers = (req, res, next) => {
  User.getAllUsers()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      next(err)
    })
}

const getUserById = async (req, res, next) => {
  const { userId } = req.params

  try {
    const user = await User.findUserById(userId)
    if (!user) {
      throw new CustomError(404, 'User not found')
    }
    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}


const putProfile = async(req, res) => {
  const { userId } = req.params
  const { photo, description, birthday, portrait } = req.body

  try {
    const updatedProfile = await User.editProfile(userId, { photo, description, birthday, portrait })
    res.status(200).json({ profile: updatedProfile })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteUser = (req, res, next) => {
  const { userId } = req.params

  User.removeUser(userId)
    .then(user => {
      res.status(200).json({ message: 'User deleted succesfully', user })
    })
    .catch((err) => {
      next(err)
    })
}


const getProfile = async (req, res, next) => {
  const { userId } = req.params
  try {
    const profile = await User.getProfile(userId)
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    return res.status(200).json({ profile })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  postUser,
  getAllUsers, 
  getUserById,
  getProfile,
  putProfile, 
  deleteUser
}