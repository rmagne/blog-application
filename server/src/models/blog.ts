import mongoose, { Schema } from "mongoose";
import IBlog from "../interfaces/blog";

const BlogSchema: Schema = new Schema({
	title: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	summary: {
		type: String
	},
	picture: {
		type: String
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	date: {
		type: String
	}
});

export default mongoose.model<IBlog>("Blog", BlogSchema);
