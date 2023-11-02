import { Routes, Route } from "react-router-dom";
import Blog from "./pages/readblog";
import Home from "./pages/home";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import { useEffect, useReducer } from "react";
import UserContext, {
	userReducer,
	initialUserState,
	DEFAULT_USER_INFO,
	DEFAULT_FIRE_TOKEN
} from "./contexts/user";
import { useNavigate } from "react-router-dom";
import AuthRoutes from "./components/authRoutes";
import Edit from "./pages/addblog";
import { Validate } from "./modules/auth";

export interface IApplicationProps {}

const App: React.FC<IApplicationProps> = (props: any) => {
	const navigate = useNavigate();
	const [userState, userDispatch] = useReducer(userReducer, initialUserState);

	useEffect(() => {
		CheckLocalStorageForCredentials();
	}, []);

	const CheckLocalStorageForCredentials = async () => {
		const fire_token = localStorage.getItem("fire_token");
		if (fire_token === null) {
			userDispatch({
				type: "logout",
				payload: initialUserState
			});
			return;
		} else {
			try {
				const user = await Validate(fire_token);
				userDispatch({ type: "login", payload: { user, fire_token } });
			} catch (error) {
				userDispatch({ type: "logout", payload: initialUserState });
			}
		}
	};

	const userContextValues = { userState, userDispatch };

	return (
		<UserContext.Provider value={userContextValues}>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/edit" element={<Edit />} />
				<Route path="/blog/:blog_id" element={<Blog />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</UserContext.Provider>
	);
};

export default App;
