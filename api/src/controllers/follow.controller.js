const followService = require('../services/follow.services')

async function followUser(req, res, next) {
  try {
    const   followerId   = req.user._id
    const { followingId } = req.params
    const newFollow = await followService.followUser(followerId, followingId)
    res.status(200).json(newFollow)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  followUser
}
