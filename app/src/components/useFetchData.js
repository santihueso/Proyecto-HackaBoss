import { useState, useEffect } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.warn("problema!!!", res);
          return res.json();
        }
      })
      .then((res) => setData(res))
      .catch((error) => console.error(error));
  }, [url]);
  return [data, setData];
};

export { useFetchData };
