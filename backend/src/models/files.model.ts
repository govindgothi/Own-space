import { ObjectId, Schema,model } from "mongoose";

interface IFiles {
    userId:ObjectId
    fileName:string,
    extension:string,
    parentId:ObjectId,
    orgFileSize:number,
    uploaded:boolean,
    uploadedByte:number,
    percentage:number
}


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
   }

})

const Files = model('Files',filesSchema)
export {
    Files,IFiles
}