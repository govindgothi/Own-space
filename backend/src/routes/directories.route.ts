import { Router } from "express"; // ✅ Correct import
import {
  createDir,
  deleteDir,
  showDir,
} from "../controllers/DirectoriesApi/directories.controller.js";

const router = Router();

router.route("/:parentId(*)").post(createDir);
router.route("/delete").post(deleteDir);
router.route("/show").get(showDir);

export default router;
