const mongoose = require("mongoose");

const WalletSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		monthlyLimit: {
			type: Number,
			required: true,
		},
		currentBalance: {
			type: Number,
			required: true,
		},
		walletName: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

WalletSchema.pre("findOneAndDelete", async function (next) {
	const walletId = this._conditions._id;
	try {
		await mongoose.model("Expenses").deleteMany({ walletId: walletId });
		next();
	} catch (err) {
		next(err);
	}
});

const Wallet = mongoose.model("Wallet", WalletSchema);

export default Wallet;
