
import { useEffect, useState } from "react";
import FolderMenu from "../../components/FolderMenu/FolderMenu";
import Header from "../../components/Header/Header";
import ListRow from "../../components/ListRow.tsx/ListRow";
import useFetchDirectories from "../../hooks/useFetchDirectories";
import RowList from "../../components/RowList/RowList";


function Home() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!false);
  const [darkMode, setDarkMode] = useState(false);
  const [rowData,setRowData]=useState<any>({})
  const [clickPostion,setClickPosition] = useState<{ x: number; y: number; folder: any } | null>(null)

  const url = 'http://localhost:4000/api/v1/dir/show'
  const { state } = useFetchDirectories(url);
  const {data:treeData,loading,error} = state


  const handleDeleteFile = (fileName: string) => {
    console.log("Delete file:", fileName);
  };

  const handleDeleteDir = (dirName: string) => {
    console.log("Delete folder:", dirName);
  };
  const addNewFolder = ()=>{

  }

    const handleRightClick = (e: React.MouseEvent, folder: any) => {
      e.preventDefault();
      e.stopPropagation();
      setClickPosition({ x: e.pageX, y: e.pageY, folder });
    };
  
    const handleAddFolder = () => {
      if (clickPostion) {
        const folderName = prompt(`Enter new folder name inside "${clickPostion.folder.dirName}"`);
        if (folderName) {
          console.log(`Create new subfolder: ${folderName}`);
        }
        setClickPosition(null);
      }
    };
  
    const handleDeleteFolder = () => {
      if (clickPostion) {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${clickPostion.folder.dirName}"?`);
        if (confirmDelete) {
          console.log(`Delete folder: ${clickPostion.folder.dirName}`);
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


  return (
    <div>
      <Header
        isLoggedIn={isUserLoggedIn}
        onLogin={() => {}}
        onUpload={() => {}}
        onOpenBin={() => {}}
        onCreateFolder={() => {}}
        darkMode={darkMode}
        toggleTheme={() => setDarkMode(!darkMode)}
      />
  
      <div className="flex ">

      <div className="w-52 border-2 min-h-[600px]">
        { treeData ? <FolderMenu data={treeData} setRowData={setRowData} clickPosition={clickPostion} setClickPosition={setClickPosition}/> : ""}
      </div>


       <div className="p-2 w-full">
      <div className="space-y-1">
        {rowData.length>0 && rowData?.map((item:any, idx:number) => (
          <RowList 
            key={idx}
            item={item}
            clickPosition={clickPostion} 
            setClickPosition={setClickPosition}
            handleAddFolder={handleAddFolder}
            handleDeleteFolder={handleDeleteFolder}
            handleRightClick={handleRightClick}
            />
        ))}
      </div>
    </div>


      </div>
      {/* <Register></Register> */}
    </div>
  );
}

export default Home;
