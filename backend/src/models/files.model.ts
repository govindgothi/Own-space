import { Schema,model } from "mongoose";

interface IFiles extends Document{
    extension:string,
    fileName:string,
    parentId:string,
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
  }
})

const Files = model('Files',filesSchema)
export {
    Files,IFiles
}