// import { Files } from "../models/files.model.js";
// import { IFiles } from "../interface_type/files.interface.js";
import { Request, Response } from "express";
// import { createReadStream, createWriteStream, statSync } from "node:fs";
// import path from "node:path";
import dotenv from "dotenv";
// import { randomUUID } from "node:crypto";
import client from "../db/redis.db.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import { createFileResponse } from "../interface_type/files.interface.js";
// import mongoose from "mongoose";
// import { resetUploadWatchdog } from "../utils/WatchDogRedis.js";
// import fs, { rm, stat, copyFile as fsCopyFile } from "node:fs/promises";
// import fss from "fs";
// import { Directories } from "../models/directories.model.js";
import { copyFileService, createFileService,  deleteFileById, getResumableFilesService, handleFileUploadService, moveFileService, streamVideoFile, validateResumableFileMeta } from "../services/files.service.js";


dotenv.config({
  path: "../../.env",
});
interface AuthRequest extends Request {
  user?: any;
}

//-----File Instance creation---------------------------------------------------------------

export const createFile = async (req: AuthRequest, res: Response) => {
  try {
    const { parentid: parentId } = req.headers;
    const fileName = req.headers.filename?.toString();
    const orgFileSize = req.headers.orgfilesize?.toString();

    const result = await createFileService(
      parentId as string,
      fileName,
      orgFileSize
    );

    if (!result.success) {
      return res.status(400).json(new ApiResponse(400, null, result.message));
    }

    return res
      .status(201)
      .json(new ApiResponse(201, result.data, result.message));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};


//-----Add file data ---------------------------------------------------------------


export const addFileData = async (req: Request, res: Response) => {
  try {
    const orgFileSize = Number(req.headers.orgfilesize);
    const fileId = req.headers?.fileid?.toString();
    const dirPath = req.headers?.dirpath?.toString();

    if (!fileId) {
      return res.json({ message: "fileId is not found", success: false });
    }

    if (!dirPath) {
      return res.json({ message: "dirPath is not found", success: false });
    }

    await handleFileUploadService(req, dirPath, fileId, orgFileSize);

    const fileSizeInBytes = Number(await client.get("fileSizeInBytes"));
    const percentage = Number(await client.get("percentage"));
    const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);

    res.status(202).json({
      success: true,
      message: "File uploaded",
      fileSize: {
        fileSizeInBytes,
        fileSizeInMB,
        percentage,
      },
    });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json(
      new ApiResponse<null>(500, null, "File upload failed")
    );
  }
};

//---------------- addDataInResumable -------------------------------------------------


export const addDataInResumableFile = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.body;

    if (!fileId) {
      return res.status(400).json({ message: "fileId is missing" });
    }

    const fileMeta = await validateResumableFileMeta(fileId);

    return res.status(200).json({
      message: "Metadata matches",
      success: true,
      data: fileMeta,
    });
  } catch (err: any) {
    return res.status(400).json({
      message: err.message || "Metadata check failed",
      success: false,
    });
  }
};


//------Deletion of file--------------------------------------------------------------------


export const deleteFiles = async (req: Request, res: Response) => {
  try {
    const fileId = String(req.query.fileId);
    if (!fileId) {
      return res.status(400).json({ message: "Missing fileId", success: false });
    }

    const dirPath = await deleteFileById(fileId);

    return res.status(200).json({
      message: "File successfully deleted",
      success: true,
      data: dirPath,
    });
  } catch (err: any) {
    console.error("Delete error:", err);
    return res.status(500).json({
      message: err.message || "File deletion failed",
      success: false,
    });
  }
};

//------------getVideoFile------------------------------------------

export const getVideo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const range = req.headers.range;

    if (!id) {
      return res.status(400).json({ message: "Missing video ID" });
    }

    await streamVideoFile(id, range, res);
  } catch (err: any) {
    console.error("Error streaming video:", err);
    res.status(500).json({ message: "Failed to stream video", error: err.message });
  }
};

//-----getResumableFiles---------------------------------------------------------------------------

export const getResumableFiles = async (req: Request, res: Response) => {
  try {
    const files = await getResumableFilesService("680b9c9e19f9dd89bf0c910a");
    return res.status(200).json({
      message: "List of resumable files",
      success: true,
      data: files,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch resumable files",
      success: false,
    });
  }
};


//---------moveFile---------------------------------------------------------------------------


export const moveFile = async (req: Request, res: Response) => {
  try {
    const { currentDirId, moveDirId, fileId } = req.body;
    const result = await moveFileService(currentDirId, moveDirId, fileId);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Something went wrong while moving file" });
  }
};

//-----------copyFile------------------------------------------------------------------------
export const copyFile = async (req: Request, res: Response) => {
  try {
    const response = await copyFileService(req.body);
    return res.status(response.status).json(response);
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while copying the file",
      success: false,
    });
  }
};

export const renameFile = async (req: Request, res: Response) => {};

// interface User {
//   id: string;
//   name: string;
// }

// interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data?: T;
// }

//  const getUser = (
//   req: Request,
//   res: Response<ApiResponse<User>>
// ): Response<ApiResponse<User>> => {
//   try {
//     const user: User = { id: '123', name: 'Alice' };

//     return res.status(200).json({
//       success: true,
//       message: 'User fetched successfully',
//       data: user,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//     });
//   }
// };
