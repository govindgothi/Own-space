import { IUser, User } from "../models/user.model.js";
import express,{ NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
type Users={
    userName:string,
    password:string,
    parentId:string,
    files:string[],
    directories:string[]
}
const registerUser = async(req:Request,res:Response, next:NextFunction): Promise<void> =>{
 const { userName, password, files, directories} = req.body
 console.log(userName)
 const newUser = await User.create({
    userName,
    password,
    files:[],
    directories:[],
 })
 console.log(newUser)
 if(!newUser) return next(new ApiError(401, `user is not created `));
  res.status(201).json(new ApiResponse(201,{newUser},'user created'));
}
const loginUser = async(req:Request,res:Response)=>{
  
}

export {
    registerUser,
    loginUser
}