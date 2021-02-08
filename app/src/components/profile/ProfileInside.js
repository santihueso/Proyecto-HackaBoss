import React, { useState } from "react";
import { port } from "../principalPage/Principal";
import { Link } from "react-router-dom";
import { useFetchAuth } from "../useFetch/useFetchAuth";

const ProfileUserInside = ({ auth }) => {
  const [dataUser] = useFetchAuth(
    `http://localhost:${port}/login/user/profile`,
    auth
  );

  const showProfile = dataUser.map((e) => {
    const url = `http://localhost:${port}/uploads/${e.photo}`;
    return (
      <div key={e.id_user}>
        <nav>
          <Link to="/principal">Principal </Link>
          <Link to="/principal/profile/edit">Editar</Link>
        </nav>

        <img src={url} alt="avatar" style={{ maxWidth: 80 }}></img>
        <p>{e.username}</p>
        <p>{e.descriptionUser}</p>
        <p>{e.postalCode}</p>
        <nav>
          <Link to="/principal/profile/list/favorites">Favoritos</Link>
          <Link to="/principal/profile/list/offers">Notificaciones</Link>
          <Link to="/principal/profile/list/purchase">Comprados</Link>
          <Link to="/principal/profile/list/toSell">En venta</Link>
          <Link to="/principal/profile/list/reserved">Reservados</Link>
        </nav>
      </div>
    );
  });
  return showProfile;
};

export { ProfileUserInside };
