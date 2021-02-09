import { Link } from "react-router-dom";
import React from "react";
import { useFetchData } from "./useFetch/useFetchData";
import { port } from "./Principal";
import { BookOfKindCategory } from "./BookOfKindCategory";
import "../css/categories.css";

const Categories = () => {
  const [data] = useFetchData(`http://localhost:${port}/beginning/categories`);

  const listCategories = data.map((e) => {
    const linkOfCategory = `/principal/category/${e.id_category}/${e.category_name}`;

    return (
      <li key={e.id_category} id={e.id_category}>
        <Link to={linkOfCategory}>{e.category_name}</Link>
      </li>
    );
  });

  return (
    <section id="categories">
      <h2>Categorias</h2>
      <nav>
        <ul>{listCategories}</ul>
      </nav>
    </section>
  );
};

export { Categories, BookOfKindCategory };
