// routes/posts.js
const express = require("express");
const router = express.Router();
const postController = require("../../../controllers/postController");

router.post("/", postController.createPost);
router.get("/", postController.getPosts);
router.patch('/:id/like', postController.likePost); // This handles the like functionality

module.exports = router;
