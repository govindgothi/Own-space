import { Request, Response, NextFunction } from "express";
import { Directories, IDirectory } from "../../models/directories.model.js";
import mongoose from "mongoose";
import TreeData from "../../utils/TreeData.js";
import { Files, IFiles } from "../../models/files.model.js";
import { create } from "node:domain";
import { rm } from "node:fs/promises";

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

    if (!createDir[0]?._id) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Directory not created" });
    }

    await Directories.updateOne(
      { _id: createDir[0]._id },
      { $set: { rootId: createDir[0]._id.toString() } },
      { session }
    );

    await session.commitTransaction();

    return res.status(201).json({ message: "Root Directory created" });
  } else {
    const isParentDirId = await Directories.findById(parentDirId);

    if (!isParentDirId?._id) {
      return res.json({ message: "Parent directory is not present" });
    }

    const createDir = await Directories.create({
      dirName: dirName,
      parentDirId: isParentDirId._id,
      userId: userId,
      rootId: isParentDirId.rootId,
    });

    if (!createDir?._id) {
      return res.status(400).json({ message: "Directory is not created" });
    }

    return res.status(201).json({ message: "Directory created" });
  }
} catch (err) {
  await session.abortTransaction();
  console.error("Transaction failed ❌", err);
  return res.status(500).json({ message: "Something went wrong", err });
} finally {
  session.endSession(); // Only close session
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
  const {_id} = req.body
  const dirObj = new mongoose.Types.ObjectId(_id)
  // const dirData = await Directories.find({parentDirId:_id})


  async function getDirectoryData(id:any){
   let files:any = await Files.find({parentId:id})
   let dir:any = await Directories.find({parentDirId:id})

   for (const {_id, parentDirId, dirName} of dir){
    const { files: childFiles, dir: childDirectories } = await getDirectoryData(_id)

    files = [...files, ...childFiles];
    dir = [...dir, ...childDirectories]
   }
   return { files, dir };
  }

  const {files ,dir} = await getDirectoryData(dirObj)
  
  const session = await mongoose.startSession();
  try{
    session.startTransaction();
  for (const { _id, extension } of files) {
    await rm(`./storage/${_id.toString()}${extension}`);
  }
  const deletFiles = await Files.deleteMany({
    _id: { $in: files.map(({ _id }: { _id: mongoose.Types.ObjectId }) => _id) }
  })
  const dirDelete = await Directories.deleteMany({
    _id: {  $in: [...dir.map(({ _id:any }: { _id: mongoose.Types.ObjectId }) => _id), dirObj] }
  })
  await session.commitTransaction();
  }catch(err){
  await session.abortTransaction();
  console.error("Transaction failed ❌", err);
  return res.status(500).json({ message: "Something went wrong", err });
}

  return res.json({ message: "Files deleted successfully" });

};
const Dir = async (req: Request, res: Response) => {
  console.log("object");



};




export { createDir, showDir, deleteDir, Dir };
