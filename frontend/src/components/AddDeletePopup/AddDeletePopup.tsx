import { IoMdCloudUpload } from "react-icons/io"
import React from 'react'
import { createPortal } from "react-dom";
interface AddDeleteProp {
  top:number,
  left:number,
}

const AddDeletePopup:React.FC<AddDeleteProp> = ({top,left}) => {
    
  return createPortal(
      <div
      // absolute top-1/2 left-1/2 z-50 w-[22rem] -translate-x-1/2 -translate-y-1/2 transform rounded-lg border-2 bg-white">
          className="absolute bg-white shadow-lg border rounded-md p-1.5 z-50 w-44"
          style={{ top: top, left: left}}
        >
            <button className="w-full text-left hover:bg-gray-200 px-3 py-1  flex">
            <span ><IoMdCloudUpload className="text-xl "/></span> <span className="ml-1.5 text-sm">Upload file</span>
          </button>
          <button
            className="block w-full text-left hover:bg-gray-200 px-3 py-1 text-sm"
            // onClick={handleAddFolder}
          >
            ➕ Add New Folder
          </button>
          <button
            className="block w-full text-left hover:bg-gray-200 px-3 py-1 text-sm text-red-500"
            // onClick={handleDeleteFolder}
          >
            🗑️ Remove Folder
          </button>
          
          </div>,
         document.getElementById("menuCard") as HTMLElement,
  )
}

export default AddDeletePopup
