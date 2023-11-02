import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user";
import blogRoutes from "./routes/blog";

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
	.catch((err) => console.log(err));

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
