// import { useState } from "react";

export const useFileUploader = (setProgress: (value: number) => void) => {
  // const [progress, setProgress] = useState(0);

  const uploadFile = async (file: File) => {
    const fileInstance = await fetch("http://localhost:5000/api/v1/files/create", {
      method:'POST',
      headers:{
        filename:file.name,
        orgFileSize:file.size.toString(),
        parentId:'680650db78d822c6b63d3c25',
      }
    })
    const fileInstanceData = await fileInstance.json()
    console.log("object fileInstanceData",fileInstanceData)
    if (!file) return;
    const dirPath = fileInstanceData.data.dirPath || "./storage/68078ab3206ebeb7f44421ef.txt"
     const fileId = fileInstanceData.data.fileId || "68078ab3206ebeb7f44421ef"
    const orgFileSize = file.size.toString()
    const chunkSize = 1024 * 1024 * 5; // 5MB chunks
    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
      
    const res = await fetch("http://localhost:5000/api/v1/files/fileUpload", {
        method: "POST",
        body: chunk,
        headers: {
          range: `${i * chunkSize}-${(i + 1) * chunkSize}`,
          type: file.type,
          fileName: file.name,
          size: file.size.toString(),
          orgFileSize,
          dirPath,
          fileId,
        },
      });
      const data:any = await res.json()
      console.log(data)
      // Calculate and update progress
    //   const percentage = Math.round(((i + 1) / totalChunks) * 100);
      setProgress(data.fileSize.percentage);
    }
  };

  return { uploadFile };
};
