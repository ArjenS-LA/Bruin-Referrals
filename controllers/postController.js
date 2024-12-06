const Post = require("../data/PostModel");
const User = require("../data/User");

// Create a post
const createPost = async (req, res) => {
  try {
    const { title, description, industry, jobType } = req.body;
    const username = req.user;

    // Validate required fields
    if (!title || !industry || !jobType) {
      return res
        .status(400)
        .json({ message: "Title, industry, and job type are required." });
    }

    console.log("Retrieving author...");
    // Retrieve ObjectId from req.user
    const user = await User.findOne({ username: username }).exec();
    if (!user) {
      console.log("User not found");
      res.status(404).json({ message: "Author not found" });
    }

    const author = user._id;

    console.log("Creating post...");

    // Create a new post
    const newPost = await Post.create({
      title,
      description,
      industry,
      jobType,
      author,
      likes: [], // Explicitly initialize likes
      comments: [], // Explicitly initialize comments
    });

    //await newPost.populate('author', 'username');

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Failed to create post." });
  }
};

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username") // Include author details
      .populate("comments.author", "username")
      .sort({ createdAt: -1 }); // Sort by most recent first

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts." });
  }
};

// Like a post
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user; // Assuming req.user contains the username

    // Find the user to get their _id
    const user = await User.findOne({ username: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if user has already liked the post
    const alreadyLiked = post.likes.includes(user._id);

    if (alreadyLiked) {
      // Unlike the post
      post.likes = post.likes.filter(
        (likeId) => likeId.toString() !== user._id.toString()
      );
    } else {
      // Like the post
      post.likes.push(user._id);
    }

    await post.save();

    // Populate the post with like details if needed
    await post.populate("author", "username");
    await post.populate("comments.author", "username");

    res.status(200).json(post);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Failed to like post." });
  }
};

// Add a comment to a post
const addCommentToPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user; // Assuming req.user contains the username

    // Find the user to get their _id
    const user = await User.findOne({ username: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (!text) {
      return res.status(400).json({ message: "Comment text is required." });
    }

    post.comments.push({
      text,
      author: user._id,
    });
    await post.save();

    await post.populate("author", "username");

    await post.populate({
      path: "comments.author",
      select: "username",
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment." });
  }
};

const searchPosts = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      industry,
      jobType,
      page = 1,
      limit = 10,
    } = req.query;

    const criteria = {};

    if (startDate && endDate) {
      if(startDate === endDate){
        criteria.createdAt = { $gte: new Date(startDate) };
      }
      else{
        criteria.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }
    } else if (startDate) {
      criteria.createdAt = { $gte: new Date(startDate) };
    } else if (endDate) {
      criteria.createdAt = { $lte: new Date(endDate) };
    }

    if (industry) {
      criteria.industry = industry;
    }

    if (jobType) {
      criteria.jobType = jobType;
    }

    // Add pagination withtin searchPost

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;

    const posts = await Post.find(criteria)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate("author likes comments.author");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const username = req.user; // username from JWT

    // Find the user to get their _id
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the post and check if the current user is the author
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the current user is the author of the post
    if (post.author.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this post." });
    }

    // Delete the post
    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Failed to delete post." });
  }
};

module.exports = {
  createPost,
  getPosts,
  searchPosts,
  likePost,
  addCommentToPost,
  deletePost,
};
