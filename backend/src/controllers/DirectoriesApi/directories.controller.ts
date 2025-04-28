import { Request, Response, NextFunction } from "express";
import { Directories, IDirectory } from "../../models/directories.model.js";
import mongoose from "mongoose";
import TreeData from "../../utils/TreeData.js";
import { Files, IFiles } from "../../models/files.model.js";
import { create } from "node:domain";

const createDir = async (req: Request, res: Response, next: NextFunction) => {
  const { parentDirId, dirName, userId } = req.body;
  const checkDirName = await Directories.findOne({
    parentDirId: parentDirId,
    dirName: dirName,
  });
  
  if (checkDirName?._id) {
    return res.json({ message: "same directory name is present" });
  }
  
  const session = await mongoose.startSession();
  
  try {
    if (parentDirId === null) {
      // Start transaction if parentDirId is null
      session.startTransaction();
      
      const createDir = await Directories.create(
        [
          {
            dirName,
            parentDirId: null,
            userId,
          },
        ],
        { session }
      );
  
      console.log("create dir", createDir);
  
      if (!createDir[0]?._id) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Directory not created" });
      }
  
      const updateDir = await Directories.updateOne(
        { _id: createDir[0]._id },
        { $set: { rootId: createDir[0]._id.toString() } },
        { session }
      );
  
      await session.commitTransaction();
     
    } else {
      // Check if parentDirId exists
      const isParentDirId = await Directories.findById(parentDirId);
      console.log("isParentDir", isParentDirId);
  
      if (!isParentDirId?._id) {
        return res.json({ message: 'Parent directory is not present' });
      }
  
      // Create a directory in a non-transactional context
      const createDir = await Directories.create({
        dirName: dirName,
        parentDirId: isParentDirId?._id,
        userId: userId,
        rootId: isParentDirId.rootId,
      });
  
      if (!createDir?._id) {
        return res.json({ message: "Directory is not created" });
      }
  
      return res.status(201).json({ message: "Directory is created" });
    }
  } catch (err) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    console.error("Transaction failed ❌", err);
    return res.status(500).json({ message: "Something went wrong", err });
  } finally {
    // End the session once done
    session.endSession();
    return res.json("ok")
  }
  
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
  const tree = TreeData(dirData, fileData); //Algorithm for build tree in run time
  res.status(201).json(tree);
};
const deleteDir = async (req: Request, res: Response) => {
  console.log("object");
  return res.status(201).json("ok");
};
const Dir = async (req: Request, res: Response) => {
  console.log("object");
};
export { createDir, showDir, deleteDir, Dir };
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
