import {
	Button,
	Container,
	FormGroup,
	Input,
	Label,
	Form,
	FormFeedback,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from "reactstrap";
import IPageProps from "../interfaces/page";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/user";
import { useParams } from "react-router-dom";

import ErrorText from "../components/errorText.";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SuccessText from "../components/successText";
import IBlogProps from "../interfaces/blog";
import IUserProps from "../interfaces/user";

const API_BASE: string = "http://localhost:5000";

if (!API_BASE) throw new Error("API_BASE is not defined!");

const token = localStorage.getItem("fire_token");

interface IActionButtonsProps {}

const EditBlog: React.FC<IPageProps> = () => {
	const { blog_id } = useParams();
	const [blog, setBlog] = useState<IBlogProps | null>(null);
	const [error, setError] = useState<string>("");

	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [summary, setSummary] = useState<string>("");
	const [picture, setPicture] = useState<string>("");
	const [blogId, setBlogId] = useState<string>("");
	const [isTitleDefined, setisTitleDefined] = useState<boolean>(true);

	const [publishing, setPublishing] = useState<boolean>(false);
	const [deleting, setDeleting] = useState<boolean>(false);

	const [modal, setModal] = useState<boolean>(false);

	const toggle = () => setModal(!modal);

	const userContext = useContext(UserContext);
	const user: IUserProps = userContext.userState.user;
	const author: String = user._id;
	const navigate = useNavigate();

	useEffect(() => {
		getBlogToEdit();
	}, []);

	const getBlogToEdit = async (): Promise<IBlogProps> => {
		try {
			const response = await fetch(`/blogs/${blog_id}`);

			if (!response.ok) {
				setError("Error: Unable to retrieve blog");
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const blog = await response.json();
			setBlog(blog);
			setTitle(blog.title);
			setContent(blog.text);
			if (blog.picture) setPicture(blog.picture);
			if (blog.summary) setSummary(blog.summary);
			return blog as IBlogProps;
		} catch (err) {
			setError("Error: Unable to retrieve blog");
			console.error("Fetching blog failed: ", err);
			throw err;
		}
	};

	const editBlog = async () => {
		try {
			const response = await fetch(`/blogs/edit/${blog_id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
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
				setError("Error: Unable to edit blog");
				console.error(`HTTP error! status: ${response.status}`);
			}
			const blog = await response.json();
			setBlogId(blog._id);
			return blog;
		} catch (err) {
			setError("Error: Unable to edit blog");
			console.error("Adding blog failed: ", err);
		}
	};

	const deleteBlog = async () => {
		try {
			const response = await fetch(`/blogs/delete/${blog_id}`, {
				method: "DELETE"
			});

			if (!response.ok) {
				setError("Error: Unable to delete blog");
				console.error(`HTTP error! status: ${response.status}`);
			}
			const blog = await response.json();
			setBlogId(blog._id);
			return blog;
		} catch (err) {
			setError("Error: Unable to delete blog");
			console.error("Adding blog failed: ", err);
		}
	};

	const handleEdit = async () => {
		if (content === "") {
			setError("You need to define a content for your blog post");
		} else if (title === "") {
			setError("");
			setisTitleDefined(false);
		} else {
			setError("");
			await editBlog();
			setPublishing(true);
		}
	};

	const handleDelete = async () => {
		await deleteBlog();
		toggle();
		setDeleting(true);
	};

	const ActionButtons: React.FC<IActionButtonsProps> = () => {
		if (publishing) {
			return (
				<>
					<SuccessText success="Blog post edited successfully !" />
					<Button
						className="btn-success mt-2 w-100"
						onClick={() => navigate(`/blog/${blogId}`)}
					>
						View my blog post
					</Button>
				</>
			);
		} else if (deleting) {
			return (
				<>
					<SuccessText success="Blog post deleted successfully !" />
					<Button
						className="btn-success mt-2 w-100"
						onClick={() => navigate("/")}
					>
						Go back to homepage
					</Button>
				</>
			);
		} else {
			return (
				<Container fluid className="text-end p-0">
					<Button
						className="btn-info mx-2 px-3"
						onClick={() => handleEdit()}
					>
						Edit
					</Button>
					<Button className="btn-danger" onClick={toggle}>
						Delete
					</Button>
				</Container>
			);
		}
	};

	return (
		<Container fluid className="bg-light p-5">
			<Container fluid className="w-75">
				<h2 className="text-center">Edit your blogpost</h2>
				<Container fluid className="mt-5">
					<Form>
						<FormGroup>
							<Label for="exampleTitle">Title</Label>
							<Input
								type="text"
								className="mb-2"
								placeholder="Enter a title"
								invalid={isTitleDefined === false}
								value={title}
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
								value={picture}
								placeholder="paste the URL of your post picture (must end with .JPG or .PNG)"
								onChange={(event) =>
									setPicture(event.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="exampleSummary">Summary</Label>
							<Input
								type="textarea"
								value={summary}
								className="mb-4"
								placeholder="type the summary of your post"
								onChange={(event) =>
									setSummary(event.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="content">Content</Label>
							<ReactQuill
								theme="snow"
								value={content}
								onChange={setContent}
							/>
						</FormGroup>
						<ErrorText error={error} />
						<ActionButtons />
					</Form>
					<Modal isOpen={modal} toggle={toggle}>
						<ModalHeader toggle={toggle}>
							Are you sure that you want to delete this blog ?
						</ModalHeader>

						<ModalFooter>
							<Button className="btn-secondary" onClick={toggle}>
								Cancel
							</Button>
							<Button
								className="btn-danger"
								onClick={() => handleDelete()}
							>
								Delete
							</Button>
						</ModalFooter>
					</Modal>
				</Container>
			</Container>
		</Container>
	);
};

export default EditBlog;
