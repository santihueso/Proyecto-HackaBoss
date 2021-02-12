import React from "react";
import { port } from "./Principal";
import { Link, useParams } from "react-router-dom";
import { useFetchAuth } from "./useFetch/useFetchAuth";
import { List } from "./List-Avatar";
import "../css/listBooksUser.css";

const ListBooksUser = ({ auth }) => {
  const { kind } = useParams();
  const [dataList] = useFetchAuth(
    `http://localhost:${port}/login/user/profile/${kind}`,
    auth
  );

  const linkOfListBookUser = (productId) =>
    `/principal/profile/list/${kind}/book/${productId}`;
  let name;
  if (kind === "offers") {
    name = "Notificaciones";
  } else if (kind === "favorites") {
    name = "Favoritos";
  } else if (kind === "reserved") {
    name = "Reservados";
  } else if (kind === "purchase") {
    name = "Comprados";
  } else if (kind === "toSell") {
    name = "En venta";
  }
  return (
    <section className="listBooksUser">
      <p>{name}</p>
      <nav>
        <Link to="/principal">Principal ˃ </Link>
        <Link to="/principal/profile">Perfil ˃ </Link>
        <p>{name}</p>
      </nav>
      <List array={dataList} link={linkOfListBookUser}></List>
    </section>
  );
};

export { ListBooksUser };
