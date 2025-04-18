// import React, { useRef } from 'react'
import { uploadFile } from '../../hooks/Uploadfile'
// import { useState } from "react"


import React, { useState } from "react";

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected file:", selectedFile);
    }
  };

     const handleUpload =()=>{
    if(file){
        uploadFile(file)
    }
   }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* File input inside label */}
      <div className="flex items-center">
      <label className="cursor-pointer mx-3 bg-green-400 py-1 px-2 rounded text-xs flex items-center justify-center">
        Select File
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {file && <p className="text-sm text-gray-800">file: {file.name}</p>}
      {file && <button
        className="mx-3 bg-gray-300 p-2 py-1 px-4 rounded-xl"
        onClick={handleUpload}
      >
        Upload
      </button>
      }
      </div>
      

      <div className='w-[60%] mx-auto h-5 bg-green-400 border rounded-2xl'></div>
    </div>
  );
};

export default FileUploader;







// const InputFile = () => {
// //    const [file,setFile] = useState<File>()
//    const fileInputRef = useRef<HTMLInputElement>(null);
//    const [file, setFile] = useState<File | null>(null);
 
//    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//      const selectedFile = e.target.files?.[0];
//      if (selectedFile) {
//        setFile(selectedFile);
//        console.log("Selected file:", selectedFile.name);
//      }
//    };
// //    const handleFileChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
// //    e.preventDefault()
// //    const files = e.target.files
// //    if(files && files.length > 0){
// //    setFile(files[0])
// //    }
// //    console.log(files)
// //    }

// const handleSelectClick = () => {
//     fileInputRef.current?.click();
//   };
//    const handleUpload =()=>{
//     if(file){
//         uploadFile(file)
//     }
//    }

//   return (<>
//    <div className="flex flex-col items-center space-y-4">
//       {/* Hidden input */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         style={{ display: "none" }}
//       />

//       {/* Buttons */}
//       <div className="flex w-[500px] h-[50px] items-center">
//         <button
//           className="mx-3 bg-amber-500 p-2 rounded-2xl w-[100px] h-[90%]"
//           onClick={handleUpload}
//         >
//           Upload
//         </button>

//         <button
//           className="mx-3 bg-amber-500 p-2 rounded-2xl w-[100px] h-[90%]"
//           onClick={handleSelectClick}
//         >
//           Select File
//         </button>
//       </div>

//       {file && <p className="text-sm text-gray-600">Selected: {file.name}</p>}
//     </div>
//     <div className='w-[60%] mx-auto h-5 bg-green-400 border rounded-2xl'></div>
//   </>)
// }

// export default InputFile
