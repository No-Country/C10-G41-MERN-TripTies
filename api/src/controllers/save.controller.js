const User = require('../services/save.service')

const save = async (req, res) => {
  const { postId, userId } = req.body
  User.savePublications(postId, userId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ message: err.message }))
}

const getAllSave = async (req, res, next) => {
  const { userId } = req.params
  try {
    const user = await User.getPulicationsSave(userId)
    if (!user) {
      throw new Error(404, 'User not found')
    }

    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

module.exports = { save, getAllSave }
