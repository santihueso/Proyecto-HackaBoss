import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { port } from "./Principal";
import { useFetchAuth } from "./useFetch/useFetchAuth";

const Notifications = ({ auth }) => {
  const { idBook } = useParams();
  const history = useHistory();
  const [data] = useFetchAuth(
    `http://localhost:${port}/login/user/profile/offers/${idBook}`,
    auth
  );
  if (!auth) {
    return history.push("/login");
  }

  const fav = data ? data[0] : null;
  const list = fav ? fav[0].count : null;
  const reservedPurchase = data ? data[1] : null;
  const array = reservedPurchase ? reservedPurchase.length : null;

  const listAll =
    array > 0 ? (
      reservedPurchase.map((e) => {
        return (
          <div key={e.product}>
            {e.purchase !== 1 ? <p>En venta</p> : <p>Comprado</p>}
            {e.reservation !== 1 && e.purchase !== 1 ? (
              <p>Disponible para reservar</p>
            ) : null}
            {e.reservation === 1 ? <p>Reservado</p> : null}
            {e.opinion !== "" ? null : e.opinion}
            {e.assessment !== "number" ? null : e.assessment}
            <p>Favoritos: {list}</p>
          </div>
        );
      })
    ) : (
      <div>
        <p>En venta</p>
        <p>Disponible para reservar</p>
        <p>Favoritos: {list}</p>
      </div>
    );

  return listAll;
};

export { Notifications };
