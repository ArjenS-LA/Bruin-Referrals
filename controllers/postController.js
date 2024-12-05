// controllers/postController.js
// Arnav Goel
const Post = require("../data/PostModel");

const createPost = async (req, res) => {
  try {
    const { title, description, industry, jobType } = req.body;
    const author = req.user; // Set req.user.id from auth middleware

    console.log("Author:", author);

    if (!title || !industry || !jobType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate industry and jobType values
    const allowedIndustries = [
      "Technology",
      "Healthcare",
      "Business",
      "Research",
      "Other",
    ];

    const allowedJobTypes = ["full-time", "part-time", "internship"];

    if (!allowedIndustries.includes(industry)) {
      return res.status(400).json({ message: "Invalid industry value" });
    }

    if (!allowedJobTypes.includes(jobType)) {
      return res.status(400).json({ message: "Invalid job type value" });
    }

    // Make sure to include default values for likes and comments
    const post = await Post.create({
      title,
      description,
      author,
      industry,
      jobType,
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
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "username"); // Populate author field with username
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// Search posts based on criteria
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

    const query = {};

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    if (industry) {
      query.industry = industry;
    }

    if (jobType) {
      query.jobType = jobType;
    }

    // Calculate the number of documents to skip
    const skips = (parseInt(page) - 1) * parseInt(limit);

    // Total number of documents in the collection
    const total = await Post.countDocuments(query);

    // Find posts based on query criteria
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skips)
      .limit(parseInt(limit))
      .populate("author", "username");

    res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      posts,
    });
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
  const author = req.user; // User ID from auth middleware

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

module.exports = {
  createPost,
  getPosts,
  searchPosts,
  likePost,
  addCommentToPost,
};
