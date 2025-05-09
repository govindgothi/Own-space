import mongoose from "mongoose";
import { Directories } from "../models/directories.model.js";
import { IDirectory } from "../interface_type/directories.interface.js";
import { Files } from "../models/files.model.js";
import TreeData from "../utils/TreeData.js";
import { IFiles } from "../interface_type/files.interface.js";
import { rm } from "node:fs/promises";

interface CreateDirPayload {
  parentDirId: string | null;
  dirName: string;
  userId: string;
}

//----------createFolder or directory -----------------------------------------------------------------------------

export const createDirectoryService = async ({
  parentDirId,
  dirName,
  userId,
}: CreateDirPayload) => {
  const checkDirName = await Directories.findOne({ parentDirId, dirName });
  if (checkDirName?._id) {
    return {
      message: "Same directory name already exists",
      success: false,
      status: 400,
    };
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (parentDirId === null) {
      const created = await Directories.create(
        [{ dirName, parentDirId: null, userId }],
        { session }
      );

      const rootDir = created[0];
      if (!rootDir?._id) {
        await session.abortTransaction();
        return { message: "Directory not created", success: false, status: 400 };
      }

      await Directories.updateOne(
        { _id: rootDir._id },
        { $set: { rootId: rootDir._id.toString() } },
        { session }
      );

      await session.commitTransaction();
      return {
        message: "Root Directory created",
        success: true,
        status: 201,
      };
    }

    const parentDir = await Directories.findById(parentDirId);
    if (!parentDir?._id) {
      return {
        message: "Parent directory not found",
        success: false,
        status: 404,
      };
    }

    const created = await Directories.create({
      dirName,
      parentDirId: parentDir._id,
      userId,
      rootId: parentDir.rootId,
    });

    if (!created?._id) {
      return { message: "Directory not created", success: false, status: 400 };
    }

    await session.commitTransaction();
    return {
      message: "Directory created",
      success: true,
      status: 201,
    };
  } catch (err) {
    await session.abortTransaction();
    console.error("Transaction failed ❌", err);
    return {
      message: "Something went wrong while creating directory",
      success: false,
      status: 500,
    };
  } finally {
    session.endSession();
  }
};


//-------------getFolders or directories------------------------------------------------------------------------------


export const getDirectoryTreeService = async () => {
    const userId = new mongoose.Types.ObjectId("680b9c9e19f9dd89bf0c910a");
  
    const dirData: IDirectory[] = await Directories.find({ userId }).lean();
    const fileData: IFiles[] = await Files.find({ userId }).lean();
  
    const tree = TreeData(dirData, fileData);
    return tree;
  };


  //--------------deleteDirectory and folders--------------------------------------------------------------------------

  
async function getDirectoryTreeData(id: mongoose.Types.ObjectId) {
    let files = await Files.find({ parentId: id });
    let dirs = await Directories.find({ parentDirId: id });
  
    for (const dir of dirs) {
      const { files: childFiles, dirs: childDirs } = await getDirectoryTreeData(dir._id);
      files = [...files, ...childFiles];
      dirs = [...dirs, ...childDirs];
    }
  
    return { files, dirs };
  }
  
//-------delete  folder recursively





  export const deleteDirectoryService = async (folderId: string) => {
    const dirObj = new mongoose.Types.ObjectId(folderId);
    const { files, dirs } = await getDirectoryTreeData(dirObj);
  
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Delete physical files
      for (const file of files) {
        await rm(`./storage/${file._id.toString()}${file.extension}`);
      }
  
      // Delete file records
      await Files.deleteMany({ _id: { $in: files.map(f => f._id) } });
  
      // Delete directories (including root)
      await Directories.deleteMany({
        _id: {
          $in: [...dirs.map(d => d._id), dirObj],
        },
      });
  
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  };
  
