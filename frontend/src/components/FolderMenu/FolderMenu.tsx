import React, { useState } from 'react';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import AddDeletePopup from '../AddDeletePopup/AddDeletePopup';

interface FolderMenuProps {
  data: any[];
  setRowData:React.Dispatch<React.SetStateAction<any>>;
  clickPosition:any;
  setClickPosition:React.Dispatch<React.SetStateAction<any>>;
}

const FolderMenu: React.FC<FolderMenuProps> = ({ data ,setRowData,clickPosition,setClickPosition}) => {
  const [isExpandable, setIsExpandable] = useState<{ [key: string]: boolean }>({});
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; folder: any } | null>(null);

  const handleExpandlable = (e: React.MouseEvent, dirName: string) => {
    e.stopPropagation();
    setIsExpandable((prev) => ({
      ...prev,
      [dirName]: !prev[dirName],
    }));
    setClickPosition(null);
  };

  const handleRightClick = (e: React.MouseEvent, folder: any) => {
    e.preventDefault();
    e.stopPropagation();
    setClickPosition({ x: e.pageX, y: e.pageY, folder });
  };

  const handleAddFolder = () => {
    if (contextMenu) {
      const folderName = prompt(`Enter new folder name inside "${contextMenu.folder.dirName}"`);
      if (folderName) {
        console.log(`Create new subfolder: ${folderName}`);
      }
      setClickPosition(null);
    }
  };

  const handleDeleteFolder = () => {
    if (contextMenu) {
      const confirmDelete = window.confirm(`Are you sure you want to delete "${contextMenu.folder.dirName}"?`);
      if (confirmDelete) {
        console.log(`Delete folder: ${contextMenu.folder.dirName}`);
      }
      setClickPosition(null);
    }
  };

  const closeContextMenu = () => {
    setClickPosition(null);
  };
  const handleDoubleClick=(data:any)=>{
    console.log(data)
     setRowData(data)
  }

  const renderFolder = (folder: any, level: number = 0) => {
    if (!folder.isFolder) return null; 

    return (
      <div key={folder._id} className="pl-3">
        <div
          className="flex items-center gap-2 py-1 cursor-pointer text-gray-800 hover:bg-gray-100 rounded-md"
          style={{ paddingLeft: `${level * 20}px` }}
          onContextMenu={(e) => handleRightClick(e, folder)}
          onClick={(e) => handleExpandlable(e, folder.dirName)}
        >
          {isExpandable[folder.dirName] ? (
            <FaFolderOpen className="text-yellow-500" />
          ) : (
            <FaFolder className="text-yellow-500" />
          )}
          <span onDoubleClick={()=>handleDoubleClick(folder.children)}>{folder.dirName}</span>
        </div>
        {folder.children && isExpandable[folder.dirName] && (
          <div>
            {folder.children.map((child: any) => renderFolder(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    
    <div className="relative" onClick={closeContextMenu}>
      {data.map((folder) => renderFolder(folder))}

      {clickPosition && (<AddDeletePopup handleAddFolder={handleAddFolder} handleDeleteFolder={handleDeleteFolder} clickPosition={clickPosition}/>  )}
    </div>
  );
};

export default FolderMenu;
