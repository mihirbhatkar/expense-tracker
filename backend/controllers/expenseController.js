import asyncHandler from "express-async-handler";
import Expenses from "../models/expenseModel.js";
import User from "../models/userModel.js";
import Wallet from "../models/walletModel.js";

// receives expense data and wallet id { ...expenseData, walletId }
// route - POST /api/expenses/addExpense
// @access private
const addExpense = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const newExpense = new Expenses({
      walletId: req.body.walletId,
      category: req.body.category,
      amount: req.body.amount,
      dateOfExpense: req.body.date,
      description: req.body.description || "",
    });

    const exp = await newExpense.save();

    // subtracting amount from user's wallet
    const userWallet = await Wallet.findOne({ _id: req.body.walletId });
    userWallet.currentBalance =
      userWallet.currentBalance - Number(req.body.amount);
    await userWallet.save();

    res.status(200).json({
      expense: exp,
      wallet: userWallet,
      message: "Expense saved successfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// receives an expense id and deletes it from database -- { expenseId }
// route - POST /api/expenses/deleteExpense
// @access private
const deleteExpense = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const deletedExpense = await Expenses.findOneAndDelete({
      _id: req.body.expenseId,
    });

    // adding amount to user's wallet
    const userWallet = await Wallet.findOne({ _id: deletedExpense.walletId });
    userWallet.currentBalance =
      userWallet.currentBalance + Number(deletedExpense.amount);
    await userWallet.save();

    res
      .status(200)
      .json({ userWallet, message: "Expense deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// receives user data and expense data, makes changes to expense { ...newExpenseData, expenseId }
// route - POST /api/expenses/updateExpense
// @access private
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expenses.findById(req.body.expenseId);
  // const user = await User.findById(req.user._id);
  if (expense) {
    expense.category = req.body.category || expense.category;
    expense.dateOfExpense = req.body.date || expense.dateOfExpense;
    expense.description = req.body.description || expense.description;

    const oldAmount = Number(expense.amount);
    expense.amount = Number(req.body.amount) || Number(expense.amount);

    // updating amount from user's wallet
    const userWallet = await Wallet.findOne({ _id: expense.walletId });
    userWallet.currentBalance =
      userWallet.currentBalance + oldAmount - expense.amount;
    await userWallet.save();

    await expense.save();

    res.status(200).json({ userWallet, message: "Expense saved successfully" });
  } else {
    res.status(404);
    throw new Error("Expense not found!");
  }
});

export { addExpense, deleteExpense, updateExpense };
