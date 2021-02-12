import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/close-welcome-changepass.css";
const Close = () => {
  const history = useHistory();
  const handlClick = () => {
    localStorage.removeItem("auth");
    return history.push("/close");
  };
  return <button onClick={handlClick}>Cerrar sesión</button>;
};

const ViewClose = () => {
  return (
    <section className="fondo">
      <section className="welcome">
        <p>Hasta pronto</p>
      </section>
    </section>
  );
};

const Welcome = () => {
  return (
    <section className="fondo">
      <section className="welcome">
        <p>¡Bienvenido a recybook!</p>
        <p>Intercambia conocimiento y fantasías con el resto de usuarios.</p>
        <p>Por favor, incia sesión para empezar:</p>
        <Link to="/principal">Principal</Link>
      </section>
    </section>
  );
};

const ViewCorrectChangePass = () => {
  return (
    <section className="fondo">
      <section className="welcome">
        <p>Se ha cambiado correctamente, vuelve a tu:</p>
        <Link to="/principal/profile">Perfil</Link>
      </section>
    </section>
  );
};

export { Close, ViewClose, Welcome, ViewCorrectChangePass };
