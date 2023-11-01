import { PropsWithChildren, ReactNode, useContext, useEffect } from "react";
import UserContext from "../contexts/user";
import { useNavigate } from "react-router-dom";

export interface IAuthRoutesProps {
	children?: ReactNode;
}

const AuthRoutes: React.FunctionComponent<IAuthRoutesProps> = (props) => {
	const navigate = useNavigate();
	const { children } = props;
	const userContext = useContext(UserContext);
	const userId = userContext.userState.user._id;

	useEffect(() => {
		if (userId === "") {
			navigate("/login");
		}
	}, [userId]);

	if (userId === "") {
		return null;
	} else {
		return <>{children}</>;
	}
};

export default AuthRoutes;
