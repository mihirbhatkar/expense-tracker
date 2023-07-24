import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Wallet from "../models/walletModel.js";

// receives wallet data => object { monthlyLimit, walletName }
// route - POST /api/wallet/add
// @access private
const addWallet = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // to avoid same wallet name
  const userHasSameWalletName = await Wallet.findOne({
    userId: user._id,
    walletName: req.body.walletName,
  });
  if (userHasSameWalletName) {
    res.status(406);
    throw new Error("This wallet name already exists in your inventory.");
  }

  const newWallet = await Wallet.create({
    userId: user._id,
    monthlyLimit: req.body.monthlyLimit,
    currentBalance: req.body.monthlyLimit,
    walletName: req.body.walletName,
  });

  res.status(200).json({ newWallet, message: "Wallet saved successfully!" });
});

// receives wallet data => object { addAmount , walletId }
// route - PUT /api/wallet/update
// @access private
const updateWallet = asyncHandler(async (req, res) => {
  const wallet = await Wallet.findOne({
    _id: req.body.walletId,
  });
  wallet.monthlyLimit += req.body.addAmount;
  wallet.currentBalance += req.body.addAmount;
  wallet.addedAmount += req.body.addMount;

  await wallet.save();

  res.status(200).json({ wallet, message: "Wallet saved successfully!" });
});

// receives wallet data => object { addAmount , walletId }
// route - POST /api/wallet/delete
// @access private
const deleteWallet = asyncHandler(async (req, res) => {
  const wallet = await Wallet.findOneAndDelete({
    _id: req.body.walletId,
  });

  res.status(200).json({ wallet, message: "Wallet removed successfully!" });
});

// returns all wallets from the user
// route - GET /api/wallet/all
// @access private
const allUserWallets = asyncHandler(async (req, res) => {
  const wallets = await Wallet.find({ userId: req.user._id });

  res.status(200).json(wallets);
});

export { addWallet, updateWallet, deleteWallet, allUserWallets };
