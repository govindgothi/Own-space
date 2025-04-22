import { Schema,model } from "mongoose";

interface IFiles extends Document{
    fileName:string,
    extension:string,
    parentId:string,
    orgFileSize:number,
    uploaded:boolean,
    uploadedByte:number,
    percentage:number
}


const filesSchema = new Schema<IFiles>({
  extension:{
    type:String
  },
  fileName:{
    type:String,
  },
  parentId:{
    type:String,
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
   }

})

const Files = model('Files',filesSchema)
export {
    Files,IFiles
}