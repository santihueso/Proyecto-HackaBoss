import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Login } from "./Login";
import "../css/navPrincipal.css";
const NavPrincipal = ({ auth, setAuth }) => {
  const [login, setLogin] = useState(false);
  return (
    <nav className="linkPrincipal">
      {auth !== "" ? (
        <Link to="/principal/profile">Perfil</Link>
      ) : (
        <button onClick={() => setLogin(true)}>Iniciar sesión</button>
      )}

      <Link to="/principal/newBook">Subir libro</Link>
      <div>{login ? <Login setAuth={setAuth}></Login> : null}</div>
    </nav>
  );
};

export { NavPrincipal };
