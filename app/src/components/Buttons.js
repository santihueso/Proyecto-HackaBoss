import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { port } from "./Principal";
import "../css/buttons.css";

const ButtonPurchaseFavoriteReserved = ({ idBook, to, name, rout, auth }) => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const color = disable ? { background: "grey" } : { background: "black" };
  const handlClick = async () => {
    if (!auth) {
      setDisable(true);
      setError("Inicia sesión o registrate");
    }
    const res = await fetch(
      `http://localhost:${port}/login/user/book/${idBook}/${to}`,
      {
        method: "GET",
        headers: { "content-type": "application/json", Authorization: auth },
      }
    );

    if (res.status !== 200) {
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
      <button
        className="btnViewBook"
        onClick={handlClick}
        style={color}
        disabled={disable}
      >
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
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const handlClick = async () => {
    if (!auth) {
      return setError("Inicia sesión o registrate");
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
      setDisable(true);
    }
    history.push(`/principal/profile/list/purchase`);
  };

  return (
    <div>
      <button className="btnViewBook" onClick={handlClick} disabled={disable}>
        Comprar
      </button>
      {error ? <ViewBookError err={error}></ViewBookError> : null}
    </div>
  );
};

const ButtonDelete = ({ idBook, to, rout, auth }) => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const handlClick = async () => {
    if (!auth) {
      return setError("Inicia sesión o registrate");
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
      setDisable(true);
    }

    history.push(`/principal/profile/list/${rout}`);
  };

  return (
    <div>
      <button className="btnViewBook" onClick={handlClick} disabled={disable}>
        Eliminar
      </button>
      {error ? <ViewBookError err={error}></ViewBookError> : null}
    </div>
  );
};

export {
  ButtonPurchaseFavoriteReserved,
  ButtonBuyWithReserved,
  ButtonDelete,
  ViewBookError,
};
