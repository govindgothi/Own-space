// import FolderMenu from "./components/FolderMenu/FolderMenu";
// import Header from "./components/Header/Header";
// import data from "../data.json";
// import { useEffect, useState } from "react";
// import Register from "./pages/Register/Register";

import { Outlet } from "react-router"
import ListRow from "./components/ListRow.tsx/ListRow";
import AddDeletePopup from "./components/AddDeletePopup/AddDeletePopup";
import RowList from "./components/RowList/RowList";

// function App() {
//   const [treeData, setTreeData] = useState<any>({});
//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(!false);
//   const [darkMode, setDarkMode] = useState(false);
//   const callTree = async () => {
//     const tree = await fetch("http://localhost:4000/api/v1/dir/show");
//     const res = await tree.json();
//     setTreeData(res);
//   };

//   useEffect(() => {
//     callTree(); // fetch once on mount
//   }, []);

//   useEffect(() => {
//     console.log("Updated Tree Data:", treeData);
//   }, [treeData]);

//   return (
//     <div>
//       {/* <Header
//         isLoggedIn={isUserLoggedIn}
//         onLogin={() => {}}
//         onUpload={() => {}}
//         onOpenBin={() => {}}
//         onCreateFolder={() => {}}
//         darkMode={darkMode}
//         toggleTheme={() => setDarkMode(!darkMode)}
//       />

//       <div className="w-52 border-2 min-h-[600px]">
//         {treeData.length > 0 ? <FolderMenu data={treeData} /> : ""}
//       </div> */}
//       <Register></Register>
//     </div>
//   );
// }

// export default App;
// import React from 'react'
const dummyData = [
  { name: "Documents", isFolder: true },
  { name: "Resume.pdf", isFolder: false },
  { name: "Photos", isFolder: true },
  { name: "invoice.docx", isFolder: false },
];

const App = () => {

    const handleDeleteFile = (fileName: string) => {
      console.log("Delete file:", fileName);
    };
  
    const handleDeleteDir = (dirName: string) => {
      console.log("Delete folder:", dirName);
    };
  return (
    <div>
      <Outlet></Outlet>
      {/* <AddDeletePopup></AddDeletePopup> */}
      {/* <RowList></RowList> */}
    </div>
  )
}

export default App
