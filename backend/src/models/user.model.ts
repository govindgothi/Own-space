import { Schema,model } from "mongoose";

interface IUser extends Document{
    username:string,
    password:string,
    email:string,
    rootDirId:string | null,
}

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