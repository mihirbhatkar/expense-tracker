import asyncHandler from "express-async-handler";
import Expenses from "../models/expenseModel.js";
import User from "../models/userModel.js";
import Wallet from "../models/walletModel.js";

// receives expense data and wallet id { ...expenseData } // wallet id is in params
// route - POST /api/expenses/addExpense
// @access private
const addExpense = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const userWallet = await Wallet.findOne({ _id: req.params.id });
  if (user && userWallet) {
    const newExpense = new Expenses({
      userId: req.user._id,
      walletId: userWallet._id,
      category: req.body.category,
      amount: req.body.amount,
      dateOfExpense: req.body.date,
      description: req.body.description || "",
    });

    const exp = await newExpense.save();

    // subtracting amount from user's wallet
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
    throw new Error("user or wallet not found!");
  }
});

// receives an expense id and deletes it from database -- { expenseId }
// route - POST /api/expenses/deleteExpense
// @access private
const deleteExpense = asyncHandler(async (req, res) => {
  const deletedExpense = await Expenses.findOneAndDelete({
    _id: req.params.id,
  });

  // adding amount to user's wallet

  const userWallet = await Wallet.findOne({ _id: deletedExpense.walletId });
  userWallet.currentBalance =
    userWallet.currentBalance + Number(deletedExpense.amount);
  await userWallet.save();

  res.status(200).json({ userWallet, message: "Expense deleted successfully" });
});

// receives user data and expense data, makes changes to expense { ...newExpenseData, expenseId }
// route - POST /api/expenses/updateExpense
// @access private
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expenses.findById(req.params.id);
  const userWallet = await Wallet.findOne({ _id: expense.walletId });
  // const user = await User.findById(req.user._id);
  if (expense && userWallet) {
    expense.category = req.body.category || expense.category;
    expense.dateOfExpense = req.body.date || expense.dateOfExpense;
    expense.description = req.body.description || expense.description;

    const oldAmount = Number(expense.amount);
    expense.amount = Number(req.body.amount) || Number(expense.amount);

    // updating amount from user's wallet

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

// returns recent expenses
// route - GET /api/expenses/recent
// @access private
const recentExpenses = asyncHandler(async (req, res) => {
  const recentExpenses = await Expenses.find({ userId: req.user._id })
    .sort({ dateOfExpense: -1 }) // -1 for descending order, 1 for ascending order
    .limit(5);

  res.status(200).json({ recentExpenses, message: "Recent expenses returned" });
});

// this function is for finding expenses in general
// Route - POST /api/expenses/search
// PRIVATE
const searchExpenses = asyncHandler(async (req, res) => {
  const startingDate = req.body.time.start; // typeof date
  const endingDate = req.body.time.end; // typeof date

  const categories = req.body.categories; // this is an array, there might be one or multiple categories

  const wallets = req.body.wallets; // this is an array, there might be one or multiple wallets
  let walletIds = [];
  wallets.forEach((element, index) => {
    walletIds.push(element._id);
  });

  const amountLowerLimit = req.body.amount.lower; // typeof number
  const amountUpperLimit = req.body.amount.upper; // typeof number

  // this function returns an array of expenses according to the above filters

  const query = {};

  if (startingDate && endingDate) {
    query.dateOfExpense = { $gte: startingDate, $lte: endingDate };
  }

  if (categories && categories.length > 0) {
    query.category = { $in: categories };
  }

  if (wallets && wallets.length > 0) {
    query.walletId = { $in: walletIds };
  }

  if (amountLowerLimit !== undefined && amountUpperLimit !== undefined) {
    query.amount = { $gte: amountLowerLimit, $lte: amountUpperLimit };
  }

  const expenses = await Expenses.find(query).sort({ dateOfExpense: -1 });

  res.status(200).json(expenses);
});

// for searching expenses by name
const searchExpensesByDescription = asyncHandler(async (req, res) => {
  const searchDescription = req.body.description;

  // Create a regular expression for case-insensitive search
  const searchRegex = new RegExp(searchDescription, "i");

  // Construct the query to find expenses with similar description
  const query = {
    description: searchRegex,
    userId: req.user._id,
  };

  // Execute the query to find expenses with similar description and sort them by descending dateOfExpense
  const expenses = await Expenses.find(query).sort({ dateOfExpense: -1 });

  res.status(200).json(expenses);
});

// receives a wallet list and returns the oldest expense out of them
const oldestExpenses = asyncHandler(async (req, res) => {
  const { wallets } = req.body;
  const walletIds = wallets.map((wallet) => wallet._id);
  const oldestExpensesList = [];

  for (const walletId of walletIds) {
    const oldestExpense = await Expenses.findOne({ walletId: walletId }).sort({
      dateOfExpense: 1,
    });

    if (oldestExpense) {
      oldestExpensesList.push(oldestExpense); // Push the oldest expense into the list
    }
  }
  if (oldestExpensesList.length !== 0) {
    let oldestDate = oldestExpensesList[0].dateOfExpense;

    for (const expense of oldestExpensesList) {
      if (expense.dateOfExpense < oldestDate) {
        oldestDate = expense.dateOfExpense;
      }
    }

    res.status(200).json(oldestDate);
  } else {
    res.status(200).json({ msg: "No expense found" });
  }
});

export {
  addExpense,
  deleteExpense,
  updateExpense,
  recentExpenses,
  searchExpenses,
  searchExpensesByDescription,
  oldestExpenses,
};
