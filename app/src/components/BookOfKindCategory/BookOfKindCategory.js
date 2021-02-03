import React from "react";
import { useFetchData } from "../useFetch/useFetchData";
import { Link, useParams } from "react-router-dom";
import { port } from "../principalPage/Principal";
import { List } from "../principalPage/LastBooks";

const BookOfKindCategory = () => {
  const { name, id } = useParams();
  const [data] = useFetchData(`http://localhost:${port}/category/${id}`);

  return (
    <div>
      <p>{name}</p>
      <Link to="/principal">Principal ˃ </Link>
      <p>{name}</p>
      {data.length > 0 ? (
        <List array={data}></List>
      ) : (
        <p>No hay libros en esta categoría.</p>
      )}
    </div>
  );
};
const ViewBook = () => {
  let { idBook, name, id, kind } = useParams();
  const [data] = useFetchData(
    `http://localhost:${port}/beginning/category/${idBook}`
  );
  const [category] = useFetchData(
    `http://localhost:${port}/beginning/categories`
  );

  let buttons;
  let nameLink;
  if (kind) {
    if (kind === "favorites") {
      nameLink = "Favoritos";
      buttons = (
        <div>
          <button>Eliminar</button>
          <button>Comprar</button>
        </div>
      );
    } else if (kind === "purchase") {
      nameLink = "Comprados";
      buttons = (
        <div>
          <button>Valoración</button>
        </div>
      );
    } else if (kind === "offers") {
      nameLink = "Notificaciones";
      buttons = (
        <div>
          <button>Ver</button>
        </div>
      );
    } else if (kind === "reservation") {
      nameLink = "Reservados";
      buttons = (
        <div>
          <button>Eliminar</button>
          <button>Comprar</button>
        </div>
      );
    } else if (kind === "toSell") {
      nameLink = "En venta";
      buttons = (
        <div>
          <button>Editar</button>
          <button>Eliminar</button>
        </div>
      );
    }
  } else {
    buttons = (
      <div>
        <button>Favorito</button>
        <button>Reservar</button>
        <button>Comprar</button>
      </div>
    );
  }

  const book = data.map((e) => {
    const findCategory = category.find(
      (element) => element.id_category === e.category
    );

    const nameCategory = () =>
      findCategory ? findCategory.category_name : null;
    return (
      <div key={e.id_product}>
        <nav>
          <Link to="/principal">Principal ˃ </Link>
          {name !== "ultimos" ? (
            <Link to={`/principal/category/${id}/${name}`}>{name}</Link>
          ) : (
            <p>Últimos libros</p>
          )}
          {kind ? (
            <Link to={`/principal/profile/list/${kind}`}>{nameLink}</Link>
          ) : null}
          <p> Libro</p>
        </nav>

        <img
          src={`http://localhost:${port}/uploads/${e.photoFront}`}
          alt="portada"
          style={{ maxWidth: 80 }}
        ></img>
        <img
          src={`http://localhost:${port}/uploads/${e.photoBack}`}
          alt="portada"
          style={{ maxWidth: 80 }}
        ></img>
        <div>
          <h1>{e.productName}</h1>
          <p>{e.author}</p>
          <p>{e.bookLanguage}</p>
          {buttons}
          <p>{e.descriptionProduct}</p>
          <p>{e.price}</p>
          {kind ? (
            <Link
              to={`/principal/category/${
                e.category
              }/${nameCategory()}/book/${idBook}/user/${e.seller}`}
            >
              Perfil
            </Link>
          ) : (
            <Link
              to={`/principal/category/${id}/${name}/book/${idBook}/user/${e.seller}`}
            >
              Perfil
            </Link>
          )}
        </div>
      </div>
    );
  });
  return <div>{book}</div>;
};

export { BookOfKindCategory, ViewBook };
