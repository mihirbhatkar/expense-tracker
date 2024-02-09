import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const port = process.env.PORT || 5000;

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import routes from "./routes/routes.js";

connectDB();

const app = express();

import cors from "cors";

app.use(
	cors({
		origin: ["https://stack-sense.vercel.app"],
		methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
	const __dirname = path.resolve();

	app.use(express.static(path.join(__dirname, "frontend/dist")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
	);
} else {
	app.get("/", (req, res) => res.send("server is running!"));
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, "192.168.29.177", () =>
	console.log(`Server started on port ${port}`)
);
