import { Schema,model } from "mongoose";

interface IDirectory extends Document{
    dirName:string,
    parentDirId:string,
    files:string[],
    directories:string[],
}


const dirSchema = new Schema<IDirectory>({
   dirName:{
    type:String,
    required:true,
   },
   parentDirId:{
    type:String,
    required:true,
   },
   files:[
    {
        type:String,
    }
   ],
   directories:[
    {
        type:String, 
    }
   ]
})

const Directories = model('Directories',dirSchema)

export {
    Directories,IDirectory
}