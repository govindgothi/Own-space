import Router from "express";
import {
  createFile,
  deleteFiles,
  getFile,
  addFileData,
  showFiles,
} from "../controllers/FilesApi/files.controller.js";

const router = Router();

router.route("/create").post(createFile);
router.route("/fileUpload").post(addFileData);
router.route("/delete").post(deleteFiles);
router.route("/show/:id").get(getFile);

export default router;
