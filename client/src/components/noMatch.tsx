import { Container } from "reactstrap";

export interface INomatchProps {}

const NoMatch: React.FunctionComponent<INomatchProps> = (props) => {
	return (
		<Container
			fluid
			className="bg-light d-flex justify-content-center align-items-center"
			style={{ height: "600px" }}
		>
			<h1>404: page not found</h1>
		</Container>
	);
};

export default NoMatch;
