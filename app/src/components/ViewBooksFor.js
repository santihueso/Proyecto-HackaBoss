import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ViewBook } from "./BookOfKindCategory";
import {
  ButtonPurchaseFavoriteReserved,
  ButtonDelete,
  ButtonBuyWithReserved,
} from "./Buttons";
import { Notifications } from "./Notifications";
import { FormValoration } from "./FormValoration";

const ViewBooksForFavourites = ({ auth }) => {
  let { idBook } = useParams();

  return (
    <ViewBook
      buttons={
        <div className="btnPurchase">
          <ButtonDelete
            idBook={idBook}
            to={"favorite"}
            rout={"favorites"}
            auth={auth}
          ></ButtonDelete>
          <ButtonPurchaseFavoriteReserved
            idBook={idBook}
            to={"buy"}
            name={"Comprar"}
            rout={"purchase"}
            auth={auth}
          ></ButtonPurchaseFavoriteReserved>
        </div>
      }
      nameKind={"favoritos"}
      kind={"favorites"}
    ></ViewBook>
  );
};

const ViewBooksForPurchase = ({ auth }) => {
  let { idBook } = useParams();
  const [valoration, setValoration] = useState(false);
  return (
    <ViewBook
      buttons={
        <div>
          <button className="btnViewBook" onClick={() => setValoration(true)}>
            Valorar
          </button>
          {valoration ? (
            <FormValoration idBook={idBook} auth={auth}></FormValoration>
          ) : null}
        </div>
      }
      nameKind={"Comprados"}
      kind={"purchase"}
    ></ViewBook>
  );
};

const ViewBooksForReserved = ({ auth }) => {
  let { idBook } = useParams();
  return (
    <ViewBook
      buttons={
        <div className="btnPurchase">
          <ButtonDelete
            idBook={idBook}
            to={"reservation"}
            rout={"reserved"}
            auth={auth}
          ></ButtonDelete>
          <ButtonBuyWithReserved
            idBook={idBook}
            auth={auth}
          ></ButtonBuyWithReserved>
        </div>
      }
      nameKind={"Reservados"}
      kind={"reserved"}
    ></ViewBook>
  );
};

const ViewBooksForToSell = ({ auth }) => {
  let { idBook } = useParams();
  const history = useHistory();
  return (
    <ViewBook
      buttons={
        <div className="btnPurchase">
          <button
            className="btnViewBook"
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
            auth={auth}
          ></ButtonDelete>
        </div>
      }
      nameKind={"En venta"}
      kind={"toSell"}
    ></ViewBook>
  );
};

const ViewBooksForOffers = ({ auth }) => {
  const [active, setActive] = useState(false);
  const comparate = () => (active ? setActive(false) : setActive(true));
  return (
    <ViewBook
      buttons={
        <div>
          <button className="btnViewBook" onClick={comparate}>
            Ver
          </button>
          {active ? <Notifications auth={auth}></Notifications> : null}
        </div>
      }
      nameKind={"Notificaciones"}
      kind={"offers"}
    ></ViewBook>
  );
};

const ViewBooksForCategories = ({ auth }) => {
  let { idBook } = useParams();
  return (
    <ViewBook
      buttons={
        <div className="btnPurchase">
          <ButtonPurchaseFavoriteReserved
            idBook={idBook}
            to={"favorite"}
            name={"Favorito"}
            rout={"favorites"}
            auth={auth}
          ></ButtonPurchaseFavoriteReserved>
          <ButtonPurchaseFavoriteReserved
            idBook={idBook}
            to={"reservation"}
            name={"Reservar"}
            rout={"reserved"}
            auth={auth}
          ></ButtonPurchaseFavoriteReserved>
          <ButtonPurchaseFavoriteReserved
            idBook={idBook}
            to={"buy"}
            name={"Comprar"}
            rout={"purchase"}
            auth={auth}
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
