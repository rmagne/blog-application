import { Document } from "mongoose";
import IUser from "./user";

export default interface IBlog extends Document {
	title: string;
	summary: string;
	text: string;
	picture: string;
	author: IUser;
}
