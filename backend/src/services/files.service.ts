import { Files } from "../models/files.model.js";
import { Directories } from "../models/directories.model.js";
import mongoose from "mongoose";
import client from "../db/redis.db.js";
import { randomUUID } from "crypto";
import path from "node:path";
import { createReadStream, createWriteStream, statSync } from "node:fs";
import { resetUploadWatchdog } from "../utils/WatchDogRedis.js";
import fs, { rm, stat, copyFile as fsCopyFile } from "node:fs/promises";
import { createFileResponse } from "../interface_type/files.interface.js";
 


export const fileCheck = async (
  fileName: string,
  extension: string,
  parentDirId: string
) => {
  try {
    const checkFile = await Files.findOne({
      fileName: fileName,
      extension: extension,
      parentId: parentDirId,
    });
  } catch (err) {
    return;
  }
};



//----------createFileService --------------------------------------------------

export const createFileService = async (
  parentId: string | null,
  fileNameHeader: string | undefined,
  orgFileSizeHeader: string | undefined
): Promise<{ success: boolean; message: string; data?: createFileResponse }> => {
  let parentDirId: string | null = null;

  if (parentId === null || parentId === "null") {
    parentDirId = null;
  } else if (
    (typeof parentId === "string" || typeof parentId === "object") &&
    mongoose.Types.ObjectId.isValid(parentId.toString())
  ) {
    parentDirId = parentId.toString();
  } else {
    return { success: false, message: "Invalid parent directory ID" };
  }

  let fileName = fileNameHeader?.toString() || "untitled";
  const extension = path.extname(fileName);
  const orgFileSize = Number(orgFileSizeHeader);

  if (!fileName) {
    return { success: false, message: "Filename missing" };
  }

  const checkFile = await Files.findOne({
    fileName,
    extension,
    parentId: parentDirId,
  });

  if (fileName === checkFile?.fileName) {
    fileName = fileName.split(".")[0] + randomUUID() + extension;
  }

  const addFile = await Files.create({
    userId: "680b9c9e19f9dd89bf0c910a",
    fileName,
    extension,
    parentId: parentDirId,
    orgFileSize,
    uploaded: false,
    uploadedByte: 0,
    percentage: 0,
  });

  if (!addFile._id) {
    return { success: false, message: "File creation failed" };
  }

  const dirPath = `./storage/${addFile._id.toString()}${extension}`;

  const updateDir = await Files.updateOne(
    { _id: addFile._id },
    { $set: { dirPath } }
  );

  if (!updateDir.acknowledged) {
    return { success: false, message: "Directory path update failed" };
  }

  await client.set("fileId", addFile._id.toString());

  return {
    success: true,
    message: "File created successfully",
    data: {
      fileId: addFile._id.toString(),
      dirPath,
      orgFileSize,
    },
  };
};


//----------handleFileUploadService --------------------------------------------------
export const handleFileUploadService = async (
  req: any,
  dirPath: string,
  fileId: string,
  orgFileSize: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const writeStream = createWriteStream(dirPath, { flags: "a" });

    req.on("data", (chunk: Buffer) => {
      resetUploadWatchdog(); // assuming you defined this globally
      const canWrite = writeStream.write(chunk);
      if (!canWrite) {
        req.pause();
        writeStream.once("drain", () => req.resume());
      }
    });

    req.on("end", async () => {
      writeStream.end();
      writeStream.on("finish", async () => {
        try {
          const stats = await stat(dirPath);
          const fileSizeInBytes = stats.size;
          const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
          const percentage = (fileSizeInBytes / orgFileSize) * 100;

          await client.set("percentage", percentage.toString());
          await client.set("fileSizeInBytes", fileSizeInBytes.toString());

          resolve();
        } catch (err) {
          console.error("Error after write finished:", err);
          reject(new Error("Error getting file info"));
        }
      });
    });

    req.on("error", (err: Error) => {
      console.error("Stream error:", err);
      reject(err);
    });
  });
};

//---------------------------------------------------------------------------------------

export const validateResumableFileMeta = async (fileId: string) => {
  const fileData = await Files.findById(fileId);
  
  if (
    !fileData ||
    !fileData._id ||
    !fileData.fileName ||
    !fileData.dirPath ||
    fileData.uploaded // uploaded should be false
  ) {
    throw new Error("File detail is not valid or already uploaded.");
  }

  const { dirPath, uploadedByte, orgFileSize } = fileData;
  const stats = await stat(dirPath);

  if (uploadedByte !== stats.size) {
    throw new Error("File metadata and actual size do not match.");
  }

  return {
    dirPath,
    fileId: fileData._id.toString(),
    orgFileSize,
  };
};


