import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Wallet from "../models/walletModel.js";

// receives wallet data => object { monthlyLimit, walletName }
// route - POST /api/wallet/addWallet
// @access private
const addWallet = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
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
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export { addWallet };
