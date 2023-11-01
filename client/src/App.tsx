import { Routes, Route } from "react-router-dom";
import Blog from "./pages/blog";
import Home from "./pages/home";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import Layout from "./components/layout";
import { useEffect, useReducer } from "react";
import UserContext, {
	userReducer,
	initialUserState,
	DEFAULT_USER_INFO,
	DEFAULT_FIRE_TOKEN
} from "./contexts/user";
import { useNavigate } from "react-router-dom";
import AuthRoutes from "./components/authRoutes";

export interface IApplicationProps {}

const App: React.FC<IApplicationProps> = (props: any) => {
	const navigate = useNavigate();
	const [userState, userDispatch] = useReducer(userReducer, initialUserState);

	useEffect(() => {
		CheckLocalStorageForCredentials();
	}, []);

	const CheckLocalStorageForCredentials = () => {
		const fire_token = localStorage.getItem("fire_token");
		if (fire_token === null) {
			userDispatch({
				type: "logout",
				payload: initialUserState
			});
			return;
		} else {
			// Validate with backend
		}
	};

	const userContextValues = { userState, userDispatch };

	return (
		<UserContext.Provider value={userContextValues}>
			<Navbar />
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />

					<Route
						path="/blog"
						element={
							<AuthRoutes>
								<Blog />
							</AuthRoutes>
						}
					/>

					<Route path="/login" element={<Login />} />
				</Routes>
			</Layout>
		</UserContext.Provider>
	);
};

export default App;
