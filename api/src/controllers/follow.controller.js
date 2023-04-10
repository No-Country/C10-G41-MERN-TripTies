const Follow = require('../services/follow.services')

async function followUser(req, res, next) {
  try {
    const followerId = req.user._id
    const { followingId } = req.params
    const newFollow = await Follow.followUser(followerId, followingId)
    res.status(200).json(newFollow)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getFollowers = (req, res) => {
  const userId = req.user._id
  Follow.findFollowers(userId)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const getFollowings = (req, res) => {
  const userId = req.user._id
  Follow.findFollowings(userId)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}


module.exports = {
  followUser,
  getFollowers,
  getFollowings
}
