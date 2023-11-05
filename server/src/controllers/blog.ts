import { Request, Response } from "express";
import Blog from "../models/blog";
import IBlog from "../interfaces/blog";
import mongoose from "mongoose";

const readBlog = async (req: Request, res: Response) => {
	const blogId: string = req.params._id;
	try {
		const blog: IBlog | null = await Blog.findById(blogId)
			.populate("author", "name")
			.exec();
		if (blog) {
			res.status(200).json(blog);
		} else {
			res.status(404).json({ "Not found": "This blog does not exist" });
		}
	} catch (error: any) {
		return res.status(500).json({
			error: error.message
		});
	}
};

const readAllBlogs = async (req: Request, res: Response) => {
	try {
		const blogs: IBlog[] = await Blog.find()
			.populate("author", "name")
			.exec();

		if (blogs) {
			res.status(200).json(blogs);
		} else {
			res.status(404).json({ "Not found": "No blogs to display" });
		}
	} catch (error: any) {
		return res.status(500).json({
			error: error.message
		});
	}
};

const readMyBlogs = async (req: Request, res: Response) => {
	const author: string = req.params.author;
	try {
		if (!mongoose.Types.ObjectId.isValid(author)) {
			return res.status(400).json("Invalid User ID");
		}
		const blogs: IBlog[] = await Blog.find({
			author: author
		});
		if (blogs.length > 0) {
			res.status(200).json(blogs);
		} else {
			res.status(404).json({
				message: "No blogs found for the given author"
			});
		}
	} catch (error: any) {
		return res.status(500).json({
			error: error.message
		});
	}
};

const addBlog = async (req: Request, res: Response) => {
	try {
		const { title, text, summary, picture, author } = req.body;
		const date = new Date();
		const newBlog: IBlog = new Blog({
			_id: new mongoose.Types.ObjectId(),
			title,
			text,
			summary,
			picture,
			author,
			date
		});
		await newBlog.save();
		res.status(200).json(newBlog);
	} catch (error: any) {
		return res.status(500).json({
			error: error.message
		});
	}
};

const editBlog = async (req: Request, res: Response) => {
	const blogId: string = req.params._id;
	try {
		const { title, text, summary, picture, author } = req.body;
		const blog: IBlog | null = await Blog.findByIdAndUpdate(
			blogId,
			{
				title,
				text,
				summary,
				picture,
				author
			},
			{ new: true }
		);
		await blog?.save();
		res.status(200).json(blog);
	} catch (error: any) {
		return res.status(500).json({
			error: error.message
		});
	}
};

const deleteBlog = async (req: Request, res: Response) => {
	const blogId: string = req.params._id;
	try {
		const result = await Blog.findByIdAndDelete(blogId);
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(404).json({ "Not found": "This blog does not exist" });
		}
	} catch (error: any) {
		return res.status(500).json({
			error: error.message
		});
	}
};

export default {
	readBlog,
	readAllBlogs,
	readMyBlogs,
	addBlog,
	editBlog,
	deleteBlog
};
