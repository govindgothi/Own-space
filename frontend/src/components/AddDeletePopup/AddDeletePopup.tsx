import { useState } from "react"
import { IoMdCloudUpload } from "react-icons/io"
import React from 'react'
interface AddDeleteProp {
  handleAddFolder: any;
  handleDeleteFolder:any;
  clickPosition:any;
  // handleRightClick:any
}

const AddDeletePopup:React.FC<AddDeleteProp> = ({handleAddFolder,handleDeleteFolder,clickPosition}) => {
    
  return (
    // <div className="bg-amber-300 w-[100%] h-[100vh] relative">
      <div
          className="absolute bg-white shadow-lg border rounded-md p-1.5 z-50 w-44"
          style={{ top: clickPosition.x, left: clickPosition.y }}
        >
            <button className="w-full text-left hover:bg-gray-200 px-3 py-1  flex">
            <span ><IoMdCloudUpload className="text-xl "/></span> <span className="ml-1.5 text-sm">Upload file</span>
          </button>
          <button
            className="block w-full text-left hover:bg-gray-200 px-3 py-1 text-sm"
            onClick={handleAddFolder}
          >
            ➕ Add New Folder
          </button>
          <button
            className="block w-full text-left hover:bg-gray-200 px-3 py-1 text-sm text-red-500"
            onClick={handleDeleteFolder}
          >
            🗑️ Remove Folder
          </button>
          
          </div>
    // </div>
  )
}

export default AddDeletePopup
