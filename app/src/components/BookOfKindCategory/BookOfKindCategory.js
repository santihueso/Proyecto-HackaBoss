import React, { useState, useEffect } from "react";
import { useFetchData } from "../useFetchData";
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
  const { id } = useParams();
  const [data, setData] = useFetchData(
    `http://localhost:${port}/category/${id}`
  );
  const [category, setCategory] = useFetchData(
    `http://localhost:${port}/beginning/categories`
  );

  const findCategory = category.find((e) => e.id_category === Number(id));
  const categoryName = findCategory ? findCategory.category_name : "";

  return (
    <div>
      <p>{categoryName}</p>
      <List array={data}></List>
      <Link to="/principal">Principal</Link>
    </div>
  );
};

const ViewBook = () => {
  const { id } = useParams();
  const [data, setData] = useFetchData(
    `http://localhost:${port}/beginning/category/${id}`
  );
  const book = data.map((e) => {
    const url = `http://localhost:${port}/uploads/${e.photoFront}`;

    return (
      <div>
        <nav>
          <Link to="/principal">Principal</Link>
        </nav>

        <img src={url} alt="portada" style={{ maxWidth: 80 }}></img>
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
          <Link to=""></Link>
        </div>
      </div>
    );
  });
  return <div>{book}</div>;
};

export { BookOfKindCategory, ViewBook };
