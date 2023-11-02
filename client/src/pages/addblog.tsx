import { Container } from "reactstrap";
import IPageProps from "../interfaces/page";
import { useContext, useState } from "react";
import UserContext from "../contexts/user";
import IBlogProps from "../interfaces/blog";
import ErrorText from "../components/errorText.";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const API_BASE: string = "http://localhost:5000";

if (!API_BASE) throw new Error("API_BASE is not defined!");

const token = localStorage.getItem("fire_token");

const Edit: React.FC<IPageProps> = () => {
	const [title, setTitle] = useState<string>("");
	const [text, setText] = useState<string>("");
	const [summary, setSummary] = useState<string>("");
	const [picture, setPicture] = useState<string>("");
	const [error, setError] = useState<string>("");

	const userContext = useContext(UserContext);
	const user = userContext.userState.user;
	const author = user.name;
	const navigate = useNavigate;

	const postBlog = async (): Promise<IBlogProps> => {
		try {
			const response = await fetch(API_BASE + "/blogs/new", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					title: title,
					text: text,
					summary: summary,
					picture: picture,
					author: author
				})
			});

			if (!response.ok) {
				setError("Error: Unable to post blog");
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		} catch (err) {
			setError("Error: Unable to add blog");
			console.error("Adding blog failed: ", err);
			throw err;
		}
	};

	return (
		<Container fluid className="bg-light p-5">
			<Container fluid className="w-75">
				<ErrorText error={error} />
				<ReactQuill theme="snow" value={title} onChange={setTitle} />;
			</Container>
		</Container>
	);
};

export default Edit;
