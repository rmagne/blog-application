import { Routes, Route } from "react-router-dom";
import Blog from "./pages/blog";
import Home from "./pages/home";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import Layout from "./components/layout";

function App() {
	return (
		<>
			<Navbar />
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</Layout>
		</>
	);
}

export default App;
