import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { List } from "./List-Avatar";
import { port } from "./Principal";

const FindForSeeker = () => {
  const { seek, data } = useParams();
  const [list, setList] = useState([]);
  const url = `http://localhost:${port}/beginning/seeker/${seek}`;

  const link = (idBook) => `/principal/category/0/seeker/book/${idBook}`;

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
  }, [url, seek, data]);
  let name;
  if (seek === "title") {
    name = "Titulo";
  } else if (seek === "author") {
    name = "Autor";
  } else if (seek === "city") {
    name = "Ciudad";
  } else if (seek === "cp") {
    name = "Código postal";
  }

  return (
    <div className="listBooksUser">
      <p>{name}</p>
      <Link to="/principal">Principal ˃ </Link>

      {list.length > 0 ? (
        <List array={list} link={link}></List>
      ) : (
        <p>No hay libros</p>
      )}
    </div>
  );
};

export { FindForSeeker };
