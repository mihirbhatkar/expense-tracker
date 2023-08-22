import express from "express";
const router = express.Router();
import {
  addExpense,
  deleteExpense,
  updateExpense,
  recentExpenses,
  searchExpenses,
  searchExpensesByDescription,
  oldestExpenses,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/all").post(protect, searchExpenses);
router.route("/name").post(protect, searchExpensesByDescription);
router.route("/:id").post(protect, addExpense); //  receiving the wallet id
router.route("/:id").delete(protect, deleteExpense); //  receiving the expense id
router.route("/:id").put(protect, updateExpense); //  receiving the expense id
router.route("/recent").get(protect, recentExpenses);
router.route("/oldest").get(protect, oldestExpenses);
export default router;
