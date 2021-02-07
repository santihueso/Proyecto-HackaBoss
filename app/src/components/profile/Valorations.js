import React from "react";
import { useFetchData } from "../useFetch/useFetchData";
import { port } from "../principalPage/Principal";
import { Link, useParams } from "react-router-dom";

const SoldBooks = () => {
  const { idUser, id, name, idBook } = useParams();

  const [book, setBook] = useFetchData(
    `http://localhost:${port}/login/user/${idUser}/valorations`
  );
  console.log(book);
  const list = book.map((e) => {
    const url = `http://localhost:${port}/uploads/${e.photoFront}`;
    return (
      <div key={e.id_product}>
        <li>
          <p>{e.productName}</p>
          <p>{e.author}</p>
          <img src={url} alt="avatar" style={{ maxWidth: 80 }}></img>
          <p>{e.assessment}</p>
          <p>{e.opinion}</p>
          <Link
            to={`/principal/category/${id}/${name}/book/${e.id_product}/user/${e.buyer}`}
          >
            Comprador
          </Link>
        </li>
      </div>
    );
  });
  return (
    <div>
      <nav>
        <Link to="/principal">Principal</Link>
      </nav>
      <ul>{list}</ul>
    </div>
  );
};

export { SoldBooks };
