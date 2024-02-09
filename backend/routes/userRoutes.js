// Using require instead of import
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// Destructuring the exported functions
const { authUser, registerUser, logoutUser, updateUserProfile } =
	userController;
const { protect } = authMiddleware;

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").put(protect, updateUserProfile);

module.exports = router;
