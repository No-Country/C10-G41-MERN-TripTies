const User = require('../services/user.services')
const { comparePassword } = require('../utils/crypto')
const RecoveryPassword = require('../models/recoveryPassword.models')
const { hash } = require('../utils/crypto')

const verifyUser = async (email, password) => {
  try {
    const user = await User.getUserByEmail(email)
    const compare = comparePassword(password, user.password)
    if (compare) {
      return user
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

const verifyUserSocial = async (username) => {
  const user = await User.getUserByUsername(username)
  if (user) {
    return user
  }
}

const createRecoveryToken = async (email) => {
  try {
    const user = await User.getUserByEmail(email)
    const data = await RecoveryPassword.create({
      user: user.email,
    })
    return data
  } catch (error) {
    return null
  }
}

const changePassword = async (tokenId, newPassword) => {

  const recoveryData = await RecoveryPassword.findOne({
    _id: tokenId,
    used: false,
  })
  if (recoveryData) {
    await RecoveryPassword.updateOne({ $set: { used: true } })
    const data = await User.updateUser(recoveryData.user, {
      password: hash(newPassword),
    })
    return data
  } else {
    return Error
  }
}

module.exports = {
  verifyUser,
  createRecoveryToken,
  changePassword,
  verifyUserSocial,
}
