const express = require("express");
const router = express.Router();
const profileUpdateController = require("../../../controllers/profileUpdateController")
const verifyJWT = require("../../../middleware/verifyJWT")

router.get("/", verifyJWT, profileUpdateController.getProfile)
router.post("/", verifyJWT, profileUpdateController.handleEdit);

module.exports = router;
