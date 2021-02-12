import React from "react";
import { Link, useParams } from "react-router-dom";
import { port } from "./Principal";
import { List } from "./List-Avatar";
import { useFetchData } from "./useFetch/useFetchData";
import "../css/profileOutSide.css";

const ProfileOutSide = () => {
  let { idUser, id, idBook, name } = useParams();
  const [user] = useFetchData(
    `http://localhost:${port}/login/category/book/porfile/${idUser}`
  );
  if (name === "seeker") {
    name = "Buscador";
  }
  const link = (idBook) => `/principal/category/${id}/${name}/book/${idBook}`;
  const userData = user ? user.user : null;
  const userBooks = user ? user.books : null;
  const userAvg = user ? user.avg : null;
  const point = userAvg ? userAvg.map((e) => e.point) : null;

  if (userData && userBooks) {
    const showUserData = userData.map((e) => {
      const url = `http://localhost:${port}/uploads/${e.photo}`;
      const star = "★".repeat(Math.floor(point));
      return (
        <article key={e.id_user} className="profileOut">
          <header>
            <img src={url} alt="avatar" style={{ maxWidth: 250 }}></img>
            <div>
              <p>{e.username}</p>
              <p>{e.descriptionUser}</p>
              <p style={{ color: "orange" }}>{star}</p>
              <Link
                to={`/principal/category/book/${idBook}/user/${e.id_user}/valorations`}
              >
                Valoraciones
              </Link>
            </div>
          </header>
          <nav>
            <Link to="/principal">Principal ˃ </Link>
            {name !== "ultimos" || !name ? (
              <Link to={`/principal/category/${id}/${name}`}>{name} ˃ </Link>
            ) : null}

            <Link to={`/principal/category/${id}/${name}/book/${idBook}`}>
              Libro
            </Link>
          </nav>
          <main>
            <h2>Libros</h2>

            <List array={userBooks} link={link}></List>
          </main>
        </article>
      );
    });

    return showUserData;
  } else {
    return null;
  }
};

export { ProfileOutSide };
