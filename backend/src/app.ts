import mongoose from "mongoose"
import dotenv from "dotenv";
import { app } from "./index.js";

dotenv.config({
    path: './.env'
})



async function main() {
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






// import http from "http";
// import express from 'express'
// import { tcpServer } from "./tcp.js";
// const app = express()
// // Use API routes
// app.use(express.json());

// // Create an HTTP server
// const httpServer = http.createServer(app);

// // Start both HTTP and TCP servers
// const HTTP_PORT = 3000;
// const TCP_PORT = 4000;

// httpServer.listen(HTTP_PORT, () => console.log(`HTTP Server running on port ${HTTP_PORT}`));
// tcpServer.listen(TCP_PORT, () => console.log(`TCP Server running on port ${TCP_PORT}`));
// export default app;