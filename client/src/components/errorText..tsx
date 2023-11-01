interface IErrorTextProps {
	error: string;
}

const ErrorText: React.FC<IErrorTextProps> = ({ error }) => {
	if (error === "") return null;
	return (
		<p
			className="mt-4"
			style={{
				color: "red"
			}}
		>
			{error}
		</p>
	);
};

export default ErrorText;
