import IPageProps from "../interfaces/page";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IBlogProps from "../interfaces/blog";
import { Container } from "reactstrap";
import ErrorText from "../components/errorText.";

const API_BASE = "http://localhost:5000";

if (!API_BASE) throw new Error("API_BASE is not defined!");

const Blog: React.FC<IPageProps> = () => {
	const { blog_id } = useParams();
	const [blog, setBlog] = useState<IBlogProps | null>(null);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		getBlog();
	}, []);

	const getBlog = async (): Promise<IBlogProps> => {
		try {
			const response = await fetch(API_BASE + `/blogs/${blog_id}`);

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
			<Container fluid className="bg-light">
				{blog.title}
			</Container>
		);
	} else {
		return <ErrorText error={error} />;
	}
};

export default Blog;
