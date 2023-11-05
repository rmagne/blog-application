import {
	Button,
	Container,
	FormGroup,
	Input,
	Label,
	Form,
	FormFeedback
} from "reactstrap";
import IPageProps from "../interfaces/page";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/user";
import IBlogProps from "../interfaces/blog";
import ErrorText from "../components/errorText.";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SuccessText from "../components/successText";
import IUserProps from "../interfaces/user";

const API_BASE: string = "http://localhost:5000";

if (!API_BASE) throw new Error("API_BASE is not defined!");

const token = localStorage.getItem("fire_token");

const AddBlog: React.FC<IPageProps> = () => {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [summary, setSummary] = useState<string>("");
	const [picture, setPicture] = useState<string>("");
	const [blogId, setBlogId] = useState<string>("");

	const [isTitleDefined, setisTitleDefined] = useState<boolean>(true);
	const [publishing, setPublishing] = useState<boolean>(false);
	const [isPictureValid, setisPictureValid] = useState<boolean>(true);

	const [error, setError] = useState<string>("");

	const userContext = useContext(UserContext);
	const user: IUserProps = userContext.userState.user;
	const author: String = user._id;
	const navigate = useNavigate();

	const postBlog = async () => {
		try {
			const response = await fetch("/blogs/new", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					title: title,
					text: content,
					summary: summary,
					picture: picture,
					author: author
				})
			});

			if (!response.ok) {
				setError("Error: Unable to post blog");
				console.error(`HTTP error! status: ${response.status}`);
			}
			const blog = await response.json();
			setBlogId(blog._id);
			return blog;
		} catch (err) {
			setError("Error: Unable to post blog");
			console.error("Adding blog failed: ", err);
		}
	};

	const handleSubmit = async () => {
		if (content === "") {
			setError("You need to define a content for your blog post");
		} else if (title === "") {
			setError("");
			setisTitleDefined(false);
		} else if (picture !== "" && !/.*\.(jpg|png|JPG|PNG)$/.test(picture)) {
			setisPictureValid(false);
		} else {
			setError("");
			await postBlog();
			setPublishing(true);
		}
	};

	return (
		<Container fluid className="bg-light p-5">
			<Container fluid className="w-75">
				<h2 className="text-center">Create your blogpost</h2>
				<Container fluid className="mt-5">
					<Form>
						<FormGroup>
							<Label for="exampleTitle">Title</Label>
							<Input
								type="text"
								className="mb-2"
								placeholder="Enter a title"
								invalid={isTitleDefined === false}
								onChange={(event) =>
									setTitle(event.target.value)
								}
							/>
							<FormFeedback>
								You need to set the title of your post
							</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label for="examplePicture">Picture URL</Label>
							<Input
								type="text"
								className="mb-2"
								placeholder="paste the URL of your post picture (must end with .JPG or .PNG)"
								pattern=".*\.(jpg|png|JPG|PNG)$"
								invalid={isPictureValid === false}
								onChange={(event) =>
									setPicture(event.target.value)
								}
							/>
							<FormFeedback>
								Your picture URL is not valid
							</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label for="exampleSummary">Summary</Label>
							<Input
								type="textarea"
								className="mb-4"
								placeholder="type the summary of your post"
								onChange={(event) =>
									setSummary(event.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="content">Content</Label>
							<ReactQuill theme="snow" onChange={setContent} />
						</FormGroup>
						<ErrorText error={error} />
						{publishing ? (
							<>
								<SuccessText success="Blog post creeated successfully !" />
								<Button
									className="btn-success mt-2 w-100"
									onClick={() => navigate(`/blog/${blogId}`)}
								>
									View my blog post
								</Button>
							</>
						) : (
							<Button
								className="btn-success mt-4 w-100"
								onClick={() => handleSubmit()}
							>
								Create my blog post
							</Button>
						)}
					</Form>
				</Container>
			</Container>
		</Container>
	);
};

export default AddBlog;
