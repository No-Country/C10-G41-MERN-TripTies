const User = require('../services/user.services')

// const postUser = (req, res) => {
//   const { username, password, email } = req.body
//   User.createUser({ username, password, email })
//     .then(response => {
//       res.status(201).json(response)
//     })
//     .catch((err) => {
//       res.status(400).json({
//         message: err.message, fields: {
//           username: 'String',
//           email: 'example@example.com',
//           password: 'String'
//         }
//       })
//     })
// }

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


const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params

    const user = await User.getUserOr404(userId)

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}


const getUserByNick = async (req, res, next) => {
  const username = req.params.username

  try {
    const user = await User.getUserByUsername(username)
    if (!user) {
      return res.status(404).json({ message: `User with username ${username} not found` })
    }
    res.json(user)
  } catch (err) {
    next(err)
  }
}


const updateProfile = (req, res) => {
  const {userId} = req.params
  const profileData = req.body

  updateProfile(userId, profileData)
    .then(updatedProfile => {
      res.status(200).json(updatedProfile)
    })
    .catch(error => {
      res.status(500).json({
        error: error.message, fields: {
          photo: 'String', 
          birthday: 'Date',
          description: 'String',
          portrait: 'String'
        }
      })
    })
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
  getUser,
  getUserByNick,
  deleteUser,
  updateProfile
}