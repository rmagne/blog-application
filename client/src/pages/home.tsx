import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	CardTitle,
	CardText,
	Button
} from "reactstrap";

import IPageProps from "../interfaces/page";
import IBlogProps from "../interfaces/blog";
import { useEffect, useState } from "react";
import ErrorText from "../components/errorText.";
import { useNavigate } from "react-router-dom";
import IUserProps from "../interfaces/user";

const API_BASE = "http://localhost:5000";

if (!API_BASE) throw new Error("API_BASE is not defined!");

const Home: React.FC<IPageProps> = () => {
	const [blogs, setBlogs] = useState<IBlogProps[]>([]);
	const [error, setError] = useState<string>("");
	const navigate = useNavigate();

	useEffect(() => {
		getBlogs();
	}, []);

	const getBlogs = async (): Promise<IBlogProps[]> => {
		try {
			const response = await fetch(API_BASE + "/blogs");

			if (!response.ok) {
				setError("Error: Unable to retrieve blogs");
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const blogs = await response.json();
			setBlogs(blogs);
			return blogs as IBlogProps[];
		} catch (err) {
			setError("Error: Unable to retrieve blogs");
			console.error("Fetching blogs failed: ", err);
			throw err;
		}
	};

	return (
		<>
			<Container fluid className="bg-light">
				<Container fluid className="bg-light text-center py-5 h-100">
					<h1 className="mb-4">
						Welcome on the coolest blog app ever
					</h1>
					<h4>Start browsing blog posts and have fun !</h4>
				</Container>
				<Container fluid="lg" className="w-50">
					<Row>
						<Col>
							<ErrorText error={error} />
							{blogs.map((blog) => {
								return (
									<Card className="mb-4">
										{blog.picture ? (
											<img
												src={blog.picture}
												alt="Placeholder Image"
											/>
										) : null}
										<CardBody>
											<CardTitle tag="h5">
												{blog.title}
											</CardTitle>
											<CardText>{blog.summary}</CardText>
											<Container className="p-0 d-flex justify-content-between align-items-center">
												<Button
													id={blog._id}
													onClick={() =>
														navigate(
															`/blog/${blog._id}`
														)
													}
												>
													Read
												</Button>
												<CardText>
													Created by
													{" " + blog.author.name}
												</CardText>
											</Container>
										</CardBody>
									</Card>
								);
							})}
						</Col>
					</Row>
				</Container>
			</Container>
		</>
	);
};

export default Home;
