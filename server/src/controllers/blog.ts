import { Request, Response } from "express";
import Blog from "../models/blog";
import IBlog from "../interfaces/blog";
import mongoose from "mongoose";

const readBlog = async (req: Request, res: Response) => {
	const blogId: string = req.params._id;
	try {
		const blog: IBlog | null = await Blog.findById(blogId);
		if (blog) {
			res.status(200).json(blog);
		} else {
			res.status(404).json({ "Not found": "This blog does not exist" });
		}
	} catch (error) {
		return res.status(500).json({
			error
		});
	}
};

const readAllBlogs = async (req: Request, res: Response) => {
	try {
		const blogs: IBlog[] = await Blog.find().populate("author").exec();

		if (blogs) {
			res.status(200).json(blogs);
		} else {
			res.status(404).json({ "Not found": "No blogs to display" });
		}
	} catch (error) {
		return res.status(500).json({
			error
		});
	}
};

const readMyBlogs = async (req: Request, res: Response) => {
	try {
		const blogs: IBlog[] = await Blog.find({ author: req.body.author });
		if (blogs) {
			res.status(200).json(blogs);
		} else {
			res.status(404).json({ "Not found": "No blogs to display" });
		}
	} catch (error) {
		return res.status(500).json({
			error
		});
	}
};

const addBlog = async (req: Request, res: Response) => {
	try {
		const { title, text, summary, picture, author } = req.body;
		const newBlog: IBlog = new Blog({
			_id: new mongoose.Types.ObjectId(),
			title,
			text,
			summary,
			picture,
			author
		});
		await newBlog.save();
		res.status(200).json(newBlog);
	} catch (error) {
		return res.status(500).json({
			error
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
	} catch (error) {
		return res.status(500).json({
			error
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
	} catch (error) {
		return res.status(500).json({
			error
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
