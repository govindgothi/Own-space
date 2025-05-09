import { Router } from "express"; // ✅ Correct import
import {
  createDir,
  deleteDir,
  showDir,
  // Dir
} from "../controllers/directories.controller.js";

const router = Router();

router.route("/createDir").post(createDir);
router.route("/delete").delete(deleteDir);
router.route("/show").get(showDir);
// router.route("/get").post(Dir);
export default router;
