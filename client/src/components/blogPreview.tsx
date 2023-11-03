import { Container, Card, CardBody, CardTitle, CardText } from "reactstrap";
import IBlogProps from "../interfaces/blog";
import { useNavigate } from "react-router-dom";

interface IBlogPreviewProps {
	blog: IBlogProps;
}

const BlogPreview: React.FC<IBlogPreviewProps> = ({ blog }) => {
	const navigate = useNavigate();

	return (
		<Card
			className="mb-4 p-2"
			key={blog._id}
			onClick={() => navigate(`/blog/${blog._id}`)}
			style={{
				cursor: "pointer"
			}}
		>
			{blog.picture ? <img src={blog.picture} alt="" /> : null}
			<CardBody>
				<CardTitle tag="h5">{blog.title}</CardTitle>
				<CardText>{blog.summary}</CardText>
				<Container className="p-0 d-flex justify-content-between align-items-center">
					<CardText className="pt-4">
						Created by
						{" " + blog.author.name} on
						{" " + new Date(blog.date).toLocaleDateString()}
					</CardText>
				</Container>
			</CardBody>
		</Card>
	);
};

export default BlogPreview;
