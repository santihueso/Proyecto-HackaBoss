import React, { useState, useEffect } from "react";
import { useFetchData } from "../useFetch/useFetchData";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
} from "react-router-dom";
import { port } from "../principalPage/Principal";
import { List } from "../principalPage/LastBooks";

const BookOfKindCategory = () => {
  const { name, id } = useParams();
  const [data, setData] = useFetchData(
    `http://localhost:${port}/category/${id}`
  );

  return (
    <div>
      <p>{name}</p>
      <Link to="/principal">Principal ˃ </Link>
      <p>{name}</p>
      {data.length > 0 ? (
        <List array={data}></List>
      ) : (
        <p>No hay libros en esta categoría.</p>
      )}
    </div>
  );
};
const ViewBook = () => {
  let { idBook, name, id } = useParams();

  const [data, setData] = useFetchData(
    `http://localhost:${port}/beginning/category/${idBook}`
  );

  const book = data.map((e) => {
    return (
      <div key={e.id_product}>
        <nav>
          <Link to="/principal">Principal ˃ </Link>
          {name !== "ultimos" ? (
            <Link to={`/principal/category/${id}/${name}`}>{name}</Link>
          ) : (
            <p>Últimos libros</p>
          )}

          <p> Libro</p>
        </nav>

        <img
          src={`http://localhost:${port}/uploads/${e.photoFront}`}
          alt="portada"
          style={{ maxWidth: 80 }}
        ></img>
        <div>
          <h1>{e.productName}</h1>
          <p>{e.author}</p>
          <p>{e.bookLanguage}</p>
          <div>
            <button>Reservar</button>
            <button>Comprar</button>
          </div>
          <p>{e.descriptionProduct}</p>
          <p>{e.price}</p>
          <Link
            to={`/principal/category/${id}/${name}/book/${idBook}/user/${e.seller}`}
          >
            Perfil
          </Link>
        </div>
      </div>
    );
  });
  return <div>{book}</div>;
};

export { BookOfKindCategory, ViewBook };
