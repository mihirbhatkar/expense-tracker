import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Wallet from "../models/walletModel.js";

// receives wallet data => object { monthlyLimit, walletName }
// route - POST /api/wallets/add
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

// receives wallet data => object { monthlyLimit }
// route - PUT /api/wallets/update/:id
// @access private
const updateWallet = asyncHandler(async (req, res) => {
  const wallet = await Wallet.findOne({
    _id: req.params.id,
  });

  if (!wallet) {
    res.status(404);
    throw new Error("Wallet not found!");
  }

  const newLimit = Number(req.body.monthlyLimit);
  wallet.walletName = req.body.walletName || wallet.walletName;
  wallet.monthlyLimit = newLimit;

  await wallet.save();

  res.status(200).json({ wallet, message: "Wallet saved successfully!" });
});

// receives wallet id
// route - POST /api/wallets/delete/:id
// @access private
const deleteWallet = asyncHandler(async (req, res) => {
  const wallet = await Wallet.findOneAndDelete({
    _id: req.params.id,
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
