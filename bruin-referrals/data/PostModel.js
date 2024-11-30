// data/PostModel.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  author: String,
  likes: { type: Number, default: 0 },
  comments: [commentSchema], // Array of subdocuments
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
