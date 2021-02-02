import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { List } from "../principalPage/LastBooks";
import { port } from "../principalPage/Principal";

const FindForSeeker = () => {
  const { seek, data } = useParams();
  const [list, setList] = useState([]);
  const url = `http://localhost:${port}/beginning/seeker/${seek}`;

  useEffect(() => {
    const dataPost = {};
    dataPost[seek] = data;
    const fetcher = async () => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataPost),
      });
      if (res.status !== 200) {
        console.warn("error", res);
      }
      const body = await res.json();
      setList(body);
    };
    fetcher();
  }, []);

  return (
    <div>
      {list.length > 0 ? <List array={list}></List> : <p>No hay libros</p>}
    </div>
  );
};

export { FindForSeeker };
