import { useState, useEffect } from "react";

const useFetchAuth = (url, auth) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json", Authorization: auth },
      });
      const body = await res.json();
      if (res.status !== 200) {
        console.warn("error", res);
      }

      setData(body);
    };
    getData();
  }, [url, auth]);
  return [data, setData];
};

export { useFetchAuth };
