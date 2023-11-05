import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../config/firebase";
import IUserProps from "../interfaces/user";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const API_BASE: string = "http://localhost:5000";

if (!API_BASE) throw new Error("API_BASE is not defined!");

export const signInWithGoogle = async () => {
	return signInWithPopup(auth, provider);
};

export const Authenticate = async (
	uid: string,
	name: string,
	fire_token: string
): Promise<IUserProps> => {
	const response = await fetch(`/users/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${fire_token}`
		},
		body: JSON.stringify({ uid, name })
	});

	if (!response.ok) {
		throw new Error("Unable to authenticate");
	}

	const responseData = await response.json();
	return responseData.user;
};

export const Validate = async (fire_token: string): Promise<IUserProps> => {
	const response = await fetch(`/users/validate`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${fire_token}`
		}
	});

	if (!response.ok) {
		throw new Error("Unable to validate");
	}

	const responseData = await response.json();
	return responseData.user;
};
