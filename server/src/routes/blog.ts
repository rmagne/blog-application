import express from "express";
import controller from "../controllers/blog";
const router = express.Router();

router.get("/", controller.readAllBlogs);
router.get("/myblogs", controller.readMyBlogs);
router.post("/new", controller.addBlog);
router.put("/edit/:_id", controller.editBlog);
router.delete("/delete/:_id", controller.deleteBlog);
router.get("/:_id", controller.readBlog);

export default router;
