const mongoose = require('mongoose')
const Follow = require('../models/follows.models')
const User = require('../models/users.models')

const followUser = async (followerId, followingId) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const follower = await User.findById(followerId).session(session)
    const following = await User.findById(followingId).session(session)
    if (!follower || !following) {
      throw new Error('Follower or following user not found')
    }
    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: followingId,
    }).session(session)
    if (existingFollow) {
      await Follow.findOneAndRemove({
        following: followingId,
      })
    } else {
      const newFollow = new Follow({
        follower: followerId,
        following: followingId,
      })
      await newFollow.save({ session })
      await session.commitTransaction()
      return newFollow
    }
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const findFollowers = async (userId) => {
  const data = await Follow.find({ following: userId })
    .populate('follower', '_id username first_name last_name')
    .lean()
    .exec()
  return data.map((item) => item.follower)
}

const findFollowings = async (userId) => {
  const data = await Follow.find({ follower: userId })
    .populate('following', '_id username first_name last_name')
    .lean()
    .exec()
  return data.map((item) => item.following)
}

module.exports = {
  followUser,
  findFollowers,
  findFollowings,
}
