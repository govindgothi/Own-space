import { useEffect, useState } from "react";
// import FolderMenu from "../../components/FolderMenu/FolderMenu";
import Header from "../../components/Header/Header";
import useFetchDirectories from "../../hooks/useFetchDirectories";
import RowList from "../../components/RowList/RowList";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import FolderMenu from "../../components/FolderMenu/FolderMenu";
import { useDispatch, useSelector } from "react-redux";
import AddDeletePopup from "../../components/AddDeletePopup/AddDeletePopup";
import { addClickPosition } from "../../store/Slice/menuDataSlice";

function Home() {
  const [showListData, setShowListData] = useState<any>([]);
  const dispatch = useDispatch();
  const url = "http://localhost:4000/api/v1/dir/show";
  const { state } = useFetchDirectories(url);
  const { data: treeData, error, loading } = state;

  const menu = useSelector((state: any) => state.menu);
  console.log("object", menu);

  console.log(treeData, Array.isArray(treeData), error, loading);
  useEffect(() => {
    if (Array.isArray(treeData) && treeData.length > 0) {
      setShowListData(treeData[0].children);
    }
  }, [treeData]);
  console.log(showListData);

  const handleClosePopuop = () => {
    dispatch(
      addClickPosition({
        selectedId: null,
        top: 0,
        left: 0,
      })
    );
  };
  if (menu.top > 0 && menu.left > 0) {
    document.addEventListener("mousedown", handleClosePopuop);
  }

  return (
    <div>
      <Header />

      <div className="flex bg-gray-200">
        <div className="w-52  min-h-[600px] bg-white m-2 p-2">
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={"error"} />}
          {Array.isArray(treeData) &&
            treeData.length > 0 &&
            treeData.map((item) => <FolderMenu key={item._id} data={item} />)}
        </div>

        <div className=" m-2">
          <div className="space-y-1 bg-gray-100">
            {showListData?.length > 0 &&
              showListData?.map((item: any, idx: number) => (
                <RowList key={idx} item={item} />
              ))}
          </div>
        </div>
      </div>
      {menu.top > 0 && menu.left > 0 && (
        <AddDeletePopup top={menu.top} left={menu.left} />
      )}
    </div>
  );
}

export default Home;
