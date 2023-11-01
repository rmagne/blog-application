import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardText,
	Button
} from "reactstrap";
import { IPageProps } from "../interfaces/page";

const Home: React.FC<IPageProps> = () => {
	return (
		<>
			{" "}
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
							<Card className="mb-4">
								<img
									src="https://pixabay.com/get/g24fb43eb41e503119a797479e93e767b10c59843f03c554ce8059a85ee7ad9148369378f876c41ba021bde3bae926462_1280.jpg"
									alt="Placeholder Image"
								/>
								<CardBody>
									<CardTitle tag="h5">Blog post</CardTitle>
									<CardText>
										Here, there is a summary of the random
										article. Click to read more !
									</CardText>
									<Button>Read</Button>
								</CardBody>
							</Card>
						</Col>
						<Col>
							<Card className="mb-4">
								<img
									src="https://pixabay.com/get/g8071da896cdfa4a1a5d5dbaff6a4edcd47d99beba8278daf9f064b1aa2167790998678419727eed66537684fb777517d_1280.jpg"
									alt="Placeholder Image"
								/>
								<CardBody>
									<CardTitle tag="h5">Blog post</CardTitle>
									<CardText>
										Here, there is a summary of the random
										article. Click to read more !
									</CardText>
									<Button>Read</Button>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</Container>
		</>
	);
};

export default Home;
