import React from "react";
import { useFetchData } from "../useFetch/useFetchData";
import { Link, useParams } from "react-router-dom";
import { port } from "./Principal";

const Avatar = ({ e }) => {
  let { name = "ultimos", id = 0, kind } = useParams();

  const url = `http://localhost:${port}/uploads/${e.photoFront}`;
  const linkOfBook = `/principal/category/${id}/${name}/book/${e.id_product}`;
  const linkOfListBookUser = `/principal/profile/list/${kind}/book/${e.id_product}`;

  return (
    <Link to={kind ? linkOfListBookUser : linkOfBook}>
      <img src={url} alt="avatar" style={{ maxWidth: 80 }}></img>
    </Link>
  );
};

const List = ({ array }) => {
  const listBooks = array.map((e) => {
    return (
      <li key={e.id_product}>
        <p>{e.productName}</p>
        <p>{e.author}</p>
        <Avatar e={e}></Avatar>
        <p>{e.price}</p>
      </li>
    );
  });
  return listBooks;
};

const LastBooks = () => {
  const [data] = useFetchData(`http://localhost:${port}/beginning/lastBooks`);
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

export { LastBooks, List, Avatar };
