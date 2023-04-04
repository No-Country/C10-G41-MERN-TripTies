const User = require('../services/user.services')
// const CustomError = require('../utils/error-handler')

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
      throw new Error(404, 'User not found')
    }
    res.status(200).json({ user })
  } catch (error) {
    next(error)
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


module.exports = {
  postUser,
  getAllUsers, 
  getUserById, 
  deleteUser
}