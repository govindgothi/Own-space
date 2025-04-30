import { useState, useEffect } from "react";

// interface FetchState<T> {
//   data: T | null;
//   loading: boolean;
//   error: string | null;
// }

const useFetchDirectories = (url: string, options?: RequestInit) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });

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
