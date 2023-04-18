const Tag = require('../models/tag.model')
const Post = require('../models/post.models')

const findAllTags = async () => {
  // const skip = (page - 1) * limit;
  const tags = await Tag.find().select('posts number tag').lean()
  return { tags }
}

const createTag = async (postId, tags) => {
  let postID = await Post.findOne({ _id: postId })
  await tags.map(async (element) => {
    let tagID = await Tag.findOne({ tag: element })

    if (!tagID) {
      const data = await Tag.create({
        posts: postID,
        tag: element,
      })
      return data
    } else {
      const tagCreated = await Tag.findOne({ tag: element })
      tagCreated.posts.push(postID)
      tagCreated.number = tagCreated.posts.length
      await tagCreated.save()
      return tagCreated
    }
  })
}

module.exports = { findAllTags, createTag }
