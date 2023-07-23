import express from "express";
const router = express.Router();
import { addWallet } from "../controllers/walletController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/addWallet").post(protect, addWallet);
// router.route("/getWallet").get(protect);
// router.route("/updateWallet").put(protect);

export default router;
