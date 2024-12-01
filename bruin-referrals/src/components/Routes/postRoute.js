// routes/posts.js
const express = require("express");
const router = express.Router();
const postController = require("../../../controllers/postController");

router.post("/", postController.createPost);
router.get("/", postController.getPosts);
router.patch('/:id/like', postController.likePost); // This handles the like functionality
router.post('/:id/comments', postController.addCommentToPost); //This handles the comment functionality
//router.delete('/:id', postController.deletePost); //This handles deleting posts


module.exports = router;
