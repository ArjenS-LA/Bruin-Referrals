const express = require("express");
const router = express.Router();
const profileUpdateController = require("../../../controllers/profileUpdateController")
const verifyJWT = require("../../../middleware/verifyJWT")

router.post("/", verifyJWT, profileUpdateController.handleEdit);

module.exports = router;
