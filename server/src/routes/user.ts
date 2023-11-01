import express from "express";
import { extractFirebaseInfo } from "../middleware/extractfirerbaseinfo";
import controller from "../controllers/user";
const router = express.Router();

router.post("/create", extractFirebaseInfo, controller.create);
router.post("/login", extractFirebaseInfo, controller.login);
router.get("/validate", extractFirebaseInfo, controller.validate);
router.get("/", controller.readAll);
router.get("/:_id", controller.read);

export default router;
