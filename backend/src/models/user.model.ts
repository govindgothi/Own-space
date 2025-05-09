import { Schema,model } from "mongoose";
import { IUser } from "../interface_type/users.interface.js";


const userSchema = new Schema<IUser>({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    rootDirId:{
        type:String
    },
})

const User = model('User',userSchema)

export {
    User,IUser
}