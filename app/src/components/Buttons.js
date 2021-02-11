import React from "react";
import { useHistory } from "react-router-dom";
import { port } from "./Principal";
import "../css/buttons.css";

const ButtonPurchaseFavoriteReserved = ({ idBook, to, name, rout, auth }) => {
  const history = useHistory();

  const handlClick = async () => {
    if (!auth) {
      return history.push("/login");
    }
    const res = await fetch(
      `http://localhost:${port}/login/user/book/${idBook}/${to}`,
      {
        method: "GET",
        headers: { "content-type": "application/json", Authorization: auth },
      }
    );
    console.log(res.status);
    if (res.status === 500) {
      return history.push(`/principal/profile/list/${rout}`);
    } else if (res.status === 400) {
      return history.push("/yourBook");
    } else if (res.status === 404) {
      return history.push("/reserved");
    } else if (res.status !== 200) {
      console.warn("error", res);
      return history.push("/notFound");
    }

    return history.push(`/principal/profile/list/${rout}`);
  };

  return (
    <button className="btnViewBook" onClick={handlClick}>
      {name}
    </button>
  );
};

const ButtonBuyWithReserved = ({ idBook, auth }) => {
  const history = useHistory();

  const handlClick = async () => {
    if (!auth) {
      return history.push("/login");
    }
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

  return (
    <button className="btnViewBook" onClick={handlClick}>
      Comprar
    </button>
  );
};

const ButtonDelete = ({ idBook, to, rout, auth }) => {
  const history = useHistory();

  const handlClick = async () => {
    if (!auth) {
      return history.push("/login");
    }
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

  return (
    <button className="btnViewBook" onClick={handlClick}>
      Eliminar
    </button>
  );
};

export { ButtonPurchaseFavoriteReserved, ButtonBuyWithReserved, ButtonDelete };
