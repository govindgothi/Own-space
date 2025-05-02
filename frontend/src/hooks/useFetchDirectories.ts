import { useState, useEffect } from "react";

export interface IDirectory {
  _id: string;
  dirName: string;
  isFolder: boolean;
  parentDirId: string | null;
  rootId: string;
  userId: string;
  children?: IDirectory[];
  __v?: number; // Mongoose version key (optional)
}


const useFetchDirectories = (url: string, options?: RequestInit) => {
  const [state, setState] = useState<{
    data: IDirectory[] | null,
    loading: boolean,
    error: boolean |null ,}>({
      data:[],
      loading:true,
      error:false
    });
    

  useEffect(() => {
    let isMounted = true;
    console.log("clalling1234")
    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });
      console.log("clalling")
      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const json = await res.json();
        if (isMounted) setState({ data: json, loading: false, error: null });
      } catch (err: any) {
        if (isMounted) setState({ data: null, loading: false, error: err.message });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return {state};
};

export default useFetchDirectories;
