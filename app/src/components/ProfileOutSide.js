import React from "react";
import { Link, useParams } from "react-router-dom";
import { port } from "./Principal";
import { List } from "./List-Avatar";
import { useFetchData } from "./useFetch/useFetchData";
import "../css/profileOutSide.css";

const ProfileOutSide = () => {
  const { idUser, id, idBook, name } = useParams();
  const [user] = useFetchData(
    `http://localhost:${port}/login/category/book/porfile/${idUser}`
  );

  const link = (idBook) => `/principal/category/${id}/${name}/book/${idBook}`;
  const userData = user ? user.user : null;
  const userBooks = user ? user.books : null;
  const userAvg = user ? user.avg : null;

  const point = userAvg ? userAvg.map((e) => e.point) : null;
  if (userData && userBooks) {
    const showUserData = userData.map((e) => {
      const url = `http://localhost:${port}/uploads/${e.photo}`;

      return (
        <div key={e.id_user} className="profileOut">
          <nav>
            <Link to="/principal">Principal ˃</Link>
            {name !== "ultimos" ? (
              <Link to={`/principal/category/${id}/${name}`}>{name} ˃ </Link>
            ) : null}

            <Link to={`/principal/category/${id}/${name}/book/${idBook}`}>
              Libro
            </Link>
          </nav>
          <header>
            <img src={url} alt="avatar" style={{ maxWidth: 250 }}></img>
            <div>
              <p>{e.username}</p>
              <p>{e.descriptionUser}</p>
              <p>{point}</p>
              <Link
                to={`/principal/category/book/${idBook}/user/${e.id_user}/valorations`}
              >
                Valoraciones
              </Link>
            </div>
          </header>
          <main>
            <h2>Libros</h2>
            <ul>
              <List array={userBooks} link={link}></List>
            </ul>
          </main>
        </div>
      );
    });

    return showUserData;
  } else {
    return null;
  }
};

export { ProfileOutSide };
