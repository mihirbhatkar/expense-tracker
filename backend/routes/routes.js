import express from "express";
const router = express.Router();
import userRoutes from "./userRoutes.js";
import expenseRoutes from "./expenseRoutes.js";
import walletRoutes from "./walletRoutes.js";

router.use("/users", userRoutes);
router.use("/expenses", expenseRoutes);
router.use("/wallets", walletRoutes);

export default router;
