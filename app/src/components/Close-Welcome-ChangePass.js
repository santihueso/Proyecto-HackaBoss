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
    <section style={{ padding: 335 }} className="fondo">
      <section className="welcome">
        <p>Hasta pronto</p>
      </section>
    </section>
  );
};

const Welcome = () => {
  return (
    <section style={{ padding: 305 }} className="fondo">
      <section className="welcome">
        <p>¡Bienvenido a recybook!</p>
        <aside>
          <p style={{ fontSize: 20 }}>
            Intercambia conocimiento y fantasías iniciando sesión:
          </p>
          <Link style={{ fontSize: 20 }} to="/principal">
            Principal
          </Link>
        </aside>
      </section>
    </section>
  );
};

const ViewCorrectChangePass = () => {
  return (
    <section style={{ padding: 318 }} className="fondo">
      <section className="welcome">
        <p>Se ha cambiado correctamente, vuelve a tu:</p>
        <Link to="/principal/profile">Perfil</Link>
      </section>
    </section>
  );
};

export { Close, ViewClose, Welcome, ViewCorrectChangePass };
