import React from "react";
import { port } from "./Principal";
import { Link } from "react-router-dom";
import { useFetchAuth } from "./useFetch/useFetchAuth";
import "../css/profileInside.css";

const ProfileUserInside = ({ auth }) => {
  const [dataUser] = useFetchAuth(
    `http://localhost:${port}/login/user/profile`,
    auth
  );

  const showProfile = dataUser.map((e) => {
    const url = `http://localhost:${port}/uploads/${e.photo}`;
    return (
      <div key={e.id_user} className="profileInside">
        <nav>
          <Link to="/principal">Principal</Link>
          <Link to="/principal/profile/edit">Editar</Link>
          <Link to="/principal/newBook">Subir libro</Link>
          <Link to="/principal/changePassword">Cambio de contraseña</Link>
        </nav>
        <header>
          <img src={url} alt="avatar" style={{ maxWidth: 250 }}></img>
          <main>
            <p>{e.username}</p>
            <p>{e.descriptionUser}</p>
            <p>{e.postalCode}</p>
          </main>
        </header>
        <main>
          <nav>
            <div id="notif">
              <Link to="/principal/profile/list/offers">Notificaciones</Link>
            </div>
            <div id="fav">
              <Link to="/principal/profile/list/favorites">Favoritos</Link>
            </div>
            <div id="pur">
              <Link to="/principal/profile/list/purchase">Comprados</Link>
            </div>
            <div id="sell">
              <Link to="/principal/profile/list/toSell">En venta</Link>
            </div>
            <div id="res">
              <Link to="/principal/profile/list/reserved">Reservados</Link>
            </div>
          </nav>
        </main>
      </div>
    );
  });
  return showProfile;
};

export { ProfileUserInside };
