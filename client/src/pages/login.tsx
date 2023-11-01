import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Row
} from "reactstrap";
import { IPageProps } from "../interfaces/page";
import { Authenticate, signInWithGoogle } from "../modules/auth";
import { useContext, useState } from "react";
import ErrorText from "../components/errorText.";
import UserContext from "../contexts/user";
import { useNavigate } from "react-router-dom";

const Login: React.FC<IPageProps> = () => {
	const [error, setError] = useState("");
	const userContext = useContext(UserContext);
	const navigate = useNavigate();

	const SignIn = async () => {
		if (error !== "") setError("");

		try {
			const result = await signInWithGoogle();
			const user = result.user;

			const uid = user.uid;
			const name = user.displayName;
			const fire_token = await user.getIdToken();

			if (uid && name) {
				const _user = await Authenticate(uid, name, fire_token);
				userContext.userDispatch({
					type: "login",
					payload: { user: _user, fire_token }
				});
				navigate("/");
			} else {
				throw new Error(
					"The identity provider is missing necessary information."
				);
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error.message);
				setError(error.message);
			} else {
				console.error("An error occurred during login.");
				setError("An error occurred during login.");
			}
		}
	};

	return (
		<Container fluid className="p-0">
			<Container
				style={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)"
				}}
				className="w-25"
			>
				<Row>
					<Col>
						<Card>
							<CardHeader>Click to login</CardHeader>
							<CardBody className="text-center">
								<Button
									onClick={() => SignIn()}
									style={{
										backgroundColor: "#ea4335",
										borderColor: "#ea4335"
									}}
								>
									<i className="fab fa-google mr-2"></i>
									Sign in with Google
								</Button>
								<ErrorText error={error} />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Container>
	);
};

export default Login;
