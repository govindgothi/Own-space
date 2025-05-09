import { Schema,model } from "mongoose";

import { IFiles } from "../interface_type/files.interface.js";


const filesSchema = new Schema<IFiles>({
  userId:{
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  extension:{
    type:String
  },
  fileName:{
    type:String,
  },
  parentId:{
    type: Schema.Types.ObjectId, 
    ref: 'Directories' 
  },
  orgFileSize:{
    type:Number
  },
  uploaded:{
    type:Boolean
  },
  uploadedByte:{
      type:Number
  },
  percentage:{
    type:Number
   },
  dirPath:{
    type:String
  },
  reCycleBin:{
    type:Boolean,
    default:false
  }
})

const Files = model('Files',filesSchema)
export {
    Files
}