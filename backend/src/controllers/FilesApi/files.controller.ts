import { Files, IFiles } from "../../models/files.model.js";
import { Request, Response } from "express";
import { createReadStream, createWriteStream, statSync } from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { randomUUID } from "node:crypto";
import client from "../../db/redis.db.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { createFileResponse } from "./FileApiResponse.js";
import mongoose from "mongoose";
import { resetUploadWatchdog } from "../../utils/WatchDogRedis.js";
import fs, { rm, stat, writeFile } from "node:fs/promises";
import { Directories } from "../../models/directories.model.js";

dotenv.config({
  path: "../../.env",
});
interface AuthRequest extends Request {
  user?: any;
}

const key = process.env.FileUploadkey;


//-----File Instance creation---------------------------------------------------------------

const createFile = async (req: AuthRequest, res: Response) => {
  const { parentid: parentId } = req.headers; //params
  let parentDirId = null;

  if (parentId === null || parentId === "null") {
    parentDirId = null;
  } else if (
    (typeof parentId === "string" || typeof parentId === "object") &&
    mongoose.Types.ObjectId.isValid(parentId.toString())
  ) {
    parentDirId = parentId.toString();
  } else {
    return res.status(400).json({ message: "Invalid parent directory ID" });
  }

  // const parentDirId = parentId?.toString() || null;
  let fileName = req.headers.filename?.toString() || "untitled";
  const extension = path.extname(fileName.toString());
  console.log(extension, req.headers.orgfilesize);
  const orgFileSize: any = Number(req.headers.orgfilesize);

  const checkFile = await Files.findOne({
    fileName: fileName,
    extension: extension,
    parentId: parentDirId,
  });
  if (!fileName) {
    res.status(402).json(new ApiResponse<null>(402, null, "Filename missing"));
  }
  if (fileName === checkFile?.fileName) {
    fileName = fileName.split(".")[0] + randomUUID() + extension;
  }
  // console.log(fileName,extension,parentId,orgFileSize,"filename is this")
  const addFile = await Files.create({
    userId: "680b9c9e19f9dd89bf0c910a",
    fileName,
    extension,
    parentId,
    orgFileSize,
    uploaded: false,
    uploadedByte: 0,
    percentage: 0,
  });
  if (!addFile._id) {
    res.status(405).json(new ApiResponse<null>(405, null, "file not creates"));
  }
  const dirPath = `./storage/${addFile._id.toString()}${extension}`;
  const updateDir = await Files.updateOne(
    { _id: addFile._id },
    { $set: { dirPath: dirPath.toString() } }
  );
  if (!updateDir.acknowledged) {
    return res.json({ message: "dirpath is not update" });
  }
  await client.set("fileId", addFile._id.toString());
  res.status(201).json(
    new ApiResponse<createFileResponse>(
      201,
      {
        dirPath,
        fileId: addFile._id.toString(),
        orgFileSize,
      },
      "file added succefully"
    )
  );
};


//-----Add file data ---------------------------------------------------------------

const addFileData = async (req: AuthRequest, res: Response) => {
  const orgFileSize = Number(req.headers.orgfilesize);
  const fileId = req.headers?.fileid?.toString();
  if (!fileId) {
    return res.json({ message: "fileId is not found", success: false });
  }
  const dirPath = req.headers.dirpath?.toString();
  if (!dirPath) return void res.json({ message: "dir is not found" });
  const writeStream = createWriteStream(dirPath, { flags: "a" });
  req.on("data", async (chunk) => {
    resetUploadWatchdog();
    const canWrite = writeStream.write(chunk);
    if (!canWrite) {
      req.pause();
      writeStream.once("drain", () => req.resume());
    }
  });

  req.on("end", async () => {
    writeStream.end(); // Ensures stream is closed
    writeStream.on("finish", async () => {
      // await fs.stat(dirPath, async (err, stats) => {
      //   if (err) {
      //     console.error("Error getting file stats:", err);
      //       res
      //       .status(500)
      //       .json({ success: false, message: "Error getting file info" });
      //   }
      const stats = await stat(dirPath);
      if (!stat) {
        console.error("Error getting file stats:");
        res
          .status(500)
          .json({ success: false, message: "Error getting file info" });
      }
      const fileSizeInBytes = stats.size;
      const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
      const percentage = (fileSizeInBytes / orgFileSize) * 100;
      await client.set("percentage", percentage);
      await client.set("fileSizeInBytes", fileSizeInBytes);
      const value = await client.get("fileSizeInBytes");
      console.log("walue", value);
      res.status(202).json({
        success: true,
        message: "File uploaded",
        fileSize: {
          fileSizeInBytes,
          fileSizeInMB,
          percentage,
          value,
        },
      });
      // });
    });
  });

  req.on("error", (err) => {
    console.error("Request stream error:", err);
    res
      .status(401)
      .json(new ApiResponse<null>(201, null, "file added succefully"));
  });
  // return;
};




