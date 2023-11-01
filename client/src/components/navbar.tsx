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
		<nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
			<div className="container-fluid">
				<div className="navbarLayout">
					<a className="navbar-brand" href="/">
						Blog app
					</a>

					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Button onClick={() => navigate("/")}>Home</Button>
						</li>
						{user._id === "" ? (
							<li className="nav-item">
								<Button onClick={() => navigate("/login")}>
									Login
								</Button>
							</li>
						) : (
							<>
								<li className="nav-item">
									<Button onClick={() => navigate("/edit")}>
										Post a blog
									</Button>
								</li>
								<li>
									<Button onClick={() => Logout()}>
										Logout
									</Button>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
