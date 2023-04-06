const User = require('../services/user.services')
const { comparePassword } = require('../utils/crypto')
const RecoveryPassword = require('../models/recoveryPassword.models')

const verifyUser = async(email, password) => {
  try {
    const user = await User.getUserByEmail(email)
    const compare = comparePassword(password, user.password)
    if(compare){
      return user
    } else {
      return null
    }
  } catch(error) {
    return null
  }
}

const createRecoveryToken = async(email) => {
  try {
    const user = await User.getUserByEmail(email)
    const data = await RecoveryPassword.create({
      user: user._id
    })
    return data
  } catch (error) {
    return null
  }
}


module.exports = {
  verifyUser, 
  createRecoveryToken
}