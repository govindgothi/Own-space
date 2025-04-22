import { Schema,model } from "mongoose";

interface IDirectory extends Document{
    dirName:string,
    parentDirId:string,
    userId:string
}


const dirSchema = new Schema<IDirectory>({
   dirName:{
    type:String,
    required:true,
   },
   parentDirId:{
    type:String,
    // required:true,
   },
   userId:{
    type:String,
   }
  
})

const Directories = model('Directories',dirSchema)

export {
    Directories,IDirectory
}