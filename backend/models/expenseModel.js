const mongoose = require("mongoose");

const ExpensesSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		walletId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Wallet",
			required: true,
		},
		category: {
			type: String,
			required: true,
			enum: [
				"Transportation",
				"Food",
				"Entertainment",
				"Medical",
				"Home Maintenance",
				"Vehicle Maintenance",
				"Insurances",
				"Investment",
				"Fitness",
			],
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

ExpensesSchema.pre("save", function (next) {
	if (!this.description) {
		switch (this.category) {
			case "Transportation":
				this.description = "Some transport expense";
				break;
			case "Food":
				this.description = "Some food expense";
				break;
			case "Entertainment":
				this.description = "Some entertainment expense";
				break;
			case "Medical":
				this.description = "Some medical expense";
				break;
			case "Home Maintenance":
				this.description = "Some household expense";
				break;
			case "Vehicle Maintenance":
				this.description = "Some vehicle expense";
				break;
			case "Insurances":
				this.description = "Some Insurances expense";
				break;
			case "Investment":
				this.description = "Some investment expense";
				break;
			case "Fitness":
				this.description = "Some fitness expense";
				break;
			default:
				this.description = "Some expense";
				break;
		}
	}
	next();
});

const Expenses = mongoose.model("Expenses", ExpensesSchema);

module.exports = Expenses;
