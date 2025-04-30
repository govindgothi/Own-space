// import React from 'react'
import React, { useState, useRef, useEffect } from "react";
import { FaFolder, FaFileAlt, FaTrash, FaFolderMinus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddDeletePopup from "../AddDeletePopup/AddDeletePopup";

interface rowProp {
  item:any
  clickPosition:any;
  setClickPosition:React.Dispatch<React.SetStateAction<any>>;
  handleAddFolder:any,
  handleDeleteFolder:any;
  handleRightClick:any
}

const RowList:React.FC<rowProp> = ({item,clickPosition, setClickPosition,handleAddFolder,handleDeleteFolder,handleRightClick}) => {
    const [isFolder,setIsFolder]=useState<any>(true)
    
  return (
    <div>
      <div className="flex justify-between items-center px-4 py-0.5 hover:bg-gray-100 rounded relative group bg-gray-50">
            <div className="flex items-center gap-2 text-gray-700"
              onClick={(e) => handleRightClick(e, item)}>
              {isFolder ? <FaFolder className="text-yellow-500 text-xl" /> : <FaFileAlt className="text-blue-500 text-xl" />}
              <span className="text-xl">{item.dirName}</span>
            </div>
            <div  className="relative">
                <button><BsThreeDotsVertical /></button>
                {clickPosition &&(<AddDeletePopup handleAddFolder={handleAddFolder} handleDeleteFolder={handleDeleteFolder} clickPosition={clickPosition}/>)}
            </div>
      </div>
    </div>
  )
}

export default RowList
