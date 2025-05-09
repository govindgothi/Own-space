import { ObjectId } from "mongoose"

interface IFiles {
    userId:ObjectId
    fileName:string,
    extension:string,
    parentId:ObjectId,
    orgFileSize:number,
    uploaded:boolean,
    uploadedByte:number,
    percentage:number,
    dirPath:string,
    reCycleBin:boolean
}

type createFileResponse = {
    dirPath:string,
    fileId:string,
    orgFileSize:number,        
}

export {
    IFiles,
    createFileResponse,
}