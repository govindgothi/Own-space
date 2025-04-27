import mongoose from "mongoose"
import dotenv from "dotenv";
import { app } from "./index.js";
import client from "./db/redis.db.js";
dotenv.config({
    path: './.env'
})


 
async function main() {
  await client.connect()
  await mongoose.connect('mongodb://127.0.0.1:27017/StorageApp');
     console.log("mongodb is connected")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server is lisetn")
    })
}).catch((err)=>{
    console.log("err",err)
})

