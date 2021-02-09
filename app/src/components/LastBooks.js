import React from "react";
import { useFetchData } from "./useFetch/useFetchData";
import { port } from "./Principal";
import { List } from "./List-Avatar";
import "../css/lastbooks.css";

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
        <h3>Últimos libros</h3>
        <ul>
          <List array={showBooks} link={link}></List>
        </ul>
      </section>
    );
  } else {
    return (
      <section id="lastBooks">
        <h3>Últimos libros</h3>
        <ul>
          <List array={data} link={link}></List>
        </ul>
      </section>
    );
  }
};

export { LastBooks };
