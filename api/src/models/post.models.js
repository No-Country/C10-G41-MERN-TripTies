const { Schema, model } = require("mongoose");
const { default: mongoose } = require("mongoose");

const postSchema = new Schema(
  {
    user: { type: Object, required: true },
    content: { type: String, required: true },
    tag: { type: [String], required: true },
    privacity: { type: String, enum: ["Public", "Private"], required: true },
    photoPost: { type: [Object] },
    video: { type: [Object] },
    rate: { type: Number, min: 1, max: 5, required: true },
    name: { type: String, required: true },
    clasification: { type: String, required: true },
    reported: { type: Number, default: 0 },
    liked: { type: mongoose.Schema.Types.ObjectId, ref: "Like" },
    comments: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
