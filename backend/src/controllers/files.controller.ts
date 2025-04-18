import { User, IUser } from "../models/user.model.js";
import { Directories } from "../models/directories.model.js";
import { Files } from "../models/files.model.js";
import { Request, Response } from "express";
import fs from "node:fs";
import path from "node:path";


const createFile = async (req: Request, res: Response) => {
  const filename = req.headers.filename?.toString();
  if (!filename) {
    return res.status(400).json({ success: false, message: "Filename missing" });
  }
 const recievefileSize:any = req.headers.size
  const folderPath = "./storage/govind";
  const fullPath = path.join(folderPath, filename);
  const writeStream = fs.createWriteStream(fullPath, { flags: "a" });

  req.on("data", (chunk) => {
    const canWrite = writeStream.write(chunk);
    if (!canWrite) {
      req.pause();
      writeStream.once("drain", () => req.resume());
    }
  });

  req.on("end", () => {
    writeStream.end(); // Ensures stream is closed
    writeStream.on("finish", () => {
      fs.stat(fullPath, (err, stats) => {
        if (err) {
          console.error("Error getting file stats:", err);
          return res.status(500).json({ success: false, message: "Error getting file info" });
        }
 
        const fileSizeInBytes = stats.size;
        const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
        const percentage = (fileSizeInBytes/recievefileSize)*100
        return res.status(202).json({
          success: true,
          message: "File uploaded",
          fileSize: {
            fileSizeInBytes,
            fileSizeInMB,
            percentage
          },
        });
      });
    });
  });

  req.on("error", (err) => {
    console.error("Request stream error:", err);
    return res.status(500).json({ success: false, message: "Upload failed" });
  });
};
const showFiles = async (req: Request, res: Response) => {
 const id = req.params
 if(!id){
  return res.json("no id")
 }
 const folderPath = "./storage/govind";
 const fullPath = path.join(folderPath, id.toString());
 console.log(fullPath)
 const range = req.headers.range;
 console.log(range)
 
};
const deleteFiles = async (req: Request, res: Response) => {};
const getFile = async (req: Request, res: Response) => {
  const {id} = req.params
  console.log(id,"id")
  const folderPath = "./storage/govind";
  const fullPath = path.join(folderPath, id.toString());
  console.log(fullPath,"full fath")
  const stat = fs.statSync(fullPath);
  const fileSize = stat.size;
  const range = req.headers.range;
  console.log("range",range)  

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    console.log("parts",parts)
    const start = parseInt(parts[0], 10);
    let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    console.log("chunksize",chunksize/(1024 * 1024))
    const MAX_CHUNK_SIZE = 40 * 1024 * 1024; // 40MB in bytes
    console.log("Max_chunk_size")
    if (end - start + 1 > MAX_CHUNK_SIZE) {
    end = start + MAX_CHUNK_SIZE - 1;
    }
    const file = fs.createReadStream(fullPath, { start, end });
   console.log("start",start)
   console.log("end",end)
   console.log("chunk",chunksize)
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
    fs.createReadStream(fullPath).pipe(res);
  }
};

export { createFile, showFiles, deleteFiles, getFile };
