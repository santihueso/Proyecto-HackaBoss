import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { port } from "../principalPage/Principal";

const ButtonPurchaseFavoriteReserved = ({ idBook, to, name, rout }) => {
  const history = useHistory();
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  if (auth === "") {
    return <Redirect to="/login"></Redirect>;
  }
  const handlClick = async () => {
    const res = await fetch(
      `http://localhost:${port}/login/user/book/${idBook}/${to}`,
      {
        method: "GET",
        headers: { "content-type": "application/json", Authorization: auth },
      }
    );
    if (res.status > 300) {
      console.warn("error", res);
    }
    history.push(`/principal/profile/list/${rout}`);
  };

  return <button onClick={handlClick}>{name}</button>;
};

const ButtonBuyWithReserved = ({ idBook }) => {
  const history = useHistory();
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  if (auth === "") {
    return <Redirect to="/login"></Redirect>;
  }
  const handlClick = async () => {
    const res = await fetch(
      `http://localhost:${port}/login/user/book/${idBook}/reservation/buy`,
      {
        method: "GET",
        headers: { "content-type": "application/json", Authorization: auth },
      }
    );
    if (res.status > 300) {
      console.warn("error", res);
    }
    history.push(`/principal/profile/list/purchase`);
  };

  return <button onClick={handlClick}>Comprar</button>;
};

const ButtonDelete = ({ idBook, to, rout }) => {
  const history = useHistory();
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  if (auth === "") {
    return <Redirect to="/login"></Redirect>;
  }
  const handlClick = async () => {
    const res = await fetch(
      `http://localhost:${port}/login/user/book/${idBook}/${to}/delete`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json", Authorization: auth },
      }
    );
    if (res.status > 300) {
      console.warn("error", res);
    }
    history.push(`/principal/profile/list/${rout}`);
  };

  return <button onClick={handlClick}>Eliminar</button>;
};

export { ButtonPurchaseFavoriteReserved, ButtonBuyWithReserved, ButtonDelete };
