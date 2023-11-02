import { createContext } from "react";
import IUserProps from "../interfaces/user";

export const DEFAULT_USER_INFO: IUserProps = {
	uid: "",
	_id: "",
	name: ""
};

export const DEFAULT_FIRE_TOKEN = "";

export interface IUserState {
	user: IUserProps;
	fire_token: string;
}

export interface IUserAction {
	type: "login" | "logout";
	payload: {
		user: IUserProps;
		fire_token: string;
	};
}

export const initialUserState: IUserState = {
	user: DEFAULT_USER_INFO,
	fire_token: DEFAULT_FIRE_TOKEN
};

export const userReducer = (state: IUserState, action: IUserAction) => {
	let user: IUserProps = action.payload.user;
	let fire_token: string = action.payload.fire_token;
	switch (action.type) {
		case "login": {
			localStorage.setItem("fire_token", fire_token);
			return { user, fire_token };
		}
		case "logout": {
			localStorage.removeItem("fire_token");
			return initialUserState;
		}
		default:
			return state;
	}
};

export interface IContextProps {
	userState: IUserState;
	userDispatch: React.Dispatch<IUserAction>;
}

const UserContext = createContext<IContextProps>({
	userState: initialUserState,
	userDispatch: () => {}
});

export default UserContext;
