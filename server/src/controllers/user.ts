import { NextFunction, Request, Response } from "express";
import IUser from "../interfaces/user";
import User from "../models/user";
import mongoose from "mongoose";

const validate = async (req: Request, res: Response, next: NextFunction) => {
	let firebase = res.locals.firebase;

	try {
		const user: IUser | null = await User.findOne({ uid: firebase.uid });
		if (user) {
			return res.status(200).json({ user });
		} else {
			return res.status(401).json({ message: "user not found" });
		}
	} catch (error) {
		return res.status(500).json({
			error
		});
	}
};

const create = async (req: Request, res: Response, next: NextFunction) => {
	let { uid, name } = req.body;
	let fire_token = res.locals.fire_token;

	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		uid: uid,
		name: name
	});

	try {
		const newUser = await user.save();

		return res.status(201).json({ user: newUser, fire_token });
	} catch (error) {
		return res.status(500).json({
			error
		});
	}
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	const uid = req.body.uid;
	const fire_token = res.locals.fire_token;

	try {
		const user = await User.findOne({ uid });
		if (user) {
			return res.status(200).json({ user, fire_token });
		} else {
			return create(req, res, next);
		}
	} catch (error) {
		return res.status(500).json({
			error
		});
	}
};

const read = async (req: Request, res: Response) => {
	try {
		const _id = req.params._id;
		const user = await User.findById(_id);
		if (user) {
			return res.status(200).json(user);
		} else {
			return res.status(401).json("User not found");
		}
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

const readAll = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		if (users) {
			return res.status(200).json(users);
		} else {
			return res.status(404).json("No users found");
		}
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

export default {
	create,
	validate,
	login,
	read,
	readAll
};
