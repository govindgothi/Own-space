import { Schema,model } from "mongoose";
import { IDirectory } from "../interface_type/directories.interface.js";


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
    Directories
}