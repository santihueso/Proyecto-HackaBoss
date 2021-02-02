import { useState, useEffect } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(url);

      if (res.status !== 200) {
        console.warn("error", res);
      }
      const body = await res.json();
      setData(body);
    };
    fetcher();
  }, [url]);

  return [data, setData];
};

export { useFetchData };
