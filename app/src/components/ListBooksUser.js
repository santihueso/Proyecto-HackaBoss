import React, { useState } from "react";
import { port } from "./Principal";
import { Link, useParams } from "react-router-dom";
import { useFetchAuth } from "./useFetch/useFetchAuth";
import { List } from "./List-Avatar";
import "../css/listBooksUser.css";

const ListBooksUser = ({ auth }) => {
  const { kind } = useParams();
  let [num1] = useState(0);
  let [num2, setNum2] = useState(3);
  const [dataList, setDataList] = useFetchAuth(
    `http://localhost:${port}/login/user/profile/${kind}/${num1}/${num2}`,
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

  const handlClick = async () => {
    const num2Sume = num2 + 3;

    const res = await fetch(
      `http://localhost:${port}/login/user/profile/${kind}/${num1}/${num2}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: auth,
        },
      }
    );
    const body = await res.json();
    if (res.status !== 200) {
      console.warn("error", res);
    }

    setDataList(body);
    setNum2(num2Sume);
  };
  return (
    <section className="listBooksUser">
      <p>{name}</p>
      <nav>
        <Link to="/principal">Principal ˃ </Link>
        <Link to="/principal/profile">Perfil ˃ </Link>
        <p>{name}</p>
      </nav>
      <section>
        <List array={dataList} link={linkOfListBookUser}></List>
        {dataList.length < 3 ? null : (
          <button onClick={handlClick}>Ver más</button>
        )}
      </section>
    </section>
  );
};

export { ListBooksUser };
