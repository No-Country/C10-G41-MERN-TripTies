<<<<<<< HEAD
const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  user: { type: Object, required: true },
  content: { type: String, required: true },
  privacity: { type: String, enum: ["Public", "Private"], required: true },
  photo: { type: [Object], required: true },
  video: { type: [Object], required: true },
  rate: { type: Number, min: 1, max: 5, required: true },
  name: { type: String, required: true },
  clasification: { type: String, required: true },
  tag: { type: [String], required: true },
=======
const { default: mongoose } = require('mongoose')
const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  user: { type: Object,  },
  content: { type: String,  },
  privacity: { type: String, enum: ['Public', 'Private'],   },
  photo: [{ type: String }],
  video: { type: [Object],  },
  rate: { type: Number, min: 1, max: 5,  },
  name: { type: String,  },
  clasification: { type: String, },
>>>>>>> 240b48697cd802936863e4f399b8795f19229078
  reported: { type: Number, default: 0 },
  liked: { type: mongoose.Schema.Types.ObjectId, ref: 'Like' },
  comments: { type: Number, default: 0 },
});

module.exports = model("Post", postSchema);
