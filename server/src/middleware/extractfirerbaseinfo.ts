import { Request, Response, NextFunction } from "express";
import firebaseAdmin from "firebase-admin";

var admin = require("firebase-admin");

var serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

export const extractFirebaseInfo = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const fire_token = req.headers.authorization?.split("Bearer ")[1];

		if (!fire_token) {
			return res.status(401).json("Error: no token provided");
		} else {
			const decodedToken = await firebaseAdmin
				.auth()
				.verifyIdToken(fire_token);
			res.locals.firebase = decodedToken;
			res.locals.fire_token = fire_token;
			next();
		}
	} catch (err) {
		console.error("Token verification error:", err);
		return res.status(401).json({ error: "Token verification failed." });
	}
};
