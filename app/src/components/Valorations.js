import React from "react";
import { useFetchData } from "./useFetch/useFetchData";
import { useFetchAuth } from "./useFetch/useFetchAuth";
import { port } from "./Principal";
import { Link, useParams } from "react-router-dom";
import "../css/valorations.css";

const ValorationsOutside = () => {
  const { idUser } = useParams();

  const [book] = useFetchData(
    `http://localhost:${port}/login/user/${idUser}/valorations`
  );
  return <SoldBooks book={book}></SoldBooks>;
};

const ValorationsInside = ({ auth }) => {
  const [book] = useFetchAuth(
    `http://localhost:${port}/login/user/valorations`,
    auth
  );
  return <SoldBooks book={book}></SoldBooks>;
};

const SoldBooks = ({ book }) => {
  const list = book.map((e) => {
    const url = `http://localhost:${port}/uploads/${e.photoFront}`;
    const star = "★".repeat(e.assessment);
    return (
      <li key={e.id_purchase}>
        <header>
          <img src={url} alt="avatar" style={{ maxWidth: 100 }}></img>
        </header>
        <main>
          <p>{e.productName}</p>
          <p>{e.author}</p>
          <p style={{ color: "orange" }}>{star}</p>
          <p>{e.opinion}</p>

          <Link
            to={`/principal/category/0/ultimos/book/${e.id_product}/user/${e.buyer}`}
          >
            Comprador
          </Link>
        </main>
      </li>
    );
  });
  return (
    <section className="viewValoration">
      <p>Valoraciones</p>
      <nav>
        <Link to="/principal">Principal ˃ </Link>
      </nav>
      <ul>{list}</ul>
    </section>
  );
};

export { SoldBooks, ValorationsOutside, ValorationsInside };
