const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes.js");
const expenseRoutes = require("./expenseRoutes.js");
const walletRoutes = require("./walletRoutes.js");

router.use("/users", userRoutes);
router.use("/expenses", expenseRoutes);
router.use("/wallets", walletRoutes);

module.exports = router;
