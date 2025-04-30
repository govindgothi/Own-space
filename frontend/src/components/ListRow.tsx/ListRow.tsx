import React, { useState, useRef, useEffect } from "react";
import { FaFolder, FaFileAlt, FaTrash, FaFolderMinus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ListRowProps {
  name: string;
  isFolder: boolean;
  onDeleteFile: () => void;
  onDeleteDir: () => void;
}

const ListRow: React.FC<ListRowProps> = ({
  name,
  isFolder,
  onDeleteFile,
  onDeleteDir,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  console.log(name)
  return (
    <div className="flex justify-between items-center px-4 py-0.5 hover:bg-gray-100 rounded relative group">
      <div className="flex items-center gap-2 text-gray-700">
        {isFolder ? <FaFolder className="text-yellow-500" /> : <FaFileAlt className="text-blue-500" />}
        <span>{name}</span>
      </div>

      <button
        onClick={() => setShowPopup(!showPopup)}
        className="text-gray-500 hover:text-black"
      >
        <BsThreeDotsVertical />
      </button>

      {showPopup && (
        <div
          ref={popupRef}
          className="absolute right-2 top-10 z-10 bg-white shadow-md border border-gray-200 rounded w-40 text-sm"
        >
          {isFolder ? (
            <button
              onClick={() => {
                onDeleteDir();
                setShowPopup(false);
              }}
              className="flex items-center w-full px-3 py-2 hover:bg-red-50 text-red-600"
            >
              <FaFolderMinus className="mr-2" /> Delete Folder
            </button>
          ) : (
            <button
              onClick={() => {
                onDeleteFile();
                setShowPopup(false);
              }}
              className="flex items-center w-full px-3 py-2 hover:bg-red-50 text-red-600"
            >
              <FaTrash className="mr-2" /> Delete File
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ListRow;
