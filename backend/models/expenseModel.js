import mongoose from "mongoose";

const ExpensesSchema = mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    dateOfExpense: {
      type: Date,
      required: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

const Expenses = mongoose.model("Expenses", ExpensesSchema);

export default Expenses;
