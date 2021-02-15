import React, { useEffect, useState } from "react";
import { port } from "./Principal";
import { Link } from "react-router-dom";
import { useFetchAuth } from "./useFetch/useFetchAuth";
import "../css/profileInside.css";

const ProfileUserInside = ({ auth }) => {
  const [data, setData] = useState([]);
  const [dataUser] = useFetchAuth(
    `http://localhost:${port}/login/user/profile`,
    auth
  );

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `http://localhost:${port}/login/user/profile/offers`,
        {
          method: "GET",
          headers: { "content-type": "application/json", Authorization: auth },
        }
      );
      const body = await res.json();
      if (res.status !== 200) {
        console.warn("error", res);
      }
      setData(body);
    };
    const interval = setInterval(getData, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

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
