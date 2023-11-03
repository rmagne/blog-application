import { useContext, useReducer } from "react";
import UserContext, { initialUserState, userReducer } from "../contexts/user";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const NavBar = () => {
	const userContext = useContext(UserContext);
	const navigate = useNavigate();
	const { user } = userContext.userState;

	const Logout = () => {
		userContext.userDispatch({
			type: "logout",
			payload: userContext.userState
		});
		navigate("/");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top px-4">
			{" "}
			<a className="navbar-brand" href="/">
				Blog app
			</a>
			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
				<li className="nav-item">
					<a className="nav-link" href="/">
						Home
					</a>
				</li>
				{user._id === "" ? (
					<li className="nav-item">
						<a className="nav-link" href="/login">
							Login
						</a>
					</li>
				) : (
					<>
						<li className="nav-item">
							<a className="nav-link" href="/add">
								Post a blog
							</a>
						</li>
						<li>
							<a
								className="nav-link"
								href="/"
								onClick={() => Logout()}
							>
								Logout
							</a>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default NavBar;
