// controllers/postController.js
const Post = require("../data/PostModel");

// Create a new post
const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Fetch all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

module.exports = { createPost, getPosts };
