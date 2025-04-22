import { Router } from "express"; // ✅ Correct import
import { createDir, deleteDir, showDir } from "../controllers/directories.controller.js";

const router = Router();

router.route("/create").post(createDir);
router.route("/delete").post(deleteDir);
router.route("/show").post(showDir);

export default router;
