import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { port } from "./Principal";
import "../css/buttons.css";

const ButtonPurchaseFavoriteReserved = ({ idBook, to, name, rout, auth }) => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
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

    if (res.status === 500) {
      return history.push(`/principal/profile/list/${rout}`);
    } else if (res.status !== 200) {
      const body = await res.json();
      console.warn("error", res);
      setDisable(true);
      setError(body.error);
    } else {
      return history.push(`/principal/profile/list/${rout}`);
    }
  };

  return (
    <div>
      <button className="btnViewBook" onClick={handlClick} disabled={disable}>
        {name}
      </button>
      {error ? <ViewBookError err={error}></ViewBookError> : null}
    </div>
  );
};

const ViewBookError = ({ err }) => {
  const [hidden, setHidden] = useState(false);
  const hiddenView = { display: hidden ? "none" : "block" };

  return (
    <div className="wrapper" style={hiddenView}>
      <div className="err" style={hiddenView}>
        <button id="btnErr" onClick={() => setHidden(true)}>
          x
        </button>
        <p>{err}</p>
      </div>
    </div>
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