export const moveFileService = async (
  currentDirId: string,
  moveDirId: string,
  fileId: string
) => {
  if (currentDirId === moveDirId) {
    return {
      success: false,
      message: "You cannot move file into the same directory",
    };
  }

  const file = await Files.findById(fileId);
  if (!(file?._id && file?.parentId)) {
    return { success: false, message: "File not found or invalid" };
  }

  if (currentDirId !== file.parentId.toString()) {
    return {
      success: false,
      message: "File's current parent directory does not match",
    };
  }

  const moveDir = await Directories.findById(moveDirId);
  if (!moveDir?._id) {
    return { success: false, message: "Target directory not found" };
  }

  const updatedFile = await Files.findOneAndUpdate(
    { _id: fileId },
    { $set: { parentId: new mongoose.Types.ObjectId(moveDir._id) } },
    { new: true }
  );

  if (!updatedFile) {
    return { success: false, message: "Failed to update file" };
  }

  return {
    success: true,
    message: "File moved successfully",
    file: updatedFile,
  };
};



//-------------deleteFiles-----------------------------------------------------------



export const deleteFileById = async (fileId: string) => {
  const file = await Files.findById(fileId);

  if (!file || !file._id) {
    throw new Error("File not found");
  }

  if (!file.dirPath) {
    throw new Error("File path not found");
  }

  const dirPath = file.dirPath;

  await Files.deleteOne({ _id: fileId });
  await rm(dirPath, { force: true }); // Ensures deletion even if file doesn't exist

  return dirPath;
};

// -----------videoStream---------------------------------------------------------------------


export const streamVideoFile = async (id: string, range: string | undefined, res: any) => {
  const videoPath = path.join("./storage", `${id}.mp4`);
  const stats = await stat(videoPath);
  const fileSize = stats.size;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const MAX_CHUNK_SIZE = 40 * 1024 * 1024; // 40MB
    if (end - start + 1 > MAX_CHUNK_SIZE) {
      end = start + MAX_CHUNK_SIZE - 1;
    }

    const chunkSize = end - start + 1;
    const file = createReadStream(videoPath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });

    file.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    });

    createReadStream(videoPath).pipe(res);
  }
};

//-------------getResumableFilesLists----------------------------------------------------

export const getResumableFilesService = async (userId: string) => {
  const files = await Files.find({ userId, uploaded: false });
  return files;
};

//-----------copyFileService---------------------------------------------------------


export const copyFileService = async (body: {
  currentDirId: string;
  copyDirId: string;
  fileId: string;
}) => {
  const { currentDirId, copyDirId, fileId } = body;

  if (currentDirId === copyDirId) {
    return { message: "You cannot copy into the same directory", success: false, status: 400 };
  }

  const file = await Files.findById(fileId);
  if (!(file?._id && file?.parentId)) {
    return { message: "File not found", success: false, status: 404 };
  }

  if (currentDirId !== file.parentId.toString()) {
    return { message: "Parent directory ID mismatch", success: false, status: 400 };
  }

  const targetDir = await Directories.findById(copyDirId);
  if (!targetDir?._id) {
    return { message: "Target directory not found", success: false, status: 404 };
  }

  const newFile = await Files.create({
    userId: file.userId,
    fileName: file.fileName,
    extension: file.extension,
    parentId: copyDirId,
    orgFileSize: file.orgFileSize,
    uploaded: file.uploaded,
    uploadedByte: file.uploadedByte,
    percentage: file.percentage,
  });

  if (!newFile._id) {
    return { message: "File copy failed", success: false, status: 500 };
  }

  const newDirPath = `./storage/${newFile._id.toString()}${file.extension}`;
  const updatePath = await Files.updateOne(
    { _id: newFile._id },
    { $set: { dirPath: newDirPath } }
  );

  if (!updatePath.acknowledged) {
    return { message: "Failed to update file path", success: false, status: 500 };
  }

  const sourcePath = path.resolve("backend", "storage", `${file._id}${file.extension}`);
  const destinationPath = path.resolve("backend", "storage", `${newFile._id}${file.extension}`);

  try {
    await fsCopyFile(sourcePath, destinationPath);
  } catch (err) {
    return { message: "Error during file copy", success: false, status: 500 };
  }

  return { message: "File copied successfully", success: true, status: 200 };
};
