import express from "express";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

router.route("/add").post(protect);
router.route("/getWallet").get(protect);
router.route("/updateWallet").put(protect);

export default router;
