import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ViewBook } from "../BookOfKindCategory/BookOfKindCategory";
import {
  ButtonPurchaseFavoriteReserved,
  ButtonDelete,
  ButtonBuyWithReserved,
} from "./Buttons";
import { FormValoration } from "./FormValoration";

const ViewBooksForFavourites = () => {
  let { idBook } = useParams();

  return (
    <ViewBook
      buttons={
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
      }
      nameKind={"favoritos"}
      kind={"favorites"}
    ></ViewBook>
  );
};

const ViewBooksForPurchase = () => {
  let { idBook } = useParams();
  const [valoration, setValoration] = useState(false);
  return (
    <ViewBook
      buttons={
        <div>
          <button onClick={() => setValoration(true)}>Entregado</button>
          {valoration ? (
            <FormValoration idBook={idBook}></FormValoration>
          ) : null}
        </div>
      }
      nameKind={"Comprados"}
      kind={"purchase"}
    ></ViewBook>
  );
};

const ViewBooksForReserved = () => {
  let { idBook } = useParams();
  return (
    <ViewBook
      buttons={
        <div>
          <ButtonDelete
            idBook={idBook}
            to={"reservation"}
            rout={"reserved"}
          ></ButtonDelete>
          <ButtonBuyWithReserved idBook={idBook}></ButtonBuyWithReserved>
        </div>
      }
      nameKind={"Reservados"}
      kind={"reserved"}
    ></ViewBook>
  );
};

const ViewBooksForToSell = () => {
  let { idBook } = useParams();
  const history = useHistory();
  return (
    <ViewBook
      buttons={
        <div>
          <button
            onClick={() =>
              history.push(`/principal/profile/list/toSell/book/${idBook}/edit`)
            }
          >
            Editar
          </button>
          <ButtonDelete
            idBook={idBook}
            to={"to"}
            rout={"toSell"}
          ></ButtonDelete>
        </div>
      }
      nameKind={"En venta"}
      kind={"toSell"}
    ></ViewBook>
  );
};

const ViewBooksForOffers = () => {
  return (
    <ViewBook
      buttons={
        <div>
          <button>Ver</button>
        </div>
      }
      nameKind={"Notificaciones"}
      kind={"offers"}
    ></ViewBook>
  );
};

const ViewBooksForCategories = () => {
  let { idBook } = useParams();
  return (
    <ViewBook
      buttons={
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
      }
    ></ViewBook>
  );
};

export {
  ViewBooksForFavourites,
  ViewBooksForPurchase,
  ViewBooksForReserved,
  ViewBooksForToSell,
  ViewBooksForOffers,
  ViewBooksForCategories,
};
