import React from "react";
import { Link, useParams } from "react-router-dom";
import { port } from "../principalPage/Principal";
import { List } from "../principalPage/List-Avatar";
import { useFetchData } from "../useFetch/useFetchData";

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
        <div key={e.id_user}>
          <nav>
            <Link to="/principal">Principal ˃</Link>
            {name !== "undefined" ? (
              <Link to={`/principal/category/${id}/${name}`}>{name} ˃ </Link>
            ) : null}

            <Link to={`/principal/category/${id}/${name}/book/${idBook}`}>
              Libro
            </Link>
          </nav>
          <img src={url} alt="avatar" style={{ maxWidth: 80 }}></img>
          <div>
            <p>{e.username}</p>
            <p>{e.descriptionUser}</p>
            <p>{point}</p>
            <Link
              to={`/principal/category/${id}/${name}/book/${idBook}/user/${e.id_user}/valorations`}
            >
              Valoraciones
            </Link>
          </div>
          <div>
            <p>Libros</p>
            <List array={userBooks} link={link}></List>
          </div>
        </div>
      );
    });

    return showUserData;
  } else {
    return null;
  }
};

export { ProfileOutSide };
