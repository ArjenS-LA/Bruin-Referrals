const express = require("express");
const router = express.Router();
const profileUpdateController = require("../../../controllers/profileUpdateController")
const verifyJWT = require("../../../middleware/verifyJWT")
const upload = require("../../../middleware/multer"); 

router.get("/", verifyJWT, profileUpdateController.getProfile)
router.post("/", verifyJWT, upload.single("profilepicture"), profileUpdateController.handleEdit);

module.exports = router;
