import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user";
import blogRoutes from "./routes/blog";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

//MongoDB config
const db_uri = process.env.DB_URI;

if (!db_uri) {
	throw new Error("DB_URI is not defined in .env file");
}

mongoose
	.connect(db_uri)
	.then(() => console.log("Connected to DB"))
	.catch((err: any) => console.log(err));

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

app.listen(port, () => {
	console.log(`Server is Fire at http://localhost:${port}`);
});

const path = require("path");

app.use(express.static(path.join(__dirname, "dist")));
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "dist", "index.html"));
});
