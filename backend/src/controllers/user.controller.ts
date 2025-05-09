import { IUser, User } from "../models/user.model.js";
import express,{ NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Directories } from "../models/directories.model.js";
import data from "../utils/fileDb.js";

type Users={
    userName:string,
    password:string,
    parentId:string,
    files:string[],
    directories:string[]
}
const registerUser = async(req:Request,res:Response, next:NextFunction): Promise<void> =>{
 const {username,email,password} = req.body
 const newUser = await User.create({
    username,
    email,
    password,
 })

 if(!newUser) return next(new ApiError(201, `user is not created `));
 const userDirs = data.map((dir:any) => ({
    ...dir,
    userId: newUser._id.toString()
  }));
  console.log(userDirs)
  const userRootDir = await Directories.insertMany(userDirs)
  const bulkOps = userRootDir.map(({ _id }) => ({
    updateOne: {
      filter: { _id },
      update: { $set: { rootId: _id } }
    }
  }));
  
  const update  = await Directories.bulkWrite(bulkOps);
  res.status(201).json(new ApiResponse(401, {update},'user created'));
}
const loginUser = async(req:Request,res:Response)=>{
  
}

export {
    registerUser,
    loginUser
}