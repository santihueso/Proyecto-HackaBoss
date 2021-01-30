import React, { useState, useEffect } from "react";
import { useFetchData } from "../useFetchData";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { port } from "./Principal";

const Avatar = ({ e }) => {
  const url = `http://localhost:${port}/uploads/${e.photoFront}`;
  const linkOfBook = `/beginning/category/${e.id_product}`;

  return (
    <Link to={linkOfBook}>
      <img src={url} alt="avatar" style={{ maxWidth: 80 }}></img>
    </Link>
  );
};

const List = ({ array }) => {
  const listBooks = array.map((e) => {
    return (
      <li id={e.id}>
        <p>{e.productName}</p>
        <Avatar e={e}></Avatar>
        <p>{e.price}</p>
      </li>
    );
  });
  return listBooks;
};

const LastBooks = () => {
  const [data, setData] = useFetchData(
    `http://localhost:${port}/beginning/lastBooks`
  );
  const showBooks = [];

  if (data.length > 8) {
    for (let i = 0; i < 8; i++) {
      showBooks.push(data[i]);
    }
    return (
      <section id="lastBooks">
        <p>Últimos libros</p>
        <List array={showBooks}></List>
      </section>
    );
  } else {
    return (
      <section id="lastBooks">
        <p>Últimos libros</p>
        <List array={data}></List>
      </section>
    );
  }
};

export { LastBooks, List };
