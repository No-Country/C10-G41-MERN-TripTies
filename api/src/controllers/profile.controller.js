const Profile = require('../services/profile.services')

const putUserProfile = async (req, res) => {
  let { userId } = req.params
  let { first_name, last_name, email, profile } = req.body

  if (profile) {
    await Profile.editUserProfile(userId, {
      first_name,
      last_name,
      email,
      profile,
    })
      .then((data) => res.status(200).json(data))
      .catch((err) =>
        res.status(400).json({
          message: err.message,
          fields: {
            first_name: 'String',
            last_name: 'String',
            email: 'String',
            profile: {
              description: 'String',
              birthday: 'Date',
              portrait: 'String',
            },
          },
        })
      )
  } else {
    await Profile.editUserProfile(userId, { first_name, last_name, email })
      .then((data) => res.status(200).json(data))
      .catch((err) =>
        res.status(400).json({
          message: err.message,
          fields: {
            first_name: 'String',
            last_name: 'String',
            email: 'String',
            profile: {
              description: 'String',
              birthday: 'Date',
              portrait: 'String',
            },
          },
        })
      )
  }
}

const getProfile = async (req, res, next) => {
  const { userId } = req.params

  try {
    const profile = await Profile.findProfile(userId)
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    const { username, first_name, last_name, photoUser } = profile._doc
    const { description, birthday, portrait } = profile.profile
    return res.status(200).json({
      username,
      first_name,
      last_name,
      photoUser,
      description,
      birthday,
      portrait,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getAllUsersWithProfile = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    
    const data = await Profile.findAllUsersWithProfile( page, limit )
    res.status(200).json({
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getProfile,
  getAllUsersWithProfile,
  putUserProfile,
}
