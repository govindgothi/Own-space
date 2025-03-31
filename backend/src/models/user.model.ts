import { Schema,model } from "mongoose";

interface IUser extends Document{
    userName:string,
    password:string,
    parentId:string | null,
    files:string[],
    directories:string[]
}

const userSchema = new Schema<IUser>({
    userName:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    parentId:{
        type:String,
        default:null
    },
    files:[
       {
         type:String
       }
    ],
    directories:[
        {
          type:String
        }
     ]
})

const User = model('User',userSchema)

export {
    User,IUser
}