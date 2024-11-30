// controllers/postController.js
const Post = require("../data/PostModel");

const createPost = async (req, res) => {
    try {
      const { title, description, author } = req.body;
      // Make sure to include default values for likes and comments
      const post = await Post.create({
        title,
        description,
        author,
        likes: 0,  // Ensure the default like value is set
        comments: [] // Ensure comments array is initialized as empty
      });
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

// Handle liking a post (update like count)
const likePost = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the post by ID
      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Increment the like count
      post.likes += 1;
  
      // Save the updated post
      await post.save();
  
      // Return the updated post with the new like count
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: "Error liking post", error });
    }
  };
  

module.exports = { createPost, getPosts, likePost };
