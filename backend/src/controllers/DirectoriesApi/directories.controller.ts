import { Request, Response, NextFunction } from "express";
import { Directories, IDirectory } from "../../models/directories.model.js";
import mongoose from "mongoose";
import TreeData from "../../utils/TreeData.js";
import { Files, IFiles } from "../../models/files.model.js";

const createDir = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.params.parentId.toString().split("/").at(-1);
  const checkDir = await Directories.findOne({ dirName: name });
  if (!checkDir) {
    res.json("err");
  }
  const createDir = await Directories.create({
    dirName: req.body.dirName,
    parentDirId: checkDir?._id,
    userId: req.body.userId,
  });
  console.log(createDir);
  res.json({ data: createDir });
};

const showDir = async (req: Request, res: Response) => {
  const userId = "680b9c9e19f9dd89bf0c910a";
  const dirData: IDirectory[] = await Directories.find({
    userId: new mongoose.Types.ObjectId(userId),
  }).lean();
  const fileData: IFiles[] = await Files.find({
    userId: new mongoose.Types.ObjectId(userId),
  }).lean();
  console.log("filedata", fileData);
  console.log("dirdata", dirData);
  const tree = TreeData(dirData, fileData);//Algorithm for build tree in run time 
  res.status(201).json(tree);
};
const deleteDir = async (req: Request, res: Response) => {};

export { createDir, showDir, deleteDir };
/*
 try {
        const { dirPath } = req.body;
        console.log(dirPath)
        if (!dirPath) {
             res.status(400).json({ success: false, message: "Path is necessary" });
             return
        }
          const absolutePath = path.resolve(dirPath);
          console.log(fs.existsSync(absolutePath))
        if (fs.existsSync(absolutePath)) {
            fs.mkdirSync(absolutePath, { recursive: true });
            res.status(201).json({ success: true, message: "Directory created successfully" });
            return 
        }

        res.status(409).json({ success: false, message: "Directory already exists" });
        return 
    } catch (error) {
        console.error("Error creating directory:", error);
        res.status(501).json('');
        return  
    }
*/
