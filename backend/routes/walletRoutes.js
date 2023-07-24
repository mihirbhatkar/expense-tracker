import express from "express";
const router = express.Router();
import {
  addWallet,
  updateWallet,
  deleteWallet,
  allUserWallets,
} from "../controllers/walletController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/add").post(protect, addWallet);
router.route("/update").put(protect, updateWallet);
router.route("/delete").post(protect, deleteWallet);
router.route("/all").get(protect, allUserWallets);

export default router;
