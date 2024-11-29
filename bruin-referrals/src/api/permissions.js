const express = require("express");
const router = express.Router();
const permissionsController = require("../controllers/permissionsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/permissions");

router.get(
  "/",
  verifyRoles(ROLES_LIST.ADMIN),
  permissionsController.handleGetPermissions
);

// Export LATER
// module.exports = router;
