import { Request, Response,NextFunction } from "express";
import fs from 'node:fs'
import path from "node:path";
// import { User,IUser } from "../models/user.model.js";
// import { Directories } from "../models/directories.model.js";



const createDir = async (req: Request, res: Response,next:NextFunction) => {
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
};

const showDir = async(req:Request,res:Response)=>{
  
}
const deleteDir=async(req:Request,res:Response)=>{

}

export {
    createDir,
    showDir,
    deleteDir,
}