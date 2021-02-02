import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { port } from "../principalPage/Principal";
import { List } from "../principalPage/LastBooks";
import { useFetchData } from "../useFetch/useFetchData";
const Profile = () => {
  const { idUser, id, name, idBook } = useParams();
  const [user, setUser] = useFetchData(
    `http://localhost:${port}/login/category/book/porfile/${idUser}`
  );

  const userData = user ? user.user : null;
  const userBooks = user ? user.books : null;
  const userAvg = user ? user.avg : null;
  const point = userAvg ? userAvg.point : null;

  if (userData && userBooks) {
    const showUserData = userData.map((e) => {
      const url = `http://localhost:${port}/uploads/${e.photo}`;

      return (
        <div key={e.id_user}>
          <nav>
            <Link to="/principal">Principal ></Link>
            {name !== "ultimos" ? (
              <Link to={`/principal/category/${id}/${name}`}>{name} > </Link>
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
          </div>
          <div>
            <p>Libros</p>
            <List array={userBooks}></List>
          </div>
        </div>
      );
    });

    return showUserData;
  } else {
    return null;
  }
};

export { Profile };
