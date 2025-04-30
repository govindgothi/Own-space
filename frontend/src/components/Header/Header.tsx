import React from "react";
import {
  LogIn,
  UploadCloud,
  Trash2,
  FolderPlus,
  Sun,
  Moon,
} from "lucide-react";
import { SiGoogleadsense } from "react-icons/si";

interface HeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onUpload: () => void;
  onOpenBin: () => void;
  onCreateFolder: () => void;
  darkMode?: boolean;
  toggleTheme?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  onLogin,
  onUpload,
  onOpenBin,
  onCreateFolder,
  darkMode = false,
  toggleTheme,
}) => {
  return (
    <header
      className={`flex items-center justify-between px-4 py-3 shadow-md ${
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
        {toggleTheme && (
          <button onClick={toggleTheme} title="Toggle Theme">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}

        {!isLoggedIn ? (
          <button onClick={onLogin} title="Login">
            <LogIn size={20} />
          </button>
        ) : (
          <>
            <button onClick={onUpload} title="Upload">
              <UploadCloud size={20} />
            </button>
            <button onClick={onCreateFolder} title="New Folder">
              <FolderPlus size={20} />
            </button>
            <button onClick={onOpenBin} title="Recycle Bin">
              <Trash2 size={20} />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
