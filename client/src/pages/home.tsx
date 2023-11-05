import { Container, Row, Col } from "reactstrap";

import IPageProps from "../interfaces/page";
import IBlogProps from "../interfaces/blog";
import { useEffect, useState } from "react";
import ErrorText from "../components/errorText.";
import BlogPreview from "../components/blogPreview";

const API_BASE: string = "http://localhost:5000";

if (!API_BASE) throw new Error("API_BASE is not defined!");

const Home: React.FC<IPageProps> = () => {
	const [blogs, setBlogs] = useState<IBlogProps[]>([]);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		getBlogs();
	}, []);

	const getBlogs = async (): Promise<IBlogProps[]> => {
		try {
			const response = await fetch("/blogs");

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
							{blogs
								.sort((a, b) => {
									let dateA = new Date(a.date).getTime();
									let dateB = new Date(b.date).getTime();
									return dateB - dateA;
								})
								.map((blog) => {
									return <BlogPreview blog={blog} />;
								})}
						</Col>
					</Row>
				</Container>
			</Container>
		</>
	);
};

export default Home;
