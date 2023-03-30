const followService = require('../services/follow.services')

async function followUser(req, res, next) {
  try {
    const { followerId, followingId } = req.body
    const newFollow = await followService.followUser(followerId, followingId)
    res.status(200).json(newFollow)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  followUser
}