//-------start data uploading in resumable file ----------------------------------------
const addDataInResumableFile = async (req:Request,res:Response)=>{
  const {fileId} = req.body
  if(!fileId){
    return res.json({message:"id is not found"})
  }
  const fileData = await Files.findById(fileId)
  if(!(fileData!==null && fileData !== undefined && fileData._id && fileData.fileName && fileData.dirPath && !fileData.uploaded)){
    return res.json({message:"file detail is not found",success:false})
  }
  const { dirPath , uploadedByte,orgFileSize } = fileData
  const stats = await stat(dirPath);
  const fileSizeInBytes = stats.size;
  if(!(uploadedByte === Number(fileSizeInBytes))){
   return res.json({message:'file meta data is not match',success:false})
  }
  return res.status(201).json({
    message:"meta data is match",
    success:true,
    data:{
    dirPath,
    fileId: fileData._id.toString(),
    orgFileSize,
     }
  })

}



//-----show List of file---------------------------------------------------------------


const showFiles = async (req: Request, res: Response) => {
  const id = req.params;
  if (!id) {
    return res.json("no id");
  }
  const folderPath = "./storage/govind";
  const fullPath = path.join(folderPath, id.toString());
  console.log(fullPath);
  const range = req.headers.range;
  console.log(range);
};

//------Deletion of file--------------------------------------------------------------------

const deleteFiles = async (req: Request, res: Response) => {
  const { fileId } = req.query;
  const file = await Files.findOne({ _id: fileId });
  if (!file?._id) {
    return res.json({ message: "file is not found", success: false });
  }
  const { dirPath } = file;
  if (!dirPath) {
    return res.json({ message: "path is not found", success: false });
  }
  try {
    const deleteFile = await Files.deleteOne({_id:fileId})
    await rm(dirPath);
    console.log(`Deleted file at ${dirPath}`);
  } catch (err) {
    console.error("Failed to delete file:", err);
  }
  // const items = await fs.readdir("storage/dirPath);
  return res.json({ message:"file is deleted", data: dirPath });
};

//-----show list of file---------------------------------------------------------------

const getFile = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id, "id");
  const folderPath = "./storage/govind";
  const fullPath = path.join(folderPath, id.toString());
  console.log(fullPath, "full fath");
  const stat = statSync(fullPath);
  const fileSize = stat.size;
  const range = req.headers.range;
  console.log("range", range);

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    console.log("parts", parts);
    const start = parseInt(parts[0], 10);
    let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    console.log("chunksize", chunksize / (1024 * 1024));
    const MAX_CHUNK_SIZE = 40 * 1024 * 1024; // 40MB in bytes
    console.log("Max_chunk_size");
    if (end - start + 1 > MAX_CHUNK_SIZE) {
      end = start + MAX_CHUNK_SIZE - 1;
    }
    const file = createReadStream(fullPath, { start, end });
    console.log("start", start);
    console.log("end", end);
    console.log("chunk", chunksize);
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    });

    file.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    });
    createReadStream(fullPath).pipe(res);
  }
};


//-----show list of uncompleted file---------------------------------------------------------------

const getResumableFiles = async (req: Request, res: Response) => {
  const files = await Files.find({
    userId: "680b9c9e19f9dd89bf0c910a",
    uploaded: false,
  });
  console.log(files);
  return res.json({
    message: "list of resume file ",
    success: true,
    data: files,
  });
};

const moveFile = async (req: Request, res: Response) => {
  try{
    const {currentDirId,moveDirId,fileId}= req.body
    const file = await Files.findById({_id:fileId})
    if(!(file?._id && file?.parentId)){
     return res.json({message:"id is not found",success:false})
    }
    if(currentDirId !== file.parentId){
      return res.json({message:"parentId is not matched"})
    }
    const moveDir = await Directories.findById({_id:moveDirId})
    if(!moveDir?._id){
       return res.json({message:"moved dir is not found"})
    }
    const updateFile = await Files.findOneAndUpdate(
      { _id: fileId },
      { $set: { parentId: new mongoose.Types.ObjectId(moveDir._id) } },
      { new: true }
    );
    if(updateFile?._id !== moveDir._id){
      return res.json({message:"object id is not matched"})
    }
    return res.json({message:"successfuly moved",success:true,})
  }catch(err){
    return res.json({message:"something went while moving file"})
  }
};
const copyFile =async (req: Request, res: Response) =>{
  try{
    const {currentDirId,moveDirId,fileId}= req.body
    
  }catch(err){

  }
}


export {
  createFile,
  addFileData,
  showFiles,
  deleteFiles,
  getFile,
  getResumableFiles,
  moveFile,
  copyFile,
};




function Resume() {
  // if(resume && checkFile?.fileName){
  //   let dirPath = `./storage/${checkFile?._id.toString()}${checkFile?.extension}`;
  //   return res.status(201).json(new ApiResponse<>({
  //     file:"already added",
  //     message:'file instance is created',
  //     success:true,
  //     data:{
  //       dirPath,
  //       fileId:checkFile?._id.toString(),
  //       orgFileSize:checkFile?.orgFileSize,
  //       uploaded:checkFile?.uploaded,
  //       uploadedByte:checkFile?.uploadedByte,
  //       percentage:checkFile?.percentage
  //   }})
  // }
}
