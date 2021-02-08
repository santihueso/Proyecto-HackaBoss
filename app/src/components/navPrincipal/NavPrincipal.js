import { Link } from "react-router-dom";
import React from "react";
import "./navPrincipal.css";
const NavPrincipal = ({ auth }) => {
  return (
    <nav>
      {auth !== "" ? (
        <Link to="/principal/profile">Perfil</Link>
      ) : (
        <Link to="/login">Iniciar sesión</Link>
      )}

      <Link to="/principal/newBook">Subir libro</Link>
    </nav>
  );
};

export { NavPrincipal };
