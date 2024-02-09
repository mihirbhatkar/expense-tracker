const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");

const protect = asyncHandler(async function (req, res, next) {
	let token;

	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// ! HERE WE ARE ADDING USER AS A KEY TO THE REQUEST OBJECT
			req.user = await User.findById(decoded.userId).select("-password");
			next();
		} catch (error) {
			res.status(401);
			throw new Error("Invalid token");
		}
	} else {
		res.status(401);
		throw new Error("Not authorized, no token");
	}
});

module.exports = { protect };
