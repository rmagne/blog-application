import express from "express";
import controller from "../controllers/blog";
import { extractFirebaseInfo } from "../middleware/extractfirerbaseinfo";
const router = express.Router();

router.get("/", controller.readAllBlogs);
router.get("/myblogs", controller.readMyBlogs);
router.post("/new", extractFirebaseInfo, controller.addBlog);
router.put("/edit/:_id", controller.editBlog);
router.delete("/delete/:_id", controller.deleteBlog);
router.get("/:_id", controller.readBlog);

export default router;
