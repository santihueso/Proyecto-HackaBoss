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

  const userData = dataUser ? dataUser[0] : null;
  const avg = dataUser ? dataUser[1] : null;
  const point = avg ? avg.map((e) => e.point) : null;
  const showProfile = userData
    ? userData.map((e) => {
        const url = `http://localhost:${port}/uploads/${e.photo}`;
        const star = "★".repeat(Math.floor(point));
        return (
          <section key={e.id_user} className="profileInside">
            <nav>
              <ul>
                <li>
                  <Link to="/principal">Principal</Link>
                </li>
                <li>
                  <Link to="/principal/profile/edit">Editar</Link>
                </li>
                <li>
                  <Link to="/principal/newBook">Subir📖</Link>
                </li>
                <li>
                  <Link to="/principal/changePassword">⚙ Contraseña</Link>
                </li>
              </ul>
            </nav>
            <header>
              <img src={url} alt="avatar" style={{ maxWidth: 250 }}></img>
              <main>
                <p>{e.username}</p>
                <p>{e.descriptionUser}</p>
                <p>{e.city}</p>
                <p style={{ color: "orange" }}>{star}</p>
                <p>{e.postalCode}</p>
                <Link to="/principal/profile/valorations">Valoraciones</Link>
              </main>
            </header>
            <main>
              <nav>
                <ul>
                  <li id="notif">
                    <Link to="/principal/profile/list/offers">
                      Notificaciones
                    </Link>
                  </li>
                  <li id="fav">
                    <Link to="/principal/profile/list/favorites">
                      Favoritos
                    </Link>
                  </li>
                  <li id="pur">
                    <Link to="/principal/profile/list/purchase">Comprados</Link>
                  </li>
                  <li id="sell">
                    <Link to="/principal/profile/list/toSell">En venta</Link>
                  </li>
                  <li id="res">
                    <Link to="/principal/profile/list/reserved">
                      Reservados
                    </Link>
                  </li>
                </ul>
              </nav>
            </main>
          </section>
        );
      })
    : null;
  return showProfile;
};

export { ProfileUserInside };
