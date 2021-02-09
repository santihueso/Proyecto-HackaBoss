import React from "react";
import { Link } from "react-router-dom";
import { port } from "./Principal";

const Avatar = ({ e, to }) => {
  const url = `http://localhost:${port}/uploads/${e.photoFront}`;

  return (
    <Link to={to}>
      <img src={url} alt="avatar" style={{ maxWidth: 100 }}></img>
    </Link>
  );
};

const List = ({ array, link }) => {
  const listBooks = array.map((e) => {
    return (
      <li key={e.id_product} id={e.id_product}>
        <p className="title">{e.productName}</p>
        <p className="author">{e.author}</p>
        <Avatar to={link(e.id_product)} e={e}></Avatar>
        <p className="price">{e.price} €</p>
      </li>
    );
  });
  return listBooks;
};

export { List, Avatar };
