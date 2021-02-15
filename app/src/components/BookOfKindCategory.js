import React, { useState } from "react";
import { useFetchData } from "./useFetch/useFetchData";
import { Link, useParams } from "react-router-dom";
import { port } from "./Principal";
import { List } from "./List-Avatar";
import "../css/bookOfKindCategory.css";

const BookOfKindCategory = () => {
  const { name, id } = useParams();
  const [data] = useFetchData(`http://localhost:${port}/category/${id}`);
  const linkOfBook = (productId) =>
    `/principal/category/${id}/${name}/book/${productId}`;

  return (
    <div className="listBooksUser">
      <p>{name}</p>
      <nav>
        <Link to="/principal">Principal ˃ </Link>
        <p>{name}</p>
      </nav>
      {data.length > 0 ? (
        <List array={data} link={linkOfBook}></List>
      ) : (
        <p>No hay libros en esta categoría.</p>
      )}
    </div>
  );
};

const ViewBook = ({ buttons, kind = null, nameKind = null }) => {
  let { idBook, id, name } = useParams();
  const [active, setActive] = useState(0);
  const [data] = useFetchData(
    `http://localhost:${port}/beginning/category/${idBook}`
  );

  const linkProfile = kind ? `/principal/profile/list/${kind}` : null;

  const activeComparator = (value) => () =>
    active === value ? setActive(0) : setActive(value);

  const book = data.map((e) => {
    return (
      <article key={e.id_product} className="viewBook">
        <nav>
          <Link to="/principal">Principal ˃ </Link>
          {name !== "ultimos" && name !== "seeker" ? (
            <Link to={`/principal/category/${id}/${name}`}>{name}</Link>
          ) : null}
          {linkProfile ? <Link to={linkProfile}>{nameKind}</Link> : null}
          <p> Libro</p>
        </nav>
        <div>
          <header>
            <span onClick={activeComparator(1)}>
              {active === 0 ? (
                <img
                  src={`http://localhost:${port}/uploads/${e.photoFront}`}
                  alt="portada"
                  style={{ maxWidth: 350 }}
                ></img>
              ) : (
                <img
                  src={`http://localhost:${port}/uploads/${e.photoBack}`}
                  alt="portada"
                  style={{ maxWidth: 350 }}
                ></img>
              )}
            </span>
          </header>
          <main>
            <div>
              <p>{e.productName}</p>
              <p>{e.author}</p>
              <p>{e.bookLanguage}</p>
              <p>{e.descriptionProduct}</p>
              <p>{e.price} €</p>
              {buttons}
            </div>
            <nav>
              {kind && kind !== "offers" && kind !== "toSell" ? (
                <Link
                  to={`/principal/category/0/ultimos/book/${idBook}/user/${e.seller}`}
                >
                  Vendedor
                </Link>
              ) : null}
              {!kind ? (
                <Link
                  to={`/principal/category/${id}/${name}/book/${idBook}/user/${e.seller}`}
                >
                  Vendedor
                </Link>
              ) : null}
            </nav>
          </main>
        </div>
      </article>
    );
  });
  return <div>{book}</div>;
};

export { BookOfKindCategory, ViewBook };
