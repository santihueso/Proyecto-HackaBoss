import { useState, useEffect } from "react";

const useFetchPostData = (url, auth, post) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(post),
      });

      if (res.status !== 200) {
        console.warn("error", res);
      }
      const body = await res.json();
      setData(body);
    };
    fetcher();
  }, []);
  return [data, setData];
};

export { useFetchPostData };
