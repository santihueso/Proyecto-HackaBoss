import React, { useState } from "react";
import { useFetchData } from "../useFetch/useFetchData";
import { useFetchAuth } from "../useFetch/useFetchAuth";
import { Link, useParams, useHistory } from "react-router-dom";
import { port } from "../principalPage/Principal";
import { List } from "../principalPage/LastBooks";
import {
  ButtonPurchaseFavoriteReserved,
  ButtonBuyWithReserved,
  ButtonDelete,
} from "../buttons/Buttons";
import { FormValoration } from "../buttons/FormValoration";

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
  const [valoration, setValoration] = useState(false);
  const history = useHistory();
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
          <ButtonDelete
            idBook={idBook}
            to={"favorite"}
            rout={"favorites"}
          ></ButtonDelete>
          <ButtonPurchaseFavoriteReserved
            idBook={idBook}
            to={"buy"}
            name={"Comprar"}
            rout={"purchase"}
          ></ButtonPurchaseFavoriteReserved>
        </div>
      );
    } else if (kind === "purchase") {
      nameLink = "Comprados";
      buttons = (
        <div>
          <button onClick={() => setValoration(true)}>Entregado</button>
          {valoration ? (
            <FormValoration idBook={idBook}></FormValoration>
          ) : null}
        </div>
      );
    } else if (kind === "offers") {
      nameLink = "Notificaciones";
      buttons = (
        <div>
          <button>Ver</button>
        </div>
      );
    } else if (kind === "reserved") {
      nameLink = "Reservados";
      buttons = (
        <div>
          <ButtonDelete
            idBook={idBook}
            to={"reservation"}
            rout={"reserved"}
          ></ButtonDelete>
          <ButtonBuyWithReserved idBook={idBook}></ButtonBuyWithReserved>
        </div>
      );
    } else if (kind === "toSell") {
      nameLink = "En venta";
      buttons = (
        <div>
          <button>Editar</button>
          <ButtonDelete
            idBook={idBook}
            to={"to"}
            rout={"toSell"}
          ></ButtonDelete>
        </div>
      );
    }
  } else {
    buttons = (
      <div>
        <ButtonPurchaseFavoriteReserved
          idBook={idBook}
          to={"favorite"}
          name={"Favorito"}
          rout={"favorites"}
        ></ButtonPurchaseFavoriteReserved>
        <ButtonPurchaseFavoriteReserved
          idBook={idBook}
          to={"reservation"}
          name={"Reservar"}
          rout={"reserved"}
        ></ButtonPurchaseFavoriteReserved>
        <ButtonPurchaseFavoriteReserved
          idBook={idBook}
          to={"buy"}
          name={"Comprar"}
          rout={"purchase"}
        ></ButtonPurchaseFavoriteReserved>
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
