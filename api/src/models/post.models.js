const { Schema, model, default: mongoose } = require("mongoose");

const postSchema = new Schema({
  user: { type: Object, required: true },
  content: { type: String, required: true },
  privacity: { type: String, enum: ["Public", "Private"], required: true },
  photo: { type: [Object], required: true },
  video: { type: [Object], required: true },
  rate: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  name: { type: String, required: true },
  clasification: { type: String, required: true },
  // location: { type: String, required: true },
  // location: {
  //   type: {
  //     type: String,
  //     enum: ["Point"],
  //   },
  //   coordinates: {
  //     type: [Number],
  //   },
  // },
  reported: { type: Number, default: 0 },
  liked: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
});

//  postSchema.index({ location: "2dsphere" });

module.exports = model("Post", postSchema);
