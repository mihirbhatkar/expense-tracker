// Using require instead of import
const express = require("express");
const router = express.Router();
const walletController = require("../controllers/walletController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// Destructuring the exported functions
const { addWallet, updateWallet, deleteWallet, allUserWallets } =
	walletController;
const { protect } = authMiddleware;

router.route("/").post(protect, addWallet);
router.route("/:id").put(protect, updateWallet);
router.route("/:id").delete(protect, deleteWallet);
router.route("/all").get(protect, allUserWallets);

module.exports = router;
