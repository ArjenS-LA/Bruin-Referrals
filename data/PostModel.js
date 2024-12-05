const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const industries = [
  "Technology",
  "Healthcare",
  "Business",
  "Research",
  "Other",
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
    likes: { type: Number, default: 0 },
    industry: {
      type: String,
      enum: industries,
      required: true,
    }, // Added field
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"], // Added field
      required: true,
    },
    comments: [commentSchema],
  }, // Added field
  { timestamps: true }
);

postSchema.index({ industry: 1 });
postSchema.index({ jobType: 1 });
postSchema.index({ createdAt: 1 });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
