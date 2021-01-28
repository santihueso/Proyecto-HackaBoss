import React, { useState, useEffect } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setData(res, (msg) => console.log("Err:", msg)));
  }, []);
  return [data, setData];
};

export { useFetchData };
