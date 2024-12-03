// controllers/postController.js
// Arnav Goel
const Post = require("../data/PostModel");

const createPost = async (req, res) => {
  try {
    const { title, description, author } = req.body;
    // Make sure to include default values for likes and comments
    const post = await Post.create({
      title,
      description,
      author,
      likes: 0, // Ensure the default like value is set
      comments: [], // Ensure comments array is initialized as empty
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Fetch all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// Handle liking a post (update like count)
const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the post by ID and increment the "likes" field by 1
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } }, // Increment the likes field
      { new: true } // Return the updated post
    );

    // If post not found
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post); // Return the updated post
  } catch (error) {
    res.status(500).json({ message: "Error liking post", error });
  }
};

const addCommentToPost = async (req, res) => {
  const { id } = req.params; // Post ID from URL
  const { comment } = req.body; // Comment from request body

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Add the comment to the post's comments array as an object
    post.comments.push({ text: comment });
    await post.save();

    res.status(200).json(post.comments); // Return updated comments array
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment", error });
  }
};

module.exports = { createPost, getPosts, likePost, addCommentToPost };
