import express from "express";
const router = express.Router();
import {
  addWallet,
  updateWallet,
  deleteWallet,
  allUserWallets,
} from "../controllers/walletController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addWallet);
router.route("/:id").put(protect, updateWallet);
router.route("/:id").delete(protect, deleteWallet);
router.route("/all").get(protect, allUserWallets);

export default router;
