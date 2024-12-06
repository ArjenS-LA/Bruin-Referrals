const express = require("express");
const router = express.Router();
const postController = require("../../../controllers/postController");
const verifyJWT = require("../../../middleware/verifyJWT");
const verifyRoles = require("../../../middleware/verifyRoles");
const ROLES_LIST = require("../../../config/roles_list")


router.get("/", postController.getPosts)

// Apply JWT verification 
router.post("/", verifyJWT, postController.createPost);
router.patch("/:id/like", verifyJWT, postController.likePost);
router.post("/:id/comments", verifyJWT, postController.addCommentToPost);
router.delete('/:id', verifyJWT, postController.deletePost);

module.exports = router;