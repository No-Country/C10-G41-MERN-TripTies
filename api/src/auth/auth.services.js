const User = require('../services/user.services')
const { comparePassword } = require('../utils/crypto')

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


module.exports = {
  verifyUser
}