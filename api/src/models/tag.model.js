const { Schema, model, default: mongoose } = require("mongoose");

const tagSchema = new Schema({
  posts: { type: [Object], required: true },
  number: { type: Number, default: 0 },
  tag: { type: String, required: true },
});

module.exports = model("Tag", tagSchema);
