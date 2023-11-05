import IPageProps from "../interfaces/page";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IBlogProps from "../interfaces/blog";
import { Button, Container } from "reactstrap";
import ErrorText from "../components/errorText.";
import UserContext from "../contexts/user";
import IUserProps from "../interfaces/user";

const API_BASE: string = "http://localhost:5000";

if (!API_BASE) throw new Error("API_BASE is not defined!");

const Blog: React.FC<IPageProps> = () => {
	const { blog_id } = useParams();
	const [blog, setBlog] = useState<IBlogProps | null>(null);
	const [error, setError] = useState<string>("");

	const userContext = useContext(UserContext);
	const user: IUserProps = userContext.userState.user;
	const author: String = user._id;

	const navigate = useNavigate();

	useEffect(() => {
		getBlog();
	}, []);

	const getBlog = async (): Promise<IBlogProps> => {
		try {
			const response = await fetch(`/blogs/${blog_id}`);

			if (!response.ok) {
				setError("Error: Unable to retrieve blog");
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const blog = await response.json();
			setBlog(blog);
			return blog as IBlogProps;
		} catch (err) {
			setError("Error: Unable to retrieve blog");
			console.error("Fetching blog failed: ", err);
			throw err;
		}
	};

	if (blog) {
		return (
			<Container fluid className="bg-light p-5">
				<Container className="w-75">
					{blog.picture ? (
						<img
							src={blog.picture}
							alt=""
							style={{
								width: "100%",
								height: "432px"
							}}
						/>
					) : null}
					<Container className="my-5">
						<h1 className="mb-3">{blog.title}</h1>
						<i>{"By " + blog.author.name}</i>
					</Container>
					<Container className=" p-0 pb-4">
						<h5>{blog.summary}</h5>
					</Container>
					<Container
						className="mt-4.
					 p-0"
					>
						<div dangerouslySetInnerHTML={{ __html: blog.text }} />
					</Container>
					{author === blog.author._id ? (
						<Button
							className="btn-info mt-4 w-100"
							onClick={() => navigate(`/edit/${blog._id}`)}
						>
							Edit blog post
						</Button>
					) : null}
				</Container>
			</Container>
		);
	} else {
		return <ErrorText error={error} />;
	}
};

export default Blog;
