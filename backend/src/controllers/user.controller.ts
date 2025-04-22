import { IUser, User } from "../models/user.model.js";
import express,{ NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Directories } from "../models/directories.model.js";
type Users={
    userName:string,
    password:string,
    parentId:string,
    files:string[],
    directories:string[]
}
const registerUser = async(req:Request,res:Response, next:NextFunction): Promise<void> =>{
 const {username,email,password} = req.body
 const userRootDir = await Directories.insertOne({
    dirName:`root-${email}`,
    parentDirId:null,
    userId:null
 })
 const rootDirId = userRootDir._id
 const newUser = await User.create({
    username,
    email,
    password,
    rootDirId,
 })
//  console.log(newUser)
 if(!newUser) return next(new ApiError(201, `user is not created `));
  const updateRootDir = await Directories.updateOne({_id:rootDirId},{$set:{userId:newUser._id}})
  res.status(201).json(new ApiResponse(401,{userRootDir},'user created'));
}
const loginUser = async(req:Request,res:Response)=>{
  
}

export {
    registerUser,
    loginUser
}