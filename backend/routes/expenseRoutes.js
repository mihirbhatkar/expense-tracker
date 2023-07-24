import express from "express";
const router = express.Router();
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/add").post(protect, addExpense);
router.route("/delete").post(protect, deleteExpense);
router.route("/update").put(protect, updateExpense);

export default router;
