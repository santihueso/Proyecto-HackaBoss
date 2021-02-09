import React from "react";
import { port } from "./Principal";
import { Link } from "react-router-dom";
import { useFetchAuth } from "./useFetch/useFetchAuth";
import { Breadcrumbs, Avatar } from "@material-ui/core";

const ProfileUserInside = ({ auth }) => {
  const [dataUser] = useFetchAuth(
    `http://localhost:${port}/login/user/profile`,
    auth
  );

  const showProfile = dataUser.map((e) => {
    const url = `http://localhost:${port}/uploads/${e.photo}`;
    return (
      <div key={e.id_user}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/principal">Principal</Link>
          <Link to="/principal/profile/edit">Editar</Link>
          <Link to="/principal/newBook">Subir libro</Link>
          <Link to="/principal/changePassword">Cambio de contraseña</Link>
        </Breadcrumbs>
        <Avatar alt="Remy Sharp" src={url}></Avatar>

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
