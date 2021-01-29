import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
} from "react-router-dom";
import React, { useState, useEffect, Children } from "react";
import { useFetchData } from "../useFetchData";
import { port } from "./Principal";
import { BookOfKindCategory } from "../BookOfKindCategory/BookOfKindCategory";

const Categories = () => {
  const [data, setData] = useFetchData(
    `http://localhost:${port}/beginning/categories`
  );

  const listCategories = data.map((e) => {
    const linkOfCategory = `/category/${e.id_category}`;

    return (
      <li>
        <Link key={e.id_category} to={linkOfCategory}>
          {e.category_name}
        </Link>
      </li>
    );
  });

  return (
    <Router>
      <section id="categories">
        <h2>Categorias</h2>
        <nav>
          <ul>{listCategories}</ul>
        </nav>
      </section>
    </Router>
  );
};

export { Categories, BookOfKindCategory };
