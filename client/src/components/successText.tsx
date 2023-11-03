import { Container } from "reactstrap";

interface ISuccessTextProps {
	success: string;
}

const SuccessText: React.FC<ISuccessTextProps> = ({ success }) => {
	if (success === "") return null;
	return (
		<Container className="text-center">
			<p
				className="mt-4"
				style={{
					color: "green"
				}}
			>
				{success}
			</p>
		</Container>
	);
};

export default SuccessText;
