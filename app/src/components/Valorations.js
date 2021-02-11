import React from "react";
import { useFetchData } from "./useFetch/useFetchData";
import { port } from "./Principal";
import { Link, useParams } from "react-router-dom";
import "../css/valorations.css";
const SoldBooks = () => {
  const { idUser, id, name } = useParams();

  const [book] = useFetchData(
    `http://localhost:${port}/login/user/${idUser}/valorations`
  );

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
        <Link to="/principal">Principal</Link>
      </nav>
      <ul>{list}</ul>
    </section>
  );
};

export { SoldBooks };
