const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});

	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development", // because we only want this in production environment
		sameSite: "strict", // prevents csrf attacks
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
};

module.exports = generateToken;
