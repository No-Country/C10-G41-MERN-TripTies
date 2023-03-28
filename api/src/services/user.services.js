const User = require('../models/users.models')

const createUser = async (obj) => {
  const data = await User.create({
    username: obj.username, 
    email: obj.email, 
    password: obj.password, 
  })
  return data
}

module.exports = {
  createUser
}