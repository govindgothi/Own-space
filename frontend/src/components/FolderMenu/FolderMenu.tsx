import React, { useState } from 'react';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';

interface IDirectory {
  _id: string;
  dirName: string;
  isFolder: boolean;
  parentDirId: string | null;
  rootId: string;
  userId: string;
  children?: IDirectory[];
  __v?: number;
}

interface Props {
  data: IDirectory;
  level?: number;
}

const FolderMenuComponent: React.FC<Props> = ({ data, level = 0 }) => {
  const [isExpandable, setIsExpandable] = useState<{ [key: string]: boolean }>({});

  const handleExpandlable = (e: React.MouseEvent, dirName: string) => {
    e.stopPropagation();
    setIsExpandable((prev) => ({
      ...prev,
      [dirName]: !prev[dirName],
    }));
  };
  console.log("folder")

  const handleRightClick = (e: React.MouseEvent, folder: IDirectory) => {
    e.preventDefault();
    e.stopPropagation(); // Add popup logic here
  };

  if (!data.children) return null;

  return (
    <div className="">
      <div
        className="flex items-center gap-2 pl-1 py-0.5 cursor-pointer text-gray-800 hover:bg-gray-100 rounded-md"
        style={{ marginLeft: `${level * 16}px` }}
        onClick={(e) => handleExpandlable(e, data.dirName)}
        onContextMenu={(e) => handleRightClick(e, data)}
      >
        {isExpandable[data.dirName] ? (
          <FaFolderOpen className="text-yellow-500 text-xl ml-2" />
        ) : (
          <FaFolder className="text-yellow-500 text-xl ml-2" />
        )}
        <span className="text-xl ml-1">{data.dirName}</span>
      </div>

      {isExpandable[data.dirName] &&
        data.children?.map((child) => (
          <MemoizedFolderMenu key={child._id} data={child} level={level + 1} />
        ))}
    </div>
  );
};

// ✅ Memoize with custom comparison
const MemoizedFolderMenu = React.memo(FolderMenuComponent, (prev, next) => {
  return prev.data._id === next.data._id &&
         prev.data.children === next.data.children &&
         prev.level === next.level;
});

export default MemoizedFolderMenu;
