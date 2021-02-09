import { Link } from "react-router-dom";
import React from "react";
import "../css/navPrincipal.css";
const NavPrincipal = ({ auth }) => {
  return (
    <nav className="linkPrincipal">
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
