import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Login } from "./Login";
import { SignIn } from "./Signin";
import { Close } from "./Close-Welcome-ChangePass";
import "../css/navPrincipal.css";

const NavPrincipal = ({ auth, setAuth }) => {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  return (
    <nav className="linkPrincipal">
      {auth !== "" ? (
        <nav>
          <Link to="/principal/profile">Perfil</Link>
          <Link to="/principal/newBook">Subir libro</Link>
          <Close></Close>
        </nav>
      ) : (
        <nav>
          <button onClick={() => (!login ? setLogin(true) : setLogin(false))}>
            Iniciar sesión
          </button>
          <button
            onClick={() => (!register ? setRegister(true) : setRegister(false))}
          >
            Registrate
          </button>
        </nav>
      )}

      <div>{login ? <Login setAuth={setAuth}></Login> : null}</div>
      <div>{register ? <SignIn setAuth={setAuth}></SignIn> : null}</div>
    </nav>
  );
};

export { NavPrincipal };
