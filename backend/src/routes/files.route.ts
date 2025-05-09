import Router from "express";
// import { upload } from "../index.js";
import {
  createFile,
  deleteFiles,
  // getFile,
  addFileData,
  // showFiles,
  getResumableFiles,
  getVideo,
  // getUser
} from "../controllers/files.controller.js";

const router = Router();

router.route("/create").post(createFile);
router.route("/fileUpload").post(addFileData);
router.route("/delete").delete(deleteFiles);
// router.route("/show/:id").get(getFile);
router.route("/shows/:id").get(getVideo);
router.route("/resumable").get(getResumableFiles);
// router.route('/user').get(getUser)
export default router;
