import React from "react";
import { useFetchData } from "../useFetch/useFetchData";
import { Link } from "react-router-dom";
import { port } from "./Principal";

const Avatar = ({ e, to }) => {
  const url = `http://localhost:${port}/uploads/${e.photoFront}`;

  return (
    <Link to={to}>
      <img src={url} alt="avatar" style={{ maxWidth: 80 }}></img>
    </Link>
  );
};

const List = ({ array, link }) => {
  const listBooks = array.map((e) => {
    return (
      <li key={e.id_product}>
        <p>{e.productName}</p>
        <p>{e.author}</p>
        <Avatar to={link(e.id_product)} e={e}></Avatar>
        <p>{e.price}</p>
      </li>
    );
  });
  return listBooks;
};

const LastBooks = () => {
  const [data] = useFetchData(`http://localhost:${port}/beginning/lastBooks`);
  const showBooks = [];
  const link = (idBook) => `/principal/category/0/ultimos/book/${idBook}`;
  if (data.length > 8) {
    for (let i = 0; i < 8; i++) {
      showBooks.push(data[i]);
    }
    return (
      <section id="lastBooks">
        <p>Últimos libros</p>
        <List array={showBooks} link={link}></List>
      </section>
    );
  } else {
    return (
      <section id="lastBooks">
        <p>Últimos libros</p>
        <List array={data} link={link}></List>
      </section>
    );
  }
};

export { LastBooks, List, Avatar };
