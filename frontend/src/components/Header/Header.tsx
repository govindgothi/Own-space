import React, { useState } from "react";
import {
  LogIn,
  UploadCloud,
  Trash2,
  FolderPlus,
  Sun,
  Moon,
} from "lucide-react";
import { SiGoogleadsense } from "react-icons/si";

// interface HeaderProps {
//   isLoggedIn: boolean;
//   onLogin: () => void;
//   onUpload: () => void;
//   onOpenBin: () => void;
//   onCreateFolder: () => void;
//   darkMode?: boolean;
//   toggleTheme?: () => void;
// }

const Header: React.FC = () => {
  const [darkMode,setDarkMode]=useState(false)
  const [isLoggedIn,setIsLoggedIn]=useState(!true)
  return (
    <header
      className={`flex items-center justify-between px-4 py-3 shadow-md mb-1 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Logo and Name */}
      <div className="flex items-center space-x-5">
        {/* <img src="/logo.png" alt="Logo" className="w-8 h-8" /> */}
        <SiGoogleadsense  className="text-3xl"/>
        <span className="text-xl font-semibold">MyStorage</span>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
          <button onClick={()=>setDarkMode(!darkMode)} title="Toggle Theme">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        

        {!isLoggedIn ? (
          <button className={`bg-gray-100 px-4 py-1 rounded-xs shadow text-xl
              ${darkMode ? "bg-gray-700 text-white " : "bg-white text-gray-900"}

           `} onClick={()=>setIsLoggedIn(!isLoggedIn)} title="Login">
            login
          </button>
        ) : (
          <>
            <button  title="Upload">
              <UploadCloud size={20} />
            </button>
            <button  title="New Folder">
              <FolderPlus size={20} />
            </button>
            <button  title="Recycle Bin">
              <Trash2 size={20} />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
