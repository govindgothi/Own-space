import mongoose, { Schema,model } from "mongoose";

interface IDirectory {
    dirName:string,
    parentDirId:Schema.Types.ObjectId,
    userId:Schema.Types.ObjectId,
    rootId:Schema.Types.ObjectId,
}


const dirSchema = new Schema<IDirectory>({
   dirName:{
    type:String,
    required:true,
   },
   parentDirId:{
    type: Schema.Types.ObjectId, 
    ref: 'Directories' 
   },
   userId:{
    type:Schema.Types.ObjectId,
    ref: 'User'
   },
   rootId: {
     type: Schema.Types.ObjectId, 
     ref: 'Directories' 
    },
  
})

const Directories = model('Directories',dirSchema)

export {
    Directories,IDirectory
}