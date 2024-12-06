const mongoose = require("mongoose");

const industries = [
  "Technology",
  "Healthcare",
  "Business",
  "Research",
  "Other",
];

const jobTypes = [
  "Full-Time",
  "Part-Time",
  "Internship",
];

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Added field
    likes: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }],
    industry: {
      type: String,
      enum: industries,
      required: true,
    }, // Added field
    jobType: {
      type: String,
      enum: jobTypes, // Added field
      required: true,
    },
    comments: [{
      text: { type: String, required: true },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      createdAt: { type: Date, default: Date.now }
    }],
  }, // Added field
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;