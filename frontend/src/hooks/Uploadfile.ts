// import React from "react";

// import { useState } from "react";

const uploadFile = async (file: File) => {
//    const [fileData,setFileData]= useState({
//     sendData:0,
//     recieveData:0
//    })
    const chunkSize = 1024 * 512;
    const totalChunks = Math.ceil(file.size / chunkSize);
    // const fileId = crypto.randomUUID(); // for backend to identify

    for (let i = 0; i < totalChunks; i++) {
        const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
        const res = await fetch("http://localhost:5000/api/v1/files/create", {
            method: "POST",
            body: chunk,
            headers: {
                range:`${i*chunkSize}-${(1+i)*chunkSize}`,
                type:`${file.type}`,
                fileName:`${file.name}`,
                size:`${file.size}`        
            }
        });
        const data = await res.json()
        // setFileData((prev)=>({
        //     ...prev,
        //     [fileData.sendData]:chunk
        // }))
        console.log('data',data)
    }
    // console.log("fileData",fileData)

    // Optional: Notify backend to finalize
    // await fetch(`/api/merge?fileId=${fileId}`);
};
export {
    uploadFile
}