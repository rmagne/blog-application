import { Routes, Route } from "react-router-dom";
import Blog from "./pages/readblog";
import Home from "./pages/home";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import { useEffect, useReducer } from "react";
import UserContext, { userReducer, initialUserState } from "./contexts/user";
import AddBlog from "./pages/addblog";
import { Validate } from "./modules/auth";
import EditBlog from "./pages/editblog";

export interface IApplicationProps {}

const App: React.FC<IApplicationProps> = (props: any) => {
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
				<Route path="/add" element={<AddBlog />} />
				<Route path="/blog/:blog_id" element={<Blog />} />
				<Route path="/edit/:blog_id" element={<EditBlog />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</UserContext.Provider>
	);
};

export default App;
