const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// Destructuring the exported functions
const {
	addExpense,
	deleteExpense,
	updateExpense,
	recentExpenses,
	searchExpenses,
	searchExpensesByDescription,
	oldestExpenses,
} = expenseController;
const { protect } = authMiddleware;

router.route("/all").post(protect, searchExpenses);
router.route("/name").post(protect, searchExpensesByDescription);
router.route("/find/oldest").post(protect, oldestExpenses);
router.route("/:id").post(protect, addExpense); //  receiving the wallet id
router.route("/").delete(protect, deleteExpense); //  receiving the expense id
router.route("/:id").put(protect, updateExpense); //  receiving the expense id
router.route("/recent").get(protect, recentExpenses);

export default router;
