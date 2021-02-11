import React from "react";
import { Link } from "react-router-dom";
import { port } from "./Principal";

const Avatar = ({ e, to }) => {
  const url = `http://localhost:${port}/uploads/${e.photoFront}`;
  return (
    <Link to={to}>
      <img
        className="avatar"
        src={url}
        alt="avatar"
        style={{ maxWidth: 100 }}
      ></img>
    </Link>
  );
};

const List = ({ array, link }) => {
  const listBooks = array.map((e) => {
    return (
      <li key={e.id_product} className="book">
        <header>
          <Avatar e={e} to={link(e.id_product)}></Avatar>
        </header>
        <main>
          <p className="title">{e.productName}</p>
          <p className="author">{e.author}</p>
          <p className="price">{e.price} €</p>
        </main>
      </li>
    );
  });
  return <ul>{listBooks}</ul>;
};

export { List, Avatar };
