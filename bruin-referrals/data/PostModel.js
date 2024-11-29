// data/PostModel.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  likes: { type: Number, default: 0 },
  comments: [{ text: String, date: { type: Date, default: Date.now } }],
});

module.exports = mongoose.model("Post", postSchema);
