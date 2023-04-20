const { default: mongoose } = require("mongoose");
const Likes = require("../models/likes.models");
const Post = require("../models/post.models");
const Profile = require("../models/profiles.models");
const User = require("../models/users.models");
const Tag = require("../services/tag.services");
const PostsImages = require("../models/postsImages.models");
const { uploadFile } = require("../../s3");

const findAllPosts = async ({ page = 1, limit = 100 }) => {
  const skip = (page - 1) * limit;
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select(
      "content photoPost video privacity rate name clasification reported tag user liked comments media.location createdAt"
    )
    .lean();

  const count = await Post.countDocuments();
  const totalPages = Math.ceil(count / limit);

  return { posts, totalPages };
};

const findPostById = async (postId) => {

  const post = await Post.findById(postId)
  return post
}

const createPost = async (id, obj) => {
  let userId = await User.findOne({ _id: id });

  let user = {
    id: userId._id,
    firstName: userId.first_name,
    lastName: userId.last_name,
    photoUser: userId.photo,
  };

  const data = await Post.create({
    user: user.id,
    content: obj.content,
    tag: obj.tag,
    privacity: obj.privacity,
    photoPost: obj.url,
    video: obj.video,
    rate: obj.rate,
    name: obj.name,
    clasification: obj.clasification,
    location: obj.location,
  })
  await Tag.createTag(data._id.valueOf(), data.tag)
  return data
}

const updatePost = async (postId, userId, obj) => {
  const post = await Post.findOneAndUpdate({ _id: postId, user: userId }, obj, {
    new: true,
  });
  return post;
};

//!---------------POST IMAGES -------------------

// async function getAvailableImageOrders(postId) {
//   let availableValues = [1, 2, 3]

//   console.log('POSTID: ', postId)
//   const images = await PostsImages.find({ publication: postId })
//     .lean()
//     .exec()

//   if (!images || images.length === 0) {
//     return availableValues
//   }

//   if (images.length >= availableValues.length) {
//     throw new Error(
//       'No spots available for images for this publication. First, remove an image.',
//       409,
//       'No Spots Available'
//     )
//   }

//   const existedOrders = images.map((image) => image.order)

//   const availableSpots = availableValues.filter((spot) => !existedOrders.includes(spot))

//   return availableSpots
// }

async function createImage(bucketUrl) {
  const session = await PostsImages.startSession()
  console.log("bucketURL: ", bucketUrl);

  try {
    await session.withTransaction(async () => {
      const newImage = await PostsImages.create(
        {
          url: bucketUrl,
        },
        { session }
      );

      return newImage;
    });
  } catch (error) {
    return error;
  } finally {
    session.endSession();
  }
}

async function getImageOr404(postId, order) {
  const publicationImage = await PostsImages.findOne({
    publication: postId,
    order: parseInt(order),
  }).exec();

  if (!publicationImage) {
    throw new Error(
      'Not Found Publication Image with this order',
      404,
      'Not Found'
    )
  }

  return publicationImage;
}

async function removeImage(postId, order) {
  const session = await PostsImages.startSession();

  try {
    const publicationImage = await getImageOr404(postId, order);

    await session.withTransaction(async () => {
      await publicationImage.remove({ session });
    });

    return publicationImage;
  } catch (error) {
    return error;
  } finally {
    session.endSession();
  }
}

// module.exports = { getAvailableImageOrders, createImage, getImageOr404, removeImage }

//! -------------- LIKES --------------------

const addLikeByPost = async (id, postId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const profile = await Profile.findOne({ user: id });
    let like = await Likes.findOneAndUpdate(
      { profile: profile._id, post: postId },
      { $setOnInsert: { post: postId } },
      { upsert: true, new: true, session, setDefaultsOnInsert: true }
    );
    await session.commitTransaction();
    session.endSession();
    return like;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error.message);
  }

}

module.exports = {
  findAllPosts,
  findPostById,
  createPost,
  updatePost,
  addLikeByPost,
  // getAvailableImageOrders,
  createImage
}

