import { ObjectId } from "mongoose";

interface IDirectory {
    dirName:string,
    parentDirId:ObjectId | null,
    userId:ObjectId,
    rootId:ObjectId,
}
export {IDirectory}