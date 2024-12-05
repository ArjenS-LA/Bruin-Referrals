// routes/posts.js
// Arnav Goel
const express = require("express");
const router = express.Router();
const verifyJWT = require("../../../middleware/verifyJWT");
const postController = require("../../../controllers/postController");

// Routes accessible without authentication
router.get("/", postController.getPosts);
router.get("/search", postController.searchPosts);

// Routes that require authentication
router.post("/", verifyJWT, postController.createPost);
router.patch("/:id/like", verifyJWT, postController.likePost); // This handles the like functionality
router.post("/:id/comments", verifyJWT, postController.addCommentToPost); //This handles the comment functionality
//router.delete('/:id', postController.deletePost); //This handles deleting posts

module.exports = router;
