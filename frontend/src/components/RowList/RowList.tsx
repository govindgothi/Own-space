import React from "react";
import { FaFolder, FaFileAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addClickPosition } from "../../store/Slice/menuDataSlice";

interface RowProps {
  item: {
    _id: string;
    isFolder: boolean;
    dirName?: string;
    fileName?: string;
  };
}

const RowList: React.FC<RowProps> = ({ item }) => {
  const dispatch = useDispatch();
 console.log("object")
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    dispatch(
      addClickPosition({
        selectedId: item._id,
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      })
    );
  };

  return (
    <div className="group flex justify-between items-center  px-4 py-2 hover:bg-gray-100 relative mb-1 bg-white rounded w-[700px]">
      <div className="flex items-center gap-2 text-gray-700">
        {item.isFolder ? (
          <FaFolder className="text-yellow-500 text-xl" />
        ) : (
          <FaFileAlt className="text-blue-500 text-xl" />
        )}
        <span className="text-xl">
          {item.isFolder ? item.dirName : item.fileName}
        </span>
      </div>
      <div className="relative">
        <button className="group-hover:bg-white p-2" onClick={handleRightClick}>
          <BsThreeDotsVertical />
        </button>
      </div>
    </div>
  );
};


export default React.memo(RowList, (prev, next) => prev.item._id === next.item._id);
